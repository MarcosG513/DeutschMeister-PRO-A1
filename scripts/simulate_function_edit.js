import parser from '@babel/parser';
import generatorModule from '@babel/generator';
import traverseModule from '@babel/traverse';
import * as t from '@babel/types';
import fs from 'fs';

const traverse = traverseModule.default || traverseModule;
const generator = generatorModule.default || generatorModule;

const sourceFile = 'functions/index.js';
const destFile = 'scratch/index_proposed.js';

console.log(`Loading source file from ${sourceFile}...`);
const content = fs.readFileSync(sourceFile, 'utf8');

console.log('Parsing AST...');
const ast = parser.parse(content, {
  sourceType: 'module',
  plugins: ['jsx']
});

let modified = false;

traverse(ast, {
  FunctionDeclaration(path) {
    if (path.node.id.name === 'construirPromptDinamico') {
      const body = path.node.body;
      if (body && body.type === 'BlockStatement') {
        // Find the correct IfStatement starting with test variable `esPregunta`
        const ifStmt = body.body.find(stmt => {
          return stmt.type === 'IfStatement' && stmt.test.type === 'Identifier' && stmt.test.name === 'esPregunta';
        });
        
        if (ifStmt) {
          console.log('Found IfStatement starting with esPregunta.');
          // Traverse down the alternate path to find the final else block
          let currentIf = ifStmt;
          while (currentIf.alternate && currentIf.alternate.type === 'IfStatement') {
            currentIf = currentIf.alternate;
          }
          
          if (currentIf.alternate && currentIf.alternate.type === 'BlockStatement') {
            console.log('Found final else block in construirPromptDinamico.');
            
            const newElseCode = `
              // 🔥 NUEVA LÓGICA DE ENRUTAMIENTO SEMÁNTICO (NUBE)
              const esPersonaje = tipoLimpio.includes("adjetivo") || tipoLimpio.includes("verbo") || tipoLimpio.includes("acción") || tipoLimpio.includes("pronombre") || tipoLimpio.includes("sentimiento");
              const esAbstractoInanimado = tipoLimpio.includes("preposición") || tipoLimpio.includes("preposicion") || tipoLimpio.includes("adverbio") || tipoLimpio.includes("conjunción");

              // Filtro ampliado para determinar si lleva o no la esfera gramatical
              const isSinGenero = esPersonaje || esAbstractoInanimado || tipoLimpio.includes('expresión') || tipoLimpio.includes('expresion') || tipoLimpio.includes('frase') || tipoLimpio.includes('regla') || palabraLimpia.includes('+');

              let subjectType = conceptoIngles;
              const colorAsignado = hexAsignado; // Garantizar compatibilidad con hexAsignado

              // Asignación de sujeto y escudo anti-caritas según el tipo
              if (esPersonaje) {
                  subjectType = \`expressive human character/avatar demonstrating the concept of "\${conceptoIngles}"\`;
              } else if (esAbstractoInanimado) {
                  subjectType = \`faceless inanimate object or symbolic prop representing the concept of "\${conceptoIngles}"\`;
                  promptObj.style_rules += " CRITICAL: Must be an INANIMATE object or symbolic prop. Absolutely NO FACES, NO EYES, NO MOUTHS, NO ANIMALS, NO CHARACTERS, NO ANTHROPOMORPHISM.";
              } else {
                  subjectType = \`UI icon representing "\${conceptoIngles}"\`;
              }

              // Insertar el sujeto principal
              promptObj.subjects.push({
                  "type": subjectType,
                  "color": "vibrant natural clay colors",
                  "position": isSinGenero ? "centered" : "left"
              });

              // Insertar la esfera indicadora de género si corresponde
              if (!isSinGenero) {
                  promptObj.subjects.push({
                      "type": "magical glowing sphere",
                      "color": \`strictly \${colorAsignado}\`,
                      "position": "floating gently right next to the main object"
                  });
              }
            `;
            
            const parsedElse = parser.parse(`function dummy() { ${newElseCode} }`, {
              sourceType: 'module',
              plugins: ['jsx']
            }).program.body[0].body;
            
            currentIf.alternate = parsedElse;
            modified = true;
          }
        }
      }
    }
  }
});

if (!modified) {
  console.error('Error: construirPromptDinamico final else block could not be modified!');
  process.exit(1);
}

console.log('Generating output code...');
const output = generator(ast, {
  jsescOption: { minimal: true }
});

fs.writeFileSync(destFile, output.code, 'utf8');
console.log(`Successfully wrote to ${destFile}!`);
