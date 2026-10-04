import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, ImagePlus, Loader2, Volume2, Bot, Mic, Sparkles, Check } from 'lucide-react';
import { getSafeId, nativeSpeak, awardCoins } from '../utils/helpers';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const SVGClock = ({ deWord }) => {
  const cleanWord = deWord.trim().toLowerCase();
  
  const clockConfigs = {
    "ein uhr": { hr: 1, min: 0 },
    "halb zwei": { hr: 1, min: 30 },
    "viertel vor drei": { hr: 2, min: 45 },
    "kurz vor 4": { hr: 3, min: 55 },
    "gleich 4": { hr: 3, min: 58 },
    "genau 4 uhr": { hr: 4, min: 0 },
    "fünf nach 4": { hr: 4, min: 5 },
    "um 3 uhr": { hr: 3, min: 0 },
    "von 2 bis 3 uhr": { hr: 2, min: 0, rangeTo: 3 },
    "ab 3 uhr": { hr: 3, min: 0, startFrom: true }
  };

  const config = clockConfigs[cleanWord] || { hr: 10, min: 10, isQuestion: true };

  const minAngle = config.min * 6; 
  const hrAngle = ((config.hr % 12) * 30) + (config.min * 0.5); 

  const faceBg = "#f8fafc";
  const markerColor = "#94a3b8";
  const hrHandColor = "#1e293b";
  const minHandColor = "#3b82f6";
  const accentColor = "#ef4444";
  const highlightColor = "rgba(59, 130, 246, 0.15)";

  let highlightArc = null;
  if (config.rangeTo) {
    const startX = 100 + 70 * Math.sin(60 * Math.PI / 180);
    const startY = 100 - 70 * Math.cos(60 * Math.PI / 180);
    const endX = 100 + 70 * Math.sin(90 * Math.PI / 180);
    const endY = 100 - 70 * Math.cos(90 * Math.PI / 180);
    
    highlightArc = (
      <path 
        d={`M 100 100 L ${startX} ${startY} A 70 70 0 0 1 ${endX} ${endY} Z`} 
        fill={highlightColor} 
        stroke="#3b82f6" 
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    );
  } else if (config.startFrom) {
    const startX = 100 + 70 * Math.sin(90 * Math.PI / 180);
    const startY = 100 - 70 * Math.cos(90 * Math.PI / 180);
    const endX = 100 + 70 * Math.sin(180 * Math.PI / 180);
    const endY = 100 - 70 * Math.cos(180 * Math.PI / 180);

    highlightArc = (
      <path 
        d={`M 100 100 L ${startX} ${startY} A 70 70 0 0 1 ${endX} ${endY} Z`} 
        fill={highlightColor} 
        stroke="#10b981"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    );
  }

  const markers = [];
  for (let i = 0; i < 12; i++) {
    const angle = i * 30 * Math.PI / 180;
    const isMain = i % 3 === 0;
    const r1 = isMain ? 78 : 83;
    const r2 = 90;
    const x1 = 100 + r1 * Math.sin(angle);
    const y1 = 100 - r1 * Math.cos(angle);
    const x2 = 100 + r2 * Math.sin(angle);
    const y2 = 100 - r2 * Math.cos(angle);
    
    markers.push(
      <line 
        key={i}
        x1={x1} 
        y1={y1} 
        x2={x2} 
        y2={y2} 
        stroke={isMain ? "#64748b" : markerColor} 
        strokeWidth={isMain ? "2.5" : "1.5"} 
        strokeLinecap="round"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 p-2 select-none relative">
      <svg width="100%" height="100%" viewBox="0 0 200 200" className="max-w-[120px] drop-shadow-md">
        <circle cx="100" cy="100" r="92" fill="#e2e8f0" />
        <circle cx="100" cy="100" r="90" fill={faceBg} stroke="#cbd5e1" strokeWidth="2" />
        
        {highlightArc}
        {markers}

        <text x="100" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569" fontFamily="sans-serif">12</text>
        <text x="168" y="104" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569" fontFamily="sans-serif">3</text>
        <text x="100" y="177" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569" fontFamily="sans-serif">6</text>
        <text x="32" y="104" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569" fontFamily="sans-serif">9</text>

        {config.isQuestion ? (
          <g>
            <circle cx="100" cy="100" r="8" fill={minHandColor} />
            <text x="100" y="112" textAnchor="middle" fontSize="36" fontWeight="900" fill="#3b82f6" fontFamily="sans-serif" opacity="0.85">?</text>
          </g>
        ) : (
          <g>
            <line 
              x1="100" 
              y1="100" 
              x2="100" 
              y2="52" 
              stroke={hrHandColor} 
              strokeWidth="4.5" 
              strokeLinecap="round"
              transform={`rotate(${hrAngle} 100 100)`}
            />
            <line 
              x1="100" 
              y1="100" 
              x2="100" 
              y2="40" 
              stroke={minHandColor} 
              strokeWidth="3" 
              strokeLinecap="round"
              transform={`rotate(${minAngle} 100 100)`}
            />
            <circle cx="100" cy="100" r="5" fill={accentColor} />
            <circle cx="100" cy="100" r="2" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
};

const PresentationVocabCard = ({ wordObj, cardImages, regeneratedImages, generateCardImage, isImageLoading, openAiTutor: passedOpenAiTutor, setFullscreenImage, unlockedCards, isRevealed, speakText: passedSpeakText, lazyLoadImage }) => {
  const speakText = passedSpeakText || ((word, e) => {
    if (e) e.stopPropagation();
    const textToSpeak = typeof word === 'string' ? word : word.de;
    nativeSpeak(textToSpeak);
  });
  const openAiTutor = passedOpenAiTutor || (() => {});

  const [flipped, setFlipped] = useState(false);
  const { isListening, startListening, stopListening } = useSpeechRecognition();
  const [pronunciationStatus, setPronunciationStatus] = useState(null); // 'listening', 'success', 'error'
  const [recognizedText, setRecognizedText] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const feedbackTimeoutRef = useRef(null);

  const handleSpeakWord = (e) => {
    if (e) e.stopPropagation();
    awardCoins(1);
    setIsPlayingAudio(true);
    playGermanAudio(wordObj.de, {
      type: "vocab",
      voice: "Charon",
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const sentenceText = wordObj.exampleSentenceDe || 
    (Array.isArray(wordObj.exampleSentenceDeBlocks) ? wordObj.exampleSentenceDeBlocks.join(" ") : "");

  const handleSpeakSentence = (e) => {
    if (e) e.stopPropagation();
    if (!sentenceText) return;
    setIsPlayingAudio(true);
    playGermanAudio(sentenceText, {
      type: "sentence",
      voice: "Charon",
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const isLongText = wordObj.de.length > 20;
  const safeId = getSafeId(wordObj.de).substring(0, 150);
  const isUnlocked = true;
  const imgData = cardImages ? cardImages[safeId] : null;
  const existsGlobally = cardImages && !!cardImages[safeId];
  const isGenLoading = isImageLoading === safeId;
  const isRegenerated = true;

  useEffect(() => {
    setFlipped(!!isRevealed);
  }, [isRevealed]);

  useEffect(() => {
    if (isUnlocked && cardImages && cardImages[safeId] === undefined && lazyLoadImage) {
      lazyLoadImage(wordObj);
    }
  }, [isUnlocked, cardImages, safeId, wordObj, lazyLoadImage]);

  // Si la escucha del hook se detiene y seguimos en 'listening', cancelamos el estado
  useEffect(() => {
    if (!isListening && pronunciationStatus === 'listening') {
      setPronunciationStatus(null);
    }
  }, [isListening, pronunciationStatus]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const handlePronunciation = (e) => {
    e.stopPropagation();
    if (pronunciationStatus === 'listening') {
      stopListening();
      setPronunciationStatus(null);
      return;
    }

    setPronunciationStatus('listening');
    setRecognizedText("");
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);

    startListening((transcript) => {
      // Normalización de cadenas (minúsculas y sin puntuación)
      let cleanSpoken = transcript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
      const cleanSingular = wordObj.de.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
      const cleanPlural = (wordObj.plural && wordObj.plural !== "-") 
        ? wordObj.plural.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim() 
        : "";

      // Mapa para convertir números devueltos por Google a sus palabras en alemán
      const numMap = {
        "0": "null", "1": "eins", "2": "zwei", "3": "drei", "4": "vier", 
        "5": "fünf", "6": "sechs", "7": "sieben", "8": "acht", "9": "neun", 
        "10": "zehn", "11": "elf", "12": "zwölf", "13": "dreizehn", "14": "vierzehn",
        "15": "fünfzehn", "16": "sechzehn", "17": "siebzehn", "18": "achtzehn", "19": "neunzehn",
        "20": "zwanzig", "21": "einundzwanzig", "22": "zweiundzwanzig", "23": "dreiundzwanzig",
        "24": "vierundzwanzig", "25": "fünfundzwanzig", "30": "dreißig", "40": "vierzig",
        "50": "fünfzig", "60": "sechzig", "70": "siebzig", "80": "achtzig", "90": "neunzig",
        "100": "hundert", "1000": "tausend"
      };

      if (numMap[cleanSpoken]) {
        cleanSpoken = numMap[cleanSpoken];
      }

      let isSuccessSingular = (cleanSpoken === cleanSingular);
      let isSuccessPlural = (cleanPlural && cleanSpoken === cleanPlural);

      // Lógica especial para letras del alfabeto (longitud 1)
      if (!isSuccessSingular && cleanSingular.length === 1) {
         const letterPhonetics = {
            "a": ["aa", "ah"],
            "b": ["bb", "be"],
            "c": ["cc", "ce"],
            "d": ["dd", "de"],
            "e": ["ee", "eh"],
            "f": ["ff", "ef"],
            "g": ["gg", "ge"],
            "h": ["hh", "ha"],
            "i": ["ii", "ih"],
            "j": ["jj", "jot"],
            "k": ["kk", "ka"],
            "l": ["ll", "el"],
            "m": ["mm", "em"],
            "n": ["nn", "en"],
            "o": ["oo", "oh"],
            "p": ["pp", "pe"],
            "q": ["qq", "ku"],
            "r": ["rr", "er"],
            "s": ["ss", "es"],
            "t": ["tt", "te"],
            "u": ["uu", "uh"],
            "v": ["vv", "fau"],
            "w": ["ww", "we"],
            "x": ["xx", "iks"],
            "y": ["yy", "ypsilon"],
            "z": ["zz", "zett"],
            "ä": ["ää", "äh"],
            "ö": ["öö", "öh"],
            "ü": ["üü", "üh"],
            "ß": ["ss", "esszett", "scharfes s"]
         };
         
         if (cleanSpoken === cleanSingular.repeat(2) || 
             cleanSpoken === cleanSingular.repeat(3) || 
             (letterPhonetics[cleanSingular] && letterPhonetics[cleanSingular].includes(cleanSpoken))) {
            isSuccessSingular = true;
         }
      }

      if (isSuccessSingular) {
        setPronunciationStatus('success-singular');
      } else if (isSuccessPlural) {
        setPronunciationStatus('success-plural');
      } else {
        setPronunciationStatus('error');
        setRecognizedText(transcript); // Para mostrar el badge de qué escuchó
      }

      feedbackTimeoutRef.current = setTimeout(() => {
        setPronunciationStatus(null);
      }, 4000);
    });
  };

  return (
    <div onClick={() => setFlipped(!flipped)} className="relative h-[310px] md:h-[330px] perspective-1000 cursor-pointer w-full group">
      <div className={`w-full h-full transition-all duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRENTE */}
        <div className={`absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-xl shadow-sm flex flex-col justify-between items-center text-center group-hover:border-blue-300 overflow-hidden ${flipped ? 'pointer-events-none' : 'pointer-events-auto'}`}>
          {wordObj.category === 'Uhrzeit' ? (
            <div className="w-full h-[140px] md:h-[150px] shrink-0 border-b border-slate-100 relative">
               <SVGClock deWord={wordObj.de} />
            </div>
          ) : imgData ? (
            <div className="w-full flex-1 min-h-0 bg-slate-50 border-b border-slate-100 relative group/regen flex items-center justify-center">
               <img src={(typeof imgData === 'string' && (imgData.startsWith('http') || imgData.startsWith('data:'))) ? imgData : (typeof imgData === 'string' ? `data:image/png;base64,${imgData}` : '')} alt={wordObj.de} className="object-contain max-h-full max-w-full p-2 shrink-0 rounded-lg mix-blend-multiply cursor-zoom-in hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); if (typeof setFullscreenImage === 'function') setFullscreenImage(imgData); }} />
            </div>
          ) : (
            <div className="w-full flex-1 min-h-0 bg-slate-50 flex flex-col items-center justify-center relative border-b border-slate-100 group/imgbtn z-10">
               <span className="text-4xl opacity-20 absolute pointer-events-none">{wordObj.emoji || "📝"}</span>
               {generateCardImage && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); generateCardImage(wordObj, e); }} 
                   className="relative z-30 bg-white hover:bg-blue-50 text-blue-600 px-3 py-1.5 rounded shadow-sm border border-blue-200 transition-all flex items-center gap-1.5 text-xs font-bold"
                   title="Revelar Imagen"
                 >
                   {isGenLoading ? <Loader2 size={14} className="animate-spin text-blue-500" /> : <Sparkles size={14} className="text-blue-500" />}
                   {isGenLoading ? 'Cargando...' : 'Revelar Imagen'}
                 </button>
               )}
            </div>
          )}
          <div className="w-full shrink-0 flex flex-col items-center justify-center px-2 py-3 pb-8 relative z-20">
              <div className="flex flex-col items-center text-center mt-1.5 mb-2 w-full px-2 shrink-0">
                {/* Grid de 3 columnas: Espacio vacío (izq) - Palabra Centrada - Botón (der) */}
                <div className="grid grid-cols-[28px_1fr_28px] items-center w-full mb-1">
                  <div></div> {/* Pilar invisible izquierdo para equilibrar */}
 
                  <div className="flex items-center justify-center gap-1 min-w-0 w-full overflow-hidden">
                    <h3 className={`font-bold leading-tight text-center break-words min-w-0 w-full px-2 shrink-0 overflow-hidden ${
                      (wordObj.de?.length || 0) > 20
                        ? 'text-xs md:text-sm'
                        : (wordObj.de?.length || 0) > 12
                          ? 'text-sm md:text-base'
                          : 'text-base md:text-lg'
                    } ${
                      pronunciationStatus?.startsWith('success') 
                        ? 'text-emerald-500' 
                        : pronunciationStatus === 'error' 
                          ? 'text-rose-500' 
                          : 'text-slate-800'
                    }`}>
                      {wordObj.de}
                    </h3>
                    {pronunciationStatus === 'success-singular' && <Check size={16} className="text-emerald-500 animate-bounce shrink-0" />}
                  </div>
 
                  <div className="flex justify-center items-center">
                    <button
                      onClick={handleSpeakWord}
                      className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isPlayingAudio
                          ? 'bg-indigo-100 text-indigo-600 scale-110 shadow-sm animate-pulse'
                          : 'text-slate-400 hover:bg-slate-100 hover:text-indigo-500 active:scale-95'
                      }`}
                      title="Escuchar pronunciación"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
 
                {/* Badge de Error de Pronunciación */}
                {pronunciationStatus === 'error' && recognizedText && (
                  <div className="mt-0.5 mb-1.5 bg-rose-50 text-rose-700 text-[9px] md:text-xs px-2 py-0.5 rounded border border-rose-100 shadow-sm animate-fade-in max-w-[90%] break-words font-medium">
                    Entendí: "{recognizedText}"
                  </div>
                )}
 
                {/* Fonética matemáticamente centrada */}
                {wordObj.pron && (
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-tight mb-2 shrink-0 px-2 break-words w-full text-center">[{wordObj.pron}]</p>
                )}
                
                {wordObj.plural && wordObj.plural !== "-" && (
                  <div className="mt-1 flex flex-col items-center bg-slate-50/80 px-4 py-2 rounded-xl border border-slate-200 w-[95%] max-w-[240px] md:max-w-[280px] shadow-sm shrink-0">
                    <div className="flex items-center justify-center gap-1 min-w-0 w-full">
                      <span className={`text-sm md:text-base font-semibold leading-tight text-center break-words transition-colors truncate ${
                        pronunciationStatus === 'success-plural' ? 'text-emerald-600 font-bold' : 'text-slate-700'
                      }`}>
                        Pl: {wordObj.plural}
                      </span>
                      {pronunciationStatus === 'success-plural' && <Check size={14} className="text-emerald-600 animate-bounce shrink-0" />}
                    </div>
                    {wordObj.pluralPron && (
                      <span className="text-xs md:text-sm text-slate-400 font-medium leading-tight mt-1 text-center break-words w-full">
                        [{wordObj.pluralPron}]
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="absolute left-2 bottom-2 flex gap-1 z-30">
                 <button onClick={(e) => { e.stopPropagation(); if(openAiTutor) openAiTutor(wordObj, e); }} className="text-slate-400 hover:text-blue-500 p-1 rounded-full transition-colors" title="Preguntar a IA" aria-label="Preguntar a tutor de Inteligencia Artificial">
                    <Bot size={16} />
                 </button>
              </div>
 
              <div className="absolute right-2 bottom-2 flex gap-1 z-30">
                <button 
                  onClick={handlePronunciation} 
                  className={`p-1.5 rounded-full transition-colors ${
                    pronunciationStatus === 'listening' 
                      ? 'bg-red-50 text-red-500 animate-pulse border border-red-200' 
                      : 'text-slate-400 hover:text-green-500 hover:bg-slate-100'
                  }`} 
                  title="Practicar pronunciación" 
                  aria-label="Practicar pronunciación por micrófono"
                >
                  <Mic size={16} />
                </button>
              </div>
             </div>
        </div>

        {/* ATRÁS */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-[#1e3a8a] border-2 border-[#1e3a8a] text-white rounded-xl shadow-md flex flex-col w-full h-full justify-between items-center p-3 pb-7 text-center overflow-hidden ${flipped ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          
          <div className="flex-1 flex flex-col items-center justify-center w-full h-auto py-1.5 min-h-0">
            <span className="text-[9px] font-semibold text-blue-300/80 mb-0.5 tracking-wider uppercase">{wordObj.type}</span>
            <span className="font-bold text-sm md:text-base text-yellow-400 leading-tight text-center break-words w-full px-2 shrink-0">{wordObj.es}</span>
            {/* Renderizado de oraciones reales */}
            {(wordObj.exampleSentenceDe || (wordObj.exampleSentenceDeBlocks && wordObj.exampleSentenceDeBlocks.length > 0)) && (
              (() => {
                const oracionDe = wordObj.exampleSentenceDe || wordObj.exampleSentenceDeBlocks.join(" ");
                const deLength = oracionDe.length;
                // Invertimos las jerarquías: Alemán protagonista (grande), Español soporte (pequeño/tenue)
                const deTextClass = deLength > 60 
                  ? "text-[11px] md:text-xs leading-tight font-bold text-white" 
                  : deLength > 40 
                    ? "text-xs md:text-sm leading-snug font-bold text-white" 
                    : "text-sm md:text-base leading-snug font-bold text-white";
                
                const esTextClass = deLength > 60 
                  ? "text-[9px] md:text-[10px] leading-tight font-medium text-blue-200/70" 
                  : deLength > 40 
                    ? "text-[10px] md:text-xs leading-snug font-medium text-blue-200/70" 
                    : "text-xs md:text-sm leading-snug font-medium text-blue-200/70";
                
                return (
                  <div 
                    className="mt-1.5 w-full px-2.5 py-1.5 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition-all active:scale-95 flex flex-col gap-0.5 shadow-sm border border-white/5 relative z-50 min-h-0"
                    onClick={handleSpeakSentence}
                    onPointerDown={(e) => e.stopPropagation()}
                    title="Escuchar oración en alemán"
                  >
                    <p className={`drop-shadow-sm pointer-events-none ${deTextClass}`}>
                      "{oracionDe}"
                    </p>
                    
                    {wordObj.exampleSentenceEs && (
                      <p className={`italic pointer-events-none ${esTextClass}`}>
                        {wordObj.exampleSentenceEs}
                      </p>
                    )}
                  </div>
                );
              })()
            )}
          </div>

          <div className="absolute left-2 bottom-2 flex gap-1 z-50">
            <button onClick={(e) => { e.stopPropagation(); if (openAiTutor) openAiTutor(wordObj, e); }} className="text-blue-300 hover:text-white p-1 rounded-full transition-colors" title="Preguntar a IA" aria-label="Preguntar a tutor de Inteligencia Artificial">
               <Bot size={16} />
            </button>
          </div>

          <div className="absolute right-2 bottom-2 flex gap-1 z-50">
             <button onClick={handleSpeakWord} className="text-blue-300 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors" title="Escuchar" aria-label="Escuchar palabra en alemán">
               <Volume2 size={16} />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(PresentationVocabCard, (prevProps, nextProps) => {
  const prevDe = prevProps.wordObj?.de;
  const nextDe = nextProps.wordObj?.de;
  if (prevDe !== nextDe) return false;

  const safeId = prevDe ? getSafeId(prevDe).substring(0, 150) : '';

  if (prevProps.isRevealed !== nextProps.isRevealed) return false;
  if (prevProps.isImageLoading !== nextProps.isImageLoading) return false;

  const prevImage = prevProps.cardImages?.[safeId];
  const nextImage = nextProps.cardImages?.[safeId];
  if (prevImage !== nextImage) return false;

  return true;
});
