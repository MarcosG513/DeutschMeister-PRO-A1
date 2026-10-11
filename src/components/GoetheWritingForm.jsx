import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, Edit3, ChevronRight, Check } from 'lucide-react';
import { recordGoetheScore } from '../utils/helpers';

export const FORM_SCENARIOS = [
  {
    id: 'schwimmkurs_becker',
    tabTitle: '1. Schwimmkurs',
    badge: 'Szenario 1',
    title: '🏊‍♂️ Anmeldung zum Schwimmkurs',
    subTitle: 'Familie Becker (TSV München)',
    situation: 'Ihre Nachbarin, Frau Lubna Becker, möchte ihren 6-jährigen Sohn Felix für einen Kinderschwimmkurs beim TSV München anmelden. Das Kind ist am 14.05.2018 geboren. Die Familie Becker wohnt in der Goethestraße 12 in 80331 München. Frau Becker bezahlt die Kursgebühr von 55 Euro bar bei der Anmeldung.',
    formTitle: 'ANMELDEFORMULAR - TSV MÜNCHEN KINDERSCHWIMMEN',
    prefilled: [
      { label: 'Vorname des Kindes:', value: 'Felix' },
      { label: 'Alter des Kindes:', value: '6 Jahre' },
      { label: 'Wohnort:', value: 'München' }
    ],
    fields: [
      {
        id: 's1_f1',
        number: 1,
        label: 'Familienname des Kindes:',
        placeholder: 'z.B. Becker',
        acceptedAnswers: ['becker', 'familie becker'],
        canonicalAnswer: 'Becker',
        explanation: 'Frau Lubna Becker meldet ihr Kind an. Der gesuchte Familienname (Apellido) ist Becker.'
      },
      {
        id: 's1_f2',
        number: 2,
        label: 'Geburtsdatum des Kindes:',
        placeholder: 'z.B. 14.05.2018',
        acceptedAnswers: [
          '14.05.2018',
          '14. mai 2018',
          '14.05.18',
          '14.5.2018',
          '14/05/2018',
          '14-05-2018',
          '14 mai 2018',
          '14.mai 2018'
        ],
        canonicalAnswer: '14.05.2018 (oder: 14. Mai 2018)',
        explanation: 'Das Kind ist am 14.05.2018 geboren. En Alemania el formato estándar es DD.MM.AAAA.'
      },
      {
        id: 's1_f3',
        number: 3,
        label: 'Straße und Hausnummer:',
        placeholder: 'z.B. Goethestraße 12',
        acceptedAnswers: [
          'goethestraße 12',
          'goethestr. 12',
          'goethestrasse 12',
          'goethestr 12',
          'goethestraße12',
          'goethestr.12',
          'goethe str. 12',
          'goethe strasse 12'
        ],
        canonicalAnswer: 'Goethestraße 12',
        explanation: 'Die Adresse ist Goethestraße 12. Debe incluir el nombre de la calle y el número de casa.'
      },
      {
        id: 's1_f4',
        number: 4,
        label: 'Postleitzahl (PLZ):',
        placeholder: 'z.B. 80331',
        acceptedAnswers: ['80331', 'plz 80331'],
        canonicalAnswer: '80331',
        explanation: 'La PLZ (Postleitzahl o código postal) de la dirección en Múnich es exactamente 80331.'
      },
      {
        id: 's1_f5',
        number: 5,
        label: 'Zahlungsweise (Bar / Überweisung):',
        placeholder: 'z.B. Bar',
        acceptedAnswers: ['bar', 'barzahlung', 'überweisung', 'ueberweisung', 'in bar', 'bar vor ort'],
        canonicalAnswer: 'Bar (oder: Barzahlung / Überweisung)',
        explanation: 'El texto especifica que Frau Becker paga "bar bei der Anmeldung" (en efectivo).'
      }
    ]
  },
  {
    id: 'sprachschule_goethe',
    tabTitle: '2. Sprachschule',
    badge: 'Szenario 2',
    title: '🇩🇪 Sprachschule Anmeldung',
    subTitle: 'Goethe-Institut München',
    situation: 'Carlos Gómez (24 Jahre alt), ein Student aus Kolumbien, wohnt zurzeit in München. Er möchte sich am Goethe-Institut für einen Intensivkurs Deutsch A1 anmelden. Er bevorzugt Unterricht am Vormittag (9:00 bis 12:30 Uhr). Die Kursgebühr von 380 Euro bezahlt er mit Kreditkarte.',
    formTitle: 'KURS-ANMELDUNG - GOETHE-INSTITUT MÜNCHEN',
    prefilled: [
      { label: 'Familienname:', value: 'Gómez' },
      { label: 'Alter:', value: '24 Jahre' },
      { label: 'Kursort:', value: 'München' }
    ],
    fields: [
      {
        id: 's2_f1',
        number: 1,
        label: 'Vorname:',
        placeholder: 'z.B. Carlos',
        acceptedAnswers: ['carlos', 'carlos gomez', 'carlos gómez'],
        canonicalAnswer: 'Carlos',
        explanation: 'Der Vorname (nombre de pila) del estudiante es Carlos.'
      },
      {
        id: 's2_f2',
        number: 2,
        label: 'Herkunftsland / Staatsangehörigkeit:',
        placeholder: 'z.B. Kolumbien',
        acceptedAnswers: ['kolumbien', 'kolumbianisch', 'colombia', 'colombiano'],
        canonicalAnswer: 'Kolumbien (oder: kolumbianisch)',
        explanation: 'Carlos kommt aus Kolumbien (Herkunftsland: Kolumbien).'
      },
      {
        id: 's2_f3',
        number: 3,
        label: 'Gewünschter Kurs:',
        placeholder: 'z.B. Intensivkurs A1',
        acceptedAnswers: ['intensivkurs a1', 'a1', 'deutsch a1', 'intensivkurs', 'deutsch-intensivkurs a1', 'deutschkurs a1'],
        canonicalAnswer: 'Intensivkurs A1 (oder: Deutsch A1)',
        explanation: 'Möchte einen Intensivkurs Deutsch A1 belegen.'
      },
      {
        id: 's2_f4',
        number: 4,
        label: 'Kurszeit:',
        placeholder: 'z.B. Vormittag',
        acceptedAnswers: ['vormittag', 'morgens', 'vormittags', 'am vormittag', 'am morgen'],
        canonicalAnswer: 'Vormittag (oder: morgens / vormittags)',
        explanation: 'Bevorzugt Unterricht am Vormittag (horario matutino de 9:00 a 12:30 Uhr).'
      },
      {
        id: 's2_f5',
        number: 5,
        label: 'Zahlungsmethode:',
        placeholder: 'z.B. Kreditkarte',
        acceptedAnswers: ['kreditkarte', 'karte', 'mit karte', 'mit kreditkarte'],
        canonicalAnswer: 'Kreditkarte (oder: Karte / mit Karte)',
        explanation: 'Der Text besagt: Er zahlt die Gebühr mit Kreditkarte.'
      }
    ]
  },
  {
    id: 'hotel_alpenblick',
    tabTitle: '3. Hotel Alpenblick',
    badge: 'Szenario 3',
    title: '🏔️ Hotelreservierung',
    subTitle: 'Hotel Alpenblick, Garmisch',
    situation: 'Herr Thomas Weber aus Hamburg plant ein erholsames Wochenende in Bayern. Er bucht für sich allein ein Einzelzimmer im Hotel Alpenblick in Garmisch für 2 Nächte (vom 12. bis 14. November). Er möchte das Frühstücksbüfett im Hotel nutzen (Frühstück inklusive).',
    formTitle: 'ZIMMERRESERVIERUNG - HOTEL ALPENBLICK GARMISCH',
    prefilled: [
      { label: 'Vorname:', value: 'Thomas' },
      { label: 'Heimatort:', value: 'Hamburg' },
      { label: 'Anreisetag:', value: '12. November' }
    ],
    fields: [
      {
        id: 's3_f1',
        number: 1,
        label: 'Nachname:',
        placeholder: 'z.B. Weber',
        acceptedAnswers: ['weber', 'herr weber', 'thomas weber'],
        canonicalAnswer: 'Weber',
        explanation: 'Der Gast heißt Thomas Weber. Nachname = Weber.'
      },
      {
        id: 's3_f2',
        number: 2,
        label: 'Anzahl der Personen:',
        placeholder: 'z.B. 1 Person',
        acceptedAnswers: ['1', 'eine person', '1 person', 'eine', 'eins', '1 pers.'],
        canonicalAnswer: '1 (oder: 1 Person / Eine Person)',
        explanation: 'Er reist für sich allein: genau 1 Person.'
      },
      {
        id: 's3_f3',
        number: 3,
        label: 'Zimmerart:',
        placeholder: 'z.B. Einzelzimmer',
        acceptedAnswers: ['einzelzimmer', 'einzel-zimmer', 'ez', '1 einzelzimmer'],
        canonicalAnswer: 'Einzelzimmer',
        explanation: 'Er bucht für sich allein ein Einzelzimmer (habitación individual).'
      },
      {
        id: 's3_f4',
        number: 4,
        label: 'Aufenthaltsdauer (Nächte):',
        placeholder: 'z.B. 2 Nächte',
        acceptedAnswers: ['2', '2 nächte', '2 naechte', 'zwei', 'zwei nächte', 'zwei naechte'],
        canonicalAnswer: '2 (oder: 2 Nächte / zwei)',
        explanation: 'Vom 12. bis 14. November sind es 2 Nächte.'
      },
      {
        id: 's3_f5',
        number: 5,
        label: 'Frühstück erwünscht (Ja/Nein):',
        placeholder: 'z.B. Ja',
        acceptedAnswers: ['ja', 'inklusive', 'mit frühstück', 'mit fruehstueck', 'ja, inklusive', 'ja inklusive'],
        canonicalAnswer: 'Ja (oder: inklusive / mit Frühstück)',
        explanation: 'Frühstück erwünscht? Ja, da er das Frühstücksbüfett bucht.'
      }
    ]
  },
  {
    id: 'stadtbibliothek_muenchen',
    tabTitle: '4. Stadtbibliothek',
    badge: 'Szenario 4',
    title: '📚 Stadtbibliothek München',
    subTitle: 'Bibliotheksausweis',
    situation: 'Frau Elena Rossi (28 Jahre) kommt aus Italien und arbeitet in München als Architektin. Sie wohnt in der Leopoldstraße 45. Da sie an der Universität zusätzlich noch studiert, beantragt sie ihren Bibliotheksausweis mit Studierenden-Ermäßigung.',
    formTitle: 'ANTRAG AUF BIBLIOTHEKSAUSWEIS - STADTBIBLIOTHEK MÜNCHEN',
    prefilled: [
      { label: 'Familienname:', value: 'Rossi' },
      { label: 'Geburtsland:', value: 'Italien' },
      { label: 'Alter:', value: '28 Jahre' }
    ],
    fields: [
      {
        id: 's4_f1',
        number: 1,
        label: 'Vorname:',
        placeholder: 'z.B. Elena',
        acceptedAnswers: ['elena'],
        canonicalAnswer: 'Elena',
        explanation: 'Die Antragstellerin heißt Elena Rossi. Vorname = Elena.'
      },
      {
        id: 's4_f2',
        number: 2,
        label: 'Wohnort:',
        placeholder: 'z.B. München',
        acceptedAnswers: ['münchen', 'muenchen', 'munich'],
        canonicalAnswer: 'München',
        explanation: 'Sie wohnt und arbeitet in München.'
      },
      {
        id: 's4_f3',
        number: 3,
        label: 'Straße und Hausnummer:',
        placeholder: 'z.B. Leopoldstraße 45',
        acceptedAnswers: [
          'leopoldstraße 45',
          'leopoldstr. 45',
          'leopoldstrasse 45',
          'leopoldstr 45',
          'leopoldstraße45',
          'leopoldstr.45',
          'leopold str. 45'
        ],
        canonicalAnswer: 'Leopoldstraße 45 (oder: Leopoldstr. 45)',
        explanation: 'Ihre Wohnadresse ist die Leopoldstraße 45.'
      },
      {
        id: 's4_f4',
        number: 4,
        label: 'Beruf:',
        placeholder: 'z.B. Architektin',
        acceptedAnswers: ['architektin', 'studentin', 'architektin / studentin', 'architektin und studentin'],
        canonicalAnswer: 'Architektin (oder: Studentin)',
        explanation: 'Sie arbeitet als Architektin und studiert an der Universität.'
      },
      {
        id: 's4_f5',
        number: 5,
        label: 'Ermäßigung (Ja/Nein):',
        placeholder: 'z.B. Ja',
        acceptedAnswers: ['ja', 'ja, bitte', 'mit ermäßigung', 'mit ermaessigung', 'ja bitte'],
        canonicalAnswer: 'Ja',
        explanation: 'Ermäßigung (descuento)? Ja, beantragt Ermäßigung für Studierende.'
      }
    ]
  }
];

