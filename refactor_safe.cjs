const fs = require('fs');
const babel = require('@babel/core');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

const { ast } = babel.transformSync(appCode, {
    ast: true,
    code: false,
    plugins: ['@babel/plugin-syntax-jsx'],
    filename: 'src/App.jsx'
});

const nodesToRemove = new Set();
const varsToRemove = [
    'chapters', 'PresentationVocabCard', 'TutorChat', 'InteractiveQA', 
    'GrammarAccordion', 'AudioSim', 'MarkdownMessage', 'BannerAd',
    'fetchWithRetry', 'compressImage', 'nativeSpeak', 'getSafeId'
];

babel.traverse(ast, {
    VariableDeclarator(path) {
        if (path.node.id && path.node.id.name) {
            const name = path.node.id.name;
            if (varsToRemove.includes(name)) {
                nodesToRemove.add(path.parentPath.node);
            }
        }
    }
});

const generator = require('@babel/generator').default;

babel.traverse(ast, {
    VariableDeclaration(path) {
        if (nodesToRemove.has(path.node)) {
            path.remove();
        }
    }
});

// Use retainLines: false to avoid huge empty spaces where code was removed
let newCode = generator(ast, { retainLines: false }, appCode).code;

// 2. Add imports at the top
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
import { fetchWithRetry, compressImageBase64 as compressImage, nativeSpeak, getSafeId } from './utils/helpers';
`;

// Make sure to add real newline
newCode = newCode.replace('import { fal } from "@fal-ai/client";', 'import { fal } from "@fal-ai/client";\n' + importsToAdd);

// 3. Inject useFlashcards in App
newCode = newCode.replace('export default function App() {', 'export default function App() {\n  const { srsState, handleReview, getDueCards } = useFlashcards();');

// 4. Replace inline flashcards with PresentationVocabCard
const startStr = 'return <div key={index} onClick={() => toggleCard(index)} className="group cursor-pointer perspective-1000 h-56">';
const endStr = '</div>;\n              })}';

const startIndex = newCode.indexOf(startStr);
const endIndex = newCode.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newJSX = `return (
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
    newCode = newCode.substring(0, startIndex) + newJSX + '\n              })}' + newCode.substring(endIndex + endStr.length);
} else {
    console.error("Could not find flashcard string replacement bounds.");
}

fs.writeFileSync('src/App.jsx', newCode);
console.log('Done!');
