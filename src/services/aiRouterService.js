/**
 * aiRouterService.js - Router de Inteligencia Artificial para el Frontend
 * DeutschMeister PRO A1
 */

import {
  executeResilientGemini,
  resolveModelForTier,
  getPoolStatus,
  resetCircuitBreaker,
  KEY_POOL
} from "./geminiPool";

/**
 * Consulta resiliente a Gemini con soporte de fallback automático
 */
export async function queryGemini(prompt, options = {}) {
  return await executeResilientGemini(prompt, options);
}

/**
 * Consulta a Gemini con streaming en tiempo real
 */
export async function streamGemini(prompt, options = {}) {
  return await executeResilientGemini(prompt, { ...options, isStreaming: true });
}

export {
  executeResilientGemini,
  resolveModelForTier,
  getPoolStatus,
  resetCircuitBreaker,
  KEY_POOL
};

export default {
  queryGemini,
  streamGemini,
  getPoolStatus,
  resetCircuitBreaker,
  KEY_POOL
};
