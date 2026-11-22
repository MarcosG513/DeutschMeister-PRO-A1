// scripts/pregenerate_goethe_images.mjs
// Pre-generación de ilustraciones Soft Matte Clay para los lotes Goethe B1 / DTZ
// Modelo: gemini-3.1-flash-lite-image | Bucket: deutschmeister-audio-vault | Colección: global_flashcards

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(ROOT, '.env'), quiet: true });
dotenv.config({ path: path.join(ROOT, 'functions', '.env'), quiet: true });

function loadSharp() {
  const require = createRequire(import.meta.url);
  const candidates = [
    'sharp',
    path.join(ROOT, 'functions', 'node_modules', 'sharp'),
  ];
  for (const modPath of candidates) {
    try {
      return require(modPath);
    } catch {
      // probar siguiente ruta
    }
  }
  throw new Error('No se pudo cargar `sharp`. Verifica `functions/node_modules/sharp`.');
}

const sharp = loadSharp();

const PAYLOAD_FILES = [
  'scripts/payloads/goethe_lote_1_A_G.json',
  'scripts/payloads/goethe_lote_2_H_R.json',
  'scripts/payloads/goethe_lote_3_S_Z.json',
];

const IMAGE_MODEL = 'gemini-3.1-flash-lite-image';
const STORAGE_BUCKET = process.env.STORAGE_BUCKET || 'deutschmeister-audio-vault';

/**
 * Hash URL-safe idéntico al frontend (`src/utils/helpers.js` y `src/App.jsx`).
 */
export const getSafeId = (str) =>
  btoa(encodeURIComponent(String(str ?? '').trim())).replace(/[/+=]/g, '_');

function getWordSafeId(wordDe) {
  return getSafeId(wordDe).substring(0, 150);
}

function parseCliArgs(argv) {
  const isDryRun = argv.includes('--dry-run');
  const includeAll = argv.includes('--all');
  let limit = null;
  let delayMs = 4500;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--limit=')) {
      const val = parseInt(arg.split('=')[1], 10);
      if (Number.isFinite(val) && val > 0) limit = val;
    } else if (arg === '--limit' && argv[i + 1]) {
      const val = parseInt(argv[++i], 10);
      if (Number.isFinite(val) && val > 0) limit = val;
    } else if (arg.startsWith('--delay=')) {
      const val = parseInt(arg.split('=')[1], 10);
      if (Number.isFinite(val) && val >= 0) delayMs = val;
    } else if (arg === '--delay' && argv[i + 1]) {
      const val = parseInt(argv[++i], 10);
      if (Number.isFinite(val) && val >= 0) delayMs = val;
    }
  }

  return { isDryRun, includeAll, limit, delayMs };
}

function isVerbEntry(wordObj) {
  const type = String(wordObj?.type || '').toLowerCase();
  const category = String(wordObj?.category || '').toLowerCase();
  const regimen = String(wordObj?.regimen || '').toLowerCase();
  const de = String(wordObj?.de || '');

  return (
    type.includes('verbo') ||
    type.includes('verb') ||
    type.includes('acción') ||
    type.includes('accion') ||
    category === 'aktionen' ||
    regimen.includes('separable') ||
    de.includes('|')
  );
}

function buildImagePrompt(wordObj) {
  const cleanGerman = String(wordObj.de || '').replace(/\|/g, '').trim();
  const cleanConcept = String(wordObj.en || wordObj.es || '')
    .replace(/[≠+].*$/g, '')
    .trim();

  if (isVerbEntry(wordObj)) {
    return [
      `A cute stylized 3D clay figurine with friendly proportions, sculpted from smooth soft matte clay.`,
      `The character is centered and dynamically depicting "${cleanConcept}" (${cleanGerman}).`,
      `Front isometric three-quarters angle, cohesive clay volume, warm pastel shading, bright studio lighting.`,
      `Subtle soft ambient contact shadow beneath feet on a pure seamless solid white background hex #FFFFFF.`,
      `Strictly purely visual: absolutely NO TEXT, NO LETTERS, NO WORDS.`,
    ].join(' ');
  }

  return [
    `A 3D isometric minimalist UI illustration depicting the concept of "${cleanConcept}" (${cleanGerman}).`,
    `Made of smooth matte soft clay, clean geometry, pastel smooth shading, bright studio lighting.`,
    `Subtle soft drop shadow resting on a pure seamless solid white background hex #FFFFFF.`,
    `Strictly purely visual: absolutely NO TEXT, NO LETTERS, NO WORDS.`,
  ].join(' ');
}

