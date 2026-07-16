import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Send, X, Volume2, Sparkles } from 'lucide-react';
import { showRewardVideo } from '../services/AdService';
import { nativeSpeak } from '../utils/helpers';

const RoleplaySimulator = ({
  onExit
}) => {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [tutorMessageCount, setTutorMessageCount] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBlurting, setIsBlurting] = useState(false);
  const [blurtInput, setBlurtInput] = useState("");
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
  const handleSelectScenario = scen => {
    setScenario(scen);
    setIsBlurting(true);
    setBlurtInput("");
  };

  const submitBlurting = () => {
    if (blurtInput.trim().length < 3) return;
    setIsBlurting(false);
    startScenario(scenario);
  };

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
          {scenarios.map(scen => <button key={scen.id} onClick={() => handleSelectScenario(scen)} className="flex flex-col items-center p-6 bg-slate-50 border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl transition-all text-center group cursor-pointer shadow-sm">
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{scen.icon}</span>
              <h3 className="font-bold text-slate-800 text-lg">{scen.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{scen.desc}</p>
            </button>)}
        </div>
      </div>;
  }

  // ── PANTALLA INTERMEDIA DE BLURTING (Calentamiento Cognitivo) ──────────────
  if (scenario && isBlurting) {
    return (
      <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-xl mx-auto mt-10 animate-in fade-in zoom-in duration-300 text-center">
        <button
          onClick={() => { setScenario(null); setIsBlurting(false); }}
          className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition font-bold shadow-sm">
          <X size={18} /> Salir
        </button>
        <div className="inline-flex bg-amber-100 text-amber-600 p-4 rounded-full mb-5 shadow-sm">
          <span className="text-4xl">🧠</span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Calentamiento Cognitivo</h2>
        <p className="text-slate-500 mb-6 leading-relaxed">
          Antes de entrar al escenario{" "}
          <span className="font-bold text-purple-600">{scenario.title}</span>,
          escribe rápido{" "}
          <span className="font-bold">3 palabras en alemán</span>{" "}
          que recuerdes sobre este tema.
        </p>
        <div className="relative mb-5">
          <input
            type="text"
            autoFocus
            className="w-full bg-slate-100 border-2 border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-3.5 px-5 text-sm text-slate-800 outline-none transition shadow-inner placeholder:text-slate-400"
            placeholder={`Ej: ${scenario.id === 'restaurant' ? 'Essen, Trinken, Kellner' : scenario.id === 'hotel' ? 'Zimmer, Schlüssel, Nacht' : scenario.id === 'doctor' ? 'Kopf, Schmerzen, Fieber' : scenario.id === 'station' ? 'Zug, Ticket, Gleis' : scenario.id === 'shopping' ? 'Jacke, Größe, kaufen' : 'Hallo, Name, kommen'}...`}
            value={blurtInput}
            onChange={e => setBlurtInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submitBlurting()}
          />
        </div>
        <button
          onClick={submitBlurting}
          disabled={blurtInput.trim().length < 3}
          className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition shadow-md text-base">
          Comenzar Rol ✨
        </button>
        <p className="text-xs text-slate-400 mt-4">Pulsa Enter o haz clic para continuar</p>
      </div>
    );
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

export default RoleplaySimulator;
