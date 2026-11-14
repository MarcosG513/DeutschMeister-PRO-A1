import { useState, useRef, useEffect, useCallback } from "react";
import {
  abortableDelay,
  speakSpanishPrompt,
  speakGermanCharon,
  stopAllDrivingSpeech,
  buildMicroTipEs
} from "../utils/drivingSpeechHelper";

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

  const abortControllerRef = useRef(null);
  const silentAudioRef = useRef(null);
  const wakeLockRef = useRef(null);
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

  // Gestión de Wake Lock y Audio Silente para evitar suspensión en segundo plano / pantalla apagada
  const acquireKeepAlive = useCallback(async () => {
    try {
      if (!silentAudioRef.current && typeof Audio !== "undefined") {
        const audioUri = createSilentAudioDataUri();
        if (audioUri) {
          const audio = new Audio(audioUri);
          audio.loop = true;
          audio.volume = 0.01;
          silentAudioRef.current = audio;
        }
      }
      if (silentAudioRef.current) {
        await silentAudioRef.current.play().catch(() => {});
      }
    } catch (_) {}

    try {
      if (typeof navigator !== "undefined" && "wakeLock" in navigator && !wakeLockRef.current) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      }
    } catch (_) {}
  }, []);

  const releaseKeepAlive = useCallback(async () => {
    try {
      if (silentAudioRef.current) {
        silentAudioRef.current.pause();
      }
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch (_) {}
  }, []);

  // Pausa con cuenta regresiva visible para el rabillo del ojo en semáforos
  const runCountdownWait = async (seconds, signal) => {
    const totalSteps = Math.ceil(seconds);
    for (let remaining = totalSteps; remaining > 0; remaining--) {
      setCountdownSec(remaining);
      await abortableDelay(1000, signal);
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
          runStepCycle(nextIdx);
        } else {
          setCurrentIndex(nextIdx);
        }
      } catch (err) {
        if (err?.name !== "AbortError") {
          console.warn("[DrivingMode] Error en ciclo:", err);
        }
      }
    },
    [releaseKeepAlive]
  );

  // Disparar el ciclo cuando cambia currentIndex o isPlaying pasa a true
  useEffect(() => {
    if (isPlaying && queue.length > 0) {
      runStepCycle(currentIndex);
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentIndex, isPlaying, runStepCycle, queue.length]);

  const startOrResume = useCallback(async () => {
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

  // Repetir actual y reencolar en dos intervalos espaciados (+3 y +8) (SRS en volante)
  const repeatAndRequeueCurrent = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    await stopAllDrivingSpeech();

    if (currentItem) {
      setQueue((prev) => {
        const clone = [...prev];
        const pos1 = Math.min(clone.length, currentIndex + 3);
        clone.splice(pos1, 0, {
          ...currentItem,
          title: `${currentItem.title || currentItem.de || "Repetición"} (Refuerzo Volante #1)`
        });
        const pos2 = Math.min(clone.length, currentIndex + 8);
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

  // Integración con Media Session API (Botones físicos del volante / Bluetooth)
  useEffect(() => {
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      try {
        navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

        navigator.mediaSession.setActionHandler("play", () => startOrResume());
        navigator.mediaSession.setActionHandler("pause", () => pauseSession());
        navigator.mediaSession.setActionHandler("nexttrack", () => skipToNext());
        navigator.mediaSession.setActionHandler("previoustrack", () => repeatAndRequeueCurrent());
      } catch (e) {
        console.warn("[MediaSession Warning]:", e);
      }
    }
  }, [isPlaying, pauseSession, repeatAndRequeueCurrent, skipToNext, startOrResume]);

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      stopAllDrivingSpeech();
      releaseKeepAlive();
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
    skipToNext,
    repeatAndRequeueCurrent,
    jumpToIndex
  };
}
