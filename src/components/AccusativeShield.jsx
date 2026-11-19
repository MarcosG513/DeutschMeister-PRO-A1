import { useState, useEffect } from 'react';
import { Shield, ArrowRight, CheckCircle2, AlertTriangle, RotateCcw, Volume2 } from 'lucide-react';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';

const ARTICLE_PREFIX_RE = /^(der|die|das|den|dem|ein|eine|einen|einem|kein|keine|keinen|keinem|mein|meine|meinen|meinem)\s+/i;
const PRONOUN_RE = /^(er|sie|es|ihn|ihm|ihr|ihnen)$/i;

const buildShieldPhrase = (choice, word, raw = {}) => {
  if (raw.displayTemplate) {
    return raw.displayTemplate.replace('___', choice);
  }
  const cleanWord = String(word || '').trim();
  const cleanChoice = String(choice || '').trim();
  if (!cleanWord) return cleanChoice;
  if (PRONOUN_RE.test(cleanChoice)) {
    return cleanChoice;
  }
  if (ARTICLE_PREFIX_RE.test(cleanWord)) {
    return cleanWord.replace(ARTICLE_PREFIX_RE, `${cleanChoice} `);
  }
  return `${cleanChoice} ${cleanWord}`;
};

const stripLeadingArticle = (word = '') => String(word || '').replace(ARTICLE_PREFIX_RE, '').trim();

