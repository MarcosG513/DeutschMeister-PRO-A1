import React, { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { Loader2, CheckCircle, Edit as Edit3 } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import { functions } from '../App';

const consignasGoethe = [
  { de: "Ihre Freundin Anna hat Geburtstag. Schreiben Sie eine E-Mail: Gratulation? Wann besuchen? Geschenk? (Schreiben Sie ca. 30 Wörter)", es: "Tu amiga Anna cumple años. Escribe un correo: ¿Felicitación? ¿Cuándo la visitas? ¿Regalo? (Escribe aprox. 30 palabras)" },
  { de: "Sie machen am Wochenende einen Ausflug. Schreiben Sie eine E-Mail an Ihren Freund: Wohin? Wann treffen? Was mitbringen? (Schreiben Sie ca. 30 Wörter)", es: "Harás una excursión el fin de semana. Escribe un correo a tu amigo: ¿A dónde? ¿Cuándo encontrarse? ¿Qué llevar? (Escribe aprox. 30 palabras)" },
  { de: "Sie möchten am Samstag eine Party machen. Schreiben Sie eine E-Mail an Ihre Freunde: Einladung? Wann und wo? Essen und Getränke? (Schreiben Sie ca. 30 Wörter)", es: "Quieres hacer una fiesta el sábado. Escribe a tus amigos: ¿Invitación? ¿Cuándo y dónde? ¿Comida y bebida? (Escribe aprox. 30 palabras)" }
];

const EVALUATION_STEPS = [
  { icon: "🔍", text: "Analizando fórmula de saludo y despedida..." },
  { icon: "📐", text: "Auditando la regla del verbo en Posición 2 (V2)..." },
  { icon: "📊", text: "Verificando longitud de texto (~30 palabras)..." },
  { icon: "🎯", text: "Calculando puntaje final oficial Goethe A1..." }
];

const EmailSimulator = ({ initialText }) => {
  const [text, setText] = useState(initialText || "");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [consigna, setConsigna] = useState(() => {
    const randomIndex = Math.floor(Math.random() * consignasGoethe.length);
    return consignasGoethe[randomIndex];
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepInterval;
    let progressInterval;

    if (loading) {
      setCurrentStep(0);
      setProgress(0);

      stepInterval = setInterval(() => {
        setCurrentStep((prev) => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
      }, 1200);

      progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + 5 : prev));
      }, 150);
    }

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [loading]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const cambiarTema = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * consignasGoethe.length);
    } while (consignasGoethe.length > 1 && consignasGoethe[nextIndex].de === consigna.de);
    
    setConsigna(consignasGoethe[nextIndex]);
    setEvaluation(null);
  };

  const evaluateEmail = async () => {
    if (!text.trim()) return;
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
      let feedback = "### 📊 Evaluación de tu correo (Offline)\n\n";
      feedback += "**1. Estructura (Saludo y Despedida):**\n";
      if (hasSalutation && hasClosing) {
        feedback += "✅ ¡Excelente! Tienes un saludo y una despedida reconocibles.\n";
      } else {
        feedback += "❌ **Atención:** Te falta un saludo adecuado (ej. *Liebe/Lieber...*) o una despedida (ej. *Viele Grüße*).\n";
      }
      feedback += "\n**2. Longitud del texto:**\n";
      if (currentCount >= 25 && currentCount <= 40) {
        feedback += `✅ Excelente extensión. Has escrito ${currentCount} palabras (la meta oficial es ca. 30 Wörter).\n`;
      } else if (currentCount < 25) {
        feedback += `⚠️ Tu texto es un poco corto (${currentCount} palabras). Intenta desarrollar más los puntos para alcanzar las ~30 palabras recomendadas.\n`;
      } else {
        feedback += `⚠️ Tu texto es un poco extenso (${currentCount} palabras). En el nivel A1 se busca concisión (ca. 30 Wörter).\n`;
      }
      feedback += "\n**3. Consejos clave:**\n";
      feedback += "* Revisa siempre que los verbos conjugados estén en la **posición 2**.\n";
      feedback += "* Escribe todos los sustantivos con **Mayúscula** inicial.\n";
      feedback += "* Recuerda que en alemán las despedidas (*Viele Grüße*) **NO llevan coma** al final.\n";
      setEvaluation(feedback);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500">Wortanzahl (Longitud):</span>
          <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold transition-all ${
            wordCount >= 25 && wordCount <= 40 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            wordCount >= 15 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
            'bg-rose-100 text-rose-800 border border-rose-300'
          }`}>
            {wordCount} / ~30 Wörter
          </span>
        </div>

        <button 
          onClick={evaluateEmail} 
          disabled={loading || !text.trim()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
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
        <div className="p-4 bg-blue-50 border-t-2 border-blue-200 animate-in slide-in-from-top-2">
          <MarkdownMessage text={evaluation} />
        </div>
      )}
    </div>
  );
};

export default EmailSimulator;
