import { memo, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  Bot,
  Camera,
  Car,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Headphones,
  LayoutGrid,
  Link2,
  List,
  MessageCircle,
  Mic,
  PenTool,
  PhoneCall,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  Volume2,
  WifiOff,
} from 'lucide-react';
import { DRIVING_ACADEMY_CLASS_COUNT } from '../data/drivingAcademyMeta';
import { countUniqueVocabularyCards } from '../utils/helpers';
import {
  computeStageProgress,
  getRecommendedNextStep,
} from '../utils/learningPathEngine';

const EXPLORER_TABS = [
  { id: 'chapters', labelPrefix: 'Capítulos', icon: BookOpen },
  { id: 'studyPlan', labelPrefix: 'Clases Magistrales', icon: GraduationCap },
  { id: 'goethe', labelPrefix: 'Módulos Goethe', icon: Trophy },
];

const QUICK_SCENARIO_CHAPTER_IDS = [
  { id: 3, label: 'Kap. 3 · Personas' },
  { id: 8, label: 'Kap. 8 · Comida' },
  { id: 13, label: 'Kap. 13 · Auto' },
  { id: 16, label: 'Kap. 16 · Trabajo/Examen' },
  { id: 17, label: 'Kap. 17 · IT y Digital' },
  { id: 18, label: 'Kap. 18 · Solar/Indoor' },
  { id: 20, label: 'Kap. 20 · Herramientas' },
];

const STAGE_UI_META = [
  {
    level: 'A1',
    title: 'Etapa 1 · Cimientos A1',
    desc: 'Posición V2, género, acusativo, dativo, tiempos base y cortesía.',
    fallbackId: 'sp_1',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    barClass: 'bg-emerald-500',
    cardBorder: 'border-emerald-200 hover:border-emerald-400',
  },
  {
    level: 'A2',
    title: 'Etapa 2 · Puente A2 & DTZ',
    desc: 'Verbos + preposición, da-/wo-, ob/W-Frage, modales en Präteritum y trámites.',
    fallbackId: 'sp_a2_1',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
    barClass: 'bg-sky-500',
    cardBorder: 'border-sky-200 hover:border-sky-400',
  },
  {
    level: 'B1',
    title: 'Etapa 3 · Dominio B1 & Técnica',
    desc: 'Nebensätze (weil, obwohl, damit), cohesión lógica, Plusquamperfekt y Passiv.',
    fallbackId: 'sp_13',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    barClass: 'bg-amber-500',
    cardBorder: 'border-amber-200 hover:border-amber-400',
  },
];

/**
 * Centro de Mando Pedagógico Progresivo A1–B1 (v3.1).
 * Integra perfil diagnóstico CEFR, mapa de 3 etapas sin bloqueos, 4 habilidades + laboratorios SRS
 * y explorador por pestañas accesibles.
 */
