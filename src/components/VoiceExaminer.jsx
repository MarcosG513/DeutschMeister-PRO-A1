import React, { useState } from 'react';
import { Mic, MicOff, CheckCircle2, AlertCircle, Bot } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const VoiceExaminer = ({ question, expectedKeywords, note }) => {
  const [result, setResult] = useState(null); // 'success' | 'fail'

  const {
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  } = useSpeechRecognition('de-DE');

  const handleStart = () => {
    setResult(null);
    startListening((speechResult) => {
      const speechToText = speechResult.toLowerCase();
      const match = expectedKeywords.some(keyword => speechToText.includes(keyword.toLowerCase()));
      if (match) {
        setResult('success');
      } else {
        setResult('fail');
      }
    });
  };

  return (
    <div className="bg-indigo-900 border border-indigo-700/30 text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel Superior: Avatar y Pregunta */}
        <div className="bg-indigo-950/60 p-4 rounded-xl border border-indigo-700/20 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <Bot size={40} className="text-indigo-400 bg-indigo-950 p-2 rounded-full ring-2 ring-indigo-500/20" />
            <div>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Examinador Goethe</p>
              <h4 className="text-lg font-bold text-white mt-0.5">{question}</h4>
            </div>
          </div>
          {note && <p className="text-xs text-indigo-400 italic mt-4">{note}</p>}
        </div>

        {/* Panel Inferior: Grabadora y Feedback */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <button 
            onClick={isListening ? stopListening : handleStart}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-red-600 animate-pulse ring-4 ring-red-500/30' : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 active:scale-95'}`}
          >
            {isListening ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
          <p className="text-xs text-indigo-300 font-medium">
            {isListening ? 'Escuchando... Habla en alemán (Presiona de nuevo para parar)' : 'Haz clic en el micrófono para hablar'}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center text-xs text-red-300 max-w-[90%] break-words">
              <AlertCircle size={16} className="mx-auto mb-1 inline" /> {error}
            </div>
          )}

          {transcript && (
            <div className="w-full text-center">
              <p className="text-xs text-indigo-400">Escuchado:</p>
              <p className="text-sm font-semibold text-white italic">"{transcript}"</p>
            </div>
          )}

          {result === 'success' && (
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-sm font-bold animate-bounce">
              <CheckCircle2 size={16} /> ¡Respuesta válida!
            </div>
          )}

          {result === 'fail' && (
            <div className="flex items-center gap-1.5 text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full text-sm font-bold">
              <AlertCircle size={16} /> Intenta de nuevo
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceExaminer;
