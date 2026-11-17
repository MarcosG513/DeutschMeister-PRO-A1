import { useMemo, useRef, useState } from 'react';
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
  GraduationCap,
  Headphones,
  LayoutGrid,
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
import { drivingAcademyClasses } from '../data/drivingAcademyCurriculum';

const EXPLORER_TABS = [
  { id: 'chapters', labelPrefix: 'Capítulos', icon: BookOpen },
  { id: 'studyPlan', labelPrefix: 'Clases Magistrales', icon: GraduationCap },
  { id: 'goethe', labelPrefix: 'Módulos Goethe', icon: Trophy },
];

const QUICK_SCENARIO_CHAPTER_IDS = [
  { id: 3, label: 'Kap. 3 · Personas' },
  { id: 8, label: 'Kap. 8 · Comida' },
  { id: 13, label: 'Kap. 13 · Auto' },
  { id: 17, label: 'Kap. 17 · IT y Digital' },
  { id: 18, label: 'Kap. 18 · Solar/Técnico' },
];

/**
 * Página de inicio y Centro de Mando Pedagógico de DeutschMeister PRO A1.
 * Presenta métricas reales del ecosistema, continuidad inteligente (`dm_last_activity`),
 * cuatro rutas guiadas de aprendizaje, guía de herramientas cognitivas y explorador por pestañas.
 */
