import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const AccusativeShield = ({ words = [] }) => {
  const list = words.length > 0 ? words : [
    { word: "Apfel", gender: "der", translation: "manzana" },
    { word: "Tomate", gender: "die", translation: "tomate" },
    { word: "Brot", gender: "das", translation: "pan" },
    { word: "Käse", gender: "der", translation: "queso" },
    { word: "Milch", gender: "die", translation: "leche" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null); // 'correct' | 'incorrect'
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [finished, setFinished] = useState(false);
  const [shieldApplied, setShieldApplied] = useState(false);

  const currentWord = list[currentIndex];

  const handleAction = (applyShield) => {
    if (showFeedback) return;

    const isMasculine = currentWord.gender === "der";
    let correct = false;
    let explanation = "";

    if (applyShield) {
      if (isMasculine) {
        correct = true;
        setShieldApplied(true);
        explanation = `¡Correcto! El masculino '${currentWord.gender} ${currentWord.word}' cambia en Acusativo a 'den ${currentWord.word}' (o 'einen ${currentWord.word}').`;
        if (typeof nativeSpeak === 'function') nativeSpeak(`den ${currentWord.word}`);
      } else {
        correct = false;
        explanation = `¡Error! El sustantivo es ${currentWord.gender === "die" ? "femenino" : "neutro"} (${currentWord.gender} ${currentWord.word}). Solo los masculinos cambian en acusativo.`;
      }
    } else {
      if (!isMasculine) {
        correct = true;
        explanation = `¡Correcto! '${currentWord.gender} ${currentWord.word}' es ${currentWord.gender === "die" ? "femenino" : "neutro"}, por lo que no cambia en acusativo.`;
        if (typeof nativeSpeak === 'function') nativeSpeak(`${currentWord.gender} ${currentWord.word}`);
      } else {
        correct = false;
        explanation = `¡Error! '${currentWord.gender} ${currentWord.word}' es masculino. El acusativo exige cambiar '${currentWord.gender}' a 'den' (o 'einen').`;
      }
    }

    if (correct) {
      setScore(prev => prev + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('incorrect');
    }
    setFeedbackMsg(explanation);

    setTimeout(() => {
      setShowFeedback(null);
      setFeedbackMsg("");
      setShieldApplied(false);
      if (currentIndex + 1 < list.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setFinished(true);
      }
    }, 3500);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(null);
    setFeedbackMsg("");
    setFinished(false);
    setShieldApplied(false);
  };

  if (finished) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm max-w-md mx-auto">
        <h4 className="font-bold text-xl text-slate-800 mb-2">🛡️ Resultados del Escudo</h4>
        <div className="text-4xl font-extrabold text-indigo-600 my-4">{score} / {list.length}</div>
        <p className="text-sm text-slate-600 mb-6">
          {score === list.length 
            ? "¡Excelente! Has dominado la regla del acusativo. ¡Ningún masculino logró burlar tu escudo!" 
            : "Sigue practicando. Recuerda: ¡Solo declinamos los sustantivos masculinos (der → den)!"}
        </p>
        <button 
          onClick={resetGame}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-sm"
        >
          <RotateCcw size={18} /> Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white border-2 rounded-2xl p-6 shadow-sm max-w-md mx-auto transition-all duration-300 ${
      showFeedback === 'correct' 
        ? 'border-emerald-500 bg-emerald-50/50' 
        : showFeedback === 'incorrect' 
          ? 'border-rose-500 bg-rose-50/50' 
          : 'border-slate-200'
    }`}>
      <div className="flex justify-between items-center mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
        <span>🛡️ El Escudo del Acusativo</span>
        <span>Palabra {currentIndex + 1} de {list.length}</span>
      </div>

      {/* Word Box */}
      <div className="my-6 text-center">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 transition-all duration-500 ${
          shieldApplied 
            ? "bg-emerald-600 text-white scale-110 shadow-sm" 
            : currentWord.gender === "der" 
              ? "bg-blue-100 text-blue-800" 
              : currentWord.gender === "die" 
                ? "bg-rose-100 text-rose-800" 
                : "bg-amber-100 text-amber-800"
        }`}>
          {shieldApplied ? "den" : currentWord.gender}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight max-w-full break-words whitespace-normal text-center overflow-hidden px-2">{currentWord.word}</h3>
        <p className="text-sm text-slate-400 mt-1 italic">({currentWord.translation})</p>
      </div>

      {/* Feedback Alert */}
      {showFeedback && (
        <div className={`flex items-start gap-2 p-3 rounded-xl border mb-6 text-xs sm:text-sm font-medium animate-in fade-in zoom-in-95 ${
          showFeedback === 'correct' 
            ? 'bg-emerald-100 border-emerald-200 text-emerald-800' 
            : 'bg-rose-100 border-rose-200 text-rose-800'
        }`}>
          {showFeedback === 'correct' ? <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" /> : <AlertTriangle size={18} className="shrink-0 text-rose-600 mt-0.5" />}
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleAction(true)}
          disabled={showFeedback !== null}
          className="flex flex-col items-center justify-center p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none max-w-full break-words whitespace-normal text-center overflow-hidden"
        >
          <Shield size={22} className="mb-1" />
          <span className="text-sm">Aplicar Escudo</span>
          <span className="text-[10px] font-medium opacity-80">(Cambiar a -en)</span>
        </button>

        <button
          onClick={() => handleAction(false)}
          disabled={showFeedback !== null}
          className="flex flex-col items-center justify-center p-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold border border-slate-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none max-w-full break-words whitespace-normal text-center overflow-hidden"
        >
          <ArrowRight size={22} className="mb-1" />
          <span className="text-sm">Dejar Pasar</span>
          <span className="text-[10px] font-medium opacity-85">(Sin cambios)</span>
        </button>
      </div>
    </div>
  );
};

export default AccusativeShield;
