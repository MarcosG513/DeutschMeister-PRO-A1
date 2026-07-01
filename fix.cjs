const fs = require('fs');
let appStr = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Fix generateCardImage
const newGenerateCardImage = `  const generateCardImage = async (wordObj, e, forceRegenerate = false) => {
    if (e) e.stopPropagation();
    const safeId = getSafeId(wordObj.de).substring(0, 150);
    const userDocRef = (user && db) ? doc(db, 'artifacts', appId, 'users', user.uid, 'unlockedCards', safeId) : null;
    
    if (!forceRegenerate) {
      const existingImage = cardImages[safeId];
      if (existingImage) {
        const granted = await showRewardVideo();
        if (!granted) return;
        setUnlockedCards(prev => ({ ...prev, [safeId]: { unlocked: true, regenerated: false } }));
        if (userDocRef) {
          try { await setDoc(userDocRef, { unlocked: true, regenerated: false }, { merge: true }); } catch (error) { console.warn(error); }
        }
        return;
      }
    } else {
      const currentCount = unlockedCards && unlockedCards[safeId]?.regenerateCount !== undefined ? unlockedCards[safeId].regenerateCount : (unlockedCards && unlockedCards[safeId]?.regenerated ? 1 : 0);
      if (currentCount >= 3) {
        alert('Ya has regenerado esta imagen el máximo de veces permitido (3 veces).');
        return;
      }
    }
    const falKey = import.meta.env.VITE_FAL_KEY;
    if (!falKey) {
      alert('Error Crítico: API Key de FAL.ai no encontrada en la configuración.');
      return;
    }
    fal.config({ credentials: falKey });
    const granted = await showRewardVideo();
    if (!granted) return;
    setIsImageLoading(safeId);
    try {
      const context = activeChapter ? activeChapter.title : '';
      const currentCount = unlockedCards && unlockedCards[safeId]?.regenerateCount !== undefined ? unlockedCards[safeId].regenerateCount : (unlockedCards && unlockedCards[safeId]?.regenerated ? 1 : 0);
      const newCount = forceRegenerate ? currentCount + 1 : currentCount;
      let promptText = \`A beautiful, highly detailed, and purely graphic educational illustration representing the concept of "\${wordObj.es}". Context: \${context}. The image must be a completely wordless scene containing ONLY objects, characters, or actions. ABSOLUTELY NO typography, NO letters, NO labels, NO text. Clean white background.\`;
      if (wordObj.type === 'Letra') {
        promptText = \`A beautiful, highly detailed educational illustration of a single large, bold letter "\${wordObj.es}". Include a beautiful object next to it whose name starts with this letter. Clean white background.\`;
      } else if (wordObj.type === 'Número') {
        promptText = \`A beautiful, highly detailed educational illustration of a single large, bold number "\${wordObj.es}". Include exactly \${wordObj.es} beautiful objects next to it to represent the quantity. Clean white background.\`;
      } else if (['Monate', 'Tage', 'Jahreszeiten'].includes(wordObj.category)) {
        promptText = \`A beautiful, highly detailed, and purely graphic miniature scene representing the time of year or concept of "\${wordObj.es}". Context: \${context}. The image must be a completely wordless scene containing ONLY objects, characters, or actions. ABSOLUTELY NO typography, NO letters, NO labels, NO calendars with text. Clean white background.\`;
      }
      const result = await fal.subscribe('fal-ai/flux/schnell', {
        input: { prompt: promptText, image_size: 'square_hd', num_inference_steps: 4, sync_mode: true }
      });
      let dataUri = result?.data?.images?.[0]?.url;
      if (!dataUri) throw new Error('No image data returned from FAL API');
      dataUri = await compressImageBase64(dataUri, 1024, 0.9);
      setCardImages(prev => ({ ...prev, [safeId]: dataUri }));
      
      if (db) {
        try {
          const globalAppId = 'deutschmeister-pro';
          const docRef = doc(db, 'artifacts', globalAppId, 'public', 'data', 'flashcardImages', safeId);
          await setDoc(docRef, { imageUrl: dataUri, word: wordObj.de, regenerateCount: newCount }, { merge: true });
          const strictDocRef = doc(db, 'public_content', 'data', 'flashcardImages', safeId);
          await setDoc(strictDocRef, { imageUrl: dataUri, word: wordObj.de, regenerateCount: newCount }, { merge: true });
        } catch(e) { console.warn(e); }
      }
      setUnlockedCards(prev => ({ ...prev, [safeId]: { unlocked: true, regenerateCount: newCount } }));
      if (userDocRef) {
        await setDoc(userDocRef, { unlocked: true, regenerateCount: newCount }, { merge: true }).catch(e => console.warn(e));
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error técnico: ' + error.message);
    } finally {
      setIsImageLoading(null);
    }
  };`;

const startGen = appStr.indexOf('  const generateCardImage = async (wordObj, e, forceRegenerate = false) => {');
const endGen = appStr.indexOf('  const speakText = async (word, e) => {');
if(startGen !== -1 && endGen !== -1) {
  appStr = appStr.substring(0, startGen) + newGenerateCardImage + '\n' + appStr.substring(endGen);
}

// 2. Replace TutorChat inline
const newTutorChat = `    {/* --- PANEL LATERAL: TUTOR IA --- */}
    <TutorChat 
      isOpen={isTutorOpen}
      isFullscreen={isTutorFullscreen}
      setIsOpen={setIsTutorOpen}
      setIsFullscreen={setIsTutorFullscreen}
      chatMessages={chatMessages}
      chatInput={chatInput}
      setChatInput={setChatInput}
      sendChatMessage={sendChatMessage}
      isChatLoading={isChatLoading}
      chatEndRef={chatEndRef}
    />`;
const startTutor = appStr.indexOf('    {/* --- PANEL LATERAL: TUTOR IA --- */}');
const endTutor = appStr.indexOf('    {fullscreenImage && <div className="fixed inset-0 z-[100] bg-slate-900/95"');
if(startTutor !== -1 && endTutor !== -1) {
  appStr = appStr.substring(0, startTutor) + newTutorChat + '\n\n' + appStr.substring(endTutor);
}

// 3. Update PresentationVocabCard props
appStr = appStr.replace('onReview={handleReview}', '');
appStr = appStr.replace('srsState={srsState}', 'isRevealed={isRevealed}');

fs.writeFileSync('src/App.jsx', appStr);
