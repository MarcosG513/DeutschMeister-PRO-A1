import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, BookOpen, Car, Home, Coffee, ShoppingCart, Activity, Briefcase, Heart, Clock, Mail, CheckCircle, XCircle, List, LayoutGrid, Gamepad2, GraduationCap, Link2, MessageCircle, Bot, ImagePlus, Volume2, X, Send, Loader2, Maximize, Minimize, Star as Sparkles, Monitor as Presentation, ChevronRight, ChevronLeft, PlayCircle, Mic, Edit as Edit3, Headphones } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { initializeAdMob, showRewardVideo, showInterstitial } from './services/AdService';

// --- CONFIGURACIÓN API & FIREBASE ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key') ? initializeApp(firebaseConfig) : null;
const auth = firebaseApp ? getAuth(firebaseApp) : null;
const db = firebaseApp ? getFirestore(firebaseApp) : null;
const appId = firebaseConfig.appId || 'default-app-id';


// --- UTILS PARA IA Y DATOS ---
const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(res => setTimeout(res, backoff * Math.pow(2, i)));
    }
  }
};

const base64ToArrayBuffer = (base64) => {
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
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
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

  return new Blob([view], { type: 'audio/wav' });
};

const getSafeId = (str) => btoa(encodeURIComponent(str)).replace(/[/+=]/g, '_');

const nativeSpeak = async (text) => {
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.speak({
        text: text,
        lang: 'de-DE',
        rate: 0.85,
        pitch: 1.0,
      });
    } catch (e) {
      console.error("Error en TTS nativo", e);
    }
  } else {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Web Speech API no está soportada en este navegador.");
    }
  }
};

// --- COMPONENTES AUXILIARES ---
const MarkdownMessage = ({ text }) => {
  if (!text || typeof text !== 'string') return null;
  let cleanText = text.replace(/(?:🇩🇪✨\s*model|✨\s*model|DE|model)\s*$/gi, '').trim();

  const renderInlineStyles = (content, keyPrefix) => {
    const linkParts = content.split(/(\[.*?\]\(.*?\))/g);
    return linkParts.map((linkPart, lIndex) => {
      if (linkPart.startsWith('[') && linkPart.includes('](') && linkPart.endsWith(')')) {
        const textMatch = linkPart.match(/\[(.*?)\]/);
        const urlMatch = linkPart.match(/\((.*?)\)/);
        if (textMatch && urlMatch) {
          return <a key={`${keyPrefix}-l-${lIndex}`} href={urlMatch[1]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline font-bold bg-emerald-50 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1">{textMatch[1]}</a>;
        }
      }

      const parts = linkPart.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${keyPrefix}-l-${lIndex}-b-${index}`}>{part.slice(2, -2)}</strong>;
        }
        const subParts = part.split(/(\*.*?\*)/g);
        return subParts.map((subPart, subIndex) => {
          if (subPart.startsWith('*') && subPart.endsWith('*')) {
            return <em key={`${keyPrefix}-l-${lIndex}-b-${index}-i-${subIndex}`}>{subPart.slice(1, -1)}</em>;
          }
          return <span key={`${keyPrefix}-l-${lIndex}-b-${index}-t-${subIndex}`}>{subPart}</span>;
        });
      });
    });
  };

  const lines = cleanText.split('\n');
  const elements = [];
  let currentTable = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.includes('---')) return;

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim() !== '');
      if (!currentTable) currentTable = [];
      const isHeader = currentTable.length === 0;
      currentTable.push(
        <div key={`row-${index}`} className={`flex border-b border-slate-200 ${isHeader ? 'font-bold bg-slate-200/80 text-slate-800 rounded-t-lg' : 'bg-white'}`}>
          {cells.map((cell, cIndex) => (
            <div key={`cell-${index}-${cIndex}`} className={`flex-1 p-2 border-r border-slate-200 last:border-r-0 text-sm ${isHeader ? 'text-center' : ''}`}>
              {renderInlineStyles(cell.trim(), `cell-${index}-${cIndex}`)}
            </div>
          ))}
        </div>
      );
      return;
    } else if (currentTable) {
      elements.push(<div key={`table-${index}`} className="my-4 border border-slate-200 rounded-lg overflow-hidden shadow-sm">{currentTable}</div>);
      currentTable = null;
    }

    if (trimmed.startsWith('### ')) { elements.push(<h3 key={`h3-${index}`} className="text-lg font-bold mt-5 mb-2 text-blue-900 border-b border-blue-100 pb-1">{renderInlineStyles(trimmed.replace('### ', ''), `h3-${index}`)}</h3>); return; }
    if (trimmed.startsWith('## ')) { elements.push(<h2 key={`h2-${index}`} className="text-xl font-bold mt-6 mb-3 text-blue-900 border-b border-blue-200 pb-1">{renderInlineStyles(trimmed.replace('## ', ''), `h2-${index}`)}</h2>); return; }
    if (trimmed.startsWith('# ')) { elements.push(<h1 key={`h1-${index}`} className="text-2xl font-black mt-6 mb-3 text-blue-950">{renderInlineStyles(trimmed.replace('# ', ''), `h1-${index}`)}</h1>); return; }
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
      elements.push(<li key={`li-${index}`} className="ml-5 mt-1 list-inside marker:text-blue-500">{renderInlineStyles(trimmed.replace(/^(\* |- |\d+\.\s)/, ''), `li-${index}`)}</li>); return;
    }
    if (trimmed.startsWith('> ')) {
      elements.push(<blockquote key={`quote-${index}`} className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-blue-50/80 rounded-r-lg text-slate-700 italic shadow-sm">{renderInlineStyles(trimmed.substring(2), `quote-${index}`)}</blockquote>); return;
    }
    if (trimmed === '---' || trimmed === '***') { elements.push(<hr key={`hr-${index}`} className="my-4 border-slate-200" />); return; }
    if (trimmed === '') { elements.push(<div key={`space-${index}`} className="h-2"></div>); } 
    else { elements.push(<p key={`p-${index}`} className="mb-2">{renderInlineStyles(trimmed, `p-${index}`)}</p>); }
  });

  if (currentTable) { elements.push(<div key={`table-end`} className="my-4 border border-slate-200 rounded-lg overflow-hidden shadow-sm">{currentTable}</div>); }

  return <div className="text-[15px] leading-relaxed text-slate-700">{elements}</div>;
};

const PresentationVocabCard = ({ wordObj, cardImages, generateCardImage, isImageLoading, openAiTutor }) => {
  const [flipped, setFlipped] = useState(false);
  const isLongText = wordObj.de.length > 20;
  const safeId = getSafeId(wordObj.de).substring(0, 150);
  const imgBase64 = cardImages ? cardImages[safeId] : null;
  const isGenLoading = isImageLoading === safeId;

  return (
    <div onClick={() => setFlipped(!flipped)} className="relative h-32 perspective-1000 cursor-pointer w-full group">
      <div className={`w-full h-full transition-all duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRENTE */}
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-center group-hover:border-blue-300 overflow-hidden">
          {imgBase64 ? (
            <div className="w-full h-16 bg-slate-100 border-b border-slate-100 relative">
               <img src={`data:image/png;base64,${imgBase64}`} alt={wordObj.de} className="w-full h-full object-contain mix-blend-multiply p-1" />
            </div>
          ) : (
            <div className="w-full h-12 bg-slate-50 flex flex-col items-center justify-center relative border-b border-slate-100 group/imgbtn z-10">
               <span className="text-xl opacity-20 absolute pointer-events-none">{wordObj.emoji || "📝"}</span>
               {generateCardImage && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); generateCardImage(wordObj, e); }} 
                   className="relative z-30 bg-white hover:bg-blue-50 text-blue-600 px-2 py-1 rounded shadow-sm border border-blue-200 transition-all flex items-center gap-1 text-[10px] font-bold opacity-0 group-hover/imgbtn:opacity-100"
                   title="Generar Imagen Representativa"
                 >
                   {isGenLoading ? <Loader2 size={12} className="animate-spin text-blue-500" /> : <ImagePlus size={12} className="text-blue-500" />}
                   {isGenLoading ? '...' : 'Imagen'}
                 </button>
               )}
            </div>
          )}
          <div className="flex-1 flex items-center justify-center w-full px-2 relative z-20">
             <span className={`font-bold text-slate-800 ${isLongText ? 'text-xs' : 'text-sm'}`}>{wordObj.de}</span>
             <button onClick={(e) => { e.stopPropagation(); nativeSpeak(wordObj.de); }} className="absolute right-1 bottom-1 text-slate-300 hover:text-blue-500 p-1">
               <Volume2 size={14} />
             </button>
          </div>
        </div>

        {/* ATRÁS */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-800 border-2 border-slate-800 text-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 text-center">
          <span className={`font-bold text-yellow-300 leading-tight ${wordObj.es.length > 20 ? 'text-xs' : 'text-sm'}`}>{wordObj.es}</span>
          <span className="text-[10px] text-slate-400 mt-1 italic">{wordObj.type}</span>
          <button onClick={(e) => { e.stopPropagation(); if(openAiTutor) openAiTutor(wordObj, e); }} className="absolute top-1 right-1 text-slate-400 hover:text-yellow-400 p-1" title="Preguntar a IA">
             <Bot size={12} />
          </button>
        </div>

      </div>
    </div>
  );
};


const GrammarAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-slate-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm transition-all">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-5 py-4 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 flex justify-between items-center transition-colors">
        <span className="text-lg">{title}</span>
        <span className={`text-xl transition-transform ${isOpen ? 'rotate-45 text-red-500' : 'text-blue-500'}`}>+</span>
      </button>
      {isOpen && <div className="p-5 text-slate-600 leading-relaxed border-t-2 border-slate-100 bg-white animate-in fade-in slide-in-from-top-2">{children}</div>}
    </div>
  );
};

