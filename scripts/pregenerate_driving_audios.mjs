// scripts/pregenerate_driving_audios.mjs
// =============================================================================
// DEUTSCHMEISTER PRO A1 — GENERADOR MAESTRO DE AUDIOS PARA FAHRMODUS
// Módulo: Modo Conducción & Academia de Audio A1–B1
// Voz Neuronal Oficial: Charon | Inferencia: Google AI Studio Direct (100%)
// Pool: 6 API Keys (4 PAID Nivel 1 + 2 FREE Nivel 2) con Rotación Round-Robin
// Almacenamiento: Cloud Storage (deutschmeister-audio-vault) + Cloud Firestore (global_audio_pronunciations)
// =============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { drivingAcademyClasses } from '../src/data/drivingAcademyCurriculum.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ── 1. HELPERS CANÓNICOS (100% COMPATIBLES CON FRONTEND Y BACKEND) ──
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

// ── 2. POOL DE 6 API KEYS (GOOGLE AI STUDIO DIRECT) ──
function buildGoogleKeyPool() {
  const candidateKeys = [
    // 4 Llaves Facturables Nivel 1 (Prioritarias)
    { id: "PAID_1", key: process.env.GEMINI_PAID_KEY, isPaid: true },
    { id: "PAID_2", key: process.env.GEMINI_PAID_KEY_2, isPaid: true },
    { id: "PAID_3", key: process.env.GEMINI_PAID_KEY_3, isPaid: true },
    { id: "PAID_4", key: process.env.GEMINI_PAID_KEY_4, isPaid: true },
    // 2 Llaves Gratuitas Nivel 2 (Respaldo)
    { id: "FREE_1", key: process.env.GEMINI_FREE_KEY_1 || process.env.GEMINI_FREE_KEY, isPaid: false },
    { id: "FREE_2", key: process.env.GEMINI_FREE_KEY_2, isPaid: false }
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
          models: ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"],
          modelIndex: 0,
          lastUsedAt: 0,
          exhausted: false,
          exhaustedReason: null,
          successCount: 0
        });
      }
    }
  }

  // Ordenar: primero PAID (1 a 4), luego FREE (1 y 2)
  pool.sort((a, b) => (b.isPaid ? 1 : 0) - (a.isPaid ? 1 : 0));
  return pool;
}

// ── 3. SÍNTESIS CON GOOGLE DIRECT (VOZ NEURONAL CHARON) ──
async function synthesizeWithGoogleDirect(text, voice, apiKey, model = "gemini-3.8-flash-tts") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: voice || "Charon"
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
    throw new Error("La API de Google no devolvió datos de audio válidos.");
  }

  return {
    buffer: Buffer.from(inlineData.data, "base64"),
    mimeType: inlineData.mimeType || "audio/wav",
    provider: "google-direct",
    modelUsed: model
  };
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

// ── 4. EXTRACCIÓN Y COLA MAESTRA DEL MÓDULO DE CONDUCCIÓN ──
const audioMap = new Map();

