import { useState } from 'react';
import { Bot, Languages, Loader2, Sparkles, Square, Volume2 } from 'lucide-react';

const CATEGORY_LABELS = {
  article: 'der / die / das',
  case: 'Acusativo / Dativo',
  word_order: 'Orden V2',
  conjugation: 'Conjugación',
  vocab: 'Vocabulario',
};

/**
 * Lista compartida de mensajes conversacionales con TTS Charon, correcciones inline y toggle de traducción.
 */
export default function ConversationThread({
  messages = [],
  theme = 'blue',
  botLabel = 'Tutor IA',
  isLoading = false,
  loadingLabel = 'Escribiendo...',
  playingMsgIndex = null,
  onPlayAudio,
  renderModelContent,
  skipInitialSeed = false,
  chatEndRef,
}) {
  const [expandedTranslations, setExpandedTranslations] = useState({});

  const userBubbleClass =
    theme === 'purple'
      ? 'bg-purple-600 text-white rounded-br-none'
      : 'bg-blue-600 text-white rounded-br-none';

  const activeAudioClass =
    theme === 'purple'
      ? 'text-purple-700 bg-purple-100 ring-2 ring-purple-400 animate-pulse'
      : 'text-indigo-700 bg-indigo-100 ring-2 ring-indigo-300 animate-pulse';

  const badgeTextClass = theme === 'purple' ? 'text-purple-700' : 'text-indigo-600';

  const visibleMessages = skipInitialSeed
    ? messages.filter(
        (m) => m.role !== 'user' || m?.parts?.[0]?.text !== 'Hola, inicia la simulación según las instrucciones.'
      )
    : messages;

  const toggleTranslation = (idx) => {
    setExpandedTranslations((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 bg-slate-50 flex flex-col gap-3.5 custom-scrollbar">
      {visibleMessages.map((msg, i) => {
        const isUser = msg.role === 'user';
        const rawText = msg?.parts?.[0]?.text || '';
        const meta = msg?.structuredMeta || null;
        const corrections = Array.isArray(meta?.grammarCorrections) ? meta.grammarCorrections : [];
        const hasTranslation = Boolean(meta?.translationEs && meta.translationEs.trim());
        const showTrans = Boolean(expandedTranslations[i]);

        return (
          <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3.5 shadow-xs ${
                isUser ? userBubbleClass : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
              }`}
            >
              {isUser ? (
                <p className="leading-relaxed text-[14px] sm:text-[15px] select-text whitespace-pre-wrap">
                  {rawText}
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${badgeTextClass}`}
                    >
                      {theme === 'purple' ? (
                        <Sparkles size={13} className="text-purple-500" aria-hidden="true" />
                      ) : (
                        <Bot size={13} className="text-yellow-500" aria-hidden="true" />
                      )}
                      <span>{botLabel}</span>
                    </span>

                    <div className="flex items-center gap-1">
                      {hasTranslation && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(i)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                            showTrans
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                          }`}
                          title="Mostrar u ocultar traducción al español"
                        >
                          <Languages size={13} aria-hidden="true" />
                          <span>{showTrans ? 'Ocultar ES' : 'Traducir'}</span>
                        </button>
                      )}
                      {onPlayAudio && (
                        <button
                          type="button"
                          onClick={() => onPlayAudio(meta?.replyDe || rawText, i, msg)}
                          className={`p-1.5 rounded-lg transition-all shrink-0 cursor-pointer ${
                            playingMsgIndex === i
                              ? activeAudioClass
                              : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
                          }`}
                          title={playingMsgIndex === i ? 'Detener audio' : 'Escuchar en alemán (Charon)'}
                          aria-label="Escuchar audio en alemán"
                        >
                          {playingMsgIndex === i ? <Square fill="currentColor" size={16} /> : <Volume2 size={16} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {renderModelContent ? (
                    renderModelContent(msg, i)
                  ) : (
                    <span className="leading-relaxed text-[14px] sm:text-[15px] select-text whitespace-pre-wrap">
                      {rawText}
                    </span>
                  )}

                  {showTrans && hasTranslation && (
                    <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl px-3 py-2 text-xs text-amber-950 italic">
                      🇪🇸 {meta.translationEs}
                    </div>
                  )}

                  {corrections.length > 0 && (
                    <div className="mt-1 space-y-1.5 border-t border-slate-100 pt-2">
                      {corrections.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-rose-50/70 border border-rose-200/70 rounded-xl px-3 py-2 text-xs space-y-0.5"
                        >
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded">
                              {CATEGORY_LABELS[c.category] || 'Corrección'}
                            </span>
                            {c.original && (
                              <span className="line-through text-rose-700 font-medium">{c.original}</span>
                            )}
                            <span className="font-bold text-emerald-800">→ {c.corrected}</span>
                          </div>
                          {c.explanationEs && (
                            <p className="text-[11px] text-slate-700 leading-snug">{c.explanationEs}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white border border-slate-200 text-slate-500 px-4 py-3 rounded-2xl rounded-bl-none flex gap-2 items-center text-sm shadow-xs">
            <Loader2
              className={`animate-spin ${theme === 'purple' ? 'text-purple-500' : 'text-blue-500'}`}
              size={16}
            />
            <span>{loadingLabel}</span>
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
