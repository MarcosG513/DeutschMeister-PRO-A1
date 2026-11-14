// src/services/androidAutoBridge.js
import { registerPlugin, Capacitor } from "@capacitor/core";

export const AndroidAuto = registerPlugin("AndroidAuto");

/**
 * Limpia prefijos conversacionales largos que saturan la pantalla de Android Auto
 * y la barra inferior de Google Maps (evitando que se corte la oración real).
 *
 * @param {string} rawText
 * @returns {string} Texto limpio listo para lectura vehicular
 */
export function cleanTextForCarScreen(rawText = "") {
  return String(rawText || "")
    .replace(/^¿\s*Cómo\s+(dices|preguntas)(\s+en\s+una\s+conversación|\s+al\s+cliente|\s+a\s+tu\s+compañero|\s+con\s+educación|\s+al\s+teléfono|\s+a\s+alguien\s+de\s+tú)?\s*:\s*/i, "")
    .replace(/^En\s+una\s+frase\s*:\s*/i, "")
    .replace(/\?$/, "")
    .trim();
}

/**
 * Divide un texto en páginas balanceadas de máximo 2 líneas cada una.
 * Respeta límites de palabras para que ninguna línea supere maxLineChars (34 caracteres por defecto).
 *
 * @param {string} text
 * @param {number} maxLineChars
 * @returns {Array<{ line1: string, line2: string }>}
 */
export function splitIntoBalancedPages(text = "", maxLineChars = 34) {
  if (!text || typeof text !== "string") return [{ line1: "", line2: "" }];

  const clean = text.trim();
  if (clean.length === 0) return [{ line1: "", line2: "" }];

  const words = clean.split(/\s+/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxLineChars) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  if (lines.length === 0) return [{ line1: "", line2: "" }];
  if (lines.length === 1) return [{ line1: lines[0], line2: "" }];

  const pages = [];
  for (let i = 0; i < lines.length; i += 2) {
    pages.push({
      line1: lines[i],
      line2: lines[i + 1] || ""
    });
  }
  return pages;
}

/**
 * Distribuye inteligentemente el contenido en dos líneas (title = Línea 1 Grande, subtitle = Línea 2)
 * según la fase pedagógica activa para máxima legibilidad en Android Auto.
 *
 * @param {Object} params
 * @returns {Array<{ title: string, subtitle: string }>} Lista de páginas de 2 líneas
 */
export function formatTwoLineCarDisplay({
  phase = "idle",
  spanishText = "",
  germanText = "",
  countdownSec = 0,
  waveLabel = "OLA 1/4",
  blockProgress = ""
}) {
  const cleanEs = cleanTextForCarScreen(spanishText);
  const cleanDe = cleanTextForCarScreen(germanText);

  // 1. REVEALING: Solución de Charon (Alemán arriba, Español debajo)
  if (phase.includes("revealing") || phase.includes("solution")) {
    if (cleanDe.length <= 34) {
      return [{
        title: `✅ ${cleanDe}`,
        subtitle: cleanEs ? `🇪🇸 ${cleanEs}` : (blockProgress || "Solución Charon")
      }];
    }
    // Si la oración en alemán es larga, se divide en 2 líneas o páginas
    const dePages = splitIntoBalancedPages(cleanDe, 34);
    return dePages.map((p, idx) => ({
      title: dePages.length > 1 ? `✅ (${idx + 1}/${dePages.length}) ${p.line1}` : `✅ ${p.line1}`,
      subtitle: p.line2 || (cleanEs ? `🇪🇸 ${cleanEs}` : blockProgress)
    }));
  }

  // 2. WAITING: Turno del conductor (Cuenta regresiva visible)
  if (phase.includes("waiting") || phase.includes("countdown")) {
    const esPages = splitIntoBalancedPages(cleanEs, 30);
    if (esPages.length === 1 && !esPages[0].line2) {
      return [{
        title: `🎙️ (${countdownSec}s) ${esPages[0].line1}`,
        subtitle: `Habla en voz alta • ${blockProgress}`
      }];
    }
    return esPages.map((p, idx) => ({
      title: esPages.length > 1
        ? `🎙️ (${countdownSec}s) [${idx + 1}/${esPages.length}] ${p.line1}`
        : `🎙️ (${countdownSec}s) ${p.line1}`,
      subtitle: p.line2 || `Habla en voz alta • ${blockProgress}`
    }));
  }

  // 3. PROMPTING: Reto en español
  if (phase.includes("prompting")) {
    const esPages = splitIntoBalancedPages(cleanEs, 34);
    if (esPages.length === 1 && !esPages[0].line2) {
      return [{
        title: `🇪🇸 ${esPages[0].line1}`,
        subtitle: `🎧 Escucha • ${blockProgress}`
      }];
    }
    return esPages.map((p, idx) => ({
      title: esPages.length > 1 ? `🇪🇸 [${idx + 1}/${esPages.length}] ${p.line1}` : `🇪🇸 ${p.line1}`,
      subtitle: p.line2 || `🎧 Escucha • ${blockProgress}`
    }));
  }

  // 4. EXPLAINING: Coach / Regla / Micro-tip
  if (phase === "explaining") {
    const expPages = splitIntoBalancedPages(cleanEs, 34);
    if (expPages.length === 1 && !expPages[0].line2) {
      return [{
        title: `🎓 ${expPages[0].line1}`,
        subtitle: `Micro-Tip • ${blockProgress}`
      }];
    }
    return expPages.map((p, idx) => ({
      title: expPages.length > 1 ? `🎓 [${idx + 1}/${expPages.length}] ${p.line1}` : `🎓 ${p.line1}`,
      subtitle: p.line2 || `Micro-Tip • ${blockProgress}`
    }));
  }

  // 5. PAUSED
  if (phase === "paused") {
    return [{
      title: "⏸️ Sesión en Pausa",
      subtitle: cleanEs ? `🇪🇸 ${cleanEs}` : `Toca reproducir • ${blockProgress}`
    }];
  }

  // 6. DEFAULT / IDLE
  return [{
    title: "DeutschMeister Fahrmodus",
    subtitle: cleanEs || (blockProgress ? `Listo • ${blockProgress}` : "Listo en carretera")
  }];
}

