import { useState, useRef, useEffect, useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import {
  abortableDelay,
  speakSpanishPrompt,
  speakGermanCharon,
  stopAllDrivingSpeech,
  buildMicroTipEs
} from "../utils/drivingSpeechHelper";
import { unlockWebKitAudioContext } from "../utils/cleanTimeStretch";
import { cleanTextForCarScreen } from "../services/androidAutoBridge";

function createSilentAudioDataUri() {
  if (typeof window === "undefined") return "";
  const sampleRate = 8000;
  const numSamples = sampleRate;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + numSamples * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, numSamples * 2, true);
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return "data:audio/wav;base64," + window.btoa(binary);
}

export function useDrivingModePlayer({
  initialQueue = [],
  initialIndex = 0,
  sessionKey = "default",
  includeSentences = true,
  includeTips = true,
  onWordStudied,
  onIndexChange
}) {
  const [queue, setQueue] = useState(initialQueue);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const maxIdx = Math.max(0, initialQueue.length - 1);
    return Math.min(Math.max(0, initialIndex), maxIdx);
  });
  const [playerState, setPlayerState] = useState("idle");
  // Estados: 'idle' | 'prompting_word' | 'waiting_word' | 'revealing_word' | 'explaining' | 'prompting_sentence' | 'waiting_sentence' | 'revealing_sentence' | 'paused'
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdownSec, setCountdownSec] = useState(0);
  const [stepAttemptId, setStepAttemptId] = useState(0);

  const abortControllerRef = useRef(null);
  const silentAudioRef = useRef(null);
  const keepAliveCtxRef = useRef(null);
  const keepAliveOscRef = useRef(null);
  const keepAliveResumeTimerRef = useRef(null);
  const wakeLockRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  const queueRef = useRef(queue);
  queueRef.current = queue;

  const sessionKeyRef = useRef(sessionKey);
  const onIndexChangeRef = useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;

  const includeSentencesRef = useRef(includeSentences);
  includeSentencesRef.current = includeSentences;
  const includeTipsRef = useRef(includeTips);
  includeTipsRef.current = includeTips;
  const onWordStudiedRef = useRef(onWordStudied);
  onWordStudiedRef.current = onWordStudied;

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    stopAllDrivingSpeech();

    setQueue(initialQueue);
    queueRef.current = initialQueue;

    const maxIdx = Math.max(0, initialQueue.length - 1);
    const targetIdx = Math.min(Math.max(0, initialIndex), maxIdx);
    setCurrentIndex(targetIdx);
    setCountdownSec(0);

    if (sessionKeyRef.current !== sessionKey) {
      sessionKeyRef.current = sessionKey;
      setIsPlaying(false);
      setPlayerState("idle");
    }
  }, [initialQueue, sessionKey, initialIndex]);

  useEffect(() => {
    if (queueRef.current && queueRef.current.length > 0) {
      const item = queueRef.current[currentIndex] || null;
      onIndexChangeRef.current?.(currentIndex, item);
    }
  }, [currentIndex]);

  const currentItem = queue[currentIndex] || null;

  const scheduleKeepAliveResume = useCallback(() => {
    if (!isPlayingRef.current) return;
    if (keepAliveResumeTimerRef.current) {
      clearTimeout(keepAliveResumeTimerRef.current);
    }
    keepAliveResumeTimerRef.current = setTimeout(() => {
      keepAliveResumeTimerRef.current = null;
      if (!isPlayingRef.current) return;
      try {
        if (silentAudioRef.current && silentAudioRef.current.paused) {
          silentAudioRef.current.play().catch(() => {});
        }
      } catch (_) {}
      try {
        if (keepAliveCtxRef.current && keepAliveCtxRef.current.state === "suspended") {
          keepAliveCtxRef.current.resume().catch(() => {});
        }
      } catch (_) {}
    }, 600);
  }, []);

  // Gestión de Wake Lock y Doble Keep-Alive Acústico (<audio> silente + AudioContext 1 Hz)
  const acquireKeepAlive = useCallback(async () => {
    try {
      if (!silentAudioRef.current && typeof Audio !== "undefined") {
        const audioUri = createSilentAudioDataUri();
        if (audioUri) {
          const audio = new Audio(audioUri);
          audio.playsInline = true;
          audio.setAttribute("playsinline", "");
          audio.setAttribute("webkit-playsinline", "");
          audio.loop = true;
          audio.volume = 0.01;
          audio.addEventListener("pause", () => {
            if (isPlayingRef.current) {
              scheduleKeepAliveResume();
            }
          });
          silentAudioRef.current = audio;
        }
      }
      if (silentAudioRef.current) {
        await silentAudioRef.current.play().catch(() => {});
      }
    } catch (_) {}

    try {
      const AudioCtx =
        typeof window !== "undefined" ? window.AudioContext || window.webkitAudioContext : null;
      if (AudioCtx) {
        if (!keepAliveCtxRef.current || keepAliveCtxRef.current.state === "closed") {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = 1;
          gain.gain.value = 0.0001;
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          keepAliveCtxRef.current = ctx;
          keepAliveOscRef.current = osc;
        }
        if (keepAliveCtxRef.current.state === "suspended") {
          await keepAliveCtxRef.current.resume().catch(() => {});
        }
      }
    } catch (_) {}

    try {
      if (typeof navigator !== "undefined" && "wakeLock" in navigator && !wakeLockRef.current) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      }
    } catch (_) {}
  }, [scheduleKeepAliveResume]);

  const releaseKeepAlive = useCallback(async () => {
    try {
      if (keepAliveResumeTimerRef.current) {
        clearTimeout(keepAliveResumeTimerRef.current);
        keepAliveResumeTimerRef.current = null;
      }
      if (silentAudioRef.current) {
        silentAudioRef.current.pause();
      }
      if (keepAliveOscRef.current) {
        try {
          keepAliveOscRef.current.stop();
          keepAliveOscRef.current.disconnect();
        } catch (_) {}
        keepAliveOscRef.current = null;
      }
      if (keepAliveCtxRef.current) {
        try {
          await keepAliveCtxRef.current.close();
        } catch (_) {}
        keepAliveCtxRef.current = null;
      }
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch (_) {}
  }, []);

  // Reanudación automática de Keep-Alive al cambiar visibilidad o regresar foco tras notificaciones/GPS
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibilityChange = () => {
      if (!isPlayingRef.current) return;
      scheduleKeepAliveResume();
      if (
        document.visibilityState === "visible" &&
        typeof navigator !== "undefined" &&
        "wakeLock" in navigator &&
        !wakeLockRef.current
      ) {
        navigator.wakeLock
          .request("screen")
          .then((lock) => {
            wakeLockRef.current = lock;
          })
          .catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [scheduleKeepAliveResume]);

  // Pausa con cuenta regresiva basada en reloj real Date.now() (resistente a throttling en pantalla apagada)
  const runCountdownWait = async (seconds, signal) => {
    const endTime = Date.now() + Math.max(0, Number(seconds) || 0) * 1000;
    while (true) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }
      const remainingMs = endTime - Date.now();
      if (remainingMs <= 0) break;
      setCountdownSec(Math.ceil(remainingMs / 1000));
      await abortableDelay(Math.min(250, remainingMs), signal);
    }
    setCountdownSec(0);
  };

  // Ciclo asíncrono principal por tarjeta o paso de academia
  const runStepCycle = useCallback(
    async (indexToPlay) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const { signal } = controller;

      const list = queueRef.current;
      if (!list || list.length === 0 || indexToPlay >= list.length) {
        setIsPlaying(false);
        setPlayerState("idle");
        releaseKeepAlive();
        return;
      }

      const item = list[indexToPlay];

      try {
        // =========================================================================
        // CASO A: PASO TIPO "COACH" (CLASE MAGISTRAL A1-B1)
        // =========================================================================
        if (item.stepType === "coach") {
          setPlayerState("explaining");
          await speakSpanishPrompt(item.promptEs, signal, "driving_coach");

          if (item.targetDe) {
            await abortableDelay(500, signal);
            setPlayerState("revealing_word");
            await speakGermanCharon(item.targetDe, "sentence", signal);
            await abortableDelay(1200, signal);
            await speakGermanCharon(item.targetDe, "sentence", signal);
          }
        }
        // =========================================================================
        // CASO B: PASO TIPO "PINGPONG" (DIÁLOGO ACTIVO A1-B1)
        // =========================================================================
        else if (item.stepType === "pingpong") {
          // 1. Contexto en español
          setPlayerState("prompting_word");
          await speakSpanishPrompt(item.promptEs, signal, "driving_coach");

          // 2. Pregunta del interlocutor en alemán
          if (item.questionDe) {
            await abortableDelay(400, signal);
            await speakGermanCharon(item.questionDe, "dialogue", signal);
          }

          // 3. Ventana de silencio para que el conductor responda en voz alta
          setPlayerState("waiting_word");
          const pingPongWaitSec = item.pauseSec || 6;
          await runCountdownWait(pingPongWaitSec, signal);

          // 4. Respuesta modelo nativa (Charon) x2
          setPlayerState("revealing_word");
          await abortableDelay(300, signal);
          await speakGermanCharon(item.targetDe, "sentence", signal);
          await abortableDelay(1200, signal);
          await speakGermanCharon(item.targetDe, "sentence", signal);
        }
        // =========================================================================
        // CASO C: PASO TIPO "DRILL" O TARJETA ESTÁNDAR DE VOCABULARIO
        // =========================================================================
        else {
          const cleanEs = (item.es || "").replace(/\([^)]*\)/g, "").trim() || item.es;
          const cleanDe = item.targetDe || item.audioDe || item.de;
          const promptText = item.promptEs || `¿Cómo dices: ${cleanEs}?`;

          // 1. Reto en español con voz Charon
          setPlayerState("prompting_word");
          await speakSpanishPrompt(promptText, signal, "driving_prompt");

          // 2. Ventana de silencio para pensar y hablar en voz alta
          setPlayerState("waiting_word");
          const wordWaitSec = item.pauseSec || Math.max(4, Math.min(6, (cleanDe.split(" ").length + 1) * 1.2));
          await runCountdownWait(wordWaitSec, signal);

          // 3. Solución en alemán con voz Charon (doble fijación)
          setPlayerState("revealing_word");
          await abortableDelay(250, signal);
          const audioType = item.stepType === "drill" ? "sentence" : "vocab";
          await speakGermanCharon(cleanDe, audioType, signal);
          await abortableDelay(1200, signal);
          await speakGermanCharon(cleanDe, audioType, signal);

          // 4. Micro-píldora gramatical / tip técnico
          if (!item.suppressTip && (includeTipsRef.current || item.tipEs)) {
            const tip = item.tipEs || (includeTipsRef.current ? buildMicroTipEs(item) : null);
            if (tip) {
              setPlayerState("explaining");
              await abortableDelay(400, signal);
              await speakSpanishPrompt(tip, signal, "driving_tip");
            }
          }

          // 5. Oración completa opcional si la tarjeta tiene oraciones de ejemplo
          if (includeSentencesRef.current && item.exampleSentenceEs && item.exampleSentenceDe) {
            await abortableDelay(800, signal);
            setPlayerState("prompting_sentence");
            await speakSpanishPrompt(`En una frase: ${item.exampleSentenceEs}`, signal, "driving_prompt");

            setPlayerState("waiting_sentence");
            const wordCount = item.exampleSentenceDe.split(/\s+/).length;
            const sentenceWaitSec = Math.max(5, Math.min(9, Math.ceil(wordCount * 1.0)));
            await runCountdownWait(sentenceWaitSec, signal);

            setPlayerState("revealing_sentence");
            await abortableDelay(250, signal);
            await speakGermanCharon(item.exampleSentenceDe, "sentence", signal);
            await abortableDelay(1400, signal);
            await speakGermanCharon(item.exampleSentenceDe, "sentence", signal);
          }
        }

        // Registrar progreso de palabra / paso estudiado
        if (onWordStudiedRef.current) {
          onWordStudiedRef.current(item);
        }

        // Pausa de transición y avance automático
        await abortableDelay(2000, signal);
        const nextIdx = (indexToPlay + 1) % queueRef.current.length;
        if (nextIdx === indexToPlay) {
          setStepAttemptId((prev) => prev + 1);
        } else {
          setCurrentIndex(nextIdx);
        }
      } catch (err) {
        if (err?.name === "AbortError" || signal.aborted) {
          return;
        }
        console.warn("[DrivingMode] Error recuperable en ciclo, reanudando en 1200ms:", err);
        try {
          await abortableDelay(1200, signal);
        } catch (_) {
          return;
        }
        if (signal.aborted || !isPlayingRef.current) return;
        const total = queueRef.current?.length || 0;
        if (total > 0) {
          const nextIdx = (indexToPlay + 1) % total;
          if (nextIdx === indexToPlay) {
            setStepAttemptId((prev) => prev + 1);
          } else {
            setCurrentIndex(nextIdx);
          }
        }
      }
    },
    [releaseKeepAlive]
  );

  // Disparar el ciclo cuando cambia currentIndex, stepAttemptId o isPlaying pasa a true
  useEffect(() => {
    if (isPlaying && queue.length > 0) {
      runStepCycle(currentIndex);
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentIndex, stepAttemptId, isPlaying, runStepCycle, queue.length]);

  const startOrResume = useCallback(async () => {
    unlockWebKitAudioContext();
    await acquireKeepAlive();
    setIsPlaying(true);
  }, [acquireKeepAlive]);

  const pauseSession = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    await stopAllDrivingSpeech();
    setIsPlaying(false);
    setCountdownSec(0);
    setPlayerState("paused");
  }, []);

  const stopSession = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    await stopAllDrivingSpeech();
    await releaseKeepAlive();
    setIsPlaying(false);
    setCountdownSec(0);
    setPlayerState("idle");
  }, [releaseKeepAlive]);

  const skipToNext = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    await stopAllDrivingSpeech();
    if (currentItem && onWordStudiedRef.current) {
      onWordStudiedRef.current(currentItem);
    }
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, queueRef.current.length));
    if (!isPlaying) {
      await acquireKeepAlive();
      setIsPlaying(true);
    }
  }, [acquireKeepAlive, currentItem, isPlaying]);

  // Repetir actual y reencolar +4 turnos SRS (más segundo refuerzo espaciado +9)
  const repeatAndRequeueCurrent = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    await stopAllDrivingSpeech();

    if (currentItem) {
      setQueue((prev) => {
        const clone = [...prev];
        const pos1 = Math.min(clone.length, currentIndex + 4);
        clone.splice(pos1, 0, {
          ...currentItem,
          title: `${currentItem.title || currentItem.de || "Repetición"} (Refuerzo Volante #1)`
        });
        const pos2 = Math.min(clone.length, currentIndex + 9);
        clone.splice(pos2, 0, {
          ...currentItem,
          title: `${currentItem.title || currentItem.de || "Repetición"} (Refuerzo Volante #2)`
        });
        queueRef.current = clone;
        return clone;
      });
    }

    if (isPlaying) {
      runStepCycle(currentIndex);
    } else {
      await acquireKeepAlive();
      setIsPlaying(true);
    }
  }, [acquireKeepAlive, currentIndex, currentItem, isPlaying, runStepCycle]);

  // Salto inmediato a un bloque específico (con detención de audios en vuelo)
  const jumpToIndex = useCallback(
    async (targetIndex, autoPlay = false) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      await stopAllDrivingSpeech();
      setCountdownSec(0);

      const list = queueRef.current;
      if (!list || list.length === 0) return;

      const safeIdx = Math.min(Math.max(0, Number(targetIndex) || 0), list.length - 1);
      setCurrentIndex(safeIdx);

      if (autoPlay) {
        await acquireKeepAlive();
        setIsPlaying(true);
        // Si ya estaba en isPlaying === true y elegimos el mismo índice, forzamos el reinicio del ciclo
        if (safeIdx === currentIndex && isPlaying) {
          runStepCycle(safeIdx);
        }
      } else if (!isPlaying) {
        setPlayerState("idle");
      }
    },
    [acquireKeepAlive, currentIndex, isPlaying, runStepCycle]
  );

  // Web Media Session API para PWA (pantalla bloqueada y controles Bluetooth/CarPlay/Android Auto)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

    try {
      navigator.mediaSession.playbackState = isPlaying
        ? "playing"
        : playerState === "paused"
          ? "paused"
          : "none";

      if (typeof window !== "undefined" && "MediaMetadata" in window) {
        const rawEs = cleanTextForCarScreen(currentItem?.promptEs || currentItem?.es || "");
        const rawDe = cleanTextForCarScreen(currentItem?.targetDe || currentItem?.de || "");
        const progressTag =
          queue.length > 0 ? `Bloque ${currentIndex + 1}/${queue.length}` : "Fahrmodus PRO";
        const isRevealing =
          playerState === "revealing_word" ||
          playerState === "revealing_sentence" ||
          playerState === "explaining";

        let title = rawDe || rawEs || "DeutschMeister PRO A1";
        let artist = rawEs ? `🇪🇸 ${rawEs} · ${progressTag}` : progressTag;

        if (playerState === "prompting_word" || playerState === "prompting_sentence") {
          title = rawEs ? `🇪🇸 ${rawEs}` : "🎧 Escucha el reto";
          artist = `🎧 Escucha el reto · ${progressTag}`;
        } else if (playerState === "waiting_word" || playerState === "waiting_sentence") {
          title = rawEs ? `🗣️ ${rawEs}` : "🗣️ Tu turno en voz alta";
          artist = `Tu turno en voz alta · ${progressTag}`;
        } else if (isRevealing) {
          title = rawDe ? `✅ ${rawDe}` : (rawEs || "Solución nativa");
          artist = rawEs ? `🇪🇸 ${rawEs} · ${progressTag}` : `Solución Charon · ${progressTag}`;
        }

        navigator.mediaSession.metadata = new window.MediaMetadata({
          title,
          artist,
          album: "DeutschMeister PRO A1",
          artwork: [
            { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" }
          ]
        });
      }
    } catch (e) {
      console.warn("[Web MediaSession Metadata Warning]:", e);
    }
  }, [isPlaying, currentItem, currentIndex, queue.length, playerState]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

    const actions = [
      ["play", () => startOrResume()],
      ["pause", () => pauseSession()],
      ["nexttrack", () => skipToNext()],
      ["previoustrack", () => repeatAndRequeueCurrent()],
      ["stop", () => stopSession()]
    ];

    for (const [action, handler] of actions) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (e) {
        console.warn(`[Web MediaSession Handler Warning] ${action}:`, e);
      }
    }

    return () => {
      for (const [action] of actions) {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {
          // Ignorar acción no soportada al desmontar
        }
      }
    };
  }, [pauseSession, repeatAndRequeueCurrent, skipToNext, startOrResume, stopSession]);

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      stopAllDrivingSpeech();
      releaseKeepAlive();
      if (!Capacitor.isNativePlatform() && typeof navigator !== "undefined" && "mediaSession" in navigator) {
        try {
          navigator.mediaSession.playbackState = "none";
        } catch {
          // Ignorar si mediaSession no está disponible
        }
      }
    };
  }, [releaseKeepAlive]);

  return {
    currentItem,
    currentIndex,
    totalItems: queue.length,
    playerState,
    isPlaying,
    countdownSec,
    startOrResume,
    pauseSession,
    stopSession,
    skipToNext,
    repeatAndRequeueCurrent,
    jumpToIndex
  };
}
