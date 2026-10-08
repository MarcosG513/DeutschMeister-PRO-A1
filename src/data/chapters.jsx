import React, { lazy } from 'react';
import { Activity, BookOpen, Bot, Briefcase, Car, Clock, Coffee, Edit as Edit3, Headphones, Heart, Home, Link2, List, Mail, Mic, PlayCircle, Search, ShoppingCart, Star as Sparkles, Volume2, Laptop, Zap } from 'lucide-react';
import GrammarAccordion from '../components/GrammarAccordion';
import AudioSim from '../components/AudioSim';
const InteractiveQA = lazy(() => import('../components/InteractiveQA'));
const EmailSimulator = lazy(() => import('../components/EmailSimulator'));
import PresentationVocabCard from '../components/PresentationVocabCard';
import DraggableSentenceBuilder from '../components/DraggableSentenceBuilder';
import AccusativeShield from '../components/AccusativeShield';
import AccusativeCards from '../components/AccusativeCards';
import SyntaxFlow from '../components/SyntaxFlow';
import LocativeEquationCards from '../components/LocativeEquationCards';
import MechanicalTimeline from '../components/MechanicalTimeline';
import PincerSwitch from '../components/PincerSwitch';
import LiveEvaluator from '../components/LiveEvaluator';
import LocativeMapSimulator from '../components/LocativeMapSimulator';
import AcousticRadar from '../components/AcousticRadar';
import TextHighlighter from '../components/TextHighlighter';
import FormularBuilder from '../components/FormularBuilder';
import OfficialFormExam from '../components/OfficialFormExam';
import VoiceExaminer from '../components/VoiceExaminer';
import ClockSVG from '../components/ClockSVG';
const rawChapters = [
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
  }]
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
  }]
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
    }]
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
    exampleSentenceDe: "Der Kellner ist muy cortés.",
    exampleSentenceEs: "El camarero es muy cortés.",
    exampleSentenceDeBlocks: [
      { text: "Der Kellner", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "muy cortés", role: "complement", order: 3 }
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
    exampleSentenceDe: "Das Kid lächelt.",
    exampleSentenceEs: "El niño sonríe.",
    exampleSentenceDeBlocks: [
      { text: "Das Kid", role: "subject", order: 1 },
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
      { text: "Sag mir", role: "subject", order: 1 },
      { text: "bitte", role: "verb_p1", order: 2 },
      { text: "Bescheid, wenn du Zeit hast", role: "complement", order: 3 }
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
    }]
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
    }]
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
      { text: "spazieren, obwohl es regnet", role: "complement", order: 3 }
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
      { text: "Wenn ich Zeit", role: "subject", order: 1 },
      { text: "habe,", role: "verb_p1", order: 2 },
      { text: "lerne ich Deutsch", role: "complement", order: 3 }
    ],
    regimen: "Verbo al final"
  }, {
    de: "als",
    pron: "als",
    es: "cuando",
    type: "Conector Subordinante",
    category: "Nebensätze",
    exampleSentenceDe: "Ich bin klein, als ich Kind war.",
    exampleSentenceEs: "Soy bajo, cuando era niño.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "klein, als ich Kind war", role: "complement", order: 3 }
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
      { text: "Ich", role: "subject", order: 1 },
      { text: "lerne", role: "verb_p1", order: 2 },
      { text: "Deutsch, weil ich in Deutschland lebe", role: "complement", order: 3 }
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
      { text: "Ich", role: "subject", order: 1 },
      { text: "weiß,", role: "verb_p1", order: 2 },
      { text: "dass der Unterricht um 9 Uhr beginnt", role: "complement", order: 3 }
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
    }]
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
    }]
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
    exampleSentenceDe: "Ich habe der Durst.",
    exampleSentenceEs: "Tengo sed.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "der Durst", role: "complement", order: 3 }
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
    exampleSentenceDe: "Ich mag der Kuchen.",
    exampleSentenceEs: "Me gusta el pastel.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "der Kuchen", role: "complement", order: 3 }
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
    exampleSentenceDe: "Der Pfirsich ist muy dulce.",
    exampleSentenceEs: "El durazno es muy dulce.",
    exampleSentenceDeBlocks: [
      { text: "Der Pfirsich", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "muy dulce", role: "complement", order: 3 }
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
  }]
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
  }]
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
    exampleSentenceDe: "Ich sehe der Rabatt. Der Rabatt ist gut.",
    exampleSentenceEs: "Veo el descuento. El descuento es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "der Rabatt", role: "complement", order: 3 }
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
    }]
},
{
  id: 11,
  title: "Kapitel 11: Freizeit",
  icon: <Activity size={20} />,
  emoji: "⚛",
  words: [{
    de: "die Freizeit",
    pron: "di frái-tsait",
    es: "el tiempo libre",
    type: "Sustantivo (Fem)",
    category: "Allgemein",
    exampleSentenceDe: "Ich habe Freizeit am Wochenende.",
    exampleSentenceEs: "Tengo tiempo libre el fin de semana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Freizeit am Wochenende", role: "complement", order: 3 }
    ],
    plural: "die Freizeiten"
  }, {
    de: "das Hobby",
    pron: "das hó-bi",
    es: "el pasatiempo",
    type: "Sustantivo (Neutro)",
    category: "Allgemein",
    exampleSentenceDe: "Mein Hobby ist lesen.",
    exampleSentenceEs: "Mi pasatiempo es leer.",
    exampleSentenceDeBlocks: [
      { text: "Mein Hobby", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "lesen", role: "complement", order: 3 }
    ],
    plural: "die Hobbys"
  }, {
    de: "spielen",
    pron: "shpí-len",
    es: "jugar / tocar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich spiele gern.",
    exampleSentenceEs: "Me gusta jugar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "spiele", role: "verb_p1", order: 2 },
      { text: "gern", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "Fußball spielen",
    pron: "fús-bal shpí-len",
    es: "jugar fútbol",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich spiele gern Fußball.",
    exampleSentenceEs: "Me gusta jugar al fútbol.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "spiele", role: "verb_p1", order: 2 },
      { text: "gern Fußball", role: "complement", order: 3 }
    ],
    regimen: "Verbo+objeto"
  }, {
    de: "der Ball",
    pron: "dea bal",
    es: "el balón",
    type: "Sustantivo (Masc)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich habe einen Ball. Der Ball ist rot.",
    exampleSentenceEs: "Tengo un balón. El balón es rojo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Ball", role: "complement", order: 3 }
    ],
    plural: "die Bälle"
  }, {
    de: "Karten spielen",
    pron: "kár-ten-shpí-len",
    es: "jugar cartas",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Wir spielen Karten am Abend.",
    exampleSentenceEs: "Jugamos a las cartas por la noche.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "spielen", role: "verb_p1", order: 2 },
      { text: "Karten am Abend", role: "complement", order: 3 }
    ],
    regimen: "Verbo+objeto"
  }, {
    de: "Musik hören",
    pron: "mu-sík jé-ren",
    es: "escuchar música",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich höre gern Musik.",
    exampleSentenceEs: "Me gusta escuchar música.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "höre", role: "verb_p1", order: 2 },
      { text: "gern Musik", role: "complement", order: 3 }
    ],
    regimen: "Verbo + Akkusativ"
  }, {
    de: "die CD",
    pron: "di tse-dé",
    es: "el CD",
    type: "Sustantivo (Fem)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich habe die CD. Die CD ist neu.",
    exampleSentenceEs: "Tengo el CD. El CD es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die CD", role: "complement", order: 3 }
    ],
    plural: "die CDs"
  }, {
    de: "wandern",
    pron: "ván-dean",
    es: "hacer senderismo",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich gehe im Park wandern.",
    exampleSentenceEs: "Yo voy a hacer senderismo en el parque.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "im Park wandern", role: "complement", order: 3 }
    ],
    regimen: "sein (intransitivo)"
  }, {
    de: "schwimmen",
    pron: "shví-men",
    es: "nadar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich kann schwimmen.",
    exampleSentenceEs: "Yo puedo nadar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "schwimmen", role: "complement", order: 3 }
    ],
    regimen: "sein (movimiento)"
  }, {
    de: "lesen",
    pron: "lé-sen",
    es: "leer",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich lese ein Buch.",
    exampleSentenceEs: "Yo leo un libro.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lese", role: "verb_p1", order: 2 },
      { text: "ein Buch", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "das Buch",
    pron: "das buj",
    es: "el libro",
    type: "Sustantivo (Neutro)",
    category: "Gegenstände",
    exampleSentenceDe: "Das ist ein Buch. Das Buch ist neu.",
    exampleSentenceEs: "Este es un libro. El libro es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Buch", role: "complement", order: 3 }
    ],
    plural: "die Bücher"
  }, {
    de: "die Zeitung",
    pron: "di tsái-tung",
    es: "el periódico",
    type: "Sustantivo (Fem)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich lese die Zeitung.",
    exampleSentenceEs: "Yo leo el periódico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lese", role: "verb_p1", order: 2 },
      { text: "die Zeitung", role: "complement", order: 3 }
    ],
    plural: "die Zeitungen"
  }, {
    de: "fernsehen",
    pron: "fén-se-en",
    es: "ver televisión",
    type: "Verbo separable",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich sehe am Abend fern.",
    exampleSentenceEs: "Yo veo la televisión por la noche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "am Abend", role: "complement", order: 3 },
      { text: "fern", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (fern-)"
  }, {
    de: "tanzen",
    pron: "tán-tsen",
    es: "bailar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich tanze gern.",
    exampleSentenceEs: "Me gusta bailar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "tanze", role: "verb_p1", order: 2 },
      { text: "gern", role: "complement", order: 3 }
    ],
    regimen: "Intransitivo"
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ta",
    es: "computador",
    type: "Sustantivo (Masc)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich habe einen Computer. Der Computer ist neu.",
    exampleSentenceEs: "Tengo un computador. El computador es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Computer", role: "complement", order: 3 }
    ],
    plural: "die Computer"
  }, {
    de: "der Sport",
    pron: "dea shport",
    es: "deporte",
    type: "Sustantivo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich mag der Sport.",
    exampleSentenceEs: "Me gusta el deporte.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "der Sport", role: "complement", order: 3 }
    ],
    plural: "die Sportarten"
  }, {
    de: "ins Kino gehen",
    pron: "ins kí-no gué-en",
    es: "ir al cine",
    type: "Frase",
    category: "Ausgehen",
    exampleSentenceDe: "Ich gehe ins Kino.",
    exampleSentenceEs: "Yo voy al cine.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "ins Kino", role: "complement", order: 3 }
    ],
    regimen: "in + Akk."
  }, {
    de: "einen Film sehen",
    pron: "ái-nen film sé-en",
    es: "ver película",
    type: "Frase",
    category: "Ausgehen",
    exampleSentenceDe: "Ich sehe einen Film.",
    exampleSentenceEs: "Yo veo una película.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "einen Film", role: "complement", order: 3 }
    ],
    regimen: "Akkusativ: einen Film"
  }, {
    de: "Rad fahren",
    pron: "rat fá-ren",
    es: "montar bicicleta",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich kann Rad fahren.",
    exampleSentenceEs: "Yo sé montar bicicleta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "Rad", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    regimen: "Verbo separable"
  }, {
    de: "spazieren gehen",
    pron: "shpa-tsí-ren-gué-en",
    es: "pasear",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Wir gehen spazieren im Park.",
    exampleSentenceEs: "Paseamos en el parque.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "gehen", role: "verb_p1", order: 2 },
      { text: "spazieren im Park", role: "complement", order: 3 }
    ],
    regimen: "Verbo separable"
  }, {
    de: "in die Disco gehen",
    pron: "in di dís-ko gué-en",
    es: "ir a discoteca",
    type: "Frase",
    category: "Ausgehen",
    exampleSentenceDe: "Ich gehe in die Disco.",
    exampleSentenceEs: "Yo voy a la discoteca.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "in die Disco", role: "complement", order: 3 }
    ],
    regimen: "in + Akkusativ"
  }, {
    de: "das Museum",
    pron: "das mu-séum",
    es: "museo",
    type: "Sustantivo (Neutro)",
    category: "Orte",
    exampleSentenceDe: "Das Museum ist groß.",
    exampleSentenceEs: "El museo es grande.",
    exampleSentenceDeBlocks: [
      { text: "Das Museum", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Museen"
  }, {
    de: "der Verein",
    pron: "dea fea-áin",
    es: "club / asociación",
    type: "Sustantivo (Masc)",
    category: "Orte",
    exampleSentenceDe: "Ich bin in dem Verein.",
    exampleSentenceEs: "Yo estoy en el club.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "in dem Verein", role: "complement", order: 3 }
    ],
    plural: "die Vereine"
  }, {
    de: "das Schwimmbad",
    pron: "das shvím-bat",
    es: "la piscina",
    type: "Sustantivo (Neutro)",
    category: "Orte",
    exampleSentenceDe: "Wir gehen in das Schwimmbad.",
    exampleSentenceEs: "Vamos a la piscina.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "gehen", role: "verb_p1", order: 2 },
      { text: "in das Schwimmbad", role: "complement", order: 3 }
    ],
    plural: "die Schwimmbäder"
  }, {
    de: "gefallen",
    pron: "gue-fá-len",
    es: "gustar",
    type: "Verbo",
    category: "Adjektive & Gefühle",
    exampleSentenceDe: "Das Kleid gefällt mir.",
    exampleSentenceEs: "El vestido me gusta.",
    exampleSentenceDeBlocks: [
      { text: "Das Kleid", role: "subject", order: 1 },
      { text: "gefällt", role: "verb_p1", order: 2 },
      { text: "mir", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "schön",
    pron: "shön",
    es: "bonito",
    type: "Adjetivo",
    category: "Adjektive & Gefühle",
    exampleSentenceDe: "Das Wetter ist schön.",
    exampleSentenceEs: "El tiempo es bonito.",
    exampleSentenceDeBlocks: [
      { text: "Das Wetter", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    regimen: "≠ hässlich"
  }, {
    de: "mögen",
    pron: "mö-guen",
    es: "gustar / me gusta",
    type: "Verbo",
    category: "Adjektive & Gefühle",
    exampleSentenceDe: "Ich mag Kaffee.",
    exampleSentenceEs: "Me gusta el café.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "Kaffee", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ, irregular"
  }, {
    de: "sich treffen",
    pron: "zij tré-fen",
    es: "reunirse/encontrarse",
    type: "Verbo",
    category: "Soziales",
    exampleSentenceDe: "Wir treffen uns heute Abend.",
    exampleSentenceEs: "Nos encontramos esta noche.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "treffen", role: "verb_p1", order: 2 },
      { text: "uns heute Abend", role: "complement", order: 3 }
    ],
    regimen: "Reflexivo + mit/Dativ"
  },
  {
    de: "der Hund",
    pron: "dea hunt",
    es: "el perro",
    type: "Sustantivo (Masc)",
    category: "Tiere",
    plural: "die Hunde",
    exampleSentenceDe: "Der Hund läuft durch den Garten.",
    exampleSentenceEs: "El perro corre por el jardín.",
    exampleSentenceDeBlocks: [
      { text: "Der Hund", role: "subject", order: 1 },
      { text: "läuft", role: "verb_p1", order: 2 },
      { text: "durch den Garten", role: "complement", order: 3 }
    ]
  }, {
        de: "die Katze",
    pron: "di ká-tse",
    es: "el gato",
    type: "Sustantivo (Fem)",
    category: "Tiere",
    plural: "die Katzen",
    exampleSentenceDe: "Die Katze schläft auf dem Stuhl.",
    exampleSentenceEs: "El gato duerme en la silla.",
    exampleSentenceDeBlocks: [
      { text: "Die Katze", role: "subject", order: 1 },
      { text: "schläft", role: "verb_p1", order: 2 },
      { text: "auf dem Stuhl", role: "complement", order: 3 }
    ]
  }, {
        de: "der Vogel",
    pron: "dea fó-guel",
    es: "el pájaro",
    type: "Sustantivo (Masc)",
    category: "Tiere",
    plural: "die Vögel",
    exampleSentenceDe: "Der Vogel singt am Morgen.",
    exampleSentenceEs: "El pájaro canta por la mañana.",
    exampleSentenceDeBlocks: [
      { text: "Der Vogel", role: "subject", order: 1 },
      { text: "singt", role: "verb_p1", order: 2 },
      { text: "am Morgen", role: "complement", order: 3 }
    ]
  }, {
        de: "das Pferd",
    pron: "das pfeat",
    es: "el caballo",
    type: "Sustantivo (Neutro)",
    category: "Tiere",
    plural: "die Pferde",
    exampleSentenceDe: "Das Pferd frisst frisches Gras.",
    exampleSentenceEs: "El caballo come hierba fresca.",
    exampleSentenceDeBlocks: [
      { text: "Das Pferd", role: "subject", order: 1 },
      { text: "frisst", role: "verb_p1", order: 2 },
      { text: "frisches Gras", role: "complement", order: 3 }
    ]
  }, {
        de: "die Maus",
    pron: "di maus",
    es: "el ratón",
    type: "Sustantivo (Fem)",
    category: "Tiere",
    plural: "die Mäuse",
    exampleSentenceDe: "Die kleine Maus sucht Käse.",
    exampleSentenceEs: "El ratoncito busca queso.",
    exampleSentenceDeBlocks: [
      { text: "Die", role: "subject", order: 1 },
      { text: "kleine", role: "verb_p1", order: 2 },
      { text: "Maus sucht Käse", role: "complement", order: 3 }
    ]
  }, {
        de: "die Kuh",
    pron: "di ku",
    es: "la vaca",
    type: "Sustantivo (Fem)",
    category: "Tiere",
    plural: "die Kühe",
    exampleSentenceDe: "Die Kuh steht auf der Wiese.",
    exampleSentenceEs: "La vaca está en el prado.",
    exampleSentenceDeBlocks: [
      { text: "Die Kuh", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "auf der Wiese", role: "complement", order: 3 }
    ]
  }, {
        de: "das Schaf",
    pron: "das shaf",
    es: "la oveja",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Schafe",
    en: "white fluffy sheep",
    exampleSentenceDe: "Das Schaf isst Gras.",
    exampleSentenceEs: "La oveja come hierba.",
    exampleSentenceDeBlocks: [
      { text: "Das Schaf", role: "subject", order: 1 },
      { text: "isst", role: "verb_p1", order: 2 },
      { text: "Gras", role: "complement", order: 3 }
    ]
  }, {
        de: "die Ziege",
    pron: "di tsí-gue",
    es: "la cabra",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Ziegen",
    en: "brown goat",
    exampleSentenceDe: "Die Ziege ist auf dem Berg.",
    exampleSentenceEs: "La cabra está en la montaña.",
    exampleSentenceDeBlocks: [
      { text: "Die Ziege", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "auf dem Berg", role: "complement", order: 3 }
    ]
  }, {
        de: "das Huhn",
    pron: "das jun",
    es: "la gallina",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Hühner",
    en: "white chicken",
    exampleSentenceDe: "Das Huhn legt ein Ei.",
    exampleSentenceEs: "La gallina pone un huevo.",
    exampleSentenceDeBlocks: [
      { text: "Das Huhn", role: "subject", order: 1 },
      { text: "legt", role: "verb_p1", order: 2 },
      { text: "ein Ei", role: "complement", order: 3 }
    ]
  }, {
        de: "der Bär",
    pron: "dea ber",
    es: "el oso",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Bären",
    en: "brown bear",
    exampleSentenceDe: "Der Bär ist groß.",
    exampleSentenceEs: "El oso es grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Bär", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ]
  }, {
        de: "der Löwe",
    pron: "dea lö-ve",
    es: "el león",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Löwen",
    en: "male lion with a mane",
    exampleSentenceDe: "Der Löwe ist stark.",
    exampleSentenceEs: "El león es fuerte.",
    exampleSentenceDeBlocks: [
      { text: "Der Löwe", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "stark", role: "complement", order: 3 }
    ]
  }, {
        de: "der Elefant",
    pron: "dea e-le-fánt",
    es: "el elefante",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Elefanten",
    en: "gray elephant with a trunk",
    exampleSentenceDe: "Der Elefant hat große Ohren.",
    exampleSentenceEs: "El elefante tiene orejas grandes.",
    exampleSentenceDeBlocks: [
      { text: "Der Elefant", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "große Ohren", role: "complement", order: 3 }
    ]
  }, {
        de: "der Affe",
    pron: "dea á-fe",
    es: "el mono",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Affen",
    en: "monkey eating a banana",
    exampleSentenceDe: "Der Affe isst eine Banane.",
    exampleSentenceEs: "El mono come un banano.",
    exampleSentenceDeBlocks: [
      { text: "Der Affe", role: "subject", order: 1 },
      { text: "isst", role: "verb_p1", order: 2 },
      { text: "eine Banane", role: "complement", order: 3 }
    ]
  }, {
        de: "die Schlange",
    pron: "di shláng-e",
    es: "la serpiente",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Schlangen",
    en: "green snake",
    exampleSentenceDe: "Die Schlange ist lang.",
    exampleSentenceEs: "La serpiente es larga.",
    exampleSentenceDeBlocks: [
      { text: "Die Schlange", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "lang", role: "complement", order: 3 }
    ]
  }, {
        de: "der Frosch",
    pron: "dea frosh",
    es: "la rana",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Frösche",
    en: "green frog",
    exampleSentenceDe: "Der Frosch springt.",
    exampleSentenceEs: "La rana salta.",
    exampleSentenceDeBlocks: [
      { text: "Der Frosch", role: "subject", order: 1 },
      { text: "springt", role: "verb_p1", order: 2 }
    ]
  }, {
        de: "die Spinne",
    pron: "di shpí-ne",
    es: "la araña",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Spinnen",
    en: "black spider",
    exampleSentenceDe: "Ich mag keine Spinnen.",
    exampleSentenceEs: "No me gustan las arañas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "keine Spinnen", role: "complement", order: 3 }
    ]
  }, {
        de: "die Biene",
    pron: "di bí-ne",
    es: "la abeja",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Bienen",
    en: "yellow and black bee",
    exampleSentenceDe: "Die Biene macht Honig.",
    exampleSentenceEs: "La abeja hace miel.",
    exampleSentenceDeBlocks: [
      { text: "Die Biene", role: "subject", order: 1 },
      { text: "macht", role: "verb_p1", order: 2 },
      { text: "Honig", role: "complement", order: 3 }
    ]
  }, {
        de: "der Schmetterling",
    pron: "dea shmé-ter-ling",
    es: "la mariposa",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Schmetterlinge",
    en: "colorful butterfly",
    exampleSentenceDe: "Der Schmetterling ist schön.",
    exampleSentenceEs: "La mariposa es bonita.",
    exampleSentenceDeBlocks: [
      { text: "Der Schmetterling", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ]
  }, {
        de: "die Kirche",
    pron: "di kír-je",
    es: "la iglesia",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Kirchen",
    en: "old stone church",
    exampleSentenceDe: "Die Kirche ist sehr alt.",
    exampleSentenceEs: "La iglesia es muy antigua.",
    exampleSentenceDeBlocks: [
      { text: "Die Kirche", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr alt", role: "complement", order: 3 }
    ]
  }, {
        de: "die Brücke",
    pron: "di brü-ke",
    es: "el puente",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Brücken",
    en: "stone bridge over a river",
    exampleSentenceDe: "Wir gehen über die Brücke.",
    exampleSentenceEs: "Vamos por el puente.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "gehen", role: "verb_p1", order: 2 },
      { text: "über die Brücke", role: "complement", order: 3 }
    ]
  }, {
        de: "der Turm",
    pron: "dea turm",
    es: "la torre",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Türme",
    en: "tall medieval tower",
    exampleSentenceDe: "Der Turm ist sehr hoch.",
    exampleSentenceEs: "La torre es muy alta.",
    exampleSentenceDeBlocks: [
      { text: "Der Turm", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr hoch", role: "complement", order: 3 }
    ]
  }, {
        de: "der Park",
    pron: "dea park",
    es: "el parque",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Parks",
    en: "green park with trees",
    exampleSentenceDe: "Ich laufe im Park.",
    exampleSentenceEs: "Yo corro en el parque.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "laufe", role: "verb_p1", order: 2 },
      { text: "im Park", role: "complement", order: 3 }
    ]
  }, {
        de: "das Rathaus",
    pron: "das rát-haus",
    es: "el ayuntamiento",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Rathäuser",
    en: "historic city hall building",
    exampleSentenceDe: "Das Rathaus ist im Zentrum.",
    exampleSentenceEs: "El ayuntamiento está en el centro.",
    exampleSentenceDeBlocks: [
      { text: "Das Rathaus", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "im Zentrum", role: "complement", order: 3 }
    ]
  }, {
        de: "die Bibliothek",
    pron: "di bi-blio-ték",
    es: "la biblioteca",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Bibliotheken",
    en: "building full of books",
    exampleSentenceDe: "Ich lerne in der Bibliothek.",
    exampleSentenceEs: "Estudio en la biblioteca.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lerne", role: "verb_p1", order: 2 },
      { text: "in der Bibliothek", role: "complement", order: 3 }
    ]
  }, {
        de: "das Stadion",
    pron: "das shtá-dion",
    es: "el estadio",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Stadien",
    en: "large sports stadium",
    exampleSentenceDe: "Das Fußballspiel ist im Stadion.",
    exampleSentenceEs: "El partido de fútbol es en el estadio.",
    exampleSentenceDeBlocks: [
      { text: "Das Fußballspiel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "im Stadion", role: "complement", order: 3 }
    ]
  }, {
        de: "das Theater",
    pron: "das te-á-ter",
    es: "el teatro",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Theater",
    en: "classic theater stage",
    exampleSentenceDe: "Wir gehen heute ins Theater.",
    exampleSentenceEs: "Hoy vamos al teatro.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "gehen", role: "verb_p1", order: 2 },
      { text: "heute ins Theater", role: "complement", order: 3 }
    ]
  }, {
        de: "das Zentrum",
    pron: "das tsén-trum",
    es: "el centro",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Zentren",
    en: "busy city center square",
    exampleSentenceDe: "Die Bank ist im Zentrum.",
    exampleSentenceEs: "El banco está en el centro.",
    exampleSentenceDeBlocks: [
      { text: "Die Bank", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "im Zentrum", role: "complement", order: 3 }
    ]
  }, {
        de: "der Markt",
    pron: "dea markt",
    es: "el mercado",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Märkte",
    en: "fruit market stall",
    exampleSentenceDe: "Ich kaufe Obst auf dem Markt.",
    exampleSentenceEs: "Compro fruta en el mercado.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kaufe", role: "verb_p1", order: 2 },
      { text: "Obst auf dem Markt", role: "complement", order: 3 }
    ]
  },
    {
      de: "aus|leihen",
      pron: "áus-lái-en",
      es: "pedir prestado / tomar prestado",
      type: "Verbo separable",
      category: "Aktivitäten",
      regimen: "Separable (aus-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "In der Bibliothek kann man Bücher ausleihen.",
      exampleSentenceEs: "En la biblioteca se pueden tomar libros prestados.",
    exampleSentenceDeBlocks: [
      { text: "In der Bibliothek", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "man Bücher", role: "complement", order: 3 },
      { text: "ausleihen", role: "verb_p2", order: 4 }
    ],
      en: "borrowing a stack of books from public library"
    },
    {
      de: "mit|machen",
      pron: "mít-má-jen",
      es: "participar / sumarse",
      type: "Verbo separable",
      category: "Aktivitäten",
      regimen: "Separable (mit-) / bei + Dativ",
      plural: "-",
      exampleSentenceDe: "Wer möchte bei dem Spiel mitmachen?",
      exampleSentenceEs: "¿Quién quiere sumarse al juego?",
    exampleSentenceDeBlocks: [
      { text: "Wer", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "bei dem Spiel", role: "complement", order: 3 },
      { text: "mitmachen", role: "verb_p2", order: 4 }
    ],
      en: "group of friends cheerfully joining hands together in circle"
    },
    {
      de: "aus|packen",
      pron: "áus-pá-ken",
      es: "desempacar / desembalar",
      type: "Verbo separable",
      category: "Allgemein",
      regimen: "Separable (aus-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Nach der Ankunft packe ich meine Sachen aus.",
      exampleSentenceEs: "Tras la llegada desempaco mis cosas.",
    exampleSentenceDeBlocks: [
      { text: "Nach der Ankunft", role: "subject", order: 1 },
      { text: "packe", role: "verb_p1", order: 2 },
      { text: "ich meine Sachen", role: "complement", order: 3 },
      { text: "aus", role: "verb_p2", order: 4 }
    ],
      en: "unpacking items and placing clothes neatly into wardrobe"
    },
    {
      de: "teil|nehmen",
      pron: "táil-né-men",
      es: "participar / asistir",
      type: "Verbo separable",
      category: "Aktivitäten",
      regimen: "Separable (teil-) / an + Dativ",
      plural: "-",
      exampleSentenceDe: "Ich möchte an dem Deutschkurs teilnehmen.",
      exampleSentenceEs: "Quisiera participar en el curso de alemán.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "an dem Deutschkurs", role: "complement", order: 3 },
      { text: "teilnehmen", role: "verb_p2", order: 4 }
    ],
      en: "student raising hand actively participating in classroom"
    }]
},
{
  id: 12,
  title: "Kapitel 12: Reisen & Verkehr",
  icon: <Car size={20} />,
  emoji: "✈️",
  words: [{
    de: "die Ferien",
    pron: "di fé-ri-en",
    es: "las vacaciones (escolares)",
    type: "Sustantivo",
    category: "Reise",
    exampleSentenceDe: "Die Ferien sind schön.",
    exampleSentenceEs: "Las vacaciones son bonitas.",
    exampleSentenceDeBlocks: [
      { text: "Die Ferien", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "schön", role: "complement", order: 3 }
    ],
    plural: "die Ferien"
  }, {
    de: "der Urlaub",
    pron: "dea úa-laup",
    es: "las vacaciones (laborales)",
    type: "Sustantivo",
    category: "Reise",
    exampleSentenceDe: "Ich habe Urlaub.",
    exampleSentenceEs: "Tengo vacaciones.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Urlaub", role: "complement", order: 3 }
    ],
    plural: "die Urlaube"
  }, {
    de: "Urlaub machen",
    pron: "ú-a-laup má-jen",
    es: "ir de vacaciones",
    type: "Frase",
    category: "Reise",
    exampleSentenceDe: "Ich mache Urlaub in Spanien.",
    exampleSentenceEs: "Yo voy de vacaciones a España.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "Urlaub in Spanien", role: "complement", order: 3 }
    ],
    regimen: "Verbo+Akk. fijo"
  }, {
    de: "es gibt",
    pron: "es guípt",
    es: "hay (+ Acusativo)",
    type: "Frase",
    category: "Allgemein",
    exampleSentenceDe: "Es gibt Kaffee.",
    exampleSentenceEs: "Hay café.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "gibt", role: "verb_p1", order: 2 },
      { text: "Kaffee", role: "complement", order: 3 }
    ],
    regimen: "⚠️ + Akkusativ"
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
    de: "geschlossen",
    pron: "gue-shló-sen",
    es: "cerrado",
    type: "Adjetivo",
    category: "Status",
    exampleSentenceDe: "Das Geschäft ist geschlossen.",
    exampleSentenceEs: "La tienda está cerrada.",
    exampleSentenceDeBlocks: [
      { text: "Das Geschäft", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "geschlossen", role: "verb_p2", order: 3 }
    ],
    regimen: "≠ offen"
  }, {
    de: "von - bis",
    pron: "fon - bis",
    es: "de - hasta",
    type: "Preposición",
    category: "Zeit",
    exampleSentenceDe: "Ich arbeite von neun Uhr bis fünf Uhr.",
    exampleSentenceEs: "Yo trabajo de nueve en punto hasta las cinco en punto.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "arbeite", role: "verb_p1", order: 2 },
      { text: "von neun Uhr bis fünf Uhr", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo"
  }, {
    de: "die Karte",
    pron: "di kár-te",
    es: "tarjeta / mapa",
    type: "Sustantivo (Fem)",
    category: "Tickets",
    exampleSentenceDe: "Ich habe die Karte. Die Karte ist groß.",
    exampleSentenceEs: "Tengo la tarjeta. La tarjeta es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Karte", role: "complement", order: 3 }
    ],
    plural: "die Karten"
  }, {
    de: "die Eintrittskarte",
    pron: "di áin-trits-kár-te",
    es: "boleto de entrada",
    type: "Sustantivo (Fem)",
    category: "Tickets",
    exampleSentenceDe: "Ich brauche die Eintrittskarte.",
    exampleSentenceEs: "Necesito el boleto de entrada.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Eintrittskarte", role: "complement", order: 3 }
    ],
    plural: "die Eintrittskarten"
  }, {
    de: "das Ticket",
    pron: "das tí-ket",
    es: "el ticket",
    type: "Sustantivo (Neutro)",
    category: "Tickets",
    exampleSentenceDe: "Ich brauche das Ticket.",
    exampleSentenceEs: "Necesito el ticket.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "das Ticket", role: "complement", order: 3 }
    ],
    plural: "die Tickets"
  }, {
    de: "kaufen",
    pron: "káu-fen",
    es: "comprar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich kaufe ein Brot.",
    exampleSentenceEs: "Yo compro un pan.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kaufe", role: "verb_p1", order: 2 },
      { text: "ein Brot", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "reservieren",
    pron: "re-ze-a-fí-ren",
    es: "reservar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich möchte einen Tisch reservieren.",
    exampleSentenceEs: "Me gustaría reservar una mesa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "einen Tisch", role: "complement", order: 3 },
      { text: "reservieren", role: "verb_p2", order: 4 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "der Weg",
    pron: "dea vek",
    es: "el camino",
    type: "Sustantivo",
    category: "Orientierung",
    exampleSentenceDe: "Der Weg ist frei.",
    exampleSentenceEs: "El camino está libre.",
    exampleSentenceDeBlocks: [
      { text: "Der Weg", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "frei", role: "complement", order: 3 }
    ],
    plural: "die Wege"
  }, {
    de: "geradeaus",
    pron: "gue-ra-de-áus",
    es: "recto",
    type: "Adverbio",
    category: "Orientierung",
    exampleSentenceDe: "Gehen Sie geradeaus, bitte.",
    exampleSentenceEs: "Vaya recto, por favor.",
    exampleSentenceDeBlocks: [
      { text: "Gehen", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "geradeaus, bitte", role: "complement", order: 3 }
    ],
    regimen: "Direccional"
  }, {
    de: "links / rechts",
    pron: "links  rejts",
    es: "izquierda / derecha",
    type: "Adverbio",
    category: "Orientierung",
    exampleSentenceDe: "Gehen Sie links.",
    exampleSentenceEs: "Vaya a la izquierda.",
    exampleSentenceDeBlocks: [
      { text: "Gehen", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "links", role: "complement", order: 3 }
    ],
    regimen: "Direccional/lugar"
  }, {
    de: "der Unfall",
    pron: "dea ún-fal",
    es: "accidente",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich sehe einen Unfall. Der Unfall ist groß.",
    exampleSentenceEs: "Yo veo un accidente. El accidente es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "einen Unfall", role: "complement", order: 3 }
    ],
    plural: "die Unfälle"
  }, {
    de: "die Polizei",
    pron: "di po-li-tsái",
    es: "policía",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Polizei ist hier.",
    exampleSentenceEs: "La policía está aquí.",
    exampleSentenceDeBlocks: [
      { text: "Die Polizei", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    plural: "die Polizeien"
  }, {
    de: "umsteigen",
    pron: "um-shtái-guen",
    es: "hacer transbordo",
    type: "Verbo",
    category: "Verkehr",
    exampleSentenceDe: "Ich steige in den Bus um.",
    exampleSentenceEs: "Yo hago transbordo al autobús.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "steige", role: "verb_p1", order: 2 },
      { text: "in den Bus", role: "complement", order: 3 },
      { text: "um", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (um-)"
  }, {
    de: "das Zelt",
    pron: "das tsélt",
    es: "tienda de campaña",
    type: "Sustantivo",
    category: "Reise",
    exampleSentenceDe: "Ich habe ein Zelt. Das Zelt ist groß.",
    exampleSentenceEs: "Tengo una tienda de campaña. La tienda de campaña es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Zelt", role: "complement", order: 3 }
    ],
    plural: "die Zelte"
  }, {
    de: "zelten",
    pron: "tsél-ten",
    es: "acampar",
    type: "Verbo",
    category: "Reise",
    exampleSentenceDe: "Wir zelten im Sommer.",
    exampleSentenceEs: "Acampamos en verano.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "zelten", role: "verb_p1", order: 2 },
      { text: "im Sommer", role: "complement", order: 3 }
    ],
    regimen: "Intransitivo, sin caso"
  },
  {
    de: "die Sonne",
    pron: "di zó-ne",
    es: "el sol",
    type: "Sustantivo (Fem)",
    category: "Wetter",
    plural: "die Sonnen",
    exampleSentenceDe: "Die Sonne scheint heute hell.",
    exampleSentenceEs: "El sol brilla hoy con fuerza.",
    exampleSentenceDeBlocks: [
      { text: "Die Sonne", role: "subject", order: 1 },
      { text: "scheint", role: "verb_p1", order: 2 },
      { text: "heute hell", role: "complement", order: 3 }
    ]
  }, {
        de: "der Mond",
    pron: "dea mont",
    es: "la luna",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "die Monde",
    exampleSentenceDe: "Der Mond leuchtet am Nachthimmel.",
    exampleSentenceEs: "La luna brilla en el cielo nocturno.",
    exampleSentenceDeBlocks: [
      { text: "Der Mond", role: "subject", order: 1 },
      { text: "leuchtet", role: "verb_p1", order: 2 },
      { text: "am Nachthimmel", role: "complement", order: 3 }
    ]
  }, {
        de: "der Stern",
    pron: "dea shtern",
    es: "la estrella",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "die Sterne",
    exampleSentenceDe: "Ein Stern leuchtet sehr hell.",
    exampleSentenceEs: "Una estrella brilla muy claro.",
    exampleSentenceDeBlocks: [
      { text: "Ein Stern", role: "subject", order: 1 },
      { text: "leuchtet", role: "verb_p1", order: 2 },
      { text: "sehr hell", role: "complement", order: 3 }
    ]
  }, {
        de: "der Regen",
    pron: "dea ré-guen",
    es: "la lluvia",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "-",
    exampleSentenceDe: "Der Regen fällt vom Himmel.",
    exampleSentenceEs: "La lluvia cae del cielo.",
    exampleSentenceDeBlocks: [
      { text: "Der Regen", role: "subject", order: 1 },
      { text: "fällt", role: "verb_p1", order: 2 },
      { text: "vom Himmel", role: "complement", order: 3 }
    ]
  }, {
        de: "der Schnee",
    pron: "dea shné",
    es: "la nieve",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "-",
    exampleSentenceDe: "Der Schnee liegt auf den Bergen.",
    exampleSentenceEs: "La nieve cubre las montañas.",
    exampleSentenceDeBlocks: [
      { text: "Der Schnee", role: "subject", order: 1 },
      { text: "liegt", role: "verb_p1", order: 2 },
      { text: "auf den Bergen", role: "complement", order: 3 }
    ]
  }, {
        de: "der Wind",
    pron: "dea vint",
    es: "el viento",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "die Winde",
    exampleSentenceDe: "Der Wind weht heute stark.",
    exampleSentenceEs: "El viento sopla fuerte hoy.",
    exampleSentenceDeBlocks: [
      { text: "Der Wind", role: "subject", order: 1 },
      { text: "weht", role: "verb_p1", order: 2 },
      { text: "heute stark", role: "complement", order: 3 }
    ]
  }, {
        de: "der Baum",
    pron: "dea baum",
    es: "el árbol",
    type: "Sustantivo (Masc)",
    category: "Natur",
    plural: "die Bäume",
    exampleSentenceDe: "Der Baum hat viele grüne Blätter.",
    exampleSentenceEs: "El árbol tiene muchas hojas verdes.",
    exampleSentenceDeBlocks: [
      { text: "Der Baum", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "viele grüne Blätter", role: "complement", order: 3 }
    ]
  }, {
        de: "die Blume",
    pron: "di blú-me",
    es: "la flor",
    type: "Sustantivo (Fem)",
    category: "Natur",
    plural: "die Blumen",
    exampleSentenceDe: "Die Blume riecht sehr gut.",
    exampleSentenceEs: "La flor huele muy bien.",
    exampleSentenceDeBlocks: [
      { text: "Die Blume", role: "subject", order: 1 },
      { text: "riecht", role: "verb_p1", order: 2 },
      { text: "sehr gut", role: "complement", order: 3 }
    ]
  }, {
        de: "der Wald",
    pron: "dea valt",
    es: "el bosque",
    type: "Sustantivo (Masc)",
    category: "Natur",
    plural: "die Wälder",
    exampleSentenceDe: "Wir wandern gern im Wald.",
    exampleSentenceEs: "Nos gusta hacer senderismo en el bosque.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "wandern", role: "verb_p1", order: 2 },
      { text: "gern im Wald", role: "complement", order: 3 }
    ]
  }, {
        de: "das Meer",
    pron: "das mea",
    es: "el mar",
    type: "Sustantivo (Neutro)",
    category: "Natur",
    plural: "die Meere",
    exampleSentenceDe: "Das Meer ist heute ruhig.",
    exampleSentenceEs: "El mar está tranquilo hoy.",
    exampleSentenceDeBlocks: [
      { text: "Das Meer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heute ruhig", role: "complement", order: 3 }
    ]
  }, {
        de: "regnen",
    pron: "rég-nen",
    es: "llover",
    type: "Verbo",
    category: "Wetter",
    regimen: "Impersonal",
    en: "dark storm cloud dropping rain",
    exampleSentenceDe: "Morgen wird es regnen.",
    exampleSentenceEs: "Mañana lloverá.",
    exampleSentenceDeBlocks: [
      { text: "Morgen", role: "subject", order: 1 },
      { text: "wird", role: "verb_p1", order: 2 },
      { text: "es regnen", role: "complement", order: 3 }
    ]
  }, {
        de: "schneien",
    pron: "shnái-en",
    es: "nevar",
    type: "Verbo",
    category: "Wetter",
    regimen: "Impersonal",
    en: "fluffy cloud dropping snowflakes",
    exampleSentenceDe: "Im Winter schneit es oft.",
    exampleSentenceEs: "En invierno nieva a menudo.",
    exampleSentenceDeBlocks: [
      { text: "Im Winter", role: "subject", order: 1 },
      { text: "schneit", role: "verb_p1", order: 2 },
      { text: "es oft", role: "complement", order: 3 }
    ]
  }, {
        de: "scheinen",
    pron: "shái-nen",
    es: "brillar (sol)",
    type: "Verbo",
    category: "Wetter",
    regimen: "Intransitivo",
    en: "bright yellow sun shining",
    exampleSentenceDe: "Die Sonne scheint heute.",
    exampleSentenceEs: "El sol brilla hoy.",
    exampleSentenceDeBlocks: [
      { text: "Die Sonne", role: "subject", order: 1 },
      { text: "scheint", role: "verb_p1", order: 2 },
      { text: "heute", role: "complement", order: 3 }
    ]
  }, {
        de: "frieren",
    pron: "frí-ren",
    es: "tener frío / congelarse",
    type: "Verbo",
    category: "Wetter",
    regimen: "Irregular (friert)",
    en: "frozen ice block",
    exampleSentenceDe: "Ich friere sehr.",
    exampleSentenceEs: "Tengo mucho frío.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "friere", role: "verb_p1", order: 2 },
      { text: "sehr", role: "complement", order: 3 }
    ]
  }, {
        de: "der Nebel",
    pron: "dea né-bel",
    es: "la niebla",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Nebel",
    en: "thick gray fog",
    exampleSentenceDe: "Der Nebel is sehr dicht.",
    exampleSentenceEs: "La niebla es muy densa.",
    exampleSentenceDeBlocks: [
      { text: "Der Nebel", role: "subject", order: 1 },
      { text: "is", role: "verb_p1", order: 2 },
      { text: "sehr dicht", role: "complement", order: 3 }
    ]
  }, {
        de: "der Sturm",
    pron: "dea shturm",
    es: "la tormenta",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Stürme",
    en: "strong wind blowing trees",
    exampleSentenceDe: "Ein Sturm kommt.",
    exampleSentenceEs: "Viene una tormenta.",
    exampleSentenceDeBlocks: [
      { text: "Ein Sturm", role: "subject", order: 1 },
      { text: "kommt", role: "verb_p1", order: 2 }
    ]
  }, {
        de: "kühl",
    pron: "kül",
    es: "fresco",
    type: "Adjetivo",
    category: "Wetter",
    en: "cool autumn breeze",
    exampleSentenceDe: "Es ist heute kühl.",
    exampleSentenceEs: "Hoy hace fresco.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heute kühl", role: "complement", order: 3 }
    ]
  }, {
        de: "warm",
    pron: "varm",
    es: "cálido",
    type: "Adjetivo",
    category: "Wetter",
    en: "warm glowing sun",
    exampleSentenceDe: "Das Wasser ist warm.",
    exampleSentenceEs: "El agua está cálida.",
    exampleSentenceDeBlocks: [
      { text: "Das Wasser", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "warm", role: "complement", order: 3 }
    ]
  }, {
        de: "nass",
    pron: "nas",
    es: "mojado",
    type: "Adjetivo",
    category: "Wetter",
    en: "water drops",
    exampleSentenceDe: "Der Boden ist nass.",
    exampleSentenceEs: "El suelo está mojado.",
    exampleSentenceDeBlocks: [
      { text: "Der Boden", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nass", role: "complement", order: 3 }
    ]
  }, {
        de: "trocken",
    pron: "tró-ken",
    es: "seco",
    type: "Adjetivo",
    category: "Wetter",
    en: "dry cracked earth",
    exampleSentenceDe: "Die Kleidung ist trocken.",
    exampleSentenceEs: "La ropa está seca.",
    exampleSentenceDeBlocks: [
      { text: "Die Kleidung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "trocken", role: "complement", order: 3 }
    ]
  }, {
        de: "der Blitz",
    pron: "dea blits",
    es: "el relámpago",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Blitze",
    en: "yellow lightning bolt",
    exampleSentenceDe: "Ich sehe den Blitz.",
    exampleSentenceEs: "Veo el relámpago.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "den Blitz", role: "complement", order: 3 }
    ]
  }, {
        de: "der Donner",
    pron: "dea dó-ner",
    es: "el trueno",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Donner",
    en: "dark thundercloud",
    exampleSentenceDe: "Ich höre den Donner.",
    exampleSentenceEs: "Escucho el trueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "höre", role: "verb_p1", order: 2 },
      { text: "den Donner", role: "complement", order: 3 }
    ]
  },
  {
    de: "der Strand",
    pron: "dea shtrant",
    es: "la playa",
    type: "Sustantivo",
    category: "Natur",
    plural: "die Strände",
    en: "a sandy beach with a colorful sun umbrella",
    exampleSentenceDe: "Wir machen Urlaub am Strand.",
    exampleSentenceEs: "Nosotros pasamos las vacaciones en la playa.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "machen", role: "verb_p1", order: 2 },
      { text: "Urlaub am Strand", role: "complement", order: 3 }
    ]
  }, {
        de: "der Berg",
    pron: "dea beark",
    es: "la montaña",
    type: "Sustantivo",
    category: "Natur",
    plural: "die Berge",
    en: "a high mountain with a snowy peak",
    exampleSentenceDe: "Wir wandern oft in den Bergen.",
    exampleSentenceEs: "Hacemos senderismo a menudo en las montañas.",
    exampleSentenceDeBlocks: [
      { text: "Wir wandern", role: "subject", order: 1 },
      { text: "oft", role: "verb_p1", order: 2 },
      { text: "in den Bergen", role: "complement", order: 3 }
    ]
  }, {
        de: "die Wolke",
    pron: "di vol-ke",
    es: "la nube",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Wolken",
    en: "a fluffy white cloud",
    exampleSentenceDe: "Es gibt heute viele Wolken am Himmel.",
    exampleSentenceEs: "Hoy hay muchas nubes en el cielo.",
    exampleSentenceDeBlocks: [
      { text: "Es", role: "subject", order: 1 },
      { text: "gibt", role: "verb_p1", order: 2 },
      { text: "heute viele Wolken am Himmel", role: "complement", order: 3 }
    ]
  }, {
        de: "das Gewitter",
    pron: "das gue-vi-ta",
    es: "la tormenta",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Gewitter",
    en: "a dark storm cloud with a yellow lightning bolt",
    exampleSentenceDe: "Heute Abend gibt es ein Gewitter.",
    exampleSentenceEs: "Esta noche habrá una tormenta.",
    exampleSentenceDeBlocks: [
      { text: "Heute Abend", role: "subject", order: 1 },
      { text: "gibt", role: "verb_p1", order: 2 },
      { text: "es ein Gewitter", role: "complement", order: 3 }
    ]
  },
    {
      de: "die Haltestelle",
      pron: "di jál-te-shté-le",
      es: "parada de bus o tranvía",
      type: "Sustantivo (Fem)",
      category: "Verkehr",
      regimen: "-",
      plural: "die Haltestellen",
      exampleSentenceDe: "Wir steigen an der nächsten Haltestelle aus.",
      exampleSentenceEs: "Nos bajamos en la próxima parada.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "steigen", role: "verb_p1", order: 2 },
      { text: "an der nächsten Haltestelle", role: "complement", order: 3 },
      { text: "aus", role: "verb_p2", order: 4 }
    ],
      en: "round bus stop sign shelter on sidewalk"
    },
    {
      de: "der Bahnsteig",
      pron: "dea bán-shtaik",
      es: "andén ferroviario",
      type: "Sustantivo (Masc)",
      category: "Verkehr",
      regimen: "-",
      plural: "die Bahnsteige",
      exampleSentenceDe: "Der Zug nach Berlin fährt am Bahnsteig 4 ein.",
      exampleSentenceEs: "El tren a Berlín entra por el andén 4.",
    exampleSentenceDeBlocks: [
      { text: "Der Zug nach Berlin", role: "subject", order: 1 },
      { text: "fährt", role: "verb_p1", order: 2 },
      { text: "am Bahnsteig 4", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
      en: "train station concrete platform with waiting passengers"
    },
    {
      de: "das Gleis",
      pron: "das glais",
      es: "vía de tren",
      type: "Sustantivo (Neutro)",
      category: "Verkehr",
      regimen: "-",
      plural: "die Gleise",
      exampleSentenceDe: "Vorsicht an Gleis 2, der Zug fährt durch!",
      exampleSentenceEs: "¡Atención en la vía 2, el tren pasa de largo!",
    exampleSentenceDeBlocks: [
      { text: "Vorsicht an Gleis 2, der Zug", role: "subject", order: 1 },
      { text: "fährt", role: "verb_p1", order: 2 },
      { text: "durch", role: "complement", order: 3 }
    ],
      en: "parallel train railroad steel tracks"
    },
    {
      de: "der Fahrplan",
      pron: "dea fár-plan",
      es: "horario de transporte",
      type: "Sustantivo (Masc)",
      category: "Verkehr",
      regimen: "-",
      plural: "die Fahrpläne",
      exampleSentenceDe: "Laut Fahrplan kommt der Bus alle zehn Minuten.",
      exampleSentenceEs: "Según el horario, el autobús pasa cada diez minutos.",
    exampleSentenceDeBlocks: [
      { text: "Laut Fahrplan", role: "subject", order: 1 },
      { text: "kommt", role: "verb_p1", order: 2 },
      { text: "der Bus alle zehn Minuten", role: "complement", order: 3 }
    ],
      en: "printed timetable board with departure arrival times"
    },
    {
      de: "entwerten",
      pron: "ent-vér-ten",
      es: "validar / picar billete",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Bitte entwerten Sie Ihr Ticket vor dem Einsteigen.",
      exampleSentenceEs: "Por favor, valide su billete antes de subir.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "entwerten", role: "verb_p1", order: 2 },
      { text: "Sie Ihr Ticket vor dem Einsteigen", role: "complement", order: 3 }
    ],
      en: "inserting paper transit ticket into small red validator box"
    },
    {
      de: "aus|fallen",
      pron: "áus-fa-len",
      es: "cancelarse / anularse",
      type: "Verbo separable",
      category: "Status",
      regimen: "Separable (aus-) / + sein",
      plural: "-",
      exampleSentenceDe: "Mein Zug nach Köln fällt heute leider aus.",
      exampleSentenceEs: "Lamentablemente mi tren a Colonia se cancela hoy.",
    exampleSentenceDeBlocks: [
      { text: "Mein Zug nach Köln", role: "subject", order: 1 },
      { text: "fällt", role: "verb_p1", order: 2 },
      { text: "heute leider", role: "complement", order: 3 },
      { text: "aus", role: "verb_p2", order: 4 }
    ],
      en: "digital departure screen showing flashing red CANCELLED"
    },
    {
      de: "die Durchsage",
      pron: "di dúrj-sá-gue",
      es: "anuncio por megafonía",
      type: "Sustantivo (Fem)",
      category: "Verkehr",
      regimen: "-",
      plural: "die Durchsagen",
      exampleSentenceDe: "Bitte achten Sie auf die Durchsage am Bahnsteig.",
      exampleSentenceEs: "Por favor, preste atención al aviso por megafonía en el andén.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "achten", role: "verb_p1", order: 2 },
      { text: "Sie auf die Durchsage am Bahnsteig", role: "complement", order: 3 }
    ],
      en: "public address station speaker horn emitting audio soundwaves"
    },
    {
      de: "die Verbindung",
      pron: "di fea-bín-dung",
      es: "conexión de transporte",
      type: "Sustantivo (Fem)",
      category: "Verkehr",
      regimen: "-",
      plural: "die Verbindungen",
      exampleSentenceDe: "Ich habe eine gute Verbindung mit nur einem Umstieg.",
      exampleSentenceEs: "Tengo una buena conexión con solo un transbordo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine gute Verbindung mit nur einem Umstieg", role: "complement", order: 3 }
    ],
      en: "metro subway map connection lines interlocking"
    },
    {
      de: "verboten",
      pron: "fea-bó-ten",
      es: "prohibido",
      type: "Adjetivo",
      category: "Status",
      regimen: "≠ erlaubt",
      plural: "-",
      exampleSentenceDe: "Rauchen ist hier streng verboten.",
      exampleSentenceEs: "Fumar está estrictamente prohibido aquí.",
    exampleSentenceDeBlocks: [
      { text: "Rauchen", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hier streng verboten", role: "complement", order: 3 }
    ],
      en: "red circular prohibition sign with diagonal slash"
    },
    {
      de: "erlaubt",
      pron: "ea-láupt",
      es: "permitido",
      type: "Adjetivo",
      category: "Status",
      regimen: "≠ verboten",
      plural: "-",
      exampleSentenceDe: "Parken ist hier nur für zwei Stunden erlaubt.",
      exampleSentenceEs: "Aparcar aquí está permitido solo por dos horas.",
    exampleSentenceDeBlocks: [
      { text: "Parken", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hier nur für zwei Stunden erlaubt", role: "complement", order: 3 }
    ],
      en: "green circular permission sign with white checkmark"
    },
    {
      de: "buchen",
      pron: "bú-jen",
      es: "reservar",
      type: "Verbo",
      category: "Reise",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Wir müssen das Hotelzimmer rechtzeitig buchen.",
      exampleSentenceEs: "Tenemos que reservar la habitación de hotel a tiempo.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "müssen", role: "verb_p1", order: 2 },
      { text: "das Hotelzimmer rechtzeitig", role: "complement", order: 3 },
      { text: "buchen", role: "verb_p2", order: 4 }
    ],
      en: "booking hotel room on smartphone screen"
    },
    {
      de: "stornieren",
      pron: "shtor-ní-ren",
      es: "cancelar / anular reserva",
      type: "Verbo",
      category: "Reise",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Kann ich die Reise kostenlos stornieren?",
      exampleSentenceEs: "¿Puedo cancelar el viaje gratis?",
    exampleSentenceDeBlocks: [
      { text: "Kann", role: "verb_p1", order: 1 },
      { text: "ich", role: "subject", order: 2 },
      { text: "die Reise kostenlos", role: "complement", order: 3 },
      { text: "stornieren", role: "verb_p2", order: 4 }
    ],
      en: "cancelling flight booking with red cancel stamp"
    },
    {
      de: "mit|nehmen",
      pron: "mít-né-men",
      es: "llevar consigo / llevarse",
      type: "Verbo separable",
      category: "Aktionen",
      regimen: "Separable (mit-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Kannst du bitte einen Regenschirm mitnehmen?",
      exampleSentenceEs: "¿Puedes llevarte un paraguas por favor?",
    exampleSentenceDeBlocks: [
      { text: "Kannst", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "bitte einen Regenschirm", role: "complement", order: 3 },
      { text: "mitnehmen", role: "verb_p2", order: 4 }
    ],
      en: "person taking folded umbrella leaving house"
    },
    {
      de: "mit|kommen",
      pron: "mít-kó-men",
      es: "venir / acompañar",
      type: "Verbo separable",
      category: "Aktionen",
      regimen: "Separable (mit-) / + sein",
      plural: "-",
      exampleSentenceDe: "Kommst du mit zum Supermarkt?",
      exampleSentenceEs: "¿Vienes conmigo al supermercado?",
    exampleSentenceDeBlocks: [
      { text: "Kommst", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "mit zum Supermarkt", role: "complement", order: 3 }
    ],
      en: "two happy walking buddies walking side by side"
    },
    {
      de: "ab|schließen",
      pron: "áp-shlí-sen",
      es: "cerrar con llave",
      type: "Verbo separable",
      category: "Aktionen",
      regimen: "Separable (ab-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Bitte die Haustür nachts immer abschließen.",
      exampleSentenceEs: "Por favor, cierre siempre con llave la puerta de la casa de noche.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "verb_p1", order: 1 },
      { text: "die Haustür", role: "subject", order: 2 },
      { text: "nachts immer abschließen", role: "complement", order: 3 }
    ],
      en: "turning shiny metal key locking heavy front entrance door"
    }]
},
{
  id: 13,
  title: "Kapitel 13: Fahrschuldeutsch: Auto",
  icon: <Car size={20} />,
  emoji: "🚗",
  words: [{
    de: "das Benzin / der Tank",
    pron: "das ben-tsín  dea tank",
    es: "gasolina / tanque",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Das Auto ist voll. Ich brauche das Benzin für den Tank.",
    exampleSentenceEs: "El coche está lleno. Necesito la gasolina para el tanque.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "voll", role: "complement", order: 3 }
    ],
    plural: "die Tanks"
  }, {
    de: "der Blinker / blinken",
    pron: "dea blín-ka  blín-ken",
    es: "direccional / poner intermitente",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Ich bin im Auto. Ich blinke nach rechts.",
    exampleSentenceEs: "Estoy en el coche. Pongo el intermitente a la derecha.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "im Auto", role: "complement", order: 3 }
    ],
    regimen: "Intransitivo"
  }, {
    de: "die Bremse / bremsen",
    pron: "di brém-se  brém-sen",
    es: "freno / frenar",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Ich sehe die Bremse. Ich bremse.",
    exampleSentenceEs: "Veo el freno. Yo freno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "die Bremse", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "das Bremspedal",
    pron: "das brems-pe-dál",
    es: "pedal de freno",
    type: "Sustantivo (Neutro)",
    category: "Teile",
    exampleSentenceDe: "Das Bremspedal ist wichtig.",
    exampleSentenceEs: "El pedal de freno es importante.",
    exampleSentenceDeBlocks: [
      { text: "Das Bremspedal", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "wichtig", role: "complement", order: 3 }
    ],
    plural: "die Bremspedale"
  }, {
    de: "die Gangschaltung",
    pron: "di gáng-shal-tung",
    es: "caja de cambios",
    type: "Sustantivo (Fem)",
    category: "Teile",
    exampleSentenceDe: "Ich habe ein Problem mit der Gangschaltung.",
    exampleSentenceEs: "Tengo un problema con la caja de cambios.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Problem mit der Gangschaltung", role: "complement", order: 3 }
    ],
    plural: "die Gangschaltungen"
  }, {
    de: "das Gaspedal",
    pron: "das gás-pe-dál",
    es: "acelerador",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich sehe das Gaspedal im Auto.",
    exampleSentenceEs: "Yo veo el acelerador en el coche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "das Gaspedal im Auto", role: "complement", order: 3 }
    ],
    plural: "die Gaspedale"
  }, {
    de: "Gas geben",
    pron: "gas-gué-ben",
    es: "acelerar",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Bitte gib Gas auf der Autobahn.",
    exampleSentenceEs: "Por favor, acelera en la autopista.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "gib", role: "verb_p1", order: 2 },
      { text: "Gas auf der Autobahn", role: "complement", order: 3 }
    ],
    regimen: "geben+Akk., verbo separable"
  }, {
    de: "der Fahrer / fahren",
    pron: "dea fá-rea  fá-ren",
    es: "conductor / conducir",
    type: "Sust / Verbo",
    category: "Allgemein",
    exampleSentenceDe: "Ich sehe den Fahrer. Der Fahrer fährt das Auto.",
    exampleSentenceEs: "Veo al conductor. El conductor conduce el coche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "den Fahrer", role: "complement", order: 3 }
    ],
    regimen: "Irregular (fährt)"
  }, {
    de: "die Hupe / hupen",
    pron: "di jú-pe  jú-pen",
    es: "bocina / tocar bocina",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Die Hupe ist laut.",
    exampleSentenceEs: "La bocina es ruidosa.",
    exampleSentenceDeBlocks: [
      { text: "Die Hupe", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "laut", role: "verb_p2", order: 3 }
    ],
    regimen: "No separable, sin caso"
  }, {
    de: "der Kraftstoff",
    pron: "dea kráft-shtof",
    es: "combustible",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich brauche den Kraftstoff für das Auto.",
    exampleSentenceEs: "Necesito el combustible para el coche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "den Kraftstoff für das Auto", role: "complement", order: 3 }
    ],
    plural: "die Kraftstoffe"
  }, {
    de: "das Lenkrad / lenken",
    pron: "das lénk-rat  lén-ken",
    es: "volante / girar volante",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Ich habe das Lenkrad. Ich kann das Lenkrad lenken.",
    exampleSentenceEs: "Tengo el volante. Puedo girar el volante.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Lenkrad", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "der Motor",
    pron: "dea mo-tóa",
    es: "motor",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Ich sehe den Motor. Der Motor ist neu.",
    exampleSentenceEs: "Yo veo el motor. El motor es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "den Motor", role: "complement", order: 3 }
    ],
    plural: "die Motoren"
  }, {
    de: "der Rückspiegel",
    pron: "dea rúk-shpí-guel",
    es: "espejo retrovisor",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Ich sehe den Rückspiegel. Der Rückspiegel ist klein.",
    exampleSentenceEs: "Veo el espejo retrovisor. El espejo retrovisor es pequeño.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "den Rückspiegel", role: "complement", order: 3 }
    ],
    plural: "die Rückspiegel"
  }, {
    de: "der Sicherheitsgurt",
    pron: "dea sí-jea-jaits-gurt",
    es: "cinturón de seguridad",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Der Sicherheitsgurt ist wichtig.",
    exampleSentenceEs: "El cinturón de seguridad es importante.",
    exampleSentenceDeBlocks: [
      { text: "Der Sicherheitsgurt", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "wichtig", role: "complement", order: 3 }
    ],
    plural: "die Sicherheitsgurte"
  }, {
    de: "die Kupplung",
    pron: "di kúp-lung",
    es: "embrague",
    type: "Sustantivo (Fem)",
    category: "Teile",
    exampleSentenceDe: "Ich brauche die Kupplung.",
    exampleSentenceEs: "Yo necesito el embrague.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Kupplung", role: "complement", order: 3 }
    ],
    plural: "die Kupplungen"
  }, {
    de: "die Felge",
    pron: "di fél-gue",
    es: "rin",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Das Auto hat vier Felgen.",
    exampleSentenceEs: "El coche tiene cuatro rines.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "vier Felgen", role: "complement", order: 3 }
    ],
    plural: "die Felgen"
  }, {
    de: "die Handbremse",
    pron: "di jánt-brem-se",
    es: "freno de mano",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich ziehe die Handbremse an.",
    exampleSentenceEs: "Tiro del freno de mano.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "die Handbremse", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    plural: "die Handbremsen"
  }, {
    de: "der Schalthebel",
    pron: "dea shált-jé-bel",
    es: "palanca de cambios",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Der Schalthebel ist hier.",
    exampleSentenceEs: "La palanca de cambios está aquí.",
    exampleSentenceDeBlocks: [
      { text: "Der Schalthebel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    plural: "die Schalthebel"
  }, {
    de: "der Scheibenwischer",
    pron: "dea shái-ben-vi-shea",
    es: "limpiaparabrisas",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Ich sehe den Scheibenwischer.",
    exampleSentenceEs: "Yo veo el limpiaparabrisas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "den Scheibenwischer", role: "complement", order: 3 }
    ],
    plural: "die Scheibenwischer"
  }, {
    de: "der Lichtschalter",
    pron: "dea líjt-shal-tea",
    es: "interruptor de luces",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Wo ist der Lichtschalter?",
    exampleSentenceEs: "¿Dónde está el interruptor de luces?",
    exampleSentenceDeBlocks: [
      { text: "Wo", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Lichtschalter", role: "complement", order: 3 }
    ],
    plural: "die Lichtschalter"
  }, {
    de: "die Heizung",
    pron: "di hái-tsung",
    es: "calefacción",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Die Heizung ist an.",
    exampleSentenceEs: "La calefacción está encendida.",
    exampleSentenceDeBlocks: [
      { text: "Die Heizung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "an", role: "verb_p2", order: 3 }
    ],
    plural: "die Heizungen"
  }, {
    de: "das Abblendlicht",
    pron: "das áp-blent-lijt",
    es: "luz corta / baja",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Das Auto hat das Abblendlicht.",
    exampleSentenceEs: "El coche tiene la luz corta.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "das Abblendlicht", role: "complement", order: 3 }
    ],
    plural: "die Abblendlichter"
  }, {
    de: "das Fernlicht",
    pron: "das féan-lijt",
    es: "luz larga / alta",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Das Fernlicht ist an.",
    exampleSentenceEs: "La luz larga está encendida.",
    exampleSentenceDeBlocks: [
      { text: "Das Fernlicht", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "an", role: "verb_p2", order: 3 }
    ],
    plural: "die Fernlichter"
  }, {
    de: "die Bremsleuchte",
    pron: "di brems-lóij-te",
    es: "luz de freno",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Die Bremsleuchte ist rot.",
    exampleSentenceEs: "La luz de freno es roja.",
    exampleSentenceDeBlocks: [
      { text: "Die Bremsleuchte", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ],
    plural: "die Bremsleuchten"
  }, {
    de: "die Warnblinkanlage",
    pron: "di várn-blink-án-la-gue",
    es: "luces de emergencia",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Ich drücke die Warnblinkanlage.",
    exampleSentenceEs: "Yo pulso las luces de emergencia.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "drücke", role: "verb_p1", order: 2 },
      { text: "die Warnblinkanlage", role: "complement", order: 3 }
    ],
    plural: "die Warnblinkanlagen"
  }, {
    de: "die Nebelschlussleuchte",
    pron: "di né-bel-shlús-loich-te",
    es: "luz antiniebla trasera",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Der Wagen hat die Nebelschlussleuchte.",
    exampleSentenceEs: "El coche tiene la luz antiniebla trasera.",
    exampleSentenceDeBlocks: [
      { text: "Der Wagen", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "die Nebelschlussleuchte", role: "complement", order: 3 }
    ],
    plural: "die Nebelschlussleuchten"
  }, {
    de: "das Tagfahrlicht",
    pron: "das ták-far-lijt",
    es: "luz diurna",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Das Tagfahrlicht ist neu.",
    exampleSentenceEs: "La luz diurna es nueva.",
    exampleSentenceDeBlocks: [
      { text: "Das Tagfahrlicht", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Tagfahrlichter"
  }, {
    de: "betanken",
    pron: "be-tán-ken",
    es: "repostar gasolina",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich muss das Auto betanken.",
    exampleSentenceEs: "Tengo que repostar gasolina el coche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "das Auto", role: "complement", order: 3 },
      { text: "betanken", role: "verb_p2", order: 4 }
    ],
    regimen: "Inseparable / + Akkusativ"
  }, {
    de: "überholen",
    pron: "ü-ba-jó-len",
    es: "adelantar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Der Bus überholt das Auto.",
    exampleSentenceEs: "El autobús adelanta al coche.",
    exampleSentenceDeBlocks: [
      { text: "Der Bus", role: "subject", order: 1 },
      { text: "überholt", role: "verb_p1", order: 2 },
      { text: "das Auto", role: "complement", order: 3 }
    ],
    regimen: "No separable, + Akk."
  }, {
    de: "einsteigen / aussteigen",
    pron: "áin-shtái-guen  áus-shtái-guen",
    es: "subir / bajar del coche",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Wir steigen in das Auto ein.",
    exampleSentenceEs: "Nosotros subimos al coche.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "steigen", role: "verb_p1", order: 2 },
      { text: "in das Auto", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    regimen: "Sep. (ein-/aus-) + in/aus Akk"
  }, {
    de: "aufschließen",
    pron: "áuf-shlí-sen",
    es: "abrir con llave",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich schließe die Tür auf.",
    exampleSentenceEs: "Yo abro la puerta con llave.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schließe", role: "verb_p1", order: 2 },
      { text: "die Tür", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (auf-), +Akk"
  }, {
    de: "anhalten / halten / parken",
    pron: "án-jal-ten  hál-ten  párken",
    es: "parar / detenerse / parquear",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Hier halten wir.",
    exampleSentenceEs: "Aquí paramos.",
    exampleSentenceDeBlocks: [
      { text: "Hier", role: "subject", order: 1 },
      { text: "halten", role: "verb_p1", order: 2 },
      { text: "wir", role: "verb_p2", order: 3 }
    ],
    regimen: "anhalten separable, +Akk"
  }, {
    de: "die Vorfahrt",
    pron: "di fóa-fa-at",
    es: "prioridad",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich habe die Vorfahrt.",
    exampleSentenceEs: "Yo tengo la prioridad.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Vorfahrt", role: "complement", order: 3 }
    ],
    plural: "die Vorfahrten"
  }, {
    de: "aufpassen",
    pron: "áuf-pa-sen",
    es: "prestar atención",
    type: "Verbo separable",
    category: "Verkehr",
    exampleSentenceDe: "Pass auf, bitte!",
    exampleSentenceEs: "¡Presta atención, por favor!",
    exampleSentenceDeBlocks: [
      { text: "Pass", role: "subject", order: 1 },
      { text: "auf,", role: "verb_p1", order: 2 },
      { text: "bitte", role: "verb_p2", order: 3 }
    ],
    regimen: "Separable (auf-), + auf+Akk"
  }, {
    de: "Motor starten",
    pron: "mo-tóa shtár-ten",
    es: "prender el motor",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Ich starte den Motor.",
    exampleSentenceEs: "Yo prendo el motor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "starte", role: "verb_p1", order: 2 },
      { text: "den Motor", role: "complement", order: 3 }
    ],
    regimen: "Verbo + objeto"
  }, {
    de: "sich anschnallen",
    pron: "zij án-shná-len",
    es: "ponerse el cinturón",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich muss mich im Auto anschnallen.",
    exampleSentenceEs: "Tengo que ponerme el cinturón en el coche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "mich im Auto", role: "complement", order: 3 },
      { text: "anschnallen", role: "verb_p2", order: 4 }
    ],
    regimen: "Reflexivo, separable (an-)"
  }, {
    de: "beschleunigen",
    pron: "be-shlói-ni-guen",
    es: "acelerar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Das Auto beschleunigt.",
    exampleSentenceEs: "El coche acelera.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "beschleunigt", role: "verb_p1", order: 2 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "abschleppen",
    pron: "áp-shlé-pen",
    es: "remolcar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich lasse das Auto abschleppen.",
    exampleSentenceEs: "Yo dejo remolcar el coche.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lasse", role: "verb_p1", order: 2 },
      { text: "das Auto abschleppen", role: "complement", order: 3 }
    ],
    regimen: "Separable, +Akkusativ"
  }, {
    de: "zusammenstoßen",
    pron: "tsu-sá-men-shtó-sen",
    es: "chocar",
    type: "Verbo",
    category: "Verkehr",
    exampleSentenceDe: "Wir stoßen zusammen.",
    exampleSentenceEs: "Nos chocamos.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "stoßen", role: "verb_p1", order: 2 },
      { text: "zusammen", role: "verb_p2", order: 3 }
    ],
    regimen: "Separable (zusammen-)"
  }, {
    de: "der Schaden",
    pron: "dea shá-den",
    es: "daño",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Der Schaden ist groß.",
    exampleSentenceEs: "El daño es grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Schaden", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Schäden"
  }, {
    de: "das Motoröl",
    pron: "das mó-tor-öl",
    es: "aceite de motor",
    type: "Sustantivo",
    category: "Flüssigkeiten",
    exampleSentenceDe: "Das ist das Motoröl.",
    exampleSentenceEs: "Este es el aceite de motor.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das Motoröl", role: "complement", order: 3 }
    ],
    plural: "die Motoröle"
  }, {
    de: "der Reifendruck",
    pron: "dea rái-fen-druk",
    es: "presión neumáticos",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Der Reifendruck ist gut.",
    exampleSentenceEs: "La presión de los neumáticos es buena.",
    exampleSentenceDeBlocks: [
      { text: "Der Reifendruck", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Reifendrücke"
  }, {
    de: "der Reifen",
    pron: "dea rái-fen",
    es: "llanta",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Der Reifen ist neu.",
    exampleSentenceEs: "La llanta es nueva.",
    exampleSentenceDeBlocks: [
      { text: "Der Reifen", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Reifen"
  }, {
    de: "der Pkw / der Lkw",
    pron: "dea pé-ka-vé  dea él-ka-vé",
    es: "carro / camión",
    type: "Sustantivo",
    category: "Fahrzeuge",
    exampleSentenceDe: "Das ist ein Pkw. Der Pkw ist neu.",
    exampleSentenceEs: "Este es un coche. El coche es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Pkw", role: "complement", order: 3 }
    ],
    plural: "die Pkws / die Lkws"
  }, {
    de: "der Fußgänger",
    pron: "dea fús-guen-gua",
    es: "peatón",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Der Fußgänger ist hier.",
    exampleSentenceEs: "El peatón está aquí.",
    exampleSentenceDeBlocks: [
      { text: "Der Fußgänger", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    plural: "die Fußgänger"
  }, {
    de: "die Ampel / Kreuzung",
    pron: "di ám-pel  krói-tsung",
    es: "semáforo / cruce",
    type: "Sustantivo (Fem)",
    category: "Verkehr",
    exampleSentenceDe: "Die Ampel ist grün.",
    exampleSentenceEs: "El semáforo está en verde.",
    exampleSentenceDeBlocks: [
      { text: "Die Ampel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "grün", role: "complement", order: 3 }
    ],
    plural: "die Ampeln / Kreuzungen"
  }, {
    de: "das Fahrzeug",
    pron: "das fá-a-tsoik",
    es: "el vehículo",
    type: "Sustantivo (Neutro)",
    category: "Fahrzeuge",
    exampleSentenceDe: "Das Fahrzeug ist neu.",
    exampleSentenceEs: "El vehículo es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das Fahrzeug", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Fahrzeuge"
  }, {
    de: "der Verkehr / Stau",
    pron: "dea fea-kéa  shtáu",
    es: "el tráfico / trancón",
    type: "Sustantivo (Masc)",
    category: "Verkehr",
    exampleSentenceDe: "Der Verkehr ist heute nicht gut.",
    exampleSentenceEs: "El tráfico no está bueno hoy.",
    exampleSentenceDeBlocks: [
      { text: "Der Verkehr", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heute nicht gut", role: "complement", order: 3 }
    ],
    plural: "die Staus"
  }, {
    de: "das Verkehrsschild",
    pron: "das fea-kéas-shilt",
    es: "señal de tráfico",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Das Verkehrsschild ist rot.",
    exampleSentenceEs: "La señal de tráfico es roja.",
    exampleSentenceDeBlocks: [
      { text: "Das Verkehrsschild", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ],
    plural: "die Verkehrsschilder"
  }, {
    de: "die Geschwindigkeit",
    pron: "di gue-shvín-dij-kait",
    es: "velocidad",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Geschwindigkeit ist hoch.",
    exampleSentenceEs: "La velocidad es alta.",
    exampleSentenceDeBlocks: [
      { text: "Die Geschwindigkeit", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hoch", role: "complement", order: 3 }
    ],
    plural: "die Geschwindigkeiten"
  }, {
    de: "die Spur",
    pron: "di shpúa",
    es: "carril",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Das Auto ist auf der Spur.",
    exampleSentenceEs: "El coche está en el carril.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "auf der Spur", role: "complement", order: 3 }
    ],
    plural: "die Spuren"
  }, {
    de: "die Warnleuchten",
    pron: "di várn-loij-ten",
    es: "luces de advertencia",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Die Warnleuchten sind an.",
    exampleSentenceEs: "Las luces de advertencia están encendidas.",
    exampleSentenceDeBlocks: [
      { text: "Die Warnleuchten", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "an", role: "verb_p2", order: 3 }
    ],
    plural: "die Warnleuchten"
  }, {
    de: "die Baustelle",
    pron: "di báu-shté-le",
    es: "obra de cons.",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Baustelle ist groß.",
    exampleSentenceEs: "La obra es grande.",
    exampleSentenceDeBlocks: [
      { text: "Die Baustelle", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Baustellen"
  }, {
    de: "die Sicherheit",
    pron: "di sí-cha-jait",
    es: "seguridad",
    type: "Sustantivo",
    category: "Allgemein",
    exampleSentenceDe: "Die Sicherheit ist wichtig.",
    exampleSentenceEs: "La seguridad es importante.",
    exampleSentenceDeBlocks: [
      { text: "Die Sicherheit", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "wichtig", role: "complement", order: 3 }
    ],
    plural: "die Sicherheiten"
  }, {
    de: "Toter Winkel",
    pron: "tó-tea vín-kel",
    es: "ángulo muerto",
    type: "Frase",
    category: "Verkehr",
    exampleSentenceDe: "Der tote Winkel ist gefährlich.",
    exampleSentenceEs: "El ángulo muerto es peligroso.",
    exampleSentenceDeBlocks: [
      { text: "Der", role: "subject", order: 1 },
      { text: "tote", role: "verb_p1", order: 2 },
      { text: "Winkel ist", role: "complement", order: 3 },
      { text: "gefährlich", role: "verb_p2", order: 4 }
    ],
    regimen: "der tote Winkel"
  }, {
    de: "Schulterblick",
    pron: "shúl-tea-blik",
    es: "mirada sobre hombro",
    type: "Frase",
    category: "Verkehr",
    exampleSentenceDe: "Ich mache einen Schulterblick.",
    exampleSentenceEs: "Yo hago una mirada sobre hombro.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "einen Schulterblick", role: "complement", order: 3 }
    ],
    regimen: "Sustantivo compuesto"
  }, {
    de: "Rechts vor links",
    pron: "réjts-for-links",
    es: "derecha tiene preferencia",
    type: "Frase",
    category: "Verkehr",
    exampleSentenceDe: "An der Kreuzung gilt: Rechts vor links.",
    exampleSentenceEs: "En el cruce se aplica: la derecha tiene preferencia.",
    exampleSentenceDeBlocks: [
      { text: "An der Kreuzung", role: "subject", order: 1 },
      { text: "gilt:", role: "verb_p1", order: 2 },
      { text: "Rechts vor links", role: "complement", order: 3 }
    ],
    regimen: "Regla de tráfico"
  }, {
    de: "Motoröldruck",
    pron: "mó-to-a-öl-druk",
    es: "presión aceite (rojo)",
    type: "Sustantivo",
    category: "Anzeigen",
    exampleSentenceDe: "Der Motoröldruck ist gut.",
    exampleSentenceEs: "La presión del aceite del motor está bien.",
    exampleSentenceDeBlocks: [
      { text: "Der Motoröldruck", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Motoröldrücke"
  }, {
    de: "Kühlmitteltemperatur",
    pron: "kúl-mi-tel-tem-pe-ra-tú-a",
    es: "temp. refrigerante (rojo)",
    type: "Sustantivo",
    category: "Anzeigen",
    exampleSentenceDe: "Ich sehe die Kühlmitteltemperatur. Die Kühlmitteltemperatur ist rot.",
    exampleSentenceEs: "Veo la temperatura del refrigerante. La temperatura del refrigerante es roja.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "die Kühlmitteltemperatur", role: "complement", order: 3 }
    ],
    plural: "die Kühlmitteltemperaturen"
  }, {
    de: "das Schiebedach",
    pron: "das shí-be-daj",
    es: "techo corredizo",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich habe ein Auto. Das Auto hat ein Schiebedach.",
    exampleSentenceEs: "Yo tengo un coche. El coche tiene un techo corredizo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Auto", role: "complement", order: 3 }
    ],
    plural: "die Schiebedächer"
  }, {
    de: "der Auspuff",
    pron: "dea áus-puf",
    es: "escape",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Der Auspuff ist neu.",
    exampleSentenceEs: "El escape es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Der Auspuff", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Auspuffe"
  }, {
    de: "das Nummernschild",
    pron: "das nú-mean-shilt",
    es: "placa / matrícula",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich sehe das Nummernschild.",
    exampleSentenceEs: "Veo la matrícula.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "das Nummernschild", role: "complement", order: 3 }
    ],
    plural: "die Nummernschilder"
  }, {
    de: "die Windschutzscheibe",
    pron: "di vínt-shuts-shái-be",
    es: "parabrisas",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich brauche einen neuen Scheibenwischer für die Windschutzscheibe.",
    exampleSentenceEs: "Necesito un limpiaparabrisas nuevo para el parabrisas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "einen neuen Scheibenwischer für die Windschutzscheibe", role: "complement", order: 3 }
    ],
    plural: "die Windschutzscheiben"
  }, {
    de: "die Motorhaube",
    pron: "di mo-tóa-jáu-be",
    es: "capó",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Das Auto ist hier. Die Motorhaube ist offen.",
    exampleSentenceEs: "El coche está aquí. El capó está abierto.",
    exampleSentenceDeBlocks: [
      { text: "Das Auto", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "hier", role: "complement", order: 3 }
    ],
    plural: "die Motorhauben"
  }, {
    de: "die Stoßstange",
    pron: "di shtós-shtán-gue",
    es: "parachoques",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Das ist die Stoßstange. Die Stoßstange ist neu.",
    exampleSentenceEs: "Este es el parachoques. El parachoques es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Stoßstange", role: "complement", order: 3 }
    ],
    plural: "die Stoßstangen"
  }, {
    de: "der Kreisverkehr",
    pron: "dea kráis-fea-ke-a",
    es: "rotonda",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich fahre in den Kreisverkehr.",
    exampleSentenceEs: "Yo entro en la rotonda.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "fahre", role: "verb_p1", order: 2 },
      { text: "in den Kreisverkehr", role: "complement", order: 3 }
    ],
    plural: "die Kreisverkehre"
  }, {
    de: "die Einbahnstraße",
    pron: "di áin-ban-shtrá-se",
    es: "calle de un solo sentido",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Straße ist eine Einbahnstraße.",
    exampleSentenceEs: "La calle es una calle de sentido único.",
    exampleSentenceDeBlocks: [
      { text: "Die Straße", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "eine Einbahnstraße", role: "complement", order: 3 }
    ],
    plural: "die Einbahnstraßen"
  }, {
    de: "abbiegen",
    pron: "áp-bi-guen",
    es: "girar",
    type: "Verbo",
    category: "Verkehr",
    exampleSentenceDe: "Ich biege hier links ab.",
    exampleSentenceEs: "Yo giro aquí a la izquierda.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "biege", role: "verb_p1", order: 2 },
      { text: "hier links", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (ab-)"
  }, {
    de: "der Strafzettel",
    pron: "dea shtráf-tse-tel",
    es: "multa de tráfico",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich habe einen Strafzettel bekommen. Der Strafzettel ist teuer.",
    exampleSentenceEs: "Recibí una multa de tráfico. La multa de tráfico es cara.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Strafzettel bekommen", role: "complement", order: 3 }
    ],
    plural: "die Strafzettel"
  }, {
    de: "die Versicherung",
    pron: "di fea-sí-je-rung",
    es: "el seguro",
    type: "Sustantivo",
    category: "Allgemein",
    exampleSentenceDe: "Ich habe die Versicherung.",
    exampleSentenceEs: "Tengo el seguro.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Versicherung", role: "complement", order: 3 }
    ],
    plural: "die Versicherungen"
  }]
},
{
  id: 14,
  title: "Kapitel 14: Post & Bank",
  icon: <Mail size={20} />,
  emoji: "📮",
  words: [{
    de: "die Post",
    pron: "di post",
    es: "el correo",
    type: "Sustantivo (Fem)",
    category: "Post",
    exampleSentenceDe: "Ich brauche die Post.",
    exampleSentenceEs: "Yo necesito el correo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Post", role: "complement", order: 3 }
    ],
    plural: "die Post"
  }, {
    de: "der Brief",
    pron: "dea bríf",
    es: "carta",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich habe den Brief. Der Brief ist hier.",
    exampleSentenceEs: "Tengo la carta. La carta está aquí.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "den Brief", role: "complement", order: 3 }
    ],
    plural: "die Briefe"
  }, {
    de: "die Postkarte",
    pron: "di póst-kar-te",
    es: "tarjeta postal",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich kaufe die Postkarte im Supermarkt.",
    exampleSentenceEs: "Yo compro la postal en el supermercado.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kaufe", role: "verb_p1", order: 2 },
      { text: "die Postkarte im Supermarkt", role: "complement", order: 3 }
    ],
    plural: "die Postkarten"
  }, {
    de: "schicken",
    pron: "shí-ken",
    es: "enviar",
    type: "Verbo",
    category: "Post",
    exampleSentenceDe: "Ich schicke die E-Mail morgen.",
    exampleSentenceEs: "Yo envío el correo mañana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schicke", role: "verb_p1", order: 2 },
      { text: "die E-Mail morgen", role: "complement", order: 3 }
    ],
    regimen: "+ Dativo (a quién) / + Akkusativ (qué)"
  }, {
    de: "bekommen",
    pron: "be-kó-men",
    es: "recibir",
    type: "Verbo",
    category: "Post",
    exampleSentenceDe: "Ich bekomme ein Geschenk.",
    exampleSentenceEs: "Yo recibo un regalo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bekomme", role: "verb_p1", order: 2 },
      { text: "ein Geschenk", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "abholen",
    pron: "áp-jo-len",
    es: "recoger",
    type: "Verbo separable",
    category: "Post",
    exampleSentenceDe: "Ich hole dich am Bahnhof ab.",
    exampleSentenceEs: "Te recojo en la estación de tren.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "hole", role: "verb_p1", order: 2 },
      { text: "dich am Bahnhof", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    regimen: "+Akk, separable (ab-)"
  }, {
    de: "die Briefmarke",
    pron: "di bríf-mar-ke",
    es: "estampilla",
    type: "Sustantivo (Fem)",
    category: "Post",
    exampleSentenceDe: "Ich brauche die Briefmarke.",
    exampleSentenceEs: "Yo necesito la estampilla.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "die Briefmarke", role: "complement", order: 3 }
    ],
    plural: "die Briefmarken"
  }, {
    de: "der Absender",
    pron: "dea áp-sen-dea",
    es: "remitente",
    type: "Sustantivo (Masc)",
    category: "Post",
    exampleSentenceDe: "Wer ist der Absender?",
    exampleSentenceEs: "¿Quién es el remitente?",
    exampleSentenceDeBlocks: [
      { text: "Wer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Absender", role: "complement", order: 3 }
    ],
    plural: "die Absender"
  }, {
    de: "der Empfänger",
    pron: "dea em-pfén-gua",
    es: "destinatario",
    type: "Sustantivo (Masc)",
    category: "Post",
    exampleSentenceDe: "Wer ist der Empfänger?",
    exampleSentenceEs: "¿Quién es el destinatario?",
    exampleSentenceDeBlocks: [
      { text: "Wer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Empfänger", role: "complement", order: 3 }
    ],
    plural: "die Empfänger"
  }, {
    de: "die Adresse",
    pron: "di a-dré-se",
    es: "dirección",
    type: "Sustantivo (Fem)",
    category: "Post",
    exampleSentenceDe: "Das ist die Adresse.",
    exampleSentenceEs: "Esta es la dirección.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "die Adresse", role: "complement", order: 3 }
    ],
    plural: "die Adressen"
  }, {
    de: "das Telefon",
    pron: "das te-le-fón",
    es: "teléfono",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Das ist mein Telefon.",
    exampleSentenceEs: "Este es mi teléfono.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Telefon", role: "complement", order: 3 }
    ],
    plural: "die Telefone"
  }, {
    de: "das Handy",
    pron: "das jén-di",
    es: "celular",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe ein Handy. Das Handy ist neu.",
    exampleSentenceEs: "Tengo un celular. El celular es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Handy", role: "complement", order: 3 }
    ],
    plural: "die Handys"
  }, {
    de: "das Fax",
    pron: "das faks",
    es: "fax",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe ein Fax. Das Fax ist neu.",
    exampleSentenceEs: "Tengo un fax. El fax es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Fax", role: "complement", order: 3 }
    ],
    plural: "die Faxe"
  }, {
    de: "die Telefonnummer",
    pron: "di te-le-fón-nu-mea",
    es: "número de teléfono",
    type: "Sustantivo (Fem)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe die Telefonnummer. Die Telefonnummer ist neu.",
    exampleSentenceEs: "Tengo el número de teléfono. El número de teléfono es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Telefonnummer", role: "complement", order: 3 }
    ],
    plural: "die Telefonnummern"
  }, {
    de: "das Telefonbuch",
    pron: "das te-le-fón-buj",
    es: "guía telefónica",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich suche das Telefonbuch.",
    exampleSentenceEs: "Yo busco la guía telefónica.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "suche", role: "verb_p1", order: 2 },
      { text: "das Telefonbuch", role: "complement", order: 3 }
    ],
    plural: "die Telefonbücher"
  }, {
    de: "telefonieren",
    pron: "te-le-fo-ní-ren",
    es: "hablar por tel.",
    type: "Verbo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich telefoniere mit meiner Mutter.",
    exampleSentenceEs: "Yo hablo por teléfono con mi madre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "telefoniere", role: "verb_p1", order: 2 },
      { text: "mit meiner Mutter", role: "complement", order: 3 }
    ],
    regimen: "+ mit + Dativ"
  }, {
    de: "anrufen",
    pron: "án-ru-fen",
    es: "llamar",
    type: "Verbo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich rufe meine Mutter an.",
    exampleSentenceEs: "Yo llamo a mi madre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "rufe", role: "verb_p1", order: 2 },
      { text: "meine Mutter", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (an-) / + Akkusativ"
  }, {
    de: "sprechen (mit)",
    pron: "shpré-jen mit",
    es: "hablar con",
    type: "Verbo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich spreche mit meinem Freund.",
    exampleSentenceEs: "Yo hablo con mi amigo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "spreche", role: "verb_p1", order: 2 },
      { text: "mit meinem Freund", role: "complement", order: 3 }
    ],
    regimen: "mit + Dativ"
  }, {
    de: "besetzt",
    pron: "be-tséts",
    es: "ocupado (línea)",
    type: "Adjetivo",
    category: "Kommunikation",
    exampleSentenceDe: "Die Telefonleitung ist besetzt.",
    exampleSentenceEs: "La línea telefónica está ocupada.",
    exampleSentenceDeBlocks: [
      { text: "Die Telefonleitung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "besetzt", role: "complement", order: 3 }
    ],
    regimen: "≠ frei"
  }, {
    de: "die Bank",
    pron: "di bank",
    es: "banco",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich sitze auf der Bank.",
    exampleSentenceEs: "Yo me siento en el banco.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sitze", role: "verb_p1", order: 2 },
      { text: "auf der Bank", role: "complement", order: 3 }
    ],
    plural: "die Bänke"
  }, {
    de: "der Schalter",
    pron: "dea shál-tea",
    es: "ventanilla",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich gehe zum Schalter.",
    exampleSentenceEs: "Voy a la ventanilla.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "zum Schalter", role: "complement", order: 3 }
    ],
    plural: "die Schalter"
  }, {
    de: "das Geld",
    pron: "das guélt",
    es: "dinero",
    type: "Sustantivo (Neutro)",
    category: "Bank",
    exampleSentenceDe: "Das ist das Geld.",
    exampleSentenceEs: "Este es el dinero.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das Geld", role: "complement", order: 3 }
    ],
    plural: "kein Plural"
  }, {
    de: "bar zahlen",
    pron: "bá-a tsá-len",
    es: "pagar en efectivo",
    type: "Frase",
    category: "Bank",
    exampleSentenceDe: "Ich möchte bar zahlen.",
    exampleSentenceEs: "Quiero pagar en efectivo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "bar", role: "complement", order: 3 },
      { text: "zahlen", role: "verb_p2", order: 4 }
    ],
    regimen: "Verbo al final"
  }, {
    de: "die Kreditkarte",
    pron: "di kre-dít-kar-te",
    es: "tarjeta de crédito",
    type: "Sustantivo (Fem)",
    category: "Bank",
    exampleSentenceDe: "Ich habe die Kreditkarte. Die Kreditkarte ist rot.",
    exampleSentenceEs: "Tengo la tarjeta de crédito. La tarjeta de crédito es roja.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Kreditkarte", role: "complement", order: 3 }
    ],
    plural: "die Kreditkarten"
  }, {
    de: "das Konto",
    pron: "das kón-to",
    es: "cuenta",
    type: "Sustantivo (Neutro)",
    category: "Bank",
    exampleSentenceDe: "Ich habe das Konto.",
    exampleSentenceEs: "Tengo la cuenta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Konto", role: "complement", order: 3 }
    ],
    plural: "die Konten"
  }, {
    de: "überweisen",
    pron: "ú-ba-vái-sen",
    es: "transferir dinero",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich überweise Geld auf das Konto.",
    exampleSentenceEs: "Yo transfiero dinero a la cuenta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "überweise", role: "verb_p1", order: 2 },
      { text: "Geld auf das Konto", role: "complement", order: 3 }
    ],
    regimen: "Inseparable / + Akkusativ"
  }, {
    de: "das Formular",
    pron: "das foa-mu-lá",
    es: "formulario",
    type: "Sustantivo",
    category: "Bank",
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
    pron: "áus-fü-len",
    es: "rellenar",
    type: "Verbo",
    category: "Bank",
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
    de: "ankreuzen",
    pron: "án-krói-tsen",
    es: "marcar con cruz",
    type: "Verbo separable",
    category: "Bank",
    exampleSentenceDe: "Ich muss das Feld ankreuzen.",
    exampleSentenceEs: "Tengo que marcar el campo con una cruz.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "das Feld", role: "complement", order: 3 },
      { text: "ankreuzen", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (an-)"
  }, {
    de: "unterschreiben",
    pron: "un-ta-shrái-ben",
    es: "firmar",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich muss den Vertrag unterschreiben.",
    exampleSentenceEs: "Yo debo firmar el contrato.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "den Vertrag", role: "complement", order: 3 },
      { text: "unterschreiben", role: "verb_p2", order: 4 }
    ],
    regimen: "No separable + Akk"
  }, {
    de: "der Geldautomat",
    pron: "dea guélt-áu-to-mat",
    es: "cajero automático",
    type: "Sustantivo (Masc)",
    category: "Bank",
    exampleSentenceDe: "Wo ist der Geldautomat?",
    exampleSentenceEs: "¿Dónde está el cajero automático?",
    exampleSentenceDeBlocks: [
      { text: "Wo", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "der Geldautomat", role: "complement", order: 3 }
    ],
    plural: "die Geldautomaten"
  }, {
    de: "das Internet",
    pron: "das ín-ta-net",
    es: "internet",
    type: "Sustantivo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe das Internet. Das Internet ist gut.",
    exampleSentenceEs: "Tengo internet. Internet es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Internet", role: "complement", order: 3 }
    ],
    plural: "die Internets"
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ta",
    es: "computador",
    type: "Sustantivo (Masc)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe einen Computer. Der Computer ist neu.",
    exampleSentenceEs: "Tengo un computador. El computador es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Computer", role: "complement", order: 3 }
    ],
    plural: "die Computer"
  }, {
    de: "der Pass / Ausweis",
    pron: "dea pas  áus-vais",
    es: "pasaporte / ID",
    type: "Sustantivo",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche den Pass.",
    exampleSentenceEs: "Necesito el pasaporte.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "den Pass", role: "complement", order: 3 }
    ],
    plural: "die Pässe / Ausweise"
  }, {
    de: "gültig",
    pron: "gúl-tij",
    es: "válido/vigente",
    type: "Adjetivo",
    category: "Dokumente",
    exampleSentenceDe: "Mein Pass ist gültig.",
    exampleSentenceEs: "Mi pasaporte es válido.",
    exampleSentenceDeBlocks: [
      { text: "Mein Pass", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gültig", role: "complement", order: 3 }
    ],
    regimen: "≠ ungültig"
  }, {
    de: "das Paket",
    pron: "das pa-két",
    es: "el paquete",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich habe das Paket. Das Paket ist groß.",
    exampleSentenceEs: "Tengo el paquete. El paquete es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Paket", role: "complement", order: 3 }
    ],
    plural: "die Pakete"
  }, {
    de: "der Briefkasten",
    pron: "dea brif-kás-ten",
    es: "buzón de correo",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich habe einen Briefkasten.",
    exampleSentenceEs: "Tengo un buzón de correo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Briefkasten", role: "complement", order: 3 }
    ],
    plural: "die Briefkästen"
  }, {
    de: "die Gebühr",
    pron: "di gue-bü-a",
    es: "tarifa(comisión)",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Die Gebühr ist zehn Euro.",
    exampleSentenceEs: "La tarifa es de diez euros.",
    exampleSentenceDeBlocks: [
      { text: "Die Gebühr", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "zehn Euro", role: "complement", order: 3 }
    ],
    plural: "die Gebühren"
  }, {
    de: "der Kredit",
    pron: "dea kre-dít",
    es: "crédito",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich habe den Kredit. Der Kredit ist gut.",
    exampleSentenceEs: "Tengo el crédito. El crédito es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "den Kredit", role: "complement", order: 3 }
    ],
    plural: "die Kredite"
  }, {
    de: "abheben",
    pron: "áp-jé-ben",
    es: "retirar dinero",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich möchte Geld abheben.",
    exampleSentenceEs: "Quiero retirar dinero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "Geld", role: "complement", order: 3 },
      { text: "abheben", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (ab-), +Akk"
  }, {
    de: "einzahlen",
    pron: "áin-tsa-len",
    es: "depositar",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich zahle Geld auf die Bank ein.",
    exampleSentenceEs: "Yo deposito dinero en el banco.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "zahle", role: "verb_p1", order: 2 },
      { text: "Geld auf die Bank", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (ein-), +Akk"
  }, {
    de: "die Geheimzahl",
    pron: "di gue-jáim-tsal",
    es: "el PIN",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich habe die Geheimzahl vergessen.",
    exampleSentenceEs: "Olvidé el PIN.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Geheimzahl vergessen", role: "complement", order: 3 }
    ],
    plural: "die Geheimzahlen"
  },
    {
      de: "zurück|rufen",
      pron: "tsu-rúk-rú-fen",
      es: "devolver la llamada",
      type: "Verbo separable",
      category: "Kommunikation",
      regimen: "Separable (zurück-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich rufe Sie in zehn Minuten zurück.",
      exampleSentenceEs: "Le devuelvo la llamada en diez minutos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "rufe", role: "verb_p1", order: 2 },
      { text: "Sie in zehn Minuten", role: "complement", order: 3 },
      { text: "zurück", role: "verb_p2", order: 4 }
    ],
      en: "mobile smartphone screen showing incoming return call arrow"
    },
    {
      de: "erreichen",
      pron: "ea-rái-jen",
      es: "localizar / contactar / alcanzar",
      type: "Verbo",
      category: "Kommunikation",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Sie können mich unter dieser Telefonnummer erreichen.",
      exampleSentenceEs: "Puede localizarme en este número de teléfono.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "können", role: "verb_p1", order: 2 },
      { text: "mich unter dieser Telefonnummer", role: "complement", order: 3 },
      { text: "erreichen", role: "verb_p2", order: 4 }
    ],
      en: "dialing phone picking up friendly connected call"
    },
    {
      de: "aus|drucken",
      pron: "áus-drú-ken",
      es: "imprimir en papel",
      type: "Verbo separable",
      category: "Kommunikation",
      regimen: "Separable (aus-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich muss meine Fahrkarte noch ausdrucken.",
      exampleSentenceEs: "Todavía tengo que imprimir mi billete de viaje.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "meine Fahrkarte noch", role: "complement", order: 3 },
      { text: "ausdrucken", role: "verb_p2", order: 4 }
    ],
      en: "printer output tray producing fresh printed paper ticket"
    }]
},
{
  id: 15,
  title: "Kapitel 15: Gesundheit",
  icon: <Heart size={20} />,
  emoji: "🏥",
  words: [{
    de: "das Auge",
    pron: "das áu-gue",
    es: "ojo",
    type: "Sustantivo (Neutro)",
    category: "Körper",
    exampleSentenceDe: "Ich habe ein Auge. Das Auge ist braun.",
    exampleSentenceEs: "Tengo un ojo. El ojo es marrón.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Auge", role: "complement", order: 3 }
    ],
    plural: "die Augen"
  }, {
    de: "die Hand",
    pron: "di jant",
    es: "mano",
    type: "Sustantivo (Fem)",
    category: "Körper",
    exampleSentenceDe: "Ich habe eine Hand. Die Hand ist klein.",
    exampleSentenceEs: "Tengo una mano. La mano es pequeña.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Hand", role: "complement", order: 3 }
    ],
    plural: "die Hände"
  }, {
    de: "der Arm",
    pron: "dea aam",
    es: "brazo",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe einen Arm.",
    exampleSentenceEs: "Tengo un brazo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Arm", role: "complement", order: 3 }
    ],
    plural: "die Arme"
  }, {
    de: "das Bein",
    pron: "das báin",
    es: "pierna",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe ein Bein.",
    exampleSentenceEs: "Yo tengo una pierna.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Bein", role: "complement", order: 3 }
    ],
    plural: "die Beine"
  }, {
    de: "der Kopf",
    pron: "dea kopf",
    es: "cabeza",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe Kopfschmerzen.",
    exampleSentenceEs: "Tengo dolor de cabeza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Kopfschmerzen", role: "complement", order: 3 }
    ],
    plural: "die Köpfe"
  }, {
    de: "der Fuß",
    pron: "dea fus",
    es: "pie",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Mein Fuß ist groß.",
    exampleSentenceEs: "Mi pie es grande.",
    exampleSentenceDeBlocks: [
      { text: "Mein Fuß", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Füße"
  }, {
    de: "der Mund",
    pron: "dea munt",
    es: "boca",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe einen Mund.",
    exampleSentenceEs: "Tengo una boca.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Mund", role: "complement", order: 3 }
    ],
    plural: "die Münder"
  }, {
    de: "der Zahn",
    pron: "dea tsán",
    es: "diente",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Mein Zahn ist schlecht.",
    exampleSentenceEs: "Mi diente está mal.",
    exampleSentenceDeBlocks: [
      { text: "Mein Zahn", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schlecht", role: "complement", order: 3 }
    ],
    plural: "die Zähne"
  }, {
    de: "die Nase",
    pron: "di ná-se",
    es: "nariz",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Die Nase ist rot.",
    exampleSentenceEs: "La nariz es roja.",
    exampleSentenceDeBlocks: [
      { text: "Die Nase", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ],
    plural: "die Nasen"
  }, {
    de: "das Ohr",
    pron: "das ó-a",
    es: "oreja",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe ein Ohr. Das Ohr ist rot.",
    exampleSentenceEs: "Tengo una oreja. La oreja está roja.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ein Ohr", role: "complement", order: 3 }
    ],
    plural: "die Ohren"
  }, {
    de: "das Haar",
    pron: "das já-a",
    es: "pelo",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Das Haar ist rot.",
    exampleSentenceEs: "El pelo es rojo.",
    exampleSentenceDeBlocks: [
      { text: "Das Haar", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "rot", role: "complement", order: 3 }
    ],
    plural: "die Haare"
  }, {
    de: "der Bauch",
    pron: "dea báuj",
    es: "barriga",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe Hunger. Mein Bauch ist leer.",
    exampleSentenceEs: "Tengo hambre. Mi barriga está vacía.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Hunger", role: "complement", order: 3 }
    ],
    plural: "die Bäuche"
  }, {
    de: "der Finger",
    pron: "dea fín-ga",
    es: "dedo",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Das ist mein Finger.",
    exampleSentenceEs: "Este es mi dedo.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Finger", role: "complement", order: 3 }
    ],
    plural: "die Finger"
  }, {
    de: "der Rücken",
    pron: "dea rú-ken",
    es: "espalda",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe Schmerzen im Rücken.",
    exampleSentenceEs: "Tengo dolor en la espalda.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Schmerzen im Rücken", role: "complement", order: 3 }
    ],
    plural: "die Rücken"
  }, {
    de: "der Hals",
    pron: "dea jals",
    es: "cuello",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe Schmerzen am Hals.",
    exampleSentenceEs: "Tengo dolor en el cuello.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Schmerzen am Hals", role: "complement", order: 3 }
    ],
    plural: "die Hälse"
  }, {
    de: "wehtun",
    pron: "vé-tun",
    es: "doler",
    type: "Verbo separable",
    category: "Krankheit",
    exampleSentenceDe: "Mein Kopf tut weh.",
    exampleSentenceEs: "Mi cabeza duele.",
    exampleSentenceDeBlocks: [
      { text: "Mein Kopf", role: "subject", order: 1 },
      { text: "tut", role: "verb_p1", order: 2 },
      { text: "weh", role: "verb_p2", order: 3 }
    ],
    regimen: "+ Dativo (a quién duele)"
  }, {
    de: "Wie geht es Ihnen?",
    pron: "ví guet es í-nen",
    es: "¿Cómo está usted?",
    type: "Frase",
    category: "Kommunikation",
    exampleSentenceDe: "Hallo, wie geht es Ihnen?",
    exampleSentenceEs: "Hola, ¿cómo está usted?",
    exampleSentenceDeBlocks: [
      { text: "Hallo, wie", role: "subject", order: 1 },
      { text: "geht", role: "verb_p1", order: 2 },
      { text: "es Ihnen", role: "complement", order: 3 }
    ],
    regimen: "Formal"
  }, {
    de: "Es geht mir gut",
    pron: "es guét mia gut",
    es: "Me va bien",
    type: "Frase",
    category: "Kommunikation",
    exampleSentenceDe: "Hallo! Mir geht es gut, danke.",
    exampleSentenceEs: "¡Hola! Me va bien, gracias.",
    exampleSentenceDeBlocks: [
      { text: "Hallo! Mir", role: "subject", order: 1 },
      { text: "geht", role: "verb_p1", order: 2 },
      { text: "es gut, danke", role: "complement", order: 3 }
    ],
    regimen: "Dat: mir"
  }, {
    de: "schlafen",
    pron: "shlá-fen",
    es: "dormir",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich schlafe heute.",
    exampleSentenceEs: "Yo duermo hoy.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schlafe", role: "verb_p1", order: 2 },
      { text: "heute", role: "complement", order: 3 }
    ],
    regimen: "Irregular (schläft)"
  }, {
    de: "ins Bett gehen",
    pron: "ins bet gué-en",
    es: "ir a la cama",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Ich gehe jetzt ins Bett.",
    exampleSentenceEs: "Yo voy a la cama ahora.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "jetzt ins Bett", role: "complement", order: 3 }
    ],
    regimen: "ins + Akkusativ"
  }, {
    de: "im Bett liegen",
    pron: "im bet lí-guen",
    es: "estar en la cama",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Ich liege im Bett.",
    exampleSentenceEs: "Yo estoy en la cama.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "liege", role: "verb_p1", order: 2 },
      { text: "im Bett", role: "complement", order: 3 }
    ],
    regimen: "in+Dat=fijo"
  }, {
    de: "krank",
    pron: "kránk",
    es: "enfermo",
    type: "Adjetivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich bin krank.",
    exampleSentenceEs: "Yo estoy enfermo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "krank", role: "complement", order: 3 }
    ],
    regimen: "≠ gesund"
  }, {
    de: "das Fieber",
    pron: "das fí-ba",
    es: "fiebre",
    type: "Sustantivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich habe Fieber. Das Fieber ist hoch.",
    exampleSentenceEs: "Tengo fiebre. La fiebre es alta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Fieber", role: "complement", order: 3 }
    ],
    plural: "die Fieber"
  }, {
    de: "der Arzt",
    pron: "dea artst",
    es: "médico",
    type: "Sustantivo (Masc)",
    category: "Medizin",
    exampleSentenceDe: "Ich bin krank. Ich gehe zum Arzt.",
    exampleSentenceEs: "Estoy enfermo. Voy al médico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "krank", role: "complement", order: 3 }
    ],
    plural: "die Ärzte"
  }, {
    de: "der Doktor",
    pron: "dea dók-toa",
    es: "doctor",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Der Doktor ist nett.",
    exampleSentenceEs: "El doctor es amable.",
    exampleSentenceDeBlocks: [
      { text: "Der Doktor", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nett", role: "complement", order: 3 }
    ],
    plural: "die Doktoren"
  }, {
    de: "die Apotheke",
    pron: "di a-po-té-ke",
    es: "farmacia",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich gehe zur Apotheke.",
    exampleSentenceEs: "Voy a la farmacia.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "zur Apotheke", role: "complement", order: 3 }
    ],
    plural: "die Apotheken"
  }, {
    de: "das Medikament",
    pron: "das me-di-ka-mént",
    es: "medicamento",
    type: "Sustantivo (Neutro)",
    category: "Medizin",
    exampleSentenceDe: "Das Medikament ist neu.",
    exampleSentenceEs: "El medicamento es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das Medikament", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Medikamente"
  }, {
    de: "das Rezept",
    pron: "das re-tsépt",
    es: "receta médica",
    type: "Sustantivo (Neutro)",
    category: "Medizin",
    exampleSentenceDe: "Ich brauche das Rezept von dem Arzt.",
    exampleSentenceEs: "Necesito la receta del médico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "das Rezept von dem Arzt", role: "complement", order: 3 }
    ],
    plural: "die Rezepte"
  }, {
    de: "die Praxis",
    pron: "di prák-sis",
    es: "consultorio",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich gehe in die Praxis von dem Arzt.",
    exampleSentenceEs: "Voy al consultorio del doctor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "in die Praxis von dem Arzt", role: "complement", order: 3 }
    ],
    plural: "die Praxen"
  }, {
    de: "das Krankenhaus",
    pron: "das krán-ken-jáus",
    es: "hospital",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich bin im Krankenhaus.",
    exampleSentenceEs: "Estoy en el hospital.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "im Krankenhaus", role: "complement", order: 3 }
    ],
    plural: "die Krankenhäuser"
  }, {
    de: "der Termin",
    pron: "dea tea-mín",
    es: "cita",
    type: "Sustantivo (Masc)",
    category: "Medizin",
    exampleSentenceDe: "Ich habe einen Termin am Montag.",
    exampleSentenceEs: "Tengo una cita el lunes.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Termin am Montag", role: "complement", order: 3 }
    ],
    plural: "die Termine"
  }, {
    de: "Gute Besserung",
    pron: "gú-te bé-se-rung",
    es: "¡Que te mejores!",
    type: "Frase",
    category: "Kommunikation",
    exampleSentenceDe: "Ich wünsche dir gute Besserung.",
    exampleSentenceEs: "Te deseo que te mejores.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wünsche", role: "verb_p1", order: 2 },
      { text: "dir gute Besserung", role: "complement", order: 3 }
    ],
    regimen: "Fórmula fija"
  }, {
    de: "das Pflaster",
    pron: "das pflás-ta",
    es: "tirita(curita)",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich habe das Pflaster. Das Pflaster ist klein.",
    exampleSentenceEs: "Tengo la tirita. La tirita es pequeña.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Pflaster", role: "complement", order: 3 }
    ],
    plural: "die Pflaster"
  }, {
    de: "die Salbe",
    pron: "di sál-be",
    es: "pomada",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich habe die Salbe.",
    exampleSentenceEs: "Tengo la pomada.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Salbe", role: "complement", order: 3 }
    ],
    plural: "die Salben"
  }, {
    de: "die Erkältung",
    pron: "di ea-kél-tung",
    es: "resfriado",
    type: "Sustantivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich habe die Erkältung.",
    exampleSentenceEs: "Tengo el resfriado.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "die Erkältung", role: "complement", order: 3 }
    ],
    plural: "die Erkältungen"
  }, {
    de: "husten",
    pron: "jús-ten",
    es: "toser",
    type: "Verbo",
    category: "Krankheit",
    exampleSentenceDe: "Ich huste.",
    exampleSentenceEs: "Yo toso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "huste", role: "verb_p1", order: 2 }
    ],
    regimen: "Intransitivo"
  }, {
    de: "bluten",
    pron: "blú-ten",
    es: "sangrar",
    type: "Verbo",
    category: "Krankheit",
    exampleSentenceDe: "Ich blute nicht.",
    exampleSentenceEs: "Yo no sangro.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "blute", role: "verb_p1", order: 2 },
      { text: "nicht", role: "complement", order: 3 }
    ],
    regimen: "Intransitivo"
  }, {
    de: "sich verletzen",
    pron: "zij fea-lét-sen",
    es: "lastimarse",
    type: "Verbo",
    category: "Krankheit",
    exampleSentenceDe: "Ich verletze mich nicht.",
    exampleSentenceEs: "No me lastimo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "verletze", role: "verb_p1", order: 2 },
      { text: "mich nicht", role: "complement", order: 3 }
    ],
    regimen: "Reflexivo + Akkusativ"
  }, {
    de: "der Schmerz",
    pron: "dea shmérts",
    es: "el dolor",
    type: "Sustantivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich habe Schmerz. Der Schmerz ist stark.",
    exampleSentenceEs: "Tengo dolor. El dolor es fuerte.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Schmerz", role: "complement", order: 3 }
    ],
    plural: "die Schmerzen"
  }, {
    de: "schwanger",
    pron: "shván-guea",
    es: "embarazada",
    type: "Adjetivo",
    category: "Körper",
    exampleSentenceDe: "Sie ist schwanger.",
    exampleSentenceEs: "Ella está embarazada.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schwanger", role: "complement", order: 3 }
    ],
    regimen: "≠ nicht schwanger"
  },
  {
    de: "die Seife",
    pron: "di zái-fe",
    es: "el jabón",
    type: "Sustantivo (Fem)",
    category: "Körperpflege",
    plural: "die Seifen",
    exampleSentenceDe: "Ich wasche mich mit Seife.",
    exampleSentenceEs: "Me lavo con jabón.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wasche", role: "verb_p1", order: 2 },
      { text: "mich mit Seife", role: "complement", order: 3 }
    ]
  }, {
        de: "das Shampoo",
    pron: "das shám-pu",
    es: "el champú",
    type: "Sustantivo (Neutro)",
    category: "Körperpflege",
    plural: "die Shampoos",
    exampleSentenceDe: "Das Shampoo riecht nach Kokosnuss.",
    exampleSentenceEs: "El champú huele a coco.",
    exampleSentenceDeBlocks: [
      { text: "Das Shampoo", role: "subject", order: 1 },
      { text: "riecht", role: "verb_p1", order: 2 },
      { text: "nach Kokosnuss", role: "complement", order: 3 }
    ]
  }, {
        de: "die Zahnbürste",
    pron: "di tsán-büa-ste",
    es: "cepillo de dientes",
    type: "Sustantivo (Fem)",
    category: "Körperpflege",
    plural: "die Zahnbürsten",
    exampleSentenceDe: "Meine Zahnbürste ist ganz neu.",
    exampleSentenceEs: "Mi cepillo de dientes es totalmente nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Meine Zahnbürste", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ganz neu", role: "complement", order: 3 }
    ]
  }, {
        de: "die Zahnpasta",
    pron: "di tsán-pas-ta",
    es: "pasta de dientes",
    type: "Sustantivo (Fem)",
    category: "Körperpflege",
    plural: "die Zahnpasten",
    exampleSentenceDe: "Die Zahnpasta schmeckt nach Minze.",
    exampleSentenceEs: "La pasta de dientes sabe a menta.",
    exampleSentenceDeBlocks: [
      { text: "Die Zahnpasta", role: "subject", order: 1 },
      { text: "schmeckt", role: "verb_p1", order: 2 },
      { text: "nach Minze", role: "complement", order: 3 }
    ]
  }, {
        de: "der Kamm",
    pron: "dea kam",
    es: "el peine",
    type: "Sustantivo (Masc)",
    category: "Körperpflege",
    plural: "die Kämme",
    exampleSentenceDe: "Der Kamm liegt im Badezimmer.",
    exampleSentenceEs: "El peine está en el baño.",
    exampleSentenceDeBlocks: [
      { text: "Der Kamm", role: "subject", order: 1 },
      { text: "liegt", role: "verb_p1", order: 2 },
      { text: "im Badezimmer", role: "complement", order: 3 }
    ]
  }, {
        de: "der Föhn",
    pron: "dea fön",
    es: "secador de pelo",
    type: "Sustantivo (Masc)",
    category: "Körperpflege",
    plural: "die Föhne",
    exampleSentenceDe: "Der Föhn trocknet meine Haare.",
    exampleSentenceEs: "El secador seca mi pelo.",
    exampleSentenceDeBlocks: [
      { text: "Der Föhn", role: "subject", order: 1 },
      { text: "trocknet", role: "verb_p1", order: 2 },
      { text: "meine Haare", role: "complement", order: 3 }
    ]
  }, {
        de: "der Rasierer",
    pron: "dea ra-zí-ra",
    es: "la afeitadora",
    type: "Sustantivo (Masc)",
    category: "Körperpflege",
    plural: "die Rasierer",
    exampleSentenceDe: "Der Rasierer funktioniert sehr gut.",
    exampleSentenceEs: "La afeitadora funciona muy bien.",
    exampleSentenceDeBlocks: [
      { text: "Der Rasierer", role: "subject", order: 1 },
      { text: "funktioniert", role: "verb_p1", order: 2 },
      { text: "sehr gut", role: "complement", order: 3 }
    ]
  }, {
        de: "die Tablette",
    pron: "di ta-blé-te",
    es: "la pastilla / píldora",
    type: "Sustantivo (Fem)",
    category: "Gesundheit",
    plural: "die Tabletten",
    exampleSentenceDe: "Er nimmt eine Tablette ein.",
    exampleSentenceEs: "Él se toma una pastilla.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "nimmt", role: "verb_p1", order: 2 },
      { text: "eine Tablette", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "die Krankheit",
    pron: "di kránk-hait",
    es: "la enfermedad",
    type: "Sustantivo (Fem)",
    category: "Gesundheit",
    plural: "die Krankheiten",
    exampleSentenceDe: "Die Krankheit ist nicht gefährlich.",
    exampleSentenceEs: "La enfermedad no es peligrosa.",
    exampleSentenceDeBlocks: [
      { text: "Die Krankheit", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nicht", role: "complement", order: 3 },
      { text: "gefährlich", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "die Gesundheit",
    pron: "di gue-zúnt-hait",
    es: "la salud",
    type: "Sustantivo (Fem)",
    category: "Gesundheit",
    plural: "-",
    exampleSentenceDe: "Gute Gesundheit ist sehr wichtig.",
    exampleSentenceEs: "Una buena salud es muy importante.",
    exampleSentenceDeBlocks: [
      { text: "Gute Gesundheit", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr wichtig", role: "complement", order: 3 }
    ]
  }, {
        de: "der Notfall",
    pron: "dea nót-fal",
    es: "la emergencia",
    type: "Sustantivo (Masc)",
    category: "Gesundheit",
    plural: "die Notfälle",
    exampleSentenceDe: "Bei einem Notfall rufen wir an.",
    exampleSentenceEs: "En caso de emergencia llamamos.",
    exampleSentenceDeBlocks: [
      { text: "Bei einem Notfall", role: "subject", order: 1 },
      { text: "rufen", role: "verb_p1", order: 2 },
      { text: "wir", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "der Krankenwagen",
    pron: "dea krán-ken-va-guen",
    es: "la ambulancia",
    type: "Sustantivo (Masc)",
    category: "Gesundheit",
    plural: "die Krankenwagen",
    exampleSentenceDe: "Der Krankenwagen fährt schnell vorbei.",
    exampleSentenceEs: "La ambulancia pasa rápido.",
    exampleSentenceDeBlocks: [
      { text: "Der Krankenwagen", role: "subject", order: 1 },
      { text: "fährt", role: "verb_p1", order: 2 },
      { text: "schnell", role: "complement", order: 3 },
      { text: "vorbei", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "der Muskel",
    pron: "dea mús-kel",
    es: "el músculo",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Muskeln",
    en: "strong flexing bicep muscle",
    exampleSentenceDe: "Der Muskel tut weh.",
    exampleSentenceEs: "El músculo duele.",
    exampleSentenceDeBlocks: [
      { text: "Der Muskel", role: "subject", order: 1 },
      { text: "tut", role: "verb_p1", order: 2 },
      { text: "weh", role: "complement", order: 3 }
    ]
  }, {
        de: "der Knochen",
    pron: "dea knó-jen",
    es: "el hueso",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Knochen",
    en: "white skeleton bone",
    exampleSentenceDe: "Der Hund hat einen Knochen.",
    exampleSentenceEs: "El perro tiene un hueso.",
    exampleSentenceDeBlocks: [
      { text: "Der Hund", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "einen Knochen", role: "complement", order: 3 }
    ]
  }, {
        de: "die Haut",
    pron: "di jaut",
    es: "la piel",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Häute",
    en: "smooth human skin texture",
    exampleSentenceDe: "Meine Haut ist trocken.",
    exampleSentenceEs: "Mi piel está seca.",
    exampleSentenceDeBlocks: [
      { text: "Meine Haut", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "trocken", role: "complement", order: 3 }
    ]
  }, {
        de: "das Gehirn",
    pron: "das gue-jírn",
    es: "el cerebro",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Gehirne",
    en: "pink anatomical human brain",
    exampleSentenceDe: "Das Gehirn ist wichtig.",
    exampleSentenceEs: "El cerebro es importante.",
    exampleSentenceDeBlocks: [
      { text: "Das Gehirn", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "wichtig", role: "complement", order: 3 }
    ]
  }, {
        de: "das Herz",
    pron: "das jerts",
    es: "el corazón",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Herzen",
    en: "red anatomical human heart",
    exampleSentenceDe: "Mein Herz schlägt schnell.",
    exampleSentenceEs: "Mi corazón late rápido.",
    exampleSentenceDeBlocks: [
      { text: "Mein Herz", role: "subject", order: 1 },
      { text: "schlägt", role: "verb_p1", order: 2 },
      { text: "schnell", role: "complement", order: 3 }
    ]
  }, {
        de: "die Lunge",
    pron: "di lúng-e",
    es: "el pulmón",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Lungen",
    en: "pink anatomical human lungs",
    exampleSentenceDe: "Rauchen ist schlecht für die Lunge.",
    exampleSentenceEs: "Fumar es malo para el pulmón.",
    exampleSentenceDeBlocks: [
      { text: "Rauchen", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schlecht für die Lunge", role: "complement", order: 3 }
    ]
  }, {
        de: "die Leber",
    pron: "di lé-ber",
    es: "el hígado",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Lebern",
    en: "dark red anatomical human liver",
    exampleSentenceDe: "Alkohol schadet der Leber.",
    exampleSentenceEs: "El alcohol daña el hígado.",
    exampleSentenceDeBlocks: [
      { text: "Alkohol", role: "subject", order: 1 },
      { text: "schadet", role: "verb_p1", order: 2 },
      { text: "der Leber", role: "complement", order: 3 }
    ]
  }, {
        de: "atmen",
    pron: "át-men",
    es: "respirar",
    type: "Verbo",
    category: "Gesundheit",
    regimen: "Intransitivo",
    en: "person taking a deep breath",
    exampleSentenceDe: "Er kann nicht gut atmen.",
    exampleSentenceEs: "Él no puede respirar bien.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "nicht gut", role: "complement", order: 3 },
      { text: "atmen", role: "verb_p2", order: 4 }
    ]
  }, {
        de: "schwitzen",
    pron: "shví-tsen",
    es: "sudar",
    type: "Verbo",
    category: "Gesundheit",
    regimen: "Intransitivo",
    en: "sweating tired person",
    exampleSentenceDe: "Ich schwitze beim Sport.",
    exampleSentenceEs: "Sudo durante el deporte.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schwitze", role: "verb_p1", order: 2 },
      { text: "beim Sport", role: "complement", order: 3 }
    ]
  }, {
        de: "zittern",
    pron: "tsí-tern",
    es: "temblar",
    type: "Verbo",
    category: "Gesundheit",
    regimen: "Intransitivo",
    en: "shivering freezing person",
    exampleSentenceDe: "Ich zittere vor Kälte.",
    exampleSentenceEs: "Tiemblo de frío.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "zittere", role: "verb_p1", order: 2 },
      { text: "vor Kälte", role: "complement", order: 3 }
    ]
  },
    {
      de: "die Krankenkasse",
      pron: "di krán-ken-ká-se",
      es: "caja de seguro médico",
      type: "Sustantivo (Fem)",
      category: "Gesundheit",
      regimen: "-",
      plural: "die Krankenkassen",
      exampleSentenceDe: "Sind Sie bei einer gesetzlichen Krankenkasse versichert?",
      exampleSentenceEs: "¿Está asegurado en una caja de salud pública?",
    exampleSentenceDeBlocks: [
      { text: "Sind", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "bei einer gesetzlichen Krankenkasse versichert", role: "complement", order: 3 }
    ],
      en: "health insurance cross shield with medical caduceus emblem"
    },
    {
      de: "die Versichertenkarte",
      pron: "di fea-sí-jea-ten-kár-te",
      es: "tarjeta sanitaria",
      type: "Sustantivo (Fem)",
      category: "Gesundheit",
      regimen: "-",
      plural: "die Versichertenkarten",
      exampleSentenceDe: "Bitte zeigen Sie Ihre Versichertenkarte in der Praxis.",
      exampleSentenceEs: "Por favor, muestre su tarjeta sanitaria en el consultorio.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "zeigen", role: "verb_p1", order: 2 },
      { text: "Sie Ihre Versichertenkarte in der Praxis", role: "complement", order: 3 }
    ],
      en: "electronic plastic health insurance chip card"
    },
    {
      de: "die Krankschreibung",
      pron: "di kránk-shrái-bung",
      es: "parte de baja médica laboral",
      type: "Sustantivo (Fem)",
      category: "Gesundheit",
      regimen: "-",
      plural: "die Krankschreibungen",
      exampleSentenceDe: "Ich brauche eine Krankschreibung für meinen Chef.",
      exampleSentenceEs: "Necesito un parte de baja médica para mi jefe.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "eine Krankschreibung für meinen Chef", role: "complement", order: 3 }
    ],
      en: "official yellow doctor sick leave certificate slip"
    },
    {
      de: "das Attest",
      pron: "das a-tést",
      es: "certificado médico oficial",
      type: "Sustantivo (Neutro)",
      category: "Medizin",
      regimen: "-",
      plural: "die Atteste",
      exampleSentenceDe: "Die Schule verlangt ab Tag drei ein ärztliches Attest.",
      exampleSentenceEs: "La escuela exige un certificado médico a partir del tercer día.",
    exampleSentenceDeBlocks: [
      { text: "Die Schule", role: "subject", order: 1 },
      { text: "verlangt", role: "verb_p1", order: 2 },
      { text: "ab Tag drei ein ärztliches Attest", role: "complement", order: 3 }
    ],
      en: "official medical certificate note signed with stethoscope"
    },
    {
      de: "die Notaufnahme",
      pron: "di nót-áuf-ná-me",
      es: "servicio de urgencias hospitalarias",
      type: "Sustantivo (Fem)",
      category: "Medizin",
      regimen: "-",
      plural: "die Notaufnahmen",
      exampleSentenceDe: "Bei starken Schmerzen gehe ich in die Notaufnahme.",
      exampleSentenceEs: "En caso de dolores agudos voy al servicio de urgencias.",
    exampleSentenceDeBlocks: [
      { text: "Bei", role: "subject", order: 1 },
      { text: "starken", role: "verb_p1", order: 2 },
      { text: "Schmerzen gehe ich in die Notaufnahme", role: "complement", order: 3 }
    ],
      en: "hospital emergency room ER glowing red entrance sign"
    },
    {
      de: "das Schmerzmittel",
      pron: "das shmérts-mi-tel",
      es: "analgésico / calmante",
      type: "Sustantivo (Neutro)",
      category: "Medizin",
      regimen: "-",
      plural: "die Schmerzmittel",
      exampleSentenceDe: "Haben Sie ein Schmerzmittel gegen Kopfschmerzen?",
      exampleSentenceEs: "¿Tiene un analgésico contra el dolor de cabeza?",
    exampleSentenceDeBlocks: [
      { text: "Haben", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "ein Schmerzmittel gegen Kopfschmerzen", role: "complement", order: 3 }
    ],
      en: "blister pack of white pain relief medicine pills"
    }]
},
{
  id: 16,
  title: "Kapitel 16: Schule & Beruf",
  icon: <Briefcase size={20} />,
  emoji: "💼",
  words: [{
    de: "die Schule",
    pron: "di shú-le",
    es: "escuela",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich bin in der Schule.",
    exampleSentenceEs: "Yo estoy en la escuela.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "in der Schule", role: "complement", order: 3 }
    ],
    plural: "die Schulen"
  }, {
    de: "die Klasse",
    pron: "di klá-se",
    es: "clase",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich bin in der Klasse.",
    exampleSentenceEs: "Yo estoy en la clase.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "in der Klasse", role: "complement", order: 3 }
    ],
    plural: "die Klassen"
  }, {
    de: "der Lehrer / die Lehrerin",
    pron: "dea lé-ra  di lé-re-rin",
    es: "profesor / profesora",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Das ist mein Lehrer. Mein Lehrer ist nett.",
    exampleSentenceEs: "Este es mi profesor. Mi profesor es simpático.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Lehrer", role: "complement", order: 3 }
    ],
    plural: "die Lehrer / die Lehrerinnen"
  }, {
    de: "der Schüler / die Schülerin",
    pron: "dea shú-la  di shú-le-rin",
    es: "alumno / alumna",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Der Schüler ist neu. Er ist in der Klasse.",
    exampleSentenceEs: "El alumno es nuevo. Él está en la clase.",
    exampleSentenceDeBlocks: [
      { text: "Der Schüler", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "neu", role: "complement", order: 3 }
    ],
    plural: "die Schüler / die Schülerinnen"
  }, {
    de: "der Student",
    pron: "dea shtu-dént",
    es: "estudiante (uni)",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Ich bin ein Student. Der Student ist neu.",
    exampleSentenceEs: "Soy un estudiante. El estudiante es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "ein Student", role: "complement", order: 3 }
    ],
    plural: "die Studenten"
  }, {
    de: "lernen",
    pron: "lér-nen",
    es: "aprender / estudiar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich lerne Deutsch.",
    exampleSentenceEs: "Yo aprendo alemán.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lerne", role: "verb_p1", order: 2 },
      { text: "Deutsch", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "der Unterricht",
    pron: "dea ún-tea-rijt",
    es: "clase (sesión)",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Der Unterricht beginnt jetzt.",
    exampleSentenceEs: "La clase empieza ahora.",
    exampleSentenceDeBlocks: [
      { text: "Der Unterricht", role: "subject", order: 1 },
      { text: "beginnt", role: "verb_p1", order: 2 },
      { text: "jetzt", role: "complement", order: 3 }
    ],
    plural: "die Unterrichte"
  }, {
    de: "der Kurs",
    pron: "dea kúrs",
    es: "curso",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Der Deutschkurs ist gut.",
    exampleSentenceEs: "El curso de alemán es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Der Deutschkurs", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "gut", role: "complement", order: 3 }
    ],
    plural: "die Kurse"
  }, {
    de: "die Pause",
    pron: "di páu-se",
    es: "descanso/recreo",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Wir machen jetzt eine Pause.",
    exampleSentenceEs: "Ahora hacemos un descanso.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "machen", role: "verb_p1", order: 2 },
      { text: "jetzt eine Pause", role: "complement", order: 3 }
    ],
    plural: "die Pausen"
  }, {
    de: "die Hausaufgabe",
    pron: "di jáus-áuf-gá-be",
    es: "tarea",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache die Hausaufgabe.",
    exampleSentenceEs: "Yo hago la tarea.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "die Hausaufgabe", role: "complement", order: 3 }
    ],
    plural: "die Hausaufgaben"
  }, {
    de: "die Prüfung",
    pron: "di prǘ-fung",
    es: "examen",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Die Prüfung ist schwer.",
    exampleSentenceEs: "El examen es difícil.",
    exampleSentenceDeBlocks: [
      { text: "Die Prüfung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schwer", role: "complement", order: 3 }
    ],
    plural: "die Prüfungen"
  }, {
    de: "die Lösung",
    pron: "di lö-sung",
    es: "solución",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich habe eine Lösung. Die Lösung ist einfach.",
    exampleSentenceEs: "Tengo una solución. La solución es simple.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "eine Lösung", role: "complement", order: 3 }
    ],
    plural: "die Lösungen"
  }, {
    de: "der Fehler",
    pron: "dea fé-la",
    es: "error",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache einen Fehler. Der Fehler ist groß.",
    exampleSentenceEs: "Yo cometo un error. El error es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "einen Fehler", role: "complement", order: 3 }
    ],
    plural: "die Fehler"
  }, {
    de: "die Arbeit",
    pron: "di ár-bait",
    es: "trabajo",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Die Arbeit ist interessant.",
    exampleSentenceEs: "El trabajo es interesante.",
    exampleSentenceDeBlocks: [
      { text: "Die Arbeit", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "interessant", role: "complement", order: 3 }
    ],
    plural: "die Arbeiten"
  }, {
    de: "der Beruf",
    pron: "dea be-rúf",
    es: "profesión",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Was ist dein Beruf?",
    exampleSentenceEs: "¿Cuál es tu profesión?",
    exampleSentenceDeBlocks: [
      { text: "Was", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "dein Beruf", role: "complement", order: 3 }
    ],
    plural: "die Berufe"
  }, {
    de: "Mechaniker von Beruf",
    pron: "me-já-ni-ka fon be-rúf",
    es: "mecánico de profesión",
    type: "Frase",
    category: "Beruf",
    exampleSentenceDe: "Ich bin Mechaniker von Beruf.",
    exampleSentenceEs: "Soy mecánico de profesión.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "Mechaniker von Beruf", role: "complement", order: 3 }
    ],
    regimen: "von + dat., sin artículo"
  }, {
    de: "der Arbeitsplatz / Job",
    pron: "dea ár-baits-plats  dshob",
    es: "puesto de trabajo / empleo",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich habe einen Arbeitsplatz. Der Arbeitsplatz ist gut.",
    exampleSentenceEs: "Tengo un puesto de trabajo. El puesto de trabajo es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Arbeitsplatz", role: "complement", order: 3 }
    ],
    plural: "die Arbeitsplätze"
  }, {
    de: "arbeiten",
    pron: "ár-bai-ten",
    es: "trabajar",
    type: "Verbo",
    category: "Beruf",
    exampleSentenceDe: "Ich arbeite heute.",
    exampleSentenceEs: "Yo trabajo hoy.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "arbeite", role: "verb_p1", order: 2 },
      { text: "heute", role: "complement", order: 3 }
    ],
    regimen: "+ an/bei + Dat"
  }, {
    de: "der Chef / die Chefin",
    pron: "dea shef  di shé-fin",
    es: "jefe / jefa",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Der Chef ist nett.",
    exampleSentenceEs: "El jefe es simpático.",
    exampleSentenceDeBlocks: [
      { text: "Der Chef", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "nett", role: "complement", order: 3 }
    ],
    plural: "die Chefs / die Chefinnen"
  }, {
    de: "der Kollege / die Kollegin",
    pron: "dea ko-lé-gue  di ko-lé-guin",
    es: "colega",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Ich habe einen Kollegen. Mein Kollege ist nett.",
    exampleSentenceEs: "Tengo un colega. Mi colega es simpático.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Kollegen", role: "complement", order: 3 }
    ],
    plural: "die Kollegen / Kolleginnen"
  }, {
    de: "die Firma / das Büro",
    pron: "di fír-ma  das bü-ró",
    es: "empresa / oficina",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich arbeite in der Firma.",
    exampleSentenceEs: "Yo trabajo en la empresa.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "arbeite", role: "verb_p1", order: 2 },
      { text: "in der Firma", role: "complement", order: 3 }
    ],
    plural: "die Firmen / die Büros"
  }, {
    de: "arbeitslos",
    pron: "ár-baits-lohs",
    es: "desempleado",
    type: "Adjetivo",
    category: "Beruf",
    exampleSentenceDe: "Ich bin arbeitslos.",
    exampleSentenceEs: "Yo estoy desempleado.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "arbeitslos", role: "complement", order: 3 }
    ],
    regimen: "≠ berufstätig"
  }, {
    de: "der Arbeiter",
    pron: "dea ár-bai-ta",
    es: "obrero",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Ich sehe der Arbeiter.",
    exampleSentenceEs: "Yo veo al obrero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sehe", role: "verb_p1", order: 2 },
      { text: "der Arbeiter", role: "complement", order: 3 }
    ],
    plural: "die Arbeiter"
  }, {
    de: "das Praktikum",
    pron: "das prák-ti-kum",
    es: "pasantía",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache ein Praktikum in Deutschland.",
    exampleSentenceEs: "Hago una pasantía en Alemania.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "ein Praktikum in Deutschland", role: "complement", order: 3 }
    ],
    plural: "die Praktika"
  }, {
    de: "die Ausbildung",
    pron: "di áus-bíl-dung",
    es: "formación dual",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Die Ausbildung ist wichtig.",
    exampleSentenceEs: "La formación es importante.",
    exampleSentenceDeBlocks: [
      { text: "Die Ausbildung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "wichtig", role: "complement", order: 3 }
    ],
    plural: "die Ausbildungen"
  }, {
    de: "der Urlaub",
    pron: "dea úa-laup",
    es: "vacaciones",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich habe Urlaub.",
    exampleSentenceEs: "Tengo vacaciones.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "Urlaub", role: "complement", order: 3 }
    ],
    plural: "die Urlaube"
  }, {
    de: "selbstständig",
    pron: "sélpst-shtén-dij",
    es: "independiente",
    type: "Adjetivo",
    category: "Beruf",
    exampleSentenceDe: "Ich bin selbstständig.",
    exampleSentenceEs: "Soy independiente.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "selbstständig", role: "complement", order: 3 }
    ],
    regimen: "≠ abhängig"
  }, {
    de: "die Stelle",
    pron: "di shté-le",
    es: "plaza/vacante",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich suche die Stelle.",
    exampleSentenceEs: "Yo busco la plaza.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "suche", role: "verb_p1", order: 2 },
      { text: "die Stelle", role: "complement", order: 3 }
    ],
    plural: "die Stellen"
  }, {
    de: "Geld verdienen",
    pron: "guelt fea-dí-nen",
    es: "ganar dinero",
    type: "Frase",
    category: "Beruf",
    exampleSentenceDe: "Ich möchte Geld verdienen.",
    exampleSentenceEs: "Yo quiero ganar dinero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "Geld", role: "complement", order: 3 },
      { text: "verdienen", role: "verb_p2", order: 4 }
    ],
    regimen: "Verbo + Akkusativ"
  }, {
    de: "schwere / leichte Arbeit",
    pron: "shvé-re  láij-te ar-báit",
    es: "trabajo pesado/ligero",
    type: "Frase",
    category: "Beruf",
    exampleSentenceDe: "Die Arbeit ist schwer.",
    exampleSentenceEs: "El trabajo es pesado.",
    exampleSentenceDeBlocks: [
      { text: "Die Arbeit", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schwer", role: "complement", order: 3 }
    ],
    regimen: "Adj. + sustantivo neutro"
  }, {
    de: "das Internet",
    pron: "das ín-ta-net",
    es: "internet",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Ich habe das Internet. Das Internet ist gut.",
    exampleSentenceEs: "Tengo internet. Internet es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Internet", role: "complement", order: 3 }
    ],
    plural: "die Internets"
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ta",
    es: "computador",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Ich habe einen Computer. Der Computer ist neu.",
    exampleSentenceEs: "Tengo un computador. El computador es nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Computer", role: "complement", order: 3 }
    ],
    plural: "die Computer"
  }, {
    de: "der Drucker",
    pron: "dea drú-ka",
    es: "impresora",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Das ist mein Drucker. Der Drucker ist neu.",
    exampleSentenceEs: "Esta es mi impresora. La impresora es nueva.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Drucker", role: "complement", order: 3 }
    ],
    plural: "die Drucker"
  }, {
    de: "der Bleistift",
    pron: "dea blái-shtift",
    es: "lápiz",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Das ist ein Bleistift. Der Bleistift ist blau.",
    exampleSentenceEs: "Esto es un lápiz. El lápiz es azul.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein Bleistift", role: "complement", order: 3 }
    ],
    plural: "die Bleistifte"
  }, {
    de: "der Kugelschreiber",
    pron: "dea kú-guel-shrái-ba",
    es: "bolígrafo",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Ich habe einen Kugelschreiber. Der Kugelschreiber ist blau.",
    exampleSentenceEs: "Tengo un bolígrafo. El bolígrafo es azul.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "einen Kugelschreiber", role: "complement", order: 3 }
    ],
    plural: "die Kugelschreiber"
  }, {
    de: "der Schreibtisch",
    pron: "dea shráip-tish",
    es: "escritorio",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Der Schreibtisch ist groß.",
    exampleSentenceEs: "El escritorio es grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Schreibtisch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "groß", role: "complement", order: 3 }
    ],
    plural: "die Schreibtische"
  }, {
    de: "das Zeugnis",
    pron: "das tsóik-nis",
    es: "boletín de notas",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich habe das Zeugnis. Das Zeugnis ist gut.",
    exampleSentenceEs: "Tengo el boletín de notas. El boletín de notas es bueno.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Zeugnis", role: "complement", order: 3 }
    ],
    plural: "die Zeugnisse"
  }, {
    de: "der Stundenplan",
    pron: "dea shtún-den-plan",
    es: "horario de clases",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich habe der Stundenplan.",
    exampleSentenceEs: "Tengo el horario de clases.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "der Stundenplan", role: "complement", order: 3 }
    ],
    plural: "die Stundenpläne"
  }, {
    de: "fehlen",
    pron: "fé-len",
    es: "faltar",
    type: "Verbo",
    category: "Bildung",
    exampleSentenceDe: "Mir fehlen die Zähne.",
    exampleSentenceEs: "Me faltan los dientes.",
    exampleSentenceDeBlocks: [
      { text: "Mir", role: "subject", order: 1 },
      { text: "fehlen", role: "verb_p1", order: 2 },
      { text: "die Zähne", role: "complement", order: 3 }
    ],
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "bestehen",
    pron: "be-shté-en",
    es: "aprobar",
    type: "Verbo",
    category: "Bildung",
    exampleSentenceDe: "Die Prüfung besteht aus zehn Fragen.",
    exampleSentenceEs: "El examen consta de diez preguntas.",
    exampleSentenceDeBlocks: [
      { text: "Die Prüfung", role: "subject", order: 1 },
      { text: "besteht", role: "verb_p1", order: 2 },
      { text: "aus zehn Fragen", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ, no separable"
  }, {
    de: "durchfallen",
    pron: "dúrch-fa-len",
    es: "reprobar",
    type: "Verbo separable",
    category: "Bildung",
    exampleSentenceDe: "Ich falle bei der Prüfung durch.",
    exampleSentenceEs: "Reprobo en el examen.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "falle", role: "verb_p1", order: 2 },
      { text: "bei der Prüfung", role: "complement", order: 3 },
      { text: "durch", role: "verb_p2", order: 4 }
    ],
    regimen: "Separable (durch-)"
  }, {
    de: "die Besprechung",
    pron: "di be-shpré-jung",
    es: "la reunión",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Die Besprechung ist um neun Uhr.",
    exampleSentenceEs: "La reunión es a las nueve.",
    exampleSentenceDeBlocks: [
      { text: "Die Besprechung", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "um neun Uhr", role: "complement", order: 3 }
    ],
    plural: "die Besprechungen"
  }, {
    de: "kündigen",
    pron: "kún-di-guen",
    es: "renunciar",
    type: "Verbo",
    category: "Beruf",
    exampleSentenceDe: "Ich kündige meinen Job.",
    exampleSentenceEs: "Yo renuncio a mi trabajo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kündige", role: "verb_p1", order: 2 },
      { text: "meinen Job", role: "complement", order: 3 }
    ],
    regimen: "+ Dativ"
  }, {
    de: "befördern",
    pron: "be-féa-den",
    es: "ascender",
    type: "Verbo",
    category: "Beruf",
    exampleSentenceDe: "Ich befördere meine Tasche.",
    exampleSentenceEs: "Yo transporte mi bolso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "befördere", role: "verb_p1", order: 2 },
      { text: "meine Tasche", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "die Universität",
    pron: "di u-ni-vea-si-tét",
    es: "universidad",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich bin an der Universität. Die Universität ist groß.",
    exampleSentenceEs: "Yo estoy en la universidad. La universidad es grande.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "an der Universität", role: "complement", order: 3 }
    ],
    plural: "die Universitäten"
  }, {
    de: "anmelden",
    pron: "án-mel-den",
    es: "inscribirse",
    type: "Verbo",
    category: "Bildung",
    exampleSentenceDe: "Ich melde mich für den Kurs an.",
    exampleSentenceEs: "Me inscribo para el curso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "melde", role: "verb_p1", order: 2 },
      { text: "mich für den Kurs", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    regimen: "Sep./refl. + Akkusativ"
  }, {
    de: "die Anmeldung",
    pron: "di án-mel-dung",
    es: "inscripción",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache die Anmeldung für den Kurs.",
    exampleSentenceEs: "Yo hago la inscripción para el curso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "die Anmeldung für den Kurs", role: "complement", order: 3 }
    ],
    plural: "die Anmeldungen"
  }, {
    de: "sprechen",
    pron: "shpré-jen",
    es: "hablar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich spreche Deutsch.",
    exampleSentenceEs: "Yo hablo alemán.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "spreche", role: "verb_p1", order: 2 },
      { text: "Deutsch", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ, irr. (spricht)"
  }, {
    de: "verstehen",
    pron: "fea-shté-en",
    es: "entender",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich verstehe das.",
    exampleSentenceEs: "Yo entiendo eso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "verstehe", role: "verb_p1", order: 2 },
      { text: "das", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ"
  }, {
    de: "fragen",
    pron: "frá-guen",
    es: "preguntar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich frage dich.",
    exampleSentenceEs: "Yo te pregunto.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "frage", role: "verb_p1", order: 2 },
      { text: "dich", role: "complement", order: 3 }
    ],
    regimen: "+ Akkusativ (jdn.)"
  }, {
    de: "antworten",
    pron: "ánt-vor-ten",
    es: "responder",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich antworte auf deine Frage.",
    exampleSentenceEs: "Yo respondo a tu pregunta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "antworte", role: "verb_p1", order: 2 },
      { text: "auf deine Frage", role: "complement", order: 3 }
    ],
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "erklären",
    pron: "ea-klé-ren",
    es: "explicar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich kann das nicht erklären.",
    exampleSentenceEs: "Yo no puedo explicar eso.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "das nicht", role: "complement", order: 3 },
      { text: "erklären", role: "verb_p2", order: 4 }
    ],
    regimen: "jdm. + Akk."
  }, {
    de: "wiederholen",
    pron: "ví-da-jó-len",
    es: "repetir",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Bitte wiederholen Sie das.",
    exampleSentenceEs: "Por favor, repita eso.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "wiederholen", role: "verb_p1", order: 2 },
      { text: "Sie", role: "complement", order: 3 },
      { text: "das", role: "verb_p2", order: 4 }
    ],
    regimen: "No separable, + Akk."
  },
  {
    de: "der Architekt / die Architektin",
    pron: "dea ar-ji-tékt",
    es: "arquitecto",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Architekten",
    en: "architect with blueprints",
    exampleSentenceDe: "Der Architekt plant das Haus.",
    exampleSentenceEs: "El arquitecto planea la casa.",
    exampleSentenceDeBlocks: [
      { text: "Der Architekt", role: "subject", order: 1 },
      { text: "plant", role: "verb_p1", order: 2 },
      { text: "das Haus", role: "complement", order: 3 }
    ]
  }, {
        de: "der Anwalt / die Anwältin",
    pron: "dea án-valt",
    es: "abogado",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Anwälte",
    en: "lawyer in a suit with a briefcase",
    exampleSentenceDe: "Ich brauche einen Anwalt.",
    exampleSentenceEs: "Necesito un abogado.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "einen Anwalt", role: "complement", order: 3 }
    ]
  }, {
        de: "der Richter / die Richterin",
    pron: "dea ríj-ter",
    es: "juez",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Richter",
    en: "judge holding a wooden gavel",
    exampleSentenceDe: "Der Richter ist sehr streng.",
    exampleSentenceEs: "El juez es muy estricto.",
    exampleSentenceDeBlocks: [
      { text: "Der Richter", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr streng", role: "complement", order: 3 }
    ]
  }, {
        de: "der Schauspieler",
    pron: "dea sháu-shpi-ler",
    es: "actor",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Schauspieler",
    en: "actor holding a theater mask",
    exampleSentenceDe: "Er ist ein bekannter actor.",
    exampleSentenceEs: "Él es un actor conocido.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein bekannter actor", role: "complement", order: 3 }
    ]
  }, {
        de: "der Bäcker / die Bäckerin",
    pron: "dea bé-ker",
    es: "panadero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Bäcker",
    en: "baker holding fresh bread",
    exampleSentenceDe: "Der Bäcker arbeitet in der Nacht.",
    exampleSentenceEs: "El panadero trabaja en la noche.",
    exampleSentenceDeBlocks: [
      { text: "Der Bäcker", role: "subject", order: 1 },
      { text: "arbeitet", role: "verb_p1", order: 2 },
      { text: "in der Nacht", role: "complement", order: 3 }
    ]
  }, {
        de: "der Metzger / die Metzgerin",
    pron: "dea méts-guer",
    es: "carnicero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Metzger",
    en: "butcher cutting meat",
    exampleSentenceDe: "Ich kaufe Fleisch beim Metzger.",
    exampleSentenceEs: "Compro carne en el carnicero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "kaufe", role: "verb_p1", order: 2 },
      { text: "Fleisch beim Metzger", role: "complement", order: 3 }
    ]
  }, {
        de: "der Friseur / die Friseurin",
    pron: "dea fri-zöa",
    es: "peluquero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Friseure",
    en: "hairdresser with scissors",
    exampleSentenceDe: "Ich gehe morgen zum Friseur.",
    exampleSentenceEs: "Mañana voy al peluquero.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gehe", role: "verb_p1", order: 2 },
      { text: "morgen zum Friseur", role: "complement", order: 3 }
    ]
  }, {
        de: "der Soldat / die Soldatin",
    pron: "dea zol-dát",
    es: "soldado",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Soldaten",
    en: "soldier in uniform",
    exampleSentenceDe: "Mein Bruder ist Soldat.",
    exampleSentenceEs: "Mi hermano es soldado.",
    exampleSentenceDeBlocks: [
      { text: "Mein Bruder", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Soldat", role: "complement", order: 3 }
    ]
  }, {
        de: "der Künstler / die Künstlerin",
    pron: "dea küns-tler",
    es: "artista",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Künstler",
    en: "artist holding a paint palette",
    exampleSentenceDe: "Sie ist eine freie Künstlerin.",
    exampleSentenceEs: "Ella es una artista independiente.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "eine freie Künstlerin", role: "complement", order: 3 }
    ]
  }, {
        de: "der Bauer / die Bäuerin",
    pron: "dea báu-er",
    es: "granjero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Bauern",
    en: "farmer holding a pitchfork",
    exampleSentenceDe: "Der Bauer hat viele Kühe.",
    exampleSentenceEs: "El granjero tiene muchas vacas.",
    exampleSentenceDeBlocks: [
      { text: "Der Bauer", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "viele Kühe", role: "complement", order: 3 }
    ]
  },
  {
    de: "der Kellner / die Kellnerin",
    pron: "dea kel-na / di kel-ne-rin",
    es: "el camarero / la camarera",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Kellner / die Kellnerinnen",
    en: "a silver serving tray",
    exampleSentenceDe: "Der Kellner bringt das Essen.",
    exampleSentenceEs: "Camarero trae la comida.",
    exampleSentenceDeBlocks: [
      { text: "Der Kellner", role: "subject", order: 1 },
      { text: "bringt", role: "verb_p1", order: 2 },
      { text: "das Essen", role: "complement", order: 3 }
    ]
  }, {
        de: "der Koch / die Köchin",
    pron: "dea koj / di ko-jin",
    es: "el cocinero / la cocinera",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Köche / die Köchinnen",
    en: "a white chef hat and a spatula",
    exampleSentenceDe: "Der Koch kocht sehr gut.",
    exampleSentenceEs: "El cocinero cocina muy bien.",
    exampleSentenceDeBlocks: [
      { text: "Der Koch", role: "subject", order: 1 },
      { text: "kocht", role: "verb_p1", order: 2 },
      { text: "sehr gut", role: "complement", order: 3 }
    ]
  }, {
        de: "der Polizist / die Polizistin",
    pron: "dea po-li-tsist / di po-li-tsis-tin",
    es: "el policía / la mujer policía",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Polizisten / die Polizistinnen",
    en: "a silver police badge",
    exampleSentenceDe: "Die Polizei hilft den Menschen.",
    exampleSentenceEs: "La policía ayuda a las personas.",
    exampleSentenceDeBlocks: [
      { text: "Die Polizei", role: "subject", order: 1 },
      { text: "hilft", role: "verb_p1", order: 2 },
      { text: "den Menschen", role: "complement", order: 3 }
    ]
  }, {
        de: "der Ingenieur / die Ingenieurin",
    pron: "dea in-ye-niur / di in-ye-niu-rin",
    es: "el ingeniero / la ingeniera",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Ingenieure / die Ingenieurinnen",
    en: "a yellow safety helmet over blueprints",
    exampleSentenceDe: "Sie arbeitet als Ingenieurin bei BMW.",
    exampleSentenceEs: "Ella trabaja como ingeniera en BMW.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "arbeitet", role: "verb_p1", order: 2 },
      { text: "als Ingenieurin bei BMW", role: "complement", order: 3 }
    ]
  }, {
        de: "das Heft",
    pron: "das jeft",
    es: "el cuaderno",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Hefte",
    en: "a simple spiral notebook",
    exampleSentenceDe: "Schreiben Sie das bitte in Ihr Heft.",
    exampleSentenceEs: "Escriba eso en su cuaderno, por favor.",
    exampleSentenceDeBlocks: [
      { text: "Schreiben", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "das bitte in Ihr Heft", role: "complement", order: 3 }
    ]
  }, {
        de: "das Papier",
    pron: "das pa-pia",
    es: "el papel",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Papiere",
    en: "a stack of blank white paper sheets",
    exampleSentenceDe: "Der Drucker braucht neues Papier.",
    exampleSentenceEs: "La impresora necesita papel nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Der Drucker", role: "subject", order: 1 },
      { text: "braucht", role: "verb_p1", order: 2 },
      { text: "neues Papier", role: "complement", order: 3 }
    ]
  }, {
        de: "der Radiergummi",
    pron: "dea ra-dia-gu-mi",
    es: "el borrador / la goma",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Radiergummis",
    en: "a classic pink and blue eraser",
    exampleSentenceDe: "Hast du einen Radiergummi für mich?",
    exampleSentenceEs: "¿Tienes un borrador para mí?",
    exampleSentenceDeBlocks: [
      { text: "Hast", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "einen Radiergummi für mich", role: "complement", order: 3 }
    ]
  }, {
        de: "der Rucksack",
    pron: "dea ruk-sak",
    es: "la mochila",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Rucksäcke",
    en: "a colorful school backpack",
    exampleSentenceDe: "Mein Rucksack ist sehr schwer.",
    exampleSentenceEs: "Mi mochila es muy pesada.",
    exampleSentenceDeBlocks: [
      { text: "Mein Rucksack", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr schwer", role: "complement", order: 3 }
    ]
  },
    {
      de: "der Vertrag",
      pron: "dea fea-trák",
      es: "contrato",
      type: "Sustantivo (Masc)",
      category: "Beruf",
      regimen: "-",
      plural: "die Verträge",
      exampleSentenceDe: "Ich muss den Arbeitsvertrag genau durchlesen.",
      exampleSentenceEs: "Tengo que leer detenidamente el contrato de trabajo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "den Arbeitsvertrag genau", role: "complement", order: 3 },
      { text: "durchlesen", role: "verb_p2", order: 4 }
    ],
      en: "multi page paper contract with fountain pen signature"
    },
    {
      de: "das Gehalt",
      pron: "das gue-jált",
      es: "salario / sueldo mensual",
      type: "Sustantivo (Neutro)",
      category: "Beruf",
      regimen: "-",
      plural: "die Gehälter",
      exampleSentenceDe: "Das Gehalt wird immer am Monatsende bezahlt.",
      exampleSentenceEs: "El sueldo se paga siempre a final de mes.",
    exampleSentenceDeBlocks: [
      { text: "Das Gehalt", role: "subject", order: 1 },
      { text: "wird", role: "verb_p1", order: 2 },
      { text: "immer am Monatsende bezahlt", role: "complement", order: 3 }
    ],
      en: "money bag with euro coin symbol on salary payslip"
    },
    {
      de: "die Bewerbung",
      pron: "di be-vér-bung",
      es: "candidatura / postulación laboral",
      type: "Sustantivo (Fem)",
      category: "Beruf",
      regimen: "-",
      plural: "die Bewerbungen",
      exampleSentenceDe: "Ich habe meine Bewerbung per E-Mail geschickt.",
      exampleSentenceEs: "Envié mi candidatura por correo electrónico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "meine Bewerbung per E-Mail geschickt", role: "complement", order: 3 }
    ],
      en: "clean job application dossier folder with photo resume"
    },
    {
      de: "sich bewerben",
      pron: "zij be-vér-ben",
      es: "postularse a un empleo",
      type: "Verbo Reflexivo",
      category: "Beruf",
      regimen: "Reflexivo / um + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Er bewirbt sich um eine Stelle als Techniker.",
      exampleSentenceEs: "Él se postula a un puesto como técnico.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "bewirbt", role: "verb_p1", order: 2 },
      { text: "sich um eine Stelle als Techniker", role: "complement", order: 3 }
    ],
      en: "candidate having confident job interview at office table"
    },
    {
      de: "die Probezeit",
      pron: "di pró-be-tsait",
      es: "periodo de prueba laboral",
      type: "Sustantivo (Fem)",
      category: "Beruf",
      regimen: "-",
      plural: "die Probezeiten",
      exampleSentenceDe: "In den ersten sechs Monaten habe ich Probezeit.",
      exampleSentenceEs: "Durante los primeros seis meses tengo periodo de prueba.",
    exampleSentenceDeBlocks: [
      { text: "In den", role: "subject", order: 1 },
      { text: "ersten", role: "verb_p1", order: 2 },
      { text: "sechs Monaten habe ich Probezeit", role: "complement", order: 3 }
    ],
      en: "calendar showing initial trial months highlighted"
    },
    {
      de: "die Überstunden",
      pron: "di ú-bea-shtún-den",
      es: "horas extraordinarias",
      type: "Sustantivo (Plural)",
      category: "Beruf",
      regimen: "-",
      plural: "die Überstunden",
      exampleSentenceDe: "Diese Woche habe ich fünf Überstunden gemacht.",
      exampleSentenceEs: "Esta semana hice cinco horas extraordinarias.",
    exampleSentenceDeBlocks: [
      { text: "Diese Woche", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "ich fünf Überstunden gemacht", role: "complement", order: 3 }
    ],
      en: "office desk clock showing late evening overtime hours"
    },
    {
      de: "die Teilzeit / Vollzeit",
      pron: "di táil-tsait / fól-tsait",
      es: "tiempo parcial / tiempo completo",
      type: "Sustantivo (Fem)",
      category: "Beruf",
      regimen: "-",
      plural: "-",
      exampleSentenceDe: "Sie arbeitet in Teilzeit mit 25 Stunden pro Woche.",
      exampleSentenceEs: "Ella trabaja a tiempo parcial con 25 horas a la semana.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "arbeitet", role: "verb_p1", order: 2 },
      { text: "in Teilzeit mit 25 Stunden pro Woche", role: "complement", order: 3 }
    ],
      en: "pie chart showing half time versus full time work shift"
    },
    {
      de: "vereinbaren",
      pron: "fea-áin-ba-ren",
      es: "concertar / acordar (cita)",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Ich möchte einen Termin beim Arzt vereinbaren.",
      exampleSentenceEs: "Quisiera concertar una cita en el médico.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "einen Termin beim Arzt", role: "complement", order: 3 },
      { text: "vereinbaren", role: "verb_p2", order: 4 }
    ],
      en: "marking scheduled appointment slot on desk calendar"
    },
    {
      de: "verschieben",
      pron: "fea-shí-ben",
      es: "posponer / aplazar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      plural: "-",
      exampleSentenceDe: "Können wir unseren Termin auf Freitag verschieben?",
      exampleSentenceEs: "¿Podemos aplazar nuestra cita para el viernes?",
    exampleSentenceDeBlocks: [
      { text: "Können", role: "verb_p1", order: 1 },
      { text: "wir", role: "subject", order: 2 },
      { text: "unseren Termin auf Freitag", role: "complement", order: 3 },
      { text: "verschieben", role: "verb_p2", order: 4 }
    ],
      en: "calendar arrow moving meeting date to another day"
    },
    {
      de: "absagen",
      pron: "áp-sá-guen",
      es: "cancelar / anular",
      type: "Verbo separable",
      category: "Aktionen",
      regimen: "Separable (ab-) / + Akkusativ",
      plural: "-",
      exampleSentenceDe: "Leider muss ich meinen Termin heute absagen.",
      exampleSentenceEs: "Lamentablemente tengo que cancelar mi cita de hoy.",
    exampleSentenceDeBlocks: [
      { text: "Leider", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "ich meinen Termin heute", role: "complement", order: 3 },
      { text: "absagen", role: "verb_p2", order: 4 }
    ],
      en: "red cross cancellation mark over calendar date box"
    }]
},
{
  id: 17,
  title: "Kapitel 17: Digitale Welt & IT",
  icon: <Laptop size={20} />,
  emoji: "💻",
  words: [{
    de: "der Laptop",
    pron: "dea láp-top",
    es: "el portátil",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Laptops",
    en: "a cute 3D isometric UI icon of a silver laptop computer",
    exampleSentenceDe: "Ich brauche einen neuen Laptop.",
    exampleSentenceEs: "Necesito un portátil nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "einen neuen Laptop", role: "complement", order: 3 }
    ]
  }, {
    de: "der Bildschirm",
    pron: "dea bilt-shirm",
    es: "la pantalla",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Bildschirme",
    en: "a cute 3D isometric UI icon of a glowing computer monitor",
    exampleSentenceDe: "Der Bildschirm ist sehr groß.",
    exampleSentenceEs: "La pantalla es muy grande.",
    exampleSentenceDeBlocks: [
      { text: "Der Bildschirm", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr groß", role: "complement", order: 3 }
    ]
  }, {
    de: "die Tastatur",
    pron: "di tas-ta-túr",
    es: "el teclado",
    type: "Sustantivo (Fem)",
    category: "Hardware",
    plural: "die Tastaturen",
    en: "a cute 3D isometric UI icon of a mechanical computer keyboard",
    exampleSentenceDe: "Meine Tastatur ist leider kaputt.",
    exampleSentenceEs: "Mi teclado lamentablemente está roto.",
    exampleSentenceDeBlocks: [
      { text: "Meine Tastatur", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "leider kaputt", role: "complement", order: 3 }
    ]
  }, {
    de: "die Maus",
    pron: "di maus",
    es: "el ratón",
    type: "Sustantivo (Fem)",
    category: "Hardware",
    plural: "die Mäuse",
    en: "a cute 3D isometric UI icon of a computer mouse emitting wireless signal waves",
    exampleSentenceDe: "Meine neue Maus ist kabellos.",
    exampleSentenceEs: "Mi ratón nuevo es inalámbrico.",
    exampleSentenceDeBlocks: [
      { text: "Meine", role: "subject", order: 1 },
      { text: "neue", role: "verb_p1", order: 2 },
      { text: "Maus ist kabellos", role: "complement", order: 3 }
    ]
  }, {
    de: "das Passwort",
    pron: "das pás-vort",
    es: "la contraseña",
    type: "Sustantivo (Neut)",
    category: "Sicherheit",
    plural: "die Passwörter",
    en: "a cute 3D isometric UI icon of a golden key over a metallic padlock",
    exampleSentenceDe: "Mein Passwort ist sehr sicher.",
    exampleSentenceEs: "Mi contraseña es muy segura.",
    exampleSentenceDeBlocks: [
      { text: "Mein Passwort", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr sicher", role: "complement", order: 3 }
    ]
  }, {
    de: "die Datei",
    pron: "di da-tái",
    es: "el archivo",
    type: "Sustantivo (Fem)",
    category: "Software",
    plural: "die Dateien",
    en: "a cute 3D isometric UI icon of a digital document sheet with a folded corner",
    exampleSentenceDe: "Ich lösche diese Datei.",
    exampleSentenceEs: "Borro este archivo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lösche", role: "verb_p1", order: 2 },
      { text: "diese Datei", role: "complement", order: 3 }
    ]
  }, {
    de: "der Ordner",
    pron: "dea ór-dner",
    es: "la carpeta",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Ordner",
    en: "a cute 3D isometric UI icon of a yellow folder organizer",
    exampleSentenceDe: "Der Ordner ist auf dem Desktop.",
    exampleSentenceEs: "La carpeta está en el escritorio.",
    exampleSentenceDeBlocks: [
      { text: "Der Ordner", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "auf dem Desktop", role: "complement", order: 3 }
    ]
  }, {
    de: "der Kopfhörer",
    pron: "dea kopf-jö-rer",
    es: "los auriculares",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Kopfhörer",
    en: "a cute 3D isometric UI icon of modern wireless headphones",
    exampleSentenceDe: "Ich höre Musik mit dem Kopfhörer.",
    exampleSentenceEs: "Escucho música con los auriculares.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "höre", role: "verb_p1", order: 2 },
      { text: "Musik mit dem Kopfhörer", role: "complement", order: 3 }
    ]
  }, {
    de: "die App",
    pron: "di ep",
    es: "la aplicación",
    type: "Sustantivo (Fem)",
    category: "Software",
    plural: "die Apps",
    en: "a cute 3D isometric UI icon of a smartphone showing colorful utility widgets",
    exampleSentenceDe: "Diese App ist sehr nützlich.",
    exampleSentenceEs: "Esta aplicación es muy útil.",
    exampleSentenceDeBlocks: [
      { text: "Diese App", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr nützlich", role: "complement", order: 3 }
    ]
  }, {
    de: "der Drucker",
    pron: "dea drú-ker",
    es: "la impresora",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Drucker",
    en: "a cute 3D isometric UI icon of a modern office printer ejecting a paper page",
    exampleSentenceDe: "Der Drucker hat kein Papier mehr.",
    exampleSentenceEs: "La impresora ya no tiene papel.",
    exampleSentenceDeBlocks: [
      { text: "Der Drucker", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "kein Papier mehr", role: "complement", order: 3 }
    ]
  }, {
    de: "das Netzwerk",
    pron: "das néts-verk",
    es: "la red",
    type: "Sustantivo (Neut)",
    category: "Internet",
    plural: "die Netzwerke",
    en: "a cute 3D isometric UI icon of interconnected digital nodes glowing blue",
    exampleSentenceDe: "Das Netzwerk im Büro ist schnell.",
    exampleSentenceEs: "La red en la oficina es rápida.",
    exampleSentenceDeBlocks: [
      { text: "Das Netzwerk im Büro", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "schnell", role: "complement", order: 3 }
    ]
  }, {
    de: "der Link",
    pron: "dea link",
    es: "el enlace",
    type: "Sustantivo (Masc)",
    category: "Internet",
    plural: "die Links",
    en: "a cute 3D isometric UI icon of a chain link connection symbol",
    exampleSentenceDe: "Bitte klicke auf diesen Link.",
    exampleSentenceEs: "Por favor, haz clic en este enlace.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "klicke", role: "verb_p1", order: 2 },
      { text: "auf diesen Link", role: "complement", order: 3 }
    ]
  }, {
    de: "das Internet",
    pron: "das ín-ter-net",
    es: "el internet",
    type: "Sustantivo (Neut)",
    category: "Internet",
    plural: "die Internetanschlüsse",
    en: "a cute 3D isometric UI icon of a digital globe spinning in a cloud",
    exampleSentenceDe: "Das Internet ist heute langsam.",
    exampleSentenceEs: "El internet hoy está lento.",
    exampleSentenceDeBlocks: [
      { text: "Das Internet", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heute langsam", role: "complement", order: 3 }
    ]
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ter",
    es: "el ordenador",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Computer",
    en: "a cute 3D isometric UI icon of a desktop computer setup with a keyboard and mouse",
    exampleSentenceDe: "Mein Computer ist sehr alt.",
    exampleSentenceEs: "Mi ordenador es muy viejo.",
    exampleSentenceDeBlocks: [
      { text: "Mein Computer", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr alt", role: "complement", order: 3 }
    ]
  }, {
    de: "das WLAN",
    pron: "das ve-lan",
    es: "el wifi",
    type: "Sustantivo (Neut)",
    category: "Internet",
    plural: "die WLAN-Netze",
    en: "a cute 3D isometric UI icon of a router emitting glowing wireless signal waves",
    exampleSentenceDe: "Haben Sie das WLAN-Passwort?",
    exampleSentenceEs: "¿Tiene la contraseña del wifi?",
    exampleSentenceDeBlocks: [
      { text: "Haben", role: "verb_p1", order: 1 },
      { text: "Sie", role: "subject", order: 2 },
      { text: "das WLAN-Passwort", role: "complement", order: 3 }
    ]
  }, {
    de: "die Cloud",
    pron: "di klaud",
    es: "la nube",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die Clouds",
    en: "a cute 3D isometric UI icon of a glowing blue cloud storage icon",
    exampleSentenceDe: "Ich speichere die Fotos in der Cloud.",
    exampleSentenceEs: "Guardo las fotos en la nube.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "speichere", role: "verb_p1", order: 2 },
      { text: "die Fotos in der Cloud", role: "complement", order: 3 }
    ]
  }, {
    de: "die Webseite",
    pron: "di vép-zai-te",
    es: "la página web",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die Webseiten",
    en: "a cute 3D isometric UI icon of a web browser interface page showing layouts",
    exampleSentenceDe: "Diese Webseite gefällt mir gut.",
    exampleSentenceEs: "Esta página web me gusta mucho.",
    exampleSentenceDeBlocks: [
      { text: "Diese Webseite", role: "subject", order: 1 },
      { text: "gefällt", role: "verb_p1", order: 2 },
      { text: "mir gut", role: "complement", order: 3 }
    ]
  }, {
    de: "die E-Mail-Adresse",
    pron: "di í-meil-a-dré-se",
    es: "la dirección de correo",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die E-Mail-Adressen",
    en: "a cute 3D isometric UI icon of a digital technical mail envelope with an @ symbol",
    exampleSentenceDe: "Wie ist deine E-Mail-Adresse?",
    exampleSentenceEs: "¿Cuál es tu dirección de correo electrónico?",
    exampleSentenceDeBlocks: [
      { text: "Wie", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "deine E-Mail-Adresse", role: "complement", order: 3 }
    ]
  }, {
    de: "die E-Mail",
    pron: "di í-meil",
    es: "el correo electrónico",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die E-Mails",
    en: "a cute 3D isometric UI icon of an open envelope containing a glowing message paper",
    exampleSentenceDe: "Ich schreibe eine wichtige E-Mail.",
    exampleSentenceEs: "Escribo un correo electrónico importante.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schreibe", role: "verb_p1", order: 2 },
      { text: "eine wichtige E-Mail", role: "complement", order: 3 }
    ]
  }, {
    de: "das System",
    pron: "das zys-tém",
    es: "el sistema",
    type: "Sustantivo (Neut)",
    category: "Software",
    plural: "die Systeme",
    en: "a cute 3D isometric UI icon of interlocking technical gears under a circuit board panel",
    exampleSentenceDe: "Das System läuft sehr stabil.",
    exampleSentenceEs: "El sistema funciona muy stable.",
    exampleSentenceDeBlocks: [
      { text: "Das System", role: "subject", order: 1 },
      { text: "läuft", role: "verb_p1", order: 2 },
      { text: "sehr stabil", role: "complement", order: 3 }
    ]
  }, {
    de: "das Update",
    pron: "das áp-deit",
    es: "la actualización",
    type: "Sustantivo (Neut)",
    category: "Software",
    plural: "die Updates",
    en: "a cute 3D isometric UI icon of a circle arrow download progress symbol",
    exampleSentenceDe: "Das Update ist fertig.",
    exampleSentenceEs: "La actualización está lista.",
    exampleSentenceDeBlocks: [
      { text: "Das Update", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "fertig", role: "complement", order: 3 }
    ]
  }, {
    de: "der Code",
    pron: "der kout",
    es: "el código",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Codes",
    en: "a cute 3D isometric UI icon of code lines on a dark monitor",
    exampleSentenceDe: "Der Code hat keine Fehler.",
    exampleSentenceEs: "El código no tiene errores.",
    exampleSentenceDeBlocks: [
      { text: "Der Code", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "keine Fehler", role: "complement", order: 3 }
    ]
  }, {
    de: "der Benutzer",
    pron: "dea be-nút-tser",
    es: "el usuario",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Benutzer",
    en: "a cute 3D isometric UI icon of a glowing blue user profile silhouette tag",
    exampleSentenceDe: "Er ist ein neuer Benutzer.",
    exampleSentenceEs: "Él es un usuario nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "ein neuer Benutzer", role: "complement", order: 3 }
    ]
  }, {
    de: "der Screenshot",
    pron: "dea scrín-shot",
    es: "la captura de pantalla",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Screenshots",
    en: "a cute 3D isometric UI icon of a scissor cutting a digital screen area",
    exampleSentenceDe: "Ich mache einen Screenshot vom Bild.",
    exampleSentenceEs: "Hago una captura de pantalla de la imagen.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "einen Screenshot vom Bild", role: "complement", order: 3 }
    ]
  }, {
    de: "der Virus",
    pron: "dea ví-rus",
    es: "el virus",
    type: "Sustantivo (Masc)",
    category: "Sicherheit",
    plural: "die Viren",
    en: "a cute 3D isometric UI icon of a red virus bug with sharp legs",
    exampleSentenceDe: "Mein Laptop hat einen Virus.",
    exampleSentenceEs: "Mi portátil tiene un virus.",
    exampleSentenceDeBlocks: [
      { text: "Mein Laptop", role: "subject", order: 1 },
      { text: "hat", role: "verb_p1", order: 2 },
      { text: "einen Virus", role: "complement", order: 3 }
    ]
  }, {
    de: "die Taste",
    pron: "di tás-te",
    es: "la tecla / botón",
    type: "Sustantivo (Fem)",
    category: "Hardware",
    plural: "die Tasten",
    en: "a cute 3D isometric UI icon of a single keyboard key button",
    exampleSentenceDe: "Drücke die Enter-Taste.",
    exampleSentenceEs: "Pulsa la tecla Enter.",
    exampleSentenceDeBlocks: [
      { text: "Drücke", role: "verb_p1", order: 1 },
      { text: "die Enter-Taste", role: "subject", order: 2 }
    ]
  }, {
    de: "digital",
    pron: "di-gui-tál",
    es: "digital",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of binary numbers zero and one glowing blue",
    exampleSentenceDe: "Wir leben in einer digitalen Welt.",
    exampleSentenceEs: "Vivimos en un mundo digital.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "leben", role: "verb_p1", order: 2 },
      { text: "in einer digitalen Welt", role: "complement", order: 3 }
    ]
  }, {
    de: "online",
    pron: "ón-lain",
    es: "en línea",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of a green glowing active connection indicator light",
    exampleSentenceDe: "Bist du heute Abend online?",
    exampleSentenceEs: "¿Estarás en línea esta noche?",
    exampleSentenceDeBlocks: [
      { text: "Bist", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "heute Abend online", role: "complement", order: 3 }
    ]
  }, {
    de: "offline",
    pron: "óf-lain",
    es: "desconectado",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of a red offline disconnected plug symbol",
    exampleSentenceDe: "Ich bin im Urlaub offline.",
    exampleSentenceEs: "Estoy desconectado durante las vacaciones.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bin", role: "verb_p1", order: 2 },
      { text: "im Urlaub offline", role: "complement", order: 3 }
    ]
  }, {
    de: "kabellos",
    pron: "ká-bel-los",
    es: "inalámbrico",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of headphones emitting wireless radio waves with no cables",
    exampleSentenceDe: "Die Kopfhörer sind kabellos.",
    exampleSentenceEs: "Los auriculares son inalámbricos.",
    exampleSentenceDeBlocks: [
      { text: "Die Kopfhörer", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "kabellos", role: "complement", order: 3 }
    ]
  }, {
    de: "automatisch",
    pron: "au-to-má-tish",
    es: "automático",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of moving metallic gears",
    exampleSentenceDe: "Das System funktioniert automatisch.",
    exampleSentenceEs: "El sistema funciona automáticamente.",
    exampleSentenceDeBlocks: [
      { text: "Das System", role: "subject", order: 1 },
      { text: "funktioniert", role: "verb_p1", order: 2 },
      { text: "automatisch", role: "complement", order: 3 }
    ]
  }, {
    de: "manuell",
    pron: "ma-nu-él",
    es: "manual",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of a hand turning a dial",
    exampleSentenceDe: "Ich mache das lieber manuell.",
    exampleSentenceEs: "Hago eso mejor manualmente.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mache", role: "verb_p1", order: 2 },
      { text: "das lieber manuell", role: "complement", order: 3 }
    ]
  }, {
    de: "sicher",
    pron: "zí-jer",
    es: "seguro",
    type: "Adjetivo",
    category: "Sicherheit",
    en: "a cute 3D isometric UI icon of a glowing green cyber security shield",
    exampleSentenceDe: "Mein neues Passwort ist sehr sicher.",
    exampleSentenceEs: "Mi nueva contraseña es muy segura.",
    exampleSentenceDeBlocks: [
      { text: "Mein neues Passwort", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr sicher", role: "complement", order: 3 }
    ]
  }, {
    de: "vernetzt",
    pron: "fer-nétst",
    es: "conectado / en red",
    type: "Adjetivo",
    category: "Internet",
    en: "a cute 3D isometric UI icon of two connected digital glowing globes",
    exampleSentenceDe: "Wir sind alle gut vernetzt.",
    exampleSentenceEs: "Estamos todos bien conectados.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "alle gut vernetzt", role: "complement", order: 3 }
    ]
  }, {
    de: "virtuell",
    pron: "vir-tu-él",
    es: "virtual",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of VR virtual reality goggles glowing purple",
    exampleSentenceDe: "Wir machen ein virtuelles Treffen.",
    exampleSentenceEs: "Hacemos una reunión virtual.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "machen", role: "verb_p1", order: 2 },
      { text: "ein virtuelles Treffen", role: "complement", order: 3 }
    ]
  }, {
    de: "gesperrt",
    pron: "gue-shpért",
    es: "bloqueado",
    type: "Adjetivo",
    category: "Sicherheit",
    en: "a cute 3D isometric UI icon of a red digital lock",
    exampleSentenceDe: "Mein Handy ist leider gesperrt.",
    exampleSentenceEs: "Mi móvil está bloqueado lamentablemente.",
    exampleSentenceDeBlocks: [
      { text: "Mein Handy", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "leider", role: "complement", order: 3 },
      { text: "gesperrt", role: "verb_p2", order: 4 }
    ]
  }, {
    de: "programmieren",
    pron: "pro-gram-mí-ren",
    es: "programar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a laptop screen with program code",
    exampleSentenceDe: "Ich lerne programmieren.",
    exampleSentenceEs: "Aprendo a programar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lerne", role: "verb_p1", order: 2 },
      { text: "programmieren", role: "complement", order: 3 }
    ]
  }, {
    de: "herunterladen",
    pron: "je-rún-ter-la-den",
    es: "descargar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (herunter-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of a down arrow pointing to a hard drive disk",
    exampleSentenceDe: "Ich lade das Lied herunter.",
    exampleSentenceEs: "Descargo la canción.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lade", role: "verb_p1", order: 2 },
      { text: "das Lied herunter", role: "complement", order: 3 }
    ]
  }, {
    de: "hochladen",
    pron: "jój-la-den",
    es: "subir (archivo)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (hoch-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of an up arrow pointing to a digital cloud",
    exampleSentenceDe: "Er lädt das Video hoch.",
    exampleSentenceEs: "Él sube el video.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "lädt", role: "verb_p1", order: 2 },
      { text: "das Video", role: "complement", order: 3 },
      { text: "hoch", role: "verb_p2", order: 4 }
    ]
  }, {
    de: "speichern",
    pron: "shpái-jern",
    es: "guardar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a classic 3.5 inch blue floppy disk storage",
    exampleSentenceDe: "Bitte speichern Sie die Datei.",
    exampleSentenceEs: "Por favor, guarde el archivo.",
    exampleSentenceDeBlocks: [
      { text: "Bitte", role: "subject", order: 1 },
      { text: "speichern", role: "verb_p1", order: 2 },
      { text: "Sie die Datei", role: "complement", order: 3 }
    ]
  }, {
    de: "löschen",
    pron: "lö-shen",
    es: "borrar / eliminar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a red trash can bin overflowing with paper crumbs",
    exampleSentenceDe: "Ich möchte den Text löschen.",
    exampleSentenceEs: "Quiero borrar el texto.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "möchte", role: "verb_p1", order: 2 },
      { text: "den Text", role: "complement", order: 3 },
      { text: "löschen", role: "verb_p2", order: 4 }
    ]
  }, {
    de: "klicken",
    pron: "klí-ken",
    es: "hacer clic",
    type: "Verbo",
    category: "Aktionen",
    regimen: "intransitivo",
    en: "a cute 3D isometric UI icon of a glowing blue cursor clicking a button",
    exampleSentenceDe: "Klicke auf den Button.",
    exampleSentenceEs: "Haz clic en el botón.",
    exampleSentenceDeBlocks: [
      { text: "Klicke", role: "subject", order: 1 },
      { text: "auf", role: "verb_p1", order: 2 },
      { text: "den Button", role: "complement", order: 3 }
    ]
  }, {
    de: "tippen",
    pron: "tí-pen",
    es: "escribir (teclado)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "intransitivo",
    en: "a cute 3D isometric UI icon of hands typing on a glowing laptop keyboard",
    exampleSentenceDe: "Ich tippe sehr schnell.",
    exampleSentenceEs: "Escribo a máquina muy rápido.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "tippe", role: "verb_p1", order: 2 },
      { text: "sehr schnell", role: "complement", order: 3 }
    ]
  }, {
    de: "senden",
    pron: "zén-den",
    es: "enviar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a paper plane flying out of a digital envelope",
    exampleSentenceDe: "Ich sende das Dokument heute.",
    exampleSentenceEs: "Envío el documento hoy.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sende", role: "verb_p1", order: 2 },
      { text: "das Dokument heute", role: "complement", order: 3 }
    ]
  }, {
    de: "empfangen",
    pron: "emp-fáng-en",
    es: "recibir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a digital tray box receiving incoming letter envelopes",
    exampleSentenceDe: "Ich empfange ein Paket.",
    exampleSentenceEs: "Recibo un paquete.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "empfange", role: "verb_p1", order: 2 },
      { text: "ein Paket", role: "complement", order: 3 }
    ]
  }, {
    de: "teilen",
    pron: "tái-len",
    es: "compartir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of three connected dots sharing network lines",
    exampleSentenceDe: "Wir teilen die Datei.",
    exampleSentenceEs: "Compartimos el archivo.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "teilen", role: "verb_p1", order: 2 },
      { text: "die Datei", role: "complement", order: 3 }
    ]
  }, {
    de: "kopieren",
    pron: "ko-pí-ren",
    es: "copiar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of two identical overlapping document sheets",
    exampleSentenceDe: "Kannst du den Text kopieren?",
    exampleSentenceEs: "¿Puedes copiar el texto?",
    exampleSentenceDeBlocks: [
      { text: "Kannst", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "den Text", role: "complement", order: 3 },
      { text: "kopieren", role: "verb_p2", order: 4 }
    ]
  }, {
    de: "einfügen",
    pron: "áin-fü-guen",
    es: "pegar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (ein-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of a clipboard pasting text onto a page document",
    exampleSentenceDe: "Füge das Bild hier ein.",
    exampleSentenceEs: "Pega la imagen aquí.",
    exampleSentenceDeBlocks: [
      { text: "Füge", role: "verb_p1", order: 1 },
      { text: "das Bild", role: "subject", order: 2 },
      { text: "hier", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ]
  }, {
    de: "aktualisieren",
    pron: "ak-tua-li-zí-ren",
    es: "actualizar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of two circular green arrows turning",
    exampleSentenceDe: "Ich muss die Seite aktualisieren.",
    exampleSentenceEs: "Tengo que actualizar la página.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "muss", role: "verb_p1", order: 2 },
      { text: "die Seite", role: "complement", order: 3 },
      { text: "aktualisieren", role: "verb_p2", order: 4 }
    ]
  }, {
    de: "drucken",
    pron: "drú-ken",
    es: "imprimir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a paper sheet rolling out of a metal print head roller",
    exampleSentenceDe: "Ich drucke den Brief.",
    exampleSentenceEs: "Imprimo la carta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "drucke", role: "verb_p1", order: 2 },
      { text: "den Brief", role: "complement", order: 3 }
    ]
  }]
},
{
  id: 18,
  title: "Kapitel 18: Elektrotechnik & Solar",
  icon: <Zap size={20} />,
  emoji: "⚡",
  words: [{
    de: "der Strom",
    pron: "dea shtrom",
    es: "la electricidad / corriente",
    type: "Sustantivo (Masc)",
    category: "Elektrizität",
    plural: "die Ströme",
    en: "a cute 3D isometric UI icon of a glowing yellow lightning bolt"
  }, {
    de: "die Spannung",
    pron: "di shpá-nung",
    es: "el voltaje / tensión",
    type: "Sustantivo (Fem)",
    category: "Elektrizität",
    plural: "die Spannungen",
    en: "a cute 3D isometric UI icon of an electrical voltmeter dial"
  }, {
    de: "der Stromkreis",
    pron: "dea shtróm-krais",
    es: "el circuito eléctrico",
    type: "Sustantivo (Masc)",
    category: "Elektrizität",
    plural: "die Stromkreise",
    en: "a cute 3D isometric UI icon of a closed electrical circuit with a glowing lightbulb"
  }, {
    de: "das Kabel",
    pron: "das ká-bel",
    es: "el cable",
    type: "Sustantivo (Neutro)",
    category: "Komponenten",
    plural: "die Kabel",
    en: "a cute 3D isometric UI icon of a thick industrial electrical copper cable spool"
  }, {
    de: "der Stecker",
    pron: "dea shté-ka",
    es: "el enchufe (macho)",
    type: "Sustantivo (Masc)",
    category: "Komponenten",
    plural: "die Stecker",
    en: "a cute 3D isometric UI icon of a standard European electrical plug"
  }, {
    de: "die Steckdose",
    pron: "di shték-do-ze",
    es: "la toma de corriente",
    type: "Sustantivo (Fem)",
    category: "Komponenten",
    plural: "die Steckdosen",
    en: "a cute 3D isometric UI icon of an electrical wall socket"
  }, {
    de: "der Schalter",
    pron: "dea shál-ta",
    es: "el interruptor",
    type: "Sustantivo (Masc)",
    category: "Komponenten",
    plural: "die Schalter",
    en: "a cute 3D isometric UI icon of a modern wall light switch"
  }, {
    de: "die Sicherung",
    pron: "di zí-je-rung",
    es: "el fusible / el taco",
    type: "Sustantivo (Fem)",
    category: "Komponenten",
    plural: "die Sicherungen",
    en: "a cute 3D isometric UI icon of an electrical fuse breaker box"
  }, {
    de: "der Transformator",
    pron: "dea trans-for-má-tor",
    es: "el transformador",
    type: "Sustantivo (Masc)",
    category: "Komponenten",
    plural: "die Transformatoren",
    en: "a cute 3D isometric UI icon of an industrial electrical power transformer"
  }, {
    de: "die Batterie",
    pron: "di ba-te-rí",
    es: "la batería",
    type: "Sustantivo (Fem)",
    category: "Energie",
    plural: "die Batterien",
    en: "a cute 3D isometric UI icon of a standard AA battery"
  }, {
    de: "der Akku",
    pron: "dea á-ku",
    es: "la batería recargable",
    type: "Sustantivo (Masc)",
    category: "Energie",
    plural: "die Akkus",
    en: "a cute 3D isometric UI icon of a lithium ion rechargeable battery pack"
  }, {
    de: "der Zähler",
    pron: "dea tsé-la",
    es: "el medidor eléctrico",
    type: "Sustantivo (Masc)",
    category: "Komponenten",
    plural: "die Zähler",
    en: "a cute 3D isometric UI icon of a smart electrical power meter"
  }, {
    de: "die Erdung",
    pron: "di ér-dung",
    es: "la toma de tierra",
    type: "Sustantivo (Fem)",
    category: "Sicherheit",
    plural: "die Erdungen",
    en: "a cute 3D isometric UI icon of a copper grounding rod symbol"
  }, {
    de: "der Kurzschluss",
    pron: "dea kúrts-shlus",
    es: "el cortocircuito",
    type: "Sustantivo (Masc)",
    category: "Sicherheit",
    plural: "die Kurzschlüsse",
    en: "a cute 3D isometric UI icon of electric sparks and a broken wire"
  }, {
    de: "die Solaranlage",
    pron: "di zo-lár-an-la-gue",
    es: "el sistema solar / fotovoltaico",
    type: "Sustantivo (Fem)",
    category: "Solartechnik",
    plural: "die Solaranlagen",
    en: "a cute 3D isometric UI icon of a house roof with shiny solar panels"
  }, {
    de: "das Solarmodul",
    pron: "das zo-lár-mo-dul",
    es: "el módulo solar",
    type: "Sustantivo (Neutro)",
    category: "Solartechnik",
    plural: "die Solarmodule",
    en: "a cute 3D isometric UI icon of a single large blue solar panel"
  }, {
    de: "die Solarzelle",
    pron: "di zo-lár-tse-le",
    es: "la célula solar",
    type: "Sustantivo (Fem)",
    category: "Solartechnik",
    plural: "die Solarzellen",
    en: "a cute 3D isometric UI icon of a micro photovoltaic solar cell grid"
  }, {
    de: "der Wechselrichter",
    pron: "dea vék-sel-rij-ta",
    es: "el inversor (AC/DC)",
    type: "Sustantivo (Masc)",
    category: "Solartechnik",
    plural: "die Wechselrichter",
    en: "a cute 3D isometric UI icon of a modern solar power inverter box"
  }, {
    de: "der Speicher",
    pron: "dea shpái-ja",
    es: "el acumulador / banco de baterías",
    type: "Sustantivo (Masc)",
    category: "Solartechnik",
    plural: "die Speicher",
    en: "a cute 3D isometric UI icon of a home solar battery storage system"
  }, {
    de: "das Netz",
    pron: "das nets",
    es: "la red eléctrica",
    type: "Sustantivo (Neutro)",
    category: "Infrastruktur",
    plural: "die Netze",
    en: "a cute 3D isometric UI icon of electrical power transmission towers"
  }, {
    de: "der Ertrag",
    pron: "dea ea-trák",
    es: "el rendimiento / producción",
    type: "Sustantivo (Masc)",
    category: "Solartechnik",
    plural: "die Erträge",
    en: "a cute 3D isometric UI icon of a rising chart with a sun symbol"
  }, {
    de: "die Gleichspannung",
    pron: "di gláij-shpa-nung",
    es: "tensión continua (DC)",
    type: "Sustantivo (Fem)",
    category: "Elektrizität",
    plural: "die Gleichspannungen",
    en: "a cute 3D isometric UI icon showing the Direct Current DC symbol"
  }, {
    de: "die Wechselspannung",
    pron: "di vék-sel-shpa-nung",
    es: "tensión alterna (AC)",
    type: "Sustantivo (Fem)",
    category: "Elektrizität",
    plural: "die Wechselspannungen",
    en: "a cute 3D isometric UI icon showing the Alternating Current AC sine wave symbol"
  }, {
    de: "die Leistung",
    pron: "di láis-tung",
    es: "la potencia (W/kW)",
    type: "Sustantivo (Fem)",
    category: "Elektrizität",
    plural: "die Leistungen",
    en: "a cute 3D isometric UI icon of a glowing energy core"
  }, {
    de: "die Dachmontage",
    pron: "di daj-mon-tá-je",
    es: "el montaje en techo",
    type: "Sustantivo (Fem)",
    category: "Installation",
    plural: "die Dachmontagen",
    en: "a cute 3D isometric UI icon of construction brackets on a rooftop"
  }, {
    de: "das Werkzeug",
    pron: "das véak-tsoik",
    es: "la herramienta",
    type: "Sustantivo (Neutro)",
    category: "Werkzeuge",
    plural: "die Werkzeuge",
    en: "a cute 3D isometric UI icon of a red toolbox"
  }, {
    de: "der Schraubenzieher",
    pron: "dea shrjáu-ben-tsi-a",
    es: "el destornillador",
    type: "Sustantivo (Masc)",
    category: "Werkzeuge",
    plural: "die Schraubenzieher",
    en: "a cute 3D isometric UI icon of a yellow and black screwdriver"
  }, {
    de: "die Zange",
    pron: "di tsáng-e",
    es: "el alicate / pinza",
    type: "Sustantivo (Fem)",
    category: "Werkzeuge",
    plural: "die Zangen",
    en: "a cute 3D isometric UI icon of a pair of metal pliers with rubber grips"
  }, {
    de: "der Bohrer",
    pron: "dea bó-ra",
    es: "el taladro",
    type: "Sustantivo (Masc)",
    category: "Werkzeuge",
    plural: "die Bohrer",
    en: "a cute 3D isometric UI icon of a power drill"
  }, {
    de: "das Multimeter",
    pron: "das mul-ti-mé-ta",
    es: "el multímetro",
    type: "Sustantivo (Neutro)",
    category: "Werkzeuge",
    plural: "die Multimeter",
    en: "a cute 3D isometric UI icon of a digital multimeter with probes"
  }, {
    de: "der Helm",
    pron: "dea jelm",
    es: "el casco de seguridad",
    type: "Sustantivo (Masc)",
    category: "Sicherheit",
    plural: "die Helme",
    en: "a cute 3D isometric UI icon of a yellow hard hat"
  }, {
    de: "die Handschuhe",
    pron: "di jánt-shu-e",
    es: "los guantes de trabajo",
    type: "Sustantivo (Plural)",
    category: "Sicherheit",
    plural: "-",
    en: "a cute 3D isometric UI icon of heavy duty protective work gloves"
  }, {
    de: "die Leiter",
    pron: "di lái-ta",
    es: "la escalera",
    type: "Sustantivo (Fem)",
    category: "Werkzeuge",
    plural: "die Leitern",
    en: "a cute 3D isometric UI icon of a tall aluminum stepladder"
  }, {
    de: "der Elektriker",
    pron: "dea e-lék-tri-ka",
    es: "el electricista",
    type: "Sustantivo (Masc)",
    category: "Beruf",
    plural: "die Elektriker",
    en: "a cute 3D isometric UI icon of a worker holding cables"
  }, {
    de: "der Techniker",
    pron: "dea téj-ni-ka",
    es: "el técnico",
    type: "Sustantivo (Masc)",
    category: "Beruf",
    plural: "die Techniker",
    en: "a cute 3D isometric UI icon of a worker with blueprints and tools"
  }, {
    de: "die Gefahr",
    pron: "di gue-fár",
    es: "el peligro / riesgo",
    type: "Sustantivo (Fem)",
    category: "Sicherheit",
    plural: "die Gefahren",
    en: "a cute 3D isometric UI icon of a yellow high voltage warning sign"
  }, {
    de: "gefährlich",
    pron: "gue-féa-lij",
    es: "peligroso",
    type: "Adjetivo",
    category: "Sicherheit",
    en: "a cute 3D isometric UI icon of a skull and crossbones hazard symbol"
  }, {
    de: "messen",
    pron: "mé-sen",
    es: "medir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a measuring tape extended"
  }, {
    de: "anschließen",
    pron: "án-shli-sen",
    es: "conectar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (an-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of two electrical wires being connected together"
  }, {
    de: "installieren",
    pron: "ins-ta-lí-ren",
    es: "instalar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a wrench tightening a bolt on a machine"
  }, {
    de: "prüfen",
    pron: "prü-fen",
    es: "comprobar / revisar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a green checkmark over a technical clipboard"
  }, {
    de: "warten",
    pron: "vár-ten",
    es: "mantener (mantenimiento)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of an oil can and a gear"
  }, {
    de: "einschalten",
    pron: "áin-shal-ten",
    es: "encender (equipo)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (ein-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of a green glowing ON button"
  }, {
    de: "ausschalten",
    pron: "áus-shal-ten",
    es: "apagar (equipo)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (aus-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of a red OFF button"
  }, {
    de: "löten",
    pron: "lö-ten",
    es: "soldar (electrónica)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a soldering iron melting silver wire"
  }, {
    de: "isolieren",
    pron: "i-zo-lí-ren",
    es: "aislar (cableado)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a roll of black electrical insulation tape"
  }, {
    de: "abisolieren",
    pron: "áp-i-zo-li-ren",
    es: "pelar un cable",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (ab-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of wire strippers removing plastic from a copper wire"
  }, {
    de: "austauschen",
    pron: "áus-tau-shen",
    es: "reemplazar / cambiar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (aus-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of two mechanical parts swapping places with arrows"
  }, {
    de: "einspeisen",
    pron: "áin-shpai-zen",
    es: "inyectar (a la red)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (ein-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of electricity flowing from a house into a power grid tower"
  }, {
    de: "funktionieren",
    pron: "funk-tsio-ní-ren",
    es: "funcionar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Intransitivo",
    en: "a cute 3D isometric UI icon of two interlocking gears turning smoothly"
  }]
},
{
  id: 19,
  title: "Kapitel 19: Pronomen & Deklinationen",
  icon: <BookOpen size={20} />,
  emoji: "🧭",
  words: [
    {
      de: "mich",
      pron: "mij",
      es: "me / a mí",
      type: "Personalpronomen (Akk)",
      category: "Personalpronomen (Akk)",
      regimen: "Objeto directo (+ Akk)",
      plural: "-",
      exampleSentenceDe: "Er sieht mich im Park.",
      exampleSentenceEs: "Él me ve en el parque.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "sieht", role: "verb_p1", order: 2 },
      { text: "mich im Park", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay character smiling and pointing index finger at their own chest"
    },
    {
      de: "mir",
      pron: "mia",
      es: "me / a mí",
      type: "Personalpronomen (Dat)",
      category: "Personalpronomen (Dat)",
      regimen: "Objeto indirecto (+ Dat)",
      plural: "-",
      exampleSentenceDe: "Kannst du mir bitte helfen?",
      exampleSentenceEs: "¿Puedes ayudarme por favor?",
    exampleSentenceDeBlocks: [
      { text: "Kannst", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "mir bitte", role: "complement", order: 3 },
      { text: "helfen", role: "verb_p2", order: 4 }
    ],
      en: "A cute 3D clay character receiving a helping hand from another figure"
    },
    {
      de: "dich",
      pron: "dij",
      es: "te / a ti",
      type: "Personalpronomen (Akk)",
      category: "Personalpronomen (Akk)",
      regimen: "Objeto directo (+ Akk)",
      plural: "-",
      exampleSentenceDe: "Ich rufe dich morgen an.",
      exampleSentenceEs: "Te llamo mañana.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "rufe", role: "verb_p1", order: 2 },
      { text: "dich morgen", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
      en: "A cute 3D clay character talking cheerfully on smartphone looking at viewer"
    },
    {
      de: "dir",
      pron: "dia",
      es: "te / a ti",
      type: "Personalpronomen (Dat)",
      category: "Personalpronomen (Dat)",
      regimen: "Objeto indirecto (+ Dat)",
      plural: "-",
      exampleSentenceDe: "Das Kleid steht dir sehr gut.",
      exampleSentenceEs: "El vestido te queda muy bien.",
    exampleSentenceDeBlocks: [
      { text: "Das Kleid", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "dir sehr gut", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay hand offering a nicely wrapped gift box to viewer"
    },
    {
      de: "ihn",
      pron: "in",
      es: "lo / a él",
      type: "Personalpronomen (Akk)",
      category: "Personalpronomen (Akk)",
      regimen: "Acusativo masc. (+ Akk)",
      plural: "-",
      exampleSentenceDe: "Kennst du den Mann? – Ja, ich kenne ihn.",
      exampleSentenceEs: "¿Conoces al hombre? – Sí, lo conozco.",
    exampleSentenceDeBlocks: [
      { text: "Kennst", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "den Mann? – Ja, ich kenne ihn", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay figure greeting a male clay character wearing glasses"
    },
    {
      de: "ihm",
      pron: "im",
      es: "le / a él / a ello",
      type: "Personalpronomen (Dat)",
      category: "Personalpronomen (Dat)",
      regimen: "Dativo masc./neut. (+ Dat)",
      plural: "-",
      exampleSentenceDe: "Ich gebe ihm den Autoschlüssel.",
      exampleSentenceEs: "Le doy la llave del coche a él.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "gebe", role: "verb_p1", order: 2 },
      { text: "ihm den Autoschlüssel", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay hand handing shiny metallic car keys to a male character"
    },
    {
      de: "sie (Akk)",
      pron: "zi",
      es: "la / las / a ella",
      type: "Personalpronomen (Akk)",
      category: "Personalpronomen (Akk)",
      regimen: "Acusativo fem./pl. (+ Akk)",
      plural: "-",
      exampleSentenceDe: "Ich besuche meine Tante, ich besuche sie oft.",
      exampleSentenceEs: "Visito a mi tía, la visito a menudo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "besuche", role: "verb_p1", order: 2 },
      { text: "meine Tante, ich besuche sie oft", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay character ringing the doorbell of a female friend"
    },
    {
      de: "ihr (Dat)",
      pron: "ia",
      es: "le / a ella",
      type: "Personalpronomen (Dat)",
      category: "Personalpronomen (Dat)",
      regimen: "Dativo fem. (+ Dat)",
      plural: "-",
      exampleSentenceDe: "Ich antworte ihr auf die Nachricht.",
      exampleSentenceEs: "Le respondo a ella el mensaje.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "antworte", role: "verb_p1", order: 2 },
      { text: "ihr auf die Nachricht", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay figure typing a reply message on a computer screen"
    },
    {
      de: "es",
      pron: "es",
      es: "lo / a ello",
      type: "Personalpronomen (Akk)",
      category: "Personalpronomen (Akk)",
      regimen: "Acusativo neutro (+ Akk)",
      plural: "-",
      exampleSentenceDe: "Wo ist das Buch? – Ich habe es hier.",
      exampleSentenceEs: "¿Dónde está el libro? – Lo tengo aquí.",
    exampleSentenceDeBlocks: [
      { text: "Wo", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "das Buch? – Ich habe es hier", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay character happily holding an open hardcover book"
    },
    {
      de: "uns",
      pron: "uns",
      es: "nos / a nosotros",
      type: "Personalpronomen (Akk/Dat)",
      category: "Personalpronomen (Akk)",
      regimen: "Caso Akk o Dat según verbo",
      plural: "-",
      exampleSentenceDe: "Der Lehrer erklärt uns die Grammatik.",
      exampleSentenceEs: "El profesor nos explica la gramática.",
    exampleSentenceDeBlocks: [
      { text: "Der Lehrer", role: "subject", order: 1 },
      { text: "erklärt", role: "verb_p1", order: 2 },
      { text: "uns die Grammatik", role: "complement", order: 3 }
    ],
      en: "A small group of two cheerful 3D clay students studying together"
    },
    {
      de: "euch",
      pron: "óij",
      es: "os / a vosotros",
      type: "Personalpronomen (Akk/Dat)",
      category: "Personalpronomen (Akk)",
      regimen: "Caso Akk o Dat según verbo",
      plural: "-",
      exampleSentenceDe: "Ich lade euch alle zur Party ein.",
      exampleSentenceEs: "Os invito a todos a la fiesta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lade", role: "verb_p1", order: 2 },
      { text: "euch alle zur Party", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
      en: "A cute 3D clay party host waving welcoming arms to two arriving friends"
    },
    {
      de: "ihnen",
      pron: "í-nen",
      es: "les / a ellos / ellas",
      type: "Personalpronomen (Dat)",
      category: "Personalpronomen (Dat)",
      regimen: "Dativo plural (+ Dat)",
      plural: "-",
      exampleSentenceDe: "Das Haus gehört ihnen.",
      exampleSentenceEs: "La casa les pertenece a ellos.",
    exampleSentenceDeBlocks: [
      { text: "Das Haus", role: "subject", order: 1 },
      { text: "gehört", role: "verb_p1", order: 2 },
      { text: "ihnen", role: "complement", order: 3 }
    ],
      en: "Two cute 3D clay characters standing proudly outside their new house"
    },
    {
      de: "Ihnen",
      pron: "í-nen",
      es: "le / les / a usted(es)",
      type: "Personalpronomen (Dat)",
      category: "Personalpronomen (Dat)",
      regimen: "Dativo formal cortesía",
      plural: "-",
      exampleSentenceDe: "Wie kann ich Ihnen helfen?",
      exampleSentenceEs: "¿Cómo le puedo ayudar a usted?",
    exampleSentenceDeBlocks: [
      { text: "Wie", role: "subject", order: 1 },
      { text: "kann", role: "verb_p1", order: 2 },
      { text: "ich Ihnen", role: "complement", order: 3 },
      { text: "helfen", role: "verb_p2", order: 4 }
    ],
      en: "A polite customer support desk agent clay character smiling welcomingly"
    },
    {
      de: "mein / meine",
      pron: "main / mái-ne",
      es: "mi / mis",
      type: "Possessivartikel",
      category: "Possessivartikel",
      regimen: "Nom: mein (m/n), meine (f/pl)",
      plural: "-",
      exampleSentenceDe: "Das ist mein Pass und meine Fahrkarte.",
      exampleSentenceEs: "Este es mi pasaporte y mi billete.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "mein Pass und meine Fahrkarte", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay character holding passport booklet and transit card"
    },
    {
      de: "dein / deine",
      pron: "dain / dái-ne",
      es: "tu / tus",
      type: "Possessivartikel",
      category: "Possessivartikel",
      regimen: "Nom: dein (m/n), deine (f/pl)",
      plural: "-",
      exampleSentenceDe: "Ist das dein Schlüssel?",
      exampleSentenceEs: "¿Es esta tu llave?",
    exampleSentenceDeBlocks: [
      { text: "Ist", role: "verb_p1", order: 1 },
      { text: "das dein", role: "subject", order: 2 },
      { text: "Schlüssel", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay character pointing at a metal key on a clean desk"
    },
    {
      de: "sein / seine",
      pron: "zain / zái-ne",
      es: "su / sus (de él / ello)",
      type: "Possessivartikel",
      category: "Possessivartikel",
      regimen: "Nom: sein (m/n), seine (f/pl)",
      plural: "-",
      exampleSentenceDe: "Er sucht seine Reisetasche.",
      exampleSentenceEs: "Él busca su maleta de viaje.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "sucht", role: "verb_p1", order: 2 },
      { text: "seine Reisetasche", role: "complement", order: 3 }
    ],
      en: "A male 3D clay character searching around with a travel duffle bag"
    },
    {
      de: "ihr / ihre (Poss)",
      pron: "ia / í-re",
      es: "su / sus (de ella)",
      type: "Possessivartikel",
      category: "Possessivartikel",
      regimen: "Nom: ihr (m/n), ihre (f/pl)",
      plural: "-",
      exampleSentenceDe: "Sie liebt ihre Katze sehr.",
      exampleSentenceEs: "Ella adora mucho a su gata.",
    exampleSentenceDeBlocks: [
      { text: "Sie", role: "subject", order: 1 },
      { text: "liebt", role: "verb_p1", order: 2 },
      { text: "ihre Katze sehr", role: "complement", order: 3 }
    ],
      en: "A female 3D clay character cuddling a cute small orange clay cat"
    },
    {
      de: "unser / unsere",
      pron: "ún-zea / ún-ze-re",
      es: "nuestro / nuestra",
      type: "Possessivartikel",
      category: "Possessivartikel",
      regimen: "Nom: unser (m/n), unsere (f/pl)",
      plural: "-",
      exampleSentenceDe: "Das ist unser neues Auto.",
      exampleSentenceEs: "Este es nuestro coche nuevo.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "unser neues Auto", role: "complement", order: 3 }
    ],
      en: "Two cute 3D clay people standing happily beside a compact blue car"
    },
    {
      de: "euer / eure",
      pron: "ói-a / ói-re",
      es: "vuestro / vuestra",
      type: "Possessivartikel",
      category: "Possessivartikel",
      regimen: "Pierde 'e': eure (f/pl/Akk-m)",
      plural: "-",
      exampleSentenceDe: "Wo ist eure Schule?",
      exampleSentenceEs: "¿Dónde está vuestra escuela?",
    exampleSentenceDeBlocks: [
      { text: "Wo", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "eure Schule", role: "complement", order: 3 }
    ],
      en: "Two cute clay children wearing colorful school backpacks"
    },
    {
      de: "Ihr / Ihre (Formal)",
      pron: "ia / í-re",
      es: "su / sus (de usted/es)",
      type: "Possessivartikel",
      category: "Possessivartikel",
      regimen: "Mayúscula obligatoria",
      plural: "-",
      exampleSentenceDe: "Wie ist Ihre Telefonnummer?",
      exampleSentenceEs: "¿Cuál es su número de teléfono?",
    exampleSentenceDeBlocks: [
      { text: "Wie", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "Ihre Telefonnummer", role: "complement", order: 3 }
    ],
      en: "An official business ID card showing a formal silhouette profile"
    },
    {
      de: "meinen",
      pron: "mái-nen",
      es: "a mi (Acusativo masc.)",
      type: "Possessivartikel (Akk)",
      category: "Possessivartikel",
      regimen: "Acusativo masculino (-en)",
      plural: "-",
      exampleSentenceDe: "Ich suche meinen Koffer.",
      exampleSentenceEs: "Busco mi maleta.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "suche", role: "verb_p1", order: 2 },
      { text: "meinen Koffer", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay character looking for a lost rolling suitcase"
    },
    {
      de: "meinem",
      pron: "mái-nem",
      es: "a mi (Dativo masc./n.)",
      type: "Possessivartikel (Dat)",
      category: "Possessivartikel",
      regimen: "Dativo masc./neutro (-em)",
      plural: "-",
      exampleSentenceDe: "Ich fahre mit meinem Fahrrad zur Arbeit.",
      exampleSentenceEs: "Voy en mi bicicleta al trabajo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "fahre", role: "verb_p1", order: 2 },
      { text: "mit meinem Fahrrad zur Arbeit", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay character riding a stylish bicycle to an office"
    },
    {
      de: "meiner",
      pron: "mái-nea",
      es: "a mi (Dativo fem.)",
      type: "Possessivartikel (Dat)",
      category: "Possessivartikel",
      regimen: "Dativo femenino (-er)",
      plural: "-",
      exampleSentenceDe: "Ich wohne bei meiner Familie.",
      exampleSentenceEs: "Vivo con mi familia.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "bei meiner Familie", role: "complement", order: 3 }
    ],
      en: "A cozy stylized 3D clay home with happy family silhouettes"
    },
    {
      de: "deinen",
      pron: "dái-nen",
      es: "a tu (Acusativo masc.)",
      type: "Possessivartikel (Akk)",
      category: "Possessivartikel",
      regimen: "Acusativo masculino (-en)",
      plural: "-",
      exampleSentenceDe: "Hast du deinen Pass dabei?",
      exampleSentenceEs: "¿Llevas contigo tu pasaporte?",
    exampleSentenceDeBlocks: [
      { text: "Hast", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "deinen Pass dabei", role: "complement", order: 3 }
    ],
      en: "A traveler checking an open passport with a clear checklist mark"
    },
    {
      de: "sich",
      pron: "zij",
      es: "se (reflexivo 3ª pers.)",
      type: "Reflexivpronomen",
      category: "Reflexivpronomen",
      regimen: "3ª pers. sing./pl. (Akk/Dat)",
      plural: "-",
      exampleSentenceDe: "Er zieht sich schnell an.",
      exampleSentenceEs: "Él se viste rápidamente.",
    exampleSentenceDeBlocks: [
      { text: "Er", role: "subject", order: 1 },
      { text: "zieht", role: "verb_p1", order: 2 },
      { text: "sich schnell", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
      en: "A 3D clay character smoothly slipping into a warm cozy winter sweater"
    },
    {
      de: "einander",
      pron: "áin-án-da",
      es: "el uno al otro / mutuamente",
      type: "Reziprokpronomen",
      category: "Reflexivpronomen",
      regimen: "Invariable (recíproco)",
      plural: "-",
      exampleSentenceDe: "Wir helfen einander immer.",
      exampleSentenceEs: "Nos ayudamos mutuamente siempre.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "helfen", role: "verb_p1", order: 2 },
      { text: "einander immer", role: "complement", order: 3 }
    ],
      en: "Two 3D clay characters holding hands supporting each other"
    },
    {
      de: "selbst / selber",
      pron: "zelpst / zél-ba",
      es: "mismo / por sí mismo",
      type: "Pronomen / Partikel",
      category: "Reflexivpronomen",
      regimen: "Invariable (intensificador)",
      plural: "-",
      exampleSentenceDe: "Ich habe das Essen selbst gekocht.",
      exampleSentenceEs: "Yo mismo preparé la comida.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "das Essen selbst gekocht", role: "complement", order: 3 }
    ],
      en: "A proud 3D clay chef character showing a delicious finished dish"
    },
    {
      de: "dieser / diese / dieses",
      pron: "dí-za / dí-ze / dí-zes",
      es: "este / esta / esto",
      type: "Demonstrativpronomen",
      category: "Demonstrativpronomen",
      regimen: "Declina como der/die/das",
      plural: "-",
      exampleSentenceDe: "Dieses Buch ist sehr spannend.",
      exampleSentenceEs: "Este libro es muy emocionante.",
    exampleSentenceDeBlocks: [
      { text: "Dieses Buch", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "sehr spannend", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay hand pointing an index finger directly at a book"
    },
    {
      de: "diesen",
      pron: "dí-zen",
      es: "a este (Acusativo masc.)",
      type: "Demonstrativpronomen (Akk)",
      category: "Demonstrativpronomen",
      regimen: "Acusativo masculino",
      plural: "-",
      exampleSentenceDe: "Ich nehme diesen Pullover.",
      exampleSentenceEs: "Me llevo este jersey.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "nehme", role: "verb_p1", order: 2 },
      { text: "diesen Pullover", role: "complement", order: 3 }
    ],
      en: "A 3D clay shopper picking a warm blue knitted wool sweater from rack"
    },
    {
      de: "diesem",
      pron: "dí-zem",
      es: "a este (Dativo masc./n.)",
      type: "Demonstrativpronomen (Dat)",
      category: "Demonstrativpronomen",
      regimen: "Dativo masc./neutro",
      plural: "-",
      exampleSentenceDe: "In diesem Haus wohne ich.",
      exampleSentenceEs: "Vivo en esta casa.",
    exampleSentenceDeBlocks: [
      { text: "In diesem Haus", role: "subject", order: 1 },
      { text: "wohne", role: "verb_p1", order: 2 },
      { text: "ich", role: "complement", order: 3 }
    ],
      en: "A cute stylized 3D clay apartment house with highlighted entrance"
    },
    {
      de: "dieser (Dat)",
      pron: "dí-za",
      es: "a esta (Dativo fem.)",
      type: "Demonstrativpronomen (Dat)",
      category: "Demonstrativpronomen",
      regimen: "Dativo femenino",
      plural: "-",
      exampleSentenceDe: "An dieser Haltestelle halten viele Busse.",
      exampleSentenceEs: "En esta parada se detienen muchos autobuses.",
    exampleSentenceDeBlocks: [
      { text: "An dieser Haltestelle", role: "subject", order: 1 },
      { text: "halten", role: "verb_p1", order: 2 },
      { text: "viele Busse", role: "complement", order: 3 }
    ],
      en: "A cute 3D clay bus stop station signpost on sidewalk"
    },
    {
      de: "das (Demonstrativ)",
      pron: "das",
      es: "eso / aquello",
      type: "Demonstrativpronomen",
      category: "Demonstrativpronomen",
      regimen: "Invariable para señalar",
      plural: "-",
      exampleSentenceDe: "Das ist aber sehr nett!",
      exampleSentenceEs: "¡Eso sí que es muy amable!",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "aber sehr nett", role: "complement", order: 3 }
    ],
      en: "A glowing friendly star badge resting on a small pedestal"
    },
    {
      de: "man",
      pron: "man",
      es: "uno / la gente (impersonal)",
      type: "Indefinitpronomen",
      category: "Indefinitpronomen",
      regimen: "Verbo en 3ª persona sing.",
      plural: "-",
      exampleSentenceDe: "Hier darf man nicht rauchen.",
      exampleSentenceEs: "Aquí no se puede fumar.",
    exampleSentenceDeBlocks: [
      { text: "Hier", role: "subject", order: 1 },
      { text: "darf", role: "verb_p1", order: 2 },
      { text: "man nicht", role: "complement", order: 3 },
      { text: "rauchen", role: "verb_p2", order: 4 }
    ],
      en: "A 3D clay character observing a clear circular prohibition sign"
    },
    {
      de: "jemand",
      pron: "yé-mant",
      es: "alguien",
      type: "Indefinitpronomen",
      category: "Indefinitpronomen",
      regimen: "Persona indeterminada",
      plural: "-",
      exampleSentenceDe: "Ist jemand an der Tür?",
      exampleSentenceEs: "¿Hay alguien en la puerta?",
    exampleSentenceDeBlocks: [
      { text: "Ist", role: "subject", order: 1 },
      { text: "jemand", role: "verb_p1", order: 2 },
      { text: "an der Tür", role: "complement", order: 3 }
    ],
      en: "A silhouette figure gently knocking on a front door"
    },
    {
      de: "niemand",
      pron: "ní-mant",
      es: "nadie",
      type: "Indefinitpronomen",
      category: "Indefinitpronomen",
      regimen: "Negación de jemand",
      plural: "-",
      exampleSentenceDe: "Niemand ist heute im Büro.",
      exampleSentenceEs: "Nadie está hoy en la oficina.",
    exampleSentenceDeBlocks: [
      { text: "Niemand", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "heute im Büro", role: "complement", order: 3 }
    ],
      en: "A peaceful empty office room with an unoccupied desk chair"
    },
    {
      de: "etwas",
      pron: "ét-vas",
      es: "algo",
      type: "Indefinitpronomen",
      category: "Indefinitpronomen",
      regimen: "Invariable",
      plural: "-",
      exampleSentenceDe: "Möchtest du etwas trinken?",
      exampleSentenceEs: "¿Te gustaría tomar algo?",
    exampleSentenceDeBlocks: [
      { text: "Möchtest", role: "verb_p1", order: 1 },
      { text: "du", role: "subject", order: 2 },
      { text: "etwas", role: "complement", order: 3 },
      { text: "trinken", role: "verb_p2", order: 4 }
    ],
      en: "A cute small clay mug with gentle steam rising upwards"
    },
    {
      de: "nichts",
      pron: "nijts",
      es: "nada",
      type: "Indefinitpronomen",
      category: "Indefinitpronomen",
      regimen: "Invariable (negación absoluta)",
      plural: "-",
      exampleSentenceDe: "Ich habe heute noch nichts gegessen.",
      exampleSentenceEs: "Hoy todavía no he comido nada.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "heute noch nichts gegessen", role: "complement", order: 3 }
    ],
      en: "A clean empty porcelain plate with a small fork and spoon beside"
    },
    {
      de: "alles",
      pron: "á-les",
      es: "todo",
      type: "Indefinitpronomen",
      category: "Indefinitpronomen",
      regimen: "Totalidad neutra singular",
      plural: "-",
      exampleSentenceDe: "Alles ist fertig und vorbereitet.",
      exampleSentenceEs: "Todo está listo y preparado.",
    exampleSentenceDeBlocks: [
      { text: "Alles", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "fertig und vorbereitet", role: "complement", order: 3 }
    ],
      en: "A tidy organized desktop with green checkmarks on all items"
    },
    {
      de: "alle",
      pron: "á-le",
      es: "todos / todas",
      type: "Indefinitpronomen (Pl)",
      category: "Indefinitpronomen",
      regimen: "Plural de totalidad",
      plural: "-",
      exampleSentenceDe: "Alle Schüler sind heute da.",
      exampleSentenceEs: "Todos los alumnos están presentes hoy.",
    exampleSentenceDeBlocks: [
      { text: "Alle Schüler", role: "subject", order: 1 },
      { text: "sind", role: "verb_p1", order: 2 },
      { text: "heute da", role: "complement", order: 3 }
    ],
      en: "A cheerful group of diverse stylized 3D clay avatars gathered together"
    },
    {
      de: "jeder / jede / jedes",
      pron: "yé-da / yé-de / yé-des",
      es: "cada / cada uno(a)",
      type: "Indefinitpronomen",
      category: "Indefinitpronomen",
      regimen: "Declina como der/die/das",
      plural: "-",
      exampleSentenceDe: "Jeder Teilnehmer bekommt ein Zertifikat.",
      exampleSentenceEs: "Cada participante recibe un certificado.",
    exampleSentenceDeBlocks: [
      { text: "Jeder Teilnehmer", role: "subject", order: 1 },
      { text: "bekommt", role: "verb_p1", order: 2 },
      { text: "ein Zertifikat", role: "complement", order: 3 }
    ],
      en: "A row of graduation certificate scrolls with red ribbons"
    },
    {
      de: "jedem",
      pron: "yé-dem",
      es: "a cada (Dativo masc./n.)",
      type: "Indefinitpronomen (Dat)",
      category: "Indefinitpronomen",
      regimen: "Dativo masc./neutro",
      plural: "-",
      exampleSentenceDe: "Das gefällt nicht jedem Menschen.",
      exampleSentenceEs: "Eso no le agrada a todo el mundo.",
    exampleSentenceDeBlocks: [
      { text: "Das", role: "subject", order: 1 },
      { text: "gefällt", role: "verb_p1", order: 2 },
      { text: "nicht jedem Menschen", role: "complement", order: 3 }
    ],
      en: "Two clay faces displaying different thoughtful expressions"
    },
    {
      de: "jeden",
      pron: "yé-den",
      es: "cada (Acusativo masc.)",
      type: "Indefinitpronomen (Akk)",
      category: "Indefinitpronomen",
      regimen: "Acusativo masc. temporal",
      plural: "-",
      exampleSentenceDe: "Ich lerne jeden Tag Deutsch.",
      exampleSentenceEs: "Aprendo alemán todos los días.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "lerne", role: "verb_p1", order: 2 },
      { text: "jeden Tag Deutsch", role: "complement", order: 3 }
    ],
      en: "A calendar page with bold checkmarks across each day of the week"
    },
    {
      de: "einige",
      pron: "ái-ni-gue",
      es: "algunos / algunas",
      type: "Indefinitpronomen (Pl)",
      category: "Indefinitpronomen",
      regimen: "Plural indeterminado",
      plural: "-",
      exampleSentenceDe: "Ich habe noch einige Fragen.",
      exampleSentenceEs: "Todavía tengo algunas preguntas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "habe", role: "verb_p1", order: 2 },
      { text: "noch einige Fragen", role: "complement", order: 3 }
    ],
      en: "Three floating question mark symbols of different pastel colors"
    },
    {
      de: "wer",
      pron: "vea",
      es: "¿quién? (Nominativo)",
      type: "Interrogativpronomen",
      category: "Fragepronomen",
      regimen: "Pregunta por sujeto",
      plural: "-",
      exampleSentenceDe: "Wer kommt heute zum Treffen?",
      exampleSentenceEs: "¿Quién viene hoy a la reunión?",
    exampleSentenceDeBlocks: [
      { text: "Wer", role: "subject", order: 1 },
      { text: "kommt", role: "verb_p1", order: 2 },
      { text: "heute zum Treffen", role: "complement", order: 3 }
    ],
      en: "A question mark silhouette badge standing over a podium"
    },
    {
      de: "wen",
      pron: "ven",
      es: "¿a quién? (Acusativo)",
      type: "Interrogativpronomen (Akk)",
      category: "Fragepronomen",
      regimen: "Pregunta por objeto directo",
      plural: "-",
      exampleSentenceDe: "Wen hast du am Bahnhof getroffen?",
      exampleSentenceEs: "¿A quién te encontraste en la estación?",
    exampleSentenceDeBlocks: [
      { text: "Wen", role: "subject", order: 1 },
      { text: "hast", role: "verb_p1", order: 2 },
      { text: "du am Bahnhof", role: "complement", order: 3 },
      { text: "getroffen", role: "verb_p2", order: 4 }
    ],
      en: "A searching magnifying glass focusing on a silhouette character"
    },
    {
      de: "wem",
      pron: "vem",
      es: "¿a quién? (Dativo)",
      type: "Interrogativpronomen (Dat)",
      category: "Fragepronomen",
      regimen: "Pregunta por objeto indirecto",
      plural: "-",
      exampleSentenceDe: "Wem gehört diese Tasche?",
      exampleSentenceEs: "¿A quién le pertenece este bolso?",
    exampleSentenceDeBlocks: [
      { text: "Wem", role: "subject", order: 1 },
      { text: "gehört", role: "verb_p1", order: 2 },
      { text: "diese Tasche", role: "complement", order: 3 }
    ],
      en: "An open gift box with a tag displaying a prominent question mark"
    },
    {
      de: "wessen",
      pron: "vé-sen",
      es: "¿de quién? (Genitivo)",
      type: "Interrogativpronomen (Gen)",
      category: "Fragepronomen",
      regimen: "Pregunta por posesión",
      plural: "-",
      exampleSentenceDe: "Wessen Auto steht vor der Garage?",
      exampleSentenceEs: "¿De quién es el coche frente al garaje?",
    exampleSentenceDeBlocks: [
      { text: "Wessen Auto", role: "subject", order: 1 },
      { text: "steht", role: "verb_p1", order: 2 },
      { text: "vor der Garage", role: "complement", order: 3 }
    ],
      en: "A car keychain tag inscribed with a clean question mark symbol"
    },
    {
      de: "welcher / welche / welches",
      pron: "vél-ja / vél-je / vél-jes",
      es: "¿cuál? / ¿qué?",
      type: "Interrogativpronomen",
      category: "Fragepronomen",
      regimen: "Declina como artículo determinado",
      plural: "-",
      exampleSentenceDe: "Welches Ticket möchten Sie kaufen?",
      exampleSentenceEs: "¿Qué billete quisiera comprar usted?",
    exampleSentenceDeBlocks: [
      { text: "Welches Ticket", role: "subject", order: 1 },
      { text: "möchten", role: "verb_p1", order: 2 },
      { text: "Sie", role: "complement", order: 3 },
      { text: "kaufen", role: "verb_p2", order: 4 }
    ],
      en: "Two transit tickets displayed side by side with a selection cursor"
    }
  ]
}
];


export const chapters = [...rawChapters].sort((a, b) => a.id - b.id);

// --- NUEVOS MÓDULOS DE ESTUDIO GOETHE ---
export const goetheModules = [{
  id: 'g_horen',
  title: 'Hören (Comprensión Auditiva)',
  desc: 'Supervivencia en estaciones y llamadas',
  theme: 'blueprint',
  presentationUrl: 'https://drive.google.com/file/d/1HaRoaGMXPAHwQbmeVkqMoaotGvM5TjBH/view?usp=sharing',
  slides: [{
    title: "Supervivencia Auditiva: El Examen Hören",
    subtitle: "Entrena tu oído para identificar información clave",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-500 shadow-lg relative">
              <Headphones size={64} className="text-blue-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">El objetivo es identificar información clave (precios, andenes, horas) en medio del ruido de conversaciones, altavoces de estaciones y mensajes de voz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">Alltagssituationen<br />(Situaciones cotidianas)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Öffentliche Durchsagen<br />(Anuncios públicos)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-blue-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Telefonansagen<br />(Mensajes telefónicos)</span>
              </div>
            </div>
          </div>
  }, {
    title: "Kit de Vocabulario Auditivo",
    subtitle: "Si escuchas estas palabras, la respuesta está cerca",
    content: props => <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{
        de: "die Durchsage",
        es: "El anuncio por altavoz",
        type: "Sustantivo",
        emoji: "📢"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Gleis",
        es: "El andén (del tren)",
        type: "Sustantivo",
        emoji: "🚉"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Verspätung",
        es: "El retraso",
        type: "Sustantivo",
        emoji: "⏳"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Angebot",
        es: "La oferta",
        type: "Sustantivo",
        emoji: "🏷️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Nachricht",
        es: "El mensaje",
        type: "Sustantivo",
        emoji: "💬"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "zurück|rufen",
        es: "Devolver la llamada",
        type: "Verbo",
        emoji: "📞"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "aus|steigen",
        es: "Bajarse",
        type: "Verbo",
        emoji: "🚪"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "Achtung!",
        es: "¡Atención! / ¡Cuidado!",
        type: "Interjección",
        emoji: "⚠️"
      }} {...props} />
          </div>
  }, {
    title: "Clase Magistral: Fonética y Pronunciación",
    subtitle: "Decodificando los sonidos del alemán",
    content: (
      <div className="mt-8 max-w-3xl mx-auto space-y-4 text-slate-700">
        <p className="text-lg mb-4">Para superar el examen de comprensión auditiva, debes entrenar tu oído para identificar las vocales modificadas (Umlaute) y las combinaciones de consonantes.</p>
        <GrammarAccordion title="1. Las Vocales Umlaute (ä, ö, ü)">
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Ä, ä (e abierta):</strong> Suena como una 'e' larga. Ejemplo: <em>Käse</em> (ké-se).</li>
            <li><strong>Ö, ö (o cerrada):</strong> Pon los labios para decir 'o', pero pronuncia 'e'. Ejemplo: <em>schön</em> (shön).</li>
            <li><strong>Ü, ü (u cerrada):</strong> Pon los labios para decir 'u', pero pronuncia 'i'. Ejemplo: <em>müde</em> (mü-de).</li>
          </ul>
        </GrammarAccordion>
        <GrammarAccordion title="2. Dígrafos Vocálicos (ei, ie, eu)">
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>ei / ai:</strong> Suena como "ai". Ejemplo: <em>zwei</em> (tsvai).</li>
            <li><strong>ie:</strong> Suena como una "i" alargada. Ejemplo: <em>spielen</em> (shpi-len).</li>
            <li><strong>eu / äu:</strong> Suena como "oi". Ejemplo: <em>heute</em> (hoi-te), <em>Häuser</em> (hoi-sa).</li>
          </ul>
        </GrammarAccordion>
        <GrammarAccordion title="3. Consonantes Clave (ß, v, w, z, sch, st, sp)">
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>ß (Eszett):</strong> Suena como una "s" fuerte. Ejemplo: <em>groß</em> (gros).</li>
            <li><strong>v / w:</strong> La 'v' suena como 'f' (<em>Vater</em>). La 'w' suena como la 'v' en inglés (<em>Wasser</em>).</li>
            <li><strong>z:</strong> Suena como "ts". Ejemplo: <em>Zehn</em> (tsen).</li>
            <li><strong>sch / st / sp:</strong> "sch" es como pedir silencio (shhh). Al inicio, "st" y "sp" suenan "sht" y "shp" (<em>Straße, spielen</em>).</li>
          </ul>
        </GrammarAccordion>
      </div>
    )
  }, {
    title: "Acoustic Radar: Anuncios",
    subtitle: "Presta atención a las instrucciones y anuncios públicos",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-6">
            <AcousticRadar 
              title="Escenario 1: Anuncio de tráfico (Teil 2)" 
              textDe="Achtung Autofahrer! Auf der Autobahn gibt es einen Stau. Bitte fahren Sie langsam und nutzen Sie das Reißverschlusssystem." 
              textEs="¡Atención conductores! Hay un atasco en la autopista. Por favor, conduzcan despacio y utilicen el sistema de cremallera."
              options={["Un accidente", "Un atasco / tráfico", "Obras en la vía"]}
              correctOption="Un atasco / tráfico"
              question="¿Cuál es el problema reportado en la autopista?"
            />
            <AcousticRadar 
              title="Escenario 2: Mensaje de voz (Teil 3)" 
              textDe="Hallo, hier ist der IT-Service. Dein Computer ist repariert. Du kannst ihn morgen ab 9 Uhr abholen. Bitte ruf uns nicht zurück." 
              textEs="Hola, aquí el servicio técnico. Tu ordenador está reparado. Puedes recogerlo mañana a partir de las 9. Por favor, no nos devuelvas la llamada."
              options={["A las 8 Uhr", "A las 9 Uhr", "A las 10 Uhr"]}
              correctOption="A las 9 Uhr"
              question="¿A partir de qué hora se puede recoger el ordenador?"
            />
          </div>
  }, {
    title: "Acoustic Radar: Compras y Precios",
    subtitle: "Escucha con atención las ofertas de último minuto",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-6">
            <AcousticRadar 
              title="Escenario 3: Conversación en tienda (Teil 1)" 
              textDe="Entschuldigung, was kostet diese Software? – Normalerweise 50 Euro, aber heute ist sie im Angebot für 20 Euro." 
              textEs="Disculpe, ¿cuánto cuesta este software? - Normalmente 50 euros, pero hoy está en oferta por 20 euros."
              options={["50 Euro", "30 Euro", "20 Euro"]}
              correctOption="20 Euro"
              question="¿Cuánto cuesta la oferta del día de la biblioteca de software?"
            />
          </div>
  }]
}, {
  id: 'g_lesen',
  title: 'Lesen (Comprensión Lectora)',
  desc: 'Textos del día a día y letreros',
  theme: 'notebook',
  presentationUrl: 'https://drive.google.com/file/d/1v0X84LxezwiLTIOll5OqIs5VfY6khT5Z/view?usp=drive_link',
  slides: [{
    title: "Entendiendo Textos Diarios",
    subtitle: "El Examen Lesen (Comprensión Lectora)",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-300 shadow-md">
              <BookOpen size={64} className="text-amber-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Prepárate para leer correos informales, comparar ofertas web y decodificar los estrictos letreros públicos alemanes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">E-Mails und Einladungen<br />(Correos e invitaciones)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Webseiten und Anzeigen<br />(Webs y anuncios)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-amber-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Schilder und Regeln<br />(Letreros y normas)</span>
              </div>
            </div>
          </div>
  }, {
    title: "El Kit de Lupa (Vocabulario)",
    subtitle: "Indicadores clave en textos escritos",
    content: props => <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{
        de: "die Einladung",
        es: "La invitación",
        type: "Sustantivo",
        emoji: "✉️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Angebot",
        es: "La oferta",
        type: "Sustantivo",
        emoji: "🏷️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Schild",
        es: "El letrero / señal",
        type: "Sustantivo",
        emoji: "🪧"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "Öffnungszeiten",
        es: "Horarios de apertura",
        type: "Plural",
        emoji: "🕒"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "buchen",
        es: "Reservar",
        type: "Verbo",
        emoji: "📅"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "ein|laden",
        es: "Invitar",
        type: "Verbo",
        emoji: "👋"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "geöffnet / geschlossen",
        es: "Abierto / Cerrado",
        type: "Adjetivos",
        emoji: "🚪"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "verboten / erlaubt",
        es: "Prohibido / Permitido",
        type: "Adjetivos",
        emoji: "🚫"
      }} {...props} />
          </div>
  }, {
    title: "Clase Magistral: El Sistema de Casos",
    subtitle: "La brújula para entender quién hace qué",
    content: (
      <div className="mt-8 max-w-3xl mx-auto space-y-4 text-slate-700">
        <p className="text-lg mb-4">A diferencia del español, el alemán usa "casos" para marcar la función de una palabra en la oración. En los textos del examen, identificar el caso te dirá quién realiza la acción y quién la recibe.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-slate-200 bg-white rounded-lg shadow-sm">
            <thead className="bg-slate-100 font-bold text-slate-800">
              <tr>
                <th className="p-3 border border-slate-200">Caso</th>
                <th className="p-3 border border-slate-200">Masc (der)</th>
                <th className="p-3 border border-slate-200">Fem (die)</th>
                <th className="p-3 border border-slate-200">Neutro (das)</th>
                <th className="p-3 border border-slate-200">Plural (die)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-200 font-bold bg-blue-50">Nominativo (Sujeto)</td>
                <td className="p-3 border border-slate-200">der / ein</td>
                <td className="p-3 border border-slate-200">die / eine</td>
                <td className="p-3 border border-slate-200">das / ein</td>
                <td className="p-3 border border-slate-200">die / meine</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold bg-emerald-50">Acusativo (Objeto Directo)</td>
                <td className="p-3 border border-slate-200 font-bold text-emerald-700">den / einen</td>
                <td className="p-3 border border-slate-200">die / eine</td>
                <td className="p-3 border border-slate-200">das / ein</td>
                <td className="p-3 border border-slate-200">die / meine</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold bg-amber-50">Dativo (Objeto Indirecto)</td>
                <td className="p-3 border border-slate-200 font-bold text-amber-700">dem / einem</td>
                <td className="p-3 border border-slate-200 font-bold text-amber-700">der / einer</td>
                <td className="p-3 border border-slate-200 font-bold text-amber-700">dem / einem</td>
                <td className="p-3 border border-slate-200 font-bold text-amber-700">den / meinen (+n)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 rounded-r-lg">
          <p className="font-bold text-amber-800">💡 Truco de Lectura Rápida</p>
          <p className="text-sm text-amber-700 mt-1">Si ves <strong>"den"</strong> o <strong>"einen"</strong>, sabes inmediatamente que esa palabra masculina es la víctima (Acusativo) de la acción, NO el sujeto que la realiza.</p>
        </div>
      </div>
    )
  }, {
    title: "Patrones Visuales",
    subtitle: "Letreros y Normas (Teil 3) - Encuentra las palabras prohibidas o permitidas",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-6">
            <TextHighlighter 
              sentence="Parken auf dem Gehweg ist hier absolut verboten." 
              trapWord="verboten" 
              correctAntonym="erlaubt" 
              options={["gestattet", "erlaubt", "verboten"]} 
              translation="Aparcar en la acera está absolutamente prohibido aquí." 
            />
            <TextHighlighter 
              sentence="Bitte halten Sie die Tür geschlossen." 
              trapWord="geschlossen" 
              correctAntonym="offen" 
              options={["auf", "offen", "geschlossen"]} 
              translation="Por favor, mantenga la puerta cerrada." 
            />
          </div>
  }, {
    title: "El Juego de los Espejos",
    subtitle: "Dominando los antónimos en las opciones (A, B, C)",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-6">
            <TextHighlighter 
              sentence="Das Hotel ist nicht teuer" 
              trapWord="nicht teuer" 
              correctAntonym="billig" 
              options={["teuer", "groß", "billig"]} 
              translation="El hotel no es caro (billig = barato)." 
            />
            <TextHighlighter 
              sentence="Das Zimmer ist nicht dunkel" 
              trapWord="nicht dunkel" 
              correctAntonym="hell" 
              options={["kalt", "hell", "schön"]} 
              translation="La habitación no es oscura (hell = clara/iluminada)." 
            />
            <TextHighlighter 
              sentence="Die Maschine ist nicht neu" 
              trapWord="nicht neu" 
              correctAntonym="alt" 
              options={["schnell", "alt", "kaputt"]} 
              translation="La máquina no es nueva (alt = vieja)." 
            />
          </div>
  }, {
    title: "La Regla del Tren",
    subtitle: "Lee textos complejos de derecha a izquierda",
    content: <div className="mt-6 max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-full bg-slate-800 p-6 rounded-xl text-center text-white mb-6 shadow-lg">
              <p className="text-xl font-mono tracking-wider mb-4">Fahr + Plan + <span className="text-amber-400 font-bold border-b-2 border-amber-400 pb-1">Auskunft</span></p>
              <p className="text-sm text-slate-300">Viaje + Plan + <strong className="text-amber-400">Información</strong></p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg w-full">
              <p className="font-bold text-amber-800">💡 La Regla del Tren de Palabras</p>
              <p className="text-sm text-amber-700 mt-1">El último vagón (la derecha) te dice QUÉ es el objeto. Los vagones de la izquierda solo lo describen. ¡Aplica esto cuando veas palabras gigantes!</p>
            </div>
          </div>
  }]
}, {
  id: 'g_schreiben',
  title: 'Schreiben (Expresión Escrita)',
  desc: 'Formularios y Correos exactos',
  theme: 'medical',
  presentationUrl: 'https://drive.google.com/file/d/19bbbF3M4RfIRbQ4PkxZlCsPcbibYQLPx/view?usp=drive_link',
  slides: [{
    title: "Tu Firma y tu Voz",
    subtitle: "El Examen Schreiben (Escritura)",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-300 shadow-md">
              <Edit3 size={64} className="text-emerald-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Aprende la burocracia de los formularios y la estructura quirúrgica para escribir correos perfectos sin complicarte.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-emerald-600 block text-lg">Teil 1</span>
                <span className="text-slate-600">Formulare ausfüllen<br />(Rellenar formularios)</span>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-emerald-600 block text-lg">Teil 2</span>
                <span className="text-slate-600">Eine E-Mail schreiben<br />(Redactar correos)</span>
              </div>
            </div>
          </div>
  }, {
    title: "El Idioma de la Burocracia",
    subtitle: "Vocabulario obligatorio para formularios",
    content: props => <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <PresentationVocabCard wordObj={{
        de: "das Formular",
        es: "El impreso / formulario",
        type: "Sustantivo",
        emoji: "📝"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Vorname",
        es: "El nombre de pila",
        type: "Sustantivo",
        emoji: "👤"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Nachname / Familienname",
        es: "El apellido",
        type: "Sustantivo",
        emoji: "👥"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Straße",
        es: "La calle",
        type: "Sustantivo",
        emoji: "🛣️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Hausnummer",
        es: "El número de casa",
        type: "Sustantivo",
        emoji: "🔢"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Postleitzahl (PLZ)",
        es: "El código postal",
        type: "Sustantivo",
        emoji: "📮"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Wohnort",
        es: "Lugar de residencia",
        type: "Sustantivo",
        emoji: "🏠"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Geburtsdatum",
        es: "Fecha de nacimiento",
        type: "Sustantivo",
        emoji: "🎂"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Geburtsort",
        es: "Lugar de nacimiento",
        type: "Sustantivo",
        emoji: "🏥"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "das Alter",
        es: "La edad",
        type: "Sustantivo",
        emoji: "⏳"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Staatsangehörigkeit",
        es: "Nacionalidad",
        type: "Sustantivo",
        emoji: "🌍"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "der Beruf",
        es: "Profesión",
        type: "Sustantivo",
        emoji: "💼"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Telefonnummer",
        es: "Número de teléfono",
        type: "Sustantivo",
        emoji: "📱"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die E-Mail-Adresse",
        es: "Correo electrónico",
        type: "Sustantivo",
        emoji: "📧"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Anzahl der Personen",
        es: "Número de personas",
        type: "Frase",
        emoji: "🔢"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "die Unterschrift",
        es: "La firma",
        type: "Sustantivo",
        emoji: "✍️"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "Barzahlung",
        es: "Pago en efectivo",
        type: "Sustantivo",
        emoji: "💶"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "mit Karte zahlen",
        es: "Pago con tarjeta",
        type: "Frase",
        emoji: "💳"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "weiblich / männlich / divers",
        es: "Femenino/Masculino/Diverso",
        type: "Adjetivos",
        emoji: "🚻"
      }} {...props} />
            <PresentationVocabCard wordObj={{
        de: "ledig / verheiratet",
        es: "Soltero / Casado",
        type: "Adjetivos",
        emoji: "💍"
      }} {...props} />
          </div>
  }, {
    title: "Clase Magistral: Arquitectura de la Oración",
    subtitle: "Sintaxis alemana para redactar sin errores",
    content: (
      <div className="mt-8 max-w-3xl mx-auto space-y-4 text-slate-700">
        <p className="text-lg mb-4">Para el Goethe Zertifikat A1, los examinadores evalúan principalmente si respetas el orden estricto de las palabras. Domina estas dos reglas y tu escritura será perfecta.</p>
        <GrammarAccordion title="1. La Regla de Oro (Posición 2)">
          <p>El verbo conjugado es el REY y siempre ocupa la posición 2 en una oración afirmativa, sin importar con qué palabra inicies.</p>
          <div className="bg-slate-100 p-3 rounded mt-2 border border-slate-200 font-mono text-sm">
            [1. Ich] <strong>[2. spiele]</strong> [3. heute] [4. Fußball].<br/>
            [1. Heute] <strong>[2. spiele]</strong> [3. ich] [4. Fußball].
          </div>
        </GrammarAccordion>
        <GrammarAccordion title="2. Conectores Fantasma (ADUSO)">
          <p>Las palabras <strong>A</strong>ber (pero), <strong>D</strong>enn (porque), <strong>U</strong>nd (y), <strong>S</strong>ondern (sino) y <strong>O</strong>der (o) ocupan la <strong>Posición 0</strong>. No afectan el lugar del verbo.</p>
          <div className="bg-slate-100 p-3 rounded mt-2 border border-slate-200 font-mono text-sm">
            [0. Und] [1. ich] <strong>[2. lerne]</strong> [3. Deutsch].
          </div>
        </GrammarAccordion>
        <GrammarAccordion title="3. La Regla TeKaMoLo">
          <p>Si tienes mucha información de relleno en la oración, ordénala así:</p>
          <ul className="space-y-1 mt-2">
            <li>⏱️ <strong>Te</strong>mporal (¿Cuándo? - <em>heute</em>)</li>
            <li>🎯 <strong>Ka</strong>usal (¿Por qué? - <em>wegen des Regens</em>)</li>
            <li>🎭 <strong>Mo</strong>dal (¿Cómo? - <em>schnell</em>)</li>
            <li>📍 <strong>Lo</strong>kal (¿Dónde? - <em>nach Hause</em>)</li>
          </ul>
        </GrammarAccordion>
      </div>
    )
  }, {
    title: "Caja de Herramientas (Redemittel)",
    subtitle: "Frases comodín para salvar el examen",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="1. Saludos (Anrede)">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Formal Masculino:</strong> Sehr geehrter Herr [Apellido],</li>
                <li><strong>Formal Femenino:</strong> Sehr geehrte Frau [Apellido],</li>
                <li><strong>Informal Masculino:</strong> Lieber [Nombre],</li>
                <li><strong>Informal Femenino:</strong> Liebe [Nombre],</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="2. Despedidas (Gruß)">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Formal:</strong> Mit freundlichen Grüßen</li>
                <li><strong>Informal:</strong> Viele Grüße <em>(o)</em> Liebe Grüße</li>
              </ul>
              <p className="text-sm text-emerald-600 mt-2 font-bold">¡Recuerda! Ninguna lleva coma al final.</p>
            </GrammarAccordion>
            <GrammarAccordion title="3. Frases Comodín (Universales)">
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Para excusarse:</strong> Es tut mir leid, aber... (Lo siento, pero...)</li>
                <li><strong>Para proponer:</strong> Ich habe eine ID... (Tengo una idea...)</li>
                <li><strong>Para agradecer:</strong> Vielen Dank für die Einladung! (Muchas gracias por la invitación)</li>
                <li><strong>Para pedir algo:</strong> Ich brauche bitte Informationen über... (Necesito por favor información sobre...)</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="4. El Doble Juego de las Preposiciones de Lugar">
              <p>Para indicar destinos o cancelaciones viales por daños, usa la preposición correcta:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Estático (Dativo - Dónde estoy):</strong> <em>Ich stehe im Stau</em> (Estoy en el trancón) / <em>Ich bin auf der Post</em> (Estoy en el correo).</li>
                <li><strong>Movimiento (Acusativo - Hacia dónde voy):</strong> <em>Ich muss mein Auto in die Werkstatt bringen</em> (Debo llevar mi carro al taller).</li>
              </ul>
            </GrammarAccordion>
          </div>
  }, {
    title: "El Arte del Formulario (Schreiben Teil 1)",
    subtitle: "Estrategia oficial para completar formularios de examen sin perder puntos",
    content: props => (
      <OfficialFormExam {...props} />
    )
  }, {
    title: "La Regla Simple y Seguro",
    subtitle: "Simulador de Redacción",
    content: <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 rounded-r-lg">
              <p className="font-bold text-emerald-800">💡 Escribe 3 oraciones cortas</p>
              <p className="text-sm text-emerald-700 mt-1">No te compliques. El examen pide 3 puntos. Escribe una oración exacta para cada punto con el verbo en Posición 2. Menos es más.</p>
            </div>

            <EmailSimulator initialText="" />
          </div>
  }]
}, {
  id: 'g_sprechen',
  title: 'Sprechen (Expresión Oral)',
  desc: 'Presentaciones y Peticiones Educadas',
  theme: 'blueprint',
  presentationUrl: 'https://drive.google.com/file/d/1_yvgsDvmHvQvSYoXJvKImN9WLxkEdgGA/view?usp=drive_link',
  slides: [{
    title: "Guía Maestra: El Examen Oral",
    subtitle: "Sprechen A1/A2",
    content: <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mt-8">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-indigo-500 shadow-lg relative">
              <Mic size={64} className="text-indigo-600" />
            </div>
            <p className="text-xl font-medium text-slate-700">Aprende a presentarte con fluidez, a formular preguntas directas con tarjetas y a pedir favores usando la fórmula mágica de cortesía.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 1</span>
                <span className="text-sm text-slate-500">Sich vorstellen<br />(Presentación personal)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 2</span>
                <span className="text-sm text-slate-500">Fragen und Antworten<br />(Tarjetas de temas)</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-indigo-600 block">Teil 3</span>
                <span className="text-sm text-slate-500">Bitten formulieren<br />(Peticiones de cortesía)</span>
              </div>
            </div>
          </div>
  }, {
    title: "Gramática Visual para Hablar",
    subtitle: "Estructuras sin margen de error",
    content: <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <GrammarAccordion title="1. W-Fragen (Preguntas Abiertas)">
              <p>Buscan información específica. <strong>El verbo siempre va en posición 2.</strong></p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li><strong>Wer?</strong> (¿Quién?) ➡️ <em>Wer bist du?</em></li>
                <li><strong>Wie?</strong> (¿Cómo?) ➡️ <em>Wie heißt du?</em></li>
                <li><strong>Was?</strong> (¿Qué?) ➡️ <em>Was machst du?</em></li>
                <li><strong>Wann?</strong> (¿Cuándo?) ➡️ <em>Wann kommst du?</em></li>
                <li><strong>Wo / Woher / Wohin?</strong> (¿Dónde / De dónde / A dónde?)</li>
              </ul>
            </GrammarAccordion>
            <GrammarAccordion title="2. Ja/Nein-Fragen (Cerradas)">
              <p>Si respondes con Sí o No, <strong>el verbo salta a la Posición 1.</strong></p>
              <div className="bg-slate-100 p-3 rounded font-mono font-bold text-center mt-2 border border-slate-300 text-lg">
                <span className="text-indigo-600">Trinkst [1]</span> du [2] am Wochenende Bier?
              </div>
            </GrammarAccordion>
            <GrammarAccordion title="3. El Sándwich de Petición (Imperativo Suave)">
              <p>Para la Parte 3, usa esta plantilla exacta para pedir objetos con cortesía:</p>
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl mt-2 text-center text-sm font-bold shadow-sm">
                <span className="text-indigo-600 text-lg block mb-1">Können Sie mir bitte...</span>
                <span className="text-orange-500 text-xl block mb-1">[el objeto en Acusativo]</span>
                <span className="text-emerald-600 text-lg block">...geben?</span>
              </div>
            </GrammarAccordion>
            <GrammarAccordion title="4. El Truco de la Ingeniería Sintáctica: Evita Declinar">
              <p>Bajo presión en el examen A1, declinar adjetivos antes del sustantivo genera muchos errores. <strong>Separa el adjetivo usando el verbo 'sein'.</strong></p>
              <div className="bg-red-50 text-red-800 p-3 rounded mt-2 border border-red-100 line-through">
                Peligroso: Ich brauche einen großen Tisch. (Exige declinación Akk).
              </div>
              <div className="bg-green-50 text-green-800 p-3 rounded mt-2 border border-green-200 font-bold">
                Inteligente: Ich brauche einen Tisch. Der Tisch ist groß. (El adjetivo queda intacto).
              </div>
            </GrammarAccordion>
          </div>
  }]
}];

const TimeClockSimulator = ({ initialTime = "14:30" }) => {
  const [hour, setHour] = React.useState(14);
  const [minute, setMinute] = React.useState(30);

  const getGermanTime = (h, m) => {
    const formalHour = String(h).padStart(2, '0');
    const formalMinute = String(m).padStart(2, '0');
    const formal = `${formalHour}:${formalMinute} Uhr`;

    let informal = "";
    const nextHour = (h % 12) + 1;
    const current12 = (h % 12) || 12;

    if (m === 0) informal = `${current12} Uhr Punkt`;
    else if (m === 15) informal = `Viertel nach ${current12}`;
    else if (m === 30) informal = `halb ${nextHour}`;
    else if (m === 45) informal = `Viertel vor ${nextHour}`;
    else if (m < 30) informal = `${m} nach ${current12}`;
    else informal = `${60 - m} vor ${nextHour}`;

    return { formal, informal };
  };

  const { formal, informal } = getGermanTime(hour, minute);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-2xl max-w-md mx-auto shadow-lg border border-slate-800 text-center space-y-4">
      <div className="text-4xl font-black text-amber-400 font-mono tracking-wider">
        {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
      </div>
      <div className="flex flex-col gap-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
        <div className="text-sm"><span className="text-slate-400 font-semibold">Hora Formal (Oficial):</span> <strong className="text-emerald-400">{formal}</strong></div>
        <div className="text-sm"><span className="text-slate-400 font-semibold">Hora Informal (Cotidiana):</span> <strong className="text-indigo-300">{informal}</strong></div>
      </div>
      <div className="flex justify-center gap-6 pt-2">
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-slate-400 font-bold">Hora ({hour}h)</label>
          <input 
            type="range" 
            min="0" 
            max="23" 
            value={hour} 
            onChange={e => setHour(Number(e.target.value))} 
            className="accent-amber-400 cursor-pointer w-28"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-slate-400 font-bold">Minutos ({minute}m)</label>
          <input 
            type="range" 
            min="0" 
            max="55" 
            step="5"
            value={minute} 
            onChange={e => setMinute(Number(e.target.value))} 
            className="accent-indigo-400 cursor-pointer w-28"
          />
        </div>
      </div>
    </div>
  );
};

const DativeMatrixClicker = ({ mode, ...props }) => (
  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
    <AccusativeShield 
      words={[
        { word: "dem Mann", gender: "der", translation: "al hombre (Masculino: dem)" },
        { word: "der Frau", gender: "die", translation: "a la mujer (Femenino: der)" },
        { word: "dem Kind", gender: "das", translation: "al niño (Neutro: dem)" },
        { word: "den Kindern", gender: "die", translation: "a los niños (Plural: den + n)" }
      ]}
      {...props}
    />
  </div>
);

// --- PLAN DE ESTUDIOS MAESTRO A1 (12 CAPÍTULOS DEFINITIVOS V9.2) ---
export const studyPlanModules = [
  // =========================================================================
  // BLOQUE I: CIEMIENTOS, IDENTIDAD Y TIEMPO
  // =========================================================================
  {
    id: 'sp_1',
    title: 'Capítulo 1: La Célula Sintáctica y Conjugación Regular',
    presentationUrl: 'https://drive.google.com/file/d/1D1x2fDb33331RzgNbJupn8jg-MpjiAzA/view?usp=drive_web',
    slides: [
      {
        title: "La Regla de Oro de la Posición 2 (Verb Second - V2)",
        subtitle: "El verbo conjugado es el rey inamovible de la oración afirmativa",
        content: `El alemán funciona como un sistema modular de bloques. La regla matemática inquebrantable de la sintaxis alemana es que el verbo conjugado **SIEMPRE ocupa la Posición 2** en oraciones afirmativas y negativas.\n\n* **Posición 1 (Sujeto o Tiempo):** \`Ich\` / \`Heute\`\n* **Posición 2 (VERBO CONJUGADO):** \`wohne\` / \`wohne\`\n* **Posición 3 (Sujeto tras Inversión o Resto):** \`in Madrid\` / \`ich in Madrid\`\n\n⚠️ **Inversión Sintáctica:** Si mueves un elemento de tiempo o lugar a la Posición 1 para darle énfasis, el sujeto salta automáticamente a la Posición 3 para proteger la Posición 2 del verbo: *"Heute wohne ich in Madrid."*\n\n🚫 **Trampa Hispanohablante:** En español decimos "Hoy yo vivo en Berlín". Traducir esto literalmente como \`*Heute ich wohne in Berlin\` rompe la regla V2 y es un error grave en el Goethe A1. La forma correcta es: **Heute wohne ich in Berlin**.`
      },
      {
        title: "El Motor de Conjugación Regular y Cambios Vocálicos",
        subtitle: "Extracción de la raíz, desinencias estándar y excepciones fonéticas",
        content: `Para conjugar un verbo en presente (*Präsens*), retiramos la terminación **-en** e inyectamos las desinencias estándar: \`ich -e\`, \`du -st\`, \`er/sie/es -t\`, \`wir -en\`, \`ihr -t\`, \`sie/Sie -en\`.\n\n⚡ **La Regla de la -e- Epentética:**\nSi la raíz de un verbo termina en **-t** o **-d** (*arbeit-en*, *find-en*), es fonéticamente imposible pronunciar las terminaciones \`-st\` o \`-t\`. Por ello, se inserta una **-e- de apoyo** en las segundas y terceras personas: *du arbeit**e**st*, *er find**e**t*, *ihr arbeit**e**t*.\n\n📚 **Cambios Vocálicos Fuertes (Solo en Singular du/er/sie/es):**\n1. **e ➔ i / ie:** *sprechen* ➔ du **sprichst**, er **spricht** | *lesen* ➔ du **liest**.\n2. **a ➔ ä (Pierden el Umlaut en plural):** *fahren* ➔ du **fährst**, er **fährt**.`
      },
      {
        title: "Verbos Auxiliares Irregulares Absolutos: sein y haben",
        subtitle: "Los dos pilares fundamentales del idioma alemán",
        content: `Los verbos **sein** (ser/estar) y **haben** (tener/haber) no siguen reglas estándar. Deben memorizarse como fórmulas fijas:\n\n**sein (Ser / Estar):**\n* ich **bin** | du **bist** | er/sie/es **ist**\n* wir **sind** | ihr **seid** | sie/Sie **sind**\n\n**haben (Tener / Haber):**\n* ich **habe** | du **hast** *(pierde la -b-)* | er/sie/es **hat** *(pierde la -b-)*\n* wir **haben** | ihr **habt** | sie/Sie **haben**\n\n💡 **Tip Examen Goethe A1 (Sprechen Teil 1):** Usa la estructura V2 para tu presentación personal: *"Ich bin Juan, ich komme aus Kolumbien und wohne in Madrid."*`
      },
      {
        title: "Reto Interactivo: Inversión Sintáctica V2",
        subtitle: "Ordena los bloques asegurando la Posición 2 del verbo",
        content: props => (
          <DraggableSentenceBuilder 
            mode="inversion"
            pool={[
              { id: 1, words: ["Heute", "wohne", "ich", "in Madrid"], correctOrder: ["Heute", "wohne", "ich", "in Madrid"] },
              { id: 2, words: ["Am Morgen", "trinken", "wir", "einen Kaffee"], correctOrder: ["Am Morgen", "trinken", "wir", "einen Kaffee"] }
            ]}
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_2',
    title: 'Capítulo 2: El Universo del Sustantivo (Géneros, Plurales y Posesivos)',
    presentationUrl: 'https://drive.google.com/file/d/1ydPXeoc5VGUyyP2C-_eBo7e0RB-CTTGS/view?usp=drive_web',
    slides: [
      {
        title: "Tríada Cromática y Pistas Morfológicas de Género",
        subtitle: "Anclaje visual y sufijos de género indudable",
        content: `En alemán, cada sustantivo debe aprenderse junto a su artículo y su color de anclaje:\n* 🔵 **Masculino (der / ein):** Color Azul (Equipo Sol)\n* 🔴 **Femenino (die / eine):** Color Rojo (Equipo Luna)\n* 🟢 **Neutro (das / ein):** Color Verde (Equipo Estrella)\n\n🔍 **Sufijos Morfológicos Seguros:**\n* **Siempre Femeninos (die):** \`-ung\` (*die Wohnung*), \`-heit\` (*die Gesundheit*), \`-keit\` (*die Möglichkeit*), \`-schaft\` (*die Landschaft*), \`-in\` (*die Lehrerin*).\n* **Siempre Neutros (das):** \`-chen\` (*das Mädchen*), \`-lein\` (*das Fräulein*), sustantivos verbales (*das Essen*).\n* **Siempre Masculinos (der):** Días, meses, estaciones (*der Montag*, *der Januar*, *der Sommer*), sufijos \`-ling\` (*der Lehrling*), \`-ismus\` (*der Tourismus*).\n\n🚫 **Trampa Hispanohablante:** No traslades el género del español. En alemán el sol es femenino (*die Sonne*) y la luna es masculino (*der Mond*).`
      },
      {
        title: "Morfología Temprana del Plural y Precios en A1",
        subtitle: "Las 5 terminaciones de plural y la lectura invertida comercial",
        content: `El plural en alemán (**siempre con artículo die**) sigue 5 patrones: 1. **-e** (*die Hunde*), 2. **-er** con Umlaut (*die Bücher*), 3. **-n/-en** (*die Frauen*), 4. **-s** (*die Autos*), 5. **Sin terminación** (*die Fenster* / *die Äpfel*).\n\n💶 **Morfología Numérica Comercial (Trampa de Escucha):**\n* Los números del 21 al 99 se leen a la inversa (unidades antes que decenas unidas por *und*): *24 ➔ vier-und-zwei-und-zwanzig*.\n* En los precios, la palabra **Euro** o **Cent** interrumpe físicamente la cifra: **4,99 €** se lee estrictamente como **vier Euro neunundneunzig** (NUNCA \`*vier comma neunundneunzig\`).`
      },
      {
        title: "La Matriz de Clones de 'ein' (Pronombres Posesivos)",
        subtitle: "Los posesivos imitan exactamente la flexión del artículo indeterminado",
        content: `Los determinantes posesivos (**mein, dein, sein, ihr, unser, euer**) NO cambian según el poseedor, sino según el **género del objeto poseído** imitando las terminaciones de **ein**:\n\n* Si el sustantivo es **Masculino/Neutro** ➔ Forma base: **mein** Vater, **mein** Kind, **dein** Auto.\n* Si el sustantivo es **Femenino/Plural** ➔ Añade **-e**: **meine** Mutter, **meine** Eltern, **deine** Taschen.\n\n📊 **Tabla Maestra de Posesivos (Nominativo):**\n* **ich (yo):** mein / meine\n* **du (tú):** dein / deine\n* **er (él) / es (neutro):** sein / seine\n* **sie (ella) / sie (ellos):** ihr / ihre\n* **wir (nosotros):** unser / unsere\n* **ihr (vosotros):** euer / eure *(pierde la -e- interna)*\n* **Sie (Usted/Ustedes):** Ihr / Ihre *(siempre en Mayúscula)*`
      },
      {
        title: "Reto Interactivo: Escudo de Posesivos y Género",
        subtitle: "Asigna el artículo y posesivo correcto a los miembros de la familia",
        content: props => (
          <AccusativeShield 
            mode="possessives"
            words={[
              { id: 1, word: "Vater", type: "Masc", gender: "der", correct: "mein", alt: "meine", translation: "padre (mein Vater)" },
              { id: 2, word: "Mutter", type: "Fem", gender: "die", correct: "meine", alt: "mein", translation: "madre (meine Mutter)" },
              { id: 3, word: "Kind", type: "Neutro", gender: "das", correct: "dein", alt: "deine", translation: "hijo/a (dein Kind)" },
              { id: 4, word: "Eltern", type: "Plural", gender: "die", correct: "seine", alt: "sein", translation: "padres (seine Eltern)" }
            ]}
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_3',
    title: 'Capítulo 3: Negación Integral y la Arquitectura del Tiempo',
    presentationUrl: 'https://drive.google.com/file/d/19pXqHghxkD35YlPmPZqhgPh7yC8Uo33n/view?usp=sharing',
    slides: [
      {
        title: "La Frontera de la Negación: kein vs. nicht",
        subtitle: "Aprende qué negar y dónde colocar la palabra de negación",
        content: `En español usamos "NO" para todo. En alemán existe una frontera gramatical estricta:\n\n1. **kein / keine (El Asesino de 'ein'):**\nNiega **exclusivamente sustantivos** que llevan artículo indeterminado (*ein/eine*) o van sin artículo (*Nullartikel*):\n* *Ich habe ein Auto.* ➔ *Ich habe **kein** Auto.*\n* *Ich trinke Wasser.* ➔ *Ich trinke **kein** Wasser.*\n\n2. **nicht (Negador Universal):**\nNiega verbos, adjetivos, nombres propios, lugares o sustantivos con artículo determinado (*der/die/das*) o posesivo:\n* **Verbos (nicht va al final absoluto):** *Ich komme heute **nicht**.*\n* **Adjetivos (nicht va inmediatamente antes):** *Das Auto ist **nicht** neu.*\n* **Lugares / Nombres:** *Ich wohne **nicht** in Berlin.*`
      },
      {
        title: "El Cronómetro Alemán: Hora Formal vs. Informal",
        subtitle: "Dominando los horarios para las pruebas de audición (Hören) del Goethe A1",
        content: `En el examen Goethe A1, las trampas de horarios son muy frecuentes. Debes dominar ambas estructuras:\n\n* **Hora Formal (Sistema 24 hrs - Estaciones, Aeropuertos, Citas Oficiales):**\nSe lee literalmente en orden: [Hora] + **Uhr** + [Minutos].\n  * 14:30 ➔ *vierzehn Uhr dreißig*\n  * 08:15 ➔ *acht Uhr fünfzehn*\n\n* **Hora Informal (Sistema 12 hrs - Conversación Cotidiana):**\nSe basa en cuartos (**Viertel**) y medias horas (**halb**).\n  * **halb (media hora ANTES de la hora siguiente):** 14:30 = **halb drei** *(media hora para las 3)*.\n  * **Viertel nach (cuarto pasado de):** 14:15 = **Viertel nach zwei**.\n  * **Viertel vor (cuarto para):** 14:45 = **Viertel vor drei**.`
      },
      {
        title: "Tríada Preposicional Temporal: um, am, im",
        subtitle: "La regla mnemotécnica para no dudar jamás con el tiempo",
        content: `Memoriza este esquema para usar las preposiciones de tiempo exactas:\n\n1. **um (Horas exactas):**\n   * **um** 8 Uhr | **um** wie viel Uhr?\n\n2. **am (Días de la semana, fechas y partes del día):**\n   * **am** Montag | **am** Morgen | **am** 15. Mai\n   * *(Excepción: in der Nacht)*\n\n3. **im (Meses, estaciones del año y años con 'im Jahr'):**\n   * **im** Juli | **im** Sommer | **im** Jahr 2026\n\n💡 **Tip Goethe A1:** En las notas breves del examen (*Schreiben Teil 2*), la fecha y hora deben usar estas preposiciones: *"Ich komme **am** Samstag **um** 15 Uhr."*`
      },
      {
        title: "Simulador Interactivo: El Reloj Alemán",
        subtitle: "Mueve las manecillas y alterna entre hora formal e informal",
        content: props => (
          <TimeClockSimulator initialTime="14:30" isInteractive={true} {...props} />
        )
      }
    ]
  },

  // =========================================================================
  // BLOQUE II: EL SISTEMA DE CASOS (DECLINACIÓN ACTIVA)
  // =========================================================================
  {
    id: 'sp_4',
    title: 'Capítulo 4: El Objeto Directo: Acusativo y Pronombres',
    presentationUrl: 'https://drive.google.com/file/d/1QusIBIw3hhDxZvtnB3eocWlPWW43dlIp/view?usp=drive_web',
    slides: [
      {
        title: "El Filtro Masculino: La Regla de la N-Mutation",
        subtitle: "Por qué Femenino, Neutro y Plural son 100% inmunes al Acusativo",
        content: props => (
          <div className="space-y-4">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              El caso Acusativo (Akkusativ) señala el <strong>Objeto Directo</strong> de la oración (¿Qué compras? ¿A quién buscas?).
            </p>
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-xs md:text-sm font-medium">
              ⚡ <strong>REGLA DE ORO:</strong> El Acusativo <strong>SOLO ALTERA LOS ARTÍCULOS MASCULINOS</strong>, añadiendo la terminación <strong>-en</strong>. Los demás géneros son 100% inmunes.
            </div>
            {/* Componente Modular de Tarjetas de Acusativo */}
            <AccusativeCards {...props}/>
          </div>
        )
      },
      {
        title: "Pronombres Personales de Objeto Directo",
        subtitle: "Sustituyendo personas u objetos en Acusativo",
        content: `Cuando el Objeto Directo es un pronombre personal ("Me buscas", "Lo compro", "Te amo"), el pronombre muta a su forma de Acusativo:\n\n* **ich (yo) ➔ mich** (*Sie sucht mich* - Ella me busca)\n* **du (tú) ➔ dich** (*Ich liebe dich* - Te amo)\n* **er (él) ➔ ihn** *(⚠️ Mutación -en)* (*Ich kenne ihn* - Lo conozco a él)\n* **es (neutro) ➔ es** (*Ich kaufe es* - Lo compro)\n* **sie (ella) ➔ sie** (*Ich sehe sie* - La veo a ella)\n* **wir (nosotros) ➔ uns** (*Er besucht uns* - Nos visita)\n* **ihr (vosotros) ➔ euch** (*Ich höre euch* - Os escucho)\n* **sie/Sie (ellos/Usted) ➔ sie / Sie** (*Ich frage Sie* - Le pregunto a Usted)\n\n🚫 **Trampa Hispanohablante:** En español decimos "Busco a mi hermano" (usando la preposición 'a'). En alemán **NO EXISTE LA PREPOSICIÓN 'A'** para objetos personales. El Acusativo la absorbe: **Ich suche meinen Bruder** (NUNCA \`*Ich suche an meinen Bruder\`).`
      },
      {
        title: "Verbos Transitivos y Preposiciones Puras de Acusativo",
        subtitle: "Activadores sintácticos y el pronombre interrogativo Wen",
        content: `El caso Acusativo no solo se activa con verbos transitivos puros (*haben, brauchen, suchen, finden, essen, trinken*) y la estructura existencial **es gibt**. También se rige de forma obligatoria por preposiciones puras:\n\n* **für (para):** *Das Geschenk ist für **meinen** Vater (Masc).* / *für mich.*\n* **ohne (sin):** *Ich trinke Kaffee ohne **einen** Zucker (Masc).* / *ohne dich.*\n* **gegen (contra / hacia una hora aproximada):** *Er kommt gegen **den** Abend.*\n\n🔍 **El Interrogativo de Objeto:** Cuando preguntas por la persona que recibe la acción directa, la palabra *Wer* (quién) muta a Acusativo: **Wen** (*¿A quién?*).\n* *"**Wen** suchst du?" ➔ "Ich suche **meinen** Bruder."*`
      },
      {
        title: "Reto Interactivo: Mutación de Pronombres y Artículos",
        subtitle: "Aplica el escudo de Acusativo en oraciones de compras y contactos",
        content: props => (
          <AccusativeShield 
            mode="pronouns"
            words={[
              { id: 1, word: "den Mann", type: "Masc", gender: "der", correct: "ihn", alt: "er", translation: "hombre (den Mann / ihn)" },
              { id: 2, word: "einen Kaffee", type: "Masc", gender: "der", correct: "einen", alt: "ein", translation: "café (einen Kaffee)" },
              { id: 3, word: "die Frau", type: "Fem", gender: "die", correct: "sie", alt: "ihr", translation: "mujer (die Frau / sie)" },
              { id: 4, word: "das Brot", type: "Neutro", gender: "das", correct: "ein", alt: "einen", translation: "pan (das Brot / es)" }
            ]}
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_5',
    title: 'Capítulo 5: El Objeto Indirecto: Dativo y el Código M-R-M-N',
    presentationUrl: 'https://drive.google.com/file/d/1n_dLlwAlx9mJMoytcMC4wV3TjNCb59-r/view?usp=drive_web',
    slides: [
      {
        title: "El Código Mnemotécnico M-R-M-N (MaRiMaNa)",
        subtitle: "La mutación universal de todos los artículos en caso Dativo",
        content: props => (
          <div className="space-y-3 my-2">
            <p className="text-slate-700 text-xs sm:text-sm">
              El Dativo marca el <strong>Objeto Indirecto</strong> y altera TODOS los géneros:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-1.5 py-0.5 rounded block">🔵 Masc (M)</span>
                <strong className="text-blue-900 block text-sm">dem</strong>
                <span className="text-[11px] text-slate-500">einem / meinem</span>
              </div>
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-rose-200 text-rose-900 font-bold px-1.5 py-0.5 rounded block">🔴 Fem (R)</span>
                <strong className="text-rose-900 block text-sm">der</strong>
                <span className="text-[11px] text-slate-500">einer / meiner</span>
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded block">🟢 Neutro (M)</span>
                <strong className="text-emerald-900 block text-sm">dem</strong>
                <span className="text-[11px] text-slate-500">einem / meinem</span>
              </div>
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded block">🟣 Plural (N)</span>
                <strong className="text-purple-900 block text-sm">den + -n</strong>
                <span className="text-[11px] text-slate-500">meinen Kinder<strong>n</strong></span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Pronombres de Receptor (Dativo)",
        subtitle: "Expresando a quién le das, muestras o dices algo",
        content: props => (
          <div className="space-y-3 my-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-center">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">ich ➔ <strong className="text-indigo-600">mir</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">du ➔ <strong className="text-indigo-600">dir</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">er/es ➔ <strong className="text-indigo-600">ihm</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">sie ➔ <strong className="text-indigo-600">ihr</strong></div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
              🚫 <strong>Diferencia vs Español:</strong> En español "le" sirve para él y ella. En alemán: <strong>Ich helfe ihm</strong> (a él) vs. <strong>Ich helfe ihr</strong> (a ella).
            </div>
          </div>
        )
      },
      {
        title: "Preposiciones Fijas de Dativo y Contracciones de Dirección",
        subtitle: "Satélites de caso invariable y el pronombre interrogativo Wem",
        content: props => (
          <div className="space-y-3 my-2">
            <p className="text-xs text-slate-600 font-semibold">Preposiciones innegociables: <em>aus, bei, mit, nach, seit, von, zu</em></p>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">zu + dem ➔ <strong>zum</strong></div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">zu + der ➔ <strong>zur</strong></div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">von + dem ➔ <strong>vom</strong></div>
            </div>
          </div>
        )
      },
      {
        title: "Selector Interactivo: Matriz M-R-M-N",
        subtitle: "Conmuta géneros y observa la mutación de artículos y la -n del plural",
        content: props => (
          <DativeMatrixClicker mode="matrix_mnrn" {...props}/>
        )
      }
    ]
  },
  {
    id: 'sp_6',
    title: 'Capítulo 6: El Mapa Espacial: Wechselpräpositionen',
    presentationUrl: 'https://drive.google.com/file/d/1wS542v_rcsuYj1cpEsTzahsmKDBQQxjV/view?usp=drive_web',
    slides: [
      {
        title: "La Ecuación del Espacio: ¿Wo? vs. ¿Wohin?",
        subtitle: "El dilema existencial de las 9 preposiciones de doble vía",
        content: props => (
          <div className="space-y-3">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              Existen 9 preposiciones espaciales cuyo caso cambia dinámicamente según la intención de la oración:
            </p>
            {/* Componente Modular de Ecuación Espacial */}
            <LocativeEquationCards {...props}/>
            <div className="space-y-1 text-xs sm:text-sm text-slate-700">
              <p><strong>Ejemplo ¿Wo? (Dativo):</strong> Das Buch liegt <em>auf dem</em> Tisch. (El libro está quieto sobre la mesa).</p>
              <p><strong>Ejemplo ¿Wohin? (Acusativo):</strong> Ich lege das Buch <em>auf den</em> Tisch. (Pongo el libro viajando hacia la mesa).</p>
            </div>
          </div>
        )
      },
      {
        title: "Parejas Verbales: Estado vs. Acción de Colocar",
        subtitle: "Verbos que fijan el caso Dativo o Acusativo en la oración",
        content: `En alemán, los verbos de posición se dividen en parejas estrictas:\n\n| Verbo Estático ( Dativo - ¿Wo? ) | Verbo de Acción ( Acusativo - ¿Wohin? ) |\n| :--- | :--- |\n| **stehen** (estar de pie/vertical) | **stellen** (poner en vertical) |\n| *Das Glas steht auf dem Tisch.* | *Ich stelle das Glas auf den Tisch.* |\n| **liegen** (estar echado/horizontal) | **legen** (tumbar/acostar) |\n| *Das Buch liegt auf dem Bett.* | *Ich lege das Buch auf das Bett.* |\n| **sitzen** (estar sentado) | **setzen (sich)** (sentarse) |\n| *Der Mann sitzt auf dem Stuhl.* | *Er setzt sich auf den Stuhl.* |\n| **hängen** (estar colgado) | **hängen** (colgar algo) |\n| *Das Bild hängt an der Wand.* | *Ich hänge das Bild an die Wand.* |`
      },
      {
        title: "Contracciones Nativas Indispensables de A1",
        subtitle: "Fusionando preposición y artículo para hablar con fluidez natural",
        content: `En la conversación cotidiana y en los exámenes Goethe, es obligatorio usar contracciones preposicionales:\n\n* **in + dem** (Dativo Masc/Neutro) ➔ **im** (*Ich bin **im** Supermarkt*)\n* **in + das** (Acusativo Neutro) ➔ **ins** (*Ich gehe **ins** Kino*)\n* **an + dem** (Dativo Masc/Neutro) ➔ **am** (*Er wartet **am** Bahnhof*)\n* **an + das** (Acusativo Neutro) ➔ **ans** (*Wir fahren **ans** Meer*)\n* **zu + dem** (Dativo Masc/Neutro) ➔ **zum** (*Ich fahre **zum** Flughafen*)\n* **zu + der** (Dativo Femenino) ➔ **zur** (*Ich gehe **zur** Bäckerei*)\n\n🚫 **Trampa Hispanohablante:** Usar la preposición "en" del español para ambas situaciones ("Estoy en el cine" / "Voy en el cine"). En alemán: **Ich bin im Kino** (Dativo) vs. **Ich gehe ins Kino** (Acusativo).`
      },
      {
        title: "Simulador 3D: Mapa Locativo Interactivo",
        subtitle: "Arrastra objetos y comprueba el cambio automático entre Dativo y Acusativo",
        content: props => (
          <LocativeMapSimulator mode="spatial_3d" {...props}/>
        )
      }
    ]
  },

  // =========================================================================
  // BLOQUE III: MECÁNICA VERBAL AVANZADA
  // =========================================================================
  {
    id: 'sp_7',
    title: 'Capítulo 7: Verbos Separables e Inseparables (La Pinza)',
    presentationUrl: 'https://drive.google.com/file/d/1s4MSGKeK7xVZF2qGN4JSXu5dl43VkhOC/view?usp=drive_web',
    slides: [
      {
        title: "El Efecto Pinza Verbal (Satzklammer)",
        subtitle: "El divorcio sintáctico de los verbos separables en presente",
        content: props => (
          <div className="space-y-3">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              Los verbos separables (<em>Trennbare Verben</em>) están formados por un prefijo y un verbo base. En oraciones afirmativas o interrogativas, sufren una separación estructural:
            </p>
            {/* Componente Modular de Flujo Sintáctico */}
            <SyntaxFlow 
              steps={[
                { badge: "1", name: "📌 Sujeto", description: "El ejecutor de la oración en Posición 1" },
                { badge: "2", name: "🔥 Verbo Base Conjugado", description: "Ocupa la Posición 2 obligatoria" },
                { badge: "3", name: "💬 Complementos", description: "Información extra (tiempo, modo, lugar)" },
                { badge: "4", name: "🔒 Prefijo Separable", description: "Cierre de la pinza verbal al final absoluto" }
              ]}
              {...props} 
            />
            <div className="space-y-1 text-xs sm:text-sm text-slate-700 pt-1">
              <p><strong>aufstehen:</strong> Ich <strong>stehe</strong> jeden Morgen um 6 Uhr <strong>auf</strong>.</p>
              <p><strong>einkaufen:</strong> Er <strong>kauft</strong> im Supermarkt <strong>ein</strong>.</p>
            </div>
          </div>
        )
      },
      {
        title: "El Escudo Inseparable: Prefijos que JAMÁS se Rompen",
        subtitle: "Protege tu sintaxis identificando los 5 prefijos inseparables del A1",
        content: `Para no romper verbos de forma incorrecta, debes aprender los **prefijos inseparables** (*Untrennbare Verben*). Estos prefijos forman una sola palabra con la raíz y **NUNCA viajan al final de la oración**:\n\n🛡️ **Los 5 Inseparables Clave de A1:**\n1. **be-:** *bezahlen* (pagar) ➔ *Ich **bezahle** die Rechnung.* (NUNCA \`*Ich zahle die Rechnung be\`)\n2. **ver-:** *verstehen* (entender) ➔ *Ich **verstehe** das Wort nicht.*\n3. **er-:** *erklären* (explicar) ➔ *Der Lehrer **erklärt** die Grammatik.*\n4. **ge-:** *gehören* (pertenecer) ➔ *Das Buch **gehört** mir.*\n5. **ent-:** *entschuldigen* (disculparse) ➔ *Ich **entschuldige** mich.*`
      },
      {
        title: "Interruptor Mecánico: Separable vs. Inseparable",
        subtitle: "Juega con la pinza sintáctica y ejercita la colocación del prefijo",
        content: props => (
          <PincerSwitch mode="separable_vs_inseparable" {...props}/>
        )
      }
    ]
  },
  {
    id: 'sp_8',
    title: 'Capítulo 8: Verbos Modales y el Sándwich Estructurado',
    presentationUrl: 'https://drive.google.com/file/d/12ef-35y8c5SaFbw4v1xIZX74-5E8mX6c/view?usp=drive_web',
    slides: [
      {
        title: "Los 5 Modales de A1 + möchten",
        subtitle: "Expresando habilidad, obligación, permiso, prohibición, deseo y consejo",
        content: props => (
          <div className="space-y-3 my-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-950">können</span>
                <span className="text-[10px] bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded block">Poder / Saber</span>
                <p className="text-[11px] text-slate-600 font-mono">kann sprechen</p>
              </div>
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                <span className="font-bold text-rose-950">müssen</span>
                <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded block">Obligación</span>
                <p className="text-[11px] text-slate-600 font-mono">muss bezahlen</p>
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-950">dürfen</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded block">Permiso / Prohibición</span>
                <p className="text-[11px] text-slate-600 font-mono">darf nicht</p>
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <span className="font-bold text-emerald-950">wollen</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded block">Querer</span>
                <p className="text-[11px] text-slate-600 font-mono">will reisen</p>
              </div>
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
                <span className="font-bold text-purple-950">sollen</span>
                <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded block">Consejo</span>
                <p className="text-[11px] text-slate-600 font-mono">soll Sport machen</p>
              </div>
              <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
                <span className="font-bold text-indigo-950">möchten</span>
                <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded block">Deseo cortés</span>
                <p className="text-[11px] text-slate-600 font-mono">möchte Kaffee</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "La Anomalía Fonética del Singular",
        subtitle: "1ª y 3ª persona del singular NUNCA llevan terminación",
        content: props => (
          <div className="space-y-3 my-2">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
              <strong>⚡ REGLA DE ORO DEL SINGULAR:</strong>
              <p>Las formas de <strong>ich</strong> y <strong>er/sie/es</strong> son 100% IDÉNTICAS y NO llevan terminación (<em>ich kann / er kann</em>).</p>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
              💡 <strong>Con Verbos Separables:</strong> El verbo principal viaja al final SIN SEPARARSE: <em>Ich muss um 7 Uhr <strong>aufstehen</strong>.</em>
            </div>
          </div>
        )
      },
      {
        title: "Tablero de Control: El Sándwich Modal",
        subtitle: "Configura la actitud de la oración y congela el verbo principal al final",
        content: props => (
          <PincerSwitch isModal={true} {...props}/>
        )
      }
    ]
  },
  {
    id: 'sp_9',
    title: 'Capítulo 9: El Modo Imperativo y Kit de Comunicación Oficial',
    presentationUrl: 'https://drive.google.com/file/d/1hvauciZnzhQPR7Jcvlhktq7VRdc_Xvrq/view?usp=drive_web',
    slides: [
      // SLIDE 1: LA TRÍADA SINTÁCTICA (DISEÑO EN 3 TARJETAS)
      {
        title: "La Tríada Sintáctica del Imperativo",
        subtitle: "Cómo dar instrucciones correctas eliminando pronombres y terminaciones",
        content: props => (
          <div className="space-y-4 my-2">
            <p className="text-slate-700 text-sm leading-relaxed">
              El modo imperativo da órdenes, recetas y peticiones. Se construye eliminando elementos según tu interlocutor:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Informal Singular: du */}
              <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-900 dark:text-blue-200 text-sm">1. du (Tú)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">Informal</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Elimina el pronombre <strong>du</strong> y la terminación <strong>-st</strong>.</p>
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg text-xs space-y-1 font-mono border border-blue-100">
                  <div className="text-slate-400 line-through">Du kommst</div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">➔ Komm!</div>
                </div>
              </div>

              {/* Informal Plural: ihr */}
              <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">2. ihr (Vosotros)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800">Plural</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Elimina el pronombre <strong>ihr</strong>. La <strong>-t</strong> se conserva.</p>
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg text-xs space-y-1 font-mono border border-indigo-100">
                  <div className="text-slate-400 line-through">Ihr kommt</div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">➔ Kommt!</div>
                </div>
              </div>

              {/* Formal: Sie */}
              <div className="p-3.5 bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-900 dark:text-purple-200 text-sm">3. Sie (Usted)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-800">Formal</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Inversión sintáctica: <strong>Infinitivo + Sie</strong>.</p>
                <div className="bg-white dark:bg-slate-900 p-2 rounded-lg text-xs space-y-1 font-mono border border-purple-100">
                  <div className="text-slate-400">Sie kommen</div>
                  <div className="text-purple-600 dark:text-purple-400 font-bold text-sm">➔ Kommen Sie!</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium flex items-center gap-2">
              <span>📌</span>
              <span><strong>Regla de Oro:</strong> En el imperativo, el verbo conjugado siempre ocupa la <strong>Posición 1</strong>.</span>
            </div>
          </div>
        )
      },

      // SLIDE 2: EXCEPCIONES Y MUTACIONES (TARJETAS DE ALERTA DE EXAMEN)
      {
        title: "Excepciones Críticas y Mutaciones Vocálicas",
        subtitle: "Las tres grandes trampas del examen oficial del Goethe A1",
        content: props => (
          <div className="space-y-3 my-2">
            {/* Alerta 1: Verbo sein */}
            <div className="p-3.5 bg-rose-50/80 border-l-4 border-rose-500 rounded-r-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-950 text-sm">1. Mutación Radical del Verbo sein</span>
                <span className="text-[10px] bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full font-bold">¡Irregular!</span>
              </div>
              <p className="text-xs text-rose-900/80">No sigue el presente. Aprende sus tres formas fijas de memoria:</p>
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-center text-xs font-mono">
                <div className="bg-white p-1.5 rounded border border-rose-200"><strong>du:</strong> <span className="text-rose-600">Sei!</span></div>
                <div className="bg-white p-1.5 rounded border border-rose-200"><strong>ihr:</strong> <span className="text-rose-600">Seid!</span></div>
                <div className="bg-white p-1.5 rounded border border-rose-200"><strong>Sie:</strong> <span className="text-rose-600">Seien Sie!</span></div>
              </div>
            </div>

            {/* Alerta 2: Pérdida del Umlaut */}
            <div className="p-3.5 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 text-sm">2. Pérdida del Umlaut (a ➔ ä)</span>
                <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">Trampa Goethe</span>
              </div>
              <p className="text-xs text-amber-900/80">Los verbos con Umlaut en presente <strong>LO PIERDEN</strong> en imperativo:</p>
              <div className="bg-white p-2 rounded border border-amber-200 text-xs font-mono flex items-center justify-between">
                <span className="text-slate-400">Du fährst</span>
                <span className="text-amber-700 font-bold">➔ Fahr langsamer!</span>
                <span className="text-[10px] text-rose-500 font-sans">(NUNCA *Fähr!)</span>
              </div>
            </div>

            {/* Alerta 3: Cambio vocálico e -> i */}
            <div className="p-3.5 bg-emerald-50/80 border-l-4 border-emerald-500 rounded-r-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 text-sm">3. Cambio Vocálico (e ➔ i / ie)</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Conserva cambio</span>
              </div>
              <p className="text-xs text-emerald-900/80">Mantiene el cambio a <strong>i/ie</strong> pero elimina la terminación <strong>-st</strong>:</p>
              <div className="bg-white p-2 rounded border border-emerald-200 text-xs font-mono space-y-1">
                <div className="flex justify-between"><span>Du sprichst</span> <strong className="text-emerald-700">➔ Sprich bitte!</strong></div>
                <div className="flex justify-between"><span>Du liest</span> <strong className="text-emerald-700">➔ Lies den Text!</strong></div>
              </div>
            </div>
          </div>
        )
      },

      // SLIDE 3: KIT DE REDACCIÓN Y CORTESÍA (BLOQUES CON ICONOS)
      {
        title: "Kit de Redacción y Fórmulas de Cortesía",
        subtitle: "Expresiones reales para las pruebas orales (Sprech-Cards) y cartas médicas",
        content: props => (
          <div className="space-y-3.5 my-2">
            {/* Bloque Médico */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span className="text-base">🏥</span>
                <span>Entorno Médico y Salud (sollen + Imperativo)</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-800 flex justify-between">
                  <span>Trinken Sie viel Wasser!</span>
                  <span className="text-slate-400 font-sans">(¡Beba mucha agua!)</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-800 flex justify-between">
                  <span>Nehmen Sie die Tabletten!</span>
                  <span className="text-slate-400 font-sans">(¡Tome las pastillas!)</span>
                </div>
              </div>
              <p className="text-[11px] text-indigo-700 font-medium">💡 Alternativa Modal: <em>Du sollst im Bett bleiben.</em> (Debes quedarte en cama).</p>
            </div>

            {/* Bloque Cortesía con bitte */}
            <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <span className="text-base">🧳</span>
                <span>Entorno de Servicio (La Partícula bitte)</span>
              </div>
              <p className="text-xs text-amber-900/80">Añade <strong>bitte</strong> inmediatamente después del verbo o pronombre formal:</p>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-white rounded-lg border border-amber-200 text-slate-800">
                  Geben Sie mir <span className="bg-amber-200 text-amber-900 px-1 rounded font-bold">bitte</span> das Formular!
                </div>
                <div className="p-2 bg-white rounded-lg border border-amber-200 text-slate-800">
                  Machen Sie das Fenster <span className="bg-amber-200 text-amber-900 px-1 rounded font-bold">bitte</span> zu!
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Simulador de Voz: Comandos e Instrucciones Oficiales",
        subtitle: "Escucha órdenes médicas e instrucciones formales del Goethe A1",
        content: props => (
          <VoiceExaminer 
            autoStart={false} 
            isInteractive={true} 
            mode="imperative_commands" 
            question="Repite o responde con un comando oficial:"
            expectedKeywords={["trinken", "macht", "zeigen", "sprechen", "kommen", "nehmen", "wasser", "buch", "pass"]}
            note="Tip Examen Goethe A1: Selecciona o pronuncia cualquier instrucción para practicar el imperativo."
            scenarios={[
              {
                context: "🏥 Entorno Médico",
                instruction: "Consejo médico formal:",
                german: "Trinken Sie viel Wasser!",
                translation: "(¡Beba mucha agua!)",
                tip: "Tip: Petición educada con 'Sie'."
              },
              {
                context: "🏫 En el Aula",
                instruction: "Orden a un grupo (ihr):",
                german: "Macht das Buch auf!",
                translation: "(¡Abrid el libro!)",
                tip: "Tip: El verbo separable 'aufmachen' envía el prefijo 'auf' al final absoluto."
              },
              {
                context: "🚆 En la Estación",
                instruction: "Pide el pasaporte en Acusativo:",
                german: "Zeigen Sie Ihren Pass!",
                translation: "(¡Muestre su pasaporte!)",
                tip: "Tip: 'Pass' es Masculino (der), cambia a 'Ihren Pass'!"
              }
            ]}
            {...props}
          />
        )
      }
    ]
  },

  // =========================================================================
  // BLOQUE IV: CONEXIÓN TEXTUAL Y MODIFICACIÓN DE ELEMENTOS
  // =========================================================================
  {
    id: 'sp_10',
    title: 'Capítulo 10: Das Perfekt y los Tiempos Pasados Clave',
    presentationUrl: 'https://drive.google.com/file/d/1rWmyyVBBceZm2lzbaNY8Luuvv5X6vgfU/view?usp=drive_web',
    slides: [
      {
        title: "Estructura de Dos Pilares (Das Perfekt)",
        subtitle: "El pasado hablado en alemán mediante auxiliar y participio final",
        content: props => (
          <div className="space-y-3">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              El pasado hablado (<em>Das Perfekt</em>) se construye como un rompecabezas mecánico de dos piezas interconectadas:
            </p>
            {/* Componente Modular de Flujo Sintáctico */}
            <SyntaxFlow 
              steps={[
                { badge: "1", name: "📌 Sujeto", description: "El ejecutor de la oración" },
                { badge: "2", name: "⚡ Auxiliar Conjugado (haben / sein)", description: "Verbo auxiliar en Posición 2" },
                { badge: "3", name: "💬 Complementos (Relleno)", description: "Objetos directos, tiempo o lugar" },
                { badge: "4", name: "🔒 Participio II (Partizip II)", description: "Acción pasada congelada al final (ge-...-t / -en)" }
              ]}
              {...props} 
            />
            <div className="space-y-1 text-xs sm:text-sm text-slate-700 pt-1">
              <p><strong>Presente:</strong> Ich kaufe eine Pizza.</p>
              <p><strong>Perfekt:</strong> Ich <strong>habe</strong> eine Pizza <strong>gekauft</strong>.</p>
            </div>
          </div>
        )
      },
      {
        title: "Matriz de Selección: ¿Haben o Sein?",
        subtitle: "El criterio físico para elegir el auxiliar correcto",
        content: `La elección del auxiliar responde a reglas físicas claras:\n\n1. **Usa SEIN (La Flecha de Movimiento):**\nExige *sein* cuando hay **desplazamiento físico de A ➔ B** o **cambio de estado vital**:\n* **Desplazamiento:** *kommen* (gekommen), *gehen* (gegangen), *fahren* (gefahren), *fliegen* (geflogen).\n* **Cambio de estado:** *aufstehen* (aufgestanden), *einschlafen* (eingeschlafen).\n* **Excepciones fijas con sein:** *sein* (gewesen), *bleiben* (geblieben).\n  * *Ejemplo:* *Ich **bin** nach Berlin **geflogen**.*\n\n2. **Usa HABEN (El Ancla Estática - 90% de los verbos):**\nPara verbos transitivos (con Acusativo) y acciones estáticas: *lernen* (gelernt), *essen* (gegessen), *kaufen* (gekauft).\n  * *Ejemplo:* *Wir **haben** Deutsch **gelernt**.*`
      },
      {
        title: "El Pasado de Auxiliares: Präteritum de sein y haben",
        subtitle: "Uso de war y hatte para hablar con fluidez natural en A1",
        content: `Aun cuando el pasaje hablado general es el *Perfekt*, los hablantes nativos en nivel A1 **NUNCA dicen** \`*Ich bin krank gewesen\` o \`*Ich habe Zeit gehabt\`. En su lugar, se usan las formas directas de **Präteritum**:\n\n1. **war (era / estaba - de sein):**\n   * ich **war** | du **warst** | er/sie/es **war** | wir **waren**\n   * *Gestern **war** ich krank.* (Ayer estaba enfermo).\n\n2. **hatte (tenía / había - de haben):**\n   * ich **hatte** | du **hattest** | er/sie/es **hatte** | wir **hatten**\n   * *Ich **hatte** keine Zeit.* (No tenía tiempo).\n\n💡 **Tip Examen Goethe A1:** Usar *war* y *hatte* en la prueba escrita (*Schreiben*) demuestra dominio nativo y ahorra espacio sintáctico.`
      },
      {
        title: "Línea de Tiempo Cinemática: Presente a Pasado",
        subtitle: "Desliza el control para transformar oraciones de presente a Perfekt / Präteritum",
        content: props => (
          <MechanicalTimeline mode="perfekt_and_praeteritum" {...props}/>
        )
      }
    ]
  },
  {
    id: 'sp_11',
    title: 'Capítulo 11: Coordinación de Textos: Conectores Posición 0 y 1',
    presentationUrl: 'https://drive.google.com/file/d/1ja2uZyZv5RMsli1g6RVJAleFgRD4YVnG/view?usp=drive_web',
    slides: [
      // SLIDE 1: ADUSO + REGLA DE PUNTUACIÓN + ABER VS SONDERN
      {
        title: "Zona Libre: Conectores Fantasma Posición 0 (ADUSO)",
        subtitle: "Conecta oraciones sin alterar la regla V2 y domina la puntuación obligatoria",
        content: props => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Los conectores coordinantes de <strong>Posición 0 (ADUSO)</strong> unen dos oraciones independientes. Actúan como "fantasmas sintácticos": no cuentan como posición y preservan la estructura intacta en la segunda oración:
            </p>

            {/* Grilla ADUSO */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-xs text-center">
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Aber</strong>
                <span className="text-[10px] text-slate-500 font-sans">Pero</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Denn</strong>
                <span className="text-[10px] text-slate-500 font-sans">Porque</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Und</strong>
                <span className="text-[10px] text-slate-500 font-sans">Y</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Sondern</strong>
                <span className="text-[10px] text-slate-500 font-sans">Sino</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg col-span-2 sm:col-span-1">
                <strong className="text-indigo-900 block font-bold text-sm">Oder</strong>
                <span className="text-[10px] text-slate-500 font-sans">O</span>
              </div>
            </div>

            {/* Fórmula Sintáctica */}
            <div className="p-2.5 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs text-center border border-slate-800 shadow-inner">
              <code>[Conector Pos 0] + [Sujeto Pos 1] + [VERBO CONJUGADO Pos 2] + [Complementos]</code>
            </div>

            {/* Comparativa Aber vs Sondern */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 text-xs block">🔍 La Diferencia Crucial: Aber vs. Sondern</span>
              <p className="text-slate-600">
                • <strong>Aber (Pero):</strong> Añade una limitación o contraste sin contradecir la negación: <em>"Ich habe Zeit, aber ich bin müde."</em><br />
                • <strong>Sondern (Sino):</strong> Exige una <strong>negación previa (nicht/kein)</strong> y rectifica la idea: <em>"Ich trinke keinen Tee, <strong>sondern</strong> Kaffee."</em>
              </p>
            </div>

            {/* Alerta Roja de Puntuación */}
            <div className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl text-xs space-y-1">
              <span className="font-bold text-rose-950 block">⚠️ Regla de Oro de Puntuación (Penalización Directa Goethe-Schreiben):</span>
              <p className="text-rose-900 leading-relaxed">
                Los conectores <strong>aber</strong>, <strong>denn</strong> y <strong>sondern</strong> exigen <strong>OBLIGATORIAMENTE UNA COMA ANTES</strong> de su escritura. Omitirla resta puntos directos en la redacción de la prueba:<br />
                • <em>Ich möchte kommen<strong>, aber</strong> ich habe keine Zeit.</em><br />
                • <em>Ich bleibe zu Hause<strong>, denn</strong> ich bin krank.</em>
              </p>
            </div>
          </div>
        )
      },

      // SLIDE 2: CONECTORES POSICIÓN 1 + INVERSIÓN + COMPARATIVA
      {
        title: "Conectores Adverbiales de Posición 1 (dann, deshalb)",
        subtitle: "Conectores que ocupan espacio sintáctico y fuerzan la inversión verbal",
        content: props => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              A diferencia de ADUSO, conectores como <strong>dann</strong> (luego/después) y <strong>deshalb</strong> (por eso/por lo tanto) son adverbios. Ocupan físicamente la <strong>Posición 1</strong> de la segunda oración y <strong>FUERZAN INVERSIÓN VERBAL</strong> (el verbo salta a la Posición 2 antes del sujeto):
            </p>

            {/* Fórmula de Inversión */}
            <div className="p-2.5 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs text-center border border-slate-800 shadow-inner">
              <code>[Conector Pos 1] + [VERBO CONJUGADO Pos 2] + [Sujeto Pos 3] + [Complementos]</code>
            </div>

            {/* Detalle de Conectores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5 text-xs">
                <span className="font-bold text-amber-950 block text-sm">dann (luego / después)</span>
                <p className="text-amber-900/80">Secuencia temporal de acciones consecuentes:</p>
                <div className="p-2 bg-white rounded border border-amber-200 font-mono text-slate-800">
                  Ich esse, <strong className="text-amber-800">dann</strong> <strong className="text-indigo-700">gehe</strong> ich schlafen.
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5 text-xs">
                <span className="font-bold text-amber-950 block text-sm">deshalb (por eso / consecuencia)</span>
                <p className="text-amber-900/80">Causa ➔ Consecuencia directa:</p>
                <div className="p-2 bg-white rounded border border-amber-200 font-mono text-slate-800">
                  Ich bin krank, <strong className="text-amber-800">deshalb</strong> <strong className="text-indigo-700">bleibe</strong> ich zu Hause.
                </div>
              </div>
            </div>

            {/* Cuadro Comparativo Posición 0 vs Posición 1 */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-xs">📊 Matriz Comparativa Directa de Posiciones:</span>
              <div className="space-y-1.5 font-mono">
                <div className="p-2 bg-white rounded border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-500 font-sans text-[11px]">Con ADUSO (Pos 0):</span>
                  <span className="text-slate-800">...denn ich <strong className="text-indigo-700">bin</strong> krank.</span>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-500 font-sans text-[11px]">Con Adverbio (Pos 1):</span>
                  <span className="text-slate-800">...deshalb <strong className="text-indigo-700">bin</strong> ich krank.</span>
                </div>
              </div>
            </div>
          </div>
        )
      },

      // SLIDE 3: KIT DE REDACCIÓN OFICIAL Y EMAIL TEMPLATE
      {
        title: "Kit de Redacción A1 para el Examen Goethe (Schreiben)",
        subtitle: "Estructura oficial para redactar correos, invitaciones y excusas breves",
        content: props => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              En la prueba escrita (<em>Schreiben Teil 2</em>), debes redactar una nota o correo breve (aprox. 30 palabras) cubriendo los 3 puntos solicitados. Sigue esta plantilla oficial:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              {/* 1. Saludo */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs border-b pb-1 border-slate-200">1. Encabezado y Saludo</span>
                <p className="text-slate-600"><strong>Informal:</strong></p>
                <p className="font-mono text-indigo-700">Liebe Maria, / Lieber Markus,</p>
                <p className="text-slate-600 pt-1"><strong>Formal:</strong></p>
                <p className="font-mono text-indigo-700">Sehr geehrte Frau Müller, / Sehr geehrter Herr Schneider,</p>
              </div>

              {/* 2. Cuerpo */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs border-b pb-1 border-slate-200">2. Cuerpo del Texto</span>
                <p className="text-slate-600 leading-relaxed">
                  Responde los 3 puntos del examen combinando frases simples con conectores (<em>denn, aber, deshalb</em>):
                </p>
                <p className="font-mono text-slate-800 bg-white p-1.5 rounded border border-slate-200 text-[11px]">
                  Ich kann am Samstag nicht kommen, <strong>denn</strong> ich muss arbeiten.
                </p>
              </div>

              {/* 3. Despedida */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs border-b pb-1 border-slate-200">3. Despedida Oficial</span>
                <p className="text-slate-600"><strong>Informal:</strong></p>
                <p className="font-mono text-indigo-700">Viele Grüße / Liebe Grüße,</p>
                <p className="text-slate-600 pt-1"><strong>Formal:</strong></p>
                <p className="font-mono text-indigo-700">Mit freundlichen Grüßen,</p>
              </div>
            </div>

            {/* Alerta de Trampa de Redacción */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
              <span className="font-bold block">🚨 Trampa de Examen en el Saludo:</span>
              <p className="leading-relaxed">
                Después del saludo (ej: <em>Liebe Maria,</em>) siempre va una <strong>COMA</strong>, y la primera palabra del cuerpo de la carta debe empezar <strong>OBLIGATORIAMENTE EN MINÚSCULA</strong> (salvo que sea un sustantivo):<br />
                • Correcto: <em>Liebe Maria,<br /><strong>i</strong>ch danke dir für die Einladung...</em>
              </p>
            </div>
          </div>
        )
      },

      // SLIDE 4: RETO INTERACTIVO
      {
        title: "Reto Interactivo: Constructor de Oraciones Compuestas",
        subtitle: "Ensambla bloques con conectores de Posición 0 y Posición 1",
        content: props => (
          <DraggableSentenceBuilder 
            mode="advanced_connectors"
            pool={[
              { id: 1, words: ["Ich lerne Deutsch", "und", "ich", "verstehe", "alles"], correctOrder: ["Ich lerne Deutsch", "und", "ich", "verstehe", "alles"] },
              { id: 2, words: ["Er ist müde", "deshalb", "geht", "er", "ins Bett"], correctOrder: ["Er ist müde", "deshalb", "geht", "er", "ins Bett"] }
            ]}
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_12',
    title: 'Capítulo 12: Declinación de Adjetivos en A1 (Débil y Mixta)',
    presentationUrl: 'https://drive.google.com/file/d/1uXg-DLwnQLSTdsSFbT8yPmHpTBWM2miu/view?usp=drive_web1',
    slides: [
      // SLIDE 1: DECLINACIÓN DÉBIL (SCHWACHE DEKLINATION)
      {
        title: "Declinación Débil (Tras Artículo Determinado: der / die / das)",
        subtitle: "Principio de Redundancia: Cuando el artículo ya muestra el género con claridad",
        content: props => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Cuando el sustantivo lleva un artículo determinado (<strong>der, die, das</strong>), este artículo ya 'enseña la bandera' del género y caso. Por tanto, el adjetivo no necesita esforzarse y adopta una terminación 'débil' súper sencilla dividida en 2 clubes:
            </p>

            {/* Comparativa El Club de la -E vs El Club de la -EN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* El Club de la -E */}
              <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-indigo-950 text-sm">1. El Club de la -e</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800">Singular Base</span>
                </div>
                <p className="text-indigo-900/80 text-[11px]">Se usa en <strong>Nominativo Singular</strong> (todos) y <strong>Acusativo Femenino/Neutro</strong>:</p>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="p-1.5 bg-white rounded border border-indigo-100 flex justify-between">
                    <span>🔵 Masc Nom:</span>
                    <strong className="text-indigo-700">der gut-e Mann</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-indigo-100 flex justify-between">
                    <span>🔴 Fem Nom/Akk:</span>
                    <strong className="text-indigo-700">die schön-e Frau</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-indigo-100 flex justify-between">
                    <span>🟢 Neut Nom/Akk:</span>
                    <strong className="text-indigo-700">das klein-e Kind</strong>
                  </div>
                </div>
              </div>

              {/* El Club de la -EN */}
              <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-rose-950 text-sm">2. El Club de la -en</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">Akk Masc + Plural</span>
                </div>
                <p className="text-rose-900/80 text-[11px]">Se activa en <strong>Acusativo Masculino</strong>, en <strong>Dativo</strong> y en <strong>TODOS los Plurales</strong>:</p>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="p-1.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span>🔵 Masc Akk:</span>
                    <strong className="text-rose-700">den gut-en Mann</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span>🟣 Plural (Todos):</span>
                    <strong className="text-rose-700">die alt-en Bücher</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span>📍 Dativo (Todos):</span>
                    <strong className="text-rose-700">mit dem alt-en Mann</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950">
              💡 <strong>Regla Mnemotécnica:</strong> Si hay un cambio de artículo (ej. <em>der ➔ den</em> o en Dativo <em>dem/der</em>) o es plural, ¡el adjetivo siempre termina en <strong>-en</strong>!
            </div>
          </div>
        )
      },

      // SLIDE 2: DECLINACIÓN MIXTA (GEMISCHTE DEKLINATION)
      {
        title: "Declinación Mixta (Tras ein / kein / Posesivos: mein, dein...)",
        subtitle: "La Bandera de Rescate (Signalendung): Cuando el adjetivo debe revelar el género",
        content: props => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Las palabras <strong>ein</strong> (masculino) y <strong>ein</strong> (neutro) son idénticas en Nominativo. Al no revelar el género, el adjetivo está obligado a <strong>rescatar la bandera cromática</strong> del artículo determinado (<em>der, die, das</em>):
            </p>

            {/* Grilla de Rescate de Banderas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              {/* Masculino */}
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
                <div className="flex justify-between items-center font-sans mb-1">
                  <span className="font-bold text-blue-900">🔵 Masculino (Rescata -er de 'der')</span>
                </div>
                <div className="p-2 bg-white rounded border border-blue-100 text-slate-800 flex justify-between">
                  <span>ein gut<strong className="text-blue-700 underline decoration-2">-er</strong> Mann</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Nominativo)</span>
                </div>
                <div className="p-2 bg-white rounded border border-blue-100 text-slate-800 flex justify-between">
                  <span>einen alt<strong className="text-rose-600 underline decoration-2">-en</strong> Käse</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Acusativo)</span>
                </div>
              </div>

              {/* Neutro */}
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex justify-between items-center font-sans mb-1">
                  <span className="font-bold text-emerald-900">🟢 Neutro (Rescata -es de 'das')</span>
                </div>
                <div className="p-2 bg-white rounded border border-emerald-100 text-slate-800 flex justify-between">
                  <span>ein kalt<strong className="text-emerald-700 underline decoration-2">-es</strong> Bier</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Nom/Akk)</span>
                </div>
                <div className="p-2 bg-white rounded border border-emerald-100 text-slate-800 flex justify-between">
                  <span>mein neues<strong className="text-emerald-700 underline decoration-2">-es</strong> Auto</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Posesivo)</span>
                </div>
              </div>

              {/* Femenino */}
              <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1">
                <div className="flex justify-between items-center font-sans mb-1">
                  <span className="font-bold text-rose-900">🔴 Femenino (Rescata -e de 'die')</span>
                </div>
                <div className="p-2 bg-white rounded border border-rose-100 text-slate-800 flex justify-between">
                  <span>eine schön<strong className="text-rose-700 underline decoration-2">-e</strong> Frau</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Nom/Akk)</span>
                </div>
              </div>

              {/* Plural (keine / meine) */}
              <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl space-y-1">
                <div className="flex justify-between items-center font-sans mb-1">
                  <span className="font-bold text-purple-900">🟣 Plural (Siempre -en)</span>
                </div>
                <div className="p-2 bg-white rounded border border-purple-100 text-slate-800 flex justify-between">
                  <span>meine alt<strong className="text-purple-700 underline decoration-2">-en</strong> Bücher</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Plural)</span>
                </div>
              </div>
            </div>
          </div>
        )
      },

      // SLIDE 3: ATAJOS Y LA TRAMPA PREDICATIVA
      {
        title: "Atajos de Examen Goethe A1 y La Trampa Predicativa",
        subtitle: "Cuándo el adjetivo NO se declina y la regla de aceleración de respuesta",
        content: props => (
          <div className="space-y-3.5 my-2">
            {/* Trampa #1: Adjetivo Predicativo */}
            <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-950 text-sm">🚨 TRAMPA #1 DEL GOETHE: Adjetivo Predicativo (SIN DECLINACIÓN)</span>
                <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded-full">Atención</span>
              </div>
              <p className="text-rose-900 leading-relaxed">
                Si el adjetivo va <strong>DETRÁS del verbo</strong> (especialmente con <em>sein, werden, bleiben</em>) y NO acompaña directamente a un sustantivo, <strong>¡NO SE DECLINA NUNCA!</strong>
              </p>
              <div className="space-y-1 font-mono pt-1">
                <div className="p-2 bg-white rounded border border-rose-200 flex justify-between text-slate-800">
                  <span>• Das Auto ist <strong className="text-rose-600">neu</strong>.</span>
                  <span className="text-slate-400 font-sans text-[11px]">(Detrás del verbo ➔ SIN terminación)</span>
                </div>
                <div className="p-2 bg-white rounded border border-rose-200 flex justify-between text-slate-800">
                  <span>• Das <strong className="text-indigo-700">neue</strong> Auto ist teuer.</span>
                  <span className="text-slate-400 font-sans text-[11px]">(Delante del sustantivo ➔ Se declina)</span>
                </div>
              </div>
            </div>

            {/* Atajo #2: El Algoritmo Rápido -EN */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-xs">⚡ Algoritmo de Respuesta Rápida para Preguntas Múltiples:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                <div className="p-2 bg-white rounded border border-slate-200 text-center">
                  <span className="text-slate-500 font-sans block text-[10px]">¿Es Plural?</span>
                  <strong className="text-indigo-700 text-xs">Terminación -EN</strong>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 text-center">
                  <span className="text-slate-500 font-sans block text-[10px]">¿Acusativo Masc (den/einen)?</span>
                  <strong className="text-indigo-700 text-xs">Terminación -EN</strong>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 text-center">
                  <span className="text-slate-500 font-sans block text-[10px]">¿Dativo (dem/der/den)?</span>
                  <strong className="text-indigo-700 text-xs">Terminación -EN</strong>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Evaluador en Vivo: Declinación de Adjetivos",
        subtitle: "Completa la terminación correcta del adjetivo y recibe feedback instantáneo",
        content: props => (
          <LiveEvaluator 
            mode="adjective_declension"
            {...props} 
          />
        )
      }
    ]
  }
];