import { Star as Sparkles, BookOpen, Clock, Coffee, Home, Link2, List, Search, ShoppingCart } from 'lucide-react';

export const coreChapters = [
{
  id: 1,
  title: "Kapitel 1: Alphabet & Zahlen",
  icon: <List size={20} />,
  emoji: "🔤",
  words: [{
    de: "A, a",
    pron: "a",
    es: "A",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe A ist groß.",
    exampleSentenceEs: "La letra A es grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Buchstabe A", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ]
  }, {
    de: "B, b",
    pron: "be",
    es: "B",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Brot' beginnt mit B.",
    exampleSentenceEs: "La palabra 'pan' comienza con B.",
    exampleSentenceDeBlocks: [
      { text: "Das Wort 'Brot'", role: "subject", order: 1 },
      { text: "beginnt", role: "verb_p1", order: 2 },
      { text: "mit B", role: "complement", order: 3 }
    ]
  }, {
    de: "C, c",
    pron: "tse",
    es: "C",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe C ist groß.",
    exampleSentenceEs: "La letra C es grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Buchstabe C", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ]
  }, {
    de: "D, d",
    pron: "de",
    es: "D",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe D.",
    exampleSentenceEs: "Esa es la letra D.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Buchstabe D", role: "complement", order: 3 }
    ]
  }, {
    de: "E, e",
    pron: "e",
    es: "E",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Ich schreibe das Wort mit 'E'.",
    exampleSentenceEs: "Yo escribo la palabra con 'E'.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schreibe", role: "verb_p1", order: 2 },
      { text: "das Wort mit 'E'", role: "complement", order: 3 }
    ]
  }, {
    de: "F, f",
    pron: "ef",
    es: "F",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das 'F' in 'Familie' ist groß.",
    exampleSentenceEs: "La 'F' en 'Familie' es mayúscula.",
    exampleSentenceDeBlocks: [
      { text: "Das 'F' in 'Familie'", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ]
  }, {
    de: "G, g",
    pron: "gue",
    es: "G",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe G ist im Wort 'Gitarre'.",
    exampleSentenceEs: "La letra G está en la palabra 'guitarra'.",
    exampleSentenceDeBlocks: [
      { text: "Der Buchstabe G", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "im Wort 'Gitarre'", role: "complement", order: 3 }
    ]
  }, {
    de: "H, h",
    pron: "ja",
    es: "H",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Mein Name hat ein H.",
    exampleSentenceEs: "Mi nombre tiene una H.",
    exampleSentenceDeBlocks: [
      { text: "Mein Name", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "ein H", role: "complement", order: 3 }
    ]
  }, {
    de: "I, i",
    pron: "i",
    es: "I",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das 'I' ist ein Buchstabe.",
    exampleSentenceEs: "La 'I' es una letra.",
    exampleSentenceDeBlocks: [
      { text: "Das 'I'", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Buchstabe", role: "complement", order: 3 }
    ]
  }, {
    de: "J, j",
    pron: "yot",
    es: "J",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe J ist im Wort 'Ja'.",
    exampleSentenceEs: "La letra J está en la palabra 'Ja' (sí).",
    exampleSentenceDeBlocks: [
      { text: "Der Buchstabe J", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "im Wort 'Ja'", role: "complement", order: 3 }
    ]
  }, {
    de: "K, k",
    pron: "ka",
    es: "K",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Ich schreibe das Wort 'Katze' mit K.",
    exampleSentenceEs: "Escribo la palabra 'Katze' con K.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schreibe", role: "verb_p1", order: 2 },
      { text: "das Wort 'Katze' mit K", role: "complement", order: 3 }
    ]
  }, {
    de: "L, l",
    pron: "el",
    es: "L",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Land' beginnt mit 'L'.",
    exampleSentenceEs: "La palabra 'Land' comienza con 'L'.",
    exampleSentenceDeBlocks: [
      { text: "Das Wort 'Land'", role: "subject", order: 1 },
      { text: "beginnt", role: "verb_p1", order: 2 },
      { text: "mit 'L'", role: "complement", order: 3 }
    ]
  }, {
    de: "M, m",
    pron: "em",
    es: "M",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das M ist ein Buchstabe.",
    exampleSentenceEs: "La M es una letra.",
    exampleSentenceDeBlocks: [
      { text: "Das M", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Buchstabe", role: "complement", order: 3 }
    ]
  }, {
    de: "N, n",
    pron: "en",
    es: "N",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Name beginnt mit N.",
    exampleSentenceEs: "El nombre comienza con N.",
    exampleSentenceDeBlocks: [
      { text: "Der Name", role: "subject", order: 1 },
      { text: "beginnt", role: "verb_p1", order: 2 },
      { text: "mit N", role: "complement", order: 3 }
    ]
  }, {
    de: "O, o",
    pron: "o",
    es: "O",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das O ist groß.",
    exampleSentenceEs: "La O es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das O", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ]
  }, {
    de: "P, p",
    pron: "pe",
    es: "P",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Post' beginnt mit P.",
    exampleSentenceEs: "La palabra 'Post' comienza con P.",
    exampleSentenceDeBlocks: [
      { text: "Das Wort 'Post'", role: "subject", order: 1 },
      { text: "beginnt", role: "verb_p1", order: 2 },
      { text: "mit P", role: "complement", order: 3 }
    ]
  }, {
    de: "Q, q",
    pron: "ku",
    es: "Q",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Q ist ein Buchstabe im Alphabet.",
    exampleSentenceEs: "La Q es una letra del abecedario.",
    exampleSentenceDeBlocks: [
      { text: "Das Q", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Buchstabe im Alphabet", role: "complement", order: 3 }
    ]
  }, {
    de: "R, r",
    pron: "er",
    es: "R",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe R ist schwer.",
    exampleSentenceEs: "La letra R es difícil.",
    exampleSentenceDeBlocks: [
      { text: "Der Buchstabe R", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schwer", role: "complement", order: 3 }
    ]
  }, {
    de: "S, s",
    pron: "es",
    es: "S",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe 'S' ist in meinem Namen.",
    exampleSentenceEs: "La letra 'S' está en mi nombre.",
    exampleSentenceDeBlocks: [
      { text: "Der Buchstabe 'S'", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "in meinem Namen", role: "complement", order: 3 }
    ]
  }, {
    de: "T, t",
    pron: "te",
    es: "T",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe T.",
    exampleSentenceEs: "Esta es la letra T.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Buchstabe T", role: "complement", order: 3 }
    ]
  }, {
    de: "U, u",
    pron: "u",
    es: "U",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das 'U' ist ein Vokal.",
    exampleSentenceEs: "La 'U' es una vocal.",
    exampleSentenceDeBlocks: [
      { text: "Das 'U'", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Vokal", role: "complement", order: 3 }
    ]
  }, {
    de: "V, v",
    pron: "fau",
    es: "V",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe V.",
    exampleSentenceEs: "Esta es la letra V.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Buchstabe V", role: "complement", order: 3 }
    ]
  }, {
    de: "W, w",
    pron: "ve",
    es: "W",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe W.",
    exampleSentenceEs: "Esta es la letra W.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Buchstabe W", role: "complement", order: 3 }
    ]
  }, {
    de: "X, x",
    pron: "iks",
    es: "X",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe X.",
    exampleSentenceEs: "Esta es la letra X.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Buchstabe X", role: "complement", order: 3 }
    ]
  }, {
    de: "Y, y",
    pron: "úp-si-lon",
    es: "Y",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Ich bin Thomas und das ist Anna.",
    exampleSentenceEs: "Yo soy Thomas y esta es Anna.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "Thomas und das ist Anna", role: "complement", order: 3 }
    ]
  }, {
    de: "Z, z",
    pron: "tset",
    es: "Z",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe Z.",
    exampleSentenceEs: "Esta es la letra Z.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Buchstabe Z", role: "complement", order: 3 }
    ]
  }, {
    de: "Ä, ä",
    pron: "e abierta",
    es: "A con diéresis",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Äpfel' hat ein Ä.",
    exampleSentenceEs: "La palabra 'Äpfel' tiene una A con diéresis.",
    exampleSentenceDeBlocks: [
      { text: "Das Wort 'Äpfel'", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "ein Ä", role: "complement", order: 3 }
    ]
  }, {
    de: "Ö, ö",
    pron: "e con labios de o",
    es: "O con diéresis",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe Ö ist in meinem Namen.",
    exampleSentenceEs: "La letra Ö está en mi nombre.",
    exampleSentenceDeBlocks: [
      { text: "Der Buchstabe Ö", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "in meinem Namen", role: "complement", order: 3 }
    ]
  }, {
    de: "Ü, ü",
    pron: "i con labios de u",
    es: "U con diéresis",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Die Übung ist sehr einfach.",
    exampleSentenceEs: "El ejercicio es muy fácil.",
    exampleSentenceDeBlocks: [
      { text: "Die Übung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr einfach", role: "complement", order: 3 }
    ]
  }, {
    de: "ß",
    pron: "es-tset",
    es: "S fuerte",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Der Tee ist heiß.",
    exampleSentenceEs: "El té está caliente.",
    exampleSentenceDeBlocks: [
      { text: "Der Tee", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heiß", role: "complement", order: 3 }
    ]
  }, {
    de: "null",
    pron: "nul",
    es: "cero (0)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe null Euro.",
    exampleSentenceEs: "Tengo cero euros.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "null Euro", role: "complement", order: 3 }
    ],
    regimen: "Cardinal, sin ordinal"
  }, {
    de: "eins",
    pron: "áins",
    es: "uno (1)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe eins.",
    exampleSentenceEs: "Tengo uno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eins", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: erste"
  }, {
    de: "zwei",
    pron: "tsvái",
    es: "dos (2)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe zwei Katzen.",
    exampleSentenceEs: "Tengo dos gatos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "zwei Katzen", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: zweite"
  }, {
    de: "drei",
    pron: "drái",
    es: "tres (3)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe drei Äpfel.",
    exampleSentenceEs: "Tengo tres manzanas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "drei Äpfel", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: dritte"
  }, {
    de: "vier",
    pron: "fí-a",
    es: "cuatro (4)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe vier Äpfel.",
    exampleSentenceEs: "Tengo cuatro manzanas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "vier Äpfel", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: vierte"
  }, {
    de: "fünf",
    pron: "funf",
    es: "cinco (5)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Das Brot kostet fünf Euro.",
    exampleSentenceEs: "El pan cuesta cinco euros.",
    exampleSentenceDeBlocks: [
      { text: "Das Brot", role: "subject", order: 1 },
      { text: "kostet", role: "verb_p1", order: 2 },
      { text: "fünf Euro", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: fünfte"
  }, {
    de: "sechs",
    pron: "zeks",
    es: "seis (6)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Das Ticket kostet sechs Euro.",
    exampleSentenceEs: "El billete cuesta seis euros.",
    exampleSentenceDeBlocks: [
      { text: "Das Ticket", role: "subject", order: 1 },
      { text: "kostet", role: "verb_p1", order: 2 },
      { text: "sechs Euro", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: sechste"
  }, {
    de: "sieben",
    pron: "sí-ben",
    es: "siete (7)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe sieben Äpfel.",
    exampleSentenceEs: "Tengo siete manzanas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "sieben Äpfel", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: siebte"
  }, {
    de: "acht",
    pron: "ajt",
    es: "ocho (8)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe acht Euro.",
    exampleSentenceEs: "Tengo ocho euros.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "acht Euro", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: achte"
  }, {
    de: "neun",
    pron: "nóin",
    es: "nueve (9)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe neun Äpfel.",
    exampleSentenceEs: "Tengo nueve manzanas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "neun Äpfel", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: neunte"
  }, {
    de: "zehn",
    pron: "tsén",
    es: "diez (10)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe zehn Finger.",
    exampleSentenceEs: "Tengo diez dedos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "zehn Finger", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: zehnte"
  }, {
    de: "elf",
    pron: "élf",
    es: "once (11)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin elf Jahre alt.",
    exampleSentenceEs: "Tengo once años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "elf Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: elfte"
  }, {
    de: "zwölf",
    pron: "tsuolf",
    es: "doce (12)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe zwölf Euro.",
    exampleSentenceEs: "Tengo doce euros.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "zwölf Euro", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: zwölfte"
  }, {
    de: "dreizehn",
    pron: "drái-tsen",
    es: "trece (13)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe dreizehn Euro.",
    exampleSentenceEs: "Tengo trece euros.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "dreizehn Euro", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: dreizehnte"
  }, {
    de: "sechzehn",
    pron: "zéj-tsen",
    es: "dieciséis (16)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin sechzehn Jahre alt.",
    exampleSentenceEs: "Tengo dieciséis años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "sechzehn Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: sechzehnte"
  }, {
    de: "siebzehn",
    pron: "síp-tsen",
    es: "diecisiete (17)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin siebzehn Jahre alt.",
    exampleSentenceEs: "Tengo diecisiete años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "siebzehn Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: siebzehnte"
  }, {
    de: "zwanzig",
    pron: "tsván-tsij",
    es: "veinte (20)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin zwanzig Jahre alt.",
    exampleSentenceEs: "Tengo veinte años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "zwanzig Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: zwanzigste"
  }, {
    de: "einundzwanzig",
    pron: "ain-unt-tsván-tsij",
    es: "veintiuno (21)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin einundzwanzig Jahre alt.",
    exampleSentenceEs: "Tengo veintiuno años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "einundzwanzig Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: einundzwanzigste"
  }, {
    de: "dreißig",
    pron: "drái-sij",
    es: "treinta (30)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin dreißig Jahre alt.",
    exampleSentenceEs: "Tengo treinta años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "dreißig Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: dreißigste"
  }, {
    de: "vierzig",
    pron: "fía-tsij",
    es: "cuarenta (40)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin vierzig Jahre alt.",
    exampleSentenceEs: "Tengo cuarenta años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "vierzig Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: vierzigste"
  }, {
    de: "hundert",
    pron: "hún-deat",
    es: "cien (100)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe hundert Euro.",
    exampleSentenceEs: "Tengo cien euros.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "hundert Euro", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: hundertste"
  }, {
    de: "tausend",
    pron: "táu-sent",
    es: "mil (1000)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe tausend Euro.",
    exampleSentenceEs: "Tengo mil euros.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "tausend Euro", role: "complement", order: 3 }
    ],
    regimen: "Ordinal: tausendste"
  }, {
    de: "der erste",
    pron: "dea érs-te",
    es: "primero (1.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Ich bin der erste.",
    exampleSentenceEs: "Yo soy el primero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "der erste", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der zweite",
    pron: "dea tsvái-te",
    es: "segundo (2.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Das ist der zweite Stock.",
    exampleSentenceEs: "Este es el segundo piso.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der zweite Stock", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der dritte",
    pron: "dea drí-te",
    es: "tercero (3.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Ich wohne in der dritten Straße.",
    exampleSentenceEs: "Yo vivo en la tercera calle.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "in der dritten Straße", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der vierte",
    pron: "dea fí-a-te",
    es: "cuarto (4.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Ich wohne in der vierten Etage.",
    exampleSentenceEs: "Yo vivo en el cuarto piso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "in der vierten Etage", role: "complement", order: 3 }
    ],
    regimen: "Declina como adjetivo"
  }, {
    de: "der fünfte",
    pron: "dea fúnf-te",
    es: "quinto (5.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der fünfte Mai.",
    exampleSentenceEs: "Hoy es el quinto de mayo.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der fünfte Mai", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der sechste",
    pron: "dea zéks-te",
    es: "sexto (6.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der sechste Mai.",
    exampleSentenceEs: "Hoy es el sexto de mayo.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der sechste Mai", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der siebte",
    pron: "dea zíp-te",
    es: "séptimo (7.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Sonntag ist der siebte Tag.",
    exampleSentenceEs: "El domingo es el séptimo día.",
    exampleSentenceDeBlocks: [
      { text: "Sonntag", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der siebte Tag", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der achte",
    pron: "dea áj-te",
    es: "octavo (8.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Das ist die achte Stunde.",
    exampleSentenceEs: "Esta es la octava hora.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die achte Stunde", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der neunte",
    pron: "dea nóin-te",
    es: "noveno (9.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der neunte Mai.",
    exampleSentenceEs: "Hoy es el noveno de mayo.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der neunte Mai", role: "complement", order: 3 }
    ],
    regimen: "Declina como adjetivo"
  }, {
    de: "der zehnte",
    pron: "dea tsén-te",
    es: "décimo (10.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Der zehnte Tag ist heute.",
    exampleSentenceEs: "El décimo día es hoy.",
    exampleSentenceDeBlocks: [
      { text: "Der", role: "subject", order: 1 },
      { text: "zehnte", role: "verb_p1", order: 2 },
      { text: "Tag ist heute", role: "complement", order: 3 }
    ],
    regimen: "Declina como adjetivo"
  }, {
    de: "der zwanzigste",
    pron: "dea tsván-tsiks-te",
    es: "vigésimo (20.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der zwanzigste Tag im Monat.",
    exampleSentenceEs: "Hoy es el vigésimo día del mes.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der zwanzigste Tag im Monat", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "der einundzwanzigste",
    pron: "dea ái-nunt-tsván-tsigs-te",
    es: "vigésimo primero (21.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der einundzwanzigste Januar.",
    exampleSentenceEs: "Hoy es el veintiuno de enero.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der einundzwanzigste Januar", role: "complement", order: 3 }
    ],
    regimen: "Declina como adj."
  }, {
    de: "die Hälfte",
    pron: "di jélf-te",
    es: "la mitad",
    type: "Sustantivo",
    category: "Zahlen",
    exampleSentenceDe: "Ich nehme die Hälfte von dem Kuchen.",
    exampleSentenceEs: "Yo tomo la mitad del pastel.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "nehme", role: "verb_p1", order: 2 },
      { text: "die Hälfte von dem Kuchen", role: "complement", order: 3 }
    ],
    plural: "die Hälften"
  }, {
    de: "das Viertel",
    pron: "das fía-tel",
    es: "el cuarto (1/4)",
    type: "Sustantivo",
    category: "Zahlen",
    exampleSentenceDe: "Das ist ein Viertel von dem Kuchen.",
    exampleSentenceEs: "Este es un cuarto del pastel.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Viertel von dem Kuchen", role: "complement", order: 3 }
    ],
    plural: "die Viertel"
  }, {
    de: "plus / minus",
    pron: "plus  mí-nus",
    es: "más / menos",
    type: "Adverbio",
    category: "Zahlen",
    exampleSentenceDe: "Fünf plus fünf ist zehn.",
    exampleSentenceEs: "Cinco más cinco son diez.",
    exampleSentenceDeBlocks: [
      { text: "Fünf plus fünf", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "zehn", role: "complement", order: 3 }
    ],
    regimen: "Operaciones matemáticas"
  }, {
    de: "mal / durch",
    pron: "mal  durch",
    es: "por / dividido entre",
    type: "Adverbio",
    category: "Zahlen",
    exampleSentenceDe: "Wir gehen durch den Park.",
    exampleSentenceEs: "Vamos por el parque.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "gehen", role: "verb_p1", order: 2 },
      { text: "durch den Park", role: "complement", order: 3 }
    ],
    regimen: "Operaciones matemáticas"
  }, {
    de: "das Prozent",
    pron: "das pro-tsént",
    es: "el por ciento (%)",
    type: "Sustantivo",
    category: "Zahlen",
    exampleSentenceDe: "Das Prozent ist nicht hoch.",
    exampleSentenceEs: "El por ciento no es alto.",
    exampleSentenceDeBlocks: [
      { text: "Das Prozent", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nicht hoch", role: "complement", order: 3 }
    ],
    plural: "die Prozent"
  },
  {
    "de": "bzw. (beziehungsweise)",
    "pron": "be-tsí-ungs-vai-ze",
    "es": "o bien / respectivamente",
    "type": "Abreviatura / Conector",
    "category": "Abkürzungen",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Der Kurs findet montags bzw. mittwochs statt.",
    "exampleSentenceEs": "El curso tiene lugar los lunes o bien los miércoles.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Kurs",
        "role": "subject",
        "order": 1
      },
      {
        "text": "findet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "montags bzw. mittwochs",
        "role": "complement",
        "order": 3
      },
      {
        "text": "statt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "ca. (circa)",
    "pron": "tsír-ka",
    "es": "aproximadamente / aprox.",
    "type": "Abreviatura / Adverbio",
    "category": "Abkürzungen",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Die Fahrt dauert ca. zwanzig Minuten.",
    "exampleSentenceEs": "El viaje dura aproximadamente veinte minutos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Fahrt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dauert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ca. zwanzig Minuten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "d. h. (das heißt)",
    "pron": "das jaist",
    "es": "es decir / o sea",
    "type": "Abreviatura / Frase",
    "category": "Abkürzungen",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Morgen ist Feiertag, d. h. die Geschäfte sind zu.",
    "exampleSentenceEs": "Mañana es festivo, es decir, las tiendas están cerradas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Morgen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Feiertag, d. h. die Geschäfte sind zu",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "doppelt",
    "pron": "dó-pelt",
    "es": "doble / por duplicado",
    "type": "Adjetivo / Adverbio",
    "category": "Zahlen",
    "level": "A2–B1",
    "regimen": "Prefijo: Doppel-",
    "exampleSentenceDe": "Bitte füllen Sie das Formular doppelt aus.",
    "exampleSentenceEs": "Por favor, rellene el formulario por duplicado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "füllen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "das Formular doppelt",
        "role": "complement",
        "order": 4
      },
      {
        "text": "aus",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "etc. (et cetera)",
    "pron": "et tsé-te-ra",
    "es": "etcétera",
    "type": "Abreviatura",
    "category": "Abkürzungen",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Wir brauchen Papier, Stifte, Ordner etc.",
    "exampleSentenceEs": "Necesitamos papel, bolígrafos, carpetas, etc.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Papier, Stifte, Ordner etc.",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "halb",
    "pron": "jalp",
    "es": "medio / a medias",
    "type": "Adjetivo / Adverbio",
    "category": "Zahlen",
    "level": "A1–B1",
    "regimen": "Invariable con medidas sin declinar",
    "exampleSentenceDe": "Ich habe nur eine halbe Stunde Zeit.",
    "exampleSentenceEs": "Solo tengo media hora de tiempo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nur eine halbe Stunde Zeit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Jahrhundert",
    "pron": "das yár-jun-dert",
    "es": "el siglo",
    "type": "Sustantivo (Neutro)",
    "category": "Zahlen",
    "level": "A2–B1",
    "plural": "die Jahrhunderte",
    "exampleSentenceDe": "Im zwanzigsten Jahrhundert gab es viele Erfindungen.",
    "exampleSentenceEs": "En el siglo XX hubo muchos inventos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im zwanzigsten Jahrhundert",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gab",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es viele Erfindungen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "usw. (und so weiter)",
    "pron": "unt zo vái-ta",
    "es": "y así sucesivamente / etc.",
    "type": "Abreviatura",
    "category": "Abkürzungen",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Im Supermarkt gibt es Obst, Gemüse, Käse usw.",
    "exampleSentenceEs": "En el supermercado hay fruta, verdura, queso, etc.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Supermarkt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es Obst, Gemüse, Käse usw.",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "vgl. (vergleiche)",
    "pron": "fea-glái-je",
    "es": "véase / compárese",
    "type": "Abreviatura / Imperativo",
    "category": "Abkürzungen",
    "level": "B1",
    "regimen": "Uso en textos y exámenes",
    "exampleSentenceDe": "Vgl. hierzu die Tabelle auf Seite drei.",
    "exampleSentenceEs": "Véase al respecto la tabla de la página tres.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vgl.",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "hierzu die Tabelle auf Seite drei",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "z. B. (zum Beispiel)",
    "pron": "tsum bái-shpil",
    "es": "por ejemplo",
    "type": "Abreviatura",
    "category": "Abkürzungen",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Ich mag Sport, z. B. Schwimmen und Radfahren.",
    "exampleSentenceEs": "Me gusta el deporte, por ejemplo, nadar y montar en bici.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "mag",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sport, z. B. Schwimmen und Radfahren",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Million",
    "pron": "di mi-lión",
    "es": "el millón",
    "type": "Sustantivo (Fem)",
    "category": "Zahlen",
    "level": "A2–B1",
    "plural": "die Millionen",
    "exampleSentenceDe": "Berlin hat mehr als drei Millionen Einwohner.",
    "exampleSentenceEs": "Berlín tiene más de tres millones de habitantes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Berlin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mehr als drei Millionen Einwohner",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Milliarde",
    "pron": "di mi-liár-de",
    "es": "los mil millones / millardo",
    "type": "Sustantivo (Fem)",
    "category": "Zahlen",
    "level": "B1",
    "plural": "die Milliarden",
    "exampleSentenceDe": "Auf der Erde leben über acht Milliarden Menschen.",
    "exampleSentenceEs": "En la Tierra viven más de ocho mil millones de personas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der Erde",
        "role": "complement",
        "order": 1
      },
      {
        "text": "leben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über acht Milliarden Menschen",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "erstens",
    "pron": "érs-tens",
    "es": "en primer lugar / primero",
    "type": "Adverbio",
    "category": "Zahlen",
    "level": "B1",
    "regimen": "Ordenador discursivo",
    "exampleSentenceDe": "Erstens habe ich keine Zeit und zweitens kein Geld.",
    "exampleSentenceEs": "En primer lugar no tengo tiempo y en segundo, dinero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Erstens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "keine Zeit und zweitens kein Geld",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "zweitens",
    "pron": "tsvái-tens",
    "es": "en segundo lugar",
    "type": "Adverbio",
    "category": "Zahlen",
    "level": "B1",
    "regimen": "Ordenador discursivo",
    "exampleSentenceDe": "Zweitens müssen wir noch den Vertrag prüfen.",
    "exampleSentenceEs": "En segundo lugar tenemos que revisar todavía el contrato.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zweitens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "noch den Vertrag",
        "role": "complement",
        "order": 4
      },
      {
        "text": "prüfen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "drittens",
    "pron": "drí-tens",
    "es": "en tercer lugar",
    "type": "Adverbio",
    "category": "Zahlen",
    "level": "B1",
    "regimen": "Ordenador discursivo",
    "exampleSentenceDe": "Drittens beginnt der Kurs schon um acht Uhr.",
    "exampleSentenceEs": "En tercer lugar el curso empieza ya a las ocho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Drittens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "beginnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Kurs",
        "role": "subject",
        "order": 3
      },
      {
        "text": "schon um acht Uhr",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "zweimal",
    "pron": "tsvái-mal",
    "es": "dos veces",
    "type": "Adverbio",
    "category": "Zahlen",
    "level": "A1–B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Ich gehe zweimal pro Woche zum Deutschkurs.",
    "exampleSentenceEs": "Voy dos veces por semana al curso de alemán.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zweimal pro Woche zum Deutschkurs",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "dreimal",
    "pron": "drái-mal",
    "es": "tres veces",
    "type": "Adverbio",
    "category": "Zahlen",
    "level": "A1–B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Nehmen Sie diese Tablette dreimal täglich ein.",
    "exampleSentenceEs": "Tome esta pastilla tres veces al día.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nehmen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "diese Tablette dreimal täglich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "zweifach",
    "pron": "tsvái-faj",
    "es": "doble / por dos",
    "type": "Adjetivo / Adverbio",
    "category": "Zahlen",
    "level": "B1",
    "regimen": "Multiplicador",
    "exampleSentenceDe": "Bitte senden Sie das Dokument zweifach per Post.",
    "exampleSentenceEs": "Por favor, envíe el documento por duplicado por correo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "senden",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "das Dokument zweifach per Post",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Drittel",
    "pron": "das drí-tel",
    "es": "el tercio / la tercera parte",
    "type": "Sustantivo (Neutro)",
    "category": "Zahlen",
    "level": "B1",
    "plural": "die Drittel",
    "exampleSentenceDe": "Ein Drittel der Teilnehmer kommt aus Spanien.",
    "exampleSentenceEs": "Un tercio de los participantes viene de España.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ein Drittel der Teilnehmer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus Spanien",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Cent",
    "pron": "dea tsent",
    "es": "el céntimo (de euro)",
    "type": "Sustantivo (Masc)",
    "category": "Maße & Währung",
    "level": "A1–B1",
    "plural": "die Cents / Cent",
    "exampleSentenceDe": "Das Brötchen kostet fünfundvierzig Cent.",
    "exampleSentenceEs": "El panecillo cuesta cuarenta y cinco céntimos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Brötchen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kostet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fünfundvierzig Cent",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Franken",
    "pron": "dea frán-ken",
    "es": "el franco (suizo)",
    "type": "Sustantivo (Masc)",
    "category": "Maße & Währung",
    "level": "B1",
    "plural": "die Franken (sFr.)",
    "exampleSentenceDe": "In der Schweiz bezahlt man mit Schweizer Franken.",
    "exampleSentenceEs": "En Suiza se paga con francos suizos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Schweiz",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bezahlt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mit Schweizer Franken",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Quadratmeter",
    "pron": "dea kva-drát-me-ta",
    "es": "el metro cuadrado (m^2)",
    "type": "Sustantivo (Masc)",
    "category": "Maße & Währung",
    "level": "A2–B1",
    "plural": "die Quadratmeter",
    "exampleSentenceDe": "Unsere neue Wohnung hat achtzig Quadratmeter.",
    "exampleSentenceEs": "Nuestro piso nuevo tiene ochenta metros cuadrados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere neue Wohnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "achtzig Quadratmeter",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Kilogramm",
    "pron": "das kí-lo-gram",
    "es": "el kilogramo (kg)",
    "type": "Sustantivo (Neutro)",
    "category": "Maße & Währung",
    "level": "A1–B1",
    "plural": "die Kilogramm",
    "exampleSentenceDe": "Der Koffer darf maximal zwanzig Kilogramm wiegen.",
    "exampleSentenceEs": "La maleta puede pesar como máximo veinte kilogramos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Koffer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "darf",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "maximal zwanzig Kilogramm",
        "role": "complement",
        "order": 3
      },
      {
        "text": "wiegen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Grad",
    "pron": "das grat",
    "es": "el grado (temperatura/ángulo)",
    "type": "Sustantivo (Neutro)",
    "category": "Maße & Währung",
    "level": "A2–B1",
    "plural": "die Grad",
    "exampleSentenceDe": "Heute haben wir minus zwei Grad unter Null.",
    "exampleSentenceEs": "Hoy tenemos dos grados bajo cero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Heute",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "minus zwei Grad unter Null",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "viertens",
    "pron": "fír-tens",
    "es": "en cuarto lugar",
    "type": "Adverbio",
    "category": "Zahlen",
    "level": "B1",
    "regimen": "Ordenador discursivo",
    "exampleSentenceDe": "Viertens müssen wir die Miete zahlen.",
    "exampleSentenceEs": "En cuarto lugar tenemos que pagar el alquiler.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viertens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Miete",
        "role": "complement",
        "order": 4
      },
      {
        "text": "zahlen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  }
]
},
{
  id: 2,
  title: "Kapitel 2: Zeit & Datum",
  icon: <Clock size={20} />,
  emoji: "⏰",
  words: [{
    de: "die Woche",
    pron: "di vó-je",
    es: "la semana",
    type: "Sustantivo (Fem)",
    category: "Tage",
    exampleSentenceDe: "Diese Woche ist kurz.",
    exampleSentenceEs: "Esta semana es corta.",
    exampleSentenceDeBlocks: [
      { text: "Diese Woche", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "kurz", role: "complement", order: 3 }
    ],
    plural: "die Wochen"
  }, {
    de: "Montag",
    pron: "món-tak",
    es: "lunes",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Montag habe ich Deutsch.",
    exampleSentenceEs: "El lunes tengo alemán.",
    exampleSentenceDeBlocks: [
      { text: "Am Montag", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ich Deutsch", role: "complement", order: 3 }
    ],
    plural: "die Montage"
  }, {
    de: "Dienstag",
    pron: "díns-tak",
    es: "martes",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Dienstag trinke ich Kaffee.",
    exampleSentenceEs: "El martes bebo café.",
    exampleSentenceDeBlocks: [
      { text: "Am Dienstag", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich Kaffee", role: "complement", order: 3 }
    ],
    plural: "die Dienstage"
  }, {
    de: "Mittwoch",
    pron: "mít-voj",
    es: "miércoles",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Mittwoch ist ein Treffen.",
    exampleSentenceEs: "El miércoles hay una reunión.",
    exampleSentenceDeBlocks: [
      { text: "Am Mittwoch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Treffen", role: "complement", order: 3 }
    ],
    plural: "die Mittwoche"
  }, {
    de: "Donnerstag",
    pron: "dó-ners-tak",
    es: "jueves",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Donnerstag trinke ich Kaffee.",
    exampleSentenceEs: "El jueves bebo café.",
    exampleSentenceDeBlocks: [
      { text: "Am Donnerstag", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich Kaffee", role: "complement", order: 3 }
    ],
    plural: "die Donnerstage"
  }, {
    de: "Freitag",
    pron: "frái-tak",
    es: "viernes",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Freitag ist meine Party.",
    exampleSentenceEs: "El viernes es mi fiesta.",
    exampleSentenceDeBlocks: [
      { text: "Am Freitag", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "meine Party", role: "complement", order: 3 }
    ],
    plural: "die Freitage"
  }, {
    de: "Samstag",
    pron: "sáms-tak",
    es: "sábado",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Samstag trinke ich Kaffee.",
    exampleSentenceEs: "El sábado bebo café.",
    exampleSentenceDeBlocks: [
      { text: "Am Samstag", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich Kaffee", role: "complement", order: 3 }
    ],
    plural: "die Samstage"
  }, {
    de: "Sonntag",
    pron: "són-tak",
    es: "domingo",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Der Sonntag ist ein Tag.",
    exampleSentenceEs: "El domingo es un día.",
    exampleSentenceDeBlocks: [
      { text: "Der Sonntag", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Tag", role: "complement", order: 3 }
    ],
    plural: "die Sonntage"
  }, {
    de: "am + Tag",
    pron: "am ták",
    es: "en el + día",
    type: "Preposición",
    category: "Tage",
    exampleSentenceDe: "Am Montag habe ich frei.",
    exampleSentenceEs: "El lunes tengo libre.",
    exampleSentenceDeBlocks: [
      { text: "Am Montag", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ich frei", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "das Wochenende",
    pron: "das vó-jen-én-de",
    es: "el fin de semana",
    type: "Sustantivo (Neutro)",
    category: "Tage",
    exampleSentenceDe: "Das Wochenende ist am Samstag und am Sonntag.",
    exampleSentenceEs: "El fin de semana es el sábado y el domingo.",
    exampleSentenceDeBlocks: [
      { text: "Das Wochenende", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "am Samstag und am Sonntag", role: "complement", order: 3 }
    ],
    plural: "die Wochenenden"
  }, {
    de: "am Wochenende",
    pron: "am vó-jen-en-de",
    es: "el fin de semana (en el)",
    type: "Frase",
    category: "Tage",
    exampleSentenceDe: "Am Wochenende treffe ich Freunde.",
    exampleSentenceEs: "El fin de semana me encuentro con amigos.",
    exampleSentenceDeBlocks: [
      { text: "Am Wochenende", role: "subject", order: 1 },
      { text: "treffe", role: "verb_p1", order: 2 },
      { text: "ich Freunde", role: "complement", order: 3 }
    ],
    regimen: "am + dativo, fijo"
  }, {
    de: "der Feiertag",
    pron: "dea fái-a-tak",
    es: "el día festivo",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Heute ist ein Feiertag.",
    exampleSentenceEs: "Hoy es un día festivo.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Feiertag", role: "complement", order: 3 }
    ],
    plural: "die Feiertage"
  }, {
    de: "das Jahr",
    pron: "das yá-a",
    es: "el año",
    type: "Sustantivo (Neutro)",
    category: "Monate",
    exampleSentenceDe: "Das Jahr ist neu.",
    exampleSentenceEs: "El año es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das Jahr", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Jahre"
  }, {
    de: "der Monat",
    pron: "dea mó-nat",
    es: "el mes",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Dieser Monat ist lang.",
    exampleSentenceEs: "Este mes es largo.",
    exampleSentenceDeBlocks: [
      { text: "Dieser Monat", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "lang", role: "complement", order: 3 }
    ],
    plural: "die Monate"
  }, {
    de: "Januar",
    pron: "yá-nu-a-a",
    es: "enero",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Januar ist der erste Monat.",
    exampleSentenceEs: "Enero es el primer mes.",
    exampleSentenceDeBlocks: [
      { text: "Der Januar", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der erste Monat", role: "complement", order: 3 }
    ],
    plural: "die Januare"
  }, {
    de: "Februar",
    pron: "fé-bru-a",
    es: "febrero",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Februar ist ein Monat.",
    exampleSentenceEs: "Febrero es un mes.",
    exampleSentenceDeBlocks: [
      { text: "Der Februar", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Monat", role: "complement", order: 3 }
    ],
    plural: "die Februare"
  }, {
    de: "März",
    pron: "merts",
    es: "marzo",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der dritte Monat ist März.",
    exampleSentenceEs: "El tercer mes es marzo.",
    exampleSentenceDeBlocks: [
      { text: "Der", role: "subject", order: 1 },
      { text: "dritte", role: "verb_p1", order: 2 },
      { text: "Monat ist März", role: "complement", order: 3 }
    ],
    plural: "die Märze"
  }, {
    de: "April",
    pron: "a-príl",
    es: "abril",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der April ist ein Monat.",
    exampleSentenceEs: "Abril es un mes.",
    exampleSentenceDeBlocks: [
      { text: "Der April", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Monat", role: "complement", order: 3 }
    ],
    plural: "die Aprile"
  }, {
    de: "Mai",
    pron: "mái",
    es: "mayo",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Mai ist ein schöner Monat.",
    exampleSentenceEs: "Mayo es un mes bonito.",
    exampleSentenceDeBlocks: [
      { text: "Der Mai", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein schöner Monat", role: "complement", order: 3 }
    ],
    plural: "die Maie"
  }, {
    de: "Juni",
    pron: "yú-ni",
    es: "junio",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Juni ist ein schöner Monat.",
    exampleSentenceEs: "Junio es un mes bonito.",
    exampleSentenceDeBlocks: [
      { text: "Der Juni", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein schöner Monat", role: "complement", order: 3 }
    ],
    plural: "die Junis"
  }, {
    de: "Juli",
    pron: "yú-li",
    es: "julio",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Juli ist ein schöner Monat.",
    exampleSentenceEs: "Julio es un mes bonito.",
    exampleSentenceDeBlocks: [
      { text: "Der Juli", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein schöner Monat", role: "complement", order: 3 }
    ],
    plural: "die Julis"
  }, {
    de: "August",
    pron: "áu-gust",
    es: "agosto",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Monat August ist der achte Monat.",
    exampleSentenceEs: "El mes de agosto es el octavo mes.",
    exampleSentenceDeBlocks: [
      { text: "Der Monat August", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der achte Monat", role: "complement", order: 3 }
    ],
    plural: "die Auguste"
  }, {
    de: "September",
    pron: "sep-tém-bea",
    es: "septiembre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der September ist ein schöner Monat.",
    exampleSentenceEs: "Septiembre es un mes bonito.",
    exampleSentenceDeBlocks: [
      { text: "Der September", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein schöner Monat", role: "complement", order: 3 }
    ],
    plural: "die Septembers"
  }, {
    de: "Oktober",
    pron: "ok-tó-bea",
    es: "octubre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Oktober ist ein Monat.",
    exampleSentenceEs: "Octubre es un mes.",
    exampleSentenceDeBlocks: [
      { text: "Der Oktober", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Monat", role: "complement", order: 3 }
    ],
    plural: "die Oktober"
  }, {
    de: "November",
    pron: "no-fém-bea",
    es: "noviembre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Im November ist es kalt.",
    exampleSentenceEs: "En noviembre hace frío.",
    exampleSentenceDeBlocks: [
      { text: "Im November", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "es kalt", role: "complement", order: 3 }
    ],
    plural: "die November"
  }, {
    de: "Dezember",
    pron: "de-tsém-bea",
    es: "diciembre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Wir haben im Dezember Geburtstag.",
    exampleSentenceEs: "Tenemos cumpleaños en diciembre.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "haben", role: "verb_p1", order: 2 },
      { text: "im Dezember Geburtstag", role: "complement", order: 3 }
    ],
    plural: "die Dezember"
  }, {
    de: "der Frühling",
    pron: "dea frú-ling",
    es: "la primavera",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Der Frühling ist schön.",
    exampleSentenceEs: "La primavera es bonita.",
    exampleSentenceDeBlocks: [
      { text: "Der Frühling", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    plural: "die Frühlinge"
  }, {
    de: "der Sommer",
    pron: "dea só-mea",
    es: "el verano",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Ich mag den Sommer. Der Sommer ist heiß.",
    exampleSentenceEs: "Me gusta el verano. El verano es caluroso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "den Sommer", role: "complement", order: 3 }
    ],
    plural: "die Sommer"
  }, {
    de: "der Herbst",
    pron: "dea jéapst",
    es: "el otoño",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Der Herbst ist schön.",
    exampleSentenceEs: "El otoño es bonito.",
    exampleSentenceDeBlocks: [
      { text: "Der Herbst", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    plural: "die Herbste"
  }, {
    de: "der Winter",
    pron: "dea vín-tea",
    es: "el invierno",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Der Winter ist kalt.",
    exampleSentenceEs: "El invierno es frío.",
    exampleSentenceDeBlocks: [
      { text: "Der Winter", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "kalt", role: "complement", order: 3 }
    ],
    plural: "die Winter"
  }, {
    de: "der Tag",
    pron: "dea ták",
    es: "el día",
    type: "Sustantivo (Masc)",
    category: "Tageszeiten",
    exampleSentenceDe: "Der Tag ist schön.",
    exampleSentenceEs: "El día es bonito.",
    exampleSentenceDeBlocks: [
      { text: "Der Tag", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    plural: "die Tage"
  }, {
    de: "der Morgen",
    pron: "dea mór-guen",
    es: "la mañana",
    en: "small cute 3D analog wall clock showing 8:00 AM with a rising sun symbol next to it",
    type: "Sustantivo (Masc)",
    category: "Tageszeiten",
    exampleSentenceDe: "Der Morgen ist schön.",
    exampleSentenceEs: "La mañana es bonita.",
    exampleSentenceDeBlocks: [
      { text: "Der Morgen", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    plural: "die Morgen"
  }, {
    de: "der Vormittag",
    pron: "dea fóa-mi-tak",
    es: "antes del mediodía",
    en: "small cute 3D analog wall clock showing 10:00 AM with a bright morning sun symbol next to it",
    type: "Sustantivo (Masc)",
    category: "Tageszeiten",
    exampleSentenceDe: "Am Vormittag trinke ich Kaffee.",
    exampleSentenceEs: "Por la mañana, bebo café.",
    exampleSentenceDeBlocks: [
      { text: "Am Vormittag", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich Kaffee", role: "complement", order: 3 }
    ],
    plural: "die Vormittage"
  }, {
    de: "der Mittag",
    pron: "dea mí-tak",
    es: "el mediodía",
    en: "small cute 3D analog wall clock showing exactly 12:00 noon with a bright sun directly overhead",
    type: "Sustantivo (Masc)",
    category: "Tageszeiten",
    exampleSentenceDe: "Wir essen um 12 Uhr zu Mittag.",
    exampleSentenceEs: "Comemos al mediodía a las 12.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "essen", role: "verb_p1", order: 2 },
      { text: "um 12 Uhr zu Mittag", role: "complement", order: 3 }
    ],
    plural: "die Mittage"
  }, {
    de: "der Nachmittag",
    pron: "dea náj-mi-tak",
    es: "la tarde",
    en: "small cute 3D analog wall clock showing 4:00 PM with a setting sun symbol next to it",
    type: "Sustantivo (Masc)",
    category: "Tageszeiten",
    exampleSentenceDe: "Am Nachmittag trinke ich Kaffee.",
    exampleSentenceEs: "Por la tarde tomo café.",
    exampleSentenceDeBlocks: [
      { text: "Am Nachmittag", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich Kaffee", role: "complement", order: 3 }
    ],
    plural: "die Nachmittage"
  }, {
    de: "der Abend",
    pron: "dea á-bent",
    es: "el atardecer / noche",
    en: "small cute 3D analog wall clock showing 8:00 PM with a crescent moon symbol next to it",
    type: "Sustantivo (Masc)",
    category: "Tageszeiten",
    exampleSentenceDe: "Der Abend ist schön.",
    exampleSentenceEs: "La noche es bonita.",
    exampleSentenceDeBlocks: [
      { text: "Der Abend", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    plural: "die Abende"
  }, {
    de: "die Nacht",
    pron: "di-nájt",
    es: "la noche profunda",
    en: "small cute 3D analog wall clock showing 12:00 midnight with stars and a moon symbol next to it",
    type: "Sustantivo (Fem)",
    category: "Tageszeiten",
    exampleSentenceDe: "Die Nacht ist lang.",
    exampleSentenceEs: "La noche es larga.",
    exampleSentenceDeBlocks: [
      { text: "Die Nacht", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "lang", role: "complement", order: 3 }
    ],
    plural: "die Nächte"
  }, {
    de: "am Morgen",
    pron: "am mór-guen",
    es: "por la mañana",
    en: "small cute 3D analog wall clock showing 8:00 AM with a rising sun symbol next to it",
    type: "Frase",
    category: "Tageszeiten",
    exampleSentenceDe: "Ich trinke Kaffee am Morgen.",
    exampleSentenceEs: "Bebo café por la mañana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "Kaffee am Morgen", role: "complement", order: 3 }
    ],
    regimen: "Fijo: am + Dativ"
  }, {
    de: "am Vormittag",
    pron: "am fóa-mi-tak",
    es: "por la mañana (tarde)",
    en: "small cute 3D analog wall clock showing 10:00 AM with a bright morning sun symbol next to it",
    type: "Frase",
    category: "Tageszeiten",
    exampleSentenceDe: "Ich esse am Vormittag.",
    exampleSentenceEs: "Yo como por la mañana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "am Vormittag", role: "complement", order: 3 }
    ],
    regimen: "am + Dativo"
  }, {
    de: "am Mittag",
    pron: "am mí-tak",
    es: "al mediodía",
    en: "small cute 3D analog wall clock showing exactly 12:00 noon with a bright sun directly overhead",
    type: "Frase",
    category: "Tageszeiten",
    exampleSentenceDe: "Ich esse am Mittag.",
    exampleSentenceEs: "Yo como al mediodía.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "am Mittag", role: "complement", order: 3 }
    ],
    regimen: "am + Tageszeit"
  }, {
    de: "am Nachmittag",
    pron: "am náj-mi-tak",
    es: "por la tarde",
    en: "small cute 3D analog wall clock showing 4:00 PM with a setting sun symbol next to it",
    type: "Frase",
    category: "Tageszeiten",
    exampleSentenceDe: "Am Nachmittag trinke ich Kaffee.",
    exampleSentenceEs: "Por la tarde bebo café.",
    exampleSentenceDeBlocks: [
      { text: "Am Nachmittag", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich Kaffee", role: "complement", order: 3 }
    ],
    regimen: "am + Tageszeit"
  }, {
    de: "am Abend",
    pron: "am á-bent",
    es: "por el atardecer",
    en: "small cute 3D analog wall clock showing 8:00 PM with a crescent moon symbol next to it",
    type: "Frase",
    category: "Tageszeiten",
    exampleSentenceDe: "Am Abend esse ich.",
    exampleSentenceEs: "Por la tarde como.",
    exampleSentenceDeBlocks: [
      { text: "Am Abend", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "ich", role: "complement", order: 3 }
    ],
    regimen: "Fijo: am + Tageszeit"
  }, {
    de: "in der Nacht",
    pron: "in-dea-nájt",
    es: "en la noche",
    en: "small cute 3D analog wall clock showing 12:00 midnight with stars and a moon symbol next to it",
    type: "Frase",
    category: "Tageszeiten",
    exampleSentenceDe: "Ich schlafe in der Nacht.",
    exampleSentenceEs: "Yo duermo en la noche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schlafe", role: "verb_p1", order: 2 },
      { text: "in der Nacht", role: "complement", order: 3 }
    ],
    regimen: "Dat. + in/an/bei"
  }, {
    de: "die Uhrzeit",
    pron: "di ú-a-tsait",
    es: "la hora",
    type: "Sustantivo (Fem)",
    category: "Uhrzeit",
    exampleSentenceDe: "Ich habe die Uhrzeit nicht.",
    exampleSentenceEs: "No tengo la hora.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Uhrzeit nicht", role: "complement", order: 3 }
    ],
    plural: "die Uhrzeiten"
  }, {
    de: "Wann?",
    pron: "van",
    es: "¿Cuándo?",
    type: "Pregunta",
    category: "Uhrzeit",
    exampleSentenceDe: "Wann kommst du?",
    exampleSentenceEs: "¿Cuándo vienes?",
    exampleSentenceDeBlocks: [
      { text: "Wann", role: "subject", order: 1 },
      { text: "kommst", role: "verb_p1", order: 2 },
      { text: "du", role: "complement", order: 3 }
    ],
    regimen: "Pron. interrogativo tiempo"
  }, {
    de: "Wie spät ist es?",
    pron: "vi shpét ist es",
    es: "¿Qué hora es?",
    type: "Pregunta",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist zehn Uhr.",
    exampleSentenceEs: "Son las diez en punto.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "zehn Uhr", role: "complement", order: 3 }
    ],
    regimen: "Fijo"
  }, {
    de: "Wie viel Uhr ist es?",
    pron: "ví fíl ú-a ist es",
    es: "¿Qué hora es? (formal)",
    type: "Pregunta",
    category: "Uhrzeit",
    exampleSentenceDe: "Ich habe eine Frage. Wie viel Uhr ist es?",
    exampleSentenceEs: "Tengo una pregunta. ¿Qué hora es?",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Frage", role: "complement", order: 3 }
    ],
    regimen: "Fijo, hora"
  }, {
    de: "ein Uhr",
    pron: "áin ú-a",
    es: "la una",
    type: "Hora",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist ein Uhr.",
    exampleSentenceEs: "Es la una en punto.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Uhr", role: "complement", order: 3 }
    ],
    regimen: "Es ist ein Uhr"
  }, {
    de: "halb zwei",
    pron: "jalp-tsvái",
    es: "la una y media",
    type: "Hora",
    category: "Uhrzeit",
    exampleSentenceDe: "Der Zug fährt um halb zwei.",
    exampleSentenceEs: "El tren sale a la una y media.",
    exampleSentenceDeBlocks: [
      { text: "Der Zug", role: "subject", order: 1 },
      { text: "fährt", role: "verb_p1", order: 2 },
      { text: "um halb zwei", role: "complement", order: 3 }
    ],
    regimen: "Media hora antes"
  }, {
    de: "Viertel vor drei",
    pron: "fía-tel foa dray",
    es: "tres menos cuarto",
    type: "Hora",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist Viertel vor drei.",
    exampleSentenceEs: "Son las tres menos cuarto.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Viertel vor drei", role: "complement", order: 3 }
    ],
    regimen: "Formal, hora exacta"
  }, {
    de: "kurz vor 4",
    pron: "kurts foa fía",
    es: "poco antes de las 4",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Wir treffen uns kurz vor 4.",
    exampleSentenceEs: "Nos encontramos poco antes de las 4.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "treffen", role: "verb_p1", order: 2 },
      { text: "uns kurz vor 4", role: "complement", order: 3 }
    ],
    regimen: "Fijo: hora"
  }, {
    de: "gleich 4",
    pron: "gláij fí-a",
    es: "casi las 4",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist gleich vier Uhr.",
    exampleSentenceEs: "Son casi las cuatro.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gleich vier Uhr", role: "complement", order: 3 }
    ],
    regimen: "Fijo"
  }, {
    de: "genau 4 Uhr",
    pron: "gue-náu fía ú-a",
    es: "exactamente las 4",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Wir treffen uns um genau 4 Uhr.",
    exampleSentenceEs: "Nos vemos exactamente a las 4.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "treffen", role: "verb_p1", order: 2 },
      { text: "uns um genau 4 Uhr", role: "complement", order: 3 }
    ],
    regimen: "Uhrzeit fija"
  }, {
    de: "fünf nach 4",
    pron: "fünf-naj-fí-a",
    es: "cuatro y cinco",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist fünf nach vier.",
    exampleSentenceEs: "Son las cuatro y cinco.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "fünf nach vier", role: "complement", order: 3 }
    ],
    regimen: "nach + dat."
  }, {
    de: "um 3 Uhr",
    pron: "um dráy ú-a",
    es: "a las 3",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Ich komme um 3 Uhr.",
    exampleSentenceEs: "Vengo a las 3.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "komme", role: "verb_p1", order: 2 },
      { text: "um 3 Uhr", role: "complement", order: 3 }
    ],
    regimen: "um + hora"
  }, {
    de: "von 2 bis 3 Uhr",
    pron: "fon tsvái bis dray ú-a",
    es: "de 2 a 3",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Der Kurs ist von 2 bis 3 Uhr.",
    exampleSentenceEs: "El curso es de 2 a 3.",
    exampleSentenceDeBlocks: [
      { text: "Der Kurs", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "von 2 bis 3 Uhr", role: "complement", order: 3 }
    ],
    regimen: "von + dat."
  }, {
    de: "ab 3 Uhr",
    pron: "ap-drái-ú-a",
    es: "a partir de las 3",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Wir essen ab 3 Uhr.",
    exampleSentenceEs: "Comemos a partir de las 3.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "essen", role: "verb_p1", order: 2 },
      { text: "ab 3 Uhr", role: "complement", order: 3 }
    ],
    regimen: "ab + dativo"
  }, {
    de: "anfangen",
    pron: "án-fan-guen",
    es: "empezar / comenzar",
    type: "Verbo",
    category: "Alltag",
    exampleSentenceDe: "Wir fangen jetzt an.",
    exampleSentenceEs: "Empezamos ahora.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "fangen", role: "verb_p1", order: 2 },
      { text: "jetzt", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (an-)"
  }, {
    de: "der Anfang",
    pron: "dea án-fang",
    es: "el comienzo",
    type: "Sustantivo (Masc)",
    category: "Alltag",
    exampleSentenceDe: "Der Anfang ist gut.",
    exampleSentenceEs: "El comienzo es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Der Anfang", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Anfänge"
  }, {
    de: "aufhören",
    pron: "áuf-jö-ren",
    es: "terminar / cesar",
    type: "Verbo",
    category: "Alltag",
    exampleSentenceDe: "Bitte, hören Sie auf. Ich möchte schlafen.",
    exampleSentenceEs: "Por favor, para. Quiero dormir.",
    exampleSentenceDeBlocks: [
      { text: "Bitte,", role: "subject", order: 1 },
      { text: "hören", role: "verb_p1", order: 2 },
      { text: "Sie", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (auf-)"
  }, {
    de: "das Ende",
    pron: "das én-de",
    es: "el final",
    type: "Sustantivo (Neutro)",
    category: "Alltag",
    exampleSentenceDe: "Der Film ist zu Ende.",
    exampleSentenceEs: "La película ha terminado.",
    exampleSentenceDeBlocks: [
      { text: "Der Film", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "zu Ende", role: "complement", order: 3 }
    ],
    plural: "die Enden"
  }, {
    de: "dauern",
    pron: "dáu-ean",
    es: "durar",
    type: "Verbo",
    category: "Alltag",
    exampleSentenceDe: "Die Reise dauert zwei Stunden.",
    exampleSentenceEs: "El viaje dura dos horas.",
    exampleSentenceDeBlocks: [
      { text: "Die Reise", role: "subject", order: 1 },
      { text: "dauert", role: "verb_p1", order: 2 },
      { text: "zwei Stunden", role: "complement", order: 3 }
    ],
    regimen: "Duración"
  }, {
    de: "der Alltag",
    pron: "dea ál-tak",
    es: "el día a día / rutina",
    type: "Sustantivo",
    category: "Alltag",
    exampleSentenceDe: "Der Alltag ist normal.",
    exampleSentenceEs: "El día a día es normal.",
    exampleSentenceDeBlocks: [
      { text: "Der Alltag", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "normal", role: "complement", order: 3 }
    ],
    plural: "die Alltage"
  }, {
    de: "pünktlich",
    pron: "púnkt-lij",
    es: "puntual",
    type: "Adjetivo",
    category: "Alltag",
    exampleSentenceDe: "Der Zug ist pünktlich.",
    exampleSentenceEs: "El tren es puntual.",
    exampleSentenceDeBlocks: [
      { text: "Der Zug", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "pünktlich", role: "complement", order: 3 }
    ],
    regimen: "≠ unpünktlich"
  }, {
    de: "die Verspätung",
    pron: "di fea-shpé-tung",
    es: "el retraso",
    type: "Sustantivo",
    category: "Alltag",
    exampleSentenceDe: "Ich habe die Verspätung.",
    exampleSentenceEs: "Tengo el retraso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Verspätung", role: "complement", order: 3 }
    ],
    plural: "die Verspätungen"
  }, {
    de: "regelmäßig",
    pron: "ré-guel-mé-sij",
    es: "regularmente",
    type: "Adverbio",
    category: "Alltag",
    exampleSentenceDe: "Ich trinke Wasser regelmäßig.",
    exampleSentenceEs: "Bebo agua regularmente.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "Wasser regelmäßig", role: "complement", order: 3 }
    ],
    regimen: "Frecuencia"
  },
  {
    "de": "anfangs",
    "pron": "án-fangs",
    "es": "al principio / inicialmente",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Anfangs war die deutsche Grammatik schwer für mich.",
    "exampleSentenceEs": "Al principio la gramática alemana era difícil para mí.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Anfangs",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die deutsche Grammatik schwer für mich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "halbtags",
    "pron": "jálp-taks",
    "es": "a media jornada / medio tiempo",
    "type": "Adverbio",
    "category": "Alltag",
    "level": "B1",
    "regimen": "Laboral",
    "exampleSentenceDe": "Meine Frau arbeitet zurzeit halbtags.",
    "exampleSentenceEs": "Mi esposa trabaja actualmente a media jornada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Frau",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zurzeit halbtags",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "häufig",
    "pron": "jói-fij",
    "es": "frecuente / a menudo",
    "type": "Adjetivo / Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Comp: häufiger",
    "exampleSentenceDe": "Dieser Zug hat leider häufig Verspätung.",
    "exampleSentenceEs": "Lamentablemente este tren tiene retraso con frecuencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieser Zug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider häufig Verspätung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kalender",
    "pron": "dea ka-lén-da",
    "es": "el calendario / agenda",
    "type": "Sustantivo (Masc)",
    "category": "Zeitangaben",
    "level": "A2",
    "plural": "die Kalender",
    "en": "a cute 3D isometric UI icon of a colorful spiral desk calendar",
    "exampleSentenceDe": "Ich trage den Termin sofort in meinen Kalender ein.",
    "exampleSentenceEs": "Anoto la cita inmediatamente en mi calendario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trage",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Termin sofort in meinen Kalender",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "lang(e)",
    "pron": "lán-gue",
    "es": "mucho tiempo / largo",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "A1–B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Wie lange dauert der Deutschkurs noch?",
    "exampleSentenceEs": "¿Cuánto tiempo dura todavía el curso de alemán?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie lange",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dauert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Deutschkurs noch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "längst",
    "pron": "lengst",
    "es": "desde hace mucho / ya hace tiempo",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Der Bus ist längst abgefahren.",
    "exampleSentenceEs": "El autobús salió ya hace mucho tiempo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Bus",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "längst",
        "role": "complement",
        "order": 3
      },
      {
        "text": "abgefahren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Mal",
    "pron": "das mal",
    "es": "la vez / ocasión",
    "type": "Sustantivo (Neutro)",
    "category": "Zeitangaben",
    "level": "A2–B1",
    "plural": "die Male",
    "exampleSentenceDe": "Das ist das erste Mal, dass ich in Berlin bin.",
    "exampleSentenceEs": "Es la primera vez que estoy en Berlín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das erste Mal, dass ich in Berlin",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bin",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "Ostern",
    "pron": "ós-tern",
    "es": "Pascua / Semana Santa",
    "type": "Sustantivo (Plural/Neutro)",
    "category": "Feiertage",
    "level": "A1",
    "regimen": "Sin artículo en uso general",
    "exampleSentenceDe": "An Ostern besuchen wir unsere Großeltern.",
    "exampleSentenceEs": "En Semana Santa visitamos a nuestros abuelos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An Ostern",
        "role": "subject",
        "order": 1
      },
      {
        "text": "besuchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir unsere Großeltern",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Stunde",
    "pron": "di shtún-de",
    "es": "la hora (duración) / clase",
    "type": "Sustantivo (Fem)",
    "category": "Zeitangaben",
    "level": "A1–B1",
    "plural": "die Stunden",
    "exampleSentenceDe": "Der Unterricht dauert heute zwei Stunden.",
    "exampleSentenceEs": "La clase dura hoy dos horas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Unterricht",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dauert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute zwei Stunden",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Tagesablauf",
    "pron": "dea tá-gues-ap-lauf",
    "es": "la rutina diaria / agenda del día",
    "type": "Sustantivo (Masc)",
    "category": "Alltag",
    "level": "B1",
    "plural": "die Tagesabläufe",
    "exampleSentenceDe": "Beschreiben Sie bitte Ihren normalen Tagesablauf!",
    "exampleSentenceEs": "Por favor, describa su rutina diaria normal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Beschreiben",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte Ihren normalen Tagesablauf",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Neujahr",
    "pron": "nói-yar",
    "es": "Año Nuevo",
    "type": "Sustantivo (Neutro)",
    "category": "Feiertage",
    "level": "A2–B1",
    "regimen": "Sin artículo en general",
    "exampleSentenceDe": "An Neujahr haben alle Geschäfte geschlossen.",
    "exampleSentenceEs": "En Año Nuevo todas las tiendas están cerradas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An Neujahr",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle Geschäfte",
        "role": "subject",
        "order": 3
      },
      {
        "text": "geschlossen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "Pfingsten",
    "pron": "pfíngs-ten",
    "es": "Pentecostés",
    "type": "Sustantivo (Plural/Neutro)",
    "category": "Feiertage",
    "level": "B1",
    "regimen": "Festivo oficial D/A/CH",
    "exampleSentenceDe": "An Pfingsten machen wir einen Kurzurlaub.",
    "exampleSentenceEs": "En Pentecostés hacemos una escapada corta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An Pfingsten",
        "role": "complement",
        "order": 1
      },
      {
        "text": "machen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "einen Kurzurlaub",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "Weihnachten",
    "pron": "vái-naj-ten",
    "es": "Navidad",
    "type": "Sustantivo (Plural/Neutro)",
    "category": "Feiertage",
    "level": "A1–B1",
    "regimen": "An/Zu Weihnachten",
    "exampleSentenceDe": "An Weihnachten besucht uns die ganze Familie.",
    "exampleSentenceEs": "En Navidad nos visita toda la familia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An Weihnachten",
        "role": "complement",
        "order": 1
      },
      {
        "text": "besucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns",
        "role": "complement",
        "order": 3
      },
      {
        "text": "die ganze Familie",
        "role": "subject",
        "order": 4
      }
    ]
  },
  {
    "de": "Silvester",
    "pron": "zil-vés-ta",
    "es": "Nochevieja",
    "type": "Sustantivo (Neutro/Masc)",
    "category": "Feiertage",
    "level": "A2–B1",
    "regimen": "An Silvester",
    "exampleSentenceDe": "An Silvester feiern wir bis nach Mitternacht.",
    "exampleSentenceEs": "En Nochevieja celebramos hasta pasada la medianoche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An Silvester",
        "role": "complement",
        "order": 1
      },
      {
        "text": "feiern",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "bis nach Mitternacht",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Nationalfeiertag",
    "pron": "dea na-tsio-nál-fai-a-tak",
    "es": "el día de la fiesta nacional",
    "type": "Sustantivo (Masc)",
    "category": "Feiertage",
    "level": "B1",
    "plural": "die Nationalfeiertage",
    "exampleSentenceDe": "Der dritte Oktober ist der deutsche Nationalfeiertag.",
    "exampleSentenceEs": "El tres de octubre es la fiesta nacional alemana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der dritte Oktober",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der deutsche Nationalfeiertag",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Frühjahr",
    "pron": "das frǘ-yar",
    "es": "la primavera",
    "type": "Sustantivo (Neutro)",
    "category": "Jahreszeiten",
    "level": "B1",
    "plural": "die Frühjahre",
    "exampleSentenceDe": "Im Frühjahr beginnen wir mit dem neuen Projekt.",
    "exampleSentenceEs": "En primavera comenzamos con el nuevo proyecto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Frühjahr",
        "role": "complement",
        "order": 1
      },
      {
        "text": "beginnen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mit dem neuen Projekt",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Jänner (A)",
    "pron": "dea yé-na",
    "es": "enero (variante austriaca)",
    "type": "Sustantivo (Masc)",
    "category": "Monate",
    "level": "B1",
    "regimen": "D, CH: der Januar",
    "exampleSentenceDe": "In Österreich sagt man Jänner statt Januar.",
    "exampleSentenceEs": "En Austria se dice Jänner en lugar de Januar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Österreich",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sagt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Jänner statt Januar",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "tagsüber",
    "pron": "táks-ü-ba",
    "es": "durante el día",
    "type": "Adverbio",
    "category": "Tageszeiten",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Tagsüber arbeite ich auf der Baustelle.",
    "exampleSentenceEs": "Durante el día trabajo en la obra.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Tagsüber",
        "role": "complement",
        "order": 1
      },
      {
        "text": "arbeite",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "auf der Baustelle",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Mitternacht",
    "pron": "di mí-ta-najt",
    "es": "la medianoche",
    "type": "Sustantivo (Fem)",
    "category": "Tageszeiten",
    "level": "A2–B1",
    "regimen": "um Mitternacht",
    "exampleSentenceDe": "Der letzte Zug fährt genau um Mitternacht ab.",
    "exampleSentenceEs": "El último tren sale exactamente a medianoche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der letzte Zug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "genau um Mitternacht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ab",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "werktags",
    "pron": "vérk-taks",
    "es": "los días laborables",
    "type": "Adverbio",
    "category": "Wochentage",
    "level": "B1",
    "regimen": "Antónimo: sonntags",
    "exampleSentenceDe": "Werktags öffnet die Bank schon um acht Uhr.",
    "exampleSentenceEs": "Los días laborables el banco abre ya a las ocho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Werktags",
        "role": "complement",
        "order": 1
      },
      {
        "text": "öffnet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Bank",
        "role": "subject",
        "order": 3
      },
      {
        "text": "schon um acht Uhr",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Sonnabend (D)",
    "pron": "dea zón-a-bent",
    "es": "el sábado (norte/este de Alemania)",
    "type": "Sustantivo (Masc)",
    "category": "Wochentage",
    "level": "B1",
    "plural": "die Sonnabende",
    "exampleSentenceDe": "In Norddeutschland sagt man oft Sonnabend.",
    "exampleSentenceEs": "En el norte de Alemania se dice a menudo Sonnabend.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Norddeutschland",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sagt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft Sonnabend",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "stündlich",
    "pron": "shtǘnt-lij",
    "es": "cada hora / por hora",
    "type": "Adjetivo / Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Die Regionalbahn fährt stündlich nach Hannover.",
    "exampleSentenceEs": "El tren regional sale cada hora hacia Hannover.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Regionalbahn",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "stündlich nach Hannover",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "wöchentlich",
    "pron": "vö́-jent-lij",
    "es": "semanal / semanalmente",
    "type": "Adjetivo / Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Wir haben wöchentlich eine Teambesprechung.",
    "exampleSentenceEs": "Tenemos semanalmente una reunión de equipo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wöchentlich eine Teambesprechung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "monatlich",
    "pron": "mó-nat-lij",
    "es": "mensual / mensualmente",
    "type": "Adjetivo / Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Die Miete wird monatlich überwiesen.",
    "exampleSentenceEs": "El alquiler se transfiere mensualmente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Miete",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wird",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "monatlich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "überwiesen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "jährlich",
    "pron": "yér-lij",
    "es": "anual / anualmente",
    "type": "Adjetivo / Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Die Versicherung kostet sechzig Euro jährlich.",
    "exampleSentenceEs": "El seguro cuesta sesenta euros anuales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Versicherung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kostet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sechzig Euro jährlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Jahrzehnt",
    "pron": "das yár-tsent",
    "es": "la década / decenio",
    "type": "Sustantivo (Neutro)",
    "category": "Zeitangaben",
    "level": "B1",
    "plural": "die Jahrzehnte",
    "exampleSentenceDe": "In den letzten Jahrzehnten hat sich die Technik geändert.",
    "exampleSentenceEs": "En las últimas décadas la técnica ha cambiado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In den letzten Jahrzehnten",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "die Technik",
        "role": "subject",
        "order": 4
      },
      {
        "text": "geändert",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "das Jahrtausend",
    "pron": "das yár-tau-zent",
    "es": "el milenio",
    "type": "Sustantivo (Neutro)",
    "category": "Zeitangaben",
    "level": "B1",
    "plural": "die Jahrtausende",
    "exampleSentenceDe": "Dieses Gebäude ist über ein Jahrtausend alt.",
    "exampleSentenceEs": "Este edificio tiene más de un milenio de antigüedad.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Gebäude",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über ein Jahrtausend alt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bisher",
    "pron": "bis-jér",
    "es": "hasta ahora / hasta el momento",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Bisher hat alles bei der Anmeldung gut geklappt.",
    "exampleSentenceEs": "Hasta ahora todo ha funcionado bien en el registro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bisher",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alles",
        "role": "subject",
        "order": 3
      },
      {
        "text": "bei der Anmeldung gut",
        "role": "complement",
        "order": 4
      },
      {
        "text": "geklappt",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Dauer",
    "pron": "di dáu-a",
    "es": "la duración",
    "type": "Sustantivo (Fem)",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "auf Dauer",
    "exampleSentenceDe": "Sie können das Buch für die Dauer einer Woche leihen.",
    "exampleSentenceEs": "Puede tomar prestado el libro por la duración de una semana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "können",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Buch für die Dauer einer Woche",
        "role": "complement",
        "order": 3
      },
      {
        "text": "leihen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "dauernd",
    "pron": "dáu-ernt",
    "es": "continuamente / sin parar",
    "type": "Adjetivo / Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Comp: dauernder",
    "exampleSentenceDe": "Mein Kollege ist leider dauernd erkältet.",
    "exampleSentenceEs": "Lamentablemente mi compañero está resfriado continuamente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Kollege",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider dauernd erkältet",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Sekunde",
    "pron": "di ze-kún-de",
    "es": "el segundo (tiempo)",
    "type": "Sustantivo (Fem)",
    "category": "Zeitangaben",
    "level": "A1–B1",
    "plural": "die Sekunden",
    "exampleSentenceDe": "Bitte warten Sie eine Sekunde.",
    "exampleSentenceEs": "Por favor, espere un segundo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "warten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Sekunde",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "spätestens",
    "pron": "shpé-tes-tens",
    "es": "a más tardar",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Graduador temporal",
    "exampleSentenceDe": "Ich muss spätestens um neun Uhr dort sein.",
    "exampleSentenceEs": "Tengo que estar allí a más tardar a las nueve.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "spätestens um neun Uhr dort",
        "role": "complement",
        "order": 3
      },
      {
        "text": "sein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "täglich",
    "pron": "ték-lij",
    "es": "a diario / diariamente",
    "type": "Adjetivo / Adverbio",
    "category": "Zeitangaben",
    "level": "A1–B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Trinken Sie täglich zwei Liter Wasser.",
    "exampleSentenceEs": "Beba diariamente dos litros de agua.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Trinken",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "täglich zwei Liter Wasser",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "übermorgen",
    "pron": "ǘ-ba-mor-guen",
    "es": "pasado mañana",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "A1–B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Wir sehen uns übermorgen in der Schule.",
    "exampleSentenceEs": "Nos vemos pasado mañana en la escuela.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns übermorgen in der Schule",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "verbringen",
    "pron": "fea-brín-guen",
    "es": "pasar (el tiempo)",
    "type": "Verbo inseparable irr.",
    "category": "Zeitangaben",
    "level": "A2–B1",
    "regimen": "+ Akk / verbringt, verbrachte, hat verbracht",
    "exampleSentenceDe": "Wie haben Sie Ihren Urlaub verbracht?",
    "exampleSentenceEs": "¿Cómo ha pasado sus vacaciones?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Ihren Urlaub",
        "role": "complement",
        "order": 4
      },
      {
        "text": "verbracht",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Vergangenheit",
    "pron": "di fea-gán-guen-jait",
    "es": "el pasado",
    "type": "Sustantivo (Fem)",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "In der Vergangenheit war das oft anders.",
    "exampleSentenceEs": "En el pasado eso a menudo era diferente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Vergangenheit",
        "role": "complement",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft anders",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "vorgestern",
    "pron": "fór-gues-tern",
    "es": "anteayer",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Er hat mich schon vorgestern angerufen.",
    "exampleSentenceEs": "Él ya me llamó anteayer.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich schon vorgestern",
        "role": "complement",
        "order": 3
      },
      {
        "text": "angerufen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "vorhin",
    "pron": "fór-jin",
    "es": "hace un rato / antes",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Vorhin hat deine Mutter angerufen.",
    "exampleSentenceEs": "Hace un rato llamó tu madre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vorhin",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "deine Mutter",
        "role": "subject",
        "order": 3
      },
      {
        "text": "angerufen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Zukunft",
    "pron": "di tsú-kunft",
    "es": "el futuro",
    "type": "Sustantivo (Fem)",
    "category": "Zeitangaben",
    "level": "A2–B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Denk an die Zukunft und lerne Deutsch.",
    "exampleSentenceEs": "Piensa en el futuro y aprende alemán.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Denk",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "an die Zukunft und",
        "role": "complement",
        "order": 2
      },
      {
        "text": "lerne",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "Deutsch",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "zuletzt",
    "pron": "tsu-létst",
    "es": "por último / últimamente",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Wir haben uns vor drei Jahren zuletzt gesehen.",
    "exampleSentenceEs": "Nos vimos por última vez hace tres años.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns vor drei Jahren zuletzt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gesehen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "zunächst",
    "pron": "tsu-néjst",
    "es": "primero / ante todo",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Zunächst möchte ich alle Gäste begrüßen.",
    "exampleSentenceEs": "Primero quisiera saludar a todos los invitados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zunächst",
        "role": "complement",
        "order": 1
      },
      {
        "text": "möchte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "alle Gäste",
        "role": "complement",
        "order": 4
      },
      {
        "text": "begrüßen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "zurzeit",
    "pron": "tsur-tsáit",
    "es": "actualmente / de momento",
    "type": "Adverbio",
    "category": "Zeitangaben",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Zurzeit habe ich auf der Arbeit viel zu tun.",
    "exampleSentenceEs": "Actualmente tengo mucho que hacer en el trabajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zurzeit",
        "role": "complement",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "auf der Arbeit viel",
        "role": "complement",
        "order": 4
      },
      {
        "text": "zu tun",
        "role": "verb_p2",
        "order": 5
      }
    ]
  }
]
},
{
  id: 3,
  title: "Kapitel 3: Personen & Kontakte",
  icon: <BookOpen size={20} />,
  emoji: "👤",
  words: [{
    de: "der Vorname",
    pron: "dea fóa-ná-me",
    es: "primer nombre",
    type: "Sustantivo (Masc)",
    category: "Identität",
    exampleSentenceDe: "Wie ist Ihr Vorname?",
    exampleSentenceEs: "¿Cuál es su primer nombre?",
    exampleSentenceDeBlocks: [
      { text: "Wie", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Ihr Vorname", role: "complement", order: 3 }
    ],
    plural: "die Vornamen"
  }, {
    de: "der Nachname",
    pron: "dea nách-ná-me",
    es: "apellido",
    type: "Sustantivo (Masc)",
    category: "Identität",
    exampleSentenceDe: "Mein Nachname ist Müller.",
    exampleSentenceEs: "Mi apellido es Müller.",
    exampleSentenceDeBlocks: [
      { text: "Mein Nachname", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Müller", role: "complement", order: 3 }
    ],
    plural: "die Nachnamen"
  }, {
    de: "heißen",
    pron: "jái-sen",
    es: "llamarse",
    type: "Verbo",
    category: "Identität",
    exampleSentenceDe: "Ich heiße Maria.",
    exampleSentenceEs: "Yo me llamo María.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "heiße", role: "verb_p1", order: 2 },
      { text: "Maria", role: "complement", order: 3 }
    ],
    regimen: "+ Nominativo"
  }, {
    de: "buchstabieren",
    pron: "buj-shta-bí-ren",
    es: "deletrear",
    type: "Verbo",
    category: "Identität",
    exampleSentenceDe: "Können Sie das bitte buchstabieren?",
    exampleSentenceEs: "¿Puede deletrear eso, por favor?",
    exampleSentenceDeBlocks: [
      { text: "Können", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "das bitte", role: "complement", order: 3 },
      { text: "buchstabieren", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "die Frau",
    pron: "di frau",
    es: "la mujer / señora",
    type: "Sustantivo (Fem)",
    category: "Personen",
    exampleSentenceDe: "Die Frau ist nett.",
    exampleSentenceEs: "La mujer es simpática.",
    exampleSentenceDeBlocks: [
      { text: "Die Frau", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nett", role: "complement", order: 3 }
    ],
    plural: "die Frauen"
  }, {
    de: "der Mann",
    pron: "dea man",
    es: "el hombre / marido",
    type: "Sustantivo (Masc)",
    category: "Personen",
    exampleSentenceDe: "Der Mann ist nett.",
    exampleSentenceEs: "El hombre es simpático.",
    exampleSentenceDeBlocks: [
      { text: "Der Mann", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nett", role: "complement", order: 3 }
    ],
    plural: "die Männer"
  }, {
    de: "die Dame",
    pron: "di dá-me",
    es: "la dama",
    type: "Sustantivo (Fem)",
    category: "Personen",
    exampleSentenceDe: "Hier ist die Dame. Die Dame ist nett.",
    exampleSentenceEs: "Aquí está la dama. La dama es simpática.",
    exampleSentenceDeBlocks: [
      { text: "Hier", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Dame", role: "complement", order: 3 }
    ],
    plural: "die Damen"
  }, {
    de: "der Herr",
    pron: "dea hea",
    es: "el señor",
    type: "Sustantivo (Masc)",
    category: "Personen",
    exampleSentenceDe: "Guten Tag, Herr Müller.",
    exampleSentenceEs: "Buenos días, señor Müller.",
    exampleSentenceDeBlocks: [
      { text: "Guten", role: "subject", order: 1 },
      { text: "Tag,", role: "verb_p1", order: 2 },
      { text: "Herr Müller", role: "complement", order: 3 }
    ],
    plural: "die Herren"
  }, {
    de: "männlich / weiblich",
    pron: "mén-lij  vái-blij",
    es: "masculino / femenino",
    type: "Adjetivo",
    category: "Personen",
    exampleSentenceDe: "Ich bin männlich.",
    exampleSentenceEs: "Yo soy masculino.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "männlich", role: "complement", order: 3 }
    ],
    regimen: "≠ weiblich / männlich"
  }, {
    de: "das Mädchen",
    pron: "das mét-jen",
    es: "la niña",
    type: "Sustantivo (Neutro)",
    category: "Personen",
    exampleSentenceDe: "Das Mädchen ist klein.",
    exampleSentenceEs: "La niña es pequeña.",
    exampleSentenceDeBlocks: [
      { text: "Das Mädchen", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "klein", role: "complement", order: 3 }
    ],
    plural: "die Mädchen"
  }, {
    de: "der Junge",
    pron: "dea yún-gue",
    es: "el niño",
    en: "cute 3D avatar of a young little boy character smiling",
    type: "Sustantivo (Masc)",
    category: "Personen",
    exampleSentenceDe: "Der Junge ist klein.",
    exampleSentenceEs: "El niño es pequeño.",
    exampleSentenceDeBlocks: [
      { text: "Der Junge", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "klein", role: "complement", order: 3 }
    ],
    plural: "die Jungen"
  }, {
    de: "die Adresse",
    pron: "di a-drés-se",
    es: "la dirección",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Das ist die Adresse.",
    exampleSentenceEs: "Esta es la dirección.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Adresse", role: "complement", order: 3 }
    ],
    plural: "die Adressen"
  }, {
    de: "der Wohnort",
    pron: "dea vón-ort",
    es: "lugar de residencia",
    type: "Sustantivo (Masc)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Mein Wohnort ist Berlin.",
    exampleSentenceEs: "Mi lugar de residencia es Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Mein Wohnort", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Berlin", role: "complement", order: 3 }
    ],
    plural: "die Wohnorte"
  }, {
    de: "wohnen / leben",
    pron: "vó-nen  lé-ben",
    es: "vivir / residir",
    type: "Verbo",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich wohne in Berlin.",
    exampleSentenceEs: "Yo vivo en Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "in Berlin", role: "complement", order: 3 }
    ],
    regimen: "wohnen+in/Dat"
  }, {
    de: "die Straße",
    pron: "di shtrá-se",
    es: "la calle",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Die Straße ist lang.",
    exampleSentenceEs: "La calle es larga.",
    exampleSentenceDeBlocks: [
      { text: "Die Straße", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "lang", role: "complement", order: 3 }
    ],
    plural: "die Straßen"
  }, {
    de: "der Platz",
    pron: "dea plats",
    es: "la plaza",
    type: "Sustantivo (Masc)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich sitze auf dem Platz.",
    exampleSentenceEs: "Yo estoy sentado en la plaza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sitze", role: "verb_p1", order: 2 },
      { text: "auf dem Platz", role: "complement", order: 3 }
    ],
    plural: "die Plätze"
  }, {
    de: "die Nummer",
    pron: "di nú-mea",
    es: "el número / de casa",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich habe die Nummer. Die Nummer ist eins.",
    exampleSentenceEs: "Tengo el número. El número es uno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Nummer", role: "complement", order: 3 }
    ],
    plural: "die Nummern"
  }, {
    de: "die Stadt",
    pron: "di shtát",
    es: "la ciudad",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Das ist die Stadt. Die Stadt ist groß.",
    exampleSentenceEs: "Esta es la ciudad. La ciudad es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Stadt", role: "complement", order: 3 }
    ],
    plural: "die Städte"
  }, {
    de: "die Postleitzahl",
    pron: "di póst-lait-tsal",
    es: "código postal",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich brauche die Postleitzahl von Berlin.",
    exampleSentenceEs: "Necesito el código postal de Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Postleitzahl von Berlin", role: "complement", order: 3 }
    ],
    plural: "die Postleitzahlen"
  }, {
    de: "das Dorf / das Land",
    pron: "das doaf  das lant",
    es: "el pueblo / el país",
    type: "Sustantivo (Neutro)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich wohne in einem Dorf. Das Dorf ist klein.",
    exampleSentenceEs: "Yo vivo en un pueblo. El pueblo es pequeño.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "in einem Dorf", role: "complement", order: 3 }
    ],
    plural: "die Dörfer / die Länder"
  }, {
    de: "das Telefon",
    pron: "das te-le-fón",
    es: "el teléfono",
    type: "Sustantivo (Neutro)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Das ist mein Telefon.",
    exampleSentenceEs: "Este es mi teléfono.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Telefon", role: "complement", order: 3 }
    ],
    plural: "die Telefone"
  }, {
    de: "telefonieren / anrufen",
    pron: "te-le-fo-ní-ren  án-ru-fen",
    es: "hablar por tel. / llamar",
    type: "Verbo",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich telefoniere mit meiner Mutter.",
    exampleSentenceEs: "Yo hablo por teléfono con mi madre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "telefoniere", role: "verb_p1", order: 2 },
      { text: "mit meiner Mutter", role: "complement", order: 3 }
    ],
    regimen: "anrufen: separable, +Akk"
  }, {
    de: "die E-Mail",
    pron: "di í-meil",
    es: "el correo electrónico",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich habe die E-Mail. Die E-Mail ist neu.",
    exampleSentenceEs: "Tengo el correo electrónico. El correo electrónico es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die E-Mail", role: "complement", order: 3 }
    ],
    plural: "die E-Mails"
  }, {
    de: "Ich bin geboren am...",
    pron: "ij bin gue-bó-ren am",
    es: "Nací el...",
    type: "Frase",
    category: "Lebenslauf",
    exampleSentenceDe: "Ich bin geboren am fünften Mai.",
    exampleSentenceEs: "Nací el cinco de mayo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "geboren am fünften Mai", role: "complement", order: 3 }
    ],
    regimen: "+ fecha (am)"
  }, {
    de: "das Geburtsdatum",
    pron: "das gue-búrts-dá-tum",
    es: "fecha de nacimiento",
    type: "Sustantivo (Neutro)",
    category: "Lebenslauf",
    exampleSentenceDe: "Mein Geburtsdatum ist der zehnte Mai.",
    exampleSentenceEs: "Mi fecha de nacimiento es el diez de mayo.",
    exampleSentenceDeBlocks: [
      { text: "Mein Geburtsdatum", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der zehnte Mai", role: "complement", order: 3 }
    ],
    plural: "die Geburtsdaten"
  }, {
    de: "der Geburtstag",
    pron: "dea gue-búrts-tak",
    es: "el cumpleaños",
    type: "Sustantivo (Masc)",
    category: "Lebenslauf",
    exampleSentenceDe: "Heute ist mein Geburtstag.",
    exampleSentenceEs: "Hoy es mi cumpleaños.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Geburtstag", role: "complement", order: 3 }
    ],
    plural: "die Geburtstage"
  }, {
    de: "geboren in",
    pron: "gue-bó-ren in",
    es: "nacido en",
    type: "Frase",
    category: "Lebenslauf",
    exampleSentenceDe: "Ich bin geboren in Spanien.",
    exampleSentenceEs: "Yo nací en España.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "geboren in Spanien", role: "complement", order: 3 }
    ],
    regimen: "+ Dat."
  }, {
    de: "Jahre alt sein",
    pron: "yá-re alt sáin",
    es: "tener ... años",
    type: "Frase",
    category: "Lebenslauf",
    exampleSentenceDe: "Ich bin 30 Jahre alt.",
    exampleSentenceEs: "Tengo 30 años.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "30 Jahre alt", role: "complement", order: 3 }
    ],
    regimen: "Número + Jahre alt"
  }, {
    de: "die Familie",
    pron: "di fa-mí-lie",
    es: "la familia",
    type: "Sustantivo (Fem)",
    category: "Familie",
    exampleSentenceDe: "Das ist meine Familie.",
    exampleSentenceEs: "Esta es mi familia.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "meine Familie", role: "complement", order: 3 }
    ],
    plural: "die Familien"
  }, {
    de: "der Familienstand",
    pron: "dea fa-mí-li-en-shtant",
    es: "estado civil",
    type: "Sustantivo (Masc)",
    category: "Familie",
    exampleSentenceDe: "Mein Familienstand ist ledig.",
    exampleSentenceEs: "Mi estado civil es soltero.",
    exampleSentenceDeBlocks: [
      { text: "Mein Familienstand", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ledig", role: "complement", order: 3 }
    ],
    plural: "die Familienstände"
  }, {
    de: "verheiratet / ledig",
    pron: "fea-jái-ra-tet  lé-dij",
    es: "casado/a / soltero/a",
    en: "cute 3D avatar of a groom in a tuxedo standing next to a single man in casual clothes",
    type: "Adjetivo",
    category: "Familie",
    exampleSentenceDe: "Ich bin ledig.",
    exampleSentenceEs: "Yo soy soltero/a.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "ledig", role: "complement", order: 3 }
    ],
    regimen: "≠ ledig / verheiratet"
  }, {
    de: "heiraten",
    pron: "jái-ra-ten",
    es: "casarse",
    en: "cute 3D avatar of a bride in a white dress and a groom in a black tuxedo getting married",
    type: "Verbo",
    category: "Familie",
    exampleSentenceDe: "Ich möchte heiraten.",
    exampleSentenceEs: "Quiero casarme.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "heiraten", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "die Ehefrau / der Ehemann",
    pron: "di é-e-frau  dea é-e-man",
    es: "esposa / esposo",
    en: "cute 3D avatar of a married adult man and adult woman standing together",
    type: "Sustantivo",
    category: "Familie",
    exampleSentenceDe: "Das ist meine Ehefrau.",
    exampleSentenceEs: "Ella es mi esposa.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "meine Ehefrau", role: "complement", order: 3 }
    ],
    plural: "die Ehefrauen / die Ehemänner"
  }, {
    de: "die Hochzeit",
    pron: "di jój-tsait",
    es: "la boda",
    en: "cute 3D avatar of a wedding cake with a bride and groom on top",
    type: "Sustantivo (Fem)",
    category: "Familie",
    exampleSentenceDe: "Die Hochzeit ist morgen.",
    exampleSentenceEs: "La boda es mañana.",
    exampleSentenceDeBlocks: [
      { text: "Die Hochzeit", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "morgen", role: "complement", order: 3 }
    ],
    plural: "die Hochzeiten"
  }, {
    de: "der Vater / die Mutter",
    pron: "dea fá-tea  di mú-ta",
    es: "padre / madre",
    en: "cute 3D avatar of a father holding a baby and a mother standing next to him",
    type: "Sustantivo",
    category: "Familie",
    exampleSentenceDe: "Das ist mein Vater.",
    exampleSentenceEs: "Este es mi padre.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Vater", role: "complement", order: 3 }
    ],
    plural: "die Väter / die Mütter"
  }, {
    de: "die Eltern",
    pron: "di él-tean",
    es: "los padres",
    en: "cute 3D avatar of an adult man and adult woman holding hands with a small child",
    type: "Sustantivo (Plural)",
    category: "Familie",
    exampleSentenceDe: "Meine Eltern sind nett.",
    exampleSentenceEs: "Mis padres son amables.",
    exampleSentenceDeBlocks: [
      { text: "Meine Eltern", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "nett", role: "complement", order: 3 }
    ],
    plural: "die Eltern"
  }, {
    de: "das Kind / Baby",
    pron: "das kint  béi-bi",
    es: "el niño / bebé",
    en: "cute 3D avatar of a happy little baby wearing a diaper",
    type: "Sustantivo (Neutro)",
    category: "Familie",
    exampleSentenceDe: "Das Kind ist klein.",
    exampleSentenceEs: "El niño es pequeño.",
    exampleSentenceDeBlocks: [
      { text: "Das Kind", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "klein", role: "complement", order: 3 }
    ],
    plural: "die Kinder / Babys"
  }, {
    de: "der Sohn / die Tochter",
    pron: "dea son  di tój-tea",
    es: "hijo / hija",
    en: "cute 3D avatar of a young boy and a young girl holding school backpacks",
    type: "Sustantivo",
    category: "Familie",
    exampleSentenceDe: "Ich habe einen Sohn. Mein Sohn ist klein.",
    exampleSentenceEs: "Tengo un hijo. Mi hijo es pequeño.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Sohn", role: "complement", order: 3 }
    ],
    plural: "die Söhne / die Töchter"
  }, {
    de: "der Bruder / Schwester",
    pron: "dea brú-da  shvés-ta",
    es: "hermano / hermana",
    en: "cute 3D avatar of a boy and girl playing with toys together",
    type: "Sustantivo",
    category: "Familie",
    exampleSentenceDe: "Ich habe einen Bruder. Mein Bruder ist nett.",
    exampleSentenceEs: "Tengo un hermano. Mi hermano es simpático.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Bruder", role: "complement", order: 3 }
    ],
    plural: "die Brüder / Schwestern"
  }, {
    de: "die Geschwister",
    pron: "di gue-shvís-ta",
    es: "los hermanos",
    en: "cute 3D avatar of three happy young children standing together",
    type: "Sustantivo (Plural)",
    category: "Familie",
    exampleSentenceDe: "Ich habe zwei Geschwister.",
    exampleSentenceEs: "Yo tengo dos hermanos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "zwei Geschwister", role: "complement", order: 3 }
    ],
    plural: "die Geschwister"
  }, {
    de: "die Oma / der Opa",
    pron: "di ó-ma  dea ó-pa",
    es: "abuela / abuelo",
    en: "cute 3D avatar of an elderly old man and an elderly old woman with gray hair",
    type: "Sustantivo",
    category: "Familie",
    exampleSentenceDe: "Das ist die Oma. Die Oma ist nett.",
    exampleSentenceEs: "Esta es la abuela. La abuela es simpática.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Oma", role: "complement", order: 3 }
    ],
    plural: "die Omas / die Opas"
  }, {
    de: "die Großeltern",
    pron: "di grós-el-ta-n",
    es: "los abuelos",
    en: "cute 3D avatar of an elderly couple hugging a young child",
    type: "Sustantivo (Plural)",
    category: "Familie",
    exampleSentenceDe: "Meine Großeltern sind alt.",
    exampleSentenceEs: "Mis abuelos son mayores.",
    exampleSentenceDeBlocks: [
      { text: "Meine Großeltern", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "alt", role: "complement", order: 3 }
    ],
    plural: "die Großeltern"
  }, {
    de: "die Verwandten",
    pron: "di fea-ván-ten",
    es: "los parientes",
    en: "cute 3D avatar of a big group of many people of different ages",
    type: "Sustantivo (Plural)",
    category: "Familie",
    exampleSentenceDe: "Ich habe Verwandte. Meine Verwandten sind nett.",
    exampleSentenceEs: "Tengo parientes. Mis parientes son amables.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Verwandte", role: "complement", order: 3 }
    ],
    plural: "die Verwandten"
  }, {
    de: "der Freund / Freundin",
    pron: "dea fróint  dea fróin-din",
    es: "amigo / amiga",
    en: "cute 3D avatar of a young man and a young woman giving a high-five",
    type: "Sustantivo",
    category: "Soziales",
    exampleSentenceDe: "Das ist mein Freund.",
    exampleSentenceEs: "Este es mi amigo.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Freund", role: "complement", order: 3 }
    ],
    plural: "die Freunde / Freundinnen"
  }, {
    de: "der/die Bekannte",
    pron: "dea / di be-kán-te",
    es: "el/la conocido/a",
    en: "cute 3D avatar of two people waving at each other from a distance",
    type: "Sustantivo",
    category: "Soziales",
    exampleSentenceDe: "Das ist mein Bekannter.",
    exampleSentenceEs: "Este es mi conocido.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Bekannter", role: "complement", order: 3 }
    ],
    plural: "die Bekannten"
  }, {
    de: "der/die Erwachsene",
    pron: "dea / di ea-vák-se-ne",
    es: "el/la adulto/a",
    en: "cute 3D avatar of a serious mature adult wearing business clothes",
    type: "Sustantivo",
    category: "Soziales",
    exampleSentenceDe: "Ich bin ein Erwachsener.",
    exampleSentenceEs: "Yo soy un adulto.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "ein Erwachsener", role: "complement", order: 3 }
    ],
    plural: "die Erwachsenen"
  }, {
    de: "der Jugendliche",
    pron: "dea yú-guent-li-je",
    es: "el joven",
    type: "Sustantivo (Masc)",
    category: "Soziales",
    exampleSentenceDe: "Der Jugendliche ist hier.",
    exampleSentenceEs: "El joven está aquí.",
    exampleSentenceDeBlocks: [
      { text: "Der Jugendliche", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    plural: "die Jugendlichen"
  }, {
    de: "der Pass / Reisepass",
    pron: "dea pas  rái-ze-pas",
    es: "pasaporte",
    type: "Sustantivo (Masc)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe den Reisepass.",
    exampleSentenceEs: "Yo tengo el pasaporte.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "den Reisepass", role: "complement", order: 3 }
    ],
    plural: "die Pässe / Reisepässe"
  }, {
    de: "der Ausweis",
    pron: "dea áus-vais",
    es: "documento de identidad",
    type: "Sustantivo (Masc)",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche den Ausweis, bitte.",
    exampleSentenceEs: "Necesito el documento de identidad, por favor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "den Ausweis, bitte", role: "complement", order: 3 }
    ],
    plural: "die Ausweise"
  }, {
    de: "die Papiere",
    pron: "di pa-pí-re",
    es: "los papeles/documentos",
    type: "Sustantivo (Plural)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe die Papiere. Die Papiere sind wichtig.",
    exampleSentenceEs: "Tengo los papeles. Los papeles son importantes.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Papiere", role: "complement", order: 3 }
    ],
    plural: "die Papiere"
  }, {
    de: "das Formular",
    pron: "das foa-mu-lá",
    es: "formulario",
    type: "Sustantivo (Neutro)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe das Formular. Das Formular ist neu.",
    exampleSentenceEs: "Tengo el formulario. El formulario es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Formular", role: "complement", order: 3 }
    ],
    plural: "die Formulare"
  }, {
    de: "ausfüllen",
    pron: "áus-fiú-len",
    es: "rellenar",
    type: "Verbo",
    category: "Dokumente",
    exampleSentenceDe: "Ich muss das Formular ausfüllen.",
    exampleSentenceEs: "Yo debo rellenar el formulario.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "das Formular", role: "complement", order: 3 },
      { text: "ausfüllen", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (aus-)"
  }, {
    de: "die Staatsangehörigkeit",
    pron: "di shtáts-án-gue-jö-rij-kait",
    es: "nacionalidad",
    type: "Sustantivo (Fem)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe eine Frage zur Staatsangehörigkeit.",
    exampleSentenceEs: "Tengo una pregunta sobre la nacionalidad.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Frage zur Staatsangehörigkeit", role: "complement", order: 3 }
    ],
    plural: "die Staatsangehörigkeiten"
  }, {
    de: "der Führerschein",
    pron: "dea fú-ra-sháin",
    es: "licencia de conducir",
    type: "Sustantivo (Masc)",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche den Führerschein.",
    exampleSentenceEs: "Yo necesito la licencia de conducir.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "den Führerschein", role: "complement", order: 3 }
    ],
    plural: "die Führerscheine"
  }, {
    de: "unterschreiben",
    pron: "un-ta-shrái-ben",
    es: "firmar",
    type: "Verbo",
    category: "Dokumente",
    exampleSentenceDe: "Ich muss den Vertrag unterschreiben.",
    exampleSentenceEs: "Yo debo firmar el contrato.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "den Vertrag", role: "complement", order: 3 },
      { text: "unterschreiben", role: "verb_p2", order: 4 }
    ],
    regimen: "No separable, + Akkusativ"
  }, {
    de: "die Unterschrift",
    pron: "di ún-tea-shrift",
    es: "la firma",
    type: "Sustantivo (Fem)",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche die Unterschrift hier.",
    exampleSentenceEs: "Necesito la firma aquí.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Unterschrift hier", role: "complement", order: 3 }
    ],
    plural: "die Unterschriften"
  }, {
    de: "das Alter",
    pron: "das ál-tea",
    es: "edad",
    type: "Sustantivo (Neutro)",
    category: "Lebenslauf",
    exampleSentenceDe: "Mein Alter ist zwanzig.",
    exampleSentenceEs: "Mi edad es veinte.",
    exampleSentenceDeBlocks: [
      { text: "Mein Alter", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "zwanzig", role: "complement", order: 3 }
    ],
    plural: "die Alter"
  }, {
    de: "der Geburtsort",
    pron: "dea gue-búrts-ort",
    es: "lugar de nacimiento",
    type: "Sustantivo (Masc)",
    category: "Lebenslauf",
    exampleSentenceDe: "Mein Geburtsort ist Berlin.",
    exampleSentenceEs: "Mi lugar de nacimiento es Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Mein Geburtsort", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Berlin", role: "complement", order: 3 }
    ],
    plural: "die Geburtsorte"
  }, {
    de: "geschieden",
    pron: "gue-shí-den",
    es: "divorciado/a",
    type: "Adjetivo",
    category: "Familie",
    exampleSentenceDe: "Er ist geschieden.",
    exampleSentenceEs: "Él está divorciado.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "geschieden", role: "complement", order: 3 }
    ],
    regimen: "≠ verheiratet"
  }, {
    de: "verwitwet",
    pron: "fea-vít-vet",
    es: "viudo/a",
    type: "Adjetivo",
    category: "Familie",
    exampleSentenceDe: "Mein Großvater ist verwitwet.",
    exampleSentenceEs: "Mi abuelo es viudo.",
    exampleSentenceDeBlocks: [
      { text: "Mein Großvater", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "verwitwet", role: "complement", order: 3 }
    ],
    regimen: "≠ verheiratet"
  }, {
    de: "der Ausländer",
    pron: "dea áus-len-dea",
    es: "el extranjero",
    type: "Sustantivo",
    category: "Gesellschaft",
    exampleSentenceDe: "Ich bin ein Ausländer.",
    exampleSentenceEs: "Yo soy un extranjero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "ein Ausländer", role: "complement", order: 3 }
    ],
    plural: "die Ausländer"
  }, {
    de: "die Gesellschaft",
    pron: "di gue-sél-shaft",
    es: "la sociedad",
    type: "Sustantivo",
    category: "Gesellschaft",
    exampleSentenceDe: "Die Gesellschaft ist groß.",
    exampleSentenceEs: "La sociedad es grande.",
    exampleSentenceDeBlocks: [
      { text: "Die Gesellschaft", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Gesellschaften"
  }, {
    de: "der Rentner",
    pron: "dea rént-nea",
    es: "el jubilado",
    type: "Sustantivo",
    category: "Gesellschaft",
    exampleSentenceDe: "Der Rentner ist alt.",
    exampleSentenceEs: "El jubilado es viejo.",
    exampleSentenceDeBlocks: [
      { text: "Der Rentner", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "alt", role: "complement", order: 3 }
    ],
    plural: "die Rentner"
  }, {
    de: "sich freuen",
    pron: "zij fróy-en",
    es: "alegrarse",
    type: "Verbo Reflexivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich freue mich auf den Urlaub.",
    exampleSentenceEs: "Yo me alegro de las vacaciones.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "freue", role: "verb_p1", order: 2 },
      { text: "mich auf den Urlaub", role: "complement", order: 3 }
    ],
    regimen: "Reflexivo + auf/über+Akk"
  }, {
    de: "das Gefühl",
    pron: "das gue-fúl",
    es: "el sentimiento",
    type: "Sustantivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich habe das Gefühl.",
    exampleSentenceEs: "Tengo el sentimiento.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Gefühl", role: "complement", order: 3 }
    ],
    plural: "die Gefühle"
  },
  {
    de: "mitbringen",
    pron: "mít-brin-guen",
    es: "traer consigo",
    type: "Verbo",
    category: "Soziales",
    regimen: "Separable (mit-) / + Dativo + Akkusativ",
    exampleSentenceDe: "Ich bringe einen Kuchen mit.",
    exampleSentenceEs: "Traigo un pastel.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bringe", role: "verb_p1", order: 2 },
      { text: "einen Kuchen", role: "complement", order: 3 },
      { text: "mit", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "kennenlernen",
    pron: "ké-nen-lea-nen",
    es: "conocer (por 1ª vez)",
    type: "Verbo",
    category: "Soziales",
    regimen: "Separable (kennen-) / + Akkusativ",
    exampleSentenceDe: "Ich lerne meine Nachbarn kennen.",
    exampleSentenceEs: "Conozco a mis vecinos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lerne", role: "verb_p1", order: 2 },
      { text: "meine Nachbarn", role: "complement", order: 3 },
      { text: "kennen", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "einladen",
    pron: "áin-la-den",
    es: "invitar",
    type: "Verbo",
    category: "Soziales",
    regimen: "Separable (ein-) / + Akkusativ",
    exampleSentenceDe: "Wir laden viele Freunde ein.",
    exampleSentenceEs: "Invitamos a muchos amigos.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "laden", role: "verb_p1", order: 2 },
      { text: "viele Freunde", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "feiern",
    pron: "fái-ean",
    es: "celebrar",
    type: "Verbo",
    category: "Soziales",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Wir feiern heute eine Party.",
    exampleSentenceEs: "Celebramos una fiesta hoy.",
    exampleSentenceDeBlocks: [
      { text: "Wir feiern", role: "subject", order: 1 },
      { text: "heute", role: "verb_p1", order: 2 },
      { text: "eine Party", role: "complement", order: 3 }
    ]
  }, {
        de: "schenken",
    pron: "shén-ken",
    es: "regalar",
    type: "Verbo",
    category: "Soziales",
    regimen: "Dativo (a quién) + Akkusativ (qué)",
    exampleSentenceDe: "Ich schenke meiner Mutter Blumen.",
    exampleSentenceEs: "Le regalo flores a mi madre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schenke", role: "verb_p1", order: 2 },
      { text: "meiner Mutter Blumen", role: "complement", order: 3 }
    ]
  }, {
        de: "gratulieren",
    pron: "gra-tu-lí-ren",
    es: "felicitar",
    type: "Verbo",
    category: "Soziales",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "Ich gratuliere dir zum Geburtstag.",
    exampleSentenceEs: "Te felicito por tu cumpleaños.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gratuliere", role: "verb_p1", order: 2 },
      { text: "dir zum Geburtstag", role: "complement", order: 3 }
    ]
  }, {
        de: "danken",
    pron: "dán-ken",
    es: "agradecer",
    type: "Verbo",
    category: "Soziales",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "Ich danke dir für alles.",
    exampleSentenceEs: "Te agradezco por todo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "danke", role: "verb_p1", order: 2 },
      { text: "dir für alles", role: "complement", order: 3 }
    ]
  }, {
        de: "die Feuerwehr",
    pron: "di fói-ea-vea",
    es: "los bomberos",
    type: "Sustantivo (Fem)",
    category: "Gesellschaft",
    plural: "die Feuerwehren",
    exampleSentenceDe: "Die Feuerwehr kommt sehr schnell.",
    exampleSentenceEs: "Los bomberos vienen muy rápido.",
    exampleSentenceDeBlocks: [
      { text: "Die Feuerwehr", role: "subject", order: 1 },
      { text: "kommt", role: "verb_p1", order: 2 },
      { text: "sehr schnell", role: "complement", order: 3 }
    ]
  },
    {
      de: "das Bürgeramt",
      pron: "das búr-guea-amt",
      es: "oficina de atención ciudadana",
      type: "Sustantivo (Neutro)",
      category: "Behörden",
      regimen: "-",
      plural: "die Bürgerämter",
      exampleSentenceDe: "Ich muss zum Bürgeramt für meine Anmeldung gehen.",
      exampleSentenceEs: "Tengo que ir a la oficina de atención ciudadana para mi empadronamiento.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "zum Bürgeramt für meine Anmeldung", role: "complement", order: 3 },
      { text: "gehen", role: "verb_p2", order: 4 }
    ],
      en: "a cute 3D municipal citizen city hall office building"
    },
    {
      de: "die Meldebescheinigung",
      pron: "di mél-de-be-shái-ni-gung",
      es: "certificado de empadronamiento",
      type: "Sustantivo (Fem)",
      category: "Behörden",
      regimen: "-",
      plural: "die Meldebescheinigungen",
      exampleSentenceDe: "Die Bank verlangt eine aktuelle Meldebescheinigung.",
      exampleSentenceEs: "El banco exige un certificado de empadronamiento actual.",
    exampleSentenceDeBlocks: [
      { text: "Die Bank", role: "subject", order: 1 },
      { text: "verlangt", role: "verb_p1", order: 2 },
      { text: "eine aktuelle Meldebescheinigung", role: "complement", order: 3 }
    ],
      en: "official paper registration certificate document with seal stamp"
    },
    {
      de: "der Aufenthaltstitel",
      pron: "dea áuf-ent-halts-tí-tel",
      es: "permiso de residencia",
      type: "Sustantivo (Masc)",
      category: "Behörden",
      regimen: "-",
      plural: "die Aufenthaltstitel",
      exampleSentenceDe: "Mein Aufenthaltstitel ist für zwei Jahre gültig.",
      exampleSentenceEs: "Mi permiso de residencia es válido por dos años.",
    exampleSentenceDeBlocks: [
      { text: "Mein Aufenthaltstitel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "für zwei Jahre gültig", role: "complement", order: 3 }
    ],
      en: "plastic biometric residence permit card"
    },
    {
      de: "der Antrag",
      pron: "dea án-trak",
      es: "solicitud / instancia formal",
      type: "Sustantivo (Masc)",
      category: "Behörden",
      regimen: "-",
      plural: "die Anträge",
      exampleSentenceDe: "Ich habe den Antrag auf Kindergeld gestellt.",
      exampleSentenceEs: "He presentado la solicitud del subsidio familiar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "den Antrag auf Kindergeld gestellt", role: "complement", order: 3 }
    ],
      en: "official application form document paper"
    },
    {
      de: "beantragen",
      pron: "be-án-tra-guen",
      es: "solicitar formalmente",
      type: "Verbo",
      category: "Behörden",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich möchte einen neuen Pass beantragen.",
      exampleSentenceEs: "Quisiera solicitar un nuevo pasaporte.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "einen neuen Pass", role: "complement", order: 3 },
      { text: "beantragen", role: "verb_p2", order: 4 }
    ],
      en: "filling out and applying for official application"
    },
    {
      de: "die Behörde",
      pron: "di be-jör-de",
      es: "organismo público / autoridad",
      type: "Sustantivo (Fem)",
      category: "Behörden",
      regimen: "-",
      plural: "die Behörden",
      exampleSentenceDe: "Der Brief kommt direkt von der Behörde.",
      exampleSentenceEs: "La carta proviene directamente del organismo público.",
    exampleSentenceDeBlocks: [
      { text: "Der Brief", role: "subject", order: 1 },
      { text: "kommt", role: "verb_p1", order: 2 },
      { text: "direkt von der Behörde", role: "complement", order: 3 }
    ],
      en: "government authority administration building"
    },
    {
      de: "die Steuer-ID",
      pron: "di shtói-ea-ai-dí",
      es: "número de identificación fiscal",
      type: "Sustantivo (Fem)",
      category: "Behörden",
      regimen: "-",
      plural: "die Steuer-IDs",
      exampleSentenceDe: "Der Arbeitgeber braucht Ihre Steuer-ID.",
      exampleSentenceEs: "El empleador necesita su número de identificación fiscal.",
    exampleSentenceDeBlocks: [
      { text: "Der Arbeitgeber", role: "subject", order: 1 },
      { text: "braucht", role: "verb_p1", order: 2 },
      { text: "Ihre Steuer-ID", role: "complement", order: 3 }
    ],
      en: "tax identification number card with digits"
    },
    {
      de: "die Frist",
      pron: "di frist",
      es: "plazo / fecha límite",
      type: "Sustantivo (Fem)",
      category: "Behörden",
      regimen: "-",
      plural: "die Fristen",
      exampleSentenceDe: "Bitte beachten Sie die Frist von zwei Wochen.",
      exampleSentenceEs: "Por favor, tenga en cuenta el plazo de dos semanas.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "beachten", role: "verb_p1", order: 2 },
      { text: "Sie die Frist von zwei Wochen", role: "complement", order: 3 }
    ],
      en: "calendar with a strict circled deadline date"
    },
    {
      de: "zuständig",
      pron: "tsú-shten-dij",
      es: "competente / encargado del trámite",
      type: "Adjetivo",
      category: "Behörden",
      regimen: "für + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Welcher Sachbearbeiter ist für mich zuständig?",
      exampleSentenceEs: "¿Qué funcionario es el encargado de mi caso?",
    exampleSentenceDeBlocks: [
      { text: "Welcher Sachbearbeiter", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "für mich zuständig", role: "complement", order: 3 }
    ],
      en: "helpful officer at customer service desk"
    },
  {
    "de": "das Altenheim / Altersheim",
    "pron": "das ál-ten-jaim",
    "es": "la residencia de ancianos",
    "type": "Sustantivo (Neutro)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Altenheime",
    "en": "a cute 3D isometric UI icon of a cozy senior care home building with a warm garden",
    "exampleSentenceDe": "Meine Großmutter lebt sehr zufrieden im Altersheim.",
    "exampleSentenceEs": "Mi abuela vive muy contenta en la residencia de ancianos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Großmutter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lebt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr zufrieden im Altersheim",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Amt",
    "pron": "das amt",
    "es": "la oficina pública / cargo",
    "type": "Sustantivo (Neutro)",
    "category": "Behörden",
    "level": "A2–B1",
    "plural": "die Ämter",
    "en": "a cute 3D isometric UI icon of a neat municipal public office building with columns",
    "exampleSentenceDe": "Ich habe morgen einen Termin auf dem Amt.",
    "exampleSentenceEs": "Mañana tengo una cita en la oficina pública.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "morgen einen Termin auf dem Amt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Angehörige",
    "pron": "dea án-gue-jö-ri-gue",
    "es": "el familiar / pariente",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Familie",
    "level": "B1",
    "regimen": "Declina como adjetivo",
    "plural": "die Angehörigen",
    "en": "a cute 3D isometric avatar of caring family relatives standing together",
    "exampleSentenceDe": "Nur nahe Angehörige dürfen den Patienten besuchen.",
    "exampleSentenceEs": "Solo los familiares cercanos pueden visitar al paciente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nur nahe Angehörige",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dürfen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Patienten",
        "role": "complement",
        "order": 3
      },
      {
        "text": "besuchen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Arbeitserlaubnis",
    "pron": "di ár-baits-ea-laup-nis",
    "es": "el permiso de trabajo",
    "type": "Sustantivo (Fem)",
    "category": "Behörden",
    "level": "A2–B1",
    "regimen": "Generalmente singular",
    "en": "a cute 3D isometric UI icon of an official work permit document card with a green approval stamp",
    "exampleSentenceDe": "Mit diesem Visum erhalten Sie eine Arbeitserlaubnis.",
    "exampleSentenceEs": "Con este visado obtiene un permiso de trabajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mit diesem Visum",
        "role": "subject",
        "order": 1
      },
      {
        "text": "erhalten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie eine Arbeitserlaubnis",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Babysitter / die Babysitterin",
    "pron": "dea béi-bi-si-ta",
    "es": "el niñero / la niñera",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Familie",
    "level": "A2–B1",
    "plural": "die Babysitter / -innen",
    "en": "a cute 3D isometric avatar of a friendly babysitter taking care of a happy baby",
    "exampleSentenceDe": "Am Freitagabend kommt ein Babysitter zu uns.",
    "exampleSentenceEs": "El viernes por la noche viene un canguro a nuestra casa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Freitagabend",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Babysitter zu uns",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Demokratie",
    "pron": "di de-mo-kra-tí",
    "es": "la democracia",
    "type": "Sustantivo (Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Demokratien",
    "exampleSentenceDe": "Deutschland ist eine parlamentarische Demokratie.",
    "exampleSentenceEs": "Alemania es una democracia parlamentaria.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Deutschland",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine parlamentarische Demokratie",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "demokratisch",
    "pron": "de-mo-krá-tish",
    "es": "democrático",
    "type": "Adjetivo",
    "category": "Gesellschaft",
    "level": "B1",
    "regimen": "Atributivo/Predicativo",
    "exampleSentenceDe": "Die Wahl war frei und demokratisch.",
    "exampleSentenceEs": "La elección fue libre y democrática.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Wahl",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "frei und demokratisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der/die Deutsche",
    "pron": "dea/di dói-che",
    "es": "el alemán / la alemana",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Personen",
    "level": "A1",
    "regimen": "Declinación adjetival",
    "plural": "die Deutschen",
    "en": "a cute 3D isometric avatar of a friendly German man and woman smiling",
    "exampleSentenceDe": "Viele Deutsche trinken morgens gern Kaffee.",
    "exampleSentenceEs": "A muchos alemanes les gusta tomar café por la mañana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Deutsche",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trinken",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "morgens gern Kaffee",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Ehe",
    "pron": "di é-e",
    "es": "el matrimonio",
    "type": "Sustantivo (Fem)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Ehen",
    "exampleSentenceDe": "Sie führen eine sehr glückliche Ehe.",
    "exampleSentenceEs": "Llevan un matrimonio muy feliz.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "führen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine sehr glückliche Ehe",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Einbrecher",
    "pron": "dea áin-bre-ja",
    "es": "el ladrón (allanamiento)",
    "type": "Sustantivo (Masc)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Einbrecher",
    "en": "a cute 3D isometric avatar of a cartoon burglar wearing a dark beanie and striped shirt",
    "exampleSentenceDe": "Die Polizei hat den Einbrecher gestern gefasst.",
    "exampleSentenceEs": "La policía detuvo ayer al ladrón.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Polizei",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Einbrecher gestern",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gefasst",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Einbruch",
    "pron": "dea áin-bruj",
    "es": "el robo con allanamiento",
    "type": "Sustantivo (Masc)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Einbrüche",
    "exampleSentenceDe": "Nach dem Einbruch riefen wir sofort die Polizei.",
    "exampleSentenceEs": "Tras el robo llamamos de inmediato a la policía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Einbruch",
        "role": "subject",
        "order": 1
      },
      {
        "text": "riefen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir sofort die Polizei",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Enkelin",
    "pron": "di én-ke-lin",
    "es": "la nieta",
    "type": "Sustantivo (Fem)",
    "category": "Familie",
    "level": "A2",
    "plural": "die Enkelinnen",
    "en": "a cute 3D isometric avatar of a smiling young granddaughter girl with a school backpack",
    "exampleSentenceDe": "Meine Enkelin geht jetzt in die Grundschule.",
    "exampleSentenceEs": "Mi nieta va ahora a la escuela primaria.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Enkelin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "geht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "jetzt in die Grundschule",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Erziehung",
    "pron": "di ea-tsí-ung",
    "es": "la educación / crianza",
    "type": "Sustantivo (Fem)",
    "category": "Familie",
    "level": "A1",
    "regimen": "Singular",
    "exampleSentenceDe": "Die Erziehung der Kinder ist eine große Aufgabe.",
    "exampleSentenceEs": "La crianza de los hijos es una gran tarea.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Erziehung der Kinder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine große Aufgabe",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Großmutter / der Großvater",
    "pron": "di grós-mu-ta / dea grós-fa-ta",
    "es": "la abuela / el abuelo",
    "type": "Sustantivo (Fem/Masc)",
    "category": "Familie",
    "level": "A2",
    "plural": "die Großmütter / die Großväter",
    "en": "a cute 3D isometric avatar of a cheerful elderly grandmother and grandfather",
    "exampleSentenceDe": "Mein Großvater wohnt schon lange in Hamburg.",
    "exampleSentenceEs": "Mi abuelo vive desde hace mucho en Hamburgo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Großvater",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wohnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schon lange in Hamburg",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Killer / die Killerin",
    "pron": "dea kí-la",
    "es": "el asesino / la asesina (ficción/prensa)",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Personen",
    "level": "B1",
    "plural": "die Killer / -innen",
    "en": "a cute 3D isometric avatar of a mysterious detective novel villain character in a dark trench coat",
    "exampleSentenceDe": "Im Krimi sucht der Kommissar den Killer.",
    "exampleSentenceEs": "En la novela policiaca el comisario busca al asesino.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Krimi",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Kommissar den Killer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mama",
    "pron": "di má-ma",
    "es": "la mamá",
    "type": "Sustantivo (Fem)",
    "category": "Familie",
    "level": "A1–B1",
    "plural": "die Mamas",
    "en": "a cute 3D isometric avatar of a warm smiling mother",
    "exampleSentenceDe": "Mama, wann essen wir heute zu Mittag?",
    "exampleSentenceEs": "Mamá, ¿cuándo almorzamos hoy?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mama,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wann",
        "role": "subject",
        "order": 2
      },
      {
        "text": "essen",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "wir heute zu Mittag",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Onkel",
    "pron": "dea ón-kel",
    "es": "el tío",
    "type": "Sustantivo (Masc)",
    "category": "Familie",
    "level": "A2",
    "plural": "die Onkel",
    "en": "a cute 3D isometric avatar of a friendly adult uncle character smiling",
    "exampleSentenceDe": "Mein Onkel arbeitet als Ingenieur in Köln.",
    "exampleSentenceEs": "Mi tío trabaja como ingeniero en Colonia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Onkel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "als Ingenieur in Köln",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Tante",
    "pron": "di tán-te",
    "es": "la tía",
    "type": "Sustantivo (Fem)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Tanten",
    "en": "a cute 3D isometric avatar of a friendly adult aunt character smiling",
    "exampleSentenceDe": "Am Sonntag besuchen wir meine Tante.",
    "exampleSentenceEs": "El domingo visitamos a mi tía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Sonntag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "besuchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir meine Tante",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Tat",
    "pron": "di tat",
    "es": "el hecho / acto / delito",
    "type": "Sustantivo (Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Taten",
    "exampleSentenceDe": "Die Polizei untersucht die Tat noch genau.",
    "exampleSentenceEs": "La policía aún investiga el hecho con detalle.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Polizei",
        "role": "subject",
        "order": 1
      },
      {
        "text": "untersucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Tat noch genau",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Täter / die Täterin",
    "pron": "dea té-ta / di té-te-rin",
    "es": "el autor / culpable (del hecho)",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Täter / -innen",
    "en": "a cute 3D isometric avatar of a suspicious culprit character in a dark hoodie",
    "exampleSentenceDe": "Es gibt noch keine Spur von dem Täter.",
    "exampleSentenceEs": "Todavía no hay rastro del culpable.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch keine Spur von dem Täter",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Brasilien",
    "pron": "bra-zí-lien",
    "es": "Brasil",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: aus/in Brasilien",
    "en": "a cute 3D isometric UI icon of a waving green, yellow and blue flag of Brazil without text",
    "exampleSentenceDe": "Carlos kommt aus Brasilien.",
    "exampleSentenceEs": "Carlos viene de Brasil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Carlos",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus Brasilien",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "China",
    "pron": "jí-na / shí-na",
    "es": "China",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: aus/in China",
    "en": "a cute 3D isometric UI icon of a waving red flag of China with five golden stars without text",
    "exampleSentenceDe": "Viele Produkte kommen heute aus China.",
    "exampleSentenceEs": "Muchos productos vienen hoy de China.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Produkte",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute aus China",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Deutschland",
    "pron": "dóitsh-lant",
    "es": "Alemania",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/nach Deutschland",
    "en": "a cute 3D isometric UI icon of a waving black, red and gold flag of Germany without text",
    "exampleSentenceDe": "Seit einem Jahr lebe ich in Deutschland.",
    "exampleSentenceEs": "Desde hace un año vivo en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Seit einem Jahr",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lebe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich in Deutschland",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "England",
    "pron": "éng-lant",
    "es": "Inglaterra",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus England",
    "en": "a cute 3D isometric UI icon of a waving white flag of England with a red cross without text",
    "exampleSentenceDe": "Ben kommt aus England und spricht Englisch.",
    "exampleSentenceEs": "Ben viene de Inglaterra y habla inglés.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ben",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus England und spricht Englisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Frankreich",
    "pron": "fránk-raij",
    "es": "Francia",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/nach Frankreich",
    "en": "a cute 3D isometric UI icon of a waving blue, white and red flag of France without text",
    "exampleSentenceDe": "Paris ist die Hauptstadt von Frankreich.",
    "exampleSentenceEs": "París es la capital de Francia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Paris",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Hauptstadt von Frankreich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Griechenland",
    "pron": "grí-jen-lant",
    "es": "Grecia",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Griechenland",
    "en": "a cute 3D isometric UI icon of a waving blue and white striped flag of Greece without text",
    "exampleSentenceDe": "Im Sommer fliegen wir nach Griechenland.",
    "exampleSentenceEs": "En verano volamos a Grecia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Sommer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fliegen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir nach Griechenland",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Italien",
    "pron": "i-tá-lien",
    "es": "Italia",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Italien",
    "en": "a cute 3D isometric UI icon of a waving green, white and red flag of Italy without text",
    "exampleSentenceDe": "Nicoletta kommt aus Italien.",
    "exampleSentenceEs": "Nicoletta viene de Italia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nicoletta",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus Italien",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Japan",
    "pron": "yá-pan",
    "es": "Japón",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Japan",
    "en": "a cute 3D isometric UI icon of a waving white flag of Japan with a red sun circle without text",
    "exampleSentenceDe": "Tokio liegt in Japan.",
    "exampleSentenceEs": "Tokio está en Japón.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Tokio",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Japan",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Kanada",
    "pron": "ká-na-da",
    "es": "Canadá",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Kanada",
    "en": "a cute 3D isometric UI icon of a waving red and white flag of Canada with a maple leaf without text",
    "exampleSentenceDe": "Mein Freund arbeitet jetzt in Kanada.",
    "exampleSentenceEs": "Mi amigo trabaja ahora en Canadá.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Freund",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "jetzt in Kanada",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Österreich",
    "pron": "ö́s-te-raij",
    "es": "Austria",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Österreich",
    "en": "a cute 3D isometric UI icon of a waving red and white striped flag of Austria without text",
    "exampleSentenceDe": "Salzburg liegt in Österreich.",
    "exampleSentenceEs": "Salzburgo está en Austria.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Salzburg",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Österreich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Polen",
    "pron": "pó-len",
    "es": "Polonia",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Polen",
    "en": "a cute 3D isometric UI icon of a waving white and red flag of Poland without text",
    "exampleSentenceDe": "Meine Nachbarin kommt aus Polen.",
    "exampleSentenceEs": "Mi vecina viene de Polonia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Nachbarin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus Polen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Russland",
    "pron": "rús-lant",
    "es": "Rusia",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Russland",
    "en": "a cute 3D isometric UI icon of a waving white, blue and red flag of Russia without text",
    "exampleSentenceDe": "Moskau ist die Hauptstadt von Russland.",
    "exampleSentenceEs": "Moscú es la capital de Rusia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Moskau",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Hauptstadt von Russland",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Schweiz",
    "pron": "di shvaits",
    "es": "Suiza",
    "type": "Sustantivo (Fem)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Con artículo: in der / aus der / in die Schweiz",
    "en": "a cute 3D isometric UI icon of a waving red square flag of Switzerland with a white cross without text",
    "exampleSentenceDe": "In der Schweiz spricht man vier Sprachen.",
    "exampleSentenceEs": "En Suiza se hablan cuatro idiomas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Schweiz",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spricht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man vier Sprachen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Spanien",
    "pron": "shpá-nien",
    "es": "España",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Spanien",
    "en": "a cute 3D isometric UI icon of a waving red and yellow flag of Spain without text",
    "exampleSentenceDe": "Madrid liegt in Spanien.",
    "exampleSentenceEs": "Madrid está en España.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Madrid",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Spanien",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Türkei",
    "pron": "di tür-kái",
    "es": "Turquía",
    "type": "Sustantivo (Fem)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Con artículo: aus der / in die Türkei",
    "en": "a cute 3D isometric UI icon of a waving red flag of Turkey with a white crescent and star without text",
    "exampleSentenceDe": "Meine Kollegen fliegen in die Türkei.",
    "exampleSentenceEs": "Mis compañeros vuelan a Turquía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Kollegen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fliegen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in die Türkei",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Ungarn",
    "pron": "ún-garn",
    "es": "Hungría",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Sin artículo: in/aus Ungarn",
    "en": "a cute 3D isometric UI icon of a waving red, white and green flag of Hungary without text",
    "exampleSentenceDe": "Claudine wohnt seit drei Jahren in Ungarn.",
    "exampleSentenceEs": "Claudine vive desde hace tres años en Hungría.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Claudine",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wohnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "seit drei Jahren in Ungarn",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die USA",
    "pron": "di u-es-á",
    "es": "los Estados Unidos (EE. UU.)",
    "type": "Sustantivo (Plural)",
    "category": "Länder",
    "level": "A1",
    "regimen": "Con artículo plural: aus den / in den USA",
    "en": "a cute 3D isometric UI icon of a waving stars and stripes flag of the United States without text",
    "exampleSentenceDe": "Er studiert ein Jahr in den USA.",
    "exampleSentenceEs": "Él estudia un año en los EE. UU.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "studiert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Jahr in den USA",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Deutsch",
    "pron": "doitsh",
    "es": "alemán (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "auf Deutsch / Deutsch sprechen",
    "exampleSentenceDe": "Wie heißt dieses Wort auf Deutsch?",
    "exampleSentenceEs": "¿Cómo se dice esta palabra en alemán?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "heißt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dieses Wort auf Deutsch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Englisch",
    "pron": "éng-lish",
    "es": "inglés (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Englisch sprechen",
    "exampleSentenceDe": "Im Büro sprechen wir oft Englisch.",
    "exampleSentenceEs": "En la oficina hablamos a menudo inglés.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Büro",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sprechen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir oft Englisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Französisch",
    "pron": "fran-tsö́-zish",
    "es": "francés (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Französisch lernen",
    "exampleSentenceDe": "In der Schule lerne ich Englisch und Französisch.",
    "exampleSentenceEs": "En el colegio aprendo inglés y francés.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Schule",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lerne",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich Englisch und Französisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Griechisch",
    "pron": "grí-jish",
    "es": "griego (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Griechisch sprechen",
    "exampleSentenceDe": "Meine Tante spricht Griechisch.",
    "exampleSentenceEs": "Mi tía habla griego.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Tante",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spricht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Griechisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Italienisch",
    "pron": "i-ta-lié-nish",
    "es": "italiano (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Italienisch verstehen",
    "exampleSentenceDe": "Ich verstehe ein bisschen Italienisch.",
    "exampleSentenceEs": "Entiendo un poco de italiano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "verstehe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein bisschen Italienisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Polnisch",
    "pron": "pól-nish",
    "es": "polaco (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Polnisch sprechen",
    "exampleSentenceDe": "Dagmara spricht Polnisch und Deutsch.",
    "exampleSentenceEs": "Dagmara habla polaco y alemán.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dagmara",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spricht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Polnisch und Deutsch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Russisch",
    "pron": "rú-sish",
    "es": "ruso (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Russisch lernen",
    "exampleSentenceDe": "Meine Kollegin lernt Russisch.",
    "exampleSentenceEs": "Mi compañera aprende ruso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Kollegin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lernt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Russisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Spanisch",
    "pron": "shpá-nish",
    "es": "español (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Spanisch als Muttersprache",
    "exampleSentenceDe": "Meine Muttersprache ist Spanisch.",
    "exampleSentenceEs": "Mi lengua materna es el español.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Muttersprache",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Spanisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Türkisch",
    "pron": "tǘr-kish",
    "es": "turco (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Türkisch sprechen",
    "exampleSentenceDe": "Ünal spricht Türkisch und Polnisch.",
    "exampleSentenceEs": "Ünal habla turco y polaco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ünal",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spricht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Türkisch und Polnisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Ungarisch",
    "pron": "ún-ga-rish",
    "es": "húngaro (idioma)",
    "type": "Sustantivo (Neutro)",
    "category": "Sprachen",
    "level": "A1",
    "regimen": "Ungarisch sprechen",
    "exampleSentenceDe": "Ágotá kommt aus Ungarn und spricht Ungarisch.",
    "exampleSentenceEs": "Ágotá es de Hungría y habla húngaro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ágotá",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus Ungarn und spricht Ungarisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Europa",
    "pron": "oi-ró-pa",
    "es": "Europa",
    "type": "Sustantivo (Neutro)",
    "category": "Länder",
    "level": "A1–B1",
    "regimen": "Sin artículo en general",
    "en": "stylized 3D relief map silhouette of the European continent in soft pastel green and blue without text",
    "exampleSentenceDe": "Deutschland liegt in der Mitte von Europa.",
    "exampleSentenceEs": "Alemania está situada en el centro de Europa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Deutschland",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in der Mitte von Europa",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Europäer / die Europäerin",
    "pron": "dea oi-ro-pé-a",
    "es": "el europeo / la europea",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Länder",
    "level": "B1",
    "plural": "die Europäer / -innen",
    "en": "cute 3D avatar of a smiling European man and woman travelers holding passports",
    "exampleSentenceDe": "Viele Europäer reisen im Sommer nach Spanien.",
    "exampleSentenceEs": "Muchos europeos viajan en verano a España.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Europäer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "reisen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Sommer nach Spanien",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "europäisch",
    "pron": "oi-ro-pé-ish",
    "es": "europeo / europea",
    "type": "Adjetivo",
    "category": "Länder",
    "level": "B1",
    "regimen": "Atributivo/Predicativo",
    "exampleSentenceDe": "Die Europäische Union hat siebenundzwanzig Länder.",
    "exampleSentenceEs": "La Unión Europea tiene veintisiete países.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Europäische Union",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "siebenundzwanzig Länder",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Ukraine",
    "pron": "di u-kra-í-ne",
    "es": "Ucrania",
    "type": "Sustantivo (Fem)",
    "category": "Länder",
    "level": "B1",
    "regimen": "Con artículo: aus der / in der Ukraine",
    "en": "waving blue and yellow flag of Ukraine without text",
    "exampleSentenceDe": "Olena kommt aus der Ukraine und lernt Deutsch.",
    "exampleSentenceEs": "Olena viene de Ucrania y aprende alemán.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Olena",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus der Ukraine",
        "role": "complement",
        "order": 3
      },
      {
        "text": "und",
        "role": "complement",
        "order": 4
      },
      {
        "text": "lernt",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "Deutsch",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "der Ukrainer / die Ukrainerin",
    "pron": "dea u-kra-í-na",
    "es": "el ucraniano / la ucraniana",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Länder",
    "level": "B1",
    "plural": "die Ukrainer / -innen",
    "en": "cute 3D avatar of a friendly Ukrainian woman and man smiling in casual clothes with a small blue and yellow ribbon",
    "exampleSentenceDe": "In unserem Kurs sind zwei Ukrainerinnen.",
    "exampleSentenceEs": "En nuestro curso hay dos ucranianas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In unserem Kurs",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zwei Ukrainerinnen",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "der Österreicher / die Österreicherin",
    "pron": "dea ö́s-te-rai-ja",
    "es": "el austriaco / la austriaca",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Länder",
    "level": "B1",
    "plural": "die Österreicher / -innen",
    "en": "cute 3D avatar of a friendly Austrian man and woman smiling with a small red and white ribbon",
    "exampleSentenceDe": "Mein Kollege ist Österreicher und kommt aus Wien.",
    "exampleSentenceEs": "Mi compañero es austriaco y viene de Viena.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Kollege",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Österreicher",
        "role": "complement",
        "order": 3
      },
      {
        "text": "und",
        "role": "complement",
        "order": 4
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "aus Wien",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "der Schweizer / die Schweizerin",
    "pron": "dea shvái-tsa",
    "es": "el suizo / la suiza",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Länder",
    "level": "B1",
    "plural": "die Schweizer / -innen",
    "en": "cute 3D avatar of a friendly Swiss man and woman smiling with a small red square white-cross emblem",
    "exampleSentenceDe": "Die Schweizer sprechen oft mehrere Sprachen.",
    "exampleSentenceEs": "Los suizos hablan a menudo varios idiomas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Schweizer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sprechen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "oft mehrere Sprachen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Grieche / die Griechin",
    "pron": "dea grí-je",
    "es": "el griego / la griega",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Länder",
    "level": "B1",
    "plural": "die Griechen / -innen",
    "en": "cute 3D avatar of a friendly Greek man and woman smiling beside a small blue and white olive branch emblem",
    "exampleSentenceDe": "Unsere Nachbarn sind Griechen aus Athen.",
    "exampleSentenceEs": "Nuestros vecinos son griegos de Atenas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Nachbarn",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Griechen aus Athen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Türke / die Türkin",
    "pron": "dea tǘr-ke",
    "es": "el turco / la turca",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Länder",
    "level": "B1",
    "plural": "die Türken / -innen",
    "en": "cute 3D avatar of a friendly Turkish man and woman smiling holding warm tulip-shaped tea glasses",
    "exampleSentenceDe": "Viele Türken leben schon lange in Deutschland.",
    "exampleSentenceEs": "Muchos turcos viven desde hace tiempo en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Türken",
        "role": "subject",
        "order": 1
      },
      {
        "text": "leben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schon lange in Deutschland",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Bundeskanzler / die Bundeskanzlerin",
    "pron": "dea bún-des-kants-la",
    "es": "el canciller federal / la canciller",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Bundeskanzler / -innen",
    "en": "cute 3D avatar of a formal federal chancellor in a dark suit speaking at a wooden podium",
    "exampleSentenceDe": "Der Bundeskanzler spricht heute im Bundestag.",
    "exampleSentenceEs": "El canciller federal habla hoy en el Parlamento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Bundeskanzler",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spricht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute im Bundestag",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Bundesland",
    "pron": "das bún-des-lant",
    "es": "el estado federado (Länder)",
    "type": "Sustantivo (Neutro)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Bundesländer",
    "exampleSentenceDe": "Deutschland besteht aus sechzehn Bundesländern.",
    "exampleSentenceEs": "Alemania consta de dieciséis estados federados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Deutschland",
        "role": "subject",
        "order": 1
      },
      {
        "text": "besteht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus sechzehn Bundesländern",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Bundestag",
    "pron": "dea bún-des-tak",
    "es": "el Parlamento Federal alemán",
    "type": "Sustantivo (Masc)",
    "category": "Politik",
    "level": "B1",
    "regimen": "Singular",
    "en": "historic German Reichstag parliament building with its iconic glass dome in Berlin",
    "exampleSentenceDe": "Der Deutsche Bundestag hat seinen Sitz in Berlin.",
    "exampleSentenceEs": "El Parlamento Federal alemán tiene su sede en Berlín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Deutsche Bundestag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "seinen Sitz in Berlin",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Bundespräsident / die Bundespräsidentin",
    "pron": "dea bún-des-pre-zi-dent",
    "es": "el presidente federal / la presidenta",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Bundespräsidenten / -innen",
    "en": "cute 3D avatar of a dignified federal president in formal attire standing beside a ceremonial flag",
    "exampleSentenceDe": "Der Bundespräsident repräsentiert die Bundesrepublik.",
    "exampleSentenceEs": "El presidente federal representa a la República Federal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Bundespräsident",
        "role": "subject",
        "order": 1
      },
      {
        "text": "repräsentiert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Bundesrepublik",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Bürgermeister / die Bürgermeisterin",
    "pron": "dea bǘr-ga-mais-ta",
    "es": "el alcalde / la alcaldesa",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Bürgermeister / -innen",
    "en": "cute 3D avatar of a smiling city mayor wearing a formal suit and ceremonial sash",
    "exampleSentenceDe": "Der Bürgermeister eröffnet das neue Bürgerbüro.",
    "exampleSentenceEs": "El alcalde inaugura la nueva oficina ciudadana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Bürgermeister",
        "role": "subject",
        "order": 1
      },
      {
        "text": "eröffnet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das neue Bürgerbüro",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Gemeinde",
    "pron": "di gue-máin-de",
    "es": "el municipio / comunidad",
    "type": "Sustantivo (Fem)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Gemeinden",
    "exampleSentenceDe": "Unsere Gemeinde baut einen neuen Kindergarten.",
    "exampleSentenceEs": "Nuestro municipio construye un nuevo jardín de infancia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Gemeinde",
        "role": "subject",
        "order": 1
      },
      {
        "text": "baut",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "einen neuen Kindergarten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Minister / die Ministerin",
    "pron": "dea mi-nís-ta",
    "es": "el ministro / la ministra",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Minister / -innen",
    "en": "cute 3D avatar of a government minister holding an official leather portfolio folder",
    "exampleSentenceDe": "Die Ministerin stellt ein neues Gesetz vor.",
    "exampleSentenceEs": "La ministra presenta una nueva ley.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Ministerin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stellt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein neues Gesetz",
        "role": "complement",
        "order": 3
      },
      {
        "text": "vor",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Parlament",
    "pron": "das par-la-mént",
    "es": "el parlamento",
    "type": "Sustantivo (Neutro)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Parlamente",
    "en": "grand semicircular parliamentary assembly hall with wooden seats and speaker podium",
    "exampleSentenceDe": "Das Parlament entscheidet über neue Steuern.",
    "exampleSentenceEs": "El parlamento decide sobre nuevos impuestos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Parlament",
        "role": "subject",
        "order": 1
      },
      {
        "text": "entscheidet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über neue Steuern",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Partei",
    "pron": "di par-tái",
    "es": "el partido político",
    "type": "Sustantivo (Fem)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Parteien",
    "exampleSentenceDe": "Welche Partei hat die letzte Wahl gewonnen?",
    "exampleSentenceEs": "¿Qué partido ha ganado las últimas elecciones?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welche Partei",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die letzte Wahl",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gewonnen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Regierung",
    "pron": "di re-guí-rung",
    "es": "el gobierno",
    "type": "Sustantivo (Fem)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Regierungen",
    "exampleSentenceDe": "Die Regierung plant eine Reform für Familien.",
    "exampleSentenceEs": "El gobierno planea una reforma para las familias.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Regierung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "plant",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Reform für Familien",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kanton (CH)",
    "pron": "dea kan-tón",
    "es": "el cantón (división suiza)",
    "type": "Sustantivo (Masc)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Kantone",
    "exampleSentenceDe": "Die Schweiz hat sechsundzwanzig Kantone.",
    "exampleSentenceEs": "Suiza tiene veintiséis cantones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Schweiz",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sechsundzwanzig Kantone",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Anrede",
    "pron": "di án-re-de",
    "es": "el encabezamiento / tratamiento",
    "type": "Sustantivo (Fem)",
    "category": "Kommunikation",
    "level": "B1",
    "plural": "die Anreden",
    "exampleSentenceDe": "Vergessen Sie im formellen Brief die Anrede nicht.",
    "exampleSentenceEs": "No olvide el encabezamiento en la carta formal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vergessen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "im formellen Brief die Anrede nicht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Asyl",
    "pron": "das a-zǘl",
    "es": "el asilo (político)",
    "type": "Sustantivo (Neutro)",
    "category": "Gesellschaft",
    "level": "B1",
    "regimen": "um Asyl bitten",
    "exampleSentenceDe": "Viele Menschen auf der Flucht bitten um Asyl.",
    "exampleSentenceEs": "Muchas personas que huyen piden asilo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Menschen auf der Flucht",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bitten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "um Asyl",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Bekannte / die Bekannte",
    "pron": "dea be-kán-te",
    "es": "el conocido / la conocida",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Personen",
    "level": "B1",
    "regimen": "Declinación adjetival",
    "en": "cute 3D avatar of two friendly acquaintances waving warmly to each other",
    "exampleSentenceDe": "In Hannover wohnen gute Bekannte von mir.",
    "exampleSentenceEs": "En Hannover viven buenos conocidos míos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Hannover",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wohnen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gute Bekannte von mir",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "der Bürger / die Bürgerin",
    "pron": "dea bǘr-ga",
    "es": "el ciudadano / la ciudadana",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Bürger / -innen",
    "en": "cute 3D avatar of diverse smiling city citizens standing side by side",
    "exampleSentenceDe": "EU-Bürger dürfen überall in Europa arbeiten.",
    "exampleSentenceEs": "Los ciudadanos de la UE pueden trabajar en toda Europa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "EU-Bürger",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dürfen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "überall in Europa",
        "role": "complement",
        "order": 3
      },
      {
        "text": "arbeiten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Bürgerbüro",
    "pron": "das bǘr-ga-bü-ro",
    "es": "la oficina de atención ciudadana",
    "type": "Sustantivo (Neutro)",
    "category": "Behörden",
    "level": "B1",
    "plural": "die Bürgerbüros",
    "en": "neat municipal citizen registration office building with service desk counter inside",
    "exampleSentenceDe": "Fragen zum Ausweis klären Sie im Bürgerbüro.",
    "exampleSentenceEs": "Las dudas sobre el documento se aclaran en la oficina ciudadana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Fragen zum Ausweis",
        "role": "complement",
        "order": 1
      },
      {
        "text": "klären",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "im Bürgerbüro",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Ehegatte / die Ehegattin",
    "pron": "dea é-e-ga-te",
    "es": "el cónyuge / esposo / esposa",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Ehegatten / -innen",
    "en": "cute 3D avatar of a happy married husband and wife wearing golden wedding rings",
    "exampleSentenceDe": "Für Ehegatten gibt es oft gemeinsame Tarife.",
    "exampleSentenceEs": "Para cónyuges suele haber tarifas conjuntas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für Ehegatten",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft gemeinsame Tarife",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Ehepaar",
    "pron": "das é-e-par",
    "es": "el matrimonio / pareja casada",
    "type": "Sustantivo (Neutro)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Ehepaare",
    "en": "cute 3D avatar of a warm smiling married couple standing arm in arm",
    "exampleSentenceDe": "Das Ehepaar unter uns hat zwei kleine Kinder.",
    "exampleSentenceEs": "El matrimonio de abajo tiene dos niños pequeños.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Ehepaar unter uns",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zwei kleine Kinder",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Einwohner / die Einwohnerin",
    "pron": "dea áin-vo-na",
    "es": "el habitante / la habitante",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Einwohner / -innen",
    "en": "cute 3D avatar of friendly neighborhood inhabitants standing in front of town houses",
    "exampleSentenceDe": "Hamburg hat fast zwei Millionen Einwohner.",
    "exampleSentenceEs": "Hamburgo tiene casi dos millones de habitantes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hamburg",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fast zwei Millionen Einwohner",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Enkel",
    "pron": "dea én-kel",
    "es": "el nieto",
    "type": "Sustantivo (Masc)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Enkel",
    "en": "cute 3D avatar of a cheerful young grandson boy smiling with a colorful school backpack",
    "exampleSentenceDe": "Alle meine Enkel gehen schon in die Grundschule.",
    "exampleSentenceEs": "Todos mis nietos van ya a la escuela primaria.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle meine Enkel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schon in die Grundschule",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Erwachsene / die Erwachsene",
    "pron": "dea ea-vák-ze-ne",
    "es": "el adulto / la adulta",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Personen",
    "level": "B1",
    "regimen": "Declinación adjetival",
    "en": "cute 3D avatar of an adult man and woman wearing smart casual clothes",
    "exampleSentenceDe": "Erwachsene zahlen acht Euro Eintritt im Museum.",
    "exampleSentenceEs": "Los adultos pagan ocho euros de entrada en el museo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Erwachsene",
        "role": "subject",
        "order": 1
      },
      {
        "text": "zahlen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "acht Euro Eintritt im Museum",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Familienname",
    "pron": "dea fa-mí-lien-na-me",
    "es": "el apellido",
    "type": "Sustantivo (Masc)",
    "category": "Personen",
    "level": "A1–B1",
    "plural": "die Familiennamen",
    "exampleSentenceDe": "Tragen Sie bitte hier Ihren Familiennamen ein.",
    "exampleSentenceEs": "Escriba aquí su apellido, por favor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Tragen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte hier Ihren Familiennamen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Friede / Frieden",
    "pron": "dea frí-de / frí-den",
    "es": "la paz",
    "type": "Sustantivo (Masc)",
    "category": "Gesellschaft",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Alle Menschen wünschen sich ein Leben in Frieden.",
    "exampleSentenceEs": "Todas las personas desean una vida en paz.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle Menschen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wünschen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich ein Leben in Frieden",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Gast",
    "pron": "dea gast",
    "es": "el invitado / huésped / cliente",
    "type": "Sustantivo (Masc)",
    "category": "Personen",
    "level": "A1–B1",
    "plural": "die Gäste",
    "en": "cute 3D avatar of a smiling dinner guest holding a small wrapped gift box",
    "exampleSentenceDe": "Am Samstagabend bekommen wir Gäste zum Essen.",
    "exampleSentenceEs": "El sábado por la noche recibimos invitados a cenar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Samstagabend",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bekommen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Gäste zum Essen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "geboren werden",
    "pron": "gue-bó-ren vér-den",
    "es": "nacer",
    "type": "Verbo pasivo irr.",
    "category": "Personen",
    "level": "A1–B1",
    "regimen": "wurde geboren, ist geboren worden",
    "exampleSentenceDe": "Wann und wo sind Sie geboren?",
    "exampleSentenceEs": "¿Cuándo y dónde nació usted?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wann und wo",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "geboren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Geburt",
    "pron": "di gue-búrt",
    "es": "el nacimiento / parto",
    "type": "Sustantivo (Fem)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Geburten",
    "exampleSentenceDe": "Wir gratulieren herzlich zur Geburt eurer Tochter!",
    "exampleSentenceEs": "¡Felicitamos cordialmente por el nacimiento de vuestra hija!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gratulieren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "herzlich zur Geburt eurer Tochter",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Gegner / die Gegnerin",
    "pron": "dea guék-na",
    "es": "el oponente / adversario",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Gegner / -innen",
    "en": "cute 3D avatar of two opposing sports players in red and blue jerseys facing each other",
    "exampleSentenceDe": "Die Mannschaft aus Frankreich war ein starker Gegner.",
    "exampleSentenceEs": "El equipo de Francia fue un rival fuerte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Mannschaft aus Frankreich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein starker Gegner",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Generation",
    "pron": "di gue-ne-ra-tsión",
    "es": "la generación",
    "type": "Sustantivo (Fem)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Generationen",
    "exampleSentenceDe": "In diesem Haus leben drei Generationen zusammen.",
    "exampleSentenceEs": "En esta casa viven juntas tres generaciones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In diesem Haus",
        "role": "complement",
        "order": 1
      },
      {
        "text": "leben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "drei Generationen",
        "role": "subject",
        "order": 3
      },
      {
        "text": "zusammen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Geschlecht",
    "pron": "das gue-shléjt",
    "es": "el sexo / género",
    "type": "Sustantivo (Neutro)",
    "category": "Behörden",
    "level": "A2–B1",
    "plural": "die Geschlechter",
    "exampleSentenceDe": "Bitte kreuzen Sie Ihr Geschlecht auf dem Formular an.",
    "exampleSentenceEs": "Por favor, marque su sexo en el formulario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kreuzen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Ihr Geschlecht auf dem Formular",
        "role": "complement",
        "order": 4
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Gewalt",
    "pron": "di gue-vált",
    "es": "la violencia / fuerza",
    "type": "Sustantivo (Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Gewalten",
    "exampleSentenceDe": "Die Tür ließ sich nur mit Gewalt öffnen.",
    "exampleSentenceEs": "La puerta solo se pudo abrir por la fuerza.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Tür",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ließ",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich nur mit Gewalt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "öffnen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Gott",
    "pron": "dea got",
    "es": "Dios / el dios",
    "type": "Sustantivo (Masc)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Götter (Gott sei Dank)",
    "exampleSentenceDe": "Gott sei Dank ist beim Unfall niemand verletzt worden.",
    "exampleSentenceEs": "Gracias a Dios nadie resultó herido en el accidente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Gott sei Dank",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "beim Unfall",
        "role": "complement",
        "order": 3
      },
      {
        "text": "niemand",
        "role": "subject",
        "order": 4
      },
      {
        "text": "verletzt worden",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der Halbtagsjob",
    "pron": "dea jálp-taks-yop",
    "es": "el trabajo de media jornada",
    "type": "Sustantivo (Masc)",
    "category": "Alltag",
    "level": "B1",
    "plural": "die Halbtagsjobs",
    "exampleSentenceDe": "Nach der Geburt sucht sie einen Halbtagsjob.",
    "exampleSentenceEs": "Tras el nacimiento busca un trabajo de media jornada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach der Geburt",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "einen Halbtagsjob",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Heimweh",
    "pron": "das jáim-ve",
    "es": "la nostalgia / añoranza",
    "type": "Sustantivo (Neutro)",
    "category": "Gefühle",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Am Anfang hatte ich oft Heimweh nach meiner Familie.",
    "exampleSentenceEs": "Al principio sentía a menudo nostalgia de mi familia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Anfang",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hatte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft Heimweh nach meiner Familie",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Held / die Heldin",
    "pron": "dea jelt",
    "es": "el héroe / la heroína",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Personen",
    "level": "B1",
    "plural": "die Helden / -innen",
    "en": "heroic figure wearing a bright red cape standing proudly",
    "exampleSentenceDe": "Im Film rettet der Held viele Menschen.",
    "exampleSentenceEs": "En la película el héroe salva a muchas personas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Film",
        "role": "complement",
        "order": 1
      },
      {
        "text": "rettet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Held",
        "role": "subject",
        "order": 3
      },
      {
        "text": "viele Menschen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "her|stellen",
    "pron": "jér-shte-len",
    "es": "fabricar / establecer (contacto)",
    "type": "Verbo separable",
    "category": "Wirtschaft",
    "level": "B1",
    "regimen": "+ Akk / stellt her, stellte her, hat hergestellt",
    "exampleSentenceDe": "Die Firma stellt Teile für Computer her.",
    "exampleSentenceEs": "La empresa fabrica piezas para ordenadores.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stellt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Teile für Computer",
        "role": "complement",
        "order": 3
      },
      {
        "text": "her",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "heimlich",
    "pron": "jáim-lij",
    "es": "a escondidas / en secreto",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: heimlicher",
    "exampleSentenceDe": "Ich habe gesehen, dass er heimlich raucht.",
    "exampleSentenceEs": "He visto que él fuma a escondidas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gesehen,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "dass er heimlich",
        "role": "complement",
        "order": 4
      },
      {
        "text": "raucht",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "das Herkunftsland",
    "pron": "das jér-kunfts-lant",
    "es": "el país de origen",
    "type": "Sustantivo (Neutro)",
    "category": "Formulare",
    "level": "B1",
    "plural": "die Herkunftsländer",
    "exampleSentenceDe": "Tragen Sie auf dem Formular Ihr Herkunftsland ein.",
    "exampleSentenceEs": "Anote en el formulario su país de origen.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Tragen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "auf dem Formular Ihr Herkunftsland",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Jugend",
    "pron": "di yú-guent",
    "es": "la juventud",
    "type": "Sustantivo (Fem)",
    "category": "Alter",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "In meiner Jugend war ich oft im Ausland.",
    "exampleSentenceEs": "En mi juventud estuve a menudo en el extranjero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In meiner Jugend",
        "role": "complement",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft im Ausland",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Kindheit",
    "pron": "di kínt-jait",
    "es": "la infancia / niñez",
    "type": "Sustantivo (Fem)",
    "category": "Alter",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Er hatte eine sehr glückliche Kindheit.",
    "exampleSentenceEs": "Él tuvo una infancia muy feliz.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hatte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine sehr glückliche Kindheit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "klären",
    "pron": "klé-ren",
    "es": "aclarar / resolver",
    "type": "Verbo regular",
    "category": "Konflikte",
    "level": "B1",
    "regimen": "+ Akk / klärt, klärte, hat geklärt",
    "exampleSentenceDe": "Wir müssen dieses Problem schnell klären.",
    "exampleSentenceEs": "Tenemos que aclarar este problema rápido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dieses Problem schnell",
        "role": "complement",
        "order": 3
      },
      {
        "text": "klären",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Kontakt",
    "pron": "dea kon-tákt",
    "es": "el contacto / relación",
    "type": "Sustantivo (Masc)",
    "category": "Alltag",
    "level": "A2–B1",
    "plural": "die Kontakte",
    "exampleSentenceDe": "Ich habe viel Kontakt zu meinen Kollegen.",
    "exampleSentenceEs": "Tengo mucho contacto con mis compañeros.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viel Kontakt zu meinen Kollegen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "melden",
    "pron": "mél-den",
    "es": "informar / presentarse (sich)",
    "type": "Verbo regular",
    "category": "Kommunikation",
    "level": "A2–B1",
    "regimen": "+ Akk / meldet, meldete, hat gemeldet",
    "exampleSentenceDe": "Ich melde mich morgen bei dir.",
    "exampleSentenceEs": "Mañana me pongo en contacto contigo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "melde",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich morgen bei dir",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mitteilung",
    "pron": "di mít-tai-lung",
    "es": "la comunicación / aviso",
    "type": "Sustantivo (Fem)",
    "category": "Kommunikation",
    "level": "B1",
    "plural": "die Mitteilungen",
    "exampleSentenceDe": "Ich habe eine wichtige Mitteilung für Sie.",
    "exampleSentenceEs": "Tengo un aviso importante para usted.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine wichtige Mitteilung für Sie",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "nach|denken",
    "pron": "náj-den-ken",
    "es": "reflexionar / pensar en",
    "type": "Verbo separable irr.",
    "category": "Gefühle",
    "level": "B1",
    "regimen": "über + Akk / denkt nach, dachte nach, hat nachgedacht",
    "exampleSentenceDe": "Lass mich kurz darüber nachdenken.",
    "exampleSentenceEs": "Déjame reflexionar sobre eso un momento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Lass",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "mich kurz darüber",
        "role": "complement",
        "order": 2
      },
      {
        "text": "nachdenken",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "ordentlich",
    "pron": "ór-dent-lij",
    "es": "ordenado / cuidadoso",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: ordentlicher",
    "exampleSentenceDe": "Mein Bruder ist ein sehr ordentlicher Mensch.",
    "exampleSentenceEs": "Mi hermano es una persona muy ordenada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Bruder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein sehr ordentlicher Mensch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "persönlich",
    "pron": "pea-zö́n-lij",
    "es": "personal / personalmente",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: persönlicher",
    "exampleSentenceDe": "Bitte geben Sie den Brief persönlich ab.",
    "exampleSentenceEs": "Por favor, entregue la carta personalmente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "geben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Brief persönlich",
        "role": "complement",
        "order": 4
      },
      {
        "text": "ab",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Pflicht",
    "pron": "di pflijt",
    "es": "el deber / obligación",
    "type": "Sustantivo (Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Pflichten",
    "exampleSentenceDe": "Als Bürger haben wir Rechte und Pflichten.",
    "exampleSentenceEs": "Como ciudadanos tenemos derechos y deberes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Als Bürger",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Rechte und Pflichten",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Recht",
    "pron": "das rejt",
    "es": "el derecho / la razón",
    "type": "Sustantivo (Neutro)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Rechte",
    "exampleSentenceDe": "Jeder Mensch hat das Recht auf Freiheit.",
    "exampleSentenceEs": "Toda persona tiene derecho a la libertad.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Jeder Mensch",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Recht auf Freiheit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Rücksicht",
    "pron": "di rǘk-zijt",
    "es": "la consideración / respeto",
    "type": "Sustantivo (Fem)",
    "category": "Gesellschaft",
    "level": "B1",
    "regimen": "auf + Akk (nehmen)",
    "exampleSentenceDe": "Nehmen Sie Rücksicht auf die Nachbarn.",
    "exampleSentenceEs": "Tenga consideración con los vecinos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nehmen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "Rücksicht auf die Nachbarn",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Schwiegervater",
    "pron": "dea shví-gua-fa-ta",
    "es": "el suegro",
    "type": "Sustantivo (Masc)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Schwiegerväter",
    "en": "a cute 3D isometric avatar of a friendly older father-in-law smiling in a cozy cardigan",
    "exampleSentenceDe": "Mein Schwiegervater arbeitet als Lehrer.",
    "exampleSentenceEs": "Mi suegro trabaja como profesor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Schwiegervater",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "als Lehrer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "schweizerisch",
    "pron": "shvái-tse-rish",
    "es": "suizo / suiza (adj.)",
    "type": "Adjetivo",
    "category": "Länder",
    "level": "B1",
    "regimen": "Atributivo/Predicativo",
    "exampleSentenceDe": "Das schweizerische Bankensystem ist sehr bekannt.",
    "exampleSentenceEs": "El sistema bancario suizo es muy conocido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das schweizerische Bankensystem",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr bekannt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Staat",
    "pron": "dea shtat",
    "es": "el Estado",
    "type": "Sustantivo (Masc)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Staaten",
    "exampleSentenceDe": "Der Staat fördert dieses neue Umweltprojekt.",
    "exampleSentenceEs": "El Estado financia este nuevo proyecto medioambiental.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Staat",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fördert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dieses neue Umweltprojekt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Stadtpräsident",
    "pron": "dea shtát-pre-zi-dent",
    "es": "el alcalde (Suiza)",
    "type": "Sustantivo (Masc)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Stadtpräsidenten (CH)",
    "en": "a cute 3D isometric avatar of a smiling city mayor wearing a formal dark suit",
    "exampleSentenceDe": "Der Stadtpräsident eröffnet das neue Fest.",
    "exampleSentenceEs": "El alcalde (suizo) inaugura la nueva fiesta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Stadtpräsident",
        "role": "subject",
        "order": 1
      },
      {
        "text": "eröffnet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das neue Fest",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Ständerat",
    "pron": "dea shtén-de-rat",
    "es": "el Consejo de los Estados (Suiza)",
    "type": "Sustantivo (Masc)",
    "category": "Politik",
    "level": "B1",
    "plural": "die Ständeräte (CH)",
    "exampleSentenceDe": "Der Ständerat diskutiert über neue Gesetze.",
    "exampleSentenceEs": "El Consejo de los Estados debate sobre nuevas leyes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Ständerat",
        "role": "subject",
        "order": 1
      },
      {
        "text": "diskutiert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über neue Gesetze",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "treu",
    "pron": "troi",
    "es": "fiel / leal",
    "type": "Adjetivo",
    "category": "Charakter",
    "level": "B1",
    "regimen": "Comp: treuer",
    "exampleSentenceDe": "Er ist ein sehr treuer Kunde von uns.",
    "exampleSentenceEs": "Él es un cliente nuestro muy fiel.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein sehr treuer Kunde von uns",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ukrainisch",
    "pron": "u-kra-í-nish",
    "es": "ucraniano / ucraniana (adj.)",
    "type": "Adjetivo",
    "category": "Länder",
    "level": "B1",
    "regimen": "Atributivo/Predicativo",
    "exampleSentenceDe": "Ich mag das ukrainische Essen sehr.",
    "exampleSentenceEs": "Me gusta mucho la comida ucraniana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "mag",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das ukrainische Essen sehr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Ursache",
    "pron": "di úr-za-je",
    "es": "la causa / motivo",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Ursachen",
    "exampleSentenceDe": "Kennt die Polizei schon die Unfallursache?",
    "exampleSentenceEs": "¿Conoce ya la policía la causa del accidente?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Kennt",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "die Polizei",
        "role": "subject",
        "order": 2
      },
      {
        "text": "schon die Unfallursache",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Urteil",
    "pron": "das úr-tail",
    "es": "la sentencia / juicio / opinión",
    "type": "Sustantivo (Neutro)",
    "category": "Gesellschaft",
    "level": "B1",
    "plural": "die Urteile",
    "exampleSentenceDe": "Dein Urteil ist für mich wirklich wichtig.",
    "exampleSentenceEs": "Tu opinión es de verdad importante para mí.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dein Urteil",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "für mich wirklich wichtig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Verhalten",
    "pron": "das fea-jál-ten",
    "es": "el comportamiento",
    "type": "Sustantivo (Neutro)",
    "category": "Abstrakte",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Ich bewundere dein Verhalten in dieser Situation.",
    "exampleSentenceEs": "Admiro tu comportamiento en esta situación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bewundere",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dein Verhalten in dieser Situation",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Verhältnis",
    "pron": "das fea-jélt-nis",
    "es": "la relación / proporción",
    "type": "Sustantivo (Neutro)",
    "category": "Familie",
    "level": "B1",
    "plural": "die Verhältnisse",
    "exampleSentenceDe": "Ich habe ein sehr gutes Verhältnis zu meinen Eltern.",
    "exampleSentenceEs": "Tengo una muy buena relación con mis padres.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein sehr gutes Verhältnis zu meinen Eltern",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "weigern (sich)",
    "pron": "vái-guern",
    "es": "negarse / rehusar",
    "type": "Verbo reflexivo",
    "category": "Kommunikation",
    "level": "B1",
    "regimen": "weigert sich, weigerte sich, hat sich geweigert",
    "exampleSentenceDe": "Ich weigere mich, diese schwere Arbeit zu tun.",
    "exampleSentenceEs": "Me niego a hacer este trabajo pesado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "weigere",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "diese schwere Arbeit",
        "role": "complement",
        "order": 4
      },
      {
        "text": "zu tun",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der Witz",
    "pron": "dea vits",
    "es": "el chiste / la broma",
    "type": "Sustantivo (Masc)",
    "category": "Kommunikation",
    "level": "B1",
    "plural": "die Witze",
    "exampleSentenceDe": "Wir haben Witze erzählt und viel gelacht.",
    "exampleSentenceEs": "Hemos contado chistes y reído mucho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Witze",
        "role": "complement",
        "order": 3
      },
      {
        "text": "erzählt",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "und viel",
        "role": "complement",
        "order": 5
      },
      {
        "text": "gelacht",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "wütend",
    "pron": "vǘ-tent",
    "es": "furioso / enfadado",
    "type": "Adjetivo",
    "category": "Gefühle",
    "level": "B1",
    "regimen": "auf + Akk",
    "exampleSentenceDe": "Warum bist du heute so wütend auf mich?",
    "exampleSentenceEs": "¿Por qué estás hoy tan furioso conmigo?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Warum",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "du",
        "role": "subject",
        "order": 3
      },
      {
        "text": "heute so wütend auf mich",
        "role": "complement",
        "order": 4
      }
    ]
  }
]
},
{
  id: 4,
  title: "Kapitel 4: Basisverben & Adjektive",
  icon: <Sparkles size={20} />,
  emoji: "✨",
  words: [{
    de: "sein",
    pron: "záin",
    es: "ser / estar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich bin hier.",
    exampleSentenceEs: "Yo estoy aquí.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    regimen: "+ Nominativ"
  }, {
    de: "haben",
    pron: "já-ben",
    es: "tener / haber",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich habe Hunger.",
    exampleSentenceEs: "Yo tengo hambre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Hunger", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "werden",
    pron: "vér-den",
    es: "llegar a ser / convertirse",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich werde Arzt.",
    exampleSentenceEs: "Yo seré médico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "werde", role: "verb_p1", order: 2 },
      { text: "Arzt", role: "complement", order: 3 }
    ],
    regimen: "+ Nominativ (predicado)"
  }, {
    de: "machen",
    pron: "má-jen",
    es: "hacer",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich mache einen Kaffee.",
    exampleSentenceEs: "Yo hago un café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "einen Kaffee", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "tun",
    pron: "tún",
    es: "hacer (una acción)",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Was tust du heute?",
    exampleSentenceEs: "¿Qué haces hoy?",
    exampleSentenceDeBlocks: [
      { text: "Was", role: "subject", order: 1 },
      { text: "tust", role: "verb_p1", order: 2 },
      { text: "du heute", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "sagen",
    pron: "sá-guen",
    es: "decir",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich sage \"Hallo\".",
    exampleSentenceEs: "Yo digo \"Hola\".",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sage", role: "verb_p1", order: 2 },
      { text: "\"Hallo\"", role: "complement", order: 3 }
    ],
    regimen: "+ Dativ + Akkusativ"
  }, {
    de: "gehen",
    pron: "gué-en",
    es: "ir / andar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich gehe nach Hause.",
    exampleSentenceEs: "Yo voy a casa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "nach Hause", role: "complement", order: 3 }
    ],
    regimen: "+ Nominativ"
  }, {
    de: "kommen",
    pron: "kó-men",
    es: "venir",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich komme aus Spanien.",
    exampleSentenceEs: "Yo vengo de España.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "komme", role: "verb_p1", order: 2 },
      { text: "aus Spanien", role: "complement", order: 3 }
    ],
    regimen: "aus/von + Dativo"
  }, {
    de: "sehen",
    pron: "zé-en",
    es: "ver",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich sehe den Mann.",
    exampleSentenceEs: "Yo veo al hombre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "den Mann", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "wissen",
    pron: "ví-sen",
    es: "saber (información)",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich weiß die Antwort.",
    exampleSentenceEs: "Yo sé la respuesta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "weiß", role: "verb_p1", order: 2 },
      { text: "die Antwort", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ; ich weiß"
  }, {
    de: "kennen",
    pron: "ké-nen",
    es: "conocer (personas/lugares)",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich kenne den Mann.",
    exampleSentenceEs: "Yo conozco al hombre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kenne", role: "verb_p1", order: 2 },
      { text: "den Mann", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "finden",
    pron: "fín-den",
    es: "encontrar / parecer",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich finde das Buch gut.",
    exampleSentenceEs: "Yo encuentro el libro bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "finde", role: "verb_p1", order: 2 },
      { text: "das Buch gut", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "bleiben",
    pron: "blái-ben",
    es: "quedarse",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich bleibe hier.",
    exampleSentenceEs: "Yo me quedo aquí.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bleibe", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    regimen: "+ sein, irr. (blieb)"
  }, {
    de: "lassen",
    pron: "lá-sen",
    es: "dejar / permitir",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich lasse das Fenster offen.",
    exampleSentenceEs: "Yo dejo la ventana abierta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lasse", role: "verb_p1", order: 2 },
      { text: "das Fenster offen", role: "complement", order: 3 }
    ],
    regimen: "+ Akk. (er lässt)"
  }, {
    de: "denken",
    pron: "dén-ken",
    es: "pensar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich denke an dich.",
    exampleSentenceEs: "Pienso en ti.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "denke", role: "verb_p1", order: 2 },
      { text: "an dich", role: "complement", order: 3 }
    ],
    regimen: "an/über + Akkusativ"
  }, {
    de: "groß / klein",
    pron: "grós  kláin",
    es: "grande / pequeño",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Haus ist groß. Das Haus ist nicht klein.",
    exampleSentenceEs: "La casa es grande. La casa no es pequeña.",
    exampleSentenceDeBlocks: [
      { text: "Das Haus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    regimen: "≠ klein"
  }, {
    de: "gut / schlecht",
    pron: "gút  shlejt",
    es: "bueno / malo",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Essen ist gut.",
    exampleSentenceEs: "La comida está buena.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "Essen", role: "verb_p1", order: 2 },
      { text: "ist gut", role: "complement", order: 3 }
    ],
    regimen: "≠ schlecht / gut"
  }, {
    de: "neu / alt",
    pron: "noi  alt",
    es: "nuevo / viejo",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Mein Haus ist alt. Aber mein Auto ist neu.",
    exampleSentenceEs: "Mi casa es vieja. Pero mi coche es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Mein Haus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "alt", role: "complement", order: 3 }
    ],
    regimen: "≠ alt / neu"
  }, {
    de: "schön / hässlich",
    pron: "shön  jés-lij",
    es: "bonito / feo",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Haus ist schön.",
    exampleSentenceEs: "La casa es bonita.",
    exampleSentenceDeBlocks: [
      { text: "Das Haus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    regimen: "≠ hässlich"
  }, {
    de: "schwer / leicht",
    pron: "shvéa  láijt",
    es: "pesado (difícil) / ligero (fácil)",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Der Koffer ist schwer.",
    exampleSentenceEs: "La maleta es pesada.",
    exampleSentenceDeBlocks: [
      { text: "Der Koffer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schwer", role: "complement", order: 3 }
    ],
    regimen: "≠ leicht / schwer"
  }, {
    de: "richtig / falsch",
    pron: "ríj-tij  falsh",
    es: "correcto / incorrecto",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das ist richtig.",
    exampleSentenceEs: "Eso es correcto.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "richtig", role: "complement", order: 3 }
    ],
    regimen: "≠ falsch"
  }, {
    de: "wichtig",
    pron: "víj-tij",
    es: "importante",
    type: "Adjetivo",
    category: "Adjektive",
    exampleSentenceDe: "Das ist wichtig.",
    exampleSentenceEs: "Esto es importante.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "wichtig", role: "complement", order: 3 }
    ],
    regimen: "≠ unwichtig"
  }, {
    de: "einfach / schwierig",
    pron: "áin-faj  shví-rij",
    es: "fácil / difícil",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Die Aufgabe ist einfach.",
    exampleSentenceEs: "La tarea es fácil.",
    exampleSentenceDeBlocks: [
      { text: "Die Aufgabe", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "einfach", role: "complement", order: 3 }
    ],
    regimen: "≠ schwierig / einfach"
  }, {
    de: "schnell / langsam",
    pron: "shnel  láng-zam",
    es: "rápido / lento",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Auto ist schnell.",
    exampleSentenceEs: "El coche es rápido.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schnell", role: "complement", order: 3 }
    ],
    regimen: "≠ langsam / schnell"
  }, {
    de: "laut / leise",
    pron: "láut  lái-ze",
    es: "fuerte (sonido) / silencioso",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Radio ist laut. Ich mache das Radio leise.",
    exampleSentenceEs: "La radio está alta. Yo pongo la radio silenciosa.",
    exampleSentenceDeBlocks: [
      { text: "Das Radio", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "laut", role: "complement", order: 3 }
    ],
    regimen: "≠ leise / laut"
  }, {
    de: "hell / dunkel",
    pron: "jel  dún-kel",
    es: "claro (luz) / oscuro",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Licht ist hell.",
    exampleSentenceEs: "La luz es clara.",
    exampleSentenceDeBlocks: [
      { text: "Das Licht", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hell", role: "complement", order: 3 }
    ],
    regimen: "hell ≠ dunkel"
  }, {
    de: "heiß / kalt",
    pron: "jáis  kalt",
    es: "caliente / frío",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Wasser ist heiß.",
    exampleSentenceEs: "El agua está caliente.",
    exampleSentenceDeBlocks: [
      { text: "Das Wasser", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heiß", role: "complement", order: 3 }
    ],
    regimen: "≠ kalt / heiß"
  }, {
    de: "können",
    pron: "kö́-nen",
    es: "poder (habilidad/posibilidad)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich kann Deutsch sprechen.",
    exampleSentenceEs: "Yo puedo hablar alemán.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "Deutsch", role: "complement", order: 3 },
      { text: "sprechen", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Infinitiv (sin zu)"
  }, {
    de: "müssen",
    pron: "mú-sen",
    es: "tener que (obligación)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich muss jetzt nach Hause gehen.",
    exampleSentenceEs: "Yo tengo que ir a casa ahora.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "jetzt nach Hause", role: "complement", order: 3 },
      { text: "gehen", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Infinitiv (sin zu)"
  }, {
    de: "dürfen",
    pron: "dúa-fen",
    es: "poder (permiso)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Hier dürfen Sie parken.",
    exampleSentenceEs: "Aquí puede aparcar.",
    exampleSentenceDeBlocks: [
      { text: "Hier", role: "subject", order: 1 },
      { text: "dürfen", role: "verb_p1", order: 2 },
      { text: "Sie", role: "complement", order: 3 },
      { text: "parken", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Infinitiv sin zu"
  }, {
    de: "sollen",
    pron: "zó-len",
    es: "deber (recomendación/orden)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Du sollst Wasser trinken.",
    exampleSentenceEs: "Tú deberías beber agua.",
    exampleSentenceDeBlocks: [
      { text: "Du", role: "subject", order: 1 },
      { text: "sollst", role: "verb_p1", order: 2 },
      { text: "Wasser", role: "complement", order: 3 },
      { text: "trinken", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Infinitiv (ohne zu)"
  }, {
    de: "wollen",
    pron: "vó-len",
    es: "querer (deseo fuerte)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich will einen Kaffee.",
    exampleSentenceEs: "Yo quiero un café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "will", role: "verb_p1", order: 2 },
      { text: "einen Kaffee", role: "complement", order: 3 }
    ],
    regimen: "+ Infinitiv (sin zu)"
  }, {
    de: "mögen",
    pron: "mö-guen",
    es: "gustar (algo/alguien)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich mag Kaffee.",
    exampleSentenceEs: "Me gusta el café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "Kaffee", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "möchten",
    pron: "mój-ten",
    es: "gustaría (quisiera)",
    type: "Verbo Modal (KII)",
    category: "Modalverben",
    exampleSentenceDe: "Ich möchte einen Kaffee.",
    exampleSentenceEs: "Yo quisiera un café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "einen Kaffee", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ / + Infinitiv"
  }, {
    de: "geben",
    pron: "gué-ben",
    es: "dar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich gebe dir mein Buch.",
    exampleSentenceEs: "Yo te doy mi libro.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gebe", role: "verb_p1", order: 2 },
      { text: "dir mein Buch", role: "complement", order: 3 }
    ],
    regimen: "Dativo (a quién) + Akkusativ (qué)"
  }, {
    de: "nehmen",
    pron: "né-men",
    es: "tomar / agarrar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich nehme einen Kaffee.",
    exampleSentenceEs: "Yo tomo un café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "nehme", role: "verb_p1", order: 2 },
      { text: "einen Kaffee", role: "complement", order: 3 }
    ],
    regimen: "Irregular (nimmt) / + Akkusativ"
  }, {
    de: "brauchen",
    pron: "bráu-jen",
    es: "necesitar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich brauche Wasser.",
    exampleSentenceEs: "Yo necesito agua.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "Wasser", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "helfen",
    pron: "jél-fen",
    es: "ayudar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Kannst du mir helfen?",
    exampleSentenceEs: "¿Puedes ayudarme?",
    exampleSentenceDeBlocks: [
      { text: "Kannst", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "mir", role: "complement", order: 3 },
      { text: "helfen", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "bringen",
    pron: "brín-guen",
    es: "traer",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich bringe dir das Buch.",
    exampleSentenceEs: "Yo te traigo el libro.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bringe", role: "verb_p1", order: 2 },
      { text: "dir das Buch", role: "complement", order: 3 }
    ],
    regimen: "+ Akk./Dat."
  }, {
    de: "schreiben",
    pron: "shrái-ben",
    es: "escribir",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich schreibe eine E-Mail.",
    exampleSentenceEs: "Yo escribo un correo electrónico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schreibe", role: "verb_p1", order: 2 },
      { text: "eine E-Mail", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "lesen",
    pron: "lé-sen",
    es: "leer",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich lese ein Buch.",
    exampleSentenceEs: "Yo leo un libro.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lese", role: "verb_p1", order: 2 },
      { text: "ein Buch", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "sprechen",
    pron: "shpré-jen",
    es: "hablar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich spreche Deutsch.",
    exampleSentenceEs: "Yo hablo alemán.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "spreche", role: "verb_p1", order: 2 },
      { text: "Deutsch", role: "complement", order: 3 }
    ],
    regimen: "+ Akk./mit + Dat."
  }, {
    de: "versuchen",
    pron: "fea-zú-jen",
    es: "intentar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich versuche, Deutsch zu lernen.",
    exampleSentenceEs: "Intento aprender alemán.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "versuche,", role: "verb_p1", order: 2 },
      { text: "Deutsch zu lernen", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "entscheiden",
    pron: "ent-shái-den",
    es: "decidir",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich kann nicht entscheiden.",
    exampleSentenceEs: "Yo no puedo decidir.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "nicht", role: "complement", order: 3 },
      { text: "entscheiden", role: "verb_p2", order: 4 }
    ],
    regimen: "sich + für/Akk"
  }, {
    de: "vergessen",
    pron: "fea-gué-sen",
    es: "olvidar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich vergesse meinen Schlüssel nicht.",
    exampleSentenceEs: "No olvido mi llave.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "vergesse", role: "verb_p1", order: 2 },
      { text: "meinen Schlüssel nicht", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ, irr. (vergisst)"
  }, {
    de: "sich erinnern",
    pron: "ziş ea-í-nen",
    es: "recordar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich erinnere mich an dich.",
    exampleSentenceEs: "Yo te recuerdo a ti.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "erinnere", role: "verb_p1", order: 2 },
      { text: "mich an dich", role: "complement", order: 3 }
    ],
    regimen: "Reflexivo + an+Akk"
  }, {
    de: "passieren",
    pron: "pa-sí-ren",
    es: "suceder",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Was passiert heute?",
    exampleSentenceEs: "¿Qué sucede hoy?",
    exampleSentenceDeBlocks: [
      { text: "Was", role: "subject", order: 1 },
      { text: "passiert", role: "verb_p1", order: 2 },
      { text: "heute", role: "complement", order: 3 }
    ],
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "erzählen",
    pron: "ea-tsé-len",
    es: "narrar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich erzähle eine Geschichte.",
    exampleSentenceEs: "Yo narro una historia.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "erzähle", role: "verb_p1", order: 2 },
      { text: "eine Geschichte", role: "complement", order: 3 }
    ],
    regimen: "+Dat./Akk."
  }, {
    de: "bedeuten",
    pron: "be-dói-ten",
    es: "significar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Was bedeutet das?",
    exampleSentenceEs: "¿Qué significa eso?",
    exampleSentenceDeBlocks: [
      { text: "Was", role: "subject", order: 1 },
      { text: "bedeutet", role: "verb_p1", order: 2 },
      { text: "das", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "beginnen",
    pron: "be-guí-nen",
    es: "comenzar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Der Kurs beginnt heute.",
    exampleSentenceEs: "El curso comienza hoy.",
    exampleSentenceDeBlocks: [
      { text: "Der Kurs", role: "subject", order: 1 },
      { text: "beginnt", role: "verb_p1", order: 2 },
      { text: "heute", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ/mit+Dat"
  }, {
    de: "stehen",
    pron: "shté-en",
    es: "estar de pie",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Der Tisch steht hier.",
    exampleSentenceEs: "La mesa está aquí.",
    exampleSentenceDeBlocks: [
      { text: "Der Tisch", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    regimen: "+ Dativ/Akkusativ (Wo/Wohin)"
  }, {
    de: "stellen",
    pron: "shté-len",
    es: "colocar vertical",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Ich stelle die Flasche auf den Tisch.",
    exampleSentenceEs: "Yo coloco la botella sobre la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "stelle", role: "verb_p1", order: 2 },
      { text: "die Flasche auf den Tisch", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ (wo? Dativ)"
  }, {
    de: "liegen",
    pron: "lí-guen",
    es: "estar acostado",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Ich liege auf dem Bett.",
    exampleSentenceEs: "Yo estoy acostado en la cama.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "liege", role: "verb_p1", order: 2 },
      { text: "auf dem Bett", role: "complement", order: 3 }
    ],
    regimen: "⚠️ Wo? + Dativ"
  }, {
    de: "legen",
    pron: "lé-guen",
    es: "colocar horizontal",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Ich lege das Buch auf den Tisch.",
    exampleSentenceEs: "Yo coloco el libro sobre la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lege", role: "verb_p1", order: 2 },
      { text: "das Buch auf den Tisch", role: "complement", order: 3 }
    ],
    regimen: "Akk.+Wohin? (legen/liegen)"
  },
  {
    de: "aufstehen",
    pron: "áuf-shte-en",
    es: "levantarse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (auf-) / + Nominativo",
    exampleSentenceDe: "Ich stehe um sieben auf.",
    exampleSentenceEs: "Me levanto a las siete.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "stehe", role: "verb_p1", order: 2 },
      { text: "um sieben", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "aufwachen",
    pron: "áuf-va-jen",
    es: "despertarse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (auf-) / + Nominativo",
    exampleSentenceDe: "Ich wache morgens früh auf.",
    exampleSentenceEs: "Me despierto temprano por la mañana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wache", role: "verb_p1", order: 2 },
      { text: "morgens früh", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "einschlafen",
    pron: "áin-shla-fen",
    es: "dormirse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (ein-) / + Nominativo",
    exampleSentenceDe: "Das Kind schläft schnell ein.",
    exampleSentenceEs: "El niño se duerme rápido.",
    exampleSentenceDeBlocks: [
      { text: "Das Kind", role: "subject", order: 1 },
      { text: "schläft", role: "verb_p1", order: 2 },
      { text: "schnell", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "waschen",
    pron: "vá-shen",
    es: "lavar",
    type: "Verbo",
    category: "Alltag",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Ich wasche mein Auto gern.",
    exampleSentenceEs: "Lavo mi coche con gusto.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wasche", role: "verb_p1", order: 2 },
      { text: "mein Auto gern", role: "complement", order: 3 }
    ]
  }, {
        de: "duschen",
    pron: "dú-shen",
    es: "ducharse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Reflexivo (+ Akkusativ)",
    exampleSentenceDe: "Er duscht jeden Morgen warm.",
    exampleSentenceEs: "Él se ducha con agua caliente cada mañana.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "duscht", role: "verb_p1", order: 2 },
      { text: "jeden Morgen warm", role: "complement", order: 3 }
    ]
  }, {
        de: "abtrocknen",
    pron: "áp-trok-nen",
    es: "secar",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (ab-) / + Akkusativ",
    exampleSentenceDe: "Ich trockne das Geschirr ab.",
    exampleSentenceEs: "Seco la vajilla.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trockne", role: "verb_p1", order: 2 },
      { text: "das Geschirr", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "gehören",
    pron: "gue-hö-ren",
    es: "pertenecer",
    type: "Verbo",
    category: "Basisverben",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "Das Buch gehört meinem Bruder.",
    exampleSentenceEs: "El libro pertenece a mi hermano.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "gehört", role: "verb_p1", order: 2 },
      { text: "meinem Bruder", role: "complement", order: 3 }
    ]
  }, {
        de: "glauben",
    pron: "gláu-ben",
    es: "creer",
    type: "Verbo",
    category: "Basisverben",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "Ich glaube deinen Worten nicht.",
    exampleSentenceEs: "No creo en tus palabras.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "glaube", role: "verb_p1", order: 2 },
      { text: "deinen Worten nicht", role: "complement", order: 3 }
    ]
  }, {
        de: "zuhören",
    pron: "tsú-hö-ren",
    es: "escuchar (atención)",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Separable (zu-) / ⚠️ Exige Dativo",
    exampleSentenceDe: "Die Kinder hören aufmerksam zu.",
    exampleSentenceEs: "Los niños escuchan con atención.",
    exampleSentenceDeBlocks: [
      { text: "Die Kinder", role: "subject", order: 1 },
      { text: "hören", role: "verb_p1", order: 2 },
      { text: "aufmerksam", role: "complement", order: 3 },
      { text: "zu", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "verlieren",
    pron: "fea-lí-ren",
    es: "perder",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Irregular / + Akkusativ",
    exampleSentenceDe: "Er verliert oft seinen Schlüssel.",
    exampleSentenceEs: "Él pierde a menudo su llave.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "verliert", role: "verb_p1", order: 2 },
      { text: "oft seinen Schlüssel", role: "complement", order: 3 }
    ]
  }, {
        de: "stehlen",
    pron: "shté-len",
    es: "robar",
    type: "Verbo",
    category: "Haushalt",
    regimen: "Irregular / Dativo + Akkusativ",
    exampleSentenceDe: "Der Dieb stiehlt ein Fahrrad.",
    exampleSentenceEs: "El ladrón roba una bicicleta.",
    exampleSentenceDeBlocks: [
      { text: "Der Dieb", role: "subject", order: 1 },
      { text: "stiehlt", role: "verb_p1", order: 2 },
      { text: "ein Fahrrad", role: "complement", order: 3 }
    ]
  }, {
        de: "suchen",
    pron: "zú-jen",
    es: "buscar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Ich suche meine Brille überall.",
    exampleSentenceEs: "Busco mis gafas por todas partes.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "suche", role: "verb_p1", order: 2 },
      { text: "meine Brille überall", role: "complement", order: 3 }
    ]
  }, {
        de: "der Regenschirm",
    pron: "dea ré-guen-shirm",
    es: "el paraguas",
    type: "Sustantivo (Masc)",
    category: "Alltag",
    plural: "die Regenschirme",
    exampleSentenceDe: "Ich nehme einen Regenschirm mit.",
    exampleSentenceEs: "Llevo un paraguas conmigo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "nehme", role: "verb_p1", order: 2 },
      { text: "einen Regenschirm", role: "complement", order: 3 },
      { text: "mit", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "die Brille",
    pron: "di brí-le",
    es: "las gafas / lentes",
    type: "Sustantivo (Fem)",
    category: "Alltag",
    plural: "die Brillen",
    exampleSentenceDe: "Meine neue Brille ist modern.",
    exampleSentenceEs: "Mis gafas nuevas son modernas.",
    exampleSentenceDeBlocks: [
      { text: "Meine", role: "subject", order: 1 },
      { text: "neue", role: "verb_p1", order: 2 },
      { text: "Brille ist modern", role: "complement", order: 3 }
    ]
  }, {
        de: "die Tasche",
    pron: "di tá-she",
    es: "el bolso / la bolsa",
    type: "Sustantivo (Fem)",
    category: "Alltag",
    plural: "die Taschen",
    exampleSentenceDe: "Die Tasche steht auf dem Boden.",
    exampleSentenceEs: "El bolso está en el suelo.",
    exampleSentenceDeBlocks: [
      { text: "Die Tasche", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "auf dem Boden", role: "complement", order: 3 }
    ]
  }, {
        de: "die Uhr",
    pron: "di ur",
    es: "el reloj",
    type: "Sustantivo (Fem)",
    category: "Alltag",
    plural: "die Uhren",
    exampleSentenceDe: "Die Uhr zeigt zwei Uhr.",
    exampleSentenceEs: "El reloj marca las dos.",
    exampleSentenceDeBlocks: [
      { text: "Die Uhr", role: "subject", order: 1 },
      { text: "zeigt", role: "verb_p1", order: 2 },
      { text: "zwei Uhr", role: "complement", order: 3 }
    ]
  }, {
        de: "fliegen",
    pron: "flí-guen",
    es: "volar",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "Wir fliegen morgen nach Berlin.",
    exampleSentenceEs: "Volamos mañana a Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "fliegen", role: "verb_p1", order: 2 },
      { text: "morgen nach Berlin", role: "complement", order: 3 }
    ]
  }, {
        de: "rennen",
    pron: "ré-nen",
    es: "correr (rápido)",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "Die Kinder rennen sehr schnell.",
    exampleSentenceEs: "Los niños corren muy rápido.",
    exampleSentenceDeBlocks: [
      { text: "Die Kinder", role: "subject", order: 1 },
      { text: "rennen", role: "verb_p1", order: 2 },
      { text: "sehr schnell", role: "complement", order: 3 }
    ]
  }, {
        de: "springen",
    pron: "shprín-guen",
    es: "saltar",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "Die Kinder springen vor Freude.",
    exampleSentenceEs: "Los niños saltan de alegría.",
    exampleSentenceDeBlocks: [
      { text: "Die Kinder", role: "subject", order: 1 },
      { text: "springen", role: "verb_p1", order: 2 },
      { text: "vor Freude", role: "complement", order: 3 }
    ]
  }, {
        de: "singen",
    pron: "zín-guen",
    es: "cantar",
    type: "Verbo",
    category: "Aktivitäten",
    regimen: "Irregular / + Akkusativ",
    exampleSentenceDe: "Sie singt ein schönes Lied.",
    exampleSentenceEs: "Ella canta una bonita canción.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "singt", role: "verb_p1", order: 2 },
      { text: "ein schönes Lied", role: "complement", order: 3 }
    ]
  }, {
        de: "weinen",
    pron: "vái-nen",
    es: "llorar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "Intransitivo",
    exampleSentenceDe: "Das kleine Kind weint laut.",
    exampleSentenceEs: "El niño pequeño llora fuerte.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "kleine", role: "verb_p1", order: 2 },
      { text: "Kind weint laut", role: "complement", order: 3 }
    ]
  }, {
        de: "lachen",
    pron: "lá-jen",
    es: "reír",
    type: "Verbo",
    category: "Gefühle",
    regimen: "Intransitivo",
    exampleSentenceDe: "Wir lachen oft zusammen laut.",
    exampleSentenceEs: "Reímos a menudo juntos en voz alta.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "lachen", role: "verb_p1", order: 2 },
      { text: "oft zusammen laut", role: "complement", order: 3 }
    ]
  }, {
        de: "ziehen",
    pron: "tsí-en",
    es: "tirar / jalar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / + Akkusativ",
    exampleSentenceDe: "Er zieht fest an der Tür.",
    exampleSentenceEs: "Él tira fuerte de la puerta.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "zieht", role: "verb_p1", order: 2 },
      { text: "fest an der Tür", role: "complement", order: 3 }
    ]
  }, {
        de: "drücken",
    pron: "drü-ken",
    es: "presionar / empujar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Bitte drücken Sie die Taste.",
    exampleSentenceEs: "Por favor presione la tecla.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "drücken", role: "verb_p1", order: 2 },
      { text: "Sie die Taste", role: "complement", order: 3 }
    ]
  }, {
        de: "werfen",
    pron: "véa-fen",
    es: "lanzar / tirar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular (wirft) / + Akkusativ",
    exampleSentenceDe: "Er wirft den Ball weit.",
    exampleSentenceEs: "Él lanza la pelota lejos.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "wirft", role: "verb_p1", order: 2 },
      { text: "den Ball weit", role: "complement", order: 3 }
    ]
  }, {
        de: "fangen",
    pron: "fán-guen",
    es: "atrapar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular (fängt) / + Akkusativ",
    exampleSentenceDe: "Der Hund fängt den Ball.",
    exampleSentenceEs: "El perro atrapa la pelota.",
    exampleSentenceDeBlocks: [
      { text: "Der Hund", role: "subject", order: 1 },
      { text: "fängt", role: "verb_p1", order: 2 },
      { text: "den Ball", role: "complement", order: 3 }
    ]
  }, {
        de: "steigen",
    pron: "shtái-guen",
    es: "subir / escalar",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "Wir steigen in den Bus ein.",
    exampleSentenceEs: "Subimos al autobús.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "steigen", role: "verb_p1", order: 2 },
      { text: "in den Bus", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "fallen",
    pron: "fá-len",
    es: "caer",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular (fällt) / + sein (Perfekt)",
    exampleSentenceDe: "Die Blätter fallen im Herbst.",
    exampleSentenceEs: "Las hojas caen en otoño.",
    exampleSentenceDeBlocks: [
      { text: "Die Blätter", role: "subject", order: 1 },
      { text: "fallen", role: "verb_p1", order: 2 },
      { text: "im Herbst", role: "complement", order: 3 }
    ]
  }, {
        de: "reich",
    pron: "raij",
    es: "rico",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "bag full of gold coins",
    exampleSentenceDe: "Der Mann ist sehr reich.",
    exampleSentenceEs: "El hombre es muy rico.",
    exampleSentenceDeBlocks: [
      { text: "Der Mann", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr reich", role: "complement", order: 3 }
    ]
  }, {
        de: "arm",
    pron: "arm",
    es: "pobre",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "empty broken wallet",
    exampleSentenceDe: "Die Familie ist arm.",
    exampleSentenceEs: "La familia es pobre.",
    exampleSentenceDeBlocks: [
      { text: "Die Familie", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "arm", role: "complement", order: 3 }
    ]
  }, {
        de: "wach",
    pron: "vaj",
    es: "despierto",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "wide open eye",
    exampleSentenceDe: "Das Baby ist schon wach.",
    exampleSentenceEs: "El bebé ya está despierto.",
    exampleSentenceDeBlocks: [
      { text: "Das Baby", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schon wach", role: "complement", order: 3 }
    ]
  }, {
        de: "klug",
    pron: "kluk",
    es: "inteligente",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "glowing lightbulb",
    exampleSentenceDe: "Meine Schwester ist sehr klug.",
    exampleSentenceEs: "Mi hermana es muy inteligente.",
    exampleSentenceDeBlocks: [
      { text: "Meine Schwester", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr klug", role: "complement", order: 3 }
    ]
  }, {
        de: "dumm",
    pron: "dum",
    es: "tonto",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "dunce cap",
    exampleSentenceDe: "Das war ein dummer Fehler.",
    exampleSentenceEs: "Ese fue un error tonto.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "war", role: "verb_p1", order: 2 },
      { text: "ein dummer Fehler", role: "complement", order: 3 }
    ]
  }, {
        de: "fleißig",
    pron: "flái-sij",
    es: "trabajador",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "busy bee",
    exampleSentenceDe: "Der Schüler ist sehr fleißig.",
    exampleSentenceEs: "El alumno es muy trabajador.",
    exampleSentenceDeBlocks: [
      { text: "Der Schüler", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr fleißig", role: "complement", order: 3 }
    ]
  }, {
        de: "faul",
    pron: "faul",
    es: "perezoso",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "sleeping sloth",
    exampleSentenceDe: "Am Sonntag bin ich faul.",
    exampleSentenceEs: "El domingo soy perezoso.",
    exampleSentenceDeBlocks: [
      { text: "Am Sonntag", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "ich faul", role: "complement", order: 3 }
    ]
  }, {
        de: "mutig",
    pron: "mú-tij",
    es: "valiente",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "brave lion",
    exampleSentenceDe: "Der Polizist ist mutig.",
    exampleSentenceEs: "El policía es valiente.",
    exampleSentenceDeBlocks: [
      { text: "Der Polizist", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mutig", role: "complement", order: 3 }
    ]
  }, {
        de: "feige",
    pron: "fái-gue",
    es: "cobarde",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "hiding person",
    exampleSentenceDe: "Sei nicht feige!",
    exampleSentenceEs: "¡No seas cobarde!",
    exampleSentenceDeBlocks: [
      { text: "Sei", role: "subject", order: 1 },
      { text: "nicht", role: "verb_p1", order: 2 },
      { text: "feige", role: "complement", order: 3 }
    ]
  }, {
        de: "höflich",
    pron: "höf-lij",
    es: "cortés",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "person bowing politely",
    exampleSentenceDe: "Der Kellner ist sehr höflich.",
    exampleSentenceEs: "El camarero es muy cortés.",
    exampleSentenceDeBlocks: [
      { text: "Der Kellner", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr höflich", role: "complement", order: 3 }
    ]
  }, {
        de: "freundlich",
    pron: "fróind-lij",
    es: "amable",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "friendly waving hand",
    exampleSentenceDe: "Die Leute hier sind freundlich.",
    exampleSentenceEs: "La gente aquí es amable.",
    exampleSentenceDeBlocks: [
      { text: "Die Leute hier", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "freundlich", role: "complement", order: 3 }
    ]
  }, {
        de: "streng",
    pron: "shtreng",
    es: "estricto",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "strict teacher pointing",
    exampleSentenceDe: "Der Lehrer ist streng.",
    exampleSentenceEs: "El profesor es estricto.",
    exampleSentenceDeBlocks: [
      { text: "Der Lehrer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "streng", role: "complement", order: 3 }
    ]
  }, {
        de: "lustig",
    pron: "lús-tij",
    es: "divertido",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "laughing face",
    exampleSentenceDe: "Der Witz ist sehr lustig.",
    exampleSentenceEs: "El chiste es muy divertido.",
    exampleSentenceDeBlocks: [
      { text: "Der Witz", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr lustig", role: "complement", order: 3 }
    ]
  }, {
        de: "langweilig",
    pron: "láng-vai-lij",
    es: "aburrido",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "yawning face",
    exampleSentenceDe: "Das Buch ist langweilig.",
    exampleSentenceEs: "El libro es aburrido.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "langweilig", role: "complement", order: 3 }
    ]
  }, {
        de: "spannend",
    pron: "shpá-nent",
    es: "emocionante",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "exciting roller coaster",
    exampleSentenceDe: "Der Film ist spannend.",
    exampleSentenceEs: "La película es emocionante.",
    exampleSentenceDeBlocks: [
      { text: "Der Film", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "spannend", role: "complement", order: 3 }
    ]
  }, {
        de: "ruhig",
    pron: "rú-ij",
    es: "tranquilo",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "calm zen stones",
    exampleSentenceDe: "Das Meer ist heute ruhig.",
    exampleSentenceEs: "El mar está tranquilo hoy.",
    exampleSentenceDeBlocks: [
      { text: "Das Meer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heute ruhig", role: "complement", order: 3 }
    ]
  }, {
        de: "nervös",
    pron: "ner-vös",
    es: "nervioso",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "sweating nervous face",
    exampleSentenceDe: "Vor der Prüfung bin ich nervös.",
    exampleSentenceEs: "Antes del examen estoy nervioso.",
    exampleSentenceDeBlocks: [
      { text: "Vor der Prüfung", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "ich nervös", role: "complement", order: 3 }
    ]
  }, {
        de: "gewinnen",
    pron: "gue-ví-nen",
    es: "ganar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Irregular / + Akkusativ",
    en: "person holding a gold trophy",
    exampleSentenceDe: "Wir werden das Spiel gewinnen.",
    exampleSentenceEs: "Ganaremos el juego.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "werden", role: "verb_p1", order: 2 },
      { text: "das Spiel", role: "complement", order: 3 },
      { text: "gewinnen", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "schieben",
    pron: "shí-ben",
    es: "empujar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Irregular / + Akkusativ",
    en: "person pushing a heavy box",
    exampleSentenceDe: "Ich schiebe das Auto.",
    exampleSentenceEs: "Yo empujo el coche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schiebe", role: "verb_p1", order: 2 },
      { text: "das Auto", role: "complement", order: 3 }
    ]
  }, {
        de: "stören",
    pron: "shtö-ren",
    es: "molestar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "+ Akkusativ",
    en: "person covering their ears",
    exampleSentenceDe: "Bitte stören Sie mich nicht.",
    exampleSentenceEs: "Por favor, no me moleste.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "stören", role: "verb_p1", order: 2 },
      { text: "Sie mich nicht", role: "complement", order: 3 }
    ]
  }, {
        de: "hoffen",
    pron: "jó-fen",
    es: "esperar (desear)",
    type: "Verbo",
    category: "Basisverben",
    regimen: "auf + Akkusativ",
    en: "person crossing fingers hoping",
    exampleSentenceDe: "Ich hoffe auf gutes Wetter.",
    exampleSentenceEs: "Espero buen tiempo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "hoffe", role: "verb_p1", order: 2 },
      { text: "auf gutes Wetter", role: "complement", order: 3 }
    ]
  }, {
        de: "träumen",
    pron: "trói-men",
    es: "soñar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "von + Dativ",
    en: "sleeping person with a thought bubble",
    exampleSentenceDe: "Ich träume von dir.",
    exampleSentenceEs: "Sueño contigo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "träume", role: "verb_p1", order: 2 },
      { text: "von dir", role: "complement", order: 3 }
    ]
  }, {
        de: "lieben",
    pron: "lí-ben",
    es: "amar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "+ Akkusativ",
    en: "person hugging a large heart",
    exampleSentenceDe: "Ich liebe meine Familie.",
    exampleSentenceEs: "Amo a mi familia.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "liebe", role: "verb_p1", order: 2 },
      { text: "meine Familie", role: "complement", order: 3 }
    ]
  }, {
        de: "hassen",
    pron: "já-sen",
    es: "odiar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "+ Akkusativ",
    en: "angry person crossing arms",
    exampleSentenceDe: "Ich hasse den Winter.",
    exampleSentenceEs: "Odio el invierno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "hasse", role: "verb_p1", order: 2 },
      { text: "den Winter", role: "complement", order: 3 }
    ]
  }, {
        de: "lächeln",
    pron: "lé-cheln",
    es: "sonreír",
    type: "Verbo",
    category: "Gefühle",
    regimen: "Intransitivo",
    en: "smiling happy person",
    exampleSentenceDe: "Das Kind lächelt.",
    exampleSentenceEs: "El niño sonríe.",
    exampleSentenceDeBlocks: [
      { text: "Das Kind", role: "subject", order: 1 },
      { text: "lächelt", role: "verb_p1", order: 2 }
    ]
  }, {
        de: "schreien",
    pron: "shrái-en",
    es: "gritar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / Intransitivo",
    en: "person shouting loud",
    exampleSentenceDe: "Warum schreist du?",
    exampleSentenceEs: "¿Por qué gritas?",
    exampleSentenceDeBlocks: [
      { text: "Warum", role: "subject", order: 1 },
      { text: "schreist", role: "verb_p1", order: 2 },
      { text: "du", role: "complement", order: 3 }
    ]
  }, {
        de: "flüstern",
    pron: "flüs-tern",
    es: "susurrar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Intransitivo",
    en: "person whispering a secret",
    exampleSentenceDe: "Wir müssen hier flüstern.",
    exampleSentenceEs: "Tenemos que susurrar aquí.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "müssen", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 },
      { text: "flüstern", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "diskutieren",
    pron: "dis-ku-tí-ren",
    es: "discutir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "über + Akkusativ",
    en: "two people debating",
    exampleSentenceDe: "Wir diskutieren über Politik.",
    exampleSentenceEs: "Discutimos sobre política.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "diskutieren", role: "verb_p1", order: 2 },
      { text: "über Politik", role: "complement", order: 3 }
    ]
  }, {
        de: "versprechen",
    pron: "fea-shpré-jen",
    es: "prometer",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / + Dativo",
    en: "person making a pinky promise",
    exampleSentenceDe: "Ich verspreche es dir.",
    exampleSentenceEs: "Te lo prometo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "verspreche", role: "verb_p1", order: 2 },
      { text: "es dir", role: "complement", order: 3 }
    ]
  }, {
        de: "zweifeln",
    pron: "tsvái-feln",
    es: "dudar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "an + Dativo",
    en: "person scratching head confused",
    exampleSentenceDe: "Ich zweifle an seiner Geschichte.",
    exampleSentenceEs: "Dudo de su historia.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "zweifle", role: "verb_p1", order: 2 },
      { text: "an seiner Geschichte", role: "complement", order: 3 }
    ]
  }, {
        de: "verzeihen",
    pron: "fea-tsái-en",
    es: "perdonar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / + Dativo",
    en: "two people shaking hands apologizing",
    exampleSentenceDe: "Bitte verzeih mir.",
    exampleSentenceEs: "Por favor, perdóname.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "verzeih", role: "verb_p1", order: 2 },
      { text: "mir", role: "complement", order: 3 }
    ]
  },
    {
      de: "erledigen",
      pron: "ea-lé-di-guen",
      es: "tramitar / despachar / realizar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich muss heute wichtige Papiere erledigen.",
      exampleSentenceEs: "Hoy tengo que tramitar documentos importantes.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "heute wichtige Papiere", role: "complement", order: 3 },
      { text: "erledigen", role: "verb_p2", order: 4 }
    ],
      en: "checking off completed tasks on a checklist"
    },
    {
      de: "Bescheid sagen",
      pron: "be-sháit sá-guen",
      es: "avisar / dar una respuesta",
      type: "Frase",
      category: "Kommunikation",
      regimen: "+ Dativ",
      plural: "-",
      exampleSentenceDe: "Sag mir bitte Bescheid, wenn du Zeit hast.",
      exampleSentenceEs: "Avísame por favor cuando tengas tiempo.",
    exampleSentenceDeBlocks: [
      { text: "Sag", role: "verb_p1", order: 1 },
      { text: "mir bitte Bescheid, wenn du Zeit", role: "complement", order: 2 },
      { text: "hast", role: "verb_p2", order: 3 }
    ],
      en: "giving notice message on mobile phone"
    },
    {
      de: "dringend",
      pron: "drín-guent",
      es: "urgente / urgentemente",
      type: "Adjetivo",
      category: "Eigenschaften",
      regimen: "-",
      plural: "-",
      exampleSentenceDe: "Das ist ein dringender Fall, rufen Sie bitte Hilfe!",
      exampleSentenceEs: "Es un caso urgente, ¡por favor llame a emergencias!",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein dringender Fall, rufen Sie bitte Hilfe", role: "complement", order: 3 }
    ],
      en: "flashing red warning urgent siren light"
    },
    {
      de: "zufrieden",
      pron: "tsu-frí-den",
      es: "satisfecho / contento",
      type: "Adjetivo",
      category: "Gefühle",
      regimen: "mit + Dativ",
      plural: "-",
      exampleSentenceDe: "Ich bin sehr zufrieden mit meinem neuen Job.",
      exampleSentenceEs: "Estoy muy satisfecho con mi nuevo empleo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "sehr zufrieden mit meinem neuen Job", role: "complement", order: 3 }
    ],
      en: "smiling happy face rating stars"
    },
    {
      de: "folgen",
      pron: "fól-guen",
      es: "seguir / obedecer",
      type: "Verbo",
      category: "Aktionen",
      regimen: "⚠️ Exige Dativo / + sein",
      plural: "-",
      exampleSentenceDe: "Folgen Sie bitte den Schildern zum Ausgang.",
      exampleSentenceEs: "Siga por favor los letreros hacia la salida.",
    exampleSentenceDeBlocks: [
      { text: "Folgen", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "bitte den Schildern zum Ausgang", role: "complement", order: 3 }
    ],
      en: "following footprints leading to destination"
    },
    {
      de: "vertrauen",
      pron: "fea-tráu-en",
      es: "confiar en",
      type: "Verbo",
      category: "Aktionen",
      regimen: "⚠️ Exige Dativo",
      plural: "-",
      exampleSentenceDe: "Ich vertraue meinem Arzt vollkommen.",
      exampleSentenceEs: "Confío plenamente en mi médico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "vertraue", role: "verb_p1", order: 2 },
      { text: "meinem Arzt vollkommen", role: "complement", order: 3 }
    ],
      en: "firm trusting handshake between partners"
    },
    {
      de: "zustimmen",
      pron: "tsú-shtí-men",
      es: "estar de acuerdo / aprobar",
      type: "Verbo separable",
      category: "Aktionen",
      regimen: "Separable (zu-) / ⚠️ Exige Dativo",
      plural: "-",
      exampleSentenceDe: "Ich stimme diesem Vorschlag vollkommen zu.",
      exampleSentenceEs: "Estoy completamente de acuerdo con esta propuesta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "stimme", role: "verb_p1", order: 2 },
      { text: "diesem Vorschlag vollkommen", role: "complement", order: 3 },
      { text: "zu", role: "verb_p2", order: 4 }
    ],
      en: "giving a clear green thumbs up approval"
    },
    {
      de: "widersprechen",
      pron: "ví-dea-shpré-jen",
      es: "contradecir / oponerse",
      type: "Verbo (Irregular)",
      category: "Aktionen",
      regimen: "⚠️ Exige Dativo (widerspricht)",
      plural: "-",
      exampleSentenceDe: "Niemand hat dem Chef widersprochen.",
      exampleSentenceEs: "Nadie le llevó la contraria al jefe.",
    exampleSentenceDeBlocks: [
      { text: "Niemand", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "dem Chef widersprochen", role: "complement", order: 3 }
    ],
      en: "two disagreeing talking heads facing opposite"
    },
    {
      de: "leidtun",
      pron: "láit-tún",
      es: "lamentar / dar pena",
      type: "Verbo separable",
      category: "Gefühle",
      regimen: "Separable (leid-) / ⚠️ Exige Dativo",
      plural: "-",
      exampleSentenceDe: "Es tut mir sehr leid, dass ich spät komme.",
      exampleSentenceEs: "Lamento mucho llegar tarde.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "tut", role: "verb_p1", order: 2 },
      { text: "mir sehr leid, dass ich spät", role: "complement", order: 3 },
      { text: "komme", role: "verb_p2", order: 4 }
    ],
      en: "apologetic polite bowing posture"
    },
    {
      de: "sich ausruhen",
      pron: "zij áus-rú-en",
      es: "descansar / relajarse",
      type: "Verbo Reflexivo",
      category: "Alltag",
      regimen: "Reflexivo / Separable (aus-)",
      plural: "-",
      exampleSentenceDe: "Am Wochenende muss ich mich unbedingt ausruhen.",
      exampleSentenceEs: "El fin de semana tengo que descansar sin falta.",
    exampleSentenceDeBlocks: [
      { text: "Am Wochenende", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "ich mich unbedingt", role: "complement", order: 3 },
      { text: "ausruhen", role: "verb_p2", order: 4 }
    ],
      en: "relaxing comfortably in a soft armchair with closed eyes"
    },
    {
      de: "sich beeilen",
      pron: "zij be-ái-len",
      es: "darse prisa",
      type: "Verbo Reflexivo",
      category: "Alltag",
      regimen: "Reflexivo",
      plural: "-",
      exampleSentenceDe: "Wir müssen uns beeilen, der Bus fährt gleich ab.",
      exampleSentenceEs: "Tenemos que darnos prisa, el autobús sale enseguida.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "müssen", role: "verb_p1", order: 2 },
      { text: "uns beeilen, der Bus fährt gleich", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
      en: "running fast checking a ticking wrist watch"
    },
    {
      de: "sich beschweren",
      pron: "zij be-shvé-ren",
      es: "quejarse formalmente",
      type: "Verbo Reflexivo",
      category: "Kommunikation",
      regimen: "Reflexivo / über + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Der Nachbar beschwert sich über die laute Musik.",
      exampleSentenceEs: "El vecino se queja de la música alta.",
    exampleSentenceDeBlocks: [
      { text: "Der Nachbar", role: "subject", order: 1 },
      { text: "beschwert", role: "verb_p1", order: 2 },
      { text: "sich über die laute Musik", role: "complement", order: 3 }
    ],
      en: "writing a formal complaint letter with exclamation mark"
    },
    {
      de: "sich informieren",
      pron: "zij in-foa-mí-ren",
      es: "informarse",
      type: "Verbo Reflexivo",
      category: "Kommunikation",
      regimen: "Reflexivo / über + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich möchte mich über die Öffnungszeiten informieren.",
      exampleSentenceEs: "Quisiera informarme sobre los horarios de apertura.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "mich über die Öffnungszeiten", role: "complement", order: 3 },
      { text: "informieren", role: "verb_p2", order: 4 }
    ],
      en: "reading an information brochure at info desk"
    },
    {
      de: "sich kümmern",
      pron: "zij kú-mean",
      es: "ocuparse de / cuidar",
      type: "Verbo Reflexivo",
      category: "Alltag",
      regimen: "Reflexivo / um + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich kümmere mich gern um deine Katze.",
      exampleSentenceEs: "Me ocupo con gusto de tu gato.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kümmere", role: "verb_p1", order: 2 },
      { text: "mich gern um deine Katze", role: "complement", order: 3 }
    ],
      en: "tenderly caring and tending to a house plant"
    },
    {
      de: "sich interessieren",
      pron: "zij in-te-re-sí-ren",
      es: "interesarse por",
      type: "Verbo Reflexivo",
      category: "Gefühle",
      regimen: "Reflexivo / für + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich interessiere mich sehr für diesen Deutschkurs.",
      exampleSentenceEs: "Me intereso mucho por este curso de alemán.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "interessiere", role: "verb_p1", order: 2 },
      { text: "mich sehr für diesen Deutschkurs", role: "complement", order: 3 }
    ],
      en: "person with curious shining eyes looking at book"
    },
    {
      de: "beschreiben",
      pron: "be-shrái-ben",
      es: "describir",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Bitte beschreiben Sie den Weg zum Bahnhof.",
      exampleSentenceEs: "Por favor, describa el camino a la estación.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "beschreiben", role: "verb_p1", order: 2 },
      { text: "Sie den Weg zum Bahnhof", role: "complement", order: 3 }
    ],
      en: "drawing and explaining details on a whiteboard"
    },
    {
      de: "vergleichen",
      pron: "fea-glái-jen",
      es: "comparar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ (mit + Dat)",
      plural: "-",
      exampleSentenceDe: "Vor dem Kauf sollten wir die Preise vergleichen.",
      exampleSentenceEs: "Antes de comprar deberíamos comparar los precios.",
    exampleSentenceDeBlocks: [
      { text: "Vor dem Kauf", role: "subject", order: 1 },
      { text: "sollten", role: "verb_p1", order: 2 },
      { text: "wir die Preise vergleichen", role: "complement", order: 3 }
    ],
      en: "balancing scale comparing two objects"
    },
    {
      de: "empfehlen",
      pron: "emp-fé-len",
      es: "recomendar",
      type: "Verbo (Irregular)",
      category: "Aktionen",
      regimen: "Dativo + Akkusativ (empfiehlt)",
      plural: "-",
      exampleSentenceDe: "Welchen Arzt können Sie mir empfehlen?",
      exampleSentenceEs: "¿Qué médico me puede recomendar?",
    exampleSentenceDeBlocks: [
      { text: "Welchen Arzt", role: "subject", order: 1 },
      { text: "können", role: "verb_p1", order: 2 },
      { text: "Sie mir", role: "complement", order: 3 },
      { text: "empfehlen", role: "verb_p2", order: 4 }
    ],
      en: "giving a warm star review recommendation card"
    },
  {
    "de": "ab|hängen",
    "pron": "áp-jen-guen",
    "es": "depender",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "von + Dativ / hängt ab, hing ab, hat abgehangen",
    "exampleSentenceDe": "Das hängt ganz vom Wetter ab.",
    "exampleSentenceEs": "Eso depende totalmente del tiempo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hängt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ganz vom Wetter",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ab",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "ab|lehnen",
    "pron": "áp-le-nen",
    "es": "rechazar / denegar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / lehnt ab, lehnte ab, hat abgelehnt",
    "exampleSentenceDe": "Es tut mir leid, Ihr Antrag ist abgelehnt.",
    "exampleSentenceEs": "Lo siento, su solicitud ha sido denegada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "tut",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir leid, Ihr Antrag ist abgelehnt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ab|machen",
    "pron": "áp-ma-jen",
    "es": "acordar / quedar en",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / macht ab, machte ab, hat abgemacht",
    "exampleSentenceDe": "Wir hatten doch abgemacht, dass du kommst.",
    "exampleSentenceEs": "Habíamos acordado que vendrías.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hatten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "doch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "abgemacht,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "dass du",
        "role": "complement",
        "order": 5
      },
      {
        "text": "kommst",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "ab|nehmen",
    "pron": "áp-ne-men",
    "es": "adelgazar / disminuir / quitar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / nimmt ab, nahm ab, hat abgenommen",
    "en": "a cute 3D isometric UI icon of hands gently unwrapping and removing a white medical bandage",
    "exampleSentenceDe": "Morgen können wir den Verband abnehmen.",
    "exampleSentenceEs": "Mañana podemos quitar el vendaje.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Morgen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "können",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir den Verband",
        "role": "complement",
        "order": 3
      },
      {
        "text": "abnehmen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "ab|stimmen",
    "pron": "áp-shti-men",
    "es": "votar / coordinar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "über + Akk / stimmt ab, hat abgestimmt",
    "exampleSentenceDe": "Wir müssen über den Termin abstimmen.",
    "exampleSentenceEs": "Tenemos que votar sobre la cita.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über den Termin",
        "role": "complement",
        "order": 3
      },
      {
        "text": "abstimmen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "achten",
    "pron": "áj-ten",
    "es": "prestar atención / respetar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "auf + Akkusativ / achtet, achtete, hat geachtet",
    "exampleSentenceDe": "Bitte achten Sie auf Ihre Gesundheit.",
    "exampleSentenceEs": "Por favor, cuide de su salud.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "achten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "auf Ihre Gesundheit",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "akzeptieren",
    "pron": "ak-tsep-tí-ren",
    "es": "aceptar",
    "type": "Verbo (-ieren)",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / akzeptiert, akzeptierte, hat akzeptiert",
    "exampleSentenceDe": "Ich kann diese Bedingungen nicht akzeptieren.",
    "exampleSentenceEs": "No puedo aceptar estas condiciones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "diese Bedingungen nicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "akzeptieren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "sich amüsieren",
    "pron": "zij a-mü-zí-ren",
    "es": "divertirse",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "über + Akk / amüsiert sich, hat sich amüsiert",
    "exampleSentenceDe": "Habt ihr euch auf der Party gut amüsiert?",
    "exampleSentenceEs": "¿Os divertisteis bien en la fiesta?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Habt",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "ihr",
        "role": "subject",
        "order": 2
      },
      {
        "text": "euch auf der Party gut",
        "role": "complement",
        "order": 3
      },
      {
        "text": "amüsiert",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "analysieren",
    "pron": "a-na-lü-zí-ren",
    "es": "analizar",
    "type": "Verbo (-ieren)",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / analysiert, analysierte, hat analysiert",
    "exampleSentenceDe": "Wir müssen die Daten genau analysieren.",
    "exampleSentenceEs": "Tenemos que analizar los datos con exactitud.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Daten genau",
        "role": "complement",
        "order": 3
      },
      {
        "text": "analysieren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|bieten",
    "pron": "án-bi-ten",
    "es": "ofrecer",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Dativ + Akkusativ / bietet an, bot an, hat angeboten",
    "exampleSentenceDe": "Was bieten Sie mir an? Ich biete Ihnen einen Saft an.",
    "exampleSentenceEs": "¿Qué me ofrece? Le ofrezco un zumo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Was",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bieten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie mir",
        "role": "complement",
        "order": 3
      },
      {
        "text": "an?",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "Ich",
        "role": "subject",
        "order": 5
      },
      {
        "text": "biete",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "Ihnen einen Saft",
        "role": "complement",
        "order": 7
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 8
      }
    ]
  },
  {
    "de": "ändern",
    "pron": "én-dern",
    "es": "cambiar / modificar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akkusativ / ändert, änderte, hat geändert",
    "exampleSentenceDe": "Wir müssen leider den Termin ändern.",
    "exampleSentenceEs": "Lamentablemente tenemos que cambiar la cita.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider den Termin",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ändern",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|erkennen",
    "pron": "án-ea-ke-nen",
    "es": "reconocer / convalidar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / erkennt an, erkannte an, hat anerkannt",
    "exampleSentenceDe": "Wird mein Berufsabschluss in Deutschland anerkannt?",
    "exampleSentenceEs": "¿Se convalida mi título profesional en Alemania?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wird",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "mein Berufsabschluss",
        "role": "subject",
        "order": 2
      },
      {
        "text": "in Deutschland",
        "role": "complement",
        "order": 3
      },
      {
        "text": "anerkannt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|geben",
    "pron": "án-gue-ben",
    "es": "indicar / declarar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / gibt an, gab an, hat angegeben",
    "exampleSentenceDe": "Bitte geben Sie Ihren Namen und die Adresse an.",
    "exampleSentenceEs": "Por favor, indique su nombre y la dirección.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "geben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Ihren Namen und die Adresse",
        "role": "complement",
        "order": 4
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "an|sehen",
    "pron": "án-ze-en",
    "es": "mirar / contemplar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akkusativ / sieht an, sah an, hat angesehen",
    "exampleSentenceDe": "Sieh dir bitte dieses Foto genau an!",
    "exampleSentenceEs": "¡Mira esta foto detenidamente, por favor!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sieh",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "dir bitte dieses Foto genau",
        "role": "complement",
        "order": 2
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "an|sprechen",
    "pron": "án-shpre-jen",
    "es": "dirigirse a / abordar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / spricht an, sprach an, hat angesprochen",
    "exampleSentenceDe": "Ich möchte dieses Thema im Meeting ansprechen.",
    "exampleSentenceEs": "Quisiera abordar este tema en la reunión.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "möchte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dieses Thema im Meeting",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ansprechen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|stellen",
    "pron": "án-shte-len",
    "es": "contratar / encender / hacer cola (sich)",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / stellt an, stellte an, hat angestellt",
    "exampleSentenceDe": "Die Firma stellt im Sommer zehn neue Arbeiter an.",
    "exampleSentenceEs": "La empresa contrata en verano a diez trabajadores nuevos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stellt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Sommer zehn neue Arbeiter",
        "role": "complement",
        "order": 3
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "sich an|strengen",
    "pron": "zij án-shtren-guen",
    "es": "esforzarse",
    "type": "Verbo reflexivo sep.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "strengt sich an, strengte sich an, hat sich angestrengt",
    "exampleSentenceDe": "Du musst dich bei der Prüfung sehr anstrengen.",
    "exampleSentenceEs": "Tienes que esforzarte mucho en el examen.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Du",
        "role": "subject",
        "order": 1
      },
      {
        "text": "musst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dich bei der Prüfung sehr",
        "role": "complement",
        "order": 3
      },
      {
        "text": "anstrengen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|wenden",
    "pron": "án-ven-den",
    "es": "aplicar / emplear",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / wendet an, wandte an, hat angewandt",
    "exampleSentenceDe": "Wie wendet man diese Regel richtig an?",
    "exampleSentenceEs": "¿Cómo se aplica correctamente esta regla?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wendet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man diese Regel richtig",
        "role": "complement",
        "order": 3
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|zeigen",
    "pron": "án-tsai-guen",
    "es": "denunciar / indicar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / zeigt an, zeigte an, hat angezeigt",
    "exampleSentenceDe": "Er hat den Diebstahl sofort bei der Polizei angezeigt.",
    "exampleSentenceEs": "Él denunció el robo inmediatamente ante la policía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Diebstahl sofort bei der Polizei",
        "role": "complement",
        "order": 3
      },
      {
        "text": "angezeigt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "ärgern / sich ärgern",
    "pron": "ér-guern",
    "es": "molestar / enojarse",
    "type": "Verbo regular/refl.",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "über + Akk / ärgert, ärgerte, hat geärgert",
    "exampleSentenceDe": "Ich ärgere mich über den langen Stau.",
    "exampleSentenceEs": "Me enojo por el largo atasco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ärgere",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich über den langen Stau",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bitten",
    "pron": "bí-ten",
    "es": "pedir / rogar",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "A1–B1",
    "regimen": "um + Akkusativ / bittet, bat, hat gebeten",
    "exampleSentenceDe": "Ich bitte den Chef um Hilfe.",
    "exampleSentenceEs": "Le pido ayuda al jefe.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bitte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Chef um Hilfe",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "drehen",
    "pron": "dré-en",
    "es": "girar / rodar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / dreht, drehte, hat gedreht",
    "en": "a cute 3D isometric UI icon of a hand turning a shiny brass key clockwise in a lock",
    "exampleSentenceDe": "Drehen Sie den Schlüssel bitte nach rechts!",
    "exampleSentenceEs": "¡Gire la llave hacia la derecha, por favor!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Drehen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "den Schlüssel bitte nach rechts",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ein|fallen",
    "pron": "áin-fa-len",
    "es": "ocurrírsele a alguien",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dativ / fällt ein, fiel ein, ist eingefallen",
    "exampleSentenceDe": "Mir fällt sein Name leider nicht mehr ein.",
    "exampleSentenceEs": "Lamentablemente ya no se me ocurre su nombre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fällt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sein Name leider nicht mehr",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "entschuldigen / sich entschuldigen",
    "pron": "ent-shúl-di-guen",
    "es": "disculpar / disculparse",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "A1–B1",
    "regimen": "+ Akk / für + Akk / entschuldigt, hat entschuldigt",
    "exampleSentenceDe": "Ich entschuldige mich für die Verspätung.",
    "exampleSentenceEs": "Me disculpo por el retraso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "entschuldige",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich für die Verspätung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "erlauben",
    "pron": "ea-láu-ben",
    "es": "permitir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "A1–B1",
    "regimen": "+ Dativ + Akk / erlaubt, erlaubte, hat erlaubt",
    "exampleSentenceDe": "Ich erlaube das Rauchen hier nicht.",
    "exampleSentenceEs": "No permito fumar aquí.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "erlaube",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Rauchen hier nicht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "handeln",
    "pron": "ján-deln",
    "es": "actuar / tratar / comerciar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "von + Dat / mit + Dat / handelt, hat gehandelt",
    "exampleSentenceDe": "Der Film handelt von einer großen Reise.",
    "exampleSentenceEs": "La película trata sobre un gran viaje.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Film",
        "role": "subject",
        "order": 1
      },
      {
        "text": "handelt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "von einer großen Reise",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "hängen",
    "pron": "jén-guen",
    "es": "colgar / estar colgado",
    "type": "Verbo mixto",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akk (poner) / + Dat (estar) / hing / hängte",
    "en": "a cute 3D isometric UI icon of a wooden framed painting hanging neatly on a wall hook",
    "exampleSentenceDe": "Das Bild hängt schon lange an der Wand.",
    "exampleSentenceEs": "El cuadro cuelga desde hace mucho en la pared.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Bild",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hängt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schon lange an der Wand",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "laufen",
    "pron": "láu-fen",
    "es": "correr / caminar / funcionar",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "A1–B1",
    "regimen": "läuft, lief, ist gelaufen",
    "en": "a cute 3D isometric character jogging dynamically along a green park path",
    "exampleSentenceDe": "Wir laufen jeden Morgen im Park.",
    "exampleSentenceEs": "Corremos todas las mañanas en el parque.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "laufen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "jeden Morgen im Park",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "leiden",
    "pron": "lái-den",
    "es": "sufrir / padecer",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "an / unter + Dativ / leidet, litt, hat gelitten",
    "exampleSentenceDe": "Er leidet oft unter starken Kopfschmerzen.",
    "exampleSentenceEs": "Él sufre a menudo de fuertes dolores de cabeza.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "leidet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "oft unter starken Kopfschmerzen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "leisten",
    "pron": "láis-ten",
    "es": "lograr / permitirse",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "sich (Dat) + Akk / leistet, leistete, hat geleistet",
    "exampleSentenceDe": "Dieses teure Auto kann ich mir nicht leisten.",
    "exampleSentenceEs": "No me puedo permitir este coche caro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses teure Auto",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich mir nicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "leisten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "leiten",
    "pron": "lái-ten",
    "es": "dirigir / liderar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / leitet, leitete, hat geleitet",
    "exampleSentenceDe": "Frau Weber leitet die neue Abteilung.",
    "exampleSentenceEs": "La Sra. Weber dirige el nuevo departamento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Frau Weber",
        "role": "subject",
        "order": 1
      },
      {
        "text": "leitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die neue Abteilung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "lügen",
    "pron": "lǘ-guen",
    "es": "mentir",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "lügt, log, hat gelogen",
    "exampleSentenceDe": "Man darf vor Gericht nicht lügen.",
    "exampleSentenceEs": "No está permitido mentir ante el tribunal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Man",
        "role": "subject",
        "order": 1
      },
      {
        "text": "darf",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "vor Gericht nicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "lügen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "stimmen",
    "pron": "shtí-men",
    "es": "ser cierto / estar bien / votar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "Intransitivo / stimmt, stimmte, hat gestimmt",
    "exampleSentenceDe": "Die Rechnung stimmt auf den Cent genau.",
    "exampleSentenceEs": "La cuenta cuadra exactamente al céntimo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Rechnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stimmt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "auf den Cent genau",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "stoppen",
    "pron": "shtó-pen",
    "es": "detener / parar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akkusativ / stoppt, stoppte, hat gestoppt",
    "en": "a cute 3D isometric UI icon of a red traffic signal halting a blue car on a road",
    "exampleSentenceDe": "Die Polizei musste das Fahrzeug stoppen.",
    "exampleSentenceEs": "La policía tuvo que detener el vehículo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Polizei",
        "role": "subject",
        "order": 1
      },
      {
        "text": "musste",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Fahrzeug",
        "role": "complement",
        "order": 3
      },
      {
        "text": "stoppen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "stoßen",
    "pron": "shtó-sen",
    "es": "empujar / golpear",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "auf / gegen + Akk / stößt, stieß, hat gestoßen",
    "en": "a cute 3D isometric character bumping softly against a wooden door with cartoon stars",
    "exampleSentenceDe": "Ich habe mir den Kopf an der Tür gestoßen.",
    "exampleSentenceEs": "Me he golpeado la cabeza contra la puerta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir den Kopf an der Tür",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gestoßen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "stürzen",
    "pron": "shtǘr-tsen",
    "es": "caer / desplomarse",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "stürzt, stürzte, ist gestürzt",
    "en": "a cute 3D isometric character tumbling off a bicycle onto a wet street",
    "exampleSentenceDe": "Der Radfahrer ist auf der nassen Straße gestürzt.",
    "exampleSentenceEs": "El ciclista se cayó en la calle mojada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Radfahrer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "auf der nassen Straße",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gestürzt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Absicht",
    "pron": "di áp-zijt",
    "es": "la intención / propósito",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Absichten",
    "exampleSentenceDe": "Das habe ich nicht mit Absicht gemacht.",
    "exampleSentenceEs": "No lo he hecho a propósito.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich nicht mit Absicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gemacht",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Ahnung",
    "pron": "di á-nung",
    "es": "la idea / noción",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "A2–B1",
    "plural": "die Ahnungen",
    "exampleSentenceDe": "Tut mir leid, ich habe keine Ahnung.",
    "exampleSentenceEs": "Lo siento, no tengo ni idea.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Tut",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "mir leid,",
        "role": "complement",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "keine Ahnung",
        "role": "complement",
        "order": 5
      }
    ]
  },
  {
    "de": "die Aktion",
    "pron": "di ak-tsión",
    "es": "la acción / campaña",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Aktionen",
    "exampleSentenceDe": "Die Umweltaktion findet am Samstag statt.",
    "exampleSentenceEs": "La campaña ambiental tiene lugar el sábado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Umweltaktion",
        "role": "subject",
        "order": 1
      },
      {
        "text": "findet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Samstag",
        "role": "complement",
        "order": 3
      },
      {
        "text": "statt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Aktivität",
    "pron": "di ak-ti-vi-tét",
    "es": "la actividad",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "A2–B1",
    "plural": "die Aktivitäten",
    "exampleSentenceDe": "Welche Aktivitäten planen wir am Wochenende?",
    "exampleSentenceEs": "¿Qué actividades planeamos el fin de semana?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welche Aktivitäten",
        "role": "subject",
        "order": 1
      },
      {
        "text": "planen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir am Wochenende",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Änderung",
    "pron": "di én-de-rung",
    "es": "el cambio / modificación",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "A2–B1",
    "plural": "die Änderungen",
    "exampleSentenceDe": "Gab es noch eine Änderung im Fahrplan?",
    "exampleSentenceEs": "¿Hubo algún cambio más en el horario?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Gab",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "es",
        "role": "subject",
        "order": 2
      },
      {
        "text": "noch eine Änderung im Fahrplan",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Angabe",
    "pron": "di án-ga-be",
    "es": "el dato / indicación",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Angaben",
    "exampleSentenceDe": "Bitte überprüfen Sie Ihre persönlichen Angaben.",
    "exampleSentenceEs": "Por favor, compruebe sus datos personales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "überprüfen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Ihre persönlichen Angaben",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Angst",
    "pron": "di angst",
    "es": "el miedo / temor",
    "type": "Sustantivo (Fem)",
    "category": "Gefühle",
    "level": "A1–B1",
    "plural": "die Ängste",
    "exampleSentenceDe": "Vor der Prüfung hat sie ein bisschen Angst.",
    "exampleSentenceEs": "Tiene un poco de miedo antes del examen.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vor der Prüfung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sie ein bisschen Angst",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Anspruch",
    "pron": "dea án-shpruj",
    "es": "el derecho / exigencia",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Ansprüche",
    "exampleSentenceDe": "Sie haben Anspruch auf zwanzig Tage Urlaub.",
    "exampleSentenceEs": "Tiene derecho a veinte días de vacaciones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Anspruch auf zwanzig Tage Urlaub",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Antwort",
    "pron": "di ánt-vort",
    "es": "la respuesta",
    "type": "Sustantivo (Fem)",
    "category": "Kommunikation",
    "level": "A1–B1",
    "plural": "die Antworten",
    "exampleSentenceDe": "Weißt du schon die Antwort auf diese Frage?",
    "exampleSentenceEs": "¿Sabes ya la respuesta a esta pregunta?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Weißt",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "schon die Antwort auf diese Frage",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Ärger",
    "pron": "dea ér-gua",
    "es": "el enfado / problema / lío",
    "type": "Sustantivo (Masc)",
    "category": "Gefühle",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Wegen der Verspätung gab es großen Ärger.",
    "exampleSentenceEs": "Hubo un gran enfado por el retraso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wegen der Verspätung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gab",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es großen Ärger",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Art",
    "pron": "di art",
    "es": "la manera / tipo / especie",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Arten",
    "exampleSentenceDe": "Diese Art von Musik gefällt mir sehr.",
    "exampleSentenceEs": "Este tipo de música me gusta mucho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Diese Art von Musik",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gefällt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir sehr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Eile",
    "pron": "di ái-le",
    "es": "la prisa",
    "type": "Sustantivo (Fem)",
    "category": "Gefühle",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "In der Eile habe ich mein Handy vergessen.",
    "exampleSentenceEs": "Con las prisas he olvidado mi móvil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Eile",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich mein Handy",
        "role": "complement",
        "order": 3
      },
      {
        "text": "vergessen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Eindruck",
    "pron": "dea áin-druk",
    "es": "la impresión",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Eindrücke",
    "exampleSentenceDe": "Der neue Kollege macht einen sehr guten Eindruck.",
    "exampleSentenceEs": "El nuevo compañero da una muy buena impresión.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der neue Kollege",
        "role": "subject",
        "order": 1
      },
      {
        "text": "macht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "einen sehr guten Eindruck",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Einfall",
    "pron": "dea áin-fal",
    "es": "la ocurrencia / idea brillante",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Einfälle",
    "exampleSentenceDe": "Das ist wirklich ein guter Einfall!",
    "exampleSentenceEs": "¡Esa es de verdad una buena idea!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wirklich ein guter Einfall",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Einfluss",
    "pron": "dea áin-flus",
    "es": "la influencia",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "B1",
    "regimen": "auf + Akk",
    "plural": "die Einflüsse",
    "exampleSentenceDe": "Das Wetter hat großen Einfluss auf meine Laune.",
    "exampleSentenceEs": "El clima tiene gran influencia en mi ánimo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Wetter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "großen Einfluss auf meine Laune",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Liebe",
    "pron": "di lí-be",
    "es": "el amor",
    "type": "Sustantivo (Fem)",
    "category": "Gefühle",
    "level": "A2–B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Die Liebe zur Natur ist in Deutschland stark.",
    "exampleSentenceEs": "El amor por la naturaleza es fuerte en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Liebe zur Natur",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Deutschland stark",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Lüge",
    "pron": "di lǘ-gue",
    "es": "la mentira",
    "type": "Sustantivo (Fem)",
    "category": "Kommunikation",
    "level": "B1",
    "plural": "die Lügen",
    "exampleSentenceDe": "Das war doch nur eine kleine Lüge.",
    "exampleSentenceEs": "Eso fue solo una pequeña mentira.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "doch nur eine kleine Lüge",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Lust",
    "pron": "di lust",
    "es": "las ganas / el deseo",
    "type": "Sustantivo (Fem)",
    "category": "Gefühle",
    "level": "A2–B1",
    "regimen": "haben + Lust auf + Akk",
    "exampleSentenceDe": "Hast du heute Abend Lust auf Kino?",
    "exampleSentenceEs": "¿Tienes ganas de ir al cine esta noche?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hast",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "heute Abend Lust auf Kino",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Stimme",
    "pron": "di shtí-me",
    "es": "la voz / el voto",
    "type": "Sustantivo (Fem)",
    "category": "Kommunikation",
    "level": "B1",
    "plural": "die Stimmen",
    "exampleSentenceDe": "Er hat eine sehr ruhige und klare Stimme.",
    "exampleSentenceEs": "Tiene una voz muy tranquila y clara.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine sehr ruhige und klare Stimme",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Stimmung",
    "pron": "di shtí-mung",
    "es": "el ambiente / estado de ánimo",
    "type": "Sustantivo (Fem)",
    "category": "Gefühle",
    "level": "B1",
    "plural": "die Stimmungen",
    "exampleSentenceDe": "Die Stimmung auf dem Fest war fantastisch.",
    "exampleSentenceEs": "El ambiente en la fiesta fue fantástico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Stimmung auf dem Fest",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fantastisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Talent",
    "pron": "das ta-lént",
    "es": "el talento",
    "type": "Sustantivo (Neutro)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Talente",
    "exampleSentenceDe": "Sie hat ein großes Talent für Sprachen.",
    "exampleSentenceEs": "Ella tiene un gran talento para los idiomas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein großes Talent für Sprachen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "abhängig",
    "pron": "áp-jen-guij",
    "es": "dependiente",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "von + Dativ",
    "exampleSentenceDe": "Der Preis ist von der Größe abhängig.",
    "exampleSentenceEs": "El precio depende del tamaño.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Preis",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "von der Größe abhängig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "absolut",
    "pron": "ap-zo-lút",
    "es": "absoluto / totalmente",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Invariable como adverbio",
    "exampleSentenceDe": "Das ist absolut richtig!",
    "exampleSentenceEs": "¡Eso es absolutamente correcto!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "absolut richtig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ähnlich",
    "pron": "én-lij",
    "es": "similar / parecido",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "+ Dativ",
    "exampleSentenceDe": "Mein Bruder sieht mir sehr ähnlich.",
    "exampleSentenceEs": "Mi hermano se parece mucho a mí.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Bruder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sieht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir sehr ähnlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "aktiv",
    "pron": "ak-tíf",
    "es": "activo",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: aktiver",
    "exampleSentenceDe": "Meine Großeltern sind noch sehr aktiv.",
    "exampleSentenceEs": "Mis abuelos son todavía muy activos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Großeltern",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch sehr aktiv",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "aktuell",
    "pron": "ak-tu-él",
    "es": "actual / vigente",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: aktueller",
    "exampleSentenceDe": "Ich brauche eine aktuelle Meldebescheinigung.",
    "exampleSentenceEs": "Necesito un certificado de empadronamiento actual.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine aktuelle Meldebescheinigung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "allgemein",
    "pron": "ál-gue-main",
    "es": "general / común",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "im Allgemeinen",
    "exampleSentenceDe": "Das ist ein allgemeines Problem.",
    "exampleSentenceEs": "Ese es un problema general.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein allgemeines Problem",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "angenehm",
    "pron": "án-gue-nem",
    "es": "agradable",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: angenehmer",
    "exampleSentenceDe": "Die Temperatur im Büro ist heute sehr angenehm.",
    "exampleSentenceEs": "La temperatura en la oficina es hoy muy agradable.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Temperatur im Büro",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute sehr angenehm",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ängstlich",
    "pron": "énkst-lij",
    "es": "miedoso / temeroso",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: ängstlicher",
    "exampleSentenceDe": "Unser kleiner Hund ist manchmal sehr ängstlich.",
    "exampleSentenceEs": "Nuestro perro pequeño a veces es muy miedoso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unser kleiner Hund",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "manchmal sehr ängstlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "anstrengend",
    "pron": "án-shtren-guent",
    "es": "agotador / fatigoso",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: anstrengender",
    "exampleSentenceDe": "Die Arbeit auf der Baustelle war heute anstrengend.",
    "exampleSentenceEs": "El trabajo en la obra fue hoy agotador.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Arbeit auf der Baustelle",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute anstrengend",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "anwesend",
    "pron": "án-ve-zent",
    "es": "presente / asistente",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Antónimo: abwesend",
    "exampleSentenceDe": "Sind heute alle Kursteilnehmer anwesend?",
    "exampleSentenceEs": "¿Están hoy presentes todos los alumnos del curso?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sind",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "heute alle Kursteilnehmer",
        "role": "subject",
        "order": 2
      },
      {
        "text": "anwesend",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ärgerlich",
    "pron": "ér-gua-lij",
    "es": "molesto / fastidioso",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "über + Akk",
    "exampleSentenceDe": "Dieser Fehler ist wirklich sehr ärgerlich.",
    "exampleSentenceEs": "Este error es realmente muy molesto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieser Fehler",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wirklich sehr ärgerlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "besser",
    "pron": "bé-sa",
    "es": "mejor",
    "type": "Adjetivo (Comp. de gut)",
    "category": "Adjektive",
    "level": "A1",
    "regimen": "Sup: am besten",
    "exampleSentenceDe": "Hoffentlich geht es dir bald besser.",
    "exampleSentenceEs": "Espero que pronto te encuentres mejor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hoffentlich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "geht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es dir bald besser",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "beste",
    "pron": "bés-te",
    "es": "el mejor / la mejor",
    "type": "Adjetivo (Sup. de gut)",
    "category": "Adjektive",
    "level": "A1",
    "regimen": "der/die/das beste",
    "exampleSentenceDe": "Das ist das beste Buch in diesem Kurs.",
    "exampleSentenceEs": "Este es el mejor libro de este curso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das beste Buch in diesem Kurs",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "cool",
    "pron": "kul",
    "es": "genial / guay",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Uso coloquial",
    "exampleSentenceDe": "Deine neue Jacke sieht echt cool aus!",
    "exampleSentenceEs": "¡Tu nueva chaqueta se ve muy genial!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Deine neue Jacke",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sieht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "echt cool",
        "role": "complement",
        "order": 3
      },
      {
        "text": "aus",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "echt",
    "pron": "ejt",
    "es": "auténtico / verdadero",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Uso también coloquial",
    "exampleSentenceDe": "Das ist echtes Leder und kein Plastik.",
    "exampleSentenceEs": "Esto es cuero auténtico y no plástico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "echtes Leder und kein Plastik",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "egal",
    "pron": "e-gál",
    "es": "igual / indiferente",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "mir ist das egal (+ Dat)",
    "exampleSentenceDe": "Es ist mir egal, ob wir heute oder morgen fahren.",
    "exampleSentenceEs": "Me da igual si viajamos hoy o mañana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir egal, ob wir heute oder morgen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "fahren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "eilig",
    "pron": "ái-lij",
    "es": "urgente / apresurado",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "es eilig haben",
    "exampleSentenceDe": "Ich kann nicht bleiben, ich habe es sehr eilig.",
    "exampleSentenceEs": "No me puedo quedar, tengo mucha prisa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bleiben,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 5
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "es sehr eilig",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "eindeutig",
    "pron": "áin-doi-tij",
    "es": "inequívoco / claro",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: eindeutiger",
    "exampleSentenceDe": "Das Ergebnis der Prüfung ist eindeutig.",
    "exampleSentenceEs": "El resultado del examen es inequívoco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Ergebnis der Prüfung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eindeutig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "fit",
    "pron": "fit",
    "es": "en forma / sano",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "sich fit halten",
    "exampleSentenceDe": "Durch regelmäßigen Sport bleibe ich fit.",
    "exampleSentenceEs": "Haciendo deporte con regularidad me mantengo en forma.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Durch regelmäßigen Sport",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bleibe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich fit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "global",
    "pron": "glo-bál",
    "es": "global",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: globaler",
    "exampleSentenceDe": "Der Klimawandel ist ein globales Problem.",
    "exampleSentenceEs": "El cambio climático es un problema global.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Klimawandel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein globales Problem",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "hart",
    "pron": "jart",
    "es": "duro",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: härter, am härtesten",
    "exampleSentenceDe": "Nach zwei Tagen wird das Brot leider hart.",
    "exampleSentenceEs": "Después de dos días el pan lamentablemente se pone duro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach zwei Tagen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wird",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Brot leider hart",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "lang",
    "pron": "lang",
    "es": "largo",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A1–B1",
    "regimen": "Comp: länger, am längsten",
    "exampleSentenceDe": "Der Weg zur Arbeit ist sehr lang.",
    "exampleSentenceEs": "El camino al trabajo es muy largo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Weg zur Arbeit",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr lang",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "lieb",
    "pron": "lip",
    "es": "querido / amable",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A1–B1",
    "regimen": "Comp: lieber",
    "exampleSentenceDe": "Mein Hund ist sehr lieb und ruhig.",
    "exampleSentenceEs": "Mi perro es muy cariñoso y tranquilo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Hund",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr lieb und ruhig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "o.k. / okay",
    "pron": "o-kéi",
    "es": "bien / de acuerdo",
    "type": "Adjetivo / Partícula",
    "category": "Adjektive",
    "level": "A1–B1",
    "regimen": "Predicativo / Invariable",
    "exampleSentenceDe": "Wir sagen alle Du, ist das okay für dich?",
    "exampleSentenceEs": "Todos nos tuteamos, ¿te parece bien?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sagen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle Du,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "das",
        "role": "subject",
        "order": 5
      },
      {
        "text": "okay für dich",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "stolz",
    "pron": "shtolts",
    "es": "orgulloso",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "auf + Akkusativ",
    "exampleSentenceDe": "Wir sind sehr stolz auf unsere Tochter.",
    "exampleSentenceEs": "Estamos muy orgullosos de nuestra hija.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr stolz auf unsere Tochter",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "stumm",
    "pron": "shtum",
    "es": "mudo / en silencio",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "stumm schalten (silenciar)",
    "exampleSentenceDe": "Bitte schalten Sie Ihr Handy im Unterricht stumm.",
    "exampleSentenceEs": "Por favor, ponga su móvil en silencio en clase.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schalten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Ihr Handy im Unterricht",
        "role": "complement",
        "order": 4
      },
      {
        "text": "stumm",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "super",
    "pron": "zú-pa",
    "es": "súper / estupendo",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "A1–B1",
    "regimen": "Invariable en uso coloquial",
    "exampleSentenceDe": "Das ist eine super Idee!",
    "exampleSentenceEs": "¡Esa es una idea estupenda!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine super Idee",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "sympathisch",
    "pron": "züm-pá-tish",
    "es": "simpático / agradable",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: sympathischer",
    "exampleSentenceDe": "Unsere neue Chefin ist sehr sympathisch.",
    "exampleSentenceEs": "Nuestra nueva jefa es muy simpática.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere neue Chefin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr sympathisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ab|schreiben",
    "pron": "áp-shrai-ben",
    "es": "copiar (de otro) / transcribir",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / schreibt ab, schrieb ab, hat abgeschrieben",
    "exampleSentenceDe": "In der Prüfung darf man nicht vom Nachbarn abschreiben.",
    "exampleSentenceEs": "En el examen no se permite copiar del compañero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Prüfung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "darf",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "nicht vom Nachbarn",
        "role": "complement",
        "order": 4
      },
      {
        "text": "abschreiben",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "abwesend",
    "pron": "áp-ve-zent",
    "es": "ausente",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Antónimo: anwesend",
    "exampleSentenceDe": "Herr Huber ist bis zum fünfundzwanzigsten April abwesend.",
    "exampleSentenceEs": "El Sr. Huber está ausente hasta el 25 de abril.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Herr Huber",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "bis zum fünfundzwanzigsten April abwesend",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "alltäglich",
    "pron": "ál-tek-lij",
    "es": "cotidiano / diario",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: alltäglicher",
    "exampleSentenceDe": "Das alltägliche Leben in Deutschland gefällt mir gut.",
    "exampleSentenceEs": "La vida cotidiana en Alemania me gusta mucho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das alltägliche Leben in Deutschland",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gefällt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir gut",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Alternative",
    "pron": "di al-ter-na-tí-ve",
    "es": "la alternativa / opción",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Alternativen",
    "exampleSentenceDe": "Der Zug ist eine gute Alternative zum eigenen Auto.",
    "exampleSentenceEs": "El tren es una buena alternativa al coche propio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Zug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine gute Alternative zum eigenen Auto",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "an|kündigen",
    "pron": "án-kün-di-guen",
    "es": "anunciar / avisar con antelación",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / kündigt an, kündigte an, hat angekündigt",
    "exampleSentenceDe": "Wir sollten unseren Besuch vorher telefonisch ankündigen.",
    "exampleSentenceEs": "Deberíamos anunciar nuestra visita antes por teléfono.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sollten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "unseren Besuch vorher telefonisch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ankündigen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|nehmen",
    "pron": "án-ne-men",
    "es": "aceptar / suponer",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / nimmt an, nahm an, hat angenommen",
    "exampleSentenceDe": "Ich nehme Ihre freundliche Einladung sehr gern an.",
    "exampleSentenceEs": "Acepto con mucho gusto su amable invitación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nehme",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Ihre freundliche Einladung sehr gern",
        "role": "complement",
        "order": 3
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "auf|fallen",
    "pron": "áuf-fa-len",
    "es": "llamar la atención / notarse",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dat / fällt auf, fiel auf, ist aufgefallen",
    "exampleSentenceDe": "Mir ist aufgefallen, dass du heute sehr blass bist.",
    "exampleSentenceEs": "Me he fijado en que hoy estás muy pálido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mir",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aufgefallen,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "du",
        "role": "subject",
        "order": 5
      },
      {
        "text": "heute sehr blass",
        "role": "complement",
        "order": 6
      },
      {
        "text": "bist",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "auf|fordern",
    "pron": "áuf-for-dern",
    "es": "instar / requerir / invitar a",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / fordert auf, forderte auf, hat aufgefordert",
    "exampleSentenceDe": "Die Behörde fordert uns auf, das Formular abzugeben.",
    "exampleSentenceEs": "La autoridad nos requiere entregar el formulario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Behörde",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fordert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns",
        "role": "complement",
        "order": 3
      },
      {
        "text": "auf,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "das Formular",
        "role": "complement",
        "order": 5
      },
      {
        "text": "abzugeben",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "auf|geben",
    "pron": "áuf-gue-ben",
    "es": "rendirse / enviar (paquete)",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / gibt auf, gab auf, hat aufgegeben",
    "exampleSentenceDe": "Man darf beim Deutschlernen nie zu früh aufgeben.",
    "exampleSentenceEs": "Al aprender alemán nunca hay que rendirse demasiado pronto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Man",
        "role": "subject",
        "order": 1
      },
      {
        "text": "darf",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "beim Deutschlernen nie zu früh",
        "role": "complement",
        "order": 3
      },
      {
        "text": "aufgeben",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "auf|heben",
    "pron": "áuf-je-ben",
    "es": "recoger (del suelo) / guardar",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / hebt auf, hob auf, hat aufgehoben",
    "en": "hands bending down to pick up a fallen paper receipt from a wooden floor",
    "exampleSentenceDe": "Die Quittung müssen Sie für die Garantie gut aufheben.",
    "exampleSentenceEs": "Debe guardar bien el recibo para la garantía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Quittung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "für die Garantie gut",
        "role": "complement",
        "order": 4
      },
      {
        "text": "aufheben",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "aufmerksam",
    "pron": "áuf-merk-zam",
    "es": "atento / cuidadoso",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "auf + Akk aufmerksam machen",
    "exampleSentenceDe": "Die Schülerin hörte der Lehrerin aufmerksam zu.",
    "exampleSentenceEs": "La alumna escuchó atentamente a la profesora.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Schülerin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hörte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Lehrerin aufmerksam",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "auf|nehmen",
    "pron": "áuf-ne-men",
    "es": "grabar / acoger / registrar",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / nimmt auf, nahm auf, hat aufgenommen",
    "exampleSentenceDe": "Ich habe die Sendung gestern Abend aufgenommen.",
    "exampleSentenceEs": "Grabé el programa anoche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Sendung gestern Abend",
        "role": "complement",
        "order": 3
      },
      {
        "text": "aufgenommen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "auf|regen",
    "pron": "áuf-re-guen",
    "es": "poner nervioso / alterar / indignar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / regt auf, regte auf, hat aufgeregt",
    "exampleSentenceDe": "Bitte regen Sie sich nicht auf, wir lösen das Problem!",
    "exampleSentenceEs": "¡Por favor no se altere, resolvemos el problema!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "regen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "sich nicht",
        "role": "complement",
        "order": 4
      },
      {
        "text": "auf,",
        "role": "verb_p2",
        "order": 5
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 6
      },
      {
        "text": "lösen",
        "role": "verb_p1",
        "order": 7
      },
      {
        "text": "das Problem",
        "role": "complement",
        "order": 8
      }
    ]
  },
  {
    "de": "ausgezeichnet",
    "pron": "áus-gue-tsaij-net",
    "es": "excelente / magnífico",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Predicativo/Atributivo",
    "exampleSentenceDe": "Essen und Service im Restaurant waren ausgezeichnet.",
    "exampleSentenceEs": "La comida y el servicio en el restaurante fueron excelentes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Essen und Service im Restaurant",
        "role": "subject",
        "order": 1
      },
      {
        "text": "waren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ausgezeichnet",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Ausnahme",
    "pron": "di áus-na-me",
    "es": "la excepción",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Ausnahmen",
    "exampleSentenceDe": "Heute mache ich eine Ausnahme und esse Kuchen.",
    "exampleSentenceEs": "Hoy hago una excepción y como pastel.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Heute",
        "role": "complement",
        "order": 1
      },
      {
        "text": "mache",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Ausnahme",
        "role": "complement",
        "order": 4
      },
      {
        "text": "und",
        "role": "complement",
        "order": 5
      },
      {
        "text": "esse",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "Kuchen",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "aus|reichen",
    "pron": "áus-rai-jen",
    "es": "bastar / ser suficiente",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "reicht aus, reichte aus, hat ausgereicht",
    "exampleSentenceDe": "Meine Deutschkenntnisse reichen für diesen Job aus.",
    "exampleSentenceEs": "Mis conocimientos de alemán bastan para este empleo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Deutschkenntnisse",
        "role": "subject",
        "order": 1
      },
      {
        "text": "reichen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "für diesen Job",
        "role": "complement",
        "order": 3
      },
      {
        "text": "aus",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "aus|richten",
    "pron": "áus-rij-ten",
    "es": "transmitir (un recado)",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dat + Akk / richtet aus, hat ausgerichtet",
    "exampleSentenceDe": "Soll ich meinem Mann etwas von Ihnen ausrichten?",
    "exampleSentenceEs": "¿Le transmito algún recado suyo a mi marido?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Soll",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "meinem Mann etwas von Ihnen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ausrichten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "aus|schließen",
    "pron": "áus-shli-sen",
    "es": "excluir / descartar",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / schließt aus, schloss aus, hat ausgeschlossen",
    "exampleSentenceDe": "Einen technischen Fehler kann man nie ganz ausschließen.",
    "exampleSentenceEs": "Nunca se puede descartar por completo un fallo técnico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Einen technischen Fehler",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "nie ganz",
        "role": "complement",
        "order": 4
      },
      {
        "text": "ausschließen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "ausschließlich",
    "pron": "áus-shlis-lij",
    "es": "exclusivamente / únicamente",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Wir haben ausschließlich Nichtraucherzimmer frei.",
    "exampleSentenceEs": "Tenemos libres exclusivamente habitaciones de no fumadores.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ausschließlich Nichtraucherzimmer frei",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "aus|sehen",
    "pron": "áus-ze-en",
    "es": "tener aspecto / parecer",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "sieht aus, sah aus, hat ausgesehen",
    "exampleSentenceDe": "Du siehst heute wieder viel gesünder aus!",
    "exampleSentenceEs": "¡Hoy tienes de nuevo mucho mejor aspecto!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Du",
        "role": "subject",
        "order": 1
      },
      {
        "text": "siehst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute wieder viel gesünder",
        "role": "complement",
        "order": 3
      },
      {
        "text": "aus",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "aus|wählen",
    "pron": "áus-vé-len",
    "es": "seleccionar / elegir",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / wählt aus, wählte aus, hat ausgewählt",
    "exampleSentenceDe": "Für die Aufgabe können Sie unter drei Themen auswählen.",
    "exampleSentenceEs": "Para la tarea puede elegir entre tres temas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für die Aufgabe",
        "role": "complement",
        "order": 1
      },
      {
        "text": "können",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "unter drei Themen",
        "role": "complement",
        "order": 4
      },
      {
        "text": "auswählen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "beachten",
    "pron": "be-áj-ten",
    "es": "respetar / tener en cuenta",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / beachtet, beachtete, hat beachtet",
    "exampleSentenceDe": "Bitte beachten Sie die Ansagen am Bahnsteig!",
    "exampleSentenceEs": "¡Por favor, preste atención a los avisos en el andén!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "beachten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Ansagen am Bahnsteig",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "sich bedanken",
    "pron": "zij be-dán-ken",
    "es": "dar las gracias / agradecer",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "bei + Dat / für + Akk / bedankt sich, hat sich bedankt",
    "exampleSentenceDe": "Ich möchte mich herzlich für Ihre Hilfe bedanken.",
    "exampleSentenceEs": "Quisiera darle cordialmente las gracias por su ayuda.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "möchte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich herzlich für Ihre Hilfe",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bedanken",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Bedingung",
    "pron": "di be-dín-gung",
    "es": "la condición / requisito",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Bedingungen",
    "exampleSentenceDe": "Unter diesen Bedingungen unterschreibe ich den Vertrag.",
    "exampleSentenceEs": "Bajo estas condiciones firmo el contrato.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unter diesen Bedingungen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "unterschreibe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Vertrag",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "beenden",
    "pron": "be-én-den",
    "es": "finalizar / concluir / terminar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / beendet, beendete, hat beendet",
    "exampleSentenceDe": "Du musst deine Ausbildung auf jeden Fall beenden.",
    "exampleSentenceEs": "Tienes que terminar tu formación profesional en cualquier caso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Du",
        "role": "subject",
        "order": 1
      },
      {
        "text": "musst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "deine Ausbildung auf jeden Fall",
        "role": "complement",
        "order": 3
      },
      {
        "text": "beenden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "sich befinden",
    "pron": "zij be-fín-den",
    "es": "encontrarse / estar ubicado",
    "type": "Verbo reflexivo irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "befindet sich, befand sich, hat sich befunden",
    "exampleSentenceDe": "Das Bürgeramt befindet sich direkt im Zentrum.",
    "exampleSentenceEs": "La oficina ciudadana se encuentra justo en el centro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Bürgeramt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "befindet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich direkt im Zentrum",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "begegnen",
    "pron": "be-guék-nen",
    "es": "encontrarse con / cruzarse",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dativ / begegnet, begegnete, ist begegnet",
    "exampleSentenceDe": "Gestern bin ich meinem alten Lehrer begegnet.",
    "exampleSentenceEs": "Ayer me crucé con mi antiguo profesor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Gestern",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bin",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "meinem alten Lehrer",
        "role": "complement",
        "order": 4
      },
      {
        "text": "begegnet",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "begeistert",
    "pron": "be-gáis-tert",
    "es": "entusiasmado / encantado",
    "type": "Adjetivo",
    "category": "Gefühle",
    "level": "B1",
    "regimen": "von + Dativ",
    "exampleSentenceDe": "Das Publikum war von dem Konzert völlig begeistert.",
    "exampleSentenceEs": "El público estaba totalmente entusiasmado con el concierto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Publikum",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "von dem Konzert völlig begeistert",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "begleiten",
    "pron": "be-glái-ten",
    "es": "acompañar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / begleitet, begleitete, hat begleitet",
    "exampleSentenceDe": "Ich begleite dich noch ein Stück bis zum Bahnhof.",
    "exampleSentenceEs": "Te acompaño un tramo hasta la estación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "begleite",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dich noch ein Stück bis zum Bahnhof",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "begründen",
    "pron": "be-grǘn-den",
    "es": "fundamentar / justificar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / begründet, begründete, hat begründet",
    "exampleSentenceDe": "Bitte begründen Sie Ihren Antrag schriftlich.",
    "exampleSentenceEs": "Por favor, fundamente su solicitud por escrito.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "begründen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Ihren Antrag schriftlich",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "begrüßen",
    "pron": "be-grǘ-sen",
    "es": "saludar / dar la bienvenida",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akk / begrüßt, begrüßte, hat begrüßt",
    "exampleSentenceDe": "Der Chef begrüßt alle neuen Mitarbeiter herzlich.",
    "exampleSentenceEs": "El jefe saluda cordialmente a todos los nuevos empleados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Chef",
        "role": "subject",
        "order": 1
      },
      {
        "text": "begrüßt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle neuen Mitarbeiter herzlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "behalten",
    "pron": "be-jál-ten",
    "es": "conservar / quedarse con",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / behält, behielt, hat behalten",
    "exampleSentenceDe": "Darf ich diesen Prospekt über die Kurse behalten?",
    "exampleSentenceEs": "¿Puedo quedarme con este folleto sobre los cursos?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Darf",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "diesen Prospekt über die Kurse",
        "role": "complement",
        "order": 3
      },
      {
        "text": "behalten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "behaupten",
    "pron": "be-jáup-ten",
    "es": "afirmar / sostener",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "behauptet, behauptete, hat behauptet",
    "exampleSentenceDe": "Er behauptet, dass er nichts davon gewusst hat.",
    "exampleSentenceEs": "Él afirma que no sabía nada de eso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "behauptet,",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 3
      },
      {
        "text": "er",
        "role": "subject",
        "order": 4
      },
      {
        "text": "nichts davon",
        "role": "complement",
        "order": 5
      },
      {
        "text": "gewusst hat",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "beleidigen",
    "pron": "be-lái-di-guen",
    "es": "ofender / insultar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / beleidigt, beleidigte, hat beleidigt",
    "exampleSentenceDe": "Entschuldigung, ich wollte Sie wirklich nicht beleidigen.",
    "exampleSentenceEs": "Disculpe, de verdad que no quería ofenderle.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Entschuldigung,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "wollte",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "Sie wirklich nicht",
        "role": "complement",
        "order": 4
      },
      {
        "text": "beleidigen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "beliebt",
    "pron": "be-lípt",
    "es": "popular / querido",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "bei + Dativ",
    "exampleSentenceDe": "Dieses Spiel ist bei Kindern sehr beliebt.",
    "exampleSentenceEs": "Este juego es muy popular entre los niños.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Spiel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "bei Kindern sehr beliebt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bemerken",
    "pron": "be-mér-ken",
    "es": "notar / darse cuenta de",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / bemerkt, bemerkte, hat bemerkt",
    "exampleSentenceDe": "Ich habe gar nicht bemerkt, dass es schon regnet.",
    "exampleSentenceEs": "Ni siquiera me di cuenta de que ya está lloviendo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gar nicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bemerkt,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 5
      },
      {
        "text": "es",
        "role": "subject",
        "order": 6
      },
      {
        "text": "schon",
        "role": "complement",
        "order": 7
      },
      {
        "text": "regnet",
        "role": "verb_p2",
        "order": 8
      }
    ]
  },
  {
    "de": "sich bemühen",
    "pron": "zij be-mǘ-en",
    "es": "esforzarse / procurar",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "um + Akk / bemüht sich, hat sich bemüht",
    "exampleSentenceDe": "Ich werde mich sofort um einen Termin bemühen.",
    "exampleSentenceEs": "Me ocuparé de conseguir una cita de inmediato.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "werde",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich sofort um einen Termin",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bemühen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "benötigen",
    "pron": "be-nö́-ti-guen",
    "es": "necesitar / requerir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / benötigt, benötigte, hat benötigt",
    "exampleSentenceDe": "Sagen Sie bitte Bescheid, falls Sie noch Hilfe benötigen.",
    "exampleSentenceEs": "Avise por favor en caso de que necesite más ayuda.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sagen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte",
        "role": "complement",
        "order": 3
      },
      {
        "text": "Bescheid,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "falls",
        "role": "complement",
        "order": 5
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 6
      },
      {
        "text": "noch Hilfe",
        "role": "complement",
        "order": 7
      },
      {
        "text": "benötigen",
        "role": "verb_p2",
        "order": 8
      }
    ]
  },
  {
    "de": "benutzen",
    "pron": "be-nú-tsen",
    "es": "utilizar / usar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akk / benutzt, benutzte, hat benutzt",
    "exampleSentenceDe": "Benutzen Sie bitte die öffentlichen Verkehrsmittel.",
    "exampleSentenceEs": "Utilice por favor los medios de transporte público.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Benutzen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte die öffentlichen Verkehrsmittel",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "beobachten",
    "pron": "be-óp-aj-ten",
    "es": "observar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / beobachtet, beobachtete, hat beobachtet",
    "exampleSentenceDe": "Wer hat den Unfall an der Kreuzung beobachtet?",
    "exampleSentenceEs": "¿Quién observó el accidente en el cruce?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Unfall an der Kreuzung",
        "role": "complement",
        "order": 3
      },
      {
        "text": "beobachtet",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "beraten",
    "pron": "be-rá-ten",
    "es": "asesorar / aconsejar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / berät, beriet, hat beraten",
    "exampleSentenceDe": "Unser Fachpersonal berät Sie gern bei Fragen.",
    "exampleSentenceEs": "Nuestro personal especializado le asesora con gusto en sus dudas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unser Fachpersonal",
        "role": "subject",
        "order": 1
      },
      {
        "text": "berät",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie gern bei Fragen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "berichten",
    "pron": "be-ríj-ten",
    "es": "informar / reportar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "über + Akk / berichtet, berichtete, hat berichtet",
    "exampleSentenceDe": "Alle Zeitungen haben über das Ereignis berichtet.",
    "exampleSentenceEs": "Todos los periódicos informaron sobre el acontecimiento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle Zeitungen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über das Ereignis",
        "role": "complement",
        "order": 3
      },
      {
        "text": "berichtet",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "beruhigen",
    "pron": "be-rú-i-guen",
    "es": "tranquilizar / calmar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / beruhigt, beruhigte, hat beruhigt",
    "exampleSentenceDe": "Beruhigen Sie sich bitte, es ist alles in Ordnung.",
    "exampleSentenceEs": "Tranquilícese por favor, todo está en orden.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Beruhigen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "sich bitte,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "es",
        "role": "subject",
        "order": 4
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "alles in Ordnung",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "berühmt",
    "pron": "be-rǘmt",
    "es": "famoso / célebre",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: berühmter",
    "exampleSentenceDe": "Dieses Museum ist weltweit sehr berühmt.",
    "exampleSentenceEs": "Este museo es muy famoso en todo el mundo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Museum",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "weltweit sehr berühmt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "beschließen",
    "pron": "be-shlí-sen",
    "es": "decidir / acordar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / beschließt, beschloss, hat beschlossen",
    "exampleSentenceDe": "Wir haben beschlossen, ein kleineres Auto zu kaufen.",
    "exampleSentenceEs": "Hemos decidido comprar un coche más pequeño.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "beschlossen,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "ein kleineres Auto",
        "role": "complement",
        "order": 4
      },
      {
        "text": "zu kaufen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "besitzen",
    "pron": "be-zí-tsen",
    "es": "poseer / tener en propiedad",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / besitzt, besaß, hat besessen",
    "exampleSentenceDe": "Besitzt Ihre Familie ein eigenes Haus?",
    "exampleSentenceEs": "¿Posee su familia una casa propia?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Besitzt",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Ihre Familie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "ein eigenes Haus",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "besorgen",
    "pron": "be-zór-guen",
    "es": "conseguir / encargarse de traer",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / besorgt, besorgte, hat besorgt",
    "exampleSentenceDe": "Soll ich die Eintrittskarten für das Konzert besorgen?",
    "exampleSentenceEs": "¿Me encargo de conseguir las entradas para el concierto?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Soll",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "die Eintrittskarten für das Konzert",
        "role": "complement",
        "order": 3
      },
      {
        "text": "besorgen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "besprechen",
    "pron": "be-shpré-jen",
    "es": "comentar / discutir / tratar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / bespricht, besprach, hat besprochen",
    "exampleSentenceDe": "Wir müssen noch genau besprechen, wann wir losfahren.",
    "exampleSentenceEs": "Tenemos que comentar aún con exactitud cuándo salimos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch genau",
        "role": "complement",
        "order": 3
      },
      {
        "text": "besprechen,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "wann",
        "role": "complement",
        "order": 5
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 6
      },
      {
        "text": "losfahren",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "bestätigen",
    "pron": "be-shté-ti-guen",
    "es": "confirmar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / bestätigt, bestätigte, hat bestätigt",
    "exampleSentenceDe": "Lassen Sie sich den Termin bitte schriftlich bestätigen.",
    "exampleSentenceEs": "Haga que le confirmen la cita por escrito, por favor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Lassen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "sich den Termin bitte schriftlich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bestätigen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "sich beteiligen",
    "pron": "zij be-tái-li-guen",
    "es": "participar / colaborar",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "an + Dativ / beteiligt sich, hat sich beteiligt",
    "exampleSentenceDe": "Wer möchte sich an dem Geschenk für den Lehrer beteiligen?",
    "exampleSentenceEs": "¿Quién quiere participar en el regalo para el profesor?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "möchte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich an dem Geschenk für den Lehrer",
        "role": "complement",
        "order": 3
      },
      {
        "text": "beteiligen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "betreuen",
    "pron": "be-trói-en",
    "es": "atender / cuidar / supervisar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / betreut, betreute, hat betreut",
    "exampleSentenceDe": "Wer betreut am Nachmittag Ihre Kinder?",
    "exampleSentenceEs": "¿Quién cuida por la tarde de sus hijos?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "betreut",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Nachmittag Ihre Kinder",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "betrügen",
    "pron": "be-trǘ-guen",
    "es": "engañar / estafar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / betrügt, betrog, hat betrogen",
    "exampleSentenceDe": "Die Rechnung stimmt nicht, der Kellner hat uns betrogen.",
    "exampleSentenceEs": "La cuenta no cuadra, el camarero nos ha engañado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Rechnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stimmt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nicht,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "der Kellner",
        "role": "subject",
        "order": 4
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "uns",
        "role": "complement",
        "order": 6
      },
      {
        "text": "betrogen",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "bewegen",
    "pron": "be-vé-guen",
    "es": "mover / moverse (sich)",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / bewegt, bewegte, hat bewegt",
    "en": "stylized hand smoothly flexing and moving its fingers in gentle physical motion",
    "exampleSentenceDe": "Ich kann meinen rechten Finger kaum noch bewegen.",
    "exampleSentenceEs": "Apenas puedo mover ya mi dedo derecho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meinen rechten Finger kaum noch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bewegen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "beweisen",
    "pron": "be-vái-zen",
    "es": "demostrar / probar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / beweist, bewies, hat bewiesen",
    "exampleSentenceDe": "Wir können beweisen, dass die Ampel grün war.",
    "exampleSentenceEs": "Podemos demostrar que el semáforo estaba en verde.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "können",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "beweisen,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "die Ampel",
        "role": "subject",
        "order": 5
      },
      {
        "text": "grün",
        "role": "complement",
        "order": 6
      },
      {
        "text": "war",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "bieten",
    "pron": "bí-ten",
    "es": "ofrecer",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dat + Akk / bietet, bot, hat geboten",
    "exampleSentenceDe": "Die Firma bietet ihren Mitarbeitern Sprachkurse an.",
    "exampleSentenceEs": "La empresa ofrece cursos de idiomas a sus empleados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bietet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ihren Mitarbeitern Sprachkurse",
        "role": "complement",
        "order": 3
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "brechen",
    "pron": "bré-jen",
    "es": "romper / fracturar",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akk / bricht, brach, hat gebrochen",
    "en": "wooden stick snapping cleanly into two pieces",
    "exampleSentenceDe": "Er hat sich beim Skifahren das Bein gebrochen.",
    "exampleSentenceEs": "Él se rompió la pierna esquiando.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich beim Skifahren das Bein",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gebrochen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "dar|stellen",
    "pron": "dár-shte-len",
    "es": "representar / exponer",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / stellt dar, stellte dar, hat dargestellt",
    "exampleSentenceDe": "Er konnte das Problem sehr klar darstellen.",
    "exampleSentenceEs": "Él pudo exponer el problema con mucha claridad.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "konnte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Problem sehr klar",
        "role": "complement",
        "order": 3
      },
      {
        "text": "darstellen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "deutlich",
    "pron": "dóit-lij",
    "es": "claro / nítido / claramente",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: deutlicher",
    "exampleSentenceDe": "Schreiben Sie Ihren Namen bitte deutlich!",
    "exampleSentenceEs": "¡Escriba su nombre claramente, por favor!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Schreiben",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "Ihren Namen bitte deutlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "dienen",
    "pron": "dí-nen",
    "es": "servir (para)",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dativ / dient, diente, hat gedient",
    "exampleSentenceDe": "Dieser Raum dient als Aufenthaltsraum.",
    "exampleSentenceEs": "Esta sala sirve como sala de descanso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieser Raum",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dient",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "als Aufenthaltsraum",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ehrlich",
    "pron": "ér-lij",
    "es": "sincero / honrado",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: ehrlicher",
    "exampleSentenceDe": "Bitte sei in dieser Sache ganz ehrlich zu mir.",
    "exampleSentenceEs": "Por favor, sé totalmente sincero conmigo en este asunto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sei",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in dieser Sache ganz ehrlich zu mir",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "sich eignen",
    "pron": "zij áik-nen",
    "es": "ser adecuado / apropiado",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "für + Akk / eignet sich, hat sich geeignet",
    "exampleSentenceDe": "Dieses Hotel eignet sich besonders für Familien.",
    "exampleSentenceEs": "Este hotel es especialmente adecuado para familias.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Hotel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "eignet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich besonders für Familien",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ein|führen",
    "pron": "áin-fü-ren",
    "es": "introducir / importar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / führt ein, führte ein, hat eingeführt",
    "exampleSentenceDe": "Wir haben letztes Jahr ein neues System eingeführt.",
    "exampleSentenceEs": "El año pasado introdujimos un nuevo sistema.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "letztes Jahr ein neues System",
        "role": "complement",
        "order": 3
      },
      {
        "text": "eingeführt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "einverstanden",
    "pron": "áin-fea-shtan-den",
    "es": "de acuerdo",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "mit + Dativ",
    "exampleSentenceDe": "Gut, ich bin mit Ihrem Vorschlag einverstanden!",
    "exampleSentenceEs": "¡Bien, estoy de acuerdo con su propuesta!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Gut,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bin",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "mit Ihrem Vorschlag einverstanden",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "entdecken",
    "pron": "ent-dé-ken",
    "es": "descubrir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / entdeckt, entdeckte, hat entdeckt",
    "exampleSentenceDe": "Ich habe in dem Text noch zwei Fehler entdeckt.",
    "exampleSentenceEs": "He descubierto todavía dos errores en el texto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in dem Text noch zwei Fehler",
        "role": "complement",
        "order": 3
      },
      {
        "text": "entdeckt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "enttäuschen",
    "pron": "ent-tói-shen",
    "es": "decepcionar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / enttäuscht, enttäuschte, hat enttäuscht",
    "exampleSentenceDe": "Leider hat mich sein Verhalten sehr enttäuscht.",
    "exampleSentenceEs": "Lamentablemente su comportamiento me decepcionó mucho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Leider",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "sein Verhalten",
        "role": "subject",
        "order": 4
      },
      {
        "text": "sehr",
        "role": "complement",
        "order": 5
      },
      {
        "text": "enttäuscht",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "entwickeln",
    "pron": "ent-ví-keln",
    "es": "desarrollar / desarrollarse",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / entwickelt, entwickelte, hat entwickelt",
    "exampleSentenceDe": "Die Firma hat ein neues Produkt entwickelt.",
    "exampleSentenceEs": "La empresa ha desarrollado un nuevo producto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein neues Produkt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "entwickelt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "erfahren",
    "pron": "ea-fá-ren",
    "es": "enterarse de / saber",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / erfährt, erfuhr, hat erfahren",
    "exampleSentenceDe": "Wann erfahren wir das Ergebnis der Prüfung?",
    "exampleSentenceEs": "¿Cuándo nos enteramos del resultado del examen?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wann",
        "role": "complement",
        "order": 1
      },
      {
        "text": "erfahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "das Ergebnis der Prüfung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "erfinden",
    "pron": "ea-fín-den",
    "es": "inventar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / erfindet, erfand, hat erfunden",
    "exampleSentenceDe": "Rudolf Diesel hat den Dieselmotor erfunden.",
    "exampleSentenceEs": "Rudolf Diesel inventó el motor diésel.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Rudolf Diesel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Dieselmotor",
        "role": "complement",
        "order": 3
      },
      {
        "text": "erfunden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Erfolg",
    "pron": "dea ea-fólk",
    "es": "el éxito",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "A2–B1",
    "plural": "die Erfolge",
    "exampleSentenceDe": "Ich wünsche Ihnen viel Erfolg bei der Prüfung!",
    "exampleSentenceEs": "¡Le deseo mucho éxito en el examen!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wünsche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Ihnen viel Erfolg bei der Prüfung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "erfüllen",
    "pron": "ea-fǘ-len",
    "es": "cumplir (contrato/deseo)",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / erfüllt, erfüllte, hat erfüllt",
    "exampleSentenceDe": "Sie müssen den Vertrag in allen Punkten erfüllen.",
    "exampleSentenceEs": "Debe cumplir el contrato en todos sus puntos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Vertrag in allen Punkten",
        "role": "complement",
        "order": 3
      },
      {
        "text": "erfüllen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "erhalten",
    "pron": "ea-jál-ten",
    "es": "recibir / obtener",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / erhält, erhielt, hat erhalten",
    "exampleSentenceDe": "Ihr Schreiben vom dritten Januar haben wir erhalten.",
    "exampleSentenceEs": "Hemos recibido su escrito del tres de enero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ihr Schreiben vom dritten Januar",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "erhalten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "erhöhen",
    "pron": "ea-jö́-en",
    "es": "aumentar / subir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / erhöht, erhöhte, hat erhöht",
    "exampleSentenceDe": "Die Krankenkasse hat leider die Beiträge erhöht.",
    "exampleSentenceEs": "Lamentablemente la caja médica ha subido las cuotas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Krankenkasse",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider die Beiträge",
        "role": "complement",
        "order": 3
      },
      {
        "text": "erhöht",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "sich erholen",
    "pron": "zij ea-jó-len",
    "es": "recuperarse / descansar",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "von + Dat / erholt sich, hat sich erholt",
    "exampleSentenceDe": "Im Urlaub habe ich mich sehr gut erholt.",
    "exampleSentenceEs": "En vacaciones me he recuperado muy bien.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Urlaub",
        "role": "complement",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mich sehr gut",
        "role": "complement",
        "order": 4
      },
      {
        "text": "erholt",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "erkennen",
    "pron": "ea-ké-nen",
    "es": "reconocer / distinguir",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "an + Dat / erkennt, erkannte, hat erkannt",
    "exampleSentenceDe": "Ich habe dich sofort an deiner Stimme erkannt.",
    "exampleSentenceEs": "Te reconocí enseguida por tu voz.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dich sofort an deiner Stimme",
        "role": "complement",
        "order": 3
      },
      {
        "text": "erkannt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "erleben",
    "pron": "ea-lé-ben",
    "es": "vivir / experimentar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / erlebt, erlebte, hat erlebt",
    "exampleSentenceDe": "In unserem Urlaub haben wir viel Schönes erlebt.",
    "exampleSentenceEs": "En nuestras vacaciones vivimos muchas cosas bonitas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In unserem Urlaub",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "viel Schönes",
        "role": "complement",
        "order": 4
      },
      {
        "text": "erlebt",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "erleichtern",
    "pron": "ea-láij-tern",
    "es": "facilitar / aliviar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dat + Akk / erleichtert, hat erleichtert",
    "exampleSentenceDe": "Das Internet erleichtert mir die Arbeit sehr.",
    "exampleSentenceEs": "Internet me facilita mucho el trabajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Internet",
        "role": "subject",
        "order": 1
      },
      {
        "text": "erleichtert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir die Arbeit sehr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "erwarten",
    "pron": "ea-vár-ten",
    "es": "esperar (una llamada/bebé)",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / erwartet, erwartete, hat erwartet",
    "exampleSentenceDe": "Ich erwarte heute einen wichtigen Anruf aus Berlin.",
    "exampleSentenceEs": "Espero hoy una llamada importante desde Berlín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "erwarte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute einen wichtigen Anruf aus Berlin",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Fähigkeit",
    "pron": "di fé-ij-kait",
    "es": "la capacidad / habilidad",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Fähigkeiten",
    "exampleSentenceDe": "In dieser Position braucht man organisatorische Fähigkeiten.",
    "exampleSentenceEs": "En este puesto se necesitan capacidades organizativas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In dieser Position",
        "role": "complement",
        "order": 1
      },
      {
        "text": "braucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "organisatorische Fähigkeiten",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "fällig",
    "pron": "fé-lij",
    "es": "vencido / pagadero",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Predicativo",
    "exampleSentenceDe": "Die Rechnung ist Ende des Monats fällig.",
    "exampleSentenceEs": "La factura vence a fin de mes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Rechnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Ende des Monats fällig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "fest|stellen",
    "pron": "fést-shte-len",
    "es": "constatar / comprobar / detectar",
    "type": "Verbo separable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / stellt fest, stellte fest, hat festgestellt",
    "exampleSentenceDe": "Der Arzt konnte bei der Untersuchung nichts feststellen.",
    "exampleSentenceEs": "El médico no pudo detectar nada en el examen.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Arzt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "konnte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "bei der Untersuchung nichts",
        "role": "complement",
        "order": 3
      },
      {
        "text": "feststellen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "fordern",
    "pron": "fór-dern",
    "es": "exigir / reclamar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / fordert, forderte, hat gefordert",
    "exampleSentenceDe": "Die Arbeitnehmer fordern fünf Prozent mehr Lohn.",
    "exampleSentenceEs": "Los trabajadores exigen un cinco por ciento más de salario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Arbeitnehmer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fordern",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fünf Prozent mehr Lohn",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "fördern",
    "pron": "fö́r-dern",
    "es": "fomentar / subvencionar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / fördert, förderte, hat gefördert",
    "exampleSentenceDe": "Das BAMF fördert diesen Integrationskurs.",
    "exampleSentenceEs": "El BAMF subvenciona este curso de integración.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das BAMF",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fördert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "diesen Integrationskurs",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "führen",
    "pron": "fǘ-ren",
    "es": "dirigir / conducir / liderar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / führt, führte, hat geführt",
    "exampleSentenceDe": "Frau Meyer führt den Betrieb schon seit zehn Jahren.",
    "exampleSentenceEs": "La Sra. Meyer dirige la empresa desde hace diez años.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Frau Meyer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "führt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Betrieb schon seit zehn Jahren",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "gelingen",
    "pron": "gue-lín-guen",
    "es": "lograr / salir bien",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dativ / gelingt, gelang, ist gelungen",
    "exampleSentenceDe": "Es ist mir gelungen, den Chef zu überzeugen.",
    "exampleSentenceEs": "He logrado convencer al jefe.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gelungen,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "den Chef",
        "role": "complement",
        "order": 5
      },
      {
        "text": "zu überzeugen",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "gelten",
    "pron": "guél-ten",
    "es": "ser válido / valer",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "gilt, galt, hat gegolten",
    "exampleSentenceDe": "Mein Reisepass gilt noch bis nächstes Jahr.",
    "exampleSentenceEs": "Mi pasaporte es válido todavía hasta el año que viene.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Reisepass",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gilt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch bis nächstes Jahr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "genießen",
    "pron": "gue-ní-sen",
    "es": "disfrutar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / genießt, genoss, hat genossen",
    "exampleSentenceDe": "Wir genießen die Ruhe am Wochenende im Garten.",
    "exampleSentenceEs": "Disfrutamos de la tranquilidad el fin de semana en el jardín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "genießen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Ruhe am Wochenende im Garten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "geschehen",
    "pron": "gue-shé-en",
    "es": "suceder / ocurrir / pasar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "geschieht, geschah, ist geschehen",
    "exampleSentenceDe": "Vielen Dank für Ihre Hilfe! — Gern geschehen!",
    "exampleSentenceEs": "¡Muchas gracias por su ayuda! — ¡De nada!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vielen Dank für Ihre Hilfe!",
        "role": "complement",
        "order": 1
      },
      {
        "text": "— Gern geschehen",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "heben",
    "pron": "jé-ben",
    "es": "levantar / elevar",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / hebt, hob, hat gehoben",
    "en": "person lifting a brown cardboard box off the floor",
    "exampleSentenceDe": "Er hob das Paket vom Boden auf.",
    "exampleSentenceEs": "Él levantó el paquete del suelo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hob",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Paket vom Boden",
        "role": "complement",
        "order": 3
      },
      {
        "text": "auf",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "herrschen",
    "pron": "jér-shen",
    "es": "reinar / dominar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "über + Akk / herrscht, herrschte, hat geherrscht",
    "exampleSentenceDe": "Im Moment herrscht hier große Unruhe.",
    "exampleSentenceEs": "En este momento reina aquí una gran inquietud.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Moment",
        "role": "complement",
        "order": 1
      },
      {
        "text": "herrscht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "hier",
        "role": "complement",
        "order": 3
      },
      {
        "text": "große Unruhe",
        "role": "subject",
        "order": 4
      }
    ]
  },
  {
    "de": "hupen",
    "pron": "jú-pen",
    "es": "tocar el claxon",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "hupt, hupte, hat gehupt",
    "en": "hand pressing the center horn on a black car steering wheel",
    "exampleSentenceDe": "Bitte nicht hupen, hier ist ein Krankenhaus.",
    "exampleSentenceEs": "Por favor, no toque el claxon, aquí hay un hospital.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte nicht",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hupen,",
        "role": "verb_p2",
        "order": 2
      },
      {
        "text": "hier",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "ein Krankenhaus",
        "role": "subject",
        "order": 5
      }
    ]
  },
  {
    "de": "hübsch",
    "pron": "jüpsh",
    "es": "guapo / bonito",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A1–B1",
    "regimen": "Comp: hübscher",
    "exampleSentenceDe": "Sie trägt heute ein sehr hübsches Kleid.",
    "exampleSentenceEs": "Ella lleva hoy un vestido muy bonito.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trägt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute ein sehr hübsches Kleid",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ideal",
    "pron": "i-de-ál",
    "es": "ideal / perfecto",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: idealer",
    "exampleSentenceDe": "Dieses Haus ist ideal für eine große Familie.",
    "exampleSentenceEs": "Esta casa es ideal para una familia grande.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Haus",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ideal für eine große Familie",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "indirekt",
    "pron": "ín-di-rekt",
    "es": "indirecto",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Antónimo: direkt",
    "exampleSentenceDe": "Wir haben indirekt von seinem Plan gehört.",
    "exampleSentenceEs": "Hemos sabido de su plan de forma indirecta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "indirekt von seinem Plan",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gehört",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "kämpfen",
    "pron": "kém-pfen",
    "es": "luchar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "für / gegen + Akk / kämpft, kämpfte, hat gekämpft",
    "exampleSentenceDe": "Wir kämpfen für bessere Arbeitsbedingungen.",
    "exampleSentenceEs": "Luchamos por mejores condiciones de trabajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kämpfen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "für bessere Arbeitsbedingungen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "kleben",
    "pron": "klé-ben",
    "es": "pegar / adherir",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "klebt, klebte, hat geklebt",
    "en": "hand sticking a postage stamp onto a paper envelope",
    "exampleSentenceDe": "Die Briefmarke klebt nicht richtig.",
    "exampleSentenceEs": "El sello no pega bien.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Briefmarke",
        "role": "subject",
        "order": 1
      },
      {
        "text": "klebt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nicht richtig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "klingeln",
    "pron": "klín-gueln",
    "es": "sonar (timbre/teléfono)",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "A1–B1",
    "regimen": "klingelt, klingelte, hat geklingelt",
    "en": "hand pressing a glowing apartment wall doorbell button",
    "exampleSentenceDe": "Das Telefon klingelt schon wieder.",
    "exampleSentenceEs": "El teléfono suena de nuevo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Telefon",
        "role": "subject",
        "order": 1
      },
      {
        "text": "klingelt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schon wieder",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "klingen",
    "pron": "klín-guen",
    "es": "sonar (bien/mal)",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "klingt, klang, hat geklungen",
    "exampleSentenceDe": "Deine Idee klingt sehr interessant.",
    "exampleSentenceEs": "Tu idea suena muy interesante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Deine Idee",
        "role": "subject",
        "order": 1
      },
      {
        "text": "klingt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr interessant",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "klopfen",
    "pron": "kló-pfen",
    "es": "llamar (a la puerta) / latir",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "klopft, klopfte, hat geklopft",
    "en": "hand knocking gently with knuckles on a wooden door",
    "exampleSentenceDe": "Jemand hat gerade an die Tür geklopft.",
    "exampleSentenceEs": "Alguien acaba de llamar a la puerta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Jemand",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gerade an die Tür",
        "role": "complement",
        "order": 3
      },
      {
        "text": "geklopft",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "knapp",
    "pron": "knap",
    "es": "escaso / ajustado",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: knapper",
    "exampleSentenceDe": "Die Zeit vor der Prüfung wird knapp.",
    "exampleSentenceEs": "El tiempo antes del examen se hace escaso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Zeit vor der Prüfung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wird",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "knapp",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "komisch",
    "pron": "kó-mish",
    "es": "raro / extraño / cómico",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: komischer",
    "exampleSentenceDe": "Das Essen riecht heute etwas komisch.",
    "exampleSentenceEs": "La comida huele hoy un poco raro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Essen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "riecht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute etwas komisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "korrekt",
    "pron": "ko-rékt",
    "es": "correcto",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: korrekter",
    "exampleSentenceDe": "Die Rechnung ist absolut korrekt.",
    "exampleSentenceEs": "La factura es absolutamente correcta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Rechnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "absolut korrekt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "lächerlich",
    "pron": "lé-jer-lij",
    "es": "ridículo",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: lächerlicher",
    "exampleSentenceDe": "Ich mache mich doch nicht lächerlich!",
    "exampleSentenceEs": "¡Yo no me voy a hacer el ridículo!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "mache",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich doch nicht lächerlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "leer",
    "pron": "ler",
    "es": "vacío",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "Comp: leerer",
    "exampleSentenceDe": "Die Batterie von meinem Handy ist leer.",
    "exampleSentenceEs": "La batería de mi móvil está vacía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Batterie von meinem Handy",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "lochen",
    "pron": "ló-jen",
    "es": "perforar / taladrar (papel)",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "locht, lochte, hat gelocht",
    "en": "metal two-hole paper puncher perforating white office sheets",
    "exampleSentenceDe": "Bitte lochen Sie die Papiere vor dem Abheften.",
    "exampleSentenceEs": "Por favor, perfore los papeles antes de archivarlos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "lochen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Papiere vor dem Abheften",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "locker",
    "pron": "ló-ka",
    "es": "suelto / relajado",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: lockerer",
    "exampleSentenceDe": "Er nimmt die Prüfung ganz locker.",
    "exampleSentenceEs": "Él se toma el examen muy relajado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nimmt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Prüfung ganz locker",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "lohnen (sich)",
    "pron": "ló-nen",
    "es": "valer la pena",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "lohnt sich, lohnte sich, hat sich gelohnt",
    "exampleSentenceDe": "Es lohnt sich, jeden Tag Deutsch zu üben.",
    "exampleSentenceEs": "Vale la pena practicar alemán todos los días.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lohnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich, jeden Tag Deutsch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu üben",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "los|lassen",
    "pron": "lós-la-sen",
    "es": "soltar",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / lässt los, ließ los, hat losgelassen",
    "en": "two open hands releasing and letting go of a rope",
    "exampleSentenceDe": "Lass sofort meine Hand los!",
    "exampleSentenceEs": "¡Suéltame la mano inmediatamente!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Lass",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "sofort meine Hand",
        "role": "complement",
        "order": 2
      },
      {
        "text": "los",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "mischen",
    "pron": "mí-shen",
    "es": "mezclar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / mischt, mischte, hat gemischt",
    "en": "wooden spoon mixing white flour and sugar inside a ceramic bowl",
    "exampleSentenceDe": "Ich mische das Mehl mit dem Zucker.",
    "exampleSentenceEs": "Mezclo la harina con el azúcar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "mische",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Mehl mit dem Zucker",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Misserfolg",
    "pron": "dea mís-ea-folk",
    "es": "el fracaso",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Misserfolge",
    "exampleSentenceDe": "Aus einem Misserfolg kann man viel lernen.",
    "exampleSentenceEs": "De un fracaso se puede aprender mucho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Aus einem Misserfolg",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "viel",
        "role": "complement",
        "order": 4
      },
      {
        "text": "lernen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "nützen",
    "pron": "nǘ-tsen",
    "es": "servir de algo / ser útil",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "nützt, nützte, hat genützt",
    "exampleSentenceDe": "Es nützt nichts, sich jetzt noch zu ärgern.",
    "exampleSentenceEs": "No sirve de nada enfadarse ahora.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nützt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nichts, sich jetzt noch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu ärgern",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "peinlich",
    "pron": "páin-lij",
    "es": "vergonzoso / embarazoso",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "es ist mir peinlich",
    "exampleSentenceDe": "Das ist mir jetzt wirklich peinlich.",
    "exampleSentenceEs": "Esto me resulta ahora realmente vergonzoso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir jetzt wirklich peinlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "pfeifen",
    "pron": "pféi-fen",
    "es": "silbar / pitar",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "pfeift, pfiff, hat gepfiffen",
    "en": "soccer referee blowing a shiny silver whistle",
    "exampleSentenceDe": "Der Schiedsrichter pfeift das Spiel ab.",
    "exampleSentenceEs": "El árbitro pita el final del partido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Schiedsrichter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "pfeift",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Spiel",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ab",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "quer",
    "pron": "kver",
    "es": "en diagonal / a través de",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Ich fahre quer durch die Stadt.",
    "exampleSentenceEs": "Conduzco a través de toda la ciudad.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fahre",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "quer durch die Stadt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "raten",
    "pron": "rá-ten",
    "es": "aconsejar / adivinar",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Dat / rät, riet, hat geraten",
    "exampleSentenceDe": "Ich rate dir, den Arzt aufzusuchen.",
    "exampleSentenceEs": "Te aconsejo acudir al médico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "rate",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dir, den Arzt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "aufzusuchen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "rechtzeitig",
    "pron": "réjt-tsai-tij",
    "es": "a tiempo / puntual",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: rechtzeitiger",
    "exampleSentenceDe": "Bitte reichen Sie die Dokumente rechtzeitig ein.",
    "exampleSentenceEs": "Por favor, entregue los documentos a tiempo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "reichen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Dokumente rechtzeitig",
        "role": "complement",
        "order": 4
      },
      {
        "text": "ein",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "retten",
    "pron": "ré-ten",
    "es": "salvar / rescatar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk / rettet, rettete, hat gerettet",
    "en": "firefighter in protective gear rescuing a person safely",
    "exampleSentenceDe": "Die Feuerwehr konnte alle Personen retten.",
    "exampleSentenceEs": "Los bomberos pudieron rescatar a todas las personas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Feuerwehr",
        "role": "subject",
        "order": 1
      },
      {
        "text": "konnte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle Personen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "retten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "riesig",
    "pron": "rí-zij",
    "es": "enorme / gigante",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: riesiger",
    "exampleSentenceDe": "Wir haben uns riesig über den Besuch gefreut.",
    "exampleSentenceEs": "Nos alegramos enormemente por la visita.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns riesig über den Besuch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gefreut",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Risiko",
    "pron": "das rí-zi-ko",
    "es": "el riesgo",
    "type": "Sustantivo (Neutro)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Risiken",
    "exampleSentenceDe": "Das finanzielle Risiko ist mir zu hoch.",
    "exampleSentenceEs": "El riesgo financiero es demasiado alto para mí.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das finanzielle Risiko",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir zu hoch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "selb-",
    "pron": "zelp-",
    "es": "el mismo / la misma",
    "type": "Adjetivo / Pronombre",
    "category": "Adjektive",
    "level": "A2–B1",
    "regimen": "derselbe / dieselbe / dasselbe",
    "exampleSentenceDe": "Wir haben am selben Tag Geburtstag.",
    "exampleSentenceEs": "Tenemos cumpleaños el mismo día.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am selben Tag Geburtstag",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "senkrecht",
    "pron": "zénk-rejt",
    "es": "vertical / perpendicular",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Antónimo: waagerecht",
    "exampleSentenceDe": "Ziehen Sie auf dem Blatt eine senkrechte Linie.",
    "exampleSentenceEs": "Trace en la hoja una línea vertical.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ziehen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "auf dem Blatt eine senkrechte Linie",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "sichern",
    "pron": "zí-jern",
    "es": "asegurar / guardar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / sichert, sicherte, hat gesichert",
    "exampleSentenceDe": "Du musst alle Daten im Computer regelmäßig sichern.",
    "exampleSentenceEs": "Debes guardar regularmente todos los datos en el ordenador.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Du",
        "role": "subject",
        "order": 1
      },
      {
        "text": "musst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle Daten im Computer regelmäßig",
        "role": "complement",
        "order": 3
      },
      {
        "text": "sichern",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "sichtbar",
    "pron": "zíjt-bar",
    "es": "visible",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: sichtbarer",
    "exampleSentenceDe": "Es gibt zum Glück keine sichtbaren Verletzungen.",
    "exampleSentenceEs": "Por suerte no hay lesiones visibles.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zum Glück keine sichtbaren Verletzungen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "siegen",
    "pron": "zí-guen",
    "es": "vencer / ganar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "über + Akk / siegt, siegte, hat gesiegt",
    "exampleSentenceDe": "Unsere Mannschaft siegte am Ende mit 2:0.",
    "exampleSentenceEs": "Nuestro equipo venció al final por 2 a 0.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Mannschaft",
        "role": "subject",
        "order": 1
      },
      {
        "text": "siegte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Ende mit 2:0",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Sinn",
    "pron": "dea zin",
    "es": "el sentido / significado",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "B1",
    "regimen": "Es hat keinen Sinn.",
    "exampleSentenceDe": "Es hat keinen Sinn, noch ein Spiel zu beginnen.",
    "exampleSentenceEs": "No tiene sentido empezar otro juego más.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "keinen Sinn,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "noch ein Spiel",
        "role": "complement",
        "order": 4
      },
      {
        "text": "zu beginnen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "sinnlos",
    "pron": "zín-los",
    "es": "sin sentido / inútil",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Antónimo: sinnvoll",
    "exampleSentenceDe": "So ein sinnloses Buch habe ich lange nicht gelesen.",
    "exampleSentenceEs": "Hace mucho que no leo un libro tan sin sentido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "So ein sinnloses Buch",
        "role": "complement",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "lange nicht",
        "role": "complement",
        "order": 4
      },
      {
        "text": "gelesen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "sinnvoll",
    "pron": "zín-fol",
    "es": "sensato / útil / razonable",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: sinnvoller",
    "exampleSentenceDe": "Es ist sehr sinnvoll, täglich Vokabeln zu wiederholen.",
    "exampleSentenceEs": "Es muy sensato repasar vocabulario a diario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr sinnvoll,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "täglich Vokabeln",
        "role": "complement",
        "order": 4
      },
      {
        "text": "zu wiederholen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "sparsam",
    "pron": "shpár-zam",
    "es": "ahorrador / económico",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: sparsamer",
    "exampleSentenceDe": "Mein neues Auto ist beim Benzin sehr sparsam.",
    "exampleSentenceEs": "Mi nuevo coche es muy económico en gasolina.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein neues Auto",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "beim Benzin sehr sparsam",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "spüren",
    "pron": "shpǘ-ren",
    "es": "sentir / notar (físicamente)",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / spürt, spürte, hat gespürt",
    "exampleSentenceDe": "Wo tut es weh? Spüren Sie den Schmerz hier?",
    "exampleSentenceEs": "¿Dónde le duele? ¿Siente aquí el dolor?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wo",
        "role": "complement",
        "order": 1
      },
      {
        "text": "tut",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es",
        "role": "subject",
        "order": 3
      },
      {
        "text": "weh?",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "Spüren",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 6
      },
      {
        "text": "den Schmerz hier",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "stammen",
    "pron": "shtá-men",
    "es": "provenir / ser originario",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "aus + Dat / stammt, stammte, hat gestammt",
    "exampleSentenceDe": "Ich stamme aus einer kleinen Stadt an der Donau.",
    "exampleSentenceEs": "Provengo de una pequeña ciudad junto al Danubio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stamme",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus einer kleinen Stadt an der Donau",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ständig",
    "pron": "shtén-dij",
    "es": "constante / continuamente",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Sinónimo: immer",
    "exampleSentenceDe": "Das Telefon im Büro ist ständig besetzt.",
    "exampleSentenceEs": "El teléfono en la oficina está constantemente ocupado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Telefon im Büro",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ständig besetzt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "überlegen",
    "pron": "ü-ba-lé-guen",
    "es": "reflexionar / pensárselo",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / überlegt, überlegte, hat überlegt",
    "exampleSentenceDe": "Ich muss mir diesen wichtigen Vertrag noch überlegen.",
    "exampleSentenceEs": "Todavía tengo que pensármelo sobre este contrato importante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir diesen wichtigen Vertrag noch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "überlegen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "übernehmen",
    "pron": "ü-ba-né-men",
    "es": "asumir / hacerse cargo",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "nimmt über, übernahm, hat übernommen",
    "exampleSentenceDe": "Ich habe das kleine Geschäft von meinem Vater übernommen.",
    "exampleSentenceEs": "Me he hecho cargo del pequeño negocio de mi padre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das kleine Geschäft von meinem Vater",
        "role": "complement",
        "order": 3
      },
      {
        "text": "übernommen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "überprüfen",
    "pron": "ü-ba-prǘ-fen",
    "es": "comprobar / revisar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / überprüft, überprüfte, hat überprüft",
    "exampleSentenceDe": "Bitte überprüfen Sie, ob Ihr Name richtig geschrieben ist.",
    "exampleSentenceEs": "Por favor, compruebe si su nombre está escrito correctamente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "überprüfen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie,",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ob",
        "role": "complement",
        "order": 4
      },
      {
        "text": "Ihr Name",
        "role": "subject",
        "order": 5
      },
      {
        "text": "richtig",
        "role": "complement",
        "order": 6
      },
      {
        "text": "geschrieben ist",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "überraschen",
    "pron": "ü-ba-rá-shen",
    "es": "sorprender",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / überrascht, überraschte, hat überrascht",
    "exampleSentenceDe": "Ich bin ganz überrascht, dass die Miete so billig ist.",
    "exampleSentenceEs": "Me sorprende mucho que el alquiler sea tan barato.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bin",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ganz überrascht,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "die Miete",
        "role": "subject",
        "order": 5
      },
      {
        "text": "so billig",
        "role": "complement",
        "order": 6
      },
      {
        "text": "ist",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "überreden",
    "pron": "ü-ba-ré-den",
    "es": "convencer / persuadir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / überredet, überredete, hat überredet",
    "exampleSentenceDe": "Mein Bruder hat mich überredet, den Kurs zu machen.",
    "exampleSentenceEs": "Mi hermano me ha convencido para hacer el curso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Bruder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "überredet,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "den Kurs",
        "role": "complement",
        "order": 5
      },
      {
        "text": "zu machen",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "übertreiben",
    "pron": "ü-ba-trái-ben",
    "es": "exagerar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "übertreibt, übertrieb, hat übertrieben",
    "exampleSentenceDe": "Sport ist gesund, aber man sollte es nicht übertreiben.",
    "exampleSentenceEs": "El deporte es sano, pero no hay que exagerar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sport",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gesund, aber",
        "role": "complement",
        "order": 3
      },
      {
        "text": "man",
        "role": "subject",
        "order": 4
      },
      {
        "text": "sollte",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "es nicht",
        "role": "complement",
        "order": 6
      },
      {
        "text": "übertreiben",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "überzeugen",
    "pron": "ü-ba-tsói-guen",
    "es": "convencer",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / überzeugt, überzeugte, hat überzeugt",
    "exampleSentenceDe": "Ich bin fest davon überzeugt, dass die Entscheidung richtig ist.",
    "exampleSentenceEs": "Estoy firmemente convencido de que la decisión es correcta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bin",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fest davon überzeugt,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "die Entscheidung",
        "role": "subject",
        "order": 5
      },
      {
        "text": "richtig",
        "role": "complement",
        "order": 6
      },
      {
        "text": "ist",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "un-",
    "pron": "un-",
    "es": "in- / des- / sin (prefijo negativo)",
    "type": "Prefijo / Partícula",
    "category": "Wortbildung",
    "level": "B1",
    "regimen": "Forma antónimos",
    "exampleSentenceDe": "Der Verkäufer war am Telefon leider sehr unfreundlich.",
    "exampleSentenceEs": "El vendedor fue lamentablemente muy antipático por teléfono.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Verkäufer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Telefon leider sehr unfreundlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "unterbrechen",
    "pron": "un-ta-bré-jen",
    "es": "interrumpir",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / unterbricht, unterbrach, hat unterbrochen",
    "exampleSentenceDe": "Wir unterbrechen die Sendung für eine wichtige Nachricht.",
    "exampleSentenceEs": "Interrumpimos la emisión por una noticia importante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "unterbrechen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Sendung für eine wichtige Nachricht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "unterhalten (sich)",
    "pron": "un-ta-jál-ten",
    "es": "conversar / entretenerse",
    "type": "Verbo reflexivo irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "unterhält sich, unterhielt sich, hat sich unterhalten",
    "exampleSentenceDe": "Wir haben uns bei der Party sehr gut unterhalten.",
    "exampleSentenceEs": "Conversamos muy bien en la fiesta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns bei der Party sehr gut",
        "role": "complement",
        "order": 3
      },
      {
        "text": "unterhalten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "unterlassen",
    "pron": "un-ta-lá-sen",
    "es": "omitir / abstenerse de",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / unterlässt, unterließ, hat unterlassen",
    "exampleSentenceDe": "Das Rauchen auf den Fluren ist bitte zu unterlassen.",
    "exampleSentenceEs": "Por favor, absténgase de fumar en los pasillos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Rauchen auf den Fluren",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "bitte",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu unterlassen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "unterstützen",
    "pron": "un-ta-shtǘ-tsen",
    "es": "apoyar / respaldar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / unterstützt, unterstützte, hat unterstützt",
    "exampleSentenceDe": "Meine Eltern unterstützen mich finanziell im Studium.",
    "exampleSentenceEs": "Mis padres me apoyan financieramente en los estudios.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Eltern",
        "role": "subject",
        "order": 1
      },
      {
        "text": "unterstützen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich finanziell im Studium",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "verändern (sich)",
    "pron": "fea-én-darn",
    "es": "cambiar / modificarse",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "verändert sich, veränderte sich, hat sich verändert",
    "exampleSentenceDe": "Wir haben uns lange nicht gesehen, aber du hast dich gar nicht verändert.",
    "exampleSentenceEs": "Hace tiempo que no nos vemos, pero no has cambiado nada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns lange nicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gesehen,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "aber",
        "role": "complement",
        "order": 5
      },
      {
        "text": "du",
        "role": "subject",
        "order": 6
      },
      {
        "text": "hast",
        "role": "verb_p1",
        "order": 7
      },
      {
        "text": "dich gar nicht",
        "role": "complement",
        "order": 8
      },
      {
        "text": "verändert",
        "role": "verb_p2",
        "order": 9
      }
    ]
  },
  {
    "de": "vergrößern",
    "pron": "fea-grö́-sern",
    "es": "ampliar / agrandar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / vergrößert, vergrößerte, hat vergrößert",
    "exampleSentenceDe": "Wir wollen unser Geschäft im nächsten Jahr vergrößern.",
    "exampleSentenceEs": "Queremos ampliar nuestro negocio el año que viene.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wollen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "unser Geschäft im nächsten Jahr",
        "role": "complement",
        "order": 3
      },
      {
        "text": "vergrößern",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verhindern",
    "pron": "fea-jín-darn",
    "es": "evitar / impedir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / verhindert, verhinderte, hat verhindert",
    "exampleSentenceDe": "Durch Vorsicht konnten wir den Unfall zum Glück verhindern.",
    "exampleSentenceEs": "Gracias a la precaución pudimos por suerte evitar el accidente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Durch Vorsicht",
        "role": "complement",
        "order": 1
      },
      {
        "text": "konnten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Unfall zum Glück",
        "role": "complement",
        "order": 4
      },
      {
        "text": "verhindern",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "verlangen",
    "pron": "fea-lán-guen",
    "es": "exigir / pedir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / verlangt, verlangte, hat verlangt",
    "exampleSentenceDe": "Jeden Tag Überstunden? Das können Sie nicht verlangen!",
    "exampleSentenceEs": "¿Horas extras todos los días? ¡No puede exigir eso!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Jeden Tag Überstunden?",
        "role": "complement",
        "order": 1
      },
      {
        "text": "Das",
        "role": "complement",
        "order": 2
      },
      {
        "text": "können",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 4
      },
      {
        "text": "nicht",
        "role": "complement",
        "order": 5
      },
      {
        "text": "verlangen",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "verlängern",
    "pron": "fea-lén-guarn",
    "es": "prorrogar / alargar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / verlängert, verlängerte, hat verlängert",
    "exampleSentenceDe": "Ich muss meinen Ausweis auf dem Amt verlängern lassen.",
    "exampleSentenceEs": "Tengo que prorrogar mi documento de identidad en la oficina pública.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meinen Ausweis auf dem Amt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verlängern lassen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verlassen",
    "pron": "fea-lá-sen",
    "es": "abandonar / dejar (lugar/persona)",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akkusativ / verlässt, verließ, hat verlassen",
    "exampleSentenceDe": "Er hat um 17 Uhr das Bürogebäude verlassen.",
    "exampleSentenceEs": "Él ha abandonado el edificio de oficinas a las 17:00 h.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "um 17 Uhr das Bürogebäude",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verlassen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verraten",
    "pron": "fea-rá-ten",
    "es": "revelar / traicionar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dat + Akk / verrät, verriet, hat verraten",
    "exampleSentenceDe": "Wer hat dir mein großes Geheimnis verraten?",
    "exampleSentenceEs": "¿Quién te ha revelado mi gran secreto?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dir mein großes Geheimnis",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verraten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verrückt",
    "pron": "fea-rǘkt",
    "es": "loco / chiflado",
    "type": "Adjetivo",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Comp: verrückter",
    "exampleSentenceDe": "Fährst du ohne Licht? Bist du verrückt geworden?",
    "exampleSentenceEs": "¿Conduces sin luz? ¿Te has vuelto loco?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Fährst",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "ohne Licht?",
        "role": "complement",
        "order": 3
      },
      {
        "text": "Bist",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "du",
        "role": "subject",
        "order": 5
      },
      {
        "text": "verrückt",
        "role": "complement",
        "order": 6
      },
      {
        "text": "geworden",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "verschwinden",
    "pron": "fea-shvín-den",
    "es": "desaparecer",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "verschwindet, verschwand, ist verschwunden",
    "exampleSentenceDe": "Mein Ausweis ist plötzlich spurlos verschwunden.",
    "exampleSentenceEs": "Mi documento de identidad ha desaparecido de repente sin dejar rastro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Ausweis",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "plötzlich spurlos",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verschwunden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verteilen",
    "pron": "fea-tái-len",
    "es": "repartir / distribuir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / verteilt, verteilte, hat verteilt",
    "exampleSentenceDe": "Kannst du bitte schon mal die Gläser verteilen?",
    "exampleSentenceEs": "¿Puedes ir repartiendo ya los vasos, por favor?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Kannst",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte schon mal die Gläser",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verteilen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "vertreten",
    "pron": "fea-tré-ten",
    "es": "sustituir / representar",
    "type": "Verbo inseparable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / vertritt, vertrat, hat vertreten",
    "exampleSentenceDe": "Wer vertritt Sie im Büro, wenn Sie Urlaub machen?",
    "exampleSentenceEs": "¿Quién le sustituye en la oficina cuando está de vacaciones?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "vertritt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie im Büro,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "wenn",
        "role": "complement",
        "order": 4
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 5
      },
      {
        "text": "Urlaub",
        "role": "complement",
        "order": 6
      },
      {
        "text": "machen",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "verurteilen",
    "pron": "fea-úr-tai-len",
    "es": "condenar / sentenciar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / verurteilt, verurteilte, hat verurteilt",
    "exampleSentenceDe": "Das Gericht hat den Täter zu einer Geldstrafe verurteilt.",
    "exampleSentenceEs": "El tribunal ha condenado al autor a una multa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Gericht",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Täter zu einer Geldstrafe",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verurteilt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verwechseln",
    "pron": "fea-vék-seln",
    "es": "confundir (a alguien/algo)",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "mit + Dat / verwechselt, verwechselte, hat verwechselt",
    "exampleSentenceDe": "Entschuldigen Sie, ich habe Sie mit jemandem verwechselt.",
    "exampleSentenceEs": "Disculpe, le he confundido con alguien.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Entschuldigen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie,",
        "role": "subject",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "Sie mit jemandem",
        "role": "complement",
        "order": 5
      },
      {
        "text": "verwechselt",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "verwenden",
    "pron": "fea-vén-den",
    "es": "emplear / utilizar",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / verwendet, verwendete, hat verwendet",
    "exampleSentenceDe": "Dieses Wort wird in der Alltagssprache oft verwendet.",
    "exampleSentenceEs": "Esta palabra se utiliza a menudo en el lenguaje cotidiano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Wort",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wird",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in der Alltagssprache oft",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verwendet",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verzichten",
    "pron": "fea-tsíj-ten",
    "es": "renunciar a / prescindir de",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "auf + Akkusativ / verzichtet, verzichtete, hat verzichtet",
    "exampleSentenceDe": "Ich verzichte heute Abend auf den Kaffee.",
    "exampleSentenceEs": "Esta noche prescindo del café.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "verzichte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute Abend auf den Kaffee",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "völlig",
    "pron": "fö́-lij",
    "es": "completo / totalmente",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "B1",
    "regimen": "Uso como graduador",
    "exampleSentenceDe": "Das halte ich in dieser Situation für völlig ausgeschlossen.",
    "exampleSentenceEs": "Eso lo considero totalmente descartado en esta situación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "complement",
        "order": 1
      },
      {
        "text": "halte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in dieser Situation für völlig ausgeschlossen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "vor|lesen",
    "pron": "fór-le-zen",
    "es": "leer en voz alta",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dat + Akk / liest vor, las vor, hat vorgelesen",
    "exampleSentenceDe": "Abends lese ich meinen Kindern oft ein Buch vor.",
    "exampleSentenceEs": "Por la noche a menudo les leo un libro a mis hijos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Abends",
        "role": "complement",
        "order": 1
      },
      {
        "text": "lese",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "meinen Kindern oft ein Buch",
        "role": "complement",
        "order": 4
      },
      {
        "text": "vor",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "vor|haben",
    "pron": "fór-ja-ben",
    "es": "tener planeado / tener la intención de",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "hat vor, hatte vor, hat vorgehabt",
    "exampleSentenceDe": "Haben Sie morgen Abend nach der Arbeit schon etwas vor?",
    "exampleSentenceEs": "¿Tienen ya algún plan para mañana por la noche después del trabajo?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Haben",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "morgen Abend nach der Arbeit schon etwas",
        "role": "complement",
        "order": 3
      },
      {
        "text": "vor",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "vor|schlagen",
    "pron": "fór-shla-guen",
    "es": "proponer / sugerir",
    "type": "Verbo separable irr.",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Dat + Akk / schlägt vor, schlug vor, hat vorgeschlagen",
    "exampleSentenceDe": "Ich schlage vor, dass wir jetzt eine kurze Pause machen.",
    "exampleSentenceEs": "Propongo que hagamos ahora una breve pausa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schlage",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "vor,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 5
      },
      {
        "text": "jetzt eine kurze Pause",
        "role": "complement",
        "order": 6
      },
      {
        "text": "machen",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "sich vor|stellen",
    "pron": "zij fór-shte-len",
    "es": "imaginarse / figurarse (Dativo)",
    "type": "Verbo reflexivo sep.",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dat + Akk / stellt sich vor, hat sich vorgestellt",
    "exampleSentenceDe": "So schwierig habe ich mir diese neue Arbeit nicht vorgestellt.",
    "exampleSentenceEs": "No me había imaginado que este nuevo trabajo fuera tan difícil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "So schwierig",
        "role": "complement",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mir diese neue Arbeit nicht",
        "role": "complement",
        "order": 4
      },
      {
        "text": "vorgestellt",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Wahl",
    "pron": "di val",
    "es": "la elección / opción / comicios",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "A2–B1",
    "plural": "die Wahlen",
    "exampleSentenceDe": "Sie haben die Wahl: mit Vollpension oder Halbpension?",
    "exampleSentenceEs": "Tiene la opción: ¿con pensión completa o media pensión?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Wahl: mit Vollpension oder Halbpension",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "warnen",
    "pron": "vár-nen",
    "es": "advertir / avisar (peligro)",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "vor + Dat / warnt, warnte, hat gewarnt",
    "exampleSentenceDe": "Ich warne Sie, der freie Hund auf der Straße ist gefährlich.",
    "exampleSentenceEs": "Le advierto, el perro suelto en la calle es peligroso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "warne",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "der freie Hund auf der Straße",
        "role": "subject",
        "order": 4
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "gefährlich",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "wechseln",
    "pron": "vék-seln",
    "es": "cambiar (dinero/neumático)",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "A2–B1",
    "regimen": "+ Akkusativ / wechselt, wechselte, hat gewechselt",
    "exampleSentenceDe": "Können Sie mir bitte 50 Euro in Kleingeld wechseln?",
    "exampleSentenceEs": "¿Me puede cambiar por favor 50 euros en suelto?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Können",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "mir bitte 50 Euro in Kleingeld",
        "role": "complement",
        "order": 3
      },
      {
        "text": "wechseln",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Weise",
    "pron": "di vái-ze",
    "es": "el modo / manera",
    "type": "Sustantivo (Fem)",
    "category": "Wortbildung",
    "level": "B1",
    "regimen": "Suffix: -weise (teilweise, möglicherweise)",
    "exampleSentenceDe": "Das ist möglicherweise nicht so einfach zu lösen.",
    "exampleSentenceEs": "Eso posiblemente no sea tan fácil de solucionar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "möglicherweise nicht so einfach",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu lösen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "wenigstens",
    "pron": "vé-niks-tens",
    "es": "al menos / por lo menos",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Graduador",
    "exampleSentenceDe": "Essen Sie wenigstens ein Stück Kuchen mit uns!",
    "exampleSentenceEs": "¡Coma por lo menos un trozo de pastel con nosotros!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Essen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "wenigstens ein Stück Kuchen mit uns",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Wille",
    "pron": "dea ví-le",
    "es": "la voluntad",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "B1",
    "regimen": "Declina como N-Deklination (des Willens)",
    "exampleSentenceDe": "Wo ein Wille ist, da ist auch ein Weg.",
    "exampleSentenceEs": "Donde hay voluntad, hay un camino (querer es poder).",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wo",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ein Wille",
        "role": "subject",
        "order": 2
      },
      {
        "text": "ist,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "da",
        "role": "complement",
        "order": 4
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "auch",
        "role": "complement",
        "order": 6
      },
      {
        "text": "ein Weg",
        "role": "subject",
        "order": 7
      }
    ]
  },
  {
    "de": "winken",
    "pron": "vín-ken",
    "es": "saludar con la mano / hacer señas",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Dativ / winkt, winkte, hat gewinkt",
    "en": "a cute 3D isometric character smiling and waving goodbye with one hand on a train platform",
    "exampleSentenceDe": "Alle standen auf dem Bahnsteig und winkten zum Abschied.",
    "exampleSentenceEs": "Todos estaban en el andén y se despidieron con la mano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle",
        "role": "subject",
        "order": 1
      },
      {
        "text": "standen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "auf dem Bahnsteig und",
        "role": "complement",
        "order": 3
      },
      {
        "text": "winkten",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "zum Abschied",
        "role": "complement",
        "order": 5
      }
    ]
  },
  {
    "de": "wirken",
    "pron": "vír-ken",
    "es": "surtir efecto / obrar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "wirkt, wirkte, hat gewirkt",
    "exampleSentenceDe": "Die neuen Tabletten gegen den Schmerz haben nicht gewirkt.",
    "exampleSentenceEs": "Las nuevas pastillas contra el dolor no han surtido efecto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die neuen Tabletten gegen den Schmerz",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nicht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gewirkt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Wirkung",
    "pron": "di vír-kung",
    "es": "el efecto / impacto",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Wirkungen",
    "exampleSentenceDe": "Welche Nebenwirkungen hat dieses starke Medikament?",
    "exampleSentenceEs": "¿Qué efectos secundarios tiene este medicamento fuerte?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welche Nebenwirkungen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dieses starke Medikament",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "wirklich",
    "pron": "vírk-lij",
    "es": "realmente / de verdad",
    "type": "Adjetivo / Adverbio",
    "category": "Adverbien",
    "level": "A1–A2",
    "regimen": "Intensificador",
    "exampleSentenceDe": "Im Bahnhofsrestaurant isst man wirklich sehr gut.",
    "exampleSentenceEs": "En el restaurante de la estación se come realmente muy bien.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Bahnhofsrestaurant",
        "role": "complement",
        "order": 1
      },
      {
        "text": "isst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "wirklich sehr gut",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Wirklichkeit",
    "pron": "di vírk-lij-kait",
    "es": "la realidad",
    "type": "Sustantivo (Fem)",
    "category": "Abstrakte",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "In Wirklichkeit kostet das neue Buch vierzehn Euro.",
    "exampleSentenceEs": "En realidad el nuevo libro cuesta catorce euros.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Wirklichkeit",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kostet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das neue Buch",
        "role": "subject",
        "order": 3
      },
      {
        "text": "vierzehn Euro",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "sich wundern",
    "pron": "zij vún-darn",
    "es": "sorprenderse / extrañarse",
    "type": "Verbo reflexivo",
    "category": "Gefühle",
    "level": "B1",
    "regimen": "wundert sich, wunderte sich, hat sich gewundert",
    "exampleSentenceDe": "Ich wundere mich, dass du schon so früh aus der Schule kommst.",
    "exampleSentenceEs": "Me extraña que llegues tan pronto de la escuela.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wundere",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "du",
        "role": "subject",
        "order": 5
      },
      {
        "text": "schon so früh aus der Schule",
        "role": "complement",
        "order": 6
      },
      {
        "text": "kommst",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "das Wunder",
    "pron": "das vún-da",
    "es": "el milagro / maravilla",
    "type": "Sustantivo (Neutro)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Wunder (Kein Wunder, dass...)",
    "exampleSentenceDe": "Es war ein Wunder, dass bei dem Unfall nichts passiert ist.",
    "exampleSentenceEs": "Fue un milagro que no pasara nada en el accidente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Wunder,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "bei dem Unfall",
        "role": "complement",
        "order": 5
      },
      {
        "text": "nichts",
        "role": "subject",
        "order": 6
      },
      {
        "text": "passiert ist",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "der Wunsch",
    "pron": "dea vunsh",
    "es": "el deseo",
    "type": "Sustantivo (Masc)",
    "category": "Abstrakte",
    "level": "A1–A2",
    "plural": "die Wünsche (Mit den besten Wünschen)",
    "exampleSentenceDe": "Haben Sie im Geschäft sonst noch einen Wunsch?",
    "exampleSentenceEs": "¿Tiene algún otro deseo en la tienda?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Haben",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "im Geschäft sonst noch einen Wunsch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Zeichen",
    "pron": "das tsái-jen",
    "es": "la señal / signo",
    "type": "Sustantivo (Neutro)",
    "category": "Abstrakte",
    "level": "B1",
    "plural": "die Zeichen",
    "exampleSentenceDe": "Bitte fangen Sie erst an, wenn ich Ihnen ein Zeichen gebe.",
    "exampleSentenceEs": "Por favor, empiece solo cuando yo le dé una señal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "fangen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "erst",
        "role": "complement",
        "order": 4
      },
      {
        "text": "an,",
        "role": "verb_p2",
        "order": 5
      },
      {
        "text": "wenn",
        "role": "complement",
        "order": 6
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 7
      },
      {
        "text": "Ihnen ein Zeichen",
        "role": "complement",
        "order": 8
      },
      {
        "text": "gebe",
        "role": "verb_p2",
        "order": 9
      }
    ]
  },
  {
    "de": "zeichnen",
    "pron": "tsáij-nen",
    "es": "dibujar / trazar",
    "type": "Verbo regular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / zeichnet, zeichnete, hat gezeichnet",
    "en": "a cute 3D isometric character sketching a picture with a pencil on a white paper sketchbook",
    "exampleSentenceDe": "Meine Tochter kann im Kunstunterricht sehr gut zeichnen.",
    "exampleSentenceEs": "Mi hija sabe dibujar muy bien en la clase de arte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Tochter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Kunstunterricht sehr gut",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zeichnen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "zerstören",
    "pron": "tsea-shtö́-ren",
    "es": "destruir",
    "type": "Verbo inseparable",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akkusativ / zerstört, zerstörte, hat zerstört",
    "en": "a cute 3D isometric UI icon of strong storm wind gusts breaking apart a small wooden shed",
    "exampleSentenceDe": "Der starke Sturm hat viele alte Häuser zerstört.",
    "exampleSentenceEs": "La fuerte tormenta ha destruido muchas casas antiguas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der starke Sturm",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele alte Häuser",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zerstört",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "zwingen",
    "pron": "tsvín-guen",
    "es": "obligar / forzar",
    "type": "Verbo irregular",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "+ Akk + zu / zwingt, zwang, hat gezwungen",
    "exampleSentenceDe": "Das schlechte Wetter zwang uns, schnell umzukehren.",
    "exampleSentenceEs": "El mal tiempo nos obligó a darnos la vuelta rápido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das schlechte Wetter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "zwang",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "schnell",
        "role": "complement",
        "order": 4
      },
      {
        "text": "umzukehren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  }
]
},
{
  id: 5,
  title: "Kapitel 5: Adverbien & Fragewörter",
  icon: <Search size={20} />,
  emoji: "❓",
  words: [{
    de: "heute",
    pron: "jói-te",
    es: "hoy",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Heute ist Montag.",
    exampleSentenceEs: "Hoy es lunes.",
    exampleSentenceDeBlocks: [
      { text: "Heute", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Montag", role: "complement", order: 3 }
    ],
    regimen: "Temporal"
  }, {
    de: "morgen",
    pron: "mór-guen",
    es: "mañana",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich gehe morgen ins Kino.",
    exampleSentenceEs: "Mañana voy al cine.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "morgen ins Kino", role: "complement", order: 3 }
    ],
    regimen: "Temporal"
  }, {
    de: "gestern",
    pron: "gués-tean",
    es: "ayer",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Gestern war ich im Park.",
    exampleSentenceEs: "Ayer estuve en el parque.",
    exampleSentenceDeBlocks: [
      { text: "Gestern", role: "subject", order: 1 },
      { text: "war", role: "verb_p1", order: 2 },
      { text: "ich im Park", role: "complement", order: 3 }
    ],
    regimen: "Temporal"
  }, {
    de: "jetzt",
    pron: "yetst",
    es: "ahora",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich lerne Deutsch jetzt.",
    exampleSentenceEs: "Yo aprendo alemán ahora.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lerne", role: "verb_p1", order: 2 },
      { text: "Deutsch jetzt", role: "complement", order: 3 }
    ],
    regimen: "Temporal"
  }, {
    de: "bald",
    pron: "balt",
    es: "pronto",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Wir sehen uns bald.",
    exampleSentenceEs: "Nos vemos pronto.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "sehen", role: "verb_p1", order: 2 },
      { text: "uns bald", role: "complement", order: 3 }
    ],
    regimen: "Temporal"
  }, {
    de: "immer",
    pron: "í-mea",
    es: "siempre",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Ich trinke Kaffee immer.",
    exampleSentenceEs: "Yo bebo café siempre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "Kaffee immer", role: "complement", order: 3 }
    ],
    regimen: "Frecuencia"
  }, {
    de: "oft",
    pron: "oft",
    es: "a menudo",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Ich trinke oft Kaffee.",
    exampleSentenceEs: "A menudo bebo café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "oft Kaffee", role: "complement", order: 3 }
    ],
    regimen: "Frecuencia"
  }, {
    de: "manchmal",
    pron: "mánch-mal",
    es: "a veces",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Manchmal trinke ich Kaffee.",
    exampleSentenceEs: "A veces bebo café.",
    exampleSentenceDeBlocks: [
      { text: "Manchmal", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich Kaffee", role: "complement", order: 3 }
    ],
    regimen: "Frecuencia"
  }, {
    de: "nie",
    pron: "ni",
    es: "nunca",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Ich sehe dich nie.",
    exampleSentenceEs: "Yo te veo nunca.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "dich nie", role: "complement", order: 3 }
    ],
    regimen: "Frecuencia"
  }, {
    de: "schon",
    pron: "shon",
    es: "ya",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich bin schon zu Hause.",
    exampleSentenceEs: "Yo ya estoy en casa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "schon zu Hause", role: "complement", order: 3 }
    ],
    regimen: "Temporal: ya, ya sea"
  }, {
    de: "noch",
    pron: "noj",
    es: "todavía / aún",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich bin noch zu Hause.",
    exampleSentenceEs: "Yo estoy todavía en casa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "noch zu Hause", role: "complement", order: 3 }
    ],
    regimen: "Temporal: continuidad"
  }, {
    de: "hier",
    pron: "hí-a",
    es: "aquí",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Ich bin hier.",
    exampleSentenceEs: "Yo estoy aquí.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    regimen: "Lugar"
  }, {
    de: "dort",
    pron: "dort",
    es: "allí",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Ich bin dort.",
    exampleSentenceEs: "Yo estoy allí.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "dort", role: "complement", order: 3 }
    ],
    regimen: "Lugar"
  }, {
    de: "oben / unten",
    pron: "ó-ben  ún-ten",
    es: "arriba / abajo",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Das Buch ist oben. Die Katze ist unten.",
    exampleSentenceEs: "El libro está arriba. El gato está abajo.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "oben", role: "complement", order: 3 }
    ],
    regimen: "Local"
  }, {
    de: "vorn / hinten",
    pron: "fon  jín-ten",
    es: "adelante / atrás",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Ich sitze vorn.",
    exampleSentenceEs: "Yo me siento adelante.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sitze", role: "verb_p1", order: 2 },
      { text: "vorn", role: "complement", order: 3 }
    ],
    regimen: "Local"
  }, {
    de: "draußen / drinnen",
    pron: "dráu-sen  drí-nen",
    es: "afuera / adentro",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Das Wetter ist schön. Wir sind draußen.",
    exampleSentenceEs: "El tiempo es bueno. Estamos afuera.",
    exampleSentenceDeBlocks: [
      { text: "Das Wetter", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    regimen: "Lugar"
  }, {
    de: "sehr",
    pron: "zéa",
    es: "muy",
    type: "Adverbio",
    category: "Gradadverbien",
    exampleSentenceDe: "Das Wetter ist sehr gut.",
    exampleSentenceEs: "El tiempo está muy bueno.",
    exampleSentenceDeBlocks: [
      { text: "Das Wetter", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr gut", role: "complement", order: 3 }
    ],
    regimen: "Intensificador"
  }, {
    de: "viel / wenig",
    pron: "fil  vé-nij",
    es: "mucho / poco",
    type: "Adverbio",
    category: "Gradadverbien",
    exampleSentenceDe: "Ich trinke viel Wasser.",
    exampleSentenceEs: "Bebo mucha agua.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "viel Wasser", role: "complement", order: 3 }
    ],
    regimen: "Cantidad"
  }, {
    de: "wer?",
    pron: "vea",
    es: "¿quién?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wer ist das?",
    exampleSentenceEs: "¿Quién es ese/esa?",
    exampleSentenceDeBlocks: [
      { text: "Wer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das", role: "complement", order: 3 }
    ],
    regimen: "Solo personas, nom."
  }, {
    de: "was?",
    pron: "vas",
    es: "¿qué?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Was ist das?",
    exampleSentenceEs: "¿Qué es eso?",
    exampleSentenceDeBlocks: [
      { text: "Was", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das", role: "complement", order: 3 }
    ],
    regimen: "Invariable"
  }, {
    de: "wo?",
    pron: "vo",
    es: "¿dónde?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wo ist die Toilette?",
    exampleSentenceEs: "¿Dónde está el baño?",
    exampleSentenceDeBlocks: [
      { text: "Wo", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Toilette", role: "complement", order: 3 }
    ],
    regimen: "Lugar, sin movimiento"
  }, {
    de: "wann?",
    pron: "van",
    es: "¿cuándo?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wann kommst du?",
    exampleSentenceEs: "¿Cuándo vienes?",
    exampleSentenceDeBlocks: [
      { text: "Wann", role: "subject", order: 1 },
      { text: "kommst", role: "verb_p1", order: 2 },
      { text: "du", role: "complement", order: 3 }
    ],
    regimen: "V al final"
  }, {
    de: "warum?",
    pron: "va-rúm",
    es: "¿por qué?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Warum bist du hier?",
    exampleSentenceEs: "¿Por qué estás aquí?",
    exampleSentenceDeBlocks: [
      { text: "Warum", role: "subject", order: 1 },
      { text: "bist", role: "verb_p1", order: 2 },
      { text: "du hier", role: "complement", order: 3 }
    ],
    regimen: "Invariable, posición 1"
  }, {
    de: "wie?",
    pron: "ví",
    es: "¿cómo?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wie geht es Ihnen?",
    exampleSentenceEs: "¿Cómo está usted?",
    exampleSentenceDeBlocks: [
      { text: "Wie", role: "subject", order: 1 },
      { text: "geht", role: "verb_p1", order: 2 },
      { text: "es Ihnen", role: "complement", order: 3 }
    ],
    regimen: "Posición 1"
  }, {
    de: "woher?",
    pron: "vo-jéa",
    es: "¿de dónde?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Woher kommst du?",
    exampleSentenceEs: "¿De dónde vienes?",
    exampleSentenceDeBlocks: [
      { text: "Woher", role: "subject", order: 1 },
      { text: "kommst", role: "verb_p1", order: 2 },
      { text: "du", role: "complement", order: 3 }
    ],
    regimen: "+ kommen aus"
  }, {
    de: "wohin?",
    pron: "vo-hín",
    es: "¿a dónde?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wohin gehst du?",
    exampleSentenceEs: "¿A dónde vas?",
    exampleSentenceDeBlocks: [
      { text: "Wohin", role: "subject", order: 1 },
      { text: "gehst", role: "verb_p1", order: 2 },
      { text: "du", role: "complement", order: 3 }
    ],
    regimen: "Con verbos de movimiento"
  }, {
    de: "welcher?",
    pron: "vél-chea",
    es: "¿cuál?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Welcher Bus ist das?",
    exampleSentenceEs: "¿Cuál es ese autobús?",
    exampleSentenceDeBlocks: [
      { text: "Welcher Bus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das", role: "complement", order: 3 }
    ],
    regimen: "Concuerda en género/caso"
  },
  {
    de: "morgens",
    pron: "moa-guens",
    es: "por las mañanas",
    type: "Adverbio",
    category: "Häufigkeit",
    en: "a bright morning sun",
    exampleSentenceDe: "Morgens trinke ich immer Tee.",
    exampleSentenceEs: "Por las mañanas siempre bebo té.",
    exampleSentenceDeBlocks: [
      { text: "Morgens", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "ich immer Tee", role: "complement", order: 3 }
    ]
  }, {
        de: "abends",
    pron: "a-bents",
    es: "por las tardes/noches",
    type: "Adverbio",
    category: "Häufigkeit",
    en: "a crescent moon with stars",
    exampleSentenceDe: "Abends lese ich ein Buch.",
    exampleSentenceEs: "Por las noches leo un libro.",
    exampleSentenceDeBlocks: [
      { text: "Abends", role: "subject", order: 1 },
      { text: "lese", role: "verb_p1", order: 2 },
      { text: "ich ein Buch", role: "complement", order: 3 }
    ]
  },
    {
      de: "wahrscheinlich",
      pron: "var-sháin-lij",
      es: "probablemente",
      type: "Adverbio",
      category: "Gradadverbien",
      regimen: "-",
      plural: "-",
      exampleSentenceDe: "Das Paket kommt wahrscheinlich morgen an.",
      exampleSentenceEs: "El paquete llegará probablemente mañana.",
    exampleSentenceDeBlocks: [
      { text: "Das Paket", role: "subject", order: 1 },
      { text: "kommt", role: "verb_p1", order: 2 },
      { text: "wahrscheinlich morgen", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
      en: "weather forecast icon showing partial sun and rain clouds"
    },
    {
      de: "unbedingt",
      pron: "ún-be-dinkt",
      es: "sin falta / imprescindiblemente",
      type: "Adverbio",
      category: "Gradadverbien",
      regimen: "-",
      plural: "-",
      exampleSentenceDe: "Sie müssen diesen Brief heute unbedingt abschicken.",
      exampleSentenceEs: "Debe enviar esta carta hoy sin falta.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "müssen", role: "verb_p1", order: 2 },
      { text: "diesen Brief heute unbedingt", role: "complement", order: 3 },
      { text: "abschicken", role: "verb_p2", order: 4 }
    ],
      en: "urgent red exclamation exclamation badge"
    },
    {
      de: "mindestens",
      pron: "mín-des-tens",
      es: "como mínimo / al menos",
      type: "Adverbio",
      category: "Gradadverbien",
      regimen: "-",
      plural: "-",
      exampleSentenceDe: "Die Fahrt dauert mindestens dreißig Minuten.",
      exampleSentenceEs: "El viaje dura como mínimo treinta minutos.",
    exampleSentenceDeBlocks: [
      { text: "Die Fahrt", role: "subject", order: 1 },
      { text: "dauert", role: "verb_p1", order: 2 },
      { text: "mindestens dreißig Minuten", role: "complement", order: 3 }
    ],
      en: "minimum value threshold mark on a meter"
    },
    {
      de: "höchstens",
      pron: "jójst-ens",
      es: "como máximo / a lo sumo",
      type: "Adverbio",
      category: "Gradadverbien",
      regimen: "-",
      plural: "-",
      exampleSentenceDe: "Die Reparatur kostet höchstens fünfzig Euro.",
      exampleSentenceEs: "La reparación cuesta como máximo cincuenta euros.",
    exampleSentenceDeBlocks: [
      { text: "Die Reparatur", role: "subject", order: 1 },
      { text: "kostet", role: "verb_p1", order: 2 },
      { text: "höchstens fünfzig Euro", role: "complement", order: 3 }
    ],
      en: "maximum ceiling value limit indicator"
    },
  {
    "de": "ach",
    "pron": "aj",
    "es": "ah / ay",
    "type": "Interjección / Partícula",
    "category": "Partikeln",
    "level": "A2–B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Ach, das habe ich ganz vergessen!",
    "exampleSentenceEs": "¡Ah, eso se me olvidó por completo!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ach,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "das",
        "role": "subject",
        "order": 2
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "ich ganz",
        "role": "complement",
        "order": 4
      },
      {
        "text": "vergessen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "aha",
    "pron": "a-já",
    "es": "ajá / ya entiendo",
    "type": "Interjección",
    "category": "Partikeln",
    "level": "A2–B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Aha, wohnt Sabrina auch in Bern?",
    "exampleSentenceEs": "Ajá, ¿Sabrina también vive en Berna?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Aha,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wohnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sabrina",
        "role": "subject",
        "order": 3
      },
      {
        "text": "auch in Bern",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "all-",
    "pron": "al-",
    "es": "todo / todos",
    "type": "Determinante / Pronombre",
    "category": "Adverbien",
    "level": "A1–B1",
    "regimen": "alles, alle, aller...",
    "exampleSentenceDe": "Alle Schüler mögen ihre Lehrerin sehr.",
    "exampleSentenceEs": "A todos los alumnos les agrada mucho su profesora.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle Schüler",
        "role": "subject",
        "order": 1
      },
      {
        "text": "mögen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ihre Lehrerin sehr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "allein",
    "pron": "a-láin",
    "es": "solo / únicamente",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Sin flexión",
    "exampleSentenceDe": "Ich wohne allein in einer kleinen Wohnung.",
    "exampleSentenceEs": "Vivo solo en un apartamento pequeño.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wohne",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "allein in einer kleinen Wohnung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "allerdings",
    "pron": "á-la-dings",
    "es": "sin embargo / por cierto",
    "type": "Adverbio / Conector",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 o campo medio",
    "exampleSentenceDe": "Der Job ist gut, allerdings ist die Arbeit schwer.",
    "exampleSentenceEs": "El empleo es bueno, sin embargo el trabajo es duro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Job",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gut, allerdings ist die Arbeit schwer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "aller-",
    "pron": "á-la-",
    "es": "del todo / el más (superlativo)",
    "type": "Prefijo / Determinante",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "zu allererst, allerbeste",
    "exampleSentenceDe": "Das ist mein allerbester Freund.",
    "exampleSentenceEs": "Ese es mi mejor amigo de todos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mein allerbester Freund",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "also",
    "pron": "ál-zo",
    "es": "así que / pues / por lo tanto",
    "type": "Adverbio / Conector",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Posición 0 o 1",
    "exampleSentenceDe": "Es regnet stark, also bleiben wir zu Hause.",
    "exampleSentenceEs": "Llueve fuerte, así que nos quedamos en casa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "regnet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "stark, also bleiben wir zu Hause",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ander-",
    "pron": "án-da-",
    "es": "otro / diferente",
    "type": "Determinante / Pronombre",
    "category": "Adverbien",
    "level": "A1–B1",
    "regimen": "der/die/das andere",
    "exampleSentenceDe": "Gefällt dir die Jacke? Nein, die andere ist schöner.",
    "exampleSentenceEs": "¿Te gusta la chaqueta? No, la otra es más bonita.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Gefällt",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "dir",
        "role": "complement",
        "order": 2
      },
      {
        "text": "die Jacke?",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Nein, die andere",
        "role": "subject",
        "order": 4
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "schöner",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "andererseits",
    "pron": "án-de-ra-zaits",
    "es": "por otro lado / por otra parte",
    "type": "Adverbio / Conector",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 (+ Inversión V2)",
    "exampleSentenceDe": "Einerseits will ich fahren, andererseits bin ich müde.",
    "exampleSentenceEs": "Por un lado quiero ir, por otro lado estoy cansado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Einerseits",
        "role": "subject",
        "order": 1
      },
      {
        "text": "will",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "fahren,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "andererseits",
        "role": "complement",
        "order": 5
      },
      {
        "text": "bin",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 7
      },
      {
        "text": "müde",
        "role": "complement",
        "order": 8
      }
    ]
  },
  {
    "de": "anders",
    "pron": "án-das",
    "es": "diferente / de otro modo",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "als",
    "exampleSentenceDe": "In Deutschland feiert man Weihnachten etwas anders.",
    "exampleSentenceEs": "En Alemania se celebra la Navidad algo diferente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Deutschland",
        "role": "subject",
        "order": 1
      },
      {
        "text": "feiert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man Weihnachten etwas anders",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "beide",
    "pron": "bái-de",
    "es": "ambos / los dos",
    "type": "Pronombre / Determinante",
    "category": "Adverbien",
    "level": "A1",
    "regimen": "Plural siempre",
    "exampleSentenceDe": "Meine Schwester und ich, wir beide arbeiten hier.",
    "exampleSentenceEs": "Mi hermana y yo, ambas trabajamos aquí.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Schwester und ich, wir beide",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeiten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "hier",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "dorthin",
    "pron": "dórt-jin",
    "es": "hacia allá / allí",
    "type": "Adverbio de dirección",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Responde a Wohin?",
    "exampleSentenceDe": "Der Zug fährt nach Hamburg, ich muss auch dorthin.",
    "exampleSentenceEs": "El tren va a Hamburgo, yo también tengo que ir allá.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Zug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nach Hamburg,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 4
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "auch dorthin",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "drüben",
    "pron": "drǘ-ben",
    "es": "allá enfrente / al otro lado",
    "type": "Adverbio de lugar",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Responde a Wo?",
    "exampleSentenceDe": "Die Post ist gleich da drüben auf der anderen Seite.",
    "exampleSentenceEs": "El correo está ahí enfrente, al otro lado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Post",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gleich da drüben auf der anderen Seite",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "eben",
    "pron": "é-ben",
    "es": "precisamente / hace un momento / pues",
    "type": "Adverbio / Partícula",
    "category": "Partikeln",
    "level": "A2–B1",
    "regimen": "Temporal / Modal",
    "exampleSentenceDe": "Er hat mich eben erst angerufen.",
    "exampleSentenceEs": "Él me acaba de llamar hace un momento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mich eben erst",
        "role": "complement",
        "order": 3
      },
      {
        "text": "angerufen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "ebenfalls",
    "pron": "é-ben-fals",
    "es": "igualmente / asimismo",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Posición 1 o campo medio",
    "exampleSentenceDe": "Schönes Wochenende! — Danke, ebenfalls!",
    "exampleSentenceEs": "¡Buen fin de semana! — ¡Gracias, igualmente!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Schönes Wochenende!",
        "role": "complement",
        "order": 1
      },
      {
        "text": "— Danke, ebenfalls",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "ebenso",
    "pron": "é-ben-zo",
    "es": "igualmente / del mismo modo",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "ebenso ... wie",
    "exampleSentenceDe": "Dieses Projekt ist ebenso wichtig wie das erste.",
    "exampleSentenceEs": "Este proyecto es tan importante como el primero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Projekt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ebenso wichtig wie das erste",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "einerseits",
    "pron": "ái-ne-ra-zaits",
    "es": "por un lado",
    "type": "Adverbio / Conector",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 (+ Inversión V2)",
    "exampleSentenceDe": "Einerseits ist die Miete hoch, aber die Lage ist super.",
    "exampleSentenceEs": "Por un lado el alquiler es alto, pero la ubicación es genial.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Einerseits",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Miete hoch, aber die Lage ist super",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "halt",
    "pron": "jalt",
    "es": "pues / simplemente",
    "type": "Partícula modal",
    "category": "Partikeln",
    "level": "B1",
    "regimen": "Uso coloquial",
    "exampleSentenceDe": "Das ist halt in Deutschland so geregelt.",
    "exampleSentenceEs": "Simplemente está regulado así en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "halt in Deutschland so",
        "role": "complement",
        "order": 3
      },
      {
        "text": "geregelt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "leider",
    "pron": "lái-da",
    "es": "lamentablemente / por desgracia",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A1–B1",
    "regimen": "Posición 1 o campo medio",
    "exampleSentenceDe": "Leider habe ich am Montag keine Zeit.",
    "exampleSentenceEs": "Lamentablemente no tengo tiempo el lunes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Leider",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich am Montag keine Zeit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "manch-",
    "pron": "manj-",
    "es": "alguno / algunos",
    "type": "Determinante indefinido",
    "category": "Adverbien",
    "level": "A1–B1",
    "regimen": "manche, manchmal",
    "exampleSentenceDe": "Manche Wörter sind am Anfang schwer auszusprechen.",
    "exampleSentenceEs": "Algunas palabras son difíciles de pronunciar al inicio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Manche Wörter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Anfang schwer",
        "role": "complement",
        "order": 3
      },
      {
        "text": "auszusprechen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "außerhalb",
    "pron": "áu-sa-jalp",
    "es": "fuera de",
    "type": "Adverbio / Preposición",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "+ Genitiv / von + Dat",
    "exampleSentenceDe": "Wir wohnen ruhig außerhalb von Berlin.",
    "exampleSentenceEs": "Vivimos tranquilos a las afueras de Berlín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wohnen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ruhig außerhalb von Berlin",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "beinahe",
    "pron": "bái-na-e",
    "es": "casi",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Sin flexión",
    "exampleSentenceDe": "Ich habe heute beinahe den letzten Bus verpasst.",
    "exampleSentenceEs": "Hoy casi pierdo el último autobús.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute beinahe den letzten Bus",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verpasst",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "bereits",
    "pron": "be-ráits",
    "es": "ya",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Haben Sie die Rechnung bereits überwiesen?",
    "exampleSentenceEs": "¿Ha transferido ya el importe de la factura?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Haben",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "die Rechnung bereits",
        "role": "complement",
        "order": 3
      },
      {
        "text": "überwiesen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "besonders",
    "pron": "be-zón-das",
    "es": "especialmente / sobre todo",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Graduador",
    "exampleSentenceDe": "Dieses Angebot ist heute besonders günstig.",
    "exampleSentenceEs": "Esta oferta es hoy especialmente económica.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Angebot",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute besonders günstig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bloß",
    "pron": "blos",
    "es": "solo / simplemente / ¡cuidado!",
    "type": "Adverbio / Partícula",
    "category": "Partikeln",
    "level": "B1",
    "regimen": "Modal",
    "exampleSentenceDe": "Komm bloß nicht zu spät zum Termin!",
    "exampleSentenceEs": "¡Ni se te ocurra llegar tarde a la cita!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Komm",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "bloß nicht zu spät zum Termin",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "dabei",
    "pron": "da-bái",
    "es": "en ello / consigo / presente",
    "type": "Adverbio pronominal",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "dabei sein",
    "exampleSentenceDe": "Ich habe leider kein Bargeld dabei.",
    "exampleSentenceEs": "Lamentablemente no llevo dinero en efectivo encima.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider kein Bargeld dabei",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "dafür",
    "pron": "da-fǘa",
    "es": "para ello / a favor de",
    "type": "Adverbio pronominal",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "dafür sein",
    "exampleSentenceDe": "Ich bin dafür, dass wir früh losfahren.",
    "exampleSentenceEs": "Estoy a favor de que salgamos temprano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bin",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dafür,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "dass",
        "role": "complement",
        "order": 4
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 5
      },
      {
        "text": "früh",
        "role": "complement",
        "order": 6
      },
      {
        "text": "losfahren",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "dagegen",
    "pron": "da-gué-guen",
    "es": "en contra / por el contrario",
    "type": "Adverbio pronominal",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "dagegen sein",
    "exampleSentenceDe": "Ich habe nichts dagegen, wenn wir jetzt gehen.",
    "exampleSentenceEs": "No tengo nada en contra de que nos vayamos ahora.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nichts dagegen,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "wenn",
        "role": "complement",
        "order": 4
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 5
      },
      {
        "text": "jetzt",
        "role": "complement",
        "order": 6
      },
      {
        "text": "gehen",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "daher",
    "pron": "da-jér",
    "es": "por eso / por lo tanto",
    "type": "Adverbio / Conector",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 (+ Inversión)",
    "exampleSentenceDe": "Er ist krank, daher kann er heute nicht kommen.",
    "exampleSentenceEs": "Está enfermo, por eso no puede venir hoy.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "krank,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "daher",
        "role": "complement",
        "order": 4
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "er",
        "role": "subject",
        "order": 6
      },
      {
        "text": "heute nicht",
        "role": "complement",
        "order": 7
      },
      {
        "text": "kommen",
        "role": "verb_p2",
        "order": 8
      }
    ]
  },
  {
    "de": "damals",
    "pron": "dá-mals",
    "es": "en aquel entonces",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Damals hatte ich noch kein eigenes Auto.",
    "exampleSentenceEs": "En aquel entonces todavía no tenía coche propio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Damals",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hatte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "noch kein eigenes Auto",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "danach",
    "pron": "da-náj",
    "es": "después / luego",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Zuerst kaufen wir ein, danach kochen wir zusammen.",
    "exampleSentenceEs": "Primero hacemos la compra, después cocinamos juntos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zuerst",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kaufen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ein,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "danach",
        "role": "complement",
        "order": 5
      },
      {
        "text": "kochen",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 7
      },
      {
        "text": "zusammen",
        "role": "complement",
        "order": 8
      }
    ]
  },
  {
    "de": "deswegen",
    "pron": "dés-ve-guen",
    "es": "por eso / por ese motivo",
    "type": "Adverbio / Conector",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 (+ Inversión)",
    "exampleSentenceDe": "Ich habe falsch geparkt, deswegen bekam ich einen Strafzettel.",
    "exampleSentenceEs": "Aparqué mal, por eso me pusieron una multa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "falsch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "geparkt,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "deswegen",
        "role": "complement",
        "order": 5
      },
      {
        "text": "bekam",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 7
      },
      {
        "text": "einen Strafzettel",
        "role": "complement",
        "order": 8
      }
    ]
  },
  {
    "de": "eigentlich",
    "pron": "ái-guent-lij",
    "es": "en realidad / propiamente",
    "type": "Adverbio / Partícula",
    "category": "Partikeln",
    "level": "A2–B1",
    "regimen": "Modal",
    "exampleSentenceDe": "Was willst du eigentlich von mir wissen?",
    "exampleSentenceEs": "¿Qué quieres saber en realidad de mí?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Was",
        "role": "complement",
        "order": 1
      },
      {
        "text": "willst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "du",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eigentlich von mir",
        "role": "complement",
        "order": 4
      },
      {
        "text": "wissen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "endlich",
    "pron": "ént-lij",
    "es": "por fin / finalmente",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Endlich haben wir eine schöne Wohnung gefunden!",
    "exampleSentenceEs": "¡Por fin hemos encontrado un piso bonito!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Endlich",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine schöne Wohnung",
        "role": "complement",
        "order": 4
      },
      {
        "text": "gefunden",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "etwa",
    "pron": "ét-va",
    "es": "aproximadamente / acaso",
    "type": "Adverbio / Partícula",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Sin flexión",
    "exampleSentenceDe": "Die Fahrt dauert etwa zwanzig Minuten.",
    "exampleSentenceEs": "El viaje dura aproximadamente veinte minutos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Fahrt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dauert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "etwa zwanzig Minuten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "eventuell",
    "pron": "e-ven-tu-él",
    "es": "posiblemente / eventualmente",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Sin flexión",
    "exampleSentenceDe": "Ich komme morgen eventuell etwas später.",
    "exampleSentenceEs": "Mañana llegaré posiblemente algo más tarde.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "komme",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "morgen eventuell etwas später",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "fast",
    "pron": "fast",
    "es": "casi",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Sin flexión",
    "exampleSentenceDe": "Ich habe fast alles im Text verstanden.",
    "exampleSentenceEs": "He entendido casi todo en el texto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fast alles im Text",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verstanden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "hin",
    "pron": "jin",
    "es": "hacia allá",
    "type": "Adverbio de dirección",
    "category": "Adverbien",
    "level": "A1–B1",
    "regimen": "(alejándose del hablante)",
    "exampleSentenceDe": "Wo gehst du hin?",
    "exampleSentenceEs": "¿A dónde vas?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wo",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gehst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "du",
        "role": "subject",
        "order": 3
      },
      {
        "text": "hin",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "hinten",
    "pron": "jín-ten",
    "es": "detrás / atrás",
    "type": "Adverbio de lugar",
    "category": "Adverbien",
    "level": "A1",
    "regimen": "Responde a Wo?",
    "exampleSentenceDe": "Der Eingang ist hinten.",
    "exampleSentenceEs": "La entrada está atrás.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Eingang",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "hinten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "hinterher",
    "pron": "jín-ta-jea",
    "es": "después / detrás de",
    "type": "Adverbio temporal",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 o campo medio",
    "exampleSentenceDe": "Wir können uns hinterher noch treffen.",
    "exampleSentenceEs": "Podemos vernos después todavía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "können",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns hinterher noch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "treffen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "hoch",
    "pron": "joj",
    "es": "arriba / alto",
    "type": "Adverbio de dirección",
    "category": "Adverbien",
    "level": "A2",
    "regimen": "(movimiento vertical)",
    "exampleSentenceDe": "Bring bitte die Kisten hoch.",
    "exampleSentenceEs": "Sube las cajas, por favor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bring",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "bitte die Kisten",
        "role": "complement",
        "order": 2
      },
      {
        "text": "hoch",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "hoffentlich",
    "pron": "jó-fent-lij",
    "es": "ojalá",
    "type": "Adverbio / Partícula",
    "category": "Adverbien",
    "level": "A1",
    "regimen": "Posición 1 (+ Inversión)",
    "exampleSentenceDe": "Hoffentlich hat der Zug keine Verspätung.",
    "exampleSentenceEs": "Ojalá el tren no tenga retraso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hoffentlich",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Zug",
        "role": "subject",
        "order": 3
      },
      {
        "text": "keine Verspätung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "innen",
    "pron": "í-nen",
    "es": "dentro / en el interior",
    "type": "Adverbio de lugar",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Responde a Wo?",
    "exampleSentenceDe": "Der Lichtschalter ist innen links.",
    "exampleSentenceEs": "El interruptor de la luz está dentro a la izquierda.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Lichtschalter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "innen links",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "insgesamt",
    "pron": "íns-gue-zamt",
    "es": "en total",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Posición 1 o campo medio",
    "exampleSentenceDe": "Insgesamt haben sich zwanzig Personen angemeldet.",
    "exampleSentenceEs": "En total se han inscrito veinte personas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Insgesamt",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zwanzig Personen",
        "role": "subject",
        "order": 4
      },
      {
        "text": "angemeldet",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "irren (sich)",
    "pron": "í-ren",
    "es": "equivocarse",
    "type": "Verbo reflexivo",
    "category": "Basisverben",
    "level": "B1",
    "regimen": "irrt sich, irrte sich, hat sich geirrt",
    "exampleSentenceDe": "Entschuldigung, ich habe mich in der Tür geirrt.",
    "exampleSentenceEs": "Disculpe, me he equivocado de puerta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Entschuldigung,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "mich in der Tür",
        "role": "complement",
        "order": 4
      },
      {
        "text": "geirrt",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "kaum",
    "pron": "kaum",
    "es": "apenas / casi no",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 o campo medio",
    "exampleSentenceDe": "Ich kann Sie kaum verstehen, es ist zu laut.",
    "exampleSentenceEs": "Apenas puedo entenderle, está demasiado alto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie kaum",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verstehen,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "es",
        "role": "subject",
        "order": 5
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "zu laut",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "los",
    "pron": "los",
    "es": "¡vamos! / suelto",
    "type": "Partícula",
    "category": "Partikeln",
    "level": "A1–B1",
    "regimen": "Interjección",
    "exampleSentenceDe": "Achtung, fertig, los!",
    "exampleSentenceEs": "¡Preparados, listos, ya!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Achtung, fertig,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "los",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "manche",
    "pron": "mán-je",
    "es": "algunos / algunas",
    "type": "Pronombre indefinido",
    "category": "Pronomen",
    "level": "A1–B1",
    "regimen": "Declina como adjetivo fuerte",
    "exampleSentenceDe": "Manche Leute trinken keinen Kaffee.",
    "exampleSentenceEs": "Algunas personas no beben café.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Manche Leute",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trinken",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "keinen Kaffee",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "meistens",
    "pron": "máis-tens",
    "es": "la mayoría de las veces / casi siempre",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "A2–B1",
    "regimen": "Frecuencia",
    "exampleSentenceDe": "Meistens trinke ich nur Tee zum Frühstück.",
    "exampleSentenceEs": "Casi siempre tomo solo té para desayunar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meistens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "trinke",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "nur Tee zum Frühstück",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "mitten",
    "pron": "mí-ten",
    "es": "en medio de",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "mitten in / auf",
    "exampleSentenceDe": "Das Flugzeug landete mitten in der Nacht.",
    "exampleSentenceEs": "El avión aterrizó en medio de la noche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Flugzeug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "landete",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mitten in der Nacht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "möglichst",
    "pron": "mö́-klijst",
    "es": "lo más (rápido, pronto) posible",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "möglichst + Adjetivo/Adverbio",
    "exampleSentenceDe": "Bitte antworten Sie möglichst schnell.",
    "exampleSentenceEs": "Por favor, responda lo más rápido posible.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "antworten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "möglichst schnell",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "neulich",
    "pron": "nói-lij",
    "es": "hace poco / recientemente",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Temporal",
    "exampleSentenceDe": "Ich habe neulich unseren alten Lehrer gesehen.",
    "exampleSentenceEs": "Hace poco vi a nuestro antiguo profesor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "neulich unseren alten Lehrer",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gesehen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "nirgends",
    "pron": "nír-guents",
    "es": "en ninguna parte",
    "type": "Adverbio de lugar",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Antónimo: überall",
    "exampleSentenceDe": "Ich kann meinen Schlüssel nirgends finden.",
    "exampleSentenceEs": "No puedo encontrar mi llave en ninguna parte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meinen Schlüssel nirgends",
        "role": "complement",
        "order": 3
      },
      {
        "text": "finden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "nirgendwo",
    "pron": "nír-guent-vo",
    "es": "en ninguna parte",
    "type": "Adverbio de lugar",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Sinónimo: nirgends",
    "exampleSentenceDe": "Er ist nirgendwo zu sehen.",
    "exampleSentenceEs": "No se le ve por ninguna parte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nirgendwo",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu sehen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "ob",
    "pron": "op",
    "es": "si (condicional/duda indirecta)",
    "type": "Conjunción subordinante",
    "category": "Nebensätze",
    "level": "A2–B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Ich weiß noch nicht, ob ich kommen kann.",
    "exampleSentenceEs": "Aún no sé si puedo venir.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "weiß",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch nicht, ob ich",
        "role": "complement",
        "order": 3
      },
      {
        "text": "kommen kann",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "offenbar",
    "pron": "ó-fen-bar",
    "es": "al parecer / por lo visto",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Posición 1 o campo medio",
    "exampleSentenceDe": "Offenbar hat er den Termin vergessen.",
    "exampleSentenceEs": "Al parecer, ha olvidado la cita.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Offenbar",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "er",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Termin",
        "role": "complement",
        "order": 4
      },
      {
        "text": "vergessen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "rand | rüber | rum",
    "pron": "rant | rǘ-ba | rum",
    "es": "(partículas de dirección acortadas coloquiales)",
    "type": "Partículas/Adverbios",
    "category": "Partikeln",
    "level": "B1",
    "regimen": "heran, herüber, herum",
    "exampleSentenceDe": "Komm mal kurz rüber zu mir!",
    "exampleSentenceEs": "¡Ven un momento aquí conmigo!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Komm",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "mal kurz",
        "role": "complement",
        "order": 2
      },
      {
        "text": "rüber",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "zu mir",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "solange",
    "pron": "zo-lán-gue",
    "es": "mientras / en tanto que",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Solange Sie hohes Fieber haben, dürfen Sie nicht arbeiten.",
    "exampleSentenceEs": "Mientras tenga fiebre alta, no puede trabajar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Solange",
        "role": "complement",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "hohes Fieber",
        "role": "complement",
        "order": 3
      },
      {
        "text": "haben,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "dürfen",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 6
      },
      {
        "text": "nicht",
        "role": "complement",
        "order": 7
      },
      {
        "text": "arbeiten",
        "role": "verb_p2",
        "order": 8
      }
    ]
  },
  {
    "de": "solch-",
    "pron": "zolj",
    "es": "tal / semejante",
    "type": "Pronombre / Determinante",
    "category": "Pronomen",
    "level": "B1",
    "regimen": "solche Schuhe / ein solcher...",
    "exampleSentenceDe": "Solche Schuhe aus Leder finde ich wirklich toll.",
    "exampleSentenceEs": "Unos zapatos de cuero así me parecen realmente geniales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Solche Schuhe aus Leder",
        "role": "complement",
        "order": 1
      },
      {
        "text": "finde",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "wirklich toll",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "sowieso",
    "pron": "zó-vi-zo",
    "es": "de todos modos / en cualquier caso",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Modal",
    "exampleSentenceDe": "Willst du mir den Brief mitgeben? Ich gehe sowieso zur Post.",
    "exampleSentenceEs": "¿Quieres darme la carta? Voy a la oficina de correos de todos modos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Willst",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "mir den Brief",
        "role": "complement",
        "order": 3
      },
      {
        "text": "mitgeben?",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "Ich",
        "role": "subject",
        "order": 5
      },
      {
        "text": "gehe",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "sowieso zur Post",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "sowohl ... als auch",
    "pron": "zo-vól ... als auj",
    "es": "tanto ... como",
    "type": "Conector Doble",
    "category": "Konnektoren",
    "level": "B1",
    "regimen": "Copulativo de suma",
    "exampleSentenceDe": "Sowohl Sie als auch Ihre Frau müssen den Vertrag unterschreiben.",
    "exampleSentenceEs": "Tanto usted como su esposa deben firmar el contrato.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sowohl Sie als auch Ihre Frau",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Vertrag",
        "role": "complement",
        "order": 3
      },
      {
        "text": "unterschreiben",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "tatsächlich",
    "pron": "tat-zéj-lij",
    "es": "en realidad / de hecho",
    "type": "Adverbio / Adjetivo",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Modal",
    "exampleSentenceDe": "Die Hose ist tatsächlich zu klein, obwohl sie so groß aussieht.",
    "exampleSentenceEs": "El pantalón es de hecho demasiado pequeño, aunque parezca tan grande.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Hose",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "tatsächlich zu klein,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "obwohl",
        "role": "complement",
        "order": 4
      },
      {
        "text": "sie",
        "role": "subject",
        "order": 5
      },
      {
        "text": "so groß",
        "role": "complement",
        "order": 6
      },
      {
        "text": "aussieht",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "teilweise",
    "pron": "táil-vai-ze",
    "es": "en parte / parcialmente",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Modal",
    "exampleSentenceDe": "War der Grammatiktest am Ende schwierig? — Teilweise.",
    "exampleSentenceEs": "¿Fue difícil el examen de gramática al final? — En parte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "War",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "der Grammatiktest",
        "role": "subject",
        "order": 2
      },
      {
        "text": "am Ende schwierig? — Teilweise",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "überhaupt",
    "pron": "ǘ-ba-jaupt",
    "es": "en absoluto / en general",
    "type": "Adverbio / Partícula",
    "category": "Partikeln",
    "level": "B1",
    "regimen": "Intensificador con negación",
    "exampleSentenceDe": "Die Suppe schmeckt mir heute überhaupt nicht.",
    "exampleSentenceEs": "La sopa de hoy no me gusta en absoluto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Suppe",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schmeckt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir heute überhaupt nicht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "umgekehrt",
    "pron": "úm-gue-kert",
    "es": "al revés / a la inversa",
    "type": "Adverbio / Adjetivo",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Modal",
    "exampleSentenceDe": "Nein, umgekehrt: erst der Vorname, dann der Nachname.",
    "exampleSentenceEs": "No, al revés: primero el nombre de pila, luego el apellido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nein, umgekehrt:",
        "role": "complement",
        "order": 1
      },
      {
        "text": "erst der Vorname, dann der Nachname",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "umsonst",
    "pron": "um-zónst",
    "es": "gratis / en vano",
    "type": "Adverbio",
    "category": "Adverbien",
    "level": "B1",
    "regimen": "Modal",
    "exampleSentenceDe": "Ich musste nichts bezahlen. Die Reparatur war umsonst.",
    "exampleSentenceEs": "No tuve que pagar nada. La reparación fue gratis.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "musste",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nichts",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bezahlen.",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "Die Reparatur",
        "role": "subject",
        "order": 5
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "umsonst",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "weder ... noch",
    "pron": "vé-da ... noj",
    "es": "ni ... ni",
    "type": "Conector Doble",
    "category": "Konnektoren",
    "level": "B1",
    "regimen": "Posición 0",
    "exampleSentenceDe": "Für einen langen Urlaub haben wir weder Zeit noch Geld.",
    "exampleSentenceEs": "Para unas largas vacaciones no tenemos ni tiempo ni dinero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für einen langen Urlaub",
        "role": "complement",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "weder Zeit noch Geld",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "weshalb",
    "pron": "ves-jálp",
    "es": "por qué (motivo) / por lo cual",
    "type": "Pronombre / Adverbio",
    "category": "Fragewörter",
    "level": "B1",
    "regimen": "Causal (como 'warum')",
    "exampleSentenceDe": "Weshalb rufst du mich nicht mal am Wochenende an?",
    "exampleSentenceEs": "¿Por qué no me llamas alguna vez el fin de semana?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Weshalb",
        "role": "complement",
        "order": 1
      },
      {
        "text": "rufst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "du",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mich nicht mal am Wochenende",
        "role": "complement",
        "order": 4
      },
      {
        "text": "an",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "wieso",
    "pron": "vi-zó",
    "es": "por qué / cómo así",
    "type": "Adverbio interrogativo",
    "category": "Fragewörter",
    "level": "A2–B1",
    "regimen": "Causal",
    "exampleSentenceDe": "Wie lange sind Sie hier? — Wieso fragen Sie?",
    "exampleSentenceEs": "¿Cuánto tiempo lleva aquí? — ¿Por qué lo pregunta?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie lange",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "hier? —",
        "role": "complement",
        "order": 4
      },
      {
        "text": "Wieso",
        "role": "complement",
        "order": 5
      },
      {
        "text": "fragen",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 7
      }
    ]
  },
  {
    "de": "worüber",
    "pron": "vo-rǘ-ba",
    "es": "sobre qué / de qué",
    "type": "Adverbio pronominal",
    "category": "Fragewörter",
    "level": "B1",
    "regimen": "Para cosas/ideas (+ Akk)",
    "exampleSentenceDe": "Worüber lachen Sie bei diesem Film so laut?",
    "exampleSentenceEs": "¿De qué se ríe tan fuerte con esta película?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Worüber",
        "role": "complement",
        "order": 1
      },
      {
        "text": "lachen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "bei diesem Film so laut",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "worum",
    "pron": "vo-rúm",
    "es": "de qué (se trata)",
    "type": "Adverbio pronominal",
    "category": "Fragewörter",
    "level": "B1",
    "regimen": "Para cosas (es geht um...)",
    "exampleSentenceDe": "Kann ich Herrn Meier sprechen? — Worum geht es denn?",
    "exampleSentenceEs": "¿Puedo hablar con el Sr. Meier? — ¿De qué se trata?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Kann",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "Herrn Meier",
        "role": "complement",
        "order": 3
      },
      {
        "text": "sprechen?",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "— Worum",
        "role": "complement",
        "order": 5
      },
      {
        "text": "geht",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "es",
        "role": "subject",
        "order": 7
      },
      {
        "text": "denn",
        "role": "complement",
        "order": 8
      }
    ]
  },
  {
    "de": "zwar",
    "pron": "tsvar",
    "es": "es cierto que / a saber",
    "type": "Adverbio / Partícula",
    "category": "Konnektoren",
    "level": "B1",
    "regimen": "zwar ... aber",
    "exampleSentenceDe": "Diese Schuhe sind zwar teuer, aber sehr gut.",
    "exampleSentenceEs": "Estos zapatos son caros, es cierto, pero muy buenos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Diese Schuhe",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zwar teuer, aber sehr gut",
        "role": "complement",
        "order": 3
      }
    ]
  }
]
},
{
  id: 6,
  title: "Kapitel 6: Grammatik: Konnektoren",
  icon: <Link2 size={20} />,
  emoji: "🔗",
  words: [{
    de: "und",
    pron: "unt",
    es: "y",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Ich habe Kaffee und Kuchen.",
    exampleSentenceEs: "Yo tengo café y pastel.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Kaffee und Kuchen", role: "complement", order: 3 }
    ],
    regimen: "No afecta orden"
  }, {
    de: "oder",
    pron: "ó-dea",
    es: "o (alternativa)",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Möchtest du Tee oder Kaffee?",
    exampleSentenceEs: "¿Quieres té o café?",
    exampleSentenceDeBlocks: [
      { text: "Möchtest", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "Tee oder Kaffee", role: "complement", order: 3 }
    ],
    regimen: "No cuenta posición"
  }, {
    de: "aber",
    pron: "á-bea",
    es: "pero",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Ich habe Hunger, aber ich habe keine Zeit.",
    exampleSentenceEs: "Tengo hambre, pero no tengo tiempo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Hunger, aber ich habe keine Zeit", role: "complement", order: 3 }
    ],
    regimen: "No cuenta posición"
  }, {
    de: "denn",
    pron: "den",
    es: "porque / pues",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Ich habe Hunger, denn ich esse gern.",
    exampleSentenceEs: "Tengo hambre, pues me gusta comer.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Hunger, denn ich esse gern", role: "complement", order: 3 }
    ],
    regimen: "No cambia el orden"
  }, {
    de: "sondern",
    pron: "són-dean",
    es: "sino (que)",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Ich bin nicht müde, sondern ich bin hungrig.",
    exampleSentenceEs: "No estoy cansado, sino que tengo hambre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "nicht müde, sondern ich bin hungrig", role: "complement", order: 3 }
    ],
    regimen: "Tras negación (nicht...)"
  }, {
    de: "für",
    pron: "füa",
    es: "para / por",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Das Geschenk ist für dich.",
    exampleSentenceEs: "El regalo es para ti.",
    exampleSentenceDeBlocks: [
      { text: "Das Geschenk", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "für dich", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "ohne",
    pron: "ó-ne",
    es: "sin",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich trinke Kaffee ohne Zucker.",
    exampleSentenceEs: "Bebo café sin azúcar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "Kaffee ohne Zucker", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "durch",
    pron: "durj",
    es: "a través de / por",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Wir gehen durch den Park.",
    exampleSentenceEs: "Nosotros vamos por el parque.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "gehen", role: "verb_p1", order: 2 },
      { text: "durch den Park", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "gegen",
    pron: "gué-guen",
    es: "contra / hacia (hora)",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Es ist gegen 10 Uhr.",
    exampleSentenceEs: "Son las 10 en punto.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gegen 10 Uhr", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "um",
    pron: "um",
    es: "a las (hora) / alrededor de",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Der Zug kommt um acht Uhr an.",
    exampleSentenceEs: "El tren llega a las ocho en punto.",
    exampleSentenceDeBlocks: [
      { text: "Der Zug", role: "subject", order: 1 },
      { text: "kommt", role: "verb_p1", order: 2 },
      { text: "um acht Uhr", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "mit",
    pron: "mit",
    es: "con",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich gehe mit meinem Freund.",
    exampleSentenceEs: "Voy con mi amigo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "mit meinem Freund", role: "complement", order: 3 }
    ],
    regimen: "⚠️ Obliga Dativo"
  }, {
    de: "nach",
    pron: "naj",
    es: "hacia / después de",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Nach dem Essen gehe ich nach Hause.",
    exampleSentenceEs: "Después de la comida, voy a casa.",
    exampleSentenceDeBlocks: [
      { text: "Nach dem", role: "subject", order: 1 },
      { text: "Essen", role: "verb_p1", order: 2 },
      { text: "gehe ich nach Hause", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "aus",
    pron: "áus",
    es: "de (origen / material)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich komme aus Spanien.",
    exampleSentenceEs: "Yo vengo de España.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "komme", role: "verb_p1", order: 2 },
      { text: "aus Spanien", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "bei",
    pron: "bái",
    es: "en casa de / en (empresa)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich bin bei meiner Freundin.",
    exampleSentenceEs: "Yo estoy en casa de mi amiga.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "bei meiner Freundin", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "von",
    pron: "fon",
    es: "de (procedencia / autor)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Das Buch ist von Anna.",
    exampleSentenceEs: "El libro es de Anna.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "von Anna", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "zu",
    pron: "tsu",
    es: "hacia (lugares / personas)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich gehe zu meiner Mutter.",
    exampleSentenceEs: "Voy hacia mi madre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "zu meiner Mutter", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "seit",
    pron: "sait",
    es: "desde (tiempo)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich wohne seit einem Jahr in Berlin.",
    exampleSentenceEs: "Vivo desde hace un año en Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "seit einem Jahr in Berlin", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "in",
    pron: "in",
    es: "en / dentro de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Ich bin in der Schule.",
    exampleSentenceEs: "Yo estoy en la escuela.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "in der Schule", role: "complement", order: 3 }
    ],
    regimen: "Wo=Dat, Wohin=Akk"
  }, {
    de: "an",
    pron: "an",
    es: "en (borde / fechas)",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Ich bin am Montag in Berlin.",
    exampleSentenceEs: "Yo estoy el lunes en Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "am Montag in Berlin", role: "complement", order: 3 }
    ],
    regimen: "Wo?=Dat, Wohin?=Akk"
  }, {
    de: "auf",
    pron: "áuf",
    es: "sobre (con contacto)",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist auf dem Tisch.",
    exampleSentenceEs: "El libro está sobre la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "auf dem Tisch", role: "complement", order: 3 }
    ],
    regimen: "Wo:Dat/Wohin:Akk"
  }, {
    de: "unter",
    pron: "ún-tea",
    es: "debajo de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist unter dem Tisch.",
    exampleSentenceEs: "El libro está debajo de la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "unter dem Tisch", role: "complement", order: 3 }
    ],
    regimen: "Wo=Dat, Wohin=Akk"
  }, {
    de: "über",
    pron: "ú-ba",
    es: "sobre (sin contacto) / acerca de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Der Mann spricht über die Familie.",
    exampleSentenceEs: "El hombre habla sobre la familia.",
    exampleSentenceDeBlocks: [
      { text: "Der Mann", role: "subject", order: 1 },
      { text: "spricht", role: "verb_p1", order: 2 },
      { text: "über die Familie", role: "complement", order: 3 }
    ],
    regimen: "Akk=movim./Dat=lugar"
  }, {
    de: "neben",
    pron: "né-ben",
    es: "al lado de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Der Stuhl ist neben dem Tisch.",
    exampleSentenceEs: "La silla está al lado de la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Der Stuhl", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neben dem Tisch", role: "complement", order: 3 }
    ],
    regimen: "Wo?=Dat, Wohin?=Akk"
  }, {
    de: "zwischen",
    pron: "tsví-shen",
    es: "entre",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist zwischen dem Tisch und dem Stuhl.",
    exampleSentenceEs: "El libro está entre la mesa y la silla.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "zwischen dem Tisch und dem Stuhl", role: "complement", order: 3 }
    ],
    regimen: "Akk:movim./Dat:lugar"
  }, {
    de: "vor",
    pron: "fó-a",
    es: "delante de / antes de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Vor dem Haus ist ein Baum.",
    exampleSentenceEs: "Delante de la casa hay un árbol.",
    exampleSentenceDeBlocks: [
      { text: "Vor dem Haus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Baum", role: "complement", order: 3 }
    ],
    regimen: "Wo?=Dat, Wohin?=Akk"
  }, {
    de: "hinter",
    pron: "jín-tea",
    es: "detrás de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist hinter dem Tisch.",
    exampleSentenceEs: "El libro está detrás de la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Das Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hinter dem Tisch", role: "complement", order: 3 }
    ],
    regimen: "Wo?+Dat, Wohin?+Akk"
  }, {
    de: "obwohl",
    pron: "op-vól",
    es: "aunque",
    type: "Conector Subordinante",
    category: "Nebensätze",
    exampleSentenceDe: "Ich gehe spazieren, obwohl es regnet.",
    exampleSentenceEs: "Salgo a pasear, aunque llueve.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "spazieren, obwohl es", role: "complement", order: 3 },
      { text: "regnet", role: "verb_p2", order: 4 }
    ],
    regimen: "Verbo al final"
  }, {
    de: "wenn",
    pron: "ven",
    es: "si(condicional)",
    type: "Conector Subordinante",
    category: "Nebensätze",
    exampleSentenceDe: "Wenn ich Zeit habe, lerne ich Deutsch.",
    exampleSentenceEs: "Si tengo tiempo, aprendo alemán.",
    exampleSentenceDeBlocks: [
      { text: "Wenn ich Zeit", role: "complement", order: 1 },
      { text: "habe,", role: "verb_p2", order: 2 },
      { text: "lerne", role: "verb_p1", order: 3 },
      { text: "ich", role: "subject", order: 4 },
      { text: "Deutsch", role: "complement", order: 5 }
    ],
    regimen: "Verbo al final"
  }, {
    de: "als",
    pron: "als",
    es: "cuando",
    type: "Conector Subordinante",
    category: "Nebensätze",
    exampleSentenceDe: "Ich war klein, als ich Kind war.",
    exampleSentenceEs: "Yo era pequeño cuando era niño.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "war", role: "verb_p1", order: 2 },
      { text: "klein, als ich Kind", role: "complement", order: 3 },
      { text: "war", role: "verb_p2", order: 4 }
    ],
    regimen: "Verbo al final"
  }, {
    de: "deshalb",
    pron: "des-hálp",
    es: "por eso",
    type: "Conector Posición 1",
    category: "Konnektoren",
    exampleSentenceDe: "Ich habe Hunger. Deshalb esse ich Pizza.",
    exampleSentenceEs: "Tengo hambre. Por eso como pizza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Hunger", role: "complement", order: 3 }
    ],
    regimen: "Verbo en pos.2 tras él"
  }, {
    de: "trotzdem",
    pron: "tróts-dem",
    es: "sin embargo",
    type: "Conector Posición 1",
    category: "Konnektoren",
    exampleSentenceDe: "Es regnet. Trotzdem gehe ich spazieren.",
    exampleSentenceEs: "Está lloviendo. Sin embargo, voy a pasear.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "regnet", role: "verb_p1", order: 2 }
    ],
    regimen: "Ocupa posición 1, verbo pos.2"
  }, {
    de: "außerdem",
    pron: "áu-sea-dem",
    es: "además",
    type: "Conector Posición 1",
    category: "Konnektoren",
    exampleSentenceDe: "Ich trinke Kaffee. Außerdem trinke ich Tee.",
    exampleSentenceEs: "Bebo café. Además, bebo té.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "Kaffee", role: "complement", order: 3 }
    ],
    regimen: "Verbo en posición 1"
  }, {
    de: "nämlich",
    pron: "ném-lij",
    es: "es decir",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Ich habe ein Problem, nämlich: Ich habe keinen Hunger.",
    exampleSentenceEs: "Tengo un problema, es decir: No tengo hambre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Problem, nämlich: Ich habe keinen Hunger", role: "complement", order: 3 }
    ],
    regimen: "Explica motivo"
  }, {
    de: "doch",
    pron: "doj",
    es: "sí (rechaza negación)",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Du bist müde. Nein! Ich bin doch nicht müde.",
    exampleSentenceEs: "Estás cansado. ¡No! Sí que no estoy cansado.",
    exampleSentenceDeBlocks: [
      { text: "Du", role: "subject", order: 1 },
      { text: "bist", role: "verb_p1", order: 2 },
      { text: "müde", role: "complement", order: 3 }
    ],
    regimen: "Contradice negación"
  }, {
    de: "mal",
    pron: "mal",
    es: "(Partícula de énfasis)",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Das ist mal gut.",
    exampleSentenceEs: "Esto está bien, ¡eh! / Esto sí que está bien.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mal gut", role: "complement", order: 3 }
    ],
    regimen: "Suaviza imperativo"
  }, {
    de: "ja",
    pron: "yá",
    es: "sí (Partícula de énfasis)",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Ja, das ist gut.",
    exampleSentenceEs: "Sí, eso está bien.",
    exampleSentenceDeBlocks: [
      { text: "Ja, das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    regimen: "Énfasis, sin traducción literal"
  },
    {
      de: "weil",
      pron: "vail",
      es: "porque (causal)",
      type: "Conector Subordinante",
      category: "Nebensätze",
      regimen: "Verbo al final",
      plural: "-",
      exampleSentenceDe: "Ich lerne Deutsch, weil ich in Deutschland lebe.",
      exampleSentenceEs: "Aprendo alemán porque vivo en Alemania.",
    exampleSentenceDeBlocks: [
      { text: "Ich lerne Deutsch,", role: "subject", order: 1 },
      { text: "weil ich", role: "verb_p1", order: 2 },
      { text: "in Deutschland", role: "complement", order: 3 },
      { text: "lebe", role: "verb_p2", order: 4 }
    ],
      en: "cause and effect connecting logic arrow link"
    },
    {
      de: "dass",
      pron: "das",
      es: "que (completiva)",
      type: "Conector Subordinante",
      category: "Nebensätze",
      regimen: "Verbo al final",
      plural: "-",
      exampleSentenceDe: "Ich weiß, dass der Unterricht um 9 Uhr beginnt.",
      exampleSentenceEs: "Sé que la clase comienza a las 9:00.",
    exampleSentenceDeBlocks: [
      { text: "Ich weiß,", role: "subject", order: 1 },
      { text: "dass der Unterricht", role: "verb_p1", order: 2 },
      { text: "um 9 Uhr", role: "complement", order: 3 },
      { text: "beginnt", role: "verb_p2", order: 4 }
    ],
      en: "statement speech bubble within a larger bubble"
    },
    {
      de: "um ... zu",
      pron: "um ... tsu",
      es: "para (+ infinitivo)",
      type: "Estructura Infinitiva",
      category: "Nebensätze",
      regimen: "Infinitivo con zu al final",
      plural: "-",
      exampleSentenceDe: "Ich gehe zur Bank, um Geld abzuheben.",
      exampleSentenceEs: "Voy al banco para retirar dinero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "zur Bank, um Geld abzuheben", role: "complement", order: 3 }
    ],
      en: "target bulls eye purpose arrow hitting center"
    },
    {
      de: "trotz",
      pron: "trots",
      es: "a pesar de",
      type: "Preposición",
      category: "Präpositionen",
      regimen: "+ Genitiv / Dativ",
      plural: "-",
      exampleSentenceDe: "Trotz des Regens fahre ich mit dem Fahrrad.",
      exampleSentenceEs: "A pesar de la lluvia voy en bicicleta.",
    exampleSentenceDeBlocks: [
      { text: "Trotz des Regens", role: "subject", order: 1 },
      { text: "fahre", role: "verb_p1", order: 2 },
      { text: "ich mit dem Fahrrad", role: "complement", order: 3 }
    ],
      en: "person walking with yellow umbrella in pouring rain"
    },
    {
      de: "außer",
      pron: "áu-sea",
      es: "excepto / salvo",
      type: "Preposición (Dat)",
      category: "Präpositionen",
      regimen: "+ Dativo",
      plural: "-",
      exampleSentenceDe: "Außer mir ist niemand im Büro.",
      exampleSentenceEs: "Excepto yo, no hay nadie en la oficina.",
    exampleSentenceDeBlocks: [
      { text: "Außer mir", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "niemand im Büro", role: "complement", order: 3 }
    ],
      en: "one colored marble standing apart from grey marbles"
    },
    {
      de: "gegenüber",
      pron: "gue-guen-ú-ba",
      es: "enfrente de / frente a",
      type: "Preposición (Dat)",
      category: "Präpositionen",
      regimen: "+ Dativo",
      plural: "-",
      exampleSentenceDe: "Die Post liegt direkt gegenüber dem Bahnhof.",
      exampleSentenceEs: "La oficina postal queda justo enfrente de la estación de tren.",
    exampleSentenceDeBlocks: [
      { text: "Die Post", role: "subject", order: 1 },
      { text: "liegt", role: "verb_p1", order: 2 },
      { text: "direkt gegenüber dem Bahnhof", role: "complement", order: 3 }
    ],
      en: "two buildings facing each other across a clean street"
    },
    {
      de: "bis",
      pron: "bis",
      es: "hasta",
      type: "Preposición (Akk)",
      category: "Präpositionen",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Der Zug fährt nur bis München.",
      exampleSentenceEs: "El tren solo viaja hasta Múnich.",
    exampleSentenceDeBlocks: [
      { text: "Der Zug", role: "subject", order: 1 },
      { text: "fährt", role: "verb_p1", order: 2 },
      { text: "nur bis München", role: "complement", order: 3 }
    ],
      en: "railroad track reaching a terminal finish line buffer"
    },
    {
      de: "entlang",
      pron: "ent-láng",
      es: "a lo largo de",
      type: "Preposición (Akk)",
      category: "Präpositionen",
      regimen: "Pospuesta + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Gehen Sie diesen Fluss entlang.",
      exampleSentenceEs: "Vaya a lo largo de este río.",
    exampleSentenceDeBlocks: [
      { text: "Gehen", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "diesen Fluss entlang", role: "complement", order: 3 }
    ],
      en: "walking path winding alongside a blue river"
    },
    {
      de: "wegen",
      pron: "vé-guen",
      es: "debido a / a causa de",
      type: "Preposición (Gen/Dat)",
      category: "Präpositionen",
      regimen: "+ Genitiv / Dativ",
      plural: "-",
      exampleSentenceDe: "Wegen des Sturms fällt der Zug heute aus.",
      exampleSentenceEs: "Debido a la tormenta, el tren se cancela hoy.",
    exampleSentenceDeBlocks: [
      { text: "Wegen", role: "verb_p1", order: 1 },
      { text: "des Sturms", role: "subject", order: 2 },
      { text: "fällt der Zug heute", role: "complement", order: 3 },
      { text: "aus", role: "verb_p2", order: 4 }
    ],
      en: "storm cloud knocking tree branches onto road"
    },
    {
      de: "während",
      pron: "vé-rent",
      es: "durante",
      type: "Preposición (Gen/Dat)",
      category: "Präpositionen",
      regimen: "+ Genitiv / Dativ",
      plural: "-",
      exampleSentenceDe: "Während der Arbeitszeit darf man nicht privat telefonieren.",
      exampleSentenceEs: "Durante el horario de trabajo no se permite hablar por teléfono en privado.",
    exampleSentenceDeBlocks: [
      { text: "Während der Arbeitszeit", role: "subject", order: 1 },
      { text: "darf", role: "verb_p1", order: 2 },
      { text: "man nicht privat", role: "complement", order: 3 },
      { text: "telefonieren", role: "verb_p2", order: 4 }
    ],
      en: "hourglass showing sand flowing in time duration"
    },
    {
      de: "dank",
      pron: "dank",
      es: "gracias a",
      type: "Preposición (Dat/Gen)",
      category: "Präpositionen",
      regimen: "+ Dativo / Genitiv",
      plural: "-",
      exampleSentenceDe: "Dank deiner Hilfe habe ich die Wohnung gefunden.",
      exampleSentenceEs: "Gracias a tu ayuda he encontrado el apartamento.",
    exampleSentenceDeBlocks: [
      { text: "Dank deiner Hilfe", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ich die Wohnung gefunden", role: "complement", order: 3 }
    ],
      en: "sparkling gift box with helping hand"
    },
    {
      de: "statt / anstatt",
      pron: "shtat / án-shtat",
      es: "en lugar de / en vez de",
      type: "Preposición (Gen/Dat)",
      category: "Präpositionen",
      regimen: "+ Genitiv / Dativ",
      plural: "-",
      exampleSentenceDe: "Ich nehme lieber Wasser statt Cola.",
      exampleSentenceEs: "Prefiero tomar agua en lugar de refresco.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "nehme", role: "verb_p1", order: 2 },
      { text: "lieber Wasser statt Cola", role: "complement", order: 3 }
    ],
      en: "swapping glass of water replacing soda can"
    },
    {
      de: "ab",
      pron: "ap",
      es: "a partir de / desde",
      type: "Preposición (Dat)",
      category: "Präpositionen",
      regimen: "+ Dativo",
      plural: "-",
      exampleSentenceDe: "Ab dem ersten Mai arbeite ich in Hamburg.",
      exampleSentenceEs: "A partir del primero de mayo trabajo en Hamburgo.",
    exampleSentenceDeBlocks: [
      { text: "Ab dem", role: "subject", order: 1 },
      { text: "ersten", role: "verb_p1", order: 2 },
      { text: "Mai arbeite ich in Hamburg", role: "complement", order: 3 }
    ],
      en: "starting point flag marker on a road route"
    },
    {
      de: "inklusive",
      pron: "in-klu-sí-ve",
      es: "incluido / con",
      type: "Preposición (Gen/Dat)",
      category: "Präpositionen",
      regimen: "+ Genitiv / Dativ",
      plural: "-",
      exampleSentenceDe: "Die Miete ist inklusive aller Nebenkosten.",
      exampleSentenceEs: "El alquiler incluye todos los gastos adicionales.",
    exampleSentenceDeBlocks: [
      { text: "Die Miete", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "inklusive aller Nebenkosten", role: "complement", order: 3 }
    ],
      en: "all inclusive bundle box with checkmark"
    },
  {
    "de": "als ob",
    "pron": "als op",
    "es": "como si (hipotético)",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final (+ Konjunktiv II)",
    "exampleSentenceDe": "Er tut so, als ob er alles verstehen würde.",
    "exampleSentenceEs": "Él actúa como si entendiera todo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "tut",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "so, als ob er alles",
        "role": "complement",
        "order": 3
      },
      {
        "text": "verstehen würde",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Artikel",
    "pron": "dea ar-tí-kel",
    "es": "el artículo (gramatical o comercial)",
    "type": "Sustantivo (Masc)",
    "category": "Grammatik",
    "level": "A1–B1",
    "plural": "die Artikel",
    "exampleSentenceDe": "Lernen Sie jedes Nomen immer mit dem Artikel!",
    "exampleSentenceEs": "¡Aprenda cada sustantivo siempre con el artículo!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Lernen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "jedes Nomen immer mit dem Artikel",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bevor",
    "pron": "be-fór",
    "es": "antes de que",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Lesen Sie alles genau durch, bevor Sie unterschreiben.",
    "exampleSentenceEs": "Lea todo detenidamente antes de firmar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Lesen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "alles genau",
        "role": "complement",
        "order": 3
      },
      {
        "text": "durch,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "bevor",
        "role": "complement",
        "order": 5
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 6
      },
      {
        "text": "unterschreiben",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "damit",
    "pron": "da-mít",
    "es": "para que (finalidad)",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Mach bitte schnell, damit wir den Zug nicht verpassen.",
    "exampleSentenceEs": "Date prisa para que no perdamos el tren.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mach",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "bitte schnell,",
        "role": "complement",
        "order": 2
      },
      {
        "text": "damit",
        "role": "complement",
        "order": 3
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 4
      },
      {
        "text": "den Zug nicht",
        "role": "complement",
        "order": 5
      },
      {
        "text": "verpassen",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "je ... desto",
    "pron": "ye ... dés-to",
    "es": "cuanto más ... más",
    "type": "Conector Doble",
    "category": "Konnektoren",
    "level": "B1",
    "regimen": "+ Komparativ",
    "exampleSentenceDe": "Je länger ich lerne, desto besser verstehe ich Deutsch.",
    "exampleSentenceEs": "Cuanto más estudio, mejor entiendo alemán.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Je länger",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "lerne,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "desto besser",
        "role": "complement",
        "order": 4
      },
      {
        "text": "verstehe",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 6
      },
      {
        "text": "Deutsch",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "entweder ... oder",
    "pron": "ént-ve-da ... ó-da",
    "es": "o ... o / o bien ... o",
    "type": "Conector Doble",
    "category": "Konnektoren",
    "level": "B1",
    "regimen": "Posición 0/1",
    "exampleSentenceDe": "Entweder fahren wir mit dem Zug oder mit dem Auto.",
    "exampleSentenceEs": "O bien vamos en tren o en coche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Entweder",
        "role": "complement",
        "order": 1
      },
      {
        "text": "fahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mit dem Zug oder mit dem Auto",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "falls",
    "pron": "fals",
    "es": "en caso de que / si",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Falls es morgen regnet, bleiben wir zu Hause.",
    "exampleSentenceEs": "En caso de que mañana llueva, nos quedamos en casa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Falls",
        "role": "complement",
        "order": 1
      },
      {
        "text": "es",
        "role": "subject",
        "order": 2
      },
      {
        "text": "morgen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "regnet,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "bleiben",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 6
      },
      {
        "text": "zu Hause",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "indem",
    "pron": "in-dém",
    "es": "mientras / al (gerundio de modo)",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Du lernst schneller, indem du jeden Tag übst.",
    "exampleSentenceEs": "Aprendes más rápido practicando (al practicar) todos los días.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Du",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lernst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schneller, indem du jeden Tag",
        "role": "complement",
        "order": 3
      },
      {
        "text": "übst",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "je ... umso",
    "pron": "ye ... úm-zo",
    "es": "cuanto más ... más",
    "type": "Conector Doble",
    "category": "Konnektoren",
    "level": "B1",
    "regimen": "+ Komparativ",
    "exampleSentenceDe": "Je mehr ich übe, umso besser spreche ich.",
    "exampleSentenceEs": "Cuanto más practico, mejor hablo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Je mehr ich",
        "role": "complement",
        "order": 1
      },
      {
        "text": "übe,",
        "role": "verb_p2",
        "order": 2
      },
      {
        "text": "umso besser",
        "role": "complement",
        "order": 3
      },
      {
        "text": "spreche",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 5
      }
    ]
  },
  {
    "de": "obgleich",
    "pron": "op-gláij",
    "es": "aunque",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Obgleich es regnet, gehen wir spazieren.",
    "exampleSentenceEs": "Aunque llueve, vamos a pasear.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Obgleich es",
        "role": "complement",
        "order": 1
      },
      {
        "text": "regnet,",
        "role": "verb_p2",
        "order": 2
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 4
      },
      {
        "text": "spazieren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "ohne dass",
    "pron": "ó-ne das",
    "es": "sin que",
    "type": "Conector Subordinante",
    "category": "Nebensätze",
    "level": "B1",
    "regimen": "Verbo al final",
    "exampleSentenceDe": "Er ging, ohne dass er ein Wort sagte.",
    "exampleSentenceEs": "Él se fue sin que dijera una palabra.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ging,",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ohne dass er ein Wort",
        "role": "complement",
        "order": 3
      },
      {
        "text": "sagte",
        "role": "verb_p2",
        "order": 4
      }
    ]
  }
]
},
{
  id: 7,
  title: "Kapitel 7: Wohnen",
  icon: <Home size={20} />,
  emoji: "🏠",
  words: [{
    de: "das Haus",
    pron: "das háus",
    es: "la casa",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    exampleSentenceDe: "Das Haus ist groß.",
    exampleSentenceEs: "La casa es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das Haus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Häuser"
  }, {
    de: "die Wohnung",
    pron: "di vó-nung",
    es: "el apartamento",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    exampleSentenceDe: "Ich habe eine Wohnung. Die Wohnung ist groß.",
    exampleSentenceEs: "Tengo un apartamento. El apartamento es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Wohnung", role: "complement", order: 3 }
    ],
    plural: "die Wohnungen"
  }, {
    de: "das Hochhaus",
    pron: "das jój-jaus",
    es: "edificio de gran altura",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    exampleSentenceDe: "Das Hochhaus ist groß.",
    exampleSentenceEs: "El edificio de gran altura es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das Hochhaus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Hochhäuser"
  }, {
    de: "die Treppe",
    pron: "di tré-pe",
    es: "la escalera",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    exampleSentenceDe: "Die Treppe ist hoch.",
    exampleSentenceEs: "La escalera es alta.",
    exampleSentenceDeBlocks: [
      { text: "Die Treppe", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hoch", role: "complement", order: 3 }
    ],
    plural: "die Treppen"
  }, {
    de: "der Aufzug / Lift",
    pron: "dea áuf-tsuk  lift",
    es: "el ascensor",
    type: "Sustantivo (Masc)",
    category: "Gebäude",
    exampleSentenceDe: "Der Aufzug ist neu.",
    exampleSentenceEs: "El ascensor es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Der Aufzug", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Aufzüge"
  }, {
    de: "der Stock",
    pron: "dea shtok",
    es: "el piso / planta",
    type: "Sustantivo",
    category: "Gebäude",
    exampleSentenceDe: "Ich wohne in dem ersten Stock.",
    exampleSentenceEs: "Vivo en el primer piso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "in dem ersten Stock", role: "complement", order: 3 }
    ],
    plural: "die Stockwerke"
  }, {
    de: "das Erdgeschoss",
    pron: "das éat-gue-shós",
    es: "la planta baja",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    exampleSentenceDe: "Die Wohnung ist im Erdgeschoss.",
    exampleSentenceEs: "El apartamento está en la planta baja.",
    exampleSentenceDeBlocks: [
      { text: "Die Wohnung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "im Erdgeschoss", role: "complement", order: 3 }
    ],
    plural: "die Erdgeschosse"
  }, {
    de: "die Miete",
    pron: "di mí-te",
    es: "el alquiler",
    type: "Sustantivo (Fem)",
    category: "Mieten",
    exampleSentenceDe: "Die Miete ist teuer.",
    exampleSentenceEs: "El alquiler es caro.",
    exampleSentenceDeBlocks: [
      { text: "Die Miete", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "teuer", role: "complement", order: 3 }
    ],
    plural: "die Mieten"
  }, {
    de: "die Nebenkosten",
    pron: "di né-ben-kós-ten",
    es: "gastos adicionales",
    type: "Sustantivo (Plural)",
    category: "Mieten",
    exampleSentenceDe: "Ich zahle die Nebenkosten im Monat.",
    exampleSentenceEs: "Yo pago los gastos adicionales al mes.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "zahle", role: "verb_p1", order: 2 },
      { text: "die Nebenkosten im Monat", role: "complement", order: 3 }
    ],
    plural: "die Nebenkosten"
  }, {
    de: "die Heizkosten",
    pron: "di jáits-kos-ten",
    es: "gastos de calefacción",
    type: "Sustantivo (Plural)",
    category: "Mieten",
    exampleSentenceDe: "Die Heizkosten sind hoch.",
    exampleSentenceEs: "Los gastos de calefacción son altos.",
    exampleSentenceDeBlocks: [
      { text: "Die Heizkosten", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "hoch", role: "complement", order: 3 }
    ],
    plural: "die Heizkosten"
  }, {
    de: "der Mieter / Vermieter",
    pron: "dea mí-ta  fea-mí-ta",
    es: "inquilino / arrendador",
    type: "Sustantivo",
    category: "Mieten",
    exampleSentenceDe: "Ich bin der Mieter. Mein Vermieter wohnt in Berlin.",
    exampleSentenceEs: "Yo soy el inquilino. Mi arrendador vive en Berlín.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "der Mieter", role: "complement", order: 3 }
    ],
    plural: "die Mieter / Vermieter"
  }, {
    de: "mieten / vermieten",
    pron: "mí-ten  fea-mí-ten",
    es: "alquilar / dar en alquiler",
    type: "Verbo",
    category: "Mieten",
    exampleSentenceDe: "Ich miete eine Wohnung.",
    exampleSentenceEs: "Yo alquilo un apartamento.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "miete", role: "verb_p1", order: 2 },
      { text: "eine Wohnung", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ; ver- insep."
  }, {
    de: "umziehen",
    pron: "úm-tsí-en",
    es: "mudarse",
    type: "Verbo separable",
    category: "Mieten",
    exampleSentenceDe: "Ich ziehe in eine neue Wohnung um.",
    exampleSentenceEs: "Me mudo a un apartamento nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "in eine neue Wohnung", role: "complement", order: 3 },
      { text: "um", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (um-), sein"
  }, {
    de: "einziehen / ausziehen",
    pron: "áin-tsí-en  áus-tsí-en",
    es: "mudarse a / de",
    type: "Verbo",
    category: "Mieten",
    exampleSentenceDe: "Ich ziehe in eine neue Wohnung ein.",
    exampleSentenceEs: "Me mudo a un apartamento nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "in eine neue Wohnung", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    regimen: "Separables (ein-/aus-)"
  }, {
    de: "der Umzug",
    pron: "dea úm-tsuk",
    es: "la mudanza",
    type: "Sustantivo (Masc)",
    category: "Mieten",
    exampleSentenceDe: "Der Umzug ist morgen.",
    exampleSentenceEs: "La mudanza es mañana.",
    exampleSentenceDeBlocks: [
      { text: "Der Umzug", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "morgen", role: "complement", order: 3 }
    ],
    plural: "die Umzüge"
  }, {
    de: "die Anzeige",
    pron: "di án-tsai-gue",
    es: "el anuncio",
    type: "Sustantivo (Fem)",
    category: "Mieten",
    exampleSentenceDe: "Ich sehe die Anzeige.",
    exampleSentenceEs: "Yo veo el anuncio.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "die Anzeige", role: "complement", order: 3 }
    ],
    plural: "die Anzeigen"
  }, {
    de: "besichtigen",
    pron: "be-síj-ti-guen",
    es: "inspeccionar / visita",
    type: "Verbo",
    category: "Mieten",
    exampleSentenceDe: "Wir besichtigen das Schloss am Samstag.",
    exampleSentenceEs: "Visitamos el castillo el sábado.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "besichtigen", role: "verb_p1", order: 2 },
      { text: "das Schloss am Samstag", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "der Schlüssel",
    pron: "dea shlú-sel",
    es: "la llave",
    type: "Sustantivo (Masc)",
    category: "Mieten",
    exampleSentenceDe: "Ich habe den Schlüssel. Der Schlüssel ist hier.",
    exampleSentenceEs: "Tengo la llave. La llave está aquí.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "den Schlüssel", role: "complement", order: 3 }
    ],
    plural: "die Schlüssel"
  }, {
    de: "das Zimmer",
    pron: "das tsí-mea",
    es: "la habitación",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das Zimmer ist groß.",
    exampleSentenceEs: "La habitación es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das Zimmer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Zimmer"
  }, {
    de: "die Küche",
    pron: "di kü-je",
    es: "la cocina",
    type: "Sustantivo (Fem)",
    category: "Räume",
    exampleSentenceDe: "Ich bin in der Küche.",
    exampleSentenceEs: "Yo estoy en la cocina.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "in der Küche", role: "complement", order: 3 }
    ],
    plural: "die Küchen"
  }, {
    de: "das Bad",
    pron: "das bat",
    es: "el baño",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das Bad ist sauber.",
    exampleSentenceEs: "El baño está limpio.",
    exampleSentenceDeBlocks: [
      { text: "Das Bad", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sauber", role: "complement", order: 3 }
    ],
    plural: "die Bäder"
  }, {
    de: "das Schlafzimmer",
    pron: "das shláf-tsi-mea",
    es: "el dormitorio",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das Schlafzimmer ist groß.",
    exampleSentenceEs: "El dormitorio es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das Schlafzimmer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Schlafzimmer"
  }, {
    de: "das Wohnzimmer",
    pron: "das vón-tsi-mea",
    es: "la sala de estar",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das ist das Wohnzimmer. Das Wohnzimmer ist groß.",
    exampleSentenceEs: "Esta es la sala de estar. La sala de estar es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das Wohnzimmer", role: "complement", order: 3 }
    ],
    plural: "die Wohnzimmer"
  }, {
    de: "das Kinderzimmer",
    pron: "das kín-dea-tsí-mea",
    es: "cuarto de niños",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das ist das Kinderzimmer.",
    exampleSentenceEs: "Este es el cuarto de niños.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das Kinderzimmer", role: "complement", order: 3 }
    ],
    plural: "die Kinderzimmer"
  }, {
    de: "der Flur",
    pron: "dea flú-a",
    es: "pasillo / corredor",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Ich bin im Flur.",
    exampleSentenceEs: "Yo estoy en el pasillo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "im Flur", role: "complement", order: 3 }
    ],
    plural: "die Flure"
  }, {
    de: "der Balkon",
    pron: "dea bal-kón",
    es: "el balcón",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Ich habe einen Balkon. Der Balkon ist groß.",
    exampleSentenceEs: "Tengo un balcón. El balcón es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Balkon", role: "complement", order: 3 }
    ],
    plural: "die Balkone"
  }, {
    de: "die Terrasse",
    pron: "di te-rá-se",
    es: "la terraza",
    type: "Sustantivo (Fem)",
    category: "Räume",
    exampleSentenceDe: "Die Terrasse ist groß.",
    exampleSentenceEs: "La terraza es grande.",
    exampleSentenceDeBlocks: [
      { text: "Die Terrasse", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Terrassen"
  }, {
    de: "der Garten",
    pron: "dea gár-ten",
    es: "el jardín",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Ich habe einen Garten. Der Garten ist schön.",
    exampleSentenceEs: "Tengo un jardín. El jardín es bonito.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Garten", role: "complement", order: 3 }
    ],
    plural: "die Gärten"
  }, {
    de: "die Garage",
    pron: "di ga-rá-she",
    es: "el garaje",
    type: "Sustantivo (Fem)",
    category: "Räume",
    exampleSentenceDe: "Ich habe eine Garage. Die Garage ist groß.",
    exampleSentenceEs: "Tengo un garaje. El garaje es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Garage", role: "complement", order: 3 }
    ],
    plural: "die Garagen"
  }, {
    de: "der Keller",
    pron: "dea ké-lea",
    es: "el sótano",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Der Keller ist unter dem Haus.",
    exampleSentenceEs: "El sótano está debajo de la casa.",
    exampleSentenceDeBlocks: [
      { text: "Der Keller", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "unter dem Haus", role: "complement", order: 3 }
    ],
    plural: "die Keller"
  }, {
    de: "das Licht",
    pron: "das lijt",
    es: "la luz",
    type: "Sustantivo (Neutro)",
    category: "Aktivitäten",
    exampleSentenceDe: "Das Licht ist an.",
    exampleSentenceEs: "La luz está encendida.",
    exampleSentenceDeBlocks: [
      { text: "Das Licht", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "an", role: "verb_p2", order: 3 }
    ],
    plural: "die Lichter"
  }, {
    de: "anmachen / ausmachen",
    pron: "án-ma-jen  áus-ma-jen",
    es: "encender / apagar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich mache das Licht an.",
    exampleSentenceEs: "Yo enciendo la luz.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "das Licht", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable, +Akkusativ"
  }, {
    de: "öffnen / schließen",
    pron: "óf-nen  shlí-sen",
    es: "abrir / cerrar (formal)",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich öffne die Tür.",
    exampleSentenceEs: "Yo abro la puerta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "öffne", role: "verb_p1", order: 2 },
      { text: "die Tür", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "aufmachen / zumachen",
    pron: "áuf-ma-jen  tsú-ma-jen",
    es: "abrir / cerrar",
    type: "Verbo separable",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich mache die Tür auf.",
    exampleSentenceEs: "Yo abro la puerta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "die Tür", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (auf-/zu-) +Akk"
  }, {
    de: "putzen / reinigen",
    pron: "pút-tsen  ráy-ni-guen",
    es: "limpiar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich putze das Zimmer.",
    exampleSentenceEs: "Yo limpio la habitación.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "putze", role: "verb_p1", order: 2 },
      { text: "das Zimmer", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "kaputt",
    pron: "ka-pút",
    es: "roto / descompuesto",
    type: "Adjetivo",
    category: "Aktivitäten",
    exampleSentenceDe: "Mein Handy ist kaputt.",
    exampleSentenceEs: "Mi teléfono está roto.",
    exampleSentenceDeBlocks: [
      { text: "Mein Handy", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "kaputt", role: "complement", order: 3 }
    ],
    regimen: "≠ ganz"
  }, {
    de: "reparieren",
    pron: "re-pa-rí-ren",
    es: "reparar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich kann das Fahrrad reparieren.",
    exampleSentenceEs: "Yo puedo reparar la bicicleta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "das Fahrrad", role: "complement", order: 3 },
      { text: "reparieren", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "das Möbelstück",
    pron: "das mö-bel-shtük",
    es: "el mueble",
    type: "Sustantivo",
    category: "Möbel",
    exampleSentenceDe: "Das Möbelstück ist neu.",
    exampleSentenceEs: "El mueble es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das Möbelstück", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Möbelstücke"
  }, {
    de: "der Tisch",
    pron: "dea tish",
    es: "la mesa",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Das ist der Tisch.",
    exampleSentenceEs: "Esta es la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Tisch", role: "complement", order: 3 }
    ],
    plural: "die Tische"
  }, {
    de: "der Stuhl",
    pron: "dea shtúl",
    es: "la silla",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Der Stuhl ist neu.",
    exampleSentenceEs: "La silla es nueva.",
    exampleSentenceDeBlocks: [
      { text: "Der Stuhl", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Stühle"
  }, {
    de: "der Schrank",
    pron: "dea shránk",
    es: "el armario",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Das ist der Schrank. Der Schrank ist groß.",
    exampleSentenceEs: "Este es el armario. El armario es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Schrank", role: "complement", order: 3 }
    ],
    plural: "die Schränke"
  }, {
    de: "das Bett",
    pron: "das bet",
    es: "la cama",
    type: "Sustantivo (Neutro)",
    category: "Möbel",
    exampleSentenceDe: "Das Bett ist groß.",
    exampleSentenceEs: "La cama es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das Bett", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Betten"
  }, {
    de: "der Spiegel",
    pron: "dea shpí-guel",
    es: "el espejo",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Ich sehe mich im Spiegel.",
    exampleSentenceEs: "Me veo en el espejo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "mich im Spiegel", role: "complement", order: 3 }
    ],
    plural: "die Spiegel"
  }, {
    de: "der Teppich",
    pron: "dea té-pij",
    es: "la alfombra",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Der Teppich ist groß.",
    exampleSentenceEs: "La alfombra es grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Teppich", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Teppiche"
  }, {
    de: "gemütlich",
    pron: "gue-mút-lij",
    es: "acogedor",
    type: "Adjetivo",
    category: "Adjektive",
    exampleSentenceDe: "Das Zimmer ist gemütlich.",
    exampleSentenceEs: "La habitación es acogedora.",
    exampleSentenceDeBlocks: [
      { text: "Das Zimmer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gemütlich", role: "verb_p2", order: 3 }
    ],
    regimen: "≠ unbehaglich"
  },
  {
    de: "aufräumen",
    pron: "áuf-roi-men",
    es: "ordenar / recoger",
    type: "Verbo",
    category: "Wohnen",
    regimen: "Separable (auf-) / + Akkusativ",
    exampleSentenceDe: "Ich räume die Wohnung auf.",
    exampleSentenceEs: "Ordeno el apartamento.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "räume", role: "verb_p1", order: 2 },
      { text: "die Wohnung", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "der Müll",
    pron: "dea mül",
    es: "la basura",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "-",
    exampleSentenceDe: "Ich bringe den Müll weg.",
    exampleSentenceEs: "Llevo la basura fuera.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bringe", role: "verb_p1", order: 2 },
      { text: "den Müll", role: "complement", order: 3 },
      { text: "weg", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "der Eimer",
    pron: "dea ái-ma",
    es: "el cubo / balde",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "die Eimer",
    exampleSentenceDe: "Der Eimer steht im Garten.",
    exampleSentenceEs: "El cubo está en el jardín.",
    exampleSentenceDeBlocks: [
      { text: "Der Eimer", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "im Garten", role: "complement", order: 3 }
    ]
  }, {
        de: "der Staubsauger",
    pron: "dea shtáup-zau-ga",
    es: "la aspiradora",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "die Staubsauger",
    exampleSentenceDe: "Der Staubsauger ist neu und leise.",
    exampleSentenceEs: "La aspiradora es nueva y silenciosa.",
    exampleSentenceDeBlocks: [
      { text: "Der Staubsauger", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu und leise", role: "complement", order: 3 }
    ]
  }, {
        de: "die Waschmaschine",
    pron: "di vásh-ma-shi-ne",
    es: "la lavadora",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Waschmaschinen",
    exampleSentenceDe: "Die Waschmaschine wäscht sehr gut.",
    exampleSentenceEs: "La lavadora lava muy bien.",
    exampleSentenceDeBlocks: [
      { text: "Die Waschmaschine", role: "subject", order: 1 },
      { text: "wäscht", role: "verb_p1", order: 2 },
      { text: "sehr gut", role: "complement", order: 3 }
    ]
  }, {
        de: "die Spülmaschine",
    pron: "di shpül-ma-shi-ne",
    es: "el lavavajillas",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Spülmaschinen",
    exampleSentenceDe: "Die Spülmaschine ist jetzt voll.",
    exampleSentenceEs: "El lavavajillas está lleno ahora.",
    exampleSentenceDeBlocks: [
      { text: "Die Spülmaschine", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "jetzt voll", role: "complement", order: 3 }
    ]
  }, {
        de: "das Waschbecken",
    pron: "das vásh-be-ken",
    es: "el lavamanos",
    type: "Sustantivo (Neutro)",
    category: "Haushalt",
    plural: "die Waschbecken",
    exampleSentenceDe: "Das Waschbecken ist ganz sauber.",
    exampleSentenceEs: "El lavamanos está completamente limpio.",
    exampleSentenceDeBlocks: [
      { text: "Das Waschbecken", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ganz sauber", role: "complement", order: 3 }
    ]
  }, {
        de: "der Fernseher",
    pron: "dea férn-ze-ea",
    es: "el televisor",
    type: "Sustantivo (Masc)",
    category: "Wohnen",
    plural: "die Fernseher",
    exampleSentenceDe: "Der Fernseher steht im Wohnzimmer.",
    exampleSentenceEs: "El televisor está en el salón.",
    exampleSentenceDeBlocks: [
      { text: "Der Fernseher", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "im Wohnzimmer", role: "complement", order: 3 }
    ]
  }, {
        de: "der Kühlschrank",
    pron: "dea kül-shrank",
    es: "el refrigerador",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Kühlschränke",
    exampleSentenceDe: "Milch steht im Kühlschrank drin.",
    exampleSentenceEs: "La leche está dentro del refrigerador.",
    exampleSentenceDeBlocks: [
      { text: "Milch", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "im Kühlschrank drin", role: "complement", order: 3 }
    ]
  }, {
        de: "das Sofa",
    pron: "das zó-fa",
    es: "el sofá",
    type: "Sustantivo (Neutro)",
    category: "Wohnen",
    plural: "die Sofas",
    exampleSentenceDe: "Das Sofa ist sehr bequem.",
    exampleSentenceEs: "El sofá es muy cómodo.",
    exampleSentenceDeBlocks: [
      { text: "Das Sofa", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr bequem", role: "complement", order: 3 }
    ]
  }, {
        de: "der Sessel",
    pron: "dea zé-sel",
    es: "el sillón",
    type: "Sustantivo (Masc)",
    category: "Wohnen",
    plural: "die Sessel",
    exampleSentenceDe: "Der Sessel ist alt aber gemütlich.",
    exampleSentenceEs: "El sillón es viejo pero acogedor.",
    exampleSentenceDeBlocks: [
      { text: "Der Sessel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "alt aber", role: "complement", order: 3 },
      { text: "gemütlich", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "die Lampe",
    pron: "di lám-pe",
    es: "la lámpara",
    type: "Sustantivo (Fem)",
    category: "Wohnen",
    plural: "die Lampen",
    exampleSentenceDe: "Die Lampe gibt warmes Licht.",
    exampleSentenceEs: "La lámpara da luz cálida.",
    exampleSentenceDeBlocks: [
      { text: "Die Lampe", role: "subject", order: 1 },
      { text: "gibt", role: "verb_p1", order: 2 },
      { text: "warmes Licht", role: "complement", order: 3 }
    ]
  }, {
        de: "das Radio",
    pron: "das rá-dio",
    es: "la radio",
    type: "Sustantivo (Neutro)",
    category: "Wohnen",
    plural: "die Radios",
    exampleSentenceDe: "Ich höre gern laut Radio.",
    exampleSentenceEs: "Me gusta escuchar la radio alto.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "höre", role: "verb_p1", order: 2 },
      { text: "gern laut Radio", role: "complement", order: 3 }
    ]
  }, {
        de: "der Herd",
    pron: "dea jeat",
    es: "la estufa / el fogón",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Herde",
    exampleSentenceDe: "Die Suppe kocht auf dem Herd.",
    exampleSentenceEs: "La sopa hierve en la estufa.",
    exampleSentenceDeBlocks: [
      { text: "Die Suppe", role: "subject", order: 1 },
      { text: "kocht", role: "verb_p1", order: 2 },
      { text: "auf dem Herd", role: "complement", order: 3 }
    ]
  }, {
        de: "der Ofen",
    pron: "dea ó-fen",
    es: "el horno",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Öfen",
    exampleSentenceDe: "Die Pizza backt im Ofen.",
    exampleSentenceEs: "La pizza se hornea en el horno.",
    exampleSentenceDeBlocks: [
      { text: "Die Pizza", role: "subject", order: 1 },
      { text: "backt", role: "verb_p1", order: 2 },
      { text: "im Ofen", role: "complement", order: 3 }
    ]
  }, {
        de: "die Mikrowelle",
    pron: "di mi-kro-vé-le",
    es: "el microondas",
    type: "Sustantivo (Fem)",
    category: "Küche",
    plural: "die Mikrowellen",
    exampleSentenceDe: "Die Mikrowelle wärmt das Essen.",
    exampleSentenceEs: "El microondas calienta la comida.",
    exampleSentenceDeBlocks: [
      { text: "Die Mikrowelle", role: "subject", order: 1 },
      { text: "wärmt", role: "verb_p1", order: 2 },
      { text: "das Essen", role: "complement", order: 3 }
    ]
  }, {
        de: "die Kaffeemaschine",
    pron: "di ka-fé-ma-shi-ne",
    es: "la cafetera",
    type: "Sustantivo (Fem)",
    category: "Küche",
    plural: "die Kaffeemaschinen",
    exampleSentenceDe: "Die Kaffeemaschine macht frischen Kaffee.",
    exampleSentenceEs: "La cafetera hace café fresco.",
    exampleSentenceDeBlocks: [
      { text: "Die Kaffeemaschine", role: "subject", order: 1 },
      { text: "macht", role: "verb_p1", order: 2 },
      { text: "frischen Kaffee", role: "complement", order: 3 }
    ]
  }, {
        de: "der Topf",
    pron: "dea topf",
    es: "la olla",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Töpfe",
    exampleSentenceDe: "Der Topf ist noch heiß.",
    exampleSentenceEs: "La olla todavía está caliente.",
    exampleSentenceDeBlocks: [
      { text: "Der Topf", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "noch heiß", role: "complement", order: 3 }
    ]
  }, {
        de: "die Pfanne",
    pron: "di pfá-ne",
    es: "la sartén",
    type: "Sustantivo (Fem)",
    category: "Küche",
    plural: "die Pfannen",
    exampleSentenceDe: "Das Fleisch brät in der Pfanne.",
    exampleSentenceEs: "La carne se fríe en la sartén.",
    exampleSentenceDeBlocks: [
      { text: "Das Fleisch", role: "subject", order: 1 },
      { text: "brät", role: "verb_p1", order: 2 },
      { text: "in der Pfanne", role: "complement", order: 3 }
    ]
  }, {
        de: "die Tür",
    pron: "di tür",
    es: "la puerta",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    plural: "die Türen",
    exampleSentenceDe: "Er schließt die Tür leise.",
    exampleSentenceEs: "Él cierra la puerta en silencio.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "schließt", role: "verb_p1", order: 2 },
      { text: "die Tür leise", role: "complement", order: 3 }
    ]
  }, {
        de: "das Fenster",
    pron: "das féns-tea",
    es: "la ventana",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    plural: "die Fenster",
    exampleSentenceDe: "Ich öffne das Fenster kurz.",
    exampleSentenceEs: "Abro la ventana brevemente.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "öffne", role: "verb_p1", order: 2 },
      { text: "das Fenster kurz", role: "complement", order: 3 }
    ]
  }, {
        de: "die Wand",
    pron: "di vant",
    es: "la pared",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    plural: "die Wände",
    exampleSentenceDe: "Ein Bild hängt an der Wand.",
    exampleSentenceEs: "Un cuadro cuelga de la pared.",
    exampleSentenceDeBlocks: [
      { text: "Ein Bild", role: "subject", order: 1 },
      { text: "hängt", role: "verb_p1", order: 2 },
      { text: "an der Wand", role: "complement", order: 3 }
    ]
  }, {
        de: "das Dach",
    pron: "das daj",
    es: "el techo",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    plural: "die Dächer",
    exampleSentenceDe: "Die Katze schläft auf dem Dach.",
    exampleSentenceEs: "El gato duerme en el tejado.",
    exampleSentenceDeBlocks: [
      { text: "Die Katze", role: "subject", order: 1 },
      { text: "schläft", role: "verb_p1", order: 2 },
      { text: "auf dem Dach", role: "complement", order: 3 }
    ]
  }, {
        de: "das Kissen",
    pron: "das kí-sen",
    es: "la almohada / cojín",
    type: "Sustantivo (Neutro)",
    category: "Wohnen",
    plural: "die Kissen",
    exampleSentenceDe: "Das Kissen ist sehr weich.",
    exampleSentenceEs: "La almohada es muy suave.",
    exampleSentenceDeBlocks: [
      { text: "Das Kissen", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr weich", role: "complement", order: 3 }
    ]
  }, {
        de: "die Decke",
    pron: "di dé-ke",
    es: "la manta / cobija",
    type: "Sustantivo (Fem)",
    category: "Wohnen",
    plural: "die Decken",
    exampleSentenceDe: "Die Decke hält mich warm.",
    exampleSentenceEs: "La manta me mantiene caliente.",
    exampleSentenceDeBlocks: [
      { text: "Die Decke", role: "subject", order: 1 },
      { text: "hält", role: "verb_p1", order: 2 },
      { text: "mich warm", role: "complement", order: 3 }
    ]
  },
    {
      de: "die Kaution",
      pron: "di kau-tsión",
      es: "fianza / depósito de alquiler",
      type: "Sustantivo (Fem)",
      category: "Mieten",
      regimen: "-",
      plural: "die Kautionen",
      exampleSentenceDe: "Die Kaution beträgt drei Monatskaltmieten.",
      exampleSentenceEs: "La fianza equivale a tres meses de renta fría.",
    exampleSentenceDeBlocks: [
      { text: "Die Kaution", role: "subject", order: 1 },
      { text: "beträgt", role: "verb_p1", order: 2 },
      { text: "drei Monatskaltmieten", role: "complement", order: 3 }
    ],
      en: "safety deposit vault money box with key"
    },
    {
      de: "die Kaltmiete",
      pron: "di kált-mí-te",
      es: "renta fría (sin gastos)",
      type: "Sustantivo (Fem)",
      category: "Mieten",
      regimen: "-",
      plural: "die Kaltmieten",
      exampleSentenceDe: "Die Kaltmiete kostet 650 Euro im Monat.",
      exampleSentenceEs: "La renta fría cuesta 650 euros al mes.",
    exampleSentenceDeBlocks: [
      { text: "Die Kaltmiete", role: "subject", order: 1 },
      { text: "kostet", role: "verb_p1", order: 2 },
      { text: "650 Euro im Monat", role: "complement", order: 3 }
    ],
      en: "house icon with blue cool outline price tag"
    },
    {
      de: "die Warmmiete",
      pron: "di várm-mí-te",
      es: "renta caliente (gastos incluidos)",
      type: "Sustantivo (Fem)",
      category: "Mieten",
      regimen: "-",
      plural: "die Warmmieten",
      exampleSentenceDe: "Die Warmmiete beträgt 850 Euro inklusive Heizung.",
      exampleSentenceEs: "La renta caliente es de 850 euros con calefacción incluida.",
    exampleSentenceDeBlocks: [
      { text: "Die Warmmiete", role: "subject", order: 1 },
      { text: "beträgt", role: "verb_p1", order: 2 },
      { text: "850 Euro inklusive Heizung", role: "complement", order: 3 }
    ],
      en: "cozy house icon with orange warm radiator glow"
    },
    {
      de: "die Hausordnung",
      pron: "di jáus-órd-nung",
      es: "normas del edificio",
      type: "Sustantivo (Fem)",
      category: "Wohnen",
      regimen: "-",
      plural: "die Hausordnungen",
      exampleSentenceDe: "Die Hausordnung verbietet laute Musik ab 22 Uhr.",
      exampleSentenceEs: "Las normas del edificio prohíben música alta a partir de las 22:00.",
    exampleSentenceDeBlocks: [
      { text: "Die Hausordnung", role: "subject", order: 1 },
      { text: "verbietet", role: "verb_p1", order: 2 },
      { text: "laute Musik ab 22 Uhr", role: "complement", order: 3 }
    ],
      en: "bulleted framed rules notice board hanging on wall"
    },
    {
      de: "die Ruhezeit",
      pron: "di rú-e-tsait",
      es: "horario de descanso/silencio",
      type: "Sustantivo (Fem)",
      category: "Wohnen",
      regimen: "-",
      plural: "die Ruhezeiten",
      exampleSentenceDe: "Am Sonntag gilt in Deutschland die gesetzliche Ruhezeit.",
      exampleSentenceEs: "El domingo rige en Alemania el horario legal de descanso.",
    exampleSentenceDeBlocks: [
      { text: "Am Sonntag", role: "subject", order: 1 },
      { text: "gilt", role: "verb_p1", order: 2 },
      { text: "in Deutschland die gesetzliche Ruhezeit", role: "complement", order: 3 }
    ],
      en: "silent clock with finger on lips sleeping moon"
    },
    {
      de: "der Hausmeister",
      pron: "dea jáus-máis-ta",
      es: "conserje / encargado",
      type: "Sustantivo (Masc)",
      category: "Wohnen",
      regimen: "-",
      plural: "die Hausmeister",
      exampleSentenceDe: "Der Hausmeister repariert die Heizung im Keller.",
      exampleSentenceEs: "El encargado repara la calefacción en el sótano.",
    exampleSentenceDeBlocks: [
      { text: "Der Hausmeister", role: "subject", order: 1 },
      { text: "repariert", role: "verb_p1", order: 2 },
      { text: "die Heizung im Keller", role: "complement", order: 3 }
    ],
      en: "friendly building facility manager with toolbelt"
    },
    {
      de: "der Nachbar / die Nachbarin",
      pron: "dea náj-ba / di náj-ba-rin",
      es: "vecino / vecina",
      type: "Sustantivo",
      category: "Wohnen",
      regimen: "-",
      plural: "die Nachbarn / die Nachbarinnen",
      exampleSentenceDe: "Mein Nachbar nimmt freundlicherweise mein Paket an.",
      exampleSentenceEs: "Mi vecino recibe amablemente mi paquete.",
    exampleSentenceDeBlocks: [
      { text: "Mein Nachbar", role: "subject", order: 1 },
      { text: "nimmt", role: "verb_p1", order: 2 },
      { text: "freundlicherweise mein Paket", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
      en: "friendly neighbor waving from adjacent apartment door"
    },
    {
      de: "die Mülltrennung",
      pron: "di múl-tre-nung",
      es: "reciclaje / separación de basura",
      type: "Sustantivo (Fem)",
      category: "Haushalt",
      regimen: "-",
      plural: "die Mülltrennungen",
      exampleSentenceDe: "Die Mülltrennung ist in diesem Haus sehr wichtig.",
      exampleSentenceEs: "La separación de residuos es muy importante en esta casa.",
    exampleSentenceDeBlocks: [
      { text: "Die Mülltrennung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "in diesem Haus sehr wichtig", role: "complement", order: 3 }
    ],
      en: "colored recycling bins blue green yellow brown in row"
    },
    {
      de: "ab|geben",
      pron: "áp-gué-ben",
      es: "entregar / depositar",
      type: "Verbo separable",
      category: "Aktivitäten",
      regimen: "Separable (ab-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Sie müssen den Schlüssel beim Hausmeister abgeben.",
      exampleSentenceEs: "Debe entregar la llave al conserje.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "müssen", role: "verb_p1", order: 2 },
      { text: "den Schlüssel beim Hausmeister", role: "complement", order: 3 },
      { text: "abgeben", role: "verb_p2", order: 4 }
    ],
      en: "hand handing over a key to reception desk"
    },
  {
    "de": "der Abfall",
    "pron": "dea áp-fal",
    "es": "la basura / residuo",
    "type": "Sustantivo (Masc)",
    "category": "Haushalt",
    "level": "A2–B1",
    "plural": "die Abfälle",
    "en": "open gray trash bin filled with tied garbage bags",
    "exampleSentenceDe": "Bitte bringen Sie den Abfall nach unten in die Tonne.",
    "exampleSentenceEs": "Por favor, baje la basura al contenedor de abajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bringen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie den Abfall nach unten in die Tonne",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ab|waschen",
    "pron": "áp-va-shen",
    "es": "fregar / lavar (platos)",
    "type": "Verbo separable",
    "category": "Haushalt",
    "level": "A2–B1",
    "regimen": "+ Akk / wäscht ab, wusch ab, hat abgewaschen",
    "en": "person washing dinner plates in soapy kitchen sink water",
    "exampleSentenceDe": "Nach dem Abendessen müssen wir die Teller abwaschen.",
    "exampleSentenceEs": "Después de cenar tenemos que fregar los platos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Abendessen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir die Teller",
        "role": "complement",
        "order": 3
      },
      {
        "text": "abwaschen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Apartment",
    "pron": "das a-párt-ment",
    "es": "el apartamento / estudio",
    "type": "Sustantivo (Neutro)",
    "category": "Wohnen",
    "level": "A2–B1",
    "plural": "die Apartments",
    "en": "cozy modern studio apartment interior with bed and sofa",
    "exampleSentenceDe": "Für drei Monate miete ich ein kleines Apartment.",
    "exampleSentenceEs": "Durante tres meses alquilo un apartamento pequeño.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für drei Monate",
        "role": "subject",
        "order": 1
      },
      {
        "text": "miete",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich ein kleines Apartment",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "auf sein",
    "pron": "auf zain",
    "es": "estar abierto / levantado",
    "type": "Frase verbal",
    "category": "Haushalt",
    "level": "A1",
    "regimen": "Separable irregular",
    "exampleSentenceDe": "Das Fenster im Schlafzimmer ist noch auf.",
    "exampleSentenceEs": "La ventana del dormitorio sigue abierta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Fenster im Schlafzimmer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "auf",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Ecke",
    "pron": "di é-ke",
    "es": "la esquina / el rincón",
    "type": "Sustantivo (Fem)",
    "category": "Wohnung",
    "level": "A2–B1",
    "plural": "die Ecken",
    "exampleSentenceDe": "Der Schrank steht dort in der Ecke.",
    "exampleSentenceEs": "El armario está allí en la esquina.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Schrank",
        "role": "subject",
        "order": 1
      },
      {
        "text": "steht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dort in der Ecke",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Eingang",
    "pron": "dea áin-gang",
    "es": "la entrada (puerta/acceso)",
    "type": "Sustantivo (Masc)",
    "category": "Gebäude",
    "level": "A2–B1",
    "plural": "die Eingänge",
    "en": "front wooden entrance door and steps of a house",
    "exampleSentenceDe": "Der Eingang zum Haus befindet sich links.",
    "exampleSentenceEs": "La entrada a la casa se encuentra a la izquierda.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Eingang zum Haus",
        "role": "subject",
        "order": 1
      },
      {
        "text": "befindet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich links",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Gardine",
    "pron": "di gar-dí-ne",
    "es": "la cortina",
    "type": "Sustantivo (Fem)",
    "category": "Möbel",
    "level": "A2–B1",
    "plural": "die Gardinen",
    "en": "white fabric window curtains hanging on a wooden rod",
    "exampleSentenceDe": "Wir hängen heute neue weiße Gardinen auf.",
    "exampleSentenceEs": "Hoy colgamos cortinas blancas nuevas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hängen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute neue weiße Gardinen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "auf",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Makler",
    "pron": "dea mák-la",
    "es": "el agente inmobiliario",
    "type": "Sustantivo (Masc)",
    "category": "Mieten",
    "level": "B1",
    "plural": "die Makler",
    "en": "friendly real estate agent holding house keys and floor plan",
    "exampleSentenceDe": "Der Makler zeigt uns morgen eine Wohnung.",
    "exampleSentenceEs": "El agente inmobiliario nos muestra mañana un piso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Makler",
        "role": "subject",
        "order": 1
      },
      {
        "text": "zeigt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns morgen eine Wohnung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das OG (Obergeschoss)",
    "pron": "das o-gué",
    "es": "la planta superior / piso alto",
    "type": "Sustantivo (Neutro)",
    "category": "Gebäude",
    "level": "B1",
    "plural": "die Obergeschosse",
    "exampleSentenceDe": "Unsere Wohnung liegt im zweiten OG.",
    "exampleSentenceEs": "Nuestro piso está en la segunda planta superior.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Wohnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im zweiten OG",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Putzmittel",
    "pron": "das púts-mi-tel",
    "es": "el producto de limpieza",
    "type": "Sustantivo (Neutro)",
    "category": "Haushalt",
    "level": "A2",
    "plural": "die Putzmittel",
    "en": "spray bottle of household cleaning product with yellow sponge",
    "exampleSentenceDe": "Im Supermarkt kaufe ich heute neues Putzmittel.",
    "exampleSentenceEs": "Hoy compro en el supermercado producto de limpieza nuevo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Supermarkt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich heute neues Putzmittel",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Stiege (A)",
    "pron": "di shtí-gue",
    "es": "la escalera (variante austriaca)",
    "type": "Sustantivo (Fem)",
    "category": "Gebäude",
    "level": "B1",
    "plural": "die Stiegen",
    "en": "wooden indoor staircase with handrail",
    "exampleSentenceDe": "Nehmen Sie die Stiege in den ersten Stock.",
    "exampleSentenceEs": "Tome la escalera hasta el primer piso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nehmen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "die Stiege in den ersten Stock",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Stockwerk",
    "pron": "das shtók-verk",
    "es": "el piso / planta (del edificio)",
    "type": "Sustantivo (Neutro)",
    "category": "Gebäude",
    "level": "B1",
    "plural": "die Stockwerke",
    "exampleSentenceDe": "Das Büro befindet sich im dritten Stockwerk.",
    "exampleSentenceEs": "La oficina se encuentra en la tercera planta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Büro",
        "role": "subject",
        "order": 1
      },
      {
        "text": "befindet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich im dritten Stockwerk",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das UG (Untergeschoss)",
    "pron": "das u-gué",
    "es": "el sótano / planta baja inferior",
    "type": "Sustantivo (Neutro)",
    "category": "Gebäude",
    "level": "B1",
    "plural": "die Untergeschosse",
    "exampleSentenceDe": "Die Waschküche ist unten im UG.",
    "exampleSentenceEs": "El cuarto de lavadoras está abajo en el subsuelo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Waschküche",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "unten im UG",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Waschmittel",
    "pron": "das vásh-mi-tel",
    "es": "el detergente (para ropa)",
    "type": "Sustantivo (Neutro)",
    "category": "Haushalt",
    "level": "A2",
    "plural": "die Waschmittel",
    "en": "blue laundry detergent bottle and washing powder box",
    "exampleSentenceDe": "Wir haben kein Waschmittel mehr für die Wäsche.",
    "exampleSentenceEs": "Ya no tenemos detergente para la colada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "kein Waschmittel mehr für die Wäsche",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das WC",
    "pron": "das ve-tsé",
    "es": "el servicio / baño (WC)",
    "type": "Sustantivo (Neutro)",
    "category": "Gebäude",
    "level": "A1–B1",
    "plural": "die WCs",
    "en": "clean white ceramic toilet in a modern restroom",
    "exampleSentenceDe": "Entschuldigung, wo ist hier bitte das WC?",
    "exampleSentenceEs": "Disculpe, ¿dónde está aquí el baño, por favor?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Entschuldigung, wo",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "hier bitte das WC",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Wecker",
    "pron": "dea vé-ka",
    "es": "el despertador",
    "type": "Sustantivo (Masc)",
    "category": "Haushalt",
    "level": "A1",
    "plural": "die Wecker",
    "en": "classic round bedside alarm clock with twin bells",
    "exampleSentenceDe": "Für die Reise brauche ich meinen kleinen Wecker.",
    "exampleSentenceEs": "Para el viaje necesito mi despertador pequeño.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für die Reise",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich meinen kleinen Wecker",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die WG (Wohngemeinschaft)",
    "pron": "di ve-gué",
    "es": "el piso compartido",
    "type": "Sustantivo (Fem)",
    "category": "Mieten",
    "level": "B1",
    "plural": "die WGs",
    "exampleSentenceDe": "Viele Studenten wohnen gern in einer WG.",
    "exampleSentenceEs": "Muchos estudiantes viven con gusto en un piso compartido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Studenten",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wohnen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gern in einer WG",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bauen",
    "pron": "báu-en",
    "es": "construir / edificar",
    "type": "Verbo regular",
    "category": "Gebäude",
    "level": "A2–B1",
    "regimen": "+ Akk / baut, baute, hat gebaut",
    "en": "construction worker laying red bricks with a metal trowel to build a house wall",
    "exampleSentenceDe": "Mein Nachbar hat ein neues Haus gebaut.",
    "exampleSentenceEs": "Mi vecino ha construido una casa nueva.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Nachbar",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein neues Haus",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gebaut",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Bewohner / die Bewohnerin",
    "pron": "dea be-vó-na",
    "es": "el residente / inquilino / vecino",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Wohnen",
    "level": "B1",
    "plural": "die Bewohner / -innen",
    "en": "cute 3D avatar of a smiling apartment resident holding brass house keys",
    "exampleSentenceDe": "Alle Hausbewohner achten auf die Ruhezeiten.",
    "exampleSentenceEs": "Todos los residentes del edificio respetan las horas de descanso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle Hausbewohner",
        "role": "subject",
        "order": 1
      },
      {
        "text": "achten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "auf die Ruhezeiten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Boden",
    "pron": "dea bó-den",
    "es": "el suelo / piso / terreno",
    "type": "Sustantivo (Masc)",
    "category": "Wohnung",
    "level": "A2–B1",
    "plural": "die Böden",
    "en": "clean light oak wooden parquet floor planks in a bright room corner",
    "exampleSentenceDe": "Die Bücher lagen alle auf dem Boden.",
    "exampleSentenceEs": "Los libros estaban todos en el suelo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Bücher",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lagen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle auf dem Boden",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Dusche",
    "pron": "di dú-she",
    "es": "la ducha",
    "type": "Sustantivo (Fem)",
    "category": "Wohnung",
    "level": "A1–B1",
    "plural": "die Duschen",
    "en": "modern glass walk-in shower cabin with silver rainfall showerhead",
    "exampleSentenceDe": "Unsere Wohnung hat eine moderne Dusche.",
    "exampleSentenceEs": "Nuestro piso tiene una ducha moderna.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Wohnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine moderne Dusche",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ein|richten",
    "pron": "áin-rij-ten",
    "es": "amueblar / equipar / instalar",
    "type": "Verbo separable",
    "category": "Möbel",
    "level": "B1",
    "regimen": "+ Akk / richtet ein, hat eingerichtet",
    "en": "hands arranging a cozy sofa, wooden lamp, and bookshelf inside a small apartment room",
    "exampleSentenceDe": "Wir haben unsere Wohnung selbst eingerichtet.",
    "exampleSentenceEs": "Hemos amueblado nuestro piso nosotros mismos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "unsere Wohnung selbst",
        "role": "complement",
        "order": 3
      },
      {
        "text": "eingerichtet",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Einrichtung",
    "pron": "di áin-rij-tung",
    "es": "el mobiliario / decoración / entidad",
    "type": "Sustantivo (Fem)",
    "category": "Möbel",
    "level": "B1",
    "plural": "die Einrichtungen",
    "en": "warm living room furniture set with cozy armchair, wooden coffee table, and potted plant",
    "exampleSentenceDe": "Deine Wohnung ist gemütlich, die Einrichtung gefällt mir.",
    "exampleSentenceEs": "Tu piso es acogedor, me gusta el mobiliario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Deine Wohnung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gemütlich,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "die Einrichtung",
        "role": "subject",
        "order": 4
      },
      {
        "text": "gefällt",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "mir",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "entsorgen",
    "pron": "ent-zór-guen",
    "es": "desechar / reciclar / eliminar",
    "type": "Verbo inseparable",
    "category": "Haushalt",
    "level": "B1",
    "regimen": "+ Akk / entsorgt, entsorgte, hat entsorgt",
    "en": "person dropping old batteries into a yellow battery recycling bin",
    "exampleSentenceDe": "Wie kann ich alte Batterien richtig entsorgen?",
    "exampleSentenceEs": "¿Cómo puedo desechar correctamente las pilas viejas?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "alte Batterien richtig",
        "role": "complement",
        "order": 4
      },
      {
        "text": "entsorgen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Etage",
    "pron": "di e-tá-ye",
    "es": "el piso / planta (edificio)",
    "type": "Sustantivo (Fem)",
    "category": "Gebäude",
    "level": "B1",
    "plural": "die Etagen",
    "exampleSentenceDe": "Das Büro befindet sich in der dritten Etage.",
    "exampleSentenceEs": "La oficina se encuentra en la tercera planta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Büro",
        "role": "subject",
        "order": 1
      },
      {
        "text": "befindet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich in der dritten Etage",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Garderobe",
    "pron": "di gar-de-ró-be",
    "es": "el guardarropa / perchero",
    "type": "Sustantivo (Fem)",
    "category": "Möbel",
    "level": "B1",
    "plural": "die Garderoben",
    "en": "wooden hallway coat rack stand with winter jackets and umbrella",
    "exampleSentenceDe": "Bitte geben Sie Ihre Mäntel an der Garderobe ab.",
    "exampleSentenceEs": "Por favor, deje sus abrigos en el guardarropa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "geben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Ihre Mäntel an der Garderobe",
        "role": "complement",
        "order": 4
      },
      {
        "text": "ab",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "das Gebäude",
    "pron": "das gue-bói-de",
    "es": "el edificio",
    "type": "Sustantivo (Neutro)",
    "category": "Gebäude",
    "level": "A2–B1",
    "plural": "die Gebäude",
    "en": "neat multi-story modern brick office and apartment building with clean glass windows",
    "exampleSentenceDe": "In diesem großen Gebäude sind nur Büros.",
    "exampleSentenceEs": "En este gran edificio solo hay oficinas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In diesem großen Gebäude",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nur Büros",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "das Grundstück",
    "pron": "das grúnt-shtük",
    "es": "el terreno / parcela / solar",
    "type": "Sustantivo (Neutro)",
    "category": "Wohnen",
    "level": "B1",
    "plural": "die Grundstücke",
    "en": "neat green square land parcel lot bordered by a low wooden fence",
    "exampleSentenceDe": "Wir suchen ein günstiges Grundstück zum Bauen.",
    "exampleSentenceEs": "Buscamos un terreno económico para construir.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "suchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein günstiges Grundstück zum Bauen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "herein | rein",
    "pron": "je-ráin | rain",
    "es": "adentro (hacia el hablante)",
    "type": "Adverbio de dirección",
    "category": "Adverbien",
    "level": "A1",
    "regimen": "herein (formal), rein (coloquial)",
    "exampleSentenceDe": "Kommen Sie bitte herein!",
    "exampleSentenceEs": "¡Entre por favor!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Kommen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte",
        "role": "complement",
        "order": 3
      },
      {
        "text": "herein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Hof",
    "pron": "dea jof",
    "es": "el patio (interior)",
    "type": "Sustantivo (Masc)",
    "category": "Gebäude",
    "level": "B1",
    "plural": "die Höfe",
    "en": "sunny cobblestone apartment building inner courtyard with green plants",
    "exampleSentenceDe": "Die Kinder spielen am Nachmittag immer im Hof.",
    "exampleSentenceEs": "Los niños juegan por la tarde siempre en el patio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Kinder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spielen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Nachmittag immer im Hof",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Müllabfuhr",
    "pron": "di mǘl-ap-fur",
    "es": "el servicio de recogida de basuras",
    "type": "Sustantivo (Fem)",
    "category": "Wohnen",
    "level": "B1",
    "plural": "die Müllabfuhren",
    "en": "orange municipal garbage truck collecting household waste bins",
    "exampleSentenceDe": "Die Müllabfuhr kommt jeden Dienstag früh.",
    "exampleSentenceEs": "La recogida de basuras pasa todos los martes temprano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Müllabfuhr",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "jeden Dienstag früh",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mülltonne",
    "pron": "di mǘl-to-ne",
    "es": "el contenedor de basura",
    "type": "Sustantivo (Fem)",
    "category": "Haushalt",
    "level": "B1",
    "plural": "die Mülltonnen",
    "en": "yellow wheeled plastic household trash bin with closed lid",
    "exampleSentenceDe": "Die gelbe Mülltonne ist heute schon ganz voll.",
    "exampleSentenceEs": "El contenedor amarillo de basura ya está muy lleno hoy.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die gelbe Mülltonne",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute schon ganz voll",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "nebenan",
    "pron": "né-ben-an",
    "es": "al lado / en la casa o habitación de al lado",
    "type": "Adverbio de lugar",
    "category": "Adverbien",
    "level": "A2",
    "regimen": "Responde a Wo?",
    "exampleSentenceDe": "Der neue Nachbar wohnt gleich hier nebenan.",
    "exampleSentenceEs": "El nuevo vecino vive justo aquí al lado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der neue Nachbar",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wohnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gleich hier nebenan",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "offen",
    "pron": "ó-fen",
    "es": "abierto / sincero",
    "type": "Adjetivo / Adverbio",
    "category": "Adjektive",
    "level": "A1–B1",
    "regimen": "Antónimo: geschlossen",
    "exampleSentenceDe": "Komm herein, die Tür ist noch offen!",
    "exampleSentenceEs": "¡Entra, la puerta todavía está abierta!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Komm",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "herein,",
        "role": "verb_p2",
        "order": 2
      },
      {
        "text": "die Tür",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "noch offen",
        "role": "complement",
        "order": 5
      }
    ]
  },
  {
    "de": "das Regal",
    "pron": "das re-gál",
    "es": "la estantería / estante",
    "type": "Sustantivo (Neutro)",
    "category": "Möbel",
    "level": "A1–B1",
    "plural": "die Regale",
    "en": "tall wooden bookshelf filled with neatly arranged colorful books",
    "exampleSentenceDe": "Meine Bücher stehen drüben im großen Regal.",
    "exampleSentenceEs": "Mis libros están enfrente en la estantería grande.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Bücher",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "drüben im großen Regal",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Rollo",
    "pron": "das ró-lo",
    "es": "el estor / persiana enrollable",
    "type": "Sustantivo (Neutro)",
    "category": "Möbel",
    "level": "B1",
    "plural": "die Rollos",
    "en": "cream fabric roller blind window shade partially pulled down",
    "exampleSentenceDe": "Mach abends bitte das Rollo im Schlafzimmer zu.",
    "exampleSentenceEs": "Por la noche cierra por favor el estor del dormitorio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mach",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "abends bitte das Rollo im Schlafzimmer",
        "role": "complement",
        "order": 2
      },
      {
        "text": "zu",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "staubsaugen",
    "pron": "shtáup-zau-guen",
    "es": "pasar la aspiradora",
    "type": "Verbo regular",
    "category": "Haushalt",
    "level": "A2",
    "regimen": "staubsaugt, staubsaugte, hat gestaubsaugt",
    "en": "a cute 3D isometric character pushing a modern vacuum cleaner across a living room rug",
    "exampleSentenceDe": "Ich muss heute in meiner neuen Wohnung noch staubsaugen.",
    "exampleSentenceEs": "Aún tengo que pasar la aspiradora en mi piso nuevo hoy.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute in meiner neuen Wohnung noch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "staubsaugen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "streichen",
    "pron": "shtrái-jen",
    "es": "pintar (paredes)",
    "type": "Verbo irregular",
    "category": "Renovierung",
    "level": "B1",
    "regimen": "+ Akkusativ / streicht, strich, hat gestrichen",
    "en": "a cute 3D isometric character rolling pastel blue paint onto an indoor wall with a paint roller",
    "exampleSentenceDe": "Ich muss am Wochenende meine ganze Wohnung neu streichen.",
    "exampleSentenceEs": "El fin de semana tengo que pintar todo mi piso de nuevo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Wochenende meine ganze Wohnung neu",
        "role": "complement",
        "order": 3
      },
      {
        "text": "streichen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Tuch",
    "pron": "das tuj",
    "es": "el paño / trapo / pañuelo",
    "type": "Sustantivo (Neutro)",
    "category": "Haushalt",
    "level": "A1",
    "plural": "die Tücher (Handtücher)",
    "en": "a cute 3D isometric UI icon of neatly folded soft cotton kitchen towels",
    "exampleSentenceDe": "Die sauberen Handtücher liegen im Schrank ganz oben.",
    "exampleSentenceEs": "Las toallas limpias están en el armario en lo más alto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die sauberen Handtücher",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Schrank ganz oben",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "zentral",
    "pron": "tsen-trál",
    "es": "céntrico",
    "type": "Adjetivo",
    "category": "Wohnen",
    "level": "B1",
    "regimen": "Comp: zentraler",
    "exampleSentenceDe": "Wir suchen eine Zweizimmerwohnung in zentraler Lage.",
    "exampleSentenceEs": "Buscamos un piso de dos habitaciones en una ubicación céntrica.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "suchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Zweizimmerwohnung in zentraler Lage",
        "role": "complement",
        "order": 3
      }
    ]
  }
]
},
{
  id: 8,
  title: "Kapitel 8: Essen & Trinken",
  icon: <Coffee size={20} />,
  emoji: "🍽️",
  words: [{
    de: "das Essen / essen",
    pron: "das é-sen",
    es: "comida / comer",
    type: "Sustantivo / Verbo",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse das Essen.",
    exampleSentenceEs: "Yo como la comida.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "das Essen", role: "complement", order: 3 }
    ],
    plural: "die Essen"
  }, {
    de: "das Frühstück",
    pron: "das frú-shtuk",
    es: "desayuno",
    type: "Sustantivo",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse das Frühstück.",
    exampleSentenceEs: "Yo como el desayuno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "das Frühstück", role: "complement", order: 3 }
    ],
    plural: "die Frühstücke"
  }, {
    de: "das Mittagessen",
    pron: "das mí-tak-é-sen",
    es: "almuerzo",
    type: "Sustantivo (Neutro)",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse das Mittagessen um 13 Uhr.",
    exampleSentenceEs: "Yo como el almuerzo a las 13:00.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "das Mittagessen um 13 Uhr", role: "complement", order: 3 }
    ],
    plural: "die Mittagessen"
  }, {
    de: "zu Mittag essen",
    pron: "tsu mí-tak é-sen",
    es: "almorzar",
    type: "Frase",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse zu Mittag.",
    exampleSentenceEs: "Yo almuerzo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "zu Mittag", role: "complement", order: 3 }
    ],
    regimen: "Verbo separable"
  }, {
    de: "das Abendessen",
    pron: "das á-bent-é-sen",
    es: "cena",
    type: "Sustantivo (Neutro)",
    category: "Mahlzeiten",
    exampleSentenceDe: "Das Abendessen ist um 19 Uhr.",
    exampleSentenceEs: "La cena es a las 19:00.",
    exampleSentenceDeBlocks: [
      { text: "Das Abendessen", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "um 19 Uhr", role: "complement", order: 3 }
    ],
    plural: "die Abendessen"
  }, {
    de: "zu Abend essen",
    pron: "tsu á-bent é-sen",
    es: "cenar",
    type: "Frase",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse zu Abend.",
    exampleSentenceEs: "Yo ceno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "zu Abend", role: "complement", order: 3 }
    ],
    regimen: "Verbo al final"
  }, {
    de: "der Hunger",
    pron: "dea hún-gua",
    es: "hambre",
    type: "Sustantivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich habe Hunger.",
    exampleSentenceEs: "Tengo hambre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Hunger", role: "complement", order: 3 }
    ],
    plural: "kein Plural"
  }, {
    de: "der Durst",
    pron: "dea dúrst",
    es: "sed",
    type: "Sustantivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich habe großen Durst.",
    exampleSentenceEs: "Tengo sed.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "großen Durst", role: "complement", order: 3 }
    ],
    plural: "die Durste"
  }, {
    de: "das Lebensmittel",
    pron: "das lé-bens-mi-tel",
    es: "alimento",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das Lebensmittel ist gut.",
    exampleSentenceEs: "El alimento es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Das Lebensmittel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Lebensmittel"
  }, {
    de: "das Brot",
    pron: "das brot",
    es: "pan",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das Brot ist gut.",
    exampleSentenceEs: "El pan está bueno.",
    exampleSentenceDeBlocks: [
      { text: "Das Brot", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Brote"
  }, {
    de: "die Butter",
    pron: "di bú-tea",
    es: "mantequilla",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich brauche die Butter.",
    exampleSentenceEs: "Yo necesito la mantequilla.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Butter", role: "complement", order: 3 }
    ],
    plural: "die Buttersorten"
  }, {
    de: "der Käse",
    pron: "dea ké-se",
    es: "queso",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das ist der Käse. Der Käse ist gut.",
    exampleSentenceEs: "Este es el queso. El queso es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Käse", role: "complement", order: 3 }
    ],
    plural: "die Käse"
  }, {
    de: "das Fleisch",
    pron: "das flaish",
    es: "carne",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse das Fleisch.",
    exampleSentenceEs: "Yo como la carne.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "das Fleisch", role: "complement", order: 3 }
    ],
    plural: "die Fleischsorten"
  }, {
    de: "der Fisch",
    pron: "dea fish",
    es: "pescado",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Der Fisch ist gut.",
    exampleSentenceEs: "El pescado está bueno.",
    exampleSentenceDeBlocks: [
      { text: "Der Fisch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Fische"
  }, {
    de: "die Kartoffel",
    pron: "di kaa-tó-fel",
    es: "papa",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse die Kartoffel.",
    exampleSentenceEs: "Yo como la papa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "die Kartoffel", role: "complement", order: 3 }
    ],
    plural: "die Kartoffeln"
  }, {
    de: "der Reis",
    pron: "dea ráis",
    es: "arroz",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Der Reis ist gut.",
    exampleSentenceEs: "El arroz está bueno.",
    exampleSentenceDeBlocks: [
      { text: "Der Reis", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Reis"
  }, {
    de: "die Suppe",
    pron: "di sú-pe",
    es: "sopa",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse die Suppe.",
    exampleSentenceEs: "Yo como la sopa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "die Suppe", role: "complement", order: 3 }
    ],
    plural: "die Suppen"
  }, {
    de: "das Gemüse",
    pron: "das gue-mǘ-se",
    es: "verdura",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das Gemüse ist gut.",
    exampleSentenceEs: "La verdura es buena.",
    exampleSentenceDeBlocks: [
      { text: "Das Gemüse", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Gemüse"
  }, {
    de: "das Obst",
    pron: "das ópst",
    es: "fruta",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse das Obst. Das Obst ist gut.",
    exampleSentenceEs: "Yo como la fruta. La fruta es buena.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "das Obst", role: "complement", order: 3 }
    ],
    plural: "kein Plural"
  }, {
    de: "die Tomate",
    pron: "di to-má-te",
    es: "tomate",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Die Tomate ist rot.",
    exampleSentenceEs: "El tomate es rojo.",
    exampleSentenceDeBlocks: [
      { text: "Die Tomate", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ],
    plural: "die Tomaten"
  }, {
    de: "der Apfel",
    pron: "dea áp-fel",
    es: "manzana",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse den Apfel.",
    exampleSentenceEs: "Yo como la manzana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "den Apfel", role: "complement", order: 3 }
    ],
    plural: "die Äpfel"
  }, {
    de: "die Orange",
    pron: "di o-rán-she",
    es: "naranja",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das ist eine Orange. Die Orange ist rot.",
    exampleSentenceEs: "Esto es una naranja. La naranja es roja.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "eine Orange", role: "complement", order: 3 }
    ],
    plural: "die Orangen"
  }, {
    de: "der Kuchen",
    pron: "dea kú-jen",
    es: "pastel",
    type: "Sustantivo",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich mag den Kuchen.",
    exampleSentenceEs: "Me gusta el pastel.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "den Kuchen", role: "complement", order: 3 }
    ],
    plural: "die Kuchen"
  }, {
    de: "das Getränk",
    pron: "das gue-trénk",
    es: "bebida",
    type: "Sustantivo (Neutro)",
    category: "Getränke",
    exampleSentenceDe: "Ich möchte das Getränk.",
    exampleSentenceEs: "Yo quiero la bebida.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "das Getränk", role: "complement", order: 3 }
    ],
    plural: "die Getränke"
  }, {
    de: "das Wasser",
    pron: "das vá-sea",
    es: "agua",
    type: "Sustantivo",
    category: "Getränke",
    exampleSentenceDe: "Das Wasser ist kalt.",
    exampleSentenceEs: "El agua está fría.",
    exampleSentenceDeBlocks: [
      { text: "Das Wasser", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "kalt", role: "complement", order: 3 }
    ],
    plural: "die Wasser"
  }, {
    de: "der Kaffee",
    pron: "dea ká-fe",
    es: "café",
    type: "Sustantivo (Masc)",
    category: "Getränke",
    exampleSentenceDe: "Ich trinke gern den Kaffee.",
    exampleSentenceEs: "Me gusta beber el café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "gern den Kaffee", role: "complement", order: 3 }
    ],
    plural: "die Kaffees"
  }, {
    de: "der Tee",
    pron: "dea té",
    es: "té",
    type: "Sustantivo (Masc)",
    category: "Getränke",
    exampleSentenceDe: "Ich trinke den Tee am Morgen.",
    exampleSentenceEs: "Bebo el té por la mañana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "den Tee am Morgen", role: "complement", order: 3 }
    ],
    plural: "die Tees"
  }, {
    de: "die Milch",
    pron: "di milj",
    es: "leche",
    type: "Sustantivo (Fem)",
    category: "Getränke",
    exampleSentenceDe: "Ich habe die Milch. Die Milch ist kalt.",
    exampleSentenceEs: "Tengo la leche. La leche está fría.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Milch", role: "complement", order: 3 }
    ],
    plural: "die Milch"
  }, {
    de: "das Bier",
    pron: "das bí-a",
    es: "cerveza",
    type: "Sustantivo",
    category: "Getränke",
    exampleSentenceDe: "Ich mag das Bier.",
    exampleSentenceEs: "Me gusta la cerveza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "das Bier", role: "complement", order: 3 }
    ],
    plural: "die Biere"
  }, {
    de: "der Wein",
    pron: "dea vain",
    es: "vino",
    type: "Sustantivo",
    category: "Getränke",
    exampleSentenceDe: "Der Wein ist rot.",
    exampleSentenceEs: "El vino es tinto.",
    exampleSentenceDeBlocks: [
      { text: "Der Wein", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ],
    plural: "die Weine"
  }, {
    de: "der Teller",
    pron: "dea té-lea",
    es: "plato",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Der Teller ist groß.",
    exampleSentenceEs: "El plato es grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Teller", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Teller"
  }, {
    de: "die Tasse",
    pron: "di tá-se",
    es: "taza",
    type: "Sustantivo (Fem)",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe eine Tasse. Die Tasse ist klein.",
    exampleSentenceEs: "Tengo una taza. La taza es pequeña.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Tasse", role: "complement", order: 3 }
    ],
    plural: "die Tassen"
  }, {
    de: "das Messer",
    pron: "das mé-sea",
    es: "cuchillo",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Das Messer ist neu.",
    exampleSentenceEs: "El cuchillo es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das Messer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Messer"
  }, {
    de: "die Gabel",
    pron: "di gá-bel",
    es: "tenedor",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe die Gabel. Die Gabel ist auf dem Tisch.",
    exampleSentenceEs: "Tengo el tenedor. El tenedor está sobre la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Gabel", role: "complement", order: 3 }
    ],
    plural: "die Gabeln"
  }, {
    de: "der Löffel",
    pron: "dea ló-fel",
    es: "cuchara",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe einen Löffel. Der Löffel ist klein.",
    exampleSentenceEs: "Tengo una cuchara. La cuchara es pequeña.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Löffel", role: "complement", order: 3 }
    ],
    plural: "die Löffel"
  }, {
    de: "die Flasche",
    pron: "di flá-she",
    es: "botella",
    type: "Sustantivo (Fem)",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe eine Flasche Wasser.",
    exampleSentenceEs: "Tengo una botella de agua.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Flasche Wasser", role: "complement", order: 3 }
    ],
    plural: "die Flaschen"
  }, {
    de: "trinken / kochen",
    pron: "trín-ken  kó-jen",
    es: "beber / cocinar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich trinke Kaffee am Morgen.",
    exampleSentenceEs: "Yo bebo café por la mañana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "Kaffee am Morgen", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "schmecken",
    pron: "shmé-ken",
    es: "saber (sabor)",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Das Essen schmeckt gut.",
    exampleSentenceEs: "La comida sabe bien.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "Essen", role: "verb_p1", order: 2 },
      { text: "schmeckt gut", role: "complement", order: 3 }
    ],
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "mögen",
    pron: "mö-guen",
    es: "gustar (comida)",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich mag Kaffee.",
    exampleSentenceEs: "Me gusta el café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "Kaffee", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "Ich möchte",
    pron: "íj mói-jte",
    es: "Me gustaría",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich möchte Wasser.",
    exampleSentenceEs: "Me gustaría agua.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "Wasser", role: "complement", order: 3 }
    ],
    regimen: "+ Infinitivo final"
  }, {
    de: "Was möchten Sie?",
    pron: "vas méj-ten si",
    es: "¿Qué le gustaría?",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Hallo! Was möchten Sie?",
    exampleSentenceEs: "¡Hola! ¿Qué le gustaría?",
    exampleSentenceDeBlocks: [
      { text: "Hallo! Was", role: "subject", order: 1 },
      { text: "möchten", role: "verb_p1", order: 2 },
      { text: "Sie", role: "complement", order: 3 }
    ],
    regimen: "Formal, Verb final"
  }, {
    de: "Ich hätte gern",
    pron: "ij jé-te guean",
    es: "Quisiera...",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich hätte gern einen Kaffee.",
    exampleSentenceEs: "Quisiera un café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "hätte", role: "verb_p1", order: 2 },
      { text: "gern einen Kaffee", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "nehmen",
    pron: "né-men",
    es: "tomar / pedir",
    type: "Verbo",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich nehme einen Kaffee.",
    exampleSentenceEs: "Yo tomo un café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "nehme", role: "verb_p1", order: 2 },
      { text: "einen Kaffee", role: "complement", order: 3 }
    ],
    regimen: "Irregular (nimmt) / + Akkusativ"
  }, {
    de: "das Restaurant",
    pron: "das res-to-rán",
    es: "restaurante",
    type: "Sustantivo (Neutro)",
    category: "Im Restaurant",
    exampleSentenceDe: "Das Restaurant ist neu.",
    exampleSentenceEs: "El restaurante es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das Restaurant", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Restaurants"
  }, {
    de: "die Speisekarte",
    pron: "di shpái-se-kár-te",
    es: "menú / carta",
    type: "Sustantivo (Fem)",
    category: "Im Restaurant",
    exampleSentenceDe: "Entschuldigung, die Speisekarte, bitte.",
    exampleSentenceEs: "Disculpe, el menú, por favor.",
    exampleSentenceDeBlocks: [
      { text: "Entschuldigung, die Speisekarte,", role: "subject", order: 1 },
      { text: "bitte", role: "verb_p1", order: 2 }
    ],
    plural: "die Speisekarten"
  }, {
    de: "bestellen",
    pron: "be-shté-len",
    es: "pedir / ordenar",
    type: "Verbo",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich bestelle Pizza.",
    exampleSentenceEs: "Yo pido pizza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bestelle", role: "verb_p1", order: 2 },
      { text: "Pizza", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "Guten Appetit",
    pron: "gú-ten a-pe-tít",
    es: "¡Buen provecho!",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Guten Appetit!",
    exampleSentenceEs: "¡Buen provecho!",
    exampleSentenceDeBlocks: [
      { text: "Guten", role: "subject", order: 1 },
      { text: "Appetit", role: "verb_p1", order: 2 }
    ],
    regimen: "Fijo, antes de comer"
  }, {
    de: "die Rechnung",
    pron: "di réj-nung",
    es: "la cuenta",
    type: "Sustantivo (Fem)",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich brauche die Rechnung bitte.",
    exampleSentenceEs: "Necesito la cuenta por favor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Rechnung bitte", role: "complement", order: 3 }
    ],
    plural: "die Rechnungen"
  }, {
    de: "bezahlen",
    pron: "be-tsá-len",
    es: "pagar",
    type: "Verbo",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich bezahle die Rechnung.",
    exampleSentenceEs: "Yo pago la cuenta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bezahle", role: "verb_p1", order: 2 },
      { text: "die Rechnung", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "getrennt / zusammen",
    pron: "gue-trént  tsu-sá-men",
    es: "separado / juntos",
    type: "Adjetivo",
    category: "Im Restaurant",
    exampleSentenceDe: "Wir wohnen zusammen.",
    exampleSentenceEs: "Vivimos juntos.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "wohnen", role: "verb_p1", order: 2 },
      { text: "zusammen", role: "verb_p2", order: 3 }
    ],
    regimen: "≠ zusammen / getrennt"
  }, {
    de: "Stimmt so",
    pron: "shtímt so",
    es: "Así está bien (propina)",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Stimmt so, danke.",
    exampleSentenceEs: "Así está bien, gracias.",
    exampleSentenceDeBlocks: [
      { text: "Stimmt so,", role: "subject", order: 1 },
      { text: "danke", role: "verb_p1", order: 2 }
    ],
    regimen: "Fijo, al pagar"
  }, {
    de: "das Gericht",
    pron: "das gue-ríjt",
    es: "el plato preparado",
    type: "Sustantivo",
    category: "Kochen",
    exampleSentenceDe: "Das Gericht ist lecker.",
    exampleSentenceEs: "El plato preparado está rico.",
    exampleSentenceDeBlocks: [
      { text: "Das Gericht", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "lecker", role: "complement", order: 3 }
    ],
    plural: "die Gerichte"
  }, {
    de: "der Topf / die Pfanne",
    pron: "dea tópf  di pfá-ne",
    es: "la olla / la sartén",
    type: "Sustantivo",
    category: "Kochen",
    exampleSentenceDe: "Ich habe einen Topf. Der Topf ist neu.",
    exampleSentenceEs: "Tengo una olla. La olla es nueva.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Topf", role: "complement", order: 3 }
    ],
    plural: "die Töpfe / die Pfannen"
  }, {
    de: "probieren",
    pron: "pro-bí-ren",
    es: "probar (comida)",
    type: "Verbo",
    category: "Kochen",
    exampleSentenceDe: "Ich möchte das Brot probieren.",
    exampleSentenceEs: "Quiero probar el pan.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "das Brot", role: "complement", order: 3 },
      { text: "probieren", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "scharf / süß",
    pron: "shaaf  süs",
    es: "picante / dulce",
    type: "Adjetivo",
    category: "Geschmack",
    exampleSentenceDe: "Das Essen ist scharf. Die Süßigkeit ist süß.",
    exampleSentenceEs: "La comida es picante. El dulce es dulce.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "Essen", role: "verb_p1", order: 2 },
      { text: "ist scharf", role: "complement", order: 3 }
    ],
    regimen: "≠ süß / scharf"
  }, {
    de: "satt sein",
    pron: "sat záin",
    es: "estar lleno",
    type: "Frase",
    category: "Gefühle",
    exampleSentenceDe: "Ich bin satt.",
    exampleSentenceEs: "Yo estoy lleno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "satt", role: "complement", order: 3 }
    ],
    regimen: "sein + adj"
  },
  {
    de: "backen",
    pron: "bá-ken",
    es: "hornear",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Wir backen heute frisches Brot.",
    exampleSentenceEs: "Horneamos hoy pan fresco.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "backen", role: "verb_p1", order: 2 },
      { text: "heute frisches Brot", role: "complement", order: 3 }
    ]
  }, {
        de: "braten",
    pron: "brá-ten",
    es: "freír / asar",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Er brät leckere Kartoffeln an.",
    exampleSentenceEs: "Él fríe patatas deliciosas.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "brät", role: "verb_p1", order: 2 },
      { text: "leckere Kartoffeln", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "grillen",
    pron: "grí-len",
    es: "asar a la parrilla",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Wir grillen Fleisch im Garten.",
    exampleSentenceEs: "Asamos carne en el jardín.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "grillen", role: "verb_p1", order: 2 },
      { text: "Fleisch im Garten", role: "complement", order: 3 }
    ]
  }, {
        de: "schneiden",
    pron: "shnái-den",
    es: "cortar",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Ich schneide den Apfel klein.",
    exampleSentenceEs: "Corto la manzana en trozos pequeños.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schneide", role: "verb_p1", order: 2 },
      { text: "den Apfel klein", role: "complement", order: 3 }
    ]
  }, {
        de: "das Besteck",
    pron: "das be-shték",
    es: "los cubiertos",
    type: "Sustantivo (Neutro)",
    category: "Haushalt",
    plural: "die Bestecke",
    exampleSentenceDe: "Das Besteck liegt auf dem Tisch.",
    exampleSentenceEs: "Los cubiertos están sobre la mesa.",
    exampleSentenceDeBlocks: [
      { text: "Das Besteck", role: "subject", order: 1 },
      { text: "liegt", role: "verb_p1", order: 2 },
      { text: "auf dem Tisch", role: "complement", order: 3 }
    ]
  }, {
        de: "die Schüssel",
    pron: "di shü-sel",
    es: "el tazón / bol",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Schüsseln",
    exampleSentenceDe: "Der Salat ist in der Schüssel.",
    exampleSentenceEs: "La ensalada está en el bol.",
    exampleSentenceDeBlocks: [
      { text: "Der Salat", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "in der Schüssel", role: "complement", order: 3 }
    ]
  }, {
        de: "das Glas",
    pron: "das glas",
    es: "el vaso / copa",
    type: "Sustantivo (Neutro)",
    category: "Haushalt",
    plural: "die Gläser",
    exampleSentenceDe: "Das Glas ist mit Wasser voll.",
    exampleSentenceEs: "El vaso está lleno de agua.",
    exampleSentenceDeBlocks: [
      { text: "Das Glas", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mit Wasser voll", role: "complement", order: 3 }
    ]
  }, {
        de: "der Becher",
    pron: "dea bé-jea",
    es: "el vaso (plástico/cartón)",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "die Becher",
    exampleSentenceDe: "Er nimmt einen Becher Kaffee.",
    exampleSentenceEs: "Él toma un vaso de café.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "nimmt", role: "verb_p1", order: 2 },
      { text: "einen Becher Kaffee", role: "complement", order: 3 }
    ]
  }, {
        de: "die Serviette",
    pron: "di sea-vié-te",
    es: "la servilleta",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Servietten",
    exampleSentenceDe: "Die Serviette liegt neben dem Teller.",
    exampleSentenceEs: "La servilleta está al lado del plato.",
    exampleSentenceDeBlocks: [
      { text: "Die Serviette", role: "subject", order: 1 },
      { text: "liegt", role: "verb_p1", order: 2 },
      { text: "neben dem Teller", role: "complement", order: 3 }
    ]
  }, {
        de: "der Pilz",
    pron: "dea pilts",
    es: "el champiñón",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Pilze",
    en: "brown mushroom",
    exampleSentenceDe: "Ich esse gern Pilze.",
    exampleSentenceEs: "Me gusta comer champiñones.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "gern Pilze", role: "complement", order: 3 }
    ]
  }, {
        de: "die Nuss",
    pron: "di nus",
    es: "la nuez",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Nüsse",
    en: "brown walnut",
    exampleSentenceDe: "Der Kuchen hat Nüsse.",
    exampleSentenceEs: "El pastel tiene nueces.",
    exampleSentenceDeBlocks: [
      { text: "Der Kuchen", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "Nüsse", role: "complement", order: 3 }
    ]
  }, {
        de: "der Keks",
    pron: "dea keks",
    es: "la galleta",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Kekse",
    en: "chocolate chip cookie",
    exampleSentenceDe: "Möchtest du einen Keks?",
    exampleSentenceEs: "¿Quieres una galleta?",
    exampleSentenceDeBlocks: [
      { text: "Möchtest", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "einen Keks", role: "complement", order: 3 }
    ]
  }, {
        de: "das Bonbon",
    pron: "das bong-bóng",
    es: "el caramelo",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Bonbons",
    en: "wrapped sweet candy",
    exampleSentenceDe: "Das Kind isst ein Bonbon.",
    exampleSentenceEs: "El niño come un caramelo.",
    exampleSentenceDeBlocks: [
      { text: "Das Kind", role: "subject", order: 1 },
      { text: "isst", role: "verb_p1", order: 2 },
      { text: "ein Bonbon", role: "complement", order: 3 }
    ]
  }, {
        de: "die Schokolade",
    pron: "di sho-ko-lá-de",
    es: "el chocolate",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Schokoladen",
    en: "brown chocolate bar",
    exampleSentenceDe: "Ich liebe Schokolade.",
    exampleSentenceEs: "Amo el chocolate.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "liebe", role: "verb_p1", order: 2 },
      { text: "Schokolade", role: "complement", order: 3 }
    ]
  }, {
        de: "die Sahne",
    pron: "di zá-ne",
    es: "la crema / nata",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Sahnen",
    en: "bowl of whipped cream",
    exampleSentenceDe: "Ich trinke Kaffee mit Sahne.",
    exampleSentenceEs: "Bebo café con nata.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trinke", role: "verb_p1", order: 2 },
      { text: "Kaffee mit Sahne", role: "complement", order: 3 }
    ]
  }, {
        de: "der Pfirsich",
    pron: "dea pfír-sij",
    es: "el durazno",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Pfirsiche",
    en: "fresh peach fruit",
    exampleSentenceDe: "Der Pfirsich ist sehr süß.",
    exampleSentenceEs: "El durazno es muy dulce.",
    exampleSentenceDeBlocks: [
      { text: "Der Pfirsich", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr süß", role: "complement", order: 3 }
    ]
  }, {
        de: "die Melone",
    pron: "di me-ló-ne",
    es: "el melón",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Melonen",
    en: "slice of watermelon",
    exampleSentenceDe: "Im Sommer esse ich Melone.",
    exampleSentenceEs: "En verano como melón.",
    exampleSentenceDeBlocks: [
      { text: "Im Sommer", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "ich Melone", role: "complement", order: 3 }
    ]
  }, {
        de: "das Mehl",
    pron: "das mel",
    es: "la harina",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Mehle",
    en: "paper bag of white flour",
    exampleSentenceDe: "Wir brauchen Mehl für das Brot.",
    exampleSentenceEs: "Necesitamos harina para el pan.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "brauchen", role: "verb_p1", order: 2 },
      { text: "Mehl für das Brot", role: "complement", order: 3 }
    ]
  }, {
        de: "das Gewürz",
    pron: "das gue-vürts",
    es: "la especia",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Gewürze",
    en: "small bowl of red spice powder",
    exampleSentenceDe: "Das Essen braucht mehr Gewürz.",
    exampleSentenceEs: "La comida necesita más especias.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "Essen", role: "verb_p1", order: 2 },
      { text: "braucht mehr Gewürz", role: "complement", order: 3 }
    ]
  }, {
        de: "die Kirsche",
    pron: "di kír-she",
    es: "la cereza",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Kirschen",
    en: "two red cherries",
    exampleSentenceDe: "Die Kirsche ist rot.",
    exampleSentenceEs: "La cereza es roja.",
    exampleSentenceDeBlocks: [
      { text: "Die Kirsche", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ]
  }, {
        de: "die Pflaume",
    pron: "di pfláu-me",
    es: "la ciruela",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Pflaumen",
    en: "purple plum",
    exampleSentenceDe: "Diese Pflaume ist lecker.",
    exampleSentenceEs: "Esta ciruela es delicosa.",
    exampleSentenceDeBlocks: [
      { text: "Diese Pflaume", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "lecker", role: "complement", order: 3 }
    ]
  }, {
        de: "der Senf",
    pron: "dea senf",
    es: "la mostaza",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Senfe",
    en: "yellow mustard bottle",
    exampleSentenceDe: "Ich esse Wurst mit Senf.",
    exampleSentenceEs: "Como embutido con mostaza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "Wurst mit Senf", role: "complement", order: 3 }
    ]
  }, {
        de: "die Mayonnaise",
    pron: "di ma-yo-né-ze",
    es: "la mayonesa",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Mayonnaisen",
    en: "jar of white mayonnaise",
    exampleSentenceDe: "Pommes frites mit Mayonnaise, bitte.",
    exampleSentenceEs: "Papas fritas con mayonesa, por favor.",
    exampleSentenceDeBlocks: [
      { text: "Pommes frites mit Mayonnaise,", role: "subject", order: 1 },
      { text: "bitte", role: "verb_p1", order: 2 }
    ]
  }, {
        de: "der Ketchup",
    pron: "dea két-chup",
    es: "el kétchup",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Ketchups",
    en: "red ketchup bottle",
    exampleSentenceDe: "Das Kind mag Ketchup.",
    exampleSentenceEs: "Al niño le gusta el kétchup.",
    exampleSentenceDeBlocks: [
      { text: "Das Kind", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "Ketchup", role: "complement", order: 3 }
    ]
  },
  {
    de: "das Ei",
    pron: "das ai",
    es: "el huevo",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Eier",
    en: "a white egg",
    exampleSentenceDe: "Ich esse ein gekochtes Ei zum Frühstück.",
    exampleSentenceEs: "Yo como un huevo cocido de desayuno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "esse", role: "verb_p1", order: 2 },
      { text: "ein gekochtes Ei zum Frühstück", role: "complement", order: 3 }
    ]
  }, {
        de: "das Salz",
    pron: "das salts",
    es: "la sal",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Salze",
    en: "a salt shaker",
    exampleSentenceDe: "Die Suppe braucht mehr Salz.",
    exampleSentenceEs: "La sopa necesita más sal.",
    exampleSentenceDeBlocks: [
      { text: "Die Suppe", role: "subject", order: 1 },
      { text: "braucht", role: "verb_p1", order: 2 },
      { text: "mehr Salz", role: "complement", order: 3 }
    ]
  }, {
        de: "der Pfeffer",
    pron: "dea pfe-fa",
    es: "la pimienta",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "-",
    en: "a black pepper shaker",
    exampleSentenceDe: "Ich brauche Salz und Pfeffer.",
    exampleSentenceEs: "Necesito sal y pimienta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "Salz und Pfeffer", role: "complement", order: 3 }
    ]
  }, {
        de: "der Zucker",
    pron: "dea tsu-ka",
    es: "el azúcar",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "-",
    en: "a few white sugar cubes",
    exampleSentenceDe: "Trinkst du den Kaffee mit Zucker?",
    exampleSentenceEs: "¿Bebes el café con azúcar?",
    exampleSentenceDeBlocks: [
      { text: "Trinkst", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "den Kaffee mit Zucker", role: "complement", order: 3 }
    ]
  }, {
        de: "die Nudeln",
    pron: "di nu-deln",
    es: "la pasta / los fideos",
    type: "Sustantivo (Plural)",
    category: "Lebensmittel",
    plural: "die Nudeln",
    en: "a bowl of cooked pasta",
    exampleSentenceDe: "Wir kochen heute Abend Nudeln.",
    exampleSentenceEs: "Cocinamos pasta esta noche.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "kochen", role: "verb_p1", order: 2 },
      { text: "heute Abend Nudeln", role: "complement", order: 3 }
    ]
  }, {
        de: "die Wurst",
    pron: "di vurst",
    es: "el embutido / la salchicha",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Würste",
    en: "a traditional german sausage",
    exampleSentenceDe: "Ich möchte ein Brötchen mit Wurst.",
    exampleSentenceEs: "Quisiera un panecillo con embutido.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "ein Brötchen mit Wurst", role: "complement", order: 3 }
    ]
  },
  {
    "de": "der Alkohol",
    "pron": "dea ál-ko-jol",
    "es": "el alcohol",
    "type": "Sustantivo (Masc)",
    "category": "Getränke",
    "level": "B1",
    "regimen": "Singular",
    "en": "glass bottle of wine and frothy beer mug",
    "exampleSentenceDe": "Wenn man Auto fährt, darf man keinen Alkohol trinken.",
    "exampleSentenceEs": "Cuando se conduce no está permitido beber alcohol.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wenn man Auto fährt,",
        "role": "subject",
        "order": 1
      },
      {
        "text": "darf",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man keinen Alkohol",
        "role": "complement",
        "order": 3
      },
      {
        "text": "trinken",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Apfelsaft",
    "pron": "dea áp-fel-zaft",
    "es": "el zumo de manzana",
    "type": "Sustantivo (Masc)",
    "category": "Getränke",
    "level": "A1",
    "plural": "die Apfelsäfte",
    "en": "clear glass of golden apple juice next to a red apple",
    "exampleSentenceDe": "Was trinken Sie? Ich trinke einen Apfelsaft.",
    "exampleSentenceEs": "¿Qué bebe usted? Bebo un zumo de manzana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Was",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trinken",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie? Ich trinke einen Apfelsaft",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Aprikose",
    "pron": "di a-pri-kó-ze",
    "es": "el albaricoque",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A2–B1",
    "plural": "die Aprikosen",
    "en": "fresh ripe orange apricot fruit with green leaf",
    "exampleSentenceDe": "Im Sommer schmecken frische Aprikosen sehr süß.",
    "exampleSentenceEs": "En verano los albaricoques frescos saben muy dulces.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Sommer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schmecken",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "frische Aprikosen sehr süß",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die/das Cola",
    "pron": "di/das kó-la",
    "es": "la cola (refresco)",
    "type": "Sustantivo (Fem/Neutro)",
    "category": "Getränke",
    "level": "A1–B1",
    "plural": "die Colas",
    "en": "tall glass of dark fizzy cola soda with ice and straw",
    "exampleSentenceDe": "Was nehmen Sie? Ich nehme eine Cola.",
    "exampleSentenceEs": "¿Qué toma usted? Tomo una cola.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Was",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nehmen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie? Ich nehme eine Cola",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Dose",
    "pron": "di dó-ze",
    "es": "la lata / bote",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Dosen",
    "en": "metal tin food can with red tomato label",
    "exampleSentenceDe": "Auf dem Tisch steht eine Dose Tomaten.",
    "exampleSentenceEs": "En la mesa hay una lata de tomates.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dem Tisch",
        "role": "subject",
        "order": 1
      },
      {
        "text": "steht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Dose Tomaten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Hackfleisch",
    "pron": "das ják-flaish",
    "es": "la carne picada",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "Singular (A: Faschierte)",
    "en": "fresh tray of red ground minced beef meat",
    "exampleSentenceDe": "Für die Soße brauche ich 500 Gramm Hackfleisch.",
    "exampleSentenceEs": "Para la salsa necesito 500 gramos de carne picada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für die Soße",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich 500 Gramm Hackfleisch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Hähnchen / Hühnchen",
    "pron": "das jén-jen / jǘn-jen",
    "es": "el pollo (carne/asado)",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Hähnchen",
    "en": "golden roasted whole chicken on a white serving plate",
    "exampleSentenceDe": "Ich bestelle ein halbes Hähnchen mit Salat.",
    "exampleSentenceEs": "Pido medio pollo con ensalada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bestelle",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein halbes Hähnchen mit Salat",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Halbpension",
    "pron": "di jálp-pen-zión",
    "es": "la media pensión",
    "type": "Sustantivo (Fem)",
    "category": "Gastronomie",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Wir buchen das Hotel mit Halbpension.",
    "exampleSentenceEs": "Reservamos el hotel con media pensión.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "buchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Hotel mit Halbpension",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "haltbar",
    "pron": "jált-bar",
    "es": "duradero / no perecedero",
    "type": "Adjetivo",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "Predicativo/Atributivo",
    "exampleSentenceDe": "Wie lange ist diese Milch haltbar?",
    "exampleSentenceEs": "¿Hasta cuándo se conserva esta leche?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie lange",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "diese Milch haltbar",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Hamburger",
    "pron": "dea jám-bur-ga",
    "es": "la hamburguesa",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "A1–B1",
    "plural": "die Hamburger",
    "en": "classic cheeseburger with beef patty, lettuce, and sesame bun",
    "exampleSentenceDe": "Die Person isst einen Hamburger.",
    "exampleSentenceEs": "La persona come una hamburguesa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Person",
        "role": "subject",
        "order": 1
      },
      {
        "text": "isst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "einen Hamburger",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Joghurt",
    "pron": "dea yó-gurt",
    "es": "el yogur",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Joghurts",
    "en": "small white cup of creamy yogurt with a silver spoon",
    "exampleSentenceDe": "Zum Frühstück esse ich gern Joghurt mit Obst.",
    "exampleSentenceEs": "Para desayunar como con gusto yogur con fruta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zum Frühstück",
        "role": "subject",
        "order": 1
      },
      {
        "text": "esse",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich gern Joghurt mit Obst",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "mager",
    "pron": "má-gua",
    "es": "magro / bajo en grasa",
    "type": "Adjetivo",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "Comp: magerer",
    "exampleSentenceDe": "Ich kaufe heute mageres Fleisch zum Kochen.",
    "exampleSentenceEs": "Hoy compro carne magra para cocinar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute mageres Fleisch zum Kochen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mahlzeit",
    "pron": "di mál-tsait",
    "es": "la comida (ingesta del día)",
    "type": "Sustantivo (Fem)",
    "category": "Essen",
    "level": "B1",
    "plural": "die Mahlzeiten",
    "exampleSentenceDe": "Das Mittagessen ist für mich die wichtigste Mahlzeit.",
    "exampleSentenceEs": "El almuerzo es para mí la comida más importante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Mittagessen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "für mich die wichtigste Mahlzeit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Packung",
    "pron": "di pá-kung",
    "es": "el paquete / envase",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Packungen",
    "en": "sealed cardboard milk carton package",
    "exampleSentenceDe": "Ich brauche noch eine Packung Milch.",
    "exampleSentenceEs": "Todavía necesito un cartón de leche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch eine Packung Milch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das/der Sandwich",
    "pron": "das/dea sénd-vich",
    "es": "el sándwich",
    "type": "Sustantivo (Neutro/Masc)",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "Gen: -(e)s",
    "plural": "die Sandwiche / Sandwiches",
    "en": "fresh triangle toast sandwich with cheese, lettuce, and tomato",
    "exampleSentenceDe": "In der Mittagspause esse ich ein Sandwich.",
    "exampleSentenceEs": "En la pausa del mediodía como un sándwich.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Mittagspause",
        "role": "subject",
        "order": 1
      },
      {
        "text": "esse",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich ein Sandwich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Schokoladenkuchen",
    "pron": "dea sho-ko-lá-den-ku-jen",
    "es": "el pastel de chocolate",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Schokoladenkuchen",
    "en": "rich frosted chocolate layer cake slice on a plate",
    "exampleSentenceDe": "Am Sonntag backe ich einen Schokoladenkuchen.",
    "exampleSentenceEs": "El domingo horneo un pastel de chocolate.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Sonntag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "backe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich einen Schokoladenkuchen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Schwarzbrot",
    "pron": "das shvárts-brot",
    "es": "el pan negro / integral",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Schwarzbrote",
    "en": "sliced loaf of dark German rye whole-grain bread",
    "exampleSentenceDe": "Zum Käse schmeckt deutsches Schwarzbrot sehr gut.",
    "exampleSentenceEs": "Con el queso el pan negro alemán sabe muy bien.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zum Käse",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schmeckt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "deutsches Schwarzbrot sehr gut",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Snack",
    "pron": "dea snek",
    "es": "el tentempié / bocadillo rápido",
    "type": "Sustantivo (Masc)",
    "category": "Gastronomie",
    "level": "B1",
    "plural": "die Snacks",
    "en": "small plate with crispy pretzels and bite-sized snacks",
    "exampleSentenceDe": "Im Zug gibt es leider nur kleine Snacks.",
    "exampleSentenceEs": "En el tren lamentablemente solo hay pequeños tentempiés.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Zug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es leider nur kleine Snacks",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Steak",
    "pron": "das shteik",
    "es": "el filete (de carne)",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Steaks",
    "en": "grilled juicy beef steak with herb butter on a plate",
    "exampleSentenceDe": "Möchten Sie Ihr Steak gut durchgebraten?",
    "exampleSentenceEs": "¿Quiere su filete bien hecho?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Möchten",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "Ihr Steak gut durchgebraten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "stinken",
    "pron": "shtín-ken",
    "es": "oler mal / apestar",
    "type": "Verbo irregular",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "nach + Dat / stinkt, stank, hat gestunken",
    "exampleSentenceDe": "Der alte Käse im Kühlschrank stinkt furchtbar.",
    "exampleSentenceEs": "El queso viejo en el frigorífico huele fatal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der alte Käse im Kühlschrank",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stinkt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "furchtbar",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Appetit",
    "pron": "dea a-pe-tít",
    "es": "el apetito",
    "type": "Sustantivo (Masc)",
    "category": "Essen",
    "level": "A1–B1",
    "regimen": "Guten Appetit!",
    "exampleSentenceDe": "Ich wünsche Ihnen guten Appetit beim Mittagessen!",
    "exampleSentenceEs": "¡Le deseo buen provecho en el almuerzo!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wünsche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Ihnen guten Appetit beim Mittagessen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Banane",
    "pron": "di ba-ná-ne",
    "es": "el plátano / banana",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A1–B1",
    "plural": "die Bananen",
    "en": "fresh ripe yellow curved banana with smooth peel",
    "exampleSentenceDe": "Ich kaufe ein Kilo reife Bananen auf dem Markt.",
    "exampleSentenceEs": "Compro un kilo de plátanos maduros en el mercado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Kilo reife Bananen auf dem Markt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bedienen",
    "pron": "be-dí-nen",
    "es": "atender / servir / manejar",
    "type": "Verbo inseparable",
    "category": "Restaurant",
    "level": "A2–B1",
    "regimen": "+ Akk / bedient, bediente, hat bedient",
    "en": "friendly restaurant waiter carrying a serving tray with coffee cups to a dining table",
    "exampleSentenceDe": "Entschuldigung, werden Sie hier schon bedient?",
    "exampleSentenceEs": "Disculpe, ¿ya le están atendiendo aquí?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Entschuldigung,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "werden",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "hier schon",
        "role": "complement",
        "order": 4
      },
      {
        "text": "bedient",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "bio(logisch)",
    "pron": "bí-o / bio-ló-guish",
    "es": "ecológico / orgánico / bio",
    "type": "Adjetivo",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "Bio-Gemüse",
    "exampleSentenceDe": "Im Supermarkt kaufe ich gern biologische Lebensmittel.",
    "exampleSentenceEs": "En el supermercado compro con gusto alimentos ecológicos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Supermarkt",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "gern biologische Lebensmittel",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Birne",
    "pron": "di bír-ne",
    "es": "la pera (y bombilla)",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A1–B1",
    "plural": "die Birnen",
    "en": "fresh ripe green and yellow pear fruit with small brown stem",
    "exampleSentenceDe": "Die frischen Birnen schmecken heute sehr süß.",
    "exampleSentenceEs": "Las peras frescas saben hoy muy dulces.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die frischen Birnen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schmecken",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute sehr süß",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Bohne",
    "pron": "di bó-ne",
    "es": "la judía / frijol / grano",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A2–B1",
    "plural": "die Bohnen",
    "en": "fresh crisp green beans in a small white ceramic bowl",
    "exampleSentenceDe": "Ich esse gern grüne Bohnen zum Mittagessen.",
    "exampleSentenceEs": "Como con gusto judías verdes en el almuerzo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "esse",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gern grüne Bohnen zum Mittagessen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Brötchen",
    "pron": "das brö́t-jen",
    "es": "el panecillo / bollo",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "A1–B1",
    "plural": "die Brötchen (A: Semmel)",
    "en": "freshly baked golden crusty German bread roll",
    "exampleSentenceDe": "Ich hole schnell frische Brötchen zum Frühstück.",
    "exampleSentenceEs": "Voy a buscar rápido panecillos frescos para el desayuno.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hole",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schnell frische Brötchen zum Frühstück",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Café",
    "pron": "das ka-fé",
    "es": "la cafetería",
    "type": "Sustantivo (Neutro)",
    "category": "Gastronomie",
    "level": "A1–B1",
    "plural": "die Cafés",
    "en": "cozy street corner coffee cafe storefront with small outdoor bistro tables",
    "exampleSentenceDe": "Lass uns zusammen in das neue Café gehen.",
    "exampleSentenceEs": "Vamos juntos a la nueva cafetería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Lass",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "uns zusammen in das neue Café",
        "role": "complement",
        "order": 2
      },
      {
        "text": "gehen",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "das Dessert",
    "pron": "das de-sér",
    "es": "el postre",
    "type": "Sustantivo (Neutro)",
    "category": "Restaurant",
    "level": "B1",
    "plural": "die Desserts (D, A: Nachspeise)",
    "en": "sweet strawberry layer cake slice with whipped cream on a dessert plate",
    "exampleSentenceDe": "Nach dem Hauptgericht bestellen wir ein Dessert.",
    "exampleSentenceEs": "Después del plato principal pedimos un postre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Hauptgericht",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bestellen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ein Dessert",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "ernähren",
    "pron": "ea-né-ren",
    "es": "alimentar / alimentarse (sich)",
    "type": "Verbo inseparable",
    "category": "Gesundheit",
    "level": "B1",
    "regimen": "+ Akk / ernährt, ernährte, hat ernährt",
    "exampleSentenceDe": "Wie ernähre ich mich im Alltag gesund?",
    "exampleSentenceEs": "¿Cómo me alimento de forma saludable en el día a día?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ernähre",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mich im Alltag gesund",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Essig",
    "pron": "dea é-sij",
    "es": "el vinagre",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "Singular",
    "en": "clear glass bottle of golden apple cider vinegar with wooden cork",
    "exampleSentenceDe": "Am grünen Salat fehlt noch etwas Öl und Essig.",
    "exampleSentenceEs": "A la ensalada verde le falta todavía un poco de aceite y vinagre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am grünen Salat",
        "role": "complement",
        "order": 1
      },
      {
        "text": "fehlt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch etwas Öl und Essig",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "die Gaststätte",
    "pron": "di gást-shte-te",
    "es": "el restaurante / mesón (D)",
    "type": "Sustantivo (Fem)",
    "category": "Restaurant",
    "level": "B1",
    "plural": "die Gaststätten",
    "en": "traditional cozy German restaurant tavern exterior with wooden sign and warm lights",
    "exampleSentenceDe": "Ich arbeite seit einem Monat in einer Gaststätte.",
    "exampleSentenceEs": "Trabajo desde hace un mes en un restaurante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeite",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "seit einem Monat in einer Gaststätte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Honig",
    "pron": "dea jó-nij",
    "es": "la miel",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "A2",
    "regimen": "Singular",
    "en": "glass jar of golden honey with a wooden honey dipper",
    "exampleSentenceDe": "Ich esse Brötchen mit Butter und Honig zum Frühstück.",
    "exampleSentenceEs": "Como panecillos con mantequilla y miel para el desayuno.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "esse",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Brötchen mit Butter und Honig zum Frühstück",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kasten",
    "pron": "dea kás-ten",
    "es": "la caja (bebidas) / arcón",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Kästen",
    "en": "blue plastic beverage crate holding glass mineral water bottles",
    "exampleSentenceDe": "Bitte bringen Sie einen Kasten Mineralwasser mit.",
    "exampleSentenceEs": "Por favor, traiga una caja de agua mineral.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bringen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "einen Kasten Mineralwasser",
        "role": "complement",
        "order": 4
      },
      {
        "text": "mit",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der Kaugummi",
    "pron": "dea káu-gu-mi",
    "es": "el chicle / goma de mascar",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Kaugummis",
    "en": "pink chewing gum strips beside a foil-wrapped gum pack",
    "exampleSentenceDe": "Der Junge kauft sich einen Kaugummi am Kiosk.",
    "exampleSentenceEs": "El niño se compra un chicle en el quiosco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Junge",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kauft",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich einen Kaugummi am Kiosk",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Knödel",
    "pron": "dea knö́-del",
    "es": "la albóndiga de patata/pan (A, Bayern)",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Knödel",
    "en": "two round golden potato dumplings served on a white ceramic plate",
    "exampleSentenceDe": "In Bayern isst man sonntags oft Fleisch mit Knödeln.",
    "exampleSentenceEs": "En Baviera se come a menudo los domingos carne con Knödel.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Bayern",
        "role": "complement",
        "order": 1
      },
      {
        "text": "isst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "sonntags oft Fleisch mit Knödeln",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "kochen",
    "pron": "kó-jen",
    "es": "cocinar / hervir",
    "type": "Verbo regular",
    "category": "Kochen",
    "level": "A1–B1",
    "regimen": "+ Akk / kocht, kochte, hat gekocht",
    "en": "stainless steel cooking pot with bubbling water and pasta on a stove",
    "exampleSentenceDe": "Das Nudelwasser kocht schon im Topf.",
    "exampleSentenceEs": "El agua de la pasta ya hierve en la olla.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Nudelwasser",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kocht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schon im Topf",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Margarine",
    "pron": "di mar-ga-rí-ne",
    "es": "la margarina",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A2",
    "regimen": "Singular",
    "en": "open plastic tub of yellow margarine spread with a butter knife",
    "exampleSentenceDe": "Er isst Margarine statt Butter auf dem Brot.",
    "exampleSentenceEs": "Él come margarina en lugar de mantequilla en el pan.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "isst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Margarine statt Butter auf dem Brot",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Plastik",
    "pron": "das plás-tik",
    "es": "el plástico",
    "type": "Sustantivo (Neutro)",
    "category": "Material",
    "level": "A2–B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Die neuen Flaschen sind leider aus Plastik.",
    "exampleSentenceEs": "Las botellas nuevas lamentablemente son de plástico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die neuen Flaschen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider aus Plastik",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Portion",
    "pron": "di por-tsión",
    "es": "la ración / porción",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A2–B1",
    "plural": "die Portionen",
    "exampleSentenceDe": "Ich nehme eine kleine Portion Eis mit Sahne.",
    "exampleSentenceEs": "Tomo una porción pequeña de helado con nata.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nehme",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine kleine Portion Eis mit Sahne",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Rind",
    "pron": "das rint",
    "es": "la ternera / ganado vacuno",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Rinder",
    "en": "spotted brown cattle cow standing calmly on green grass",
    "exampleSentenceDe": "Wir essen heute Abend Fleisch vom Rind.",
    "exampleSentenceEs": "Cenamos hoy carne de ternera.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "essen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute Abend Fleisch vom Rind",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "roh",
    "pron": "ro",
    "es": "crudo / en bruto",
    "type": "Adjetivo",
    "category": "Lebensmittel",
    "level": "B1",
    "regimen": "Comp: roher",
    "exampleSentenceDe": "Dieses Gemüse kann man auch roh essen.",
    "exampleSentenceEs": "Esta verdura también se puede comer cruda.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Gemüse",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "auch roh",
        "role": "complement",
        "order": 4
      },
      {
        "text": "essen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "salzig",
    "pron": "zál-tsij",
    "es": "salado",
    "type": "Adjetivo",
    "category": "Lebensmittel",
    "level": "A2–B1",
    "regimen": "Comp: salziger",
    "exampleSentenceDe": "Dieses Essen ist mir heute viel zu salzig.",
    "exampleSentenceEs": "Esta comida me resulta hoy demasiado salada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Essen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir heute viel zu salzig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "sauer",
    "pron": "záu-a",
    "es": "ácido / enfadado",
    "type": "Adjetivo",
    "category": "Lebensmittel",
    "level": "A2–B1",
    "regimen": "Comp: saurer",
    "exampleSentenceDe": "Die kleinen Äpfel vom Markt sind mir zu sauer.",
    "exampleSentenceEs": "Las manzanas pequeñas del mercado me resultan demasiado ácidas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die kleinen Äpfel vom Markt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir zu sauer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Schachtel",
    "pron": "di sháj-tel",
    "es": "la caja (pequeña/cartón)",
    "type": "Sustantivo (Fem)",
    "category": "Verpackung",
    "level": "A1–B1",
    "plural": "die Schachteln",
    "en": "a cute 3D isometric UI icon of a small pastel cardboard box with lid and ribbon",
    "exampleSentenceDe": "Meiner Mutter schenke ich eine Schachtel Pralinen.",
    "exampleSentenceEs": "A mi madre le regalo una caja de bombones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meiner Mutter",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schenke",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Schachtel Pralinen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Schinken",
    "pron": "dea shín-ken",
    "es": "el jamón",
    "type": "Sustantivo (Masc)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Schinken",
    "en": "a cute 3D isometric UI icon of fresh pink sliced ham on a wooden serving board",
    "exampleSentenceDe": "Bitte geben Sie mir ein Brötchen mit Schinken.",
    "exampleSentenceEs": "Por favor, deme un panecillo con jamón.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "geben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mir ein Brötchen mit Schinken",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Schnitzel",
    "pron": "das shnít-sel",
    "es": "el escalope / filete empanado",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Schnitzel",
    "en": "a cute 3D isometric UI icon of a golden crispy breaded schnitzel with a lemon wedge on a plate",
    "exampleSentenceDe": "Bitte ein Schnitzel mit Kartoffeln und grünem Salat.",
    "exampleSentenceEs": "Un escalope con patatas y ensalada verde, por favor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ein Schnitzel mit Kartoffeln und grünem Salat",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "das Schwein",
    "pron": "das shvain",
    "es": "el cerdo",
    "type": "Sustantivo (Neutro)",
    "category": "Lebensmittel",
    "level": "B1",
    "plural": "die Schweine (Fleisch vom S.)",
    "en": "a cute 3D isometric UI icon of a friendly pink farm pig",
    "exampleSentenceDe": "Ich esse aus religiösen Gründen kein Fleisch vom Schwein.",
    "exampleSentenceEs": "Por motivos religiosos no como carne de cerdo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "esse",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus religiösen Gründen kein Fleisch vom Schwein",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Speise",
    "pron": "di shpái-ze",
    "es": "el plato / manjar / comida",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A2–B1",
    "plural": "die Speisen (Vorspeise / Nachspeise)",
    "en": "a cute 3D isometric UI icon of a warm plated restaurant dish with a bowl of soup",
    "exampleSentenceDe": "Als Vorspeise nehme ich heute eine warme Suppe.",
    "exampleSentenceEs": "De primer plato tomo hoy una sopa caliente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Als Vorspeise",
        "role": "complement",
        "order": 1
      },
      {
        "text": "nehme",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "heute eine warme Suppe",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Speisewagen",
    "pron": "dea shpái-ze-va-guen",
    "es": "el vagón restaurante",
    "type": "Sustantivo (Masc)",
    "category": "Gastronomie",
    "level": "B1",
    "plural": "die Speisewagen",
    "en": "a cute 3D isometric UI icon of a modern train dining car with small dining tables inside",
    "exampleSentenceDe": "Wo im Zug befindet sich bitte der Speisewagen?",
    "exampleSentenceEs": "¿Dónde se encuentra el vagón restaurante en el tren, por favor?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wo im Zug",
        "role": "complement",
        "order": 1
      },
      {
        "text": "befindet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich bitte",
        "role": "complement",
        "order": 3
      },
      {
        "text": "der Speisewagen",
        "role": "subject",
        "order": 4
      }
    ]
  },
  {
    "de": "die Torte",
    "pron": "di tór-te",
    "es": "la tarta / pastel",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Torten",
    "en": "a cute 3D isometric UI icon of a layered chocolate birthday cake topped with creamy frosting",
    "exampleSentenceDe": "Zum Geburtstag backe ich dir eine große Schokoladentorte.",
    "exampleSentenceEs": "Para tu cumpleaños te horneo una gran tarta de chocolate.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zum Geburtstag",
        "role": "complement",
        "order": 1
      },
      {
        "text": "backe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "dir eine große Schokoladentorte",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "vegetarisch",
    "pron": "ve-gue-tá-rish",
    "es": "vegetariano",
    "type": "Adjetivo",
    "category": "Lebensmittel",
    "level": "A2–B1",
    "regimen": "Predicativo/Atributivo",
    "exampleSentenceDe": "Haben Sie auf der Karte auch vegetarische Gerichte?",
    "exampleSentenceEs": "¿Tienen también platos vegetarianos en la carta?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Haben",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "auf der Karte auch vegetarische Gerichte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Zitrone",
    "pron": "di tsi-tró-ne",
    "es": "el limón",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A1",
    "plural": "die Zitronen",
    "en": "a cute 3D isometric UI icon of a bright yellow fresh lemon with a small green leaf",
    "exampleSentenceDe": "Ich hätte heute Nachmittag gern einen Tee mit Zitrone.",
    "exampleSentenceEs": "Quisiera un té con limón esta tarde.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hätte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute Nachmittag gern einen Tee mit Zitrone",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "zu|bereiten",
    "pron": "tsú-be-rai-ten",
    "es": "preparar (comida)",
    "type": "Verbo separable",
    "category": "Kochen",
    "level": "B1",
    "regimen": "+ Akk / bereitet zu, bereitete zu, hat zubereitet",
    "en": "a cute 3D isometric character chopping fresh vegetables and cooking a meal in a kitchen pan",
    "exampleSentenceDe": "Sie bereitet das Fleisch mit Kartoffeln und Gemüse zu.",
    "exampleSentenceEs": "Ella prepara la carne con patatas y verdura.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bereitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Fleisch mit Kartoffeln und Gemüse",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Zwiebel",
    "pron": "di tsví-bel",
    "es": "la cebolla",
    "type": "Sustantivo (Fem)",
    "category": "Lebensmittel",
    "level": "A1–A2",
    "plural": "die Zwiebeln",
    "en": "a cute 3D isometric UI icon of a fresh golden-brown whole onion bulb",
    "exampleSentenceDe": "Eine Zwiebel in kleine Stücke schneiden und mit Fleisch braten.",
    "exampleSentenceEs": "Cortar una cebolla en trozos pequeños y freír con carne.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Eine Zwiebel in kleine Stücke",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schneiden",
        "role": "verb_p2",
        "order": 2
      },
      {
        "text": "und mit Fleisch",
        "role": "complement",
        "order": 3
      },
      {
        "text": "braten",
        "role": "verb_p2",
        "order": 4
      }
    ]
  }
]
},
{
  id: 9,
  title: "Kapitel 9: Kleidung",
  icon: <ShoppingCart size={20} />,
  emoji: "👕",
  words: [{
    de: "die Kleidung",
    pron: "di kláí-dung",
    es: "ropa",
    type: "Sustantivo (Fem)",
    category: "Allgemein",
    exampleSentenceDe: "Ich habe Kleidung. Die Kleidung ist neu.",
    exampleSentenceEs: "Tengo ropa. La ropa es nueva.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Kleidung", role: "complement", order: 3 }
    ],
    plural: "die Kleidungen"
  }, {
    de: "der Pullover",
    pron: "dea pu-ló-fea",
    es: "suéter",
    type: "Sustantivo (Masc)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe einen Pullover. Der Pullover ist blau.",
    exampleSentenceEs: "Tengo un suéter. El suéter es azul.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Pullover", role: "complement", order: 3 }
    ],
    plural: "die Pullover"
  }, {
    de: "der Rock",
    pron: "dea rok",
    es: "falda",
    type: "Sustantivo (Masc)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe einen Rock. Der Rock ist rot.",
    exampleSentenceEs: "Tengo una falda. La falda es roja.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Rock", role: "complement", order: 3 }
    ],
    plural: "die Röcke"
  }, {
    de: "die Hose",
    pron: "di jó-se",
    es: "pantalón",
    type: "Sustantivo (Fem)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe die Hose. Die Hose ist blau.",
    exampleSentenceEs: "Tengo el pantalón. El pantalón es azul.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Hose", role: "complement", order: 3 }
    ],
    plural: "die Hosen"
  }, {
    de: "das Hemd",
    pron: "das jemt",
    es: "camisa",
    type: "Sustantivo (Neutro)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe das Hemd. Das Hemd ist weiß.",
    exampleSentenceEs: "Tengo la camisa. La camisa es blanca.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Hemd", role: "complement", order: 3 }
    ],
    plural: "die Hemden"
  }, {
    de: "die Schuhe",
    pron: "di shú-e",
    es: "zapatos",
    type: "Sustantivo (Plural)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe die Schuhe. Die Schuhe sind neu.",
    exampleSentenceEs: "Tengo los zapatos. Los zapatos son nuevos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Schuhe", role: "complement", order: 3 }
    ],
    plural: "die Schuhe"
  }, {
    de: "die Jacke",
    pron: "di yá-ke",
    es: "chaqueta",
    type: "Sustantivo (Fem)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Die Jacke ist neu.",
    exampleSentenceEs: "La chaqueta es nueva.",
    exampleSentenceDeBlocks: [
      { text: "Die Jacke", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Jacken"
  }, {
    de: "der Mantel",
    pron: "dea mán-tel",
    es: "abrigo",
    type: "Sustantivo (Masc)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe einen Mantel. Der Mantel ist warm.",
    exampleSentenceEs: "Tengo un abrigo. El abrigo es cálido.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Mantel", role: "complement", order: 3 }
    ],
    plural: "die Mäntel"
  }, {
    de: "die Jeans",
    pron: "di dshins",
    es: "jeans",
    type: "Sustantivo (Fem)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe die Jeans. Die Jeans ist blau.",
    exampleSentenceEs: "Tengo los jeans. Los jeans son azules.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Jeans", role: "complement", order: 3 }
    ],
    plural: "die Jeans"
  }, {
    de: "die Größe",
    pron: "di gro-se",
    es: "talla",
    type: "Sustantivo (Fem)",
    category: "Eigenschaften",
    exampleSentenceDe: "Ich brauche die Größe.",
    exampleSentenceEs: "Necesito la talla.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Größe", role: "complement", order: 3 }
    ],
    plural: "die Größen"
  }, {
    de: "die Farbe",
    pron: "di fár-be",
    es: "color",
    type: "Sustantivo (Fem)",
    category: "Eigenschaften",
    exampleSentenceDe: "Das ist die Farbe.",
    exampleSentenceEs: "Ese es el color.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Farbe", role: "complement", order: 3 }
    ],
    plural: "die Farben"
  }, {
    de: "schwarz",
    pron: "shvárts",
    es: "negro",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist schwarz.",
    exampleSentenceEs: "El coche es negro.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schwarz", role: "complement", order: 3 }
    ],
    regimen: "≠ weiß"
  }, {
    de: "weiß",
    pron: "vais",
    es: "blanco",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Die Wand ist weiß.",
    exampleSentenceEs: "La pared es blanca.",
    exampleSentenceDeBlocks: [
      { text: "Die Wand", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "weiß", role: "complement", order: 3 }
    ],
    regimen: "≠ schwarz"
  }, {
    de: "grau",
    pron: "gráu",
    es: "gris",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Der Himmel ist grau.",
    exampleSentenceEs: "El cielo es gris.",
    exampleSentenceDeBlocks: [
      { text: "Der Himmel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "grau", role: "complement", order: 3 }
    ],
    regimen: "≠ bunt"
  }, {
    de: "rot",
    pron: "rot",
    es: "rojo",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist rot.",
    exampleSentenceEs: "El coche es rojo.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ],
    regimen: "≠ grün"
  }, {
    de: "blau",
    pron: "bláu",
    es: "azul",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist blau.",
    exampleSentenceEs: "El coche es azul.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "blau", role: "complement", order: 3 }
    ],
    regimen: "≠ bunt"
  }, {
    de: "gelb",
    pron: "guélp",
    es: "amarillo",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Die Sonne ist gelb.",
    exampleSentenceEs: "El sol es amarillo.",
    exampleSentenceDeBlocks: [
      { text: "Die Sonne", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gelb", role: "verb_p2", order: 3 }
    ],
    regimen: "≠ keine feste Gegenfarbe"
  }, {
    de: "grün",
    pron: "grün",
    es: "verde",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist grün.",
    exampleSentenceEs: "El coche es verde.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "grün", role: "complement", order: 3 }
    ],
    regimen: "≠ rot"
  }, {
    de: "braun",
    pron: "bráun",
    es: "marrón",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Der Tisch ist braun.",
    exampleSentenceEs: "La mesa es marrón.",
    exampleSentenceDeBlocks: [
      { text: "Der Tisch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "braun", role: "complement", order: 3 }
    ],
    regimen: "≠ bunt"
  }, {
    de: "anziehen",
    pron: "án-tsi-en",
    es: "ponerse ropa",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich ziehe die Jacke an.",
    exampleSentenceEs: "Me pongo la chaqueta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "die Jacke", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    regimen: "Sep./refl. + Akkusativ"
  }, {
    de: "ausziehen",
    pron: "áus-tsí-en",
    es: "quitarse ropa",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich ziehe den Pullover aus.",
    exampleSentenceEs: "Me quito el jersey.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "den Pullover", role: "complement", order: 3 },
      { text: "aus", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable, +Akk, reflex."
  }, {
    de: "anprobieren",
    pron: "án-pro-bí-ren",
    es: "probarse ropa",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich möchte die Schuhe anprobieren.",
    exampleSentenceEs: "Quiero probarme los zapatos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "die Schuhe", role: "complement", order: 3 },
      { text: "anprobieren", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (an-), +Akk"
  }, {
    de: "passen",
    pron: "pá-sen",
    es: "quedar bien (talla)",
    type: "Verbo (+ Dativo)",
    category: "Aktionen",
    exampleSentenceDe: "Die Hose passt mir gut.",
    exampleSentenceEs: "Los pantalones me quedan bien.",
    exampleSentenceDeBlocks: [
      { text: "Die Hose", role: "subject", order: 1 },
      { text: "passt", role: "verb_p1", order: 2 },
      { text: "mir gut", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "anhaben",
    pron: "án-ja-ben",
    es: "llevar puesto (ropa)",
    type: "Verbo Separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich habe heute einen blauen Pullover an.",
    exampleSentenceEs: "Yo llevo puesto un jersey azul hoy.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "heute einen blauen Pullover", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Akk., Separable (an-)"
  }, {
    de: "eng",
    pron: "eng",
    es: "ajustado",
    type: "Adjetivo",
    category: "Eigenschaften",
    exampleSentenceDe: "Der Rock ist eng.",
    exampleSentenceEs: "La falda es ajustada.",
    exampleSentenceDeBlocks: [
      { text: "Der Rock", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "eng", role: "complement", order: 3 }
    ],
    regimen: "≠ weit"
  }, {
    de: "weit",
    pron: "váit",
    es: "holgado",
    type: "Adjetivo",
    category: "Eigenschaften",
    exampleSentenceDe: "Die Hose ist weit.",
    exampleSentenceEs: "Los pantalones son holgados.",
    exampleSentenceDeBlocks: [
      { text: "Die Hose", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "weit", role: "complement", order: 3 }
    ],
    regimen: "≠ eng"
  }, {
    de: "bequem",
    pron: "be-kvém",
    es: "cómodo",
    type: "Adjetivo",
    category: "Eigenschaften",
    exampleSentenceDe: "Der Stuhl ist bequem.",
    exampleSentenceEs: "La silla es cómoda.",
    exampleSentenceDeBlocks: [
      { text: "Der Stuhl", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "bequem", role: "complement", order: 3 }
    ],
    regimen: "≠ unbequem"
  }, {
    de: "der Schal",
    pron: "dea shal",
    es: "bufanda",
    type: "Sustantivo",
    category: "Accessoires",
    exampleSentenceDe: "Ich habe einen Schal. Der Schal ist rot.",
    exampleSentenceEs: "Tengo una bufanda. La bufanda es roja.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Schal", role: "complement", order: 3 }
    ],
    plural: "die Schals"
  }, {
    de: "der Gürtel",
    pron: "dea gúa-tel",
    es: "cinturón",
    type: "Sustantivo",
    category: "Accessoires",
    exampleSentenceDe: "Ich habe einen Gürtel. Der Gürtel ist braun.",
    exampleSentenceEs: "Tengo un cinturón. El cinturón es marrón.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Gürtel", role: "complement", order: 3 }
    ],
    plural: "die Gürtel"
  },
  {
    de: "orange",
    pron: "o-ran-she",
    es: "naranja",
    type: "Adjetivo",
    category: "Farben",
    en: "a vibrant splash of orange paint",
    exampleSentenceDe: "Meine neue Jacke ist orange.",
    exampleSentenceEs: "Mi nueva chaqueta es naranja.",
    exampleSentenceDeBlocks: [
      { text: "Meine", role: "subject", order: 1 },
      { text: "neue", role: "verb_p1", order: 2 },
      { text: "Jacke ist orange", role: "complement", order: 3 }
    ]
  }, {
        de: "rosa",
    pron: "ro-sa",
    es: "rosa",
    type: "Adjetivo",
    category: "Farben",
    en: "a vibrant splash of pink paint",
    exampleSentenceDe: "Das Mädchen trägt ein rosa Kleid.",
    exampleSentenceEs: "La niña lleva un vestido rosa.",
    exampleSentenceDeBlocks: [
      { text: "Das Mädchen", role: "subject", order: 1 },
      { text: "trägt", role: "verb_p1", order: 2 },
      { text: "ein rosa Kleid", role: "complement", order: 3 }
    ]
  }, {
        de: "lila",
    pron: "li-la",
    es: "morado / lila",
    type: "Adjetivo",
    category: "Farben",
    en: "a vibrant splash of purple paint",
    exampleSentenceDe: "Die Blumen im Garten sind lila.",
    exampleSentenceEs: "Las flores en el jardín son moradas.",
    exampleSentenceDeBlocks: [
      { text: "Die Blumen im Garten", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "lila", role: "complement", order: 3 }
    ]
  },
  {
    "de": "der Anzug",
    "pron": "dea án-tsuk",
    "es": "el traje (chaqueta y pantalón)",
    "type": "Sustantivo (Masc)",
    "category": "Kleidung",
    "level": "A2–B1",
    "plural": "die Anzüge",
    "en": "tailored dark navy business suit jacket and trousers on hanger",
    "exampleSentenceDe": "Für das Vorstellungsgespräch trage ich einen Anzug.",
    "exampleSentenceEs": "Para la entrevista de trabajo llevo un traje.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für das Vorstellungsgespräch",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trage",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich einen Anzug",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Bikini",
    "pron": "dea bi-kí-ni",
    "es": "el bikini",
    "type": "Sustantivo (Masc)",
    "category": "Kleidung",
    "level": "B1",
    "plural": "die Bikinis",
    "en": "bright coral two-piece summer bikini swimsuit",
    "exampleSentenceDe": "Im Urlaub packe ich meinen Bikini ein.",
    "exampleSentenceEs": "En vacaciones guardo mi bikini en la maleta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Urlaub",
        "role": "subject",
        "order": 1
      },
      {
        "text": "packe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich meinen Bikini",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ein",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Kleid",
    "pron": "das klait",
    "es": "el vestido",
    "type": "Sustantivo (Neutro)",
    "category": "Kleidung",
    "level": "A1–A2",
    "plural": "die Kleider",
    "en": "classic blue summer dress on a wooden hanger",
    "exampleSentenceDe": "Das blaue Kleid steht ihr ausgezeichnet.",
    "exampleSentenceEs": "El vestido azul le sienta de maravilla.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das blaue Kleid",
        "role": "subject",
        "order": 1
      },
      {
        "text": "steht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ihr ausgezeichnet",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Pyjama",
    "pron": "dea pü-yá-ma",
    "es": "el pijama",
    "type": "Sustantivo (Masc)",
    "category": "Kleidung",
    "level": "A1",
    "plural": "die Pyjamas",
    "en": "folded striped cotton pajama top and trousers",
    "exampleSentenceDe": "Für meine Reise brauche ich noch einen Pyjama.",
    "exampleSentenceEs": "Para mi viaje necesito además un pijama.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für meine Reise",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich noch einen Pyjama",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Schirm",
    "pron": "dea shirm",
    "es": "el paraguas",
    "type": "Sustantivo (Masc)",
    "category": "Accessoires",
    "level": "A1",
    "plural": "die Schirme",
    "en": "open blue rain umbrella with curved wooden handle",
    "exampleSentenceDe": "Es regnet heute, nimm bitte einen Schirm mit!",
    "exampleSentenceEs": "Hoy llueve, ¡llévate un paraguas por favor!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Es",
        "role": "subject",
        "order": 1
      },
      {
        "text": "regnet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute, nimm bitte einen Schirm",
        "role": "complement",
        "order": 3
      },
      {
        "text": "mit",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Socken",
    "pron": "di zó-ken",
    "es": "los calcetines",
    "type": "Sustantivo (Plural)",
    "category": "Kleidung",
    "level": "A1",
    "regimen": "Sg: die Socke",
    "en": "pair of cozy striped knitted cotton socks",
    "exampleSentenceDe": "Ich packe fünf Paar Socken in die Tasche.",
    "exampleSentenceEs": "Meto cinco pares de calcetines en el bolso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "packe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fünf Paar Socken in die Tasche",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das T-Shirt",
    "pron": "das tí-shört",
    "es": "la camiseta",
    "type": "Sustantivo (Neutro)",
    "category": "Kleidung",
    "level": "B1",
    "plural": "die T-Shirts",
    "en": "clean casual blue cotton short-sleeve t-shirt",
    "exampleSentenceDe": "Im Sommer trage ich am liebsten ein T-Shirt.",
    "exampleSentenceEs": "En verano llevo preferiblemente una camiseta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Sommer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trage",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich am liebsten ein T-Shirt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Bluse",
    "pron": "di blú-ze",
    "es": "la blusa",
    "type": "Sustantivo (Fem)",
    "category": "Kleidung",
    "level": "A1–B1",
    "plural": "die Blusen",
    "en": "crisp white collared women's button-up blouse on a wooden hanger",
    "exampleSentenceDe": "Ich hätte gerne diese weiße Bluse in Größe 38.",
    "exampleSentenceEs": "Quisiera esta blusa blanca en la talla 38.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hätte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gerne diese weiße Bluse in Größe 38",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Frisur",
    "pron": "di fri-zúr",
    "es": "el peinado / corte de pelo",
    "type": "Sustantivo (Fem)",
    "category": "Kleidung",
    "level": "B1",
    "plural": "die Frisuren",
    "en": "cute 3D avatar head showing a neat styled brown haircut",
    "exampleSentenceDe": "Du hast eine tolle neue Frisur! Warst du beim Friseur?",
    "exampleSentenceEs": "¡Tienes un peinado nuevo estupendo! ¿Fuiste a la peluquería?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Du",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hast",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine tolle neue Frisur!",
        "role": "complement",
        "order": 3
      },
      {
        "text": "Warst",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "du",
        "role": "subject",
        "order": 5
      },
      {
        "text": "beim Friseur",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "die Kette",
    "pron": "di ké-te",
    "es": "la cadena / collar",
    "type": "Sustantivo (Fem)",
    "category": "Accessoires",
    "level": "B1",
    "plural": "die Ketten",
    "en": "delicate shiny gold chain necklace with small clasp",
    "exampleSentenceDe": "Sie trägt eine dünne Kette aus Gold um den Hals.",
    "exampleSentenceEs": "Ella lleva una fina cadena de oro al cuello.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trägt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine dünne Kette aus Gold um den Hals",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mode",
    "pron": "di mó-de",
    "es": "la moda",
    "type": "Sustantivo (Fem)",
    "category": "Kleidung",
    "level": "A2–B1",
    "plural": "die Moden",
    "exampleSentenceDe": "Diese Farbe ist diesen Sommer sehr in Mode.",
    "exampleSentenceEs": "Este color está muy de moda este verano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Diese Farbe",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "diesen Sommer sehr in Mode",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Portemonnaie / Portmonee",
    "pron": "das port-mo-né",
    "es": "el monedero",
    "type": "Sustantivo (Neutro)",
    "category": "Accessoires",
    "level": "B1",
    "plural": "die Portemonnaies",
    "en": "compact brown leather folding wallet and coin purse",
    "exampleSentenceDe": "Mein ganzes Kleingeld ist im Portemonnaie.",
    "exampleSentenceEs": "Toda mi calderilla está en el monedero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein ganzes Kleingeld",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Portemonnaie",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Ring",
    "pron": "dea ring",
    "es": "el anillo",
    "type": "Sustantivo (Masc)",
    "category": "Accessoires",
    "level": "B1",
    "plural": "die Ringe",
    "en": "polished shiny gold band ring",
    "exampleSentenceDe": "Zur Verlobung schenkte er ihr einen goldenen Ring.",
    "exampleSentenceEs": "Por el compromiso él le regaló un anillo de oro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zur Verlobung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schenkte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "er",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ihr einen goldenen Ring",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Stiefel",
    "pron": "dea shtí-fel",
    "es": "la bota",
    "type": "Sustantivo (Masc)",
    "category": "Kleidung",
    "level": "A1",
    "plural": "die Stiefel",
    "en": "a cute 3D isometric UI icon of a sturdy brown leather winter boot",
    "exampleSentenceDe": "Ich habe mir für den kalten Winter warme Stiefel gekauft.",
    "exampleSentenceEs": "Me he comprado botas abrigadas para el frío invierno.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir für den kalten Winter warme Stiefel",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gekauft",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Strumpf",
    "pron": "dea shtrumf",
    "es": "la media / calcetín largo",
    "type": "Sustantivo (Masc)",
    "category": "Kleidung",
    "level": "A2",
    "plural": "die Strümpfe",
    "en": "a cute 3D isometric UI icon of a cozy red knitted knee-high sock",
    "exampleSentenceDe": "Wo im Schrank sind meine neuen roten Strümpfe?",
    "exampleSentenceEs": "¿Dónde en el armario están mis nuevas medias rojas?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wo im Schrank",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meine neuen roten Strümpfe",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "die Wolle",
    "pron": "di vó-le",
    "es": "la lana",
    "type": "Sustantivo (Fem)",
    "category": "Material",
    "level": "A2–B1",
    "regimen": "Singular",
    "en": "a cute 3D isometric UI icon of a soft round ball of cream knitting wool yarn",
    "exampleSentenceDe": "Dieser warme Winterpullover ist aus reiner Wolle.",
    "exampleSentenceEs": "Este abrigado jersey de invierno es de pura lana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieser warme Winterpullover",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aus reiner Wolle",
        "role": "complement",
        "order": 3
      }
    ]
  }
]
},
{
  id: 10,
  title: "Kapitel 10: Einkaufen",
  icon: <ShoppingCart size={20} />,
  emoji: "🛒",
  words: [{
    de: "das Geschäft",
    pron: "das gue-shéft",
    es: "tienda / negocio",
    type: "Sustantivo",
    category: "Orte",
    exampleSentenceDe: "Das Geschäft ist klein.",
    exampleSentenceEs: "La tienda es pequeña.",
    exampleSentenceDeBlocks: [
      { text: "Das Geschäft", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "klein", role: "complement", order: 3 }
    ],
    plural: "die Geschäfte"
  }, {
    de: "der Laden",
    pron: "dea lá-den",
    es: "tienda pequeña",
    type: "Sustantivo",
    category: "Orte",
    exampleSentenceDe: "Ich gehe in den Laden.",
    exampleSentenceEs: "Voy a la tienda.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "in den Laden", role: "complement", order: 3 }
    ],
    plural: "die Läden"
  }, {
    de: "die Bäckerei",
    pron: "di bé-ke-rái",
    es: "panadería",
    type: "Sustantivo (Fem)",
    category: "Orte",
    exampleSentenceDe: "Ich gehe zur Bäckerei.",
    exampleSentenceEs: "Voy a la panadería.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "zur Bäckerei", role: "complement", order: 3 }
    ],
    plural: "die Bäckereien"
  }, {
    de: "der Supermarkt",
    pron: "dea sú-pea-markt",
    es: "supermercado",
    type: "Sustantivo (Masc)",
    category: "Orte",
    exampleSentenceDe: "Ich gehe in den Supermarkt.",
    exampleSentenceEs: "Voy al supermercado.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "in den Supermarkt", role: "complement", order: 3 }
    ],
    plural: "die Supermärkte"
  }, {
    de: "geöffnet",
    pron: "gue-óf-net",
    es: "abierto",
    type: "Adjetivo",
    category: "Status",
    exampleSentenceDe: "Das Geschäft ist geöffnet.",
    exampleSentenceEs: "La tienda está abierta.",
    exampleSentenceDeBlocks: [
      { text: "Das Geschäft", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "geöffnet", role: "verb_p2", order: 3 }
    ],
    regimen: "≠ geschlossen"
  }, {
    de: "das Angebot",
    pron: "das án-gue-bot",
    es: "oferta",
    type: "Sustantivo (Neutro)",
    category: "Preis",
    exampleSentenceDe: "Das ist ein gutes Angebot.",
    exampleSentenceEs: "Esta es una buena oferta.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein gutes Angebot", role: "complement", order: 3 }
    ],
    plural: "die Angebote"
  }, {
    de: "günstig",
    pron: "gúns-tij",
    es: "económico",
    type: "Adjetivo",
    category: "Preis",
    exampleSentenceDe: "Das Hotel ist günstig.",
    exampleSentenceEs: "El hotel es económico.",
    exampleSentenceDeBlocks: [
      { text: "Das Hotel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "günstig", role: "complement", order: 3 }
    ],
    regimen: "≠ teuer"
  }, {
    de: "billig",
    pron: "bí-lij",
    es: "barato",
    type: "Adjetivo",
    category: "Preis",
    exampleSentenceDe: "Das Brot ist billig.",
    exampleSentenceEs: "El pan es barato.",
    exampleSentenceDeBlocks: [
      { text: "Das Brot", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "billig", role: "complement", order: 3 }
    ],
    regimen: "≠ teuer"
  }, {
    de: "teuer",
    pron: "tói-a",
    es: "caro",
    type: "Adjetivo",
    category: "Preis",
    exampleSentenceDe: "Das ist teuer.",
    exampleSentenceEs: "Esto es caro.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "teuer", role: "complement", order: 3 }
    ],
    regimen: "≠ billig"
  }, {
    de: "brauchen",
    pron: "bráu-jen",
    es: "necesitar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich brauche Wasser.",
    exampleSentenceEs: "Yo necesito agua.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "Wasser", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "das Kilo",
    pron: "das kí-lo",
    es: "kilo",
    type: "Sustantivo",
    category: "Menge",
    exampleSentenceDe: "Ich kaufe ein Kilo Äpfel.",
    exampleSentenceEs: "Compro un kilo de manzanas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kaufe", role: "verb_p1", order: 2 },
      { text: "ein Kilo Äpfel", role: "complement", order: 3 }
    ],
    plural: "die Kilo"
  }, {
    de: "das Pfund",
    pron: "das pfunt",
    es: "libra (500g)",
    type: "Sustantivo",
    category: "Menge",
    exampleSentenceDe: "Ich kaufe ein Pfund Brot.",
    exampleSentenceEs: "Compro una libra de pan.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kaufe", role: "verb_p1", order: 2 },
      { text: "ein Pfund Brot", role: "complement", order: 3 }
    ],
    plural: "die Pfund"
  }, {
    de: "das Gramm",
    pron: "das gram",
    es: "gramo",
    type: "Sustantivo",
    category: "Menge",
    exampleSentenceDe: "Ich brauche das Gramm Zucker.",
    exampleSentenceEs: "Necesito el gramo de azúcar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "das Gramm Zucker", role: "complement", order: 3 }
    ],
    plural: "die Gramm"
  }, {
    de: "kosten",
    pron: "kós-ten",
    es: "costar",
    type: "Verbo",
    category: "Preis",
    exampleSentenceDe: "Was kostet das Brot?",
    exampleSentenceEs: "¿Cuánto cuesta el pan?",
    exampleSentenceDeBlocks: [
      { text: "Was", role: "subject", order: 1 },
      { text: "kostet", role: "verb_p1", order: 2 },
      { text: "das Brot", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "der Preis",
    pron: "dea práis",
    es: "precio",
    type: "Sustantivo",
    category: "Preis",
    exampleSentenceDe: "Der Preis ist hoch.",
    exampleSentenceEs: "El precio es alto.",
    exampleSentenceDeBlocks: [
      { text: "Der Preis", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hoch", role: "complement", order: 3 }
    ],
    plural: "die Preise"
  }, {
    de: "die Kasse",
    pron: "di ká-se",
    es: "caja",
    type: "Sustantivo (Fem)",
    category: "Bezahlen",
    exampleSentenceDe: "Wo ist die Kasse, bitte?",
    exampleSentenceEs: "¿Dónde está la caja, por favor?",
    exampleSentenceDeBlocks: [
      { text: "Wo", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Kasse, bitte", role: "complement", order: 3 }
    ],
    plural: "die Kassen"
  }, {
    de: "das Geld",
    pron: "das guelt",
    es: "dinero",
    type: "Sustantivo",
    category: "Bezahlen",
    exampleSentenceDe: "Das ist das Geld.",
    exampleSentenceEs: "Este es el dinero.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das Geld", role: "complement", order: 3 }
    ],
    plural: "die Gelder"
  }, {
    de: "der Verkäufer",
    pron: "dea fea-kói-fea",
    es: "vendedor",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Der Verkäufer ist nett.",
    exampleSentenceEs: "El vendedor es simpático.",
    exampleSentenceDeBlocks: [
      { text: "Der Verkäufer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nett", role: "complement", order: 3 }
    ],
    plural: "die Verkäufer"
  }, {
    de: "bestellen",
    pron: "be-shté-len",
    es: "pedir (online)",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich bestelle Pizza.",
    exampleSentenceEs: "Yo pido pizza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bestelle", role: "verb_p1", order: 2 },
      { text: "Pizza", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "die Überweisung",
    pron: "di ǘ-bea-vái-sung",
    es: "transferencia",
    type: "Sustantivo",
    category: "Bezahlen",
    exampleSentenceDe: "Ich mache die Überweisung.",
    exampleSentenceEs: "Hago la transferencia.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "die Überweisung", role: "complement", order: 3 }
    ],
    plural: "die Überweisungen"
  }, {
    de: "das Wechselgeld",
    pron: "das vék-sel-guelt",
    es: "el cambio / vueltas",
    type: "Sustantivo",
    category: "Bezahlen",
    exampleSentenceDe: "Ich brauche das Wechselgeld nicht.",
    exampleSentenceEs: "No necesito el cambio.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "das Wechselgeld nicht", role: "complement", order: 3 }
    ],
    plural: "die Wechselgelder"
  }, {
    de: "umtauschen",
    pron: "úm-táu-shen",
    es: "cambiar (artículo)",
    type: "Verbo Separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich möchte das T-Shirt umtauschen.",
    exampleSentenceEs: "Yo quisiera cambiar la camiseta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "das T-Shirt", role: "complement", order: 3 },
      { text: "umtauschen", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (um-) + Akk."
  }, {
    de: "der Rabatt",
    pron: "dea ra-bát",
    es: "descuento",
    type: "Sustantivo",
    category: "Preis",
    exampleSentenceDe: "Ich sehe den Rabatt. Der Rabatt ist gut.",
    exampleSentenceEs: "Veo el descuento. El descuento es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "den Rabatt", role: "complement", order: 3 }
    ],
    plural: "die Rabatte"
  },
  {
    de: "einkaufen",
    pron: "áin-kau-fen",
    es: "ir de compras",
    type: "Verbo",
    category: "Einkaufen",
    regimen: "Separable (ein-) / + Akkusativ",
    exampleSentenceDe: "Ich kaufe im Supermarkt ein.",
    exampleSentenceEs: "Compro en el supermercado.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kaufe", role: "verb_p1", order: 2 },
      { text: "im Supermarkt", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "verkaufen",
    pron: "fea-káo-fen",
    es: "vender",
    type: "Verbo",
    category: "Einkaufen",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "Er verkauft sein altes Auto.",
    exampleSentenceEs: "Él vende su coche viejo.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "verkauft", role: "verb_p1", order: 2 },
      { text: "sein altes Auto", role: "complement", order: 3 }
    ]
  },
    {
      de: "der Pfand",
      pron: "dea pfant",
      es: "depósito retornable de envases",
      type: "Sustantivo (Masc/Neut)",
      category: "Supermarkt",
      regimen: "-",
      plural: "die Pfänder",
      exampleSentenceDe: "Vergiss nicht, die Flaschen mit Pfand abzugeben.",
      exampleSentenceEs: "No olvides devolver las botellas con depósito.",
    exampleSentenceDeBlocks: [
      { text: "Vergiss", role: "subject", order: 1 },
      { text: "nicht,", role: "verb_p1", order: 2 },
      { text: "die Flaschen mit Pfand abzugeben", role: "complement", order: 3 }
    ],
      en: "reverse vending bottle return machine with recycle logo"
    },
    {
      de: "der Kassenzettel",
      pron: "dea ká-sen-tse-tel",
      es: "tique de compra / recibo",
      type: "Sustantivo (Masc)",
      category: "Bezahlen",
      regimen: "-",
      plural: "die Kassenzettel",
      exampleSentenceDe: "Brauchen Sie den Kassenzettel für die Garantie?",
      exampleSentenceEs: "¿Necesita el tique de compra para la garantía?",
    exampleSentenceDeBlocks: [
      { text: "Brauchen", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "den Kassenzettel für die Garantie", role: "complement", order: 3 }
    ],
      en: "printed supermarket paper cash register receipt"
    },
    {
      de: "die Quittung",
      pron: "di kví-tung",
      es: "comprobante de pago firmado",
      type: "Sustantivo (Fem)",
      category: "Bezahlen",
      regimen: "-",
      plural: "die Quittungen",
      exampleSentenceDe: "Bitte geben Sie mir eine Quittung über den Betrag.",
      exampleSentenceEs: "Por favor, entrégueme un comprobante de pago por el importe.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "geben", role: "verb_p1", order: 2 },
      { text: "Sie mir eine Quittung über den Betrag", role: "complement", order: 3 }
    ],
      en: "signed formal payment receipt slip with stamp"
    },
    {
      de: "der Einkaufswagen",
      pron: "dea áin-kaufs-vá-guen",
      es: "carrito de compras",
      type: "Sustantivo (Masc)",
      category: "Supermarkt",
      regimen: "-",
      plural: "die Einkaufswagen",
      exampleSentenceDe: "Für den Einkaufswagen brauche ich eine Ein-Euro-Münze.",
      exampleSentenceEs: "Para el carrito de compras necesito una moneda de un euro.",
    exampleSentenceDeBlocks: [
      { text: "Für den Einkaufswagen", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "ich eine Ein-Euro-Münze", role: "complement", order: 3 }
    ],
      en: "metal supermarket grocery shopping cart trolley"
    },
    {
      de: "kostenlos / gratis",
      pron: "kós-ten-los / grá-tis",
      es: "gratuito / sin coste",
      type: "Adjetivo",
      category: "Preis",
      regimen: "-",
      plural: "-",
      exampleSentenceDe: "Der WLAN-Zugang am Bahnhof ist kostenlos.",
      exampleSentenceEs: "El acceso a internet wifi en la estación es gratuito.",
    exampleSentenceDeBlocks: [
      { text: "Der WLAN-Zugang am Bahnhof", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "kostenlos", role: "complement", order: 3 }
    ],
      en: "green badge tag with zero euro free gift sign"
    },
    {
      de: "sparen",
      pron: "shpá-ren",
      es: "ahorrar",
      type: "Verbo",
      category: "Bezahlen",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich möchte Geld für einen Urlaub sparen.",
      exampleSentenceEs: "Quiero ahorrar dinero para unas vacaciones.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "Geld für einen Urlaub", role: "complement", order: 3 },
      { text: "sparen", role: "verb_p2", order: 4 }
    ],
      en: "putting gold euro coin into cute pink piggy bank"
    },
    {
      de: "aus|geben",
      pron: "áus-gué-ben",
      es: "gastar (dinero)",
      type: "Verbo separable",
      category: "Bezahlen",
      regimen: "Separable (aus-) / für + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Er gibt zu viel Geld für Kleidung aus.",
      exampleSentenceEs: "Él gasta demasiado dinero en ropa.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "gibt", role: "verb_p1", order: 2 },
      { text: "zu viel Geld für Kleidung", role: "complement", order: 3 },
      { text: "aus", role: "verb_p2", order: 4 }
    ],
      en: "spending euro paper banknotes at shopping counter"
    },
    {
      de: "ein|packen",
      pron: "áin-pá-ken",
      es: "empacar / envolver",
      type: "Verbo separable",
      category: "Aktionen",
      regimen: "Separable (ein-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich packe meinen Koffer für die Reise ein.",
      exampleSentenceEs: "Empaco mi maleta para el viaje.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "packe", role: "verb_p1", order: 2 },
      { text: "meinen Koffer für die Reise", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
      en: "folding clothes neatly packing into travel suitcase"
    },
  {
    "de": "das Abo / Abonnement",
    "pron": "das á-bo / a-bo-ne-mó",
    "es": "la suscripción / abono",
    "type": "Sustantivo (Neutro)",
    "category": "Konsum",
    "level": "B1",
    "plural": "die Abos / Abonnements",
    "exampleSentenceDe": "Ich habe ein monatliches Abo für die Bahn.",
    "exampleSentenceEs": "Tengo un abono mensual para el tren.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein monatliches Abo für die Bahn",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "abonnieren",
    "pron": "a-bo-ní-ren",
    "es": "suscribirse",
    "type": "Verbo (-ieren)",
    "category": "Konsum",
    "level": "B1",
    "regimen": "+ Akkusativ / abonniert, hat abonniert",
    "exampleSentenceDe": "Möchten Sie unseren Newsletter abonnieren?",
    "exampleSentenceEs": "¿Desea suscribirse a nuestro boletín?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Möchten",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "unseren Newsletter",
        "role": "complement",
        "order": 3
      },
      {
        "text": "abonnieren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "an|schaffen",
    "pron": "án-sha-fen",
    "es": "adquirir / comprar",
    "type": "Verbo separable",
    "category": "Konsum",
    "level": "B1",
    "regimen": "+ Akk / schafft an, hat angeschafft",
    "exampleSentenceDe": "Wir müssen eine neue Waschmaschine anschaffen.",
    "exampleSentenceEs": "Tenemos que adquirir una lavadora nueva.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine neue Waschmaschine",
        "role": "complement",
        "order": 3
      },
      {
        "text": "anschaffen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Blumenladen",
    "pron": "dea blú-men-la-den",
    "es": "la floristería",
    "type": "Sustantivo (Masc)",
    "category": "Geschäfte",
    "level": "A2",
    "plural": "die Blumenläden",
    "en": "cozy corner flower shop storefront filled with colorful bouquets",
    "exampleSentenceDe": "Im Erdgeschoss gibt es einen schönen Blumenladen.",
    "exampleSentenceEs": "En la planta baja hay una bonita floristería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Erdgeschoss",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es einen schönen Blumenladen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Drogerie",
    "pron": "di dro-gue-rí",
    "es": "la droguería / perfumería",
    "type": "Sustantivo (Fem)",
    "category": "Geschäfte",
    "level": "B1",
    "plural": "die Drogerien",
    "en": "modern drugstore storefront with soap bottles and cosmetics shelves",
    "exampleSentenceDe": "Zahnpasta und Seife kaufe ich in der Drogerie.",
    "exampleSentenceEs": "Compro pasta de dientes y jabón en la droguería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zahnpasta und Seife",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich in der Drogerie",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Fotoservice",
    "pron": "dea fó-to-sör-vis",
    "es": "el servicio de fotografía",
    "type": "Sustantivo (Masc)",
    "category": "Geschäfte",
    "level": "A2",
    "plural": "die Fotoservices",
    "en": "photo printing kiosk shop counter with camera and portrait prints",
    "exampleSentenceDe": "Beim Fotoservice kann ich Passbilder machen lassen.",
    "exampleSentenceEs": "En el servicio de fotos puedo hacerme fotos de pasaporte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Beim Fotoservice",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich Passbilder",
        "role": "complement",
        "order": 3
      },
      {
        "text": "machen lassen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Geldschein",
    "pron": "dea guélt-shain",
    "es": "el billete (dinero)",
    "type": "Sustantivo (Masc)",
    "category": "Geld",
    "level": "A1",
    "plural": "die Geldscheine",
    "en": "crisp colorful Euro paper banknote bill",
    "exampleSentenceDe": "An diesem Automaten kann man mit Geldscheinen zahlen.",
    "exampleSentenceEs": "En esta máquina se puede pagar con billetes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An diesem Automaten",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man mit Geldscheinen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zahlen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Glückwunschkarte",
    "pron": "di glǘk-vunsh-kar-te",
    "es": "la tarjeta de felicitación",
    "type": "Sustantivo (Fem)",
    "category": "Geschäfte",
    "level": "A2",
    "plural": "die Glückwunschkarten",
    "en": "festive folded greeting card with ribbon and envelope",
    "exampleSentenceDe": "Ich kaufe eine Glückwunschkarte zur Hochzeit.",
    "exampleSentenceEs": "Compro una tarjeta de felicitación para la boda.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Glückwunschkarte zur Hochzeit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Handel",
    "pron": "dea ján-del",
    "es": "el comercio",
    "type": "Sustantivo (Masc)",
    "category": "Konsum",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Der Online-Handel wächst jedes Jahr stark.",
    "exampleSentenceEs": "El comercio en línea crece con fuerza cada año.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Online-Handel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "wächst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "jedes Jahr stark",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Händler / die Händlerin",
    "pron": "dea jénd-la / di jénd-le-rin",
    "es": "el comerciante / vendedor",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Geschäfte",
    "level": "B1",
    "plural": "die Händler / die Händlerinnen",
    "en": "friendly market vendor standing behind a fresh vegetable stall",
    "exampleSentenceDe": "Auf dem Markt kaufe ich Gemüse beim Händler.",
    "exampleSentenceEs": "En el mercado compro verdura al comerciante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dem Markt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich Gemüse beim Händler",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "liefern",
    "pron": "lí-fern",
    "es": "entregar / repartir",
    "type": "Verbo regular",
    "category": "Konsum",
    "level": "B1",
    "regimen": "+ Akkusativ / liefert, lieferte, hat geliefert",
    "en": "delivery courier carrying a cardboard parcel box to a front door",
    "exampleSentenceDe": "Die Firma liefert die Möbel nächste Woche.",
    "exampleSentenceEs": "La empresa entrega los muebles la próxima semana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liefert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Möbel nächste Woche",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Lieferung",
    "pron": "di lí-fe-rung",
    "es": "la entrega / envío",
    "type": "Sustantivo (Fem)",
    "category": "Konsum",
    "level": "B1",
    "plural": "die Lieferungen",
    "exampleSentenceDe": "Die Lieferung kommt heute zwischen zehn und zwölf Uhr.",
    "exampleSentenceEs": "El envío llega hoy entre las diez y las doce.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Lieferung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute zwischen zehn und zwölf Uhr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Münze",
    "pron": "di mǘn-tse",
    "es": "la moneda",
    "type": "Sustantivo (Fem)",
    "category": "Geld",
    "level": "A1",
    "plural": "die Münzen",
    "en": "shiny silver and gold two-euro metal coin",
    "exampleSentenceDe": "Haben Sie eine Zwei-Euro-Münze für den Wagen?",
    "exampleSentenceEs": "¿Tiene una moneda de dos euros para el carro?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Haben",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "eine Zwei-Euro-Münze für den Wagen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Schlüsseldienst",
    "pron": "dea shlǘ-sel-dinst",
    "es": "el servicio de cerrajería",
    "type": "Sustantivo (Masc)",
    "category": "Geschäfte",
    "level": "A2",
    "plural": "die Schlüsseldienste",
    "en": "locksmith shop counter with brass spare keys and padlock",
    "exampleSentenceDe": "Der Schlüsseldienst öffnet die Tür schnell.",
    "exampleSentenceEs": "El cerrajero abre la puerta rápido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Schlüsseldienst",
        "role": "subject",
        "order": 1
      },
      {
        "text": "öffnet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Tür schnell",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Schuhwerkstatt",
    "pron": "di shú-verk-shtat",
    "es": "el zapatero (reparación)",
    "type": "Sustantivo (Fem)",
    "category": "Geschäfte",
    "level": "A2",
    "plural": "die Schuhwerkstätten",
    "en": "cobbler shoe repair workshop with leather shoes and hammer",
    "exampleSentenceDe": "Ich bringe meine alten Schuhe zur Schuhwerkstatt.",
    "exampleSentenceEs": "Llevo mis zapatos viejos al taller de reparación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bringe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meine alten Schuhe zur Schuhwerkstatt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Tabak",
    "pron": "dea tá-bak",
    "es": "el tabaco / estanco",
    "type": "Sustantivo (Masc)",
    "category": "Geschäfte",
    "level": "A2",
    "regimen": "Singular",
    "en": "dried brown tobacco leaves and small retail pouch",
    "exampleSentenceDe": "Zeitungen und Tabak verkauft man am Kiosk.",
    "exampleSentenceEs": "Los periódicos y el tabaco se venden en el quiosco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zeitungen und Tabak",
        "role": "subject",
        "order": 1
      },
      {
        "text": "verkauft",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man am Kiosk",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Trend",
    "pron": "dea trent",
    "es": "la tendencia / moda",
    "type": "Sustantivo (Masc)",
    "category": "Konsum",
    "level": "B1",
    "plural": "die Trends",
    "exampleSentenceDe": "Nachhaltige Mode ist heute ein großer Trend.",
    "exampleSentenceEs": "La moda sostenible es hoy una gran tendencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nachhaltige Mode",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute ein großer Trend",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bar",
    "pron": "bar",
    "es": "en efectivo",
    "type": "Adjetivo / Adverbio",
    "category": "Bezahlen",
    "level": "A1–B1",
    "regimen": "bar zahlen",
    "exampleSentenceDe": "Zahlen Sie lieber bar oder mit Ihrer ec-Karte?",
    "exampleSentenceEs": "¿Paga preferiblemente en efectivo o con tarjeta?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zahlen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "lieber bar oder mit Ihrer ec-Karte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Bargeld",
    "pron": "das bár-guelt",
    "es": "el dinero en efectivo",
    "type": "Sustantivo (Neutro)",
    "category": "Bezahlen",
    "level": "A2–B1",
    "regimen": "Singular",
    "en": "crisp euro paper banknotes stacked beside shiny metallic coins",
    "exampleSentenceDe": "Ich muss noch schnell Bargeld am Automaten abheben.",
    "exampleSentenceEs": "Tengo que sacar rápido efectivo en el cajero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch schnell Bargeld am Automaten",
        "role": "complement",
        "order": 3
      },
      {
        "text": "abheben",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Beleg",
    "pron": "dea be-lék",
    "es": "el comprobante / recibo",
    "type": "Sustantivo (Masc)",
    "category": "Bezahlen",
    "level": "B1",
    "plural": "die Belege",
    "en": "printed white paper store purchase receipt slip",
    "exampleSentenceDe": "Brauchen Sie einen Beleg für Ihre Steuererklärung?",
    "exampleSentenceEs": "¿Necesita un comprobante para su declaración de impuestos?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Brauchen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "einen Beleg für Ihre Steuererklärung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Brieftasche",
    "pron": "di bríf-ta-she",
    "es": "la cartera / billetera",
    "type": "Sustantivo (Fem)",
    "category": "Geld",
    "level": "B1",
    "plural": "die Brieftaschen (A: Geldbörse)",
    "en": "folded dark brown leather wallet holding paper euro banknotes",
    "exampleSentenceDe": "Ich habe nur noch Kleingeld in meiner Brieftasche.",
    "exampleSentenceEs": "Solo tengo suelto en mi billetera.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "habe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nur noch Kleingeld in meiner Brieftasche",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Buchhandlung",
    "pron": "di búj-jant-lung",
    "es": "la librería",
    "type": "Sustantivo (Fem)",
    "category": "Geschäfte",
    "level": "A2–B1",
    "plural": "die Buchhandlungen",
    "en": "cozy bookstore shopfront with wooden shelves filled with colorful books",
    "exampleSentenceDe": "Das Wörterbuch bekommen Sie in jeder Buchhandlung.",
    "exampleSentenceEs": "El diccionario lo consigue en cualquier librería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Wörterbuch",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bekommen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in jeder Buchhandlung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Ermäßigung",
    "pron": "di ea-mé-si-gung",
    "es": "el descuento / rebaja",
    "type": "Sustantivo (Fem)",
    "category": "Preis",
    "level": "B1",
    "plural": "die Ermäßigungen",
    "exampleSentenceDe": "Für Schüler und Studenten gibt es eine Ermäßigung.",
    "exampleSentenceEs": "Para escolares y universitarios hay un descuento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für Schüler und Studenten",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Ermäßigung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Kiosk",
    "pron": "dea kí-osk",
    "es": "el quiosco",
    "type": "Sustantivo (Masc)",
    "category": "Geschäfte",
    "level": "A2",
    "plural": "die Kioske",
    "en": "small colorful street corner kiosk booth with newspapers and drinks",
    "exampleSentenceDe": "Die Zeitung kaufe ich morgens schnell am Kiosk.",
    "exampleSentenceEs": "Compro el periódico rápido por la mañana en el quiosco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Zeitung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "morgens schnell am Kiosk",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "konsumieren",
    "pron": "kon-zu-mí-ren",
    "es": "consumir",
    "type": "Verbo (-ieren)",
    "category": "Konsum",
    "level": "B1",
    "regimen": "+ Akk / konsumiert, hat konsumiert",
    "exampleSentenceDe": "Wir konsumieren heute viel mehr Energie als früher.",
    "exampleSentenceEs": "Consumimos hoy mucha más energía que antes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "konsumieren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute viel mehr Energie als früher",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Modell",
    "pron": "das mo-dél",
    "es": "el modelo / tipo (vehículo/ropa)",
    "type": "Sustantivo (Neutro)",
    "category": "Konsum",
    "level": "A2–B1",
    "plural": "die Modelle",
    "exampleSentenceDe": "Dieses neue Modell gefällt mir besser als das alte.",
    "exampleSentenceEs": "Este modelo nuevo me gusta más que el viejo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses neue Modell",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gefällt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mir besser als das alte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "produzieren",
    "pron": "pro-du-tsí-ren",
    "es": "producir",
    "type": "Verbo (-ieren)",
    "category": "Konsum",
    "level": "B1",
    "regimen": "+ Akk / produziert, hat produziert",
    "exampleSentenceDe": "Die Firma produziert nun auch in Deutschland.",
    "exampleSentenceEs": "La empresa produce ahora también en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "produziert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nun auch in Deutschland",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Qualität",
    "pron": "di kva-li-tét",
    "es": "la calidad",
    "type": "Sustantivo (Fem)",
    "category": "Preis",
    "level": "B1",
    "plural": "die Qualitäten",
    "exampleSentenceDe": "Für mich ist nicht nur der Preis wichtig, sondern auch die Qualität.",
    "exampleSentenceEs": "Para mí no solo es importante el precio, sino también la calidad.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für mich",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nicht nur der Preis",
        "role": "subject",
        "order": 3
      },
      {
        "text": "wichtig, sondern auch die Qualität",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Reinigung",
    "pron": "di rái-ni-gung",
    "es": "la tintorería / limpieza",
    "type": "Sustantivo (Fem)",
    "category": "Geschäfte",
    "level": "A2–B1",
    "plural": "die Reinigungen",
    "en": "tidy dry cleaning shop storefront with pressed coats on hangers",
    "exampleSentenceDe": "Ich bringe meine Wintermäntel in die Reinigung.",
    "exampleSentenceEs": "Llevo mis abrigos de invierno a la tintorería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bringe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meine Wintermäntel in die Reinigung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "sammeln",
    "pron": "zá-meln",
    "es": "coleccionar / recolectar",
    "type": "Verbo regular",
    "category": "Hobbys",
    "level": "B1",
    "regimen": "+ Akkusativ / sammelt, sammelte, hat gesammelt",
    "exampleSentenceDe": "Mein älterer Bruder sammelt seit Jahren seltene Briefmarken.",
    "exampleSentenceEs": "Mi hermano mayor colecciona sellos raros desde hace años.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein älterer Bruder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sammelt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "seit Jahren seltene Briefmarken",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Schein",
    "pron": "dea shain",
    "es": "el billete (dinero) / certificado",
    "type": "Sustantivo (Masc)",
    "category": "Geld",
    "level": "A1–B1",
    "plural": "die Scheine (Geldschein)",
    "en": "a cute 3D isometric UI icon of a crisp folded green euro paper banknote",
    "exampleSentenceDe": "Kannst du bitte einen Fünfzigeuroschein in Kleingeld wechseln?",
    "exampleSentenceEs": "¿Puedes cambiar un billete de cincuenta euros en suelto, por favor?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Kannst",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte einen Fünfzigeuroschein in Kleingeld",
        "role": "complement",
        "order": 3
      },
      {
        "text": "wechseln",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Sonderangebot",
    "pron": "das zón-da-an-gue-bot",
    "es": "la oferta especial",
    "type": "Sustantivo (Neutro)",
    "category": "Konsum",
    "level": "A1–B1",
    "plural": "die Sonderangebote",
    "exampleSentenceDe": "Das ist ein tolles Sonderangebot: 25 Prozent reduziert!",
    "exampleSentenceEs": "¡Esa es una gran oferta especial: 25 por ciento de descuento!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein tolles Sonderangebot: 25 Prozent reduziert",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Spende",
    "pron": "di shpén-de",
    "es": "el donativo / donación",
    "type": "Sustantivo (Fem)",
    "category": "Finanzen",
    "level": "B1",
    "plural": "die Spenden",
    "exampleSentenceDe": "Wir sammeln Spenden für das neue Kinderkrankenhaus.",
    "exampleSentenceEs": "Recaudamos donativos para el nuevo hospital infantil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sammeln",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Spenden für das neue Kinderkrankenhaus",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Tüte",
    "pron": "di tǘ-te",
    "es": "la bolsa (plástico/papel)",
    "type": "Sustantivo (Fem)",
    "category": "Verpackung",
    "level": "A1",
    "plural": "die Tüten",
    "en": "a cute 3D isometric UI icon of a neat brown paper grocery shopping bag",
    "exampleSentenceDe": "Brauchen Sie an der Kasse noch eine Tüte für den Salat?",
    "exampleSentenceEs": "¿Necesita en la caja otra bolsa para la ensalada?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Brauchen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "an der Kasse noch eine Tüte für den Salat",
        "role": "complement",
        "order": 3
      }
    ]
  }
]
}
];
