/**
 * srsMath.js — Núcleo puro SM-2, deduplicación por getSafeId y cola de repaso espaciado.
 * Sin dependencias de navegador ni Firebase para permitir verificación unitaria directa en Node.
 */

export const DAY_MS = 86_400_000;
export const RELEARN_MS = 10 * 60_000;

export const QUALITY_MAP = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

/**
 * Codificación URL-safe idéntica a helpers.js (`getSafeId`) acotada a 150 caracteres.
 */
export function encodeSrsSafeId(str) {
  return btoa(encodeURIComponent(String(str)))
    .replace(/[/+=]/g, '_')
    .substring(0, 150);
}

/**
 * Normaliza un término alemán manteniendo su ortografía, artículos y diéresis.
 */
export function normalizeDeKey(raw = '') {
  return String(raw).trim().replace(/\s+/g, ' ');
}

/**
 * Resuelve el ID canónico SRS evitando colisiones entre vocabulario léxico y errores gramaticales.
 */
export function resolveSrsCardId({
  termDe,
  cardType = 'vocabulary',
  errorCategory = 'lexical',
  masterVocabLookup = null,
}) {
  const clean = normalizeDeKey(termDe);
  if (!clean) return null;

  if (cardType === 'grammar_error') {
    const signature = `err::${errorCategory || 'lexical'}::${clean.toLowerCase()}`;
    return encodeSrsSafeId(signature);
  }

  if (masterVocabLookup instanceof Map) {
    const exactMatch = masterVocabLookup.get(clean.toLowerCase());
    if (exactMatch) {
      return encodeSrsSafeId(exactMatch);
    }
  }

  return encodeSrsSafeId(clean);
}

/**
 * Evalúa una tarjeta bajo el algoritmo SM-2 ligero calibrado para alemán A1–A2.
 */
