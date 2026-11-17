import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applySm2Review,
  computeSrsStats,
  DAY_MS,
  encodeSrsSafeId,
  mergeSrsCards,
  resolveSrsCardId,
  sortDueSrsCards,
} from '../src/utils/srsMath.js';

test('resolveSrsCardId deduplicates master vocabulary and isolates grammar_error entries', () => {
  const masterLookup = new Map([['der hund', 'der Hund']]);
  const vocabId = resolveSrsCardId({
    termDe: '  Der Hund ',
    cardType: 'vocabulary',
    masterVocabLookup: masterLookup,
  });
  assert.equal(vocabId, encodeSrsSafeId('der Hund'));

  const errId = resolveSrsCardId({
    termDe: 'der Hund',
    cardType: 'grammar_error',
    errorCategory: 'article',
    masterVocabLookup: masterLookup,
  });
  assert.notEqual(errId, vocabId);
});

test('applySm2Review progresses intervals cleanly on good/easy and resets on again', () => {
  const now = 1_760_000_000_000;
  const baseCard = {
    id: 'c1',
    cardType: 'vocabulary',
    state: 'new',
    reps: 0,
    lapses: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  };

  const r1 = applySm2Review(baseCard, 'good', now);
  assert.equal(r1.reps, 1);
  assert.equal(r1.intervalDays, 1);
  assert.equal(r1.state, 'review');
  assert.equal(r1.nextReviewAt, now + DAY_MS);

  const r2 = applySm2Review(r1, 'good', now + DAY_MS);
  assert.equal(r2.reps, 2);
  assert.equal(r2.intervalDays, 6);

  const failed = applySm2Review(r2, 'again', now + 7 * DAY_MS);
  assert.equal(failed.reps, 0);
  assert.equal(failed.lapses, 1);
  assert.equal(failed.state, 'relearning');
  assert.ok(failed.easeFactor >= 1.3 && failed.easeFactor < r2.easeFactor);
  assert.ok(failed.nextReviewAt < now + 7 * DAY_MS + DAY_MS);
});

test('mergeSrsCards preserves newest card and max grammar occurrenceCount', () => {
  const local = {
    id: 'err1',
    cardType: 'grammar_error',
    reps: 1,
    lapses: 1,
    updatedAt: 2000,
    grammarErrorMeta: { occurrenceCount: 2 },
  };
  const cloud = {
    id: 'err1',
    cardType: 'grammar_error',
    reps: 2,
    lapses: 1,
    updatedAt: 1000,
    grammarErrorMeta: { occurrenceCount: 4 },
  };
  const merged = mergeSrsCards(local, cloud);
  assert.equal(merged.updatedAt, 2000);
  assert.equal(merged.grammarErrorMeta.occurrenceCount, 4);
});

test('sortDueSrsCards prioritizes recurring grammar_error cards ahead of vocabulary', () => {
  const now = 1_760_000_000_000;
  const cards = [
    { id: 'v1', cardType: 'vocabulary', axis: 'general', intervalDays: 1, nextReviewAt: now - 5 * DAY_MS },
    {
      id: 'e1',
      cardType: 'grammar_error',
      axis: 'work',
      nextReviewAt: now - 1000,
      grammarErrorMeta: { occurrenceCount: 1 },
    },
    {
      id: 'e2',
      cardType: 'grammar_error',
      axis: 'work',
      nextReviewAt: now - 500,
      grammarErrorMeta: { occurrenceCount: 3 },
    },
    { id: 'future', cardType: 'vocabulary', axis: 'general', intervalDays: 1, nextReviewAt: now + DAY_MS },
  ];

  const queue = sortDueSrsCards(cards, now, { limit: 10 });
  assert.deepEqual(
    queue.map((c) => c.id),
    ['e2', 'e1', 'v1']
  );

  const stats = computeSrsStats(
    Object.fromEntries(cards.map((c) => [c.id, c])),
    now
  );
  assert.equal(stats.dueNow, 3);
  assert.equal(stats.dueErrors, 2);
  assert.equal(stats.dueVocab, 1);
});
