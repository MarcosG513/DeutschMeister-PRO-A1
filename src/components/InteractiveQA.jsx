import { Volume2 } from 'lucide-react';
import { playGermanAudio } from '../services/aiAudioService';

const cleanTtsCue = (text = '') => String(text || '').replace(/\s*\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();

const InteractiveQA = ({ question, answer, note }) => {
  return (
     <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4 text-slate-800">
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-2">
           <span className="font-bold text-blue-900 flex-1 pr-4">Q: {question}</span>
           <button
             type="button"
             aria-label="Escuchar pregunta en alemán"
             onClick={() => playGermanAudio(cleanTtsCue(question), { type: "dialogue", voice: "Charon" })}
             className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition shrink-0 cursor-pointer"
           >
             <Volume2 size={18}/>
           </button>
        </div>
        <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg mb-2">
           <span className="font-bold text-green-900 flex-1 pr-4">A: {answer}</span>
           <button
             type="button"
             aria-label="Escuchar respuesta en alemán"
             onClick={() => playGermanAudio(cleanTtsCue(answer), { type: "dialogue", voice: "Charon" })}
             className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition shrink-0 cursor-pointer"
           >
             <Volume2 size={18}/>
           </button>
        </div>
        {note && <p className="text-xs text-slate-500 italic mt-2">{note}</p>}
     </div>
  );
};

export default InteractiveQA;
