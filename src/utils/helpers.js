import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import localforage from 'localforage';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, appId } from '../config/firebase';
import {
  DEFAULT_LEARNING_PROFILE,
  normalizeLearningProfile,
  parseLearningProfile,
  serializeLearningProfile,
} from './learningPathEngine';

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
 * Calcula dinámicamente el total de tarjetas únicas de vocabulario en el catálogo curricular.
 *
 * @param {Array} chaptersList
 * @returns {number}
 */
export const countUniqueVocabularyCards = (chaptersList = []) =>
  new Set(
    (Array.isArray(chaptersList) ? chaptersList : []).flatMap((c) =>
      (c?.words || [])
        .map((w) => (w?.de ? getSafeId(w.de).substring(0, 150) : null))
        .filter(Boolean)
    )
  ).size;

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
 * Normaliza la velocidad de reproducción permitida exclusivamente a 0.75x, 0.85x o 1.0x.
 */
export const normalizePlaybackSpeed = (rawSpeed) => {
  const parsed = Number(rawSpeed);
  if (!Number.isFinite(parsed)) return 1.0;
  if (Math.abs(parsed - 0.75) < 0.03) return 0.75;
  if (Math.abs(parsed - 0.85) < 0.03) return 0.85;
  return 1.0;
};

/**
 * Lee la velocidad de pronunciación guardada en localStorage ('dm_voice_speed': 0.75, 0.85 o 1.0).
 */
export const getSavedPlaybackSpeed = () => {
  try {
    if (typeof localStorage === 'undefined') return 1.0;
    const raw = localStorage.getItem(PLAYBACK_SPEED_KEY);
    if (!raw) return 1.0;
    return normalizePlaybackSpeed(raw);
  } catch {
    return 1.0;
  }
};

/**
 * Guarda la velocidad de pronunciación válida (0.75, 0.85 o 1.0) y notifica globalmente vía 'dm-speed-changed'.
 */
export const setSavedPlaybackSpeed = (speed) => {
  const validSpeed = normalizePlaybackSpeed(speed);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PLAYBACK_SPEED_KEY, String(validSpeed));
    }
  } catch {
    // Ignorar error de localStorage
  }
  try {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('dm-speed-changed', { detail: validSpeed }));
    }
  } catch {
    // Ignorar entorno sin EventTarget
  }
  return validSpeed;
};

export const nativeSpeak = async (text, options = {}) => {
  if (!text || typeof text !== 'string') {
    options.onEnd?.();
    return;
  }
  const savedSpeed = normalizePlaybackSpeed(
    options.rate !== undefined ? options.rate : getSavedPlaybackSpeed()
  );
  const langTag = options.lang === 'es' ? 'es-ES' : 'de-DE';
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.speak({
        text: text,
        lang: langTag,
        rate: savedSpeed === 0.75 ? 0.75 : savedSpeed === 0.85 ? 0.85 : 0.95,
        pitch: 1.0,
      });
      options.onEnd?.();
    } catch (e) {
      console.error("Error en TTS nativo", e);
      options.onError?.(e);
      options.onEnd?.();
    }
  } else {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langTag;
        utterance.rate = savedSpeed === 0.75 ? 0.75 : savedSpeed === 0.85 ? 0.85 : 1.0;
        let settled = false;
        utterance.onend = () => {
          if (settled) return;
          settled = true;
          options.onEnd?.();
        };
        utterance.onerror = (e) => {
          if (settled) return;
          settled = true;
          options.onError?.(e);
          options.onEnd?.();
        };
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        options.onError?.(e);
        options.onEnd?.();
      }
    } else {
      console.error("Web Speech API no está soportada en este navegador.");
      options.onError?.(new Error('SpeechSynthesis not supported'));
      options.onEnd?.();
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

const DEFAULT_SKILL_POINTS = {
  speaking: 0,
  listening: 0,
  writing: 0,
  reading: 0,
};

const VALID_SKILLS = ['speaking', 'listening', 'writing', 'reading'];
const DAILY_TARGET_DEFAULT = 5;

const metricsCache = {
  hydrated: false,
  streak: 0,
  lastStudyDate: null,
  studyDates: new Set(),
  todayActionsDate: null,
  todayActionsCount: 0,
  studiedCards: new Set(),
  completedModules: new Set(),
  goetheScores: {},
  skillPoints: { ...DEFAULT_SKILL_POINTS },
  learningProfile: null,
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
  } catch {
    return null;
  }
};

