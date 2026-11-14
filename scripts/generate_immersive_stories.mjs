// scripts/generate_immersive_stories.mjs
// =============================================================================
// DEUTSCHMEISTER PRO A1 (v2.0) — VALIDADOR & GENERADOR DE HISTORIAS READLE
// Usa el pool de 4 llaves GEMINI_PAID_KEY de functions/.env + gemini-3.8-flash
// Regla Temática Enpal: EXCLUSIVAMENTE interior (Keller, Zählerschrank,
// Wechselrichter AC/DC, Speicher, Smart Meter, Wallbox, VDE) — CERO Dachmontage.
// =============================================================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import dotenv from "dotenv";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { immersiveStoriesCatalog } from "../src/data/immersiveStoriesCatalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKTREE_ROOT = path.resolve(__dirname, "..");

/**
 * Carga .env y functions/.env tanto del worktree actual como del repo común.
 */
function loadProjectEnv() {
  const candidateDirs = [WORKTREE_ROOT];
  try {
    const gitCommonDir = execSync("git rev-parse --git-common-dir", {
      cwd: WORKTREE_ROOT,
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim();
    if (gitCommonDir) {
      const mainRepoRoot = path.resolve(WORKTREE_ROOT, gitCommonDir, "..");
      if (!candidateDirs.includes(mainRepoRoot)) {
        candidateDirs.push(mainRepoRoot);
      }
    }
  } catch (_) {}

  const loadedPaths = [];
  for (const dir of candidateDirs) {
    for (const rel of ["functions/.env", ".env"]) {
      const fullPath = path.join(dir, rel);
      if (fs.existsSync(fullPath)) {
        dotenv.config({ path: fullPath, override: false });
        loadedPaths.push(fullPath);
      }
    }
  }
  return loadedPaths;
}

/**
 * Construye el pool priorizado con las 4 llaves de facturación + respaldos FREE.
 */
function buildPaidFirstKeyPool() {
  const raw = [
    { id: "PAID_1", key: process.env.GEMINI_PAID_KEY, isPaid: true },
    { id: "PAID_2", key: process.env.GEMINI_PAID_KEY_2, isPaid: true },
    { id: "PAID_3", key: process.env.GEMINI_PAID_KEY_3, isPaid: true },
    { id: "PAID_4", key: process.env.GEMINI_PAID_KEY_4, isPaid: true },
    { id: "FREE_1", key: process.env.GEMINI_FREE_KEY_1 || process.env.GEMINI_FREE_KEY, isPaid: false },
    { id: "FREE_2", key: process.env.GEMINI_FREE_KEY_2, isPaid: false }
  ];

  const pool = [];
  const seen = new Set();
  for (const item of raw) {
    if (item.key && typeof item.key === "string") {
      const trimmed = item.key.trim();
      if (trimmed.length > 10 && !seen.has(trimmed)) {
        seen.add(trimmed);
        pool.push({ id: item.id, key: trimmed, isPaid: item.isPaid });
      }
    }
  }
  return pool;
}

const READLE_RESPONSE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    titleDe: { type: SchemaType.STRING },
    titleEs: { type: SchemaType.STRING },
    level: { type: SchemaType.STRING },
    category: { type: SchemaType.STRING },
    emoji: { type: SchemaType.STRING },
    readTime: { type: SchemaType.STRING },
    sentences: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          de: { type: SchemaType.STRING },
          es: { type: SchemaType.STRING }
        },
        required: ["de", "es"]
      }
    },
    wordGlossaryEntries: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          wordKey: { type: SchemaType.STRING },
          lemma: { type: SchemaType.STRING },
          translationEs: { type: SchemaType.STRING },
          pos: { type: SchemaType.STRING },
          level: { type: SchemaType.STRING },
          isVerb: { type: SchemaType.BOOLEAN },
          conjugationKey: { type: SchemaType.STRING }
        },
        required: ["wordKey", "lemma", "translationEs", "pos", "level", "isVerb"]
      }
    },
    verbConjugationsEntries: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          key: { type: SchemaType.STRING },
          infinitive: { type: SchemaType.STRING },
          translationEs: { type: SchemaType.STRING },
          auxiliary: { type: SchemaType.STRING },
          praesens: {
            type: SchemaType.OBJECT,
            properties: {
              ich: { type: SchemaType.STRING },
              du: { type: SchemaType.STRING },
              er_sie_es: { type: SchemaType.STRING },
              wir: { type: SchemaType.STRING },
              ihr: { type: SchemaType.STRING },
              sie_Sie: { type: SchemaType.STRING }
            },
            required: ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"]
          },
          praeteritum: {
            type: SchemaType.OBJECT,
            properties: {
              ich: { type: SchemaType.STRING },
              du: { type: SchemaType.STRING },
              er_sie_es: { type: SchemaType.STRING },
              wir: { type: SchemaType.STRING },
              ihr: { type: SchemaType.STRING },
              sie_Sie: { type: SchemaType.STRING }
            },
            required: ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"]
          },
          perfekt: { type: SchemaType.STRING },
          partizip: { type: SchemaType.STRING }
        },
        required: ["key", "infinitive", "translationEs", "auxiliary", "praesens", "praeteritum", "perfekt", "partizip"]
      }
    },
    examQuestions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          type: { type: SchemaType.STRING },
          prompt: { type: SchemaType.STRING },
          options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          correctIndex: { type: SchemaType.INTEGER },
          explanationEs: { type: SchemaType.STRING }
        },
        required: ["type", "prompt", "options", "correctIndex", "explanationEs"]
      }
    },
    keyWords: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          de: { type: SchemaType.STRING },
          es: { type: SchemaType.STRING },
          pos: { type: SchemaType.STRING },
          level: { type: SchemaType.STRING },
          exampleDe: { type: SchemaType.STRING },
          exampleEs: { type: SchemaType.STRING }
        },
        required: ["de", "es", "pos", "level", "exampleDe", "exampleEs"]
      }
    },
    grammarCards: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          exampleDe: { type: SchemaType.STRING },
          highlightedPart: { type: SchemaType.STRING },
          exampleEs: { type: SchemaType.STRING },
          descriptionEs: { type: SchemaType.STRING },
          table: {
            type: SchemaType.OBJECT,
            properties: {
              headers: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
              rows: { type: SchemaType.ARRAY, items: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } } }
            },
            required: ["headers", "rows"]
          },
          extraExamples: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                de: { type: SchemaType.STRING },
                es: { type: SchemaType.STRING }
              },
              required: ["de", "es"]
            }
          }
        },
        required: ["title", "exampleDe", "highlightedPart", "exampleEs", "descriptionEs", "table", "extraExamples"]
      }
    }
  },
  required: [
    "id",
    "titleDe",
    "titleEs",
    "level",
    "category",
    "emoji",
    "readTime",
    "sentences",
    "wordGlossaryEntries",
    "verbConjugationsEntries",
    "examQuestions",
    "keyWords",
    "grammarCards"
  ]
};

