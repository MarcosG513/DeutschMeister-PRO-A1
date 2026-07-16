import parser from '@babel/parser';
import traverseModule from '@babel/traverse';
import fs from 'fs';

const traverse = traverseModule.default || traverseModule;

const content = fs.readFileSync('scratch/chapters_restored_from_git.jsx', 'utf8');
const ast = parser.parse(content, {
  sourceType: 'module',
  plugins: ['jsx']
});

let found = false;
traverse(ast, {
  ObjectExpression(path) {
    const idProp = path.node.properties.find(p => p.key && p.key.name === 'id');
    if (idProp && idProp.value.type === 'NumericLiteral' && idProp.value.value === 16) {
      console.log('FOUND Kapitel 16 ObjectExpression!');
      const titleProp = path.node.properties.find(p => p.key && p.key.name === 'title');
      console.log('Title:', titleProp ? titleProp.value.value : 'no title');
      found = true;
    }
  }
});

if (!found) {
  console.log('Kapitel 16 ObjectExpression NOT found by traversing all ObjectExpressions!');
}
