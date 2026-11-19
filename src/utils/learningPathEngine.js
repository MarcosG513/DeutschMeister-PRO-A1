/**
 * learningPathEngine.js — Motor puro A1→A2→B1 (ESM, sin React/Firebase/DOM)
 * Normaliza el perfil de aprendizaje acorde al esquema estricto de firestore.rules,
 * evalúa el diagnóstico de 5 preguntas, calcula progreso por etapa filtrando IDs ajenos
 * y recomienda el siguiente paso sin bloqueos (locked: false).
 */

export const VALID_LEVELS = ['A1', 'A2', 'B1'];
export const VALID_GOALS = ['complete', 'work_daily', 'exam', 'handsfree'];

export const DEFAULT_LEARNING_PROFILE = Object.freeze({
  startingLevel: 'A1',
  goal: 'complete',
  onboardingCompleted: false,
  skipped: false,
  diagnosticScore: null,
  recommendedLevel: null,
  updatedAt: 0,
});

/**
 * Normaliza estrictamente a las 7 claves exactas permitidas por isValidLearningProfileMap en firestore.rules:
 * startingLevel, goal, onboardingCompleted, skipped, diagnosticScore, recommendedLevel, updatedAt
 */
export function normalizeLearningProfile(raw = {}) {
  const src = raw && typeof raw === 'object' ? raw : {};

  let diagnosticScore = null;
  if (src.diagnosticScore !== null && src.diagnosticScore !== undefined && src.diagnosticScore !== '') {
    const parsedScore = Number(src.diagnosticScore);
    if (Number.isFinite(parsedScore)) {
      diagnosticScore = Math.max(0, Math.min(5, parsedScore));
    }
  }

  const recommendedLevel = VALID_LEVELS.includes(src.recommendedLevel)
    ? src.recommendedLevel
    : null;

  const parsedUpdated = Number(src.updatedAt);
  const updatedAt = Number.isFinite(parsedUpdated) && parsedUpdated >= 0 ? parsedUpdated : 0;

  return {
    startingLevel: VALID_LEVELS.includes(src.startingLevel) ? src.startingLevel : 'A1',
    goal: VALID_GOALS.includes(src.goal) ? src.goal : 'complete',
    onboardingCompleted: Boolean(src.onboardingCompleted),
    skipped: Boolean(src.skipped),
    diagnosticScore,
    recommendedLevel,
    updatedAt,
  };
}

export function serializeLearningProfile(profile) {
  return JSON.stringify(normalizeLearningProfile(profile));
}

export function parseLearningProfile(json) {
  if (!json || typeof json !== 'string') return null;
  try {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object') return null;
    return normalizeLearningProfile(parsed);
  } catch {
    return null;
  }
}

/**
 * Evalúa las respuestas del mini-diagnóstico (0–1 A1, 2–3 A2, 4–5 B1).
 */
export function evaluateDiagnosticAnswers(answersById = {}, questions = []) {
  const list = Array.isArray(questions) ? questions : [];
  let score = 0;
  const breakdown = list.map((q) => {
    const selected = answersById?.[q.id] ?? null;
    const isCorrect = Boolean(selected && selected === q.correct);
    if (isCorrect) score += 1;
    return {
      id: q.id,
      targetLevel: q.targetLevel,
      selected,
      correct: q.correct,
      isCorrect,
    };
  });

  let recommendedLevel = 'A1';
  if (score >= 4) recommendedLevel = 'B1';
  else if (score >= 2) recommendedLevel = 'A2';

  return {
    score,
    total: list.length,
    recommendedLevel,
    breakdown,
  };
}

/**
 * Calcula progreso por etapa CEFR (A1, A2, B1) y Goethe filtrando estrictamente IDs ajenos
 * al catálogo (p. ej. readle_*, g_schreiben_teil1).
 */
export function computeStageProgress({
  completedModuleIds = [],
  studyPlanModules = [],
  goetheModules = [],
  studiedCardIds = [],
  chapters = [],
} = {}) {
  const completedRawSet = new Set(Array.isArray(completedModuleIds) ? completedModuleIds : []);
  const studyPlanIds = new Set((studyPlanModules || []).map((m) => m?.id).filter(Boolean));
  const goetheIds = new Set((goetheModules || []).map((g) => g?.id).filter(Boolean));

  const validStudyCompleted = Array.from(completedRawSet).filter((id) => studyPlanIds.has(id));
  const validGoetheCompleted = Array.from(completedRawSet).filter((id) => goetheIds.has(id));
  const validStudySet = new Set(validStudyCompleted);

  const stages = {};
  for (const lvl of VALID_LEVELS) {
    const mods = (studyPlanModules || []).filter((m) => (m?.cefrLevel || 'A1') === lvl);
    const doneIds = mods.filter((m) => validStudySet.has(m.id)).map((m) => m.id);
    const totalCount = mods.length;
    const completedCount = doneIds.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    stages[lvl] = {
      level: lvl,
      modules: mods,
      completedIds: doneIds,
      completedCount,
      totalCount,
      percent,
    };
  }

  const totalCurriculumModules = studyPlanIds.size + goetheIds.size;
  const totalCurriculumCompleted = validStudyCompleted.length + validGoetheCompleted.length;

  const validChapterCardsSet = new Set();
  for (const ch of chapters || []) {
    for (const w of ch?.words || []) {
      if (w?.de) {
        validChapterCardsSet.add(
          btoa(encodeURIComponent(w.de)).replace(/[/+=]/g, '_').substring(0, 150)
        );
      }
    }
  }
  const studiedCardsValidCount = Array.isArray(studiedCardIds)
    ? new Set(studiedCardIds.filter((id) => validChapterCardsSet.size === 0 || validChapterCardsSet.has(id))).size
    : 0;

  return {
    stages,
    validStudyCompletedIds: validStudyCompleted,
    validGoetheCompletedIds: validGoetheCompleted,
    studyPlanCompletedCount: validStudyCompleted.length,
    studyPlanTotalCount: studyPlanIds.size,
    goetheCompletedCount: validGoetheCompleted.length,
    goetheTotalCount: goetheIds.size,
    totalCurriculumCompleted,
    totalCurriculumModules,
    curriculumPercent:
      totalCurriculumModules > 0
        ? Math.min(100, Math.round((totalCurriculumCompleted / totalCurriculumModules) * 100))
        : 0,
    studiedCardsCount: studiedCardsValidCount,
    totalUniqueCardsCount: validChapterCardsSet.size,
  };
}

