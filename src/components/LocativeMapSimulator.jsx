import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const LocativeMapSimulator = ({ exercises = [] }) => {
  const list = exercises.length > 0 ? exercises : [
    { 
      sentence: "Das Handy liegt ___ Tisch.", 
      questionType: "Wo", 
      options: ["auf dem", "auf den", "in dem", "in den"],
      correct: "auf dem",
      explanation: "El verbo 'liegen' indica estado/reposo (¿Wo?), por lo tanto exige Dativo: auf + dem Tisch (masculino).",
      translation: "El celular está sobre la mesa."
    },
    {
      sentence: "Ich lege das Handy ___ Tisch.",
      questionType: "Wohin", 
      options: ["auf dem", "auf den", "in dem", "in den"],
      correct: "auf den",
      explanation: "El verbo 'legen' indica movimiento de colocar (¿Wohin?), por lo tanto exige Acusativo: auf + den Tisch (masculino).",
      translation: "Yo coloco el celular sobre la mesa."
    },
    {
      sentence: "Wir gehen ___ Kino.",
      questionType: "Wohin", 
      options: ["im", "ins", "zum", "am"],
      correct: "ins",
      explanation: "Ir al cine es desplazamiento (¿Wohin?). Usamos la contracción in + das = ins (das Kino, Acusativo).",
      translation: "Nosotros vamos al cine."
    },
    {
      sentence: "Wir sind ___ Kino.",
      questionType: "Wo", 
      options: ["im", "ins", "zum", "am"],
      correct: "im",
      explanation: "Estar en el cine es estático (¿Wo?). Usamos la contracción in + dem = im (das Kino, Dativo).",
      translation: "Nosotros estamos en el cine."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(null); // 'correct' | 'incorrect'
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shake, setShake] = useState(false);

  const current = list[currentIndex];

  const handleSelect = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);

    const isCorrect = option === current.correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setShowFeedback('correct');
      const completeSentence = current.sentence.replace("___", option);
      if (typeof nativeSpeak === 'function') nativeSpeak(completeSentence);
    } else {
      setShowFeedback('incorrect');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(null);
    if (currentIndex + 1 < list.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(null);
    setScore(0);
    setFinished(false);
    setShake(false);
  };

  if (finished) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm max-w-md mx-auto">
        <h4 className="font-bold text-xl text-slate-800 mb-2">🧭 Resultados del Manual del Navegante</h4>
        <div className="text-4xl font-extrabold text-emerald-600 my-4">{score} / {list.length}</div>
        <p className="text-sm text-slate-600 mb-6">
          {score === list.length 
            ? "¡Espectacular! Tienes una brújula perfecta. Sabes exactamente cuándo estar en reposo (Dativo) y cuándo desplazarte (Acusativo)." 
            : "Sigue practicando. Recuerda: Wo = Dativo (Estático) | Wohin = Acusativo (Dinámico)."}
        </p>
        <button 
          onClick={resetGame}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-sm"
        >
          <RotateCcw size={18} /> Reintentar Desafío
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white border-2 rounded-2xl p-6 shadow-sm max-w-md mx-auto transition-all duration-300 ${shake ? 'animate-bounce' : ''} ${
      showFeedback === 'correct' 
        ? 'border-emerald-500 bg-emerald-50/30' 
        : showFeedback === 'incorrect' 
          ? 'border-rose-500 bg-rose-50/30' 
          : 'border-slate-200'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Compass size={16} className="text-slate-400" />
          Mapa Locativo: Wo vs. Wohin
        </span>
        <span className="text-xs font-bold text-slate-400">
          {currentIndex + 1} de {list.length}
        </span>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 flex items-center gap-4">
        <div className={`p-4 rounded-xl flex items-center justify-center ${
          current.questionType === "Wo" 
            ? "bg-amber-100 text-amber-800 border border-amber-200" 
            : "bg-blue-100 text-blue-800 border border-blue-200"
        }`}>
          {current.questionType === "Wo" ? (
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-extrabold text-xs">¿Wo?</span>
              <span className="text-[9px] font-bold uppercase tracking-wider">Estático</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-extrabold text-xs">¿Wohin?</span>
              <span className="text-[9px] font-bold uppercase tracking-wider">Dinámico</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h5 className="font-bold text-slate-800 text-sm">
            {current.questionType === "Wo" ? "Reposición / Ubicación" : "Desplazamiento / Dirección"}
          </h5>
          <p className="text-xs text-slate-500">
            {current.questionType === "Wo" ? "Exige caso DATIVO en el sustantivo." : "Exige caso ACUSATIVO en el sustantivo."}
          </p>
        </div>
      </div>

      <div className="my-6 text-center">
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          {current.sentence.split("___")[0]}
          <span className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700 font-bold mx-1.5 text-base sm:text-lg">
            {selectedOption || "___"}
          </span>
          {current.sentence.split("___")[1]}
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 italic">({current.translation})</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(opt)}
            disabled={showFeedback !== null}
            className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-55 disabled:pointer-events-none ${
              selectedOption === opt
                ? opt === current.correct
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                  : 'bg-rose-600 border-rose-600 text-white shadow-md'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-xl border-2 mb-6 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 ${
          showFeedback === 'correct' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex gap-2 items-start">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">
                {showFeedback === 'correct' ? "¡Correcto!" : "¡Incorrecto!"}
              </span>
              <p className="text-[11px] sm:text-xs leading-normal opacity-90">{current.explanation}</p>
            </div>
          </div>
          <button 
            onClick={nextQuestion}
            className="w-full mt-3 bg-white border border-current hover:bg-slate-50 text-slate-800 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            Siguiente <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LocativeMapSimulator;
