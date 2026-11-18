import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import parser from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default || traverseModule;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Resolves the repository root regardless of whether this script is invoked
 * from root or from `.agents/skills/injecting-cefr-vocabulary/scripts/`.
 */
function resolveRepoRoot() {
  const candidateFromScript = path.resolve(__dirname, '..', '..', '..', '..');
  if (fs.existsSync(path.join(candidateFromScript, 'src', 'data', 'chapters.jsx'))) {
    return candidateFromScript;
  }
  return process.cwd();
}

export const getSafeId = (str) =>
  btoa(encodeURIComponent(String(str ?? '').trim())).replace(/[/+=]/g, '_');

/**
 * Mapa canónico Base-1 vigente en `src/data/chapters.jsx` y `src/data/redemittelBegegnungen.js`.
 * NUNCA usar los IDs históricos pre-reorden (0, 14, 15, 13, 16) de documentos antiguos.
 */
export const CANONICAL_CHAPTER_MAP = [
  { id: 1, title: 'Kapitel 1: Alphabet & Zahlen', aliases: ['alphabet', 'zahlen'] },
  { id: 2, title: 'Kapitel 2: Zeit & Datum', aliases: ['zeit', 'datum', 'wochentage'] },
  { id: 3, title: 'Kapitel 3: Personen & Kontakte', aliases: ['personen', 'kontakte'] },
  { id: 4, title: 'Kapitel 4: Basisverben & Adjektive', aliases: ['basisverben', 'adjektive'] },
  { id: 5, title: 'Kapitel 5: Adverbien & Fragewörter', aliases: ['adverbien', 'fragewörter'] },
  { id: 6, title: 'Kapitel 6: Grammatik: Konnektoren', aliases: ['konnektoren', 'grammatik'] },
  { id: 7, title: 'Kapitel 7: Wohnen', aliases: ['wohnen', 'haus'] },
  { id: 8, title: 'Kapitel 8: Essen & Trinken', aliases: ['essen', 'trinken'] },
  { id: 9, title: 'Kapitel 9: Kleidung', aliases: ['kleidung', 'mode'] },
  { id: 10, title: 'Kapitel 10: Einkaufen', aliases: ['einkaufen', 'supermarkt'] },
  { id: 11, title: 'Kapitel 11: Freizeit', aliases: ['freizeit', 'hobbys', 'sport'] },
  { id: 12, title: 'Kapitel 12: Reisen & Verkehr', aliases: ['reisen', 'verkehr', 'stadt'] },
  { id: 13, title: 'Kapitel 13: Fahrschuldeutsch: Auto', aliases: ['fahrschuldeutsch', 'auto', 'führerschein'] },
  { id: 14, title: 'Kapitel 14: Post & Bank', aliases: ['post', 'bank'] },
  { id: 15, title: 'Kapitel 15: Gesundheit', aliases: ['gesundheit', 'arzt', 'körper'] },
  { id: 16, title: 'Kapitel 16: Schule & Beruf', aliases: ['schule', 'beruf', 'arbeit'] },
  { id: 17, title: 'Kapitel 17: Digitale Welt & IT', aliases: ['digitale welt', 'digital', 'it'] },
  { id: 18, title: 'Kapitel 18: Elektrotechnik & Solar', aliases: ['elektrotechnik', 'solar', 'photovoltaik'] },
  { id: 22, title: 'Kapitel 22: Redemittel & Alltagskommunikation', isRedemittel: true, aliases: ['redemittel', 'alltagskommunikation'] },
];

const FORBIDDEN_ENPAL_ROOF_TERMS = /dachmontage|solardach|auf dem dach/i;

