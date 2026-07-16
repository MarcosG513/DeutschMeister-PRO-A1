import parser from '@babel/parser';
import generatorModule from '@babel/generator';
import traverseModule from '@babel/traverse';
import * as t from '@babel/types';
import fs from 'fs';

const traverse = traverseModule.default || traverseModule;
const generator = generatorModule.default || generatorModule;

// Load files
const restoredCode = fs.readFileSync('scratch/chapters_restored_from_git.jsx', 'utf8');
const currentCode = fs.readFileSync('src/data/chapters.jsx', 'utf8');

// Parse restored
console.log('Parsing restored chapters AST...');
const restoredAst = parser.parse(restoredCode, {
  sourceType: 'module',
  plugins: ['jsx']
});

// Parse current
console.log('Parsing current chapters AST...');
const currentAst = parser.parse(currentCode, {
  sourceType: 'module',
  plugins: ['jsx']
});

// Extract words and Kapitel 16 from restored AST
const restoredWordsMap = new Map(); // id -> words ArrayExpression node
let restoredKapitel16Node = null;

// Find words for 0-15
traverse(restoredAst, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'chapters') {
      const init = path.node.init;
      if (init && init.type === 'ArrayExpression') {
        init.elements.forEach(chapter => {
          if (chapter.type === 'ObjectExpression') {
            const idProp = chapter.properties.find(p => p.key && p.key.name === 'id');
            const idVal = idProp && idProp.value.value;
            if (idVal !== undefined && idVal >= 0 && idVal <= 15) {
              const wordsProp = chapter.properties.find(p => p.key && p.key.name === 'words');
              if (wordsProp && wordsProp.value.type === 'ArrayExpression') {
                restoredWordsMap.set(idVal, wordsProp.value);
              }
            }
          }
        });
      }
    }
  },
  
  // Find Kapitel 16 globally in restored AST
  ObjectExpression(path) {
    const idProp = path.node.properties.find(p => p.key && p.key.name === 'id');
    if (idProp && idProp.value.type === 'NumericLiteral' && idProp.value.value === 16) {
      restoredKapitel16Node = path.node;
      console.log('Successfully extracted Kapitel 16 ObjectExpression node.');
    }
  }
});

console.log(`Extracted words from restored AST for chapters: ${Array.from(restoredWordsMap.keys()).join(', ')}`);

