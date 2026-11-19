import test from 'node:test';
import assert from 'node:assert/strict';
import { DIAGNOSTIC_QUESTIONS } from '../src/data/diagnosticQuestions.js';
import {
  DEFAULT_LEARNING_PROFILE,
  computeStageProgress,
  evaluateDiagnosticAnswers,
  getRecommendedNextStep,
  normalizeLearningProfile,
  parseLearningProfile,
  serializeLearningProfile,
} from '../src/utils/learningPathEngine.js';

const MOCK_MODULES = [
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `sp_${i + 1}`,
    cefrLevel: 'A1',
    title: `Clase A1 #${i + 1}`,
    estimatedMinutes: 10,
    slides: [1, 2],
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `sp_a2_${i + 1}`,
    cefrLevel: 'A2',
    title: `Puente A2 #${i + 1}`,
    estimatedMinutes: 14,
    slides: [1, 2, 3],
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `sp_${i + 13}`,
    cefrLevel: 'B1',
    title: `Clase B1 #${i + 1}`,
    estimatedMinutes: 15,
    slides: [1, 2, 3],
  })),
];

const MOCK_GOETHE = [
  { id: 'g_horen', title: 'Hören', desc: 'Comprensión auditiva' },
  { id: 'g_lesen', title: 'Lesen', desc: 'Comprensión lectora' },
  { id: 'g_schreiben', title: 'Schreiben', desc: 'Expresión escrita' },
  { id: 'g_sprechen', title: 'Sprechen', desc: 'Expresión oral' },
];

test('DIAGNOSTIC_QUESTIONS exposes 5 valid A1-B1 scaled diagnostic items', () => {
  assert.deepEqual(
    DIAGNOSTIC_QUESTIONS.map((q) => q.id),
    ['diag_1', 'diag_2', 'diag_3', 'diag_4', 'diag_5']
  );

  const coveredLevels = new Set();
  for (const q of DIAGNOSTIC_QUESTIONS) {
    coveredLevels.add(q.targetLevel);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4, `Duplicate options in ${q.id}`);
    assert.ok(q.options.includes(q.correct), `Correct option missing from choices in ${q.id}`);
    assert.ok(q.promptEs.length > 5 && q.promptDe.length > 5 && q.explanationEs.length > 5);
  }
  assert.deepEqual([...coveredLevels].sort(), ['A1', 'A2', 'B1']);
});

test('evaluateDiagnosticAnswers enforces CEFR thresholds 0-1 A1, 2-3 A2 and 4-5 B1', () => {
  const buildAnswers = (correctCount) => {
    const map = {};
    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      if (idx < correctCount) {
        map[q.id] = q.correct;
      } else {
        map[q.id] = q.options.find((opt) => opt !== q.correct);
      }
    });
    return map;
  };

  assert.equal(evaluateDiagnosticAnswers(buildAnswers(0), DIAGNOSTIC_QUESTIONS).recommendedLevel, 'A1');
  assert.equal(evaluateDiagnosticAnswers(buildAnswers(1), DIAGNOSTIC_QUESTIONS).recommendedLevel, 'A1');
  assert.equal(evaluateDiagnosticAnswers(buildAnswers(2), DIAGNOSTIC_QUESTIONS).recommendedLevel, 'A2');
  assert.equal(evaluateDiagnosticAnswers(buildAnswers(3), DIAGNOSTIC_QUESTIONS).recommendedLevel, 'A2');

  const res4 = evaluateDiagnosticAnswers(buildAnswers(4), DIAGNOSTIC_QUESTIONS);
  assert.equal(res4.score, 4);
  assert.equal(res4.total, 5);
  assert.equal(res4.recommendedLevel, 'B1');
  assert.equal(res4.breakdown.length, 5);

  assert.equal(evaluateDiagnosticAnswers(buildAnswers(5), DIAGNOSTIC_QUESTIONS).recommendedLevel, 'B1');
});

test('learningProfile normalization/serialization strictly enforces 7 keys and strips hostile fields', () => {
  const clean = normalizeLearningProfile({
    startingLevel: 'A2',
    goal: 'work_daily',
    onboardingCompleted: true,
    skipped: false,
    diagnosticScore: 3,
    recommendedLevel: 'A2',
    updatedAt: 1_760_000_000_000,
    isAdmin: true,
    role: 'admin',
    extraPayload: 'ignored',
  });

  assert.deepEqual(Object.keys(clean).sort(), [
    'diagnosticScore',
    'goal',
    'onboardingCompleted',
    'recommendedLevel',
    'skipped',
    'startingLevel',
    'updatedAt',
  ]);
  assert.equal(clean.startingLevel, 'A2');
  assert.equal(clean.goal, 'work_daily');
  assert.equal(clean.diagnosticScore, 3);
  assert.equal('isAdmin' in clean, false);

  const sanitized = normalizeLearningProfile({
    startingLevel: 'C2',
    goal: 'unknown_goal',
    diagnosticScore: 99,
    recommendedLevel: 'INVALID',
    updatedAt: -10,
  });
  assert.equal(sanitized.startingLevel, 'A1');
  assert.equal(sanitized.goal, 'complete');
  assert.equal(sanitized.diagnosticScore, 5);
  assert.equal(sanitized.recommendedLevel, null);
  assert.equal(sanitized.updatedAt, 0);

  assert.equal(normalizeLearningProfile({ diagnosticScore: -4 }).diagnosticScore, 0);
  assert.equal(normalizeLearningProfile({ diagnosticScore: 'bad' }).diagnosticScore, null);

  const serialized = serializeLearningProfile(clean);
  assert.deepEqual(parseLearningProfile(serialized), clean);
  assert.equal(parseLearningProfile('{corrupt_json'), null);
  assert.equal(parseLearningProfile(''), null);
});

