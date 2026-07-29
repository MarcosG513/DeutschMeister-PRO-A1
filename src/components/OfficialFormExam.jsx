import React, { useState } from 'react';

const SCENARIOS = [
  {
    id: 'hotel',
    title: '🏨 Caso 1: Hotel-Anmeldung',
    subtitle: 'Reserva de vacaciones para la familia Rossi',
    situation: "Ihre Bekannte, Frau Elena Rossi (34) aus Italien, reist mit ihrem Ehemann und ihren zwei Kindern nach München. Sie bucht ein Hotelzimmer im 'Hotel Bayern Star' für 4 Nächte (vom 12. bis 16. Mai). Sie zahlt die Gesamtsumme direkt mit Kreditkarte.",
    formTitle: 'ANMELDEFORMULAR - HOTEL BAYERN STAR',
    prefilled: {
      Name: 'Rossi',
      Vorname: 'Elena',
      Herkunft: 'Italien',
      Adresse: 'Via Roma 12, Mailand'
    },
    fields: [
      { id: 'field_1', number: 1, label: 'Anzahl der Personen:', options: ['1', '2', '3', '4'], correct: '4', explanation: 'Elena + Ehemann + 2 Kinder = 4 Personen insgesamt.' },
      { id: 'field_2', number: 2, label: 'Anreisedatum:', options: ['10. Mai', '12. Mai', '16. Mai', '4 Nächte'], correct: '12. Mai', explanation: 'Del 12 al 16 de Mai: El día de llegada (Anreise) es el 12. Mai.' },
      { id: 'field_3', number: 3, label: 'Aufenthaltsdauer (Nächte):', options: ['2 Nächte', '4 Nächte', '12 Nächte', '16 Nächte'], correct: '4 Nächte', explanation: 'Del 12 al 16 de mayo son exactamente 4 noches.' },
      { id: 'field_4', number: 4, label: 'Reisezweck:', options: ['Geschäftsreise', 'Urlaub / Privat', 'Studium', 'Durchreise'], correct: 'Urlaub / Privat', explanation: 'Viaja con su familia de vacaciones (Urlaub).' },
      { id: 'field_5', number: 5, label: 'Zahlungsweise:', options: ['Barzahlung', 'Kreditkarte', 'Rechnung', 'Überweisung'], correct: 'Kreditkarte', explanation: 'El texto especifica: "zahlt... mit Kreditkarte".' }
    ]
  },
  {
    id: 'course',
    title: '🏫 Caso 2: Goethe-Institut Sprachkurs',
    subtitle: 'Inscripción a curso de alemán para Carlos Gómez',
    situation: "Ihr Kollege, Carlos Gómez (28) aus Kolumbien, lebt in Frankfurt. Er möchte im Juli einen Intensivkurs (Niveau A1) am Goethe-Institut besuchen. Er kann nur abends lernen und bezahlt den Kurs bar vor Ort.",
    formTitle: 'ANMELDUNG - GOETHE-INSTITUT FRANKFURT',
    prefilled: {
      Name: 'Gómez',
      Vorname: 'Carlos',
      Alter: '28 Jahre',
      Wohnort: 'Frankfurt'
    },
    fields: [
      { id: 'field_1', number: 1, label: 'Heimatland / Staatsangehörigkeit:', options: ['Deutschland', 'Kolumbien', 'Spanien', 'Mexiko'], correct: 'Kolumbien', explanation: 'El texto indica que Carlos proviene de Kolumbien.' },
      { id: 'field_2', number: 2, label: 'Gewünschtes Niveau:', options: ['Niveau A1', 'Niveau A2', 'Niveau B1', 'Niveau B2'], correct: 'Niveau A1', explanation: 'Específico en el texto: "Niveau A1".' },
      { id: 'field_3', number: 3, label: 'Kursmonat:', options: ['Juni', 'Juli', 'August', 'September'], correct: 'Juli', explanation: 'El curso es para el mes de Juli.' },
      { id: 'field_4', number: 4, label: 'Unterrichtszeit:', options: ['Morgens', 'Nachmittags', 'Abends', 'Wochenende'], correct: 'Abends', explanation: 'El texto dice: "Er kann nur abends lernen".' },
      { id: 'field_5', number: 5, label: 'Bezahlung:', options: ['Barzahlung', 'Kreditkarte', 'PayPal', 'EC-Karte'], correct: 'Barzahlung', explanation: 'El texto aclara que "bezahlt den Kurs bar".' }
    ]
  }
];

