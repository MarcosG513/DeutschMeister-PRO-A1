// src/components/TutorChat.jsx
import { useEffect, useState } from 'react';
import { Bot, ClipboardCheck, Maximize, Minimize, Sparkles, X } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import ConversationThread from './chat/ConversationThread';
import ComposerBar from './chat/ComposerBar';
import SessionDiagnosticCard from './chat/SessionDiagnosticCard';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { captureConversationBundle } from '../services/srsBridgeService';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { auth } from '../config/firebase';
import { recordSkillActivity } from '../utils/helpers';

const STARTER_TUTOR_SUGGESTIONS = [
  {
    de: 'Ich möchte meinen Alltag auf Deutsch beschreiben.',
    es: 'Quiero describir mi rutina diaria en alemán.',
    grammarTag: 'V2',
  },
  {
    de: 'Wann benutze ich "den" statt "der"?',
    es: '¿Cuándo uso "den" en lugar de "der"?',
    grammarTag: 'Akk',
  },
  {
    de: 'Gib mir bitte ein kurzes Beispiel mit "möchten".',
    es: 'Dame por favor un ejemplo corto con "möchten".',
    grammarTag: 'Modal',
  },
];

const extractGermanSegmentsForTTS = (rawMarkdown) => {
  if (!rawMarkdown || typeof rawMarkdown !== 'string') return '';

  const boldMatches = [...rawMarkdown.matchAll(/\*\*([^*\n]{2,120})\*\*/g)].map((m) => m[1].trim());
  const quoteMatches = [...rawMarkdown.matchAll(/[„"«]([^"”»\n]{3,120})[“"»]/g)].map((m) => m[1].trim());

  const spanishStopWords = /\b(hola|ejemplo|palabra|regla|porque|cuando|recuerda|español|significa|pregunta|respuesta|verbo|sustantivo|artículo|acusativo|dativo|nominativo|pista)\b/i;

  const candidates = [...boldMatches, ...quoteMatches].filter(
    (frag) => !spanishStopWords.test(frag) && /[a-zA-ZäöüÄÖÜß]/.test(frag)
  );

  if (candidates.length > 0) {
    return [...new Set(candidates)].slice(0, 4).join('. ');
  }

  return rawMarkdown
    .replace(/[#*>_`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 180);
};

const TutorChat = (props) => {
  if (!props.isOpen) return null;
  return <TutorChatPanel {...props} />;
};

const TutorChatPanel = ({
  onClose,
  setIsOpen,
  isFullscreen: controlledFullscreen,
  setIsFullscreen: setControlledFullscreen,
  chatMessages = [],
  chatInput = '',
  setChatInput,
  sendChatMessage,
  isChatLoading = false,
  chatEndRef,
  user,
  externalNotice = null,
}) => {
  const [internalFullscreen, setInternalFullscreen] = useState(false);
  const isFullscreen = controlledFullscreen !== undefined ? controlledFullscreen : internalFullscreen;
  const setIsFullscreen = setControlledFullscreen || setInternalFullscreen;

  const [playingMsgIndex, setPlayingMsgIndex] = useState(null);
  const [playingSuggestionText, setPlayingSuggestionText] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isAnalyzingDiagnostic, setIsAnalyzingDiagnostic] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState(null);
  const [sessionTurnCount, setSessionTurnCount] = useState(0);

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const latestModelMeta = [...chatMessages]
    .reverse()
    .find((m) => m.role === 'model' && m.structuredMeta)?.structuredMeta;

  const activeSuggestions =
    Array.isArray(latestModelMeta?.suggestedReplies) && latestModelMeta.suggestedReplies.length > 0
      ? latestModelMeta.suggestedReplies
      : STARTER_TUTOR_SUGGESTIONS;

  const handleComposerSend = () => {
    if (!chatInput?.trim() || isChatLoading) return;
    setSessionTurnCount((n) => n + 1);
    sendChatMessage?.();
  };

  const closeImmediately = () => {
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setPlayingSuggestionText(null);
    setIsDiagnosticOpen(false);
    setDiagnosticData(null);
    setSessionTurnCount(0);
    if (onClose) {
      onClose();
    } else if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const buildLocalFallbackDiagnostic = () => {
    const windowSize = Math.max(2, sessionTurnCount * 2 + 1);
    const recentMsgs = chatMessages.slice(-windowSize);
    const collectedErrors = [];
    const collectedVocab = [];
    recentMsgs.forEach((m, idx) => {
      const meta = m.structuredMeta;
      if (Array.isArray(meta?.grammarCorrections)) {
        meta.grammarCorrections.forEach((err, eIdx) => {
          collectedErrors.push({
            id: `tut_loc_${idx}_${eIdx}`,
            userAttempt: err.original || '',
            correctedDe: err.corrected || '',
            explanationEs: err.explanationEs || '',
            category: err.category || 'vocab',
          });
        });
      }
      if (Array.isArray(meta?.newVocabulary)) {
        meta.newVocabulary.forEach((v) => {
          if (v?.de) collectedVocab.push(v);
        });
      }
    });
    return {
      sessionId: `tutor_${Date.now()}`,
      mode: 'tutor',
      title: 'Tutor Socrático Alemán A1',
      fluencyScore: Math.min(95, 70 + sessionTurnCount * 5),
      summaryEs: 'Resumen generado con las correcciones y el vocabulario capturado en esta sesión.',
      missions: [],
      errors: collectedErrors,
      vocabulary: collectedVocab,
    };
  };

  const handleRequestDiagnostic = async () => {
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setIsDiagnosticOpen(true);
    setIsAnalyzingDiagnostic(true);

    const sliceForEval = chatMessages.slice(-14);
    try {
      const activeUser = user || auth?.currentUser;
      const idToken = activeUser ? await activeUser.getIdToken().catch(() => '') : '';
      const response = await fetch(API_ENDPOINTS.TUTOR_CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          historialConversacion: sliceForEval,
          responseFormat: 'structured_v2',
          action: 'evaluate_session',
        }),
      });

      if (!response.ok) throw new Error('Eval failed');
      const data = await response.json();
      setDiagnosticData({
        sessionId: `tutor_${Date.now()}`,
        mode: 'tutor',
        title: 'Tutor Socrático Alemán A1',
        fluencyScore: data.fluencyScore ?? 80,
        summaryEs: data.summaryEs,
        nextStepTipEs: data.nextStepTipEs,
        missions: [],
        errors: (data.errorsSummary || []).map((err, i) => ({
          id: err.id || `tut_err_${i}`,
          userAttempt: err.userSaid || '',
          correctedDe: err.correctedDe || '',
          translationEs: err.translationEs || '',
          explanationEs: err.explanationEs || '',
          category: err.category || 'vocab',
        })),
        vocabulary: data.vocabularyExtracted || [],
      });
    } catch {
      setDiagnosticData(buildLocalFallbackDiagnostic());
    } finally {
      setIsAnalyzingDiagnostic(false);
    }
  };

  const handleCloseClick = () => {
    if (sessionTurnCount >= 2 && !isDiagnosticOpen) {
      handleRequestDiagnostic();
      return;
    }
    closeImmediately();
  };

  const handlePlayAudio = (rawText, idx) => {
    if (playingMsgIndex === idx) {
      stopCurrentAudio();
      setPlayingMsgIndex(null);
      return;
    }
    const germanToSpeak = extractGermanSegmentsForTTS(rawText) || rawText;
    if (!germanToSpeak) return;

    setPlayingMsgIndex(idx);
    setPlayingSuggestionText(null);
    recordSkillActivity('listening', 1).catch(() => {});
    playGermanAudio(germanToSpeak, {
      type: 'sentence',
      voice: 'Charon',
      onEnd: () => setPlayingMsgIndex(null),
      onError: () => setPlayingMsgIndex(null),
    });
  };

  const handlePlaySuggestionAudio = (textDe) => {
    if (!textDe) return;
    if (playingSuggestionText === textDe) {
      stopCurrentAudio();
      setPlayingSuggestionText(null);
      return;
    }
    setPlayingMsgIndex(null);
    setPlayingSuggestionText(textDe);
    playGermanAudio(textDe, {
      type: 'sentence',
      voice: 'Charon',
      onEnd: () => setPlayingSuggestionText(null),
      onError: () => setPlayingSuggestionText(null),
    });
  };

  const handleSelectSuggestion = (item) => {
    if (!item?.de || !setChatInput) return;
    setChatInput(item.de);
  };

  return (
    <>
      <aside
        className={`fixed ${
          isFullscreen ? 'inset-0 w-full z-[100]' : 'top-0 right-0 bottom-0 w-full md:w-[460px] z-[100] border-l'
        } bg-white shadow-2xl border-slate-200 flex flex-col h-[100dvh] overflow-hidden animate-in slide-in-from-right duration-300`}
      >
        <div className="bg-slate-900 text-white px-4 pb-3.5 pt-[max(0.85rem,env(safe-area-inset-top))] flex justify-between items-center flex-shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Bot className="text-yellow-400 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-base sm:text-lg leading-tight truncate">Tutor Alemán</h3>
              <p className="text-[11px] text-slate-400 truncate">Socrático A1 · Sugerencias &amp; SRS</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {sessionTurnCount >= 2 && (
              <button
                type="button"
                onClick={handleRequestDiagnostic}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-2.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                title="Evaluar sesión y guardar errores en tu mazo SRS"
              >
                <ClipboardCheck size={15} />
                <span className="hidden sm:inline">Diagnóstico</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-2 cursor-pointer"
              title={isFullscreen ? 'Minimizar' : 'Pantalla Completa'}
              aria-label={isFullscreen ? 'Minimizar' : 'Pantalla Completa'}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
            <button
              type="button"
              onClick={handleCloseClick}
              className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-2 cursor-pointer"
              title="Cerrar Tutor"
              aria-label="Cerrar Tutor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {externalNotice && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-950 font-medium flex items-center gap-2 shrink-0">
            <Sparkles size={14} className="text-amber-600 shrink-0" />
            <span>{externalNotice}</span>
          </div>
        )}

        <ConversationThread
          messages={chatMessages}
          theme="blue"
          botLabel="Tutor IA"
          isLoading={isChatLoading}
          loadingLabel="Analizando tu mensaje..."
          playingMsgIndex={playingMsgIndex}
          onPlayAudio={handlePlayAudio}
          renderModelContent={(msg) => <MarkdownMessage text={msg?.parts?.[0]?.text || ''} />}
          chatEndRef={chatEndRef}
        />

        <ComposerBar
          value={chatInput}
          onChange={setChatInput}
          onSend={handleComposerSend}
          placeholder="Pregúntame o responde en alemán..."
          disabled={isChatLoading}
          accent="blue"
          suggestions={activeSuggestions}
          showSuggestions={showSuggestions}
          onToggleSuggestions={() => setShowSuggestions((v) => !v)}
          onSelectSuggestion={handleSelectSuggestion}
          onPlaySuggestionAudio={handlePlaySuggestionAudio}
          playingSuggestionText={playingSuggestionText}
        />
      </aside>

      {isDiagnosticOpen && (
        <SessionDiagnosticCard
          key={diagnosticData?.sessionId || 'tutor_eval'}
          isOpen={isDiagnosticOpen}
          isAnalyzing={isAnalyzingDiagnostic}
          diagnostic={diagnosticData}
          onPlayCorrectionAudio={(textDe) => playGermanAudio(textDe, { type: 'sentence', voice: 'Charon' })}
          onSaveToSrs={({ errors, vocabulary }) =>
            captureConversationBundle({
              vocabItems: vocabulary,
              grammarErrors: errors,
              axis: 'general',
              source: 'tutor_chat',
              sourceRef: 'tutor_chat',
            })
          }
          onContinue={() => setIsDiagnosticOpen(false)}
          onExit={closeImmediately}
        />
      )}
    </>
  );
};

export default TutorChat;
