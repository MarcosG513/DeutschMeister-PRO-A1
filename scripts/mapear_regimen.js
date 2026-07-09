import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chaptersPath = path.resolve(__dirname, '../src/data/chapters.jsx');

const rules = {
  // Kapitel 1
  "anfangen": "Separable (an-)",
  "aufhören": "Separable (auf-)",
  "dauern": "Duración",
  "von ... bis ...": "Rango (de ... a ...)",
  "ab": "Punto de inicio",
  // Kapitel 2
  "heißen": "+ Nominativo",
  "buchstabieren": "+ Akkusativ",
  "anrufen": "Separable (an-) / + Akkusativ",
  "sich anmelden": "Reflexivo / Separable (an-)",
  "ausfüllen": "Separable (aus-)",
  "Formular ausfüllen": "Separable (aus-)",
  // Kapitel 4
  "mit": "⚠️ Obliga Dativo",
  "wo": "Estático (+ Dativo)",
  "wohin": "Movimiento (+ Akkusativ)",
  "einsteigen": "Separable (ein-)",
  "aussteigen": "Separable (aus-)",
  "umsteigen": "Separable (um-)",
  "abfahren": "Separable (ab-)",
  "abfliegen": "Separable (ab-)",
  "ankommen": "Separable (an-)",
  // Kapitel 5 & 6
  "essen": "Irregular / + Akkusativ",
  "trinken": "+ Akkusativ",
  "kaufen": "+ Akkusativ",
  "einkaufen": "Separable (ein-)",
  "nehmen": "Irregular (nimmt) / + Akkusativ",
  "es gibt": "⚠️ + Akkusativ",
  "brauchen": "+ Akkusativ",
  "geben": "Dativo (a quién) + Akkusativ (qué)",
  "helfen": "+ Dativo",
  // Kapitel 7
  "gefallen": "+ Dativo",
  "passen": "+ Dativo",
  // Kapitel 8
  "schicken": "+ Dativo (a quién) / + Akkusativ (qué)",
  "überweisen": "Inseparable / + Akkusativ",
  "ankreuzen": "Separable (an-)",
  // Kapitel 9
  "wehtun": "+ Dativo (a quién duele)",
  "weh tun": "+ Dativo (a quién duele)",
  // Kapitel 12
  "betanken": "Inseparable / + Akkusativ",
  "losfahren": "Separable (los-)",
  "abstellen": "Separable (ab-)",
  "abbiegen": "Separable (ab-)",
  "anfahren": "Separable (an-)",
  "zusammenstoßen": "Separable (zusammen-)",
  "tanken": "+ Akkusativ",
  "hupen": "Regular",
  "bremsen": "Regular",
  "parken": "Regular",
  "warten": "Regular"
};

// Helper para parsear un bloque de objeto literal de JavaScript
function parseObjectLiteral(str) {
  try {
    return new Function('return ' + str)();
  } catch (e) {
    return null;
  }
}

// Helper para serializar de vuelta a formato literal JS preservando propiedades
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
  const isWriteMode = process.argv.includes('--write');
  
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

  const matchesFound = [];

  for (const m of matches) {
    const obj = parseObjectLiteral(m.text);
    if (obj && obj.de) {
      // Buscar coincidencia exacta o coincidencia en caso de verbos compuestos
      let ruleKey = null;
      
      if (rules[obj.de]) {
        ruleKey = obj.de;
      } else {
        // Buscar subcoincidencias lógicas de verbos o palabras
        const cleanDe = obj.de.replace(/^(der|die|das)\s+/, "").trim();
        if (rules[cleanDe]) {
          ruleKey = cleanDe;
        }
      }

      if (ruleKey) {
        matchesFound.push({
          matchInfo: m,
          wordObj: obj,
          regimen: rules[ruleKey]
        });
      }
    }
  }

  console.log(`📚 Encontradas ${matches.length} palabras totales en chapters.jsx.`);
  console.log(`🎯 Encontradas ${matchesFound.length} coincidencias con reglas gramaticales.`);

  // Generar tabla de visualización
  console.log("\n📋 MUESTRA DE PALABRAS A ACTUALIZAR (Primeras 15 coincidencias):");
  console.log("-------------------------------------------------------------------------------------");
  console.log(String("PALABRA").padEnd(25) + " | " + String("TIPO").padEnd(15) + " | " + String("NUEVO RÉGIMEN").padEnd(35));
  console.log("-------------------------------------------------------------------------------------");
  
  const limit = Math.min(matchesFound.length, 15);
  for (let i = 0; i < limit; i++) {
    const { wordObj, regimen } = matchesFound[i];
    console.log(
      String(wordObj.de).padEnd(25) + " | " + 
      String(wordObj.type || "N/A").padEnd(15) + " | " + 
      String(regimen).padEnd(35)
    );
  }
  console.log("-------------------------------------------------------------------------------------");

  if (isWriteMode) {
    console.log("\n💾 Escribiendo cambios en src/data/chapters.jsx...");
    let updatedContent = fs.readFileSync(chaptersPath, 'utf-8');
    
    // Iteramos de forma reversa o reemplazamos secuencialmente los textos originales
    for (const match of matchesFound) {
      const updatedObj = { ...match.wordObj, regimen: match.regimen };
      const serialized = serializeObject(updatedObj);
      updatedContent = updatedContent.replace(match.matchInfo.text, serialized);
    }
    
    fs.writeFileSync(chaptersPath, updatedContent, 'utf-8');
    console.log("✨ ¡Base de datos de vocabulario chapters.jsx actualizada exitosamente!");
  } else {
    console.log("\nℹ️ Modo previsualización activo. Para persistir los cambios, ejecuta:");
    console.log("   node scripts/mapear_regimen.js --write");
  }
}

main();
