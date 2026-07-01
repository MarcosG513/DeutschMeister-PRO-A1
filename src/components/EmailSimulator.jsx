import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { Loader2, CheckCircle, Edit as Edit3 } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import { functions } from '../App';

const EmailSimulator = ({
  instructions,
  initialText
}) => {
  const [text, setText] = useState(initialText || "");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const evaluateEmail = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setEvaluation(null);
    try {
      if (!functions) throw new Error("Firebase functions not initialized");
      const evaluateEmailFn = httpsCallable(functions, 'evaluateEmail');
      const result = await evaluateEmailFn({
        textoCorreo: text,
        consignaExamen: instructions
      });
      if (result.data && result.data.output) {
        setEvaluation(result.data.output);
      } else {
        throw new Error("No feedback received");
      }
    } catch (e) {
      console.error("Function Evaluation failed, falling back to local:", e);
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
        onChange={e => setText(e.target.value)}
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

export default EmailSimulator;
