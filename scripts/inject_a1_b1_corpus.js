import fs from 'fs';
import path from 'path';
import process from 'node:process';
import { fileURLToPath } from 'url';
import parser from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default || traverseModule;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

export const getSafeId = (str) =>
  btoa(encodeURIComponent(String(str ?? '').trim())).replace(/[/+=]/g, '_');

const PAYLOAD_FILES = [
  'scripts/payloads/batch_1_chapters_1_to_6.json',
  'scripts/payloads/batch_2_chapters_7_to_12.json',
  'scripts/payloads/batch_3_chapters_13_to_18.json',
  'scripts/payloads/batch_4_redemittel_k22.json',
];

function getPropNode(objNode, propName) {
  if (!objNode || objNode.type !== 'ObjectExpression') return null;
  return (
    objNode.properties.find(
      (p) =>
        p.type === 'ObjectProperty' &&
        ((p.key.type === 'Identifier' && p.key.name === propName) ||
          (p.key.type === 'StringLiteral' && p.key.value === propName))
    ) || null
  );
}

function getStringOrNumProp(objNode, propName) {
  const p = getPropNode(objNode, propName);
  if (!p) return undefined;
  if (p.value.type === 'StringLiteral' || p.value.type === 'NumericLiteral') {
    return p.value.value;
  }
  return undefined;
}

function sanitizeWordForChapter(raw) {
  const cleanPlural = String(raw.plural || '')
    .replace(/^(?:Pl(?:ural)?:\s*)/i, '')
    .trim();

  const item = {
    de: String(raw.de || '').trim(),
    pron: String(raw.pron || '').trim(),
    es: String(raw.es || '').trim(),
    type: String(raw.type || '').trim(),
    category: String(raw.category || 'Allgemein').trim(),
    ...(raw.level ? { level: String(raw.level).trim() } : {}),
    ...(raw.regimen ? { regimen: String(raw.regimen).trim() } : {}),
    ...(cleanPlural ? { plural: cleanPlural } : {}),
    ...(raw.en && String(raw.en).trim() ? { en: String(raw.en).trim() } : {}),
    exampleSentenceDe: String(raw.exampleSentenceDe || '').trim(),
    exampleSentenceEs: String(raw.exampleSentenceEs || '').trim(),
    ...(Array.isArray(raw.exampleSentenceDeBlocks) && raw.exampleSentenceDeBlocks.length > 0
      ? { exampleSentenceDeBlocks: raw.exampleSentenceDeBlocks }
      : {}),
  };

  return item;
}

function sanitizeWordForRedemittel(raw) {
  const item = {
    de: String(raw.de || '').trim(),
    audioDe: String(raw.audioDe || raw.de || '').trim(),
    pron: String(raw.pron || '').trim(),
    es: String(raw.es || '').trim(),
    type: String(raw.type || 'Expresión').trim(),
    category: String(raw.category || 'Alltag').trim(),
    ...(raw.level ? { level: String(raw.level).trim() } : {}),
    ...(raw.regimen ? { regimen: String(raw.regimen).trim() } : {}),
    exampleSentenceDe: String(raw.exampleSentenceDe || '').trim(),
    exampleSentenceEs: String(raw.exampleSentenceEs || '').trim(),
    ...(Array.isArray(raw.exampleSentenceDeBlocks) && raw.exampleSentenceDeBlocks.length > 0
      ? { exampleSentenceDeBlocks: raw.exampleSentenceDeBlocks }
      : {}),
  };
  return item;
}

function serializeObjectLiteral(obj, baseIndent = '  ') {
  const jsonLines = JSON.stringify(obj, null, 2).split('\n');
  return jsonLines
    .map((line, idx) => (idx === 0 ? `${baseIndent}${line}` : `${baseIndent}${line}`))
    .join('\n');
}

