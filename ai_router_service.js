/**
 * DEUTSCHMEISTER PRO A1 - SERVICIO DE ENRUTAMIENTO DE IA (CLIENT-SIDE)
 *
 * NOTA DE SEGURIDAD: En una aplicación de producción real, las llamadas a APIs 
 * con claves privadas (como GEMINI_API_KEY o FAL_KEY) deben realizarse desde un 
 * backend (ej. Firebase Cloud Functions). Para propósitos de este entorno de 
 * demostración/cliente, las estamos ejecutando directamente aquí.
 */

import { GoogleGenAI } from "@google/generative-ai";
import { fal } from "@fal-ai/client";

// =========================================================================
// 1. INICIALIZACIÓN DE PROVEEDORES
// =========================================================================

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const FAL_KEY = import.meta.env.VITE_FAL_KEY || "";

let googleAI = null;
if (GEMINI_KEY) {
  googleAI = new GoogleGenAI({ apiKey: GEMINI_KEY });
}

if (FAL_KEY) {
  fal.config({ credentials: FAL_KEY });
}

// =========================================================================
// 2. COMPONENTES DEL ENRUTADOR DE IA
// =========================================================================

/**
 * 1. SIMULADOR DE ROL A1 (RoleplaySimulator)
 * Modelo: Gemini 2.5 Flash
 */
export async function runRoleplaySimulator(historialConversacion, escenario) {
  if (!googleAI) throw new Error("API Key de Gemini no configurada.");
  
  try {
    const promptSistema = `
      Eres un hablante nativo de alemán en un escenario de juego de rol de nivel A1: "${escenario}".
      REGLAS ESTRICTAS:
      1. Usa SOLO alemán de nivel A1 (frases cortas, máximo 500 palabras cotidianas, tiempo presente).
      2. Mantén tus respuestas cortas (1 a 3 frases máximo).
      3. Si el usuario comete un error muy grave, corrígelo brevemente entre paréntesis al final en español.
    `;

    const model = googleAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-09-2025",
      systemInstruction: promptSistema
    });

    const chat = model.startChat({
      history: historialConversacion.slice(0, -1),
    });

    const ultimoMensaje = historialConversacion[historialConversacion.length - 1].parts[0].text;
    const result = await chat.sendMessage(ultimoMensaje);

    return result.response.text();
  } catch (error) {
    console.error("Error en RoleplaySimulator:", error);
    throw error;
  }
}

/**
 * 2. EVALUADOR DE CORREOS (EmailSimulator)
 * Modelo: Mistral NeMo 12B (vía fal.ai)
 */
export async function evaluateEmail(textoCorreo, consignaExamen) {
  if (!FAL_KEY) throw new Error("API Key de Fal.ai no configurada.");

  try {
    const promptDefinido = `
      Consigna: "${consignaExamen}"
      Texto del estudiante: "${textoCorreo}"

      Actúa como examinador del Goethe-Institut para A1. Evalúa:
      1. Cumplimiento de la tarea.
      2. Coherencia (A1).
      3. Gramática (declinaciones, posición del verbo).
      
      Formato Markdown en español:
      ### 🎯 Evaluación General (Puntaje estimado 0-10)
      ### 📈 Puntos Fuertes
      ### 🛠️ Correcciones Detalladas
      ### 💡 Sugerencia de Vocabulario
    `;

    const result = await fal.subscribe("fal-ai/any-llm", {
      input: {
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        prompt: promptDefinido,
        system_prompt: "Eres un examinador estricto, metodológico y preciso de alemán nativo."
      }
    });

    return result.data.output;
  } catch (error) {
    console.error("Error en evaluateEmail:", error);
    throw error;
  }
}

/**
 * 3. GENERADOR DE CUENTOS (generateStory)
 * Modelo: Qwen 2.5 7B (vía fal.ai)
 */
export async function generateStory(palabrasVocabulario) {
  if (!FAL_KEY) throw new Error("API Key de Fal.ai no configurada.");

  try {
    const promptDefinido = `
      Genera un micro-cuento interactivo en alemán nivel A1 que integre estas palabras: [${palabrasVocabulario.join(", ")}].
      DEBES responder ÚNICAMENTE con un objeto JSON válido, sin texto adicional. Esquema:
      {
        "titulo": "Título",
        "cuento_aleman": "Cuento en alemán",
        "traduccion_espanol": "Traducción",
        "palabras_clave_usadas": [{"palabra": "palabra", "contexto": "oración"}]
      }
    `;

    const result = await fal.subscribe("fal-ai/any-llm", {
      input: {
        model: "Qwen/Qwen2.5-7B-Instruct",
        prompt: promptDefinido,
        system_prompt: "Eres un generador de JSON estricto."
      }
    });

    let outputText = result.data.output.trim();
    if (outputText.startsWith("```json")) outputText = outputText.substring(7, outputText.length - 3).trim();
    else if (outputText.startsWith("```")) outputText = outputText.substring(3, outputText.length - 3).trim();

    return JSON.parse(outputText);
  } catch (error) {
    console.error("Error en generateStory:", error);
    throw error;
  }
}

/**
 * 4. CHAT CON EL TUTOR IA (sendChatMessage)
 * Modelo: Gemma 2 9B (Usaremos Gemini Flash aquí por compatibilidad del entorno actual, 
 * pero recuerda cambiarlo a 'gemma-2-9b-it' en tu código final).
 */
export async function sendTutorChatMessage(historialConversacion) {
  if (!googleAI) throw new Error("API Key de Gemini no configurada.");

  try {
    const promptSistema = `
      Eres 'DeutschMeister Tutor', un profesor de alemán para principiantes.
      REGLAS:
      1. Habla en español, escribe ejemplos claros en alemán con traducción.
      2. No abrumes con términos complejos.
      3. Usa listas y emojis.
      4. Termina siempre con una palabra de aliento o pregunta en alemán A1.
    `;

    // NOTA: Cambiar a "gemma-2-9b-it" en tu proyecto local
    const model = googleAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-09-2025", 
      systemInstruction: promptSistema
    });

    const chat = model.startChat({
      history: historialConversacion.slice(0, -1),
    });

    const ultimoMensaje = historialConversacion[historialConversacion.length - 1].parts[0].text;
    const result = await chat.sendMessage(ultimoMensaje);

    return result.response.text();
  } catch (error) {
    console.error("Error en sendTutorChatMessage:", error);
    throw error;
  }
}