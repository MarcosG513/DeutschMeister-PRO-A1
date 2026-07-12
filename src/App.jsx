import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, BookOpen, Car, Home, Coffee, ShoppingCart, Activity, Briefcase, Heart, Clock, Mail, CheckCircle, XCircle, List, LayoutGrid, Gamepad2, GraduationCap, Link2, MessageCircle, Bot, ImagePlus, Volume2, X, Send, Loader2, Maximize, Minimize, Star as Sparkles, Monitor as Presentation, ChevronRight, ChevronLeft, PlayCircle, Mic, Edit as Edit3, Headphones, RefreshCw, Flame, Trophy, Menu, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { initializeAdMob, showRewardVideo, showInterstitial } from './services/AdService';
import localforage from 'localforage';
import BannerAd from './components/BannerAd';
import PresentationVocabCard from './components/PresentationVocabCard';
import GrammarAccordion from './components/GrammarAccordion';
import AudioSim from './components/AudioSim';
import InteractiveQA from './components/InteractiveQA';
import TutorChat from './components/TutorChat';
import MarkdownMessage from './components/MarkdownMessage';
import { chapters, goetheModules, studyPlanModules } from './data/chapters';
import { fetchWithRetry, compressImageBase64 as compressImage, nativeSpeak, getSafeId } from './utils/helpers';
import EmailSimulator from './components/EmailSimulator';
import ReadingComprehension from './components/ReadingComprehension';
import PresentationViewer from './components/PresentationViewer';

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

