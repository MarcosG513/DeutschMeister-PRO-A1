import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import admin from "firebase-admin";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { fal } from "@fal-ai/client";
import crypto from "crypto";
import sharp from "sharp";
import {
  executeBackendGemini,
  executeBackendGeminiChatStream,
  resolveModelForTier,
  isQuotaOrBillingError,
  buildKeyPool,
  getPoolStatus
} from "./services/geminiClient.js";

// Inicializa Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Define los secretos que se tomarán de Secret Manager (FASE 1)
const falKey = defineSecret("FAL_KEY");
const geminiPaidKey = defineSecret("GEMINI_PAID_KEY");
const geminiFreeKey1 = defineSecret("GEMINI_FREE_KEY_1");
const geminiFreeKey2 = defineSecret("GEMINI_FREE_KEY_2");
const geminiFreeKey = defineSecret("GEMINI_FREE_KEY"); // Compatibilidad con despliegues previos

// Array unificado de secretos para Cloud Functions v2
const ALL_AI_SECRETS = [geminiPaidKey, geminiFreeKey1, geminiFreeKey2, geminiFreeKey, falKey];

/**
 * Resuelve la configuración de las API Keys activas desde secretos de Firebase o variables de entorno
 */
function getGeminiKeyConfig() {
  const resolve = (sec, envVar) => {
    try {
      if (sec && typeof sec.value === "function") {
        const val = sec.value();
        if (val) return val;
      }
    } catch (_) {}
    return process.env[envVar] || "";
  };

  return {
    paidKey: resolve(geminiPaidKey, "GEMINI_PAID_KEY"),
    paidKey1: resolve(geminiPaidKey, "GEMINI_PAID_KEY"),
    paidKey2: process.env.GEMINI_PAID_KEY_2 || "",
    paidKey3: process.env.GEMINI_PAID_KEY_3 || "",
    paidKey4: process.env.GEMINI_PAID_KEY_4 || "",
    freeKey1: resolve(geminiFreeKey1, "GEMINI_FREE_KEY_1") || resolve(geminiFreeKey, "GEMINI_FREE_KEY"),
    freeKey2: resolve(geminiFreeKey2, "GEMINI_FREE_KEY_2"),
    freeKey3: process.env.GEMINI_FREE_KEY_3 || "",
    freeKey4: process.env.GEMINI_FREE_KEY_4 || "",
    freeKey5: process.env.GEMINI_FREE_KEY_5 || ""
  };
}

/**
 * Resuelve el pool dinámico de 6 llaves para síntesis de audio Charon TTS,
 * deduplicando por valor exacto de string y priorizando PAID primero.
 */
function getGoogleKeyPool() {
  const config = getGeminiKeyConfig();
  const rawKeys = [
    { id: "PAID_1", key: config.paidKey1 || config.paidKey, isPaid: true },
    { id: "PAID_2", key: config.paidKey2, isPaid: true },
    { id: "PAID_3", key: config.paidKey3, isPaid: true },
    { id: "PAID_4", key: config.paidKey4, isPaid: true },
    { id: "FREE_1", key: config.freeKey1, isPaid: false },
    { id: "FREE_2", key: config.freeKey2, isPaid: false },
    { id: "FREE_3", key: config.freeKey3, isPaid: false },
    { id: "FREE_4", key: config.freeKey4, isPaid: false },
    { id: "FREE_5", key: config.freeKey5, isPaid: false },
    { id: "GENERIC", key: process.env.GEMINI_API_KEY || "", isPaid: false }
  ];

  const pool = [];
  const seenKeys = new Set();
  for (const item of rawKeys) {
    if (item.key && typeof item.key === "string") {
      const trimmed = item.key.trim();
      if (trimmed.length > 10 && !seenKeys.has(trimmed)) {
        seenKeys.add(trimmed);
        pool.push({ id: item.id, key: trimmed, isPaid: item.isPaid });
      }
    }
  }

  // Ordenar: PAID primero, luego FREE
  pool.sort((a, b) => (b.isPaid ? 1 : 0) - (a.isPaid ? 1 : 0));
  return pool;
}

const PROMPT_CACHE_TTL_MS = 600_000; // 10 minutos
const systemPromptsCache = {
  data: null,
  expiresAt: 0
};

/**
 * Función auxiliar para obtener los prompts desde Firestore con caché en memoria (TTL 10 min)
 */
async function getSystemPrompt(promptId, defaultPrompt) {
  const now = Date.now();
  if (systemPromptsCache.data && now < systemPromptsCache.expiresAt) {
    return systemPromptsCache.data[promptId] || defaultPrompt;
  }

  try {
    const docRef = db.collection("config").doc("system_prompts");
    const docSnap = await docRef.get();
    const data = docSnap.exists ? (docSnap.data() || {}) : {};
    systemPromptsCache.data = data;
    systemPromptsCache.expiresAt = now + PROMPT_CACHE_TTL_MS;
    if (data[promptId]) {
      return data[promptId];
    }
  } catch (error) {
    console.error("Error obteniendo system prompt desde Firestore, usando fallback:", error);
    if (systemPromptsCache.data?.[promptId]) {
      return systemPromptsCache.data[promptId];
    }
  }
  return defaultPrompt;
}

// =========================================================================
// CONTROL DE ACCESO ZERO-TRUST & CUSTOM CLAIMS (ALLOWLIST / APPROVAL GATE)
// =========================================================================
const DEFAULT_SUPER_ADMIN_EMAILS = [
  "mgmogollon13@gmail.com",
  "matelu.store2@gmail.com",
  "juliethg113@gmail.com",
  "mgmogollon@hotmail.com"
];

function normalizeEmailAddress(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function getSuperAdminEmailSet() {
  const set = new Set(DEFAULT_SUPER_ADMIN_EMAILS.map(normalizeEmailAddress).filter(Boolean));
  const envAdmins = (process.env.SUPER_ADMIN_EMAILS || "")
    .split(",")
    .map(normalizeEmailAddress)
    .filter(Boolean);
  for (const email of envAdmins) {
    set.add(email);
  }
  return set;
}

function serializeTimestampIso(ts) {
  if (!ts) return null;
  if (typeof ts.toDate === "function") {
    try {
      return ts.toDate().toISOString();
    } catch (_) {
      return null;
    }
  }
  if (ts instanceof Date) return ts.toISOString();
  if (typeof ts === "string") return ts;
  return null;
}

async function syncUserCustomClaimsIfNeeded(uid, currentClaims, approved, isAdmin) {
  if (!uid) return false;
  const targetApproved = Boolean(approved);
  const targetAdmin = Boolean(approved && isAdmin);
  const prev = currentClaims && typeof currentClaims === "object" ? currentClaims : {};
  if (Boolean(prev.approved) === targetApproved && Boolean(prev.admin) === targetAdmin) {
    return false;
  }
  await admin.auth().setCustomUserClaims(uid, {
    ...prev,
    approved: targetApproved,
    admin: targetAdmin
  });
  return true;
}

/**
 * Helper unificado de autenticación para Cloud Functions (onCall y onRequest)
 */
async function verifyRequestAuth(reqOrRequest) {
  // Caso 1: onCall de Firebase (objeto CallableRequest con propiedad auth)
  if (reqOrRequest && ('auth' in reqOrRequest || reqOrRequest.rawRequest !== undefined)) {
    if (!reqOrRequest.auth?.uid) {
      throw new HttpsError("unauthenticated", "Debes iniciar sesión.");
    }
    return {
      uid: reqOrRequest.auth.uid,
      token: reqOrRequest.auth.token || {},
      isPro: reqOrRequest.auth.token?.stripeRole === "premium" || reqOrRequest.auth.token?.pro === true
    };
  }

  // Caso 2: onRequest de Express
  const req = reqOrRequest;
  const authHeader = req.headers?.authorization || (typeof req.header === 'function' ? req.header('authorization') : null);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpsError("unauthenticated", "Debes iniciar sesión.");
  }

  const idToken = authHeader.split("Bearer ")[1].trim();
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      token: decodedToken,
      isPro: decodedToken.stripeRole === "premium" || decodedToken.pro === true
    };
  } catch (err) {
    throw new HttpsError("unauthenticated", `Token de autenticación inválido: ${err.message}`);
  }
}

/**
 * Helper de Seguridad Global para exigir usuario autenticado NO anónimo y aprobado.
 * Verifica Custom Claims en el token y, si faltan, valida/sincroniza desde access_control/{uid}.
 */
async function assertApprovedUser(reqOrRequest) {
  const authUser = await verifyRequestAuth(reqOrRequest);
  const signInProvider = authUser.token?.firebase?.sign_in_provider;

  if (signInProvider === "anonymous") {
    throw new HttpsError(
      "permission-denied",
      "El acceso anónimo está deshabilitado. Inicia sesión con una cuenta de Google autorizada."
    );
  }

  const emailLower = normalizeEmailAddress(authUser.token?.email);
  const tokenApproved = authUser.token?.approved === true || authUser.token?.admin === true;

  if (tokenApproved) {
    const isAdminClaim = authUser.token?.admin === true;
    return {
      ...authUser,
      email: emailLower,
      approved: true,
      admin: isAdminClaim,
      role: isAdminClaim ? "admin" : "user"
    };
  }

  const accessSnap = await db.collection("access_control").doc(authUser.uid).get();
  if (accessSnap.exists) {
    const accessData = accessSnap.data() || {};
    if (accessData.status === "approved") {
      const isAdminRole = accessData.role === "admin";
      admin.auth().getUser(authUser.uid)
        .then((userRecord) => syncUserCustomClaimsIfNeeded(authUser.uid, userRecord.customClaims, true, isAdminRole))
        .catch((err) => console.warn("[AuthClaims Background Sync]:", err?.message || err));

      return {
        ...authUser,
        email: normalizeEmailAddress(accessData.email) || emailLower,
        approved: true,
        admin: isAdminRole,
        role: isAdminRole ? "admin" : "user"
      };
    }
  } else if (emailLower && authUser.token?.email_verified !== false && getSuperAdminEmailSet().has(emailLower)) {
    const nowTs = admin.firestore.FieldValue.serverTimestamp();
    await db.collection("access_control").doc(authUser.uid).set({
      uid: authUser.uid,
      email: emailLower,
      displayName: authUser.token?.name || "",
      photoURL: authUser.token?.picture || "",
      status: "approved",
      role: "admin",
      approvedBy: "system_super_admin",
      requestedAt: nowTs,
      updatedAt: nowTs
    }, { merge: true });
    admin.auth().getUser(authUser.uid)
      .then((userRecord) => syncUserCustomClaimsIfNeeded(authUser.uid, userRecord.customClaims, true, true))
      .catch((err) => console.warn("[SuperAdmin Claim Sync]:", err?.message || err));

    return {
      ...authUser,
      email: emailLower,
      approved: true,
      admin: true,
      role: "admin"
    };
  }

  throw new HttpsError("permission-denied", "Tu cuenta está pendiente de autorización por el administrador.");
}

async function assertAdminUser(request) {
  const authUser = await assertApprovedUser(request);
  if (authUser.admin === true || authUser.token?.admin === true) {
    return authUser;
  }
  if (authUser.email && getSuperAdminEmailSet().has(authUser.email)) {
    return { ...authUser, admin: true, role: "admin" };
  }
  const snap = await db.collection("access_control").doc(authUser.uid).get();
  const data = snap.exists ? snap.data() || {} : {};
  if (data.status === "approved" && data.role === "admin") {
    return { ...authUser, admin: true, role: "admin" };
  }
  throw new HttpsError("permission-denied", "Acceso exclusivo para administradores.");
}

let paidMediaKeyCursor = 0;

/**
 * Valida en el servidor si una petición autenticada está autorizada para generar o
 * sobrescribir activos en global_flashcards (emulador, origen Vite dev o claim admin).
 */
function isServerAuthorizedMediaWriter(request, authUser) {
  if (!authUser?.uid) return false;
  if (authUser.admin === true || authUser.token?.admin === true) return true;
  if (request.data?.clientPlatform === "native" || request.data?.isNativePlatform === true) {
    return false;
  }
  if (process.env.FUNCTIONS_EMULATOR === "true") return true;

  const origin = request.rawRequest?.headers?.origin || "";
  return origin === "http://localhost:5173" || origin === "http://localhost:5174";
}

/**
 * Obtiene y rota (round-robin) las llaves PAID disponibles (PAID_1..PAID_4).
 */
function getRotatedPaidKeys() {
  const paidKeys = getGoogleKeyPool().filter(k => k.id.startsWith("PAID") || k.isPaid);
  if (paidKeys.length <= 1) return paidKeys;
  const startIdx = paidMediaKeyCursor % paidKeys.length;
  paidMediaKeyCursor = (paidMediaKeyCursor + 1) % paidKeys.length;
  return [...paidKeys.slice(startIdx), ...paidKeys.slice(0, startIdx)];
}

/**
 * Función centralizada de enrutamiento con Pool Resiliente de 3 llaves y Fallback a Claude Haiku 4.5
 * Pool:
 * 1. Clave de Facturación (créditos): gemini-3.8-flash
 * 2. Clave Gratuita 1: gemini-3.5-flash-lite
 * 3. Clave Gratuita 2: gemini-3.5-flash-lite
 * 4. Fallback de contingencia: Claude Haiku 4.5 via Fal.ai
 */
async function invokeWithDeepSeekFallback(promptSystem, promptUser, options = {}) {
  const isJson = options.isJson || false;
  const temperature = options.temperature !== undefined ? options.temperature : 0.3;
  const preferredModel = options.model || "gemini-3.8-flash";
  const mode = options.mode || "paid_first";
  const keys = getGeminiKeyConfig();

  try {
    console.log(`FinOps ResilientPool: Invocando pool de 3 llaves (Modo: ${mode}, Modelo deseado: ${preferredModel})...`);
    const poolResult = await executeBackendGemini(promptUser, {
      keys,
      preferredModel,
      systemInstruction: promptSystem,
      isJson,
      responseSchema: options.responseSchema || null,
      mode
    });

    const responseText = poolResult.text.trim();
    if (isJson) {
      const cleanJson = responseText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      return JSON.parse(cleanJson);
    }
    return responseText;
  } catch (poolError) {
    console.warn("FinOps: Agotadas las 3 llaves de Gemini (o error grave en pool). Activando fallback a Claude Haiku 4.5:", poolError.message);

    // Fallback: Claude Haiku 4.5 en Fal.ai via enterprise (Costo premium de contingencia)
    try {
      fal.config({
        credentials: falKey.value()
      });
      console.log("FinOps: Invocando Claude Haiku 4.5 via Fal.ai...");

      let finalPromptUser = promptUser;
      if (isJson) {
        finalPromptUser += "\n\nResponde estrictamente en formato JSON válido, sin bloques de código ```json ni texto adicional fuera del JSON.";
      }

      const response = await fal.subscribe("openrouter/router/enterprise", {
        input: {
          model: "anthropic/claude-haiku-4.5",
          prompt: finalPromptUser,
          system_prompt: promptSystem,
          temperature: temperature,
          top_p: 0.9
        }
      });

      const outputText = response.data.output || response.data.text || "";
      if (isJson) {
        const cleanJson = outputText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        return JSON.parse(cleanJson);
      }
      return outputText;
    } catch (fallbackErr) {
      console.error("FinOps: Error crítico en fallback definitivo de Claude Haiku 4.5:", fallbackErr);
      throw new Error("Servicio no disponible temporalmente. Inténtalo más tarde.");
    }
  }
}

/**
 * Libera de forma segura un AsyncIterator de streaming cuando el cliente SSE aborta la conexión.
 */
async function closeAsyncStream(streamObj) {
  try {
    if (streamObj && typeof streamObj.return === "function") {
      await streamObj.return();
    }
  } catch (_) {}
}

/**
 * Función centralizada para Streaming SSE con Pool Resiliente y Fallback a Claude Haiku 4.5,
 * con detección segura de desconexión del cliente para abortar consumo de tokens.
 */
async function streamWithDeepSeekFallback(res, promptSystem, history, lastMessage, options = {}) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const req = options.req || res.req;
  let clientDisconnected = false;

  const isAborted = () => clientDisconnected || res.destroyed || res.writableEnded;
  const onReqClose = () => {
    // En Node 18+, req emite 'close' tras leer el body POST (req.complete === true);
    // solo se marca desconexión si la petición no completó el body o si el socket/response murió.
    if (res.writableEnded) return;
    if ((req && !req.complete) || res.destroyed || res.socket?.destroyed) {
      clientDisconnected = true;
    }
  };
  const onAborted = () => {
    clientDisconnected = true;
  };
  const onResClose = () => {
    if (!res.writableEnded) {
      clientDisconnected = true;
    }
  };

  if (req && typeof req.on === "function") {
    req.on("close", onReqClose);
    req.on("aborted", onAborted);
  }
  if (typeof res.on === "function") {
    res.on("close", onResClose);
  }

  const preferredModel = options.model || "gemini-3.8-flash";
  const mode = options.mode || "paid_first";
  const keys = getGeminiKeyConfig();

  try {
    try {
      console.log(`FinOps Stream: Invocando chat stream con pool resiliente (Modo: ${mode})...`);
      const streamResult = await executeBackendGeminiChatStream(history, lastMessage, {
        keys,
        preferredModel,
        systemInstruction: promptSystem,
        mode
      });

      for await (const chunk of streamResult.stream) {
        if (isAborted()) {
          console.log("FinOps Stream: Cliente SSE desconectado, abortando stream Gemini.");
          await closeAsyncStream(streamResult.stream);
          return;
        }
        const chunkText = chunk.text();
        if (chunkText) {
          const cleanedChunk = options.cleanBold ? chunkText.replace(/\*\*/g, '').replace(/\*/g, '') : chunkText;
          res.write(`data: ${JSON.stringify({ text: cleanedChunk })}\n\n`);
        }
      }

      if (!isAborted()) {
        res.write('data: [DONE]\n\n');
        res.end();
      }
      return;
    } catch (poolError) {
      if (isAborted()) {
        console.log("FinOps Stream: Cliente desconectado antes de fallback, cancelando Claude Haiku 4.5.");
        return;
      }
      console.warn("FinOps Stream: Agotadas las llaves de Gemini. Activando fallback a Claude Haiku 4.5:", poolError.message);

      // Fallback: Claude Haiku 4.5 en Fal.ai via enterprise (Costo premium de contingencia)
      try {
        fal.config({
          credentials: falKey.value()
        });
        console.log("FinOps Stream: Invocando stream de Claude Haiku 4.5 via Fal.ai...");

        let promptBuilder = "";
        if (history && history.length > 0) {
          promptBuilder += "Historial de conversación previa:\n";
          history.forEach(msg => {
            const roleLabel = msg.role === 'user' ? 'Usuario' : 'Asistente';
            const text = msg.parts && msg.parts[0] ? msg.parts[0].text : '';
            promptBuilder += `${roleLabel}: ${text}\n`;
          });
          promptBuilder += "\n";
        }
        promptBuilder += `Mensaje actual del usuario: "${lastMessage}"\n\nResponde siguiendo las instrucciones del sistema.`;

        const falStream = await fal.stream("openrouter/router/enterprise", {
          input: {
            model: "anthropic/claude-haiku-4.5",
            prompt: promptBuilder,
            system_prompt: promptSystem,
            temperature: options.temperature || 0.7
          }
        });

        let lastOutput = "";
        for await (const event of falStream) {
          if (isAborted()) {
            console.log("FinOps Stream: Cliente SSE desconectado, abortando stream Fal.ai.");
            await closeAsyncStream(falStream);
            return;
          }
          const currentOutput = event.output || "";
          if (currentOutput.length > lastOutput.length) {
            const chunkText = currentOutput.substring(lastOutput.length);
            lastOutput = currentOutput;
            if (chunkText) {
              const cleanedChunk = options.cleanBold ? chunkText.replace(/\*\*/g, '').replace(/\*/g, '') : chunkText;
              res.write(`data: ${JSON.stringify({ text: cleanedChunk })}\n\n`);
            }
          }
        }
        if (!isAborted()) {
          res.write('data: [DONE]\n\n');
          res.end();
        }
      } catch (fallbackErr) {
        console.error("FinOps Stream: Error crítico en fallback de Claude Haiku 4.5:", fallbackErr);
        if (!res.headersSent) {
          res.status(500).json({ error: "Error en el servidor de fallback." });
        } else if (!isAborted()) {
          res.write(`data: ${JSON.stringify({ error: "Stream fallback error: " + fallbackErr.message })}\n\n`);
          res.end();
        }
      }
    }
  } finally {
    if (req && typeof req.off === "function") {
      req.off("close", onReqClose);
      req.off("aborted", onAborted);
    }
    if (typeof res.off === "function") {
      res.off("close", onResClose);
    }
  }
}

