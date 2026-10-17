// scripts/sync_kapitel22_and_docs.cjs
const fs = require('fs');
const path = require('path');

function getSafeId(str) {
  return Buffer.from(encodeURIComponent(str)).toString('base64').replace(/[\/+=]/g, '_');
}

// 1. Cargar las palabras de Kapitel 22
const redemittelFile = path.join(__dirname, '..', 'src', 'data', 'redemittelBegegnungen.js');
const fileRaw = fs.readFileSync(redemittelFile, 'utf8');

// Extraer el objeto exportado
const jsonStart = fileRaw.indexOf('export const redemittelChapter =');
const codeToEval = fileRaw.slice(jsonStart).replace('export const redemittelChapter =', 'module.exports =');
const tempFile = path.join(__dirname, 'temp_redemittel.cjs');
fs.writeFileSync(tempFile, codeToEval, 'utf8');
const redemittelChapter = require(tempFile);
fs.unlinkSync(tempFile);

const words = redemittelChapter.words;
console.log(`[Kapitel 22] Palabras cargadas: ${words.length}`);

// -------------------------------------------------------------
// FASE 4.1: Sincronización en vocabulario_completo.json
// -------------------------------------------------------------
console.log('\n[FASE 4.1] Sincronizando vocabulario_completo.json...');
const vocabPath = path.join(__dirname, '..', 'vocabulario_completo.json');
let vocabList = [];
if (fs.existsSync(vocabPath)) {
  vocabList = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
}

let addedCount = 0;
let updatedCount = 0;

words.forEach(w => {
  const safeId = getSafeId(w.de);
  const vocabItem = {
    id: safeId,
    word: w.de,
    audioDe: w.audioDe,
    exampleSentenceDe: w.exampleSentenceDe,
    exampleSentenceEs: w.exampleSentenceEs
  };

  const existingIdx = vocabList.findIndex(v => v.id === safeId);
  if (existingIdx !== -1) {
    vocabList[existingIdx] = { ...vocabList[existingIdx], ...vocabItem };
    updatedCount++;
  } else {
    vocabList.push(vocabItem);
    addedCount++;
  }
});

fs.writeFileSync(vocabPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`  ✓ vocabulario_completo.json sincronizado: ${addedCount} añadidos, ${updatedCount} actualizados.`);
console.log(`  ✓ Total entradas en vocabulario_completo.json: ${vocabList.length}`);

// -------------------------------------------------------------
// FASE 4.2: Generación de docs/kapitel_22_redemittel_tabelle.md
// -------------------------------------------------------------
console.log('\n[FASE 4.2] Generando docs/kapitel_22_redemittel_tabelle.md...');
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

let md = `# 💬 Kapitel 22: Redemittel & Alltagskommunikation
### Begegnungen A1+ — Catálogo Maestro de Expresiones Comunicativas Oficiales (Goethe-Zertifikat A1)

> **Total de Expresiones Comunicativas:** ${words.length} estructuras, preguntas, respuestas y plantillas extraídas íntegramente del catálogo oficial *Begegnungen A1+ Redemittel* (Schubert Verlag). Equipadas con soporte acústico de síntesis por voz oficial Charon (\`audioDe\`), transcripción fonética adaptada al español, traducción pedagógica funcional, régimen gramatical detallado y oraciones de contexto real para los módulos de *Sprechen* (Teil 1, 2 y 3) y *Schreiben* (Teil 1 y 2).

| # | Redemittel (Alemán con Plantilla) | Lautschrift (Pronunciación) | Spanisch (Traducción Funcional) | Typ / Funktion | Kategorie | Grammatik / Regimen | Beispielsatz Deutsch | Beispielsatz Spanisch |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;

words.forEach((w, idx) => {
  const deFormatted = `**${w.de.replace(/\|/g, '\\|')}**`;
  const pronFormatted = `*${w.pron.replace(/\|/g, '\\|')}*`;
  const esFormatted = w.es.replace(/\|/g, '\\|');
  const typeFormatted = `\`${w.type.replace(/\|/g, '\\|')}\``;
  const catFormatted = w.category.replace(/\|/g, '\\|');
  const regFormatted = w.regimen.replace(/\|/g, '\\|');
  const exDe = w.exampleSentenceDe.replace(/\|/g, '\\|');
  const exEs = w.exampleSentenceEs.replace(/\|/g, '\\|');

  md += `| ${idx + 1} | ${deFormatted} | ${pronFormatted} | ${esFormatted} | ${typeFormatted} | ${catFormatted} | ${regFormatted} | ${exDe} | ${exEs} |\n`;
});

const mdPath = path.join(docsDir, 'kapitel_22_redemittel_tabelle.md');
fs.writeFileSync(mdPath, md, 'utf8');
console.log(`  ✓ Documentación generada exitosamente en ${mdPath}`);
console.log('✅ Fase 4.1 y 4.2 finalizadas con éxito.');
