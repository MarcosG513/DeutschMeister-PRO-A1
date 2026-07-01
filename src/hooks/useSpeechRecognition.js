import { useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

export const useSpeechRecognition = (targetLanguage = 'de-DE') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const startListening = useCallback(async (onResultCallback) => {
    setIsListening(true);
    setError(null);
    setTranscript('');

    if (Capacitor.isNativePlatform()) {
      try {
        const hasPermission = await SpeechRecognition.checkPermissions();
        if (hasPermission.speechRecognition !== 'granted') {
          const request = await SpeechRecognition.requestPermissions();
          if (request.speechRecognition !== 'granted') {
            setError('Permiso de micrófono denegado.');
            setIsListening(false);
            return;
          }
        }
        
        await SpeechRecognition.start({
          language: targetLanguage,
          maxResults: 1,
          prompt: 'Habla en alemán',
          partialResults: false,
          popup: false,
        });

        SpeechRecognition.addListener('partialResults', (data) => {
          if (data.matches && data.matches.length > 0) {
             const result = data.matches[0];
             setTranscript(result);
             if (onResultCallback) onResultCallback(result);
             setIsListening(false);
             SpeechRecognition.stop();
          }
        });
      } catch (e) {
        console.error('Error starting capacitor speech recognition:', e);
        setError('Error al iniciar micrófono en Android.');
        setIsListening(false);
      }
    } else {
      const WebSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!WebSpeechRecognition) {
        setError('El reconocimiento de voz no está soportado en este navegador.');
        setIsListening(false);
        return;
      }

      const recognition = new WebSpeechRecognition();
      recognition.lang = targetLanguage;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {};

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        if (onResultCallback) {
          onResultCallback(speechResult);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setError(event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
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

  return { isListening, transcript, error, startListening };
};
