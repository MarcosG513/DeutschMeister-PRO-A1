import React, { useState, useEffect } from 'react';
import { 
  Mic, Volume2, CheckCircle2, MessageSquare, Sparkles, 
  ArrowRight, Award, RotateCcw, HelpCircle, UserCheck 
} from 'lucide-react';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { recordGoetheScore } from '../utils/helpers';

const SPRECHEN_TEILS = [
  {
    teilId: 1,
    title: "Teil 1: Sich vorstellen & Buchstabieren",
    subtitle: "Presentación personal completa con pronunciación modelo (3 Pts)",
    cards: [
      {
        topic: "Name",
        de: "Ich heiße Carlos Gómez.",
        es: "Me llamo Carlos Gómez.",
        extraNote: "Pregunta sorpresa: 'Buchstabieren Sie bitte Ihren Namen!'",
        extraAudio: "G - O - M - E - Z",
        extraLabel: "Deletreo oficial"
      },
      {
        topic: "Alter",
        de: "Ich bin 28 Jahre alt.",
        es: "Tengo 28 años.",
        extraNote: "Pronunciación del número: 'achtundzwanzig'",
        extraAudio: "achtundzwanzig",
        extraLabel: "Pronunciación número"
      },
      {
        topic: "Land",
        de: "Ich komme aus Kolumbien.",
        es: "Vengo de Colombia.",
        extraNote: "Preposición fija de origen: 'aus'",
        extraAudio: "Ich komme aus Kolumbien.",
        extraLabel: "Frase completa"
      },
      {
        topic: "Wohnort",
        de: "Ich wohne in Frankfurt.",
        es: "Vivo en Frankfurt.",
        extraNote: "Pregunta sorpresa: 'Wie ist Ihre Postleitzahl?' (60311)",
        extraAudio: "sechs - null - drei - eins - eins",
        extraLabel: "Código postal"
      },
      {
        topic: "Sprachen",
        de: "Ich spreche Spanisch und ein bisschen Deutsch.",
        es: "Hablo español y un poco de alemán.",
        extraNote: "Palabra clave para el examen: 'ein bisschen'",
        extraAudio: "ein bisschen Deutsch",
        extraLabel: "Fonética"
      },
      {
        topic: "Beruf",
        de: "Ich bin Ingenieur von Beruf.",
        es: "Soy ingeniero de profesión.",
        extraNote: "Fórmula fija alemana: '... von Beruf'",
        extraAudio: "Ich bin Ingenieur von Beruf.",
        extraLabel: "Profesión"
      },
      {
        topic: "Hobby",
        de: "Meine Hobbys sind Fußball spielen und Musik hören.",
        es: "Mis aficiones son jugar fútbol y escuchar música.",
        extraNote: "Plural: 'Meine Hobbys sind...'",
        extraAudio: "Fußball spielen und Musik hören",
        extraLabel: "Aficiones"
      }
    ]
  },
  {
    teilId: 2,
    title: "Teil 2: Themenkarten (W-Fragen)",
    subtitle: "Formular preguntas abiertas y responder con Posición 2 (6 Pts)",
    cards: [
      {
        theme: "Einkaufen",
        keyword: "Supermarkt",
        questionPrompt: "Wann gehen Sie in den Supermarkt?",
        answerPrompt: "Ich gehe am Samstag in den Supermarkt.",
        tip: "Empieza con W-Frage (Wann) y coloca el verbo 'gehen' en Posición 2."
      },
      {
        theme: "Freizeit",
        keyword: "Sport",
        questionPrompt: "Welchen Sport machen Sie gern?",
        answerPrompt: "Ich spiele sehr gern Tennis und Fußball.",
        tip: "Usa la partícula 'gern' para indicar gusto o preferencia."
      },
      {
        theme: "Wohnen",
        keyword: "Zimmer",
        questionPrompt: "Wie viele Zimmer hat Ihre Wohnung?",
        answerPrompt: "Meine Wohnung hat drei Zimmer und einen Balkon.",
        tip: "Responde siempre con oraciones completas, nunca con palabras sueltas."
      }
    ]
  },
  {
    teilId: 3,
    title: "Teil 3: Bitten & Reagieren (El Sándwich de Cortesía)",
    subtitle: "Formular peticiones formales con 'Können Sie bitte...?' (6 Pts)",
    cards: [
      {
        situation: "Petición 1: Un bolígrafo prestado",
        object: "der Kugelschreiber (Stift)",
        requestPrompt: "Können Sie mir bitte einen Kugelschreiber geben?",
        responsePrompt: "Ja, natürlich! Bitte schön.",
        formula: "Können Sie mir bitte [Akkusativ] geben?"
      },
      {
        situation: "Petición 2: Un vaso de agua",
        object: "ein Glas Wasser",
        requestPrompt: "Bringen Sie mir bitte ein Glas Wasser!",
        responsePrompt: "Gern! Hier, bitte sehr.",
        formula: "Imperativo formal: [Verbo] + Sie mir bitte..."
      },
      {
        situation: "Petición 3: Abrir la ventana",
        object: "das Fenster",
        requestPrompt: "Können Sie bitte das Fenster aufmachen? Es ist warm.",
        responsePrompt: "Ja, sofort. Kein Problem.",
        formula: "Verbo separable al final de la oración: 'aufmachen'"
      }
    ]
  }
];

