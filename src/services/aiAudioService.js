import localforage from "localforage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  nativeSpeak,
  normalizePlaybackSpeed,
  getSavedPlaybackSpeed,
  setSavedPlaybackSpeed
} from "../utils/helpers";
import {
  getCleanSpeedAudioResult,
  isCleanStretchedUrl,
  unregisterCleanStretchedUrl,
  unlockWebKitAudioContext
} from "../utils/cleanTimeStretch";
import { functions as appFunctions } from "../config/firebase";

export { getSavedPlaybackSpeed, setSavedPlaybackSpeed, isCleanStretchedUrl, unlockWebKitAudioContext };

export const audioStore = localforage.createInstance({
  name: "DeutschMeisterAudioCache",
  storeName: "german_tts_cache"
});

let currentAudioInstance = null;
let currentObjectUrl = null;
let latestPlaybackRequestId = 0;
let cachedAudioKeysPromise = null;
let cachedAudioKeysSet = null;

function normalizeCleanText(text) {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[*_#`~]/g, "").replace(/\s+/g, " ").trim();
}

function fallbackRightRotate(value, amount) {
  return (value >>> amount) | (value << (32 - amount));
}

// Fallback SHA-256 determinista puro JS si crypto.subtle no está disponible en contextos WebView HTTP
function sha256HexPureJs(ascii) {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = "";
  const words = [];
  const asciiBitLength = ascii.length * 8;
  let hash = [];
  const k = [];
  let primeCounter = 0;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += "\x80";
  while ((ascii.length % 64) - 56) ascii += "\x00";
  for (let i = 0; i < ascii.length; i++) {
    const j = ascii.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);
    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];
      const a = hash[0];
      const e = hash[4];
      const temp1 =
        hash[7] +
        (fallbackRightRotate(e, 6) ^ fallbackRightRotate(e, 11) ^ fallbackRightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (fallbackRightRotate(w15, 7) ^ fallbackRightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (fallbackRightRotate(w2, 17) ^ fallbackRightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (fallbackRightRotate(a, 2) ^ fallbackRightRotate(a, 13) ^ fallbackRightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
      hash.pop();
    }
    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : "") + b.toString(16);
    }
  }
  return result;
}

/**
 * Calcula el identificador SHA-256 idéntico al backend (`audio_sha256_<24_hex_chars>`)
 * a partir de `cleanText + "_" + voice`.
 */
export async function computeSha256AudioId(text, voice = "Charon") {
  const cleanText = normalizeCleanText(text);
  if (!cleanText) return "";
  const rawInput = `${cleanText}_${voice}`;
  try {
    if (typeof crypto !== "undefined" && crypto.subtle && typeof TextEncoder !== "undefined") {
      const data = new TextEncoder().encode(rawInput);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return `audio_sha256_${hashHex.substring(0, 24)}`;
    }
  } catch (_) {}
  const utf8Binary = unescape(encodeURIComponent(rawInput));
  const hex = sha256HexPureJs(utf8Binary);
  return `audio_sha256_${hex.substring(0, 24)}`;
}

function normalizeAudioSlug(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/[*_#`~]/g, "")
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, " ")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^_+|_+$/g, "")
    .substring(0, 120);
}

export const getSafeAudioId = (text) => {
  const normalized = normalizeAudioSlug(text);
  return "audio_" + (normalized || "audio");
};

export const getSafeAudioKey = (text) => {
  const normalized = normalizeAudioSlug(text);
  return normalized ? `tts_${normalized}` : "";
};

export const getLegacyAudioKey = (text) => {
  if (!text || typeof text !== "string") return "";
  const cleanText = text.replace(/[*_#`~]/g, "").trim();
  if (!cleanText) return "";
  return (
    "tts_" +
    cleanText
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9_]/gi, "_")
      .substring(0, 100)
  );
};

