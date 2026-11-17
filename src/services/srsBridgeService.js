import localforage from 'localforage';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { auth, db, appId } from '../config/firebase';
import { chapters } from '../data/chapters';
import { recordCardStudied, recordDailyStudyActivity } from '../utils/helpers';
import {
  applySm2Review,
  computeSrsStats,
  mergeSrsCards,
  normalizeDeKey,
  resolveSrsCardId,
  sortDueSrsCards,
} from '../utils/srsMath';

const SRS_STORAGE_KEY = 'dm_srs_deck_v1';
const SRS_SUMMARY_LS_KEY = 'dm_srs_summary_v1';

const VALID_AXES = new Set(['general', 'survival', 'work']);
const VALID_SOURCES = new Set([
  'flashcard',
  'quiz',
  'podcast',
  'dialogue',
  'roleplay',
  'tutor_chat',
  'voice_call',
  'photo_ocr',
  'story_word',
]);

let deckCache = {
  hydrated: false,
  schemaVersion: 1,
  updatedAt: 0,
  cards: {},
};

let hydrationPromise = null;
let localPersistTimer = null;
let localPersistQueue = Promise.resolve();
let cloudSyncTimer = null;
let cloudSyncQueue = Promise.resolve();
const dirtyCloudCardIds = new Set();
let listenersAttached = false;
let masterVocabLookupCache = null;

function getMasterVocabLookup() {
  if (masterVocabLookupCache) return masterVocabLookupCache;
  const map = new Map();
  for (const chap of chapters || []) {
    for (const w of chap.words || []) {
      if (w?.de) {
        const norm = normalizeDeKey(w.de).toLowerCase();
        if (!map.has(norm)) {
          map.set(norm, w.de);
        }
      }
    }
  }
  masterVocabLookupCache = map;
  return map;
}

function safeGetLocalStorage(key) {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeSetLocalStorage(key, value) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // Ignorar errores de cuota o modo privado
  }
}

function dispatchSrsUpdated() {
  const stats = computeSrsStats(deckCache.cards);
  safeSetLocalStorage(SRS_SUMMARY_LS_KEY, JSON.stringify(stats));
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('srsDeckUpdated', { detail: stats }));
    }
  } catch {
    // Ignorar en entornos sin window
  }
  return stats;
}

function isApprovedCloudUser(uid) {
  if (!uid || uid === 'offline_user') return false;
  if (auth?.currentUser?.isAnonymous) return false;
  return safeGetLocalStorage(`dm_access_approved_${uid}`) === 'approved';
}

function sanitizeCardForFirestore(card) {
  return {
    id: String(card.id).substring(0, 200),
    cardType: card.cardType === 'grammar_error' ? 'grammar_error' : 'vocabulary',
    termDe: String(card.termDe || '').substring(0, 300),
    audioDe: card.audioDe ? String(card.audioDe).substring(0, 300) : null,
    translationEs: card.translationEs ? String(card.translationEs).substring(0, 500) : null,
    axis: VALID_AXES.has(card.axis) ? card.axis : 'general',
    source: VALID_SOURCES.has(card.source) ? card.source : 'tutor_chat',
    sourceRef: card.sourceRef ? String(card.sourceRef).substring(0, 160) : null,
    grammarErrorMeta: card.grammarErrorMeta
      ? {
          userUtteranceDe: String(card.grammarErrorMeta.userUtteranceDe || '').substring(0, 280),
          correctedDe: String(card.grammarErrorMeta.correctedDe || '').substring(0, 280),
          errorCategory: String(card.grammarErrorMeta.errorCategory || 'lexical').substring(0, 40),
          explanationEs: String(card.grammarErrorMeta.explanationEs || '').substring(0, 400),
          occurrenceCount: Math.max(1, Number(card.grammarErrorMeta.occurrenceCount) || 1),
        }
      : null,
    state: ['new', 'learning', 'review', 'relearning'].includes(card.state) ? card.state : 'new',
    reps: Math.max(0, Number(card.reps) || 0),
    lapses: Math.max(0, Number(card.lapses) || 0),
    easeFactor: Math.min(5.0, Math.max(1.3, Number(card.easeFactor) || 2.5)),
    intervalDays: Math.min(3650, Math.max(0, Number(card.intervalDays) || 0)),
    createdAt: Number(card.createdAt) || Date.now(),
    lastReviewedAt: card.lastReviewedAt ? Number(card.lastReviewedAt) : null,
    nextReviewAt: Number(card.nextReviewAt) || Date.now(),
    updatedAt: Number(card.updatedAt) || Date.now(),
  };
}

