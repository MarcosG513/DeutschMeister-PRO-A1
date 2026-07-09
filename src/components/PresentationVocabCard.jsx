import React, { useState, useEffect } from 'react';
import { RefreshCw, ImagePlus, Loader2, Volume2, Bot, Mic, Sparkles } from 'lucide-react';
import { getSafeId, nativeSpeak } from '../utils/helpers';
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
  const { isListening, startListening } = useSpeechRecognition();
  const [speechFeedback, setSpeechFeedback] = useState(null); // 'success', 'error', null
  const isLongText = wordObj.de.length > 20;
  const safeId = getSafeId(wordObj.de).substring(0, 150);
  const isUnlocked = unlockedCards && unlockedCards[safeId]?.unlocked;
  const imgData = (cardImages && isUnlocked) ? cardImages[safeId] : null;
  const existsGlobally = cardImages && !!cardImages[safeId];
  const isGenLoading = isImageLoading === safeId;
  const isRegenerated = unlockedCards && unlockedCards[safeId]?.regenerated;

  useEffect(() => {
    setFlipped(!!isRevealed);
  }, [isRevealed]);

  useEffect(() => {
    if (isUnlocked && cardImages && cardImages[safeId] === undefined && lazyLoadImage) {
      lazyLoadImage(wordObj);
    }
  }, [isUnlocked, cardImages, safeId, wordObj, lazyLoadImage]);

  const handlePronunciation = (e) => {
    e.stopPropagation();
    setSpeechFeedback(null);
    startListening((transcript) => {
      // Clean up punctuation and case for comparison
      const cleanTarget = wordObj.de.toLowerCase().replace(/[^a-zäöüß0-9]/g, '');
      const cleanTranscript = transcript.toLowerCase().replace(/[^a-zäöüß0-9]/g, '');
      if (cleanTranscript.includes(cleanTarget) || cleanTarget.includes(cleanTranscript)) {
        setSpeechFeedback('success');
      } else {
        setSpeechFeedback('error');
      }
      setTimeout(() => setSpeechFeedback(null), 3000);
    });
  };

  return (
    <div onClick={() => setFlipped(!flipped)} className="relative h-56 perspective-1000 cursor-pointer w-full group">
      <div className={`w-full h-full transition-all duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRENTE */}
        <div className={`absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-center group-hover:border-blue-300 overflow-hidden ${flipped ? 'pointer-events-none' : 'pointer-events-auto'}`}>
          {wordObj.category === 'Uhrzeit' ? (
            <div className="w-full h-[55%] border-b border-slate-100 relative">
               <SVGClock deWord={wordObj.de} />
            </div>
          ) : imgData ? (
            <div className="w-full h-[55%] bg-slate-50 border-b border-slate-100 relative group/regen">
               <img src={(typeof imgData === 'string' && (imgData.startsWith('http') || imgData.startsWith('data:'))) ? imgData : (typeof imgData === 'string' ? `data:image/png;base64,${imgData}` : '')} alt={wordObj.de} className="w-full h-full object-contain mix-blend-multiply p-1 cursor-zoom-in hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); if (typeof setFullscreenImage === 'function') setFullscreenImage(imgData); }} />
               {!isRegenerated && (
                 <button onClick={(e) => { e.stopPropagation(); generateCardImage(wordObj, e, true); }} className="absolute top-1 right-1 bg-white/90 hover:bg-white text-blue-600 p-1.5 rounded-md shadow transition-opacity" title="Regenerar (Consume 1 crédito)" aria-label="Regenerar imagen de tarjeta">
                   <RefreshCw size={14} className={isGenLoading ? "animate-spin" : ""} />
                 </button>
               )}
            </div>
          ) : (
            <div className="w-full h-[55%] bg-slate-50 flex flex-col items-center justify-center relative border-b border-slate-100 group/imgbtn z-10">
               <span className="text-4xl opacity-20 absolute pointer-events-none">{wordObj.emoji || "📝"}</span>
               {generateCardImage && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); generateCardImage(wordObj, e); }} 
                   className="relative z-30 bg-white hover:bg-blue-50 text-blue-600 px-3 py-1.5 rounded shadow-sm border border-blue-200 transition-all flex items-center gap-1.5 text-xs font-bold"
                   title={existsGlobally ? "Revelar Imagen Existente" : "Generar Imagen Representativa"}
                 >
                   {isGenLoading ? <Loader2 size={14} className="animate-spin text-blue-500" /> : <Sparkles size={14} className="text-blue-500" />}
                   {isGenLoading ? '...' : (existsGlobally ? 'Revelar Imagen' : 'Generar Imagen')}
                 </button>
               )}
            </div>
          )}
          <div className="flex-1 flex flex-col items-center justify-center w-full px-2 relative z-20">
             <span className={`font-bold ${speechFeedback === 'success' ? 'text-green-500' : speechFeedback === 'error' ? 'text-red-500' : 'text-slate-900'} transition-colors ${isLongText ? 'text-base' : 'text-lg'}`}>{wordObj.de}</span>
             {wordObj.pron && <span className="text-sm text-blue-500 mt-1 font-medium truncate max-w-[200px] sm:max-w-xs text-ellipsis overflow-hidden">/{wordObj.pron}/</span>}
             
             <div className="absolute left-2 bottom-2 flex gap-1 z-30">
                <button onClick={(e) => { e.stopPropagation(); if(openAiTutor) openAiTutor(wordObj, e); }} className="text-slate-400 hover:text-blue-500 p-1 rounded-full transition-colors" title="Preguntar a IA" aria-label="Preguntar a tutor de Inteligencia Artificial">
                  <Bot size={16} />
                </button>
             </div>

             <div className="absolute right-2 bottom-2 flex gap-1 z-30">
               <button onClick={handlePronunciation} className={`p-1 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:text-green-500 hover:bg-slate-100'}`} title="Practicar pronunciación" aria-label="Practicar pronunciación por micrófono">
                 <Mic size={16} />
               </button>
               <button onClick={(e) => { e.stopPropagation(); nativeSpeak(wordObj.de); }} className="text-slate-400 hover:text-blue-500 hover:bg-slate-100 p-1 rounded-full transition-colors" title="Escuchar" aria-label="Escuchar palabra en alemán">
                 <Volume2 size={16} />
               </button>
             </div>
          </div>
        </div>

        {/* ATRÁS */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-[#1e3a8a] border-2 border-[#1e3a8a] text-white rounded-xl shadow-md flex flex-col items-center p-3 pb-8 text-center overflow-hidden ${flipped ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
            <span className="text-[10px] font-semibold text-blue-300/80 mb-1 tracking-wider uppercase">{wordObj.type}</span>
            <span className={`font-bold text-yellow-400 leading-tight break-words px-2 max-w-full block ${wordObj.es.length > 20 ? 'text-base' : 'text-lg md:text-xl'}`}>{wordObj.es}</span>
            {/* Renderizado de oraciones reales */}
            {(wordObj.exampleSentenceDe || (wordObj.exampleSentenceDeBlocks && wordObj.exampleSentenceDeBlocks.length > 0)) && (
              (() => {
                const oracionDe = wordObj.exampleSentenceDe || wordObj.exampleSentenceDeBlocks.join(" ");
                const deLength = oracionDe.length;
                // Ajuste dinámico de tamaño de letra según longitud de la oración
                const deTextClass = deLength > 60 ? "text-[11px] leading-tight" : deLength > 40 ? "text-xs leading-snug" : "text-sm leading-normal font-bold";
                const esTextClass = deLength > 40 ? "text-[10px] leading-tight" : "text-xs leading-snug";
                
                return (
                  <div 
                    className="mt-2 w-full px-3 py-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition-all active:scale-95 flex flex-col gap-1 shadow-sm border border-white/5 max-h-[105px] overflow-y-auto custom-scrollbar relative z-50"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      const oracionCompleta = wordObj.exampleSentenceDe || (wordObj.exampleSentenceDeBlocks && wordObj.exampleSentenceDeBlocks.length > 0 ? wordObj.exampleSentenceDeBlocks.join(" ") : "");
                      if (oracionCompleta) {
                        nativeSpeak(oracionCompleta, 'de-DE'); 
                      }
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    title="Escuchar oración en alemán"
                  >
                    <p className={`text-white font-bold drop-shadow-sm pointer-events-none ${deTextClass}`}>
                      "{oracionDe}"
                    </p>
                    
                    {wordObj.exampleSentenceEs && (
                      <p className={`text-blue-200 italic font-medium pointer-events-none ${esTextClass}`}>
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
             <button onClick={(e) => { e.stopPropagation(); nativeSpeak(wordObj.de || wordObj, 'de-DE'); }} className="text-blue-300 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors" title="Escuchar" aria-label="Escuchar palabra en alemán">
               <Volume2 size={16} />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(PresentationVocabCard);
