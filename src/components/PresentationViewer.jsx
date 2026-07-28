import React, { useState, useEffect } from 'react';
import { Presentation, Link2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { goetheModules, studyPlanModules } from '../data/chapters';

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
    }
  }, [presentation?.id]);

  const nextSlide = () => {
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
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={i} className="italic text-indigo-900 font-medium">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code key={i} className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono text-sm font-semibold border border-amber-200">
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

    // 1. Renderizado de Componentes Interactivos (Función JSX: VoiceExaminer, AccusativeShield, etc.)
    if (typeof slide.content === 'function') {
      return slide.content(props);
    }

    // 2. Si es un elemento React JSX directo
    if (React.isValidElement(slide.content)) {
      return slide.content;
    }

    // 3. Renderizado de Texto, Tablas, Fórmulas y Listas en Markdown
    if (typeof slide.content === 'string') {
      // Sanitización global de asteriscos huérfanos y símbolos
      const cleanContent = slide.content
        .replace(/([a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\)\]\:\;\,\.\/\-])\*(?!\*)/g, '$1')
        .replace(/(?<!\*)\*(?!\*)/g, '')
        .replace(/\n\n+/g, '\n\n');

      const blocks = cleanContent.split('\n\n');

      return (
        <div className="space-y-4 text-slate-800 leading-relaxed text-left max-w-4xl mx-auto">
          {blocks.map((block, bIdx) => {
            const lines = block.split('\n').filter(l => l.trim() !== '');
            if (lines.length === 0) return null;

            // A. Detección de FÓRMULAS / SINTAXIS (\text{...} o $$)
            if (block.includes('\\text{') || block.includes('$$') || block.includes('\\mathbf{')) {
              const cleanFormula = block
                .replace(/\$\$/g, '')
                .replace(/\\text\{([^}]+)\}/g, '$1')
                .replace(/\\mathbf\{([^}]+)\}/g, '$1')
                .replace(/\\implies/g, '➔')
                .replace(/\\to/g, '➔')
                .trim();

              return (
                <div key={bIdx} className="my-3 p-4 bg-gradient-to-r from-indigo-950 to-slate-900 text-amber-300 rounded-xl font-mono text-center text-sm md:text-base shadow-lg border border-indigo-700/50">
                  {formatInlineMarkdown(cleanFormula)}
                </div>
              );
            }

            // B. Detección de TABLAS MARKDOWN (| col1 | col2 |)
            if (lines.length >= 2 && lines[0].includes('|') && lines[1].includes('|')) {
              const tableRows = lines.filter(line => !line.includes('---'));
              const headerCells = tableRows[0].split('|').map(c => c.trim()).filter(Boolean);
              const bodyRows = tableRows.slice(1).map(row => row.split('|').map(c => c.trim()).filter(Boolean));

              return (
                <div key={bIdx} className="my-4 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-sm border-collapse bg-white">
                    <thead>
                      <tr className="bg-slate-900 text-white font-semibold">
                        {headerCells.map((cell, hIdx) => (
                          <th key={hIdx} className="p-3 border-b border-slate-700">
                            {formatInlineMarkdown(cell)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bodyRows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-slate-700 font-medium">
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

            // C. Detección de LISTAS (* ítem o - ítem)
            if (lines.every(l => l.trim().startsWith('* ') || l.trim().startsWith('- '))) {
              return (
                <ul key={bIdx} className="space-y-2 my-2 pl-2">
                  {lines.map((line, lIdx) => {
                    const itemText = line.trim().replace(/^[\*\-]\s+/, '');
                    return (
                      <li key={lIdx} className="flex items-start gap-2 text-base text-slate-700">
                        <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>{formatInlineMarkdown(itemText)}</span>
                      </li>
                    );
                  })}
                </ul>
              );
            }

            // D. PÁRRAFO ESTÁNDAR CON SALTOS SIMPLES
            return (
              <div key={bIdx} className="space-y-1">
                {lines.map((line, lIdx) => (
                  <p key={lIdx} className="text-base leading-relaxed">
                    {formatInlineMarkdown(line)}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      );
    }

    return slide.content;
  };

  return (
    <div className="flex flex-col min-h-[100svh] w-full bg-white animate-in fade-in zoom-in-95 duration-200">
      <div className={containerClass}>
        <div className={headerClass}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`p-2 rounded-lg shrink-0 ${isBlueprint ? 'bg-blue-900 text-blue-300' : isMedical ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
              <Presentation size={24} />
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="font-bold text-sm sm:text-lg leading-tight line-clamp-2">{presentation.title}</h2>
              <p className={`text-xs ${isBlueprint ? 'text-blue-400' : isMedical ? 'text-emerald-600' : 'text-amber-600'}`}>{currentSlide + 1} / {presentation.slides.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
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
                {slide.title}
              </h1>
              {slide.subtitle && (
                <h2 className={`text-lg md:text-xl font-medium ${isBlueprint ? 'text-blue-300' : isMedical ? 'text-emerald-700' : 'text-amber-700/80'}`}>
                  {slide.subtitle}
                </h2>
              )}
            </div>
            <div className="w-full">
              {renderSlideContent(slide, slideProps)}
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

          {isLastSlide && nextModule && nextModule.id ? (
            <button 
              onClick={() => onNextModule(nextModule.id)} 
              className="flex flex-col items-center justify-center px-4 py-1.5 rounded-lg font-bold transition bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 animate-pulse animate-duration-1000 text-center"
            >
              <div className="flex items-center gap-1 text-sm font-bold">
                Siguiente Módulo <ChevronRight size={16} />
              </div>
              <span className="block text-[10px] sm:text-xs font-normal text-emerald-200 truncate max-w-[120px] sm:max-w-xs">
                {nextModule?.title}
              </span>
            </button>
          ) : (
            <button 
              onClick={isLastSlide ? onClose : nextSlide} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isBlueprint ? 'bg-blue-500 text-blue-950 hover:bg-blue-400' : isMedical ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
            >
              {isLastSlide ? 'Finalizar' : 'Siguiente'} <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PresentationViewer);
