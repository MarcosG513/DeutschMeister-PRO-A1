import React, { useState, useEffect } from 'react';
import { Bot, Minimize, Maximize, X, Loader2, Send, Mic, Volume2, Square } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';

const TutorChat = ({ 
  isOpen, 
  onClose,
  setIsOpen, 
  isFullscreen: controlledFullscreen, 
  setIsFullscreen: setControlledFullscreen, 
  chatMessages = [], 
  chatInput = "", 
  setChatInput, 
  sendChatMessage, 
  isChatLoading = false, 
  chatEndRef,
  user
}) => {
  const [internalFullscreen, setInternalFullscreen] = useState(false);
  const isFullscreen = controlledFullscreen !== undefined ? controlledFullscreen : internalFullscreen;
  const setIsFullscreen = setControlledFullscreen || setInternalFullscreen;

  const [playingMsgIndex, setPlayingMsgIndex] = useState(null);
  const { isListening, startListening, stopListening } = useSpeechRecognition('de-DE');

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    if (onClose) {
      onClose();
    } else if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        if (text && setChatInput) {
          setChatInput(prev => prev ? `${prev} ${text}` : text);
        }
      });
    }
  };

  const handlePlayAudio = (text, idx) => {
    if (playingMsgIndex === idx) {
      stopCurrentAudio();
      setPlayingMsgIndex(null);
      return;
    }
    setPlayingMsgIndex(idx);

    // Extraer oraciones en alemán en negrita o reproducir el texto pedagógico limpio
    playGermanAudio(text, {
      type: 'sentence',
      voice: 'Charon',
      onEnd: () => setPlayingMsgIndex(null),
      onError: () => setPlayingMsgIndex(null)
    });
  };

  return (
    <aside 
      className={`fixed ${isFullscreen ? 'inset-0 w-full z-[100]' : 'top-0 right-0 bottom-0 w-full md:w-[450px] z-[100] border-l'} bg-white shadow-2xl border-slate-200 flex flex-col h-[100dvh] overflow-hidden animate-in slide-in-from-right duration-300`}
    >
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="text-yellow-400" />
          <h3 className="font-bold text-lg">Tutor Alemán</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)} 
            className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-1.5" 
            title={isFullscreen ? "Minimizar" : "Pantalla Completa"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          <button 
            onClick={handleClose} 
            className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-1.5" 
            title="Cerrar Tutor"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4 custom-scrollbar">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
              {msg.role === 'user' ? (
                msg.parts[0].text
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Bot size={13} className="text-yellow-500" /> Tutor IA
                    </span>
                    <button
                      onClick={() => handlePlayAudio(msg.parts[0].text, i)}
                      className={`p-1.5 rounded-lg transition-all shrink-0 ${
                        playingMsgIndex === i
                          ? 'text-indigo-700 bg-indigo-100 ring-2 ring-indigo-300 animate-pulse'
                          : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
                      }`}
                      title={playingMsgIndex === i ? "Detener pronunciación" : "Escuchar en alemán (Charon)"}
                    >
                      {playingMsgIndex === i ? <Square fill="currentColor" size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                  <MarkdownMessage text={msg.parts[0].text} />
                </div>
              )}
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
        <div className="relative flex items-center">
          <input 
            type="text" 
            className="w-full bg-slate-100 border border-slate-200 rounded-full py-3.5 pl-5 pr-24 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition shadow-inner"
            placeholder={isListening ? "Escuchando tu voz..." : "Pregúntame algo en alemán o español..."}
            value={chatInput}
            onChange={(e) => setChatInput && setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendChatMessage && sendChatMessage()}
          />
          <div className="absolute right-2 top-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleMicClick}
              className={`p-2 rounded-full transition shadow ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
              title={isListening ? "Escuchando... Haz clic para detener" : "Dictar con micrófono"}
            >
              <Mic size={18} />
            </button>
            <button 
              onClick={sendChatMessage}
              disabled={!chatInput?.trim() || isChatLoading}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-400 transition shadow"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TutorChat;