function normalizeGeneratedStory(raw) {
  const wordGlossary = {};
  for (const item of raw.wordGlossaryEntries || []) {
    if (item?.wordKey) {
      const k = String(item.wordKey).toLowerCase().trim();
      wordGlossary[k] = {
        lemma: item.lemma,
        translationEs: item.translationEs,
        pos: item.pos,
        level: item.level,
        isVerb: Boolean(item.isVerb),
        ...(item.conjugationKey ? { conjugationKey: item.conjugationKey } : {})
      };
    }
  }

  const verbConjugations = {};
  for (const vc of raw.verbConjugationsEntries || []) {
    if (vc?.key) {
      verbConjugations[vc.key] = {
        infinitive: vc.infinitive,
        translationEs: vc.translationEs,
        auxiliary: vc.auxiliary,
        praesens: vc.praesens,
        praeteritum: vc.praeteritum,
        perfekt: vc.perfekt,
        partizip: vc.partizip
      };
    }
  }

  return {
    id: raw.id || `custom_${Date.now()}`,
    titleDe: raw.titleDe,
    titleEs: raw.titleEs,
    level: raw.level === "A2" ? "A2" : "A1",
    category: ["enpal", "behoerden", "familie"].includes(raw.category) ? raw.category : "enpal",
    emoji: raw.emoji || "📖",
    readTime: raw.readTime || "3 min",
    sentences: raw.sentences || [],
    wordGlossary,
    verbConjugations,
    examQuestions: raw.examQuestions || [],
    keyWords: raw.keyWords || [],
    grammarCards: raw.grammarCards || []
  };
}

/**
 * Valida una historia contra el esquema estricto de Readle y las reglas temáticas de Enpal.
 */
