import React, { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { Loader2, CheckCircle, Edit as Edit3, Volume2, Square } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import { functions } from '../App';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';

const consignasGoethe = [
  { de: "Ihre Freundin Anna hat Geburtstag. Schreiben Sie eine E-Mail: Gratulation? Wann besuchen? Geschenk? (Schreiben Sie ca. 30 Wörter)", es: "Tu amiga Anna cumple años. Escribe un correo: ¿Felicitación? ¿Cuándo la visitas? ¿Regalo? (Escribe aprox. 30 palabras)" },
  { de: "Sie machen am Wochenende einen Ausflug. Schreiben Sie eine E-Mail an Ihren Freund: Wohin? Wann treffen? Was mitbringen? (Schreiben Sie ca. 30 Wörter)", es: "Harás una excursión el fin de semana. Escribe un correo a tu amigo: ¿A dónde? ¿Cuándo encontrarse? ¿Qué llevar? (Escribe aprox. 30 palabras)" },
  { de: "Sie möchten am Samstag eine Party machen. Schreiben Sie eine E-Mail an Ihre Freunde: Einladung? Wann und wo? Essen und Getränke? (Schreiben Sie ca. 30 Wörter)", es: "Quieres hacer una fiesta el sábado. Escribe a tus amigos: ¿Invitación? ¿Cuándo y dónde? ¿Comida y bebida? (Escribe aprox. 30 palabras)" }
];

const EVALUATION_STEPS = [
  { icon: "📋", text: "Auditando el cumplimiento de los 3 Leitpunkte..." },
  { icon: "🎩", text: "Verificando registro y formalidad (du vs. Sie, Anrede y Gruß)..." },
  { icon: "📐", text: "Revisando gramática A1 (V2, sustantivos con mayúscula, casos)..." },
  { icon: "📊", text: "Comprobando extensión oficial Goethe (25-45 palabras)..." }
];

const extractModelEmail = (evalText) => {
  if (!evalText || typeof evalText !== "string") return null;
  const match = evalText.match(/###\s*[^\n]*(?:Correo Modelo|Muster-E-Mail)[^\n]*\n+([\s\S]*?)(?:\n###|$)/i);
  if (!match || !match[1]) return null;

  const rawContent = match[1].trim();
  const cleanedLines = rawContent
    .split("\n")
    .map(line => line.replace(/^\s*>\s?/, "").trim())
    .filter(line => line.length > 0 && !line.startsWith("[") && !line.startsWith("(") && !line.toLowerCase().includes("escribe aquí"));

  const modelText = cleanedLines.join("\n").trim();
  return modelText.length > 10 ? modelText : null;
};

const EmailSimulator = ({ initialText }) => {
  const [text, setText] = useState(initialText || "");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlayingModelAudio, setIsPlayingModelAudio] = useState(false);
  const [consigna, setConsigna] = useState(() => {
    const randomIndex = Math.floor(Math.random() * consignasGoethe.length);
    return consignasGoethe[randomIndex];
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  useEffect(() => {
    let stepInterval;
    let progressInterval;

    if (loading) {
      setCurrentStep(0);
      setProgress(0);

      stepInterval = setInterval(() => {
        setCurrentStep((prev) => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
      }, 2500);

      progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + 5 : prev));
      }, 400);
    }

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [loading]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const getWordCountStatus = (count) => {
    if (count === 0) {
      return {
        badgeClass: "bg-slate-100 text-slate-600 border-slate-300",
        label: "0 / 25-45 palabras",
        hint: "Meta oficial: 25-45 palabras (ideal ~30)"
      };
    }
    if (count < 25) {
      const missing = 25 - count;
      return {
        badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
        label: `${count} / 25-45 palabras (faltan ${missing})`,
        hint: "⚠️ Texto corto para Start Deutsch 1"
      };
    }
    if (count <= 45) {
      return {
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        label: `${count} palabras ✅ Rango Óptimo Goethe (25-45)`,
        hint: "🎯 Longitud ideal para el examen oficial"
      };
    }
    const extra = count - 45;
    return {
      badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
      label: `${count} palabras ⚠️ (+${extra} sobre máx. 45)`,
      hint: "⚠️ Demasiado largo para A1 (sé más conciso)"
    };
  };

  const cambiarTema = () => {
    stopCurrentAudio();
    setIsPlayingModelAudio(false);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * consignasGoethe.length);
    } while (consignasGoethe.length > 1 && consignasGoethe[nextIndex].de === consigna.de);
    
    setConsigna(consignasGoethe[nextIndex]);
    setEvaluation(null);
  };

  const handlePlayModelAudio = (modelText) => {
    if (isPlayingModelAudio) {
      stopCurrentAudio();
      setIsPlayingModelAudio(false);
      return;
    }
    setIsPlayingModelAudio(true);
    playGermanAudio(modelText, {
      type: "sentence",
      voice: "Charon",
      onEnd: () => setIsPlayingModelAudio(false),
      onError: () => setIsPlayingModelAudio(false)
    });
  };

  const evaluateEmail = async () => {
    if (!text.trim()) return;
    stopCurrentAudio();
    setIsPlayingModelAudio(false);
    setLoading(true);
    setEvaluation(null);
    try {
      if (!functions) throw new Error("Firebase functions not initialized");
      const evaluateEmailFn = httpsCallable(functions, 'evaluateEmail');
      const result = await evaluateEmailFn({
        textoCorreo: text,
        consignaExamen: consigna.de
      }).catch(err => {
        console.warn("Petición abortada/fallida al cambiar de vista:", err);
        throw err;
      });
      const outputText = result.data?.output || result.data;
      if (outputText) {
        setEvaluation(outputText);
      } else {
        throw new Error("No feedback received");
      }
    } catch (e) {
      console.error("Function Evaluation failed, falling back to local:", e);
      const words = text.trim().split(/\s+/);
      const currentCount = words.length;
      const hasSalutation = /hallo|liebe|lieber|sehr geehrte|guten/i.test(text);
      const hasClosing = /grüße|gruß|tschüss|bis bald/i.test(text);
      let feedback = "### 1. 📋 Evaluación de los 3 Leitpunkte (Puntos de Contenido)\n";
      if (hasSalutation && hasClosing) {
        feedback += "- **Punto 1:** Cumplido ✅ (Saludo y apertura comunicativa claros).\n";
        feedback += "- **Punto 2:** Parcialmente cumplido ⚠️ (Revisa responder detalladamente a los temas pedidos).\n";
        feedback += "- **Punto 3:** Cumplido ✅ (Cierre y despedida incluidos).\n";
      } else {
        feedback += "- **Punto 1:** Parcialmente cumplido ⚠️ (Falta saludo inicial adecuado al destinatario).\n";
        feedback += "- **Punto 2:** Parcialmente cumplido ⚠️ (Asegúrate de cubrir los 3 temas requeridos).\n";
        feedback += "- **Punto 3:** No cumplido ❌ (Falta fórmula de despedida).\n";
      }
      feedback += "\n### 2. 🎩 Registro y Formalidad (du vs. Sie)\n";
      if (hasSalutation && hasClosing) {
        feedback += "- ✅ Registro coherente con el destinatario del ejercicio.\n";
      } else {
        feedback += "- ❌ **Atención:** Falta un saludo adecuado (ej. *Liebe/Lieber...* o *Sehr geehrte/r...*) o una despedida.\n";
      }
      feedback += "- **Regla ortográfica:** En alemán las fórmulas de despedida (*Viele Grüße*) **NUNCA llevan coma** al final.\n";
      feedback += "\n### 3. 📐 Gramática y Vocabulario A1\n";
      feedback += "- **Posición del Verbo (V2):** Comprueba que el verbo conjugado esté en la segunda posición en oraciones enunciativas.\n";
      feedback += "- **Sustantivos con Mayúscula (Großschreibung):** Escribe siempre todos los sustantivos con mayúscula inicial.\n";
      feedback += "\n### 4. 📊 Conteo de Palabras y Extensión Oficial\n";
      if (currentCount >= 25 && currentCount <= 45) {
        feedback += `✅ Excelente extensión. Has escrito **${currentCount} palabras** (rango óptimo oficial Goethe: 25-45 palabras, meta: ca. 30 Wörter).\n`;
      } else if (currentCount < 25) {
        feedback += `⚠️ Tu texto es un poco corto (**${currentCount} palabras**). La meta recomendada es entre 25 y 45 palabras (faltan ${25 - currentCount} para el mínimo).\n`;
      } else {
        feedback += `⚠️ Tu texto es un poco extenso (**${currentCount} palabras**). En el nivel A1 se busca concisión (máximo recomendado: 45 palabras).\n`;
      }
      feedback += "\n### 🌟 Correo Modelo Ideal (Muster-E-Mail A1)\n";
      feedback += "> Hallo Anna,\n";
      feedback += "> herzlichen Glückwunsch zum Geburtstag! Ich besuche dich am Samstag um 15 Uhr. Ich bringe einen Kuchen mit.\n";
      feedback += "> Viele Grüße\n";
      feedback += "> Markus\n";
      setEvaluation(feedback);
    } finally {
      setLoading(false);
    }
  };

  const wordStatus = getWordCountStatus(wordCount);

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col mb-4 text-left">
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex flex-col gap-2">
        <div className="flex items-center justify-between font-bold text-slate-700 text-sm">
          <div className="flex items-center gap-2">
            <Edit3 size={16} className="text-blue-600" /> Simulador de Examen (Goethe A1 Schreiben Teil 2)
          </div>
          <button 
            onClick={cambiarTema}
            className="text-xs bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 px-2.5 py-1 rounded font-bold shadow-sm transition-all"
          >
            Cambiar tema
          </button>
        </div>
        <div className="text-sm bg-white p-3 rounded border border-slate-200 flex flex-col gap-1.5 text-left">
          <p className="font-bold text-slate-800 leading-relaxed">
            {consigna.de}
          </p>
          <p className="text-xs text-slate-500 italic font-medium leading-relaxed border-t border-slate-100 pt-1.5">
            {consigna.es}
          </p>
        </div>
      </div>
      <textarea 
        className="w-full p-4 h-40 focus:outline-none focus:bg-yellow-50/30 text-slate-700 font-medium resize-none transition-colors" 
        placeholder="Escribe tu correo aquí en alemán..." 
        value={text} 
        onChange={e => setText(e.target.value)}
      ></textarea>
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500">Wortanzahl (Longitud):</span>
          <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold transition-all border ${wordStatus.badgeClass}`}>
            {wordStatus.label}
          </span>
          <span className="text-[11px] text-slate-400 italic">
            {wordStatus.hint}
          </span>
        </div>

        <button 
          onClick={evaluateEmail} 
          disabled={loading || !text.trim()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center justify-center gap-2 transition-all disabled:opacity-50 shrink-0"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Examinando...</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              <span>Evaluar Correo</span>
            </>
          )}
        </button>
      </div>

      {/* 🚀 OVERLAY DE CARGA ANIMADA (Scanner Goethe) */}
      {loading && (
        <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-2xl border border-amber-500/40 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-300 mx-3 my-4">
          
          {/* Cabecera del Escáner */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Examinador Goethe A1 en Vivo
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">{progress}%</span>
          </div>

          {/* Mensaje Dinámico de Análisis */}
          <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <span className="text-xl animate-bounce">{EVALUATION_STEPS[currentStep].icon}</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              {EVALUATION_STEPS[currentStep].text}
            </span>
          </div>

          {/* Barra de Progreso Neón */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Micro-Tip Goethe durante la espera */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300/90 italic leading-snug">
            💡 <strong>Goethe Tip:</strong> ¿Sabías que en el saludo formal 'Sehr geehrte Frau...' siempre va coma al final y la siguiente línea empieza en minúscula?
          </div>
        </div>
      )}

      {evaluation && (
        <div className="p-4 bg-blue-50/70 border-t-2 border-blue-200 animate-in slide-in-from-top-2 space-y-4">
          {(() => {
            const modelEmail = extractModelEmail(evaluation);
            if (!modelEmail) return null;
            return (
              <div className="p-4 bg-white border-2 border-purple-200 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-purple-600 text-white rounded-lg shadow-sm shrink-0 mt-0.5">
                    <Volume2 size={20} className={isPlayingModelAudio ? "animate-pulse" : ""} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">🌟 Correo Modelo Ideal</span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Audio Nativo A1
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 italic line-clamp-2 leading-relaxed">
                      "{modelEmail.replace(/\n+/g, ' ')}"
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handlePlayModelAudio(modelEmail)}
                  className={`px-4 py-2.5 rounded-lg font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all shrink-0 ${
                    isPlayingModelAudio
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                  title={isPlayingModelAudio ? "Detener pronunciación" : "Escuchar Correo Modelo (Charon)"}
                >
                  {isPlayingModelAudio ? (
                    <>
                      <Square size={14} fill="currentColor" /> Detener Audio
                    </>
                  ) : (
                    <>
                      <Volume2 size={14} /> Escuchar Correo Modelo
                    </>
                  )}
                </button>
              </div>
            );
          })()}

          <MarkdownMessage text={evaluation} />
        </div>
      )}
    </div>
  );
};

export default EmailSimulator;
