import { useCallback, useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

function isIOSDevice() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function isStandalonePWA() {
  if (typeof window === 'undefined') return false;
  return (
    window.navigator?.standalone === true ||
    window.matchMedia?.('(display-mode: standalone)')?.matches === true
  );
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = () => reject(new Error('No se pudo codificar el audio grabado.'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Captura de voz manos libres multiplataforma para Modo Llamada:
 * - Android APK (Capacitor): popup:false + partialResults:true + debounce silencio (1200–2500 ms).
 * - Desktop Web: window.SpeechRecognition continuous + detección automática de silencio.
 * - iOS Safari / PWA standalone: getUserMedia + AnalyserNode RMS + MediaRecorder (audio/mp4)
 *   liberando explícitamente las pistas (track.stop()) antes de la respuesta Charon (AVAudioSession).
 */
export function useCallSpeechCapture({
  language = 'de-DE',
  silenceDebounceMs = 1600,
  maxTurnMs = 15000,
  onSpeechStart,
  onTranscriptUpdate,
  onFinalTurn,
  onError,
} = {}) {
  const clampedDebounce = Math.max(1200, Math.min(2500, Number(silenceDebounceMs) || 1600));
  const [platformMode] = useState(() => {
    if (Capacitor.isNativePlatform()) return 'android_native';
    const hasWebSpeech =
      typeof window !== 'undefined' &&
      Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    if (isIOSDevice() && (isStandalonePWA() || !hasWebSpeech)) {
      return 'ios_pwa_mediarecorder';
    }
    return hasWebSpeech ? 'web_continuous' : 'ios_pwa_mediarecorder';
  });

  const [isCapturing, setIsCapturing] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [micRmsLevel, setMicRmsLevel] = useState(0);
  const [captureError, setCaptureError] = useState(null);

  const sessionGenRef = useRef(0);
  const finalizedRef = useRef(false);
  const silenceTimerRef = useRef(null);
  const maxTurnTimerRef = useRef(null);
  const rafRef = useRef(null);

  const webRecRef = useRef(null);
  const partialListenerRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioCtxRef = useRef(null);
  const callbacksRef = useRef({ onSpeechStart, onTranscriptUpdate, onFinalTurn, onError });

  useEffect(() => {
    callbacksRef.current = { onSpeechStart, onTranscriptUpdate, onFinalTurn, onError };
  }, [onSpeechStart, onTranscriptUpdate, onFinalTurn, onError]);

  const cleanupCaptureResources = useCallback(async () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (maxTurnTimerRef.current) {
      clearTimeout(maxTurnTimerRef.current);
      maxTurnTimerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (partialListenerRef.current) {
      try {
        partialListenerRef.current.remove();
      } catch {
        // Limpieza segura de listener nativo
      }
      partialListenerRef.current = null;
    }

    if (Capacitor.isNativePlatform()) {
      await SpeechRecognition.stop().catch(() => {});
    }

    if (webRecRef.current) {
      try {
        webRecRef.current.onresult = null;
        webRecRef.current.onerror = null;
        webRecRef.current.onend = null;
        webRecRef.current.stop();
      } catch {
        // Cierre seguro de WebSpeech
      }
      webRecRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // Detención segura de MediaRecorder
      }
    }
    mediaRecorderRef.current = null;

    // Liberación explícita de pistas hardware antes de entregar turno a reproducción iOS AVAudioSession
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Track ya detenido
        }
      });
      mediaStreamRef.current = null;
    }

    if (audioCtxRef.current) {
      try {
        await audioCtxRef.current.close();
      } catch {
        // Cierre seguro de AudioContext
      }
      audioCtxRef.current = null;
    }

    setMicRmsLevel(0);
    setIsCapturing(false);
  }, []);

  const abortCapture = useCallback(async () => {
    sessionGenRef.current += 1;
    finalizedRef.current = true;
    await cleanupCaptureResources();
  }, [cleanupCaptureResources]);

  const stopCapture = useCallback(async () => {
    if (platformMode === 'ios_pwa_mediarecorder' && mediaRecorderRef.current?.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
        return;
      } catch {
        // Si falla el stop normal, abortar recursos
      }
    }
    await abortCapture();
  }, [abortCapture, platformMode]);

  useEffect(() => {
    return () => {
      sessionGenRef.current += 1;
      cleanupCaptureResources().catch(() => {});
    };
  }, [cleanupCaptureResources]);

  const startCapture = useCallback(async () => {
    await cleanupCaptureResources();
    const myGen = ++sessionGenRef.current;
    finalizedRef.current = false;
    setCaptureError(null);
    setLiveTranscript('');
    setIsCapturing(true);

    const commitTurn = async (payload) => {
      if (finalizedRef.current || myGen !== sessionGenRef.current) return;
      finalizedRef.current = true;
      await cleanupCaptureResources();
      callbacksRef.current.onFinalTurn?.(payload);
    };

    // =======================================================================
    // MODO 1: ANDROID CAPACITOR (popup:false + partialResults + silence debounce)
    // =======================================================================
    if (platformMode === 'android_native') {
      try {
        const perm = await SpeechRecognition.checkPermissions();
        let granted = perm?.speechRecognition === 'granted' || perm?.speechRecognition === true;
        if (!granted) {
          const req = await SpeechRecognition.requestPermissions();
          granted = req?.speechRecognition === 'granted' || req?.speechRecognition === true;
        }
        if (!granted) {
          throw new Error('Permiso de micrófono denegado en Android.');
        }

        let latestPartial = '';
        let startedSpeech = false;

        partialListenerRef.current = await SpeechRecognition.addListener('partialResults', (data) => {
          if (myGen !== sessionGenRef.current || finalizedRef.current) return;
          const match = data?.matches?.[0]?.trim();
          if (!match) return;
          latestPartial = match;
          setLiveTranscript(match);
          callbacksRef.current.onTranscriptUpdate?.(match);
          if (!startedSpeech) {
            startedSpeech = true;
            callbacksRef.current.onSpeechStart?.();
          }

          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            if (latestPartial) {
              commitTurn({ text: latestPartial });
            }
          }, clampedDebounce);
        });

        maxTurnTimerRef.current = setTimeout(() => {
          if (latestPartial) {
            commitTurn({ text: latestPartial });
          } else {
            cleanupCaptureResources();
          }
        }, maxTurnMs);

        const nativeResult = await SpeechRecognition.start({
          language,
          maxResults: 1,
          partialResults: true,
          popup: false,
        });

        if (myGen !== sessionGenRef.current || finalizedRef.current) return;
        const finalText = nativeResult?.matches?.[0]?.trim() || latestPartial;
        if (finalText) {
          await commitTurn({ text: finalText });
        } else {
          await cleanupCaptureResources();
        }
      } catch (err) {
        if (myGen !== sessionGenRef.current) return;
        await cleanupCaptureResources();
        const msg =
          err?.message === '0' || err?.message === 0
            ? 'No se captó voz clara; vuelve a hablar.'
            : err?.message || 'Error en captura de voz nativa.';
        setCaptureError(msg);
        callbacksRef.current.onError?.(msg);
      }
      return;
    }

    // =======================================================================
    // MODO 2: WEB CONTINUOUS (Chrome / Edge / Safari Desktop)
    // =======================================================================
    if (platformMode === 'web_continuous') {
      const WebSpeech = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!WebSpeech) {
        await cleanupCaptureResources();
        const msg = 'Reconocimiento de voz web no disponible.';
        setCaptureError(msg);
        callbacksRef.current.onError?.(msg);
        return;
      }

      const rec = new WebSpeech();
      rec.lang = language;
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      webRecRef.current = rec;

      let committedText = '';
      let latestCombined = '';
      let speechNotified = false;

      const scheduleSilenceCommit = () => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          if (latestCombined.trim()) {
            commitTurn({ text: latestCombined.trim() });
          }
        }, clampedDebounce);
      };

      rec.onresult = (event) => {
        if (myGen !== sessionGenRef.current || finalizedRef.current) return;
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const piece = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            committedText = `${committedText} ${piece}`.trim();
          } else {
            interim += piece;
          }
        }
        latestCombined = `${committedText} ${interim}`.trim();
        if (latestCombined) {
          setLiveTranscript(latestCombined);
          callbacksRef.current.onTranscriptUpdate?.(latestCombined);
          if (!speechNotified) {
            speechNotified = true;
            callbacksRef.current.onSpeechStart?.();
          }
          scheduleSilenceCommit();
        }
      };

      rec.onerror = async (event) => {
        if (myGen !== sessionGenRef.current || finalizedRef.current) return;
        if (event.error === 'no-speech' || event.error === 'aborted') {
          if (latestCombined.trim()) {
            await commitTurn({ text: latestCombined.trim() });
          } else {
            await cleanupCaptureResources();
          }
          return;
        }
        await cleanupCaptureResources();
        const msg =
          event.error === 'not-allowed'
            ? 'Micrófono bloqueado. Permite el acceso al micrófono para llamar.'
            : `Error de micrófono: ${event.error}`;
        setCaptureError(msg);
        callbacksRef.current.onError?.(msg);
      };

      rec.onend = () => {
        if (myGen !== sessionGenRef.current || finalizedRef.current) return;
        if (latestCombined.trim()) {
          commitTurn({ text: latestCombined.trim() });
        } else {
          cleanupCaptureResources();
        }
      };

      maxTurnTimerRef.current = setTimeout(() => {
        if (latestCombined.trim()) {
          commitTurn({ text: latestCombined.trim() });
        } else {
          cleanupCaptureResources();
        }
      }, maxTurnMs);

      try {
        rec.start();
      } catch (err) {
        await cleanupCaptureResources();
        const msg = err?.message || 'No se pudo iniciar el micrófono web.';
        setCaptureError(msg);
        callbacksRef.current.onError?.(msg);
      }
      return;
    }

    // =======================================================================
    // MODO 3: iOS SAFARI PWA STANDALONE (getUserMedia + AnalyserNode + MediaRecorder)
    // =======================================================================
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        throw new Error('Tu navegador no permite grabación de audio en llamada.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      if (myGen !== sessionGenRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        await ctx.resume().catch(() => {});
      }
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.fftSize);

      const preferredMime = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find((m) =>
        MediaRecorder.isTypeSupported(m)
      );
      const recorder = new MediaRecorder(
        stream,
        preferredMime ? { mimeType: preferredMime } : undefined
      );
      mediaRecorderRef.current = recorder;

      const chunks = [];
      let speechDetected = false;
      let lastVoiceTs = performance.now();

      recorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) chunks.push(ev.data);
      };

      recorder.onstop = async () => {
        // Garantía estricta de liberar todas las pistas hardware antes de emitir Audio/TTS
        stream.getTracks().forEach((t) => {
          try {
            t.stop();
          } catch {
            // Track detenido
          }
        });

        if (myGen !== sessionGenRef.current || finalizedRef.current) return;
        const mime = recorder.mimeType || preferredMime || 'audio/mp4';
        const recordedBlob = new Blob(chunks, { type: mime });
        if (!speechDetected || recordedBlob.size < 1800) {
          await cleanupCaptureResources();
          setCaptureError('No se detectó habla suficiente; toca hablar de nuevo.');
          return;
        }
        try {
          const b64 = await blobToBase64(recordedBlob);
          await commitTurn({
            audioBase64: b64,
            audioMimeType: mime.split(';')[0],
          });
        } catch (encErr) {
          await cleanupCaptureResources();
          setCaptureError(encErr.message);
          callbacksRef.current.onError?.(encErr.message);
        }
      };

      recorder.start(250);
      setLiveTranscript('Escuchando voz en iOS PWA...');

      const monitorRms = () => {
        if (myGen !== sessionGenRef.current || finalizedRef.current || recorder.state !== 'recording') {
          return;
        }
        analyser.getByteTimeDomainData(dataArray);
        let sumSq = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const centered = (dataArray[i] - 128) / 128;
          sumSq += centered * centered;
        }
        const rms = Math.sqrt(sumSq / dataArray.length);
        setMicRmsLevel(Math.min(1, rms * 4.5));

        const now = performance.now();
        if (rms > 0.032) {
          lastVoiceTs = now;
          if (!speechDetected) {
            speechDetected = true;
            callbacksRef.current.onSpeechStart?.();
          }
        } else if (speechDetected && now - lastVoiceTs >= clampedDebounce) {
          try {
            recorder.stop();
          } catch {
            cleanupCaptureResources();
          }
          return;
        }

        rafRef.current = requestAnimationFrame(monitorRms);
      };
      rafRef.current = requestAnimationFrame(monitorRms);

      maxTurnTimerRef.current = setTimeout(() => {
        if (recorder.state === 'recording') {
          try {
            recorder.stop();
          } catch {
            cleanupCaptureResources();
          }
        }
      }, maxTurnMs);
    } catch (err) {
      if (myGen !== sessionGenRef.current) return;
      await cleanupCaptureResources();
      const msg = err?.message || 'No se pudo iniciar la grabación de llamada.';
      setCaptureError(msg);
      callbacksRef.current.onError?.(msg);
    }
  }, [clampedDebounce, cleanupCaptureResources, language, maxTurnMs, platformMode]);

  return {
    platformMode,
    isCapturing,
    liveTranscript,
    micRmsLevel,
    captureError,
    startCapture,
    stopCapture,
    abortCapture,
  };
}