export function validateReadleStory(story) {
  const errors = [];
  const requiredFields = ["id", "titleDe", "titleEs", "level", "category", "emoji", "readTime"];
  for (const f of requiredFields) {
    if (!story?.[f]) errors.push(`Falta campo requerido '${f}'`);
  }

  if (!["A1", "A2"].includes(story?.level)) {
    errors.push(`Nivel inválido '${story?.level}' (debe ser 'A1' o 'A2')`);
  }

  if (!Array.isArray(story?.sentences) || story.sentences.length < 6 || story.sentences.length > 8) {
    errors.push(`sentences debe tener 6-8 oraciones (actual: ${story?.sentences?.length || 0})`);
  }

  if (!story?.wordGlossary || Object.keys(story.wordGlossary).length < 15) {
    errors.push(`wordGlossary insuficiente (actual: ${Object.keys(story?.wordGlossary || {}).length})`);
  }

  const verbs = Object.values(story?.verbConjugations || {});
  if (verbs.length < 3) {
    errors.push(`verbConjugations debe incluir al menos 3 verbos (actual: ${verbs.length})`);
  }
  const persons = ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"];
  for (const v of verbs) {
    for (const p of persons) {
      if (!v?.praesens?.[p] || !v?.praeteritum?.[p]) {
        errors.push(`Conjugación incompleta para '${v?.infinitive}' en persona '${p}'`);
      }
    }
    if (!v?.perfekt || !v?.partizip || !v?.auxiliary) {
      errors.push(`Faltan perfekt/partizip/auxiliary para '${v?.infinitive}'`);
    }
  }

  if (!Array.isArray(story?.examQuestions) || story.examQuestions.length !== 4) {
    errors.push(`examQuestions debe tener exactamente 4 preguntas (actual: ${story?.examQuestions?.length || 0})`);
  } else {
    const clozeCount = story.examQuestions.filter((q) => (q.prompt || "").includes("___")).length;
    if (clozeCount < 2) {
      errors.push(`Faltan preguntas Cloze con '___' (requerido: >=2, actual: ${clozeCount})`);
    }
    story.examQuestions.forEach((q, idx) => {
      if (!Array.isArray(q.options) || q.options.length !== 3) {
        errors.push(`Pregunta ${idx + 1} debe tener exactamente 3 opciones`);
      }
      if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex > 2) {
        errors.push(`Pregunta ${idx + 1} tiene correctIndex inválido: ${q.correctIndex}`);
      }
      if (!q.explanationEs) {
        errors.push(`Pregunta ${idx + 1} carece de explanationEs`);
      }
    });
  }

  if (!Array.isArray(story?.keyWords) || story.keyWords.length < 8 || story.keyWords.length > 10) {
    errors.push(`keyWords debe tener 8-10 elementos (actual: ${story?.keyWords?.length || 0})`);
  }

  if (!Array.isArray(story?.grammarCards) || story.grammarCards.length < 2 || story.grammarCards.length > 3) {
    errors.push(`grammarCards debe tener 2-3 fichas (actual: ${story?.grammarCards?.length || 0})`);
  }

  // Regla temática estricta para Enpal: NADA de tejado / Dachmontage
  if (story?.category === "enpal") {
    const fullText = [
      story.titleDe,
      story.titleEs,
      ...(story.sentences || []).map((s) => `${s.de} ${s.es}`),
      ...(story.keyWords || []).map((k) => `${k.de} ${k.exampleDe}`)
    ].join(" ");
    if (/\b(dachmontage|dachdecker|solardach|auf dem dach|hausdach|ziegeldach|tejado)\b/i.test(fullText)) {
      errors.push("VIOLACIÓN TEMÁTICA ENPAL: se detectó referencia prohibida a tejado / Dachmontage");
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Invoca el pool de llaves GEMINI_PAID_KEY (1..4) con gemini-3.8-flash para generar o enriquecer una historia.
 */
export async function generateStoryWithGemini({ topic, category = "enpal", level = "A1", enrichStory = null }) {
  const pool = buildPaidFirstKeyPool();
  if (pool.length === 0) {
    throw new Error("No se encontraron llaves GEMINI_PAID_KEY / GEMINI_FREE_KEY en functions/.env o .env.");
  }

  const enpalRule = category === "enpal"
    ? "REGLA TEMÁTICA ESTRICTA PARA ENPAL: El protagonista es Elektriker en Enpal pero NUNCA sube al tejado ni realiza Dachmontage. Toda la escena ocurre EXCLUSIVAMENTE en interiores: Keller / Technikraum, Zählerschrank, Wechselrichter AC/DC, Speicher, Smart Meter, Wallbox, Multimeter/Spannungsprüfer y las 5 reglas VDE (Stromkreis freischalten)."
    : "";

  const systemInstruction = `Eres un profesor experto de alemán del Goethe-Institut y editor pedagógico estilo Readle.
Genera una historia inmersiva completa en nivel ${level} sobre el tema indicado.
${enpalRule}
Requisitos estrictos:
- 6 a 8 oraciones naturales con traducción interlineal precisa al español.
- Usa diacríticos alemanes estándar (ä, ö, ü, ß).
- examQuestions: exactamente 4 preguntas (2 de comprensión lectora y 2 de hueco gramatical Cloze con "___" sobre frases reales de la historia), 3 opciones cada una y explanationEs claro.
- keyWords: 8 a 10 palabras/expresiones clave con pos, level y ejemplo bilingüe.
- verbConjugationsEntries: tablas completas (Präsens, Präteritum, Perfekt y Partizip I) para los verbos principales de la historia.
- grammarCards: 2 fichas gramaticales claras con tabla y ejemplos extra.`;

  const prompt = enrichStory
    ? `Enriquece y perfecciona esta historia existente manteniendo su id "${enrichStory.id}": ${JSON.stringify(enrichStory)}`
    : `Genera una nueva historia estilo Readle. Categoría: "${category}", Nivel: "${level}", Tema: "${topic}".`;

  let lastError = null;
  for (const keyItem of pool) {
    const candidateModels = keyItem.isPaid
      ? ["gemini-3.8-flash", "gemini-2.5-flash"]
      : ["gemini-2.5-flash", "gemini-3.5-flash-lite"];

    for (const modelName of candidateModels) {
      try {
        console.log(`[StoryGenerator] Probando llave ${keyItem.id} con modelo ${modelName}...`);
        const genAI = new GoogleGenerativeAI(keyItem.key);
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction,
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: READLE_RESPONSE_SCHEMA
          }
        });
        const res = await model.generateContent(prompt);
        const rawText = res.response.text();
        const parsed = JSON.parse(rawText);
        return normalizeGeneratedStory(parsed);
      } catch (err) {
        lastError = err;
        console.warn(`[StoryGenerator] Fallo en ${keyItem.id}/${modelName}:`, err?.message || err);
      }
    }
  }
  throw lastError || new Error("Todas las llaves del pool fallaron.");
}

