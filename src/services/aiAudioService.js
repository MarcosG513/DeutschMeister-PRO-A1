import localforage from "localforage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { nativeSpeak } from "../utils/helpers";
import { functions as appFunctions } from "../App";

export const audioStore = localforage.createInstance({
  name: "DeutschMeisterAudioCache",
  storeName: "german_tts_cache"
});

let currentAudioInstance = null;

export const getSafeAudioId = (text) => {
  if (!text || typeof text !== "string") return "audio_unknown";
  const normalized = text
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, " ")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^_+|_+$/g, "")
    .substring(0, 120);
  return "audio_" + (normalized || "audio");
};

export const getSafeAudioKey = (text) => {
  if (!text || typeof text !== "string") return "";
  const cleanText = text.replace(/[*_#`~]/g, "").trim();
  return "tts_" + cleanText
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9_]/gi, "_")
    .substring(0, 100);
};

export function stopCurrentAudio() {
  if (currentAudioInstance) {
    try {
      currentAudioInstance.pause();
      currentAudioInstance.currentTime = 0;
    } catch (_) {}
    currentAudioInstance = null;
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
  const cacheKey = getSafeAudioKey(cleanText);
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

    // 1. Nivel 1 (100% Offline, 0 ms): Busca primero el Blob en audioStore
    if (!isEphemeral) {
      let cachedItem = await audioStore.getItem(cacheKey);
      if (!cachedItem) {
        const audioAlias = cacheKey.startsWith("tts_") ? `audio_${cacheKey.replace(/^tts_/, "")}` : `audio_${cacheKey}`;
        cachedItem = await audioStore.getItem(audioAlias);
      }
      if (!cachedItem) {
        cachedItem = await audioStore.getItem(getSafeAudioId(cleanText));
      }
      if (!cachedItem) {
        cachedItem = await audioStore.getItem(`${cacheKey}_`);
      }

      if (cachedItem) {
        let blobToPlay = null;

        // Si es un Blob binario local
        if (cachedItem instanceof Blob) {
          blobToPlay = cachedItem;
        } else if (typeof cachedItem === "string" && (cachedItem.startsWith("http") || cachedItem.startsWith("data:"))) {
          // Si es un string URL/Data, intentar descargarlo a Blob para uso offline permanente
          try {
            const resp = await fetch(cachedItem);
            if (resp.ok) {
              blobToPlay = await resp.blob();
              await audioStore.setItem(cacheKey, blobToPlay);
            }
          } catch (_) {
            if (cachedItem.startsWith("data:")) {
              const dataAudio = new Audio(cachedItem);
              dataAudio.playbackRate = configuredRate;
              dataAudio.preservesPitch = true;
              currentAudioInstance = dataAudio;
              dataAudio.onended = () => { if (currentAudioInstance === dataAudio) currentAudioInstance = null; if (onEnd) onEnd(); };
              dataAudio.onerror = () => { if (currentAudioInstance === dataAudio) currentAudioInstance = null; nativeSpeak(cleanText); if (onEnd) onEnd(); };
              await dataAudio.play();
              return;
            }
          }
        }

        if (blobToPlay instanceof Blob) {
          const localBlobUrl = URL.createObjectURL(blobToPlay);
          const localAudio = new Audio(localBlobUrl);
          localAudio.playbackRate = configuredRate;
          localAudio.preservesPitch = true;
          localAudio.onloadedmetadata = () => {
            localAudio.playbackRate = configuredRate;
            localAudio.preservesPitch = true;
          };
          currentAudioInstance = localAudio;
          localAudio.onended = () => {
            URL.revokeObjectURL(localBlobUrl);
            if (currentAudioInstance === localAudio) currentAudioInstance = null;
            if (onEnd) onEnd();
          };
          localAudio.onerror = () => {
            URL.revokeObjectURL(localBlobUrl);
            if (currentAudioInstance === localAudio) currentAudioInstance = null;
            try { audioStore.removeItem(cacheKey); } catch (_) {}
            nativeSpeak(cleanText);
            if (onEnd) onEnd();
          };
          await localAudio.play();
          return;
        }
      }
    }

    // 2. Invocar Backend (Google Direct -> Fal -> Cloud Storage o Base64) - Voz oficial Charon
    const audioSource = await getGermanSpeechUrl(cleanText, { voice: "Charon", type });

    // 3. Reproducción respetando dm_audio_speed configurado por el usuario
    const audio = new Audio(audioSource);
    audio.playbackRate = configuredRate;
    audio.preservesPitch = true;
    audio.onloadedmetadata = () => {
      audio.playbackRate = configuredRate;
      audio.preservesPitch = true;
    };
    currentAudioInstance = audio;

    audio.onended = () => {
      if (currentAudioInstance === audio) currentAudioInstance = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      if (currentAudioInstance === audio) currentAudioInstance = null;
      console.warn("[TTS Audio Playback Error] Fallback a nativo:", e);
      nativeSpeak(cleanText);
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    await audio.play();

    // 4. Si es vocabulario u oración persistente y no es Data URI, guardar en audioStore
    if (!isEphemeral && !audioSource.startsWith("data:")) {
      try {
        const audioFetch = await fetch(audioSource);
        if (audioFetch.ok) {
          const blob = await audioFetch.blob();
          await audioStore.setItem(cacheKey, blob);
          const safeAudioId = getSafeAudioId(cleanText);
          if (safeAudioId && safeAudioId !== cacheKey) {
            await audioStore.setItem(safeAudioId, blob);
          }
        }
      } catch (cacheErr) {
        console.warn("[TTS Cache Warning] No se pudo persistir en IndexedDB:", cacheErr);
      }
    }
  } catch (error) {
    console.warn("[TTS Pipeline Warning] Activando fallback a motor nativo:", error);
    nativeSpeak(cleanText);
    if (onError) onError(error);
    if (onEnd) onEnd();
  }
}
