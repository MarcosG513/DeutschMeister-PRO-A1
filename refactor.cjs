const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// The exact string blocks to remove
const block1 = `const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
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

const compressImageBase64 = (base64Str, maxWidth = 512, quality = 0.6) => {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith('data:')) return resolve(base64Str);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
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
};`;

const block2 = `const MarkdownMessage = ({ text }) => {
  if (!text || typeof text !== 'string') return null;
  let cleanText = text.replace(/(?:🇩🇪✨\\s*model|✨\\s*model|DE|model)\\s*$/gi, '').trim();

  const renderInlineStyles = (content, keyPrefix) => {
    const linkParts = content.split(/(\\[.*?\\]\\(.*?\\))/g);
    return linkParts.map((linkPart, lIndex) => {
      if (linkPart.startsWith('[') && linkPart.includes('](') && linkPart.endsWith(')')) {
        const textMatch = linkPart.match(/\\[(.*?)\\]/);
        const urlMatch = linkPart.match(/\\((.*?)\\)/);
        if (textMatch && urlMatch) {
          return <a key={\`\${keyPrefix}-l-\${lIndex}\`} href={urlMatch[1]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline font-bold bg-emerald-50 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1">{textMatch[1]}</a>;
        }
      }

      const parts = linkPart.split(/(\\*\\*.*?\\*\\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={\`\${keyPrefix}-l-\${lIndex}-b-\${index}\`}>{part.slice(2, -2)}</strong>;
        }
        const subParts = part.split(/(\\*.*?\\*)/g);
        return subParts.map((subPart, subIndex) => {
          if (subPart.startsWith('*') && subPart.endsWith('*')) {
            return <em key={\`\${keyPrefix}-l-\${lIndex}-b-\${index}-i-\${subIndex}\`}>{subPart.slice(1, -1)}</em>;
          }
          return <span key={\`\${keyPrefix}-l-\${lIndex}-b-\${index}-t-\${subIndex}\`}>{subPart}</span>;
        });
      });
    });
  };

  const lines = cleanText.split('\\n');
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
        <div key={\`row-\${index}\`} className={\`flex border-b border-slate-200 \${isHeader ? 'font-bold bg-slate-200/80 text-slate-800 rounded-t-lg' : 'bg-white'}\`}>
          {cells.map((cell, cIndex) => (
            <div key={\`cell-\${index}-\${cIndex}\`} className={\`flex-1 p-2 border-r border-slate-200 last:border-r-0 text-sm \${isHeader ? 'text-center' : ''}\`}>
              {renderInlineStyles(cell.trim(), \`cell-\${index}-\${cIndex}\`)}
            </div>
          ))}
        </div>
      );
      return;
    } else if (currentTable) {
      elements.push(<div key={\`table-\${index}\`} className="my-4 border border-slate-200 rounded-lg overflow-hidden shadow-sm">{currentTable}</div>);
      currentTable = null;
    }

    if (trimmed.startsWith('### ')) { elements.push(<h3 key={\`h3-\${index}\`} className="text-lg font-bold mt-5 mb-2 text-blue-900 border-b border-blue-100 pb-1">{renderInlineStyles(trimmed.replace('### ', ''), \`h3-\${index}\`)}</h3>); return; }
    if (trimmed.startsWith('## ')) { elements.push(<h2 key={\`h2-\${index}\`} className="text-xl font-bold mt-6 mb-3 text-blue-900 border-b border-blue-200 pb-1">{renderInlineStyles(trimmed.replace('## ', ''), \`h2-\${index}\`)}</h2>); return; }
    if (trimmed.startsWith('# ')) { elements.push(<h1 key={\`h1-\${index}\`} className="text-2xl font-black mt-6 mb-3 text-blue-950">{renderInlineStyles(trimmed.replace('# ', ''), \`h1-\${index}\`)}</h1>); return; }
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\\d+\\.\\s/.test(trimmed)) {
      elements.push(<li key={\`li-\${index}\`} className="ml-5 mt-1 list-inside marker:text-blue-500">{renderInlineStyles(trimmed.replace(/^(\\* |- |\\d+\\.\\s)/, ''), \`li-\${index}\`)}</li>); return;
    }
    if (trimmed.startsWith('> ')) {
      elements.push(<blockquote key={\`quote-\${index}\`} className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-blue-50/80 rounded-r-lg text-slate-700 italic shadow-sm">{renderInlineStyles(trimmed.substring(2), \`quote-\${index}\`)}</blockquote>); return;
    }
    if (trimmed === '---' || trimmed === '***') { elements.push(<hr key={\`hr-\${index}\`} className="my-4 border-slate-200" />); return; }
    if (trimmed === '') { elements.push(<div key={\`space-\${index}\`} className="h-2"></div>); } 
    else { elements.push(<p key={\`p-\${index}\`} className="mb-2">{renderInlineStyles(trimmed, \`p-\${index}\`)}</p>); }
  });

  if (currentTable) { elements.push(<div key={\`table-end\`} className="my-4 border border-slate-200 rounded-lg overflow-hidden shadow-sm">{currentTable}</div>); }

  return <div className="text-[15px] leading-relaxed text-slate-700">{elements}</div>;
};

const PresentationVocabCard = ({ wordObj, cardImages, regeneratedImages, generateCardImage, isImageLoading, openAiTutor, setFullscreenImage, unlockedCards }) => {
  const [flipped, setFlipped] = useState(false);
  const isLongText = wordObj.de.length > 20;
  const safeId = getSafeId(wordObj.de).substring(0, 150);
  const isUnlocked = unlockedCards && unlockedCards[safeId]?.unlocked;
  const imgData = (cardImages && isUnlocked) ? cardImages[safeId] : null;
  const existsGlobally = cardImages && !!cardImages[safeId];
  const isGenLoading = isImageLoading === safeId;
  const isRegenerated = unlockedCards && unlockedCards[safeId]?.regenerated;

  return (
    <div onClick={() => setFlipped(!flipped)} className="relative h-32 perspective-1000 cursor-pointer w-full group">
      <div className={\`w-full h-full transition-all duration-500 preserve-3d \${flipped ? 'rotate-y-180' : ''}\`}>
        
        {/* FRENTE */}
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-center group-hover:border-blue-300 overflow-hidden">
          {imgData ? (
            <div className="w-full h-16 bg-slate-100 border-b border-slate-100 relative group/regen">
               <img src={(typeof imgData === 'string' && (imgData.startsWith('http') || imgData.startsWith('data:'))) ? imgData : (typeof imgData === 'string' ? \`data:image/png;base64,\${imgData}\` : '')} alt={wordObj.de} className="w-full h-full object-contain mix-blend-multiply p-1 cursor-zoom-in hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); if (typeof setFullscreenImage === 'function') setFullscreenImage(imgData); }} />
               {!isRegenerated && (
                 <button onClick={(e) => { e.stopPropagation(); generateCardImage(wordObj, e, true); }} className="absolute top-1 right-1 bg-white/90 hover:bg-white text-blue-600 p-1 rounded-md shadow opacity-0 group-hover/regen:opacity-100 transition-opacity" title="Regenerar (Consume 1 crédito)">
                   <RefreshCw size={12} className={isGenLoading ? "animate-spin" : ""} />
                 </button>
               )}
            </div>
          ) : (
            <div className="w-full h-12 bg-slate-50 flex flex-col items-center justify-center relative border-b border-slate-100 group/imgbtn z-10">
               <span className="text-xl opacity-20 absolute pointer-events-none">{wordObj.emoji || "📝"}</span>
               {generateCardImage && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); generateCardImage(wordObj, e); }} 
                   className="relative z-30 bg-white hover:bg-blue-50 text-blue-600 px-2 py-1 rounded shadow-sm border border-blue-200 transition-all flex items-center gap-1 text-[10px] font-bold opacity-0 group-hover/imgbtn:opacity-100"
                   title={existsGlobally ? "Revelar Imagen Existente" : "Generar Imagen Representativa"}
                 >
                   {isGenLoading ? <Loader2 size={12} className="animate-spin text-blue-500" /> : <ImagePlus size={12} className="text-blue-500" />}
                   {isGenLoading ? '...' : (existsGlobally ? 'Revelar' : 'Generar')}
                 </button>
               )}
            </div>
          )}
          <div className="flex-1 flex items-center justify-center w-full px-2 relative z-20">
             <span className={\`font-bold text-slate-800 \${isLongText ? 'text-xs' : 'text-sm'}\`}>{wordObj.de}</span>
             <button onClick={(e) => { e.stopPropagation(); nativeSpeak(wordObj.de); }} className="absolute right-1 bottom-1 text-slate-300 hover:text-blue-500 p-1">
               <Volume2 size={14} />
             </button>
          </div>
        </div>

        {/* ATRÁS */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-800 border-2 border-slate-800 text-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 text-center">
          <span className={\`font-bold text-yellow-300 leading-tight \${wordObj.es.length > 20 ? 'text-xs' : 'text-sm'}\`}>{wordObj.es}</span>
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
        <span className={\`text-xl transition-transform \${isOpen ? 'rotate-45 text-red-500' : 'text-blue-500'}\`}>+</span>
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
        await nativeSpeak(textDe);
        setPlaying(false);
    } catch(e) {
        console.error("TTS failed:", e);
        setPlaying(false);
    }
  };

  return (
    <div className="bg-slate-800 text-white p-5 rounded-xl flex flex-col gap-3 mb-4 shadow-lg border border-slate-700 relative overflow-hidden">
      <div className="flex items-center gap-4 z-10">
        <button onClick={toggle} className={\`w-12 h-12 rounded-full flex items-center justify-center text-slate-900 transition-all shadow-md \${playing ? 'bg-yellow-300 scale-95' : 'bg-yellow-500 hover:bg-yellow-400 hover:scale-105'}\`}>
          {playing ? <Loader2 className="animate-spin" size={24} /> : <PlayCircle size={28} />}
        </button>
        <div className="flex-1">
          <p className="font-bold text-sm text-slate-300 mb-2">{title}</p>
          <div className="h-2 bg-slate-700 rounded-full w-full overflow-hidden">
             <div className={\`h-full bg-yellow-400 transition-all ease-linear \${playing ? 'w-full duration-[3000ms]' : 'w-0 duration-200'}\`}></div>
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
};`;

