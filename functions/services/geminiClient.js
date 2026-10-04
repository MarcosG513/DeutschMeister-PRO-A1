/**
 * geminiClient.js - Gestor de Resiliencia Multi-Key para Firebase Cloud Functions
 * DeutschMeister PRO A1 (Node 20 ESM)
 *
 * Pool de 3 llaves con conmutación bidireccional por error (Failover / Circuit Breaker):
 * 1. Clave de Facturación (Google Developer Program / créditos): gemini-3.8-flash
 * 2. Clave Gratuita 1 (Free Tier): gemini-3.5-flash-lite
 * 3. Clave Gratuita 2 (Free Tier): gemini-3.5-flash-lite
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Estado en memoria de llaves bloqueadas temporalmente (Circuit Breaker)
const exhaustedKeys = new Map(); // keyId -> timestamp de desbloqueo (ms)

/**
 * Determina el modelo óptimo según el tipo de clave:
 * - Clave de Facturación: aprovecha Gemini 3.8 Flash (o Gemini 3.5 Flash-Lite)
 * - Claves Gratuitas: usa modelos compatibles con el Free Tier (gemini-3.5-flash-lite / gemini-3.5-flash)
 */
export function resolveModelForTier(requestedModel, isPaidKey) {
  if (isPaidKey) {
    return requestedModel || "gemini-3.8-flash";
  }
  if (requestedModel === "gemini-3.8-flash") {
    return "gemini-3.5-flash-lite";
  }
  return requestedModel || "gemini-3.5-flash-lite";
}

/**
 * Comprueba si un error es originado por límite de cuota, tarifa o saldo
 */
export function isQuotaOrBillingError(error) {
  const status = error?.status || error?.response?.status || error?.statusCode;
  const msg = (error?.message || "").toLowerCase();

  return (
    status === 429 ||
    status === 402 ||
    status === 403 ||
    status === 401 ||
    status === 503 ||
    msg.includes("429") ||
    msg.includes("402") ||
    msg.includes("403") ||
    msg.includes("401") ||
    msg.includes("api_key_invalid") ||
    msg.includes("api key not valid") ||
    msg.includes("quota") ||
    msg.includes("limit") ||
    msg.includes("resource_exhausted") ||
    msg.includes("billing") ||
    msg.includes("payment") ||
    msg.includes("overloaded")
  );
}

/**
 * Obtiene el valor de una llave a partir de un secreto de Firebase o variable de entorno
 */
function resolveKeyValue(secretOrString) {
  if (!secretOrString) return "";
  if (typeof secretOrString === "function") {
    try {
      return secretOrString();
    } catch {
      return "";
    }
  }
  if (typeof secretOrString.value === "function") {
    try {
      return secretOrString.value();
    } catch {
      return "";
    }
  }
  return String(secretOrString);
}

/**
 * Construye el pool dinámico de 3 llaves
 */
export function buildKeyPool(keysConfig = {}) {
  const paidKey = resolveKeyValue(keysConfig.paidKey || process.env.GEMINI_PAID_KEY);
  const freeKey1 = resolveKeyValue(
    keysConfig.freeKey1 || 
    process.env.GEMINI_FREE_KEY_1 || 
    keysConfig.freeKey || 
    process.env.GEMINI_FREE_KEY
  );
  const freeKey2 = resolveKeyValue(keysConfig.freeKey2 || process.env.GEMINI_FREE_KEY_2);

  return [
    {
      id: "PAID_CREDITS",
      key: paidKey,
      isPaid: true,
      description: "Cuenta con Facturación / Google Developer Program (gemini-3.8-flash)"
    },
    {
      id: "FREE_1",
      key: freeKey1,
      isPaid: false,
      description: "Cuenta Gratuita A (gemini-3.5-flash-lite)"
    },
    {
      id: "FREE_2",
      key: freeKey2,
      isPaid: false,
      description: "Cuenta Gratuita B (gemini-3.5-flash-lite)"
    }
  ];
}