function inspectTargetAst(filePath, varName, plugins = []) {
  const source = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(source, { sourceType: 'module', plugins });

  let targetInit = null;
  traverse(ast, {
    VariableDeclarator(p) {
      if (p.node.id.type === 'Identifier' && p.node.id.name === varName) {
        targetInit = p.node.init;
      }
    },
  });

  if (!targetInit) {
    throw new Error(`No se encontró ${varName} en ${filePath}`);
  }

  const chapterNodes =
    targetInit.type === 'ArrayExpression' ? targetInit.elements : [targetInit];

  const records = [];
  for (const el of chapterNodes) {
    if (!el || el.type !== 'ObjectExpression') continue;
    const id = getStringOrNumProp(el, 'id');
    if (id === undefined) continue;
    const title = getStringOrNumProp(el, 'title') || '';
    const wordsProp = getPropNode(el, 'words');
    if (!wordsProp || wordsProp.value.type !== 'ArrayExpression') continue;

    const wordsArray = wordsProp.value;
    const existingSafeIds = new Set();
    for (const wNode of wordsArray.elements) {
      const deVal = getStringOrNumProp(wNode, 'de');
      if (deVal) existingSafeIds.add(getSafeId(deVal));
    }

    records.push({
      id: Number(id),
      title,
      wordsArrayNode: wordsArray,
      existingCount: wordsArray.elements.length,
      existingSafeIds,
    });
  }

  return { source, records };
}

function spliceWordsIntoSource(source, insertionPlans) {
  // Orden descendente de offset de cierre de array para no desplazar offsets previos
  const sorted = [...insertionPlans].sort((a, b) => b.closeBracketOffset - a.closeBracketOffset);
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  let updated = source;

  for (const plan of sorted) {
    if (!plan.items || plan.items.length === 0) continue;

    const closeIdx = plan.closeBracketOffset;
    const before = updated.slice(0, closeIdx);
    const after = updated.slice(closeIdx);

    const trailingWs = before.match(/\s*$/)?.[0] ?? '';
    const trimmedBefore = before.slice(0, before.length - trailingWs.length);
    const lastLineIndent = trailingWs.match(/[^\r\n]*$/)?.[0] ?? '';
    const itemIndent = `${lastLineIndent}  `;
    const serializedItems = plan.items
      .map((item) => serializeObjectLiteral(item, itemIndent).replace(/\n/g, eol))
      .join(`,${eol}`);

    if (plan.hadExistingElements) {
      const comma = trimmedBefore.endsWith(',') ? '' : ',';
      updated = `${trimmedBefore}${comma}${eol}${serializedItems}${eol}${lastLineIndent}${after}`;
    } else {
      updated = `${trimmedBefore}${eol}${serializedItems}${eol}${lastLineIndent}${after}`;
    }
  }

  return updated;
}

