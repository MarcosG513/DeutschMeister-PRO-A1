import React, { lazy } from 'react';
import { Activity, BookOpen, Bot, Briefcase, Car, Clock, Coffee, Edit as Edit3, Headphones, Heart, Home, Link2, List, Mail, Mic, PlayCircle, Search, ShoppingCart, Star as Sparkles, Volume2, Laptop, Zap } from 'lucide-react';
import GrammarAccordion from '../components/GrammarAccordion';
import AudioSim from '../components/AudioSim';
const InteractiveQA = lazy(() => import('../components/InteractiveQA'));
const EmailSimulator = lazy(() => import('../components/EmailSimulator'));
import PresentationVocabCard from '../components/PresentationVocabCard';
import DraggableSentenceBuilder from '../components/DraggableSentenceBuilder';
import AccusativeShield from '../components/AccusativeShield';
import MechanicalTimeline from '../components/MechanicalTimeline';
import PincerSwitch from '../components/PincerSwitch';
import LiveEvaluator from '../components/LiveEvaluator';
import LocativeMapSimulator from '../components/LocativeMapSimulator';
import AcousticRadar from '../components/AcousticRadar';
import TextHighlighter from '../components/TextHighlighter';
import FormularBuilder from '../components/FormularBuilder';
import VoiceExaminer from '../components/VoiceExaminer';
import { nativeSpeak } from '../utils/helpers';
export
// --- DATA: EL VOCABULARIO COMPLETO ---
const chapters = [
{
  id: 0,
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
    exampleSentenceEs: "La letra A es grande."
  }, {
    de: "B, b",
    pron: "be",
    es: "B",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Brot' beginnt mit B.",
    exampleSentenceEs: "La palabra 'pan' comienza con B."
  }, {
    de: "C, c",
    pron: "tse",
    es: "C",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe C ist groß.",
    exampleSentenceEs: "La letra C es grande."
  }, {
    de: "D, d",
    pron: "de",
    es: "D",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe D.",
    exampleSentenceEs: "Esa es la letra D."
  }, {
    de: "E, e",
    pron: "e",
    es: "E",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Ich schreibe das Wort mit 'E'.",
    exampleSentenceEs: "Yo escribo la palabra con 'E'."
  }, {
    de: "F, f",
    pron: "ef",
    es: "F",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das 'F' in 'Familie' ist groß.",
    exampleSentenceEs: "La 'F' en 'Familie' es mayúscula."
  }, {
    de: "G, g",
    pron: "gue",
    es: "G",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe G ist im Wort 'Gitarre'.",
    exampleSentenceEs: "La letra G está en la palabra 'guitarra'."
  }, {
    de: "H, h",
    pron: "ja",
    es: "H",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Mein Name hat ein H.",
    exampleSentenceEs: "Mi nombre tiene una H."
  }, {
    de: "I, i",
    pron: "i",
    es: "I",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das 'I' ist ein Buchstabe.",
    exampleSentenceEs: "La 'I' es una letra."
  }, {
    de: "J, j",
    pron: "yot",
    es: "J",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe J ist im Wort 'Ja'.",
    exampleSentenceEs: "La letra J está en la palabra 'Ja' (sí)."
  }, {
    de: "K, k",
    pron: "ka",
    es: "K",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Ich schreibe das Wort 'Katze' mit K.",
    exampleSentenceEs: "Escribo la palabra 'Katze' con K."
  }, {
    de: "L, l",
    pron: "el",
    es: "L",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Land' beginnt mit 'L'.",
    exampleSentenceEs: "La palabra 'Land' comienza con 'L'."
  }, {
    de: "M, m",
    pron: "em",
    es: "M",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das M ist ein Buchstabe.",
    exampleSentenceEs: "La M es una letra."
  }, {
    de: "N, n",
    pron: "en",
    es: "N",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Name beginnt mit N.",
    exampleSentenceEs: "El nombre comienza con N."
  }, {
    de: "O, o",
    pron: "o",
    es: "O",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das O ist groß.",
    exampleSentenceEs: "La O es grande."
  }, {
    de: "P, p",
    pron: "pe",
    es: "P",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Post' beginnt mit P.",
    exampleSentenceEs: "La palabra 'Post' comienza con P."
  }, {
    de: "Q, q",
    pron: "ku",
    es: "Q",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das Q ist ein Buchstabe im Alphabet.",
    exampleSentenceEs: "La Q es una letra del abecedario."
  }, {
    de: "R, r",
    pron: "er",
    es: "R",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe R ist schwer.",
    exampleSentenceEs: "La letra R es difícil."
  }, {
    de: "S, s",
    pron: "es",
    es: "S",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe 'S' ist in meinem Namen.",
    exampleSentenceEs: "La letra 'S' está en mi nombre."
  }, {
    de: "T, t",
    pron: "te",
    es: "T",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe T.",
    exampleSentenceEs: "Esta es la letra T."
  }, {
    de: "U, u",
    pron: "u",
    es: "U",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das 'U' ist ein Vokal.",
    exampleSentenceEs: "La 'U' es una vocal."
  }, {
    de: "V, v",
    pron: "fau",
    es: "V",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe V.",
    exampleSentenceEs: "Esta es la letra V."
  }, {
    de: "W, w",
    pron: "ve",
    es: "W",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe W.",
    exampleSentenceEs: "Esta es la letra W."
  }, {
    de: "X, x",
    pron: "iks",
    es: "X",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe X.",
    exampleSentenceEs: "Esta es la letra X."
  }, {
    de: "Y, y",
    pron: "úp-si-lon",
    es: "Y",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Ich bin Thomas und das ist Anna.",
    exampleSentenceEs: "Yo soy Thomas y esta es Anna."
  }, {
    de: "Z, z",
    pron: "tset",
    es: "Z",
    type: "Letra",
    category: "Alphabet",
    exampleSentenceDe: "Das ist der Buchstabe Z.",
    exampleSentenceEs: "Esta es la letra Z."
  }, {
    de: "Ä, ä",
    pron: "e abierta",
    es: "A con diéresis",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Das Wort 'Äpfel' hat ein Ä.",
    exampleSentenceEs: "La palabra 'Äpfel' tiene una A con diéresis."
  }, {
    de: "Ö, ö",
    pron: "e con labios de o",
    es: "O con diéresis",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Der Buchstabe Ö ist in meinem Namen.",
    exampleSentenceEs: "La letra Ö está en mi nombre."
  }, {
    de: "Ü, ü",
    pron: "i con labios de u",
    es: "U con diéresis",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Die Übung ist sehr einfach.",
    exampleSentenceEs: "El ejercicio es muy fácil."
  }, {
    de: "ß",
    pron: "es-tset",
    es: "S fuerte",
    type: "Especial",
    category: "Alphabet",
    exampleSentenceDe: "Der Tee ist heiß.",
    exampleSentenceEs: "El té está caliente."
  }, {
    de: "null",
    pron: "nul",
    es: "cero (0)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe null Euro.",
    exampleSentenceEs: "Tengo cero euros.",
    regimen: "Cardinal, sin ordinal"
  }, {
    de: "eins",
    pron: "áins",
    es: "uno (1)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe eins.",
    exampleSentenceEs: "Tengo uno.",
    regimen: "Ordinal: erste"
  }, {
    de: "zwei",
    pron: "tsvái",
    es: "dos (2)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe zwei Katzen.",
    exampleSentenceEs: "Tengo dos gatos.",
    regimen: "Ordinal: zweite"
  }, {
    de: "drei",
    pron: "drái",
    es: "tres (3)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe drei Äpfel.",
    exampleSentenceEs: "Tengo tres manzanas.",
    regimen: "Ordinal: dritte"
  }, {
    de: "vier",
    pron: "fí-a",
    es: "cuatro (4)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe vier Äpfel.",
    exampleSentenceEs: "Tengo cuatro manzanas.",
    regimen: "Ordinal: vierte"
  }, {
    de: "fünf",
    pron: "funf",
    es: "cinco (5)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Das Brot kostet fünf Euro.",
    exampleSentenceEs: "El pan cuesta cinco euros.",
    regimen: "Ordinal: fünfte"
  }, {
    de: "sechs",
    pron: "zeks",
    es: "seis (6)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Das Ticket kostet sechs Euro.",
    exampleSentenceEs: "El billete cuesta seis euros.",
    regimen: "Ordinal: sechste"
  }, {
    de: "sieben",
    pron: "sí-ben",
    es: "siete (7)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe sieben Äpfel.",
    exampleSentenceEs: "Tengo siete manzanas.",
    regimen: "Ordinal: siebte"
  }, {
    de: "acht",
    pron: "ajt",
    es: "ocho (8)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe acht Euro.",
    exampleSentenceEs: "Tengo ocho euros.",
    regimen: "Ordinal: achte"
  }, {
    de: "neun",
    pron: "nóin",
    es: "nueve (9)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe neun Äpfel.",
    exampleSentenceEs: "Tengo nueve manzanas.",
    regimen: "Ordinal: neunte"
  }, {
    de: "zehn",
    pron: "tsén",
    es: "diez (10)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe zehn Finger.",
    exampleSentenceEs: "Tengo diez dedos.",
    regimen: "Ordinal: zehnte"
  }, {
    de: "elf",
    pron: "élf",
    es: "once (11)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin elf Jahre alt.",
    exampleSentenceEs: "Tengo once años.",
    regimen: "Ordinal: elfte"
  }, {
    de: "zwölf",
    pron: "tsuolf",
    es: "doce (12)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe zwölf Euro.",
    exampleSentenceEs: "Tengo doce euros.",
    regimen: "Ordinal: zwölfte"
  }, {
    de: "dreizehn",
    pron: "drái-tsen",
    es: "trece (13)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe dreizehn Euro.",
    exampleSentenceEs: "Tengo trece euros.",
    regimen: "Ordinal: dreizehnte"
  }, {
    de: "sechzehn",
    pron: "zéj-tsen",
    es: "dieciséis (16)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin sechzehn Jahre alt.",
    exampleSentenceEs: "Tengo dieciséis años.",
    regimen: "Ordinal: sechzehnte"
  }, {
    de: "siebzehn",
    pron: "síp-tsen",
    es: "diecisiete (17)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin siebzehn Jahre alt.",
    exampleSentenceEs: "Tengo diecisiete años.",
    regimen: "Ordinal: siebzehnte"
  }, {
    de: "zwanzig",
    pron: "tsván-tsij",
    es: "veinte (20)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin zwanzig Jahre alt.",
    exampleSentenceEs: "Tengo veinte años.",
    regimen: "Ordinal: zwanzigste"
  }, {
    de: "einundzwanzig",
    pron: "ain-unt-tsván-tsij",
    es: "veintiuno (21)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin einundzwanzig Jahre alt.",
    exampleSentenceEs: "Tengo veintiuno años.",
    regimen: "Ordinal: einundzwanzigste"
  }, {
    de: "dreißig",
    pron: "drái-sij",
    es: "treinta (30)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin dreißig Jahre alt.",
    exampleSentenceEs: "Tengo treinta años.",
    regimen: "Ordinal: dreißigste"
  }, {
    de: "vierzig",
    pron: "fía-tsij",
    es: "cuarenta (40)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich bin vierzig Jahre alt.",
    exampleSentenceEs: "Tengo cuarenta años.",
    regimen: "Ordinal: vierzigste"
  }, {
    de: "hundert",
    pron: "hún-deat",
    es: "cien (100)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe hundert Euro.",
    exampleSentenceEs: "Tengo cien euros.",
    regimen: "Ordinal: hundertste"
  }, {
    de: "tausend",
    pron: "táu-sent",
    es: "mil (1000)",
    type: "Número",
    category: "Zahlen",
    exampleSentenceDe: "Ich habe tausend Euro.",
    exampleSentenceEs: "Tengo mil euros.",
    regimen: "Ordinal: tausendste"
  }, {
    de: "der erste",
    pron: "dea érs-te",
    es: "primero (1.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Ich bin der erste.",
    exampleSentenceEs: "Yo soy el primero.",
    regimen: "Declina como adj."
  }, {
    de: "der zweite",
    pron: "dea tsvái-te",
    es: "segundo (2.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Das ist der zweite Stock.",
    exampleSentenceEs: "Este es el segundo piso.",
    regimen: "Declina como adj."
  }, {
    de: "der dritte",
    pron: "dea drí-te",
    es: "tercero (3.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Ich wohne in der dritten Straße.",
    exampleSentenceEs: "Yo vivo en la tercera calle.",
    regimen: "Declina como adj."
  }, {
    de: "der vierte",
    pron: "dea fí-a-te",
    es: "cuarto (4.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Ich wohne in der vierten Etage.",
    exampleSentenceEs: "Yo vivo en el cuarto piso.",
    regimen: "Declina como adjetivo"
  }, {
    de: "der fünfte",
    pron: "dea fúnf-te",
    es: "quinto (5.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der fünfte Mai.",
    exampleSentenceEs: "Hoy es el quinto de mayo.",
    regimen: "Declina como adj."
  }, {
    de: "der sechste",
    pron: "dea zéks-te",
    es: "sexto (6.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der sechste Mai.",
    exampleSentenceEs: "Hoy es el sexto de mayo.",
    regimen: "Declina como adj."
  }, {
    de: "der siebte",
    pron: "dea zíp-te",
    es: "séptimo (7.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Sonntag ist der siebte Tag.",
    exampleSentenceEs: "El domingo es el séptimo día.",
    regimen: "Declina como adj."
  }, {
    de: "der achte",
    pron: "dea áj-te",
    es: "octavo (8.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Das ist die achte Stunde.",
    exampleSentenceEs: "Esta es la octava hora.",
    regimen: "Declina como adj."
  }, {
    de: "der neunte",
    pron: "dea nóin-te",
    es: "noveno (9.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der neunte Mai.",
    exampleSentenceEs: "Hoy es el noveno de mayo.",
    regimen: "Declina como adjetivo"
  }, {
    de: "der zehnte",
    pron: "dea tsén-te",
    es: "décimo (10.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Der zehnte Tag ist heute.",
    exampleSentenceEs: "El décimo día es hoy.",
    regimen: "Declina como adjetivo"
  }, {
    de: "der zwanzigste",
    pron: "dea tsván-tsiks-te",
    es: "vigésimo (20.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der zwanzigste Tag im Monat.",
    exampleSentenceEs: "Hoy es el vigésimo día del mes.",
    regimen: "Declina como adj."
  }, {
    de: "der einundzwanzigste",
    pron: "dea ái-nunt-tsván-tsigs-te",
    es: "vigésimo primero (21.)",
    type: "Ordinal",
    category: "Ordnungszahlen",
    exampleSentenceDe: "Heute ist der einundzwanzigste Januar.",
    exampleSentenceEs: "Hoy es el veintiuno de enero.",
    regimen: "Declina como adj."
  }, {
    de: "die Hälfte",
    pron: "di jélf-te",
    es: "la mitad",
    type: "Sustantivo",
    category: "Zahlen",
    exampleSentenceDe: "Ich nehme die Hälfte von dem Kuchen.",
    exampleSentenceEs: "Yo tomo la mitad del pastel.",
    plural: "die Hälften"
  }, {
    de: "das Viertel",
    pron: "das fía-tel",
    es: "el cuarto (1/4)",
    type: "Sustantivo",
    category: "Zahlen",
    exampleSentenceDe: "Das ist ein Viertel von dem Kuchen.",
    exampleSentenceEs: "Este es un cuarto del pastel.",
    plural: "die Viertel"
  }, {
    de: "plus / minus",
    pron: "plus  mí-nus",
    es: "más / menos",
    type: "Adverbio",
    category: "Zahlen",
    exampleSentenceDe: "Fünf plus fünf ist zehn.",
    exampleSentenceEs: "Cinco más cinco son diez.",
    regimen: "Operaciones matemáticas"
  }, {
    de: "mal / durch",
    pron: "mal  durch",
    es: "por / dividido entre",
    type: "Adverbio",
    category: "Zahlen",
    exampleSentenceDe: "Wir gehen durch den Park.",
    exampleSentenceEs: "Vamos por el parque.",
    regimen: "Operaciones matemáticas"
  }, {
    de: "das Prozent",
    pron: "das pro-tsént",
    es: "el por ciento (%)",
    type: "Sustantivo",
    category: "Zahlen",
    exampleSentenceDe: "Das Prozent ist nicht hoch.",
    exampleSentenceEs: "El por ciento no es alto.",
    plural: "die Prozent"
  }]
},
{
  id: 1,
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
    plural: "die Wochen"
  }, {
    de: "Montag",
    pron: "món-tak",
    es: "lunes",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Montag habe ich Deutsch.",
    exampleSentenceEs: "El lunes tengo alemán.",
    plural: "die Montage"
  }, {
    de: "Dienstag",
    pron: "díns-tak",
    es: "martes",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Dienstag trinke ich Kaffee.",
    exampleSentenceEs: "El martes bebo café.",
    plural: "die Dienstage"
  }, {
    de: "Mittwoch",
    pron: "mít-voj",
    es: "miércoles",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Mittwoch ist ein Treffen.",
    exampleSentenceEs: "El miércoles hay una reunión.",
    plural: "die Mittwoche"
  }, {
    de: "Donnerstag",
    pron: "dó-ners-tak",
    es: "jueves",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Donnerstag trinke ich Kaffee.",
    exampleSentenceEs: "El jueves bebo café.",
    plural: "die Donnerstage"
  }, {
    de: "Freitag",
    pron: "frái-tak",
    es: "viernes",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Freitag ist meine Party.",
    exampleSentenceEs: "El viernes es mi fiesta.",
    plural: "die Freitage"
  }, {
    de: "Samstag",
    pron: "sáms-tak",
    es: "sábado",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Am Samstag trinke ich Kaffee.",
    exampleSentenceEs: "El sábado bebo café.",
    plural: "die Samstage"
  }, {
    de: "Sonntag",
    pron: "són-tak",
    es: "domingo",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Der Sonntag ist ein Tag.",
    exampleSentenceEs: "El domingo es un día.",
    plural: "die Sonntage"
  }, {
    de: "am + Tag",
    pron: "am ták",
    es: "en el + día",
    type: "Preposición",
    category: "Tage",
    exampleSentenceDe: "Am Montag habe ich frei.",
    exampleSentenceEs: "El lunes tengo libre.",
    regimen: "+ Dativo"
  }, {
    de: "das Wochenende",
    pron: "das vó-jen-én-de",
    es: "el fin de semana",
    type: "Sustantivo (Neutro)",
    category: "Tage",
    exampleSentenceDe: "Das Wochenende ist am Samstag und am Sonntag.",
    exampleSentenceEs: "El fin de semana es el sábado y el domingo.",
    plural: "die Wochenenden"
  }, {
    de: "am Wochenende",
    pron: "am vó-jen-en-de",
    es: "el fin de semana (en el)",
    type: "Frase",
    category: "Tage",
    exampleSentenceDe: "Am Wochenende treffe ich Freunde.",
    exampleSentenceEs: "El fin de semana me encuentro con amigos.",
    regimen: "am + dativo, fijo"
  }, {
    de: "der Feiertag",
    pron: "dea fái-a-tak",
    es: "el día festivo",
    type: "Sustantivo (Masc)",
    category: "Tage",
    exampleSentenceDe: "Heute ist ein Feiertag.",
    exampleSentenceEs: "Hoy es un día festivo.",
    plural: "die Feiertage"
  }, {
    de: "das Jahr",
    pron: "das yá-a",
    es: "el año",
    type: "Sustantivo (Neutro)",
    category: "Monate",
    exampleSentenceDe: "Das Jahr ist neu.",
    exampleSentenceEs: "El año es nuevo.",
    plural: "die Jahre"
  }, {
    de: "der Monat",
    pron: "dea mó-nat",
    es: "el mes",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Dieser Monat ist lang.",
    exampleSentenceEs: "Este mes es largo.",
    plural: "die Monate"
  }, {
    de: "Januar",
    pron: "yá-nu-a-a",
    es: "enero",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Januar ist der erste Monat.",
    exampleSentenceEs: "Enero es el primer mes.",
    plural: "die Januare"
  }, {
    de: "Februar",
    pron: "fé-bru-a",
    es: "febrero",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Februar ist ein Monat.",
    exampleSentenceEs: "Febrero es un mes.",
    plural: "die Februare"
  }, {
    de: "März",
    pron: "merts",
    es: "marzo",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der dritte Monat ist März.",
    exampleSentenceEs: "El tercer mes es marzo.",
    plural: "die Märze"
  }, {
    de: "April",
    pron: "a-príl",
    es: "abril",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der April ist ein Monat.",
    exampleSentenceEs: "Abril es un mes.",
    plural: "die Aprile"
  }, {
    de: "Mai",
    pron: "mái",
    es: "mayo",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Mai ist ein schöner Monat.",
    exampleSentenceEs: "Mayo es un mes bonito.",
    plural: "die Maie"
  }, {
    de: "Juni",
    pron: "yú-ni",
    es: "junio",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Juni ist ein schöner Monat.",
    exampleSentenceEs: "Junio es un mes bonito.",
    plural: "die Junis"
  }, {
    de: "Juli",
    pron: "yú-li",
    es: "julio",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Juli ist ein schöner Monat.",
    exampleSentenceEs: "Julio es un mes bonito.",
    plural: "die Julis"
  }, {
    de: "August",
    pron: "áu-gust",
    es: "agosto",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Monat August ist der achte Monat.",
    exampleSentenceEs: "El mes de agosto es el octavo mes.",
    plural: "die Auguste"
  }, {
    de: "September",
    pron: "sep-tém-bea",
    es: "septiembre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der September ist ein schöner Monat.",
    exampleSentenceEs: "Septiembre es un mes bonito.",
    plural: "die Septembers"
  }, {
    de: "Oktober",
    pron: "ok-tó-bea",
    es: "octubre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Der Oktober ist ein Monat.",
    exampleSentenceEs: "Octubre es un mes.",
    plural: "die Oktober"
  }, {
    de: "November",
    pron: "no-fém-bea",
    es: "noviembre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Im November ist es kalt.",
    exampleSentenceEs: "En noviembre hace frío.",
    plural: "die November"
  }, {
    de: "Dezember",
    pron: "de-tsém-bea",
    es: "diciembre",
    type: "Sustantivo (Masc)",
    category: "Monate",
    exampleSentenceDe: "Wir haben im Dezember Geburtstag.",
    exampleSentenceEs: "Tenemos cumpleaños en diciembre.",
    plural: "die Dezember"
  }, {
    de: "der Frühling",
    pron: "dea frú-ling",
    es: "la primavera",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Der Frühling ist schön.",
    exampleSentenceEs: "La primavera es bonita.",
    plural: "die Frühlinge"
  }, {
    de: "der Sommer",
    pron: "dea só-mea",
    es: "el verano",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Ich mag den Sommer. Der Sommer ist heiß.",
    exampleSentenceEs: "Me gusta el verano. El verano es caluroso.",
    plural: "die Sommer"
  }, {
    de: "der Herbst",
    pron: "dea jéapst",
    es: "el otoño",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Der Herbst ist schön.",
    exampleSentenceEs: "El otoño es bonito.",
    plural: "die Herbste"
  }, {
    de: "der Winter",
    pron: "dea vín-tea",
    es: "el invierno",
    type: "Sustantivo (Masc)",
    category: "Jahreszeiten",
    exampleSentenceDe: "Der Winter ist kalt.",
    exampleSentenceEs: "El invierno es frío.",
    plural: "die Winter"
  }, {
    de: "der Tag",
    pron: "dea ták",
    es: "el día",
    type: "Sustantivo (Masc)",
    category: "Tageszeiten",
    exampleSentenceDe: "Der Tag ist schön.",
    exampleSentenceEs: "El día es bonito.",
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
    regimen: "Dat. + in/an/bei"
  }, {
    de: "die Uhrzeit",
    pron: "di ú-a-tsait",
    es: "la hora",
    type: "Sustantivo (Fem)",
    category: "Uhrzeit",
    exampleSentenceDe: "Ich habe die Uhrzeit nicht.",
    exampleSentenceEs: "No tengo la hora.",
    plural: "die Uhrzeiten"
  }, {
    de: "Wann?",
    pron: "van",
    es: "¿Cuándo?",
    type: "Pregunta",
    category: "Uhrzeit",
    exampleSentenceDe: "Wann kommst du?",
    exampleSentenceEs: "¿Cuándo vienes?",
    regimen: "Pron. interrogativo tiempo"
  }, {
    de: "Wie spät ist es?",
    pron: "vi shpét ist es",
    es: "¿Qué hora es?",
    type: "Pregunta",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist zehn Uhr.",
    exampleSentenceEs: "Son las diez en punto.",
    regimen: "Fijo"
  }, {
    de: "Wie viel Uhr ist es?",
    pron: "ví fíl ú-a ist es",
    es: "¿Qué hora es? (formal)",
    type: "Pregunta",
    category: "Uhrzeit",
    exampleSentenceDe: "Ich habe eine Frage. Wie viel Uhr ist es?",
    exampleSentenceEs: "Tengo una pregunta. ¿Qué hora es?",
    regimen: "Fijo, hora"
  }, {
    de: "ein Uhr",
    pron: "áin ú-a",
    es: "la una",
    type: "Hora",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist ein Uhr.",
    exampleSentenceEs: "Es la una en punto.",
    regimen: "Es ist ein Uhr"
  }, {
    de: "halb zwei",
    pron: "jalp-tsvái",
    es: "la una y media",
    type: "Hora",
    category: "Uhrzeit",
    exampleSentenceDe: "Der Zug fährt um halb zwei.",
    exampleSentenceEs: "El tren sale a la una y media.",
    regimen: "Media hora antes"
  }, {
    de: "Viertel vor drei",
    pron: "fía-tel foa dray",
    es: "tres menos cuarto",
    type: "Hora",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist Viertel vor drei.",
    exampleSentenceEs: "Son las tres menos cuarto.",
    regimen: "Formal, hora exacta"
  }, {
    de: "kurz vor 4",
    pron: "kurts foa fía",
    es: "poco antes de las 4",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Wir treffen uns kurz vor 4.",
    exampleSentenceEs: "Nos encontramos poco antes de las 4.",
    regimen: "Fijo: hora"
  }, {
    de: "gleich 4",
    pron: "gláij fí-a",
    es: "casi las 4",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist gleich vier Uhr.",
    exampleSentenceEs: "Son casi las cuatro.",
    regimen: "Fijo"
  }, {
    de: "genau 4 Uhr",
    pron: "gue-náu fía ú-a",
    es: "exactamente las 4",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Wir treffen uns um genau 4 Uhr.",
    exampleSentenceEs: "Nos vemos exactamente a las 4.",
    regimen: "Uhrzeit fija"
  }, {
    de: "fünf nach 4",
    pron: "fünf-naj-fí-a",
    es: "cuatro y cinco",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Es ist fünf nach vier.",
    exampleSentenceEs: "Son las cuatro y cinco.",
    regimen: "nach + dat."
  }, {
    de: "um 3 Uhr",
    pron: "um dráy ú-a",
    es: "a las 3",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Ich komme um 3 Uhr.",
    exampleSentenceEs: "Vengo a las 3.",
    regimen: "um + hora"
  }, {
    de: "von 2 bis 3 Uhr",
    pron: "fon tsvái bis dray ú-a",
    es: "de 2 a 3",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Der Kurs ist von 2 bis 3 Uhr.",
    exampleSentenceEs: "El curso es de 2 a 3.",
    regimen: "von + dat."
  }, {
    de: "ab 3 Uhr",
    pron: "ap-drái-ú-a",
    es: "a partir de las 3",
    type: "Frase",
    category: "Uhrzeit",
    exampleSentenceDe: "Wir essen ab 3 Uhr.",
    exampleSentenceEs: "Comemos a partir de las 3.",
    regimen: "ab + dativo"
  }, {
    de: "anfangen",
    pron: "án-fan-guen",
    es: "empezar / comenzar",
    type: "Verbo",
    category: "Alltag",
    exampleSentenceDe: "Wir fangen jetzt an.",
    exampleSentenceEs: "Empezamos ahora.",
    regimen: "Separable (an-)"
  }, {
    de: "der Anfang",
    pron: "dea án-fang",
    es: "el comienzo",
    type: "Sustantivo (Masc)",
    category: "Alltag",
    exampleSentenceDe: "Der Anfang ist gut.",
    exampleSentenceEs: "El comienzo es bueno.",
    plural: "die Anfänge"
  }, {
    de: "aufhören",
    pron: "áuf-jö-ren",
    es: "terminar / cesar",
    type: "Verbo",
    category: "Alltag",
    exampleSentenceDe: "Bitte, hören Sie auf. Ich möchte schlafen.",
    exampleSentenceEs: "Por favor, para. Quiero dormir.",
    regimen: "Separable (auf-)"
  }, {
    de: "das Ende",
    pron: "das én-de",
    es: "el final",
    type: "Sustantivo (Neutro)",
    category: "Alltag",
    exampleSentenceDe: "Der Film ist zu Ende.",
    exampleSentenceEs: "La película ha terminado.",
    plural: "die Enden"
  }, {
    de: "dauern",
    pron: "dáu-ean",
    es: "durar",
    type: "Verbo",
    category: "Alltag",
    exampleSentenceDe: "Die Reise dauert zwei Stunden.",
    exampleSentenceEs: "El viaje dura dos horas.",
    regimen: "Duración"
  }, {
    de: "der Alltag",
    pron: "dea ál-tak",
    es: "el día a día / rutina",
    type: "Sustantivo",
    category: "Alltag",
    exampleSentenceDe: "Der Alltag ist normal.",
    exampleSentenceEs: "El día a día es normal.",
    plural: "die Alltage"
  }, {
    de: "pünktlich",
    pron: "púnkt-lij",
    es: "puntual",
    type: "Adjetivo",
    category: "Alltag",
    exampleSentenceDe: "Der Zug ist pünktlich.",
    exampleSentenceEs: "El tren es puntual.",
    regimen: "≠ unpünktlich"
  }, {
    de: "die Verspätung",
    pron: "di fea-shpé-tung",
    es: "el retraso",
    type: "Sustantivo",
    category: "Alltag",
    exampleSentenceDe: "Ich habe die Verspätung.",
    exampleSentenceEs: "Tengo el retraso.",
    plural: "die Verspätungen"
  }, {
    de: "regelmäßig",
    pron: "ré-guel-mé-sij",
    es: "regularmente",
    type: "Adverbio",
    category: "Alltag",
    exampleSentenceDe: "Ich trinke Wasser regelmäßig.",
    exampleSentenceEs: "Bebo agua regularmente.",
    regimen: "Frecuencia"
  }]
},
{
  id: 2,
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
    plural: "die Vornamen"
  }, {
    de: "der Nachname",
    pron: "dea nách-ná-me",
    es: "apellido",
    type: "Sustantivo (Masc)",
    category: "Identität",
    exampleSentenceDe: "Mein Nachname ist Müller.",
    exampleSentenceEs: "Mi apellido es Müller.",
    plural: "die Nachnamen"
  }, {
    de: "heißen",
    pron: "jái-sen",
    es: "llamarse",
    type: "Verbo",
    category: "Identität",
    exampleSentenceDe: "Ich heiße Maria.",
    exampleSentenceEs: "Yo me llamo María.",
    regimen: "+ Nominativo"
  }, {
    de: "buchstabieren",
    pron: "buj-shta-bí-ren",
    es: "deletrear",
    type: "Verbo",
    category: "Identität",
    exampleSentenceDe: "Können Sie das bitte buchstabieren?",
    exampleSentenceEs: "¿Puede deletrear eso, por favor?",
    regimen: "+ Akkusativ"
  }, {
    de: "die Frau",
    pron: "di frau",
    es: "la mujer / señora",
    type: "Sustantivo (Fem)",
    category: "Personen",
    exampleSentenceDe: "Die Frau ist nett.",
    exampleSentenceEs: "La mujer es simpática.",
    plural: "die Frauen"
  }, {
    de: "der Mann",
    pron: "dea man",
    es: "el hombre / marido",
    type: "Sustantivo (Masc)",
    category: "Personen",
    exampleSentenceDe: "Der Mann ist nett.",
    exampleSentenceEs: "El hombre es simpático.",
    plural: "die Männer"
  }, {
    de: "die Dame",
    pron: "di dá-me",
    es: "la dama",
    type: "Sustantivo (Fem)",
    category: "Personen",
    exampleSentenceDe: "Hier ist die Dame. Die Dame ist nett.",
    exampleSentenceEs: "Aquí está la dama. La dama es simpática.",
    plural: "die Damen"
  }, {
    de: "der Herr",
    pron: "dea hea",
    es: "el señor",
    type: "Sustantivo (Masc)",
    category: "Personen",
    exampleSentenceDe: "Guten Tag, Herr Müller.",
    exampleSentenceEs: "Buenos días, señor Müller.",
    plural: "die Herren"
  }, {
    de: "männlich / weiblich",
    pron: "mén-lij  vái-blij",
    es: "masculino / femenino",
    type: "Adjetivo",
    category: "Personen",
    exampleSentenceDe: "Ich bin männlich.",
    exampleSentenceEs: "Yo soy masculino.",
    regimen: "≠ weiblich / männlich"
  }, {
    de: "das Mädchen",
    pron: "das mét-jen",
    es: "la niña",
    type: "Sustantivo (Neutro)",
    category: "Personen",
    exampleSentenceDe: "Das Mädchen ist klein.",
    exampleSentenceEs: "La niña es pequeña.",
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
    plural: "die Jungen"
  }, {
    de: "die Adresse",
    pron: "di a-drés-se",
    es: "la dirección",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Das ist die Adresse.",
    exampleSentenceEs: "Esta es la dirección.",
    plural: "die Adressen"
  }, {
    de: "der Wohnort",
    pron: "dea vón-ort",
    es: "lugar de residencia",
    type: "Sustantivo (Masc)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Mein Wohnort ist Berlin.",
    exampleSentenceEs: "Mi lugar de residencia es Berlín.",
    plural: "die Wohnorte"
  }, {
    de: "wohnen / leben",
    pron: "vó-nen  lé-ben",
    es: "vivir / residir",
    type: "Verbo",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich wohne in Berlin.",
    exampleSentenceEs: "Yo vivo en Berlín.",
    regimen: "wohnen+in/Dat"
  }, {
    de: "die Straße",
    pron: "di shtrá-se",
    es: "la calle",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Die Straße ist lang.",
    exampleSentenceEs: "La calle es larga.",
    plural: "die Straßen"
  }, {
    de: "der Platz",
    pron: "dea plats",
    es: "la plaza",
    type: "Sustantivo (Masc)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich sitze auf dem Platz.",
    exampleSentenceEs: "Yo estoy sentado en la plaza.",
    plural: "die Plätze"
  }, {
    de: "die Nummer",
    pron: "di nú-mea",
    es: "el número / de casa",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich habe die Nummer. Die Nummer ist eins.",
    exampleSentenceEs: "Tengo el número. El número es uno.",
    plural: "die Nummern"
  }, {
    de: "die Stadt",
    pron: "di shtát",
    es: "la ciudad",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Das ist die Stadt. Die Stadt ist groß.",
    exampleSentenceEs: "Esta es la ciudad. La ciudad es grande.",
    plural: "die Städte"
  }, {
    de: "die Postleitzahl",
    pron: "di póst-lait-tsal",
    es: "código postal",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich brauche die Postleitzahl von Berlin.",
    exampleSentenceEs: "Necesito el código postal de Berlín.",
    plural: "die Postleitzahlen"
  }, {
    de: "das Dorf / das Land",
    pron: "das doaf  das lant",
    es: "el pueblo / el país",
    type: "Sustantivo (Neutro)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich wohne in einem Dorf. Das Dorf ist klein.",
    exampleSentenceEs: "Yo vivo en un pueblo. El pueblo es pequeño.",
    plural: "die Dörfer / die Länder"
  }, {
    de: "das Telefon",
    pron: "das te-le-fón",
    es: "el teléfono",
    type: "Sustantivo (Neutro)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Das ist mein Telefon.",
    exampleSentenceEs: "Este es mi teléfono.",
    plural: "die Telefone"
  }, {
    de: "telefonieren / anrufen",
    pron: "te-le-fo-ní-ren  án-ru-fen",
    es: "hablar por tel. / llamar",
    type: "Verbo",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich telefoniere mit meiner Mutter.",
    exampleSentenceEs: "Yo hablo por teléfono con mi madre.",
    regimen: "anrufen: separable, +Akk"
  }, {
    de: "die E-Mail",
    pron: "di í-meil",
    es: "el correo electrónico",
    type: "Sustantivo (Fem)",
    category: "Kontaktdaten",
    exampleSentenceDe: "Ich habe die E-Mail. Die E-Mail ist neu.",
    exampleSentenceEs: "Tengo el correo electrónico. El correo electrónico es nuevo.",
    plural: "die E-Mails"
  }, {
    de: "Ich bin geboren am...",
    pron: "ij bin gue-bó-ren am",
    es: "Nací el...",
    type: "Frase",
    category: "Lebenslauf",
    exampleSentenceDe: "Ich bin geboren am fünften Mai.",
    exampleSentenceEs: "Nací el cinco de mayo.",
    regimen: "+ fecha (am)"
  }, {
    de: "das Geburtsdatum",
    pron: "das gue-búrts-dá-tum",
    es: "fecha de nacimiento",
    type: "Sustantivo (Neutro)",
    category: "Lebenslauf",
    exampleSentenceDe: "Mein Geburtsdatum ist der zehnte Mai.",
    exampleSentenceEs: "Mi fecha de nacimiento es el diez de mayo.",
    plural: "die Geburtsdaten"
  }, {
    de: "der Geburtstag",
    pron: "dea gue-búrts-tak",
    es: "el cumpleaños",
    type: "Sustantivo (Masc)",
    category: "Lebenslauf",
    exampleSentenceDe: "Heute ist mein Geburtstag.",
    exampleSentenceEs: "Hoy es mi cumpleaños.",
    plural: "die Geburtstage"
  }, {
    de: "geboren in",
    pron: "gue-bó-ren in",
    es: "nacido en",
    type: "Frase",
    category: "Lebenslauf",
    exampleSentenceDe: "Ich bin geboren in Spanien.",
    exampleSentenceEs: "Yo nací en España.",
    regimen: "+ Dat."
  }, {
    de: "Jahre alt sein",
    pron: "yá-re alt sáin",
    es: "tener ... años",
    type: "Frase",
    category: "Lebenslauf",
    exampleSentenceDe: "Ich bin 30 Jahre alt.",
    exampleSentenceEs: "Tengo 30 años.",
    regimen: "Número + Jahre alt"
  }, {
    de: "die Familie",
    pron: "di fa-mí-lie",
    es: "la familia",
    type: "Sustantivo (Fem)",
    category: "Familie",
    exampleSentenceDe: "Das ist meine Familie.",
    exampleSentenceEs: "Esta es mi familia.",
    plural: "die Familien"
  }, {
    de: "der Familienstand",
    pron: "dea fa-mí-li-en-shtant",
    es: "estado civil",
    type: "Sustantivo (Masc)",
    category: "Familie",
    exampleSentenceDe: "Mein Familienstand ist ledig.",
    exampleSentenceEs: "Mi estado civil es soltero.",
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
    plural: "die Erwachsenen"
  }, {
    de: "der Jugendliche",
    pron: "dea yú-guent-li-je",
    es: "el joven",
    type: "Sustantivo (Masc)",
    category: "Soziales",
    exampleSentenceDe: "Der Jugendliche ist hier.",
    exampleSentenceEs: "El joven está aquí.",
    plural: "die Jugendlichen"
  }, {
    de: "der Pass / Reisepass",
    pron: "dea pas  rái-ze-pas",
    es: "pasaporte",
    type: "Sustantivo (Masc)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe den Reisepass.",
    exampleSentenceEs: "Yo tengo el pasaporte.",
    plural: "die Pässe / Reisepässe"
  }, {
    de: "der Ausweis",
    pron: "dea áus-vais",
    es: "documento de identidad",
    type: "Sustantivo (Masc)",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche den Ausweis, bitte.",
    exampleSentenceEs: "Necesito el documento de identidad, por favor.",
    plural: "die Ausweise"
  }, {
    de: "die Papiere",
    pron: "di pa-pí-re",
    es: "los papeles/documentos",
    type: "Sustantivo (Plural)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe die Papiere. Die Papiere sind wichtig.",
    exampleSentenceEs: "Tengo los papeles. Los papeles son importantes.",
    plural: "die Papiere"
  }, {
    de: "das Formular",
    pron: "das foa-mu-lá",
    es: "formulario",
    type: "Sustantivo (Neutro)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe das Formular. Das Formular ist neu.",
    exampleSentenceEs: "Tengo el formulario. El formulario es nuevo.",
    plural: "die Formulare"
  }, {
    de: "ausfüllen",
    pron: "áus-fiú-len",
    es: "rellenar",
    type: "Verbo",
    category: "Dokumente",
    exampleSentenceDe: "Ich muss das Formular ausfüllen.",
    exampleSentenceEs: "Yo debo rellenar el formulario.",
    regimen: "Separable (aus-)"
  }, {
    de: "die Staatsangehörigkeit",
    pron: "di shtáts-án-gue-jö-rij-kait",
    es: "nacionalidad",
    type: "Sustantivo (Fem)",
    category: "Dokumente",
    exampleSentenceDe: "Ich habe eine Frage zur Staatsangehörigkeit.",
    exampleSentenceEs: "Tengo una pregunta sobre la nacionalidad.",
    plural: "die Staatsangehörigkeiten"
  }, {
    de: "der Führerschein",
    pron: "dea fú-ra-sháin",
    es: "licencia de conducir",
    type: "Sustantivo (Masc)",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche den Führerschein.",
    exampleSentenceEs: "Yo necesito la licencia de conducir.",
    plural: "die Führerscheine"
  }, {
    de: "unterschreiben",
    pron: "un-ta-shrái-ben",
    es: "firmar",
    type: "Verbo",
    category: "Dokumente",
    exampleSentenceDe: "Ich muss den Vertrag unterschreiben.",
    exampleSentenceEs: "Yo debo firmar el contrato.",
    regimen: "No separable, + Akkusativ"
  }, {
    de: "die Unterschrift",
    pron: "di ún-tea-shrift",
    es: "la firma",
    type: "Sustantivo (Fem)",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche die Unterschrift hier.",
    exampleSentenceEs: "Necesito la firma aquí.",
    plural: "die Unterschriften"
  }, {
    de: "das Alter",
    pron: "das ál-tea",
    es: "edad",
    type: "Sustantivo (Neutro)",
    category: "Lebenslauf",
    exampleSentenceDe: "Mein Alter ist zwanzig.",
    exampleSentenceEs: "Mi edad es veinte.",
    plural: "die Alter"
  }, {
    de: "der Geburtsort",
    pron: "dea gue-búrts-ort",
    es: "lugar de nacimiento",
    type: "Sustantivo (Masc)",
    category: "Lebenslauf",
    exampleSentenceDe: "Mein Geburtsort ist Berlin.",
    exampleSentenceEs: "Mi lugar de nacimiento es Berlín.",
    plural: "die Geburtsorte"
  }, {
    de: "geschieden",
    pron: "gue-shí-den",
    es: "divorciado/a",
    type: "Adjetivo",
    category: "Familie",
    exampleSentenceDe: "Er ist geschieden.",
    exampleSentenceEs: "Él está divorciado.",
    regimen: "≠ verheiratet"
  }, {
    de: "verwitwet",
    pron: "fea-vít-vet",
    es: "viudo/a",
    type: "Adjetivo",
    category: "Familie",
    exampleSentenceDe: "Mein Großvater ist verwitwet.",
    exampleSentenceEs: "Mi abuelo es viudo.",
    regimen: "≠ verheiratet"
  }, {
    de: "der Ausländer",
    pron: "dea áus-len-dea",
    es: "el extranjero",
    type: "Sustantivo",
    category: "Gesellschaft",
    exampleSentenceDe: "Ich bin ein Ausländer.",
    exampleSentenceEs: "Yo soy un extranjero.",
    plural: "die Ausländer"
  }, {
    de: "die Gesellschaft",
    pron: "di gue-sél-shaft",
    es: "la sociedad",
    type: "Sustantivo",
    category: "Gesellschaft",
    exampleSentenceDe: "Die Gesellschaft ist groß.",
    exampleSentenceEs: "La sociedad es grande.",
    plural: "die Gesellschaften"
  }, {
    de: "der Rentner",
    pron: "dea rént-nea",
    es: "el jubilado",
    type: "Sustantivo",
    category: "Gesellschaft",
    exampleSentenceDe: "Der Rentner ist alt.",
    exampleSentenceEs: "El jubilado es viejo.",
    plural: "die Rentner"
  }, {
    de: "sich freuen",
    pron: "zij fróy-en",
    es: "alegrarse",
    type: "Verbo Reflexivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich freue mich auf den Urlaub.",
    exampleSentenceEs: "Yo me alegro de las vacaciones.",
    regimen: "Reflexivo + auf/über+Akk"
  }, {
    de: "das Gefühl",
    pron: "das gue-fúl",
    es: "el sentimiento",
    type: "Sustantivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich habe das Gefühl.",
    exampleSentenceEs: "Tengo el sentimiento.",
    plural: "die Gefühle"
  },
  {
    de: "mitbringen",
    pron: "mít-brin-guen",
    es: "traer consigo",
    type: "Verbo",
    category: "Soziales",
    regimen: "Separable (mit-) / + Dativo + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "kennenlernen",
    pron: "ké-nen-lea-nen",
    es: "conocer (por 1ª vez)",
    type: "Verbo",
    category: "Soziales",
    regimen: "Separable (kennen-) / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "einladen",
    pron: "áin-la-den",
    es: "invitar",
    type: "Verbo",
    category: "Soziales",
    regimen: "Separable (ein-) / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "feiern",
    pron: "fái-ean",
    es: "celebrar",
    type: "Verbo",
    category: "Soziales",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "schenken",
    pron: "shén-ken",
    es: "regalar",
    type: "Verbo",
    category: "Soziales",
    regimen: "Dativo (a quién) + Akkusativ (qué)",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "gratulieren",
    pron: "gra-tu-lí-ren",
    es: "felicitar",
    type: "Verbo",
    category: "Soziales",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "danken",
    pron: "dán-ken",
    es: "agradecer",
    type: "Verbo",
    category: "Soziales",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Feuerwehr",
    pron: "di fói-ea-vea",
    es: "los bomberos",
    type: "Sustantivo (Fem)",
    category: "Gesellschaft",
    plural: "die Feuerwehren",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }]
},
{
  id: 14,
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
    regimen: "+ Nominativ"
  }, {
    de: "haben",
    pron: "já-ben",
    es: "tener / haber",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich habe Hunger.",
    exampleSentenceEs: "Yo tengo hambre.",
    regimen: "+ Akkusativ"
  }, {
    de: "werden",
    pron: "vér-den",
    es: "llegar a ser / convertirse",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich werde Arzt.",
    exampleSentenceEs: "Yo seré médico.",
    regimen: "+ Nominativ (predicado)"
  }, {
    de: "machen",
    pron: "má-jen",
    es: "hacer",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich mache einen Kaffee.",
    exampleSentenceEs: "Yo hago un café.",
    regimen: "+ Akkusativ"
  }, {
    de: "tun",
    pron: "tún",
    es: "hacer (una acción)",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Was tust du heute?",
    exampleSentenceEs: "¿Qué haces hoy?",
    regimen: "+ Akkusativ"
  }, {
    de: "sagen",
    pron: "sá-guen",
    es: "decir",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich sage \"Hallo\".",
    exampleSentenceEs: "Yo digo \"Hola\".",
    regimen: "+ Dativ + Akkusativ"
  }, {
    de: "gehen",
    pron: "gué-en",
    es: "ir / andar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich gehe nach Hause.",
    exampleSentenceEs: "Yo voy a casa.",
    regimen: "+ Nominativ"
  }, {
    de: "kommen",
    pron: "kó-men",
    es: "venir",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich komme aus Spanien.",
    exampleSentenceEs: "Yo vengo de España.",
    regimen: "aus/von + Dativo"
  }, {
    de: "sehen",
    pron: "zé-en",
    es: "ver",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich sehe den Mann.",
    exampleSentenceEs: "Yo veo al hombre.",
    regimen: "+ Akkusativ"
  }, {
    de: "wissen",
    pron: "ví-sen",
    es: "saber (información)",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich weiß die Antwort.",
    exampleSentenceEs: "Yo sé la respuesta.",
    regimen: "+ Akkusativ; ich weiß"
  }, {
    de: "kennen",
    pron: "ké-nen",
    es: "conocer (personas/lugares)",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich kenne den Mann.",
    exampleSentenceEs: "Yo conozco al hombre.",
    regimen: "+ Akkusativ"
  }, {
    de: "finden",
    pron: "fín-den",
    es: "encontrar / parecer",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich finde das Buch gut.",
    exampleSentenceEs: "Yo encuentro el libro bueno.",
    regimen: "+ Akkusativ"
  }, {
    de: "bleiben",
    pron: "blái-ben",
    es: "quedarse",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich bleibe hier.",
    exampleSentenceEs: "Yo me quedo aquí.",
    regimen: "+ sein, irr. (blieb)"
  }, {
    de: "lassen",
    pron: "lá-sen",
    es: "dejar / permitir",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich lasse das Fenster offen.",
    exampleSentenceEs: "Yo dejo la ventana abierta.",
    regimen: "+ Akk. (er lässt)"
  }, {
    de: "denken",
    pron: "dén-ken",
    es: "pensar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich denke an dich.",
    exampleSentenceEs: "Pienso en ti.",
    regimen: "an/über + Akkusativ"
  }, {
    de: "groß / klein",
    pron: "grós  kláin",
    es: "grande / pequeño",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Haus ist groß. Das Haus ist nicht klein.",
    exampleSentenceEs: "La casa es grande. La casa no es pequeña.",
    regimen: "≠ klein"
  }, {
    de: "gut / schlecht",
    pron: "gút  shlejt",
    es: "bueno / malo",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Essen ist gut.",
    exampleSentenceEs: "La comida está buena.",
    regimen: "≠ schlecht / gut"
  }, {
    de: "neu / alt",
    pron: "noi  alt",
    es: "nuevo / viejo",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Mein Haus ist alt. Aber mein Auto ist neu.",
    exampleSentenceEs: "Mi casa es vieja. Pero mi coche es nuevo.",
    regimen: "≠ alt / neu"
  }, {
    de: "schön / hässlich",
    pron: "shön  jés-lij",
    es: "bonito / feo",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Haus ist schön.",
    exampleSentenceEs: "La casa es bonita.",
    regimen: "≠ hässlich"
  }, {
    de: "schwer / leicht",
    pron: "shvéa  láijt",
    es: "pesado (difícil) / ligero (fácil)",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Der Koffer ist schwer.",
    exampleSentenceEs: "La maleta es pesada.",
    regimen: "≠ leicht / schwer"
  }, {
    de: "richtig / falsch",
    pron: "ríj-tij  falsh",
    es: "correcto / incorrecto",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das ist richtig.",
    exampleSentenceEs: "Eso es correcto.",
    regimen: "≠ falsch"
  }, {
    de: "wichtig",
    pron: "víj-tij",
    es: "importante",
    type: "Adjetivo",
    category: "Adjektive",
    exampleSentenceDe: "Das ist wichtig.",
    exampleSentenceEs: "Esto es importante.",
    regimen: "≠ unwichtig"
  }, {
    de: "einfach / schwierig",
    pron: "áin-faj  shví-rij",
    es: "fácil / difícil",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Die Aufgabe ist einfach.",
    exampleSentenceEs: "La tarea es fácil.",
    regimen: "≠ schwierig / einfach"
  }, {
    de: "schnell / langsam",
    pron: "shnel  láng-zam",
    es: "rápido / lento",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Auto ist schnell.",
    exampleSentenceEs: "El coche es rápido.",
    regimen: "≠ langsam / schnell"
  }, {
    de: "laut / leise",
    pron: "láut  lái-ze",
    es: "fuerte (sonido) / silencioso",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Radio ist laut. Ich mache das Radio leise.",
    exampleSentenceEs: "La radio está alta. Yo pongo la radio silenciosa.",
    regimen: "≠ leise / laut"
  }, {
    de: "hell / dunkel",
    pron: "jel  dún-kel",
    es: "claro (luz) / oscuro",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Licht ist hell.",
    exampleSentenceEs: "La luz es clara.",
    regimen: "hell ≠ dunkel"
  }, {
    de: "heiß / kalt",
    pron: "jáis  kalt",
    es: "caliente / frío",
    type: "Adjetivo",
    category: "Gegensätze",
    exampleSentenceDe: "Das Wasser ist heiß.",
    exampleSentenceEs: "El agua está caliente.",
    regimen: "≠ kalt / heiß"
  }, {
    de: "können",
    pron: "kö́-nen",
    es: "poder (habilidad/posibilidad)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich kann Deutsch sprechen.",
    exampleSentenceEs: "Yo puedo hablar alemán.",
    regimen: "+ Infinitiv (sin zu)"
  }, {
    de: "müssen",
    pron: "mú-sen",
    es: "tener que (obligación)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich muss jetzt nach Hause gehen.",
    exampleSentenceEs: "Yo tengo que ir a casa ahora.",
    regimen: "+ Infinitiv (sin zu)"
  }, {
    de: "dürfen",
    pron: "dúa-fen",
    es: "poder (permiso)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Hier dürfen Sie parken.",
    exampleSentenceEs: "Aquí puede aparcar.",
    regimen: "+ Infinitiv sin zu"
  }, {
    de: "sollen",
    pron: "zó-len",
    es: "deber (recomendación/orden)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Du sollst Wasser trinken.",
    exampleSentenceEs: "Tú deberías beber agua.",
    regimen: "+ Infinitiv (ohne zu)"
  }, {
    de: "wollen",
    pron: "vó-len",
    es: "querer (deseo fuerte)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich will einen Kaffee.",
    exampleSentenceEs: "Yo quiero un café.",
    regimen: "+ Infinitiv (sin zu)"
  }, {
    de: "mögen",
    pron: "mö-guen",
    es: "gustar (algo/alguien)",
    type: "Verbo Modal",
    category: "Modalverben",
    exampleSentenceDe: "Ich mag Kaffee.",
    exampleSentenceEs: "Me gusta el café.",
    regimen: "+ Akkusativ"
  }, {
    de: "möchten",
    pron: "mój-ten",
    es: "gustaría (quisiera)",
    type: "Verbo Modal (KII)",
    category: "Modalverben",
    exampleSentenceDe: "Ich möchte einen Kaffee.",
    exampleSentenceEs: "Yo quisiera un café.",
    regimen: "+ Akkusativ / + Infinitiv"
  }, {
    de: "geben",
    pron: "gué-ben",
    es: "dar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich gebe dir mein Buch.",
    exampleSentenceEs: "Yo te doy mi libro.",
    regimen: "Dativo (a quién) + Akkusativ (qué)"
  }, {
    de: "nehmen",
    pron: "né-men",
    es: "tomar / agarrar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich nehme einen Kaffee.",
    exampleSentenceEs: "Yo tomo un café.",
    regimen: "Irregular (nimmt) / + Akkusativ"
  }, {
    de: "brauchen",
    pron: "bráu-jen",
    es: "necesitar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich brauche Wasser.",
    exampleSentenceEs: "Yo necesito agua.",
    regimen: "+ Akkusativ"
  }, {
    de: "helfen",
    pron: "jél-fen",
    es: "ayudar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Kannst du mir helfen?",
    exampleSentenceEs: "¿Puedes ayudarme?",
    regimen: "+ Dativo"
  }, {
    de: "bringen",
    pron: "brín-guen",
    es: "traer",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich bringe dir das Buch.",
    exampleSentenceEs: "Yo te traigo el libro.",
    regimen: "+ Akk./Dat."
  }, {
    de: "schreiben",
    pron: "shrái-ben",
    es: "escribir",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich schreibe eine E-Mail.",
    exampleSentenceEs: "Yo escribo un correo electrónico.",
    regimen: "+ Akkusativ"
  }, {
    de: "lesen",
    pron: "lé-sen",
    es: "leer",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich lese ein Buch.",
    exampleSentenceEs: "Yo leo un libro.",
    regimen: "+ Akkusativ"
  }, {
    de: "sprechen",
    pron: "shpré-jen",
    es: "hablar",
    type: "Verbo (Irregular)",
    category: "Basisverben",
    exampleSentenceDe: "Ich spreche Deutsch.",
    exampleSentenceEs: "Yo hablo alemán.",
    regimen: "+ Akk./mit + Dat."
  }, {
    de: "versuchen",
    pron: "fea-zú-jen",
    es: "intentar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich versuche, Deutsch zu lernen.",
    exampleSentenceEs: "Intento aprender alemán.",
    regimen: "+ Akkusativ"
  }, {
    de: "entscheiden",
    pron: "ent-shái-den",
    es: "decidir",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich kann nicht entscheiden.",
    exampleSentenceEs: "Yo no puedo decidir.",
    regimen: "sich + für/Akk"
  }, {
    de: "vergessen",
    pron: "fea-gué-sen",
    es: "olvidar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich vergesse meinen Schlüssel nicht.",
    exampleSentenceEs: "No olvido mi llave.",
    regimen: "+ Akkusativ, irr. (vergisst)"
  }, {
    de: "sich erinnern",
    pron: "ziş ea-í-nen",
    es: "recordar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich erinnere mich an dich.",
    exampleSentenceEs: "Yo te recuerdo a ti.",
    regimen: "Reflexivo + an+Akk"
  }, {
    de: "passieren",
    pron: "pa-sí-ren",
    es: "suceder",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Was passiert heute?",
    exampleSentenceEs: "¿Qué sucede hoy?",
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "erzählen",
    pron: "ea-tsé-len",
    es: "narrar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Ich erzähle eine Geschichte.",
    exampleSentenceEs: "Yo narro una historia.",
    regimen: "+Dat./Akk."
  }, {
    de: "bedeuten",
    pron: "be-dói-ten",
    es: "significar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Was bedeutet das?",
    exampleSentenceEs: "¿Qué significa eso?",
    regimen: "+ Akkusativ"
  }, {
    de: "beginnen",
    pron: "be-guí-nen",
    es: "comenzar",
    type: "Verbo",
    category: "Basisverben",
    exampleSentenceDe: "Der Kurs beginnt heute.",
    exampleSentenceEs: "El curso comienza hoy.",
    regimen: "+ Akkusativ/mit+Dat"
  }, {
    de: "stehen",
    pron: "shté-en",
    es: "estar de pie",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Der Tisch steht hier.",
    exampleSentenceEs: "La mesa está aquí.",
    regimen: "+ Dativ/Akkusativ (Wo/Wohin)"
  }, {
    de: "stellen",
    pron: "shté-len",
    es: "colocar vertical",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Ich stelle die Flasche auf den Tisch.",
    exampleSentenceEs: "Yo coloco la botella sobre la mesa.",
    regimen: "+ Akkusativ (wo? Dativ)"
  }, {
    de: "liegen",
    pron: "lí-guen",
    es: "estar acostado",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Ich liege auf dem Bett.",
    exampleSentenceEs: "Yo estoy acostado en la cama.",
    regimen: "⚠️ Wo? + Dativ"
  }, {
    de: "legen",
    pron: "lé-guen",
    es: "colocar horizontal",
    type: "Verbo Posicional",
    category: "Positionsverben",
    exampleSentenceDe: "Ich lege das Buch auf den Tisch.",
    exampleSentenceEs: "Yo coloco el libro sobre la mesa.",
    regimen: "Akk.+Wohin? (legen/liegen)"
  },
  {
    de: "aufstehen",
    pron: "áuf-shte-en",
    es: "levantarse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (auf-) / + Nominativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "aufwachen",
    pron: "áuf-va-jen",
    es: "despertarse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (auf-) / + Nominativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "einschlafen",
    pron: "áin-shla-fen",
    es: "dormirse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (ein-) / + Nominativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "waschen",
    pron: "vá-shen",
    es: "lavar",
    type: "Verbo",
    category: "Alltag",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "duschen",
    pron: "dú-shen",
    es: "ducharse",
    type: "Verbo",
    category: "Alltag",
    regimen: "Reflexivo (+ Akkusativ)",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "abtrocknen",
    pron: "áp-trok-nen",
    es: "secar",
    type: "Verbo",
    category: "Alltag",
    regimen: "Separable (ab-) / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "gehören",
    pron: "gue-hö-ren",
    es: "pertenecer",
    type: "Verbo",
    category: "Basisverben",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "glauben",
    pron: "gláu-ben",
    es: "creer",
    type: "Verbo",
    category: "Basisverben",
    regimen: "⚠️ Exige Dativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "zuhören",
    pron: "tsú-hö-ren",
    es: "escuchar (atención)",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Separable (zu-) / ⚠️ Exige Dativo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "verlieren",
    pron: "fea-lí-ren",
    es: "perder",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Irregular / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "stehlen",
    pron: "shté-len",
    es: "robar",
    type: "Verbo",
    category: "Haushalt",
    regimen: "Irregular / Dativo + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "suchen",
    pron: "zú-jen",
    es: "buscar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Regenschirm",
    pron: "dea ré-guen-shirm",
    es: "el paraguas",
    type: "Sustantivo (Masc)",
    category: "Alltag",
    plural: "die Regenschirme",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Brille",
    pron: "di brí-le",
    es: "las gafas / lentes",
    type: "Sustantivo (Fem)",
    category: "Alltag",
    plural: "die Brillen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Tasche",
    pron: "di tá-she",
    es: "el bolso / la bolsa",
    type: "Sustantivo (Fem)",
    category: "Alltag",
    plural: "die Taschen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Uhr",
    pron: "di ur",
    es: "el reloj",
    type: "Sustantivo (Fem)",
    category: "Alltag",
    plural: "die Uhren",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "fliegen",
    pron: "flí-guen",
    es: "volar",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "rennen",
    pron: "ré-nen",
    es: "correr (rápido)",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "springen",
    pron: "shprín-guen",
    es: "saltar",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "singen",
    pron: "zín-guen",
    es: "cantar",
    type: "Verbo",
    category: "Aktivitäten",
    regimen: "Irregular / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "weinen",
    pron: "vái-nen",
    es: "llorar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "Intransitivo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "lachen",
    pron: "lá-jen",
    es: "reír",
    type: "Verbo",
    category: "Gefühle",
    regimen: "Intransitivo",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "ziehen",
    pron: "tsí-en",
    es: "tirar / jalar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "drücken",
    pron: "drü-ken",
    es: "presionar / empujar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "werfen",
    pron: "véa-fen",
    es: "lanzar / tirar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular (wirft) / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "fangen",
    pron: "fán-guen",
    es: "atrapar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular (fängt) / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "steigen",
    pron: "shtái-guen",
    es: "subir / escalar",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular / + sein (Perfekt)",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "fallen",
    pron: "fá-len",
    es: "caer",
    type: "Verbo",
    category: "Bewegung",
    regimen: "Irregular (fällt) / + sein (Perfekt)",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "reich",
    pron: "raij",
    es: "rico",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "bag full of gold coins",
    exampleSentenceDe: "Der Mann ist sehr reich.",
    exampleSentenceEs: "El hombre es muy rico."
  }, {
        de: "arm",
    pron: "arm",
    es: "pobre",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "empty broken wallet",
    exampleSentenceDe: "Die Familie ist arm.",
    exampleSentenceEs: "La familia es pobre."
  }, {
        de: "wach",
    pron: "vaj",
    es: "despierto",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "wide open eye",
    exampleSentenceDe: "Das Baby ist schon wach.",
    exampleSentenceEs: "El bebé ya está despierto."
  }, {
        de: "klug",
    pron: "kluk",
    es: "inteligente",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "glowing lightbulb",
    exampleSentenceDe: "Meine Schwester ist sehr klug.",
    exampleSentenceEs: "Mi hermana es muy inteligente."
  }, {
        de: "dumm",
    pron: "dum",
    es: "tonto",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "dunce cap",
    exampleSentenceDe: "Das war ein dummer Fehler.",
    exampleSentenceEs: "Ese fue un error tonto."
  }, {
        de: "fleißig",
    pron: "flái-sij",
    es: "trabajador",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "busy bee",
    exampleSentenceDe: "Der Schüler ist sehr fleißig.",
    exampleSentenceEs: "El alumno es muy trabajador."
  }, {
        de: "faul",
    pron: "faul",
    es: "perezoso",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "sleeping sloth",
    exampleSentenceDe: "Am Sonntag bin ich faul.",
    exampleSentenceEs: "El domingo soy perezoso."
  }, {
        de: "mutig",
    pron: "mú-tij",
    es: "valiente",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "brave lion",
    exampleSentenceDe: "Der Polizist ist mutig.",
    exampleSentenceEs: "El policía es valiente."
  }, {
        de: "feige",
    pron: "fái-gue",
    es: "cobarde",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "hiding person",
    exampleSentenceDe: "Sei nicht feige!",
    exampleSentenceEs: "¡No seas cobarde!"
  }, {
        de: "höflich",
    pron: "höf-lij",
    es: "cortés",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "person bowing politely",
    exampleSentenceDe: "Der Kellner ist muy cortés.",
    exampleSentenceEs: "El camarero es muy cortés."
  }, {
        de: "freundlich",
    pron: "fróind-lij",
    es: "amable",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "friendly waving hand",
    exampleSentenceDe: "Die Leute hier sind freundlich.",
    exampleSentenceEs: "La gente aquí es amable."
  }, {
        de: "streng",
    pron: "shtreng",
    es: "estricto",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "strict teacher pointing",
    exampleSentenceDe: "Der Lehrer ist streng.",
    exampleSentenceEs: "El profesor es estricto."
  }, {
        de: "lustig",
    pron: "lús-tij",
    es: "divertido",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "laughing face",
    exampleSentenceDe: "Der Witz ist sehr lustig.",
    exampleSentenceEs: "El chiste es muy divertido."
  }, {
        de: "langweilig",
    pron: "láng-vai-lij",
    es: "aburrido",
    type: "Adjetivo",
    category: "Gegensätze",
    en: "yawning face",
    exampleSentenceDe: "Das Buch ist langweilig.",
    exampleSentenceEs: "El libro es aburrido."
  }, {
        de: "spannend",
    pron: "shpá-nent",
    es: "emocionante",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "exciting roller coaster",
    exampleSentenceDe: "Der Film ist spannend.",
    exampleSentenceEs: "La película es emocionante."
  }, {
        de: "ruhig",
    pron: "rú-ij",
    es: "tranquilo",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "calm zen stones",
    exampleSentenceDe: "Das Meer ist heute ruhig.",
    exampleSentenceEs: "El mar está tranquilo hoy."
  }, {
        de: "nervös",
    pron: "ner-vös",
    es: "nervioso",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "sweating nervous face",
    exampleSentenceDe: "Vor der Prüfung bin ich nervös.",
    exampleSentenceEs: "Antes del examen estoy nervioso."
  }, {
        de: "gewinnen",
    pron: "gue-ví-nen",
    es: "ganar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Irregular / + Akkusativ",
    en: "person holding a gold trophy",
    exampleSentenceDe: "Wir werden das Spiel gewinnen.",
    exampleSentenceEs: "Ganaremos el juego."
  }, {
        de: "schieben",
    pron: "shí-ben",
    es: "empujar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "Irregular / + Akkusativ",
    en: "person pushing a heavy box",
    exampleSentenceDe: "Ich schiebe das Auto.",
    exampleSentenceEs: "Yo empujo el coche."
  }, {
        de: "stören",
    pron: "shtö-ren",
    es: "molestar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "+ Akkusativ",
    en: "person covering their ears",
    exampleSentenceDe: "Bitte stören Sie mich nicht.",
    exampleSentenceEs: "Por favor, no me moleste."
  }, {
        de: "hoffen",
    pron: "jó-fen",
    es: "esperar (desear)",
    type: "Verbo",
    category: "Basisverben",
    regimen: "auf + Akkusativ",
    en: "person crossing fingers hoping",
    exampleSentenceDe: "Ich hoffe auf gutes Wetter.",
    exampleSentenceEs: "Espero buen tiempo."
  }, {
        de: "träumen",
    pron: "trói-men",
    es: "soñar",
    type: "Verbo",
    category: "Basisverben",
    regimen: "von + Dativ",
    en: "sleeping person with a thought bubble",
    exampleSentenceDe: "Ich träume von dir.",
    exampleSentenceEs: "Sueño contigo."
  }, {
        de: "lieben",
    pron: "lí-ben",
    es: "amar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "+ Akkusativ",
    en: "person hugging a large heart",
    exampleSentenceDe: "Ich liebe meine Familie.",
    exampleSentenceEs: "Amo a mi familia."
  }, {
        de: "hassen",
    pron: "já-sen",
    es: "odiar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "+ Akkusativ",
    en: "angry person crossing arms",
    exampleSentenceDe: "Ich hasse den Winter.",
    exampleSentenceEs: "Odio el invierno."
  }, {
        de: "lächeln",
    pron: "lé-cheln",
    es: "sonreír",
    type: "Verbo",
    category: "Gefühle",
    regimen: "Intransitivo",
    en: "smiling happy person",
    exampleSentenceDe: "Das Kid lächelt.",
    exampleSentenceEs: "El niño sonríe."
  }, {
        de: "schreien",
    pron: "shrái-en",
    es: "gritar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / Intransitivo",
    en: "person shouting loud",
    exampleSentenceDe: "Warum schreist du?",
    exampleSentenceEs: "¿Por qué gritas?"
  }, {
        de: "flüstern",
    pron: "flüs-tern",
    es: "susurrar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Intransitivo",
    en: "person whispering a secret",
    exampleSentenceDe: "Wir müssen hier flüstern.",
    exampleSentenceEs: "Tenemos que susurrar aquí."
  }, {
        de: "diskutieren",
    pron: "dis-ku-tí-ren",
    es: "discutir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "über + Akkusativ",
    en: "two people debating",
    exampleSentenceDe: "Wir diskutieren über Politik.",
    exampleSentenceEs: "Discutimos sobre política."
  }, {
        de: "versprechen",
    pron: "fea-shpré-jen",
    es: "prometer",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / + Dativo",
    en: "person making a pinky promise",
    exampleSentenceDe: "Ich verspreche es dir.",
    exampleSentenceEs: "Te lo prometo."
  }, {
        de: "zweifeln",
    pron: "tsvái-feln",
    es: "dudar",
    type: "Verbo",
    category: "Gefühle",
    regimen: "an + Dativo",
    en: "person scratching head confused",
    exampleSentenceDe: "Ich zweifle an seiner Geschichte.",
    exampleSentenceEs: "Dudo de su historia."
  }, {
        de: "verzeihen",
    pron: "fea-tsái-en",
    es: "perdonar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Irregular / + Dativo",
    en: "two people shaking hands apologizing",
    exampleSentenceDe: "Bitte verzeih mir.",
    exampleSentenceEs: "Por favor, perdóname."
  }]
},
{
  id: 15,
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
    regimen: "Temporal"
  }, {
    de: "morgen",
    pron: "mór-guen",
    es: "mañana",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich gehe morgen ins Kino.",
    exampleSentenceEs: "Mañana voy al cine.",
    regimen: "Temporal"
  }, {
    de: "gestern",
    pron: "gués-tean",
    es: "ayer",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Gestern war ich im Park.",
    exampleSentenceEs: "Ayer estuve en el parque.",
    regimen: "Temporal"
  }, {
    de: "jetzt",
    pron: "yetst",
    es: "ahora",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich lerne Deutsch jetzt.",
    exampleSentenceEs: "Yo aprendo alemán ahora.",
    regimen: "Temporal"
  }, {
    de: "bald",
    pron: "balt",
    es: "pronto",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Wir sehen uns bald.",
    exampleSentenceEs: "Nos vemos pronto.",
    regimen: "Temporal"
  }, {
    de: "immer",
    pron: "í-mea",
    es: "siempre",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Ich trinke Kaffee immer.",
    exampleSentenceEs: "Yo bebo café siempre.",
    regimen: "Frecuencia"
  }, {
    de: "oft",
    pron: "oft",
    es: "a menudo",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Ich trinke oft Kaffee.",
    exampleSentenceEs: "A menudo bebo café.",
    regimen: "Frecuencia"
  }, {
    de: "manchmal",
    pron: "mánch-mal",
    es: "a veces",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Manchmal trinke ich Kaffee.",
    exampleSentenceEs: "A veces bebo café.",
    regimen: "Frecuencia"
  }, {
    de: "nie",
    pron: "ni",
    es: "nunca",
    type: "Adverbio",
    category: "Häufigkeit",
    exampleSentenceDe: "Ich sehe dich nie.",
    exampleSentenceEs: "Yo te veo nunca.",
    regimen: "Frecuencia"
  }, {
    de: "schon",
    pron: "shon",
    es: "ya",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich bin schon zu Hause.",
    exampleSentenceEs: "Yo ya estoy en casa.",
    regimen: "Temporal: ya, ya sea"
  }, {
    de: "noch",
    pron: "noj",
    es: "todavía / aún",
    type: "Adverbio",
    category: "Zeitadverbien",
    exampleSentenceDe: "Ich bin noch zu Hause.",
    exampleSentenceEs: "Yo estoy todavía en casa.",
    regimen: "Temporal: continuidad"
  }, {
    de: "hier",
    pron: "hí-a",
    es: "aquí",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Ich bin hier.",
    exampleSentenceEs: "Yo estoy aquí.",
    regimen: "Lugar"
  }, {
    de: "dort",
    pron: "dort",
    es: "allí",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Ich bin dort.",
    exampleSentenceEs: "Yo estoy allí.",
    regimen: "Lugar"
  }, {
    de: "oben / unten",
    pron: "ó-ben  ún-ten",
    es: "arriba / abajo",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Das Buch ist oben. Die Katze ist unten.",
    exampleSentenceEs: "El libro está arriba. El gato está abajo.",
    regimen: "Local"
  }, {
    de: "vorn / hinten",
    pron: "fon  jín-ten",
    es: "adelante / atrás",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Ich sitze vorn.",
    exampleSentenceEs: "Yo me siento adelante.",
    regimen: "Local"
  }, {
    de: "draußen / drinnen",
    pron: "dráu-sen  drí-nen",
    es: "afuera / adentro",
    type: "Adverbio",
    category: "Ortsadverbien",
    exampleSentenceDe: "Das Wetter ist schön. Wir sind draußen.",
    exampleSentenceEs: "El tiempo es bueno. Estamos afuera.",
    regimen: "Lugar"
  }, {
    de: "sehr",
    pron: "zéa",
    es: "muy",
    type: "Adverbio",
    category: "Gradadverbien",
    exampleSentenceDe: "Das Wetter ist sehr gut.",
    exampleSentenceEs: "El tiempo está muy bueno.",
    regimen: "Intensificador"
  }, {
    de: "viel / wenig",
    pron: "fil  vé-nij",
    es: "mucho / poco",
    type: "Adverbio",
    category: "Gradadverbien",
    exampleSentenceDe: "Ich trinke viel Wasser.",
    exampleSentenceEs: "Bebo mucha agua.",
    regimen: "Cantidad"
  }, {
    de: "wer?",
    pron: "vea",
    es: "¿quién?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wer ist das?",
    exampleSentenceEs: "¿Quién es ese/esa?",
    regimen: "Solo personas, nom."
  }, {
    de: "was?",
    pron: "vas",
    es: "¿qué?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Was ist das?",
    exampleSentenceEs: "¿Qué es eso?",
    regimen: "Invariable"
  }, {
    de: "wo?",
    pron: "vo",
    es: "¿dónde?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wo ist die Toilette?",
    exampleSentenceEs: "¿Dónde está el baño?",
    regimen: "Lugar, sin movimiento"
  }, {
    de: "wann?",
    pron: "van",
    es: "¿cuándo?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wann kommst du?",
    exampleSentenceEs: "¿Cuándo vienes?",
    regimen: "V al final"
  }, {
    de: "warum?",
    pron: "va-rúm",
    es: "¿por qué?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Warum bist du hier?",
    exampleSentenceEs: "¿Por qué estás aquí?",
    regimen: "Invariable, posición 1"
  }, {
    de: "wie?",
    pron: "ví",
    es: "¿cómo?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wie geht es Ihnen?",
    exampleSentenceEs: "¿Cómo está usted?",
    regimen: "Posición 1"
  }, {
    de: "woher?",
    pron: "vo-jéa",
    es: "¿de dónde?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Woher kommst du?",
    exampleSentenceEs: "¿De dónde vienes?",
    regimen: "+ kommen aus"
  }, {
    de: "wohin?",
    pron: "vo-hín",
    es: "¿a dónde?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Wohin gehst du?",
    exampleSentenceEs: "¿A dónde vas?",
    regimen: "Con verbos de movimiento"
  }, {
    de: "welcher?",
    pron: "vél-chea",
    es: "¿cuál?",
    type: "Pronombre interrogativo",
    category: "W-Fragen",
    exampleSentenceDe: "Welcher Bus ist das?",
    exampleSentenceEs: "¿Cuál es ese autobús?",
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
    exampleSentenceEs: "Por las mañanas siempre bebo té."
  }, {
        de: "abends",
    pron: "a-bents",
    es: "por las tardes/noches",
    type: "Adverbio",
    category: "Häufigkeit",
    en: "a crescent moon with stars",
    exampleSentenceDe: "Abends lese ich ein Buch.",
    exampleSentenceEs: "Por las noches leo un libro."
  }]
},
{
  id: 13,
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
    regimen: "No afecta orden"
  }, {
    de: "oder",
    pron: "ó-dea",
    es: "o (alternativa)",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Möchtest du Tee oder Kaffee?",
    exampleSentenceEs: "¿Quieres té o café?",
    regimen: "No cuenta posición"
  }, {
    de: "aber",
    pron: "á-bea",
    es: "pero",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Ich habe Hunger, aber ich habe keine Zeit.",
    exampleSentenceEs: "Tengo hambre, pero no tengo tiempo.",
    regimen: "No cuenta posición"
  }, {
    de: "denn",
    pron: "den",
    es: "porque / pues",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Ich habe Hunger, denn ich esse gern.",
    exampleSentenceEs: "Tengo hambre, pues me gusta comer.",
    regimen: "No cambia el orden"
  }, {
    de: "sondern",
    pron: "són-dean",
    es: "sino (que)",
    type: "Conector (Posición 0)",
    category: "Konnektoren",
    exampleSentenceDe: "Ich bin nicht müde, sondern ich bin hungrig.",
    exampleSentenceEs: "No estoy cansado, sino que tengo hambre.",
    regimen: "Tras negación (nicht...)"
  }, {
    de: "für",
    pron: "füa",
    es: "para / por",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Das Geschenk ist für dich.",
    exampleSentenceEs: "El regalo es para ti.",
    regimen: "+ Akkusativ"
  }, {
    de: "ohne",
    pron: "ó-ne",
    es: "sin",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich trinke Kaffee ohne Zucker.",
    exampleSentenceEs: "Bebo café sin azúcar.",
    regimen: "+ Akkusativ"
  }, {
    de: "durch",
    pron: "durj",
    es: "a través de / por",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Wir gehen durch den Park.",
    exampleSentenceEs: "Nosotros vamos por el parque.",
    regimen: "+ Akkusativ"
  }, {
    de: "gegen",
    pron: "gué-guen",
    es: "contra / hacia (hora)",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Es ist gegen 10 Uhr.",
    exampleSentenceEs: "Son las 10 en punto.",
    regimen: "+ Akkusativ"
  }, {
    de: "um",
    pron: "um",
    es: "a las (hora) / alrededor de",
    type: "Preposición (Akk)",
    category: "Präpositionen",
    exampleSentenceDe: "Der Zug kommt um acht Uhr an.",
    exampleSentenceEs: "El tren llega a las ocho en punto.",
    regimen: "+ Akkusativ"
  }, {
    de: "mit",
    pron: "mit",
    es: "con",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich gehe mit meinem Freund.",
    exampleSentenceEs: "Voy con mi amigo.",
    regimen: "⚠️ Obliga Dativo"
  }, {
    de: "nach",
    pron: "naj",
    es: "hacia / después de",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Nach dem Essen gehe ich nach Hause.",
    exampleSentenceEs: "Después de la comida, voy a casa.",
    regimen: "+ Dativo"
  }, {
    de: "aus",
    pron: "áus",
    es: "de (origen / material)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich komme aus Spanien.",
    exampleSentenceEs: "Yo vengo de España.",
    regimen: "+ Dativo"
  }, {
    de: "bei",
    pron: "bái",
    es: "en casa de / en (empresa)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich bin bei meiner Freundin.",
    exampleSentenceEs: "Yo estoy en casa de mi amiga.",
    regimen: "+ Dativo"
  }, {
    de: "von",
    pron: "fon",
    es: "de (procedencia / autor)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Das Buch ist von Anna.",
    exampleSentenceEs: "El libro es de Anna.",
    regimen: "+ Dativo"
  }, {
    de: "zu",
    pron: "tsu",
    es: "hacia (lugares / personas)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich gehe zu meiner Mutter.",
    exampleSentenceEs: "Voy hacia mi madre.",
    regimen: "+ Dativo"
  }, {
    de: "seit",
    pron: "sait",
    es: "desde (tiempo)",
    type: "Preposición (Dat)",
    category: "Präpositionen",
    exampleSentenceDe: "Ich wohne seit einem Jahr in Berlin.",
    exampleSentenceEs: "Vivo desde hace un año en Berlín.",
    regimen: "+ Dativo"
  }, {
    de: "in",
    pron: "in",
    es: "en / dentro de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Ich bin in der Schule.",
    exampleSentenceEs: "Yo estoy en la escuela.",
    regimen: "Wo=Dat, Wohin=Akk"
  }, {
    de: "an",
    pron: "an",
    es: "en (borde / fechas)",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Ich bin am Montag in Berlin.",
    exampleSentenceEs: "Yo estoy el lunes en Berlín.",
    regimen: "Wo?=Dat, Wohin?=Akk"
  }, {
    de: "auf",
    pron: "áuf",
    es: "sobre (con contacto)",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist auf dem Tisch.",
    exampleSentenceEs: "El libro está sobre la mesa.",
    regimen: "Wo:Dat/Wohin:Akk"
  }, {
    de: "unter",
    pron: "ún-tea",
    es: "debajo de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist unter dem Tisch.",
    exampleSentenceEs: "El libro está debajo de la mesa.",
    regimen: "Wo=Dat, Wohin=Akk"
  }, {
    de: "über",
    pron: "ú-ba",
    es: "sobre (sin contacto) / acerca de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Der Mann spricht über die Familie.",
    exampleSentenceEs: "El hombre habla sobre la familia.",
    regimen: "Akk=movim./Dat=lugar"
  }, {
    de: "neben",
    pron: "né-ben",
    es: "al lado de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Der Stuhl ist neben dem Tisch.",
    exampleSentenceEs: "La silla está al lado de la mesa.",
    regimen: "Wo?=Dat, Wohin?=Akk"
  }, {
    de: "zwischen",
    pron: "tsví-shen",
    es: "entre",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist zwischen dem Tisch und dem Stuhl.",
    exampleSentenceEs: "El libro está entre la mesa y la silla.",
    regimen: "Akk:movim./Dat:lugar"
  }, {
    de: "vor",
    pron: "fó-a",
    es: "delante de / antes de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Vor dem Haus ist ein Baum.",
    exampleSentenceEs: "Delante de la casa hay un árbol.",
    regimen: "Wo?=Dat, Wohin?=Akk"
  }, {
    de: "hinter",
    pron: "jín-tea",
    es: "detrás de",
    type: "Prep. Mixta (Dat/Akk)",
    category: "Wechselpräpositionen",
    exampleSentenceDe: "Das Buch ist hinter dem Tisch.",
    exampleSentenceEs: "El libro está detrás de la mesa.",
    regimen: "Wo?+Dat, Wohin?+Akk"
  }, {
    de: "obwohl",
    pron: "op-vól",
    es: "aunque",
    type: "Conector Subordinante",
    category: "Nebensätze",
    exampleSentenceDe: "Ich gehe spazieren, obwohl es regnet.",
    exampleSentenceEs: "Salgo a pasear, aunque llueve.",
    regimen: "Verbo al final"
  }, {
    de: "wenn",
    pron: "ven",
    es: "si(condicional)",
    type: "Conector Subordinante",
    category: "Nebensätze",
    exampleSentenceDe: "Wenn ich Zeit habe, lerne ich Deutsch.",
    exampleSentenceEs: "Si tengo tiempo, aprendo alemán.",
    regimen: "Verbo al final"
  }, {
    de: "als",
    pron: "als",
    es: "cuando",
    type: "Conector Subordinante",
    category: "Nebensätze",
    exampleSentenceDe: "Ich bin klein, als ich Kind war.",
    exampleSentenceEs: "Soy bajo, cuando era niño.",
    regimen: "Verbo al final"
  }, {
    de: "deshalb",
    pron: "des-hálp",
    es: "por eso",
    type: "Conector Posición 1",
    category: "Konnektoren",
    exampleSentenceDe: "Ich habe Hunger. Deshalb esse ich Pizza.",
    exampleSentenceEs: "Tengo hambre. Por eso como pizza.",
    regimen: "Verbo en pos.2 tras él"
  }, {
    de: "trotzdem",
    pron: "tróts-dem",
    es: "sin embargo",
    type: "Conector Posición 1",
    category: "Konnektoren",
    exampleSentenceDe: "Es regnet. Trotzdem gehe ich spazieren.",
    exampleSentenceEs: "Está lloviendo. Sin embargo, voy a pasear.",
    regimen: "Ocupa posición 1, verbo pos.2"
  }, {
    de: "außerdem",
    pron: "áu-sea-dem",
    es: "además",
    type: "Conector Posición 1",
    category: "Konnektoren",
    exampleSentenceDe: "Ich trinke Kaffee. Außerdem trinke ich Tee.",
    exampleSentenceEs: "Bebo café. Además, bebo té.",
    regimen: "Verbo en posición 1"
  }, {
    de: "nämlich",
    pron: "ném-lij",
    es: "es decir",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Ich habe ein Problem, nämlich: Ich habe keinen Hunger.",
    exampleSentenceEs: "Tengo un problema, es decir: No tengo hambre.",
    regimen: "Explica motivo"
  }, {
    de: "doch",
    pron: "doj",
    es: "sí (rechaza negación)",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Du bist müde. Nein! Ich bin doch nicht müde.",
    exampleSentenceEs: "Estás cansado. ¡No! Sí que no estoy cansado.",
    regimen: "Contradice negación"
  }, {
    de: "mal",
    pron: "mal",
    es: "(Partícula de énfasis)",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Das ist mal gut.",
    exampleSentenceEs: "Esto está bien, ¡eh! / Esto sí que está bien.",
    regimen: "Suaviza imperativo"
  }, {
    de: "ja",
    pron: "yá",
    es: "sí (Partícula de énfasis)",
    type: "Partícula",
    category: "Partikeln",
    exampleSentenceDe: "Ja, das ist gut.",
    exampleSentenceEs: "Sí, eso está bien.",
    regimen: "Énfasis, sin traducción literal"
  }]
},
{
  id: 3,
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
    plural: "die Häuser"
  }, {
    de: "die Wohnung",
    pron: "di vó-nung",
    es: "el apartamento",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    exampleSentenceDe: "Ich habe eine Wohnung. Die Wohnung ist groß.",
    exampleSentenceEs: "Tengo un apartamento. El apartamento es grande.",
    plural: "die Wohnungen"
  }, {
    de: "das Hochhaus",
    pron: "das jój-jaus",
    es: "edificio de gran altura",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    exampleSentenceDe: "Das Hochhaus ist groß.",
    exampleSentenceEs: "El edificio de gran altura es grande.",
    plural: "die Hochhäuser"
  }, {
    de: "die Treppe",
    pron: "di tré-pe",
    es: "la escalera",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    exampleSentenceDe: "Die Treppe ist hoch.",
    exampleSentenceEs: "La escalera es alta.",
    plural: "die Treppen"
  }, {
    de: "der Aufzug / Lift",
    pron: "dea áuf-tsuk  lift",
    es: "el ascensor",
    type: "Sustantivo (Masc)",
    category: "Gebäude",
    exampleSentenceDe: "Der Aufzug ist neu.",
    exampleSentenceEs: "El ascensor es nuevo.",
    plural: "die Aufzüge"
  }, {
    de: "der Stock",
    pron: "dea shtok",
    es: "el piso / planta",
    type: "Sustantivo",
    category: "Gebäude",
    exampleSentenceDe: "Ich wohne in dem ersten Stock.",
    exampleSentenceEs: "Vivo en el primer piso.",
    plural: "die Stockwerke"
  }, {
    de: "das Erdgeschoss",
    pron: "das éat-gue-shós",
    es: "la planta baja",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    exampleSentenceDe: "Die Wohnung ist im Erdgeschoss.",
    exampleSentenceEs: "El apartamento está en la planta baja.",
    plural: "die Erdgeschosse"
  }, {
    de: "die Miete",
    pron: "di mí-te",
    es: "el alquiler",
    type: "Sustantivo (Fem)",
    category: "Mieten",
    exampleSentenceDe: "Die Miete ist teuer.",
    exampleSentenceEs: "El alquiler es caro.",
    plural: "die Mieten"
  }, {
    de: "die Nebenkosten",
    pron: "di né-ben-kós-ten",
    es: "gastos adicionales",
    type: "Sustantivo (Plural)",
    category: "Mieten",
    exampleSentenceDe: "Ich zahle die Nebenkosten im Monat.",
    exampleSentenceEs: "Yo pago los gastos adicionales al mes.",
    plural: "die Nebenkosten"
  }, {
    de: "die Heizkosten",
    pron: "di jáits-kos-ten",
    es: "gastos de calefacción",
    type: "Sustantivo (Plural)",
    category: "Mieten",
    exampleSentenceDe: "Die Heizkosten sind hoch.",
    exampleSentenceEs: "Los gastos de calefacción son altos.",
    plural: "die Heizkosten"
  }, {
    de: "der Mieter / Vermieter",
    pron: "dea mí-ta  fea-mí-ta",
    es: "inquilino / arrendador",
    type: "Sustantivo",
    category: "Mieten",
    exampleSentenceDe: "Ich bin der Mieter. Mein Vermieter wohnt in Berlin.",
    exampleSentenceEs: "Yo soy el inquilino. Mi arrendador vive en Berlín.",
    plural: "die Mieter / Vermieter"
  }, {
    de: "mieten / vermieten",
    pron: "mí-ten  fea-mí-ten",
    es: "alquilar / dar en alquiler",
    type: "Verbo",
    category: "Mieten",
    exampleSentenceDe: "Ich miete eine Wohnung.",
    exampleSentenceEs: "Yo alquilo un apartamento.",
    regimen: "+ Akkusativ; ver- insep."
  }, {
    de: "umziehen",
    pron: "úm-tsí-en",
    es: "mudarse",
    type: "Verbo separable",
    category: "Mieten",
    exampleSentenceDe: "Ich ziehe in eine neue Wohnung um.",
    exampleSentenceEs: "Me mudo a un apartamento nuevo.",
    regimen: "Separable (um-), sein"
  }, {
    de: "einziehen / ausziehen",
    pron: "áin-tsí-en  áus-tsí-en",
    es: "mudarse a / de",
    type: "Verbo",
    category: "Mieten",
    exampleSentenceDe: "Ich ziehe in eine neue Wohnung ein.",
    exampleSentenceEs: "Me mudo a un apartamento nuevo.",
    regimen: "Separables (ein-/aus-)"
  }, {
    de: "der Umzug",
    pron: "dea úm-tsuk",
    es: "la mudanza",
    type: "Sustantivo (Masc)",
    category: "Mieten",
    exampleSentenceDe: "Der Umzug ist morgen.",
    exampleSentenceEs: "La mudanza es mañana.",
    plural: "die Umzüge"
  }, {
    de: "die Anzeige",
    pron: "di án-tsai-gue",
    es: "el anuncio",
    type: "Sustantivo (Fem)",
    category: "Mieten",
    exampleSentenceDe: "Ich sehe die Anzeige.",
    exampleSentenceEs: "Yo veo el anuncio.",
    plural: "die Anzeigen"
  }, {
    de: "besichtigen",
    pron: "be-síj-ti-guen",
    es: "inspeccionar / visita",
    type: "Verbo",
    category: "Mieten",
    exampleSentenceDe: "Wir besichtigen das Schloss am Samstag.",
    exampleSentenceEs: "Visitamos el castillo el sábado.",
    regimen: "+ Akkusativ"
  }, {
    de: "der Schlüssel",
    pron: "dea shlú-sel",
    es: "la llave",
    type: "Sustantivo (Masc)",
    category: "Mieten",
    exampleSentenceDe: "Ich habe den Schlüssel. Der Schlüssel ist hier.",
    exampleSentenceEs: "Tengo la llave. La llave está aquí.",
    plural: "die Schlüssel"
  }, {
    de: "das Zimmer",
    pron: "das tsí-mea",
    es: "la habitación",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das Zimmer ist groß.",
    exampleSentenceEs: "La habitación es grande.",
    plural: "die Zimmer"
  }, {
    de: "die Küche",
    pron: "di kü-je",
    es: "la cocina",
    type: "Sustantivo (Fem)",
    category: "Räume",
    exampleSentenceDe: "Ich bin in der Küche.",
    exampleSentenceEs: "Yo estoy en la cocina.",
    plural: "die Küchen"
  }, {
    de: "das Bad",
    pron: "das bat",
    es: "el baño",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das Bad ist sauber.",
    exampleSentenceEs: "El baño está limpio.",
    plural: "die Bäder"
  }, {
    de: "das Schlafzimmer",
    pron: "das shláf-tsi-mea",
    es: "el dormitorio",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das Schlafzimmer ist groß.",
    exampleSentenceEs: "El dormitorio es grande.",
    plural: "die Schlafzimmer"
  }, {
    de: "das Wohnzimmer",
    pron: "das vón-tsi-mea",
    es: "la sala de estar",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das ist das Wohnzimmer. Das Wohnzimmer ist groß.",
    exampleSentenceEs: "Esta es la sala de estar. La sala de estar es grande.",
    plural: "die Wohnzimmer"
  }, {
    de: "das Kinderzimmer",
    pron: "das kín-dea-tsí-mea",
    es: "cuarto de niños",
    type: "Sustantivo (Neutro)",
    category: "Räume",
    exampleSentenceDe: "Das ist das Kinderzimmer.",
    exampleSentenceEs: "Este es el cuarto de niños.",
    plural: "die Kinderzimmer"
  }, {
    de: "der Flur",
    pron: "dea flú-a",
    es: "pasillo / corredor",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Ich bin im Flur.",
    exampleSentenceEs: "Yo estoy en el pasillo.",
    plural: "die Flure"
  }, {
    de: "der Balkon",
    pron: "dea bal-kón",
    es: "el balcón",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Ich habe einen Balkon. Der Balkon ist groß.",
    exampleSentenceEs: "Tengo un balcón. El balcón es grande.",
    plural: "die Balkone"
  }, {
    de: "die Terrasse",
    pron: "di te-rá-se",
    es: "la terraza",
    type: "Sustantivo (Fem)",
    category: "Räume",
    exampleSentenceDe: "Die Terrasse ist groß.",
    exampleSentenceEs: "La terraza es grande.",
    plural: "die Terrassen"
  }, {
    de: "der Garten",
    pron: "dea gár-ten",
    es: "el jardín",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Ich habe einen Garten. Der Garten ist schön.",
    exampleSentenceEs: "Tengo un jardín. El jardín es bonito.",
    plural: "die Gärten"
  }, {
    de: "die Garage",
    pron: "di ga-rá-she",
    es: "el garaje",
    type: "Sustantivo (Fem)",
    category: "Räume",
    exampleSentenceDe: "Ich habe eine Garage. Die Garage ist groß.",
    exampleSentenceEs: "Tengo un garaje. El garaje es grande.",
    plural: "die Garagen"
  }, {
    de: "der Keller",
    pron: "dea ké-lea",
    es: "el sótano",
    type: "Sustantivo (Masc)",
    category: "Räume",
    exampleSentenceDe: "Der Keller ist unter dem Haus.",
    exampleSentenceEs: "El sótano está debajo de la casa.",
    plural: "die Keller"
  }, {
    de: "das Licht",
    pron: "das lijt",
    es: "la luz",
    type: "Sustantivo (Neutro)",
    category: "Aktivitäten",
    exampleSentenceDe: "Das Licht ist an.",
    exampleSentenceEs: "La luz está encendida.",
    plural: "die Lichter"
  }, {
    de: "anmachen / ausmachen",
    pron: "án-ma-jen  áus-ma-jen",
    es: "encender / apagar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich mache das Licht an.",
    exampleSentenceEs: "Yo enciendo la luz.",
    regimen: "Separable, +Akkusativ"
  }, {
    de: "öffnen / schließen",
    pron: "óf-nen  shlí-sen",
    es: "abrir / cerrar (formal)",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich öffne die Tür.",
    exampleSentenceEs: "Yo abro la puerta.",
    regimen: "+ Akkusativ"
  }, {
    de: "aufmachen / zumachen",
    pron: "áuf-ma-jen  tsú-ma-jen",
    es: "abrir / cerrar",
    type: "Verbo separable",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich mache die Tür auf.",
    exampleSentenceEs: "Yo abro la puerta.",
    regimen: "Separable (auf-/zu-) +Akk"
  }, {
    de: "putzen / reinigen",
    pron: "pút-tsen  ráy-ni-guen",
    es: "limpiar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich putze das Zimmer.",
    exampleSentenceEs: "Yo limpio la habitación.",
    regimen: "+ Akkusativ"
  }, {
    de: "kaputt",
    pron: "ka-pút",
    es: "roto / descompuesto",
    type: "Adjetivo",
    category: "Aktivitäten",
    exampleSentenceDe: "Mein Handy ist kaputt.",
    exampleSentenceEs: "Mi teléfono está roto.",
    regimen: "≠ ganz"
  }, {
    de: "reparieren",
    pron: "re-pa-rí-ren",
    es: "reparar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich kann das Fahrrad reparieren.",
    exampleSentenceEs: "Yo puedo reparar la bicicleta.",
    regimen: "+ Akkusativ"
  }, {
    de: "das Möbelstück",
    pron: "das mö-bel-shtük",
    es: "el mueble",
    type: "Sustantivo",
    category: "Möbel",
    exampleSentenceDe: "Das Möbelstück ist neu.",
    exampleSentenceEs: "El mueble es nuevo.",
    plural: "die Möbelstücke"
  }, {
    de: "der Tisch",
    pron: "dea tish",
    es: "la mesa",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Das ist der Tisch.",
    exampleSentenceEs: "Esta es la mesa.",
    plural: "die Tische"
  }, {
    de: "der Stuhl",
    pron: "dea shtúl",
    es: "la silla",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Der Stuhl ist neu.",
    exampleSentenceEs: "La silla es nueva.",
    plural: "die Stühle"
  }, {
    de: "der Schrank",
    pron: "dea shránk",
    es: "el armario",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Das ist der Schrank. Der Schrank ist groß.",
    exampleSentenceEs: "Este es el armario. El armario es grande.",
    plural: "die Schränke"
  }, {
    de: "das Bett",
    pron: "das bet",
    es: "la cama",
    type: "Sustantivo (Neutro)",
    category: "Möbel",
    exampleSentenceDe: "Das Bett ist groß.",
    exampleSentenceEs: "La cama es grande.",
    plural: "die Betten"
  }, {
    de: "der Spiegel",
    pron: "dea shpí-guel",
    es: "el espejo",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Ich sehe mich im Spiegel.",
    exampleSentenceEs: "Me veo en el espejo.",
    plural: "die Spiegel"
  }, {
    de: "der Teppich",
    pron: "dea té-pij",
    es: "la alfombra",
    type: "Sustantivo (Masc)",
    category: "Möbel",
    exampleSentenceDe: "Der Teppich ist groß.",
    exampleSentenceEs: "La alfombra es grande.",
    plural: "die Teppiche"
  }, {
    de: "gemütlich",
    pron: "gue-mút-lij",
    es: "acogedor",
    type: "Adjetivo",
    category: "Adjektive",
    exampleSentenceDe: "Das Zimmer ist gemütlich.",
    exampleSentenceEs: "La habitación es acogedora.",
    regimen: "≠ unbehaglich"
  },
  {
    de: "aufräumen",
    pron: "áuf-roi-men",
    es: "ordenar / recoger",
    type: "Verbo",
    category: "Wohnen",
    regimen: "Separable (auf-) / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Müll",
    pron: "dea mül",
    es: "la basura",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "-",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Eimer",
    pron: "dea ái-ma",
    es: "el cubo / balde",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "die Eimer",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Staubsauger",
    pron: "dea shtáup-zau-ga",
    es: "la aspiradora",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "die Staubsauger",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Waschmaschine",
    pron: "di vásh-ma-shi-ne",
    es: "la lavadora",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Waschmaschinen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Spülmaschine",
    pron: "di shpül-ma-shi-ne",
    es: "el lavavajillas",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Spülmaschinen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Waschbecken",
    pron: "das vásh-be-ken",
    es: "el lavamanos",
    type: "Sustantivo (Neutro)",
    category: "Haushalt",
    plural: "die Waschbecken",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Fernseher",
    pron: "dea férn-ze-ea",
    es: "el televisor",
    type: "Sustantivo (Masc)",
    category: "Wohnen",
    plural: "die Fernseher",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Kühlschrank",
    pron: "dea kül-shrank",
    es: "el refrigerador",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Kühlschränke",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Sofa",
    pron: "das zó-fa",
    es: "el sofá",
    type: "Sustantivo (Neutro)",
    category: "Wohnen",
    plural: "die Sofas",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Sessel",
    pron: "dea zé-sel",
    es: "el sillón",
    type: "Sustantivo (Masc)",
    category: "Wohnen",
    plural: "die Sessel",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Lampe",
    pron: "di lám-pe",
    es: "la lámpara",
    type: "Sustantivo (Fem)",
    category: "Wohnen",
    plural: "die Lampen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Radio",
    pron: "das rá-dio",
    es: "la radio",
    type: "Sustantivo (Neutro)",
    category: "Wohnen",
    plural: "die Radios",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Herd",
    pron: "dea jeat",
    es: "la estufa / el fogón",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Herde",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Ofen",
    pron: "dea ó-fen",
    es: "el horno",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Öfen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Mikrowelle",
    pron: "di mi-kro-vé-le",
    es: "el microondas",
    type: "Sustantivo (Fem)",
    category: "Küche",
    plural: "die Mikrowellen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Kaffeemaschine",
    pron: "di ka-fé-ma-shi-ne",
    es: "la cafetera",
    type: "Sustantivo (Fem)",
    category: "Küche",
    plural: "die Kaffeemaschinen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Topf",
    pron: "dea topf",
    es: "la olla",
    type: "Sustantivo (Masc)",
    category: "Küche",
    plural: "die Töpfe",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Pfanne",
    pron: "di pfá-ne",
    es: "la sartén",
    type: "Sustantivo (Fem)",
    category: "Küche",
    plural: "die Pfannen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Tür",
    pron: "di tür",
    es: "la puerta",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    plural: "die Türen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Fenster",
    pron: "das féns-tea",
    es: "la ventana",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    plural: "die Fenster",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Wand",
    pron: "di vant",
    es: "la pared",
    type: "Sustantivo (Fem)",
    category: "Gebäude",
    plural: "die Wände",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Dach",
    pron: "das daj",
    es: "el techo",
    type: "Sustantivo (Neutro)",
    category: "Gebäude",
    plural: "die Dächer",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Kissen",
    pron: "das kí-sen",
    es: "la almohada / cojín",
    type: "Sustantivo (Neutro)",
    category: "Wohnen",
    plural: "die Kissen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Decke",
    pron: "di dé-ke",
    es: "la manta / cobija",
    type: "Sustantivo (Fem)",
    category: "Wohnen",
    plural: "die Decken",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }]
},
{
  id: 5,
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
    plural: "die Essen"
  }, {
    de: "das Frühstück",
    pron: "das frú-shtuk",
    es: "desayuno",
    type: "Sustantivo",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse das Frühstück.",
    exampleSentenceEs: "Yo como el desayuno.",
    plural: "die Frühstücke"
  }, {
    de: "das Mittagessen",
    pron: "das mí-tak-é-sen",
    es: "almuerzo",
    type: "Sustantivo (Neutro)",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse das Mittagessen um 13 Uhr.",
    exampleSentenceEs: "Yo como el almuerzo a las 13:00.",
    plural: "die Mittagessen"
  }, {
    de: "zu Mittag essen",
    pron: "tsu mí-tak é-sen",
    es: "almorzar",
    type: "Frase",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse zu Mittag.",
    exampleSentenceEs: "Yo almuerzo.",
    regimen: "Verbo separable"
  }, {
    de: "das Abendessen",
    pron: "das á-bent-é-sen",
    es: "cena",
    type: "Sustantivo (Neutro)",
    category: "Mahlzeiten",
    exampleSentenceDe: "Das Abendessen ist um 19 Uhr.",
    exampleSentenceEs: "La cena es a las 19:00.",
    plural: "die Abendessen"
  }, {
    de: "zu Abend essen",
    pron: "tsu á-bent é-sen",
    es: "cenar",
    type: "Frase",
    category: "Mahlzeiten",
    exampleSentenceDe: "Ich esse zu Abend.",
    exampleSentenceEs: "Yo ceno.",
    regimen: "Verbo al final"
  }, {
    de: "der Hunger",
    pron: "dea hún-gua",
    es: "hambre",
    type: "Sustantivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich habe Hunger.",
    exampleSentenceEs: "Tengo hambre.",
    plural: "kein Plural"
  }, {
    de: "der Durst",
    pron: "dea dúrst",
    es: "sed",
    type: "Sustantivo",
    category: "Gefühle",
    exampleSentenceDe: "Ich habe der Durst.",
    exampleSentenceEs: "Tengo sed.",
    plural: "die Durste"
  }, {
    de: "das Lebensmittel",
    pron: "das lé-bens-mi-tel",
    es: "alimento",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das Lebensmittel ist gut.",
    exampleSentenceEs: "El alimento es bueno.",
    plural: "die Lebensmittel"
  }, {
    de: "das Brot",
    pron: "das brot",
    es: "pan",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das Brot ist gut.",
    exampleSentenceEs: "El pan está bueno.",
    plural: "die Brote"
  }, {
    de: "die Butter",
    pron: "di bú-tea",
    es: "mantequilla",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich brauche die Butter.",
    exampleSentenceEs: "Yo necesito la mantequilla.",
    plural: "die Buttersorten"
  }, {
    de: "der Käse",
    pron: "dea ké-se",
    es: "queso",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das ist der Käse. Der Käse ist gut.",
    exampleSentenceEs: "Este es el queso. El queso es bueno.",
    plural: "die Käse"
  }, {
    de: "das Fleisch",
    pron: "das flaish",
    es: "carne",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse das Fleisch.",
    exampleSentenceEs: "Yo como la carne.",
    plural: "die Fleischsorten"
  }, {
    de: "der Fisch",
    pron: "dea fish",
    es: "pescado",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Der Fisch ist gut.",
    exampleSentenceEs: "El pescado está bueno.",
    plural: "die Fische"
  }, {
    de: "die Kartoffel",
    pron: "di kaa-tó-fel",
    es: "papa",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse die Kartoffel.",
    exampleSentenceEs: "Yo como la papa.",
    plural: "die Kartoffeln"
  }, {
    de: "der Reis",
    pron: "dea ráis",
    es: "arroz",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Der Reis ist gut.",
    exampleSentenceEs: "El arroz está bueno.",
    plural: "die Reis"
  }, {
    de: "die Suppe",
    pron: "di sú-pe",
    es: "sopa",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse die Suppe.",
    exampleSentenceEs: "Yo como la sopa.",
    plural: "die Suppen"
  }, {
    de: "das Gemüse",
    pron: "das gue-mǘ-se",
    es: "verdura",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das Gemüse ist gut.",
    exampleSentenceEs: "La verdura es buena.",
    plural: "die Gemüse"
  }, {
    de: "das Obst",
    pron: "das ópst",
    es: "fruta",
    type: "Sustantivo (Neutro)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse das Obst. Das Obst ist gut.",
    exampleSentenceEs: "Yo como la fruta. La fruta es buena.",
    plural: "kein Plural"
  }, {
    de: "die Tomate",
    pron: "di to-má-te",
    es: "tomate",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Die Tomate ist rot.",
    exampleSentenceEs: "El tomate es rojo.",
    plural: "die Tomaten"
  }, {
    de: "der Apfel",
    pron: "dea áp-fel",
    es: "manzana",
    type: "Sustantivo (Masc)",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich esse den Apfel.",
    exampleSentenceEs: "Yo como la manzana.",
    plural: "die Äpfel"
  }, {
    de: "die Orange",
    pron: "di o-rán-she",
    es: "naranja",
    type: "Sustantivo (Fem)",
    category: "Lebensmittel",
    exampleSentenceDe: "Das ist eine Orange. Die Orange ist rot.",
    exampleSentenceEs: "Esto es una naranja. La naranja es roja.",
    plural: "die Orangen"
  }, {
    de: "der Kuchen",
    pron: "dea kú-jen",
    es: "pastel",
    type: "Sustantivo",
    category: "Lebensmittel",
    exampleSentenceDe: "Ich mag der Kuchen.",
    exampleSentenceEs: "Me gusta el pastel.",
    plural: "die Kuchen"
  }, {
    de: "das Getränk",
    pron: "das gue-trénk",
    es: "bebida",
    type: "Sustantivo (Neutro)",
    category: "Getränke",
    exampleSentenceDe: "Ich möchte das Getränk.",
    exampleSentenceEs: "Yo quiero la bebida.",
    plural: "die Getränke"
  }, {
    de: "das Wasser",
    pron: "das vá-sea",
    es: "agua",
    type: "Sustantivo",
    category: "Getränke",
    exampleSentenceDe: "Das Wasser ist kalt.",
    exampleSentenceEs: "El agua está fría.",
    plural: "die Wasser"
  }, {
    de: "der Kaffee",
    pron: "dea ká-fe",
    es: "café",
    type: "Sustantivo (Masc)",
    category: "Getränke",
    exampleSentenceDe: "Ich trinke gern den Kaffee.",
    exampleSentenceEs: "Me gusta beber el café.",
    plural: "die Kaffees"
  }, {
    de: "der Tee",
    pron: "dea té",
    es: "té",
    type: "Sustantivo (Masc)",
    category: "Getränke",
    exampleSentenceDe: "Ich trinke den Tee am Morgen.",
    exampleSentenceEs: "Bebo el té por la mañana.",
    plural: "die Tees"
  }, {
    de: "die Milch",
    pron: "di milj",
    es: "leche",
    type: "Sustantivo (Fem)",
    category: "Getränke",
    exampleSentenceDe: "Ich habe die Milch. Die Milch ist kalt.",
    exampleSentenceEs: "Tengo la leche. La leche está fría.",
    plural: "die Milch"
  }, {
    de: "das Bier",
    pron: "das bí-a",
    es: "cerveza",
    type: "Sustantivo",
    category: "Getränke",
    exampleSentenceDe: "Ich mag das Bier.",
    exampleSentenceEs: "Me gusta la cerveza.",
    plural: "die Biere"
  }, {
    de: "der Wein",
    pron: "dea vain",
    es: "vino",
    type: "Sustantivo",
    category: "Getränke",
    exampleSentenceDe: "Der Wein ist rot.",
    exampleSentenceEs: "El vino es tinto.",
    plural: "die Weine"
  }, {
    de: "der Teller",
    pron: "dea té-lea",
    es: "plato",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Der Teller ist groß.",
    exampleSentenceEs: "El plato es grande.",
    plural: "die Teller"
  }, {
    de: "die Tasse",
    pron: "di tá-se",
    es: "taza",
    type: "Sustantivo (Fem)",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe eine Tasse. Die Tasse ist klein.",
    exampleSentenceEs: "Tengo una taza. La taza es pequeña.",
    plural: "die Tassen"
  }, {
    de: "das Messer",
    pron: "das mé-sea",
    es: "cuchillo",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Das Messer ist neu.",
    exampleSentenceEs: "El cuchillo es nuevo.",
    plural: "die Messer"
  }, {
    de: "die Gabel",
    pron: "di gá-bel",
    es: "tenedor",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe die Gabel. Die Gabel ist auf dem Tisch.",
    exampleSentenceEs: "Tengo el tenedor. El tenedor está sobre la mesa.",
    plural: "die Gabeln"
  }, {
    de: "der Löffel",
    pron: "dea ló-fel",
    es: "cuchara",
    type: "Sustantivo",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe einen Löffel. Der Löffel ist klein.",
    exampleSentenceEs: "Tengo una cuchara. La cuchara es pequeña.",
    plural: "die Löffel"
  }, {
    de: "die Flasche",
    pron: "di flá-she",
    es: "botella",
    type: "Sustantivo (Fem)",
    category: "Geschirr",
    exampleSentenceDe: "Ich habe eine Flasche Wasser.",
    exampleSentenceEs: "Tengo una botella de agua.",
    plural: "die Flaschen"
  }, {
    de: "trinken / kochen",
    pron: "trín-ken  kó-jen",
    es: "beber / cocinar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich trinke Kaffee am Morgen.",
    exampleSentenceEs: "Yo bebo café por la mañana.",
    regimen: "+ Akkusativ"
  }, {
    de: "schmecken",
    pron: "shmé-ken",
    es: "saber (sabor)",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Das Essen schmeckt gut.",
    exampleSentenceEs: "La comida sabe bien.",
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "mögen",
    pron: "mö-guen",
    es: "gustar (comida)",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich mag Kaffee.",
    exampleSentenceEs: "Me gusta el café.",
    regimen: "+ Akkusativ"
  }, {
    de: "Ich möchte",
    pron: "íj mói-jte",
    es: "Me gustaría",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich möchte Wasser.",
    exampleSentenceEs: "Me gustaría agua.",
    regimen: "+ Infinitivo final"
  }, {
    de: "Was möchten Sie?",
    pron: "vas méj-ten si",
    es: "¿Qué le gustaría?",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Hallo! Was möchten Sie?",
    exampleSentenceEs: "¡Hola! ¿Qué le gustaría?",
    regimen: "Formal, Verb final"
  }, {
    de: "Ich hätte gern",
    pron: "ij jé-te guean",
    es: "Quisiera...",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich hätte gern einen Kaffee.",
    exampleSentenceEs: "Quisiera un café.",
    regimen: "+ Akkusativ"
  }, {
    de: "nehmen",
    pron: "né-men",
    es: "tomar / pedir",
    type: "Verbo",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich nehme einen Kaffee.",
    exampleSentenceEs: "Yo tomo un café.",
    regimen: "Irregular (nimmt) / + Akkusativ"
  }, {
    de: "das Restaurant",
    pron: "das res-to-rán",
    es: "restaurante",
    type: "Sustantivo (Neutro)",
    category: "Im Restaurant",
    exampleSentenceDe: "Das Restaurant ist neu.",
    exampleSentenceEs: "El restaurante es nuevo.",
    plural: "die Restaurants"
  }, {
    de: "die Speisekarte",
    pron: "di shpái-se-kár-te",
    es: "menú / carta",
    type: "Sustantivo (Fem)",
    category: "Im Restaurant",
    exampleSentenceDe: "Entschuldigung, die Speisekarte, bitte.",
    exampleSentenceEs: "Disculpe, el menú, por favor.",
    plural: "die Speisekarten"
  }, {
    de: "bestellen",
    pron: "be-shté-len",
    es: "pedir / ordenar",
    type: "Verbo",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich bestelle Pizza.",
    exampleSentenceEs: "Yo pido pizza.",
    regimen: "+ Akkusativ"
  }, {
    de: "Guten Appetit",
    pron: "gú-ten a-pe-tít",
    es: "¡Buen provecho!",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Guten Appetit!",
    exampleSentenceEs: "¡Buen provecho!",
    regimen: "Fijo, antes de comer"
  }, {
    de: "die Rechnung",
    pron: "di réj-nung",
    es: "la cuenta",
    type: "Sustantivo (Fem)",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich brauche die Rechnung bitte.",
    exampleSentenceEs: "Necesito la cuenta por favor.",
    plural: "die Rechnungen"
  }, {
    de: "bezahlen",
    pron: "be-tsá-len",
    es: "pagar",
    type: "Verbo",
    category: "Im Restaurant",
    exampleSentenceDe: "Ich bezahle die Rechnung.",
    exampleSentenceEs: "Yo pago la cuenta.",
    regimen: "+ Akkusativ"
  }, {
    de: "getrennt / zusammen",
    pron: "gue-trént  tsu-sá-men",
    es: "separado / juntos",
    type: "Adjetivo",
    category: "Im Restaurant",
    exampleSentenceDe: "Wir wohnen zusammen.",
    exampleSentenceEs: "Vivimos juntos.",
    regimen: "≠ zusammen / getrennt"
  }, {
    de: "Stimmt so",
    pron: "shtímt so",
    es: "Así está bien (propina)",
    type: "Frase",
    category: "Im Restaurant",
    exampleSentenceDe: "Stimmt so, danke.",
    exampleSentenceEs: "Así está bien, gracias.",
    regimen: "Fijo, al pagar"
  }, {
    de: "das Gericht",
    pron: "das gue-ríjt",
    es: "el plato preparado",
    type: "Sustantivo",
    category: "Kochen",
    exampleSentenceDe: "Das Gericht ist lecker.",
    exampleSentenceEs: "El plato preparado está rico.",
    plural: "die Gerichte"
  }, {
    de: "der Topf / die Pfanne",
    pron: "dea tópf  di pfá-ne",
    es: "la olla / la sartén",
    type: "Sustantivo",
    category: "Kochen",
    exampleSentenceDe: "Ich habe einen Topf. Der Topf ist neu.",
    exampleSentenceEs: "Tengo una olla. La olla es nueva.",
    plural: "die Töpfe / die Pfannen"
  }, {
    de: "probieren",
    pron: "pro-bí-ren",
    es: "probar (comida)",
    type: "Verbo",
    category: "Kochen",
    exampleSentenceDe: "Ich möchte das Brot probieren.",
    exampleSentenceEs: "Quiero probar el pan.",
    regimen: "+ Akkusativ"
  }, {
    de: "scharf / süß",
    pron: "shaaf  süs",
    es: "picante / dulce",
    type: "Adjetivo",
    category: "Geschmack",
    exampleSentenceDe: "Das Essen ist scharf. Die Süßigkeit ist süß.",
    exampleSentenceEs: "La comida es picante. El dulce es dulce.",
    regimen: "≠ süß / scharf"
  }, {
    de: "satt sein",
    pron: "sat záin",
    es: "estar lleno",
    type: "Frase",
    category: "Gefühle",
    exampleSentenceDe: "Ich bin satt.",
    exampleSentenceEs: "Yo estoy lleno.",
    regimen: "sein + adj"
  },
  {
    de: "backen",
    pron: "bá-ken",
    es: "hornear",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "braten",
    pron: "brá-ten",
    es: "freír / asar",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "grillen",
    pron: "grí-len",
    es: "asar a la parrilla",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "schneiden",
    pron: "shnái-den",
    es: "cortar",
    type: "Verbo",
    category: "Essen & Trinken",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Besteck",
    pron: "das be-shték",
    es: "los cubiertos",
    type: "Sustantivo (Neutro)",
    category: "Haushalt",
    plural: "die Bestecke",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Schüssel",
    pron: "di shü-sel",
    es: "el tazón / bol",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Schüsseln",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Glas",
    pron: "das glas",
    es: "el vaso / copa",
    type: "Sustantivo (Neutro)",
    category: "Haushalt",
    plural: "die Gläser",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Becher",
    pron: "dea bé-jea",
    es: "el vaso (plástico/cartón)",
    type: "Sustantivo (Masc)",
    category: "Haushalt",
    plural: "die Becher",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Serviette",
    pron: "di sea-vié-te",
    es: "la servilleta",
    type: "Sustantivo (Fem)",
    category: "Haushalt",
    plural: "die Servietten",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Pilz",
    pron: "dea pilts",
    es: "el champiñón",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Pilze",
    en: "brown mushroom",
    exampleSentenceDe: "Ich esse gern Pilze.",
    exampleSentenceEs: "Me gusta comer champiñones."
  }, {
        de: "die Nuss",
    pron: "di nus",
    es: "la nuez",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Nüsse",
    en: "brown walnut",
    exampleSentenceDe: "Der Kuchen hat Nüsse.",
    exampleSentenceEs: "El pastel tiene nueces."
  }, {
        de: "der Keks",
    pron: "dea keks",
    es: "la galleta",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Kekse",
    en: "chocolate chip cookie",
    exampleSentenceDe: "Möchtest du einen Keks?",
    exampleSentenceEs: "¿Quieres una galleta?"
  }, {
        de: "das Bonbon",
    pron: "das bong-bóng",
    es: "el caramelo",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Bonbons",
    en: "wrapped sweet candy",
    exampleSentenceDe: "Das Kind isst ein Bonbon.",
    exampleSentenceEs: "El niño come un caramelo."
  }, {
        de: "die Schokolade",
    pron: "di sho-ko-lá-de",
    es: "el chocolate",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Schokoladen",
    en: "brown chocolate bar",
    exampleSentenceDe: "Ich liebe Schokolade.",
    exampleSentenceEs: "Amo el chocolate."
  }, {
        de: "die Sahne",
    pron: "di zá-ne",
    es: "la crema / nata",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Sahnen",
    en: "bowl of whipped cream",
    exampleSentenceDe: "Ich trinke Kaffee mit Sahne.",
    exampleSentenceEs: "Bebo café con nata."
  }, {
        de: "der Pfirsich",
    pron: "dea pfír-sij",
    es: "el durazno",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Pfirsiche",
    en: "fresh peach fruit",
    exampleSentenceDe: "Der Pfirsich ist muy dulce.",
    exampleSentenceEs: "El durazno es muy dulce."
  }, {
        de: "die Melone",
    pron: "di me-ló-ne",
    es: "el melón",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Melonen",
    en: "slice of watermelon",
    exampleSentenceDe: "Im Sommer esse ich Melone.",
    exampleSentenceEs: "En verano como melón."
  }, {
        de: "das Mehl",
    pron: "das mel",
    es: "la harina",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Mehle",
    en: "paper bag of white flour",
    exampleSentenceDe: "Wir brauchen Mehl für das Brot.",
    exampleSentenceEs: "Necesitamos harina para el pan."
  }, {
        de: "das Gewürz",
    pron: "das gue-vürts",
    es: "la especia",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Gewürze",
    en: "small bowl of red spice powder",
    exampleSentenceDe: "Das Essen braucht mehr Gewürz.",
    exampleSentenceEs: "La comida necesita más especias."
  }, {
        de: "die Kirsche",
    pron: "di kír-she",
    es: "la cereza",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Kirschen",
    en: "two red cherries",
    exampleSentenceDe: "Die Kirsche ist rot.",
    exampleSentenceEs: "La cereza es roja."
  }, {
        de: "die Pflaume",
    pron: "di pfláu-me",
    es: "la ciruela",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Pflaumen",
    en: "purple plum",
    exampleSentenceDe: "Diese Pflaume ist lecker.",
    exampleSentenceEs: "Esta ciruela es delicosa."
  }, {
        de: "der Senf",
    pron: "dea senf",
    es: "la mostaza",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Senfe",
    en: "yellow mustard bottle",
    exampleSentenceDe: "Ich esse Wurst mit Senf.",
    exampleSentenceEs: "Como embutido con mostaza."
  }, {
        de: "die Mayonnaise",
    pron: "di ma-yo-né-ze",
    es: "la mayonesa",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Mayonnaisen",
    en: "jar of white mayonnaise",
    exampleSentenceDe: "Pommes frites mit Mayonnaise, bitte.",
    exampleSentenceEs: "Papas fritas con mayonesa, por favor."
  }, {
        de: "der Ketchup",
    pron: "dea két-chup",
    es: "el kétchup",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Ketchups",
    en: "red ketchup bottle",
    exampleSentenceDe: "Das Kind mag Ketchup.",
    exampleSentenceEs: "Al niño le gusta el kétchup."
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
    exampleSentenceEs: "Yo como un huevo cocido de desayuno."
  }, {
        de: "das Salz",
    pron: "das salts",
    es: "la sal",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Salze",
    en: "a salt shaker",
    exampleSentenceDe: "Die Suppe braucht mehr Salz.",
    exampleSentenceEs: "La sopa necesita más sal."
  }, {
        de: "der Pfeffer",
    pron: "dea pfe-fa",
    es: "la pimienta",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "-",
    en: "a black pepper shaker",
    exampleSentenceDe: "Ich brauche Salz und Pfeffer.",
    exampleSentenceEs: "Necesito sal y pimienta."
  }, {
        de: "der Zucker",
    pron: "dea tsu-ka",
    es: "el azúcar",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "-",
    en: "a few white sugar cubes",
    exampleSentenceDe: "Trinkst du den Kaffee mit Zucker?",
    exampleSentenceEs: "¿Bebes el café con azúcar?"
  }, {
        de: "die Nudeln",
    pron: "di nu-deln",
    es: "la pasta / los fideos",
    type: "Sustantivo (Plural)",
    category: "Lebensmittel",
    plural: "die Nudeln",
    en: "a bowl of cooked pasta",
    exampleSentenceDe: "Wir kochen heute Abend Nudeln.",
    exampleSentenceEs: "Cocinamos pasta esta noche."
  }, {
        de: "die Wurst",
    pron: "di vurst",
    es: "el embutido / la salchicha",
    type: "Sustantivo",
    category: "Lebensmittel",
    plural: "die Würste",
    en: "a traditional german sausage",
    exampleSentenceDe: "Ich möchte ein Brötchen mit Wurst.",
    exampleSentenceEs: "Quisiera un panecillo con embutido."
  }]
},
{
  id: 10,
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
    plural: "die Kleidungen"
  }, {
    de: "der Pullover",
    pron: "dea pu-ló-fea",
    es: "suéter",
    type: "Sustantivo (Masc)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe einen Pullover. Der Pullover ist blau.",
    exampleSentenceEs: "Tengo un suéter. El suéter es azul.",
    plural: "die Pullover"
  }, {
    de: "der Rock",
    pron: "dea rok",
    es: "falda",
    type: "Sustantivo (Masc)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe einen Rock. Der Rock ist rot.",
    exampleSentenceEs: "Tengo una falda. La falda es roja.",
    plural: "die Röcke"
  }, {
    de: "die Hose",
    pron: "di jó-se",
    es: "pantalón",
    type: "Sustantivo (Fem)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe die Hose. Die Hose ist blau.",
    exampleSentenceEs: "Tengo el pantalón. El pantalón es azul.",
    plural: "die Hosen"
  }, {
    de: "das Hemd",
    pron: "das jemt",
    es: "camisa",
    type: "Sustantivo (Neutro)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe das Hemd. Das Hemd ist weiß.",
    exampleSentenceEs: "Tengo la camisa. La camisa es blanca.",
    plural: "die Hemden"
  }, {
    de: "die Schuhe",
    pron: "di shú-e",
    es: "zapatos",
    type: "Sustantivo (Plural)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe die Schuhe. Die Schuhe sind neu.",
    exampleSentenceEs: "Tengo los zapatos. Los zapatos son nuevos.",
    plural: "die Schuhe"
  }, {
    de: "die Jacke",
    pron: "di yá-ke",
    es: "chaqueta",
    type: "Sustantivo (Fem)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Die Jacke ist neu.",
    exampleSentenceEs: "La chaqueta es nueva.",
    plural: "die Jacken"
  }, {
    de: "der Mantel",
    pron: "dea mán-tel",
    es: "abrigo",
    type: "Sustantivo (Masc)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe einen Mantel. Der Mantel ist warm.",
    exampleSentenceEs: "Tengo un abrigo. El abrigo es cálido.",
    plural: "die Mäntel"
  }, {
    de: "die Jeans",
    pron: "di dshins",
    es: "jeans",
    type: "Sustantivo (Fem)",
    category: "Kleidungsstücke",
    exampleSentenceDe: "Ich habe die Jeans. Die Jeans ist blau.",
    exampleSentenceEs: "Tengo los jeans. Los jeans son azules.",
    plural: "die Jeans"
  }, {
    de: "die Größe",
    pron: "di gro-se",
    es: "talla",
    type: "Sustantivo (Fem)",
    category: "Eigenschaften",
    exampleSentenceDe: "Ich brauche die Größe.",
    exampleSentenceEs: "Necesito la talla.",
    plural: "die Größen"
  }, {
    de: "die Farbe",
    pron: "di fár-be",
    es: "color",
    type: "Sustantivo (Fem)",
    category: "Eigenschaften",
    exampleSentenceDe: "Das ist die Farbe.",
    exampleSentenceEs: "Ese es el color.",
    plural: "die Farben"
  }, {
    de: "schwarz",
    pron: "shvárts",
    es: "negro",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist schwarz.",
    exampleSentenceEs: "El coche es negro.",
    regimen: "≠ weiß"
  }, {
    de: "weiß",
    pron: "vais",
    es: "blanco",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Die Wand ist weiß.",
    exampleSentenceEs: "La pared es blanca.",
    regimen: "≠ schwarz"
  }, {
    de: "grau",
    pron: "gráu",
    es: "gris",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Der Himmel ist grau.",
    exampleSentenceEs: "El cielo es gris.",
    regimen: "≠ bunt"
  }, {
    de: "rot",
    pron: "rot",
    es: "rojo",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist rot.",
    exampleSentenceEs: "El coche es rojo.",
    regimen: "≠ grün"
  }, {
    de: "blau",
    pron: "bláu",
    es: "azul",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist blau.",
    exampleSentenceEs: "El coche es azul.",
    regimen: "≠ bunt"
  }, {
    de: "gelb",
    pron: "guélp",
    es: "amarillo",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Die Sonne ist gelb.",
    exampleSentenceEs: "El sol es amarillo.",
    regimen: "≠ keine feste Gegenfarbe"
  }, {
    de: "grün",
    pron: "grün",
    es: "verde",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Das Auto ist grün.",
    exampleSentenceEs: "El coche es verde.",
    regimen: "≠ rot"
  }, {
    de: "braun",
    pron: "bráun",
    es: "marrón",
    type: "Adjetivo",
    category: "Farben",
    exampleSentenceDe: "Der Tisch ist braun.",
    exampleSentenceEs: "La mesa es marrón.",
    regimen: "≠ bunt"
  }, {
    de: "anziehen",
    pron: "án-tsi-en",
    es: "ponerse ropa",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich ziehe die Jacke an.",
    exampleSentenceEs: "Me pongo la chaqueta.",
    regimen: "Sep./refl. + Akkusativ"
  }, {
    de: "ausziehen",
    pron: "áus-tsí-en",
    es: "quitarse ropa",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich ziehe den Pullover aus.",
    exampleSentenceEs: "Me quito el jersey.",
    regimen: "Separable, +Akk, reflex."
  }, {
    de: "anprobieren",
    pron: "án-pro-bí-ren",
    es: "probarse ropa",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich möchte die Schuhe anprobieren.",
    exampleSentenceEs: "Quiero probarme los zapatos.",
    regimen: "Separable (an-), +Akk"
  }, {
    de: "passen",
    pron: "pá-sen",
    es: "quedar bien (talla)",
    type: "Verbo (+ Dativo)",
    category: "Aktionen",
    exampleSentenceDe: "Die Hose passt mir gut.",
    exampleSentenceEs: "Los pantalones me quedan bien.",
    regimen: "+ Dativo"
  }, {
    de: "anhaben",
    pron: "án-ja-ben",
    es: "llevar puesto (ropa)",
    type: "Verbo Separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich habe heute einen blauen Pullover an.",
    exampleSentenceEs: "Yo llevo puesto un jersey azul hoy.",
    regimen: "+ Akk., Separable (an-)"
  }, {
    de: "eng",
    pron: "eng",
    es: "ajustado",
    type: "Adjetivo",
    category: "Eigenschaften",
    exampleSentenceDe: "Der Rock ist eng.",
    exampleSentenceEs: "La falda es ajustada.",
    regimen: "≠ weit"
  }, {
    de: "weit",
    pron: "váit",
    es: "holgado",
    type: "Adjetivo",
    category: "Eigenschaften",
    exampleSentenceDe: "Die Hose ist weit.",
    exampleSentenceEs: "Los pantalones son holgados.",
    regimen: "≠ eng"
  }, {
    de: "bequem",
    pron: "be-kvém",
    es: "cómodo",
    type: "Adjetivo",
    category: "Eigenschaften",
    exampleSentenceDe: "Der Stuhl ist bequem.",
    exampleSentenceEs: "La silla es cómoda.",
    regimen: "≠ unbequem"
  }, {
    de: "der Schal",
    pron: "dea shal",
    es: "bufanda",
    type: "Sustantivo",
    category: "Accessoires",
    exampleSentenceDe: "Ich habe einen Schal. Der Schal ist rot.",
    exampleSentenceEs: "Tengo una bufanda. La bufanda es roja.",
    plural: "die Schals"
  }, {
    de: "der Gürtel",
    pron: "dea gúa-tel",
    es: "cinturón",
    type: "Sustantivo",
    category: "Accessoires",
    exampleSentenceDe: "Ich habe einen Gürtel. Der Gürtel ist braun.",
    exampleSentenceEs: "Tengo un cinturón. El cinturón es marrón.",
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
    exampleSentenceEs: "Mi nueva chaqueta es naranja."
  }, {
        de: "rosa",
    pron: "ro-sa",
    es: "rosa",
    type: "Adjetivo",
    category: "Farben",
    en: "a vibrant splash of pink paint",
    exampleSentenceDe: "Das Mädchen trägt ein rosa Kleid.",
    exampleSentenceEs: "La niña lleva un vestido rosa."
  }, {
        de: "lila",
    pron: "li-la",
    es: "morado / lila",
    type: "Adjetivo",
    category: "Farben",
    en: "a vibrant splash of purple paint",
    exampleSentenceDe: "Die Blumen im Garten sind lila.",
    exampleSentenceEs: "Las flores en el jardín son moradas."
  }]
},
{
  id: 6,
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
    plural: "die Geschäfte"
  }, {
    de: "der Laden",
    pron: "dea lá-den",
    es: "tienda pequeña",
    type: "Sustantivo",
    category: "Orte",
    exampleSentenceDe: "Ich gehe in den Laden.",
    exampleSentenceEs: "Voy a la tienda.",
    plural: "die Läden"
  }, {
    de: "die Bäckerei",
    pron: "di bé-ke-rái",
    es: "panadería",
    type: "Sustantivo (Fem)",
    category: "Orte",
    exampleSentenceDe: "Ich gehe zur Bäckerei.",
    exampleSentenceEs: "Voy a la panadería.",
    plural: "die Bäckereien"
  }, {
    de: "der Supermarkt",
    pron: "dea sú-pea-markt",
    es: "supermercado",
    type: "Sustantivo (Masc)",
    category: "Orte",
    exampleSentenceDe: "Ich gehe in den Supermarkt.",
    exampleSentenceEs: "Voy al supermercado.",
    plural: "die Supermärkte"
  }, {
    de: "geöffnet",
    pron: "gue-óf-net",
    es: "abierto",
    type: "Adjetivo",
    category: "Status",
    exampleSentenceDe: "Das Geschäft ist geöffnet.",
    exampleSentenceEs: "La tienda está abierta.",
    regimen: "≠ geschlossen"
  }, {
    de: "das Angebot",
    pron: "das án-gue-bot",
    es: "oferta",
    type: "Sustantivo (Neutro)",
    category: "Preis",
    exampleSentenceDe: "Das ist ein gutes Angebot.",
    exampleSentenceEs: "Esta es una buena oferta.",
    plural: "die Angebote"
  }, {
    de: "günstig",
    pron: "gúns-tij",
    es: "económico",
    type: "Adjetivo",
    category: "Preis",
    exampleSentenceDe: "Das Hotel ist günstig.",
    exampleSentenceEs: "El hotel es económico.",
    regimen: "≠ teuer"
  }, {
    de: "billig",
    pron: "bí-lij",
    es: "barato",
    type: "Adjetivo",
    category: "Preis",
    exampleSentenceDe: "Das Brot ist billig.",
    exampleSentenceEs: "El pan es barato.",
    regimen: "≠ teuer"
  }, {
    de: "teuer",
    pron: "tói-a",
    es: "caro",
    type: "Adjetivo",
    category: "Preis",
    exampleSentenceDe: "Das ist teuer.",
    exampleSentenceEs: "Esto es caro.",
    regimen: "≠ billig"
  }, {
    de: "brauchen",
    pron: "bráu-jen",
    es: "necesitar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich brauche Wasser.",
    exampleSentenceEs: "Yo necesito agua.",
    regimen: "+ Akkusativ"
  }, {
    de: "das Kilo",
    pron: "das kí-lo",
    es: "kilo",
    type: "Sustantivo",
    category: "Menge",
    exampleSentenceDe: "Ich kaufe ein Kilo Äpfel.",
    exampleSentenceEs: "Compro un kilo de manzanas.",
    plural: "die Kilo"
  }, {
    de: "das Pfund",
    pron: "das pfunt",
    es: "libra (500g)",
    type: "Sustantivo",
    category: "Menge",
    exampleSentenceDe: "Ich kaufe ein Pfund Brot.",
    exampleSentenceEs: "Compro una libra de pan.",
    plural: "die Pfund"
  }, {
    de: "das Gramm",
    pron: "das gram",
    es: "gramo",
    type: "Sustantivo",
    category: "Menge",
    exampleSentenceDe: "Ich brauche das Gramm Zucker.",
    exampleSentenceEs: "Necesito el gramo de azúcar.",
    plural: "die Gramm"
  }, {
    de: "kosten",
    pron: "kós-ten",
    es: "costar",
    type: "Verbo",
    category: "Preis",
    exampleSentenceDe: "Was kostet das Brot?",
    exampleSentenceEs: "¿Cuánto cuesta el pan?",
    regimen: "+ Akkusativ"
  }, {
    de: "der Preis",
    pron: "dea práis",
    es: "precio",
    type: "Sustantivo",
    category: "Preis",
    exampleSentenceDe: "Der Preis ist hoch.",
    exampleSentenceEs: "El precio es alto.",
    plural: "die Preise"
  }, {
    de: "die Kasse",
    pron: "di ká-se",
    es: "caja",
    type: "Sustantivo (Fem)",
    category: "Bezahlen",
    exampleSentenceDe: "Wo ist die Kasse, bitte?",
    exampleSentenceEs: "¿Dónde está la caja, por favor?",
    plural: "die Kassen"
  }, {
    de: "das Geld",
    pron: "das guelt",
    es: "dinero",
    type: "Sustantivo",
    category: "Bezahlen",
    exampleSentenceDe: "Das ist das Geld.",
    exampleSentenceEs: "Este es el dinero.",
    plural: "die Gelder"
  }, {
    de: "der Verkäufer",
    pron: "dea fea-kói-fea",
    es: "vendedor",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Der Verkäufer ist nett.",
    exampleSentenceEs: "El vendedor es simpático.",
    plural: "die Verkäufer"
  }, {
    de: "bestellen",
    pron: "be-shté-len",
    es: "pedir (online)",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich bestelle Pizza.",
    exampleSentenceEs: "Yo pido pizza.",
    regimen: "+ Akkusativ"
  }, {
    de: "die Überweisung",
    pron: "di ǘ-bea-vái-sung",
    es: "transferencia",
    type: "Sustantivo",
    category: "Bezahlen",
    exampleSentenceDe: "Ich mache die Überweisung.",
    exampleSentenceEs: "Hago la transferencia.",
    plural: "die Überweisungen"
  }, {
    de: "das Wechselgeld",
    pron: "das vék-sel-guelt",
    es: "el cambio / vueltas",
    type: "Sustantivo",
    category: "Bezahlen",
    exampleSentenceDe: "Ich brauche das Wechselgeld nicht.",
    exampleSentenceEs: "No necesito el cambio.",
    plural: "die Wechselgelder"
  }, {
    de: "umtauschen",
    pron: "úm-táu-shen",
    es: "cambiar (artículo)",
    type: "Verbo Separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich möchte das T-Shirt umtauschen.",
    exampleSentenceEs: "Yo quisiera cambiar la camiseta.",
    regimen: "Separable (um-) + Akk."
  }, {
    de: "der Rabatt",
    pron: "dea ra-bát",
    es: "descuento",
    type: "Sustantivo",
    category: "Preis",
    exampleSentenceDe: "Ich sehe der Rabatt. Der Rabatt ist gut.",
    exampleSentenceEs: "Veo el descuento. El descuento es bueno.",
    plural: "die Rabatte"
  },
  {
    de: "einkaufen",
    pron: "áin-kau-fen",
    es: "ir de compras",
    type: "Verbo",
    category: "Einkaufen",
    regimen: "Separable (ein-) / + Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "verkaufen",
    pron: "fea-káo-fen",
    es: "vender",
    type: "Verbo",
    category: "Einkaufen",
    regimen: "+ Akkusativ",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }]
},
{
  id: 4,
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
    plural: "die Freizeiten"
  }, {
    de: "das Hobby",
    pron: "das hó-bi",
    es: "el pasatiempo",
    type: "Sustantivo (Neutro)",
    category: "Allgemein",
    exampleSentenceDe: "Mein Hobby ist lesen.",
    exampleSentenceEs: "Mi pasatiempo es leer.",
    plural: "die Hobbys"
  }, {
    de: "spielen",
    pron: "shpí-len",
    es: "jugar / tocar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich spiele gern.",
    exampleSentenceEs: "Me gusta jugar.",
    regimen: "+ Akkusativ"
  }, {
    de: "Fußball spielen",
    pron: "fús-bal shpí-len",
    es: "jugar fútbol",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich spiele gern Fußball.",
    exampleSentenceEs: "Me gusta jugar al fútbol.",
    regimen: "Verbo+objeto"
  }, {
    de: "der Ball",
    pron: "dea bal",
    es: "el balón",
    type: "Sustantivo (Masc)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich habe einen Ball. Der Ball ist rot.",
    exampleSentenceEs: "Tengo un balón. El balón es rojo.",
    plural: "die Bälle"
  }, {
    de: "Karten spielen",
    pron: "kár-ten-shpí-len",
    es: "jugar cartas",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Wir spielen Karten am Abend.",
    exampleSentenceEs: "Jugamos a las cartas por la noche.",
    regimen: "Verbo+objeto"
  }, {
    de: "Musik hören",
    pron: "mu-sík jé-ren",
    es: "escuchar música",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich höre gern Musik.",
    exampleSentenceEs: "Me gusta escuchar música.",
    regimen: "Verbo + Akkusativ"
  }, {
    de: "die CD",
    pron: "di tse-dé",
    es: "el CD",
    type: "Sustantivo (Fem)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich habe die CD. Die CD ist neu.",
    exampleSentenceEs: "Tengo el CD. El CD es nuevo.",
    plural: "die CDs"
  }, {
    de: "wandern",
    pron: "ván-dean",
    es: "hacer senderismo",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich gehe im Park wandern.",
    exampleSentenceEs: "Yo voy a hacer senderismo en el parque.",
    regimen: "sein (intransitivo)"
  }, {
    de: "schwimmen",
    pron: "shví-men",
    es: "nadar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich kann schwimmen.",
    exampleSentenceEs: "Yo puedo nadar.",
    regimen: "sein (movimiento)"
  }, {
    de: "lesen",
    pron: "lé-sen",
    es: "leer",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich lese ein Buch.",
    exampleSentenceEs: "Yo leo un libro.",
    regimen: "+ Akkusativ"
  }, {
    de: "das Buch",
    pron: "das buj",
    es: "el libro",
    type: "Sustantivo (Neutro)",
    category: "Gegenstände",
    exampleSentenceDe: "Das ist ein Buch. Das Buch ist neu.",
    exampleSentenceEs: "Este es un libro. El libro es nuevo.",
    plural: "die Bücher"
  }, {
    de: "die Zeitung",
    pron: "di tsái-tung",
    es: "el periódico",
    type: "Sustantivo (Fem)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich lese die Zeitung.",
    exampleSentenceEs: "Yo leo el periódico.",
    plural: "die Zeitungen"
  }, {
    de: "fernsehen",
    pron: "fén-se-en",
    es: "ver televisión",
    type: "Verbo separable",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich sehe am Abend fern.",
    exampleSentenceEs: "Yo veo la televisión por la noche.",
    regimen: "Separable (fern-)"
  }, {
    de: "tanzen",
    pron: "tán-tsen",
    es: "bailar",
    type: "Verbo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich tanze gern.",
    exampleSentenceEs: "Me gusta bailar.",
    regimen: "Intransitivo"
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ta",
    es: "computador",
    type: "Sustantivo (Masc)",
    category: "Gegenstände",
    exampleSentenceDe: "Ich habe einen Computer. Der Computer ist neu.",
    exampleSentenceEs: "Tengo un computador. El computador es nuevo.",
    plural: "die Computer"
  }, {
    de: "der Sport",
    pron: "dea shport",
    es: "deporte",
    type: "Sustantivo",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich mag der Sport.",
    exampleSentenceEs: "Me gusta el deporte.",
    plural: "die Sportarten"
  }, {
    de: "ins Kino gehen",
    pron: "ins kí-no gué-en",
    es: "ir al cine",
    type: "Frase",
    category: "Ausgehen",
    exampleSentenceDe: "Ich gehe ins Kino.",
    exampleSentenceEs: "Yo voy al cine.",
    regimen: "in + Akk."
  }, {
    de: "einen Film sehen",
    pron: "ái-nen film sé-en",
    es: "ver película",
    type: "Frase",
    category: "Ausgehen",
    exampleSentenceDe: "Ich sehe einen Film.",
    exampleSentenceEs: "Yo veo una película.",
    regimen: "Akkusativ: einen Film"
  }, {
    de: "Rad fahren",
    pron: "rat fá-ren",
    es: "montar bicicleta",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Ich kann Rad fahren.",
    exampleSentenceEs: "Yo sé montar bicicleta.",
    regimen: "Verbo separable"
  }, {
    de: "spazieren gehen",
    pron: "shpa-tsí-ren-gué-en",
    es: "pasear",
    type: "Frase",
    category: "Aktivitäten",
    exampleSentenceDe: "Wir gehen spazieren im Park.",
    exampleSentenceEs: "Paseamos en el parque.",
    regimen: "Verbo separable"
  }, {
    de: "in die Disco gehen",
    pron: "in di dís-ko gué-en",
    es: "ir a discoteca",
    type: "Frase",
    category: "Ausgehen",
    exampleSentenceDe: "Ich gehe in die Disco.",
    exampleSentenceEs: "Yo voy a la discoteca.",
    regimen: "in + Akkusativ"
  }, {
    de: "das Museum",
    pron: "das mu-séum",
    es: "museo",
    type: "Sustantivo (Neutro)",
    category: "Orte",
    exampleSentenceDe: "Das Museum ist groß.",
    exampleSentenceEs: "El museo es grande.",
    plural: "die Museen"
  }, {
    de: "der Verein",
    pron: "dea fea-áin",
    es: "club / asociación",
    type: "Sustantivo (Masc)",
    category: "Orte",
    exampleSentenceDe: "Ich bin in dem Verein.",
    exampleSentenceEs: "Yo estoy en el club.",
    plural: "die Vereine"
  }, {
    de: "das Schwimmbad",
    pron: "das shvím-bat",
    es: "la piscina",
    type: "Sustantivo (Neutro)",
    category: "Orte",
    exampleSentenceDe: "Wir gehen in das Schwimmbad.",
    exampleSentenceEs: "Vamos a la piscina.",
    plural: "die Schwimmbäder"
  }, {
    de: "gefallen",
    pron: "gue-fá-len",
    es: "gustar",
    type: "Verbo",
    category: "Adjektive & Gefühle",
    exampleSentenceDe: "Das Kleid gefällt mir.",
    exampleSentenceEs: "El vestido me gusta.",
    regimen: "+ Dativo"
  }, {
    de: "schön",
    pron: "shön",
    es: "bonito",
    type: "Adjetivo",
    category: "Adjektive & Gefühle",
    exampleSentenceDe: "Das Wetter ist schön.",
    exampleSentenceEs: "El tiempo es bonito.",
    regimen: "≠ hässlich"
  }, {
    de: "mögen",
    pron: "mö-guen",
    es: "gustar / me gusta",
    type: "Verbo",
    category: "Adjektive & Gefühle",
    exampleSentenceDe: "Ich mag Kaffee.",
    exampleSentenceEs: "Me gusta el café.",
    regimen: "+ Akkusativ, irregular"
  }, {
    de: "sich treffen",
    pron: "zij tré-fen",
    es: "reunirse/encontrarse",
    type: "Verbo",
    category: "Soziales",
    exampleSentenceDe: "Wir treffen uns heute Abend.",
    exampleSentenceEs: "Nos encontramos esta noche.",
    regimen: "Reflexivo + mit/Dativ"
  },
  {
    de: "der Hund",
    pron: "dea hunt",
    es: "el perro",
    type: "Sustantivo (Masc)",
    category: "Tiere",
    plural: "die Hunde",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Katze",
    pron: "di ká-tse",
    es: "el gato",
    type: "Sustantivo (Fem)",
    category: "Tiere",
    plural: "die Katzen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Vogel",
    pron: "dea fó-guel",
    es: "el pájaro",
    type: "Sustantivo (Masc)",
    category: "Tiere",
    plural: "die Vögel",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Pferd",
    pron: "das pfeat",
    es: "el caballo",
    type: "Sustantivo (Neutro)",
    category: "Tiere",
    plural: "die Pferde",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Maus",
    pron: "di maus",
    es: "el ratón",
    type: "Sustantivo (Fem)",
    category: "Tiere",
    plural: "die Mäuse",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Kuh",
    pron: "di ku",
    es: "la vaca",
    type: "Sustantivo (Fem)",
    category: "Tiere",
    plural: "die Kühe",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Schaf",
    pron: "das shaf",
    es: "la oveja",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Schafe",
    en: "white fluffy sheep",
    exampleSentenceDe: "Das Schaf isst Gras.",
    exampleSentenceEs: "La oveja come hierba."
  }, {
        de: "die Ziege",
    pron: "di tsí-gue",
    es: "la cabra",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Ziegen",
    en: "brown goat",
    exampleSentenceDe: "Die Ziege ist auf dem Berg.",
    exampleSentenceEs: "La cabra está en la montaña."
  }, {
        de: "das Huhn",
    pron: "das jun",
    es: "la gallina",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Hühner",
    en: "white chicken",
    exampleSentenceDe: "Das Huhn legt ein Ei.",
    exampleSentenceEs: "La gallina pone un huevo."
  }, {
        de: "der Bär",
    pron: "dea ber",
    es: "el oso",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Bären",
    en: "brown bear",
    exampleSentenceDe: "Der Bär ist groß.",
    exampleSentenceEs: "El oso es grande."
  }, {
        de: "der Löwe",
    pron: "dea lö-ve",
    es: "el león",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Löwen",
    en: "male lion with a mane",
    exampleSentenceDe: "Der Löwe ist stark.",
    exampleSentenceEs: "El león es fuerte."
  }, {
        de: "der Elefant",
    pron: "dea e-le-fánt",
    es: "el elefante",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Elefanten",
    en: "gray elephant with a trunk",
    exampleSentenceDe: "Der Elefant hat große Ohren.",
    exampleSentenceEs: "El elefante tiene orejas grandes."
  }, {
        de: "der Affe",
    pron: "dea á-fe",
    es: "el mono",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Affen",
    en: "monkey eating a banana",
    exampleSentenceDe: "Der Affe isst eine Banane.",
    exampleSentenceEs: "El mono come un banano."
  }, {
        de: "die Schlange",
    pron: "di shláng-e",
    es: "la serpiente",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Schlangen",
    en: "green snake",
    exampleSentenceDe: "Die Schlange ist lang.",
    exampleSentenceEs: "La serpiente es larga."
  }, {
        de: "der Frosch",
    pron: "dea frosh",
    es: "la rana",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Frösche",
    en: "green frog",
    exampleSentenceDe: "Der Frosch springt.",
    exampleSentenceEs: "La rana salta."
  }, {
        de: "die Spinne",
    pron: "di shpí-ne",
    es: "la araña",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Spinnen",
    en: "black spider",
    exampleSentenceDe: "Ich mag keine Spinnen.",
    exampleSentenceEs: "No me gustan las arañas."
  }, {
        de: "die Biene",
    pron: "di bí-ne",
    es: "la abeja",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Bienen",
    en: "yellow and black bee",
    exampleSentenceDe: "Die Biene macht Honig.",
    exampleSentenceEs: "La abeja hace miel."
  }, {
        de: "der Schmetterling",
    pron: "dea shmé-ter-ling",
    es: "la mariposa",
    type: "Sustantivo",
    category: "Tiere",
    plural: "die Schmetterlinge",
    en: "colorful butterfly",
    exampleSentenceDe: "Der Schmetterling ist schön.",
    exampleSentenceEs: "La mariposa es bonita."
  }, {
        de: "die Kirche",
    pron: "di kír-je",
    es: "la iglesia",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Kirchen",
    en: "old stone church",
    exampleSentenceDe: "Die Kirche ist sehr alt.",
    exampleSentenceEs: "La iglesia es muy antigua."
  }, {
        de: "die Brücke",
    pron: "di brü-ke",
    es: "el puente",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Brücken",
    en: "stone bridge over a river",
    exampleSentenceDe: "Wir gehen über die Brücke.",
    exampleSentenceEs: "Vamos por el puente."
  }, {
        de: "der Turm",
    pron: "dea turm",
    es: "la torre",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Türme",
    en: "tall medieval tower",
    exampleSentenceDe: "Der Turm ist sehr hoch.",
    exampleSentenceEs: "La torre es muy alta."
  }, {
        de: "der Park",
    pron: "dea park",
    es: "el parque",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Parks",
    en: "green park with trees",
    exampleSentenceDe: "Ich laufe im Park.",
    exampleSentenceEs: "Yo corro en el parque."
  }, {
        de: "das Rathaus",
    pron: "das rát-haus",
    es: "el ayuntamiento",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Rathäuser",
    en: "historic city hall building",
    exampleSentenceDe: "Das Rathaus ist im Zentrum.",
    exampleSentenceEs: "El ayuntamiento está en el centro."
  }, {
        de: "die Bibliothek",
    pron: "di bi-blio-ték",
    es: "la biblioteca",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Bibliotheken",
    en: "building full of books",
    exampleSentenceDe: "Ich lerne in der Bibliothek.",
    exampleSentenceEs: "Estudio en la biblioteca."
  }, {
        de: "das Stadion",
    pron: "das shtá-dion",
    es: "el estadio",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Stadien",
    en: "large sports stadium",
    exampleSentenceDe: "Das Fußballspiel ist im Stadion.",
    exampleSentenceEs: "El partido de fútbol es en el estadio."
  }, {
        de: "das Theater",
    pron: "das te-á-ter",
    es: "el teatro",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Theater",
    en: "classic theater stage",
    exampleSentenceDe: "Wir gehen heute ins Theater.",
    exampleSentenceEs: "Hoy vamos al teatro."
  }, {
        de: "das Zentrum",
    pron: "das tsén-trum",
    es: "el centro",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Zentren",
    en: "busy city center square",
    exampleSentenceDe: "Die Bank ist im Zentrum.",
    exampleSentenceEs: "El banco está en el centro."
  }, {
        de: "der Markt",
    pron: "dea markt",
    es: "el mercado",
    type: "Sustantivo",
    category: "Orte",
    plural: "die Märkte",
    en: "fruit market stall",
    exampleSentenceDe: "Ich kaufe Obst auf dem Markt.",
    exampleSentenceEs: "Compro fruta en el mercado."
  }]
},
{
  id: 7,
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
    plural: "die Ferien"
  }, {
    de: "der Urlaub",
    pron: "dea úa-laup",
    es: "las vacaciones (laborales)",
    type: "Sustantivo",
    category: "Reise",
    exampleSentenceDe: "Ich habe Urlaub.",
    exampleSentenceEs: "Tengo vacaciones.",
    plural: "die Urlaube"
  }, {
    de: "Urlaub machen",
    pron: "ú-a-laup má-jen",
    es: "ir de vacaciones",
    type: "Frase",
    category: "Reise",
    exampleSentenceDe: "Ich mache Urlaub in Spanien.",
    exampleSentenceEs: "Yo voy de vacaciones a España.",
    regimen: "Verbo+Akk. fijo"
  }, {
    de: "es gibt",
    pron: "es guípt",
    es: "hay (+ Acusativo)",
    type: "Frase",
    category: "Allgemein",
    exampleSentenceDe: "Es gibt Kaffee.",
    exampleSentenceEs: "Hay café.",
    regimen: "⚠️ + Akkusativ"
  }, {
    de: "geöffnet",
    pron: "gue-óf-net",
    es: "abierto",
    type: "Adjetivo",
    category: "Status",
    exampleSentenceDe: "Das Geschäft ist geöffnet.",
    exampleSentenceEs: "La tienda está abierta.",
    regimen: "≠ geschlossen"
  }, {
    de: "geschlossen",
    pron: "gue-shló-sen",
    es: "cerrado",
    type: "Adjetivo",
    category: "Status",
    exampleSentenceDe: "Das Geschäft ist geschlossen.",
    exampleSentenceEs: "La tienda está cerrada.",
    regimen: "≠ offen"
  }, {
    de: "von - bis",
    pron: "fon - bis",
    es: "de - hasta",
    type: "Preposición",
    category: "Zeit",
    exampleSentenceDe: "Ich arbeite von neun Uhr bis fünf Uhr.",
    exampleSentenceEs: "Yo trabajo de nueve en punto hasta las cinco en punto.",
    regimen: "+ Dativo"
  }, {
    de: "die Karte",
    pron: "di kár-te",
    es: "tarjeta / mapa",
    type: "Sustantivo (Fem)",
    category: "Tickets",
    exampleSentenceDe: "Ich habe die Karte. Die Karte ist groß.",
    exampleSentenceEs: "Tengo la tarjeta. La tarjeta es grande.",
    plural: "die Karten"
  }, {
    de: "die Eintrittskarte",
    pron: "di áin-trits-kár-te",
    es: "boleto de entrada",
    type: "Sustantivo (Fem)",
    category: "Tickets",
    exampleSentenceDe: "Ich brauche die Eintrittskarte.",
    exampleSentenceEs: "Necesito el boleto de entrada.",
    plural: "die Eintrittskarten"
  }, {
    de: "das Ticket",
    pron: "das tí-ket",
    es: "el ticket",
    type: "Sustantivo (Neutro)",
    category: "Tickets",
    exampleSentenceDe: "Ich brauche das Ticket.",
    exampleSentenceEs: "Necesito el ticket.",
    plural: "die Tickets"
  }, {
    de: "kaufen",
    pron: "káu-fen",
    es: "comprar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich kaufe ein Brot.",
    exampleSentenceEs: "Yo compro un pan.",
    regimen: "+ Akkusativ"
  }, {
    de: "reservieren",
    pron: "re-ze-a-fí-ren",
    es: "reservar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich möchte einen Tisch reservieren.",
    exampleSentenceEs: "Me gustaría reservar una mesa.",
    regimen: "+ Akkusativ"
  }, {
    de: "der Weg",
    pron: "dea vek",
    es: "el camino",
    type: "Sustantivo",
    category: "Orientierung",
    exampleSentenceDe: "Der Weg ist frei.",
    exampleSentenceEs: "El camino está libre.",
    plural: "die Wege"
  }, {
    de: "geradeaus",
    pron: "gue-ra-de-áus",
    es: "recto",
    type: "Adverbio",
    category: "Orientierung",
    exampleSentenceDe: "Gehen Sie geradeaus, bitte.",
    exampleSentenceEs: "Vaya recto, por favor.",
    regimen: "Direccional"
  }, {
    de: "links / rechts",
    pron: "links  rejts",
    es: "izquierda / derecha",
    type: "Adverbio",
    category: "Orientierung",
    exampleSentenceDe: "Gehen Sie links.",
    exampleSentenceEs: "Vaya a la izquierda.",
    regimen: "Direccional/lugar"
  }, {
    de: "der Unfall",
    pron: "dea ún-fal",
    es: "accidente",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich sehe einen Unfall. Der Unfall ist groß.",
    exampleSentenceEs: "Yo veo un accidente. El accidente es grande.",
    plural: "die Unfälle"
  }, {
    de: "die Polizei",
    pron: "di po-li-tsái",
    es: "policía",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Polizei ist hier.",
    exampleSentenceEs: "La policía está aquí.",
    plural: "die Polizeien"
  }, {
    de: "umsteigen",
    pron: "um-shtái-guen",
    es: "hacer transbordo",
    type: "Verbo",
    category: "Verkehr",
    exampleSentenceDe: "Ich steige in den Bus um.",
    exampleSentenceEs: "Yo hago transbordo al autobús.",
    regimen: "Separable (um-)"
  }, {
    de: "das Zelt",
    pron: "das tsélt",
    es: "tienda de campaña",
    type: "Sustantivo",
    category: "Reise",
    exampleSentenceDe: "Ich habe ein Zelt. Das Zelt ist groß.",
    exampleSentenceEs: "Tengo una tienda de campaña. La tienda de campaña es grande.",
    plural: "die Zelte"
  }, {
    de: "zelten",
    pron: "tsél-ten",
    es: "acampar",
    type: "Verbo",
    category: "Reise",
    exampleSentenceDe: "Wir zelten im Sommer.",
    exampleSentenceEs: "Acampamos en verano.",
    regimen: "Intransitivo, sin caso"
  },
  {
    de: "die Sonne",
    pron: "di zó-ne",
    es: "el sol",
    type: "Sustantivo (Fem)",
    category: "Wetter",
    plural: "die Sonnen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Mond",
    pron: "dea mont",
    es: "la luna",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "die Monde",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Stern",
    pron: "dea shtern",
    es: "la estrella",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "die Sterne",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Regen",
    pron: "dea ré-guen",
    es: "la lluvia",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "-",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Schnee",
    pron: "dea shné",
    es: "la nieve",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "-",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Wind",
    pron: "dea vint",
    es: "el viento",
    type: "Sustantivo (Masc)",
    category: "Wetter",
    plural: "die Winde",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Baum",
    pron: "dea baum",
    es: "el árbol",
    type: "Sustantivo (Masc)",
    category: "Natur",
    plural: "die Bäume",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Blume",
    pron: "di blú-me",
    es: "la flor",
    type: "Sustantivo (Fem)",
    category: "Natur",
    plural: "die Blumen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Wald",
    pron: "dea valt",
    es: "el bosque",
    type: "Sustantivo (Masc)",
    category: "Natur",
    plural: "die Wälder",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Meer",
    pron: "das mea",
    es: "el mar",
    type: "Sustantivo (Neutro)",
    category: "Natur",
    plural: "die Meere",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "regnen",
    pron: "rég-nen",
    es: "llover",
    type: "Verbo",
    category: "Wetter",
    regimen: "Impersonal",
    en: "dark storm cloud dropping rain",
    exampleSentenceDe: "Morgen wird es regnen.",
    exampleSentenceEs: "Mañana lloverá."
  }, {
        de: "schneien",
    pron: "shnái-en",
    es: "nevar",
    type: "Verbo",
    category: "Wetter",
    regimen: "Impersonal",
    en: "fluffy cloud dropping snowflakes",
    exampleSentenceDe: "Im Winter schneit es oft.",
    exampleSentenceEs: "En invierno nieva a menudo."
  }, {
        de: "scheinen",
    pron: "shái-nen",
    es: "brillar (sol)",
    type: "Verbo",
    category: "Wetter",
    regimen: "Intransitivo",
    en: "bright yellow sun shining",
    exampleSentenceDe: "Die Sonne scheint heute.",
    exampleSentenceEs: "El sol brilla hoy."
  }, {
        de: "frieren",
    pron: "frí-ren",
    es: "tener frío / congelarse",
    type: "Verbo",
    category: "Wetter",
    regimen: "Irregular (friert)",
    en: "frozen ice block",
    exampleSentenceDe: "Ich friere sehr.",
    exampleSentenceEs: "Tengo mucho frío."
  }, {
        de: "der Nebel",
    pron: "dea né-bel",
    es: "la niebla",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Nebel",
    en: "thick gray fog",
    exampleSentenceDe: "Der Nebel is sehr dicht.",
    exampleSentenceEs: "La niebla es muy densa."
  }, {
        de: "der Sturm",
    pron: "dea shturm",
    es: "la tormenta",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Stürme",
    en: "strong wind blowing trees",
    exampleSentenceDe: "Ein Sturm kommt.",
    exampleSentenceEs: "Viene una tormenta."
  }, {
        de: "kühl",
    pron: "kül",
    es: "fresco",
    type: "Adjetivo",
    category: "Wetter",
    en: "cool autumn breeze",
    exampleSentenceDe: "Es ist heute kühl.",
    exampleSentenceEs: "Hoy hace fresco."
  }, {
        de: "warm",
    pron: "varm",
    es: "cálido",
    type: "Adjetivo",
    category: "Wetter",
    en: "warm glowing sun",
    exampleSentenceDe: "Das Wasser ist warm.",
    exampleSentenceEs: "El agua está cálida."
  }, {
        de: "nass",
    pron: "nas",
    es: "mojado",
    type: "Adjetivo",
    category: "Wetter",
    en: "water drops",
    exampleSentenceDe: "Der Boden ist nass.",
    exampleSentenceEs: "El suelo está mojado."
  }, {
        de: "trocken",
    pron: "tró-ken",
    es: "seco",
    type: "Adjetivo",
    category: "Wetter",
    en: "dry cracked earth",
    exampleSentenceDe: "Die Kleidung ist trocken.",
    exampleSentenceEs: "La ropa está seca."
  }, {
        de: "der Blitz",
    pron: "dea blits",
    es: "el relámpago",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Blitze",
    en: "yellow lightning bolt",
    exampleSentenceDe: "Ich sehe den Blitz.",
    exampleSentenceEs: "Veo el relámpago."
  }, {
        de: "der Donner",
    pron: "dea dó-ner",
    es: "el trueno",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Donner",
    en: "dark thundercloud",
    exampleSentenceDe: "Ich höre den Donner.",
    exampleSentenceEs: "Escucho el trueno."
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
    exampleSentenceEs: "Nosotros pasamos las vacaciones en la playa."
  }, {
        de: "der Berg",
    pron: "dea beark",
    es: "la montaña",
    type: "Sustantivo",
    category: "Natur",
    plural: "die Berge",
    en: "a high mountain with a snowy peak",
    exampleSentenceDe: "Wir wandern oft in den Bergen.",
    exampleSentenceEs: "Hacemos senderismo a menudo en las montañas."
  }, {
        de: "die Wolke",
    pron: "di vol-ke",
    es: "la nube",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Wolken",
    en: "a fluffy white cloud",
    exampleSentenceDe: "Es gibt heute viele Wolken am Himmel.",
    exampleSentenceEs: "Hoy hay muchas nubes en el cielo."
  }, {
        de: "das Gewitter",
    pron: "das gue-vi-ta",
    es: "la tormenta",
    type: "Sustantivo",
    category: "Wetter",
    plural: "die Gewitter",
    en: "a dark storm cloud with a yellow lightning bolt",
    exampleSentenceDe: "Heute Abend gibt es ein Gewitter.",
    exampleSentenceEs: "Esta noche habrá una tormenta."
  }]
},
{
  id: 12,
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
    plural: "die Tanks"
  }, {
    de: "der Blinker / blinken",
    pron: "dea blín-ka  blín-ken",
    es: "direccional / poner intermitente",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Ich bin im Auto. Ich blinke nach rechts.",
    exampleSentenceEs: "Estoy en el coche. Pongo el intermitente a la derecha.",
    regimen: "Intransitivo"
  }, {
    de: "die Bremse / bremsen",
    pron: "di brém-se  brém-sen",
    es: "freno / frenar",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Ich sehe die Bremse. Ich bremse.",
    exampleSentenceEs: "Veo el freno. Yo freno.",
    regimen: "+ Akkusativ"
  }, {
    de: "das Bremspedal",
    pron: "das brems-pe-dál",
    es: "pedal de freno",
    type: "Sustantivo (Neutro)",
    category: "Teile",
    exampleSentenceDe: "Das Bremspedal ist wichtig.",
    exampleSentenceEs: "El pedal de freno es importante.",
    plural: "die Bremspedale"
  }, {
    de: "die Gangschaltung",
    pron: "di gáng-shal-tung",
    es: "caja de cambios",
    type: "Sustantivo (Fem)",
    category: "Teile",
    exampleSentenceDe: "Ich habe ein Problem mit der Gangschaltung.",
    exampleSentenceEs: "Tengo un problema con la caja de cambios.",
    plural: "die Gangschaltungen"
  }, {
    de: "das Gaspedal",
    pron: "das gás-pe-dál",
    es: "acelerador",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich sehe das Gaspedal im Auto.",
    exampleSentenceEs: "Yo veo el acelerador en el coche.",
    plural: "die Gaspedale"
  }, {
    de: "Gas geben",
    pron: "gas-gué-ben",
    es: "acelerar",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Bitte gib Gas auf der Autobahn.",
    exampleSentenceEs: "Por favor, acelera en la autopista.",
    regimen: "geben+Akk., verbo separable"
  }, {
    de: "der Fahrer / fahren",
    pron: "dea fá-rea  fá-ren",
    es: "conductor / conducir",
    type: "Sust / Verbo",
    category: "Allgemein",
    exampleSentenceDe: "Ich sehe den Fahrer. Der Fahrer fährt das Auto.",
    exampleSentenceEs: "Veo al conductor. El conductor conduce el coche.",
    regimen: "Irregular (fährt)"
  }, {
    de: "die Hupe / hupen",
    pron: "di jú-pe  jú-pen",
    es: "bocina / tocar bocina",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Die Hupe ist laut.",
    exampleSentenceEs: "La bocina es ruidosa.",
    regimen: "No separable, sin caso"
  }, {
    de: "der Kraftstoff",
    pron: "dea kráft-shtof",
    es: "combustible",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich brauche den Kraftstoff für das Auto.",
    exampleSentenceEs: "Necesito el combustible para el coche.",
    plural: "die Kraftstoffe"
  }, {
    de: "das Lenkrad / lenken",
    pron: "das lénk-rat  lén-ken",
    es: "volante / girar volante",
    type: "Sust / Verbo",
    category: "Teile",
    exampleSentenceDe: "Ich habe das Lenkrad. Ich kann das Lenkrad lenken.",
    exampleSentenceEs: "Tengo el volante. Puedo girar el volante.",
    regimen: "+ Akkusativ"
  }, {
    de: "der Motor",
    pron: "dea mo-tóa",
    es: "motor",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Ich sehe den Motor. Der Motor ist neu.",
    exampleSentenceEs: "Yo veo el motor. El motor es nuevo.",
    plural: "die Motoren"
  }, {
    de: "der Rückspiegel",
    pron: "dea rúk-shpí-guel",
    es: "espejo retrovisor",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Ich sehe den Rückspiegel. Der Rückspiegel ist klein.",
    exampleSentenceEs: "Veo el espejo retrovisor. El espejo retrovisor es pequeño.",
    plural: "die Rückspiegel"
  }, {
    de: "der Sicherheitsgurt",
    pron: "dea sí-jea-jaits-gurt",
    es: "cinturón de seguridad",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Der Sicherheitsgurt ist wichtig.",
    exampleSentenceEs: "El cinturón de seguridad es importante.",
    plural: "die Sicherheitsgurte"
  }, {
    de: "die Kupplung",
    pron: "di kúp-lung",
    es: "embrague",
    type: "Sustantivo (Fem)",
    category: "Teile",
    exampleSentenceDe: "Ich brauche die Kupplung.",
    exampleSentenceEs: "Yo necesito el embrague.",
    plural: "die Kupplungen"
  }, {
    de: "die Felge",
    pron: "di fél-gue",
    es: "rin",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Das Auto hat vier Felgen.",
    exampleSentenceEs: "El coche tiene cuatro rines.",
    plural: "die Felgen"
  }, {
    de: "die Handbremse",
    pron: "di jánt-brem-se",
    es: "freno de mano",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich ziehe die Handbremse an.",
    exampleSentenceEs: "Tiro del freno de mano.",
    plural: "die Handbremsen"
  }, {
    de: "der Schalthebel",
    pron: "dea shált-jé-bel",
    es: "palanca de cambios",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Der Schalthebel ist hier.",
    exampleSentenceEs: "La palanca de cambios está aquí.",
    plural: "die Schalthebel"
  }, {
    de: "der Scheibenwischer",
    pron: "dea shái-ben-vi-shea",
    es: "limpiaparabrisas",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Ich sehe den Scheibenwischer.",
    exampleSentenceEs: "Yo veo el limpiaparabrisas.",
    plural: "die Scheibenwischer"
  }, {
    de: "der Lichtschalter",
    pron: "dea líjt-shal-tea",
    es: "interruptor de luces",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Wo ist der Lichtschalter?",
    exampleSentenceEs: "¿Dónde está el interruptor de luces?",
    plural: "die Lichtschalter"
  }, {
    de: "die Heizung",
    pron: "di hái-tsung",
    es: "calefacción",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Die Heizung ist an.",
    exampleSentenceEs: "La calefacción está encendida.",
    plural: "die Heizungen"
  }, {
    de: "das Abblendlicht",
    pron: "das áp-blent-lijt",
    es: "luz corta / baja",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Das Auto hat das Abblendlicht.",
    exampleSentenceEs: "El coche tiene la luz corta.",
    plural: "die Abblendlichter"
  }, {
    de: "das Fernlicht",
    pron: "das féan-lijt",
    es: "luz larga / alta",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Das Fernlicht ist an.",
    exampleSentenceEs: "La luz larga está encendida.",
    plural: "die Fernlichter"
  }, {
    de: "die Bremsleuchte",
    pron: "di brems-lóij-te",
    es: "luz de freno",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Die Bremsleuchte ist rot.",
    exampleSentenceEs: "La luz de freno es roja.",
    plural: "die Bremsleuchten"
  }, {
    de: "die Warnblinkanlage",
    pron: "di várn-blink-án-la-gue",
    es: "luces de emergencia",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Ich drücke die Warnblinkanlage.",
    exampleSentenceEs: "Yo pulso las luces de emergencia.",
    plural: "die Warnblinkanlagen"
  }, {
    de: "die Nebelschlussleuchte",
    pron: "di né-bel-shlús-loich-te",
    es: "luz antiniebla trasera",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Der Wagen hat die Nebelschlussleuchte.",
    exampleSentenceEs: "El coche tiene la luz antiniebla trasera.",
    plural: "die Nebelschlussleuchten"
  }, {
    de: "das Tagfahrlicht",
    pron: "das ták-far-lijt",
    es: "luz diurna",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Das Tagfahrlicht ist neu.",
    exampleSentenceEs: "La luz diurna es nueva.",
    plural: "die Tagfahrlichter"
  }, {
    de: "betanken",
    pron: "be-tán-ken",
    es: "repostar gasolina",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich muss das Auto betanken.",
    exampleSentenceEs: "Tengo que repostar gasolina el coche.",
    regimen: "Inseparable / + Akkusativ"
  }, {
    de: "überholen",
    pron: "ü-ba-jó-len",
    es: "adelantar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Der Bus überholt das Auto.",
    exampleSentenceEs: "El autobús adelanta al coche.",
    regimen: "No separable, + Akk."
  }, {
    de: "einsteigen / aussteigen",
    pron: "áin-shtái-guen  áus-shtái-guen",
    es: "subir / bajar del coche",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Wir steigen in das Auto ein.",
    exampleSentenceEs: "Nosotros subimos al coche.",
    regimen: "Sep. (ein-/aus-) + in/aus Akk"
  }, {
    de: "aufschließen",
    pron: "áuf-shlí-sen",
    es: "abrir con llave",
    type: "Verbo separable",
    category: "Aktionen",
    exampleSentenceDe: "Ich schließe die Tür auf.",
    exampleSentenceEs: "Yo abro la puerta con llave.",
    regimen: "Separable (auf-), +Akk"
  }, {
    de: "anhalten / halten / parken",
    pron: "án-jal-ten  hál-ten  párken",
    es: "parar / detenerse / parquear",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Hier halten wir.",
    exampleSentenceEs: "Aquí paramos.",
    regimen: "anhalten separable, +Akk"
  }, {
    de: "die Vorfahrt",
    pron: "di fóa-fa-at",
    es: "prioridad",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich habe die Vorfahrt.",
    exampleSentenceEs: "Yo tengo la prioridad.",
    plural: "die Vorfahrten"
  }, {
    de: "aufpassen",
    pron: "áuf-pa-sen",
    es: "prestar atención",
    type: "Verbo separable",
    category: "Verkehr",
    exampleSentenceDe: "Pass auf, bitte!",
    exampleSentenceEs: "¡Presta atención, por favor!",
    regimen: "Separable (auf-), + auf+Akk"
  }, {
    de: "Motor starten",
    pron: "mo-tóa shtár-ten",
    es: "prender el motor",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Ich starte den Motor.",
    exampleSentenceEs: "Yo prendo el motor.",
    regimen: "Verbo + objeto"
  }, {
    de: "sich anschnallen",
    pron: "zij án-shná-len",
    es: "ponerse el cinturón",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich muss mich im Auto anschnallen.",
    exampleSentenceEs: "Tengo que ponerme el cinturón en el coche.",
    regimen: "Reflexivo, separable (an-)"
  }, {
    de: "beschleunigen",
    pron: "be-shlói-ni-guen",
    es: "acelerar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Das Auto beschleunigt.",
    exampleSentenceEs: "El coche acelera.",
    regimen: "+ Akkusativ"
  }, {
    de: "abschleppen",
    pron: "áp-shlé-pen",
    es: "remolcar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich lasse das Auto abschleppen.",
    exampleSentenceEs: "Yo dejo remolcar el coche.",
    regimen: "Separable, +Akkusativ"
  }, {
    de: "zusammenstoßen",
    pron: "tsu-sá-men-shtó-sen",
    es: "chocar",
    type: "Verbo",
    category: "Verkehr",
    exampleSentenceDe: "Wir stoßen zusammen.",
    exampleSentenceEs: "Nos chocamos.",
    regimen: "Separable (zusammen-)"
  }, {
    de: "der Schaden",
    pron: "dea shá-den",
    es: "daño",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Der Schaden ist groß.",
    exampleSentenceEs: "El daño es grande.",
    plural: "die Schäden"
  }, {
    de: "das Motoröl",
    pron: "das mó-tor-öl",
    es: "aceite de motor",
    type: "Sustantivo",
    category: "Flüssigkeiten",
    exampleSentenceDe: "Das ist das Motoröl.",
    exampleSentenceEs: "Este es el aceite de motor.",
    plural: "die Motoröle"
  }, {
    de: "der Reifendruck",
    pron: "dea rái-fen-druk",
    es: "presión neumáticos",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Der Reifendruck ist gut.",
    exampleSentenceEs: "La presión de los neumáticos es buena.",
    plural: "die Reifendrücke"
  }, {
    de: "der Reifen",
    pron: "dea rái-fen",
    es: "llanta",
    type: "Sustantivo (Masc)",
    category: "Teile",
    exampleSentenceDe: "Der Reifen ist neu.",
    exampleSentenceEs: "La llanta es nueva.",
    plural: "die Reifen"
  }, {
    de: "der Pkw / der Lkw",
    pron: "dea pé-ka-vé  dea él-ka-vé",
    es: "carro / camión",
    type: "Sustantivo",
    category: "Fahrzeuge",
    exampleSentenceDe: "Das ist ein Pkw. Der Pkw ist neu.",
    exampleSentenceEs: "Este es un coche. El coche es nuevo.",
    plural: "die Pkws / die Lkws"
  }, {
    de: "der Fußgänger",
    pron: "dea fús-guen-gua",
    es: "peatón",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Der Fußgänger ist hier.",
    exampleSentenceEs: "El peatón está aquí.",
    plural: "die Fußgänger"
  }, {
    de: "die Ampel / Kreuzung",
    pron: "di ám-pel  krói-tsung",
    es: "semáforo / cruce",
    type: "Sustantivo (Fem)",
    category: "Verkehr",
    exampleSentenceDe: "Die Ampel ist grün.",
    exampleSentenceEs: "El semáforo está en verde.",
    plural: "die Ampeln / Kreuzungen"
  }, {
    de: "das Fahrzeug",
    pron: "das fá-a-tsoik",
    es: "el vehículo",
    type: "Sustantivo (Neutro)",
    category: "Fahrzeuge",
    exampleSentenceDe: "Das Fahrzeug ist neu.",
    exampleSentenceEs: "El vehículo es nuevo.",
    plural: "die Fahrzeuge"
  }, {
    de: "der Verkehr / Stau",
    pron: "dea fea-kéa  shtáu",
    es: "el tráfico / trancón",
    type: "Sustantivo (Masc)",
    category: "Verkehr",
    exampleSentenceDe: "Der Verkehr ist heute nicht gut.",
    exampleSentenceEs: "El tráfico no está bueno hoy.",
    plural: "die Staus"
  }, {
    de: "das Verkehrsschild",
    pron: "das fea-kéas-shilt",
    es: "señal de tráfico",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Das Verkehrsschild ist rot.",
    exampleSentenceEs: "La señal de tráfico es roja.",
    plural: "die Verkehrsschilder"
  }, {
    de: "die Geschwindigkeit",
    pron: "di gue-shvín-dij-kait",
    es: "velocidad",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Geschwindigkeit ist hoch.",
    exampleSentenceEs: "La velocidad es alta.",
    plural: "die Geschwindigkeiten"
  }, {
    de: "die Spur",
    pron: "di shpúa",
    es: "carril",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Das Auto ist auf der Spur.",
    exampleSentenceEs: "El coche está en el carril.",
    plural: "die Spuren"
  }, {
    de: "die Warnleuchten",
    pron: "di várn-loij-ten",
    es: "luces de advertencia",
    type: "Sustantivo",
    category: "Lichter",
    exampleSentenceDe: "Die Warnleuchten sind an.",
    exampleSentenceEs: "Las luces de advertencia están encendidas.",
    plural: "die Warnleuchten"
  }, {
    de: "die Baustelle",
    pron: "di báu-shté-le",
    es: "obra de cons.",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Baustelle ist groß.",
    exampleSentenceEs: "La obra es grande.",
    plural: "die Baustellen"
  }, {
    de: "die Sicherheit",
    pron: "di sí-cha-jait",
    es: "seguridad",
    type: "Sustantivo",
    category: "Allgemein",
    exampleSentenceDe: "Die Sicherheit ist wichtig.",
    exampleSentenceEs: "La seguridad es importante.",
    plural: "die Sicherheiten"
  }, {
    de: "Toter Winkel",
    pron: "tó-tea vín-kel",
    es: "ángulo muerto",
    type: "Frase",
    category: "Verkehr",
    exampleSentenceDe: "Der tote Winkel ist gefährlich.",
    exampleSentenceEs: "El ángulo muerto es peligroso.",
    regimen: "der tote Winkel"
  }, {
    de: "Schulterblick",
    pron: "shúl-tea-blik",
    es: "mirada sobre hombro",
    type: "Frase",
    category: "Verkehr",
    exampleSentenceDe: "Ich mache einen Schulterblick.",
    exampleSentenceEs: "Yo hago una mirada sobre hombro.",
    regimen: "Sustantivo compuesto"
  }, {
    de: "Rechts vor links",
    pron: "réjts-for-links",
    es: "derecha tiene preferencia",
    type: "Frase",
    category: "Verkehr",
    exampleSentenceDe: "An der Kreuzung gilt: Rechts vor links.",
    exampleSentenceEs: "En el cruce se aplica: la derecha tiene preferencia.",
    regimen: "Regla de tráfico"
  }, {
    de: "Motoröldruck",
    pron: "mó-to-a-öl-druk",
    es: "presión aceite (rojo)",
    type: "Sustantivo",
    category: "Anzeigen",
    exampleSentenceDe: "Der Motoröldruck ist gut.",
    exampleSentenceEs: "La presión del aceite del motor está bien.",
    plural: "die Motoröldrücke"
  }, {
    de: "Kühlmitteltemperatur",
    pron: "kúl-mi-tel-tem-pe-ra-tú-a",
    es: "temp. refrigerante (rojo)",
    type: "Sustantivo",
    category: "Anzeigen",
    exampleSentenceDe: "Ich sehe die Kühlmitteltemperatur. Die Kühlmitteltemperatur ist rot.",
    exampleSentenceEs: "Veo la temperatura del refrigerante. La temperatura del refrigerante es roja.",
    plural: "die Kühlmitteltemperaturen"
  }, {
    de: "das Schiebedach",
    pron: "das shí-be-daj",
    es: "techo corredizo",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich habe ein Auto. Das Auto hat ein Schiebedach.",
    exampleSentenceEs: "Yo tengo un coche. El coche tiene un techo corredizo.",
    plural: "die Schiebedächer"
  }, {
    de: "der Auspuff",
    pron: "dea áus-puf",
    es: "escape",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Der Auspuff ist neu.",
    exampleSentenceEs: "El escape es nuevo.",
    plural: "die Auspuffe"
  }, {
    de: "das Nummernschild",
    pron: "das nú-mean-shilt",
    es: "placa / matrícula",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich sehe das Nummernschild.",
    exampleSentenceEs: "Veo la matrícula.",
    plural: "die Nummernschilder"
  }, {
    de: "die Windschutzscheibe",
    pron: "di vínt-shuts-shái-be",
    es: "parabrisas",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Ich brauche einen neuen Scheibenwischer für die Windschutzscheibe.",
    exampleSentenceEs: "Necesito un limpiaparabrisas nuevo para el parabrisas.",
    plural: "die Windschutzscheiben"
  }, {
    de: "die Motorhaube",
    pron: "di mo-tóa-jáu-be",
    es: "capó",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Das Auto ist hier. Die Motorhaube ist offen.",
    exampleSentenceEs: "El coche está aquí. El capó está abierto.",
    plural: "die Motorhauben"
  }, {
    de: "die Stoßstange",
    pron: "di shtós-shtán-gue",
    es: "parachoques",
    type: "Sustantivo",
    category: "Teile",
    exampleSentenceDe: "Das ist die Stoßstange. Die Stoßstange ist neu.",
    exampleSentenceEs: "Este es el parachoques. El parachoques es nuevo.",
    plural: "die Stoßstangen"
  }, {
    de: "der Kreisverkehr",
    pron: "dea kráis-fea-ke-a",
    es: "rotonda",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich fahre in den Kreisverkehr.",
    exampleSentenceEs: "Yo entro en la rotonda.",
    plural: "die Kreisverkehre"
  }, {
    de: "die Einbahnstraße",
    pron: "di áin-ban-shtrá-se",
    es: "calle de un solo sentido",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Die Straße ist eine Einbahnstraße.",
    exampleSentenceEs: "La calle es una calle de sentido único.",
    plural: "die Einbahnstraßen"
  }, {
    de: "abbiegen",
    pron: "áp-bi-guen",
    es: "girar",
    type: "Verbo",
    category: "Verkehr",
    exampleSentenceDe: "Ich biege hier links ab.",
    exampleSentenceEs: "Yo giro aquí a la izquierda.",
    regimen: "Separable (ab-)"
  }, {
    de: "der Strafzettel",
    pron: "dea shtráf-tse-tel",
    es: "multa de tráfico",
    type: "Sustantivo",
    category: "Verkehr",
    exampleSentenceDe: "Ich habe einen Strafzettel bekommen. Der Strafzettel ist teuer.",
    exampleSentenceEs: "Recibí una multa de tráfico. La multa de tráfico es cara.",
    plural: "die Strafzettel"
  }, {
    de: "die Versicherung",
    pron: "di fea-sí-je-rung",
    es: "el seguro",
    type: "Sustantivo",
    category: "Allgemein",
    exampleSentenceDe: "Ich habe die Versicherung.",
    exampleSentenceEs: "Tengo el seguro.",
    plural: "die Versicherungen"
  }]
},
{
  id: 8,
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
    plural: "die Post"
  }, {
    de: "der Brief",
    pron: "dea bríf",
    es: "carta",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich habe den Brief. Der Brief ist hier.",
    exampleSentenceEs: "Tengo la carta. La carta está aquí.",
    plural: "die Briefe"
  }, {
    de: "die Postkarte",
    pron: "di póst-kar-te",
    es: "tarjeta postal",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich kaufe die Postkarte im Supermarkt.",
    exampleSentenceEs: "Yo compro la postal en el supermercado.",
    plural: "die Postkarten"
  }, {
    de: "schicken",
    pron: "shí-ken",
    es: "enviar",
    type: "Verbo",
    category: "Post",
    exampleSentenceDe: "Ich schicke die E-Mail morgen.",
    exampleSentenceEs: "Yo envío el correo mañana.",
    regimen: "+ Dativo (a quién) / + Akkusativ (qué)"
  }, {
    de: "bekommen",
    pron: "be-kó-men",
    es: "recibir",
    type: "Verbo",
    category: "Post",
    exampleSentenceDe: "Ich bekomme ein Geschenk.",
    exampleSentenceEs: "Yo recibo un regalo.",
    regimen: "+ Akkusativ"
  }, {
    de: "abholen",
    pron: "áp-jo-len",
    es: "recoger",
    type: "Verbo separable",
    category: "Post",
    exampleSentenceDe: "Ich hole dich am Bahnhof ab.",
    exampleSentenceEs: "Te recojo en la estación de tren.",
    regimen: "+Akk, separable (ab-)"
  }, {
    de: "die Briefmarke",
    pron: "di bríf-mar-ke",
    es: "estampilla",
    type: "Sustantivo (Fem)",
    category: "Post",
    exampleSentenceDe: "Ich brauche die Briefmarke.",
    exampleSentenceEs: "Yo necesito la estampilla.",
    plural: "die Briefmarken"
  }, {
    de: "der Absender",
    pron: "dea áp-sen-dea",
    es: "remitente",
    type: "Sustantivo (Masc)",
    category: "Post",
    exampleSentenceDe: "Wer ist der Absender?",
    exampleSentenceEs: "¿Quién es el remitente?",
    plural: "die Absender"
  }, {
    de: "der Empfänger",
    pron: "dea em-pfén-gua",
    es: "destinatario",
    type: "Sustantivo (Masc)",
    category: "Post",
    exampleSentenceDe: "Wer ist der Empfänger?",
    exampleSentenceEs: "¿Quién es el destinatario?",
    plural: "die Empfänger"
  }, {
    de: "die Adresse",
    pron: "di a-dré-se",
    es: "dirección",
    type: "Sustantivo (Fem)",
    category: "Post",
    exampleSentenceDe: "Das ist die Adresse.",
    exampleSentenceEs: "Esta es la dirección.",
    plural: "die Adressen"
  }, {
    de: "das Telefon",
    pron: "das te-le-fón",
    es: "teléfono",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Das ist mein Telefon.",
    exampleSentenceEs: "Este es mi teléfono.",
    plural: "die Telefone"
  }, {
    de: "das Handy",
    pron: "das jén-di",
    es: "celular",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe ein Handy. Das Handy ist neu.",
    exampleSentenceEs: "Tengo un celular. El celular es nuevo.",
    plural: "die Handys"
  }, {
    de: "das Fax",
    pron: "das faks",
    es: "fax",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe ein Fax. Das Fax ist neu.",
    exampleSentenceEs: "Tengo un fax. El fax es nuevo.",
    plural: "die Faxe"
  }, {
    de: "die Telefonnummer",
    pron: "di te-le-fón-nu-mea",
    es: "número de teléfono",
    type: "Sustantivo (Fem)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe die Telefonnummer. Die Telefonnummer ist neu.",
    exampleSentenceEs: "Tengo el número de teléfono. El número de teléfono es nuevo.",
    plural: "die Telefonnummern"
  }, {
    de: "das Telefonbuch",
    pron: "das te-le-fón-buj",
    es: "guía telefónica",
    type: "Sustantivo (Neutro)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich suche das Telefonbuch.",
    exampleSentenceEs: "Yo busco la guía telefónica.",
    plural: "die Telefonbücher"
  }, {
    de: "telefonieren",
    pron: "te-le-fo-ní-ren",
    es: "hablar por tel.",
    type: "Verbo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich telefoniere mit meiner Mutter.",
    exampleSentenceEs: "Yo hablo por teléfono con mi madre.",
    regimen: "+ mit + Dativ"
  }, {
    de: "anrufen",
    pron: "án-ru-fen",
    es: "llamar",
    type: "Verbo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich rufe meine Mutter an.",
    exampleSentenceEs: "Yo llamo a mi madre.",
    regimen: "Separable (an-) / + Akkusativ"
  }, {
    de: "sprechen (mit)",
    pron: "shpré-jen mit",
    es: "hablar con",
    type: "Verbo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich spreche mit meinem Freund.",
    exampleSentenceEs: "Yo hablo con mi amigo.",
    regimen: "mit + Dativ"
  }, {
    de: "besetzt",
    pron: "be-tséts",
    es: "ocupado (línea)",
    type: "Adjetivo",
    category: "Kommunikation",
    exampleSentenceDe: "Die Telefonleitung ist besetzt.",
    exampleSentenceEs: "La línea telefónica está ocupada.",
    regimen: "≠ frei"
  }, {
    de: "die Bank",
    pron: "di bank",
    es: "banco",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich sitze auf der Bank.",
    exampleSentenceEs: "Yo me siento en el banco.",
    plural: "die Bänke"
  }, {
    de: "der Schalter",
    pron: "dea shál-tea",
    es: "ventanilla",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich gehe zum Schalter.",
    exampleSentenceEs: "Voy a la ventanilla.",
    plural: "die Schalter"
  }, {
    de: "das Geld",
    pron: "das guélt",
    es: "dinero",
    type: "Sustantivo (Neutro)",
    category: "Bank",
    exampleSentenceDe: "Das ist das Geld.",
    exampleSentenceEs: "Este es el dinero.",
    plural: "kein Plural"
  }, {
    de: "bar zahlen",
    pron: "bá-a tsá-len",
    es: "pagar en efectivo",
    type: "Frase",
    category: "Bank",
    exampleSentenceDe: "Ich möchte bar zahlen.",
    exampleSentenceEs: "Quiero pagar en efectivo.",
    regimen: "Verbo al final"
  }, {
    de: "die Kreditkarte",
    pron: "di kre-dít-kar-te",
    es: "tarjeta de crédito",
    type: "Sustantivo (Fem)",
    category: "Bank",
    exampleSentenceDe: "Ich habe die Kreditkarte. Die Kreditkarte ist rot.",
    exampleSentenceEs: "Tengo la tarjeta de crédito. La tarjeta de crédito es roja.",
    plural: "die Kreditkarten"
  }, {
    de: "das Konto",
    pron: "das kón-to",
    es: "cuenta",
    type: "Sustantivo (Neutro)",
    category: "Bank",
    exampleSentenceDe: "Ich habe das Konto.",
    exampleSentenceEs: "Tengo la cuenta.",
    plural: "die Konten"
  }, {
    de: "überweisen",
    pron: "ú-ba-vái-sen",
    es: "transferir dinero",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich überweise Geld auf das Konto.",
    exampleSentenceEs: "Yo transfiero dinero a la cuenta.",
    regimen: "Inseparable / + Akkusativ"
  }, {
    de: "das Formular",
    pron: "das foa-mu-lá",
    es: "formulario",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich habe das Formular. Das Formular ist neu.",
    exampleSentenceEs: "Tengo el formulario. El formulario es nuevo.",
    plural: "die Formulare"
  }, {
    de: "ausfüllen",
    pron: "áus-fü-len",
    es: "rellenar",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich muss das Formular ausfüllen.",
    exampleSentenceEs: "Yo debo rellenar el formulario.",
    regimen: "Separable (aus-)"
  }, {
    de: "ankreuzen",
    pron: "án-krói-tsen",
    es: "marcar con cruz",
    type: "Verbo separable",
    category: "Bank",
    exampleSentenceDe: "Ich muss das Feld ankreuzen.",
    exampleSentenceEs: "Tengo que marcar el campo con una cruz.",
    regimen: "Separable (an-)"
  }, {
    de: "unterschreiben",
    pron: "un-ta-shrái-ben",
    es: "firmar",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich muss den Vertrag unterschreiben.",
    exampleSentenceEs: "Yo debo firmar el contrato.",
    regimen: "No separable + Akk"
  }, {
    de: "der Geldautomat",
    pron: "dea guélt-áu-to-mat",
    es: "cajero automático",
    type: "Sustantivo (Masc)",
    category: "Bank",
    exampleSentenceDe: "Wo ist der Geldautomat?",
    exampleSentenceEs: "¿Dónde está el cajero automático?",
    plural: "die Geldautomaten"
  }, {
    de: "das Internet",
    pron: "das ín-ta-net",
    es: "internet",
    type: "Sustantivo",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe das Internet. Das Internet ist gut.",
    exampleSentenceEs: "Tengo internet. Internet es bueno.",
    plural: "die Internets"
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ta",
    es: "computador",
    type: "Sustantivo (Masc)",
    category: "Kommunikation",
    exampleSentenceDe: "Ich habe einen Computer. Der Computer ist neu.",
    exampleSentenceEs: "Tengo un computador. El computador es nuevo.",
    plural: "die Computer"
  }, {
    de: "der Pass / Ausweis",
    pron: "dea pas  áus-vais",
    es: "pasaporte / ID",
    type: "Sustantivo",
    category: "Dokumente",
    exampleSentenceDe: "Ich brauche den Pass.",
    exampleSentenceEs: "Necesito el pasaporte.",
    plural: "die Pässe / Ausweise"
  }, {
    de: "gültig",
    pron: "gúl-tij",
    es: "válido/vigente",
    type: "Adjetivo",
    category: "Dokumente",
    exampleSentenceDe: "Mein Pass ist gültig.",
    exampleSentenceEs: "Mi pasaporte es válido.",
    regimen: "≠ ungültig"
  }, {
    de: "das Paket",
    pron: "das pa-két",
    es: "el paquete",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich habe das Paket. Das Paket ist groß.",
    exampleSentenceEs: "Tengo el paquete. El paquete es grande.",
    plural: "die Pakete"
  }, {
    de: "der Briefkasten",
    pron: "dea brif-kás-ten",
    es: "buzón de correo",
    type: "Sustantivo",
    category: "Post",
    exampleSentenceDe: "Ich habe einen Briefkasten.",
    exampleSentenceEs: "Tengo un buzón de correo.",
    plural: "die Briefkästen"
  }, {
    de: "die Gebühr",
    pron: "di gue-bü-a",
    es: "tarifa(comisión)",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Die Gebühr ist zehn Euro.",
    exampleSentenceEs: "La tarifa es de diez euros.",
    plural: "die Gebühren"
  }, {
    de: "der Kredit",
    pron: "dea kre-dít",
    es: "crédito",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich habe den Kredit. Der Kredit ist gut.",
    exampleSentenceEs: "Tengo el crédito. El crédito es bueno.",
    plural: "die Kredite"
  }, {
    de: "abheben",
    pron: "áp-jé-ben",
    es: "retirar dinero",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich möchte Geld abheben.",
    exampleSentenceEs: "Quiero retirar dinero.",
    regimen: "Separable (ab-), +Akk"
  }, {
    de: "einzahlen",
    pron: "áin-tsa-len",
    es: "depositar",
    type: "Verbo",
    category: "Bank",
    exampleSentenceDe: "Ich zahle Geld auf die Bank ein.",
    exampleSentenceEs: "Yo deposito dinero en el banco.",
    regimen: "Separable (ein-), +Akk"
  }, {
    de: "die Geheimzahl",
    pron: "di gue-jáim-tsal",
    es: "el PIN",
    type: "Sustantivo",
    category: "Bank",
    exampleSentenceDe: "Ich habe die Geheimzahl vergessen.",
    exampleSentenceEs: "Olvidé el PIN.",
    plural: "die Geheimzahlen"
  }]
},
{
  id: 9,
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
    plural: "die Augen"
  }, {
    de: "die Hand",
    pron: "di jant",
    es: "mano",
    type: "Sustantivo (Fem)",
    category: "Körper",
    exampleSentenceDe: "Ich habe eine Hand. Die Hand ist klein.",
    exampleSentenceEs: "Tengo una mano. La mano es pequeña.",
    plural: "die Hände"
  }, {
    de: "der Arm",
    pron: "dea aam",
    es: "brazo",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe einen Arm.",
    exampleSentenceEs: "Tengo un brazo.",
    plural: "die Arme"
  }, {
    de: "das Bein",
    pron: "das báin",
    es: "pierna",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe ein Bein.",
    exampleSentenceEs: "Yo tengo una pierna.",
    plural: "die Beine"
  }, {
    de: "der Kopf",
    pron: "dea kopf",
    es: "cabeza",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe Kopfschmerzen.",
    exampleSentenceEs: "Tengo dolor de cabeza.",
    plural: "die Köpfe"
  }, {
    de: "der Fuß",
    pron: "dea fus",
    es: "pie",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Mein Fuß ist groß.",
    exampleSentenceEs: "Mi pie es grande.",
    plural: "die Füße"
  }, {
    de: "der Mund",
    pron: "dea munt",
    es: "boca",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe einen Mund.",
    exampleSentenceEs: "Tengo una boca.",
    plural: "die Münder"
  }, {
    de: "der Zahn",
    pron: "dea tsán",
    es: "diente",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Mein Zahn ist schlecht.",
    exampleSentenceEs: "Mi diente está mal.",
    plural: "die Zähne"
  }, {
    de: "die Nase",
    pron: "di ná-se",
    es: "nariz",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Die Nase ist rot.",
    exampleSentenceEs: "La nariz es roja.",
    plural: "die Nasen"
  }, {
    de: "das Ohr",
    pron: "das ó-a",
    es: "oreja",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe ein Ohr. Das Ohr ist rot.",
    exampleSentenceEs: "Tengo una oreja. La oreja está roja.",
    plural: "die Ohren"
  }, {
    de: "das Haar",
    pron: "das já-a",
    es: "pelo",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Das Haar ist rot.",
    exampleSentenceEs: "El pelo es rojo.",
    plural: "die Haare"
  }, {
    de: "der Bauch",
    pron: "dea báuj",
    es: "barriga",
    type: "Sustantivo",
    category: "Körper",
    exampleSentenceDe: "Ich habe Hunger. Mein Bauch ist leer.",
    exampleSentenceEs: "Tengo hambre. Mi barriga está vacía.",
    plural: "die Bäuche"
  }, {
    de: "der Finger",
    pron: "dea fín-ga",
    es: "dedo",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Das ist mein Finger.",
    exampleSentenceEs: "Este es mi dedo.",
    plural: "die Finger"
  }, {
    de: "der Rücken",
    pron: "dea rú-ken",
    es: "espalda",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe Schmerzen im Rücken.",
    exampleSentenceEs: "Tengo dolor en la espalda.",
    plural: "die Rücken"
  }, {
    de: "der Hals",
    pron: "dea jals",
    es: "cuello",
    type: "Sustantivo (Masc)",
    category: "Körper",
    exampleSentenceDe: "Ich habe Schmerzen am Hals.",
    exampleSentenceEs: "Tengo dolor en el cuello.",
    plural: "die Hälse"
  }, {
    de: "wehtun",
    pron: "vé-tun",
    es: "doler",
    type: "Verbo separable",
    category: "Krankheit",
    exampleSentenceDe: "Mein Kopf tut weh.",
    exampleSentenceEs: "Mi cabeza duele.",
    regimen: "+ Dativo (a quién duele)"
  }, {
    de: "Wie geht es Ihnen?",
    pron: "ví guet es í-nen",
    es: "¿Cómo está usted?",
    type: "Frase",
    category: "Kommunikation",
    exampleSentenceDe: "Hallo, wie geht es Ihnen?",
    exampleSentenceEs: "Hola, ¿cómo está usted?",
    regimen: "Formal"
  }, {
    de: "Es geht mir gut",
    pron: "es guét mia gut",
    es: "Me va bien",
    type: "Frase",
    category: "Kommunikation",
    exampleSentenceDe: "Hallo! Mir geht es gut, danke.",
    exampleSentenceEs: "¡Hola! Me va bien, gracias.",
    regimen: "Dat: mir"
  }, {
    de: "schlafen",
    pron: "shlá-fen",
    es: "dormir",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich schlafe heute.",
    exampleSentenceEs: "Yo duermo hoy.",
    regimen: "Irregular (schläft)"
  }, {
    de: "ins Bett gehen",
    pron: "ins bet gué-en",
    es: "ir a la cama",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Ich gehe jetzt ins Bett.",
    exampleSentenceEs: "Yo voy a la cama ahora.",
    regimen: "ins + Akkusativ"
  }, {
    de: "im Bett liegen",
    pron: "im bet lí-guen",
    es: "estar en la cama",
    type: "Frase",
    category: "Aktionen",
    exampleSentenceDe: "Ich liege im Bett.",
    exampleSentenceEs: "Yo estoy en la cama.",
    regimen: "in+Dat=fijo"
  }, {
    de: "krank",
    pron: "kránk",
    es: "enfermo",
    type: "Adjetivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich bin krank.",
    exampleSentenceEs: "Yo estoy enfermo.",
    regimen: "≠ gesund"
  }, {
    de: "das Fieber",
    pron: "das fí-ba",
    es: "fiebre",
    type: "Sustantivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich habe Fieber. Das Fieber ist hoch.",
    exampleSentenceEs: "Tengo fiebre. La fiebre es alta.",
    plural: "die Fieber"
  }, {
    de: "der Arzt",
    pron: "dea artst",
    es: "médico",
    type: "Sustantivo (Masc)",
    category: "Medizin",
    exampleSentenceDe: "Ich bin krank. Ich gehe zum Arzt.",
    exampleSentenceEs: "Estoy enfermo. Voy al médico.",
    plural: "die Ärzte"
  }, {
    de: "der Doktor",
    pron: "dea dók-toa",
    es: "doctor",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Der Doktor ist nett.",
    exampleSentenceEs: "El doctor es amable.",
    plural: "die Doktoren"
  }, {
    de: "die Apotheke",
    pron: "di a-po-té-ke",
    es: "farmacia",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich gehe zur Apotheke.",
    exampleSentenceEs: "Voy a la farmacia.",
    plural: "die Apotheken"
  }, {
    de: "das Medikament",
    pron: "das me-di-ka-mént",
    es: "medicamento",
    type: "Sustantivo (Neutro)",
    category: "Medizin",
    exampleSentenceDe: "Das Medikament ist neu.",
    exampleSentenceEs: "El medicamento es nuevo.",
    plural: "die Medikamente"
  }, {
    de: "das Rezept",
    pron: "das re-tsépt",
    es: "receta médica",
    type: "Sustantivo (Neutro)",
    category: "Medizin",
    exampleSentenceDe: "Ich brauche das Rezept von dem Arzt.",
    exampleSentenceEs: "Necesito la receta del médico.",
    plural: "die Rezepte"
  }, {
    de: "die Praxis",
    pron: "di prák-sis",
    es: "consultorio",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich gehe in die Praxis von dem Arzt.",
    exampleSentenceEs: "Voy al consultorio del doctor.",
    plural: "die Praxen"
  }, {
    de: "das Krankenhaus",
    pron: "das krán-ken-jáus",
    es: "hospital",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich bin im Krankenhaus.",
    exampleSentenceEs: "Estoy en el hospital.",
    plural: "die Krankenhäuser"
  }, {
    de: "der Termin",
    pron: "dea tea-mín",
    es: "cita",
    type: "Sustantivo (Masc)",
    category: "Medizin",
    exampleSentenceDe: "Ich habe einen Termin am Montag.",
    exampleSentenceEs: "Tengo una cita el lunes.",
    plural: "die Termine"
  }, {
    de: "Gute Besserung",
    pron: "gú-te bé-se-rung",
    es: "¡Que te mejores!",
    type: "Frase",
    category: "Kommunikation",
    exampleSentenceDe: "Ich wünsche dir gute Besserung.",
    exampleSentenceEs: "Te deseo que te mejores.",
    regimen: "Fórmula fija"
  }, {
    de: "das Pflaster",
    pron: "das pflás-ta",
    es: "tirita(curita)",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich habe das Pflaster. Das Pflaster ist klein.",
    exampleSentenceEs: "Tengo la tirita. La tirita es pequeña.",
    plural: "die Pflaster"
  }, {
    de: "die Salbe",
    pron: "di sál-be",
    es: "pomada",
    type: "Sustantivo",
    category: "Medizin",
    exampleSentenceDe: "Ich habe die Salbe.",
    exampleSentenceEs: "Tengo la pomada.",
    plural: "die Salben"
  }, {
    de: "die Erkältung",
    pron: "di ea-kél-tung",
    es: "resfriado",
    type: "Sustantivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich habe die Erkältung.",
    exampleSentenceEs: "Tengo el resfriado.",
    plural: "die Erkältungen"
  }, {
    de: "husten",
    pron: "jús-ten",
    es: "toser",
    type: "Verbo",
    category: "Krankheit",
    exampleSentenceDe: "Ich huste.",
    exampleSentenceEs: "Yo toso.",
    regimen: "Intransitivo"
  }, {
    de: "bluten",
    pron: "blú-ten",
    es: "sangrar",
    type: "Verbo",
    category: "Krankheit",
    exampleSentenceDe: "Ich blute nicht.",
    exampleSentenceEs: "Yo no sangro.",
    regimen: "Intransitivo"
  }, {
    de: "sich verletzen",
    pron: "zij fea-lét-sen",
    es: "lastimarse",
    type: "Verbo",
    category: "Krankheit",
    exampleSentenceDe: "Ich verletze mich nicht.",
    exampleSentenceEs: "No me lastimo.",
    regimen: "Reflexivo + Akkusativ"
  }, {
    de: "der Schmerz",
    pron: "dea shmérts",
    es: "el dolor",
    type: "Sustantivo",
    category: "Krankheit",
    exampleSentenceDe: "Ich habe Schmerz. Der Schmerz ist stark.",
    exampleSentenceEs: "Tengo dolor. El dolor es fuerte.",
    plural: "die Schmerzen"
  }, {
    de: "schwanger",
    pron: "shván-guea",
    es: "embarazada",
    type: "Adjetivo",
    category: "Körper",
    exampleSentenceDe: "Sie ist schwanger.",
    exampleSentenceEs: "Ella está embarazada.",
    regimen: "≠ nicht schwanger"
  },
  {
    de: "die Seife",
    pron: "di zái-fe",
    es: "el jabón",
    type: "Sustantivo (Fem)",
    category: "Körperpflege",
    plural: "die Seifen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "das Shampoo",
    pron: "das shám-pu",
    es: "el champú",
    type: "Sustantivo (Neutro)",
    category: "Körperpflege",
    plural: "die Shampoos",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Zahnbürste",
    pron: "di tsán-büa-ste",
    es: "cepillo de dientes",
    type: "Sustantivo (Fem)",
    category: "Körperpflege",
    plural: "die Zahnbürsten",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Zahnpasta",
    pron: "di tsán-pas-ta",
    es: "pasta de dientes",
    type: "Sustantivo (Fem)",
    category: "Körperpflege",
    plural: "die Zahnpasten",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Kamm",
    pron: "dea kam",
    es: "el peine",
    type: "Sustantivo (Masc)",
    category: "Körperpflege",
    plural: "die Kämme",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Föhn",
    pron: "dea fön",
    es: "secador de pelo",
    type: "Sustantivo (Masc)",
    category: "Körperpflege",
    plural: "die Föhne",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Rasierer",
    pron: "dea ra-zí-ra",
    es: "la afeitadora",
    type: "Sustantivo (Masc)",
    category: "Körperpflege",
    plural: "die Rasierer",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Tablette",
    pron: "di ta-blé-te",
    es: "la pastilla / píldora",
    type: "Sustantivo (Fem)",
    category: "Gesundheit",
    plural: "die Tabletten",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Krankheit",
    pron: "di kránk-hait",
    es: "la enfermedad",
    type: "Sustantivo (Fem)",
    category: "Gesundheit",
    plural: "die Krankheiten",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "die Gesundheit",
    pron: "di gue-zúnt-hait",
    es: "la salud",
    type: "Sustantivo (Fem)",
    category: "Gesundheit",
    plural: "-",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Notfall",
    pron: "dea nót-fal",
    es: "la emergencia",
    type: "Sustantivo (Masc)",
    category: "Gesundheit",
    plural: "die Notfälle",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Krankenwagen",
    pron: "dea krán-ken-va-guen",
    es: "la ambulancia",
    type: "Sustantivo (Masc)",
    category: "Gesundheit",
    plural: "die Krankenwagen",
    exampleSentenceDe: "undefined",
    exampleSentenceEs: "undefined"
  }, {
        de: "der Muskel",
    pron: "dea mús-kel",
    es: "el músculo",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Muskeln",
    en: "strong flexing bicep muscle",
    exampleSentenceDe: "Der Muskel tut weh.",
    exampleSentenceEs: "El músculo duele."
  }, {
        de: "der Knochen",
    pron: "dea knó-jen",
    es: "el hueso",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Knochen",
    en: "white skeleton bone",
    exampleSentenceDe: "Der Hund hat einen Knochen.",
    exampleSentenceEs: "El perro tiene un hueso."
  }, {
        de: "die Haut",
    pron: "di jaut",
    es: "la piel",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Häute",
    en: "smooth human skin texture",
    exampleSentenceDe: "Meine Haut ist trocken.",
    exampleSentenceEs: "Mi piel está seca."
  }, {
        de: "das Gehirn",
    pron: "das gue-jírn",
    es: "el cerebro",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Gehirne",
    en: "pink anatomical human brain",
    exampleSentenceDe: "Das Gehirn ist wichtig.",
    exampleSentenceEs: "El cerebro es importante."
  }, {
        de: "das Herz",
    pron: "das jerts",
    es: "el corazón",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Herzen",
    en: "red anatomical human heart",
    exampleSentenceDe: "Mein Herz schlägt schnell.",
    exampleSentenceEs: "Mi corazón late rápido."
  }, {
        de: "die Lunge",
    pron: "di lúng-e",
    es: "el pulmón",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Lungen",
    en: "pink anatomical human lungs",
    exampleSentenceDe: "Rauchen ist schlecht für die Lunge.",
    exampleSentenceEs: "Fumar es malo para el pulmón."
  }, {
        de: "die Leber",
    pron: "di lé-ber",
    es: "el hígado",
    type: "Sustantivo",
    category: "Körper",
    plural: "die Lebern",
    en: "dark red anatomical human liver",
    exampleSentenceDe: "Alkohol schadet der Leber.",
    exampleSentenceEs: "El alcohol daña el hígado."
  }, {
        de: "atmen",
    pron: "át-men",
    es: "respirar",
    type: "Verbo",
    category: "Gesundheit",
    regimen: "Intransitivo",
    en: "person taking a deep breath",
    exampleSentenceDe: "Er kann nicht gut atmen.",
    exampleSentenceEs: "Él no puede respirar bien."
  }, {
        de: "schwitzen",
    pron: "shví-tsen",
    es: "sudar",
    type: "Verbo",
    category: "Gesundheit",
    regimen: "Intransitivo",
    en: "sweating tired person",
    exampleSentenceDe: "Ich schwitze beim Sport.",
    exampleSentenceEs: "Sudo durante el deporte."
  }, {
        de: "zittern",
    pron: "tsí-tern",
    es: "temblar",
    type: "Verbo",
    category: "Gesundheit",
    regimen: "Intransitivo",
    en: "shivering freezing person",
    exampleSentenceDe: "Ich zittere vor Kälte.",
    exampleSentenceEs: "Tiemblo de frío."
  }]
},
{
  id: 11,
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
    plural: "die Schulen"
  }, {
    de: "die Klasse",
    pron: "di klá-se",
    es: "clase",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich bin in der Klasse.",
    exampleSentenceEs: "Yo estoy en la clase.",
    plural: "die Klassen"
  }, {
    de: "der Lehrer / die Lehrerin",
    pron: "dea lé-ra  di lé-re-rin",
    es: "profesor / profesora",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Das ist mein Lehrer. Mein Lehrer ist nett.",
    exampleSentenceEs: "Este es mi profesor. Mi profesor es simpático.",
    plural: "die Lehrer / die Lehrerinnen"
  }, {
    de: "der Schüler / die Schülerin",
    pron: "dea shú-la  di shú-le-rin",
    es: "alumno / alumna",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Der Schüler ist neu. Er ist in der Klasse.",
    exampleSentenceEs: "El alumno es nuevo. Él está en la clase.",
    plural: "die Schüler / die Schülerinnen"
  }, {
    de: "der Student",
    pron: "dea shtu-dént",
    es: "estudiante (uni)",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Ich bin ein Student. Der Student ist neu.",
    exampleSentenceEs: "Soy un estudiante. El estudiante es nuevo.",
    plural: "die Studenten"
  }, {
    de: "lernen",
    pron: "lér-nen",
    es: "aprender / estudiar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich lerne Deutsch.",
    exampleSentenceEs: "Yo aprendo alemán.",
    regimen: "+ Akkusativ"
  }, {
    de: "der Unterricht",
    pron: "dea ún-tea-rijt",
    es: "clase (sesión)",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Der Unterricht beginnt jetzt.",
    exampleSentenceEs: "La clase empieza ahora.",
    plural: "die Unterrichte"
  }, {
    de: "der Kurs",
    pron: "dea kúrs",
    es: "curso",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Der Deutschkurs ist gut.",
    exampleSentenceEs: "El curso de alemán es bueno.",
    plural: "die Kurse"
  }, {
    de: "die Pause",
    pron: "di páu-se",
    es: "descanso/recreo",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Wir machen jetzt eine Pause.",
    exampleSentenceEs: "Ahora hacemos un descanso.",
    plural: "die Pausen"
  }, {
    de: "die Hausaufgabe",
    pron: "di jáus-áuf-gá-be",
    es: "tarea",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache die Hausaufgabe.",
    exampleSentenceEs: "Yo hago la tarea.",
    plural: "die Hausaufgaben"
  }, {
    de: "die Prüfung",
    pron: "di prǘ-fung",
    es: "examen",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Die Prüfung ist schwer.",
    exampleSentenceEs: "El examen es difícil.",
    plural: "die Prüfungen"
  }, {
    de: "die Lösung",
    pron: "di lö-sung",
    es: "solución",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich habe eine Lösung. Die Lösung ist einfach.",
    exampleSentenceEs: "Tengo una solución. La solución es simple.",
    plural: "die Lösungen"
  }, {
    de: "der Fehler",
    pron: "dea fé-la",
    es: "error",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache einen Fehler. Der Fehler ist groß.",
    exampleSentenceEs: "Yo cometo un error. El error es grande.",
    plural: "die Fehler"
  }, {
    de: "die Arbeit",
    pron: "di ár-bait",
    es: "trabajo",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Die Arbeit ist interessant.",
    exampleSentenceEs: "El trabajo es interesante.",
    plural: "die Arbeiten"
  }, {
    de: "der Beruf",
    pron: "dea be-rúf",
    es: "profesión",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Was ist dein Beruf?",
    exampleSentenceEs: "¿Cuál es tu profesión?",
    plural: "die Berufe"
  }, {
    de: "Mechaniker von Beruf",
    pron: "me-já-ni-ka fon be-rúf",
    es: "mecánico de profesión",
    type: "Frase",
    category: "Beruf",
    exampleSentenceDe: "Ich bin Mechaniker von Beruf.",
    exampleSentenceEs: "Soy mecánico de profesión.",
    regimen: "von + dat., sin artículo"
  }, {
    de: "der Arbeitsplatz / Job",
    pron: "dea ár-baits-plats  dshob",
    es: "puesto de trabajo / empleo",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich habe einen Arbeitsplatz. Der Arbeitsplatz ist gut.",
    exampleSentenceEs: "Tengo un puesto de trabajo. El puesto de trabajo es bueno.",
    plural: "die Arbeitsplätze"
  }, {
    de: "arbeiten",
    pron: "ár-bai-ten",
    es: "trabajar",
    type: "Verbo",
    category: "Beruf",
    exampleSentenceDe: "Ich arbeite heute.",
    exampleSentenceEs: "Yo trabajo hoy.",
    regimen: "+ an/bei + Dat"
  }, {
    de: "der Chef / die Chefin",
    pron: "dea shef  di shé-fin",
    es: "jefe / jefa",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Der Chef ist nett.",
    exampleSentenceEs: "El jefe es simpático.",
    plural: "die Chefs / die Chefinnen"
  }, {
    de: "der Kollege / die Kollegin",
    pron: "dea ko-lé-gue  di ko-lé-guin",
    es: "colega",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Ich habe einen Kollegen. Mein Kollege ist nett.",
    exampleSentenceEs: "Tengo un colega. Mi colega es simpático.",
    plural: "die Kollegen / Kolleginnen"
  }, {
    de: "die Firma / das Büro",
    pron: "di fír-ma  das bü-ró",
    es: "empresa / oficina",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich arbeite in der Firma.",
    exampleSentenceEs: "Yo trabajo en la empresa.",
    plural: "die Firmen / die Büros"
  }, {
    de: "arbeitslos",
    pron: "ár-baits-lohs",
    es: "desempleado",
    type: "Adjetivo",
    category: "Beruf",
    exampleSentenceDe: "Ich bin arbeitslos.",
    exampleSentenceEs: "Yo estoy desempleado.",
    regimen: "≠ berufstätig"
  }, {
    de: "der Arbeiter",
    pron: "dea ár-bai-ta",
    es: "obrero",
    type: "Sustantivo",
    category: "Personen",
    exampleSentenceDe: "Ich sehe der Arbeiter.",
    exampleSentenceEs: "Yo veo al obrero.",
    plural: "die Arbeiter"
  }, {
    de: "das Praktikum",
    pron: "das prák-ti-kum",
    es: "pasantía",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache ein Praktikum in Deutschland.",
    exampleSentenceEs: "Hago una pasantía en Alemania.",
    plural: "die Praktika"
  }, {
    de: "die Ausbildung",
    pron: "di áus-bíl-dung",
    es: "formación dual",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Die Ausbildung ist wichtig.",
    exampleSentenceEs: "La formación es importante.",
    plural: "die Ausbildungen"
  }, {
    de: "der Urlaub",
    pron: "dea úa-laup",
    es: "vacaciones",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich habe Urlaub.",
    exampleSentenceEs: "Tengo vacaciones.",
    plural: "die Urlaube"
  }, {
    de: "selbstständig",
    pron: "sélpst-shtén-dij",
    es: "independiente",
    type: "Adjetivo",
    category: "Beruf",
    exampleSentenceDe: "Ich bin selbstständig.",
    exampleSentenceEs: "Soy independiente.",
    regimen: "≠ abhängig"
  }, {
    de: "die Stelle",
    pron: "di shté-le",
    es: "plaza/vacante",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Ich suche die Stelle.",
    exampleSentenceEs: "Yo busco la plaza.",
    plural: "die Stellen"
  }, {
    de: "Geld verdienen",
    pron: "guelt fea-dí-nen",
    es: "ganar dinero",
    type: "Frase",
    category: "Beruf",
    exampleSentenceDe: "Ich möchte Geld verdienen.",
    exampleSentenceEs: "Yo quiero ganar dinero.",
    regimen: "Verbo + Akkusativ"
  }, {
    de: "schwere / leichte Arbeit",
    pron: "shvé-re  láij-te ar-báit",
    es: "trabajo pesado/ligero",
    type: "Frase",
    category: "Beruf",
    exampleSentenceDe: "Die Arbeit ist schwer.",
    exampleSentenceEs: "El trabajo es pesado.",
    regimen: "Adj. + sustantivo neutro"
  }, {
    de: "das Internet",
    pron: "das ín-ta-net",
    es: "internet",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Ich habe das Internet. Das Internet ist gut.",
    exampleSentenceEs: "Tengo internet. Internet es bueno.",
    plural: "die Internets"
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ta",
    es: "computador",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Ich habe einen Computer. Der Computer ist neu.",
    exampleSentenceEs: "Tengo un computador. El computador es nuevo.",
    plural: "die Computer"
  }, {
    de: "der Drucker",
    pron: "dea drú-ka",
    es: "impresora",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Das ist mein Drucker. Der Drucker ist neu.",
    exampleSentenceEs: "Esta es mi impresora. La impresora es nueva.",
    plural: "die Drucker"
  }, {
    de: "der Bleistift",
    pron: "dea blái-shtift",
    es: "lápiz",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Das ist ein Bleistift. Der Bleistift ist blau.",
    exampleSentenceEs: "Esto es un lápiz. El lápiz es azul.",
    plural: "die Bleistifte"
  }, {
    de: "der Kugelschreiber",
    pron: "dea kú-guel-shrái-ba",
    es: "bolígrafo",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Ich habe einen Kugelschreiber. Der Kugelschreiber ist blau.",
    exampleSentenceEs: "Tengo un bolígrafo. El bolígrafo es azul.",
    plural: "die Kugelschreiber"
  }, {
    de: "der Schreibtisch",
    pron: "dea shráip-tish",
    es: "escritorio",
    type: "Sustantivo",
    category: "Büro",
    exampleSentenceDe: "Der Schreibtisch ist groß.",
    exampleSentenceEs: "El escritorio es grande.",
    plural: "die Schreibtische"
  }, {
    de: "das Zeugnis",
    pron: "das tsóik-nis",
    es: "boletín de notas",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich habe das Zeugnis. Das Zeugnis ist gut.",
    exampleSentenceEs: "Tengo el boletín de notas. El boletín de notas es bueno.",
    plural: "die Zeugnisse"
  }, {
    de: "der Stundenplan",
    pron: "dea shtún-den-plan",
    es: "horario de clases",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich habe der Stundenplan.",
    exampleSentenceEs: "Tengo el horario de clases.",
    plural: "die Stundenpläne"
  }, {
    de: "fehlen",
    pron: "fé-len",
    es: "faltar",
    type: "Verbo",
    category: "Bildung",
    exampleSentenceDe: "Mir fehlen die Zähne.",
    exampleSentenceEs: "Me faltan los dientes.",
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "bestehen",
    pron: "be-shté-en",
    es: "aprobar",
    type: "Verbo",
    category: "Bildung",
    exampleSentenceDe: "Die Prüfung besteht aus zehn Fragen.",
    exampleSentenceEs: "El examen consta de diez preguntas.",
    regimen: "+ Akkusativ, no separable"
  }, {
    de: "durchfallen",
    pron: "dúrch-fa-len",
    es: "reprobar",
    type: "Verbo separable",
    category: "Bildung",
    exampleSentenceDe: "Ich falle bei der Prüfung durch.",
    exampleSentenceEs: "Reprobo en el examen.",
    regimen: "Separable (durch-)"
  }, {
    de: "die Besprechung",
    pron: "di be-shpré-jung",
    es: "la reunión",
    type: "Sustantivo",
    category: "Beruf",
    exampleSentenceDe: "Die Besprechung ist um neun Uhr.",
    exampleSentenceEs: "La reunión es a las nueve.",
    plural: "die Besprechungen"
  }, {
    de: "kündigen",
    pron: "kún-di-guen",
    es: "renunciar",
    type: "Verbo",
    category: "Beruf",
    exampleSentenceDe: "Ich kündige meinen Job.",
    exampleSentenceEs: "Yo renuncio a mi trabajo.",
    regimen: "+ Dativ"
  }, {
    de: "befördern",
    pron: "be-féa-den",
    es: "ascender",
    type: "Verbo",
    category: "Beruf",
    exampleSentenceDe: "Ich befördere meine Tasche.",
    exampleSentenceEs: "Yo transporte mi bolso.",
    regimen: "+ Akkusativ"
  }, {
    de: "die Universität",
    pron: "di u-ni-vea-si-tét",
    es: "universidad",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich bin an der Universität. Die Universität ist groß.",
    exampleSentenceEs: "Yo estoy en la universidad. La universidad es grande.",
    plural: "die Universitäten"
  }, {
    de: "anmelden",
    pron: "án-mel-den",
    es: "inscribirse",
    type: "Verbo",
    category: "Bildung",
    exampleSentenceDe: "Ich melde mich für den Kurs an.",
    exampleSentenceEs: "Me inscribo para el curso.",
    regimen: "Sep./refl. + Akkusativ"
  }, {
    de: "die Anmeldung",
    pron: "di án-mel-dung",
    es: "inscripción",
    type: "Sustantivo",
    category: "Bildung",
    exampleSentenceDe: "Ich mache die Anmeldung für den Kurs.",
    exampleSentenceEs: "Yo hago la inscripción para el curso.",
    plural: "die Anmeldungen"
  }, {
    de: "sprechen",
    pron: "shpré-jen",
    es: "hablar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich spreche Deutsch.",
    exampleSentenceEs: "Yo hablo alemán.",
    regimen: "+ Akkusativ, irr. (spricht)"
  }, {
    de: "verstehen",
    pron: "fea-shté-en",
    es: "entender",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich verstehe das.",
    exampleSentenceEs: "Yo entiendo eso.",
    regimen: "+ Akkusativ"
  }, {
    de: "fragen",
    pron: "frá-guen",
    es: "preguntar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich frage dich.",
    exampleSentenceEs: "Yo te pregunto.",
    regimen: "+ Akkusativ (jdn.)"
  }, {
    de: "antworten",
    pron: "ánt-vor-ten",
    es: "responder",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich antworte auf deine Frage.",
    exampleSentenceEs: "Yo respondo a tu pregunta.",
    regimen: "⚠️ Exige Dativo"
  }, {
    de: "erklären",
    pron: "ea-klé-ren",
    es: "explicar",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Ich kann das nicht erklären.",
    exampleSentenceEs: "Yo no puedo explicar eso.",
    regimen: "jdm. + Akk."
  }, {
    de: "wiederholen",
    pron: "ví-da-jó-len",
    es: "repetir",
    type: "Verbo",
    category: "Aktionen",
    exampleSentenceDe: "Bitte wiederholen Sie das.",
    exampleSentenceEs: "Por favor, repita eso.",
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
    exampleSentenceEs: "El arquitecto planea la casa."
  }, {
        de: "der Anwalt / die Anwältin",
    pron: "dea án-valt",
    es: "abogado",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Anwälte",
    en: "lawyer in a suit with a briefcase",
    exampleSentenceDe: "Ich brauche einen Anwalt.",
    exampleSentenceEs: "Necesito un abogado."
  }, {
        de: "der Richter / die Richterin",
    pron: "dea ríj-ter",
    es: "juez",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Richter",
    en: "judge holding a wooden gavel",
    exampleSentenceDe: "Der Richter ist sehr streng.",
    exampleSentenceEs: "El juez es muy estricto."
  }, {
        de: "der Schauspieler",
    pron: "dea sháu-shpi-ler",
    es: "actor",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Schauspieler",
    en: "actor holding a theater mask",
    exampleSentenceDe: "Er ist ein bekannter actor.",
    exampleSentenceEs: "Él es un actor conocido."
  }, {
        de: "der Bäcker / die Bäckerin",
    pron: "dea bé-ker",
    es: "panadero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Bäcker",
    en: "baker holding fresh bread",
    exampleSentenceDe: "Der Bäcker arbeitet in der Nacht.",
    exampleSentenceEs: "El panadero trabaja en la noche."
  }, {
        de: "der Metzger / die Metzgerin",
    pron: "dea méts-guer",
    es: "carnicero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Metzger",
    en: "butcher cutting meat",
    exampleSentenceDe: "Ich kaufe Fleisch beim Metzger.",
    exampleSentenceEs: "Compro carne en el carnicero."
  }, {
        de: "der Friseur / die Friseurin",
    pron: "dea fri-zöa",
    es: "peluquero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Friseure",
    en: "hairdresser with scissors",
    exampleSentenceDe: "Ich gehe morgen zum Friseur.",
    exampleSentenceEs: "Mañana voy al peluquero."
  }, {
        de: "der Soldat / die Soldatin",
    pron: "dea zol-dát",
    es: "soldado",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Soldaten",
    en: "soldier in uniform",
    exampleSentenceDe: "Mein Bruder ist Soldat.",
    exampleSentenceEs: "Mi hermano es soldado."
  }, {
        de: "der Künstler / die Künstlerin",
    pron: "dea küns-tler",
    es: "artista",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Künstler",
    en: "artist holding a paint palette",
    exampleSentenceDe: "Sie ist eine freie Künstlerin.",
    exampleSentenceEs: "Ella es una artista independiente."
  }, {
        de: "der Bauer / die Bäuerin",
    pron: "dea báu-er",
    es: "granjero",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Bauern",
    en: "farmer holding a pitchfork",
    exampleSentenceDe: "Der Bauer hat viele Kühe.",
    exampleSentenceEs: "El granjero tiene muchas vacas."
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
    exampleSentenceEs: "Camarero trae la comida."
  }, {
        de: "der Koch / die Köchin",
    pron: "dea koj / di ko-jin",
    es: "el cocinero / la cocinera",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Köche / die Köchinnen",
    en: "a white chef hat and a spatula",
    exampleSentenceDe: "Der Koch kocht sehr gut.",
    exampleSentenceEs: "El cocinero cocina muy bien."
  }, {
        de: "der Polizist / die Polizistin",
    pron: "dea po-li-tsist / di po-li-tsis-tin",
    es: "el policía / la mujer policía",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Polizisten / die Polizistinnen",
    en: "a silver police badge",
    exampleSentenceDe: "Die Polizei hilft den Menschen.",
    exampleSentenceEs: "La policía ayuda a las personas."
  }, {
        de: "der Ingenieur / die Ingenieurin",
    pron: "dea in-ye-niur / di in-ye-niu-rin",
    es: "el ingeniero / la ingeniera",
    type: "Sustantivo",
    category: "Beruf",
    plural: "die Ingenieure / die Ingenieurinnen",
    en: "a yellow safety helmet over blueprints",
    exampleSentenceDe: "Sie arbeitet als Ingenieurin bei BMW.",
    exampleSentenceEs: "Ella trabaja como ingeniera en BMW."
  }, {
        de: "das Heft",
    pron: "das jeft",
    es: "el cuaderno",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Hefte",
    en: "a simple spiral notebook",
    exampleSentenceDe: "Schreiben Sie das bitte in Ihr Heft.",
    exampleSentenceEs: "Escriba eso en su cuaderno, por favor."
  }, {
        de: "das Papier",
    pron: "das pa-pia",
    es: "el papel",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Papiere",
    en: "a stack of blank white paper sheets",
    exampleSentenceDe: "Der Drucker braucht neues Papier.",
    exampleSentenceEs: "La impresora necesita papel nuevo."
  }, {
        de: "der Radiergummi",
    pron: "dea ra-dia-gu-mi",
    es: "el borrador / la goma",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Radiergummis",
    en: "a classic pink and blue eraser",
    exampleSentenceDe: "Hast du einen Radiergummi für mich?",
    exampleSentenceEs: "¿Tienes un borrador para mí?"
  }, {
        de: "der Rucksack",
    pron: "dea ruk-sak",
    es: "la mochila",
    type: "Sustantivo",
    category: "Büro",
    plural: "die Rucksäcke",
    en: "a colorful school backpack",
    exampleSentenceDe: "Mein Rucksack ist sehr schwer.",
    exampleSentenceEs: "Mi mochila es muy pesada."
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
    exampleSentenceEs: "Necesito un portátil nuevo."
  }, {
    de: "der Bildschirm",
    pron: "dea bilt-shirm",
    es: "la pantalla",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Bildschirme",
    en: "a cute 3D isometric UI icon of a glowing computer monitor",
    exampleSentenceDe: "Der Bildschirm ist sehr groß.",
    exampleSentenceEs: "La pantalla es muy grande."
  }, {
    de: "die Tastatur",
    pron: "di tas-ta-túr",
    es: "el teclado",
    type: "Sustantivo (Fem)",
    category: "Hardware",
    plural: "die Tastaturen",
    en: "a cute 3D isometric UI icon of a mechanical computer keyboard",
    exampleSentenceDe: "Meine Tastatur ist leider kaputt.",
    exampleSentenceEs: "Mi teclado lamentablemente está roto."
  }, {
    de: "die Maus",
    pron: "di maus",
    es: "el ratón",
    type: "Sustantivo (Fem)",
    category: "Hardware",
    plural: "die Mäuse",
    en: "a cute 3D isometric UI icon of a computer mouse emitting wireless signal waves",
    exampleSentenceDe: "Meine neue Maus ist kabellos.",
    exampleSentenceEs: "Mi ratón nuevo es inalámbrico."
  }, {
    de: "das Passwort",
    pron: "das pás-vort",
    es: "la contraseña",
    type: "Sustantivo (Neut)",
    category: "Sicherheit",
    plural: "die Passwörter",
    en: "a cute 3D isometric UI icon of a golden key over a metallic padlock",
    exampleSentenceDe: "Mein Passwort ist sehr sicher.",
    exampleSentenceEs: "Mi contraseña es muy segura."
  }, {
    de: "die Datei",
    pron: "di da-tái",
    es: "el archivo",
    type: "Sustantivo (Fem)",
    category: "Software",
    plural: "die Dateien",
    en: "a cute 3D isometric UI icon of a digital document sheet with a folded corner",
    exampleSentenceDe: "Ich lösche diese Datei.",
    exampleSentenceEs: "Borro este archivo."
  }, {
    de: "der Ordner",
    pron: "dea ór-dner",
    es: "la carpeta",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Ordner",
    en: "a cute 3D isometric UI icon of a yellow folder organizer",
    exampleSentenceDe: "Der Ordner ist auf dem Desktop.",
    exampleSentenceEs: "La carpeta está en el escritorio."
  }, {
    de: "der Kopfhörer",
    pron: "dea kopf-jö-rer",
    es: "los auriculares",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Kopfhörer",
    en: "a cute 3D isometric UI icon of modern wireless headphones",
    exampleSentenceDe: "Ich höre Musik mit dem Kopfhörer.",
    exampleSentenceEs: "Escucho música con los auriculares."
  }, {
    de: "die App",
    pron: "di ep",
    es: "la aplicación",
    type: "Sustantivo (Fem)",
    category: "Software",
    plural: "die Apps",
    en: "a cute 3D isometric UI icon of a smartphone showing colorful utility widgets",
    exampleSentenceDe: "Diese App ist sehr nützlich.",
    exampleSentenceEs: "Esta aplicación es muy útil."
  }, {
    de: "der Drucker",
    pron: "dea drú-ker",
    es: "la impresora",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Drucker",
    en: "a cute 3D isometric UI icon of a modern office printer ejecting a paper page",
    exampleSentenceDe: "Der Drucker hat kein Papier mehr.",
    exampleSentenceEs: "La impresora ya no tiene papel."
  }, {
    de: "das Netzwerk",
    pron: "das néts-verk",
    es: "la red",
    type: "Sustantivo (Neut)",
    category: "Internet",
    plural: "die Netzwerke",
    en: "a cute 3D isometric UI icon of interconnected digital nodes glowing blue",
    exampleSentenceDe: "Das Netzwerk im Büro ist schnell.",
    exampleSentenceEs: "La red en la oficina es rápida."
  }, {
    de: "der Link",
    pron: "dea link",
    es: "el enlace",
    type: "Sustantivo (Masc)",
    category: "Internet",
    plural: "die Links",
    en: "a cute 3D isometric UI icon of a chain link connection symbol",
    exampleSentenceDe: "Bitte klicke auf diesen Link.",
    exampleSentenceEs: "Por favor, haz clic en este enlace."
  }, {
    de: "das Internet",
    pron: "das ín-ter-net",
    es: "el internet",
    type: "Sustantivo (Neut)",
    category: "Internet",
    plural: "die Internetanschlüsse",
    en: "a cute 3D isometric UI icon of a digital globe spinning in a cloud",
    exampleSentenceDe: "Das Internet ist heute langsam.",
    exampleSentenceEs: "El internet hoy está lento."
  }, {
    de: "der Computer",
    pron: "dea kom-piú-ter",
    es: "el ordenador",
    type: "Sustantivo (Masc)",
    category: "Hardware",
    plural: "die Computer",
    en: "a cute 3D isometric UI icon of a desktop computer setup with a keyboard and mouse",
    exampleSentenceDe: "Mein Computer ist sehr alt.",
    exampleSentenceEs: "Mi ordenador es muy viejo."
  }, {
    de: "das WLAN",
    pron: "das ve-lan",
    es: "el wifi",
    type: "Sustantivo (Neut)",
    category: "Internet",
    plural: "die WLAN-Netze",
    en: "a cute 3D isometric UI icon of a router emitting glowing wireless signal waves",
    exampleSentenceDe: "Haben Sie das WLAN-Passwort?",
    exampleSentenceEs: "¿Tiene la contraseña del wifi?"
  }, {
    de: "die Cloud",
    pron: "di klaud",
    es: "la nube",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die Clouds",
    en: "a cute 3D isometric UI icon of a glowing blue cloud storage icon",
    exampleSentenceDe: "Ich speichere die Fotos in der Cloud.",
    exampleSentenceEs: "Guardo las fotos en la nube."
  }, {
    de: "die Webseite",
    pron: "di vép-zai-te",
    es: "la página web",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die Webseiten",
    en: "a cute 3D isometric UI icon of a web browser interface page showing layouts",
    exampleSentenceDe: "Diese Webseite gefällt mir gut.",
    exampleSentenceEs: "Esta página web me gusta mucho."
  }, {
    de: "die E-Mail-Adresse",
    pron: "di í-meil-a-dré-se",
    es: "la dirección de correo",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die E-Mail-Adressen",
    en: "a cute 3D isometric UI icon of a digital technical mail envelope with an @ symbol",
    exampleSentenceDe: "Wie ist deine E-Mail-Adresse?",
    exampleSentenceEs: "¿Cuál es tu dirección de correo electrónico?"
  }, {
    de: "die E-Mail",
    pron: "di í-meil",
    es: "el correo electrónico",
    type: "Sustantivo (Fem)",
    category: "Internet",
    plural: "die E-Mails",
    en: "a cute 3D isometric UI icon of an open envelope containing a glowing message paper",
    exampleSentenceDe: "Ich schreibe eine wichtige E-Mail.",
    exampleSentenceEs: "Escribo un correo electrónico importante."
  }, {
    de: "das System",
    pron: "das zys-tém",
    es: "el sistema",
    type: "Sustantivo (Neut)",
    category: "Software",
    plural: "die Systeme",
    en: "a cute 3D isometric UI icon of interlocking technical gears under a circuit board panel",
    exampleSentenceDe: "Das System läuft sehr stabil.",
    exampleSentenceEs: "El sistema funciona muy stable."
  }, {
    de: "das Update",
    pron: "das áp-deit",
    es: "la actualización",
    type: "Sustantivo (Neut)",
    category: "Software",
    plural: "die Updates",
    en: "a cute 3D isometric UI icon of a circle arrow download progress symbol",
    exampleSentenceDe: "Das Update ist fertig.",
    exampleSentenceEs: "La actualización está lista."
  }, {
    de: "der Code",
    pron: "der kout",
    es: "el código",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Codes",
    en: "a cute 3D isometric UI icon of code lines on a dark monitor",
    exampleSentenceDe: "Der Code hat keine Fehler.",
    exampleSentenceEs: "El código no tiene errores."
  }, {
    de: "der Benutzer",
    pron: "dea be-nút-tser",
    es: "el usuario",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Benutzer",
    en: "a cute 3D isometric UI icon of a glowing blue user profile silhouette tag",
    exampleSentenceDe: "Er ist ein neuer Benutzer.",
    exampleSentenceEs: "Él es un usuario nuevo."
  }, {
    de: "der Screenshot",
    pron: "dea scrín-shot",
    es: "la captura de pantalla",
    type: "Sustantivo (Masc)",
    category: "Software",
    plural: "die Screenshots",
    en: "a cute 3D isometric UI icon of a scissor cutting a digital screen area",
    exampleSentenceDe: "Ich mache einen Screenshot vom Bild.",
    exampleSentenceEs: "Hago una captura de pantalla de la imagen."
  }, {
    de: "der Virus",
    pron: "dea ví-rus",
    es: "el virus",
    type: "Sustantivo (Masc)",
    category: "Sicherheit",
    plural: "die Viren",
    en: "a cute 3D isometric UI icon of a red virus bug with sharp legs",
    exampleSentenceDe: "Mein Laptop hat einen Virus.",
    exampleSentenceEs: "Mi portátil tiene un virus."
  }, {
    de: "die Taste",
    pron: "di tás-te",
    es: "la tecla / botón",
    type: "Sustantivo (Fem)",
    category: "Hardware",
    plural: "die Tasten",
    en: "a cute 3D isometric UI icon of a single keyboard key button",
    exampleSentenceDe: "Drücke die Enter-Taste.",
    exampleSentenceEs: "Pulsa la tecla Enter."
  }, {
    de: "digital",
    pron: "di-gui-tál",
    es: "digital",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of binary numbers zero and one glowing blue",
    exampleSentenceDe: "Wir leben in einer digitalen Welt.",
    exampleSentenceEs: "Vivimos en un mundo digital."
  }, {
    de: "online",
    pron: "ón-lain",
    es: "en línea",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of a green glowing active connection indicator light",
    exampleSentenceDe: "Bist du heute Abend online?",
    exampleSentenceEs: "¿Estarás en línea esta noche?"
  }, {
    de: "offline",
    pron: "óf-lain",
    es: "desconectado",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of a red offline disconnected plug symbol",
    exampleSentenceDe: "Ich bin im Urlaub offline.",
    exampleSentenceEs: "Estoy desconectado durante las vacaciones."
  }, {
    de: "kabellos",
    pron: "ká-bel-los",
    es: "inalámbrico",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of headphones emitting wireless radio waves with no cables",
    exampleSentenceDe: "Die Kopfhörer sind kabellos.",
    exampleSentenceEs: "Los auriculares son inalámbricos."
  }, {
    de: "automatisch",
    pron: "au-to-má-tish",
    es: "automático",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of moving metallic gears",
    exampleSentenceDe: "Das System funktioniert automatisch.",
    exampleSentenceEs: "El sistema funciona automáticamente."
  }, {
    de: "manuell",
    pron: "ma-nu-él",
    es: "manual",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of a hand turning a dial",
    exampleSentenceDe: "Ich mache das lieber manuell.",
    exampleSentenceEs: "Hago eso mejor manualmente."
  }, {
    de: "sicher",
    pron: "zí-jer",
    es: "seguro",
    type: "Adjetivo",
    category: "Sicherheit",
    en: "a cute 3D isometric UI icon of a glowing green cyber security shield",
    exampleSentenceDe: "Mein neues Passwort ist sehr sicher.",
    exampleSentenceEs: "Mi nueva contraseña es muy segura."
  }, {
    de: "vernetzt",
    pron: "fer-nétst",
    es: "conectado / en red",
    type: "Adjetivo",
    category: "Internet",
    en: "a cute 3D isometric UI icon of two connected digital glowing globes",
    exampleSentenceDe: "Wir sind alle gut vernetzt.",
    exampleSentenceEs: "Estamos todos bien conectados."
  }, {
    de: "virtuell",
    pron: "vir-tu-él",
    es: "virtual",
    type: "Adjetivo",
    category: "Eigenschaften",
    en: "a cute 3D isometric UI icon of VR virtual reality goggles glowing purple",
    exampleSentenceDe: "Wir machen ein virtuelles Treffen.",
    exampleSentenceEs: "Hacemos una reunión virtual."
  }, {
    de: "gesperrt",
    pron: "gue-shpért",
    es: "bloqueado",
    type: "Adjetivo",
    category: "Sicherheit",
    en: "a cute 3D isometric UI icon of a red digital lock",
    exampleSentenceDe: "Mein Handy ist leider gesperrt.",
    exampleSentenceEs: "Mi móvil está bloqueado lamentablemente."
  }, {
    de: "programmieren",
    pron: "pro-gram-mí-ren",
    es: "programar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a laptop screen with program code",
    exampleSentenceDe: "Ich lerne programmieren.",
    exampleSentenceEs: "Aprendo a programar."
  }, {
    de: "herunterladen",
    pron: "je-rún-ter-la-den",
    es: "descargar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (herunter-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of a down arrow pointing to a hard drive disk",
    exampleSentenceDe: "Ich lade das Lied herunter.",
    exampleSentenceEs: "Descargo la canción."
  }, {
    de: "hochladen",
    pron: "jój-la-den",
    es: "subir (archivo)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (hoch-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of an up arrow pointing to a digital cloud",
    exampleSentenceDe: "Er lädt das Video hoch.",
    exampleSentenceEs: "Él sube el video."
  }, {
    de: "speichern",
    pron: "shpái-jern",
    es: "guardar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a classic 3.5 inch blue floppy disk storage",
    exampleSentenceDe: "Bitte speichern Sie die Datei.",
    exampleSentenceEs: "Por favor, guarde el archivo."
  }, {
    de: "löschen",
    pron: "lö-shen",
    es: "borrar / eliminar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a red trash can bin overflowing with paper crumbs",
    exampleSentenceDe: "Ich möchte den Text löschen.",
    exampleSentenceEs: "Quiero borrar el texto."
  }, {
    de: "klicken",
    pron: "klí-ken",
    es: "hacer clic",
    type: "Verbo",
    category: "Aktionen",
    regimen: "intransitivo",
    en: "a cute 3D isometric UI icon of a glowing blue cursor clicking a button",
    exampleSentenceDe: "Klicke auf den Button.",
    exampleSentenceEs: "Haz clic en el botón."
  }, {
    de: "tippen",
    pron: "tí-pen",
    es: "escribir (teclado)",
    type: "Verbo",
    category: "Aktionen",
    regimen: "intransitivo",
    en: "a cute 3D isometric UI icon of hands typing on a glowing laptop keyboard",
    exampleSentenceDe: "Ich tippe sehr schnell.",
    exampleSentenceEs: "Escribo a máquina muy rápido."
  }, {
    de: "senden",
    pron: "zén-den",
    es: "enviar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a paper plane flying out of a digital envelope",
    exampleSentenceDe: "Ich sende das Dokument heute.",
    exampleSentenceEs: "Envío el documento hoy."
  }, {
    de: "empfangen",
    pron: "emp-fáng-en",
    es: "recibir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a digital tray box receiving incoming letter envelopes",
    exampleSentenceDe: "Ich empfange ein Paket.",
    exampleSentenceEs: "Recibo un paquete."
  }, {
    de: "teilen",
    pron: "tái-len",
    es: "compartir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of three connected dots sharing network lines",
    exampleSentenceDe: "Wir teilen die Datei.",
    exampleSentenceEs: "Compartimos el archivo."
  }, {
    de: "kopieren",
    pron: "ko-pí-ren",
    es: "copiar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of two identical overlapping document sheets",
    exampleSentenceDe: "Kannst du den Text kopieren?",
    exampleSentenceEs: "¿Puedes copiar el texto?"
  }, {
    de: "einfügen",
    pron: "áin-fü-guen",
    es: "pegar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "Separable (ein-) / + Akkusativ",
    en: "a cute 3D isometric UI icon of a clipboard pasting text onto a page document",
    exampleSentenceDe: "Füge das Bild hier ein.",
    exampleSentenceEs: "Pega la imagen aquí."
  }, {
    de: "aktualisieren",
    pron: "ak-tua-li-zí-ren",
    es: "actualizar",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of two circular green arrows turning",
    exampleSentenceDe: "Ich muss die Seite aktualisieren.",
    exampleSentenceEs: "Tengo que actualizar la página."
  }, {
    de: "drucken",
    pron: "drú-ken",
    es: "imprimir",
    type: "Verbo",
    category: "Aktionen",
    regimen: "+ Akkusativ",
    en: "a cute 3D isometric UI icon of a paper sheet rolling out of a metal print head roller",
    exampleSentenceDe: "Ich drucke den Brief.",
    exampleSentenceEs: "Imprimo la carta."
  }]
},
{
  id: 16,
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
}
];

