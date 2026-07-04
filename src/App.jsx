import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, BookOpen, Car, Home, Coffee, ShoppingCart, Activity, Briefcase, Heart, Clock, Mail, CheckCircle, XCircle, List, LayoutGrid, Gamepad2, GraduationCap, Link2, MessageCircle, Bot, ImagePlus, Volume2, X, Send, Loader2, Maximize, Minimize, Star as Sparkles, Monitor as Presentation, ChevronRight, ChevronLeft, PlayCircle, Mic, Edit as Edit3, Headphones, RefreshCw, Flame, Trophy } from 'lucide-react';
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
import { chapters } from './data/chapters';

import { fetchWithRetry, compressImageBase64 as compressImage, nativeSpeak, getSafeId } from './utils/helpers';
import EmailSimulator from './components/EmailSimulator';


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
  }];
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);
  const startScenario = async scen => {
    setScenario(scen);
    setLoading(true);
    try {
      if (!functions) throw new Error("Firebase functions not initialized");
      const runRoleplayFn = httpsCallable(functions, 'runRoleplaySimulator');
      const response = await runRoleplayFn({
        historialConversacion: [{
          role: 'user',
          parts: [{
            text: "Hola, inicia la simulación según las instrucciones."
          }]
        }],
        escenario: scen.prompt
      });
      const text = response.data.text;
      setMessages([{
        role: 'model',
        parts: [{
          text
        }]
      }]);
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
      if (!functions) throw new Error("Firebase functions not initialized");
      const runRoleplayFn = httpsCallable(functions, 'runRoleplaySimulator');
      const response = await runRoleplayFn({
        historialConversacion: newMsgs,
        escenario: scenario.prompt
      });
      const text = response.data.text;
      setMessages([...newMsgs, {
        role: 'model',
        parts: [{
          text
        }]
      }]);
    } catch (e) {
      console.error(e);
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
  return <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col h-[70vh] max-w-3xl mx-auto mt-6 overflow-hidden animate-in slide-in-from-bottom-4">
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

// --- DATA: EL VOCABULARIO COMPLETO ---

// --- NUEVOS MÓDULOS DE ESTUDIO GOETHE ---
const goetheModules = [{
  id: 'g_horen',
  title: 'Hören (Comprensión Auditiva)',
  desc: 'Supervivencia en estaciones y llamadas',
  theme: 'blueprint',
  presentationUrl: 'https://drive.google.com/file/d/1HaRoaGMXPAHwQbmeVkqMoaotGvM5TjBH/view?usp=sharing',
  slides: [{
    title: "Supervivencia Auditiva: El Examen Hören",
    subtitle: "Entrena tu oído para identificar información clave",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-500 shadow-lg relative">
              <Headphones size={64} className="text-blue-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">El objetivo es identificar información clave (precios, andenes, horas) en medio del ruido de conversaciones, altavoces de estaciones y mensajes de voz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">Alltagssituationen<br />(Situaciones cotidianas)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Öffentliche Durchsagen<br />(Anuncios públicos)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Telefonansagen<br />(Mensajes telefónicos)</span>
              </div>
            </div>
          </div>
  }, {
    title: "Kit de Vocabulario Auditivo",
    subtitle: "Si escuchas estas palabras, la respuesta está cerca",
    content: props => <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{
        de: "die Durchsage",
        es: "El anuncio por altavoz",
        type: "Sustantivo",
        emoji: "📢"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Gleis",
        es: "El andén (del tren)",
        type: "Sustantivo",
        emoji: "🚉"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Verspätung",
        es: "El retraso",
        type: "Sustantivo",
        emoji: "⏳"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Angebot",
        es: "La oferta",
        type: "Sustantivo",
        emoji: "🏷️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Nachricht",
        es: "El mensaje",
        type: "Sustantivo",
        emoji: "💬"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "zurück|rufen",
        es: "Devolver la llamada",
        type: "Verbo",
        emoji: "📞"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "aus|steigen",
        es: "Bajarse",
        type: "Verbo",
        emoji: "🚪"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "Achtung!",
        es: "¡Atención! / ¡Cuidado!",
        type: "Interjección",
        emoji: "⚠️"
      }} {...props} />
          </div>
  }, {
    title: "Gramática para el Oído",
    subtitle: "La pista de aterrizaje de la información",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="A. El Imperativo Encubierto (Infinitivo al final)">
              <p>En los anuncios públicos (Teil 2), en lugar de conjugar el imperativo formal, suelen usar el verbo en <strong>infinitivo al final</strong> para dar instrucciones generales.</p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li><strong>Bitte die Türen schließen!</strong> (¡Por favor, cerrar las puertas!)</li>
                <li><strong>Bitte nicht einsteigen!</strong> (¡Por favor, no subir!)</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="B. Números, Horas y Días (Sospechosos habituales)">
              <p>El 80% de las preguntas de opción múltiple te pondrán a dudar entre tres números. Presta atención a las preposiciones:</p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li><strong>um</strong> (a las...) ➡️ <em>um 8 Uhr</em> (hora exacta del evento).</li>
                <li><strong>von... bis...</strong> (de... a...) ➡️ horarios de atención.</li>
                <li><strong>ab</strong> (a partir de...) ➡️ <em>ab 14 Uhr</em> (desde las 2 pm).</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="C. El conector 'aber' (El engaño clásico)">
              <p>Te van a mencionar una de las opciones falsas primero, y luego usarán <strong>aber</strong> (pero) o <strong>leider</strong> (lamentablemente) para darte la respuesta real.</p>
              <div className="bg-red-50 text-red-800 p-3 rounded mt-2 border border-red-100">
                Audio: "Ich wollte um 3 Uhr kommen, <strong>aber</strong> mein Auto ist kaputt. Ich komme um 4 Uhr."<br />
                <em>Respuesta real: A las 4.</em>
              </div>
            </GrammarAccordion>
          </div>
  }, {
    title: "Simulador de Escenarios",
    subtitle: "Aplica la 'Regla del Pescador'",
    content: <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
              <p className="font-bold text-yellow-800">💡 La Regla del Pescador</p>
              <p className="text-sm text-yellow-700 mt-1">No intentes atrapar toda el agua del río traduciendo cada palabra. Lee la pregunta primero, cierra los ojos, ignora el relleno y "pesca" solo el dato (precio, hora, lugar).</p>
            </div>
            <AudioSim title="Escenario 1: Anuncio de tráfico (Teil 2)" textDe="Achtung Autofahrer! Auf der Autobahn gibt es einen Stau. Bitte fahren Sie langsam und nutzen Sie das Reißverschlusssystem." textEs="¡Atención conductores! Hay un atasco en la autopista. Por favor, conduzcan despacio y utilicen el sistema de cremallera." />
            <AudioSim title="Escenario 2: Mensaje de voz (Teil 3)" textDe="Hallo, hier ist der IT-Service. Dein Computer ist repariert. Du kannst ihn morgen ab 9 Uhr abholen. Bitte ruf uns nicht zurück." textEs="Hola, aquí el servicio técnico. Tu ordenador está reparado. Puedes recogerlo mañana a partir de las 9. Por favor, no nos devuelvas la llamada." />
            <AudioSim title="Escenario 3: Conversación en tienda (Teil 1)" textDe="Entschuldigung, was kostet diese Software? – Normalerweise 50 Euro, aber heute ist sie im Angebot für 20 Euro." textEs="Disculpe, ¿cuánto cuesta este software? - Normalmente 50 euros, pero hoy está en oferta por 20 euros." />
          </div>
  }]
}, {
  id: 'g_lesen',
  title: 'Lesen (Comprensión Lectora)',
  desc: 'Textos del día a día y letreros',
  theme: 'notebook',
  presentationUrl: 'https://drive.google.com/file/d/1v0X84LxezwiLTIOll5OqIs5VfY6khT5Z/view?usp=sharing',
  slides: [{
    title: "Entendiendo Textos Diarios",
    subtitle: "El Examen Lesen (Comprensión Lectora)",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-300 shadow-md">
              <BookOpen size={64} className="text-amber-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Prepárate para leer correos informales, comparar ofertas web y decodificar los estrictos letreros públicos alemanes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">E-Mails und Einladungen<br />(Correos e invitaciones)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Webseiten und Anzeigen<br />(Webs y anuncios)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Schilder und Regeln<br />(Letreros y normas)</span>
              </div>
            </div>
          </div>
  }, {
    title: "El Kit de Lupa (Vocabulario)",
    subtitle: "Indicadores clave en textos escritos",
    content: props => <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{
        de: "die Einladung",
        es: "La invitación",
        type: "Sustantivo",
        emoji: "✉️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Angebot",
        es: "La oferta",
        type: "Sustantivo",
        emoji: "🏷️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Schild",
        es: "El letrero / señal",
        type: "Sustantivo",
        emoji: "🪧"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "Öffnungszeiten",
        es: "Horarios de apertura",
        type: "Plural",
        emoji: "🕒"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "buchen",
        es: "Reservar",
        type: "Verbo",
        emoji: "📅"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "ein|laden",
        es: "Invitar",
        type: "Verbo",
        emoji: "👋"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "geöffnet / geschlossen",
        es: "Abierto / Cerrado",
        type: "Adjetivos",
        emoji: "🚪"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "verboten / erlaubt",
        es: "Prohibido / Permitido",
        type: "Adjetivos",
        emoji: "🚫"
      }} {...props} />
          </div>
  }, {
    title: "Patrones Visuales",
    subtitle: "Gramática para los ojos",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="A. Palabras Compuestas (Komposita)">
              <p>El alemán pega las palabras en lugar de usar preposiciones. <strong>La palabra principal siempre es la última.</strong></p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li>Sprache + Schule = <strong>die Sprachschule</strong> (Escuela de idiomas).</li>
                <li>Kinder + Kleidung = <strong>die Kinderkleidung</strong> (Ropa de niños).</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="B. Fórmulas de Correo (Teil 1)">
              <p>Detecta el tono inmediatamente:</p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li><strong>Informal:</strong> Empieza con <em>Hallo / Liebe(r)</em>. Termina con <em>Viele Grüße</em>.</li>
                <li><strong>Formal:</strong> Empieza con <em>Sehr geehrte(r)</em>. Termina con <em>Mit freundlichen Grüßen</em>.</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="C. Gramática 'Telegráfica' (Teil 3)">
              <p>Los carteles casi no usan verbos conjugados, usan <strong>infinitivos o participios</strong> secos.</p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li><em>En vez de "No puede aparcar":</em> <strong>Parken verboten</strong> (Aparcar prohibido).</li>
                <li><em>En vez de "Mantenga cerrado":</em> <strong>Tür bitte geschlossen halten</strong>.</li>
              </ul>
            </GrammarAccordion>
          </div>
  }, {
    title: "El Juego de los Espejos",
    subtitle: "Dominando los antónimos en las opciones (A, B, C)",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="La trampa clásica del Goethe-Institut">
              <p>Los textos o audios suelen usar un adjetivo negativo, pero la respuesta correcta usa su <strong>antónimo en positivo</strong>.</p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li>Si el texto dice: <em>"Das Hotel ist nicht teuer"</em> ➡️ Busca la opción: <strong>billig / günstig</strong>.</li>
                <li>Si el anuncio dice: <em>"Das Zimmer ist nicht dunkel"</em> ➡️ Busca la opción: <strong>hell</strong>.</li>
                <li>Si dice: <em>"Die Maschine ist nicht neu"</em> ➡️ Busca la opción: <strong>alt</strong>.</li>
              </ul>
            </GrammarAccordion>
          </div>
  }, {
    title: "La Regla del Tren",
    subtitle: "Lee textos complejos de derecha a izquierda",
    content: <div className="mt-6 max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-full bg-slate-800 p-6 rounded-xl text-center text-white mb-6 shadow-lg">
              <p className="text-xl font-mono tracking-wider mb-4">Fahr + Plan + <span className="text-amber-400 font-bold border-b-2 border-amber-400 pb-1">Auskunft</span></p>
              <p className="text-sm text-slate-300">Viaje + Plan + <strong className="text-amber-400">Información</strong></p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg w-full">
              <p className="font-bold text-amber-800">💡 La Regla del Tren de Palabras</p>
              <p className="text-sm text-amber-700 mt-1">El último vagón (la derecha) te dice QUÉ es el objeto. Los vagones de la izquierda solo lo describen. ¡Aplica esto cuando veas palabras gigantes!</p>
            </div>
          </div>
  }]
}, {
  id: 'g_schreiben',
  title: 'Schreiben (Expresión Escrita)',
  desc: 'Formularios y Correos exactos',
  theme: 'medical',
  presentationUrl: 'https://drive.google.com/file/d/19bbbF3M4RfIRbQ4PkxZlCsPcbibYQLPx/view?usp=sharing',
  slides: [{
    title: "Tu Firma y tu Voz",
    subtitle: "El Examen Schreiben (Escritura)",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-300 shadow-md">
              <Edit3 size={64} className="text-emerald-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Aprende la burocracia de los formularios y la estructura quirúrgica para escribir correos perfectos sin complicarte.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-emerald-600 block text-lg">Teil 1</span>
                <span className="text-slate-600">Formulare ausfüllen<br />(Rellenar formularios)</span>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-emerald-600 block text-lg">Teil 2</span>
                <span className="text-slate-600">Eine E-Mail schreiben<br />(Redactar correos)</span>
              </div>
            </div>
          </div>
  }, {
    title: "El Idioma de la Burocracia",
    subtitle: "Vocabulario obligatorio para formularios",
    content: props => <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{
        de: "das Formular",
        es: "El impreso / formulario",
        type: "Sustantivo",
        emoji: "📝"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Vorname",
        es: "El nombre de pila",
        type: "Sustantivo",
        emoji: "👤"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Nachname / Familienname",
        es: "El apellido",
        type: "Sustantivo",
        emoji: "👥"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Straße",
        es: "La calle",
        type: "Sustantivo",
        emoji: "🛣️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Hausnummer",
        es: "El número de casa",
        type: "Sustantivo",
        emoji: "🔢"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Postleitzahl (PLZ)",
        es: "El código postal",
        type: "Sustantivo",
        emoji: "📮"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Wohnort",
        es: "Lugar de residencia",
        type: "Sustantivo",
        emoji: "🏠"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Geburtsdatum",
        es: "Fecha de nacimiento",
        type: "Sustantivo",
        emoji: "🎂"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Geburtsort",
        es: "Lugar de nacimiento",
        type: "Sustantivo",
        emoji: "🏥"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Alter",
        es: "La edad",
        type: "Sustantivo",
        emoji: "⏳"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Staatsangehörigkeit",
        es: "Nacionalidad",
        type: "Sustantivo",
        emoji: "🌍"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Beruf",
        es: "Profesión",
        type: "Sustantivo",
        emoji: "💼"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Telefonnummer",
        es: "Número de teléfono",
        type: "Sustantivo",
        emoji: "📱"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die E-Mail-Adresse",
        es: "Correo electrónico",
        type: "Sustantivo",
        emoji: "📧"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Anzahl der Personen",
        es: "Número de personas",
        type: "Frase",
        emoji: "🔢"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Unterschrift",
        es: "La firma",
        type: "Sustantivo",
        emoji: "✍️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "Barzahlung",
        es: "Pago en efectivo",
        type: "Sustantivo",
        emoji: "💶"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "mit Karte zahlen",
        es: "Pago con tarjeta",
        type: "Frase",
        emoji: "💳"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "weiblich / männlich / divers",
        es: "Femenino/Masculino/Diverso",
        type: "Adjetivos",
        emoji: "🚻"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "ledig / verheiratet",
        es: "Soltero / Casado",
        type: "Adjetivos",
        emoji: "💍"
      }} {...props} />
          </div>
  }, {
    title: "Caja de Herramientas (Redemittel)",
    subtitle: "Frases comodín para salvar el examen",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="1. Saludos (Anrede)">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Formal Masculino:</strong> Sehr geehrter Herr [Apellido],</li>
                <li><strong>Formal Femenino:</strong> Sehr geehrte Frau [Apellido],</li>
                <li><strong>Informal Masculino:</strong> Lieber [Nombre],</li>
                <li><strong>Informal Femenino:</strong> Liebe [Nombre],</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="2. Despedidas (Gruß)">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Formal:</strong> Mit freundlichen Grüßen</li>
                <li><strong>Informal:</strong> Viele Grüße <em>(o)</em> Liebe Grüße</li>
              </ul>
              <p className="text-sm text-emerald-600 mt-2 font-bold">¡Recuerda! Ninguna lleva coma al final.</p>
            </GrammarAccordion>
            <GrammarAccordion title="3. Frases Comodín (Universales)">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Para excusarse:</strong> Es tut mir leid, aber... (Lo siento, pero...)</li>
                <li><strong>Para proponer:</strong> Ich habe eine ID... (Tengo una idea...)</li>
                <li><strong>Para agradecer:</strong> Vielen Dank für die Einladung! (Muchas gracias por la invitación)</li>
                <li><strong>Para pedir algo:</strong> Ich brauche bitte Informationen über... (Necesito por favor información sobre...)</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="4. El Doble Juego de las Preposiciones de Lugar">
              <p>Para indicar destinos o cancelaciones viales por daños, usa la preposición correcta:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Estático (Dativo - Dónde estoy):</strong> <em>Ich stehe im Stau</em> (Estoy en el trancón) / <em>Ich bin auf der Post</em> (Estoy en el correo).</li>
                <li><strong>Movimiento (Acusativo - Hacia dónde voy):</strong> <em>Ich muss mein Auto in die Werkstatt bringen</em> (Debo llevar mi carro al taller).</li>
              </ul>
            </GrammarAccordion>
          </div>
  }, {
    title: "La Regla Simple y Seguro",
    subtitle: "Simulador de Redacción",
    content: <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 rounded-r-lg">
              <p className="font-bold text-emerald-800">💡 Escribe 3 oraciones cortas</p>
              <p className="text-sm text-emerald-700 mt-1">No te compliques. El examen pide 3 puntos. Escribe una oración exacta para cada punto con el verbo en Posición 2. Menos es más.</p>
            </div>
            
            <EmailSimulator initialText="" />
          </div>
  }]
}, {
  id: 'g_sprechen',
  title: 'Sprechen (Expresión Oral)',
  desc: 'Presentaciones y Peticiones Educadas',
  theme: 'blueprint',
  presentationUrl: 'https://drive.google.com/file/d/1_yvgsDvmHvQvSYoXJvKImN9WLxkEdgGA/view?usp=sharing',
  slides: [{
    title: "Guía Maestra: El Examen Oral",
    subtitle: "Sprechen A1/A2",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-indigo-500 shadow-lg relative">
              <Mic size={64} className="text-indigo-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Aprende a presentarte con fluidez, a formular preguntas directas con tarjetas y a pedir favores usando la fórmula mágica de cortesía.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">Sich vorstellen<br />(Presentación personal)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Fragen und Antworten<br />(Tarjetas de temas)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Bitten formulieren<br />(Peticiones de cortesía)</span>
              </div>
            </div>
          </div>
  }, {
    title: "Gramática Visual para Hablar",
    subtitle: "Estructuras sin margen de error",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="1. W-Fragen (Preguntas Abiertas)">
              <p>Buscan información específica. <strong>El verbo siempre va en posición 2.</strong></p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li><strong>Wer?</strong> (¿Quién?) ➡️ <em>Wer bist du?</em></li>
                <li><strong>Wie?</strong> (¿Cómo?) ➡️ <em>Wie heißt du?</em></li>
                <li><strong>Was?</strong> (¿Qué?) ➡️ <em>Was machst du?</em></li>
                <li><strong>Wann?</strong> (¿Cuándo?) ➡️ <em>Wann kommst du?</em></li>
                <li><strong>Wo / Woher / Wohin?</strong> (¿Dónde / De dónde / A dónde?)</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="2. Ja/Nein-Fragen (Cerradas)">
              <p>Si respondes con Sí o No, <strong>el verbo salta a la Posición 1.</strong></p>
              <div className="bg-slate-100 p-3 rounded font-mono font-bold text-center mt-2 border border-slate-300 text-lg">
                <span className="text-indigo-600">Trinkst [1]</span> du [2] am Wochenende Bier?
              </div>
            </GrammarAccordion>
            <GrammarAccordion title="3. El Sándwich de Petición (Imperativo Suave)">
              <p>Para la Parte 3, usa esta plantilla exacta para pedir objetos con cortesía:</p>
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl mt-2 text-center text-sm font-bold shadow-sm">
                <span className="text-indigo-600 text-lg block mb-1">Können Sie mir bitte...</span>
                <span className="text-orange-500 text-xl block mb-1">[el objeto en Acusativo]</span>
                <span className="text-emerald-600 text-lg block">...geben?</span>
              </div>
            </GrammarAccordion>
            <GrammarAccordion title="4. El Truco de la Ingeniería Sintáctica: Evita Declinar">
              <p>Bajo presión en el examen A1, declinar adjetivos antes del sustantivo genera muchos errores. <strong>Separa el adjetivo usando el verbo 'sein'.</strong></p>
              <div className="bg-red-50 text-red-800 p-3 rounded mt-2 border border-red-100 line-through">
                Peligroso: Ich brauche einen großen Tisch. (Exige declinación Akk).
              </div>
              <div className="bg-green-50 text-green-800 p-3 rounded mt-2 border border-green-200 font-bold">
                Inteligente: Ich brauche einen Tisch. Der Tisch ist groß. (El adjetivo queda intacto).
              </div>
            </GrammarAccordion>
          </div>
  }, {
    title: "Simulador: Teil 1 (Presentación)",
    subtitle: "Sich vorstellen (Toca el altavoz para escuchar)",
    content: <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm text-slate-800">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <Bot size={32} className="text-indigo-600 bg-indigo-50 p-1.5 rounded-full" />
                <p className="font-bold text-slate-700">Examinador: Bitte stellen Sie sich vor.</p>
                <button onClick={() => nativeSpeak("Bitte stellen Sie sich vor.")} className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-full transition ml-auto"><Volume2 size={20} /></button>
              </div>
              
              <div className="space-y-3 pl-2">
                {[{
            de: "Ich heiße Marcos.",
            es: "Me llamo Marcos."
          }, {
            de: "Ich bin 35 Jahre alt.",
            es: "Tengo 35 años."
          }, {
            de: "Ich komme aus Kolumbien und ich wohne in Barranquilla.",
            es: "Vengo de Colombia y vivo en Barranquilla."
          }, {
            de: "Ich spreche Spanisch und ein bisschen Deutsch.",
            es: "Hablo español y un poco de alemán."
          }, {
            de: "Ich bin Elektroniker von Beruf.",
            es: "Soy técnico electrónico de profesión."
          }, {
            de: "Meine Hobbys sind Lesen und Sport machen.",
            es: "Mis pasatiempos son leer y hacer deporte."
          }].map((item, i) => <div key={i} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg hover:bg-slate-100 transition">
                    <button onClick={() => nativeSpeak(item.de)} className="text-slate-400 hover:text-indigo-600 transition"><PlayCircle size={18} /></button>
                    <div>
                      <p className="font-bold text-slate-800">{item.de}</p>
                      <p className="text-xs text-slate-500">{item.es}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
  }, {
    title: "Simulador: Teil 2 & 3",
    subtitle: "Intercambios y Peticiones Reales",
    content: <div className="mt-6 max-w-3xl mx-auto">
            <h3 className="font-bold text-slate-700 mb-3">Teil 2: Intercambio de Información</h3>
            <InteractiveQA question="Trinkst du am Wochenende Bier?" answer="Ja, ich trinke gern ein Bier am Samstag." note="Tema: Comida | Tarjeta: Cerveza (Bier)" />
            <InteractiveQA question="Wo kaufst du deine Schuhe?" answer="Ich kaufe meine Schuhe im Supermarkt." note="Tema: Compras | Tarjeta: Zapatos (Schuhe) -> Usamos W-Frage (Wo)" />

            <h3 className="font-bold text-slate-700 mt-8 mb-3">Teil 3: Peticiones de Cortesía</h3>
            <InteractiveQA question="Können Sie mir bitte das Deutschbuch geben?" answer="Ja, klar! Hier ist es." note="Imagen en la tarjeta: Un libro de alemán (das Buch)" />
            <InteractiveQA question="Kannst du mir bitte einen Apfel geben?" answer="Natürlich, bitte sehr!" note="Imagen en la tarjeta: Una manzana (der Apfel). Recuerda que es masculino, por eso usamos 'einen'." />
          </div>
  }]
}];

// --- NUEVO: PLAN DE ESTUDIOS (CLASES MAGISTRALES) ---
const studyPlanModules = [{
  id: 'sp_1',
  title: 'Capítulo 1: Los Cimientos y Primeros Pasos',
  content: `### Capítulo 1: Los Cimientos y Primeros Pasos\n\nEl idioma alemán funciona como un sistema modular de bloques. La regla absoluta y más importante para comenzar es la **Regla de Oro de la Posición 2**.\n\n> **👑 La Regla de Oro:** ¡El verbo conjugado es el rey inamovible de la Posición 2! No importa qué pongas al principio, el verbo exige el segundo lugar lógico.\n\n| Posición 1 (Sujeto) | Posición 2 (Verbo) | Posición 3 (Resto) |\n|---|---|---|\n| Ich | wohne | in Madrid. |\n\n### ⚙️ El Motor de Conjugación\nPara conjugar, tomamos la raíz del verbo (ej. *komm-*) y añadimos la terminación según el actor:\n\n| Actor | Terminación | Ejemplo (kommen) | sein (Ser) | haben (Tener) |\n|---|---|---|---|---|\n| **ich** | -e | komme | bin | habe |\n| **du** | -st | kommst | bist | hast |\n| **er/sie/es** | -t | kommt | ist | hat |\n| **wir** | -en | kommen | sind | haben |\n| **ihr** | -t | kommt | seid | habt |\n| **sie/Sie** | -en | kommen | sind | haben |\n\n### ❓ La Matriz de Preguntas\n* **W-Fragen (Abiertas):** La palabra W (*Wer, Wie, Woher, Was, Wo*) ocupa la Posición 1. El verbo sigue en la 2. Sujeto a la 3. 👉 *Wo wohnst du?*\n* **Ja/Nein-Fragen (Cerradas):** El verbo salta a la Posición 1 para llamar la atención. 👉 *Wohnst du in Berlin?*`,
  presentationUrl: 'https://drive.google.com/file/d/1D1x2fDb33331RzgNbJupn8jg-MpjiAzA/view?usp=drive_web'
}, {
  id: 'sp_2',
  title: 'Capítulo 2: Mi Círculo, Géneros y Negación',
  content: `### Capítulo 2: Mi Círculo, Géneros y Negación\n\nEl alemán clasifica todo en tres géneros. No intentes buscarles lógica con el español, ¡aprende el "color" de la palabra!\n\n| Masculino | Femenino | Neutro | Plural |\n|---|---|---|---|\n| der (el) | die (la) | das (lo) | die (los/las) |\n| ein (un) | eine (una) | ein (un) | - (unos no existe) |\n\n### 🔑 La Matriz de Posesivos\nTodos los posesivos (*mein*=mi, *dein*=tu, *sein*=su) funcionan exactamente igual que *ein*. **Añade una "-e" al final si la palabra es femenina o plural.**\nEjemplo: *mein Vater* (Masc) vs. *mein**e** Mutter* (Fem) vs. *mein**e** Eltern* (Plural).\n\n> **🚫 La Negación:**\n> * Para negar verbos/acciones usa **nicht**: *Ich tanze nicht.*\n> * Para negar sustantivos usa **kein / keine** ("el asesino de ein"): *Ich habe keine Kinder.*`,
  presentationUrl: 'https://drive.google.com/file/d/1ydPXeoc5VGUyyP2C-_eBo7e0RB-CTTGS/view?usp=drive_web'
}, {
  id: 'sp_3',
  title: 'Capítulo 3: El Misterioso Caso Acusativo',
  content: `### Capítulo 3: El Misterioso Caso Acusativo\n\nEl Acusativo es la "víctima" o el Objeto Directo de una acción. Responde a *¿Qué compras?* o *¿A quién buscas?*\n\n> **🎯 La Regla de Oro del Acusativo:** Al Acusativo solo le importan los masculinos. Deja exactamente igual al femenino, al neutro y al plural. ¡Solo ataca a las palabras masculinas poniéndoles la terminación **-en**!\n\n| Género | Nominativo (Sujeto) | Acusativo (Objeto Directo) |\n|---|---|---|\n| **Masculino** | der, ein, kein, mein | **den, einen, keinen, meinen** |\n| **Femenino** | die, eine, keine | die, eine, keine |\n| **Neutro** | das, ein, kein | das, ein, kein |\n| **Plural** | die, meine, keine | die, meine, keine |\n\n**Verbos activadores:** *kaufen, brauchen, essen, trinken, haben, möchten*.\nEjemplo: *Ich kaufe **einen** Käse (masculino) und eine Tomate (femenino).*`,
  presentationUrl: 'https://drive.google.com/file/d/1QusIBIw3hhDxZvtnB3eocWlPWW43dlIp/view?usp=drive_web'
}, {
  id: 'sp_4',
  title: 'Capítulo 4: Rutina y Verbos Separables',
  content: `### Capítulo 4: Rutina y Verbos Separables\n\nLos *Trennbare Verben* (Verbos Separables) son acciones que se parten en dos pedazos exactos al conjugarse en presente.\n\n> **🗜️ El Efecto Pinza (Die Satzklammer):** El motor (la raíz del verbo) se queda en la Posición 2, pero el prefijo se desconecta y actúa como un tapón que cierra la tubería al **final absoluto** de la oración.\n\nEjemplo con *aufstehen* (levantarse):\n👉 Ich **stehe** am Montag um 7 Uhr **auf**.\n\n### ⏱️ Regla TeKaMoLo (Tiempo antes de Lugar)\nEn la "cinta transportadora" de la frase, el bloque de TIEMPO siempre va antes que el bloque de LUGAR.\n✅ *Ich gehe **heute** ins Kino.*\n❌ *Ich gehe ins Kino heute.*\n\n*Embudo de tiempo:* **im** (Meses/Estaciones), **am** (Días), **um** (Horas exactas).`,
  presentationUrl: 'https://drive.google.com/file/d/1s4MSGKeK7xVZF2qGN4JSXu5dl43VkhOC/view?usp=drive_web'
}, {
  id: 'sp_5',
  title: 'Capítulo 5: Darle actitud - Verbos Modales',
  content: `### Capítulo 5: Darle actitud - Verbos Modales\n\nLos verbos modales le dan sabor e intención (habilidad, obligación, permiso, deseo) a tus acciones.\n\n| Verbo | Intención | Forma Rebelde (ich/er/sie) | Ejemplo |\n|---|---|---|---|\n| **können** | Habilidad / Saber hacer | kann | Ich kann sehr gut schwimmen. |\n| **müssen** | Obligación Absoluta | muss | Wir müssen arbeiten. |\n| **dürfen** | Permiso / Reglas | darf | Man darf hier nicht rauchen. |\n| **wollen** | Voluntad Fuerte | will | Er will das machen. |\n| **sollen** | Consejo / Encargo | soll | Du sollst die Arbeit machen. |\n| **möchten** | Deseo Educado | möchte | Ich möchte eine Katze haben. |\n\n> **🥪 El Sándwich Verbal:** El verbo Modal se sienta en el trono de la Posición 2. La Acción Real es empujada al abismo, al final absoluto de la frase, congelada en su forma original (Infinitivo en -en).\n\n**La Conjugación Rebelde:** En los modales, "ich" (yo) y "er/sie/es" son gemelos idénticos. No llevan terminación. (*ich kann, er kann*).`,
  presentationUrl: 'https://drive.google.com/file/d/12ef-35y8c5SaFbw4v1xIZX74-5E8mX6c/view?usp=drive_web'
}, {
  id: 'sp_6',
  title: 'Capítulo 6: Descifrando el Dativo',
  content: `### Capítulo 6: Descifrando el Dativo\n\nEl Dativo es el traje especial para el "Receptor" de una acción (el Objeto Indirecto).\n\n> **🔑 El Código M-R-M-N:** Los artículos cambian completamente. Memoriza estas 4 letras finales:\n> * Masc: de**m** | Fem: de**r** | Neutro: de**m** | Plural: de**n** (+n al sustantivo)\n\n### El Embudo de Preposiciones Exigentes\nSi ves una de estas preposiciones, la palabra que sigue entra automáticamente en Dativo:\n**mit** (con), **nach** (hacia), **aus** (de adentro), **zu** (hacia), **von** (de), **bei** (en casa de), **seit** (desde), **ab** (a partir de).\n\nEjemplo: *Ich fahre **mit dem** Zug.* (Voy con el tren).\nPronombres en Dativo: *mir* (a mí), *dir* (a ti), *ihm* (a él), *ihr* (a ella).`,
  presentationUrl: 'https://drive.google.com/file/d/1n_dLlwAlx9mJMoytcMC4wV3TjNCb59-r/view?usp=drive_web'
}, {
  id: 'sp_7',
  title: 'Capítulo 7: Das Perfekt (El Pasado)',
  content: `### Capítulo 7: Das Perfekt (El Pasado)\n\nPara contar anécdotas o hablar de vacaciones, usamos Das Perfekt. Es un rompecabezas mecánico de dos pilares.\n\n| Sujeto | Ayudante (Pos 2) | Relleno | El Participio (Final) |\n|---|---|---|---|\n| Ich | habe | eine Pizza | gekauft. |\n\n### ¿Haben o Sein?\n* **Haben (90%):** El Ancla. Acciones estáticas (comer, leer, trabajar). *Ich habe gelesen.*\n* **Sein (10%):** La Flecha. Desplazamiento (A → B) o cambio de estado. *Ich bin nach Berlin geflogen.*\n\n> **⏩ El Atajo Práctico (Präteritum):** Para "tener" y "ser", no uses el Perfekt, usa el atajo.\n> * haben → **hatte** (tuve/tenía)\n> * sein → **war** (fui/estaba)\n> ¡Van solos en Posición 2 sin participio final!`,
  presentationUrl: 'https://drive.google.com/file/d/1rWmyyVBBceZm2lzbaNY8Luuvv5X6vgfU/view?usp=drive_web'
}, {
  id: 'sp_8',
  title: 'Capítulo 8: Kit Médica (Imperativo)',
  content: `### Capítulo 8: Kit de Supervivencia Médica (Imperativo)\n\nPara dar órdenes directas, recetas o consejos, usamos el Imperativo. Es eficiente y no pierde el tiempo.\n\n| Tú (du) informal | Ustedes (ihr) plural | Usted (Sie) formal |\n|---|---|---|\n| **Komm!** | **Kommt!** | **Kommen Sie!** |\n| *(Se elimina 'du' y la 'st')* | *(Solo elimina 'ihr')* | *(Verbo completo + Sie)* |\n\n**Excepciones Críticas:**\n* *sprechen* → **Sprich!** (cambio vocálico).\n* *fahren* → **Fahr!** (pierde la diéresis).\n* *sein* → **Sei!** (completamente irregular).\n\n**El Verbo 'Sollen':** Se usa para consejos a largo plazo o transmitir lo que dijo el doctor. *"Du sollst viel Wasser trinken."*`,
  presentationUrl: 'https://drive.google.com/file/d/1hvauciZnzhQPR7Jcvlhktq7VRdc_Xvrq/view?usp=drive_web'
}, {
  id: 'sp_9',
  title: 'Capítulo 9: Uniendo Ideas (Fantasma Cero)',
  content: `### Capítulo 9: Uniendo Ideas (Fantasma Cero)\n\n¿Cómo unimos dos frases fluidamente sin romper la regla de hierro de que el verbo va en la Posición 2?\n\n> **👻 Los Conectores Fantasma Cero (ADUSO):** Operan como bisagras externas. Son invisibles para el conteo. La nueva frase empieza a contar desde 1, dejando al verbo a salvo en la Posición 2.\n\n* **A**ber (pero) - Contraste.\n* **D**enn (porque) - Razón.\n* **U**nd (y) - Adición.\n* **S**ondern (sino) - Corrección tras un *nicht/kein*.\n* **O**der (o) - Alternativa.\n\n| Frase 1 | [0] Conector | [1] Sujeto | [2] Verbo | [3] Resto |\n|---|---|---|---|---|\n| Ich kaufe das T-Shirt, | **und** | ich | kaufe | die Hose. |`,
  presentationUrl: 'https://drive.google.com/file/d/1ja2uZyZv5RMsli1g6RVJAleFgRD4YVnG/view?usp=drive_web'
}, {
  id: 'sp_10',
  title: 'Capítulo 10: El Manual del Navegante',
  content: `### Capítulo 10: El Manual del Navegante\n\nLas coordenadas maestras del espacio requieren saber si estamos quietos o en movimiento.\n\n| ¿Wo? (¿En dónde?) | ¿Wohin? (¿A dónde?) |\n|---|---|\n| Ubicación estática. El objeto está descansando en su sitio. | Desplazamiento. Viaje cruzando un límite (A → B). |\n| 👉 **Usa Dativo (El Sillón del Dativo)**. | 👉 **Usa Acusativo**. |\n\n### Las 9 Wechselpräpositionen (Espaciales)\n**in** (dentro), **an** (pegado a), **auf** (sobre superficie), **über** (levitando/encima), **unter** (debajo), **neben** (al lado), **vor** (delante), **hinter** (detrás), **zwischen** (entre).\n\n**Contracciones vitales:** *in + dem = **im*** \\|  *an + dem = **am***\nEjemplo (Estático / Wo / Dativo): *Das Handy liegt **auf dem** Tisch.*`,
  presentationUrl: 'https://drive.google.com/file/d/1wS542v_rcsuYj1cpEsTzahsmKDBQQxjV/view?usp=drive_web'
}, {
  id: 'sp_11',
  title: 'Capítulo 11: Declinación Fuerte (Nullartikel)',
  content: `### Capítulo 11: La Declinación Fuerte de los Adjetivos (Nullartikel)\n\n**Explicación extendida:**\nCuando un adjetivo se coloca directamente antes de un sustantivo (función atributiva, como en "café caliente"), su terminación debe cambiar para reflejar el género, el número y el caso de ese sustantivo. Esto se conoce como declinación del adjetivo.\n\nLa **declinación fuerte** ocurre específicamente cuando no hay ningún artículo delante del adjetivo (un fenómeno común llamado *Nullartikel* o artículo cero), o cuando va precedido de palabras invariables que no tienen terminaciones propias (como los números *zwei*, *drei*, o palabras como *etwas* o *mehr*).\n\nAl no existir un artículo (*der, die, das, ein, eine*) que le indique al oyente si el sustantivo es masculino, femenino, neutro, singular o plural, el adjetivo se ve obligado a hacer todo el trabajo pesado. Por lo tanto, el adjetivo adopta las terminaciones típicas de los artículos definidos.\n\n> **⚠️ Advertencia y error típico de hispanohablantes:** En español, los adjetivos cambian de forma muy simple ("café negro", "cafés negros"). En alemán, tendemos a olvidar poner la terminación si vemos que no hay artículo. Decir *Ich trinke schwarz Kaffee* es incorrecto; el adjetivo debe declinarse con la terminación del artículo masculino en acusativo (-en), convirtiéndose en **Ich trinke schwarzen Kaffee**.\n\nHay una pequeña excepción a la regla de copiar fielmente al artículo definido: en el caso Genitivo para el masculino y neutro singular, la terminación del adjetivo es *-en* en lugar de *-es*, debido a que el propio sustantivo ya añade una -s o -es al final, haciendo redundante la marca fuerte en el adjetivo. Sin embargo, para los propósitos comunicativos de un nivel A1 sólido, nos enfocaremos de forma prioritaria en los casos funcionales cotidianos: **Nominativo, Acusativo y Dativo**.\n\n---\n\n### Clase completa con ejemplos:\n\n**Ejemplo 1 (Nominativo Masculino):** *Kalter Kaffee schmeckt mir nicht.*\n* **Traducción literal:** Frío café sabe a mí no.\n* **Traducción natural:** El café frío no me gusta.\n* **Análisis:** *Kaffee* es masculino (*der Kaffee*) y actúa como sujeto (Nominativo). Al no haber artículo, el adjetivo toma la terminación **-er** del artículo *der*.\n\n**Ejemplo 2 (Acusativo Masculino):** *Ich trinke gerne schwarzen Tee.*\n* **Traducción literal:** Yo trinke con gusto negro té.\n* **Traducción natural:** Me gusta tomar té negro.\n* **Análisis:** *Tee* es masculino (*der Tee*). En esta frase es el objeto directo (Acusativo). Como el artículo en acusativo sería *den*, el adjetivo adopta la terminación **-en**.\n\n**Ejemplo 3 (Nominativo Neutro):** *Frisches Wasser ist gesund.*\n* **Traducción literal:** Fresca agua es saludable.\n* **Traducción natural:** El agua fresca es saludable.\n* **Análisis:** *Wasser* es neutro (*das Wasser*) y es el sujeto (Nominativo). El adjetivo adopta la terminación **-es** proveniente del artículo *das*.\n\n**Ejemplo 4 (Acusativo Neutro):** *Wir kaufen deutsches Bier.*\n* **Traducción literal:** Nosotros compramos alemana cerveza.\n* **Traducción natural:** Compramos cerveza alemana.\n* **Análisis:** *Bier* es neutro (*das Bier*), aquí funciona como objeto directo (Acusativo). El adjetivo mantiene la terminación **-es** del neutro.\n\n**Ejemplo 5 (Dativo Femenino):** *Der Salat ist aus frischer Milch gemacht.*\n* **Traducción literal:** La ensalada es de fresca leche hecha.\n* **Traducción natural:** La ensalada está hecha con leche fresca.\n* **Análisis:** *Milch* es femenino (*die Milch*). La preposición *aus* exige caso Dativo de forma obligatoria. El dativo femenino de *die* es *der*, por lo tanto, el adjetivo recibe la terminación **-er**.\n\n---\n\n### Esquema de Terminaciones (Declinación Fuerte / Sin Artículo):\n\n| Caso | Masculino (der) | Femenino (die) | Neutro (das) | Plural (die) |\n|---|---|---|---|---|\n| **Nominativo** | -er | -e | -es | -e |\n| **Acusativo** | -en | -e | -es | -e |\n| **Dativo** | -em | -er | -em | -en |\n\n---\n\n### Frases de uso diario:\n\n* **Ich wünsche dir großen Erfolg!** (¡Te deseo un gran éxito! -> Éxito es *der Erfolg*, en acusativo masculino sin artículo toma la terminación **-en**).\n* **Haben Sie kalte Getränke?** (¿Tiene bebidas frías? -> Bebidas es plural *die Getränke*, en acusativo plural sin artículo toma la terminación **-e**).\n* **Ich trinke lieber roten Wein.** (Prefiero tomar vino tinto. -> Vino es *der Wein*, en acusativo masculino toma la terminación **-en**).\n\n---\n\n### 📝 Autoevaluación:\n\nCompleta los espacios en blanco aplicando las terminaciones de la declinación fuerte:\n\n1. Ich mag alt____ Käse (*der Käse* - objeto directo en Acusativo).\n2. Gut____ Brot ist teuer (*das Brot* - sujeto en Nominativo).\n3. Sie hilft mir mit groß____ Freude (*die Freude* - después de la preposición *mit*, que exige Dativo).\n4. Dort stehen zwei klein____ Kinder (Plural en Nominativo, precedido por el número invariable *zwei*).\n\n**✅ Solución:**\n1. **alten** (*Ich mag alten Käse* -> Acusativo masculino toma la terminación -en).\n2. **Gutes** (*Gutes Brot ist teuer* -> Nominativo neutro toma la terminación -es).\n3. **großer** (*mit großer Freude* -> Dativo femenino toma la terminación -er).\n4. **kleine** (*zwei kleine Kinder* -> Plural en nominativo sin artículo determinado toma la terminación -e).`,
  presentationUrl: 'https://drive.google.com/file/d/1uXg-DLwnQLSTdsSFbT8yPmHpTBWM2miu/view?usp=drive_web1'
}];
export default function App() {

  useEffect(() => {
    initializeAdMob();
  }, []);
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id);
  const [activePresentationId, setActivePresentationId] = useState(null);
  const [activeStudyPlanId, setActiveStudyPlanId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [revealedCards, setRevealedCards] = useState({});
  const [viewMode, setViewMode] = useState("flashcards");
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [user, setUser] = useState(null);
  const [cardImages, setCardImages] = useState({});
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
    if (!user || !db) return;
    
    const loadImages = async () => {
      try {
        // 1. Intentar cargar desde el caché (costo operativo $0)
        let cachedImages = await localforage.getItem('cardImages');
        if (cachedImages && Object.keys(cachedImages).length > 0) {
          setCardImages(cachedImages);
          return; // Ya tenemos los datos offline, cortamos aquí
        }

        // 2. Si no hay caché, hacer UNA sola llamada (sin suscripción)
        const globalAppId = "deutschmeister-pro";
        const imagesRef = collection(db, 'artifacts', globalAppId, 'public', 'data', 'flashcardImages');
        const snapshot = await getDocs(imagesRef);
        
        const loadedImages = {};
        snapshot.forEach(doc => {
          loadedImages[doc.id] = doc.data().imageUrl || doc.data().imageBase64;
        });
        
        // 3. Guardar en estado y persistir en IndexedDB
        setCardImages(loadedImages);
        await localforage.setItem('cardImages', loadedImages);
        
      } catch (error) {
        console.error("Error cargando imágenes con localforage:", error);
      }
    };
    
    loadImages();
  }, [user]);
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
      const lowerTerm = searchTerm.toLowerCase();
      return chapters.flatMap(c => c.words.map(w => ({
        ...w,
        chapter: c.title,
        emoji: c.emoji,
        isRedemittel: c.isRedemittel
      }))).filter(w => w.de.toLowerCase().includes(lowerTerm) || w.es.toLowerCase().includes(lowerTerm) || w.type.toLowerCase().includes(lowerTerm) || w.category && w.category.toLowerCase().includes(lowerTerm));
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
    const granted = await showRewardVideo();
    if (!granted) return;
    setStoryState({
      isOpen: true,
      loading: true,
      de: "",
      es: ""
    });
    // Filtramos letras sueltas o palabras ultracortas para que el cuento tenga sentido
    const palabrasValidas = displayedWords
      .filter(w => w.de.length > 2) 
      .slice(0, 8)
      .map(w => w.de);

    const wordsToUse = palabrasValidas.join(", ");
    try {
      const response = await fetch(`https://generatestory-44keyii6gq-uc.a.run.app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ palabrasVocabulario: palabrasValidas })
      });

      if (!response.ok) throw new Error("Failed to generate story");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let currentBuffer = "";
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ") && !line.includes("[DONE]")) {
            const textChunk = line.substring(6);
            currentBuffer += textChunk;
            
            // Extraer campos parciales en tiempo real
            const getStreamingField = (buffer, fieldName) => {
              const regex = new RegExp(`"${fieldName}"\\s*:\\s*"([^"]*)`);
              const match = buffer.match(regex);
              if (match) {
                return match[1]
                  .replace(/\\n/g, "\n")
                  .replace(/\\"/g, '"')
                  .replace(/\\t/g, "\t");
              }
              return "";
            };

            const partialDe = getStreamingField(currentBuffer, "cuento_aleman") || getStreamingField(currentBuffer, "de");
            const partialEs = getStreamingField(currentBuffer, "traduccion_espanol") || getStreamingField(currentBuffer, "es");

            setStoryState(prev => ({
              ...prev,
              loading: false, // Ocultar spinner cuando empiece a llegar texto
              de: partialDe || "Escribiendo cuento...",
              es: partialEs || "Traduciendo..."
            }));
          }
        }
      }

      // Procesamiento final
      const jsonMatch = currentBuffer.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
         throw new Error("Formato JSON no encontrado en la respuesta final.");
      }
      const data = JSON.parse(jsonMatch[0]);
      setStoryState({
        isOpen: true,
        loading: false,
        de: data.cuento_aleman || data.de,
        es: data.traduccion_espanol || data.es
      });

    } catch (e) {
      console.error(e);
      setStoryState({
        isOpen: true,
        loading: false,
        de: "Error al generar el cuento.",
        es: "Por favor, intenta de nuevo más tarde."
      });
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
        body: JSON.stringify({ historialConversacion: newMessages })
      });
      
      if (!response.ok) throw new Error("Failed to connect to tutor");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let currentText = "";
      setChatMessages([...newMessages, { role: "model", parts: [{ text: "" }] }]);
      setIsChatLoading(false);
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ") && !line.includes("[DONE]")) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.text) {
                currentText += data.text;
                setChatMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "model", parts: [{ text: currentText }] };
                  return updated;
                });
              }
            } catch (err) {}
          }
        }
      }
      
      const finalMessages = [...newMessages, { role: "model", parts: [{ text: currentText }] }];
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
    const prompt = `Hola tutor, ¿me puedes explicar con más detalle la palabra alemana "${wordDe}"${wordEs ? ` que significa "${wordEs}"` : ''}? Dame un par de ejemplos cortos en oraciones útiles para mi nivel A1.`;
    setChatInput(prompt);
  };
  const generateCardImage = async (wordObj, e, forceRegenerate = false) => {
    if (e) e.stopPropagation();
    const safeId = getSafeId(wordObj.de).substring(0, 150);
    const userDocRef = (user && db) ? doc(db, 'artifacts', appId, 'users', user.uid, 'unlockedCards', safeId) : null;
    
    if (!forceRegenerate) {
      const existingImage = cardImages[safeId];
      if (existingImage) {
        const granted = await showRewardVideo();
        if (!granted) return;
        setUnlockedCards(prev => ({ ...prev, [safeId]: { unlocked: true, regenerated: false } }));
        if (userDocRef) {
          try { await setDoc(userDocRef, { unlocked: true, regenerated: false }, { merge: true }); } catch (error) { console.warn(error); }
        }
        return;
      }
    } else {
      const currentCount = unlockedCards && unlockedCards[safeId]?.regenerateCount !== undefined ? unlockedCards[safeId].regenerateCount : (unlockedCards && unlockedCards[safeId]?.regenerated ? 1 : 0);
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
      const currentCount = unlockedCards && unlockedCards[safeId]?.regenerateCount !== undefined ? unlockedCards[safeId].regenerateCount : (unlockedCards && unlockedCards[safeId]?.regenerated ? 1 : 0);
      const newCount = forceRegenerate ? currentCount + 1 : currentCount;
      let conceptoAEnviar = wordObj.en || wordObj.concepto_ingles || "";

      // PARTE 2: Interceptar (Read Global)
      let dataUri = "";
      let isDifferentFromLocal = false;
      try {
        const globalSafeId = wordObj.de.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
        const globalCacheRef = doc(db, 'global_flashcards', globalSafeId);
        const globalCacheSnap = await getDoc(globalCacheRef);
        
        if (globalCacheSnap.exists() && globalCacheSnap.data().imageUrl) {
            const globalUrl = globalCacheSnap.data().imageUrl;
            const localUrl = cardImages[safeId];
            
            // Si el usuario presionó 'Regenerar', ignoramos la caché global
            if (forceRegenerate) {
                console.log("FORCE REGENERATE: Ignorando caché global a petición del usuario...");
            } 
            else if (globalUrl !== localUrl) {
                console.log("CACHE HIT: La imagen global es NUEVA. Sincronizando sin generar...");
                dataUri = globalUrl;
                isDifferentFromLocal = true;
            } else {
                console.log("CACHE MATCH: Ya tienes la imagen más reciente. Forzando nueva generación...");
            }
        }
      } catch (cacheErr) {
        console.warn("Advertencia de lectura en caché global:", cacheErr);
      }

      // Si no hubo Hit diferente, forzamos la generación en la nube
      if (!isDifferentFromLocal) {
        console.log("FORCED REGEN: Llamando a Cloud Function...");
        const generateCardImageFn = httpsCallable(functions, 'generateCardImage');
        const result = await generateCardImageFn({
          wordObj: wordObj,
          conceptoIngles: conceptoAEnviar,
          word: wordObj.de,
          category: activeChapter ? activeChapter.title : ''
        });
        dataUri = result.data?.imageUrl;
      }

      if (!dataUri) throw new Error('No image data returned from FAL API');
      dataUri = await compressImageBase64(dataUri, 1024, 0.9);
      
      setCardImages(prev => {
        const nextImages = { ...prev, [safeId]: dataUri };
        // Guardar la respuesta final en IndexedDB (localforage)
        localforage.setItem('cardImages', nextImages).catch(e => console.warn(e));
        return nextImages;
      });
      
      if (db) {
        try {
          const globalAppId = 'deutschmeister-pro';
          const docRef = doc(db, 'artifacts', globalAppId, 'public', 'data', 'flashcardImages', safeId);
          await setDoc(docRef, { imageUrl: dataUri, word: wordObj.de, regenerateCount: newCount }, { merge: true });
          const strictDocRef = doc(db, 'public_content', 'data', 'flashcardImages', safeId);
          await setDoc(strictDocRef, { imageUrl: dataUri, word: wordObj.de, regenerateCount: newCount }, { merge: true });
        } catch(e) { console.warn(e); }
      }
      setUnlockedCards(prev => ({ ...prev, [safeId]: { unlocked: true, regenerateCount: newCount } }));
      if (userDocRef) {
        await setDoc(userDocRef, { unlocked: true, regenerateCount: newCount }, { merge: true }).catch(e => console.warn(e));
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
  const PresentationViewer = ({
    presentation,
    onClose
  }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => {
      if (currentSlide < presentation.slides.length - 1) setCurrentSlide(prev => prev + 1);
    };
    const prevSlide = () => {
      if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
    };
    const isBlueprint = presentation.theme === 'blueprint';
    const isMedical = presentation.theme === 'medical';
    const isNotebook = presentation.theme === 'notebook';
    let containerClass = "flex-1 flex flex-col overflow-hidden ";
    let headerClass = "flex justify-between items-center p-4 border-b shrink-0 ";
    let bodyClass = "flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-start ";
    if (isBlueprint) {
      containerClass += "bg-blue-950 text-blue-50 font-sans";
      bodyClass += " bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:3rem_3rem]";
      headerClass += "bg-blue-950 border-blue-800";
    } else if (isMedical) {
      containerClass += "bg-slate-50 text-slate-800 font-sans";
      bodyClass += " bg-white/50";
      headerClass += "bg-white border-emerald-100 shadow-sm";
    } else if (isNotebook) {
      containerClass += "bg-[#fdfbf7] text-slate-800 font-serif";
      bodyClass += " bg-[linear-gradient(transparent_95%,#e5e7eb_5%)] bg-[size:100%_2rem]";
      headerClass += "bg-[#fdfbf7] border-amber-900/10 shadow-sm";
    }
    const slideProps = {
      cardImages,
      generateCardImage,
      isImageLoading,
      openAiTutor,
      setFullscreenImage,
      unlockedCards
    };
    return <div className="flex flex-col min-h-[100dvh] w-full bg-white animate-in fade-in zoom-in-95 duration-200">
        <div className={containerClass}>
          <div className={headerClass}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isBlueprint ? 'bg-blue-900 text-blue-300' : isMedical ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
                <Presentation size={24} />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">{presentation.title}</h2>
                <p className={`text-xs ${isBlueprint ? 'text-blue-400' : isMedical ? 'text-emerald-600' : 'text-amber-600'}`}>{currentSlide + 1} / {presentation.slides.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {presentation.presentationUrl && (
                <a 
                  href={presentation.presentationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${isBlueprint ? 'border-blue-700 text-blue-300 hover:bg-blue-800' : isMedical ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'border-amber-900/20 text-amber-700 hover:bg-amber-100'}`}
                >
                  <Link2 size={16} /> Diapositivas
                </a>
              )}
              <button onClick={onClose} className={`p-2 rounded-full transition ${isBlueprint ? 'hover:bg-blue-900 text-blue-300' : 'hover:bg-slate-200 text-slate-500'}`}>
                <X size={24} />
              </button>
            </div>
          </div>

          <div className={bodyClass}>
            <div className="max-w-4xl mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300" key={currentSlide}>
              <div className="mb-6 md:mb-10 text-center">
                 <h1 className={`text-3xl md:text-5xl font-black mb-3 ${isBlueprint ? 'text-white' : isMedical ? 'text-emerald-950' : 'text-amber-950'}`}>
                   {presentation.slides[currentSlide].title}
                 </h1>
                 {presentation.slides[currentSlide].subtitle && <h2 className={`text-lg md:text-xl font-medium ${isBlueprint ? 'text-blue-300' : isMedical ? 'text-emerald-700' : 'text-amber-700/80'}`}>
                     {presentation.slides[currentSlide].subtitle}
                   </h2>}
              </div>
              <div className="w-full">
                {typeof presentation.slides[currentSlide].content === 'function' ? presentation.slides[currentSlide].content(slideProps) : presentation.slides[currentSlide].content}
              </div>
            </div>
          </div>

          <div className={`p-4 shrink-0 flex items-center justify-between border-t ${isBlueprint ? 'border-blue-800 bg-blue-950/80 backdrop-blur' : isMedical ? 'border-emerald-100 bg-white/80 backdrop-blur' : 'border-amber-900/10 bg-[#fdfbf7]/80 backdrop-blur'}`}>
            <button onClick={prevSlide} disabled={currentSlide === 0} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition disabled:opacity-30 ${isBlueprint ? 'bg-blue-900 text-white hover:bg-blue-800' : isMedical ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'}`}>
              <ChevronLeft size={20} /> Anterior
            </button>
            
            <div className="flex gap-1.5">
              {presentation.slides.map((_, idx) => <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? isBlueprint ? 'bg-blue-400 w-6' : isMedical ? 'bg-emerald-500 w-6' : 'bg-amber-600 w-6' : isBlueprint ? 'bg-blue-900' : isMedical ? 'bg-emerald-200' : 'bg-amber-200'}`} />)}
            </div>

            <button onClick={currentSlide === presentation.slides.length - 1 ? onClose : nextSlide} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isBlueprint ? 'bg-blue-500 text-blue-950 hover:bg-blue-400' : isMedical ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
              {currentSlide === presentation.slides.length - 1 ? 'Finalizar' : 'Siguiente'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>;
  };
  return <div className={isFullscreen ? "fixed inset-0 z-[9999] bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto" : "min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto relative"}>
      
      {viewMode === "presentation" && activePresentation ? (
        <PresentationViewer presentation={activePresentation} onClose={() => {
          setViewMode('flashcards');
          setActivePresentationId(null);
          setIsFullscreen(false);
        }} />
      ) : viewMode === "quiz" ? (
        <div className="flex flex-col min-h-[100dvh] w-full bg-white overflow-y-auto animate-in fade-in duration-300 p-4 sm:p-8">
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
                   {quizState?.word.pron && (
                      <div className="flex items-center gap-2 mt-3 text-blue-500 italic font-medium text-lg">
                        /{quizState.word.pron}/
                        <button onClick={(e) => { e.stopPropagation(); nativeSpeak(quizState.word.de); }} className="p-1.5 hover:text-blue-600 hover:bg-blue-100 rounded-full transition"><Volume2 size={20} /></button>
                      </div>
                   )}
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
        </div>
      ) : (
        <>
          {/* HEADER NAVBAR */}
          <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 text-slate-900 p-2 rounded-lg">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-wide leading-tight">DeutschMeister <span className="text-yellow-400">PRO A1</span></h1>
                  <p className="text-xs text-slate-400">Alemán Técnico & Preparación Goethe Zertifikat</p>
                </div>
              </div>
              
              <div className="relative w-full md:w-1/3">
                <input type="text" placeholder="Buscar (ej. Motor, essen, Verbo Modal)..." className="w-full py-2 px-4 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all" value={searchTerm} onChange={e => {
                setSearchTerm(e.target.value);
                if (viewMode === "quiz" || viewMode === "presentation" || viewMode === "studyPlan") setViewMode("flashcards");
              }} />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>

              <div className="flex gap-2 w-full md:w-auto justify-end">
                <button onClick={toggleFullScreen} className="bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-3 py-2 rounded-lg transition flex items-center justify-center" title="Pantalla Completa App">
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
                <button onClick={() => setIsTutorOpen(true)} className="bg-slate-800 text-yellow-400 border border-yellow-500/30 px-4 py-2 rounded-lg font-bold hover:bg-slate-700 transition flex items-center gap-2">
                  <Bot size={18} /> Tutor IA
                </button>
                <button onClick={() => setViewMode('roleplay')} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-500 transition flex items-center gap-2 shadow-md">
                  <Sparkles size={18} /> Rol ✨
                </button>
                <button onClick={openQuizSetup} className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition flex items-center gap-2">
                  <Gamepad2 size={18} /> Quiz
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
        
        {/* SIDEBAR */}
        {!isFullscreen && viewMode !== "roleplay" && !searchTerm && <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
            
            {/* SECCIÓN 1: Tablas Maestras */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 p-3 font-black text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                Tablas Maestras
              </div>
              <ul className="flex flex-col max-h-[40vh] overflow-y-auto custom-scrollbar">
                {chapters.map(chap => <li key={chap.id}>
                    <button onClick={async () => {
                setActiveChapterId(chap.id);
                if (viewMode !== 'flashcards' && viewMode !== 'table') setViewMode('flashcards');
              }} className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-l-4 ${activeChapterId === chap.id && (viewMode === 'flashcards' || viewMode === 'table') ? 'bg-blue-50 text-blue-800 font-bold border-blue-600' : 'border-transparent hover:bg-slate-50 text-slate-600'}`}>
                      <span className="text-xl">{chap.emoji}</span>
                      <span className="text-sm leading-tight">{chap.title}</span>
                    </button>
                  </li>)}
              </ul>
            </div>

            {/* SECCIÓN NUEVA: Plan de Estudio */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-emerald-50 p-3 font-black text-xs text-emerald-600 uppercase tracking-wider border-b border-emerald-100 flex items-center gap-2">
                <BookOpen size={14} /> Plan de Estudio: Dominio A1
              </div>
              <ul className="flex flex-col max-h-[30vh] overflow-y-auto custom-scrollbar">
                {studyPlanModules.map(mod => <li key={mod.id}>
                    <button onClick={() => {
                setActiveStudyPlanId(mod.id);
                setViewMode('studyPlan');
              }} className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-l-4 ${activeStudyPlanId === mod.id && viewMode === 'studyPlan' ? 'bg-emerald-50 text-emerald-800 font-bold border-emerald-600' : 'border-transparent hover:bg-slate-50 text-slate-600'}`}>
                      <span className="text-emerald-500"><Sparkles size={16} /></span>
                      <span className="text-sm leading-tight font-medium">{mod.title}</span>
                    </button>
                  </li>)}
              </ul>
            </div>

            {/* SECCIÓN 3: Módulos de Estudio Goethe (Presentaciones) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-indigo-50 p-3 font-black text-xs text-indigo-600 uppercase tracking-wider border-b border-indigo-100 flex items-center gap-2">
                <Presentation size={14} /> Módulos de Estudio Goethe
              </div>
              <ul className="flex flex-col">
                {goetheModules.map(pres => <li key={pres.id}>
                    <button onClick={() => {
                setActivePresentationId(pres.id);
                setViewMode('presentation');
                setIsFullscreen(true);
              }} className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors border-l-4 ${activePresentationId === pres.id && viewMode === 'presentation' ? 'bg-indigo-50 text-indigo-900 font-bold border-indigo-600' : 'border-transparent hover:bg-slate-50 text-slate-700'}`}>
                      <div>
                        <div className="text-sm leading-tight font-bold">{pres.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{pres.desc}</div>
                      </div>
                      <PlayCircle size={16} className={activePresentationId === pres.id && viewMode === 'presentation' ? 'text-indigo-600' : 'text-slate-300'} />
                    </button>
                  </li>)}
              </ul>
            </div>

          </aside>}

        {/* CONTENT AREA */}
        <section className="flex-1 w-full min-w-0 pb-20 relative">
          
          {/* MODO PRESENTACIÓN VISUAL */}
          {viewMode === "presentation" && activePresentation && <PresentationViewer presentation={activePresentation} onClose={() => {
          setViewMode('flashcards');
          setActivePresentationId(null);
          setIsFullscreen(false);
        }} />}

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
                  {chapters.map(chap => (
                    <label key={chap.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition border-b border-slate-100 last:border-0">
                      <input 
                        type="checkbox" 
                        checked={selectedQuizChapters.includes(chap.id)} 
                        onChange={(e) => {
                          if (e.target.checked) setSelectedQuizChapters(prev => [...prev, chap.id]);
                          else setSelectedQuizChapters(prev => prev.filter(id => id !== chap.id));
                        }}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-lg">{chap.emoji}</span>
                      <span className="font-medium text-slate-700">{chap.title}</span>
                    </label>
                  ))}
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

          {/* VISTA: PLAN DE ESTUDIO (CLASES MAGISTRALES) */}
          {viewMode === "studyPlan" && activeStudyPlanId && <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 mb-10">
               <div className="flex items-center justify-between border-b-2 border-emerald-100 pb-6 mb-6">
                 <div>
                   <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                     {studyPlanModules.find(m => m.id === activeStudyPlanId).title}
                   </h2>
                   <p className="text-emerald-600 font-bold mt-2 flex items-center gap-2">
                     <GraduationCap size={20} /> Clase Magistral Oficial
                   </p>
                 </div>
               </div>
               <div className="prose prose-slate max-w-none">
                 <MarkdownMessage text={studyPlanModules.find(m => m.id === activeStudyPlanId).content} />
               </div>

               {/* BOTÓN PARA VER LA PRESENTACIÓN */}
               {studyPlanModules.find(m => m.id === activeStudyPlanId).presentationUrl && <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center sm:justify-start">
                   <button onClick={async e => {
              e.preventDefault();
              const granted = await showRewardVideo();
              if (granted) {
                window.open(studyPlanModules.find(m => m.id === activeStudyPlanId).presentationUrl, "_blank");
              }
            }} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:scale-105">
                     <Presentation size={20} />
                     Abrir Presentación de la Clase
                   </button>
                 </div>}
            </div>}
          
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
                return (
                  <PresentationVocabCard 
                    key={index}
                    wordObj={{...word, chapter: searchTerm ? word.chapter : undefined}}
                    cardImages={cardImages}
                    regeneratedImages={unlockedCards}
                    generateCardImage={generateCardImage}
                    isImageLoading={isImageLoading}
                    openAiTutor={openAiTutor}
                    setFullscreenImage={setFullscreenImage}
                    unlockedCards={unlockedCards}
                    
                    isRevealed={isRevealed}
                  />
                );
              })}
              </div>
            </>}

          {/* RENDER TABLA */}
          {viewMode === "table" && <div className="animate-in fade-in pb-10">
              {Object.entries(groupWordsByCategory(displayedWords)).map(([category, words], catIdx) => <div key={catIdx} className="mb-8">
                  {category !== "General" && <h3 className="text-lg font-bold text-slate-700 mb-3 border-b-2 border-blue-200 pb-2">{category}</h3>}
                  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-sm uppercase tracking-wider">
                            <th className="px-4 py-3 font-bold">Expresión en Alemán</th>
                            {!activeChapter?.isRedemittel && <th className="px-4 py-3 font-bold">Pronunciación</th>}
                            <th className="px-4 py-3 font-bold">Traducción</th>
                            <th className="px-4 py-3 font-bold">Tema / Contexto</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {words.map((word, idx) => <tr key={idx} className="hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-3 font-bold text-slate-800 flex items-center gap-2">
                                {!activeChapter?.isRedemittel && <button onClick={e => speakText(word, e)} className="text-blue-500 hover:text-blue-700 p-1"><Volume2 size={14} /></button>}
                                {word.de}
                              </td>
                              {!activeChapter?.isRedemittel && <td className="px-4 py-3 text-slate-500 italic">/{word.pron}/</td>}
                              <td className="px-4 py-3 font-medium text-slate-700">{word.es}</td>
                              <td className="px-4 py-3 text-slate-500">
                                <span className="bg-slate-100 px-2 py-1 rounded-md text-xs border border-slate-200 text-slate-600">{word.type}</span>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>)}
            </div>}

          {displayedWords.length === 0 && <div className="py-16 text-center text-slate-400 bg-white rounded-xl border-2 border-dashed border-slate-200">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium text-slate-500">No se encontraron palabras.</p>
            </div>}

          {/* MODAL DEL CUENTO IA */}
          {storyState.isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Sparkles className="text-indigo-500" /> Cuento A1 Generado</h3>
                  <button onClick={() => setStoryState(prev => ({
                  ...prev,
                  isOpen: false
                }))} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full"><X size={20} /></button>
                </div>
                {storyState.loading ? <div className="py-12 flex flex-col items-center justify-center gap-3 text-indigo-500">
                    <Loader2 size={40} className="animate-spin" />
                    <p className="font-bold animate-pulse">Imaginando historia mágica...</p>
                  </div> : <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group cursor-pointer" onClick={() => nativeSpeak(storyState.de)}>
                      <div className="font-bold text-lg text-slate-800 leading-relaxed text-inherit">
                        <ReactMarkdown 
                          components={{
                            p: ({node, ...props}) => <span className="block mb-2" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded" {...props} />
                          }}
                        >
                          {storyState.de}
                        </ReactMarkdown>
                      </div>
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"><Volume2 size={16} /></button>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                      <p className="text-slate-700 italic">{storyState.es}</p>
                    </div>
                  </div>}
              </div>
            </div>}
        </>}
    </section>
  </main>
  </>
  )}

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
            </div>}
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
        <div className="relative max-w-5xl max-h-screen w-full h-full flex flex-col items-center justify-center">
          <button onClick={e => {
            e.stopPropagation();
            setFullscreenImage(null);
          }} className="absolute top-4 right-4 text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors z-[110]">
            <X size={24} />
          </button>
          <img src={typeof fullscreenImage === 'string' && (fullscreenImage.startsWith('http') || fullscreenImage.startsWith('data:')) ? fullscreenImage : typeof fullscreenImage === 'string' ? `data:image/png;base64,${fullscreenImage}` : ''} alt="Vista Ampliada" className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl p-2 cursor-zoom-out bg-white" onClick={e => e.stopPropagation()} />
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