const fs = require('fs');

// 1. Test splitGermanTitle implementation
function splitGermanTitle(text) {
  if (!text || typeof text !== 'string') return { main: '', code: null };

  if (text.includes('\n')) {
    const [main, ...rest] = text.split('\n');
    return { main: main.trim(), code: rest.join('\n').trim() || null };
  }

  const match = text.match(/^(.*?)\s*(\([^)]+\))$/);
  if (match && match[1].trim() && match[2].trim()) {
    return { main: match[1].trim(), code: match[2].trim() };
  }

  return { main: text.trim(), code: null };
}

const chaptersContent = fs.readFileSync('src/data/chapters.jsx', 'utf8');

// Extract all words from Chapter 21
const chap21Block = chaptersContent.substring(chaptersContent.indexOf('id": 21'));
const wordsMatch = chap21Block.match(/\"words\":\s*\[([\s\S]*?)\]\s*\n\s*\}/);

if (!wordsMatch) {
  console.error("Could not locate Chapter 21 words array!");
  process.exit(1);
}

const wordsRaw = JSON.parse('[' + wordsMatch[1].trim() + ']');
console.log(`Verifying ${wordsRaw.length} words from Kapitel 21...`);

let issues = 0;
wordsRaw.forEach((w, index) => {
  const { main, code } = splitGermanTitle(w.de);
  if (!main || !code || !code.startsWith('(das Zeichen')) {
    console.error(`Word #${index + 1} (${w.de}) failed split!`, { main, code });
    issues++;
  }
});

if (issues === 0) {
  console.log(`✅ All ${wordsRaw.length} terms in Kapitel 21 split perfectly into Main Title and (das Zeichen ...) code!`);
  console.log('Sample verifications:');
  console.log('  1.', wordsRaw[0].de, '=>', splitGermanTitle(wordsRaw[0].de));
  console.log('  2.', wordsRaw[1].de, '=>', splitGermanTitle(wordsRaw[1].de));
  console.log('  3.', wordsRaw[2].de, '=>', splitGermanTitle(wordsRaw[2].de));
  console.log('  69.', wordsRaw[68].de, '=>', splitGermanTitle(wordsRaw[68].de));
} else {
  console.error(`❌ Found ${issues} issues.`);
  process.exit(1);
}
