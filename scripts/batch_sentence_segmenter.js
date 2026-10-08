/**
 * scripts/batch_sentence_segmenter.js
 * 
 * DeutschMeister PRO A1 - Fase 2: Pre-segmentación sintáctica de oraciones
 * Genera bloques sintácticos funcionales (exampleSentenceDeBlocks) para el minijuego
 * DraggableSentenceBuilder respetando la sintaxis alemana A1 (V2, verbos separables,
 * modales y Satzklammer).
 */

import fs from 'fs';
import path from 'path';
import * as babel from '@babel/parser';

// --- DICCIONARIO DE ORACIONES PEDAGÓGICAS A1 PARA LOS 100 TÉRMINOS UNDEFINED ---
const cleanSentences100 = {
  // Kapitel 3: Personen & Kontakte
  "mitbringen": { de: "Ich bringe einen Kuchen mit.", es: "Traigo un pastel." },
  "kennenlernen": { de: "Ich lerne meine Nachbarn kennen.", es: "Conozco a mis vecinos." },
  "einladen": { de: "Wir laden viele Freunde ein.", es: "Invitamos a muchos amigos." },
  "feiern": { de: "Wir feiern heute eine Party.", es: "Celebramos una fiesta hoy." },
  "schenken": { de: "Ich schenke meiner Mutter Blumen.", es: "Le regalo flores a mi madre." },
  "gratulieren": { de: "Ich gratuliere dir zum Geburtstag.", es: "Te felicito por tu cumpleaños." },
  "danken": { de: "Ich danke dir für alles.", es: "Te agradezco por todo." },
  "die Feuerwehr": { de: "Die Feuerwehr kommt sehr schnell.", es: "Los bomberos vienen muy rápido." },

  // Kapitel 4: Basisverben & Adjektive
  "aufstehen": { de: "Ich stehe um sieben auf.", es: "Me levanto a las siete." },
  "aufwachen": { de: "Ich wache morgens früh auf.", es: "Me despierto temprano por la mañana." },
  "einschlafen": { de: "Das Kind schläft schnell ein.", es: "El niño se duerme rápido." },
  "waschen": { de: "Ich wasche mein Auto gern.", es: "Lavo mi coche con gusto." },
  "duschen": { de: "Er duscht jeden Morgen warm.", es: "Él se ducha con agua caliente cada mañana." },
  "abtrocknen": { de: "Ich trockne das Geschirr ab.", es: "Seco la vajilla." },
  "gehören": { de: "Das Buch gehört meinem Bruder.", es: "El libro pertenece a mi hermano." },
  "glauben": { de: "Ich glaube deinen Worten nicht.", es: "No creo en tus palabras." },
  "zuhören": { de: "Die Kinder hören aufmerksam zu.", es: "Los niños escuchan con atención." },
  "verlieren": { de: "Er verliert oft seinen Schlüssel.", es: "Él pierde a menudo su llave." },
  "stehlen": { de: "Der Dieb stiehlt ein Fahrrad.", es: "El ladrón roba una bicicleta." },
  "suchen": { de: "Ich suche meine Brille überall.", es: "Busco mis gafas por todas partes." },
  "der Regenschirm": { de: "Ich nehme einen Regenschirm mit.", es: "Llevo un paraguas conmigo." },
  "die Brille": { de: "Meine neue Brille ist modern.", es: "Mis gafas nuevas son modernas." },
  "die Tasche": { de: "Die Tasche steht auf dem Boden.", es: "El bolso está en el suelo." },
  "die Uhr": { de: "Die Uhr zeigt zwei Uhr.", es: "El reloj marca las dos." },
  "fliegen": { de: "Wir fliegen morgen nach Berlin.", es: "Volamos mañana a Berlín." },
  "rennen": { de: "Die Kinder rennen sehr schnell.", es: "Los niños corren muy rápido." },
  "springen": { de: "Die Kinder springen vor Freude.", es: "Los niños saltan de alegría." },
  "singen": { de: "Sie singt ein schönes Lied.", es: "Ella canta una bonita canción." },
  "weinen": { de: "Das kleine Kind weint laut.", es: "El niño pequeño llora fuerte." },
  "lachen": { de: "Wir lachen oft zusammen laut.", es: "Reímos a menudo juntos en voz alta." },
  "ziehen": { de: "Er zieht fest an der Tür.", es: "Él tira fuerte de la puerta." },
  "drücken": { de: "Bitte drücken Sie die Taste.", es: "Por favor presione la tecla." },
  "werfen": { de: "Er wirft den Ball weit.", es: "Él lanza la pelota lejos." },
  "fangen": { de: "Der Hund fängt den Ball.", es: "El perro atrapa la pelota." },
  "steigen": { de: "Wir steigen in den Bus ein.", es: "Subimos al autobús." },
  "fallen": { de: "Die Blätter fallen im Herbst.", es: "Las hojas caen en otoño." },

  // Kapitel 7: Wohnen
  "aufräumen": { de: "Ich räume die Wohnung auf.", es: "Ordeno el apartamento." },
  "der Müll": { de: "Ich bringe den Müll weg.", es: "Llevo la basura fuera." },
  "der Eimer": { de: "Der Eimer steht im Garten.", es: "El cubo está en el jardín." },
  "der Staubsauger": { de: "Der Staubsauger ist neu und leise.", es: "La aspiradora es nueva y silenciosa." },
  "die Waschmaschine": { de: "Die Waschmaschine wäscht sehr gut.", es: "La lavadora lava muy bien." },
  "die Spülmaschine": { de: "Die Spülmaschine ist jetzt voll.", es: "El lavavajillas está lleno ahora." },
  "das Waschbecken": { de: "Das Waschbecken ist ganz sauber.", es: "El lavamanos está completamente limpio." },
  "der Fernseher": { de: "Der Fernseher steht im Wohnzimmer.", es: "El televisor está en el salón." },
  "der Kühlschrank": { de: "Milch steht im Kühlschrank drin.", es: "La leche está dentro del refrigerador." },
  "das Sofa": { de: "Das Sofa ist sehr bequem.", es: "El sofá es muy cómodo." },
  "der Sessel": { de: "Der Sessel ist alt aber gemütlich.", es: "El sillón es viejo pero acogedor." },
  "die Lampe": { de: "Die Lampe gibt warmes Licht.", es: "La lámpara da luz cálida." },
  "das Radio": { de: "Ich höre gern laut Radio.", es: "Me gusta escuchar la radio alto." },
  "der Herd": { de: "Die Suppe kocht auf dem Herd.", es: "La sopa hierve en la estufa." },
  "der Ofen": { de: "Die Pizza backt im Ofen.", es: "La pizza se hornea en el horno." },
  "die Mikrowelle": { de: "Die Mikrowelle wärmt das Essen.", es: "El microondas calienta la comida." },
  "die Kaffeemaschine": { de: "Die Kaffeemaschine macht frischen Kaffee.", es: "La cafetera hace café fresco." },
  "der Topf": { de: "Der Topf ist noch heiß.", es: "La olla todavía está caliente." },
  "die Pfanne": { de: "Das Fleisch brät in der Pfanne.", es: "La carne se fríe en la sartén." },
  "die Tür": { de: "Er schließt die Tür leise.", es: "Él cierra la puerta en silencio." },
  "das Fenster": { de: "Ich öffne das Fenster kurz.", es: "Abro la ventana brevemente." },
  "die Wand": { de: "Ein Bild hängt an der Wand.", es: "Un cuadro cuelga de la pared." },
  "das Dach": { de: "Die Katze schläft auf dem Dach.", es: "El gato duerme en el tejado." },
  "das Kissen": { de: "Das Kissen ist sehr weich.", es: "La almohada es muy suave." },
  "die Decke": { de: "Die Decke hält mich warm.", es: "La manta me mantiene caliente." },

  // Kapitel 8: Essen & Trinken
  "backen": { de: "Wir backen heute frisches Brot.", es: "Horneamos hoy pan fresco." },
  "braten": { de: "Er brät leckere Kartoffeln an.", es: "Él fríe patatas deliciosas." },
  "grillen": { de: "Wir grillen Fleisch im Garten.", es: "Asamos carne en el jardín." },
  "schneiden": { de: "Ich schneide den Apfel klein.", es: "Corto la manzana en trozos pequeños." },
  "das Besteck": { de: "Das Besteck liegt auf dem Tisch.", es: "Los cubiertos están sobre la mesa." },
  "die Schüssel": { de: "Der Salat ist in der Schüssel.", es: "La ensalada está en el bol." },
  "das Glas": { de: "Das Glas ist mit Wasser voll.", es: "El vaso está lleno de agua." },
  "der Becher": { de: "Er nimmt einen Becher Kaffee.", es: "Él toma un vaso de café." },
  "die Serviette": { de: "Die Serviette liegt neben dem Teller.", es: "La servilleta está al lado del plato." },

  // Kapitel 10: Einkaufen
  "einkaufen": { de: "Ich kaufe im Supermarkt ein.", es: "Compro en el supermercado." },
  "verkaufen": { de: "Er verkauft sein altes Auto.", es: "Él vende su coche viejo." },

  // Kapitel 11: Freizeit
  "der Hund": { de: "Der Hund läuft durch den Garten.", es: "El perro corre por el jardín." },
  "die Katze": { de: "Die Katze schläft auf dem Stuhl.", es: "El gato duerme en la silla." },
  "der Vogel": { de: "Der Vogel singt am Morgen.", es: "El pájaro canta por la mañana." },
  "das Pferd": { de: "Das Pferd frisst frisches Gras.", es: "El caballo come hierba fresca." },
  "die Maus": { de: "Die kleine Maus sucht Käse.", es: "El ratoncito busca queso." },
  "die Kuh": { de: "Die Kuh steht auf der Wiese.", es: "La vaca está en el prado." },

  // Kapitel 12: Reisen & Verkehr
  "die Sonne": { de: "Die Sonne scheint heute hell.", es: "El sol brilla hoy con fuerza." },
  "der Mond": { de: "Der Mond leuchtet am Nachthimmel.", es: "La luna brilla en el cielo nocturno." },
  "der Stern": { de: "Ein Stern leuchtet sehr hell.", es: "Una estrella brilla muy claro." },
  "der Regen": { de: "Der Regen fällt vom Himmel.", es: "La lluvia cae del cielo." },
  "der Schnee": { de: "Der Schnee liegt auf den Bergen.", es: "La nieve cubre las montañas." },
  "der Wind": { de: "Der Wind weht heute stark.", es: "El viento sopla fuerte hoy." },
  "der Baum": { de: "Der Baum hat viele grüne Blätter.", es: "El árbol tiene muchas hojas verdes." },
  "die Blume": { de: "Die Blume riecht sehr gut.", es: "La flor huele muy bien." },
  "der Wald": { de: "Wir wandern gern im Wald.", es: "Nos gusta hacer senderismo en el bosque." },
  "das Meer": { de: "Das Meer ist heute ruhig.", es: "El mar está tranquilo hoy." },

  // Kapitel 15: Gesundheit
  "die Seife": { de: "Ich wasche mich mit Seife.", es: "Me lavo con jabón." },
  "das Shampoo": { de: "Das Shampoo riecht nach Kokosnuss.", es: "El champú huele a coco." },
  "die Zahnbürste": { de: "Meine Zahnbürste ist ganz neu.", es: "Mi cepillo de dientes es totalmente nuevo." },
  "die Zahnpasta": { de: "Die Zahnpasta schmeckt nach Minze.", es: "La pasta de dientes sabe a menta." },
  "der Kamm": { de: "Der Kamm liegt im Badezimmer.", es: "El peine está en el baño." },
  "der Föhn": { de: "Der Föhn trocknet meine Haare.", es: "El secador seca mi pelo." },
  "der Rasierer": { de: "Der Rasierer funktioniert sehr gut.", es: "La afeitadora funciona muy bien." },
  "die Tablette": { de: "Er nimmt eine Tablette ein.", es: "Él se toma una pastilla." },
  "die Krankheit": { de: "Die Krankheit ist nicht gefährlich.", es: "La enfermedad no es peligrosa." },
  "die Gesundheit": { de: "Gute Gesundheit ist sehr wichtig.", es: "Una buena salud es muy importante." },
  "der Notfall": { de: "Bei einem Notfall rufen wir an.", es: "En caso de emergencia llamamos." },
  "der Krankenwagen": { de: "Der Krankenwagen fährt schnell vorbei.", es: "La ambulancia pasa rápido." }
};

