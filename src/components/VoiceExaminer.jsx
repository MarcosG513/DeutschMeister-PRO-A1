// src/components/VoiceExaminer.jsx
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, AlertCircle, Bot, Sparkles, Hand, ArrowRight, Volume2 } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';

const VoiceExaminer = ({
  question = "Repite o responde con un comando oficial: 'Sprechen Sie bitte langsam!'",
  expectedKeywords = ["sprechen", "kommen", "nehmen", "langsam", "herein", "platz", "sei", "seid", "seien"],
  note = "Tip Examen Goethe A1: El imperativo formal invierte el orden: 'Kommen Sie bitte!'",
  scenarios,
  onComplete
}) => {
  const [result, setResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const {
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  } = useSpeechRecognition('de-DE');

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const defaultOptions = [
    { text: "Sprechen Sie bitte langsam!", raw: "Sprechen Sie bitte langsam!", translation: "¡Hable despacio, por favor!" },
    { text: "Kommen Sie bitte herein!", raw: "Kommen Sie bitte herein!", translation: "¡Pase adelante, por favor!" },
    { text: "Nehmen Sie bitte Platz!", raw: "Nehmen Sie bitte Platz!", translation: "¡Tome asiento, por favor!" }
  ];

  const activeOptions = (scenarios && scenarios.length > 0)
    ? scenarios.map(s => ({
        raw: (s.german || s.text || "").trim(),
        translation: s.translation || "",
        context: s.context || ""
      }))
    : defaultOptions;

  const handleStart = () => {
    stopCurrentAudio();
    setResult(null);
    setSelectedOption('');
    startListening((speechResult) => {
      const speechToText = (speechResult || "").toLowerCase();
      const match = expectedKeywords.some(keyword => speechToText.includes(keyword.toLowerCase()));
      setResult(match ? 'success' : 'fail');
    });
  };

  const handleOptionSelect = (option) => {
    const pureGermanText = option.raw || option.text;
    setSelectedOption(pureGermanText);
    playGermanAudio(pureGermanText, { type: "dialogue", voice: "Charon" });
    setResult('success');
  };

  return (
    <div className="bg-indigo-900 border border-indigo-700/40 text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 mb-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-950/70 p-5 rounded-xl border border-indigo-700/30 flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3">
            <Bot className="text-indigo-400 bg-indigo-950 p-2.5 rounded-full ring-2 ring-indigo-500/30 shrink-0" size={42} />
            <div>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} /> Examinador Goethe A1
              </p>
              <h4 className="text-lg font-bold text-white mt-1 leading-snug">{question}</h4>
            </div>
          </div>
          {note && (
            <div className="bg-indigo-900/60 p-3 rounded-lg border border-indigo-700/20 text-xs text-indigo-300">
              💡 {note}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 bg-indigo-950/40 p-4 rounded-xl border border-indigo-700/20">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={isListening ? stopListening : handleStart}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isListening
                  ? 'bg-red-600 animate-pulse ring-4 ring-red-500/30 text-white scale-105'
                  : 'bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-lg shadow-indigo-600/40'
              }`}
            >
              {isListening ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
            <p className="text-xs text-indigo-300 font-medium text-center">
              {isListening ? 'Escuchando... Habla en alemán' : 'Toca el micrófono para hablar'}
            </p>
          </div>

          <div className="w-full pt-2">
            <p className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider mb-2 text-center flex items-center justify-center gap-1">
              <Hand size={12} /> O escucha un modelo oficial en alemán:
            </p>
            <div className="flex flex-col gap-1.5">
              {activeOptions.map((opt, idx) => {
                const isSelected = selectedOption === opt.raw;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionSelect(opt)}
                    className={`text-xs p-2.5 rounded-lg font-semibold transition text-left border flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border-indigo-700/50 hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{opt.context ? `${opt.context}: ` : '🗣️ '}<strong>{opt.raw}</strong></span>
                      {opt.translation && (
                        <span className="text-[11px] opacity-80 italic font-normal mt-0.5">{opt.translation}</span>
                      )}
                    </div>
                    <Volume2 className="shrink-0 opacity-80" size={15} />
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center text-xs text-red-300 max-w-[95%]">
              <AlertCircle className="mx-auto mb-1 inline" size={16} /> {error}
            </div>
          )}

          {(transcript || selectedOption) && (
            <div className="w-full text-center bg-indigo-900/90 p-2.5 rounded-lg border border-indigo-700/40">
              <p className="text-[11px] text-indigo-400 uppercase font-bold">Respuesta capturada:</p>
              <p className="text-sm font-semibold text-amber-300 italic">"{selectedOption || transcript}"</p>
            </div>
          )}

          {result === 'success' && (
            <div className="w-full flex flex-col items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs font-bold">
                <CheckCircle2 size={16} /> ¡Excelente! Comando correcto.
              </div>
              {typeof onComplete === 'function' && (
                <button
                  type="button"
                  onClick={() => {
                    stopCurrentAudio();
                    onComplete();
                  }}
                  className="mt-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                >
                  <span>Continuar</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          )}

          {result === 'fail' && (
            <div className="flex items-center gap-1.5 text-red-400 bg-red-500/20 border border-red-500/40 px-4 py-1.5 rounded-full text-xs font-bold">
              <AlertCircle size={16} /> Intenta de nuevo o selecciona una opción.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceExaminer;
