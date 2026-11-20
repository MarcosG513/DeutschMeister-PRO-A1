import { useState, useRef, useEffect, useMemo, useId } from 'react';
import {
  Volume2,
  BookmarkPlus,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Keyboard,
  MousePointerClick,
} from 'lucide-react';
import { VERB_PREPOSITION_ITEMS } from '../data/pedagogicalToolsData';
import {
  evaluateVerbPrepositionAttempt,
  deterministicShuffle,
  getDiagnosticLabelEs,
} from '../utils/pedagogicalToolEvaluators';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { captureVocabToSrs, captureGrammarErrorToSrs } from '../services/srsBridgeService';
import { scrollInputIntoView, recordSkillActivity } from '../utils/helpers';

const AXIS_FILTERS = [
  { id: 'all', label: 'Todos (18)' },
  { id: 'general', label: 'Vida diaria' },
  { id: 'survival', label: 'DTZ / Trámites' },
  { id: 'work', label: 'Técnico indoor' },
];

export default function VerbPrepositionTrainer({
  initialAxis = 'all',
  initialMode = 'all',
  isModal = false,
  onComplete,
}) {
  const inputId = useId();
  const [axisFilter, setAxisFilter] = useState(initialAxis);
  const [modeFilter, setModeFilter] = useState(initialMode);
  const [interactionType, setInteractionType] = useState('choices'); // 'choices' | 'typing'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [typedValue, setTypedValue] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [evalResult, setEvalResult] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [srsSavedState, setSrsSavedState] = useState({ vocab: false, error: false });
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });
  const [completedSession, setCompletedSession] = useState(false);

  const audioAbortRef = useRef(null);
  const trackedSkillRef = useRef(false);

  const filteredItems = useMemo(() => {
    const subset = VERB_PREPOSITION_ITEMS.filter((item) => {
      const axisOk = axisFilter === 'all' || item.axis === axisFilter;
      const modeOk = modeFilter === 'all' || item.mode === modeFilter;
      return axisOk && modeOk;
    });
    return subset.length > 0 ? subset : VERB_PREPOSITION_ITEMS;
  }, [axisFilter, modeFilter]);

  const safeIdx = currentIndex < filteredItems.length ? currentIndex : 0;
  const currentItem = filteredItems[safeIdx];

  const shuffledChoices = useMemo(
    () => deterministicShuffle(currentItem?.choices || [], `${currentItem?.id || 'vp'}_choices`),
    [currentItem]
  );

  useEffect(() => {
    return () => {
      audioAbortRef.current?.abort();
      stopCurrentAudio();
    };
  }, []);

  const resetExerciseState = () => {
    audioAbortRef.current?.abort();
    stopCurrentAudio();
    setIsPlayingAudio(false);
    setSelectedChoice('');
    setTypedValue('');
    setHintLevel(0);
    setEvalResult(null);
    setSrsSavedState({ vocab: false, error: false });
  };

  const handleAxisChange = (nextAxis) => {
    resetExerciseState();
    setAxisFilter(nextAxis);
    setCurrentIndex(0);
    setCompletedSession(false);
  };

  const handleModeFilterChange = (nextMode) => {
    resetExerciseState();
    setModeFilter(nextMode);
    setCurrentIndex(0);
    setCompletedSession(false);
  };

  const handleInteractionTabChange = (nextType) => {
    setInteractionType(nextType);
    setEvalResult(null);
  };

  const handlePlaySentence = async () => {
    if (!currentItem?.fullSentenceDe) return;
    audioAbortRef.current?.abort();
    const controller = new AbortController();
    audioAbortRef.current = controller;
    setIsPlayingAudio(true);
    try {
      await playGermanAudio(currentItem.fullSentenceDe, {
        type: 'vocab',
        signal: controller.signal,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const runEvaluation = (attemptStr) => {
    if (!currentItem) return;
    const res = evaluateVerbPrepositionAttempt(currentItem, attemptStr);
    setEvalResult(res);
    setStats((prev) => ({
      correct: prev.correct + (res.isCorrect ? 1 : 0),
      attempted: prev.attempted + 1,
    }));
    if (res.isCorrect && !trackedSkillRef.current && stats.attempted >= 2) {
      trackedSkillRef.current = true;
      recordSkillActivity('writing', 2);
    }
  };

  const handleChoiceClick = (choice) => {
    if (evalResult?.isCorrect) return;
    setSelectedChoice(choice);
    runEvaluation(choice);
  };

  const handleTypingSubmit = (e) => {
    e.preventDefault();
    runEvaluation(typedValue);
  };

  const handleNext = () => {
    resetExerciseState();
    if (safeIdx + 1 >= filteredItems.length) {
      setCompletedSession(true);
      if (!trackedSkillRef.current) {
        trackedSkillRef.current = true;
        recordSkillActivity('writing', 2);
      }
      onComplete?.();
    } else {
      setCurrentIndex(safeIdx + 1);
    }
  };

  const handleRestart = () => {
    resetExerciseState();
    setCurrentIndex(0);
    setStats({ correct: 0, attempted: 0 });
    setCompletedSession(false);
  };

  const handleSaveVocabSrs = async () => {
    if (!currentItem || srsSavedState.vocab) return;
    const labelDe =
      currentItem.mode === 'pronominal_adverb'
        ? `${currentItem.verb} + ${currentItem.preposition} (${currentItem.daForm} / ${currentItem.woForm})`
        : `${currentItem.verb} + ${currentItem.preposition} (+ ${currentItem.targetCase})`;
    await captureVocabToSrs({
      termDe: labelDe,
      audioDe: currentItem.fullSentenceDe,
      translationEs: `${currentItem.verbTranslation}: ${currentItem.translationEs}`,
      axis: currentItem.axis,
      source: 'grammar_lab',
      sourceRef: currentItem.id,
    });
    setSrsSavedState((prev) => ({ ...prev, vocab: true }));
  };

  const handleSaveErrorSrs = async () => {
    if (!currentItem || !evalResult || evalResult.isCorrect || srsSavedState.error) return;
    const rawAttempt = interactionType === 'choices' ? selectedChoice : typedValue;
    await captureGrammarErrorToSrs({
      userUtteranceDe: rawAttempt || '(sin respuesta)',
      correctedDe: currentItem.fullSentenceDe,
      errorCategory: evalResult.errorCode || currentItem.srsErrorCategory || 'preposition',
      explanationEs: evalResult.feedbackEs,
      translationEs: currentItem.translationEs,
      axis: currentItem.axis,
      source: 'grammar_lab',
      sourceRef: currentItem.id,
    });
    setSrsSavedState((prev) => ({ ...prev, error: true }));
  };

  if (completedSession) {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            ¡Serie de Rección Verbal Completada!
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Aciertos en la sesión: <strong className="text-emerald-700">{stats.correct}</strong> de{' '}
            <strong>{stats.attempted || filteredItems.length}</strong> intentos.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
          Practicar de nuevo
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Laboratorio de verbos con preposición y da-/wo-"
      className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${
        isModal ? 'p-4 sm:p-6' : 'p-4 sm:p-5'
      } space-y-4`}
    >
      {/* Cabecera y contador */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide rounded-md bg-indigo-100 text-indigo-800">
              {currentItem?.cefrLevel} ·{' '}
              {currentItem?.mode === 'pronominal_adverb' ? 'da- / wo-' : 'Caso + Prep'}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Ítem {safeIdx + 1} / {filteredItems.length}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
            Rection Verbal &amp; Adverbios Pronominales
          </h3>
        </div>

        {/* Selector de modo: Selección vs Escritura */}
        <div
          role="tablist"
          aria-label="Modo de respuesta"
          className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={interactionType === 'choices'}
            onClick={() => handleInteractionTabChange('choices')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border-b-2 ${
              interactionType === 'choices'
                ? 'bg-white text-indigo-700 border-indigo-600 shadow-xs'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <MousePointerClick size={14} />
            Opciones
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={interactionType === 'typing'}
            onClick={() => handleInteractionTabChange('typing')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border-b-2 ${
              interactionType === 'typing'
                ? 'bg-white text-indigo-700 border-indigo-600 shadow-xs'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Keyboard size={14} />
            Escribir
          </button>
        </div>
      </div>

      {/* Filtros de ámbito y sub-modo */}
      <div className="flex flex-wrap items-center gap-1.5">
        {AXIS_FILTERS.map((ax) => (
          <button
            key={ax.id}
            type="button"
            aria-pressed={axisFilter === ax.id}
            onClick={() => handleAxisChange(ax.id)}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
              axisFilter === ax.id
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {ax.label}
          </button>
        ))}

        <select
          aria-label="Filtrar por enfoque gramatical"
          value={modeFilter}
          onChange={(e) => handleModeFilterChange(e.target.value)}
          className="ml-auto text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1"
        >
          <option value="all">Prep+Caso &amp; da-/wo-</option>
          <option value="prep_case">Solo Prep + Caso</option>
          <option value="pronominal_adverb">Solo da- / wo-</option>
        </select>
      </div>

      {/* Tarjeta principal del ejercicio */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">
              Verbo clave: {currentItem.verb}
            </p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug" lang="de">
              {currentItem.promptDe}
            </p>
            <p className="text-xs text-slate-600">{currentItem.translationEs}</p>
          </div>
          <button
            type="button"
            onClick={handlePlaySentence}
            aria-label="Escuchar oración completa en alemán"
            className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-indigo-700 border-slate-200 hover:bg-indigo-50'
            }`}
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* Pistas progresivas */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setHintLevel((h) => Math.min(2, h + 1))}
            disabled={hintLevel >= 2}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 disabled:opacity-50 cursor-pointer"
          >
            <HelpCircle size={14} />
            {hintLevel === 0 ? 'Pista 1 (significado)' : hintLevel === 1 ? 'Pista 2 (caso/forma)' : 'Pistas mostradas'}
          </button>
          {hintLevel >= 1 && (
            <span className="text-xs font-medium text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/70">
              Verbo: «{currentItem.verbTranslation}» + prep. «{currentItem.preposition}»
            </span>
          )}
          {hintLevel >= 2 && (
            <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
              {currentItem.mode === 'pronominal_adverb'
                ? `Forma para cosas: ${currentItem.daForm} / ${currentItem.woForm}`
                : `Rige ${currentItem.targetCase}`}
            </span>
          )}
        </div>
      </div>

      {/* Interacción: Opciones o Escritura libre */}
      {interactionType === 'choices' ? (
        <div className="grid grid-cols-2 gap-2.5">
          {shuffledChoices.map((choice) => {
            const isChosen = selectedChoice === choice;
            const isCorrectChoice = evalResult && isChosen && evalResult.isCorrect;
            const isWrongChoice = evalResult && isChosen && !evalResult.isCorrect;
            return (
              <button
                key={choice}
                type="button"
                onClick={() => handleChoiceClick(choice)}
                disabled={Boolean(evalResult?.isCorrect)}
                className={`p-3 rounded-xl font-bold text-sm sm:text-base border text-center transition-all cursor-pointer disabled:cursor-default ${
                  isCorrectChoice
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                    : isWrongChoice
                    ? 'bg-rose-50 text-rose-800 border-rose-300'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40'
                }`}
                lang="de"
              >
                {choice}
              </button>
            );
          })}
        </div>
      ) : (
        <form onSubmit={handleTypingSubmit} className="space-y-2.5">
          <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
            Completa el hueco en alemán (ej.: <span lang="de">auf den</span> o{' '}
            <span lang="de">darauf</span>):
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id={inputId}
              type="text"
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              onFocus={scrollInputIntoView}
              placeholder="Escribe la preposición + artículo o da-/wo-..."
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              lang="de"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Comprobar
            </button>
          </div>
        </form>
      )}

      {/* Feedback y Acciones SRS */}
      <div aria-live="polite" className="space-y-3">
        {evalResult && (
          <div
            className={`p-3.5 rounded-xl border text-xs sm:text-sm space-y-2 ${
              evalResult.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-2">
              {evalResult.isCorrect ? (
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={18} className="text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 flex-1 min-w-0">
                <p className="font-bold">
                  {evalResult.isCorrect
                    ? `¡Correcto! ${currentItem.fullSentenceDe}`
                    : `Casi — ${getDiagnosticLabelEs(evalResult.errorCode)}`}
                </p>
                <p className="leading-relaxed opacity-90">{evalResult.feedbackEs}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveVocabSrs}
              disabled={srsSavedState.vocab}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            >
              <BookmarkPlus size={14} className="text-indigo-600" />
              {srsSavedState.vocab ? 'Guardado en SRS ✓' : 'Guardar en SRS'}
            </button>

            {evalResult && !evalResult.isCorrect && (
              <button
                type="button"
                onClick={handleSaveErrorSrs}
                disabled={srsSavedState.error}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100 disabled:opacity-60 cursor-pointer"
              >
                <AlertTriangle size={14} />
                {srsSavedState.error ? 'Fallo guardado en SRS ✓' : 'Guardar fallo en SRS'}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer ml-auto"
          >
            <span>{safeIdx + 1 >= filteredItems.length ? 'Finalizar serie' : 'Siguiente'}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
