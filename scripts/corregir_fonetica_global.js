import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import { fal } from '@fal-ai/client';
import dotenv from 'dotenv';

// Configurar import.meta.url
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

// Función robusta para limpiar cualquier respuesta conversacional
function cleanChattyResponse(responseText) {
  let text = responseText.trim();
  
  // Si contiene CORRECTO/CORRECTA/CORRECT en cualquier parte, asumimos CORRECTO
  if (/correct/i.test(text)) {
    return "CORRECTO";
  }
  
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
      if (candidate.length > 0 && candidate.length < 40 && !candidate.includes("\n")) {
        return candidate;
      }
    }
  }

  // Si tiene corchetes o barras inclinadas, extraer lo que esté adentro
  const bracketMatch = text.match(/\[([^\]]+)\]/);
  if (bracketMatch && bracketMatch[1]) {
    return bracketMatch[1].replace(/[\/]/g, "").trim();
  }
  
  const slashMatch = text.match(/\/([^\/]+)\//);
  if (slashMatch && slashMatch[1]) {
    return slashMatch[1].trim();
  }

  // Si el texto tiene saltos de línea, tomar la última línea corta que no contenga palabras explicativas
  if (text.includes("\n")) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    for (let j = lines.length - 1; j >= 0; j--) {
      const line = lines[j];
      const cleanLine = line.replace(/^["'`\s\-]+|["'`\s\-]+$/g, "").trim();
      if (cleanLine.length > 0 && cleanLine.length < 30 && !cleanLine.includes(" ") && !cleanLine.includes(":") && !cleanLine.includes("correcta") && !cleanLine.includes("incorrecta") && !cleanLine.includes("entonces") && !cleanLine.includes("respuesta")) {
        return cleanLine;
      }
    }
  }

  // Quitar comillas, corchetes y barras
  let cleaned = text.replace(/^["'`\s\[\/]+|["'`\s\]\/]+$/g, "").trim();
  if (cleaned.length > 40) {
    return null;
  }
  return cleaned;
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
  
  const header = content.substring(0, startIdx);
  const footer = endIdx !== -1 ? content.substring(endIdx) : "";
  const chaptersText = endIdx !== -1 ? content.substring(startIdx, endIdx) : content.substring(startIdx);

  // Expresión regular para capturar objetos literal de palabras: { de: "..." }
  const wordRegex = /\{\s*de:\s*"[^"]+"[\s\S]*?\}/g;
  
  // Encontrar todas las palabras y sus posiciones
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

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Procesar palabras secuencialmente con retraso de 0.5s
  for (let i = 0; i < pendingWords.length; i++) {
    const { matchInfo, wordObj } = pendingWords[i];
    
    // Ignorar letras sueltas y alfabeto del Kapitel 0
    const typeLower = (wordObj.type || "").toLowerCase();
    const catLower = (wordObj.category || "").toLowerCase();
    if (typeLower === "letra" || typeLower === "especial" || catLower === "alphabet") {
      console.log(`⏭️ [${i + 1}/${pendingWords.length}] Saltando letra/alfabeto: "${wordObj.de}"`);
      skippedCount++;
      continue;
    }
    
    const currentPron = wordObj.pron || "Sin pronunciación";
    
    console.log(`\n🔄 [${i + 1}/${pendingWords.length}] Evaluando: "${wordObj.de}" (Pronunciación actual: "${currentPron}")...`);

    const systemPrompt = `Eres el Lingüista Principal de una app de alemán para hispanohablantes. Tu tarea es transcribir palabras y frases alemanas a una pronunciación figurada exacta para que un hispanohablante nativo las lea y suene como un alemán.

REGLAS DE OBLIGATORIO CUMPLIMIENTO:
- NÚMEROS A LETRAS: Si hay números en dígitos (ej. '3', '4'), transcríbelos primero mentalmente a letras ('drei', 'vier') y luego aplica la fonética ('drái', 'fí-a').
- CERO IPA: ¡PROHIBIDO usar símbolos fonéticos como 'ː', 'ˈ', '[', ']', o '/'. Solo usa letras del alfabeto español, guiones para separar sílabas y una tilde (´) para la sílaba tónica.
- VOCALES Y UMLAUTE: 'ä' -> [e], 'ö' -> [e con labios de o], 'ü' -> [i con labios de u]. Diptongos: 'ei' -> [ai], 'ie' -> [i], 'eu/äu' -> [oi].
- LA LETRA 'R': Al final de una palabra o sílaba (ej. Uhr, vier, vor, er), se vocaliza como una 'a' corta. Ej: Uhr -> ú-a, vier -> fí-a, vor -> fo-a (o for).
- CONSONANTES CRÍTICAS: 
  * La 'v' alemana suena como [f] (ej. Viertel -> fír-tel, von -> fon).
  * La 'w' alemana suena como [v] labiodental (ej. Wie -> vi).
  * La 'z' alemana suena como [ts] (ej. zwei -> tsvai, zehn -> tsen).
  * La 'h' inicial suena aspirada como [j] suave (ej. halb -> jalp).
  * La agrupación 'sch' suena como [sh].
  * La 'ch' suena como [j] fuerte tras a, o, u (nach -> naj). Tras e, i, ä, ö, ü suena como una [j] muy suave o palatal (gleich -> glaij).
- ENSORDECIMIENTO (Auslautverhärtung): 'b', 'd', 'g' al final suenan [p], [t], [k] (ej. halb -> jalp).

EJEMPLOS DE CALIBRACIÓN:
- 'Wie spät ist es?' -> vi shpét ist es
- 'Wie viel Uhr ist es?' -> vi fil ú-a ist es
- 'halb zwei' -> jalp tsvái
- 'Viertel vor drei' -> fír-tel fo-a drái
- 'kurz vor 4' -> kurts fo-a fí-a
- 'fünf nach 4' -> fúnf naj fí-a
- 'gleich 4' -> glaij fí-a

EVALUACIÓN:
Si la transcripción actual ya es PERFECTA según estas reglas, responde ÚNICAMENTE con la palabra: CORRECTO.
De lo contrario, devuelve ÚNICAMENTE la transcripción fonética separada por guiones y con la tilde en la sílaba tónica. SIN explicaciones, SIN corchetes, SIN barras.`;

    const prompt = `Palabra alemana: "${wordObj.de}"
Pronunciación actual en la base de datos: "${currentPron}"

Tu instrucción:
1. Compara la pronunciación actual con la pronunciación fonética alemana recomendada para hispanohablantes (usando solo letras en español, guiones y tildes).
2. Si la pronunciación actual es perfecta y correcta, debes responder UNICAMENTE con la palabra "CORRECTO".
3. Si la pronunciación actual tiene errores, debes responder UNICAMENTE con la transcripción fonética correcta (ejemplo: "fúnf", o "fí-a"), sin preámbulos, sin barra inclinada, sin corchetes y sin flechas.`;

    let attempts = 0;
    const maxAttempts = 3;
    let requestSuccess = false;

    while (attempts < maxAttempts && !requestSuccess) {
      try {
        const result = await fal.subscribe("fal-ai/any-llm", {
          input: {
            model: "google/gemini-flash-1.5",
            system_prompt: systemPrompt,
            prompt: prompt,
            temperature: 0.0
          }
        });
        
        const responseText = result.data.output.trim();
        let cleanResponse = cleanChattyResponse(responseText);

        if (cleanResponse === "CORRECTO") {
          console.log(`   ✅ La pronunciación actual es CORRECTA.`);
          skippedCount++;
        } else if (cleanResponse) {
          console.log(`   ✨ Corrección fonética recibida: "${cleanResponse}" (Raw: "${responseText.replace(/\n/g, ' ')}")`);
          
          // Actualizar el campo pron
          wordObj.pron = cleanResponse;
          
          // Re-serializar y actualizar chaptersText en memoria
          const newWordText = serializeObject(wordObj);
          
          // Recargar el archivo original fresco y aplicar el reemplazo exacto
          content = fs.readFileSync(chaptersPath, 'utf-8');
          content = content.replace(matchInfo.text, newWordText);
          fs.writeFileSync(chaptersPath, content, 'utf-8');
          
          // Actualizar en memoria para el bucle
          matchInfo.text = newWordText;
          successCount++;
        } else {
          console.log(`   ⚠️ No se pudo autolimpiar la respuesta. Intentando de nuevo...`);
          attempts++;
          await delay(2000);
          continue;
        }
        requestSuccess = true;

      } catch (error) {
        attempts++;
        console.error(`   ❌ Intento ${attempts} fallido para "${wordObj.de}":`, error.message);
        if (attempts < maxAttempts) {
          console.log(`🕒 Esperando 5s antes de reintentar...`);
          await delay(5000);
        } else {
          errorCount++;
        }
      }
    }

    // Esperar 0.5 segundos antes de la siguiente petición (Fal.ai robusto)
    if (i < pendingWords.length - 1) {
      console.log(`🕒 Esperando 0.5s...`);
      await delay(500);
    }
  }

  console.log("\n==================================================");
  console.log("🏁 Auditoría y Corrección Fonética finalizada.");
  console.log(`✅ Corregidas: ${successCount}`);
  console.log(`⏭️ Correctas (Sin cambios): ${skippedCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log("==================================================");
}

main();
