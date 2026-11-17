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

// Exact formula matching src/utils/helpers.js
export const getSafeId = (str) =>
  btoa(encodeURIComponent(String(str ?? '').trim())).replace(/[/+=]/g, '_');

function unescapeMarkdownCell(raw) {
  return String(raw ?? '')
    .replace(/\\([!()[\]|_.+\\\-*~`])/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanLevelAndCategory(rawCatLevel) {
  const clean = unescapeMarkdownCell(rawCatLevel);
  const slashIdx = clean.lastIndexOf('/');
  if (slashIdx === -1) {
    return { category: clean || 'Allgemein', level: '' };
  }
  const category = clean.slice(0, slashIdx).trim();
  const levelRaw = clean.slice(slashIdx + 1).trim();
  // Strip trailing superscript footnote numbers from Google Docs exports (e.g. B17 -> B1, A2-B110 -> A2-B1)
  const levelMatch = levelRaw.match(/^(A1[–-]A2|A2[–-]B1|A1[–-]B1|A1|A2|B1)/i);
  const level = levelMatch ? levelMatch[1].replace('-', '–').toUpperCase() : levelRaw;
  return { category: category || 'Allgemein', level };
}

export function normalizeLexicalKeys(rawDe) {
  const clean = unescapeMarkdownCell(rawDe);
  if (!clean) return [];

  const keys = new Set();
  const stripArticles = (s) =>
    s
      .replace(/^\((?:der|die|das|plural|pl\.?)(?:\/(?:der|die|das))*\)\s+/i, '')
      .replace(/^(?:(?:der|die|das|den|dem|des)\s*\/\s*)+(?:der|die|das|den|dem|des)\s+/i, '')
      .replace(/^(?:der|die|das|ein|eine|einen|einem|einer)\s+/i, '')
      .replace(/^sich\s+/i, '')
      .trim();

  const normalizeSingle = (s) =>
    stripArticles(s)
      .replace(/\|/g, '')
      .replace(/[!?.,;:„“"«»'’]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  // Base full variant
  const base = normalizeSingle(clean);
  if (base) keys.add(base);

  // Without parentheticals vs expanded parentheticals: e.g. lang(e) -> lang, lange; Chat(room) -> chat, chatroom
  const withoutParens = normalizeSingle(clean.replace(/\([^)]*\)/g, ' '));
  if (withoutParens) keys.add(withoutParens);

  const expandedParens = normalizeSingle(clean.replace(/[()]/g, ''));
  if (expandedParens) keys.add(expandedParens);

  // Split slash variants outside articles: "das Altenheim / Altersheim"
  const afterTopArticle = stripArticles(clean);
  if (afterTopArticle.includes('/')) {
    for (const part of afterTopArticle.split('/')) {
      const pNorm = normalizeSingle(part);
      if (pNorm && pNorm.length >= 2) {
        keys.add(pNorm);
        const pNoParen = normalizeSingle(part.replace(/\([^)]*\)/g, ''));
        if (pNoParen && pNoParen.length >= 2) keys.add(pNoParen);
      }
    }
  }

  return Array.from(keys);
}

function getPropValue(objNode, propName) {
  if (!objNode || objNode.type !== 'ObjectExpression') return undefined;
  const prop = objNode.properties.find(
    (p) =>
      p.type === 'ObjectProperty' &&
      ((p.key.type === 'Identifier' && p.key.name === propName) ||
        (p.key.type === 'StringLiteral' && p.key.value === propName))
  );
  if (!prop) return undefined;
  if (prop.value.type === 'StringLiteral') return prop.value.value;
  if (prop.value.type === 'NumericLiteral') return prop.value.value;
  if (prop.value.type === 'BooleanLiteral') return prop.value.value;
  if (prop.value.type === 'ArrayExpression') {
    return prop.value.elements
      .map((el) => (el?.type === 'StringLiteral' ? el.value : null))
      .filter(Boolean);
  }
  return undefined;
}

function parseChaptersFromAst(chaptersPath) {
  const code = fs.readFileSync(chaptersPath, 'utf8');
  const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

  let rawArray = null;
  traverse(ast, {
    VariableDeclarator(p) {
      if (p.node.id.type === 'Identifier' && p.node.id.name === 'rawChapters') {
        rawArray = p.node.init;
      }
    },
  });

  if (!rawArray || rawArray.type !== 'ArrayExpression') {
    throw new Error('No se encontró rawChapters ArrayExpression en src/data/chapters.jsx');
  }

  const chapters = [];
  for (const el of rawArray.elements) {
    if (!el || el.type !== 'ObjectExpression') continue;
    const id = getPropValue(el, 'id');
    if (id === undefined) continue; // e.g. spread { ...redemittelChapter } handled via redemittelBegegnungen.js
    const title = getPropValue(el, 'title') || '';
    const emoji = getPropValue(el, 'emoji') || '';
    const categoryFilter = getPropValue(el, 'categoryFilter') || null;
    const wordsProp = el.properties.find(
      (p) =>
        p.type === 'ObjectProperty' &&
        ((p.key.type === 'Identifier' && p.key.name === 'words') ||
          (p.key.type === 'StringLiteral' && p.key.value === 'words'))
    );

    const words = [];
    if (wordsProp?.value?.type === 'ArrayExpression') {
      for (const wNode of wordsProp.value.elements) {
        if (!wNode || wNode.type !== 'ObjectExpression') continue;
        const de = getPropValue(wNode, 'de');
        if (!de) continue;
        words.push({
          de,
          es: getPropValue(wNode, 'es') || '',
          pron: getPropValue(wNode, 'pron') || '',
          type: getPropValue(wNode, 'type') || '',
          category: getPropValue(wNode, 'category') || '',
          level: getPropValue(wNode, 'level') || '',
          regimen: getPropValue(wNode, 'regimen') || '',
          plural: getPropValue(wNode, 'plural') || '',
          en: getPropValue(wNode, 'en') || '',
          exampleSentenceDe: getPropValue(wNode, 'exampleSentenceDe') || '',
          exampleSentenceEs: getPropValue(wNode, 'exampleSentenceEs') || '',
          safeId: getSafeId(de),
          rootKeys: normalizeLexicalKeys(de),
        });
      }
    }

    chapters.push({ id, title, emoji, categoryFilter, words });
  }

  chapters.sort((a, b) => Number(a.id) - Number(b.id));
  return chapters;
}

function parseRedemittelFromAst(redemittelPath) {
  const code = fs.readFileSync(redemittelPath, 'utf8');
  const ast = parser.parse(code, { sourceType: 'module' });

  let redemittelObj = null;
  traverse(ast, {
    VariableDeclarator(p) {
      if (p.node.id.type === 'Identifier' && p.node.id.name === 'redemittelChapter') {
        redemittelObj = p.node.init;
      }
    },
  });

  if (!redemittelObj || redemittelObj.type !== 'ObjectExpression') {
    throw new Error('No se encontró redemittelChapter en src/data/redemittelBegegnungen.js');
  }

  const id = getPropValue(redemittelObj, 'id') ?? 22;
  const title = getPropValue(redemittelObj, 'title') || 'Kapitel 22: Redemittel & Alltagskommunikation';
  const wordsProp = redemittelObj.properties.find(
    (p) =>
      p.type === 'ObjectProperty' &&
      ((p.key.type === 'Identifier' && p.key.name === 'words') ||
        (p.key.type === 'StringLiteral' && p.key.value === 'words'))
  );

  const words = [];
  if (wordsProp?.value?.type === 'ArrayExpression') {
    for (const wNode of wordsProp.value.elements) {
      if (!wNode || wNode.type !== 'ObjectExpression') continue;
      const de = getPropValue(wNode, 'de');
      if (!de) continue;
      words.push({
        de,
        audioDe: getPropValue(wNode, 'audioDe') || '',
        es: getPropValue(wNode, 'es') || '',
        category: getPropValue(wNode, 'category') || '',
        safeId: getSafeId(de),
        rootKeys: normalizeLexicalKeys(de),
      });
    }
  }

  return { id, title, words };
}

function parseDifferentialMarkdown(mdPath) {
  const lines = fs.readFileSync(mdPath, 'utf8').split(/\r?\n/);
  const sections = [];
  let currentSection = null;
  let inCatalog = false;
  let pendingHeaderCols = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (/^##\s+\*\*Catálogo Maestro/i.test(line)) {
      inCatalog = true;
      continue;
    }
    if (inCatalog && /^##\s+\*\*Hoja de Ruta/i.test(line)) {
      break;
    }
    if (!inCatalog) continue;

    const chapMatch = line.match(
      /^###\s+\*\*Kapitel\s+(\d+):\s+(.+?)\s*\(ID interno\s+(\d+)\\?\)\*\*/i
    );
    if (chapMatch) {
      currentSection = {
        visualKapitel: Number(chapMatch[1]),
        sectionTitle: unescapeMarkdownCell(chapMatch[2]),
        docDeclaredId: Number(chapMatch[3]),
        entries: [],
      };
      sections.push(currentSection);
      pendingHeaderCols = false;
      continue;
    }

    if (!currentSection) continue;

    if (/^\|[\s:-]+\|/.test(line) && line.includes('---')) {
      pendingHeaderCols = true;
      continue;
    }

    if (pendingHeaderCols && line.startsWith('|')) {
      // Split unescaped pipes inside markdown table
      const cells = [];
      let cur = '';
      for (let c = 0; c < line.length; c++) {
        if (line[c] === '\\' && line[c + 1] === '|') {
          cur += '|';
          c++;
        } else if (line[c] === '|') {
          cells.push(cur);
          cur = '';
        } else {
          cur += line[c];
        }
      }
      cells.push(cur);

      // Remove outer empty split cells around leading/trailing '|'
      const trimmedCells = cells.slice(1, cells.length - 1).map((c) => unescapeMarkdownCell(c));
      if (trimmedCells.length >= 8) {
        const [de, pron, es, type, regimenPlural, exampleSentenceDe, exampleSentenceEs, catLevel] =
          trimmedCells;
        if (de && de !== 'Alemán' && !/^[:-]+$/.test(de)) {
          const { category, level } = cleanLevelAndCategory(catLevel);
          currentSection.entries.push({
            lineNo: i + 1,
            visualKapitel: currentSection.visualKapitel,
            docDeclaredId: currentSection.docDeclaredId,
            de,
            pron,
            es,
            type,
            regimenPlural,
            exampleSentenceDe,
            exampleSentenceEs,
            category,
            level,
            safeId: getSafeId(de),
            rootKeys: normalizeLexicalKeys(de),
          });
        }
      }
    }
  }

  return sections;
}

function resolveDocPath(cliArgPath) {
  const candidates = [
    cliArgPath ? path.resolve(cliArgPath) : null,
    path.join(ROOT, 'docs', 'vocabulario_diferencial_a1_b1.md'),
    'C:\\Users\\Marcos\\Desktop\\DeutschMeister Pro Final\\docs\\vocabulario_diferencial_a1_b1.md',
  ].filter(Boolean);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`No se encontró vocabulario_diferencial_a1_b1.md en ninguna ruta candidata: ${candidates.join(', ')}`);
}

function runAudit() {
  const args = process.argv.slice(2);
  const docFlagIdx = args.indexOf('--doc');
  const outFlagIdx = args.indexOf('--out');
  const docPath = resolveDocPath(docFlagIdx !== -1 ? args[docFlagIdx + 1] : null);
  const outJsonPath = outFlagIdx !== -1 ? path.resolve(args[outFlagIdx + 1]) : null;

  const chaptersPath = path.join(ROOT, 'src', 'data', 'chapters.jsx');
  const redemittelPath = path.join(ROOT, 'src', 'data', 'redemittelBegegnungen.js');
  const vocabJsonPath = path.join(ROOT, 'vocabulario_completo.json');

  const chapters = parseChaptersFromAst(chaptersPath);
  const redemittel = parseRedemittelFromAst(redemittelPath);
  const vocabJson = JSON.parse(fs.readFileSync(vocabJsonPath, 'utf8'));
  const diffSections = parseDifferentialMarkdown(docPath);

  // Build global & per-chapter inventories
  const allExistingBySafeId = new Map();
  const allExistingByRootKey = new Map();
  const existingByKapitel = new Map();

  for (const ch of chapters) {
    const chSet = new Set();
    const chRoots = new Map();
    for (const w of ch.words) {
      chSet.add(w.safeId);
      if (!allExistingBySafeId.has(w.safeId)) {
        allExistingBySafeId.set(w.safeId, []);
      }
      allExistingBySafeId.get(w.safeId).push({ chapterId: ch.id, title: ch.title, de: w.de });

      for (const rk of w.rootKeys) {
        if (!chRoots.has(rk)) chRoots.set(rk, []);
        chRoots.get(rk).push({ de: w.de, type: w.type });

        if (!allExistingByRootKey.has(rk)) allExistingByRootKey.set(rk, []);
        allExistingByRootKey.get(rk).push({ chapterId: ch.id, title: ch.title, de: w.de, safeId: w.safeId });
      }
    }
    existingByKapitel.set(ch.id, {
      id: ch.id,
      title: ch.title,
      count: ch.words.length,
      categoryFilter: ch.categoryFilter,
      categories: Array.from(new Set(ch.words.map((w) => w.category).filter(Boolean))),
      safeIds: chSet,
      rootMap: chRoots,
    });
  }

  // Index Kapitel 22 (redemittelBegegnungen.js)
  const k22SafeIds = new Set();
  const k22RootMap = new Map();
  for (const w of redemittel.words) {
    k22SafeIds.add(w.safeId);
    if (!allExistingBySafeId.has(w.safeId)) allExistingBySafeId.set(w.safeId, []);
    allExistingBySafeId.get(w.safeId).push({ chapterId: 22, title: redemittel.title, de: w.de });
    for (const rk of w.rootKeys) {
      if (!k22RootMap.has(rk)) k22RootMap.set(rk, []);
      k22RootMap.get(rk).push({ de: w.de });
      if (!allExistingByRootKey.has(rk)) allExistingByRootKey.set(rk, []);
      allExistingByRootKey.get(rk).push({ chapterId: 22, title: redemittel.title, de: w.de, safeId: w.safeId });
    }
  }

  // Index vocabulario_completo.json
  const vocabJsonById = new Map();
  const vocabJsonByWord = new Map();
  for (const item of vocabJson) {
    if (item.id) vocabJsonById.set(item.id, item.word);
    if (item.word) vocabJsonByWord.set(getSafeId(item.word), item.id);
  }

  // Cross-reference differential entries
  const perChapterReport = [];
  let totalParsedDiff = 0;
  let totalExactMatches = 0;
  let totalSameChapterRootMatches = 0;
  let totalCrossChapterRootMatches = 0;
  let totalNetNew = 0;

  const seenDiffSafeIds = new Set();
  const internalDiffDuplicates = [];

  for (const sec of diffSections) {
    const isK22 = sec.visualKapitel === 22;
    const localTarget = isK22
      ? { id: 22, title: redemittel.title, words: redemittel.words, safeIds: k22SafeIds, categoryFilter: null }
      : chapters.find(
          (c) =>
            Number(c.id) === sec.visualKapitel ||
            c.title.toLowerCase().startsWith(`kapitel ${sec.visualKapitel}:`)
        );

    const exactCollisions = [];
    const sameChapterRootCollisions = [];
    const crossChapterRootCollisions = [];
    const netNewEntries = [];
    const newCategories = new Set();

    for (const entry of sec.entries) {
      totalParsedDiff++;
      if (seenDiffSafeIds.has(entry.safeId)) {
        internalDiffDuplicates.push({ kapitel: sec.visualKapitel, de: entry.de });
      }
      seenDiffSafeIds.add(entry.safeId);

      // Check exact safeId across target chapter AND all chapters
      const exactGlobal = allExistingBySafeId.get(entry.safeId) || [];
      if (exactGlobal.length > 0) {
        totalExactMatches++;
        exactCollisions.push({
          de: entry.de,
          safeId: entry.safeId,
          matchedIn: exactGlobal,
        });
        continue;
      }

      // Check normalized lexical root collisions
      const rootMatches = [];
      for (const rk of entry.rootKeys) {
        const found = allExistingByRootKey.get(rk) || [];
        for (const f of found) {
          rootMatches.push({ rootKey: rk, ...f });
        }
      }

      // Deduplicate rootMatches by (chapterId + de)
      const uniqueRootMatches = [];
      const seenMatchKey = new Set();
      for (const m of rootMatches) {
        const k = `${m.chapterId}::${m.de}`;
        if (!seenMatchKey.has(k)) {
          seenMatchKey.add(k);
          uniqueRootMatches.push(m);
        }
      }

      const sameChapterHits = localTarget
        ? uniqueRootMatches.filter((m) => Number(m.chapterId) === Number(localTarget.id))
        : [];
      const otherChapterHits = uniqueRootMatches.filter(
        (m) => !localTarget || Number(m.chapterId) !== Number(localTarget.id)
      );

      if (sameChapterHits.length > 0) {
        totalSameChapterRootMatches++;
        sameChapterRootCollisions.push({
          de: entry.de,
          matches: sameChapterHits,
        });
      } else if (otherChapterHits.length > 0) {
        totalCrossChapterRootMatches++;
        crossChapterRootCollisions.push({
          de: entry.de,
          category: entry.category,
          level: entry.level,
          matches: otherChapterHits,
        });
      } else {
        totalNetNew++;
        netNewEntries.push({ de: entry.de, category: entry.category, level: entry.level });
      }

      const existingCats = existingByKapitel.get(localTarget?.id)?.categories || [];
      if (entry.category && !existingCats.includes(entry.category)) {
        newCategories.add(entry.category);
      }
    }

    perChapterReport.push({
      visualKapitel: sec.visualKapitel,
      docTitle: sec.sectionTitle,
      docDeclaredId: sec.docDeclaredId,
      actualCodeId: localTarget?.id ?? null,
      actualCodeTitle: localTarget?.title ?? null,
      existingCount: localTarget?.words?.length ?? 0,
      hasHardcodedCategoryFilter: Boolean(localTarget?.categoryFilter),
      diffTotalCount: sec.entries.length,
      exactSafeIdCollisionsCount: exactCollisions.length,
      sameChapterRootCollisionsCount: sameChapterRootCollisions.length,
      crossChapterRootCollisionsCount: crossChapterRootCollisions.length,
      strictNetNewCount: netNewEntries.length,
      insertableWithoutExactOrSameChapDupCount:
        sec.entries.length - exactCollisions.length - sameChapterRootCollisions.length,
      newCategoriesIntroduced: Array.from(newCategories),
      exactCollisions,
      sameChapterRootCollisions,
      crossChapterRootCollisions,
    });
  }

  const totalChaptersWords = chapters.reduce((sum, c) => sum + c.words.length, 0);
  const summary = {
    sourceDocPath: docPath,
    sourceDocInWorktree: docPath.startsWith(ROOT),
    inventory: {
      chaptersCountInRawChapters: chapters.length,
      totalWordsInChaptersJsx: totalChaptersWords,
      chapter1to19Count: chapters.filter((c) => Number(c.id) <= 19).reduce((s, c) => s + c.words.length, 0),
      chapter20_21Count: chapters.filter((c) => Number(c.id) >= 20).reduce((s, c) => s + c.words.length, 0),
      redemittelK22Count: redemittel.words.length,
      vocabJsonCount: vocabJson.length,
      chaptersSummary: chapters.map((c) => ({
        id: c.id,
        title: c.title,
        wordsCount: c.words.length,
        hasCategoryFilter: Boolean(c.categoryFilter),
      })),
    },
    differential: {
      totalParsedDiffEntries: totalParsedDiff,
      internalDiffDuplicates,
      totalExactSafeIdCollisions: totalExactMatches,
      totalSameChapterRootCollisions: totalSameChapterRootMatches,
      totalCrossChapterRootCollisions: totalCrossChapterRootMatches,
      totalStrictNetNew: totalNetNew,
      totalInsertableSkippingExactAndSameChapter:
        totalParsedDiff - totalExactMatches - totalSameChapterRootMatches,
    },
    perChapterReport,
  };

  if (outJsonPath) {
    fs.mkdirSync(path.dirname(outJsonPath), { recursive: true });
    fs.writeFileSync(outJsonPath, JSON.stringify(summary, null, 2), 'utf8');
  }

  console.log('\n=== INVENTARIO REAL AST (src/data/chapters.jsx + redemittelBegegnungen.js + vocabulario_completo.json) ===');
  console.log(`Documento fuente leído: ${docPath} (en worktree: ${summary.sourceDocInWorktree})`);
  console.log(`Capítulos en rawChapters: ${chapters.length} | Palabras totales chapters.jsx: ${totalChaptersWords} (K1–K19: ${summary.inventory.chapter1to19Count}, K20–K21: ${summary.inventory.chapter20_21Count})`);
  console.log(`Kapitel 22 (redemittelBegegnungen.js): ${redemittel.words.length} bloques`);
  console.log(`vocabulario_completo.json: ${vocabJson.length} entradas`);
  console.log('\n--- Conteo actual por capítulo en src/data/chapters.jsx ---');
  for (const ch of summary.inventory.chaptersSummary) {
    console.log(`  id=${String(ch.id).padStart(2, ' ')} | ${ch.title.padEnd(48, ' ')} | ${String(ch.wordsCount).padStart(3, ' ')} entradas${ch.hasCategoryFilter ? ' [categoryFilter]' : ''}`);
  }

  console.log('\n=== CRUCE CON 632 ENTRADAS DE vocabulario_diferencial_a1_b1.md ===');
  console.log(`Total entradas parseadas: ${totalParsedDiff} (duplicados internos en md: ${internalDiffDuplicates.length})`);
  console.log(`Colisiones EXACTAS getSafeId: ${totalExactMatches}`);
  console.log(`Colisiones raíz léxica MISMO capítulo (lotes ocultos V1/V2/K17/K18): ${totalSameChapterRootMatches}`);
  console.log(`Colisiones raíz léxica OTRO capítulo (ej. K20/K21/K22): ${totalCrossChapterRootMatches}`);
  console.log(`Entradas 100% nuevas estrictas (0 colisiones globales): ${totalNetNew}`);
  console.log(`Entradas insertables omitiendo solo exactas+mismo capítulo: ${summary.differential.totalInsertableSkippingExactAndSameChapter}`);

  console.log('\n--- Detalle por capítulo ---');
  for (const r of perChapterReport) {
    console.log(
      `Kap ${String(r.visualKapitel).padStart(2, ' ')} (docId=${r.docDeclaredId} -> codeId=${r.actualCodeId}, base=${r.existingCount}) | md=${String(r.diffTotalCount).padStart(3, ' ')} | exactDup=${r.exactSafeIdCollisionsCount} | sameChapRoot=${r.sameChapterRootCollisionsCount} | crossChapRoot=${r.crossChapterRootCollisionsCount} | strictNew=${r.strictNetNewCount}`
    );
  }
}

runAudit();