function buildKeyPool() {
  const candidates = [
    { id: 'PAID_1', key: process.env.GEMINI_PAID_KEY, isPaid: true },
    { id: 'PAID_2', key: process.env.GEMINI_PAID_KEY_2, isPaid: true },
  ];

  const pool = [];
  const seen = new Set();
  for (const cand of candidates) {
    if (!cand.key || typeof cand.key !== 'string') continue;
    const trimmed = cand.key.trim();
    if (trimmed.length > 10 && !seen.has(trimmed)) {
      seen.add(trimmed);
      pool.push({
        id: cand.id,
        key: trimmed,
        isPaid: cand.isPaid,
        lastUsedAt: 0,
        exhausted: false,
        exhaustedReason: null,
      });
    }
  }
  pool.sort((a, b) => (b.isPaid ? 1 : 0) - (a.isPaid ? 1 : 0));
  return pool;
}

function parseRetryDelaySec(errText) {
  const jsonMatch = String(errText || '').match(/retryDelay"?\s*:\s*"(\d+(?:\.\d+)?)s"/i);
  if (jsonMatch) return Math.ceil(parseFloat(jsonMatch[1]));
  const textMatch = String(errText || '').match(/Please retry in (\d+(?:\.\d+)?)s/i);
  if (textMatch) return Math.ceil(parseFloat(textMatch[1]));
  return null;
}

function isQuotaOrBillingExhaustion(errMsg) {
  const lower = String(errMsg || '').toLowerCase();
  return (
    lower.includes('perday') ||
    lower.includes('generaterequestsperday') ||
    lower.includes('generate_requests_per_model_per_day') ||
    lower.includes('generate_content_free_tier_requests') ||
    lower.includes('limit: 0') ||
    lower.includes('billing') ||
    lower.includes('billed') ||
    lower.includes('insufficient_quota') ||
    lower.includes('failed_precondition') ||
    lower.includes('api_key_invalid') ||
    lower.includes('http 402') ||
    lower.includes('http 403')
  );
}

async function generateCompressedImage(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '1:1' },
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData && p.inlineData.data);
  if (!imagePart) {
    throw new Error(`${IMAGE_MODEL} no devolvió bytes de imagen inlineData.`);
  }

  const rawBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
  const compressed = await sharp(rawBuffer)
    .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();

  return compressed;
}

function loadGoetheCandidates(includeAll) {
  const bySafeId = new Map();
  let totalRead = 0;

  for (const relPath of PAYLOAD_FILES) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      throw new Error(`Falta payload requerido: ${relPath}`);
    }
    const parsed = JSON.parse(fs.readFileSync(absPath, 'utf8'));
    for (const chap of parsed.chapters || []) {
      for (const wordObj of chap.words || []) {
        if (!wordObj?.de) continue;
        totalRead++;
        const hasEn = Boolean(wordObj.en && String(wordObj.en).trim().length > 0);
        if (!includeAll && !hasEn) continue;

        const safeId = getWordSafeId(wordObj.de);
        if (!bySafeId.has(safeId)) {
          bySafeId.set(safeId, {
            safeId,
            chapterId: chap.id,
            chapterTitle: chap.title,
            batchFile: relPath,
            wordObj,
          });
        }
      }
    }
  }

  return { totalRead, candidates: Array.from(bySafeId.values()) };
}

