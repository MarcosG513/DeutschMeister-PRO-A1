import { ChevronDown, ChevronUp, Lightbulb, Volume2 } from 'lucide-react';

const ACCENT_CLASSES = {
  blue: {
    pill: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-slate-800',
    tag: 'bg-blue-600 text-white',
    audio: 'text-blue-600 hover:bg-blue-200/60',
  },
  purple: {
    pill: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-slate-800',
    tag: 'bg-purple-600 text-white',
    audio: 'text-purple-600 hover:bg-purple-200/60',
  },
  sky: {
    pill: 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-slate-800',
    tag: 'bg-sky-600 text-white',
    audio: 'text-sky-600 hover:bg-sky-200/60',
  },
  amber: {
    pill: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-slate-800',
    tag: 'bg-amber-600 text-white',
    audio: 'text-amber-700 hover:bg-amber-200/60',
  },
};

/**
 * Barra horizontal de sugerencias en alemán con glosa en español y reproducción Charon previa.
 */
export default function SuggestionBar({
  suggestions = [],
  isVisible = true,
  onToggleVisible,
  onSelectSuggestion,
  onPlayAudio,
  playingText = null,
  isLoading = false,
  accent = 'blue',
}) {
  if (!Array.isArray(suggestions) || suggestions.length === 0) return null;

  const palette = ACCENT_CLASSES[accent] || ACCENT_CLASSES.blue;

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between gap-2 mb-1">
        <button
          type="button"
          onClick={onToggleVisible}
          className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-slate-800 py-1 px-1.5 rounded-lg transition cursor-pointer"
        >
          <Lightbulb size={13} className="text-amber-500" aria-hidden="true" />
          <span>Ideas en alemán ({suggestions.length})</span>
          {isVisible ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </button>
      </div>

      {isVisible && (
        <div
          className="flex flex-nowrap items-stretch gap-2 overflow-x-auto snap-x no-scrollbar py-0.5"
          role="list"
          aria-label="Sugerencias de respuesta en alemán"
        >
          {suggestions.map((item, idx) => {
            if (!item?.de) return null;
            const isPlaying = playingText === item.de;
            return (
              <div
                key={`${item.de}_${idx}`}
                role="listitem"
                className={`snap-start shrink-0 max-w-[265px] min-h-[44px] flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 transition shadow-2xs ${palette.pill}`}
              >
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => onSelectSuggestion?.(item)}
                  className="flex-1 min-w-0 text-left cursor-pointer disabled:opacity-50 py-0.5"
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.grammarTag && (
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${palette.tag}`}
                      >
                        {item.grammarTag}
                      </span>
                    )}
                    <span className="text-xs font-bold leading-snug text-slate-900 break-words">
                      {item.de}
                    </span>
                  </div>
                  {item.es && (
                    <span className="block text-[11px] text-slate-500 truncate mt-0.5">
                      {item.es}
                    </span>
                  )}
                </button>

                {onPlayAudio && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAudio(item.de);
                    }}
                    aria-label={`Escuchar sugerencia: ${item.de}`}
                    className={`min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg transition shrink-0 cursor-pointer ${
                      isPlaying ? 'bg-indigo-600 text-white animate-pulse' : palette.audio
                    }`}
                  >
                    <Volume2 size={15} aria-hidden="true" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