const RoleplaySimulator = ({
  onExit
}) => {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [tutorMessageCount, setTutorMessageCount] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const scenarios = [{
    id: 'restaurant',
    title: 'En el Restaurante',
    icon: '🍽️',
    desc: 'Pide comida y bebida.',
    prompt: 'Eres un camarero muy amable en un restaurante en Múnich. El usuario es un cliente de nivel A1 de alemán. Empieza saludando y preguntando qué desea beber. Usa oraciones muy cortas y vocabulario A1. Responde SOLO en alemán.'
  }, {
    id: 'station',
    title: 'Estación de Tren',
    icon: '🚆',
    desc: 'Compra un billete.',
    prompt: 'Eres un vendedor de billetes en la estación de tren de Berlín. El usuario es un viajero nivel A1 que quiere ir a Fráncfort. Empieza diciendo "Guten Tag, wohin möchten Sie fahren?". Usa oraciones cortas A1. Responde SOLO en alemán.'
  }, {
    id: 'shopping',
    title: 'Tienda de Ropa',
    icon: '👕',
    desc: 'Busca una chaqueta.',
    prompt: 'Eres un vendedor en una tienda de ropa en Viena. El usuario busca una chaqueta. Empieza diciendo "Guten Tag, kann ich Ihnen helfen?". Usa vocabulario A1. Responde SOLO en alemán.'
  }, {
    id: 'hotel',
    title: 'Recepción de Hotel',
    icon: '🏨',
    desc: 'Haz el check-in y pide la llave.',
    prompt: 'Eres el recepcionista de un hotel en Berlín. El usuario tiene una reserva. Empieza diciendo "Herzlich willkommen! Haben Sie eine Reservierung?". Responde SOLO en alemán nivel A1.'
  }, {
    id: 'doctor',
    title: 'En el Médico',
    icon: '🩺',
    desc: 'Explica que te sientes mal.',
    prompt: 'Eres un médico en Alemania. El usuario es tu paciente. Empieza diciendo "Guten Tag! Was fehlt Ihnen?". Responde SOLO en alemán nivel A1.'
  }, {
    id: 'party',
    title: 'Fiesta de Intercambio',
    icon: '👋',
    desc: 'Preséntate a un desconocido.',
    prompt: 'Eres un estudiante de intercambio en una fiesta en Múnich. Quieres conocer al usuario. Empieza diciendo "Hallo! Ich bin Max. Wie heißt du?". Responde SOLO en alemán nivel A1.'
  }];
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);
  const startScenario = async scen => {
    setScenario(scen);
    setLoading(true);
    const initialMsgs = [{
      role: 'user',
      parts: [{
        text: "Hola, inicia la simulación según las instrucciones."
      }]
    }];
    try {
      const response = await fetch(`https://runroleplaysimulator-44keyii6gq-uc.a.run.app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          historialConversacion: initialMsgs,
          escenario: scen.prompt
        })
      });
      if (!response.ok) throw new Error("Failed to connect to Roleplay");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let currentText = "";
      setMessages([{
        role: "model",
        parts: [{
          text: ""
        }]
      }]);
      setLoading(false);
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
                const cleanedText = currentText.replace(/\*\*/g, '');
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "model",
                    parts: [{
                      text: cleanedText
                    }]
                  };
                  return updated;
                });
              }
            } catch (err) {}
          }
        }
      }
    } catch (e) {
      setMessages([{
        role: 'model',
        parts: [{
          text: "Entschuldigung, es hay un error de conexión."
        }]
      }]);
    } finally {
      setLoading(false);
    }
  };
  const sendMessage = async () => {
    if (!input.trim()) return;
    if (tutorMessageCount >= 3) {
      const granted = await showRewardVideo();
      if (granted) {
        setTutorMessageCount(0);
      } else {
        return;
      }
    } else {
      setTutorMessageCount(prev => prev + 1);
    }
    const newMsgs = [...messages, {
      role: 'user',
      parts: [{
        text: input
      }]
    }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch(`https://runroleplaysimulator-44keyii6gq-uc.a.run.app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          historialConversacion: newMsgs,
          escenario: scenario.prompt
        })
      });
      if (!response.ok) throw new Error("Failed to connect to Roleplay");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let currentText = "";
      setMessages([...newMsgs, {
        role: "model",
        parts: [{
          text: ""
        }]
      }]);
      setLoading(false);
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
                const cleanedText = currentText.replace(/\*\*/g, '');
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "model",
                    parts: [{
                      text: cleanedText
                    }]
                  };
                  return updated;
                });
              }
            } catch (err) {}
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages([...newMsgs, {
        role: 'model',
        parts: [{
          text: "Entschuldigung, es hay un error de conexión."
        }]
      }]);
    } finally {
      setLoading(false);
    }
  };
  if (!scenario) {
    return <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-3xl mx-auto mt-10 animate-in fade-in zoom-in duration-300 relative">
        <button onClick={onExit} className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition font-bold shadow-sm"><X size={18} /> Salir</button>
        <div className="text-center mb-8 mt-4">
          <div className="inline-flex bg-purple-100 text-purple-600 p-3 rounded-full mb-4 shadow-sm"><Sparkles size={32} /></div>
          <h2 className="text-3xl font-black text-slate-800">Simulador de Rol A1</h2>
          <p className="text-slate-500 mt-2">Pon a prueba tu alemán interactuando en situaciones reales con un personaje controlado por IA.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map(scen => <button key={scen.id} onClick={() => startScenario(scen)} className="flex flex-col items-center p-6 bg-slate-50 border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl transition-all text-center group cursor-pointer shadow-sm">
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{scen.icon}</span>
              <h3 className="font-bold text-slate-800 text-lg">{scen.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{scen.desc}</p>
            </button>)}
        </div>
      </div>;
  }
  return <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col h-[70svh] max-w-3xl mx-auto mt-6 overflow-hidden animate-in slide-in-from-bottom-4">
      <div className="bg-purple-600 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{scenario.icon}</span>
          <div>
            <h3 className="font-bold text-lg leading-tight">{scenario.title}</h3>
            <p className="text-purple-200 text-xs">Simulador de Conversación IA</p>
          </div>
        </div>
        <button onClick={() => setScenario(null)} className="text-purple-200 hover:text-white hover:bg-purple-700 px-3 py-1.5 rounded-lg transition text-sm font-bold flex items-center gap-2"><X size={16} /> Cambiar</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4 custom-scrollbar">
        {messages.filter(m => m.role !== 'user' || m.parts[0].text !== "Hola, inicia la simulación según las instrucciones.").map((msg, i) => <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm flex items-start gap-3 ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
              {msg.role === 'model' && <button onClick={() => nativeSpeak(msg.parts[0].text)} className="mt-1 text-slate-400 hover:text-purple-600 transition shrink-0"><Volume2 size={16} /></button>}
              <span className="leading-relaxed text-[15px]">{msg.parts[0].text}</span>
            </div>
          </div>)}
        {loading && <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-500 px-5 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-sm"><Loader2 size={16} className="animate-spin text-purple-500" /> El personaje está escribiendo...</div>
          </div>}
        <div ref={chatEndRef} />
      </div>


      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <input type="text" className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition shadow-inner" placeholder="Escribe tu respuesta en alemán..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} disabled={loading} />
          <button onClick={sendMessage} disabled={!input.trim() || loading} className="absolute right-2 top-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 transition shadow"><Send size={18} /></button>
        </div>
      </div>
    </div>;
};
// --- Las bases de datos se importan desde './data/chapters' ---