// =========================================================================
// 1. SIMULADOR DE ROL A1 (RoleplaySimulator)
// Pool: gemini-3.8-flash (Paid) -> gemini-3.5-flash-lite (Free 1 y 2) -> Claude Haiku 4.5
// =========================================================================
export const runRoleplaySimulator = onRequest({
  secrets: ALL_AI_SECRETS,
  cors: true
}, async (req, res) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  let authUser;
  try {
    authUser = await assertApprovedUser(req);
  } catch (authErr) {
    const statusCode = authErr?.code === "permission-denied" ? 403 : 401;
    res.status(statusCode).json({ error: authErr.message || "Acceso no autorizado.", code: authErr?.code || "unauthenticated" });
    return;
  }

  let data;
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (data && data.data) data = data.data;
  } catch (e) {
    res.status(400).send("Invalid JSON body");
    return;
  }
  const {
    historialConversacion,
    escenario
  } = data || {};
  if (!historialConversacion || !escenario) {
    res.status(400).send("Faltan parámetros requeridos: historialConversacion o escenario");
    return;
  }
  const defaultSystemInstruction = `Eres un hablante nativo de alemán en un escenario de juego de rol de nivel A1: "${escenario}".
      REGLAS ESTRICTAS E INVIOLABLES:
      1. Usa SOLO alemán de nivel A1. Cada frase u oración debe tener un MÁXIMO ESTRICTO de 8 palabras. Vocabulario básico y cotidiano. Solo tiempo presente.
      2. No uses gramática compleja: sin voz pasiva ni subjuntivos (excepto fórmulas fijas de cortesía A1 como 'möchten' o 'hätte').
      3. EXACTAMENTE UNA SOLA acción o pregunta por turno. Máximo 2 frases en total por mensaje. Cero monólogos.
      4. CORRECCIÓN IMPLÍCITA: Si el usuario comete un error, NO lo corrijas explícitamente y nunca salgas de tu rol. Responde integrando la estructura correcta de forma natural. Ej: Si dice 'Ich krank bin', tú respondes: 'Oh, Sie sind krank? Was fehlt Ihnen?'
      5. INICIO DE SESIÓN: Si es el primer turno de la conversación, limita tu respuesta ESTRICTAMENTE a la frase de apertura indicada en el escenario, sin agregar nada más.
      6. PROHIBICIÓN ABSOLUTA DE FORMATO: Nunca uses asteriscos (*), negritas (**) ni Markdown de ningún tipo. Solo texto plano.`;
  const systemInstruction = await getSystemPrompt("roleplay_simulator", defaultSystemInstruction);
  const finalSystemPrompt = systemInstruction.replace("${escenario}", escenario);

  const history = historialConversacion.slice(0, -1);
  const lastMessage = historialConversacion[historialConversacion.length - 1].parts[0].text;

  return await streamWithDeepSeekFallback(res, finalSystemPrompt, history, lastMessage, {
    model: "gemini-3.8-flash",
    cleanBold: true,
    temperature: 0.7,
    req
  });
});

// =========================================================================
// 2. EVALUADOR DE CORREOS (EmailSimulator) - Migrado a Gemini 3.8 Flash con Pool
// =========================================================================
export const evaluateEmail = onCall(
  { secrets: ALL_AI_SECRETS, maxInstances: 6 },
  async (request) => {
    await assertApprovedUser(request);
    const { textoCorreo, consignaExamen } = request.data || {};

    const systemPrompt = `Por favor, actúa como un examinador oficial del Goethe-Institut para el examen Start Deutsch 1 (Schreiben Teil 2 - E-Mail).
Evalúa minuciosamente el correo redactado por el estudiante aplicando la rúbrica oficial estricta de 3 criterios y extensión:

ESTRUCTURA EXACTA DE TU RESPUESTA EN MARKDOWN:

### 1. 📋 Evaluación de los 3 Leitpunkte (Puntos de Contenido)
- Analiza cada uno de los 3 puntos de la consigna de forma individual y explícita:
  * **Punto 1:** [Cumplido ✅ / Parcialmente cumplido ⚠️ / No cumplido ❌] - Justificación y análisis de la respuesta.
  * **Punto 2:** [Cumplido ✅ / Parcialmente cumplido ⚠️ / No cumplido ❌] - Justificación y análisis de la respuesta.
  * **Punto 3:** [Cumplido ✅ / Parcialmente cumplido ⚠️ / No cumplido ❌] - Justificación y análisis de la respuesta.
- Regla Socrática: Si el estudiante intentó abordar el punto pero cometió errores gramaticales o léxicos, valida primero su intención comunicativa ("Veo que intentaste expresar...") y nunca digas que 'no respondió' a menos que lo haya omitido por completo.
- CERO ALUCINACIONES: No inventes requisitos que no estén en la consigna.

### 2. 🎩 Registro y Formalidad (du vs. Sie)
- Analiza la adecuación del saludo (Anrede) y la despedida (Grußformel) según el destinatario del escenario:
  * **Informal (amigos/familia):** Saludo con "Liebe/r..." o "Hallo...", despedida como "Viele Grüße", "Liebe Grüße" o "Bis bald".
  * **Formal (profesor, hotel, médico, oficina):** Saludo obligatorio formal "Sehr geehrte/r..." o "Sehr geehrte Damen und Herren", despedida formal "Mit freundlichen Grüßen".
- **Norma Ortográfica Alemana:** Recuerda que en alemán las fórmulas de despedida (ej. "Viele Grüße" o "Mit freundlichen Grüßen") NUNCA llevan coma al final. Señala si el estudiante colocó una coma incorrectamente.

### 3. 📐 Gramática y Vocabulario A1
- **Posición del Verbo (V2):** Comprueba si el verbo conjugado está en la Posición 2 en oraciones enunciativas, o al final en subordinadas con "weil/dass".
- **Sustantivos con Mayúscula:** Verifica que TODOS los sustantivos alemanes comiencen con mayúscula (Großschreibung).
- **Casos y Preposiciones:** Señala aciertos y correcciones de casos (Nominativo, Acusativo, Dativo) y preposiciones básicas A1.

### 4. 📊 Conteo de Palabras y Extensión Oficial
- Analiza la longitud del texto frente al rango óptimo oficial del Goethe A1 (25 a 45 palabras, recomendación estándar: ca. 30 Wörter):
  * Indica el número exacto de palabras redactadas y califícalo (Óptimo, Muy corto o Excesivamente largo).

### 🌟 Correo Modelo Ideal (Muster-E-Mail A1)
> [Escribe aquí un correo modelo perfecto en alemán A1 de 25-35 palabras, con saludo, desarrollo de los 3 puntos y despedida correcta sin coma. DEBE estar obligatoriamente dentro de este bloque de cita '> ' para que el estudiante pueda escucharlo en audio nativo]`;

    const userPrompt = `Consigna del examen: "${consignaExamen}"\nTexto del estudiante: "${textoCorreo}"`;

    try {
      return await invokeWithDeepSeekFallback(systemPrompt, userPrompt, { 
        model: "gemini-3.8-flash", 
        temperature: 0.3 
      });
    } catch (error) {
      console.error("❌ Error en la Evaluación de Correo:", error);
      throw new HttpsError("internal", "Error procesando la evaluación.");
    }
  }
);

