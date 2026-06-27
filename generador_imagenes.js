import fs from 'fs';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getStorage as getAdminStorage } from 'firebase-admin/storage';
import { fal } from '@fal-ai/client';

dotenv.config();
process.env.FAL_KEY = process.env.VITE_FAL_KEY;

const PROGRESS_FILE = './progress.json';
const MAX_RETRIES = 3;
const DELAY_MS = 1000;
const APP_ID = "deutschmeister-pro";

let serviceAccount;
try {
  serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
} catch (error) {
  console.error("❌ ERROR: No se encontró el archivo 'serviceAccountKey.json'.");
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function loadProgress() {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  } catch {
    return { processedIds: [], lastIndex: 0 };
  }
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

const getSafeId = (str) => Buffer.from(encodeURIComponent(str)).toString('base64').replace(/[/+=]/g, '_');

// Extraer vocabulario desde App.jsx con todo el contexto
function extractVocabulary() {
  console.log("📖 Extrayendo vocabulario y contextos desde src/App.jsx...");
  const appCode = fs.readFileSync('src/App.jsx', 'utf8');
  const vocabulario = [];
  let idSet = new Set();
  
  const chapterRegex = /title:\s*"([^"]+)"[\s\S]*?words:\s*\[([\s\S]*?)\]/g;
  let matchChapter;
  while ((matchChapter = chapterRegex.exec(appCode)) !== null) {
    const chapterTitle = matchChapter[1];
    const wordsStr = matchChapter[2];
    
    // Regex para { de: "...", pron: "...", es: "...", type: "...", category: "..." }
    const wordRegex = /{[\s]*de:\s*"([^"]+)",[\s]*pron:\s*"([^"]*)",[\s]*es:\s*"([^"]*)",[\s]*type:\s*"([^"]*)",[\s]*category:\s*"([^"]*)"[\s]*}/g;
    let wordMatch;
    while ((wordMatch = wordRegex.exec(wordsStr)) !== null) {
      const de = wordMatch[1];
      const es = wordMatch[3];
      const type = wordMatch[4];
      const category = wordMatch[5];
      const safeId = getSafeId(de).substring(0, 150);
      
      if (!idSet.has(safeId)) {
        idSet.add(safeId);
        vocabulario.push({ id: safeId, de, es, type, category, context: chapterTitle });
      }
    }
  }
  return vocabulario;
}

function buildPrompt(item) {
  const context = item.context || "";
  let promptText = `A beautiful, highly detailed, and purely graphic educational illustration representing the concept of "${item.es}". Context: ${context}. The image must be a completely wordless scene containing ONLY objects, characters, or actions. ABSOLUTELY NO typography, NO letters, NO labels, NO text. Clean white background.`;
  
  if (item.type === "Letra") {
    promptText = `A beautiful, highly detailed educational illustration of a single large, bold letter "${item.es}". Include a beautiful object next to it whose name starts with this letter. Clean white background.`;
  } else if (item.type === "Número") {
    promptText = `A beautiful, highly detailed educational illustration of a single large, bold number "${item.es}". Include exactly ${item.es} beautiful objects next to it to represent the quantity. Clean white background.`;
  } else if (['Monate', 'Tage', 'Jahreszeiten'].includes(item.category)) {
    promptText = `A beautiful, highly detailed, and purely graphic miniature scene representing the time of year or concept of "${item.es}". Context: ${context}. The image must be a completely wordless scene containing ONLY objects, characters, or actions. ABSOLUTELY NO typography, NO letters, NO labels, NO calendars with text. Clean white background.`;
  }
  return promptText;
}

async function procesarPalabra(item, index, progress) {
  if (progress.processedIds.includes(item.id)) {
    console.log(`⏭️ Ya procesada en caché local: ${item.de} (${item.id})`);
    return;
  }

  const prompt = buildPrompt(item);
  console.log(`\n📸 Generando [FLUX.1]: ${item.de} (ID: ${item.id})`);

  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt: prompt,
      image_size: "square_hd",
      num_inference_steps: 4,
      sync_mode: true
    }
  });

  const imageUrlTemp = result.data?.images?.[0]?.url || result.images?.[0]?.url;
  if (!imageUrlTemp) {
     throw new Error("No se retornó la URL de la imagen de FAL.");
  }

  const res = await fetch(imageUrlTemp);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Data = buffer.toString('base64');
  const imageBase64 = `data:image/jpeg;base64,${base64Data}`;

  // Guardar en la colección global de artifacts para que el cliente la pueda leer
  const docRefArtifacts = db.collection('artifacts').doc(APP_ID).collection('public').doc('data').collection('flashcardImages').doc(item.id);
  await docRefArtifacts.set({
    imageBase64: imageBase64,
    word: item.de,
    es: item.es,
    regenerated: false,
    createdAt: FieldValue.serverTimestamp(),
    model: 'flux.1-schnell',
    imageSize: "1024x1024"
  }, { merge: true });

  // Guardar copia estricta en public_content
  const strictDocRef = db.collection('public_content').doc('data').collection('flashcardImages').doc(item.id);
  await strictDocRef.set({
    imageBase64: imageBase64,
    word: item.de,
    es: item.es,
    regenerated: false,
    createdAt: FieldValue.serverTimestamp(),
    model: 'flux.1-schnell',
    imageSize: "1024x1024"
  }, { merge: true });

  progress.processedIds.push(item.id);
  progress.lastIndex = index + 1;
  saveProgress(progress);

  console.log(`✅ Éxito: '${item.de}' guardada en Firestore y Storage.`);
}

async function main() {
  console.log('🚀 Iniciando Generador Batch Optimizado (FLUX.1 + fal.ai SDK)...');

  const vocabulario = extractVocabulary();
  const progress = loadProgress();
  
  console.log(`📚 Palabras totales a procesar: ${vocabulario.length} | 🔁 Reanudando desde índice: ${progress.lastIndex}`);

  for (let i = progress.lastIndex; i < vocabulario.length; i++) {
    let attempt = 0;
    while (true) {
      try {
        await procesarPalabra(vocabulario[i], i, progress);
        break; 
      } catch (error) {
        attempt++;
        console.error(`❌ Error en '${vocabulario[i].de}':`, error.message);

        if (attempt > MAX_RETRIES) {
          console.warn(`🛑 Omitiendo '${vocabulario[i].de}'. Avanzando...`);
          progress.lastIndex = i + 1;
          saveProgress(progress);
          break;
        }
        console.warn(`⏳ Reintentando... (Intento ${attempt}/${MAX_RETRIES})`);
        await sleep(2000);
      }
    }
    await sleep(DELAY_MS); 
  }
  console.log('\n🎉 Proceso masivo completado exitosamente.');
  process.exit(0);
}

main();
