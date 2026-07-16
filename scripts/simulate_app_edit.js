import parser from '@babel/parser';
import generatorModule from '@babel/generator';
import traverseModule from '@babel/traverse';
import * as t from '@babel/types';
import fs from 'fs';

const traverse = traverseModule.default || traverseModule;
const generator = generatorModule.default || generatorModule;

const sourceFile = 'src/App.jsx';
const destFile = 'scratch/App_proposed.jsx';

console.log(`Loading source file from ${sourceFile}...`);
const content = fs.readFileSync(sourceFile, 'utf8');

console.log('Parsing AST...');
const ast = parser.parse(content, {
  sourceType: 'module',
  plugins: ['jsx']
});

let modified = false;

traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'generateCardImage') {
      const init = path.node.init;
      if (init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')) {
        const body = init.body;
        if (body && body.type === 'BlockStatement') {
          // Find the TryStatement inside generateCardImage
          const tryStmt = body.body.find(stmt => stmt.type === 'TryStatement');
          if (tryStmt) {
            console.log('Found TryStatement inside generateCardImage.');
            
            // Build the new Try block body statements
            const newTryBodyCode = `
              if (!functions) throw new Error("Firebase functions not initialized");
              const currentCount = unlockedCards && unlockedCards[safeId]?.regenerateCount !== undefined ? unlockedCards[safeId].regenerateCount : (unlockedCards && unlockedCards[safeId]?.regenerated ? 1 : 0);
              const newCount = forceRegenerate ? currentCount + 1 : currentCount;
              let conceptoAEnviar = wordObj.en || wordObj.concepto_ingles || "";

              // Paso intermedio de validación: Read-Through Cache
              if (!forceRegenerate && db) {
                try {
                  const globalCacheRef = doc(db, 'global_flashcards', safeId);
                  const globalCacheSnap = await getDoc(globalCacheRef);
                  if (globalCacheSnap.exists()) {
                    const cachedData = globalCacheSnap.data();
                    const cachedImage = cachedData.imageUrl || cachedData.imageBase64;
                    if (cachedImage) {
                      console.log("CACHE HIT (Read-Through Cache): Imagen encontrada en global_flashcards para", safeId);
                      const compressedImage = await compressImageBase64(cachedImage, 1024, 0.9);
                      
                      setCardImages(prev => {
                        const nextImages = { ...prev, [safeId]: compressedImage };
                        localforage.setItem('cardImages', nextImages).catch(e => console.warn(e));
                        return nextImages;
                      });
                      
                      setUnlockedCards(prev => ({ ...prev, [safeId]: { unlocked: true, regenerateCount: currentCount } }));
                      if (userDocRef) {
                        await setDoc(userDocRef, { unlocked: true, regenerateCount: currentCount }, { merge: true }).catch(e => console.warn(e));
                      }
                      return;
                    }
                  }
                } catch (cacheErr) {
                  console.warn("Advertencia en Read-Through Cache:", cacheErr);
                }
              }

              let dataUri = "";
              console.log("CACHE MISS o FORCE REGENERATE: Llamando a Cloud Function...");
              const generateCardImageFn = httpsCallable(functions, 'generateCardImage');
              const result = await generateCardImageFn({
                wordObj: wordObj,
                conceptoIngles: conceptoAEnviar,
                word: wordObj.de,
                category: activeChapter ? activeChapter.title : ''
              });
              dataUri = result.data?.imageUrl;

              if (!dataUri) throw new Error('No image data returned from FAL API');
              dataUri = await compressImageBase64(dataUri, 1024, 0.9);
              
              setCardImages(prev => {
                const nextImages = { ...prev, [safeId]: dataUri };
                localforage.setItem('cardImages', nextImages).catch(e => console.warn(e));
                return nextImages;
              });
              
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
            `;
            
            // Parse this code to AST statements
            const parsedStatements = parser.parse(`async function dummy() { ${newTryBodyCode} }`, {
              sourceType: 'module',
              plugins: ['jsx']
            }).program.body[0].body.body;
            
            tryStmt.block.body = parsedStatements;
            modified = true;
          }
        }
      }
    }
  }
});

if (!modified) {
  console.error('Error: generateCardImage could not be modified!');
  process.exit(1);
}

console.log('Generating output code...');
const output = generator(ast, {
  jsescOption: { minimal: true }
});

fs.writeFileSync(destFile, output.code, 'utf8');
console.log(`Successfully wrote to ${destFile}!`);
