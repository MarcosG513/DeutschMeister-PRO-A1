import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chaptersPath = path.join(__dirname, '../src/data/chapters.jsx');

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

function cleanPron(pronRaw) {
  if (!pronRaw) return "";
  let clean = pronRaw;
  
  // 1. Elimina cualquier prefijo que termine en una flecha:
  clean = clean.replace(/.*?->\s*/, '');
  
  // 2. Elimina todos los corchetes, barras diagonales, paréntesis y puntos finales:
  clean = clean.replace(/[\/\[\]\(\)\.]/g, '');
  
  // 3. Convierte el string resultante completamente a minúsculas:
  clean = clean.toLowerCase();
  
  // 4. Limpia espacios en blanco sobrantes a los lados:
  clean = clean.trim();
  
  return clean;
}

function main() {
  console.log("📖 Leyendo archivo src/data/chapters.jsx...");
  if (!fs.existsSync(chaptersPath)) {
    console.error("❌ ERROR: No se encontró chapters.jsx");
    process.exit(1);
  }
  
  let content = fs.readFileSync(chaptersPath, 'utf-8');
  const wordRegex = /\{\s*de:\s*"[^"]+"[\s\S]*?\}/g;
  
  let matches = [];
  let match;
  while ((match = wordRegex.exec(content)) !== null) {
    matches.push({
      text: match[0],
      index: match.index
    });
  }
  
  console.log(`🔍 Analizando ${matches.length} palabras...`);
  let cleanCount = 0;
  
  for (const m of matches) {
    const obj = parseObjectLiteral(m.text);
    if (obj && typeof obj.pron === 'string') {
      const pronRaw = obj.pron;
      const pronClean = cleanPron(pronRaw);
      
      if (pronRaw !== pronClean) {
        obj.pron = pronClean;
        const serialized = serializeObject(obj);
        content = content.replace(m.text, serialized);
        m.text = serialized; // Actualizar referencia para evitar desalineación
        cleanCount++;
      }
    }
  }
  
  if (cleanCount > 0) {
    fs.writeFileSync(chaptersPath, content, 'utf-8');
    console.log(`🎉 Limpieza profunda completada. Se normalizaron ${cleanCount} pronunciaciones.`);
  } else {
    console.log("✅ Todas las pronunciaciones ya se encuentran limpias.");
  }
}

main();