async function flushLocalSrsPersist() {
  if (localPersistTimer) {
    clearTimeout(localPersistTimer);
    localPersistTimer = null;
  }
  const snapshot = {
    schemaVersion: 1,
    updatedAt: deckCache.updatedAt || Date.now(),
    cards: { ...deckCache.cards },
  };
  localPersistQueue = localPersistQueue
    .then(() => localforage.setItem(SRS_STORAGE_KEY, snapshot))
    .catch((err) => {
      console.warn('[SRS Bridge] Error guardando mazo local:', err?.message || err);
    });
  return localPersistQueue;
}

function scheduleLocalSrsPersist() {
  if (localPersistTimer) return;
  localPersistTimer = setTimeout(() => {
    localPersistTimer = null;
    flushLocalSrsPersist();
  }, 120);
}

async function pushDirtyCardsToCloud(uid) {
  if (!isApprovedCloudUser(uid) || !db || dirtyCloudCardIds.size === 0) return;
  const idsToPush = Array.from(dirtyCloudCardIds);
  dirtyCloudCardIds.clear();

  try {
    const colRef = collection(db, 'artifacts', appId, 'users', uid, 'srsCards');
    for (let i = 0; i < idsToPush.length; i += 400) {
      const slice = idsToPush.slice(i, i + 400);
      const batch = writeBatch(db);
      for (const cardId of slice) {
        const card = deckCache.cards[cardId];
        if (!card) continue;
        batch.set(doc(colRef, cardId), sanitizeCardForFirestore(card), { merge: true });
      }
      await batch.commit();
    }
  } catch (err) {
    idsToPush.forEach((id) => dirtyCloudCardIds.add(id));
    console.warn('[SRS Bridge] Sync cloud diferido:', err?.message || err);
  }
}

function scheduleSrsCloudSync(cardIds = []) {
  for (const id of cardIds) {
    if (id) dirtyCloudCardIds.add(id);
  }
  const uid = auth?.currentUser?.uid;
  if (!isApprovedCloudUser(uid) || !db) return;

  if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(() => {
    cloudSyncTimer = null;
    const activeUid = auth?.currentUser?.uid;
    if (!isApprovedCloudUser(activeUid)) return;
    cloudSyncQueue = cloudSyncQueue.then(() => pushDirtyCardsToCloud(activeUid));
  }, 1200);
}

function attachLifecycleFlushListeners() {
  if (listenersAttached || typeof window === 'undefined') return;
  listenersAttached = true;

  const flushAll = () => {
    flushLocalSrsPersist();
    const uid = auth?.currentUser?.uid;
    if (isApprovedCloudUser(uid) && dirtyCloudCardIds.size > 0) {
      cloudSyncQueue = cloudSyncQueue.then(() => pushDirtyCardsToCloud(uid));
    }
  };

  window.addEventListener('pagehide', flushAll);
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flushAll();
      }
    });
  }
}

/**
 * Hidrata en memoria el mazo SRS desde IndexedDB garantizando una sola lectura concurrente.
 */
export async function hydrateSrsDeck() {
  attachLifecycleFlushListeners();
  if (deckCache.hydrated) return deckCache;
  if (hydrationPromise) return hydrationPromise;

  hydrationPromise = (async () => {
    try {
      const saved = await localforage.getItem(SRS_STORAGE_KEY);
      if (saved && typeof saved === 'object' && saved.cards && typeof saved.cards === 'object') {
        deckCache.cards = { ...saved.cards };
        deckCache.updatedAt = Number(saved.updatedAt) || Date.now();
      }
      deckCache.hydrated = true;
      dispatchSrsUpdated();
    } catch (err) {
      console.warn('[SRS Bridge] Error hidratando mazo SRS:', err?.message || err);
      deckCache.hydrated = true;
    } finally {
      hydrationPromise = null;
    }
    return deckCache;
  })();

  return hydrationPromise;
}

/**
 * Reconcilia el mazo SRS local con Firestore `/artifacts/{appId}/users/{uid}/srsCards`.
 */
export async function syncSrsDeckFromCloud(uid) {
  if (!isApprovedCloudUser(uid) || !db) return;
  try {
    await hydrateSrsDeck();
    const colRef = collection(db, 'artifacts', appId, 'users', uid, 'srsCards');
    const snap = await getDocs(colRef);

    const cloudMap = new Map();
    snap.forEach((docSnap) => {
      const d = docSnap.data();
      if (d && d.id) {
        cloudMap.set(d.id, d);
      }
    });

    let localChanged = false;
    const toPush = [];

    for (const [id, cloudCard] of cloudMap.entries()) {
      const localCard = deckCache.cards[id];
      const merged = mergeSrsCards(localCard, cloudCard);
      if (!localCard || Number(merged.updatedAt) !== Number(localCard.updatedAt)) {
        deckCache.cards[id] = merged;
        localChanged = true;
      }
      if (Number(merged.updatedAt) > Number(cloudCard.updatedAt || 0)) {
        toPush.push(id);
      }
    }

    for (const [id, localCard] of Object.entries(deckCache.cards)) {
      if (!cloudMap.has(id) && localCard?.id) {
        toPush.push(id);
      }
    }

    if (localChanged) {
      deckCache.updatedAt = Date.now();
      scheduleLocalSrsPersist();
      dispatchSrsUpdated();
    }
    if (toPush.length > 0) {
      scheduleSrsCloudSync(toPush);
    }
  } catch (err) {
    console.warn('[SRS Bridge] Error sincronizando SRS con la nube:', err?.message || err);
  }
}