// =========================================================================
// 3. GENERADOR DE CUENTOS POR CAPÍTULO (generateStory)
// Límite estricto FinOps: Máximo 3 cuentos persistentes por capítulo en global_chapter_stories
// Pool: gemini-3.8-flash (Paid) -> gemini-3.5-flash-lite (Free 1 y 2)
// =========================================================================
export const generateStory = onRequest({
  secrets: ALL_AI_SECRETS,
  cors: true,
  timeoutSeconds: 120
}, async (req, res) => {
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204).send("");
    return;
  }
  res.set("Access-Control-Allow-Origin", "*");
  let authUser;
  try {
    authUser = await assertApprovedUser(req);
  } catch (authErr) {
    const statusCode = authErr?.code === "permission-denied" ? 403 : 401;
    res.status(statusCode).json({ error: authErr.message || "Acceso no autorizado.", code: authErr?.code || "unauthenticated" });
    return;
  }

  const sendSsePayload = (payloadObj) => {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    });
    const safeText = JSON.stringify(payloadObj).replace(/\n/g, " ");
    res.write(`data: ${safeText}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  };

  try {
    const bodyData = req.body.data || req.body || {};
    const {
      palabrasVocabulario,
      chapterId,
      chapterTitle = ""
    } = bodyData;

    const hasChapterId = chapterId !== undefined && chapterId !== null && String(chapterId).trim() !== "";
    const cleanChapterId = hasChapterId ? String(chapterId).trim().replace(/[^a-zA-Z0-9_-]/g, "") : "";
    const slotRefs = cleanChapterId
      ? [1, 2, 3].map((idx) => db.collection("global_chapter_stories").doc(`chapter_${cleanChapterId}_story_${idx}`))
      : [];

    let existingStories = [];
    if (slotRefs.length === 3) {
      const snaps = await db.getAll(...slotRefs);
      existingStories = snaps
        .filter((s) => s.exists)
        .map((s) => ({ id: s.id, ...s.data() }))
        .sort((a, b) => (a.storyIndex || 0) - (b.storyIndex || 0));

      // Si ya existen los 3 cuentos del capítulo en Firestore, devolver sin invocar al LLM ($0 créditos IA)
      if (existingStories.length >= 3) {
        const latestStory = existingStories[existingStories.length - 1];
        console.log(`[Story FinOps] Cupo 3/3 alcanzado para capítulo ${cleanChapterId}. Retornando desde global_chapter_stories.`);
        sendSsePayload({
          ...latestStory,
          story: latestStory,
          stories: existingStories,
          chapterId: cleanChapterId,
          quotaReached: true,
          maxStories: 3,
          count: existingStories.length,
          fromDatabase: true
        });
        return;
      }
    }

    if (!palabrasVocabulario || !Array.isArray(palabrasVocabulario) || palabrasVocabulario.length === 0) {
      res.status(400).json({
        error: "Faltan parámetros requeridos: palabrasVocabulario"
      });
      return;
    }

    const nextSlotIndex = (() => {
      const usedSlots = new Set(existingStories.map((s) => Number(s.storyIndex)));
      for (const candidate of [1, 2, 3]) {
        if (!usedSlots.has(candidate)) return candidate;
      }
      return 3;
    })();

    const existingTitles = existingStories.map((s) => s.titulo).filter(Boolean);
    const uniquenessDirective = existingTitles.length > 0
      ? `\n      REGLA DE DIVERSIDAD NARRATIVA (CUENTO ${nextSlotIndex} DE 3): En este capítulo (${chapterTitle || `Kapitel ${cleanChapterId}`}) ya existen los cuentos: [${existingTitles.map((t) => `"${t}"`).join(", ")}]. Está estrictamente prohibido repetir su trama, personajes o escenario. Crea una historia con situación, protagonistas y título completamente diferentes.`
      : "";

    const listaPalabras = palabrasVocabulario.join(", ");
    const promptSistema = "Eres un creador de cuentos infantiles y profesor de alemán nivel A1. Tu objetivo es escribir historias coherentes, inmersivas y gramaticalmente perfectas integrando vocabulario específico. REGLA DE CASOS GRAMATICALES (CRÍTICO): Integra las palabras clave de forma natural y declina correctamente sus artículos al caso correspondiente (Acusativo, Dativo) según requiera la oración. Por ejemplo, escribe 'Sie sieht den Hund' o 'einen Hund' (nunca 'Sie sieht der Hund' o 'einen der Hund'), escribe 'Lisa geht in den Park' o 'spielt im Park' (nunca 'in der Park'), escribe 'Er sieht den Schnee' (nunca 'der Schnee'). Está estrictamente prohibido duplicar artículos (ej. 'einen der Apfel' es incorrecto; usa simplemente 'den Apfel' o 'einen Apfel').";
    const promptDefinido = `Genera un micro-cuento interactivo en alemán nivel A1${chapterTitle ? ` para el tema "${chapterTitle}"` : ""} que integre obligatoriamente estas palabras: [${listaPalabras}].${uniquenessDirective}
      En el campo "cuento_aleman", debes envolver obligatoriamente cada una de estas palabras clave de vocabulario [${listaPalabras}] con doble asterisco "**" (ej. **palabra**) cada vez que las uses en el texto para que resalten.
      La salida debe coincidir EXACTAMENTE con este esquema JSON, sin texto adicional:
      {
        "titulo": "Título en alemán",
        "cuento_aleman": "El microcuento en alemán...",
        "traduccion_espanol": "Traducción fluida al español",
        "palabras_clave_usadas": [ 
          { 
            "palabra": "Forma original recibida", 
            "contexto": "Oración completa en alemán donde se usó" 
          } 
        ],
        "pregunta_comprension": {
           "pregunta": "Pregunta en alemán A1",
           "opciones": ["Opción A en alemán", "Opción B en alemán", "Opción C en alemán"],
           "respuesta_correcta": "La opción exacta en alemán"
        }
      }
      NOTA CRÍTICA DE LIBERTAD MORFOLÓGICA: Al registrar la 'Forma original recibida' en el array de palabras_clave_usadas, tienes total permiso para alterar la palabra morfológicamente dentro del 'cuento_aleman' (por ejemplo, pasar de Buch a Bücher o declinar en Akkusativ/Dativ) para que el alemán suene 100% natural.`;

    console.log(`Story FinOps: Generando cuento ${nextSlotIndex}/3 para capítulo ${cleanChapterId || "general"} (gemini-3.8-flash)...`);

    const jsonOutput = await invokeWithDeepSeekFallback(promptSistema, promptDefinido, {
      model: "gemini-3.8-flash",
      isJson: true,
      temperature: 0.75
    });

    if (slotRefs.length === 3) {
      const txResult = await db.runTransaction(async (tx) => {
        const snaps = await Promise.all(slotRefs.map((ref) => tx.get(ref)));
        const currentDocs = snaps
          .filter((s) => s.exists)
          .map((s) => ({ id: s.id, ...s.data() }))
          .sort((a, b) => (a.storyIndex || 0) - (b.storyIndex || 0));

        if (currentDocs.length >= 3) {
          const lastDoc = currentDocs[currentDocs.length - 1];
          return {
            savedStory: lastDoc,
            allStories: currentDocs,
            fromDatabase: true
          };
        }

        const used = new Set(currentDocs.map((d) => Number(d.storyIndex)));
        let targetSlot = 1;
        for (const s of [1, 2, 3]) {
          if (!used.has(s)) {
            targetSlot = s;
            break;
          }
        }

        const docId = `chapter_${cleanChapterId}_story_${targetSlot}`;
        const targetRef = db.collection("global_chapter_stories").doc(docId);
        const numericChapterId = Number(cleanChapterId);
        const record = {
          id: docId,
          chapterId: Number.isNaN(numericChapterId) ? cleanChapterId : numericChapterId,
          chapterKey: cleanChapterId,
          chapterTitle: chapterTitle || `Kapitel ${cleanChapterId}`,
          storyIndex: targetSlot,
          titulo: jsonOutput.titulo || `Cuento ${targetSlot}`,
          cuento_aleman: jsonOutput.cuento_aleman || jsonOutput.de || "",
          traduccion_espanol: jsonOutput.traduccion_espanol || jsonOutput.es || "",
          palabras_clave_usadas: Array.isArray(jsonOutput.palabras_clave_usadas) ? jsonOutput.palabras_clave_usadas : [],
          pregunta_comprension: jsonOutput.pregunta_comprension || null,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        tx.set(targetRef, record, { merge: true });

        const clientRecord = {
          ...record,
          createdAt: new Date().toISOString()
        };
        const mergedList = [...currentDocs, clientRecord].sort((a, b) => (a.storyIndex || 0) - (b.storyIndex || 0));
        return {
          savedStory: clientRecord,
          allStories: mergedList,
          fromDatabase: false
        };
      });

      sendSsePayload({
        ...jsonOutput,
        ...txResult.savedStory,
        story: txResult.savedStory,
        stories: txResult.allStories,
        chapterId: cleanChapterId,
        quotaReached: txResult.allStories.length >= 3,
        maxStories: 3,
        count: txResult.allStories.length,
        fromDatabase: txResult.fromDatabase
      });
      return;
    }

    sendSsePayload(jsonOutput);
  } catch (globalError) {
    console.error("FinOps Story Error:", globalError);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Error al generar el cuento."
      });
    } else {
      res.end();
    }
  }
});

const TUTOR_STATIC_SYSTEM_PROMPT = `=== 1. IDENTIDAD Y ROL ===
Eres 'DeutschMeister Tutor', un profesor de alemán nativo, carismático y experto en pedagogía para adultos hispanohablantes (Nivel A1 - Goethe-Zertifikat). 
Tu esencia es conversacional, cálida y paciente. Tu objetivo no es ser un diccionario ni un solucionador de tareas, sino un guía experto que utiliza el método socrático para ayudar al estudiante a deducir la lógica del idioma por sí mismo.

=== 2. DIRECTRICES PEDAGÓGICAS (GRAMÁTICA Y ESTILO DE EXPLICACIÓN) ===
- Fin de los Tabúes Gramaticales: Trata al estudiante como a un adulto inteligente. Tienes total libertad para usar terminología técnica (sustantivo, verbo, adjetivo, nominativo, acusativo, dativo, género), pero SIEMPRE debes explicarla de manera ultra-sencilla y digerible.
- Analogías Funcionales: Usa trucos mnemotécnicos o metáforas breves de la vida real solo si ayudan a aclarar la regla rápidamente (ej. "el verbo conjugado es el rey y siempre exige el trono de la posición 2"), pero nunca para ocultar el nombre técnico real.
- Scaffolding (Andamiaje Socrático): Nunca le des al alumno la respuesta final de golpe a lo que te está preguntando, pero TAMPOCO lo dejes a la deriva adivinando. Si no sabe algo, explícale la regla usando un *ejemplo paralelo corto* diferente a su duda, para que entienda el mecanismo.
- Cláusula de Triaje Léxico (Excepción FR-01 para Vocabulario Puro y Cultura):
  Si el estudiante pregunta directamente por el significado de una palabra aislada, una lista léxica (ej. los colores, los meses) o un modismo cultural intraducible sin contexto previo (ej. "¿Qué significa Mahlzeit?"), NO intentes forzar una deducción imposible. En este caso específico, tienes autorización para revelar el significado directo en la primera oración del Párrafo 1 usando una escena cotidiana breve. El reto socrático del Párrafo 2 consistirá entonces en pedirle al estudiante que aplique ese término recién aprendido en una situación práctica inmediata.

=== 3. MANEJO DE IDIOMAS Y TRADUCCIONES ===
- Artículos Obligatorios: ¡Regla de Oro! Todo sustantivo en alemán que menciones debe presentarse SIEMPRE con su artículo definido y su marca de plural si aplica. Ejemplo: **der Tisch (-e)**. Jamás enseñes sustantivos "desnudos".
- Traducción Inmediata Obligatoria: Toda palabra o frase en alemán debe ir en **negrita** seguida OBLIGATORIAMENTE de su traducción en español entre paréntesis de forma contigua: **haben** (tener). No dejes términos en alemán sin su equivalente adyacente.

=== 4. ESTRUCTURA ESTRICTA (2 PÁRRAFOS) Y REGLAS DE CIERRE ===
- Detección Emocional en Cero Disparos: Si el alumno expresa frustración, desánimo o pánico de examen, valida cálidamente su emoción con empatía (usando 1 o 2 emojis) al iniciar el primer párrafo antes de la explicación. Si su estado es normal, inicia validando su interés de forma inspiradora.
- Regla Inflexible de 2 Párrafos: Tu respuesta debe tener EXACTAMENTE 2 párrafos cortos (entre 6 y 8 oraciones en total). PROHIBIDO generar un tercer párrafo o listas largas desglosadas.
  * Párrafo 1: Validación empática + explicación conceptual o analogía con ejemplo paralelo.
  * Párrafo 2: El Reto Socrático Práctico.
- Prohibición de Preguntas de Permiso o Retóricas: JAMÁS termines preguntando "¿Quieres que veamos un ejemplo?", "¿Te gustaría intentarlo?" o "¿Tiene sentido?". Lanza DIRECTAMENTE el micro-ejercicio para que el estudiante aplique la regla ahora mismo. Cierra SIEMPRE con exactamente UNA sola pregunta o reto activo.`;

export const sendTutorChatMessage = onRequest({
  secrets: ALL_AI_SECRETS,
  cors: true
}, async (req, res) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  let data;
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (data && data.data) data = data.data;
  } catch (e) {
    res.status(400).send("Invalid JSON body");
    return;
  }

  // Verificación estricta de Autenticación y Custom Claims de Firebase Auth
  let authUser;
  try {
    authUser = await assertApprovedUser(req);
  } catch (authErr) {
    const statusCode = authErr?.code === "permission-denied" ? 403 : 401;
    res.status(statusCode).json({ error: authErr.message || "Acceso no autorizado.", code: authErr?.code || "unauthenticated" });
    return;
  }
  const uid = authUser.uid;
  const isPro = authUser.isPro;

  // Protección de Cuota (10 msgs/día para usuarios Free)
  if (!isPro && uid) {
    const todayStr = new Date().toISOString().split("T")[0];
    const usageDocRef = db.collection("artifacts").doc("deutschmeister-pro").collection("users").doc(uid).collection("usage").doc("today");
    
    try {
      const usageSnap = await usageDocRef.get();
      let currentCount = 0;
      if (usageSnap.exists) {
        const usageData = usageSnap.data();
        if (usageData.date === todayStr) {
          currentCount = usageData.messageCount || 0;
        }
      }

      if (currentCount >= 10) {
        res.status(429).json({
          error: "Límite diario alcanzado. Actualiza a PRO para mensajes ilimitados.",
          limitReached: true,
          isPro: false
        });
        return;
      }

      await usageDocRef.set({
        date: todayStr,
        messageCount: currentCount + 1,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (dbErr) {
      console.error("FinOps Tutor: Error consultando Firestore:", dbErr);
    }
  }

  const historialConversacion = data?.historialConversacion;
  if (!historialConversacion || !Array.isArray(historialConversacion)) {
    res.status(400).send("Faltan parámetros requeridos: historialConversacion");
    return;
  }

  const history = historialConversacion.slice(0, -1);
  const lastMessage = historialConversacion[historialConversacion.length - 1].parts[0].text;

  await streamWithDeepSeekFallback(res, TUTOR_STATIC_SYSTEM_PROMPT, history, lastMessage, {
    model: "gemini-3.8-flash",
    cleanBold: false,
    thinking_level: "MINIMAL",
    req
  });
});

// Función auxiliar para traducir conceptos a descripciones visuales usando Gemini Resilient Pool
async function getVisualDescriptionForConcept(conceptoEspanol, category = "") {
  const contextText = category ? `Contexto temático de la palabra (área o tema de vocabulario): "${category}". Úsalo para que el objeto tenga sentido y sea adecuado para este contexto específico (ej. si la categoría menciona "Auto" y el concepto es "luces" o "luz", describe luces/faros de auto, no lámparas domésticas; si menciona "Auto" y el concepto es "limpiaparabrisas", describe la escobilla o parabrisas del auto).` : '';
  const promptDirectorArte = `
    Actúa como Director de Arte de utilería 3D para flashcards educativas. 
    El usuario necesita representar visualmente el concepto en español: "${conceptoEspanol}".
    ${contextText}
    
    Tu tarea es proporcionar ÚNICAMENTE una descripción física en inglés del objeto o elemento central que representará esta palabra.
    
    REGLAS ESTRICTAS:
    1. TANGIBILIDAD: Describe un objeto físico real o una escena en miniatura. 
    2. ANTI-PAREIDOLIA (CRÍTICO): Si el concepto es abstracto (verbos, adjetivos, preposiciones, adverbios), descríbelo usando utilería INANIMADA y simbólica. Está absolutamente prohibido incluir rostros, ojos, caras felices, humanos o animales, a menos que la palabra represente explícitamente a una persona o ser vivo (ej. "madre", "perro").
    3. CERO TEXTO: Prohibido incluir letreros, pantallas con texto, libros abiertos con letras, o cualquier tipo de tipografía.
    4. PRECISIÓN: Ve directo a la forma física (ej. para "Enero" -> "A classic desk calendar with snowflakes", para "escribir" -> "A stylized feather quill pen resting on a clean notebook").
    
    Devuelve solo la descripción en inglés en una sola línea. Sin introducciones, sin confirmaciones y sin comillas.
  `;
  try {
    const res = await executeBackendGemini(promptDirectorArte, {
      keys: getGeminiKeyConfig(),
      preferredModel: "gemini-3.5-flash-lite",
      mode: "free_first" // Modo ahorro para micro-prompts de traducción
    });
    return res.text.trim().replace(/['"]/g, '');
  } catch (error) {
    console.warn("getVisualDescriptionForConcept falló en pool:", error.message);
    return conceptoEspanol;
  }
}

// Función auxiliar para traducir conceptos directos de sentimientos/adjetivos/verbos a inglés limpio
async function getCleanEnglishTranslation(wordEspanol) {
  const prompt = `Translate the Spanish word "${wordEspanol}" to a single English word representing the emotion, state, or action (e.g., "cansado" -> "tired", "feliz" -> "happy", "triste" -> "sad", "enojado" -> "angry"). Return ONLY the translated English word in lowercase, with no punctuation or extra text.`;
  try {
    const res = await executeBackendGemini(prompt, {
      keys: getGeminiKeyConfig(),
      preferredModel: "gemini-3.5-flash-lite",
      mode: "free_first"
    });
    return res.text.trim().toLowerCase().replace(/[^a-z\s-]/g, '');
  } catch (error) {
    console.warn("getCleanEnglishTranslation falló en pool:", error.message);
    return wordEspanol;
  }
}

const diccionarioIndustrial = {
  "der strom": "glowing yellow lightning bolt symbol",
  "die spannung": "industrial electrical voltmeter dial with a red needle",
  "der stromkreis": "closed electrical circuit board with a glowing lightbulb",
  "das kabel": "thick industrial electrical copper cable spool",
  "der stecker": "standard heavy European electrical plug",
  "die steckdose": "white electrical wall socket",
  "der schalter": "modern industrial wall light switch",
  "die sicherung": "industrial electrical fuse breaker box with switches",
  "der transformator": "heavy industrial electrical power transformer unit",
  "die batterie": "standard AA battery with plus and minus signs",
  "der akku": "green lithium ion rechargeable battery pack",
  "der zähler": "smart electrical power meter with digital display",
  "die erdung": "copper grounding rod driven into a small block of earth",
  "der kurzschluss": "broken thick electrical wire emitting bright electric sparks",
  "die solaranlage": "miniature house roof completely covered with solar panels",
  "das solarmodul": "single large blue photovoltaic solar panel on a stand",
  "die solarzelle": "close-up of a blue micro photovoltaic solar cell grid",
  "der wechselrichter": "modern solar power inverter wall box with a digital display",
  "der speicher": "large modern home solar battery storage unit",
  "das netz": "tall electrical power transmission tower with cables",
  "der ertrag": "rising bar chart with a glowing sun symbol on top",
  "die gleichspannung": "electrical block showing the Direct Current DC straight line symbol",
  "die wechselspannung": "oscilloscope screen showing an Alternating Current AC sine wave",
  "die leistung": "glowing futuristic energy core",
  "die dachmontage": "aluminum construction brackets mounted on a piece of rooftop",
  "das werkzeug": "open red toolbox filled with tools",
  "der schraubenzieher": "yellow and black mechanical screwdriver",
  "die zange": "pair of heavy metal pliers with rubber grips",
  "der bohrer": "heavy duty power drill",
  "das multimeter": "digital multimeter testing tool with red and black probes",
  "der helm": "yellow industrial hard hat",
  "die handschuhe": "pair of heavy duty protective leather work gloves",
  "die leiter": "tall aluminum folding stepladder",
  "die gefahr": "yellow high voltage warning triangle sign",
  "gefährlich": "yellow skull and crossbones hazard sign",
  "messen": "extended yellow measuring tape next to a wire",
  "anschließen": "two thick electrical cables firmly plugged together",
  "installieren": "silver wrench tightening a bolt on a metal machine part",
  "prüfen": "green checkmark hovering over a technical clipboard",
  "warten": "red oil can and a silver mechanical gear",
  "einschalten": "green glowing ON button switch",
  "ausschalten": "red glowing OFF button switch",
  "löten": "hot soldering iron melting silver wire onto a green circuit board",
  "isolieren": "roll of black electrical insulation tape",
  "abisolieren": "wire strippers removing plastic insulation from a thick copper wire",
  "austauschen": "two mechanical gears swapping places with arrows",
  "einspeisen": "electricity energy flowing from a house into a power grid tower",
  "funktionieren": "two interlocking mechanical gears turning smoothly"
};

// =========================================================================
// 5. GENERADOR DE IMÁGENES DE TARJETAS (generateCardImage)
// Modelo: fal-ai/flux-2
// =========================================================================

const diccionarioLetras = {
  "A, a": {
    shape: "uppercase letter A",
    obj: "shiny red apple"
  },
  // Apfel
  "B, b": {
    shape: "uppercase letter B",
    obj: "yellow banana"
  },
  // Banane
  "C, c": {
    shape: "uppercase letter C",
    obj: "cute chameleon"
  },
  // Chamäleon
  "D, d": {
    shape: "uppercase letter D",
    obj: "aluminum soda can"
  },
  // Dose
  "E, e": {
    shape: "uppercase letter E",
    obj: "cute little elephant"
  },
  // Elefant
  "F, f": {
    shape: "uppercase letter F",
    obj: "cute green frog"
  },
  // Frosch
  "G, g": {
    shape: "uppercase letter G",
    obj: "tall cute giraffe"
  },
  // Giraffe
  "H, h": {
    shape: "uppercase letter H",
    obj: "small cute 3D house"
  },
  // Haus
  "I, i": {
    shape: "uppercase letter I",
    obj: "cute little hedgehog"
  },
  // Igel
  "J, j": {
    shape: "uppercase letter J",
    obj: "folded colorful jacket"
  },
  // Jacke
  "K, k": {
    shape: "uppercase letter K",
    obj: "cute little cat"
  },
  // Katze (reemplaza Kitten)
  "L, l": {
    shape: "uppercase letter L",
    obj: "cute little lion"
  },
  // Löwe
  "M, m": {
    shape: "uppercase letter M",
    obj: "cute small mouse"
  },
  // Maus
  "N, n": {
    shape: "uppercase letter N",
    obj: "cute 3D human nose"
  },
  // Nase
  "O, o": {
    shape: "uppercase letter O",
    obj: "bright orange fruit"
  },
  // Orange
  "P, p": {
    shape: "uppercase letter P",
    obj: "cute little penguin"
  },
  // Pinguin
  "Q, q": {
    shape: "uppercase letter Q",
    obj: "cute pink jellyfish"
  },
  // Qualle (reemplaza Queen/Krone)
  "R, r": {
    shape: "uppercase letter R",
    obj: "beautiful red rose"
  },
  // Rose
  "S, s": {
    shape: "uppercase letter S",
    obj: "bright yellow sun"
  },
  // Sonne
  "T, t": {
    shape: "uppercase letter T",
    obj: "ceramic coffee mug"
  },
  // Tasse (reemplaza Tree/Baum)
  "U, u": {
    shape: "uppercase letter U",
    obj: "analog wall clock"
  },
  // Uhr (reemplaza Umbrella/Regenschirm)
  "V, v": {
    shape: "uppercase letter V",
    obj: "cute little flying bird"
  },
  // Vogel (reemplaza Violin/Geige)
  "W, w": {
    shape: "uppercase letter W",
    obj: "fluffy white cloud"
  },
  // Wolke (reemplaza Whale/Wal)
  "X, x": {
    shape: "uppercase letter X",
    obj: "colorful toy xylophone"
  },
  // Xylophon
  "Y, y": {
    shape: "uppercase letter Y",
    obj: "small luxury toy yacht"
  },
  // Yacht (reemplaza Yoyo/Jojo)
  "Z, z": {
    shape: "uppercase letter Z",
    obj: "cute little zebra"
  },
  // Zebra

  // Umlauts y caracteres especiales
  "Ä, ä": {
    shape: "uppercase letter A with two small dots (umlaut) floating above it",
    obj: "two shiny red apples"
  },
  // Äpfel
  "Ö, ö": {
    shape: "uppercase letter O with two small dots (umlaut) floating above it",
    obj: "small glass bottle of olive oil"
  },
  // Öl
  "Ü, ü": {
    shape: "uppercase letter U with two small dots (umlaut) floating above it",
    obj: "small open gift box with a surprise inside"
  },
  // Überraschung
  "ß": {
    shape: "German sharp S (Eszett) character",
    obj: "small piece of a paved street"
  } // Straße (contiene la ß)
};
const diccionarioNumeros = {
  "null": {
    num: "number 0",
    obj: "small empty yellow basket"
  },
  "eins": {
    num: "number 1",
    obj: "exactly one small bright yellow star"
  },
  "zwei": {
    num: "number 2",
    obj: "exactly two small bright yellow stars"
  },
  "drei": {
    num: "number 3",
    obj: "exactly three small bright yellow stars"
  },
  "vier": {
    num: "number 4",
    obj: "exactly four small bright yellow stars"
  },
  "fünf": {
    num: "number 5",
    obj: "exactly five small bright yellow stars"
  },
  "sechs": {
    num: "number 6",
    obj: "group of small bright yellow stars"
  },
  "sieben": {
    num: "number 7",
    obj: "group of small bright yellow stars"
  },
  "acht": {
    num: "number 8",
    obj: "group of small bright yellow stars"
  },
  "neun": {
    num: "number 9",
    obj: "group of small bright yellow stars"
  },
  "zehn": {
    num: "number 10",
    obj: "group of small bright yellow stars"
  },
  "elf": {
    num: "number 11",
    obj: "group of small bright yellow stars"
  },
  "zwölf": {
    num: "number 12",
    obj: "group of small bright yellow stars"
  },
  "dreizehn": {
    num: "number 13",
    obj: "group of small bright yellow stars"
  },
  "vierzehn": {
    num: "number 14",
    obj: "group of small bright yellow stars"
  },
  "fünfzehn": {
    num: "number 15",
    obj: "group of small bright yellow stars"
  },
  "sechzehn": {
    num: "number 16",
    obj: "group of small bright yellow stars"
  },
  "siebzehn": {
    num: "number 17",
    obj: "group of small bright yellow stars"
  },
  "achtzehn": {
    num: "number 18",
    obj: "group of small bright yellow stars"
  },
  "neunzehn": {
    num: "number 19",
    obj: "group of small bright yellow stars"
  },
  "zwanzig": {
    num: "number 20",
    obj: "group of small bright yellow stars"
  },
  "einundzwanzig": {
    num: "number 21",
    obj: "group of small bright yellow stars"
  },
  "dreißig": {
    num: "number 30",
    obj: "group of small bright yellow stars"
  },
  "vierzig": {
    num: "number 40",
    obj: "group of small bright yellow stars"
  },
  "fünfzig": {
    num: "number 50",
    obj: "group of small bright yellow stars"
  },
  "sechzig": {
    num: "number 60",
    obj: "group of small bright yellow stars"
  },
  "siebzig": {
    num: "number 70",
    obj: "group of small bright yellow stars"
  },
  "achtzig": {
    num: "number 80",
    obj: "group of small bright yellow stars"
  },
  "neunzig": {
    num: "number 90",
    obj: "group of small bright yellow stars"
  },
  "hundert": {
    num: "number 100",
    obj: "group of small bright yellow stars"
  },
  "tausend": {
    num: "number 1000",
    obj: "group of small bright yellow stars"
  },
  // Ordinales (Se renderizan como números con una medalla)
  "der erste": {
    num: "number 1",
    obj: "shiny gold medal"
  },
  "der zweite": {
    num: "number 2",
    obj: "shiny silver medal"
  },
  "der dritte": {
    num: "number 3",
    obj: "shiny bronze medal"
  },
  "der vierte": {
    num: "number 4",
    obj: "blue ribbon"
  },
  "der fünfte": {
    num: "number 5",
    obj: "small blue ribbon"
  },
  "der sechste": {
    num: "number 6",
    obj: "small blue ribbon"
  },
  "der siebte": {
    num: "number 7",
    obj: "small blue ribbon"
  },
  "der achte": {
    num: "number 8",
    obj: "small blue ribbon"
  },
  "der neunte": {
    num: "number 9",
    obj: "small blue ribbon"
  },
  "der zehnte": {
    num: "number 10",
    obj: "small blue ribbon"
  },
  "der elfte": {
    num: "number 11",
    obj: "small blue ribbon"
  },
  "der zwölfte": {
    num: "number 12",
    obj: "small blue ribbon"
  },
  "der zwanzigste": {
    num: "number 20",
    obj: "small blue ribbon"
  },
  "der einundzwanzigste": {
    num: "number 21",
    obj: "small blue ribbon"
  }
};

// Nuevo Diccionario de Preguntas
const diccionarioPreguntas = {
  "warum?": "a small cute 3D thought bubble",
  "wo?": "a small cute 3D map location pin",
  "wann?": "a small cute 3D hourglass",
  "wer?": "a small cute 3D user profile avatar",
  "was?": "a small cute 3D mystery gift box",
  "wie?": "two small interlocking puzzle pieces",
  "woher?": "a small cute 3D arrow pointing away from a map pin",
  "wohin?": "a small cute 3D arrow pointing directly at a target bulls-eye",
  "welcher?": "two small cute 3D checkboxes, one with a vibrant checkmark"
};

// Diccionario de Horas (Uhrzeit) para mapear manecillas de reloj exactas
const diccionarioUhrzeit = {
  "ein uhr": "a minimalist clean round 3D analog wall clock showing exactly 1:00, with the short hour hand pointing directly at the number 1, and the long minute hand pointing directly at the number 12",
  "halb zwei": "a minimalist clean round 3D analog wall clock showing exactly 1:30, with the short hour hand pointing halfway between 1 and 2, and the long minute hand pointing directly at the number 6",
  "viertel vor drei": "a minimalist clean round 3D analog wall clock showing exactly 2:45, with the short hour hand pointing close to the number 3, and the long minute hand pointing directly at the number 9",
  "kurz vor 4": "a minimalist clean round 3D analog wall clock showing exactly 3:55 (five minutes to 4), with the short hour hand pointing almost directly at 4, and the long minute hand pointing at 11",
  "gleich 4": "a minimalist clean round 3D analog wall clock showing exactly 3:58 (almost 4 o'clock), with the short hour hand pointing almost exactly at 4, and the long minute hand pointing very close to 12",
  "genau 4 uhr": "a minimalist clean round 3D analog wall clock showing exactly 4:00, with the short hour hand pointing directly at the number 4, and the long minute hand pointing directly at the number 12",
  "fünf nach 4": "a minimalist clean round 3D analog wall clock showing exactly 4:05 (five minutes past 4), with the short hour hand pointing slightly past 4, and the long minute hand pointing directly at the number 1",
  "um 3 uhr": "a minimalist clean round 3D analog wall clock showing exactly 3:00, with the short hour hand pointing directly at the number 3, and the long minute hand pointing directly at the number 12",
  "von 2 bis 3 uhr": "a minimalist clean round 3D analog wall clock with a brightly colored highlighted pie-slice segment between the hours 2 and 3, representing the time slot from 2:00 to 3:00",
  "ab 3 uhr": "a minimalist clean round 3D analog wall clock with a brightly colored highlighted pie-slice segment starting at 3:00 and extending clockwise, representing starting from 3:00 onwards"
};

// Diccionario de Conceptos Especiales (Palabras abstractas complejas)
const diccionarioConceptosEspeciales = {
  "der vorname": "a minimalist 3D isometric employee ID card badge with a lanyard, featuring a cartoon silhouette profile picture of a person and the first line of details highlighted in vibrant blue, resting on a clean white surface",
  "der nachname": "a minimalist 3D isometric family tree chart showing stylized connected icons of family members, representing family lineage and family name (surname), resting on a clean white surface",
  "das abblendlicht": "a 3D isometric car headlight emitting a focused bright yellow beam of light pointing downwards onto a road surface, representing low beam headlights",
  "das fernlicht": "a 3D isometric car headlight emitting intense, bright blue beams of light extending straight forward, representing high beam headlights",
  "das tagfahrlicht": "a 3D isometric car headlight with modern LED signature strip daytime running lights glowing softly in white",
  "die nebelschlussleuchte": "a 3D isometric rear car bumper showing a single glowing bright red fog light casting a strong red beam through a soft grey mist",
  "die bremsleuchte": "a 3D isometric rear car tail light assembly with the round brake lights glowing in intense red",
  "die warnblinkanlage": "a 3D isometric car dashboard hazard warning light button, featuring a red triangle icon glowing and flashing",
  "einsteigen / aussteigen": "a 3D isometric representation of a clean car with an open driver door, showing a path to enter or exit",
  "aufschließen": "a 3D isometric car door handle keyhole with a key being inserted or turned inside the lock",
  "der blinker / blinken": "a 3D isometric front corner of a car showing a bright orange amber indicator light blinking with radiating light rays",
  "die gangschaltung": "a 3D isometric gear shifter stick for a car transmission, showing a sphere knob with gear pattern markings on top",
  "der schalthebel": "a 3D isometric manual gear shift lever stick with a round knob showing gear numbers",
  "die bremse / bremsen": "a 3D isometric car brake pedal being pressed down slightly",
  "das bremspedal": "a 3D isometric car footwell showing a clean metal brake pedal being pressed down",
  "das gaspedal": "a 3D isometric car footwell showing an accelerator pedal being pressed down",
  "gas geben": "a 3D isometric car accelerator pedal being pressed down to speed up",
  "die kupplung": "a 3D isometric car clutch pedal being pressed down in the footwell",
  "die handbremse": "a 3D isometric car handbrake lever pulled up on the center console",
  "der scheibenwischer": "a 3D isometric car windshield with a wiper blade wiping away rain droplets, showing a clear swept arc",
  "der lichtschalter": "a 3D isometric dial switch on a car dashboard showing icons for headlights and fog lights",
  "der motor": "a 3D isometric modern clean car engine block with metal pipes and valve covers",
  "motor starten": "a 3D isometric car ignition switch with a key turning to start the engine, or an illuminated engine start-stop button glowing red"
};

const diccionarioAccionesDinamicas = {
  "abfahren": "train moving away from a station platform on tracks",
  "ankommen": "train arriving at a station platform",
  "einsteigen": "passenger stepping into a train or bus",
  "aussteigen": "passenger stepping out of a train or bus",
  "umsteigen": "two trains parked side by side at a station",
  "fliegen": "airplane flying high in the sky",
  "parken": "car perfectly parked in a parking slot",
  "regnen": "dark storm cloud dropping rain",
  "schneien": "fluffy cloud dropping snowflakes",
  "überholen": "car overtaking another car on the highway",
  "bremsen": "car tire braking hard on asphalt"
};

const mapColoresHex = {
  "weiß": "strictly white hex #FFFFFF",
  "schwarz": "strictly black hex #000000",
  "grau": "strictly grey hex #808080",
  "rot": "strictly red hex #FF0000",
  "blau": "strictly blue hex #0000FF",
  "gelb": "strictly yellow hex #FFFF00",
  "grün": "strictly green hex #008000",
  "braun": "strictly brown hex #8B4513",
  "orange": "strictly orange hex #FFA500",
  "rosa": "strictly pink hex #FFC0CB",
  "lila": "strictly purple hex #800080"
};

/**
 * 🏭 FÁBRICA DE PROMPTS (El Enrutador Lógico)
 * Estructura un JSON aislando colores naturales del indicador de género
 */
function construirPromptDinamico(conceptoIngles, tipoGramatical, palabraAleman = "") {
  // 1. Detección Inteligente de Color (Evita la epidemia gris leyendo el prefijo)
  let hexAsignado = "hex #9E9E9E";
  const palabraLimpia = (palabraAleman || "").trim().toLowerCase();
  const tipoLimpio = (tipoGramatical || "").toLowerCase().trim();

  // Detección infalible de preguntas
  const esPregunta = tipoLimpio.includes("pregunta") || tipoLimpio.includes("w-frage") || tipoLimpio.includes("interrogativ") || palabraLimpia.includes("?");
  const diasYMeses = ["montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag", "sonntag", "januar", "februar", "märz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"];

  // MODIFICACIÓN AQUÍ:
  if (palabraLimpia.startsWith("der ") || diasYMeses.includes(palabraLimpia)) {
    hexAsignado = "hex #4285F4";
  } else if (palabraLimpia.startsWith("die ")) {
    hexAsignado = "hex #EA4335";
  } else if (palabraLimpia.startsWith("das ")) {
    hexAsignado = "hex #34A853";
  } else if (tipoLimpio === "verbo" || tipoLimpio === "acción") {
    hexAsignado = "hex #FBBC05";
  } else if (tipoLimpio === "preposición" || tipoLimpio === "preposicion") {
    hexAsignado = "hex #FF9800";
  } else if (esPregunta) {
    hexAsignado = "hex #9C27B0";
  }

  // 2. Base JSON Estructurada
  let promptObj = {
    "scene": "A pure seamless solid white background in hex #FFFFFF",
    "subjects": [],
    "style": "3D isometric, minimalist, simple, educational language-app aesthetic, made of smooth matte soft clay",
    "lighting": "Bright, even studio lighting"
  };

  // 3. Enrutamiento Lógico de Sujetos
  if (esPregunta) {
    const objPregunta = diccionarioPreguntas[palabraLimpia] || "small cute 3D exclamation mark symbol";
    promptObj.subjects = [{
      "type": "large chunky 3D question mark symbol",
      "color": "strictly Material Purple hex #9C27B0",
      "position": "left"
    }, {
      "type": objPregunta,
      "color": "vibrant natural clay colors",
      "position": "sitting right next to the question mark"
    }];
  } else if (tipoLimpio === 'letra' || tipoLimpio === 'alfabeto') {
    const fallbackShape = `uppercase letter ${palabraAleman.charAt(0).toUpperCase()}`;
    const datosLetra = diccionarioLetras[palabraAleman] || {
      shape: fallbackShape,
      obj: "small colorful bouncy ball"
    };
    promptObj = {
      "scene": "A pure seamless solid white background hex #FFFFFF",
      "subjects": [{
        "type": `large chunky 3D block shaped like the ${datosLetra.shape}`,
        "color": "strictly Material Grey hex #9E9E9E",
        "position": "left"
      }, {
        "type": datosLetra.obj,
        "color": "vibrant natural clay colors",
        "position": "sitting right next to the letter block"
      }],
      "style_rules": "Strictly purely visual: absolutely NO TEXT, NO LETTERS, NO WORDS. Minimalist, simple, made of smooth matte soft clay."
    };
  } else if (tipoLimpio === 'numero' || tipoLimpio === 'número' || diccionarioNumeros[palabraLimpia]) {
    const datosNum = diccionarioNumeros[palabraLimpia] || {
      num: "number " + palabraLimpia,
      obj: "group of small bright yellow stars"
    };
    promptObj.subjects = [{
      "type": `large chunky 3D block shaped like the ${datosNum.num}`,
      "color": "strictly Material Grey hex #9E9E9E",
      "position": "left"
    }, {
      "type": datosNum.obj,
      "color": "vibrant Material Yellow",
      "position": "sitting right next to the number block"
    }];
  } else if (diccionarioUhrzeit[palabraLimpia]) {
    promptObj.subjects = [{
      "type": diccionarioUhrzeit[palabraLimpia],
      "description": "Clean, educational, clear visualization of time. Made of smooth matte soft clay. Purely visual, zero text.",
      "position": "centered"
    }];
  } else if (diccionarioConceptosEspeciales[palabraLimpia]) {
    promptObj.subjects = [{
      "type": diccionarioConceptosEspeciales[palabraLimpia],
      "description": "Clean, educational, minimalist language app illustration. Made of smooth matte soft clay. Purely visual, zero text.",
      "position": "centered"
    }, {
      "type": "small geometric floating sphere",
      "description": "Made of glossy clay, perfectly round, acting as a grammatical gender indicator. Zero text.",
      "position": "floating near the top right corner of the main object",
      "color_match": "exact",
      "color": hexAsignado
    }];
  } else if (diccionarioIndustrial[palabraLimpia]) {
    const isSinGenero = tipoLimpio === 'adverbio' || tipoLimpio === 'adjetivo' || tipoLimpio.includes('expresión') || tipoLimpio.includes('expresion') || tipoLimpio.includes('frase') || tipoLimpio.includes('regla') || palabraLimpia.includes('+');
    promptObj.subjects = [{
      "type": diccionarioIndustrial[palabraLimpia],
      "color": "natural realistic industrial colors",
      "position": "centered"
    }];
    if (!isSinGenero) {
      promptObj.subjects.push({
        "type": "A magical glowing sphere",
        "color": `strictly ${hexAsignado}`,
        "position": "floating gently next to the main object"
      });
    }
    promptObj.style_rules = "CRITICAL: Must be an INANIMATE object or symbolic prop. Absolutely NO FACES, NO EYES, NO MOUTHS. Strictly purely visual: absolutely NO TEXT, NO LETTERS, NO WORDS. Minimalist, simple.";
  } else {
    // 🔥 NUEVA LÓGICA DE ENRUTAMIENTO SEMÁNTICO (NUBE)
    const esColor = palabraLimpia === "weiß" || palabraLimpia === "schwarz" || palabraLimpia === "grau" || palabraLimpia === "rot" || palabraLimpia === "blau" || palabraLimpia === "gelb" || palabraLimpia === "grün" || palabraLimpia === "braun" || palabraLimpia === "orange" || palabraLimpia === "rosa" || palabraLimpia === "lila" || palabraLimpia.includes("farbe") || tipoLimpio.includes("color");
    const esAdjetivo = !esColor && (tipoLimpio.includes("adjetivo") || tipoLimpio.includes("sentimiento"));
    const esVerbo = !esColor && (tipoLimpio.includes("verbo") || tipoLimpio.includes("acción"));
    const esPersona = !esColor && (tipoLimpio.includes("pronombre") || tipoLimpio.includes("persona") || tipoLimpio.includes("profesión") || tipoLimpio.includes("profesion"));
    const esAbstractoInanimado = !esColor && (tipoLimpio.includes("preposición") || tipoLimpio.includes("preposicion") || tipoLimpio.includes("adverbio") || tipoLimpio.includes("conjunción"));

    // Filtro ampliado para determinar si lleva o no la esfera gramatical
    const isSinGenero = esColor || esAdjetivo || esVerbo || esPersona || esAbstractoInanimado || diccionarioAccionesDinamicas[palabraLimpia] || tipoLimpio.includes('expresión') || tipoLimpio.includes('expresion') || tipoLimpio.includes('frase') || tipoLimpio.includes('regla') || palabraLimpia.includes('+');
    let subjectType = conceptoIngles;
    const colorAsignado = hexAsignado; // Garantizar compatibilidad con hexAsignado

    // Asignación de sujeto y escudo anti-caritas según el tipo
    if (diccionarioAccionesDinamicas[palabraLimpia]) {
      subjectType = diccionarioAccionesDinamicas[palabraLimpia];
    } else if (esColor) {
      subjectType = conceptoIngles;
      promptObj.style_rules = "CRITICAL: Purely visual representation of the color itself. Absolutely NO PEOPLE, NO CHARACTERS, NO CLOTHES, NO FACES, NO ANIMALS. Minimalist, simple.";
    } else if (esAdjetivo) {
      subjectType = `expressive human character who is visibly ${conceptoIngles}. The character's pose, facial expression, and body language perfectly illustrate the adjective`;
    } else if (esVerbo) {
      subjectType = `expressive human character actively performing the action of ${conceptoIngles}. The character's pose dynamically captures the verb in motion`;
    } else if (esPersona) {
      subjectType = `expressive human character representing a ${conceptoIngles}`;
    } else if (esAbstractoInanimado) {
      subjectType = `faceless inanimate object or symbolic prop representing the concept of "${conceptoIngles}"`;
      promptObj.style_rules += " CRITICAL: Must be an INANIMATE object or symbolic prop. Absolutely NO FACES, NO EYES, NO MOUTHS, NO ANIMALS, NO CHARACTERS, NO ANTHROPOMORPHISM.";
    } else {
      subjectType = `UI icon representing "${conceptoIngles}"`;
    }

    // Determinar el color del sujeto principal
    let colorDelSujeto = "vibrant natural clay colors";
    if (esColor) {
      if (mapColoresHex[palabraLimpia]) {
        colorDelSujeto = mapColoresHex[palabraLimpia];
      } else {
        const limpio = (conceptoIngles || "").replace("a vibrant splash of ", "").replace(" paint", "").trim().toLowerCase();
        colorDelSujeto = limpio ? `strictly ${limpio}` : "vibrant natural clay colors";
      }
    }

    // Insertar el sujeto principal
    promptObj.subjects.push({
      "type": subjectType,
      "color": colorDelSujeto,
      "position": isSinGenero ? "centered" : "left"
    });

    // Insertar la esfera indicadora de género si corresponde
    if (!isSinGenero) {
      promptObj.subjects.push({
        "type": "magical glowing sphere",
        "color": `strictly ${colorAsignado}`,
        "position": "floating gently right next to the main object"
      });
    }
  }
  return JSON.stringify(promptObj);
}
export const generateCardImage = onCall({
  secrets: ALL_AI_SECRETS
}, async request => {
  const authUser = await assertApprovedUser(request);
  const {
    wordObj,
    conceptoIngles
  } = request.data || {};
  if (!wordObj || !wordObj.es || !wordObj.de) {
    throw new HttpsError("invalid-argument", "Faltan parámetros requeridos en wordObj");
  }

  // Usar el tipo gramatical si viene en wordObj, o intentar deducirlo
  const tipoGramatical = wordObj.type || wordObj.tipo_gramatical || 'sustantivo';
  const tipoLimpio = tipoGramatical.toLowerCase().trim();
  const palabraLimpia = (wordObj.de || "").trim().toLowerCase();
  const categoryLimpia = (wordObj.category || request.data?.category || "").toLowerCase().trim();
  const esColor = palabraLimpia === "weiß" || palabraLimpia === "schwarz" || palabraLimpia === "grau" || palabraLimpia === "rot" || palabraLimpia === "blau" || palabraLimpia === "gelb" || palabraLimpia === "grün" || palabraLimpia === "braun" || palabraLimpia === "orange" || palabraLimpia === "rosa" || palabraLimpia === "lila" || palabraLimpia.includes("farbe") || categoryLimpia.includes("farben") || categoryLimpia.includes("color") || tipoLimpio.includes("color");
  const esPersonaje = !esColor && (tipoLimpio.includes("adjetivo") || tipoLimpio.includes("verbo") || tipoLimpio.includes("acción") || tipoLimpio.includes("pronombre") || tipoLimpio.includes("sentimiento"));

  // ── CACHE CHECK BARRIER (global_flashcards) ───────────────────────────────
  const safeWordId = wordObj.de.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
  try {
    const cacheRef = db.collection("global_flashcards").doc(safeWordId);
    const docSnap = await cacheRef.get();
    if (docSnap.exists && docSnap.data().imageUrl) {
      console.log(`✅ Cache Hit Backend: Imagen recuperada de global_flashcards [${safeWordId}]`);
      return { imageUrl: docSnap.data().imageUrl };
    }
  } catch (cacheErr) {
    console.warn("⚠️ Cache check falló, continuando con generación:", cacheErr.message);
  }
  // ── FIN CACHE CHECK ───────────────────────────────────────────────────────

  // Bloquear generación y escritura en global_flashcards fuera de entorno autorizado en servidor
  if (!isServerAuthorizedMediaWriter(request, authUser)) {
    return { imageUrl: null, error: "Generación deshabilitada fuera de entorno local autorizado" };
  }

  try {
    fal.config({
      credentials: falKey.value()
    });

    // Si no tenemos un concepto en inglés predefinido, usamos Gemini Resilient Pool para traducirlo rápido
    let concepto = conceptoIngles;
    if (esColor) {
      // Si es un color, obtenemos la traducción limpia en inglés (ej. "blanco" -> "white")
      // y definimos una salpicadura de pintura de ese color en lugar de personas
      const colorEn = await getCleanEnglishTranslation(wordObj.es);
      concepto = `a vibrant splash of ${colorEn} paint`;
    } else if (esPersonaje) {
      // Ignorar la descripción de icono predefinida (por ej. luna, estrella, nube con caritas)
      // para forzar la generación de un personaje humano que represente la emoción/acción.
      concepto = await getCleanEnglishTranslation(wordObj.es);
    } else if (!concepto) {
      const category = (request.data.category || "") + (wordObj.category ? ` - ${wordObj.category}` : "");
      concepto = await getVisualDescriptionForConcept(wordObj.es, category);
    }

    // Ensamblar el prompt usando la Fábrica
    const promptDinamicoGenerado = construirPromptDinamico(concepto, tipoGramatical, wordObj.de);
    console.log(`🎨 Renderizando: ${wordObj.de} (${tipoGramatical})`);
    console.log(`📝 Prompt ensamblado: "${promptDinamicoGenerado}"`);

    // 3. Llamamos a Flux a través de Fal.ai (optimizando API endpoint, formato y dimensiones)
    const result = await fal.subscribe("fal-ai/flux-2/klein/9b/base", {
      input: {
        prompt: promptDinamicoGenerado,
        image_size: {
          width: 512,
          height: 512
        },
        num_inference_steps: 20,
        guidance_scale: 3.5,
        output_format: "jpeg"
      }
    });
    const dataUri = result.data.images?.[0]?.url || result.data?.url || result.images && result.images[0]?.url;
    if (!dataUri) throw new Error("No image data returned from FAL API");

    // PARTE 1: Guardado Global en Caché (safeWordId ya definido en el Cache Check)
    try {
      await db.collection("global_flashcards").doc(safeWordId).set({
        imageUrl: dataUri,
        model: "fal-ai/flux-2/klein/9b/base",
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, {
        merge: true
      });
    } catch (err) {
      console.warn("No se pudo guardar en el caché global:", err);
    }
    return {
      imageUrl: dataUri
    };
  } catch (error) {
    console.error("Error en generateCardImage:", error);
    throw new HttpsError("internal", "Error al generar imagen de la tarjeta", error.message);
  }
});

// =========================================================================
// 6. GENERADOR DE COMPRENSIÓN LECTORA (generateReadingTest)
// =========================================================================
function normalizeImmersiveReadlePayload(raw, { category, level }) {
  const wordGlossary = raw?.wordGlossary && !Array.isArray(raw.wordGlossary)
    ? { ...raw.wordGlossary }
    : {};

  if (Array.isArray(raw?.wordGlossaryEntries)) {
    for (const item of raw.wordGlossaryEntries) {
      if (item?.wordKey) {
        const cleanKey = String(item.wordKey).toLowerCase().trim();
        wordGlossary[cleanKey] = {
          lemma: item.lemma || item.wordKey,
          translationEs: item.translationEs || "",
          pos: item.pos || "Wort",
          level: item.level || level,
          isVerb: Boolean(item.isVerb),
          ...(item.conjugationKey ? { conjugationKey: item.conjugationKey } : {})
        };
      }
    }
  }

  const verbConjugations = raw?.verbConjugations && !Array.isArray(raw.verbConjugations)
    ? { ...raw.verbConjugations }
    : {};

  if (Array.isArray(raw?.verbConjugationsEntries)) {
    for (const vc of raw.verbConjugationsEntries) {
      if (vc?.key) {
        verbConjugations[vc.key] = {
          infinitive: vc.infinitive || vc.key,
          translationEs: vc.translationEs || "",
          auxiliary: vc.auxiliary || "haben",
          praesens: vc.praesens || {},
          praeteritum: vc.praeteritum || {},
          perfekt: vc.perfekt || "",
          partizip: vc.partizip || ""
        };
      }
    }
  }

  const rawSlug = String(raw?.id || raw?.titleDe || "story")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .substring(0, 48);

  const uniqueSuffix = Date.now().toString(36);
  const storyId = `${category}_${rawSlug || "custom"}_${uniqueSuffix}`;

  return {
    id: storyId,
    titleDe: raw?.titleDe || "Neue Tagesgeschichte",
    titleEs: raw?.titleEs || "Nueva historia diaria",
    level: raw?.level === "A2" || level === "A2" ? "A2" : "A1",
    levelLabel: raw?.level === "A2" || level === "A2" ? "A2" : "A1",
    category,
    emoji: raw?.emoji || (category === "enpal" ? "⚡" : category === "behoerden" ? "🏛️" : "👨‍👩‍👧‍👦"),
    readTime: raw?.readTime || "3 min",
    sentences: Array.isArray(raw?.sentences) ? raw.sentences : [],
    wordGlossary,
    verbConjugations,
    examQuestions: Array.isArray(raw?.examQuestions) ? raw.examQuestions : [],
    keyWords: Array.isArray(raw?.keyWords) ? raw.keyWords : [],
    grammarCards: Array.isArray(raw?.grammarCards) ? raw.grammarCards : []
  };
}

export const generateReadingTest = onCall({
  secrets: ALL_AI_SECRETS,
  timeoutSeconds: 120
}, async request => {
  await assertApprovedUser(request);
  const {
    tema,
    mode,
    category = "enpal",
    level = "A1"
  } = request.data || {};
  if (!tema) {
    throw new HttpsError("invalid-argument", "Falta el parámetro requerido: tema");
  }

  if (mode === "immersive_readle") {
    const safeCategory = ["enpal", "behoerden", "familie"].includes(category) ? category : "enpal";
    const safeLevel = level === "A2" ? "A2" : "A1";

    const categoryContext = safeCategory === "enpal"
      ? `CONTEXTO OBLIGATORIO ENPAL (SOLO INTERIORES): El estudiante trabaja como Elektriker en Enpal y NUNCA realiza montaje en el tejado (Dachmontage). Toda la historia debe transcurrir exclusivamente en interiores: Keller / Technikraum, Zählerschrank, conexión de Wechselrichter AC/DC, Speicher (baterías), Smart Meter, Wallbox, mediciones con Multimeter o Spannungsprüfer, las 5 reglas de seguridad VDE (Stromkreis freischalten) y trato técnico con el cliente. PROHIBIDO mencionar el tejado o paneles solares en el techo.`
      : safeCategory === "behoerden"
        ? `CONTEXTO BEHÖRDEN & VIDA EN ALEMANIA: Trámites reales en oficinas alemanas (Bürgeramt, Ausländerbehörde, Krankenkasse, Führerschein, banco, contratos o salud) con vocabulario útil práctico para vivir y trabajar en Alemania.`
        : `CONTEXTO FAMILIENNACHZUG & VIDA FAMILIAR: Situaciones reales de reagrupación familiar (esposa, dos hijos varones, una hija pequeña), vivienda para cinco personas, colegio/Kita, Kindergeld y vida cotidiana en Alemania.`;

    const defaultReadleInstruction = `
      Eres un profesor experto de alemán del Goethe-Institut y editor pedagógico estilo Readle.
      Genera una historia inmersiva completa en nivel ${safeLevel} sobre el tema solicitado.
      ${categoryContext}

      REQUISITOS OBLIGATORIOS DE CONTENIDO:
      1. sentences: Entre 6 y 8 oraciones naturales y bien conectadas en alemán nivel ${safeLevel}, cada una con su traducción interlineal precisa al español ("de" y "es").
      2. wordGlossaryEntries: Diccionario exhaustivo de las palabras principales de la historia (al menos 20 palabras) con: wordKey (la palabra limpia en minúsculas tal como aparece en el texto), lemma (forma base con artículo der/die/das si es sustantivo, o infinitivo si es verbo), translationEs, pos ("Nomen", "Verb", "Adj.", "Adv.", etc.), level ("A1" o "A2"), isVerb (boolean) y conjugationKey (si isVerb=true, debe coincidir exactamente con una clave de verbConjugationsEntries).
      3. verbConjugationsEntries: Tablas de conjugación completas para los verbos clave de la historia (mínimo 4 verbos) con key, infinitive, translationEs, auxiliary ("haben" o "sein"), praesens (ich, du, er_sie_es, wir, ihr, sie_Sie), praeteritum (ich, du, er_sie_es, wir, ihr, sie_Sie), perfekt (ej. "hat angeschlossen") y partizip (ej. "anschließend").
      4. examQuestions: Exactamente 4 preguntas (2 de comprensión lectora con "type": "comprehension" y 2 de hueco gramatical Cloze con "___" sobre frases reales de la historia con "type": "cloze"), cada una con 3 opciones, "correctIndex" (0, 1 o 2) y "explanationEs" concluyente en español.
      5. keyWords: Entre 8 y 10 palabras o expresiones clave de la historia con de, es, pos, level, exampleDe y exampleEs.
      6. grammarCards: 2 fichas gramaticales estilo Readle con title, exampleDe (oración real de la historia), highlightedPart, exampleEs, descriptionEs clara en español, table ({ headers, rows }) y extraExamples ([{ de, es }]).
      7. FORMATO: Usa diacríticos estándar del alemán (ä, ö, ü, ß). No pongas espacios antes de signos de puntuación. Responde estrictamente con JSON válido.
    `;

    const systemInstruction = await getSystemPrompt("reading_readle_system", defaultReadleInstruction);
    const promptUser = `Genera una historia inmersiva Readle completa. Categoría: "${safeCategory}". Nivel: "${safeLevel}". Tema: "${tema}".`;

    const immersiveReadleSchema = {
      type: SchemaType.OBJECT,
      properties: {
        id: { type: SchemaType.STRING },
        titleDe: { type: SchemaType.STRING },
        titleEs: { type: SchemaType.STRING },
        level: { type: SchemaType.STRING },
        category: { type: SchemaType.STRING },
        emoji: { type: SchemaType.STRING },
        readTime: { type: SchemaType.STRING },
        sentences: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              de: { type: SchemaType.STRING },
              es: { type: SchemaType.STRING }
            },
            required: ["de", "es"]
          }
        },
        wordGlossaryEntries: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              wordKey: { type: SchemaType.STRING },
              lemma: { type: SchemaType.STRING },
              translationEs: { type: SchemaType.STRING },
              pos: { type: SchemaType.STRING },
              level: { type: SchemaType.STRING },
              isVerb: { type: SchemaType.BOOLEAN },
              conjugationKey: { type: SchemaType.STRING }
            },
            required: ["wordKey", "lemma", "translationEs", "pos", "level", "isVerb"]
          }
        },
        verbConjugationsEntries: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              key: { type: SchemaType.STRING },
              infinitive: { type: SchemaType.STRING },
              translationEs: { type: SchemaType.STRING },
              auxiliary: { type: SchemaType.STRING },
              praesens: {
                type: SchemaType.OBJECT,
                properties: {
                  ich: { type: SchemaType.STRING },
                  du: { type: SchemaType.STRING },
                  er_sie_es: { type: SchemaType.STRING },
                  wir: { type: SchemaType.STRING },
                  ihr: { type: SchemaType.STRING },
                  sie_Sie: { type: SchemaType.STRING }
                },
                required: ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"]
              },
              praeteritum: {
                type: SchemaType.OBJECT,
                properties: {
                  ich: { type: SchemaType.STRING },
                  du: { type: SchemaType.STRING },
                  er_sie_es: { type: SchemaType.STRING },
                  wir: { type: SchemaType.STRING },
                  ihr: { type: SchemaType.STRING },
                  sie_Sie: { type: SchemaType.STRING }
                },
                required: ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"]
              },
              perfekt: { type: SchemaType.STRING },
              partizip: { type: SchemaType.STRING }
            },
            required: ["key", "infinitive", "translationEs", "auxiliary", "praesens", "praeteritum", "perfekt", "partizip"]
          }
        },
        examQuestions: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              type: { type: SchemaType.STRING },
              prompt: { type: SchemaType.STRING },
              options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
              correctIndex: { type: SchemaType.INTEGER },
              explanationEs: { type: SchemaType.STRING }
            },
            required: ["type", "prompt", "options", "correctIndex", "explanationEs"]
          }
        },
        keyWords: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              de: { type: SchemaType.STRING },
              es: { type: SchemaType.STRING },
              pos: { type: SchemaType.STRING },
              level: { type: SchemaType.STRING },
              exampleDe: { type: SchemaType.STRING },
              exampleEs: { type: SchemaType.STRING }
            },
            required: ["de", "es", "pos", "level", "exampleDe", "exampleEs"]
          }
        },
        grammarCards: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: { type: SchemaType.STRING },
              exampleDe: { type: SchemaType.STRING },
              highlightedPart: { type: SchemaType.STRING },
              exampleEs: { type: SchemaType.STRING },
              descriptionEs: { type: SchemaType.STRING },
              table: {
                type: SchemaType.OBJECT,
                properties: {
                  headers: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                  rows: { type: SchemaType.ARRAY, items: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } } }
                },
                required: ["headers", "rows"]
              },
              extraExamples: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    de: { type: SchemaType.STRING },
                    es: { type: SchemaType.STRING }
                  },
                  required: ["de", "es"]
                }
              }
            },
            required: ["title", "exampleDe", "highlightedPart", "exampleEs", "descriptionEs", "table", "extraExamples"]
          }
        }
      },
      required: [
        "id",
        "titleDe",
        "titleEs",
        "level",
        "category",
        "emoji",
        "readTime",
        "sentences",
        "wordGlossaryEntries",
        "verbConjugationsEntries",
        "examQuestions",
        "keyWords",
        "grammarCards"
      ]
    };

    let parsedStory = null;
    try {
      console.log("ReadingReadle FinOps: Invocando pool de llaves con gemini-3.8-flash...");
      const poolRes = await executeBackendGemini(promptUser, {
        keys: getGeminiKeyConfig(),
        preferredModel: "gemini-3.8-flash",
        systemInstruction,
        responseSchema: immersiveReadleSchema,
        mode: "paid_first"
      });
      const cleanJson = poolRes.text.trim().replace(/^```json\s*/i, "").replace(/```$/, "").replace(/```/g, "").trim();
      parsedStory = JSON.parse(cleanJson);
    } catch (geminiError) {
      console.warn("ReadingReadle FinOps: Fallaron las llaves de Gemini. Activando fallback a Claude Haiku 4.5:", geminiError.message);
      try {
        fal.config({ credentials: falKey.value() });
        const finalPromptUser = `${promptUser}\n\nDevuelve un JSON válido con las claves exactas: id, titleDe, titleEs, level, category, emoji, readTime, sentences, wordGlossaryEntries, verbConjugationsEntries, examQuestions, keyWords, grammarCards. Sin markdown ni texto fuera del JSON.`;
        const response = await fal.subscribe("openrouter/router/enterprise", {
          input: {
            model: "anthropic/claude-haiku-4.5",
            prompt: finalPromptUser,
            system_prompt: systemInstruction,
            temperature: 0.65,
            top_p: 0.9
          }
        });
        const outputText = response.data.output || response.data.text || "";
        const cleanJson = outputText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        parsedStory = JSON.parse(cleanJson);
      } catch (fallbackError) {
        console.error("ReadingReadle FinOps: Error crítico en ambos proveedores:", fallbackError);
        throw new HttpsError("internal", "Error generando historia inmersiva Readle: " + fallbackError.message);
      }
    }

    const storyData = normalizeImmersiveReadlePayload(parsedStory, {
      category: safeCategory,
      level: safeLevel
    });

    try {
      await db.collection("global_stories").doc(storyData.id).set(
        {
          ...storyData,
          createdBy: request.auth?.uid || null,
          topicQuery: String(tema).slice(0, 200),
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    } catch (firestoreErr) {
      console.warn("ReadingReadle: Error al persistir en global_stories (continuando entrega al cliente):", firestoreErr?.message || firestoreErr);
    }

    return storyData;
  }

  const defaultSystemInstruction = `
      Eres un profesor de alemán de nivel A1 del Goethe-Institut. El usuario te dará un tema de su interés.
      Tu tarea es generar:
      1. Un título en alemán para la lectura.
      2. Un texto de lectura en alemán nivel A1 sobre el tema con una longitud mínima estricta de 100 a 130 palabras, dividido fluidamente en 2 o 3 párrafos. Usa conectores A1 (und, oder, aber, denn) para unir ideas y dar mayor volumen de lectura.
      3. Un cuestionario de exactamente 3 preguntas de opción múltiple en alemán para medir la comprensión lectora del texto.
      
      Debes devolver ÚNICAMENTE un JSON con esta estructura exacta:
      {
        "titulo_aleman": "...",
        "texto_aleman": "...",
        "preguntas": [
          {
            "pregunta_aleman": "...",
            "opciones_aleman": ["Opción A", "Opción B", "Opción C"],
            "respuesta_correcta": "La opción exacta (debe coincidir exactamente con una de las opciones del array opciones_aleman)",
            "explicacion_espanol": "Una retroalimentación didáctica y concluyente en español. Debe explicar claramente y de forma ultra-sencilla por qué la opción correcta es la adecuada basándose en el texto, y por qué las otras no lo son, asegurando que el alumno aprenda tanto si acertó como si falló. PROHIBIDO hacer preguntas abiertas o retóricas al final."
          }
        ]
      }

      === RIGOR GOETHE ZERTIFIKAT A1 (LESEN) ===
      1. LONGITUD OBLIGATORIA Y CONECTORES: El 'texto_aleman' DEBE tener estrictamente entre 100 y 130 palabras. Tienes PROHIBIDO hacer listas de oraciones cortas y robóticas. Escribe 2 o 3 párrafos fluidos uniendo las ideas con conectores A1 (und, oder, aber, denn, deshalb).
      2. PROHIBIDA LA EXTRACCIÓN LITERAL (El Juego de los Espejos): Las preguntas de comprensión JAMÁS deben resolverse buscando la misma frase exacta en el texto. Debes obligar al alumno a usar deducción por antónimos o sinónimos simples. Ej: Si el texto dice 'Das Hotel ist nicht teuer' (El hotel no es caro), la opción correcta de la pregunta debe ser 'Es ist billig / günstig' (Es barato).
      3. DISTRACTORES LETALES: Las 2 opciones incorrectas de cada pregunta DEBEN ser sustantivos o datos que SÍ aparecen en el texto, pero que pertenecen a otro sujeto, lugar o momento. Prohibido usar palabras que no estén en la lectura para despistar.

      === EJEMPLO DE SALIDA ESPERADA (FEW-SHOT PATTERN) ===
      Estudia este ejemplo. Nota cómo el texto tiene más de 100 palabras, usa conectores, la primera pregunta usa la trampa de antónimos (nicht teuer -> billig) y los distractores son palabras que sí aparecen en la lectura pero en otro contexto:

      {
        "titulo_aleman": "Ein Wochenende in Berlin",
        "texto_aleman": "Ich heiße Martin und ich besuche dieses Wochenende Berlin. Die Stadt ist sehr groß und interessant. Das Wetter ist leider schlecht, denn es regnet viel. Mein Hotelzimmer ist klein, aber es ist nicht teuer. Ich besuche viele Museen, weil ich Geschichte liebe. Am Mittag esse ich eine Currywurst mit Pommes. Das ist sehr typisch hier. Meine Schwester Anna wohnt auch in Berlin, aber sie studiert heute an der Universität. Am Abend gehen wir zusammen in ein Restaurant. Wir trinken ein Bier und sprechen viel. Morgen fahre ich mit dem Zug zurück nach Hamburg. Die Reise war kurz, aber sehr schön.",
        "preguntas": [
          {
            "pregunta_aleman": "Wie ist das Hotelzimmer von Martin?",
            "opciones_aleman": [
              "Es ist billig.",
              "Es ist groß.",
              "Es ist teuer."
            ],
            "respuesta_correcta": "Es ist billig.",
            "explicacion_espanol": "La respuesta correcta es 'Es ist billig' (Es barato) porque el texto dice 'es ist nicht teuer' (no es caro). 'Es ist groß' es incorrecta porque el texto dice que es pequeña (la ciudad es la grande)."
          },
          {
            "pregunta_aleman": "Was macht Anna heute?",
            "opciones_aleman": [
              "Sie studiert an der Universität.",
              "Sie isst eine Currywurst.",
              "Sie fährt mit dem Zug."
            ],
            "respuesta_correcta": "Sie studiert an der Universität.",
            "explicacion_espanol": "La respuesta es 'Sie studiert an der Universität'. Las otras opciones son trampas: Martin es quien come Currywurst y quien viaja en tren, no Anna."
          }
        ]
      }

      REGLAS DE FORMATO Y LENGUAJE:
      - RETROALIMENTACIÓN CONCLUYENTE: En 'explicacion_espanol', ofrece una conclusión didáctica sin preguntas abiertas o retóricas al final.
      - Usa diacríticos/umlauts estándar del alemán (ä, ö, ü, ß) en lugar de dígrafos (como "fuer" en lugar de "für", o "schoen" en lugar de "schön").
      - NO coloques espacios antes de los signos de puntuación (ej. escribe "Familie." y no "Familie .", "Personen:" y no "Personen :", "Vater," y no "Vater ,"). El texto debe tener una puntuación limpia y profesional.
      - Responde únicamente con el formato JSON válido.
      - El texto y las preguntas deben estar estrictamente redactados en alemán nivel A1.
      - La explicación de las respuestas correctas debe estar en español.
    `;
  const systemInstruction = await getSystemPrompt("reading_comprehension_system", defaultSystemInstruction);
  const promptUser = `Genera la prueba de comprensión lectora para el tema: "${tema}".`;

  const readingSchema = {
    type: SchemaType.OBJECT,
    properties: {
      titulo_aleman: { type: SchemaType.STRING, description: "Título en alemán para la lectura" },
      texto_aleman: { type: SchemaType.STRING, description: "Texto de lectura corto y sencillo en alemán nivel A1" },
      preguntas: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            pregunta_aleman: { type: SchemaType.STRING, description: "Pregunta de opción múltiple en alemán" },
            opciones_aleman: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "3 opciones de respuesta en alemán"
            },
            respuesta_correcta: { type: SchemaType.STRING, description: "La opción exacta de respuesta correcta" },
            explicacion_espanol: { type: SchemaType.STRING, description: "Una retroalimentación didáctica y concluyente en español. Debe explicar claramente por qué la opción correcta es la adecuada. PROHIBIDO hacer preguntas abiertas o retóricas al final." }
          },
          required: ["pregunta_aleman", "opciones_aleman", "respuesta_correcta", "explicacion_espanol"]
        },
        description: "Lista de exactamente 3 preguntas de opción múltiple"
      }
    },
    required: ["titulo_aleman", "texto_aleman", "preguntas"]
  };

  try {
    console.log("ReadingTest FinOps: Invocando pool de 3 llaves con gemini-3.8-flash...");
    const poolRes = await executeBackendGemini(promptUser, {
      keys: getGeminiKeyConfig(),
      preferredModel: "gemini-3.8-flash",
      systemInstruction,
      responseSchema: readingSchema,
      mode: "paid_first"
    });
    const cleanJson = poolRes.text.trim().replace(/^```json\s*/i, "").replace(/```$/, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (geminiError) {
    console.warn("ReadingTest FinOps: Fallaron las llaves de Gemini. Activando fallback a Claude Haiku 4.5:", geminiError.message);
    try {
      fal.config({
        credentials: falKey.value()
      });
      console.log("ReadingTest FinOps: Invocando Claude Haiku 4.5 via Fal.ai...");

      const finalPromptUser = promptUser + "\n\nResponde estrictamente en formato JSON válido, sin bloques de código ```json ni texto adicional fuera del JSON.";
      const response = await fal.subscribe("openrouter/router/enterprise", {
        input: {
          model: "anthropic/claude-haiku-4.5",
          prompt: finalPromptUser,
          system_prompt: systemInstruction,
          temperature: 0.7,
          top_p: 0.9
        }
      });

      const outputText = response.data.output || response.data.text || "";
      const cleanJson = outputText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      return JSON.parse(cleanJson);
    } catch (fallbackError) {
      console.error("ReadingTest FinOps: Error crítico en fallback de Claude Haiku 4.5:", fallbackError);
      throw new HttpsError("internal", "Error generando el examen de comprensión lectora en ambos proveedores: " + fallbackError.message);
    }
  }
});

