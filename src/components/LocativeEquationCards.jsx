import React from 'react';

const LocativeEquationCards = () => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto my-4 font-sans">
      {/* Tarjeta 1: Wo? (Dativo) */}
      <div className="flex flex-col gap-1.5 p-4 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-950 dark:text-indigo-200 text-base">
            🔍 ¿Wo? <span className="text-xs font-normal opacity-80">(Ubicación / Reposo / Lugar Fijo)</span>
          </span>
          <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
            DATIVO
          </span>
        </div>
        <p className="text-xs text-indigo-900/80 dark:text-indigo-300/80 italic mt-0.5">
          El objeto no cambia de espacio, está quieto o en reposo.
        </p>
      </div>

      {/* Tarjeta 2: Wohin? (Acusativo) */}
      <div className="flex flex-col gap-1.5 p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-bold text-emerald-950 dark:text-emerald-200 text-base">
            🎯 ¿Wohin? <span className="text-xs font-normal opacity-80">(Dirección / Movimiento)</span>
          </span>
          <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
            ACUSATIVO
          </span>
        </div>
        <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 italic mt-0.5">
          Existe un vector de movimiento que cruza un límite espacial (A ➔ B).
        </p>
      </div>
    </div>
  );
};

export default LocativeEquationCards;
