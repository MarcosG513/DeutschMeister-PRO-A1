import { useState, useEffect } from 'react';
import {
  Mic, Volume2, CheckCircle2, Sparkles,
  ArrowRight, Award
} from 'lucide-react';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { recordGoetheScore } from '../utils/helpers';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

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

const DTZ_SPRECHEN_TEILS = [
  {
    teilId: 'dtz_2',
    title: "Puente DTZ Teil 2: Über Erfahrungen sprechen",
    subtitle: "Responder preguntas sobre trabajo indoor, vivienda o rutina diaria en Alemania",
    cards: [
      {
        theme: "Wohnung / Alltag",
        keyword: "Nachbarschaft",
        questionPrompt: "Wie verstehen Sie sich mit Ihren Nachbarn und welche Hausregeln gelten?",
        answerPrompt: "Wir grüßen uns freundlich im Treppenhaus. Am Sonntag beachten wir natürlich die Ruhezeit.",
        tip: "En DTZ/B1 añade siempre una frase subordinada («weil...», «obwohl...») o un detalle concreto."
      },
      {
        theme: "Beruf / Technik",
        keyword: "Arbeitstag",
        questionPrompt: "Was machen Sie am Vormittag bei der Arbeit im Technikraum?",
        answerPrompt: "Zuerst prüfe ich den Zählerschrank und bereite die Kabel für die Wallbox im Keller vor.",
        tip: "Usa conectores temporales: «Zuerst... danach... zum Schluss...»."
      }
    ]
  },
  {
    teilId: 'dtz_3',
    title: "Puente DTZ Teil 3: Gemeinsam etwas planen",
    subtitle: "Proponer, aceptar o negociar una actividad con el compañero de examen",
    cards: [
      {
        situation: "Planificar una reunión del equipo",
        object: "Termin & Essen",
        requestPrompt: "Wollen wir uns am Freitag um achtzehn Uhr treffen? Ich kann Getränke mitbringen.",
        responsePrompt: "Gute Idee! Freitag passt mir gut. Soll ich dann einen Salat machen?",
        formula: "Wollen wir...? / Wie wäre es mit...? / Passt es dir am...?"
      },
      {
        situation: "Organizar ayuda para una mudanza",
        object: "Umzug am Samstag",
        requestPrompt: "Kannst du mir am Samstag beim Kisten tragen helfen?",
        responsePrompt: "Klar, gern! Ab wie viel Uhr soll ich da sein?",
        formula: "Kannst du...? / Ab wann soll ich...?"
      }
    ]
  }
];

const SPRECHEN_BY_TRACK = {
  A1: SPRECHEN_TEILS,
  DTZ: DTZ_SPRECHEN_TEILS,
};

const GoetheSprechenExam = ({ onComplete }) => {
  const [examTrack, setExamTrack] = useState('A1');
  const [activeTeilIdx, setActiveTeilIdx] = useState(0);
  const [practicedCards, setPracticedCards] = useState({});
  const [playingKey, setPlayingKey] = useState(null);
  const [speakingCardKey, setSpeakingCardKey] = useState(null);
  const [speechNotice, setSpeechNotice] = useState(null);

  const {
    isListening,
    startListening,
    stopListening,
    error: speechError,
  } = useSpeechRecognition('de-DE');

  const currentTeils = SPRECHEN_BY_TRACK[examTrack] || SPRECHEN_TEILS;

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const activeTeil = currentTeils[activeTeilIdx] || currentTeils[0];

  const handleTrackSwitch = (nextTrack) => {
    if (nextTrack === examTrack) return;
    stopCurrentAudio();
    if (isListening) stopListening();
    setPlayingKey(null);
    setSpeakingCardKey(null);
    setExamTrack(nextTrack);
    setActiveTeilIdx(0);
  };

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

  const handlePracticeMic = (cardKey, targetSentence) => {
    if (isListening) {
      stopListening();
      setSpeakingCardKey(null);
      return;
    }
    stopCurrentAudio();
    setSpeakingCardKey(cardKey);
    setSpeechNotice(null);
    startListening((spoken) => {
      setSpeakingCardKey(null);
      const cleanSpoken = String(spoken || '').trim();
      if (cleanSpoken) {
        setPracticedCards((prev) => ({ ...prev, [cardKey]: true }));
        setSpeechNotice(`Captado: «${cleanSpoken}» (Objetivo: «${targetSentence}»)`);
      }
    });
  };

  const totalCardsCount = currentTeils.reduce((acc, t) => acc + t.cards.length, 0);
  const trackPrefix = examTrack === 'A1' ? 't' : 'dtz';
  const practicedUniqueCards = new Set(
    Object.keys(practicedCards)
      .filter((k) => (examTrack === 'A1' ? !k.startsWith('dtz') : k.startsWith('dtz')))
      .map((k) => k.split('_').slice(0, 2).join('_'))
  ).size;
  const proportionalScore = Math.max(
    1,
    Math.min(15, Math.round((practicedUniqueCards / Math.max(1, totalCardsCount)) * 15))
  );

  const handleCompleteModule = () => {
    const scoreToSave = practicedUniqueCards > 0 ? proportionalScore : 15;
    if (examTrack === 'A1') {
      recordGoetheScore('g_sprechen', scoreToSave);
    }
    if (onComplete) onComplete(scoreToSave);
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
              {examTrack === 'A1' ? 'Goethe-Zertifikat A1: Sprechen (Simulador Oral)' : 'Puente A2 / DTZ: Interacción Oral y Planificación'}
            </h3>
            <p className="text-blue-200 text-xs">
              Voz modelo Charon + Práctica de micrófono ({practicedUniqueCards}/{totalCardsCount} bloques practicados · {trackPrefix === 't' ? `${proportionalScore}/15 Pts est.` : 'A2/DTZ'})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div role="tablist" aria-label="Nivel de examen Sprechen" className="flex items-center gap-1 bg-blue-900/90 p-1 rounded-xl border border-blue-700/60">
            {[
              { id: 'A1', label: 'A1 Oficial' },
              { id: 'DTZ', label: 'Puente A2/DTZ' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={examTrack === t.id}
                onClick={() => handleTrackSwitch(t.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border-b-2 transition cursor-pointer ${
                  examTrack === t.id
                    ? 'bg-amber-400 text-slate-950 border-white'
                    : 'text-blue-200 border-transparent hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-blue-900/60 p-1 rounded-xl border border-blue-800">
            {currentTeils.map((teil, idx) => (
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
                {String(teil.teilId).startsWith('dtz_') ? `DTZ ${teil.teilId.replace('dtz_', 'Teil ')}` : `Teil ${teil.teilId}`}
              </button>
            ))}
          </div>
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
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
              Practicadas: {Object.keys(practicedCards).length} tarjetas
            </span>
            <span className="text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg">
              Expresión oral
            </span>
          </div>
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

        {/* TEIL 2 / DTZ 2: THEMENKARTEN (W-FRAGEN / ERFAHRUNGEN) */}
        {(activeTeil.teilId === 2 || activeTeil.teilId === 'dtz_2') && (
          <div className="space-y-4">
            {activeTeil.cards.map((c, idx) => {
              const prefix = activeTeil.teilId === 'dtz_2' ? 'dtz2' : 't2';
              const qKey = `${prefix}_${idx}_q`;
              const aKey = `${prefix}_${idx}_a`;
              const isCardDone = Boolean(practicedCards[qKey] || practicedCards[aKey] || practicedCards[`${prefix}_${idx}`]);

              return (
                <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="text-xs font-black bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg uppercase">
                      Thema: {c.theme} • Wort: {c.keyword}
                    </span>
                    <div className="flex items-center gap-2">
                      {isCardDone && (
                        <span className="text-[11px] font-bold text-emerald-700 inline-flex items-center gap-1">
                          <CheckCircle2 size={13} /> Practicada
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handlePracticeMic(`${prefix}_${idx}`, c.answerPrompt)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                          speakingCardKey === `${prefix}_${idx}` && isListening
                            ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50'
                        }`}
                      >
                        <Mic size={12} /> {speakingCardKey === `${prefix}_${idx}` && isListening ? 'Detener' : 'Practicar voz'}
                      </button>
                    </div>
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

        {/* TEIL 3 / DTZ 3: BITTEN & PLANEN */}
        {(activeTeil.teilId === 3 || activeTeil.teilId === 'dtz_3') && (
          <div className="space-y-4">
            {activeTeil.cards.map((c, idx) => {
              const prefix = activeTeil.teilId === 'dtz_3' ? 'dtz3' : 't3';
              const reqKey = `${prefix}_${idx}_req`;
              const resKey = `${prefix}_${idx}_res`;

              return (
                <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-800 text-sm">
                      {c.situation} ({c.object})
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePracticeMic(`${prefix}_${idx}`, c.requestPrompt)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                        speakingCardKey === `${prefix}_${idx}` && isListening
                          ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                          : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <Mic size={12} /> Practicar diálogo
                    </button>
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

        {(speechNotice || speechError) && (
          <div aria-live="polite" className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-xs text-blue-900 flex items-center gap-2">
            <Sparkles size={15} className="shrink-0 text-blue-600" />
            <span>{speechNotice || speechError}</span>
          </div>
        )}

        {/* BARRA INFERIOR DE ACCIÓN */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-500">
            Progreso oral: {practicedUniqueCards} / {totalCardsCount} bloques escuchados o hablados con voz Charon.
          </div>

          <div className="flex items-center gap-2">
            {activeTeilIdx < currentTeils.length - 1 ? (
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