export const generateDynamicQuiz = onCall({
  timeoutSeconds: 120,
  memory: "512MiB",
  secrets: ALL_AI_SECRETS,
}, async (request) => {
  await assertApprovedUser(request);
  const { tema } = request.data || {};
  if (!tema) {
    throw new HttpsError("invalid-argument", "El parámetro 'tema' es obligatorio.");
  }

  const systemInstruction = `=== REGULACIÓN PEDAGÓGICA Y DE CONTENIDO ===
Actúa como un examinador oficial del Goethe-Institut especializado en el nivel A1 (Start Deutsch 1). Tu objetivo es evaluar al estudiante mediante un quiz de exactamente 10 preguntas de opción múltiple.
El usuario proporcionará el tema gramatical o de vocabulario a evaluar.

Genera un JSON estrictamente válido que contenga:
1. 'titulo_quiz': Un título atractivo y contextualizado en español sobre el tema.
2. 'preguntas': Un array de exactamente 10 objetos de preguntas independientes. Para evitar la monotonía, varía los verbos, contextos y sustantivos en cada pregunta. Cada objeto debe tener:
   - 'pregunta': Una oración corta en alemán con un hueco (___) o una pregunta situacional sencilla A1.
   - 'opciones': Un array de exactamente 3 opciones de respuesta cortas en alemán (alineado al estándar real A/B/C del Goethe A1).
   - 'respuesta_correcta': La opción exacta del array que es la correcta.
   - 'explicacion_didactica': Una breve explicación pedagógica en español de máximo 2 líneas que aclare la regla aplicada y descarte los distractores de forma ultra-sencilla.

Mantén la dificultad estrictamente en el nivel A1 (oraciones muy simples, vocabulario básico, presente e imperativo, estructuras sencillas). Cero excepciones avanzadas.`;

  const promptUser = `Genera un quiz de exactamente 10 preguntas para el nivel Goethe A1 sobre el siguiente tema: ${tema}.`;

  const quizSchema = {
    type: SchemaType.OBJECT,
    properties: {
      titulo_quiz: { type: SchemaType.STRING, description: "Título atractivo en español sobre el tema" },
      preguntas: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            pregunta: { type: SchemaType.STRING, description: "Oración corta en alemán con hueco (___) o pregunta situacional A1" },
            opciones: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Exactamente 3 opciones de respuesta en alemán"
            },
            respuesta_correcta: { type: SchemaType.STRING, description: "La opción exacta del array que es correcta" },
            explicacion_didactica: { type: SchemaType.STRING, description: "Breve explicación pedagógica en español de máximo 2 líneas" }
          },
          required: ["pregunta", "opciones", "respuesta_correcta", "explicacion_didactica"]
        },
        description: "Lista de exactamente 10 preguntas independientes A1"
      }
    },
    required: ["titulo_quiz", "preguntas"]
  };

  try {
    console.log("DynamicQuiz FinOps: Invocando pool de 3 llaves con gemini-3.8-flash...");
    const poolRes = await executeBackendGemini(promptUser, {
      keys: getGeminiKeyConfig(),
      preferredModel: "gemini-3.8-flash",
      systemInstruction,
      responseSchema: quizSchema,
      mode: "paid_first"
    });

    const cleanJson = poolRes.text.trim().replace(/^```json\s*/i, "").replace(/```$/, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanJson);

    // Mapear explicacion_didactica a explicacion_socratica para asegurar compatibilidad 100% con el frontend
    if (data && Array.isArray(data.preguntas)) {
      data.preguntas = data.preguntas.map(q => ({
        ...q,
        explicacion_socratica: q.explicacion_didactica || q.explicacion_socratica,
        explicacion_didactica: q.explicacion_didactica || q.explicacion_socratica
      }));
    }
    return data;
  } catch (geminiError) {
    console.warn("DynamicQuiz FinOps: Fallaron las llaves de Gemini. Activando fallback a Claude Haiku 4.5:", geminiError.message);
    try {
      fal.config({ credentials: falKey.value() });
      console.log("DynamicQuiz FinOps: Invocando Claude Haiku 4.5 via Fal.ai...");

      const finalPromptUser = promptUser + "\n\nResponde estrictamente en formato JSON válido, sin bloques de código ```json ni texto adicional fuera del JSON.";
      const response = await fal.subscribe("openrouter/router/enterprise", {
        input: {
          model: "anthropic/claude-haiku-4.5",
          prompt: finalPromptUser,
          system_prompt: systemInstruction,
          temperature: 0.3,
          top_p: 0.9
        }
      });

      const outputText = response.data.output || response.data.text || "";
      const cleanJson = outputText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      return JSON.parse(cleanJson);
    } catch (fallbackError) {
      console.error("DynamicQuiz FinOps: Error crítico en fallback de Claude Haiku 4.5:", fallbackError);
      throw new HttpsError("internal", "Error generando el quiz dinámico en ambos proveedores: " + fallbackError.message);
    }
  }
});

