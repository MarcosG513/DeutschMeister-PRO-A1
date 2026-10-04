import localforage from "localforage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { nativeSpeak } from "../utils/helpers";
import { functions as appFunctions } from "../App";

const audioStore = localforage.createInstance({
  name: "DeutschMeisterAudioCache",
  storeName: "german_tts_cache"
});

let currentAudioInstance = null;

export const getSafeAudioKey = (text) => {
  return "tts_" + text
    .trim()
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

export async function playGermanAudio(text, options = {}) {
  const { onStart, onEnd, onError, voice = "Charon", type = "vocab" } = options;
  if (!text || typeof text !== "string") return;

  const cleanText = text.replace(/[*_#`~]/g, "").trim();
  if (!cleanText) return;

  stopCurrentAudio();
  const cacheKey = getSafeAudioKey(cleanText);
  const isStory = type === "story";

  try {
    if (onStart) onStart();

    // 1. Si no es cuento, buscar primero en IndexedDB (0 ms, offline)
    if (!isStory) {
      const cachedBlob = await audioStore.getItem(cacheKey);
      if (cachedBlob) {
        const localBlobUrl = URL.createObjectURL(cachedBlob);
        const localAudio = new Audio(localBlobUrl);
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

    // 2. Invocar Backend (Google Direct -> Fal -> Cloud Storage o Base64)
    const fns = appFunctions || getFunctions();
    const synthesizeFn = httpsCallable(fns, "synthesizeGermanSpeech");
    const response = await synthesizeFn({ text: cleanText, voice, type });

    if (!response.data || !response.data.audioUrl) {
      throw new Error("No se recibió URL o Data URI de audio.");
    }

    const audioSource = response.data.audioUrl;

    // 3. Reproducción
    const audio = new Audio(audioSource);
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

    // 4. Si es vocabulario, oración o lectura y no es Data URI, guardar en localforage en segundo plano
    if (!isStory && !audioSource.startsWith("data:")) {
      try {
        const audioFetch = await fetch(audioSource);
        if (audioFetch.ok) {
          const blob = await audioFetch.blob();
          await audioStore.setItem(cacheKey, blob);
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
