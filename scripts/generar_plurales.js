import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chaptersPath = path.join(__dirname, '../src/data/chapters.jsx');

// Inicializar la API de Gemini
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: No se encontró la API Key de Gemini en las variables de entorno (GEMINI_API_KEY / VITE_GEMINI_API_KEY).");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash"
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper para parsear un bloque de objeto literal de JavaScript
function parseObjectLiteral(str) {
  try {
    return new Function('return ' + str)();
  } catch (e) {
    console.error("❌ Error parseando bloque:", str);
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

async function main() {
  console.log("📖 Cargando y analizando src/data/chapters.jsx...");
  
  if (!fs.existsSync(chaptersPath)) {
    console.error(`❌ ERROR: No se encontró el archivo chapters.jsx en: ${chaptersPath}`);
    process.exit(1);
  }
  
  let content = fs.readFileSync(chaptersPath, 'utf-8');
  
  // Aislar el bloque de 'chapters' para evitar tocar slides u otros componentes
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
  
  // Encontrar todas las palabras y sus posiciones en chaptersText
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
  
  // Filtrar palabras que requieran procesamiento (Sustantivos sin plural)
  const pendingWords = [];
  for (const m of matches) {
    const obj = parseObjectLiteral(m.text);
    if (obj) {
      const typeLower = (obj.type || "").toLowerCase();
      const isSustantivo = typeLower.includes("sustantivo");
      const needsPlural = !obj.plural || obj.plural.trim() === "";
      
      if (isSustantivo && needsPlural) {
        pendingWords.push({
          matchInfo: m,
          wordObj: obj
        });
      }
    }
  }
  
  console.log(`🔍 Se identificaron ${pendingWords.length} sustantivos que requieren buscar su plural.`);
  
  if (pendingWords.length === 0) {
    console.log("✅ Todos los sustantivos ya tienen su plural asignado.");
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  // Procesar palabras de una en una con retraso de 4.2s (Protección Rate Limit)
  for (let i = 0; i < pendingWords.length; i++) {
    const { matchInfo, wordObj } = pendingWords[i];
    console.log(`\n🔄 [${i + 1}/${pendingWords.length}] Buscando plural para: "${wordObj.de}"...`);

    const prompt = `Eres un experto lexicógrafo de alemán. Necesito la forma plural para el sustantivo: '${wordObj.de}'. 
REGLAS:
1. Responde ÚNICAMENTE con el artículo plural 'die' seguido de la palabra en plural (ej. 'die Äpfel').
2. Si la palabra NO tiene plural (Singularetantum), responde exactamente con estos tres guiones: '---'.
3. CERO texto adicional, sin comillas, sin puntos finales, sin explicaciones.`;

    try {
      const result = await model.generateContent(prompt);
      const rawText = result.response.text().trim();
      
      // Limpieza de posibles marcas de formato markdown/comillas
      let cleanPlural = rawText
        .replace(/^["'`\s]+|["'`\s]+$/g, "")
        .replace(/[.!?]+$/, "")
        .trim();
        
      if (cleanPlural.toLowerCase().startsWith("plural:")) {
        cleanPlural = cleanPlural.substring(7).trim();
      }

      console.log(`   ✨ Resultado: "${cleanPlural}"`);
      
      // Añadir la propiedad plural al objeto
      wordObj.plural = cleanPlural;
      
      // Re-serializar y actualizar chaptersText en memoria
      const newWordText = serializeObject(wordObj);
      
      // Recargar el archivo original fresco y aplicar el reemplazo exacto
      content = fs.readFileSync(chaptersPath, 'utf-8');
      
      // Para mayor seguridad, reemplazamos el texto original exacto en el archivo general
      content = content.replace(matchInfo.text, newWordText);
      fs.writeFileSync(chaptersPath, content, 'utf-8');
      
      // Actualizar el texto que tenemos en memoria para el bucle
      matchInfo.text = newWordText;
      successCount++;

    } catch (error) {
      errorCount++;
      console.error(`   ❌ Error al consultar Gemini para "${wordObj.de}":`, error.message);
    }

    // Esperar 4.2 segundos antes de la siguiente petición
    if (i < pendingWords.length - 1) {
      console.log(`🕒 Esperando 4.2s para evitar Rate Limit...`);
      await delay(4200);
    }
  }

  console.log("\n==================================================");
  console.log("🏁 Proceso de generación de plurales finalizado.");
  console.log(`✅ Exitosos: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log("==================================================");
}

main();
