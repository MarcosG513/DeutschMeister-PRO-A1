import fs from 'fs';

const appCode = fs.readFileSync('src/App.jsx', 'utf8');
const startIndex = appCode.indexOf('const chapters = [');
if (startIndex === -1) {
    console.error('No se pudo encontrar el array chapters.');
    process.exit(1);
}

const functionAppIndex = appCode.indexOf('export default function App()');
const chaptersCodeString = appCode.substring(startIndex, functionAppIndex);

// Utilizamos una técnica para evaluar el objeto chapters:
// Extraemos solo el array (reemplazamos 'const chapters = ' y el último ';' antes de function App)
let arrayCode = chaptersCodeString.replace('const chapters = ', '').trim();
if (arrayCode.endsWith(';')) {
    arrayCode = arrayCode.substring(0, arrayCode.length - 1);
}

// Algunos componentes JSX están en chaptersCodeString (ej. icon: <List size={20} />)
// Vamos a eliminar esas claves para poder evaluar con JSON de manera segura o usar un truco con Function
// En lugar de evaluar todo, usaremos expresiones regulares para extraer sólo las palabras.
const wordRegex = /{ de: "([^"]+)", pron: "[^"]*", es: "[^"]*", type: "[^"]*", category: "[^"]*" }/g;

let match;
const vocabulario = [];
let idSet = new Set();

// Emular la función getSafeId que está en App.jsx para los IDs de imágenes
const getSafeId = (str) => Buffer.from(encodeURIComponent(str)).toString('base64').replace(/[/+=]/g, '_');

while ((match = wordRegex.exec(chaptersCodeString)) !== null) {
    const wordDe = match[1];
    const safeId = getSafeId(wordDe).substring(0, 150);
    if (!idSet.has(safeId)) {
        idSet.add(safeId);
        vocabulario.push({ id: safeId, word: wordDe });
    }
}

fs.writeFileSync('vocabulario_completo.json', JSON.stringify(vocabulario, null, 2));
console.log(`¡Archivo vocabulario_completo.json generado exitosamente con ${vocabulario.length} palabras!`);
