import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../vocabulario_completo.json');
const chaptersPath = path.join(__dirname, '../src/data/chapters.jsx');

// Configuración de la API de Gemini
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ Error: No se encontró la clave de API en GEMINI_API_KEY o VITE_GEMINI_API_KEY.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-3.5-flash',
  systemInstruction: "Eres un experto en lingüística alemana para nivel A1. Toma la palabra proporcionada y genera una oración muy básica de nivel A1 que la use. Devuelve EXCLUSIVAMENTE un JSON válido con 2 campos: 'exampleSentenceEs' (traducción exacta al español) y 'exampleSentenceDeBlocks' (un array de strings con la oración en alemán dividida en 3 o 4 bloques gramaticales lógicos, ej: ['Ich', 'habe', 'einen kleinen Hund']). Nada de markdown."
});

// Función de retardo
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para serializar objetos JS preservando otros campos
function serializeWordObj(obj) {
  const parts = [];
  if (obj.de !== undefined) parts.push(`de: ${JSON.stringify(obj.de)}`);
  if (obj.pron !== undefined) parts.push(`pron: ${JSON.stringify(obj.pron)}`);
  if (obj.es !== undefined) parts.push(`es: ${JSON.stringify(obj.es)}`);
  if (obj.type !== undefined) parts.push(`type: ${JSON.stringify(obj.type)}`);
  if (obj.category !== undefined) parts.push(`category: ${JSON.stringify(obj.category)}`);
  if (obj.interactiveProps !== undefined) {
    // Si es un objeto, lo serializamos sin comillas en las claves para mantener estilo JSX
    const ipStr = JSON.stringify(obj.interactiveProps);
    parts.push(`interactiveProps: ${ipStr}`);
  }
  if (obj.exampleSentenceEs !== undefined) parts.push(`exampleSentenceEs: ${JSON.stringify(obj.exampleSentenceEs)}`);
  if (obj.exampleSentenceDeBlocks !== undefined) parts.push(`exampleSentenceDeBlocks: ${JSON.stringify(obj.exampleSentenceDeBlocks)}`);
  
  for (const key in obj) {
    if (!['de', 'pron', 'es', 'type', 'category', 'interactiveProps', 'exampleSentenceEs', 'exampleSentenceDeBlocks'].includes(key)) {
      parts.push(`${key}: ${JSON.stringify(obj[key])}`);
    }
  }
  return `{ ${parts.join(', ')} }`;
}

async function main() {
  console.log("📖 Cargando vocabulario desde vocabulario_completo.json...");
  let vocab = [];
  try {
    vocab = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (err) {
    console.error("❌ Error leyendo vocabulario_completo.json:", err.message);
    process.exit(1);
  }

  // Filtrar palabras que no tengan los campos necesarios
  const pendientes = vocab.filter(item => !item.exampleSentenceEs || !item.exampleSentenceDeBlocks);
  console.log(`📊 Palabras en total: ${vocab.length} | Pendientes de procesar: ${pendientes.length}`);

  if (pendientes.length === 0) {
    console.log("✅ ¡Todo el vocabulario ya cuenta con oraciones generadas!");
    process.exit(0);
  }

  // Límite de procesamiento por ejecución (para evitar timeouts y optimizar el Free Tier)
  const LIMIT = 5; // Cambia este límite si deseas procesar más palabras en una sola corrida
  const lote = pendientes.slice(0, LIMIT);
  console.log(`🚀 Procesando un lote de ${lote.length} palabras...`);

  for (let i = 0; i < lote.length; i++) {
    const item = lote[i];
    const palabra = item.word;
    
    // Ignorar palabras que son letras sueltas del alfabeto (A, b, etc.)
    if (palabra.length <= 4 && !palabra.includes(' ') && (palabra.includes(',') || palabra === palabra.toUpperCase())) {
      console.log(`⏭️ Saltando letra o carácter de control: "${palabra}"`);
      item.exampleSentenceEs = "-";
      item.exampleSentenceDeBlocks = [];
      fs.writeFileSync(jsonPath, JSON.stringify(vocab, null, 2), 'utf8');
      continue;
    }

    let success = false;
    let intentos = 0;
    let resultJson = null;

    while (!success && intentos < 3) {
      try {
        console.log(`🤖 [${i + 1}/${lote.length}] Consultando Gemini para: "${palabra}" (Intento ${intentos + 1})...`);
        const response = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: palabra }] }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        });

        const text = response.response.text().trim();
        resultJson = JSON.parse(text);

        if (resultJson.exampleSentenceEs && resultJson.exampleSentenceDeBlocks) {
          success = true;
        } else {
          throw new Error("Respuesta de API inválida o incompleta.");
        }
      } catch (err) {
        intentos++;
        console.warn(`⚠️ Error procesando "${palabra}": ${err.message}`);
        if (intentos < 3) {
          console.log("⏳ Esperando 10 segundos antes de reintentar...");
          await sleep(10000);
        }
      }
    }

    if (success && resultJson) {
      console.log(`✅ Éxito para "${palabra}":`);
      console.log(`   🇩🇪 DE: ${JSON.stringify(resultJson.exampleSentenceDeBlocks)}`);
      console.log(`   🇪🇸 ES: "${resultJson.exampleSentenceEs}"`);

      // 1. Actualizar en vocabulario_completo.json
      item.exampleSentenceEs = resultJson.exampleSentenceEs;
      item.exampleSentenceDeBlocks = resultJson.exampleSentenceDeBlocks;
      fs.writeFileSync(jsonPath, JSON.stringify(vocab, null, 2), 'utf8');

      // 2. Actualizar en src/data/chapters.jsx
      try {
        let chaptersContent = fs.readFileSync(chaptersPath, 'utf8');
        // Regex para capturar este objeto literal de palabra en alemán
        const wordRegex = new RegExp(`(\\{\\s*de:\\s*${JSON.stringify(palabra)}[^\}]*?\\})`, 'g');
        
        chaptersContent = chaptersContent.replace(wordRegex, (match) => {
          try {
            // Evaluar el literal original
            const originalObj = new Function('return ' + match)();
            // Extenderlo con las nuevas propiedades
            const updatedObj = {
              ...originalObj,
              exampleSentenceEs: resultJson.exampleSentenceEs,
              exampleSentenceDeBlocks: resultJson.exampleSentenceDeBlocks
            };
            return serializeWordObj(updatedObj);
          } catch (e) {
            console.error("⚠️ Error actualizando objeto en chapters.jsx:", e.message);
            return match;
          }
        });

        // Guardar estrictamente en UTF-8
        fs.writeFileSync(chaptersPath, chaptersContent, 'utf8');
        console.log(`💾 src/data/chapters.jsx actualizado para "${palabra}"`);
      } catch (err) {
        console.error("❌ Error guardando en chapters.jsx:", err.message);
      }
    } else {
      console.error(`❌ Falló la generación para "${palabra}" tras 3 intentos.`);
    }

    // Espera obligatoria para respetar el límite de 10 peticiones/minuto (Free Tier)
    if (i < lote.length - 1) {
      console.log(`⏳ Esperando 6.2 segundos para la siguiente consulta...`);
      await sleep(6200);
    }
  }

  console.log("🎉 Lote procesado exitosamente.");
}

main().catch(err => {
  console.error("❌ Error fatal en la ejecución:", err);
});