function HomeDashboard({
  user,
  accessRole = 'user',
  chapters = [],
  studyPlanModules = [],
  goetheModules = [],
  studiedCardsCount = 0,
  totalUniqueCardsCount,
  lastActivity = null,
  streakSummary = null,
  skillProgress = null,
  srsStats = null,
  learningProfile = null,
  completedModuleIds = [],
  studiedCardIds = [],
  onOpenOnboarding,
  onStartSrsReview,
  onOpenChapter,
  onOpenStudyPlan,
  onOpenGoetheModule,
  onOpenSpecialView,
  onOpenTutor,
  onOpenChapterStory,
}) {
  const [activeExplorerTab, setActiveExplorerTab] = useState('chapters');
  const tabRefs = useRef({});

  const firstName = useMemo(() => {
    const raw = user?.displayName?.trim();
    if (!raw) return 'Estudiante';
    return raw.split(/\s+/)[0] || 'Estudiante';
  }, [user]);

  const totalTermsCount = useMemo(
    () => chapters.reduce((acc, chap) => acc + (chap.words?.length || 0), 0),
    [chapters]
  );

  const chapterMap = useMemo(() => {
    const map = new Map();
    chapters.forEach((chap) => map.set(Number(chap.id), chap));
    return map;
  }, [chapters]);

  const quickScenarioChapters = useMemo(
    () =>
      QUICK_SCENARIO_CHAPTER_IDS.filter((item) => chapterMap.has(item.id)).map((item) => ({
        ...item,
        chapter: chapterMap.get(item.id),
      })),
    [chapterMap]
  );

  const stageProgress = useMemo(
    () =>
      computeStageProgress({
        completedModuleIds,
        studyPlanModules,
        goetheModules,
        studiedCardIds,
        chapters,
      }),
    [completedModuleIds, studyPlanModules, goetheModules, studiedCardIds, chapters]
  );

  const recommendedStep = useMemo(
    () =>
      getRecommendedNextStep({
        learningProfile: learningProfile || undefined,
        completedModuleIds,
        studyPlanModules,
        goetheModules,
        srsStats,
        lastActivity,
      }),
    [learningProfile, completedModuleIds, studyPlanModules, goetheModules, srsStats, lastActivity]
  );

  const launchRecommendedStep = (step) => {
    if (!step) return;
    if (step.actionType === 'srs') {
      onStartSrsReview?.();
    } else if (step.actionType === 'studyPlan') {
      onOpenStudyPlan?.(step.targetId);
    } else if (step.actionType === 'goethe') {
      onOpenGoetheModule?.(step.targetId);
    } else if (step.actionType === 'special') {
      onOpenSpecialView?.(step.targetId);
    } else if (step.actionType === 'chapter') {
      onOpenChapter?.(step.targetId, 'flashcards');
    }
  };

  const resumeContext = useMemo(() => {
    if (!lastActivity?.type || lastActivity?.id === undefined || lastActivity?.id === null) {
      return null;
    }
    if (lastActivity.type === 'chapter') {
      const chap = chapterMap.get(Number(lastActivity.id));
      if (!chap) return null;
      return {
        categoryLabel: 'Tabla Maestra y Flashcards',
        emoji: chap.emoji || '📘',
        title: chap.title,
        subtitle: `${chap.words?.length || 0} términos listos para practicar con voz HD Charon`,
        ctaLabel: 'Retomar capítulo',
        onLaunch: () => onOpenChapter?.(chap.id, 'flashcards'),
      };
    }
    if (lastActivity.type === 'studyPlan') {
      const mod = studyPlanModules.find((m) => m.id === lastActivity.id);
      if (!mod) return null;
      return {
        categoryLabel: `Clase Magistral · ${mod.cefrLevel || 'A1'}`,
        emoji: '🎓',
        title: mod.title,
        subtitle: `${mod.slides?.length || 0} diapositivas interactivas y simuladores`,
        ctaLabel: 'Retomar clase magistral',
        onLaunch: () => onOpenStudyPlan?.(mod.id),
      };
    }
    if (lastActivity.type === 'goethe') {
      const mod = goetheModules.find((g) => g.id === lastActivity.id);
      if (!mod) return null;
      return {
        categoryLabel: 'Preparación Oficial Goethe / DTZ',
        emoji: '🏛️',
        title: mod.title,
        subtitle: mod.desc || 'Entrenamiento oficial con simulador integrado',
        ctaLabel: 'Retomar módulo Goethe',
        onLaunch: () => onOpenGoetheModule?.(mod.id),
      };
    }
    if (lastActivity.type === 'special') {
      const specialMeta = {
        driving: { label: 'Modo Conducción', emoji: '🚗', title: 'Fahrmodus Manos Libres', sub: 'Retoma tus clases guiadas en audio' },
        roleplay: { label: 'Simulador de Rol IA', emoji: '🎭', title: 'Conversación con Misiones A1–B1', sub: 'Practica situaciones reales y laborales con diagnóstico SRS' },
        call: { label: 'Modo Llamada Hands-Free', emoji: '📞', title: 'Llamada OLED con Charon', sub: 'Habla por voz con WSOLA y evaluación SRS al colgar' },
        photo: { label: 'Modo Foto Multimodal', emoji: '📸', title: 'Describe Escenas Reales', sub: 'Analiza fotos con Gemini Vision y capta vocabulario SRS' },
        phrase: { label: 'Modo Frase y Diálogo', emoji: '💬', title: 'Frases Satzklammer & Turnos', sub: 'Construye oraciones y dialoga paso a paso con Charon' },
        podcast: { label: 'Micro-Pódcasts Offline', emoji: '🎙️', title: 'Pódcasts Karaoke Charon', sub: 'Episodios A1–B1 offline a 0.75x / 0.85x / 1.0x' },
        reading: { label: 'Leselabor PRO', emoji: '📖', title: 'Comprensión Lectora Graduada', sub: 'Lectura interactiva A1–B1 con karaoke Charon' },
        quiz: { label: 'Quiz Dinámico', emoji: '🎮', title: 'Evaluación Rápida A1–B1 / SRS', sub: 'Pon a prueba vocabulario y errores' },
        verb_prep_lab: { label: 'Laboratorio Gramatical', emoji: '🔗', title: 'Verbos + Preposición & da-/wo-', sub: 'Rección A2–B1 conectada al repaso SRS' },
        syntax_lab: { label: 'Laboratorio Gramatical', emoji: '🔀', title: 'Transformación Sintáctica A2–B1', sub: 'Subordinadas, modales y Passiv al SRS' },
      }[lastActivity.id];
      if (!specialMeta) return null;
      return {
        categoryLabel: specialMeta.label,
        emoji: specialMeta.emoji,
        title: specialMeta.title,
        subtitle: specialMeta.sub,
        ctaLabel: 'Continuar práctica',
        onLaunch: () => onOpenSpecialView?.(lastActivity.id),
      };
    }
    return null;
  }, [lastActivity, chapterMap, studyPlanModules, goetheModules, onOpenChapter, onOpenStudyPlan, onOpenGoetheModule, onOpenSpecialView]);

  const activeChapterFallbackId =
    resumeContext && lastActivity?.type === 'chapter' ? Number(lastActivity.id) : chapters[0]?.id || 1;

  const resolvedTotalUniqueCardsCount = useMemo(() => {
    const provided = Number(totalUniqueCardsCount);
    if (Number.isFinite(provided) && provided > 0) return provided;
    return countUniqueVocabularyCards(chapters);
  }, [totalUniqueCardsCount, chapters]);

  const progressPercentage =
    resolvedTotalUniqueCardsCount > 0
      ? Math.min(100, Math.round((studiedCardsCount / resolvedTotalUniqueCardsCount) * 100))
      : 0;

  const completedModulesSet = useMemo(
    () => new Set(completedModuleIds || []),
    [completedModuleIds]
  );

  const handleTabKeyDown = (event, currentIndex) => {
    const count = EXPLORER_TABS.length;
    let nextIndex = null;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % count;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + count) % count;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = count - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const nextTabId = EXPLORER_TABS[nextIndex].id;
      setActiveExplorerTab(nextTabId);
      const nextTabEl = tabRefs.current[nextTabId];
      nextTabEl?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      nextTabEl?.focus();
    }
  };

  const activeLevel = learningProfile?.startingLevel || 'A1';

  return (
    <div className="space-y-8 pb-6 animate-in fade-in duration-300">
      {/* =====================================================================
          BLOQUE 1: HERO PERSONALIZADO + SIGUIENTE ACCIÓN INTELIGENTE
      ====================================================================== */}
      <section
        aria-labelledby="home-hero-heading"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-5 sm:p-8 shadow-xl border border-slate-800"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 min-w-0">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Acceso Verificado</span>
                </span>
                <div
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-black bg-indigo-500/20 text-indigo-100 border border-indigo-400/30"
                  aria-label={`Niveles activos A1, A2 y B1. Prioridad actual ${activeLevel}`}
                >
                  {['A1', 'A2', 'B1'].map((lvl) => (
                    <span
                      key={lvl}
                      className={`px-1.5 py-0.5 rounded ${
                        activeLevel === lvl
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'bg-white/10 text-slate-200'
                      }`}
                    >
                      {lvl}
                    </span>
                  ))}
                </div>
                {typeof onOpenOnboarding === 'function' && (
                  <button
                    type="button"
                    onClick={() => onOpenOnboarding()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-300/30 transition cursor-pointer"
                  >
                    <Compass size={13} aria-hidden="true" />
                    <span>Ruta {activeLevel} · Diagnóstico</span>
                  </button>
                )}
                {accessRole === 'admin' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/35">
                    <Award size={13} aria-hidden="true" />
                    <span>Administrador</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10">
                  <span>Progreso: {studiedCardsCount} / {resolvedTotalUniqueCardsCount} ({progressPercentage}%)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-400/15 text-amber-300 border border-amber-400/30 whitespace-nowrap">
                  <Flame size={13} aria-hidden="true" />
                  <span>
                    {streakSummary?.currentStreak || 0}d · {streakSummary?.todayActions || 0}/{streakSummary?.dailyTarget || 5} hoy
                  </span>
                </span>
                {(srsStats?.dueNow || 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => onStartSrsReview?.()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500 hover:bg-indigo-400 text-white border border-indigo-300/40 transition cursor-pointer whitespace-nowrap"
                  >
                    <BookMarked size={13} aria-hidden="true" />
                    <span>Repasar {srsStats.dueNow} en SRS</span>
                  </button>
                )}
              </div>

              <h2
                id="home-hero-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight [text-wrap:balance]"
              >
                ¡Hallo, <span className="text-amber-400">{firstName}</span>! Tu centro de mando para dominar el Alemán A1–B1
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl [text-wrap:pretty]">
                Avanza sin candados por una ruta escalonada desde Posición V2 hasta el Puente A2/DTZ (verbos con preposición, <em>da-/wo-</em>, <em>ob</em>) y B1 (<em>Nebensätze</em> y <em>Vorgangspassiv</em>), con voz HD Charon y memoria SRS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 min-w-0">
                <BookOpen size={18} className="text-amber-400 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {chapters.length} Capítulos • {totalTermsCount.toLocaleString('es-ES')} términos
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Vocabulario general, DTZ y técnico indoor
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 min-w-0">
                <Volume2 size={18} className="text-sky-400 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    Voz HD Charon • 0.75x / 0.85x / 1.0x
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Motor DSP WSOLA limpio para habla humana
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 min-w-0">
                <GraduationCap size={18} className="text-indigo-300 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {studyPlanModules.length} Clases Magistrales + {goetheModules.length} Goethe
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Simuladores A1, Puente A2/DTZ y B1
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 min-w-0">
                <Car size={18} className="text-emerald-400 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {DRIVING_ACADEMY_CLASS_COUNT} Clases Conducción • 100% Offline
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Mandos al volante y sincronización IndexedDB
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta inteligente de continuidad / siguiente paso recomendado */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 min-w-0">
            {resumeContext ? (
              <div className="flex flex-col justify-between h-full gap-4">
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                      <Clock size={14} aria-hidden="true" />
                      <span>Retomar tu estudio</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-full truncate">
                      {resumeContext.categoryLabel}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
                      {resumeContext.emoji}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug [text-wrap:balance]">
                        {resumeContext.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed [text-wrap:pretty]">
                        {resumeContext.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={resumeContext.onLaunch}
                      className="min-h-[44px] flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm cursor-pointer"
                    >
                      <span>{resumeContext.ctaLabel}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenSpecialView?.('driving')}
                      className="min-h-[44px] bg-slate-800/90 hover:bg-slate-800 text-emerald-300 border border-emerald-400/30 font-bold px-3.5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer shrink-0"
                    >
                      <Car size={16} aria-hidden="true" />
                      <span>Fahrmodus</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => launchRecommendedStep(recommendedStep)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-indigo-200 transition flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span className="truncate">
                      Sugerido ({recommendedStep.cefrLevel}): <strong>{recommendedStep.title}</strong>
                    </span>
                    <ArrowRight size={13} className="shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full gap-4">
                <div className="space-y-2.5 min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                    <Sparkles size={14} aria-hidden="true" />
                    <span>{recommendedStep.badge}</span>
                  </span>
                  <h3 className="text-lg font-extrabold text-white leading-snug [text-wrap:balance]">
                    {recommendedStep.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    {recommendedStep.subtitle}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => launchRecommendedStep(recommendedStep)}
                    className="min-h-[44px] flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <span>{recommendedStep.ctaLabel}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenChapter?.(1, 'flashcards')}
                    className="min-h-[44px] bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-3.5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer shrink-0"
                  >
                    <LayoutGrid size={16} aria-hidden="true" />
                    <span>Flashcards Kap. 1</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOQUE 2: MAPA PROGRESIVO DE 3 ETAPAS (A1 → A2 → B1) + RUTAS
      ====================================================================== */}
      <section aria-labelledby="stages-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2
              id="stages-heading"
              className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 [text-wrap:balance]"
            >
              <Compass className="text-indigo-600 shrink-0" size={24} aria-hidden="true" />
              <span>Mapa Progresivo A1 → A2 → B1</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1 [text-wrap:pretty]">
              Progresa etapa por etapa o entra directo a la clase que necesites (0 bloqueos).
            </p>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
            Currículo completado: {stageProgress.totalCurriculumCompleted} / {stageProgress.totalCurriculumModules} ({stageProgress.curriculumPercent}%)
          </span>
        </div>

        {/* 3 Etapas Progresivas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {STAGE_UI_META.map((meta) => {
            const st = stageProgress.stages?.[meta.level] || {
              completedCount: 0,
              totalCount: 0,
              percent: 0,
              modules: [],
              completedIds: [],
            };
            const doneSet = new Set(st.completedIds || []);
            const nextInStage =
              (st.modules || []).find((m) => !doneSet.has(m.id)) ||
              st.modules?.[0] ||
              { id: meta.fallbackId };

            return (
              <article
                key={meta.level}
                className={`bg-white rounded-2xl border-2 p-4 sm:p-5 shadow-xs transition flex flex-col justify-between gap-3 ${meta.cardBorder}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${meta.badgeClass}`}>
                      {meta.level}
                    </span>
                    <span className="text-xs font-extrabold text-slate-600">
                      {st.completedCount}/{st.totalCount} clases ({st.percent}%)
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900">{meta.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{meta.desc}</p>
                </div>

                <div className="space-y-2.5">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${meta.barClass}`}
                      style={{ width: `${st.percent}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenStudyPlan?.(nextInStage.id)}
                    className="min-h-[40px] w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {st.completedCount > 0 && st.completedCount < st.totalCount
                        ? `Continuar ${meta.level}`
                        : `Abrir etapa ${meta.level}`}
                    </span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Accesos directos de contextos: Vida Diaria/Enpal indoor + Goethe/DTZ + Fahrmodus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          <article className="bg-white rounded-2xl border border-sky-200 p-4 shadow-xs flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <MessageCircle size={17} className="text-sky-600 shrink-0" aria-hidden="true" />
                <span>Vida Diaria, DTZ y Taller Indoor</span>
              </h3>
              <p className="text-xs text-slate-600">
                Accede directo a los capítulos más consultados (<em>Redemittel</em> Kap. 22, StVO Auto, Solar Indoor).
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickScenarioChapters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenChapter?.(item.id, 'flashcards')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-900 border border-slate-200 text-xs font-semibold transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenChapter?.(22, 'flashcards')}
              className="min-h-[40px] w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
            >
              Abrir Kapitel 22: Redemittel
            </button>
          </article>

          <article className="bg-white rounded-2xl border border-purple-200 p-4 shadow-xs flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <Trophy size={17} className="text-purple-600 shrink-0" aria-hidden="true" />
                <span>Examen Oficial Goethe &amp; DTZ</span>
              </h3>
              <p className="text-xs text-slate-600">
                Las 4 pruebas oficiales con simulacro A1 y pestañas Puente A2/DTZ integradas.
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {goetheModules.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => onOpenGoetheModule?.(mod.id)}
                    className="min-h-[38px] bg-purple-600 hover:bg-purple-700 text-white font-bold px-2.5 py-1.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlayCircle size={14} className="shrink-0" aria-hidden="true" />
                    <span className="truncate">{mod.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('quiz')}
              className="min-h-[40px] w-full bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
            >
              Quiz Rápido A1–B1 / SRS
            </button>
          </article>

          <article className="bg-slate-900 text-white rounded-2xl border border-emerald-500/40 p-4 shadow-xs flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-black text-emerald-300 flex items-center gap-2">
                <Car size={18} className="shrink-0" aria-hidden="true" />
                <span>Fahrmodus Manos Libres</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {DRIVING_ACADEMY_CLASS_COUNT} clases audio-coach en 4 olas + cola de repaso SRS vencido al volante, 100% offline.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('driving')}
              className="min-h-[42px] w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Car size={16} aria-hidden="true" />
              <span>Lanzar Fahrmodus</span>
            </button>
          </article>
        </div>
      </section>

      {/* =====================================================================
          BLOQUE 3: 4 HABILIDADES + LABORATORIOS SRS Y PRÁCTICA INMERSIVA IA
      ====================================================================== */}
      <section aria-labelledby="skills-heading" className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 id="skills-heading" className="text-base sm:text-lg font-black text-slate-900">
                Tu equilibrio A1–B1 en 4 habilidades
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Calculado en tiempo real según tu actividad; toca cualquier habilidad para entrenarla ahora.
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0" aria-label="Actividad semanal Lunes a Domingo">
              {(streakSummary?.weekDays || []).map((wd) => (
                <span
                  key={wd.key}
                  className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center border ${
                    wd.active
                      ? 'bg-amber-400 border-amber-500 text-slate-950'
                      : wd.isToday
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}
                >
                  {wd.key}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                data: skillProgress?.speaking,
                fallbackLabel: 'Hablar',
                fallbackTarget: 'roleplay',
                icon: Mic,
                barClass: 'bg-emerald-500',
                badgeClass: 'text-emerald-700 bg-emerald-50',
              },
              {
                data: skillProgress?.listening,
                fallbackLabel: 'Escuchar',
                fallbackTarget: 'driving',
                icon: Headphones,
                barClass: 'bg-sky-500',
                badgeClass: 'text-sky-700 bg-sky-50',
              },
              {
                data: skillProgress?.writing,
                fallbackLabel: 'Escribir',
                fallbackTarget: 'quiz',
                icon: PenTool,
                barClass: 'bg-indigo-500',
                badgeClass: 'text-indigo-700 bg-indigo-50',
              },
              {
                data: skillProgress?.reading,
                fallbackLabel: 'Leer',
                fallbackTarget: 'reading',
                icon: BookOpen,
                barClass: 'bg-amber-500',
                badgeClass: 'text-amber-800 bg-amber-50',
              },
            ].map(({ data, fallbackLabel, fallbackTarget, icon: IconComp, barClass, badgeClass }) => {
              const pct = data?.percent ?? 0;
              const target = data?.quickTargetView || fallbackTarget;
              return (
                <button
                  key={fallbackLabel}
                  type="button"
                  onClick={() => onOpenSpecialView?.(target)}
                  className="min-h-[64px] p-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50/60 hover:bg-white transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
                >
                  <div className="flex items-center justify-between gap-1.5 w-full">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800 truncate">
                      <IconComp size={14} className="shrink-0 text-slate-600" aria-hidden="true" />
                      <span>{data?.label || fallbackLabel}</span>
                    </span>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${barClass}`} style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Práctica Inmersiva IA + Laboratorios Gramaticales v3.1 */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600 shrink-0" aria-hidden="true" />
              <span>Laboratorios A2–B1 &amp; Práctica Inmersiva IA</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Conectado a SRS
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('verb_prep_lab')}
              className="min-h-[84px] p-3.5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100/80 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <Link2 size={18} className="text-indigo-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-600 text-white truncate">
                  A2–B1 · SRS
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Verbos + Preposición</div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  Rektion, Akk/Dat y da-/wo- (18 ejercicios)
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('syntax_lab')}
              className="min-h-[84px] p-3.5 rounded-2xl border-2 border-fuchsia-200 bg-fuchsia-50/70 hover:bg-fuchsia-100/70 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <GitBranch size={18} className="text-fuchsia-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-fuchsia-600 text-white truncate">
                  A2–B1 · SRS
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Laboratorio Sintaxis</div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  ob, obwohl, deshalb y Vorgangspassiv
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('phrase')}
              className="min-h-[84px] p-3.5 rounded-2xl border-2 border-sky-200 bg-sky-50/70 hover:bg-sky-100/70 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <MessageCircle size={18} className="text-sky-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-600 text-white truncate">
                  Frase + Diálogo
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Modo Frase</div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  Orden Satzklammer, turnos y Mic + SRS
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('podcast')}
              className="min-h-[84px] p-3.5 rounded-2xl border-2 border-violet-200 bg-violet-50/70 hover:bg-violet-100/70 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <Headphones size={18} className="text-violet-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-violet-600 text-white truncate">
                  Activo · 0.75x
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Micro-Pódcasts</div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  Episodios offline + Karaoke + Test
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('call')}
              className="min-h-[84px] p-3.5 rounded-2xl border-2 border-emerald-500/60 bg-slate-900 hover:bg-slate-800 text-white transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <PhoneCall size={18} className="text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 truncate">
                  Activo · Voz
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white leading-tight">Modo Llamada</div>
                <div className="text-[11px] text-slate-300 leading-snug mt-0.5">
                  Llamada manos libres Charon WSOLA
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('photo')}
              className="min-h-[84px] p-3.5 rounded-2xl border-2 border-amber-300 bg-amber-50/80 hover:bg-amber-100/80 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <Camera size={18} className="text-amber-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 truncate">
                  Activo · Visión
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Modo Foto</div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  Describe tu entorno y capta SRS
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              type="button"
              onClick={() => onOpenChapter?.(activeChapterFallbackId, 'flashcards')}
              className="min-h-[42px] bg-white hover:bg-indigo-50 text-slate-800 border border-slate-200 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LayoutGrid size={14} aria-hidden="true" />
              <span>Flashcards</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenChapterStory?.(activeChapterFallbackId)}
              className="min-h-[42px] bg-white hover:bg-violet-50 text-slate-800 border border-slate-200 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>Cuento IA</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('reading')}
              className="min-h-[42px] bg-white hover:bg-teal-50 text-slate-800 border border-slate-200 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen size={14} aria-hidden="true" />
              <span>Leselabor</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('roleplay')}
              className="min-h-[42px] bg-white hover:bg-purple-50 text-slate-800 border border-slate-200 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Gamepad2 size={14} aria-hidden="true" />
              <span>Rol IA</span>
            </button>
            <button
              type="button"
              onClick={onOpenTutor}
              className="min-h-[42px] col-span-2 sm:col-span-1 bg-white hover:bg-amber-50 text-slate-800 border border-slate-200 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Bot size={14} aria-hidden="true" />
              <span>Tutor 24/7</span>
            </button>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <WifiOff size={17} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Descarga audios Charon, cuentos e imágenes a IndexedDB y ajusta tu velocidad WSOLA (0.75x / 0.85x / 1.0x).
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('profile')}
              className="min-h-[38px] shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <User size={14} aria-hidden="true" />
              <span>Mi Perfil Offline</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOQUE 4: EXPLORADOR RÁPIDO POR PESTAÑAS ACCESIBLES (WAI-ARIA TABS)
      ====================================================================== */}
      <section
        aria-labelledby="explorer-heading"
        className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 id="explorer-heading" className="text-lg sm:text-xl font-black text-slate-900">
              Explorador rápido del currículo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Salta directamente a cualquier capítulo, clase magistral ({studyPlanModules.length}) o prueba Goethe / DTZ.
            </p>
          </div>
        </div>

        {/* Pestañas en una sola fila con scroll horizontal y subraya no basada solo en color */}
        <div
          role="tablist"
          aria-label="Categorías del currículo"
          className="flex flex-nowrap items-center gap-2 overflow-x-auto border-b border-slate-200 pb-px"
        >
          {EXPLORER_TABS.map((tab, idx) => {
            const TabIcon = tab.icon;
            const isSelected = activeExplorerTab === tab.id;
            const count =
              tab.id === 'chapters'
                ? chapters.length
                : tab.id === 'studyPlan'
                  ? studyPlanModules.length
                  : goetheModules.length;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                id={`explorer-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  setActiveExplorerTab(tab.id);
                  tabRefs.current[tab.id]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                }}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`min-h-[44px] shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/70 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-t-xl'
                }`}
              >
                <TabIcon size={16} aria-hidden="true" />
                <span>{tab.labelPrefix}</span>
                <span
                  className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel 1: Capítulos */}
        <div
          id="explorer-panel-chapters"
          role="tabpanel"
          aria-labelledby="explorer-tab-chapters"
          hidden={activeExplorerTab !== 'chapters'}
          className={
            activeExplorerTab === 'chapters'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1'
              : 'hidden'
          }
        >
          {chapters.map((chap) => {
            const cleanTitle = chap.title.replace(/^(Capítulo|Kapitel)\s+\d+:\s*/i, '');
            const wordCount = chap.words?.length || 0;
            return (
              <div
                key={chap.id}
                className="flex items-stretch gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-indigo-300 hover:bg-indigo-50/40 transition p-1.5 min-w-0"
              >
                <button
                  type="button"
                  onClick={() => onOpenChapter?.(chap.id, 'flashcards')}
                  className="min-h-[44px] flex-1 flex items-center gap-2.5 px-2.5 py-1.5 text-left min-w-0 cursor-pointer rounded-lg"
                >
                  <span className="text-xl shrink-0" aria-hidden="true">
                    {chap.emoji || '📘'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                      Kapitel {chap.id} · {wordCount} términos
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      {cleanTitle}
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChapter?.(chap.id, 'table')}
                  title={`Ver Kapitel ${chap.id} en formato tabla`}
                  aria-label={`Ver Kapitel ${chap.id} en formato tabla`}
                  className="min-h-[44px] min-w-[44px] shrink-0 flex items-center justify-center rounded-lg bg-white hover:bg-slate-800 text-slate-500 hover:text-white border border-slate-200 transition cursor-pointer"
                >
                  <List size={15} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Panel 2: Plan de Estudios (dinámico por mod.cefrLevel) */}
        <div
          id="explorer-panel-studyPlan"
          role="tabpanel"
          aria-labelledby="explorer-tab-studyPlan"
          hidden={activeExplorerTab !== 'studyPlan'}
          className={
            activeExplorerTab === 'studyPlan'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1'
              : 'hidden'
          }
        >
          {studyPlanModules.map((mod, index) => {
            const firstSubtitle = mod.slides?.[0]?.subtitle;
            const slideCount = mod.slides?.length || 0;
            const level = mod.cefrLevel || 'A1';
            const isCompleted = completedModulesSet.has(mod.id);
            const badgeStyle =
              level === 'B1'
                ? 'bg-amber-100 text-amber-900 border border-amber-300/70'
                : level === 'A2'
                  ? 'bg-sky-100 text-sky-900 border border-sky-300/70'
                  : 'bg-emerald-100 text-emerald-800';
            const numBgStyle =
              level === 'B1'
                ? 'bg-amber-100 text-amber-900'
                : level === 'A2'
                  ? 'bg-sky-100 text-sky-800'
                  : 'bg-indigo-100 text-indigo-700';

            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onOpenStudyPlan?.(mod.id)}
                className="min-h-[44px] w-full flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-indigo-300 hover:bg-indigo-50/50 transition text-left cursor-pointer min-w-0"
              >
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs shrink-0 mt-0.5 ${numBgStyle}`}>
                  {mod.stageOrder || index + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 truncate">
                        {mod.stageLabel || 'Clase Magistral'} · {slideCount} bloques
                      </span>
                      <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 ${badgeStyle}`}>
                        {level}
                      </span>
                    </div>
                    <CheckCircle2
                      size={14}
                      className={`shrink-0 ${isCompleted ? 'text-emerald-600' : 'text-slate-300'}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug [text-wrap:balance]">
                    {mod.title}
                  </div>
                  {firstSubtitle && (
                    <div className="text-[11px] text-slate-500 truncate">
                      {firstSubtitle}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel 3: Módulos Goethe */}
        <div
          id="explorer-panel-goethe"
          role="tabpanel"
          aria-labelledby="explorer-tab-goethe"
          hidden={activeExplorerTab !== 'goethe'}
          className={
            activeExplorerTab === 'goethe'
              ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1'
              : 'hidden'
          }
        >
          {goetheModules.map((pres) => (
            <button
              key={pres.id}
              type="button"
              onClick={() => onOpenGoetheModule?.(pres.id)}
              className="min-h-[44px] w-full flex items-start gap-3 p-4 rounded-xl border border-purple-200/80 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-400 transition text-left cursor-pointer min-w-0"
            >
              <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0 mt-0.5">
                <Trophy size={18} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="text-sm font-black text-slate-900 leading-snug [text-wrap:balance]">
                  {pres.title}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed [text-wrap:pretty]">
                  {pres.desc || `${pres.slides?.length || 0} diapositivas de entrenamiento oficial`}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 pt-0.5">
                  <span>Iniciar entrenamiento oficial</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default memo(HomeDashboard);
