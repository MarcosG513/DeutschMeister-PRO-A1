import { useEffect, useRef, useState } from 'react';
import {
  BookmarkPlus,
  Camera,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../config/firebase';
import { compressImageFileToJpegBase64 } from '../../utils/imageCompressor';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import {
  createPrewarmedCallAudioElement,
  playGermanAudio,
  playTextOnPrewarmedAudio,
  stopPrewarmedCallAudio,
} from '../../services/aiAudioService';
import {
  captureConversationBundle,
  captureVocabToSrs,
} from '../../services/srsBridgeService';
import {
  recordDailyStudyActivity,
  recordSkillActivity,
  scrollInputIntoView,
} from '../../utils/helpers';

const PHOTO_PROMPTS = [
  'Auf dem Foto sehe ich einen Schreibtisch mit einem Laptop.',
  'Im Technikraum hängt ein Wechselrichter an der Wand.',
  'Auf dem Tisch stehen eine Tasse Kaffee und ein Buch.',
];

export default function PhotoPracticePanel() {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const previewAudioRef = useRef(null);

  const [photoData, setPhotoData] = useState(null); // { dataUrl, base64, width, height, approxBytes }
  const [descriptionDe, setDescriptionDe] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [savedTermsMap, setSavedTermsMap] = useState({});
  const [bundleSaved, setBundleSaved] = useState(false);

  const {
    isListening,
    error: speechError,
    startListening,
    stopListening,
  } = useSpeechRecognition('de-DE');

  useEffect(() => {
    return () => {
      stopPrewarmedCallAudio(previewAudioRef.current);
      previewAudioRef.current = null;
    };
  }, []);

  const handleImagePicked = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setErrorMsg(null);
    setAnalysis(null);
    setBundleSaved(false);
    setIsCompressing(true);
    try {
      const compressed = await compressImageFileToJpegBase64(file, {
        maxDimension: 768,
        quality: 0.76,
      });
      setPhotoData(compressed);
    } catch (err) {
      setErrorMsg(err?.message || 'No se pudo procesar la foto seleccionada.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening((spoken) => {
      if (!spoken) return;
      setDescriptionDe((prev) => (prev ? `${prev} ${spoken}` : spoken));
    });
  };

  const handleAnalyzePhoto = async () => {
    if (!photoData?.base64) {
      setErrorMsg('Haz una foto o elige una imagen primero.');
      return;
    }
    if (!descriptionDe.trim()) {
      setErrorMsg('Describe la foto en alemán (por voz o texto) antes de analizar.');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setErrorMsg('Sin conexión a internet: el análisis visual requiere red.');
      return;
    }

    setErrorMsg(null);
    setIsAnalyzing(true);
    setBundleSaved(false);
    try {
      const analyzeFn = httpsCallable(functions, 'analyzePhotoDescription');
      const res = await analyzeFn({
        imageBase64: photoData.base64,
        userDescriptionDe: descriptionDe.trim(),
      });
      setAnalysis(res?.data || null);
      recordDailyStudyActivity().catch(() => {});
      recordSkillActivity('writing', 5).catch(() => {});
    } catch (err) {
      setErrorMsg(
        err?.message || 'No se pudo analizar la fotografía. Inténtalo de nuevo.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSpeakEphemeralSentence = async (textDe) => {
    if (!textDe) return;
    if (!previewAudioRef.current) {
      previewAudioRef.current = createPrewarmedCallAudioElement();
    }
    await playTextOnPrewarmedAudio(previewAudioRef.current, textDe, {
      lang: 'de',
    });
  };

  const handleSaveSingleTerm = async (item) => {
    if (!item?.de) return;
    const termFull = item.article && !item.de.toLowerCase().startsWith(item.article.toLowerCase())
      ? `${item.article} ${item.de}`
      : item.de;
    await captureVocabToSrs({
      termDe: termFull,
      audioDe: item.exampleDe || termFull,
      translationEs: item.es,
      axis: 'general',
      source: 'photo_ocr',
      sourceRef: 'photo_scene',
    });
    setSavedTermsMap((prev) => ({ ...prev, [item.de]: true }));
  };

  const handleSaveAllToSrs = async () => {
    if (!analysis) return;
    await captureConversationBundle({
      vocabItems: (analysis.sceneVocabulary || []).map((v) => ({
        termDe:
          v.article && !v.de.toLowerCase().startsWith(v.article.toLowerCase())
            ? `${v.article} ${v.de}`
            : v.de,
        audioDe: v.exampleDe || v.de,
        translationEs: v.es,
      })),
      grammarErrors: (analysis.errors || []).map((e) => ({
        userAttempt: e.original || '',
        correctedDe: e.corrected || '',
        explanationEs: e.explanationEs || '',
        category: e.category || 'vocab',
      })),
      axis: 'general',
      source: 'photo_ocr',
      sourceRef: 'photo_analysis',
    });
    const nextMap = {};
    (analysis.sceneVocabulary || []).forEach((v) => {
      nextMap[v.de] = true;
    });
    setSavedTermsMap((prev) => ({ ...prev, ...nextMap }));
    setBundleSaved(true);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 custom-scrollbar">
      {/* Encabezado informativo privacidad + compresión */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950 space-y-1">
        <div className="font-black flex items-center gap-1.5 text-amber-900">
          <Sparkles size={14} aria-hidden="true" />
          <span>Modo Foto Multimodal · Describe lo que ves en alemán</span>
        </div>
        <p className="leading-relaxed">
          La foto se comprime en tu dispositivo (&lt;=768px JPEG) y se analiza en memoria sin guardarse nunca en la nube.
        </p>
      </div>

      {/* Inputs ocultos de cámara y galería */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImagePicked}
        className="hidden"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleImagePicked}
        className="hidden"
      />

      {/* Selector de imagen */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
        {photoData ? (
          <div className="space-y-2.5">
            <img
              src={photoData.dataUrl}
              alt="Fotografía seleccionada para describir en alemán"
              className="w-full max-h-60 object-contain rounded-xl bg-slate-100 border border-slate-200"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-500">
                {photoData.width}×{photoData.height}px · {Math.round(photoData.approxBytes / 1024)} KB JPEG
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="min-h-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera size={14} aria-hidden="true" />
                  <span>Nueva foto</span>
                </button>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="min-h-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ImagePlus size={14} aria-hidden="true" />
                  <span>Galería</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              disabled={isCompressing}
              onClick={() => cameraInputRef.current?.click()}
              className="min-h-[84px] p-3 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/70 hover:bg-amber-100/70 text-amber-950 font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 cursor-pointer transition"
            >
              {isCompressing ? (
                <Loader2 size={20} className="animate-spin" aria-hidden="true" />
              ) : (
                <Camera size={22} aria-hidden="true" />
              )}
              <span>Tomar Foto</span>
            </button>
            <button
              type="button"
              disabled={isCompressing}
              onClick={() => galleryInputRef.current?.click()}
              className="min-h-[84px] p-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 cursor-pointer transition"
            >
              <ImagePlus size={22} aria-hidden="true" />
              <span>Elegir de Galería</span>
            </button>
          </div>
        )}

        {/* Entrada oral / escrita */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label htmlFor="photo-desc-input" className="block text-xs font-bold text-slate-700">
            Tu descripción en alemán:
          </label>
          <div className="flex items-center gap-2">
            <input
              id="photo-desc-input"
              type="text"
              value={descriptionDe}
              onFocus={scrollInputIntoView}
              onChange={(e) => setDescriptionDe(e.target.value)}
              placeholder="Ej: Auf dem Foto sehe ich einen Wechselrichter..."
              className="flex-1 min-w-0 min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none text-base text-slate-900 bg-white"
            />
            <button
              type="button"
              onClick={handleMicToggle}
              aria-label={isListening ? 'Detener dictado' : 'Dictar descripción en alemán'}
              className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center cursor-pointer transition ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isListening ? <MicOff size={18} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />}
            </button>
          </div>

          {speechError && (
            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
              {speechError}
            </p>
          )}

          {/* Ejemplos de arranque */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {PHOTO_PROMPTS.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setDescriptionDe(sample)}
                className="shrink-0 min-h-[36px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={isAnalyzing || isCompressing || !photoData}
            onClick={handleAnalyzePhoto}
            className="w-full min-h-[46px] rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                <span>Analizando escena con Gemini Vision...</span>
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                <span>Analizar Foto y Corregir</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-semibold flex items-center gap-2">
          <XCircle size={16} className="text-rose-600 shrink-0" aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Resultados estructurados */}
      {analysis && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-xs" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <span className="text-sm font-black text-slate-900">
              Puntuación visual A1: <span className="text-amber-600">{analysis.overallScore}/100</span>
            </span>
            <span
              className={`text-[11px] font-black px-2.5 py-1 rounded-full ${
                analysis.matchesScene
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {analysis.matchesScene ? '✓ Coincide con la escena' : '⚠ Detalles mejorables'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase text-emerald-800">
                  Tu frase mejorada:
                </span>
                <button
                  type="button"
                  onClick={() => handleSpeakEphemeralSentence(analysis.correctedDescriptionDe)}
                  aria-label="Escuchar descripción corregida"
                  className="min-h-[36px] px-2.5 rounded-lg bg-white border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 size={13} aria-hidden="true" />
                  <span>Oír Charon</span>
                </button>
              </div>
              <p className="text-sm font-bold text-slate-900">{analysis.correctedDescriptionDe}</p>
            </div>

            {analysis.idealA1ExampleDe && (
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase text-sky-800">
                    Modelo A1 Ideal:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSpeakEphemeralSentence(analysis.idealA1ExampleDe)}
                    aria-label="Escuchar ejemplo ideal"
                    className="min-h-[36px] px-2.5 rounded-lg bg-white border border-sky-200 text-sky-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 size={13} aria-hidden="true" />
                    <span>Oír Charon</span>
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-900">{analysis.idealA1ExampleDe}</p>
              </div>
            )}

            {analysis.feedbackEs && (
              <p className="text-xs text-slate-700 leading-relaxed">{analysis.feedbackEs}</p>
            )}
          </div>

          {/* Errores gramaticales */}
          {Array.isArray(analysis.errors) && analysis.errors.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-black uppercase text-rose-700">Correcciones:</h4>
              {analysis.errors.map((err, idx) => (
                <div key={err.id || idx} className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-0.5">
                  <div>
                    <span className="line-through text-rose-700 mr-1.5">{err.original}</span>
                    <span className="font-bold text-emerald-800">→ {err.corrected}</span>
                  </div>
                  <p className="text-slate-600">{err.explanationEs}</p>
                </div>
              ))}
            </div>
          )}

          {/* Vocabulario de la escena + Captura SRS */}
          {Array.isArray(analysis.sceneVocabulary) && analysis.sceneVocabulary.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-black uppercase text-indigo-800">
                  Vocabulario de esta escena ({analysis.sceneVocabulary.length})
                </h4>
                <button
                  type="button"
                  onClick={handleSaveAllToSrs}
                  className={`min-h-[44px] px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition ${
                    bundleSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {bundleSaved ? (
                    <>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      <span>Guardado en SRS</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus size={15} aria-hidden="true" />
                      <span>Guardar escena en mi mazo SRS</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                {analysis.sceneVocabulary.map((item) => {
                  const fullTerm =
                    item.article && !item.de.toLowerCase().startsWith(item.article.toLowerCase())
                      ? `${item.article} ${item.de}`
                      : item.de;
                  const saved = Boolean(savedTermsMap[item.de]);
                  return (
                    <div
                      key={item.de}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-slate-900">
                          {fullTerm} <span className="font-normal text-slate-600">— {item.es}</span>
                        </div>
                        {item.exampleDe && (
                          <div className="text-[11px] text-slate-500 italic">{item.exampleDe}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            playGermanAudio(fullTerm, { type: 'vocab', voice: 'Charon' })
                          }
                          aria-label={`Escuchar ${fullTerm}`}
                          className="min-h-[44px] min-w-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
                        >
                          <Volume2 size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveSingleTerm(item)}
                          className={`min-h-[44px] px-2.5 rounded-xl font-bold text-[11px] border cursor-pointer ${
                            saved
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                              : 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                          }`}
                        >
                          {saved ? 'En SRS' : '+ SRS'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
