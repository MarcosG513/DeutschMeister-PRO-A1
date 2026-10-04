import React, { useState, useMemo, useEffect, useRef, lazy, Suspense } from 'react';
import { User, Search, BookOpen, Car, Home, Coffee, ShoppingCart, Activity, Briefcase, Heart, Clock, Mail, CheckCircle, XCircle, List, LayoutGrid, Gamepad2, GraduationCap, Link2, MessageCircle, Bot, ImagePlus, Volume2, X, Send, Loader2, Star as Sparkles, Monitor as Presentation, ChevronRight, ChevronLeft, PlayCircle, Mic, Edit as Edit3, Headphones, RefreshCw, Flame, Trophy, Menu, ChevronDown, Maximize, Minimize, Play, Pause } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import localforage from 'localforage';
import PresentationVocabCard from './components/PresentationVocabCard';
import GrammarAccordion from './components/GrammarAccordion';
import AudioSim from './components/AudioSim';
import MarkdownMessage from './components/MarkdownMessage';
import { chapters, goetheModules, studyPlanModules } from './data/chapters';
import { fetchWithRetry, compressImageBase64 as compressImage, getSafeId } from './utils/helpers';
import { playGermanAudio, stopCurrentAudio, getGermanSpeechUrl } from './services/aiAudioService';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';


import Profile from './components/Profile';

const EmailSimulator = lazy(() => import('./components/EmailSimulator'));
const ReadingComprehension = lazy(() => import('./components/ReadingComprehension'));
const PresentationViewer = lazy(() => import('./components/PresentationViewer'));
const DynamicQuiz = lazy(() => import('./components/DynamicQuiz'));
const RoleplaySimulator = lazy(() => import('./components/RoleplaySimulator'));
const InteractiveQA = lazy(() => import('./components/InteractiveQA'));

// --- CONFIGURACIÓN API & FIREBASE ---
// Se removió el apiKey local, ahora se usan Firebase Functions.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const firebaseApp = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key' ? initializeApp(firebaseConfig) : null;
const auth = firebaseApp ? getAuth(firebaseApp) : null;
const db = firebaseApp ? getFirestore(firebaseApp) : null;
export const functions = firebaseApp ? getFunctions(firebaseApp) : null;
const appId = firebaseConfig.appId || 'default-app-id';

// --- UTILS PARA IA Y DATOS ---