export default function HomeDashboard({
  user,
  accessRole = 'user',
  chapters = [],
  studyPlanModules = [],
  goetheModules = [],
  studiedCardsCount = 0,
  totalUniqueCardsCount = 0,
  lastActivity = null,
  streakSummary = null,
  skillProgress = null,
  srsStats = null,
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

  const firstMasterClass = studyPlanModules[0] || {
    id: 'sp_1',
    title: 'Capítulo 1: La Célula Sintáctica, V2 y Cambio Vocálico',
  };

  const quickScenarioChapters = useMemo(
    () =>
      QUICK_SCENARIO_CHAPTER_IDS.filter((item) => chapterMap.has(item.id)).map((item) => ({
        ...item,
        chapter: chapterMap.get(item.id),
      })),
    [chapterMap]
  );

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
        categoryLabel: 'Clase Magistral · Plan de Estudios',
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
        categoryLabel: 'Preparación Oficial Goethe A1',
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
        roleplay: { label: 'Simulador de Rol IA', emoji: '🎭', title: 'Conversación con Misiones A1', sub: 'Practica situaciones reales con diagnóstico SRS' },
        phrase: { label: 'Modo Frase/Diálogo', emoji: '💬', title: 'Diálogos Guiados A1', sub: 'Responde paso a paso con pistas y micrófono' },
        reading: { label: 'Leselabor PRO', emoji: '📖', title: 'Comprensión Lectora Graduada', sub: 'Lectura interactiva con karaoke Charon' },
        quiz: { label: 'Quiz Dinámico', emoji: '🎮', title: 'Evaluación Rápida A1 / SRS', sub: 'Pon a prueba vocabulario y errores' },
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

  const progressPercentage =
    totalUniqueCardsCount > 0
      ? Math.min(100, Math.round((studiedCardsCount / totalUniqueCardsCount) * 100))
      : 0;

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
      tabRefs.current[nextTabId]?.focus();
    }
  };

  return (
    <div className="space-y-8 pb-6 animate-in fade-in duration-300">
      {/* =====================================================================
          BLOQUE 1: HERO DE BIENVENIDA + CONTINUIDAD INTELIGENTE
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
                {accessRole === 'admin' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/35">
                    <Award size={13} aria-hidden="true" />
                    <span>Administrador</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10">
                  <span>Progreso global: {studiedCardsCount} / {totalUniqueCardsCount} ({progressPercentage}%)</span>
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
                ¡Hallo, <span className="text-amber-400">{firstName}</span>! Tu centro de mando para dominar el Alemán A1
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl [text-wrap:pretty]">
                Aquí no memorizas listas sueltas sin contexto: combinas arquitectura gramatical visual, voz neural alemana sin artefactos metálicos, cuentos interactivos y práctica de conversación diseñada para aprobar el Goethe A1 y comunicarte en la vida real.
              </p>
            </div>

            {/* Píldoras de métricas reales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 min-w-0">
                <BookOpen size={18} className="text-amber-400 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {chapters.length} Capítulos • {totalTermsCount.toLocaleString('es-ES')} términos
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Vocabulario general, técnico y Redemittel
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
                    Simuladores mecánicos y exámenes oficiales
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 min-w-0">
                <Car size={18} className="text-emerald-400 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {drivingAcademyClasses.length} Clases Conducción • 100% Offline
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Mandos al volante y sincronización IndexedDB
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta inteligente de continuidad / primer paso */}
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

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
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
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full gap-4">
                <div className="space-y-2.5 min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Primer paso recomendado</span>
                  </span>
                  <h3 className="text-lg font-extrabold text-white leading-snug [text-wrap:balance]">
                    Comienza por la Ruta 1: la lógica V2 del alemán en 10 minutos
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                    Antes de memorizar vocabulario, abre{' '}
                    <span className="font-semibold text-white">{firstMasterClass.title}</span> para descubrir por qué el verbo siempre manda en la Posición 2.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenStudyPlan?.(firstMasterClass.id)}
                    className="min-h-[44px] flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <span>Iniciar Clase 1</span>
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
          MEDIDOR REAL DE 4 HABILIDADES + RACHA L-D Y PRÁCTICA INMERSIVA IA
      ====================================================================== */}
      <section aria-label="Habilidades y Práctica Inmersiva" className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                Tu equilibrio A1 en 4 habilidades
              </h3>
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

        {/* Tarjetas de acceso rápido a Práctica Inmersiva IA (2x2 móvil, 4 cols desktop) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600 shrink-0" aria-hidden="true" />
              <span>Práctica Inmersiva IA</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Incluido sin paywalls
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('phrase')}
              className="min-h-[84px] p-3.5 rounded-2xl border-2 border-sky-200 bg-sky-50/70 hover:bg-sky-100/70 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <MessageCircle size={18} className="text-sky-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-600 text-white truncate">
                  Activo · Mic
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Modo Frase</div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  Diálogos con pistas ES y misiones SRS
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('podcast')}
              className="min-h-[84px] p-3.5 rounded-2xl border border-violet-200 bg-violet-50/60 hover:bg-violet-100/70 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <Headphones size={18} className="text-violet-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-violet-200 text-violet-900 truncate">
                  Fase 2 · Audio
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">Micro-Pódcasts</div>
                <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  Episodios cortos offline + Karaoke
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('call')}
              className="min-h-[84px] p-3.5 rounded-2xl border border-emerald-500/40 bg-slate-900 hover:bg-slate-800 text-white transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <PhoneCall size={18} className="text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 truncate">
                  Fase 3 · Voz
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
              className="min-h-[84px] p-3.5 rounded-2xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/70 transition text-left flex flex-col justify-between gap-2 cursor-pointer min-w-0"
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <Camera size={18} className="text-amber-700 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 truncate">
                  Fase 3 · Visión
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
        </div>
      </section>

      {/* =====================================================================
          BLOQUE 2: 4 RUTAS DE APRENDIZAJE GUIADAS
      ====================================================================== */}
      <section aria-labelledby="routes-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2
              id="routes-heading"
              className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 [text-wrap:balance]"
            >
              <Compass className="text-indigo-600 shrink-0" size={24} aria-hidden="true" />
              <span>¿Qué camino quieres iniciar hoy?</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1 [text-wrap:pretty]">
              Elige la secuencia que mejor encaja con tu nivel, tu objetivo y el tiempo que tienes ahora mismo.
            </p>
          </div>
        </div>

        <nav aria-label="Rutas de aprendizaje recomendadas" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* RUTA 1: DESDE CERO */}
          <article className="bg-white rounded-2xl border-2 border-emerald-200/80 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <span>🟢 Ruta 1 · Paso a paso</span>
                  </span>
                  <h3 className="text-lg font-black text-slate-900 pt-1 [text-wrap:balance]">
                    Empieza Desde Cero (Principiante Absoluto)
                  </h3>
                </div>
              </div>

              <dl className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div>
                  <dt className="font-bold text-slate-800 inline">Para quién es: </dt>
                  <dd className="inline">
                    Quienes arrancan desde cero o sienten que las reglas del alemán están sueltas y sin orden.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-800 inline">Pasos (1 → 2 → 3): </dt>
                  <dd className="inline">
                    Clase Magistral 1 (V2) → Flashcards Kapitel 1 (Alfabeto y Números) → Escuchar tu primer Cuento IA con karaoke.
                  </dd>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 text-emerald-950 text-xs leading-relaxed">
                  <span className="font-bold">Por qué funciona: </span>
                  Primero fijas la estructura mental de la frase alemana, luego anclas sonido/imagen en memoria y finalmente integras el vocabulario en una historia real.
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenStudyPlan?.('sp_1')}
                className="min-h-[44px] flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <GraduationCap size={16} aria-hidden="true" />
                <span>1. Clase 1 (V2)</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenChapter?.(1, 'flashcards')}
                className="min-h-[44px] flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LayoutGrid size={16} aria-hidden="true" />
                <span>2. Flashcards Kap. 1</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenChapterStory?.(1)}
                className="min-h-[44px] w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={16} aria-hidden="true" />
                <span>3. Escuchar Cuento IA Kap. 1 (Karaoke)</span>
              </button>
            </div>
          </article>

          {/* RUTA 2: VIDA DIARIA Y TRABAJO */}
          <article className="bg-white rounded-2xl border-2 border-sky-200/80 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full">
                  <span>🔵 Ruta 2 · Enfoque Práctico</span>
                </span>
                <h3 className="text-lg font-black text-slate-900 pt-1 [text-wrap:balance]">
                  Alemán Práctico, Vida Diaria y Trabajo Técnico
                </h3>
              </div>

              <dl className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div>
                  <dt className="font-bold text-slate-800 inline">Para quién es: </dt>
                  <dd className="inline">
                    Quienes necesitan frases útiles hoy para trámites, compras, restaurante, conducción o trabajo técnico/IT/solar.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-800 inline">Pasos (1 → 2 → 3): </dt>
                  <dd className="inline">
                    Frases hechas (Kapitel 22) → Vocabulario de tu contexto diario → Práctica conversacional guiada.
                  </dd>
                </div>
                <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-2.5 text-sky-950 text-xs leading-relaxed">
                  <span className="font-bold">Por qué funciona: </span>
                  Hablar fluido nace de dominar bloques comunicativos completos (<em>Redemittel</em>) y ponerlos a prueba en situaciones simuladas con retroalimentación inmediata.
                </div>
              </dl>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => onOpenChapter?.(22, 'flashcards')}
                className="min-h-[44px] w-full bg-sky-600 hover:bg-sky-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} aria-hidden="true" />
                <span>1. Abrir Kapitel 22: Redemittel & Comunicación</span>
              </button>

              <div className="flex flex-wrap gap-1.5">
                {quickScenarioChapters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenChapter?.(item.id, 'flashcards')}
                    className="min-h-[44px] px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-900 border border-slate-200 text-xs font-semibold transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenSpecialView?.('roleplay')}
                  className="min-h-[44px] bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold px-3 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={15} aria-hidden="true" />
                  <span>Simulador de Rol IA</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenTutor}
                  className="min-h-[44px] bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold px-3 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Bot size={15} aria-hidden="true" />
                  <span>Tutor IA 24/7</span>
                </button>
              </div>
            </div>
          </article>

          {/* RUTA 3: EXAMEN OFICIAL GOETHE A1 */}
          <article className="bg-white rounded-2xl border-2 border-purple-200/80 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                  <span>🟣 Ruta 3 · Certificación Oficial</span>
                </span>
                <h3 className="text-lg font-black text-slate-900 pt-1 [text-wrap:balance]">
                  Preparación Examen Oficial Goethe-Zertifikat A1
                </h3>
              </div>

              <dl className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div>
                  <dt className="font-bold text-slate-800 inline">Para quién es: </dt>
                  <dd className="inline">
                    Candidatos que buscan aprobar Start Deutsch 1 con seguridad en las 4 pruebas oficiales sin sorpresas.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-800 inline">Pasos (1 → 2 → 3): </dt>
                  <dd className="inline">
                    Módulos oficiales (Hören, Lesen, Schreiben, Sprechen) → Lectura graduada en Leselabor → Validación con Quiz.
                  </dd>
                </div>
                <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2.5 text-purple-950 text-xs leading-relaxed">
                  <span className="font-bold">Por qué funciona: </span>
                  Entrenas el formato exacto de formularios, correos formales, preguntas orales y trampas auditivas del examen real bajo el mismo techo.
                </div>
              </dl>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-2 gap-2">
                {goetheModules.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => onOpenGoetheModule?.(mod.id)}
                    className="min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlayCircle size={15} className="shrink-0" aria-hidden="true" />
                    <span className="truncate">{mod.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenSpecialView?.('reading')}
                  className="min-h-[44px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen size={15} aria-hidden="true" />
                  <span>Abrir Leselabor</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenSpecialView?.('quiz')}
                  className="min-h-[44px] bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold px-3 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Gamepad2 size={15} aria-hidden="true" />
                  <span>Quiz Dinámico</span>
                </button>
              </div>
            </div>
          </article>

          {/* RUTA 4: MODO CONDUCCIÓN (FAHRMODUS) */}
          <article className="bg-white rounded-2xl border-2 border-amber-200/80 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  <span>🟠 Ruta 4 · Manos Libres / Audio</span>
                </span>
                <h3 className="text-lg font-black text-slate-900 pt-1 [text-wrap:balance]">
                  Aprende Conduciendo o Sin Mirar la Pantalla (Fahrmodus)
                </h3>
              </div>

              <dl className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div>
                  <dt className="font-bold text-slate-800 inline">Para quién es: </dt>
                  <dd className="inline">
                    Ideal para tus trayectos en coche, caminatas, gimnasio o momentos sin poder leer la pantalla.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-800 inline">Pasos (1 → 2 → 3): </dt>
                  <dd className="inline">
                    Inicia Fahrmodus → Elige entre {drivingAcademyClasses.length} clases audio-coach o cualquier capítulo → Responde en voz alta antes de oír la solución.
                  </dd>
                </div>
                <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-2.5 text-amber-950 text-xs leading-relaxed">
                  <span className="font-bold">Por qué funciona: </span>
                  La recuperación activa oral durante las pausas guiadas automatiza artículos (<em>der/den</em>), verbos y reflejos auditivos con mandos del coche compatibles (Android Auto y MediaSession).
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={() => onOpenSpecialView?.('driving')}
              className="min-h-[44px] w-full bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-extrabold px-4 py-3 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Car size={18} aria-hidden="true" />
              <span>Lanzar Modo Conducción (Fahrmodus)</span>
            </button>
          </article>
        </nav>
      </section>

      {/* =====================================================================
          BLOQUE 3: MAPA COMPLETO DE HERRAMIENTAS Y BENEFICIO COGNITIVO
      ====================================================================== */}
      <section aria-labelledby="tools-heading" className="space-y-4">
        <div>
          <h2
            id="tools-heading"
            className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 [text-wrap:balance]"
          >
            <Sparkles className="text-amber-500 shrink-0" size={24} aria-hidden="true" />
            <span>Todas tus herramientas y cómo aceleran tu aprendizaje</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1 [text-wrap:pretty]">
            Cada módulo ataca una habilidad distinta de tu cerebro: memoria visual, oído, síntesis gramatical y producción oral.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Herramienta 1 */}
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-indigo-700 font-black text-base">
                <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 shrink-0">
                  <Mic size={18} aria-hidden="true" />
                </div>
                <h3 className="[text-wrap:balance]">Flashcards 3D + Micrófono</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed [text-wrap:pretty]">
                Tarjetas con imagen didáctica, frase real de ejemplo, audio nativo Charon, guía fonética y evaluación en vivo de tu pronunciación al hablar.
              </p>
              <p className="text-xs font-semibold text-indigo-900 bg-indigo-50/70 rounded-lg px-2.5 py-1.5">
                Beneficio: codifica imagen, significado, oído y articulación vocal al mismo tiempo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChapter?.(activeChapterFallbackId, 'flashcards')}
              className="min-h-[44px] w-full bg-slate-100 hover:bg-indigo-600 text-slate-800 hover:text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LayoutGrid size={16} aria-hidden="true" />
              <span>Abrir Flashcards</span>
            </button>
          </article>

          {/* Herramienta 2 */}
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-slate-800 font-black text-base">
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
                  <List size={18} aria-hidden="true" />
                </div>
                <h3 className="[text-wrap:balance]">Tablas Maestras Filtrables</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed [text-wrap:pretty]">
                Listado completo por capítulos y categorías gramaticales con búsqueda instantánea en los {chapters.length} capítulos y reproducción directa por fila.
              </p>
              <p className="text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg px-2.5 py-1.5">
                Beneficio: visión panorámica ideal para comparar artículos, conjugaciones y familias de palabras.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChapter?.(activeChapterFallbackId, 'table')}
              className="min-h-[44px] w-full bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <List size={16} aria-hidden="true" />
              <span>Explorar en Tabla</span>
            </button>
          </article>

          {/* Herramienta 3 */}
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-blue-700 font-black text-base">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 shrink-0">
                  <GraduationCap size={18} aria-hidden="true" />
                </div>
                <h3 className="[text-wrap:balance]">Simuladores Mecánicos ({studyPlanModules.length} Clases)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed [text-wrap:pretty]">
                Laboratorios interactivos donde ensamblas frases V2, activas Acusativo/Dativo, ajustas relojes alemanes y practicas formularios paso a paso.
              </p>
              <p className="text-xs font-semibold text-blue-900 bg-blue-50/70 rounded-lg px-2.5 py-1.5">
                Beneficio: transforma teoría gramatical abstracta en intuición mecánica inmediata.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenStudyPlan?.(firstMasterClass.id)}
              className="min-h-[44px] w-full bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <GraduationCap size={16} aria-hidden="true" />
              <span>Abrir Plan de Estudios</span>
            </button>
          </article>

          {/* Herramienta 4 */}
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-violet-700 font-black text-base">
                <div className="p-2 rounded-xl bg-violet-50 border border-violet-100 shrink-0">
                  <Headphones size={18} aria-hidden="true" />
                </div>
                <h3 className="[text-wrap:balance]">Cuentos IA Contextuales (Karaoke)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed [text-wrap:pretty]">
                Hasta 3 historias persistentes por capítulo escritas con el vocabulario de esa lección, resaltado karaoke sincronizado y velocidad 0.75x / 0.85x / 1.0x.
              </p>
              <p className="text-xs font-semibold text-violet-900 bg-violet-50/70 rounded-lg px-2.5 py-1.5">
                Beneficio: consolida palabras aisladas viéndolas vivir dentro de una historia real.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChapterStory?.(1)}
              className="min-h-[44px] w-full bg-slate-100 hover:bg-violet-600 text-slate-800 hover:text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} aria-hidden="true" />
              <span>Escuchar Cuento IA (Kap. 1)</span>
            </button>
          </article>

          {/* Herramienta 5 */}
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-teal-700 font-black text-base">
                <div className="p-2 rounded-xl bg-teal-50 border border-teal-100 shrink-0">
                  <BookOpen size={18} aria-hidden="true" />
                </div>
                <h3 className="[text-wrap:balance]">Leselabor & Tagesgeschichten</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed [text-wrap:pretty]">
                Laboratorio editorial en 4 pestañas: Lectura + Audio Karaoke, Glosario interactivo, Gramática viva extraída del texto y Test de comprensión.
              </p>
              <p className="text-xs font-semibold text-teal-900 bg-teal-50/70 rounded-lg px-2.5 py-1.5">
                Beneficio: entrena lectura rápida e inferencia A1 para la prueba Lesen sin diccionario.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenSpecialView?.('reading')}
              className="min-h-[44px] w-full bg-slate-100 hover:bg-teal-600 text-slate-800 hover:text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen size={16} aria-hidden="true" />
              <span>Abrir Leselabor</span>
            </button>
          </article>

          {/* Herramienta 6 */}
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 min-w-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-amber-700 font-black text-base">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 shrink-0">
                  <Bot size={18} aria-hidden="true" />
                </div>
                <h3 className="[text-wrap:balance]">Tutor IA, Roleplay y Quiz</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed [text-wrap:pretty]">
                Profesor socrático disponible 24/7 con historial guardado, simulador de escenas reales y exámenes dinámicos adaptados a tu capítulo activo.
              </p>
              <p className="text-xs font-semibold text-amber-900 bg-amber-50/70 rounded-lg px-2.5 py-1.5">
                Beneficio: resuelve dudas al segundo y te entrena a producir respuestas activas en alemán.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={onOpenTutor}
                className="min-h-[44px] bg-slate-100 hover:bg-amber-500 text-slate-800 hover:text-slate-950 font-bold px-2 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Bot size={14} aria-hidden="true" />
                <span>Tutor</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenSpecialView?.('roleplay')}
                className="min-h-[44px] bg-slate-100 hover:bg-purple-600 text-slate-800 hover:text-white font-bold px-2 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>Rol</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenSpecialView?.('quiz')}
                className="min-h-[44px] bg-slate-100 hover:bg-yellow-500 text-slate-800 hover:text-slate-950 font-bold px-2 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Gamepad2 size={14} aria-hidden="true" />
                <span>Quiz</span>
              </button>
            </div>
          </article>

          {/* Herramienta 7 (destacada a ancho completo en desktop o tarjeta en grilla) */}
          <article className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-xs flex flex-col justify-between gap-4 md:col-span-2 lg:col-span-3 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-base">
                  <WifiOff size={18} className="shrink-0" aria-hidden="true" />
                  <h3>Sincronización 100% Offline & Control de Velocidad WSOLA</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl [text-wrap:pretty]">
                  Descarga imágenes, audios HD Charon (tarjetas, lecturas y cuentos de capítulo) a la memoria offline del dispositivo (IndexedDB) y configura tu velocidad global (0.75x / 0.85x / 1.0x) sin eco metálico.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenSpecialView?.('profile')}
                className="min-h-[44px] shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <User size={16} aria-hidden="true" />
                <span>Abrir Mi Perfil y Medios Offline</span>
              </button>
            </div>
          </article>
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
              Salta directamente a cualquier capítulo, clase magistral o prueba Goethe desde aquí.
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
                aria-controls={`explorer-panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveExplorerTab(tab.id)}
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

        {/* Panel 2: Plan de Estudios */}
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
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onOpenStudyPlan?.(mod.id)}
                className="min-h-[44px] w-full flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-indigo-300 hover:bg-indigo-50/50 transition text-left cursor-pointer min-w-0"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                      Clase Magistral · {slideCount} bloques
                    </span>
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0" aria-hidden="true" />
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
