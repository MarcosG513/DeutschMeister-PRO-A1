import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fal } from '@fal-ai/client';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chaptersPath = path.resolve(__dirname, '../src/data/chapters.jsx');

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (!process.env.FAL_KEY && process.env.VITE_FAL_KEY) {
  process.env.FAL_KEY = process.env.VITE_FAL_KEY;
}
if (!process.env.FAL_KEY) {
  console.error('❌ ERROR: No se encontró FAL_KEY / VITE_FAL_KEY en el .env');
  process.exit(1);
}

const DELAY_MS = 8000;
const MAX_ATTEMPTS = 3;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Parsear objeto literal de JS ─────────────────────────────────────────────
function parseObjectLiteral(str) {
  try {
    return new Function('return ' + str)();
  } catch {
    return null;
  }
}

// ─── Serializar objeto a formato literal JS ───────────────────────────────────
function serializeObject(obj) {
  const keys = Object.keys(obj);
  const lines = keys.map(k => {
    const val = obj[k];
    const valStr = typeof val === 'string' ? JSON.stringify(val) : val;
    return `    ${k}: ${valStr}`;
  });
  return `{\n${lines.join(',\n')}\n  }`;
}

// ─── Extraer JSON puro de la respuesta de Claude ──────────────────────────────
function extractJSON(text) {
  // Buscar bloque JSON entre llaves
  const match = text.match(/\{[^{}]+\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

// ─── Determinar si la palabra necesita enriquecimiento ───────────────────────
function needsEnrichment(wordObj) {
  const typeLower = (wordObj.type || '').toLowerCase();
  const catLower  = (wordObj.category || '').toLowerCase();

  // Saltar letras y especiales del abecedario
  if (catLower === 'alphabet' || typeLower === 'letra' || typeLower === 'especial') return false;

  // Sustantivos: necesitan plural si no lo tienen
  if (typeLower.includes('sustantivo')) return !wordObj.plural;

  // Verbos, preposiciones, adverbios, frases, adjetivos, números: necesitan regimen si no lo tienen
  return !wordObj.regimen;
}

// ─── Construir el prompt para cada tipo de palabra ────────────────────────────
function buildPrompt(wordObj) {
  const typeLower = (wordObj.type || '').toLowerCase();

  let instruccion = '';

  if (typeLower.includes('sustantivo')) {
    instruccion = `TIPO: Sustantivo.
TAREA: Devuelve el plural de la palabra con su artículo correcto (die, das, die siempre para plural).
FORMATO OBLIGATORIO: {"plural": "die Pluralform"}
PROHIBIDO: prefijos "Plural:", guiones solitarios, explicaciones.
EJEMPLO: {"plural": "die Briefe"}`;
  } else if (typeLower.includes('verbo')) {
    instruccion = `TIPO: Verbo.
TAREA: Devuelve el régimen del verbo (caso que exige, si es separable o reflexivo).
FORMATO OBLIGATORIO: {"regimen": "nota ultra-corta"}
EJEMPLOS válidos: {"regimen": "+ Akkusativ"}, {"regimen": "⚠️ Exige Dativo"}, {"regimen": "Separable (an-)"}, {"regimen": "Reflexivo"}, {"regimen": "Irregular (nimmt)"}`;
  } else if (typeLower.includes('preposición') || typeLower.includes('preposicion')) {
    instruccion = `TIPO: Preposición.
TAREA: Devuelve el caso que exige la preposición.
FORMATO OBLIGATORIO: {"regimen": "nota ultra-corta"}
EJEMPLOS válidos: {"regimen": "+ Dativo"}, {"regimen": "+ Akkusativ"}, {"regimen": "Wechselpräposition"}`;
  } else if (typeLower.includes('adjetivo')) {
    instruccion = `TIPO: Adjetivo.
TAREA: Devuelve el antónimo exacto con el prefijo ≠.
FORMATO OBLIGATORIO: {"regimen": "≠ antónimo"}
EJEMPLO: {"regimen": "≠ klein"}, {"regimen": "≠ billig"}`;
  } else if (typeLower.includes('adverbio')) {
    instruccion = `TIPO: Adverbio.
TAREA: Devuelve una nota gramatical ultra-corta (función o uso).
FORMATO OBLIGATORIO: {"regimen": "nota ultra-corta"}
EJEMPLOS: {"regimen": "Temporal"}, {"regimen": "Causal"}, {"regimen": "Modal"}, {"regimen": "Frecuencia"}`;
  } else if (typeLower.includes('número') || typeLower.includes('numero')) {
    instruccion = `TIPO: Número.
TAREA: Devuelve el ordinal correspondiente o nota de uso.
FORMATO OBLIGATORIO: {"regimen": "nota ultra-corta"}
EJEMPLO: {"regimen": "Ordinal: erste"}, {"regimen": "Cardinal"}`;
  } else {
    instruccion = `TIPO: ${wordObj.type || 'Otro'}.
TAREA: Devuelve una nota gramatical ultra-corta relevante para un estudiante de A1.
FORMATO OBLIGATORIO: {"regimen": "nota ultra-corta"}
EJEMPLOS: {"regimen": "Posición 2"}, {"regimen": "Modal"}, {"regimen": "Fijo"}, {"regimen": "Coloquial"}`;
  }

  return `Palabra alemana: "${wordObj.de}"
Traducción al español: "${wordObj.es}"
Tipo: ${wordObj.type}

${instruccion}

REGLAS ABSOLUTAS:
- Responde ÚNICAMENTE con el JSON. Sin texto antes ni después.
- El valor debe ser ultra-conciso (máximo 30 caracteres).
- Usa siempre comillas dobles en el JSON.
- NO incluyas el prefijo "Plural:" en el valor de plural.`;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('📖 Cargando src/data/chapters.jsx...');

  if (!fs.existsSync(chaptersPath)) {
    console.error(`❌ No se encontró chapters.jsx en: ${chaptersPath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(chaptersPath, 'utf-8');

  const startIdx = content.indexOf('const chapters = [');
  const endIdx   = content.indexOf('const goetheModules =');
  if (startIdx === -1) {
    console.error("❌ No se encontró 'const chapters = [' en el archivo.");
    process.exit(1);
  }

  const chaptersText = endIdx !== -1
    ? content.substring(startIdx, endIdx)
    : content.substring(startIdx);

  // Extraer todos los objetos de palabras
  const wordRegex = /\{\s*de:\s*"[^"]+[\s\S]*?\}/g;
  const allMatches = [];
  let m;
  while ((m = wordRegex.exec(chaptersText)) !== null) {
    allMatches.push({ text: m[0], index: m.index });
  }

  console.log(`📚 Total de entradas encontradas: ${allMatches.length}`);

  // Filtrar solo las que necesitan enriquecimiento
  const pending = [];
  for (const match of allMatches) {
    const obj = parseObjectLiteral(match.text);
    if (obj && needsEnrichment(obj)) {
      pending.push({ matchInfo: match, wordObj: obj });
    }
  }

  console.log(`🎯 Palabras que necesitan enriquecimiento: ${pending.length}`);
  console.log(`⏭️  Palabras ya enriquecidas o excluidas: ${allMatches.length - pending.length}\n`);

  const systemPrompt = `Eres un lingüista alemán experto en gramática A1 para hispanohablantes.
Tu única función es devolver datos gramaticales en formato JSON puro y ultra-conciso.
NUNCA escribas explicaciones, texto adicional, markdown ni comentarios.
SOLO devuelve el JSON solicitado, nada más.`;

  let successCount = 0;
  let skippedCount = 0;
  let errorCount   = 0;

  for (let i = 0; i < pending.length; i++) {
    const { matchInfo, wordObj } = pending[i];
    const typeLower = (wordObj.type || '').toLowerCase();
    const targetProp = typeLower.includes('sustantivo') ? 'plural' : 'regimen';

    console.log(`\n🔄 [${i + 1}/${pending.length}] "${wordObj.de}" (${wordObj.type}) → buscando ${targetProp}...`);

    const prompt = buildPrompt(wordObj);
    let attempts = 0;
    let requestSuccess = false;

    while (attempts < MAX_ATTEMPTS && !requestSuccess) {
      try {
        const result = await fal.subscribe('openrouter/router/enterprise', {
          input: {
            model: 'anthropic/claude-sonnet-5',
            system_prompt: systemPrompt,
            prompt: prompt,
            temperature: 0.0,
          }
        });

        const rawText = result?.data?.output?.trim() || '';
        const parsed  = extractJSON(rawText);

        if (parsed && (parsed.plural || parsed.regimen)) {
          const value = parsed.plural || parsed.regimen;
          console.log(`   ✨ ${targetProp}: "${value}"`);

          // Inyectar la propiedad preservando todas las existentes
          if (parsed.plural)  wordObj.plural  = parsed.plural;
          if (parsed.regimen) wordObj.regimen  = parsed.regimen;

          const newWordText = serializeObject(wordObj);

          // Re-leer y actualizar el archivo de forma incremental
          content = fs.readFileSync(chaptersPath, 'utf-8');
          const updatedContent = content.replace(matchInfo.text, newWordText);
          fs.writeFileSync(chaptersPath, updatedContent, 'utf-8');

          // Actualizar la referencia para futuros replace
          matchInfo.text = newWordText;
          successCount++;
          requestSuccess = true;

        } else {
          console.log(`   ⚠️  JSON no válido recibido: "${rawText.substring(0, 60)}". Reintentando...`);
          attempts++;
          await delay(2000);
        }

      } catch (error) {
        attempts++;
        console.error(`   ❌ Error (intento ${attempts}/${MAX_ATTEMPTS}): ${error.message}`);
        if (attempts < MAX_ATTEMPTS) {
          await delay(5000);
        } else {
          errorCount++;
          console.error(`   🚫 Fallido definitivamente: "${wordObj.de}"`);
        }
      }
    }

    if (!requestSuccess && attempts >= MAX_ATTEMPTS) {
      skippedCount++;
    }

    // Rate limiting: 8 segundos entre cada petición
    if (i < pending.length - 1) {
      console.log(`🕒 Esperando ${DELAY_MS / 1000}s (rate limiting)...`);
      await delay(DELAY_MS);
    }
  }

  console.log('\n==================================================');
  console.log('🏁 Enriquecimiento gramatical completo finalizado.');
  console.log(`✅ Actualizadas exitosamente: ${successCount}`);
  console.log(`❌ Fallidas irrecuperables:   ${errorCount}`);
  console.log(`⏭️  Saltadas:                 ${skippedCount}`);
  console.log('==================================================');
}

main();
