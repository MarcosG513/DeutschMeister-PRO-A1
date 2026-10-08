import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle2, XCircle, AlertTriangle, 
  RotateCcw, Award, ArrowRight, ExternalLink, Globe, Mail 
} from 'lucide-react';
import { recordGoetheScore } from '../utils/helpers';

const LESEN_TEILS = [
  {
    teilId: 1,
    title: "Teil 1: E-Mails und Notizen",
    subtitle: "2 textos cotidianos • Responde Richtig o Falsch",
    questions: [
      {
        id: "l1_1",
        title: "1. Einladung zum Geburtstag (E-Mail)",
        textType: "email",
        sender: "Sandra <sandra.b@web.de>",
        subject: "Geburtstagspicknick am Samstag 🎂",
        body: `Liebe Julia,\n\nich feiere am nächsten Samstag meinen Geburtstag! Wir machen ein Picknick im Stadtpark. Bring bitte einen Salat oder etwas zu trinken mit. Wir treffen uns um 15 Uhr bei den großen Bäumen.\n\nBei Regen treffen wir uns bei mir zu Hause.\n\nHerzliche Grüße,\nSandra`,
        statement: "Wenn das Wetter schlecht ist, feiern sie nicht im Park.",
        question: "¿Es verdadera o falsa la afirmación?",
        options: ["Richtig", "Falsch"],
        correct: "Richtig",
        explanation: "Sandra aclara: 'Bei Regen treffen wir uns bei mir zu Hause' (Si llueve nos vemos en mi casa). Por lo tanto, con mal tiempo no celebran en el parque."
      },
      {
        id: "l1_2",
        title: "2. Notiz in der WG-Küche",
        textType: "note",
        sender: "Lukas",
        subject: "Einkauf & Fahrradschlüssel",
        body: `Hallo Markus,\n\nich bin heute bis 20 Uhr an der Universität. Kannst du bitte Milch und Brot im Supermarkt kaufen? Ich habe dein Geld auf den Küchentisch gelegt. Den Schlüssel für das Fahrrad findest du im Flur.\n\nBis heute Abend, Lukas`,
        statement: "Lukas bittet Markus, Lebensmittel einzukaufen.",
        question: "¿Es verdadera o falsa la afirmación?",
        options: ["Richtig", "Falsch"],
        correct: "Richtig",
        explanation: "Lukas pide expresamente: 'Kannst du bitte Milch und Brot im Supermarkt kaufen?' (¿Puedes comprar leche y pan?)."
      }
    ]
  },
  {
    teilId: 2,
    title: "Teil 2: Webseiten und Anzeigen",
    subtitle: "2 búsquedas de información • Selecciona Opción A o B",
    questions: [
      {
        id: "l2_1",
        title: "1. Búsqueda: Restaurante italiano con terraza",
        situation: "Sie möchten am Samstagabend mit Freunden italienisch essen gehen und suchen ein Restaurant mit schöner Terrasse.",
        optionsData: [
          {
            key: "Option A",
            title: "Ristorante Bella Italia",
            tag: "Pizza & Pasta • Außenbereich",
            details: "Authentische Steinofenpizza. Große sonnige Terrasse geöffnet bis 23 Uhr. Samstags geöffnet mit Live-Musik."
          },
          {
            key: "Option B",
            title: "Trattoria Roma Centro",
            tag: "Kleine Bar • Kein Außenbereich",
            details: "Traditionelle Pasta. Nur von Montag bis Freitag geöffnet. Kein Garten und keine Terrasse vorhanden."
          }
        ],
        question: "¿Qué página web resuelve la necesidad del cliente?",
        options: ["Option A", "Option B"],
        correct: "Option A",
        explanation: "La Opción A cuenta con terraza exterior ('große sonnige Terrasse') y abre los sábados. La Opción B no tiene terraza y cierra el fin de semana."
      },
      {
        id: "l2_2",
        title: "2. Búsqueda: Libros usados de alemán baratos",
        situation: "Sie möchten gebrauchte deutsche Bücher für das Niveau A1 kaufen und suchen ein günstiges Angebot.",
        optionsData: [
          {
            key: "Option A",
            title: "Wissenschafts-Buchhandlung Becker",
            tag: "Akademische Fachbücher",
            details: "Nur neue Bücher für Universität und Medizin. Feste Ladenpreise, keine gebrauchte Literatur."
          },
          {
            key: "Option B",
            title: "Mauerpark Stadtflohmarkt",
            tag: "Gebraucht & Günstig",
            details: "Jeden Samstag & Sonntag: Großer Bücher- und Medienmarkt. Gebrauchte Deutsch-Lernbücher ab 1 Euro."
          }
        ],
        question: "¿Qué página web resuelve la necesidad del cliente?",
        options: ["Option A", "Option B"],
        correct: "Option B",
        explanation: "La Opción B ofrece libros de segunda mano ('gebrauchte Deutsch-Lernbücher') a partir de 1 Euro, cumpliendo ambos criterios de búsqueda."
      }
    ]
  },
  {
    teilId: 3,
    title: "Teil 3: Schilder und Hinweise",
    subtitle: "2 letreros públicos oficiales • Responde Richtig o Falsch",
    questions: [
      {
        id: "l3_1",
        title: "1. Letrero en la Biblioteca Municipal",
        signType: "public",
        signHeader: "STADTBIBLIOTHEK MÜNCHEN",
        signBody: "Wegen Renovierungsarbeiten vom 1. bis 15. Oktober komplett geschlossen!\n\nOnline-Rückgabe und Verlängerungen sind möglich.",
        statement: "Man kann am 10. Oktober Bücher in der Bibliothek ausleihen.",
        question: "¿Es verdadera o falsa la afirmación?",
        options: ["Richtig", "Falsch"],
        correct: "Falsch",
        explanation: "El letrero señala cierre total por obras del 1 al 15 de octubre ('komplett geschlossen'). El 10 de octubre no se pueden tomar libros físicamente."
      },
      {
        id: "l3_2",
        title: "2. Cartel en Consultorio Médico",
        signType: "medical",
        signHeader: "ARZTPRAXIS DR. MÜLLER",
        signBody: "Offene Sprechstunde OHNE Voranmeldung:\nMontag bis Freitag: 8:00 – 10:00 Uhr.\n\nNachmittags nur mit telefonischem Termin!",
        statement: "Um 9:00 Uhr braucht man keinen Termin beim Arzt.",
        question: "¿Es verdadera o falsa la afirmación?",
        options: ["Richtig", "Falsch"],
        correct: "Richtig",
        explanation: "De 8:00 a 10:00 es horario libre sin cita previa ('OHNE Voranmeldung'). A las 9:00 puedes entrar sin cita."
      }
    ]
  }
];

