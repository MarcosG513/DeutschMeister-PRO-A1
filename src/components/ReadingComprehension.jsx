import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import localforage from 'localforage';
import {
  BookOpen,
  Sparkles,
  X,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Heart,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Repeat,
  Languages,
  Loader2,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  Shuffle,
  Check
} from 'lucide-react';
import { auth, db, functions, appId } from '../config/firebase';
import { httpsCallable } from 'firebase/functions';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  audioStore,
  getSafeAudioKey,
  getGermanSpeechUrl,
  playGermanAudio,
  stopCurrentAudio
} from '../services/aiAudioService';
import {
  immersiveStoriesCatalog,
  STORY_CATEGORIES,
  lookupWordInStory
} from '../data/immersiveStoriesCatalog';
import { parseTextToTokens, calculateWordTimings } from '../utils/textTokenizer';
import {
  getSafeId,
  nativeSpeak,
  recordCardStudied,
  recordDailyStudyActivity,
  recordGoetheScore,
  recordModuleCompleted,
  scrollInputIntoView
} from '../utils/helpers';

const readleStorage = localforage.createInstance({
  name: 'DeutschMeisterReadlePRO',
  storeName: 'readle_library_state'
});

const STORAGE_KEYS = {
  customStories: 'dm_custom_readle_stories',
  favorites: 'dm_favorite_stories',
  learned: 'dm_learned_stories',
  savedWords: 'dm_saved_story_words'
};

const FONT_SIZE_PRESETS = [
  { id: 'sm', label: 'A', deClass: 'text-base leading-relaxed', esClass: 'text-xs' },
  { id: 'md', label: 'Aa', deClass: 'text-lg sm:text-xl leading-relaxed', esClass: 'text-sm' },
  { id: 'lg', label: 'AA', deClass: 'text-xl sm:text-2xl leading-loose', esClass: 'text-base' }
];

const SPEED_OPTIONS = [0.75, 1, 1.25];

const PRONOUN_ROWS = [
  { key: 'ich', label: 'ich' },
  { key: 'du', label: 'du' },
  { key: 'er_sie_es', label: 'er / sie / es' },
  { key: 'wir', label: 'wir' },
  { key: 'ihr', label: 'ihr' },
  { key: 'sie_Sie', label: 'sie / Sie' }
];

function renderHighlightedSentence(sentenceDe, highlightedPart) {
  if (!sentenceDe || !highlightedPart) return sentenceDe;
  const idx = sentenceDe.toLowerCase().indexOf(highlightedPart.toLowerCase());
  if (idx === -1) return sentenceDe;
  const before = sentenceDe.slice(0, idx);
  const match = sentenceDe.slice(idx, idx + highlightedPart.length);
  const after = sentenceDe.slice(idx + highlightedPart.length);
  return (
    <>
      {before}
      <strong className="font-extrabold text-teal-300 bg-teal-500/20 px-1.5 py-0.5 rounded">
        {match}
      </strong>
      {after}
    </>
  );
}