export default function App() {
  useEffect(() => {
    initializeAdMob();
  }, []);
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
  const [quizState, setQuizState] = useState(null);
  const [selectedQuizChapters, setSelectedQuizChapters] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Se ha removido el useEffect de migración, ya que se hará síncronamente arriba.
  const [storyState, setStoryState] = useState({
    isOpen: false,
    loading: false,
    de: "",
    es: ""
  });
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isPlayingStoryAudio, setIsPlayingStoryAudio] = useState(false);
  const [isStoryAudioPaused, setIsStoryAudioPaused] = useState(false);
  const utteranceRef = useRef(null);
  const wordsOnlyRef = useRef([]);
  const adaptiveTimerRef = useRef(null);
  const isPausedRef = useRef(false);
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (window.activeStoryInterval) {
        clearInterval(window.activeStoryInterval);
      }
    };
  }, []);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [user, setUser] = useState(null);
  const [cardImages, setCardImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const lazyLoadImage = async wordObj => {
    if (!wordObj || !wordObj.de) return;
    const safeId = getSafeId(wordObj.de).substring(0, 150);
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
      const imageDocRef = doc(db, 'global_flashcards', safeId);
      let docSnap = await getDoc(imageDocRef);
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
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInAnonymously(auth);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.error("Auth error:", e);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
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
  const openQuizSetup = () => {
    setSelectedQuizChapters(chapters.map(c => c.id));
    setViewMode("quizSetup");
  };
  const startQuizSession = () => {
    setCurrentStreak(0);
    generateNextQuizWord();
    setViewMode("quiz");
  };
  const generateNextQuizWord = () => {
    let selectedCaps = chapters.filter(c => selectedQuizChapters.includes(c.id));
    if (selectedCaps.length === 0) selectedCaps = chapters; // Fallback de seguridad

    let pool = selectedCaps.flatMap(c => c.words);
    if (pool.length < 4) pool = chapters.flatMap(c => c.words);
    const randomWord = pool[Math.floor(Math.random() * pool.length)];
    const options = [randomWord.es];
    while (options.length < 4) {
      const randomWrong = pool[Math.floor(Math.random() * pool.length)].es;
      if (!options.includes(randomWrong)) options.push(randomWrong);
    }
    setQuizState({
      word: randomWord,
      options: options.sort(() => Math.random() - 0.5),
      selected: null,
      isCorrect: null
    });
  };
  const handleQuizAnswer = opt => {
    if (quizState.selected) return;
    const isCorrect = opt === quizState.word.es;
    setQuizState(prev => ({
      ...prev,
      selected: opt,
      isCorrect: isCorrect
    }));
    if (isCorrect) {
      setCurrentStreak(prev => {
        const next = prev + 1;
        setBestStreak(b => next > b ? next : b);
        return next;
      });
    } else {
      setCurrentStreak(0);
    }
  };
  const generateStory = async () => {
    if (!activeChapter) return;
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
    const granted = await showRewardVideo();
    if (!granted) return;
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
  const speakStory = text => {
    if (!text) return;
    const cleanedText = text.replace(/\s+([.,!?:;()\-!])/g, '$1');
    if (isPlayingStoryAudio) {
      if (Capacitor.isNativePlatform()) {
        if (isStoryAudioPaused) {
          // Reanudar native
          const remainingWords = wordsOnlyRef.current.slice(currentWordIndex).map(w => w.text).join(' ');
          const remainingClean = remainingWords.replace(/\*\*/g, '');
          TextToSpeech.speak({
            text: remainingClean,
            lang: 'de-DE',
            rate: 0.70,
            volume: 1.0
          }).then(() => {
            if (!isPausedRef.current) {
              setIsPlayingStoryAudio(false);
              setIsStoryAudioPaused(false);
              setCurrentWordIndex(-1);
            }
          }).catch(e => console.error("Error speak", e));
          setIsStoryAudioPaused(false);
          isPausedRef.current = false;
          if (adaptiveTimerRef.current) {
            adaptiveTimerRef.current(currentWordIndex);
          }
        } else {
          // Pausar native
          TextToSpeech.stop();
          setIsStoryAudioPaused(true);
          isPausedRef.current = true;
          if (window.activeStoryTimeout) {
            clearTimeout(window.activeStoryTimeout);
            window.activeStoryTimeout = null;
          }
        }
      } else if ('speechSynthesis' in window) {
        if (isStoryAudioPaused) {
          window.speechSynthesis.resume();
          setIsStoryAudioPaused(false);
          isPausedRef.current = false;
          if (adaptiveTimerRef.current) {
            adaptiveTimerRef.current(currentWordIndex);
          }
        } else {
          window.speechSynthesis.pause();
          setIsStoryAudioPaused(true);
          isPausedRef.current = true;
          if (window.activeStoryTimeout) {
            clearTimeout(window.activeStoryTimeout);
            window.activeStoryTimeout = null;
          }
        }
      } else {
        if (isStoryAudioPaused) {
          window.isStoryPausedPlaceholder = false;
          setIsStoryAudioPaused(false);
          isPausedRef.current = false;
        } else {
          window.isStoryPausedPlaceholder = true;
          setIsStoryAudioPaused(true);
          isPausedRef.current = true;
        }
      }
      return;
    }
    setIsPlayingStoryAudio(true);
    setIsStoryAudioPaused(false);
    isPausedRef.current = false;
    setCurrentWordIndex(0);
    const tokens = parseTextToTokens(cleanedText);
    const wordsOnly = tokens.filter(t => t.isWord);
    wordsOnlyRef.current = wordsOnly;
    const cleanText = cleanedText.replace(/\*\*/g, '');
    let hasNativeBoundary = false;
    const runAdaptiveTimer = startIndex => {
      if (startIndex >= wordsOnly.length) return;
      let localIdx = startIndex;
      const tick = () => {
        if (hasNativeBoundary) return;
        if (localIdx >= wordsOnly.length) return;
        setCurrentWordIndex(localIdx);
        const currentWord = wordsOnly[localIdx];
        const wordLen = currentWord ? currentWord.text.length : 5;
        const rate = 0.70;
        const baseMs = 85;
        const minMs = 350;
        const duration = Math.max(minMs, wordLen * baseMs) / rate;
        localIdx++;
        if (localIdx < wordsOnly.length) {
          window.activeStoryTimeout = setTimeout(tick, duration);
        } else {
          setTimeout(() => {
            if (!hasNativeBoundary) {
              setIsPlayingStoryAudio(false);
              setIsStoryAudioPaused(false);
              setCurrentWordIndex(-1);
            }
          }, duration);
        }
      };
      if (window.activeStoryTimeout) clearTimeout(window.activeStoryTimeout);
      window.activeStoryTimeout = setTimeout(tick, 0);
    };
    adaptiveTimerRef.current = runAdaptiveTimer;
    if (Capacitor.isNativePlatform()) {
      TextToSpeech.stop();
      TextToSpeech.speak({
        text: cleanText,
        lang: 'de-DE',
        rate: 0.70,
        volume: 1.0
      }).then(() => {
        if (!isPausedRef.current) {
          setIsPlayingStoryAudio(false);
          setIsStoryAudioPaused(false);
          setCurrentWordIndex(-1);
        }
      }).catch(e => console.error("Error Native Speak", e));
      runAdaptiveTimer(0);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.getVoices(); // Carga segura de voces
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'de-DE';
      utterance.rate = 0.70;
      utterance.volume = 1.0;
      utteranceRef.current = utterance;
      utterance.onboundary = event => {
        if (event.name === 'word') {
          if (event.charIndex > 0) {
            hasNativeBoundary = true;
            if (window.activeStoryTimeout) {
              clearTimeout(window.activeStoryTimeout);
              window.activeStoryTimeout = null;
            }
          }
          const charIndex = event.charIndex;
          const currentToken = wordsOnlyRef.current.find(w => charIndex >= w.charStart && charIndex < w.charEnd);
          if (currentToken) {
            setCurrentWordIndex(currentToken.wordIndex);
          }
        }
      };
      utterance.onend = () => {
        if (window.activeStoryTimeout) {
          clearTimeout(window.activeStoryTimeout);
          window.activeStoryTimeout = null;
        }
        setIsPlayingStoryAudio(false);
        setIsStoryAudioPaused(false);
        setCurrentWordIndex(-1);
        utteranceRef.current = null;
      };
      utterance.onerror = () => {
        if (window.activeStoryTimeout) {
          clearTimeout(window.activeStoryTimeout);
          window.activeStoryTimeout = null;
        }
        setIsPlayingStoryAudio(false);
        setIsStoryAudioPaused(false);
        setCurrentWordIndex(-1);
        utteranceRef.current = null;
      };
      runAdaptiveTimer(0);
      window.speechSynthesis.speak(utterance);
    } else {
      let wordIdx = 0;
      setCurrentWordIndex(0);
      const runInterval = () => {
        if (window.activeStoryInterval) clearInterval(window.activeStoryInterval);
        window.activeStoryInterval = setInterval(() => {
          if (window.isStoryPausedPlaceholder) return;
          wordIdx++;
          if (wordIdx < wordsOnly.length) {
            setCurrentWordIndex(wordIdx);
          } else {
            clearInterval(window.activeStoryInterval);
            setIsPlayingStoryAudio(false);
            setIsStoryAudioPaused(false);
            setCurrentWordIndex(-1);
          }
        }, 450);
      };
      window.isStoryPausedPlaceholder = false;
      runInterval();
    }
  };
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
      const response = await fetch(`https://sendtutorchatmessage-44keyii6gq-uc.a.run.app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          historialConversacion: newMessages
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
  const generateCardImage = async (wordObj, e, forceRegenerate = false) => {
    if (e) e.stopPropagation();
    const safeId = getSafeId(wordObj.de).substring(0, 150);
    const userDocRef = user && db ? doc(db, 'artifacts', appId, 'users', user.uid, 'unlockedCards', safeId) : null;
    if (!forceRegenerate) {
      const existingImage = cardImages[safeId];
      if (existingImage) {
        const granted = await showRewardVideo();
        if (!granted) return;
        setUnlockedCards(prev => ({
          ...prev,
          [safeId]: {
            unlocked: true,
            regenerated: false
          }
        }));
        if (userDocRef) {
          try {
            await setDoc(userDocRef, {
              unlocked: true,
              regenerated: false
            }, {
              merge: true
            });
          } catch (error) {
            console.warn(error);
          }
        }
        return;
      }
    } else {
      const currentCount = unlockedCards && unlockedCards[safeId]?.regenerateCount !== undefined ? unlockedCards[safeId].regenerateCount : unlockedCards && unlockedCards[safeId]?.regenerated ? 1 : 0;
      if (currentCount >= 10) {
        alert('Ya has regenerado esta imagen el máximo de veces permitido (10 veces).');
        return;
      }
    }
    const granted = await showRewardVideo();
    if (!granted) return;
    setIsImageLoading(safeId);
    try {
      if (!functions) throw new Error("Firebase functions not initialized");
      const currentCount = unlockedCards && unlockedCards[safeId]?.regenerateCount !== undefined ? unlockedCards[safeId].regenerateCount : unlockedCards && unlockedCards[safeId]?.regenerated ? 1 : 0;
      const newCount = forceRegenerate ? currentCount + 1 : currentCount;
      let conceptoAEnviar = wordObj.en || wordObj.concepto_ingles || "";

      // Paso intermedio de validación: Read-Through Cache
      if (!forceRegenerate && db) {
        try {
          const globalCacheRef = doc(db, 'global_flashcards', safeId);
          const globalCacheSnap = await getDoc(globalCacheRef);
          if (globalCacheSnap.exists()) {
            const cachedData = globalCacheSnap.data();
            const cachedImage = cachedData.imageUrl || cachedData.imageBase64;
            if (cachedImage) {
              console.log("CACHE HIT (Read-Through Cache): Imagen encontrada en global_flashcards para", safeId);
              const compressedImage = await compressImageBase64(cachedImage, 1024, 0.9);
              setCardImages(prev => {
                const nextImages = {
                  ...prev,
                  [safeId]: compressedImage
                };
                localforage.setItem(`img_${safeId}`, compressedImage).catch(e => console.warn(e));
                return nextImages;
              });
              setUnlockedCards(prev => ({
                ...prev,
                [safeId]: {
                  unlocked: true,
                  regenerateCount: currentCount,
                  imageUrl: compressedImage
                }
              }));
              if (userDocRef) {
                await setDoc(userDocRef, {
                  unlocked: true,
                  regenerateCount: currentCount,
                  imageUrl: compressedImage
                }, {
                  merge: true
                }).catch(e => console.warn(e));
              }
              return;
            }
          }
        } catch (cacheErr) {
          console.warn("Advertencia en Read-Through Cache:", cacheErr);
        }
      }
      let dataUri = "";
      console.log("CACHE MISS o FORCE REGENERATE: Llamando a Cloud Function...");
      const generateCardImageFn = httpsCallable(functions, 'generateCardImage');
      const result = await generateCardImageFn({
        wordObj: wordObj,
        conceptoIngles: conceptoAEnviar,
        word: wordObj.de,
        category: activeChapter ? activeChapter.title : ''
      });
      dataUri = result.data?.imageUrl;
      if (!dataUri) throw new Error('No image data returned from FAL API');
      dataUri = await compressImageBase64(dataUri, 1024, 0.9);
      setCardImages(prev => {
        const nextImages = {
          ...prev,
          [safeId]: dataUri
        };
        localforage.setItem(`img_${safeId}`, dataUri).catch(e => console.warn(e));
        return nextImages;
      });
      if (db) {
        try {
          const docRef = doc(db, 'global_flashcards', safeId);
          await setDoc(docRef, {
            imageUrl: dataUri,
            word: wordObj.de,
            regenerateCount: newCount
          }, {
            merge: true
          });
          const strictDocRef = doc(db, 'public_content', 'data', 'flashcardImages', safeId);
          await setDoc(strictDocRef, {
            imageUrl: dataUri,
            word: wordObj.de,
            regenerateCount: newCount
          }, {
            merge: true
          });
        } catch (e) {
          console.warn(e);
        }
      }
      setUnlockedCards(prev => ({
        ...prev,
        [safeId]: {
          unlocked: true,
          regenerateCount: newCount
        }
      }));
      if (userDocRef) {
        await setDoc(userDocRef, {
          unlocked: true,
          regenerateCount: newCount
        }, {
          merge: true
        }).catch(e => console.warn(e));
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error técnico: ' + error.message);
    } finally {
      setIsImageLoading(null);
    }
  };
  const speakText = async (word, e) => {
    if (e) e.stopPropagation();
    const textToSpeak = typeof word === 'string' ? word : word.de;
    nativeSpeak(textToSpeak);
  };
  return <div className={isFullscreen ? "fixed inset-0 z-[9999] bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto" : "min-h-[100svh] bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto relative"}>
      
      {viewMode === "presentation" && activePresentation ? <PresentationViewer
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
      /> : viewMode === "quiz" ? <div className="flex flex-col min-h-[100svh] w-full bg-white overflow-y-auto animate-in fade-in duration-300 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto w-full">
               <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <div>
                   <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                     <Gamepad2 className="text-blue-600" /> Quiz de Vocabulario
                   </h2>
                   <p className="text-slate-500 text-sm mt-1">Prueba tus conocimientos sobre los capítulos seleccionados.</p>
                 </div>
                 
                 <button onClick={() => {
            setViewMode("flashcards");
            setQuizState(null);
            showInterstitial();
          }} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition font-bold shadow-sm self-start sm:self-auto" title="Volver a los módulos">
                   <X size={18} /> Salir del Quiz
                 </button>
               </div>

               <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center">
                 {/* Racha y Puntuación */}
                 <div className="flex justify-center items-center gap-6 mb-8 w-full">
                   <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold shadow-sm">
                     <Flame size={20} className={currentStreak > 0 ? "animate-pulse text-orange-500" : ""} /> Racha: {currentStreak}
                   </div>
                   <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold shadow-sm">
                     <Trophy size={20} /> Mejor: {bestStreak}
                   </div>
                 </div>

                 <h3 className="text-xl font-medium text-slate-500 mb-4 text-center">¿Qué significa esta palabra?</h3>
                 
                 {/* Interfaz de Pregunta (Pronunciación y Audio) */}
                 <div className="w-full max-w-xl flex flex-col items-center justify-center font-black text-slate-800 mb-8 bg-slate-50 border-2 border-slate-100 py-10 px-4 rounded-xl shadow-inner relative group">
                   <span className="text-4xl md:text-5xl">{quizState?.word.de}</span>
                   {quizState?.word.pron && <div className="flex items-center gap-2 mt-3 text-blue-500 italic font-medium text-lg">
                        /{quizState.word.pron}/
                        <button onClick={e => {
                e.stopPropagation();
                nativeSpeak(quizState.word.de);
              }} className="p-1.5 hover:text-blue-600 hover:bg-blue-100 rounded-full transition"><Volume2 size={20} /></button>
                      </div>}
                 </div>
                 
                 <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {quizState?.options.map((opt, i) => {
              let btnClass = "bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700";
              if (quizState.selected) {
                if (opt === quizState.word.es) btnClass = "bg-green-50 border-2 border-green-500 text-green-700 font-bold shadow-sm";else if (opt === quizState.selected) btnClass = "bg-red-50 border-2 border-red-500 text-red-700";else btnClass = "bg-slate-50 border-2 border-slate-100 text-slate-400 opacity-50";
              }
              return <button key={i} onClick={() => handleQuizAnswer(opt)} disabled={!!quizState.selected} className={`py-4 px-6 rounded-xl text-lg transition-all ${btnClass}`}>
                              {opt}
                            </button>;
            })}
                 </div>
                 {quizState?.selected && <div className="mt-8 flex flex-col items-center gap-4 w-full animate-in slide-in-from-bottom-4">
                     <div className={`flex items-center gap-2 text-xl font-bold ${quizState.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                       {quizState.isCorrect ? <CheckCircle size={28} /> : <XCircle size={28} />}
                       {quizState.isCorrect ? "¡Richtig! (¡Correcto!)" : `Falsch. Era: ${quizState.word.es}`}
                     </div>
                     <button onClick={generateNextQuizWord} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition w-full sm:w-auto">
                       Siguiente Palabra ➔
                     </button>
                   </div>}
               </div>
          </div>
        </div> : <>
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
                {/* HAMBURGER + FULLSCREEN ON MOBILE */}
                <div className="flex items-center gap-2 md:hidden">
                  <button onClick={() => setIsMenuOpen(true)} className="bg-slate-800 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-700 transition flex items-center justify-center shadow-sm" aria-label="Abrir menú">
                    <Menu size={20} />
                  </button>
                  <button onClick={toggleFullScreen} className="bg-slate-800 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-700 transition flex items-center justify-center shadow-sm" aria-label="Pantalla completa">
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
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

              {/* HAMBURGER + FULLSCREEN ON DESKTOP */}
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setIsMenuOpen(true)} className="bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-4 py-2 rounded-lg transition flex items-center gap-2 font-bold shadow-md">
                  <Menu size={18} /> Menú
                </button>
                <button onClick={toggleFullScreen} className="bg-slate-800 text-slate-300 hover:text-white border border-slate-700 p-2.5 rounded-lg transition flex items-center justify-center shadow-md">
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>
            </div>
          </header>

          {/* SIDEBAR DRAWER MENÚ DESLIZABLE */}
          {isMenuOpen && <>
              <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-slate-950/60 z-40 transition-opacity animate-in fade-in duration-200" />
              <aside className="fixed inset-y-0 left-0 w-80 bg-slate-900 text-slate-100 z-50 shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-left">
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
                openQuizSetup();
                setIsMenuOpen(false);
              }} className="bg-yellow-600 text-slate-900 py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition flex flex-col items-center justify-center gap-1 text-xs shadow-sm">
                      <Gamepad2 size={18} /> Quiz
                    </button>
                  </div>

                  {/* ACORDEÓN 1: Tablas Maestras */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsTablasOpen(!isTablasOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>📘 Tablas Maestras</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isTablasOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isTablasOpen && <div className="flex flex-col border-t border-slate-800/50 bg-slate-950/20">
                        {chapters.map(chap => <button key={chap.id} onClick={async () => {
                  setActiveChapterId(chap.id);
                  if (viewMode !== 'flashcards' && viewMode !== 'table') setViewMode('flashcards');
                  setIsMenuOpen(false);
                }} className={`w-full text-left pl-8 pr-4 py-2.5 text-xs transition flex items-center gap-2.5 ${activeChapterId === chap.id && (viewMode === 'flashcards' || viewMode === 'table') ? 'bg-blue-900/30 text-blue-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/20'}`}>
                            <span className="text-sm shrink-0">{chap.emoji}</span>
                            <span className="truncate">{chap.title}</span>
                          </button>)}
                      </div>}
                  </div>

                  {/* ACORDEÓN 2: Plan de Estudio */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsPlanOpen(!isPlanOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>🎓 Plan de Estudio</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isPlanOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isPlanOpen && <div className="flex flex-col border-t border-slate-800/50 bg-slate-950/20">
                        {studyPlanModules.map(mod => <button key={mod.id} onClick={() => {
                  setActiveStudyPlanId(mod.id);
                  setViewMode('studyPlan');
                  setIsMenuOpen(false);
                }} className={`w-full text-left pl-8 pr-4 py-2.5 text-xs transition flex items-center gap-2.5 ${activeStudyPlanId === mod.id && viewMode === 'studyPlan' ? 'bg-emerald-900/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/20'}`}>
                            <span className="text-emerald-500 shrink-0"><Sparkles size={14} /></span>
                            <span className="truncate">{mod.title}</span>
                          </button>)}
                      </div>}
                  </div>

                  {/* ACORDEÓN 3: Módulos Goethe */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button onClick={() => setIsGoetheOpen(!isGoetheOpen)} className="w-full flex items-center justify-between p-3 font-bold text-xs text-slate-300 uppercase tracking-wider hover:bg-slate-800/40 transition">
                      <span>🏛️ Módulos Goethe</span>
                      <ChevronRight size={16} className={`transform transition-transform ${isGoetheOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isGoetheOpen && <div className="flex flex-col border-t border-slate-800/50 bg-slate-950/20">
                        {goetheModules.map(pres => <button key={pres.id} onClick={() => {
                  setActivePresentationId(pres.id);
                  setViewMode('presentation');
                  setIsFullscreen(true);
                  setIsMenuOpen(false);
                }} className={`w-full text-left pl-8 pr-4 py-2.5 text-xs transition flex items-center justify-between ${activePresentationId === pres.id && viewMode === 'presentation' ? 'bg-indigo-900/30 text-indigo-300 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/20'}`}>
                            <span className="truncate">{pres.title}</span>
                            <PlayCircle size={14} className="shrink-0" />
                          </button>)}
                      </div>}
                  </div>
                </div>
              </aside>
            </>}

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6 relative">
        
        {/* CONTENT AREA */}
        <section className="flex-1 w-full min-w-0 pb-20 relative">
          
          {/* MODO PRESENTACIÓN VISUAL */}
          {viewMode === "presentation" && activePresentation && <PresentationViewer
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
          />}

          {/* VISTA: CONFIGURACIÓN DEL QUIZ */}
          {viewMode === "quizSetup" && <div className="animate-in fade-in duration-300">
              <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Gamepad2 className="text-blue-600" /> Preparar Quiz
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Selecciona los capítulos que deseas repasar.</p>
                </div>
                
                <button onClick={() => setViewMode("flashcards")} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition font-bold shadow-sm self-start sm:self-auto">
                   <X size={18} /> Salir
                </button>
              </div>

              <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
                <div className="max-h-60 overflow-y-auto custom-scrollbar border border-slate-200 rounded-xl p-2 mb-6 text-left max-w-xl mx-auto">
                  {chapters.map(chap => <label key={chap.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition border-b border-slate-100 last:border-0">
                      <input type="checkbox" checked={selectedQuizChapters.includes(chap.id)} onChange={e => {
                    if (e.target.checked) setSelectedQuizChapters(prev => [...prev, chap.id]);else setSelectedQuizChapters(prev => prev.filter(id => id !== chap.id));
                  }} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-lg">{chap.emoji}</span>
                      <span className="font-medium text-slate-700">{chap.title}</span>
                    </label>)}
                </div>
                <div className="flex justify-center">
                  <button onClick={startQuizSession} disabled={selectedQuizChapters.length === 0} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 disabled:bg-slate-300 transition w-full sm:w-auto">
                    Iniciar Quiz
                  </button>
                </div>
              </div>
          </div>}



          {/* VISTA: SIMULADOR DE ROL (GEMINI API) ✨ */}
          {viewMode === "roleplay" && typeof RoleplaySimulator !== 'undefined' && <RoleplaySimulator onExit={() => setViewMode("flashcards")} />}

          {/* VISTA: COMPRENSIÓN LECTORA IA 📖 */}
          {viewMode === "reading" && <ReadingComprehension onExit={() => setViewMode("flashcards")} />}

          {/* VISTA: PLAN DE ESTUDIO (CLASES MAGISTRALES) */}
          {viewMode === "studyPlan" && activeStudyPlanId && (() => {
            const activeModule = studyPlanModules.find(m => m.id === activeStudyPlanId);
            if (!activeModule) return null;
            const hasSlides = !!activeModule.slides && activeModule.slides.length > 0;
            const slideIndex = hasSlides ? currentStudyPlanSlide >= activeModule.slides.length ? 0 : currentStudyPlanSlide : 0;
            const currentSlide = hasSlides ? activeModule.slides[slideIndex] : null;
            return <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 mb-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-800">{activeModule.title}</h2>
                      <p className="text-emerald-600 font-bold mt-2 flex items-center gap-2 text-sm">
                        <GraduationCap size={18} /> Clase Magistral Oficial
                        {hasSlides && ` • Diapositiva ${slideIndex + 1} de ${activeModule.slides.length}`}
                      </p>
                    </div>
                  </div>
                </div>

                {hasSlides && currentSlide ? <div className="space-y-6">
                    <div className="mb-6 text-center">
                      <h3 className="text-xl md:text-3xl font-bold text-slate-800 mb-2">
                        {currentSlide.title}
                      </h3>
                      {currentSlide.subtitle && <p className="text-slate-500 text-sm font-medium">
                          {currentSlide.subtitle}
                        </p>}
                    </div>
                    <div className="w-full py-4 min-h-[250px]">
                      {typeof currentSlide.content === 'function' ? currentSlide.content({
                    cardImages,
                    generateCardImage,
                    isImageLoading,
                    openAiTutor,
                    setFullscreenImage,
                    unlockedCards
                  }) : currentSlide.content}
                    </div>
                    
                    <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                      <button onClick={() => setCurrentStudyPlanSlide(Math.max(0, slideIndex - 1))} disabled={slideIndex === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 transition">
                        <ChevronLeft size={20} /> Anterior
                      </button>
                      <div className="flex gap-1.5">
                        {activeModule.slides.map((_, idx) => <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === slideIndex ? 'bg-emerald-600 w-6' : 'bg-emerald-100'}`} />)}
                      </div>
                      <button onClick={() => {
                    if (slideIndex < activeModule.slides.length - 1) {
                      setCurrentStudyPlanSlide(slideIndex + 1);
                    }
                  }} disabled={slideIndex === activeModule.slides.length - 1} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-30 transition">
                        Siguiente <ChevronRight size={20} />
                      </button>
                    </div>
                  </div> : <div className="prose prose-slate max-w-none">
                    <MarkdownMessage text={activeModule.content} />
                  </div>}

                {/* BOTÓN PARA VER LA PRESENTACIÓN */}
                {activeModule.presentationUrl && <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center sm:justify-start">
                    <button onClick={async e => {
                  e.preventDefault();
                  const granted = await showRewardVideo();
                  if (granted) {
                    window.open(activeModule.presentationUrl, "_blank");
                  }
                }} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:scale-105">
                      <Presentation size={20} />
                      Abrir Presentación de la Clase
                    </button>
                  </div>}
              </div>;
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
                  const isUnlocked = unlockedCards && unlockedCards[safeId]?.unlocked;
                  const imgBase64 = isUnlocked ? cardImages[safeId] : null;
                  const existsGlobally = !!cardImages[safeId];
                  const isGenLoading = isImageLoading === safeId;
                  const isRegenerated = unlockedCards && unlockedCards[safeId]?.regenerated;
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
                              nativeSpeak(word.de);
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
                  <button onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    if (Capacitor.isNativePlatform()) {
                      try {
                        TextToSpeech.stop();
                      } catch (e) {}
                    }
                    if (window.activeStoryInterval) {
                      clearInterval(window.activeStoryInterval);
                      window.activeStoryInterval = null;
                    }
                    if (window.activeStoryTimeout) {
                      clearTimeout(window.activeStoryTimeout);
                      window.activeStoryTimeout = null;
                    }
                    setIsPlayingStoryAudio(false);
                    setIsStoryAudioPaused(false);
                    setCurrentWordIndex(-1);
                    setStoryState(prev => ({
                      ...prev,
                      isOpen: false
                    }));
                  }} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full"><X size={20} /></button>
                </div>
                {storyState.loading ? <div className="py-12 flex flex-col items-center justify-center gap-3 text-indigo-500 flex-grow">
                    <Loader2 size={40} className="animate-spin" />
                    <p className="font-bold animate-pulse">Imaginando historia mágica...</p>
                  </div> : <div className="space-y-4 flex-grow overflow-hidden flex flex-col">
                    <div className="bg-slate-50 rounded-xl border border-slate-200 relative group transition-all select-none flex-grow overflow-hidden flex flex-col max-h-[280px]">
                      <div className="p-5 overflow-y-auto pb-4 pr-12 cursor-pointer hover:bg-indigo-50/10 flex-grow" onClick={() => speakStory(storyState.de)}>
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
                      <button onClick={() => speakStory(storyState.de)} className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-all ${isPlayingStoryAudio ? 'scale-110 opacity-100' : 'text-indigo-600 opacity-0 group-hover:opacity-100'}`} title={isPlayingStoryAudio ? isStoryAudioPaused ? "Reanudar pronunciación" : "Pausar pronunciación" : "Escuchar cuento"} aria-label={isPlayingStoryAudio ? isStoryAudioPaused ? "Reanudar pronunciación" : "Pausar pronunciación" : "Escuchar cuento"}>
                        {isPlayingStoryAudio ? isStoryAudioPaused ? <Volume2 size={16} className="text-amber-500 animate-pulse" /> : <div className="relative w-4 h-4 flex items-center justify-center">
                              <span className="absolute w-full h-full bg-indigo-400 rounded-full animate-ping opacity-75"></span>
                              <div className="flex gap-0.5">
                                <div className="w-1 h-3 bg-indigo-600 rounded-sm"></div>
                                <div className="w-1 h-3 bg-indigo-600 rounded-sm"></div>
                              </div>
                            </div> : <Volume2 size={16} />}
                      </button>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex-shrink-0">
                      <p className="text-slate-700 italic">{storyState.es}</p>
                    </div>
                  </div>}
              </div>
            </div>}
        </>}
    </section>
  </main>
  </>}

  {/* --- PANEL LATERAL: TUTOR IA --- */}
    {isTutorOpen && <aside className={`fixed ${isTutorFullscreen ? 'inset-0 w-full z-[100]' : 'inset-y-0 right-0 w-full md:w-[450px] z-50 border-l'} bg-white shadow-2xl border-slate-200 flex flex-col animate-in slide-in-from-right duration-300`}>
        
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
          <div className="relative">
            <input type="text" className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition shadow-inner" placeholder="Pregúntame algo en alemán o español..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChatMessage()} />
            <button onClick={sendChatMessage} disabled={!chatInput.trim() || isChatLoading} className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-400 transition shadow">
              <Send size={18} />
            </button>
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
</div>;
}