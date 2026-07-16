import parser from '@babel/parser';
import generatorModule from '@babel/generator';
import traverseModule from '@babel/traverse';
import * as t from '@babel/types';
import fs from 'fs';

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
    { de: "die Zwiebel", pron: "di tsví-bel", es: "la cebolla", type: "Sustantivo", category: "Lebensmittel", plural: "die Zwiebeln", en: "a cute 3D isometric UI icon of a single raw yellow onion", exampleSentenceDe: "Ich schneide die Zwiebel.", exampleSentenceEs: "Yo corto la cebolla." },
    { de: "der Knoblauch", pron: "dea knóp-lauj", es: "el ajo", type: "Sustantivo", category: "Lebensmittel", plural: "-", en: "a cute 3D isometric UI icon of a white garlic bulb", exampleSentenceDe: "Das Essen hat viel Knoblauch.", exampleSentenceEs: "La comida tiene mucho ajo." },
    { de: "die Karotte", pron: "di ka-ró-te", es: "la zanahoria", type: "Sustantivo", category: "Lebensmittel", plural: "die Karotten", en: "a cute 3D isometric UI icon of an orange carrot with green leaves", exampleSentenceDe: "Der Hase isst eine Karotte.", exampleSentenceEs: "El conejo come una zanahoria." },
    { de: "die Erdbeere", pron: "di éat-be-re", es: "la fresa", type: "Sustantivo", category: "Lebensmittel", plural: "die Erdbeeren", en: "a cute 3D isometric UI icon of a fresh red strawberry", exampleSentenceDe: "Ich mag Erdbeeren mit Sahne.", exampleSentenceEs: "Me gustan las fresas con nata." },
    { de: "die Traube", pron: "di tráu-be", es: "la uva", type: "Sustantivo", category: "Lebensmittel", plural: "die Trauben", en: "a cute 3D isometric UI icon of a bunch of purple grapes", exampleSentenceDe: "Die Trauben sind sehr süß.", exampleSentenceEs: "Las uvas son muy dulces." },
    { de: "der Essig", pron: "dea é-sij", es: "el vinagre", type: "Sustantivo", category: "Lebensmittel", plural: "die Essige", en: "a cute 3D isometric UI icon of a glass bottle filled with dark vinegar", exampleSentenceDe: "Der Salat braucht Öl und Essig.", exampleSentenceEs: "La ensalada necesita aceite y vinagre." },
    { de: "das Rindfleisch", pron: "das rínt-flaish", es: "la carne de res", type: "Sustantivo", category: "Lebensmittel", plural: "-", en: "a cute 3D isometric UI icon of a raw beef steak cut", exampleSentenceDe: "Ich esse heute Rindfleisch.", exampleSentenceEs: "Hoy como carne de res." },
    { de: "die Marmelade", pron: "di mar-me-lá-de", es: "la mermelada", type: "Sustantivo", category: "Lebensmittel", plural: "die Marmeladen", en: "a cute 3D isometric UI icon of a glass jar filled with red strawberry jam", exampleSentenceDe: "Ich esse Brot mit Marmelade.", exampleSentenceEs: "Yo como pan con mermelada." },
    { de: "der Honig", pron: "dea jó-nij", es: "la miel", type: "Sustantivo", category: "Lebensmittel", plural: "die Honige", en: "a cute 3D isometric UI icon of a wooden dipper with golden honey", exampleSentenceDe: "Ich trinke Tee mit Honig.", exampleSentenceEs: "Bebo té con miel." },
    { de: "das Eis", pron: "das ais", es: "el helado / el hielo", type: "Sustantivo", category: "Lebensmittel", plural: "-", en: "a cute 3D isometric UI icon of a strawberry ice cream cone", exampleSentenceDe: "Im Sommer esse ich gern Eis.", exampleSentenceEs: "En verano me gusta comer helado." }
  ],
  // Kapitel 9: Kleidung (id: 10)
  10: [
    { de: "die Socke", pron: "di zó-ke", es: "el calcetín", type: "Sustantivo", category: "Kleidungsstücke", plural: "die Socken", en: "a cute 3D isometric UI icon of a striped cotton sock", exampleSentenceDe: "Wo ist meine rechte Socke?", exampleSentenceEs: "¿Dónde está mi calcetín derecho?" },
    { de: "die Unterwäsche", pron: "di ún-tea-ve-she", es: "la ropa interior", type: "Sustantivo", category: "Kleidungsstücke", plural: "-", en: "a cute 3D isometric UI icon of neatly folded white cotton underwear", exampleSentenceDe: "Ich brauche neue Unterwäsche.", exampleSentenceEs: "Necesito ropa interior nueva." },
    { de: "der Hut", pron: "dea jut", es: "el sombrero", type: "Sustantivo", category: "Kleidungsstücke", plural: "die Hüte", en: "a cute 3D isometric UI icon of a classic brown fedora hat", exampleSentenceDe: "Der Mann trägt einen schwarzen Hut.", exampleSentenceEs: "El hombre lleva un sombrero negro." },
    { de: "die Mütze", pron: "di mú-tse", es: "el gorro", type: "Sustantivo", category: "Kleidungsstücke", plural: "die Mützen", en: "a cute 3D isometric UI icon of a warm winter beanie hat with a pompom", exampleSentenceDe: "Im Winter brauche ich eine Mütze.", exampleSentenceEs: "En invierno necesito un gorro." },
    { de: "der Handschuh", pron: "dea jánt-shu", es: "el guante", type: "Sustantivo", category: "Kleidungsstücke", plural: "die Handschuhe", en: "a cute 3D isometric UI icon of a thick winter wool glove", exampleSentenceDe: "Meine Hände sind kalt. Ich brauche Handschuhe.", exampleSentenceEs: "Mis manos están frías. Necesito guantes." },
    { de: "der Anzug", pron: "dea án-tsuk", es: "el traje", type: "Sustantivo", category: "Kleidungsstücke", plural: "die Anzüge", en: "a cute 3D isometric UI icon of a formal black business suit jacket and tie", exampleSentenceDe: "Für die Hochzeit trage ich einen Anzug.", exampleSentenceEs: "Para la boda llevo un traje." },
    { de: "das Kleid", pron: "das klait", es: "el vestido", type: "Sustantivo", category: "Kleidungsstücke", plural: "die Kleider", en: "a cute 3D isometric UI icon of a beautiful red summer dress", exampleSentenceDe: "Das rote Kleid ist sehr schön.", exampleSentenceEs: "El vestido rojo es muy bonito." },
    { de: "die Sonnenbrille", pron: "di zó-nen-bri-le", es: "las gafas de sol", type: "Sustantivo", category: "Accessoires", plural: "die Sonnenbrillen", en: "a cute 3D isometric UI icon of stylish black sunglasses", exampleSentenceDe: "Die Sonne scheint. Wo ist meine Sonnenbrille?", exampleSentenceEs: "El sol brilla. ¿Dónde están mis gafas de sol?" },
    { de: "der Knopf", pron: "dea knopf", es: "el botón", type: "Sustantivo", category: "Accessoires", plural: "die Knöpfe", en: "a cute 3D isometric UI icon of a round plastic shirt button", exampleSentenceDe: "Der Knopf von meinem Hemd ist kaputt.", exampleSentenceEs: "Der Knopf von meinem Hemd ist kaputt." }, // Wait, exampleSentenceEs here should be: "El botón de mi camisa está roto."
    { de: "der Reißverschluss", pron: "dea ráis-fea-shlus", es: "la cremallera", type: "Sustantivo", category: "Accessoires", plural: "die Reißverschlüsse", en: "a cute 3D isometric UI icon of a metallic zipper half open", exampleSentenceDe: "Der Reißverschluss meiner Jacke klemmt.", exampleSentenceEs: "La cremallera de mi chaqueta está atascada." }
  ],
  // Kapitel 15: Gesundheit (id: 9)
  9: [
    { de: "das Gesicht", pron: "das gue-zíjt", es: "la cara", type: "Sustantivo", category: "Körper", plural: "die Gesichter", en: "a cute 3D isometric UI icon of a stylized smooth mannequin face", exampleSentenceDe: "Bitte wasch dir das Gesicht.", exampleSentenceEs: "Por favor, lávate la cara." },
    { de: "das Knie", pron: "das kní", es: "la rodilla", type: "Sustantivo", category: "Körper", plural: "die Knie", en: "a cute 3D isometric UI icon of a stylized bent leg showing the knee joint", exampleSentenceDe: "Mein Knie tut sehr weh.", exampleSentenceEs: "Mi rodilla me duele mucho." },
    { de: "die Schulter", pron: "di shúl-ta", es: "el hombro", type: "Sustantivo", category: "Körper", plural: "die Schultern", en: "a cute 3D isometric UI icon of a stylized human shoulder area", exampleSentenceDe: "Ich habe Schmerzen in der rechten Schulter.", exampleSentenceEs: "Tengo dolores en el hombro derecho." },
    { de: "der Magen", pron: "dea má-guen", es: "el estómago", type: "Sustantivo", category: "Körper", plural: "die Mägen", en: "a cute 3D isometric UI icon of an anatomical stomach organ", exampleSentenceDe: "Der Kaffee ist nicht gut für meinen Magen.", exampleSentenceEs: "El café no es bueno para mi estómago." },
    { de: "das Blut", pron: "das blut", es: "la sangre", type: "Sustantivo", category: "Körper", plural: "-", en: "a cute 3D isometric UI icon of a bright red blood drop", exampleSentenceDe: "Ich habe Angst vor Blut.", exampleSentenceEs: "Le tengo miedo a la sangre." },
    { de: "die Spritze", pron: "di shprí-tse", es: "la inyección / jeringa", type: "Sustantivo", category: "Medizin", plural: "die Spritzen", en: "a cute 3D isometric UI icon of a medical syringe with a needle", exampleSentenceDe: "Der Arzt gibt mir eine Spritze.", exampleSentenceEs: "El médico me pone una inyección." },
    { de: "der Verband", pron: "dea fea-bánt", es: "el vendaje", type: "Sustantivo", category: "Medizin", plural: "die Verbände", en: "a cute 3D isometric UI icon of a roll of white medical bandage", exampleSentenceDe: "Die Krankenschwester wechselt den Verband.", exampleSentenceEs: "La enfermera cambia el vendaje." },
    { de: "der Hustensaft", pron: "dea jús-ten-zaft", es: "el jarabe para la tos", type: "Sustantivo", category: "Medizin", plural: "die Hustensäfte", en: "a cute 3D isometric UI icon of a medicine bottle with a measuring spoon", exampleSentenceDe: "Nimm diesen Hustensaft dreimal täglich.", exampleSentenceEs: "Toma este jarabe para la tos tres veces al día." },
    { de: "gesund", pron: "gue-zúnt", es: "sano / saludable", type: "Adjetivo", category: "Krankheit", en: "a cute 3D isometric UI icon of a green apple with a medical cross", exampleSentenceDe: "Ich esse viel Obst, um gesund zu bleiben.", exampleSentenceEs: "Como mucha fruta para mantenerme sano." },
    { de: "sich erkälten", pron: "zij ea-kél-ten", es: "resfriarse", type: "Verbo", category: "Krankheit", regimen: "Reflexivo", en: "a cute 3D isometric UI icon of a tissue box", exampleSentenceDe: "Zieh dich warm an, sonst erkältest du dich.", exampleSentenceEs: "Abrígate, de lo contrario te resfriarás." }
  ],
  // Kapitel 4: Basisverben & Adjektive (id: 14)
  14: [
    { de: "sauber", pron: "záu-ba", es: "limpio", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a sparkling clean white plate", exampleSentenceDe: "Das Zimmer ist jetzt ganz sauber.", exampleSentenceEs: "La habitación está completamente limpia ahora." },
    { de: "schmutzig", pron: "shmú-tsij", es: "sucio", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a white plate with brown mud stains", exampleSentenceDe: "Deine Schuhe sind sehr schmutzig.", exampleSentenceEs: "Tus zapatos están muy sucios." },
    { de: "voll", pron: "fol", es: "lleno", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a glass filled to the top with blue water", exampleSentenceDe: "Der Bus ist heute sehr voll.", exampleSentenceEs: "El autobús está muy lleno hoy." },
    { de: "leer", pron: "lea", es: "vacío", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of an empty transparent drinking glass", exampleSentenceDe: "Mein Glas ist schon leer.", exampleSentenceEs: "Mi vaso ya está vacío." },
    { de: "stark", pron: "shtark", es: "fuerte", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a heavy iron dumbbell weight", exampleSentenceDe: "Der Kaffee ist mir zu stark.", exampleSentenceEs: "El café está demasiado fuerte para mí." },
    { de: "schwach", pron: "shvaj", es: "débil", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a fragile breaking twig", exampleSentenceDe: "Nach der Krankheit fühlte er sich schwach.", exampleSentenceEs: "Después de la enfermedad él se sentía débil." },
    { de: "müde", pron: "mǘ-de", es: "cansado", type: "Adjetivo", category: "Gefühle", en: "a cute 3D isometric UI icon of a sleeping crescent moon with Zzz symbols", exampleSentenceDe: "Es ist spät. Ich bin sehr müde.", exampleSentenceEs: "Es tarde. Estoy muy cansado." },
    { de: "glücklich", pron: "glǘk-lij", es: "feliz", type: "Adjetivo", category: "Gefühle", en: "a cute 3D isometric UI icon of a bright yellow smiling star", exampleSentenceDe: "Das kleine Kind ist sehr glücklich.", exampleSentenceEs: "El niño pequeño está muy feliz." },
    { de: "traurig", pron: "tráu-rij", es: "triste", type: "Adjetivo", category: "Gefühle", en: "a cute 3D isometric UI icon of a blue rain cloud with a falling tear", exampleSentenceDe: "Der film hat ein trauriges Ende.", exampleSentenceEs: "La película tiene un final triste." },
    { de: "wütend", pron: "vǘ-tent", es: "enojado", type: "Adjetivo", category: "Gefühle", en: "a cute 3D isometric UI icon of a red storm cloud with lightning", exampleSentenceDe: "Warum bist du so wütend auf mich?", exampleSentenceEs: "¿Por qué estás tan enojado conmigo?" }
  ],
  // Kapitel 12: Reisen & Verkehr (id: 7)
  7: [
    { de: "das Gepäck", pron: "das gue-pék", es: "el equipaje", type: "Sustantivo", category: "Reise", plural: "-", en: "a cute 3D isometric UI icon of a stack of travel suitcases", exampleSentenceDe: "Wir haben viel Gepäck für die Reise.", exampleSentenceEs: "Tenemos mucho equipaje para el viaje." },
    { de: "der Koffer", pron: "dea kó-fa", es: "la maleta", type: "Sustantivo", category: "Reise", plural: "die Koffer", en: "a cute 3D isometric UI icon of a hard shell rolling suitcase", exampleSentenceDe: "Mein Koffer ist zu schwer.", exampleSentenceEs: "Mi maleta pesa demasiado." },
    { de: "der Fahrplan", pron: "dea fár-plan", es: "el horario de transporte", type: "Sustantivo", category: "Verkehr", plural: "die Fahrpläne", en: "a cute 3D isometric UI icon of a train station schedule board", exampleSentenceDe: "Wir müssen den Fahrplan prüfen.", exampleSentenceEs: "Tenemos que revisar el horario." },
    { de: "der Bahnsteig", pron: "dea bán-shtaig", es: "el andén", type: "Sustantivo", category: "Verkehr", plural: "die Bahnsteige", en: "a cute 3D isometric UI icon of an empty concrete train platform edge", exampleSentenceDe: "Der Zug nach München hält an Bahnsteig 3.", exampleSentenceEs: "El tren a Múnich para en el andén 3." },
    { de: "der Passagier", pron: "dea pa-za-shía", es: "el pasajero", type: "Sustantivo", category: "Verkehr", plural: "die Passagiere", en: "a cute 3D isometric UI icon of a stylized passenger sitting on a bus seat", exampleSentenceDe: "Der Passagier steigt in den Zug ein.", exampleSentenceEs: "El pasajero sube al tren." },
    { de: "der Fahrkartenschalter", pron: "dea fár-kar-ten-shal-ta", es: "la taquilla de billetes", type: "Sustantivo", category: "Verkehr", plural: "die Fahrkartenschalter", en: "a cute 3D isometric UI icon of a ticket vending booth with a glass window", exampleSentenceDe: "Ich kaufe mein Ticket am Fahrkartenschalter.", exampleSentenceEs: "Compro mi billete en la taquilla." },
    { de: "abfahren", pron: "áp-fa-ren", es: "partir / salir", type: "Verbo", category: "Aktionen", regimen: "Separable (ab-) / + sein", en: "a cute 3D isometric UI icon of a train moving away on tracks", exampleSentenceDe: "Der Bus fährt pünktlich um 8 Uhr ab.", exampleSentenceEs: "El autobús sale puntualmente a las 8." },
    { de: "ankommen", pron: "án-ko-men", es: "llegar", type: "Verbo", category: "Aktionen", regimen: "Separable (an-) / + sein", en: "a cute 3D isometric UI icon of a train arriving at a station platform", exampleSentenceDe: "Wann kommen wir in Berlin an?", exampleSentenceEs: "¿Cuándo llegamos a Berlín?" },
    { de: "das Reisebüro", pron: "das rái-ze-bü-ro", es: "la agencia de viajes", type: "Sustantivo", category: "Reise", plural: "die Reisebüros", en: "a cute 3D isometric UI icon of a storefront with a globe and an airplane sign", exampleSentenceDe: "Wir buchen unseren Urlaub im Reisebüro.", exampleSentenceEs: "Reservamos nuestras vacaciones en la agencia de viajes." },
    { de: "der Reiseführer", pron: "dea rái-ze-fü-ra", es: "la guía turística (libro)", type: "Sustantivo", category: "Reise", plural: "die Reiseführer", en: "a cute 3D isometric UI icon of an open travel guide book with a map and compass", exampleSentenceDe: "Dieser Reiseführer für Italien ist sehr gut.", exampleSentenceEs: "Esta guía turística para Italia es muy buena." }
  ]
};

// Fix German/Spanish translation for Knopf: "El botón de mi camisa está roto."
const knopfWord = wordsToInject[10].find(w => w.de === 'der Knopf');
if (knopfWord) {
  knopfWord.es = "el botón";
  knopfWord.exampleSentenceEs = "El botón de mi camisa está roto.";
}

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
