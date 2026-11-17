import test from 'node:test';
import assert from 'node:assert/strict';
import { microPodcastsCatalog } from '../src/data/microPodcasts.js';
import {
  phraseConstructionDrills,
  structuredDialoguesCatalog,
} from '../src/data/structuredDialogues.js';
import { roleplayScenariosCatalog } from '../src/data/roleplayScenarios.js';
import {
  evaluateDialogueTurnAttempt,
  evaluatePhraseAttempt,
} from '../src/utils/dialogueEval.js';
import { buildSrsReviewWorkoutQueue } from '../src/utils/highwayWorkoutBuilder.js';

const FORBIDDEN_ROOF_TERMS = /dachmontage|solardach|auf dem dach/i;

test('microPodcastsCatalog covers survival & work with 3 comprehension questions and monotonic timestamps', () => {
  const axes = new Set(microPodcastsCatalog.map((ep) => ep.axis));
  assert.ok(axes.has('survival'));
  assert.ok(axes.has('work'));

  const seenIds = new Set();
  for (const ep of microPodcastsCatalog) {
    assert.ok(ep.id && !seenIds.has(ep.id), `Duplicate or missing podcast id: ${ep.id}`);
    seenIds.add(ep.id);
    assert.equal(
      ep.comprehensionQuestions.length,
      3,
      `Episode ${ep.id} must have exactly 3 comprehension questions`
    );

    let prevEnd = -1;
    for (const seg of ep.segments) {
      assert.ok(seg.startMs >= prevEnd, `Non-monotonic segment startMs in ${ep.id}`);
      assert.ok(seg.endMs > seg.startMs, `Invalid segment duration in ${ep.id}`);
      assert.ok(!FORBIDDEN_ROOF_TERMS.test(seg.de), `Forbidden outdoor roof term in ${ep.id}: ${seg.de}`);
      prevEnd = seg.endMs;
    }

    for (const q of ep.comprehensionQuestions) {
      assert.ok(Array.isArray(q.options) && q.options.length >= 3);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length);
    }
  }
});

test('structuredDialogues covers Phrase Satzklammer drills and 3-turn Dialogues across both axes', () => {
  const phraseAxes = new Set(phraseConstructionDrills.map((d) => d.axis));
  assert.ok(phraseAxes.has('survival'));
  assert.ok(phraseAxes.has('work'));

  for (const drill of phraseConstructionDrills) {
    assert.ok(Array.isArray(drill.wordBlocks) && drill.wordBlocks.length >= 3);
    const assembled = drill.wordBlocks.join(' ');
    const exactEval = evaluatePhraseAttempt(assembled, drill);
    assert.equal(exactEval.isCorrect, true, `Assembled blocks fail for ${drill.id}: ${assembled}`);
    assert.ok(!FORBIDDEN_ROOF_TERMS.test(drill.targetDe));
  }

  const dlgAxes = new Set(structuredDialoguesCatalog.map((d) => d.axis));
  assert.ok(dlgAxes.has('survival'));
  assert.ok(dlgAxes.has('work'));

  for (const dlg of structuredDialoguesCatalog) {
    assert.equal(dlg.turns.length, 3, `Dialogue ${dlg.id} must have 3 turns`);
    for (const turn of dlg.turns) {
      assert.ok(turn.promptDe && turn.sampleReplyDe);
      assert.ok(Array.isArray(turn.requiredKeywords) && turn.requiredKeywords.length >= 1);
      const okSample = evaluateDialogueTurnAttempt(turn.sampleReplyDe, turn);
      assert.equal(okSample.isCorrect, true, `Sample reply failed for ${dlg.id}/${turn.id}`);
    }
  }
});

test('roleplayScenariosCatalog provides 3 missions and Enpal indoor-only workplace scenarios', () => {
  const axes = new Set(roleplayScenariosCatalog.map((s) => s.axis));
  assert.ok(axes.has('survival'));
  assert.ok(axes.has('work'));

  const seenIds = new Set();
  for (const scen of roleplayScenariosCatalog) {
    assert.ok(scen.id && !seenIds.has(scen.id));
    seenIds.add(scen.id);
    assert.ok(scen.aiPersona && scen.openingLine && scen.prompt);
    assert.equal(scen.missions.length, 3, `Scenario ${scen.id} must have 3 missions`);
    assert.ok(!FORBIDDEN_ROOF_TERMS.test(`${scen.title} ${scen.desc} ${scen.openingLine}`));
  }
});

test('evaluatePhraseAttempt detects word-order Satzklammer errors separately from missing words', () => {
  const drill = phraseConstructionDrills[0];
  const scrambledSameWords = [...drill.wordBlocks].reverse().join(' ');
  const orderEval = evaluatePhraseAttempt(scrambledSameWords, drill);
  assert.equal(orderEval.isCorrect, false);
  assert.equal(orderEval.matchType, 'word_order');

  const partialEval = evaluatePhraseAttempt('Ich muss heute', drill);
  assert.equal(partialEval.isCorrect, false);
  assert.ok(partialEval.missingTokens.length > 0);
});

test('buildSrsReviewWorkoutQueue transforms overdue SRS cards into Fahrmodus workout steps', () => {
  assert.deepEqual(buildSrsReviewWorkoutQueue([]), []);

  const cards = [
    {
      id: 'err_1',
      cardType: 'grammar_error',
      userAttempt: 'Ich muss anmelden meine Adresse',
      correctedDe: 'Ich muss meine Adresse anmelden.',
      explanationEs: 'Infinitivo al final tras verbo modal.',
      translationEs: 'Debo empadronar mi dirección.',
      axis: 'survival',
    },
    {
      id: 'voc_1',
      cardType: 'vocabulary',
      termDe: 'der Zählerschrank',
      translationEs: 'el armario de contadores',
      exampleDe: 'Das Smart Meter ist im Zählerschrank.',
      axis: 'work',
    },
  ];

  const queue = buildSrsReviewWorkoutQueue(cards, 10);
  assert.equal(queue.length, 2);
  assert.equal(queue[0].stepType, 'drill');
  assert.equal(queue[0].targetDe, 'Ich muss meine Adresse anmelden.');
  assert.equal(queue[1].stepType, 'block');
  assert.equal(queue[1].de, 'der Zählerschrank');
  assert.equal(queue[1].queueKey, 'hw_srs_1');
});