function upsertVocabCardInCache({
  termDe,
  audioDe,
  translationEs,
  axis = 'general',
  source = 'tutor_chat',
  sourceRef = null,
}) {
  const cleanDe = normalizeDeKey(termDe);
  if (!cleanDe) return null;

  const id = resolveSrsCardId({
    termDe: cleanDe,
    cardType: 'vocabulary',
    masterVocabLookup: getMasterVocabLookup(),
  });
  if (!id) return null;

  const now = Date.now();
  const existing = deckCache.cards[id];
  if (existing) {
    const updated = {
      ...existing,
      audioDe: existing.audioDe || audioDe || cleanDe,
      translationEs: existing.translationEs || translationEs || '',
      axis: existing.axis && existing.axis !== 'general' ? existing.axis : VALID_AXES.has(axis) ? axis : 'general',
      updatedAt: now,
    };
    deckCache.cards[id] = updated;
    return updated;
  }

  const created = {
    id,
    cardType: 'vocabulary',
    termDe: cleanDe,
    audioDe: normalizeDeKey(audioDe || cleanDe),
    translationEs: String(translationEs || '').trim(),
    axis: VALID_AXES.has(axis) ? axis : 'general',
    source: VALID_SOURCES.has(source) ? source : 'tutor_chat',
    sourceRef: sourceRef ? String(sourceRef) : null,
    grammarErrorMeta: null,
    state: 'new',
    reps: 0,
    lapses: 0,
    easeFactor: 2.5,
    intervalDays: 0,
    createdAt: now,
    lastReviewedAt: null,
    nextReviewAt: now,
    updatedAt: now,
  };
  deckCache.cards[id] = created;
  return created;
}

function upsertGrammarErrorInCache({
  userUtteranceDe,
  correctedDe,
  errorCategory = 'lexical',
  explanationEs = '',
  translationEs = '',
  axis = 'general',
  source = 'tutor_chat',
  sourceRef = null,
}) {
  const cleanCorrected = normalizeDeKey(correctedDe);
  if (!cleanCorrected) return null;

  const normalizedCat = String(errorCategory || 'lexical').trim() || 'lexical';
  const id = resolveSrsCardId({
    termDe: cleanCorrected,
    cardType: 'grammar_error',
    errorCategory: normalizedCat,
  });
  if (!id) return null;

  const now = Date.now();
  const existing = deckCache.cards[id];
  if (existing) {
    const nextCount = (Number(existing.grammarErrorMeta?.occurrenceCount) || 1) + 1;
    const updated = {
      ...existing,
      translationEs: translationEs || existing.translationEs || explanationEs || '',
      grammarErrorMeta: {
        userUtteranceDe: normalizeDeKey(userUtteranceDe || existing.grammarErrorMeta?.userUtteranceDe || ''),
        correctedDe: cleanCorrected,
        errorCategory: normalizedCat,
        explanationEs: String(explanationEs || existing.grammarErrorMeta?.explanationEs || '').trim(),
        occurrenceCount: nextCount,
      },
      state: 'relearning',
      reps: 0,
      lapses: (Number(existing.lapses) || 0) + 1,
      intervalDays: 0,
      nextReviewAt: now,
      updatedAt: now,
    };
    deckCache.cards[id] = updated;
    return updated;
  }

  const created = {
    id,
    cardType: 'grammar_error',
    termDe: cleanCorrected,
    audioDe: cleanCorrected,
    translationEs: String(translationEs || explanationEs || '').trim(),
    axis: VALID_AXES.has(axis) ? axis : 'general',
    source: VALID_SOURCES.has(source) ? source : 'tutor_chat',
    sourceRef: sourceRef ? String(sourceRef) : null,
    grammarErrorMeta: {
      userUtteranceDe: normalizeDeKey(userUtteranceDe || ''),
      correctedDe: cleanCorrected,
      errorCategory: normalizedCat,
      explanationEs: String(explanationEs || '').trim(),
      occurrenceCount: 1,
    },
    state: 'new',
    reps: 0,
    lapses: 0,
    easeFactor: 2.5,
    intervalDays: 0,
    createdAt: now,
    lastReviewedAt: null,
    nextReviewAt: now,
    updatedAt: now,
  };
  deckCache.cards[id] = created;
  return created;
}

