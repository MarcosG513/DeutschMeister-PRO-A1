import localforage from "localforage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { nativeSpeak } from "../utils/helpers";
import { functions as appFunctions } from "../App";

// Almacén exclusivo de audio en IndexedDB
const audioStore = localforage.createInstance({
  name: "DeutschMeisterAudioCache",
  storeName: "german_tts_cache"
});

let currentAudioInstance = null;

export const getSafeAudioKey = (text) => {
  return "tts_" + text
    .trim()
    .toLowerCase()
    .normalize("NFC")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]/gi, "_")
    .substring(0, 100);
};

/**
 * Detiene cualquier audio en reproducción activa
 */
export function stopCurrentAudio() {
  if (currentAudioInstance) {
    try {
      currentAudioInstance.pause();
      currentAudioInstance.currentTime = 0;
    } catch (e) {
      console.warn("Error al pausar audio activo:", e);
    }
    currentAudioInstance = null;
  }
}

/**
 * Reproduce audio en alemán con estrategia Cache-First de 3 niveles:
 * 1. IndexedDB localforage (0 ms, offline, $0)
 * 2. Firestore + Firebase Cloud Storage ($0 IA)
 * 3. Gemini 3.8 Flash TTS (Inferencia y persistencia)
 * Fallback de Resiliencia: nativeSpeak()
 */
export async function playGermanAudio(text, options = {}) {
  const { onStart, onEnd, onError, voice = "Charon", type = "vocab" } = options;

  if (!text || typeof text !== "string") return;
  const cleanText = text.replace(/[*_#`~]/g, "").trim();
  if (!cleanText) return;

  stopCurrentAudio();

  const cacheKey = getSafeAudioKey(cleanText);

  try {
    if (onStart) onStart();

    // ── NIVEL 1: Memoria local en IndexedDB (0 ms, offline, $0) ──
    let audioBlob = await audioStore.getItem(cacheKey);

    if (!audioBlob) {
      // ── NIVEL 2 y 3: Consulta al Backend (Firestore o Inferencia TTS) ──
      const fns = appFunctions || getFunctions();
      const synthesizeFn = httpsCallable(fns, "synthesizeGermanSpeech");
      const response = await synthesizeFn({ text: cleanText, voice, type });

      if (response.data && response.data.audioUrl) {
        const remoteAudioUrl = response.data.audioUrl;

        try {
          // Intento de descarga para almacenamiento en IndexedDB (Nivel 1)
          const audioFetch = await fetch(remoteAudioUrl);
          if (audioFetch.ok) {
            audioBlob = await audioFetch.blob();
            await audioStore.setItem(cacheKey, audioBlob);
          } else {
            throw new Error(`Fetch failed: HTTP ${audioFetch.status}`);
          }
        } catch (fetchError) {
          console.warn("[TTS CORS/Network Warning] No se pudo guardar en caché local. Reproduciendo directamente desde URL remota:", fetchError);
          try { await audioStore.removeItem(cacheKey); } catch (_) {}

          // RESILIENCIA: Reproducir directamente desde la URL remota sin requerir Blob ni CORS estricto
          const directAudio = new Audio(remoteAudioUrl);
          currentAudioInstance = directAudio;

          directAudio.onended = () => {
            if (currentAudioInstance === directAudio) {
              currentAudioInstance = null;
            }
            if (onEnd) onEnd();
          };

          directAudio.onerror = (audioErr) => {
            console.warn("[TTS Remote Playback Error] Falló reproducción remota, usando motor nativo:", audioErr);
            if (currentAudioInstance === directAudio) {
              currentAudioInstance = null;
            }
            nativeSpeak(cleanText);
            if (onError) onError(audioErr);
            if (onEnd) onEnd();
          };

          await directAudio.play();
          return; // Salir con éxito de la función
        }
      } else {
        throw new Error("Respuesta inválida del endpoint de síntesis");
      }
    }

    // Reproducción mediante HTML5 Audio a partir del Blob local
    const blobUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(blobUrl);
    currentAudioInstance = audio;

    audio.onended = () => {
      URL.revokeObjectURL(blobUrl);
      if (currentAudioInstance === audio) {
        currentAudioInstance = null;
      }
      if (onEnd) onEnd();
    };

    audio.onerror = async (e) => {
      URL.revokeObjectURL(blobUrl);
      if (currentAudioInstance === audio) {
        currentAudioInstance = null;
      }
      try { await audioStore.removeItem(cacheKey); } catch (_) {}
      console.warn("[TTS Playback Error] Fallo al reproducir Blob, activando fallback nativo:", e);
      nativeSpeak(cleanText);
      if (onEnd) onEnd();
    };

    await audio.play();
  } catch (error) {
    try { await audioStore.removeItem(cacheKey); } catch (_) {}
    console.warn("[TTS Pipeline Warning] Activando fallback a motor nativo:", error);
    nativeSpeak(cleanText);
    if (onError) onError(error);
    if (onEnd) onEnd();
  }
}
