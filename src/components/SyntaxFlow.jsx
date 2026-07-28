import React from 'react';

const SyntaxFlow = ({ steps = [] }) => {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-md mx-auto my-4 font-sans">
      {steps.map((step, idx) => (
        <div 
          key={idx} 
          className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-3 rounded-xl shadow-sm transition-all duration-200 hover:border-amber-400/50"
        >
          {/* Indicador de Posición / Orden Sintáctico */}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-extrabold text-sm border border-amber-500/20 shrink-0">
            {step.badge || idx + 1}
          </div>
          
          {/* Contenido del Bloque Gramatical */}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {step.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
              {step.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SyntaxFlow;
