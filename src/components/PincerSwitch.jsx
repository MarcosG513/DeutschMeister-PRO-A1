import { useState, useEffect } from 'react';
import { Scissors, Lock, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, Volume2 } from 'lucide-react';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';

const DEFAULT_SEPARABLE = [
  { isModal: false, isSeparable: true, subject: "Ich", verbRaiz: "stehe", prefix: "auf", complement: "um 7 Uhr", verbOriginal: "aufstehen", translation: "Yo me levanto a las 7" },
  { isModal: false, isSeparable: true, subject: "Er", verbRaiz: "kauft", prefix: "ein", complement: "im Supermarkt", verbOriginal: "einkaufen", translation: "Él compra en el supermercado" },
  { isModal: false, isSeparable: true, subject: "Wir", verbRaiz: "sehen", prefix: "fern", complement: "am Abend", verbOriginal: "fernsehen", translation: "Nosotros vemos TV por la noche" }
];

const DEFAULT_MODAL = [
  { isModal: true, isSeparable: false, subject: "Ich", verbRaiz: "muss", prefix: "arbeiten", complement: "heute", verbOriginal: "müssen + arbeiten", translation: "Yo tengo que trabajar hoy" },
  { isModal: true, isSeparable: false, subject: "Wir", verbRaiz: "können", prefix: "sprechen", complement: "gut Deutsch", verbOriginal: "können + sprechen", translation: "Nosotros podemos hablar bien alemán" },
  { isModal: true, isSeparable: false, subject: "Du", verbRaiz: "sollst", prefix: "bleiben", complement: "im Bett", verbOriginal: "sollen + bleiben", translation: "Tú debes quedarte en cama" }
];

const DEFAULT_SEPARABLE_VS_INSEPARABLE = [
  { isSeparable: false, subject: "Ich", verbRaiz: "bezahle", fullVerbPos2: "bezahle", prefix: "be", complement: "die Rechnung heute", verbOriginal: "bezahlen (be- fijo)", translation: "Yo pago la factura hoy", explanation: "El prefijo «be-» es INSEPARABLE: nunca se corta ni viaja al final." },
  { isSeparable: true, subject: "Er", verbRaiz: "macht", fullVerbPos2: "macht", prefix: "auf", complement: "das Fenster", verbOriginal: "aufmachen (auf- separable)", translation: "Él abre la ventana", explanation: "El prefijo «auf-» lleva acento tónico y es SEPARABLE: salta al final." },
  { isSeparable: false, subject: "Wir", verbRaiz: "verstehen", fullVerbPos2: "verstehen", prefix: "ver", complement: "die Aufgabe gut", verbOriginal: "verstehen (ver- fijo)", translation: "Nosotros entendemos bien la tarea", explanation: "«ver-» es prefijo átono INSEPARABLE: «verstehen» permanece unido en Posición 2." },
  { isSeparable: true, subject: "Sie", verbRaiz: "ruft", fullVerbPos2: "ruft", prefix: "an", complement: "den Kunden im Büro", verbOriginal: "anrufen (an- separable)", translation: "Ella llama al cliente en la oficina", explanation: "«an-» es SEPARABLE: «ruft» queda en Posición 2 y «an» cierra la frase." },
  { isSeparable: false, subject: "Der Techniker", verbRaiz: "erklärt", fullVerbPos2: "erklärt", prefix: "er", complement: "den Zählerschrank", verbOriginal: "erklären (er- fijo)", translation: "El técnico explica el cuadro eléctrico", explanation: "«er-» jamás se separa del verbo raíz." },
  { isSeparable: true, subject: "Du", verbRaiz: "kaufst", fullVerbPos2: "kaufst", prefix: "ein", complement: "am Samstag", verbOriginal: "einkaufen (ein- separable)", translation: "Tú haces la compra el sábado", explanation: "«ein-» se separa al final: «Du kaufst am Samstag ein»." }
];

const DEFAULT_PERFEKT_PARTIZIP = [
  { isSeparable: true, subject: "Ich", verbRaiz: "habe", prefix: "abgeholt", complement: "das Paket", verbOriginal: "abholen → abgeholt", translation: "Yo recogí el paquete", explanation: "Separable (ab|holen): el prefijo se abre para meter -ge- en medio → abgeholt." },
  { isSeparable: false, subject: "Er", verbRaiz: "hat", prefix: "verstanden", complement: "die Frage", verbOriginal: "verstehen → verstanden", translation: "Él entendió la pregunta", explanation: "Inseparable (ver-): NUNCA lleva -ge- → verstanden." },
  { isSeparable: true, subject: "Wir", verbRaiz: "haben", prefix: "eingebaut", complement: "den Speicher im Keller", verbOriginal: "einbauen → eingebaut", translation: "Instalamos la batería en el sótano", explanation: "Separable (ein|bauen): -ge- entre prefijo y raíz → eingebaut." },
  { isSeparable: false, subject: "Sie", verbRaiz: "hat", prefix: "bestellt", complement: "das Kabel", verbOriginal: "bestellen → bestellt", translation: "Ella pidió el cable", explanation: "Inseparable (be-): bloqueado el -ge- → bestellt." }
];

