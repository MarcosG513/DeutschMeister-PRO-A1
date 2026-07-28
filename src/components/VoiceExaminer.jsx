import React, { useState } from 'react';
import { Mic, MicOff, CheckCircle2, AlertCircle, Bot, Sparkles, Hand } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { nativeSpeak } from '../utils/helpers';

const VoiceExaminer = ({
  question = "Repite o responde con un comando oficial: 'Sprechen Sie bitte langsam!'",
  expectedKeywords = ["sprechen", "kommen", "nehmen", "langsam", "herein", "platz", "sei", "seid", "seien"],
  note = "Tip Examen Goethe A1: El imperativo formal invierte el orden: 'Kommen Sie bitte!'",
  mode,
  isInteractive = true,
  autoStart = false,
  onComplete
}) => {
  const [result, setResult] = useState(null); // 'success' | 'fail'
  const [selectedOption, setSelectedOption] = useState('');

  const {
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  } = useSpeechRecognition('de-DE');

  const defaultOptions = [
    { text: "Sprechen Sie bitte langsam!", keywords: ["sprechen", "langsam"] },
    { text: "Kommen Sie bitte herein!", keywords: ["kommen", "herein"] },
    { text: "Nehmen Sie bitte Platz!", keywords: ["nehmen", "platz"] }
  ];

  const handleStart = () => {
    setResult(null);
    setSelectedOption('');
    startListening((speechResult) => {
      const speechToText = speechResult.toLowerCase();
      const match = expectedKeywords.some(keyword => speechToText.includes(keyword.toLowerCase()));
      if (match) {
        setResult('success');
        if (typeof onComplete === 'function') onComplete();
      } else {
        setResult('fail');
      }
    });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option.text);
    if (typeof nativeSpeak === 'function') {
      nativeSpeak(option.text);
    }
    setResult('success');
    if (typeof onComplete === 'function') onComplete();
  };

  return (
    <div className="bg-indigo-900 border border-indigo-700/40 text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 mb-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel Izquierdo: Avatar y Pregunta */}
        <div className="bg-indigo-950/70 p-5 rounded-xl border border-indigo-700/30 flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3">
            <Bot size={42} className="text-indigo-400 bg-indigo-950 p-2.5 rounded-full ring-2 ring-indigo-500/30 shrink-0" />
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

        {/* Panel Derecho: Grabadora y Fallback Táctil */}
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

          {/* Opciones táctiles para practicar o sin permiso de micrófono */}
          <div className="w-full pt-2">
            <p className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider mb-2 text-center flex items-center justify-center gap-1">
              <Hand size={12} /> O selecciona una instrucción táctil:
            </p>
            <div className="flex flex-col gap-1.5">
              {defaultOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  className={`text-xs p-2 rounded-lg font-semibold transition text-left border ${
                    selectedOption === opt.text
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border-indigo-700/50 hover:text-white'
                  }`}
                >
                  🗣️ {opt.text}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center text-xs text-red-300 max-w-[95%]">
              <AlertCircle size={16} className="mx-auto mb-1 inline" /> {error}
            </div>
          )}

          {(transcript || selectedOption) && (
            <div className="w-full text-center bg-indigo-900/90 p-2.5 rounded-lg border border-indigo-700/40">
              <p className="text-[11px] text-indigo-400 uppercase font-bold">Respuesta capturada:</p>
              <p className="text-sm font-semibold text-amber-300 italic">"{selectedOption || transcript}"</p>
            </div>
          )}

          {result === 'success' && (
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 rounded-full text-sm font-bold animate-bounce">
              <CheckCircle2 size={16} /> ¡Excelente! Comando correcto.
            </div>
          )}

          {result === 'fail' && (
            <div className="flex items-center gap-1.5 text-red-400 bg-red-500/20 border border-red-500/40 px-4 py-1.5 rounded-full text-sm font-bold">
              <AlertCircle size={16} /> Intenta de nuevo o selecciona una opción.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceExaminer;
