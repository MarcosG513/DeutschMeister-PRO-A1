import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parser from '@babel/parser';
import traverseModule from '@babel/traverse';
import {
  DEFAULT_LEARNING_PROFILE,
  normalizeLearningProfile,
} from '../src/utils/learningPathEngine.js';

const traverse = traverseModule.default || traverseModule;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

function parseModuleAst(relPath, plugins = ['jsx']) {
  const absPath = path.join(REPO_ROOT, relPath);
  const source = fs.readFileSync(absPath, 'utf8');
  return {
    absPath,
    source,
    ast: parser.parse(source, { sourceType: 'module', plugins }),
  };
}

function resolveLiteralString(node) {
  if (!node) return null;
  if (node.type === 'StringLiteral') return node.value;
  if (node.type === 'NumericLiteral') return node.value;
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis.map((q) => q.value.cooked ?? q.value.raw).join('');
  }
  return null;
}

function getObjectPropValueNode(objNode, propName) {
  if (!objNode || objNode.type !== 'ObjectExpression') return null;
  const prop = objNode.properties.find(
    (p) =>
      p.type === 'ObjectProperty' &&
      ((p.key.type === 'Identifier' && p.key.name === propName) ||
        (p.key.type === 'StringLiteral' && p.key.value === propName))
  );
  return prop ? prop.value : null;
}

function readStaticStringArray(node) {
  if (!node || node.type !== 'ArrayExpression') return [];
  return node.elements.map((el) => resolveLiteralString(el)).filter((v) => v !== null);
}

test('studyPlanModules defines 20 ordered CEFR modules with monotonic stageOrder, acyclic prerequisites and valid chapters', () => {
  const { ast } = parseModuleAst('src/data/studyPlanModules.jsx');
  let modulesArrayNode = null;

  traverse(ast, {
    VariableDeclarator(p) {
      if (
        p.node.id.type === 'Identifier' &&
        p.node.id.name === 'studyPlanModules' &&
        p.node.init?.type === 'ArrayExpression'
      ) {
        modulesArrayNode = p.node.init;
      }
    },
  });

  assert.ok(modulesArrayNode, 'studyPlanModules array must exist in src/data/studyPlanModules.jsx');

  const parsedModules = modulesArrayNode.elements.map((el) => {
    assert.equal(el?.type, 'ObjectExpression', 'Each studyPlan module entry must be an object literal');
    return {
      id: resolveLiteralString(getObjectPropValueNode(el, 'id')),
      cefrLevel: resolveLiteralString(getObjectPropValueNode(el, 'cefrLevel')),
      stageOrder: resolveLiteralString(getObjectPropValueNode(el, 'stageOrder')),
      prerequisites: readStaticStringArray(getObjectPropValueNode(el, 'prerequisites')),
      recommendedChapters: readStaticStringArray(getObjectPropValueNode(el, 'recommendedChapters')),
    };
  });

  const expectedIds = [
    'sp_1', 'sp_2', 'sp_3', 'sp_4', 'sp_5', 'sp_6', 'sp_7', 'sp_8',
    'sp_9', 'sp_10', 'sp_11', 'sp_12',
    'sp_a2_1', 'sp_a2_2', 'sp_a2_3', 'sp_a2_4',
    'sp_13', 'sp_14', 'sp_15', 'sp_16',
  ];

  assert.deepEqual(
    parsedModules.map((m) => m.id),
    expectedIds,
    'studyPlanModules must maintain exact 20-module order A1 -> A2 -> B1'
  );

  const countsByLevel = parsedModules.reduce((acc, m) => {
    acc[m.cefrLevel] = (acc[m.cefrLevel] || 0) + 1;
    return acc;
  }, {});
  assert.deepEqual(countsByLevel, { A1: 12, A2: 4, B1: 4 });

  parsedModules.forEach((mod, idx) => {
    assert.equal(mod.stageOrder, idx + 1, `Expected stageOrder=${idx + 1} for ${mod.id}`);
    assert.ok(mod.recommendedChapters.length >= 1, `${mod.id} must recommend at least 1 chapter`);
    for (const chId of mod.recommendedChapters) {
      assert.ok(
        Number.isInteger(chId) && chId >= 1 && chId <= 22,
        `Invalid chapter ${chId} in ${mod.id}`
      );
    }
  });

  // Verify prerequisites reference known modules and form an acyclic DAG
  const validIdSet = new Set(expectedIds);
  const prereqMap = new Map(parsedModules.map((m) => [m.id, m.prerequisites]));
  for (const [id, deps] of prereqMap.entries()) {
    for (const dep of deps) {
      assert.ok(validIdSet.has(dep), `Unknown prerequisite "${dep}" in ${id}`);
      assert.notEqual(dep, id, `Self-dependency in ${id}`);
    }
  }

  const visitState = new Map();
  const hasCycle = (nodeId) => {
    const state = visitState.get(nodeId) || 0;
    if (state === 1) return true;
    if (state === 2) return false;
    visitState.set(nodeId, 1);
    for (const dep of prereqMap.get(nodeId) || []) {
      if (hasCycle(dep)) return true;
    }
    visitState.set(nodeId, 2);
    return false;
  };
  for (const id of validIdSet) {
    assert.equal(hasCycle(id), false, `Cyclic prerequisite graph detected at ${id}`);
  }
});

