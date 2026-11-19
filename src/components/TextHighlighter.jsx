import { useState } from 'react';
import { HelpCircle, Check, Volume2 } from 'lucide-react';
import { playGermanAudio } from '../services/aiAudioService';

const TextHighlighter = ({
  sentence,
  trapWord,
  options = [],
  correctAntonym,
  translation,
  badgeLabel = 'Lupa de Antónimos (Lesen)',
  promptLabel = '¿Cuál es el antónimo / equivalencia que busca el examen?',
}) => {
  const [clicked, setClicked] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const parts = trapWord && sentence?.includes(trapWord) ? sentence.split(trapWord) : [sentence || "", ""];

  const handleSelect = (opt) => {
    setSelectedOpt(opt);
    if (opt === correctAntonym) {
      setResolved(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg text-slate-800 transition-all duration-300 mb-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {badgeLabel}
        </span>
        {sentence && (
          <button
            type="button"
            onClick={() => playGermanAudio(sentence, { type: 'sentence', voice: 'Charon' })}
            aria-label="Escuchar oración en alemán"
            className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-700 border border-slate-200 transition cursor-pointer"
          >
            <Volume2 size={16} />
          </button>
        )}
      </div>
      <p className="text-lg leading-relaxed font-semibold text-slate-700" lang="de">
        {parts[0]}
        {trapWord && sentence?.includes(trapWord) && (
          <button
            type="button"
            onClick={() => setClicked(true)}
            aria-expanded={clicked}
            className={`cursor-pointer px-2 py-0.5 rounded-lg transition-all duration-300 font-bold inline-block ${resolved ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400' : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 animate-pulse'}`}
          >
            {trapWord}
          </button>
        )}
        {parts.slice(1).join(trapWord || '')}
      </p>

      {clicked && !resolved && (
        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-fadeIn">
          <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
            <HelpCircle size={16} /> {promptLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
              <button 
                key={i}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`py-2 px-4 rounded-lg border text-sm font-bold transition-all duration-150 cursor-pointer ${selectedOpt === opt ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {resolved && (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 animate-scaleIn" aria-live="polite">
          <p className="text-emerald-800 font-bold flex items-center gap-1.5"><Check size={18} /> ¡Correcto! La equivalencia es: <strong>{correctAntonym}</strong></p>
          <p className="text-sm text-emerald-700">Traducción: {translation}</p>
        </div>
      )}
    </div>
  );
};

export default TextHighlighter;
