import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vocabPath = path.join(__dirname, '../vocabulario_completo.json');
const referencePath = path.join(__dirname, 'vocabulario.json');

// Inicializar la API de Gemini
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: No se encontró la API Key de Gemini en las variables de entorno (GEMINI_API_KEY / VITE_GEMINI_API_KEY).");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
  generationConfig: {
    responseMimeType: "application/json"
  }
});

const systemInstruction = `Eres un profesor de alemán experto en pedagogía para hispanohablantes de nivel A1. Tu tarea es tomar la palabra proporcionada y generar una oración de ejemplo muy básica, natural y útil para la vida diaria.

REGLAS ESTRICTAS DE SINTAXIS A1 (¡NO ROMPER!):
1. Regla de Oro (Posición 2): El verbo conjugado DEBE estar estrictamente en la segunda posición lógica de la oración.
2. Ingeniería Sintáctica (Sin Declinación de Adjetivos): NO uses adjetivos declinados antes del sustantivo. Separa los adjetivos usando el verbo 'sein'. (Ejemplo OBLIGATORIO: Escribe "Ich habe ein Auto. Das Auto ist blau" en lugar de "Ich habe ein blaues Auto").
3. Anclaje de Género: Si la palabra es un sustantivo, la oración debe dejar absolutamente claro si usa 'der', 'die' o 'das'.
4. TeKaMoLo: Si usas tiempo y lugar en la oración, el bloque de TIEMPO siempre va antes que el de LUGAR.
5. Efecto Pinza (Satzklammer): Si usas un verbo separable, el prefijo debe ir al final absoluto de la oración.
6. Cero Jerga: Usa solo el vocabulario de supervivencia más básico (presentaciones, comida, viajes, familia).

Devuelve EXCLUSIVAMENTE un objeto JSON válido con 2 campos:
- 'exampleSentenceDe': La oración exacta en alemán cumpliendo las reglas.
- 'exampleSentenceEs': La traducción natural y directa al español.
Nada de markdown, solo el JSON crudo.`;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log("📖 Cargando base de datos de vocabulario...");
  
  if (!fs.existsSync(vocabPath)) {
    console.error(`❌ ERROR: No se encontró el archivo de vocabulario en: ${vocabPath}`);
    process.exit(1);
  }
  
  const vocabData = JSON.parse(fs.readFileSync(vocabPath, 'utf-8'));
  let referenceVocab = [];
  if (fs.existsSync(referencePath)) {
    referenceVocab = JSON.parse(fs.readFileSync(referencePath, 'utf-8'));
  }
  
  console.log(`📚 Total de palabras a procesar: ${vocabData.length}`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < vocabData.length; i++) {
    const item = vocabData[i];

    // Evitar sobreescribir si ya tiene oraciones
    if (item.exampleSentenceDe && item.exampleSentenceEs) {
      skipCount++;
      continue;
    }

    const ref = referenceVocab.find(v => v.de === item.word);
    const esTranslation = ref ? ref.es : '';
    const wordType = ref ? ref.type : '';

    console.log(`\n🔄 [${i + 1}/${vocabData.length}] Procesando: "${item.word}" (${wordType || 'Sin categoría'})`);

    const userPrompt = `Genera una oración para:
Palabra en alemán: "${item.word}"
Traducción al español: "${esTranslation || 'Desconocida'}"
Categoría/Tipo gramatical: "${wordType || 'Desconocida'}"`;

    try {
      const result = await model.generateContent({
        contents: [
          { role: "user", parts: [{ text: userPrompt }] }
        ],
        systemInstruction: systemInstruction
      });

      const responseText = result.response.text().trim();
      let cleanText = responseText;
      
      // Limpieza por si Gemini incluye envoltorios markdown a pesar de responseMimeType
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(cleanText);

      if (parsed.exampleSentenceDe && parsed.exampleSentenceEs) {
        item.exampleSentenceDe = parsed.exampleSentenceDe.trim();
        item.exampleSentenceEs = parsed.exampleSentenceEs.trim();
        successCount++;
        console.log(`   🇩🇪 DE: ${item.exampleSentenceDe}`);
        console.log(`   🇪🇸 ES: ${item.exampleSentenceEs}`);

        // Escribir en caliente al archivo para persistir en caso de fallos
        fs.writeFileSync(vocabPath, JSON.stringify(vocabData, null, 2), 'utf-8');
      } else {
        throw new Error("El JSON devuelto no tiene los campos requeridos.");
      }

    } catch (error) {
      errorCount++;
      console.error(`   ❌ Error al procesar "${item.word}":`, error.message);
    }

    // Esperar 4.2 segundos antes de la siguiente petición
    if (i < vocabData.length - 1) {
      await delay(4200);
    }
  }

  console.log("\n==================================================");
  console.log("🏁 Proceso de generación finalizado.");
  console.log(`✅ Exitosas: ${successCount}`);
  console.log(`⏭️ Saltadas: ${skipCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log("==================================================");
}

main();
