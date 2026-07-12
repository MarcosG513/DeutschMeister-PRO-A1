import React, { useState } from 'react';
import { Presentation, Link2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const PresentationViewer = ({
  presentation,
  onClose,
  cardImages,
  generateCardImage,
  isImageLoading,
  openAiTutor,
  setFullscreenImage,
  unlockedCards,
  speakText,
  lazyLoadImage
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < presentation.slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const isBlueprint = presentation.theme === 'blueprint';
  const isMedical = presentation.theme === 'medical';
  const isNotebook = presentation.theme === 'notebook';

  let containerClass = "flex-1 flex flex-col overflow-hidden ";
  let headerClass = "flex justify-between items-center p-4 border-b shrink-0 ";
  let bodyClass = "flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-start ";

  if (isBlueprint) {
    containerClass += "bg-blue-950 text-blue-50 font-sans";
    bodyClass += " bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:3rem_3rem]";
    headerClass += "bg-blue-950 border-blue-800";
  } else if (isMedical) {
    containerClass += "bg-slate-50 text-slate-800 font-sans";
    bodyClass += " bg-white/50";
    headerClass += "bg-white border-emerald-100 shadow-sm";
  } else if (isNotebook) {
    containerClass += "bg-[#fdfbf7] text-slate-800 font-serif";
    bodyClass += " bg-[linear-gradient(transparent_95%,#e5e7eb_5%)] bg-[size:100%_2rem]";
    headerClass += "bg-[#fdfbf7] border-amber-900/10 shadow-sm";
  }

  const slideProps = {
    cardImages,
    generateCardImage,
    isImageLoading,
    openAiTutor,
    setFullscreenImage,
    unlockedCards,
    speakText,
    lazyLoadImage
  };

  return (
    <div className="flex flex-col min-h-[100svh] w-full bg-white animate-in fade-in zoom-in-95 duration-200">
      <div className={containerClass}>
        <div className={headerClass}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isBlueprint ? 'bg-blue-900 text-blue-300' : isMedical ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
              <Presentation size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">{presentation.title}</h2>
              <p className={`text-xs ${isBlueprint ? 'text-blue-400' : isMedical ? 'text-emerald-600' : 'text-amber-600'}`}>{currentSlide + 1} / {presentation.slides.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {presentation.presentationUrl && (
              <a href={presentation.presentationUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${isBlueprint ? 'border-blue-700 text-blue-300 hover:bg-blue-800' : isMedical ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'border-amber-900/20 text-amber-700 hover:bg-amber-100'}`}>
                <Link2 size={16} /> Diapositivas
              </a>
            )}
            <button onClick={onClose} className={`p-2 rounded-full transition ${isBlueprint ? 'hover:bg-blue-900 text-blue-300' : 'hover:bg-slate-200 text-slate-500'}`}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className={bodyClass}>
          <div className="max-w-6xl mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300" key={currentSlide}>
            <div className="mb-6 md:mb-10 text-center">
              <h1 className={`text-3xl md:text-5xl font-black mb-3 ${isBlueprint ? 'text-white' : isMedical ? 'text-emerald-950' : 'text-amber-950'}`}>
                {presentation.slides[currentSlide].title}
              </h1>
              {presentation.slides[currentSlide].subtitle && (
                <h2 className={`text-lg md:text-xl font-medium ${isBlueprint ? 'text-blue-300' : isMedical ? 'text-emerald-700' : 'text-amber-700/80'}`}>
                  {presentation.slides[currentSlide].subtitle}
                </h2>
              )}
            </div>
            <div className="w-full">
              {typeof presentation.slides[currentSlide].content === 'function'
                ? presentation.slides[currentSlide].content(slideProps)
                : presentation.slides[currentSlide].content}
            </div>
          </div>
        </div>

        <div className={`p-4 shrink-0 flex items-center justify-between border-t ${isBlueprint ? 'border-blue-800 bg-blue-950/80 backdrop-blur' : isMedical ? 'border-emerald-100 bg-white/80 backdrop-blur' : 'border-amber-900/10 bg-[#fdfbf7]/80 backdrop-blur'}`}>
          <button onClick={prevSlide} disabled={currentSlide === 0} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition disabled:opacity-30 ${isBlueprint ? 'bg-blue-900 text-white hover:bg-blue-800' : isMedical ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'}`}>
            <ChevronLeft size={20} /> Anterior
          </button>
          
          <div className="flex gap-1.5">
            {presentation.slides.map((_, idx) => (
              <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? isBlueprint ? 'bg-blue-400 w-6' : isMedical ? 'bg-emerald-500 w-6' : 'bg-amber-600 w-6' : isBlueprint ? 'bg-blue-900' : isMedical ? 'bg-emerald-200' : 'bg-amber-200'}`} />
            ))}
          </div>

          <button onClick={currentSlide === presentation.slides.length - 1 ? onClose : nextSlide} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isBlueprint ? 'bg-blue-500 text-blue-950 hover:bg-blue-400' : isMedical ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
            {currentSlide === presentation.slides.length - 1 ? 'Finalizar' : 'Siguiente'} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PresentationViewer);
