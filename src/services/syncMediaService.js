import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getApps, initializeApp } from "firebase/app";
import localforage from "localforage";
import { audioStore, getSafeAudioKey } from "./aiAudioService";
import { getSafeId } from "../utils/helpers";

// Almacén dedicado para Blobs de imágenes y videos offline
export const mediaBlobStore = localforage.createInstance({
  name: "DeutschMeisterMediaCache",
  storeName: "offline_visual_blobs"
});

/**
 * Obtiene la fecha y hora de la última sincronización de medios locales
 * @returns {Promise<string|null>}
 */
export async function getLastMediaSyncTime() {
  try {
    return await localforage.getItem("dm_last_media_sync");
  } catch (e) {
    console.warn("[SyncMediaService] Error leyendo dm_last_media_sync:", e);
    return null;
  }
}

/**
 * Ejecutor de tareas con concurrencia controlada para no saturar el WebView
 */
async function runWithConcurrency(items, concurrency, iteratorFn) {
  let index = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const currentIndex = index++;
      await iteratorFn(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
}

/**
 * Descarga y guarda en caché local (IndexedDB) todas las imágenes, videos y audios de la nube
 * @param {Function} onProgress - Callback({ phase, current, total, visualsSynced, audiosSynced, skippedCached, totalVisuals, totalAudios })
 */
export async function syncCloudMediaToLocal(onProgress) {
  try {
    let db;
    if (getApps().length > 0) {
      db = getFirestore();
    } else {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
      };
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    }

    // 1. Consultar catálogos en paralelo desde Firestore e inspeccionar llaves locales existentes
    if (onProgress) {
      onProgress({ phase: "fetching_catalog", current: 0, total: 100, visualsSynced: 0, audiosSynced: 0, skippedCached: 0 });
    }

    const [flashcardsSnap, audiosSnap, existingAudioKeys, existingVisualKeys] = await Promise.all([
      getDocs(collection(db, "global_flashcards")),
      getDocs(collection(db, "global_audio_pronunciations")),
      audioStore.keys(),
      mediaBlobStore.keys()
    ]);

    const existingAudioKeySet = new Set(existingAudioKeys);
    const existingVisualKeySet = new Set(existingVisualKeys);

    const visualDocs = flashcardsSnap.docs;
    const audioDocs = audiosSnap.docs;
    const totalItems = visualDocs.length + audioDocs.length;

    let processed = 0;
    let visualsSynced = 0;
    let audiosSynced = 0;
    let skippedCached = 0;

    const report = (phase) => {
      if (onProgress) {
        onProgress({
          phase,
          current: processed,
          total: totalItems,
          visualsSynced,
          audiosSynced,
          skippedCached,
          totalVisuals: visualDocs.length,
          totalAudios: audioDocs.length
        });
      }
    };

    // ── FASE 1: SINCRONIZAR IMÁGENES Y VIDEOS (global_flashcards) ──
    await runWithConcurrency(visualDocs, 8, async (docSnap) => {
      const data = docSnap.data();
      const safeId = docSnap.id;
      const mediaUrl = data.videoUrl || data.imageUrl || data.imageBase64;

      if (mediaUrl) {
        // Guardar siempre la referencia rápida de URL para fallback instantáneo
        await localforage.setItem(`img_${safeId}`, mediaUrl);

        // Mapeo exhaustivo para compatibilidad con safeId calculado y slugId
        if (data.wordDe) {
          const computedSafeId = getSafeId(data.wordDe).substring(0, 150);
          if (computedSafeId !== safeId) {
            await localforage.setItem(`img_${computedSafeId}`, mediaUrl);
          }
        }
        if (data.slugId && data.slugId !== safeId) {
          await localforage.setItem(`img_${data.slugId}`, mediaUrl);
        }
        if (data.safeId && data.safeId !== safeId) {
          await localforage.setItem(`img_${data.safeId}`, mediaUrl);
        }

        // Descargar el Blob binario solo si no existe ya en el teléfono
        const blobKey = `blob_${safeId}`;
        if (existingVisualKeySet.has(blobKey)) {
          skippedCached++;
          visualsSynced++;
        } else {
          try {
            const response = await fetch(mediaUrl, { mode: "cors" });
            if (response.ok) {
              const blob = await response.blob();
              await mediaBlobStore.setItem(blobKey, blob);
              if (data.slugId && data.slugId !== safeId) {
                await mediaBlobStore.setItem(`blob_${data.slugId}`, blob);
              }
              visualsSynced++;
            }
          } catch (err) {
            console.warn(`[Sync Visual Warning] No se pudo cachear binario para ${safeId}:`, err.message);
          }
        }
      }

      processed++;
      if (processed % 5 === 0 || processed === visualDocs.length) {
        report("syncing_visuals");
      }
    });

    // ── FASE 2: SINCRONIZAR AUDIOS CHARON (global_audio_pronunciations) ──
    await runWithConcurrency(audioDocs, 8, async (docSnap) => {
      const data = docSnap.data();
      const audioUrl = data.audioUrl;
      const text = data.text || "";
      const docId = docSnap.id; // ej. audio_...
      const primaryKey = text ? getSafeAudioKey(text) : `tts_${docId.replace(/^audio_/, "")}`;

      if (audioUrl && primaryKey) {
        const alreadyHasBlob = existingAudioKeySet.has(primaryKey) || existingAudioKeySet.has(docId);

        if (alreadyHasBlob) {
          skippedCached++;
          audiosSynced++;
        } else {
          try {
            const response = await fetch(audioUrl, { mode: "cors" });
            if (response.ok) {
              const audioBlob = await response.blob();
              // Guardar Blob bajo la clave normalizada de texto y bajo el docId canónico
              await audioStore.setItem(primaryKey, audioBlob);
              if (docId && docId !== primaryKey) {
                await audioStore.setItem(docId, audioBlob);
              }
              audiosSynced++;
            }
          } catch (err) {
            console.warn(`[Sync Audio Warning] No se pudo descargar audio ${primaryKey}:`, err.message);
          }
        }
      }

      processed++;
      if (processed % 10 === 0 || processed === totalItems) {
        report("syncing_audios");
      }
    });

    const lastSyncTime = new Date().toISOString();
    await localforage.setItem("dm_last_media_sync", lastSyncTime);
    await localforage.setItem("dm_offline_stats", {
      visualsSynced,
      audiosSynced,
      totalItems,
      lastSyncTime
    });

    return {
      success: true,
      syncedCount: visualsSynced + audiosSynced,
      visualsSynced,
      audiosSynced,
      skippedCached,
      total: totalItems,
      lastSyncTime
    };
  } catch (error) {
    console.error("[SyncMediaService Error]:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Retorna las estadísticas del almacenamiento local de medios y audios
 */
export async function getOfflineSyncStats() {
  try {
    const [lastSyncTime, stats, audioKeys, visualKeys] = await Promise.all([
      localforage.getItem("dm_last_media_sync"),
      localforage.getItem("dm_offline_stats"),
      audioStore.keys(),
      mediaBlobStore.keys()
    ]);

    // Contar claves únicas tts_ para no duplicar con alias audio_
    const uniqueAudios = audioKeys.filter((k) => k.startsWith("tts_")).length || Math.floor(audioKeys.length / 2);

    return {
      lastSyncTime,
      visualsCached: visualKeys.length,
      audiosCached: uniqueAudios,
      ...(stats || {})
    };
  } catch (e) {
    console.warn("[getOfflineSyncStats Error]:", e);
    return {
      lastSyncTime: null,
      visualsCached: 0,
      audiosCached: 0
    };
  }
}