export function applySm2Review(card, ratingOrQuality, nowMs = Date.now()) {
  const q =
    typeof ratingOrQuality === 'number'
      ? Math.max(0, Math.min(5, ratingOrQuality))
      : QUALITY_MAP[ratingOrQuality] ?? 4;

  let {
    reps = 0,
    lapses = 0,
    easeFactor = 2.5,
    intervalDays = 0,
  } = card || {};

  if (q < 3) {
    reps = 0;
    lapses += 1;
    easeFactor = Math.max(1.3, Number((easeFactor - 0.2).toFixed(2)));
    intervalDays = 0;
    const state = (card?.reps || 0) > 0 ? 'relearning' : 'learning';
    return {
      ...card,
      state,
      reps,
      lapses,
      easeFactor,
      intervalDays,
      lastReviewedAt: nowMs,
      nextReviewAt: nowMs + RELEARN_MS,
      updatedAt: nowMs,
    };
  }

  const deltaEf = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  easeFactor = Math.min(2.8, Math.max(1.3, Number((easeFactor + deltaEf).toFixed(2))));

  if (q === 3) {
    if (reps === 0) intervalDays = 1;
    else if (reps === 1) intervalDays = 3;
    else intervalDays = Math.max(intervalDays + 1, Math.round(intervalDays * 1.2));
    reps += 1;
  } else if (q === 4) {
    reps += 1;
    if (reps === 1) intervalDays = 1;
    else if (reps === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
  } else {
    reps += 1;
    if (reps === 1) intervalDays = 4;
    else if (reps === 2) intervalDays = 8;
    else intervalDays = Math.round(intervalDays * easeFactor * 1.3);
  }

  intervalDays = Math.min(3650, Math.max(1, intervalDays));

  return {
    ...card,
    state: 'review',
    reps,
    lapses,
    easeFactor,
    intervalDays,
    lastReviewedAt: nowMs,
    nextReviewAt: nowMs + intervalDays * DAY_MS,
    updatedAt: nowMs,
  };
}

/**
 * Fusión LWW determinista entre versión local y remota de una tarjeta SRS.
 */
export function mergeSrsCards(localCard, cloudCard) {
  if (!localCard) return cloudCard;
  if (!cloudCard) return localCard;

  const localUpdated = Number(localCard.updatedAt) || 0;
  const cloudUpdated = Number(cloudCard.updatedAt) || 0;

  let winner = cloudUpdated > localUpdated ? cloudCard : localCard;
  if (cloudUpdated === localUpdated) {
    const localWork = (Number(localCard.reps) || 0) + (Number(localCard.lapses) || 0);
    const cloudWork = (Number(cloudCard.reps) || 0) + (Number(cloudCard.lapses) || 0);
    winner = cloudWork > localWork ? cloudCard : localCard;
  }

  const mergedOccurrence = Math.max(
    Number(localCard.grammarErrorMeta?.occurrenceCount) || 0,
    Number(cloudCard.grammarErrorMeta?.occurrenceCount) || 0
  );

  if (winner.cardType === 'grammar_error' && winner.grammarErrorMeta) {
    return {
      ...winner,
      grammarErrorMeta: {
        ...winner.grammarErrorMeta,
        occurrenceCount: Math.max(1, mergedOccurrence),
      },
    };
  }
  return winner;
}

/**
 * Ordena las tarjetas vencidas priorizando errores gramaticales recurrentes y luego vocabulario sobrevencido.
 */
export function sortDueSrsCards(cardsList = [], nowMs = Date.now(), { limit = 20, axis = null, cardType = null } = {}) {
  const due = cardsList.filter((card) => {
    if (!card || !card.id) return false;
    if (axis && card.axis !== axis) return false;
    if (cardType && card.cardType !== cardType) return false;
    return Number(card.nextReviewAt || 0) <= nowMs;
  });

  due.sort((a, b) => {
    const aIsErr = a.cardType === 'grammar_error';
    const bIsErr = b.cardType === 'grammar_error';
    if (aIsErr !== bIsErr) return aIsErr ? -1 : 1;

    if (aIsErr && bIsErr) {
      const occDiff =
        (Number(b.grammarErrorMeta?.occurrenceCount) || 1) -
        (Number(a.grammarErrorMeta?.occurrenceCount) || 1);
      if (occDiff !== 0) return occDiff;
      return (Number(a.nextReviewAt) || 0) - (Number(b.nextReviewAt) || 0);
    }

    const aOverdueRatio =
      (nowMs - (Number(a.nextReviewAt) || nowMs)) /
      Math.max(DAY_MS, (Number(a.intervalDays) || 1) * DAY_MS);
    const bOverdueRatio =
      (nowMs - (Number(b.nextReviewAt) || nowMs)) /
      Math.max(DAY_MS, (Number(b.intervalDays) || 1) * DAY_MS);
    return bOverdueRatio - aOverdueRatio;
  });

  return limit > 0 ? due.slice(0, limit) : due;
}

/**
 * Calcula estadísticas agregadas del mazo SRS.
 */
export function computeSrsStats(cardsMap = {}, nowMs = Date.now()) {
  const values = Object.values(cardsMap || {});
  let dueNow = 0;
  let dueErrors = 0;
  let dueVocab = 0;
  let errorCount = 0;
  let vocabCount = 0;
  let mastered = 0;
  let learning = 0;

  for (const card of values) {
    if (!card || !card.id) continue;
    const isErr = card.cardType === 'grammar_error';
    if (isErr) errorCount += 1;
    else vocabCount += 1;

    if (Number(card.nextReviewAt || 0) <= nowMs) {
      dueNow += 1;
      if (isErr) dueErrors += 1;
      else dueVocab += 1;
    }

    if ((Number(card.intervalDays) || 0) >= 21 && (Number(card.reps) || 0) >= 3) {
      mastered += 1;
    } else {
      learning += 1;
    }
  }

  return {
    total: values.length,
    vocabCount,
    errorCount,
    dueNow,
    dueErrors,
    dueVocab,
    mastered,
    learning,
    updatedAt: nowMs,
  };
}
