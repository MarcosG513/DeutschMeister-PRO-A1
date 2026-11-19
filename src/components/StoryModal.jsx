import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle, Loader2, Pause, Play, Sparkles, X } from 'lucide-react';
import {
  getProcessedSpeechBlobUrl,
  getSavedPlaybackSpeed,
  isCleanStretchedUrl,
  setSavedPlaybackSpeed,
  stopCurrentAudio,
} from '../services/aiAudioService';
import { setPreservesPitch, unregisterCleanStretchedUrl } from '../utils/cleanTimeStretch';
import { parseTextToTokens, calculateWordTimings } from '../utils/textTokenizer';

const LOADING_PHRASES = [
  '🇩🇪 Viajando a Alemania...',
  '🧠 Escaneando gramática...',
  '✍️ Redactando el texto interactivo...',
  '🎯 Seleccionando vocabulario del capítulo...',
  '✨ Finalizando los últimos detalles...',
];

export default function StoryModal({
  storyState,
  activeChapter,
  chapters = [],
  onClose,
  onSelectSlot,
  onCreateNewStory,
}) {
  const [loadingPhraseIdx, setLoadingPhraseIdx] = useState(0);
  const [isPlayingStoryAudio, setIsPlayingStoryAudio] = useState(false);
  const [isStoryAudioLoading, setIsStoryAudioLoading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [hasPreparedAudio, setHasPreparedAudio] = useState(false);
  const [storySpeed, setStorySpeed] = useState(() => getSavedPlaybackSpeed());

  const storyAudioInstanceRef = useRef(null);
  const storyAudioUrlRef = useRef(null);
  const storyAudioReqIdRef = useRef(0);

  const resetStoryAudioPlayback = useCallback(() => {
    storyAudioReqIdRef.current += 1;
    if (storyAudioInstanceRef.current) {
      try {
        storyAudioInstanceRef.current.onplay = null;
        storyAudioInstanceRef.current.ontimeupdate = null;
        storyAudioInstanceRef.current.onended = null;
        storyAudioInstanceRef.current.onerror = null;
        storyAudioInstanceRef.current.pause();
        storyAudioInstanceRef.current.removeAttribute('src');
        storyAudioInstanceRef.current.load();
      } catch {
        // Elemento HTMLAudio ya detenido
      }
      storyAudioInstanceRef.current = null;
    }
    if (storyAudioUrlRef.current && storyAudioUrlRef.current.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(storyAudioUrlRef.current);
      } catch {
        // Blob ya revocado
      }
      unregisterCleanStretchedUrl(storyAudioUrlRef.current);
    }
    storyAudioUrlRef.current = null;
    setHasPreparedAudio(false);
    setIsPlayingStoryAudio(false);
    setIsStoryAudioLoading(false);
    setCurrentWordIndex(-1);
  }, []);

  useEffect(() => {
    if (!storyState?.loading) return undefined;
    const interval = setInterval(() => {
      setLoadingPhraseIdx((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [storyState?.loading]);

  useEffect(() => {
    const syncSpeed = (e) => {
      const next = e?.detail !== undefined ? e.detail : getSavedPlaybackSpeed();
      setStorySpeed(next);
    };
    window.addEventListener('dm-speed-changed', syncSpeed);
    return () => {
      window.removeEventListener('dm-speed-changed', syncSpeed);
      resetStoryAudioPlayback();
    };
  }, [resetStoryAudioPlayback]);

  useEffect(() => {
    const timer = setTimeout(() => {
      resetStoryAudioPlayback();
    }, 0);
    return () => clearTimeout(timer);
  }, [storyState?.de, storyState?.activeSlot, resetStoryAudioPlayback]);

  if (!storyState?.isOpen) return null;

  const handleClose = () => {
    resetStoryAudioPlayback();
    onClose?.();
  };

  const handleChangeStorySpeed = (nextSpeed) => {
    const valid = setSavedPlaybackSpeed(nextSpeed);
    setStorySpeed(valid);
    if (
      storyAudioInstanceRef.current ||
      storyAudioUrlRef.current ||
      isPlayingStoryAudio ||
      isStoryAudioLoading
    ) {
      resetStoryAudioPlayback();
    }
  };

  const handleToggleStoryAudio = async () => {
    if (!storyState.de || isStoryAudioLoading) return;

    if (isPlayingStoryAudio && storyAudioInstanceRef.current) {
      storyAudioInstanceRef.current.pause();
      setIsPlayingStoryAudio(false);
      return;
    }

    if (storyAudioInstanceRef.current && storyAudioUrlRef.current) {
      if (storyAudioInstanceRef.current.ended) {
        storyAudioInstanceRef.current.currentTime = 0;
        setCurrentWordIndex(0);
      }
      const resumeRate = isCleanStretchedUrl(storyAudioUrlRef.current) ? 1.0 : storySpeed;
      storyAudioInstanceRef.current.playbackRate = resumeRate;
      setPreservesPitch(storyAudioInstanceRef.current, true);
      try {
        await storyAudioInstanceRef.current.play();
        setIsPlayingStoryAudio(true);
      } catch (err) {
        console.warn('[Story Audio Resume Error]:', err);
        resetStoryAudioPlayback();
      }
      return;
    }

    const reqId = ++storyAudioReqIdRef.current;

    try {
      setIsStoryAudioLoading(true);
      stopCurrentAudio();

      const activeSpeed = getSavedPlaybackSpeed();
      const audioSource = await getProcessedSpeechBlobUrl(storyState.de, {
        voice: 'Charon',
        type: 'story',
        speed: activeSpeed,
      });

      if (reqId !== storyAudioReqIdRef.current || !audioSource) {
        if (audioSource && audioSource.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(audioSource);
          } catch {
            // Blob ya revocado
          }
          unregisterCleanStretchedUrl(audioSource);
        }
        setIsStoryAudioLoading(false);
        return;
      }

      storyAudioUrlRef.current = audioSource;
      setHasPreparedAudio(true);

      const targetRate = isCleanStretchedUrl(audioSource) ? 1.0 : activeSpeed;
      const audio = new Audio(audioSource);
      audio.playsInline = true;
      audio.setAttribute('playsinline', '');
      audio.setAttribute('webkit-playsinline', '');
      audio.playbackRate = targetRate;
      setPreservesPitch(audio, true);
      audio.onloadedmetadata = () => {
        audio.playbackRate = targetRate;
        setPreservesPitch(audio, true);
      };
      storyAudioInstanceRef.current = audio;

      const tokens = parseTextToTokens(storyState.de);
      const wordTimings = calculateWordTimings(tokens);

      audio.onplay = () => {
        if (reqId !== storyAudioReqIdRef.current) return;
        setIsStoryAudioLoading(false);
        setIsPlayingStoryAudio(true);
      };

      audio.ontimeupdate = () => {
        if (reqId !== storyAudioReqIdRef.current || !audio.duration || audio.duration === 0) return;
        const currentProgress = audio.currentTime / audio.duration;
        const active = wordTimings.find(
          (w) => currentProgress >= w.startRatio && currentProgress < w.endRatio
        );
        if (active) {
          setCurrentWordIndex((prev) => (prev === active.wordIndex ? prev : active.wordIndex));
        }
      };

      audio.onended = () => {
        if (reqId !== storyAudioReqIdRef.current) return;
        setIsPlayingStoryAudio(false);
        setCurrentWordIndex(-1);
      };

      audio.onerror = (e) => {
        console.warn('[Story Audio Error] Fallo al reproducir:', e);
        if (reqId !== storyAudioReqIdRef.current) return;
        resetStoryAudioPlayback();
      };

      await audio.play();
    } catch (err) {
      console.error('Error al obtener audio del cuento:', err);
      if (reqId === storyAudioReqIdRef.current) {
        resetStoryAudioPlayback();
      }
    }
  };

  const resolvedChapterTitle =
    (chapters.find((c) => Number(c.id) === Number(storyState.chapterId)) || activeChapter)?.title ||
    'Capítulo';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 animate-in zoom-in-95 max-h-[88dvh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-start gap-3 mb-3 flex-shrink-0">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-indigo-500 shrink-0" size={20} />
              <span className="truncate">{storyState.titulo || 'Cuentos IA del Capítulo'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {resolvedChapterTitle} • {(storyState.stories || []).length} / 3 cuentos guardados
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar modal de cuentos"
            className="text-slate-400 hover:bg-slate-100 p-2 rounded-full shrink-0 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* SELECTOR DE SLOTS (CUENTO 1 | CUENTO 2 | CUENTO 3) Y GESTIÓN DE CUPO FINOPS */}
        <div className="mb-3.5 space-y-2 flex-shrink-0">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((slotNum) => {
              const slotStory = (storyState.stories || []).find(
                (s) => Number(s.storyIndex) === slotNum
              );
              const isActive = Number(storyState.activeSlot) === slotNum && Boolean(slotStory);
              return (
                <button
                  key={slotNum}
                  type="button"
                  disabled={storyState.loading || !slotStory}
                  onClick={() => {
                    if (slotStory) {
                      resetStoryAudioPlayback();
                      onSelectSlot?.(slotNum);
                    }
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm cursor-pointer'
                      : slotStory
                        ? 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-700 cursor-pointer'
                        : 'bg-slate-50/60 border-dashed border-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Cuento {slotNum}</span>
                  {slotStory && (
                    <CheckCircle
                      size={13}
                      className={isActive ? 'text-indigo-200' : 'text-emerald-500'}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {(storyState.stories || []).length >= 3 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-[11px] font-bold text-emerald-800 flex items-center justify-center gap-1.5 text-center">
              <CheckCircle size={14} className="text-emerald-600 shrink-0" />
              <span>✓ 3/3 Cuentos en Base de Datos — Reproducción Instantánea</span>
            </div>
          ) : (
            !storyState.loading &&
            (storyState.stories || []).length > 0 && (
              <button
                type="button"
                onClick={() => {
                  resetStoryAudioPlayback();
                  onCreateNewStory?.(storyState.stories);
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>
                  ✨ Generar Cuento Nuevo ({(storyState.stories || []).length + 1}/3)
                </span>
              </button>
            )
          )}
        </div>

        {storyState.loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-indigo-500 flex-grow">
            <Loader2 size={40} className="animate-spin" />
            <div className="animate-pulse text-indigo-600 font-medium transition-opacity duration-300 text-center px-4">
              {LOADING_PHRASES[loadingPhraseIdx]}
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 flex-grow overflow-hidden flex flex-col">
            <div className="bg-slate-50 rounded-xl border border-slate-200 relative group transition-all select-none flex-grow overflow-hidden flex flex-col max-h-[290px]">
              <div className="flex items-center justify-between gap-2 px-3.5 py-2 border-b border-slate-200/80 bg-white/80 shrink-0">
                <div
                  className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 p-0.5"
                  role="group"
                  aria-label="Velocidad de reproducción del cuento"
                >
                  {[0.75, 0.85, 1.0].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangeStorySpeed(spd);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition cursor-pointer ${
                        storySpeed === spd
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {spd === 1 ? '1x' : `${spd}x`}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleToggleStoryAudio}
                  disabled={isStoryAudioLoading}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xs transition-all text-xs font-semibold cursor-pointer ${
                    isStoryAudioLoading
                      ? 'bg-indigo-100 text-indigo-500 cursor-not-allowed opacity-100'
                      : isPlayingStoryAudio
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 opacity-100'
                        : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200'
                  }`}
                  title={
                    isStoryAudioLoading
                      ? 'Preparando voz de estudio...'
                      : isPlayingStoryAudio
                        ? 'Pausar cuento'
                        : 'Escuchar cuento'
                  }
                  aria-label={
                    isStoryAudioLoading
                      ? 'Preparando voz de estudio...'
                      : isPlayingStoryAudio
                        ? 'Pausar cuento'
                        : 'Escuchar cuento'
                  }
                >
                  {isStoryAudioLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin text-indigo-500" />
                      <span className="hidden sm:inline">Preparando voz de estudio...</span>
                    </>
                  ) : isPlayingStoryAudio ? (
                    <>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-white rounded-sm animate-pulse"></span>
                        <span className="w-1 h-2 bg-white rounded-sm animate-pulse delay-75"></span>
                        <span className="w-1 h-3.5 bg-white rounded-sm animate-pulse delay-150"></span>
                      </div>
                      <Pause size={14} className="ml-0.5" />
                      <span className="hidden sm:inline">Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} className="fill-current" />
                      <span>{hasPreparedAudio ? 'Reanudar' : 'Escuchar cuento'}</span>
                    </>
                  )}
                </button>
              </div>
              <div
                className="p-5 overflow-y-auto pb-4 cursor-pointer hover:bg-indigo-50/10 flex-grow"
                onClick={handleToggleStoryAudio}
              >
                <div translate="no" className="notranslate font-normal text-lg leading-relaxed text-slate-800">
                  {parseTextToTokens(storyState.de).map((token, idx) => {
                    if (token.isWord) {
                      const isHighlighted = token.wordIndex === currentWordIndex;
                      const isKeyword = token.isBold || token.isKeyword;
                      const fontWeightClass = isKeyword ? 'font-bold' : 'font-medium';
                      return (
                        <span
                          key={idx}
                          style={isHighlighted ? { textShadow: '0 0 0.6px currentColor' } : undefined}
                          className={`inline-block transition-colors duration-150 rounded px-1 mx-[1px] border ${
                            isHighlighted
                              ? 'bg-yellow-200 border-yellow-300 text-slate-900 shadow-xs'
                              : isKeyword
                                ? 'bg-indigo-50 border-transparent text-indigo-700'
                                : 'bg-transparent border-transparent text-slate-800'
                          } ${fontWeightClass}`}
                        >
                          {token.text}
                        </span>
                      );
                    }
                    const isPunct = /^[.,!?:;]+$/.test(token.text);
                    return (
                      <span
                        key={idx}
                        className={`text-slate-800 inline-block ${
                          isPunct ? 'ml-[-3px] pl-0 pr-[1px]' : 'px-[1px]'
                        }`}
                      >
                        {token.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex-shrink-0 max-h-[160px] overflow-y-auto">
              <p className="text-slate-700 italic text-sm leading-relaxed">{storyState.es}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
