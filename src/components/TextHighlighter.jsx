import React, { useState } from 'react';
import { HelpCircle, Check } from 'lucide-react';

const TextHighlighter = ({ sentence, trapWord, options, correctAntonym, translation }) => {
  const [clicked, setClicked] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const parts = sentence.split(trapWord);

  const handleSelect = (opt) => {
    setSelectedOpt(opt);
    if (opt === correctAntonym) {
      setResolved(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg text-slate-800 transition-all duration-300 mb-6">
      <div className="mb-4">
        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Lupa de Antónimos (Lesen)</span>
      </div>
      <p className="text-lg leading-relaxed font-semibold text-slate-700">
        {parts[0]}
        <span 
          onClick={() => setClicked(true)}
          className={`cursor-pointer px-2 py-0.5 rounded-lg transition-all duration-300 font-bold ${resolved ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400 font-bold' : 'bg-amber-100 hover:bg-amber-200 text-amber-900 animate-pulse'}`}
        >
          {trapWord}
        </span>
        {parts[1]}
      </p>

      {clicked && !resolved && (
        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-fadeIn">
          <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5"><HelpCircle size={16} /> ¿Cuál es el antónimo / equivalencia que busca el Goethe?</p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleSelect(opt)}
                className={`py-2 px-4 rounded-lg border text-sm font-bold transition-all duration-150 ${selectedOpt === opt ? 'bg-red-55 border-red-300 text-red-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {resolved && (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 animate-scaleIn">
          <p className="text-emerald-800 font-bold flex items-center gap-1.5"><Check size={18} /> ¡Correcto! La equivalencia es: <strong>{correctAntonym}</strong></p>
          <p className="text-sm text-emerald-700">Traducción: {translation}</p>
        </div>
      )}
    </div>
  );
};

export default TextHighlighter;
