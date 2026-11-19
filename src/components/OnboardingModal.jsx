import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  Compass,
  GraduationCap,
  Sparkles,
  X,
  ArrowRight,
  RotateCcw,
  Car,
  Trophy,
  Briefcase,
  Layers,
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/diagnosticQuestions';
import {
  DEFAULT_LEARNING_PROFILE,
  evaluateDiagnosticAnswers,
  normalizeLearningProfile,
} from '../utils/learningPathEngine';

const LEVEL_OPTIONS = [
  {
    id: 'A1',
    title: 'Desde cero / A1 sólido',
    desc: 'Empezar con Posición V2, género, acusativo, dativo y supervivencia diaria.',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 'A2',
    title: 'Nivel A2 / Puente DTZ',
    desc: 'Ya conoces lo básico. Enfócate en verbos con preposición, da-/wo-, ob/W-Fragen y modales en Präteritum.',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
  },
  {
    id: 'B1',
    title: 'Nivel B1 / Trabajo técnico',
    desc: 'Domina subordinadas (obwohl, damit), konjunktionaladverbien, Passiv y debate.',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
  },
];

const GOAL_OPTIONS = [
  { id: 'complete', label: 'Dominio completo A1→B1', desc: 'Avanzar ordenadamente por todo el currículo.', icon: Layers },
  { id: 'work_daily', label: 'Trabajo y día a día en Alemania', desc: 'Priorizar trámites DTZ, citas y vocabulario técnico indoor.', icon: Briefcase },
  { id: 'exam', label: 'Aprobar examen Goethe / DTZ', desc: 'Enfoque directo en simulacros oficiales Hören/Lesen/Schreiben/Sprechen.', icon: Trophy },
  { id: 'handsfree', label: 'Estudio al volante (Fahrmodus)', desc: 'Sesiones auditivas 100% offline con Android Auto y SRS.', icon: Car },
];

