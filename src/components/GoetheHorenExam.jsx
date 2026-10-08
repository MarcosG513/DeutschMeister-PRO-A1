import React, { useState, useEffect } from 'react';
import { 
  Volume2, CheckCircle2, XCircle, Headphones, AlertCircle, 
  RotateCcw, Sparkles, Award, ArrowRight, ShieldCheck, Play 
} from 'lucide-react';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { recordGoetheScore } from '../utils/helpers';

const HOREN_TEILS = [
  {
    teilId: 1,
    title: "Teil 1: Alltagssituationen",
    subtitle: "3 diálogos cortos • Se escucha 2 veces cada texto (A / B / C)",
    maxListens: 2,
    questions: [
      {
        id: "h1_1",
        title: "1. En la tienda de ropa",
        audioText: "Guten Tag! Was kostet diese Jacke hier? – Die rote Jacke kostet normalerweise 80 Euro. Aber diese Woche haben wir Rabatt, sie kostet nur 55 Euro. – Gut, ich nehme sie.",
        question: "¿Cuánto cuesta la chaqueta hoy?",
        options: ["80 Euro", "55 Euro", "25 Euro"],
        correct: "55 Euro",
        explanation: "La chaqueta normalmente cuesta 80 €, pero con el descuento semanal cuesta exactamente 55 Euro ('nur 55 Euro')."
      },
      {
        id: "h1_2",
        title: "2. En la estación de tren",
        audioText: "Entschuldigung, fährt dieser Zug nach Frankfurt? – Nein, der Zug nach Frankfurt fährt auf Gleis 7 ab. Hier auf Gleis 4 fährt der Zug nach Köln. – Danke schön!",
        question: "¿En qué andén sale el tren a Frankfurt?",
        options: ["Gleis 4", "Gleis 7", "Gleis 11"],
        correct: "Gleis 7",
        explanation: "El tren a Frankfurt sale en el andén 7 ('Gleis 7'). En el andén 4 sale el tren hacia Colonia ('Köln')."
      },
      {
        id: "h1_3",
        title: "3. Cita con amigos",
        audioText: "Hallo Sarah! Wann treffen wir uns heute Abend? Um sieben? – Sieben ist etwas zu früh. Lass uns lieber um halb acht vor dem Kino treffen. – Abgemacht, um halb acht!",
        question: "¿A qué hora se encuentran los amigos?",
        options: ["Um 7:00 Uhr", "Um 7:30 Uhr", "Um 8:00 Uhr"],
        correct: "Um 7:30 Uhr",
        explanation: "Acuerdan a las 'halb acht', que en alemán significa las 7:30 (media hora antes de las 8)."
      }
    ]
  },
  {
    teilId: 2,
    title: "Teil 2: Öffentliche Durchsagen",
    subtitle: "2 anuncios de megafonía • Se escucha 1 sola vez (Richtig / Falsch)",
    maxListens: 1,
    questions: [
      {
        id: "h2_1",
        title: "1. Anuncio en la estación central",
        audioText: "Achtung an Gleis 3: Der Intercity nach Berlin mit planmäßiger Abfahrt um 14 Uhr 15 hat heute circa 20 Minuten Verspätung. Grund dafür ist eine technische Störung. Wir bitten um Entschuldigung.",
        statement: "Der Zug nach Berlin kommt heute pünktlich an.",
        question: "¿Es verdadera o falsa la afirmación?",
        options: ["Richtig", "Falsch"],
        correct: "Falsch",
        explanation: "El anuncio avisa que el tren tiene unos 20 minutos de retraso ('20 Minuten Verspätung'). Por ende, NO llega puntual."
      },
      {
        id: "h2_2",
        title: "2. Megafonía en centro comercial",
        audioText: "Liebe Kundinnen und Kunden, unser Kaufhaus schließt in 15 Minuten. Bitte begeben Sie sich jetzt zu den Kassen im Erdgeschoss. Wir wünschen Ihnen einen schönen Abend.",
        statement: "Die Kunden müssen jetzt bezahlen und das Geschäft verlassen.",
        question: "¿Es verdadera o falsa la afirmación?",
        options: ["Richtig", "Falsch"],
        correct: "Richtig",
        explanation: "El establecimiento cierra en 15 minutos y solicita a los clientes pasar a pagar por las cajas de la planta baja."
      }
    ]
  },
  {
    teilId: 3,
    title: "Teil 3: Telefonansagen & Anrufbeantworter",
    subtitle: "2 mensajes telefónicos • Se escucha 2 veces cada mensaje (A / B / C)",
    maxListens: 2,
    questions: [
      {
        id: "h3_1",
        title: "1. Mensaje de consulta médica",
        audioText: "Guten Tag Herr Schmidt, hier ist die Praxis Dr. Weber. Ihr Termin am Montag um 10 Uhr muss leider verschoben werden. Bitte kommen Sie am Dienstag um 11 Uhr 30. Auf Wiederhören.",
        question: "¿Cuándo es la nueva cita de Herr Schmidt?",
        options: ["Montag um 10:00 Uhr", "Dienstag um 11:30 Uhr", "Dienstag um 10:00 Uhr"],
        correct: "Dienstag um 11:30 Uhr",
        explanation: "La cita original del lunes fue cancelada y reprogramada para el martes a las 11:30 ('Dienstag um 11 Uhr 30')."
      },
      {
        id: "h3_2",
        title: "2. Mensaje de taller mecánico",
        audioText: "Hallo Martin, hier ist die Autowerkstatt Becker. Dein Auto ist fertig und abholbereit. Wir haben heute bis 18 Uhr geöffnet. Am Wochenende haben wir geschlossen.",
        question: "¿Hasta qué hora puede Martin recoger su coche hoy?",
        options: ["Bis 16:00 Uhr", "Bis 18:00 Uhr", "Am Samstag"],
        correct: "Bis 18:00 Uhr",
        explanation: "El taller avisa que está abierto hoy hasta las 18:00 ('heute bis 18 Uhr geöffnet')."
      }
    ]
  }
];