async function ensureAudioKeySet() {
  if (cachedAudioKeysSet) return cachedAudioKeysSet;
  if (!cachedAudioKeysPromise) {
    cachedAudioKeysPromise = audioStore
      .keys()
      .then((keys) => {
        cachedAudioKeysSet = new Set(keys);
        return cachedAudioKeysSet;
      })
      .catch(() => new Set())
      .finally(() => {
        cachedAudioKeysPromise = null;
      });
  }
  return cachedAudioKeysPromise;
}

export function markAudioKeyCached(key) {
  if (key && cachedAudioKeysSet) {
    cachedAudioKeysSet.add(key);
  }
}

function evictAudioKeyFromCache(key) {
  if (!key) return;
  if (cachedAudioKeysSet) cachedAudioKeysSet.delete(key);
  try {
    audioStore.removeItem(key).catch(() => {});
  } catch (_) {}
}

function revokeTrackedObjectUrl(url) {
  if (!url || typeof url !== "string" || !url.startsWith("blob:")) return;
  try {
    URL.revokeObjectURL(url);
  } catch (_) {}
  unregisterCleanStretchedUrl(url);
}

function revokeCurrentObjectUrl() {
  if (currentObjectUrl) {
    revokeTrackedObjectUrl(currentObjectUrl);
    currentObjectUrl = null;
  }
}

export function stopCurrentAudio() {
  latestPlaybackRequestId += 1;
  if (currentAudioInstance) {
    try {
      currentAudioInstance.onended = null;
      currentAudioInstance.onerror = null;
      currentAudioInstance.pause();
      currentAudioInstance.currentTime = 0;
      currentAudioInstance.removeAttribute("src");
      currentAudioInstance.load();
    } catch (_) {}
    currentAudioInstance = null;
  }
  revokeCurrentObjectUrl();
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  }
}

async function playAudioSource(
  source,
  {
    rate = 1.0,
    cleanText,
    lang = "de",
    isObjectUrl = false,
    cacheKeyToEvict = null,
    isStale = () => false,
    cleanupSignal = () => {},
    onEnd,
    onError
  } = {}
) {
  if (isStale()) {
    cleanupSignal();
    if (isObjectUrl) revokeTrackedObjectUrl(source);
    return;
  }

  const audio = new Audio(source);
  audio.playsInline = true;
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");
  audio.playbackRate = rate;
  audio.preservesPitch = true;
  audio.onloadedmetadata = () => {
    audio.playbackRate = rate;
    audio.preservesPitch = true;
  };

  currentAudioInstance = audio;
  if (isObjectUrl) {
    currentObjectUrl = source;
  }

  const cleanupPlayback = () => {
    cleanupSignal();
    audio.onended = null;
    audio.onerror = null;
    if (currentAudioInstance === audio) {
      currentAudioInstance = null;
    }
    if (isObjectUrl && currentObjectUrl === source) {
      revokeCurrentObjectUrl();
    } else if (isObjectUrl) {
      revokeTrackedObjectUrl(source);
    }
  };

  audio.onended = () => {
    const stale = isStale();
    cleanupPlayback();
    if (!stale && onEnd) onEnd();
  };

  audio.onerror = (e) => {
    const stale = isStale();
    cleanupPlayback();
    if (stale) return;
    if (cacheKeyToEvict) {
      evictAudioKeyFromCache(cacheKeyToEvict);
    }
    console.warn("[TTS Audio Playback Error] Fallback a nativo:", e);
    if (cleanText && lang !== "es") nativeSpeak(cleanText, { lang, rate });
    if (onError) onError(e);
    if (onEnd) onEnd();
  };

  try {
    if (isStale()) {
      cleanupPlayback();
      return;
    }
    await audio.play();
  } catch (err) {
    const stale = isStale();
    cleanupPlayback();
    if (stale) return;
    if (err?.name === "NotAllowedError" && cleanText) {
      console.warn("[TTS Autoplay Blocked (NotAllowedError)] Fallback a motor nativo:", err?.message || err);
      try {
        await nativeSpeak(cleanText, { lang, rate });
      } catch (_) {}
      if (!isStale()) {
        onError?.(err);
        onEnd?.();
      }
      return;
    }
    throw err;
  }
}

