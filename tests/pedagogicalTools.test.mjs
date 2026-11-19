import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SYNTAX_TRANSFORM_ITEMS,
  VERB_PREPOSITION_ITEMS,
} from '../src/data/pedagogicalToolsData.js';
import {
  deterministicShuffle,
  evaluateSyntaxTransformAttempt,
  evaluateVerbPrepositionAttempt,
} from '../src/utils/pedagogicalToolEvaluators.js';
import {
  FORM_SCENARIOS,
  isAnswerCorrect,
  normalizeAnswer,
} from '../src/data/goetheWritingScenarios.js';

test('VERB_PREPOSITION_ITEMS provides 18 unique drills across all 3 axes and accurate evaluators', () => {
  assert.equal(VERB_PREPOSITION_ITEMS.length, 18);

  const ids = new Set();
  const axes = new Set();
  const modes = new Set();

  for (const item of VERB_PREPOSITION_ITEMS) {
    assert.ok(item.id && !ids.has(item.id), `Duplicate or missing id: ${item.id}`);
    ids.add(item.id);
    axes.add(item.axis);
    modes.add(item.mode);
    assert.ok(item.expectedPhrase && item.explanationEs && item.fullSentenceDe);

    const exact = evaluateVerbPrepositionAttempt(item, item.expectedPhrase);
    assert.equal(exact.isCorrect, true, `Canonical expectedPhrase failed for ${item.id}`);
    assert.equal(exact.errorCode, null);

    const acceptedSet = new Set(
      [item.expectedPhrase, ...(item.acceptedAnswers || [])].map((v) => v.trim().toLowerCase())
    );
    for (const choice of item.choices || []) {
      if (!acceptedSet.has(choice.trim().toLowerCase())) {
        const wrong = evaluateVerbPrepositionAttempt(item, choice);
        assert.equal(wrong.isCorrect, false, `Distractor "${choice}" passed on ${item.id}`);
      }
    }
  }

  assert.deepEqual([...axes].sort(), ['general', 'survival', 'work']);
  assert.deepEqual([...modes].sort(), ['prep_case', 'pronominal_adverb']);

  // Specific diagnostic error codes
  const emptyRes = evaluateVerbPrepositionAttempt(VERB_PREPOSITION_ITEMS[0], '   ');
  assert.equal(emptyRes.errorCode, 'empty_attempt');

  const prepItem = VERB_PREPOSITION_ITEMS.find((i) => i.mode === 'prep_case' && i.preposition === 'auf');
  assert.ok(prepItem);
  assert.equal(evaluateVerbPrepositionAttempt(prepItem, 'für den').errorCode, 'wrong_preposition');
  assert.equal(
    evaluateVerbPrepositionAttempt(prepItem, prepItem.expectedPhrase.includes('den') ? 'auf dem' : 'auf den')
      .errorCode,
    'wrong_case_ending'
  );

  const vowelPronAdvItem = VERB_PREPOSITION_ITEMS.find(
    (i) => i.mode === 'pronominal_adverb' && /^(da|wo)r(auf|an|über|um|aus)/i.test(i.expectedPhrase)
  );
  assert.ok(vowelPronAdvItem, 'Catalog should include a da(r)-/wo(r)- item with epenthetic -r-');
  const missingR = vowelPronAdvItem.expectedPhrase.toLowerCase().replace(/^(da|wo)r/, '$1');
  assert.equal(
    evaluateVerbPrepositionAttempt(vowelPronAdvItem, missingR).errorCode,
    'missing_epenthetic_r'
  );

  const pronAdvItem = VERB_PREPOSITION_ITEMS.find((i) => i.mode === 'pronominal_adverb');
  assert.equal(
    evaluateVerbPrepositionAttempt(pronAdvItem, 'auf wen').errorCode,
    'wrong_person_vs_thing'
  );
});

