import parser from '@babel/parser';
import traverseModule from '@babel/traverse';
import fs from 'fs';

const traverse = traverseModule.default || traverseModule;

const content = fs.readFileSync('scratch/chapters_restored_from_git.jsx', 'utf8');
const ast = parser.parse(content, {
  sourceType: 'module',
  plugins: ['jsx']
});

let chaptersArrayNode = null;
traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'chapters') {
      chaptersArrayNode = path.node.init;
    }
  }
});

if (chaptersArrayNode) {
  console.log('Chapters array elements count:', chaptersArrayNode.elements.length);
  for (let i = 14; i < chaptersArrayNode.elements.length; i++) {
    const el = chaptersArrayNode.elements[i];
    if (el) {
      const idProp = el.properties.find(p => p.key && p.key.name === 'id');
      console.log(`Element ${i}: id = ${idProp ? idProp.value.value : 'no id'}`);
    }
  }
} else {
  console.log('chapters array not found!');
}
