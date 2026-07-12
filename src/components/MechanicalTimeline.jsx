import React, { useState } from 'react';
import { ArrowRight, History, Play } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const MechanicalTimeline = ({ 
  present = { subject: "Ich", verb: "kaufe", complement: "eine Pizza" },
  past = { auxiliary: "habe", participle: "gekauft" }
}) => {
  const [timelineVal, setTimelineVal] = useState(0);

  const t = parseFloat(timelineVal);

  const speakSentence = () => {
    if (t < 0.5) {
      if (typeof nativeSpeak === 'function') nativeSpeak(`${present.subject} ${present.verb} ${present.complement}`);
    } else {
      if (typeof nativeSpeak === 'function') nativeSpeak(`${present.subject} ${past.auxiliary} ${present.complement} ${past.participle}`);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto my-6 text-left">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
          ⚙️ Línea de Tiempo Mecánica: Das Perfekt
        </h4>
        <button 
          onClick={speakSentence}
          className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition"
          title="Escuchar oración activa"
        >
          <Play size={16} fill="currentColor" />
        </button>
      </div>

      {/* Cajas de la Oración */}
      <div className="relative min-h-[140px] bg-white border border-slate-100 rounded-xl p-4 flex flex-col justify-between mb-6 overflow-hidden">
        <div className="flex flex-row justify-between text-center text-[10px] font-bold text-slate-400 uppercase w-full">
          <span className="w-1/4">Posición 1</span>
          <span className="w-1/4">Posición 2</span>
          <span className="w-1/4">Complemento</span>
          <span className="w-1/4">Final Absoluto</span>
        </div>

        <div className="flex flex-row gap-2 items-center my-4 relative w-full">
          {/* Sujeto */}
          <div className="w-1/4 bg-blue-50 border-2 border-blue-200 text-blue-900 rounded-xl p-3 text-center font-bold text-sm sm:text-base transition-all">
            {present.subject}
            <span className="block text-[9px] font-normal text-blue-600/80 mt-0.5">Sujeto</span>
          </div>

          {/* Verbo Principal / Auxiliar */}
          <div className="w-1/4 relative h-[56px] flex items-center justify-center">
            {/* Verbo en Presente */}
            <div 
              className="absolute inset-0 bg-indigo-50 border-2 border-indigo-200 text-indigo-900 rounded-xl p-3 text-center font-bold text-sm sm:text-base transition-all flex flex-col justify-center items-center"
              style={{
                opacity: 1 - t,
                transform: `translateY(${-t * 20}px) scale(${1 - t * 0.2})`,
                pointerEvents: t > 0.8 ? 'none' : 'auto'
              }}
            >
              {present.verb}
              <span className="block text-[9px] font-normal text-indigo-600/80">Verbo</span>
            </div>

            {/* Auxiliar en Pasado */}
            <div 
              className="absolute inset-0 bg-emerald-600 border-2 border-emerald-600 text-white rounded-xl p-3 text-center font-bold text-sm sm:text-base transition-all flex flex-col justify-center items-center shadow-sm"
              style={{
                opacity: t,
                transform: `translateY(${(1 - t) * 20}px) scale(${0.8 + t * 0.2})`,
                pointerEvents: t < 0.2 ? 'none' : 'auto'
              }}
            >
              {past.auxiliary}
              <span className="block text-[9px] font-normal text-emerald-100 mt-0.5">Auxiliar</span>
            </div>
          </div>

          {/* Complemento */}
          <div className="w-1/4 bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-xl p-3 text-center font-bold text-sm sm:text-base transition-all">
            {present.complement}
            <span className="block text-[9px] font-normal text-slate-500 mt-0.5">Relleno</span>
          </div>

          {/* Participio */}
          <div className="w-1/4 relative h-[56px] flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-emerald-50 border-2 border-emerald-200 text-emerald-950 rounded-xl p-3 text-center font-bold text-sm sm:text-base transition-all flex flex-col justify-center items-center"
              style={{
                opacity: t,
                transform: `translateX(${(1 - t) * -40}px) scale(${0.7 + t * 0.3})`,
                pointerEvents: t < 0.2 ? 'none' : 'auto'
              }}
            >
              {past.participle}
              <span className="block text-[9px] font-normal text-emerald-600/80 mt-0.5">Participio</span>
            </div>
            
            {t < 0.5 && (
              <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[10px] text-slate-300 font-semibold uppercase">
                Vacío
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles de Slider */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs font-bold text-slate-500 px-1">
          <span className={t < 0.3 ? "text-indigo-600 font-black" : ""}>PRESENTE (Präsens)</span>
          <span className={t > 0.7 ? "text-emerald-600 font-black" : ""}>PASADO (Perfekt)</span>
        </div>
        
        <div className="flex items-center gap-3">
          <History size={18} className="text-slate-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={timelineVal}
            onChange={(e) => setTimelineVal(e.target.value)}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <ArrowRight size={18} className="text-slate-400" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          {t < 0.3 ? (
            <span>El verbo principal <strong>"{present.verb}"</strong> reina en la Posición 2.</span>
          ) : t > 0.7 ? (
            <span>El auxiliar <strong>"{past.auxiliary}"</strong> toma la Posición 2, y el verbo original muta a <strong>"{past.participle}"</strong> al final absoluto.</span>
          ) : (
            <span>¡Moviendo el motor verbal al final de la oración!</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MechanicalTimeline;
