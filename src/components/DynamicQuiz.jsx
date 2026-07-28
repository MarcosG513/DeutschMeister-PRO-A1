import React, { useState, useEffect } from 'react';
import { Gamepad2, CheckCircle2, XCircle, Flame, Trophy, Sparkles, ArrowRight, Loader2, X } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../App';
import { spendCoins } from '../utils/helpers';

const SUGGESTED_TOPICS = [
  "Declinación (Der/Die/Das)",
  "Verbos Separables",
  "Preposiciones",
  "Comida y Restaurante",
  "Viajes y Transporte",
  "Rutina Diaria",
  "Familia y Amigos",
  "Cuerpo y Salud",
  "Trabajo y Escuela",
  "Tiempo y Clima"
];

const DynamicQuiz = ({ onExit }) => {
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("🧠 Iniciando enlace neuronal con el Goethe-Institut...");
  const [quizData, setQuizData] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(() => {
    return parseInt(localStorage.getItem('dm_quiz_streak') || '0', 10);
  });
  const [bestStreak, setBestStreak] = useState(() => {
    return parseInt(localStorage.getItem('dm_quiz_best_streak') || '0', 10);
  });

  useEffect(() => {
    localStorage.setItem('dm_quiz_streak', currentStreak.toString());
    if (currentStreak > bestStreak) {
      setBestStreak(currentStreak);
      localStorage.setItem('dm_quiz_best_streak', currentStreak.toString());
    }
  }, [currentStreak, bestStreak]);

  // Rotador automático de frases del loader (Cargador Hipnótico)
  useEffect(() => {
    if (!loading) return;
    const messages = [
      "🧠 Iniciando enlace neuronal con el Goethe-Institut...",
      "📚 Escaneando los archivos de gramática A1...",
      "⚙️ Forjando oraciones y trampas sintácticas...",
      "🔍 Ocultando las pistas en el texto alemán...",
      "📝 Redactando retroalimentación socrática...",
      "⚖️ Calibrando la dificultad del examen...",
      "🎨 Pintando botones de esmeralda y ámbar...",
      "🚀 Acelerando motores de inferencia IA...",
      "🇩🇪 Verificando la ortografía de los Umlaute...",
      "🛡️ Blindando la estructura del JSON...",
      "🔥 Preparando el motor de rachas...",
      "✨ Imprimiendo tu examen personalizado..."
    ];
    let idx = 0;
    setLoadingMessage(messages[0]);
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setLoadingMessage(messages[idx]);
    }, 2200);
    return () => clearInterval(interval);
  }, [loading]);

  const generateQuiz = async (selectedTema = tema) => {
    const queryTema = selectedTema.trim();
    if (!queryTema) return;
    setLoading(true);
    setError(null);
    setQuizData(null);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);

    try {
      if (!functions) throw new Error("Firebase functions not initialized");
      const generateQuizFn = httpsCallable(functions, 'generateDynamicQuiz');
      const response = await generateQuizFn({ tema: queryTema }).catch(err => {
        console.warn("Petición de quiz abortada/fallida al cambiar de vista:", err);
        throw err;
      });

      if (response.data && response.data.preguntas && response.data.preguntas.length > 0) {
        setQuizData(response.data);
      } else {
        throw new Error("No se recibieron preguntas válidas de la IA.");
      }
    } catch (err) {
      console.error("Error al generar quiz:", err);
      setError("No pudimos generar el quiz. Por favor, intenta de nuevo o escribe otro tema.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (opcion) => {
    if (selectedOption !== null) return;
    const preguntaActual = quizData.preguntas[currentIdx];
    const correct = opcion === preguntaActual.respuesta_correcta;

    setSelectedOption(opcion);
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
    } else {
      setCurrentStreak(0);
    }
  };

  const buyHint = async () => {
    if (!quizData?.preguntas?.[currentIdx] || selectedOption !== null) return;
    const preguntaActual = quizData.preguntas[currentIdx];
    const incorrects = preguntaActual.opciones.filter(
      opt => opt !== preguntaActual.respuesta_correcta && !eliminatedOptions.includes(opt)
    );
    if (incorrects.length === 0) return;

    const success = await spendCoins(10);
    if (success) {
      const toEliminate = incorrects.slice(0, 2);
      setEliminatedOptions(prev => [...prev, ...toEliminate]);
    } else {
      alert("¡Monedas insuficientes! Necesitas al menos 🪙 10 para comprar una pista 50/50.");
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setEliminatedOptions([]);
    setCurrentIdx(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-[100svh] w-full bg-slate-50 overflow-y-auto animate-in fade-in duration-300 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Cabecera del Simulador */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Gamepad2 className="text-blue-600" /> Simulador de Quiz Generativo
            </h2>
            <p className="text-slate-500 text-sm mt-1">Quizzes dinámicos generados por IA a tu medida (A1 Goethe).</p>
          </div>

          <button
            onClick={onExit}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition font-bold shadow-sm self-start sm:self-auto"
            title="Volver a los módulos"
          >
            <X size={18} /> Salir del Quiz
          </button>
        </div>

        {/* Marcador de Rachas */}
        <div className="flex justify-center items-center gap-6 mb-8 w-full">
          <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold shadow-sm">
            <Flame size={20} className={currentStreak > 0 ? "animate-pulse text-orange-500" : ""} /> Racha Actual: {currentStreak}
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold shadow-sm">
            <Trophy size={20} /> Mejor Racha: {bestStreak}
          </div>
        </div>

        {/* VISTA 1: CONFIGURAR Y PEDIR EL TEMA */}
        {!loading && !quizData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-6">
              <Sparkles size={36} className="animate-spin animate-duration-[3000ms]" />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">¿Qué te gustaría repasar hoy?</h3>
            <p className="text-slate-500 text-sm mb-6 text-center max-w-md">Escribe cualquier tema gramatical o área de vocabulario del nivel A1. Nuestra IA creará una evaluación exclusiva para ti.</p>

            {/* Input de búsqueda */}
            <div className="w-full max-w-lg flex flex-col sm:flex-row gap-2 mb-8">
              <input
                type="text"
                placeholder="Ej. Dativo, Acusativo, Números, La Familia..."
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') generateQuiz(); }}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-slate-700 shadow-sm"
              />
              <button
                onClick={() => generateQuiz()}
                disabled={!tema.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition shadow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Generar Quiz
              </button>
            </div>

            {/* Sugerencias Rápidas */}
            <div className="w-full max-w-lg text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Sugerencias rápidas</span>
              <div className="overflow-x-auto whitespace-nowrap flex gap-2 pb-2 custom-scrollbar">
                {SUGGESTED_TOPICS.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTema(topic);
                      generateQuiz(topic);
                    }}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-3.5 py-2 rounded-lg font-bold border border-slate-200 transition shrink-0"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl w-full max-w-lg text-center flex items-center justify-center gap-2">
                <XCircle size={18} /> {error}
              </div>
            )}
          </div>
        )}

        {/* SKELETON LOADER ANIMADO (Cargador Hipnótico) */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center">
            <div className="relative mb-6">
              <Loader2 className="animate-spin text-blue-500" size={48} />
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">🧠</span>
            </div>
            <div className="text-lg font-bold text-slate-700 animate-pulse text-center mb-4 leading-relaxed">
              {loadingMessage}
            </div>
            <div className="w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden mb-8 shadow-inner">
              <div className="bg-blue-500 h-full rounded-full animate-pulse w-full"></div>
            </div>

            {/* Pregunta ficticia */}
            <div className="w-full max-w-lg h-24 bg-slate-50 rounded-xl mb-6 border border-slate-200 border-dashed animate-pulse"></div>

            {/* Opciones ficticias */}
            <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
              <div className="h-14 bg-slate-100 rounded-xl"></div>
              <div className="h-14 bg-slate-100 rounded-xl"></div>
              <div className="h-14 bg-slate-100 rounded-xl"></div>
              <div className="h-14 bg-slate-100 rounded-xl"></div>
            </div>
          </div>
        )}

        {/* VISTA 2: QUIZ ACTIVO */}
        {!loading && quizData && currentIdx < quizData.preguntas.length && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center">
            {/* Cabecera de la pregunta */}
            <div className="w-full flex flex-wrap justify-between items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg text-sm">
                Tema: {quizData.titulo_quiz || tema}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={buyHint}
                  disabled={selectedOption !== null}
                  className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Comprar Pista (🪙 10)</span>
                </button>
                <span className="text-slate-500 text-sm font-bold">
                  Pregunta {currentIdx + 1} de {quizData.preguntas.length}
                </span>
              </div>
            </div>

            {/* Pregunta principal */}
            <div className="w-full max-w-xl flex flex-col items-center justify-center font-black text-slate-800 mb-8 bg-slate-50 border-2 border-slate-100 py-10 px-4 rounded-xl shadow-inner text-center">
              <span className="text-2xl md:text-3xl leading-relaxed">
                {quizData.preguntas[currentIdx].pregunta}
              </span>
            </div>

            {/* Listado de Opciones */}
            <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizData.preguntas[currentIdx].opciones.map((opt, i) => {
                const preguntaActual = quizData.preguntas[currentIdx];
                const isCorrectAnswer = opt === preguntaActual.respuesta_correcta;
                const isSelected = opt === selectedOption;
                const isEliminated = eliminatedOptions.includes(opt);

                let btnClass = "bg-white border-2 border-slate-200 text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50/20 cursor-pointer";

                if (isEliminated) {
                  btnClass = "bg-slate-100 border-slate-200 text-slate-300 line-through opacity-40 cursor-not-allowed";
                } else if (selectedOption !== null) {
                  if (isCorrectAnswer) {
                    btnClass = "bg-emerald-500 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20";
                  } else if (isSelected) {
                    btnClass = "bg-rose-500 border-rose-500 text-white font-bold shadow-md shadow-rose-500/20";
                  } else {
                    btnClass = "bg-slate-50 border-slate-100 text-slate-400 opacity-50 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => !isEliminated && handleOptionClick(opt)}
                    disabled={selectedOption !== null || isEliminated}
                    className={`py-4 px-6 rounded-xl text-lg transition-all text-center leading-normal ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* INYECCIÓN DE LA EXPLICACIÓN DIDÁCTICA (Caja de Alerta) */}
            {selectedOption !== null && (() => {
              const preguntaActual = quizData.preguntas[currentIdx];
              const explicacionText = preguntaActual.explicacion_didactica || preguntaActual.explicacion_socratica;
              return (
                <div
                  className={`w-full max-w-xl flex flex-col gap-2 p-4 sm:p-5 rounded-xl border mt-6 animate-in fade-in zoom-in-95 transition-all duration-300 ${
                    isCorrect 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <div className="font-bold flex items-center gap-2 text-lg">
                    {isCorrect ? '✅ ¡Correcto!' : '❌ Falsch (Incorrecto)'}
                  </div>
                  {explicacionText && (
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                      {explicacionText}
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Botón Siguiente Pregunta / Finalizar Quiz (Renderizado ÚNICAMENTE si se ha seleccionado respuesta) */}
            {selectedOption !== null && (
              <div className="w-full max-w-xl mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-8 py-3 rounded-xl transition shadow flex items-center gap-2 cursor-pointer"
                >
                  {currentIdx === quizData.preguntas.length - 1 ? "Finalizar Quiz" : "Siguiente Pregunta"}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* BOLETÍN DE RESULTADOS FINAL */}
        {!loading && quizData && currentIdx >= quizData.preguntas.length && (() => {
          const percentage = Math.round((score / quizData.preguntas.length) * 100);
          const getFeedback = () => {
            if (percentage >= 90) return { grade: "Sehr Gut (Sobresaliente)", color: "text-emerald-600 border-emerald-200", bg: "bg-emerald-50", icon: "🏆", msg: "¡Dominio absoluto! Tienes nivel nativo en este tema." };
            if (percentage >= 70) return { grade: "Gut (Notable)", color: "text-blue-600 border-blue-200", bg: "bg-blue-50", icon: "🎯", msg: "¡Muy bien! Esquivaste casi todas las trampas." };
            if (percentage >= 60) return { grade: "Ausreichend (Suficiente)", color: "text-amber-600 border-amber-200", bg: "bg-amber-50", icon: "⚠️", msg: "Aprobado por los pelos. Te recomiendo leer la teoría de nuevo." };
            return { grade: "Nicht bestanden (Reprobado)", color: "text-rose-600 border-rose-200", bg: "bg-rose-50", icon: "❌", msg: "Caíste en las trampas. ¡No te rindas, repasa y vuelve a intentarlo!" };
          };
          const feedback = getFeedback();
          return (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col items-center animate-in zoom-in-95 duration-300">
              <span className="text-6xl mb-4">{feedback.icon}</span>
              <h3 className="text-2xl font-black text-slate-800 text-center mb-1">Boletín de Resultados</h3>
              <p className="text-slate-500 text-sm mb-6">Tema: {quizData.titulo_quiz || tema}</p>

              <div className={`w-full max-w-md p-6 rounded-2xl border text-center mb-8 ${feedback.bg} ${feedback.color}`}>
                <span className="text-sm font-bold uppercase tracking-wider block mb-1">Calificación</span>
                <span className="text-2xl font-black block mb-3">{feedback.grade}</span>
                <span className="text-5xl font-black block mb-4">{score} / {quizData.preguntas.length}</span>
                <div className="w-full bg-slate-200/50 h-3 rounded-full overflow-hidden mb-4">
                  <div className={`h-full rounded-full ${percentage >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${percentage}%` }}></div>
                </div>
                <p className="text-slate-700 text-sm font-medium leading-relaxed">{feedback.msg}</p>
              </div>

              <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => generateQuiz(tema)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  Reintentar Tema
                </button>
                <button
                  onClick={() => { setQuizData(null); setTema(""); setScore(0); setCurrentIdx(0); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl border border-slate-200 transition"
                >
                  Elegir Nuevo Tema
                </button>
              </div>

              <button
                onClick={onExit}
                className="text-sm font-bold text-slate-400 hover:text-slate-600 transition underline mt-2"
              >
                Salir al Menú Principal
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default React.memo(DynamicQuiz);