const block3 = `const InteractiveQA = ({ question, answer, note }) => {
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
};`;

const block4 = `{/* --- PANEL LATERAL: TUTOR IA --- */}
    {isTutorOpen && (
      <aside className={\`fixed \${isTutorFullscreen ? 'inset-0 w-full z-[100]' : 'inset-y-0 right-0 w-full md:w-[450px] z-50 border-l'} bg-white shadow-2xl border-slate-200 flex flex-col animate-in slide-in-from-right duration-300\`}>
        
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
            <div key={i} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
              <div className={\`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm \${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}\`}>
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
    )}`;

content = content.replace(block1, '');
content = content.replace(block2, '');
content = content.replace(block3, '');
content = content.replace(block4, `{/* --- PANEL LATERAL: TUTOR IA --- */}
    <TutorChat 
        isOpen={isTutorOpen} 
        isFullscreen={isTutorFullscreen}
        setIsOpen={setIsTutorOpen}
        setIsFullscreen={setIsTutorFullscreen}
        chatMessages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        sendChatMessage={sendChatMessage}
        isChatLoading={isChatLoading}
        chatEndRef={chatEndRef}
    />`);

const imports = `import { fetchWithRetry, base64ToArrayBuffer, pcmToWav, getSafeId, compressImageBase64, nativeSpeak } from './utils/helpers';
import MarkdownMessage from './components/MarkdownMessage';
import PresentationVocabCard from './components/PresentationVocabCard';
import GrammarAccordion from './components/GrammarAccordion';
import AudioSim from './components/AudioSim';
import InteractiveQA from './components/InteractiveQA';
import TutorChat from './components/TutorChat';\n`;

content = content.replace("import BannerAd from './components/BannerAd';", "import BannerAd from './components/BannerAd';\n" + imports);

fs.writeFileSync('src/App.jsx', content);
console.log("Refactoring complete");