const AudioSim = ({ title, textDe, textEs }) => {
  const [playing, setPlaying] = useState(false);
  
  const toggle = async () => {
    if (playing) return;
    setPlaying(true);
    
    try {
        const payload = {
            contents: [{ parts: [{ text: textDe }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } }
                }
            },
            model: "gemini-2.5-flash-preview-tts"
        };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
        const result = await fetchWithRetry(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const part = result?.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData?.data && part?.inlineData?.mimeType) {
             const sampleRateMatch = part.inlineData.mimeType.match(/rate=(\d+)/);
             const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
             const pcmData = base64ToArrayBuffer(part.inlineData.data);
             const pcm16 = new Int16Array(pcmData);
             const wavBlob = pcmToWav(pcm16, sampleRate);
             const audioUrl = URL.createObjectURL(wavBlob);
             const audio = new Audio(audioUrl);
             audio.onended = () => setPlaying(false);
             audio.onerror = () => setPlaying(false);
             audio.play();
             return;
        }
    } catch(e) {
        console.error("Gemini TTS failed, falling back to native:", e);
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textDe);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlaying(false), 3000);
    }
  };

  return (
    <div className="bg-slate-800 text-white p-5 rounded-xl flex flex-col gap-3 mb-4 shadow-lg border border-slate-700 relative overflow-hidden">
      <div className="flex items-center gap-4 z-10">
        <button onClick={toggle} className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-900 transition-all shadow-md ${playing ? 'bg-yellow-300 scale-95' : 'bg-yellow-500 hover:bg-yellow-400 hover:scale-105'}`}>
          {playing ? <Loader2 className="animate-spin" size={24} /> : <PlayCircle size={28} />}
        </button>
        <div className="flex-1">
          <p className="font-bold text-sm text-slate-300 mb-2">{title}</p>
          <div className="h-2 bg-slate-700 rounded-full w-full overflow-hidden">
             <div className={`h-full bg-yellow-400 transition-all ease-linear ${playing ? 'w-full duration-[3000ms]' : 'w-0 duration-200'}`}></div>
          </div>
        </div>
      </div>
      {playing && (
        <div className="mt-3 p-3 bg-slate-900/80 rounded-lg animate-in fade-in slide-in-from-top-2 z-10 border border-slate-700/50">
          <p className="font-mono text-yellow-300 font-bold mb-1">🇩🇪 "{textDe}"</p>
          <p className="text-sm text-slate-400 italic">🇪🇸 "{textEs}"</p>
        </div>
      )}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <Headphones size={120} />
      </div>
    </div>
  );
};

const RoleplaySimulator = ({ apiKey, onExit }) => {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [tutorMessageCount, setTutorMessageCount] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scenarios = [
    { id: 'restaurant', title: 'En el Restaurante', icon: '🍽️', desc: 'Pide comida y bebida.', prompt: 'Eres un camarero muy amable en un restaurante en Múnich. El usuario es un cliente de nivel A1 de alemán. Empieza saludando y preguntando qué desea beber. Usa oraciones muy cortas y vocabulario A1. Responde SOLO en alemán.' },
    { id: 'station', title: 'Estación de Tren', icon: '🚆', desc: 'Compra un billete.', prompt: 'Eres un vendedor de billetes en la estación de tren de Berlín. El usuario es un viajero nivel A1 que quiere ir a Fráncfort. Empieza diciendo "Guten Tag, wohin möchten Sie fahren?". Usa oraciones cortas A1. Responde SOLO en alemán.' },
    { id: 'shopping', title: 'Tienda de Ropa', icon: '👕', desc: 'Busca una chaqueta.', prompt: 'Eres un vendedor en una tienda de ropa en Viena. El usuario busca una chaqueta. Empieza diciendo "Guten Tag, kann ich Ihnen helfen?". Usa vocabulario A1. Responde SOLO en alemán.' }
  ];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startScenario = async (scen) => {
    setScenario(scen);
    setLoading(true);
    try {
        const payload = {
            contents: [{ parts: [{ text: "Hola, inicia la simulación según las instrucciones." }] }],
            systemInstruction: { parts: [{ text: scen.prompt }] }
        };
        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const text = response.candidates[0].content.parts[0].text;
        setMessages([{ role: 'model', parts: [{text}] }]);
    } catch (e) {
        setMessages([{ role: 'model', parts: [{text: "Entschuldigung, es hay un error de conexión."}] }]);
    } finally {
        setLoading(false);
    }
  };

  const sendMessage = async () => {
    if(!input.trim()) return;

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

    const newMsgs = [...messages, { role: 'user', parts: [{text: input}] }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
        const payload = {
            contents: newMsgs,
            systemInstruction: { parts: [{ text: scenario.prompt }] }
        };
        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const text = response.candidates[0].content.parts[0].text;
        setMessages([...newMsgs, { role: 'model', parts: [{text}] }]);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  if (!scenario) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-3xl mx-auto mt-10 animate-in fade-in zoom-in duration-300 relative">
        <button onClick={onExit} className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition font-bold shadow-sm"><X size={18} /> Salir</button>
        <div className="text-center mb-8 mt-4">
          <div className="inline-flex bg-purple-100 text-purple-600 p-3 rounded-full mb-4 shadow-sm"><Sparkles size={32}/></div>
          <h2 className="text-3xl font-black text-slate-800">Simulador de Rol A1</h2>
          <p className="text-slate-500 mt-2">Pon a prueba tu alemán interactuando en situaciones reales con un personaje controlado por IA.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map(scen => (
            <button key={scen.id} onClick={() => startScenario(scen)} className="flex flex-col items-center p-6 bg-slate-50 border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl transition-all text-center group cursor-pointer shadow-sm">
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{scen.icon}</span>
              <h3 className="font-bold text-slate-800 text-lg">{scen.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{scen.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col h-[70vh] max-w-3xl mx-auto mt-6 overflow-hidden animate-in slide-in-from-bottom-4">
      <div className="bg-purple-600 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{scenario.icon}</span>
          <div>
            <h3 className="font-bold text-lg leading-tight">{scenario.title}</h3>
            <p className="text-purple-200 text-xs">Simulador de Conversación IA</p>
          </div>
        </div>
        <button onClick={() => setScenario(null)} className="text-purple-200 hover:text-white hover:bg-purple-700 px-3 py-1.5 rounded-lg transition text-sm font-bold flex items-center gap-2"><X size={16}/> Cambiar</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4 custom-scrollbar">
        {messages.filter(m => m.role !== 'user' || m.parts[0].text !== "Hola, inicia la simulación según las instrucciones.").map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm flex items-start gap-3 ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
              {msg.role === 'model' && <button onClick={() => nativeSpeak(msg.parts[0].text)} className="mt-1 text-slate-400 hover:text-purple-600 transition shrink-0"><Volume2 size={16}/></button>}
              <span className="leading-relaxed text-[15px]">{msg.parts[0].text}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-500 px-5 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-sm"><Loader2 size={16} className="animate-spin text-purple-500" /> El personaje está escribiendo...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition shadow-inner"
            placeholder="Escribe tu respuesta en alemán..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={!input.trim() || loading} className="absolute right-2 top-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 transition shadow"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

const EmailSimulator = ({ instructions, initialText }) => {
  const [text, setText] = useState(initialText || "");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const evaluateEmail = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setEvaluation(null);
    
    try {
        const systemPrompt = `Eres un evaluador experto de exámenes Goethe Zertifikat A1.
El estudiante debe escribir un correo basándose en estas instrucciones: "${instructions}".
Evalúa el correo del estudiante ("${text}") de forma constructiva y amigable en español.
Tu evaluación debe tener el siguiente formato estricto en Markdown:
### 📊 Evaluación de tu correo

**1. Estructura (Saludo y Despedida):**
[Comenta si tiene un saludo (ej. Lieber/Liebe/Sehr geehrte) y una despedida (ej. Viele Grüße) adecuados]

**2. Longitud y Contenido:**
[Comenta sobre el número de palabras y si cumplió con los 3 puntos de las instrucciones]

**3. Gramática y Vocabulario:**
[Señala errores comunes de A1: posición del verbo en 2do lugar, sustantivos en mayúscula. NO corrijas todo el texto, solo da 1 o 2 consejos clave]

**4. Tu correo corregido (Sugerencia):**
[Muestra una versión mejorada y correcta del correo, nivel A1]`;

        const payload = {
            contents: [{ parts: [{ text: `Por favor evalúa este correo: \n\n${text}` }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const result = await fetchWithRetry(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const feedbackText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if(feedbackText) {
             setEvaluation(feedbackText);
        } else {
             throw new Error("No feedback received");
        }
    } catch (e) {
        console.error("Gemini Evaluation failed, falling back to local:", e);
        const words = text.trim().split(/\s+/);
        const wordCount = words.length;
        
        const hasSalutation = /hallo|liebe|lieber|sehr geehrte|guten/i.test(text);
        const hasClosing = /grüße|gruß|tschüss|bis bald/i.test(text);
        
        let feedback = "### 📊 Evaluación de tu correo (Offline)\n\n";
        
        feedback += "**1. Estructura (Saludo y Despedida):**\n";
        if (hasSalutation && hasClosing) {
          feedback += "✅ ¡Excelente! Tienes un saludo y una despedida reconocibles.\n";
        } else {
          feedback += "❌ **Atención:** Te falta un saludo adecuado (ej. *Liebe/Lieber...*) o una despedida (ej. *Viele Grüße*).\n";
        }
        
        feedback += "\n**2. Longitud del texto:**\n";
        if (wordCount >= 25) {
          feedback += `✅ Buen trabajo. Has escrito ${wordCount} palabras (se recomiendan ~30 para el Goethe A1).\n`;
        } else {
          feedback += `⚠️ Tu texto es un poco corto (${wordCount} palabras). Intenta desarrollar más los puntos.\n`;
        }
        
        feedback += "\n**3. Consejos clave:**\n";
        feedback += "* Revisa siempre que los verbos conjugados estén en la **posición 2**.\n";
        feedback += "* Escribe todos los sustantivos con **Mayúscula** inicial.\n";
        feedback += "* Verifica que hayas respondido exactamente a los 3 puntos de las instrucciones.\n";

        setEvaluation(feedback);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col mb-4">
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex flex-col gap-1">
        <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
          <Edit3 size={16} className="text-blue-600" /> Simulador de Examen (Modo Offline)
        </div>
        <p className="text-xs text-slate-500 font-medium italic mt-1 bg-white p-2 rounded border border-slate-200">
          <strong>Instrucciones:</strong> {instructions}
        </p>
      </div>
      <textarea 
        className="w-full p-4 h-40 focus:outline-none focus:bg-yellow-50/30 text-slate-700 font-medium resize-none transition-colors"
        placeholder="Escribe tu correo aquí en alemán..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
        <button 
          onClick={evaluateEmail} 
          disabled={loading || !text.trim()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
          Evaluar Correo
        </button>
      </div>
      {evaluation && (
        <div className="p-4 bg-blue-50 border-t-2 border-blue-200 animate-in slide-in-from-top-2">
          <MarkdownMessage text={evaluation} />
        </div>
      )}
    </div>
  );
};

const InteractiveQA = ({ question, answer, note }) => {
  return (
     <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4 text-slate-800">
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-2">
           <span className="font-bold text-blue-900 flex-1 pr-4">Q: {question}</span>
           <button onClick={() => nativeSpeak(question)} className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition shrink-0"><Volume2 size={18}/></button>
        </div>
        <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg mb-2">
           <span className="font-bold text-green-900 flex-1 pr-4">A: {answer}</span>
           <button onClick={() => nativeSpeak(answer)} className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition shrink-0"><Volume2 size={18}/></button>
        </div>
        {note && <p className="text-xs text-slate-500 italic mt-2">{note}</p>}
     </div>
  );
};

// --- DATA: EL VOCABULARIO COMPLETO ---
const chapters = [
  {
    id: 0, title: "Kapitel 0: Alphabet & Zahlen", icon: <List size={20} />, emoji: "🔤",
    words: [
      { de: "A, a", pron: "a", es: "A", type: "Letra", category: "Alphabet" },
      { de: "B, b", pron: "be", es: "B", type: "Letra", category: "Alphabet" },
      { de: "C, c", pron: "tse", es: "C", type: "Letra", category: "Alphabet" },
      { de: "D, d", pron: "de", es: "D", type: "Letra", category: "Alphabet" },
      { de: "E, e", pron: "e", es: "E", type: "Letra", category: "Alphabet" },
      { de: "F, f", pron: "ef", es: "F", type: "Letra", category: "Alphabet" },
      { de: "G, g", pron: "gue", es: "G", type: "Letra", category: "Alphabet" },
      { de: "H, h", pron: "ja", es: "H", type: "Letra", category: "Alphabet" },
      { de: "I, i", pron: "i", es: "I", type: "Letra", category: "Alphabet" },
      { de: "J, j", pron: "yot", es: "J", type: "Letra", category: "Alphabet" },
      { de: "K, k", pron: "ka", es: "K", type: "Letra", category: "Alphabet" },
      { de: "L, l", pron: "el", es: "L", type: "Letra", category: "Alphabet" },
      { de: "M, m", pron: "em", es: "M", type: "Letra", category: "Alphabet" },
      { de: "N, n", pron: "en", es: "N", type: "Letra", category: "Alphabet" },
      { de: "O, o", pron: "o", es: "O", type: "Letra", category: "Alphabet" },
      { de: "P, p", pron: "pe", es: "P", type: "Letra", category: "Alphabet" },
      { de: "Q, q", pron: "ku", es: "Q", type: "Letra", category: "Alphabet" },
      { de: "R, r", pron: "er", es: "R", type: "Letra", category: "Alphabet" },
      { de: "S, s", pron: "es", es: "S", type: "Letra", category: "Alphabet" },
      { de: "T, t", pron: "te", es: "T", type: "Letra", category: "Alphabet" },
      { de: "U, u", pron: "u", es: "U", type: "Letra", category: "Alphabet" },
      { de: "V, v", pron: "fau", es: "V", type: "Letra", category: "Alphabet" },
      { de: "W, w", pron: "ve", es: "W", type: "Letra", category: "Alphabet" },
      { de: "X, x", pron: "iks", es: "X", type: "Letra", category: "Alphabet" },
      { de: "Y, y", pron: "úp-si-lon", es: "Y", type: "Letra", category: "Alphabet" },
      { de: "Z, z", pron: "tset", es: "Z", type: "Letra", category: "Alphabet" },
      { de: "Ä, ä", pron: "e abierta", es: "A con diéresis", type: "Especial", category: "Alphabet" },
      { de: "Ö, ö", pron: "o cerrada", es: "O con diéresis", type: "Especial", category: "Alphabet" },
      { de: "Ü, ü", pron: "u cerrada", es: "U con diéresis", type: "Especial", category: "Alphabet" },
      { de: "ß", pron: "es-tset", es: "S fuerte", type: "Especial", category: "Alphabet" },
      { de: "null", pron: "nul", es: "cero (0)", type: "Número", category: "Zahlen" },
      { de: "eins", pron: "ains", es: "uno (1)", type: "Número", category: "Zahlen" },
      { de: "zwei", pron: "tsvai", es: "dos (2)", type: "Número", category: "Zahlen" },
      { de: "drei", pron: "drai", es: "tres (3)", type: "Número", category: "Zahlen" },
      { de: "vier", pron: "fir", es: "cuatro (4)", type: "Número", category: "Zahlen" },
      { de: "fünf", pron: "funf", es: "cinco (5)", type: "Número", category: "Zahlen" },
      { de: "sechs", pron: "zeks", es: "seis (6)", type: "Número", category: "Zahlen" },
      { de: "sieben", pron: "zí-ben", es: "siete (7)", type: "Número", category: "Zahlen" },
      { de: "acht", pron: "ajt", es: "ocho (8)", type: "Número", category: "Zahlen" },
      { de: "neun", pron: "noin", es: "nueve (9)", type: "Número", category: "Zahlen" },
      { de: "zehn", pron: "tsen", es: "diez (10)", type: "Número", category: "Zahlen" },
      { de: "elf", pron: "elf", es: "once (11)", type: "Número", category: "Zahlen" },
      { de: "zwölf", pron: "tsvolf", es: "doce (12)", type: "Número", category: "Zahlen" },
      { de: "dreizehn", pron: "drái-tsen", es: "trece (13)", type: "Número", category: "Zahlen" },
      { de: "sechzehn", pron: "zéj-tsen", es: "dieciséis (16)", type: "Número", category: "Zahlen" },
      { de: "siebzehn", pron: "zíp-tsen", es: "diecisiete (17)", type: "Número", category: "Zahlen" },
      { de: "zwanzig", pron: "tsván-tsij", es: "veinte (20)", type: "Número", category: "Zahlen" },
      { de: "einundzwanzig", pron: "ain-unt", es: "veintiuno (21)", type: "Número", category: "Zahlen" },
      { de: "dreißig", pron: "drái-sij", es: "treinta (30)", type: "Número", category: "Zahlen" },
      { de: "vierzig", pron: "fír-tsij", es: "cuarenta (40)", type: "Número", category: "Zahlen" },
      { de: "hundert", pron: "hún-dert", es: "cien (100)", type: "Número", category: "Zahlen" },
      { de: "tausend", pron: "táu-sent", es: "mil (1000)", type: "Número", category: "Zahlen" },
      { de: "der erste", pron: "érs-te", es: "primero (1.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der zweite", pron: "tsvái-te", es: "segundo (2.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der dritte", pron: "drí-te", es: "tercero (3.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der vierte", pron: "fír-te", es: "cuarto (4.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der fünfte", pron: "fúnf-te", es: "quinto (5.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der sechste", pron: "zéks-te", es: "sexto (6.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der siebte", pron: "zíp-te", es: "séptimo (7.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der achte", pron: "áj-te", es: "octavo (8.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der neunte", pron: "nóin-te", es: "noveno (9.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der zehnte", pron: "tsén-te", es: "décimo (10.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der zwanzigste", pron: "tsván-tsiks-te", es: "vigésimo (20.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "der einundzwanzigste", pron: "ain-unt", es: "vigésimo primero (21.)", type: "Ordinal", category: "Ordnungszahlen" },
      { de: "die Hälfte", pron: "di jélf-te", es: "la mitad", type: "Sustantivo", category: "Zahlen" },
      { de: "das Viertel", pron: "das fír-tel", es: "el cuarto (1/4)", type: "Sustantivo", category: "Zahlen" },
      { de: "plus / minus", pron: "plus / mí-nus", es: "más / menos", type: "Adverbio", category: "Zahlen" },
      { de: "mal / durch", pron: "mal / durj", es: "por / dividido entre", type: "Adverbio", category: "Zahlen" },
      { de: "das Prozent", pron: "das pro-tsént", es: "el por ciento (%)", type: "Sustantivo", category: "Zahlen" }
    ]
  },
  {
    id: 1, title: "Kapitel 1: Zeit & Datum", icon: <Clock size={20} />, emoji: "⏰",
    words: [
      { de: "die Woche", pron: "di vó-je", es: "la semana", type: "Sustantivo (Fem)", category: "Tage" },
      { de: "Montag", pron: "món-tak", es: "lunes", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "Dienstag", pron: "díns-tak", es: "martes", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "Mittwoch", pron: "mít-voj", es: "miércoles", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "Donnerstag", pron: "dó-ners-tak", es: "jueves", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "Freitag", pron: "frái-tak", es: "viernes", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "Samstag", pron: "sáms-tak", es: "sábado", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "Sonntag", pron: "són-tak", es: "domingo", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "am + Tag", pron: "am tak", es: "en el + día", type: "Preposición", category: "Tage" },
      { de: "das Wochenende", pron: "das vó-jen-én-de", es: "el fin de semana", type: "Sustantivo (Neutro)", category: "Tage" },
      { de: "am Wochenende", pron: "am vó-jen-én-de", es: "el fin de semana (en el)", type: "Frase", category: "Tage" },
      { de: "der Feiertag", pron: "der fái-er-tak", es: "el día festivo", type: "Sustantivo (Masc)", category: "Tage" },
      { de: "das Jahr", pron: "das yar", es: "el año", type: "Sustantivo (Neutro)", category: "Monate" },
      { de: "der Monat", pron: "der mó-nat", es: "el mes", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "Januar", pron: "yá-nu-ar", es: "enero", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "Februar", pron: "fé-bru-ar", es: "febrero", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "März", pron: "merts", es: "marzo", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "April", pron: "a-príl", es: "abril", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "Mai", pron: "mai", es: "mayo", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "Juni", pron: "yú-ni", es: "junio", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "Juli", pron: "yú-li", es: "julio", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "August", pron: "au-gúst", es: "agosto", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "September", pron: "sep-tém-ber", es: "septiembre", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "Oktober", pron: "ok-tó-ber", es: "octubre", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "November", pron: "no-vém-ber", es: "noviembre", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "Dezember", pron: "de-tsém-ber", es: "diciembre", type: "Sustantivo (Masc)", category: "Monate" },
      { de: "der Frühling", pron: "der frú-ling", es: "la primavera", type: "Sustantivo (Masc)", category: "Jahreszeiten" },
      { de: "der Sommer", pron: "der só-mer", es: "el verano", type: "Sustantivo (Masc)", category: "Jahreszeiten" },
      { de: "der Herbst", pron: "der jérpst", es: "el otoño", type: "Sustantivo (Masc)", category: "Jahreszeiten" },
      { de: "der Winter", pron: "der vín-ter", es: "el invierno", type: "Sustantivo (Masc)", category: "Jahreszeiten" },
      { de: "der Tag", pron: "der tak", es: "el día", type: "Sustantivo (Masc)", category: "Tageszeiten" },
      { de: "der Morgen", pron: "der mór-guen", es: "la mañana", type: "Sustantivo (Masc)", category: "Tageszeiten" },
      { de: "der Vormittag", pron: "der fór-mí-tak", es: "antes del mediodía", type: "Sustantivo (Masc)", category: "Tageszeiten" },
      { de: "der Mittag", pron: "der mí-tak", es: "el mediodía", type: "Sustantivo (Masc)", category: "Tageszeiten" },
      { de: "der Nachmittag", pron: "der náj-mí-tak", es: "la tarde", type: "Sustantivo (Masc)", category: "Tageszeiten" },
      { de: "der Abend", pron: "der á-bent", es: "el atardecer / noche", type: "Sustantivo (Masc)", category: "Tageszeiten" },
      { de: "die Nacht", pron: "di najt", es: "la noche profunda", type: "Sustantivo (Fem)", category: "Tageszeiten" },
      { de: "am Morgen", pron: "am mór-guen", es: "por la mañana", type: "Frase", category: "Tageszeiten" },
      { de: "am Vormittag", pron: "am fór-mí-tak", es: "por la mañana (tarde)", type: "Frase", category: "Tageszeiten" },
      { de: "am Mittag", pron: "am mí-tak", es: "al mediodía", type: "Frase", category: "Tageszeiten" },
      { de: "am Nachmittag", pron: "am náj-mí-tak", es: "por la tarde", type: "Frase", category: "Tageszeiten" },
      { de: "am Abend", pron: "am á-bent", es: "por el atardecer", type: "Frase", category: "Tageszeiten" },
      { de: "in der Nacht", pron: "in der najt", es: "en la noche", type: "Frase", category: "Tageszeiten" },
      { de: "die Uhrzeit", pron: "di úr-tsait", es: "la hora", type: "Sustantivo (Fem)", category: "Uhrzeit" },
      { de: "Wann?", pron: "van", es: "¿Cuándo?", type: "Pregunta", category: "Uhrzeit" },
      { de: "Wie spät ist es?", pron: "vi shpét ist es", es: "¿Qué hora es?", type: "Pregunta", category: "Uhrzeit" },
      { de: "Wie viel Uhr ist es?", pron: "vi fil ur ist es", es: "¿Qué hora es? (formal)", type: "Pregunta", category: "Uhrzeit" },
      { de: "ein Uhr", pron: "áin ur", es: "la una", type: "Hora", category: "Uhrzeit" },
      { de: "halb zwei", pron: "jalp tsuái", es: "la una y media", type: "Hora", category: "Uhrzeit" },
      { de: "Viertel vor drei", pron: "fír-tel for dray", es: "tres menos cuarto", type: "Hora", category: "Uhrzeit" },
      { de: "kurz vor 4", pron: "kurts for fír", es: "poco antes de las 4", type: "Frase", category: "Uhrzeit" },
      { de: "gleich 4", pron: "gláij fír", es: "casi las 4", type: "Frase", category: "Uhrzeit" },
      { de: "genau 4 Uhr", pron: "gue-náu fír ur", es: "exactamente las 4", type: "Frase", category: "Uhrzeit" },
      { de: "fünf nach 4", pron: "fúnf naj fír", es: "cuatro y cinco", type: "Frase", category: "Uhrzeit" },
      { de: "um 3 Uhr", pron: "um dray ur", es: "a las 3", type: "Frase", category: "Uhrzeit" },
      { de: "von 2 bis 3 Uhr", pron: "fon tsuái bis dray ur", es: "de 2 a 3", type: "Frase", category: "Uhrzeit" },
      { de: "ab 3 Uhr", pron: "ap dray ur", es: "a partir de las 3", type: "Frase", category: "Uhrzeit" },
      { de: "anfangen", pron: "án-fan-guen", es: "empezar / comenzar", type: "Verbo", category: "Alltag" },
      { de: "der Anfang", pron: "der án-fang", es: "el comienzo", type: "Sustantivo (Masc)", category: "Alltag" },
      { de: "aufhören", pron: "áuf-jór-ren", es: "terminar / cesar", type: "Verbo", category: "Alltag" },
      { de: "das Ende", pron: "das én-de", es: "el final", type: "Sustantivo (Neutro)", category: "Alltag" },
      { de: "dauern", pron: "dáu-ern", es: "durar", type: "Verbo", category: "Alltag" },
      { de: "der Alltag", pron: "der ál-tak", es: "el día a día / rutina", type: "Sustantivo", category: "Alltag" },
      { de: "pünktlich", pron: "púnkt-lij", es: "puntual", type: "Adjetivo", category: "Alltag" },
      { de: "die Verspätung", pron: "fer-shpé-tung", es: "el retraso", type: "Sustantivo", category: "Alltag" },
      { de: "regelmäßig", pron: "ré-guel-mé-sij", es: "regularmente", type: "Adverbio", category: "Alltag" }
    ]
  },
  {
    id: 2, title: "Kapitel 2: Personen & Kontakte", icon: <BookOpen size={20} />, emoji: "👤",
    words: [
      { de: "der Vorname", pron: "der fór-na-me", es: "primer nombre", type: "Sustantivo (Masc)", category: "Identität" },
      { de: "der Nachname", pron: "naj-na-me", es: "apellido", type: "Sustantivo (Masc)", category: "Identität" },
      { de: "heißen", pron: "jái-sen", es: "llamarse", type: "Verbo", category: "Identität" },
      { de: "buchstabieren", pron: "buj-sta-bí-ren", es: "deletrear", type: "Verbo", category: "Identität" },
      { de: "die Frau", pron: "di frau", es: "la mujer / señora", type: "Sustantivo (Fem)", category: "Personen" },
      { de: "der Mann", pron: "der man", es: "el hombre / marido", type: "Sustantivo (Masc)", category: "Personen" },
      { de: "die Dame", pron: "di dá-me", es: "la dama", type: "Sustantivo (Fem)", category: "Personen" },
      { de: "der Herr", pron: "der jer", es: "el señor", type: "Sustantivo (Masc)", category: "Personen" },
      { de: "männlich / weiblich", pron: "mén-lij / vái-blij", es: "masculino / femenino", type: "Adjetivo", category: "Personen" },
      { de: "das Mädchen", pron: "das mét-jen", es: "la niña", type: "Sustantivo (Neutro)", category: "Personen" },
      { de: "der Junge", pron: "der yún-gue", es: "el niño", type: "Sustantivo (Masc)", category: "Personen" },
      { de: "die Adresse", pron: "di a-dré-se", es: "la dirección", type: "Sustantivo (Fem)", category: "Kontaktdaten" },
      { de: "der Wohnort", pron: "der vón-ort", es: "lugar de residencia", type: "Sustantivo (Masc)", category: "Kontaktdaten" },
      { de: "wohnen / leben", pron: "vó-nen / lé-ben", es: "vivir / residir", type: "Verbo", category: "Kontaktdaten" },
      { de: "die Straße", pron: "di shtrá-se", es: "la calle", type: "Sustantivo (Fem)", category: "Kontaktdaten" },
      { de: "der Platz", pron: "der plats", es: "la plaza", type: "Sustantivo (Masc)", category: "Kontaktdaten" },
      { de: "die Nummer", pron: "di nú-mer", es: "el número / de casa", type: "Sustantivo (Fem)", category: "Kontaktdaten" },
      { de: "die Stadt", pron: "di shtat", es: "la ciudad", type: "Sustantivo (Fem)", category: "Kontaktdaten" },
      { de: "die Postleitzahl", pron: "di póst-lait-tsal", es: "código postal", type: "Sustantivo (Fem)", category: "Kontaktdaten" },
      { de: "das Dorf / das Land", pron: "das dorf / lant", es: "el pueblo / el país", type: "Sustantivo (Neutro)", category: "Kontaktdaten" },
      { de: "das Telefon", pron: "das te-le-fón", es: "el teléfono", type: "Sustantivo (Neutro)", category: "Kontaktdaten" },
      { de: "telefonieren / anrufen", pron: "te-le-fo-ní-ren", es: "hablar por tel. / llamar", type: "Verbo", category: "Kontaktdaten" },
      { de: "die E-Mail", pron: "di í-meil", es: "el correo electrónico", type: "Sustantivo (Fem)", category: "Kontaktdaten" },
      { de: "Ich bin geboren am...", pron: "ij bin gue-bó-ren am", es: "Nací el...", type: "Frase", category: "Lebenslauf" },
      { de: "das Geburtsdatum", pron: "das gue-búrts-dá-tum", es: "fecha de nacimiento", type: "Sustantivo (Neutro)", category: "Lebenslauf" },
      { de: "der Geburtstag", pron: "der gue-búrts-tak", es: "el cumpleaños", type: "Sustantivo (Masc)", category: "Lebenslauf" },
      { de: "geboren in", pron: "gue-bó-ren in", es: "nacido en", type: "Frase", category: "Lebenslauf" },
      { de: "Jahre alt sein", pron: "yá-re alt sáin", es: "tener ... años", type: "Frase", category: "Lebenslauf" },
      { de: "die Familie", pron: "di fa-mí-lie", es: "la familia", type: "Sustantivo (Fem)", category: "Familie" },
      { de: "der Familienstand", pron: "der fa-mí-li-en-shtant", es: "estado civil", type: "Sustantivo (Masc)", category: "Familie" },
      { de: "verheiratet / ledig", pron: "fer-jái-ra-tet", es: "casado/a / soltero/a", type: "Adjetivo", category: "Familie" },
      { de: "heiraten", pron: "jái-ra-ten", es: "casarse", type: "Verbo", category: "Familie" },
      { de: "die Ehefrau / der Ehemann", pron: "di é-e-frau", es: "esposa / esposo", type: "Sustantivo", category: "Familie" },
      { de: "die Hochzeit", pron: "di jój-tsait", es: "la boda", type: "Sustantivo (Fem)", category: "Familie" },
      { de: "der Vater / die Mutter", pron: "der fá-ter", es: "padre / madre", type: "Sustantivo", category: "Familie" },
      { de: "die Eltern", pron: "di él-tern", es: "los padres", type: "Sustantivo (Plural)", category: "Familie" },
      { de: "das Kind / Baby", pron: "das kint / béi-bi", es: "el niño / bebé", type: "Sustantivo (Neutro)", category: "Familie" },
      { de: "der Sohn / die Tochter", pron: "der son / tój-ter", es: "hijo / hija", type: "Sustantivo", category: "Familie" },
      { de: "der Bruder / Schwester", pron: "der brú-der", es: "hermano / hermana", type: "Sustantivo", category: "Familie" },
      { de: "die Geschwister", pron: "di gue-shvís-ter", es: "los hermanos", type: "Sustantivo (Plural)", category: "Familie" },
      { de: "die Oma / der Opa", pron: "ó-ma / ó-pa", es: "abuela / abuelo", type: "Sustantivo", category: "Familie" },
      { de: "die Großeltern", pron: "grós-él-tern", es: "los abuelos", type: "Sustantivo (Plural)", category: "Familie" },
      { de: "die Verwandten", pron: "fer-ván-ten", es: "los parientes", type: "Sustantivo (Plural)", category: "Familie" },
      { de: "der Freund / Freundin", pron: "froint", es: "amigo / amiga", type: "Sustantivo", category: "Soziales" },
      { de: "der/die Bekannte", pron: "be-kán-te", es: "el/la conocido/a", type: "Sustantivo", category: "Soziales" },
      { de: "der/die Erwachsene", pron: "er-vák-se-ne", es: "el/la adulto/a", type: "Sustantivo", category: "Soziales" },
      { de: "der Jugendliche", pron: "yú-guent-lí-je", es: "el joven", type: "Sustantivo (Masc)", category: "Soziales" },
      { de: "der Pass / Reisepass", pron: "pas", es: "pasaporte", type: "Sustantivo (Masc)", category: "Dokumente" },
      { de: "der Ausweis", pron: "áus-vais", es: "documento de identidad", type: "Sustantivo (Masc)", category: "Dokumente" },
      { de: "die Papiere", pron: "pa-pí-re", es: "los papeles/documentos", type: "Sustantivo (Plural)", category: "Dokumente" },
      { de: "das Formular", pron: "for-mu-lár", es: "formulario", type: "Sustantivo (Neutro)", category: "Dokumente" },
      { de: "ausfüllen", pron: "áus-fú-len", es: "rellenar", type: "Verbo", category: "Dokumente" },
      { de: "die Staatsangehörigkeit", pron: "shtáts-án-gue-jó-rij-kait", es: "nacionalidad", type: "Sustantivo (Fem)", category: "Dokumente" },
      { de: "der Führerschein", pron: "fú-rer-sháin", es: "licencia de conducir", type: "Sustantivo (Masc)", category: "Dokumente" },
      { de: "unterschreiben", pron: "un-ter-shrái-ben", es: "firmar", type: "Verbo", category: "Dokumente" },
      { de: "die Unterschrift", pron: "ún-ter-shrift", es: "la firma", type: "Sustantivo (Fem)", category: "Dokumente" },
      { de: "das Alter", pron: "ál-ter", es: "edad", type: "Sustantivo (Neutro)", category: "Lebenslauf" },
      { de: "der Geburtsort", pron: "gue-búrts-ort", es: "lugar de nacimiento", type: "Sustantivo (Masc)", category: "Lebenslauf" },
      { de: "geschieden", pron: "gue-shí-den", es: "divorciado/a", type: "Adjetivo", category: "Familie" },
      { de: "verwitwet", pron: "fer-vít-vet", es: "viudo/a", type: "Adjetivo", category: "Familie" },
      { de: "der Ausländer", pron: "áus-len-der", es: "el extranjero", type: "Sustantivo", category: "Gesellschaft" },
      { de: "die Gesellschaft", pron: "gue-sél-shaft", es: "la sociedad", type: "Sustantivo", category: "Gesellschaft" },
      { de: "der Rentner", pron: "rént-ner", es: "el jubilado", type: "Sustantivo", category: "Gesellschaft" },
      { de: "sich freuen", pron: "sij frói-en", es: "alegrarse", type: "Verbo Reflexivo", category: "Gefühle" },
      { de: "das Gefühl", pron: "das gue-fúl", es: "el sentimiento", type: "Sustantivo", category: "Gefühle" }
    ]
  },
  {
    id: 3, title: "Kapitel 3: Wohnen", icon: <Home size={20} />, emoji: "🏠",
    words: [
      { de: "das Haus", pron: "das jáus", es: "la casa", type: "Sustantivo (Neutro)", category: "Gebäude" },
      { de: "die Wohnung", pron: "di vó-nung", es: "el apartamento", type: "Sustantivo (Fem)", category: "Gebäude" },
      { de: "das Hochhaus", pron: "das jój-jáus", es: "edificio de gran altura", type: "Sustantivo (Neutro)", category: "Gebäude" },
      { de: "die Treppe", pron: "di tré-pe", es: "la escalera", type: "Sustantivo (Fem)", category: "Gebäude" },
      { de: "der Aufzug / Lift", pron: "der áuf-tsuk", es: "el ascensor", type: "Sustantivo (Masc)", category: "Gebäude" },
      { de: "der Stock", pron: "der shtok", es: "el piso / planta", type: "Sustantivo", category: "Gebäude" },
      { de: "das Erdgeschoss", pron: "das ért-gue-shós", es: "la planta baja", type: "Sustantivo (Neutro)", category: "Gebäude" },
      { de: "die Miete", pron: "di mí-te", es: "el alquiler", type: "Sustantivo (Fem)", category: "Mieten" },
      { de: "die Nebenkosten", pron: "di né-ben-kós-ten", es: "gastos adicionales", type: "Sustantivo (Plural)", category: "Mieten" },
      { de: "die Heizkosten", pron: "di jáits-kós-ten", es: "gastos de calefacción", type: "Sustantivo (Plural)", category: "Mieten" },
      { de: "der Mieter / Vermieter", pron: "mí-ter / fer-mí-ter", es: "inquilino / arrendador", type: "Sustantivo", category: "Mieten" },
      { de: "mieten / vermieten", pron: "mí-ten", es: "alquilar / dar en alquiler", type: "Verbo", category: "Mieten" },
      { de: "umziehen", pron: "úm-tsí-en", es: "mudarse", type: "Verbo separable", category: "Mieten" },
      { de: "einziehen / ausziehen", pron: "áin-tsí-en", es: "mudarse a / de", type: "Verbo", category: "Mieten" },
      { de: "der Umzug", pron: "der úm-tsuk", es: "la mudanza", type: "Sustantivo (Masc)", category: "Mieten" },
      { de: "die Anzeige", pron: "di án-tsái-gue", es: "el anuncio", type: "Sustantivo (Fem)", category: "Mieten" },
      { de: "besichtigen", pron: "be-shíj-ti-guen", es: "inspeccionar / visita", type: "Verbo", category: "Mieten" },
      { de: "der Schlüssel", pron: "der shlú-sel", es: "la llave", type: "Sustantivo (Masc)", category: "Mieten" },
      { de: "das Zimmer", pron: "das tsí-mer", es: "la habitación", type: "Sustantivo (Neutro)", category: "Räume" },
      { de: "die Küche", pron: "di kú-je", es: "la cocina", type: "Sustantivo (Fem)", category: "Räume" },
      { de: "das Bad", pron: "das bat", es: "el baño", type: "Sustantivo (Neutro)", category: "Räume" },
      { de: "das Schlafzimmer", pron: "shláf-tsí-mer", es: "el dormitorio", type: "Sustantivo (Neutro)", category: "Räume" },
      { de: "das Wohnzimmer", pron: "vón-tsí-mer", es: "la sala de estar", type: "Sustantivo (Neutro)", category: "Räume" },
      { de: "das Kinderzimmer", pron: "kín-der-tsí-mer", es: "cuarto de niños", type: "Sustantivo (Neutro)", category: "Räume" },
      { de: "der Flur", pron: "der flur", es: "pasillo / corredor", type: "Sustantivo (Masc)", category: "Räume" },
      { de: "der Balkon", pron: "der bal-kón", es: "el balcón", type: "Sustantivo (Masc)", category: "Räume" },
      { de: "die Terrasse", pron: "di te-rá-se", es: "la terraza", type: "Sustantivo (Fem)", category: "Räume" },
      { de: "der Garten", pron: "der gár-ten", es: "el jardín", type: "Sustantivo (Masc)", category: "Räume" },
      { de: "die Garage", pron: "di ga-rá-je", es: "el garaje", type: "Sustantivo (Fem)", category: "Räume" },
      { de: "der Keller", pron: "der ké-ler", es: "el sótano", type: "Sustantivo (Masc)", category: "Räume" },
      { de: "das Licht", pron: "das lijt", es: "la luz", type: "Sustantivo (Neutro)", category: "Aktivitäten" },
      { de: "anmachen / ausmachen", pron: "án-má-jen", es: "encender / apagar", type: "Verbo", category: "Aktivitäten" },
      { de: "öffnen / schließen", pron: "óf-nen", es: "abrir / cerrar (formal)", type: "Verbo", category: "Aktivitäten" },
      { de: "aufmachen / zumachen", pron: "áuf-má-jen", es: "abrir / cerrar", type: "Verbo separable", category: "Aktivitäten" },
      { de: "putzen / reinigen", pron: "pút-tsen", es: "limpiar", type: "Verbo", category: "Aktivitäten" },
      { de: "kaputt", pron: "ka-pút", es: "roto / descompuesto", type: "Adjetivo", category: "Aktivitäten" },
      { de: "reparieren", pron: "re-pa-rí-ren", es: "reparar", type: "Verbo", category: "Aktivitäten" },
      { de: "das Möbelstück", pron: "das mó-bel-shtuk", es: "el mueble", type: "Sustantivo", category: "Möbel" },
      { de: "der Tisch", pron: "tish", es: "la mesa", type: "Sustantivo (Masc)", category: "Möbel" },
      { de: "der Stuhl", pron: "shtul", es: "la silla", type: "Sustantivo (Masc)", category: "Möbel" },
      { de: "der Schrank", pron: "shrank", es: "el armario", type: "Sustantivo (Masc)", category: "Möbel" },
      { de: "das Bett", pron: "bet", es: "la cama", type: "Sustantivo (Neutro)", category: "Möbel" },
      { de: "der Spiegel", pron: "shpí-guel", es: "el espejo", type: "Sustantivo (Masc)", category: "Möbel" },
      { de: "der Teppich", pron: "té-pij", es: "la alfombra", type: "Sustantivo (Masc)", category: "Möbel" },
      { de: "gemütlich", pron: "gue-mút-lij", es: "acogedor", type: "Adjetivo", category: "Adjektive" }
    ]
  },
  {
    id: 4, title: "Kapitel 4: Freizeit", icon: <Activity size={20} />, emoji: "⚽",
    words: [
      { de: "die Freizeit", pron: "di frái-tsait", es: "el tiempo libre", type: "Sustantivo (Fem)", category: "Allgemein" },
      { de: "das Hobby", pron: "das jó-bi", es: "el pasatiempo", type: "Sustantivo (Neutro)", category: "Allgemein" },
      { de: "spielen", pron: "shpi-len", es: "jugar / tocar", type: "Verbo", category: "Aktivitäten" },
      { de: "Fußball spielen", pron: "fús-bal shpi-len", es: "jugar fútbol", type: "Frase", category: "Aktivitäten" },
      { de: "der Ball", pron: "der bal", es: "el balón", type: "Sustantivo (Masc)", category: "Gegenstände" },
      { de: "Karten spielen", pron: "kár-ten shpi-len", es: "jugar cartas", type: "Frase", category: "Aktivitäten" },
      { de: "Musik hören", pron: "mu-sík jó-ren", es: "escuchar música", type: "Frase", category: "Aktivitäten" },
      { de: "die CD", pron: "di tse-dé", es: "el CD", type: "Sustantivo (Fem)", category: "Gegenstände" },
      { de: "wandern", pron: "ván-dern", es: "hacer senderismo", type: "Verbo", category: "Aktivitäten" },
      { de: "schwimmen", pron: "shví-men", es: "nadar", type: "Verbo", category: "Aktivitäten" },
      { de: "lesen", pron: "lé-sen", es: "leer", type: "Verbo", category: "Aktivitäten" },
      { de: "das Buch", pron: "das buj", es: "el libro", type: "Sustantivo (Neutro)", category: "Gegenstände" },
      { de: "die Zeitung", pron: "di tsái-tung", es: "el periódico", type: "Sustantivo (Fem)", category: "Gegenstände" },
      { de: "fernsehen", pron: "férn-se-en", es: "ver televisión", type: "Verbo separable", category: "Aktivitäten" },
      { de: "tanzen", pron: "tán-tsen", es: "bailar", type: "Verbo", category: "Aktivitäten" },
      { de: "der Computer", pron: "kom-piú-ter", es: "computador", type: "Sustantivo (Masc)", category: "Gegenstände" },
      { de: "der Sport", pron: "shport", es: "deporte", type: "Sustantivo", category: "Aktivitäten" },
      { de: "ins Kino gehen", pron: "ins kí-no", es: "ir al cine", type: "Frase", category: "Ausgehen" },
      { de: "einen Film sehen", pron: "film sé-en", es: "ver película", type: "Frase", category: "Ausgehen" },
      { de: "Rad fahren", pron: "rat fá-ren", es: "montar bicicleta", type: "Frase", category: "Aktivitäten" },
      { de: "spazieren gehen", pron: "shpa-tsí-ren", es: "pasear", type: "Frase", category: "Aktivitäten" },
      { de: "in die Disco gehen", pron: "in di dís-ko", es: "ir a discoteca", type: "Frase", category: "Ausgehen" },
      { de: "das Museum", pron: "mu-sé-um", es: "museo", type: "Sustantivo (Neutro)", category: "Orte" },
      { de: "der Verein", pron: "fer-áin", es: "club / asociación", type: "Sustantivo (Masc)", category: "Orte" },
      { de: "das Schwimmbad", pron: "shvím-bat", es: "la piscina", type: "Sustantivo (Neutro)", category: "Orte" },
      { de: "gefallen", pron: "gue-fá-len", es: "gustar", type: "Verbo", category: "Adjektive & Gefühle" },
      { de: "schön", pron: "shón", es: "bonito", type: "Adjetivo", category: "Adjektive & Gefühle" },
      { de: "mögen", pron: "mó-guen", es: "gustar / me gusta", type: "Verbo", category: "Adjektive & Gefühle" },
      { de: "sich treffen", pron: "tré-fen", es: "reunirse/encontrarse", type: "Verbo", category: "Soziales" }
    ]
  },
  {
    id: 5, title: "Kapitel 5: Essen & Trinken", icon: <Coffee size={20} />, emoji: "🍽️",
    words: [
      { de: "das Essen / essen", pron: "das é-sen", es: "comida / comer", type: "Sustantivo / Verbo", category: "Mahlzeiten" },
      { de: "das Frühstück", pron: "frú-shtuk", es: "desayuno", type: "Sustantivo", category: "Mahlzeiten" },
      { de: "das Mittagessen", pron: "mí-tak-é-sen", es: "almuerzo", type: "Sustantivo (Neutro)", category: "Mahlzeiten" },
      { de: "zu Mittag essen", pron: "tsu mí-tak é-sen", es: "almorzar", type: "Frase", category: "Mahlzeiten" },
      { de: "das Abendessen", pron: "á-bent-é-sen", es: "cena", type: "Sustantivo (Neutro)", category: "Mahlzeiten" },
      { de: "zu Abend essen", pron: "tsu á-bent é-sen", es: "cenar", type: "Frase", category: "Mahlzeiten" },
      { de: "der Hunger", pron: "jún-guer", es: "hambre", type: "Sustantivo", category: "Gefühle" },
      { de: "der Durst", pron: "durst", es: "sed", type: "Sustantivo", category: "Gefühle" },
      { de: "das Lebensmittel", pron: "lé-bens-mí-tel", es: "alimento", type: "Sustantivo (Neutro)", category: "Lebensmittel" },
      { de: "das Brot", pron: "brot", es: "pan", type: "Sustantivo (Neutro)", category: "Lebensmittel" },
      { de: "die Butter", pron: "bú-ter", es: "mantequilla", type: "Sustantivo (Fem)", category: "Lebensmittel" },
      { de: "der Käse", pron: "ké-se", es: "queso", type: "Sustantivo (Masc)", category: "Lebensmittel" },
      { de: "das Fleisch", pron: "fláish", es: "carne", type: "Sustantivo (Neutro)", category: "Lebensmittel" },
      { de: "der Fisch", pron: "der fish", es: "pescado", type: "Sustantivo (Masc)", category: "Lebensmittel" },
      { de: "die Kartoffel", pron: "kar-tó-fel", es: "papa", type: "Sustantivo (Fem)", category: "Lebensmittel" },
      { de: "der Reis", pron: "rais", es: "arroz", type: "Sustantivo (Masc)", category: "Lebensmittel" },
      { de: "die Suppe", pron: "di sú-pe", es: "sopa", type: "Sustantivo (Fem)", category: "Lebensmittel" },
      { de: "das Gemüse", pron: "gue-mú-se", es: "verdura", type: "Sustantivo (Neutro)", category: "Lebensmittel" },
      { de: "das Obst", pron: "opst", es: "fruta", type: "Sustantivo (Neutro)", category: "Lebensmittel" },
      { de: "die Tomate", pron: "to-má-te", es: "tomate", type: "Sustantivo (Fem)", category: "Lebensmittel" },
      { de: "der Apfel", pron: "áp-fel", es: "manzana", type: "Sustantivo (Masc)", category: "Lebensmittel" },
      { de: "die Orange", pron: "o-rán-je", es: "naranja", type: "Sustantivo (Fem)", category: "Lebensmittel" },
      { de: "der Kuchen", pron: "kú-jen", es: "pastel", type: "Sustantivo", category: "Lebensmittel" },
      { de: "das Getränk", pron: "gue-trénk", es: "bebida", type: "Sustantivo (Neutro)", category: "Getränke" },
      { de: "das Wasser", pron: "vá-ser", es: "agua", type: "Sustantivo", category: "Getränke" },
      { de: "der Kaffee", pron: "ká-fe", es: "café", type: "Sustantivo (Masc)", category: "Getränke" },
      { de: "der Tee", pron: "te", es: "té", type: "Sustantivo (Masc)", category: "Getränke" },
      { de: "die Milch", pron: "di milj", es: "leche", type: "Sustantivo (Fem)", category: "Getränke" },
      { de: "das Bier", pron: "bir", es: "cerveza", type: "Sustantivo", category: "Getränke" },
      { de: "der Wein", pron: "vain", es: "vino", type: "Sustantivo", category: "Getränke" },
      { de: "der Teller", pron: "té-ler", es: "plato", type: "Sustantivo", category: "Geschirr" },
      { de: "die Tasse", pron: "tá-se", es: "taza", type: "Sustantivo (Fem)", category: "Geschirr" },
      { de: "das Messer", pron: "mé-ser", es: "cuchillo", type: "Sustantivo", category: "Geschirr" },
      { de: "die Gabel", pron: "gá-bel", es: "tenedor", type: "Sustantivo", category: "Geschirr" },
      { de: "der Löffel", pron: "ló-fel", es: "cuchara", type: "Sustantivo", category: "Geschirr" },
      { de: "die Flasche", pron: "flá-she", es: "botella", type: "Sustantivo (Fem)", category: "Geschirr" },
      { de: "trinken / kochen", pron: "trín-ken / kó-jen", es: "beber / cocinar", type: "Verbo", category: "Aktionen" },
      { de: "schmecken", pron: "shmé-ken", es: "saber (sabor)", type: "Verbo", category: "Aktionen" },
      { de: "mögen", pron: "mó-guen", es: "gustar (comida)", type: "Verbo", category: "Aktionen" },
      { de: "Ich möchte", pron: "mój-te", es: "Me gustaría", type: "Frase", category: "Im Restaurant" },
      { de: "Was möchten Sie?", pron: "vas mój-ten si", es: "¿Qué le gustaría?", type: "Frase", category: "Im Restaurant" },
      { de: "Ich hätte gern", pron: "ij jé-te guern", es: "Quisiera...", type: "Frase", category: "Im Restaurant" },
      { de: "nehmen", pron: "né-men", es: "tomar / pedir", type: "Verbo", category: "Im Restaurant" },
      { de: "das Restaurant", pron: "res-to-rán", es: "restaurante", type: "Sustantivo (Neutro)", category: "Im Restaurant" },
      { de: "die Speisekarte", pron: "shpái-se-kár-te", es: "menú / carta", type: "Sustantivo (Fem)", category: "Im Restaurant" },
      { de: "bestellen", pron: "be-shté-len", es: "pedir / ordenar", type: "Verbo", category: "Im Restaurant" },
      { de: "Guten Appetit", pron: "gú-ten a-pe-tít", es: "¡Buen provecho!", type: "Frase", category: "Im Restaurant" },
      { de: "die Rechnung", pron: "réj-nung", es: "la cuenta", type: "Sustantivo (Fem)", category: "Im Restaurant" },
      { de: "bezahlen", pron: "be-tsá-len", es: "pagar", type: "Verbo", category: "Im Restaurant" },
      { de: "getrennt / zusammen", pron: "gue-trént / tsu-sá-men", es: "separado / juntos", type: "Adjetivo", category: "Im Restaurant" },
      { de: "Stimmt so", pron: "shtimt so", es: "Así está bien (propina)", type: "Frase", category: "Im Restaurant" },
      { de: "das Gericht", pron: "das gue-ríjt", es: "el plato preparado", type: "Sustantivo", category: "Kochen" },
      { de: "der Topf / die Pfanne", pron: "topf / pfá-ne", es: "la olla / la sartén", type: "Sustantivo", category: "Kochen" },
      { de: "probieren", pron: "pro-bí-ren", es: "probar (comida)", type: "Verbo", category: "Kochen" },
      { de: "scharf / süß", pron: "sharf / sus", es: "picante / dulce", type: "Adjetivo", category: "Geschmack" },
      { de: "satt sein", pron: "sat sáin", es: "estar lleno", type: "Frase", category: "Gefühle" }
    ]
  },
  {
    id: 6, title: "Kapitel 6: Einkaufen", icon: <ShoppingCart size={20} />, emoji: "🛒",
    words: [
      { de: "das Geschäft", pron: "gue-shéft", es: "tienda / negocio", type: "Sustantivo", category: "Orte" },
      { de: "der Laden", pron: "lá-den", es: "tienda pequeña", type: "Sustantivo", category: "Orte" },
      { de: "die Bäckerei", pron: "bé-ke-rái", es: "panadería", type: "Sustantivo (Fem)", category: "Orte" },
      { de: "der Supermarkt", pron: "sú-per-markt", es: "supermercado", type: "Sustantivo (Masc)", category: "Orte" },
      { de: "geöffnet", pron: "gue-óf-net", es: "abierto", type: "Adjetivo", category: "Status" },
      { de: "das Angebot", pron: "án-gue-bot", es: "oferta", type: "Sustantivo (Neutro)", category: "Preis" },
      { de: "günstig", pron: "gúns-tij", es: "económico", type: "Adjetivo", category: "Preis" },
      { de: "billig", pron: "bí-lij", es: "barato", type: "Adjetivo", category: "Preis" },
      { de: "teuer", pron: "tói-er", es: "caro", type: "Adjetivo", category: "Preis" },
      { de: "brauchen", pron: "bráu-jen", es: "necesitar", type: "Verbo", category: "Aktionen" },
      { de: "das Kilo", pron: "kí-lo", es: "kilo", type: "Sustantivo", category: "Menge" },
      { de: "das Pfund", pron: "pfund", es: "libra (500g)", type: "Sustantivo", category: "Menge" },
      { de: "das Gramm", pron: "gram", es: "gramo", type: "Sustantivo", category: "Menge" },
      { de: "kosten", pron: "kós-ten", es: "costar", type: "Verbo", category: "Preis" },
      { de: "der Preis", pron: "práis", es: "precio", type: "Sustantivo", category: "Preis" },
      { de: "die Kasse", pron: "ká-se", es: "caja", type: "Sustantivo (Fem)", category: "Bezahlen" },
      { de: "das Geld", pron: "gueld", es: "dinero", type: "Sustantivo", category: "Bezahlen" },
      { de: "der Verkäufer", pron: "fer-kói-fer", es: "vendedor", type: "Sustantivo", category: "Personen" },
      { de: "bestellen", pron: "be-shté-len", es: "pedir (online)", type: "Verbo", category: "Aktionen" },
      { de: "die Überweisung", pron: "ú-ber-vái-sung", es: "transferencia", type: "Sustantivo", category: "Bezahlen" },
      { de: "das Wechselgeld", pron: "vék-sel-guelt", es: "el cambio / vueltas", type: "Sustantivo", category: "Bezahlen" },
      { de: "umtauschen", pron: "úm-táu-shen", es: "cambiar (artículo)", type: "Verbo Separable", category: "Aktionen" },
      { de: "der Rabatt", pron: "ra-bát", es: "descuento", type: "Sustantivo", category: "Preis" }
    ]
  },
  {
    id: 7, title: "Kapitel 7: Reisen & Verkehr", icon: <Car size={20} />, emoji: "✈️",
    words: [
      { de: "die Ferien", pron: "fé-ri-en", es: "las vacaciones (escolares)", type: "Sustantivo", category: "Reise" },
      { de: "der Urlaub", pron: "úr-laup", es: "las vacaciones (laborales)", type: "Sustantivo", category: "Reise" },
      { de: "Urlaub machen", pron: "úr-laup má-jen", es: "ir de vacaciones", type: "Frase", category: "Reise" },
      { de: "es gibt", pron: "es guipt", es: "hay (+ Acusativo)", type: "Frase", category: "Allgemein" },
      { de: "geöffnet", pron: "gue-óf-net", es: "abierto", type: "Adjetivo", category: "Status" },
      { de: "geschlossen", pron: "gue-shló-sen", es: "cerrado", type: "Adjetivo", category: "Status" },
      { de: "von - bis", pron: "fon bis", es: "de - hasta", type: "Preposición", category: "Zeit" },
      { de: "die Karte", pron: "kár-te", es: "tarjeta / mapa", type: "Sustantivo (Fem)", category: "Tickets" },
      { de: "die Eintrittskarte", pron: "áin-trits-kár-te", es: "boleto de entrada", type: "Sustantivo (Fem)", category: "Tickets" },
      { de: "das Ticket", pron: "tí-ket", es: "el ticket", type: "Sustantivo (Neutro)", category: "Tickets" },
      { de: "kaufen", pron: "káu-fen", es: "comprar", type: "Verbo", category: "Aktionen" },
      { de: "reservieren", pron: "re-ser-ví-ren", es: "reservar", type: "Verbo", category: "Aktionen" },
      { de: "der Weg", pron: "vek", es: "el camino", type: "Sustantivo", category: "Orientierung" },
      { de: "geradeaus", pron: "gue-rá-de-aus", es: "recto", type: "Adverbio", category: "Orientierung" },
      { de: "links / rechts", pron: "links / rejts", es: "izquierda / derecha", type: "Adverbio", category: "Orientierung" },
      { de: "der Unfall", pron: "ún-fal", es: "accidente", type: "Sustantivo", category: "Verkehr" },
      { de: "die Polizei", pron: "po-li-tsái", es: "policía", type: "Sustantivo", category: "Verkehr" },
      { de: "umsteigen", pron: "um-shtái-guen", es: "hacer transbordo", type: "Verbo", category: "Verkehr" },
      { de: "das Zelt", pron: "tselt", es: "tienda de campaña", type: "Sustantivo", category: "Reise" },
      { de: "zelten", pron: "tsél-ten", es: "acampar", type: "Verbo", category: "Reise" }
    ]
  },
  {
    id: 8, title: "Kapitel 8: Post & Bank", icon: <Mail size={20} />, emoji: "📮",
    words: [
      { de: "die Post", pron: "póst", es: "el correo", type: "Sustantivo (Fem)", category: "Post" },
      { de: "der Brief", pron: "bríf", es: "carta", type: "Sustantivo", category: "Post" },
      { de: "die Postkarte", pron: "póst-kár-te", es: "tarjeta postal", type: "Sustantivo", category: "Post" },
      { de: "schicken", pron: "shí-ken", es: "enviar", type: "Verbo", category: "Post" },
      { de: "bekommen", pron: "be-kó-men", es: "recibir", type: "Verbo", category: "Post" },
      { de: "abholen", pron: "áp-jó-len", es: "recoger", type: "Verbo separable", category: "Post" },
      { de: "die Briefmarke", pron: "bríf-már-ke", es: "estampilla", type: "Sustantivo (Fem)", category: "Post" },
      { de: "der Absender", pron: "áp-sén-der", es: "remitente", type: "Sustantivo (Masc)", category: "Post" },
      { de: "der Empfänger", pron: "em-pfén-guer", es: "destinatario", type: "Sustantivo (Masc)", category: "Post" },
      { de: "die Adresse", pron: "a-dré-se", es: "dirección", type: "Sustantivo (Fem)", category: "Post" },
      { de: "das Telefon", pron: "te-le-fón", es: "teléfono", type: "Sustantivo (Neutro)", category: "Kommunikation" },
      { de: "das Handy", pron: "jén-di", es: "celular", type: "Sustantivo (Neutro)", category: "Kommunikation" },
      { de: "das Fax", pron: "faks", es: "fax", type: "Sustantivo (Neutro)", category: "Kommunikation" },
      { de: "die Telefonnummer", pron: "te-le-fón-nú-mer", es: "número de teléfono", type: "Sustantivo (Fem)", category: "Kommunikation" },
      { de: "das Telefonbuch", pron: "te-le-fón-buj", es: "guía telefónica", type: "Sustantivo (Neutro)", category: "Kommunikation" },
      { de: "telefonieren", pron: "te-le-fo-ní-ren", es: "hablar por tel.", type: "Verbo", category: "Kommunikation" },
      { de: "anrufen", pron: "án-rú-fen", es: "llamar", type: "Verbo", category: "Kommunikation" },
      { de: "sprechen (mit)", pron: "shpré-jen", es: "hablar con", type: "Verbo", category: "Kommunikation" },
      { de: "besetzt", pron: "be-sé-tst", es: "ocupado (línea)", type: "Adjetivo", category: "Kommunikation" },
      { de: "die Bank", pron: "bank", es: "banco", type: "Sustantivo", category: "Bank" },
      { de: "der Schalter", pron: "shál-ter", es: "ventanilla", type: "Sustantivo", category: "Bank" },
      { de: "das Geld", pron: "guelt", es: "dinero", type: "Sustantivo (Neutro)", category: "Bank" },
      { de: "bar zahlen", pron: "bar tsá-len", es: "pagar en efectivo", type: "Frase", category: "Bank" },
      { de: "die Kreditkarte", pron: "kre-dít-kár-te", es: "tarjeta de crédito", type: "Sustantivo (Fem)", category: "Bank" },
      { de: "das Konto", pron: "kón-to", es: "cuenta", type: "Sustantivo (Neutro)", category: "Bank" },
      { de: "überweisen", pron: "ú-ber-vái-sen", es: "transferir dinero", type: "Verbo", category: "Bank" },
      { de: "das Formular", pron: "for-mu-lár", es: "formulario", type: "Sustantivo", category: "Bank" },
      { de: "ausfüllen", pron: "áus-fú-len", es: "rellenar", type: "Verbo", category: "Bank" },
      { de: "ankreuzen", pron: "án-krói-tsen", es: "marcar con cruz", type: "Verbo separable", category: "Bank" },
      { de: "unterschreiben", pron: "ún-ter-shrái-ben", es: "firmar", type: "Verbo", category: "Bank" },
      { de: "der Geldautomat", pron: "guelt-áu-to-mát", es: "cajero automático", type: "Sustantivo (Masc)", category: "Bank" },
      { de: "das Internet", pron: "ín-ter-net", es: "internet", type: "Sustantivo", category: "Kommunikation" },
      { de: "der Computer", pron: "kom-piú-ter", es: "computador", type: "Sustantivo (Masc)", category: "Kommunikation" },
      { de: "der Pass / Ausweis", pron: "pas / áus-vais", es: "pasaporte / ID", type: "Sustantivo", category: "Dokumente" },
      { de: "gültig", pron: "gúl-tij", es: "válido/vigente", type: "Adjetivo", category: "Dokumente" },
      { de: "das Paket", pron: "pa-két", es: "el paquete", type: "Sustantivo", category: "Post" },
      { de: "der Briefkasten", pron: "bríf-kas-ten", es: "buzón de correo", type: "Sustantivo", category: "Post" },
      { de: "die Gebühr", pron: "gue-búr", es: "tarifa(comisión)", type: "Sustantivo", category: "Bank" },
      { de: "der Kredit", pron: "kre-dít", es: "crédito", type: "Sustantivo", category: "Bank" },
      { de: "abheben", pron: "áp-jé-ben", es: "retirar dinero", type: "Verbo", category: "Bank" },
      { de: "einzahlen", pron: "áin-tsá-len", es: "depositar", type: "Verbo", category: "Bank" },
      { de: "die Geheimzahl", pron: "gue-jáim-tsal", es: "el PIN", type: "Sustantivo", category: "Bank" }
    ]
  },
  {
    id: 9, title: "Kapitel 9: Gesundheit", icon: <Heart size={20} />, emoji: "🏥",
    words: [
      { de: "das Auge", pron: "áu-gue", es: "ojo", type: "Sustantivo (Neutro)", category: "Körper" },
      { de: "die Hand", pron: "jant", es: "mano", type: "Sustantivo (Fem)", category: "Körper" },
      { de: "der Arm", pron: "arm", es: "brazo", type: "Sustantivo", category: "Körper" },
      { de: "das Bein", pron: "bain", es: "pierna", type: "Sustantivo", category: "Körper" },
      { de: "der Kopf", pron: "kopf", es: "cabeza", type: "Sustantivo (Masc)", category: "Körper" },
      { de: "der Fuß", pron: "fus", es: "pie", type: "Sustantivo (Masc)", category: "Körper" },
      { de: "der Mund", pron: "munt", es: "boca", type: "Sustantivo (Masc)", category: "Körper" },
      { de: "der Zahn", pron: "tsan", es: "diente", type: "Sustantivo (Masc)", category: "Körper" },
      { de: "die Nase", pron: "ná-se", es: "nariz", type: "Sustantivo", category: "Körper" },
      { de: "das Ohr", pron: "or", es: "oreja", type: "Sustantivo", category: "Körper" },
      { de: "das Haar", pron: "jar", es: "pelo", type: "Sustantivo", category: "Körper" },
      { de: "der Bauch", pron: "báuj", es: "barriga", type: "Sustantivo", category: "Körper" },
      { de: "der Finger", pron: "fín-guer", es: "dedo", type: "Sustantivo (Masc)", category: "Körper" },
      { de: "der Rücken", pron: "rú-ken", es: "espalda", type: "Sustantivo (Masc)", category: "Körper" },
      { de: "der Hals", pron: "jals", es: "cuello", type: "Sustantivo (Masc)", category: "Körper" },
      { de: "wehtun", pron: "vé-tun", es: "doler", type: "Verbo separable", category: "Krankheit" },
      { de: "Wie geht es Ihnen?", pron: "vi guét es í-nen", es: "¿Cómo está usted?", type: "Frase", category: "Kommunikation" },
      { de: "Es geht mir gut", pron: "es guét mir gut", es: "Me va bien", type: "Frase", category: "Kommunikation" },
      { de: "schlafen", pron: "shlá-fen", es: "dormir", type: "Verbo", category: "Aktionen" },
      { de: "ins Bett gehen", pron: "ins bet gué-en", es: "ir a la cama", type: "Frase", category: "Aktionen" },
      { de: "im Bett liegen", pron: "im bet lí-guen", es: "estar en la cama", type: "Frase", category: "Aktionen" },
      { de: "krank", pron: "krank", es: "enfermo", type: "Adjetivo", category: "Krankheit" },
      { de: "das Fieber", pron: "fí-ber", es: "fiebre", type: "Sustantivo", category: "Krankheit" },
      { de: "der Arzt", pron: "artst", es: "médico", type: "Sustantivo (Masc)", category: "Medizin" },
      { de: "der Doktor", pron: "dók-tor", es: "doctor", type: "Sustantivo", category: "Medizin" },
      { de: "die Apotheke", pron: "a-po-té-ke", es: "farmacia", type: "Sustantivo", category: "Medizin" },
      { de: "das Medikament", pron: "me-di-ka-mént", es: "medicamento", type: "Sustantivo (Neutro)", category: "Medizin" },
      { de: "das Rezept", pron: "re-tsépt", es: "receta médica", type: "Sustantivo (Neutro)", category: "Medizin" },
      { de: "die Praxis", pron: "prák-sis", es: "consultorio", type: "Sustantivo", category: "Medizin" },
      { de: "das Krankenhaus", pron: "krán-ken-jáus", es: "hospital", type: "Sustantivo", category: "Medizin" },
      { de: "der Termin", pron: "ter-mín", es: "cita", type: "Sustantivo (Masc)", category: "Medizin" },
      { de: "Gute Besserung", pron: "gú-te be-sé-rung", es: "¡Que te mejores!", type: "Frase", category: "Kommunikation" },
      { de: "das Pflaster", pron: "pflás-ter", es: "tirita(curita)", type: "Sustantivo", category: "Medizin" },
      { de: "die Salbe", pron: "sál-be", es: "pomada", type: "Sustantivo", category: "Medizin" },
      { de: "die Erkältung", pron: "er-kél-tung", es: "resfriado", type: "Sustantivo", category: "Krankheit" },
      { de: "husten", pron: "jús-ten", es: "toser", type: "Verbo", category: "Krankheit" },
      { de: "bluten", pron: "blú-ten", es: "sangrar", type: "Verbo", category: "Krankheit" },
      { de: "sich verletzen", pron: "fer-lét-sen", es: "lastimarse", type: "Verbo", category: "Krankheit" },
      { de: "der Schmerz", pron: "shmerts", es: "el dolor", type: "Sustantivo", category: "Krankheit" },
      { de: "schwanger", pron: "shván-guer", es: "embarazada", type: "Adjetivo", category: "Körper" }
    ]
  },
  {
    id: 10, title: "Kapitel 10: Kleidung", icon: <ShoppingCart size={20} />, emoji: "👕",
    words: [
      { de: "die Kleidung", pron: "klái-dung", es: "ropa", type: "Sustantivo (Fem)", category: "Allgemein" },
      { de: "der Pullover", pron: "pu-ló-ver", es: "suéter", type: "Sustantivo (Masc)", category: "Kleidungsstücke" },
      { de: "der Rock", pron: "rok", es: "falda", type: "Sustantivo (Masc)", category: "Kleidungsstücke" },
      { de: "die Hose", pron: "jó-se", es: "pantalón", type: "Sustantivo (Fem)", category: "Kleidungsstücke" },
      { de: "das Hemd", pron: "jemd", es: "camisa", type: "Sustantivo (Neutro)", category: "Kleidungsstücke" },
      { de: "die Schuhe", pron: "shú-e", es: "zapatos", type: "Sustantivo (Plural)", category: "Kleidungsstücke" },
      { de: "die Jacke", pron: "yá-ke", es: "chaqueta", type: "Sustantivo (Fem)", category: "Kleidungsstücke" },
      { de: "der Mantel", pron: "mán-tel", es: "abrigo", type: "Sustantivo (Masc)", category: "Kleidungsstücke" },
      { de: "die Jeans", pron: "dshins", es: "jeans", type: "Sustantivo (Fem)", category: "Kleidungsstücke" },
      { de: "die Größe", pron: "gró-se", es: "talla", type: "Sustantivo (Fem)", category: "Eigenschaften" },
      { de: "die Farbe", pron: "fár-be", es: "color", type: "Sustantivo (Fem)", category: "Eigenschaften" },
      { de: "schwarz", pron: "shvarts", es: "negro", type: "Adjetivo", category: "Farben" },
      { de: "weiß", pron: "vais", es: "blanco", type: "Adjetivo", category: "Farben" },
      { de: "grau", pron: "grau", es: "gris", type: "Adjetivo", category: "Farben" },
      { de: "rot", pron: "rot", es: "rojo", type: "Adjetivo", category: "Farben" },
      { de: "blau", pron: "blau", es: "azul", type: "Adjetivo", category: "Farben" },
      { de: "gelb", pron: "guelp", es: "amarillo", type: "Adjetivo", category: "Farben" },
      { de: "grün", pron: "grun", es: "verde", type: "Adjetivo", category: "Farben" },
      { de: "braun", pron: "braun", es: "marrón", type: "Adjetivo", category: "Farben" },
      { de: "anziehen", pron: "án-tsí-en", es: "ponerse ropa", type: "Verbo separable", category: "Aktionen" },
      { de: "ausziehen", pron: "áus-tsí-en", es: "quitarse ropa", type: "Verbo separable", category: "Aktionen" },
      { de: "anprobieren", pron: "án-pro-bí-ren", es: "probarse ropa", type: "Verbo separable", category: "Aktionen" },
      { de: "passen", pron: "pá-sen", es: "quedar bien (talla)", type: "Verbo (+ Dativo)", category: "Aktionen" },
      { de: "anhaben", pron: "án-já-ben", es: "llevar puesto (ropa)", type: "Verbo Separable", category: "Aktionen" },
      { de: "eng", pron: "eng", es: "ajustado", type: "Adjetivo", category: "Eigenschaften" },
      { de: "weit", pron: "vait", es: "holgado", type: "Adjetivo", category: "Eigenschaften" },
      { de: "bequem", pron: "be-kvém", es: "cómodo", type: "Adjetivo", category: "Eigenschaften" },
      { de: "der Schal", pron: "shal", es: "bufanda", type: "Sustantivo", category: "Accessoires" },
      { de: "der Gürtel", pron: "gúr-tel", es: "cinturón", type: "Sustantivo", category: "Accessoires" }
    ]
  },
  {
    id: 11, title: "Kapitel 11: Schule & Beruf", icon: <Briefcase size={20} />, emoji: "💼",
    words: [
      { de: "die Schule", pron: "shú-le", es: "escuela", type: "Sustantivo", category: "Bildung" },
      { de: "die Klasse", pron: "klá-se", es: "clase", type: "Sustantivo", category: "Bildung" },
      { de: "der Lehrer / die Lehrerin", pron: "lé-rer", es: "profesor / profesora", type: "Sustantivo", category: "Personen" },
      { de: "der Schüler / die Schülerin", pron: "shú-ler", es: "alumno / alumna", type: "Sustantivo", category: "Personen" },
      { de: "der Student", pron: "shtu-dént", es: "estudiante (uni)", type: "Sustantivo", category: "Personen" },
      { de: "lernen", pron: "lér-nen", es: "aprender / estudiar", type: "Verbo", category: "Aktionen" },
      { de: "der Unterricht", pron: "ún-ter-rijt", es: "clase (sesión)", type: "Sustantivo", category: "Bildung" },
      { de: "der Kurs", pron: "kurs", es: "curso", type: "Sustantivo", category: "Bildung" },
      { de: "die Pause", pron: "páu-se", es: "descanso/recreo", type: "Sustantivo", category: "Bildung" },
      { de: "die Hausaufgabe", pron: "jáus-áuf-gá-be", es: "tarea", type: "Sustantivo", category: "Bildung" },
      { de: "die Prüfung", pron: "prú-fung", es: "examen", type: "Sustantivo", category: "Bildung" },
      { de: "die Lösung", pron: "ló-sung", es: "solución", type: "Sustantivo", category: "Bildung" },
      { de: "der Fehler", pron: "fé-ler", es: "error", type: "Sustantivo", category: "Bildung" },
      { de: "die Arbeit", pron: "ár-bait", es: "trabajo", type: "Sustantivo", category: "Beruf" },
      { de: "der Beruf", pron: "be-rúf", es: "profesión", type: "Sustantivo", category: "Beruf" },
      { de: "Mechaniker von Beruf", pron: "me-já-ni-ker", es: "mecánico de profesión", type: "Frase", category: "Beruf" },
      { de: "der Arbeitsplatz / Job", pron: "ár-baits-plats / dshob", es: "puesto de trabajo / empleo", type: "Sustantivo", category: "Beruf" },
      { de: "arbeiten", pron: "ár-bai-ten", es: "trabajar", type: "Verbo", category: "Beruf" },
      { de: "der Chef / die Chefin", pron: "shef", es: "jefe / jefa", type: "Sustantivo", category: "Personen" },
      { de: "der Kollege / die Kollegin", pron: "ko-lé-gue", es: "colega", type: "Sustantivo", category: "Personen" },
      { de: "die Firma / das Büro", pron: "fír-ma / bu-ró", es: "empresa / oficina", type: "Sustantivo", category: "Beruf" },
      { de: "arbeitslos", pron: "ár-baits-los", es: "desempleado", type: "Adjetivo", category: "Beruf" },
      { de: "der Arbeiter", pron: "ár-bai-ter", es: "obrero", type: "Sustantivo", category: "Personen" },
      { de: "das Praktikum", pron: "prák-ti-kum", es: "pasantía", type: "Sustantivo", category: "Bildung" },
      { de: "die Ausbildung", pron: "áus-bíl-dung", es: "formación dual", type: "Sustantivo", category: "Bildung" },
      { de: "der Urlaub", pron: "úr-laup", es: "vacaciones", type: "Sustantivo", category: "Beruf" },
      { de: "selbstständig", pron: "sélpst-shtén-dij", es: "independiente", type: "Adjetivo", category: "Beruf" },
      { de: "die Stelle", pron: "shté-le", es: "plaza/vacante", type: "Sustantivo", category: "Beruf" },
      { de: "Geld verdienen", pron: "guelt fer-dí-nen", es: "ganar dinero", type: "Frase", category: "Beruf" },
      { de: "schwere / leichte Arbeit", pron: "shvé-re / lái-jte", es: "trabajo pesado/ligero", type: "Frase", category: "Beruf" },
      { de: "das Internet", pron: "ín-ter-net", es: "internet", type: "Sustantivo", category: "Büro" },
      { de: "der Computer", pron: "kom-piú-ter", es: "computador", type: "Sustantivo", category: "Büro" },
      { de: "der Drucker", pron: "drú-ker", es: "impresora", type: "Sustantivo", category: "Büro" },
      { de: "der Bleistift", pron: "blái-shtift", es: "lápiz", type: "Sustantivo", category: "Büro" },
      { de: "der Kugelschreiber", pron: "kú-guel-shrái-ber", es: "bolígrafo", type: "Sustantivo", category: "Büro" },
      { de: "der Schreibtisch", pron: "shráip-tish", es: "escritorio", type: "Sustantivo", category: "Büro" },
      { de: "das Zeugnis", pron: "tsóik-nis", es: "boletín de notas", type: "Sustantivo", category: "Bildung" },
      { de: "der Stundenplan", pron: "shtún-den-plan", es: "horario de clases", type: "Sustantivo", category: "Bildung" },
      { de: "fehlen", pron: "fé-len", es: "faltar", type: "Verbo", category: "Bildung" },
      { de: "bestehen", pron: "be-shté-en", es: "aprobar", type: "Verbo", category: "Bildung" },
      { de: "durchfallen", pron: "dúrj-fa-len", es: "reprobar", type: "Verbo separable", category: "Bildung" },
      { de: "die Besprechung", pron: "be-shpré-jung", es: "la reunión", type: "Sustantivo", category: "Beruf" },
      { de: "kündigen", pron: "kún-di-guen", es: "renunciar", type: "Verbo", category: "Beruf" },
      { de: "befördern", pron: "be-fór-dern", es: "ascender", type: "Verbo", category: "Beruf" },
      { de: "die Universität", pron: "u-ni-ver-si-tét", es: "universidad", type: "Sustantivo", category: "Bildung" },
      { de: "anmelden", pron: "án-mél-den", es: "inscribirse", type: "Verbo", category: "Bildung" },
      { de: "die Anmeldung", pron: "án-mél-dung", es: "inscripción", type: "Sustantivo", category: "Bildung" },
      { de: "sprechen", pron: "shpré-jen", es: "hablar", type: "Verbo", category: "Aktionen" },
      { de: "verstehen", pron: "fer-shté-en", es: "entender", type: "Verbo", category: "Aktionen" },
      { de: "fragen", pron: "frá-guen", es: "preguntar", type: "Verbo", category: "Aktionen" },
      { de: "antworten", pron: "ánt-vor-ten", es: "responder", type: "Verbo", category: "Aktionen" },
      { de: "erklären", pron: "er-klé-ren", es: "explicar", type: "Verbo", category: "Aktionen" },
      { de: "wiederholen", pron: "ví-der-jó-len", es: "repetir", type: "Verbo", category: "Aktionen" }
    ]
  },
  {
    id: 12, title: "Kapitel 12: Fahrschuldeutsch: Auto", icon: <Car size={20} />, emoji: "🚗",
    words: [
      { de: "das Benzin / der Tank", pron: "ben-tsín / tank", es: "gasolina / tanque", type: "Sustantivo", category: "Teile" },
      { de: "der Blinker / blinken", pron: "blín-ker / blín-ken", es: "direccional / poner intermitente", type: "Sust / Verbo", category: "Teile" },
      { de: "die Bremse / bremsen", pron: "brém-se / brém-sen", es: "freno / frenar", type: "Sust / Verbo", category: "Teile" },
      { de: "das Bremspedal", pron: "bréms-pe-dál", es: "pedal de freno", type: "Sustantivo (Neutro)", category: "Teile" },
      { de: "die Gangschaltung", pron: "gáng-shál-tung", es: "caja de cambios", type: "Sustantivo (Fem)", category: "Teile" },
      { de: "das Gaspedal", pron: "gás-pe-dál", es: "acelerador", type: "Sustantivo", category: "Teile" },
      { de: "Gas geben", pron: "gas gué-ben", es: "acelerar", type: "Frase", category: "Aktionen" },
      { de: "der Fahrer / fahren", pron: "fá-rer / fá-ren", es: "conductor / conducir", type: "Sust / Verbo", category: "Allgemein" },
      { de: "die Hupe / hupen", pron: "jú-pe / jú-pen", es: "bocina / tocar bocina", type: "Sust / Verbo", category: "Teile" },
      { de: "der Kraftstoff", pron: "kráft-shtof", es: "combustible", type: "Sustantivo", category: "Teile" },
      { de: "das Lenkrad / lenken", pron: "lénk-rat / lén-ken", es: "volante / girar volante", type: "Sust / Verbo", category: "Teile" },
      { de: "der Motor", pron: "mó-tor", es: "motor", type: "Sustantivo (Masc)", category: "Teile" },
      { de: "der Rückspiegel", pron: "rúk-shpí-guel", es: "espejo retrovisor", type: "Sustantivo (Masc)", category: "Teile" },
      { de: "der Sicherheitsgurt", pron: "sí-jer-jaits-gurt", es: "cinturón de seguridad", type: "Sustantivo (Masc)", category: "Teile" },
      { de: "die Kupplung", pron: "kúp-lung", es: "embrague", type: "Sustantivo (Fem)", category: "Teile" },
      { de: "die Felge", pron: "fél-gue", es: "rin", type: "Sustantivo", category: "Teile" },
      { de: "die Handbremse", pron: "jánt-brém-se", es: "freno de mano", type: "Sustantivo", category: "Teile" },
      { de: "der Schalthebel", pron: "shált-jé-bel", es: "palanca de cambios", type: "Sustantivo", category: "Teile" },
      { de: "der Scheibenwischer", pron: "shái-ben-ví-sher", es: "limpiaparabrisas", type: "Sustantivo (Masc)", category: "Teile" },
      { de: "der Lichtschalter", pron: "líjt-shál-ter", es: "interruptor de luces", type: "Sustantivo", category: "Teile" },
      { de: "die Heizung", pron: "jái-tsung", es: "calefacción", type: "Sustantivo", category: "Teile" },
      { de: "das Abblendlicht", pron: "áp-blent-lijt", es: "luz corta / baja", type: "Sustantivo", category: "Lichter" },
      { de: "das Fernlicht", pron: "férn-lijt", es: "luz larga / alta", type: "Sustantivo", category: "Lichter" },
      { de: "die Bremsleuchte", pron: "bréms-lóij-te", es: "luz de freno", type: "Sustantivo", category: "Lichter" },
      { de: "die Warnblinkanlage", pron: "várn-blínk", es: "luces de emergencia", type: "Sustantivo", category: "Lichter" },
      { de: "die Nebelschlussleuchte", pron: "né-bel", es: "luz antiniebla trasera", type: "Sustantivo", category: "Lichter" },
      { de: "das Tagfahrlicht", pron: "ták-fár-lijt", es: "luz diurna", type: "Sustantivo", category: "Lichter" },
      { de: "betanken", pron: "be-tán-ken", es: "repostar gasolina", type: "Verbo", category: "Aktionen" },
      { de: "überholen", pron: "ú-ber-jó-len", es: "adelantar", type: "Verbo", category: "Aktionen" },
      { de: "einsteigen / aussteigen", pron: "áin-shtái-guen", es: "subir / bajar del coche", type: "Verbo separable", category: "Aktionen" },
      { de: "aufschließen", pron: "áuf-shli-sen", es: "abrir con llave", type: "Verbo separable", category: "Aktionen" },
      { de: "anhalten / halten / parken", pron: "án-jál-ten", es: "parar / detenerse / parquear", type: "Verbo", category: "Aktionen" },
      { de: "die Vorfahrt", pron: "fór-fart", es: "prioridad", type: "Sustantivo", category: "Verkehr" },
      { de: "aufpassen", pron: "áuf-pa-sen", es: "prestar atención", type: "Verbo separable", category: "Verkehr" },
      { de: "Motor starten", pron: "mó-tor shtár-ten", es: "prender el motor", type: "Frase", category: "Aktionen" },
      { de: "sich anschnallen", pron: "án-shná-len", es: "ponerse el cinturón", type: "Verbo", category: "Aktionen" },
      { de: "beschleunigen", pron: "be-shlói-ni-guen", es: "acelerar", type: "Verbo", category: "Aktionen" },
      { de: "abschleppen", pron: "áp-shlé-pen", es: "remolcar", type: "Verbo", category: "Aktionen" },
      { de: "zusammenstoßen", pron: "tsu-sá-men-shto-sen", es: "chocar", type: "Verbo", category: "Verkehr" },
      { de: "der Schaden", pron: "shá-den", es: "daño", type: "Sustantivo", category: "Verkehr" },
      { de: "das Motoröl", pron: "mó-tor-ol", es: "aceite de motor", type: "Sustantivo", category: "Flüssigkeiten" },
      { de: "der Reifendruck", pron: "rái-fen-druk", es: "presión neumáticos", type: "Sustantivo", category: "Teile" },
      { de: "der Reifen", pron: "rái-fen", es: "llanta", type: "Sustantivo (Masc)", category: "Teile" },
      { de: "der Pkw / der Lkw", pron: "pe-ka-ve / el-ka-ve", es: "carro / camión", type: "Sustantivo", category: "Fahrzeuge" },
      { de: "der Fußgänger", pron: "fús-guén-guer", es: "peatón", type: "Sustantivo", category: "Verkehr" },
      { de: "die Ampel / Kreuzung", pron: "ám-pel / krói-tsung", es: "semáforo / cruce", type: "Sustantivo (Fem)", category: "Verkehr" },
      { de: "das Fahrzeug", pron: "fár-tsoig", es: "el vehículo", type: "Sustantivo (Neutro)", category: "Fahrzeuge" },
      { de: "der Verkehr / Stau", pron: "fer-kér / shtau", es: "el tráfico / trancón", type: "Sustantivo (Masc)", category: "Verkehr" },
      { de: "das Verkehrsschild", pron: "fer-kérs-shilt", es: "señal de tráfico", type: "Sustantivo", category: "Verkehr" },
      { de: "die Geschwindigkeit", pron: "gue-shvín-dij-kait", es: "velocidad", type: "Sustantivo", category: "Verkehr" },
      { de: "die Spur", pron: "shpur", es: "carril", type: "Sustantivo", category: "Verkehr" },
      { de: "die Warnleuchten", pron: "várn-loij-ten", es: "luces de advertencia", type: "Sustantivo", category: "Lichter" },
      { de: "die Baustelle", pron: "báu-shté-le", es: "obra de cons.", type: "Sustantivo", category: "Verkehr" },
      { de: "die Sicherheit", pron: "sí-jer-jait", es: "seguridad", type: "Sustantivo", category: "Allgemein" },
      { de: "Toter Winkel", pron: "tó-ter vín-kel", es: "ángulo muerto", type: "Frase", category: "Verkehr" },
      { de: "Schulterblick", pron: "shúl-ter-blik", es: "mirada sobre hombro", type: "Frase", category: "Verkehr" },
      { de: "Rechts vor links", pron: "rejts for links", es: "derecha tiene preferencia", type: "Frase", category: "Verkehr" },
      { de: "Motoröldruck", pron: "mó-tor-ól-druk", es: "presión aceite (rojo)", type: "Sustantivo", category: "Anzeigen" },
      { de: "Kühlmitteltemperatur", pron: "kúl-mí-tel", es: "temp. refrigerante (rojo)", type: "Sustantivo", category: "Anzeigen" },
      { de: "das Schiebedach", pron: "shí-be-daj", es: "techo corredizo", type: "Sustantivo", category: "Teile" },
      { de: "der Auspuff", pron: "áus-puf", es: "escape", type: "Sustantivo", category: "Teile" },
      { de: "das Nummernschild", pron: "nú-mern-shilt", es: "placa / matrícula", type: "Sustantivo", category: "Teile" },
      { de: "die Windschutzscheibe", pron: "vínt-shuts-shái-be", es: "parabrisas", type: "Sustantivo", category: "Teile" },
      { de: "die Motorhaube", pron: "mó-tor-jáu-be", es: "capó", type: "Sustantivo", category: "Teile" },
      { de: "die Stoßstange", pron: "shtós-shtán-gue", es: "parachoques", type: "Sustantivo", category: "Teile" },
      { de: "der Kreisverkehr", pron: "kráis-fer-ker", es: "rotonda", type: "Sustantivo", category: "Verkehr" },
      { de: "die Einbahnstraße", pron: "áin-ban-shtra-se", es: "calle de un solo sentido", type: "Sustantivo", category: "Verkehr" },
      { de: "abbiegen", pron: "áp-bi-guen", es: "girar", type: "Verbo", category: "Verkehr" },
      { de: "der Strafzettel", pron: "shtráf-tse-tel", es: "multa de tráfico", type: "Sustantivo", category: "Verkehr" },
      { de: "die Versicherung", pron: "fer-sí-je-rung", es: "el seguro", type: "Sustantivo", category: "Allgemein" }
    ]
  },
  {
    id: 13, title: "Kapitel 13: Grammatik: Konnektoren", icon: <Link2 size={20} />, emoji: "🔗",
    words: [
      { de: "und", pron: "unt", es: "y", type: "Conector (Posición 0)", category: "Konnektoren" },
      { de: "oder", pron: "ó-der", es: "o (alternativa)", type: "Conector (Posición 0)", category: "Konnektoren" },
      { de: "aber", pron: "á-ber", es: "pero", type: "Conector (Posición 0)", category: "Konnektoren" },
      { de: "denn", pron: "den", es: "porque / pues", type: "Conector (Posición 0)", category: "Konnektoren" },
      { de: "sondern", pron: "són-dern", es: "sino (que)", type: "Conector (Posición 0)", category: "Konnektoren" },
      { de: "für", pron: "fur", es: "para / por", type: "Preposición (Akk)", category: "Präpositionen" },
      { de: "ohne", pron: "ó-ne", es: "sin", type: "Preposición (Akk)", category: "Präpositionen" },
      { de: "durch", pron: "durj", es: "a través de / por", type: "Preposición (Akk)", category: "Präpositionen" },
      { de: "gegen", pron: "gué-guen", es: "contra / hacia (hora)", type: "Preposición (Akk)", category: "Präpositionen" },
      { de: "um", pron: "um", es: "a las (hora) / alrededor de", type: "Preposición (Akk)", category: "Präpositionen" },
      { de: "mit", pron: "mit", es: "con", type: "Preposición (Dat)", category: "Präpositionen" },
      { de: "nach", pron: "naj", es: "hacia / después de", type: "Preposición (Dat)", category: "Präpositionen" },
      { de: "aus", pron: "aus", es: "de (origen / material)", type: "Preposición (Dat)", category: "Präpositionen" },
      { de: "bei", pron: "bai", es: "en casa de / en (empresa)", type: "Preposición (Dat)", category: "Präpositionen" },
      { de: "von", pron: "fon", es: "de (procedencia / autor)", type: "Preposición (Dat)", category: "Präpositionen" },
      { de: "zu", pron: "tsu", es: "hacia (lugares / personas)", type: "Preposición (Dat)", category: "Präpositionen" },
      { de: "seit", pron: "sait", es: "desde (tiempo)", type: "Preposición (Dat)", category: "Präpositionen" },
      { de: "in", pron: "in", es: "en / dentro de", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "an", pron: "an", es: "en (borde / fechas)", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "auf", pron: "auf", es: "sobre (con contacto)", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "unter", pron: "ún-ter", es: "debajo de", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "über", pron: "ú-ber", es: "sobre (sin contacto) / acerca de", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "neben", pron: "né-ben", es: "al lado de", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "zwischen", pron: "tsvish-en", es: "entre", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "vor", pron: "for", es: "delante de / antes de", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "hinter", pron: "jín-ter", es: "detrás de", type: "Prep. Mixta (Dat/Akk)", category: "Wechselpräpositionen" },
      { de: "obwohl", pron: "op-vól", es: "aunque", type: "Conector Subordinante", category: "Nebensätze" },
      { de: "wenn", pron: "ven", es: "si(condicional)", type: "Conector Subordinante", category: "Nebensätze" },
      { de: "als", pron: "als", es: "cuando", type: "Conector Subordinante", category: "Nebensätze" },
      { de: "deshalb", pron: "dés-jalp", es: "por eso", type: "Conector Posición 1", category: "Konnektoren" },
      { de: "trotzdem", pron: "tróts-dem", es: "sin embargo", type: "Conector Posición 1", category: "Konnektoren" },
      { de: "außerdem", pron: "áu-ser-dem", es: "además", type: "Conector Posición 1", category: "Konnektoren" },
      { de: "nämlich", pron: "ném-lij", es: "es decir", type: "Partícula", category: "Partikeln" },
      { de: "doch", pron: "doj", es: "sí (rechaza negación)", type: "Partícula", category: "Partikeln" },
      { de: "mal", pron: "mal", es: "(Partícula de énfasis)", type: "Partícula", category: "Partikeln" },
      { de: "ja", pron: "ya", es: "sí (Partícula de énfasis)", type: "Partícula", category: "Partikeln" }
    ]
  },
  {
    id: 14, title: "Kapitel 14: Basisverben & Adjektive", icon: <Sparkles size={20} />, emoji: "✨",
    words: [
      { de: "sein", pron: "zain", es: "ser / estar", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "haben", pron: "já-ben", es: "tener / haber", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "werden", pron: "vér-den", es: "llegar a ser / convertirse", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "machen", pron: "má-jen", es: "hacer", type: "Verbo", category: "Basisverben" },
      { de: "tun", pron: "tun", es: "hacer (una acción)", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "sagen", pron: "sá-guen", es: "decir", type: "Verbo", category: "Basisverben" },
      { de: "gehen", pron: "gué-en", es: "ir / andar", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "kommen", pron: "kó-men", es: "venir", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "sehen", pron: "zé-en", es: "ver", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "wissen", pron: "ví-sen", es: "saber (información)", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "kennen", pron: "ké-nen", es: "conocer (personas/lugares)", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "finden", pron: "fín-den", es: "encontrar / parecer", type: "Verbo", category: "Basisverben" },
      { de: "bleiben", pron: "blái-ben", es: "quedarse", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "lassen", pron: "lá-sen", es: "dejar / permitir", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "denken", pron: "dén-ken", es: "pensar", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "groß / klein", pron: "gros / klain", es: "grande / pequeño", type: "Adjetivo", category: "Gegensätze" },
      { de: "gut / schlecht", pron: "gut / shlejt", es: "bueno / malo", type: "Adjetivo", category: "Gegensätze" },
      { de: "neu / alt", pron: "noi / alt", es: "nuevo / viejo", type: "Adjetivo", category: "Gegensätze" },
      { de: "schön / hässlich", pron: "shön / jés-lij", es: "bonito / feo", type: "Adjetivo", category: "Gegensätze" },
      { de: "schwer / leicht", pron: "shver / laijt", es: "pesado (difícil) / ligero (fácil)", type: "Adjetivo", category: "Gegensätze" },
      { de: "richtig / falsch", pron: "ríj-tij / falsh", es: "correcto / incorrecto", type: "Adjetivo", category: "Gegensätze" },
      { de: "wichtig", pron: "víj-tij", es: "importante", type: "Adjetivo", category: "Adjektive" },
      { de: "einfach / schwierig", pron: "áin-faj / shví-rij", es: "fácil / difícil", type: "Adjetivo", category: "Gegensätze" },
      { de: "schnell / langsam", pron: "shnel / láng-zam", es: "rápido / lento", type: "Adjetivo", category: "Gegensätze" },
      { de: "laut / leise", pron: "laut / lái-ze", es: "fuerte (sonido) / silencioso", type: "Adjetivo", category: "Gegensätze" },
      { de: "hell / dunkel", pron: "jel / dún-kel", es: "claro (luz) / oscuro", type: "Adjetivo", category: "Gegensätze" },
      { de: "heiß / kalt", pron: "jais / kalt", es: "caliente / frío", type: "Adjetivo", category: "Gegensätze" },
      { de: "können", pron: "kó-nen", es: "poder (habilidad/posibilidad)", type: "Verbo Modal", category: "Modalverben" },
      { de: "müssen", pron: "mú-sen", es: "tener que (obligación)", type: "Verbo Modal", category: "Modalverben" },
      { de: "dürfen", pron: "dúr-fen", es: "poder (permiso)", type: "Verbo Modal", category: "Modalverben" },
      { de: "sollen", pron: "zó-len", es: "deber (recomendación/orden)", type: "Verbo Modal", category: "Modalverben" },
      { de: "wollen", pron: "vó-len", es: "querer (deseo fuerte)", type: "Verbo Modal", category: "Modalverben" },
      { de: "mögen", pron: "mó-guen", es: "gustar (algo/alguien)", type: "Verbo Modal", category: "Modalverben" },
      { de: "möchten", pron: "mój-ten", es: "gustaría (quisiera)", type: "Verbo Modal (KII)", category: "Modalverben" },
      { de: "geben", pron: "gué-ben", es: "dar", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "nehmen", pron: "né-men", es: "tomar / agarrar", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "brauchen", pron: "bráu-jen", es: "necesitar", type: "Verbo", category: "Basisverben" },
      { de: "helfen", pron: "jél-fen", es: "ayudar", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "bringen", pron: "brín-guen", es: "traer", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "schreiben", pron: "shrái-ben", es: "escribir", type: "Verbo", category: "Basisverben" },
      { de: "lesen", pron: "lé-zen", es: "leer", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "sprechen", pron: "shpré-jen", es: "hablar", type: "Verbo (Irregular)", category: "Basisverben" },
      { de: "versuchen", pron: "fer-sú-jen", es: "intentar", type: "Verbo", category: "Basisverben" },
      { de: "entscheiden", pron: "ent-shái-den", es: "decidir", type: "Verbo", category: "Basisverben" },
      { de: "vergessen", pron: "fer-gué-sen", es: "olvidar", type: "Verbo", category: "Basisverben" },
      { de: "sich erinnern", pron: "er-í-nern", es: "recordar", type: "Verbo", category: "Basisverben" },
      { de: "passieren", pron: "pa-sí-ren", es: "suceder", type: "Verbo", category: "Basisverben" },
      { de: "erzählen", pron: "er-tsé-len", es: "narrar", type: "Verbo", category: "Basisverben" },
      { de: "bedeuten", pron: "be-dói-ten", es: "significar", type: "Verbo", category: "Basisverben" },
      { de: "beginnen", pron: "be-guí-nen", es: "comenzar", type: "Verbo", category: "Basisverben" },
      { de: "stehen", pron: "shté-en", es: "estar de pie", type: "Verbo Posicional", category: "Positionsverben" },
      { de: "stellen", pron: "shté-len", es: "colocar vertical", type: "Verbo Posicional", category: "Positionsverben" },
      { de: "liegen", pron: "lí-guen", es: "estar acostado", type: "Verbo Posicional", category: "Positionsverben" },
      { de: "legen", pron: "lé-guen", es: "colocar horizontal", type: "Verbo Posicional", category: "Positionsverben" }
    ]
  },
  {
    id: 15, title: "Kapitel 15: Adverbien & Fragewörter", icon: <Search size={20} />, emoji: "❓",
    words: [
      { de: "heute", pron: "jói-te", es: "hoy", type: "Adverbio", category: "Zeitadverbien" },
      { de: "morgen", pron: "mór-guen", es: "mañana", type: "Adverbio", category: "Zeitadverbien" },
      { de: "gestern", pron: "gués-tern", es: "ayer", type: "Adverbio", category: "Zeitadverbien" },
      { de: "jetzt", pron: "yetst", es: "ahora", type: "Adverbio", category: "Zeitadverbien" },
      { de: "bald", pron: "balt", es: "pronto", type: "Adverbio", category: "Zeitadverbien" },
      { de: "immer", pron: "í-mer", es: "siempre", type: "Adverbio", category: "Häufigkeit" },
      { de: "oft", pron: "oft", es: "a menudo", type: "Adverbio", category: "Häufigkeit" },
      { de: "manchmal", pron: "mánj-mal", es: "a veces", type: "Adverbio", category: "Häufigkeit" },
      { de: "nie", pron: "ni", es: "nunca", type: "Adverbio", category: "Häufigkeit" },
      { de: "schon", pron: "shon", es: "ya", type: "Adverbio", category: "Zeitadverbien" },
      { de: "noch", pron: "noj", es: "todavía / aún", type: "Adverbio", category: "Zeitadverbien" },
      { de: "hier", pron: "jir", es: "aquí", type: "Adverbio", category: "Ortsadverbien" },
      { de: "dort", pron: "dort", es: "allí", type: "Adverbio", category: "Ortsadverbien" },
      { de: "oben / unten", pron: "ó-ben / ún-ten", es: "arriba / abajo", type: "Adverbio", category: "Ortsadverbien" },
      { de: "vorn / hinten", pron: "forn / jín-ten", es: "adelante / atrás", type: "Adverbio", category: "Ortsadverbien" },
      { de: "draußen / drinnen", pron: "dráu-sen / drí-nen", es: "afuera / adentro", type: "Adverbio", category: "Ortsadverbien" },
      { de: "sehr", pron: "zer", es: "muy", type: "Adverbio", category: "Gradadverbien" },
      { de: "viel / wenig", pron: "fil / vé-nij", es: "mucho / poco", type: "Adverbio", category: "Gradadverbien" },
      { de: "wer?", pron: "ver", es: "¿quién?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "was?", pron: "vas", es: "¿qué?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "wo?", pron: "vo", es: "¿dónde?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "wann?", pron: "van", es: "¿cuándo?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "warum?", pron: "va-rúm", es: "¿por qué?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "wie?", pron: "vi", es: "¿cómo?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "woher?", pron: "vo-jér", es: "¿de dónde?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "wohin?", pron: "vo-jín", es: "¿a dónde?", type: "Pronombre interrogativo", category: "W-Fragen" },
      { de: "welcher?", pron: "vél-jer", es: "¿cuál?", type: "Pronombre interrogativo", category: "W-Fragen" }
    ]
  }
];

// --- NUEVOS MÓDULOS DE ESTUDIO GOETHE ---
const goetheModules = [
  {
    id: 'g_horen',
    title: 'Hören (Comprensión Auditiva)',
    desc: 'Supervivencia en estaciones y llamadas',
    theme: 'blueprint',
    slides: [
      {
        title: "Supervivencia Auditiva: El Examen Hören",
        subtitle: "Entrena tu oído para identificar información clave",
        content: (
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-500 shadow-lg relative">
              <Headphones size={64} className="text-blue-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">El objetivo es identificar información clave (precios, andenes, horas) en medio del ruido de conversaciones, altavoces de estaciones y mensajes de voz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">Alltagssituationen<br/>(Situaciones cotidianas)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Öffentliche Durchsagen<br/>(Anuncios públicos)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Telefonansagen<br/>(Mensajes telefónicos)</span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Kit de Vocabulario Auditivo",
        subtitle: "Si escuchas estas palabras, la respuesta está cerca",
        content: (props) => (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{ de: "die Durchsage", es: "El anuncio por altavoz", type: "Sustantivo", emoji: "📢" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "das Gleis", es: "El andén (del tren)", type: "Sustantivo", emoji: "🚉" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Verspätung", es: "El retraso", type: "Sustantivo", emoji: "⏳" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "das Angebot", es: "La oferta", type: "Sustantivo", emoji: "🏷️" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Nachricht", es: "El mensaje", type: "Sustantivo", emoji: "💬" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "zurück|rufen", es: "Devolver la llamada", type: "Verbo", emoji: "📞" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "aus|steigen", es: "Bajarse", type: "Verbo", emoji: "🚪" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "Achtung!", es: "¡Atención! / ¡Cuidado!", type: "Interjección", emoji: "⚠️" }} {...props} />
          </div>
        )
      },
      {
        title: "Gramática para el Oído",
        subtitle: "La pista de aterrizaje de la información",
        content: (
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
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
                Audio: "Ich wollte um 3 Uhr kommen, <strong>aber</strong> mein Auto ist kaputt. Ich komme um 4 Uhr."<br/>
                <em>Respuesta real: A las 4.</em>
              </div>
            </GrammarAccordion>
          </div>
        )
      },
      {
        title: "Simulador de Escenarios",
        subtitle: "Aplica la 'Regla del Pescador'",
        content: (
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
              <p className="font-bold text-yellow-800">💡 La Regla del Pescador</p>
              <p className="text-sm text-yellow-700 mt-1">No intentes atrapar toda el agua del río traduciendo cada palabra. Lee la pregunta primero, cierra los ojos, ignora el relleno y "pesca" solo el dato (precio, hora, lugar).</p>
            </div>
            <AudioSim 
              title="Escenario 1: Anuncio de tráfico (Teil 2)"
              textDe="Achtung Autofahrer! Auf der Autobahn gibt es einen Stau. Bitte fahren Sie langsam und nutzen Sie das Reißverschlusssystem."
              textEs="¡Atención conductores! Hay un atasco en la autopista. Por favor, conduzcan despacio y utilicen el sistema de cremallera."
            />
            <AudioSim 
              title="Escenario 2: Mensaje de voz (Teil 3)"
              textDe="Hallo, hier ist der IT-Service. Dein Computer ist repariert. Du kannst ihn morgen ab 9 Uhr abholen. Bitte ruf uns nicht zurück."
              textEs="Hola, aquí el servicio técnico. Tu ordenador está reparado. Puedes recogerlo mañana a partir de las 9. Por favor, no nos devuelvas la llamada."
            />
            <AudioSim 
              title="Escenario 3: Conversación en tienda (Teil 1)"
              textDe="Entschuldigung, was kostet diese Software? – Normalerweise 50 Euro, aber heute ist sie im Angebot für 20 Euro."
              textEs="Disculpe, ¿cuánto cuesta este software? - Normalmente 50 euros, pero hoy está en oferta por 20 euros."
            />
          </div>
        )
      }
    ]
  },
  {
    id: 'g_lesen',
    title: 'Lesen (Comprensión Lectora)',
    desc: 'Textos del día a día y letreros',
    theme: 'notebook',
    slides: [
      {
        title: "Entendiendo Textos Diarios",
        subtitle: "El Examen Lesen (Comprensión Lectora)",
        content: (
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-300 shadow-md">
              <BookOpen size={64} className="text-amber-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Prepárate para leer correos informales, comparar ofertas web y decodificar los estrictos letreros públicos alemanes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">E-Mails und Einladungen<br/>(Correos e invitaciones)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Webseiten und Anzeigen<br/>(Webs y anuncios)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Schilder und Regeln<br/>(Letreros y normas)</span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "El Kit de Lupa (Vocabulario)",
        subtitle: "Indicadores clave en textos escritos",
        content: (props) => (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{ de: "die Einladung", es: "La invitación", type: "Sustantivo", emoji: "✉️" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "das Angebot", es: "La oferta", type: "Sustantivo", emoji: "🏷️" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "das Schild", es: "El letrero / señal", type: "Sustantivo", emoji: "🪧" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "Öffnungszeiten", es: "Horarios de apertura", type: "Plural", emoji: "🕒" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "buchen", es: "Reservar", type: "Verbo", emoji: "📅" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "ein|laden", es: "Invitar", type: "Verbo", emoji: "👋" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "geöffnet / geschlossen", es: "Abierto / Cerrado", type: "Adjetivos", emoji: "🚪" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "verboten / erlaubt", es: "Prohibido / Permitido", type: "Adjetivos", emoji: "🚫" }} {...props} />
          </div>
        )
      },
      {
        title: "Patrones Visuales",
        subtitle: "Gramática para los ojos",
        content: (
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
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
        )
      },
      {
        title: "El Juego de los Espejos",
        subtitle: "Dominando los antónimos en las opciones (A, B, C)",
        content: (
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="La trampa clásica del Goethe-Institut">
              <p>Los textos o audios suelen usar un adjetivo negativo, pero la respuesta correcta usa su <strong>antónimo en positivo</strong>.</p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li>Si el texto dice: <em>"Das Hotel ist nicht teuer"</em> ➡️ Busca la opción: <strong>billig / günstig</strong>.</li>
                <li>Si el anuncio dice: <em>"Das Zimmer ist nicht dunkel"</em> ➡️ Busca la opción: <strong>hell</strong>.</li>
                <li>Si dice: <em>"Die Maschine ist nicht neu"</em> ➡️ Busca la opción: <strong>alt</strong>.</li>
              </ul>
            </GrammarAccordion>
          </div>
        )
      },
      {
        title: "La Regla del Tren",
        subtitle: "Lee textos complejos de derecha a izquierda",
        content: (
          <div className="mt-6 max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-full bg-slate-800 p-6 rounded-xl text-center text-white mb-6 shadow-lg">
              <p className="text-xl font-mono tracking-wider mb-4">Fahr + Plan + <span className="text-amber-400 font-bold border-b-2 border-amber-400 pb-1">Auskunft</span></p>
              <p className="text-sm text-slate-300">Viaje + Plan + <strong className="text-amber-400">Información</strong></p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg w-full">
              <p className="font-bold text-amber-800">💡 La Regla del Tren de Palabras</p>
              <p className="text-sm text-amber-700 mt-1">El último vagón (la derecha) te dice QUÉ es el objeto. Los vagones de la izquierda solo lo describen. ¡Aplica esto cuando veas palabras gigantes!</p>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: 'g_schreiben',
    title: 'Schreiben (Expresión Escrita)',
    desc: 'Formularios y Correos exactos',
    theme: 'medical',
    slides: [
      {
        title: "Tu Firma y tu Voz",
        subtitle: "El Examen Schreiben (Escritura)",
        content: (
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-300 shadow-md">
              <Edit3 size={64} className="text-emerald-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Aprende la burocracia de los formularios y la estructura quirúrgica para escribir correos perfectos sin complicarte.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-emerald-600 block text-lg">Teil 1</span>
                <span className="text-slate-600">Formulare ausfüllen<br/>(Rellenar formularios)</span>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-emerald-600 block text-lg">Teil 2</span>
                <span className="text-slate-600">Eine E-Mail schreiben<br/>(Redactar correos)</span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "El Idioma de la Burocracia",
        subtitle: "Vocabulario obligatorio para formularios",
        content: (props) => (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{ de: "das Formular", es: "El impreso / formulario", type: "Sustantivo", emoji: "📝" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "der Vorname", es: "El nombre de pila", type: "Sustantivo", emoji: "👤" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "der Nachname / Familienname", es: "El apellido", type: "Sustantivo", emoji: "👥" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Straße", es: "La calle", type: "Sustantivo", emoji: "🛣️" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Hausnummer", es: "El número de casa", type: "Sustantivo", emoji: "🔢" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Postleitzahl (PLZ)", es: "El código postal", type: "Sustantivo", emoji: "📮" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "der Wohnort", es: "Lugar de residencia", type: "Sustantivo", emoji: "🏠" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "das Geburtsdatum", es: "Fecha de nacimiento", type: "Sustantivo", emoji: "🎂" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "der Geburtsort", es: "Lugar de nacimiento", type: "Sustantivo", emoji: "🏥" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "das Alter", es: "La edad", type: "Sustantivo", emoji: "⏳" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Staatsangehörigkeit", es: "Nacionalidad", type: "Sustantivo", emoji: "🌍" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "der Beruf", es: "Profesión", type: "Sustantivo", emoji: "💼" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Telefonnummer", es: "Número de teléfono", type: "Sustantivo", emoji: "📱" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die E-Mail-Adresse", es: "Correo electrónico", type: "Sustantivo", emoji: "📧" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Anzahl der Personen", es: "Número de personas", type: "Frase", emoji: "🔢" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "die Unterschrift", es: "La firma", type: "Sustantivo", emoji: "✍️" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "Barzahlung", es: "Pago en efectivo", type: "Sustantivo", emoji: "💶" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "mit Karte zahlen", es: "Pago con tarjeta", type: "Frase", emoji: "💳" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "weiblich / männlich / divers", es: "Femenino/Masculino/Diverso", type: "Adjetivos", emoji: "🚻" }} {...props} />
            <PresentationVocabCard wordObj={{ de: "ledig / verheiratet", es: "Soltero / Casado", type: "Adjetivos", emoji: "💍" }} {...props} />
          </div>
        )
      },
      {
        title: "Caja de Herramientas (Redemittel)",
        subtitle: "Frases comodín para salvar el examen",
        content: (
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
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
        )
      },
      {
        title: "La Regla Simple y Seguro",
        subtitle: "Simulador de Redacción",
        content: (
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 rounded-r-lg">
              <p className="font-bold text-emerald-800">💡 Escribe 3 oraciones cortas</p>
              <p className="text-sm text-emerald-700 mt-1">No te compliques. El examen pide 3 puntos. Escribe una oración exacta para cada punto con el verbo en Posición 2. Menos es más.</p>
            </div>
            
            <EmailSimulator 
              instructions="Escribe un correo a un amigo invitándolo a tu fiesta. Incluye: Cuándo es, dónde es, y pide que confirme asistencia. Mínimo 30 palabras"
              initialText=""
            />
          </div>
        )
      }
    ]
  },
  {
    id: 'g_sprechen',
    title: 'Sprechen (Expresión Oral)',
    desc: 'Presentaciones y Peticiones Educadas',
    theme: 'blueprint',
    slides: [
      {
        title: "Guía Maestra: El Examen Oral",
        subtitle: "Sprechen A1/A2",
        content: (
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-indigo-500 shadow-lg relative">
              <Mic size={64} className="text-indigo-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Aprende a presentarte con fluidez, a formular preguntas directas con tarjetas y a pedir favores usando la fórmula mágica de cortesía.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">Sich vorstellen<br/>(Presentación personal)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Fragen und Antworten<br/>(Tarjetas de temas)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Bitten formulieren<br/>(Peticiones de cortesía)</span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Gramática Visual para Hablar",
        subtitle: "Estructuras sin margen de error",
        content: (
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
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
        )
      },
      {
        title: "Simulador: Teil 1 (Presentación)",
        subtitle: "Sich vorstellen (Toca el altavoz para escuchar)",
        content: (
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm text-slate-800">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <Bot size={32} className="text-indigo-600 bg-indigo-50 p-1.5 rounded-full" />
                <p className="font-bold text-slate-700">Examinador: Bitte stellen Sie sich vor.</p>
                <button onClick={() => nativeSpeak("Bitte stellen Sie sich vor.")} className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-full transition ml-auto"><Volume2 size={20}/></button>
              </div>
              
              <div className="space-y-3 pl-2">
                {[
                  { de: "Ich heiße Marcos.", es: "Me llamo Marcos." },
                  { de: "Ich bin 35 Jahre alt.", es: "Tengo 35 años." },
                  { de: "Ich komme aus Kolumbien und ich wohne in Barranquilla.", es: "Vengo de Colombia y vivo en Barranquilla." },
                  { de: "Ich spreche Spanisch und ein bisschen Deutsch.", es: "Hablo español y un poco de alemán." },
                  { de: "Ich bin Elektroniker von Beruf.", es: "Soy técnico electrónico de profesión." },
                  { de: "Meine Hobbys sind Lesen und Sport machen.", es: "Mis pasatiempos son leer y hacer deporte." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg hover:bg-slate-100 transition">
                    <button onClick={() => nativeSpeak(item.de)} className="text-slate-400 hover:text-indigo-600 transition"><PlayCircle size={18}/></button>
                    <div>
                      <p className="font-bold text-slate-800">{item.de}</p>
                      <p className="text-xs text-slate-500">{item.es}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Simulador: Teil 2 & 3",
        subtitle: "Intercambios y Peticiones Reales",
        content: (
          <div className="mt-6 max-w-3xl mx-auto">
            <h3 className="font-bold text-slate-700 mb-3">Teil 2: Intercambio de Información</h3>
            <InteractiveQA 
              question="Trinkst du am Wochenende Bier?" 
              answer="Ja, ich trinke gern ein Bier am Samstag." 
              note="Tema: Comida | Tarjeta: Cerveza (Bier)"
            />
            <InteractiveQA 
              question="Wo kaufst du deine Schuhe?" 
              answer="Ich kaufe meine Schuhe im Supermarkt." 
              note="Tema: Compras | Tarjeta: Zapatos (Schuhe) -> Usamos W-Frage (Wo)"
            />

            <h3 className="font-bold text-slate-700 mt-8 mb-3">Teil 3: Peticiones de Cortesía</h3>
            <InteractiveQA 
              question="Können Sie mir bitte das Deutschbuch geben?" 
              answer="Ja, klar! Hier ist es." 
              note="Imagen en la tarjeta: Un libro de alemán (das Buch)"
            />
            <InteractiveQA 
              question="Kannst du mir bitte einen Apfel geben?" 
              answer="Natürlich, bitte sehr!" 
              note="Imagen en la tarjeta: Una manzana (der Apfel). Recuerda que es masculino, por eso usamos 'einen'."
            />
          </div>
        )
      }
    ]
  }
];

// --- NUEVO: PLAN DE ESTUDIOS (CLASES MAGISTRALES) ---
const studyPlanModules = [
  {
    id: 'sp_1',
    title: 'Capítulo 1: Los Cimientos y Primeros Pasos',
    content: `### Capítulo 1: Los Cimientos y Primeros Pasos\n\nEl idioma alemán funciona como un sistema modular de bloques. La regla absoluta y más importante para comenzar es la **Regla de Oro de la Posición 2**.\n\n> **👑 La Regla de Oro:** ¡El verbo conjugado es el rey inamovible de la Posición 2! No importa qué pongas al principio, el verbo exige el segundo lugar lógico.\n\n| Posición 1 (Sujeto) | Posición 2 (Verbo) | Posición 3 (Resto) |\n|---|---|---|\n| Ich | wohne | in Madrid. |\n\n### ⚙️ El Motor de Conjugación\nPara conjugar, tomamos la raíz del verbo (ej. *komm-*) y añadimos la terminación según el actor:\n\n| Actor | Terminación | Ejemplo (kommen) | sein (Ser) | haben (Tener) |\n|---|---|---|---|---|\n| **ich** | -e | komme | bin | habe |\n| **du** | -st | kommst | bist | hast |\n| **er/sie/es** | -t | kommt | ist | hat |\n| **wir** | -en | kommen | sind | haben |\n| **ihr** | -t | kommt | seid | habt |\n| **sie/Sie** | -en | kommen | sind | haben |\n\n### ❓ La Matriz de Preguntas\n* **W-Fragen (Abiertas):** La palabra W (*Wer, Wie, Woher, Was, Wo*) ocupa la Posición 1. El verbo sigue en la 2. Sujeto a la 3. 👉 *Wo wohnst du?*\n* **Ja/Nein-Fragen (Cerradas):** El verbo salta a la Posición 1 para llamar la atención. 👉 *Wohnst du in Berlin?*`,
    presentationUrl: 'https://drive.google.com/file/d/1D1x2fDb33331RzgNbJupn8jg-MpjiAzA/view?usp=drive_web'
  },
  {
    id: 'sp_2',
    title: 'Capítulo 2: Mi Círculo, Géneros y Negación',
    content: `### Capítulo 2: Mi Círculo, Géneros y Negación\n\nEl alemán clasifica todo en tres géneros. No intentes buscarles lógica con el español, ¡aprende el "color" de la palabra!\n\n| Masculino | Femenino | Neutro | Plural |\n|---|---|---|---|\n| der (el) | die (la) | das (lo) | die (los/las) |\n| ein (un) | eine (una) | ein (un) | - (unos no existe) |\n\n### 🔑 La Matriz de Posesivos\nTodos los posesivos (*mein*=mi, *dein*=tu, *sein*=su) funcionan exactamente igual que *ein*. **Añade una "-e" al final si la palabra es femenina o plural.**\nEjemplo: *mein Vater* (Masc) vs. *mein**e** Mutter* (Fem) vs. *mein**e** Eltern* (Plural).\n\n> **🚫 La Negación:**\n> * Para negar verbos/acciones usa **nicht**: *Ich tanze nicht.*\n> * Para negar sustantivos usa **kein / keine** ("el asesino de ein"): *Ich habe keine Kinder.*`,
    presentationUrl: 'https://drive.google.com/file/d/1ydPXeoc5VGUyyP2C-_eBo7e0RB-CTTGS/view?usp=drive_web'
  },
  {
    id: 'sp_3',
    title: 'Capítulo 3: El Misterioso Caso Acusativo',
    content: `### Capítulo 3: El Misterioso Caso Acusativo\n\nEl Acusativo es la "víctima" o el Objeto Directo de una acción. Responde a *¿Qué compras?* o *¿A quién buscas?*\n\n> **🎯 La Regla de Oro del Acusativo:** Al Acusativo solo le importan los masculinos. Deja exactamente igual al femenino, al neutro y al plural. ¡Solo ataca a las palabras masculinas poniéndoles la terminación **-en**!\n\n| Género | Nominativo (Sujeto) | Acusativo (Objeto Directo) |\n|---|---|---|\n| **Masculino** | der, ein, kein, mein | **den, einen, keinen, meinen** |\n| **Femenino** | die, eine, keine | die, eine, keine |\n| **Neutro** | das, ein, kein | das, ein, kein |\n| **Plural** | die, meine, keine | die, meine, keine |\n\n**Verbos activadores:** *kaufen, brauchen, essen, trinken, haben, möchten*.\nEjemplo: *Ich kaufe **einen** Käse (masculino) und eine Tomate (femenino).*`,
    presentationUrl: 'https://drive.google.com/file/d/1QusIBIw3hhDxZvtnB3eocWlPWW43dlIp/view?usp=drive_web'
  },
  {
    id: 'sp_4',
    title: 'Capítulo 4: Rutina y Verbos Separables',
    content: `### Capítulo 4: Rutina y Verbos Separables\n\nLos *Trennbare Verben* (Verbos Separables) son acciones que se parten en dos pedazos exactos al conjugarse en presente.\n\n> **🗜️ El Efecto Pinza (Die Satzklammer):** El motor (la raíz del verbo) se queda en la Posición 2, pero el prefijo se desconecta y actúa como un tapón que cierra la tubería al **final absoluto** de la oración.\n\nEjemplo con *aufstehen* (levantarse):\n👉 Ich **stehe** am Montag um 7 Uhr **auf**.\n\n### ⏱️ Regla TeKaMoLo (Tiempo antes de Lugar)\nEn la "cinta transportadora" de la frase, el bloque de TIEMPO siempre va antes que el bloque de LUGAR.\n✅ *Ich gehe **heute** ins Kino.*\n❌ *Ich gehe ins Kino heute.*\n\n*Embudo de tiempo:* **im** (Meses/Estaciones), **am** (Días), **um** (Horas exactas).`,
    presentationUrl: 'https://drive.google.com/file/d/1s4MSGKeK7xVZF2qGN4JSXu5dl43VkhOC/view?usp=drive_web'
  },
  {
    id: 'sp_5',
    title: 'Capítulo 5: Darle actitud - Verbos Modales',
    content: `### Capítulo 5: Darle actitud - Verbos Modales\n\nLos verbos modales le dan sabor e intención (habilidad, obligación, permiso, deseo) a tus acciones.\n\n| Verbo | Intención | Forma Rebelde (ich/er/sie) | Ejemplo |\n|---|---|---|---|\n| **können** | Habilidad / Saber hacer | kann | Ich kann sehr gut schwimmen. |\n| **müssen** | Obligación Absoluta | muss | Wir müssen arbeiten. |\n| **dürfen** | Permiso / Reglas | darf | Man darf hier nicht rauchen. |\n| **wollen** | Voluntad Fuerte | will | Er will das machen. |\n| **sollen** | Consejo / Encargo | soll | Du sollst die Arbeit machen. |\n| **möchten** | Deseo Educado | möchte | Ich möchte eine Katze haben. |\n\n> **🥪 El Sándwich Verbal:** El verbo Modal se sienta en el trono de la Posición 2. La Acción Real es empujada al abismo, al final absoluto de la frase, congelada en su forma original (Infinitivo en -en).\n\n**La Conjugación Rebelde:** En los modales, "ich" (yo) y "er/sie/es" son gemelos idénticos. No llevan terminación. (*ich kann, er kann*).`,
    presentationUrl: 'https://drive.google.com/file/d/12ef-35y8c5SaFbw4v1xIZX74-5E8mX6c/view?usp=drive_web'
  },
  {
    id: 'sp_6',
    title: 'Capítulo 6: Descifrando el Dativo',
    content: `### Capítulo 6: Descifrando el Dativo\n\nEl Dativo es el traje especial para el "Receptor" de una acción (el Objeto Indirecto).\n\n> **🔑 El Código M-R-M-N:** Los artículos cambian completamente. Memoriza estas 4 letras finales:\n> * Masc: de**m** | Fem: de**r** | Neutro: de**m** | Plural: de**n** (+n al sustantivo)\n\n### El Embudo de Preposiciones Exigentes\nSi ves una de estas preposiciones, la palabra que sigue entra automáticamente en Dativo:\n**mit** (con), **nach** (hacia), **aus** (de adentro), **zu** (hacia), **von** (de), **bei** (en casa de), **seit** (desde), **ab** (a partir de).\n\nEjemplo: *Ich fahre **mit dem** Zug.* (Voy con el tren).\nPronombres en Dativo: *mir* (a mí), *dir* (a ti), *ihm* (a él), *ihr* (a ella).`,
    presentationUrl: 'https://drive.google.com/file/d/1n_dLlwAlx9mJMoytcMC4wV3TjNCb59-r/view?usp=drive_web'
  },
  {
    id: 'sp_7',
    title: 'Capítulo 7: Das Perfekt (El Pasado)',
    content: `### Capítulo 7: Das Perfekt (El Pasado)\n\nPara contar anécdotas o hablar de vacaciones, usamos Das Perfekt. Es un rompecabezas mecánico de dos pilares.\n\n| Sujeto | Ayudante (Pos 2) | Relleno | El Participio (Final) |\n|---|---|---|---|\n| Ich | habe | eine Pizza | gekauft. |\n\n### ¿Haben o Sein?\n* **Haben (90%):** El Ancla. Acciones estáticas (comer, leer, trabajar). *Ich habe gelesen.*\n* **Sein (10%):** La Flecha. Desplazamiento (A → B) o cambio de estado. *Ich bin nach Berlin geflogen.*\n\n> **⏩ El Atajo Práctico (Präteritum):** Para "tener" y "ser", no uses el Perfekt, usa el atajo.\n> * haben → **hatte** (tuve/tenía)\n> * sein → **war** (fui/estaba)\n> ¡Van solos en Posición 2 sin participio final!`,
    presentationUrl: 'https://drive.google.com/file/d/1rWmyyVBBceZm2lzbaNY8Luuvv5X6vgfU/view?usp=drive_web'
  },
  {
    id: 'sp_8',
    title: 'Capítulo 8: Kit Médica (Imperativo)',
    content: `### Capítulo 8: Kit de Supervivencia Médica (Imperativo)\n\nPara dar órdenes directas, recetas o consejos, usamos el Imperativo. Es eficiente y no pierde el tiempo.\n\n| Tú (du) informal | Ustedes (ihr) plural | Usted (Sie) formal |\n|---|---|---|\n| **Komm!** | **Kommt!** | **Kommen Sie!** |\n| *(Se elimina 'du' y la 'st')* | *(Solo elimina 'ihr')* | *(Verbo completo + Sie)* |\n\n**Excepciones Críticas:**\n* *sprechen* → **Sprich!** (cambio vocálico).\n* *fahren* → **Fahr!** (pierde la diéresis).\n* *sein* → **Sei!** (completamente irregular).\n\n**El Verbo 'Sollen':** Se usa para consejos a largo plazo o transmitir lo que dijo el doctor. *"Du sollst viel Wasser trinken."*`,
    presentationUrl: 'https://drive.google.com/file/d/1hvauciZnzhQPR7Jcvlhktq7VRdc_Xvrq/view?usp=drive_web'
  },
  {
    id: 'sp_9',
    title: 'Capítulo 9: Uniendo Ideas (Fantasma Cero)',
    content: `### Capítulo 9: Uniendo Ideas (Fantasma Cero)\n\n¿Cómo unimos dos frases fluidamente sin romper la regla de hierro de que el verbo va en la Posición 2?\n\n> **👻 Los Conectores Fantasma Cero (ADUSO):** Operan como bisagras externas. Son invisibles para el conteo. La nueva frase empieza a contar desde 1, dejando al verbo a salvo en la Posición 2.\n\n* **A**ber (pero) - Contraste.\n* **D**enn (porque) - Razón.\n* **U**nd (y) - Adición.\n* **S**ondern (sino) - Corrección tras un *nicht/kein*.\n* **O**der (o) - Alternativa.\n\n| Frase 1 | [0] Conector | [1] Sujeto | [2] Verbo | [3] Resto |\n|---|---|---|---|---|\n| Ich kaufe das T-Shirt, | **und** | ich | kaufe | die Hose. |`,
    presentationUrl: 'https://drive.google.com/file/d/1ja2uZyZv5RMsli1g6RVJAleFgRD4YVnG/view?usp=drive_web'
  },
  {
    id: 'sp_10',
    title: 'Capítulo 10: El Manual del Navegante',
    content: `### Capítulo 10: El Manual del Navegante\n\nLas coordenadas maestras del espacio requieren saber si estamos quietos o en movimiento.\n\n| ¿Wo? (¿En dónde?) | ¿Wohin? (¿A dónde?) |\n|---|---|\n| Ubicación estática. El objeto está descansando en su sitio. | Desplazamiento. Viaje cruzando un límite (A → B). |\n| 👉 **Usa Dativo (El Sillón del Dativo)**. | 👉 **Usa Acusativo**. |\n\n### Las 9 Wechselpräpositionen (Espaciales)\n**in** (dentro), **an** (pegado a), **auf** (sobre superficie), **über** (levitando/encima), **unter** (debajo), **neben** (al lado), **vor** (delante), **hinter** (detrás), **zwischen** (entre).\n\n**Contracciones vitales:** *in + dem = **im*** \\|  *an + dem = **am***\nEjemplo (Estático / Wo / Dativo): *Das Handy liegt **auf dem** Tisch.*`,
    presentationUrl: 'https://drive.google.com/file/d/1wS542v_rcsuYj1cpEsTzahsmKDBQQxjV/view?usp=drive_web'
  },
  {
    id: 'sp_11',
    title: 'Capítulo 11: Declinación Fuerte (Nullartikel)',
    content: `### Capítulo 11: La Declinación Fuerte de los Adjetivos (Nullartikel)\n\n**Explicación extendida:**\nCuando un adjetivo se coloca directamente antes de un sustantivo (función atributiva, como en "café caliente"), su terminación debe cambiar para reflejar el género, el número y el caso de ese sustantivo. Esto se conoce como declinación del adjetivo.\n\nLa **declinación fuerte** ocurre específicamente cuando no hay ningún artículo delante del adjetivo (un fenómeno común llamado *Nullartikel* o artículo cero), o cuando va precedido de palabras invariables que no tienen terminaciones propias (como los números *zwei*, *drei*, o palabras como *etwas* o *mehr*).\n\nAl no existir un artículo (*der, die, das, ein, eine*) que le indique al oyente si el sustantivo es masculino, femenino, neutro, singular o plural, el adjetivo se ve obligado a hacer todo el trabajo pesado. Por lo tanto, el adjetivo adopta las terminaciones típicas de los artículos definidos.\n\n> **⚠️ Advertencia y error típico de hispanohablantes:** En español, los adjetivos cambian de forma muy simple ("café negro", "cafés negros"). En alemán, tendemos a olvidar poner la terminación si vemos que no hay artículo. Decir *Ich trinke schwarz Kaffee* es incorrecto; el adjetivo debe declinarse con la terminación del artículo masculino en acusativo (-en), convirtiéndose en **Ich trinke schwarzen Kaffee**.\n\nHay una pequeña excepción a la regla de copiar fielmente al artículo definido: en el caso Genitivo para el masculino y neutro singular, la terminación del adjetivo es *-en* en lugar de *-es*, debido a que el propio sustantivo ya añade una -s o -es al final, haciendo redundante la marca fuerte en el adjetivo. Sin embargo, para los propósitos comunicativos de un nivel A1 sólido, nos enfocaremos de forma prioritaria en los casos funcionales cotidianos: **Nominativo, Acusativo y Dativo**.\n\n---\n\n### Clase completa con ejemplos:\n\n**Ejemplo 1 (Nominativo Masculino):** *Kalter Kaffee schmeckt mir nicht.*\n* **Traducción literal:** Frío café sabe a mí no.\n* **Traducción natural:** El café frío no me gusta.\n* **Análisis:** *Kaffee* es masculino (*der Kaffee*) y actúa como sujeto (Nominativo). Al no haber artículo, el adjetivo toma la terminación **-er** del artículo *der*.\n\n**Ejemplo 2 (Acusativo Masculino):** *Ich trinke gerne schwarzen Tee.*\n* **Traducción literal:** Yo trinke con gusto negro té.\n* **Traducción natural:** Me gusta tomar té negro.\n* **Análisis:** *Tee* es masculino (*der Tee*). En esta frase es el objeto directo (Acusativo). Como el artículo en acusativo sería *den*, el adjetivo adopta la terminación **-en**.\n\n**Ejemplo 3 (Nominativo Neutro):** *Frisches Wasser ist gesund.*\n* **Traducción literal:** Fresca agua es saludable.\n* **Traducción natural:** El agua fresca es saludable.\n* **Análisis:** *Wasser* es neutro (*das Wasser*) y es el sujeto (Nominativo). El adjetivo adopta la terminación **-es** proveniente del artículo *das*.\n\n**Ejemplo 4 (Acusativo Neutro):** *Wir kaufen deutsches Bier.*\n* **Traducción literal:** Nosotros compramos alemana cerveza.\n* **Traducción natural:** Compramos cerveza alemana.\n* **Análisis:** *Bier* es neutro (*das Bier*), aquí funciona como objeto directo (Acusativo). El adjetivo mantiene la terminación **-es** del neutro.\n\n**Ejemplo 5 (Dativo Femenino):** *Der Salat ist aus frischer Milch gemacht.*\n* **Traducción literal:** La ensalada es de fresca leche hecha.\n* **Traducción natural:** La ensalada está hecha con leche fresca.\n* **Análisis:** *Milch* es femenino (*die Milch*). La preposición *aus* exige caso Dativo de forma obligatoria. El dativo femenino de *die* es *der*, por lo tanto, el adjetivo recibe la terminación **-er**.\n\n---\n\n### Esquema de Terminaciones (Declinación Fuerte / Sin Artículo):\n\n| Caso | Masculino (der) | Femenino (die) | Neutro (das) | Plural (die) |\n|---|---|---|---|---|\n| **Nominativo** | -er | -e | -es | -e |\n| **Acusativo** | -en | -e | -es | -e |\n| **Dativo** | -em | -er | -em | -en |\n\n---\n\n### Frases de uso diario:\n\n* **Ich wünsche dir großen Erfolg!** (¡Te deseo un gran éxito! -> Éxito es *der Erfolg*, en acusativo masculino sin artículo toma la terminación **-en**).\n* **Haben Sie kalte Getränke?** (¿Tiene bebidas frías? -> Bebidas es plural *die Getränke*, en acusativo plural sin artículo toma la terminación **-e**).\n* **Ich trinke lieber roten Wein.** (Prefiero tomar vino tinto. -> Vino es *der Wein*, en acusativo masculino toma la terminación **-en**).\n\n---\n\n### 📝 Autoevaluación:\n\nCompleta los espacios en blanco aplicando las terminaciones de la declinación fuerte:\n\n1. Ich mag alt____ Käse (*der Käse* - objeto directo en Acusativo).\n2. Gut____ Brot ist teuer (*das Brot* - sujeto en Nominativo).\n3. Sie hilft mir mit groß____ Freude (*die Freude* - después de la preposición *mit*, que exige Dativo).\n4. Dort stehen zwei klein____ Kinder (Plural en Nominativo, precedido por el número invariable *zwei*).\n\n**✅ Solución:**\n1. **alten** (*Ich mag alten Käse* -> Acusativo masculino toma la terminación -en).\n2. **Gutes** (*Gutes Brot ist teuer* -> Nominativo neutro toma la terminación -es).\n3. **großer** (*mit großer Freude* -> Dativo femenino toma la terminación -er).\n4. **kleine** (*zwei kleine Kinder* -> Plural en nominativo sin artículo determinado toma la terminación -e).`,
    presentationUrl: 'https://drive.google.com/file/d/1uXg-DLwnQLSTdsSFbT8yPmHpTBWM2miu/view?usp=drive_web1'
  }
];

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
  const [storyState, setStoryState] = useState({ isOpen: false, loading: false, de: "", es: "" });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [user, setUser] = useState(null);
  const [cardImages, setCardImages] = useState({});
  const [isImageLoading, setIsImageLoading] = useState(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isTutorFullscreen, setIsTutorFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "model", parts: [{ text: "¡Hallo! Soy tu tutor experto de alemán. He guardado nuestro historial. ¿En qué te puedo ayudar hoy? 🇩🇪" }] }
  ]);
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
    const imagesRef = collection(db, 'artifacts', appId, 'public', 'data', 'flashcardImages');
    const unsubscribe = onSnapshot(imagesRef, (snapshot) => {
      const loadedImages = {};
      snapshot.forEach(doc => {
        loadedImages[doc.id] = doc.data().imageBase64;
      });
      setCardImages(loadedImages);
    }, (error) => console.error("Error cargando imágenes:", error));
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user || !db) return;
    const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
    const unsubscribe = onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setChatMessages(docSnap.data().messages || []);
      } else {
        const initialMsgs = [{ role: "model", parts: [{ text: "¡Hallo! Soy tu tutor experto de alemán. He guardado nuestro historial. ¿En qué te puedo ayudar hoy? 🇩🇪" }] }];
        setChatMessages(initialMsgs);
        setDoc(chatDocRef, { messages: initialMsgs }).catch(console.error);
      }
    }, (error) => console.error("Error cargando chat:", error));
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      return chapters.flatMap(c => 
        c.words.map(w => ({ ...w, chapter: c.title, emoji: c.emoji, isRedemittel: c.isRedemittel }))
      ).filter(w => 
        w.de.toLowerCase().includes(lowerTerm) || 
        w.es.toLowerCase().includes(lowerTerm) ||
        w.type.toLowerCase().includes(lowerTerm) || 
        (w.category && w.category.toLowerCase().includes(lowerTerm))
      );
    }
    return activeChapter ? activeChapter.words.map(w => ({ ...w, chapter: activeChapter.title, emoji: activeChapter.emoji })) : [];
  }, [activeChapterId, searchTerm, activeChapter]);

  const toggleCard = (index) => setRevealedCards(prev => ({ ...prev, [index]: !prev[index] }));
  const revealAll = () => { const all = {}; displayedWords.forEach((_, i) => all[i] = true); setRevealedCards(all); };
  const hideAll = () => setRevealedCards({});

  const startQuiz = () => {
    const allWords = chapters.flatMap(c => c.words);
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    const options = [randomWord.es];
    while(options.length < 4) {
      const randomWrong = allWords[Math.floor(Math.random() * allWords.length)].es;
      if(!options.includes(randomWrong)) options.push(randomWrong);
    }
    setQuizState({
      word: randomWord,
      options: options.sort(() => Math.random() - 0.5),
      selected: null,
      isCorrect: null
    });
    setViewMode("quiz");
  };

  const handleQuizAnswer = (opt) => {
    if (quizState.selected) return;
    setQuizState(prev => ({ ...prev, selected: opt, isCorrect: opt === quizState.word.es }));
  };

  const generateStory = async () => {
    if (!activeChapter) return;
    const granted = await showRewardVideo();
    if (!granted) return;
    setStoryState({ isOpen: true, loading: true, de: "", es: "" });
    const wordsToUse = displayedWords.slice(0, 8).map(w => w.de).join(", ");
    
    try {
      const payload = {
          contents: [{ parts: [{ text: `Escribe un micro-cuento muy divertido e imaginativo (exactamente 4 oraciones) de nivel A1 en alemán usando obligatoriamente algunas de estas palabras: ${wordsToUse}.` }] }],
          systemInstruction: { parts: [{ text: "Responde estrictamente en formato JSON válido usando este esquema: {\"de\": \"cuento en alemán\", \"es\": \"traducción al español\"}" }] },
          generationConfig: { responseMimeType: "application/json" }
      };
      const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });
      const result = JSON.parse(response.candidates[0].content.parts[0].text);
      setStoryState({ isOpen: true, loading: false, de: result.de, es: result.es });
    } catch (e) {
      console.error(e);
      setStoryState({ isOpen: true, loading: false, de: "Error al generar el cuento.", es: "Por favor, intenta de nuevo más tarde." });
    }
  };

  const groupWordsByCategory = (words) => {
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
    const newUserMessage = { role: "user", parts: [{ text: chatInput }] };
    const newMessages = [...chatMessages, newUserMessage];
    setChatMessages(newMessages);
    setChatInput("");
    setIsChatLoading(true);

    if (user && db) {
      const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
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

  const generateCardImage = async (wordObj, e) => {
    if (e) e.stopPropagation();
    const granted = await showRewardVideo();
    if (!granted) return;
const safeId = getSafeId(wordObj.de).substring(0, 150);
    
    if (cardImages[safeId]) return;

    setIsImageLoading(safeId);
    try {
      const promptText = `Generate a simple, clear, flat vector illustration on a white background representing the German word "${wordObj.de}" meaning "${wordObj.es}". No text in the image.`;
      
      const result = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-fast-generate-001:predict?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: promptText }],
          parameters: { sampleCount: 1, aspectRatio: "1:1" }
        })
      });
      
      const base64Image = result?.predictions?.[0]?.bytesBase64Encoded;
      if (!base64Image) {
          throw new Error("No image data returned from API");
      }
      
      setCardImages(prev => ({...prev, [safeId]: base64Image}));

      if (user && db) {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'flashcardImages', safeId);
        await setDoc(docRef, { imageBase64: base64Image, word: wordObj.de }).catch(console.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsImageLoading(null);
    }
  };

  const speakText = async (word, e) => {
    if(e) e.stopPropagation(); 
    const textToSpeak = typeof word === 'string' ? word : word.de;
    nativeSpeak(textToSpeak);
  };

  const PresentationViewer = ({ presentation, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => { if (currentSlide < presentation.slides.length - 1) setCurrentSlide(prev => prev + 1); };
    const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(prev => prev - 1); };

    const isBlueprint = presentation.theme === 'blueprint';
    const isMedical = presentation.theme === 'medical';
    const isNotebook = presentation.theme === 'notebook';

    let containerClass = "h-full flex flex-col overflow-hidden ";
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

    const slideProps = { cardImages, generateCardImage, isImageLoading, openAiTutor };

    return (
      <div className="absolute inset-0 z-20 animate-in fade-in zoom-in-95 duration-200 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 flex flex-col bg-white">
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
            <button onClick={onClose} className={`p-2 rounded-full transition ${isBlueprint ? 'hover:bg-blue-900 text-blue-300' : 'hover:bg-slate-200 text-slate-500'}`}>
              <X size={24} />
            </button>
          </div>

          <div className={bodyClass}>
            <div className="max-w-4xl mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300" key={currentSlide}>
              <div className="mb-6 md:mb-10 text-center">
                 <h1 className={`text-3xl md:text-5xl font-black mb-3 ${isBlueprint ? 'text-white' : isMedical ? 'text-emerald-950' : 'text-amber-950'}`}>
                   {presentation.slides[currentSlide].title}
                 </h1>
                 {presentation.slides[currentSlide].subtitle && (
                   <h2 className={`text-lg md:text-xl font-medium ${isBlueprint ? 'text-blue-300' : isMedical ? 'text-emerald-700' : 'text-amber-700/80'}`}>
                     {presentation.slides[currentSlide].subtitle}
                   </h2>
                 )}
              </div>
              <div className="w-full">
                {typeof presentation.slides[currentSlide].content === 'function' 
                  ? presentation.slides[currentSlide].content(slideProps) 
                  : presentation.slides[currentSlide].content}
              </div>
            </div>
          </div>

          <div className={`p-4 shrink-0 flex items-center justify-between border-t ${isBlueprint ? 'border-blue-800 bg-blue-950/80 backdrop-blur' : isMedical ? 'border-emerald-100 bg-white/80 backdrop-blur' : 'border-amber-900/10 bg-[#fdfbf7]/80 backdrop-blur'}`}>
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition disabled:opacity-30 ${isBlueprint ? 'bg-blue-900 text-white hover:bg-blue-800' : isMedical ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'}`}
            >
              <ChevronLeft size={20}/> Anterior
            </button>
            
            <div className="flex gap-1.5">
              {presentation.slides.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? (isBlueprint ? 'bg-blue-400 w-6' : isMedical ? 'bg-emerald-500 w-6' : 'bg-amber-600 w-6') : (isBlueprint ? 'bg-blue-900' : isMedical ? 'bg-emerald-200' : 'bg-amber-200')}`} />
              ))}
            </div>

            <button 
              onClick={currentSlide === presentation.slides.length - 1 ? onClose : nextSlide} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isBlueprint ? 'bg-blue-500 text-blue-950 hover:bg-blue-400' : isMedical ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
            >
              {currentSlide === presentation.slides.length - 1 ? 'Finalizar' : 'Siguiente'} <ChevronRight size={20}/>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={isFullscreen ? "fixed inset-0 z-[9999] bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto" : "min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-y-auto relative"}>
      
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
            <input 
              type="text" 
              placeholder="Buscar (ej. Motor, essen, Verbo Modal)..."
              className="w-full py-2 px-4 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (viewMode === "quiz" || viewMode === "presentation" || viewMode === "studyPlan") setViewMode("flashcards");
              }}
            />
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
            <button onClick={startQuiz} className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition flex items-center gap-2">
              <Gamepad2 size={18} /> Quiz
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
        
        {/* SIDEBAR */}
        {!isFullscreen && viewMode !== "quiz" && viewMode !== "roleplay" && !searchTerm && (
          <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
            
            {/* SECCIÓN 1: Tablas Maestras */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 p-3 font-black text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                Tablas Maestras
              </div>
              <ul className="flex flex-col max-h-[40vh] overflow-y-auto custom-scrollbar">
                {chapters.map(chap => (
                  <li key={chap.id}>
                    <button
                      onClick={() => {
                        setActiveChapterId(chap.id);
                        if (viewMode !== 'flashcards' && viewMode !== 'table') setViewMode('flashcards');
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-l-4 ${activeChapterId === chap.id && (viewMode === 'flashcards' || viewMode === 'table') ? 'bg-blue-50 text-blue-800 font-bold border-blue-600' : 'border-transparent hover:bg-slate-50 text-slate-600'}`}
                    >
                      <span className="text-xl">{chap.emoji}</span>
                      <span className="text-sm leading-tight">{chap.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECCIÓN NUEVA: Plan de Estudio */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-emerald-50 p-3 font-black text-xs text-emerald-600 uppercase tracking-wider border-b border-emerald-100 flex items-center gap-2">
                <BookOpen size={14} /> Plan de Estudio: Dominio A1
              </div>
              <ul className="flex flex-col max-h-[30vh] overflow-y-auto custom-scrollbar">
                {studyPlanModules.map(mod => (
                  <li key={mod.id}>
                    <button
                      onClick={() => {
                        setActiveStudyPlanId(mod.id);
                        setViewMode('studyPlan');
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-l-4 ${activeStudyPlanId === mod.id && viewMode === 'studyPlan' ? 'bg-emerald-50 text-emerald-800 font-bold border-emerald-600' : 'border-transparent hover:bg-slate-50 text-slate-600'}`}
                    >
                      <span className="text-emerald-500"><Sparkles size={16} /></span>
                      <span className="text-sm leading-tight font-medium">{mod.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECCIÓN 3: Módulos de Estudio Goethe (Presentaciones) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-indigo-50 p-3 font-black text-xs text-indigo-600 uppercase tracking-wider border-b border-indigo-100 flex items-center gap-2">
                <Presentation size={14} /> Módulos de Estudio Goethe
              </div>
              <ul className="flex flex-col">
                {goetheModules.map(pres => (
                  <li key={pres.id}>
                    <button
                      onClick={() => {
                        setActivePresentationId(pres.id);
                        setViewMode('presentation');
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors border-l-4 ${activePresentationId === pres.id && viewMode === 'presentation' ? 'bg-indigo-50 text-indigo-900 font-bold border-indigo-600' : 'border-transparent hover:bg-slate-50 text-slate-700'}`}
                    >
                      <div>
                        <div className="text-sm leading-tight font-bold">{pres.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{pres.desc}</div>
                      </div>
                      <PlayCircle size={16} className={activePresentationId === pres.id && viewMode === 'presentation' ? 'text-indigo-600' : 'text-slate-300'} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        )}

        {/* CONTENT AREA */}
        <section className="flex-1 w-full min-w-0 pb-20 relative">
          
          {/* MODO PRESENTACIÓN VISUAL */}
          {viewMode === "presentation" && activePresentation && (
            <PresentationViewer 
              presentation={activePresentation} 
              onClose={() => {
                setViewMode('flashcards');
                setActivePresentationId(null);
              }} 
            />
          )}

          {/* VISTA: QUIZ */}
          {viewMode === "quiz" && (
             <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-2xl mx-auto mt-10 text-center animate-in fade-in zoom-in duration-300 relative">
               <button 
                 onClick={() => { setViewMode("flashcards"); setQuizState(null); showInterstitial(); }} 
                 className="absolute top-4 right-4 sm:top-6 sm:left-6 sm:right-auto flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition font-bold shadow-sm"
                 title="Volver a los módulos"
               >
                 <X size={18} /> Salir del Quiz
               </button>

               <div className="inline-flex items-center justify-center p-3 bg-yellow-100 text-yellow-800 rounded-full mb-4 mt-12 sm:mt-0">
                 <Gamepad2 size={32} />
               </div>
               <h2 className="text-xl font-medium text-slate-500 mb-2">¿Qué significa esta palabra?</h2>
               <div className="text-4xl md:text-5xl font-black text-slate-800 mb-8 mt-4 bg-slate-50 border-2 border-slate-100 py-10 px-4 rounded-xl shadow-inner">
                 {quizState?.word.de}
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {quizState?.options.map((opt, i) => {
                   let btnClass = "bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700";
                   if (quizState.selected) {
                     if (opt === quizState.word.es) btnClass = "bg-green-50 border-2 border-green-500 text-green-700 font-bold shadow-sm";
                     else if (opt === quizState.selected) btnClass = "bg-red-50 border-2 border-red-500 text-red-700";
                     else btnClass = "bg-slate-50 border-2 border-slate-100 text-slate-400 opacity-50";
                   }
                   return (
                     <button key={i} onClick={() => handleQuizAnswer(opt)} disabled={!!quizState.selected} className={`py-4 px-6 rounded-xl text-lg transition-all ${btnClass}`}>
                       {opt}
                     </button>
                   );
                 })}
               </div>
               {quizState?.selected && (
                 <div className="mt-8 flex flex-col items-center gap-4 animate-in slide-in-from-bottom-4">
                   <div className={`flex items-center gap-2 text-xl font-bold ${quizState.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                     {quizState.isCorrect ? <CheckCircle size={28}/> : <XCircle size={28}/>}
                     {quizState.isCorrect ? "¡Richtig! (¡Correcto!)" : `Falsch. Era: ${quizState.word.es}`}
                   </div>
                   <button onClick={startQuiz} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition w-full sm:w-auto">
                     Siguiente Palabra ➔
                   </button>
                 </div>
               )}
             </div>
          )}

          {/* VISTA: SIMULADOR DE ROL (GEMINI API) ✨ */}
          {viewMode === "roleplay" && typeof RoleplaySimulator !== 'undefined' && (
            <RoleplaySimulator apiKey={apiKey} onExit={() => setViewMode("flashcards")} />
          )}

          {/* VISTA: PLAN DE ESTUDIO (CLASES MAGISTRALES) */}
          {viewMode === "studyPlan" && activeStudyPlanId && (
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 mb-10">
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
               {studyPlanModules.find(m => m.id === activeStudyPlanId).presentationUrl && (
                 <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center sm:justify-start">
                   <a 
                     href={studyPlanModules.find(m => m.id === activeStudyPlanId).presentationUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:scale-105"
                   >
                     <Presentation size={20} />
                     Abrir Presentación de la Clase
                   </a>
                 </div>
               )}
            </div>
          )}
          
          {/* VISTAS: FLASHCARDS Y TABLA */}
          {(viewMode === "flashcards" || viewMode === "table") && (
            <>
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

                {(!activeChapter?.isRedemittel || searchTerm) && (
                  <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-auto border border-slate-200">
                    <button onClick={() => setViewMode("flashcards")} className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition ${viewMode === "flashcards" ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}>
                      <LayoutGrid size={16}/> Flashcards
                    </button>
                    <button onClick={() => setViewMode("table")} className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition ${viewMode === "table" ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}>
                      <List size={16}/> Tabla
                    </button>
                  </div>
                )}
              </div>

              {/* RENDER FLASHCARDS */}
              {viewMode === "flashcards" && (
                <>
                  {displayedWords.length > 0 && (
                     <div className="flex justify-end gap-2 mb-4">
                       <button onClick={revealAll} className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-semibold transition">Revelar todo</button>
                       <button onClick={hideAll} className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-semibold transition">Ocultar todo</button>
                     </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedWords.map((word, index) => {
                  const isRevealed = revealedCards[index];
                  const isLongText = word.de.length > 25;
                  const safeId = getSafeId(word.de).substring(0, 150);
                  const imgBase64 = cardImages[safeId];
                  const isGenLoading = isImageLoading === safeId;
                  
                  return (
                    <div key={index} onClick={() => toggleCard(index)} className="group cursor-pointer perspective-1000 h-56">
                      <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
                        
                        {/* Frente */}
                        <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:border-blue-400 overflow-hidden flex flex-col transition-all">
                           {imgBase64 ? (
                              <div className="h-28 w-full bg-slate-100 relative">
                                <img src={`data:image/png;base64,${imgBase64}`} alt={word.de} className="w-full h-full object-contain mix-blend-multiply p-2" />
                              </div>
                           ) : (
                              <div className="h-28 w-full bg-slate-50 flex flex-col items-center justify-center relative border-b border-slate-100 group/imgbtn z-10">
                                <span className="text-4xl opacity-20 absolute pointer-events-none">{word.emoji}</span>
                                <button 
                                  onClick={(e) => generateCardImage(word, e)} 
                                  className="relative z-30 bg-white hover:bg-blue-50 text-blue-600 px-4 py-2 rounded-lg shadow-md border border-blue-200 transition-all flex items-center gap-2 text-xs font-bold" 
                                  title="Generar Imagen Representativa"
                                >
                                  {isGenLoading ? <Loader2 size={16} className="animate-spin text-blue-500" /> : <Sparkles size={16} className="text-blue-500" />}
                                  {isGenLoading ? 'Generando...' : 'Generar Imagen'}
                                </button>
                              </div>
                           )}
                           <div className="flex-1 flex items-center justify-center p-3 relative z-20">
                              <h3 className={`${isLongText ? 'text-sm' : 'text-lg'} font-bold text-slate-800 leading-tight text-center px-6`}>{word.de}</h3>
                              <button onClick={(e) => speakText(word, e)} className="absolute bottom-2 right-2 text-slate-400 hover:text-blue-500 p-1" title="Escuchar pronunciación (de-DE)">
                                <Volume2 size={16} />
                              </button>
                              <button onClick={(e) => openAiTutor(word, e)} className="absolute bottom-2 left-2 text-slate-400 hover:text-yellow-500 p-1" title="Preguntar al tutor">
                                <Bot size={16} />
                              </button>
                           </div>
                        </div>

                        {/* Atrás */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-900 text-white border-2 border-blue-900 rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center">
                          <span className="text-xs text-blue-300 font-semibold mb-1 uppercase tracking-wider">{word.type}</span>
                          <h3 className={`${word.es.length > 25 ? 'text-lg' : 'text-xl'} font-bold text-yellow-400 mb-2 leading-tight`}>{word.es}</h3>
                          {word.pron && word.pron !== "-" && <span className="text-sm font-medium opacity-90 italic">/{word.pron}/</span>}
                          {searchTerm && <span className="absolute bottom-2 text-[10px] text-blue-400 truncate w-full px-2">{word.chapter}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* RENDER TABLA */}
          {viewMode === "table" && (
            <div className="animate-in fade-in pb-10">
              {Object.entries(groupWordsByCategory(displayedWords)).map(([category, words], catIdx) => (
                <div key={catIdx} className="mb-8">
                  {category !== "General" && (
                    <h3 className="text-lg font-bold text-slate-700 mb-3 border-b-2 border-blue-200 pb-2">{category}</h3>
                  )}
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
                          {words.map((word, idx) => (
                            <tr key={idx} className="hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-3 font-bold text-slate-800 flex items-center gap-2">
                                {!activeChapter?.isRedemittel && <button onClick={(e) => speakText(word, e)} className="text-blue-500 hover:text-blue-700 p-1"><Volume2 size={14}/></button>}
                                {word.de}
                              </td>
                              {!activeChapter?.isRedemittel && <td className="px-4 py-3 text-slate-500 italic">/{word.pron}/</td>}
                              <td className="px-4 py-3 font-medium text-slate-700">{word.es}</td>
                              <td className="px-4 py-3 text-slate-500">
                                <span className="bg-slate-100 px-2 py-1 rounded-md text-xs border border-slate-200 text-slate-600">{word.type}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {displayedWords.length === 0 && (
            <div className="py-16 text-center text-slate-400 bg-white rounded-xl border-2 border-dashed border-slate-200">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium text-slate-500">No se encontraron palabras.</p>
            </div>
          )}

          {/* MODAL DEL CUENTO IA */}
          {storyState.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Sparkles className="text-indigo-500" /> Cuento A1 Generado</h3>
                  <button onClick={() => setStoryState(prev => ({...prev, isOpen: false}))} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full"><X size={20}/></button>
                </div>
                {storyState.loading ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 text-indigo-500">
                    <Loader2 size={40} className="animate-spin" />
                    <p className="font-bold animate-pulse">Imaginando historia mágica...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group cursor-pointer" onClick={() => nativeSpeak(storyState.de)}>
                      <p className="font-bold text-lg text-slate-800 leading-relaxed">{storyState.de}</p>
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"><Volume2 size={16}/></button>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                      <p className="text-slate-700 italic">{storyState.es}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>

    {/* --- PANEL LATERAL: TUTOR IA --- */}
    {isTutorOpen && (
      <aside className={`fixed ${isTutorFullscreen ? 'inset-0 w-full z-[100]' : 'inset-y-0 right-0 w-full md:w-[450px] z-50 border-l'} bg-white shadow-2xl border-slate-200 flex flex-col animate-in slide-in-from-right duration-300`}>
        
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
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                {msg.role === 'user' ? msg.parts[0].text : <MarkdownMessage text={msg.parts[0].text} />}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-500 px-4 py-3 rounded-2xl rounded-bl-none flex gap-2 items-center text-sm shadow-sm">
                <Loader2 size={16} className="animate-spin text-blue-500" /> Escribiendo...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
          <div className="relative">
            <input 
              type="text" 
              className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition shadow-inner"
              placeholder="Pregúntame algo en alemán o español..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
            />
            <button 
              onClick={sendChatMessage}
              disabled={!chatInput.trim() || isChatLoading}
              className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-400 transition shadow"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </aside>
    )}
  </main>

  <style dangerouslySetInnerHTML={{__html: `
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px;}
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `}} />
</div>
);
}