const ReadingComprehension = ({ onExit }) => {
  // Biblioteca y persistencia
  const [customStories, setCustomStories] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [learnedIds, setLearnedIds] = useState([]);
  const [savedWordsMap, setSavedWordsMap] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  // Generador IA modal
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [genCategory, setGenCategory] = useState('enpal');
  const [genLevel, setGenLevel] = useState('A1');
  const [genTopic, setGenTopic] = useState('');
  const [genLoading, setGenLoading] = useState(false);
  const [genLoadingStep, setGenLoadingStep] = useState('');
  const [genError, setGenError] = useState('');

  // Lector de 4 pestañas
  const [activeTab, setActiveTab] = useState('historia');
  const [showInterlinear, setShowInterlinear] = useState(true);
  const [fontScaleIdx, setFontScaleIdx] = useState(1);

  // Inspector contextual de palabra & Modal de conjugación
  const [selectedWordInfo, setSelectedWordInfo] = useState(null);
  const [selectedTokenKey, setSelectedTokenKey] = useState(null);
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState(null);
  const [conjugationModalVerb, setConjugationModalVerb] = useState(null);

  // Estado del reproductor Karaoke (Historia o Frase)
  const [playbackMode, setPlaybackMode] = useState(null); // null | 'story' | 'sentence'
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [activeGlobalWordIndex, setActiveGlobalWordIndex] = useState(-1);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(-1);

  // Estado de Examen (4 preguntas)
  const [currentExamIdx, setCurrentExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({}); // { [storyId]: { [qIdx]: optIndex } }

  // Estado del Entrenador Flashcards (Palabras)
  const [showFlashcardTrainer, setShowFlashcardTrainer] = useState(false);
  const [trainerCards, setTrainerCards] = useState([]);
  const [trainerIdx, setTrainerIdx] = useState(0);
  const [trainerFlipped, setTrainerFlipped] = useState(false);

  // Referencias mutables para audio & scroll sincronizado
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const playbackRunIdRef = useRef(0);
  const isLoopingRef = useRef(isLooping);
  const playbackSpeedRef = useRef(playbackSpeed);
  const sentenceRefs = useRef({});
  const lastScrolledSentenceRef = useRef(-1);

  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed;
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.preservesPitch = true;
    }
  }, [playbackSpeed]);

  // Todas las historias disponibles (12 catálogo base + personalizadas locales/nube)
  const allStories = useMemo(() => {
    const byId = new Map();
    for (const s of immersiveStoriesCatalog) {
      byId.set(s.id, s);
    }
    for (const cs of customStories) {
      if (cs?.id) byId.set(cs.id, cs);
    }
    return Array.from(byId.values());
  }, [customStories]);

  const activeStory = useMemo(
    () => allStories.find((s) => s.id === selectedStoryId) || null,
    [allStories, selectedStoryId]
  );

  // Tokenización global precalculada de la historia activa para Karaoke 1:1
  const tokenizedStory = useMemo(() => {
    if (!activeStory?.sentences) return { sentences: [], flatWordTimings: [], fullText: '' };
    let runningWordIdx = 0;
    const processedSentences = activeStory.sentences.map((sent, sIdx) => {
      const tokens = parseTextToTokens(sent.de).map((tok, tIdx) => {
        if (tok.isWord) {
          const globalWordIdx = runningWordIdx++;
          return { ...tok, globalWordIdx, sentenceIdx: sIdx, tokenKey: `${sIdx}_${tIdx}` };
        }
        return { ...tok, globalWordIdx: -1, sentenceIdx: sIdx, tokenKey: `${sIdx}_${tIdx}` };
      });
      const wordTokens = tokens.filter((t) => t.isWord);
      const localTimings = calculateWordTimings(tokens).map((wt, idx) => ({
        ...wt,
        globalWordIdx: wordTokens[idx]?.globalWordIdx ?? -1,
        sentenceIdx: sIdx
      }));
      return {
        ...sent,
        sentenceIdx: sIdx,
        tokens,
        wordTimings: localTimings
      };
    });

    const allWordTokens = processedSentences.flatMap((s) => s.tokens.filter((t) => t.isWord));
    const totalChars = allWordTokens.reduce((sum, w) => sum + w.text.length, 0) || 1;
    let acc = 0;
    const flatWordTimings = allWordTokens.map((w) => {
      const startRatio = acc / totalChars;
      acc += w.text.length;
      const endRatio = acc / totalChars;
      return {
        globalWordIdx: w.globalWordIdx,
        sentenceIdx: w.sentenceIdx,
        startRatio,
        endRatio
      };
    });

    const fullText = activeStory.sentences.map((s) => s.de).join(' ');
    return { sentences: processedSentences, flatWordTimings, fullText };
  }, [activeStory]);

  // Limpieza segura de audio, ObjectURLs y timers
  const cleanupPlayback = useCallback(() => {
    playbackRunIdRef.current += 1;
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onplay = null;
      try {
        audioRef.current.pause();
        audioRef.current.src = '';
      } catch (_) {}
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      try {
        URL.revokeObjectURL(objectUrlRef.current);
      } catch (_) {}
      objectUrlRef.current = null;
    }
    stopCurrentAudio();
    setIsAudioLoading(false);
    setIsPlaying(false);
    setPlaybackMode(null);
    setActiveGlobalWordIndex(-1);
    setActiveSentenceIndex(-1);
    lastScrolledSentenceRef.current = -1;
  }, []);

  // Limpieza automática al desmontar el componente
  useEffect(() => {
    return () => cleanupPlayback();
  }, [cleanupPlayback]);

  // Hidratación inicial desde localforage y Firestore
  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      try {
        const [localCustom, localFavs, localLearned, localSavedWords] = await Promise.all([
          readleStorage.getItem(STORAGE_KEYS.customStories),
          readleStorage.getItem(STORAGE_KEYS.favorites),
          readleStorage.getItem(STORAGE_KEYS.learned),
          readleStorage.getItem(STORAGE_KEYS.savedWords)
        ]);
        if (cancelled) return;
        if (Array.isArray(localCustom)) setCustomStories(localCustom);
        if (Array.isArray(localFavs)) setFavoriteIds(localFavs);
        if (Array.isArray(localLearned)) setLearnedIds(localLearned);
        if (localSavedWords && typeof localSavedWords === 'object' && !Array.isArray(localSavedWords)) {
          setSavedWordsMap(localSavedWords);
        }
      } catch (err) {
        console.warn('[Readle] Local hydration error:', err);
      }

      if (!db) return;
      try {
        const storiesSnap = await getDocs(collection(db, 'global_stories'));
        if (!cancelled && !storiesSnap.empty) {
          const cloudStories = [];
          storiesSnap.forEach((docSnap) => {
            const data = docSnap.data();
            if (data?.sentences?.length) {
              cloudStories.push({ ...data, id: data.id || docSnap.id });
            }
          });
          if (cloudStories.length > 0) {
            setCustomStories((prev) => {
              const merged = new Map(prev.map((item) => [item.id, item]));
              cloudStories.forEach((cs) => merged.set(cs.id, cs));
              const arr = Array.from(merged.values());
              readleStorage.setItem(STORAGE_KEYS.customStories, arr).catch(() => {});
              return arr;
            });
          }
        }
      } catch (err) {
        console.warn('[Readle] Firestore global_stories read skipped:', err?.message || err);
      }

      const uid = auth?.currentUser?.uid;
      if (uid && !cancelled) {
        try {
          const progRef = doc(db, 'artifacts', appId, 'users', uid, 'pedagogy', 'progress');
          const snap = await getDoc(progRef);
          if (snap.exists() && !cancelled) {
            const data = snap.data() || {};
            if (Array.isArray(data.favoriteStories)) {
              setFavoriteIds((prev) => {
                const next = Array.from(new Set([...prev, ...data.favoriteStories]));
                readleStorage.setItem(STORAGE_KEYS.favorites, next).catch(() => {});
                return next;
              });
            }
            if (Array.isArray(data.learnedStories)) {
              setLearnedIds((prev) => {
                const next = Array.from(new Set([...prev, ...data.learnedStories]));
                readleStorage.setItem(STORAGE_KEYS.learned, next).catch(() => {});
                return next;
              });
            }
            if (data.savedStoryWords && typeof data.savedStoryWords === 'object') {
              setSavedWordsMap((prev) => {
                const next = { ...prev, ...data.savedStoryWords };
                readleStorage.setItem(STORAGE_KEYS.savedWords, next).catch(() => {});
                return next;
              });
            }
          }
        } catch (err) {
          console.warn('[Readle] Cloud pedagogy state read skipped:', err?.message || err);
        }
      }
    }
    hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sincronización con Firestore /artifacts/{appId}/users/{uid}/pedagogy/progress
  const syncReadleStateToCloud = useCallback(async (patch) => {
    const uid = auth?.currentUser?.uid;
    if (!uid || !db) return;
    try {
      const progRef = doc(db, 'artifacts', appId, 'users', uid, 'pedagogy', 'progress');
      await setDoc(progRef, { ...patch, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('[Readle] Cloud sync deferred:', err?.message || err);
    }
  }, []);

  // Toggle Favorito
  const toggleFavorite = useCallback((storyId, e) => {
    if (e) e.stopPropagation();
    setFavoriteIds((prev) => {
      const next = prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId];
      readleStorage.setItem(STORAGE_KEYS.favorites, next).catch(() => {});
      syncReadleStateToCloud({ favoriteStories: next });
      return next;
    });
  }, [syncReadleStateToCloud]);

  // Marcar como aprendida
  const toggleLearned = useCallback((storyId) => {
    setLearnedIds((prev) => {
      const isNowLearned = !prev.includes(storyId);
      const next = isNowLearned ? [...prev, storyId] : prev.filter((id) => id !== storyId);
      readleStorage.setItem(STORAGE_KEYS.learned, next).catch(() => {});
      syncReadleStateToCloud({ learnedStories: next });
      if (isNowLearned) {
        recordModuleCompleted(`readle_${storyId}`);
        recordDailyStudyActivity();
      }
      return next;
    });
  }, [syncReadleStateToCloud]);

  // Guardar palabra al mazo (Dumbbell)
  const handleSaveWordToDeck = useCallback(async (wordObj) => {
    if (!wordObj) return;
    const rawDe = wordObj.lemma || wordObj.de || wordObj.surface || wordObj.cleanWord;
    if (!rawDe) return;
    const safeKey = getSafeId(rawDe);

    setSavedWordsMap((prev) => {
      const next = {
        ...prev,
        [safeKey]: {
          de: rawDe,
          es: wordObj.translationEs || wordObj.es || '',
          pos: wordObj.pos || 'Wort',
          level: wordObj.level || activeStory?.level || 'A1',
          storyId: activeStory?.id || 'catalog',
          savedAt: new Date().toISOString()
        }
      };
      readleStorage.setItem(STORAGE_KEYS.savedWords, next).catch(() => {});
      syncReadleStateToCloud({ savedStoryWords: next });
      return next;
    });

    await recordCardStudied(safeKey);
  }, [activeStory, syncReadleStateToCloud]);

  // Auto-scroll suave a la oración activa en modo Karaoke
  useEffect(() => {
    if (activeTab === 'historia' && activeSentenceIndex >= 0 && lastScrolledSentenceRef.current !== activeSentenceIndex) {
      const node = sentenceRefs.current[activeSentenceIndex];
      if (node && typeof node.scrollIntoView === 'function') {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        lastScrolledSentenceRef.current = activeSentenceIndex;
      }
    }
  }, [activeSentenceIndex, activeTab]);

  // Limpia audio al cambiar de pestaña
  const handleTabChange = (nextTab) => {
    cleanupPlayback();
    setActiveTab(nextTab);
    if (nextTab !== 'historia') {
      setSelectedWordInfo(null);
      setSelectedTokenKey(null);
    }
  };

  // Abrir una historia desde el catálogo
  const handleSelectStory = (story) => {
    cleanupPlayback();
    setSelectedStoryId(story.id);
    setActiveTab('historia');
    setSelectedWordInfo(null);
    setSelectedTokenKey(null);
    setSelectedSentenceIdx(null);
    setConjugationModalVerb(null);
    setCurrentExamIdx(0);
    setShowFlashcardTrainer(false);
    recordDailyStudyActivity();
  };

  // Cerrar vista de historia y regresar al catálogo
  const handleBackToCatalog = () => {
    cleanupPlayback();
    setSelectedStoryId(null);
    setSelectedWordInfo(null);
    setSelectedTokenKey(null);
    setSelectedSentenceIdx(null);
    setConjugationModalVerb(null);
    setShowFlashcardTrainer(false);
  };

  // Pulsar palabra en el texto alemán
  const handleWordTap = (token) => {
    if (!activeStory || !token?.isWord) return;
    const resolved = lookupWordInStory(token.text, activeStory);
    setSelectedWordInfo(resolved);
    setSelectedTokenKey(token.tokenKey);
    setSelectedSentenceIdx(token.sentenceIdx);
  };

  // Reproducir audio karaoke (historia completa o frase única)
  const startKaraokePlayback = async (mode, targetSentenceIdx = null) => {
    if (!activeStory) return;

    // Pausar o reanudar si ya está cargado el mismo modo historia
    if (mode === 'story' && playbackMode === 'story' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }
      if (audioRef.current.ended) {
        audioRef.current.currentTime = 0;
        lastScrolledSentenceRef.current = -1;
      }
      audioRef.current.playbackRate = playbackSpeedRef.current;
      audioRef.current.preservesPitch = true;
      await audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      return;
    }

    const sentenceData = targetSentenceIdx !== null ? tokenizedStory.sentences[targetSentenceIdx] : null;
    const textToPlay = mode === 'sentence' ? sentenceData?.de : tokenizedStory.fullText;
    if (!textToPlay) return;

    const timings = mode === 'sentence'
      ? (sentenceData?.wordTimings || []).map((t) => ({
          globalWordIdx: t.globalWordIdx,
          sentenceIdx: t.sentenceIdx,
          startRatio: t.startRatio,
          endRatio: t.endRatio
        }))
      : tokenizedStory.flatWordTimings;

    cleanupPlayback();
    const runId = playbackRunIdRef.current;
    setPlaybackMode(mode);
    setIsAudioLoading(true);
    recordDailyStudyActivity();

    try {
      const cacheKey = getSafeAudioKey(textToPlay);
      let resolvedSource = null;
      let isObjectUrl = false;

      // 1. Revisar caché local IndexedDB
      if (cacheKey) {
        const cached = await audioStore.getItem(cacheKey);
        if (runId !== playbackRunIdRef.current) return;
        if (cached instanceof Blob) {
          resolvedSource = URL.createObjectURL(cached);
          isObjectUrl = true;
        }
      }

      // 2. Obtener desde Firestore CDN / Cloud Function synthesizeGermanSpeech
      if (!resolvedSource) {
        const remoteUrl = await getGermanSpeechUrl(textToPlay, {
          voice: 'Charon',
          type: mode === 'sentence' ? 'vocab' : 'reading'
        });
        if (runId !== playbackRunIdRef.current) return;

        try {
          const resp = await fetch(remoteUrl);
          if (runId !== playbackRunIdRef.current) return;
          if (resp.ok) {
            const blob = await resp.blob();
            if (runId !== playbackRunIdRef.current) return;
            if (cacheKey) {
              audioStore.setItem(cacheKey, blob).catch(() => {});
            }
            resolvedSource = URL.createObjectURL(blob);
            isObjectUrl = true;
          } else {
            resolvedSource = remoteUrl;
          }
        } catch (_) {
          resolvedSource = remoteUrl;
        }
      }

      if (runId !== playbackRunIdRef.current) {
        if (isObjectUrl && resolvedSource) URL.revokeObjectURL(resolvedSource);
        return;
      }

      const audio = new Audio(resolvedSource);
      audio.playbackRate = playbackSpeedRef.current;
      audio.preservesPitch = true;
      audio.onloadedmetadata = () => {
        audio.playbackRate = playbackSpeedRef.current;
        audio.preservesPitch = true;
      };
      audioRef.current = audio;
      if (isObjectUrl) objectUrlRef.current = resolvedSource;

      audio.onplay = () => {
        if (runId !== playbackRunIdRef.current) return;
        setIsAudioLoading(false);
        setIsPlaying(true);
      };

      audio.ontimeupdate = () => {
        if (runId !== playbackRunIdRef.current || !audio.duration || audio.duration === 0) return;
        const progress = audio.currentTime / audio.duration;
        const active = timings.find((w) => progress >= w.startRatio && progress < w.endRatio) || timings[timings.length - 1];
        if (active) {
          setActiveGlobalWordIndex(active.globalWordIdx);
          setActiveSentenceIndex(active.sentenceIdx);
        }
      };

      audio.onended = () => {
        if (runId !== playbackRunIdRef.current) return;
        if (isLoopingRef.current) {
          audio.currentTime = 0;
          lastScrolledSentenceRef.current = -1;
          audio.play().catch(() => {});
          return;
        }
        setIsPlaying(false);
        setActiveGlobalWordIndex(-1);
        setActiveSentenceIndex(-1);
        lastScrolledSentenceRef.current = -1;
      };

      audio.onerror = () => {
        if (runId !== playbackRunIdRef.current) return;
        cleanupPlayback();
        nativeSpeak(textToPlay);
      };

      await audio.play();
    } catch (err) {
      if (runId !== playbackRunIdRef.current) return;
      console.warn('[Readle Audio] Fallback a síntesis nativa + karaoke estimado:', err?.message || err);
      setIsAudioLoading(false);
      setIsPlaying(true);
      nativeSpeak(textToPlay);

      const estimatedDurationMs = Math.max(2500, (textToPlay.split(/\s+/).length * 420) / playbackSpeedRef.current);
      const startedAt = Date.now();
      fallbackTimerRef.current = setInterval(() => {
        if (runId !== playbackRunIdRef.current) return;
        const elapsed = Date.now() - startedAt;
        const ratio = Math.min(1, elapsed / estimatedDurationMs);
        if (ratio >= 1) {
          cleanupPlayback();
          return;
        }
        const active = timings.find((w) => ratio >= w.startRatio && ratio < w.endRatio);
        if (active) {
          setActiveGlobalWordIndex(active.globalWordIdx);
          setActiveSentenceIndex(active.sentenceIdx);
        }
      }, 90);
    }
  };

  // Pronunciación rápida de palabras o preguntas
  const speakQuickGerman = (text) => {
    if (!text) return;
    cleanupPlayback();
    playGermanAudio(text, { voice: 'Charon', type: 'vocab' });
  };

  // Generación de Nueva Historia IA
  const handleGenerateAiStory = async () => {
    if (!genTopic.trim() || genLoading) return;
    cleanupPlayback();
    setGenLoading(true);
    setGenError('');
    const steps = [
      'Conectando con el motor Gemini 3.8 Flash...',
      'Redactando historia inmersiva A1/A2 y traducción interlineal...',
      'Construyendo tablas verbales y examen Cloze...',
      'Guardando en global_stories y biblioteca local...'
    ];
    let stepIdx = 0;
    setGenLoadingStep(steps[0]);
    const interval = setInterval(() => {
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        setGenLoadingStep(steps[stepIdx]);
      }
    }, 2200);

    try {
      if (!functions) throw new Error('Firebase functions no inicializado');
      const generateFn = httpsCallable(functions, 'generateReadingTest');
      const res = await generateFn({
        tema: genTopic.trim(),
        mode: 'immersive_readle',
        category: genCategory,
        level: genLevel
      });
      if (!res?.data?.sentences?.length) {
        throw new Error('La respuesta IA no incluyó oraciones válidas.');
      }
      const newStory = res.data;
      setCustomStories((prev) => {
        const next = [newStory, ...prev.filter((s) => s.id !== newStory.id)];
        readleStorage.setItem(STORAGE_KEYS.customStories, next).catch(() => {});
        return next;
      });
      setShowGeneratorModal(false);
      setGenTopic('');
      handleSelectStory(newStory);
    } catch (err) {
      console.error('[Readle AI Gen Error]:', err);
      setGenError(err?.message || 'No se pudo generar la historia IA. Verifica tu conexión e inténtalo de nuevo.');
    } finally {
      clearInterval(interval);
      setGenLoading(false);
      setGenLoadingStep('');
    }
  };

  // Filtrado de historias en el catálogo
  const filteredStories = useMemo(() => {
    return allStories.filter((story) => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'favorites') return favoriteIds.includes(story.id);
      if (activeCategory === 'learned') return learnedIds.includes(story.id);
      return story.category === activeCategory;
    });
  }, [allStories, activeCategory, favoriteIds, learnedIds]);

  // Responder pregunta de examen
  const currentStoryAnswers = activeStory ? examAnswers[activeStory.id] || {} : {};
  const handleSelectExamOption = (qIdx, optIdx) => {
    if (!activeStory || currentStoryAnswers[qIdx] !== undefined) return;
    recordDailyStudyActivity();
    const updatedStoryAnswers = { ...currentStoryAnswers, [qIdx]: optIdx };
    setExamAnswers((prev) => ({ ...prev, [activeStory.id]: updatedStoryAnswers }));

    const questions = activeStory.examQuestions || [];
    if (Object.keys(updatedStoryAnswers).length === questions.length && questions.length > 0) {
      const correctCount = questions.reduce(
        (acc, q, idx) => acc + (updatedStoryAnswers[idx] === q.correctIndex ? 1 : 0),
        0
      );
      const pct = Math.round((correctCount / questions.length) * 100);
      recordGoetheScore(`readle_${activeStory.id}`, pct);
    }
  };

  const resetStoryExam = () => {
    if (!activeStory) return;
    setExamAnswers((prev) => ({ ...prev, [activeStory.id]: {} }));
    setCurrentExamIdx(0);
  };

  // Iniciar entrenador Flashcards desde pestaña Palabras
  const openFlashcardTrainer = () => {
    if (!activeStory?.keyWords?.length) return;
    cleanupPlayback();
    setTrainerCards([...activeStory.keyWords]);
    setTrainerIdx(0);
    setTrainerFlipped(false);
    setShowFlashcardTrainer(true);
  };

  const shuffleTrainerCards = () => {
    setTrainerCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setTrainerIdx(0);
    setTrainerFlipped(false);
  };

  const fontPreset = FONT_SIZE_PRESETS[fontScaleIdx] || FONT_SIZE_PRESETS[1];
  const savedCount = Object.keys(savedWordsMap).length;

  // =========================================================================
  // RENDER 1: BIBLIOTECA & GENERADOR IA (CUANDO NO HAY HISTORIA ACTIVA)
  // =========================================================================
  if (!activeStory) {
    const activeCatMeta = STORY_CATEGORIES.find((c) => c.id === genCategory);
    return (
      <div className="min-h-[100dvh] w-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3.5 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <BookOpen size={20} />
              </div>
              <div>
                <h1 className="font-black text-base sm:text-lg tracking-tight text-white">
                  Leselabor &amp; Tagesgeschichten <span className="text-teal-400">PRO</span>
                </h1>
                <p className="text-xs text-slate-400">
                  Estudio inmersivo A1/A2 • {learnedIds.length}/{allStories.length} aprendidas • {savedCount} tarjetas guardadas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setGenError('');
                  setShowGeneratorModal(true);
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm transition shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                <Sparkles size={16} />
                ✨ Generar Nueva Historia IA
              </button>
              <button
                onClick={() => {
                  cleanupPlayback();
                  if (onExit) onExit();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition cursor-pointer"
              >
                <X size={16} /> Salir
              </button>
            </div>
          </div>
        </header>

        {/* FILTER PILLS */}
        <div className="border-b border-slate-800/80 bg-slate-900/50 px-4 py-3 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: `Todas (${allStories.length})` },
              { id: 'enpal', label: '⚡ Enpal (Interior)' },
              { id: 'behoerden', label: '🏛️ Trámites & Behörden' },
              { id: 'familie', label: '👨‍👩‍👧‍👦 Familia & Hogar' },
              { id: 'favorites', label: `❤️ Favoritas (${favoriteIds.length})` },
              { id: 'learned', label: `✓ Aprendidas (${learnedIds.length})` }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setActiveCategory(pill.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                  activeCategory === pill.id
                    ? 'bg-teal-500/20 text-teal-300 border-teal-400/60'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* STORY CARDS GRID */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
          {filteredStories.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center my-8">
              <p className="text-slate-300 font-bold text-base">No hay historias en este filtro todavía.</p>
              <p className="text-slate-500 text-sm mt-1">
                Marca historias con ❤️ o ✓, o genera una nueva historia personalizada con IA.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStories.map((story) => {
                const isFav = favoriteIds.includes(story.id);
                const isLearned = learnedIds.includes(story.id);
                const catBadge =
                  story.category === 'enpal'
                    ? '⚡ Enpal Interior'
                    : story.category === 'behoerden'
                      ? '🏛️ Behörden'
                      : '👨‍👩‍👧‍👦 Familia';

                return (
                  <div
                    key={story.id}
                    onClick={() => handleSelectStory(story)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectStory(story)}
                    className={`group text-left rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-sm ${
                      isLearned
                        ? 'bg-slate-900/90 border-emerald-500/30 hover:border-teal-400/60'
                        : 'bg-slate-900 border-slate-800 hover:border-teal-400/60 hover:bg-slate-900/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl leading-none">{story.emoji}</span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                              {story.levelLabel || story.level}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300">
                              {story.readTime || '3 min'}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(story.id, e)}
                          aria-label={isFav ? 'Quitar de favoritas' : 'Marcar como favorita'}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            isFav ? 'text-rose-400 bg-rose-500/10' : 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
                          }`}
                        >
                          <Heart size={18} className={isFav ? 'fill-current' : ''} />
                        </button>
                      </div>

                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {catBadge}
                      </p>
                      <h2 className="font-extrabold text-white text-base leading-snug group-hover:text-teal-300 transition">
                        {story.titleDe}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">{story.titleEs}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        {story.sentences?.length || 7} oraciones • {story.examQuestions?.length || 4} preguntas
                      </span>
                      {isLearned ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle2 size={14} /> Aprendida
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-teal-400 font-bold group-hover:translate-x-0.5 transition">
                          Leer <ArrowRight size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* MODAL GENERADOR DE NUEVA HISTORIA IA */}
        {showGeneratorModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="text-teal-400" size={20} />
                  <h2 className="font-black text-white text-lg">Generar Historia Readle con IA</h2>
                </div>
                <button
                  onClick={() => !genLoading && setShowGeneratorModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {STORY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setGenCategory(cat.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                      genCategory === cat.id
                        ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {cat.badge}
                  </button>
                ))}
              </div>

              {genCategory === 'enpal' && (
                <p className="text-[11px] bg-teal-950/60 border border-teal-500/30 text-teal-200 rounded-xl px-3 py-2">
                  ⚡ Regla Enpal activa: las historias generadas tratan solo trabajo eléctrico interior (Keller, Zählerschrank, Wechselrichter, Speicher, Wallbox, VDE), sin montaje en tejado.
                </p>
              )}

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Nivel MCER:</span>
                {['A1', 'A2'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setGenLevel(lvl)}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold border cursor-pointer ${
                      genLevel === lvl
                        ? 'bg-teal-500 text-slate-950 border-teal-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div>
                <label htmlFor="readleTopicInput" className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                  Tema de la historia
                </label>
                <input
                  id="readleTopicInput"
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  onFocus={scrollInputIntoView}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateAiStory()}
                  placeholder="Ej. Messprotokoll im Technikraum ausfüllen..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              {activeCatMeta?.suggestedTopics && (
                <div className="space-y-1.5">
                  <p className="text-[11px] text-slate-400 font-semibold">Sugerencias rápidas:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCatMeta.suggestedTopics.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGenTopic(sug)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {genError && (
                <div className="bg-rose-950/70 border border-rose-500/40 rounded-xl p-3 flex items-center gap-2 text-xs text-rose-200">
                  <AlertTriangle size={16} className="shrink-0 text-rose-400" />
                  <span>{genError}</span>
                </div>
              )}

              {genLoading && (
                <div className="bg-slate-950 border border-teal-500/30 rounded-xl p-3 flex items-center gap-3 text-xs text-teal-300">
                  <Loader2 size={18} className="animate-spin shrink-0" />
                  <span>{genLoadingStep}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerateAiStory}
                disabled={!genTopic.trim() || genLoading}
                className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer transition"
              >
                {genLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                {genLoading ? 'Creando estudio Readle...' : 'Generar y Abrir Historia'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // RENDER 2: ESTUDIO INMERSIVO DE 4 PESTAÑAS (HISTORIA ACTIVA)
  // =========================================================================
  const isFavActive = favoriteIds.includes(activeStory.id);
  const isLearnedActive = learnedIds.includes(activeStory.id);
  const examQuestions = activeStory.examQuestions || [];
  const activeQuestion = examQuestions[currentExamIdx];
  const selectedWordDeckKey = selectedWordInfo
    ? getSafeId(selectedWordInfo.lemma || selectedWordInfo.cleanWord)
    : null;
  const isSelectedWordSaved = selectedWordDeckKey ? Boolean(savedWordsMap[selectedWordDeckKey]) : false;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* CABECERA DINÁMICA CONTEXTUAL (TOP BAR + HERO / INSPECTOR DE PALABRA) */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 pt-3 pb-2 flex items-center justify-between gap-2">
          <button
            onClick={handleBackToCatalog}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
          >
            <ChevronLeft size={16} /> Catálogo
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleLearned(activeStory.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                isLearnedActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-teal-400/50'
              }`}
            >
              <Check size={14} /> {isLearnedActive ? 'Aprendida ✓' : 'Marcar como aprendida'}
            </button>

            <button
              onClick={() => {
                cleanupPlayback();
                if (onExit) onExit();
              }}
              aria-label="Salir del módulo"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* TRANSFORMACIÓN CONTEXTUAL: INSPECTOR DE PALABRA O HERO DE HISTORIA */}
        <div className="max-w-4xl mx-auto px-4 pb-3">
          {selectedWordInfo && activeTab === 'historia' ? (
            <div className="bg-slate-950/90 border border-teal-500/40 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span translate="no" className="notranslate text-lg sm:text-xl font-black text-teal-300">
                    {selectedWordInfo.lemma}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-bold">
                    {selectedWordInfo.pos}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px] font-extrabold">
                    {selectedWordInfo.level}
                  </span>
                </div>
                <p className="text-sm text-slate-200 font-medium mt-1">
                  {selectedWordInfo.translationEs}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => speakQuickGerman(selectedWordInfo.cleanWord || selectedWordInfo.lemma)}
                  aria-label="Escuchar pronunciación"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold border border-slate-700 cursor-pointer"
                >
                  <Play size={14} className="fill-current" /> Pronunciar
                </button>

                <button
                  onClick={() => handleSaveWordToDeck(selectedWordInfo)}
                  title="Guardar en mi mazo de tarjetas"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    isSelectedWordSaved
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <Dumbbell size={14} /> {isSelectedWordSaved ? 'En mazo' : 'Tarjeta'}
                </button>

                {selectedWordInfo.isVerb && selectedWordInfo.conjugation && (
                  <button
                    onClick={() => setConjugationModalVerb(selectedWordInfo.conjugation)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-black transition cursor-pointer"
                  >
                    conjugar →
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedWordInfo(null);
                    setSelectedTokenKey(null);
                  }}
                  aria-label="Cerrar inspector"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none mt-0.5">{activeStory.emoji}</span>
                <div className="min-w-0">
                  <h2 translate="no" className="notranslate text-lg sm:text-xl font-black text-white leading-tight">
                    {activeStory.titleDe}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{activeStory.titleEs}</p>
                </div>
              </div>

              {/* BARRA DE HERRAMIENTAS BAJO EL TÍTULO */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 text-xs font-extrabold">
                  {activeStory.levelLabel || activeStory.level}
                </span>

                <button
                  onClick={() => setShowInterlinear((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    showInterlinear
                      ? 'bg-teal-500/20 text-teal-300 border-teal-400/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title="Mostrar/ocultar traducción interlineal"
                >
                  <Languages size={14} /> 文A
                </button>

                <button
                  onClick={() => setFontScaleIdx((prev) => (prev + 1) % FONT_SIZE_PRESETS.length)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                  title="Cambiar tamaño de fuente"
                >
                  Aa <span className="text-[10px] text-teal-300">({fontPreset.label})</span>
                </button>

                <button
                  onClick={() => toggleFavorite(activeStory.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    isFavActive
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-rose-300'
                  }`}
                  aria-label="Favorito"
                >
                  <Heart size={14} className={isFavActive ? 'fill-current' : ''} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4 PESTAÑAS SUPERIORES */}
        <nav className="max-w-4xl mx-auto px-4 flex border-t border-slate-800/80">
          {[
            { id: 'historia', label: 'Historia' },
            { id: 'examen', label: `Examen (${Object.keys(currentStoryAnswers).length}/${examQuestions.length})` },
            { id: 'palabras', label: `Palabras (${activeStory.keyWords?.length || 0})` },
            { id: 'gramatica', label: `Gramática (${activeStory.grammarCards?.length || 0})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-extrabold border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'border-teal-400 text-teal-300 bg-teal-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL POR PESTAÑA */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5 pb-28">
        {/* ==================== PESTAÑA 1: HISTORIA ==================== */}
        {activeTab === 'historia' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400 flex items-center justify-between px-1">
              <span>Toca cualquier palabra alemana para traducirla, guardarla o conjugarla.</span>
              <span className="hidden sm:inline text-teal-400 font-semibold">{activeStory.readTime}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5 shadow-lg">
              {tokenizedStory.sentences.map((sent) => {
                const isSentenceActive = activeSentenceIndex === sent.sentenceIdx;
                const isSentenceSelected = selectedSentenceIdx === sent.sentenceIdx;
                return (
                  <div
                    key={sent.sentenceIdx}
                    ref={(el) => {
                      sentenceRefs.current[sent.sentenceIdx] = el;
                    }}
                    onClick={() => setSelectedSentenceIdx(sent.sentenceIdx)}
                    className={`rounded-xl p-3 -mx-2 transition-colors ${
                      isSentenceActive
                        ? 'bg-teal-500/10 border-l-2 border-teal-400'
                        : isSentenceSelected
                          ? 'bg-slate-800/60 border-l-2 border-teal-500/50'
                          : 'border-l-2 border-transparent'
                    }`}
                  >
                    <p translate="no" className={`notranslate text-slate-100 select-none ${fontPreset.deClass}`}>
                      {sent.tokens.map((tok, idx) => {
                        if (tok.isWord) {
                          const isKaraoke = tok.globalWordIdx === activeGlobalWordIndex;
                          const isSelected = tok.tokenKey === selectedTokenKey;
                          return (
                            <span
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWordTap(tok);
                              }}
                              className={`inline-block cursor-pointer transition-all duration-150 rounded px-0.5 mx-[1px] ${
                                isKaraoke
                                  ? 'bg-teal-400 text-slate-950 font-bold rounded px-1 shadow-sm'
                                  : isSelected
                                    ? 'bg-teal-500/30 text-teal-200 ring-1 ring-teal-400/50'
                                    : 'hover:bg-slate-800 hover:text-teal-200'
                              }`}
                            >
                              {tok.text}
                            </span>
                          );
                        }
                        const isPunct = /^[.,!?:;]+$/.test(tok.text);
                        return (
                          <span key={idx} className={isPunct ? 'mr-0.5 text-slate-300' : ''}>
                            {tok.text}
                          </span>
                        );
                      })}
                    </p>

                    {showInterlinear && (
                      <p className={`mt-1.5 text-teal-300/90 font-medium leading-snug ${fontPreset.esClass}`}>
                        {sent.es}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== PESTAÑA 2: EXAMEN ==================== */}
        {activeTab === 'examen' && (
          <div className="space-y-5">
            {examQuestions.length > 0 && activeQuestion ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 text-xs font-extrabold">
                      Pregunta {currentExamIdx + 1}/{examQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      {activeQuestion.type === 'cloze' || activeQuestion.prompt?.includes('___')
                        ? 'Hueco Gramatical (Cloze)'
                        : 'Comprensión Lectora'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {examQuestions.map((_, idx) => {
                      const ans = currentStoryAnswers[idx];
                      const isDone = ans !== undefined;
                      const isRight = isDone && ans === examQuestions[idx].correctIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentExamIdx(idx)}
                          className={`w-7 h-7 rounded-lg text-xs font-extrabold border transition cursor-pointer ${
                            currentExamIdx === idx
                              ? 'border-teal-400 ring-2 ring-teal-400/30 '
                              : 'border-slate-700 '
                          }${
                            isDone
                              ? isRight
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
                              : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 translate="no" className="notranslate font-bold text-white text-base sm:text-lg leading-snug">
                      {activeQuestion.prompt}
                    </h3>
                    <button
                      onClick={() => speakQuickGerman(activeQuestion.prompt.replace(/___/g, ' '))}
                      aria-label="Escuchar pregunta"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 shrink-0 cursor-pointer"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {(activeQuestion.options || []).map((opt, oIdx) => {
                      const chosen = currentStoryAnswers[currentExamIdx];
                      const isAnswered = chosen !== undefined;
                      const isSelected = chosen === oIdx;
                      const isCorrect = oIdx === activeQuestion.correctIndex;

                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-teal-400/60 hover:bg-slate-800/60';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold';
                        } else {
                          btnStyle = 'bg-slate-950 border-slate-800 text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectExamOption(currentExamIdx, oIdx)}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                        >
                          <span translate="no" className="notranslate">{opt}</span>
                          {isAnswered && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {currentStoryAnswers[currentExamIdx] !== undefined && (
                    <div
                      className={`rounded-xl p-4 border flex items-start gap-3 text-sm ${
                        currentStoryAnswers[currentExamIdx] === activeQuestion.correctIndex
                          ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-100'
                          : 'bg-amber-950/50 border-amber-500/40 text-amber-100'
                      }`}
                    >
                      <Lightbulb size={18} className="shrink-0 mt-0.5 text-teal-300" />
                      <div>
                        <p className="font-bold text-teal-300 mb-1">
                          {currentStoryAnswers[currentExamIdx] === activeQuestion.correctIndex ? '¡Correcto!' : 'Explicación didáctica:'}
                        </p>
                        <p className="text-slate-200 leading-relaxed">{activeQuestion.explanationEs}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      disabled={currentExamIdx === 0}
                      onClick={() => setCurrentExamIdx((p) => Math.max(0, p - 1))}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      ← Anterior
                    </button>

                    {currentExamIdx < examQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentExamIdx((p) => Math.min(examQuestions.length - 1, p + 1))}
                        className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black cursor-pointer"
                      >
                        Siguiente →
                      </button>
                    ) : (
                      <button
                        onClick={resetStoryExam}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold cursor-pointer"
                      >
                        <RefreshCw size={14} /> Repetir examen
                      </button>
                    )}
                  </div>
                </div>

                {Object.keys(currentStoryAnswers).length === examQuestions.length && (
                  <div className="bg-teal-500/15 border border-teal-400/40 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-teal-300">
                        Resultado registrado en Goethe Score:{' '}
                        {examQuestions.reduce(
                          (acc, q, idx) => acc + (currentStoryAnswers[idx] === q.correctIndex ? 1 : 0),
                          0
                        )}
                        /{examQuestions.length}
                      </p>
                      <p className="text-xs text-slate-300">Tu puntuación ya suma para las estadísticas del perfil.</p>
                    </div>
                    <CheckCircle2 size={24} className="text-teal-400 shrink-0" />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                Esta historia no contiene preguntas configuradas.
              </div>
            )}
          </div>
        )}

        {/* ==================== PESTAÑA 3: PALABRAS & TRAINER ==================== */}
        {activeTab === 'palabras' && (
          <div className="space-y-4">
            {!showFlashcardTrainer ? (
              <>
                <button
                  onClick={openFlashcardTrainer}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-between shadow-lg shadow-teal-500/20 cursor-pointer transition"
                >
                  <span className="flex items-center gap-2">
                    <Dumbbell size={18} /> Memorizar palabras clave →
                  </span>
                  <span className="text-xs bg-slate-950/20 px-2.5 py-1 rounded-full font-extrabold">
                    {activeStory.keyWords?.length || 0} tarjetas
                  </span>
                </button>

                <div className="space-y-3">
                  {(activeStory.keyWords || []).map((kw, idx) => {
                    const kwKey = getSafeId(kw.de);
                    const isSaved = Boolean(savedWordsMap[kwKey]);
                    return (
                      <div
                        key={idx}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span translate="no" className="notranslate font-black text-white text-base">
                              {kw.de}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px] font-extrabold">
                              {kw.level}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-semibold">
                              {kw.pos}
                            </span>
                          </div>
                          <p className="text-sm text-teal-300 font-semibold">{kw.es}</p>
                          {kw.exampleDe && (
                            <p className="text-xs text-slate-400 pt-1">
                              <span translate="no" className="notranslate text-slate-200">{kw.exampleDe}</span>
                              {kw.exampleEs ? ` — ${kw.exampleEs}` : ''}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => speakQuickGerman(kw.de)}
                            aria-label={`Escuchar ${kw.de}`}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 cursor-pointer"
                          >
                            <Play size={16} className="fill-current" />
                          </button>
                          <button
                            onClick={() => handleSaveWordToDeck(kw)}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                              isSaved
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                            }`}
                          >
                            <Dumbbell size={15} /> {isSaved ? 'En mazo' : 'Guardar'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* ENTRENADOR INTERACTIVO DE FLASHCARDS */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowFlashcardTrainer(false)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Lista de palabras
                  </button>
                  <span className="text-xs font-bold text-teal-300">
                    Tarjeta {trainerIdx + 1} de {trainerCards.length}
                  </span>
                  <button
                    onClick={shuffleTrainerCards}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                  >
                    <Shuffle size={14} /> Mezclar
                  </button>
                </div>

                {trainerCards[trainerIdx] && (
                  <div
                    onClick={() => setTrainerFlipped((f) => !f)}
                    className="bg-slate-900 border-2 border-teal-500/40 rounded-3xl p-7 sm:p-10 min-h-[250px] flex flex-col items-center justify-center text-center gap-4 cursor-pointer shadow-xl select-none"
                  >
                    {!trainerFlipped ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-300 text-xs font-extrabold">
                            {trainerCards[trainerIdx].level}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-semibold">
                            {trainerCards[trainerIdx].pos}
                          </span>
                        </div>
                        <h3 translate="no" className="notranslate text-2xl sm:text-3xl font-black text-white">
                          {trainerCards[trainerIdx].de}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakQuickGerman(trainerCards[trainerIdx].de);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/40 text-xs font-bold cursor-pointer"
                        >
                          <Volume2 size={16} /> Escuchar alemán
                        </button>
                        <p className="text-xs text-slate-500 mt-2">Toca la tarjeta para ver traducción y ejemplo</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-black text-teal-300">{trainerCards[trainerIdx].es}</h3>
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-w-md w-full space-y-1.5">
                          <p translate="no" className="notranslate text-sm font-bold text-white">
                            {trainerCards[trainerIdx].exampleDe}
                          </p>
                          <p className="text-xs text-slate-400">{trainerCards[trainerIdx].exampleEs}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakQuickGerman(trainerCards[trainerIdx].exampleDe || trainerCards[trainerIdx].de);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-teal-300 text-xs font-bold cursor-pointer"
                        >
                          <Volume2 size={16} /> Escuchar frase
                        </button>
                      </>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  <button
                    disabled={trainerIdx === 0}
                    onClick={() => {
                      setTrainerIdx((i) => Math.max(0, i - 1));
                      setTrainerFlipped(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-sm disabled:opacity-40 cursor-pointer"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => handleSaveWordToDeck(trainerCards[trainerIdx])}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-sm border border-slate-700 cursor-pointer"
                    title="Guardar en mazo"
                  >
                    <Dumbbell size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setTrainerIdx((i) => (i + 1) % trainerCards.length);
                      setTrainerFlipped(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm cursor-pointer"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== PESTAÑA 4: GRAMÁTICA ==================== */}
        {activeTab === 'gramatica' && (
          <div className="space-y-5">
            {(activeStory.grammarCards || []).map((card, cIdx) => (
              <div
                key={cIdx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="bg-teal-500/15 border-b border-teal-500/30 px-5 py-3.5 flex items-center justify-between gap-2">
                  <h3 className="font-black text-teal-300 text-base">{card.title}</h3>
                  <button
                    onClick={() => speakQuickGerman(card.exampleDe)}
                    className="p-2 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-teal-300 cursor-pointer"
                    aria-label="Escuchar ejemplo gramatical"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
                    <p translate="no" className="notranslate text-base text-white leading-relaxed">
                      {renderHighlightedSentence(card.exampleDe, card.highlightedPart)}
                    </p>
                    <p className="text-xs text-teal-300/90 font-medium">{card.exampleEs}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">{card.descriptionEs}</p>

                  {card.table?.headers?.length > 0 && (
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-800/80 text-teal-300 font-bold">
                          <tr>
                            {card.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3 py-2.5 whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                          {(card.table.rows || []).map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} translate="no" className="notranslate px-3 py-2 text-slate-200">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {card.extraExamples?.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Más ejemplos en contexto
                      </p>
                      {card.extraExamples.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3"
                        >
                          <div>
                            <p translate="no" className="notranslate text-sm font-semibold text-white">
                              {ex.de}
                            </p>
                            <p className="text-xs text-slate-400">{ex.es}</p>
                          </div>
                          <button
                            onClick={() => speakQuickGerman(ex.de)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 shrink-0 cursor-pointer"
                            aria-label="Escuchar ejemplo extra"
                          >
                            <Play size={14} className="fill-current" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* REPRODUCTOR FLOTANTE INFERIOR (VISIBLE EN PESTAÑA HISTORIA) */}
      {activeTab === 'historia' && (
        <div className="fixed bottom-4 inset-x-0 z-30 px-4 pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-2xl px-3.5 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => startKaraokePlayback('story')}
                disabled={isAudioLoading && playbackMode === 'story'}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs sm:text-sm transition cursor-pointer disabled:opacity-60"
              >
                {isAudioLoading && playbackMode === 'story' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Cargando...
                  </>
                ) : isPlaying && playbackMode === 'story' ? (
                  <>
                    <Pause size={16} className="fill-current" /> ⏸ historia
                  </>
                ) : (
                  <>
                    <Play size={16} className="fill-current" /> ▶ historia
                  </>
                )}
              </button>

              {selectedSentenceIdx !== null && (
                <button
                  onClick={() => startKaraokePlayback('sentence', selectedSentenceIdx)}
                  disabled={isAudioLoading && playbackMode === 'sentence'}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-400/50 text-xs font-extrabold transition cursor-pointer"
                >
                  {isAudioLoading && playbackMode === 'sentence' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Play size={14} className="fill-current" />
                  )}
                  ▶ Frase
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-0.5">
                {SPEED_OPTIONS.map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                      playbackSpeed === spd ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsLooping((prev) => !prev)}
                title="Repetir historia en bucle"
                aria-label="Repetir en bucle"
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isLooping
                    ? 'bg-teal-500/20 text-teal-300 border-teal-400/60'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Repeat size={15} />
              </button>

              {(isPlaying || playbackMode) && (
                <button
                  onClick={cleanupPlayback}
                  title="Detener reproducción"
                  aria-label="Detener reproducción"
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-300 cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONJUGACIÓN VERBAL ESTILO READLE */}
      {conjugationModalVerb && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full max-h-[88dvh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => speakQuickGerman(conjugationModalVerb.infinitive)}
                  className="p-2.5 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 hover:bg-teal-500/30 cursor-pointer"
                  aria-label="Escuchar infinitivo"
                >
                  <Volume2 size={18} />
                </button>
                <div>
                  <h3 translate="no" className="notranslate text-xl font-black text-white">
                    {conjugationModalVerb.infinitive}
                  </h3>
                  <p className="text-xs text-teal-300 font-semibold">
                    {conjugationModalVerb.translationEs} • Perfekt con{' '}
                    <span className="font-bold">{conjugationModalVerb.auxiliary}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConjugationModalVerb(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Präsens & Präteritum side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="bg-teal-500/15 border-b border-slate-800 px-3.5 py-2 text-xs font-black text-teal-300 uppercase">
                    Tiempo presente (Präsens)
                  </div>
                  <div className="divide-y divide-slate-800/70">
                    {PRONOUN_ROWS.map((p) => (
                      <div key={p.key} className="px-3.5 py-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold">{p.label}</span>
                        <span translate="no" className="notranslate text-white font-bold">
                          {conjugationModalVerb.praesens?.[p.key] || '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="bg-slate-800 border-b border-slate-700 px-3.5 py-2 text-xs font-black text-slate-200 uppercase">
                    El pretérito (Präteritum)
                  </div>
                  <div className="divide-y divide-slate-800/70">
                    {PRONOUN_ROWS.map((p) => (
                      <div key={p.key} className="px-3.5 py-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold">{p.label}</span>
                        <span translate="no" className="notranslate text-teal-200 font-bold">
                          {conjugationModalVerb.praeteritum?.[p.key] || '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Perfekt & Partizip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400">El tiempo perfecto (Perfekt)</p>
                    <p translate="no" className="notranslate text-sm font-black text-teal-300 mt-1">
                      {conjugationModalVerb.perfekt}
                    </p>
                  </div>
                  <button
                    onClick={() => speakQuickGerman(conjugationModalVerb.perfekt)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 cursor-pointer"
                    aria-label="Escuchar Perfekt"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400">Participio (Partizip)</p>
                    <p translate="no" className="notranslate text-sm font-black text-white mt-1">
                      {conjugationModalVerb.partizip}
                    </p>
                  </div>
                  <button
                    onClick={() => speakQuickGerman(conjugationModalVerb.partizip)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 cursor-pointer"
                    aria-label="Escuchar Participio"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingComprehension;
