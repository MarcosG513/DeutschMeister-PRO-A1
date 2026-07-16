import parser from '@babel/parser';
import generatorModule from '@babel/generator';
import traverseModule from '@babel/traverse';
import * as t from '@babel/types';
import fs from 'fs';
import { execSync } from 'child_process';

const traverse = traverseModule.default || traverseModule;
const generator = generatorModule.default || generatorModule;

const sourceFile = process.argv[2] || 'src/data/chapters.jsx';
const destFile = process.argv[3] || 'src/data/chapters.jsx';

console.log(`Loading source file from ${sourceFile}...`);
const content = fs.readFileSync(sourceFile, 'utf8');

console.log('Parsing AST...');
const ast = parser.parse(content, {
  sourceType: 'module',
  plugins: ['jsx']
});

// Definitions of words to inject per chapter ID
const wordsToInject = {
  // Kapitel 8: Essen & Trinken (id: 5)
  5: [
    { de: "das Ei", pron: "das ai", es: "el huevo", type: "Sustantivo", category: "Lebensmittel", plural: "die Eier", en: "a white egg", exampleSentenceDe: "Ich esse ein gekochtes Ei zum Frühstück.", exampleSentenceEs: "Yo como un huevo cocido de desayuno." },
    { de: "das Salz", pron: "das salts", es: "la sal", type: "Sustantivo", category: "Lebensmittel", plural: "die Salze", en: "a salt shaker", exampleSentenceDe: "Die Suppe braucht mehr Salz.", exampleSentenceEs: "La sopa necesita más sal." },
    { de: "der Pfeffer", pron: "dea pfe-fa", es: "la pimienta", type: "Sustantivo", category: "Lebensmittel", plural: "-", en: "a black pepper shaker", exampleSentenceDe: "Ich brauche Salz und Pfeffer.", exampleSentenceEs: "Necesito sal y pimienta." },
    { de: "der Zucker", pron: "dea tsu-ka", es: "el azúcar", type: "Sustantivo", category: "Lebensmittel", plural: "-", en: "a few white sugar cubes", exampleSentenceDe: "Trinkst du den Kaffee mit Zucker?", exampleSentenceEs: "¿Bebes el café con azúcar?" },
    { de: "die Nudeln", pron: "di nu-deln", es: "la pasta / los fideos", type: "Sustantivo (Plural)", category: "Lebensmittel", plural: "die Nudeln", en: "a bowl of cooked pasta", exampleSentenceDe: "Wir kochen heute Abend Nudeln.", exampleSentenceEs: "Cocinamos pasta esta noche." },
    { de: "die Wurst", pron: "di vurst", es: "el embutido / la salchicha", type: "Sustantivo", category: "Lebensmittel", plural: "die Würste", en: "a traditional german sausage", exampleSentenceDe: "Ich möchte ein Brötchen mit Wurst.", exampleSentenceEs: "Quisiera un panecillo con embutido." }
  ],
  // Kapitel 5: Adverbien & Fragewörter (id: 15)
  15: [
    { de: "vorgestern", pron: "foa-gues-tean", es: "anteayer", type: "Adverbio", category: "Zeitadverbien", en: "a calendar page with a backwards arrow", exampleSentenceDe: "Ich war vorgestern im Kino.", exampleSentenceEs: "Fui al cine anteayer." },
    { de: "übermorgen", pron: "u-ba-mor-guen", es: "pasado mañana", type: "Adverbio", category: "Zeitadverbien", en: "a calendar page with a forwards arrow", exampleSentenceDe: "Wir fliegen übermorgen nach Berlin.", exampleSentenceEs: "Volamos a Berlín pasado mañana." },
    { de: "morgens", pron: "mor-guens", es: "por las mañanas", type: "Adverbio", category: "Häufigkeit", en: "a bright morning sun", exampleSentenceDe: "Morgens trinke ich immer Tee.", exampleSentenceEs: "Por las mañanas siempre bebo té." },
    { de: "abends", pron: "a-bents", es: "por las tardes/noches", type: "Adverbio", category: "Häufigkeit", en: "a crescent moon with stars", exampleSentenceDe: "Abends lese ich ein Buch.", exampleSentenceEs: "Por las noches leo un libro." }
  ],
  // Kapitel 16: Schule & Beruf (id: 11)
  11: [
    { de: "der Kellner / die Kellnerin", pron: "dea kel-na / di kel-ne-rin", es: "el camarero / la camarera", type: "Sustantivo", category: "Beruf", plural: "die Kellner / die Kellnerinnen", en: "a silver serving tray", exampleSentenceDe: "Der Kellner bringt das Essen.", exampleSentenceEs: "Camarero trae la comida." },
    { de: "der Koch / die Köchin", pron: "dea koj / di ko-jin", es: "el cocinero / la cocinera", type: "Sustantivo", category: "Beruf", plural: "die Köche / die Köchinnen", en: "a white chef hat and a spatula", exampleSentenceDe: "Der Koch kocht sehr gut.", exampleSentenceEs: "El cocinero cocina muy bien." },
    { de: "der Polizist / die Polizistin", pron: "dea po-li-tsist / di po-li-tsis-tin", es: "el policía / la mujer policía", type: "Sustantivo", category: "Beruf", plural: "die Polizisten / die Polizistinnen", en: "a silver police badge", exampleSentenceDe: "Die Polizei hilft den Menschen.", exampleSentenceEs: "La policía ayuda a las personas." },
    { de: "der Ingenieur / die Ingenieurin", pron: "dea in-ye-niur / di in-ye-niu-rin", es: "el ingeniero / la ingeniera", type: "Sustantivo", category: "Beruf", plural: "die Ingenieure / die Ingenieurinnen", en: "a yellow safety helmet over blueprints", exampleSentenceDe: "Sie arbeitet als Ingenieurin bei BMW.", exampleSentenceEs: "Ella trabaja como ingeniera en BMW." },
    { de: "das Heft", pron: "das jeft", es: "el cuaderno", type: "Sustantivo", category: "Büro", plural: "die Hefte", en: "a simple spiral notebook", exampleSentenceDe: "Schreiben Sie das bitte in Ihr Heft.", exampleSentenceEs: "Escriba eso en su cuaderno, por favor." },
    { de: "das Papier", pron: "das pa-pia", es: "el papel", type: "Sustantivo", category: "Büro", plural: "die Papiere", en: "a stack of blank white paper sheets", exampleSentenceDe: "Der Drucker braucht neues Papier.", exampleSentenceEs: "La impresora necesita papel nuevo." },
    { de: "der Radiergummi", pron: "dea ra-dia-gu-mi", es: "el borrador / la goma", type: "Sustantivo", category: "Büro", plural: "die Radiergummis", en: "a classic pink and blue eraser", exampleSentenceDe: "Hast du einen Radiergummi für mich?", exampleSentenceEs: "¿Tienes un borrador para mí?" },
    { de: "der Rucksack", pron: "dea ruk-sak", es: "la mochila", type: "Sustantivo", category: "Büro", plural: "die Rucksäcke", en: "a colorful school backpack", exampleSentenceDe: "Mein Rucksack ist sehr schwer.", exampleSentenceEs: "Mi mochila es muy pesada." }
  ],
  // Kapitel 12: Reisen & Verkehr (id: 7)
  7: [
    { de: "der Strand", pron: "dea shtrant", es: "la playa", type: "Sustantivo", category: "Natur", plural: "die Strände", en: "a sandy beach with a colorful sun umbrella", exampleSentenceDe: "Wir machen Urlaub am Strand.", exampleSentenceEs: "Nosotros pasamos las vacaciones en la playa." },
    { de: "der Berg", pron: "dea beark", es: "la montaña", type: "Sustantivo", category: "Natur", plural: "die Berge", en: "a high mountain with a snowy peak", exampleSentenceDe: "Wir wandern oft in den Bergen.", exampleSentenceEs: "Hacemos senderismo a menudo en las montañas." },
    { de: "die Wolke", pron: "di vol-ke", es: "la nube", type: "Sustantivo", category: "Wetter", plural: "die Wolken", en: "a fluffy white cloud", exampleSentenceDe: "Es gibt heute viele Wolken am Himmel.", exampleSentenceEs: "Hoy hay muchas nubes en el cielo." },
    { de: "das Gewitter", pron: "das gue-vi-ta", es: "la tormenta", type: "Sustantivo", category: "Wetter", plural: "die Gewitter", en: "a dark storm cloud with a yellow lightning bolt", exampleSentenceDe: "Heute Abend gibt es ein Gewitter.", exampleSentenceEs: "Esta noche habrá una tormenta." }
  ],
  // Kapitel 9: Kleidung (id: 10)
  10: [
    { de: "orange", pron: "o-ran-she", es: "naranja", type: "Adjetivo", category: "Farben", en: "a vibrant splash of orange paint", exampleSentenceDe: "Meine neue Jacke ist orange.", exampleSentenceEs: "Mi nueva chaqueta es naranja." },
    { de: "rosa", pron: "ro-sa", es: "rosa", type: "Adjetivo", category: "Farben", en: "a vibrant splash of pink paint", exampleSentenceDe: "Das Mädchen trägt ein rosa Kleid.", exampleSentenceEs: "La niña lleva un vestido rosa." },
    { de: "lila", pron: "li-la", es: "morado / lila", type: "Adjetivo", category: "Farben", en: "a vibrant splash of purple paint", exampleSentenceDe: "Die Blumen im Garten sind lila.", exampleSentenceEs: "Las flores en el jardín son moradas." }
  ]
};

