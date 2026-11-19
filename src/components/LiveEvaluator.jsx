import { useState, useEffect } from 'react';
import { CheckCircle2, RotateCcw, Volume2, HelpCircle } from 'lucide-react';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { scrollInputIntoView } from '../utils/helpers';

const STRONG_DEFAULT_EXERCISES = [
  { text: "Ich mag alt___ Käse.", answer: "en", translation: "Me gusta el queso viejo (der Käse, Acusativo)", hint: "der Käse en Acusativo → declinación fuerte -en" },
  { text: "Gut___ Brot ist teuer.", answer: "es", translation: "El buen pan es caro (das Brot, Nominativo)", hint: "das Brot sin artículo → marca -es de Neutro" },
  { text: "Sie hilft mir mit groß___ Freude.", answer: "er", translation: "Ella me ayuda con gran alegría (die Freude, Dativo)", hint: "mit + Dativ femenino → terminación -er" }
];

const ADJECTIVE_DECLENSION_EXERCISES = [
  { text: "Ich trage heute den neu___ Mantel.", answer: "en", translation: "Hoy llevo el abrigo nuevo (débil, Akk. masc.)", hint: "Con «den» ya marcado en Akkusativ → terminación débil -en" },
  { text: "Ein alt___ Freund ruft mich an.", answer: "er", translation: "Un viejo amigo me llama por teléfono (mixta, Nom. masc.)", hint: "«ein» no marca género masculino → adjetivo hereda -er" },
  { text: "Sie wohnt in einer ruhig___ Straße.", answer: "en", translation: "Ella vive en una calle tranquila (mixta, Dat. fem.)", hint: "«in einer» exige Dativ → en Dativo débil/mixto va siempre -en" },
  { text: "Das klein___ Kabel passt in den Schrank.", answer: "e", translation: "El cable pequeño cabe en el armario (débil, Nom. neutro)", hint: "Con «das» en Nominativo singular → solo añade -e" }
];

const ensureTerminalPunctuation = (sentence = '') => {
  const s = String(sentence || '').trim();
  return /[.!?]$/.test(s) ? s : `${s}.`;
};

const LiveEvaluator = ({ mode = "strong", exercises = [], successMessage, onComplete }) => {
  const isWeakMixedMode = mode === "adjective_declension" || mode === "weak" || mode === "mixed";
  const list = exercises.length > 0
    ? exercises
    : isWeakMixedMode
      ? ADJECTIVE_DECLENSION_EXERCISES
      : STRONG_DEFAULT_EXERCISES;

  const datasetSignature = `${mode}::${list.map((e) => e.text).join('|')}`;
  const [prevSignature, setPrevSignature] = useState(datasetSignature);
  const [inputs, setInputs] = useState(() => Array(list.length).fill(""));
  const [completed, setCompleted] = useState(() => Array(list.length).fill(false));
  const [revealedHints, setRevealedHints] = useState(() => Array(list.length).fill(false));

  if (prevSignature !== datasetSignature) {
    setPrevSignature(datasetSignature);
    setInputs(Array(list.length).fill(""));
    setCompleted(Array(list.length).fill(false));
    setRevealedHints(Array(list.length).fill(false));
  }

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const handleChange = (val, idx) => {
    const newInputs = [...inputs];
    newInputs[idx] = val;
    setInputs(newInputs);

    const isCorrect = val.toLowerCase().trim() === list[idx].answer.toLowerCase().trim();
    const newCompleted = [...completed];
    newCompleted[idx] = isCorrect;
    setCompleted(newCompleted);

    if (isCorrect) {
      const sentenceText = ensureTerminalPunctuation(list[idx].text.replace("___", val.trim()));
      playGermanAudio(sentenceText, { type: "sentence", voice: "Charon" });
      if (newCompleted.every(Boolean)) {
        onComplete?.();
      }
    }
  };

  const resetAll = () => {
    stopCurrentAudio();
    setInputs(Array(list.length).fill(""));
    setCompleted(Array(list.length).fill(false));
    setRevealedHints(Array(list.length).fill(false));
  };

  const toggleHint = (idx) => {
    setRevealedHints((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const correctCount = completed.filter(Boolean).length;
  const resolvedSuccessBanner = successMessage
    || (isWeakMixedMode
      ? "¡Excelente! Has dominado las terminaciones de Declinación Débil y Mixta."
      : "¡Excelente! Has dominado todas las terminaciones de esta serie.");

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto my-6 text-left">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          📝 {isWeakMixedMode ? 'Declinación Débil y Mixta' : 'Autoevaluación en Vivo'}
        </span>
        <span className="text-xs font-bold text-slate-600 bg-slate-200/70 px-2.5 py-0.5 rounded-full">
          Completado: {correctCount} de {list.length}
        </span>
      </div>

      <div className="space-y-4">
        {list.map((ex, idx) => {
          const parts = ex.text.split("___");
          const isCorrect = completed[idx];
          const val = inputs[idx] || "";
          const hasTypedMax = val.length >= ex.answer.length;
          const fullSentence = ensureTerminalPunctuation(ex.text.replace("___", ex.answer));
          const chWidth = Math.max(4, ex.answer.length + 2);

          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-4 transition shadow-xs space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed flex flex-wrap items-center gap-y-2" lang="de">
                  <span>{parts[0]}</span>
                  <input
                    type="text"
                    aria-label={`Terminación para frase ${idx + 1}: ${ex.translation}`}
                    value={val}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onFocus={scrollInputIntoView}
                    maxLength={ex.answer.length + 2}
                    style={{ width: `${chWidth}ch` }}
                    className={`text-center font-black border-2 rounded-lg py-1 px-1.5 focus:outline-none transition-all mx-0.5 ${
                      isCorrect 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs' 
                        : hasTypedMax && val.trim() !== ""
                          ? 'bg-rose-50 border-rose-500 text-rose-800' 
                          : 'bg-slate-50 border-slate-300 focus:border-indigo-500'
                    }`}
                    placeholder="?"
                  />
                  <span>{parts[1]}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {ex.hint && (
                    <button
                      type="button"
                      onClick={() => toggleHint(idx)}
                      aria-label={`Ver pista ejercicio ${idx + 1}`}
                      aria-expanded={Boolean(revealedHints[idx])}
                      className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-200 cursor-pointer"
                    >
                      <HelpCircle size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => playGermanAudio(fullSentence, { type: "sentence", voice: "Charon" })}
                    aria-label={`Escuchar frase ${idx + 1}`}
                    className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 cursor-pointer"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>

              {revealedHints[idx] && ex.hint && (
                <p className="text-xs font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                  💡 {ex.hint}
                </p>
              )}

              <div className="flex justify-between items-center text-xs text-slate-500">
                <span className="italic">({ex.translation})</span>
                {isCorrect && (
                  <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 size={14} /> ¡Correcto!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {correctCount === list.length && (
        <div aria-live="polite" className="mt-6 bg-emerald-100 border border-emerald-200 text-emerald-900 p-4 rounded-xl text-sm font-semibold text-center animate-in fade-in zoom-in-95">
          🎉 {resolvedSuccessBanner}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={resetAll}
          className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-xs cursor-pointer"
        >
          <RotateCcw size={16} /> Reiniciar Todo
        </button>
      </div>
    </div>
  );
};

export default LiveEvaluator;