async function persistBlobUnderAudioKeys(blob, keys = []) {
  if (!(blob instanceof Blob)) return;
  const keySet = cachedAudioKeysSet;
  const missingKeys = Array.from(new Set(keys.filter(Boolean))).filter(
    (k) => !keySet || !keySet.has(k)
  );
  if (missingKeys.length === 0) return;

  await Promise.all(
    missingKeys.map((key) =>
      audioStore
        .setItem(key, blob)
        .then(() => markAudioKeyCached(key))
        .catch(() => {})
    )
  );
}

/**
 * Resuelve el binario Blob original (o la URL remota en fallback) siguiendo estrictamente
 * los 3 niveles de caché (audioStore -> Firestore -> Cloud Function synthesizeGermanSpeech).
 */
async function resolveAudioAsset(
  cleanText,
  { voice = "Charon", type = "vocab", lang = "de", signal = null, isStale = () => false } = {}
) {
  const sha256Id = await computeSha256AudioId(cleanText, voice);
  const cacheKey = getSafeAudioKey(cleanText);
  const safeAudioId = getSafeAudioId(cleanText);
  const legacyKey = getLegacyAudioKey(cleanText);
  const primaryCacheId = sha256Id || cacheKey || safeAudioId;

  const audioAlias =
    cacheKey && cacheKey.startsWith("tts_")
      ? `audio_${cacheKey.replace(/^tts_/, "")}`
      : "";
  const allLocalKeys = Array.from(
    new Set(
      [
        sha256Id,
        cacheKey,
        safeAudioId,
        audioAlias,
        legacyKey,
        cacheKey ? `${cacheKey}_` : "",
        `${safeAudioId}_`,
        legacyKey ? `${legacyKey}_` : ""
      ].filter(Boolean)
    )
  );

  // 1. Nivel 1: Revisar audioStore (IndexedDB local a 0 ms)
  try {
    const keySet = await ensureAudioKeySet();
    if (isStale()) return null;
    const matchedLocalKey = allLocalKeys.find((k) => keySet.has(k));
    if (matchedLocalKey) {
      const cached = await audioStore.getItem(matchedLocalKey);
      if (isStale()) return null;
      if (!cached) {
        keySet.delete(matchedLocalKey);
      } else if (cached instanceof Blob) {
        await persistBlobUnderAudioKeys(cached, [sha256Id, cacheKey, safeAudioId]);
        return { blob: cached, remoteUrl: null, cacheKey: primaryCacheId };
      } else if (
        typeof cached === "string" &&
        (cached.startsWith("http") || cached.startsWith("data:"))
      ) {
        try {
          const resp = await fetch(cached, signal ? { signal } : undefined);
          if (isStale()) return null;
          if (resp.ok) {
            const fetchedBlob = await resp.blob();
            await persistBlobUnderAudioKeys(fetchedBlob, [sha256Id, cacheKey, safeAudioId]);
            return { blob: fetchedBlob, remoteUrl: null, cacheKey: primaryCacheId };
          }
        } catch (_) {}
      }
    }
  } catch (_) {}

  if (isStale()) return null;

  // 2. Nivel 2: Consulta directa a Firestore CDN (por sha256Id, canonicalId y legacyId)
  let remoteAudioUrl = null;
  try {
    const db = getFirestore();
    if (db) {
      const candidateDocIds = Array.from(
        new Set([sha256Id, safeAudioId, `${safeAudioId}_`].filter(Boolean))
      );
      for (const docId of candidateDocIds) {
        const snap = await getDoc(doc(db, "global_audio_pronunciations", docId));
        if (isStale()) return null;
        if (snap.exists()) {
          const data = snap.data();
          if (
            data &&
            data.audioUrl &&
            !data.audioUrl.includes("gcf-v2-sources") &&
            !data.audioUrl.includes("gcf-v2-uploads")
          ) {
            remoteAudioUrl = data.audioUrl;
            break;
          }
        }
      }
    }
  } catch (firestoreErr) {
    console.warn("[TTS Firestore Direct Read] Fallback a Cloud Function:", firestoreErr.message);
  }

  if (isStale()) return null;

  // 3. Nivel 3: Invocar Cloud Function synthesizeGermanSpeech solo si no existe en Firestore
  if (!remoteAudioUrl) {
    const fns = appFunctions || getFunctions();
    const synthesizeFn = httpsCallable(fns, "synthesizeGermanSpeech");
    const response = await synthesizeFn({ text: cleanText, voice, type, lang });
    if (isStale()) return null;
    if (response.data && response.data.audioUrl) {
      remoteAudioUrl = response.data.audioUrl;
    }
  }

  if (!remoteAudioUrl) {
    throw new Error("No se recibió URL de audio desde Firestore ni Cloud Function.");
  }

  // Descargar Blob y persistir en audioStore bajo sha256Id y cacheKey para futuras reproducciones a 0 ms
  try {
    const resp = await fetch(remoteAudioUrl, signal ? { signal } : undefined);
    if (isStale()) return null;
    if (resp.ok) {
      const blob = await resp.blob();
      await persistBlobUnderAudioKeys(blob, [sha256Id, cacheKey, safeAudioId]);
      return { blob, remoteUrl: null, cacheKey: primaryCacheId };
    }
  } catch (_) {
    if (isStale()) return null;
  }

  return { blob: null, remoteUrl: remoteAudioUrl, cacheKey: primaryCacheId };
}

/**
 * Obtiene la URL de reproducción de audio aplicando el flujo obligatorio de 3 niveles para TODOS los audios
 * (vocabulario, oraciones, lecturas y cuentos de Tablas Maestras, sin excepción efímera):
 *   1. audioStore IndexedDB (por sha256Id, cacheKey o safeAudioId) -> 0 ms.
 *   2. Firestore global_audio_pronunciations (por sha256Id, canonicalId y legacyId) -> $0 créditos IA, guarda Blob en audioStore.
 *   3. Cloud Function synthesizeGermanSpeech -> persiste en Storage + Firestore y guarda Blob en audioStore.
 */
export async function getGermanSpeechUrl(text, options = {}) {
  const { voice = "Charon", type = "vocab", lang = "de" } = options;
  if (!text || typeof text !== "string") return null;
  const cleanText = normalizeCleanText(text);
  if (!cleanText) return null;

  const asset = await resolveAudioAsset(cleanText, { voice, type, lang });
  if (!asset) return null;
  if (asset.blob instanceof Blob) {
    return URL.createObjectURL(asset.blob);
  }
  return asset.remoteUrl;
}

/**
 * Entrega un ObjectURL limpio listo para reproductores con karaoke (Cuentos y Lectura):
 * - A velocidad 1.0x devuelve el Blob original sin modificar.
 * - A velocidad 0.75x procesa el Blob mediante el Phase Vocoder (sin WSOLA metálico) y guarda en caché LRU.
 */
export async function getProcessedSpeechBlobUrl(text, options = {}) {
  const { voice = "Charon", type = "vocab", lang = "de", speed, signal = null } = options;
  if (!text || typeof text !== "string") return null;
  const cleanText = normalizeCleanText(text);
  if (!cleanText) return null;

  const targetSpeed =
    speed !== undefined ? normalizePlaybackSpeed(speed) : getSavedPlaybackSpeed();

  const asset = await resolveAudioAsset(cleanText, { voice, type, lang, signal });
  if (!asset) return null;

  if (asset.blob instanceof Blob) {
    const result = await getCleanSpeedAudioResult(asset.blob, targetSpeed, asset.cacheKey);
    return result.url;
  }

  if (targetSpeed < 0.98 && asset.remoteUrl) {
    const result = await getCleanSpeedAudioResult(asset.remoteUrl, targetSpeed, asset.cacheKey);
    return result.url;
  }

  return asset.remoteUrl;
}

