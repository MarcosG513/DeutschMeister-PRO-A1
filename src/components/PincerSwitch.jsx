import React, { useState } from 'react';
import { Scissors, Play, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const PincerSwitch = ({ exercises = [] }) => {
  const list = exercises.length > 0 ? exercises : [
    { subject: "Ich", verbRaiz: "stehe", prefix: "auf", complement: "um 7 Uhr", verbOriginal: "aufstehen", translation: "Yo me levanto a las 7" },
    { subject: "Er", verbRaiz: "kauft", prefix: "ein", complement: "im Supermarkt", verbOriginal: "einkaufen", translation: "Él compra en el supermercado" },
    { subject: "Wir", verbRaiz: "sehen", prefix: "fern", complement: "am Abend", verbOriginal: "fernsehen", translation: "Nosotros vemos TV por la noche" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const current = list[currentIndex];

  const triggerPincer = () => {
    setIsActive(true);
    if (typeof nativeSpeak === 'function') {
      nativeSpeak(`${current.subject} ${current.verbRaiz} ${current.complement} ${current.prefix}`);
    }
  };

  const resetPincer = () => {
    setIsActive(false);
  };

  const nextExercise = () => {
    setIsActive(false);
    setCurrentIndex((currentIndex + 1) % list.length);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto my-6 text-left">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          🗜️ El Interruptor de Pinza (Verbo Separable)
        </span>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          {current.verbOriginal}
        </span>
      </div>

      {/* Cajas de Oración */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 min-h-[120px] flex flex-col justify-center mb-6 relative overflow-hidden">
        <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-bold text-slate-400 uppercase mb-2">
          <span>Sujeto</span>
          <span>Posición 2</span>
          <span>Complemento</span>
          <span>Final Absoluto</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-bold text-xs sm:text-sm my-2">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-1 sm:p-2.5 rounded-lg flex flex-col justify-center items-center break-words whitespace-normal text-[10px] sm:text-xs md:text-sm leading-tight max-w-full break-words whitespace-normal text-center overflow-hidden">
            {current.subject}
          </div>

          <div className="relative h-[48px] flex items-center justify-center">
            {/* Prefijo + Raíz juntos */}
            <div 
              className="absolute inset-0 bg-rose-50 border-2 border-rose-200 text-rose-800 rounded-lg p-1 flex flex-col justify-center items-center transition-all duration-500 max-w-full break-words whitespace-normal text-center overflow-hidden"
              style={{
                opacity: isActive ? 0 : 1,
                transform: isActive ? 'scale(0.8) translateY(-20px)' : 'scale(1) translateY(0)',
                pointerEvents: isActive ? 'none' : 'auto'
              }}
            >
              <span className="font-extrabold text-[10px] sm:text-xs md:text-sm text-rose-700 break-words whitespace-normal leading-tight max-w-full break-words whitespace-normal text-center overflow-hidden">
                <span className="underline">{current.prefix}</span>{current.verbRaiz}
              </span>
              <span className="text-[8px] font-medium text-rose-500">Incorrecto</span>
            </div>

            {/* Solo Raíz */}
            <div 
              className="absolute inset-0 bg-indigo-600 border border-indigo-600 text-white rounded-lg p-1 flex flex-col justify-center items-center transition-all duration-500 shadow-sm max-w-full break-words whitespace-normal text-center overflow-hidden"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <span className="font-black text-[10px] sm:text-xs md:text-sm break-words whitespace-normal leading-tight max-w-full break-words whitespace-normal text-center overflow-hidden">{current.verbRaiz}</span>
              <span className="text-[8px] font-medium text-indigo-200">Raíz</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 text-slate-700 p-1 sm:p-2.5 rounded-lg flex flex-col justify-center items-center break-words whitespace-normal text-[10px] sm:text-xs md:text-sm leading-tight max-w-full break-words whitespace-normal text-center overflow-hidden">
            {current.complement}
          </div>

          <div className="relative h-[48px] flex items-center justify-center">
            <div 
              className="absolute inset-0 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-[10px] text-slate-300 transition-all duration-500 max-w-full break-words whitespace-normal text-center overflow-hidden"
              style={{ opacity: isActive ? 0 : 1 }}
            >
              Vacío
            </div>

            {/* Prefijo volando al final */}
            <div 
              className="absolute inset-0 bg-emerald-600 border-emerald-600 text-white rounded-lg p-1 flex flex-col justify-center items-center transition-all duration-500 shadow-sm max-w-full break-words whitespace-normal text-center overflow-hidden"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0) scale(1)' : 'translateX(-100px) scale(0.6)',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <span className="font-black text-[10px] sm:text-xs md:text-sm break-words whitespace-normal leading-tight max-w-full break-words whitespace-normal text-center overflow-hidden">{current.prefix}</span>
              <span className="text-[8px] font-medium text-emerald-100">Prefijo</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-2 italic">({current.translation})</p>
      </div>

      {/* Alerta de Éxito */}
      {isActive && (
        <div className="bg-emerald-100 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-start gap-2 mb-6 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" />
          <span>
            ¡Efecto Pinza Activado! El prefijo separable <strong>"{current.prefix}"</strong> se separa de la raíz y se va al final absoluto de la oración.
          </span>
        </div>
      )}

      {/* Controles */}
      <div className="flex gap-3 justify-center">
        {!isActive ? (
          <button
            onClick={triggerPincer}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm hover:scale-105"
          >
            <Scissors size={18} /> Activar Efecto Pinza
          </button>
        ) : (
          <>
            <button
              onClick={resetPincer}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm"
            >
              <RotateCcw size={18} /> Reiniciar
            </button>
            <button
              onClick={nextExercise}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm hover:scale-105"
            >
              Siguiente Verbo <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PincerSwitch;