const PincerSwitch = ({ exercises = [], mode = "separable", isModal = false }) => {
  const isContrastMode = mode === "separable_vs_inseparable";
  const isPartizipMode = mode === "perfekt_partizip";

  const list = exercises.length > 0
    ? exercises
    : isPartizipMode
      ? DEFAULT_PERFEKT_PARTIZIP
      : isContrastMode
        ? DEFAULT_SEPARABLE_VS_INSEPARABLE
        : (isModal ? DEFAULT_MODAL : DEFAULT_SEPARABLE);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [choiceFeedback, setChoiceFeedback] = useState(null); // { isCorrect, msg }

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const current = list[currentIndex % list.length] || list[0];
  const isModalActive = Boolean(current.isModal || isModal);
  const isSeparableItem = current.isSeparable !== undefined ? Boolean(current.isSeparable) : !isModalActive;

  const currentAudioSentence = isContrastMode && !isSeparableItem
    ? `${current.subject} ${current.verbRaiz} ${current.complement}`
    : `${current.subject} ${current.verbRaiz} ${current.complement} ${current.prefix}`;

  const triggerPincer = () => {
    setIsActive(true);
    playGermanAudio(currentAudioSentence, {
      type: "sentence",
      voice: "Charon"
    });
  };

  const handleContrastGuess = (userSaysSeparable) => {
    const isCorrect = userSaysSeparable === isSeparableItem;
    setIsActive(true);
    setChoiceFeedback({
      isCorrect,
      msg: isCorrect
        ? `¡Exacto! ${current.explanation || ''}`
        : `¡Cuidado! ${current.explanation || ''}`
    });
    playGermanAudio(currentAudioSentence, {
      type: "sentence",
      voice: "Charon"
    });
  };

  const resetPincer = () => {
    stopCurrentAudio();
    setIsActive(false);
    setChoiceFeedback(null);
  };

  const nextExercise = () => {
    stopCurrentAudio();
    setIsActive(false);
    setChoiceFeedback(null);
    setCurrentIndex((currentIndex + 1) % list.length);
  };

  const headerTitle = isPartizipMode
    ? 'Participio Perfekt B1 (-ge- vs sin -ge-)'
    : isContrastMode
      ? 'Interruptor Dual: Prefijo Separable vs Fijo (be-/ver-/er-)'
      : isModalActive
        ? 'El Sándwich Verbal (Verbo Modal + Infinitivo)'
        : 'El Interruptor de Pinza (Verbo Separable)';

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto my-6 text-left">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          🗜️ {headerTitle}
        </span>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
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
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-1 sm:p-2.5 rounded-lg flex flex-col justify-center items-center break-words whitespace-normal text-[10px] sm:text-xs md:text-sm leading-tight max-w-full text-center overflow-hidden w-full">
            {current.subject}
          </div>

          <div className="relative min-h-[48px] md:min-h-[64px] h-auto py-2 flex items-center justify-center w-full">
            {/* Estado previo sin activar */}
            <div 
              className="absolute inset-0 bg-rose-50 border-2 border-rose-200 text-rose-800 rounded-lg p-1 flex flex-col justify-center items-center transition-all duration-500 max-w-full break-words whitespace-normal text-center overflow-hidden"
              style={{
                opacity: isActive ? 0 : 1,
                transform: isActive ? 'scale(0.8) translateY(-20px)' : 'scale(1) translateY(0)',
                pointerEvents: isActive ? 'none' : 'auto'
              }}
            >
              <span className="font-extrabold text-[10px] sm:text-xs md:text-sm text-rose-700 break-words whitespace-normal leading-tight text-center">
                {isPartizipMode || isModalActive ? (
                  <>{current.verbRaiz} / {current.prefix}</>
                ) : isContrastMode ? (
                  <>{current.verbOriginal.split(' ')[0]}</>
                ) : (
                  <><span className="underline">{current.prefix}</span>{current.verbRaiz}</>
                )}
              </span>
              <span className="text-[8px] font-medium text-rose-500">
                {isContrastMode || isPartizipMode ? '¿Se rompe?' : 'Incorrecto'}
              </span>
            </div>

            {/* Verbo / Auxiliar en Posición 2 */}
            <div 
              className="absolute inset-0 bg-indigo-600 border border-indigo-600 text-white rounded-lg p-1 flex flex-col justify-center items-center transition-all duration-500 shadow-sm max-w-full break-words whitespace-normal text-center overflow-hidden"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <span className="font-black text-[10px] sm:text-xs md:text-sm break-words whitespace-normal leading-tight text-center">{current.verbRaiz}</span>
              <span className="text-[8px] font-medium text-indigo-200">Posición 2</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 text-slate-700 p-1 sm:p-2.5 rounded-lg flex flex-col justify-center items-center break-words whitespace-normal text-[10px] sm:text-xs md:text-sm leading-tight max-w-full text-center overflow-hidden w-full">
            {current.complement}
          </div>

          <div className="relative min-h-[48px] md:min-h-[64px] h-auto py-2 flex items-center justify-center w-full">
            <div 
              className="absolute inset-0 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-[10px] text-slate-300 transition-all duration-500 text-center"
              style={{ opacity: isActive ? 0 : 1 }}
            >
              Vacío
            </div>

            {/* Prefijo / Participio / Estado Inseparable */}
            <div 
              className={`absolute inset-0 rounded-lg p-1 flex flex-col justify-center items-center transition-all duration-500 shadow-sm max-w-full break-words whitespace-normal text-center overflow-hidden ${
                isContrastMode && !isSeparableItem
                  ? 'bg-slate-100 border border-slate-300 text-slate-500'
                  : 'bg-emerald-600 border border-emerald-600 text-white'
              }`}
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0) scale(1)' : 'translateX(-100px) scale(0.6)',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <span className="font-black text-[10px] sm:text-xs md:text-sm break-words whitespace-normal leading-tight text-center">
                {isContrastMode && !isSeparableItem ? '— (Fijo en P2)' : current.prefix}
              </span>
              <span className={`text-[8px] font-medium ${isContrastMode && !isSeparableItem ? 'text-slate-500' : 'text-emerald-100'}`}>
                {isPartizipMode ? 'Partizip II' : isModalActive ? 'Infinitivo' : isContrastMode && !isSeparableItem ? 'Inseparable' : 'Prefijo'}
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-2 italic">({current.translation})</p>
      </div>

      {/* Alerta / Explicación */}
      {isActive && (
        <div aria-live="polite" className={`border p-3 rounded-xl flex items-start gap-2 mb-5 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 ${
          choiceFeedback && !choiceFeedback.isCorrect
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-emerald-100 border-emerald-200 text-emerald-900'
        }`}>
          {choiceFeedback && !choiceFeedback.isCorrect ? (
            <AlertTriangle size={18} className="shrink-0 text-rose-600 mt-0.5" />
          ) : (
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" />
          )}
          <div className="flex-1 space-y-1">
            <p className="font-bold" lang="de">{currentAudioSentence}.</p>
            <span>
              {choiceFeedback ? choiceFeedback.msg : isModalActive ? (
                <>¡Sándwich Verbal Activado! El verbo modal conjugado <strong>"{current.verbRaiz}"</strong> va en Posición 2 y envía el infinitivo <strong>"{current.prefix}"</strong> al final.</>
              ) : (
                <>¡Efecto Pinza Activado! El prefijo <strong>"{current.prefix}"</strong> viaja al final absoluto de la oración.</>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => playGermanAudio(currentAudioSentence, { type: "sentence", voice: "Charon" })}
            aria-label="Escuchar oración de ejemplo"
            className="p-1.5 rounded-lg bg-white/80 hover:bg-white border border-slate-200 text-slate-700 shrink-0 cursor-pointer"
          >
            <Volume2 size={15} />
          </button>
        </div>
      )}

      {/* Controles */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        {!isActive ? (
          isContrastMode || isPartizipMode ? (
            <>
              <button
                type="button"
                onClick={() => handleContrastGuess(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm cursor-pointer"
              >
                <Scissors size={16} />
                {isPartizipMode ? 'Separable (-ge- en medio)' : 'Sí se separa (Prefijo al final)'}
              </button>
              <button
                type="button"
                onClick={() => handleContrastGuess(false)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm cursor-pointer"
              >
                <Lock size={16} />
                {isPartizipMode ? 'Inseparable (Sin -ge-)' : 'No se separa (be-/ver-/er-)'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={triggerPincer}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm hover:scale-105 cursor-pointer"
            >
              <Scissors size={18} /> {isModalActive ? 'Activar Sándwich Verbal' : 'Activar Efecto Pinza'}
            </button>
          )
        ) : (
          <>
            <button
              type="button"
              onClick={resetPincer}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
            >
              <RotateCcw size={18} /> Reiniciar
            </button>
            <button
              type="button"
              onClick={nextExercise}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm hover:scale-105 cursor-pointer"
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
