const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

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

// ALso we need to actually remove the inline components if they exist!
// Let's check if they exist by running a simple regex replacement for the ones we extracted
// Wait, the ones we extracted were already removed in an earlier script? No!
// Let's check if they are in App.jsx

fs.writeFileSync('src/App.jsx', appCode);
console.log('Imports added!');