// Helper normalizador tolerante para variantes habituales
export const normalizeAnswer = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
    .replace(/ß/g, 'ss')
    .replace(/stra(ss|ß)e/g, 'strasse')
    .replace(/str(\.|\b)/g, 'strasse')
    .replace(/[.,;:_#\-–—/()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const isAnswerCorrect = (field, userInput) => {
  if (!userInput || typeof userInput !== 'string') return false;
  const raw = userInput.trim().toLowerCase();
  if (field.acceptedAnswers.some(ans => ans.toLowerCase().trim() === raw)) {
    return true;
  }
  const normUser = normalizeAnswer(userInput);
  return field.acceptedAnswers.some(ans => normalizeAnswer(ans) === normUser);
};

const GoetheWritingForm = ({ onComplete }) => {
  const [activeScenarioId, setActiveScenarioId] = useState(FORM_SCENARIOS[0].id);
  const [inputsByScenario, setInputsByScenario] = useState({});
  const [evaluatedByScenario, setEvaluatedByScenario] = useState({});

  const activeScenario = FORM_SCENARIOS.find(s => s.id === activeScenarioId) || FORM_SCENARIOS[0];
  const currentInputs = inputsByScenario[activeScenario.id] || {};
  const isEvaluated = Boolean(evaluatedByScenario[activeScenario.id]);

  const handleInputChange = (fieldId, value) => {
    setInputsByScenario(prev => ({
      ...prev,
      [activeScenario.id]: {
        ...(prev[activeScenario.id] || {}),
        [fieldId]: value
      }
    }));
  };

  const calculateScenarioScore = (scenario) => {
    const inputs = inputsByScenario[scenario.id] || {};
    let correct = 0;
    scenario.fields.forEach(f => {
      if (isAnswerCorrect(f, inputs[f.id])) {
        correct++;
      }
    });
    return correct;
  };

  const currentScore = calculateScenarioScore(activeScenario);

  const handleEvaluate = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEvaluatedByScenario(prev => ({
      ...prev,
      [activeScenario.id]: true
    }));
    recordGoetheScore('g_schreiben_teil1', currentScore);
  };

  const handleRetry = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setInputsByScenario(prev => ({
      ...prev,
      [activeScenario.id]: {}
    }));
    setEvaluatedByScenario(prev => ({
      ...prev,
      [activeScenario.id]: false
    }));
  };

  const handleContinueTeil2 = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onComplete) {
      onComplete(currentScore);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-3 text-slate-800 font-sans space-y-4">
      
      {/* SELECTOR DE ESCENARIOS (PILLS / TABS) */}
      <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
          {FORM_SCENARIOS.map((scen, idx) => {
            const isActive = scen.id === activeScenario.id;
            const isScenEvaluated = Boolean(evaluatedByScenario[scen.id]);
            const scenScore = calculateScenarioScore(scen);

            return (
              <button
                key={scen.id}
                type="button"
                onClick={() => setActiveScenarioId(scen.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600/30'
                    : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200/70'
                }`}
              >
                <span>{scen.tabTitle}</span>
                {isScenEvaluated ? (
                  <span
                    className={`inline-flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-emerald-700/80 text-emerald-100'
                        : scenScore === 5
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {scenScore === 5 ? <Check size={11} strokeWidth={3} /> : null}
                    {scenScore}/5
                  </span>
                ) : (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-emerald-700/60 text-emerald-200' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TARJETA DE LA SITUACIÓN (TEXTO DESCRIPTIVO) */}
      <div className="p-4 sm:p-5 bg-emerald-50/90 border-l-4 border-emerald-500 rounded-r-2xl shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
            <Edit3 size={16} className="text-emerald-700" />
            Goethe-Zertifikat A1: Schreiben Teil 1
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              {activeScenario.badge}
            </span>
            <span className="text-[11px] bg-emerald-700 text-white font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              5 Punkte
            </span>
          </div>
        </div>

        <div className="pt-1">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>{activeScenario.title}</span>
            <span className="text-xs font-medium text-slate-500">({activeScenario.subTitle})</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif mt-1.5 bg-white/70 p-3 rounded-xl border border-emerald-200/50">
            {activeScenario.situation}
          </p>
        </div>
      </div>

      {/* FORMULARIO OFICIAL (ESTRUCTURA DE HOJA OFICIAL DE EXAMEN) */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 sm:p-7 shadow-sm space-y-4">
        <div className="text-center border-b-2 border-slate-200 pb-3">
          <h4 className="font-mono text-xs sm:text-sm font-black text-slate-800 tracking-wider">
            {activeScenario.formTitle}
          </h4>
        </div>

        {/* CAMPOS PRE-RELLENADOS POR EL EXAMINADOR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
          {activeScenario.prefilled.map((pf, idx) => (
            <div key={idx} className="bg-white/80 p-2 rounded-lg border border-slate-200/60">
              <span className="text-slate-400 block text-[11px] font-medium">{pf.label}</span>
              <span className="font-bold text-slate-800 text-sm font-mono mt-0.5 block">{pf.value}</span>
            </div>
          ))}
        </div>

        {/* LOS 5 CAMPOS INTERACTIVOS A RELLENAR */}
        <div className="space-y-3 pt-2">
          {activeScenario.fields.map((f) => {
            const val = currentInputs[f.id] || '';
            const correct = isEvaluated ? isAnswerCorrect(f, val) : null;

            return (
              <div
                key={f.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isEvaluated
                    ? correct
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-rose-50/70 border-rose-300'
                    : 'bg-white border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                      {f.number}
                    </span>
                    <span>{f.label}</span>
                  </label>

                  <div className="relative sm:w-72">
                    <input
                      type="text"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      inputMode="text"
                      placeholder={f.placeholder}
                      value={val}
                      onChange={(e) => handleInputChange(f.id, e.target.value)}
                      disabled={isEvaluated}
                      className={`w-full px-3.5 py-2.5 pr-9 text-xs sm:text-sm font-bold rounded-lg border outline-none transition ${
                        isEvaluated
                          ? correct
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-rose-500 bg-rose-50 text-rose-900'
                          : 'bg-slate-50 border-slate-300 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-slate-800'
                      }`}
                    />
                    {isEvaluated && (
                      <span className="absolute right-3 top-3 pointer-events-none">
                        {correct ? (
                          <CheckCircle2 size={18} className="text-emerald-600" />
                        ) : (
                          <XCircle size={18} className="text-rose-600" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* SOLUCIÓN Y EXPLICACIÓN AL EVALUAR */}
                {isEvaluated && (
                  <div
                    className={`mt-2.5 pt-2 border-t text-xs flex items-start gap-2 ${
                      correct ? 'border-emerald-200/80 text-emerald-900' : 'border-rose-200/80 text-rose-900'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {correct ? (
                        <CheckCircle2 size={15} className="text-emerald-600" />
                      ) : (
                        <XCircle size={15} className="text-rose-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold">
                        {correct ? (
                          <span className="text-emerald-800">✓ ¡Correcto! (+1 Punkt)</span>
                        ) : (
                          <span className="text-rose-800">
                            ✗ Respuesta esperada: <span className="underline font-black">{f.canonicalAnswer}</span>
                          </span>
                        )}
                      </p>
                      <p className={`text-[11px] mt-0.5 ${correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {f.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BARRA DE ACCIÓN Y PUNTUACIÓN */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-200">
          <div>
            {isEvaluated ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Award className="text-emerald-700" size={20} />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                    Puntuación: {currentScore} de 5 Puntos ({Math.round((currentScore / 5) * 100)}%)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {currentScore === 5 ? '¡Excelente trabajo! Todo correcto.' : 'Revisa las respuestas incorrectas o prueba otro escenario.'}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-slate-500 font-medium">
                Completa los 5 campos en alemán según la situación descrita.
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isEvaluated ? (
              <>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <RotateCcw size={14} />
                  <span>Reintentar escenario</span>
                </button>
                <button
                  type="button"
                  onClick={handleContinueTeil2}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2.5 rounded-xl text-xs transition shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <span>Continuar al Teil 2 (E-Mail)</span>
                  <ChevronRight size={15} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEvaluate}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
              >
                Calificar Escenario (5 Pts)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoetheWritingForm;