function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const chaptersPath = path.join(ROOT, 'src', 'data', 'chapters.jsx');
  const redemittelPath = path.join(ROOT, 'src', 'data', 'redemittelBegegnungen.js');
  const vocabJsonPath = path.join(ROOT, 'vocabulario_completo.json');

  // 1. Cargar payloads de los 4 lotes
  const allBatchChapters = [];
  for (const relPath of PAYLOAD_FILES) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      throw new Error(`Falta archivo payload requerido: ${relPath}`);
    }
    const parsed = JSON.parse(fs.readFileSync(absPath, 'utf8'));
    if (Array.isArray(parsed.chapters)) {
      allBatchChapters.push(...parsed.chapters);
    }
  }

  // 2. Inspección AST de estado actual
  const chaptersInfo = inspectTargetAst(chaptersPath, 'rawChapters', ['jsx']);
  const redemittelInfo = inspectTargetAst(redemittelPath, 'redemittelChapter', []);
  const vocabJson = JSON.parse(fs.readFileSync(vocabJsonPath, 'utf8'));

  // Índice global único getSafeId (chapters.jsx + redemittelBegegnungen.js)
  const globalSeenSafeIds = new Set();
  for (const ch of chaptersInfo.records) {
    for (const sid of ch.existingSafeIds) globalSeenSafeIds.add(sid);
  }
  for (const ch of redemittelInfo.records) {
    for (const sid of ch.existingSafeIds) globalSeenSafeIds.add(sid);
  }

  const existingVocabJsonIds = new Set(vocabJson.map((v) => v.id).filter(Boolean));

  const chapterInsertPlans = [];
  const redemittelInsertPlans = [];
  const newVocabJsonEntries = [];
  const summaryRows = [];

  for (const batchChap of allBatchChapters) {
    const isK22 = Number(batchChap.id) === 22 || Boolean(batchChap.isRedemittel);
    const targetPool = isK22 ? redemittelInfo.records : chaptersInfo.records;

    // Casar por ID real vigente Y/O título canónico exacto
    const targetRec =
      targetPool.find((r) => r.id === Number(batchChap.id)) ||
      targetPool.find((r) => r.title.toLowerCase() === String(batchChap.title || '').toLowerCase());

    if (!targetRec) {
      throw new Error(`No se encontró capítulo destino para id=${batchChap.id} title=${batchChap.title}`);
    }

    const acceptedItems = [];
    const skippedDuplicates = [];

    for (const rawItem of batchChap.words || []) {
      const normalizedItem = isK22
        ? sanitizeWordForRedemittel(rawItem)
        : sanitizeWordForChapter(rawItem);
      if (!normalizedItem.de) continue;

      const sid = getSafeId(normalizedItem.de);
      if (globalSeenSafeIds.has(sid)) {
        skippedDuplicates.push(normalizedItem.de);
        continue;
      }

      globalSeenSafeIds.add(sid);
      acceptedItems.push(normalizedItem);

      if (!isK22 && !existingVocabJsonIds.has(sid)) {
        existingVocabJsonIds.add(sid);
        newVocabJsonEntries.push({
          id: sid,
          word: normalizedItem.de,
          exampleSentenceDe: normalizedItem.exampleSentenceDe,
          exampleSentenceEs: normalizedItem.exampleSentenceEs,
          ...(normalizedItem.exampleSentenceDeBlocks
            ? { exampleSentenceDeBlocks: normalizedItem.exampleSentenceDeBlocks }
            : {}),
        });
      }
    }

    const closeBracketOffset = targetRec.wordsArrayNode.end - 1;
    const plan = {
      id: targetRec.id,
      title: targetRec.title,
      closeBracketOffset,
      hadExistingElements: targetRec.wordsArrayNode.elements.length > 0,
      items: acceptedItems,
    };

    if (isK22) {
      redemittelInsertPlans.push(plan);
    } else {
      chapterInsertPlans.push(plan);
    }

    summaryRows.push({
      id: targetRec.id,
      title: targetRec.title,
      before: targetRec.existingCount,
      added: acceptedItems.length,
      after: targetRec.existingCount + acceptedItems.length,
      skipped: skippedDuplicates.length,
    });
  }

  // 3. Construcción en memoria + Re-validación AST estricta antes de tocar disco
  const nextChaptersSource = spliceWordsIntoSource(chaptersInfo.source, chapterInsertPlans);
  const nextRedemittelSource = spliceWordsIntoSource(redemittelInfo.source, redemittelInsertPlans);

  parser.parse(nextChaptersSource, { sourceType: 'module', plugins: ['jsx'] });
  parser.parse(nextRedemittelSource, { sourceType: 'module' });

  const nextVocabJson = [...vocabJson, ...newVocabJsonEntries];

  if (!isDryRun) {
    fs.writeFileSync(chaptersPath, nextChaptersSource, 'utf8');
    fs.writeFileSync(redemittelPath, nextRedemittelSource, 'utf8');
    fs.writeFileSync(vocabJsonPath, `${JSON.stringify(nextVocabJson, null, 2)}\n`, 'utf8');
  }

  const totalAddedChapters = summaryRows
    .filter((r) => r.id !== 22)
    .reduce((acc, r) => acc + r.added, 0);
  const totalAddedK22 = summaryRows
    .filter((r) => r.id === 22)
    .reduce((acc, r) => acc + r.added, 0);

  console.log(`\n=== FASE 2 AST INJECTION (${isDryRun ? 'DRY RUN' : 'COMMITTED TO WORKTREE'}) ===`);
  for (const r of summaryRows) {
    console.log(
      `  Kap ${String(r.id).padStart(2, ' ')} | ${r.title.padEnd(42, ' ')} | ${String(r.before).padStart(3, ' ')} -> ${String(r.after).padStart(3, ' ')} (+${r.added}, skipped=${r.skipped})`
    );
  }
  console.log(`\nNuevas entradas en src/data/chapters.jsx: +${totalAddedChapters} (Total: ${chaptersInfo.records.reduce((s, r) => s + r.existingCount, 0) + totalAddedChapters})`);
  console.log(`Nuevos bloques en src/data/redemittelBegegnungen.js: +${totalAddedK22} (Total: ${redemittelInfo.records[0].existingCount + totalAddedK22})`);
  console.log(`Nuevas entradas sincronizadas en vocabulario_completo.json: +${newVocabJsonEntries.length} (Total: ${nextVocabJson.length})`);
}

main();