const OfficialFormExam = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [evaluated, setEvaluated] = useState(false);

  const scenario = SCENARIOS[activeScenarioIdx];

  const handleOptionChange = (fieldId, val) => {
    setAnswers(prev => ({ ...prev, [fieldId]: val }));
    setEvaluated(false);
  };

  const calculateScore = () => {
    let score = 0;
    scenario.fields.forEach(f => {
      if (answers[f.id] === f.correct) score += 1;
    });
    return score;
  };

  const score = calculateScore();

  return (
    <div className="w-full max-w-3xl mx-auto my-3 font-sans space-y-4">
      {/* Selector de Escenarios */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => {
              setActiveScenarioIdx(idx);
              setAnswers({});
              setEvaluated(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeScenarioIdx === idx
                ? 'bg-emerald-600 text-white shadow-sm scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* Tarjeta de la Situación (Texto Oficial de Examen) */}
      <div className="p-4 bg-amber-50/90 dark:bg-amber-950/40 border-l-4 border-amber-500 rounded-r-2xl shadow-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            📝 Goethe-Zertifikat A1: Schreiben Teil 1 (Situation)
          </span>
          <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
            5 Punkte
          </span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed italic font-serif">
          "{scenario.situation}"
        </p>
      </div>

      {/* Formulario Oficial impreso */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
        <div className="border-b-2 border-slate-200 dark:border-slate-800 pb-2 text-center">
          <h3 className="font-extrabold text-sm sm:text-base tracking-widest uppercase text-slate-800 dark:text-slate-100 font-mono">
            {scenario.formTitle}
          </h3>
          <p className="text-[11px] text-slate-400">Tragen Sie die fehlenden Informationen (1-5) ein</p>
        </div>

        {/* Campos Pre-llenados */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
          {Object.entries(scenario.prefilled).map(([key, val]) => (
            <div key={key} className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase">{key}:</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{val}</span>
            </div>
          ))}
        </div>

        {/* 5 Campos del Examen a Resolver */}
        <div className="space-y-3 pt-2">
          {scenario.fields.map(field => {
            const selected = answers[field.id] || '';
            const isCorrect = selected === field.correct;

            return (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs shrink-0">
                    {field.number}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {field.label}
                  </span>
                </div>

                <div className="flex flex-col sm:w-1/2">
                  <select
                    value={selected}
                    onChange={e => handleOptionChange(field.id, e.target.value)}
                    className={`w-full p-2 text-xs font-mono rounded-lg border transition-all ${
                      evaluated
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                          : 'bg-rose-50 border-rose-500 text-rose-900'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100'
                    }`}
                    disabled={evaluated}
                  >
                    <option value="">-- Bitte auswählen --</option>
                    {field.options.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {evaluated && (
                    <span className={`text-[11px] mt-1 font-medium ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isCorrect ? '✓ Richtig!' : `✗ Falsch: ${field.explanation}`}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón de Evaluación y Resultado */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={() => setEvaluated(true)}
            disabled={Object.keys(answers).length < 5}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            Überprüfen (Evaluar Examen)
          </button>

          {evaluated && (
            <div className="p-2.5 px-4 rounded-xl bg-slate-900 text-white font-mono text-xs text-center">
              Ergebnis: <strong className={score >= 4 ? 'text-emerald-400' : 'text-amber-400'}>{score} / 5 Punkte</strong>
              {score === 5 && ' 🎉 Perfekt!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficialFormExam;