const GoetheSprechenExam = ({ onComplete }) => {
  const [activeTeilIdx, setActiveTeilIdx] = useState(0);
  const [practicedCards, setPracticedCards] = useState({});
  const [playingKey, setPlayingKey] = useState(null);

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const activeTeil = SPRECHEN_TEILS[activeTeilIdx];

  const handlePlayAudio = (key, text) => {
    stopCurrentAudio();
    setPlayingKey(key);
    setPracticedCards(prev => ({ ...prev, [key]: true }));

    playGermanAudio(text, {
      voice: "Charon",
      type: "quiz",
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null)
    }).catch(() => setPlayingKey(null));
  };

  const handleCompleteModule = () => {
    recordGoetheScore('g_sprechen', 15);
    if (onComplete) onComplete(15);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 text-slate-800 font-sans">
      
      {/* BARRA SUPERIOR DE NAVEGACIÓN */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-950 text-white p-4 rounded-2xl shadow-md mb-6 border border-blue-900">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl">
            <Mic size={24} />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg leading-tight">
              Goethe-Zertifikat A1: Sprechen (Simulador Oral)
            </h3>
            <p className="text-blue-200 text-xs">
              Voz modelo Charon • Presentación, Themenkarten y Bitten (15 Pts)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-blue-900/60 p-1 rounded-xl border border-blue-800">
          {SPRECHEN_TEILS.map((teil, idx) => (
            <button
              key={teil.teilId}
              type="button"
              onClick={() => {
                stopCurrentAudio();
                setPlayingKey(null);
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

      {/* CONTENIDO DEL TEIL ACTIVO */}
      <div className="space-y-6">
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
            Expresión oral Start Deutsch 1
          </span>
        </div>

        {/* TEIL 1: SICH VORSTELLEN (PRESENTACIÓN PERSONAL) */}
        {activeTeil.teilId === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeTeil.cards.map((c, idx) => {
              const mainKey = `t1_${idx}_main`;
              const extraKey = `t1_${idx}_extra`;

              return (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
                      {idx + 1}. {c.topic}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(mainKey, c.de)}
                      className={`p-1.5 rounded-lg transition ${
                        playingKey === mainKey ? 'bg-emerald-500 text-white animate-pulse' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                      title="Escuchar modelo"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <p className="font-bold text-sm text-slate-800">
                    {c.de}
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    "{c.es}"
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-xl">
                    <span className="text-slate-600 font-medium">{c.extraNote}</span>
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(extraKey, c.extraAudio)}
                      className="ml-2 font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
                    >
                      <Volume2 size={13} />
                      <span>{c.extraLabel || 'Audio'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TEIL 2: THEMENKARTEN (W-FRAGEN) */}
        {activeTeil.teilId === 2 && (
          <div className="space-y-4">
            {activeTeil.cards.map((c, idx) => {
              const qKey = `t2_${idx}_q`;
              const aKey = `t2_${idx}_a`;

              return (
                <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-black bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg uppercase">
                      Thema: {c.theme} • Wort: {c.keyword}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">W-Frage & Antwort</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-blue-800">Pregunta Modelo:</span>
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(qKey, c.questionPrompt)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="font-bold text-slate-900">{c.questionPrompt}</p>
                    </div>

                    <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-emerald-800">Respuesta Modelo:</span>
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(aKey, c.answerPrompt)}
                          className="text-emerald-600 hover:text-emerald-800"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="font-bold text-slate-900">{c.answerPrompt}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg">
                    💡 <strong>Tip Goethe:</strong> {c.tip}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* TEIL 3: BITTEN UND REAGIEREN */}
        {activeTeil.teilId === 3 && (
          <div className="space-y-4">
            {activeTeil.cards.map((c, idx) => {
              const reqKey = `t3_${idx}_req`;
              const resKey = `t3_${idx}_res`;

              return (
                <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-800 text-sm">
                      {c.situation} ({c.object})
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-lg">
                      Höfliche Bitte
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-indigo-900">Petición Formal:</span>
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(reqKey, c.requestPrompt)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="font-black text-slate-900">{c.requestPrompt}</p>
                    </div>

                    <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-emerald-900">Reacción / Respuesta:</span>
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(resKey, c.responsePrompt)}
                          className="text-emerald-600 hover:text-emerald-800"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="font-black text-slate-900">{c.responsePrompt}</p>
                    </div>
                  </div>

                  <p className="text-xs font-mono bg-slate-50 p-2 rounded-lg text-slate-600">
                    📐 Fórmula: {c.formula}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* BARRA INFERIOR DE ACCIÓN */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-500">
            Escucha todos los modelos con voz oficial Charon para automatizar tu fluidez.
          </div>

          <div className="flex items-center gap-2">
            {activeTeilIdx < SPRECHEN_TEILS.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  stopCurrentAudio();
                  setPlayingKey(null);
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
                onClick={handleCompleteModule}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl transition text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Award size={18} />
                <span>Completar Módulo Sprechen (15 Pts)</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default GoetheSprechenExam;
