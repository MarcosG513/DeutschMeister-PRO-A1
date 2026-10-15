// scripts/pregenerate_all_audios.mjs
// Script Maestro de Pre-generación y Auditoría Acústica FinOps (DeutschMeister PRO A1 v2.0)
// Modelo: gemini-3.8-flash-tts | Voz oficial: Charon | Bucket: deutschmeister-audio-vault
// 100% Google AI Studio Direct (0% Fal.ai) | Marcapasos: 6,500 ms (9.2 RPM) | Concurrencia: 1

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ── 1. HELPERS CANÓNICOS (IDÉNTICOS A BACKEND Y FRONTEND) ──
export const getSafeAudioId = (text) => {
  if (!text || typeof text !== "string") return "audio_unknown";
  const normalized = text
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, " ")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^_+|_+$/g, "")
    .substring(0, 120);
  return "audio_" + (normalized || "audio");
};

export const splitGermanTitle = (text) => {
  if (!text || typeof text !== 'string') return { main: '', sub: null, code: null };
  if (text.includes('\n')) {
    const [main, ...rest] = text.split('\n');
    const sub = rest.join('\n').trim() || null;
    return { main: main.trim(), sub, code: sub };
  }
  const match = text.match(/^(.*?)\s*(\([^)]+\))$/);
  if (match && match[1].trim() && match[2].trim()) {
    const sub = match[2].trim();
    return { main: match[1].trim(), sub, code: sub };
  }
  return { main: text.trim(), sub: null, code: null };
};

// ── 2. PRIORIDAD PEDAGÓGICA (FINOPS & DaF IMPACT) ──
export function getItemPriority(item) {
  // Prioridad 1: type === "quiz" (33 audios de GoetheHorenExam, GoetheSprechenExam, EmailSimulator)
  if (item.type === 'quiz') return 1;
  // Prioridad 2: type === "dialogue" (7 diálogos interactivos VoiceExaminer)
  if (item.type === 'dialogue') return 2;
  // Prioridad 3: Expresiones de Kapitel 22: Redemittel & Alltagskommunikation
  if (item.source && (item.source === 'redemittel' || item.source === 'redemittel_sentence' || item.source.includes('redemittel') || item.source.includes('kapitel_22'))) return 3;
  // Prioridad 3.5: Capítulos técnicos y laborales (Fahrschuldeutsch 13, Schule & Beruf 16, IT 17, Elektrotechnik & Solar 18, Señales & Werkzeuge 19-21)
  if (item.isTechnical || (item.source && (
    item.source.includes('technical') ||
    item.source.includes('chapter_13') ||
    item.source.includes('chapter_16') ||
    item.source.includes('chapter_17') ||
    item.source.includes('chapter_18') ||
    item.source.includes('chapter_19') ||
    item.source.includes('chapter_20') ||
    item.source.includes('chapter_21')
  ))) {
    return 3.5;
  }
  // Prioridad 4: type === "vocab" restantes
  if (item.type === 'vocab') return 4;
  // Prioridad 5: type === "sentence" restantes
  if (item.type === 'sentence') return 5;
  return 6;
}

// ── 3. EXTRACCIÓN Y COLA MAESTRA DEDUPLICADA ──
const audioMap = new Map();