function resolveServiceAccountPath() {
  const candidates = [
    path.join(ROOT, 'scripts', 'serviceAccountKey.json'),
    path.join(ROOT, 'serviceAccountKey.json'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No se encontró serviceAccountKey.json en scripts/ ni en la raíz.');
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));

  console.log('═════════════════════════════════════════════════════════════════════');
  console.log(`🎨 DEUTSCHMEISTER PRO — PRE-GENERACIÓN DE ILUSTRACIONES (${IMAGE_MODEL})`);
  console.log(`   Modo: ${args.isDryRun ? '🧪 SIMULACIÓN (--dry-run, $0 Cost)' : '⚡ EJECUCIÓN REAL'}`);
  console.log(`   Alcance: ${args.includeAll ? 'Todas las entradas (--all)' : 'Solo tarjetas concretas con prompt en'} | Delay: ${args.delayMs} ms`);
  if (args.limit) console.log(`   Límite: primeras ${args.limit} pendientes`);
  console.log('═════════════════════════════════════════════════════════════════════\n');

  const { totalRead, candidates } = loadGoetheCandidates(args.includeAll);
  console.log(`📚 Payloads leídos: ${totalRead} entradas totales | Candidatas seleccionadas: ${candidates.length}`);

  const serviceAccount = JSON.parse(fs.readFileSync(resolveServiceAccountPath(), 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: STORAGE_BUCKET,
  });

  const db = admin.firestore();
  const bucket = admin.storage().bucket(STORAGE_BUCKET);

  console.log('📡 Consultando colección global_flashcards en Firestore...');
  const snapshot = await db.collection('global_flashcards').get();
  const existingMediaIds = new Set();
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data && (data.imageUrl || data.videoUrl)) {
      existingMediaIds.add(doc.id);
    }
  });
  console.log(`  ✓ Documentos existentes con media en global_flashcards: ${existingMediaIds.size}`);

  const pending = [];
  let cachedCount = 0;
  for (const item of candidates) {
    if (existingMediaIds.has(item.safeId)) cachedCount++;
    else pending.push(item);
  }

  const queue = args.limit ? pending.slice(0, args.limit) : pending;
  const keyPool = buildKeyPool();

  console.log('\n┌───────────────────────────────┬────────────┐');
  console.log('│ Resumen Goethe B1 / DTZ       │ Cantidad   │');
  console.log('├───────────────────────────────┼────────────┤');
  console.log(`│ Entradas totales en lotes     │ ${String(totalRead).padStart(10)} │`);
  console.log(`│ Candidatas objetivo           │ ${String(candidates.length).padStart(10)} │`);
  console.log(`│ Ya cacheadas (skip $0)        │ ${String(cachedCount).padStart(10)} │`);
  console.log(`│ Pendientes por generar        │ ${String(pending.length).padStart(10)} │`);
  console.log(`│ A procesar en esta ejecución  │ ${String(queue.length).padStart(10)} │`);
  console.log('└───────────────────────────────┴────────────┘');

  console.log(`\n🔑 Pool de llaves (${keyPool.length} llaves únicas):`);
  keyPool.forEach((k) => console.log(`   - [${k.id}] (${k.isPaid ? 'PAID prioritaria' : 'FREE respaldo'})`));

  if (args.isDryRun || queue.length === 0) {
    if (queue.length > 0) {
      console.log('\n📋 Primeras 5 tarjetas pendientes en cola:');
      queue.slice(0, 5).forEach((q, idx) => {
        const styleTag = isVerbEntry(q.wordObj) ? 'Verb-Clay' : 'Obj-Iso';
        console.log(`   ${idx + 1}. [Kap ${q.chapterId} | ${styleTag}] ${q.wordObj.de} -> ${q.safeId}`);
      });
    }
    console.log('\n🧪 Simulación finalizada ($0 spend).');
    return;
  }

  if (keyPool.length === 0) {
    console.error('❌ No hay llaves GEMINI_* configuradas en .env ni en functions/.env.');
    process.exit(1);
  }

  let generatedCount = 0;
  let failedCount = 0;
  let roundRobinIndex = 0;
  const startedAt = Date.now();

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const prompt = buildImagePrompt(item.wordObj);
    let jpegBuffer = null;
    let usedKeyId = null;

    while (true) {
      const activeKeys = keyPool.filter((k) => !k.exhausted);
      if (activeKeys.length === 0) break;

      roundRobinIndex = roundRobinIndex % activeKeys.length;
      const keyObj = activeKeys[roundRobinIndex];

      const elapsedSinceUse = Date.now() - keyObj.lastUsedAt;
      if (keyObj.lastUsedAt > 0 && elapsedSinceUse < args.delayMs) {
        await new Promise((r) => setTimeout(r, args.delayMs - elapsedSinceUse));
      }

      try {
        keyObj.lastUsedAt = Date.now();
        jpegBuffer = await generateCompressedImage(prompt, keyObj.key);
        usedKeyId = keyObj.id;
        roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
        break;
      } catch (err) {
        const errMsg = err?.message || String(err);
        if (isQuotaOrBillingExhaustion(errMsg)) {
          keyObj.exhausted = true;
          keyObj.exhaustedReason = errMsg.slice(0, 120);
          console.warn(`  ⚠️ [Key: ${keyObj.id}] Cuota/billing agotado o bloqueado. Descartando del pool.`);
          continue;
        }
        if (errMsg.includes('429')) {
          const waitSec = Math.max(parseRetryDelaySec(errMsg) || 35, 35);
          console.warn(`  ⏳ [Key: ${keyObj.id}] 429 temporal. Esperando ${waitSec}s y rotando...`);
          roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
          if (activeKeys.length === 1) {
            await new Promise((r) => setTimeout(r, waitSec * 1000));
          } else {
            keyObj.lastUsedAt = Date.now() + waitSec * 1000;
          }
          continue;
        }
        console.error(`  ❌ [${item.wordObj.de}] Error generando imagen con ${keyObj.id}: ${errMsg.slice(0, 180)}`);
        roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
        break;
      }
    }

    if (!jpegBuffer) {
      if (keyPool.every((k) => k.exhausted)) {
        console.warn('\n🛑 Todas las llaves agotaron cuota o fueron descartadas. Deteniendo lote.');
        break;
      }
      failedCount++;
      continue;
    }

    try {
      const filePath = `flashcards/images/${item.safeId}_${Date.now()}.jpeg`;
      const file = bucket.file(filePath);
      await file.save(jpegBuffer, {
        metadata: {
          contentType: 'image/jpeg',
          cacheControl: 'public, max-age=31536000',
          metadata: {
            wordDe: item.wordObj.de,
            provider: IMAGE_MODEL,
            optimized: 'sharp-512x512-q80',
            createdAt: new Date().toISOString(),
          },
        },
      });
      try {
        await file.makePublic();
      } catch {
        // bucket uniforme o ACL previa
      }

      const permanentUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
      await db.collection('global_flashcards').doc(item.safeId).set(
        {
          mediaType: 'image',
          imageUrl: permanentUrl,
          wordDe: item.wordObj.de,
          provider: IMAGE_MODEL,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      generatedCount++;
      if (generatedCount % 10 === 0 || i === queue.length - 1) {
        const kb = (jpegBuffer.length / 1024).toFixed(1);
        console.log(
          `✅ [${generatedCount}/${queue.length}] ${item.wordObj.de} (${usedKeyId}, ${kb} KB) -> global_flashcards/${item.safeId}`
        );
      }
    } catch (saveErr) {
      console.error(`  ❌ [${item.safeId}] Error guardando en Storage/Firestore: ${saveErr.message}`);
      failedCount++;
    }
  }

  const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log('\n═════════════════════════════════════════════════════════════════════');
  console.log('🎉 RESUMEN FINAL — PREGENERACIÓN DE IMÁGENES GOETHE B1/DTZ');
  console.log(`   - Imágenes generadas y cacheadas : ${generatedCount}`);
  console.log(`   - Fallidas / no generadas        : ${failedCount}`);
  console.log(`   - Omitidas por caché previa      : ${cachedCount}`);
  console.log(`   - Cobertura sobre objetivo (${candidates.length}) : ${cachedCount + generatedCount} / ${candidates.length} (${(((cachedCount + generatedCount) / Math.max(1, candidates.length)) * 100).toFixed(1)}%)`);
  console.log(`   - Duración total                 : ${elapsedSec}s`);
  console.log('═════════════════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('❌ Error no controlado:', err);
  process.exit(1);
});
