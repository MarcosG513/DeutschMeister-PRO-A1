import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import localforage from 'localforage';

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

export const nativeSpeak = async (text) => {
  const rawSpeed = localStorage.getItem('dm_voice_speed') || '1.0';
  const savedSpeed = parseFloat(rawSpeed) || 1.0;
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.speak({
        text: text,
        lang: 'de-DE',
        rate: savedSpeed,
        pitch: 1.0,
      });
    } catch (e) {
      console.error("Error en TTS nativo", e);
    }
  } else {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = savedSpeed;
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

export const recordDailyStudyActivity = async () => {
  try {
    const todayStr = getLocalDateString();
    const lastDateStr = localStorage.getItem('dm_last_study_date');
    let currentStreak = parseInt(localStorage.getItem('dm_study_streak') || '0', 10);

    if (!lastDateStr) {
      currentStreak = 1;
    } else if (lastDateStr === todayStr) {
      if (currentStreak < 1) currentStreak = 1;
    } else {
      const [y1, m1, d1] = lastDateStr.split('-').map(Number);
      const [y2, m2, d2] = todayStr.split('-').map(Number);
      const prevDate = new Date(y1, m1 - 1, d1);
      const curDate = new Date(y2, m2 - 1, d2);
      const diffMs = curDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }

    localStorage.setItem('dm_study_streak', currentStreak.toString());
    localStorage.setItem('dm_last_study_date', todayStr);
    await localforage.setItem('dm_user_streak', currentStreak);
    window.dispatchEvent(new CustomEvent('studyActivityUpdated', { detail: { streak: currentStreak } }));
    return currentStreak;
  } catch (err) {
    console.warn("Error en recordDailyStudyActivity:", err);
    return 1;
  }
};

export const getDailyStudyStreak = async () => {
  try {
    const todayStr = getLocalDateString();
    const lastDateStr = localStorage.getItem('dm_last_study_date');
    let streak = parseInt(localStorage.getItem('dm_study_streak') || '0', 10);

    if (!lastDateStr) {
      const saved = await localforage.getItem('dm_user_streak');
      return (typeof saved === 'number' && saved > 0) ? saved : 0;
    }

    const [y1, m1, d1] = lastDateStr.split('-').map(Number);
    const [y2, m2, d2] = todayStr.split('-').map(Number);
    const prevDate = new Date(y1, m1 - 1, d1);
    const curDate = new Date(y2, m2 - 1, d2);
    const diffDays = Math.round((curDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return 0; // Expirada por inactividad de más de 24h
    }

    return streak;
  } catch (_) {
    return parseInt(localStorage.getItem('dm_study_streak') || '0', 10);
  }
};

// =========================================================================
// 2. MÉTRICA DE VOCABULARIO ESTUDIADO (CARDS STUDIED)
// =========================================================================

export const recordCardStudied = async (safeId) => {
  if (!safeId) return;
  try {
    recordDailyStudyActivity();
    const currentList = (await localforage.getItem('dm_cards_studied')) || [];
    if (!currentList.includes(safeId)) {
      currentList.push(safeId);
      await localforage.setItem('dm_cards_studied', currentList);
      localStorage.setItem('dm_cards_studied_count', currentList.length.toString());
      window.dispatchEvent(new CustomEvent('cardStudiedUpdated', { detail: { count: currentList.length, safeId } }));
      return currentList.length;
    }
    return currentList.length;
  } catch (err) {
    console.warn("Error al registrar carta estudiada:", err);
  }
};

export const getStudiedCardsCount = async () => {
  try {
    // Migración inicial automática si existen desbloqueos previos
    if (!localStorage.getItem('dm_cards_studied_migrated')) {
      try {
        const rawUnlocked = localStorage.getItem('deutschmeister_unlocked');
        if (rawUnlocked) {
          const parsed = JSON.parse(rawUnlocked);
          const keys = Object.keys(parsed || {});
          if (keys.length > 0) {
            const existing = (await localforage.getItem('dm_cards_studied')) || [];
            const merged = Array.from(new Set([...existing, ...keys]));
            await localforage.setItem('dm_cards_studied', merged);
            localStorage.setItem('dm_cards_studied_count', merged.length.toString());
          }
        }
      } catch (_) {}
      localStorage.setItem('dm_cards_studied_migrated', 'true');
    }

    const list = await localforage.getItem('dm_cards_studied');
    if (Array.isArray(list)) return list.length;
    return parseInt(localStorage.getItem('dm_cards_studied_count') || '0', 10);
  } catch (_) {
    return parseInt(localStorage.getItem('dm_cards_studied_count') || '0', 10);
  }
};

// =========================================================================
// 3. SEGUIMIENTO DE MÓDULOS DE PREPARACIÓN GOETHE A1
// =========================================================================

export const recordModuleCompleted = async (moduleId) => {
  if (!moduleId) return;
  try {
    recordDailyStudyActivity();
    const currentList = (await localforage.getItem('dm_completed_modules')) || [];
    if (!currentList.includes(moduleId)) {
      currentList.push(moduleId);
      await localforage.setItem('dm_completed_modules', currentList);
      localStorage.setItem('dm_completed_modules_count', currentList.length.toString());
      window.dispatchEvent(new CustomEvent('moduleCompletedUpdated', { detail: { count: currentList.length, moduleId } }));
      return currentList.length;
    }
    return currentList.length;
  } catch (err) {
    console.warn("Error al registrar módulo completado:", err);
  }
};

export const getCompletedModulesCount = async () => {
  try {
    const list = await localforage.getItem('dm_completed_modules');
    if (Array.isArray(list)) return list.length;
    return parseInt(localStorage.getItem('dm_completed_modules_count') || '0', 10);
  } catch (_) {
    return parseInt(localStorage.getItem('dm_completed_modules_count') || '0', 10);
  }
};

export const recordGoetheScore = async (moduleId, score) => {
  if (!moduleId || typeof score !== 'number') return;
  try {
    recordDailyStudyActivity();
    await recordModuleCompleted(moduleId);

    const scores = (await localforage.getItem('dm_goethe_scores')) || {};
    scores[moduleId] = Math.max(scores[moduleId] || 0, score);
    await localforage.setItem('dm_goethe_scores', scores);
    localStorage.setItem('dm_goethe_scores', JSON.stringify(scores));
    localStorage.setItem(`dm_goethe_${moduleId}_score`, score.toString());

    window.dispatchEvent(new CustomEvent('goetheScoreUpdated', { detail: { moduleId, score, scores } }));
    return scores;
  } catch (err) {
    console.warn("Error guardando puntuación Goethe:", err);
  }
};

export const getGoetheScores = async () => {
  try {
    const scores = await localforage.getItem('dm_goethe_scores');
    if (scores && typeof scores === 'object') return scores;
    const raw = localStorage.getItem('dm_goethe_scores');
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
};