const safeSetLocalStorage = (key, value) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // Ignorar fallo de escritura en localStorage
  }
};

const dispatchMetricEvent = (name, detail) => {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(name, { detail }));
    }
  } catch {
    // Ignorar entorno sin window
  }
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
        writes.push(localforage.setItem('dm_study_dates', Array.from(metricsCache.studyDates).slice(-90)));
        writes.push(
          localforage.setItem('dm_today_actions', {
            date: metricsCache.todayActionsDate,
            count: metricsCache.todayActionsCount,
          })
        );
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
      if (keysToFlush.includes('dm_skill_points')) {
        writes.push(localforage.setItem('dm_skill_points', { ...metricsCache.skillPoints }));
      }
      if (keysToFlush.includes('dm_user_learning_profile') && metricsCache.learningProfile) {
        writes.push(
          localforage.setItem(
            'dm_user_learning_profile',
            normalizeLearningProfile(metricsCache.learningProfile)
          )
        );
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
    const payload = {
      studyStreak: metricsCache.streak,
      lastStudyDate: metricsCache.lastStudyDate,
      studyDates: Array.from(metricsCache.studyDates).slice(-90),
      todayActionsDate: metricsCache.todayActionsDate,
      todayActionsCount: metricsCache.todayActionsCount,
      studiedCards: Array.from(metricsCache.studiedCards),
      completedModules: Array.from(metricsCache.completedModules),
      goetheScores: { ...metricsCache.goetheScores },
      skillPoints: { ...metricsCache.skillPoints },
      updatedAt: serverTimestamp(),
    };
    if (metricsCache.learningProfile) {
      payload.learningProfile = normalizeLearningProfile(metricsCache.learningProfile);
    }
    await setDoc(progressRef, payload, { merge: true });
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
      const [
        savedCards,
        savedModules,
        savedScores,
        savedStreak,
        savedLastDate,
        savedStudyDates,
        savedTodayActions,
        savedSkillPoints,
        savedLearningProfile,
      ] = await Promise.all([
        localforage.getItem('dm_cards_studied'),
        localforage.getItem('dm_completed_modules'),
        localforage.getItem('dm_goethe_scores'),
        localforage.getItem('dm_user_streak'),
        localforage.getItem('dm_last_study_date'),
        localforage.getItem('dm_study_dates'),
        localforage.getItem('dm_today_actions'),
        localforage.getItem('dm_skill_points'),
        localforage.getItem('dm_user_learning_profile'),
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
        } catch {
          // Ignorar almacenamiento legacy corrupto
        }
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
      } catch {
        // Ignorar JSON inválido en puntuaciones locales
      }
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

      // Hidratar historial de fechas (YYYY-MM-DD) para tira semanal L-D
      const mergedDates = new Set(Array.isArray(savedStudyDates) ? savedStudyDates.filter((d) => typeof d === 'string') : []);
      try {
        const rawLsDates = safeGetLocalStorage('dm_study_dates');
        if (rawLsDates) {
          const parsedDates = JSON.parse(rawLsDates);
          if (Array.isArray(parsedDates)) {
            parsedDates.forEach((d) => typeof d === 'string' && mergedDates.add(d));
          }
        }
      } catch {
        // Ignorar caché corrupta de fechas
      }
      if (chosenLastDate) mergedDates.add(chosenLastDate);
      metricsCache.studyDates = new Set(Array.from(mergedDates).sort().slice(-90));

      // Hidratar acciones reales de hoy
      const todayStr = getLocalDateString();
      let mergedTodayCount = 0;
      try {
        const rawLsToday = safeGetLocalStorage('dm_today_actions');
        if (rawLsToday) {
          const parsedToday = JSON.parse(rawLsToday);
          if (parsedToday?.date === todayStr) mergedTodayCount = Number(parsedToday.count) || 0;
        }
      } catch {
        // Ignorar caché corrupta del contador diario
      }
      if (savedTodayActions?.date === todayStr) {
        mergedTodayCount = Math.max(mergedTodayCount, Number(savedTodayActions.count) || 0);
      }
      metricsCache.todayActionsDate = todayStr;
      metricsCache.todayActionsCount = mergedTodayCount;

      // Hidratar puntos de 4 habilidades
      const mergedSkills = { ...DEFAULT_SKILL_POINTS };
      try {
        const rawLsSkills = safeGetLocalStorage('dm_skill_points');
        if (rawLsSkills) {
          const parsedSkills = JSON.parse(rawLsSkills);
          for (const sk of VALID_SKILLS) {
            if (typeof parsedSkills?.[sk] === 'number') {
              mergedSkills[sk] = Math.max(mergedSkills[sk], parsedSkills[sk]);
            }
          }
        }
      } catch {
        // Ignorar caché corrupta de habilidades
      }
      if (savedSkillPoints && typeof savedSkillPoints === 'object') {
        for (const sk of VALID_SKILLS) {
          if (typeof savedSkillPoints[sk] === 'number') {
            mergedSkills[sk] = Math.max(mergedSkills[sk], savedSkillPoints[sk]);
          }
        }
      }
      metricsCache.skillPoints = mergedSkills;

      // Hidratar learningProfile (LWW entre localStorage y localforage)
      const lsProfile = parseLearningProfile(safeGetLocalStorage('dm_user_learning_profile'));
      const lfProfile =
        savedLearningProfile && typeof savedLearningProfile === 'object'
          ? normalizeLearningProfile(savedLearningProfile)
          : null;
      let resolvedProfile = null;
      if (lsProfile && lfProfile) {
        resolvedProfile = lsProfile.updatedAt >= lfProfile.updatedAt ? lsProfile : lfProfile;
      } else {
        resolvedProfile = lsProfile || lfProfile || null;
      }
      metricsCache.learningProfile = resolvedProfile;
      if (resolvedProfile) {
        safeSetLocalStorage('dm_user_learning_profile', serializeLearningProfile(resolvedProfile));
      }
      safeSetLocalStorage('dm_study_dates', JSON.stringify(Array.from(metricsCache.studyDates)));
      safeSetLocalStorage('dm_today_actions', JSON.stringify({ date: todayStr, count: mergedTodayCount }));
      safeSetLocalStorage('dm_skill_points', JSON.stringify(mergedSkills));

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

  const prevTodayCount = metricsCache.todayActionsDate === todayStr ? metricsCache.todayActionsCount || 0 : 0;
  const nextTodayCount = prevTodayCount + 1;
  metricsCache.todayActionsDate = todayStr;
  metricsCache.todayActionsCount = nextTodayCount;
  metricsCache.studyDates.add(todayStr);
  if (metricsCache.studyDates.size > 90) {
    metricsCache.studyDates = new Set(Array.from(metricsCache.studyDates).sort().slice(-90));
  }

  const changed = nextStreak !== metricsCache.streak || lastDateStr !== todayStr;
  metricsCache.streak = nextStreak;
  metricsCache.lastStudyDate = todayStr;

  safeSetLocalStorage('dm_study_dates', JSON.stringify(Array.from(metricsCache.studyDates)));
  safeSetLocalStorage('dm_today_actions', JSON.stringify({ date: todayStr, count: nextTodayCount }));

  if (changed) {
    safeSetLocalStorage('dm_study_streak', String(nextStreak));
    safeSetLocalStorage('dm_last_study_date', todayStr);
  }
  dispatchMetricEvent('studyActivityUpdated', { streak: nextStreak, todayActions: nextTodayCount });
  return { streak: nextStreak, todayActions: nextTodayCount, changed: true };
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
        Object.keys(metricsCache.goetheScores).length > 0 ||
        Object.values(metricsCache.skillPoints).some((v) => v > 0) ||
        Boolean(metricsCache.learningProfile);
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

    // 5. Merge studyDates, todayActions & 4 skills
    const cloudDates = Array.isArray(cloud.studyDates) ? cloud.studyDates.filter((d) => typeof d === 'string') : [];
    let datesChanged = false;
    for (const d of cloudDates) {
      if (!metricsCache.studyDates.has(d)) {
        metricsCache.studyDates.add(d);
        datesChanged = true;
      }
    }
    if (metricsCache.studyDates.size > cloudDates.length) cloudNeedsUpdate = true;
    if (datesChanged) {
      metricsCache.studyDates = new Set(Array.from(metricsCache.studyDates).sort().slice(-90));
      safeSetLocalStorage('dm_study_dates', JSON.stringify(Array.from(metricsCache.studyDates)));
      if (!dirtyLocalKeys.includes('dm_user_streak')) dirtyLocalKeys.push('dm_user_streak');
    }

    const todayStr = getLocalDateString();
    if (cloud.todayActionsDate === todayStr && typeof cloud.todayActionsCount === 'number') {
      if (cloud.todayActionsCount > (metricsCache.todayActionsCount || 0)) {
        metricsCache.todayActionsDate = todayStr;
        metricsCache.todayActionsCount = cloud.todayActionsCount;
        safeSetLocalStorage('dm_today_actions', JSON.stringify({ date: todayStr, count: cloud.todayActionsCount }));
        if (!dirtyLocalKeys.includes('dm_user_streak')) dirtyLocalKeys.push('dm_user_streak');
      } else if ((metricsCache.todayActionsCount || 0) > cloud.todayActionsCount) {
        cloudNeedsUpdate = true;
      }
    }

    const cloudSkills = cloud.skillPoints && typeof cloud.skillPoints === 'object' ? cloud.skillPoints : {};
    let skillsChangedLocally = false;
    for (const sk of VALID_SKILLS) {
      const cVal = typeof cloudSkills[sk] === 'number' ? cloudSkills[sk] : 0;
      const lVal = typeof metricsCache.skillPoints[sk] === 'number' ? metricsCache.skillPoints[sk] : 0;
      if (cVal > lVal) {
        metricsCache.skillPoints[sk] = cVal;
        skillsChangedLocally = true;
      } else if (lVal > cVal) {
        cloudNeedsUpdate = true;
      }
    }
    if (skillsChangedLocally) {
      safeSetLocalStorage('dm_skill_points', JSON.stringify(metricsCache.skillPoints));
      dirtyLocalKeys.push('dm_skill_points');
      dispatchMetricEvent('skillActivityUpdated', { skillPoints: { ...metricsCache.skillPoints } });
    }

    // 6. Merge learningProfile via Last-Write-Wins (updatedAt)
    const cloudProfileRaw =
      cloud.learningProfile && typeof cloud.learningProfile === 'object'
        ? normalizeLearningProfile(cloud.learningProfile)
        : null;
    const localProfile = metricsCache.learningProfile
      ? normalizeLearningProfile(metricsCache.learningProfile)
      : null;

    if (cloudProfileRaw && (!localProfile || cloudProfileRaw.updatedAt > localProfile.updatedAt)) {
      metricsCache.learningProfile = cloudProfileRaw;
      safeSetLocalStorage('dm_user_learning_profile', serializeLearningProfile(cloudProfileRaw));
      dirtyLocalKeys.push('dm_user_learning_profile');
      dispatchMetricEvent('learningProfileUpdated', { learningProfile: { ...cloudProfileRaw } });
    } else if (localProfile && (!cloudProfileRaw || localProfile.updatedAt > cloudProfileRaw.updatedAt)) {
      cloudNeedsUpdate = true;
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
  } catch {
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
  } catch {
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

export const getStudiedCardIds = async () => {
  try {
    await ensureMetricsHydrated();
    return Array.from(metricsCache.studiedCards);
  } catch {
    return Array.from(metricsCache.studiedCards);
  }
};

export const getStudiedCardIdsSync = () => Array.from(metricsCache.studiedCards);

export const getCompletedModulesCount = async () => {
  try {
    await ensureMetricsHydrated();
    return metricsCache.completedModules.size;
  } catch {
    return parseInt(safeGetLocalStorage('dm_completed_modules_count') || '0', 10);
  }
};

export const getCompletedModuleIds = async () => {
  try {
    await ensureMetricsHydrated();
    return Array.from(metricsCache.completedModules);
  } catch {
    return Array.from(metricsCache.completedModules);
  }
};

export const getCompletedModuleIdsSync = () => Array.from(metricsCache.completedModules);

export const getLearningProfileSync = () => {
  if (metricsCache.learningProfile) {
    return normalizeLearningProfile(metricsCache.learningProfile);
  }
  const lsParsed = parseLearningProfile(safeGetLocalStorage('dm_user_learning_profile'));
  return lsParsed || { ...DEFAULT_LEARNING_PROFILE };
};

export const getLearningProfile = async () => {
  try {
    await ensureMetricsHydrated();
    if (metricsCache.learningProfile) {
      return normalizeLearningProfile(metricsCache.learningProfile);
    }
    const lsParsed = parseLearningProfile(safeGetLocalStorage('dm_user_learning_profile'));
    return lsParsed || null;
  } catch {
    return parseLearningProfile(safeGetLocalStorage('dm_user_learning_profile'));
  }
};

export const saveLearningProfile = async (partialOrFull = {}) => {
  try {
    await ensureMetricsHydrated();
    const base = metricsCache.learningProfile || parseLearningProfile(safeGetLocalStorage('dm_user_learning_profile')) || DEFAULT_LEARNING_PROFILE;
    const merged = normalizeLearningProfile({
      ...base,
      ...partialOrFull,
      updatedAt: Date.now(),
    });
    metricsCache.learningProfile = merged;
    safeSetLocalStorage('dm_user_learning_profile', serializeLearningProfile(merged));
    scheduleLocalPersist(['dm_user_learning_profile']);
    scheduleCloudSync();
    dispatchMetricEvent('learningProfileUpdated', { learningProfile: { ...merged } });
    return merged;
  } catch (err) {
    console.warn('Error guardando perfil de aprendizaje:', err);
    return normalizeLearningProfile({ ...DEFAULT_LEARNING_PROFILE, ...partialOrFull, updatedAt: Date.now() });
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
  } catch {
    try {
      const raw = safeGetLocalStorage('dm_goethe_scores');
      return raw ? JSON.parse(raw) : {};
    } catch {
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

// =========================================================================
// 4. TELEMETRÍA REAL DE RACHA SEMANAL (L-D) Y 4 HABILIDADES A1
// =========================================================================

const WEEK_DAY_KEYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const buildWeekDaysSummary = (datesSet, todayStr) => {
  const now = new Date();
  const jsDay = now.getDay(); // 0=Dom..6=Sáb
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset);

  return WEEK_DAY_KEYS.map((label, idx) => {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + idx);
    const iso = getLocalDateString(d);
    return {
      key: label,
      date: iso,
      active: datesSet.has(iso),
      isToday: iso === todayStr,
    };
  });
};

export const recordSkillActivity = async (skill, points = 1) => {
  if (!VALID_SKILLS.includes(skill)) return null;
  try {
    await ensureMetricsHydrated();
    const inc = Math.max(0, Number(points) || 0);
    metricsCache.skillPoints[skill] = (Number(metricsCache.skillPoints[skill]) || 0) + inc;
    applyDailyStudyActivityMutation();
    safeSetLocalStorage('dm_skill_points', JSON.stringify(metricsCache.skillPoints));
    scheduleLocalPersist(['dm_user_streak', 'dm_skill_points']);
    scheduleCloudSync();
    dispatchMetricEvent('skillActivityUpdated', {
      skill,
      skillPoints: { ...metricsCache.skillPoints },
    });
    return { ...metricsCache.skillPoints };
  } catch (err) {
    console.warn('Error registrando actividad de habilidad:', err);
    return null;
  }
};

const computeStreakSummaryObject = (dailyTarget = DAILY_TARGET_DEFAULT) => {
  const todayStr = getLocalDateString();
  const expired =
    metricsCache.lastStudyDate && diffCalendarDays(metricsCache.lastStudyDate, todayStr) > 1;
  const currentStreak = expired ? 0 : metricsCache.streak || 0;
  const todayActions =
    metricsCache.todayActionsDate === todayStr ? metricsCache.todayActionsCount || 0 : 0;

  return {
    currentStreak,
    todayActions,
    dailyTarget,
    isTodaySecured: todayActions >= 1,
    weekDays: buildWeekDaysSummary(metricsCache.studyDates, todayStr),
  };
};

export const getStreakSummary = async (dailyTarget = DAILY_TARGET_DEFAULT) => {
  await ensureMetricsHydrated();
  return computeStreakSummaryObject(dailyTarget);
};

export const getStreakSummarySync = (dailyTarget = DAILY_TARGET_DEFAULT) => {
  if (metricsCache.hydrated) {
    return computeStreakSummaryObject(dailyTarget);
  }
  const todayStr = getLocalDateString();
  let lsDates = new Set();
  try {
    const rawDates = safeGetLocalStorage('dm_study_dates');
    if (rawDates) {
      const parsed = JSON.parse(rawDates);
      if (Array.isArray(parsed)) lsDates = new Set(parsed);
    }
  } catch {
    // fallback de fechas vacío
  }
  const lastDate = safeGetLocalStorage('dm_last_study_date');
  if (lastDate) lsDates.add(lastDate);

  let lsTodayCount = 0;
  try {
    const rawToday = safeGetLocalStorage('dm_today_actions');
    if (rawToday) {
      const parsedToday = JSON.parse(rawToday);
      if (parsedToday?.date === todayStr) lsTodayCount = Number(parsedToday.count) || 0;
    }
  } catch {
    // fallback de acciones vacío
  }

  const rawStreak = parseInt(safeGetLocalStorage('dm_study_streak') || '0', 10) || 0;
  const expired = lastDate && diffCalendarDays(lastDate, todayStr) > 1;

  return {
    currentStreak: expired ? 0 : rawStreak,
    todayActions: lsTodayCount,
    dailyTarget,
    isTodaySecured: lsTodayCount >= 1,
    weekDays: buildWeekDaysSummary(lsDates, todayStr),
  };
};

const buildSkillProgressObject = (skillPoints, studiedCardsCount, totalUniqueCardsCount, completedModulesCount) => {
  const sp = Number(skillPoints?.speaking) || 0;
  const li = Number(skillPoints?.listening) || 0;
  const wr = Number(skillPoints?.writing) || 0;
  const re = Number(skillPoints?.reading) || 0;

  const vocabRatio =
    totalUniqueCardsCount > 0 ? Math.min(1, (Number(studiedCardsCount) || 0) / totalUniqueCardsCount) : 0;

  const speakingPct = Math.min(100, Math.round((sp / 100) * 100));
  const listeningPct = Math.min(100, Math.round((li / 120) * 100));
  const writingPct = Math.min(100, Math.round(((wr + (Number(completedModulesCount) || 0) * 8) / 100) * 100));
  const readingPct = Math.min(100, Math.round(vocabRatio * 60 + Math.min(40, (re / 80) * 40)));

  const overallA1Percent = Math.round((speakingPct + listeningPct + writingPct + readingPct) / 4);

  return {
    speaking: {
      id: 'speaking',
      label: 'Hablar',
      percent: speakingPct,
      points: sp,
      quickTargetView: 'roleplay',
    },
    listening: {
      id: 'listening',
      label: 'Escuchar',
      percent: listeningPct,
      points: li,
      quickTargetView: 'driving',
    },
    writing: {
      id: 'writing',
      label: 'Escribir',
      percent: writingPct,
      points: wr,
      quickTargetView: 'quiz',
    },
    reading: {
      id: 'reading',
      label: 'Leer',
      percent: readingPct,
      points: re,
      quickTargetView: 'reading',
    },
    overallA1Percent,
  };
};

export const getSkillProgressSummary = async (studiedCardsCount = 0, totalUniqueCardsCount = 0) => {
  await ensureMetricsHydrated();
  return buildSkillProgressObject(
    metricsCache.skillPoints,
    Math.max(studiedCardsCount, metricsCache.studiedCards.size),
    totalUniqueCardsCount,
    metricsCache.completedModules.size
  );
};

export const getSkillProgressSummarySync = (studiedCardsCount = 0, totalUniqueCardsCount = 0) => {
  if (metricsCache.hydrated) {
    return buildSkillProgressObject(
      metricsCache.skillPoints,
      Math.max(studiedCardsCount, metricsCache.studiedCards.size),
      totalUniqueCardsCount,
      metricsCache.completedModules.size
    );
  }
  let lsSkills = { ...DEFAULT_SKILL_POINTS };
  try {
    const raw = safeGetLocalStorage('dm_skill_points');
    if (raw) lsSkills = { ...lsSkills, ...JSON.parse(raw) };
  } catch {
    // fallback habilidades en cero
  }
  const lsCards = parseInt(safeGetLocalStorage('dm_cards_studied_count') || '0', 10) || 0;
  const lsMods = parseInt(safeGetLocalStorage('dm_completed_modules_count') || '0', 10) || 0;
  return buildSkillProgressObject(
    lsSkills,
    Math.max(studiedCardsCount, lsCards),
    totalUniqueCardsCount,
    lsMods
  );
};

/**
 * Limpia cachés locales de métricas y progreso de usuario al cerrar sesión o cambiar de cuenta (A-2).
 */
export const resetLocalUserCaches = async () => {
  if (localPersistTimer) {
    clearTimeout(localPersistTimer);
    localPersistTimer = null;
  }
  if (cloudSyncTimer) {
    clearTimeout(cloudSyncTimer);
    cloudSyncTimer = null;
  }
  pendingLocalKeys.clear();
  hydrationPromise = null;

  metricsCache.hydrated = false;
  metricsCache.streak = 0;
  metricsCache.lastStudyDate = null;
  metricsCache.studyDates = new Set();
  metricsCache.todayActionsDate = null;
  metricsCache.todayActionsCount = 0;
  metricsCache.studiedCards = new Set();
  metricsCache.completedModules = new Set();
  metricsCache.goetheScores = {};
  metricsCache.skillPoints = { ...DEFAULT_SKILL_POINTS };
  metricsCache.learningProfile = null;

  const lsKeys = [
    'dm_study_streak',
    'dm_last_study_date',
    'dm_study_dates',
    'dm_today_actions',
    'dm_cards_studied_count',
    'dm_cards_studied_migrated',
    'dm_completed_modules_count',
    'dm_goethe_scores',
    'dm_skill_points',
    'deutschmeister_unlocked',
    'dm_last_activity',
    'dm_user_learning_profile',
    'dm_quiz_streak',
    'dm_quiz_best_streak',
    'dm_driving_progress_v1',
  ];
  try {
    if (typeof localStorage !== 'undefined') {
      for (const k of lsKeys) {
        localStorage.removeItem(k);
      }
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('dm_goethe_') && key.endsWith('_score')) {
          localStorage.removeItem(key);
        }
      }
    }
  } catch {
    // Ignorar error de localStorage
  }

  const lfKeys = [
    'dm_cards_studied',
    'dm_completed_modules',
    'dm_goethe_scores',
    'dm_user_streak',
    'dm_last_study_date',
    'dm_study_dates',
    'dm_today_actions',
    'dm_skill_points',
    'dm_user_learning_profile',
    'dm_driving_progress_v1',
  ];
  try {
    await Promise.all(lfKeys.map((k) => localforage.removeItem(k).catch(() => {})));
  } catch {
    // Ignorar error de IndexedDB
  }

  dispatchMetricEvent('cardStudiedUpdated', { count: 0 });
  dispatchMetricEvent('moduleCompletedUpdated', { count: 0 });
  dispatchMetricEvent('skillActivityUpdated', { skillPoints: { ...DEFAULT_SKILL_POINTS } });
  dispatchMetricEvent('studyActivityUpdated', { streak: 0 });
  dispatchMetricEvent('learningProfileUpdated', { learningProfile: null });
};