const AccusativeShield = ({ words = [], mode = "accusative" }) => {
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

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const currentRaw = list[currentIndex] || {};
  const effectiveGender = currentRaw.gender || (currentRaw.type === "Masc" ? "der" : currentRaw.type === "Fem" ? "die" : currentRaw.type === "Neutro" ? "das" : "die");
  const wordText = currentRaw.word || currentRaw.de || "";
  const bareNoun = stripLeadingArticle(wordText);
  const currentWord = { ...currentRaw, gender: effectiveGender, word: wordText, bareNoun };
  const hasBinaryChoice = Boolean(currentRaw.correct && currentRaw.alt);

  const choices = hasBinaryChoice
    ? (currentIndex % 2 === 0 ? [currentRaw.correct, currentRaw.alt] : [currentRaw.alt, currentRaw.correct])
    : [];

  const advanceToNext = () => {
    stopCurrentAudio();
    setShowFeedback(null);
    setFeedbackMsg("");
    setShieldApplied(false);
    if (currentIndex + 1 < list.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleBinaryChoice = (chosen) => {
    if (showFeedback) return;
    const isCorrect = chosen === currentRaw.correct;
    const targetPhrase = currentRaw.audioText && isCorrect
      ? currentRaw.audioText
      : buildShieldPhrase(currentRaw.correct, wordText, currentRaw);
    const chosenPhrase = buildShieldPhrase(chosen, wordText, currentRaw);

    if (isCorrect) {
      playGermanAudio(targetPhrase, { type: "vocab", voice: "Charon" });
      setScore(prev => prev + 1);
      setShowFeedback('correct');
      setFeedbackMsg(`¡Correcto! «${chosenPhrase}» (${currentWord.translation || ''}).`);
    } else {
      setShowFeedback('incorrect');
      setFeedbackMsg(`¡Error! Elegiste «${chosenPhrase}». La opción correcta es «${targetPhrase}» (${currentWord.translation || ''}).`);
    }
  };

  const handleAction = (applyShield) => {
    if (showFeedback) return;

    const isMasculine = currentWord.gender === "der" || currentRaw.type === "Masc";

    if (applyShield) {
      if (isMasculine) {
        setShieldApplied(true);
        const targetPhrase = currentRaw.audioText || `den ${bareNoun}`;
        playGermanAudio(targetPhrase, { type: "vocab", voice: "Charon" });
        setScore(prev => prev + 1);
        setShowFeedback('correct');
        setFeedbackMsg(`¡Correcto! El masculino «der ${bareNoun}» cambia en Acusativo a «den ${bareNoun}» (o «einen ${bareNoun}»). (${currentWord.translation || ''})`);
      } else {
        setShowFeedback('incorrect');
        setFeedbackMsg(`¡Error! El sustantivo es ${currentWord.gender === "die" ? "femenino" : "neutro"} (${currentWord.gender} ${bareNoun}). Solo los masculinos cambian en acusativo.`);
      }
      return;
    }

    if (!isMasculine) {
      const targetPhrase = currentRaw.audioText || `${currentWord.gender} ${bareNoun}`;
      playGermanAudio(targetPhrase, { type: "vocab", voice: "Charon" });
      setScore(prev => prev + 1);
      setShowFeedback('correct');
      setFeedbackMsg(`¡Correcto! «${targetPhrase}» es ${currentWord.gender === "die" ? "femenino" : "neutro"}, por lo que no cambia en acusativo. (${currentWord.translation || ''})`);
    } else {
      setShowFeedback('incorrect');
      setFeedbackMsg(`¡Error! «der ${bareNoun}» es masculino. El acusativo exige cambiar el artículo a «den» (o «einen»).`);
    }
  };

  const resetGame = () => {
    stopCurrentAudio();
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(null);
    setFeedbackMsg("");
    setFinished(false);
    setShieldApplied(false);
  };

  const modeTitle = mode === "dative" 
    ? "🛡️ Matriz del Dativo" 
    : mode === "possessives" 
      ? "🛡️ Escudo de Posesivos" 
      : mode === "pronouns" 
        ? "🛡️ Escudo de Pronombres" 
        : "🛡️ El Escudo del Acusativo";

  if (finished) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm max-w-md mx-auto">
        <h4 className="font-bold text-xl text-slate-800 mb-2">🛡️ Resultados del Escudo</h4>
        <div className="text-4xl font-extrabold text-indigo-600 my-4">{score} / {list.length}</div>
        <p className="text-sm text-slate-600 mb-6">
          {score === list.length 
            ? "¡Excelente! Has dominado el reto gramatical." 
            : "Sigue practicando para perfeccionar las terminaciones y declinaciones."}
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
        <span>{modeTitle}</span>
        <span>Palabra {currentIndex + 1} de {list.length}</span>
      </div>

      {/* Word Box */}
      <div className="my-6 text-center">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 transition-all duration-500 ${
          shieldApplied 
            ? "bg-emerald-600 text-white scale-110 shadow-sm" 
            : currentWord.gender === "der" || currentWord.type === "Masc"
              ? "bg-blue-100 text-blue-800" 
              : currentWord.gender === "die" || currentWord.type === "Fem" || currentWord.type === "Plural"
                ? "bg-rose-100 text-rose-800" 
                : "bg-amber-100 text-amber-800"
        }`}>
          {hasBinaryChoice 
            ? (currentWord.type ? `${currentWord.type} (${currentWord.gender || ''})` : currentWord.gender)
            : (shieldApplied ? "den" : currentWord.gender)}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight max-w-full break-words whitespace-normal text-center overflow-hidden px-2" lang="de">{currentWord.word}</h3>
        {showFeedback && currentWord.translation && (
          <p className="text-sm text-slate-500 mt-1 italic">({currentWord.translation})</p>
        )}
      </div>

      {/* Feedback Alert */}
      {showFeedback && (
        <div aria-live="polite" className={`flex flex-col gap-3 p-3.5 rounded-xl border mb-5 text-xs sm:text-sm font-medium animate-in fade-in zoom-in-95 ${
          showFeedback === 'correct' 
            ? 'bg-emerald-100 border-emerald-200 text-emerald-800' 
            : 'bg-rose-100 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-start gap-2">
            {showFeedback === 'correct' ? <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" /> : <AlertTriangle size={18} className="shrink-0 text-rose-600 mt-0.5" />}
            <span>{feedbackMsg}</span>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => playGermanAudio(currentRaw.audioText || `${currentWord.gender} ${bareNoun}`, { type: "vocab", voice: "Charon" })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-800 text-xs font-bold border border-slate-300 cursor-pointer"
            >
              <Volume2 size={14} /> Escuchar
            </button>
            <button
              type="button"
              onClick={advanceToNext}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer ml-auto"
            >
              <span>{currentIndex + 1 >= list.length ? 'Ver resultado' : 'Siguiente'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {hasBinaryChoice ? (
        <div className="grid grid-cols-2 gap-3">
          {choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleBinaryChoice(choice)}
              disabled={showFeedback !== null}
              className="flex flex-col items-center justify-center p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-base sm:text-lg shadow transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <span>{choice}</span>
              <span className="text-[10px] font-normal opacity-85 mt-0.5">Elegir opción</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleAction(true)}
            disabled={showFeedback !== null}
            className="flex flex-col items-center justify-center p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none max-w-full break-words whitespace-normal text-center overflow-hidden"
          >
            <Shield size={22} className="mb-1" />
            <span className="text-sm">Aplicar Escudo</span>
            <span className="text-[10px] font-medium opacity-80">(Cambiar a -en)</span>
          </button>

          <button
            type="button"
            onClick={() => handleAction(false)}
            disabled={showFeedback !== null}
            className="flex flex-col items-center justify-center p-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold border border-slate-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none max-w-full break-words whitespace-normal text-center overflow-hidden"
          >
            <ArrowRight size={22} className="mb-1" />
            <span className="text-sm">Dejar Pasar</span>
            <span className="text-[10px] font-medium opacity-85">(Sin cambios)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccusativeShield;
