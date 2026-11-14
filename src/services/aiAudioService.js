import localforage from "localforage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { nativeSpeak } from "../utils/helpers";
import { functions as appFunctions } from "../config/firebase";

export const audioStore = localforage.createInstance({
  name: "DeutschMeisterAudioCache",
  storeName: "german_tts_cache"
});

let currentAudioInstance = null;
let currentObjectUrl = null;
let latestPlaybackRequestId = 0;
let cachedAudioKeysPromise = null;
let cachedAudioKeysSet = null;

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

function revokeCurrentObjectUrl() {
  if (currentObjectUrl) {
    try {
      URL.revokeObjectURL(currentObjectUrl);
    } catch (_) {}
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
      currentAudioInstance.src = "";
    } catch (_) {}
    currentAudioInstance = null;
  }
  revokeCurrentObjectUrl();
}

async function playAudioSource(source, { rate = 1.0, cleanText, isObjectUrl = false, cacheKeyToEvict = null, onEnd, onError } = {}) {
  const audio = new Audio(source);
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
    audio.onended = null;
    audio.onerror = null;
    if (currentAudioInstance === audio) {
      currentAudioInstance = null;
    }
    if (isObjectUrl && currentObjectUrl === source) {
      revokeCurrentObjectUrl();
    } else if (isObjectUrl) {
      try {
        URL.revokeObjectURL(source);
      } catch (_) {}
    }
  };

  audio.onended = () => {
    cleanupPlayback();
    if (onEnd) onEnd();
  };

  audio.onerror = (e) => {
    cleanupPlayback();
    if (cacheKeyToEvict) {
      evictAudioKeyFromCache(cacheKeyToEvict);
    }
    console.warn("[TTS Audio Playback Error] Fallback a nativo:", e);
    if (cleanText) nativeSpeak(cleanText);
    if (onError) onError(e);
    if (onEnd) onEnd();
  };

  try {
    await audio.play();
  } catch (err) {
    cleanupPlayback();
    throw err;
  }
}

/**
 * Obtiene la URL de audio (Data URI o Storage) desde el backend para caching en memoria.
 * Optimizado con lectura directa a Firestore CDN para respuestas ultrarrápidas (<80ms).
 */
export async function getGermanSpeechUrl(text, options = {}) {
  const { voice = "Charon", type = "vocab" } = options;
  if (!text || typeof text !== "string") return null;
  const cleanText = text.replace(/[*_#`~]/g, "").replace(/\s+/g, " ").trim();
  if (!cleanText) return null;

  // Consulta directa a Firestore CDN antes de Cloud Function (ahorro de invocaciones y latencia <80ms)
  if (type !== "story" && type !== "reading") {
    try {
      const db = getFirestore();
      if (db) {
        const audioId = getSafeAudioId(cleanText);
        const docRef = doc(db, "global_audio_pronunciations", audioId);
        let docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const legacyDocRef = doc(db, "global_audio_pronunciations", `${audioId}_`);
          const legacySnap = await getDoc(legacyDocRef);
          if (legacySnap.exists()) {
            docSnap = legacySnap;
          }
        }

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.audioUrl && !data.audioUrl.includes("gcf-v2-sources") && !data.audioUrl.includes("gcf-v2-uploads")) {
            return data.audioUrl;
          }
        }
      }
    } catch (firestoreErr) {
      console.warn("[TTS Firestore Direct Read] Fallback a Cloud Function:", firestoreErr.message);
    }
  }

  const fns = appFunctions || getFunctions();
  const synthesizeFn = httpsCallable(fns, "synthesizeGermanSpeech");
  const response = await synthesizeFn({ text: cleanText, voice, type });

  if (response.data && response.data.audioUrl) {
    return response.data.audioUrl;
  }
  throw new Error("No se recibió URL o Data URI de audio.");
}

export async function playGermanAudio(text, options = {}) {
  const { onStart, onEnd, onError, voice = "Charon", type = "vocab" } = options;
  if (!text || typeof text !== "string") return;

  const cleanText = text.replace(/[*_#`~]/g, "").replace(/\s+/g, " ").trim();
  if (!cleanText) return;

  stopCurrentAudio();
  const requestId = latestPlaybackRequestId;
  const cacheKey = getSafeAudioKey(cleanText);
  const safeAudioId = getSafeAudioId(cleanText);
  const legacyKey = getLegacyAudioKey(cleanText);
  const isEphemeral = type === "story" || type === "reading";

  try {
    if (onStart) onStart();

    const configuredRate = (() => {
      try {
        const stored = typeof localStorage !== "undefined" ? Number(localStorage.getItem("dm_audio_speed")) : null;
        return stored || options.rate || 1.0;
      } catch (_) {
        return options.rate || 1.0;
      }
    })();

    // 1. Nivel 1 (100% Offline, 0 ms): Busca el Blob en audioStore usando índice de claves en memoria
    if (!isEphemeral) {
      const keySet = await ensureAudioKeySet();
      if (requestId !== latestPlaybackRequestId) return;

      const candidateKeys = Array.from(
        new Set([
          cacheKey,
          safeAudioId,
          legacyKey,
          `${safeAudioId}_`,
          legacyKey ? `${legacyKey}_` : "",
        ].filter(Boolean))
      );

      const matchedKey = candidateKeys.find((k) => keySet.has(k));
      if (matchedKey) {
        const cachedItem = await audioStore.getItem(matchedKey);
        if (requestId !== latestPlaybackRequestId) return;

        if (!cachedItem) {
          keySet.delete(matchedKey);
        } else if (cachedItem instanceof Blob) {
          const localBlobUrl = URL.createObjectURL(cachedItem);
          await playAudioSource(localBlobUrl, {
            rate: configuredRate,
            cleanText,
            isObjectUrl: true,
            cacheKeyToEvict: matchedKey,
            onEnd,
            onError,
          });
          return;
        } else if (typeof cachedItem === "string" && (cachedItem.startsWith("http") || cachedItem.startsWith("data:"))) {
          try {
            const resp = await fetch(cachedItem);
            if (requestId !== latestPlaybackRequestId) return;
            if (resp.ok) {
              const fetchedBlob = await resp.blob();
              if (requestId !== latestPlaybackRequestId) return;
              if (cacheKey) {
                await audioStore.setItem(cacheKey, fetchedBlob);
                markAudioKeyCached(cacheKey);
              }
              const localBlobUrl = URL.createObjectURL(fetchedBlob);
              await playAudioSource(localBlobUrl, {
                rate: configuredRate,
                cleanText,
                isObjectUrl: true,
                cacheKeyToEvict: cacheKey || matchedKey,
                onEnd,
                onError,
              });
              return;
            }
          } catch (_) {
            if (cachedItem.startsWith("data:")) {
              await playAudioSource(cachedItem, {
                rate: configuredRate,
                cleanText,
                isObjectUrl: false,
                onEnd,
                onError,
              });
              return;
            }
          }
        }
      }
    }

    // 2. Invocar Backend (Firestore CDN -> Google Direct -> Fal -> Cloud Storage / Base64)
    const audioSource = await getGermanSpeechUrl(cleanText, { voice, type });
    if (requestId !== latestPlaybackRequestId) return;

    // 3. Reproducción única sin doble descarga HTTP
    if (audioSource.startsWith("data:")) {
      await playAudioSource(audioSource, {
        rate: configuredRate,
        cleanText,
        isObjectUrl: false,
        onEnd,
        onError,
      });
      return;
    }

    try {
      const audioFetch = await fetch(audioSource);
      if (requestId !== latestPlaybackRequestId) return;
      if (audioFetch.ok) {
        const blob = await audioFetch.blob();
        if (requestId !== latestPlaybackRequestId) return;

        if (!isEphemeral && cacheKey) {
          audioStore
            .setItem(cacheKey, blob)
            .then(() => markAudioKeyCached(cacheKey))
            .catch((cacheErr) => {
              console.warn("[TTS Cache Warning] No se pudo persistir en IndexedDB:", cacheErr);
            });
        }

        const localBlobUrl = URL.createObjectURL(blob);
        await playAudioSource(localBlobUrl, {
          rate: configuredRate,
          cleanText,
          isObjectUrl: true,
          cacheKeyToEvict: cacheKey,
          onEnd,
          onError,
        });
        return;
      }
    } catch (fetchErr) {
      console.warn("[TTS Fetch Warning] Reproduciendo stream directo:", fetchErr?.message || fetchErr);
    }

    if (requestId !== latestPlaybackRequestId) return;
    await playAudioSource(audioSource, {
      rate: configuredRate,
      cleanText,
      isObjectUrl: false,
      onEnd,
      onError,
    });
  } catch (error) {
    if (requestId !== latestPlaybackRequestId) return;
    console.warn("[TTS Pipeline Warning] Activando fallback a motor nativo:", error);
    nativeSpeak(cleanText);
    if (onError) onError(error);
    if (onEnd) onEnd();
  }
}
