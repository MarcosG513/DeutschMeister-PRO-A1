import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Languages,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Radio,
  Volume2,
  WifiOff,
} from 'lucide-react';
import { useCallSpeechCapture } from '../../hooks/useCallSpeechCapture';
import {
  createPrewarmedCallAudioElement,
  getSavedPlaybackSpeed,
  playTextOnPrewarmedAudio,
  setSavedPlaybackSpeed,
  stopCurrentAudio,
  stopPrewarmedCallAudio,
} from '../../services/aiAudioService';
import {
  recordDailyStudyActivity,
  recordSkillActivity,
} from '../../utils/helpers';

const SPEED_OPTIONS = [0.75, 0.85, 1];
const DEBOUNCE_OPTIONS = [
  { ms: 1200, label: 'Rápido (1.2s)' },
  { ms: 1600, label: 'Normal (1.6s)' },
  { ms: 2200, label: 'Pausado (2.2s)' },
];

export default function CallModeStage({
  scenario,
  messages = [],
  setMessages,
  missionsStatus = [],
  onRunTurn,
  onHangupAndEvaluate,
  onExitScenario,
}) {
  const [callPhase, setCallPhase] = useState('precall'); // 'precall' | 'connecting' | 'ai_speaking' | 'listening' | 'processing' | 'offline'
  const [playbackSpeed, setPlaybackSpeed] = useState(() => getSavedPlaybackSpeed());
  const [silenceDebounceMs, setSilenceDebounceMs] = useState(1600);
  const [showEsSubtitle, setShowEsSubtitle] = useState(true);
  const [callSeconds, setCallSeconds] = useState(0);
  const [statusError, setStatusError] = useState(null);

  const callAudioRef = useRef(null);
  const ttsAbortRef = useRef(null);
  const turnAbortRef = useRef(null);
  const echoGuardTimerRef = useRef(null);
  const activeCallRef = useRef(false);

  const speedRef = useRef(playbackSpeed);
  const callPhaseRef = useRef(callPhase);
  const messagesRef = useRef(messages);
  const missionsRef = useRef(missionsStatus);

  useEffect(() => {
    speedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    callPhaseRef.current = callPhase;
  }, [callPhase]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    missionsRef.current = missionsStatus;
  }, [missionsStatus]);

  useEffect(() => {
    const syncSpeed = (e) => {
      const next = e?.detail !== undefined ? e.detail : getSavedPlaybackSpeed();
      speedRef.current = next;
      setPlaybackSpeed(next);
    };
    window.addEventListener('dm-speed-changed', syncSpeed);
    return () => window.removeEventListener('dm-speed-changed', syncSpeed);
  }, []);

  useEffect(() => {
    if (callPhase === 'precall' || callPhase === 'offline') return undefined;
    const id = setInterval(() => {
      setCallSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [callPhase]);

  const startCaptureRef = useRef(null);

  const schedulePostAiListening = useCallback(() => {
    if (echoGuardTimerRef.current) {
      clearTimeout(echoGuardTimerRef.current);
      echoGuardTimerRef.current = null;
    }
    if (!activeCallRef.current) return;

    // Guardia anti-eco estricto de 300 ms tras finalizar reproducción Charon
    echoGuardTimerRef.current = setTimeout(() => {
      echoGuardTimerRef.current = null;
      if (!activeCallRef.current) return;
      setCallPhase('listening');
      startCaptureRef.current?.();
    }, 300);
  }, []);

  const speakAiReplyRef = useRef(null);

  const handleTurnCommitted = useCallback(
    async (payload) => {
      if (!activeCallRef.current || !scenario) return;
      const textTurn = payload?.text?.trim() || '';
      const hasAudioClip = Boolean(payload?.audioBase64);
      if (!textTurn && !hasAudioClip) {
        if (activeCallRef.current) {
          setCallPhase('listening');
          startCaptureRef.current?.();
        }
        return;
      }

      setCallPhase('processing');
      setStatusError(null);

      const userDisplay = textTurn || '🎤 [Nota de voz en alemán]';
      const userMsgIndex = messagesRef.current.length;
      const nextHistory = [
        ...messagesRef.current,
        { role: 'user', parts: [{ text: userDisplay }] },
      ];
      setMessages(nextHistory);
      recordDailyStudyActivity().catch(() => {});
      recordSkillActivity('speaking', 4).catch(() => {});

      turnAbortRef.current?.abort();
      const turnCtrl = new AbortController();
      turnAbortRef.current = turnCtrl;

      let speechTriggered = false;
      try {
        await onRunTurn(nextHistory, scenario, missionsRef.current, {
          audioPayload: hasAudioClip
            ? { audioBase64: payload.audioBase64, audioMimeType: payload.audioMimeType }
            : null,
          signal: turnCtrl.signal,
          onTranscriptResolved: (transcriptDe) => {
            if (!transcriptDe) return;
            setMessages((prev) =>
              prev.map((m, idx) =>
                idx === userMsgIndex && m.role === 'user'
                  ? { ...m, parts: [{ text: transcriptDe }] }
                  : m
              )
            );
          },
          onReplyDeReady: (replyDe) => {
            if (!replyDe || speechTriggered || !activeCallRef.current) return;
            speechTriggered = true;
            speakAiReplyRef.current?.(replyDe);
          },
        });
      } catch (err) {
        if (turnCtrl.signal.aborted || !activeCallRef.current) return;
        setStatusError(err?.message || 'Se perdió un instante la conexión de llamada.');
        setCallPhase('listening');
        startCaptureRef.current?.();
      }
    },
    [onRunTurn, scenario, setMessages]
  );

  const {
    platformMode,
    isCapturing,
    liveTranscript,
    micRmsLevel,
    captureError,
    startCapture,
    stopCapture,
    abortCapture,
  } = useCallSpeechCapture({
    language: 'de-DE',
    silenceDebounceMs,
    maxTurnMs: 15000,
    onFinalTurn: handleTurnCommitted,
    onError: (errMsg) => {
      if (activeCallRef.current) {
        setStatusError(errMsg);
      }
    },
  });

  useEffect(() => {
    startCaptureRef.current = startCapture;
  }, [startCapture]);

  const speakAiReply = useCallback(
    async (replyDe) => {
      if (!activeCallRef.current || !replyDe) return;
      if (echoGuardTimerRef.current) {
        clearTimeout(echoGuardTimerRef.current);
        echoGuardTimerRef.current = null;
      }

      // Half-duplex estricto: asegurar captura detenida antes de reproducir
      await abortCapture();
      if (!activeCallRef.current) return;

      setCallPhase('ai_speaking');
      recordSkillActivity('listening', 1).catch(() => {});

      ttsAbortRef.current?.abort();
      const ttsCtrl = new AbortController();
      ttsAbortRef.current = ttsCtrl;

      await playTextOnPrewarmedAudio(callAudioRef.current, replyDe, {
        speed: speedRef.current,
        lang: 'de',
        signal: ttsCtrl.signal,
      });

      if (!ttsCtrl.signal.aborted && activeCallRef.current) {
        schedulePostAiListening();
      }
    },
    [abortCapture, schedulePostAiListening]
  );

  useEffect(() => {
    speakAiReplyRef.current = speakAiReply;
  }, [speakAiReply]);

  const releaseAllCallHardware = useCallback(async () => {
    activeCallRef.current = false;
    if (echoGuardTimerRef.current) {
      clearTimeout(echoGuardTimerRef.current);
      echoGuardTimerRef.current = null;
    }
    ttsAbortRef.current?.abort();
    turnAbortRef.current?.abort();
    stopPrewarmedCallAudio(callAudioRef.current);
    stopCurrentAudio();
    await abortCapture();
  }, [abortCapture]);

  useEffect(() => {
    return () => {
      releaseAllCallHardware().catch(() => {});
    };
  }, [releaseAllCallHardware]);

  const handleStartCall = async () => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setCallPhase('offline');
      return;
    }

    // Pre-calentado OBLIGATORIO del único HTMLAudioElement dentro del gesto del usuario
    callAudioRef.current = createPrewarmedCallAudioElement();
    activeCallRef.current = true;
    setStatusError(null);
    setCallSeconds(0);
    setCallPhase('connecting');

    const seedMsgs = [
      {
        role: 'user',
        parts: [{ text: 'Hola, inicia la simulación según las instrucciones.' }],
      },
    ];
    setMessages(seedMsgs);

    turnAbortRef.current?.abort();
    const ctrl = new AbortController();
    turnAbortRef.current = ctrl;
    let firstSpoken = false;

    try {
      await onRunTurn(seedMsgs, scenario, missionsRef.current, {
        signal: ctrl.signal,
        onReplyDeReady: (replyDe) => {
          if (!replyDe || firstSpoken || !activeCallRef.current) return;
          firstSpoken = true;
          speakAiReplyRef.current?.(replyDe);
        },
      });
    } catch {
      if (!activeCallRef.current || ctrl.signal.aborted) return;
      if (scenario?.openingLine && !firstSpoken) {
        firstSpoken = true;
        setMessages([
          ...seedMsgs,
          { role: 'model', parts: [{ text: scenario.openingLine }] },
        ]);
        speakAiReplyRef.current?.(scenario.openingLine);
      } else {
        setStatusError('No se pudo conectar la llamada IA. Verifica tu red e intenta de nuevo.');
        setCallPhase('precall');
        activeCallRef.current = false;
      }
    }
  };

  // Barge-in al tocar avatar mientras la IA habla, o cierre manual de turno si está escuchando
  const handleAvatarTap = async () => {
    if (callPhase === 'ai_speaking') {
      ttsAbortRef.current?.abort();
      stopPrewarmedCallAudio(callAudioRef.current);
      if (echoGuardTimerRef.current) {
        clearTimeout(echoGuardTimerRef.current);
        echoGuardTimerRef.current = null;
      }
      setCallPhase('listening');
      setTimeout(() => {
        if (activeCallRef.current) {
          startCapture();
        }
      }, 120);
      return;
    }

    if (callPhase === 'listening') {
      if (isCapturing) {
        await stopCapture();
      } else {
        startCapture();
      }
    }
  };

  const handleHangupAndEvaluateClick = async () => {
    await releaseAllCallHardware();
    onHangupAndEvaluate?.();
  };

  const handleSelectSpeed = (spd) => {
    const valid = setSavedPlaybackSpeed(spd);
    speedRef.current = valid;
    setPlaybackSpeed(valid);
  };

  const latestModelMsg = [...messages].reverse().find((m) => m.role === 'model');
  const latestAiText = latestModelMsg?.structuredMeta?.replyDe || latestModelMsg?.parts?.[0]?.text || '';
  const latestAiEs = latestModelMsg?.structuredMeta?.translationEs || '';
  const completedCount = missionsStatus.filter((m) => m.completed).length;

  const formattedTimer = `${String(Math.floor(callSeconds / 60)).padStart(2, '0')}:${String(
    callSeconds % 60
  ).padStart(2, '0')}`;

  const ringScale =
    callPhase === 'listening'
      ? 1 + Math.min(0.28, micRmsLevel * 0.28)
      : callPhase === 'ai_speaking'
        ? 1.12
        : 1;

  // =========================================================================
  // VISTA PRE-LLAMADA / SIN CONEXIÓN
  // =========================================================================
  if (callPhase === 'precall' || callPhase === 'offline') {
    return (
      <div className="bg-black text-white min-h-[calc(100dvh-5rem)] rounded-3xl border border-zinc-800 max-w-2xl mx-auto p-5 sm:p-7 flex flex-col justify-between gap-6 shadow-2xl pt-[max(1.25rem,env(safe-area-inset-top))] animate-in fade-in duration-200">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              releaseAllCallHardware();
              onExitScenario?.();
            }}
            className="min-h-[44px] px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold cursor-pointer transition"
          >
            Cambiar escenario
          </button>
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            OLED Hands-Free · {platformMode === 'android_native' ? 'Android STT' : platformMode === 'ios_pwa_mediarecorder' ? 'iOS PWA Audio' : 'Web Speech'}
          </span>
        </div>

        <div className="text-center space-y-3 my-auto">
          <div className="w-24 h-24 mx-auto rounded-full bg-zinc-900 border-2 border-emerald-400/50 flex items-center justify-center text-5xl shadow-lg shadow-emerald-950/50">
            <span aria-hidden="true">{scenario.icon}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{scenario.title}</h2>
          <p className="text-xs sm:text-sm text-emerald-300 font-bold">{scenario.aiPersona || 'Interlocutor alemán A1–A2'}</p>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            {scenario.desc} Voz Charon con WSOLA limpio, bloqueo half-duplex anti-eco e interrupción directa tocando el avatar.
          </p>

          {callPhase === 'offline' && (
            <div className="bg-amber-950/70 border border-amber-500/40 text-amber-200 rounded-2xl p-3.5 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
              <WifiOff size={16} aria-hidden="true" />
              <span>Sin conexión: la llamada en vivo requiere internet.</span>
            </div>
          )}

          {/* Misiones */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {(missionsStatus || []).map((m, idx) => (
              <span
                key={m.id || idx}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                {idx + 1}. {m.titleEs}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-zinc-400">Velocidad WSOLA Charon:</span>
            <div className="flex items-center gap-1.5">
              {SPEED_OPTIONS.map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSelectSpeed(spd)}
                  className={`min-h-[44px] px-3 rounded-xl text-xs font-black border cursor-pointer transition ${
                    Number(playbackSpeed) === spd
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {spd === 1 ? '1.0x' : `${spd}x`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-zinc-400">Pausa silencio micrófono:</span>
            <div className="flex items-center gap-1.5">
              {DEBOUNCE_OPTIONS.map((opt) => (
                <button
                  key={opt.ms}
                  type="button"
                  onClick={() => setSilenceDebounceMs(opt.ms)}
                  className={`min-h-[44px] px-2.5 rounded-xl text-[11px] font-bold border cursor-pointer transition ${
                    silenceDebounceMs === opt.ms
                      ? 'bg-sky-500 border-sky-400 text-slate-950'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartCall}
            className="w-full min-h-[56px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/60 cursor-pointer transition"
          >
            <Phone size={20} aria-hidden="true" />
            <span>Iniciar Llamada</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VISTA ACTIVA DE LLAMADA OLED HANDS-FREE
  // =========================================================================
  return (
    <div className="bg-black text-white min-h-[calc(100dvh-5rem)] rounded-3xl border border-zinc-800 max-w-2xl mx-auto p-4 sm:p-6 flex flex-col justify-between gap-4 shadow-2xl pt-[max(1rem,env(safe-area-inset-top))] animate-in fade-in duration-200">
      {/* Cabecera OLED: estado, timer, misiones */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Radio
              size={16}
              className={
                callPhase === 'listening'
                  ? 'text-emerald-400 animate-pulse shrink-0'
                  : callPhase === 'ai_speaking'
                    ? 'text-indigo-400 animate-pulse shrink-0'
                    : 'text-amber-400 shrink-0'
              }
              aria-hidden="true"
            />
            <span className="font-black text-sm sm:text-base truncate">{scenario.title}</span>
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-emerald-300 shrink-0">
            {formattedTimer}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-[11px] font-black text-zinc-400 shrink-0 mr-1">
            {completedCount}/{missionsStatus.length || 3} Misiones:
          </span>
          {missionsStatus.map((m, i) => (
            <span
              key={m.id || i}
              className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                m.completed
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              <CheckCircle2 size={11} aria-hidden="true" />
              <span>{m.titleEs}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Centro: Avatar Reactivo OLED + Barge-in táctil */}
      <div className="flex flex-col items-center justify-center gap-4 py-2 my-auto">
        <button
          type="button"
          onClick={handleAvatarTap}
          aria-label={
            callPhase === 'ai_speaking'
              ? 'Interrumpir a Charon y hablar ahora'
              : 'Enviar turno de voz ahora'
          }
          className="relative flex items-center justify-center w-40 h-40 rounded-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
        >
          <span
            aria-hidden="true"
            style={{ transform: `scale(${ringScale})` }}
            className={`absolute inset-0 rounded-full transition-transform duration-150 border-4 ${
              callPhase === 'listening'
                ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_40px_rgba(16,185,129,0.4)]'
                : callPhase === 'ai_speaking'
                  ? 'border-indigo-400 bg-indigo-500/20 animate-pulse shadow-[0_0_40px_rgba(129,140,248,0.45)]'
                  : 'border-amber-400 bg-amber-500/15'
            }`}
          />
          <span className="relative z-10 text-6xl" aria-hidden="true">
            {scenario.icon}
          </span>
        </button>

        <div className="text-center space-y-1">
          <div className="text-sm font-black uppercase tracking-wider text-emerald-300">
            {callPhase === 'connecting' && 'Conectando con Charon...'}
            {callPhase === 'ai_speaking' && 'Charon hablando · Toca el avatar para interrumpir'}
            {callPhase === 'listening' &&
              (isCapturing ? 'Tu turno · Habla en alemán' : 'Preparando micrófono...')}
            {callPhase === 'processing' && 'Analizando tu respuesta...'}
          </div>
          {liveTranscript && callPhase === 'listening' && (
            <p className="text-xs sm:text-sm text-sky-300 font-semibold max-w-md mx-auto">
              „{liveTranscript}“
            </p>
          )}
        </div>

        {/* Subtítulo vivo de la IA */}
        {latestAiText && (
          <div className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-2 text-left">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-black uppercase text-indigo-300 flex items-center gap-1.5">
                <Volume2 size={14} aria-hidden="true" />
                <span>{scenario.aiPersona || 'Interlocutor'}</span>
              </span>
              {latestAiEs && (
                <button
                  type="button"
                  onClick={() => setShowEsSubtitle((v) => !v)}
                  className="min-h-[36px] px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Languages size={13} aria-hidden="true" />
                  <span>{showEsSubtitle ? 'Ocultar ES' : 'Ver ES'}</span>
                </button>
              )}
            </div>
            <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {latestAiText}
            </p>
            {showEsSubtitle && latestAiEs && (
              <p className="text-xs text-zinc-400 italic">{latestAiEs}</p>
            )}
          </div>
        )}

        {(statusError || captureError) && (
          <p className="text-xs text-rose-300 bg-rose-950/70 border border-rose-500/40 rounded-xl px-3.5 py-2 text-center">
            {statusError || captureError}
          </p>
        )}
      </div>

      {/* Dock inferior de controles táctiles */}
      <div className="space-y-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5" role="group" aria-label="Velocidad Charon">
            {SPEED_OPTIONS.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => handleSelectSpeed(spd)}
                className={`min-h-[44px] px-3 rounded-xl text-xs font-black border cursor-pointer transition ${
                  Number(playbackSpeed) === spd
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {spd === 1 ? '1.0x' : `${spd}x`}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAvatarTap}
            disabled={callPhase === 'processing' || callPhase === 'connecting'}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-black flex items-center gap-1.5 border cursor-pointer disabled:opacity-40 transition ${
              callPhase === 'ai_speaking'
                ? 'bg-indigo-600 border-indigo-400 text-white'
                : isCapturing
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-200'
            }`}
          >
            {callPhase === 'ai_speaking' ? (
              <>
                <Mic size={15} aria-hidden="true" />
                <span>Interrumpir (Barge-in)</span>
              </>
            ) : isCapturing ? (
              <>
                <MicOff size={15} aria-hidden="true" />
                <span>Enviar ahora</span>
              </>
            ) : (
              <>
                <Mic size={15} aria-hidden="true" />
                <span>Hablar</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={handleHangupAndEvaluateClick}
          className="w-full min-h-[54px] rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-[0.99] text-white font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-rose-950/60 cursor-pointer transition"
        >
          <PhoneOff size={20} aria-hidden="true" />
          <span>Colgar y Evaluar</span>
        </button>
      </div>
    </div>
  );
}
