import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chaptersPath = path.join(__dirname, '../src/data/chapters.jsx');

// Pedagogy sequence definition
const sequence = [
  { id: 0, newTitle: "Kapitel 1: Alphabet & Zahlen" },
  { id: 1, newTitle: "Kapitel 2: Zeit & Datum" },
  { id: 2, newTitle: "Kapitel 3: Personen & Kontakte" },
  { id: 14, newTitle: "Kapitel 4: Basisverben & Adjektive" },
  { id: 15, newTitle: "Kapitel 5: Adverbien & Fragewörter" },
  { id: 13, newTitle: "Kapitel 6: Grammatik: Konnektoren" },
  { id: 3, newTitle: "Kapitel 7: Wohnen" },
  { id: 5, newTitle: "Kapitel 8: Essen & Trinken" },
  { id: 10, newTitle: "Kapitel 9: Kleidung" },
  { id: 6, newTitle: "Kapitel 10: Einkaufen" },
  { id: 4, newTitle: "Kapitel 11: Freizeit" },
  { id: 7, newTitle: "Kapitel 12: Reisen & Verkehr" },
  { id: 12, newTitle: "Kapitel 13: Fahrschuldeutsch: Auto" },
  { id: 8, newTitle: "Kapitel 14: Post & Bank" },
  { id: 9, newTitle: "Kapitel 15: Gesundheit" },
  { id: 11, newTitle: "Kapitel 16: Schule & Beruf" },
  { id: 17, newTitle: "Kapitel 17: Digitale Welt & IT" },
  { id: 16, newTitle: "Kapitel 18: Elektrotechnik & Solar" }
];

function reorderChapters() {
  console.log("📖 Reading chapters.jsx...");
  const content = fs.readFileSync(chaptersPath, 'utf8');

  // Locate chapters array boundaries
  const startKeyword = 'const chapters =';
  const startIdx = content.indexOf(startKeyword);
  if (startIdx === -1) {
    throw new Error("Could not find 'const chapters ='");
  }

  const arrayStartIdx = content.indexOf('[', startIdx);
  if (arrayStartIdx === -1) {
    throw new Error("Could not find start bracket '[' of chapters array");
  }

  // Bracket parser to find matching closing bracket of chapters array
  let bracketCount = 1;
  let inString = false;
  let stringChar = null;
  let i = arrayStartIdx + 1;

  while (i < content.length && bracketCount > 0) {
    const char = content[i];
    if (inString) {
      if (char === stringChar && content[i - 1] !== '\\') {
        inString = false;
      }
    } else if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
    } else if (char === '[') {
      bracketCount++;
    } else if (char === ']') {
      bracketCount--;
    }
    if (bracketCount === 0) break;
    i++;
  }

  if (bracketCount > 0) {
    throw new Error("Unmatched bracket for chapters array");
  }

  const beforeArray = content.substring(0, arrayStartIdx + 1);
  const afterArray = content.substring(i);
  const arrayContentText = content.substring(arrayStartIdx + 1, i);

  console.log("🧱 Parsing individual chapter objects from string content...");

  // Parse individual chapter objects as strings
  const chapterStrings = [];
  let braceCount = 0;
  let inStr = false;
  let strChar = null;
  let start = 0;
  let insideObject = false;

  for (let j = 0; j < arrayContentText.length; j++) {
    const char = arrayContentText[j];

    if (inStr) {
      if (char === strChar && arrayContentText[j - 1] !== '\\') {
        inStr = false;
      }
    } else if (char === '"' || char === "'" || char === '`') {
      inStr = true;
      strChar = char;
    } else if (char === '{') {
      if (braceCount === 0) {
        start = j;
        insideObject = true;
      }
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0 && insideObject) {
        chapterStrings.push(arrayContentText.substring(start, j + 1));
        insideObject = false;
      }
    }
  }

  console.log(`📊 Found ${chapterStrings.length} chapter objects.`);
  if (chapterStrings.length !== 18) {
    throw new Error(`Expected exactly 18 chapters, but found ${chapterStrings.length}`);
  }

  // Map chapters by their IDs
  const chaptersById = {};
  chapterStrings.forEach(chapterStr => {
    // Extract ID (e.g. id: 14,)
    const idMatch = chapterStr.match(/id:\s*(\d+)/);
    if (!idMatch) {
      throw new Error(`Could not find id in chapter:\n${chapterStr.substring(0, 100)}`);
    }
    const id = parseInt(idMatch[1], 10);
    chaptersById[id] = chapterStr;
  });

  // Reorder and update titles
  const orderedChapterStrings = [];
  sequence.forEach((seq, idx) => {
    const originalStr = chaptersById[seq.id];
    if (!originalStr) {
      throw new Error(`Missing chapter with ID ${seq.id} in chapters.jsx`);
    }

    // Replace the title property
    // Matches: title: "..." or title: '...' or title: `...`
    const updatedStr = originalStr.replace(/title:\s*["'`]([^"'`]+)["'`]/, `title: "${seq.newTitle}"`);
    orderedChapterStrings.push(updatedStr);
  });

  // Reassemble the file content
  const newArrayContent = '\n' + orderedChapterStrings.join(',\n') + '\n';
  const finalFileContent = beforeArray + newArrayContent + afterArray;

  console.log("💾 Writing modified content back to chapters.jsx...");
  fs.writeFileSync(chaptersPath, finalFileContent, 'utf8');
  console.log("🎉 Reordering and title updates completed successfully!");
}

try {
  reorderChapters();
} catch (error) {
  console.error("❌ Error running reorder script:", error.message);
  process.exit(1);
}
