import React from 'react';
import { Bot, Minimize, Maximize, X, Loader2, Send } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';

const TutorChat = ({ 
  isOpen, 
  isFullscreen, 
  setIsOpen, 
  setIsFullscreen, 
  chatMessages, 
  chatInput, 
  setChatInput, 
  sendChatMessage, 
  isChatLoading, 
  chatEndRef 
}) => {
  if (!isOpen) return null;

  return (
    <aside 
      className={`fixed ${isFullscreen ? 'inset-0 w-full z-[100]' : 'inset-y-0 right-0 w-full md:w-[450px] z-50 border-l'} bg-white shadow-2xl border-slate-200 flex flex-col animate-in slide-in-from-right duration-300`}
    >
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="text-yellow-400" />
          <h3 className="font-bold text-lg">Tutor Alemán</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-1.5" title={isFullscreen ? "Minimizar" : "Pantalla Completa"}>
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition bg-slate-800 hover:bg-slate-700 rounded-lg p-1.5" title="Cerrar Tutor">
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
  );
};

export default TutorChat;