test('all JSX component tags and React.lazy imports across App and curriculum modules resolve cleanly', () => {
  const jsxFiles = [
    'src/data/studyPlanModules.jsx',
    'src/data/goetheModules.jsx',
    'src/App.jsx',
  ];

  for (const relPath of jsxFiles) {
    const { absPath, ast } = parseModuleAst(relPath, ['jsx']);
    const dir = path.dirname(absPath);
    const declaredOrImported = new Set();
    const usedJsxComponents = new Set();
    const lazyImportPaths = [];

    traverse(ast, {
      ImportDeclaration(p) {
        for (const spec of p.node.specifiers) {
          declaredOrImported.add(spec.local.name);
        }
      },
      VariableDeclarator(p) {
        if (p.node.id.type === 'Identifier') {
          declaredOrImported.add(p.node.id.name);
        }
      },
      FunctionDeclaration(p) {
        if (p.node.id?.type === 'Identifier') {
          declaredOrImported.add(p.node.id.name);
        }
      },
      JSXOpeningElement(p) {
        const nameNode = p.node.name;
        if (nameNode.type === 'JSXIdentifier' && /^[A-Z]/.test(nameNode.name)) {
          usedJsxComponents.add(nameNode.name);
        }
      },
      CallExpression(p) {
        if (p.node.callee.type === 'Identifier' && p.node.callee.name === 'lazy') {
          const arg = p.node.arguments[0];
          const body = arg?.body;
          if (body?.type === 'CallExpression' && body.callee.type === 'Import') {
            const target = resolveLiteralString(body.arguments[0]);
            if (target) lazyImportPaths.push(target);
          }
        }
      },
    });

    for (const compName of usedJsxComponents) {
      assert.ok(
        declaredOrImported.has(compName),
        `Missing import or declaration for JSX component <${compName}> in ${relPath}`
      );
    }

    for (const imp of lazyImportPaths) {
      const resolvedBase = path.resolve(dir, imp);
      const exists =
        fs.existsSync(resolvedBase) ||
        fs.existsSync(`${resolvedBase}.js`) ||
        fs.existsSync(`${resolvedBase}.jsx`);
      assert.ok(exists, `Broken lazy import "${imp}" in ${relPath}`);
    }
  }
});

test('A1-B1 educational and diagnostic modules contain zero outdoor solar roof terms', () => {
  const forbiddenPattern = /\b(dachmontage|dachhaken|ziegeldach|schrägdach|solardach)\b|auf dem dach/i;
  const auditedFiles = [
    'src/data/studyPlanModules.jsx',
    'src/data/goetheModules.jsx',
    'src/data/pedagogicalToolsData.js',
    'src/data/diagnosticQuestions.js',
    'src/data/goetheWritingScenarios.js',
  ];

  for (const relPath of auditedFiles) {
    const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    const match = content.match(forbiddenPattern);
    assert.equal(
      match,
      null,
      `Forbidden outdoor-roof term "${match?.[0]}" found in ${relPath}`
    );
  }
});

test('protected vocabulary corpus counts remain strictly invariant at 2,687 entries and 2,387 unique indices', () => {
  const countWordsInExport = (relPath, varName) => {
    const { ast } = parseModuleAst(relPath, ['jsx']);
    let total = 0;
    traverse(ast, {
      VariableDeclarator(p) {
        if (p.node.id.type === 'Identifier' && p.node.id.name === varName && p.node.init) {
          const targetNodes =
            p.node.init.type === 'ArrayExpression' ? p.node.init.elements : [p.node.init];
          for (const chapNode of targetNodes) {
            const wordsNode = getObjectPropValueNode(chapNode, 'words');
            if (wordsNode?.type === 'ArrayExpression') {
              total += wordsNode.elements.filter(Boolean).length;
            }
          }
        }
      },
    });
    return total;
  };

  const coreCount = countWordsInExport('src/data/chaptersCore.jsx', 'coreChapters');
  const extendedCount = countWordsInExport('src/data/chaptersExtended.jsx', 'extendedChapters');
  const redemittelCount = countWordsInExport('src/data/redemittelBegegnungen.js', 'redemittelChapter');

  assert.equal(coreCount, 1340, 'coreChapters must stay at 1,340 entries');
  assert.equal(extendedCount, 1192, 'extendedChapters must stay at 1,192 entries');
  assert.equal(redemittelCount, 155, 'redemittelChapter must stay at 155 entries');
  assert.equal(coreCount + extendedCount + redemittelCount, 2687);

  const vocabJson = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, 'vocabulario_completo.json'), 'utf8')
  );
  assert.equal(vocabJson.length, 2387, 'vocabulario_completo.json must stay at 2,387 entries');
  assert.equal(new Set(vocabJson.map((entry) => entry.id)).size, 2387);
});

test('firestore.rules and helpers.js match learningProfile 7-key contract and grammar_lab SRS source', () => {
  const rulesText = fs.readFileSync(path.join(REPO_ROOT, 'firestore.rules'), 'utf8');
  const helpersText = fs.readFileSync(path.join(REPO_ROOT, 'src/utils/helpers.js'), 'utf8');

  const profileKeys = Object.keys(normalizeLearningProfile(DEFAULT_LEARNING_PROFILE));
  assert.equal(profileKeys.length, 7);

  const fnMatch = rulesText.match(/function\s+isValidLearningProfileMap\s*\([\s\S]*?\n\s*\}/);
  assert.ok(fnMatch, 'firestore.rules must define isValidLearningProfileMap');
  for (const key of profileKeys) {
    assert.ok(
      fnMatch[0].includes(`'${key}'`),
      `firestore.rules isValidLearningProfileMap must explicitly validate "${key}"`
    );
  }

  assert.match(rulesText, /'learningProfile'\s+in\s+data|!'learningProfile'|\('learningProfile'\s+in\s+data\)/);
  assert.match(rulesText, /'grammar_lab'/);
  assert.match(helpersText, /payload\.learningProfile\s*=\s*normalizeLearningProfile/);
});