export async function playGermanAudio(text, options = {}) {
  const { onStart, onEnd, onError, voice = "Charon", type = "vocab", lang = "de", signal } = options;
  if (signal?.aborted) {
    return;
  }
  if (!text || typeof text !== "string") {
    onEnd?.();
    return;
  }

  const cleanText = normalizeCleanText(text);
  if (!cleanText) {
    onEnd?.();
    return;
  }

  const targetSpeed =
    options.speed !== undefined ? normalizePlaybackSpeed(options.speed) : getSavedPlaybackSpeed();

  unlockWebKitAudioContext();
  stopCurrentAudio();
  const requestId = latestPlaybackRequestId;

  const handleAbort = () => {
    if (requestId === latestPlaybackRequestId) {
      stopCurrentAudio();
    }
  };
  signal?.addEventListener("abort", handleAbort, { once: true });

  const isStale = () => requestId !== latestPlaybackRequestId || Boolean(signal?.aborted);
  const cleanupSignal = () => {
    signal?.removeEventListener("abort", handleAbort);
  };

  try {
    if (onStart && !isStale()) onStart();

    const asset = await resolveAudioAsset(cleanText, { voice, type, lang, signal, isStale });
    if (isStale()) {
      cleanupSignal();
      return;
    }
    if (!asset) {
      cleanupSignal();
      onError?.(new Error("No se pudo resolver el recurso de audio."));
      onEnd?.();
      return;
    }

    if (asset.blob instanceof Blob) {
      const processed = await getCleanSpeedAudioResult(asset.blob, targetSpeed, asset.cacheKey);
      if (isStale()) {
        revokeTrackedObjectUrl(processed.url);
        cleanupSignal();
        return;
      }

      await playAudioSource(processed.url, {
        rate: processed.playbackRate, // 1.0 si fue estirado por WSOLA, 0.75 solo en fallback antiguo
        cleanText,
        lang,
        isObjectUrl: processed.url.startsWith("blob:"),
        cacheKeyToEvict: asset.cacheKey,
        isStale,
        cleanupSignal,
        onEnd,
        onError
      });
      return;
    }

    if (asset.remoteUrl) {
      if (targetSpeed < 0.98) {
        const processed = await getCleanSpeedAudioResult(asset.remoteUrl, targetSpeed, asset.cacheKey);
        if (isStale()) {
          revokeTrackedObjectUrl(processed.url);
          cleanupSignal();
          return;
        }
        await playAudioSource(processed.url, {
          rate: processed.playbackRate,
          cleanText,
          lang,
          isObjectUrl: processed.url.startsWith("blob:"),
          isStale,
          cleanupSignal,
          onEnd,
          onError
        });
        return;
      }

      await playAudioSource(asset.remoteUrl, {
        rate: targetSpeed,
        cleanText,
        lang,
        isObjectUrl: false,
        isStale,
        cleanupSignal,
        onEnd,
        onError
      });
      return;
    }

    cleanupSignal();
    if (!isStale()) {
      if (lang !== "es") {
        await nativeSpeak(cleanText, { lang, rate: targetSpeed }).catch(() => {});
      }
      onError?.(new Error("Audio asset vacío."));
      onEnd?.();
    }
  } catch (error) {
    cleanupSignal();
    if (isStale()) return;
    console.warn("[TTS Pipeline Warning] Activando fallback a motor nativo:", error);
    try {
      if (error?.name === "NotAllowedError" || lang !== "es") {
        await nativeSpeak(cleanText, { lang, rate: targetSpeed });
      }
    } catch (_) {}
    if (!isStale()) {
      onError?.(error);
      onEnd?.();
    }
  }
}
