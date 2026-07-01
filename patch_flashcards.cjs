const fs = require('fs');
let appCode = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add imports
const importsToAdd = `
import localforage from 'localforage';
import BannerAd from './components/BannerAd';
import PresentationVocabCard from './components/PresentationVocabCard';
import GrammarAccordion from './components/GrammarAccordion';
import AudioSim from './components/AudioSim';
import InteractiveQA from './components/InteractiveQA';
import TutorChat from './components/TutorChat';
import MarkdownMessage from './components/MarkdownMessage';
import { chapters } from './data/chapters';
import { useFlashcards } from './hooks/useFlashcards';
import { fetchWithRetry, compressImage, nativeSpeak, getSafeId } from './utils/helpers';
`;

if (!appCode.includes('import BannerAd')) {
    appCode = appCode.replace('import { fal } from "@fal-ai/client";', 'import { fal } from "@fal-ai/client";' + importsToAdd);
}

// 2. Inject useFlashcards in App
if (!appCode.includes('const { srsState, handleReview, getDueCards } = useFlashcards();')) {
    appCode = appCode.replace('export default function App() {', 'export default function App() {\n  const { srsState, handleReview, getDueCards } = useFlashcards();');
}

// 3. Replace inline flashcards with PresentationVocabCard
const startIndex = appCode.indexOf('return <div key={index} onClick={() => toggleCard(index)} className="group cursor-pointer perspective-1000 h-56">');
const endIndexStr = '</div>;\n              })}';
const endIndex = appCode.indexOf(endIndexStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newReturn = `return (
                  <PresentationVocabCard 
                    key={index}
                    wordObj={{...word, chapter: searchTerm ? word.chapter : undefined}}
                    cardImages={cardImages}
                    regeneratedImages={unlockedCards}
                    generateCardImage={generateCardImage}
                    isImageLoading={isImageLoading}
                    openAiTutor={openAiTutor}
                    setFullscreenImage={setFullscreenImage}
                    unlockedCards={unlockedCards}
                    onReview={handleReview}
                    srsState={srsState}
                  />
                );`;
    appCode = appCode.substring(0, startIndex) + newReturn + '\\n              })}'+ appCode.substring(endIndex + endIndexStr.length);
} else {
    console.error("COULD NOT FIND START OR END INDEX FOR INLINE FLASHCARD");
}

fs.writeFileSync('src/App.jsx', appCode);
console.log('Patch complete!');
