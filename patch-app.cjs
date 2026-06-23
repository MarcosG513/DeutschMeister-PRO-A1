const fs = require('fs');

const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Imports
if (!content.includes('./services/AdService')) {
  content = content.replace(
    /import { TextToSpeech } from '@capacitor-community\/text-to-speech';/,
    "import { TextToSpeech } from '@capacitor-community/text-to-speech';\nimport { initializeAdMob, showRewardVideo, showInterstitial } from './services/AdService';"
  );
}

// 2. Initialize AdMob inside App
if (!content.includes('initializeAdMob()')) {
  content = content.replace(
    /export default function App\(\) {/,
    "export default function App() {\n  useEffect(() => {\n    initializeAdMob();\n  }, []);"
  );
}

// 3. generateCardImage
if (!content.includes('const granted = await showRewardVideo()')) {
  content = content.replace(
    /const generateCardImage = async \(wordObj, e\) => {\n\s*if\s*\(e\)\s*e\.stopPropagation\(\);/g,
    "const generateCardImage = async (wordObj, e) => {\n    if (e) e.stopPropagation();\n    const granted = await showRewardVideo();\n    if (!granted) return;"
  );
}

// 4. generateStory
content = content.replace(
  /const generateStory = async \(\) => {\n\s*if \(\!currentLevel\)/,
  "const generateStory = async () => {\n    const granted = await showRewardVideo();\n    if (!granted) return;\n    if (!currentLevel)"
);

// 5. Quiz Exit
content = content.replace(
  /onClick=\{\(\) => \{ setViewMode\("flashcards"\); setQuizState\(null\); \}\}/g,
  'onClick={() => { setViewMode("flashcards"); setQuizState(null); showInterstitial(); }}'
);

// 6. Tutor AI Message Count State
if (!content.includes('tutorMessageCount')) {
  content = content.replace(
    /const \[messages, setMessages\] = useState\(\[\]\);/,
    "const [messages, setMessages] = useState([]);\n  const [tutorMessageCount, setTutorMessageCount] = useState(0);"
  );

  content = content.replace(
    /const sendMessage = async \(\) => {\n\s*if \(\!input\.trim\(\) \|\| loading\) return;/g,
    "const sendMessage = async () => {\n    if (!input.trim() || loading) return;\n    if (tutorMessageCount >= 3) {\n      const granted = await showRewardVideo();\n      if (granted) {\n        setTutorMessageCount(0);\n      } else {\n        return;\n      }\n    } else {\n      setTutorMessageCount(prev => prev + 1);\n    }"
  );
}

fs.writeFileSync(path, content, 'utf8');
console.log('App.jsx patched successfully');