// =============================================================================
// EJECUCIÓN CLI
// =============================================================================
async function main() {
  const args = process.argv.slice(2);
  const envFiles = loadProjectEnv();
  const pool = buildPaidFirstKeyPool();

  const validateAll = args.includes("--validate") || args.length === 0;
  const topicIdx = args.indexOf("--topic");
  const topic = topicIdx !== -1 ? args[topicIdx + 1] : null;
  const catIdx = args.indexOf("--category");
  const category = catIdx !== -1 ? args[catIdx + 1] : "enpal";
  const lvlIdx = args.indexOf("--level");
  const level = lvlIdx !== -1 ? args[lvlIdx + 1] : "A1";

  if (validateAll && !topic) {
    console.log(`📚 Validando catálogo inmersivo (${immersiveStoriesCatalog.length} historias)...`);
    console.log(`🔑 Env cargados: ${envFiles.length} archivos | Pool API detectado: ${pool.map((p) => p.id).join(", ") || "solo modo local"}`);
    let invalidCount = 0;

    for (const story of immersiveStoriesCatalog) {
      const check = validateReadleStory(story);
      if (check.valid) {
        console.log(
          `  ✅ [${story.id}] (${story.levelLabel || story.level} • ${story.category}) "${story.titleDe}" — ` +
          `${story.sentences.length} oraciones, ${Object.keys(story.wordGlossary).length} entradas glosario, ` +
          `${Object.keys(story.verbConjugations).length} verbos, ${story.examQuestions.length} preguntas, ` +
          `${story.keyWords.length} keyWords, ${story.grammarCards.length} grammarCards`
        );
      } else {
        invalidCount++;
        console.error(`  ❌ [${story.id}] ERRORES:`, check.errors);
      }
    }

    if (immersiveStoriesCatalog.length !== 12 || invalidCount > 0) {
      console.error(`\n❌ Validación fallida: total=${immersiveStoriesCatalog.length}, inválidas=${invalidCount}`);
      process.exit(1);
    }
    console.log("\n🎉 Validación completada: 12/12 historias válidas con 0 errores y cumplimiento estricto Enpal-Interior.");
    return;
  }

  if (topic) {
    const generated = await generateStoryWithGemini({ topic, category, level });
    const check = validateReadleStory(generated);
    console.log(JSON.stringify({ valid: check.valid, errors: check.errors, story: generated }, null, 2));
    if (!check.valid) process.exit(1);
  }
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  main().catch((err) => {
    console.error("Error fatal en generate_immersive_stories:", err);
    process.exit(1);
  });
}