// Helper to convert JS object to AST nodes
function objToAst(obj) {
  const props = Object.entries(obj).map(([key, val]) => {
    return t.objectProperty(t.identifier(key), t.stringLiteral(val));
  });
  return t.objectExpression(props);
}

traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'chapters') {
      const init = path.node.init;
      if (init && init.type === 'ArrayExpression') {
        init.elements.forEach(chapter => {
          if (chapter.type === 'ObjectExpression') {
            const idProp = chapter.properties.find(p => p.key && p.key.name === 'id');
            const idVal = idProp && idProp.value.value;
            
            if (idVal !== undefined && wordsToInject[idVal]) {
              const wordsProp = chapter.properties.find(p => p.key && p.key.name === 'words');
              if (wordsProp && wordsProp.value.type === 'ArrayExpression') {
                const wordsArray = wordsProp.value.elements;
                const list = wordsToInject[idVal];
                
                list.forEach(wordObj => {
                  // Check if already exists to prevent duplicate runs
                  const exists = wordsArray.some(w => {
                    if (w.type === 'ObjectExpression') {
                      const deProp = w.properties.find(p => p.key && p.key.name === 'de');
                      return deProp && deProp.value.value === wordObj.de;
                    }
                    return false;
                  });
                  
                  if (!exists) {
                    wordsArray.push(objToAst(wordObj));
                    console.log(`Injected word "${wordObj.de}" into chapter ID ${idVal}`);
                  } else {
                    console.log(`Word "${wordObj.de}" already exists in chapter ID ${idVal}, skipping`);
                  }
                });
              }
            }
          }
        });
      }
    }
  }
});

console.log('Generating output code...');
const output = generator(ast, {
  jsescOption: { minimal: true }
});

fs.writeFileSync(destFile, output.code, 'utf8');
console.log(`Successfully wrote to ${destFile}!`);
