import { useState, useEffect } from 'react';
import { ArrowRight, History, Play } from 'lucide-react';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';

const DUAL_SCENARIOS = [
  {
    id: 'alltag',
    label: 'Alltag',
    present: { subject: 'Ich', verb: 'kaufe', complement: 'eine Pizza' },
    perfekt: { auxiliary: 'habe', participle: 'gekauft' },
    praeteritum: { verb: 'kaufte', tail: '' },
    noteEs: 'En conversación diaria alemana se prefiere Perfekt («habe gekauft»).',
  },
  {
    id: 'amt',
    label: 'Bürgeramt',
    present: { subject: 'Wir', verb: 'müssen', complement: 'früh zum Amt' },
    perfekt: { auxiliary: 'sind', participle: 'gegangen' },
    praeteritum: { verb: 'mussten', tail: 'gehen' },
    noteEs: 'Los verbos modales («müssen → mussten») y «sein/haben» usan Präteritum incluso al hablar.',
  },
  {
    id: 'work',
    label: 'Técnico indoor',
    present: { subject: 'Er', verb: 'prüft', complement: 'den Speicher' },
    perfekt: { auxiliary: 'hat', participle: 'geprüft' },
    praeteritum: { verb: 'war', tail: 'fertig' },
    noteEs: 'Acciones en taller/sótano en pasado oral usan «hat ... geprüft» (Sin ge- si inseparable).',
  },
  {
    id: 'viaje',
    label: 'Viaje',
    present: { subject: 'Der Zug', verb: 'fährt', complement: 'nach Berlin' },
    perfekt: { auxiliary: 'ist', participle: 'gefahren' },
    praeteritum: { verb: 'hatte', tail: 'Verspätung' },
    noteEs: 'Movimiento («fahren») exige auxiliar «sein» («ist gefahren»), mientras «haben» usa «hatte».',
  },
];

const MechanicalTimeline = ({
  mode = 'perfekt',
  present = { subject: "Ich", verb: "kaufe", complement: "eine Pizza" },
  past = { auxiliary: "habe", participle: "gekauft" }
}) => {
  const isDualMode = mode === 'perfekt_and_praeteritum';
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [timelineVal, setTimelineVal] = useState(0);
  const [selectedTense, setSelectedTense] = useState('present'); // 'present' | 'perfekt' | 'praeteritum'

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const activeScenario = isDualMode
    ? DUAL_SCENARIOS[selectedScenarioIdx]
    : {
        present,
        perfekt: past,
        praeteritum: { verb: past.auxiliary === 'habe' ? 'hatte' : 'war', tail: '' },
        noteEs: null,
      };

  const t = isDualMode
    ? (selectedTense === 'present' ? 0 : 1)
    : parseFloat(timelineVal);

  const pos2Text = isDualMode && selectedTense === 'praeteritum'
    ? activeScenario.praeteritum.verb
    : t < 0.5
      ? activeScenario.present.verb
      : activeScenario.perfekt.auxiliary;

  const finalText = isDualMode && selectedTense === 'praeteritum'
    ? (activeScenario.praeteritum.tail || '—')
    : activeScenario.perfekt.participle;

  const showFinalBox = isDualMode
    ? (selectedTense === 'perfekt' || (selectedTense === 'praeteritum' && Boolean(activeScenario.praeteritum.tail)))
    : t >= 0.5;

  const speakSentence = () => {
    if (isDualMode) {
      if (selectedTense === 'present') {
        playGermanAudio(`${activeScenario.present.subject} ${activeScenario.present.verb} ${activeScenario.present.complement}`, { type: "sentence", voice: "Charon" });
      } else if (selectedTense === 'praeteritum') {
        playGermanAudio(`${activeScenario.present.subject} ${activeScenario.praeteritum.verb} ${activeScenario.present.complement} ${activeScenario.praeteritum.tail}`.trim(), { type: "sentence", voice: "Charon" });
      } else {
        playGermanAudio(`${activeScenario.present.subject} ${activeScenario.perfekt.auxiliary} ${activeScenario.present.complement} ${activeScenario.perfekt.participle}`, { type: "sentence", voice: "Charon" });
      }
      return;
    }
    if (t < 0.5) {
      playGermanAudio(`${activeScenario.present.subject} ${activeScenario.present.verb} ${activeScenario.present.complement}`, { type: "sentence", voice: "Charon" });
    } else {
      playGermanAudio(`${activeScenario.present.subject} ${activeScenario.perfekt.auxiliary} ${activeScenario.present.complement} ${activeScenario.perfekt.participle}`, { type: "sentence", voice: "Charon" });
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto my-6 text-left space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
          ⚙️ {isDualMode ? 'Línea Temporal: Perfekt vs Präteritum' : 'Línea de Tiempo Mecánica: Das Perfekt'}
        </h4>
        <button 
          type="button"
          onClick={speakSentence}
          className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition cursor-pointer shrink-0"
          aria-label="Escuchar oración activa en alemán"
          title="Escuchar oración activa"
        >
          <Play size={16} fill="currentColor" />
        </button>
      </div>

      {isDualMode && (
        <div className="flex flex-wrap gap-1.5">
          {DUAL_SCENARIOS.map((scen, idx) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => setSelectedScenarioIdx(idx)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                selectedScenarioIdx === idx
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {scen.label}
            </button>
          ))}
        </div>
      )}

      {/* Cajas de la Oración */}
      <div className="relative min-h-[140px] bg-white border border-slate-100 rounded-xl p-4 flex flex-col justify-between overflow-hidden">
        <div className="hidden sm:flex flex-row justify-between text-center text-[10px] font-bold text-slate-400 uppercase w-full">
          <span className="w-1/4">Posición 1</span>
          <span className="w-1/4">Posición 2</span>
          <span className="w-1/4">Complemento</span>
          <span className="w-1/4">Final Absoluto</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2 items-center my-4 relative w-full">
          <div className="w-full sm:w-1/4 lg:w-[160px] min-w-[110px] bg-blue-50 border-2 border-blue-200 text-blue-900 rounded-xl p-2 text-center font-bold text-xs sm:text-sm leading-tight">
            {activeScenario.present.subject}
            <span className="block text-[9px] font-normal text-blue-600/80 mt-0.5">Sujeto</span>
          </div>

          <div className="w-full sm:w-1/4 lg:w-[160px] min-w-[110px] relative h-[64px] flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-indigo-50 border-2 border-indigo-200 text-indigo-900 rounded-xl p-2 text-center font-bold text-xs sm:text-sm leading-tight transition-all flex flex-col justify-center items-center"
              style={{
                opacity: 1 - t,
                transform: `translateY(${-t * 20}px) scale(${1 - t * 0.2})`,
                pointerEvents: t > 0.8 ? 'none' : 'auto'
              }}
            >
              <span>{activeScenario.present.verb}</span>
              <span className="block text-[9px] font-normal text-indigo-600/80">Präsens</span>
            </div>

            <div 
              className={`absolute inset-0 border-2 text-white rounded-xl p-2 text-center font-bold text-xs sm:text-sm leading-tight transition-all flex flex-col justify-center items-center shadow-sm ${
                isDualMode && selectedTense === 'praeteritum'
                  ? 'bg-amber-600 border-amber-600'
                  : 'bg-emerald-600 border-emerald-600'
              }`}
              style={{
                opacity: t,
                transform: `translateY(${(1 - t) * 20}px) scale(${0.8 + t * 0.2})`,
                pointerEvents: t < 0.2 ? 'none' : 'auto'
              }}
            >
              <span>{pos2Text}</span>
              <span className="block text-[9px] font-normal text-white/90 mt-0.5">
                {isDualMode && selectedTense === 'praeteritum' ? 'Präteritum P2' : 'Auxiliar P2'}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-auto max-w-[95%] sm:max-w-[220px] bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-xl p-2 text-center font-bold text-xs sm:text-sm leading-tight">
            {activeScenario.present.complement}
            <span className="block text-[9px] font-normal text-slate-500 mt-0.5">Relleno</span>
          </div>

          <div className="w-full sm:w-1/4 lg:w-[160px] min-w-[110px] relative h-[64px] flex items-center justify-center">
            <div 
              className={`absolute inset-0 rounded-xl p-2 text-center font-bold text-xs sm:text-sm leading-tight transition-all flex flex-col justify-center items-center border-2 ${
                isDualMode && selectedTense === 'praeteritum'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
              style={{
                opacity: showFinalBox ? 1 : 0,
                transform: showFinalBox ? 'translateX(0) scale(1)' : 'translateX(-40px) scale(0.7)',
                pointerEvents: showFinalBox ? 'auto' : 'none'
              }}
            >
              <span>{finalText}</span>
              <span className="block text-[9px] font-normal opacity-80 mt-0.5">
                {isDualMode && selectedTense === 'praeteritum' ? 'Infinitivo / Pred.' : 'Partizip II'}
              </span>
            </div>
            
            {!showFinalBox && (
              <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[10px] text-slate-300 font-semibold uppercase">
                Vacío
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles */}
      {isDualMode ? (
        <div role="tablist" aria-label="Selector temporal" className="grid grid-cols-3 gap-2">
          {[
            { id: 'present', label: 'Presente' },
            { id: 'perfekt', label: 'Perfekt (Oral)' },
            { id: 'praeteritum', label: 'Präteritum (Modal/Sein)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selectedTense === tab.id}
              onClick={() => setSelectedTense(tab.id)}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold border-b-2 transition cursor-pointer ${
                selectedTense === tab.id
                  ? 'bg-white text-indigo-700 border-indigo-600 shadow-xs ring-1 ring-indigo-200'
                  : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-slate-500 px-1">
            <span className={t < 0.3 ? "text-indigo-600 font-black" : ""}>PRESENTE (Präsens)</span>
            <span className={t > 0.7 ? "text-emerald-600 font-black" : ""}>PASADO (Perfekt)</span>
          </div>
          
          <div className="flex items-center gap-3">
            <History size={18} className="text-slate-400" />
            <input
              type="range"
              aria-label="Deslizador temporal de presente a pasado"
              min="0"
              max="1"
              step="0.01"
              value={timelineVal}
              onChange={(e) => setTimelineVal(e.target.value)}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <ArrowRight size={18} className="text-slate-400" />
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-slate-600 leading-relaxed">
          {isDualMode ? (
            activeScenario.noteEs
          ) : t < 0.3 ? (
            <span>El verbo principal <strong>"{activeScenario.present.verb}"</strong> reina en la Posición 2.</span>
          ) : t > 0.7 ? (
            <span>El auxiliar <strong>"{activeScenario.perfekt.auxiliary}"</strong> toma la Posición 2, y el verbo original muta a <strong>"{activeScenario.perfekt.participle}"</strong> al final absoluto.</span>
          ) : (
            <span>¡Moviendo el motor verbal al final de la oración!</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MechanicalTimeline;
