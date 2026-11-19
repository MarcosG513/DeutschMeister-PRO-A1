import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookmarkPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CloudDownload,
  HelpCircle,
  Loader2,
  MessageCircle,
  Mic,
  MicOff,
  Puzzle,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  DIALOGUE_AXES,
  phraseConstructionDrills,
  structuredDialoguesCatalog,
} from '../data/structuredDialogues';
import {
  evaluateDialogueTurnAttempt,
  evaluatePhraseAttempt,
} from '../utils/dialogueEval';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import {
  getSavedPlaybackSpeed,
  playGermanAudio,
  setSavedPlaybackSpeed,
  stopCurrentAudio,
} from '../services/aiAudioService';
import {
  isDialoguePackCachedOffline,
  syncDialoguePackOffline,
} from '../services/syncMediaService';
import {
  captureConversationBundle,
  captureGrammarErrorToSrs,
  captureVocabToSrs,
} from '../services/srsBridgeService';
import {
  recordDailyStudyActivity,
  recordSkillActivity,
  scrollInputIntoView,
} from '../utils/helpers';

const SPEED_OPTIONS = [0.75, 0.85, 1];

// Orden determinista puro por ID (sin Math.random en render) para mezclar bloques de palabras
function getDeterministicShuffledBlocks(drill) {
  if (!drill) return [];
  const all = [
    ...(drill.wordBlocks || []).map((text, idx) => ({
      id: `${drill.id}_w_${idx}`,
      text,
      isDistractor: false,
    })),
    ...(drill.distractorBlocks || []).map((text, idx) => ({
      id: `${drill.id}_d_${idx}`,
      text,
      isDistractor: true,
    })),
  ];

  return [...all].sort((a, b) => {
    const hashA = Array.from(a.id).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7);
    const hashB = Array.from(b.id).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 11);
    return (hashA % 97) - (hashB % 97);
  });
}

