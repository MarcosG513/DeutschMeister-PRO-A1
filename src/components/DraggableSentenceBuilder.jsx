import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, AlertCircle } from 'lucide-react';
import { nativeSpeak } from '../utils/helpers';

const DraggableSentenceBuilder = ({ verb, subject, complement, pool: sentencePool }) => {
  const [currentSentence, setCurrentSentence] = useState({ subject, verb, complement });
  const [pool, setPool] = useState([]);
  const [slots, setSlots] = useState([null, null, null]);
  const [isValid, setIsValid] = useState(null); // true, false, o null
  const [shake, setShake] = useState(false);

  // Sincronizar y elegir oración inicial del pool o de props directos
  useEffect(() => {
    if (sentencePool && sentencePool.length > 0) {
      const randomItem = sentencePool[Math.floor(Math.random() * sentencePool.length)];
      setCurrentSentence(randomItem);
    } else {
      setCurrentSentence({ subject, verb, complement });
    }
  }, [sentencePool, subject, verb, complement]);

  const { subject: activeSubject, verb: activeVerb, complement: activeComplement } = currentSentence || {};

  // Inicializar y desordenar palabras en el pool
  useEffect(() => {
    if (!activeSubject || !activeVerb || !activeComplement) return;
    const initialWords = [activeSubject, activeVerb, activeComplement];
    let shuffled = [...initialWords];
    // Evitar que el estado inicial de barajado sea el orden correcto
    while (shuffled[0] === activeSubject && shuffled[1] === activeVerb) {
      shuffled = shuffled.sort(() => Math.random() - 0.5);
    }
    setPool(shuffled);
    setSlots([null, null, null]);
    setIsValid(null);
  }, [currentSentence]);

  const selectWord = (word) => {
    if (isValid !== null) return;
    const emptyIndex = slots.indexOf(null);
    if (emptyIndex !== -1) {
      const newSlots = [...slots];
      newSlots[emptyIndex] = word;
      setSlots(newSlots);
      setPool(pool.filter(w => w !== word));
    }
  };

  const removeWord = (index) => {
    if (isValid !== null) return;
    const word = slots[index];
    if (word) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setPool([...pool, word]);
      setIsValid(null);
    }
  };

  const checkSentence = () => {
    if (slots.includes(null)) return;

    // Regla de Oro: El verbo conjugado debe estar en la Posición 2 (índice 1)
    const verbIsSecond = slots[1] === activeVerb;

    if (verbIsSecond) {
      setIsValid(true);
      if (typeof nativeSpeak === 'function') {
        nativeSpeak(`${slots[0]} ${slots[1]} ${slots[2]}`);
      }
    } else {
      setIsValid(false);
      setShake(true);
      // Resetear después de 1 segundo si es incorrecto para dar feedback visual
      setTimeout(() => {
        setShake(false);
        setSlots([null, null, null]);
        const initialWords = [activeSubject, activeVerb, activeComplement];
        setPool(initialWords.sort(() => Math.random() - 0.5));
        setIsValid(null);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!slots.includes(null)) {
      checkSentence();
    }
  }, [slots]);

  const nextRandomSentence = () => {
    if (!sentencePool || sentencePool.length === 0) return;
    let nextSentence = currentSentence;
    if (sentencePool.length > 1) {
      do {
        nextSentence = sentencePool[Math.floor(Math.random() * sentencePool.length)];
      } while (nextSentence.verb === currentSentence.verb && nextSentence.subject === currentSentence.subject);
    } else {
      nextSentence = sentencePool[0];
    }
    setCurrentSentence(nextSentence);
  };

  return (
    <div className={`my-6 p-5 rounded-2xl border transition-all duration-300 ${
      isValid === true 
        ? 'bg-emerald-50 border-emerald-300 shadow-emerald-100/50' 
        : isValid === false 
          ? 'bg-rose-50 border-rose-300 shadow-rose-100/50' 
          : 'bg-slate-50 border-slate-200'
    } shadow-sm max-w-xl mx-auto ${shake ? 'animate-bounce' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase">
          🔧 Constructor de Oraciones: Regla Posición 2
        </h4>
        {isValid === true && (
          <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
            <CheckCircle2 size={16} /> ¡Excelente! Verbo en Posición 2
          </span>
        )}
        {isValid === false && (
          <span className="text-rose-600 font-bold text-xs flex items-center gap-1">
            <AlertCircle size={16} /> ¡Error! El verbo no está en Posición 2
          </span>
        )}
      </div>

      {/* Cajas receptoras */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {slots.map((word, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div 
              onClick={() => word && removeWord(idx)}
              className={`w-full h-14 rounded-xl border-2 flex items-center justify-center font-bold text-sm cursor-pointer transition-all ${
                word 
                  ? isValid === true
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                    : isValid === false
                      ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                      : 'bg-white border-indigo-500 text-indigo-950 shadow-sm hover:scale-105'
                  : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
              }`}
            >
              {word || ''}
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
              {idx === 1 ? '👑 Posición 2' : `Posición ${idx + 1}`}
            </span>
          </div>
        ))}
      </div>

      {/* Pool de palabras */}
      <div className="flex flex-wrap justify-center gap-3 min-h-[44px]">
        {pool.map((word, idx) => (
          <button
            key={idx}
            onClick={() => selectWord(word)}
            disabled={isValid !== null}
            className="px-4 py-2 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold rounded-xl border-2 border-slate-200 shadow-sm transition-transform hover:scale-105 active:scale-95 text-sm"
          >
            {word}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-slate-500 mt-4">
        {isValid === true ? (
          <span className="text-emerald-700 font-medium">¡Oración estructurada! Haz clic en una casilla para reiniciar.</span>
        ) : (
          <span>Haz clic en las palabras para ordenarlas. ¡El verbo conjugado va en la <strong>Posición 2</strong>!</span>
        )}
      </p>

      {isValid === true && sentencePool && sentencePool.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={nextRandomSentence}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition shadow hover:scale-105"
          >
            Siguiente Ejercicio 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableSentenceBuilder;