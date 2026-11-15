import { playGermanAudio, stopCurrentAudio } from "../services/aiAudioService";

export function abortableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const duration = Math.max(0, Number(ms) || 0);
    if (duration === 0) {
      return resolve();
    }

    const targetTime = Date.now() + duration;
    let timer = null;
    let settled = false;

    const cleanup = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      signal?.removeEventListener("abort", onAbort);
    };

    const onAbort = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", onAbort, { once: true });

    const tick = () => {
      if (settled) return;
      if (signal?.aborted) {
        onAbort();
        return;
      }
      const remaining = targetTime - Date.now();
      if (remaining <= 0) {
        settled = true;
        cleanup();
        resolve();
        return;
      }
      timer = setTimeout(tick, Math.min(250, remaining));
    };

    timer = setTimeout(tick, Math.min(250, duration));
  });
}

export async function stopAllDrivingSpeech() {
  stopCurrentAudio();
}

/**
 * Reproduce cualquier locución (español o alemán) con la voz neuronal Charon
 * usando el pipeline Cache-First + Watchdog de seguridad para Android Auto / Bluetooth.
 */
export function speakWithCharon(text, { type = "vocab", lang = "de", signal } = {}) {
  return new Promise((resolve, reject) => {
    if (!text || signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const clean = (text || "").replace(/[*_#`~]/g, "").trim();
    if (!clean) {
      return resolve();
    }

    const watchdogMs = Math.max(12000, clean.length * 160);
    const watchdogEndTime = Date.now() + watchdogMs;
    let watchdogTimer = null;
    let settled = false;

    const cleanup = () => {
      if (watchdogTimer !== null) {
        clearTimeout(watchdogTimer);
        watchdogTimer = null;
      }
      signal?.removeEventListener("abort", onAbort);
    };

    const finishSuccess = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };

    const onAbort = () => {
      if (settled) return;
      settled = true;
      cleanup();
      stopCurrentAudio();
      reject(new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", onAbort, { once: true });

    // Watchdog resistente a throttling de timers en segundo plano
    const checkWatchdog = () => {
      if (settled) return;
      if (signal?.aborted) {
        onAbort();
        return;
      }
      const remaining = watchdogEndTime - Date.now();
      if (remaining <= 0) {
        console.warn(`[DrivingSpeech Watchdog] Timeout (${watchdogMs}ms) alcanzado para: "${clean.substring(0, 40)}"`);
        stopCurrentAudio();
        finishSuccess();
        return;
      }
      watchdogTimer = setTimeout(checkWatchdog, Math.min(1000, remaining));
    };
    watchdogTimer = setTimeout(checkWatchdog, Math.min(1000, watchdogMs));

    try {
      Promise.resolve(
        playGermanAudio(text, {
          voice: "Charon",
          type,
          lang,
          signal,
          onEnd: finishSuccess,
          onError: finishSuccess
        })
      ).catch(() => {
        finishSuccess();
      });
    } catch (_) {
      finishSuccess();
    }
  });
}

export async function speakSpanishPrompt(text, signal, type = "driving_prompt") {
  if (!text || signal?.aborted) return;
  await abortableDelay(250, signal); // Margen anti-recorte Bluetooth A2DP
  await speakWithCharon(text, { type, lang: "es", signal });
}

export async function speakGermanCharon(text, type = "vocab", signal, lang = "de") {
  if (!text || signal?.aborted) return;
  await abortableDelay(250, signal);
  await speakWithCharon(text, { type, lang, signal });
}

export function buildMicroTipEs(wordObj) {
  if (!wordObj) return null;
  if (wordObj.tipEs) return wordObj.tipEs;
  const tips = [];
  const deLower = (wordObj.de || "").toLowerCase();

  if (deLower.startsWith("der ")) {
    tips.push("Sustantivo masculino con artículo der.");
  } else if (deLower.startsWith("die ")) {
    tips.push("Sustantivo femenino con artículo die.");
  } else if (deLower.startsWith("das ")) {
    tips.push("Sustantivo neutro con artículo das.");
  }

  if (wordObj.regimen && wordObj.regimen !== "-") {
    tips.push(`Nota clave: ${wordObj.regimen}.`);
  } else if (wordObj.plural && wordObj.plural !== "-") {
    tips.push(`Su plural es ${wordObj.plural}.`);
  }

  return tips.length > 0 ? tips.join(" ") : null;
}