// Control del rotador automático de páginas para textos largos
let currentPagerTimer = null;
let currentPagerKey = "";

/**
 * Sincroniza en tiempo real los metadatos y el Teleprompter gráfico en la pantalla
 * del vehículo (Android Auto) y en la Media Session estándar del navegador.
 * Si el texto supera 2 líneas, inicia un rotador automático de páginas cada 2.3 segundos.
 *
 * @param {Object} stateObj
 */
export async function syncAndroidAutoScreen(stateObj = {}) {
  const pages = formatTwoLineCarDisplay(stateObj);
  const cleanEs = cleanTextForCarScreen(stateObj.spanishText);
  const cleanDe = cleanTextForCarScreen(stateObj.germanText);

  // Clave única del bloque actual (sin incluir countdownSec para no interrumpir el paginador)
  const pagerKey = `${stateObj.phase}__${cleanEs}__${cleanDe}__${stateObj.blockProgress}`;

  const sendPageToNativeAndMediaSession = async (page) => {
    const payload = {
      title: page.title || "DeutschMeister Fahrmodus",
      subtitle: page.subtitle || "",
      album: stateObj.album || "Fahrmodus",
      phase: stateObj.phase || "idle",
      spanishText: cleanEs,
      germanText: cleanDe,
      waveLabel: stateObj.waveLabel || "OLA 1/4",
      blockProgress: stateObj.blockProgress || "",
      countdownSec: Number(stateObj.countdownSec) || 0,
      isPlaying: Boolean(stateObj.isPlaying)
    };

    // 1. Android Auto Nativo
    if (Capacitor.isNativePlatform()) {
      try {
        await AndroidAuto.updateCarScreen(payload);
      } catch (err) {
        console.warn("[AndroidAutoBridge] Error updateCarScreen:", err);
      }
    }

    // 2. Media Session estándar del navegador
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: payload.title,
          artist: payload.subtitle,
          album: payload.album
        });
        navigator.mediaSession.playbackState = payload.isPlaying ? "playing" : "paused";
      } catch (_) {}
    }
  };

  // Si cambió el contenido o la fase, reiniciamos el paginador
  if (pagerKey !== currentPagerKey) {
    if (currentPagerTimer) {
      clearInterval(currentPagerTimer);
      currentPagerTimer = null;
    }
    currentPagerKey = pagerKey;

    let pageIdx = 0;
    await sendPageToNativeAndMediaSession(pages[0]);

    if (pages.length > 1 && stateObj.phase !== "paused" && stateObj.phase !== "idle") {
      currentPagerTimer = setInterval(() => {
        pageIdx = (pageIdx + 1) % pages.length;
        sendPageToNativeAndMediaSession(pages[pageIdx]);
      }, 2300);
    }
  } else {
    // Si la clave es la misma (ej. cuenta regresiva disminuyendo), actualizamos la página 0
    await sendPageToNativeAndMediaSession(pages[0]);
  }
}

/**
 * Publica la lista de bloques de la lección actual en Android Auto para que el
 * conductor pueda ver la cola a pantalla completa y saltar a cualquier bloque.
 *
 * @param {Array<Object>} queue
 */
export async function syncAndroidAutoQueue(queue = []) {
  if (!Capacitor.isNativePlatform() || !Array.isArray(queue) || queue.length === 0) return;
  try {
    const items = queue.slice(0, 80).map((it, idx) => ({
      index: idx,
      title: cleanTextForCarScreen(it.targetDe || it.de || it.title || `Bloque ${idx + 1}`),
      subtitle: cleanTextForCarScreen(it.promptEs || it.es || "")
    }));
    await AndroidAuto.updateSessionQueue({ items });
  } catch (err) {
    console.warn("[AndroidAutoBridge] Error actualizando cola:", err);
  }
}

/**
 * Escucha eventos y comandos emitidos desde la pantalla táctil de Android Auto
 * o los botones del volante del vehículo (Play, Pause, Next, Previous, Repeat SRS, Next Wave, MediaId, JumpToIndex).
 *
 * @param {Function} callback - (action: string, payload: string|null) => void
 * @returns {Function} Función para cancelar la suscripción
 */
export function subscribeToAndroidAutoCommands(callback) {
  if (typeof callback !== "function") return () => {};

  let listenerHandle = null;

  if (Capacitor.isNativePlatform()) {
    // 1. Suscribirse a eventos en tiempo real
    AndroidAuto.addListener("androidAutoCommand", (data) => {
      if (data && data.action) {
        callback(data.action, data.payload || null);
      }
    })
      .then((handle) => {
        listenerHandle = handle;
      })
      .catch((err) => {
        console.warn("[AndroidAutoBridge] Error registrando listener:", err);
      });

    // 2. Consultar si hay algún comando pendiente que despertó la app al arrancar
    AndroidAuto.getPendingAutoCommand()
      .then((res) => {
        if (res && res.action) {
          callback(res.action, res.payload || null);
        }
      })
      .catch(() => {});
  }

  return () => {
    if (listenerHandle && typeof listenerHandle.remove === "function") {
      listenerHandle.remove();
    }
  };
}