function enqueueAudio(rawText, type, lang, source = "", meta = {}) {
  if (!rawText || typeof rawText !== "string") return;
  const clean = rawText.replace(/[*_#`~]/g, "").replace(/\s+/g, " ").trim();
  if (!clean || clean.length < 2) return;
  const audioId = getSafeAudioId(clean);

  if (!audioMap.has(audioId)) {
    audioMap.set(audioId, {
      audioId,
      text: clean,
      type,
      lang: lang || (clean.match(/[áéíóú¿¡ñ]/i) ? "es" : "de"),
      source,
      ...meta
    });
  }
}

function extractAllDrivingAudios() {
  console.log("🔍 [1/3] Extrayendo catálogo completo del nuevo módulo Modo Conducción (Fahrmodus)...");

  // A. Currículo de la Academia A1–B1 (12 Clases conversacionales)
  let academyClassesCount = 0;
  let academyAudiosCount = 0;

  if (Array.isArray(drivingAcademyClasses)) {
    drivingAcademyClasses.forEach((cls) => {
      academyClassesCount++;
      (cls.steps || []).forEach((step, sIdx) => {
        // 1. Bloques base (Chaining en español y alemán)
        if (step.blockPromptEs) {
          enqueueAudio(step.blockPromptEs, 'driving_prompt', 'es', `academy_${cls.id}_block_p_${sIdx}`, { classId: cls.id, level: cls.level });
          academyAudiosCount++;
        }
        if (step.blockTargetDe) {
          enqueueAudio(step.blockTargetDe, 'sentence', 'de', `academy_${cls.id}_block_t_${sIdx}`, { classId: cls.id, level: cls.level });
          academyAudiosCount++;
        }

        // 2. Prompts principales (Coach o Reto en español)
        if (step.promptEs) {
          const pType = step.stepType === 'coach' ? 'driving_coach' : 'driving_prompt';
          enqueueAudio(step.promptEs, pType, 'es', `academy_${cls.id}_prompt_${sIdx}`, { classId: cls.id, level: cls.level, stepType: step.stepType });
          academyAudiosCount++;
        }

        // 3. Oraciones objetivo (Modelo en alemán)
        if (step.targetDe) {
          enqueueAudio(step.targetDe, 'sentence', 'de', `academy_${cls.id}_target_${sIdx}`, { classId: cls.id, level: cls.level });
          academyAudiosCount++;
        }

        // 4. Micro-tips fonéticos y pedagógicos (Español)
        if (step.tipEs) {
          enqueueAudio(step.tipEs, 'driving_tip', 'es', `academy_${cls.id}_tip_${sIdx}`, { classId: cls.id, level: cls.level });
          academyAudiosCount++;
        }

        // 5. Preguntas del interlocutor en diálogos Ping-Pong (Alemán)
        if (step.questionDe) {
          enqueueAudio(step.questionDe, 'dialogue', 'de', `academy_${cls.id}_question_${sIdx}`, { classId: cls.id, level: cls.level });
          academyAudiosCount++;
        }
      });
    });
    console.log(`  ✓ Academia de Audio: ${academyClassesCount} clases procesadas (${academyAudiosCount} locuciones).`);
  }

  // B. Micro-tips estándar de Fahrmodus (drivingSpeechHelper.js)
  const standardMicroTips = [
    "Sustantivo masculino con artículo der.",
    "Sustantivo femenino con artículo die.",
    "Sustantivo neutro con artículo das."
  ];
  standardMicroTips.forEach((tip, idx) => {
    enqueueAudio(tip, 'driving_tip', 'es', `standard_microtip_${idx}`);
  });
  console.log(`  ✓ Micro-tips gramaticales estándar: ${standardMicroTips.length} expresiones agregadas.`);
}

// ── 5. PRIORIZACIÓN PEDAGÓGICA PARA FAHRMODUS ──
function getDrivingItemPriority(item) {
  // P1: Explicaciones magistrales de Coach (Contexto inicial de cada lección)
  if (item.type === 'driving_coach') return 1;
  // P2: Diálogos del interlocutor en Alemán (Ping-Pong interactivo)
  if (item.type === 'dialogue') return 2;
  // P3: Modelos de respuesta en Alemán (Oraciones y Bloques)
  if (item.lang === 'de') return 3;
  // P4: Micro-tips gramaticales en Español
  if (item.type === 'driving_tip') return 4;
  // P5: Retos y preguntas en Español
  return 5;
}

// ── 6. CONTROLADOR PRINCIPAL ──
async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const limitIndex = process.argv.indexOf('--limit');
  const limit = limitIndex !== -1 && process.argv[limitIndex + 1] ? parseInt(process.argv[limitIndex + 1], 10) : null;

  console.log("════════════════════════════════════════════════════════════════════════════════");
  console.log("🚗  DEUTSCHMEISTER PRO A1 — PRE-GENERACIÓN DE AUDIOS (MODO CONDUCCIÓN / CHARON) ");
  console.log(`   Modo: ${isDryRun ? "🧪 SIMULACIÓN (--dry-run, $0 Spend)" : "⚡ EJECUCIÓN MULTI-LLAVE (6 API KEYS)"}`);
  console.log("   Voz: Charon (Google AI Studio Direct) | Modelo: gemini-3.8-flash-tts");
  if (limit) console.log(`   Límite de ejecución: primeras ${limit} locuciones.`);
  console.log("════════════════════════════════════════════════════════════════════════════════\n");

  // 1. Extraer audios de Fahrmodus
  extractAllDrivingAudios();
  const totalUnique = audioMap.size;
  console.log(`📊 Total de audios únicos extraídos de Fahrmodus: ${totalUnique}\n`);

  // 2. Conectar a Firebase Admin
  console.log("📡 [2/3] Verificando caché global en Firestore (global_audio_pronunciations)...");
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

  // Lectura de documentos existentes en Firestore
  const snapshot = await db.collection("global_audio_pronunciations").get();
  const existingIds = new Set();

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data && data.audioUrl && !data.audioUrl.includes("gcf-v2-sources") && !data.audioUrl.includes("gcf-v2-uploads")) {
      existingIds.add(doc.id);
      if (doc.id.endsWith('_')) {
        existingIds.add(doc.id.slice(0, -1));
      }
    }
  });

  // 3. Filtrar pendientes y agrupar por categoría
  const missingItems = [];
  const typeStats = {
    driving_coach: { label: "Coaches Magistrales (ES)", total: 0, existing: 0, pending: 0 },
    driving_prompt: { label: "Retos y Bloques (ES)", total: 0, existing: 0, pending: 0 },
    driving_tip: { label: "Micro-Tips (ES)", total: 0, existing: 0, pending: 0 },
    sentence: { label: "Modelos Alemán (DE)", total: 0, existing: 0, pending: 0 },
    dialogue: { label: "Diálogos PingPong (DE)", total: 0, existing: 0, pending: 0 }
  };

  audioMap.forEach(item => {
    const t = typeStats[item.type] || (typeStats[item.type] = { label: item.type, total: 0, existing: 0, pending: 0 });
    t.total++;
    if (existingIds.has(item.audioId)) {
      t.existing++;
    } else {
      t.pending++;
      missingItems.push(item);
    }
  });

  // Ordenar cola por prioridad pedagógica
  missingItems.sort((a, b) => {
    const pA = getDrivingItemPriority(a);
    const pB = getDrivingItemPriority(b);
    if (pA !== pB) return pA - pB;
    return a.audioId.localeCompare(b.audioId);
  });

  const totalExisting = totalUnique - missingItems.length;
  const totalPending = missingItems.length;
  const coveragePercent = ((totalExisting / totalUnique) * 100).toFixed(1);

  // 4. Mostrar Tabla Resumen
  console.log("\n┌─────────────────────────────┬─────────────┬─────────────┬─────────────┬────────────┐");
  console.log("│ Categoría de Audio Fahrmodus │ Total       │ Existentes  │ Faltantes   │ Cobertura  │");
  console.log("├─────────────────────────────┼─────────────┼─────────────┼─────────────┼────────────┤");
  for (const [, stat] of Object.entries(typeStats)) {
    const cov = stat.total > 0 ? ((stat.existing / stat.total) * 100).toFixed(1) + "%" : "100%";
    console.log(
      `│ ${stat.label.padEnd(27)} │ ${String(stat.total).padStart(11)} │ ${String(stat.existing).padStart(11)} │ ${String(stat.pending).padStart(11)} │ ${cov.padStart(10)} │`
    );
  }
  console.log("├─────────────────────────────┼─────────────┼─────────────┼─────────────┼────────────┤");
  console.log(
    `│ TOTAL MÓDULO CONDUCCIÓN     │ ${String(totalUnique).padStart(11)} │ ${String(totalExisting).padStart(11)} │ ${String(totalPending).padStart(11)} │ ${(coveragePercent + "%").padStart(10)} │`
  );
  console.log("└─────────────────────────────┴─────────────┴─────────────┴─────────────┴────────────┘");

  // 5. Inicializar Pool de 6 Llaves
  const keyPool = buildGoogleKeyPool();
  console.log(`\n🔑 Pool de 6 API Keys inicializado (${keyPool.length} llaves activas):`);
  keyPool.forEach(k => {
    console.log(`   - [${k.id}] (${k.isPaid ? 'Nivel 1: PAID Facturable' : 'Nivel 2: FREE Respaldo'}) -> ${k.key.substring(0, 14)}...`);
  });

  if (keyPool.length === 0) {
    console.error("❌ No se encontraron llaves de Gemini en .env");
    process.exit(1);
  }

  if (isDryRun) {
    console.log("\n🧪 SIMULACIÓN (--dry-run) FINALIZADA:");
    console.log(`   - Locuciones únicas en Fahrmodus:      ${totalUnique}`);
    console.log(`   - Ya disponibles en Firestore CDN:     ${totalExisting} (${coveragePercent}%)`);
    console.log(`   - Pendientes por generar:              ${totalPending}`);
    if (missingItems.length > 0) {
      console.log(`\n📋 Primeras 5 locuciones en la cola de generación:`);
      missingItems.slice(0, 5).forEach((item, idx) => {
        const p = getDrivingItemPriority(item);
        console.log(`   ${idx + 1}. [P${p} | ${item.lang.toUpperCase()} | ${item.type}] "${item.text.substring(0, 50)}..." (ID: ${item.audioId})`);
      });
    }
    console.log(`\n💡 Para iniciar la generación real permanente, ejecuta:`);
    console.log(`   node scripts/pregenerate_driving_audios.mjs`);
    process.exit(0);
  }

  // 6. GENERACIÓN REAL MULTI-LLAVE CON MARCAPASOS INTELIGENTE
  const itemsToProcess = limit ? missingItems.slice(0, limit) : missingItems;
  console.log(`\n⚡ [3/3] Iniciando síntesis y persistencia de ${itemsToProcess.length} audios pendientes...`);
  console.log(`   Marcapasos por llave individual: 6,500 ms (9.2 RPM max).`);
  console.log(`   Rendimiento global multi-llave: ~1 audio cada 1.1s sin colisiones.\n`);

  const PACEMAKER_PER_KEY_MS = 6500;
  let generatedCount = 0;
  let failedCount = 0;
  let roundRobinIndex = 0;
  const startTime = Date.now();

  for (let i = 0; i < itemsToProcess.length; i++) {
    const item = itemsToProcess[i];
    let audioResult = null;
    let usedKeyId = null;

    while (!audioResult) {
      const activeKeys = keyPool.filter(k => !k.exhausted);
      if (activeKeys.length === 0) {
        console.warn("\n🛑 Todas las API Keys del pool agotaron su cuota diaria. Detención segura.");
        break;
      }

      // Rotación Round-Robin entre las llaves activas
      roundRobinIndex = roundRobinIndex % activeKeys.length;
      const keyObj = activeKeys[roundRobinIndex];

      // Marcapasos por llave: respetar ventana de 6.5s desde el último uso de esta llave
      const elapsedSinceLastUse = Date.now() - keyObj.lastUsedAt;
      if (elapsedSinceLastUse < PACEMAKER_PER_KEY_MS) {
        const waitMs = PACEMAKER_PER_KEY_MS - elapsedSinceLastUse;
        await new Promise(r => setTimeout(r, waitMs));
      }

      try {
        keyObj.lastUsedAt = Date.now();
        const currentModel = keyObj.models[keyObj.modelIndex];
        audioResult = await synthesizeWithGoogleDirect(item.text, "Charon", keyObj.key, currentModel);
        usedKeyId = `${keyObj.id}:${currentModel.replace("gemini-3.8-", "")}`;
        keyObj.successCount++;

        // Avanzar el puntero Round-Robin para el siguiente ítem
        roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
      } catch (err) {
        const errMsg = err.message || "";
        const currentModel = keyObj.models[keyObj.modelIndex];

        // Detección de cuota diaria agotada (PerDay)
        const isPerDay = errMsg.includes("PerDay") ||
                         errMsg.includes("GenerateRequestsPerDay") ||
                         errMsg.includes("generate_requests_per_model_per_day") ||
                         errMsg.includes("generate_content_free_tier_requests");

        if (isPerDay) {
          if (keyObj.modelIndex < keyObj.models.length - 1) {
            keyObj.modelIndex++;
            const nextModel = keyObj.models[keyObj.modelIndex];
            console.log(`    🔄 [Key: ${keyObj.id}] Cuota diaria de ${currentModel} alcanzada. Conmutando a ${nextModel}...`);
            continue;
          } else {
            keyObj.exhausted = true;
            keyObj.exhaustedReason = "PerDay";
            console.warn(`    ⚠️ [Key: ${keyObj.id}] Cuota diaria totalmente agotada. Descartando del pool.`);
            continue;
          }
        }

        // Límite de tasa por minuto (HTTP 429)
        if (errMsg.includes("429")) {
          const delaySec = parseRetryDelay(errMsg) || 62;
          const waitSec = Math.max(delaySec + 2, 62);
          console.warn(`    ⚠️ [Key: ${keyObj.id}] Rate Limit 429. Poniendo llave en pausa por ${waitSec}s...`);
          keyObj.lastUsedAt = Date.now() + (waitSec * 1000);
          roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
          continue;
        }

        // Errores de autorización o invalidación de llave
        if (errMsg.includes("403") || errMsg.includes("400")) {
          keyObj.exhausted = true;
          keyObj.exhaustedReason = `HTTP_${errMsg.match(/40[03]/)?.[0] || 'ERR'}`;
          console.warn(`    ⚠️ [Key: ${keyObj.id}] Error ${keyObj.exhaustedReason}. Descartando llave.`);
          continue;
        }

        console.error(`    ❌ [Key: ${keyObj.id}] Error sintetizando (${item.audioId}): ${errMsg}`);
        await new Promise(r => setTimeout(r, 2000));
        roundRobinIndex = (roundRobinIndex + 1) % activeKeys.length;
      }
    }

    if (!audioResult) {
      const activeKeys = keyPool.filter(k => !k.exhausted);
      if (activeKeys.length === 0) break;
      failedCount++;
      continue;
    }

    // Persistir permanentemente en Cloud Storage y Cloud Firestore
    try {
      const ext = audioResult.mimeType.includes("mp3") ? "mp3" : "wav";
      const filePath = `pronunciations/${item.type}/${item.audioId}.${ext}`;
      const file = bucket.file(filePath);

      // 1. Guardar en Storage con Cache-Control público de 1 año
      await file.save(audioResult.buffer, {
        metadata: {
          contentType: audioResult.mimeType,
          cacheControl: "public, max-age=31536000",
          metadata: {
            text: item.text,
            voice: "Charon",
            type: item.type,
            lang: item.lang,
            provider: audioResult.provider,
            keyUsed: usedKeyId,
            module: "fahrmodus_driving_academy",
            createdAt: new Date().toISOString()
          }
        }
      });

      try { await file.makePublic(); } catch (_) {}

      const permanentAudioUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

      // 2. Indexar en Firestore global_audio_pronunciations
      await db.collection("global_audio_pronunciations").doc(item.audioId).set({
        audioId: item.audioId,
        text: item.text,
        audioUrl: permanentAudioUrl,
        storagePath: filePath,
        voice: "Charon",
        type: item.type,
        lang: item.lang,
        provider: audioResult.provider,
        keyUsed: usedKeyId,
        module: "fahrmodus_driving_academy",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      generatedCount++;

      // Log de progreso
      const elapsedSec = Math.round((Date.now() - startTime) / 1000);
      const remainingItems = itemsToProcess.length - generatedCount;
      const ratePerSec = generatedCount / (elapsedSec || 1);
      const etaSec = Math.round(remainingItems / (ratePerSec || 0.1));
      const etaMin = Math.floor(etaSec / 60);

      const previewText = item.text.length > 35 ? item.text.substring(0, 32) + "..." : item.text;
      console.log(`✅ [${String(generatedCount).padStart(3)} / ${itemsToProcess.length}] [${usedKeyId.padEnd(16)}] [${item.lang.toUpperCase()}|${item.type.padEnd(14)}] "${previewText}" (ETA: ${etaMin}m ${etaSec % 60}s)`);
    } catch (saveErr) {
      console.error(`    ❌ [${item.audioId}] Error guardando en Storage/Firestore:`, saveErr.message);
      failedCount++;
    }
  }

  // 7. Resumen Final
  const finalTotalInFirestore = totalExisting + generatedCount;
  const finalCoverage = ((finalTotalInFirestore / totalUnique) * 100).toFixed(1);
  const totalElapsedSec = Math.round((Date.now() - startTime) / 1000);

  console.log("\n════════════════════════════════════════════════════════════════════════════════");
  console.log("🏁  RESUMEN DE SESIÓN — MODO CONDUCCIÓN (FAHRMODUS)");
  console.log(`   - Audios nuevos generados y persistidos: ${generatedCount}`);
  console.log(`   - Audios fallidos:                       ${failedCount}`);
  console.log(`   - Cobertura final en Firestore CDN:     ${finalTotalInFirestore} / ${totalUnique} (${finalCoverage}%)`);
  console.log(`   - Tiempo total invertido:               ${Math.floor(totalElapsedSec / 60)}m ${totalElapsedSec % 60}s`);
  console.log("\n📊 Distribución de carga por API Key:");
  keyPool.forEach(k => {
    console.log(`   - [${k.id}] (${k.isPaid ? 'PAID' : 'FREE'}): ${k.successCount} audios generados exitosamente ${k.exhausted ? `(Agotada: ${k.exhaustedReason})` : '(Activa ✅)'}`);
  });
  console.log("════════════════════════════════════════════════════════════════════════════════\n");
}

main().catch(err => {
  console.error("❌ Error no controlado:", err);
  process.exit(1);
});

