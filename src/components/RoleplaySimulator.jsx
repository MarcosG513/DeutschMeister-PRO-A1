import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Sparkles, X } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import ConversationThread from './chat/ConversationThread';
import ComposerBar from './chat/ComposerBar';
import SessionDiagnosticCard from './chat/SessionDiagnosticCard';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { ROLEPLAY_AXES, roleplayScenariosCatalog } from '../data/roleplayScenarios';
import { recordDailyStudyActivity, recordSkillActivity, scrollInputIntoView } from '../utils/helpers';
import { captureConversationBundle } from '../services/srsBridgeService';

const DEFAULT_MISSIONS = [
  { id: 'm1', titleEs: 'Saludar y abrir la conversación en alemán' },
  { id: 'm2', titleEs: 'Responder con una estructura A1 completa' },
  { id: 'm3', titleEs: 'Confirmar el cierre o despedirte con cortesía' },
];

const DEFAULT_SUGGESTIONS = [
  { de: 'Guten Tag! Wie geht es Ihnen?', es: '¡Buenos días! ¿Cómo está usted?', grammarTag: 'Sie' },
  { de: 'Können Sie das bitte wiederholen?', es: '¿Puede repetir eso, por favor?', grammarTag: 'A1' },
  { de: 'Vielen Dank und auf Wiedersehen!', es: '¡Muchas gracias y hasta la vista!', grammarTag: 'Cierre' },
];