const base64ToArrayBuffer = base64 => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};
const pcmToWav = (pcmBuffer, sampleRate) => {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const dataSize = pcmBuffer.byteLength;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);
  const pcmView = new Int16Array(pcmBuffer);
  let offset = 44;
  for (let i = 0; i < pcmView.length; i++) {
    view.setInt16(offset, pcmView[i], true);
    offset += 2;
  }
  return new Blob([view], {
    type: 'audio/wav'
  });
};
const compressImageBase64 = (base64Str, maxWidth = 512, quality = 0.6) => {
  return new Promise(resolve => {
    if (!base64Str || !base64Str.startsWith('data:')) return resolve(base64Str);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round(height * maxWidth / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(base64Str);
    img.src = base64Str;
  });
};

// --- COMPONENTES AUXILIARES ---

// --- Las bases de datos se importan desde './data/chapters' ---

const loadingPhrases = [
  "Buscando inspiración en la Selva Negra... 🌲",
  "Poniendo el verbo en la Posición 2... 👑",
  "Comprando un billete de tren hacia Berlín... 🚆",
  "Mezclando palabras con un poco de chucrut... 🥨",
  "Despertando al fantasma de Goethe... 👻",
  "Declinando adjetivos a la velocidad de la luz... ⚡"
];

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id);
  const [activePresentationId, setActivePresentationId] = useState(null);
  const [activeStudyPlanId, setActiveStudyPlanId] = useState(null);
  const [currentStudyPlanSlide, setCurrentStudyPlanSlide] = useState(0);
  useEffect(() => {
    setCurrentStudyPlanSlide(0);
  }, [activeStudyPlanId]);
  const [searchTerm, setSearchTerm] = useState("");
  const [revealedCards, setRevealedCards] = useState({});
  const [viewMode, setViewMode] = useState("flashcards");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTablasOpen, setIsTablasOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isGoetheOpen, setIsGoetheOpen] = useState(false);


  // Se ha removido el useEffect de migración, ya que se hará síncronamente arriba.
  const [storyState, setStoryState] = useState({
    isOpen: false,
    loading: false,
    de: "",
    es: ""
  });
  const [loadingPhraseIdx, setLoadingPhraseIdx] = useState(0);

  useEffect(() => {
    if (!storyState?.loading) {
      setLoadingPhraseIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingPhraseIdx(prev => (prev + 1) % loadingPhrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [storyState?.loading]);
  const [isStoryAudioLoading, setIsStoryAudioLoading] = useState(false);
  const [isPlayingStoryAudio, setIsPlayingStoryAudio] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const storyAudioInstanceRef = useRef(null); // Instancia HTML5 Audio en memoria
  const storyAudioUrlRef = useRef(null);      // Buffer/Data URI guardado mientras el modal esté abierto

  const closeStoryModal = () => {
    if (storyAudioInstanceRef.current) {
      storyAudioInstanceRef.current.pause();
      storyAudioInstanceRef.current.src = "";
      storyAudioInstanceRef.current = null;
    }
    storyAudioUrlRef.current = null; // Libera la memoria del audio
    setIsPlayingStoryAudio(false);
    setIsStoryAudioLoading(false);
    setCurrentWordIndex(-1);
    setStoryState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  useEffect(() => {
    return () => {
      if (storyAudioInstanceRef.current) {
        storyAudioInstanceRef.current.pause();
        storyAudioInstanceRef.current.src = "";
        storyAudioInstanceRef.current = null;
      }
      storyAudioUrlRef.current = null;
    };
  }, []);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [user, setUser] = useState(null);
  const [cardImages, setCardImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const lazyLoadImage = async wordObj => {
    if (!wordObj || !wordObj.de) return;
    const safeId = getSafeId(wordObj.de).substring(0, 150);
    const slugId = wordObj.de.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
    if (cardImages[safeId] !== undefined || loadingImages[safeId]) return;
    setLoadingImages(prev => ({
      ...prev,
      [safeId]: true
    }));
    try {
      const cached = await localforage.getItem(`img_${safeId}`);
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
        imageUrl = docSnap.data().imageUrl || docSnap.data().imageBase64;
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
  const [unlockedCards, setUnlockedCards] = useState(() => {
    try {
      const saved = localStorage.getItem('deutschmeister_unlocked');
      let parsed = saved ? JSON.parse(saved) : {};

      // MIGRACIÓN AUTOMÁTICA (SÍNCRONA)
      const hasReset = localStorage.getItem('global_regen_reset_v3');
      if (!hasReset) {
        if (parsed && typeof parsed === 'object') {
          for (const key in parsed) {
            parsed[key].regenerated = false;
          }
          localStorage.setItem('deutschmeister_unlocked', JSON.stringify(parsed));
        }
        localStorage.setItem('global_regen_reset_v3', 'true');
      }
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  });
  useEffect(() => {
    if (unlockedCards && typeof unlockedCards === 'object' && Object.keys(unlockedCards).length > 0) {
      localStorage.setItem('deutschmeister_unlocked', JSON.stringify(unlockedCards));
    }
  }, [unlockedCards]);
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
  const { isListening: isChatListening, startListening: startChatListening, stopListening: stopChatListening } = useSpeechRecognition('de-DE');

  const handleChatMicClick = () => {
    if (isChatListening) {
      stopChatListening();
    } else {
      startChatListening((text) => {
        if (text) {
          setChatInput(prev => prev ? `${prev} ${text}` : text);
        }
      });
    }
  };
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.error("Error en login anónimo:", e);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!user || !db || user.uid === 'offline_user') return;
    const userUnlockedRef = collection(db, 'artifacts', appId, 'users', user.uid, 'unlockedCards');
    const unsubscribe = onSnapshot(userUnlockedRef, snapshot => {
      const unlocked = {};
      snapshot.forEach(doc => {
        unlocked[doc.id] = doc.data();
      });
      setUnlockedCards(unlocked);
    }, error => console.error("Error cargando desbloqueos:", error));
    return () => unsubscribe();
  }, [user]);
  useEffect(() => {
    if (!user || !db) return;
    const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
    const unsubscribe = onSnapshot(chatDocRef, docSnap => {
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
  }, [user]);
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
      if (isTutorOpen) {
        setIsTutorOpen(false);
        return;
      }
      if (storyState?.isOpen) {
        closeStoryModal();
        return;
      }
      if (activePresentationId || activeStudyPlanId) {
        setActivePresentationId(null);
        setActiveStudyPlanId(null);
        return;
      }
      if (viewMode !== "flashcards") {
        setViewMode("flashcards");
        return;
      }
      CapacitorApp.exitApp();
    });

    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, [
    fullscreenImage, isTutorOpen, storyState, 
    activePresentationId, activeStudyPlanId, viewMode
  ]);
  const activeChapter = useMemo(() => chapters.find(c => c.id === activeChapterId), [activeChapterId]);
  const activePresentation = useMemo(() => goetheModules.find(p => p.id === activePresentationId), [activePresentationId]);
  useEffect(() => {
    if (activeChapter?.isRedemittel && viewMode === "flashcards") {
      setViewMode("table");
    }
  }, [activeChapterId, viewMode, activeChapter]);
  const displayedWords = useMemo(() => {
    if (searchTerm.trim() !== "") {
      const normalizeStr = str => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
      const normTerm = normalizeStr(searchTerm);
      return chapters.flatMap(c => c.words.map(w => ({
        ...w,
        chapter: c.title,
        emoji: c.emoji,
        isRedemittel: c.isRedemittel
      }))).filter(w => normalizeStr(w.de).includes(normTerm) || normalizeStr(w.es).includes(normTerm) || normalizeStr(w.pron).includes(normTerm) || normalizeStr(w.type).includes(normTerm) || w.category && normalizeStr(w.category).includes(normTerm));
    }
    return activeChapter ? activeChapter.words.map(w => ({
      ...w,
      chapter: activeChapter.title,
      emoji: activeChapter.emoji
    })) : [];
  }, [activeChapterId, searchTerm, activeChapter]);
  const toggleCard = index => setRevealedCards(prev => ({
    ...prev,
    [index]: !prev[index]
  }));
  const revealAll = () => {
    const all = {};
    displayedWords.forEach((_, i) => all[i] = true);
    setRevealedCards(all);
  };
  const hideAll = () => setRevealedCards({});
  const generateStory = async () => {
    if (!activeChapter) return;
    if (storyAudioInstanceRef.current) {
      storyAudioInstanceRef.current.pause();
      storyAudioInstanceRef.current.src = "";
      storyAudioInstanceRef.current = null;
    }
    storyAudioUrlRef.current = null;
    setIsPlayingStoryAudio(false);
    setIsStoryAudioLoading(false);
    setCurrentWordIndex(-1);

    const palabrasValidas = displayedWords.filter(w => w.de.length > 2).slice(0, 8).map(w => w.de);
    if (palabrasValidas.length === 0) {
      setStoryState({
        isOpen: true,
        loading: false,
        de: "No hay suficientes palabras en este capítulo para generar un cuento.",
        es: "Por favor, agrega palabras de vocabulario antes de generar."
      });
      return;
    }
    setStoryState({
      isOpen: true,
      loading: true,
      de: "",
      es: ""
    });
    const attemptFetch = async () => {
      const response = await fetch(`https://generatestory-44keyii6gq-uc.a.run.app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          palabrasVocabulario: palabrasValidas
        })
      });
      if (!response.ok) throw new Error("Failed to generate story");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let currentBuffer = "";
      while (true) {
        const {
          value,
          done
        } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, {
          stream: true
        });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ") && !line.includes("[DONE]")) {
            const textChunk = line.substring(6);
            currentBuffer += textChunk;
            const getStreamingField = (buffer, fieldName) => {
              const regex = new RegExp(`"${fieldName}"\\s*:\\s*"([^"]*)`);
              const match = buffer.match(regex);
              if (match) {
                return match[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\t/g, "\t");
              }
              return "";
            };
            const partialDe = getStreamingField(currentBuffer, "cuento_aleman") || getStreamingField(currentBuffer, "de");
            const partialEs = getStreamingField(currentBuffer, "traduccion_espanol") || getStreamingField(currentBuffer, "es");
            setStoryState(prev => ({
              ...prev,
              loading: false,
              de: partialDe || "Escribiendo cuento...",
              es: partialEs || "Traduciendo..."
            }));
          }
        }
      }
      const jsonMatch = currentBuffer.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Formato JSON no encontrado.");
      }
      return JSON.parse(jsonMatch[0]);
    };
    try {
      const data = await attemptFetch();
      setStoryState({
        isOpen: true,
        loading: false,
        de: data.cuento_aleman || data.de,
        es: data.traduccion_espanol || data.es
      });
    } catch (e) {
      console.warn("Intento 1 falló, reintentando...", e);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        const data = await attemptFetch();
        setStoryState({
          isOpen: true,
          loading: false,
          de: data.cuento_aleman || data.de,
          es: data.traduccion_espanol || data.es
        });
      } catch (retryError) {
        console.error("Intento 2 falló:", retryError);
        setStoryState({
          isOpen: true,
          loading: false,
          de: "Error al generar el cuento.",
          es: "Por favor, intenta de nuevo más tarde."
        });
      }
    }
  };
  const parseTextToTokens = text => {
    if (!text) return [];
    const cleanedText = text.replace(/\s+([.,!?:;()\-!])/g, '$1');
    const tokens = [];
    let isBold = false;
    let charIndex = 0;
    let wordCounter = 0;
    let i = 0;
    while (i < cleanedText.length) {
      if (cleanedText.startsWith('**', i)) {
        isBold = !isBold;
        i += 2;
        continue;
      }
      const spaceMatch = cleanedText.slice(i).match(/^\s+/);
      if (spaceMatch) {
        const spaceStr = spaceMatch[0];
        tokens.push({
          text: spaceStr,
          isWord: false,
          isBold: isBold,
          isKeyword: isBold,
          charStart: charIndex,
          charEnd: charIndex + spaceStr.length,
          wordIndex: -1
        });
        charIndex += spaceStr.length;
        i += spaceStr.length;
        continue;
      }
      const punctMatch = cleanedText.slice(i).match(/^[.,!?:;()[\]{}'"“”«»„“\-–—/\\+]+/);
      if (punctMatch) {
        const punctStr = punctMatch[0];
        tokens.push({
          text: punctStr,
          isWord: false,
          isBold: isBold,
          isKeyword: isBold,
          charStart: charIndex,
          charEnd: charIndex + punctStr.length,
          wordIndex: -1
        });
        charIndex += punctStr.length;
        i += punctStr.length;
        continue;
      }
      const wordMatch = cleanedText.slice(i).match(/^[^\s.,!?:;()[\]{}'"“”«»„“\-–—/\\+*]+/);
      if (wordMatch) {
        const wordStr = wordMatch[0];
        tokens.push({
          text: wordStr,
          isWord: true,
          isBold: isBold,
          isKeyword: isBold,
          charStart: charIndex,
          charEnd: charIndex + wordStr.length,
          wordIndex: wordCounter++
        });
        charIndex += wordStr.length;
        i += wordStr.length;
        continue;
      }
      const singleChar = cleanedText[i];
      const isWord = /^[a-zA-Z0-9ÄäÖöÜüß]$/.test(singleChar);
      tokens.push({
        text: singleChar,
        isWord: isWord,
        isBold: isBold,
        isKeyword: isBold,
        charStart: charIndex,
        charEnd: charIndex + 1,
        wordIndex: isWord ? wordCounter++ : -1
      });
      charIndex += 1;
      i += 1;
    }
    return tokens;
  };
  const calculateWordTimings = (tokens) => {
    const words = tokens.filter(t => t.isWord);
    const totalChars = words.reduce((sum, w) => sum + w.text.length, 0);
    let accumulated = 0;

    return words.map((w, idx) => {
      const startRatio = accumulated / (totalChars || 1);
      accumulated += w.text.length;
      const endRatio = accumulated / (totalChars || 1);
      return { wordIndex: idx, startRatio, endRatio };
    });
  };

  const handleToggleStoryAudio = async () => {
    if (!storyState.de) return;

    // 1. Si ya se está reproduciendo, pausar
    if (isPlayingStoryAudio && storyAudioInstanceRef.current) {
      storyAudioInstanceRef.current.pause();
      setIsPlayingStoryAudio(false);
      return;
    }

    // 2. Si ya fue pausado y el audio ya existe en memoria, reanudar de inmediato (0 API calls)
    if (storyAudioInstanceRef.current && storyAudioUrlRef.current) {
      // Si terminó, reiniciar desde el inicio
      if (storyAudioInstanceRef.current.ended) {
        storyAudioInstanceRef.current.currentTime = 0;
        setCurrentWordIndex(0);
      }
      storyAudioInstanceRef.current.play();
      setIsPlayingStoryAudio(true);
      return;
    }

    // 3. Primera reproducción: Llamar a la API y guardar en memoria
    try {
      setIsStoryAudioLoading(true);
      stopCurrentAudio(); // Detiene cualquier otro sonido en la app

      const audioSource = await getGermanSpeechUrl(storyState.de, {
        voice: "Charon",
        type: "story"
      });

      storyAudioUrlRef.current = audioSource;

      const audio = new Audio(audioSource);
      storyAudioInstanceRef.current = audio;

      const tokens = parseTextToTokens(storyState.de);
      const wordTimings = calculateWordTimings(tokens);

      audio.onplay = () => {
        setIsStoryAudioLoading(false);
        setIsPlayingStoryAudio(true);
      };

      audio.ontimeupdate = () => {
        if (!audio.duration || audio.duration === 0) return;
        const currentProgress = audio.currentTime / audio.duration;
        const active = wordTimings.find(
          w => currentProgress >= w.startRatio && currentProgress < w.endRatio
        );
        if (active && active.wordIndex !== currentWordIndex) {
          setCurrentWordIndex(active.wordIndex);
        }
      };

      audio.onended = () => {
        setIsPlayingStoryAudio(false);
        setCurrentWordIndex(-1);
      };

      audio.onerror = (e) => {
        console.warn("[Story Audio Error] Fallo al reproducir:", e);
        setIsPlayingStoryAudio(false);
        setIsStoryAudioLoading(false);
        setCurrentWordIndex(-1);
      };

      await audio.play();
    } catch (err) {
      console.error("Error al obtener audio del cuento:", err);
      setIsStoryAudioLoading(false);
      setIsPlayingStoryAudio(false);
    }
  };

  const handlePlayStory = handleToggleStoryAudio;
  const speakStory = handleToggleStoryAudio;
  const groupWordsByCategory = words => {
    return words.reduce((acc, word) => {
      const cat = word.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(word);
      return acc;
    }, {});
  };
  const toggleFullScreen = () => {
    setIsFullscreen(prev => !prev);
  };
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
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
    try {
      const idToken = user ? await user.getIdToken().catch(() => '') : '';
      const response = await fetch(`https://sendtutorchatmessage-44keyii6gq-uc.a.run.app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({
          historialConversacion: newMessages,
          uid: user?.uid
        })
      });

      if (!response.ok) throw new Error("Failed to connect to tutor");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let currentText = "";
      setChatMessages([...newMessages, {
        role: "model",
        parts: [{
          text: ""
        }]
      }]);
      setIsChatLoading(false);
      while (true) {
        const {
          value,
          done
        } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, {
          stream: true
        });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ") && !line.includes("[DONE]")) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.text) {
                currentText += data.text;
                setChatMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "model",
                    parts: [{
                      text: currentText
                    }]
                  };
                  return updated;
                });
              }
            } catch (err) {}
          }
        }
      }
      const finalMessages = [...newMessages, {
        role: "model",
        parts: [{
          text: currentText
        }]
      }];
      setChatMessages(finalMessages);
      if (user && db) {
        const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
        await setDoc(chatDocRef, {
          messages: finalMessages
        }, {
          merge: true
        }).catch(e => console.warn("Chat guardado localmente debido a permisos:", e));
      }
    } catch (error) {
      console.error("Error en chat:", error);
      setChatMessages([...newMessages, {
        role: "model",
        parts: [{
          text: "Lo siento, ha ocurrido un error de conexión con el servidor. Inténtalo de nuevo."
        }]
      }]);
    } finally {
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
    const slugId = wordObj.de.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
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
            imageUrl = cachedData.imageUrl || cachedData.imageBase64;
            if (imageUrl) {
              imageUrl = await compressImageBase64(imageUrl, 1024, 0.9);
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
    const textToSpeak = typeof word === 'string' ? word : word.de;
    playGermanAudio(textToSpeak, { type: "vocab", voice: "Charon" });
  };
  return <Suspense fallback={
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 gap-3">
      <Loader2 className="animate-spin text-yellow-400" size={36} />
      <span className="font-bold text-slate-300 text-sm">Cargando interfaz...</span>
    </div>
  }>
    <div className="min-h-[100svh] bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto relative">
      
      {viewMode === "presentation" && activePresentationId && activePresentation ? <PresentationViewer
        presentation={activePresentation}
        onClose={() => {
          setViewMode('flashcards');
          setActivePresentationId(null);
        }}
        cardImages={cardImages}
        generateCardImage={generateCardImage}
        isImageLoading={isImageLoading}
        openAiTutor={openAiTutor}
        setFullscreenImage={setFullscreenImage}
        unlockedCards={unlockedCards}
        speakText={speakText}
        lazyLoadImage={lazyLoadImage}
        onNextModule={setActivePresentationId}
      /> : viewMode === "profile" ? <Profile
        onExit={() => setViewMode('flashcards')}
        user={user}
        auth={auth}
        unlockedCardsCount={Object.keys(unlockedCards || {}).length}
        totalCardsCount={1089}
      /> : viewMode === "quiz" ? <DynamicQuiz onExit={() => setViewMode('flashcards')} /> : <>
          {/* HEADER NAVBAR */}
          <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500 text-slate-900 p-2 rounded-lg animate-pulse">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h1 className="text-xl font-black tracking-wide leading-tight">DeutschMeister <span className="text-yellow-400">PRO A1</span></h1>
                    <p className="text-xs text-slate-400">Alemán Técnico & Preparación Goethe Zertifikat</p>
                  </div>
                </div>
                {/* HAMBURGER + PROFILE ON MOBILE */}
                <div className="flex items-center gap-2 md:hidden">
                  <button onClick={() => setViewMode('profile')} className="bg-slate-800 text-blue-400 hover:text-white p-2 rounded-lg border border-slate-700 transition flex items-center justify-center shadow-sm" aria-label="Perfil">
                    <User size={20} />
                  </button>
                  <button onClick={() => setIsMenuOpen(true)} className="bg-slate-800 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-700 transition flex items-center justify-center shadow-sm" aria-label="Abrir menú">
                    <Menu size={20} />
                  </button>
                </div>
              </div>
              
              <div className="relative w-full md:w-1/3">
                <input type="text" placeholder="Buscar (ej. Motor, essen, Verbo Modal)..." className="w-full py-2 px-4 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all" value={searchTerm} onChange={e => {
              setSearchTerm(e.target.value);
              if (viewMode === "quiz" || viewMode === "presentation" || viewMode === "studyPlan") setViewMode("flashcards");
            }} />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>

              {/* HAMBURGER + PROFILE ON DESKTOP */}
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setViewMode('profile')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-2 shadow-md cursor-pointer text-sm">
                  <User size={18} /> Perfil
                </button>
                <button onClick={() => setIsMenuOpen(true)} className="bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-4 py-2 rounded-lg transition flex items-center gap-2 font-bold shadow-md text-sm">
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
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-yellow-400" size={22} />
                    <span className="font-bold text-sm text-white tracking-wide">Navegación DM A1</span>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg transition" aria-label="Cerrar menú">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                  {/* Accesos rápidos */}
                  <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-800">
                    <button onClick={() => {
                setIsTutorOpen(true);
                setIsMenuOpen(false);
              }} className="bg-slate-800 text-yellow-400 border border-yellow-500/20 py-2.5 rounded-lg font-bold hover:bg-slate-700 transition flex flex-col items-center justify-center gap-1 text-xs">
                      <Bot size={18} /> Tutor IA
                    </button>
                    <button onClick={() => {
                setViewMode('roleplay');
                setIsMenuOpen(false);
              }} className="bg-purple-900/60 text-purple-200 border border-purple-500/20 py-2.5 rounded-lg font-bold hover:bg-purple-800 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm">
                      <Sparkles size={18} /> Rol ✨
                    </button>
                    <button onClick={() => {
                setViewMode('reading');
                setIsMenuOpen(false);
              }} className="bg-emerald-900/60 text-emerald-200 border border-emerald-500/20 py-2.5 rounded-lg font-bold hover:bg-emerald-800 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm">
                      <BookOpen size={18} /> Lectura 📖
                    </button>
                    <button onClick={() => {
                setViewMode('quiz');
                setActivePresentationId(null);
                setActiveStudyPlanId(null);
                setIsMenuOpen(false);
              }} className="bg-yellow-600 text-slate-900 py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm">
                      <Gamepad2 size={18} /> Quiz
                    </button>
                    <button onClick={() => {
                setViewMode('profile');
                setIsMenuOpen(false);
              }} className="bg-blue-600 text-white col-span-2 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-xs shadow-sm">
                      <User size={18} /> Mi Perfil y Configuración
                    </button>
                  </div>

                  {/* ACORDEÓN 1: Tablas Maestras */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsTablasOpen(!isTablasOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>📘 Tablas Maestras</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isTablasOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isTablasOpen && <div className="flex flex-col border-t border-slate-800/50 bg-slate-950/20 p-1.5 space-y-1">
                        {chapters.map(chap => {
                          const isActive = activeChapterId === chap.id && (viewMode === 'flashcards' || viewMode === 'table');
                          return (
                            <button
                              key={chap.id}
                              onClick={async () => {
                                setActiveChapterId(chap.id);
                                if (viewMode !== 'flashcards' && viewMode !== 'table') setViewMode('flashcards');
                                setIsMenuOpen(false);
                              }}
                              className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                                isActive
                                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                                  : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                              }`}
                            >
                              <span className="mt-0.5 text-amber-400 shrink-0 text-base">
                                {chap.emoji || <BookOpen size={16} />}
                              </span>
                              <div className="flex flex-col min-w-0 flex-1 space-y-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                                  {typeof chap.id === 'number' ? `Capítulo ${chap.id}` : String(chap.id).replace(/(sp_|g_|kap_)/i, 'Módulo ')}
                                </span>
                                <span className="text-xs font-medium text-slate-100 leading-snug whitespace-normal break-words">
                                  {chap.title.replace(/^(Capítulo|Kapitel)\s+\d+:\s*/i, '')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>}
                  </div>

                  {/* ACORDEÓN 2: Plan de Estudio */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsPlanOpen(!isPlanOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>🎓 Plan de Estudio</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isPlanOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isPlanOpen && <div className="flex flex-col border-t border-slate-800/50 bg-slate-950/20 p-1.5 space-y-1">
                        {studyPlanModules.map(mod => {
                          const isActive = activeStudyPlanId === mod.id && viewMode === 'studyPlan';
                          return (
                            <button
                              key={mod.id}
                              onClick={() => {
                                setActiveStudyPlanId(mod.id);
                                setViewMode('studyPlan');
                                setIsMenuOpen(false);
                              }}
                              className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                                isActive
                                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                                  : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                              }`}
                            >
                              <span className="mt-0.5 text-amber-400 shrink-0">
                                <Sparkles size={16} />
                              </span>
                              <div className="flex flex-col min-w-0 flex-1 space-y-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                                  {mod.id ? String(mod.id).replace(/(sp_|g_|kap_)/i, 'Módulo ') : 'Sección'}
                                </span>
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
                          const isActive = activePresentationId === pres.id && viewMode === 'presentation';
                          return (
                            <button
                              key={pres.id}
                              onClick={() => {
                                setActivePresentationId(pres.id);
                                setViewMode('presentation');
                                setIsMenuOpen(false);
                              }}
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
          
          {/* MODO PRESENTACIÓN VISUAL */}
          {viewMode === "presentation" && activePresentationId && activePresentation && <PresentationViewer
            presentation={activePresentation}
            onClose={() => {
              setViewMode('flashcards');
              setActivePresentationId(null);
              setIsFullscreen(false);
            }}
            cardImages={cardImages}
            generateCardImage={generateCardImage}
            isImageLoading={isImageLoading}
            openAiTutor={openAiTutor}
            setFullscreenImage={setFullscreenImage}
            unlockedCards={unlockedCards}
            speakText={speakText}
            lazyLoadImage={lazyLoadImage}
            onNextModule={setActivePresentationId}
          />}

          {/* VISTA: SIMULADOR DE ROL (GEMINI API) ✨ */}
          {viewMode === "roleplay" && typeof RoleplaySimulator !== 'undefined' && <RoleplaySimulator onExit={() => setViewMode("flashcards")} />}

          {/* VISTA: COMPRENSIÓN LECTORA IA 📖 */}
          {viewMode === "reading" && <ReadingComprehension onExit={() => setViewMode("flashcards")} />}

          {/* VISTA: PLAN DE ESTUDIO (CLASES MAGISTRALES) */}
          {viewMode === "studyPlan" && activeStudyPlanId && (() => {
            const activeModule = studyPlanModules.find(m => m.id === activeStudyPlanId);
            if (!activeModule) return null;
            return <PresentationViewer
              presentation={activeModule}
              onClose={() => {
                setViewMode('flashcards');
                setActiveStudyPlanId(null);
              }}
              cardImages={cardImages}
              generateCardImage={generateCardImage}
              isImageLoading={isImageLoading}
              openAiTutor={openAiTutor}
              setFullscreenImage={setFullscreenImage}
              unlockedCards={unlockedCards}
              speakText={speakText}
              lazyLoadImage={lazyLoadImage}
              onNextModule={setActiveStudyPlanId}
            />;
          })()}
          
          {/* VISTAS: FLASHCARDS Y TABLA */}
          {(viewMode === "flashcards" || viewMode === "table") && <>
              <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    {searchTerm ? `Búsqueda: "${searchTerm}"` : activeChapter?.title}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">{displayedWords.length} términos encontrados.</p>
                </div>
                
                {/* BOTÓN CUENTO IA (GEMINI API) ✨ */}
                <button onClick={typeof generateStory === 'function' ? generateStory : () => {}} disabled={storyState?.loading} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition flex items-center gap-2 shadow-sm whitespace-nowrap self-start sm:self-auto">
                  {storyState?.loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  Cuento IA ✨
                </button>

                {(!activeChapter?.isRedemittel || searchTerm) && <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-auto border border-slate-200">
                    <button onClick={() => setViewMode("flashcards")} className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition ${viewMode === "flashcards" ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}>
                      <LayoutGrid size={16} /> Flashcards
                    </button>
                    <button onClick={() => setViewMode("table")} className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition ${viewMode === "table" ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}>
                      <List size={16} /> Tabla
                    </button>
                  </div>}
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
                  const isLongText = word.de.length > 25;
                  const safeId = getSafeId(word.de).substring(0, 150);
                  const isUnlocked = true;
                  const imgBase64 = cardImages[safeId];
                  const existsGlobally = !!cardImages[safeId];
                  const isGenLoading = isImageLoading === safeId;
                  const isRegenerated = true;
                  return <PresentationVocabCard key={index} wordObj={{
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
                              <td className="px-4 py-3 flex items-center gap-2 align-middle">
                                <span className="font-bold text-slate-800">{word.de}</span>
                                <button onClick={e => {
                              e.stopPropagation();
                              playGermanAudio(word.de, { type: "vocab", voice: "Charon" });
                            }} className="text-blue-500 hover:text-blue-700 p-1 transition-transform hover:scale-110">
                                  <Volume2 size={16} />
                                </button>
                              </td>
                              <td className="px-4 py-3 text-slate-500 font-mono text-sm align-middle">
                                {word.pron ? `/${word.pron}/` : "-"}
                              </td>
                              <td className="px-4 py-3 text-center align-middle">
                                <div className="font-medium text-slate-700">{word.es}</div>
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

          {/* MODAL DEL CUENTO IA */}
          {storyState.isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 max-h-[85svh] flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Sparkles className="text-indigo-500" /> Cuento A1 Generado</h3>
                  <button onClick={closeStoryModal} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full"><X size={20} /></button>
                </div>
                {storyState.loading ? <div className="py-12 flex flex-col items-center justify-center gap-3 text-indigo-500 flex-grow">
                    <Loader2 size={40} className="animate-spin" />
                    <div className="animate-pulse text-indigo-600 font-medium transition-opacity duration-300 text-center px-4">{loadingPhrases[loadingPhraseIdx]}</div>
                  </div> : <div className="space-y-4 flex-grow overflow-hidden flex flex-col">
                    <div className="bg-slate-50 rounded-xl border border-slate-200 relative group transition-all select-none flex-grow overflow-hidden flex flex-col max-h-[280px]">
                      <div className="p-5 overflow-y-auto pb-4 pr-12 cursor-pointer hover:bg-indigo-50/10 flex-grow" onClick={handleToggleStoryAudio}>
                        <div translate="no" className="notranslate font-normal text-lg leading-relaxed text-slate-800">
                          {parseTextToTokens(storyState.de).map((token, idx) => {
                          if (token.isWord) {
                            const isHighlighted = token.wordIndex === currentWordIndex;
                            const isKeyword = token.isBold || token.isKeyword;
                            const fontWeightClass = isKeyword ? 'font-bold' : 'font-normal';
                            return <span key={idx} className={`inline-block transition-all duration-150 rounded px-[2px] mx-[1px] border ${isHighlighted ? 'bg-yellow-200 border-yellow-300 text-slate-900 scale-105 shadow-sm' : isKeyword ? 'bg-indigo-50 border-transparent text-indigo-700' : 'bg-transparent border-transparent text-slate-800'} ${fontWeightClass}`}>{token.text}</span>;
                          } else {
                            const isPunct = /^[.,!?:;]+$/.test(token.text);
                            return <span key={idx} className={`text-slate-800 inline-block ${isPunct ? 'ml-[-3px] pl-0 pr-[1px]' : 'px-[1px]'}`}>{token.text}</span>;
                          }
                        })}
                        </div>
                      </div>
                      <button 
                        onClick={handleToggleStoryAudio}
                        disabled={isStoryAudioLoading}
                        className={`absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md transition-all text-xs font-semibold ${
                          isStoryAudioLoading
                            ? 'bg-indigo-100 text-indigo-500 cursor-not-allowed opacity-100'
                            : isPlayingStoryAudio 
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 scale-105 opacity-100' 
                              : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 opacity-90 group-hover:opacity-100'
                        }`}
                        title={isStoryAudioLoading ? "Preparando voz de estudio..." : isPlayingStoryAudio ? "Pausar cuento" : "Escuchar cuento"} 
                        aria-label={isStoryAudioLoading ? "Preparando voz de estudio..." : isPlayingStoryAudio ? "Pausar cuento" : "Escuchar cuento"}
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
                            <span>{storyAudioUrlRef.current ? "Reanudar" : "Escuchar cuento"}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex-shrink-0">
                      <p className="text-slate-700 italic">{storyState.es}</p>
                    </div>
                  </div>}
              </div>
            </div>}
        </>}
    </Suspense>
    </section>
  </main>
  </>
  }

  {/* --- PANEL LATERAL: TUTOR IA --- */}
    {isTutorOpen && <aside className={`fixed ${isTutorFullscreen ? 'inset-0 w-full z-[100]' : 'top-0 right-0 bottom-0 w-full md:w-[450px] z-[100] border-l'} bg-white shadow-2xl border-slate-200 flex flex-col h-[100dvh] overflow-hidden animate-in slide-in-from-right duration-300`}>
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="text-yellow-400" />
            <h3 className="font-bold text-lg">Tutor Alemán</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsTutorFullscreen(!isTutorFullscreen)} className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-1.5" title={isTutorFullscreen ? "Minimizar" : "Pantalla Completa"}>
              {isTutorFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
            <button onClick={() => setIsTutorOpen(false)} className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-1.5" title="Cerrar Tutor">
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4 custom-scrollbar">
          {chatMessages.map((msg, i) => <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                {msg.role === 'user' ? msg.parts[0].text : <MarkdownMessage text={msg.parts[0].text} />}
              </div>
            </div>)}
          {isChatLoading && <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-500 px-4 py-3 rounded-2xl rounded-bl-none flex gap-2 items-center text-sm shadow-sm">
                <Loader2 size={16} className="animate-spin text-blue-500" /> Escribiendo...
              </div>
            </div>
          }
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
          <div className="relative flex items-center">
            <input type="text" className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pl-5 pr-24 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition shadow-inner" placeholder={isChatListening ? "Escuchando tu voz..." : "Pregúntame algo en alemán o español..."} value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChatMessage()} />
            <div className="absolute right-2 top-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleChatMicClick}
                className={`p-2 rounded-full transition shadow ${isChatListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                title={isChatListening ? "Escuchando... Haz clic para detener" : "Dictar con micrófono"}
              >
                <Mic size={18} />
              </button>
              <button onClick={sendChatMessage} disabled={!chatInput.trim() || isChatLoading} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-400 transition shadow">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>}

    {fullscreenImage && <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4" onClick={() => setFullscreenImage(null)}>
        <div className="relative max-w-5xl max-h-[100svh] w-full h-full flex flex-col items-center justify-center">
          <button onClick={e => {
          e.stopPropagation();
          setFullscreenImage(null);
        }} className="absolute top-4 right-4 text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors z-[110]">
            <X size={24} />
          </button>
          <img src={typeof fullscreenImage === 'string' && (fullscreenImage.startsWith('http') || fullscreenImage.startsWith('data:')) ? fullscreenImage : typeof fullscreenImage === 'string' ? `data:image/png;base64,${fullscreenImage}` : ''} alt="Vista Ampliada" className="max-w-full max-h-[90svh] object-contain rounded-2xl shadow-2xl p-2 cursor-zoom-out bg-white" onClick={e => e.stopPropagation()} />
        </div>
      </div>}

  <style dangerouslySetInnerHTML={{
      __html: `
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px;}
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `
    }} />
</div></Suspense>;
}