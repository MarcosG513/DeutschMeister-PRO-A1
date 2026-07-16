import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const AcousticRadar = ({ title, textDe, textEs, options, correctOption, question }) => {
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const playAudio = async () => {
    setPlaying(true);
    await nativeSpeak(textDe);
    setPlaying(false);
  };

  const handleSelect = (option) => {
    setSelected(option);
    if (option === correctOption) {
      setRevealed(true);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-2xl text-white relative overflow-hidden transition-all duration-300">
      <div className="flex items-center gap-4 border-b border-slate-700/50 pb-4 mb-4">
        <button 
          onClick={playAudio}
          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${playing ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30'}`}
        >
          <Volume2 size={28} className="text-white" />
        </button>
        <div>
          <h4 className="font-bold text-indigo-400 text-sm tracking-wider uppercase">{title}</h4>
          <p className={`text-xl font-medium transition-all duration-500 filter ${revealed ? 'blur-none text-emerald-400' : 'blur-md text-slate-300 select-none'}`}>
            {textDe}
          </p>
          {revealed && <p className="text-sm text-slate-400 italic mt-1 transition-all duration-500">{textEs}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-slate-300 font-medium mb-2">{question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {options.map((opt, idx) => {
            const isCorrect = opt === correctOption;
            const isSelected = opt === selected;
            let btnClass = "bg-slate-800 hover:bg-slate-700 border-slate-700";
            if (isSelected) {
              btnClass = isCorrect ? "bg-emerald-600/30 border-emerald-500 text-emerald-400" : "bg-red-600/30 border-red-500 text-red-400";
            }
            return (
              <button 
                key={idx}
                onClick={() => handleSelect(opt)}
                disabled={revealed && selected === correctOption}
                className={`py-3 px-4 rounded-xl border text-center transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2 ${btnClass}`}
              >
                {opt}
                {isSelected && (isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AcousticRadar;
