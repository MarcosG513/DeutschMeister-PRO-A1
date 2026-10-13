import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { playGermanAudio } from '../services/aiAudioService';

const DraggableSentenceBuilder = ({ verb, subject, complement, pool: sentencePool, mode }) => {
  const [currentSentence, setCurrentSentence] = useState(null);
  const [pool, setPool] = useState([]);
  const [slots, setSlots] = useState([null, null, null]);
  const [isValid, setIsValid] = useState(null); // true, false, o null
  const [shake, setShake] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  // Sincronizar y elegir oración inicial del pool o de props directos
  useEffect(() => {
    if (sentencePool && sentencePool.length > 0) {
      const randomItem = sentencePool[Math.floor(Math.random() * sentencePool.length)];
      setCurrentSentence(randomItem);
    } else {
      setCurrentSentence({ subject, verb, complement });
    }
  }, [sentencePool, subject, verb, complement]);

  const rawSentence = currentSentence || {};
  const expectedOrder = rawSentence.correctOrder 
    ? rawSentence.correctOrder 
    : (rawSentence.words 
        ? rawSentence.words 
        : [rawSentence.subject || subject, rawSentence.verb || verb, rawSentence.complement || complement].filter(Boolean));
  
  const targetWords = rawSentence.words || expectedOrder;
  const numBlocks = expectedOrder.length || 3;

  // Inicializar y desordenar palabras en el pool
  useEffect(() => {
    if (!targetWords || targetWords.length === 0) return;
    
    let shuffled = [...targetWords];
    let attempts = 0;
    while (attempts < 10 && shuffled.length > 1 && shuffled.every((w, i) => w === expectedOrder[i])) {
      shuffled = [...shuffled].sort(() => Math.random() - 0.5);
      attempts++;
    }

    setPool(shuffled);
    setSlots(new Array(numBlocks).fill(null));
    setIsValid(null);
    setHintUsed(false);
  }, [currentSentence]);

  const buyHint = () => {
    if (hintUsed || isValid !== null || !expectedOrder || expectedOrder.length === 0) return;
    setHintUsed(true);
    const firstWord = expectedOrder[0];
    if (firstWord && (pool.includes(firstWord) || slots.includes(firstWord))) {
      const newSlots = [...slots];
      newSlots[0] = firstWord;
      setSlots(newSlots);
      setPool(prev => {
        const idx = prev.indexOf(firstWord);
        if (idx !== -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
    }
  };

  const selectWord = (word) => {
    if (isValid !== null) return;
    const emptyIndex = slots.indexOf(null);
    if (emptyIndex !== -1) {
      const newSlots = [...slots];
      newSlots[emptyIndex] = word;
      setSlots(newSlots);
      setPool(prev => {
        const idx = prev.indexOf(word);
        if (idx !== -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
    }
  };

  const removeWord = (index) => {
    if (isValid !== null) return;
    const word = slots[index];
    if (word) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setPool(prev => [...prev, word]);
      setIsValid(null);
    }
  };

  const checkSentence = () => {
    if (slots.includes(null)) return;

    let isMatch = false;
    if (expectedOrder && expectedOrder.length === slots.length) {
      isMatch = slots.every((w, idx) => w === expectedOrder[idx]);
    } else {
      isMatch = slots[1] === (rawSentence.verb || verb);
    }

    if (isMatch) {
      setIsValid(true);
      playGermanAudio(slots.join(" "), { type: "sentence", voice: "Charon" });
    } else {
      setIsValid(false);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setSlots(new Array(numBlocks).fill(null));
        setPool([...targetWords].sort(() => Math.random() - 0.5));
        setIsValid(null);
      }, 1200);
    }
  };

  useEffect(() => {
    if (slots.length > 0 && !slots.includes(null)) {
      checkSentence();
    }
  }, [slots]);

  const nextRandomSentence = () => {
    if (!sentencePool || sentencePool.length === 0) return;
    let nextSentence = currentSentence;
    if (sentencePool.length > 1) {
      do {
        nextSentence = sentencePool[Math.floor(Math.random() * sentencePool.length)];
      } while (nextSentence?.id === currentSentence?.id && sentencePool.length > 1);
    } else {
      nextSentence = sentencePool[0];
    }
    setCurrentSentence(nextSentence);
  };

  const getGridColsClass = () => {
    if (numBlocks === 3) return "grid-cols-3";
    if (numBlocks === 4) return "grid-cols-2 sm:grid-cols-4";
    if (numBlocks === 5) return "grid-cols-2 sm:grid-cols-5";
    return "grid-cols-3";
  };

  return (
    <div className={`my-4 p-5 rounded-2xl border transition-all duration-300 flex flex-wrap gap-3 justify-center items-center w-full h-auto ${
      isValid === true 
        ? 'bg-emerald-50 border-emerald-300 shadow-emerald-100/50' 
        : isValid === false 
          ? 'bg-rose-50 border-rose-300 shadow-rose-100/50' 
          : 'bg-slate-50 border-slate-200'
    } max-w-2xl mx-auto ${shake ? 'animate-bounce' : ''}`}>
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4 w-full">
        <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase">
          🔧 Constructor de Oraciones: {numBlocks} Bloques Sintácticos
        </h4>
        <div className="flex items-center gap-2">
          {isValid === null && (
            <button
              type="button"
              onClick={buyHint}
              disabled={hintUsed}
              className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold px-2.5 py-1 rounded-lg text-xs shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
              title="Colocar el primer bloque en la Posición 1 (Pista libre)"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>{hintUsed ? 'Pista Usada' : 'Pista'}</span>
            </button>
          )}
          {isValid === true && (
            <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 size={16} /> ¡Excelente! Sintaxis correcta
            </span>
          )}
          {isValid === false && (
            <span className="text-rose-600 font-bold text-xs flex items-center gap-1">
              <AlertCircle size={16} /> ¡Orden incorrecto! Inténtalo de nuevo
            </span>
          )}
        </div>
      </div>

      {/* Cajas receptoras */}
      <div className={`grid ${getGridColsClass()} gap-2.5 mb-6 w-full`}>
        {slots.map((word, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div 
              onClick={() => word && removeWord(idx)}
              className={`w-full min-h-[4rem] h-auto px-2 py-2 rounded-xl border-2 flex items-center justify-center font-bold text-xs sm:text-base cursor-pointer transition-all max-w-full break-words whitespace-normal text-center overflow-hidden ${
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
            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase text-center">
              {idx === 1 && numBlocks <= 4 ? '👑 Posición 2' : `Bloque ${idx + 1}`}
            </span>
          </div>
        ))}
      </div>

      {/* Pool de palabras */}
      <div className="flex flex-wrap gap-2.5 justify-center w-full min-h-[44px]">
        {pool.map((word, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => selectWord(word)}
            disabled={isValid !== null}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold rounded-xl border-2 border-slate-200 shadow-sm transition-transform hover:scale-105 active:scale-95 text-xs sm:text-base max-w-full break-words whitespace-normal text-center overflow-hidden cursor-pointer"
          >
            {word}
          </button>
        ))}
      </div>

      {isValid === true && (
        <div className="mt-4 p-3.5 bg-emerald-100/50 border border-emerald-200 rounded-xl text-center font-bold text-base sm:text-lg text-emerald-950 flex items-center justify-center gap-2 w-full">
          <span>{slots.join(" ")}</span>
          <button 
            type="button"
            onClick={() => {
              playGermanAudio(slots.join(" "), { type: "sentence", voice: "Charon" });
            }} 
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-200/50 transition-colors cursor-pointer" 
            title="Escuchar"
          >
            <Volume2 size={18} />
          </button>
        </div>
      )}

      <p className="text-center text-xs text-slate-500 mt-4 w-full">
        {isValid === true ? (
          <span className="text-emerald-700 font-medium">¡Oración estructurada! Haz clic en una casilla para reiniciar.</span>
        ) : (
          <span>Haz clic en los bloques para ordenarlos respetando las posiciones sintácticas del alemán.</span>
        )}
      </p>

      {isValid === true && sentencePool && sentencePool.length > 0 && (
        <div className="mt-4 flex justify-center w-full">
          <button 
            type="button"
            onClick={nextRandomSentence}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition shadow hover:scale-105 cursor-pointer"
          >
            Siguiente Ejercicio 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableSentenceBuilder;