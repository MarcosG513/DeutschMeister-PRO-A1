import { useState } from 'react';
import {
  AlertCircle,
  BookMarked,
  CheckCircle2,
  Loader2,
  Sparkles,
  Volume2,
  X,
  XCircle,
} from 'lucide-react';

const CATEGORY_BADGES = {
  article: { label: 'der / die / das', style: 'bg-blue-100 text-blue-800 border-blue-200' },
  case: { label: 'Acusativo / Dativo', style: 'bg-rose-100 text-rose-800 border-rose-200' },
  word_order: { label: 'Orden V2', style: 'bg-amber-100 text-amber-900 border-amber-200' },
  conjugation: { label: 'Conjugación', style: 'bg-purple-100 text-purple-800 border-purple-200' },
  vocab: { label: 'Vocabulario', style: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
};

/**
 * Modal unificado de Diagnóstico Post-Sesión con resumen de fluidez, misiones y guardado directo al mazo SRS.
 */
export default function SessionDiagnosticCard({
  isOpen,
  isAnalyzing = false,
  diagnostic = null,
  onPlayCorrectionAudio,
  onSaveToSrs,
  onContinue,
  onExit,
}) {
  const [selectedErrorIds, setSelectedErrorIds] = useState(() => {
    const map = {};
    (diagnostic?.errors || []).forEach((err, i) => {
      map[err.id || `err_${i}`] = true;
    });
    return map;
  });

  const [selectedVocabKeys, setSelectedVocabKeys] = useState(() => {
    const map = {};
    (diagnostic?.vocabulary || []).forEach((v, i) => {
      map[v.de || `voc_${i}`] = true;
    });
    return map;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  if (!isOpen) return null;

  const errors = diagnostic?.errors || [];
  const missions = diagnostic?.missions || [];
  const vocabulary = diagnostic?.vocabulary || [];

  const toggleError = (id) => {
    if (savedResult) return;
    setSelectedErrorIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleVocab = (key) => {
    if (savedResult) return;
    setSelectedVocabKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const chosenErrors = errors.filter((err, i) => selectedErrorIds[err.id || `err_${i}`]);
  const chosenVocab = vocabulary.filter((v, i) => selectedVocabKeys[v.de || `voc_${i}`]);
  const totalSelected = chosenErrors.length + chosenVocab.length;

  const handleSave = async () => {
    if (!onSaveToSrs || totalSelected === 0 || isSaving || savedResult) return;
    setIsSaving(true);
    try {
      const res = await onSaveToSrs({
        errors: chosenErrors,
        vocabulary: chosenVocab,
      });
      setSavedResult(res || { savedCount: totalSelected });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-diagnostic-title"
    >
      <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 max-h-[90dvh] flex flex-col overflow-hidden">
        {/* Cabecera */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <Sparkles className="text-amber-400 shrink-0" size={20} aria-hidden="true" />
            <div className="min-w-0">
              <h3 id="session-diagnostic-title" className="font-black text-base sm:text-lg truncate">
                Diagnóstico Pedagógico de Sesión
              </h3>
              {diagnostic?.title && (
                <p className="text-xs text-slate-400 truncate">{diagnostic.title}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onContinue || onExit}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
            aria-label="Cerrar diagnóstico"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cuerpo scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
          {isAnalyzing ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-indigo-600">
              <Loader2 className="animate-spin" size={38} />
              <p className="text-sm font-bold text-slate-700 text-center">
                Analizando tus estructuras A1, casos y vocabulario...
              </p>
            </div>
          ) : (
            <>
              {/* Puntuación y resumen */}
              <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-200/80 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <span className="text-xl font-black leading-none">
                    {diagnostic?.fluencyScore ?? 0}%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-85 mt-1">
                    Fluidez
                  </span>
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {diagnostic?.summaryEs || 'Buen trabajo completando tu práctica en alemán.'}
                  </p>
                  {diagnostic?.nextStepTipEs && (
                    <p className="text-[11px] text-indigo-800 font-medium leading-snug">
                      💡 {diagnostic.nextStepTipEs}
                    </p>
                  )}
                </div>
              </div>

              {/* Checklist de misiones si existen */}
              {missions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Misiones del escenario
                  </h4>
                  <div className="space-y-1.5">
                    {missions.map((m, idx) => (
                      <div
                        key={m.id || idx}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs ${
                          m.completed
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {m.completed ? (
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <span className="font-bold block">{m.titleEs}</span>
                          {m.evidenceDe && (
                            <span className="text-[11px] opacity-80 italic block mt-0.5">
                              «{m.evidenceDe}»
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Errores detectados */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-rose-500" />
                  <span>Puntos a reforzar en tu mazo SRS ({errors.length})</span>
                </h4>
                {errors.length === 0 ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                    ✨ No se detectaron errores gramaticales críticos en tus frases alemanas.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {errors.map((err, i) => {
                      const errId = err.id || `err_${i}`;
                      const checked = Boolean(selectedErrorIds[errId]);
                      const badge = CATEGORY_BADGES[err.category || err.type] || CATEGORY_BADGES.vocab;
                      return (
                        <div
                          key={errId}
                          onClick={() => toggleError(errId)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                            checked
                              ? 'bg-rose-50/50 border-rose-300'
                              : 'bg-white border-slate-200 opacity-70'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {}}
                            aria-label={`Seleccionar corrección ${err.correctedDe}`}
                            className="mt-1 h-4 w-4 accent-indigo-600 shrink-0 cursor-pointer"
                          />
                          <div className="flex-1 min-w-0 space-y-1 text-xs">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.style}`}
                              >
                                {badge.label}
                              </span>
                              {err.userAttempt && (
                                <span className="line-through text-rose-700 font-medium">
                                  {err.userAttempt}
                                </span>
                              )}
                            </div>
                            <div className="font-black text-slate-900 text-sm">{err.correctedDe}</div>
                            {err.explanationEs && (
                              <p className="text-slate-600 leading-snug">{err.explanationEs}</p>
                            )}
                          </div>
                          {onPlayCorrectionAudio && err.correctedDe && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onPlayCorrectionAudio(err.correctedDe);
                              }}
                              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 shrink-0 cursor-pointer"
                              aria-label="Escuchar forma correcta"
                            >
                              <Volume2 size={16} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Vocabulario extraído */}
              {vocabulary.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Vocabulario clave capturado ({vocabulary.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vocabulary.map((v, i) => {
                      const vKey = v.de || `voc_${i}`;
                      const checked = Boolean(selectedVocabKeys[vKey]);
                      return (
                        <div
                          key={vKey}
                          onClick={() => toggleVocab(vKey)}
                          className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center gap-2 text-xs ${
                            checked ? 'bg-indigo-50/50 border-indigo-300' : 'bg-white border-slate-200 opacity-70'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {}}
                            className="h-4 w-4 accent-indigo-600 shrink-0 cursor-pointer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-900 truncate">{v.de}</div>
                            <div className="text-[11px] text-slate-500 truncate">{v.es}</div>
                          </div>
                          {onPlayCorrectionAudio && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onPlayCorrectionAudio(v.de);
                              }}
                              className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 shrink-0 cursor-pointer"
                              aria-label={`Escuchar ${v.de}`}
                            >
                              <Volume2 size={14} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer de acciones */}
        {!isAnalyzing && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5 shrink-0">
            {totalSelected > 0 && (
              <button
                type="button"
                disabled={isSaving || Boolean(savedResult)}
                onClick={handleSave}
                className={`min-h-[44px] w-full font-black px-4 py-3 rounded-xl text-sm transition shadow flex items-center justify-center gap-2 cursor-pointer ${
                  savedResult
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Guardando en tu mazo...</span>
                  </>
                ) : savedResult ? (
                  <>
                    <CheckCircle2 size={17} />
                    <span>✓ Guardado en tu mazo SRS ({savedResult.savedCount} tarjetas)</span>
                  </>
                ) : (
                  <>
                    <BookMarked size={17} />
                    <span>Guardar {totalSelected} elementos en mi mazo SRS</span>
                  </>
                )}
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onContinue}
                className="min-h-[44px] bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                Seguir en la sesión
              </button>
              <button
                type="button"
                onClick={onExit}
                className="min-h-[44px] bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                Cerrar y Salir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
