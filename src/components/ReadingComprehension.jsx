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
  ArrowRight,
  Repeat,
  Languages,
  Loader2,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  Shuffle,
  Check,
  Sun,
  Moon
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
  getProcessedSpeechBlobUrl,
  getSavedPlaybackSpeed,
  setSavedPlaybackSpeed,
  playGermanAudio,
  stopCurrentAudio
} from '../services/aiAudioService';
import {
  getCleanSpeedAudioUrl,
  isCleanStretchedUrl,
  unregisterCleanStretchedUrl
} from '../utils/cleanTimeStretch';
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

const SPEED_OPTIONS = [0.75, 0.85, 1];

const PRONOUN_ROWS = [
  { key: 'ich', label: 'ich' },
  { key: 'du', label: 'du' },
  { key: 'er_sie_es', label: 'er / sie / es' },
  { key: 'wir', label: 'wir' },
  { key: 'ihr', label: 'ihr' },
  { key: 'sie_Sie', label: 'sie / Sie' }
];

const CATEGORY_THEMES = {
  enpal: {
    label: '⚡ Enpal Interior',
    heroLight: 'bg-gradient-to-br from-amber-50 via-orange-50/75 to-stone-50 border-amber-200/90',
    heroDark: 'bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 border-amber-500/30',
    badgeLight: 'bg-amber-100 text-amber-800 border-amber-300',
    badgeDark: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    stripe: 'from-amber-500 to-orange-500'
  },
  behoerden: {
    label: '🏛️ Behörden',
    heroLight: 'bg-gradient-to-br from-blue-50 via-indigo-50/70 to-slate-50 border-blue-200/90',
    heroDark: 'bg-gradient-to-br from-blue-950/50 via-slate-900 to-slate-950 border-blue-500/30',
    badgeLight: 'bg-blue-100 text-blue-800 border-blue-300',
    badgeDark: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    stripe: 'from-blue-600 to-indigo-600'
  },
  familie: {
    label: '👨‍👩‍👧‍👦 Familia',
    heroLight: 'bg-gradient-to-br from-emerald-50 via-teal-50/70 to-stone-50 border-emerald-200/90',
    heroDark: 'bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 border-emerald-500/30',
    badgeLight: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeDark: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    stripe: 'from-emerald-600 to-teal-500'
  }
};

function getCategoryTheme(category) {
  return CATEGORY_THEMES[category] || CATEGORY_THEMES.familie;
}

/**
 * Codificación cromática de género gramatical (der/die/das) y categoría verbal.
 */
function getLexiconTheme(item, isDarkMode) {
  const lemma = (item?.lemma || item?.de || '').trim();
  const pos = (item?.pos || '').toLowerCase();
  const isVerb = Boolean(item?.isVerb || item?.conjugation || /\bverb\b/.test(pos));
  const lower = lemma.toLowerCase();

  if (lower.startsWith('der ')) {
    return {
      genderLabel: 'Maskulin • der',
      badgeClass: isDarkMode
        ? 'text-blue-400 bg-blue-950/60 border-blue-800/70'
        : 'text-blue-700 bg-blue-50 border-blue-200',
      wordClass: isDarkMode ? 'text-blue-300' : 'text-blue-700',
      cardBorderClass: isDarkMode ? 'border-blue-500/35' : 'border-blue-200'
    };
  }
  if (lower.startsWith('die ')) {
    return {
      genderLabel: 'Feminin • die',
      badgeClass: isDarkMode
        ? 'text-rose-400 bg-rose-950/60 border-rose-800/70'
        : 'text-rose-700 bg-rose-50 border-rose-200',
      wordClass: isDarkMode ? 'text-rose-300' : 'text-rose-700',
      cardBorderClass: isDarkMode ? 'border-rose-500/35' : 'border-rose-200'
    };
  }
  if (lower.startsWith('das ')) {
    return {
      genderLabel: 'Neutrum • das',
      badgeClass: isDarkMode
        ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/70'
        : 'text-emerald-700 bg-emerald-50 border-emerald-200',
      wordClass: isDarkMode ? 'text-emerald-300' : 'text-emerald-700',
      cardBorderClass: isDarkMode ? 'border-emerald-500/35' : 'border-emerald-200'
    };
  }
  if (isVerb) {
    return {
      genderLabel: 'Verbo',
      badgeClass: isDarkMode
        ? 'text-amber-400 bg-amber-950/60 border-amber-800/70'
        : 'text-amber-700 bg-amber-50 border-amber-200',
      wordClass: isDarkMode ? 'text-amber-300' : 'text-amber-700',
      cardBorderClass: isDarkMode ? 'border-amber-500/35' : 'border-amber-200'
    };
  }
  return {
    genderLabel: item?.pos || 'Wort',
    badgeClass: isDarkMode
      ? 'text-teal-300 bg-slate-800 border-slate-700'
      : 'text-slate-700 bg-slate-100 border-slate-200',
    wordClass: isDarkMode ? 'text-teal-300' : 'text-slate-900',
    cardBorderClass: isDarkMode ? 'border-slate-800' : 'border-slate-200'
  };
}

function renderHighlightedSentence(sentenceDe, highlightedPart, isDarkMode = false) {
  if (!sentenceDe || !highlightedPart) return sentenceDe;
  const idx = sentenceDe.toLowerCase().indexOf(highlightedPart.toLowerCase());
  if (idx === -1) return sentenceDe;
  const before = sentenceDe.slice(0, idx);
  const match = sentenceDe.slice(idx, idx + highlightedPart.length);
  const after = sentenceDe.slice(idx + highlightedPart.length);
  return (
    <>
      {before}
      <strong
        className={`font-extrabold px-1.5 py-0.5 rounded ${
          isDarkMode ? 'text-teal-300 bg-teal-500/20' : 'text-amber-950 bg-amber-200/80'
        }`}
      >
        {match}
      </strong>
      {after}
    </>
  );
}

