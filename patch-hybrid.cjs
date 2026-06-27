const fs = require('fs');
const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

// 1. Fix the infinite recursion bug
content = content.replace(
    'const granted = await consumeEnergy(1);\n        if (granted) {\n          await updateDoc(profileRef, { ai_credits: increment(5) });',
    'const granted = await showRewardVideo();\n        if (granted) {\n          await updateDoc(profileRef, { ai_credits: increment(5) });'
);

// 2. Modify imagesRef collection pointer
content = content.replace(
    "const imagesRef = collection(db, 'artifacts', appId, 'users', user.uid, 'flashcardImages');",
    "const imagesRef = collection(db, 'artifacts', appId, 'public_content', 'data', 'flashcardImages');"
);

// 3. Rewrite generateCardImage
const oldGenerateCardImageRegex = /const generateCardImage = async \(wordObj, e\) => \{[\s\S]*?setIsImageLoading\(null\);\r?\n\s*\};\r?\n/;

const newGenerateCardImage = `const generateCardImage = async (wordObj, e) => {
    if (e) e.stopPropagation();
    const safeId = getSafeId(wordObj.de).substring(0, 150);
    
    // Paso 1: Verifica local (Bypass total)
    if (cardImages[safeId]) return;

    setIsImageLoading(safeId);
    
    try {
      // Paso 2: Verifica Caché Global en Firestore
      if (db) {
        const globalDocRef = doc(db, 'artifacts', appId, 'public_content', 'data', 'flashcardImages', safeId);
        const docSnap = await getDoc(globalDocRef);
        if (docSnap.exists()) {
          // Bypass de energía: imagen recuperada del caché global
          setCardImages(prev => ({...prev, [safeId]: docSnap.data().imageBase64}));
          setIsImageLoading(null);
          return;
        }
      }

      // Paso 3: Consumir energía si no existe en caché global
      const granted = await consumeEnergy(1);
      if (!granted) {
        setIsImageLoading(null);
        return;
      }

      const promptText = \`Generate a simple, clear, flat vector illustration on a white background representing the German word "\${wordObj.de}" meaning "\${wordObj.es}". No text in the image.\`;
      
      const result = await fetchWithRetry(\`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-fast-generate-001:predict?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: promptText }],
          parameters: { sampleCount: 1, aspectRatio: "1:1" }
        })
      });
      
      const base64Image = result?.predictions?.[0]?.bytesBase64Encoded;
      if (!base64Image) {
          throw new Error("No image data returned from API");
      }
      
      setCardImages(prev => ({...prev, [safeId]: base64Image}));

      if (db) {
        const globalDocRef = doc(db, 'artifacts', appId, 'public_content', 'data', 'flashcardImages', safeId);
        await setDoc(globalDocRef, { imageBase64: base64Image, word: wordObj.de }).catch(console.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsImageLoading(null);
    }
  };
`;

content = content.replace(oldGenerateCardImageRegex, newGenerateCardImage + '\n');

fs.writeFileSync(appPath, content, 'utf8');
console.log('App.jsx has been successfully patched with Hybrid Topology and the infinite recursion bug is fixed.');