function enqueueAudio(rawText, type, source = "", meta = {}) {
  if (!rawText || typeof rawText !== "string") return;
  const clean = rawText.replace(/[*_#`~]/g, "").replace(/\s+/g, " ").trim();
  if (!clean || clean.length < 2) return;
  const audioId = getSafeAudioId(clean);
  if (!audioMap.has(audioId)) {
    audioMap.set(audioId, { text: clean, type, audioId, source, ...meta });
  } else {
    // Si ya existe pero el nuevo tiene mayor especificidad técnica, actualizar
    const existing = audioMap.get(audioId);
    if (meta.isTechnical || (source && source.includes("technical"))) {
      existing.isTechnical = true;
      if (meta.chapterId) existing.chapterId = meta.chapterId;
      existing.source = source;
    }
  }
}

async function extractAllAudios() {
  console.log("🔍 [1/3] Extrayendo catálogo exhaustivo de audios fijos de la aplicación...");

  // A. vocabulario_completo.json
  const vocabJsonPath = path.join(ROOT, 'vocabulario_completo.json');
  if (fs.existsSync(vocabJsonPath)) {
    const vocab = JSON.parse(fs.readFileSync(vocabJsonPath, 'utf8'));
    vocab.forEach(w => {
      if (w.word) {
        enqueueAudio(w.audioDe || splitGermanTitle(w.word).main, 'vocab', 'vocabulario_completo');
      }
      if (w.plural && w.plural !== '-' && w.plural.trim() !== '') {
        enqueueAudio(w.plural, 'vocab', 'vocabulario_completo_plural');
      }
      if (w.exampleSentenceDe && w.exampleSentenceDe.trim() !== '') {
        enqueueAudio(w.exampleSentenceDe, 'sentence', 'vocabulario_completo_sentence');
      }
    });
    console.log(`  ✓ vocabulario_completo.json procesado (${vocab.length} entradas base).`);
  }

  // B. redemittelBegegnungen.js
  const redemittelPath = path.join(ROOT, 'src/data/redemittelBegegnungen.js');
  if (fs.existsSync(redemittelPath)) {
    const fileRaw = fs.readFileSync(redemittelPath, 'utf8');
    const jsonStart = fileRaw.indexOf('export const redemittelChapter =');
    const codeToEval = fileRaw.slice(jsonStart).replace('export const redemittelChapter =', 'export default');
    const tempPath = path.join(__dirname, 'temp_redemittel_runner.mjs');
    fs.writeFileSync(tempPath, codeToEval, 'utf8');
    const { default: redemittel } = await import('./temp_redemittel_runner.mjs');
    try { fs.unlinkSync(tempPath); } catch (_) {}

    redemittel.words.forEach(w => {
      enqueueAudio(w.audioDe || splitGermanTitle(w.de).main, 'vocab', 'redemittel');
      if (w.exampleSentenceDe) {
        enqueueAudio(w.exampleSentenceDe, 'sentence', 'redemittel_sentence');
      }
    });
    console.log(`  ✓ redemittelBegegnungen.js procesado (${redemittel.words.length} expresiones).`);
  }

  // C. Escaneo estructurado por capítulos de chapters.jsx
  const chaptersPath = path.join(ROOT, 'src/data/chapters.jsx');
  if (fs.existsSync(chaptersPath)) {
    const chaptersContent = fs.readFileSync(chaptersPath, 'utf8');
    const chRegex = /id:\s*(\d+),\s*title:\s*"([^"]+)"/g;
    const chaptersMeta = [];
    let cm;
    while ((cm = chRegex.exec(chaptersContent)) !== null) {
      chaptersMeta.push({
        id: parseInt(cm[1], 10),
        title: cm[2],
        startIndex: cm.index
      });
    }

    let countChapters = 0;
    const TECHNICAL_CHAPTER_IDS = new Set([13, 16, 17, 18, 19, 20, 21]);

    for (let i = 0; i < chaptersMeta.length; i++) {
      const ch = chaptersMeta[i];
      const nextStart = chaptersMeta[i + 1] ? chaptersMeta[i + 1].startIndex : chaptersContent.length;
      const chapterSlice = chaptersContent.substring(ch.startIndex, nextStart);
      const isTechnical = TECHNICAL_CHAPTER_IDS.has(ch.id) ||
        /solar|elektro|fahrschul|beruf|digitale|it|werkzeug|handwerk|montage|verkehrszeichen|markierung|schilder/i.test(ch.title);

      const wordRegex = /\{\s*de:\s*"([^"]+)"(?:[\s\S]*?plural:\s*"([^"]*)")?(?:[\s\S]*?exampleSentenceDe:\s*"([^"]*)")?/g;
      let wm;
      while ((wm = wordRegex.exec(chapterSlice)) !== null) {
        countChapters++;
        const chSource = isTechnical ? `chapter_${ch.id}_technical` : `chapter_${ch.id}`;
        enqueueAudio(splitGermanTitle(wm[1]).main, 'vocab', chSource, { chapterId: ch.id, isTechnical });
        if (wm[2] && wm[2] !== '-' && wm[2].trim() !== '') {
          enqueueAudio(wm[2], 'vocab', `${chSource}_plural`, { chapterId: ch.id, isTechnical });
        }
        if (wm[3] && wm[3].trim() !== '') {
          enqueueAudio(wm[3], 'sentence', `${chSource}_sentence`, { chapterId: ch.id, isTechnical });
        }
      }
    }
    console.log(`  ✓ src/data/chapters.jsx escaneado (${countChapters} términos encontrados en ${chaptersMeta.length} capítulos).`);
  }

  // D. Goethe Horen Exam (HOREN_TEILS)
  const horenPath = path.join(ROOT, 'src/components/GoetheHorenExam.jsx');
  if (fs.existsSync(horenPath)) {
    const horenContent = fs.readFileSync(horenPath, 'utf8');
    const audioTextRegex = /audioText:\s*"([^"]+)"/g;
    let am;
    let horenCount = 0;
    while ((am = audioTextRegex.exec(horenContent)) !== null) {
      enqueueAudio(am[1], 'quiz', 'goethe_horen');
      horenCount++;
    }
    console.log(`  ✓ GoetheHorenExam.jsx procesado (${horenCount} audios de examen Hören).`);
  }

  // E. Goethe Sprechen Exam (SPRECHEN_TEILS)
  const sprechenPath = path.join(ROOT, 'src/components/GoetheSprechenExam.jsx');
  if (fs.existsSync(sprechenPath)) {
    const sprechenContent = fs.readFileSync(sprechenPath, 'utf8');
    const fields = ['de', 'extraAudio', 'questionPrompt', 'answerPrompt', 'requestPrompt', 'responsePrompt'];
    let sprechenCount = 0;
    fields.forEach(field => {
      const reg = new RegExp(`${field}:\\s*"([^"]+)"`, 'g');
      let sm;
      while ((sm = reg.exec(sprechenContent)) !== null) {
        enqueueAudio(sm[1], 'quiz', `goethe_sprechen_${field}`);
        sprechenCount++;
      }
    });
    console.log(`  ✓ GoetheSprechenExam.jsx procesado (${sprechenCount} prompts y diálogos Sprechen).`);
  }

  // F. EmailSimulator.jsx
  const emailPath = path.join(ROOT, 'src/components/EmailSimulator.jsx');
  if (fs.existsSync(emailPath)) {
    const emailContent = fs.readFileSync(emailPath, 'utf8');
    const consignaRegex = /\{ de:\s*"([^"]+)"/g;
    let em;
    let emailCount = 0;
    while ((em = consignaRegex.exec(emailContent)) !== null) {
      enqueueAudio(em[1], 'quiz', 'email_consignas');
      emailCount++;
    }
    console.log(`  ✓ EmailSimulator.jsx procesado (${emailCount} consignas de redacción).`);
  }

  // G. Ejercicios interactivos del Plan de Estudio (12 capítulos)
  const interactiveItems = [
    // DraggableSentenceBuilder
    { text: "Heute wohne ich in Madrid", type: "sentence" },
    { text: "Am Morgen trinken wir einen Kaffee", type: "sentence" },
    { text: "Jetzt spreche ich Deutsch", type: "sentence" },
    { text: "Ich lerne Deutsch und ich verstehe alles", type: "sentence" },
    { text: "Er ist müde deshalb geht er ins Bett", type: "sentence" },
    { text: "Ich komme gerne aber ich habe keine Zeit", type: "sentence" },

    // AccusativeShield (default + study plan possessives/pronouns)
    { text: "der Apfel", type: "vocab" },
    { text: "den Apfel", type: "vocab" },
    { text: "die Tomate", type: "vocab" },
    { text: "das Brot", type: "vocab" },
    { text: "der Käse", type: "vocab" },
    { text: "den Käse", type: "vocab" },
    { text: "die Milch", type: "vocab" },
    { text: "mein Vater", type: "vocab" },
    { text: "meine Mutter", type: "vocab" },
    { text: "mein Kind", type: "vocab" },
    { text: "meine Kinder", type: "vocab" },
    { text: "den Mann", type: "vocab" },
    { text: "ihn den Mann", type: "vocab" },
    { text: "ihn", type: "vocab" },
    { text: "einen Kaffee", type: "vocab" },

    // DativeMatrixClicker
    { text: "dem Mann", type: "vocab" },
    { text: "der Frau", type: "vocab" },
    { text: "dem Kind", type: "vocab" },
    { text: "den Kindern", type: "vocab" },

    // PincerSwitch
    { text: "Ich stehe um 7 Uhr auf", type: "sentence" },
    { text: "Er kauft im Supermarkt ein", type: "sentence" },
    { text: "Wir sehen am Abend fern", type: "sentence" },
    { text: "Ich muss heute arbeiten", type: "sentence" },
    { text: "Wir können gut Deutsch sprechen", type: "sentence" },
    { text: "Du sollst im Bett bleiben", type: "sentence" },

    // LocativeMapSimulator
    { text: "Das Handy liegt auf dem Tisch.", type: "sentence" },
    { text: "Ich lege das Handy auf den Tisch.", type: "sentence" },
    { text: "Wir gehen ins Kino.", type: "sentence" },
    { text: "Wir sind im Kino.", type: "sentence" },

    // MechanicalTimeline
    { text: "Ich kaufe eine Pizza", type: "sentence" },
    { text: "Ich habe eine Pizza gekauft", type: "sentence" },

    // LiveEvaluator
    { text: "Ich mag alten Käse.", type: "sentence" },
    { text: "Gutes Brot ist teuer.", type: "sentence" },
    { text: "Sie hilft mir mit großer Freude.", type: "sentence" },

    // VoiceExaminer
    { text: "Sprechen Sie bitte langsam!", type: "dialogue" },
    { text: "Kommen Sie bitte herein!", type: "dialogue" },
    { text: "Nehmen Sie bitte Platz!", type: "dialogue" },
    { text: "Könnten Sie das bitte wiederholen?", type: "dialogue" },
    { text: "Können wir den Termin verschieben?", type: "dialogue" },
    { text: "Würden Sie mir bitte helfen?", type: "dialogue" },
    { text: "Ich hätte gern einen Kaffee, bitte.", type: "dialogue" },

    // TimeClockSimulator
    { text: "14:30 Uhr", type: "vocab" },
    { text: "halb drei", type: "vocab" },
    { text: "08:00 Uhr", type: "vocab" },
    { text: "acht Uhr Punkt", type: "vocab" },
    { text: "09:15 Uhr", type: "vocab" },
    { text: "Viertel nach neun", type: "vocab" },
    { text: "10:45 Uhr", type: "vocab" },
    { text: "Viertel vor elf", type: "vocab" },
    { text: "12:30 Uhr", type: "vocab" },
    { text: "halb eins", type: "vocab" }
  ];

  interactiveItems.forEach(item => {
    enqueueAudio(item.text, item.type, 'interactive_components');
  });
  console.log(`  ✓ Componentes interactivos procesados (${interactiveItems.length} expresiones).`);
}