test('computeStageProgress counts CEFR stages cleanly while excluding readle_* and g_schreiben_teil1', () => {
  const result = computeStageProgress({
    completedModuleIds: [
      'sp_1',
      'sp_2',
      'sp_a2_1',
      'readle_story_12',
      'g_schreiben_teil1',
      'g_horen',
      'ghost_module_id',
    ],
    studyPlanModules: MOCK_MODULES,
    goetheModules: MOCK_GOETHE,
    studiedCardIds: ['id1', 'id2'],
    chapters: [{ id: 1, words: [{ de: 'Hallo' }] }],
  });

  assert.equal(result.stages.A1.totalCount, 12);
  assert.equal(result.stages.A1.completedCount, 2);
  assert.equal(result.stages.A2.totalCount, 4);
  assert.equal(result.stages.A2.completedCount, 1);
  assert.equal(result.stages.B1.totalCount, 4);
  assert.equal(result.stages.B1.completedCount, 0);
  assert.equal(result.studyPlanCompletedCount, 3);
  assert.equal(result.studyPlanTotalCount, 20);
  assert.equal(result.goetheCompletedCount, 1);
  assert.equal(result.goetheTotalCount, 4);
  assert.equal(result.totalCurriculumCompleted, 4);
});

test('getRecommendedNextStep handles SRS priority, all 4 goals, stage auto-promotion and never locks modules', () => {
  // 1. SRS takes priority when dueNow >= 5
  const srsNext = getRecommendedNextStep({
    learningProfile: { ...DEFAULT_LEARNING_PROFILE, goal: 'complete' },
    studyPlanModules: MOCK_MODULES,
    goetheModules: MOCK_GOETHE,
    srsStats: { dueNow: 5 },
  });
  assert.equal(srsNext.actionType, 'srs');
  assert.equal(srsNext.locked, false);

  // 2. Goal: handsfree
  const handsfreeNext = getRecommendedNextStep({
    learningProfile: { startingLevel: 'A2', goal: 'handsfree' },
    studyPlanModules: MOCK_MODULES,
    goetheModules: MOCK_GOETHE,
    srsStats: { dueNow: 2 },
  });
  assert.equal(handsfreeNext.actionType, 'special');
  assert.equal(handsfreeNext.targetId, 'driving');
  assert.equal(handsfreeNext.locked, false);

  // 3. Goal: exam (advances over completed Goethe modules)
  const examNext = getRecommendedNextStep({
    learningProfile: { startingLevel: 'A1', goal: 'exam' },
    completedModuleIds: ['g_horen'],
    studyPlanModules: MOCK_MODULES,
    goetheModules: MOCK_GOETHE,
  });
  assert.equal(examNext.actionType, 'goethe');
  assert.equal(examNext.targetId, 'g_lesen');
  assert.equal(examNext.locked, false);

  // 4. Goal: work_daily prioritizes A2/B1 work-relevant modules first
  const workNext = getRecommendedNextStep({
    learningProfile: { startingLevel: 'A1', goal: 'work_daily' },
    completedModuleIds: [],
    studyPlanModules: MOCK_MODULES,
    goetheModules: MOCK_GOETHE,
  });
  assert.equal(workNext.actionType, 'studyPlan');
  assert.equal(workNext.targetId, 'sp_a2_1');
  assert.equal(workNext.locked, false);

  // 5. Auto-promotion A1 -> A2 -> B1 upon stage completion
  const a1Ids = Array.from({ length: 12 }, (_, i) => `sp_${i + 1}`);
  const promotedToA2 = getRecommendedNextStep({
    learningProfile: { startingLevel: 'A1', goal: 'complete' },
    completedModuleIds: a1Ids,
    studyPlanModules: MOCK_MODULES,
    goetheModules: MOCK_GOETHE,
  });
  assert.equal(promotedToA2.targetId, 'sp_a2_1');
  assert.equal(promotedToA2.cefrLevel, 'A2');
  assert.equal(promotedToA2.locked, false);

  const a1AndA2Ids = [...a1Ids, 'sp_a2_1', 'sp_a2_2', 'sp_a2_3', 'sp_a2_4'];
  const promotedToB1 = getRecommendedNextStep({
    learningProfile: { startingLevel: 'A1', goal: 'complete' },
    completedModuleIds: a1AndA2Ids,
    studyPlanModules: MOCK_MODULES,
    goetheModules: MOCK_GOETHE,
  });
  assert.equal(promotedToB1.targetId, 'sp_13');
  assert.equal(promotedToB1.cefrLevel, 'B1');
  assert.equal(promotedToB1.locked, false);
});