const GoetheLesenExam = ({ onComplete }) => {
  const [activeTeilIdx, setActiveTeilIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const activeTeil = LESEN_TEILS[activeTeilIdx];

  const handleSelectOption = (qId, opt) => {
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const allQuestions = LESEN_TEILS.flatMap(t => t.questions);
  const totalQuestions = allQuestions.length; // 6 preguntas oficiales
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
    recordGoetheScore('g_lesen', finalScore);
    setShowSummary(true);
    if (onComplete) onComplete(finalScore);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 text-slate-800 font-sans">
      
      {/* BARRA SUPERIOR DE NAVEGACIÓN */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-950 text-white p-4 rounded-2xl shadow-md mb-6 border border-amber-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-600 rounded-xl">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg leading-tight">
              Goethe-Zertifikat A1: Lesen (Simulacro Oficial)
            </h3>
            <p className="text-amber-200 text-xs">
              E-Mails, Anzeigen & Schilder • Ponderación oficial: 15 Puntos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-900/60 p-1 rounded-xl border border-amber-700/50">
          {LESEN_TEILS.map((teil, idx) => (
            <button
              key={teil.teilId}
              type="button"
              onClick={() => setActiveTeilIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTeilIdx === idx
                  ? 'bg-amber-500 text-slate-900 shadow-sm font-black'
                  : 'text-amber-200 hover:text-white'
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
          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {activeTeil.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {activeTeil.subtitle}
              </p>
            </div>
            <span className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
              Comprensión escrita A1
            </span>
          </div>

          {/* LISTA DE PREGUNTAS DEL TEIL ACTIVO */}
          <div className="space-y-6">
            {activeTeil.questions.map((q, qIdx) => {
              const selected = answers[q.id];
              const isAnswered = Boolean(selected);
              const isCorrect = selected === q.correct;

              return (
                <div 
                  key={q.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm transition hover:border-amber-300 space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                        {qIdx + 1}
                      </span>
                      {q.title}
                    </span>
                  </div>

                  {/* FORMATO 1: CORREO ELECTRÓNICO O NOTA */}
                  {q.body && (
                    <div className="bg-[#fdfbf7] p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-inner font-serif text-slate-800 text-sm leading-relaxed space-y-2">
                      {q.sender && (
                        <div className="font-sans text-xs text-slate-500 pb-2 border-b border-amber-100 flex items-center gap-2">
                          <Mail size={14} className="text-amber-600" />
                          <span>Von: <strong>{q.sender}</strong></span>
                          {q.subject && <span className="truncate">• Betreff: {q.subject}</span>}
                        </div>
                      )}
                      <p className="whitespace-pre-line text-slate-900 font-medium">
                        {q.body}
                      </p>
                    </div>
                  )}

                  {/* FORMATO 2: ANUNCIOS WEB COMPARATIVOS */}
                  {q.optionsData && (
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm font-medium text-blue-900">
                        🔍 <strong>Situación del usuario:</strong> {q.situation}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.optionsData.map((opt) => (
                          <div 
                            key={opt.key}
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-2 text-xs"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-amber-700 uppercase tracking-wider">{opt.key}</span>
                                <Globe size={14} className="text-slate-400" />
                              </div>
                              <h5 className="font-bold text-slate-900 text-sm">{opt.title}</h5>
                              <span className="inline-block text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 mt-1">
                                {opt.tag}
                              </span>
                            </div>
                            <p className="text-slate-600 leading-snug pt-2 border-t border-slate-200/60 font-sans">
                              {opt.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FORMATO 3: LETRERO PÚBLICO */}
                  {q.signBody && (
                    <div className="bg-slate-900 text-white p-5 rounded-2xl border-4 border-slate-800 text-center shadow-md space-y-2">
                      <span className="font-mono text-xs tracking-widest text-amber-400 font-bold uppercase block border-b border-slate-700 pb-1">
                        🪧 {q.signHeader}
                      </span>
                      <p className="text-base sm:text-lg font-black whitespace-pre-line tracking-wide py-2 text-slate-100">
                        {q.signBody}
                      </p>
                    </div>
                  )}

                  {/* ENUNCIADO DE LA PREGUNTA */}
                  <div>
                    {q.statement && (
                      <p className="font-mono text-xs sm:text-sm bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 mb-2">
                        "{q.statement}"
                      </p>
                    )}
                    <p className="font-bold text-sm text-slate-800">
                      {q.question}
                    </p>
                  </div>

                  {/* SELECTORES DE RESPUESTA */}
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((opt) => {
                      const isOptionSelected = selected === opt;
                      let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300";

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
                          className={`py-3.5 px-4 rounded-xl border text-sm font-bold transition text-center cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* EXPLICACIÓN INMEDIATA DE LA TRAMPA O PALABRA CLAVE */}
                  {isAnswered && (
                    <div className={`p-3.5 rounded-xl text-xs leading-relaxed border animate-in fade-in duration-200 ${
                      isCorrect 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <span>{isCorrect ? '¡Richtig! Análisis correcto' : 'Falsch. Justificación pedagógica:'}</span>
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* BARRA INFERIOR DE ACCIÓN */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs font-bold text-slate-500">
              Respondidas: {answeredCount} de {totalQuestions} preguntas
            </div>

            <div className="flex items-center gap-2">
              {activeTeilIdx < LESEN_TEILS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveTeilIdx(prev => prev + 1)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                  <span>Evaluar Módulo Lesen (15 Pts)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* BOLETÍN FINAL DE CALIFICACIÓN LESEN */
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-amber-200 shadow-lg text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-300">
            <Award size={40} />
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-1">
            Resultado del Módulo Lesen A1
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Evaluación oficial sobre textos y normas Start Deutsch 1
          </p>

          <div className="max-w-sm mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
              Puntuación Obtenida
            </span>
            <div className="text-5xl font-black text-amber-900 mb-2">
              {calculateOfficialScore()} <span className="text-xl font-bold text-amber-600">/ 15 Pts</span>
            </div>
            <p className="text-xs font-semibold text-amber-800">
              {calculateOfficialScore() >= 9 
                ? '✅ Aprobado (Superaste los letreros y trampas textuales A1)' 
                : '⚠️ Refuerza los antónimos y las palabras compuestas'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setShowSummary(false);
              setActiveTeilIdx(0);
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm inline-flex items-center gap-2 cursor-pointer shadow"
          >
            <RotateCcw size={16} />
            <span>Repetir Simulacro Lesen</span>
          </button>
        </div>
      )}

    </div>
  );
};

export default GoetheLesenExam;
