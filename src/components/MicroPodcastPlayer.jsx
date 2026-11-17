import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookmarkPlus,
  CheckCircle2,
  CloudDownload,
  Eye,
  EyeOff,
  Headphones,
  HelpCircle,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  XCircle,
} from 'lucide-react';
import { PODCAST_AXES, microPodcastsCatalog } from '../data/microPodcasts';
import {
  getProcessedSpeechBlobUrl,
  getSavedPlaybackSpeed,
  isCleanStretchedUrl,
  playGermanAudio,
  precacheAudioFromText,
  setSavedPlaybackSpeed,
  stopCurrentAudio,
} from '../services/aiAudioService';
import { unregisterCleanStretchedUrl } from '../utils/cleanTimeStretch';
import {
  isPodcastEpisodeCachedOffline,
  syncPodcastEpisodeOffline,
} from '../services/syncMediaService';
import { captureConversationBundle, captureVocabToSrs } from '../services/srsBridgeService';
import {
  nativeSpeak,
  recordDailyStudyActivity,
  recordSkillActivity,
} from '../utils/helpers';
import { calculateWordTimings, parseTextToTokens } from '../utils/textTokenizer';

const SPEED_OPTIONS = [0.75, 0.85, 1];

export default function MicroPodcastPlayer({ onExit }) {
  const [selectedAxis, setSelectedAxis] = useState('all');
  const [activeEpisodeId, setActiveEpisodeId] = useState(null);
  const [activeTab, setActiveTab] = useState('transcript'); // 'transcript' | 'vocab' | 'quiz'
  const [showSpanish, setShowSpanish] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(() => getSavedPlaybackSpeed());

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [activeSegIndex, setActiveSegIndex] = useState(0);
  const [activeWordIdx, setActiveWordIdx] = useState(-1);

  const [offlineMap, setOfflineMap] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(null);

  const [savedTerms, setSavedTerms] = useState({});
  const [savedBundleMap, setSavedBundleMap] = useState({});

  // Estado del mini-test de 3 preguntas por episodio
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmittedMap, setQuizSubmittedMap] = useState({});

  const playbackRunIdRef = useRef(0);
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);
  const rafRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const speedRef = useRef(playbackSpeed);
  const isPlayingRef = useRef(false);
  const activeSegIdxRef = useRef(0);
  const playSegmentRef = useRef(null);

  const filteredEpisodes = useMemo(() => {
    if (selectedAxis === 'all') return microPodcastsCatalog;
    return microPodcastsCatalog.filter((ep) => ep.axis === selectedAxis);
  }, [selectedAxis]);

  const activeEpisode = useMemo(() => {
    if (!activeEpisodeId) return null;
    return microPodcastsCatalog.find((ep) => ep.id === activeEpisodeId) || null;
  }, [activeEpisodeId]);

  const segmentTokensMap = useMemo(() => {
    if (!activeEpisode) return [];
    return (activeEpisode.segments || []).map((seg) => {
      const tokens = parseTextToTokens(seg.de);
      const timings = calculateWordTimings(tokens);
      return { tokens, timings };
    });
  }, [activeEpisode]);

  const releaseAudioResources = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (audioRef.current) {
      try {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.onplaying = null;
        audioRef.current.onloadedmetadata = null;
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      } catch {
        // Limpieza segura de elemento HTMLAudio
      }
      audioRef.current = null;
    }
    if (objectUrlRef.current && objectUrlRef.current.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(objectUrlRef.current);
      } catch {
        // Ignorar si ya fue revocada
      }
      unregisterCleanStretchedUrl(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignorar en entornos sin síntesis nativa
      }
    }
  }, []);

  const stopPodcastPlayback = useCallback(() => {
    playbackRunIdRef.current += 1;
    releaseAudioResources();
    stopCurrentAudio();
    isPlayingRef.current = false;
    setIsPlaying(false);
    setIsAudioLoading(false);
    setActiveWordIdx(-1);
  }, [releaseAudioResources]);

  useEffect(() => {
    speedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    const syncSpeed = (e) => {
      const next = e?.detail !== undefined ? e.detail : getSavedPlaybackSpeed();
      speedRef.current = next;
      setPlaybackSpeed(next);
    };
    window.addEventListener('dm-speed-changed', syncSpeed);
    return () => {
      window.removeEventListener('dm-speed-changed', syncSpeed);
      stopPodcastPlayback();
    };
  }, [stopPodcastPlayback]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      microPodcastsCatalog.map(async (ep) => [
        ep.id,
        await isPodcastEpisodeCachedOffline(ep.id),
      ])
    )
      .then((entries) => {
        if (!cancelled) {
          setOfflineMap(Object.fromEntries(entries));
        }
      })
      .catch(() => {
        // Ignorar si IndexedDB no está disponible
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const playSegmentAt = useCallback(
    async (episode, segIndex) => {
      if (!episode || !Array.isArray(episode.segments)) return;
      if (segIndex < 0 || segIndex >= episode.segments.length) {
        stopPodcastPlayback();
        setActiveSegIndex(0);
        activeSegIdxRef.current = 0;
        recordSkillActivity('listening', 3).catch(() => {});
        recordDailyStudyActivity();
        return;
      }

      playbackRunIdRef.current += 1;
      const runId = playbackRunIdRef.current;
      releaseAudioResources();
      stopCurrentAudio();

      const seg = episode.segments[segIndex];
      const tokens = parseTextToTokens(seg.de);
      const timings = calculateWordTimings(tokens);

      activeSegIdxRef.current = segIndex;
      setActiveSegIndex(segIndex);
      setActiveWordIdx(0);
      setIsAudioLoading(true);
      isPlayingRef.current = true;
      setIsPlaying(true);

      // Precarga no bloqueante del siguiente segmento para transición sin cortes
      const nextSeg = episode.segments[segIndex + 1];
      if (nextSeg?.de) {
        precacheAudioFromText(nextSeg.de, { voice: 'Charon', type: 'story', lang: 'de' }).catch(() => {});
      }

      const runFallbackKaraoke = () => {
        if (runId !== playbackRunIdRef.current) return;
        setIsAudioLoading(false);
        const canonicalMs = Math.max(1800, (seg.endMs || 6000) - (seg.startMs || 0));
        const adjustedMs = canonicalMs / (speedRef.current || 1);
        const startTs = performance.now();

        nativeSpeak(seg.de, {
          lang: 'de-DE',
          rate: speedRef.current,
          onEnd: () => {
            if (runId !== playbackRunIdRef.current) return;
            clearInterval(fallbackTimerRef.current);
            fallbackTimerRef.current = null;
            playSegmentRef.current?.(episode, segIndex + 1);
          },
        }).catch(() => {});

        fallbackTimerRef.current = setInterval(() => {
          if (runId !== playbackRunIdRef.current) {
            clearInterval(fallbackTimerRef.current);
            fallbackTimerRef.current = null;
            return;
          }
          const ratio = Math.min(0.999, (performance.now() - startTs) / adjustedMs);
          const matched =
            timings.find((w) => ratio >= w.startRatio && ratio < w.endRatio) ||
            timings[timings.length - 1];
          if (matched) setActiveWordIdx(matched.wordIndex);
        }, 70);
      };

      try {
        const activeSpeed = speedRef.current;
        const resolvedUrl = await getProcessedSpeechBlobUrl(seg.de, {
          voice: 'Charon',
          type: 'story',
          lang: 'de',
          speed: activeSpeed,
        });

        if (runId !== playbackRunIdRef.current) {
          if (resolvedUrl?.startsWith('blob:')) {
            try {
              URL.revokeObjectURL(resolvedUrl);
            } catch {
              // Revocación segura
            }
            unregisterCleanStretchedUrl(resolvedUrl);
          }
          return;
        }

        if (!resolvedUrl) {
          runFallbackKaraoke();
          return;
        }

        const isBlob = resolvedUrl.startsWith('blob:');
        const targetRate = isCleanStretchedUrl(resolvedUrl) ? 1.0 : activeSpeed;
        const audio = new Audio(resolvedUrl);
        audio.playsInline = true;
        audio.setAttribute('playsinline', '');
        audio.setAttribute('webkit-playsinline', '');
        audio.playbackRate = targetRate;
        audio.preservesPitch = true;
        audio.onloadedmetadata = () => {
          audio.playbackRate = targetRate;
          audio.preservesPitch = true;
        };

        audioRef.current = audio;
        if (isBlob) objectUrlRef.current = resolvedUrl;

        const syncWords = () => {
          if (runId !== playbackRunIdRef.current || audioRef.current !== audio) return;
          if (!audio.duration || Number.isNaN(audio.duration) || audio.paused) return;
          const progress = Math.min(0.9999, audio.currentTime / audio.duration);
          const currentWord =
            timings.find((w) => progress >= w.startRatio && progress < w.endRatio) ||
            timings[timings.length - 1];
          if (currentWord && currentWord.wordIndex >= 0) {
            setActiveWordIdx((prev) => (prev === currentWord.wordIndex ? prev : currentWord.wordIndex));
          }
        };

        const tick = () => {
          if (
            runId !== playbackRunIdRef.current ||
            audioRef.current !== audio ||
            audio.paused ||
            audio.ended
          ) {
            rafRef.current = null;
            return;
          }
          syncWords();
          rafRef.current = requestAnimationFrame(tick);
        };

        audio.onplaying = () => {
          if (runId !== playbackRunIdRef.current) return;
          setIsAudioLoading(false);
          syncWords();
          rafRef.current = requestAnimationFrame(tick);
        };

        audio.onended = () => {
          if (runId !== playbackRunIdRef.current) return;
          playSegmentRef.current?.(episode, segIndex + 1);
        };

        audio.onerror = () => {
          if (runId !== playbackRunIdRef.current) return;
          releaseAudioResources();
          runFallbackKaraoke();
        };

        await audio.play();
      } catch {
        if (runId === playbackRunIdRef.current) {
          releaseAudioResources();
          runFallbackKaraoke();
        }
      }
    },
    [releaseAudioResources, stopPodcastPlayback]
  );

  useEffect(() => {
    playSegmentRef.current = playSegmentAt;
  }, [playSegmentAt]);

  const handleTogglePlay = () => {
    if (!activeEpisode) return;
    if (isPlaying) {
      stopPodcastPlayback();
      return;
    }
    const startIdx =
      activeSegIdxRef.current >= (activeEpisode.segments?.length || 0)
        ? 0
        : activeSegIdxRef.current;
    playSegmentAt(activeEpisode, startIdx);
  };

  const handleSelectSpeed = (nextSpeed) => {
    const valid = setSavedPlaybackSpeed(nextSpeed);
    speedRef.current = valid;
    setPlaybackSpeed(valid);
    if (isPlayingRef.current && activeEpisode) {
      playSegmentAt(activeEpisode, activeSegIdxRef.current);
    }
  };

  const handleDownloadOffline = async (episode) => {
    if (!episode || downloadingId) return;
    setDownloadingId(episode.id);
    setDownloadProgress({ current: 0, total: episode.segments?.length || 1 });
    try {
      const res = await syncPodcastEpisodeOffline(episode, (prog) => {
        setDownloadProgress({ current: prog.current, total: prog.total });
      });
      if (res?.success) {
        setOfflineMap((prev) => ({ ...prev, [episode.id]: true }));
      }
    } finally {
      setDownloadingId(null);
      setDownloadProgress(null);
    }
  };

  const handleSaveTermToSrs = async (vocabItem) => {
    if (!vocabItem || !activeEpisode) return;
    const key = `${activeEpisode.id}:${vocabItem.termDe}`;
    await captureVocabToSrs({
      termDe: vocabItem.termDe,
      audioDe: vocabItem.exampleDe || vocabItem.termDe,
      translationEs: vocabItem.translationEs,
      axis: activeEpisode.axis,
      source: 'podcast',
      sourceRef: activeEpisode.id,
    });
    setSavedTerms((prev) => ({ ...prev, [key]: true }));
  };

  const handleSaveAllEpisodeVocab = async () => {
    if (!activeEpisode) return;
    await captureConversationBundle({
      vocabItems: (activeEpisode.vocabulary || []).map((v) => ({
        termDe: v.termDe,
        audioDe: v.exampleDe || v.termDe,
        translationEs: v.translationEs,
      })),
      grammarErrors: [],
      axis: activeEpisode.axis,
      source: 'podcast',
      sourceRef: activeEpisode.id,
    });
    const nextTerms = {};
    (activeEpisode.vocabulary || []).forEach((v) => {
      nextTerms[`${activeEpisode.id}:${v.termDe}`] = true;
    });
    setSavedTerms((prev) => ({ ...prev, ...nextTerms }));
    setSavedBundleMap((prev) => ({ ...prev, [activeEpisode.id]: true }));
  };

  const handleSelectQuizOption = (questionId, optionIndex) => {
    if (!activeEpisode || quizSubmittedMap[activeEpisode.id]) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeEpisode) return;
    const questions = activeEpisode.comprehensionQuestions || [];
    const correctCount = questions.reduce(
      (acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
      0
    );
    setQuizSubmittedMap((prev) => ({ ...prev, [activeEpisode.id]: true }));
    recordSkillActivity('listening', 4 + correctCount * 2).catch(() => {});
    recordDailyStudyActivity();
  };

  const handleResetQuiz = () => {
    if (!activeEpisode) return;
    const cleared = { ...quizAnswers };
    (activeEpisode.comprehensionQuestions || []).forEach((q) => {
      delete cleared[q.id];
    });
    setQuizAnswers(cleared);
    setQuizSubmittedMap((prev) => ({ ...prev, [activeEpisode.id]: false }));
  };

  const openEpisode = (ep) => {
    stopPodcastPlayback();
    setActiveEpisodeId(ep.id);
    setActiveTab('transcript');
    setActiveSegIndex(0);
    activeSegIdxRef.current = 0;
  };

  // =========================================================================
  // VISTA 1: CATÁLOGO DE EPISODIOS (EJE A Y EJE B)
  // =========================================================================
  if (!activeEpisode) {
    return (
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pb-12 pt-[max(0.75rem,env(safe-area-inset-top))] space-y-5 animate-in fade-in duration-200">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => {
                stopPodcastPlayback();
                onExit?.();
              }}
              className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5 shrink-0 cursor-pointer transition"
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span className="hidden sm:inline">Inicio</span>
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Headphones size={20} className="text-violet-600 shrink-0" aria-hidden="true" />
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 truncate">
                  Micro-Pódcasts Offline Karaoke
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Episodios cortos A1–A2 con voz Charon, WSOLA limpio (0.75x / 0.85x / 1.0x), descarga offline y test auditivo.
              </p>
            </div>
          </div>
        </div>

        {/* Selector de Eje (tabs horizontales en una sola fila sin wrapping) */}
        <div
          role="tablist"
          aria-label="Filtrar pódcasts por eje temático"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-0.5"
        >
          {PODCAST_AXES.map((axis) => {
            const isSelected = selectedAxis === axis.id;
            return (
              <button
                key={axis.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedAxis(axis.id)}
                className={`relative min-h-[44px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition ${
                  isSelected
                    ? 'text-violet-700 font-bold after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:border-b-[3px] after:border-violet-600'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <span aria-hidden="true">{axis.emoji}</span>
                <span>{axis.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEpisodes.map((ep) => {
            const isCached = Boolean(offlineMap[ep.id]);
            const isDownloading = downloadingId === ep.id;
            return (
              <article
                key={ep.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-4 hover:border-violet-300 transition min-w-0"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl" aria-hidden="true">{ep.emoji}</span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {ep.level} · {ep.durationLabel}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          ep.axis === 'work'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {ep.axis === 'work' ? 'Trabajo' : 'Trámites'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {ep.titleDe}
                  </h3>
                  <p className="text-xs font-bold text-violet-700">{ep.titleEs}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{ep.subtitleEs}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openEpisode(ep)}
                    className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition"
                  >
                    <Play size={16} aria-hidden="true" />
                    <span>Escuchar</span>
                  </button>
                  <button
                    type="button"
                    disabled={isDownloading}
                    onClick={() => handleDownloadOffline(ep)}
                    aria-label={
                      isCached
                        ? `${ep.titleEs} guardado offline`
                        : `Descargar ${ep.titleEs} para modo offline`
                    }
                    className={`min-h-[44px] min-w-[44px] px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition border ${
                      isCached
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        <span>
                          {downloadProgress ? `${downloadProgress.current}/${downloadProgress.total}` : '...'}
                        </span>
                      </>
                    ) : isCached ? (
                      <>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span className="hidden sm:inline">Offline</span>
                      </>
                    ) : (
                      <>
                        <CloudDownload size={16} aria-hidden="true" />
                        <span className="hidden sm:inline">Bajar</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VISTA 2: REPRODUCTOR KARAOKE WSOLA + GLOSARIO SRS + MINI-TEST
  // =========================================================================
  const isEpisodeOffline = Boolean(offlineMap[activeEpisode.id]);
  const isDownloadingEpisode = downloadingId === activeEpisode.id;
  const quizSubmitted = Boolean(quizSubmittedMap[activeEpisode.id]);
  const questions = activeEpisode.comprehensionQuestions || [];
  const allQuestionsAnswered =
    questions.length > 0 && questions.every((q) => quizAnswers[q.id] !== undefined);
  const quizCorrectCount = questions.reduce(
    (acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 pb-14 pt-[max(0.75rem,env(safe-area-inset-top))] space-y-4 animate-in fade-in duration-200">
      {/* Cabecera del reproductor */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              stopPodcastPlayback();
              setActiveEpisodeId(null);
            }}
            className="min-h-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Episodios</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isDownloadingEpisode}
              onClick={() => handleDownloadOffline(activeEpisode)}
              className={`min-h-[44px] px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer transition ${
                isEpisodeOffline
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isDownloadingEpisode ? (
                <>
                  <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  <span>
                    Guardando {downloadProgress?.current || 0}/{downloadProgress?.total || 0}
                  </span>
                </>
              ) : isEpisodeOffline ? (
                <>
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>Disponible Offline</span>
                </>
              ) : (
                <>
                  <CloudDownload size={15} aria-hidden="true" />
                  <span>Descargar Pack Offline</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-3xl sm:text-4xl shrink-0" aria-hidden="true">
            {activeEpisode.emoji}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800">
                {activeEpisode.level} · {activeEpisode.durationLabel}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {activeEpisode.axis === 'work' ? 'Eje B · Trabajo Técnico' : 'Eje A · Supervivencia'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 mt-1 leading-tight">
              {activeEpisode.titleDe}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {activeEpisode.titleEs} — <span className="text-violet-700">{activeEpisode.grammarFocusEs}</span>
            </p>
          </div>
        </div>

        {/* Barra de controles de audio Charon + WSOLA */}
        <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pausar episodio' : 'Reproducir episodio'}
              className="min-h-[44px] min-w-[44px] px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-black text-sm flex items-center gap-2 cursor-pointer transition shadow-md"
            >
              {isAudioLoading ? (
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              ) : isPlaying ? (
                <Pause size={18} aria-hidden="true" />
              ) : (
                <Play size={18} aria-hidden="true" />
              )}
              <span>{isPlaying ? 'Pausar' : 'Reproducir Charon'}</span>
            </button>

            <button
              type="button"
              onClick={() => playSegmentAt(activeEpisode, 0)}
              aria-label="Reiniciar desde el principio"
              className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center cursor-pointer transition"
            >
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Selector estricto WSOLA 0.75x / 0.85x / 1.0x */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Velocidad de reproducción WSOLA">
            <span className="text-[11px] font-bold text-slate-300 mr-1 hidden xs:inline">WSOLA:</span>
            {SPEED_OPTIONS.map((spd) => {
              const active = Number(playbackSpeed) === spd;
              return (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSelectSpeed(spd)}
                  aria-pressed={active}
                  className={`min-h-[44px] min-w-[48px] px-2.5 rounded-xl font-black text-xs cursor-pointer transition border ${
                    active
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {spd === 1 ? '1.0x' : `${spd}x`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pestañas internas del episodio (single row accessible tablist) */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div
          role="tablist"
          aria-label="Secciones del episodio"
          className="flex items-center border-b border-slate-200 px-2 sm:px-4 overflow-x-auto no-scrollbar"
        >
          {[
            { id: 'transcript', label: 'Karaoke', icon: Volume2 },
            { id: 'vocab', label: `Glosario (${activeEpisode.vocabulary?.length || 0})`, icon: BookmarkPlus },
            { id: 'quiz', label: 'Test (3)', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`pod-tab-${tab.id}`}
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={`relative min-h-[44px] px-3.5 sm:px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition ${
                  selected
                    ? 'text-violet-700 font-bold after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:border-b-[3px] after:border-violet-600'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* PANEL 1: TRANSCRIPCIÓN KARAOKE */}
        <div
          role="tabpanel"
          aria-labelledby="pod-tab-transcript"
          hidden={activeTab !== 'transcript'}
        >
          {activeTab === 'transcript' && (
            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <p className="text-xs text-slate-600">
                  Pulsa cualquier frase para escucharla desde ahí en modo Karaoke.
                </p>
                <button
                  type="button"
                  onClick={() => setShowSpanish((v) => !v)}
                  className="min-h-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition"
                >
                  {showSpanish ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
                  <span>{showSpanish ? 'Ocultar español' : 'Mostrar español'}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {(activeEpisode.segments || []).map((seg, idx) => {
                  const isActiveSeg = idx === activeSegIndex;
                  const segTokenData = segmentTokensMap[idx] || { tokens: [] };
                  const timeSec = Math.round((seg.startMs || 0) / 1000);
                  const mm = String(Math.floor(timeSec / 60)).padStart(1, '0');
                  const ss = String(timeSec % 60).padStart(2, '0');

                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => playSegmentAt(activeEpisode, idx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition cursor-pointer min-h-[44px] ${
                        isActiveSeg
                          ? 'bg-violet-50 border-violet-400 shadow-sm'
                          : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-black uppercase tracking-wide text-violet-700">
                          {seg.speaker}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {mm}:{ss}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed text-slate-900 font-semibold">
                        {segTokenData.tokens.map((tok, tIdx) => {
                          const highlight =
                            isActiveSeg && isPlaying && tok.isWord && tok.wordIndex === activeWordIdx;
                          return (
                            <span
                              key={`${seg.id}_t_${tIdx}`}
                              className={
                                highlight
                                  ? 'bg-violet-600 text-white rounded px-1 py-0.5 transition-colors duration-75'
                                  : ''
                              }
                            >
                              {tok.text}
                            </span>
                          );
                        })}
                      </p>
                      {showSpanish && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-snug">
                          {seg.es}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* PANEL 2: GLOSARIO Y GUARDADO EN SRS */}
        <div
          role="tabpanel"
          aria-labelledby="pod-tab-vocab"
          hidden={activeTab !== 'vocab'}
        >
          {activeTab === 'vocab' && (
            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Vocabulario clave listo para tu mazo de repaso espaciado (SRS).
                </p>
                <button
                  type="button"
                  onClick={handleSaveAllEpisodeVocab}
                  className={`min-h-[44px] px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition ${
                    savedBundleMap[activeEpisode.id]
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {savedBundleMap[activeEpisode.id] ? (
                    <>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      <span>Todo guardado en SRS</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus size={15} aria-hidden="true" />
                      <span>Guardar todo el glosario en SRS</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2.5">
                {(activeEpisode.vocabulary || []).map((v) => {
                  const savedKey = `${activeEpisode.id}:${v.termDe}`;
                  const isSaved = Boolean(savedTerms[savedKey]);
                  return (
                    <div
                      key={v.termDe}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-slate-900 text-sm sm:text-base">
                            {v.termDe}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-slate-600">
                            — {v.translationEs}
                          </span>
                        </div>
                        {v.exampleDe && (
                          <p className="text-xs text-slate-500 italic">„{v.exampleDe}“</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            playGermanAudio(v.exampleDe || v.termDe, {
                              type: 'vocab',
                              voice: 'Charon',
                              speed: playbackSpeed,
                            })
                          }
                          aria-label={`Escuchar ${v.termDe}`}
                          className="min-h-[44px] min-w-[44px] rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition"
                        >
                          <Volume2 size={17} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveTermToSrs(v)}
                          className={`min-h-[44px] px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition border ${
                            isSaved
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                              : 'bg-white border-indigo-200 hover:bg-indigo-50 text-indigo-700'
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <CheckCircle2 size={15} aria-hidden="true" />
                              <span>En SRS</span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus size={15} aria-hidden="true" />
                              <span>Guardar en SRS</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* PANEL 3: MINI-TEST DE COMPRENSIÓN (3 PREGUNTAS) */}
        <div
          role="tabpanel"
          aria-labelledby="pod-tab-quiz"
          hidden={activeTab !== 'quiz'}
        >
          {activeTab === 'quiz' && (
            <div className="p-4 sm:p-5 space-y-4">
              {questions.map((q, qIdx) => {
                const chosen = quizAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                    <div className="font-black text-slate-900 text-sm sm:text-base">
                      {qIdx + 1}. {q.questionDe}
                    </div>
                    <p className="text-xs text-slate-600">{q.questionEs}</p>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = chosen === oIdx;
                        const isRight = oIdx === q.correctIndex;
                        let cls = 'bg-white border-slate-200 text-slate-800 hover:border-violet-300';
                        if (quizSubmitted) {
                          if (isRight) {
                            cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          } else if (isChosen && !isRight) {
                            cls = 'bg-rose-50 border-rose-400 text-rose-900';
                          }
                        } else if (isChosen) {
                          cls = 'bg-violet-50 border-violet-600 text-violet-900 font-bold';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => handleSelectQuizOption(q.id, oIdx)}
                            className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer transition ${cls}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isRight && (
                              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" aria-hidden="true" />
                            )}
                            {quizSubmitted && isChosen && !isRight && (
                              <XCircle size={16} className="text-rose-600 shrink-0" aria-hidden="true" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <p className="text-xs text-slate-700 bg-white border border-slate-200 rounded-xl p-2.5">
                        {q.explanationEs}
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2" aria-live="polite">
                {quizSubmitted ? (
                  <>
                    <div className="text-sm font-black text-emerald-700">
                      Resultado: {quizCorrectCount} / {questions.length} aciertos (+{4 + quizCorrectCount * 2} pts Escucha)
                    </div>
                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="min-h-[44px] px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer transition"
                    >
                      Reintentar test
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    disabled={!allQuestionsAnswered}
                    onClick={handleSubmitQuiz}
                    className="w-full sm:w-auto min-h-[44px] px-5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white font-bold text-sm cursor-pointer transition"
                  >
                    Corregir Test Auditivo (3 preguntas)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
