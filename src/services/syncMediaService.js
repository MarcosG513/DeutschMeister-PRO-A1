import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getApps, initializeApp } from "firebase/app";
import localforage from "localforage";
import {
  audioStore,
  audioAliasStore,
  computeSha256AudioId,
  getSafeAudioId,
  getSafeAudioKey,
  getLegacyAudioKey,
  markAudioKeyCached,
  markAudioAliasCached,
  persistAudioBlobWithAliases,
  precacheAudioFromText
} from "./aiAudioService";
import { getSafeId } from "../utils/helpers";

export const CHAPTER_STORIES_CACHE_KEY = "dm_chapter_stories_cache";

// Almacén dedicado para Blobs de imágenes y videos offline
export const mediaBlobStore = localforage.createInstance({
  name: "DeutschMeisterMediaCache",
  storeName: "offline_visual_blobs"
});

// Almacenes locales para packs offline de Micro-Pódcasts y Diálogos Estructurados
export const podcastPackStore = localforage.createInstance({
  name: "DeutschMeisterContentPacks",
  storeName: "podcast_packs"
});

export const phrasePackStore = localforage.createInstance({
  name: "DeutschMeisterContentPacks",
  storeName: "phrase_packs"
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
      const rawProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      const rawAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain:
          rawAuthDomain && !rawAuthDomain.endsWith(".web.app")
            ? rawAuthDomain
            : rawProjectId
              ? `${rawProjectId}.firebaseapp.com`
              : "deutschmeister-pro.firebaseapp.com",
        projectId: rawProjectId,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
      };
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    }

    // 1. Consultar catálogos en paralelo desde Firestore e inspeccionar llaves locales existentes
    if (onProgress) {
      onProgress({
        phase: "fetching_catalog",
        current: 0,
        total: 100,
        visualsSynced: 0,
        audiosSynced: 0,
        storiesSynced: 0,
        skippedCached: 0
      });
    }

    const [
      flashcardsSnap,
      audiosSnap,
      chapterStoriesSnap,
      existingAudioKeys,
      existingAliasKeys,
      existingVisualKeys
    ] = await Promise.all([
      getDocs(collection(db, "global_flashcards")),
      getDocs(collection(db, "global_audio_pronunciations")),
      getDocs(collection(db, "global_chapter_stories")).catch(() => ({ docs: [] })),
      audioStore.keys(),
      audioAliasStore.keys().catch(() => []),
      mediaBlobStore.keys()
    ]);

    const existingAudioKeySet = new Set(existingAudioKeys);
    const existingAliasKeySet = new Set(existingAliasKeys);
    const existingVisualKeySet = new Set(existingVisualKeys);

    const visualDocs = flashcardsSnap.docs;
    const audioDocs = audiosSnap.docs;
    const chapterStoryDocs = chapterStoriesSnap.docs || [];
    const totalItems = visualDocs.length + audioDocs.length + chapterStoryDocs.length;

    let processed = 0;
    let visualsSynced = 0;
    let audiosSynced = 0;
    let storiesSynced = 0;
    let skippedCached = 0;

    const report = (phase) => {
      if (onProgress) {
        onProgress({
          phase,
          current: processed,
          total: totalItems,
          visualsSynced,
          audiosSynced,
          storiesSynced,
          skippedCached,
          totalVisuals: visualDocs.length,
          totalAudios: audioDocs.length,
          totalStories: chapterStoryDocs.length
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

    // ── FASE 2: SINCRONIZAR AUDIOS CHARON Y DE CUENTOS/LECTURAS (global_audio_pronunciations) ──
    await runWithConcurrency(audioDocs, 8, async (docSnap) => {
      const data = docSnap.data();
      const audioUrl = data.audioUrl;
      const text = data.text || "";
      const voice = data.voice || "Charon";
      const docId = docSnap.id; // ej. audio_sha256_... o audio_...
      const sha256Id =
        data.sha256Id ||
        (docId.startsWith("audio_sha256_") ? docId : text ? await computeSha256AudioId(text, voice) : "");
      const primaryKey = text ? getSafeAudioKey(text) : `tts_${docId.replace(/^audio_/, "")}`;
      const canonicalAudioId = data.canonicalId || (text ? getSafeAudioId(text) : docId);
      const legacyKey = text ? getLegacyAudioKey(text) : "";

      const canonicalBlobKey = sha256Id || docId || primaryKey;
      const indexKeys = Array.from(
        new Set([docId, primaryKey, sha256Id, canonicalAudioId, legacyKey].filter(Boolean))
      );

      if (audioUrl && canonicalBlobKey && indexKeys.length > 0) {
        const existingDirectKey = indexKeys.find((k) => existingAudioKeySet.has(k)) || "";
        const existingAliasKey = !existingDirectKey
          ? indexKeys.find((k) => existingAliasKeySet.has(k)) || ""
          : "";

        const hasCanonicalBlob = existingAudioKeySet.has(canonicalBlobKey);
        const hasAllAliases = indexKeys.every(
          (k) => k === canonicalBlobKey || existingAliasKeySet.has(k) || existingAudioKeySet.has(k)
        );

        if (hasCanonicalBlob && hasAllAliases) {
          skippedCached++;
          audiosSynced++;
        } else {
          let promotedFromLocal = false;
          let resolvedLocalBlobKey = existingDirectKey;

          if (!resolvedLocalBlobKey && existingAliasKey) {
            try {
              const targetKey = await audioAliasStore.getItem(existingAliasKey);
              if (typeof targetKey === "string" && existingAudioKeySet.has(targetKey)) {
                resolvedLocalBlobKey = targetKey;
              }
            } catch {
              // Ignorar alias corrupto
            }
          }

          if (resolvedLocalBlobKey) {
            try {
              const localBlob = await audioStore.getItem(resolvedLocalBlobKey);
              if (localBlob instanceof Blob) {
                await persistAudioBlobWithAliases(localBlob, canonicalBlobKey, indexKeys);
                existingAudioKeySet.add(canonicalBlobKey);
                markAudioKeyCached(canonicalBlobKey);
                for (const k of indexKeys) {
                  if (k !== canonicalBlobKey) {
                    existingAliasKeySet.add(k);
                    markAudioAliasCached(k);
                  }
                }
                promotedFromLocal = true;
                skippedCached++;
                audiosSynced++;
              }
            } catch {
              // Continuar hacia descarga remota si falla lectura local
            }
          }

          if (!promotedFromLocal) {
            try {
              const response = await fetch(audioUrl, { mode: "cors" });
              if (response.ok) {
                const audioBlob = await response.blob();
                // Deduplicación estricta: 1 Blob en audioStore + alias ligeros en audioAliasStore
                await persistAudioBlobWithAliases(audioBlob, canonicalBlobKey, indexKeys);
                existingAudioKeySet.add(canonicalBlobKey);
                markAudioKeyCached(canonicalBlobKey);
                for (const k of indexKeys) {
                  if (k !== canonicalBlobKey) {
                    existingAliasKeySet.add(k);
                    markAudioAliasCached(k);
                  }
                }
                audiosSynced++;
              }
            } catch (err) {
              console.warn(`[Sync Audio Warning] No se pudo descargar audio ${docId}:`, err.message);
            }
          }
        }
      }

      processed++;
      if (processed % 10 === 0 || processed === visualDocs.length + audioDocs.length) {
        report("syncing_audios");
      }
    });

    // ── FASE 3: SINCRONIZAR CUENTOS POR CAPÍTULO (global_chapter_stories -> dm_chapter_stories_cache) ──
    const existingChapterStoriesCache = (await localforage.getItem(CHAPTER_STORIES_CACHE_KEY)) || {};
    const byChapter = { ...(existingChapterStoriesCache.byChapter || {}) };
    const byId = { ...(existingChapterStoriesCache.byId || {}) };

    for (const storySnap of chapterStoryDocs) {
      const sData = storySnap.data();
      if (sData) {
        const chapterKey = String(sData.chapterId ?? sData.chapterKey ?? "").trim();
        const normalizedStory = {
          id: storySnap.id,
          ...sData,
          storyIndex: Number(sData.storyIndex) || 1
        };
        byId[storySnap.id] = normalizedStory;
        if (chapterKey) {
          const prevList = Array.isArray(byChapter[chapterKey]) ? byChapter[chapterKey] : [];
          const filtered = prevList.filter(
            (item) => item.id !== storySnap.id && Number(item.storyIndex) !== normalizedStory.storyIndex
          );
          byChapter[chapterKey] = [...filtered, normalizedStory].sort(
            (a, b) => (Number(a.storyIndex) || 0) - (Number(b.storyIndex) || 0)
          );
        }
        storiesSynced++;
      }
      processed++;
    }

    const updatedStoriesCache = {
      ...byChapter,
      byChapter,
      byId,
      totalStories: Object.keys(byId).length,
      updatedAt: new Date().toISOString()
    };
    await localforage.setItem(CHAPTER_STORIES_CACHE_KEY, updatedStoriesCache);
    if (chapterStoryDocs.length > 0) {
      report("syncing_stories");
    }

    const lastSyncTime = new Date().toISOString();
    await localforage.setItem("dm_last_media_sync", lastSyncTime);
    await localforage.setItem("dm_offline_stats", {
      visualsSynced,
      audiosSynced,
      storiesSynced: Object.keys(byId).length,
      totalItems,
      lastSyncTime
    });

    return {
      success: true,
      syncedCount: visualsSynced + audiosSynced + storiesSynced,
      visualsSynced,
      audiosSynced,
      storiesSynced: Object.keys(byId).length,
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
 * Descarga/cachea localmente un episodio de Micro-Pódcast en IndexedDB
 * (audioStore deduplicado + audioAliasStore + podcastPackStore), sin contaminar
 * global_audio_pronunciations con turnos efímeros.
 */
export async function syncPodcastEpisodeOffline(episode, onProgress) {
  if (!episode || !episode.id) {
    return { success: false, episodeId: "", syncedLines: 0, totalLines: 0 };
  }

  const segments = Array.isArray(episode.segments) ? episode.segments : [];
  const fullEpisodeText =
    episode.fullAudioText ||
    segments
      .map((seg) => seg?.de)
      .filter(Boolean)
      .join(" ");
  const targetTexts = Array.from(
    new Set(
      [
        fullEpisodeText,
        ...segments.map((seg) => seg?.de).filter(Boolean)
      ].filter(Boolean)
    )
  );

  let syncedLines = 0;
  let blobsCached = 0;
  const cacheKeys = [];

  for (let i = 0; i < targetTexts.length; i++) {
    const textDe = targetTexts[i];
    const directAudioUrl =
      textDe === fullEpisodeText ? episode.audioUrl || null : null;
    try {
      const res = await precacheAudioFromText(textDe, {
        voice: "Charon",
        type: "story",
        lang: "de",
        directAudioUrl
      });
      if (res?.ok) {
        syncedLines++;
        if (res.blobAvailable) blobsCached++;
        if (res.cacheKey) cacheKeys.push(res.cacheKey);
      }
    } catch {
      // Continuar con el siguiente segmento si alguno falla en red débil
    }
    onProgress?.({
      episodeId: episode.id,
      current: i + 1,
      total: targetTexts.length,
      syncedLines,
      blobsCached
    });
  }

  const packMetadata = {
    id: episode.id,
    titleDe: episode.titleDe || episode.title || "",
    axis: episode.axis || "survival",
    totalLines: targetTexts.length,
    syncedLines,
    blobsCached,
    cacheKeys,
    cachedAt: new Date().toISOString()
  };

  if (syncedLines > 0) {
    await podcastPackStore.setItem(episode.id, packMetadata).catch(() => {});
  }

  return {
    success: syncedLines > 0,
    ...packMetadata
  };
}

export async function isPodcastEpisodeCachedOffline(episodeId) {
  if (!episodeId) return false;
  try {
    const entry = await podcastPackStore.getItem(episodeId);
    return Boolean(entry && entry.syncedLines > 0);
  } catch {
    return false;
  }
}

/**
 * Descarga/cachea localmente un bloque de Frase / Diálogo Estructurado en IndexedDB
 * (phrasePackStore + audioStore + audioAliasStore), filtrando solo líneas curadas del tutor/sistema.
 */
export async function syncDialoguePackOffline(dialogue, onProgress) {
  if (!dialogue || !dialogue.id) {
    return { success: false, dialogueId: "", syncedLines: 0, totalLines: 0 };
  }

  const curatedLines = [];
  if (dialogue.targetDe) curatedLines.push(dialogue.targetDe);
  if (dialogue.exampleDe) curatedLines.push(dialogue.exampleDe);

  const turns = Array.isArray(dialogue.turns) ? dialogue.turns : [];
  for (const turn of turns) {
    const lineText = turn?.promptDe || turn?.audioDe;
    if (turn?.speaker !== "user" && lineText) {
      curatedLines.push(lineText);
    }
    if (turn?.sampleReplyDe) {
      curatedLines.push(turn.sampleReplyDe);
    }
  }

  const uniqueLines = Array.from(new Set(curatedLines.filter(Boolean)));
  let syncedLines = 0;
  let blobsCached = 0;

  for (let i = 0; i < uniqueLines.length; i++) {
    try {
      const res = await precacheAudioFromText(uniqueLines[i], {
        voice: "Charon",
        type: "dialogue",
        lang: "de"
      });
      if (res?.ok) {
        syncedLines++;
        if (res.blobAvailable) blobsCached++;
      }
    } catch {
      // Ignorar fallo puntual en línea secundaria
    }
    onProgress?.({
      dialogueId: dialogue.id,
      current: i + 1,
      total: uniqueLines.length,
      syncedLines
    });
  }

  const packMetadata = {
    id: dialogue.id,
    axis: dialogue.axis || "survival",
    mode: dialogue.mode || "dialogue",
    totalLines: uniqueLines.length,
    syncedLines,
    blobsCached,
    cachedAt: new Date().toISOString()
  };

  if (syncedLines > 0) {
    await phrasePackStore.setItem(dialogue.id, packMetadata).catch(() => {});
  }

  return {
    success: syncedLines > 0,
    ...packMetadata
  };
}

export async function isDialoguePackCachedOffline(dialogueId) {
  if (!dialogueId) return false;
  try {
    const entry = await phrasePackStore.getItem(dialogueId);
    return Boolean(entry && entry.syncedLines > 0);
  } catch {
    return false;
  }
}

/**
 * Retorna las estadísticas del almacenamiento local de medios, audios, cuentos y packs offline
 */
export async function getOfflineSyncStats() {
  try {
    const [
      lastSyncTime,
      stats,
      audioKeys,
      aliasKeys,
      visualKeys,
      chapterStoriesCache,
      podcastKeys,
      phraseKeys
    ] = await Promise.all([
      localforage.getItem("dm_last_media_sync"),
      localforage.getItem("dm_offline_stats"),
      audioStore.keys(),
      audioAliasStore.keys().catch(() => []),
      mediaBlobStore.keys(),
      localforage.getItem(CHAPTER_STORIES_CACHE_KEY),
      podcastPackStore.keys().catch(() => []),
      phrasePackStore.keys().catch(() => [])
    ]);

    // Con audioAliasStore, cada Blob se almacena una única vez en audioStore;
    // conservamos compatibilidad con caches heredadas anteriores a la deduplicación.
    const ttsKeysCount = audioKeys.filter((k) => k.startsWith("tts_")).length;
    const shaKeysCount = audioKeys.filter((k) => k.startsWith("audio_sha256_")).length;
    const uniqueAudios =
      aliasKeys.length > 0
        ? Math.max(audioKeys.length, shaKeysCount)
        : Math.max(ttsKeysCount, shaKeysCount) || Math.floor(audioKeys.length / 2);

    const storiesCached = chapterStoriesCache?.byId
      ? Object.keys(chapterStoriesCache.byId).length
      : stats?.storiesSynced || 0;

    return {
      lastSyncTime,
      visualsCached: visualKeys.length,
      audiosCached: uniqueAudios,
      aliasesCached: aliasKeys.length,
      storiesCached,
      podcastsCached: podcastKeys.length,
      phrasesCached: phraseKeys.length,
      ...(stats || {})
    };
  } catch (e) {
    console.warn("[getOfflineSyncStats Error]:", e);
    return {
      lastSyncTime: null,
      visualsCached: 0,
      audiosCached: 0,
      aliasesCached: 0,
      storiesCached: 0,
      podcastsCached: 0,
      phrasesCached: 0
    };
  }
}
