import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Gamepad2, CheckCircle2, XCircle, Flame, Trophy, Sparkles, 
  ArrowRight, Loader2, X, Volume2, Heart, RefreshCw, BookOpen, 
  Layers, Headphones, Zap, RotateCcw, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../App';
import { recordDailyStudyActivity } from '../utils/helpers';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { chapters as defaultChapters } from '../data/chapters';
import { generateLocalQuizQuestions, shuffleArray } from '../utils/quizEngine';

const SUGGESTED_TOPICS = [
  "Declinación (Der/Die/Das)",
  "Verbos Separables",
  "Preposiciones con Acusativo y Dativo",
  "Comida y Restaurante",
  "Viajes y Transporte",
  "Rutina Diaria",
  "Familia y Amigos",
  "Cuerpo y Salud",
  "Trabajo y Escuela",
  "Tiempo y Clima"
];

const DynamicQuiz = ({ 
  onExit, 
  chapters = defaultChapters, 
  activeChapterId = 1, 
  activeChapterTitle = "Kapitel 1" 
}) => {
  const effectiveChapters = useMemo(() => {
    return (chapters && chapters.length > 0) ? chapters : defaultChapters;
  }, [chapters]);

  const allWords = useMemo(() => {
    return effectiveChapters.flatMap(c => c.words || []);
  }, [effectiveChapters]);

  const currentChapterWords = useMemo(() => {
    const chap = effectiveChapters.find(c => c.id === Number(activeChapterId));
    return chap?.words || (effectiveChapters[0]?.words || []);
  }, [effectiveChapters, activeChapterId]);

  // --- ESTADOS DE CONFIGURACIÓN PRE-QUIZ ---
  const [scope, setScope] = useState('chapter'); // 'chapter' | 'all' | 'ai'
  const [lengthOption, setLengthOption] = useState(10); // 10 | 25 | 50 | 'survival'
  const [tema, setTema] = useState("");

  // --- ESTADOS DEL FLUJO DEL JUEGO ---
  const [quizState, setQuizState] = useState('config'); // 'config' | 'loading' | 'playing' | 'results'
  const [loadingMessage, setLoadingMessage] = useState("🧠 Iniciando enlace neuronal con el Goethe-Institut...");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isSurvival, setIsSurvival] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // --- RACHAS LOCALES ---
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

  // Detener audio al desmontar componente
  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  // Rotador automático de frases del loader
  useEffect(() => {
    if (quizState !== 'loading') return;
    const messages = [
      "🧠 Iniciando enlace neuronal con el Goethe-Institut...",
      "📚 Escaneando los archivos de gramática A1...",
      "⚙️ Forjando oraciones y trampas sintácticas...",
      "🔍 Ocultando las pistas en el texto alemán...",
      "📝 Redactando retroalimentación didáctica...",
      "⚖️ Calibrando la dificultad del examen...",
      "🚀 Acelerando motores de inferencia IA...",
      "🇩🇪 Verificando ortografía y Umlaute...",
      "✨ Imprimiendo tu examen personalizado..."
    ];
    let idx = 0;
    setLoadingMessage(messages[0]);
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setLoadingMessage(messages[idx]);
    }, 2200);
    return () => clearInterval(interval);
  }, [quizState]);

  // Pregunta activa actual
  const currentQuestion = quizQuestions[currentIdx] || null;

  // Auto-reproducción para preguntas de tipo "hoeren" (Hören a ciegas)
  useEffect(() => {
    if (quizState === 'playing' && currentQuestion) {
      setSelectedOption(null);
      setIsCorrect(null);
      setEliminatedOptions([]);

      if (currentQuestion.type === 'hoeren' && currentQuestion.audioText) {
        setIsPlayingAudio(true);
        playGermanAudio(currentQuestion.audioText, {
          voice: 'Charon',
          type: currentQuestion.audioType || 'vocab',
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false)
        }).catch(() => setIsPlayingAudio(false));
      }
    }
  }, [currentIdx, quizState]);

  // --- INICIAR QUIZ ---
  const handleStartQuiz = async (customAiTopic = null) => {
    setError(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setEliminatedOptions([]);
    setFailedQuestions([]);
    setCurrentIdx(0);
    setScore(0);

    const isSurvivalMode = lengthOption === 'survival';
    setIsSurvival(isSurvivalMode);
    setLives(isSurvivalMode ? 3 : 0);

    // MODO LOCAL (Capítulo o Todo el Vocabulario) -> 0 ms de latencia
    if (scope === 'chapter' || scope === 'all') {
      const pool = scope === 'chapter' ? currentChapterWords : allWords;
      const questionCount = isSurvivalMode ? 50 : Number(lengthOption);
      const generated = generateLocalQuizQuestions(pool, questionCount, allWords);

      if (!generated || generated.length === 0) {
        setError("No hay suficiente vocabulario en este módulo para generar preguntas.");
        return;
      }

      setQuizQuestions(generated);
      setQuizState('playing');
      return;
    }

    // MODO IA GENERATIVO (Cloud Function)
    const queryTema = (customAiTopic || tema).trim();
    if (!queryTema) {
      setError("Por favor escribe un tema gramatical o selecciona una sugerencia.");
      return;
    }

    setQuizState('loading');
    try {
      if (!functions) throw new Error("Firebase functions not initialized");
      const generateQuizFn = httpsCallable(functions, 'generateDynamicQuiz');
      const response = await generateQuizFn({ tema: queryTema });

      if (response.data && Array.isArray(response.data.preguntas) && response.data.preguntas.length > 0) {
        const mappedAiQuestions = response.data.preguntas.map((p, idx) => ({
          id: `q_ai_${idx}_${Date.now()}`,
          type: 'ai_prompt',
          questionText: p.pregunta,
          subText: `Tema IA: ${response.data.titulo_quiz || queryTema}`,
          targetWord: null,
          correctAnswer: p.respuesta_correcta,
          options: shuffleArray(p.opciones || []),
          explanation: p.explicacion_didactica || p.explicacion_socratica || 'Respuesta alineada al estándar A1.',
          audioText: p.pregunta.replace(/___+/g, p.respuesta_correcta),
          audioType: 'sentence'
        }));

        setQuizQuestions(mappedAiQuestions);
        setQuizState('playing');
      } else {
        throw new Error("No se recibieron preguntas válidas de la IA.");
      }
    } catch (err) {
      console.error("Error al generar quiz con IA:", err);
      setError("No pudimos conectar con el examinador IA. Intenta de nuevo o elige modo local.");
      setQuizState('config');
    }
  };

  // --- REPRODUCIR AUDIO FONÉTICO CON VOZ CHARON ---
  const handlePlayQuestionAudio = (e) => {
    if (e) e.stopPropagation();
    if (!currentQuestion?.audioText) return;

    setIsPlayingAudio(true);
    playGermanAudio(currentQuestion.audioText, {
      voice: 'Charon',
      type: currentQuestion.audioType || 'vocab',
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    }).catch(() => setIsPlayingAudio(false));
  };

  // --- SELECCIONAR RESPUESTA ---
  const handleOptionClick = (opcion) => {
    if (selectedOption !== null || !currentQuestion) return;

    const correct = opcion === currentQuestion.correctAnswer;
    setSelectedOption(opcion);
    setIsCorrect(correct);

    // Registro diario de actividad en calendario (persistencia)
    recordDailyStudyActivity().catch(e => console.warn("Error en recordDailyStudyActivity:", e));

    if (correct) {
      setScore(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
    } else {
      setCurrentStreak(0);
      setFailedQuestions(prev => [...prev, currentQuestion]);

      if (isSurvival) {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          // Fin inmediato de supervivencia tras breve delay didáctico
          setTimeout(() => {
            setQuizState('results');
          }, 1500);
          return;
        }
      }
    }
  };

  // --- PISTA 50/50 CALIBRADA (100% GRATIS) ---
  const handleUse5050Hint = () => {
    if (!currentQuestion || selectedOption !== null || eliminatedOptions.length > 0) return;

    const incorrects = currentQuestion.options.filter(
      opt => opt !== currentQuestion.correctAnswer && !eliminatedOptions.includes(opt)
    );
    if (incorrects.length === 0) return;

    // Regla de calibración exacta:
    // Si hay 4 opciones: eliminar 2 -> quedan 2 (1 correcta + 1 incorrecta).
    // Si hay 3 opciones (Artículos): eliminar 1 -> quedan 2 (1 correcta + 1 incorrecta).
    const countToEliminate = currentQuestion.options.length === 3 ? 1 : 2;
    const shuffledIncorrects = shuffleArray(incorrects);
    const toEliminate = shuffledIncorrects.slice(0, countToEliminate);

    setEliminatedOptions(toEliminate);
  };

  // --- SIGUIENTE PREGUNTA / FINALIZAR ---
  const handleNext = () => {
    stopCurrentAudio();
    setIsPlayingAudio(false);

    if (currentIdx >= quizQuestions.length - 1) {
      setQuizState('results');
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  // --- SMART REVIEW (REPASAR PALABRAS FALLADAS) ---
  const handleStartSmartReview = () => {
    if (failedQuestions.length === 0) return;
    const reviewPool = shuffleArray([...failedQuestions]);
    setQuizQuestions(reviewPool);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setEliminatedOptions([]);
    setScore(0);
    setFailedQuestions([]);
    setIsSurvival(false);
    setQuizState('playing');
  };

  return (
    <div className="flex flex-col min-h-[100svh] w-full bg-slate-50 overflow-y-auto animate-in fade-in duration-300 p-3 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto w-full">

        {/* CABECERA GENERAL */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Gamepad2 size={26} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">
                Simulador de Evaluación A1
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Quizzes pedagógicos de alta precisión • Voz oficial Charon
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCurrentAudio();
              onExit();
            }}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition font-bold text-xs sm:text-sm shadow-sm self-start sm:self-auto cursor-pointer"
            title="Volver"
          >
            <X size={18} /> Salir
          </button>
        </div>

        {/* MARCADOR DE RACHAS Y VIDAS */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-6 w-full">
          {quizState === 'playing' && isSurvival && (
            <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-2 rounded-full font-black text-sm shadow-sm animate-pulse">
              <Heart size={18} className="fill-rose-500 text-rose-500" />
              <span>Vidas:</span>
              <div className="flex gap-1 ml-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={`text-base ${i < lives ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                    ❤️
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm">
            <Flame size={18} className={currentStreak > 0 ? "animate-pulse text-orange-500" : ""} /> 
            <span>Racha Actual: <strong>{currentStreak}</strong></span>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm">
            <Trophy size={18} className="text-amber-500" /> 
            <span>Récord: <strong>{bestStreak}</strong></span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VISTA 1: CONFIGURACIÓN DE SESIÓN (PRE-QUIZ)                              */}
        {/* ========================================================================= */}
        {quizState === 'config' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 shadow-inner">
              <Sparkles size={36} className="animate-spin animate-duration-[4000ms]" />
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2 text-center">
              Personaliza tu Sesión de Estudio
            </h3>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-lg">
              Elige el alcance del vocabulario, la duración del reto o solicita una evaluación gramatical libre a la IA.
            </p>

            {/* SECCIÓN 1: ÁMBITO (SCOPE) */}
            <div className="w-full max-w-xl mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                1. Ámbito de Vocabulario
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setScope('chapter')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    scope === 'chapter'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">📍</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {currentChapterWords.length} palabras
                    </span>
                  </div>
                  <span className="font-bold text-sm">Capítulo Actual</span>
                  <span className="text-[11px] text-slate-500 truncate mt-0.5" title={activeChapterTitle}>
                    {activeChapterTitle.replace(/^(Capítulo|Kapitel)\s+\d+:\s*/i, '')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setScope('all')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    scope === 'all'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">🌍</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {allWords.length} palabras
                    </span>
                  </div>
                  <span className="font-bold text-sm">Banco Global A1</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Todos los capítulos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScope('ai')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    scope === 'ai'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">🤖</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                      Gemini IA
                    </span>
                  </div>
                  <span className="font-bold text-sm">Tema con IA</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Gramática libre</span>
                </button>
              </div>
            </div>

            {/* SECCIÓN 2: TAMAÑO DE LA SESIÓN */}
            <div className="w-full max-w-xl mb-8">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                2. Formato y Longitud
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 10, label: '10 Preguntas', badge: '⚡ Sprint (2 min)' },
                  { id: 25, label: '25 Preguntas', badge: '🎯 Estándar' },
                  { id: 50, label: '50 Preguntas', badge: '🏆 Simulacro' },
                  { id: 'survival', label: 'Supervivencia', badge: '❤️❤️❤️ 3 Vidas' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLengthOption(item.id)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                      lengthOption === item.id
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <span className="font-black text-sm">{item.label}</span>
                    <span className="text-[10px] font-bold mt-1 opacity-80">{item.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SI SE ELIGE MODO IA: ENTRADA DE TEMA Y SUGERENCIAS */}
            {scope === 'ai' && (
              <div className="w-full max-w-xl mb-8 bg-purple-50/40 p-4 rounded-2xl border border-purple-100 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-purple-900 uppercase tracking-wider block mb-2">
                  Escribe el tema para el examinador IA
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Ej. Dativo, Acusativo, Números, La Familia..."
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleStartQuiz(); }}
                    className="flex-1 px-4 py-2.5 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-slate-800 text-sm shadow-sm"
                  />
                </div>
                <div className="overflow-x-auto whitespace-nowrap flex gap-1.5 pb-1 custom-scrollbar">
                  {SUGGESTED_TOPICS.map((topic, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setTema(topic);
                        handleStartQuiz(topic);
                      }}
                      className="text-xs bg-white hover:bg-purple-100 text-purple-900 px-3 py-1.5 rounded-lg font-bold border border-purple-200 transition shrink-0 shadow-2xs"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl w-full max-w-xl text-center flex items-center justify-center gap-2">
                <XCircle size={18} /> {error}
              </div>
            )}

            {/* BOTÓN DE ACCIÓN PRINCIPAL */}
            <button
              onClick={() => handleStartQuiz()}
              disabled={scope === 'ai' && !tema.trim()}
              className="w-full max-w-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-3 text-base sm:text-lg cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              <Zap size={20} className="text-yellow-300" />
              <span>
                {scope === 'ai' ? 'Generar Examen con IA' : 'Comenzar Quiz Inmediato (0 ms)'}
              </span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 2: SKELETON LOADER ANIMADO (CARGADOR HIPNÓTICO IA)                  */}
        {/* ========================================================================= */}
        {quizState === 'loading' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm flex flex-col items-center">
            <div className="relative mb-6">
              <Loader2 className="animate-spin text-indigo-600" size={52} />
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">🧠</span>
            </div>
            <div className="text-lg font-bold text-slate-800 animate-pulse text-center mb-4 leading-relaxed max-w-md">
              {loadingMessage}
            </div>
            <div className="w-full max-w-xs bg-slate-100 h-2 rounded-full overflow-hidden mb-8 shadow-inner">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-full rounded-full animate-pulse w-full"></div>
            </div>

            <div className="w-full max-w-lg h-28 bg-slate-50 rounded-2xl mb-6 border border-slate-200 border-dashed animate-pulse"></div>
            <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 3: QUIZ ACTIVO (PLAYER UNIVERSAL A1)                                */}
        {/* ========================================================================= */}
        {quizState === 'playing' && currentQuestion && (
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 md:p-10 shadow-sm flex flex-col items-center animate-in fade-in duration-200">
            
            {/* CABECERA DE LA PREGUNTA */}
            <div className="w-full flex flex-wrap justify-between items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5">
                  {currentQuestion.type === 'artikel' && '🔵🔴🟢 Reto de Artículos'}
                  {currentQuestion.type === 'hoeren' && '🎧 Hören a Ciegas'}
                  {currentQuestion.type === 'cloze' && '📝 Oración en Contexto'}
                  {currentQuestion.type === 'bimodal_es_de' && '🔄 Producción (ES ➔ DE)'}
                  {currentQuestion.type === 'bimodal_de_es' && '🔄 Reconocimiento (DE ➔ ES)'}
                  {currentQuestion.type === 'ai_prompt' && '🤖 Examinador IA Goethe'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* PISTA 50/50 CALIBRADA */}
                <button
                  type="button"
                  onClick={handleUse5050Hint}
                  disabled={selectedOption !== null || eliminatedOptions.length > 0}
                  className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold px-3 py-1.5 rounded-xl text-xs shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Eliminar distractores incorrectos (Pista libre)"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Pista 50/50</span>
                </button>

                <span className="text-slate-500 text-xs sm:text-sm font-bold">
                  {isSurvival 
                    ? `Pregunta ${currentIdx + 1}` 
                    : `Pregunta ${currentIdx + 1} de ${quizQuestions.length}`}
                </span>
              </div>
            </div>

            {/* TARJETA PRINCIPAL DE LA PREGUNTA */}
            <div className="w-full max-w-xl flex flex-col items-center justify-center font-black text-slate-800 mb-6 bg-slate-50/80 border-2 border-slate-100 py-8 px-6 rounded-2xl shadow-inner text-center relative group">
              
              {/* BOTÓN DE AUDIO FONÉTICO CON VOZ CHARON */}
              {currentQuestion.audioText && (
                <button
                  type="button"
                  onClick={handlePlayQuestionAudio}
                  className={`absolute top-3 right-3 p-2.5 rounded-xl transition-all shadow-sm cursor-pointer ${
                    isPlayingAudio 
                      ? 'bg-blue-600 text-white animate-pulse shadow-blue-500/30' 
                      : 'bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 hover:border-blue-300'
                  }`}
                  title="Escuchar pronunciación (Voz Charon)"
                >
                  <Volume2 size={20} />
                </button>
              )}

              {/* TÍTULO / ORACIÓN DE LA PREGUNTA */}
              <div className="text-2xl sm:text-3xl leading-relaxed text-slate-900 mb-2">
                {currentQuestion.type === 'hoeren' && selectedOption === null ? (
                  <div className="flex flex-col items-center gap-3 py-3">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center animate-pulse">
                      <Headphones size={32} />
                    </div>
                    <span className="text-lg font-bold text-slate-700">
                      ¿Qué palabra estás escuchando?
                    </span>
                  </div>
                ) : (
                  currentQuestion.questionText
                )}
              </div>

              {/* SUBTEXTO / GUÍA PEDAGÓGICA */}
              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md">
                {currentQuestion.subText}
              </p>
            </div>

            {/* LISTADO DE OPCIONES INTERACTIVAS */}
            <div className={`w-full max-w-xl ${
              currentQuestion.type === 'artikel' 
                ? 'grid grid-cols-3 gap-3' 
                : 'grid grid-cols-1 sm:grid-cols-2 gap-3.5'
            }`}>
              {currentQuestion.options.map((opt, i) => {
                const isCorrectAnswer = opt === currentQuestion.correctAnswer;
                const isSelected = opt === selectedOption;
                const isEliminated = eliminatedOptions.includes(opt);

                let btnClass = "bg-white border-2 border-slate-200 text-slate-800 shadow-sm hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer";

                // ESTILOS CROMÁTICOS ESPECIALES PARA ARTÍCULOS
                if (currentQuestion.type === 'artikel' && selectedOption === null && !isEliminated) {
                  if (opt === 'der') btnClass = "bg-blue-50 border-2 border-blue-300 text-blue-900 font-black hover:bg-blue-100 hover:border-blue-500 cursor-pointer";
                  if (opt === 'die') btnClass = "bg-rose-50 border-2 border-rose-300 text-rose-900 font-black hover:bg-rose-100 hover:border-rose-500 cursor-pointer";
                  if (opt === 'das') btnClass = "bg-emerald-50 border-2 border-emerald-300 text-emerald-900 font-black hover:bg-emerald-100 hover:border-emerald-500 cursor-pointer";
                }

                if (isEliminated) {
                  btnClass = "bg-slate-100 border-slate-200 text-slate-300 line-through opacity-30 cursor-not-allowed";
                } else if (selectedOption !== null) {
                  if (isCorrectAnswer) {
                    btnClass = "bg-emerald-600 border-emerald-600 text-white font-black shadow-md shadow-emerald-600/30 scale-[1.01]";
                  } else if (isSelected) {
                    btnClass = "bg-rose-600 border-rose-600 text-white font-black shadow-md shadow-rose-600/30";
                  } else {
                    btnClass = "bg-slate-50 border-slate-100 text-slate-300 opacity-40 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => !isEliminated && handleOptionClick(opt)}
                    disabled={selectedOption !== null || isEliminated}
                    className={`py-4 px-5 rounded-2xl text-base sm:text-lg transition-all text-center leading-snug font-bold ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* EXPLICACIÓN DIDÁCTICA Y SOCRÁTICA */}
            {selectedOption !== null && (
              <div
                className={`w-full max-w-xl flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl border mt-6 animate-in fade-in zoom-in-95 transition-all duration-300 ${
                  isCorrect 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="font-black flex items-center gap-2 text-base sm:text-lg">
                  {isCorrect ? '✅ ¡Richtig! (Correcto)' : '❌ Falsch (Incorrecto)'}
                </div>
                {currentQuestion.explanation && (
                  <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}

            {/* BOTÓN SIGUIENTE PREGUNTA */}
            {selectedOption !== null && (
              <div className="w-full max-w-xl mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-black text-white font-black px-8 py-3.5 rounded-2xl transition shadow-lg flex items-center gap-2.5 cursor-pointer text-sm sm:text-base active:scale-95"
                >
                  <span>
                    {currentIdx === quizQuestions.length - 1 ? "Finalizar Quiz" : "Siguiente Pregunta"}
                  </span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 4: BOLETÍN DE RESULTADOS FINAL & SMART REVIEW                       */}
        {/* ========================================================================= */}
        {quizState === 'results' && (() => {
          const totalAsked = quizQuestions.length;
          const percentage = totalAsked > 0 ? Math.round((score / totalAsked) * 100) : 0;
          
          const getFeedback = () => {
            if (isSurvival) {
              return { 
                grade: `Supervivencia: ${score} Aciertos`, 
                color: "text-orange-600 border-orange-200", 
                bg: "bg-orange-50", 
                icon: "🔥", 
                msg: `Racha heroica de ${score} respuestas correctas con 3 vidas.` 
              };
            }
            if (percentage >= 90) return { grade: "Sehr Gut (Sobresaliente)", color: "text-emerald-600 border-emerald-200", bg: "bg-emerald-50", icon: "🏆", msg: "¡Dominio total! Tienes nivel sobresaliente en este bloque." };
            if (percentage >= 70) return { grade: "Gut (Notable)", color: "text-blue-600 border-blue-200", bg: "bg-blue-50", icon: "🎯", msg: "¡Gran trabajo! Tienes las estructuras clave consolidadas." };
            if (percentage >= 60) return { grade: "Ausreichend (Suficiente)", color: "text-amber-600 border-amber-200", bg: "bg-amber-50", icon: "⚠️", msg: "Aprobado. Te recomendamos repasar los términos fallados." };
            return { grade: "Nicht bestanden (Reprobado)", color: "text-rose-600 border-rose-200", bg: "bg-rose-50", icon: "❌", msg: "Hubo varios tropiezos. ¡Aprovecha la función Smart Review para dominarlas!" };
          };

          const feedback = getFeedback();

          return (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center animate-in zoom-in-95 duration-300">
              <span className="text-6xl mb-3">{feedback.icon}</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-1">
                Boletín Pedagógico de Resultados
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Evaluación completada con estándar Goethe A1
              </p>

              {/* TARJETA DE PUNTUACIÓN */}
              <div className={`w-full max-w-md p-6 rounded-2xl border text-center mb-6 ${feedback.bg} ${feedback.color}`}>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1">Calificación</span>
                <span className="text-xl sm:text-2xl font-black block mb-2">{feedback.grade}</span>
                <span className="text-4xl sm:text-5xl font-black block mb-3">
                  {score} / {totalAsked}
                </span>

                {!isSurvival && (
                  <div className="w-full bg-slate-200/60 h-2.5 rounded-full overflow-hidden mb-3">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${percentage >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}

                <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                  {feedback.msg}
                </p>
              </div>

              {/* SECCIÓN SMART REVIEW (DESGLOSE DE PALABRAS FALLADAS) */}
              {failedQuestions.length > 0 && (
                <div className="w-full max-w-xl mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={18} className="text-amber-500" />
                      <h4 className="font-bold text-slate-800 text-sm">
                        Smart Review ({failedQuestions.length} fallos detectados)
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500">Escucha y repasa</span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1 mb-4">
                    {failedQuestions.map((fq, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 truncate">
                            {fq.questionText}
                          </p>
                          <p className="text-emerald-600 font-semibold truncate">
                            ✓ Respuesta: {fq.correctAnswer}
                          </p>
                        </div>
                        {fq.audioText && (
                          <button
                            type="button"
                            onClick={() => playGermanAudio(fq.audioText, { voice: 'Charon', type: fq.audioType || 'vocab' })}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition shrink-0 cursor-pointer"
                            title="Escuchar pronunciación"
                          >
                            <Volume2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* BOTÓN SMART REVIEW */}
                  <button
                    type="button"
                    onClick={handleStartSmartReview}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 px-4 rounded-xl transition shadow flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <RotateCcw size={16} />
                    <span>Repasar únicamente las {failedQuestions.length} preguntas falladas</span>
                  </button>
                </div>
              )}

              {/* BOTONES DE NAVEGACIÓN Y NUEVA SESIÓN */}
              <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => handleStartQuiz()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <RefreshCw size={16} />
                  <span>Repetir Quiz</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQuizState('config')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl border border-slate-200 transition text-sm cursor-pointer"
                >
                  Nueva Configuración
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  stopCurrentAudio();
                  onExit();
                }}
                className="text-xs sm:text-sm font-bold text-slate-400 hover:text-slate-600 transition underline mt-2 cursor-pointer"
              >
                Volver a las Flashcards
              </button>
            </div>
          );
        })()}

      </div>
    </div>
  );
};

export default React.memo(DynamicQuiz);
