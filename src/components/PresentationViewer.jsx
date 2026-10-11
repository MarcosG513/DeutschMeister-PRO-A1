import React, { useState, useEffect } from 'react';
import { Presentation, Link2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { goetheModules, studyPlanModules } from '../data/chapters';
import { recordDailyStudyActivity, recordModuleCompleted, recordCardStudied, getSafeId } from '../utils/helpers';

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
  lazyLoadImage,
  onNextModule
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (presentation) {
      setCurrentSlide(0);
      recordDailyStudyActivity();
    }
  }, [presentation?.id]);

  useEffect(() => {
    const curSlide = presentation?.slides?.[currentSlide];
    if (curSlide) {
      if (curSlide.word && curSlide.word.de) {
        recordCardStudied(getSafeId(curSlide.word.de).substring(0, 150));
      } else if (Array.isArray(curSlide.words)) {
        curSlide.words.forEach(w => {
          if (w?.de) recordCardStudied(getSafeId(w.de).substring(0, 150));
        });
      } else if (curSlide.de) {
        recordCardStudied(getSafeId(curSlide.de).substring(0, 150));
      }
    }
  }, [currentSlide, presentation?.id]);

  const nextSlide = () => {
    recordDailyStudyActivity();
    if (presentation && currentSlide < presentation.slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  if (!presentation) return null;

  let currentCollection = goetheModules;
  let currentModuleIndex = goetheModules.findIndex(m => m.id === presentation?.id);

  // Si no está en Goethe, buscamos en el Plan de Estudios
  if (currentModuleIndex === -1) {
    currentModuleIndex = studyPlanModules.findIndex(m => m.id === presentation?.id);
    if (currentModuleIndex !== -1) {
      currentCollection = studyPlanModules;
    }
  }

  const nextModule = (currentModuleIndex >= 0 && currentModuleIndex < currentCollection.length - 1) 
    ? currentCollection[currentModuleIndex + 1] 
    : null;
  
  const hasNextModule = Boolean(nextModule && nextModule.title);
  const slide = presentation?.slides?.[currentSlide] || presentation?.slides?.[0] || { title: '', subtitle: '', content: null };
  const isLastSlide = currentSlide === (presentation?.slides?.length || 0) - 1;

  const isBlueprint = presentation.theme === 'blueprint';
  const isMedical = presentation.theme === 'medical';
  const isNotebook = presentation.theme === 'notebook';

  const slideProps = {
    cardImages,
    generateCardImage,
    isImageLoading,
    openAiTutor,
    setFullscreenImage,
    unlockedCards,
    speakText,
    lazyLoadImage,
    onComplete: nextSlide
  };

  // Helper de Formato Inline para Negritas (**texto**), Cursivas (*texto*) y Código (`texto`)
  const formatInlineMarkdown = (text) => {
    if (!text) return '';
    
    let clean = text.trim()
      .replace(/([a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\)\]\:\;\,\.\/\-])\*(?!\*)/g, '$1')
      .replace(/(?<!\*)\*(?!\*)/g, '');

    const parts = clean.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={i} className="italic text-indigo-950 font-semibold">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code key={i} className={`px-1.5 py-0.5 rounded font-mono text-sm font-semibold border ${isBlueprint ? 'bg-blue-100/80 text-blue-900 border-blue-200' : 'bg-amber-100 text-amber-900 border-amber-200'}`}>
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // --- UNIVERSAL SLIDE ENGINE ---
  const renderSlideContent = (slide, props) => {
    if (!slide || !slide.content) return null;

    // 1. Ejecutar componentes interactivos si es una función de React
    if (typeof slide.content === 'function') {
      return (
        <div className="w-full my-2 animate-in fade-in zoom-in-95 duration-200">
          {slide.content(props)}
        </div>
      );
    }

    // 2. Si es un elemento React JSX directo
    if (React.isValidElement(slide.content)) {
      return (
        <div className="w-full my-2 animate-in fade-in zoom-in-95 duration-200">
          {slide.content}
        </div>
      );
    }

    // 3. Procesar contenido en formato Texto / Markdown / Tablas
    if (typeof slide.content === 'string') {
      // Sanitización inicial
      const cleanContent = slide.content
        .replace(/([a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\)\]\:\;\,\.\/\-])\*(?!\*)/g, '$1')
        .replace(/(?<!\*)\*(?!\*)/g, '')
        .replace(/\n\n+/g, '\n\n');

      const blocks = cleanContent.split('\n\n');

      return (
        <div className="space-y-4 text-slate-800 leading-relaxed text-sm md:text-base text-left max-w-4xl mx-auto prose prose-slate max-w-none">
          {blocks.map((block, bIdx) => {
            const lines = block.split('\n').filter(l => l.trim() !== '');
            if (lines.length === 0) return null;

            // A. TABLAS MARKDOWN ESTILIZADAS CON TAILWIND
            if (lines.length >= 2 && lines[0].includes('|') && lines[1].includes('|')) {
              const tableRows = lines.filter(line => !line.includes('---'));
              const headerCells = tableRows[0].split('|').map(c => c.trim()).filter(Boolean);
              const bodyRows = tableRows.slice(1).map(row => row.split('|').map(c => c.trim()).filter(Boolean));

              return (
                <div key={bIdx} className="my-4 overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white not-prose">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white font-semibold">
                        {headerCells.map((cell, hIdx) => (
                          <th key={hIdx} className="p-3 border-b border-slate-700">
                            {formatInlineMarkdown(cell)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bodyRows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-slate-800 font-medium">
                              {formatInlineMarkdown(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            // B. FÓRMULAS Y ESTRUCTURAS SINTÁCTICAS ($$ o \text)
            if (block.includes('$$') || block.includes('\\text{') || block.includes('\\mathbf{')) {
              const cleanFormula = block
                .replace(/\$\$/g, '')
                .replace(/\\text\{([^}]+)\}/g, '$1')
                .replace(/\\mathbf\{([^}]+)\}/g, '$1')
                .replace(/\\implies/g, '➔')
                .replace(/\\to/g, '➔')
                .trim();

              return (
                <div key={bIdx} className="my-3 p-4 bg-slate-900 text-amber-300 rounded-xl font-mono text-center text-xs md:text-sm border border-slate-700 shadow-inner not-prose">
                  {cleanFormula}
                </div>
              );
            }

            // C. LLAMADAS Y ALERTAS DIDÁCTICAS (⚠️, ⚡, 🚫, 💡, 🎯, 💶, 🔍)
            if (block.startsWith('⚠️') || block.startsWith('⚡')) {
              return (
                <div key={bIdx} className="my-3 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-950 text-xs md:text-sm font-medium space-y-1.5 shadow-sm not-prose">
                  {lines.map((line, lIdx) => (
                    <p key={lIdx} className="leading-relaxed">
                      {formatInlineMarkdown(line)}
                    </p>
                  ))}
                </div>
              );
            }

            if (block.startsWith('🚫')) {
              return (
                <div key={bIdx} className="my-3 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl text-rose-950 text-xs md:text-sm font-medium space-y-1.5 shadow-sm not-prose">
                  {lines.map((line, lIdx) => (
                    <p key={lIdx} className="leading-relaxed">
                      {formatInlineMarkdown(line)}
                    </p>
                  ))}
                </div>
              );
            }

            if (block.startsWith('💡') || block.startsWith('🎯') || block.startsWith('💶') || block.startsWith('🔍')) {
              return (
                <div key={bIdx} className="my-3 p-4 bg-blue-50/80 border-l-4 border-blue-500 rounded-r-xl text-slate-800 text-xs md:text-sm font-medium space-y-1.5 shadow-sm not-prose">
                  {lines.map((line, lIdx) => (
                    <p key={lIdx} className="leading-relaxed">
                      {formatInlineMarkdown(line)}
                    </p>
                  ))}
                </div>
              );
            }

            // D. LISTAS CON VIÑETA
            if (lines.every(l => l.trim().startsWith('* ') || l.trim().startsWith('- '))) {
              return (
                <ul key={bIdx} className="space-y-2 my-2 pl-1 text-slate-800 not-prose">
                  {lines.map((line, lIdx) => {
                    const itemText = line.trim().replace(/^[\*\-]\s+/, '');
                    return (
                      <li key={lIdx} className="flex items-start gap-2.5 text-slate-800">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <div className="leading-relaxed">{formatInlineMarkdown(itemText)}</div>
                      </li>
                    );
                  })}
                </ul>
              );
            }

            // E. PÁRRAFO ESTÁNDAR
            return (
              <div key={bIdx} className="space-y-1.5 text-slate-800">
                {lines.map((line, lIdx) => (
                  <p key={lIdx} className="leading-relaxed text-slate-800">
                    {formatInlineMarkdown(line)}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  const bodyBackground = isBlueprint
    ? "bg-slate-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"
    : isMedical
      ? "bg-slate-50 bg-white/50"
      : "bg-[#fdfbf7] bg-[linear-gradient(transparent_95%,#e5e7eb_5%)] bg-[size:100%_2rem]";

  return (
    <div className={`fixed inset-0 z-50 flex flex-col h-[100dvh] w-full overflow-hidden bg-slate-50 ${isNotebook ? 'font-serif' : 'font-sans'} animate-in fade-in duration-200`}>
      {/* 1. HEADER (SUPERIOR FIJO) */}
      <header className="flex-shrink-0 w-full z-20 bg-white/95 backdrop-blur border-b border-slate-200 p-3 sm:p-4 shadow-xs">
        {/* Fila 1: Título y Botón Cerrar */}
        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className={`p-2 rounded-xl shrink-0 ${isBlueprint ? 'bg-blue-100 text-blue-700' : isMedical ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
              <Presentation size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-extrabold leading-tight truncate text-slate-900 flex-1 min-w-0">
              {presentation.title}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full transition shrink-0 hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer active:scale-95"
            aria-label="Cerrar presentación"
          >
            <X size={22} />
          </button>
        </div>

        {/* Fila 2: Barra de Controles (< Slide X / Y > y [Diapositivas]) */}
        <div className="flex items-center justify-between gap-2 bg-slate-100/90 border border-slate-200/80 px-2.5 py-1.5 sm:py-2 rounded-xl w-full mt-2.5">
          {/* Controles de Navegación de Diapositiva */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs border border-slate-200 text-slate-800 active:scale-95 cursor-pointer"
              aria-label="Diapositiva anterior"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-xs sm:text-sm font-bold px-1.5 sm:px-2 font-mono text-slate-700 select-none">
              Slide {currentSlide + 1} / {presentation.slides.length}
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlide === presentation.slides.length - 1}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs border border-slate-200 text-slate-800 active:scale-95 cursor-pointer"
              aria-label="Siguiente diapositiva"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Botón "Diapositivas" (Enlace externo o Estado Deshabilitado) */}
          <div>
            {presentation.presentationUrl ? (
              <a
                href={presentation.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-white hover:bg-slate-50 shadow-xs border border-slate-200 rounded-lg transition-all active:scale-95 text-slate-800"
              >
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Diapositivas</span>
              </a>
            ) : (
              <button
                disabled
                title="Sin presentación externa disponible"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed opacity-60 text-slate-500"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>Próximamente</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN (ÁREA DE CONTENIDO SCROLLEABLE) */}
      <main className={`flex-1 w-full overflow-y-auto overscroll-contain px-4 sm:px-6 md:px-10 py-6 pb-28 ${bodyBackground}`}>
        <div className="max-w-4xl mx-auto w-full animate-in slide-in-from-bottom-3 fade-in duration-200" key={currentSlide}>
          <div className="mb-6 md:mb-8 text-center">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl mb-2 tracking-tight ${isBlueprint ? 'text-slate-900 font-extrabold' : isMedical ? 'text-emerald-950 font-black' : 'text-amber-950 font-black'}`}>
              {slide.title}
            </h1>
            {slide.subtitle && (
              <h2 className={`text-sm sm:text-base md:text-lg ${isBlueprint ? 'text-blue-600 font-semibold' : isMedical ? 'text-emerald-700 font-medium' : 'text-amber-700/80 font-medium'}`}>
                {slide.subtitle}
              </h2>
            )}
          </div>
          <div className="w-full text-slate-800 leading-relaxed">
            {renderSlideContent(slide, slideProps)}
          </div>
        </div>
      </main>

      {/* 3. FOOTER (INFERIOR DE NAVEGACIÓN ANCLADO) */}
      <footer className="flex-shrink-0 w-full z-20 bg-white/95 backdrop-blur border-t border-slate-200 py-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0} 
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition disabled:opacity-30 active:scale-95 cursor-pointer shrink-0 ${isBlueprint ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 shadow-xs' : isMedical ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200' : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-200'}`}
        >
          <ChevronLeft size={18} /> Anterior
        </button>
        
        <div className="flex gap-1 sm:gap-1.5 items-center justify-center overflow-x-auto max-w-[40%] sm:max-w-none px-1">
          {presentation.slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-300 shrink-0 ${
                idx === currentSlide 
                  ? isBlueprint ? 'bg-blue-600 w-5 sm:w-6' : isMedical ? 'bg-emerald-500 w-5 sm:w-6' : 'bg-amber-600 w-5 sm:w-6' 
                  : isBlueprint ? 'bg-slate-300 w-2' : isMedical ? 'bg-emerald-200 w-2' : 'bg-amber-200 w-2'
              }`} 
            />
          ))}
        </div>

        {isLastSlide && nextModule && nextModule.id ? (
          <button 
            onClick={() => {
              if (presentation?.id) recordModuleCompleted(presentation.id);
              onNextModule(nextModule.id);
            }} 
            className="flex flex-col items-center justify-center px-3 sm:px-4 py-1.5 rounded-xl font-bold transition bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-500/20 animate-pulse animate-duration-1000 text-center active:scale-95 cursor-pointer shrink-0"
          >
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold">
              Siguiente Módulo <ChevronRight size={16} />
            </div>
            <span className="block text-[9px] sm:text-[10px] font-normal text-emerald-100 truncate max-w-[100px] sm:max-w-[140px]">
              {nextModule?.title}
            </span>
          </button>
        ) : (
          <button 
            onClick={() => {
              if (isLastSlide) {
                if (presentation?.id) recordModuleCompleted(presentation.id);
                onClose();
              } else {
                nextSlide();
              }
            }} 
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm active:scale-95 cursor-pointer shrink-0 ${isBlueprint ? 'bg-blue-600 text-white hover:bg-blue-700' : isMedical ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
          >
            {isLastSlide ? 'Finalizar' : 'Siguiente'} <ChevronRight size={18} />
          </button>
        )}
      </footer>
    </div>
  );
};

export default React.memo(PresentationViewer);