export default function PhraseDialogueTrainer({ onExit, initialTab = 'phrase' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'phrase' | 'dialogue'
  const [selectedAxis, setSelectedAxis] = useState('all');
  const [playbackSpeed, setPlaybackSpeed] = useState(() => getSavedPlaybackSpeed());

  // Estado Modo Frase
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [selectedChipIds, setSelectedChipIds] = useState([]);
  const [phraseInput, setPhraseInput] = useState('');
  const [showPhraseHint, setShowPhraseHint] = useState(false);
  const [phraseResult, setPhraseResult] = useState(null);
  const [savedPhraseSrs, setSavedPhraseSrs] = useState({});

  // Estado Modo Diálogo
  const [activeDialogueId, setActiveDialogueId] = useState(null);
  const [turnIndex, setTurnIndex] = useState(0);
  const [dialogueInput, setDialogueInput] = useState('');
  const [showDialogueHint, setShowDialogueHint] = useState(false);
  const [turnFeedback, setTurnFeedback] = useState(null);
  const [completedTurnsMap, setCompletedTurnsMap] = useState({});
  const [dialogueOfflineMap, setDialogueOfflineMap] = useState({});
  const [downloadingDialogueId, setDownloadingDialogueId] = useState(null);
  const [downloadProg, setDownloadProg] = useState(null);
  const [savedDialogueSrsMap, setSavedDialogueSrsMap] = useState({});

  const {
    isListening,
    error: speechError,
    startListening,
    stopListening,
  } = useSpeechRecognition('de-DE');

  const filteredDrills = useMemo(() => {
    if (selectedAxis === 'all') return phraseConstructionDrills;
    return phraseConstructionDrills.filter((d) => d.axis === selectedAxis);
  }, [selectedAxis]);

  const safePhraseIdx =
    filteredDrills.length > 0 ? Math.min(phraseIndex, filteredDrills.length - 1) : 0;
  const activeDrill = filteredDrills[safePhraseIdx] || null;

  const chipPool = useMemo(
    () => getDeterministicShuffledBlocks(activeDrill),
    [activeDrill]
  );

  const filteredDialogues = useMemo(() => {
    if (selectedAxis === 'all') return structuredDialoguesCatalog;
    return structuredDialoguesCatalog.filter((d) => d.axis === selectedAxis);
  }, [selectedAxis]);

  const activeDialogue = useMemo(() => {
    if (!activeDialogueId) return null;
    return structuredDialoguesCatalog.find((d) => d.id === activeDialogueId) || null;
  }, [activeDialogueId]);

  const activeTurn =
    activeDialogue && Array.isArray(activeDialogue.turns)
      ? activeDialogue.turns[turnIndex] || null
      : null;

  useEffect(() => {
    const syncSpeed = (e) => {
      const next = e?.detail !== undefined ? e.detail : getSavedPlaybackSpeed();
      setPlaybackSpeed(next);
    };
    window.addEventListener('dm-speed-changed', syncSpeed);
    return () => {
      window.removeEventListener('dm-speed-changed', syncSpeed);
      stopCurrentAudio();
      stopListening().catch(() => {});
    };
  }, [stopListening]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      structuredDialoguesCatalog.map(async (dlg) => [
        dlg.id,
        await isDialoguePackCachedOffline(dlg.id),
      ])
    )
      .then((entries) => {
        if (!cancelled) {
          setDialogueOfflineMap(Object.fromEntries(entries));
        }
      })
      .catch(() => {
        // Ignorar en entornos sin IndexedDB
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectSpeed = (spd) => {
    const valid = setSavedPlaybackSpeed(spd);
    setPlaybackSpeed(valid);
  };

  const resetPhraseState = () => {
    setSelectedChipIds([]);
    setPhraseInput('');
    setPhraseResult(null);
    setShowPhraseHint(false);
  };

  const handleSwitchAxis = (nextAxis) => {
    setSelectedAxis(nextAxis);
    setPhraseIndex(0);
    resetPhraseState();
  };

  const handleToggleChip = (chip) => {
    let nextIds;
    if (selectedChipIds.includes(chip.id)) {
      nextIds = selectedChipIds.filter((id) => id !== chip.id);
    } else {
      nextIds = [...selectedChipIds, chip.id];
    }
    setSelectedChipIds(nextIds);
    const composed = nextIds
      .map((id) => chipPool.find((c) => c.id === id)?.text)
      .filter(Boolean)
      .join(' ');
    setPhraseInput(composed);
    setPhraseResult(null);
  };

  const handleCheckPhrase = () => {
    if (!activeDrill) return;
    const evaluation = evaluatePhraseAttempt(phraseInput, activeDrill);
    setPhraseResult(evaluation);
    if (evaluation.isCorrect) {
      recordSkillActivity('writing', 4).catch(() => {});
      recordDailyStudyActivity();
    }
  };

  const handleSavePhraseToSrs = async () => {
    if (!activeDrill) return;
    if (phraseResult && !phraseResult.isCorrect && phraseInput.trim()) {
      await captureGrammarErrorToSrs({
        userUtteranceDe: phraseInput.trim(),
        correctedDe: activeDrill.targetDe,
        errorCategory: activeDrill.grammarFocusTitle,
        explanationEs: activeDrill.grammarRuleEs,
        translationEs: activeDrill.promptEs,
        axis: activeDrill.axis,
        source: 'dialogue',
        sourceRef: activeDrill.id,
      });
    } else {
      await captureVocabToSrs({
        termDe: activeDrill.targetDe,
        audioDe: activeDrill.targetDe,
        translationEs: activeDrill.promptEs,
        axis: activeDrill.axis,
        source: 'dialogue',
        sourceRef: activeDrill.id,
      });
    }
    setSavedPhraseSrs((prev) => ({ ...prev, [activeDrill.id]: true }));
  };

  const handleMicForPhrase = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening((spokenText) => {
      if (!spokenText) return;
      setPhraseInput(spokenText);
      setSelectedChipIds([]);
      setPhraseResult(null);
      recordSkillActivity('speaking', 2).catch(() => {});
    });
  };

  const handleDownloadDialogueOffline = async (dlg) => {
    if (!dlg || downloadingDialogueId) return;
    setDownloadingDialogueId(dlg.id);
    setDownloadProg({ current: 0, total: dlg.turns?.length || 1 });
    try {
      const res = await syncDialoguePackOffline(dlg, (p) => {
        setDownloadProg({ current: p.current, total: p.total });
      });
      if (res?.success) {
        setDialogueOfflineMap((prev) => ({ ...prev, [dlg.id]: true }));
      }
    } finally {
      setDownloadingDialogueId(null);
      setDownloadProg(null);
    }
  };

  const handleOpenDialogue = (dlg) => {
    stopCurrentAudio();
    setActiveDialogueId(dlg.id);
    setTurnIndex(0);
    setDialogueInput('');
    setTurnFeedback(null);
    setShowDialogueHint(false);
    setCompletedTurnsMap({});
    const firstTurn = dlg.turns?.[0];
    if (firstTurn?.promptDe) {
      playGermanAudio(firstTurn.promptDe, {
        type: 'dialogue',
        voice: 'Charon',
        speed: playbackSpeed,
      });
    }
  };

  const handleValidateDialogueTurn = () => {
    if (!activeDialogue || !activeTurn) return;
    const result = evaluateDialogueTurnAttempt(dialogueInput, activeTurn);
    setTurnFeedback({ ...result, submittedText: dialogueInput });
    if (result.isCorrect) {
      setCompletedTurnsMap((prev) => ({ ...prev, [activeTurn.id]: true }));
      recordSkillActivity('speaking', 4).catch(() => {});
      recordDailyStudyActivity();
    }
  };

  const handleMicForDialogue = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening((spokenText) => {
      if (!spokenText) return;
      setDialogueInput(spokenText);
      setTurnFeedback(null);
    });
  };

  const handleNextDialogueTurn = () => {
    if (!activeDialogue) return;
    const totalTurns = activeDialogue.turns?.length || 0;
    if (turnIndex + 1 < totalTurns) {
      const nextIdx = turnIndex + 1;
      setTurnIndex(nextIdx);
      setDialogueInput('');
      setTurnFeedback(null);
      setShowDialogueHint(false);
      const nextPrompt = activeDialogue.turns[nextIdx]?.promptDe;
      if (nextPrompt) {
        playGermanAudio(nextPrompt, {
          type: 'dialogue',
          voice: 'Charon',
          speed: playbackSpeed,
        });
      }
    }
  };

  const handleSaveDialogueTurnError = async () => {
    if (!activeDialogue || !activeTurn) return;
    await captureGrammarErrorToSrs({
      userUtteranceDe: dialogueInput.trim() || '(Sin respuesta completa)',
      correctedDe: activeTurn.sampleReplyDe,
      errorCategory: activeTurn.grammarTag || 'Diálogo A1',
      explanationEs: activeTurn.hintEs,
      translationEs: activeTurn.sampleReplyEs,
      axis: activeDialogue.axis,
      source: 'dialogue',
      sourceRef: `${activeDialogue.id}_${activeTurn.id}`,
    });
    setSavedDialogueSrsMap((prev) => ({ ...prev, [activeTurn.id]: true }));
  };

  const handleSaveDialogueBundle = async () => {
    if (!activeDialogue) return;
    await captureConversationBundle({
      vocabItems: activeDialogue.targetVocabulary || [],
      grammarErrors: [],
      axis: activeDialogue.axis,
      source: 'dialogue',
      sourceRef: activeDialogue.id,
    });
    setSavedDialogueSrsMap((prev) => ({ ...prev, [activeDialogue.id]: true }));
  };

  const isDialogueFinished = Boolean(
    activeDialogue &&
      activeDialogue.turns?.length > 0 &&
      activeDialogue.turns.every((t) => completedTurnsMap[t.id])
  );

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 pb-14 pt-[max(0.75rem,env(safe-area-inset-top))] space-y-4 animate-in fade-in duration-200">
      {/* Cabecera */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => {
                stopCurrentAudio();
                stopListening().catch(() => {});
                onExit?.();
              }}
              className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 shrink-0 cursor-pointer transition"
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              <span className="hidden sm:inline">Inicio</span>
            </button>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 truncate">
                Modo Frase &amp; Diálogo Guiado
              </h2>
              <p className="text-xs text-slate-600">
                Domina el orden alemán (Satzklammer) y practica conversaciones por turnos con Charon + SRS.
              </p>
            </div>
          </div>

          {/* Selector WSOLA compacto */}
          <div className="flex items-center gap-1" role="group" aria-label="Velocidad de audio">
            {SPEED_OPTIONS.map((spd) => {
              const active = Number(playbackSpeed) === spd;
              return (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSelectSpeed(spd)}
                  aria-pressed={active}
                  className={`min-h-[44px] px-2.5 rounded-xl text-xs font-black border cursor-pointer transition ${
                    active
                      ? 'bg-sky-600 border-sky-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {spd === 1 ? '1.0x' : `${spd}x`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pestañas Duales en una sola fila (WAI-ARIA tabs con indicador de borde inferior) */}
        <div
          role="tablist"
          aria-label="Seleccionar modo de entrenamiento"
          className="flex items-center border-b border-slate-200 overflow-x-auto no-scrollbar"
        >
          <button
            type="button"
            role="tab"
            id="tab-phrase"
            aria-selected={activeTab === 'phrase'}
            onClick={() => {
              stopCurrentAudio();
              setActiveTab('phrase');
            }}
            className={`relative min-h-[44px] px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition ${
              activeTab === 'phrase'
                ? 'text-sky-700 font-bold after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:border-b-[3px] after:border-sky-600'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Puzzle size={16} aria-hidden="true" />
            <span>Modo Frase (Satzklammer)</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-dialogue"
            aria-selected={activeTab === 'dialogue'}
            onClick={() => {
              stopCurrentAudio();
              setActiveTab('dialogue');
            }}
            className={`relative min-h-[44px] px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition ${
              activeTab === 'dialogue'
                ? 'text-sky-700 font-bold after:content-[""] after:inset-x-0 after:bottom-0 after:border-b-[3px] after:border-sky-600'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>Modo Diálogo (Turnos)</span>
          </button>
        </div>

        {/* Filtro de Eje (Trámites vs Trabajo Técnico) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {DIALOGUE_AXES.map((ax) => {
            const active = selectedAxis === ax.id;
            return (
              <button
                key={ax.id}
                type="button"
                onClick={() => handleSwitchAxis(ax.id)}
                className={`min-h-[44px] px-3 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 border cursor-pointer transition ${
                  active
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span aria-hidden="true" className="mr-1">{ax.emoji}</span>
                {ax.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* PANEL 1: MODO FRASE (CONSTRUCCIÓN SINTÁCTICA Y SATZKLAMMER)         */}
      {/* =================================================================== */}
      <div role="tabpanel" aria-labelledby="tab-phrase" hidden={activeTab !== 'phrase'}>
        {activeTab === 'phrase' && activeDrill && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                  {activeDrill.level} · {activeDrill.axis === 'work' ? 'Trabajo Técnico' : 'Supervivencia'}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Frase {safePhraseIdx + 1} / {filteredDrills.length}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safePhraseIdx === 0}
                  onClick={() => {
                    setPhraseIndex((i) => Math.max(0, i - 1));
                    resetPhraseState();
                  }}
                  aria-label="Frase anterior"
                  className="min-h-[44px] min-w-[44px] rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  disabled={safePhraseIdx + 1 >= filteredDrills.length}
                  onClick={() => {
                    setPhraseIndex((i) => Math.min(filteredDrills.length - 1, i + 1));
                    resetPhraseState();
                  }}
                  aria-label="Siguiente frase"
                  className="min-h-[44px] min-w-[44px] rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Regla gramatical activa */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-indigo-800">
                <Sparkles size={15} aria-hidden="true" />
                <span>{activeDrill.grammarFocusTitle}</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">{activeDrill.grammarRuleEs}</p>
            </div>

            {/* Consigna en español */}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase text-slate-500">
                Traduce y ordena en alemán ({activeDrill.titleEs}):
              </div>
              <p className="text-base sm:text-xl font-black text-slate-900">
                „{activeDrill.promptEs}“
              </p>
            </div>

            {/* Banco de fichas clicables */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-600">
                Toca los bloques en orden (o dicta / escribe abajo):
              </div>
              <div className="flex flex-wrap gap-2">
                {chipPool.map((chip) => {
                  const chosen = selectedChipIds.includes(chip.id);
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleToggleChip(chip)}
                      className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer transition ${
                        chosen
                          ? 'bg-sky-600 border-sky-700 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:border-sky-400 hover:bg-sky-50'
                      }`}
                    >
                      {chip.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Caja de respuesta + micrófono alemán + limpiar */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={phraseInput}
                  onFocus={scrollInputIntoView}
                  onChange={(e) => {
                    setPhraseInput(e.target.value);
                    setPhraseResult(null);
                  }}
                  placeholder="Tu frase en alemán aparecerá aquí..."
                  aria-label="Frase construida en alemán"
                  className="flex-1 min-w-0 min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:outline-none text-base text-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={handleMicForPhrase}
                  aria-label={isListening ? 'Detener dictado en alemán' : 'Dictar frase en alemán'}
                  className={`min-h-[44px] min-w-[44px] px-3 rounded-xl font-bold flex items-center justify-center cursor-pointer transition ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isListening ? <MicOff size={18} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  onClick={resetPhraseState}
                  aria-label="Reiniciar frase"
                  className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition"
                >
                  <RotateCcw size={17} aria-hidden="true" />
                </button>
              </div>

              {speechError && (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  {speechError}
                </p>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCheckPhrase}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center gap-1.5 cursor-pointer transition"
              >
                <Send size={16} aria-hidden="true" />
                <span>Comprobar frase</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPhraseHint((v) => !v)}
                className="min-h-[44px] px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition"
              >
                <HelpCircle size={16} aria-hidden="true" />
                <span>{showPhraseHint ? 'Ocultar pista' : 'Ver pista'}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  playGermanAudio(activeDrill.targetDe, {
                    type: 'dialogue',
                    voice: 'Charon',
                    speed: playbackSpeed,
                  })
                }
                className="min-h-[44px] px-3.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition"
              >
                <Volume2 size={16} aria-hidden="true" />
                <span>Escuchar Charon</span>
              </button>
            </div>

            {showPhraseHint && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950">
                💡 {activeDrill.hintEs}
              </div>
            )}

            {/* Resultado instantáneo */}
            <div aria-live="polite">
              {phraseResult && (
                <div
                  className={`p-4 rounded-2xl border space-y-2.5 ${
                    phraseResult.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-sm">
                    {phraseResult.isCorrect ? (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" aria-hidden="true" />
                    ) : (
                      <XCircle size={18} className="text-rose-600 shrink-0" aria-hidden="true" />
                    )}
                    <span>{phraseResult.feedbackEs}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    Modelo oficial: <span className="text-slate-950">{activeDrill.targetDe}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSavePhraseToSrs}
                      className={`min-h-[44px] px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer border transition ${
                        savedPhraseSrs[activeDrill.id]
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                          : 'bg-white border-indigo-300 text-indigo-700 hover:bg-indigo-50'
                      }`}
                    >
                      <BookmarkPlus size={15} aria-hidden="true" />
                      <span>
                        {savedPhraseSrs[activeDrill.id] ? 'Guardada en SRS' : 'Guardar regla/frase en SRS'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* PANEL 2: MODO DIÁLOGO ESTRUCTURADO POR TURNOS                       */}
      {/* =================================================================== */}
      <div role="tabpanel" aria-labelledby="tab-dialogue" hidden={activeTab !== 'dialogue'}>
        {activeTab === 'dialogue' && !activeDialogue && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDialogues.map((dlg) => {
              const isCached = Boolean(dialogueOfflineMap[dlg.id]);
              const isDownloading = downloadingDialogueId === dlg.id;
              return (
                <article
                  key={dlg.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-4 hover:border-sky-300 transition min-w-0"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xl" aria-hidden="true">{dlg.emoji}</span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          dlg.axis === 'work'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {dlg.level} · {dlg.axis === 'work' ? 'Trabajo' : 'Trámites'}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 text-base">{dlg.titleDe}</h3>
                    <p className="text-xs font-bold text-sky-700">{dlg.titleEs}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{dlg.subtitleEs}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenDialogue(dlg)}
                      className="flex-1 min-h-[44px] px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition"
                    >
                      <MessageCircle size={15} aria-hidden="true" />
                      <span>Iniciar ({dlg.turns?.length || 3} turnos)</span>
                    </button>

                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={() => handleDownloadDialogueOffline(dlg)}
                      aria-label={
                        isCached
                          ? `${dlg.titleEs} guardado offline`
                          : `Descargar audios de ${dlg.titleEs}`
                      }
                      className={`min-h-[44px] min-w-[44px] px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border cursor-pointer transition ${
                        isCached
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {isDownloading ? (
                        <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                      ) : isCached ? (
                        <CheckCircle2 size={15} aria-hidden="true" />
                      ) : (
                        <CloudDownload size={15} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {activeTab === 'dialogue' && activeDialogue && activeTurn && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => {
                  stopCurrentAudio();
                  setActiveDialogueId(null);
                }}
                className="min-h-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Diálogos</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                  Turno {turnIndex + 1} / {activeDialogue.turns.length}
                </span>
                <button
                  type="button"
                  disabled={downloadingDialogueId === activeDialogue.id}
                  onClick={() => handleDownloadDialogueOffline(activeDialogue)}
                  className={`min-h-[44px] px-3 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer ${
                    dialogueOfflineMap[activeDialogue.id]
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {downloadingDialogueId === activeDialogue.id ? (
                    <>
                      <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                      <span>{downloadProg?.current || 0}/{downloadProg?.total || 0}</span>
                    </>
                  ) : dialogueOfflineMap[activeDialogue.id] ? (
                    <>
                      <CheckCircle2 size={14} aria-hidden="true" />
                      <span>Offline OK</span>
                    </>
                  ) : (
                    <>
                      <CloudDownload size={14} aria-hidden="true" />
                      <span>Bajar Offline</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Burbuja de interlocutor con Charon */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase text-sky-300">
                  {activeTurn.partnerRoleDe}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    playGermanAudio(activeTurn.promptDe, {
                      type: 'dialogue',
                      voice: 'Charon',
                      speed: playbackSpeed,
                    })
                  }
                  className="min-h-[44px] px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 size={15} aria-hidden="true" />
                  <span>Escuchar Charon</span>
                </button>
              </div>
              <p className="text-base sm:text-lg font-bold leading-relaxed">{activeTurn.promptDe}</p>
              <p className="text-xs text-slate-300">{activeTurn.promptEs}</p>
            </div>

            {/* Respuesta del alumno (mic + input + ejemplo + pista) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dialogueInput}
                  onFocus={scrollInputIntoView}
                  onChange={(e) => {
                    setDialogueInput(e.target.value);
                    setTurnFeedback(null);
                  }}
                  placeholder="Responde en alemán por voz o escribe aquí..."
                  aria-label="Tu respuesta en alemán"
                  className="flex-1 min-w-0 min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:outline-none text-base text-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={handleMicForDialogue}
                  aria-label={isListening ? 'Detener micrófono' : 'Responder con micrófono alemán'}
                  className={`min-h-[44px] min-w-[44px] px-3 rounded-xl font-bold flex items-center justify-center cursor-pointer transition ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isListening ? <MicOff size={18} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />}
                </button>
              </div>

              {speechError && (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  {speechError}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleValidateDialogueTurn}
                  className="min-h-[44px] px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Send size={15} aria-hidden="true" />
                  <span>Validar turno</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDialogueHint((v) => !v)}
                  className="min-h-[44px] px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle size={15} aria-hidden="true" />
                  <span>{showDialogueHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    playGermanAudio(activeTurn.sampleReplyDe, {
                      type: 'dialogue',
                      voice: 'Charon',
                      speed: playbackSpeed,
                    })
                  }
                  className="min-h-[44px] px-3.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 size={15} aria-hidden="true" />
                  <span>Oír respuesta modelo</span>
                </button>
              </div>

              {showDialogueHint && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
                  <p>💡 {activeTurn.hintEs}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setDialogueInput(activeTurn.sampleReplyDe);
                      setTurnFeedback(null);
                    }}
                    className="text-xs font-bold text-sky-700 underline cursor-pointer"
                  >
                    Copiar ejemplo sugerido para practicar pronunciación
                  </button>
                </div>
              )}

              <div aria-live="polite">
                {turnFeedback && (
                  <div
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      turnFeedback.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black text-sm">
                      {turnFeedback.isCorrect ? (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" aria-hidden="true" />
                      ) : (
                        <XCircle size={18} className="text-rose-600 shrink-0" aria-hidden="true" />
                      )}
                      <span>{turnFeedback.feedbackEs}</span>
                    </div>
                    <p className="text-xs text-slate-700">
                      Ejemplo natural: <strong className="text-slate-900">{activeTurn.sampleReplyDe}</strong> ({activeTurn.sampleReplyEs})
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {!turnFeedback.isCorrect && (
                        <button
                          type="button"
                          onClick={handleSaveDialogueTurnError}
                          className="min-h-[44px] px-3.5 rounded-xl bg-white border border-indigo-300 text-indigo-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <BookmarkPlus size={15} aria-hidden="true" />
                          <span>
                            {savedDialogueSrsMap[activeTurn.id] ? 'Guardado en SRS' : 'Guardar corrección en SRS'}
                          </span>
                        </button>
                      )}

                      {turnFeedback.isCorrect && turnIndex + 1 < activeDialogue.turns.length && (
                        <button
                          type="button"
                          onClick={handleNextDialogueTurn}
                          className="min-h-[44px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Siguiente turno</span>
                          <ChevronRight size={16} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Resumen al completar los 3 turnos */}
              {isDialogueFinished && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <h4 className="font-black text-indigo-950 text-sm sm:text-base">
                        🎉 ¡Diálogo completado ({activeDialogue.turns.length}/{activeDialogue.turns.length} turnos)!
                      </h4>
                      <p className="text-xs text-indigo-800">
                        Has sumado puntos reales en Habla y consolidado el vocabulario clave.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveDialogueBundle}
                      className={`min-h-[44px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                        savedDialogueSrsMap[activeDialogue.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <BookmarkPlus size={15} aria-hidden="true" />
                      <span>
                        {savedDialogueSrsMap[activeDialogue.id]
                          ? 'Vocabulario guardado en SRS'
                          : 'Guardar vocabulario clave en SRS'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
