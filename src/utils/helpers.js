import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import localforage from 'localforage';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, appId } from '../config/firebase';

export const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(res => setTimeout(res, backoff * Math.pow(2, i)));
    }
  }
};

export const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

export const pcmToWav = (pcmBuffer, sampleRate) => {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.byteLength;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  const pcmView = new Int16Array(pcmBuffer);
  let offset = 44;
  for (let i = 0; i < pcmView.length; i++) {
    view.setInt16(offset, pcmView[i], true);
    offset += 2;
  }

  return new Blob([view], { type: 'audio/wav' });
};

export const getSafeId = (str) => btoa(encodeURIComponent(str)).replace(/[/+=]/g, '_');

/**
 * Divide un texto (alemán o español) en término principal y subtítulo/código/aclaración entre paréntesis.
 * Soporta saltos de línea explícitos '\n' o sufijos entre paréntesis como '(das Zeichen 201)', '(prioridad del tren)', '(PLZ)'.
 *
 * @param {string} text 
 * @returns {{ main: string, sub: string | null, code: string | null }}
 */
export const splitParentheticalText = (text) => {
  if (!text || typeof text !== 'string') return { main: '', sub: null, code: null };

  if (text.includes('\n')) {
    const [main, ...rest] = text.split('\n');
    const sub = rest.join('\n').trim() || null;
    return { main: main.trim(), sub, code: sub };
  }

  const match = text.match(/^(.*?)\s*(\([^)]+\))$/);
  if (match && match[1].trim() && match[2].trim()) {
    const sub = match[2].trim();
    return { main: match[1].trim(), sub, code: sub };
  }

  return { main: text.trim(), sub: null, code: null };
};

export const splitGermanTitle = splitParentheticalText;

export const compressImageBase64 = (base64Str, maxWidth = 512, quality = 0.6) => {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith('data:')) return resolve(base64Str);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(base64Str);
    img.src = base64Str;
  });
};

const PLAYBACK_SPEED_KEY = 'dm_voice_speed';

/**
 * Normaliza la velocidad de reproducción permitida exclusivamente a 0.75x o 1.0x.
 */
export const normalizePlaybackSpeed = (speed) => {
  const num = Number(speed);
  if (Number.isFinite(num) && Math.abs(num - 0.75) < 0.05) {
    return 0.75;
  }
  return 1.0;
};

/**
 * Lee la velocidad de pronunciación guardada en localStorage ('dm_voice_speed': 0.75 o 1.0).
 */
export const getSavedPlaybackSpeed = () => {
  try {
    if (typeof localStorage === 'undefined') return 1.0;
    const raw = localStorage.getItem(PLAYBACK_SPEED_KEY);
    if (!raw) return 1.0;
    return normalizePlaybackSpeed(raw);
  } catch (_) {
    return 1.0;
  }
};

/**
 * Guarda la velocidad de pronunciación válida (0.75 o 1.0) y notifica globalmente vía 'dm-speed-changed'.
 */
export const setSavedPlaybackSpeed = (speed) => {
  const validSpeed = normalizePlaybackSpeed(speed);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PLAYBACK_SPEED_KEY, String(validSpeed));
    }
  } catch (_) {}
  try {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('dm-speed-changed', { detail: validSpeed }));
    }
  } catch (_) {}
  return validSpeed;
};

export const nativeSpeak = async (text, options = {}) => {
  if (!text || typeof text !== 'string') return;
  const speed = options.rate !== undefined ? options.rate : getSavedPlaybackSpeed();
  const langTag = options.lang === 'es' ? 'es-ES' : 'de-DE';
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.speak({
        text: text,
        lang: langTag,
        rate: speed <= 0.8 ? 0.75 : 0.95,
        pitch: 1.0,
      });
    } catch (e) {
      console.error("Error en TTS nativo", e);
    }
  } else {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langTag;
      utterance.rate = speed <= 0.8 ? 0.75 : 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Web Speech API no está soportada en este navegador.");
    }
  }
};

// =========================================================================
// 1. RACHA DIARIA REAL DE ESTUDIO (CALENDAR STREAK - YYYY-MM-DD)
// =========================================================================