// Define Kapitel 17 word list
const kapitel17Words = [
  { de: "der Laptop", pron: "dea láp-top", es: "el portátil", type: "Sustantivo (Masc)", category: "Hardware", plural: "die Laptops", en: "a cute 3D isometric UI icon of a silver laptop computer", exampleSentenceDe: "Ich brauche einen neuen Laptop.", exampleSentenceEs: "Necesito un portátil nuevo." },
  { de: "der Bildschirm", pron: "dea bilt-shirm", es: "la pantalla", type: "Sustantivo (Masc)", category: "Hardware", plural: "die Bildschirme", en: "a cute 3D isometric UI icon of a glowing computer monitor", exampleSentenceDe: "Der Bildschirm ist sehr groß.", exampleSentenceEs: "La pantalla es muy grande." },
  { de: "die Tastatur", pron: "di tas-ta-túr", es: "el teclado", type: "Sustantivo (Fem)", category: "Hardware", plural: "die Tastaturen", en: "a cute 3D isometric UI icon of a mechanical computer keyboard", exampleSentenceDe: "Meine Tastatur ist leider kaputt.", exampleSentenceEs: "Mi teclado lamentablemente está roto." },
  { de: "die Maus", pron: "di maus", es: "el ratón", type: "Sustantivo (Fem)", category: "Hardware", plural: "die Mäuse", en: "a cute 3D isometric UI icon of a computer mouse emitting wireless signal waves", exampleSentenceDe: "Meine neue Maus ist kabellos.", exampleSentenceEs: "Mi ratón nuevo es inalámbrico." },
  { de: "das Passwort", pron: "das pás-vort", es: "la contraseña", type: "Sustantivo (Neut)", category: "Sicherheit", plural: "die Passwörter", en: "a cute 3D isometric UI icon of a golden key over a metallic padlock", exampleSentenceDe: "Mein Passwort ist sehr sicher.", exampleSentenceEs: "Mi contraseña es muy segura." },
  { de: "die Datei", pron: "di da-tái", es: "el archivo", type: "Sustantivo (Fem)", category: "Software", plural: "die Dateien", en: "a cute 3D isometric UI icon of a digital document sheet with a folded corner", exampleSentenceDe: "Ich lösche diese Datei.", exampleSentenceEs: "Borro este archivo." },
  { de: "der Ordner", pron: "dea ór-dner", es: "la carpeta", type: "Sustantivo (Masc)", category: "Software", plural: "die Ordner", en: "a cute 3D isometric UI icon of a yellow folder organizer", exampleSentenceDe: "Der Ordner ist auf dem Desktop.", exampleSentenceEs: "La carpeta está en el escritorio." },
  { de: "der Kopfhörer", pron: "dea kopf-jö-rer", es: "los auriculares", type: "Sustantivo (Masc)", category: "Hardware", plural: "die Kopfhörer", en: "a cute 3D isometric UI icon of modern wireless headphones", exampleSentenceDe: "Ich höre Musik mit dem Kopfhörer.", exampleSentenceEs: "Escucho música con los auriculares." },
  { de: "die App", pron: "di ep", es: "la aplicación", type: "Sustantivo (Fem)", category: "Software", plural: "die Apps", en: "a cute 3D isometric UI icon of a smartphone showing colorful utility widgets", exampleSentenceDe: "Diese App ist sehr nützlich.", exampleSentenceEs: "Esta aplicación es muy útil." },
  { de: "der Drucker", pron: "dea drú-ker", es: "la impresora", type: "Sustantivo (Masc)", category: "Hardware", plural: "die Drucker", en: "a cute 3D isometric UI icon of a modern office printer ejecting a paper page", exampleSentenceDe: "Der Drucker hat kein Papier mehr.", exampleSentenceEs: "La impresora ya no tiene papel." },
  { de: "das Netzwerk", pron: "das néts-verk", es: "la red", type: "Sustantivo (Neut)", category: "Internet", plural: "die Netzwerke", en: "a cute 3D isometric UI icon of interconnected digital nodes glowing blue", exampleSentenceDe: "Das Netzwerk im Büro ist schnell.", exampleSentenceEs: "La red en la oficina es rápida." },
  { de: "der Link", pron: "dea link", es: "el enlace", type: "Sustantivo (Masc)", category: "Internet", plural: "die Links", en: "a cute 3D isometric UI icon of a chain link connection symbol", exampleSentenceDe: "Bitte klicke auf diesen Link.", exampleSentenceEs: "Por favor, haz clic en este enlace." },
  { de: "das Internet", pron: "das ín-ter-net", es: "el internet", type: "Sustantivo (Neut)", category: "Internet", plural: "die Internetanschlüsse", en: "a cute 3D isometric UI icon of a digital globe spinning in a cloud", exampleSentenceDe: "Das Internet ist heute langsam.", exampleSentenceEs: "El internet hoy está lento." },
  { de: "der Computer", pron: "dea kom-piú-ter", es: "el ordenador", type: "Sustantivo (Masc)", category: "Hardware", plural: "die Computer", en: "a cute 3D isometric UI icon of a desktop computer setup with a keyboard and mouse", exampleSentenceDe: "Mein Computer ist sehr alt.", exampleSentenceEs: "Mi ordenador es muy viejo." },
  { de: "das WLAN", pron: "das ve-lan", es: "el wifi", type: "Sustantivo (Neut)", category: "Internet", plural: "die WLAN-Netze", en: "a cute 3D isometric UI icon of a router emitting glowing wireless signal waves", exampleSentenceDe: "Haben Sie das WLAN-Passwort?", exampleSentenceEs: "¿Tiene la contraseña del wifi?" },
  { de: "die Cloud", pron: "di klaud", es: "la nube", type: "Sustantivo (Fem)", category: "Internet", plural: "die Clouds", en: "a cute 3D isometric UI icon of a glowing blue cloud storage icon", exampleSentenceDe: "Ich speichere die Fotos in der Cloud.", exampleSentenceEs: "Guardo las fotos en la nube." },
  { de: "die Webseite", pron: "di vép-zai-te", es: "la página web", type: "Sustantivo (Fem)", category: "Internet", plural: "die Webseiten", en: "a cute 3D isometric UI icon of a web browser interface page showing layouts", exampleSentenceDe: "Diese Webseite gefällt mir gut.", exampleSentenceEs: "Esta página web me gusta mucho." },
  { de: "die E-Mail-Adresse", pron: "di í-meil-a-dré-se", es: "la dirección de correo", type: "Sustantivo (Fem)", category: "Internet", plural: "die E-Mail-Adressen", en: "a cute 3D isometric UI icon of a digital technical mail envelope with an @ symbol", exampleSentenceDe: "Wie ist deine E-Mail-Adresse?", exampleSentenceEs: "¿Cuál es tu dirección de correo electrónico?" },
  { de: "die E-Mail", pron: "di í-meil", es: "el correo electrónico", type: "Sustantivo (Fem)", category: "Internet", plural: "die E-Mails", en: "a cute 3D isometric UI icon of an open envelope containing a glowing message paper", exampleSentenceDe: "Ich schreibe eine wichtige E-Mail.", exampleSentenceEs: "Escribo un correo electrónico importante." },
  { de: "das System", pron: "das zys-tém", es: "el sistema", type: "Sustantivo (Neut)", category: "Software", plural: "die Systeme", en: "a cute 3D isometric UI icon of interlocking technical gears under a circuit board panel", exampleSentenceDe: "Das System läuft sehr stabil.", exampleSentenceEs: "El sistema funciona muy stable." },
  { de: "das Update", pron: "das áp-deit", es: "la actualización", type: "Sustantivo (Neut)", category: "Software", plural: "die Updates", en: "a cute 3D isometric UI icon of a circle arrow download progress symbol", exampleSentenceDe: "Das Update ist fertig.", exampleSentenceEs: "La actualización está lista." },
  { de: "der Code", pron: "der kout", es: "el código", type: "Sustantivo (Masc)", category: "Software", plural: "die Codes", en: "a cute 3D isometric UI icon of code lines on a dark monitor", exampleSentenceDe: "Der Code hat keine Fehler.", exampleSentenceEs: "El código no tiene errores." },
  { de: "der Benutzer", pron: "dea be-nút-tser", es: "el usuario", type: "Sustantivo (Masc)", category: "Software", plural: "die Benutzer", en: "a cute 3D isometric UI icon of a glowing blue user profile silhouette tag", exampleSentenceDe: "Er ist ein neuer Benutzer.", exampleSentenceEs: "Él es un usuario nuevo." },
  { de: "der Screenshot", pron: "dea scrín-shot", es: "la captura de pantalla", type: "Sustantivo (Masc)", category: "Software", plural: "die Screenshots", en: "a cute 3D isometric UI icon of a scissor cutting a digital screen area", exampleSentenceDe: "Ich mache einen Screenshot vom Bild.", exampleSentenceEs: "Hago una captura de pantalla de la imagen." },
  { de: "der Virus", pron: "dea ví-rus", es: "el virus", type: "Sustantivo (Masc)", category: "Sicherheit", plural: "die Viren", en: "a cute 3D isometric UI icon of a red virus bug with sharp legs", exampleSentenceDe: "Mein Laptop hat einen Virus.", exampleSentenceEs: "Mi portátil tiene un virus." },
  { de: "die Taste", pron: "di tás-te", es: "la tecla / botón", type: "Sustantivo (Fem)", category: "Hardware", plural: "die Tasten", en: "a cute 3D isometric UI icon of a single keyboard key button", exampleSentenceDe: "Drücke die Enter-Taste.", exampleSentenceEs: "Pulsa la tecla Enter." },
  { de: "digital", pron: "di-gui-tál", es: "digital", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of binary numbers zero and one glowing blue", exampleSentenceDe: "Wir leben in einer digitalen Welt.", exampleSentenceEs: "Vivimos en un mundo digital." },
  { de: "online", pron: "ón-lain", es: "en línea", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a green glowing active connection indicator light", exampleSentenceDe: "Bist du heute Abend online?", exampleSentenceEs: "¿Estarás en línea esta noche?" },
  { de: "offline", pron: "óf-lain", es: "desconectado", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a red offline disconnected plug symbol", exampleSentenceDe: "Ich bin im Urlaub offline.", exampleSentenceEs: "Estoy desconectado durante las vacaciones." },
  { de: "kabellos", pron: "ká-bel-los", es: "inalámbrico", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of headphones emitting wireless radio waves with no cables", exampleSentenceDe: "Die Kopfhörer sind kabellos.", exampleSentenceEs: "Los auriculares son inalámbricos." },
  { de: "automatisch", pron: "au-to-má-tish", es: "automático", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of moving metallic gears", exampleSentenceDe: "Das System funktioniert automatisch.", exampleSentenceEs: "El sistema funciona automáticamente." },
  { de: "manuell", pron: "ma-nu-él", es: "manual", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of a hand turning a dial", exampleSentenceDe: "Ich mache das lieber manuell.", exampleSentenceEs: "Hago eso mejor manualmente." },
  { de: "sicher", pron: "zí-jer", es: "seguro", type: "Adjetivo", category: "Sicherheit", en: "a cute 3D isometric UI icon of a glowing green cyber security shield", exampleSentenceDe: "Mein neues Passwort ist sehr sicher.", exampleSentenceEs: "Mi nueva contraseña es muy segura." },
  { de: "vernetzt", pron: "fer-nétst", es: "conectado / en red", type: "Adjetivo", category: "Internet", en: "a cute 3D isometric UI icon of two connected digital glowing globes", exampleSentenceDe: "Wir sind alle gut vernetzt.", exampleSentenceEs: "Estamos todos bien conectados." },
  { de: "virtuell", pron: "vir-tu-él", es: "virtual", type: "Adjetivo", category: "Eigenschaften", en: "a cute 3D isometric UI icon of VR virtual reality goggles glowing purple", exampleSentenceDe: "Wir machen ein virtuelles Treffen.", exampleSentenceEs: "Hacemos una reunión virtual." },
  { de: "gesperrt", pron: "gue-shpért", es: "bloqueado", type: "Adjetivo", category: "Sicherheit", en: "a cute 3D isometric UI icon of a red digital lock", exampleSentenceDe: "Mein Handy ist leider gesperrt.", exampleSentenceEs: "Mi móvil está bloqueado lamentablemente." },
  { de: "programmieren", pron: "pro-gram-mí-ren", es: "programar", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of a laptop screen with program code", exampleSentenceDe: "Ich lerne programmieren.", exampleSentenceEs: "Aprendo a programar." },
  { de: "herunterladen", pron: "je-rún-ter-la-den", es: "descargar", type: "Verbo", category: "Aktionen", regimen: "Separable (herunter-) / + Akkusativ", en: "a cute 3D isometric UI icon of a down arrow pointing to a hard drive disk", exampleSentenceDe: "Ich lade das Lied herunter.", exampleSentenceEs: "Descargo la canción." },
  { de: "hochladen", pron: "jój-la-den", es: "subir (archivo)", type: "Verbo", category: "Aktionen", regimen: "Separable (hoch-) / + Akkusativ", en: "a cute 3D isometric UI icon of an up arrow pointing to a digital cloud", exampleSentenceDe: "Er lädt das Video hoch.", exampleSentenceEs: "Él sube el video." },
  { de: "speichern", pron: "shpái-jern", es: "guardar", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of a classic 3.5 inch blue floppy disk storage", exampleSentenceDe: "Bitte speichern Sie die Datei.", exampleSentenceEs: "Por favor, guarde el archivo." },
  { de: "löschen", pron: "lö-shen", es: "borrar / eliminar", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of a red trash can bin overflowing with paper crumbs", exampleSentenceDe: "Ich möchte den Text löschen.", exampleSentenceEs: "Quiero borrar el texto." },
  { de: "klicken", pron: "klí-ken", es: "hacer clic", type: "Verbo", category: "Aktionen", regimen: "intransitivo", en: "a cute 3D isometric UI icon of a glowing blue cursor clicking a button", exampleSentenceDe: "Klicke auf den Button.", exampleSentenceEs: "Haz clic en el botón." },
  { de: "tippen", pron: "tí-pen", es: "escribir (teclado)", type: "Verbo", category: "Aktionen", regimen: "intransitivo", en: "a cute 3D isometric UI icon of hands typing on a glowing laptop keyboard", exampleSentenceDe: "Ich tippe sehr schnell.", exampleSentenceEs: "Escribo a máquina muy rápido." },
  { de: "senden", pron: "zén-den", es: "enviar", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of a paper plane flying out of a digital envelope", exampleSentenceDe: "Ich sende das Dokument heute.", exampleSentenceEs: "Envío el documento hoy." },
  { de: "empfangen", pron: "emp-fáng-en", es: "recibir", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of a digital tray box receiving incoming letter envelopes", exampleSentenceDe: "Ich empfange ein Paket.", exampleSentenceEs: "Recibo un paquete." },
  { de: "teilen", pron: "tái-len", es: "compartir", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of three connected dots sharing network lines", exampleSentenceDe: "Wir teilen die Datei.", exampleSentenceEs: "Compartimos el archivo." },
  { de: "kopieren", pron: "ko-pí-ren", es: "copiar", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of two identical overlapping document sheets", exampleSentenceDe: "Kannst du den Text kopieren?", exampleSentenceEs: "¿Puedes copiar el texto?" },
  { de: "einfügen", pron: "áin-fü-guen", es: "pegar", type: "Verbo", category: "Aktionen", regimen: "Separable (ein-) / + Akkusativ", en: "a cute 3D isometric UI icon of a clipboard pasting text onto a page document", exampleSentenceDe: "Füge das Bild hier ein.", exampleSentenceEs: "Pega la imagen aquí." },
  { de: "aktualisieren", pron: "ak-tua-li-zí-ren", es: "actualizar", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of two circular green arrows turning", exampleSentenceDe: "Ich muss die Seite aktualisieren.", exampleSentenceEs: "Tengo que actualizar la página." },
  { de: "drucken", pron: "drú-ken", es: "imprimir", type: "Verbo", category: "Aktionen", regimen: "+ Akkusativ", en: "a cute 3D isometric UI icon of a paper sheet rolling out of a metal print head roller", exampleSentenceDe: "Ich drucke den Brief.", exampleSentenceEs: "Imprimo la carta." }
];

// Helper to convert JS object to AST nodes
function objToAst(obj) {
  const props = Object.entries(obj).map(([key, val]) => {
    return t.objectProperty(t.identifier(key), t.stringLiteral(val));
  });
  return t.objectExpression(props);
}

// Reconstruct Kapitel 17 ObjectExpression
const k17WordsAst = t.arrayExpression(kapitel17Words.map(w => objToAst(w)));
const kapitel17Node = t.objectExpression([
  t.objectProperty(t.identifier('id'), t.numericLiteral(17)),
  t.objectProperty(t.identifier('title'), t.stringLiteral('Kapitel 17: Digitale Welt & IT')),
  t.objectProperty(t.identifier('icon'), t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier('Laptop'), [
      t.jsxAttribute(t.jsxIdentifier('size'), t.jsxExpressionContainer(t.numericLiteral(20)))
    ], true),
    null,
    [],
    true
  )),
  t.objectProperty(t.identifier('emoji'), t.stringLiteral('💻')),
  t.objectProperty(t.identifier('words'), k17WordsAst)
]);

// Traverse current AST and perform replacements/insertions
console.log('Modifying current AST...');
let modifiedCount = 0;
let kapitel16Added = false;

traverse(currentAst, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'chapters') {
      const init = path.node.init;
      if (init && init.type === 'ArrayExpression') {
        // Replace words for chapters 0 to 15
        init.elements.forEach(chapter => {
          if (chapter.type === 'ObjectExpression') {
            const idProp = chapter.properties.find(p => p.key && p.key.name === 'id');
            const idVal = idProp && idProp.value.value;
            
            if (idVal !== undefined && idVal >= 0 && idVal <= 15) {
              const restoredWordsNode = restoredWordsMap.get(idVal);
              if (restoredWordsNode) {
                const wordsPropIdx = chapter.properties.findIndex(p => p.key && p.key.name === 'words');
                if (wordsPropIdx !== -1) {
                  chapter.properties[wordsPropIdx].value = restoredWordsNode;
                  modifiedCount++;
                }
              }
            }
          }
        });
        
        // Remove existing Kapitel 16 if present
        const k16Idx = init.elements.findIndex(chapter => {
          if (chapter.type === 'ObjectExpression') {
            const idProp = chapter.properties.find(p => p.key && p.key.name === 'id');
            return idProp && idProp.value.value === 16;
          }
          return false;
        });
        if (k16Idx !== -1) {
          init.elements.splice(k16Idx, 1);
        }
        
        // Append restored Kapitel 16
        if (restoredKapitel16Node) {
          init.elements.push(restoredKapitel16Node);
          console.log('Successfully inserted Kapitel 16 node.');
          kapitel16Added = true;
        } else {
          console.error('CRITICAL: restoredKapitel16Node is null!');
        }
        
        // Remove existing Kapitel 17 if present
        const k17Idx = init.elements.findIndex(chapter => {
          if (chapter.type === 'ObjectExpression') {
            const idProp = chapter.properties.find(p => p.key && p.key.name === 'id');
            return idProp && idProp.value.value === 17;
          }
          return false;
        });
        if (k17Idx !== -1) {
          init.elements.splice(k17Idx, 1);
        }
        
        // Append Kapitel 17
        init.elements.push(kapitel17Node);
        console.log('Appended Kapitel 17 to chapters array.');
      }
    }
  },
  
  // Ensure Laptop and Zap are imported from 'lucide-react'
  ImportDeclaration(path) {
    if (path.node.source.value === 'lucide-react') {
      const specifiers = path.node.specifiers;
      const hasLaptop = specifiers.some(s => s.imported && s.imported.name === 'Laptop');
      const hasZap = specifiers.some(s => s.imported && s.imported.name === 'Zap');
      if (!hasLaptop) {
        specifiers.push(t.importSpecifier(t.identifier('Laptop'), t.identifier('Laptop')));
        console.log('Added Laptop specifier to lucide-react import.');
      }
      if (!hasZap) {
        specifiers.push(t.importSpecifier(t.identifier('Zap'), t.identifier('Zap')));
        console.log('Added Zap specifier to lucide-react import.');
      }
    }
  }
});

console.log(`Replaced words arrays for ${modifiedCount} chapters.`);

// Generate code back
console.log('Generating output code...');
const output = generator(currentAst, {
  jsescOption: { minimal: true }
});

fs.writeFileSync('src/data/chapters.jsx', output.code, 'utf8');
console.log('Successfully wrote to src/data/chapters.jsx!');
