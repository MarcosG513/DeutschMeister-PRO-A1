import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chaptersPath = path.join(__dirname, '../src/data/chapters.jsx');

// The 23 missing words grouped by chapter name key
const missingPayload = {
  "adverbien & fragewörter": [
    { de: "morgens", pron: "moa-guens", es: "por las mañanas", type: "Adverbio", category: "Häufigkeit", en: "a bright morning sun", exampleSentenceDe: "Morgens trinke ich immer Tee.", exampleSentenceEs: "Por las mañanas siempre bebo té." },
    { de: "abends", pron: "a-bents", es: "por las tardes/noches", type: "Adverbio", category: "Häufigkeit", en: "a crescent moon with stars", exampleSentenceDe: "Abends lese ich ein Buch.", exampleSentenceEs: "Por las noches leo un libro." }
  ],
  "essen & trinken": [
    { de: "das Ei", pron: "das ai", es: "el huevo", type: "Sustantivo", category: "Lebensmittel", plural: "die Eier", en: "a white egg", exampleSentenceDe: "Ich esse ein gekochtes Ei zum Frühstück.", exampleSentenceEs: "Yo como un huevo cocido de desayuno." },
    { de: "das Salz", pron: "das salts", es: "la sal", type: "Sustantivo", category: "Lebensmittel", plural: "die Salze", en: "a salt shaker", exampleSentenceDe: "Die Suppe braucht mehr Salz.", exampleSentenceEs: "La sopa necesita más sal." },
    { de: "der Pfeffer", pron: "dea pfe-fa", es: "la pimienta", type: "Sustantivo", category: "Lebensmittel", plural: "-", en: "a black pepper shaker", exampleSentenceDe: "Ich brauche Salz und Pfeffer.", exampleSentenceEs: "Necesito sal y pimienta." },
    { de: "der Zucker", pron: "dea tsu-ka", es: "el azúcar", type: "Sustantivo", category: "Lebensmittel", plural: "-", en: "a few white sugar cubes", exampleSentenceDe: "Trinkst du den Kaffee mit Zucker?", exampleSentenceEs: "¿Bebes el café con azúcar?" },
    { de: "die Nudeln", pron: "di nu-deln", es: "la pasta / los fideos", type: "Sustantivo (Plural)", category: "Lebensmittel", plural: "die Nudeln", en: "a bowl of cooked pasta", exampleSentenceDe: "Wir kochen heute Abend Nudeln.", exampleSentenceEs: "Cocinamos pasta esta noche." },
    { de: "die Wurst", pron: "di vurst", es: "el embutido / la salchicha", type: "Sustantivo", category: "Lebensmittel", plural: "die Würste", en: "a traditional german sausage", exampleSentenceDe: "Ich möchte ein Brötchen mit Wurst.", exampleSentenceEs: "Quisiera un panecillo con embutido." }
  ],
  "kleidung": [
    { de: "orange", pron: "o-ran-she", es: "naranja", type: "Adjetivo", category: "Farben", en: "a vibrant splash of orange paint", exampleSentenceDe: "Meine neue Jacke ist orange.", exampleSentenceEs: "Mi nueva chaqueta es naranja." },
    { de: "rosa", pron: "ro-sa", es: "rosa", type: "Adjetivo", category: "Farben", en: "a vibrant splash of pink paint", exampleSentenceDe: "Das Mädchen trägt ein rosa Kleid.", exampleSentenceEs: "La niña lleva un vestido rosa." },
    { de: "lila", pron: "li-la", es: "morado / lila", type: "Adjetivo", category: "Farben", en: "a vibrant splash of purple paint", exampleSentenceDe: "Die Blumen im Garten sind lila.", exampleSentenceEs: "Las flores en el jardín son moradas." }
  ],
  "reisen & verkehr": [
    { de: "der Strand", pron: "dea shtrant", es: "la playa", type: "Sustantivo", category: "Natur", plural: "die Strände", en: "a sandy beach with a colorful sun umbrella", exampleSentenceDe: "Wir machen Urlaub am Strand.", exampleSentenceEs: "Nosotros pasamos las vacaciones en la playa." },
    { de: "der Berg", pron: "dea beark", es: "la montaña", type: "Sustantivo", category: "Natur", plural: "die Berge", en: "a high mountain with a snowy peak", exampleSentenceDe: "Wir wandern oft in den Bergen.", exampleSentenceEs: "Hacemos senderismo a menudo en las montañas." },
    { de: "die Wolke", pron: "di vol-ke", es: "la nube", type: "Sustantivo", category: "Wetter", plural: "die Wolken", en: "a fluffy white cloud", exampleSentenceDe: "Es gibt heute viele Wolken am Himmel.", exampleSentenceEs: "Hoy hay muchas nubes en el cielo." },
    { de: "das Gewitter", pron: "das gue-vi-ta", es: "la tormenta", type: "Sustantivo", category: "Wetter", plural: "die Gewitter", en: "a dark storm cloud with a yellow lightning bolt", exampleSentenceDe: "Heute Abend gibt es ein Gewitter.", exampleSentenceEs: "Esta noche habrá una tormenta." }
  ],
  "schule & beruf": [
    { de: "der Kellner / die Kellnerin", pron: "dea kel-na / di kel-ne-rin", es: "el camarero / la camarera", type: "Sustantivo", category: "Beruf", plural: "die Kellner / die Kellnerinnen", en: "a silver serving tray", exampleSentenceDe: "Der Kellner bringt das Essen.", exampleSentenceEs: "Camarero trae la comida." },
    { de: "der Koch / die Köchin", pron: "dea koj / di ko-jin", es: "el cocinero / la cocinera", type: "Sustantivo", category: "Beruf", plural: "die Köche / die Köchinnen", en: "a white chef hat and a spatula", exampleSentenceDe: "Der Koch kocht sehr gut.", exampleSentenceEs: "El cocinero cocina muy bien." },
    { de: "der Polizist / die Polizistin", pron: "dea po-li-tsist / di po-li-tsis-tin", es: "el policía / la mujer policía", type: "Sustantivo", category: "Beruf", plural: "die Polizisten / die Polizistinnen", en: "a silver police badge", exampleSentenceDe: "Die Polizei hilft den Menschen.", exampleSentenceEs: "La policía ayuda a las personas." },
    { de: "der Ingenieur / die Ingenieurin", pron: "dea in-ye-niur / di in-ye-niu-rin", es: "el ingeniero / la ingeniera", type: "Sustantivo", category: "Beruf", plural: "die Ingenieure / die Ingenieurinnen", en: "a yellow safety helmet over blueprints", exampleSentenceDe: "Sie arbeitet als Ingenieurin bei BMW.", exampleSentenceEs: "Ella trabaja como ingeniera en BMW." },
    { de: "das Heft", pron: "das jeft", es: "el cuaderno", type: "Sustantivo", category: "Büro", plural: "die Hefte", en: "a simple spiral notebook", exampleSentenceDe: "Schreiben Sie das bitte in Ihr Heft.", exampleSentenceEs: "Escriba eso en su cuaderno, por favor." },
    { de: "das Papier", pron: "das pa-pia", es: "el papel", type: "Sustantivo", category: "Büro", plural: "die Papiere", en: "a stack of blank white paper sheets", exampleSentenceDe: "Der Drucker braucht neues Papier.", exampleSentenceEs: "La impresora necesita papel nuevo." },
    { de: "der Radiergummi", pron: "dea ra-dia-gu-mi", es: "el borrador / la goma", type: "Sustantivo", category: "Büro", plural: "die Radiergummis", en: "a classic pink and blue eraser", exampleSentenceDe: "Hast du einen Radiergummi für mich?", exampleSentenceEs: "¿Tienes un borrador para mí?" },
    { de: "der Rucksack", pron: "dea ruk-sak", es: "la mochila", type: "Sustantivo", category: "Büro", plural: "die Rucksäcke", en: "a colorful school backpack", exampleSentenceDe: "Mein Rucksack ist sehr schwer.", exampleSentenceEs: "Mi mochila es muy pesada." }
  ]
};