// --- GRAMMAR SETS ---
const ARTICLES = new Set(['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines', 'kein', 'keine', 'keinen', 'keinem', 'keiner']);
const PRONOUNS = new Set(['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'man', 'mich', 'dich', 'ihn', 'uns', 'euch', 'mir', 'dir', 'ihm', 'ihnen']);
const PREPOSITIONS = new Set(['in', 'an', 'auf', 'aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'durch', 'für', 'gegen', 'ohne', 'um', 'unter', 'über', 'vor', 'hinter', 'neben', 'zwischen', 'am', 'im', 'ins', 'ans', 'vom', 'zum', 'zur', 'beim']);
const QUESTION_WORDS = new Set(['wer', 'was', 'wo', 'wohin', 'woher', 'wann', 'wie', 'warum', 'welche', 'welcher', 'welches', 'wieviel', 'wie viel']);

const MODAL_STEMS = new Set(['kann', 'kannst', 'können', 'könnt', 'muss', 'musst', 'müssen', 'müsst', 'will', 'willst', 'wollen', 'wollt', 'soll', 'sollst', 'sollen', 'sollt', 'darf', 'darfst', 'dürfen', 'dürft', 'möchte', 'möchtest', 'möchten', 'möchtet', 'mag', 'magst', 'mögen']);
const AUX_STEMS = new Set(['hat', 'hast', 'haben', 'habt', 'hatte', 'hatten', 'ist', 'bist', 'sind', 'seid', 'war', 'waren', 'wird', 'werden', 'wirst', 'is']);
const SEPARABLE_PREFIXES = new Set(['ab', 'an', 'auf', 'aus', 'ein', 'mit', 'nach', 'vor', 'zu', 'zurück', 'weg', 'fern', 'weiter', 'fest', 'los', 'her', 'hin', 'vorbei', 'zusammen', 'kennen', 'teil']);

const COMMON_VERBS = new Set([
  'bin', 'bist', 'ist', 'sind', 'seid', 'war', 'waren', 'is',
  'habe', 'hast', 'hat', 'haben', 'habt', 'hatte',
  'weiß', 'weißt', 'wissen', 'wisst',
  'wohne', 'wohnst', 'wohnt', 'wohnen',
  'komme', 'kommst', 'kommt', 'kommen',
  'gehe', 'gehst', 'geht', 'gehen',
  'mache', 'machst', 'macht', 'machen',
  'trinke', 'trinkst', 'trinkt', 'trinken',
  'esse', 'isst', 'esst', 'essen',
  'fahre', 'fährst', 'fährt', 'fahren',
  'arbeite', 'arbeitest', 'arbeitet', 'arbeiten',
  'spreche', 'sprichst', 'spricht', 'sprechen',
  'lerne', 'lernst', 'lernt', 'lernen',
  'lese', 'liest', 'lest', 'lesen',
  'schreibe', 'schreibst', 'schreibt', 'schreiben',
  'kaufe', 'kaufst', 'kauft', 'kaufen',
  'spiele', 'spielst', 'spielt', 'spielen',
  'sehe', 'siehst', 'sieht', 'sehen',
  'höre', 'hörst', 'hört', 'hören',
  'brauche', 'brauchst', 'braucht', 'brauchen',
  'finde', 'findest', 'findet', 'finden',
  'gebe', 'gibst', 'gibt', 'geben',
  'nehme', 'nimmst', 'nimmt', 'nehmen',
  'schlafe', 'schläfst', 'schläft', 'schlafen',
  'heiße', 'heißt', 'heißen',
  'kostet', 'kosten',
  'steht', 'stehen', 'stehe', 'stehst',
  'liegt', 'liegen', 'liege', 'liegst',
  'sitzt', 'sitzen', 'sitze',
  'funktioniert', 'funktionieren',
  'vergiss', 'vergessen',
  'hilf', 'hilft', 'helfen'
]);

function isLikelyVerb(token, index) {
  const clean = token.replace(/[,;:!]/g, '');
  const lower = clean.toLowerCase();
  if (COMMON_VERBS.has(lower) || MODAL_STEMS.has(lower) || AUX_STEMS.has(lower)) {
    return true;
  }
  // En alemán, los sustantivos son mayúsculas: si index > 0 y empieza con mayúscula, es sustantivo
  if (index > 0 && clean[0] === clean[0].toUpperCase() && clean[0].match(/[A-ZÄÖÜ]/)) {
    return false;
  }
  if (ARTICLES.has(lower) || PRONOUNS.has(lower) || PREPOSITIONS.has(lower) || QUESTION_WORDS.has(lower)) {
    return false;
  }
  if (lower.endsWith('e') || lower.endsWith('st') || lower.endsWith('t') || lower.endsWith('en')) {
    if (lower.length >= 3) return true;
  }
  return false;
}

/**
 * Motor sintáctico de segmentación alemana A1
 */
export function segmentGermanSentence(rawSentence, wordObj = {}) {
  let sentence = (rawSentence || '').trim();
  if (sentence.includes('. ') && !sentence.includes('Uhr.')) {
    const parts = sentence.split('. ');
    if (parts[0].length >= 8) sentence = parts[0];
  }
  sentence = sentence.replace(/^[„"']+|["'“]+$/g, '').trim();
  sentence = sentence.replace(/[.?!]+$/, '').trim();

  const tokens = sentence.split(/\s+/).filter(Boolean);
  if (tokens.length <= 1) {
    return [{ text: sentence, role: 'subject', order: 1 }];
  }
  if (tokens.length === 2) {
    return [
      { text: tokens[0], role: 'subject', order: 1 },
      { text: tokens[1], role: 'verb_p1', order: 2 }
    ];
  }

  // 1. Detección de Pinza Verbal (Separables & Modales / Perfekt)
  let p2Token = null;
  let remainingTokens = [...tokens];
  const lastTokenRaw = tokens[tokens.length - 1];
  const lastTokenClean = lastTokenRaw.replace(/[,;:]/g, '').toLowerCase();
  const isLastCapitalized = (lastTokenRaw[0] === lastTokenRaw[0].toUpperCase() && lastTokenRaw[0].match(/[A-ZÄÖÜ]/));

  const isSeparableWord = (wordObj.de && wordObj.de.includes('|')) ||
    (wordObj.type && wordObj.type.toLowerCase().includes('separable')) ||
    (wordObj.reg && wordObj.reg.toLowerCase().includes('separable'));

  // Separables: el prefijo al final de la oración
  if (!isLastCapitalized && (SEPARABLE_PREFIXES.has(lastTokenClean) || (isSeparableWord && lastTokenClean.length <= 6))) {
    p2Token = lastTokenRaw;
    remainingTokens = tokens.slice(0, tokens.length - 1);
  } else if (!isLastCapitalized && tokens.length >= 4) {
    // Modales y Auxiliares: infinitivo o participio final
    let hasModal = false;
    let hasAux = false;
    for (let i = 0; i < tokens.length - 1; i++) {
      const w = tokens[i].replace(/[,;:]/g, '').toLowerCase();
      if (MODAL_STEMS.has(w)) hasModal = true;
      if (AUX_STEMS.has(w)) hasAux = true;
    }
    if (hasModal && (lastTokenClean.endsWith('en') || lastTokenClean.endsWith('eln') || lastTokenClean.endsWith('ern'))) {
      p2Token = lastTokenRaw;
      remainingTokens = tokens.slice(0, tokens.length - 1);
    } else if (hasAux && (lastTokenClean.startsWith('ge') || lastTokenClean.endsWith('iert') || ['gemacht', 'gekauft', 'gearbeitet', 'gelernt', 'gegessen', 'getrunken', 'gesprochen', 'gewohnt'].includes(lastTokenClean))) {
      p2Token = lastTokenRaw;
      remainingTokens = tokens.slice(0, tokens.length - 1);
    }
  }

  // 2. Localizar Verbo Conjugado (verb_p1)
  let verbIndex = -1;
  const secondClean = remainingTokens.length > 1 ? remainingTokens[1].replace(/[,;:]/g, '').toLowerCase() : '';
  if (isLikelyVerb(remainingTokens[0], 0) && (PRONOUNS.has(secondClean) || ARTICLES.has(secondClean))) {
    // V1 (Ja/Nein Frage o Imperativo: "Kommst du...")
    verbIndex = 0;
  } else {
    for (let i = 1; i < remainingTokens.length; i++) {
      if (isLikelyVerb(remainingTokens[i], i)) {
        verbIndex = i;
        break;
      }
    }
  }

  if (verbIndex === -1) {
    verbIndex = 1;
  }

  const blocks = [];

  if (verbIndex === 0) {
    // Estructura V1: [verb_p1] [subject] [complement] [verb_p2]?
    blocks.push({ text: remainingTokens[0], role: 'verb_p1', order: 1 });
    let subjEnd = 2;
    if (remainingTokens.length > 2 && (ARTICLES.has(remainingTokens[1].toLowerCase()) || remainingTokens[1].toLowerCase() === 'mein' || remainingTokens[1].toLowerCase() === 'meine')) {
      subjEnd = 3;
    }
    const subjTokens = remainingTokens.slice(1, Math.min(subjEnd, remainingTokens.length));
    blocks.push({ text: subjTokens.join(' '), role: 'subject', order: 2 });
    const compTokens = remainingTokens.slice(subjEnd);
    if (compTokens.length > 0) {
      blocks.push({ text: compTokens.join(' '), role: 'complement', order: 3 });
    }
    if (p2Token) {
      blocks.push({ text: p2Token, role: 'verb_p2', order: blocks.length + 1 });
    }
  } else {
    // Estructura V2 Estándar: [subject/topic] [verb_p1] [complement] [verb_p2]?
    const vorfeld = remainingTokens.slice(0, verbIndex).join(' ');
    const verbP1 = remainingTokens[verbIndex];
    const complement = remainingTokens.slice(verbIndex + 1).join(' ');

    blocks.push({ text: vorfeld, role: 'subject', order: 1 });
    blocks.push({ text: verbP1, role: 'verb_p1', order: 2 });
    if (complement.length > 0) {
      blocks.push({ text: complement, role: 'complement', order: 3 });
    }
    if (p2Token) {
      blocks.push({ text: p2Token, role: 'verb_p2', order: blocks.length + 1 });
    }
  }

  return blocks;
}

// --- EJECUCIÓN PRINCIPAL ---
async function runBatchSegmentation() {
  console.log('🚀 Iniciando FASE 2: Pre-segmentación sintáctica de oraciones para DeutschMeister PRO A1...');

  const chaptersPath = path.resolve('src/data/chapters.jsx');
  const chaptersBakPath = path.resolve('src/data/chapters.jsx.bak');
  const vocabJsonPath = path.resolve('vocabulario_completo.json');

  // 1. Respaldo Seguro
  console.log('📦 Creando respaldo de seguridad...');
  fs.copyFileSync(chaptersPath, chaptersBakPath);
  console.log(`✅ Respaldo creado exitosamente en: ${chaptersBakPath}`);

  // 2. Lectura y Análisis de AST en src/data/chapters.jsx
  const chaptersSource = fs.readFileSync(chaptersPath, 'utf8');
  const ast = babel.parse(chaptersSource, { sourceType: 'module', plugins: ['jsx'] });

  const wordBlocksMap = new Map(); // de -> blocks
  const replacements = [];
  let analyzedCount = 0;
  let successCount = 0;

  const sampleRegular = [];
  const sampleSeparable = [];
  const sampleCompound = [];

  const traverse = (node) => {
    if (!node) return;
    if (node.type === 'VariableDeclarator' && node.id && node.id.name === 'rawChapters') {
      node.init.elements.forEach(ch => {
        ch.properties.forEach(prop => {
          if (prop.key && prop.key.name === 'words' && prop.value && prop.value.type === 'ArrayExpression') {
            prop.value.elements.forEach(wordObj => {
              const deProp = wordObj.properties.find(p => p.key && p.key.name === 'de');
              const sentDeProp = wordObj.properties.find(p => p.key && p.key.name === 'exampleSentenceDe');
              const sentEsProp = wordObj.properties.find(p => p.key && p.key.name === 'exampleSentenceEs');
              const blocksProp = wordObj.properties.find(p => p.key && p.key.name === 'exampleSentenceDeBlocks');

              if (!sentDeProp) return; // Palabras sin exampleSentenceDe (ej. Kap 18)

              analyzedCount++;
              const deVal = deProp?.value?.value || '';
              let rawSentDe = sentDeProp.value.value;
              let rawSentEs = sentEsProp?.value?.value;

              // Si es una de las 100 oraciones undefined, inyectar oración pedagógica A1
              if (rawSentDe === 'undefined' || rawSentDe === undefined) {
                if (cleanSentences100[deVal]) {
                  rawSentDe = cleanSentences100[deVal].de;
                  rawSentEs = cleanSentences100[deVal].es;
                }
              }

              const wordData = {
                de: deVal,
                type: wordObj.properties.find(p => p.key && p.key.name === 'type')?.value?.value,
                reg: wordObj.properties.find(p => p.key && p.key.name === 'regimen')?.value?.value
              };

              const blocks = segmentGermanSentence(rawSentDe, wordData);
              if (blocks && blocks.length > 0) {
                successCount++;
                wordBlocksMap.set(deVal, {
                  sentDe: rawSentDe,
                  sentEs: rawSentEs,
                  blocks
                });

                // Clasificación para muestras de verificación
                if (blocks.length === 3 && !rawSentDe.includes('?') && sampleRegular.length < 5) {
                  sampleRegular.push({ de: deVal, sentence: rawSentDe, blocks });
                }
                if (blocks.some(b => b.role === 'verb_p2' && SEPARABLE_PREFIXES.has(b.text.toLowerCase())) && sampleSeparable.length < 5) {
                  sampleSeparable.push({ de: deVal, sentence: rawSentDe, blocks });
                }
                if (blocks.some(b => b.role === 'verb_p2' && !SEPARABLE_PREFIXES.has(b.text.toLowerCase())) && sampleCompound.length < 5) {
                  sampleCompound.push({ de: deVal, sentence: rawSentDe, blocks });
                }
              }

              const formatBlocksStr = (blks) => {
                const items = blks.map(b => 
                  `      { text: ${JSON.stringify(b.text)}, role: ${JSON.stringify(b.role)}, order: ${b.order} }`
                );
                return `[\n${items.join(',\n')}\n    ]`;
              };

              if (sentDeProp.value.value === 'undefined') {
                let endOffset = sentEsProp ? sentEsProp.end : sentDeProp.end;
                const repText = `exampleSentenceDe: ${JSON.stringify(rawSentDe)},\n    exampleSentenceEs: ${JSON.stringify(rawSentEs)},\n    exampleSentenceDeBlocks: ${formatBlocksStr(blocks)}`;
                replacements.push({
                  start: sentDeProp.start,
                  end: endOffset,
                  text: repText
                });
              } else if (blocksProp) {
                const repText = `exampleSentenceDeBlocks: ${formatBlocksStr(blocks)}`;
                replacements.push({
                  start: blocksProp.start,
                  end: blocksProp.end,
                  text: repText
                });
              } else {
                const anchorProp = sentEsProp || sentDeProp;
                const repText = `,\n    exampleSentenceDeBlocks: ${formatBlocksStr(blocks)}`;
                replacements.push({
                  start: anchorProp.end,
                  end: anchorProp.end,
                  text: repText
                });
              }
            });
          }
        });
      });
    }
    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        if (Array.isArray(node[key])) node[key].forEach(traverse);
        else traverse(node[key]);
      }
    }
  };
  traverse(ast);

  // Ordenar reemplazos en orden inverso para preservar offsets de caracteres
  replacements.sort((a, b) => b.start - a.start);

  let modifiedChapters = chaptersSource;
  for (const rep of replacements) {
    modifiedChapters = modifiedChapters.slice(0, rep.start) + rep.text + modifiedChapters.slice(rep.end);
  }

  // Validación AST pre-escritura
  try {
    babel.parse(modifiedChapters, { sourceType: 'module', plugins: ['jsx'] });
  } catch (parseErr) {
    console.error('❌ Error fatal de sintaxis al procesar chapters.jsx:', parseErr);
    process.exit(1);
  }

  // Escribir archivo actualizado
  fs.writeFileSync(chaptersPath, modifiedChapters, 'utf8');
  console.log(`✅ Archivo src/data/chapters.jsx actualizado correctamente.`);

  // 3. Sincronización en vocabulario_completo.json
  if (fs.existsSync(vocabJsonPath)) {
    console.log('🔄 Sincronizando con vocabulario_completo.json...');
    const vocabList = JSON.parse(fs.readFileSync(vocabJsonPath, 'utf8'));
    let vocabUpdatedCount = 0;

    vocabList.forEach(item => {
      const match = wordBlocksMap.get(item.word);
      if (match) {
        if (match.sentDe && item.exampleSentenceDe === 'undefined') {
          item.exampleSentenceDe = match.sentDe;
          item.exampleSentenceEs = match.sentEs;
        }
        item.exampleSentenceDeBlocks = match.blocks;
        vocabUpdatedCount++;
      } else if (item.exampleSentenceDe && item.exampleSentenceDe !== 'undefined') {
        item.exampleSentenceDeBlocks = segmentGermanSentence(item.exampleSentenceDe, { de: item.word });
        vocabUpdatedCount++;
      }
    });

    fs.writeFileSync(vocabJsonPath, JSON.stringify(vocabList, null, 2), 'utf8');
    console.log(`✅ vocabulario_completo.json sincronizado (${vocabUpdatedCount} términos actualizados con bloques).`);
  }

  // 4. Reporte de Progreso y Muestras Aleatorias
  console.log('\n========================================================');
  console.log('📊 REPORTE DE EJECUCIÓN - SEGMENTACIÓN MASIVA');
  console.log('========================================================');
  console.log(`Total de oraciones analizadas:              ${analyzedCount}`);
  console.log(`Total de oraciones con bloques generados:   ${successCount} (${((successCount / analyzedCount) * 100).toFixed(1)}%)`);
  console.log('========================================================\n');

  console.log('🔎 MUESTRA 1: Oración Regular (3 Bloques - V2 Estándar)');
  console.log(JSON.stringify(sampleRegular[Math.floor(Math.random() * sampleRegular.length)], null, 2));

  console.log('\n🔎 MUESTRA 2: Oración con Verbo Separable (4 Bloques - Pinza Verbal)');
  console.log(JSON.stringify(sampleSeparable[Math.floor(Math.random() * sampleSeparable.length)], null, 2));

  console.log('\n🔎 MUESTRA 3: Oración Compuesta / Modal / Perfekt (4 Bloques - Satzklammer)');
  console.log(JSON.stringify(sampleCompound[Math.floor(Math.random() * sampleCompound.length)], null, 2));
  console.log('\n✨ FASE 2 completada exitosamente.');
}

runBatchSegmentation();
