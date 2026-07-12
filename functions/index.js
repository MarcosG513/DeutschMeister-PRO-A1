import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fal } from "@fal-ai/client";

// Inicializa Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Define los secretos que se tomarán de Secret Manager (FASE 1)
const falKey = defineSecret("FAL_KEY");
const geminiFreeKey = defineSecret("GEMINI_FREE_KEY");

/**
 * Función auxiliar para obtener los prompts desde Firestore (FASE 2)
 */
async function getSystemPrompt(promptId, defaultPrompt) {
  try {
    const docRef = db.collection("config").doc("system_prompts");
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data[promptId]) {
        return data[promptId];
      }
    }
  } catch (error) {
    console.error("Error obteniendo system prompt desde Firestore, usando fallback:", error);
  }
  return defaultPrompt;
}

/**
 * Función centralizada de enrutamiento con Fallback a DeepSeek (Costo Base Cero con Fallback Económico)
 */
async function invokeWithDeepSeekFallback(promptSystem, promptUser, options = {}) {
  const isJson = options.isJson || false;
  const temperature = options.temperature !== undefined ? options.temperature : 0.7;

  // Intento 1: Gemini Free Tier (Costo $0)
  try {
    console.log("FinOps: Intentando con Gemini (Free Tier)...");
    const genAI = new GoogleGenerativeAI(geminiFreeKey.value());
    const model = genAI.getGenerativeModel({
      model: options.model || "gemini-3.5-flash",
      systemInstruction: promptSystem,
      generationConfig: {
        ...(isJson ? { responseMimeType: "application/json" } : {}),
        temperature: temperature
      }
    });

    const result = await model.generateContent(promptUser);
    const responseText = result.response.text().trim();
    if (isJson) {
      return JSON.parse(responseText);
    }
    return responseText;
  } catch (error) {
    const isQuotaError = error.status === 429 || (error.message && (error.message.includes("429") || error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("limit")));
    if (!isQuotaError) {
      console.warn("FinOps: Gemini falló por un error no de cuota, activando fallback de todos modos:", error.message);
    } else {
      console.warn("FinOps: Límite de cuota excedido (429) en Gemini. Activando fallback a DeepSeek...");
    }

    // Fallback: DeepSeek en Fal.ai (Costo ultra bajo)
    try {
      fal.config({
        credentials: falKey.value()
      });
      console.log("FinOps: Invocando DeepSeek via Fal.ai...");

      let finalPromptUser = promptUser;
      if (isJson) {
        finalPromptUser += "\n\nResponde estrictamente en formato JSON válido, sin bloques de código ```json ni texto adicional fuera del JSON.";
      }

      const response = await fal.subscribe("openrouter/router", {
        input: {
          model: "deepseek/deepseek-v3.2",
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
      console.error("FinOps: Error crítico en fallback de DeepSeek:", fallbackErr);
      throw new Error("Servicio no disponible temporalmente. Inténtalo más tarde.");
    }
  }
}

/**
 * Función centralizada para Streaming SSE con Fallback a DeepSeek
 */
async function streamWithDeepSeekFallback(res, promptSystem, history, lastMessage, options = {}) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  // Intento 1: Gemini Free Tier (Costo $0)
  try {
    console.log("FinOps Stream: Intentando con Gemini (Free Tier)...");
    const genAI = new GoogleGenerativeAI(geminiFreeKey.value());
    const model = genAI.getGenerativeModel({
      model: options.model || "gemini-3.1-flash-lite",
      systemInstruction: promptSystem
    });

    let validHistory = history.slice(0);
    if (validHistory.length > 0 && validHistory[0].role !== "user") {
      validHistory.shift();
    }

    const chat = model.startChat({
      history: validHistory
    });

    const resultStream = await chat.sendMessageStream(lastMessage);
    for await (const chunk of resultStream.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        const cleanedChunk = options.cleanBold ? chunkText.replace(/\*\*/g, '') : chunkText;
        res.write(`data: ${JSON.stringify({ text: cleanedChunk })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  } catch (error) {
    const isQuotaError = error.status === 429 || (error.message && (error.message.includes("429") || error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("limit")));
    if (!isQuotaError) {
      console.warn("FinOps Stream: Gemini falló por un error no de cuota, activando fallback de todos modos:", error.message);
    } else {
      console.warn("FinOps Stream: Límite de cuota excedido (429) en Gemini. Activando fallback a DeepSeek...");
    }

    // Fallback: DeepSeek en Fal.ai (Costo ultra bajo / económico)
    try {
      fal.config({
        credentials: falKey.value()
      });
      console.log("FinOps Stream: Invocando stream de DeepSeek via Fal.ai...");

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

      const falStream = await fal.stream("openrouter/router", {
        input: {
          model: "deepseek/deepseek-v3.2",
          prompt: promptBuilder,
          system_prompt: promptSystem,
          temperature: options.temperature || 0.7
        }
      });

      let lastOutput = "";
      for await (const event of falStream) {
        const currentOutput = event.output || "";
        if (currentOutput.length > lastOutput.length) {
          const chunkText = currentOutput.substring(lastOutput.length);
          lastOutput = currentOutput;
          if (chunkText) {
            const cleanedChunk = options.cleanBold ? chunkText.replace(/\*\*/g, '') : chunkText;
            res.write(`data: ${JSON.stringify({ text: cleanedChunk })}\n\n`);
          }
        }
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (fallbackErr) {
      console.error("FinOps Stream: Error crítico en fallback de DeepSeek:", fallbackErr);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error en el servidor de fallback." });
      } else {
        res.write(`data: ${JSON.stringify({ error: "Stream fallback error: " + fallbackErr.message })}\n\n`);
        res.end();
      }
    }
  }
}

// =========================================================================
// 1. SIMULADOR DE ROL A1 (RoleplaySimulator)
// Modelo: gemini-3.5-flash (primario) / deepseek-v3.2 via enterprise (fallback)
// =========================================================================
export const runRoleplaySimulator = onRequest({
  secrets: [geminiFreeKey, falKey],
  cors: true
}, async (req, res) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    res.status(405).send("Method Not Allowed");
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
      REGLAS ESTRICTAS:
      1. Usa SOLO alemán de nivel A1 (frases cortas, vocabulario de máximo 500 palabras cotidianas, tiempo presente).
      2. No uses gramática compleja como subjuntivos o voz pasiva.
      3. Mantén tus respuestas cortas (1 a 3 frases máximo) para mantener la conversación ágil.
      4. Si el usuario comete un error muy grave en su respuesta, corrígelo brevemente entre paréntesis al final en español, pero mantén el flujo del personaje.
      5. Método Blurting (Calentamiento Cognitivo): Si estás enviando el primer mensaje para abrir el escenario, NO inicies el diálogo de rol de inmediato. Primero, proponle al estudiante un reto de 'vaciado de memoria' (Blurting). Dile que tiene 30 segundos para escribirte de 3 a 5 palabras en alemán relacionadas con el lugar en el que están (ej. '¡Bienvenido al restaurante! Antes de pedir, dime rápido 3 palabras de comida o bebidas en alemán que recuerdes'). Una vez que el usuario responda, felicítalo y entonces sí, arranca el juego de rol.`;
  const systemInstruction = await getSystemPrompt("roleplay_simulator", defaultSystemInstruction);
  const finalSystemPrompt = systemInstruction.replace("${escenario}", escenario);

  const history = historialConversacion.slice(0, -1);
  const lastMessage = historialConversacion[historialConversacion.length - 1].parts[0].text;

  // Cabeceras SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  // ── PRIMARY: gemini-3.5-flash ─────────────────────────────────────────────
  try {
    console.log("Roleplay FinOps: Intentando con Gemini 3.5 Flash...");
    const genAI = new GoogleGenerativeAI(geminiFreeKey.value());
    const geminiModel = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: finalSystemPrompt
    });
    let validHistory = history.slice(0);
    if (validHistory.length > 0 && validHistory[0].role !== "user") validHistory.shift();
    const chat = geminiModel.startChat({ history: validHistory });
    const resultStream = await chat.sendMessageStream(lastMessage);
    for await (const chunk of resultStream.stream) {
      const raw = chunk.text();
      if (raw) {
        const clean = raw.replace(/\*\*/g, '').replace(/\*/g, '');
        res.write(`data: ${JSON.stringify({ text: clean })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
    return;

  // ── CIRCUIT BREAKER → FALLBACK: deepseek-v3.2 via openrouter/enterprise ──
  } catch (error) {
    console.warn("Roleplay FinOps: Gemini falló, activando fallback DeepSeek V3.2:", error.message);
    try {
      fal.config({ credentials: falKey.value() });
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
          model: "deepseek/deepseek-v3.2",
          prompt: promptBuilder,
          system_prompt: finalSystemPrompt,
          temperature: 0.7
        }
      });
      let lastOutput = "";
      for await (const event of falStream) {
        const currentOutput = event.output || "";
        if (currentOutput.length > lastOutput.length) {
          const raw = currentOutput.substring(lastOutput.length);
          lastOutput = currentOutput;
          if (raw) {
            const clean = raw.replace(/\*\*/g, '').replace(/\*/g, '');
            res.write(`data: ${JSON.stringify({ text: clean })}\n\n`);
          }
        }
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (fallbackErr) {
      console.error("Roleplay FinOps: Error crítico en fallback:", fallbackErr);
      if (!res.headersSent) {
        res.status(500).json({ error: "Servicio no disponible temporalmente. Inténtalo más tarde." });
      } else {
        res.write(`data: ${JSON.stringify({ error: "Stream fallback error: " + fallbackErr.message })}\n\n`);
        res.end();
      }
    }
  }
});

// =========================================================================
// 2. EVALUADOR DE CORREOS (EmailSimulator)
// =========================================================================
export const evaluateEmail = onCall({
  secrets: [falKey],
  maxInstances: 6
}, async request => {
  const {
    textoCorreo,
    consignaExamen
  } = request.data;
  if (!textoCorreo || !consignaExamen) {
    throw new HttpsError("invalid-argument", "Faltan parámetros requeridos");
  }
  try {
    fal.config({
      credentials: falKey.value()
    });
    const promptDefinido = ` Consigna del examen: "${consignaExamen}"
Texto del estudiante: "${textoCorreo}"

Por favor, actúa como un examinador oficial del Goethe-Institut para el nivel A1. Evalúa el correo redactado por el estudiante siguiendo la rúbrica oficial:
1. Cumplimiento de la tarea (¿respondió a los 3 puntos requeridos?).
2. Coherencia y vocabulario (nivel A1).
3. Corrección gramatical (especial atención a declinaciones nominativo/acusativo, conjugación verbal y posición del verbo).
4. Regla de Evaluación Socrática (¡CRÍTICO!): Si el estudiante intenta responder una pregunta de la consigna pero comete errores gramaticales o léxicos (ej. usar preposiciones literales como 'zu Park' en lugar de 'in den Park' o 'zum Park', o usar un verbo incorrecto), NUNCA digas que 'no respondió la pregunta'. Valida su intención comunicativa primero ("Veo que intentaste decir que...") y luego corrige el error gramatical. Asegúrate de que los títulos de tus correcciones no se contradigan con tus propias explicaciones y siempre explica el POR QUÉ de la regla gramatical sin inventar reglas falsas.

Devuelve tu respuesta estructurada en español usando Markdown con el formato de Evaluación General y Análisis Quirúrgico.
`;

    // Se utiliza DeepSeek V3.2 para máxima precisión y análisis pedagógico
    const result = await fal.subscribe("openrouter/router/enterprise", {
      input: {
        model: "deepseek/deepseek-v3.2",
        prompt: promptDefinido,
        system_prompt: "Eres un examinador estricto pero empático, metodológico y preciso de alemán nativo.",
        temperature: 0.2,
        top_p: 0.9
      }
    });
    return {
      output: result.data.output
    };
  } catch (error) {
    console.error("Error crítico en evaluateEmail (Fal/OpenRouter):", error);
    throw new HttpsError("internal", "Error procesando la evaluación con la IA");
  }
});

// =========================================================================
// 3. GENERADOR DE CUENTOS (generateStory)
// =========================================================================
export const generateStory = onRequest({
  secrets: [geminiFreeKey, falKey],
  cors: true
}, async (req, res) => {
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204).send("");
    return;
  }
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const bodyData = req.body.data || req.body;
    const {
      palabrasVocabulario
    } = bodyData;
    if (!palabrasVocabulario || !Array.isArray(palabrasVocabulario)) {
      res.status(400).json({
        error: "Faltan parámetros requeridos: palabrasVocabulario"
      });
      return;
    }
    const listaPalabras = palabrasVocabulario.join(", ");
    const promptSistema = "Eres un creador de cuentos infantiles y profesor de alemán nivel A1. Tu objetivo es escribir historias coherentes, inmersivas y gramaticalmente perfectas integrando vocabulario específico.";
    const promptDefinido = `Genera un micro-cuento interactivo en alemán nivel A1 que integre obligatoriamente estas palabras: [${listaPalabras}].
      En el campo "cuento_aleman", debes envolver obligatoriamente cada una de estas palabras clave de vocabulario [${listaPalabras}] con doble asterisco "**" (ej. **palabra**) cada vez que las uses en el texto para que resalten.
      La salida debe coincidir EXACTAMENTE con este esquema JSON, sin texto adicional:
      {
        "titulo": "Título en alemán",
        "cuento_aleman": "El microcuento en alemán...",
        "traduccion_espanol": "Traducción fluida al español",
        "palabras_clave_usadas": [ { "palabra": "Palabra", "contexto": "Oración donde se usó" } ],
        "pregunta_comprension": {
           "pregunta": "Pregunta corta",
           "opciones": ["Opción A", "Opción B", "Opción C"],
           "respuesta_correcta": "La opción exacta"
        }
      }`;

    console.log("FinOps: Iniciando generateStory con fallback...");
    const jsonOutput = await invokeWithDeepSeekFallback(promptSistema, promptDefinido, {
      isJson: true,
      temperature: 0.7,
      model: "gemini-3.5-flash"
    });

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    });

    const safeText = JSON.stringify(jsonOutput).replace(/\n/g, " ");
    res.write(`data: ${safeText}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
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

// =========================================================================
// 4. CHAT CON EL TUTOR IA (sendTutorChatMessage)
// =========================================================================
export const sendTutorChatMessage = onRequest({
  secrets: [geminiFreeKey, falKey],
  cors: true
}, async (req, res) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    res.status(405).send("Method Not Allowed");
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
  const historialConversacion = data?.historialConversacion;
  if (!historialConversacion || !Array.isArray(historialConversacion)) {
    res.status(400).send("Faltan parámetros requeridos: historialConversacion");
    return;
  }
  const defaultSystemInstruction = `Eres 'DeutschMeister Tutor', un profesor de alemán nativo, altamente empático y experto en pedagogía para estudiantes de nivel A1. 

Tu objetivo no es solo traducir, sino ENSEÑAR, guiar al estudiante y asegurar la retención del conocimiento.

REGLAS ESTRICTAS DE COMPORTAMIENTO:
1. Idioma y Ejemplos: Explica siempre en español claro y conversacional. Cada vez que uses una palabra o frase en alemán, ponla en **negrita** e incluye SIEMPRE su traducción al español inmediatamente después.
2. REGLAS CRÍTICAS Y ARQUITECTURA DE FLUJO (MODO SOCRÁTICO V4.1):
Para garantizar la deducción activa del estudiante, CADA uno de tus turnos debe seguir ESTRICTAMENTE esta estructura de 3 pasos:

- PASO 1 (Validación): Felicita el intento o valida la duda en máximo una línea.
- PASO 2 (La Pista Incompleta - BLINDADA): Usa SIEMPRE una palabra o estructura ANÁLOGA pero DIFERENTE a la que el alumno preguntó para ejemplificar.
  > EXCEPCIÓN LÉXICA: SOLO si el alumno pregunta directamente por el significado de una palabra suelta o saludo que no conoce (ej. colores, 'Guten Appetit', 'Mahlzeit'), tienes permitido darle la traducción directa.
  > ANTI-PATRÓN "N-1 PIEZAS" (PROHIBIDO): Dar los componentes léxicos exactos de la respuesta de forma separada ES dar la respuesta. (Ej. dar 'Wo ist' + 'Bahnhof' = Prohibido).
  > ANTI-PATRÓN "EJEMPLO = RESPUESTA" (PROHIBIDO): No uses la misma palabra/estructura que el alumno pidió dentro de tu ejemplo explicativo.
- PASO 3 (Pregunta Única): Formula EXACTAMENTE UNA (1) sola pregunta clara. Si usaste la Excepción Léxica, tu pregunta debe obligar al alumno a usar esa nueva palabra en una oración simple.

BLACKLIST DE JERGA DEFINITIVA:
PROHIBIDO usar: 'dativo', 'acusativo', 'cláusula subordinada', 'nominativo', 'neutro', 'masculino', 'femenino', 'género', 'sujeto', 'prefijo', 'artículo'. Sustitúyelos siempre por metáforas visuales.
REGLA DE FORMATO: PROHIBIDO devolver código JSON crudo o bloques de código en el chat.`;
  const systemInstruction = await getSystemPrompt("tutor_chat_system", defaultSystemInstruction);

  const history = historialConversacion.slice(0, -1);
  const lastMessage = historialConversacion[historialConversacion.length - 1].parts[0].text;

  await streamWithDeepSeekFallback(res, systemInstruction, history, lastMessage, {
    model: "gemini-3.5-flash",
    cleanBold: false
  });
});

// Función auxiliar para traducir conceptos a descripciones visuales usando Gemini
async function getVisualDescriptionForConcept(conceptoEspanol, freeKeyVal, category = "") {
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
  const invocarModelo = async apiKeyValue => {
    const genAI = new GoogleGenerativeAI(apiKeyValue);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite"
    });
    const result = await model.generateContent(promptDirectorArte);
    return result.response.text().trim().replace(/['"]/g, '');
  };
  try {
    return await invocarModelo(freeKeyVal);
  } catch (error) {
    return conceptoEspanol;
  }
}

// Función auxiliar para traducir conceptos directos de sentimientos/adjetivos/verbos a inglés limpio
async function getCleanEnglishTranslation(wordEspanol, freeKeyVal) {
  const prompt = `Translate the Spanish word "${wordEspanol}" to a single English word representing the emotion, state, or action (e.g., "cansado" -> "tired", "feliz" -> "happy", "triste" -> "sad", "enojado" -> "angry"). Return ONLY the translated English word in lowercase, with no punctuation or extra text.`;
  const invocarModelo = async apiKeyValue => {
    const genAI = new GoogleGenerativeAI(apiKeyValue);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite"
    });
    const result = await model.generateContent(prompt);
    return result.response.text().trim().toLowerCase().replace(/[^a-z\s-]/g, '');
  };
  try {
    return await invocarModelo(freeKeyVal);
  } catch (error) {
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
  secrets: [falKey, geminiFreeKey]
}, async request => {
  const {
    wordObj,
    conceptoIngles
  } = request.data;
  if (!wordObj || !wordObj.es || !wordObj.de) {
    throw new HttpsError("invalid-argument", "Faltan parámetros requeridos en wordObj");
  }

  // Usar el tipo gramatical si viene en wordObj, o intentar deducirlo
  const tipoGramatical = wordObj.type || wordObj.tipo_gramatical || 'sustantivo';
  const tipoLimpio = tipoGramatical.toLowerCase().trim();
  const palabraLimpia = (wordObj.de || "").trim().toLowerCase();
  const categoryLimpia = (wordObj.category || request.data.category || "").toLowerCase().trim();
  const esColor = palabraLimpia === "weiß" || palabraLimpia === "schwarz" || palabraLimpia === "grau" || palabraLimpia === "rot" || palabraLimpia === "blau" || palabraLimpia === "gelb" || palabraLimpia === "grün" || palabraLimpia === "braun" || palabraLimpia === "orange" || palabraLimpia === "rosa" || palabraLimpia === "lila" || palabraLimpia.includes("farbe") || categoryLimpia.includes("farben") || categoryLimpia.includes("color") || tipoLimpio.includes("color");
  const esPersonaje = !esColor && (tipoLimpio.includes("adjetivo") || tipoLimpio.includes("verbo") || tipoLimpio.includes("acción") || tipoLimpio.includes("pronombre") || tipoLimpio.includes("sentimiento"));

  try {
    fal.config({
      credentials: falKey.value()
    });

    // Si no tenemos un concepto en inglés predefinido, usamos Gemini para traducirlo rápido
    let concepto = conceptoIngles;
    if (esColor) {
      // Si es un color, obtenemos la traducción limpia en inglés (ej. "blanco" -> "white")
      // y definimos una salpicadura de pintura de ese color en lugar de personas
      const colorEn = await getCleanEnglishTranslation(wordObj.es, geminiFreeKey.value());
      concepto = `a vibrant splash of ${colorEn} paint`;
    } else if (esPersonaje) {
      // Ignorar la descripción de icono predefinida (por ej. luna, estrella, nube con caritas)
      // para forzar la generación de un personaje humano que represente la emoción/acción.
      concepto = await getCleanEnglishTranslation(wordObj.es, geminiFreeKey.value());
    } else if (!concepto) {
      const category = (request.data.category || "") + (wordObj.category ? ` - ${wordObj.category}` : "");
      concepto = await getVisualDescriptionForConcept(wordObj.es, geminiFreeKey.value(), category);
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

    // PARTE 1: Guardado Global en Caché
    const safeWordId = wordObj.de.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
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
export const generateReadingTest = onCall({
  secrets: [geminiFreeKey, falKey]
}, async request => {
  const {
    tema
  } = request.data;
  if (!tema) {
    throw new HttpsError("invalid-argument", "Falta el parámetro requerido: tema");
  }
  const defaultSystemInstruction = `
      Eres un profesor de alemán de nivel A1. El usuario te dará un tema de su interés.
      Tu tarea es generar:
      1. Un título en alemán para la lectura.
      2. Un texto de lectura corto y sencillo en alemán nivel A1 sobre el tema (máximo 80-100 palabras, usando frases muy sencillas, tiempo presente y vocabulario básico).
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
            "explicacion_espanol": "La 'explicacion_espanol' debe ser una retroalimentación socrática y didáctica que sirva de refuerzo. Debe explicar claramente por qué la respuesta correcta es la adecuada basándose en el texto, de modo que el alumno aprenda tanto si acierta como si falla."
          }
        ]
      }

      REGLAS CRÍTICAS:
      - Usa diacríticos/umlauts estándar del alemán (ä, ö, ü, ß) en lugar de dígrafos (como "fuer" en lugar de "für", o "schoen" en lugar de "schön").
      - NO coloques espacios antes de los signos de puntuación (ej. escribe "Familie." y no "Familie .", "Personen:" y no "Personen :", "Vater," y no "Vater ,"). El texto debe tener una puntuación limpia y profesional.
      - Responde únicamente con el formato JSON válido.
      - El texto y las preguntas deben estar estrictamente redactados en alemán nivel A1.
      - La explicación de las respuestas correctas debe estar en español.
    `;
  const systemInstruction = await getSystemPrompt("reading_comprehension_system", defaultSystemInstruction);
  const promptUser = `Genera la prueba de comprensión lectora para el tema: "${tema}".`;

  try {
    const jsonOutput = await invokeWithDeepSeekFallback(systemInstruction, promptUser, {
      isJson: true,
      temperature: 0.7,
      model: "gemini-2.5-flash"
    });
    return jsonOutput;
  } catch (error) {
    console.error("Error en generateReadingTest:", error);
    throw new HttpsError("internal", "Error generando el examen de comprensión lectora: " + error.message);
  }
});