function cleanTitle(title) {
  return title.replace(/^Kapitel\s+\d+:\s*/i, '').trim().toLowerCase();
}

function formatWords(words) {
  return words.map(w => {
    let parts = [];
    parts.push(`de: "${w.de}"`);
    parts.push(`pron: "${w.pron}"`);
    parts.push(`es: "${w.es}"`);
    parts.push(`type: "${w.type}"`);
    parts.push(`category: "${w.category}"`);
    if (w.regimen) parts.push(`regimen: "${w.regimen}"`);
    if (w.plural) parts.push(`plural: "${w.plural}"`);
    if (w.en) parts.push(`en: "${w.en}"`);
    parts.push(`exampleSentenceDe: "${w.exampleSentenceDe}"`);
    parts.push(`exampleSentenceEs: "${w.exampleSentenceEs}"`);
    return `    ${parts.join(',\n    ')}`;
  }).join('\n  }, {\n    ');
}

function restoreWords() {
  console.log("📖 Reading chapters.jsx...");
  let content = fs.readFileSync(chaptersPath, 'utf8');

  // Find all chapter titles in chapters.jsx
  const titleRegex = /title:\s*["']([^"']+)["']/g;
  const currentTitles = [];
  let match;
  while ((match = titleRegex.exec(content)) !== null) {
    currentTitles.push(match[1]);
  }

  const indexGoethe = content.indexOf('export const goetheModules');
  const filteredTitles = currentTitles.filter(t => content.indexOf(t) < indexGoethe);

  for (const rawTitle of filteredTitles) {
    const cleanKey = cleanTitle(rawTitle);
    const toAppend = missingPayload[cleanKey];
    if (!toAppend || toAppend.length === 0) continue;

    console.log(`⚡ Chapter "${rawTitle}": Found ${toAppend.length} words to restore.`);

    // Find the words array for this chapter
    const titleIdx = content.indexOf(`title: "${rawTitle}"`);
    if (titleIdx === -1) continue;

    const wordsIdx = content.indexOf('words: [', titleIdx);
    if (wordsIdx === -1) continue;

    const arrayStartIndex = wordsIdx + 'words: ['.length;

    // Bracket parser to find the end of the words: [...] array
    let braceCount = 1;
    let i = arrayStartIndex;
    let inString = false;
    let stringChar = null;

    while (i < content.length && braceCount > 0) {
      const char = content[i];
      if (inString) {
        if (char === stringChar && content[i - 1] !== '\\') inString = false;
      } else {
        if (char === '"' || char === "'" || char === '`') {
          inString = true;
          stringChar = char;
        } else if (char === '[') braceCount++;
        else if (char === ']') braceCount--;
      }
      if (braceCount === 0) break;
      i++;
    }

    // Insert formatted words
    const formatted = ',\n  {\n' + formatWords(toAppend) + '\n  }';
    content = content.substring(0, i) + formatted + content.substring(i);
  }

  console.log("💾 Saving chapters.jsx...");
  fs.writeFileSync(chaptersPath, content, 'utf8');
  console.log("🎉 All missing words restored successfully!");
}

try {
  restoreWords();
} catch (error) {
  console.error("❌ Error during restoration:", error.message);
}
