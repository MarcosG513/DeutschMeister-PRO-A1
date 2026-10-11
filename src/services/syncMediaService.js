import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import localforage from 'localforage';
import { getSafeId } from '../utils/helpers';

/**
 * Obtiene la fecha y hora de la última sincronización de medios locales
 * @returns {Promise<string|null>}
 */
export async function getLastMediaSyncTime() {
  try {
    return await localforage.getItem('dm_last_media_sync');
  } catch (e) {
    console.warn("[SyncMediaService] Error leyendo dm_last_media_sync:", e);
    return null;
  }
}

/**
 * Descarga el inventario de medios desde Firestore y actualiza IndexedDB local
 * @param {Function} onProgress - Callback para reportar avance { current, total, syncedCount }
 * @returns {Promise<{success: boolean, syncedCount?: number, total?: number, lastSyncTime?: string, error?: string}>}
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

    const querySnapshot = await getDocs(collection(db, "global_flashcards"));
    const total = querySnapshot.size;
    let syncedCount = 0;
    let current = 0;

    for (const docSnap of querySnapshot.docs) {
      current++;
      const data = docSnap.data();
      const safeId = docSnap.id;
      const mediaUrl = data.videoUrl || data.imageUrl || data.imageBase64;

      if (mediaUrl) {
        await localforage.setItem(`img_${safeId}`, mediaUrl);

        // Mapeo exhaustivo para garantizar compatibilidad con safeId calculado y slugId
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
        syncedCount++;
      }

      if (onProgress && (current % 10 === 0 || current === total)) {
        onProgress({ current, total, syncedCount });
      }
    }

    // Guardar marca de tiempo de la última sincronización
    const lastSyncTime = new Date().toISOString();
    await localforage.setItem('dm_last_media_sync', lastSyncTime);

    return { success: true, syncedCount, total, lastSyncTime };
  } catch (error) {
    console.error("[SyncMediaService Error]:", error);
    return { success: false, error: error.message };
  }
}
