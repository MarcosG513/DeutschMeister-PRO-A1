import { Mic, Send } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { scrollInputIntoView } from '../../utils/helpers';
import SuggestionBar from './SuggestionBar';

/**
 * Barra de entrada compartida con SuggestionBar táctil, dictado por voz STT, onFocus móvil y safe-area inferior.
 */
export default function ComposerBar({
  value = '',
  onChange,
  onSend,
  placeholder = 'Escribe tu respuesta en alemán...',
  disabled = false,
  accent = 'blue',
  suggestions = [],
  showSuggestions = true,
  onToggleSuggestions,
  onSelectSuggestion,
  onPlaySuggestionAudio,
  playingSuggestionText = null,
  enableMic = true,
  targetLanguage = 'de-DE',
}) {
  const { isListening, startListening, stopListening } = useSpeechRecognition(targetLanguage);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening((spokenText) => {
      if (spokenText && onChange) {
        onChange((prev) => (prev ? `${prev} ${spokenText}` : spokenText));
      }
    });
  };

  const focusRingClass =
    accent === 'purple'
      ? 'focus:border-purple-500'
      : accent === 'sky'
        ? 'focus:border-sky-500'
        : 'focus:border-blue-500';

  const sendBtnClass =
    accent === 'purple'
      ? 'bg-purple-600 hover:bg-purple-700'
      : accent === 'sky'
        ? 'bg-sky-600 hover:bg-sky-700'
        : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="p-3 sm:p-4 pb-[max(0.85rem,calc(env(safe-area-inset-bottom,0px)+0.6rem))] bg-white border-t border-slate-200 flex-shrink-0">
      <SuggestionBar
        suggestions={suggestions}
        isVisible={showSuggestions}
        onToggleVisible={onToggleSuggestions}
        onSelectSuggestion={onSelectSuggestion}
        onPlayAudio={onPlaySuggestionAudio}
        playingText={playingSuggestionText}
        isLoading={disabled}
        accent={accent}
      />

      <div className="relative flex items-center">
        <input
          type="text"
          className={`w-full min-h-[44px] bg-slate-100 border border-slate-200 rounded-full py-3 pl-4 sm:pl-5 ${
            enableMic ? 'pr-24' : 'pr-14'
          } text-sm focus:outline-none ${focusRingClass} focus:bg-white transition shadow-inner`}
          placeholder={isListening ? 'Escuchando tu voz en alemán...' : placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={scrollInputIntoView}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !disabled && value?.trim()) {
              onSend?.();
            }
          }}
          disabled={disabled}
        />

        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {enableMic && (
            <button
              type="button"
              onClick={handleMicClick}
              disabled={disabled}
              className={`min-w-[38px] min-h-[38px] p-2 rounded-full transition shadow cursor-pointer flex items-center justify-center disabled:opacity-50 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
              title={isListening ? 'Detener micrófono' : 'Hablar en alemán (Micrófono)'}
              aria-label="Dictar con micrófono"
            >
              <Mic size={17} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onSend}
            disabled={!value?.trim() || disabled}
            className={`min-w-[38px] min-h-[38px] p-2 text-white rounded-full disabled:opacity-40 disabled:bg-slate-400 transition shadow cursor-pointer flex items-center justify-center ${sendBtnClass}`}
            aria-label="Enviar mensaje"
          >
            <Send size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