test('SYNTAX_TRANSFORM_ITEMS covers 12 items across 6 categories with deterministic shuffle and syntax diagnostics', () => {
  assert.equal(SYNTAX_TRANSFORM_ITEMS.length, 12);

  const ids = new Set();
  const categories = new Set();

  for (const item of SYNTAX_TRANSFORM_ITEMS) {
    assert.ok(item.id && !ids.has(item.id), `Duplicate id in syntax items: ${item.id}`);
    ids.add(item.id);
    categories.add(item.category);

    const originalBlocks = [...item.blocks];
    const s1 = deterministicShuffle(item.blocks, item.id);
    const s2 = deterministicShuffle(item.blocks, item.id);
    assert.deepEqual(s1, s2, `deterministicShuffle must be stable for ${item.id}`);
    assert.deepEqual(item.blocks, originalBlocks, 'deterministicShuffle must not mutate input');

    const exact = evaluateSyntaxTransformAttempt(item, item.targetDe);
    assert.equal(exact.isCorrect, true, `Canonical targetDe failed for ${item.id}`);
    const fromBlocks = evaluateSyntaxTransformAttempt(item, item.blocks.join(' '));
    assert.equal(fromBlocks.isCorrect, true, `Joined blocks failed for ${item.id}`);
  }

  assert.deepEqual([...categories].sort(), [
    'double_object',
    'indirect_question',
    'konjunktionaladverb',
    'modal_praeteritum',
    'passive_voice',
    'subordinate_clause',
  ]);

  // Specific syntax diagnostics
  const indirectItem = SYNTAX_TRANSFORM_ITEMS.find((i) => i.category === 'indirect_question');
  assert.equal(
    evaluateSyntaxTransformAttempt(indirectItem, indirectItem.targetDe.replace(/[,.?]/g, '')).errorCode,
    'missing_comma'
  );
  assert.equal(
    evaluateSyntaxTransformAttempt(indirectItem, 'Ich möchte wissen, ob kommt der Bus um acht Uhr.').errorCode,
    'verb_not_final'
  );

  const modalItem = SYNTAX_TRANSFORM_ITEMS.find((i) => i.category === 'modal_praeteritum');
  assert.equal(
    evaluateSyntaxTransformAttempt(modalItem, 'Ich musste heute früh aufstehen?'.replace('musste', 'müss')).errorCode,
    'modal_umlaut_error'
  );

  const advItem = SYNTAX_TRANSFORM_ITEMS.find((i) => i.category === 'konjunktionaladverb' && i.connector === 'deshalb');
  assert.equal(
    evaluateSyntaxTransformAttempt(advItem, 'Der Zug hat Verspätung, deshalb ich komme zu spät.').errorCode,
    'missing_v2_inversion'
  );

  const passiveItem = SYNTAX_TRANSFORM_ITEMS.find((i) => i.category === 'passive_voice');
  assert.equal(
    evaluateSyntaxTransformAttempt(passiveItem, 'Der Zählerschrank ist vom Elektriker geprüft.').errorCode,
    'missing_passive_aux'
  );
});

test('FORM_SCENARIOS preserves Goethe A1 scenarios (no Überweisung accepted in S1) and adds 2 A2/DTZ scenarios', () => {
  assert.equal(FORM_SCENARIOS.length, 6);

  const a2Scenarios = FORM_SCENARIOS.filter((s) => s.cefrLevel === 'A2');
  assert.equal(a2Scenarios.length, 2, 'Expected 2 Puente A2/DTZ form scenarios');

  const s1 = FORM_SCENARIOS.find((s) => s.id === 'schwimmkurs_becker');
  assert.ok(s1);
  const s1Payment = s1.fields.find((f) => f.id === 's1_f5');
  assert.ok(s1Payment);
  assert.equal(isAnswerCorrect(s1Payment, 'Bar'), true);
  assert.equal(isAnswerCorrect(s1Payment, 'Überweisung'), false);

  for (const scenario of FORM_SCENARIOS) {
    assert.ok(scenario.fields.length >= 4, `Expected >=4 fields in ${scenario.id}`);
    for (const field of scenario.fields) {
      assert.ok(Array.isArray(field.acceptedAnswers) && field.acceptedAnswers.length >= 1);
      assert.equal(
        isAnswerCorrect(field, field.acceptedAnswers[0]),
        true,
        `acceptedAnswers[0] failed on ${scenario.id}/${field.id}`
      );
      assert.equal(isAnswerCorrect(field, ''), false);
    }
  }

  assert.equal(normalizeAnswer('Goethestraße 12'), normalizeAnswer('Goethestr. 12'));
});
