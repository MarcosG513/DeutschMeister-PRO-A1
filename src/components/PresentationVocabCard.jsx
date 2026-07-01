import React, { useState, useEffect } from 'react';
import { RefreshCw, ImagePlus, Loader2, Volume2, Bot, Mic, Sparkles } from 'lucide-react';
import { getSafeId, nativeSpeak } from '../utils/helpers';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const PresentationVocabCard = ({ wordObj, cardImages, regeneratedImages, generateCardImage, isImageLoading, openAiTutor, setFullscreenImage, unlockedCards, isRevealed }) => {
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
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-center group-hover:border-blue-300 overflow-hidden">
          {imgData ? (
            <div className="w-full h-[55%] bg-slate-50 border-b border-slate-100 relative group/regen">
               <img src={(typeof imgData === 'string' && (imgData.startsWith('http') || imgData.startsWith('data:'))) ? imgData : (typeof imgData === 'string' ? `data:image/png;base64,${imgData}` : '')} alt={wordObj.de} className="w-full h-full object-contain mix-blend-multiply p-1 cursor-zoom-in hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); if (typeof setFullscreenImage === 'function') setFullscreenImage(imgData); }} />
               {!isRegenerated && (
                 <button onClick={(e) => { e.stopPropagation(); generateCardImage(wordObj, e, true); }} className="absolute top-1 right-1 bg-white/90 hover:bg-white text-blue-600 p-1.5 rounded-md shadow transition-opacity" title="Regenerar (Consume 1 crédito)">
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
             {wordObj.pron && <span className="text-sm text-blue-500 mt-1 font-medium">/{wordObj.pron}/</span>}
             
             <div className="absolute left-2 bottom-2 flex gap-1 z-30">
                <button onClick={(e) => { e.stopPropagation(); if(openAiTutor) openAiTutor(wordObj, e); }} className="text-slate-400 hover:text-blue-500 p-1 rounded-full transition-colors" title="Preguntar a IA">
                  <Bot size={16} />
                </button>
             </div>

             <div className="absolute right-2 bottom-2 flex gap-1 z-30">
               <button onClick={handlePronunciation} className={`p-1 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:text-green-500 hover:bg-slate-100'}`} title="Practicar pronunciación">
                 <Mic size={16} />
               </button>
               <button onClick={(e) => { e.stopPropagation(); nativeSpeak(wordObj.de); }} className="text-slate-400 hover:text-blue-500 hover:bg-slate-100 p-1 rounded-full transition-colors" title="Escuchar">
                 <Volume2 size={16} />
               </button>
             </div>
          </div>
        </div>

        {/* ATRÁS */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#1e3a8a] border-2 border-[#1e3a8a] text-white rounded-xl shadow-md flex flex-col items-center p-4 text-center">
          
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <span className="text-xs font-semibold text-blue-300/80 mb-2 tracking-wider uppercase">{wordObj.type}</span>
            <span className={`font-bold text-yellow-400 leading-tight ${wordObj.es.length > 20 ? 'text-lg' : 'text-xl md:text-2xl'}`}>{wordObj.es}</span>
            {wordObj.pron && <span className="text-sm text-white/90 mt-2 italic font-medium">/{wordObj.pron}/</span>}
          </div>

          <div className="absolute left-2 bottom-2 flex gap-1 z-30">
            <button onClick={(e) => { e.stopPropagation(); if(openAiTutor) openAiTutor(wordObj, e); }} className="text-blue-300 hover:text-white p-1 rounded-full transition-colors" title="Preguntar a IA">
               <Bot size={16} />
            </button>
          </div>

          <div className="absolute right-2 bottom-2 flex gap-1 z-30">
             <button onClick={(e) => { e.stopPropagation(); nativeSpeak(wordObj.es, 'es-ES'); }} className="text-blue-300 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors" title="Escuchar">
               <Volume2 size={16} />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PresentationVocabCard;