export default function OnboardingModal({
  isOpen,
  initialProfile = null,
  onSaveProfile,
  onDismiss,
}) {
  const titleId = useId();
  const dialogRef = useRef(null);

  const normalizedInitial = useMemo(
    () => normalizeLearningProfile(initialProfile || DEFAULT_LEARNING_PROFILE),
    [initialProfile]
  );

  const [step, setStep] = useState('setup'); // 'setup' | 'diagnostic'
  const [startingLevel, setStartingLevel] = useState(normalizedInitial.startingLevel);
  const [goal, setGoal] = useState(normalizedInitial.goal);
  const [answersById, setAnswersById] = useState({});
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen && !prevOpen) {
    setPrevOpen(true);
    setStep('setup');
    setStartingLevel(normalizedInitial.startingLevel);
    setGoal(normalizedInitial.goal);
    setAnswersById({});
    setDiagnosticResult(null);
  } else if (!isOpen && prevOpen) {
    setPrevOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (isOpen && !dialog.open) {
      try {
        dialog.showModal();
      } catch {
        // Fallback si el entorno headless no soporta showModal en pruebas unitarias
      }
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    const handleNativeClose = () => {
      onDismiss?.();
    };
    dialog.addEventListener('close', handleNativeClose);

    // Fallback obligatorio de light-dismiss para navegadores sin HTMLDialogElement.prototype.closedBy (Safari)
    let handleBackdropClick = null;
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      handleBackdropClick = (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isDialogContent) {
          dialog.close();
        }
      };
      dialog.addEventListener('click', handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      if (handleBackdropClick) {
        dialog.removeEventListener('click', handleBackdropClick);
      }
    };
  }, [isOpen, onDismiss]);

  const handleSave = async (overrides = {}) => {
    if (saving) return;
    setSaving(true);
    try {
      const payload = normalizeLearningProfile({
        startingLevel,
        goal,
        onboardingCompleted: true,
        skipped: false,
        diagnosticScore: diagnosticResult ? diagnosticResult.score : normalizedInitial.diagnosticScore,
        recommendedLevel: diagnosticResult ? diagnosticResult.recommendedLevel : normalizedInitial.recommendedLevel,
        updatedAt: Date.now(),
        ...overrides,
      });
      await onSaveProfile?.(payload);
    } finally {
      setSaving(false);
    }
  };

  const handleSkipNow = async () => {
    await handleSave({
      startingLevel,
      goal,
      onboardingCompleted: true,
      skipped: true,
    });
  };

  const handleEvaluateDiagnostic = () => {
    const res = evaluateDiagnosticAnswers(answersById, DIAGNOSTIC_QUESTIONS);
    setDiagnosticResult(res);
    setStartingLevel(res.recommendedLevel);
  };

  const answeredCount = DIAGNOSTIC_QUESTIONS.filter((q) => Boolean(answersById[q.id])).length;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby={titleId}
      className="m-auto w-[min(94vw,680px)] max-h-[90dvh] rounded-3xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs overflow-hidden"
    >
      <div className="flex flex-col max-h-[90dvh]">
        {/* Cabecera */}
        <header className="flex items-start justify-between gap-3 px-5 sm:px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
              <Compass size={22} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                Ruta Personalizada A1–B1
              </p>
              <h1 id={titleId} className="text-base sm:text-lg font-black leading-snug">
                {step === 'setup'
                  ? 'Configura tu punto de partida (sin bloqueos)'
                  : 'Diagnóstico rápido CEFR (5 preguntas)'}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkipNow}
            aria-label="Cerrar asistente de nivel"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </header>

        {/* Cuerpo scrolleable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {step === 'setup' ? (
            <>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tu elección ordena tu pantalla de inicio y el siguiente paso recomendado.{' '}
                <strong className="text-slate-900">Todo el contenido A1, A2 y B1 sigue 100% abierto</strong> para que explores libremente cuando quieras.
              </p>

              {/* Selección de Nivel Inicial */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  1. ¿Qué nivel quieres priorizar ahora?
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {LEVEL_OPTIONS.map((opt) => {
                    const isSelected = startingLevel === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setStartingLevel(opt.id)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-black border ${opt.badgeClass}`}>
                              {opt.id}
                            </span>
                            <span className="font-extrabold text-sm text-slate-900">{opt.title}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">{opt.desc}</p>
                        </div>
                        {isSelected && <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selección de Objetivo */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  2. ¿Cuál es tu prioridad principal?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {GOAL_OPTIONS.map((g) => {
                    const GoalIcon = g.icon;
                    const isSelected = goal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setGoal(g.id)}
                        className={`p-3 rounded-2xl border-2 text-left transition flex items-start gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70'
                            : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                        }`}
                      >
                        <GoalIcon
                          size={18}
                          className={`shrink-0 mt-0.5 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                            {g.label}
                          </div>
                          <div className="text-[11px] text-slate-600 leading-snug mt-0.5">
                            {g.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Banner Diagnóstico */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-600" />
                    <span>¿Dudas entre A1, A2 o B1?</span>
                  </div>
                  <p className="text-xs text-amber-800">
                    Responde 5 frases cortas en 60 segundos y te ubicamos al instante.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('diagnostic')}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl shadow-xs transition shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <GraduationCap size={15} />
                  Hacer diagnóstico (5 preguntas)
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Respondidas: {answeredCount} / {DIAGNOSTIC_QUESTIONS.length}</span>
                <button
                  type="button"
                  onClick={() => setStep('setup')}
                  className="text-indigo-600 hover:underline font-bold cursor-pointer"
                >
                  ← Volver a configuración manual
                </button>
              </div>

              {DIAGNOSTIC_QUESTIONS.map((q, qIdx) => {
                const chosen = answersById[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        P{qIdx + 1} · {q.targetLevel} · {q.topicLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{q.promptEs}</p>
                    <p className="text-sm sm:text-base font-extrabold text-slate-900" lang="de">
                      {q.promptDe}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt) => {
                        const isChosen = chosen === opt;
                        const isRight = diagnosticResult && opt === q.correct;
                        const isWrongChosen = diagnosticResult && isChosen && opt !== q.correct;
                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={Boolean(diagnosticResult)}
                            aria-pressed={isChosen}
                            onClick={() => setAnswersById((prev) => ({ ...prev, [q.id]: opt }))}
                            className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-bold transition cursor-pointer ${
                              isRight
                                ? 'bg-emerald-600 text-white border-emerald-700'
                                : isWrongChosen
                                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                                  : isChosen
                                    ? 'bg-indigo-600 text-white border-indigo-700'
                                    : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400'
                            }`}
                            lang="de"
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {diagnosticResult && (
                      <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                        💡 {q.explanationEs}
                      </p>
                    )}
                  </div>
                );
              })}

              {diagnosticResult ? (
                <div aria-live="polite" className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-black text-emerald-950">
                      Resultado: {diagnosticResult.score} / {diagnosticResult.total} aciertos
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white">
                      Nivel recomendado: {diagnosticResult.recommendedLevel}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900">
                    Puedes aplicar <strong>{diagnosticResult.recommendedLevel}</strong> o reintentar si lo prefieres.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswersById({});
                      setDiagnosticResult(null);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    <RotateCcw size={13} /> Repetir preguntas
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={answeredCount === 0}
                  onClick={handleEvaluateDiagnostic}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-black rounded-xl shadow-sm transition cursor-pointer"
                >
                  Evaluar diagnóstico ({answeredCount}/{DIAGNOSTIC_QUESTIONS.length})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer de acciones */}
        <footer className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 shrink-0">
          <button
            type="button"
            onClick={handleSkipNow}
            disabled={saving}
            className="px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition cursor-pointer"
          >
            Saltar por ahora
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-sm transition cursor-pointer ml-auto"
          >
            <span>
              {step === 'diagnostic' && diagnosticResult
                ? `Aplicar nivel ${startingLevel} y comenzar`
                : 'Guardar mi ruta'}
            </span>
            <ArrowRight size={15} />
          </button>
        </footer>
      </div>
    </dialog>
  );
}