// ── 3. INFERENCIA TTS (100% GOOGLE AI STUDIO DIRECT) ──
async function synthesizeWithGoogleDirect(text, voice, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Charon"
          }
        }
      }
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google Direct API HTTP ${response.status}: ${errorBody}`);
  }

  const json = await response.json();
  const inlineData = json.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inlineData || !inlineData.data) {
    throw new Error("La API directa de Google no devolvió datos de audio válidos.");
  }

  return {
    buffer: Buffer.from(inlineData.data, "base64"),
    mimeType: inlineData.mimeType || "audio/wav",
    provider: "google-direct"
  };
}

// ── 4. POOL DE LLAVES GOOGLE DIRECT CON DESCARTE INTELIGENTE ──
function buildGoogleKeyPool() {
  const candidateKeys = [
    // Llaves Paid
    { id: "PAID", key: process.env.GEMINI_PAID_KEY, isPaid: true },
    { id: "PAID_2", key: process.env.GEMINI_PAID_KEY_2, isPaid: true },
    { id: "PAID_3", key: process.env.GEMINI_PAID_KEY_3, isPaid: true },
    { id: "PAID_4", key: process.env.GEMINI_PAID_KEY_4, isPaid: true },
    { id: "PAID_5", key: process.env.GEMINI_PAID_KEY_5, isPaid: true },
    // Llaves Free
    { id: "FREE_1", key: process.env.GEMINI_FREE_KEY_1 || process.env.GEMINI_FREE_KEY, isPaid: false },
    { id: "FREE_2", key: process.env.GEMINI_FREE_KEY_2, isPaid: false },
    { id: "FREE_3", key: process.env.GEMINI_FREE_KEY_3, isPaid: false },
    { id: "FREE_4", key: process.env.GEMINI_FREE_KEY_4, isPaid: false },
    { id: "FREE_5", key: process.env.GEMINI_FREE_KEY_5, isPaid: false },
    // Respaldo genérico
    { id: "GENERIC", key: process.env.GEMINI_API_KEY, isPaid: false }
  ];

  const pool = [];
  const seenKeys = new Set();

  for (const item of candidateKeys) {
    if (item.key && typeof item.key === 'string') {
      const trimmed = item.key.trim();
      if (trimmed.length > 10 && !seenKeys.has(trimmed)) {
        seenKeys.add(trimmed);
        pool.push({
          id: item.id,
          key: trimmed,
          isPaid: item.isPaid,
          lastUsedAt: 0,
          exhausted: false,
          exhaustedReason: null
        });
      }
    }
  }

  // Ordenar llaves: PAID primero, luego FREE_1..5
  pool.sort((a, b) => (b.isPaid ? 1 : 0) - (a.isPaid ? 1 : 0));
  return pool;
}

function parseRetryDelay(errorBody) {
  if (!errorBody || typeof errorBody !== 'string') return null;
  const jsonMatch = errorBody.match(/retryDelay"?\s*:\s*"(\d+(?:\.\d+)?)s"/i);
  if (jsonMatch) return Math.ceil(parseFloat(jsonMatch[1]));

  const textMatch = errorBody.match(/Please retry in (\d+(?:\.\d+)?)s/i);
  if (textMatch) return Math.ceil(parseFloat(textMatch[1]));

  const minSecMatch = errorBody.match(/(\d+)m(\d+)s/i);
  if (minSecMatch) return parseInt(minSecMatch[1], 10) * 60 + parseInt(minSecMatch[2], 10);

  return null;
}

// ── 5. CONTROLADOR PRINCIPAL ──
async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const limitIndex = process.argv.indexOf('--limit');
  const limit = limitIndex !== -1 && process.argv[limitIndex + 1] ? parseInt(process.argv[limitIndex + 1], 10) : null;

  console.log("═════════════════════════════════════════════════════════════════════");
  console.log("🎙️  DEUTSCHMEISTER PRO A1 — PRE-GENERACIÓN DE AUDIOS (CHARON TTS)   ");
  console.log(`   Modo: ${isDryRun ? "🧪 SIMULACIÓN (--dry-run, $0 Cost)" : "⚡ EJECUCIÓN 100% GOOGLE DIRECT"}`);
  console.log(`   Concurrencia: CONCURRENCY = 1 | Marcapasos: 6,500 ms (9.2 RPM por llave)`);
  if (limit) console.log(`   Límite solicitado: primeras ${limit} expresiones.`);
  console.log("═════════════════════════════════════════════════════════════════════\n");

  // 1. Extraer audios
  await extractAllAudios();

  const totalUnique = audioMap.size;
  console.log(`\n📊 Total de audios únicos extraídos: ${totalUnique}`);

  // 2. Conectar a Firebase Admin
  console.log("\n📡 [2/3] Verificando en lote contra Firestore (global_audio_pronunciations)...");
  const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
  if (!fs.existsSync(serviceAccountPath)) {
    console.error("❌ No se encontró scripts/serviceAccountKey.json");
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'deutschmeister-audio-vault'
  });

  const db = admin.firestore();
  const bucket = admin.storage().bucket('deutschmeister-audio-vault');

  // Descarga de todos los documentos existentes
  const snapshot = await db.collection("global_audio_pronunciations").get();
  const existingIds = new Set();
  const existingDocsMap = new Map();

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data && data.audioUrl && !data.audioUrl.includes("gcf-v2-sources") && !data.audioUrl.includes("gcf-v2-uploads")) {
      existingIds.add(doc.id);
      if (doc.id.endsWith('_')) {
        existingIds.add(doc.id.slice(0, -1));
      }
      existingDocsMap.set(doc.id, data);
    }
  });

  // Migración de Claves Heredadas ($0 IA)
  let migratedLegacyCount = 0;
  for (const [docId, data] of existingDocsMap.entries()) {
    let targetCanonicalId = null;
    if (data.text) {
      targetCanonicalId = getSafeAudioId(data.text);
    } else if (docId.endsWith('_')) {
      targetCanonicalId = docId.slice(0, -1);
    }

    if (targetCanonicalId && docId !== targetCanonicalId && !existingDocsMap.has(targetCanonicalId)) {
      if (!isDryRun) {
        await db.collection("global_audio_pronunciations").doc(targetCanonicalId).set({
          ...data,
          audioId: targetCanonicalId,
          migratedFrom: docId,
          migratedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
      existingIds.add(targetCanonicalId);
      existingDocsMap.set(targetCanonicalId, data);
      migratedLegacyCount++;
    }
  }

  if (migratedLegacyCount > 0) {
    console.log(`  ✓ Migrados ${migratedLegacyCount} registros con IDs heredados a formato canónico ($0 IA).`);
  }
  console.log(`  ✓ Encontrados ${existingIds.size} audios válidos ya existentes en Firestore CDN.`);

  // 3. Filtrar pendientes y calcular métricas
  const missingItems = [];
  const typeStats = {
    vocab: { total: 0, existing: 0, pending: 0 },
    sentence: { total: 0, existing: 0, pending: 0 },
    quiz: { total: 0, existing: 0, pending: 0 },
    dialogue: { total: 0, existing: 0, pending: 0 }
  };

  audioMap.forEach(item => {
    const t = typeStats[item.type] || (typeStats[item.type] = { total: 0, existing: 0, pending: 0 });
    t.total++;
    if (existingIds.has(item.audioId)) {
      t.existing++;
    } else {
      t.pending++;
      missingItems.push(item);
    }
  });

  // Ordenar cola por prioridad pedagógica estricta (1 -> 5)
  missingItems.sort((a, b) => {
    const pA = getItemPriority(a);
    const pB = getItemPriority(b);
    if (pA !== pB) return pA - pB;
    return a.audioId.localeCompare(b.audioId);
  });

  const totalExisting = totalUnique - missingItems.length;
  const totalPending = missingItems.length;
  const coveragePercent = ((totalExisting / totalUnique) * 100).toFixed(1);

  // 4. Imprimir Tabla Resumen
  console.log("\n┌────────────────────────┬─────────────┬─────────────┬─────────────┬────────────┐");
  console.log("│ Categoría / Tipo       │ Extraídos   │ Existentes  │ Faltantes   │ Cobertura  │");
  console.log("├────────────────────────┼─────────────┼─────────────┼─────────────┼────────────┤");
  for (const [type, stat] of Object.entries(typeStats)) {
    const cov = stat.total > 0 ? ((stat.existing / stat.total) * 100).toFixed(1) + "%" : "100%";
    console.log(
      `│ ${type.padEnd(22)} │ ${String(stat.total).padStart(11)} │ ${String(stat.existing).padStart(11)} │ ${String(stat.pending).padStart(11)} │ ${cov.padStart(10)} │`
    );
  }
  console.log("├────────────────────────┼─────────────┼─────────────┼─────────────┼────────────┤");
  console.log(
    `│ TOTAL GENERAL          │ ${String(totalUnique).padStart(11)} │ ${String(totalExisting).padStart(11)} │ ${String(totalPending).padStart(11)} │ ${(coveragePercent + "%").padStart(10)} │`
  );
  console.log("└────────────────────────┴─────────────┴─────────────┴─────────────┴────────────┘");

  // Desglose por prioridad pedagógica
  const priorityBreakdown = {
    1: { label: "Prioridad 1: Exámenes Goethe (Hören/Sprechen quiz)", count: 0, items: [] },
    2: { label: "Prioridad 2: Diálogos interactivos (dialogue)", count: 0, items: [] },
    3: { label: "Prioridad 3: Kapitel 22: Redemittel & Alltagskommunikation", count: 0, items: [] },
    3.5: { label: "Prioridad 3.5: Capítulos Técnicos & Laborales (13, 16–21)", count: 0, items: [] },
    4: { label: "Prioridad 4: Vocabulario general restante (vocab)", count: 0, items: [] },
    5: { label: "Prioridad 5: Oraciones de ejemplo restantes (sentence)", count: 0, items: [] }
  };

  missingItems.forEach(item => {
    const p = getItemPriority(item);
    if (priorityBreakdown[p]) {
      priorityBreakdown[p].count++;
      if (priorityBreakdown[p].items.length < 2) {
        priorityBreakdown[p].items.push(item.text);
      }
    }
  });

  console.log("\n🎯 Orden de Prioridad Pedagógica en la Cola de Pendientes:");
  const priorityOrder = [1, 2, 3, 3.5, 4, 5];
  for (const p of priorityOrder) {
    const stat = priorityBreakdown[p];
    if (!stat) continue;
    const preview = stat.items.length > 0 ? ` (Ej: "${stat.items[0].substring(0, 32)}...")` : " (Completado al 100%)";
    console.log(`   ${stat.label.padEnd(58)} : ${String(stat.count).padStart(5)} pendientes${preview}`);
  }

  const keyPool = buildGoogleKeyPool();
  console.log(`\n🔑 Pool de llaves Google Direct inicializado (${keyPool.length} llaves únicas):`);
  keyPool.forEach(k => console.log(`   - [${k.id}] (${k.isPaid ? 'Prioritaria PAID' : 'Respaldo FREE'})`));

  if (keyPool.length === 0) {
    console.error("❌ No se encontraron llaves de Gemini en .env");
    process.exit(1);
  }

  if (isDryRun) {
    console.log("\n🧪 SIMULACIÓN FINALIZADA CON ÉXITO:");
    console.log(`   - Audios únicos totales identificados: ${totalUnique}`);
    console.log(`   - Audios ya en caché en Firestore CDN: ${totalExisting} (${coveragePercent}%)`);
    console.log(`   - Audios pendientes por generar:      ${totalPending}`);
    if (missingItems.length > 0) {
      console.log(`\n📋 Próximos 5 audios que se sintetizarán primero en la reanudación:`);
      missingItems.slice(0, 5).forEach((item, idx) => {
        const p = getItemPriority(item);
        console.log(`   ${idx + 1}. [P${p} | ${item.type}] "${item.text.substring(0, 45)}" (ID: ${item.audioId})`);
      });
    }
    console.log(`   - Invocaciones / consumo API en dry-run: 0 llamadas ($0.00 spend).`);
    console.log("\n💡 Para comenzar la generación real en lote, ejecuta sin el flag --dry-run.");
    process.exit(0);
  }

  // 5. MODO REAL: GENERACIÓN Y SUBIDA 100% GOOGLE DIRECT
  const itemsToProcess = limit ? missingItems.slice(0, limit) : missingItems;
  console.log(`\n⚡ [3/3] Iniciando generación de ${itemsToProcess.length} audios pendientes (CONCURRENCY = 1 | 9.2 RPM)...`);

  const PACEMAKER_MS = 6500; // 6.5s = 9.2 RPM (estrictamente menor a 10 RPM)
  let generatedCount = 0;
  let failedCount = 0;
  let roundRobinIndex = 0;

  for (let i = 0; i < itemsToProcess.length; i++) {
    const item = itemsToProcess[i];
    let audioResult = null;
    let usedKeyId = null;

    while (!audioResult) {
      const activeKeys = keyPool.filter(k => !k.exhausted);
      if (activeKeys.length === 0) {
        break; // Detención limpia si todas las llaves agotaron su cuota
      }

      // Rotación Round-Robin entre las llaves activas
      roundRobinIndex = roundRobinIndex % activeKeys.length;
      const keyObj = activeKeys[roundRobinIndex];

      // Marcapasos por llave individual: garantizar mínimo 6,500 ms entre peticiones a la misma llave
      const elapsed = Date.now() - keyObj.lastUsedAt;
      if (elapsed < PACEMAKER_MS) {
        const waitMs = PACEMAKER_MS - elapsed;
        await new Promise(r => setTimeout(r, waitMs));
      }

      try {
        keyObj.lastUsedAt = Date.now();
        audioResult = await synthesizeWithGoogleDirect(item.text, "Charon", keyObj.key);
        usedKeyId = keyObj.id;
        // Avanzar el puntero Round-Robin para el próximo audio
        roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
      } catch (err) {
        const errMsg = err.message || "";

        if (errMsg.includes("PerDay") || errMsg.includes("GenerateRequestsPerDay")) {
          keyObj.exhausted = true;
          keyObj.exhaustedReason = "PerDay";
          console.warn(`    ⚠️ [Key: ${keyObj.id}] Cuota diaria agotada (PerDay). Descartando llave del pool activo.`);
          continue; // Intentar inmediatamente con la siguiente llave activa
        }

        if (errMsg.includes("429")) {
          const delaySec = parseRetryDelay(errMsg) || 62;
          const waitSec = Math.max(delaySec + 2, 62);
          console.warn(`    ⚠️ [Key: ${keyObj.id}] HTTP 429 Rate Limit (10 RPM). Esperando ventana de ${waitSec}s para restablecer cuota a cero...`);
          await new Promise(r => setTimeout(r, waitSec * 1000));
          keyObj.lastUsedAt = Date.now();
          continue;
        }

        if (errMsg.includes("403") || errMsg.includes("400")) {
          keyObj.exhausted = true;
          keyObj.exhaustedReason = `HTTP_${errMsg.match(/40[03]/)?.[0] || 'ERR'}`;
          console.warn(`    ⚠️ [Key: ${keyObj.id}] Error ${keyObj.exhaustedReason}. Descartando llave del pool.`);
          continue;
        }

        console.error(`    ❌ [Key: ${keyObj.id}] Error en generación (${item.audioId}): ${errMsg}`);
        await new Promise(r => setTimeout(r, 4000));
        roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
      }
    }

    if (!audioResult) {
      const activeKeys = keyPool.filter(k => !k.exhausted);
      if (activeKeys.length === 0) {
        console.warn(`\n🛑 Deteniendo procesamiento: todas las llaves de Google han alcanzado su límite de cuota diaria (PerDay).`);
        break;
      }
      failedCount++;
      continue;
    }

    // Subir a Storage y guardar en Firestore
    try {
      const ext = audioResult.mimeType.includes("mp3") ? "mp3" : "wav";
      const filePath = `pronunciations/${item.type}/${item.audioId}.${ext}`;
      const file = bucket.file(filePath);

      await file.save(audioResult.buffer, {
        metadata: {
          contentType: audioResult.mimeType,
          cacheControl: "public, max-age=31536000",
          metadata: {
            text: item.text,
            voice: "Charon",
            type: item.type,
            provider: audioResult.provider,
            keyUsed: usedKeyId,
            createdAt: new Date().toISOString()
          }
        }
      });

      try { await file.makePublic(); } catch (_) {}

      const permanentAudioUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

      await db.collection("global_audio_pronunciations").doc(item.audioId).set({
        audioId: item.audioId,
        text: item.text,
        audioUrl: permanentAudioUrl,
        storagePath: filePath,
        voice: "Charon",
        type: item.type,
        provider: audioResult.provider,
        keyUsed: usedKeyId,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      generatedCount++;

      const currentTotalInFirestore = totalExisting + generatedCount;
      if (generatedCount % 10 === 0 || i === itemsToProcess.length - 1) {
        console.log(`✅ [${generatedCount} / ${itemsToProcess.length}] Generado vía Google Direct (Key: ${usedKeyId}) | AudioId: ${item.audioId} | Total en Firestore: ${currentTotalInFirestore} / ${totalUnique}`);
      }
    } catch (saveErr) {
      console.error(`    ❌ [${item.audioId}] Error guardando en Storage/Firestore:`, saveErr.message);
      failedCount++;
    }
  }

  const finalTotalInFirestore = totalExisting + generatedCount;
  const finalCoverage = ((finalTotalInFirestore / totalUnique) * 100).toFixed(1);

  console.log("\n═════════════════════════════════════════════════════════════════════");
  console.log(`🎉 Resumen de Sesión:`);
  console.log(`   - Nuevos audios generados exitosamente: ${generatedCount}`);
  console.log(`   - Audios fallidos:                     ${failedCount}`);
  console.log(`   - Total actual en Firestore CDN:       ${finalTotalInFirestore} / ${totalUnique} (${finalCoverage}%)`);
  console.log("═════════════════════════════════════════════════════════════════════\n");
}

main().catch(err => {
  console.error("❌ Error no controlado:", err);
  process.exit(1);
});
