import parser from '@babel/parser';
import traverseModule from '@babel/traverse';
import fs from 'fs';

const traverse = traverseModule.default || traverseModule;

const content = fs.readFileSync('scratch/chapters_restored_from_git.jsx', 'utf8');
const ast = parser.parse(content, {
  sourceType: 'module',
  plugins: ['jsx']
});

traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'chapters') {
      const init = path.node.init;
      if (init && init.type === 'ArrayExpression') {
        init.elements.forEach((chapter, idx) => {
          if (chapter.type === 'ObjectExpression') {
            const idProp = chapter.properties.find(p => p.key && p.key.name === 'id');
            if (idProp) {
              console.log(`Element ${idx}: id type = ${idProp.value.type}, value = ${idProp.value.value}`);
            }
          }
        });
      }
    }
  }
});
