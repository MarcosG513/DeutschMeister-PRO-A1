/**
 * geminiPool.js - Gestor de Resiliencia Multi-Key (GeminiResilientPool)
 * DeutschMeister PRO A1 (React 19 + Vite / Universal)
 *
 * Pool de 3 llaves con conmutación bidireccional por error (Failover / Circuit Breaker):
 * 1. Prioridad Créditos / Facturación: Ejecuta gemini-3.8-flash en la cuenta vinculada con créditos.
 *    Si se agotan los créditos (402, 403, 429), conmuta de inmediato a las cuentas gratuitas (Free Tier).
 * 2. Modo Ahorro (Free-First): Consume primero la cuota gratuita (gemini-3.5-flash-lite); si ambas
 *    cuentas agotan su cuota (429), escala a la clave de facturación con gemini-3.8-flash.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Acceso seguro a variables de entorno en Vite (import.meta.env) y Node/SSR (process.env)
const getEnvVar = (viteKey, nodeKey) => {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[viteKey]) {
    return import.meta.env[viteKey];
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env[nodeKey] || process.env[viteKey] || "";
  }
  return "";
};

// Configuración de las 3 Llaves del Pool
export const KEY_POOL = [
  {
    id: "PAID_CREDITS",
    key: getEnvVar("VITE_GEMINI_PAID_KEY", "GEMINI_PAID_KEY"),
    isPaid: true,
    description: "Cuenta con Facturación / Google Developer Program (Gemini 3.8 Flash)"
  },
  {
    id: "FREE_1",
    key: getEnvVar("VITE_GEMINI_FREE_KEY_1", "GEMINI_FREE_KEY_1") || getEnvVar("VITE_GEMINI_FREE_KEY", "GEMINI_FREE_KEY"),
    isPaid: false,
    description: "Cuenta Gratuita A - Free Tier (Gemini 3.5 Flash-Lite)"
  },
  {
    id: "FREE_2",
    key: getEnvVar("VITE_GEMINI_FREE_KEY_2", "GEMINI_FREE_KEY_2"),
    isPaid: false,
    description: "Cuenta Gratuita B - Free Tier (Gemini 3.5 Flash-Lite)"
  }
];

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
  // Fallback seguro para claves gratuitas si se solicitó un modelo exclusivo de facturación
  if (requestedModel === "gemini-3.8-flash") {
    return "gemini-3.5-flash-lite"; // Óptimo para cuotas gratuitas
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
 * Devuelve el estado actual de las llaves en memoria
 */
export function getPoolStatus() {
  const now = Date.now();
  return KEY_POOL.map(k => {
    const isExhausted = exhaustedKeys.has(k.id) && now < exhaustedKeys.get(k.id);
    const cooldownRemaining = isExhausted ? Math.round((exhaustedKeys.get(k.id) - now) / 1000) : 0;
    return {
      id: k.id,
      isPaid: k.isPaid,
      hasKey: Boolean(k.key),
      isAvailable: Boolean(k.key) && !isExhausted,
      cooldownRemainingSeconds: cooldownRemaining
    };
  });
}

/**
 * Reinicia manualmente el estado del Circuit Breaker
 */
export function resetCircuitBreaker() {
  exhaustedKeys.clear();
  console.log("♻️ [GeminiResilientPool] Circuit Breaker reiniciado: todas las llaves habilitadas.");
}

/**
 * Ejecutor con reintento y cascada de fallos (Circuit Breaker)
 *
 * @param {string|object} prompt Texto o payload estructurado
 * @param {object} options
 * @param {string} [options.preferredModel="gemini-3.8-flash"] Modelo deseado (ej. gemini-3.8-flash)
 * @param {boolean} [options.isStreaming=false] Retornar stream en lugar de texto
 * @param {string} [options.systemInstruction] Instrucción de sistema para el modelo
 * @param {boolean} [options.isJson=false] Respuesta forzada en formato application/json
 * @param {"paid_first"|"free_first"} [options.mode="paid_first"] Modo de prioridad del pool
 * @param {number} [options.cooldownMs=3600000] Tiempo de bloqueo por llave agotada (default: 1 hora)
 * @returns {Promise<{text?: string, stream?: any, usedKeyId: string, model: string, wasFallback: boolean}>}
 */
export async function executeResilientGemini(prompt, options = {}) {
  const {
    preferredModel = "gemini-3.8-flash",
    isStreaming = false,
    systemInstruction,
    isJson = false,
    mode = "paid_first",
    cooldownMs = 60 * 60 * 1000
  } = options;

  const now = Date.now();

  // 1. Limpiar llaves cuyo periodo de cooldown haya vencido
  for (const [keyId, resetTime] of exhaustedKeys.entries()) {
    if (now >= resetTime) {
      console.log(`⏱️ [GeminiResilientPool] Cooldown vencido para la llave ${keyId}. Restaurando...`);
      exhaustedKeys.delete(keyId);
    }
  }

  // 2. Orden de prioridad según modo seleccionado:
  // - "paid_first" (calidad/créditos): [PAID_CREDITS, FREE_1, FREE_2]
  // - "free_first" (ahorro): [FREE_1, FREE_2, PAID_CREDITS]
  let sortedPool = [...KEY_POOL];
  if (mode === "free_first") {
    sortedPool.sort((a, b) => (a.isPaid === b.isPaid ? 0 : a.isPaid ? 1 : -1));
  } else {
    sortedPool.sort((a, b) => (a.isPaid === b.isPaid ? 0 : a.isPaid ? -1 : 1));
  }

  // 3. Filtrar llaves disponibles y con valor
  const availableKeys = sortedPool.filter(k => k.key && !exhaustedKeys.has(k.id));

  if (availableKeys.length === 0) {
    throw new Error("⚠️ Todas las API Keys (Facturación y Gratuitas) han alcanzado su límite temporal de cuota.");
  }

  let lastError = null;
  const initialKeyId = availableKeys[0].id;

  for (const keyConfig of availableKeys) {
    try {
      const selectedModelName = resolveModelForTier(preferredModel, keyConfig.isPaid);
      const genAI = new GoogleGenerativeAI(keyConfig.key);

      // Configuración limpia según directrices oficiales de Gemini 3.x (sin temperature, top_p ni top_k)
      const modelConfig = {
        model: selectedModelName
      };

      if (systemInstruction) {
        modelConfig.systemInstruction = systemInstruction;
      }

      if (isJson) {
        modelConfig.generationConfig = {
          responseMimeType: "application/json"
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
        console.warn(`[Failover] Clave ${keyConfig.id} agotada o bloqueada (${status || msg}). Conmutando al siguiente respaldo...`);
        // Registrar en Circuit Breaker
        exhaustedKeys.set(keyConfig.id, Date.now() + cooldownMs);
        continue; // Intenta con la siguiente clave disponible
      }

      // Si es un error sintáctico u otro fallo de red severo no relacionado a cuota, propaga el error
      throw error;
    }
  }

  throw new Error(`Fallo en el pool de Gemini tras agotar todos los respaldos: ${lastError?.message}`);
}

export default {
  KEY_POOL,
  executeResilientGemini,
  resolveModelForTier,
  getPoolStatus,
  resetCircuitBreaker
};