export const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const metricsCache = {
  hydrated: false,
  streak: 0,
  lastStudyDate: null,
  studiedCards: new Set(),
  completedModules: new Set(),
  goetheScores: {},
};

let hydrationPromise = null;
let localPersistQueue = Promise.resolve();
const pendingLocalKeys = new Set();
let localPersistTimer = null;
let cloudSyncTimer = null;
let cloudSyncQueue = Promise.resolve();

const safeGetLocalStorage = (key) => {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  } catch (_) {
    return null;
  }
};

const safeSetLocalStorage = (key, value) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch (_) {}
};

const dispatchMetricEvent = (name, detail) => {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(name, { detail }));
    }
  } catch (_) {}
};

const diffCalendarDays = (fromDateStr, toDateStr) => {
  if (!fromDateStr || !toDateStr) return Infinity;
  const [y1, m1, d1] = fromDateStr.split('-').map(Number);
  const [y2, m2, d2] = toDateStr.split('-').map(Number);
  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) return Infinity;
  const prevDate = new Date(y1, m1 - 1, d1);
  const curDate = new Date(y2, m2 - 1, d2);
  return Math.round((curDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
};

const flushLocalPersist = () => {
  if (localPersistTimer) {
    clearTimeout(localPersistTimer);
    localPersistTimer = null;
  }
  if (pendingLocalKeys.size === 0) return localPersistQueue;

  const keysToFlush = Array.from(pendingLocalKeys);
  pendingLocalKeys.clear();

  localPersistQueue = localPersistQueue
    .then(async () => {
      const writes = [];
      if (keysToFlush.includes('dm_user_streak')) {
        writes.push(localforage.setItem('dm_user_streak', metricsCache.streak));
        if (metricsCache.lastStudyDate) {
          writes.push(localforage.setItem('dm_last_study_date', metricsCache.lastStudyDate));
        }
      }
      if (keysToFlush.includes('dm_cards_studied')) {
        writes.push(localforage.setItem('dm_cards_studied', Array.from(metricsCache.studiedCards)));
      }
      if (keysToFlush.includes('dm_completed_modules')) {
        writes.push(localforage.setItem('dm_completed_modules', Array.from(metricsCache.completedModules)));
      }
      if (keysToFlush.includes('dm_goethe_scores')) {
        writes.push(localforage.setItem('dm_goethe_scores', { ...metricsCache.goetheScores }));
      }
      await Promise.all(writes);
    })
    .catch((err) => {
      console.warn('Error persisting metrics to localforage:', err);
    });

  return localPersistQueue;
};

const scheduleLocalPersist = (keys = []) => {
  for (const k of keys) pendingLocalKeys.add(k);
  if (localPersistTimer) return;
  localPersistTimer = setTimeout(() => {
    localPersistTimer = null;
    flushLocalPersist();
  }, 120);
};

const isApprovedCloudUser = (uid) => {
  if (!uid || uid === 'offline_user') return false;
  if (auth?.currentUser?.isAnonymous) return false;
  return safeGetLocalStorage(`dm_access_approved_${uid}`) === 'approved';
};

const pushPedagogyProgressToCloud = async (uid) => {
  if (!isApprovedCloudUser(uid) || !db) return;
  try {
    await ensureMetricsHydrated();
    const progressRef = doc(db, 'artifacts', appId, 'users', uid, 'pedagogy', 'progress');
    await setDoc(
      progressRef,
      {
        studyStreak: metricsCache.streak,
        lastStudyDate: metricsCache.lastStudyDate,
        studiedCards: Array.from(metricsCache.studiedCards),
        completedModules: Array.from(metricsCache.completedModules),
        goetheScores: { ...metricsCache.goetheScores },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('[Metrics Sync] Cloud write deferred/skipped:', err?.message || err);
  }
};

const scheduleCloudSync = () => {
  const uid = auth?.currentUser?.uid;
  if (!isApprovedCloudUser(uid) || !db) return;
  if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(() => {
    cloudSyncTimer = null;
    const activeUid = auth?.currentUser?.uid;
    if (!isApprovedCloudUser(activeUid)) return;
    cloudSyncQueue = cloudSyncQueue.then(() => pushPedagogyProgressToCloud(activeUid));
  }, 1500);
};

const ensureMetricsHydrated = async () => {
  if (metricsCache.hydrated) return metricsCache;
  if (hydrationPromise) return hydrationPromise;

  hydrationPromise = (async () => {
    try {
      const [savedCards, savedModules, savedScores, savedStreak, savedLastDate] = await Promise.all([
        localforage.getItem('dm_cards_studied'),
        localforage.getItem('dm_completed_modules'),
        localforage.getItem('dm_goethe_scores'),
        localforage.getItem('dm_user_streak'),
        localforage.getItem('dm_last_study_date'),
      ]);

      const initialCards = Array.isArray(savedCards) ? savedCards.filter(Boolean) : [];
      metricsCache.studiedCards = new Set(initialCards);

      let migratedNow = false;
      if (!safeGetLocalStorage('dm_cards_studied_migrated')) {
        try {
          const rawUnlocked = safeGetLocalStorage('deutschmeister_unlocked');
          if (rawUnlocked) {
            const parsed = JSON.parse(rawUnlocked);
            for (const key of Object.keys(parsed || {})) {
              if (key && !metricsCache.studiedCards.has(key)) {
                metricsCache.studiedCards.add(key);
                migratedNow = true;
              }
            }
          }
        } catch (_) {}
        safeSetLocalStorage('dm_cards_studied_migrated', 'true');
      }

      metricsCache.completedModules = new Set(
        Array.isArray(savedModules) ? savedModules.filter(Boolean) : []
      );

      const mergedScores = {};
      try {
        const rawLsScores = safeGetLocalStorage('dm_goethe_scores');
        if (rawLsScores) {
          const parsed = JSON.parse(rawLsScores);
          if (parsed && typeof parsed === 'object') {
            for (const [k, v] of Object.entries(parsed)) {
              if (typeof v === 'number') mergedScores[k] = v;
            }
          }
        }
      } catch (_) {}
      if (savedScores && typeof savedScores === 'object') {
        for (const [k, v] of Object.entries(savedScores)) {
          if (typeof v === 'number') {
            mergedScores[k] = Math.max(mergedScores[k] || 0, v);
          }
        }
      }
      metricsCache.goetheScores = mergedScores;

      const lsStreak = parseInt(safeGetLocalStorage('dm_study_streak') || '0', 10) || 0;
      const lfStreak = typeof savedStreak === 'number' ? savedStreak : 0;
      const lsLastDate = safeGetLocalStorage('dm_last_study_date');
      const lfLastDate = typeof savedLastDate === 'string' ? savedLastDate : null;

      let chosenLastDate = null;
      let chosenStreak = 0;
      if (lsLastDate && lfLastDate) {
        if (lsLastDate > lfLastDate) {
          chosenLastDate = lsLastDate;
          chosenStreak = lsStreak;
        } else if (lfLastDate > lsLastDate) {
          chosenLastDate = lfLastDate;
          chosenStreak = lfStreak;
        } else {
          chosenLastDate = lsLastDate;
          chosenStreak = Math.max(lsStreak, lfStreak);
        }
      } else {
        chosenLastDate = lsLastDate || lfLastDate || null;
        chosenStreak = Math.max(lsStreak, lfStreak);
      }

      metricsCache.lastStudyDate = chosenLastDate;
      metricsCache.streak = chosenStreak;

      if (chosenLastDate) {
        safeSetLocalStorage('dm_last_study_date', chosenLastDate);
        safeSetLocalStorage('dm_study_streak', String(chosenStreak));
      }
      if (metricsCache.studiedCards.size > 0) {
        safeSetLocalStorage('dm_cards_studied_count', String(metricsCache.studiedCards.size));
      }
      if (metricsCache.completedModules.size > 0) {
        safeSetLocalStorage('dm_completed_modules_count', String(metricsCache.completedModules.size));
      }

      metricsCache.hydrated = true;

      if (migratedNow) {
        scheduleLocalPersist(['dm_cards_studied']);
      }
    } catch (err) {
      console.warn('Error hydrating metrics cache:', err);
      metricsCache.hydrated = true;
    } finally {
      hydrationPromise = null;
    }
    return metricsCache;
  })();

  return hydrationPromise;
};

const applyDailyStudyActivityMutation = () => {
  const todayStr = getLocalDateString();
  const lastDateStr = metricsCache.lastStudyDate;
  let nextStreak = metricsCache.streak || 0;

  if (!lastDateStr) {
    nextStreak = 1;
  } else if (lastDateStr === todayStr) {
    if (nextStreak < 1) nextStreak = 1;
  } else {
    const diffDays = diffCalendarDays(lastDateStr, todayStr);
    nextStreak = diffDays === 1 ? nextStreak + 1 : 1;
  }

  const changed = nextStreak !== metricsCache.streak || lastDateStr !== todayStr;
  metricsCache.streak = nextStreak;
  metricsCache.lastStudyDate = todayStr;

  if (changed) {
    safeSetLocalStorage('dm_study_streak', String(nextStreak));
    safeSetLocalStorage('dm_last_study_date', todayStr);
    dispatchMetricEvent('studyActivityUpdated', { streak: nextStreak });
  }
  return { streak: nextStreak, changed };
};

const applyModuleCompletedMutation = (moduleId) => {
  if (!moduleId || metricsCache.completedModules.has(moduleId)) {
    return { count: metricsCache.completedModules.size, changed: false };
  }
  metricsCache.completedModules.add(moduleId);
  const count = metricsCache.completedModules.size;
  safeSetLocalStorage('dm_completed_modules_count', String(count));
  dispatchMetricEvent('moduleCompletedUpdated', { count, moduleId });
  return { count, changed: true };
};

export const syncPedagogyProgressFromCloud = async (uid) => {
  if (!isApprovedCloudUser(uid) || !db) return;
  try {
    await ensureMetricsHydrated();
    const progressRef = doc(db, 'artifacts', appId, 'users', uid, 'pedagogy', 'progress');
    const snap = await getDoc(progressRef);

    if (!snap.exists()) {
      const hasLocalData =
        metricsCache.streak > 0 ||
        metricsCache.studiedCards.size > 0 ||
        metricsCache.completedModules.size > 0 ||
        Object.keys(metricsCache.goetheScores).length > 0;
      if (hasLocalData) {
        cloudSyncQueue = cloudSyncQueue.then(() => pushPedagogyProgressToCloud(uid));
      }
      return;
    }

    const cloud = snap.data() || {};
    const dirtyLocalKeys = [];
    let cloudNeedsUpdate = false;

    // 1. Merge studiedCards
    const cloudCards = Array.isArray(cloud.studiedCards) ? cloud.studiedCards.filter(Boolean) : [];
    const cloudCardsSet = new Set(cloudCards);
    let cardsChangedLocally = false;
    for (const id of cloudCardsSet) {
      if (!metricsCache.studiedCards.has(id)) {
        metricsCache.studiedCards.add(id);
        cardsChangedLocally = true;
      }
    }
    if (metricsCache.studiedCards.size > cloudCardsSet.size) {
      cloudNeedsUpdate = true;
    }
    if (cardsChangedLocally) {
      safeSetLocalStorage('dm_cards_studied_count', String(metricsCache.studiedCards.size));
      dirtyLocalKeys.push('dm_cards_studied');
      dispatchMetricEvent('cardStudiedUpdated', { count: metricsCache.studiedCards.size });
    }

    // 2. Merge completedModules
    const cloudModules = Array.isArray(cloud.completedModules)
      ? cloud.completedModules.filter(Boolean)
      : [];
    const cloudModulesSet = new Set(cloudModules);
    let modulesChangedLocally = false;
    for (const id of cloudModulesSet) {
      if (!metricsCache.completedModules.has(id)) {
        metricsCache.completedModules.add(id);
        modulesChangedLocally = true;
      }
    }
    if (metricsCache.completedModules.size > cloudModulesSet.size) {
      cloudNeedsUpdate = true;
    }
    if (modulesChangedLocally) {
      safeSetLocalStorage('dm_completed_modules_count', String(metricsCache.completedModules.size));
      dirtyLocalKeys.push('dm_completed_modules');
      dispatchMetricEvent('moduleCompletedUpdated', { count: metricsCache.completedModules.size });
    }

    // 3. Merge Goethe scores (max per module)
    const cloudScores = cloud.goetheScores && typeof cloud.goetheScores === 'object' ? cloud.goetheScores : {};
    let scoresChangedLocally = false;
    for (const [k, v] of Object.entries(cloudScores)) {
      if (typeof v === 'number' && v > (metricsCache.goetheScores[k] || 0)) {
        metricsCache.goetheScores[k] = v;
        safeSetLocalStorage(`dm_goethe_${k}_score`, String(v));
        scoresChangedLocally = true;
      }
    }
    for (const [k, v] of Object.entries(metricsCache.goetheScores)) {
      if (typeof v === 'number' && v > (typeof cloudScores[k] === 'number' ? cloudScores[k] : 0)) {
        cloudNeedsUpdate = true;
      }
    }
    if (scoresChangedLocally) {
      safeSetLocalStorage('dm_goethe_scores', JSON.stringify(metricsCache.goetheScores));
      dirtyLocalKeys.push('dm_goethe_scores');
      dispatchMetricEvent('goetheScoreUpdated', { scores: { ...metricsCache.goetheScores } });
    }

    // 4. Merge streak & lastStudyDate
    const cloudLastDate = typeof cloud.lastStudyDate === 'string' ? cloud.lastStudyDate : null;
    const cloudStreak = typeof cloud.studyStreak === 'number' ? cloud.studyStreak : 0;
    let streakChangedLocally = false;
    if (cloudLastDate && (!metricsCache.lastStudyDate || cloudLastDate > metricsCache.lastStudyDate)) {
      metricsCache.lastStudyDate = cloudLastDate;
      metricsCache.streak = cloudStreak;
      streakChangedLocally = true;
    } else if (
      cloudLastDate &&
      cloudLastDate === metricsCache.lastStudyDate &&
      cloudStreak > metricsCache.streak
    ) {
      metricsCache.streak = cloudStreak;
      streakChangedLocally = true;
    } else if (
      metricsCache.lastStudyDate &&
      (!cloudLastDate ||
        metricsCache.lastStudyDate > cloudLastDate ||
        metricsCache.streak > cloudStreak)
    ) {
      cloudNeedsUpdate = true;
    }
    if (streakChangedLocally) {
      safeSetLocalStorage('dm_study_streak', String(metricsCache.streak));
      if (metricsCache.lastStudyDate) {
        safeSetLocalStorage('dm_last_study_date', metricsCache.lastStudyDate);
      }
      dirtyLocalKeys.push('dm_user_streak');
      dispatchMetricEvent('studyActivityUpdated', { streak: metricsCache.streak });
    }

    if (dirtyLocalKeys.length > 0) {
      scheduleLocalPersist(dirtyLocalKeys);
    }
    if (cloudNeedsUpdate) {
      cloudSyncQueue = cloudSyncQueue.then(() => pushPedagogyProgressToCloud(uid));
    }
  } catch (err) {
    console.warn('[Metrics Sync] Cloud hydration failed, continuing offline:', err?.message || err);
  }
};

export const recordDailyStudyActivity = async () => {
  try {
    await ensureMetricsHydrated();
    const { streak, changed } = applyDailyStudyActivityMutation();
    if (changed) {
      scheduleLocalPersist(['dm_user_streak']);
      scheduleCloudSync();
    }
    return streak;
  } catch (err) {
    console.warn('Error en recordDailyStudyActivity:', err);
    return 1;
  }
};

export const getDailyStudyStreak = async () => {
  try {
    await ensureMetricsHydrated();
    if (!metricsCache.lastStudyDate) {
      return metricsCache.streak > 0 ? metricsCache.streak : 0;
    }
    if (diffCalendarDays(metricsCache.lastStudyDate, getLocalDateString()) > 1) {
      return 0; // Expirada por inactividad de más de 24h
    }
    return metricsCache.streak;
  } catch (_) {
    return parseInt(safeGetLocalStorage('dm_study_streak') || '0', 10);
  }
};

// =========================================================================
// 2. MÉTRICA DE VOCABULARIO ESTUDIADO (CARDS STUDIED)
// =========================================================================

export const recordCardStudied = async (safeId) => {
  if (!safeId) return;
  try {
    await ensureMetricsHydrated();
    const streakRes = applyDailyStudyActivityMutation();
    const dirtyKeys = streakRes.changed ? ['dm_user_streak'] : [];

    let cardAdded = false;
    if (!metricsCache.studiedCards.has(safeId)) {
      metricsCache.studiedCards.add(safeId);
      const count = metricsCache.studiedCards.size;
      safeSetLocalStorage('dm_cards_studied_count', String(count));
      dirtyKeys.push('dm_cards_studied');
      dispatchMetricEvent('cardStudiedUpdated', { count, safeId });
      cardAdded = true;
    }

    if (dirtyKeys.length > 0) {
      scheduleLocalPersist(dirtyKeys);
    }
    if (streakRes.changed || cardAdded) {
      scheduleCloudSync();
    }
    return metricsCache.studiedCards.size;
  } catch (err) {
    console.warn('Error al registrar carta estudiada:', err);
  }
};

export const getStudiedCardsCount = async () => {
  try {
    await ensureMetricsHydrated();
    return metricsCache.studiedCards.size;
  } catch (_) {
    return parseInt(safeGetLocalStorage('dm_cards_studied_count') || '0', 10);
  }
};

// =========================================================================
// 3. SEGUIMIENTO DE MÓDULOS DE PREPARACIÓN GOETHE A1
// =========================================================================

export const recordModuleCompleted = async (moduleId) => {
  if (!moduleId) return;
  try {
    await ensureMetricsHydrated();
    const streakRes = applyDailyStudyActivityMutation();
    const modRes = applyModuleCompletedMutation(moduleId);
    const dirtyKeys = [];
    if (streakRes.changed) dirtyKeys.push('dm_user_streak');
    if (modRes.changed) dirtyKeys.push('dm_completed_modules');

    if (dirtyKeys.length > 0) {
      scheduleLocalPersist(dirtyKeys);
      scheduleCloudSync();
    }
    return modRes.count;
  } catch (err) {
    console.warn('Error al registrar módulo completado:', err);
  }
};

export const getCompletedModulesCount = async () => {
  try {
    await ensureMetricsHydrated();
    return metricsCache.completedModules.size;
  } catch (_) {
    return parseInt(safeGetLocalStorage('dm_completed_modules_count') || '0', 10);
  }
};

export const recordGoetheScore = async (moduleId, score) => {
  if (!moduleId || typeof score !== 'number') return;
  try {
    await ensureMetricsHydrated();
    const streakRes = applyDailyStudyActivityMutation();
    const modRes = applyModuleCompletedMutation(moduleId);

    const prevScore = metricsCache.goetheScores[moduleId] || 0;
    const nextScore = Math.max(prevScore, score);
    const scoreChanged = nextScore !== prevScore || !(moduleId in metricsCache.goetheScores);

    metricsCache.goetheScores[moduleId] = nextScore;
    safeSetLocalStorage('dm_goethe_scores', JSON.stringify(metricsCache.goetheScores));
    safeSetLocalStorage(`dm_goethe_${moduleId}_score`, String(nextScore));

    const dirtyKeys = [];
    if (streakRes.changed) dirtyKeys.push('dm_user_streak');
    if (modRes.changed) dirtyKeys.push('dm_completed_modules');
    if (scoreChanged) dirtyKeys.push('dm_goethe_scores');

    if (dirtyKeys.length > 0) {
      scheduleLocalPersist(dirtyKeys);
      scheduleCloudSync();
    }

    dispatchMetricEvent('goetheScoreUpdated', {
      moduleId,
      score: nextScore,
      scores: { ...metricsCache.goetheScores },
    });
    return { ...metricsCache.goetheScores };
  } catch (err) {
    console.warn('Error guardando puntuación Goethe:', err);
  }
};

export const getGoetheScores = async () => {
  try {
    await ensureMetricsHydrated();
    return { ...metricsCache.goetheScores };
  } catch (_) {
    try {
      const raw = safeGetLocalStorage('dm_goethe_scores');
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }
};

export const scrollInputIntoView = (event) => {
  const target = event?.currentTarget;
  if (!target || typeof target.scrollIntoView !== 'function') return;
  setTimeout(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 150);
};

