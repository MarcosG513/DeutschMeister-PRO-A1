import { playGermanAudio, stopCurrentAudio } from "../services/aiAudioService";

export function abortableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true }
    );
  });
}

export async function stopAllDrivingSpeech() {
  stopCurrentAudio();
}

/**
 * Reproduce cualquier locución (español o alemán) con la voz neuronal Charon
 * usando el pipeline Cache-First (IndexedDB -> Firestore CDN -> Gemini 3.8 TTS + Cloud Storage)
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

    const onAbort = () => {
      stopCurrentAudio();
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });

    try {
      playGermanAudio(text, {
        voice: "Charon",
        type,
        lang,
        signal,
        onEnd: () => {
          signal?.removeEventListener("abort", onAbort);
          resolve();
        },
        onError: () => {
          signal?.removeEventListener("abort", onAbort);
          resolve();
        }
      });
    } catch (_) {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }
  });
}

export async function speakSpanishPrompt(text, signal, type = "driving_prompt") {
  if (!text || signal?.aborted) return;
  await abortableDelay(250, signal); // Margen anti-recorte Bluetooth A2DP
  await speakWithCharon(text, { type, lang: "es", signal });
}

export async function speakGermanCharon(text, type = "vocab", signal) {
  if (!text || signal?.aborted) return;
  await abortableDelay(250, signal);
  await speakWithCharon(text, { type, lang: "de", signal });
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
