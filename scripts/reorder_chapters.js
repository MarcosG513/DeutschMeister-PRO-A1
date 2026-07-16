import parser from '@babel/parser';
import generatorModule from '@babel/generator';
import traverseModule from '@babel/traverse';
import * as t from '@babel/types';
import fs from 'fs';

const traverse = traverseModule.default || traverseModule;
const generator = generatorModule.default || generatorModule;

const filePath = 'src/data/chapters.jsx';
const content = fs.readFileSync(filePath, 'utf8');

console.log('Parsing chapters.jsx AST...');
const ast = parser.parse(content, {
  sourceType: 'module',
  plugins: ['jsx']
});

// The target sequence and titles
const mapping = [
  { id: 0, title: "Kapitel 1: Alphabet & Zahlen" },
  { id: 1, title: "Kapitel 2: Zeit & Datum" },
  { id: 2, title: "Kapitel 3: Personen & Kontakte" },
  { id: 14, title: "Kapitel 4: Basisverben & Adjektive" },
  { id: 15, title: "Kapitel 5: Adverbien & Fragewörter" },
  { id: 13, title: "Kapitel 6: Grammatik: Konnektoren" },
  { id: 3, title: "Kapitel 7: Wohnen" },
  { id: 5, title: "Kapitel 8: Essen & Trinken" },
  { id: 10, title: "Kapitel 9: Kleidung" },
  { id: 6, title: "Kapitel 10: Einkaufen" },
  { id: 4, title: "Kapitel 11: Freizeit" },
  { id: 7, title: "Kapitel 12: Reisen & Verkehr" },
  { id: 12, title: "Kapitel 13: Fahrschuldeutsch: Auto" },
  { id: 8, title: "Kapitel 14: Post & Bank" },
  { id: 9, title: "Kapitel 15: Gesundheit" },
  { id: 11, title: "Kapitel 16: Schule & Beruf" },
  { id: 17, title: "Kapitel 17: Digitale Welt & IT" },
  { id: 16, title: "Kapitel 18: Elektrotechnik & Solar" }
];

let chaptersArrayNode = null;

traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'chapters') {
      chaptersArrayNode = path.node.init;
    }
  }
});

if (!chaptersArrayNode || chaptersArrayNode.type !== 'ArrayExpression') {
  console.error('Error: chapters variable not found or is not an ArrayExpression!');
  process.exit(1);
}

console.log(`Current chapters array elements count: ${chaptersArrayNode.elements.length}`);

// Map of id -> node
const chaptersMap = new Map();
chaptersArrayNode.elements.forEach(el => {
  if (el.type === 'ObjectExpression') {
    const idProp = el.properties.find(p => p.key && p.key.name === 'id');
    if (idProp && idProp.value.type === 'NumericLiteral') {
      chaptersMap.set(idProp.value.value, el);
    }
  }
});

console.log(`Mapped chapters IDs: ${Array.from(chaptersMap.keys()).join(', ')}`);

// Reconstruct elements array in new order and update titles
const newElements = [];
mapping.forEach(m => {
  const node = chaptersMap.get(m.id);
  if (node) {
    // Update title property
    const titleProp = node.properties.find(p => p.key && p.key.name === 'title');
    if (titleProp) {
      titleProp.value = t.stringLiteral(m.title);
    }
    newElements.push(node);
  } else {
    console.error(`Warning: Chapter with id: ${m.id} not found in map!`);
  }
});

// If there are other elements in the chapters array that were not in the mapping, keep them
chaptersArrayNode.elements.forEach(el => {
  if (el.type === 'ObjectExpression') {
    const idProp = el.properties.find(p => p.key && p.key.name === 'id');
    const idVal = idProp && idProp.value.value;
    if (idVal !== undefined && !mapping.some(m => m.id === idVal)) {
      newElements.push(el);
      console.log(`Kept extra chapter with id: ${idVal}`);
    }
  }
});

chaptersArrayNode.elements = newElements;
console.log('Reordered chapters array.');

// Generate code back
console.log('Generating output code...');
const output = generator(ast, {
  jsescOption: { minimal: true }
});

fs.writeFileSync(filePath, output.code, 'utf8');
console.log('Successfully wrote to src/data/chapters.jsx!');
