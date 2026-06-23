const fs = require('fs');
const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

const missingTutorCode = `      await setDoc(chatDocRef, { messages: newMessages }).catch(console.error);
    }

    try {
      const systemPrompt = "Eres un tutor experto y amigable de alemán nativo, especializado en enseñar a hispanohablantes principiantes (nivel A1/A2). Ayuda al usuario a practicar alemán, resolver sus dudas y corregir sus errores de forma constructiva. Usa EMOJIS. Importante: NO uses firmas al final de tus mensajes. NO te despidas escribiendo 'model' o 'DE' o firmas similares. Da respuestas limpias y claras, separando bien los párrafos.";
      const result = await fetchWithRetry(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: newMessages,
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      
      const aiText = result.candidates[0].content.parts[0].text;
      const finalMessages = [...newMessages, { role: "model", parts: [{ text: aiText }] }];
      
      setChatMessages(finalMessages);
      
      if (user && db) {
        const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
        await setDoc(chatDocRef, { messages: finalMessages }).catch(console.error);
      }
    } catch (error) {
      console.error("Error en el chat:", error);
      setChatMessages([...newMessages, { role: "model", parts: [{ text: "Lo siento, tuve un problema de conexión. ¿Podrías repetir lo último que dijiste?" }] }]);
    } finally {`;

if (!content.includes('const systemPrompt = "Eres un tutor experto y amigable')) {
    content = content.replace(
        `      const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
      setIsChatLoading(false);`,
        `      const chatDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'chat', 'history');
${missingTutorCode}
      setIsChatLoading(false);`
    );
    console.log('Restored missing AI Tutor chat code!');
}

const targetImageRegex = /const result = await fetchWithRetry\(`https:\/\/generativelanguage\.googleapis\.com\/v1beta\/models\/gemini-2\.5-flash-image:generateContent\?key=\$\{apiKey\}`,\s*\{\s*method: 'POST',\s*headers: \{ 'Content-Type': 'application\/json' \},\s*body: JSON\.stringify\(\{\s*contents: \[\{ parts: \[\{ text: promptText \}\] \}\],\s*generationConfig: \{ responseModalities: \['TEXT', 'IMAGE'\] \}\s*\}\)\s*\}\);\s*const base64Image = result\?\.candidates\?\.\[0\]\?\.content\?\.parts\?\.find\(p => p\.inlineData\)\?\.inlineData\?\.data;/;

const replacementImage = `const result = await fetchWithRetry(\`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-fast-generate-001:predict?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: promptText }],
          parameters: { sampleCount: 1, aspectRatio: "1:1" }
        })
      });
      
      const base64Image = result?.predictions?.[0]?.bytesBase64Encoded;`;

if (targetImageRegex.test(content)) {
    content = content.replace(targetImageRegex, replacementImage);
    console.log('Successfully patched image generation API endpoint!');
} else {
    console.log('Regex for image generation API not found!');
}

fs.writeFileSync(appPath, content, 'utf8');
