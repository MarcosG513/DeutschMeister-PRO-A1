// scripts/inject_kapitel22_chapters.cjs
const fs = require('fs');
const path = require('path');

const chaptersPath = path.join(__dirname, '..', 'src', 'data', 'chapters.jsx');
let content = fs.readFileSync(chaptersPath, 'utf8');

// 1. Añadir MessageCircle a lucide-react si no está
if (!content.includes('MessageCircle') || !content.slice(0, 1000).includes('MessageCircle')) {
  content = content.replace(
    "import { Activity, BookOpen,",
    "import { MessageCircle, Activity, BookOpen,"
  );
  console.log("✓ MessageCircle añadido a las importaciones de lucide-react");
}

// 2. Importar redemittelChapter
if (!content.includes("from './redemittelBegegnungen'")) {
  const importTarget = "import GoetheSprechenExam from '../components/GoetheSprechenExam';";
  if (content.includes(importTarget)) {
    content = content.replace(
      importTarget,
      `${importTarget}\nimport { redemittelChapter } from './redemittelBegegnungen';`
    );
    console.log("✓ import { redemittelChapter } añadido");
  } else {
    console.error("❌ No se encontró el punto de inserción para redemittelChapter");
    process.exit(1);
  }
}

// 3. Añadir a rawChapters antes de ];\n\nexport const chapters
const marker = "\nexport const chapters = [...rawChapters].sort((a, b) => a.id - b.id);";
if (!content.includes(marker)) {
  console.error("❌ No se encontró el marcador export const chapters");
  process.exit(1);
}

if (!content.includes("...redemittelChapter")) {
  // Buscamos el último ]; antes del marker
  const markerIdx = content.indexOf(marker);
  const beforeMarker = content.slice(0, markerIdx);
  const afterMarker = content.slice(markerIdx);

  const lastBracketIdx = beforeMarker.lastIndexOf("];");
  if (lastBracketIdx === -1) {
    console.error("❌ No se encontró ]; antes de export const chapters");
    process.exit(1);
  }

  const newBefore = beforeMarker.slice(0, lastBracketIdx) + `,\n{\n  ...redemittelChapter,\n  icon: <MessageCircle size={20} />\n}\n];`;
  content = newBefore + afterMarker;
  console.log("✓ redemittelChapter inyectado en rawChapters");
} else {
  console.log("ℹ️ redemittelChapter ya estaba en rawChapters");
}

fs.writeFileSync(chaptersPath, content, 'utf8');
console.log("✅ src/data/chapters.jsx actualizado exitosamente.");