/**
 * Recomienda el siguiente paso óptimo según nivel inicial, meta y progreso real.
 * Sin bloqueos ni candados (locked siempre false).
 */
export function getRecommendedNextStep({
  learningProfile = DEFAULT_LEARNING_PROFILE,
  completedModuleIds = [],
  studyPlanModules = [],
  goetheModules = [],
  srsStats = null,
} = {}) {
  const profile = normalizeLearningProfile(learningProfile);
  const completedSet = new Set(Array.isArray(completedModuleIds) ? completedModuleIds : []);

  if ((srsStats?.dueNow || 0) >= 5) {
    return {
      actionType: 'srs',
      targetId: 'srs_review',
      cefrLevel: profile.startingLevel,
      badge: 'Repaso SRS prioritario',
      title: `Tienes ${srsStats.dueNow} tarjetas vencidas listas en tu cola SRS`,
      subtitle: 'Consolidar lo que ya aprendiste multiplica tu retención a largo plazo antes de avanzar.',
      ctaLabel: `Repasar ${srsStats.dueNow} tarjetas SRS`,
      locked: false,
    };
  }

  if (profile.goal === 'handsfree') {
    return {
      actionType: 'special',
      targetId: 'driving',
      cefrLevel: profile.startingLevel,
      badge: 'Ruta Hands-Free · Auto',
      title: 'Modo Conducción Manos Libres (Fahrmodus)',
      subtitle: '12 clases guiadas en 4 olas sin pantallas y con repaso SRS al volante.',
      ctaLabel: 'Abrir Fahrmodus',
      locked: false,
    };
  }

  if (profile.goal === 'exam') {
    const nextGoethe = (goetheModules || []).find((g) => !completedSet.has(g.id)) || goetheModules?.[0];
    if (nextGoethe) {
      return {
        actionType: 'goethe',
        targetId: nextGoethe.id,
        cefrLevel: profile.startingLevel,
        badge: 'Ruta Examen Goethe / DTZ',
        title: nextGoethe.title,
        subtitle: nextGoethe.desc || 'Simulacro oficial A1 con pestaña Puente A2/DTZ integrada.',
        ctaLabel: 'Entrenar examen',
        locked: false,
      };
    }
  }

  if (profile.goal === 'work_daily') {
    const workOrder = ['sp_a2_1', 'sp_a2_4', 'sp_13', 'sp_16'];
    const pendingWorkId = workOrder.find((id) => !completedSet.has(id));
    if (pendingWorkId) {
      const workMod = (studyPlanModules || []).find((m) => m.id === pendingWorkId);
      if (workMod) {
        return {
          actionType: 'studyPlan',
          targetId: workMod.id,
          cefrLevel: workMod.cefrLevel || 'A2',
          badge: `Ruta Trabajo & Día a Día · ${workMod.cefrLevel || 'A2'}`,
          title: workMod.title,
          subtitle: 'Gramática aplicada a trámites alemanes y comunicación técnica indoor.',
          ctaLabel: 'Iniciar clase práctica',
          locked: false,
        };
      }
    }
  }

  const stageOrder =
    profile.startingLevel === 'B1'
      ? ['B1', 'A2', 'A1']
      : profile.startingLevel === 'A2'
        ? ['A2', 'B1', 'A1']
        : ['A1', 'A2', 'B1'];

  for (const lvl of stageOrder) {
    const pending = (studyPlanModules || []).find(
      (m) => (m?.cefrLevel || 'A1') === lvl && !completedSet.has(m.id)
    );
    if (pending) {
      return {
        actionType: 'studyPlan',
        targetId: pending.id,
        cefrLevel: pending.cefrLevel || lvl,
        badge: `Siguiente Clase · ${pending.cefrLevel || lvl}`,
        title: pending.title,
        subtitle: `Duración estimada: ${pending.estimatedMinutes || 12} min · ${(pending.slides || []).length} diapositivas interactivas`,
        ctaLabel: 'Continuar ruta',
        locked: false,
      };
    }
  }

  const fallbackMod = (studyPlanModules || [])[0];
  return {
    actionType: 'studyPlan',
    targetId: fallbackMod?.id || 'sp_1',
    cefrLevel: fallbackMod?.cefrLevel || 'A1',
    badge: 'Plan de Estudios Completo',
    title: fallbackMod?.title || 'Capítulo 1: La Célula Sintáctica V2',
    subtitle: 'Todas las clases completadas. Repasa cualquier tema o practica en simuladores.',
    ctaLabel: 'Repasar clase',
    locked: false,
  };
}
