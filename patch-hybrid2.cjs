const fs = require('fs');
const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

const targetStr = `  const generateCardImage = async (wordObj, e) => {
    if (e) e.stopPropagation();
    const granted = await consumeEnergy(1);
    if (!granted) return;
const safeId = getSafeId(wordObj.de).substring(0, 150);
    
    if (cardImages[safeId]) return;

    setIsImageLoading(safeId);
    try {
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

      if (user && db) {
        const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'flashcardImages', safeId);
        await setDoc(docRef, { imageBase64: base64Image, word: wordObj.de }).catch(console.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsImageLoading(null);
    }
  };`;

const newStr = `  const generateCardImage = async (wordObj, e) => {
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
  };`;

// Use indexOf to slice out the block safely regardless of slight indentation mismatch
const startIndex = content.indexOf('const generateCardImage = async (wordObj, e) => {');
const endIndex = content.indexOf('const speakText = async (word, e) => {');

if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + newStr + '\n\n  ' + content.substring(endIndex);
    fs.writeFileSync(appPath, content, 'utf8');
    console.log("Successfully replaced generateCardImage");
} else {
    console.log("Failed to find bounds.");
}
