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
  Blocks,
} from 'lucide-react';
import { SYNTAX_TRANSFORM_ITEMS } from '../data/pedagogicalToolsData';
import {
  evaluateSyntaxTransformAttempt,
  deterministicShuffle,
  getDiagnosticLabelEs,
} from '../utils/pedagogicalToolEvaluators';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { captureVocabToSrs, captureGrammarErrorToSrs } from '../services/srsBridgeService';
import { scrollInputIntoView, recordSkillActivity } from '../utils/helpers';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todas (12)' },
  { id: 'indirect_question', label: 'ob / W-Frage' },
  { id: 'modal_praeteritum', label: 'Modales Prät.' },
  { id: 'double_object', label: 'Doble Objeto' },
  { id: 'subordinate_clause', label: 'weil / obwohl / damit' },
  { id: 'konjunktionaladverb', label: 'deshalb / trotzdem' },
  { id: 'passive_voice', label: 'Vorgangspassiv' },
];

export default function SyntaxTransformLab({
  initialCategory = 'all',
  isModal = false,
  onComplete,
}) {
  const inputId = useId();
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [interactionType, setInteractionType] = useState('blocks'); // 'blocks' | 'typing'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTokenIndices, setSelectedTokenIndices] = useState([]);
  const [typedSentence, setTypedSentence] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [evalResult, setEvalResult] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [srsSavedState, setSrsSavedState] = useState({ vocab: false, error: false });
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });
  const [completedSession, setCompletedSession] = useState(false);

  const audioAbortRef = useRef(null);
  const trackedSkillRef = useRef(false);

  const filteredItems = useMemo(() => {
    const list = SYNTAX_TRANSFORM_ITEMS.filter(
      (it) => categoryFilter === 'all' || it.category === categoryFilter
    );
    return list.length > 0 ? list : SYNTAX_TRANSFORM_ITEMS;
  }, [categoryFilter]);

  const safeIdx = currentIndex < filteredItems.length ? currentIndex : 0;
  const currentItem = filteredItems[safeIdx];

  const poolTokens = useMemo(() => {
    const raw = (currentItem?.blocks || []).map((word, idx) => ({
      idx,
      word,
    }));
    return deterministicShuffle(raw, `${currentItem?.id || 'st'}_blocks`);
  }, [currentItem]);

  const assembledSentence = useMemo(
    () =>
      selectedTokenIndices
        .map((poolPos) => poolTokens[poolPos]?.word)
        .filter(Boolean)
        .join(' '),
    [selectedTokenIndices, poolTokens]
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
    setSelectedTokenIndices([]);
    setTypedSentence('');
    setHintLevel(0);
    setEvalResult(null);
    setSrsSavedState({ vocab: false, error: false });
  };

  const handleCategoryChange = (nextCat) => {
    resetExerciseState();
    setCategoryFilter(nextCat);
    setCurrentIndex(0);
    setCompletedSession(false);
  };

  const handleTabChange = (mode) => {
    setInteractionType(mode);
    setEvalResult(null);
  };

  const handleTogglePoolToken = (poolPos) => {
    if (evalResult?.isCorrect) return;
    setEvalResult(null);
    setSelectedTokenIndices((prev) =>
      prev.includes(poolPos) ? prev.filter((p) => p !== poolPos) : [...prev, poolPos]
    );
  };

  const handlePlayTarget = async () => {
    if (!currentItem?.targetDe) return;
    audioAbortRef.current?.abort();
    const controller = new AbortController();
    audioAbortRef.current = controller;
    setIsPlayingAudio(true);
    try {
      await playGermanAudio(currentItem.targetDe, {
        type: 'vocab',
        signal: controller.signal,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const evaluateAttempt = (attemptText) => {
    if (!currentItem) return;
    const res = evaluateSyntaxTransformAttempt(currentItem, attemptText);
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
    await captureVocabToSrs({
      termDe: currentItem.targetDe,
      audioDe: currentItem.targetDe,
      translationEs: `${currentItem.categoryLabel}: ${currentItem.translationEs}`,
      axis: currentItem.axis,
      source: 'grammar_lab',
      sourceRef: currentItem.id,
    });
    setSrsSavedState((prev) => ({ ...prev, vocab: true }));
  };

  const handleSaveErrorSrs = async () => {
    if (!currentItem || !evalResult || evalResult.isCorrect || srsSavedState.error) return;
    const rawAttempt = interactionType === 'blocks' ? assembledSentence : typedSentence;
    await captureGrammarErrorToSrs({
      userUtteranceDe: rawAttempt || '(sin intento)',
      correctedDe: currentItem.targetDe,
      errorCategory: evalResult.errorCode || currentItem.srsErrorCategory || 'word_order',
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
            ¡Laboratorio de Sintaxis A2–B1 Completado!
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Transformaciones logradas: <strong className="text-emerald-700">{stats.correct}</strong>{' '}
            de <strong>{stats.attempted || filteredItems.length}</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
          Reiniciar laboratorio
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Laboratorio de transformación sintáctica A2-B1"
      className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${
        isModal ? 'p-4 sm:p-6' : 'p-4 sm:p-5'
      } space-y-4`}
    >
      {/* Cabecera */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide rounded-md bg-violet-100 text-violet-800">
              {currentItem.cefrLevel} · {currentItem.categoryLabel}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {safeIdx + 1} / {filteredItems.length}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
            Laboratorio de Sintaxis y Transformación
          </h3>
        </div>

        <div
          role="tablist"
          aria-label="Modo de construcción"
          className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={interactionType === 'blocks'}
            onClick={() => handleTabChange('blocks')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border-b-2 ${
              interactionType === 'blocks'
                ? 'bg-white text-violet-700 border-violet-600 shadow-xs'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Blocks size={14} />
            Bloques
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={interactionType === 'typing'}
            onClick={() => handleTabChange('typing')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border-b-2 ${
              interactionType === 'typing'
                ? 'bg-white text-violet-700 border-violet-600 shadow-xs'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Keyboard size={14} />
            Escritura libre
          </button>
        </div>
      </div>

      {/* Filtro de estructuras en una sola fila desplazable */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.id}
            type="button"
            aria-pressed={categoryFilter === cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              categoryFilter === cat.id
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Consigna y oración origen */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-600">{currentItem.promptEs}</p>
            <p className="text-sm sm:text-base font-bold text-slate-900" lang="de">
              {currentItem.sourceDe}
            </p>
            <p className="text-xs font-semibold text-violet-700" lang="de">
              Inicio / pista: {currentItem.leadInDe}
            </p>
            <p className="text-xs text-slate-500">{currentItem.translationEs}</p>
          </div>
          <button
            type="button"
            onClick={handlePlayTarget}
            aria-label="Escuchar transformación objetivo en alemán"
            className={`p-2.5 rounded-xl border shrink-0 transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-violet-600 text-white border-violet-600'
                : 'bg-white text-violet-700 border-slate-200 hover:bg-violet-50'
            }`}
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* Pistas progresivas */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setHintLevel((h) => Math.min(2, h + 1))}
            disabled={hintLevel >= 2}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 disabled:opacity-50 cursor-pointer"
          >
            <HelpCircle size={14} />
            {hintLevel === 0 ? 'Pista 1 (regla/coma)' : hintLevel === 1 ? 'Pista 2 (posición verbo)' : 'Pistas visibles'}
          </button>
          {hintLevel >= 1 && (
            <span className="text-xs font-medium text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/70">
              {currentItem.hintRuleEs}
            </span>
          )}
          {hintLevel >= 2 && (
            <span className="text-xs font-bold text-violet-900 bg-violet-50 px-2.5 py-1 rounded-md border border-violet-200">
              {currentItem.hintVerbEs}
            </span>
          )}
        </div>
      </div>

      {/* Área de construcción */}
      {interactionType === 'blocks' ? (
        <div className="space-y-3">
          {/* Zona ensamblada */}
          <div className="min-h-[54px] p-3 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-wrap items-center gap-1.5">
            {selectedTokenIndices.length === 0 ? (
              <span className="text-xs text-slate-400">
                Pulsa los bloques en orden para construir la oración transformada...
              </span>
            ) : (
              selectedTokenIndices.map((poolPos) => (
                <button
                  key={`sel_${poolPos}`}
                  type="button"
                  onClick={() => handleTogglePoolToken(poolPos)}
                  className="px-2.5 py-1.5 bg-violet-600 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs hover:bg-violet-700 cursor-pointer"
                  lang="de"
                >
                  {poolTokens[poolPos]?.word}
                </button>
              ))
            )}
          </div>

          {/* Banco de palabras */}
          <div className="flex flex-wrap gap-1.5">
            {poolTokens.map((tok, poolPos) => {
              const isUsed = selectedTokenIndices.includes(poolPos);
              return (
                <button
                  key={`pool_${tok.idx}_${tok.word}`}
                  type="button"
                  disabled={isUsed || Boolean(evalResult?.isCorrect)}
                  onClick={() => handleTogglePoolToken(poolPos)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg border transition-all cursor-pointer ${
                    isUsed
                      ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-50'
                      : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-violet-400 hover:bg-violet-50'
                  }`}
                  lang="de"
                >
                  {tok.word}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => evaluateAttempt(assembledSentence)}
              disabled={selectedTokenIndices.length === 0}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Validar estructura
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedTokenIndices([]);
                setEvalResult(null);
              }}
              className="px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Limpiar bloques
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            evaluateAttempt(typedSentence);
          }}
          className="space-y-2.5"
        >
          <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
            Escribe la oración completa en alemán (presta atención a comas y posición verbal):
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id={inputId}
              type="text"
              value={typedSentence}
              onChange={(e) => setTypedSentence(e.target.value)}
              onFocus={scrollInputIntoView}
              placeholder="Escribe la oración transformada completa..."
              autoComplete="off"
              spellCheck={false}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              lang="de"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl shadow-xs cursor-pointer shrink-0"
            >
              Comprobar
            </button>
          </div>
        </form>
      )}

      {/* Feedback y SRS */}
      <div aria-live="polite" className="space-y-3">
        {evalResult && (
          <div
            className={`p-3.5 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
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
                    ? `¡Sintaxis perfecta! ${currentItem.targetDe}`
                    : `Diagnóstico: ${getDiagnosticLabelEs(evalResult.errorCode)}`}
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
              <BookmarkPlus size={14} className="text-violet-600" />
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
            <span>{safeIdx + 1 >= filteredItems.length ? 'Finalizar laboratorio' : 'Siguiente'}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
