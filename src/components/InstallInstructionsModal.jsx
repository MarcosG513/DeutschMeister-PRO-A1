import React, { useState } from 'react';
import { X, Smartphone, Apple, Check, Share2, MoreVertical, PlusSquare, ArrowRight } from 'lucide-react';

export default function InstallInstructionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const isIOSDevice = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const [activeTab, setActiveTab] = useState(isIOSDevice ? 'ios' : 'android');

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decorativo de fondo */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Smartphone size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                📲 Instalar DeutschMeister
              </h2>
              <p className="text-xs text-slate-400">
                Experiencia nativa a pantalla completa y 0 ms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Selector de plataforma */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/60 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'android'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={16} />
            <span>Android / Chrome</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'ios'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Apple size={16} />
            <span>iPhone / Safari</span>
          </button>
        </div>

        {/* Contenido según pestaña */}
        {activeTab === 'android' ? (
          <div className="space-y-3.5 mb-6 text-sm">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-700/80 text-emerald-400 shrink-0 mt-0.5">
                <MoreVertical size={18} />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">Paso 1</p>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Toca el menú de tres puntos (<span className="text-emerald-400 font-bold">⋮</span>) arriba a la derecha en tu navegador (Chrome, Edge o Samsung).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-700/80 text-emerald-400 shrink-0 mt-0.5">
                <PlusSquare size={18} />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">Paso 2</p>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Selecciona <span className="text-emerald-400 font-bold">«Instalar aplicación»</span> o <span className="text-emerald-400 font-bold">«Agregar a la pantalla principal»</span>.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 mb-6 text-sm">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-700/80 text-emerald-400 shrink-0 mt-0.5">
                <Share2 size={18} />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">Paso 1</p>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Toca el botón <span className="text-emerald-400 font-bold">Compartir</span> (<span className="text-emerald-400 font-bold">⬆️</span>) en la barra inferior de Safari.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-700/80 text-emerald-400 shrink-0 mt-0.5">
                <PlusSquare size={18} />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">Paso 2</p>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Desliza hacia abajo en el menú de opciones y selecciona <span className="text-emerald-400 font-bold">«Agregar a inicio»</span> (➕).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botón de cierre */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <Check size={18} />
          <span>¡Entendido!</span>
        </button>
      </div>
    </div>
  );
}
