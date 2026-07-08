import React, { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const LiveEvaluator = ({ exercises = [] }) => {
  const list = exercises.length > 0 ? exercises : [
    { text: "Ich mag alt___ Käse", answer: "en", translation: "Me gusta el queso viejo (der Käse, Acusativo)" },
    { text: "Gut___ Brot ist teuer", answer: "es", translation: "El buen pan es caro (das Brot, Nominativo)" },
    { text: "Sie hilft mir mit groß___ Freude", answer: "er", translation: "Ella me ayuda con gran alegría (die Freude, Dativo)" }
  ];

  const [inputs, setInputs] = useState(Array(list.length).fill(""));
  const [completed, setCompleted] = useState(Array(list.length).fill(false));

  const handleChange = (val, idx) => {
    const newInputs = [...inputs];
    newInputs[idx] = val;
    setInputs(newInputs);

    const isCorrect = val.toLowerCase().trim() === list[idx].answer.toLowerCase().trim();
    const newCompleted = [...completed];
    newCompleted[idx] = isCorrect;
    setCompleted(newCompleted);

    if (isCorrect) {
      const sentenceText = list[idx].text.replace("___", val.trim()) + ".";
      if (typeof nativeSpeak === 'function') {
        nativeSpeak(sentenceText);
      }
    }
  };

  const resetAll = () => {
    setInputs(Array(list.length).fill(""));
    setCompleted(Array(list.length).fill(false));
  };

  const correctCount = completed.filter(Boolean).length;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto my-6 text-left">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          📝 Autoevaluación en Vivo
        </span>
        <span className="text-xs font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
          Completado: {correctCount} de {list.length}
        </span>
      </div>

      <div className="space-y-6">
        {list.map((ex, idx) => {
          const parts = ex.text.split("___");
          const isCorrect = completed[idx];
          const hasTypedMax = inputs[idx].length >= ex.answer.length;
          
          return (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 transition shadow-sm">
              <div className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed flex flex-wrap items-center gap-y-2">
                <span>{parts[0]}</span>
                <input
                  type="text"
                  value={inputs[idx]}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  maxLength={ex.answer.length + 2}
                  className={`w-14 text-center font-black border-2 rounded-lg py-1 px-1.5 focus:outline-none transition-all ${
                    isCorrect 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm shadow-emerald-100' 
                      : hasTypedMax && inputs[idx].trim() !== ""
                        ? 'bg-rose-50 border-rose-500 text-rose-800' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                  }`}
                  placeholder="?"
                />
                <span>{parts[1]}</span>
              </div>
              <div className="mt-2 flex justify-between items-center text-xs text-slate-400">
                <span className="italic">({ex.translation})</span>
                {isCorrect && (
                  <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                    <CheckCircle2 size={14} /> ¡Correcto!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {correctCount === list.length && (
        <div className="mt-6 bg-emerald-100 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-semibold text-center animate-in fade-in zoom-in-95">
          🎉 ¡Excelente! Has resuelto todas las declinaciones correctamente. ¡Has dominado la Declinación Fuerte!
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={resetAll}
          className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm"
        >
          <RotateCcw size={16} /> Reiniciar Todo
        </button>
      </div>
    </div>
  );
};

export default LiveEvaluator;
