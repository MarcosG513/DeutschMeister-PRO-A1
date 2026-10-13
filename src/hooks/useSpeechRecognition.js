import { useState, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

export const useSpeechRecognition = (targetLanguage = 'de-DE') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const webRecognitionRef = useRef(null);
  const nativeListeningRef = useRef(false);

  const stopListening = useCallback(async () => {
    setIsListening(false);
    nativeListeningRef.current = false;
    
    if (Capacitor.isNativePlatform()) {
      console.log('🛑 [Motor de Voz Nativo] Deteniendo SpeechRecognition de Capacitor...');
      try {
        await SpeechRecognition.stop();
      } catch (e) {
        console.error('Error stopping speech recognition:', e);
      }
    } else {
      console.log('🛑 [Motor de Voz Web] Deteniendo window.SpeechRecognition...');
      if (webRecognitionRef.current) {
        try {
          webRecognitionRef.current.stop();
        } catch (e) {
          console.error('Error stopping web speech recognition:', e);
        }
      }
    }
  }, []);

  const startListening = useCallback(async (onResultCallback) => {
    setIsListening(true);
    setError(null);
    setTranscript('');

    if (Capacitor.isNativePlatform()) {
      console.log('🚀 [Motor de Voz Nativo] Inicializando Capacitor Speech Recognition...');
      let partialListener = null;
      try {
        // Validación estricta de permisos de hardware en Android/iOS
        const hasPermission = await SpeechRecognition.checkPermissions();
        console.log('Estado de permisos:', hasPermission);
        
        let isGranted = hasPermission.speechRecognition === 'granted' || hasPermission.speechRecognition === true;
        
        if (!isGranted) {
          console.log('Solicitando permisos al usuario...');
          const request = await SpeechRecognition.requestPermissions();
          isGranted = request.speechRecognition === 'granted' || request.speechRecognition === true;
        }
        
        if (!isGranted) {
          console.warn('Permiso de micrófono denegado por el usuario.');
          setError('Permiso de micrófono denegado por el usuario.');
          setIsListening(false);
          return;
        }
        
        nativeListeningRef.current = true;

        // Escuchador de resultados parciales (solo actualiza UI en nativo, sin disparar onResultCallback)
        partialListener = await SpeechRecognition.addListener('partialResults', (data) => {
          if (nativeListeningRef.current && data && data.matches && data.matches.length > 0) {
            const text = data.matches[0];
            setTranscript(text);
          }
        });

        // Inicio de la escucha nativa
        const result = await SpeechRecognition.start({
          language: targetLanguage,
          maxResults: 1,
          prompt: 'Habla en alemán',
          partialResults: true,
          popup: true,
        });

        // Resultado final nativo (ejecución única al concluir)
        if (nativeListeningRef.current) {
          if (result && result.matches && result.matches.length > 0) {
            const matches = result.matches;
            const finalText = matches[0].trim();
            setTranscript(finalText);
            if (onResultCallback) onResultCallback(finalText);
          } else {
            setError('No se detectó audio.');
          }
        }
      } catch (e) {
        console.error('Error starting capacitor speech recognition:', e);
        // Error '0' suele ocurrir cuando hay un timeout por silencio, 
        // cuando Google no logra asociar la palabra corta, o si el usuario cierra el popup.
        if (e && (e.message === '0' || e.message === 0)) {
          setError('No se entendió claramente. Intenta hablar más fuerte o usar una frase.');
        } else {
          setError('Error al iniciar micrófono en Android.');
        }
      } finally {
        if (partialListener) {
          try {
            partialListener.remove();
          } catch (err) {
            console.error('Error removing partialListener:', err);
          }
        }
        setIsListening(false);
        nativeListeningRef.current = false;
      }
    } else {
      console.log('🚀 [Motor de Voz Web] Inicializando window.SpeechRecognition (Navegador)...');
      const WebSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!WebSpeechRecognition) {
        console.warn('El reconocimiento de voz no está soportado en este navegador.');
        setError('El reconocimiento de voz no está soportado en este navegador.');
        setIsListening(false);
        return;
      }

      const recognition = new WebSpeechRecognition();
      recognition.lang = targetLanguage;
      recognition.interimResults = true; // Para obtener resultados en tiempo real
      recognition.maxAlternatives = 1;
      webRecognitionRef.current = recognition;

      recognition.onstart = () => {
        console.log('Escuchando (Web)...');
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptText;
          } else {
            interimTranscript += transcriptText;
          }
        }
        if (interimTranscript) {
          setTranscript(interimTranscript);
        }
        if (finalTranscript) {
          const cleanFinal = finalTranscript.trim();
          setTranscript(cleanFinal);
          if (onResultCallback) {
            onResultCallback(cleanFinal);
          }
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error (Web)', event.error);
        if (event.error === 'not-allowed') {
          setError('Micrófono bloqueado (not-allowed). Verifica los permisos del navegador.');
        } else {
          setError(event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Deteniendo escucha (Web)...');
        setIsListening(false);
      };

      try {
        recognition.start();
      } catch (e) {
        console.error('Error starting web speech recognition:', e);
        setIsListening(false);
      }
    }
  }, [targetLanguage]);

  return { isListening, transcript, error, startListening, stopListening };
};
