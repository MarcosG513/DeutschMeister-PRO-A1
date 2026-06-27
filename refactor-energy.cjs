const fs = require('fs');
const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

// 1. Add missing imports
if (!content.includes('import { Zap }')) {
    content = content.replace(
        "import { Search, BookOpen, Car, Home, Coffee",
        "import { Search, BookOpen, Car, Home, Coffee, Zap"
    );
}
content = content.replace(
    "import { getFirestore, collection, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';",
    "import { getFirestore, collection, doc, setDoc, getDoc, onSnapshot, updateDoc, increment } from 'firebase/firestore';"
);

// 2. Introduce aiCredits state and consumeEnergy function
const energyLogic = `
  const [aiCredits, setAiCredits] = useState(0);

  useEffect(() => {
    if (!user || !db) return;
    const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
    const unsubscribe = onSnapshot(profileRef, (snap) => {
      if (snap.exists()) {
        setAiCredits(snap.data().ai_credits || 0);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const consumeEnergy = async (cost = 1) => {
    if (!user || !db) return false;
    const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
    try {
      const snap = await getDoc(profileRef);
      const currentCredits = snap.exists() ? (snap.data().ai_credits || 0) : 0;
      if (currentCredits >= cost) {
        await updateDoc(profileRef, { ai_credits: increment(-cost) });
        return true;
      } else {
        alert("Batería Baja: Energía de IA insuficiente. Recarga 5 créditos viendo este anuncio.");
        const granted = await showRewardVideo();
        if (granted) {
          await updateDoc(profileRef, { ai_credits: increment(5) });
          alert("¡Generador activado! Se añadieron +5 créditos.");
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      console.error("Error consumiendo energía:", e);
      alert("Error de red al verificar energía.");
      return false;
    }
  };
`;
if (!content.includes('const [aiCredits, setAiCredits]')) {
    content = content.replace(
        '  const [isChatLoading, setIsChatLoading] = useState(false);',
        '  const [isChatLoading, setIsChatLoading] = useState(false);\n' + energyLogic
    );
}

// 3. Update Auth Listener for Lazy Registration
content = content.replace(
    'const unsubscribe = onAuthStateChanged(auth, setUser);',
    `const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u && db) {
        const profileRef = doc(db, 'artifacts', appId, 'users', u.uid, 'profile', 'data');
        try {
          const snap = await getDoc(profileRef);
          if (!snap.exists()) {
            await setDoc(profileRef, { ai_credits: 3 });
          }
        } catch(e) { console.error("Lazy Registration Error:", e); }
      }
    });`
);

// 4. Multi-Tenant Flashcards Data Isolation
content = content.replace(
    /collection\(db, 'artifacts', appId, 'public', 'data', 'flashcardImages'\)/g,
    "collection(db, 'artifacts', appId, 'users', user.uid, 'flashcardImages')"
);
content = content.replace(
    /doc\(db, 'artifacts', appId, 'public', 'data', 'flashcardImages', safeId\)/g,
    "doc(db, 'artifacts', appId, 'users', user.uid, 'flashcardImages', safeId)"
);

// 5. Connect AI routes to consumeEnergy
content = content.replace(
    /const granted = await showRewardVideo\(\);/g,
    "const granted = await consumeEnergy(1);"
);

// 6. Connect RoleplaySimulator
content = content.replace(
    /const RoleplaySimulator = \(\{ apiKey, onExit \}\) => \{/g,
    "const RoleplaySimulator = ({ apiKey, onExit, consumeEnergy }) => {"
);
content = content.replace(
    /<RoleplaySimulator apiKey=\{apiKey\} onExit=\{\(\) => setViewMode\("flashcards"\)\} \/>/g,
    '<RoleplaySimulator apiKey={apiKey} onExit={() => setViewMode("flashcards")} consumeEnergy={consumeEnergy} />'
);

// 7. Connect Tutor IA
const tutorChatTarget = `      const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
      await setDoc(chatDocRef, { messages: newMessages }).catch(console.error);
    }

    try {`;

const tutorChatReplacement = `      const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
      await setDoc(chatDocRef, { messages: newMessages }).catch(console.error);
    }

    const granted = await consumeEnergy(1);
    if (!granted) { setIsChatLoading(false); return; }

    try {`;

if (content.includes(tutorChatTarget) && !content.includes('const granted = await consumeEnergy(1);\n    if (!granted) { setIsChatLoading(false); return; }')) {
    content = content.replace(tutorChatTarget, tutorChatReplacement);
}

// 8. Visual representation of Energy
const headerTarget = `<h1 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm flex items-center gap-2">`;
const headerReplacement = `<h1 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm flex items-center gap-2">`;
// Wait, we need to add the Zap icon to the header. I will inject it at the end of the header block.
content = content.replace(
    /<div className="flex items-center gap-3">\r?\n\s*<img src="\/icon\.png"/,
    `<div className="flex items-center gap-4">\n          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-yellow-300 font-bold shadow-sm" title="Créditos IA"><Zap size={16} className="fill-current"/> {aiCredits}</div>\n          <img src="/icon.png"`
);


fs.writeFileSync(appPath, content, 'utf8');
console.log('App.jsx has been successfully refactored for Multi-Tenant and Energy Logic.');