// =========================================================================
// SÍNTESIS DE VOZ Y PRONUNCIACIÓN HUMANA EN ALEMÁN (Gemini 3.8 Flash TTS)
// Arquitectura de Caché Global Nivel 2 y 3 (Firestore + Cloud Storage + Fal.ai)
// =========================================================================

// Sanitización canónica determinista de texto alemán a ID seguro para Firestore y Storage
function getSafeAudioId(text) {
  if (!text || typeof text !== "string") return "audio_unknown";
  
  const normalized = text
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, " ") // Convertir puntuación a espacios
    .replace(/\s+/g, "_")                            // Espacios a guión bajo
    .replace(/[^a-z0-9_]/g, "")                     // Quitar cualquier caracter residual
    .replace(/^_+|_+$/g, "")                        // Recortar guiones bajos iniciales y finales
    .substring(0, 120);

  return "audio_" + (normalized || "audio");
}

const TTS_MODELS = ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"];

/**
 * Ejecuta una petición unitaria de síntesis TTS contra un modelo concreto de Google AI Studio.
 */
async function requestGoogleDirectTts(text, voice, apiKey, modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: voice || "Charon" // Voz masculina oficial exclusiva de DeutschMeister
          }
        }
      }
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google Direct API HTTP ${response.status} (${modelName}): ${errorBody}`);
  }

  const json = await response.json();
  const inlineData = json.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inlineData || !inlineData.data) {
    throw new Error(`La API directa de Google (${modelName}) no devolvió datos de audio válidos.`);
  }

  return {
    buffer: Buffer.from(inlineData.data, "base64"),
    mimeType: inlineData.mimeType || "audio/wav",
    provider: `google-direct-${modelName}`
  };
}

/**
 * 1. Invocación Directa a la API de Google AI Studio con fallback automático a gemini-3.8-flash-lite-tts
 */
async function synthesizeWithGoogleDirect(text, voice, apiKey, modelName = "gemini-3.8-flash-tts") {
  const candidateModels = modelName === "gemini-3.8-flash-lite-tts"
    ? ["gemini-3.8-flash-lite-tts"]
    : [modelName, "gemini-3.8-flash-lite-tts"];

  let lastError = null;
  for (let i = 0; i < candidateModels.length; i++) {
    const currentModel = candidateModels[i];
    try {
      return await requestGoogleDirectTts(text, voice, apiKey, currentModel);
    } catch (err) {
      lastError = err;
      const msg = (err.message || "").toLowerCase();
      const isInvalidKey =
        msg.includes("http 401") ||
        msg.includes("http 403") ||
        msg.includes("api_key_invalid") ||
        msg.includes("api key not valid");

      if (isInvalidKey || i === candidateModels.length - 1) {
        throw err;
      }
      console.warn(`[TTS Direct Fallback] Falló ${currentModel} (${err.message}). Reintentando con ${candidateModels[i + 1]} en la misma llave...`);
    }
  }
  throw lastError;
}

/**
 * 2. Invocación de Respaldo a Fal.ai
 */
async function synthesizeWithFalFallback(text, voice, falKeyValue, styleInstructions) {
  fal.config({ credentials: falKeyValue });

  const result = await fal.subscribe("google/gemini-3.8-flash-tts", {
    input: {
      prompt: text,
      voice: "Charon", // Voz masculina oficial exclusiva de DeutschMeister
      style_instructions: styleInstructions || "Speak in clear, natural, standard German (Hochdeutsch) with precise A1 pedagogical pronunciation and natural pacing."
    }
  });

  if (!result.data || !result.data.audio || !result.data.audio.url) {
    throw new Error("Fal.ai no devolvió URL de audio.");
  }

  const audioRes = await fetch(result.data.audio.url);
  if (!audioRes.ok) throw new Error(`Fallo descargando audio de Fal.ai: HTTP ${audioRes.status}`);

  return {
    buffer: Buffer.from(await audioRes.arrayBuffer()),
    mimeType: result.data.audio.content_type || "audio/wav",
    provider: "fal-fallback"
  };
}

// Identificador SHA-256 determinista sin colisiones para textos largos (cuentos, lecturas, oraciones)
function getSha256AudioId(cleanText, voice = "Charon") {
  const hash24 = crypto
    .createHash("sha256")
    .update(`${cleanText}_${voice}`, "utf8")
    .digest("hex")
    .substring(0, 24);
  return `audio_sha256_${hash24}`;
}

export const synthesizeGermanSpeech = onCall(
  {
    secrets: ALL_AI_SECRETS,
    timeoutSeconds: 60,
    memory: "512MiB",
    cors: true
  },
  async (request) => {
    await assertApprovedUser(request);
    const { text, type = "vocab", lang = "de" } = request.data || {};
    const voice = "Charon"; // Voz masculina oficial exclusiva de DeutschMeister
    if (!text || typeof text !== "string") {
      throw new HttpsError("invalid-argument", "El parámetro 'text' es obligatorio y debe ser una cadena.");
    }

    const cleanText = text.replace(/[*_#`~]/g, "").replace(/\s+/g, " ").trim();
    if (!cleanText) {
      throw new HttpsError("invalid-argument", "El texto proporcionado está vacío.");
    }

    const safeType = (type || "general").replace(/[^a-zA-Z0-9_-]/g, "") || "general";
    const sha256Id = getSha256AudioId(cleanText, voice);
    const canonicalId = getSafeAudioId(cleanText);
    const legacyId = `${canonicalId}_`;
    const docId = sha256Id;
    const db = admin.firestore();

    const styleInstructions = lang === "es"
      ? "Speak in clear, warm, natural Spanish as an expert German language coach (Charon). When pronouncing German words or phrases in quotes, use authentic standard German (Hochdeutsch) phonetics."
      : "Speak in clear, natural, standard German (Hochdeutsch) with precise pedagogical pronunciation and natural pacing.";

    // ── NIVEL 2: REVISIÓN UNIVERSAL DE CACHÉ EN LA NUBE (SHA-256 + Canonical + Legacy vía db.getAll) ──
    const sha256Ref = db.collection("global_audio_pronunciations").doc(sha256Id);
    const canonicalRef = db.collection("global_audio_pronunciations").doc(canonicalId);
    const legacyRef = db.collection("global_audio_pronunciations").doc(legacyId);

    const snaps = await db.getAll(sha256Ref, canonicalRef, legacyRef);
    const hitSnap = snaps.find((snap) => {
      if (!snap.exists) return false;
      const d = snap.data();
      return (
        d &&
        typeof d.audioUrl === "string" &&
        d.audioUrl.length > 0 &&
        !d.audioUrl.includes("gcf-v2-sources") &&
        !d.audioUrl.includes("gcf-v2-uploads")
      );
    });

    if (hitSnap) {
      const data = hitSnap.data();
      console.log(`[TTS Cache Hit] Audio válido encontrado en Firestore [${hitSnap.id}]`);
      return {
        success: true,
        audioUrl: data.audioUrl,
        audioId: data.audioId || hitSnap.id,
        sha256Id,
        canonicalId,
        fromCloudCache: true,
        provider: "cloud-cache"
      };
    }

    // ── INFERENCIA: POOL GOOGLE DIRECTO CON DUAL-MODEL Y ROTACIÓN (0% FAL.AI A MENOS DE AGOTAR POOL) ──
    let audioResult = null;
    const googleKeys = getGoogleKeyPool();
    let lastGoogleError = null;

    for (const keyItem of googleKeys) {
      try {
        audioResult = await synthesizeWithGoogleDirect(cleanText, voice, keyItem.key, TTS_MODELS[0]);
        console.log(`[TTS Engine] Generado exitosamente vía Google AI Studio Direct (${keyItem.id} / ${audioResult.provider}) (${cleanText.substring(0, 30)}...)`);
        break;
      } catch (err) {
        lastGoogleError = err;
        console.warn(`[TTS Warning] Falló Google Direct con ${keyItem.id}: ${err.message}`);
      }
    }

    if (!audioResult) {
      const falKeyValue = (falKey && typeof falKey.value === "function" ? falKey.value() : "") || process.env.FAL_KEY || "";
      if (falKeyValue) {
        try {
          audioResult = await synthesizeWithFalFallback(cleanText, voice, falKeyValue, styleInstructions);
          console.log(`[TTS Engine] Generado exitosamente vía Fal.ai (${cleanText.substring(0, 30)}...)`);
        } catch (falError) {
          console.error("[TTS Critical Error] Fallaron todos los proveedores de síntesis:", falError.message);
          throw new HttpsError("internal", "No se pudo sintetizar el audio: " + (lastGoogleError?.message || falError.message));
        }
      } else {
        throw new HttpsError("internal", "No se pudo sintetizar el audio con Google Direct: " + (lastGoogleError?.message || "Error desconocido"));
      }
    }

    // ── PERSISTENCIA GLOBAL PERMANENTE (100% de audios: vocabulario, oraciones, lecturas y cuentos) ──
    const STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET || "deutschmeister-audio-vault";
    const bucket = admin.storage().bucket(STORAGE_BUCKET_NAME);
    const ext = audioResult.mimeType.includes("mp3") ? "mp3" : "wav";
    const filePath = `pronunciations/${safeType}/${docId}.${ext}`;
    const file = bucket.file(filePath);

    let permanentAudioUrl = "";
    try {
      await file.save(audioResult.buffer, {
        metadata: {
          contentType: audioResult.mimeType,
          cacheControl: "public, max-age=31536000",
          metadata: {
            sha256Id,
            canonicalId,
            text: cleanText.substring(0, 500),
            voice: voice,
            type: safeType,
            provider: audioResult.provider,
            createdAt: new Date().toISOString()
          }
        }
      });

      try { await file.makePublic(); } catch (_) {}

      permanentAudioUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

      await db.collection("global_audio_pronunciations").doc(docId).set({
        audioId: docId,
        sha256Id: sha256Id,
        canonicalId: canonicalId,
        text: cleanText,
        audioUrl: permanentAudioUrl,
        storagePath: filePath,
        voice: voice,
        type: safeType,
        lang: lang,
        provider: audioResult.provider,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (storageErr) {
      console.error(`[TTS Storage Error] Falló la subida o verificación CRC32c para [${docId}]:`, storageErr.message);
      throw new HttpsError("internal", `Error de almacenamiento o verificación de integridad del audio: ${storageErr.message}`);
    }

    return {
      success: true,
      audioUrl: permanentAudioUrl,
      audioId: docId,
      sha256Id,
      canonicalId,
      fromCloudCache: false,
      provider: audioResult.provider,
      persisted: true
    };
  }
);

/**
 * Detecta si una palabra es cualquier variante de verbo en la taxonomía de DeutschMeister
 */
function isVerbItem(wordObj) {
  if (!wordObj) return false;
  const type = (wordObj.type || "").toLowerCase();
  const category = (wordObj.category || "").toLowerCase();
  const regimen = (wordObj.regimen || "").toLowerCase();
  const de = (wordObj.de || "").toLowerCase();

  return (
    type.includes("verb") ||
    type.includes("acción") ||
    type.includes("accion") ||
    category.includes("verb") ||
    category === "bewegung" ||
    category === "aktivitäten" ||
    category === "aktionen" ||
    regimen.includes("separable") ||
    regimen.includes("reflexiv") ||
    de.startsWith("sich ") ||
    de.includes("|") // Notación de separables como ein|laden
  );
}

/**
 * Diccionario cinético optimizado para verbos de alta frecuencia A1
 */
const KINETIC_ACTIONS = {
  // Locomoción y Movimiento
  gehen: "walking in place with steady rhythmic steps (treadmill style), swinging arms smoothly, remaining perfectly centered",
  laufen: "running happily in place with fluid energetic steps (treadmill cycle), remaining centered",
  springen: "jumping up and down vertically with bouncy clay elasticity, landing softly in the exact same spot",
  tanzen: "doing a fun, joyful dance groove moving rhythmically side-to-side in place",
  schwimmen: "doing smooth breaststroke swimming motions in place, gliding rhythmically",
  fahren: "riding a tiny cute clay bicycle moving wheels in place, centered",
  
  // Postura y Estados
  schlafen: "sleeping comfortably curled up on a small clay pillow, gentle rhythmic breathing motion",
  aufstehen: "smoothly standing up from a sitting posture, stretching arms upward, then resetting",
  sitzen: "sitting upright comfortably, looking around with a gentle head tilt and blinking",
  warten: "standing still and tapping one foot patiently, checking an imaginary clay wrist watch",
  
  // Manipulación y Acciones Cotidianas
  trinken: "holding a small colorful clay mug with both hands and taking cheerful sips in a repeating loop",
  essen: "eating a tiny stylized clay snack happily, chewing rhythmically in place",
  kochen: "stirring a small bubbling clay pot with a wooden clay spoon in a steady circular motion",
  putzen: "wiping a clean imaginary glass surface back and forth with a small yellow sponge",
  öffnen: "gently pushing open a small cute clay door and peeking through with a smile",
  schließen: "smoothly pulling shut a small cute clay door until it clicks closed",
  lesen: "holding an open clay book, eyes moving gently across pages with a slight head nod",
  schreiben: "holding a thick clay pencil and scribbling smoothly on a small clay notepad",
  
  // Emociones y Social
  sich_freuen: "jumping with pure joy, raising both arms celebrating happily with cheerful bounce",
  lachen: "laughing joyfully, body shaking with hearty friendly laughter in place",
  einladen: "making a warm, welcoming two-handed invitation gesture forward with a wide friendly smile"
};

/**
 * Normaliza y construye la acción cinética óptima en inglés
 */
function resolveKineticAction(wordObj) {
  const deKey = (wordObj.de || "").toLowerCase().replace(/[^a-z0-9]/gi, "_").replace(/^sich_/, "sich_");

  if (KINETIC_ACTIONS[deKey]) {
    return KINETIC_ACTIONS[deKey];
  }

  // Saneamiento dinámico si no está en el diccionario precalibrado
  let raw = (wordObj.en || wordObj.concepto_ingles || wordObj.es || "").toLowerCase();
  
  // Quitar anotaciones gramaticales, regímenes y conectores
  raw = raw.replace(/[≠+].*$/g, "").trim();
  // Tomar solo el primer término si hay barras o comas (ej. "to go / walk" -> "to go")
  raw = raw.split(/[\/,]/)[0].trim();
  // Eliminar el "to " inicial
  raw = raw.replace(/^to\s+/, "").trim();

  // Convertir a gerundio simple
  const verbIng = raw.endsWith("e") && !raw.endsWith("ee") 
    ? raw.slice(0, -1) + "ing" 
    : raw.endsWith("ing") ? raw : raw + "ing";

  return `performing the physical action of ${verbIng} in place, staying centered with steady rhythmic motion`;
}

/**
 * Generador de Prompt Visual Calibrado para Gemini Omni Flash & Nano Banana 2
 */
function buildVisualPrompt(wordObj, isVideo = false) {
  const cleanGerman = (wordObj.de || "").replace(/[|]/g, "").trim();

  if (isVideo) {
    const kineticAction = resolveKineticAction(wordObj);

    return [
      `A cute stylized 3D clay figurine with friendly proportions, sculpted from smooth soft matte clay.`,
      `The character is centered and strictly ${kineticAction}.`,
      `Realistic claymation stop-motion physics, cohesive solid clay volume, zero melting, zero morphing, zero body distortion.`,
      `Front isometric three-quarters angle, full-body framing completely centered.`,
      `Subtle soft ambient contact shadow directly beneath feet on a pure seamless solid white background hex #FFFFFF.`,
      `Completely static camera, locked tripod framing, no panning, no zoom.`,
      `Strictly purely visual: absolutely no text, no letters, no words.`,
      `Seamless continuous rhythmic loop that starts and ends in the exact same posture.`
    ].join(" ");
  }

  // Prompt estático para gemini-3.1-flash-lite-image (Nano Banana 2 Lite)
  const cleanConcept = (wordObj.en || wordObj.concepto_ingles || wordObj.es || "")
    .replace(/[≠+].*$/g, "")
    .trim();

  return [
    `A 3D isometric minimalist UI illustration depicting the concept of "${cleanConcept}" (${cleanGerman}).`,
    `Made of smooth matte soft clay, clean geometry, pastel smooth shading, bright studio lighting.`,
    `Subtle soft drop shadow resting on a pure seamless solid white background hex #FFFFFF.`,
    `Strictly purely visual: absolutely NO TEXT, NO LETTERS, NO WORDS.`
  ].join(" ");
}

/**
 * Optimiza y comprime buffers de imagen a 512x512 JPEG (~30-50 KB)
 */
async function optimizeImageBuffer(buffer) {
  return await sharp(buffer)
    .resize(512, 512, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}

/**
 * 1. Generación de Imagen con Nano Banana 2 Lite (gemini-3.1-flash-lite-image)
 */
async function generateGoogleFlashImage(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-image:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Flash Image API HTTP ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData && p.inlineData.data);

  if (!imagePart) {
    throw new Error("gemini-3.1-flash-lite-image no devolvió bytes de imagen inlineData.");
  }

  return {
    buffer: Buffer.from(imagePart.inlineData.data, "base64"),
    mimeType: imagePart.inlineData.mimeType || "image/jpeg"
  };
}

/**
 * Helper para localizar recursivamente datos o URI de video en la respuesta de Google
 */
function findVideoInObject(obj, visited = new Set()) {
  if (!obj || typeof obj !== "object" || visited.has(obj)) return null;
  visited.add(obj);

  // Variante: string base64 directo de video
  if (typeof obj.data === "string" && obj.data.length > 500) {
    return { base64: obj.data, mimeType: obj.mime_type || obj.mimeType || "video/mp4" };
  }
  if (obj.inlineData && typeof obj.inlineData.data === "string" && obj.inlineData.data.length > 500) {
    return { base64: obj.inlineData.data, mimeType: obj.inlineData.mimeType || obj.inlineData.mime_type || "video/mp4" };
  }
  if (obj.inline_data && typeof obj.inline_data.data === "string" && obj.inline_data.data.length > 500) {
    return { base64: obj.inline_data.data, mimeType: obj.inline_data.mime_type || obj.inline_data.mimeType || "video/mp4" };
  }

  // Variante: URI de archivo de video
  if (typeof obj.uri === "string" && obj.uri.length > 5) {
    return { uri: obj.uri, mimeType: obj.mime_type || obj.mimeType || "video/mp4" };
  }
  if (obj.fileData && typeof obj.fileData.fileUri === "string") {
    return { uri: obj.fileData.fileUri, mimeType: "video/mp4" };
  }
  if (obj.file_data && typeof obj.file_data.file_uri === "string") {
    return { uri: obj.file_data.file_uri, mimeType: "video/mp4" };
  }

  // Búsqueda en arrays o campos anidados (ignorando tokens de consumo)
  for (const key of Object.keys(obj)) {
    if (key === "usage" || key === "raw_prompt_tokens" || key === "safety_settings") continue;
    const found = findVideoInObject(obj[key], visited);
    if (found) return found;
  }
  return null;
}

/**
 * 2. Generación de Video con Gemini Omni Flash (gemini-omni-1.1-flash)
 */
async function generateGoogleOmniVideo(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${apiKey}`;

  const payload = {
    model: "gemini-omni-1.1-flash",
    input: prompt,
    response_format: {
      type: "video",
      resolution: "360p",
      aspect_ratio: "1:1", // Encuadre 1:1 cuadrado nativo para la tarjeta
      delivery: "inline"
    }
  };

  let response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok && response.status === 400) {
    const errText = await response.text();
    // Si el error es por aspect_ratio no soportado en video (ej. solo 16:9 / 9:16), reintentar sin aspect_ratio
    if (errText.includes("aspect_ratio") || errText.includes("aspectRatio")) {
      console.warn(`[Omni Video] aspect_ratio 1:1 rechazado por API (${errText}), reintentando sin aspect_ratio...`);
      delete payload.response_format.aspect_ratio;
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      throw new Error(`Google Omni Video HTTP ${response.status}: ${errText}`);
    }
  }

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Omni Video HTTP ${response.status}: ${errText}`);
  }

  const data = await response.json();
  console.log("[Omni Video Raw Keys]:", Object.keys(data));

  // Extracción exhaustiva de video en steps, outputs, candidates y objetos anidados
  const extracted = findVideoInObject(data);

  if (extracted?.base64) {
    console.log(`[Omni Video] Video extraído exitosamente en Base64 (longitud: ${extracted.base64.length})`);
    return {
      buffer: Buffer.from(extracted.base64, "base64"),
      mimeType: extracted.mimeType || "video/mp4"
    };
  }

  if (extracted?.uri) {
    console.log(`[Omni Video] Descargando desde URI de Google: ${extracted.uri}`);
    let downloadUrl = extracted.uri;
    if (!downloadUrl.includes("key=")) {
      const sep = downloadUrl.includes("?") ? "&" : "?";
      downloadUrl = `${downloadUrl}${sep}key=${apiKey}`;
    }

    let downloadRes = await fetch(downloadUrl, {
      headers: { "x-goog-api-key": apiKey }
    });
    if (!downloadRes.ok) {
      downloadRes = await fetch(`${downloadUrl}&alt=media`, {
        headers: { "x-goog-api-key": apiKey }
      });
    }

    if (!downloadRes.ok) {
      throw new Error(`Fallo al descargar video desde URI: HTTP ${downloadRes.status}`);
    }

    return {
      buffer: Buffer.from(await downloadRes.arrayBuffer()),
      mimeType: extracted.mimeType || "video/mp4"
    };
  }

  // Si no se encontró ningún byte o URI
  console.error("[Omni Video Parse Error] Resumen de steps:", JSON.stringify(
    data.steps?.map(s => ({
      type: s.type,
      contentTypes: Array.isArray(s.content) ? s.content.map(c => ({ type: c.type, hasData: !!c.data, hasUri: !!c.uri })) : typeof s.content
    })) || "No steps"
  ));
  throw new Error("No se encontraron bytes de video válidos en la respuesta de gemini-omni-1.1-flash.");
}