export function unescapeMarkdownText(raw) {
  return String(raw ?? '')
    .replace(/\\([!()[\]|_.+\\\-*~`])/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function cleanCefrLevel(rawLevel) {
  const clean = unescapeMarkdownText(rawLevel);
  const m = clean.match(/^(A1[–-]A2|A2[–-]B1|A1[–-]B1|A1|A2|B1)/i);
  return m ? m[1].replace('-', '–').toUpperCase() : clean;
}

export function cleanCategoryAndLevel(rawCategory, fallbackLevel = '') {
  const clean = unescapeMarkdownText(rawCategory);
  if (!clean.includes('/')) {
    return {
      category: clean || 'Allgemein',
      level: fallbackLevel ? cleanCefrLevel(fallbackLevel) : '',
    };
  }
  const idx = clean.lastIndexOf('/');
  const left = clean.slice(0, idx).trim();
  const right = clean.slice(idx + 1).trim();
  const parsedLevel = cleanCefrLevel(right);
  if (/^(A1|A2|B1)/i.test(parsedLevel)) {
    return { category: left || 'Allgemein', level: fallbackLevel ? cleanCefrLevel(fallbackLevel) : parsedLevel };
  }
  return { category: clean, level: fallbackLevel ? cleanCefrLevel(fallbackLevel) : '' };
}

export function normalizeLexicalRoot(rawDe) {
  let s = unescapeMarkdownText(rawDe).toLowerCase();
  if (s.includes('/')) s = s.split('/')[0].trim();
  s = s.replace(/\([^)]*\)/g, '');
  s = s.replace(/\|/g, '');
  s = s.replace(/^(der\/die\/das|der\/das|der\/die|die\/das|der|die|das|ein|eine|sich)\s+/i, '');
  return s.replace(/\s+/g, ' ').trim();
}

function buildFallbackSatzklammerBlocks(sentenceDe) {
  const clean = unescapeMarkdownText(sentenceDe).replace(/[.!?]+$/, '').trim();
  if (!clean) return [];
  const words = clean.split(/\s+/);
  if (words.length <= 2) {
    return [{ text: clean, role: 'subject', order: 1 }];
  }
  if (words.length === 3) {
    return [
      { text: words[0], role: 'subject', order: 1 },
      { text: words[1], role: 'verb_p1', order: 2 },
      { text: words[2], role: 'complement', order: 3 },
    ];
  }
  return [
    { text: words.slice(0, 2).join(' '), role: 'subject', order: 1 },
    { text: words[2], role: 'verb_p1', order: 2 },
    { text: words.slice(3).join(' '), role: 'complement', order: 3 },
  ];
}

function buildCleanAudioDe(rawDe) {
  return unescapeMarkdownText(rawDe)
    .split('/')[0]
    .replace(/\([^)]*\)/g, '')
    .replace(/\bo\.k\./gi, 'okay')
    .replace(/—/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeWordEntry(raw, isK22) {
  const de = unescapeMarkdownText(raw.de);
  const { category, level } = cleanCategoryAndLevel(raw.category, raw.level);
  const cleanPlural = unescapeMarkdownText(raw.plural).replace(/^(?:Pl(?:ural)?:\s*)/i, '').trim();
  const exampleSentenceDe = unescapeMarkdownText(raw.exampleSentenceDe);
  const exampleSentenceEs = unescapeMarkdownText(raw.exampleSentenceEs);

  if (isK22) {
    const blocks =
      Array.isArray(raw.exampleSentenceDeBlocks) && raw.exampleSentenceDeBlocks.length > 0
        ? raw.exampleSentenceDeBlocks.map((b) => (typeof b === 'string' ? b : String(b?.text || ''))).filter(Boolean)
        : exampleSentenceDe
          ? exampleSentenceDe.split(/(?<=[.!?])\s+/).filter(Boolean)
          : [];

    return {
      de,
      audioDe: raw.audioDe ? unescapeMarkdownText(raw.audioDe) : buildCleanAudioDe(de),
      pron: unescapeMarkdownText(raw.pron),
      es: unescapeMarkdownText(raw.es),
      type: unescapeMarkdownText(raw.type) || 'Expresión',
      category: category || 'Alltag',
      ...(level ? { level } : {}),
      ...(raw.regimen ? { regimen: unescapeMarkdownText(raw.regimen) } : {}),
      exampleSentenceDe,
      exampleSentenceEs,
      ...(blocks.length > 0 ? { exampleSentenceDeBlocks: blocks } : {}),
    };
  }

  const rawBlocks = Array.isArray(raw.exampleSentenceDeBlocks) ? raw.exampleSentenceDeBlocks : [];
  const validBlocks =
    rawBlocks.length > 0 &&
    rawBlocks.every((b) => b && typeof b.text === 'string' && ['subject', 'verb_p1', 'complement', 'verb_p2'].includes(b.role))
      ? rawBlocks.map((b, idx) => ({ text: b.text.trim(), role: b.role, order: idx + 1 }))
      : buildFallbackSatzklammerBlocks(exampleSentenceDe);

  return {
    de,
    pron: unescapeMarkdownText(raw.pron),
    es: unescapeMarkdownText(raw.es),
    type: unescapeMarkdownText(raw.type),
    category: category || 'Allgemein',
    ...(level ? { level } : {}),
    ...(raw.regimen ? { regimen: unescapeMarkdownText(raw.regimen) } : {}),
    ...(cleanPlural ? { plural: cleanPlural } : {}),
    ...(raw.en && unescapeMarkdownText(raw.en) ? { en: unescapeMarkdownText(raw.en) } : {}),
    exampleSentenceDe,
    exampleSentenceEs,
    ...(validBlocks.length > 0 ? { exampleSentenceDeBlocks: validBlocks } : {}),
  };
}

function resolveCanonicalChapterMeta(hintTitleOrId) {
  const str = unescapeMarkdownText(String(hintTitleOrId ?? ''));
  const numOnly = Number(str);
  if (Number.isInteger(numOnly) && numOnly > 0) {
    const byId = CANONICAL_CHAPTER_MAP.find((c) => c.id === numOnly);
    if (byId) return byId;
  }

  // 1. Coincidencia por prefijo numérico explícito "Kapitel N"
  const idMatch = str.match(/\bkapitel\s+(\d+)\b/i);
  if (idMatch) {
    const parsed = Number(idMatch[1]);
    const byChapNum = CANONICAL_CHAPTER_MAP.find((c) => c.id === parsed);
    if (byChapNum) return byChapNum;
  }

  // 2. Respaldo por título canónico o palabra completa (evita falso positivo "zeit" en "Freizeit")
  const lower = str.toLowerCase();
  const byTitle = CANONICAL_CHAPTER_MAP.find((c) => {
    const cleanTarget = c.title.replace(/^kapitel\s+\d+:\s*/i, '').toLowerCase();
    if (lower.includes(cleanTarget)) return true;
    return c.aliases.some((al) => new RegExp(`\\b${al}\\b`, 'i').test(lower));
  });
  return byTitle || null;
}

function splitRegimenAndPlural(rawCombined) {
  const clean = unescapeMarkdownText(rawCombined);
  if (!clean || /^[-—]+$/.test(clean)) return { plural: '', regimen: '' };
  if (/^pl(?:ural)?:/i.test(clean)) {
    // Limpiar notas parentéticas editoriales conservando el plural limpio sin prefijo "Pl:"
    const withoutPrefix = clean.replace(/^pl(?:ural)?:\s*/i, '').trim();
    const firstPart = withoutPrefix.split(/\s+\(Ojo:/i)[0].trim();
    return { plural: firstPart, regimen: '' };
  }
  return { plural: '', regimen: clean };
}

function parseMarkdownInput(mdContent) {
  const lines = mdContent.split(/\r?\n/);
  const chaptersById = new Map();
  let currentMeta = null;
  let colMap = null;

  const ensureChapter = (meta) => {
    if (!chaptersById.has(meta.id)) {
      chaptersById.set(meta.id, {
        id: meta.id,
        title: meta.title,
        ...(meta.isRedemittel ? { isRedemittel: true } : {}),
        words: [],
      });
    }
    return chaptersById.get(meta.id);
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^#{1,4}\s+/.test(line) && /kapitel/i.test(line)) {
      const meta = resolveCanonicalChapterMeta(line.replace(/^#+\s*/, ''));
      if (meta) {
        currentMeta = meta;
        colMap = null;
      }
      continue;
    }

    if (!currentMeta || !line.startsWith('|')) continue;
    // Separar únicamente pipes no escapados para conservar `\|` dentro de celdas (verbos separables)
    const rawCells = line.split(/(?<!\\)\|/).slice(1, -1);
    if (rawCells.length < 6) continue;
    const cells = rawCells.map((c) => unescapeMarkdownText(c));

    if (!cells[0] || /^[:\-\s]+$/.test(cells[0])) continue;

    // Detectar fila de cabecera real (palabra completa "de", nunca artículos "der/die/das")
    if (/^(?:de|alemán|expresión|palabra|término)$/i.test(cells[0])) {
      colMap = {
        de: cells.findIndex((h) => /^(?:de|alemán|expresión|palabra|término)$/i.test(h)),
        pron: cells.findIndex((h) => /fonética|pron/i.test(h)),
        es: cells.findIndex((h) => /^(?:es|español|traducción)$/i.test(h)),
        type: cells.findIndex((h) => /tipo|gramática|type/i.test(h)),
        regOrPl: cells.findIndex((h) => /régimen|plural/i.test(h)),
        exDe: cells.findIndex((h) => /ejemplo.*alemán|example.*de/i.test(h)),
        exEs: cells.findIndex((h) => /ejemplo.*español|example.*es/i.test(h)),
        catLvl: cells.findIndex((h) => /categoría|category|nivel|level/i.test(h)),
      };
      continue;
    }

    const bucket = ensureChapter(currentMeta);
    const idx = colMap || { de: 0, pron: 1, es: 2, type: 3, regOrPl: 4, exDe: 5, exEs: 6, catLvl: 7 };
    const getCell = (colIdx) => (colIdx >= 0 && colIdx < cells.length ? cells[colIdx] : '');

    const { plural, regimen } = splitRegimenAndPlural(getCell(idx.regOrPl));
    bucket.words.push({
      de: getCell(idx.de),
      pron: getCell(idx.pron),
      es: getCell(idx.es),
      type: getCell(idx.type),
      category: getCell(idx.catLvl),
      plural,
      regimen,
      exampleSentenceDe: getCell(idx.exDe),
      exampleSentenceEs: getCell(idx.exEs),
    });
  }

  return Array.from(chaptersById.values());
}

function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((v) => v.trim());
}

function parseCsvInput(csvContent) {
  const lines = csvContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const idxOf = (names) => headers.findIndex((h) => names.includes(h));

  const chCol = idxOf(['chapter', 'chapter_id', 'kapitel', 'id']);
  const deCol = idxOf(['de', 'word', 'alemán']);
  const pronCol = idxOf(['pron', 'pronunciación']);
  const esCol = idxOf(['es', 'traducción']);
  const typeCol = idxOf(['type', 'tipo']);
  const catCol = idxOf(['category', 'categoría']);
  const lvlCol = idxOf(['level', 'nivel']);
  const regCol = idxOf(['regimen', 'régimen']);
  const plCol = idxOf(['plural']);
  const enCol = idxOf(['en', 'image_prompt']);
  const sDeCol = idxOf(['examplesentencede', 'example_de', 'ejemplo_de']);
  const sEsCol = idxOf(['examplesentencees', 'example_es', 'ejemplo_es']);
  const audioCol = idxOf(['audiode', 'audio_de']);

  if (deCol === -1 || chCol === -1) {
    throw new Error('CSV inválido: requiere al menos columnas `chapter` (o `chapter_id`) y `de`.');
  }

  const chaptersById = new Map();
  for (let r = 1; r < lines.length; r++) {
    const cols = parseCsvLine(lines[r]);
    const meta = resolveCanonicalChapterMeta(cols[chCol]);
    if (!meta) {
      throw new Error(`No se pudo mapear capítulo CSV "${cols[chCol]}" en fila ${r + 1}.`);
    }
    if (!chaptersById.has(meta.id)) {
      chaptersById.set(meta.id, {
        id: meta.id,
        title: meta.title,
        ...(meta.isRedemittel ? { isRedemittel: true } : {}),
        words: [],
      });
    }
    chaptersById.get(meta.id).words.push({
      de: cols[deCol] || '',
      pron: pronCol > -1 ? cols[pronCol] : '',
      es: esCol > -1 ? cols[esCol] : '',
      type: typeCol > -1 ? cols[typeCol] : '',
      category: catCol > -1 ? cols[catCol] : '',
      level: lvlCol > -1 ? cols[lvlCol] : '',
      regimen: regCol > -1 ? cols[regCol] : '',
      plural: plCol > -1 ? cols[plCol] : '',
      en: enCol > -1 ? cols[enCol] : '',
      exampleSentenceDe: sDeCol > -1 ? cols[sDeCol] : '',
      exampleSentenceEs: sEsCol > -1 ? cols[sEsCol] : '',
      audioDe: audioCol > -1 ? cols[audioCol] : '',
    });
  }
  return Array.from(chaptersById.values());
}

function loadBatchChapters(inputPaths) {
  const merged = [];
  for (const p of inputPaths) {
    const abs = path.resolve(p);
    if (!fs.existsSync(abs)) {
      throw new Error(`Archivo de entrada no encontrado: ${abs}`);
    }
    const ext = path.extname(abs).toLowerCase();
    const raw = fs.readFileSync(abs, 'utf8');
    if (ext === '.json') {
      const parsed = JSON.parse(raw);
      const list = Array.isArray(parsed.chapters) ? parsed.chapters : Array.isArray(parsed) ? parsed : [];
      merged.push(...list);
    } else if (ext === '.md') {
      merged.push(...parseMarkdownInput(raw));
    } else if (ext === '.csv') {
      merged.push(...parseCsvInput(raw));
    } else {
      throw new Error(`Formato no soportado (${ext}). Usa .json, .md o .csv.`);
    }
  }
  return merged;
}

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

  if (!targetInit) throw new Error(`No se encontró ${varName} en ${filePath}`);
  const chapterNodes = targetInit.type === 'ArrayExpression' ? targetInit.elements : [targetInit];

  const records = [];
  for (const el of chapterNodes) {
    if (!el || el.type !== 'ObjectExpression') continue;
    const id = getStringOrNumProp(el, 'id');
    if (id === undefined) continue;
    const title = String(getStringOrNumProp(el, 'title') || '');
    const wordsProp = getPropNode(el, 'words');
    if (!wordsProp || wordsProp.value.type !== 'ArrayExpression') continue;

    const existingSafeIds = new Set();
    const existingRoots = new Set();
    for (const wNode of wordsProp.value.elements) {
      const deVal = getStringOrNumProp(wNode, 'de');
      if (deVal) {
        existingSafeIds.add(getSafeId(deVal));
        existingRoots.add(normalizeLexicalRoot(deVal));
      }
    }

    records.push({
      id: Number(id),
      title,
      filePath,
      wordsArrayNode: wordsProp.value,
      existingCount: wordsProp.value.elements.length,
      existingSafeIds,
      existingRoots,
    });
  }

  return { source, records };
}

function spliceWordsIntoSource(source, insertionPlans) {
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
      .map((item) =>
        JSON.stringify(item, null, 2)
          .split('\n')
          .map((line) => `${itemIndent}${line}`)
          .join(eol)
      )
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

function parseCliArgs(argv) {
  const inputs = [];
  let dryRun = false;
  let auditOnly = false;
  let allowCrossHomonyms = false;
  let reportOut = null;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') dryRun = true;
    else if (arg === '--audit-only') auditOnly = true;
    else if (arg === '--allow-cross-homonyms') allowCrossHomonyms = true;
    else if (arg === '--input' && argv[i + 1]) {
      inputs.push(...argv[++i].split(',').map((s) => s.trim()).filter(Boolean));
    } else if (arg === '--report-out' && argv[i + 1]) {
      reportOut = argv[++i];
    }
  }
  return { inputs, dryRun, auditOnly, allowCrossHomonyms, reportOut };
}

function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const repoRoot = resolveRepoRoot();
  const chaptersCorePath = path.join(repoRoot, 'src', 'data', 'chaptersCore.jsx');
  const chaptersExtPath = path.join(repoRoot, 'src', 'data', 'chaptersExtended.jsx');
  const chaptersLegacyPath = path.join(repoRoot, 'src', 'data', 'chapters.jsx');
  const redemittelPath = path.join(repoRoot, 'src', 'data', 'redemittelBegegnungen.js');
  const vocabJsonPath = path.join(repoRoot, 'vocabulario_completo.json');

  const chapterSources = (fs.existsSync(chaptersCorePath) && fs.existsSync(chaptersExtPath))
    ? [
        inspectTargetAst(chaptersCorePath, 'coreChapters', ['jsx']),
        inspectTargetAst(chaptersExtPath, 'extendedChapters', ['jsx']),
      ]
    : [inspectTargetAst(chaptersLegacyPath, 'rawChapters', ['jsx'])];

  const allChapterRecords = chapterSources.flatMap((info) => info.records).sort((a, b) => a.id - b.id);
  const redemittelInfo = inspectTargetAst(redemittelPath, 'redemittelChapter', []);
  const vocabJson = JSON.parse(fs.readFileSync(vocabJsonPath, 'utf8'));

  const globalSeenSafeIds = new Set();
  const globalRootOwners = new Map();
  for (const rec of [...allChapterRecords, ...redemittelInfo.records]) {
    for (const sid of rec.existingSafeIds) globalSeenSafeIds.add(sid);
    for (const root of rec.existingRoots) {
      if (!globalRootOwners.has(root)) globalRootOwners.set(root, rec.id);
    }
  }
  const existingVocabJsonIds = new Set(vocabJson.map((v) => v.id).filter(Boolean));

  const totalChaptersCount = allChapterRecords.reduce((s, r) => s + r.existingCount, 0);
  const totalK22Count = redemittelInfo.records[0]?.existingCount || 0;

  if (args.inputs.length === 0) {
    console.log('\n=== INVENTARIO AST VIGENTE (injecting-cefr-vocabulary) ===');
    for (const rec of [...allChapterRecords, ...redemittelInfo.records]) {
      console.log(`  Kap ${String(rec.id).padStart(2, ' ')} | ${rec.title.padEnd(46, ' ')} | ${String(rec.existingCount).padStart(3, ' ')} entradas`);
    }
    console.log(`\nTotal chapters (K1–K21): ${totalChaptersCount} | K22: ${totalK22Count} | Combinado: ${totalChaptersCount + totalK22Count}`);
    console.log(`Total vocabulario_completo.json: ${vocabJson.length} índices únicos.`);
    if (!args.auditOnly) {
      console.log('Uso: node dedupe_and_merge.js --input <archivo.json|.md|.csv> [--dry-run] [--audit-only] [--allow-cross-homonyms]');
    }
    return;
  }

  const batchChapters = loadBatchChapters(args.inputs);
  // Agrupar planes por `targetRec.id` para garantizar un único offset AST por capítulo incluso con múltiples `--input`
  const plansByTargetId = new Map();
  const newVocabEntries = [];
  const skipped = { exactSafeId: [], sameChapterRoot: [], crossChapterRoot: [], forbiddenEnpal: [] };

  for (const batchChap of batchChapters) {
    const meta = resolveCanonicalChapterMeta(batchChap.title || batchChap.id);
    const targetId = meta ? meta.id : Number(batchChap.id);
    const isK22 = targetId === 22 || Boolean(batchChap.isRedemittel);
    const targetPool = isK22 ? redemittelInfo.records : allChapterRecords;
    const targetRec =
      targetPool.find((r) => r.id === targetId) ||
      targetPool.find((r) => r.title.toLowerCase() === String(batchChap.title || '').toLowerCase());

    if (!targetRec) {
      throw new Error(`Capítulo destino no encontrado para id=${batchChap.id} title="${batchChap.title}"`);
    }

    if (!plansByTargetId.has(targetRec.id)) {
      plansByTargetId.set(targetRec.id, {
        isK22,
        targetFilePath: targetRec.filePath,
        before: targetRec.existingCount,
        plan: {
          id: targetRec.id,
          title: targetRec.title,
          closeBracketOffset: targetRec.wordsArrayNode.end - 1,
          hadExistingElements: targetRec.wordsArrayNode.elements.length > 0,
          items: [],
        },
      });
    }
    const bucket = plansByTargetId.get(targetRec.id);

    for (const rawWord of batchChap.words || []) {
      const normalized = normalizeWordEntry(rawWord, isK22);
      if (!normalized.de) continue;

      if ((targetRec.id === 18 || targetRec.id === 20) && FORBIDDEN_ENPAL_ROOF_TERMS.test(JSON.stringify(normalized))) {
        skipped.forbiddenEnpal.push({ chapterId: targetRec.id, de: normalized.de });
        continue;
      }

      const sid = getSafeId(normalized.de);
      if (globalSeenSafeIds.has(sid)) {
        skipped.exactSafeId.push({ chapterId: targetRec.id, de: normalized.de });
        continue;
      }

      const root = normalizeLexicalRoot(normalized.de);
      if (targetRec.existingRoots.has(root)) {
        skipped.sameChapterRoot.push({ chapterId: targetRec.id, de: normalized.de, root });
        continue;
      }

      const ownerChapterId = globalRootOwners.get(root);
      if (ownerChapterId !== undefined && ownerChapterId !== targetRec.id && !args.allowCrossHomonyms && !rawWord.allowHomonym) {
        skipped.crossChapterRoot.push({ chapterId: targetRec.id, existingChapterId: ownerChapterId, de: normalized.de, root });
        continue;
      }

      globalSeenSafeIds.add(sid);
      targetRec.existingRoots.add(root);
      if (!globalRootOwners.has(root)) globalRootOwners.set(root, targetRec.id);
      bucket.plan.items.push(normalized);

      if (!isK22 && !existingVocabJsonIds.has(sid)) {
        existingVocabJsonIds.add(sid);
        newVocabEntries.push({
          id: sid,
          word: normalized.de,
          exampleSentenceDe: normalized.exampleSentenceDe,
          exampleSentenceEs: normalized.exampleSentenceEs,
          ...(normalized.exampleSentenceDeBlocks ? { exampleSentenceDeBlocks: normalized.exampleSentenceDeBlocks } : {}),
        });
      }
    }
  }

  const chapterPlans = [];
  const k22Plans = [];
  const rowsReport = [];
  const plansByFilePath = new Map();
  const sortedBuckets = Array.from(plansByTargetId.values()).sort((a, b) => a.plan.id - b.plan.id);
  for (const { isK22, targetFilePath, before, plan } of sortedBuckets) {
    if (isK22) k22Plans.push(plan);
    else {
      chapterPlans.push(plan);
      if (!plansByFilePath.has(targetFilePath)) plansByFilePath.set(targetFilePath, []);
      plansByFilePath.get(targetFilePath).push(plan);
    }
    rowsReport.push({
      id: plan.id,
      title: plan.title,
      before,
      added: plan.items.length,
      after: before + plan.items.length,
    });
  }

  const nextFilesToWrite = [];
  for (const info of chapterSources) {
    const filePlans = plansByFilePath.get(info.records[0]?.filePath) || [];
    const nextSrc = spliceWordsIntoSource(info.source, filePlans);
    parser.parse(nextSrc, { sourceType: 'module', plugins: ['jsx'] });
    if (filePlans.length > 0) {
      nextFilesToWrite.push([info.records[0].filePath, nextSrc]);
    }
  }
  const nextRedemittelSource = spliceWordsIntoSource(redemittelInfo.source, k22Plans);
  parser.parse(nextRedemittelSource, { sourceType: 'module' });

  const nextVocabJson = [...vocabJson, ...newVocabEntries];
  if (!args.dryRun && !args.auditOnly) {
    for (const [targetPath, content] of nextFilesToWrite) {
      fs.writeFileSync(targetPath, content, 'utf8');
    }
    if (k22Plans.length > 0) fs.writeFileSync(redemittelPath, nextRedemittelSource, 'utf8');
    fs.writeFileSync(vocabJsonPath, `${JSON.stringify(nextVocabJson, null, 2)}\n`, 'utf8');
  }

  const report = {
    mode: args.auditOnly ? 'AUDIT_ONLY' : args.dryRun ? 'DRY_RUN' : 'WRITTEN',
    summary: rowsReport,
    addedChapters: chapterPlans.reduce((s, p) => s + p.items.length, 0),
    addedK22: k22Plans.reduce((s, p) => s + p.items.length, 0),
    addedVocabJson: newVocabEntries.length,
    skippedCounts: {
      exactSafeId: skipped.exactSafeId.length,
      sameChapterRoot: skipped.sameChapterRoot.length,
      crossChapterRoot: skipped.crossChapterRoot.length,
      forbiddenEnpal: skipped.forbiddenEnpal.length,
    },
    skipped,
  };

  if (args.reportOut) {
    fs.writeFileSync(path.resolve(args.reportOut), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  }

  console.log(`\n=== DEDUPE & MERGE [${report.mode}] ===`);
  for (const r of rowsReport) {
    console.log(`  Kap ${String(r.id).padStart(2, ' ')} | ${r.title.padEnd(44, ' ')} | ${String(r.before).padStart(3, ' ')} -> ${String(r.after).padStart(3, ' ')} (+${r.added})`);
  }
  console.log(
    `\nOmitidos -> exactSafeId: ${skipped.exactSafeId.length} | sameChapterRoot: ${skipped.sameChapterRoot.length} | crossChapterRoot (revisar homónimos): ${skipped.crossChapterRoot.length} | forbiddenEnpal: ${skipped.forbiddenEnpal.length}`
  );
}

const isDirectCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isDirectCli) {
  main();
}
