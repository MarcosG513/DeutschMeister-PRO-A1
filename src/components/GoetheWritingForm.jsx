import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, Edit3, ShieldCheck } from 'lucide-react';
import { recordGoetheScore } from '../utils/helpers';

const FORM_SCENARIOS = [
  {
    id: 'hotel_berlin',
    title: '🏨 Caso 1: Hotel-Anmeldung Berlin',
    situation: "Ihre Bekannte, Frau Eva Schneider (32) aus Österreich, reist mit ihrem Ehemann und ihren zwei Kindern nach Berlin. Sie bucht ein Familienzimmer für 3 Nächte (vom 15. bis 18. August). Sie zahlt die Gesamtsumme direkt mit Kreditkarte.",
    formTitle: "ANMELDEFORMULAR - HOTEL BERLIN ZENTRUM",
    prefilled: [
      { label: "Familienname:", value: "Schneider" },
      { label: "Vorname:", value: "Eva" },
      { label: "Herkunftsland:", value: "Österreich" }
    ],
    fields: [
      {
        id: "f1",
        number: 1,
        label: "Anzahl der Personen:",
        placeholder: "z.B. 2",
        acceptedAnswers: ["4", "4 personen", "vier", "vier personen"],
        canonicalAnswer: "4 (oder: 4 Personen)",
        explanation: "Eva + Ehemann + 2 Kinder = 4 Personen insgesamt."
      },
      {
        id: "f2",
        number: 2,
        label: "Anreisetag (Datum):",
        placeholder: "z.B. 12. Mai",
        acceptedAnswers: ["15. august", "15.08", "15.08.", "15. aug", "15.august", "15. aug."],
        canonicalAnswer: "15. August",
        explanation: "Del 15 al 18 de agosto: El día de llegada (Anreisetag) es el 15. August."
      },
      {
        id: "f3",
        number: 3,
        label: "Aufenthaltsdauer (Nächte):",
        placeholder: "z.B. 2 Nächte",
        acceptedAnswers: ["3", "3 nächte", "3 naechte", "drei", "drei nächte"],
        canonicalAnswer: "3 Nächte",
        explanation: "Del 15 al 18 de agosto son exactamente 3 noches."
      },
      {
        id: "f4",
        number: 4,
        label: "Reisezweck (Urlaub / Geschäft):",
        placeholder: "Urlaub oder Geschäft?",
        acceptedAnswers: ["urlaub", "privat", "urlaub / privat", "ferien", "urlaubsreise"],
        canonicalAnswer: "Urlaub (oder: Privat)",
        explanation: "Viaja con toda su familia de descanso (Urlaub)."
      },
      {
        id: "f5",
        number: 5,
        label: "Zahlungsweise (Bar / Karte):",
        placeholder: "z.B. Bar",
        acceptedAnswers: ["kreditkarte", "karte", "mit kreditkarte", "mit karte"],
        canonicalAnswer: "Kreditkarte",
        explanation: "El texto especifica que 'zahlt... mit Kreditkarte'."
      }
    ]
  }
];

const GoetheWritingForm = ({ onComplete }) => {
  const scenario = FORM_SCENARIOS[0];
  const [inputs, setInputs] = useState({});
  const [evaluated, setEvaluated] = useState(false);

  const handleInputChange = (fieldId, value) => {
    setInputs(prev => ({ ...prev, [fieldId]: value }));
  };

  const isFieldCorrect = (field) => {
    const val = (inputs[field.id] || '').trim().toLowerCase();
    return field.acceptedAnswers.includes(val);
  };

  const calculateScore = () => {
    let correct = 0;
    scenario.fields.forEach(f => {
      if (isFieldCorrect(f)) correct++;
    });
    return correct;
  };

  const score = calculateScore();

  const handleEvaluate = () => {
    setEvaluated(true);
    // 5 puntos del Formulario se ponderan directamente a la nota oficial
    recordGoetheScore('g_schreiben_teil1', score);
    if (onComplete) onComplete(score);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 text-slate-800 font-sans space-y-4">
      
      {/* TARJETA DE LA SITUACIÓN (TEXTO DESCRIPTIVO) */}
      <div className="p-4 sm:p-5 bg-emerald-50/80 border-l-4 border-emerald-500 rounded-r-2xl shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Edit3 size={16} /> Goethe-Zertifikat A1: Schreiben Teil 1
          </span>
          <span className="text-[11px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
            5 Punkte
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
          {scenario.situation}
        </p>
      </div>

      {/* FORMULARIO OFICIAL (ESTRUCTURA DE HOJA OFICIAL DE EXAMEN) */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
        <div className="text-center border-b-2 border-slate-200 pb-3">
          <h4 className="font-mono text-xs sm:text-sm font-black text-slate-800 tracking-wider">
            {scenario.formTitle}
          </h4>
        </div>

        {/* CAMPOS PRE-RELLENADOS POR EL EXAMINADOR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
          {scenario.prefilled.map((pf, idx) => (
            <div key={idx}>
              <span className="text-slate-400 block">{pf.label}</span>
              <span className="font-bold text-slate-800 text-sm font-mono">{pf.value}</span>
            </div>
          ))}
        </div>

        {/* LOS 5 CAMPOS INTERACTIVOS A RELLENAR */}
        <div className="space-y-3.5 pt-2">
          {scenario.fields.map((f) => {
            const val = inputs[f.id] || '';
            const correct = evaluated ? isFieldCorrect(f) : null;

            return (
              <div 
                key={f.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  evaluated 
                    ? correct 
                      ? 'bg-emerald-50/60 border-emerald-300' 
                      : 'bg-rose-50/60 border-rose-300'
                    : 'bg-white border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                      {f.number}
                    </span>
                    <span>{f.label}</span>
                  </label>

                  <div className="relative sm:w-64">
                    <input
                      type="text"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      inputMode="text"
                      placeholder={f.placeholder}
                      value={val}
                      onChange={(e) => handleInputChange(f.id, e.target.value)}
                      disabled={evaluated}
                      className={`w-full px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg border outline-none transition ${
                        evaluated
                          ? correct
                            ? 'bg-white border-emerald-500 text-emerald-900'
                            : 'bg-white border-rose-500 text-rose-900'
                          : 'bg-slate-50 border-slate-300 focus:bg-white focus:border-emerald-500 text-slate-800'
                      }`}
                    />
                    {evaluated && (
                      <span className="absolute right-2.5 top-2.5">
                        {correct ? (
                          <CheckCircle2 size={16} className="text-emerald-600" />
                        ) : (
                          <XCircle size={16} className="text-rose-600" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* SOLUCIÓN Y EXPLICACIÓN AL EVALUAR */}
                {evaluated && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs">
                    <p className={correct ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {correct ? '✓ Correcto' : `✗ Respuesta esperada: ${f.canonicalAnswer}`}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{f.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BARRA DE ACCIÓN Y PUNTUACIÓN */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
          <div>
            {evaluated ? (
              <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                <Award className="text-emerald-600" size={20} />
                <span>Puntuación Teil 1: {score} de 5 Puntos</span>
              </div>
            ) : (
              <span className="text-xs text-slate-500 font-medium">
                Completa los 5 campos en alemán según la situación.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {evaluated ? (
              <button
                type="button"
                onClick={() => {
                  setInputs({});
                  setEvaluated(false);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Reintentar Formulario</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEvaluate}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Verificar Formulario (5 Pts)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoetheWritingForm;