const GoetheHorenExam = ({ onComplete }) => {
  const [activeTeilIdx, setActiveTeilIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [playingId, setPlayingId] = useState(null);
  const [listenCounts, setListenCounts] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const activeTeil = HOREN_TEILS[activeTeilIdx];

  const handlePlayAudio = (qId, audioText, maxListens) => {
    const currentListens = listenCounts[qId] || 0;
    if (currentListens >= maxListens) return;

    stopCurrentAudio();
    setPlayingId(qId);
    setListenCounts(prev => ({ ...prev, [qId]: currentListens + 1 }));

    playGermanAudio(audioText, {
      voice: "Charon",
      type: "quiz",
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    }).catch(() => setPlayingId(null));
  };

  const handleSelectOption = (qId, opt) => {
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const allQuestions = HOREN_TEILS.flatMap(t => t.questions);
  const totalQuestions = allQuestions.length; // 7 preguntas oficiales
  const answeredCount = Object.keys(answers).length;

  const calculateOfficialScore = () => {
    let correct = 0;
    allQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    // Escalado oficial Goethe A1: 15 puntos máximos
    return Math.round((correct / totalQuestions) * 15);
  };

  const handleFinishExam = () => {
    const finalScore = calculateOfficialScore();
    recordGoetheScore('g_horen', finalScore);
    setShowSummary(true);
    if (onComplete) onComplete(finalScore);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 text-slate-800 font-sans">
      
      {/* BARRA SUPERIOR DE NAVEGACIÓN ENTRE TEILS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-900/90 text-white p-4 rounded-2xl shadow-md mb-6 border border-blue-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl">
            <Headphones size={24} />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg leading-tight">
              Goethe-Zertifikat A1: Hören (Simulacro Oficial)
            </h3>
            <p className="text-blue-200 text-xs">
              Voz oficial Charon • Ponderación oficial: 15 Puntos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-blue-950/70 p-1 rounded-xl border border-blue-700/50">
          {HOREN_TEILS.map((teil, idx) => (
            <button
              key={teil.teilId}
              type="button"
              onClick={() => {
                stopCurrentAudio();
                setPlayingId(null);
                setActiveTeilIdx(idx);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTeilIdx === idx
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Teil {teil.teilId}
            </button>
          ))}
        </div>
      </div>

      {!showSummary ? (
        <div className="space-y-6">
          {/* CABECERA DEL TEIL ACTIVO */}
          <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {activeTeil.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {activeTeil.subtitle}
              </p>
            </div>
            <span className="text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
              Límite: {activeTeil.maxListens} {activeTeil.maxListens === 1 ? 'escucha' : 'escuchas'}
            </span>
          </div>

          {/* LISTA DE PREGUNTAS DEL TEIL ACTIVO */}
          <div className="space-y-4">
            {activeTeil.questions.map((q, qIdx) => {
              const currentListens = listenCounts[q.id] || 0;
              const listensLeft = Math.max(0, activeTeil.maxListens - currentListens);
              const isPlaying = playingId === q.id;
              const selected = answers[q.id];
              const isAnswered = Boolean(selected);
              const isCorrect = selected === q.correct;

              return (
                <div 
                  key={q.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm transition hover:border-blue-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                        {qIdx + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {q.title}
                      </h4>
                    </div>

                    {/* CONTROL REPRODUCTOR DE AUDIO */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(q.id, q.audioText, activeTeil.maxListens)}
                        disabled={listensLeft <= 0 && !isPlaying}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer ${
                          isPlaying
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : listensLeft > 0
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                        title="Escuchar audio de examen"
                      >
                        <Volume2 size={16} />
                        <span>
                          {isPlaying ? 'Reproduciendo...' : `Escuchar (${listensLeft} disp.)`}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* ENUNCIADO DE LA PREGUNTA O AFIRMACIÓN */}
                  <div className="mb-4">
                    {q.statement && (
                      <p className="font-mono text-xs sm:text-sm bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-2">
                        "{q.statement}"
                      </p>
                    )}
                    <p className="font-bold text-sm text-slate-800">
                      {q.question}
                    </p>
                  </div>

                  {/* OPCIONES DE RESPUESTA */}
                  <div className={`grid ${q.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'} gap-2.5 mb-3`}>
                    {q.options.map((opt) => {
                      const isOptionSelected = selected === opt;
                      let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300";

                      if (isAnswered) {
                        if (opt === q.correct) {
                          btnStyle = "bg-emerald-500 border-emerald-500 text-white font-bold shadow-sm";
                        } else if (isOptionSelected) {
                          btnStyle = "bg-rose-500 border-rose-500 text-white font-bold shadow-sm";
                        } else {
                          btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt)}
                          disabled={isAnswered}
                          className={`py-3 px-4 rounded-xl border text-sm font-semibold transition text-center cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* RETROALIMENTACIÓN EXPLICATIVA INMEDIATA */}
                  {isAnswered && (
                    <div className={`p-3.5 rounded-xl text-xs leading-relaxed border animate-in fade-in duration-200 ${
                      isCorrect 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <span>{isCorrect ? '¡Richtig! Respuesta correcta' : 'Falsch. Atención a la palabra clave:'}</span>
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* BARRA DE NAVEGACIÓN Y FINALIZACIÓN */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs font-bold text-slate-500">
              Respondidas: {answeredCount} de {totalQuestions} preguntas
            </div>

            <div className="flex items-center gap-2">
              {activeTeilIdx < HOREN_TEILS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    stopCurrentAudio();
                    setPlayingId(null);
                    setActiveTeilIdx(prev => prev + 1);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Siguiente: Teil {activeTeilIdx + 2}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishExam}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl transition text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <Award size={18} />
                  <span>Evaluar Módulo Hören (15 Pts)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* BOLETÍN FINAL DE CALIFICACIÓN HÖREN */
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-blue-200 shadow-lg text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-300">
            <Award size={40} />
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-1">
            Resultado del Módulo Hören A1
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Evaluación oficial ponderada sobre el estándar Start Deutsch 1
          </p>

          <div className="max-w-sm mx-auto bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
              Puntuación Obtenida
            </span>
            <div className="text-5xl font-black text-blue-900 mb-2">
              {calculateOfficialScore()} <span className="text-xl font-bold text-blue-500">/ 15 Pts</span>
            </div>
            <p className="text-xs font-semibold text-blue-700">
              {calculateOfficialScore() >= 9 
                ? '✅ Aprobado (Nivel superior a 60% requerido en Start Deutsch 1)' 
                : '⚠️ Requiere refuerzo en palabras trampa y números alemanes'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setListenCounts({});
              setShowSummary(false);
              setActiveTeilIdx(0);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm inline-flex items-center gap-2 cursor-pointer shadow"
          >
            <RotateCcw size={16} />
            <span>Repetir Simulacro Hören</span>
          </button>
        </div>
      )}

    </div>
  );
};

export default GoetheHorenExam;