/**
 * Genera y optimiza una imagen iterando sobre el pool rotado de llaves PAID.
 */
async function generateImageWithPaidPool(imagePrompt, paidKeys, contextLabel = "Image") {
  let lastError = null;
  for (const keyItem of paidKeys) {
    try {
      console.log(`[Media Engine ${contextLabel}] Probando con llave ${keyItem.id}...`);
      const rawImage = await generateGoogleFlashImage(imagePrompt, keyItem.key);
      return await optimizeImageBuffer(rawImage.buffer);
    } catch (imgErr) {
      lastError = imgErr;
      console.warn(`[Media Engine ${contextLabel} Warning] Error con llave ${keyItem.id}:`, imgErr.message);
    }
  }
  throw lastError || new Error("No se pudo generar la imagen con ninguna llave PAID.");
}

/**
 * Cloud Function: regenerateCardMedia
 */
export const regenerateCardMedia = onCall(
  {
    secrets: ALL_AI_SECRETS,
    timeoutSeconds: 90,
    memory: "512MiB",
    cors: true
  },
  async (request) => {
    const authUser = await assertApprovedUser(request);

    try {
      const { 
        wordObj, 
        mediaType = "auto", 
        forceRegenerate = false
      } = request.data || {};

      // Candado Estricto de Seguridad en Servidor: emulador, origen Vite dev o admin
      if (!isServerAuthorizedMediaWriter(request, authUser)) {
        return {
          success: false,
          error: "La generación de medios con IA está estrictamente inhabilitada fuera del entorno de desarrollo local autorizado."
        };
      }

      if (!wordObj || !wordObj.de) {
        return { success: false, error: "wordObj.de es requerido." };
      }

      const db = admin.firestore();
      const safeId = wordObj.de.toLowerCase().replace(/[^a-z0-9]/gi, "_").substring(0, 100);
      const isVerb = isVerbItem(wordObj);

      // 1. Salvaguarda Kinestésica: Restricción estricta de video a verbos de locomoción y mecánica física
      const ALLOWED_MOTION = new Set([
        "gehen", "laufen", "rennen", "springen", "steigen", "fallen",
        "fliegen", "schwimmen", "wandern", "fahren", "abbiegen",
        "aufstehen", "umsteigen", "einsteigen", "aussteigen", "mitkommen",
        "ziehen", "drücken", "schieben", "werfen", "fangen",
        "bremsen", "beschleunigen", "gas geben", "blinken", "abschleppen",
        "einpacken", "auspacken", "abtrocknen", "abgeben"
      ]);

      const rawTerm = wordObj.de || request.data?.word || "";
      const cleanTerm = rawTerm.replace(/\|/g, "").replace(/^sich\s+/i, "").trim().toLowerCase();
      const isMotionVerb = isVerb && (ALLOWED_MOTION.has(cleanTerm) || ((wordObj.category || "").toLowerCase() === "bewegung"));

      if (mediaType === "video" && !isMotionVerb) {
        return {
          success: false,
          error: "El término no es un verbo de movimiento o cinemática crítica apto para video."
        };
      }

      const wantVideo = (mediaType === "video" || (mediaType === "auto" && isVerb)) && isMotionVerb;

      // 2. Verificación previa en Firestore (Cache-First)
      const cardDocRef = db.collection("global_flashcards").doc(safeId);
      let docSnap = await cardDocRef.get();
      if (!docSnap.exists) {
        const slugId = wordObj.de.toLowerCase().replace(/[\s\/?!\\,.]+/g, "_");
        if (slugId && slugId !== safeId) {
          docSnap = await db.collection("global_flashcards").doc(slugId).get();
        }
      }

      if (docSnap.exists) {
        const existingData = docSnap.data() || {};

        // Reutilizar video existente si está disponible
        if (wantVideo && existingData.videoUrl && !forceRegenerate) {
          console.log(`[Cache Hit] Video existente reutilizado para: ${wordObj.de}`);
          return {
            success: true,
            mediaUrl: existingData.videoUrl,
            mediaType: "video",
            fromCache: true,
            wordDe: wordObj.de
          };
        }

        // Reutilizar imagen existente si está disponible
        if (!wantVideo && existingData.imageUrl && !forceRegenerate) {
          console.log(`[Cache Hit] Imagen existente reutilizada para: ${wordObj.de}`);
          return {
            success: true,
            mediaUrl: existingData.imageUrl,
            mediaType: "image",
            fromCache: true,
            wordDe: wordObj.de
          };
        }
      }

      // ── PASO 3: INFERENCIA DE IA CON ROTACIÓN MULTI-KEY (PAID_1 A PAID_4) ──
      const paidKeys = getRotatedPaidKeys();
      if (paidKeys.length === 0) {
        return { success: false, error: "No se encontraron claves de facturación (PAID) en el pool." };
      }

      let fileBuffer = null;
      let mimeType = "image/jpeg";
      let fileExtension = "jpeg";
      let actualMediaType = "image";
      let provider = "gemini-3.1-flash-lite-image";
      let lastMediaError = null;

      // Intento de video para verbos
      if (wantVideo) {
        let videoSuccess = false;
        console.log(`[Media Engine] Generando video para verbo: ${wordObj.de} utilizando pool rotado de ${paidKeys.length} llaves PAID...`);
        const videoPrompt = buildVisualPrompt(wordObj, true);

        for (const keyItem of paidKeys) {
          try {
            console.log(`[Media Engine Video] Probando con llave ${keyItem.id}...`);
            const videoResult = await generateGoogleOmniVideo(videoPrompt, keyItem.key);
            fileBuffer = videoResult.buffer;
            mimeType = "video/mp4";
            fileExtension = "mp4";
            actualMediaType = "video";
            provider = "gemini-omni-1.1-flash";
            videoSuccess = true;
            break;
          } catch (videoErr) {
            lastMediaError = videoErr;
            console.warn(`[Media Engine Video Warning] Error con llave ${keyItem.id}:`, videoErr.message);
          }
        }

        // Si falló el video en todas las llaves PAID, recurrir a imagen
        if (!videoSuccess) {
          console.warn("[Media Engine] Error al generar video con Omni en todo el pool PAID, recurriendo a imagen...");
          try {
            fileBuffer = await generateImageWithPaidPool(buildVisualPrompt(wordObj, false), paidKeys, "Image Fallback");
            mimeType = "image/jpeg";
            fileExtension = "jpeg";
            actualMediaType = "image";
            provider = "gemini-3.1-flash-lite-image";
          } catch (imgErr) {
            throw new Error(`Falló la generación de video (${lastMediaError?.message}) e imagen (${imgErr.message}) tras recorrer el pool PAID.`);
          }
        }
      } else {
        console.log(`[Media Engine] Generando imagen para: ${wordObj.de} utilizando pool rotado de ${paidKeys.length} llaves PAID...`);
        try {
          fileBuffer = await generateImageWithPaidPool(buildVisualPrompt(wordObj, false), paidKeys, "Image");
          mimeType = "image/jpeg";
          fileExtension = "jpeg";
          actualMediaType = "image";
          provider = "gemini-3.1-flash-lite-image";
        } catch (imgErr) {
          throw new Error(`Falló la generación de imagen tras recorrer el pool PAID: ${imgErr.message}`);
        }
      }

      // Persistencia en Cloud Storage
      const STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET || "deutschmeister-audio-vault";
      const bucket = admin.storage().bucket(STORAGE_BUCKET_NAME);
      const folder = actualMediaType === "video" ? "videos" : "images";
      const filePath = `flashcards/${folder}/${safeId}_${Date.now()}.${fileExtension}`;
      const file = bucket.file(filePath);

      await file.save(fileBuffer, {
        metadata: {
          contentType: mimeType,
          cacheControl: "public, max-age=31536000",
          metadata: {
            wordDe: wordObj.de,
            provider,
            optimized: actualMediaType === "image" ? "sharp-512x512-q80" : "raw-mp4",
            createdAt: new Date().toISOString()
          }
        }
      });

      try { await file.makePublic(); } catch (_) {}

      const permanentMediaUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

      // Actualizar metadatos en Firestore
      const updatePayload = {
        mediaType: actualMediaType,
        provider,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      if (actualMediaType === "video") {
        updatePayload.videoUrl = permanentMediaUrl;
      } else {
        updatePayload.imageUrl = permanentMediaUrl;
      }

      const slugId = wordObj.de.toLowerCase().replace(/[\s\/?!\\,.]+/g, "_");
      await db.collection("global_flashcards").doc(safeId).set(updatePayload, { merge: true });
      if (slugId && slugId !== safeId) {
        await db.collection("global_flashcards").doc(slugId).set(updatePayload, { merge: true });
      }

      return {
        success: true,
        mediaUrl: permanentMediaUrl,
        mediaType: actualMediaType,
        provider,
        fromCache: false,
        wordDe: wordObj.de
      };
    } catch (err) {
      console.error("[RegenerateCardMedia Fatal Error]", err);
      return { success: false, error: err.message };
    }
  }
);

// =========================================================================
// 10. VERIFICACIÓN DE ACCESO Y AUTO-REGISTRO ZERO-TRUST (verifyOrRequestAccess)
// =========================================================================
export const verifyOrRequestAccess = onCall(
  {
    cors: true,
    maxInstances: 10
  },
  async (request) => {
    const authUser = await verifyRequestAuth(request);
    const uid = authUser.uid;
    const signInProvider = authUser.token?.firebase?.sign_in_provider;

    if (!signInProvider || signInProvider === "anonymous") {
      throw new HttpsError(
        "permission-denied",
        "El acceso anónimo está deshabilitado. Inicia sesión con Google o con tu correo electrónico."
      );
    }

    const userRecord = await admin.auth().getUser(uid);
    const emailLower = normalizeEmailAddress(userRecord.email || authUser.token?.email);

    if (!emailLower || !emailLower.includes("@") || emailLower.includes("/")) {
      throw new HttpsError(
        "permission-denied",
        "Tu cuenta debe tener un correo electrónico válido."
      );
    }

    // Acepta cualquier proveedor autenticado distinto de anonymous (ej. "google.com" y "password")
    const isSuperAdmin = getSuperAdminEmailSet().has(emailLower);

    const accessRef = db.collection("access_control").doc(uid);
    const preAuthRef = db.collection("authorized_emails").doc(emailLower);
    const [accessSnap, preAuthSnap] = await Promise.all([accessRef.get(), preAuthRef.get()]);

    const existingData = accessSnap.exists ? accessSnap.data() || {} : null;
    const preAuthData = preAuthSnap.exists ? preAuthSnap.data() || {} : null;

    let status = "pending";
    let role = "user";
    let approvedBy = "";

    if (isSuperAdmin) {
      status = "approved";
      role = "admin";
      approvedBy = existingData?.approvedBy || "system_super_admin";
    } else if (existingData) {
      if (existingData.status === "pending" && preAuthData?.status === "approved") {
        status = "approved";
        role = preAuthData.role === "admin" ? "admin" : (existingData.role === "admin" ? "admin" : "user");
        approvedBy = preAuthData.addedBy || "authorized_emails";
      } else {
        status = ["approved", "pending", "revoked"].includes(existingData.status)
          ? existingData.status
          : "pending";
        role = existingData.role === "admin" ? "admin" : "user";
        approvedBy = existingData.approvedBy || "";
      }
    } else if (preAuthData?.status === "approved") {
      status = "approved";
      role = preAuthData.role === "admin" ? "admin" : "user";
      approvedBy = preAuthData.addedBy || "authorized_emails";
    }

    const nowTs = admin.firestore.FieldValue.serverTimestamp();
    const displayName = userRecord.displayName || authUser.token?.name || existingData?.displayName || "";
    const photoURL = userRecord.photoURL || authUser.token?.picture || existingData?.photoURL || "";

    await accessRef.set(
      {
        uid,
        email: emailLower,
        displayName,
        photoURL,
        status,
        role,
        approvedBy,
        requestedAt: existingData?.requestedAt || nowTs,
        updatedAt: nowTs
      },
      { merge: true }
    );

    const shouldApprove = status === "approved";
    const shouldAdmin = shouldApprove && role === "admin";
    const claimsChanged = await syncUserCustomClaimsIfNeeded(
      uid,
      userRecord.customClaims,
      shouldApprove,
      shouldAdmin
    );

    if (status === "revoked" && claimsChanged) {
      await admin.auth().revokeRefreshTokens(uid).catch(() => {});
    }

    const tokenOutOfSync =
      Boolean(authUser.token?.approved) !== shouldApprove ||
      Boolean(authUser.token?.admin) !== shouldAdmin;

    return {
      uid,
      email: emailLower,
      displayName,
      photoURL,
      status,
      role,
      needsTokenRefresh: Boolean(claimsChanged || tokenOutOfSync)
    };
  }
);

// =========================================================================
// 11. PANEL DE ADMINISTRACIÓN DE ACCESOS (manageUserAccess - SOLO ADMIN)
// =========================================================================
export const manageUserAccess = onCall(
  {
    cors: true,
    maxInstances: 10
  },
  async (request) => {
    const adminCaller = await assertAdminUser(request);
    const { action, targetUid, email, role } = request.data || {};
    const validAction = typeof action === "string" ? action.trim().toLowerCase() : "";
    const superAdmins = getSuperAdminEmailSet();
    const nowTs = admin.firestore.FieldValue.serverTimestamp();
    const actorLabel = adminCaller.email || adminCaller.uid;

    if (validAction === "list") {
      const [accessSnapshot, preAuthSnapshot] = await Promise.all([
        db.collection("access_control").get(),
        db.collection("authorized_emails").get()
      ]);

      const pendingUsers = [];
      const approvedUsers = [];
      const revokedUsers = [];

      accessSnapshot.forEach((docSnap) => {
        const d = docSnap.data() || {};
        const emailVal = normalizeEmailAddress(d.email);
        const entry = {
          uid: docSnap.id,
          email: emailVal,
          displayName: d.displayName || "",
          photoURL: d.photoURL || "",
          status: d.status || "pending",
          role: d.role === "admin" ? "admin" : "user",
          approvedBy: d.approvedBy || "",
          isSuperAdmin: superAdmins.has(emailVal),
          requestedAt: serializeTimestampIso(d.requestedAt),
          updatedAt: serializeTimestampIso(d.updatedAt)
        };
        if (entry.status === "approved") approvedUsers.push(entry);
        else if (entry.status === "revoked") revokedUsers.push(entry);
        else pendingUsers.push(entry);
      });

      const byRecent = (a, b) =>
        String(b.updatedAt || b.requestedAt || "").localeCompare(String(a.updatedAt || a.requestedAt || ""));
      pendingUsers.sort(byRecent);
      approvedUsers.sort(byRecent);
      revokedUsers.sort(byRecent);

      const preauthorizedEmails = [];
      preAuthSnapshot.forEach((docSnap) => {
        const d = docSnap.data() || {};
        if (d.status === "approved") {
          preauthorizedEmails.push({
            id: docSnap.id,
            email: normalizeEmailAddress(d.email || docSnap.id),
            role: d.role === "admin" ? "admin" : "user",
            status: "approved",
            addedBy: d.addedBy || "",
            updatedAt: serializeTimestampIso(d.updatedAt || d.createdAt)
          });
        }
      });
      preauthorizedEmails.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));

      return {
        pendingUsers,
        approvedUsers,
        revokedUsers,
        preauthorizedEmails
      };
    }

    if (validAction === "approve") {
      const cleanUid = typeof targetUid === "string" ? targetUid.trim() : "";
      if (!cleanUid || cleanUid.includes("/")) {
        throw new HttpsError("invalid-argument", "targetUid inválido.");
      }

      const accessRef = db.collection("access_control").doc(cleanUid);
      const accessSnap = await accessRef.get();
      const accessData = accessSnap.exists ? accessSnap.data() || {} : {};
      const userRecord = await admin.auth().getUser(cleanUid).catch(() => null);
      const targetEmail = normalizeEmailAddress(accessData.email || userRecord?.email);
      const targetRole =
        superAdmins.has(targetEmail) || role === "admin" ? "admin" : "user";

      await accessRef.set(
        {
          uid: cleanUid,
          email: targetEmail,
          displayName: accessData.displayName || userRecord?.displayName || "",
          photoURL: accessData.photoURL || userRecord?.photoURL || "",
          status: "approved",
          role: targetRole,
          approvedBy: actorLabel,
          requestedAt: accessData.requestedAt || nowTs,
          updatedAt: nowTs
        },
        { merge: true }
      );

      if (targetEmail && !targetEmail.includes("/")) {
        await db.collection("authorized_emails").doc(targetEmail).set(
          {
            email: targetEmail,
            role: targetRole,
            status: "approved",
            addedBy: actorLabel,
            createdAt: nowTs,
            updatedAt: nowTs
          },
          { merge: true }
        );
      }

      if (userRecord) {
        await syncUserCustomClaimsIfNeeded(cleanUid, userRecord.customClaims, true, targetRole === "admin");
      } else {
        await syncUserCustomClaimsIfNeeded(cleanUid, {}, true, targetRole === "admin").catch(() => {});
      }

      return {
        success: true,
        uid: cleanUid,
        email: targetEmail,
        status: "approved",
        role: targetRole
      };
    }

    if (validAction === "revoke") {
      const cleanUid = typeof targetUid === "string" ? targetUid.trim() : "";
      if (!cleanUid || cleanUid.includes("/")) {
        throw new HttpsError("invalid-argument", "targetUid inválido.");
      }
      if (cleanUid === adminCaller.uid) {
        throw new HttpsError("failed-precondition", "No puedes revocar tu propio acceso de administrador.");
      }

      const accessRef = db.collection("access_control").doc(cleanUid);
      const accessSnap = await accessRef.get();
      const accessData = accessSnap.exists ? accessSnap.data() || {} : {};
      const userRecord = await admin.auth().getUser(cleanUid).catch(() => null);
      const targetEmail = normalizeEmailAddress(accessData.email || userRecord?.email);

      if (targetEmail && superAdmins.has(targetEmail)) {
        throw new HttpsError("failed-precondition", "No se puede revocar un Super-Admin protegido.");
      }

      await accessRef.set(
        {
          uid: cleanUid,
          email: targetEmail,
          status: "revoked",
          role: "user",
          revokedBy: actorLabel,
          updatedAt: nowTs
        },
        { merge: true }
      );

      if (targetEmail && !targetEmail.includes("/")) {
        await db.collection("authorized_emails").doc(targetEmail).delete().catch(() => {});
      }

      if (userRecord) {
        await syncUserCustomClaimsIfNeeded(cleanUid, userRecord.customClaims, false, false);
        await admin.auth().revokeRefreshTokens(cleanUid).catch(() => {});
      }

      return {
        success: true,
        uid: cleanUid,
        email: targetEmail,
        status: "revoked"
      };
    }

    if (validAction === "preauthorize") {
      const cleanEmail = normalizeEmailAddress(email);
      if (!cleanEmail || cleanEmail.includes("/") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        throw new HttpsError("invalid-argument", "Introduce un correo electrónico válido.");
      }

      const targetRole = superAdmins.has(cleanEmail) || role === "admin" ? "admin" : "user";
      await db.collection("authorized_emails").doc(cleanEmail).set(
        {
          email: cleanEmail,
          role: targetRole,
          status: "approved",
          addedBy: actorLabel,
          createdAt: nowTs,
          updatedAt: nowTs
        },
        { merge: true }
      );

      // Si el usuario ya había iniciado sesión antes (ej. estaba en "pending"), aprobarlo de inmediato
      const existingAuthUser = await admin.auth().getUserByEmail(cleanEmail).catch(() => null);
      if (existingAuthUser && existingAuthUser.uid) {
        const isExistingAnon = !(existingAuthUser.providerData && existingAuthUser.providerData.length > 0);
        if (!isExistingAnon) {
          const accRef = db.collection("access_control").doc(existingAuthUser.uid);
          const accSnap = await accRef.get();
          const prevAcc = accSnap.exists ? accSnap.data() || {} : {};
          await accRef.set(
            {
              uid: existingAuthUser.uid,
              email: cleanEmail,
              displayName: existingAuthUser.displayName || prevAcc.displayName || "",
              photoURL: existingAuthUser.photoURL || prevAcc.photoURL || "",
              status: "approved",
              role: targetRole,
              approvedBy: actorLabel,
              requestedAt: prevAcc.requestedAt || nowTs,
              updatedAt: nowTs
            },
            { merge: true }
          );
          await syncUserCustomClaimsIfNeeded(
            existingAuthUser.uid,
            existingAuthUser.customClaims,
            true,
            targetRole === "admin"
          );
        }
      }

      return {
        success: true,
        email: cleanEmail,
        role: targetRole,
        status: "approved",
        activatedUid: existingAuthUser?.uid || null
      };
    }

    if (validAction === "remove_preauth") {
      const cleanEmail = normalizeEmailAddress(email);
      if (!cleanEmail || cleanEmail.includes("/")) {
        throw new HttpsError("invalid-argument", "Correo inválido.");
      }
      await db.collection("authorized_emails").doc(cleanEmail).delete();
      return {
        success: true,
        email: cleanEmail,
        removed: true
      };
    }

    throw new HttpsError("invalid-argument", "Acción de gestión de acceso no soportada.");
  }
);