const RoleplaySimulator = ({
  onExit,
  initialMode = 'roleplay',
}) => {
  const [selectedAxis, setSelectedAxis] = useState('all');
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isBlurting, setIsBlurting] = useState(false);
  const [blurtInput, setBlurtInput] = useState('');
  const [playingMsgIndex, setPlayingMsgIndex] = useState(null);
  const [playingSuggestionText, setPlayingSuggestionText] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [missionsStatus, setMissionsStatus] = useState([]);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isAnalyzingDiagnostic, setIsAnalyzingDiagnostic] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const handlePlayAudio = (text, idx) => {
    if (playingMsgIndex === idx) {
      stopCurrentAudio();
      setPlayingMsgIndex(null);
      return;
    }
    if (!text) return;
    setPlayingMsgIndex(idx);
    setPlayingSuggestionText(null);
    recordSkillActivity('listening', 1).catch(() => {});
    playGermanAudio(text, {
      type: 'dialogue',
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
      type: 'dialogue',
      voice: 'Charon',
      onEnd: () => setPlayingSuggestionText(null),
      onError: () => setPlayingSuggestionText(null),
    });
  };

  const filteredScenarios = useMemo(() => {
    if (selectedAxis === 'all') return roleplayScenariosCatalog;
    return roleplayScenariosCatalog.filter((s) => s.axis === selectedAxis);
  }, [selectedAxis]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSelectScenario = (scen) => {
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setPlayingSuggestionText(null);
    setScenario(scen);
    setMissionsStatus(
      (scen.missions || DEFAULT_MISSIONS).map((m) => ({
        id: m.id,
        titleEs: m.titleEs,
        completed: false,
        evidenceDe: '',
      }))
    );
    setSuggestions(scen.starterSuggestions || DEFAULT_SUGGESTIONS);
    setShowSuggestions(true);
    setIsDiagnosticOpen(false);
    setDiagnosticData(null);

    if (initialMode === 'phrase') {
      setIsBlurting(false);
      startScenario(scen);
    } else {
      setIsBlurting(true);
      setBlurtInput('');
    }
  };

  const submitBlurting = () => {
    if (blurtInput.trim().split(/[\s,;]+/).filter((w) => w.length >= 2).length < 2) return;
    setIsBlurting(false);
    recordSkillActivity('writing', 3).catch(() => {});
    startScenario(scenario);
  };

  const streamRoleplayTurn = async (conversationHistory, scen, prevMissions) => {
    const currentUser = getAuth().currentUser;
    const idToken = currentUser ? await currentUser.getIdToken().catch(() => '') : '';
    const response = await fetch(API_ENDPOINTS.ROLEPLAY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
      },
      body: JSON.stringify({
        historialConversacion: conversationHistory,
        escenario: scen.prompt,
        responseFormat: 'roleplay_v2',
        action: 'turn',
        missions: scen.missions || DEFAULT_MISSIONS,
        previousMissionsStatus: prevMissions,
      }),
    });
    if (!response.ok) throw new Error('Failed to connect to Roleplay');

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let legacyText = '';

    setMessages((prev) => [
      ...prev,
      { role: 'model', parts: [{ text: '' }], structuredMeta: null },
    ]);
    setLoading(false);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ') || line.includes('[DONE]')) continue;
        try {
          const data = JSON.parse(line.substring(6));
          if (data.type === 'reply_de_ready' && data.replyDe) {
            setMessages((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;
              if (lastIdx >= 0) {
                updated[lastIdx] = {
                  role: 'model',
                  parts: [{ text: data.replyDe }],
                  structuredMeta: { ...(updated[lastIdx].structuredMeta || {}), replyDe: data.replyDe },
                };
              }
              return updated;
            });
          } else if (data.type === 'roleplay_turn_v2' && data.payload) {
            const p = data.payload;
            const replyText = (p.replyDe || '').replace(/\*\*/g, '');
            setMessages((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;
              if (lastIdx >= 0) {
                updated[lastIdx] = {
                  role: 'model',
                  parts: [{ text: replyText }],
                  structuredMeta: {
                    replyDe: replyText,
                    translationEs: p.translationEs || '',
                    grammarCorrections: Array.isArray(p.grammarCorrections) ? p.grammarCorrections : [],
                    suggestedReplies: Array.isArray(p.suggestedReplies) ? p.suggestedReplies : [],
                  },
                };
              }
              return updated;
            });
            if (Array.isArray(p.suggestedReplies) && p.suggestedReplies.length > 0) {
              setSuggestions(p.suggestedReplies);
            }
            if (Array.isArray(p.missionsStatus) && p.missionsStatus.length > 0) {
              setMissionsStatus((prev) =>
                (scen.missions || DEFAULT_MISSIONS).map((m, i) => {
                  const found = p.missionsStatus.find((ms) => ms.id === m.id) || p.missionsStatus[i];
                  const old = prev.find((om) => om.id === m.id);
                  return {
                    id: m.id,
                    titleEs: m.titleEs,
                    completed: Boolean(old?.completed) || Boolean(found?.completed),
                    evidenceDe: found?.evidenceDe || old?.evidenceDe || '',
                  };
                })
              );
            }
          } else if (data.text) {
            legacyText += data.text;
            const cleanedText = legacyText.replace(/\*\*/g, '');
            setMessages((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;
              if (lastIdx >= 0) {
                updated[lastIdx] = {
                  role: 'model',
                  parts: [{ text: cleanedText }],
                };
              }
              return updated;
            });
          }
        } catch {
          // Ignorar fragmento SSE parcial
        }
      }
    }
  };

  const startScenario = async (scen) => {
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setScenario(scen);
    setMessages([]);
    setLoading(true);
    const initialMsgs = [
      {
        role: 'user',
        parts: [{ text: 'Hola, inicia la simulación según las instrucciones.' }],
      },
    ];
    try {
      await streamRoleplayTurn(initialMsgs, scen, []);
    } catch {
      setMessages([
        {
          role: 'model',
          parts: [{ text: 'Entschuldigung, es gibt ein Verbindungsproblem. (Error de conexión).' }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !scenario || loading) return;
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setPlayingSuggestionText(null);

    const newMsgs = [
      ...messages,
      { role: 'user', parts: [{ text: input.trim() }] },
    ];
    setMessages(newMsgs);
    setInput('');
    recordDailyStudyActivity().catch(() => {});
    recordSkillActivity('writing', 4).catch(() => {});
    setLoading(true);
    try {
      await streamRoleplayTurn(newMsgs, scenario, missionsStatus);
    } catch (e) {
      console.error(e);
      setMessages([
        ...newMsgs,
        {
          role: 'model',
          parts: [{ text: 'Entschuldigung, es gibt ein Verbindungsproblem. (Error de conexión).' }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const buildLocalRoleplayDiagnostic = () => {
    const collectedErrors = [];
    messages.forEach((m, idx) => {
      const corrs = m?.structuredMeta?.grammarCorrections || [];
      corrs.forEach((c, cIdx) => {
        collectedErrors.push({
          id: `rp_loc_${idx}_${cIdx}`,
          userAttempt: c.original || '',
          correctedDe: c.corrected || '',
          explanationEs: c.explanationEs || '',
          category: c.category || 'vocab',
        });
      });
    });
    const completed = missionsStatus.filter((m) => m.completed).length;
    return {
      sessionId: `rp_${scenario?.id || 'scen'}_${Date.now()}`,
      mode: initialMode === 'phrase' ? 'phrase' : 'roleplay',
      title: scenario?.title || 'Roleplay A1',
      fluencyScore: Math.round(55 + (completed / Math.max(1, missionsStatus.length)) * 40),
      summaryEs: `Completaste ${completed} de ${missionsStatus.length} misiones en "${scenario?.title}".`,
      missions: missionsStatus,
      errors: collectedErrors,
      vocabulary: (scenario?.targetVocabulary || []).map((v) => ({
        termDe: v.termDe,
        translationEs: v.translationEs,
        exampleDe: v.exampleDe,
      })),
    };
  };

  const handleEvaluateAndFinish = async () => {
    if (!scenario) return;
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setIsDiagnosticOpen(true);
    setIsAnalyzingDiagnostic(true);

    try {
      const currentUser = getAuth().currentUser;
      const idToken = currentUser ? await currentUser.getIdToken().catch(() => '') : '';
      const response = await fetch(API_ENDPOINTS.ROLEPLAY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          historialConversacion: messages,
          escenario: scenario.prompt,
          responseFormat: 'roleplay_v2',
          action: 'evaluate_final',
          missions: scenario.missions || DEFAULT_MISSIONS,
          previousMissionsStatus: missionsStatus,
        }),
      });
      if (!response.ok) throw new Error('Roleplay eval error');
      const data = await response.json();
      setDiagnosticData({
        sessionId: `rp_${scenario.id}_${Date.now()}`,
        mode: initialMode === 'phrase' ? 'phrase' : 'roleplay',
        title: scenario.title,
        fluencyScore: data.fluencyScore ?? 75,
        summaryEs: data.summaryEs,
        nextStepTipEs: data.nextStepTipEs,
        missions: data.missionsStatus || missionsStatus,
        errors: (data.errorsSummary || []).map((err, i) => ({
          id: err.id || `rp_err_${i}`,
          userAttempt: err.userSaid || '',
          correctedDe: err.correctedDe || '',
          translationEs: err.translationEs || '',
          explanationEs: err.explanationEs || '',
          category: err.category || 'vocab',
        })),
        vocabulary: data.vocabularyExtracted || [],
      });
      recordSkillActivity('speaking', 5).catch(() => {});
    } catch {
      setDiagnosticData(buildLocalRoleplayDiagnostic());
    } finally {
      setIsAnalyzingDiagnostic(false);
    }
  };

  const userTurnsCount = messages.filter(
    (m) => m.role === 'user' && m?.parts?.[0]?.text !== 'Hola, inicia la simulación según las instrucciones.'
  ).length;

  const completedMissionsCount = missionsStatus.filter((m) => m.completed).length;

  if (!scenario) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto mt-4 sm:mt-8 animate-in fade-in zoom-in duration-300 relative">
        <button
          type="button"
          onClick={() => {
            stopCurrentAudio();
            onExit();
          }}
          className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition font-bold shadow-sm cursor-pointer"
        >
          <X size={18} /> Salir
        </button>
        <div className="text-center mb-6 mt-6 sm:mt-4">
          <div className="inline-flex bg-purple-100 text-purple-600 p-3 rounded-full mb-4 shadow-sm">
            <Sparkles size={32} aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Simulador de Rol A1–A2</h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Practica situaciones reales de trámites en Alemania y trabajo técnico con 3 misiones y diagnóstico SRS.
          </p>
        </div>

        {/* Filtro de Eje (tabs horizontales en una sola fila sin wrapping) */}
        <div
          role="tablist"
          aria-label="Filtrar escenarios de roleplay por eje"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 mb-5"
        >
          {ROLEPLAY_AXES.map((ax) => {
            const active = selectedAxis === ax.id;
            return (
              <button
                key={ax.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedAxis(ax.id)}
                className={`relative min-h-[44px] px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition ${
                  active
                    ? 'text-purple-700 font-bold after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:border-b-[3px] after:border-purple-600'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <span aria-hidden="true">{ax.emoji}</span>
                <span>{ax.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredScenarios.map((scen) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => handleSelectScenario(scen)}
              className="flex flex-col items-center p-5 bg-slate-50 border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl transition-all text-center group cursor-pointer shadow-sm min-h-[44px]"
            >
              <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">
                {scen.icon}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
                {scen.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                    {scen.badge}
                  </span>
                )}
                {scen.level && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-200 text-slate-700">
                    {scen.level}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">{scen.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">{scen.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (scenario && isBlurting) {
    return (
      <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 max-w-xl mx-auto mt-6 sm:mt-10 animate-in fade-in zoom-in duration-300 text-center">
        <button
          type="button"
          onClick={() => {
            stopCurrentAudio();
            setScenario(null);
            setIsBlurting(false);
          }}
          className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition font-bold shadow-sm cursor-pointer"
        >
          <X size={18} /> Salir
        </button>
        <div className="inline-flex bg-amber-100 text-amber-600 p-4 rounded-full mb-5 shadow-sm mt-4 sm:mt-0">
          <span className="text-4xl">🧠</span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Calentamiento Cognitivo</h2>
        <p className="text-slate-500 mb-6 leading-relaxed text-sm sm:text-base">
          Antes de entrar al escenario <span className="font-bold text-purple-600">{scenario.title}</span>, escribe rápido{' '}
          <span className="font-bold">3 palabras en alemán</span> que recuerdes sobre este tema.
        </p>
        <div className="relative mb-5">
          <input
            type="text"
            autoFocus
            className="w-full bg-slate-100 border-2 border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-3.5 px-5 text-sm text-slate-800 outline-none transition shadow-inner placeholder:text-slate-400"
            placeholder={`Ej: ${scenario.blurtHint || 'Hallo, Name, kommen'}...`}
            value={blurtInput}
            onChange={(e) => setBlurtInput(e.target.value)}
            onFocus={scrollInputIntoView}
            onKeyDown={(e) => e.key === 'Enter' && submitBlurting()}
          />
        </div>
        <button
          type="button"
          onClick={submitBlurting}
          disabled={blurtInput.trim().length < 3}
          className="w-full min-h-[44px] py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition shadow-md text-base cursor-pointer"
        >
          Comenzar Rol ✨
        </button>
        <p className="text-xs text-slate-400 mt-4">Pulsa Enter o haz clic para continuar</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col min-h-[460px] h-[calc(100dvh-9.5rem)] sm:h-[720px] sm:max-h-[85vh] max-w-3xl mx-auto sm:mt-4 overflow-hidden animate-in slide-in-from-bottom-4">
        {/* Cabecera + tracker de 3 misiones */}
        <div className="bg-purple-700 text-white px-4 py-3 shadow-md z-10 flex-shrink-0 space-y-2.5">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-2xl shrink-0">{scenario.icon}</span>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg leading-tight truncate">{scenario.title}</h3>
                <p className="text-purple-200 text-xs">
                  Misiones: {completedMissionsCount}/{missionsStatus.length || 3}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {userTurnsCount >= 1 && (
                <button
                  type="button"
                  onClick={handleEvaluateAndFinish}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-lg transition text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ClipboardCheck size={15} />
                  <span>Finalizar y Evaluar</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  stopCurrentAudio();
                  setPlayingMsgIndex(null);
                  setScenario(null);
                }}
                className="text-purple-100 hover:text-white hover:bg-purple-800 px-2.5 py-1.5 rounded-lg transition text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <X size={16} />
                <span className="hidden sm:inline">Cambiar</span>
              </button>
            </div>
          </div>

          {/* Tira compacta de 3 misiones */}
          <div className="flex flex-nowrap gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {missionsStatus.map((m, idx) => (
              <div
                key={m.id || idx}
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                  m.completed
                    ? 'bg-emerald-400/25 border-emerald-300/60 text-white'
                    : 'bg-purple-900/50 border-purple-400/30 text-purple-100'
                }`}
              >
                <CheckCircle2
                  size={12}
                  className={m.completed ? 'text-emerald-300' : 'text-purple-300/50'}
                />
                <span>{m.titleEs}</span>
              </div>
            ))}
          </div>
        </div>

        <ConversationThread
          messages={messages}
          theme="purple"
          botLabel="Interlocutor IA"
          isLoading={loading}
          loadingLabel="El personaje está respondiendo..."
          playingMsgIndex={playingMsgIndex}
          onPlayAudio={handlePlayAudio}
          skipInitialSeed={true}
          chatEndRef={chatEndRef}
        />

        <ComposerBar
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          placeholder="Responde en alemán o usa el micrófono..."
          disabled={loading}
          accent="purple"
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onToggleSuggestions={() => setShowSuggestions((v) => !v)}
          onSelectSuggestion={(item) => item?.de && setInput(item.de)}
          onPlaySuggestionAudio={handlePlaySuggestionAudio}
          playingSuggestionText={playingSuggestionText}
        />
      </div>

      {isDiagnosticOpen && (
        <SessionDiagnosticCard
          key={diagnosticData?.sessionId || 'roleplay_eval'}
          isOpen={isDiagnosticOpen}
          isAnalyzing={isAnalyzingDiagnostic}
          diagnostic={diagnosticData}
          onPlayCorrectionAudio={(textDe) => playGermanAudio(textDe, { type: 'dialogue', voice: 'Charon' })}
          onSaveToSrs={({ errors, vocabulary }) =>
            captureConversationBundle({
              vocabItems: vocabulary,
              grammarErrors: errors,
              axis: scenario?.axis || 'general',
              source: initialMode === 'phrase' ? 'dialogue' : 'roleplay',
              sourceRef: scenario?.id || 'roleplay',
            })
          }
          onContinue={() => setIsDiagnosticOpen(false)}
          onExit={() => {
            setIsDiagnosticOpen(false);
            setScenario(null);
            onExit?.();
          }}
        />
      )}
    </>
  );
};

export default RoleplaySimulator;
