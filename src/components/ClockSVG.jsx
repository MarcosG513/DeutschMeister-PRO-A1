import React from 'react';

const ClockSVG = ({ time }) => {
  if (!time) return null;
  
  // Parsear la hora (HH:MM)
  const [hoursStr, minutesStr] = time.split(':');
  const hours = parseInt(hoursStr, 10) || 0;
  const minutes = parseInt(minutesStr, 10) || 0;

  // Calcular rotaciones de las manecillas
  const minuteDeg = minutes * 6; // 360 / 60 = 6 grados por minuto
  const hourDeg = ((hours % 12) * 30) + (minutes * 0.5); // 30 grados por hora + 0.5 grados por minuto de desfase

  // Generar las 12 marcas de las horas
  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30;
    const isMajor = i % 3 === 0;
    const length = isMajor ? 6 : 3;
    const y1 = 5 + length;
    return (
      <line
        key={i}
        x1="50"
        y1="5"
        x2="50"
        y2={y1}
        transform={`rotate(${angle} 50 50)`}
        stroke={isMajor ? "#334155" : "#94a3b8"}
        strokeWidth={isMajor ? "1.5" : "0.75"}
      />
    );
  });

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-sm select-none">
        {/* Esfera del Reloj */}
        <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2.5" />
        
        {/* Marcadores de Horas */}
        {markers}
        
        {/* Manecilla de la Hora */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          transform={`rotate(${hourDeg} 50 50)`}
          stroke="#1e293b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Manecilla de los Minutos */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          transform={`rotate(${minuteDeg} 50 50)`}
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Pin central */}
        <circle cx="50" cy="50" r="3" fill="#64748b" />
        <circle cx="50" cy="50" r="1" fill="#f8fafc" />
      </svg>
      {/* Insignia digital para soporte visual */}
      <span className="mt-2 text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
        {time}
      </span>
    </div>
  );
};

export default ClockSVG;