const ReadingComprehension = ({ onExit }) => {
  // Tema visual (Editorial Diurno por defecto + alternancia Noche OLED)
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  const [playbackSpeed, setPlaybackSpeed] = useState(() => getSavedPlaybackSpeed());
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

  // Referencias mutables para audio, precarga pipeline & scroll sincronizado
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const rafIdRef = useRef(null);
  const prefetchInFlightRef = useRef(new Map());
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
  }, [playbackSpeed]);

  useEffect(() => {
    const syncSpeed = (e) => {
      const next = e?.detail !== undefined ? e.detail : getSavedPlaybackSpeed();
      playbackSpeedRef.current = next;
      setPlaybackSpeed(next);
    };
    window.addEventListener('dm-speed-changed', syncSpeed);
    return () => window.removeEventListener('dm-speed-changed', syncSpeed);
  }, []);

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

  // Libera únicamente el Audio/RAF/ObjectURL activo entre oraciones consecutivas sin invalidar runId
  const releaseCurrentAudioOnly = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onplaying = null;
      audioRef.current.onpause = null;
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
      unregisterCleanStretchedUrl(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  // Limpieza segura de audio, ObjectURLs y timers
  const cleanupPlayback = useCallback(() => {
    playbackRunIdRef.current += 1;
    releaseCurrentAudioOnly();
    stopCurrentAudio();
    setIsAudioLoading(false);
    setIsPlaying(false);
    setPlaybackMode(null);
    setActiveGlobalWordIndex(-1);
    setActiveSentenceIndex(-1);
    lastScrolledSentenceRef.current = -1;
  }, [releaseCurrentAudioOnly]);

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

  // Precarga silenciosa de una oración en caché IndexedDB (deduplicada por frase)
  const prefetchSentenceAudio = useCallback(async (sentenceText) => {
    if (!sentenceText) return null;
    const cacheKey = getSafeAudioKey(sentenceText);
    if (!cacheKey) return null;

    try {
      const cached = await audioStore.getItem(cacheKey);
      if (cached instanceof Blob) {
        if (playbackSpeedRef.current < 0.98) {
          getCleanSpeedAudioUrl(cached, playbackSpeedRef.current, cacheKey)
            .then((warmUrl) => {
              if (warmUrl && warmUrl.startsWith('blob:')) {
                try { URL.revokeObjectURL(warmUrl); } catch (_) {}
                unregisterCleanStretchedUrl(warmUrl);
              }
            })
            .catch(() => {});
        }
        return cached;
      }
    } catch (_) {}

    if (prefetchInFlightRef.current.has(cacheKey)) {
      return prefetchInFlightRef.current.get(cacheKey);
    }

    const job = (async () => {
      try {
        const remoteUrl = await getGermanSpeechUrl(sentenceText, {
          voice: 'Charon',
          type: 'sentence'
        });
        const resp = await fetch(remoteUrl);
        if (!resp.ok) return null;
        const blob = await resp.blob();
        await audioStore.setItem(cacheKey, blob).catch(() => {});
        if (remoteUrl && remoteUrl.startsWith('blob:')) {
          URL.revokeObjectURL(remoteUrl);
          unregisterCleanStretchedUrl(remoteUrl);
        }
        if (playbackSpeedRef.current < 0.98) {
          const warmUrl = await getCleanSpeedAudioUrl(blob, playbackSpeedRef.current, cacheKey).catch(() => null);
          if (warmUrl && warmUrl.startsWith('blob:')) {
            try { URL.revokeObjectURL(warmUrl); } catch (_) {}
            unregisterCleanStretchedUrl(warmUrl);
          }
        }
        return blob;
      } catch (_) {
        return null;
      } finally {
        prefetchInFlightRef.current.delete(cacheKey);
      }
    })();

    prefetchInFlightRef.current.set(cacheKey, job);
    return job;
  }, []);

  // Al abrir una historia, precarga silenciosamente las 2 primeras frases para arranque instantáneo
  useEffect(() => {
    if (!activeStory?.id || !tokenizedStory.sentences.length) return;
    const first = tokenizedStory.sentences[0]?.de;
    const second = tokenizedStory.sentences[1]?.de;
    if (first) prefetchSentenceAudio(first);
    if (second) prefetchSentenceAudio(second);
  }, [activeStory?.id, tokenizedStory.sentences, prefetchSentenceAudio]);

  // Reproducción encadenada frase-a-frase con precarga i+1 y sincronía estricta con Audio
  const playSentenceStep = useCallback(async (sIdx, seqMode, runId) => {
    const sentences = tokenizedStory.sentences || [];
    const sent = sentences[sIdx];
    if (!sent || runId !== playbackRunIdRef.current) return;

    releaseCurrentAudioOnly();

    // Mientras suena la frase i, precargar silenciosamente la frase i + 1
    if (seqMode === 'story' && sentences[sIdx + 1]?.de) {
      prefetchSentenceAudio(sentences[sIdx + 1].de);
    }

    const timings = sent.wordTimings || [];

    const advanceOrFinish = () => {
      if (runId !== playbackRunIdRef.current) return;
      releaseCurrentAudioOnly();

      if (seqMode === 'sentence') {
        if (isLoopingRef.current) {
          playSentenceStep(sIdx, 'sentence', runId);
          return;
        }
        setIsPlaying(false);
        setPlaybackMode(null);
        setActiveGlobalWordIndex(-1);
        setActiveSentenceIndex(-1);
        lastScrolledSentenceRef.current = -1;
        return;
      }

      const nextIdx = sIdx + 1;
      if (nextIdx < sentences.length) {
        playSentenceStep(nextIdx, 'story', runId);
      } else if (isLoopingRef.current) {
        lastScrolledSentenceRef.current = -1;
        playSentenceStep(0, 'story', runId);
      } else {
        setIsPlaying(false);
        setPlaybackMode(null);
        setActiveGlobalWordIndex(-1);
        setActiveSentenceIndex(-1);
        lastScrolledSentenceRef.current = -1;
      }
    };

    const runNativeFallbackStep = () => {
      if (runId !== playbackRunIdRef.current) return;
      releaseCurrentAudioOnly();
      setIsAudioLoading(false);
      setIsPlaying(true);
      setActiveSentenceIndex(sIdx);
      nativeSpeak(sent.de);

      const wordCount = Math.max(1, sent.de.split(/\s+/).length);
      const estimatedDurationMs = Math.max(1600, (wordCount * 420) / playbackSpeedRef.current);
      const startedAt = Date.now();
      fallbackTimerRef.current = setInterval(() => {
        if (runId !== playbackRunIdRef.current) return;
        const elapsed = Date.now() - startedAt;
        const ratio = Math.min(1, elapsed / estimatedDurationMs);
        if (ratio >= 1) {
          advanceOrFinish();
          return;
        }
        if (elapsed >= 120) {
          const active =
            timings.find((w) => ratio >= w.startRatio && ratio < w.endRatio) ||
            timings[timings.length - 1];
          if (active && active.globalWordIdx >= 0) {
            setActiveGlobalWordIndex(active.globalWordIdx);
          }
        }
      }, 60);
    };

    try {
      const activeSpeed = playbackSpeedRef.current;
      const cacheKey = getSafeAudioKey(sent.de);
      let resolvedSource = null;
      let isObjectUrl = false;

      let blob = cacheKey ? await audioStore.getItem(cacheKey) : null;
      if (runId !== playbackRunIdRef.current) return;

      if (!(blob instanceof Blob)) {
        setIsAudioLoading(true);
        if (cacheKey && prefetchInFlightRef.current.has(cacheKey)) {
          blob = await prefetchInFlightRef.current.get(cacheKey);
        } else {
          blob = await prefetchSentenceAudio(sent.de);
        }
        if (runId !== playbackRunIdRef.current) return;
      }

      if (blob instanceof Blob) {
        resolvedSource =
          activeSpeed < 0.98
            ? await getCleanSpeedAudioUrl(blob, activeSpeed, cacheKey)
            : URL.createObjectURL(blob);
        isObjectUrl = Boolean(resolvedSource && resolvedSource.startsWith('blob:'));
      } else {
        const processedUrl = await getProcessedSpeechBlobUrl(sent.de, {
          voice: 'Charon',
          type: 'sentence',
          speed: activeSpeed
        });
        resolvedSource = processedUrl;
        isObjectUrl = Boolean(processedUrl && processedUrl.startsWith('blob:'));
      }

      if (runId !== playbackRunIdRef.current || !resolvedSource) {
        if (isObjectUrl && resolvedSource) {
          try { URL.revokeObjectURL(resolvedSource); } catch (_) {}
          unregisterCleanStretchedUrl(resolvedSource);
        }
        if (!resolvedSource) runNativeFallbackStep();
        return;
      }

      const targetRate = isCleanStretchedUrl(resolvedSource) ? 1.0 : activeSpeed;
      const audio = new Audio(resolvedSource);
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
      if (isObjectUrl) objectUrlRef.current = resolvedSource;

      let hasEmittedSound = false;

      const syncWordToClock = () => {
        if (runId !== playbackRunIdRef.current || audioRef.current !== audio) return;
        if (!hasEmittedSound || audio.paused || !audio.duration || audio.currentTime <= 0) return;
        const progress = Math.min(0.9999, audio.currentTime / audio.duration);
        const active =
          timings.find((w) => progress >= w.startRatio && progress < w.endRatio) ||
          timings[timings.length - 1];
        if (active && active.globalWordIdx >= 0) {
          setActiveGlobalWordIndex((prev) => (prev === active.globalWordIdx ? prev : active.globalWordIdx));
        }
      };

      const startRafLoop = () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        const tick = () => {
          if (runId !== playbackRunIdRef.current || audioRef.current !== audio || audio.paused || audio.ended) {
            rafIdRef.current = null;
            return;
          }
          syncWordToClock();
          rafIdRef.current = requestAnimationFrame(tick);
        };
        rafIdRef.current = requestAnimationFrame(tick);
      };

      audio.onplaying = () => {
        if (runId !== playbackRunIdRef.current) return;
        hasEmittedSound = true;
        setIsAudioLoading(false);
        setIsPlaying(true);
        setActiveSentenceIndex(sIdx);
        syncWordToClock();
        startRafLoop();
      };

      audio.ontimeupdate = () => {
        if (runId !== playbackRunIdRef.current) return;
        if (!hasEmittedSound && audio.currentTime > 0 && !audio.paused) {
          hasEmittedSound = true;
          setIsAudioLoading(false);
          setIsPlaying(true);
          setActiveSentenceIndex(sIdx);
          startRafLoop();
        }
        syncWordToClock();
      };

      audio.onpause = () => {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      };

      audio.onended = advanceOrFinish;
      audio.onerror = runNativeFallbackStep;

      await audio.play();
    } catch (err) {
      if (runId !== playbackRunIdRef.current) return;
      console.warn('[Readle Audio] Fallback a síntesis nativa por frase:', err?.message || err);
      runNativeFallbackStep();
    }
  }, [prefetchSentenceAudio, releaseCurrentAudioOnly, tokenizedStory.sentences]);

  // Cambia velocidad global exclusivamente entre 0.75x (Phase Vocoder) y 1x
  const handleSelectPlaybackSpeed = (nextSpeed) => {
    const valid = setSavedPlaybackSpeed(nextSpeed);
    setPlaybackSpeed(valid);
    playbackSpeedRef.current = valid;
    if (audioRef.current || isPlaying || playbackMode) {
      cleanupPlayback();
    }
  };

  // Reproducir audio karaoke (historia completa frase-a-frase o frase única)
  const startKaraokePlayback = async (mode, targetSentenceIdx = null) => {
    if (!activeStory || !tokenizedStory.sentences.length) return;

    // Pausar o reanudar si ya está cargada la sesión de historia
    if (mode === 'story' && playbackMode === 'story' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }
      const resumeRate = isCleanStretchedUrl(objectUrlRef.current || audioRef.current.src)
        ? 1.0
        : playbackSpeedRef.current;
      audioRef.current.playbackRate = resumeRate;
      audioRef.current.preservesPitch = true;
      await audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      return;
    }

    const startIdx =
      mode === 'sentence' && targetSentenceIdx !== null
        ? targetSentenceIdx
        : 0;
    if (!tokenizedStory.sentences[startIdx]) return;

    cleanupPlayback();
    const runId = playbackRunIdRef.current;
    setPlaybackMode(mode);
    recordDailyStudyActivity();
    await playSentenceStep(startIdx, mode, runId);
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
      <div
        className={`min-h-[100dvh] w-full flex flex-col font-sans transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FAF9F6] text-slate-800'
        }`}
      >
        {/* TOP HEADER */}
        <header
          className={`sticky top-0 z-20 backdrop-blur border-b px-4 pb-3.5 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] ${
            isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-xs'
          }`}
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-teal-500/20 border-teal-400/30 text-teal-300'
                    : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}
              >
                <BookOpen size={20} />
              </div>
              <div>
                <h1
                  className={`font-black text-base sm:text-lg tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Leselabor &amp; Tagesgeschichten{' '}
                  <span className={isDarkMode ? 'text-teal-400' : 'text-amber-600'}>PRO</span>
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Estudio inmersivo A1/A2 • {learnedIds.length}/{allStories.length} aprendidas • {savedCount} tarjetas guardadas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDarkMode((d) => !d)}
                aria-label={isDarkMode ? 'Cambiar a tema editorial diurno' : 'Cambiar a modo noche OLED'}
                title={isDarkMode ? 'Tema diurno' : 'Modo noche'}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700'
                    : 'bg-stone-100 border-slate-200 text-slate-700 hover:bg-stone-200'
                }`}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => {
                  setGenError('');
                  setShowGeneratorModal(true);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-extrabold text-xs sm:text-sm transition shadow-sm cursor-pointer ${
                  isDarkMode
                    ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/15'
                }`}
              >
                <Sparkles size={16} />
                ✨ Generar Nueva Historia IA
              </button>
              <button
                onClick={() => {
                  cleanupPlayback();
                  if (onExit) onExit();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <X size={16} /> Salir
              </button>
            </div>
          </div>
        </header>

        {/* FILTER PILLS */}
        <div
          className={`border-b px-4 py-3 sm:px-6 ${
            isDarkMode ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-200/80 bg-stone-50/90'
          }`}
        >
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
                    ? isDarkMode
                      ? 'bg-teal-500/20 text-teal-300 border-teal-400/60'
                      : 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : isDarkMode
                      ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                      : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
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
            <div
              className={`rounded-2xl border p-10 text-center my-8 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <p className={`font-bold text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                No hay historias en este filtro todavía.
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Marca historias con ❤️ o ✓, o genera una nueva historia personalizada con IA.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStories.map((story) => {
                const isFav = favoriteIds.includes(story.id);
                const isLearned = learnedIds.includes(story.id);
                const catTheme = getCategoryTheme(story.category);

                return (
                  <div
                    key={story.id}
                    onClick={() => handleSelectStory(story)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectStory(story)}
                    className={`group relative overflow-hidden text-left rounded-2xl border p-5 pt-6 transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-sm ${
                      isDarkMode
                        ? isLearned
                          ? 'bg-slate-900/90 border-emerald-500/30 hover:border-teal-400/60'
                          : 'bg-slate-900 border-slate-800 hover:border-teal-400/60 hover:bg-slate-900/80'
                        : isLearned
                          ? 'bg-white border-emerald-300 hover:border-emerald-400 hover:shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${catTheme.stripe}`} />

                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl leading-none">{story.emoji}</span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold border ${
                                isDarkMode ? catTheme.badgeDark : catTheme.badgeLight
                              }`}
                            >
                              {story.levelLabel || story.level}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                                isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-stone-100 text-slate-600'
                              }`}
                            >
                              {story.readTime || '3 min'}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(story.id, e)}
                          aria-label={isFav ? 'Quitar de favoritas' : 'Marcar como favorita'}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            isFav
                              ? 'text-rose-500 bg-rose-500/10'
                              : isDarkMode
                                ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
                                : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                          }`}
                        >
                          <Heart size={18} className={isFav ? 'fill-current' : ''} />
                        </button>
                      </div>

                      <p
                        className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {catTheme.label}
                      </p>
                      <h2
                        className={`font-extrabold text-base leading-snug transition ${
                          isDarkMode
                            ? 'text-white group-hover:text-teal-300'
                            : 'text-slate-900 group-hover:text-amber-700'
                        }`}
                      >
                        {story.titleDe}
                      </h2>
                      <p className={`text-xs mt-1.5 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {story.titleEs}
                      </p>
                    </div>

                    <div
                      className={`pt-3 border-t flex items-center justify-between text-xs ${
                        isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
                      }`}
                    >
                      <span className="text-slate-500 font-medium">
                        {story.sentences?.length || 7} oraciones • {story.examQuestions?.length || 4} preguntas
                      </span>
                      {isLearned ? (
                        <span
                          className={`inline-flex items-center gap-1 font-bold ${
                            isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                          }`}
                        >
                          <CheckCircle2 size={14} /> Aprendida
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition ${
                            isDarkMode ? 'text-teal-400' : 'text-amber-700'
                          }`}
                        >
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
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className={`border rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className={isDarkMode ? 'text-teal-400' : 'text-amber-600'} size={20} />
                  <h2 className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Generar Historia Readle con IA
                  </h2>
                </div>
                <button
                  onClick={() => !genLoading && setShowGeneratorModal(false)}
                  className={`p-1 rounded-lg cursor-pointer ${
                    isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'
                  }`}
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
                        ? isDarkMode
                          ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                          : 'bg-slate-900 border-slate-900 text-white'
                        : isDarkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          : 'bg-stone-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {cat.badge}
                  </button>
                ))}
              </div>

              {genCategory === 'enpal' && (
                <p
                  className={`text-[11px] rounded-xl px-3 py-2 border ${
                    isDarkMode
                      ? 'bg-teal-950/60 border-teal-500/30 text-teal-200'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  ⚡ Regla Enpal activa: las historias generadas tratan solo trabajo eléctrico interior (Keller, Zählerschrank, Wechselrichter, Speicher, Wallbox, VDE), sin montaje en tejado.
                </p>
              )}

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Nivel MCER:
                </span>
                {['A1', 'A2'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setGenLevel(lvl)}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold border cursor-pointer ${
                      genLevel === lvl
                        ? isDarkMode
                          ? 'bg-teal-500 text-slate-950 border-teal-400'
                          : 'bg-slate-900 text-white border-slate-900'
                        : isDarkMode
                          ? 'bg-slate-950 text-slate-300 border-slate-800'
                          : 'bg-stone-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div>
                <label
                  htmlFor="readleTopicInput"
                  className={`block text-xs font-bold uppercase mb-1.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
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
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-700 focus:border-teal-400 text-white'
                      : 'bg-stone-50 border-slate-300 focus:border-slate-900 text-slate-900'
                  }`}
                />
              </div>

              {activeCatMeta?.suggestedTopics && (
                <div className="space-y-1.5">
                  <p className={`text-[11px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Sugerencias rápidas:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCatMeta.suggestedTopics.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGenTopic(sug)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          isDarkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                            : 'bg-stone-100 hover:bg-stone-200 text-slate-700 border-slate-200'
                        }`}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {genError && (
                <div className="bg-rose-950/80 border border-rose-500/40 rounded-xl p-3 flex items-center gap-2 text-xs text-rose-100">
                  <AlertTriangle size={16} className="shrink-0 text-rose-400" />
                  <span>{genError}</span>
                </div>
              )}

              {genLoading && (
                <div
                  className={`rounded-xl p-3 border flex items-center gap-3 text-xs ${
                    isDarkMode
                      ? 'bg-slate-950 border-teal-500/30 text-teal-300'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <Loader2 size={18} className="animate-spin shrink-0" />
                  <span>{genLoadingStep}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerateAiStory}
                disabled={!genTopic.trim() || genLoading}
                className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer transition ${
                  isDarkMode
                    ? 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
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
  // RENDER 2: ESTUDIO INMERSIVO DE 4 PESTAÑAS (HISTORIA ACTIVA FULLSCREEN)
  // =========================================================================
  const isFavActive = favoriteIds.includes(activeStory.id);
  const isLearnedActive = learnedIds.includes(activeStory.id);
  const examQuestions = activeStory.examQuestions || [];
  const activeQuestion = examQuestions[currentExamIdx];
  const selectedWordDeckKey = selectedWordInfo
    ? getSafeId(selectedWordInfo.lemma || selectedWordInfo.cleanWord)
    : null;
  const isSelectedWordSaved = selectedWordDeckKey ? Boolean(savedWordsMap[selectedWordDeckKey]) : false;
  const catTheme = getCategoryTheme(activeStory.category);
  const inspectorLex = selectedWordInfo ? getLexiconTheme(selectedWordInfo, isDarkMode) : null;

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain font-sans transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FAF9F6] text-slate-800'
      }`}
    >
      {/* CABECERA DINÁMICA CONTEXTUAL (TOP BAR + HERO / INSPECTOR DE PALABRA) */}
      <header
        className={`sticky top-0 z-30 backdrop-blur border-b pt-[max(0.75rem,env(safe-area-inset-top))] ${
          isDarkMode
            ? 'bg-slate-900/95 border-slate-800 shadow-md'
            : 'bg-white/95 border-slate-200 shadow-xs'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 pb-2 flex items-center justify-between gap-2">
          <button
            onClick={handleBackToCatalog}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-stone-100 hover:bg-stone-200 text-slate-700 border-slate-200'
            }`}
          >
            <ChevronLeft size={16} /> Catálogo
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => toggleLearned(activeStory.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                isLearnedActive
                  ? isDarkMode
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-teal-400/50'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Check size={14} />{' '}
              <span className="hidden sm:inline">{isLearnedActive ? 'Aprendida ✓' : 'Marcar aprendida'}</span>
              <span className="sm:hidden">{isLearnedActive ? '✓' : 'Aprendida'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDarkMode((d) => !d)}
              aria-label={isDarkMode ? 'Cambiar a tema editorial diurno' : 'Cambiar a modo noche OLED'}
              title={isDarkMode ? 'Tema diurno' : 'Modo noche'}
              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                  : 'bg-stone-100 hover:bg-stone-200 text-slate-700 border-slate-200'
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => {
                cleanupPlayback();
                if (onExit) onExit();
              }}
              aria-label="Salir del módulo"
              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* TRANSFORMACIÓN CONTEXTUAL: INSPECTOR DE PALABRA O HERO DE HISTORIA */}
        <div className="max-w-4xl mx-auto px-4 pb-3">
          {selectedWordInfo && activeTab === 'historia' && inspectorLex ? (
            <div
              className={`rounded-2xl border p-3.5 sm:p-4 space-y-3 animate-in fade-in duration-150 ${
                isDarkMode
                  ? `bg-slate-950/95 ${inspectorLex.cardBorderClass} shadow-lg`
                  : `bg-white ${inspectorLex.cardBorderClass} shadow-sm`
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span translate="no" className={`notranslate text-lg sm:text-xl font-black ${inspectorLex.wordClass}`}>
                      {selectedWordInfo.lemma}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md border text-[11px] font-extrabold ${inspectorLex.badgeClass}`}
                    >
                      {inspectorLex.genderLabel}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md border text-[11px] font-bold ${
                        isDarkMode
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-stone-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {selectedWordInfo.level}
                    </span>
                  </div>
                  <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {selectedWordInfo.translationEs}
                  </p>
                </div>

                {/* BOTÓN VISIBLE DE CIERRE EN ESQUINA SUPERIOR DERECHA */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWordInfo(null);
                    setSelectedTokenKey(null);
                  }}
                  aria-label="Cerrar inspector de palabra"
                  className={`p-1.5 rounded-lg border shrink-0 transition cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                      : 'bg-stone-100 hover:bg-stone-200 text-slate-500 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => speakQuickGerman(selectedWordInfo.cleanWord || selectedWordInfo.lemma)}
                  aria-label="Escuchar pronunciación"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                      : 'bg-stone-100 hover:bg-stone-200 text-slate-800 border-slate-200'
                  }`}
                >
                  <Play size={13} className="fill-current" /> Pronunciar
                </button>

                <button
                  onClick={() => handleSaveWordToDeck(selectedWordInfo)}
                  title="Guardar en mi mazo de tarjetas"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    isSelectedWordSaved
                      ? isDarkMode
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-white hover:bg-stone-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Dumbbell size={13} /> {isSelectedWordSaved ? 'En mazo' : 'Tarjeta'}
                </button>

                {selectedWordInfo.isVerb && selectedWordInfo.conjugation && (
                  <button
                    onClick={() => setConjugationModalVerb(selectedWordInfo.conjugation)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-xs transition cursor-pointer"
                  >
                    conjugar →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl border p-3.5 sm:p-4 space-y-2.5 ${
                isDarkMode ? catTheme.heroDark : catTheme.heroLight
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none mt-0.5">{activeStory.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${
                        isDarkMode ? catTheme.badgeDark : catTheme.badgeLight
                      }`}
                    >
                      {catTheme.label}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${
                        isDarkMode
                          ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                          : 'bg-white/80 text-slate-700 border-slate-200'
                      }`}
                    >
                      {activeStory.levelLabel || activeStory.level}
                    </span>
                  </div>
                  <h2
                    translate="no"
                    className={`notranslate text-lg sm:text-xl font-black leading-tight ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {activeStory.titleDe}
                  </h2>
                  <p className={`text-xs sm:text-sm mt-0.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {activeStory.titleEs}
                  </p>
                </div>
              </div>

              {/* BARRA DE HERRAMIENTAS BAJO EL TÍTULO */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowInterlinear((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    showInterlinear
                      ? isDarkMode
                        ? 'bg-teal-500/20 text-teal-300 border-teal-400/50'
                        : 'bg-slate-900 text-white border-slate-900'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-white/90 text-slate-600 border-slate-200'
                  }`}
                  title="Mostrar/ocultar traducción interlineal"
                >
                  <Languages size={14} /> 文A
                </button>

                <button
                  onClick={() => setFontScaleIdx((prev) => (prev + 1) % FONT_SIZE_PRESETS.length)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      : 'bg-white/90 hover:bg-white text-slate-700 border-slate-200'
                  }`}
                  title="Cambiar tamaño de fuente"
                >
                  Aa{' '}
                  <span className={isDarkMode ? 'text-[10px] text-teal-300' : 'text-[10px] text-amber-700'}>
                    ({fontPreset.label})
                  </span>
                </button>

                <button
                  onClick={() => toggleFavorite(activeStory.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    isFavActive
                      ? isDarkMode
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                        : 'bg-rose-50 text-rose-600 border-rose-300'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-rose-300'
                        : 'bg-white/90 text-slate-500 border-slate-200 hover:text-rose-600'
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
        <nav
          className={`max-w-4xl mx-auto px-4 flex border-t ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
          }`}
        >
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
                  ? isDarkMode
                    ? 'border-teal-400 text-teal-300 bg-teal-500/5'
                    : 'border-amber-600 text-slate-900 bg-amber-50/60'
                  : isDarkMode
                    ? 'border-transparent text-slate-400 hover:text-slate-200'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
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
            <div
              className={`text-xs flex items-center justify-between px-1 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span>Toca cualquier palabra alemana para traducirla, guardarla o conjugarla.</span>
              <span className={`hidden sm:inline font-semibold ${isDarkMode ? 'text-teal-400' : 'text-amber-700'}`}>
                {activeStory.readTime}
              </span>
            </div>

            <div
              className={`rounded-2xl border p-5 sm:p-7 space-y-5 ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 shadow-lg'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
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
                        ? isDarkMode
                          ? 'bg-teal-500/10 border-l-2 border-teal-400'
                          : 'bg-amber-50/90 border-l-2 border-amber-500'
                        : isSentenceSelected
                          ? isDarkMode
                            ? 'bg-slate-800/60 border-l-2 border-teal-500/50'
                            : 'bg-stone-100/80 border-l-2 border-amber-300'
                          : 'border-l-2 border-transparent'
                    }`}
                  >
                    <p
                      translate="no"
                      className={`notranslate select-none ${fontPreset.deClass} ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
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
                              style={isKaraoke ? { textShadow: '0 0 0.6px currentColor' } : undefined}
                              className={`inline-block px-1 mx-[1px] rounded-md font-medium transition-colors duration-150 cursor-pointer ${
                                isKaraoke
                                  ? isDarkMode
                                    ? 'bg-teal-400 text-slate-950'
                                    : 'bg-amber-300 text-slate-950'
                                  : isSelected
                                    ? isDarkMode
                                      ? 'bg-teal-500/30 text-teal-200 ring-1 ring-teal-400/50'
                                      : 'bg-amber-100 text-amber-950 ring-1 ring-amber-400'
                                    : isDarkMode
                                      ? 'hover:bg-slate-800 hover:text-teal-200'
                                      : 'hover:bg-stone-100 hover:text-slate-950'
                              }`}
                            >
                              {tok.text}
                            </span>
                          );
                        }
                        const isPunct = /^[.,!?:;]+$/.test(tok.text);
                        return (
                          <span
                            key={idx}
                            className={
                              isPunct
                                ? isDarkMode
                                  ? 'mr-0.5 text-slate-300'
                                  : 'mr-0.5 text-slate-600'
                                : ''
                            }
                          >
                            {tok.text}
                          </span>
                        );
                      })}
                    </p>

                    {showInterlinear && (
                      <p
                        className={`mt-1.5 font-medium leading-snug ${fontPreset.esClass} ${
                          isDarkMode ? 'text-teal-300/90' : 'text-slate-500'
                        }`}
                      >
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
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-extrabold ${
                        isDarkMode
                          ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      Pregunta {currentExamIdx + 1}/{examQuestions.length}
                    </span>
                    <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
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
                              ? isDarkMode
                                ? 'border-teal-400 ring-2 ring-teal-400/30 '
                                : 'border-slate-900 ring-2 ring-slate-900/20 '
                              : isDarkMode
                                ? 'border-slate-700 '
                                : 'border-slate-200 '
                          }${
                            isDone
                              ? isRight
                                ? isDarkMode
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-emerald-100 text-emerald-800'
                                : isDarkMode
                                  ? 'bg-rose-500/20 text-rose-300'
                                  : 'bg-rose-100 text-rose-800'
                              : isDarkMode
                                ? 'bg-slate-900 text-slate-400'
                                : 'bg-white text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      translate="no"
                      className={`notranslate font-bold text-base sm:text-lg leading-snug ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {activeQuestion.prompt}
                    </h3>
                    <button
                      onClick={() => speakQuickGerman(activeQuestion.prompt.replace(/___/g, ' '))}
                      aria-label="Escuchar pregunta"
                      className={`p-2.5 rounded-xl border shrink-0 cursor-pointer transition ${
                        isDarkMode
                          ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                          : 'bg-stone-100 hover:bg-stone-200 text-slate-700 border-slate-200'
                      }`}
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

                      let btnStyle = isDarkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-teal-400/60 hover:bg-slate-800/60'
                        : 'bg-stone-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/40';

                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = isDarkMode
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                            : 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          btnStyle = isDarkMode
                            ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold'
                            : 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                        } else {
                          btnStyle = isDarkMode
                            ? 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                            : 'bg-stone-50 border-slate-200 text-slate-400 opacity-60';
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
                          {isAnswered && isCorrect && (
                            <CheckCircle2
                              size={18}
                              className={isDarkMode ? 'text-emerald-400 shrink-0' : 'text-emerald-600 shrink-0'}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {currentStoryAnswers[currentExamIdx] !== undefined && (
                    <div
                      className={`rounded-xl p-4 border flex items-start gap-3 text-sm ${
                        currentStoryAnswers[currentExamIdx] === activeQuestion.correctIndex
                          ? isDarkMode
                            ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-100'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : isDarkMode
                            ? 'bg-amber-950/50 border-amber-500/40 text-amber-100'
                            : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}
                    >
                      <Lightbulb
                        size={18}
                        className={`shrink-0 mt-0.5 ${isDarkMode ? 'text-teal-300' : 'text-amber-700'}`}
                      />
                      <div>
                        <p className={`font-bold mb-1 ${isDarkMode ? 'text-teal-300' : 'text-amber-900'}`}>
                          {currentStoryAnswers[currentExamIdx] === activeQuestion.correctIndex
                            ? '¡Correcto!'
                            : 'Explicación didáctica:'}
                        </p>
                        <p className={`leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          {activeQuestion.explanationEs}
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-between pt-2 border-t ${
                      isDarkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}
                  >
                    <button
                      disabled={currentExamIdx === 0}
                      onClick={() => setCurrentExamIdx((p) => Math.max(0, p - 1))}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border disabled:opacity-40 cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-800 text-slate-200 border-slate-700'
                          : 'bg-stone-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      ← Anterior
                    </button>

                    {currentExamIdx < examQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentExamIdx((p) => Math.min(examQuestions.length - 1, p + 1))}
                        className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer ${
                          isDarkMode
                            ? 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        Siguiente →
                      </button>
                    ) : (
                      <button
                        onClick={resetStoryExam}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                          isDarkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                            : 'bg-stone-100 hover:bg-stone-200 text-slate-800 border-slate-200'
                        }`}
                      >
                        <RefreshCw size={14} /> Repetir examen
                      </button>
                    )}
                  </div>
                </div>

                {Object.keys(currentStoryAnswers).length === examQuestions.length && (
                  <div
                    className={`rounded-2xl border p-4 flex items-center justify-between ${
                      isDarkMode
                        ? 'bg-teal-500/15 border-teal-400/40'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-black ${isDarkMode ? 'text-teal-300' : 'text-emerald-800'}`}>
                        Resultado registrado en Goethe Score:{' '}
                        {examQuestions.reduce(
                          (acc, q, idx) => acc + (currentStoryAnswers[idx] === q.correctIndex ? 1 : 0),
                          0
                        )}
                        /{examQuestions.length}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-emerald-700'}`}>
                        Tu puntuación ya suma para las estadísticas del perfil.
                      </p>
                    </div>
                    <CheckCircle2 size={24} className={isDarkMode ? 'text-teal-400 shrink-0' : 'text-emerald-600 shrink-0'} />
                  </div>
                )}
              </>
            ) : (
              <div
                className={`rounded-2xl border p-8 text-center ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
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
                  className={`w-full py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-between shadow-sm cursor-pointer transition ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Dumbbell size={18} /> Memorizar palabras clave →
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-extrabold ${
                      isDarkMode ? 'bg-slate-950/20' : 'bg-white/15 text-amber-200'
                    }`}
                  >
                    {activeStory.keyWords?.length || 0} tarjetas
                  </span>
                </button>

                <div className="space-y-3">
                  {(activeStory.keyWords || []).map((kw, idx) => {
                    const kwKey = getSafeId(kw.de);
                    const isSaved = Boolean(savedWordsMap[kwKey]);
                    const kwLex = getLexiconTheme(kw, isDarkMode);
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isDarkMode
                            ? `bg-slate-900 ${kwLex.cardBorderClass}`
                            : `bg-white ${kwLex.cardBorderClass} shadow-xs`
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span translate="no" className={`notranslate font-black text-base ${kwLex.wordClass}`}>
                              {kw.de}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md border text-[11px] font-extrabold ${kwLex.badgeClass}`}
                            >
                              {kwLex.genderLabel}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md border text-[11px] font-bold ${
                                isDarkMode
                                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                                  : 'bg-stone-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {kw.level}
                            </span>
                          </div>
                          <p className={`text-sm font-semibold ${isDarkMode ? 'text-teal-300' : 'text-slate-700'}`}>
                            {kw.es}
                          </p>
                          {kw.exampleDe && (
                            <p className={`text-xs pt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              <span
                                translate="no"
                                className={`notranslate ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
                              >
                                {kw.exampleDe}
                              </span>
                              {kw.exampleEs ? ` — ${kw.exampleEs}` : ''}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => speakQuickGerman(kw.de)}
                            aria-label={`Escuchar ${kw.de}`}
                            className={`p-2.5 rounded-xl border cursor-pointer transition ${
                              isDarkMode
                                ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                                : 'bg-stone-100 hover:bg-stone-200 text-slate-700 border-slate-200'
                            }`}
                          >
                            <Play size={16} className="fill-current" />
                          </button>
                          <button
                            onClick={() => handleSaveWordToDeck(kw)}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                              isSaved
                                ? isDarkMode
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : isDarkMode
                                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                                  : 'bg-white hover:bg-stone-50 text-slate-700 border-slate-200'
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
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-white hover:bg-stone-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <ChevronLeft size={16} /> Lista de palabras
                  </button>
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-teal-300' : 'text-amber-700'}`}>
                    Tarjeta {trainerIdx + 1} de {trainerCards.length}
                  </span>
                  <button
                    onClick={shuffleTrainerCards}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-white hover:bg-stone-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Shuffle size={14} /> Mezclar
                  </button>
                </div>

                {trainerCards[trainerIdx] && (() => {
                  const card = trainerCards[trainerIdx];
                  const cardLex = getLexiconTheme(card, isDarkMode);
                  return (
                    <div
                      onClick={() => setTrainerFlipped((f) => !f)}
                      className={`rounded-3xl border-2 p-7 sm:p-10 min-h-[250px] flex flex-col items-center justify-center text-center gap-4 cursor-pointer shadow-md select-none ${
                        isDarkMode
                          ? 'bg-slate-900 border-teal-500/40'
                          : 'bg-white border-amber-300'
                      }`}
                    >
                      {!trainerFlipped ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded text-xs font-extrabold ${
                                isDarkMode ? 'bg-teal-500/15 text-teal-300' : 'bg-stone-100 text-slate-700'
                              }`}
                            >
                              {card.level}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded border text-xs font-bold ${cardLex.badgeClass}`}>
                              {cardLex.genderLabel}
                            </span>
                          </div>
                          <h3 translate="no" className={`notranslate text-2xl sm:text-3xl font-black ${cardLex.wordClass}`}>
                            {card.de}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakQuickGerman(card.de);
                            }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                              isDarkMode
                                ? 'bg-teal-500/20 text-teal-300 border-teal-400/40'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            <Volume2 size={16} /> Escuchar alemán
                          </button>
                          <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            Toca la tarjeta para ver traducción y ejemplo
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className={`text-2xl font-black ${isDarkMode ? 'text-teal-300' : 'text-amber-700'}`}>
                            {card.es}
                          </h3>
                          <div
                            className={`border rounded-2xl p-4 max-w-md w-full space-y-1.5 ${
                              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-slate-200'
                            }`}
                          >
                            <p
                              translate="no"
                              className={`notranslate text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                            >
                              {card.exampleDe}
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {card.exampleEs}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakQuickGerman(card.exampleDe || card.de);
                            }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                              isDarkMode
                                ? 'bg-slate-800 text-teal-300 border-slate-700'
                                : 'bg-stone-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <Volume2 size={16} /> Escuchar frase
                          </button>
                        </>
                      )}
                    </div>
                  );
                })()}

                <div className="flex items-center justify-between gap-3">
                  <button
                    disabled={trainerIdx === 0}
                    onClick={() => {
                      setTrainerIdx((i) => Math.max(0, i - 1));
                      setTrainerFlipped(false);
                    }}
                    className={`flex-1 py-3 rounded-xl border font-bold text-sm disabled:opacity-40 cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 text-slate-200 border-slate-700'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => handleSaveWordToDeck(trainerCards[trainerIdx])}
                    className={`px-4 py-3 rounded-xl border font-bold text-sm cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                        : 'bg-white hover:bg-stone-50 text-amber-700 border-slate-200'
                    }`}
                    title="Guardar en mazo"
                  >
                    <Dumbbell size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setTrainerIdx((i) => (i + 1) % trainerCards.length);
                      setTrainerFlipped(false);
                    }}
                    className={`flex-1 py-3 rounded-xl font-black text-sm cursor-pointer ${
                      isDarkMode
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== PESTAÑA 4: GRAMÁTICA (ZERO-OVERFLOW MÓVIL) ==================== */}
        {activeTab === 'gramatica' && (
          <div className="space-y-5">
            {(activeStory.grammarCards || []).map((card, cIdx) => (
              <div
                key={cIdx}
                className={`rounded-2xl border overflow-hidden shadow-sm ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`border-b px-4 sm:px-5 py-3.5 flex items-center justify-between gap-2 ${
                    isDarkMode
                      ? 'bg-teal-500/15 border-teal-500/30'
                      : 'bg-amber-50/90 border-amber-200/80'
                  }`}
                >
                  <h3 className={`font-black text-base ${isDarkMode ? 'text-teal-300' : 'text-amber-900'}`}>
                    {card.title}
                  </h3>
                  <button
                    onClick={() => speakQuickGerman(card.exampleDe)}
                    className={`p-2 rounded-lg border shrink-0 cursor-pointer transition ${
                      isDarkMode
                        ? 'bg-slate-900/70 hover:bg-slate-800 text-teal-300 border-slate-700'
                        : 'bg-white hover:bg-stone-50 text-amber-800 border-amber-200'
                    }`}
                    aria-label="Escuchar ejemplo gramatical"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                  <div
                    className={`rounded-xl border p-4 space-y-1 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-slate-200'
                    }`}
                  >
                    <p
                      translate="no"
                      className={`notranslate text-base leading-relaxed ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {renderHighlightedSentence(card.exampleDe, card.highlightedPart, isDarkMode)}
                    </p>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-teal-300/90' : 'text-slate-600'}`}>
                      {card.exampleEs}
                    </p>
                  </div>

                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {card.descriptionEs}
                  </p>

                  {/* BLOQUES SINTÁCTICOS RESPONSIVOS (SIN TABLAS HORIZONTALES QUE RECORTEN EN 360px) */}
                  {card.table?.headers?.length > 0 && (
                    <div className="space-y-2.5">
                      {(card.table.rows || []).map((row, rIdx) => (
                        <div
                          key={rIdx}
                          className={`rounded-xl border p-3 sm:p-3.5 ${
                            isDarkMode
                              ? 'bg-slate-950/75 border-slate-800'
                              : 'bg-stone-50/90 border-slate-200'
                          }`}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {card.table.headers.map((header, cellIdx) => (
                              <div key={cellIdx} className="min-w-0 flex flex-col gap-0.5">
                                <span
                                  className={`text-[10px] font-extrabold uppercase tracking-wider break-words ${
                                    isDarkMode ? 'text-teal-400' : 'text-amber-700'
                                  }`}
                                >
                                  {header}
                                </span>
                                <span
                                  translate="no"
                                  className={`notranslate text-xs sm:text-sm break-words ${
                                    cellIdx === 0
                                      ? isDarkMode
                                        ? 'text-white font-bold'
                                        : 'text-slate-900 font-bold'
                                      : isDarkMode
                                        ? 'text-slate-300 font-medium'
                                        : 'text-slate-700 font-medium'
                                  }`}
                                >
                                  {row[cellIdx] ?? '—'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {card.extraExamples?.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Más ejemplos en contexto
                      </p>
                      {card.extraExamples.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className={`border rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 ${
                            isDarkMode
                              ? 'bg-slate-950/70 border-slate-800'
                              : 'bg-stone-50/70 border-slate-200'
                          }`}
                        >
                          <div className="min-w-0">
                            <p
                              translate="no"
                              className={`notranslate text-sm font-semibold break-words ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {ex.de}
                            </p>
                            <p className={`text-xs break-words ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {ex.es}
                            </p>
                          </div>
                          <button
                            onClick={() => speakQuickGerman(ex.de)}
                            className={`p-2 rounded-lg border shrink-0 cursor-pointer ${
                              isDarkMode
                                ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                                : 'bg-white hover:bg-stone-100 text-amber-700 border-slate-200'
                            }`}
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
          <div
            className={`max-w-2xl mx-auto pointer-events-auto backdrop-blur-md border rounded-2xl px-3.5 py-2.5 shadow-xl flex flex-wrap items-center justify-between gap-2 ${
              isDarkMode
                ? 'bg-slate-900/95 border-slate-700/90'
                : 'bg-white/95 border-slate-200 shadow-slate-900/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => startKaraokePlayback('story')}
                disabled={isAudioLoading && playbackMode === 'story'}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer disabled:opacity-60 ${
                  isDarkMode
                    ? 'bg-teal-400 hover:bg-teal-300 text-slate-950'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
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
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-extrabold transition cursor-pointer ${
                    isDarkMode
                      ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border-teal-400/50'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                  }`}
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
              <div
                className={`flex items-center rounded-xl border p-0.5 ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-stone-100 border-slate-200'
                }`}
              >
                {SPEED_OPTIONS.map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => handleSelectPlaybackSpeed(spd)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer ${
                      playbackSpeed === spd
                        ? isDarkMode
                          ? 'bg-teal-500 text-slate-950'
                          : 'bg-slate-900 text-white'
                        : isDarkMode
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {spd === 1 ? '1x' : `${spd}x`}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsLooping((prev) => !prev)}
                title="Repetir historia en bucle"
                aria-label="Repetir en bucle"
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isLooping
                    ? isDarkMode
                      ? 'bg-teal-500/20 text-teal-300 border-teal-400/60'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                    : isDarkMode
                      ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      : 'bg-stone-100 text-slate-600 border-slate-200 hover:text-slate-900'
                }`}
              >
                <Repeat size={15} />
              </button>

              {(isPlaying || playbackMode) && (
                <button
                  onClick={cleanupPlayback}
                  title="Detener reproducción"
                  aria-label="Detener reproducción"
                  className={`p-2 rounded-xl border cursor-pointer ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-rose-300'
                      : 'bg-stone-100 border-slate-200 text-slate-600 hover:text-rose-600'
                  }`}
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`border rounded-2xl max-w-xl w-full max-h-[88dvh] overflow-y-auto shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`sticky top-0 backdrop-blur border-b px-5 py-4 flex items-center justify-between ${
                isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => speakQuickGerman(conjugationModalVerb.infinitive)}
                  className={`p-2.5 rounded-xl border cursor-pointer ${
                    isDarkMode
                      ? 'bg-teal-500/20 border-teal-400/40 text-teal-300 hover:bg-teal-500/30'
                      : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                  }`}
                  aria-label="Escuchar infinitivo"
                >
                  <Volume2 size={18} />
                </button>
                <div>
                  <h3 translate="no" className={`notranslate text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {conjugationModalVerb.infinitive}
                  </h3>
                  <p className={`text-xs font-semibold ${isDarkMode ? 'text-teal-300' : 'text-amber-700'}`}>
                    {conjugationModalVerb.translationEs} • Perfekt con{' '}
                    <span className="font-bold">{conjugationModalVerb.auxiliary}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConjugationModalVerb(null)}
                aria-label="Cerrar tabla verbal"
                className={`p-1.5 rounded-lg cursor-pointer ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-400 hover:text-slate-900 hover:bg-stone-100'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Präsens & Präteritum side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`border rounded-xl overflow-hidden ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-slate-200'
                  }`}
                >
                  <div
                    className={`border-b px-3.5 py-2 text-xs font-black uppercase ${
                      isDarkMode
                        ? 'bg-teal-500/15 border-slate-800 text-teal-300'
                        : 'bg-amber-100/80 border-amber-200 text-amber-900'
                    }`}
                  >
                    Tiempo presente (Präsens)
                  </div>
                  <div className={`divide-y ${isDarkMode ? 'divide-slate-800/70' : 'divide-slate-200'}`}>
                    {PRONOUN_ROWS.map((p) => (
                      <div key={p.key} className="px-3.5 py-2 flex items-center justify-between text-xs">
                        <span className={`font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {p.label}
                        </span>
                        <span
                          translate="no"
                          className={`notranslate font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                        >
                          {conjugationModalVerb.praesens?.[p.key] || '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`border rounded-xl overflow-hidden ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-slate-200'
                  }`}
                >
                  <div
                    className={`border-b px-3.5 py-2 text-xs font-black uppercase ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-stone-200/70 border-slate-200 text-slate-700'
                    }`}
                  >
                    El pretérito (Präteritum)
                  </div>
                  <div className={`divide-y ${isDarkMode ? 'divide-slate-800/70' : 'divide-slate-200'}`}>
                    {PRONOUN_ROWS.map((p) => (
                      <div key={p.key} className="px-3.5 py-2 flex items-center justify-between text-xs">
                        <span className={`font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {p.label}
                        </span>
                        <span
                          translate="no"
                          className={`notranslate font-bold ${isDarkMode ? 'text-teal-200' : 'text-slate-800'}`}
                        >
                          {conjugationModalVerb.praeteritum?.[p.key] || '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Perfekt & Partizip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`border rounded-xl p-3.5 flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-slate-200'
                  }`}
                >
                  <div>
                    <p className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      El tiempo perfecto (Perfekt)
                    </p>
                    <p
                      translate="no"
                      className={`notranslate text-sm font-black mt-1 ${
                        isDarkMode ? 'text-teal-300' : 'text-amber-800'
                      }`}
                    >
                      {conjugationModalVerb.perfekt}
                    </p>
                  </div>
                  <button
                    onClick={() => speakQuickGerman(conjugationModalVerb.perfekt)}
                    className={`p-2 rounded-lg border cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                        : 'bg-white hover:bg-stone-100 text-amber-700 border-slate-200'
                    }`}
                    aria-label="Escuchar Perfekt"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                <div
                  className={`border rounded-xl p-3.5 flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-slate-200'
                  }`}
                >
                  <div>
                    <p className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Participio (Partizip)
                    </p>
                    <p
                      translate="no"
                      className={`notranslate text-sm font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                    >
                      {conjugationModalVerb.partizip}
                    </p>
                  </div>
                  <button
                    onClick={() => speakQuickGerman(conjugationModalVerb.partizip)}
                    className={`p-2 rounded-lg border cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                        : 'bg-white hover:bg-stone-100 text-amber-700 border-slate-200'
                    }`}
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
