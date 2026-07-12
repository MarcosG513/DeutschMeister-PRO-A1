import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extraerVocabulario() {
  console.log("🔍 Analizando src/data/chapters.jsx...");
  const chaptersPath = path.join(__dirname, '../src/data/chapters.jsx');
  
  if (!fs.existsSync(chaptersPath)) {
    console.error("❌ No se encontró chapters.jsx en", chaptersPath);
    process.exit(1);
  }

  const content = fs.readFileSync(chaptersPath, 'utf-8');

  // 1. Aislar solo la parte del arreglo 'chapters' para evitar palabras de 'goetheModules'
  const startIdx = content.indexOf('const chapters =');
  const endIdx = content.indexOf('const goetheModules ='); // El siguiente bloque principal
  
  let chaptersText = content;
  if (startIdx !== -1 && endIdx !== -1) {
    chaptersText = content.substring(startIdx, endIdx);
  } else if (startIdx !== -1) {
    chaptersText = content.substring(startIdx);
  }

  // 2. Extraer mediante RegEx todos los objetos literal que comiencen con { de: "..."
  // (Esto evita romper el parsing por culpa del JSX que está en otros atributos como 'icon')
  const regex = /\{\s*de:\s*"[^"]+"[\s\S]*?\}/g;
  const matches = chaptersText.match(regex);
  
  if (!matches) {
    console.error("❌ No se encontraron palabras en chapters.jsx.");
    process.exit(1);
  }

  const words = [];
  
  matches.forEach(match => {
    try {
      // Usar new Function es más seguro que JSON.parse para evaluar literales de JS
      const obj = new Function('return ' + match)();
      
      if (obj && obj.de) {
        words.push({
          de: obj.de.trim(),
          es: (obj.es || "").trim(),
          en: (obj.en || obj.concepto_ingles || "").trim(),
          type: (obj.type || "").trim()
        });
      }
    } catch (e) {
      console.warn("⚠️ No se pudo extraer este bloque de manera segura:", match);
    }
  });

  // 3. Escribir el JSON resultante
  const outPath = path.join(__dirname, 'vocabulario.json');
  fs.writeFileSync(outPath, JSON.stringify(words, null, 2), 'utf-8');

  console.log(`✅ ¡Extracción completada con éxito!`);
  console.log(`📚 Se extrajeron un total de ${words.length} palabras.`);
  console.log(`📂 Archivo guardado en: ${outPath}`);
}

extraerVocabulario();
