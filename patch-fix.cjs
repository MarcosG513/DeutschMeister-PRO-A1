const fs = require('fs');

// Patch App.jsx
const appPath = 'src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// 1. generateCardImage
appContent = appContent.replace(
  /const generateCardImage = async \(wordObj, e\) => {\r?\n\s*if \(e\) e\.stopPropagation\(\);\s*/,
  "const generateCardImage = async (wordObj, e) => {\n    if (e) e.stopPropagation();\n    const granted = await showRewardVideo();\n    if (!granted) return;\n"
);

// 2. RoleplaySimulator messages state
if (!appContent.includes('const [tutorMessageCount, setTutorMessageCount]')) {
  appContent = appContent.replace(
    /const \[messages, setMessages\] = useState\(\[\]\);/,
    "const [messages, setMessages] = useState([]);\n  const [tutorMessageCount, setTutorMessageCount] = useState(0);"
  );
}

// 3. RoleplaySimulator sendMessage
appContent = appContent.replace(
  /const sendMessage = async \(\) => {\r?\n\s*if\(\!input\.trim\(\)\) return;\r?\n\s*const newMsgs = \[\.\.\.messages, \{ role: 'user', parts: \[\{text: input\}\] \}\];/,
  "const sendMessage = async () => {\n    if(!input.trim()) return;\n\n    if (tutorMessageCount >= 3) {\n      const granted = await showRewardVideo();\n      if (granted) {\n        setTutorMessageCount(0);\n      } else {\n        return;\n      }\n    } else {\n      setTutorMessageCount(prev => prev + 1);\n    }\n\n    const newMsgs = [...messages, { role: 'user', parts: [{text: input}] }];"
);

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('App.jsx patched!');

// Patch AdService.js
const adPath = 'src/services/AdService.js';
let adContent = fs.readFileSync(adPath, 'utf8');

adContent = adContent.replace(
  /console\.error\('Reward Video failed to load', err\);/,
  "console.error('Reward Video failed to load', err);\n        alert('AdMob Error: No se pudo cargar el video promocional. Revisa tu conexión a internet.');"
);

adContent = adContent.replace(
  /console\.error\('Error showing Reward Video', e\);/,
  "console.error('Error showing Reward Video', e);\n      alert('AdMob Error: ' + e.message);"
);

fs.writeFileSync(adPath, adContent, 'utf8');
console.log('AdService.js patched!');
