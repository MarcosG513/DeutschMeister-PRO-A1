import { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, Edit3, ChevronRight, Check } from 'lucide-react';
import { FORM_SCENARIOS, isAnswerCorrect } from '../data/goetheWritingScenarios';
import { scrollInputIntoView } from '../utils/helpers';

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
                  onFocus={scrollInputIntoView}
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
