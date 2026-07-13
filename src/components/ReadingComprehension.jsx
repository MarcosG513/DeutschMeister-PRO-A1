import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Sparkles, X, Volume2, HelpCircle, Lightbulb, AlertTriangle, RefreshCw, Loader2, Play, Pause, CheckCircle } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { functions } from '../App';
import { httpsCallable } from 'firebase/functions';
import { nativeSpeak } from '../utils/helpers';

const ReadingComprehension = ({ onExit }) => {
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [readingTest, setReadingTest] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIdx]: selectedOption }
  const [error, setError] = useState("");

  // Estados para lectura sincronizada (Karaoke)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  // Referencias para el motor de audio
  const utteranceRef = useRef(null);
  const wordsOnlyRef = useRef([]);
  const isPausedRef = useRef(false);
  const adaptiveTimerRef = useRef(null);

  // Limpieza del motor de audio al desmontar o cambiar de lectura
  useEffect(() => {
    return () => {
      if (window.activeReadingTimeout) {
        clearTimeout(window.activeReadingTimeout);
        window.activeReadingTimeout = null;
      }
      if (window.activeReadingInterval) {
        clearInterval(window.activeReadingInterval);
        window.activeReadingInterval = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      try {
        TextToSpeech.stop();
      } catch (e) {}
    };
  }, []);

  // Analizador Léxico A1
  const parseTextToTokens = (text) => {
    if (!text) return [];
    const cleanedText = text.replace(/\s+([.,!?:;()\-!])/g, '$1');
    const tokens = [];
    let isBold = false;
    let charIndex = 0;
    let wordCounter = 0;
    let i = 0;

    while (i < cleanedText.length) {
      if (cleanedText.startsWith('**', i)) {
        isBold = !isBold;
        i += 2;
        continue;
      }
      const spaceMatch = cleanedText.slice(i).match(/^\s+/);
      if (spaceMatch) {
        const spaceStr = spaceMatch[0];
        tokens.push({
          text: spaceStr,
          isWord: false,
          isBold: isBold,
          isKeyword: isBold,
          charStart: charIndex,
          charEnd: charIndex + spaceStr.length,
          wordIndex: -1
        });
        charIndex += spaceStr.length;
        i += spaceStr.length;
        continue;
      }
      const punctMatch = cleanedText.slice(i).match(/^[.,!?:;()[\]{}'"“”«»„“\-–—/\\+]+/);
      if (punctMatch) {
        const punctStr = punctMatch[0];
        tokens.push({
          text: punctStr,
          isWord: false,
          isBold: isBold,
          isKeyword: isBold,
          charStart: charIndex,
          charEnd: charIndex + punctStr.length,
          wordIndex: -1
        });
        charIndex += punctStr.length;
        i += punctStr.length;
        continue;
      }
      const wordMatch = cleanedText.slice(i).match(/^[^\s.,!?:;()[\]{}'"“”«»„“\-–—/\\+*]+/);
      if (wordMatch) {
        const wordStr = wordMatch[0];
        tokens.push({
          text: wordStr,
          isWord: true,
          isBold: isBold,
          isKeyword: isBold,
          charStart: charIndex,
          charEnd: charIndex + wordStr.length,
          wordIndex: wordCounter++
        });
        charIndex += wordStr.length;
        i += wordStr.length;
        continue;
      }
      const singleChar = cleanedText[i];
      const isWord = /^[a-zA-Z0-9ÄäÖöÜüß]$/.test(singleChar);
      tokens.push({
        text: singleChar,
        isWord: isWord,
        isBold: isBold,
        isKeyword: isBold,
        charStart: charIndex,
        charEnd: charIndex + 1,
        wordIndex: isWord ? wordCounter++ : -1
      });
      charIndex += 1;
      i += 1;
    }
    return tokens;
  };

  // Motor de Reproducción, Pausa y Reanudación Sincronizada
  const speakText = (text) => {
    if (!text) return;
    const cleanedText = text.replace(/\s+([.,!?:;()\-!])/g, '$1');

    if (isPlayingAudio) {
      if (Capacitor.isNativePlatform()) {
        if (isAudioPaused) {
          const remainingWords = wordsOnlyRef.current.slice(currentWordIndex).map(w => w.text).join(' ');
          const remainingClean = remainingWords.replace(/\*\*/g, '');
          TextToSpeech.speak({
            text: remainingClean,
            lang: 'de-DE',
            rate: 0.70,
            volume: 1.0
          }).then(() => {
            if (!isPausedRef.current) {
              setIsPlayingAudio(false);
              setIsAudioPaused(false);
              setCurrentWordIndex(-1);
            }
          }).catch(e => console.error("Error Native Speak", e));
          setIsAudioPaused(false);
          isPausedRef.current = false;
          if (adaptiveTimerRef.current) {
            adaptiveTimerRef.current(currentWordIndex);
          }
        } else {
          TextToSpeech.stop();
          setIsAudioPaused(true);
          isPausedRef.current = true;
          if (window.activeReadingTimeout) {
            clearTimeout(window.activeReadingTimeout);
            window.activeReadingTimeout = null;
          }
        }
      } else if ('speechSynthesis' in window) {
        if (isAudioPaused) {
          window.speechSynthesis.resume();
          setIsAudioPaused(false);
          isPausedRef.current = false;
          if (adaptiveTimerRef.current) {
            adaptiveTimerRef.current(currentWordIndex);
          }
        } else {
          window.speechSynthesis.pause();
          setIsAudioPaused(true);
          isPausedRef.current = true;
          if (window.activeReadingTimeout) {
            clearTimeout(window.activeReadingTimeout);
            window.activeReadingTimeout = null;
          }
        }
      } else {
        if (isAudioPaused) {
          window.isReadingPausedPlaceholder = false;
          setIsAudioPaused(false);
          isPausedRef.current = false;
        } else {
          window.isReadingPausedPlaceholder = true;
          setIsAudioPaused(true);
          isPausedRef.current = true;
        }
      }
      return;
    }

    setIsPlayingAudio(true);
    setIsAudioPaused(false);
    isPausedRef.current = false;
    setCurrentWordIndex(0);

    const tokens = parseTextToTokens(cleanedText);
    const wordsOnly = tokens.filter(t => t.isWord);
    wordsOnlyRef.current = wordsOnly;

    const cleanText = cleanedText.replace(/\*\*/g, '');
    let hasNativeBoundary = false;

    const runAdaptiveTimer = (startIndex) => {
      if (startIndex >= wordsOnly.length) return;
      let localIdx = startIndex;

      const tick = () => {
        if (hasNativeBoundary) return;
        if (localIdx >= wordsOnly.length) return;

        setCurrentWordIndex(localIdx);
        const currentWord = wordsOnly[localIdx];
        const wordLen = currentWord ? currentWord.text.length : 5;
        const rate = 0.70;
        const baseMs = 85;
        const minMs = 350;
        const duration = Math.max(minMs, wordLen * baseMs) / rate;

        localIdx++;
        if (localIdx < wordsOnly.length) {
          window.activeReadingTimeout = setTimeout(tick, duration);
        } else {
          setTimeout(() => {
            if (!hasNativeBoundary) {
              setIsPlayingAudio(false);
              setIsAudioPaused(false);
              setCurrentWordIndex(-1);
            }
          }, duration);
        }
      };

      if (window.activeReadingTimeout) clearTimeout(window.activeReadingTimeout);
      window.activeReadingTimeout = setTimeout(tick, 0);
    };

    adaptiveTimerRef.current = runAdaptiveTimer;

    if (Capacitor.isNativePlatform()) {
      TextToSpeech.stop();
      TextToSpeech.speak({
        text: cleanText,
        lang: 'de-DE',
        rate: 0.70,
        volume: 1.0
      }).then(() => {
        if (!isPausedRef.current) {
          setIsPlayingAudio(false);
          setIsAudioPaused(false);
          setCurrentWordIndex(-1);
        }
      }).catch(e => console.error("Error Speak Native", e));
      runAdaptiveTimer(0);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'de-DE';
      utterance.rate = 0.70;
      utterance.volume = 1.0;
      utteranceRef.current = utterance;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          if (event.charIndex > 0) {
            hasNativeBoundary = true;
            if (window.activeReadingTimeout) {
              clearTimeout(window.activeReadingTimeout);
              window.activeReadingTimeout = null;
            }
          }
          const charIndex = event.charIndex;
          const currentToken = wordsOnlyRef.current.find(
            w => charIndex >= w.charStart && charIndex < w.charEnd
          );
          if (currentToken) {
            setCurrentWordIndex(currentToken.wordIndex);
          }
        }
      };

      utterance.onend = () => {
        if (window.activeReadingTimeout) {
          clearTimeout(window.activeReadingTimeout);
          window.activeReadingTimeout = null;
        }
        setIsPlayingAudio(false);
        setIsAudioPaused(false);
        setCurrentWordIndex(-1);
        utteranceRef.current = null;
      };

      utterance.onerror = () => {
        if (window.activeReadingTimeout) {
          clearTimeout(window.activeReadingTimeout);
          window.activeReadingTimeout = null;
        }
        setIsPlayingAudio(false);
        setIsAudioPaused(false);
        setCurrentWordIndex(-1);
        utteranceRef.current = null;
      };

      runAdaptiveTimer(0);
      window.speechSynthesis.speak(utterance);
    } else {
      let wordIdx = 0;
      setCurrentWordIndex(0);
      
      const runInterval = () => {
        if (window.activeReadingInterval) clearInterval(window.activeReadingInterval);
        window.activeReadingInterval = setInterval(() => {
          if (window.isReadingPausedPlaceholder) return;
          wordIdx++;
          if (wordIdx < wordsOnly.length) {
            setCurrentWordIndex(wordIdx);
          } else {
            clearInterval(window.activeReadingInterval);
            setIsPlayingAudio(false);
            setIsAudioPaused(false);
            setCurrentWordIndex(-1);
          }
        }, 450);
      };
      runInterval();
    }
  };

  const handleGenerate = async () => {
    if (!tema.trim()) return;
    setLoading(true);
    setError("");
    setReadingTest(null);
    setSelectedAnswers({});

    const steps = [
      "Iniciando generador de lectura...",
      "Escribiendo historia corta en alemán A1...",
      "Estructurando preguntas de comprensión...",
      "Dándole toques finales..."
    ];

    let currentStep = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setLoadingStep(steps[currentStep]);
      }
    }, 2000);

    try {
      if (!functions) throw new Error("Firebase functions not initialized");
      const generateFn = httpsCallable(functions, 'generateReadingTest');
      const response = await generateFn({ tema }).catch(err => {
        console.warn("Petición abortada/fallida al cambiar de vista:", err);
        throw err;
      });
      
      if (response.data) {
        setReadingTest(response.data);
      } else {
        throw new Error("No data returned from AI server");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo generar la lectura. Por favor, intenta con otro tema.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
      setLoadingStep("");
    }
  };

  const handleOptionClick = (questionIdx, optionText, correctAnswer) => {
    if (selectedAnswers[questionIdx]) return; // Ya respondida

    setSelectedAnswers(prev => ({
      ...prev,
      [questionIdx]: optionText
    }));
  };

  const handleReset = () => {
    setTema("");
    setReadingTest(null);
    setSelectedAnswers({});
    setError("");
  };

  return (
    <div className="min-h-[100svh] w-full flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* HEADER */}
      <header className="bg-emerald-600 text-white p-4 flex justify-between items-center shadow-md z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen className="text-yellow-300" size={24} />
          <div>
            <h3 className="font-bold text-lg leading-tight">Comprensión Lectora IA</h3>
            <p className="text-emerald-100 text-xs">Lectura a medida A1</p>
          </div>
        </div>
        <button 
          onClick={onExit} 
          className="text-emerald-100 hover:text-white hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition text-sm font-bold flex items-center gap-2"
        >
          <X size={16} /> Salir
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 overflow-y-auto flex flex-col justify-start">
        
        {/* ESTADO 1: INPUT DE TEMA */}
        {!loading && !readingTest && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm animate-in fade-in zoom-in duration-300 my-auto">
            <div className="text-center mb-6">
              <div className="inline-flex bg-emerald-100 text-emerald-600 p-4 rounded-full mb-4 shadow-inner">
                <Sparkles size={36} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">¿Qué te gustaría leer hoy?</h2>
              <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
                Escribe cualquier tema de tu interés (ej. "Comprar pan en Alemania", "Pasear al perro", "Una tarde de fútbol") y la IA creará un texto A1 a tu medida con preguntas.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="temaInput" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tema de la lectura</label>
                <input
                  id="temaInput"
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                  placeholder="Ej. Viaje en tren a Berlín..."
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 items-center text-rose-700 text-sm animate-shake">
                  <AlertTriangle size={18} className="shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={!tema.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3.5 font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-[15px]"
              >
                <Sparkles size={18} /> Generar Lectura A Medida
              </button>
            </div>
          </div>
        )}

        {/* ESTADO 2: CARGANDO */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center animate-in fade-in zoom-in duration-300 my-auto flex flex-col items-center justify-center gap-4">
            <div className="relative flex items-center justify-center">
              <Loader2 size={48} className="animate-spin text-emerald-600" />
              <BookOpen size={20} className="absolute text-emerald-600 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Diseñando tu lección...</h3>
              <p className="text-emerald-600 text-sm font-semibold mt-2 animate-pulse">{loadingStep}</p>
            </div>
          </div>
        )}

        {/* ESTADO 3: INTERACTIVO */}
        {!loading && readingTest && (
          <div className="space-y-6 pb-12 animate-in slide-in-from-bottom-6 duration-300">
            
            {/* TEXT CARD */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-emerald-50 border-b border-slate-200 p-4 flex justify-between items-center">
                <h4 className="font-extrabold text-emerald-800 text-base flex items-center gap-2">
                  <BookOpen size={18} /> {readingTest.titulo_aleman}
                </h4>
                <button
                  onClick={() => speakText(readingTest.texto_aleman)}
                  className={`bg-white text-emerald-700 p-2.5 rounded-full border border-slate-200 transition shadow-md hover:bg-emerald-50 ${
                    isPlayingAudio && !isAudioPaused ? 'scale-110 ring-2 ring-emerald-500/20' : ''
                  }`}
                  title={isPlayingAudio ? (isAudioPaused ? "Reanudar pronunciación" : "Pausar pronunciación") : "Escuchar pronunciación"}
                  aria-label={isPlayingAudio ? (isAudioPaused ? "Reanudar pronunciación" : "Pausar pronunciación") : "Escuchar pronunciación"}
                >
                  {isPlayingAudio ? (
                    isAudioPaused ? (
                      <Play size={16} className="text-amber-500 animate-pulse" />
                    ) : (
                      <div className="relative w-4 h-4 flex items-center justify-center">
                        <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></span>
                        <Pause size={16} className="text-emerald-700 z-10" />
                      </div>
                    )
                  ) : (
                    <Play size={16} />
                  )}
                </button>
              </div>
              <div className="p-6">
                <p translate="no" className="notranslate text-slate-800 text-lg leading-relaxed font-serif whitespace-pre-line select-none cursor-pointer" onClick={() => speakText(readingTest.texto_aleman)}>
                  {parseTextToTokens(readingTest.texto_aleman).map((token, idx) => {
                    if (token.isWord) {
                      const isHighlighted = token.wordIndex === currentWordIndex;
                      const isKeyword = token.isBold || token.isKeyword;
                      const fontWeightClass = isKeyword ? 'font-bold' : 'font-normal';
                      return (
                        <span key={idx} className={`inline-block transition-all duration-150 rounded px-1 mx-[2px] border ${isHighlighted ? 'bg-yellow-200 border-yellow-300 text-yellow-900 scale-105 font-bold shadow-sm' : isKeyword ? 'bg-emerald-50 border-transparent text-emerald-800 font-bold' : 'bg-transparent border-transparent text-slate-800'} ${fontWeightClass}`}>{token.text}</span>
                      );
                    } else {
                      const isPunct = /^[.,!?:;]+$/.test(token.text);
                      return (
                        <span key={idx} className={`text-slate-800 inline-block ${isPunct ? 'ml-[-6px] pl-0 pr-[1px]' : 'px-[1px]'}`}>{token.text}</span>
                      );
                    }
                  })}
                </p>
              </div>
            </div>

            {/* CUESTIONARIO */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 px-1">
                <HelpCircle size={20} className="text-emerald-600" /> Preguntas de Comprensión
              </h3>

              {readingTest.preguntas.map((q, qIdx) => {
                const selected = selectedAnswers[qIdx];
                const isAnswered = !!selected;

                return (
                  <div key={qIdx} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
                    <h4 className="font-bold text-slate-800 text-[15px] flex gap-2">
                      <span className="text-emerald-600 font-extrabold">{qIdx + 1}.</span>
                      {q.pregunta_aleman}
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {q.opciones_aleman.map((opt, oIdx) => {
                        const isSelected = selected === opt;
                        const isCorrect = opt === q.respuesta_correcta;

                        let btnClass = "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300";
                        
                        if (isAnswered) {
                          if (isCorrect) {
                            btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                          } else if (isSelected) {
                            btnClass = "border-rose-500 bg-rose-50 text-rose-800 font-bold";
                          } else {
                            btnClass = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionClick(qIdx, opt, q.respuesta_correcta)}
                            disabled={isAnswered}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm transition flex items-center justify-between ${btnClass}`}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explicación / Retroalimentación bimodal */}
                    {isAnswered && (
                      selected === q.respuesta_correcta ? (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-200">
                          <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                          <div className="text-sm text-slate-700 leading-relaxed">
                            <p className="font-bold text-emerald-800 mb-1">¡Correcto! Explicación:</p>
                            <p>{q.explicacion_espanol}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-200">
                          <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-sm text-slate-700 leading-relaxed">
                            <p className="font-bold text-amber-800 mb-1">Explicación:</p>
                            <p>{q.explicacion_espanol}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                );
              })}
            </div>

            {/* BOTÓN REINICIAR */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleReset}
                className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl px-6 py-3 font-bold transition flex items-center gap-2 shadow-md text-sm"
              >
                <RefreshCw size={16} /> Intentar con otro tema
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default ReadingComprehension;
