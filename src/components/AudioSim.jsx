import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const AudioSim = ({ title, textDe, textEs }) => {
  const [playing, setPlaying] = useState(false);
  
  const playAudio = async () => {
    setPlaying(true);
    await nativeSpeak(textDe);
    setTimeout(() => setPlaying(false), 2000);
  };

  return (
    <div className="bg-slate-800 text-white rounded-xl p-4 mb-4 flex items-center gap-4 shadow-lg">
      <button 
        onClick={playAudio}
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${playing ? 'bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'}`}
      >
        <Volume2 size={24} className="text-white" />
      </button>
      <div className="flex-1">
        <h4 className="font-bold text-blue-300 text-sm">{title}</h4>
        <p className="text-lg font-medium">{textDe}</p>
        <p className="text-sm text-slate-400 italic">{textEs}</p>
      </div>
    </div>
  );
};

export default AudioSim;
