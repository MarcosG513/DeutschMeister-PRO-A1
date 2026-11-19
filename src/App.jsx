import { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { ArrowLeft, User, Search, BookOpen, Car, Home, List, LayoutGrid, Gamepad2, GraduationCap, MessageCircle, Bot, ImagePlus, Volume2, X, Loader2, Star as Sparkles, ChevronRight, PlayCircle, Mic, Headphones, Menu, Filter, Download } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { App as CapacitorApp } from '@capacitor/app';
import localforage from 'localforage';
import PresentationVocabCard from './components/PresentationVocabCard';
import AuthAccessGate from './components/AuthAccessGate';
import { auth, db, functions, appId } from './config/firebase';
import { getCachedAccessDecision, setCachedAccessDecision, isOfflineOrTransientNetworkError, signOutUnified, processAuthRedirectResult } from './services/authService';
import { usePWAInstall } from './hooks/usePWAInstall';
import { chapters, goetheModules, studyPlanModules } from './data/chapters';
import {
  compressImageBase64 as compressImage,
  getSafeId,
  countUniqueVocabularyCards,
  recordDailyStudyActivity,
  recordCardStudied,
  recordSkillActivity,
  getStudiedCardsCount,
  getStudiedCardIds,
  getStudiedCardIdsSync,
  getCompletedModuleIds,
  getCompletedModuleIdsSync,
  getLearningProfile,
  getLearningProfileSync,
  saveLearningProfile,
  getStreakSummary,
  getStreakSummarySync,
  getSkillProgressSummary,
  getSkillProgressSummarySync,
  syncPedagogyProgressFromCloud,
  resetLocalUserCaches,
  splitGermanTitle,
  splitParentheticalText,
} from './utils/helpers';
import { syncSrsDeckFromCloud, getSrsStats, getSrsStatsSync, resetSrsLocalCache } from './services/srsBridgeService';
import { playGermanAudio, stopCurrentAudio } from './services/aiAudioService';
import { readSseJsonStream } from './utils/sseStreamReader';
import { API_ENDPOINTS } from './config/apiEndpoints';
import { mediaBlobStore, CHAPTER_STORIES_CACHE_KEY } from './services/syncMediaService';

import HomeDashboard from './components/HomeDashboard';
import InstallInstructionsModal from './components/InstallInstructionsModal';
import { subscribeToAndroidAutoCommands } from './services/androidAutoBridge';

const Profile = lazy(() => import('./components/Profile'));
const DrivingMode = lazy(() => import('./components/DrivingMode'));
const StoryModal = lazy(() => import('./components/StoryModal'));
const OnboardingModal = lazy(() => import('./components/OnboardingModal'));
const VerbPrepositionTrainer = lazy(() => import('./components/VerbPrepositionTrainer'));
const SyntaxTransformLab = lazy(() => import('./components/SyntaxTransformLab'));
const ReadingComprehension = lazy(() => import('./components/ReadingComprehension'));
const PresentationViewer = lazy(() => import('./components/PresentationViewer'));
const DynamicQuiz = lazy(() => import('./components/DynamicQuiz'));
const RoleplaySimulator = lazy(() => import('./components/RoleplaySimulator'));
const TutorChat = lazy(() => import('./components/TutorChat'));
const MicroPodcastPlayer = lazy(() => import('./components/MicroPodcastPlayer'));
const PhraseDialogueTrainer = lazy(() => import('./components/PhraseDialogueTrainer'));

// --- CONFIGURACIÓN API & FIREBASE ---
// Se removió el apiKey local, ahora se usan Firebase Functions.

const LAST_ACTIVITY_STORAGE_KEY = 'dm_last_activity';

const sanitizeUnlockedCardsForStorage = (cardsMap) => {
  if (!cardsMap || typeof cardsMap !== 'object') return {};
  const sanitized = {};
  for (const [key, entry] of Object.entries(cardsMap)) {
    if (!entry || typeof entry !== 'object') continue;
    const rawUrl = typeof entry.imageUrl === 'string' ? entry.imageUrl : null;
    const safeUrl = rawUrl && !rawUrl.startsWith('data:') && rawUrl.length <= 2048 ? rawUrl : null;
    sanitized[key] = { ...entry, imageUrl: safeUrl };
  }
  return sanitized;
};

const readSavedLastActivity = () => {
  try {
    const raw = localStorage.getItem(LAST_ACTIVITY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.type || parsed.id === undefined || parsed.id === null) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export default function App() {
  const totalUniqueCardsCount = useMemo(
    () => countUniqueVocabularyCards(chapters),
    []
  );
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id);
  const [activePresentationId, setActivePresentationId] = useState(null);
  const [activeStudyPlanId, setActiveStudyPlanId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [revealedCards, setRevealedCards] = useState({});
  const [viewMode, setViewMode] = useState("flashcards");
  const [pendingAutoCommand, setPendingAutoCommand] = useState(null);
  const [isHomeOpen, setIsHomeOpen] = useState(true);
  const [lastActivity, setLastActivity] = useState(() => readSavedLastActivity());
  const [quizInitialScope, setQuizInitialScope] = useState('chapter');
  const [tutorNotice, setTutorNotice] = useState(null);
  const [tutorInitialMode, setTutorInitialMode] = useState('tutor');
  const [phaseBannerNotice, setPhaseBannerNotice] = useState(null);
  const returnToHomeRef = useRef(false);
  const isChatLoadingRef = useRef(false);
  const chatAbortRef = useRef(null);
  const storyAbortRef = useRef(null);
  const prevUidRef = useRef(null);
  const onboardingDismissedThisSessionRef = useRef(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTablasOpen, setIsTablasOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isGoetheOpen, setIsGoetheOpen] = useState(false);

  const recordLastActivity = (activity) => {
    if (!activity?.type || activity?.id === undefined || activity?.id === null) return;
    const next = {
      type: activity.type,
      id: activity.id,
      title: activity.title || '',
      emoji: activity.emoji || '',
      updatedAt: new Date().toISOString()
    };
    setLastActivity(next);
    try {
      localStorage.setItem(LAST_ACTIVITY_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignorar errores de cuota o modo privado al persistir actividad reciente
    }
  };

  const handleGoHome = () => {
    returnToHomeRef.current = false;
    setActivePresentationId(null);
    setActiveStudyPlanId(null);
    setQuizInitialScope('chapter');
    setSearchTerm("");
    setViewMode("flashcards");
    setIsHomeOpen(true);
    setIsMenuOpen(false);
  };

  const handleExitToOrigin = useCallback(() => {
    setActivePresentationId(null);
    setActiveStudyPlanId(null);
    setQuizInitialScope('chapter');
    setViewMode("flashcards");
    if (returnToHomeRef.current) {
      returnToHomeRef.current = false;
      setIsHomeOpen(true);
    }
  }, []);

  const handleOpenChapter = (chapterId, mode = 'flashcards') => {
    const target = chapters.find((c) => Number(c.id) === Number(chapterId)) || chapters[0];
    if (!target) return;
    if (isHomeOpen) returnToHomeRef.current = true;
    setActivePresentationId(null);
    setActiveStudyPlanId(null);
    setSearchTerm("");
    setActiveChapterId(target.id);
    setSelectedCategory("Todas");
    setViewMode(mode === 'table' ? 'table' : 'flashcards');
    setIsHomeOpen(false);
    setIsMenuOpen(false);
    recordLastActivity({
      type: 'chapter',
      id: target.id,
      title: target.title,
      emoji: target.emoji || '📘'
    });
  };

  const handleOpenStudyPlan = (moduleId) => {
    const target = studyPlanModules.find((m) => m.id === moduleId);
    if (!target) return;
    if (isHomeOpen) returnToHomeRef.current = true;
    setActivePresentationId(null);
    setSearchTerm("");
    setActiveStudyPlanId(target.id);
    setViewMode('studyPlan');
    setIsHomeOpen(false);
    setIsMenuOpen(false);
    recordLastActivity({
      type: 'studyPlan',
      id: target.id,
      title: target.title,
      emoji: '🎓'
    });
  };

  const handleOpenGoetheModule = (moduleId) => {
    const target = goetheModules.find((g) => g.id === moduleId);
    if (!target) return;
    if (isHomeOpen) returnToHomeRef.current = true;
    setActiveStudyPlanId(null);
    setSearchTerm("");
    setActivePresentationId(target.id);
    setViewMode('presentation');
    setIsHomeOpen(false);
    setIsMenuOpen(false);
    recordLastActivity({
      type: 'goethe',
      id: target.id,
      title: target.title,
      emoji: '🏛️'
    });
  };

  const handleOpenSpecialView = (targetView, options = {}) => {
    setPhaseBannerNotice(null);
    if (targetView === 'photo') {
      setTutorNotice(null);
      setTutorInitialMode('photo');
      setIsMenuOpen(false);
      setIsTutorOpen(true);
      recordLastActivity({
        type: 'special',
        id: 'photo',
        title: 'photo',
      });
      return;
    }

    if (isHomeOpen) returnToHomeRef.current = true;
    setActivePresentationId(null);
    setActiveStudyPlanId(null);
    setQuizInitialScope(options.quizScope || 'chapter');
    setIsHomeOpen(false);
    setIsMenuOpen(false);
    setViewMode(targetView);

    if (['driving', 'roleplay', 'call', 'phrase', 'podcast', 'reading', 'quiz', 'verb_prep_lab', 'syntax_lab'].includes(targetView)) {
      recordLastActivity({
        type: 'special',
        id: targetView,
        title: targetView,
      });
    }
  };

  const handleOpenTutorFromHome = () => {
    setTutorNotice(null);
    setTutorInitialMode('tutor');
    setIsMenuOpen(false);
    setIsTutorOpen(true);
  };

  const handleStartSrsReview = () => {
    handleOpenSpecialView('quiz', { quizScope: 'srs' });
  };

  const [studiedCardsCount, setStudiedCardsCount] = useState(0);
  const [studiedCardIds, setStudiedCardIds] = useState(() => getStudiedCardIdsSync());
  const [completedModuleIds, setCompletedModuleIds] = useState(() => getCompletedModuleIdsSync());
  const [learningProfile, setLearningProfile] = useState(() => getLearningProfileSync());
  const [streakSummary, setStreakSummary] = useState(() => getStreakSummarySync());
  const [skillProgress, setSkillProgress] = useState(() =>
    getSkillProgressSummarySync(0, totalUniqueCardsCount)
  );
  const [srsStats, setSrsStats] = useState(() => getSrsStatsSync());

  const handleSaveLearningProfile = useCallback(async (nextProfile) => {
    onboardingDismissedThisSessionRef.current = true;
    const saved = await saveLearningProfile(nextProfile);
    setLearningProfile(saved);
    setIsOnboardingOpen(false);
  }, [setLearningProfile]);

  const handleDismissOnboarding = useCallback(() => {
    onboardingDismissedThisSessionRef.current = true;
    setIsOnboardingOpen(false);
  }, []);

  const [storyState, setStoryState] = useState({
    isOpen: false,
    loading: false,
    de: "",
    es: "",
    titulo: "",
    activeSlot: 1,
    stories: [],
    chapterId: null
  });

  const closeStoryModal = useCallback(() => {
    storyAbortRef.current?.abort();
    stopCurrentAudio();
    setStoryState(prev => ({
      ...prev,
      isOpen: false,
      loading: false
    }));
  }, [setStoryState]);

  useEffect(() => {
    return () => {
      storyAbortRef.current?.abort();
      chatAbortRef.current?.abort();
    };
  }, []);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [user, setUser] = useState(null);
  const [accessStatus, setAccessStatus] = useState(() => (auth ? 'checking' : 'unauthenticated'));
  const [accessRole, setAccessRole] = useState('user');
  const [accessError, setAccessError] = useState(null);
  const authCheckSeqRef = useRef(0);
  const [cardImages, setCardImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const blobUrlsRef = useRef(new Map());
  const fullscreenImageRef = useRef(null);
  const deferredRevokeUrlsRef = useRef(new Set());

  useEffect(() => {
    fullscreenImageRef.current = fullscreenImage;
    if (!fullscreenImage && deferredRevokeUrlsRef.current.size > 0) {
      for (const staleUrl of deferredRevokeUrlsRef.current) {
        URL.revokeObjectURL(staleUrl);
      }
      deferredRevokeUrlsRef.current.clear();
    }
  }, [fullscreenImage]);

  const registerBlobUrl = (key, blob) => {
    const nextUrl = URL.createObjectURL(blob);
    const prevUrl = blobUrlsRef.current.get(key);
    blobUrlsRef.current.set(key, nextUrl);
    if (prevUrl && prevUrl !== nextUrl) {
      if (prevUrl === fullscreenImageRef.current) {
        deferredRevokeUrlsRef.current.add(prevUrl);
      } else {
        queueMicrotask(() => URL.revokeObjectURL(prevUrl));
      }
    }
    return nextUrl;
  };

  useEffect(() => {
    const urls = blobUrlsRef.current;
    const deferred = deferredRevokeUrlsRef.current;
    return () => {
      for (const url of urls.values()) {
        URL.revokeObjectURL(url);
      }
      urls.clear();
      for (const url of deferred) {
        URL.revokeObjectURL(url);
      }
      deferred.clear();
    };
  }, []);

  const lazyLoadImage = async wordObj => {
    if (!wordObj || !wordObj.de) return;
    const safeId = getSafeId(wordObj.de).substring(0, 150);
    const slugId = wordObj.de.replace(/[\s/?!\\,.]+/g, '_').toLowerCase();
    if (cardImages[safeId] !== undefined || loadingImages[safeId]) return;
    setLoadingImages(prev => ({
      ...prev,
      [safeId]: true
    }));
    try {
      // 1. Nivel 1 (100% Offline 0 ms): Verificar si existe el Blob físico en mediaBlobStore
      const blobKey = `blob_${safeId}`;
      let localBlob = await mediaBlobStore.getItem(blobKey);
      if (!localBlob && slugId) {
        localBlob = await mediaBlobStore.getItem(`blob_${slugId}`);
      }
      if (localBlob instanceof Blob) {
        const localBlobUrl = registerBlobUrl(safeId, localBlob);
        setCardImages(prev => ({
          ...prev,
          [safeId]: localBlobUrl
        }));
        return;
      }

      // 2. Verificar URL guardada previamente en caché local
      const cached = await localforage.getItem(`img_${safeId}`) || (slugId ? await localforage.getItem(`img_${slugId}`) : null);
      if (cached) {
        setCardImages(prev => ({
          ...prev,
          [safeId]: cached
        }));
        return;
      }
      if (!db) return;
      
      let imageDocRef = doc(db, 'global_flashcards', slugId);
      let docSnap = await getDoc(imageDocRef);
      if (!docSnap.exists()) {
        imageDocRef = doc(db, 'global_flashcards', safeId);
        docSnap = await getDoc(imageDocRef);
      }

      let imageUrl = "";
      if (docSnap.exists()) {
        const d = docSnap.data();
        imageUrl = d.videoUrl || d.imageUrl || d.imageBase64;
      }
      if (imageUrl) {
        setCardImages(prev => ({
          ...prev,
          [safeId]: imageUrl
        }));
        await localforage.setItem(`img_${safeId}`, imageUrl);
      } else {
        setCardImages(prev => ({
          ...prev,
          [safeId]: null
        }));
      }
    } catch (err) {
      console.error(`Error lazy loading image for ${safeId}:`, err);
    } finally {
      setLoadingImages(prev => ({
        ...prev,
        [safeId]: false
      }));
    }
  };

  // Escucha el evento mediaSyncCompleted para refrescar el estado de cardImages en memoria
  useEffect(() => {
    const handleMediaSyncCompleted = async () => {
      try {
        const updatedImages = {};

        // 1. Cargar Blobs binarios offline desde mediaBlobStore
        const blobKeys = await mediaBlobStore.keys();
        for (const bKey of blobKeys) {
          if (bKey.startsWith('blob_')) {
            const sId = bKey.replace('blob_', '');
            const blob = await mediaBlobStore.getItem(bKey);
            if (blob instanceof Blob) {
              updatedImages[sId] = registerBlobUrl(sId, blob);
            }
          }
        }

        // 2. Complementar con URLs guardadas en localforage si no tienen Blob
        const keys = await localforage.keys();
        for (const key of keys) {
          if (key.startsWith('img_')) {
            const safeId = key.replace('img_', '');
            if (!updatedImages[safeId]) {
              const val = await localforage.getItem(key);
              if (val) {
                updatedImages[safeId] = val;
              }
            }
          }
        }
        setCardImages(prev => ({ ...prev, ...updatedImages }));
      } catch (err) {
        console.warn("[MediaSync Listener Error]:", err);
      }
    };

    window.addEventListener('mediaSyncCompleted', handleMediaSyncCompleted);
    return () => {
      window.removeEventListener('mediaSyncCompleted', handleMediaSyncCompleted);
    };
  }, []);

  // PWA: Detección y soporte compartido para instalación nativa en navegador
  const {
    canInstallPWA,
    showWebInstallCard,
    showInstallInstructionsModal,
    setShowInstallInstructionsModal,
    handleInstallApp,
  } = usePWAInstall();

  const [unlockedCards, setUnlockedCards] = useState(() => {
    try {
      const saved = localStorage.getItem('deutschmeister_unlocked');
      const parsed = saved ? JSON.parse(saved) : {};

      // MIGRACIÓN AUTOMÁTICA (SÍNCRONA)
      const hasReset = localStorage.getItem('global_regen_reset_v3');
      if (!hasReset) {
        if (parsed && typeof parsed === 'object') {
          for (const key in parsed) {
            if (parsed[key] && typeof parsed[key] === 'object') {
              parsed[key].regenerated = false;
            }
          }
        }
        localStorage.setItem('global_regen_reset_v3', 'true');
      }
      const sanitized = sanitizeUnlockedCardsForStorage(parsed);
      if (!hasReset && Object.keys(sanitized).length > 0) {
        localStorage.setItem('deutschmeister_unlocked', JSON.stringify(sanitized));
      }
      return sanitized;
    } catch {
      return {};
    }
  });
  useEffect(() => {
    if (unlockedCards && typeof unlockedCards === 'object' && Object.keys(unlockedCards).length > 0) {
      try {
        localStorage.setItem(
          'deutschmeister_unlocked',
          JSON.stringify(sanitizeUnlockedCardsForStorage(unlockedCards))
        );
      } catch {
        // Ignorar errores de cuota al persistir tarjetas desbloqueadas
      }
    }
  }, [unlockedCards]);

  useEffect(() => {
    const refreshTelemetry = async (explicitStudiedCount) => {
      const curCount =
        typeof explicitStudiedCount === 'number'
          ? explicitStudiedCount
          : await getStudiedCardsCount();
      setStudiedCardsCount(curCount);
      const [nextStreak, nextSkills, nextSrs, nextStudiedIds, nextCompletedIds, nextProfile] = await Promise.all([
        getStreakSummary(),
        getSkillProgressSummary(curCount, totalUniqueCardsCount),
        getSrsStats(),
        getStudiedCardIds(),
        getCompletedModuleIds(),
        getLearningProfile(),
      ]);
      if (nextStreak) setStreakSummary(nextStreak);
      if (nextSkills) setSkillProgress(nextSkills);
      if (nextSrs) setSrsStats(nextSrs);
      if (Array.isArray(nextStudiedIds)) setStudiedCardIds(nextStudiedIds);
      if (Array.isArray(nextCompletedIds)) setCompletedModuleIds(nextCompletedIds);
      if (nextProfile) setLearningProfile(nextProfile);
    };
    const handleStudied = (e) => {
      refreshTelemetry(e?.detail?.count);
    };
    const handleLearningProfileUpdated = (e) => {
      if (e?.detail?.learningProfile) {
        setLearningProfile(e.detail.learningProfile);
      } else {
        refreshTelemetry();
      }
    };
    const handleGeneralTelemetry = () => {
      refreshTelemetry();
    };

    window.addEventListener('cardStudiedUpdated', handleStudied);
    window.addEventListener('studyActivityUpdated', handleGeneralTelemetry);
    window.addEventListener('moduleCompletedUpdated', handleGeneralTelemetry);
    window.addEventListener('skillActivityUpdated', handleGeneralTelemetry);
    window.addEventListener('srsDeckUpdated', handleGeneralTelemetry);
    window.addEventListener('learningProfileUpdated', handleLearningProfileUpdated);
    refreshTelemetry();

    return () => {
      window.removeEventListener('cardStudiedUpdated', handleStudied);
      window.removeEventListener('studyActivityUpdated', handleGeneralTelemetry);
      window.removeEventListener('moduleCompletedUpdated', handleGeneralTelemetry);
      window.removeEventListener('skillActivityUpdated', handleGeneralTelemetry);
      window.removeEventListener('srsDeckUpdated', handleGeneralTelemetry);
      window.removeEventListener('learningProfileUpdated', handleLearningProfileUpdated);
    };
  }, [totalUniqueCardsCount]);

  // Listener global de comandos desde Android Auto (vehículo)
  useEffect(() => {
    const unsubscribe = subscribeToAndroidAutoCommands((action, payload) => {
      console.log(`[AndroidAuto -> App] Comando recibido: ${action} (${payload})`);
      setPendingAutoCommand({ action, payload, id: Date.now() });
      setViewMode("driving");
    });
    return () => unsubscribe();
  }, []);

  const [isImageLoading, setIsImageLoading] = useState(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isTutorFullscreen, setIsTutorFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{
    role: "model",
    parts: [{
      text: "¡Hallo! Soy tu tutor experto de alemán. He guardado nuestro historial. ¿En qué te puedo ayudar hoy? 🇩🇪"
    }]
  }]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const verifyAccessWithServer = async (targetUser, { silent = false } = {}) => {
    if (!targetUser || targetUser.isAnonymous) {
      setAccessRole('user');
      setAccessStatus('unauthenticated');
      return;
    }

    const seq = ++authCheckSeqRef.current;
    const cached = getCachedAccessDecision(targetUser.uid);

    if (!functions) {
      if (cached.approved) {
        setAccessRole(cached.role);
        setAccessStatus('approved');
      } else {
        setAccessStatus('pending');
        if (!silent) {
          setAccessError('Servicio de verificación en la nube no disponible.');
        }
      }
      return;
    }

    try {
      const verifyFn = httpsCallable(functions, 'verifyOrRequestAccess');
      const res = await verifyFn({});
      if (seq !== authCheckSeqRef.current) return;

      const data = res?.data || {};
      const nextStatus = ['approved', 'pending', 'revoked'].includes(data.status)
        ? data.status
        : 'pending';
      const nextRole = data.role === 'admin' ? 'admin' : 'user';

      if (data.needsTokenRefresh || nextStatus === 'approved') {
        await targetUser.getIdToken(true).catch(() => {});
      }

      setCachedAccessDecision(targetUser.uid, nextStatus, nextRole);
      setAccessRole(nextRole);
      setAccessError(null);
      setAccessStatus(nextStatus);
    } catch (err) {
      if (seq !== authCheckSeqRef.current) return;
      console.warn('[AuthAccessGate] Error verificando acceso:', err?.code || err?.message);

      if (isOfflineOrTransientNetworkError(err)) {
        if (cached.approved) {
          setAccessRole(cached.role);
          setAccessStatus('approved');
          setAccessError(null);
          return;
        }
        if (!silent) {
          setAccessError('Sin conexión a internet para validar tu acceso. Conéctate e inténtalo de nuevo.');
        }
        setAccessStatus('pending');
        return;
      }

      const codeStr = String(err?.code || '').toLowerCase();
      setCachedAccessDecision(targetUser.uid, 'revoked', 'user');
      setAccessRole('user');
      if (codeStr.includes('unauthenticated')) {
        setAccessStatus('unauthenticated');
      } else {
        setAccessError(err?.message || null);
        setAccessStatus('revoked');
      }
    }
  };

  // Observador principal de sesión (Sin login anónimo automático)
  useEffect(() => {
    if (!auth) {
      return;
    }
    processAuthRedirectResult(auth).catch((redirectErr) => {
      if (redirectErr?.message) {
        setAccessError(redirectErr.message);
      }
    });
    const clearSessionScopedState = async (nextUid = null) => {
      prevUidRef.current = nextUid;
      onboardingDismissedThisSessionRef.current = false;
      setIsOnboardingOpen(false);
      setUnlockedCards({});
      setCardImages({});
      setCompletedModuleIds([]);
      setStudiedCardIds([]);
      setStudiedCardsCount(0);
      await Promise.all([resetLocalUserCaches(), resetSrsLocalCache()]);
      setLearningProfile(getLearningProfileSync());
      setChatMessages([{
        role: "model",
        parts: [{
          text: "¡Hallo! Soy tu tutor experto de alemán. He guardado nuestro historial. ¿En qué te puedo ayudar hoy? 🇩🇪"
        }]
      }]);
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser || currentUser.isAnonymous) {
        const wasAnon = Boolean(currentUser?.isAnonymous);
        authCheckSeqRef.current += 1;
        if (prevUidRef.current !== null) {
          await clearSessionScopedState(null);
        }
        setUser(null);
        setAccessRole('user');
        setAccessError(null);
        setAccessStatus('unauthenticated');
        if (wasAnon) {
          await signOutUnified({ authInstance: auth }).catch(() => {});
        }
        return;
      }

      if (prevUidRef.current && prevUidRef.current !== currentUser.uid) {
        await clearSessionScopedState(currentUser.uid);
      } else {
        prevUidRef.current = currentUser.uid;
      }

      setUser(currentUser);
      setAccessError(null);
      const cached = getCachedAccessDecision(currentUser.uid);

      if (cached.approved) {
        setAccessRole(cached.role);
        setAccessStatus('approved');
        verifyAccessWithServer(currentUser, { silent: true });
      } else {
        setAccessStatus('checking');
        await verifyAccessWithServer(currentUser, { silent: false });
      }
    });
    return () => unsubscribe();
  }, []);

  // Listener en tiempo real sobre access_control/{uid} para aprobación o revocación instantánea
  useEffect(() => {
    if (!user || user.isAnonymous || !db || user.uid === 'offline_user') return;
    const accessRef = doc(db, 'access_control', user.uid);
    const unsubscribe = onSnapshot(
      accessRef,
      async (docSnap) => {
        if (!docSnap.exists()) return;
        const data = docSnap.data() || {};
        const nextStatus = ['approved', 'pending', 'revoked'].includes(data.status)
          ? data.status
          : 'pending';
        const nextRole = data.role === 'admin' ? 'admin' : 'user';

        if (nextStatus === 'approved') {
          try {
            const tokenRes = await user.getIdTokenResult();
            const hasApprovedClaim = tokenRes?.claims?.approved === true;
            const hasMatchingAdminClaim = Boolean(tokenRes?.claims?.admin) === (nextRole === 'admin');
            if ((!hasApprovedClaim || !hasMatchingAdminClaim) && functions) {
              await httpsCallable(functions, 'verifyOrRequestAccess')({}).catch(() => {});
              await user.getIdToken(true).catch(() => {});
            } else if (!hasApprovedClaim || !hasMatchingAdminClaim) {
              await user.getIdToken(true).catch(() => {});
            }
          } catch {
            // Reintentará en la próxima sincronización de claims
          }
          setCachedAccessDecision(user.uid, 'approved', nextRole);
          setAccessRole(nextRole);
          setAccessError(null);
          setAccessStatus('approved');
        } else {
          setCachedAccessDecision(user.uid, nextStatus, 'user');
          await user.getIdToken(true).catch(() => {});
          setAccessRole('user');
          setAccessStatus(nextStatus);
        }
      },
      (err) => {
        console.warn('[AccessControl Listener]:', err?.message || err);
      }
    );
    return () => unsubscribe();
  }, [user]);

  // Revalidación silenciosa al recuperar conectividad tras modo avión / túneles
  useEffect(() => {
    if (!user || user.isAnonymous) return;
    const handleOnline = () => {
      verifyAccessWithServer(user, { silent: accessStatus === 'approved' });
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [user, accessStatus]);

  // Sincronización pedagógica y SRS solo cuando el usuario está aprobado
  useEffect(() => {
    if (!user || user.isAnonymous || accessStatus !== 'approved' || user.uid === 'offline_user') return undefined;
    let cancelled = false;
    (async () => {
      await Promise.all([
        syncPedagogyProgressFromCloud(user.uid),
        syncSrsDeckFromCloud(user.uid),
      ]);
      if (cancelled) return;
      const [profile, studiedIds, completedIds] = await Promise.all([
        getLearningProfile(),
        getStudiedCardIds(),
        getCompletedModuleIds(),
      ]);
      if (cancelled) return;
      if (Array.isArray(studiedIds)) setStudiedCardIds(studiedIds);
      if (Array.isArray(completedIds)) setCompletedModuleIds(completedIds);
      setLearningProfile(profile || getLearningProfileSync());
      if (!profile?.onboardingCompleted && !profile?.skipped && !onboardingDismissedThisSessionRef.current) {
        setIsOnboardingOpen(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, accessStatus]);

  useEffect(() => {
    if (!user || user.isAnonymous || accessStatus !== 'approved' || !db || user.uid === 'offline_user') return;
    const userUnlockedRef = collection(db, 'artifacts', appId, 'users', user.uid, 'unlockedCards');
    const unsubscribe = onSnapshot(userUnlockedRef, snapshot => {
      const unlocked = {};
      snapshot.forEach(doc => {
        unlocked[doc.id] = doc.data();
      });
      setUnlockedCards(unlocked);
    }, error => console.error("Error cargando desbloqueos:", error));
    return () => unsubscribe();
  }, [user, accessStatus]);

  useEffect(() => {
    if (!user || user.isAnonymous || accessStatus !== 'approved' || !db || user.uid === 'offline_user') return;
    const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
    const unsubscribe = onSnapshot(chatDocRef, docSnap => {
      if (isChatLoadingRef.current) return;
      if (docSnap.exists()) {
        setChatMessages(docSnap.data().messages || []);
      } else {
        const initialMsgs = [{
          role: "model",
          parts: [{
            text: "¡Hallo! Soy tu tutor experto de alemán. He guardado nuestro historial. ¿En qué te puedo ayudar hoy? 🇩🇪"
          }]
        }];
        setChatMessages(initialMsgs);
        setDoc(chatDocRef, {
          messages: initialMsgs
        }).catch(console.error);
      }
    }, error => console.error("Error cargando chat:", error));
    return () => unsubscribe();
  }, [user, accessStatus]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [chatMessages, isTutorOpen, isChatLoading, isTutorFullscreen]);

  // --- GESTIÓN NATIVA DEL HARDWARE BACK BUTTON (ANDROID LIFO LAYER) ---
  useEffect(() => {
    const backButtonListener = CapacitorApp.addListener('backButton', () => {
      if (fullscreenImage) {
        setFullscreenImage(null);
        return;
      }
      if (isOnboardingOpen) {
        handleDismissOnboarding();
        return;
      }
      if (isTutorOpen) {
        setIsTutorOpen(false);
        return;
      }
      if (storyState?.isOpen) {
        closeStoryModal();
        return;
      }
      if (activePresentationId || activeStudyPlanId) {
        handleExitToOrigin();
        return;
      }
      if (viewMode !== "flashcards") {
        handleExitToOrigin();
        return;
      }
      if (!isHomeOpen) {
        setIsHomeOpen(true);
        return;
      }
      CapacitorApp.exitApp();
    });

    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, [
    fullscreenImage, isOnboardingOpen, isTutorOpen, storyState,
    activePresentationId, activeStudyPlanId, viewMode, isHomeOpen,
    handleDismissOnboarding, closeStoryModal, handleExitToOrigin
  ]);
  const activeChapter = useMemo(() => chapters.find(c => c.id === Number(activeChapterId)) || chapters[0], [activeChapterId]);
  const activePresentation = useMemo(() => goetheModules.find(p => p.id === activePresentationId), [activePresentationId]);
  
  const categories = useMemo(() => {
    if (!activeChapter?.words) return ['Todas'];
    if (activeChapter.categoryFilter && Array.isArray(activeChapter.categoryFilter)) {
      return activeChapter.categoryFilter;
    }
    return ['Todas', ...new Set(activeChapter.words.map(w => w.category).filter(Boolean))];
  }, [activeChapter]);


  const displayedWords = useMemo(() => {
    if (searchTerm.trim() !== "") {
      const normalizeStr = str => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
      const normTerm = normalizeStr(searchTerm);
      return chapters.flatMap(c => c.words.map(w => ({
        ...w,
        chapter: c.title,
        emoji: c.emoji,
        isRedemittel: c.isRedemittel
      }))).filter(w => normalizeStr(w.de).includes(normTerm) || normalizeStr(w.es).includes(normTerm) || normalizeStr(w.pron).includes(normTerm) || normalizeStr(w.type).includes(normTerm) || (w.category && normalizeStr(w.category).includes(normTerm)));
    }
    if (!activeChapter) return [];
    let words = activeChapter.words.map(w => ({
      ...w,
      chapter: activeChapter.title,
      emoji: activeChapter.emoji
    }));
    if (selectedCategory && selectedCategory !== "Todas") {
      words = words.filter(w => w.category === selectedCategory);
    }
    return words;
  }, [searchTerm, activeChapter, selectedCategory]);
  const revealAll = () => {
    recordDailyStudyActivity();
    recordSkillActivity('reading', 2).catch(() => {});
    const all = {};
    displayedWords.forEach((word, i) => {
      all[i] = true;
      if (word && word.de) {
        const safeId = getSafeId(word.de).substring(0, 150);
        recordCardStudied(safeId);
      }
    });
    setRevealedCards(all);
  };
  const hideAll = () => setRevealedCards({});
  const saveChapterStoriesToLocalCache = async (chapId, storiesList = []) => {
    const chapKey = String(chapId ?? "").trim();
    if (!chapKey) return;
    try {
      const existingCache = (await localforage.getItem(CHAPTER_STORIES_CACHE_KEY)) || {};
      const byChapter = { ...(existingCache.byChapter || {}) };
      const byId = { ...(existingCache.byId || {}) };
      const cleanList = (Array.isArray(storiesList) ? storiesList : [])
        .filter((s) => s && (s.cuento_aleman || s.de))
        .map((s, idx) => ({
          ...s,
          id: s.id || `chapter_${chapKey}_story_${s.storyIndex || idx + 1}`,
          chapterId: chapId,
          chapterKey: chapKey,
          storyIndex: Number(s.storyIndex) || idx + 1
        }))
        .sort((a, b) => a.storyIndex - b.storyIndex)
        .slice(0, 3);

      byChapter[chapKey] = cleanList;
      for (const item of cleanList) {
        byId[item.id] = item;
      }

      await localforage.setItem(CHAPTER_STORIES_CACHE_KEY, {
        ...byChapter,
        byChapter,
        byId,
        totalStories: Object.keys(byId).length,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("[ChapterStories Cache] Error guardando en localforage:", err);
    }
  };

  const loadChapterStoriesFromCacheAndCloud = async (chapId) => {
    const chapKey = String(chapId ?? "").trim();
    if (!chapKey) return [];

    const bySlot = new Map();
    try {
      const localCache = await localforage.getItem(CHAPTER_STORIES_CACHE_KEY);
      const localList = localCache?.byChapter?.[chapKey] || localCache?.[chapKey] || [];
      if (Array.isArray(localList)) {
        for (const item of localList) {
          if (item && (item.cuento_aleman || item.de)) {
            const slot = Number(item.storyIndex) || bySlot.size + 1;
            if (slot >= 1 && slot <= 3) bySlot.set(slot, { ...item, storyIndex: slot });
          }
        }
      }
    } catch {
      // Ignorar caché corrupta de cuentos locales
    }

    if (db) {
      try {
        const snaps = await Promise.all(
          [1, 2, 3].map((slotIdx) =>
            getDoc(doc(db, "global_chapter_stories", `chapter_${chapKey}_story_${slotIdx}`))
          )
        );
        for (const snap of snaps) {
          if (snap.exists()) {
            const d = snap.data();
            if (d && (d.cuento_aleman || d.de)) {
              const slot = Number(d.storyIndex) || 1;
              bySlot.set(slot, { id: snap.id, ...d, storyIndex: slot });
            }
          }
        }
      } catch (cloudErr) {
        console.warn("[ChapterStories Cloud] Usando caché local offline:", cloudErr?.message || cloudErr);
      }
    }

    const merged = Array.from(bySlot.values())
      .sort((a, b) => (a.storyIndex || 0) - (b.storyIndex || 0))
      .slice(0, 3);

    if (merged.length > 0) {
      await saveChapterStoriesToLocalCache(chapId, merged);
    }
    return merged;
  };

  const handleSelectChapterStorySlot = (slotNumber) => {
    const target = (storyState.stories || []).find((s) => Number(s.storyIndex) === Number(slotNumber));
    if (!target) return;
    stopCurrentAudio();
    setStoryState((prev) => ({
      ...prev,
      activeSlot: Number(slotNumber),
      titulo: target.titulo || `Cuento ${slotNumber}`,
      de: target.cuento_aleman || target.de || "",
      es: target.traduccion_espanol || target.es || ""
    }));
  };

  const handleCreateNewChapterStory = async (existingStoriesOverride = null, chapterOverride = null) => {
    const targetChapter = chapterOverride || activeChapter;
    if (!targetChapter) return;
    storyAbortRef.current?.abort();
    stopCurrentAudio();

    const currentStories = Array.isArray(existingStoriesOverride)
      ? existingStoriesOverride
      : Array.isArray(storyState.stories)
        ? storyState.stories
        : [];

    // Límite estricto FinOps: si ya existen los 3 cuentos del capítulo, nunca volver a llamar al LLM
    if (currentStories.length >= 3) {
      const lastStory = currentStories[currentStories.length - 1];
      setStoryState((prev) => ({
        ...prev,
        isOpen: true,
        loading: false,
        stories: currentStories,
        activeSlot: Number(lastStory.storyIndex) || 3,
        titulo: lastStory.titulo || "Cuento 3",
        de: lastStory.cuento_aleman || lastStory.de || "",
        es: lastStory.traduccion_espanol || lastStory.es || "",
        chapterId: targetChapter.id
      }));
      return;
    }

    const wordsSource =
      Number(targetChapter.id) === Number(activeChapter?.id)
        ? (targetChapter.words || displayedWords)
        : (targetChapter.words || []);
    const palabrasValidas = wordsSource
      .filter((w) => w?.de && w.de.length > 2)
      .slice(0, 8)
      .map((w) => w.de);

    if (palabrasValidas.length === 0) {
      setStoryState((prev) => ({
        ...prev,
        isOpen: true,
        loading: false,
        de: "No hay suficientes palabras en este capítulo para generar un cuento.",
        es: "Por favor, agrega palabras de vocabulario antes de generar."
      }));
      return;
    }

    const nextSlot = Math.min(3, currentStories.length + 1);
    setStoryState((prev) => ({
      ...prev,
      isOpen: true,
      loading: true,
      activeSlot: nextSlot,
      stories: currentStories,
      chapterId: targetChapter.id,
      titulo: `Generando Cuento ${nextSlot}/3...`,
      de: "",
      es: ""
    }));

    const attemptFetch = async () => {
      storyAbortRef.current?.abort();
      const controller = new AbortController();
      storyAbortRef.current = controller;
      const idToken = user ? await user.getIdToken().catch(() => "") : "";
      const response = await fetch(API_ENDPOINTS.STORY_GEN, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({
          palabrasVocabulario: palabrasValidas,
          chapterId: targetChapter.id,
          chapterTitle: targetChapter.title
        })
      });
      if (!response.ok) throw new Error("Failed to generate story");
      let resolvedPayload = null;
      let rawBuffer = "";
      await readSseJsonStream(response, {
        signal: controller.signal,
        onEvent: (data) => {
          resolvedPayload = data;
          const deText = data?.cuento_aleman || data?.de || "";
          const esText = data?.traduccion_espanol || data?.es || "";
          if (deText || esText) {
            setStoryState((prev) => ({
              ...prev,
              loading: false,
              de: deText || prev.de,
              es: esText || prev.es
            }));
          }
        },
        onParseError: (raw) => {
          rawBuffer += raw || "";
          const extractPartial = (buffer, fieldName) => {
            const regex = new RegExp(`"${fieldName}"\\s*:\\s*"([^"]*)`);
            const match = buffer.match(regex);
            return match ? match[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\t/g, "\t") : "";
          };
          const partialDe = extractPartial(rawBuffer, "cuento_aleman") || extractPartial(rawBuffer, "de");
          const partialEs = extractPartial(rawBuffer, "traduccion_espanol") || extractPartial(rawBuffer, "es");
          if (partialDe || partialEs) {
            setStoryState((prev) => ({
              ...prev,
              loading: false,
              de: partialDe || "Escribiendo cuento...",
              es: partialEs || "Traduciendo..."
            }));
          }
        }
      });
      if (resolvedPayload && typeof resolvedPayload === "object") {
        return resolvedPayload;
      }
      const jsonMatch = rawBuffer.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Formato JSON no encontrado.");
      }
      return JSON.parse(jsonMatch[0]);
    };

    const applyStoryResult = async (data) => {
      const returnedStory = data.story || {
        id: `chapter_${targetChapter.id}_story_${data.storyIndex || nextSlot}`,
        chapterId: targetChapter.id,
        storyIndex: Number(data.storyIndex) || nextSlot,
        titulo: data.titulo || `Cuento ${nextSlot}`,
        cuento_aleman: data.cuento_aleman || data.de || "",
        traduccion_espanol: data.traduccion_espanol || data.es || "",
        palabras_clave_usadas: data.palabras_clave_usadas || []
      };

      const mergedStories = Array.isArray(data.stories) && data.stories.length > 0
        ? data.stories
        : [...currentStories.filter((s) => Number(s.storyIndex) !== Number(returnedStory.storyIndex)), returnedStory]
            .sort((a, b) => (Number(a.storyIndex) || 0) - (Number(b.storyIndex) || 0))
            .slice(0, 3);

      await saveChapterStoriesToLocalCache(targetChapter.id, mergedStories);

      setStoryState({
        isOpen: true,
        loading: false,
        chapterId: targetChapter.id,
        stories: mergedStories,
        activeSlot: Number(returnedStory.storyIndex) || mergedStories.length,
        titulo: returnedStory.titulo || `Cuento ${returnedStory.storyIndex || nextSlot}`,
        de: returnedStory.cuento_aleman || returnedStory.de || "",
        es: returnedStory.traduccion_espanol || returnedStory.es || ""
      });
    };

    try {
      const data = await attemptFetch();
      await applyStoryResult(data);
    } catch (e) {
      if (e?.name === "AbortError") return;
      console.warn("Intento 1 falló, reintentando...", e);
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const data = await attemptFetch();
        await applyStoryResult(data);
      } catch (retryError) {
        if (retryError?.name === "AbortError") return;
        console.error("Intento 2 falló:", retryError);
        setStoryState((prev) => ({
          ...prev,
          isOpen: true,
          loading: false,
          de: "Error al generar el cuento.",
          es: "Por favor, intenta de nuevo más tarde."
        }));
      }
    }
  };

  const generateStory = async (chapterOverride = null) => {
    const targetChapter = chapterOverride && chapterOverride.id ? chapterOverride : activeChapter;
    if (!targetChapter) return;
    storyAbortRef.current?.abort();
    stopCurrentAudio();

    setStoryState((prev) => ({
      ...prev,
      isOpen: true,
      loading: true,
      chapterId: targetChapter.id,
      de: "",
      es: ""
    }));

    const savedStories = await loadChapterStoriesFromCacheAndCloud(targetChapter.id);
    if (savedStories.length > 0) {
      const firstStory = savedStories[0];
      setStoryState({
        isOpen: true,
        loading: false,
        chapterId: targetChapter.id,
        stories: savedStories,
        activeSlot: Number(firstStory.storyIndex) || 1,
        titulo: firstStory.titulo || "Cuento 1",
        de: firstStory.cuento_aleman || firstStory.de || "",
        es: firstStory.traduccion_espanol || firstStory.es || ""
      });
      return;
    }

    await handleCreateNewChapterStory([], targetChapter);
  };

  const handleOpenChapterStory = (chapterId = 1) => {
    const target = chapters.find((c) => Number(c.id) === Number(chapterId)) || chapters[0];
    if (!target) return;
    handleOpenChapter(target.id, 'flashcards');
    generateStory(target);
  };

  const groupWordsByCategory = words => {
    return words.reduce((acc, word) => {
      const cat = word.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(word);
      return acc;
    }, {});
  };
  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoadingRef.current) return;
    isChatLoadingRef.current = true;
    recordDailyStudyActivity();
    recordSkillActivity('writing', 4).catch(() => {});
    const newUserMessage = {
      role: "user",
      parts: [{
        text: chatInput
      }]
    };
    const newMessages = [...chatMessages, newUserMessage];
    setChatMessages(newMessages);
    setChatInput("");
    setIsChatLoading(true);
    chatAbortRef.current?.abort();
    const controller = new AbortController();
    chatAbortRef.current = controller;

    const updateLastAssistantMessage = (nextMsg) => {
      setChatMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = nextMsg;
        return updated;
      });
    };

    try {
      const idToken = user ? await user.getIdToken().catch(() => '') : '';
      const response = await fetch(API_ENDPOINTS.TUTOR_CHAT, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({
          historialConversacion: newMessages,
          responseFormat: 'structured_v2',
          action: 'turn',
          uid: user?.uid
        })
      });

      if (!response.ok) throw new Error("Failed to connect to tutor");
      let currentText = "";
      let resolvedFinalMsg = null;

      setChatMessages([...newMessages, {
        role: "model",
        parts: [{
          text: ""
        }],
        structuredMeta: null
      }]);
      setIsChatLoading(false);

      await readSseJsonStream(response, {
        signal: controller.signal,
        onEvent: (data) => {
          if (data?.type === 'reply_de_ready' && data.replyDe) {
            currentText = `> 🇩🇪 **${data.replyDe}**`;
            updateLastAssistantMessage({
              role: "model",
              parts: [{ text: currentText }],
              structuredMeta: { replyDe: data.replyDe }
            });
          } else if (data?.type === 'structured_v2' && data.payload) {
            const p = data.payload;
            const formattedText = [p.replyMarkdownEs, p.replyDe ? `\n\n> 🇩🇪 **${p.replyDe}**` : '']
              .filter(Boolean)
              .join('')
              .trim();
            currentText = formattedText || p.replyDe || '';
            resolvedFinalMsg = {
              role: "model",
              parts: [{ text: currentText }],
              structuredMeta: {
                replyDe: p.replyDe || '',
                translationEs: p.translationEs || '',
                grammarCorrections: Array.isArray(p.grammarCorrections) ? p.grammarCorrections : [],
                suggestedReplies: Array.isArray(p.suggestedReplies) ? p.suggestedReplies : [],
                newVocabulary: Array.isArray(p.newVocabulary) ? p.newVocabulary : []
              }
            };
            updateLastAssistantMessage(resolvedFinalMsg);
          } else if (data?.text) {
            currentText += data.text;
            updateLastAssistantMessage({
              role: "model",
              parts: [{ text: currentText }]
            });
          }
        },
        onParseError: () => {
          // Ignorar fragmentos JSON parciales durante streaming SSE
        }
      });

      const finalMessages = [
        ...newMessages,
        resolvedFinalMsg || {
          role: "model",
          parts: [{ text: currentText }]
        }
      ];
      setChatMessages(finalMessages);
      if (user && db) {
        const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
        await setDoc(chatDocRef, {
          messages: finalMessages.slice(-40)
        }, {
          merge: true
        }).catch(e => console.warn("Chat guardado localmente debido a permisos:", e));
      }
    } catch (error) {
      if (error?.name === 'AbortError') return;
      console.error("Error en chat:", error);
      setChatMessages([...newMessages, {
        role: "model",
        parts: [{
          text: "Lo siento, ha ocurrido un error de conexión con el servidor. Inténtalo de nuevo."
        }]
      }]);
    } finally {
      isChatLoadingRef.current = false;
      setIsChatLoading(false);
    }
  };
  const openAiTutor = async (word, e) => {
    if (e) e.stopPropagation();
    setIsTutorOpen(true);
    const wordDe = typeof word === 'string' ? word : word.de;
    const wordEs = typeof word === 'string' ? "" : word.es;
    const prompt = `Hola tutor, estoy repasando la palabra "${wordDe}"${wordEs ? ` (${wordEs})` : ''}. ¿Me das un solo ejemplo súper corto de nivel A1 y me haces una pregunta rápida para poner a prueba si sé cómo usarla?`;
    setChatInput(prompt);
  };
  const generateCardImage = async (wordObj, e) => {
    if (e) e.stopPropagation();
    if (!wordObj || !wordObj.de) return;
    const safeId = getSafeId(wordObj.de).substring(0, 150);
    const slugId = wordObj.de.replace(/[\s/?!\\,.]+/g, '_').toLowerCase();
    const userDocRef = user && db ? doc(db, 'artifacts', appId, 'users', user.uid, 'unlockedCards', safeId) : null;

    setIsImageLoading(safeId);
    try {
      // 1. Verificar si ya se encuentra en el estado de React
      let imageUrl = cardImages[safeId];

      // 2. Si no está en estado, intentar obtener de caché localforage
      if (!imageUrl) {
        try {
          const cached = await localforage.getItem(`img_${safeId}`);
          if (cached) imageUrl = cached;
        } catch (lfErr) {
          console.warn("Error leyendo localforage:", lfErr);
        }
      }

      // 3. Si no está en caché local, consultar base de datos global de Firestore (global_flashcards)
      if (!imageUrl && db) {
        try {
          // Primero probar con slugId (formato de ID con el que se generaron el lote de 1000+ imágenes)
          let globalCacheRef = doc(db, 'global_flashcards', slugId);
          let globalCacheSnap = await getDoc(globalCacheRef);
          
          // Si no existe con slugId, intentar con el safeId (Base64)
          if (!globalCacheSnap.exists()) {
            globalCacheRef = doc(db, 'global_flashcards', safeId);
            globalCacheSnap = await getDoc(globalCacheRef);
          }

          if (globalCacheSnap.exists()) {
            const cachedData = globalCacheSnap.data();
            imageUrl = cachedData.videoUrl || cachedData.imageUrl || cachedData.imageBase64;
            if (imageUrl) {
              if (!imageUrl.endsWith('.mp4') && !imageUrl.includes('.mp4')) {
                imageUrl = await compressImage(imageUrl, 1024, 0.9);
              }
              await localforage.setItem(`img_${safeId}`, imageUrl).catch(e => console.warn(e));
            }
          } else {
            console.warn(`No se encontró imagen en global_flashcards ni con slugId: [${slugId}] ni safeId: [${safeId}]`);
          }
        } catch (cacheErr) {
          console.warn("Error al consultar global_flashcards en Firestore:", cacheErr);
        }
      }

      // 4. Actualizar estado de imágenes cargadas si se obtuvo una imagen
      if (imageUrl) {
        setCardImages(prev => ({
          ...prev,
          [safeId]: imageUrl
        }));
      }

      // 5. Desbloquear la tarjeta para el usuario
      setUnlockedCards(prev => ({
        ...prev,
        [safeId]: {
          unlocked: true,
          imageUrl: imageUrl || null
        }
      }));

      if (userDocRef) {
        await setDoc(userDocRef, {
          unlocked: true,
          imageUrl: imageUrl || null
        }, { merge: true }).catch(e => console.warn(e));
      }
    } catch (error) {
      console.error('Error al revelar imagen:', error);
    } finally {
      setIsImageLoading(null);
    }
  };
  const speakText = async (word, e) => {
    if (e) e.stopPropagation();
    const rawText = typeof word === 'string' ? word : word.de;
    const textToSpeak = splitGermanTitle(rawText).main || rawText;
    recordDailyStudyActivity();
    recordSkillActivity('listening', 1).catch(() => {});
    if (typeof word === 'object' && word?.de) {
      const safeId = getSafeId(word.de).substring(0, 150);
      recordCardStudied(safeId);
    }
    playGermanAudio(textToSpeak, { type: "vocab", voice: "Charon" });
  };
  const markCardAsStudied = (safeId) => {
    recordCardStudied(safeId);
  };
  if (!user || user.isAnonymous || accessStatus !== 'approved') {
    return (
      <AuthAccessGate
        user={user}
        auth={auth}
        accessStatus={accessStatus}
        verificationError={accessError}
        onRecheckAccess={() => verifyAccessWithServer(user, { silent: false })}
      />
    );
  }

  return <Suspense fallback={
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 gap-3">
      <Loader2 className="animate-spin text-yellow-400" size={36} />
      <span className="font-bold text-slate-300 text-sm">Cargando interfaz...</span>
    </div>
  }>
    <div className="min-h-[100svh] bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto relative">
      
      {viewMode === "presentation" && activePresentationId && activePresentation ? (
        <PresentationViewer
          presentation={activePresentation}
          onClose={handleExitToOrigin}
          cardImages={cardImages}
          generateCardImage={generateCardImage}
          isImageLoading={isImageLoading}
          openAiTutor={openAiTutor}
          setFullscreenImage={setFullscreenImage}
          unlockedCards={unlockedCards}
          speakText={speakText}
          lazyLoadImage={lazyLoadImage}
          onNextModule={(nextId) => (nextId ? handleOpenGoetheModule(nextId) : setActivePresentationId(null))}
        />
      ) : viewMode === "studyPlan" && activeStudyPlanId ? (() => {
        const activeModule = studyPlanModules.find(m => m.id === activeStudyPlanId);
        if (!activeModule) return null;
        return (
          <PresentationViewer
            presentation={activeModule}
            onClose={handleExitToOrigin}
            cardImages={cardImages}
            generateCardImage={generateCardImage}
            isImageLoading={isImageLoading}
            openAiTutor={openAiTutor}
            setFullscreenImage={setFullscreenImage}
            unlockedCards={unlockedCards}
            speakText={speakText}
            lazyLoadImage={lazyLoadImage}
            onNextModule={(nextId) => (nextId ? handleOpenStudyPlan(nextId) : setActiveStudyPlanId(null))}
          />
        );
      })() : viewMode === "driving" ? (
        <DrivingMode
          activeChapterId={activeChapterId}
          chapters={chapters}
          onExit={handleExitToOrigin}
          pendingAutoCommand={pendingAutoCommand}
          onClearAutoCommand={() => setPendingAutoCommand(null)}
          onWordStudied={(wordObj) => {
            if (wordObj?.de) {
              const safeId = getSafeId(wordObj.de).substring(0, 150);
              markCardAsStudied(safeId);
              recordDailyStudyActivity();
              recordSkillActivity('listening', 2).catch(() => {});
              recordSkillActivity('speaking', 2).catch(() => {});
            }
          }}
        />
      ) : viewMode === "profile" ? <Profile
        onExit={handleExitToOrigin}
        user={user}
        auth={auth}
        accessRole={accessRole}
        isAdmin={accessRole === 'admin'}
        studiedCardsCount={studiedCardsCount}
        unlockedCardsCount={Object.keys(unlockedCards || {}).length}
        totalCardsCount={totalUniqueCardsCount}
        canInstallPWA={canInstallPWA}
        onInstallApp={handleInstallApp}
        showWebInstallCard={showWebInstallCard}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      /> : viewMode === "quiz" ? <DynamicQuiz 
        onExit={handleExitToOrigin} 
        chapters={chapters}
        activeChapterId={activeChapterId}
        activeChapterTitle={activeChapter?.title}
        initialScope={quizInitialScope}
      /> : <>
          {/* HEADER NAVBAR */}
          <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30 flex-shrink-0 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleGoHome}
                  aria-label="Ir al Inicio y Guía de Estudio"
                  className="flex items-center gap-2.5 sm:gap-3 text-left min-w-0 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-xl p-1 -m-1 transition"
                >
                  <div className="bg-yellow-500 group-hover:bg-yellow-400 text-slate-900 p-2 rounded-lg shrink-0 transition">
                    <GraduationCap size={26} />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-black tracking-wide leading-tight truncate">DeutschMeister <span className="text-yellow-400">PRO A1–B1</span></h1>
                    <p className="text-[11px] sm:text-xs text-slate-400 truncate">Alemán Integral A1–B1 &amp; Preparación Oficial Goethe / DTZ</p>
                  </div>
                </button>
                {/* HAMBURGER + PROFILE ON MOBILE */}
                <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
                  {!isHomeOpen && (
                    <button
                      type="button"
                      onClick={handleGoHome}
                      className="min-h-[40px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold px-2.5 py-2 rounded-lg transition flex items-center gap-1.5 text-xs shadow-sm cursor-pointer"
                      aria-label="Volver al Inicio"
                      title="Volver al Inicio"
                    >
                      <Home size={16} />
                      <span>Inicio</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleOpenSpecialView('driving')}
                    className="min-h-[40px] min-w-[40px] bg-zinc-900 text-emerald-400 p-2 rounded-lg border border-emerald-500/40 transition flex items-center justify-center shadow-sm cursor-pointer"
                    aria-label="Modo Conducción"
                    title="Modo Conducción"
                  >
                    <Car size={20} />
                  </button>
                  <button type="button" onClick={() => handleOpenSpecialView('profile')} className="min-h-[40px] min-w-[40px] bg-slate-800 text-blue-400 hover:text-white p-2 rounded-lg border border-slate-700 transition flex items-center justify-center shadow-sm" aria-label="Perfil">
                    <User size={20} />
                  </button>
                  <button type="button" onClick={() => setIsMenuOpen(true)} className="min-h-[40px] min-w-[40px] bg-slate-800 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-700 transition flex items-center justify-center shadow-sm" aria-label="Abrir menú">
                    <Menu size={20} />
                  </button>
                </div>
              </div>
              
              <div className="relative w-full md:w-1/3">
                <input type="text" placeholder="Buscar (ej. Motor, essen, Verbo Modal)..." className="w-full py-2 px-4 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all" value={searchTerm} onChange={e => {
              const nextSearch = e.target.value;
              setSearchTerm(nextSearch);
              if (nextSearch.trim() !== "") {
                setIsHomeOpen(false);
                setActivePresentationId(null);
                setActiveStudyPlanId(null);
                if (viewMode !== "flashcards" && viewMode !== "table") setViewMode("flashcards");
              }
            }} />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>

              {/* PROFILE + MENU ON DESKTOP */}
              <div className="hidden md:flex items-center gap-2 shrink-0">
                {!isHomeOpen && (
                  <button
                    type="button"
                    onClick={handleGoHome}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-md cursor-pointer text-sm"
                    title="Volver al Inicio y Guía de Estudio"
                  >
                    <Home size={17} />
                    <span>Inicio</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleOpenSpecialView('driving')}
                  className="bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-2 shadow-md cursor-pointer text-sm"
                  title="Modo Conducción Manos Libres (Fahrmodus)"
                >
                  <Car size={18} />
                  <span>Modo Conducción</span>
                </button>
                <button type="button" onClick={() => handleOpenSpecialView('profile')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-2 shadow-md cursor-pointer text-sm">
                  <User size={18} /> Perfil
                </button>
                <button type="button" onClick={() => setIsMenuOpen(true)} className="bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-4 py-2 rounded-lg transition flex items-center gap-2 font-bold shadow-md text-sm cursor-pointer">
                  <Menu size={18} /> Menú
                </button>
              </div>
            </div>
          </header>

          {/* SIDEBAR DRAWER MENÚ DESLIZABLE */}
          {isMenuOpen && <>
              <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-slate-950/60 z-40 transition-opacity animate-in fade-in duration-200" />
              <aside className="fixed inset-y-0 left-0 w-[88vw] sm:w-80 md:w-96 max-w-sm bg-slate-900 text-slate-100 z-50 shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-left">
                {/* Cabecera del Menú */}
                <div className="px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] border-b border-slate-800 flex justify-between items-center bg-slate-950">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-yellow-400" size={22} />
                    <span className="font-bold text-sm text-white tracking-wide">Navegación DM A1–B1</span>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg transition" aria-label="Cerrar menú">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                  {/* Accesos rápidos */}
                  <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-800">
                    <button
                      type="button"
                      onClick={handleGoHome}
                      className={`col-span-2 py-2.5 px-3 rounded-lg font-bold transition flex items-center justify-center gap-2 text-xs shadow-md active:scale-95 cursor-pointer border ${
                        isHomeOpen
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                          : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-400/40'
                      }`}
                    >
                      <Home size={16} />
                      <span>🏠 Inicio y Guía de Estudio</span>
                    </button>
                    <button
                      onClick={() => handleOpenSpecialView("driving")}
                      className="bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 col-span-2 py-2.5 rounded-lg font-bold transition flex items-center justify-center gap-2 text-xs shadow-md shadow-emerald-500/10 active:scale-95 cursor-pointer"
                    >
                      <Car size={18} />
                      <span>🚗 Modo Conducción (Fahrmodus)</span>
                    </button>
                    <button onClick={() => {
                setTutorNotice(null);
                setTutorInitialMode('tutor');
                setIsTutorOpen(true);
                setIsMenuOpen(false);
              }} className="bg-slate-800 text-yellow-400 border border-yellow-500/20 py-2.5 rounded-lg font-bold hover:bg-slate-700 transition flex flex-col items-center justify-center gap-1 text-xs cursor-pointer">
                      <Bot size={18} /> Tutor IA
                    </button>
                    <button onClick={() => handleOpenSpecialView('roleplay')} className="bg-purple-900/60 text-purple-200 border border-purple-500/20 py-2.5 rounded-lg font-bold hover:bg-purple-800 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm cursor-pointer">
                      <Sparkles size={18} /> Rol ✨
                    </button>
                    <button onClick={() => handleOpenSpecialView('call')} className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 py-2.5 rounded-lg font-bold hover:bg-emerald-900 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm cursor-pointer">
                      <Mic size={18} /> Llamada 📞
                    </button>
                    <button onClick={() => handleOpenSpecialView('photo')} className="bg-amber-950 text-amber-300 border border-amber-500/30 py-2.5 rounded-lg font-bold hover:bg-amber-900 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm cursor-pointer">
                      <ImagePlus size={18} /> Foto 📸
                    </button>
                    <button onClick={() => handleOpenSpecialView('phrase')} className="bg-sky-900/60 text-sky-200 border border-sky-500/20 py-2.5 rounded-lg font-bold hover:bg-sky-800 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm cursor-pointer">
                      <MessageCircle size={18} /> Frase / Diálogo
                    </button>
                    <button onClick={() => handleOpenSpecialView('podcast')} className="bg-violet-900/60 text-violet-200 border border-violet-500/20 py-2.5 rounded-lg font-bold hover:bg-violet-800 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm cursor-pointer">
                      <Headphones size={18} /> Pódcasts 🎙️
                    </button>
                    <button onClick={() => handleOpenSpecialView('reading')} className="bg-emerald-900/60 text-emerald-200 border border-emerald-500/20 col-span-2 py-2.5 rounded-lg font-bold hover:bg-emerald-800 transition flex items-center justify-center gap-2 text-xs shadow-sm cursor-pointer">
                      <BookOpen size={18} /> Lectura 📖
                    </button>
                    <button onClick={() => handleOpenSpecialView('verb_prep_lab')} className="bg-sky-950/70 text-sky-200 border border-sky-500/30 py-2.5 rounded-lg font-bold hover:bg-sky-900/70 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm cursor-pointer">
                      <span>🔗</span> Verbos + Prep
                    </button>
                    <button onClick={() => handleOpenSpecialView('syntax_lab')} className="bg-indigo-950/70 text-indigo-200 border border-indigo-500/30 py-2.5 rounded-lg font-bold hover:bg-indigo-900/70 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm cursor-pointer">
                      <span>🔀</span> Sintaxis A2–B1
                    </button>
                    <button onClick={() => handleOpenSpecialView('quiz')} className="bg-yellow-600 text-slate-900 col-span-2 py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition flex items-center justify-center gap-2 text-xs shadow-sm cursor-pointer">
                      <Gamepad2 size={18} /> Quiz Dinámico / SRS
                    </button>
                    <button onClick={() => handleOpenSpecialView('profile')} className="bg-blue-600 text-white col-span-2 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-xs shadow-sm">
                      <User size={18} /> Mi Perfil y Configuración
                    </button>
                    <button
                      onClick={() => handleOpenChapter(22, "flashcards")}
                      className="bg-indigo-900/70 text-indigo-200 border border-indigo-500/30 col-span-2 py-2.5 rounded-lg font-bold hover:bg-indigo-800 transition flex items-center justify-center gap-2 text-xs shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="text-indigo-400" size={18} />
                      <span>💬 Kapitel 22: Redemittel & Alltagskommunikation</span>
                    </button>
                    {showWebInstallCard && (
                      <button onClick={() => {
                        setIsMenuOpen(false);
                        handleInstallApp();
                      }} className="bg-emerald-600 hover:bg-emerald-500 text-white col-span-2 py-2.5 rounded-lg font-bold transition flex items-center justify-center gap-2 text-xs shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer">
                        <Download size={18} />
                        <span>📲 Instalar App en este Dispositivo</span>
                      </button>
                    )}
                  </div>

                  {/* ACORDEÓN 1: Tablas Maestras */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsTablasOpen(!isTablasOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>📘 Tablas Maestras</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isTablasOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isTablasOpen && (
                      <div className="space-y-1 py-1 border-t border-slate-800/50 bg-slate-950/20 p-1.5">
                        {chapters.map((chap) => {
                          const isSelected = !isHomeOpen && activeChapterId === chap.id && (viewMode === 'flashcards' || viewMode === 'table');
                          return (
                            <button
                              key={chap.id}
                              onClick={() => handleOpenChapter(chap.id, 'flashcards')}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                                isSelected
                                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                              }`}
                            >
                              <span className="text-lg shrink-0">{chap.emoji || '📚'}</span>
                              <div className="flex flex-col min-w-0">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-200' : 'text-indigo-400'}`}>
                                  CAPÍTULO {chap.id}
                                </span>
                                <span className="text-xs truncate font-medium">
                                  {chap.title.replace(/^(Capítulo|Kapitel)\s+\d+:\s*/i, '')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* ACORDEÓN 2: Plan de Estudio */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsPlanOpen(!isPlanOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>🎓 Plan de Estudio</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isPlanOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isPlanOpen && <div className="flex flex-col border-t border-slate-800/50 bg-slate-950/20 p-1.5 space-y-1">
                        {studyPlanModules.map(mod => {
                          const isActive = !isHomeOpen && activeStudyPlanId === mod.id && viewMode === 'studyPlan';
                          const cefr = mod.cefrLevel || 'A1';
                          const cefrPillClass = cefr === 'B1'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : cefr === 'A2'
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                          const stageText = mod.stageLabel || (mod.id ? String(mod.id).replace(/(sp_|g_|kap_)/i, 'Módulo ') : 'Sección');
                          return (
                            <button
                              key={mod.id}
                              onClick={() => handleOpenStudyPlan(mod.id)}
                              className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                                isActive
                                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                                  : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                              }`}
                            >
                              <span className="mt-0.5 text-amber-400 shrink-0">
                                <Sparkles size={16} />
                              </span>
                              <div className="flex flex-col min-w-0 flex-1 space-y-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border shrink-0 ${cefrPillClass}`}>
                                    {cefr}
                                  </span>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 truncate">
                                    {stageText}
                                  </span>
                                </div>
                                <span className="text-xs font-medium text-slate-100 leading-snug whitespace-normal break-words">
                                  {mod.title.replace(/^(Capítulo|Kapitel)\s+\d+:\s*/i, '')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>}
                  </div>

                  {/* ACORDEÓN 3: Módulos Goethe */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsGoetheOpen(!isGoetheOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>🏛️ Módulos Goethe</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isGoetheOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isGoetheOpen && <div className="flex flex-col border-t border-slate-800/50 bg-slate-950/20 p-1.5 space-y-1">
                        {goetheModules.map(pres => {
                          const isActive = !isHomeOpen && activePresentationId === pres.id && viewMode === 'presentation';
                          return (
                            <button
                              key={pres.id}
                              onClick={() => handleOpenGoetheModule(pres.id)}
                              className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                                isActive
                                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                                  : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                              }`}
                            >
                              <span className="mt-0.5 text-amber-400 shrink-0">
                                <PlayCircle size={16} />
                              </span>
                              <div className="flex flex-col min-w-0 flex-1 space-y-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                                  {pres.id ? String(pres.id).replace(/(sp_|g_|kap_)/i, 'Módulo ') : 'Sección'}
                                </span>
                                <span className="text-xs font-medium text-slate-100 leading-snug whitespace-normal break-words">
                                  {pres.title.replace(/^(Capítulo|Kapitel)\s+\d+:\s*/i, '')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>}
                  </div>
                </div>
              </aside>
            </>}

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6 relative">
        
        {/* CONTENT AREA */}
        <section className="flex-1 w-full min-w-0 pb-20 relative">
          <Suspense fallback={
            <div className="flex h-[70svh] items-center justify-center w-full">
              <div className="animate-pulse flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Cargando módulo...</p>
              </div>
            </div>
          }>
          
          {phaseBannerNotice && !isHomeOpen && (
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-950 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium flex items-center justify-between gap-3">
              <span>{phaseBannerNotice}</span>
              <button
                type="button"
                onClick={() => setPhaseBannerNotice(null)}
                className="text-indigo-700 hover:bg-indigo-100 p-1 rounded-lg shrink-0 cursor-pointer"
                aria-label="Cerrar aviso"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* VISTA: INICIO Y CENTRO DE MANDO PEDAGÓGICO 🏠 */}
          {isHomeOpen && searchTerm.trim() === "" && !["roleplay", "call", "phrase", "podcast", "reading", "verb_prep_lab", "syntax_lab"].includes(viewMode) && (
            <HomeDashboard
              user={user}
              accessRole={accessRole}
              chapters={chapters}
              studyPlanModules={studyPlanModules}
              goetheModules={goetheModules}
              studiedCardsCount={studiedCardsCount}
              totalUniqueCardsCount={totalUniqueCardsCount}
              lastActivity={lastActivity}
              streakSummary={streakSummary}
              skillProgress={skillProgress}
              srsStats={srsStats}
              learningProfile={learningProfile}
              completedModuleIds={completedModuleIds}
              studiedCardIds={studiedCardIds}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
              onStartSrsReview={handleStartSrsReview}
              onOpenChapter={handleOpenChapter}
              onOpenStudyPlan={handleOpenStudyPlan}
              onOpenGoetheModule={handleOpenGoetheModule}
              onOpenSpecialView={handleOpenSpecialView}
              onOpenTutor={handleOpenTutorFromHome}
              onOpenChapterStory={handleOpenChapterStory}
            />
          )}

          {/* VISTA: SIMULADOR DE ROL IA & MODO LLAMADA HANDS-FREE 📞✨ */}
          {(viewMode === "roleplay" || viewMode === "call") && (
            <div className="pt-[max(0.75rem,env(safe-area-inset-top))]">
              <RoleplaySimulator
                key={viewMode}
                initialMode={viewMode === "call" ? "call" : "roleplay"}
                onExit={handleExitToOrigin}
              />
            </div>
          )}

          {/* VISTA: MODO FRASE & DIÁLOGO GUIADO (SATZKLAMMER + TURNOS) 💬 */}
          {viewMode === "phrase" && (
            <PhraseDialogueTrainer onExit={handleExitToOrigin} />
          )}

          {/* VISTA: MICRO-PÓDCASTS OFFLINE KARAOKE + WSOLA 🎙️ */}
          {viewMode === "podcast" && (
            <MicroPodcastPlayer onExit={handleExitToOrigin} />
          )}

          {/* VISTA: COMPRENSIÓN LECTORA IA 📖 */}
          {viewMode === "reading" && <ReadingComprehension onExit={handleExitToOrigin} />}

          {/* VISTA: LABORATORIO DE VERBOS + PREPOSICIÓN & DA-/WO- 🔗 */}
          {viewMode === "verb_prep_lab" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs">
                <button
                  type="button"
                  onClick={handleExitToOrigin}
                  className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Volver</span>
                </button>
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full">
                  Laboratorio A2–B1 · Verbos + Preposición
                </span>
              </div>
              <VerbPrepositionTrainer isModal />
            </div>
          )}

          {/* VISTA: LABORATORIO DE TRANSFORMACIÓN SINTÁCTICA 🔀 */}
          {viewMode === "syntax_lab" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs">
                <button
                  type="button"
                  onClick={handleExitToOrigin}
                  className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Volver</span>
                </button>
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
                  Laboratorio A2–B1 · Sintaxis &amp; Nebensätze
                </span>
              </div>
              <SyntaxTransformLab isModal />
            </div>
          )}
          
          {/* VISTAS: FLASHCARDS Y TABLA */}
          {(!isHomeOpen || searchTerm.trim() !== "") && (viewMode === "flashcards" || viewMode === "table") && <>
              <div className="mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      {searchTerm ? `Búsqueda: "${searchTerm}"` : activeChapter?.title}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {selectedCategory !== 'Todas' && !searchTerm
                        ? `${displayedWords.length} términos en "${selectedCategory}" (${activeChapter?.words?.length || 0} en el capítulo).`
                        : `${displayedWords.length} términos encontrados.`}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
                    {/* BOTÓN CUENTO IA (GEMINI API) ✨ */}
                    <button onClick={() => generateStory()} disabled={storyState?.loading} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition flex items-center gap-2 shadow-sm whitespace-nowrap">
                      {storyState?.loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                      Cuento IA ✨
                    </button>

                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                      <button onClick={() => setViewMode("flashcards")} className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition cursor-pointer ${viewMode === "flashcards" ? 'bg-white shadow text-blue-700 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
                        <LayoutGrid size={16} /> Flashcards
                      </button>
                      <button onClick={() => setViewMode("table")} className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition cursor-pointer ${viewMode === "table" ? 'bg-white shadow text-blue-700 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
                        <List size={16} /> Tabla
                      </button>
                    </div>
                  </div>
                </div>

                {/* FILTRO POR CATEGORÍA EN PÍLDORAS */}
                {!searchTerm && categories.length > 2 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-3 border-t border-slate-100 mt-3 scrollbar-thin">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                      <Filter size={12} /> Categoría:
                    </span>
                    {categories.map(cat => {
                      const isCatActive = selectedCategory === cat;
                      const count = cat === 'Todas'
                        ? (activeChapter?.words?.length || 0)
                        : (activeChapter?.words?.filter(w => w.category === cat).length || 0);
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1 rounded-full text-xs transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                            isCatActive
                              ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isCatActive ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* RENDER FLASHCARDS */}
              {viewMode === "flashcards" && <>
                  {displayedWords.length > 0 && <div className="flex justify-end gap-2 mb-4">
                       <button onClick={revealAll} className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-semibold transition">Revelar todo</button>
                       <button onClick={hideAll} className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-semibold transition">Ocultar todo</button>
                     </div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedWords.map((word, index) => {
                  const isRevealed = revealedCards[index];
                  const safeId = getSafeId(word.de).substring(0, 150);
                  return <PresentationVocabCard key={`${safeId}_${word.category || index}`} wordObj={{
                    ...word,
                    chapter: searchTerm ? word.chapter : undefined
                  }} cardImages={cardImages} regeneratedImages={unlockedCards} generateCardImage={generateCardImage} isImageLoading={isImageLoading} openAiTutor={openAiTutor} setFullscreenImage={setFullscreenImage} unlockedCards={unlockedCards} speakText={speakText} lazyLoadImage={lazyLoadImage} isRevealed={isRevealed} />;
                })}
              </div>
            </>}

          {/* RENDER TABLA */}
          {viewMode === "table" && <div className="animate-in fade-in pb-10">
               {Object.entries(groupWordsByCategory(displayedWords)).map(([category, words], catIdx) => <div key={catIdx} className="mb-8">
                  {category !== "General" && <h3 className="text-lg font-bold text-slate-700 mb-3 border-b-2 border-blue-200 pb-2">{category}</h3>}
                  <div className="w-full overflow-x-auto scrollbar-thin rounded-xl border border-slate-200 shadow-sm bg-white">
                    <table className="w-full min-w-[600px] text-left border-collapse">
                      <thead className="sticky top-0 bg-slate-100 z-10">
                        <tr className="border-b border-slate-200 text-slate-700 text-sm uppercase tracking-wider">
                          <th className="px-4 py-3 font-bold">Expresión en Alemán</th>
                          <th className="px-4 py-3 font-bold">Pronunciación</th>
                          <th className="px-4 py-3 font-bold text-center">Traducción</th>
                          <th className="px-4 py-3 font-bold">Contexto</th>
                          <th className="px-4 py-3 font-bold">Plural / Régimen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {words.map((word, idx) => {
                        const getTypeBadgeClass = w => {
                          const de = (w.de || "").toLowerCase();
                          const type = w.type || "";
                          if (de.startsWith("der ") || type.includes("Masc")) return "bg-blue-100 text-blue-800 border-blue-200";
                          if (de.startsWith("die ") || type.includes("Fem")) return "bg-red-100 text-red-800 border-red-200";
                          if (de.startsWith("das ") || type.includes("Neutro") || type.includes("Neut")) return "bg-green-100 text-green-800 border-green-200";
                          if (type.includes("Verbo")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
                          return "bg-slate-100 text-slate-800 border-slate-200";
                        };
                        return <tr key={idx} className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                              <td className="px-4 py-3 flex items-center justify-between gap-3 align-middle">
                                {(() => {
                                  if (word.audioDe) {
                                    const parts = (word.de || "").split(/(\([^)]+\))/g);
                                    return (
                                      <>
                                        <div className="flex flex-col min-w-0">
                                          <span className="font-bold text-slate-800 leading-tight">
                                            {parts.map((part, pIdx) =>
                                              part.startsWith("(") && part.endsWith(")") ? (
                                                <span key={pIdx} className="text-indigo-600 font-semibold">{part}</span>
                                              ) : (
                                                part
                                              )
                                            )}
                                          </span>
                                        </div>
                                        <button onClick={e => {
                                          e.stopPropagation();
                                          playGermanAudio(word.audioDe || splitGermanTitle(word.de).main, { type: "vocab", voice: "Charon" });
                                        }} className="text-blue-500 hover:text-blue-700 p-1 transition-transform hover:scale-110 shrink-0">
                                          <Volume2 size={16} />
                                        </button>
                                      </>
                                    );
                                  }
                                  const { main, code } = splitGermanTitle(word.de);
                                  return (
                                    <>
                                      <div className="flex flex-col min-w-0">
                                        <span className="font-bold text-slate-800 leading-tight">{main}</span>
                                        {code && (
                                          <span className="text-xs text-slate-500 font-normal mt-0.5 tracking-normal">
                                            {code}
                                          </span>
                                        )}
                                      </div>
                                      <button onClick={e => {
                                        e.stopPropagation();
                                        playGermanAudio(word.audioDe || main || word.de, { type: "vocab", voice: "Charon" });
                                      }} className="text-blue-500 hover:text-blue-700 p-1 transition-transform hover:scale-110 shrink-0">
                                        <Volume2 size={16} />
                                      </button>
                                    </>
                                  );
                                })()}
                              </td>
                              <td className="px-4 py-3 text-slate-500 font-mono text-sm align-middle">
                                {word.pron ? `/${word.pron}/` : "-"}
                              </td>
                              <td className="px-4 py-3 text-center align-middle">
                                {(() => {
                                  const { main, sub } = splitParentheticalText(word.es);
                                  return (
                                    <div className="flex flex-col items-center">
                                      <span className="font-medium text-slate-700 leading-tight">{main}</span>
                                      {sub && (
                                        <span className="text-xs text-slate-500 font-normal mt-0.5 tracking-normal">
                                          {sub}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })()}
                                <span className={`inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-semibold border ${getTypeBadgeClass(word)}`}>{word.type}</span>
                              </td>
                              <td className="px-4 py-3 text-slate-500 max-w-xs md:max-w-md align-middle">
                                {word.exampleSentenceDe ? <>
                                    <span className="text-sm text-slate-700 italic block">💬 {word.exampleSentenceDe}</span>
                                    {word.exampleSentenceEs && <span className="text-xs text-slate-400 block mt-1">{word.exampleSentenceEs}</span>}
                                  </> : <span className="text-slate-300">---</span>}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap align-middle text-center">
                                {(() => {
                              if (word.regimen) {
                                const reg = word.regimen;
                                if (reg.includes("Akkusativ")) {
                                  return <span className="font-bold text-blue-600">{reg}</span>;
                                } else if (reg.includes("Dativo") || reg.includes("⚠️")) {
                                  return <span className="font-bold text-amber-600">{reg}</span>;
                                } else {
                                  return <span className="font-semibold text-slate-700">{reg}</span>;
                                }
                              }
                              if (word.plural) {
                                const pluralClean = word.plural.replace(/Plural:\s*/i, "").trim();
                                return <span className="font-bold text-slate-800">{pluralClean}</span>;
                              }
                              return <span className="text-slate-300 font-normal text-xs font-mono">---</span>;
                            })()}
                              </td>
                            </tr>;
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>)}
            </div>}

          {displayedWords.length === 0 && <div className="py-16 text-center text-slate-400 bg-white rounded-xl border-2 border-dashed border-slate-200">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium text-slate-500">No se encontraron palabras.</p>
            </div>}

          {/* MODAL DEL CUENTO IA (MÁXIMO 3 CUENTOS PERSISTENTES POR TABLA MAESTRA) */}
          {storyState.isOpen && (
            <Suspense fallback={null}>
              <StoryModal
                storyState={storyState}
                activeChapter={activeChapter}
                chapters={chapters}
                onClose={closeStoryModal}
                onSelectSlot={handleSelectChapterStorySlot}
                onCreateNewStory={() => handleCreateNewChapterStory(storyState.stories)}
              />
            </Suspense>
          )}
        </>}
    </Suspense>
    </section>
  </main>
  </>
  }

    {/* --- PANEL LATERAL: TUTOR IA & MODO FOTO --- */}
    {isTutorOpen && (
      <Suspense fallback={null}>
        <TutorChat
          isOpen={isTutorOpen}
          onClose={() => {
            setIsTutorOpen(false);
            setTutorNotice(null);
            setTutorInitialMode('tutor');
          }}
          initialMode={tutorInitialMode}
          isFullscreen={isTutorFullscreen}
          setIsFullscreen={setIsTutorFullscreen}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          sendChatMessage={sendChatMessage}
          isChatLoading={isChatLoading}
          chatEndRef={chatEndRef}
          user={user}
          externalNotice={tutorNotice}
        />
      </Suspense>
    )}

    {fullscreenImage && (() => {
        const resolvedFullscreenSrc =
          typeof fullscreenImage === "string" &&
          (fullscreenImage.startsWith("blob:") ||
            fullscreenImage.startsWith("http") ||
            fullscreenImage.startsWith("data:") ||
            fullscreenImage.startsWith("/"))
            ? fullscreenImage
            : typeof fullscreenImage === "string"
              ? `data:image/jpeg;base64,${fullscreenImage}`
              : "";
        const isFullscreenVideo =
          typeof resolvedFullscreenSrc === "string" &&
          (resolvedFullscreenSrc.includes(".mp4") ||
            resolvedFullscreenSrc.startsWith("data:video/"));
        return (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4" onClick={() => setFullscreenImage(null)}>
            <div className="relative max-w-5xl max-h-[100svh] w-full h-full flex flex-col items-center justify-center">
              <button onClick={e => {
                e.stopPropagation();
                setFullscreenImage(null);
              }} className="absolute top-4 right-4 text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors z-[110]">
                <X size={24} />
              </button>
              {isFullscreenVideo ? (
                <video
                  src={resolvedFullscreenSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
                  onClick={e => e.stopPropagation()}
                />
              ) : (
                <img
                  src={resolvedFullscreenSrc}
                  alt="Vista Ampliada"
                  className="max-w-full max-h-[90svh] object-contain rounded-2xl shadow-2xl p-2 cursor-zoom-out bg-white"
                  onClick={e => e.stopPropagation()}
                />
              )}
            </div>
          </div>
        );
      })()}

    {/* Modal con instrucciones para iOS Safari / Instalación manual */}
    {showInstallInstructionsModal && (
      <InstallInstructionsModal
        isOpen={showInstallInstructionsModal}
        onClose={() => setShowInstallInstructionsModal(false)}
      />
    )}

    {/* Modal de Onboarding Guiado & Mini-Diagnóstico CEFR A1-B1 */}
    {isOnboardingOpen && (
      <Suspense fallback={null}>
        <OnboardingModal
          isOpen={isOnboardingOpen}
          initialProfile={learningProfile}
          onSaveProfile={handleSaveLearningProfile}
          onDismiss={handleDismissOnboarding}
        />
      </Suspense>
    )}
</div></Suspense>;
}