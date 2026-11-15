import { useState, useEffect, useRef } from 'react';
import {
  X,
  Smartphone,
  Apple,
  Check,
  Share,
  MoreVertical,
  MoreHorizontal,
  PlusSquare,
  Compass
} from 'lucide-react';

function detectIOSDevice() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
  return (
    (/iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream
  );
}

export default function InstallInstructionsModal({ isOpen, onClose }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const activeTab = selectedTab ?? (detectIOSDevice() ? 'ios' : 'android');
  const dialogRef = useRef(null);
  const pointerDownOutsideRef = useRef(false);

  // Sincronización con API nativa <dialog>.showModal() / close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          // Ignorar si ya está abierto o fuera del DOM
        }
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Light-dismiss fallback obligatorio para Safari (donde <dialog closedby="any"> no tiene soporte aún)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || ('closedBy' in HTMLDialogElement.prototype)) return;

    const isOutsideDialog = (e) => {
      const rect = dialog.getBoundingClientRect();
      return (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
    };

    const handlePointerDown = (e) => {
      pointerDownOutsideRef.current = isOutsideDialog(e);
    };

    const handlePointerUp = (e) => {
      if (pointerDownOutsideRef.current && isOutsideDialog(e)) {
        dialog.close();
      }
      pointerDownOutsideRef.current = false;
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handleNativeClose = () => {
    setSelectedTab(null);
    onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="install-modal-title"
      onClose={handleNativeClose}
      className="m-auto w-[calc(100%-2rem)] max-w-md max-h-[90dvh] p-0 bg-transparent border-0 rounded-3xl overflow-y-auto shadow-2xl open:animate-in open:fade-in open:zoom-in-95 duration-200"
    >
      <div className="relative w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 text-white overflow-hidden">
        {/* Glow decorativo de fondo */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <Smartphone size={22} />
            </div>
            <div>
              <h2 id="install-modal-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                📲 Instalar DeutschMeister
              </h2>
              <p className="text-xs text-slate-400">
                Acceso directo, pantalla completa y audio offline
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar instrucciones de instalación"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Selector de plataforma */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/60 rounded-2xl border border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => setSelectedTab('android')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
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
            onClick={() => setSelectedTab('ios')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Apple size={16} />
            <span>iPhone / iPad</span>
          </button>
        </div>

        {/* Contenido según pestaña */}
        {activeTab === 'android' ? (
          <div className="space-y-3 mb-5 text-sm">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-700/80 text-emerald-400 shrink-0 mt-0.5">
                <MoreVertical size={18} />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">Paso 1</p>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Toca el menú de tres puntos (<span className="text-emerald-400 font-bold">⋮</span>) arriba a la derecha en Chrome, Edge o Samsung Internet.
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
                  Selecciona <span className="text-emerald-400 font-bold">«Instalar aplicación»</span> o <span className="text-emerald-400 font-bold">«Agregar a la pantalla principal»</span> y confirma.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-5 text-sm">
            {/* Bloque 1: Safari (Recomendado) */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/35 border border-emerald-500/35 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs">
                  <Compass size={16} className="shrink-0" />
                  <span>En Safari (Recomendado en iPhone)</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ideal iOS
                </span>
              </div>

              <ol className="space-y-2 text-xs text-slate-200 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 shrink-0 mt-0.5">
                    <Share size={14} />
                  </span>
                  <span>
                    <strong className="text-white">1.</strong> Toca el botón <strong className="text-emerald-400">Compartir</strong> (cuadrado con flecha hacia arriba <strong className="text-emerald-400">↑</strong>) en la barra inferior.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 shrink-0 mt-0.5">
                    <PlusSquare size={14} />
                  </span>
                  <span>
                    <strong className="text-white">2.</strong> Desliza hacia abajo y toca <strong className="text-emerald-400">«Agregar a inicio»</strong> (<strong className="text-emerald-400">+</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 shrink-0 mt-0.5">
                    <Check size={14} />
                  </span>
                  <span>
                    <strong className="text-white">3.</strong> Pulsa <strong className="text-emerald-400">«Agregar»</strong> arriba a la derecha y abre el icono <strong className="text-white">Deutsch A1</strong> desde tu pantalla.
                  </span>
                </li>
              </ol>
            </div>

            {/* Bloque 2: Google Chrome iOS */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
              <div className="flex items-center gap-2 text-sky-300 font-extrabold text-xs">
                <MoreHorizontal size={16} className="shrink-0" />
                <span>En Google Chrome (iPhone)</span>
              </div>

              <ol className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="p-1.5 rounded-lg bg-slate-700/80 text-sky-300 shrink-0 mt-0.5">
                    <Share size={14} />
                  </span>
                  <span>
                    <strong className="text-white">1.</strong> Toca el botón <strong className="text-sky-300">Compartir (↑)</strong> arriba a la derecha junto a la barra de direcciones (o el menú <strong className="text-sky-300">•••</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="p-1.5 rounded-lg bg-slate-700/80 text-sky-300 shrink-0 mt-0.5">
                    <PlusSquare size={14} />
                  </span>
                  <span>
                    <strong className="text-white">2.</strong> Selecciona <strong className="text-sky-300">«Agregar a inicio»</strong> (si no aparece, pulsa <em className="text-white">«Abrir en Safari»</em> y repite el paso).
                  </span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Botón de cierre */}
        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <Check size={18} />
          <span>¡Entendido!</span>
        </button>
      </div>
    </dialog>
  );
}