/**
 * Ejecutor resiliente con Circuit Breaker y Failover multi-key para Cloud Functions
 *
 * @param {string|object} prompt
 * @param {object} options
 * @param {object} [options.keys] { paidKey, freeKey1, freeKey2, freeKey }
 * @param {string} [options.preferredModel="gemini-3.8-flash"]
 * @param {string} [options.systemInstruction]
 * @param {boolean} [options.isJson=false]
 * @param {boolean} [options.isStreaming=false]
 * @param {"paid_first"|"free_first"} [options.mode="paid_first"]
 * @param {number} [options.cooldownMs=3600000] (1 hora por defecto)
 */
export async function executeBackendGemini(prompt, options = {}) {
  const {
    keys = {},
    preferredModel = "gemini-3.8-flash",
    systemInstruction,
    isJson = false,
    responseSchema = null,
    isStreaming = false,
    mode = "paid_first",
    cooldownMs = 60 * 60 * 1000
  } = options;

  const now = Date.now();

  // 1. Limpieza de Circuit Breaker
  for (const [keyId, resetTime] of exhaustedKeys.entries()) {
    if (now >= resetTime) {
      console.log(`⏱️ [Backend GeminiPool] Cooldown vencido para la llave ${keyId}. Restaurando...`);
      exhaustedKeys.delete(keyId);
    }
  }

  // 2. Construcción y ordenamiento del pool
  const pool = buildKeyPool(keys);
  let sortedPool = [...pool];

  if (mode === "free_first") {
    sortedPool.sort((a, b) => (a.isPaid === b.isPaid ? 0 : a.isPaid ? 1 : -1));
  } else {
    sortedPool.sort((a, b) => (a.isPaid === b.isPaid ? 0 : a.isPaid ? -1 : 1));
  }

  const availableKeys = sortedPool.filter(k => k.key && !exhaustedKeys.has(k.id));

  if (availableKeys.length === 0) {
    const error = new Error("⚠️ Todas las API Keys (Facturación y Gratuitas) han alcanzado su límite de cuota.");
    error.status = 429;
    throw error;
  }

  let lastError = null;
  const initialKeyId = availableKeys[0].id;

  for (const keyConfig of availableKeys) {
    try {
      const selectedModelName = resolveModelForTier(preferredModel, keyConfig.isPaid);
      console.log(`[GeminiPool] Invocando llave ${keyConfig.id} (${keyConfig.description}) con modelo: ${selectedModelName}`);

      const genAI = new GoogleGenerativeAI(keyConfig.key);

      // Directrices Gemini 3.x: sin temperature, top_p ni top_k a menos que se especifique
      const modelConfig = {
        model: selectedModelName
      };

      if (systemInstruction) {
        modelConfig.systemInstruction = systemInstruction;
      }

      if (isJson || responseSchema) {
        modelConfig.generationConfig = {
          responseMimeType: "application/json",
          ...(responseSchema ? { responseSchema } : {})
        };
      }

      const model = genAI.getGenerativeModel(modelConfig);

      if (isStreaming) {
        const result = await model.generateContentStream(prompt);
        return {
          stream: result.stream,
          usedKeyId: keyConfig.id,
          model: selectedModelName,
          wasFallback: keyConfig.id !== initialKeyId
        };
      } else {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return {
          text,
          usedKeyId: keyConfig.id,
          model: selectedModelName,
          wasFallback: keyConfig.id !== initialKeyId
        };
      }
    } catch (error) {
      lastError = error;
      const status = error.status || error?.response?.status;
      const msg = error.message || "";

      if (isQuotaOrBillingError(error)) {
        console.warn(`[Failover Backend] Clave ${keyConfig.id} agotada o bloqueada (${status || msg}). Conmutando al siguiente respaldo...`);
        exhaustedKeys.set(keyConfig.id, Date.now() + cooldownMs);
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error("Fallo en el pool de Gemini tras agotar todos los respaldos.");
}

/**
 * Ejecutor de chat con streaming multi-key con soporte de historial y failover automático
 *
 * @param {Array} history Historial previo de conversación ([{ role, parts }])
 * @param {string} lastMessage Último mensaje del usuario
 * @param {object} options
 */
export async function executeBackendGeminiChatStream(history, lastMessage, options = {}) {
  const {
    keys = {},
    preferredModel = "gemini-3.8-flash",
    systemInstruction,
    mode = "paid_first",
    cleanBold = false,
    cooldownMs = 60 * 60 * 1000
  } = options;

  const now = Date.now();
  for (const [keyId, resetTime] of exhaustedKeys.entries()) {
    if (now >= resetTime) {
      exhaustedKeys.delete(keyId);
    }
  }

  const pool = buildKeyPool(keys);
  let sortedPool = [...pool];

  if (mode === "free_first") {
    sortedPool.sort((a, b) => (a.isPaid === b.isPaid ? 0 : a.isPaid ? 1 : -1));
  } else {
    sortedPool.sort((a, b) => (a.isPaid === b.isPaid ? 0 : a.isPaid ? -1 : 1));
  }

  const availableKeys = sortedPool.filter(k => k.key && !exhaustedKeys.has(k.id));
  if (availableKeys.length === 0) {
    const error = new Error("⚠️ Todas las API Keys (Facturación y Gratuitas) han alcanzado su límite de cuota.");
    error.status = 429;
    throw error;
  }

  let validHistory = (history || []).slice(0);
  if (validHistory.length > 0 && validHistory[0].role !== "user") {
    validHistory.shift();
  }

  let lastError = null;
  const initialKeyId = availableKeys[0].id;

  for (const keyConfig of availableKeys) {
    try {
      const selectedModelName = resolveModelForTier(preferredModel, keyConfig.isPaid);
      console.log(`[GeminiPool ChatStream] Invocando llave ${keyConfig.id} (${keyConfig.description}) con modelo: ${selectedModelName}`);

      const genAI = new GoogleGenerativeAI(keyConfig.key);
      const modelConfig = {
        model: selectedModelName,
        ...(systemInstruction ? { systemInstruction } : {})
      };

      const model = genAI.getGenerativeModel(modelConfig);
      const chat = model.startChat({ history: validHistory });
      const resultStream = await chat.sendMessageStream(lastMessage);

      return {
        stream: resultStream.stream,
        usedKeyId: keyConfig.id,
        model: selectedModelName,
        wasFallback: keyConfig.id !== initialKeyId
      };
    } catch (error) {
      lastError = error;
      const status = error.status || error?.response?.status;
      const msg = error.message || "";

      if (isQuotaOrBillingError(error)) {
        console.warn(`[Failover ChatStream] Clave ${keyConfig.id} agotada o bloqueada (${status || msg}). Conmutando al siguiente respaldo...`);
        exhaustedKeys.set(keyConfig.id, Date.now() + cooldownMs);
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error("Fallo en el pool de Gemini ChatStream tras agotar todos los respaldos.");
}

/**
 * Devuelve el estado actual de las llaves del backend
 */
export function getPoolStatus(keys = {}) {
  const now = Date.now();
  const pool = buildKeyPool(keys);
  return pool.map(k => {
    const isExhausted = exhaustedKeys.has(k.id) && now < exhaustedKeys.get(k.id);
    const cooldownRemaining = isExhausted ? Math.round((exhaustedKeys.get(k.id) - now) / 1000) : 0;
    return {
      id: k.id,
      isPaid: k.isPaid,
      description: k.description,
      isConfigured: Boolean(k.key),
      isAvailable: Boolean(k.key) && !isExhausted,
      cooldownRemainingSeconds: cooldownRemaining
    };
  });
}

/**
 * Resetea manualmente el estado del Circuit Breaker
 */
export function resetCircuitBreaker() {
  exhaustedKeys.clear();
  console.log("🔄 Circuit Breaker del Backend GeminiPool restablecido.");
}

export default {
  buildKeyPool,
  executeBackendGemini,
  executeBackendGeminiChatStream,
  resolveModelForTier,
  isQuotaOrBillingError,
  getPoolStatus,
  resetCircuitBreaker
};