/**
 * Captura una palabra individual al mazo SRS.
 */
export async function captureVocabToSrs(item) {
  await hydrateSrsDeck();
  const card = upsertVocabCardInCache(item || {});
  if (!card) return null;
  deckCache.updatedAt = Date.now();
  scheduleLocalSrsPersist();
  scheduleSrsCloudSync([card.id]);
  dispatchSrsUpdated();
  return card;
}

/**
 * Captura o re-prioriza un error gramatical capturado en conversación.
 */
export async function captureGrammarErrorToSrs(errItem) {
  await hydrateSrsDeck();
  const card = upsertGrammarErrorInCache(errItem || {});
  if (!card) return null;
  deckCache.updatedAt = Date.now();
  scheduleLocalSrsPersist();
  scheduleSrsCloudSync([card.id]);
  dispatchSrsUpdated();
  return card;
}

/**
 * Captura en lote atómico vocabulario y errores gramaticales al cerrar Chat, Roleplay, Frase o Llamada.
 */
export async function captureConversationBundle({
  vocabItems = [],
  grammarErrors = [],
  axis = 'general',
  source = 'tutor_chat',
  sourceRef = null,
}) {
  await hydrateSrsDeck();
  const savedCards = [];

  for (const v of vocabItems) {
    if (!v || !v.de && !v.termDe) continue;
    const card = upsertVocabCardInCache({
      termDe: v.termDe || v.de,
      audioDe: v.audioDe || v.exampleDe || v.de || v.termDe,
      translationEs: v.translationEs || v.es || '',
      axis: v.axis || axis,
      source: v.source || source,
      sourceRef: v.sourceRef || sourceRef,
    });
    if (card) savedCards.push(card);
  }

  for (const err of grammarErrors) {
    const corrected = err?.correctedDe || err?.corrected;
    if (!corrected) continue;
    const card = upsertGrammarErrorInCache({
      userUtteranceDe: err.userAttempt || err.userSaid || err.original || '',
      correctedDe: corrected,
      errorCategory: err.type || err.category || err.errorCategory || 'lexical',
      explanationEs: err.explanationEs || '',
      translationEs: err.translationEs || err.explanationEs || '',
      axis: err.axis || axis,
      source: err.source || source,
      sourceRef: err.sourceRef || sourceRef,
    });
    if (card) savedCards.push(card);
  }

  if (savedCards.length > 0) {
    deckCache.updatedAt = Date.now();
    await flushLocalSrsPersist();
    scheduleSrsCloudSync(savedCards.map((c) => c.id));
    dispatchSrsUpdated();
  }

  return {
    savedCount: savedCards.length,
    savedCards,
  };
}

/**
 * Registra la calificación SM-2 tras repasar una tarjeta SRS (Quiz o Flashcards).
 */
export async function reviewSrsCard(cardId, ratingOrQuality, fallbackCreatePayload = null) {
  await hydrateSrsDeck();
  let existing = deckCache.cards[cardId];

  if (!existing && fallbackCreatePayload?.termDe) {
    existing = upsertVocabCardInCache(fallbackCreatePayload);
  }
  if (!existing) return null;

  const reviewed = applySm2Review(existing, ratingOrQuality, Date.now());
  deckCache.cards[existing.id] = reviewed;
  deckCache.updatedAt = Date.now();

  scheduleLocalSrsPersist();
  scheduleSrsCloudSync([existing.id]);
  dispatchSrsUpdated();

  recordDailyStudyActivity().catch(() => {});
  const qVal = typeof ratingOrQuality === 'number' ? ratingOrQuality : ratingOrQuality === 'again' ? 1 : 4;
  if (reviewed.cardType === 'vocabulary' && qVal >= 3) {
    recordCardStudied(existing.id).catch(() => {});
  }

  return reviewed;
}

/**
 * Obtiene la cola priorizada de tarjetas vencidas listas para repasar.
 */
export async function getDueSrsQueue(options = {}) {
  await hydrateSrsDeck();
  return sortDueSrsCards(Object.values(deckCache.cards), options.nowMs || Date.now(), options);
}

/**
 * Lectura asíncrona de estadísticas SRS garantizando hidratación previa.
 */
export async function getSrsStats() {
  await hydrateSrsDeck();
  return computeSrsStats(deckCache.cards);
}

/**
 * Lectura síncrona instantánea para badges/contadores antes de completar hidratación IDB.
 */
export function getSrsStatsSync() {
  if (deckCache.hydrated) {
    return computeSrsStats(deckCache.cards);
  }
  try {
    const raw = safeGetLocalStorage(SRS_SUMMARY_LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback vacío
  }
  return {
    total: 0,
    vocabCount: 0,
    errorCount: 0,
    dueNow: 0,
    dueErrors: 0,
    dueVocab: 0,
    mastered: 0,
    learning: 0,
  };
}