// --- NUEVOS MÓDULOS DE ESTUDIO GOETHE ---
export const goetheModules = [{
  id: 'g_horen',
  title: 'Hören (Comprensión Auditiva)',
  desc: 'Supervivencia en estaciones y llamadas',
  theme: 'blueprint',
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
    title: "Burocracia Drag & Drop",
    subtitle: "Teil 1: Rellenar Formularios (Anmeldung)",
    content: (
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6 rounded-r-lg">
          <p className="font-bold text-emerald-800">📋 El Arte del Formulario</p>
          <p className="text-sm text-emerald-700 mt-1">Arrastra tus datos personales a la ranura correcta del documento oficial. ¡Cuidado con confundir Vorname y Nachname!</p>
        </div>
        <FormularBuilder />
      </div>
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
  }, {
    title: "Simulador: Teil 1 (Presentación)",
    subtitle: "Sich vorstellen (Toca el altavoz para escuchar)",
    content: <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm text-slate-800">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <Bot size={32} className="text-indigo-600 bg-indigo-50 p-1.5 rounded-full" />
                <p className="font-bold text-slate-700">Examinador: Bitte stellen Sie sich vor.</p>
                <button onClick={() => nativeSpeak("Bitte stellen Sie sich vor.")} className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-full transition ml-auto"><Volume2 size={20} /></button>
              </div>

              <div className="space-y-3 pl-2">
                {[{
            de: "Ich heiße Marcos.",
            es: "Me llamo Marcos."
          }, {
            de: "Ich bin 35 Jahre alt.",
            es: "Tengo 35 años."
          }, {
            de: "Ich komme aus Kolumbien und ich wohne in Barranquilla.",
            es: "Vengo de Colombia y vivo en Barranquilla."
          }, {
            de: "Ich spreche Spanisch und ein bisschen Deutsch.",
            es: "Hablo español y un poco de alemán."
          }, {
            de: "Ich bin Elektroniker von Beruf.",
            es: "Soy técnico electrónico de profesión."
          }, {
            de: "Meine Hobbys sind Lesen und Sport machen.",
            es: "Mis pasatiempos son leer y hacer deporte."
          }].map((item, i) => <div key={i} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg hover:bg-slate-100 transition">
                    <button onClick={() => nativeSpeak(item.de)} className="text-slate-400 hover:text-indigo-600 transition"><PlayCircle size={18} /></button>
                    <div>
                      <p className="font-bold text-slate-800">{item.de}</p>
                      <p className="text-xs text-slate-500">{item.es}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
  }, {
    title: "Simulador: Teil 2 & 3",
    subtitle: "Intercambios y Peticiones Reales",
    content: (
      <div className="mt-6 max-w-3xl mx-auto space-y-6">
        <h3 className="font-bold text-slate-700 mb-3">Teil 1: Presentación Personal</h3>
        <VoiceExaminer 
          question="Wie heißt du und woher kommst du?" 
          expectedKeywords={["heiße", "bin", "komme", "aus"]} 
          note="Preséntate y di tu país de origen." 
        />

        <h3 className="font-bold text-slate-700 mb-3 mt-8">Teil 2: Intercambio de Información</h3>
        <VoiceExaminer 
          question="Trinkst du am Wochenende Bier?" 
          expectedKeywords={["Ja", "Nein", "trinke", "gern", "Bier", "Samstag", "Wochenende"]} 
          note="Tema: Comida | Tarjeta: Cerveza (Bier)" 
        />
        <VoiceExaminer 
          question="Wo kaufst du deine Schuhe?" 
          expectedKeywords={["kaufe", "Schuhe", "Supermarkt", "Geschäft", "Laden", "Internet"]} 
          note="Tema: Compras | Tarjeta: Zapatos (Schuhe) -> Usamos W-Frage (Wo)" 
        />
      </div>
    )
  }]
}];

// --- NUEVO: PLAN DE ESTUDIOS (CLASES MAGISTRALES) ---
export const studyPlanModules = [{
  id: 'sp_1',
  title: 'Capítulo 1: Los Cimientos y Primeros Pasos',
  presentationUrl: 'https://drive.google.com/file/d/1D1x2fDb33331RzgNbJupn8jg-MpjiAzA/view?usp=drive_web',
  slides: [{
    title: "La Regla de Oro de la Posición 2",
    subtitle: "El verbo conjugado es el rey inamovible de la oración afirmativa",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 text-lg leading-relaxed">
              El alemán funciona como un sistema modular de bloques. La regla absoluta y más importante para comenzar es que el verbo conjugado <strong>SIEMPRE</strong> ocupa la segunda posición.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-3 gap-2 text-center font-bold text-xs sm:text-sm">
                <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">Posición 1 (Sujeto)</div>
                <div className="bg-indigo-600 text-white p-3 rounded-lg ring-4 ring-indigo-200">Posición 2 (Verbo)</div>
                <div className="bg-slate-100 text-slate-800 p-3 rounded-lg">Posición 3 (Resto)</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-3 text-slate-700 font-medium text-xs sm:text-sm">
                <div className="p-2 border border-dashed border-slate-300 rounded-lg">Ich</div>
                <div className="p-2 border border-dashed border-indigo-300 rounded-lg font-bold text-indigo-700">wohne</div>
                <div className="p-2 border border-dashed border-slate-300 rounded-lg">in Madrid.</div>
              </div>
            </div>
            <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-xl">
              <p className="text-amber-800 text-sm font-medium">
                💡 <strong>¡Atención!</strong> Si cambias el orden y pones el tiempo al principio, el verbo sigue firme en Posición 2: <em>"Heute <strong>wohne</strong> ich in Madrid."</em>
              </p>
            </div>
            <DraggableSentenceBuilder verb="kommst" subject="du" complement="aus Kolumbien" />
            <div className="mt-8">
              <h4 className="font-bold text-slate-700 mb-3">🛠️ Reto Aleatorio: Posición 2</h4>
              <DraggableSentenceBuilder pool={[{
          subject: "Ich",
          verb: "lerne",
          complement: "Deutsch"
        }, {
          subject: "Wir",
          verb: "trinken",
          complement: "Kaffee"
        }, {
          subject: "Er",
          verb: "wohnt",
          complement: "in Berlin"
        }, {
          subject: "Sie",
          verb: "spielt",
          complement: "Fußball"
        }, {
          subject: "Das Kind",
          verb: "isst",
          complement: "einen Apfel"
        }]} />
            </div>
          </div>
  }, {
    title: "El Motor de Conjugación",
    subtitle: "Cómo conjugar verbos regulares y los auxiliares clave",
    content: <div className="mt-6 max-w-3xl mx-auto space-y-4">
            <p className="text-slate-700">Para conjugar verbos regulares, tomamos la raíz del verbo (ej. <strong>komm-</strong>) y añadimos la terminación según el actor:</p>
            
            <div className="overflow-x-auto my-5 rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse text-sm min-w-[600px]">
                <thead className="bg-slate-100/80 text-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-bold border-b border-slate-200 whitespace-nowrap">Actor</th>
                    <th className="px-4 py-3 font-bold border-b border-slate-200 whitespace-nowrap">Terminación</th>
                    <th className="px-4 py-3 font-bold border-b border-slate-200 whitespace-nowrap">Ej. (kommen)</th>
                    <th className="px-4 py-3 font-bold border-b border-slate-200 whitespace-nowrap text-indigo-600">sein (Ser)</th>
                    <th className="px-4 py-3 font-bold border-b border-slate-200 whitespace-nowrap text-emerald-600">haben (Tener)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600"><strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">ich</strong></td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">-e</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">komme</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-indigo-600 font-medium">bin</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-emerald-600 font-medium">habe</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600"><strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">du</strong></td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">-st</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">kommst</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-indigo-600 font-medium">bist</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-emerald-600 font-medium">hast</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600"><strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">er/sie/es</strong></td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">-t</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">kommt</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-indigo-600 font-medium">ist</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-emerald-600 font-medium">hat</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600"><strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">wir</strong></td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">-en</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">kommen</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-indigo-600 font-medium">sind</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-emerald-600 font-medium">haben</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600"><strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">ihr</strong></td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">-t</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">kommt</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-indigo-600 font-medium">seid</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-emerald-600 font-medium">habt</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600"><strong className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">sie/Sie</strong></td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">-en</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">kommen</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-indigo-600 font-medium">sind</td>
                    <td className="px-4 py-3 align-top leading-relaxed text-emerald-600 font-medium">haben</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  }, {
    title: "Preguntas: Abiertas vs Cerradas",
    subtitle: "¿Cómo hacer preguntas en alemán?",
    content: <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-700 text-lg mb-2">W-Fragen (Abiertas)</h4>
                <p className="text-slate-600 text-sm mb-4">
                  La palabra de pregunta (Wer, Was, Wo, Wie) va en Posición 1. El verbo en la 2 y el sujeto en la 3.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-100 font-mono text-xs text-slate-800">
                  <span className="text-indigo-600 font-bold">Wo</span> (Pos 1) + <span className="text-emerald-600 font-bold">wohnst</span> (Pos 2) + du? (Pos 3)
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-700 text-lg mb-2">Ja/Nein-Fragen (Cerradas)</h4>
                <p className="text-slate-600 text-sm mb-4">
                  El verbo salta a la Posición 1 para llamar la atención. La respuesta esperada es "Sí" o "No".
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-100 font-mono text-xs text-slate-800">
                  <span className="text-emerald-600 font-bold">Wohnst</span> (Pos 1) + du (Pos 2) + in Berlin?
                </div>
              </div>
            </div>
          </div>
  }]
}, {
  id: 'sp_2',
  title: 'Capítulo 2: Mi Círculo, Géneros y Negación',
  presentationUrl: 'https://drive.google.com/file/d/1ydPXeoc5VGUyyP2C-_eBo7e0RB-CTTGS/view?usp=drive_web',
  slides: [{
    title: "Los Tres Géneros en Alemán",
    subtitle: "Aprende el color de las palabras",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed">
              El alemán clasifica todo en tres géneros. No intentes buscarles lógica con el español, ¡aprene el "color" de la palabra!
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 border border-slate-200 font-bold">Género</th>
                    <th className="p-3 border border-slate-200 font-bold">Definido</th>
                    <th className="p-3 border border-slate-200 font-bold">Indefinido</th>
                    <th className="p-3 border border-slate-200 font-bold">Plural</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-bold text-blue-600">Masculino</td>
                    <td className="p-3 border border-slate-200 font-mono">der (el)</td>
                    <td className="p-3 border border-slate-200 font-mono">ein (un)</td>
                    <td className="p-3 border border-slate-200 font-mono">die (los/las)</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 border border-slate-200 font-bold text-rose-600">Femenino</td>
                    <td className="p-3 border border-slate-200 font-mono">die (la)</td>
                    <td className="p-3 border border-slate-200 font-mono">eine (una)</td>
                    <td className="p-3 border border-slate-200 font-mono">die (los/las)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-bold text-amber-600">Neutro</td>
                    <td className="p-3 border border-slate-200 font-mono">das (lo)</td>
                    <td className="p-3 border border-slate-200 font-mono">ein (un)</td>
                    <td className="p-3 border border-slate-200 font-mono">die (los/las)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  }, {
    title: "Práctica de Géneros y Posesivos",
    subtitle: "Añade una '-e' al final si la palabra es femenina o plural",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed">
              Todos los posesivos (<em>mein</em>=mi, <em>dein</em>=tu, <em>sein</em>=su) funcionan exactamente igual que <em>ein</em>.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm">
              <p>👉 <strong>mein Vater</strong> (Masculino: sin -e al final)</p>
              <p>👉 <strong>meine Mutter</strong> (Femenino: añade -e al final)</p>
              <p>👉 <strong>meine Eltern</strong> (Plural: añade -e al final)</p>
            </div>
            <AccusativeShield words={[{
        word: "Vater",
        gender: "der",
        translation: "padre"
      }, {
        word: "Mutter",
        gender: "die",
        translation: "madre"
      }, {
        word: "Kind",
        gender: "das",
        translation: "hijo/niño"
      }, {
        word: "Bruder",
        gender: "der",
        translation: "hermano"
      }, {
        word: "Schwester",
        gender: "die",
        translation: "hermana"
      }]} />
          </div>
  }]
}, {
  id: 'sp_3',
  title: 'Capítulo 3: El Misterioso Caso Acusativo',
  presentationUrl: 'https://drive.google.com/file/d/1QusIBIw3hhDxZvtnB3eocWlPWW43dlIp/view?usp=drive_web',
  slides: [{
    title: "La Regla de Oro del Acusativo",
    subtitle: "Al Acusativo solo le importan los masculinos",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed">
              El Acusativo es el Objeto Directo de una acción. Responde a <em>¿Qué compras?</em> o <em>¿A quién buscas?</em>. <strong>¡Solo ataca a las palabras masculinas cambiándolas a -en!</strong>
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="p-3 border border-slate-200">Género</th>
                    <th className="p-3 border border-slate-200">Nominativo</th>
                    <th className="p-3 border border-slate-200">Acusativo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50/50">
                    <td className="p-3 border border-slate-200 font-bold text-blue-600">Masculino</td>
                    <td className="p-3 border border-slate-200">der / ein / kein</td>
                    <td className="p-3 border border-slate-200 font-bold">den / einen / keinen</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-bold text-rose-600">Femenino</td>
                    <td className="p-3 border border-slate-200">die / eine / keine</td>
                    <td className="p-3 border border-slate-200">die / eine / keine</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-bold text-amber-600">Neutro</td>
                    <td className="p-3 border border-slate-200">das / ein / kein</td>
                    <td className="p-3 border border-slate-200">das / ein / kein</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  }, {
    title: "Desafío de Compras y Alimentos",
    subtitle: "Verbos activadores: kaufen, brauchen, essen, trinken, haben",
    content: <div className="space-y-6 text-left">
            <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-xl text-sm">
              <p className="text-indigo-900">
                ✍️ <strong>Ejemplo:</strong> <em>Ich kaufe <strong>einen</strong> Käse (masculino) y <strong>eine</strong> Tomate (femenino).</em>
              </p>
            </div>
            <AccusativeShield words={[{
        word: "Apfel",
        gender: "der",
        translation: "manzana"
      }, {
        word: "Tomate",
        gender: "die",
        translation: "tomate"
      }, {
        word: "Käse",
        gender: "der",
        translation: "queso"
      }, {
        word: "Brot",
        gender: "das",
        translation: "pan"
      }, {
        word: "Wein",
        gender: "der",
        translation: "vino"
      }]} />
          </div>
  }]
}, {
  id: 'sp_4',
  title: 'Capítulo 4: Rutina y Verbos Separables',
  presentationUrl: 'https://drive.google.com/file/d/1s4MSGKeK7xVZF2qGN4JSXu5dl43VkhOC/view?usp=drive_web',
  slides: [{
    title: "Los Verbos Separables",
    subtitle: "Trennbare Verben y el efecto pinza",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed">
              Los <strong>Trennbare Verben</strong> son acciones que se dividen en dos partes al conjugarse. La raíz conjugada se queda en Posición 2 y el prefijo vuela al final absoluto de la oración.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-sm">
              <h5 className="font-bold text-slate-800">Estructura Satzklammer (La Pinza):</h5>
              <p>👉 <strong>aufstehen</strong> (levantarse): Ich <strong>stehe</strong> um 7 Uhr <strong>auf</strong>.</p>
              <p>👉 <strong>einkaufen</strong> (comprar): Er <strong>kauft</strong> im Supermarkt <strong>ein</strong>.</p>
            </div>
          </div>
  }, {
    title: "Práctica del Efecto Pinza",
    subtitle: "Visualiza cómo el prefijo se separa y va al final",
    content: <div className="space-y-6 text-left">
            <PincerSwitch exercises={[{
        subject: "Ich",
        verbRaiz: "stehe",
        prefix: "auf",
        complement: "um 7 Uhr",
        verbOriginal: "aufstehen",
        translation: "Yo me levanto a las 7"
      }, {
        subject: "Er",
        verbRaiz: "kauft",
        prefix: "ein",
        complement: "im Supermarkt",
        verbOriginal: "einkaufen",
        translation: "Él compra en el supermercado"
      }]} />
          </div>
  }]
}, {
  id: 'sp_5',
  title: 'Capítulo 5: Darle actitud - Verbos Modales',
  presentationUrl: 'https://drive.google.com/file/d/12ef-35y8c5SaFbw4v1xIZX74-5E8mX6c/view?usp=drive_web',
  slides: [{
    title: "Los Verbos Modales",
    subtitle: "Habilidad, obligación, permiso, deseo y voluntad",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed text-sm">
              El verbo modal se coloca en la Posición 2 (con la terminación del actor), y el verbo principal de acción se envía al final de la oración en su forma original (Infinitivo).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="p-2.5 border border-slate-200">Verbo</th>
                    <th className="p-2.5 border border-slate-200">Intención</th>
                    <th className="p-2.5 border border-slate-200">Ejemplo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2.5 border border-slate-200 font-bold">können</td>
                    <td className="p-2.5 border border-slate-200">Habilidad</td>
                    <td className="p-2.5 border border-slate-200 font-mono">Ich <strong>kann</strong> schwimmen.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-2.5 border border-slate-200 font-bold">müssen</td>
                    <td className="p-2.5 border border-slate-200">Obligación</td>
                    <td className="p-2.5 border border-slate-200 font-mono">Wir <strong>müssen</strong> arbeiten.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-slate-200 font-bold">dürfen</td>
                    <td className="p-2.5 border border-slate-200">Permiso</td>
                    <td className="p-2.5 border border-slate-200 font-mono">Man <strong>darf</strong> hier parken.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  }, {
    title: "El Sándwich Verbal",
    subtitle: "Modales y prefijos separables combinados",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 text-xs sm:text-sm">
              💡 <strong>Regla de oro:</strong> Si usas un verbo modal con un verbo separable, el prefijo separable NO se rompe, sino que el verbo va completo al final:
            </p>
            <PincerSwitch exercises={[{
        subject: "Ich",
        verbRaiz: "will",
        prefix: "aufstehen",
        complement: "um 7 Uhr",
        verbOriginal: "wollen + aufstehen",
        translation: "Quiero levantarme a las 7 (El verbo separable va completo al final)"
      }, {
        subject: "Wir",
        verbRaiz: "müssen",
        prefix: "einkaufen",
        complement: "am Nachmittag",
        verbOriginal: "müssen + einkaufen",
        translation: "Tenemos que comprar por la tarde"
      }]} />
          </div>
  }]
}, {
  id: 'sp_6',
  title: 'Capítulo 6: Descifrando el Dativo',
  presentationUrl: 'https://drive.google.com/file/d/1n_dLlwAlx9mJMoytcMC4wV3TjNCb59-r/view?usp=drive_web',
  slides: [{
    title: "El Código M-R-M-N",
    subtitle: "El Dativo es el receptor u objeto indirecto de la acción",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed">
              El Dativo es el traje especial para el "Receptor" de una acción. Memoriza estas 4 letras finales para los artículos:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
                <span className="font-bold text-blue-600 block">Masculino</span>
                <span className="font-mono text-lg font-black">de<b>m</b></span>
              </div>
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
                <span className="font-bold text-rose-600 block">Femenino</span>
                <span className="font-mono text-lg font-black">de<b>r</b></span>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                <span className="font-bold text-amber-600 block">Neutro</span>
                <span className="font-mono text-lg font-black">de<b>m</b></span>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl">
                <span className="font-bold text-purple-600 block">Plural</span>
                <span className="font-mono text-lg font-black">de<b>n</b> (+n)</span>
              </div>
            </div>
            <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-xl text-sm">
              <p className="text-amber-800">
                💡 <strong>Preposiciones exigentes:</strong> mit, nach, aus, zu, von, bei, seit, ab siempre exigen Dativo.
              </p>
            </div>
          </div>
  }, {
    title: "Línea de Tiempo de Acciones",
    subtitle: "Moviéndonos entre tiempos verbales con Dativo",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 text-sm">
              Observa cómo cambia la estructura de una acción en Dativo al pasarla del presente al pasado:
            </p>
            <MechanicalTimeline present={{
        subject: "Ich",
        verb: "fahre",
        complement: "mit dem Zug"
      }} past={{
        auxiliary: "bin",
        participle: "gefahren"
      }} />
          </div>
  }]
}, {
  id: 'sp_7',
  title: 'Capítulo 7: Das Perfekt (El Pasado)',
  presentationUrl: 'https://drive.google.com/file/d/1rWmyyVBBceZm2lzbaNY8Luuvv5X6vgfU/view?usp=drive_web',
  slides: [{
    title: "Estructura de Das Perfekt",
    subtitle: "Un rompecabezas mecánico de dos pilares",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed">
              Para hablar del pasado en el día a día, usamos el Perfekt. Consta del verbo auxiliar (<em>haben</em> o <em>sein</em>) en Posición 2 y el participio al final.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-4 gap-2 text-center font-bold text-xs sm:text-sm">
                <div className="bg-blue-100 text-blue-800 p-2.5 rounded-lg">Sujeto</div>
                <div className="bg-indigo-600 text-white p-2.5 rounded-lg">Auxiliar (Pos 2)</div>
                <div className="bg-slate-100 text-slate-800 p-2.5 rounded-lg">Relleno</div>
                <div className="bg-emerald-600 text-white p-2.5 rounded-lg">Participio (Final)</div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center mt-3 text-slate-700 font-mono text-xs sm:text-sm">
                <div className="p-2 border border-dashed border-slate-300 rounded-lg">Ich</div>
                <div className="p-2 border border-dashed border-indigo-300 rounded-lg font-bold text-indigo-700">habe</div>
                <div className="p-2 border border-dashed border-slate-300 rounded-lg">eine Pizza</div>
                <div className="p-2 border border-dashed border-emerald-300 rounded-lg font-bold text-emerald-700">gekauft.</div>
              </div>
            </div>
          </div>
  }, {
    title: "Entrenamiento de Desplazamiento",
    subtitle: "Usa 'haben' para acciones estáticas y 'sein' para desplazamiento",
    content: <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <h5 className="font-bold text-blue-800 mb-1">Haben (Estático)</h5>
                <p className="text-blue-700">Comer, beber, comprar, tener, leer...</p>
                <em className="text-slate-500 block mt-1">Ich habe gelernt.</em>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <h5 className="font-bold text-emerald-800 mb-1">Sein (Desplazamiento)</h5>
                <p className="text-emerald-700">Ir, venir, volar, conducir, levantarse...</p>
                <em className="text-slate-500 block mt-1">Ich bin geflogen.</em>
              </div>
            </div>
            <MechanicalTimeline present={{
        subject: "Ich",
        verb: "kaufe",
        complement: "eine Pizza"
      }} past={{
        auxiliary: "habe",
        participle: "gekauft"
      }} />
          </div>
  }]
}, {
  id: 'sp_8',
  title: 'Capítulo 8: Kit Médica (Imperativo)',
  presentationUrl: 'https://drive.google.com/file/d/1hvauciZnzhQPR7Jcvlhktq7VRdc_Xvrq/view?usp=drive_web',
  slides: [{
    title: "El Imperativo en Alemán",
    subtitle: "Cómo dar órdenes, recetas y consejos de forma eficiente",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed">
              Para dar órdenes o instrucciones directas en alemán, eliminamos los pronombres personales y adaptamos la forma del verbo.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="p-3 border border-slate-200">Tipo de Receptor</th>
                    <th className="p-3 border border-slate-200">Ejemplo</th>
                    <th className="p-3 border border-slate-200">Regla Básica</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200 font-bold">Tú (du) - Informal</td>
                    <td className="p-3 border border-slate-200 font-mono text-indigo-700 font-bold">Komm!</td>
                    <td className="p-3 border border-slate-200">Se elimina el "du" y la terminación "-st".</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 border border-slate-200 font-bold">Ustedes (ihr) - Plural</td>
                    <td className="p-3 border border-slate-200 font-mono text-indigo-700 font-bold">Kommt!</td>
                    <td className="p-3 border border-slate-200">Se elimina el pronombre "ihr", pero se conserva la "-t".</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200 font-bold">Usted (Sie) - Formal</td>
                    <td className="p-3 border border-slate-200 font-mono text-indigo-700 font-bold">Kommen Sie!</td>
                    <td className="p-3 border border-slate-200">Se mantiene el verbo en infinitivo y se agrega "Sie".</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  }, {
    title: "Excepciones Críticas y Consejos",
    subtitle: "Cambios vocálicos y el uso de 'sollen'",
    content: <div className="space-y-6 text-left">
            <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-xl text-sm">
              <p className="text-amber-800">
                ⚠️ <strong>¡Atención con las irregularidades!</strong>
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-amber-900 font-medium">
                <li><strong>sprechen</strong> → <em>Sprich!</em> (Cambio vocálico de e → i).</li>
                <li><strong>fahren</strong> → <em>Fahr!</em> (Pierde la diéresis de ä → a).</li>
                <li><strong>sein</strong> → <em>Sei! / Seid! / Seien Sie!</em> (Completamente irregular).</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
              <p className="text-slate-700">
                Para transmitir consejos del médico o deberes usamos el verbo modal <strong>sollen</strong>:
                <br /><em className="text-indigo-700 font-mono font-bold block mt-2">"Du sollst viel Wasser trinken." (Debes tomar mucha agua).</em>
              </p>
            </div>
          </div>
  }]
}, {
  id: 'sp_9',
  title: 'Capítulo 9: Uniendo Ideas (Fantasma Cero)',
  presentationUrl: 'https://drive.google.com/file/d/1ja2uZyZv5RMsli1g6RVJAleFgRD4YVnG/view?usp=drive_web',
  slides: [{
    title: "Los Conectores Fantasma Cero",
    subtitle: "Uniendo frases fluidamente sin romper la posición 2",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed text-sm">
              Los conectores del acrónimo <strong>ADUSO</strong> operan como conectores fantasmas de <strong>Posición 0</strong>. El orden sujeto-verbo de la siguiente frase no cambia.
            </p>
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-black">
              <div className="bg-blue-100 border border-blue-200 p-2 rounded-lg text-blue-900"><b>A</b>ber<span className="block font-normal text-[9px] text-blue-700/80">pero</span></div>
              <div className="bg-indigo-100 border border-indigo-200 p-2 rounded-lg text-indigo-900"><b>D</b>enn<span className="block font-normal text-[9px] text-indigo-700/80">porque</span></div>
              <div className="bg-emerald-100 border border-emerald-200 p-2 rounded-lg text-emerald-900"><b>U</b>nd<span className="block font-normal text-[9px] text-emerald-700/80">y</span></div>
              <div className="bg-rose-100 border border-rose-200 p-2 rounded-lg text-rose-900"><b>S</b>ondern<span className="block font-normal text-[9px] text-rose-700/80">sino</span></div>
              <div className="bg-amber-100 border border-amber-200 p-2 rounded-lg text-amber-900"><b>O</b>der<span className="block font-normal text-[9px] text-amber-700/80">o</span></div>
            </div>
          </div>
  }, {
    title: "Desafío de Conectores",
    subtitle: "El conector ocupa la Posición 0, el verbo inamovible en la 2",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 text-sm">
              Ordena la segunda oración. Recuerda que el conector ADUSO queda flotando al principio (Posición 0), pero el verbo conjugado debe ir en la <strong>Posición 2</strong>.
            </p>
            <DraggableSentenceBuilder pool={[{
        subject: "und ich",
        verb: "trinke",
        complement: "einen Kaffee"
      }, {
        subject: "aber er",
        verb: "trinkt",
        complement: "nur Wasser"
      }, {
        subject: "denn wir",
        verb: "haben",
        complement: "keinen Hunger"
      }]} />
          </div>
  }]
}, {
  id: 'sp_10',
  title: 'Capítulo 10: El Manual del Navegante',
  presentationUrl: 'https://drive.google.com/file/d/1wS542v_rcsuYj1cpEsTzahsmKDBQQxjV/view?usp=drive_web',
  slides: [{
    title: "Wechselpräpositionen (Espaciales)",
    subtitle: "¿Cuándo usar Dativo (Wo) o Acusativo (Wohin)?",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed text-sm">
              Las preposiciones espaciales cambian de caso dependiendo de si indicamos reposición/estado o movimiento de un sitio a otro:
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <h5 className="font-bold text-amber-800 mb-1">¿Wo? (Reposición)</h5>
                <p className="text-slate-600 text-xs">¿En dónde está? El objeto está quieto.</p>
                <span className="font-bold text-amber-700 block mt-2">Exige DATIVO</span>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h5 className="font-bold text-blue-800 mb-1">¿Wohin? (Dirección)</h5>
                <p className="text-slate-600 text-xs">¿A dónde va? Implica desplazamiento de A a B.</p>
                <span className="font-bold text-blue-700 block mt-2">Exige ACUSATIVO</span>
              </div>
            </div>
            <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-xl text-xs sm:text-sm">
              <p className="text-indigo-900">
                💡 <strong>Contracciones:</strong> in + dem = <strong>im</strong> (Dat) | in + das = <strong>ins</strong> (Acu) | an + dem = <strong>am</strong> (Dat).
              </p>
            </div>
          </div>
  }, {
    title: "Simulación y Reto de Navegación",
    subtitle: "Completa la contracción correcta para reposo o desplazamiento",
    content: <div className="space-y-6 text-left">
            <LocativeMapSimulator />
          </div>
  }]
}, {
  id: 'sp_11',
  title: 'Capítulo 11: Declinación Fuerte (Nullartikel)',
  presentationUrl: 'https://drive.google.com/file/d/1uXg-DLwnQLSTdsSFbT8yPmHpTBWM2miu/view?usp=drive_web1',
  slides: [{
    title: "La Declinación Fuerte de Adjetivos",
    subtitle: "Nullartikel: Cuando no hay artículo que indique género o caso",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 leading-relaxed text-sm">
              Cuando un adjetivo va antes de un sustantivo y <strong>no hay artículo</strong> (o hay un número invariable), el adjetivo debe adoptar las terminaciones fuertes de los artículos definidos para indicar el género y caso del sustantivo.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="p-2 border border-slate-200">Caso</th>
                    <th className="p-2 border border-slate-200">Masc (der)</th>
                    <th className="p-2 border border-slate-200">Fem (die)</th>
                    <th className="p-2 border border-slate-200">Neutro (das)</th>
                    <th className="p-2 border border-slate-200">Plural (die)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="p-2 border border-slate-200 font-bold text-left">Nominativo</td>
                    <td className="p-2 border border-slate-200 font-mono">-er</td>
                    <td className="p-2 border border-slate-200 font-mono">-e</td>
                    <td className="p-2 border border-slate-200 font-mono">-es</td>
                    <td className="p-2 border border-slate-200 font-mono">-e</td>
                  </tr>
                  <tr className="bg-slate-50/50 text-center">
                    <td className="p-2 border border-slate-200 font-bold text-left">Acusativo</td>
                    <td className="p-2 border border-slate-200 font-mono">-en</td>
                    <td className="p-2 border border-slate-200 font-mono">-e</td>
                    <td className="p-2 border border-slate-200 font-mono">-es</td>
                    <td className="p-2 border border-slate-200 font-mono">-e</td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-2 border border-slate-200 font-bold text-left">Dativo</td>
                    <td className="p-2 border border-slate-200 font-mono">-em</td>
                    <td className="p-2 border border-slate-200 font-mono">-er</td>
                    <td className="p-2 border border-slate-200 font-mono">-em</td>
                    <td className="p-2 border border-slate-200 font-mono">-en</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  }, {
    title: "Autoevaluación de Declinación Fuerte",
    subtitle: "Completa el espacio con la terminación correcta del adjetivo",
    content: <div className="space-y-6 text-left">
            <p className="text-slate-700 text-sm">
              Pon a prueba tu conocimiento. Escribe la terminación correspondiente en cada espacio en blanco:
            </p>
            <LiveEvaluator exercises={[{
        text: "Ich mag alt___ Käse",
        answer: "en",
        translation: "Me gusta el queso viejo (der Käse, Acusativo)"
      }, {
        text: "Gut___ Brot ist teuer",
        answer: "es",
        translation: "El buen pan es caro (das Brot, Nominativo)"
      }, {
        text: "Sie hilft mir mit groß___ Freude",
        answer: "er",
        translation: "Ella me ayuda con gran alegría (die Freude, Dativo)"
      }, {
        text: "Dort stehen... klein___ Kinder",
        answer: "e",
        translation: "Allí están dos niños pequeños (Plural, Nominativo)"
      }]} />
          </div>
  }]
}];