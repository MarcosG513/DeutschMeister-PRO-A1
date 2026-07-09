import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fal } from '@fal-ai/client';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chaptersPath = path.resolve(__dirname, '../src/data/chapters.jsx');

// Cargar variables de entorno (FAL_KEY)
dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (!process.env.FAL_KEY && process.env.VITE_FAL_KEY) {
  process.env.FAL_KEY = process.env.VITE_FAL_KEY;
}

if (!process.env.FAL_KEY) {
  console.error("❌ ERROR: No se encontró la API Key de Fal.ai (FAL_KEY / VITE_FAL_KEY) en las variables de entorno.");
  process.exit(1);
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper para parsear un bloque de objeto literal de JavaScript
function parseObjectLiteral(str) {
  try {
    return new Function('return ' + str)();
  } catch (e) {
    return null;
  }
}

// Helper para serializar de vuelta a formato literal JS
function serializeObject(obj) {
  const keys = Object.keys(obj);
  const lines = keys.map(k => {
    const val = obj[k];
    const valStr = typeof val === 'string' ? JSON.stringify(val) : val;
    return `    ${k}: ${valStr}`;
  });
  return `{\n${lines.join(',\n')}\n  }`;
}

// Limpiar explicaciones conversacionales que Claude pueda generar
function cleanClaudeResponse(responseText) {
  let text = responseText.trim();
  
  // Limpiar cualquier prefijo de flecha que pueda haber devuelto
  text = text.replace(/.*?->\s*/, '');
  
  // Buscar marcadores de transcripción en el texto
  const markers = [
    /Transcripción corregida:\s*([^\n]+)/i,
    /NUEVA TRANSCRIPCIÓN:\s*([^\n]+)/i,
    /Reescritura:\s*([^\n]+)/i,
    /corregida:\s*([^\n]+)/i,
    /debería ser:\s*([^\n]+)/i,
    /pronunciación correcta.*es:\s*([^\n]+)/i,
    /es:\s*([^\n]+)/i
  ];
  
  for (const regex of markers) {
    const match = text.match(regex);
    if (match && match[1]) {
      let candidate = match[1].trim();
      candidate = candidate.replace(/^["'`\s\[\/]+|["'`\s\]\/]+$/g, "").trim();
      if (candidate.length > 0 && candidate.length < 45 && !candidate.includes("\n")) {
        return candidate.toLowerCase();
      }
    }
  }

  // Quitar corchetes, barras, comillas
  let cleaned = text.replace(/^["'`\s\[\/]+|["'`\s\]\/]+$/g, "").trim();
  
  // Si contiene barras o corchetes internos, limpiarlos
  cleaned = cleaned.replace(/[\/\[\]\(\)\.]/g, "").trim();
  
  if (cleaned.length > 45 || cleaned.includes("\n")) {
    return null;
  }
  return cleaned.toLowerCase();
}

async function main() {
  console.log("📖 Cargando y analizando src/data/chapters.jsx...");
  
  if (!fs.existsSync(chaptersPath)) {
    console.error(`❌ ERROR: No se encontró el archivo chapters.jsx en: ${chaptersPath}`);
    process.exit(1);
  }
  
  let content = fs.readFileSync(chaptersPath, 'utf-8');
  
  // Aislar el bloque de 'chapters'
  const startIdx = content.indexOf('const chapters = [');
  const endIdx = content.indexOf('const goetheModules =');
  
  if (startIdx === -1) {
    console.error("❌ ERROR: No se pudo identificar la constante 'chapters' en el archivo.");
    process.exit(1);
  }
  
  const chaptersText = endIdx !== -1 ? content.substring(startIdx, endIdx) : content.substring(startIdx);

  // Capturar objetos literal de palabras
  const wordRegex = /\{\s*de:\s*"[^"]+"[\s\S]*?\}/g;
  const matches = [];
  let match;
  while ((match = wordRegex.exec(chaptersText)) !== null) {
    matches.push({
      text: match[0],
      index: match.index,
      length: match[0].length
    });
  }
  
  console.log(`📚 Encontradas ${matches.length} palabras totales en chapters.jsx.`);
  
  const pendingWords = [];
  for (const m of matches) {
    const obj = parseObjectLiteral(m.text);
    if (obj) {
      pendingWords.push({
        matchInfo: m,
        wordObj: obj
      });
    }
  }

  const systemPrompt = `Eres un lingüista experto en fonética alemana para hispanohablantes. Tu única tarea es recibir una palabra o frase en alemán y devolver su pronunciación figurada usando SOLO el alfabeto español, separando sílabas con guiones y marcando la sílaba tónica con una tilde (ej. á).
REGLAS INQUEBRANTABLES:
1. CERO EXPLICACIONES: Devuelve ÚNICAMENTE el string de la pronunciación. Nada de corchetes, ni barras, ni análisis.
2. ARTÍCULOS OBLIGATORIOS: Si la entrada incluye 'der', 'die' o 'das', tu respuesta DEBE empezar obligatoriamente con 'dea', 'di' o 'das' (ej. 'der Spiegel' -> 'dea shpí-guel'). Nunca omitas el artículo.
3. NÚMEROS: Si la entrada contiene un dígito (ej. '4'), procésalo como la palabra escrita ('vier') y aplica las reglas (ej. 'fí-a').
4. CONSONANTES: 'v' suena como 'f' (vier -> fí-a). 'z' suena como 'ts' (zwei -> tsvái). 'sch' suena como 'sh' (schlafen -> shlá-fen). 'w' suena como 'v' (was -> vas).
5. R FINAL: Las terminaciones en '-er' o 'r' al final de sílaba suenan como una 'a' corta (ej. 'der' -> 'dea', 'vier' -> 'fí-a', 'Uhr' -> 'ú-a').`;

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < pendingWords.length; i++) {
    const { matchInfo, wordObj } = pendingWords[i];

    // Exclusión selectiva: proteger el abecedario pero procesar números
    const typeLower = (wordObj.type || "").toLowerCase();
    const catLower = (wordObj.category || "").toLowerCase();
    if (catLower === "alphabet" || typeLower === "letra" || typeLower === "especial") {
      console.log(`⏭️ [${i + 1}/${pendingWords.length}] Saltando letra/alfabeto: "${wordObj.de}"`);
      continue;
    }

    const currentPron = wordObj.pron || "";
    
    console.log(`\n🔄 [${i + 1}/${pendingWords.length}] Transcribiendo con Claude: "${wordObj.de}" (Actual: "${currentPron}")...`);

    const prompt = `Palabra alemana: "${wordObj.de}"
Transcripción actual: "${currentPron}"

Instrucción: Genera la pronunciación figurada en minúsculas para un hispanohablante de la palabra alemana anterior siguiendo estrictamente las 5 reglas.`;

    let attempts = 0;
    const maxAttempts = 3;
    let requestSuccess = false;

    while (attempts < maxAttempts && !requestSuccess) {
      try {
        const result = await fal.subscribe("openrouter/router/enterprise", {
          input: {
            model: "anthropic/claude-sonnet-5",
            system_prompt: systemPrompt,
            prompt: prompt,
            temperature: 0.0
          }
        });
        
        const responseText = result.data.output.trim();
        let cleanResponse = cleanClaudeResponse(responseText);

        if (cleanResponse) {
          console.log(`   ✨ Pronunciación recibida: "${cleanResponse}"`);
          
          wordObj.pron = cleanResponse;
          const newWordText = serializeObject(wordObj);
          
          // Leer y actualizar chapters.jsx fresco
          content = fs.readFileSync(chaptersPath, 'utf-8');
          content = content.replace(matchInfo.text, newWordText);
          fs.writeFileSync(chaptersPath, content, 'utf-8');
          
          matchInfo.text = newWordText;
          successCount++;
          requestSuccess = true;
        } else {
          console.log(`   ⚠️ Respuesta no válida o vacía. Reintentando...`);
          attempts++;
          await delay(2000);
        }
      } catch (error) {
        attempts++;
        console.error(`   ❌ Error en Claude para "${wordObj.de}":`, error.message);
        if (attempts < maxAttempts) {
          await delay(5000);
        } else {
          errorCount++;
        }
      }
    }

    // Rate limiting: 10 segundos obligatorios por estabilidad en red
    console.log(`🕒 Esperando 10 segundos (Rate Limiting)...`);
    await delay(10000);
  }

  console.log("\n==================================================");
  console.log("🏁 Auditoría fonética definitiva de Claude finalizada.");
  console.log(`✅ Transcripciones actualizadas: ${successCount}`);
  console.log(`❌ Errores irrecuperables: ${errorCount}`);
  console.log("==================================================");
}

main();
