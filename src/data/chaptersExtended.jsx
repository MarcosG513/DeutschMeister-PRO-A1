import { Activity, BookOpen, Briefcase, Car, Heart, Mail, Laptop, Zap, Wrench, ShieldAlert } from 'lucide-react';

export const extendedChapters = [
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
    exampleSentenceDe: "Ich mag den Sport.",
    exampleSentenceEs: "Me gusta el deporte.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "mag", role: "verb_p1", order: 2 },
      { text: "den Sport", role: "complement", order: 3 }
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
    },
  {
    "de": "die Band",
    "pron": "di bent",
    "es": "la banda de música",
    "type": "Sustantivo (Fem)",
    "category": "Kultur",
    "level": "A1–B1",
    "plural": "die Bands",
    "en": "four-piece live music band playing guitar, bass, and drums",
    "exampleSentenceDe": "Die Schülerband spielt heute Abend um neun Uhr.",
    "exampleSentenceEs": "La banda escolar toca esta noche a las nueve.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Schülerband",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spielt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute Abend um neun Uhr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Bar",
    "pron": "di bar",
    "es": "el bar",
    "type": "Sustantivo (Fem)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Bars",
    "en": "cozy evening bar counter with high stools and colorful drinks",
    "exampleSentenceDe": "Nach der Arbeit gehen wir oft in eine Bar.",
    "exampleSentenceEs": "Después del trabajo vamos a menudo a un bar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach der Arbeit",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir oft in eine Bar",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Basketball",
    "pron": "dea bás-ket-bal",
    "es": "el baloncesto",
    "type": "Sustantivo (Masc)",
    "category": "Sport",
    "level": "A1",
    "plural": "die Basketbälle",
    "en": "classic orange leather textured basketball",
    "exampleSentenceDe": "Meine Hobbys sind Basketball und Musik.",
    "exampleSentenceEs": "Mis aficiones son el baloncesto y la música.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Hobbys",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Basketball und Musik",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "basteln",
    "pron": "bás-teln",
    "es": "hacer manualidades",
    "type": "Verbo regular",
    "category": "Hobbys",
    "level": "A1",
    "regimen": "bastelt, bastelte, hat gebastelt",
    "en": "person crafting paper stars with scissors and glue on a desk",
    "exampleSentenceDe": "Basteln ist mein liebstes Hobby am Wochenende.",
    "exampleSentenceEs": "Hacer manualidades es mi pasatiempo favorito el fin de semana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Basteln",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mein liebstes Hobby am Wochenende",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Camp",
    "pron": "das kemp",
    "es": "el campamento",
    "type": "Sustantivo (Neutro)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Camps",
    "en": "outdoor summer camp with pitched dome tents among pine trees",
    "exampleSentenceDe": "Im Sommer fahren die Kinder in ein Sportcamp.",
    "exampleSentenceEs": "En verano los niños van a un campamento deportivo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Sommer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Kinder in ein Sportcamp",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "campen",
    "pron": "kém-pen",
    "es": "acampar",
    "type": "Verbo regular",
    "category": "Freizeit",
    "level": "B1",
    "regimen": "campt, campte, hat gecampt",
    "en": "person pitching a colorful camping tent beside a campfire",
    "exampleSentenceDe": "Wir campen lieber in den Bergen als am Meer.",
    "exampleSentenceEs": "Preferimos acampar en las montañas que en el mar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "campen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "lieber in den Bergen als am Meer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Castingshow",
    "pron": "di kás-ting-shou",
    "es": "el concurso de talentos (TV)",
    "type": "Sustantivo (Fem)",
    "category": "Medien",
    "level": "B1",
    "plural": "die Castingshows",
    "exampleSentenceDe": "Viele junge Leute sehen am Abend Castingshows.",
    "exampleSentenceEs": "Muchos jóvenes ven programas de talentos por la noche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele junge Leute",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Abend Castingshows",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Club",
    "pron": "dea klup",
    "es": "el club / discoteca",
    "type": "Sustantivo (Masc)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Clubs",
    "en": "modern music club entrance with neon lights and velvet rope",
    "exampleSentenceDe": "Am Samstag treffen wir uns im neuen Club.",
    "exampleSentenceEs": "El sábado nos encontramos en el club nuevo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Samstag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "treffen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir uns im neuen Club",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der/das Comic",
    "pron": "dea/das kó-mik",
    "es": "el cómic / historieta",
    "type": "Sustantivo (Masc/Neutro)",
    "category": "Medien",
    "level": "B1",
    "plural": "die Comics",
    "en": "colorful open comic book magazine with illustrated panels",
    "exampleSentenceDe": "Mein Sohn liest vor dem Schlafen immer Comics.",
    "exampleSentenceEs": "Mi hijo siempre lee cómics antes de dormir.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Sohn",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liest",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "vor dem Schlafen immer Comics",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Fan",
    "pron": "dea fen",
    "es": "el fan / seguidor",
    "type": "Sustantivo (Masc)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Fans",
    "en": "cheering sports fan wearing a striped team scarf and waving a flag",
    "exampleSentenceDe": "Ich bin ein großer Fan von dieser Mannschaft.",
    "exampleSentenceEs": "Soy un gran seguidor de este equipo.",
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
        "text": "ein großer Fan von dieser Mannschaft",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Festival",
    "pron": "das fés-ti-val",
    "es": "el festival",
    "type": "Sustantivo (Neutro)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Festivals",
    "exampleSentenceDe": "Im Juli besuchen wir ein großes Musikfestival.",
    "exampleSentenceEs": "En julio visitamos un gran festival de música.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Juli",
        "role": "subject",
        "order": 1
      },
      {
        "text": "besuchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir ein großes Musikfestival",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "filmen",
    "pron": "fíl-men",
    "es": "filmar / grabar en vídeo",
    "type": "Verbo regular",
    "category": "Medien",
    "level": "A1",
    "regimen": "+ Akkusativ / filmt, filmte, hat gefilmt",
    "en": "person holding a camcorder filming a scene",
    "exampleSentenceDe": "Eva kann auf der Party super filmen.",
    "exampleSentenceEs": "Eva sabe grabar estupendamente en la fiesta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Eva",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "auf der Party super",
        "role": "complement",
        "order": 3
      },
      {
        "text": "filmen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Fitness",
    "pron": "di fít-nes",
    "es": "la forma física / fitness",
    "type": "Sustantivo (Fem)",
    "category": "Sport",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Für meine Fitness gehe ich zweimal pro Woche joggen.",
    "exampleSentenceEs": "Para mi forma física salgo a correr dos veces por semana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für meine Fitness",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich zweimal pro Woche",
        "role": "complement",
        "order": 3
      },
      {
        "text": "joggen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Foto",
    "pron": "das fó-to",
    "es": "la fotografía / foto",
    "type": "Sustantivo (Neutro)",
    "category": "Medien",
    "level": "A1",
    "plural": "die Fotos",
    "en": "printed glossy landscape photograph in a clean frame",
    "exampleSentenceDe": "Auf dem Foto bin ich mit meiner Schwester.",
    "exampleSentenceEs": "En la foto estoy con mi hermana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dem Foto",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bin",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich mit meiner Schwester",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "fotografieren",
    "pron": "fo-to-gra-fí-ren",
    "es": "fotografiar / hacer fotos",
    "type": "Verbo (-ieren)",
    "category": "Hobbys",
    "level": "A1",
    "regimen": "fotografiert, hat fotografiert",
    "en": "person taking a picture with a black DSLR camera",
    "exampleSentenceDe": "Charlotte fotografiert gern in der Natur.",
    "exampleSentenceEs": "A Charlotte le gusta fotografiar en la naturaleza.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Charlotte",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fotografiert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gern in der Natur",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Fußballspiel",
    "pron": "das fús-bal-shpil",
    "es": "el partido de fútbol",
    "type": "Sustantivo (Neutro)",
    "category": "Sport",
    "level": "A1",
    "plural": "die Fußballspiele",
    "exampleSentenceDe": "Am Samstag schauen wir das Fußballspiel im Stadion.",
    "exampleSentenceEs": "El sábado vemos el partido de fútbol en el estadio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Samstag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schauen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir das Fußballspiel im Stadion",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Gitarre",
    "pron": "di gui-tá-re",
    "es": "la guitarra",
    "type": "Sustantivo (Fem)",
    "category": "Kultur",
    "level": "A1",
    "plural": "die Gitarren",
    "en": "classic wooden acoustic six-string guitar",
    "exampleSentenceDe": "Ich spiele Gitarre und ein bisschen Klavier.",
    "exampleSentenceEs": "Toco la guitarra y un poco el piano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spiele",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Gitarre und ein bisschen Klavier",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Hallenbad",
    "pron": "das já-len-bat",
    "es": "la piscina cubierta",
    "type": "Sustantivo (Neutro)",
    "category": "Sport",
    "level": "B1",
    "plural": "die Hallenbäder",
    "en": "modern indoor swimming pool building with blue water lanes",
    "exampleSentenceDe": "Im Winter schwimmen wir oft im Hallenbad.",
    "exampleSentenceEs": "En invierno nadamos a menudo en la piscina cubierta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Winter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schwimmen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir oft im Hallenbad",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Haustier",
    "pron": "das jáus-tir",
    "es": "la mascota",
    "type": "Sustantivo (Neutro)",
    "category": "Tiere",
    "level": "A1",
    "plural": "die Haustiere",
    "en": "friendly puppy and kitten sitting together as household pets",
    "exampleSentenceDe": "Haben Sie ein Haustier zu Hause?",
    "exampleSentenceEs": "¿Tiene usted una mascota en casa?",
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
        "text": "ein Haustier zu Hause",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Hit",
    "pron": "dea jit",
    "es": "el éxito musical",
    "type": "Sustantivo (Masc)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Hits",
    "exampleSentenceDe": "Im Radio läuft gerade ein bekannter Hit.",
    "exampleSentenceEs": "En la radio suena ahora un éxito conocido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Radio",
        "role": "subject",
        "order": 1
      },
      {
        "text": "läuft",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gerade ein bekannter Hit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Jazz",
    "pron": "dea yes",
    "es": "el jazz",
    "type": "Sustantivo (Masc)",
    "category": "Kultur",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Mein Vater hört abends sehr gern Jazz.",
    "exampleSentenceEs": "A mi padre le gusta mucho escuchar jazz por la noche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Vater",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hört",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "abends sehr gern Jazz",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "joggen",
    "pron": "yó-guen",
    "es": "trotar / correr",
    "type": "Verbo regular",
    "category": "Sport",
    "level": "B1",
    "regimen": "joggt, joggte, ist/hat gejoggt",
    "en": "runner jogging energetically in athletic sneakers and sportswear",
    "exampleSentenceDe": "Jeden Morgen jogge ich dreißig Minuten im Park.",
    "exampleSentenceEs": "Cada mañana salgo a trotar treinta minutos al parque.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Jeden Morgen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "jogge",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich dreißig Minuten im Park",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Konzert",
    "pron": "das kon-tsért",
    "es": "el concierto",
    "type": "Sustantivo (Neutro)",
    "category": "Kultur",
    "level": "A1",
    "plural": "die Konzerte",
    "exampleSentenceDe": "Nächsten Freitag gehen wir auf ein Rockkonzert.",
    "exampleSentenceEs": "El próximo viernes vamos a un concierto de rock.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nächsten Freitag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir auf ein Rockkonzert",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Krimi",
    "pron": "dea krí-mi",
    "es": "la novela o película policiaca",
    "type": "Sustantivo (Masc)",
    "category": "Medien",
    "level": "A1",
    "plural": "die Krimis",
    "exampleSentenceDe": "Am Sonntagabend lese ich einen spannenden Krimi.",
    "exampleSentenceEs": "El domingo por la noche leo una novela policiaca emocionante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Sonntagabend",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lese",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich einen spannenden Krimi",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Lied",
    "pron": "das lit",
    "es": "la canción",
    "type": "Sustantivo (Neutro)",
    "category": "Kultur",
    "level": "A2–B1",
    "plural": "die Lieder",
    "exampleSentenceDe": "Welches deutsche Lied kennst du schon?",
    "exampleSentenceEs": "¿Qué canción alemana conoces ya?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welches deutsche Lied",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kennst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "du schon",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "malen",
    "pron": "má-len",
    "es": "pintar",
    "type": "Verbo regular",
    "category": "Hobbys",
    "level": "A1–B1",
    "regimen": "+ Akkusativ / malt, malte, hat gemalt",
    "en": "artist painting a colorful landscape on a wooden easel with brush",
    "exampleSentenceDe": "Mein Hobby ist es, Landschaften zu malen.",
    "exampleSentenceEs": "Mi pasatiempo es pintar paisajes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Hobby",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es, Landschaften",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu malen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Mannschaft",
    "pron": "di mán-shaft",
    "es": "el equipo (deportivo)",
    "type": "Sustantivo (Fem)",
    "category": "Sport",
    "level": "A1–A2",
    "plural": "die Mannschaften",
    "en": "sports team of athletes wearing matching jerseys standing together",
    "exampleSentenceDe": "Unsere Mannschaft hat heute 2:1 gewonnen.",
    "exampleSentenceEs": "Nuestro equipo ha ganado hoy 2 a 1.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Mannschaft",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute 2:1",
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
    "de": "das Mountainbike",
    "pron": "das máun-ten-baik",
    "es": "la bicicleta de montaña",
    "type": "Sustantivo (Neutro)",
    "category": "Sport",
    "level": "B1",
    "plural": "die Mountainbikes",
    "en": "rugged mountain bike bicycle with suspension and thick tires",
    "exampleSentenceDe": "Am Wochenende fahre ich mit dem Mountainbike durch den Wald.",
    "exampleSentenceEs": "El fin de semana voy con la bici de montaña por el bosque.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Wochenende",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fahre",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich mit dem Mountainbike durch den Wald",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Oper",
    "pron": "di ó-pa",
    "es": "la ópera",
    "type": "Sustantivo (Fem)",
    "category": "Kultur",
    "level": "A1",
    "plural": "die Opern",
    "en": "grand classical opera house building with columns and red curtains",
    "exampleSentenceDe": "In Wien gibt es eine sehr berühmte Oper.",
    "exampleSentenceEs": "En Viena hay una ópera muy famosa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Wien",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es eine sehr berühmte Oper",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Party",
    "pron": "di pár-ti",
    "es": "la fiesta",
    "type": "Sustantivo (Fem)",
    "category": "Freizeit",
    "level": "A1",
    "plural": "die Partys",
    "exampleSentenceDe": "Vielen Dank für die Einladung zu deiner Party!",
    "exampleSentenceEs": "¡Muchas gracias por la invitación a tu fiesta!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vielen Dank",
        "role": "subject",
        "order": 1
      },
      {
        "text": "für die Einladung zu deiner Party",
        "role": "complement",
        "order": 2
      }
    ]
  },
  {
    "de": "das Poster",
    "pron": "das pós-ta",
    "es": "el póster / cartel",
    "type": "Sustantivo (Neutro)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Poster",
    "en": "colorful illustrated travel wall poster taped flat on a wall",
    "exampleSentenceDe": "An der Wand hängt ein großes Poster von Berlin.",
    "exampleSentenceEs": "En la pared cuelga un gran póster de Berlín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An der Wand",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hängt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein großes Poster von Berlin",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Puzzle",
    "pron": "das pú-tsel",
    "es": "el rompecabezas / puzle",
    "type": "Sustantivo (Neutro)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Puzzles",
    "en": "colorful interlocking jigsaw puzzle pieces partially assembled",
    "exampleSentenceDe": "Die Kinder machen zusammen ein großes Puzzle.",
    "exampleSentenceEs": "Los niños hacen juntos un puzle grande.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Kinder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "machen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zusammen ein großes Puzzle",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Saxophon",
    "pron": "das sak-zo-fón",
    "es": "el saxofón",
    "type": "Sustantivo (Neutro)",
    "category": "Kultur",
    "level": "A1",
    "plural": "die Saxophone",
    "en": "shiny golden brass alto saxophone musical instrument",
    "exampleSentenceDe": "Er lernt Saxophon in der Musikschule.",
    "exampleSentenceEs": "Él aprende saxofón en la escuela de música.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lernt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Saxophon in der Musikschule",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Show",
    "pron": "di shou",
    "es": "el espectáculo / programa",
    "type": "Sustantivo (Fem)",
    "category": "Medien",
    "level": "B1",
    "plural": "die Shows",
    "exampleSentenceDe": "Die neue Show im Fernsehen beginnt um zwanzig Uhr.",
    "exampleSentenceEs": "El nuevo espectáculo en la tele empieza a las ocho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die neue Show im Fernsehen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "beginnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "um zwanzig Uhr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Ski fahren",
    "pron": "shi fá-ren",
    "es": "esquiar",
    "type": "Frase verbal",
    "category": "Sport",
    "level": "A1",
    "regimen": "fährt Ski, fuhr Ski, ist Ski gefahren",
    "en": "skier gliding down a snowy alpine slope with skis and poles",
    "exampleSentenceDe": "Im Winter fahren wir gern in den Alpen Ski.",
    "exampleSentenceEs": "En invierno nos gusta esquiar en los Alpes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Winter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir gern in den Alpen",
        "role": "complement",
        "order": 3
      },
      {
        "text": "Ski",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Song",
    "pron": "dea song",
    "es": "la canción (moderna)",
    "type": "Sustantivo (Masc)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Songs",
    "exampleSentenceDe": "Dieser Song ist in Deutschland sehr beliebt.",
    "exampleSentenceEs": "Esta canción es muy popular en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieser Song",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Deutschland sehr beliebt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "surfen",
    "pron": "sö́r-fen",
    "es": "surfear / navegar (en internet)",
    "type": "Verbo regular",
    "category": "Sport",
    "level": "A1–B1",
    "regimen": "surft, surfte, ist/hat gesurft",
    "en": "surfer riding a curling blue ocean wave on a surfboard",
    "exampleSentenceDe": "Eva kann surfen und tauchen.",
    "exampleSentenceEs": "Eva sabe hacer surf y bucear.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Eva",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "surfen und tauchen",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "der Swimmingpool",
    "pron": "dea sví-ming-pul",
    "es": "la piscina (privada/hotel)",
    "type": "Sustantivo (Masc)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Swimmingpools",
    "en": "outdoor rectangular blue swimming pool with metal ladder",
    "exampleSentenceDe": "Das Hotel hat leider keinen Swimmingpool.",
    "exampleSentenceEs": "Lamentablemente el hotel no tiene piscina.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Hotel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider keinen Swimmingpool",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Szene",
    "pron": "di tsé-ne",
    "es": "la escena",
    "type": "Sustantivo (Fem)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Szenen",
    "exampleSentenceDe": "Diese Szene im Film war wirklich spannend.",
    "exampleSentenceEs": "Esta escena en la película fue realmente emocionante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Diese Szene im Film",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wirklich spannend",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Tanz",
    "pron": "dea tants",
    "es": "el baile / danza",
    "type": "Sustantivo (Masc)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Tänze",
    "exampleSentenceDe": "Dieser traditionelle Tanz gefällt mir gut.",
    "exampleSentenceEs": "Este baile tradicional me gusta mucho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieser traditionelle Tanz",
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
    "de": "tauchen",
    "pron": "táu-jen",
    "es": "bucear",
    "type": "Verbo regular",
    "category": "Sport",
    "level": "A1",
    "regimen": "taucht, tauchte, ist/hat getaucht",
    "en": "scuba diver with diving mask and fins swimming underwater",
    "exampleSentenceDe": "Im Urlaub möchte ich im Meer tauchen.",
    "exampleSentenceEs": "En vacaciones quiero bucear en el mar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Urlaub",
        "role": "subject",
        "order": 1
      },
      {
        "text": "möchte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich im Meer",
        "role": "complement",
        "order": 3
      },
      {
        "text": "tauchen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Tier",
    "pron": "das tir",
    "es": "el animal",
    "type": "Sustantivo (Neutro)",
    "category": "Tiere",
    "level": "A1",
    "plural": "die Tiere",
    "en": "cute friendly forest animals together including fox, deer, and rabbit",
    "exampleSentenceDe": "Welche Tiere leben hier im Wald?",
    "exampleSentenceEs": "¿Qué animales viven aquí en el bosque?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welche Tiere",
        "role": "subject",
        "order": 1
      },
      {
        "text": "leben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "hier im Wald",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Training",
    "pron": "das tréi-ning",
    "es": "el entrenamiento",
    "type": "Sustantivo (Neutro)",
    "category": "Sport",
    "level": "A1",
    "plural": "die Trainings",
    "exampleSentenceDe": "Wann hat er Training? Am Mittwoch um sechzehn Uhr.",
    "exampleSentenceEs": "¿Cuándo tiene entrenamiento? El miércoles a las cuatro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wann",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "er Training? Am Mittwoch um sechzehn Uhr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Video",
    "pron": "das ví-deo",
    "es": "el vídeo",
    "type": "Sustantivo (Neutro)",
    "category": "Medien",
    "level": "A1",
    "plural": "die Videos",
    "exampleSentenceDe": "Ich bearbeite die Videos am Computer.",
    "exampleSentenceEs": "Edito los vídeos en el ordenador.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bearbeite",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Videos am Computer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Videospiel",
    "pron": "das ví-deo-shpil",
    "es": "el videojuego",
    "type": "Sustantivo (Neutro)",
    "category": "Medien",
    "level": "A1",
    "plural": "die Videospiele",
    "exampleSentenceDe": "Viele Jugendliche spielen gern Videospiele.",
    "exampleSentenceEs": "A muchos jóvenes les gusta jugar videojuegos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Jugendliche",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spielen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gern Videospiele",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Ente",
    "pron": "di én-te",
    "es": "el pato",
    "type": "Sustantivo (Fem)",
    "category": "Tiere",
    "level": "B1",
    "plural": "die Enten",
    "en": "cute colorful mallard duck swimming peacefully on blue pond water",
    "exampleSentenceDe": "Am See füttern viele Leute die Enten im Wasser.",
    "exampleSentenceEs": "En el lago mucha gente alimenta a los patos en el agua.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am See",
        "role": "complement",
        "order": 1
      },
      {
        "text": "füttern",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele Leute",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Enten im Wasser",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Fliege",
    "pron": "di flí-gue",
    "es": "la mosca (y pajarita)",
    "type": "Sustantivo (Fem)",
    "category": "Tiere",
    "level": "B1",
    "plural": "die Fliegen",
    "en": "stylized cartoon housefly insect with translucent wings",
    "exampleSentenceDe": "Im Sommer kommen viele Fliegen durch das offene Fenster.",
    "exampleSentenceEs": "En verano entran muchas moscas por la ventana abierta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Sommer",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kommen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele Fliegen",
        "role": "subject",
        "order": 3
      },
      {
        "text": "durch das offene Fenster",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Hase",
    "pron": "dea já-ze",
    "es": "la liebre / conejo",
    "type": "Sustantivo (Masc)",
    "category": "Tiere",
    "level": "B1",
    "plural": "die Hasen",
    "en": "cute brown wild hare rabbit with long ears sitting on green grass",
    "exampleSentenceDe": "Auf der Wiese hinter dem Wald läuft ein Hase.",
    "exampleSentenceEs": "En el prado detrás del bosque corre una liebre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der Wiese hinter dem Wald",
        "role": "complement",
        "order": 1
      },
      {
        "text": "läuft",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Hase",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "das Insekt",
    "pron": "das in-zékt",
    "es": "el insecto",
    "type": "Sustantivo (Neutro)",
    "category": "Tiere",
    "level": "B1",
    "plural": "die Insekten",
    "en": "friendly colorful ladybug and beetle insects on a green leaf",
    "exampleSentenceDe": "Dieses Spray schützt im Sommer vor Insekten.",
    "exampleSentenceEs": "Este aerosol protege en verano contra los insectos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Spray",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schützt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Sommer vor Insekten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mücke",
    "pron": "di mǘ-ke",
    "es": "el mosquito",
    "type": "Sustantivo (Fem)",
    "category": "Tiere",
    "level": "B1",
    "plural": "die Mücken",
    "en": "stylized mosquito insect with slender legs and translucent wings",
    "exampleSentenceDe": "Abends am See wurde ich von Mücken gestochen.",
    "exampleSentenceEs": "Por la tarde en el lago me picaron los mosquitos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Abends am See",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wurde",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "von Mücken",
        "role": "complement",
        "order": 4
      },
      {
        "text": "gestochen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Schildkröte",
    "pron": "di shílt-krö-te",
    "es": "la tortuga",
    "type": "Sustantivo (Fem)",
    "category": "Tiere",
    "level": "B1",
    "plural": "die Schildkröten",
    "en": "cute green turtle with patterned rounded shell walking slowly",
    "exampleSentenceDe": "Eine Schildkröte kann über hundert Jahre alt werden.",
    "exampleSentenceEs": "Una tortuga puede vivir más de cien años.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Eine Schildkröte",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über hundert Jahre alt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "werden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Abenteuer",
    "pron": "das á-ben-toi-a",
    "es": "la aventura",
    "type": "Sustantivo (Neutro)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Abenteuer",
    "exampleSentenceDe": "Die Reise durch die Berge war ein tolles Abenteuer.",
    "exampleSentenceEs": "El viaje por las montañas fue una gran aventura.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Reise durch die Berge",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein tolles Abenteuer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Bühne",
    "pron": "di bǘ-ne",
    "es": "el escenario",
    "type": "Sustantivo (Fem)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Bühnen",
    "en": "wooden theater concert stage with red velvet curtains and glowing spotlights",
    "exampleSentenceDe": "Die Musiker stehen ab zwanzig Uhr auf der Bühne.",
    "exampleSentenceEs": "Los músicos están sobre el escenario a partir de las ocho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Musiker",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ab zwanzig Uhr auf der Bühne",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Flohmarkt",
    "pron": "dea fló-markt",
    "es": "el mercadillo / rastro",
    "type": "Sustantivo (Masc)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Flohmärkte",
    "en": "outdoor flea market wooden stall displaying antique mirror, books, and vintage items",
    "exampleSentenceDe": "Diesen alten Spiegel habe ich auf dem Flohmarkt gekauft.",
    "exampleSentenceEs": "Compré este espejo antiguo en el mercadillo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Diesen alten Spiegel",
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
        "text": "auf dem Flohmarkt",
        "role": "complement",
        "order": 4
      },
      {
        "text": "gekauft",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Flöte",
    "pron": "di flö́-te",
    "es": "la flauta",
    "type": "Sustantivo (Fem)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Flöten",
    "en": "polished wooden recorder flute musical instrument",
    "exampleSentenceDe": "Meine Tochter lernt in der Musikschule Flöte.",
    "exampleSentenceEs": "Mi hija aprende flauta en la escuela de música.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Tochter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lernt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in der Musikschule Flöte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "im Freien",
    "pron": "im frái-en",
    "es": "al aire libre",
    "type": "Frase adverbial",
    "category": "Freizeit",
    "level": "B1",
    "regimen": "Lokal",
    "exampleSentenceDe": "Im Sommer findet das Konzert im Freien statt.",
    "exampleSentenceEs": "En verano el concierto tiene lugar al aire libre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Sommer",
        "role": "complement",
        "order": 1
      },
      {
        "text": "findet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Konzert",
        "role": "subject",
        "order": 3
      },
      {
        "text": "im Freien",
        "role": "complement",
        "order": 4
      },
      {
        "text": "statt",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "füttern",
    "pron": "fǘ-tern",
    "es": "dar de comer / alimentar (animales)",
    "type": "Verbo regular",
    "category": "Tiere",
    "level": "B1",
    "regimen": "+ Akk / füttert, fütterte, hat gefüttert",
    "en": "person gently feeding bread crumbs to ducks beside a park lake",
    "exampleSentenceDe": "Im Zoo ist es verboten, die Tiere zu füttern.",
    "exampleSentenceEs": "En el zoo está prohibido dar de comer a los animales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Zoo",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es",
        "role": "subject",
        "order": 3
      },
      {
        "text": "verboten,",
        "role": "complement",
        "order": 4
      },
      {
        "text": "die Tiere",
        "role": "complement",
        "order": 5
      },
      {
        "text": "zu füttern",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "ins Kino",
    "pron": "ins kí-no",
    "es": "al cine",
    "type": "Frase locativa (Akk)",
    "category": "Freizeit",
    "level": "A1",
    "regimen": "Responde a Wohin?",
    "exampleSentenceDe": "Wollen wir heute Abend zusammen ins Kino gehen?",
    "exampleSentenceEs": "¿Vamos juntos al cine esta noche?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wollen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 2
      },
      {
        "text": "heute Abend zusammen ins Kino",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gehen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Klub (Club)",
    "pron": "dea klup",
    "es": "el club",
    "type": "Sustantivo (Masc)",
    "category": "Freizeit",
    "level": "B1",
    "plural": "die Klubs",
    "en": "cozy modern social club building entrance with warm glowing lights",
    "exampleSentenceDe": "Am Samstagabend treffen wir uns im neuen Klub.",
    "exampleSentenceEs": "El sábado por la noche nos encontramos en el club nuevo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Samstagabend",
        "role": "complement",
        "order": 1
      },
      {
        "text": "treffen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "uns im neuen Klub",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Orchester",
    "pron": "das or-kés-ta",
    "es": "la orquesta",
    "type": "Sustantivo (Neutro)",
    "category": "Kultur",
    "level": "B1",
    "plural": "die Orchester",
    "en": "symphony orchestra musicians playing violins, cello, and brass instruments",
    "exampleSentenceDe": "Auf unserer Hochzeit hat ein kleines Orchester gespielt.",
    "exampleSentenceEs": "En nuestra boda tocó una pequeña orquesta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf unserer Hochzeit",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein kleines Orchester",
        "role": "subject",
        "order": 3
      },
      {
        "text": "gespielt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "reiten",
    "pron": "rái-ten",
    "es": "montar a caballo",
    "type": "Verbo irregular",
    "category": "Sport",
    "level": "B1",
    "regimen": "reitet, ritt, ist geritten",
    "en": "rider on a brown horse trotting across a green meadow",
    "exampleSentenceDe": "Meine Tochter möchte unbedingt reiten lernen.",
    "exampleSentenceEs": "Mi hija quiere aprender a montar a caballo sin falta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Tochter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "möchte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "unbedingt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "reiten lernen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Sieg",
    "pron": "dea zik",
    "es": "la victoria / triunfo",
    "type": "Sustantivo (Masc)",
    "category": "Sport",
    "level": "B1",
    "plural": "die Siege",
    "exampleSentenceDe": "Unsere Mannschaft hat gewonnen, wir freuen uns über den Sieg.",
    "exampleSentenceEs": "Nuestro equipo ha ganado, nos alegramos por la victoria.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Mannschaft",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gewonnen,",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 4
      },
      {
        "text": "freuen",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "uns über den Sieg",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "der Sieger / die Siegerin",
    "pron": "dea zí-gua",
    "es": "el ganador / la vencedora",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Sport",
    "level": "B1",
    "plural": "die Sieger / -innen",
    "en": "a cute 3D isometric avatar of a joyful athlete winner raising a shiny gold trophy",
    "exampleSentenceDe": "Wer hat das Turnier gewonnen? Wie heißt die Siegerin?",
    "exampleSentenceEs": "¿Quién ha ganado el torneo? ¿Cómo se llama la vencedora?",
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
        "text": "das Turnier",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gewonnen?",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "Wie",
        "role": "complement",
        "order": 5
      },
      {
        "text": "heißt",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "die Siegerin",
        "role": "subject",
        "order": 7
      }
    ]
  },
  {
    "de": "der Zoo",
    "pron": "dea tso",
    "es": "el zoo",
    "type": "Sustantivo (Masc)",
    "category": "Tiere",
    "level": "A1–B1",
    "plural": "die Zoos",
    "en": "a cute 3D isometric UI icon of a cheerful zoo park with green trees, giraffe, and elephant",
    "exampleSentenceDe": "Am Sonntag gehen wir bei schönem Wetter mit den Kindern in den Zoo.",
    "exampleSentenceEs": "El domingo con buen tiempo vamos con los niños al zoo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Sonntag",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "bei schönem Wetter mit den Kindern in den Zoo",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "zu|schauen",
    "pron": "tsú-shau-en",
    "es": "mirar / ser espectador",
    "type": "Verbo separable",
    "category": "Sport",
    "level": "B1",
    "regimen": "+ Dativ / schaut zu, schaute zu, hat zugeschaut",
    "exampleSentenceDe": "Willst du mitspielen? — Nein danke, ich schaue lieber nur zu.",
    "exampleSentenceEs": "¿Quieres jugar? — No gracias, prefiero solo mirar.",
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
        "text": "mitspielen?",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "— Nein danke,",
        "role": "complement",
        "order": 4
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 5
      },
      {
        "text": "schaue",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "lieber nur",
        "role": "complement",
        "order": 7
      },
      {
        "text": "zu",
        "role": "verb_p2",
        "order": 8
      }
    ]
  },
  {
    "de": "der Zuschauer",
    "pron": "dea tsú-shau-a",
    "es": "el espectador",
    "type": "Sustantivo (Masc)",
    "category": "Sport",
    "level": "B1",
    "plural": "die Zuschauer (Fem: -in)",
    "en": "a cute 3D isometric avatar of a smiling stadium spectator sitting and clapping happily",
    "exampleSentenceDe": "Liebe Zuschauer, wir wünschen Ihnen heute Abend gute Unterhaltung.",
    "exampleSentenceEs": "Queridos espectadores, les deseamos esta noche un buen entretenimiento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Liebe Zuschauer,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 2
      },
      {
        "text": "wünschen",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "Ihnen heute Abend gute Unterhaltung",
        "role": "complement",
        "order": 4
      }
    ]
  }
]
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
    exampleSentenceDe: "Der Nebel ist sehr dicht.",
    exampleSentenceEs: "La niebla es muy densa.",
    exampleSentenceDeBlocks: [
      { text: "Der Nebel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
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
    },
  {
    "de": "ab|fahren",
    "pron": "áp-fa-ren",
    "es": "salir / partir (transporte)",
    "type": "Verbo separable irr.",
    "category": "Verkehr",
    "level": "A1–B1",
    "regimen": "fährt ab, fuhr ab, ist abgefahren",
    "en": "passenger train departing swiftly from a railway station platform",
    "exampleSentenceDe": "Entschuldigung, wann fährt die Linie 2 ab?",
    "exampleSentenceEs": "Disculpe, ¿cuándo sale la línea 2?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Entschuldigung, wann",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Linie 2",
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
    "de": "die Abfahrtszeit",
    "pron": "di áp-farts-tsait",
    "es": "la hora de salida",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A1",
    "plural": "die Abfahrtszeiten",
    "exampleSentenceDe": "Die Abfahrtszeit steht oben auf dem Fahrplan.",
    "exampleSentenceEs": "La hora de salida figura arriba en el horario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Abfahrtszeit",
        "role": "subject",
        "order": 1
      },
      {
        "text": "steht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "oben auf dem Fahrplan",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "an|kommen",
    "pron": "án-ko-men",
    "es": "llegar",
    "type": "Verbo separable irr.",
    "category": "Reisen",
    "level": "A1–B1",
    "regimen": "kommt an, kam an, ist angekommen",
    "en": "passenger train arriving smoothly at a train station platform",
    "exampleSentenceDe": "Wann kommt ihr endlich in Berlin an?",
    "exampleSentenceEs": "¿Cuándo llegáis por fin a Berlín?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wann",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ihr endlich in Berlin",
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
    "de": "die Ankunft",
    "pron": "di án-kunft",
    "es": "la llegada",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Ankünfte",
    "exampleSentenceDe": "Die Ankunft des Zuges ist um 14:20 Uhr.",
    "exampleSentenceEs": "La llegada del tren es a las 14:20 h.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Ankunft des Zuges",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "um 14:20 Uhr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die City",
    "pron": "di sí-ti",
    "es": "el centro urbano / centro",
    "type": "Sustantivo (Fem)",
    "category": "Stadt",
    "level": "B1",
    "plural": "die Citys",
    "en": "bustling downtown city center plaza with shops and buildings",
    "exampleSentenceDe": "Am Samstag gehen wir in der City einkaufen.",
    "exampleSentenceEs": "El sábado vamos de compras al centro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Samstag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir in der City",
        "role": "complement",
        "order": 3
      },
      {
        "text": "einkaufen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das E-Bike",
    "pron": "das í-baik",
    "es": "la bicicleta eléctrica",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die E-Bikes",
    "en": "modern electric commuter bicycle with battery pack on frame",
    "exampleSentenceDe": "Immer mehr Pendler fahren mit dem E-Bike zur Arbeit.",
    "exampleSentenceEs": "Cada vez más trabajadores van en bici eléctrica al trabajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Immer mehr Pendler",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mit dem E-Bike zur Arbeit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Fahrrad",
    "pron": "das fár-rat",
    "es": "la bicicleta",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehr",
    "level": "A1",
    "plural": "die Fahrräder",
    "en": "classic blue city bicycle with front basket and bell",
    "exampleSentenceDe": "Thomas hat ein Auto, aber er hat kein Fahrrad.",
    "exampleSentenceEs": "Thomas tiene un coche, pero no tiene bicicleta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Thomas",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Auto, aber er hat kein Fahrrad",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Gegend",
    "pron": "di gué-guent",
    "es": "la zona / región / alrededores",
    "type": "Sustantivo (Fem)",
    "category": "Reisen",
    "level": "A1",
    "plural": "die Gegenden",
    "exampleSentenceDe": "Das ist eine sehr ruhige und grüne Gegend.",
    "exampleSentenceEs": "Esta es una zona muy tranquila y verde.",
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
        "text": "eine sehr ruhige und grüne Gegend",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Hafen",
    "pron": "dea já-fen",
    "es": "el puerto",
    "type": "Sustantivo (Masc)",
    "category": "Reisen",
    "level": "B1",
    "plural": "die Häfen",
    "en": "maritime sea harbor port with cargo ships and dock cranes",
    "exampleSentenceDe": "Im Hamburger Hafen liegen viele große Schiffe.",
    "exampleSentenceEs": "En el puerto de Hamburgo hay muchos barcos grandes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Hamburger Hafen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele große Schiffe",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "hageln",
    "pron": "já-gueln",
    "es": "granizar",
    "type": "Verbo impersonal",
    "category": "Wetter",
    "level": "B1",
    "regimen": "es hagelt, hagelte, hat gehagelt",
    "en": "dark storm cloud dropping icy white hailstones",
    "exampleSentenceDe": "Achtung, heute Nachmittag kann es stark hageln!",
    "exampleSentenceEs": "¡Atención, esta tarde puede granizar fuerte!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Achtung, heute Nachmittag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es stark",
        "role": "complement",
        "order": 3
      },
      {
        "text": "hageln",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Hotel",
    "pron": "das jo-tél",
    "es": "el hotel",
    "type": "Sustantivo (Neutro)",
    "category": "Reisen",
    "level": "A1–A2",
    "plural": "die Hotels",
    "en": "multi-story modern hotel building with glass entrance awning",
    "exampleSentenceDe": "Unser Hotel liegt fünf Minuten vom Bahnhof entfernt.",
    "exampleSentenceEs": "Nuestro hotel está a cinco minutos de la estación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unser Hotel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fünf Minuten vom Bahnhof entfernt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der ICE",
    "pron": "dea i-tsé-e",
    "es": "el tren de alta velocidad ICE",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "regimen": "InterCityExpress",
    "en": "sleek white and red German ICE high-speed passenger train",
    "exampleSentenceDe": "Mit dem ICE fährt man schnell nach München.",
    "exampleSentenceEs": "Con el ICE se viaja rápido a Múnich.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mit dem ICE",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man schnell nach München",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Insel",
    "pron": "di ín-zel",
    "es": "la isla",
    "type": "Sustantivo (Fem)",
    "category": "Natur",
    "level": "A1",
    "plural": "die Inseln",
    "en": "scenic green island with sandy shore surrounded by blue ocean",
    "exampleSentenceDe": "Die Insel Rügen ist im Sommer sehr voll.",
    "exampleSentenceEs": "La isla de Rügen está muy llena en verano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Insel Rügen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Sommer sehr voll",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Koffer",
    "pron": "dea kó-fa",
    "es": "la maleta",
    "type": "Sustantivo (Masc)",
    "category": "Reisen",
    "level": "A1–A2",
    "plural": "die Koffer",
    "en": "hard-shell rolling travel suitcase with telescopic handle",
    "exampleSentenceDe": "Hast du deinen Koffer für den Flug schon gepackt?",
    "exampleSentenceEs": "¿Ya has hecho tu maleta para el vuelo?",
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
        "text": "deinen Koffer für den Flug schon",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gepackt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "landen",
    "pron": "lán-den",
    "es": "aterrizar",
    "type": "Verbo regular",
    "category": "Reisen",
    "level": "B1",
    "regimen": "landet, landete, ist gelandet",
    "en": "commercial passenger airplane landing smoothly on an airport runway",
    "exampleSentenceDe": "Das Flugzeug landet pünktlich um zehn Uhr.",
    "exampleSentenceEs": "El avión aterriza puntual a las diez.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Flugzeug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "landet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "pünktlich um zehn Uhr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Landkarte",
    "pron": "di lánt-kar-te",
    "es": "el mapa / plano",
    "type": "Sustantivo (Fem)",
    "category": "Orientierung",
    "level": "A1",
    "plural": "die Landkarten",
    "en": "folded colorful paper geographic map with roads and pins",
    "exampleSentenceDe": "Auf dieser Landkarte sieht man alle großen Städte.",
    "exampleSentenceEs": "En este mapa se ven todas las ciudades grandes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dieser Landkarte",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sieht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man alle großen Städte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Landung",
    "pron": "di lán-dung",
    "es": "el aterrizaje",
    "type": "Sustantivo (Fem)",
    "category": "Reisen",
    "level": "B1",
    "plural": "die Landungen",
    "exampleSentenceDe": "Nach der Landung holen wir unsere Koffer ab.",
    "exampleSentenceEs": "Tras el aterrizaje recogemos nuestras maletas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach der Landung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "holen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir unsere Koffer",
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
    "de": "die Landwirtschaft",
    "pron": "di lánt-virt-shaft",
    "es": "la agricultura",
    "type": "Sustantivo (Fem)",
    "category": "Natur",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "In dieser Region spielt die Landwirtschaft eine Rolle.",
    "exampleSentenceEs": "En esta región la agricultura juega un papel importante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In dieser Region",
        "role": "subject",
        "order": 1
      },
      {
        "text": "spielt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Landwirtschaft eine Rolle",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Linie",
    "pron": "di lí-nie",
    "es": "la línea (metro/autobús)",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A1",
    "plural": "die Linien",
    "exampleSentenceDe": "Sie müssen hier die Linie vier nehmen.",
    "exampleSentenceEs": "Tiene que tomar aquí la línea cuatro.",
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
        "text": "hier die Linie vier",
        "role": "complement",
        "order": 3
      },
      {
        "text": "nehmen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Luft",
    "pron": "di luft",
    "es": "el aire",
    "type": "Sustantivo (Fem)",
    "category": "Natur",
    "level": "A2–B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Nach der Arbeit brauche ich frische Luft.",
    "exampleSentenceEs": "Después del trabajo necesito aire fresco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach der Arbeit",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich frische Luft",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Reiseführer",
    "pron": "dea rái-ze-fü-ra",
    "es": "la guía turística (libro/persona)",
    "type": "Sustantivo (Masc)",
    "category": "Reisen",
    "level": "A2",
    "plural": "die Reiseführer",
    "en": "open travel guidebook with illustrated map and compass",
    "exampleSentenceDe": "Vor dem Urlaub kaufe ich einen Reiseführer.",
    "exampleSentenceEs": "Antes de las vacaciones compro una guía turística.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vor dem Urlaub",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kaufe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich einen Reiseführer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Schulweg",
    "pron": "dea shúl-vek",
    "es": "el camino al colegio",
    "type": "Sustantivo (Masc)",
    "category": "Orientierung",
    "level": "A1",
    "plural": "die Schulwege",
    "exampleSentenceDe": "Der Schulweg dauert zu Fuß zehn Minuten.",
    "exampleSentenceEs": "El camino a la escuela dura diez minutos a pie.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Schulweg",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dauert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zu Fuß zehn Minuten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Souvenir",
    "pron": "das zu-ve-nír",
    "es": "el recuerdo / suvenir",
    "type": "Sustantivo (Neutro)",
    "category": "Reisen",
    "level": "A2",
    "plural": "die Souvenirs",
    "en": "miniature landmark tower souvenir keychain and snowglobe",
    "exampleSentenceDe": "Aus Berlin bringen wir kleine Souvenirs mit.",
    "exampleSentenceEs": "De Berlín traemos pequeños recuerdos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Aus Berlin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bringen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir kleine Souvenirs",
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
    "de": "die Straßenbahn",
    "pron": "di shtrá-sen-ban",
    "es": "el tranvía",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A1–B1",
    "plural": "die Straßenbahnen",
    "en": "modern yellow city tram streetcar riding on rail tracks",
    "exampleSentenceDe": "Ich fahre jeden Tag mit der Straßenbahn ins Büro.",
    "exampleSentenceEs": "Voy todos los días en tranvía a la oficina.",
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
        "text": "jeden Tag mit der Straßenbahn ins Büro",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Strecke",
    "pron": "di shtré-ke",
    "es": "el trayecto / recorrido",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Strecken",
    "exampleSentenceDe": "Diese Strecke ist wegen Bauarbeiten gesperrt.",
    "exampleSentenceEs": "Este trayecto está cortado por obras.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Diese Strecke",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wegen Bauarbeiten",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gesperrt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Tal",
    "pron": "das tal",
    "es": "el valle",
    "type": "Sustantivo (Neutro)",
    "category": "Natur",
    "level": "B1",
    "plural": "die Täler",
    "en": "lush green alpine valley nestled between mountain slopes",
    "exampleSentenceDe": "Das kleine Dorf liegt tief unten im Tal.",
    "exampleSentenceEs": "El pueblito está situado abajo en el valle.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das kleine Dorf",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "tief unten im Tal",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Taxi",
    "pron": "das ták-si",
    "es": "el taxi",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehr",
    "level": "A1–B1",
    "plural": "die Taxis",
    "en": "cream-colored German taxi sedan car with glowing yellow roof sign",
    "exampleSentenceDe": "Wir nehmen ein Taxi direkt zum Bahnhof.",
    "exampleSentenceEs": "Tomamos un taxi directo a la estación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nehmen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Taxi direkt zum Bahnhof",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Tour",
    "pron": "di tur",
    "es": "la excursión / recorrido",
    "type": "Sustantivo (Fem)",
    "category": "Reisen",
    "level": "B1",
    "plural": "die Touren",
    "exampleSentenceDe": "Am Sonntag machen wir eine Fahrradtour am Fluss.",
    "exampleSentenceEs": "El domingo hacemos una ruta en bici junto al río.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Sonntag",
        "role": "subject",
        "order": 1
      },
      {
        "text": "machen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir eine Fahrradtour am Fluss",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Umwelt",
    "pron": "di úm-velt",
    "es": "el medio ambiente",
    "type": "Sustantivo (Fem)",
    "category": "Natur",
    "level": "A1",
    "regimen": "Singular",
    "exampleSentenceDe": "Bahnfahren ist besser für unsere Umwelt.",
    "exampleSentenceEs": "Viajar en tren es mejor para nuestro medio ambiente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bahnfahren",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "besser für unsere Umwelt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Unwetter",
    "pron": "das ún-ve-ta",
    "es": "el temporal / tormenta severa",
    "type": "Sustantivo (Neutro)",
    "category": "Wetter",
    "level": "B1",
    "plural": "die Unwetter",
    "en": "dark thundercloud with heavy rain and bright lightning bolts",
    "exampleSentenceDe": "Bei starkem Unwetter bleiben Sie besser zu Hause.",
    "exampleSentenceEs": "Con temporal fuerte mejor quédese en casa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei starkem Unwetter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bleiben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie besser zu Hause",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Verkehrsmittel",
    "pron": "das fea-kérs-mi-tel",
    "es": "el medio de transporte",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Verkehrsmittel",
    "en": "city bus, tram, and passenger train public transport vehicles",
    "exampleSentenceDe": "Welche öffentlichen Verkehrsmittel nutzen Sie?",
    "exampleSentenceEs": "¿Qué medios de transporte público utiliza usted?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welche öffentlichen Verkehrsmittel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nutzen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Abfahrt",
    "pron": "di áp-fart",
    "es": "la salida / partida",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Abfahrten",
    "exampleSentenceDe": "Die Abfahrt des Zuges ist pünktlich um acht Uhr.",
    "exampleSentenceEs": "La salida del tren es puntual a las ocho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Abfahrt des Zuges",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "pünktlich um acht Uhr",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Ausflug",
    "pron": "dea áus-fluk",
    "es": "la excursión / paseo",
    "type": "Sustantivo (Masc)",
    "category": "Reisen",
    "level": "A1–B1",
    "plural": "die Ausflüge",
    "exampleSentenceDe": "Am Wochenende machen wir einen Ausflug ans Meer.",
    "exampleSentenceEs": "El fin de semana hacemos una excursión al mar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Wochenende",
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
        "text": "einen Ausflug ans Meer",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Aussicht",
    "pron": "di áus-zijt",
    "es": "la vista / panorámica / perspectiva",
    "type": "Sustantivo (Fem)",
    "category": "Reisen",
    "level": "B1",
    "plural": "die Aussichten",
    "exampleSentenceDe": "Von diesem Turm hat man eine herrliche Aussicht.",
    "exampleSentenceEs": "Desde esta torre se tiene una vista magnífica.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Von diesem Turm",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine herrliche Aussicht",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Bahn",
    "pron": "di ban",
    "es": "el tren / ferrocarril",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A1–B1",
    "plural": "die Bahnen",
    "en": "modern red and white regional passenger train traveling along steel tracks",
    "exampleSentenceDe": "Ich fahre lieber mit der Bahn als mit dem Auto.",
    "exampleSentenceEs": "Prefiero viajar en tren que en coche.",
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
        "text": "lieber mit der Bahn als mit dem Auto",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Burg",
    "pron": "di burk",
    "es": "el castillo / fortaleza",
    "type": "Sustantivo (Fem)",
    "category": "Reisen",
    "level": "B1",
    "plural": "die Burgen",
    "en": "historic medieval stone hilltop castle fortress with round towers",
    "exampleSentenceDe": "Am Rhein kann man viele alte Burgen besichtigen.",
    "exampleSentenceEs": "Junto al Rin se pueden visitar muchos castillos antiguos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Rhein",
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
        "text": "viele alte Burgen",
        "role": "complement",
        "order": 4
      },
      {
        "text": "besichtigen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "entfernt",
    "pron": "ent-férnt",
    "es": "alejado / distante",
    "type": "Adjetivo",
    "category": "Orientierung",
    "level": "B1",
    "regimen": "von + Dativ",
    "exampleSentenceDe": "Das Hotel liegt nur hundert Meter vom Strand entfernt.",
    "exampleSentenceEs": "El hotel está a solo cien metros de distancia de la playa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Hotel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nur hundert Meter vom Strand entfernt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Fähre",
    "pron": "di fé-re",
    "es": "el transbordador / ferri",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Fähren",
    "en": "white and blue passenger and car ferry boat sailing across calm lake water",
    "exampleSentenceDe": "Wir nehmen die Fähre über den Bodensee.",
    "exampleSentenceEs": "Tomamos el ferri para cruzar el lago de Constanza.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nehmen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Fähre über den Bodensee",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Flughafen",
    "pron": "dea flúk-ja-fen",
    "es": "el aeropuerto",
    "type": "Sustantivo (Masc)",
    "category": "Reisen",
    "level": "A1–B1",
    "plural": "die Flughäfen",
    "en": "modern airport terminal building with control tower and parked passenger jet",
    "exampleSentenceDe": "Bitte kommen Sie zwei Stunden vor Abflug zum Flughafen.",
    "exampleSentenceEs": "Por favor, llegue al aeropuerto dos horas antes del vuelo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kommen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "zwei Stunden vor Abflug zum Flughafen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Flugzeug",
    "pron": "das flúk-tsoik",
    "es": "el avión",
    "type": "Sustantivo (Neutro)",
    "category": "Reisen",
    "level": "A1–B1",
    "plural": "die Flugzeuge",
    "en": "sleek white commercial passenger airplane flying smoothly through clear sky",
    "exampleSentenceDe": "Das Flugzeug ist pünktlich in München gelandet.",
    "exampleSentenceEs": "El avión ha aterrizado puntual en Múnich.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Flugzeug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "pünktlich in München",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gelandet",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Fluss",
    "pron": "dea flus",
    "es": "el río",
    "type": "Sustantivo (Masc)",
    "category": "Natur",
    "level": "A2–B1",
    "plural": "die Flüsse",
    "en": "winding blue river flowing gently between green grass banks",
    "exampleSentenceDe": "Dieser Fluss fließt direkt in die Nordsee.",
    "exampleSentenceEs": "Este río desemboca directamente en el mar del Norte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieser Fluss",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fließt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "direkt in die Nordsee",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Gebirge",
    "pron": "das gue-bír-gue",
    "es": "la cordillera / sierra",
    "type": "Sustantivo (Neutro)",
    "category": "Natur",
    "level": "B1",
    "plural": "die Gebirge",
    "en": "majestic alpine mountain range with rocky peaks and green pine forests",
    "exampleSentenceDe": "Im Urlaub wandern wir gern im Gebirge.",
    "exampleSentenceEs": "En vacaciones nos gusta hacer senderismo en la sierra.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Urlaub",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wandern",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "gern im Gebirge",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Gehsteig (D, A)",
    "pron": "dea gué-shtaik",
    "es": "la acera (CH: Trottoir)",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Gehsteige",
    "en": "clean paved gray stone pedestrian sidewalk beside an asphalt city street",
    "exampleSentenceDe": "Das Radfahren auf dem Gehsteig ist nicht erlaubt.",
    "exampleSentenceEs": "Circular en bicicleta por la acera no está permitido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das Radfahren auf dem Gehsteig",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nicht erlaubt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Grenze",
    "pron": "di grén-tse",
    "es": "la frontera / límite",
    "type": "Sustantivo (Fem)",
    "category": "Reisen",
    "level": "B1",
    "plural": "die Grenzen",
    "exampleSentenceDe": "An der Grenze muss man manchmal den Ausweis zeigen.",
    "exampleSentenceEs": "En la frontera a veces hay que mostrar el documento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An der Grenze",
        "role": "complement",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "manchmal den Ausweis",
        "role": "complement",
        "order": 4
      },
      {
        "text": "zeigen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "her|kommen",
    "pron": "jér-ko-men",
    "es": "venir (hacia aquí)",
    "type": "Verbo separable irr.",
    "category": "Verkehr",
    "level": "A2",
    "regimen": "kommt her, kam her, ist hergekommen",
    "exampleSentenceDe": "Bitte komm sofort her, wir müssen reden!",
    "exampleSentenceEs": "¡Por favor, ven inmediatamente aquí, tenemos que hablar!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "komm",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sofort",
        "role": "complement",
        "order": 3
      },
      {
        "text": "her,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 5
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "reden",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "die Hitze",
    "pron": "di jí-tse",
    "es": "el calor fuerte",
    "type": "Sustantivo (Fem)",
    "category": "Wetter",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Gestern Nachmittag war eine schreckliche Hitze!",
    "exampleSentenceEs": "¡Ayer por la tarde hizo un calor terrible!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Gestern Nachmittag",
        "role": "complement",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine schreckliche Hitze",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "das Klima",
    "pron": "das klí-ma",
    "es": "el clima",
    "type": "Sustantivo (Neutro)",
    "category": "Wetter",
    "level": "B1",
    "plural": "die Klimata / Klimate",
    "exampleSentenceDe": "Alle sagen, dass sich das Klima leider ändert.",
    "exampleSentenceEs": "Todos dicen que lamentablemente el clima está cambiando.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sagen,",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dass sich das Klima leider",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ändert",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "klettern",
    "pron": "klé-tern",
    "es": "escalar / trepar",
    "type": "Verbo regular",
    "category": "Natur",
    "level": "B1",
    "regimen": "klettert, kletterte, ist geklettert",
    "en": "child climbing up sturdy branches of a leafy green tree",
    "exampleSentenceDe": "Die Kinder sind ohne Erlaubnis auf den Baum geklettert.",
    "exampleSentenceEs": "Los niños han trepado al árbol sin permiso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Kinder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ohne Erlaubnis auf den Baum",
        "role": "complement",
        "order": 3
      },
      {
        "text": "geklettert",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Kreuzung",
    "pron": "di krói-tsung",
    "es": "el cruce / intersección",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Kreuzungen",
    "en": "four-way asphalt street intersection with white pedestrian crosswalk stripes",
    "exampleSentenceDe": "Fahren Sie an der nächsten Kreuzung nach rechts!",
    "exampleSentenceEs": "¡Gire a la derecha en el próximo cruce!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Fahren",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "an der nächsten Kreuzung nach rechts",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Norden",
    "pron": "dea nór-den",
    "es": "el norte",
    "type": "Sustantivo (Masc)",
    "category": "Natur",
    "level": "A1–B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Mein Dorf liegt ganz im Norden von Deutschland.",
    "exampleSentenceEs": "Mi pueblo está situado muy al norte de Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Dorf",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ganz im Norden von Deutschland",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Osten",
    "pron": "dea ós-ten",
    "es": "el este",
    "type": "Sustantivo (Masc)",
    "category": "Natur",
    "level": "A1–B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Die Fenster von unserem Zimmer gehen nach Osten.",
    "exampleSentenceEs": "Las ventanas de nuestra habitación dan al este.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Fenster von unserem Zimmer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nach Osten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Süden",
    "pron": "dea zǘ-den",
    "es": "el sur",
    "type": "Sustantivo (Masc)",
    "category": "Natur",
    "level": "A1–B1",
    "regimen": "Singular (Süd-)",
    "exampleSentenceDe": "Im Süden von Deutschland und in der Schweiz liegen die Alpen.",
    "exampleSentenceEs": "En el sur de Alemania y en Suiza se encuentran los Alpes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Süden von Deutschland und in der Schweiz",
        "role": "complement",
        "order": 1
      },
      {
        "text": "liegen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Alpen",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "südlich",
    "pron": "zǘt-lij",
    "es": "al sur (de)",
    "type": "Adjetivo",
    "category": "Natur",
    "level": "B1",
    "regimen": "+ von (Dativo)",
    "exampleSentenceDe": "Mein kleines Dorf liegt direkt südlich von München.",
    "exampleSentenceEs": "Mi pequeño pueblo está situado justo al sur de Múnich.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein kleines Dorf",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "direkt südlich von München",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Ufer",
    "pron": "das ú-fa",
    "es": "la orilla / ribera",
    "type": "Sustantivo (Neutro)",
    "category": "Natur",
    "level": "B1",
    "plural": "die Ufer",
    "en": "a cute 3D isometric UI icon of a peaceful green grassy lake shore beside calm blue water",
    "exampleSentenceDe": "Am Seeufer ist es im Sommer sehr schön spazieren zu gehen.",
    "exampleSentenceEs": "En la orilla del lago es muy bonito pasear en verano.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Seeufer",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es",
        "role": "subject",
        "order": 3
      },
      {
        "text": "im Sommer sehr schön",
        "role": "complement",
        "order": 4
      },
      {
        "text": "spazieren zu gehen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Wanderung",
    "pron": "di ván-de-rung",
    "es": "la excursión a pie / caminata",
    "type": "Sustantivo (Fem)",
    "category": "Natur",
    "level": "B1",
    "plural": "die Wanderungen",
    "exampleSentenceDe": "Wir haben in den Sommerferien eine wirklich schöne Wanderung gemacht.",
    "exampleSentenceEs": "En las vacaciones de verano hicimos una caminata realmente bonita.",
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
        "text": "in den Sommerferien eine wirklich schöne Wanderung",
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
    "de": "der Westen",
    "pron": "dea vés-ten",
    "es": "el oeste",
    "type": "Sustantivo (Masc)",
    "category": "Natur",
    "level": "A1–B1",
    "regimen": "Singular (West-)",
    "exampleSentenceDe": "Der Wind kommt heute sehr stark aus Westen.",
    "exampleSentenceEs": "El viento viene hoy muy fuerte del oeste.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Wind",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute sehr stark aus Westen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "westlich",
    "pron": "vést-lij",
    "es": "al oeste (de)",
    "type": "Adjetivo",
    "category": "Natur",
    "level": "B1",
    "regimen": "+ von (Dativo)",
    "exampleSentenceDe": "Das kleine Dorf liegt westlich von Frankfurt am Main.",
    "exampleSentenceEs": "El pueblito está situado al oeste de Fráncfort del Meno.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das kleine Dorf",
        "role": "subject",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "westlich von Frankfurt am Main",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Wetterbericht",
    "pron": "dea vé-ta-be-rijt",
    "es": "el parte meteorológico",
    "type": "Sustantivo (Masc)",
    "category": "Wetter",
    "level": "B1",
    "plural": "die Wetterberichte",
    "exampleSentenceDe": "Hast du morgens schon den aktuellen Wetterbericht im Radio gehört?",
    "exampleSentenceEs": "¿Has escuchado ya el parte meteorológico actual en la radio esta mañana?",
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
        "text": "morgens schon den aktuellen Wetterbericht im Radio",
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
    "de": "die Wettervorhersage",
    "pron": "di vé-ta-for-jea-za-gue",
    "es": "el pronóstico del tiempo",
    "type": "Sustantivo (Fem)",
    "category": "Wetter",
    "level": "B1",
    "plural": "die Wettervorhersagen",
    "exampleSentenceDe": "Die Wettervorhersage für morgen lautet: meistens trocken und sonnig.",
    "exampleSentenceEs": "El pronóstico del tiempo para mañana es: mayormente seco y soleado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Wettervorhersage für morgen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lautet:",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meistens trocken und sonnig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Zug",
    "pron": "dea tsuk",
    "es": "el tren",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "A1–B1",
    "plural": "die Züge",
    "en": "a cute 3D isometric UI icon of a sleek white and red modern passenger train",
    "exampleSentenceDe": "Unser Zug nach Hamburg hatte heute leider 40 Minuten Verspätung.",
    "exampleSentenceEs": "Nuestro tren a Hamburgo tuvo hoy lamentablemente 40 minutos de retraso.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unser Zug nach Hamburg",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hatte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute leider 40 Minuten Verspätung",
        "role": "complement",
        "order": 3
      }
    ]
  }
]
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
  },
  {
    "de": "das ABS",
    "pron": "das a-be-és",
    "es": "sistema antibloqueo (ABS)",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "regimen": "Sigla técnica",
    "exampleSentenceDe": "Jedes moderne Auto hat heute ABS.",
    "exampleSentenceEs": "Todo coche moderno tiene hoy sistema ABS.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Jedes moderne Auto",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute ABS",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Antenne",
    "pron": "di an-té-ne",
    "es": "la antena",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "A2",
    "plural": "die Antennen",
    "en": "a cute 3D isometric UI icon of a sleek black car roof radio antenna",
    "exampleSentenceDe": "Die Antenne befindet sich hinten auf dem Dach.",
    "exampleSentenceEs": "La antena se encuentra atrás sobre el techo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Antenne",
        "role": "subject",
        "order": 1
      },
      {
        "text": "befindet sich",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "hinten auf dem Dach",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Armaturenbrett",
    "pron": "das ar-ma-tú-ren-bret",
    "es": "el tablero / salpicadero",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Armaturenbretter",
    "en": "a cute 3D isometric UI icon of a modern car dashboard with speedometer dials",
    "exampleSentenceDe": "Auf dem Armaturenbrett leuchtet eine Warnlampe.",
    "exampleSentenceEs": "En el tablero se enciende una luz de advertencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dem Armaturenbrett",
        "role": "complement",
        "order": 1
      },
      {
        "text": "leuchtet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Warnlampe",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "die Autotür",
    "pron": "di áu-to-tür",
    "es": "la puerta del coche",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "A1–A2",
    "plural": "die Autotüren",
    "en": "a cute 3D isometric UI icon of a single open blue car door",
    "exampleSentenceDe": "Bitte schließen Sie die Autotür vor der Fahrt!",
    "exampleSentenceEs": "¡Por favor, cierre la puerta del coche antes de salir!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schließen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Autotür vor der Fahrt",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Bremsanlage",
    "pron": "di bréms-an-la-gue",
    "es": "el sistema de frenos",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Bremsanlagen",
    "en": "a cute 3D isometric UI icon of a metallic car disc brake rotor with red brake caliper",
    "exampleSentenceDe": "Die Werkstatt prüft heute die ganze Bremsanlage.",
    "exampleSentenceEs": "El taller revisa hoy todo el sistema de frenos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Werkstatt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "prüft",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute die ganze Bremsanlage",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Gebläse",
    "pron": "das gue-blé-ze",
    "es": "el ventilador / soplador",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Gebläse",
    "en": "a cute 3D isometric UI icon of a car ventilation blower fan unit",
    "exampleSentenceDe": "Im Winter macht das Gebläse die Scheibe frei.",
    "exampleSentenceEs": "En invierno el ventilador despeja el cristal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Winter",
        "role": "complement",
        "order": 1
      },
      {
        "text": "macht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Gebläse",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Scheibe frei",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Geländewagen",
    "pron": "dea gue-lén-de-va-guen",
    "es": "el todoterreno / camioneta SUV",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "A2",
    "plural": "die Geländewagen",
    "en": "a cute 3D isometric UI icon of a rugged green SUV off-road vehicle",
    "exampleSentenceDe": "Auf Waldwegen fährt ein Geländewagen besser.",
    "exampleSentenceEs": "Por caminos forestales un todoterreno circula mejor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf Waldwegen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Geländewagen",
        "role": "subject",
        "order": 3
      },
      {
        "text": "besser",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Heckscheibe",
    "pron": "di jék-shai-be",
    "es": "la luneta trasera",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Heckscheiben",
    "en": "a cute 3D isometric UI icon of a car rear windshield glass panel with defroster lines",
    "exampleSentenceDe": "Im Winter ist die Heckscheibe oft gefroren.",
    "exampleSentenceEs": "En invierno la luneta trasera suele estar helada.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Winter",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Heckscheibe",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft gefroren",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Hinterrad",
    "pron": "das jín-ta-rat",
    "es": "la rueda trasera",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Hinterräder",
    "en": "a cute 3D isometric UI icon of a black car rear tire and alloy wheel",
    "exampleSentenceDe": "Das rechte Hinterrad verliert etwas Luft.",
    "exampleSentenceEs": "La rueda trasera derecha pierde algo de aire.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das rechte Hinterrad",
        "role": "subject",
        "order": 1
      },
      {
        "text": "verliert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "etwas Luft",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Kfz (Kraftfahrzeug)",
    "pron": "das ka-ef-tsét",
    "es": "el vehículo motorizado",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Kfz",
    "exampleSentenceDe": "Die Kfz-Versicherung ist in Deutschland Pflicht.",
    "exampleSentenceEs": "El seguro del vehículo es obligatorio en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Kfz-Versicherung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Deutschland Pflicht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kofferraum",
    "pron": "dea kó-fa-raum",
    "es": "el maletero / baúl",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "A2–B1",
    "plural": "die Kofferräume",
    "en": "a cute 3D isometric UI icon of an open car rear trunk showing storage space",
    "exampleSentenceDe": "Die Koffer legen wir in den Kofferraum.",
    "exampleSentenceEs": "Ponemos las maletas en el maletero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Koffer",
        "role": "complement",
        "order": 1
      },
      {
        "text": "legen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in den Kofferraum",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Kopfstütze",
    "pron": "di kóp-shtü-tse",
    "es": "el reposacabezas",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Kopfstützen",
    "en": "a cute 3D isometric UI icon of a padded black car seat headrest",
    "exampleSentenceDe": "Stellen Sie die Kopfstütze auf Ihre Größe ein!",
    "exampleSentenceEs": "¡Ajuste el reposacabezas a su estatura!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Stellen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "die Kopfstütze auf Ihre Größe",
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
    "de": "der Kotflügel",
    "pron": "dea kót-flü-guel",
    "es": "el guardabarros / aleta",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Kotflügel",
    "en": "a cute 3D isometric UI icon of a curved silver car front fender panel",
    "exampleSentenceDe": "Nach dem Parkunfall hat der Kotflügel einen Kratzer.",
    "exampleSentenceEs": "Tras el golpe al aparcar el guardabarros tiene un arañazo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Parkunfall",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Kotflügel",
        "role": "subject",
        "order": 3
      },
      {
        "text": "einen Kratzer",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Kühlergrill",
    "pron": "dea kǘ-la-gril",
    "es": "la parrilla del radiador",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Kühlergrills",
    "en": "a cute 3D isometric UI icon of a chrome front car radiator grille",
    "exampleSentenceDe": "Vorne am Auto sitzt der Kühlergrill.",
    "exampleSentenceEs": "Delante del coche está situada la parrilla del radiador.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vorne am Auto",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sitzt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Kühlergrill",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "das Kühlmittel",
    "pron": "das kǘl-mi-tel",
    "es": "el líquido refrigerante",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Kühlmittel",
    "en": "a cute 3D isometric UI icon of a plastic bottle of bright pink engine coolant liquid",
    "exampleSentenceDe": "Vor einer langen Fahrt prüfe ich das Kühlmittel.",
    "exampleSentenceEs": "Antes de un viaje largo reviso el refrigerante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vor einer langen Fahrt",
        "role": "complement",
        "order": 1
      },
      {
        "text": "prüfe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "das Kühlmittel",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Laster",
    "pron": "dea lás-ta",
    "es": "el camión (coloquial)",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Laster",
    "en": "a cute 3D isometric UI icon of a large white cargo freight truck",
    "exampleSentenceDe": "Auf der rechten Spur fahren viele Laster.",
    "exampleSentenceEs": "Por el carril derecho circulan muchos camiones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der rechten Spur",
        "role": "complement",
        "order": 1
      },
      {
        "text": "fahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele Laster",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "das Moped",
    "pron": "das mó-pet",
    "es": "el ciclomotor",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Mopeds",
    "en": "a cute 3D isometric UI icon of a compact red city moped scooter",
    "exampleSentenceDe": "Jugendliche dürfen ab 15 Jahren ein Moped fahren.",
    "exampleSentenceEs": "Los jóvenes pueden conducir ciclomotor desde los 15 años.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Jugendliche",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dürfen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ab 15 Jahren ein Moped",
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
    "de": "das Motorrad",
    "pron": "das mo-tór-rat",
    "es": "la motocicleta",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "A2–B1",
    "plural": "die Motorräder",
    "en": "a cute 3D isometric UI icon of a sporty red motorcycle",
    "exampleSentenceDe": "Zum Fahren eines Motorrads braucht man einen Helm.",
    "exampleSentenceEs": "Para conducir una moto se necesita casco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zum Fahren eines Motorrads",
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
        "text": "einen Helm",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Pedal",
    "pron": "das pe-dál",
    "es": "el pedal",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "A2–B1",
    "plural": "die Pedale",
    "en": "a cute 3D isometric UI icon of three metallic car foot pedals",
    "exampleSentenceDe": "Ein Schaltwagen hat unten drei Pedale.",
    "exampleSentenceEs": "Un coche manual tiene abajo tres pedales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ein Schaltwagen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "unten drei Pedale",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Radkappe",
    "pron": "di rát-ka-pe",
    "es": "el tapacubos",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Radkappen",
    "en": "a cute 3D isometric UI icon of a silver plastic car wheel hubcap cover",
    "exampleSentenceDe": "Eine Radkappe schützt die Stahlfelge.",
    "exampleSentenceEs": "Un tapacubos protege la llanta de acero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Eine Radkappe",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schützt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Stahlfelge",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Rücklicht",
    "pron": "das rǘk-lijt",
    "es": "la luz trasera",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Rücklichter",
    "en": "a cute 3D isometric UI icon of a glowing red car rear taillight assembly",
    "exampleSentenceDe": "Das linke Rücklicht funktioniert heute nicht.",
    "exampleSentenceEs": "La luz trasera izquierda no funciona hoy.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das linke Rücklicht",
        "role": "subject",
        "order": 1
      },
      {
        "text": "funktioniert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute nicht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Rückstrahler",
    "pron": "dea rǘk-shtra-la",
    "es": "el reflector / catadióptrico",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Rückstrahler",
    "en": "a cute 3D isometric UI icon of a red rectangular rear safety reflector",
    "exampleSentenceDe": "Hinten am Fahrzeug müssen zwei Rückstrahler sein.",
    "exampleSentenceEs": "Atrás en el vehículo debe haber dos reflectores.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hinten am Fahrzeug",
        "role": "complement",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zwei Rückstrahler",
        "role": "subject",
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
    "de": "die Scheibenwaschflüssigkeit",
    "pron": "di shái-ben-vash-flü-sij-kait",
    "es": "el líquido limpiaparabrisas",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "B1",
    "regimen": "Singular",
    "en": "a cute 3D isometric UI icon of a translucent jug filled with blue windshield washer fluid",
    "exampleSentenceDe": "Im Winter braucht die Scheibenwaschflüssigkeit Frostschutz.",
    "exampleSentenceEs": "En invierno el limpiaparabrisas necesita anticongelante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Winter",
        "role": "complement",
        "order": 1
      },
      {
        "text": "braucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Scheibenwaschflüssigkeit",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Frostschutz",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Scheinwerfer",
    "pron": "dea sháin-ver-fa",
    "es": "el faro delantero",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Scheinwerfer",
    "en": "a cute 3D isometric UI icon of a glowing white car front headlight beam",
    "exampleSentenceDe": "Im Tunnel muss man die Scheinwerfer einschalten.",
    "exampleSentenceEs": "En el túnel hay que encender los faros delanteros.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Tunnel",
        "role": "complement",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Scheinwerfer",
        "role": "complement",
        "order": 4
      },
      {
        "text": "einschalten",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "das Seitenfenster",
    "pron": "das záiten-fens-ta",
    "es": "la ventanilla lateral",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "A2–B1",
    "plural": "die Seitenfenster",
    "en": "a cute 3D isometric UI icon of a half-open car side glass window",
    "exampleSentenceDe": "Öffnen Sie bitte das Seitenfenster an der Mautstelle.",
    "exampleSentenceEs": "Por favor, abra la ventanilla lateral en el peaje.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Öffnen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte das Seitenfenster an der Mautstelle",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Seitenspiegel",
    "pron": "dea záiten-shpi-guel",
    "es": "el espejo retrovisor lateral",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Seitenspiegel",
    "en": "a cute 3D isometric UI icon of a car exterior side rearview mirror",
    "exampleSentenceDe": "Vor dem Abbiegen schaue ich in den Seitenspiegel.",
    "exampleSentenceEs": "Antes de girar miro por el espejo lateral.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vor dem Abbiegen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schaue",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in den Seitenspiegel",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Sitz",
    "pron": "dea zits",
    "es": "el asiento",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "A2–B1",
    "plural": "die Sitze",
    "en": "a cute 3D isometric UI icon of an ergonomic car driver seat",
    "exampleSentenceDe": "Stellen Sie Ihren Sitz vor der Fahrt richtig ein!",
    "exampleSentenceEs": "¡Ajuste bien su asiento antes de conducir!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Stellen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "Ihren Sitz vor der Fahrt richtig",
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
    "de": "die Sonnenblende",
    "pron": "di zó-nen-blen-de",
    "es": "el parasol / visera",
    "type": "Sustantivo (Fem)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Sonnenblenden",
    "en": "a cute 3D isometric UI icon of a flipped-down car interior sun visor",
    "exampleSentenceDe": "Bei tiefer Sonne klappe ich die Sonnenblende herunter.",
    "exampleSentenceEs": "Con sol bajo abato el parasol.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei tiefer Sonne",
        "role": "complement",
        "order": 1
      },
      {
        "text": "klappe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Sonnenblende",
        "role": "complement",
        "order": 4
      },
      {
        "text": "herunter",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der Tankdeckel",
    "pron": "dea tánk-de-kel",
    "es": "la tapa del depósito",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Tankdeckel",
    "en": "a cute 3D isometric UI icon of a black threaded car fuel tank filler cap",
    "exampleSentenceDe": "Vergessen Sie nach dem Tanken den Tankdeckel nicht!",
    "exampleSentenceEs": "¡No olvide la tapa del tanque después de repostar!",
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
        "text": "nach dem Tanken den Tankdeckel nicht",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Transporter",
    "pron": "dea trans-pór-ta",
    "es": "la furgoneta",
    "type": "Sustantivo (Masc)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Transporter",
    "en": "a cute 3D isometric UI icon of a white commercial cargo delivery van",
    "exampleSentenceDe": "Für den Umzug mieten wir einen großen Transporter.",
    "exampleSentenceEs": "Para la mudanza alquilamos una furgoneta grande.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für den Umzug",
        "role": "complement",
        "order": 1
      },
      {
        "text": "mieten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "einen großen Transporter",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Türschloss",
    "pron": "das tǘr-shlos",
    "es": "la cerradura de la puerta",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Türschlösser",
    "en": "a cute 3D isometric UI icon of a metallic car door keyhole lock cylinder",
    "exampleSentenceDe": "Bei Frost kann das Türschloss manchmal einfrieren.",
    "exampleSentenceEs": "Con heladas la cerradura puede congelarse a veces.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei Frost",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Türschloss",
        "role": "subject",
        "order": 3
      },
      {
        "text": "manchmal",
        "role": "complement",
        "order": 4
      },
      {
        "text": "einfrieren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "das Vorderrad",
    "pron": "das fór-da-rat",
    "es": "la rueda delantera",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Vorderräder",
    "en": "a cute 3D isometric UI icon of a turned car front wheel and brake rotor",
    "exampleSentenceDe": "Die Vorderräder tragen das Gewicht des Motors.",
    "exampleSentenceEs": "Las ruedas delanteras soportan el peso del motor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Vorderräder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "tragen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Gewicht des Motors",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Zündschloss",
    "pron": "das tsǘnt-shlos",
    "es": "el bombín de encendido",
    "type": "Sustantivo (Neutro)",
    "category": "Teile des Autos",
    "level": "B1",
    "plural": "die Zündschlösser",
    "en": "a cute 3D isometric UI icon of a car ignition switch cylinder with an inserted key",
    "exampleSentenceDe": "Stecken Sie den Schlüssel in das Zündschloss.",
    "exampleSentenceEs": "Introduzca la llave en el interruptor de encendido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Stecken",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "den Schlüssel in das Zündschloss",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Nebelscheinwerfer",
    "pron": "dea né-bel-shain-ver-fa",
    "es": "el faro antiniebla delantero",
    "type": "Sustantivo (Masc)",
    "category": "Autolichter",
    "level": "B1",
    "plural": "die Nebelscheinwerfer",
    "en": "a cute 3D isometric UI icon of a bright yellow front car fog lamp",
    "exampleSentenceDe": "Bei dichtem Nebel schalte ich die Nebelscheinwerfer ein.",
    "exampleSentenceEs": "Con niebla densa enciendo los antinieblas delanteros.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei dichtem Nebel",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schalte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Nebelscheinwerfer",
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
    "de": "das Rückfahrlicht",
    "pron": "das rǘk-far-lijt",
    "es": "la luz de marcha atrás",
    "type": "Sustantivo (Neutro)",
    "category": "Autolichter",
    "level": "B1",
    "plural": "die Rückfahrlichter",
    "en": "a cute 3D isometric UI icon of a glowing white rear reversing light on a car tail",
    "exampleSentenceDe": "Beim Einlegen des Rückwärtsgangs geht das Rückfahrlicht an.",
    "exampleSentenceEs": "Al meter marcha atrás se enciende la luz de reversa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Beim Einlegen des Rückwärtsgangs",
        "role": "complement",
        "order": 1
      },
      {
        "text": "geht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Rückfahrlicht",
        "role": "subject",
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
    "de": "das Standlicht",
    "pron": "das shtánt-lijt",
    "es": "la luz de posición",
    "type": "Sustantivo (Neutro)",
    "category": "Autolichter",
    "level": "B1",
    "plural": "die Standlichter",
    "en": "a cute 3D isometric UI icon of small soft-glowing car parking side lights",
    "exampleSentenceDe": "Im Dunkeln darf man außerorts nicht nur mit Standlicht fahren.",
    "exampleSentenceEs": "A oscuras fuera de poblado no se puede ir solo con luz de posición.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Dunkeln",
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
        "text": "außerorts nicht nur mit Standlicht",
        "role": "complement",
        "order": 4
      },
      {
        "text": "fahren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "ab|stellen",
    "pron": "áp-shte-len",
    "es": "estacionar / apagar (motor)",
    "type": "Verbo separable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "+ Akk / stellt ab, stellte ab, hat abgestellt",
    "en": "driver turning ignition key off to stop a car engine in traffic",
    "exampleSentenceDe": "Bitte stellen Sie den Motor im Stau ab.",
    "exampleSentenceEs": "Por favor, apague el motor en el atasco.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "stellen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Motor im Stau",
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
    "de": "an|fahren",
    "pron": "án-fa-ren",
    "es": "arrancar / ponerse en marcha",
    "type": "Verbo separable irr.",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "fährt an, fuhr an, ist angefahren",
    "en": "car starting to move uphill from a stationary stop",
    "exampleSentenceDe": "Am Berg muss man vorsichtig anfahren.",
    "exampleSentenceEs": "En cuesta hay que arrancar con cuidado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Berg",
        "role": "complement",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "vorsichtig",
        "role": "complement",
        "order": 4
      },
      {
        "text": "anfahren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "aus|rutschen",
    "pron": "áus-ru-chen",
    "es": "resbalar / derrapar",
    "type": "Verbo separable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "rutscht aus, rutschte aus, ist ausgerutscht",
    "en": "car skidding sideways on a slick icy road",
    "exampleSentenceDe": "Auf dem Eis kann das Auto schnell ausrutschen.",
    "exampleSentenceEs": "Sobre el hielo el coche puede derrapar rápido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dem Eis",
        "role": "complement",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Auto",
        "role": "subject",
        "order": 3
      },
      {
        "text": "schnell",
        "role": "complement",
        "order": 4
      },
      {
        "text": "ausrutschen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "aus|weichen",
    "pron": "áus-vai-jen",
    "es": "esquivar / ceder el paso",
    "type": "Verbo separable irr.",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "+ Dativ / weicht aus, wich aus, ist ausgewichen",
    "en": "car swerving smoothly around an obstacle cone on asphalt",
    "exampleSentenceDe": "Der Fahrer musste einem Hindernis ausweichen.",
    "exampleSentenceEs": "El conductor tuvo que esquivar un obstáculo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Fahrer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "musste",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "einem Hindernis",
        "role": "complement",
        "order": 3
      },
      {
        "text": "ausweichen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "beschädigen",
    "pron": "be-shé-di-guen",
    "es": "dañar / averiar",
    "type": "Verbo inseparable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "+ Akk / beschädigt, hat beschädigt",
    "en": "falling hailstones denting the hood of a parked car",
    "exampleSentenceDe": "Der Hagel hat mehrere Autos schwer beschädigt.",
    "exampleSentenceEs": "El granizo ha dañado gravemente varios coches.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Hagel",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mehrere Autos schwer",
        "role": "complement",
        "order": 3
      },
      {
        "text": "beschädigt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "einen Gang ein|legen",
    "pron": "ái-nen gang áin-le-guen",
    "es": "meter una marcha / cambio",
    "type": "Frase verbal",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "+ Akk / legt ein, legte ein, hat eingelegt",
    "en": "hand shifting a manual car gearstick into first gear",
    "exampleSentenceDe": "Vor dem Losfahren legen Sie den ersten Gang ein.",
    "exampleSentenceEs": "Antes de arrancar meta la primera marcha.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vor dem Losfahren",
        "role": "complement",
        "order": 1
      },
      {
        "text": "legen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den ersten Gang",
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
    "de": "ein|parken",
    "pron": "áin-par-ken",
    "es": "aparcar / estacionar (en hueco)",
    "type": "Verbo separable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "parkt ein, parkte ein, hat eingeparkt",
    "en": "car reversing smoothly into a parallel parking space",
    "exampleSentenceDe": "In der Fahrprüfung müssen Sie rückwärts einparken.",
    "exampleSentenceEs": "En el examen práctico tiene que aparcar marcha atrás.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Fahrprüfung",
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
        "text": "rückwärts",
        "role": "complement",
        "order": 4
      },
      {
        "text": "einparken",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "los|fahren",
    "pron": "lós-fa-ren",
    "es": "partir / arrancar",
    "type": "Verbo separable irr.",
    "category": "Aktionen",
    "level": "A2–B1",
    "regimen": "fährt los, fuhr los, ist losgefahren",
    "en": "car pulling out and driving off down an open road",
    "exampleSentenceDe": "Wann fahren wir morgen früh los?",
    "exampleSentenceEs": "¿A qué hora salimos mañana temprano?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wann",
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
        "text": "morgen früh",
        "role": "complement",
        "order": 4
      },
      {
        "text": "los",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "parkieren (CH)",
    "pron": "par-kí-ren",
    "es": "aparcar (variante suiza)",
    "type": "Verbo (-ieren)",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "parkiert, parkierte, hat parkiert",
    "en": "car parked neatly inside a marked parking bay",
    "exampleSentenceDe": "In Zürich darf man hier eine Stunde parkieren.",
    "exampleSentenceEs": "En Zúrich se permite aparcar aquí una hora.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Zürich",
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
        "text": "hier eine Stunde",
        "role": "complement",
        "order": 4
      },
      {
        "text": "parkieren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "pendeln",
    "pron": "pén-deln",
    "es": "desplazarse a diario al trabajo",
    "type": "Verbo regular",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "zwischen + Dat / pendelt, hat gependelt",
    "en": "commuter driving back and forth between home and city workplace",
    "exampleSentenceDe": "Viele Menschen pendeln jeden Tag nach Frankfurt.",
    "exampleSentenceEs": "Muchas personas viajan a diario a trabajar a Fráncfort.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Menschen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "pendeln",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "jeden Tag nach Frankfurt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Rücksicht nehmen",
    "pron": "rǘk-zijt ne-men",
    "es": "tener consideración / respeto",
    "type": "Frase verbal",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "auf + Akk / nimmt, nahm, hat genommen",
    "exampleSentenceDe": "Auf der Straße muss man Rücksicht auf Radfahrer nehmen.",
    "exampleSentenceEs": "En la calle hay que tener consideración con los ciclistas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der Straße",
        "role": "complement",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Rücksicht auf Radfahrer",
        "role": "complement",
        "order": 4
      },
      {
        "text": "nehmen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "sperren",
    "pron": "shpé-ren",
    "es": "cortar / bloquear (una vía)",
    "type": "Verbo regular",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "+ Akk / sperrt, sperrte, hat gesperrt",
    "en": "placing red and white traffic barriers across a highway lane",
    "exampleSentenceDe": "Die Polizei musste die Autobahn nach dem Unfall sperren.",
    "exampleSentenceEs": "La policía tuvo que cortar la autopista tras el accidente.",
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
        "text": "die Autobahn nach dem Unfall",
        "role": "complement",
        "order": 3
      },
      {
        "text": "sperren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "statt|finden",
    "pron": "shtát-fin-den",
    "es": "tener lugar / celebrarse",
    "type": "Verbo separable irr.",
    "category": "Aktionen",
    "level": "A2–B1",
    "regimen": "findet statt, fand statt, hat stattgefunden",
    "exampleSentenceDe": "Die Fahrprüfung findet am Donnerstag statt.",
    "exampleSentenceEs": "El examen de conducción tiene lugar el jueves.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Fahrprüfung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "findet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Donnerstag",
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
    "de": "stehen bleiben",
    "pron": "shté-en blai-ben",
    "es": "detenerse / quedarse parado",
    "type": "Frase verbal irr.",
    "category": "Aktionen",
    "level": "A2–B1",
    "regimen": "bleibt stehen, blieb stehen, ist stehen geblieben",
    "en": "cars coming to a complete stop behind a red traffic light",
    "exampleSentenceDe": "Bei roter Ampel müssen alle Autos stehen bleiben.",
    "exampleSentenceEs": "Con semáforo en rojo todos los coches deben detenerse.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei roter Ampel",
        "role": "complement",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle Autos",
        "role": "subject",
        "order": 3
      },
      {
        "text": "stehen bleiben",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "tanken",
    "pron": "tán-ken",
    "es": "repostar / echar gasolina",
    "type": "Verbo regular",
    "category": "Aktionen",
    "level": "A2–B1",
    "regimen": "+ Akk / tankt, tankte, hat getankt",
    "en": "person holding a gas pump nozzle refueling a car at a fuel station",
    "exampleSentenceDe": "Ich muss heute noch Super-Benzin tanken.",
    "exampleSentenceEs": "Hoy todavía tengo que repostar gasolina súper.",
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
        "text": "heute noch Super-Benzin",
        "role": "complement",
        "order": 3
      },
      {
        "text": "tanken",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "um|kehren",
    "pron": "úm-ke-ren",
    "es": "dar la vuelta / cambiar sentido",
    "type": "Verbo separable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "kehrt um, kehrte um, ist umgekehrt",
    "en": "car making a U-turn on a street before a dead-end sign",
    "exampleSentenceDe": "Hier ist eine Sackgasse, wir müssen umkehren.",
    "exampleSentenceEs": "Aquí es calle sin salida, debemos dar la vuelta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hier ist eine Sackgasse,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 2
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "umkehren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verkehren",
    "pron": "fea-ké-ren",
    "es": "circular (transporte regular)",
    "type": "Verbo inseparable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "verkehrt, verkehrte, hat verkehrt",
    "exampleSentenceDe": "Die Züge verkehren heute nur jede Stunde.",
    "exampleSentenceEs": "Los trenes circulan hoy solo cada hora.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Züge",
        "role": "subject",
        "order": 1
      },
      {
        "text": "verkehren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute nur jede Stunde",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "verunglücken",
    "pron": "fea-ún-glü-ken",
    "es": "sufrir un accidente",
    "type": "Verbo inseparable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "verunglückt, verunglückte, ist verunglückt",
    "en": "truck stopped askew on a slippery road with hazard lights flashing",
    "exampleSentenceDe": "Auf der glatten Straße ist ein Lkw verunglückt.",
    "exampleSentenceEs": "En la carretera resbaladiza se accidentó un camión.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der glatten Straße",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Lkw",
        "role": "subject",
        "order": 3
      },
      {
        "text": "verunglückt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "verursachen",
    "pron": "fea-úr-za-jen",
    "es": "causar / provocar",
    "type": "Verbo inseparable",
    "category": "Aktionen",
    "level": "B1",
    "regimen": "+ Akk / verursacht, hat verursacht",
    "exampleSentenceDe": "Zu hohe Geschwindigkeit verursacht oft schwere Unfälle.",
    "exampleSentenceEs": "La velocidad excesiva suele causar accidentes graves.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zu hohe Geschwindigkeit",
        "role": "subject",
        "order": 1
      },
      {
        "text": "verursacht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "oft schwere Unfälle",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Abgas / die Abgase",
    "pron": "das áp-gas / di áp-ga-ze",
    "es": "el gas de escape / emisiones",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Abgase",
    "en": "a cute 3D isometric UI icon of a car tailpipe puffing grey exhaust smoke",
    "exampleSentenceDe": "Alte Dieselmotoren produzieren viele Abgase.",
    "exampleSentenceEs": "Los motores diésel antiguos producen muchas emisiones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alte Dieselmotoren",
        "role": "subject",
        "order": 1
      },
      {
        "text": "produzieren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele Abgase",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Airbag-Störung",
    "pron": "di ér-bek-shtö-rung",
    "es": "el fallo del airbag",
    "type": "Sustantivo (Fem)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Airbag-Störungen",
    "en": "a cute 3D isometric UI icon of a glowing red car dashboard airbag warning symbol",
    "exampleSentenceDe": "Bei einer Airbag-Störung leuchtet ein rotes Symbol.",
    "exampleSentenceEs": "Con un fallo del airbag se enciende un símbolo rojo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei einer Airbag-Störung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "leuchtet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein rotes Symbol",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "der Batterieladezustand",
    "pron": "dea ba-te-rí-la-de-tsu-shtant",
    "es": "el estado de carga de la batería",
    "type": "Sustantivo (Masc)",
    "category": "Dashboard",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Die Kontrollleuchte zeigt den Batterieladezustand an.",
    "exampleSentenceEs": "El testigo indica el estado de carga de la batería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Kontrollleuchte",
        "role": "subject",
        "order": 1
      },
      {
        "text": "zeigt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Batterieladezustand",
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
    "de": "beleuchtet",
    "pron": "be-lóij-tet",
    "es": "iluminado",
    "type": "Participio / Adjetivo",
    "category": "Verkehr",
    "level": "B1",
    "regimen": "Antónimo: unbeleuchtet",
    "exampleSentenceDe": "Im Winter sind die Straßen oft schlecht beleuchtet.",
    "exampleSentenceEs": "En invierno las calles suelen estar mal iluminadas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Winter",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Straßen",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft schlecht beleuchtet",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Beschädigung",
    "pron": "di be-shé-di-gung",
    "es": "el daño / desperfecto",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Beschädigungen",
    "exampleSentenceDe": "Wir melden die Beschädigung der Versicherung.",
    "exampleSentenceEs": "Comunicamos el daño al seguro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "melden",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Beschädigung der Versicherung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Bremsbeläge",
    "pron": "di bréms-be-le-gue",
    "es": "las pastillas de freno",
    "type": "Sustantivo (Plural)",
    "category": "Dashboard",
    "level": "B1",
    "regimen": "Sg: der Bremsbelag",
    "plural": "die Bremsbeläge",
    "en": "a cute 3D isometric UI icon of a pair of thick automotive disc brake pads",
    "exampleSentenceDe": "Die Bremsbeläge müssen bald gewechselt werden.",
    "exampleSentenceEs": "Las pastillas de freno deben cambiarse pronto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Bremsbeläge",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "bald gewechselt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "werden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die durchgezogene Linie",
    "pron": "di dúrj-gue-tso-gue-ne lí-nie",
    "es": "la línea continua",
    "type": "Frase nominal (Fem)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die durchgezogenen Linien",
    "en": "a cute 3D isometric UI icon of a dark asphalt road with a solid unbroken white centerline",
    "exampleSentenceDe": "Eine durchgezogene Linie darf man nicht überfahren.",
    "exampleSentenceEs": "No está permitido cruzar una línea continua.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Eine durchgezogene Linie",
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
        "text": "nicht",
        "role": "complement",
        "order": 4
      },
      {
        "text": "überfahren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "das Dreieck",
    "pron": "das drái-ek",
    "es": "el triángulo (de emergencia/señal)",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehrsregeln",
    "level": "A2–B1",
    "plural": "die Dreiecke",
    "en": "a cute 3D isometric UI icon of a red reflective roadside warning triangle stand",
    "exampleSentenceDe": "Bei einer Panne stellen Sie das Warndreieck auf.",
    "exampleSentenceEs": "En una avería coloque el triángulo de emergencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei einer Panne",
        "role": "complement",
        "order": 1
      },
      {
        "text": "stellen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "das Warndreieck",
        "role": "complement",
        "order": 4
      },
      {
        "text": "auf",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Einfahrt",
    "pron": "di áin-fart",
    "es": "la entrada (vehicular) / acceso",
    "type": "Sustantivo (Fem)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Einfahrten",
    "en": "a cute 3D isometric UI icon of a paved driveway entrance gate with curb ramp",
    "exampleSentenceDe": "Bitte halten Sie die Einfahrt für die Feuerwehr frei!",
    "exampleSentenceEs": "¡Por favor, deje libre la entrada para los bomberos!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "halten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Einfahrt für die Feuerwehr",
        "role": "complement",
        "order": 4
      },
      {
        "text": "frei",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die ESP-Leuchte",
    "pron": "di e-es-pé-lóij-te",
    "es": "el testigo del control de estabilidad",
    "type": "Sustantivo (Fem)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die ESP-Leuchten",
    "en": "a cute 3D isometric UI icon of a glowing amber dashboard skidding car ESP warning light",
    "exampleSentenceDe": "Bei Glätte blinkt die gelbe ESP-Leuchte.",
    "exampleSentenceEs": "Con suelo resbaladizo parpadea el testigo amarillo del ESP.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei Glätte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "blinkt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die gelbe ESP-Leuchte",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "die Fahrbahn / Gegenfahrbahn",
    "pron": "di fár-ban",
    "es": "la calzada / carril contrario",
    "type": "Sustantivo (Fem)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Fahrbahnen",
    "en": "a cute 3D isometric UI icon of a two-lane asphalt roadway showing opposing lanes",
    "exampleSentenceDe": "Überholen Sie nie ohne freie Sicht auf die Gegenfahrbahn!",
    "exampleSentenceEs": "¡Nunca adelante sin visibilidad libre de la vía contraria!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Überholen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "nie ohne freie Sicht auf die Gegenfahrbahn",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Fahrgemeinschaft",
    "pron": "di fár-gue-main-shaft",
    "es": "el viaje en coche compartido",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Fahrgemeinschaften",
    "exampleSentenceDe": "Drei Kollegen bilden eine Fahrgemeinschaft zur Arbeit.",
    "exampleSentenceEs": "Tres compañeros forman un grupo de coche compartido al trabajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Drei Kollegen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bilden",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Fahrgemeinschaft zur Arbeit",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Fahrstunde",
    "pron": "di fár-shtun-de",
    "es": "la clase práctica de conducir",
    "type": "Sustantivo (Fem)",
    "category": "Fahrschule",
    "level": "A2–B1",
    "plural": "die Fahrstunden",
    "exampleSentenceDe": "Heute habe ich meine zehnte Fahrstunde.",
    "exampleSentenceEs": "Hoy tengo mi décima clase de conducción.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Heute",
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
        "text": "meine zehnte Fahrstunde",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Fahrzeugschein",
    "pron": "dea fár-tsoik-shain",
    "es": "el permiso de circulación",
    "type": "Sustantivo (Masc)",
    "category": "Fahrschule",
    "level": "B1",
    "plural": "die Fahrzeugscheine",
    "en": "a cute 3D isometric UI icon of a folded green official vehicle registration document",
    "exampleSentenceDe": "Bei einer Kontrolle brauchen Sie Führerschein und Fahrzeugschein.",
    "exampleSentenceEs": "En un control necesita el carné y el permiso de circulación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei einer Kontrolle",
        "role": "complement",
        "order": 1
      },
      {
        "text": "brauchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Führerschein und Fahrzeugschein",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Front-/Heckscheibenheizung",
    "pron": "di frónt-shai-ben-jai-tsung",
    "es": "la calefacción de lunas",
    "type": "Sustantivo (Fem)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Front- / Heckscheibenheizungen",
    "en": "a cute 3D isometric UI icon of a car dashboard defroster button with heated window waves",
    "exampleSentenceDe": "Die Heckscheibenheizung trocknet das Glas schnell.",
    "exampleSentenceEs": "La luneta térmica trasera seca rápido el cristal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Heckscheibenheizung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "trocknet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Glas schnell",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Gänge",
    "pron": "di guén-gue",
    "es": "las marchas / velocidades",
    "type": "Sustantivo (Plural)",
    "category": "Teile des Autos",
    "level": "B1",
    "regimen": "Sg: der Gang",
    "plural": "die Gänge",
    "en": "a cute 3D isometric UI icon of a car manual gearshift knob showing gear pattern",
    "exampleSentenceDe": "Dieses Fahrzeug hat sechs Vorwärtsgänge.",
    "exampleSentenceEs": "Este vehículo tiene seis marchas hacia adelante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Fahrzeug",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sechs Vorwärtsgänge",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Gefahrenbremsung",
    "pron": "di gue-fá-ren-brem-sung",
    "es": "el frenado de emergencia",
    "type": "Sustantivo (Fem)",
    "category": "Fahrschule",
    "level": "B1",
    "plural": "die Gefahrenbremsungen",
    "exampleSentenceDe": "In der Prüfung zeigen Sie eine Gefahrenbremsung.",
    "exampleSentenceEs": "En el examen demuestra un frenado de emergencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Prüfung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "zeigen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Gefahrenbremsung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Gefährdung",
    "pron": "di gue-fér-dung",
    "es": "el peligro / puesta en riesgo",
    "type": "Sustantivo (Fem)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Gefährdungen",
    "exampleSentenceDe": "Fahren ohne Licht bedeutet eine Gefährdung für alle.",
    "exampleSentenceEs": "Conducir sin luces supone un peligro para todos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Fahren ohne Licht",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bedeutet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Gefährdung für alle",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Gebrauchtwagen",
    "pron": "dea gue-bráujt-va-guen",
    "es": "el coche de segunda mano",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Gebrauchtwagen",
    "en": "a cute 3D isometric UI icon of a clean pre-owned sedan car with a small sale tag",
    "exampleSentenceDe": "Wir haben einen günstigen Gebrauchtwagen gekauft.",
    "exampleSentenceEs": "Hemos comprado un coche usado económico.",
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
        "text": "einen günstigen Gebrauchtwagen",
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
    "de": "die gestrichelte Linie",
    "pron": "di gue-shtrí-jel-te lí-nie",
    "es": "la línea discontinua",
    "type": "Frase nominal (Fem)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die gestrichelten Linien",
    "en": "a cute 3D isometric UI icon of a dark asphalt road with a dashed white centerline",
    "exampleSentenceDe": "Bei einer gestrichelten Linie darf man überholen.",
    "exampleSentenceEs": "Con línea discontinua está permitido adelantar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei einer gestrichelten Linie",
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
        "text": "überholen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Getriebestörung",
    "pron": "di gue-trí-be-shtö-rung",
    "es": "el fallo de la transmisión",
    "type": "Sustantivo (Fem)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Getriebestörungen",
    "en": "a cute 3D isometric UI icon of a glowing amber dashboard gear cog warning indicator",
    "exampleSentenceDe": "Bei einer Getriebestörung schaltet der Wagen nicht mehr.",
    "exampleSentenceEs": "Con un fallo en la transmisión el coche ya no cambia de marcha.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei einer Getriebestörung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schaltet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Wagen",
        "role": "subject",
        "order": 3
      },
      {
        "text": "nicht mehr",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Hauptlichtschalter",
    "pron": "dea jáupt-lijt-shal-ta",
    "es": "el interruptor principal de luces",
    "type": "Sustantivo (Masc)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Hauptlichtschalter",
    "en": "a cute 3D isometric UI icon of a rotary car headlight dashboard control dial",
    "exampleSentenceDe": "Der Hauptlichtschalter sitzt links neben dem Lenkrad.",
    "exampleSentenceEs": "El mando principal de luces está a la izquierda del volante.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Hauptlichtschalter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sitzt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "links neben dem Lenkrad",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kraftstoffstand",
    "pron": "dea kráft-shtof-shtant",
    "es": "el nivel de combustible",
    "type": "Sustantivo (Masc)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Kraftstoffstände",
    "exampleSentenceDe": "Die Anzeige im Tacho zeigt den Kraftstoffstand.",
    "exampleSentenceEs": "El indicador del cuadro muestra el nivel de combustible.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Anzeige im Tacho",
        "role": "subject",
        "order": 1
      },
      {
        "text": "zeigt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Kraftstoffstand",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Kurve",
    "pron": "di kúr-ve",
    "es": "la curva",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Kurven",
    "en": "a cute 3D isometric UI icon of a winding curved asphalt road segment",
    "exampleSentenceDe": "Vor einer scharfen Kurve muss man bremsen.",
    "exampleSentenceEs": "Antes de una curva cerrada hay que frenar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vor einer scharfen Kurve",
        "role": "complement",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "bremsen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "ländlich",
    "pron": "lént-lij",
    "es": "rural / de campo",
    "type": "Adjetivo",
    "category": "Verkehr",
    "level": "B1",
    "regimen": "Antónimo: städtisch",
    "exampleSentenceDe": "In ländlichen Gebieten fährt der Bus seltener.",
    "exampleSentenceEs": "En zonas rurales el autobús pasa con menos frecuencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In ländlichen Gebieten",
        "role": "complement",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Bus",
        "role": "subject",
        "order": 3
      },
      {
        "text": "seltener",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Landstraße",
    "pron": "di lánt-shtra-se",
    "es": "la carretera secundaria / interurbana",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Landstraßen",
    "en": "a cute 3D isometric UI icon of a two-lane rural country road lined with green trees",
    "exampleSentenceDe": "Auf der Landstraße gilt Tempo hundert in Deutschland.",
    "exampleSentenceEs": "En carretera interurbana rige el límite de 100 en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der Landstraße",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gilt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Tempo hundert",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in Deutschland",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Leitplanke",
    "pron": "di láit-plan-ke",
    "es": "la barrera quitamiedos / guardarraíl",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Leitplanken",
    "en": "a cute 3D isometric UI icon of a corrugated steel highway safety guardrail barrier",
    "exampleSentenceDe": "Rechts neben der Autobahn schützt eine Leitplanke.",
    "exampleSentenceEs": "A la derecha de la autopista protege una barandilla.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Rechts neben der Autobahn",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schützt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Leitplanke",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "der Mietwagen",
    "pron": "dea mít-va-guen",
    "es": "el coche de alquiler",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Mietwagen",
    "en": "a cute 3D isometric UI icon of a silver rental sedan car beside a car key fob",
    "exampleSentenceDe": "Am Flughafen übernehmen wir unseren Mietwagen.",
    "exampleSentenceEs": "En el aeropuerto recogemos nuestro coche de alquiler.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Flughafen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "übernehmen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "unseren Mietwagen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Motorradfahrer",
    "pron": "dea mo-tór-rat-fa-ra",
    "es": "el motociclista",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Motorradfahrer",
    "en": "a cute 3D isometric avatar of a motorcyclist wearing a helmet riding a motorcycle",
    "exampleSentenceDe": "Achten Sie beim Abbiegen besonders auf Motorradfahrer.",
    "exampleSentenceEs": "Al girar preste especial atención a los motociclistas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Achten",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "beim Abbiegen besonders auf Motorradfahrer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Motorstörung",
    "pron": "di mó-tor-shtö-rung",
    "es": "la avería de motor (OBD)",
    "type": "Sustantivo (Fem)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Motorstörungen",
    "en": "a cute 3D isometric UI icon of a glowing yellow dashboard check-engine warning light",
    "exampleSentenceDe": "Die gelbe Motorstörung warnt vor einem Defekt.",
    "exampleSentenceEs": "El testigo amarillo de fallo de motor advierte una avería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die gelbe Motorstörung",
        "role": "subject",
        "order": 1
      },
      {
        "text": "warnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "vor einem Defekt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Nahverkehr",
    "pron": "dea ná-fea-ker",
    "es": "el transporte local / cercanías",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Mit dem Deutschlandticket nutzt man den Nahverkehr.",
    "exampleSentenceEs": "Con el Deutschlandticket se usa el transporte local.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mit dem Deutschlandticket",
        "role": "complement",
        "order": 1
      },
      {
        "text": "nutzt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Nahverkehr",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Pendler",
    "pron": "dea pénd-la",
    "es": "el viajero diario por trabajo",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Pendler",
    "en": "a cute 3D isometric avatar of a commuter carrying a leather briefcase near a train",
    "exampleSentenceDe": "Morgens stehen viele Pendler im Berufsverkehr.",
    "exampleSentenceEs": "Por la mañana muchos trabajadores quedan en el tráfico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Morgens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "stehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele Pendler",
        "role": "subject",
        "order": 3
      },
      {
        "text": "im Berufsverkehr",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Pfeil",
    "pron": "dea pfail",
    "es": "la flecha (señal)",
    "type": "Sustantivo (Masc)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Pfeile",
    "en": "a cute 3D isometric UI icon of a white painted right-turn arrow on dark road asphalt",
    "exampleSentenceDe": "Der weiße Pfeil auf der Straße zeigt nach rechts.",
    "exampleSentenceEs": "La flecha blanca en el suelo indica hacia la derecha.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der weiße Pfeil auf der Straße",
        "role": "subject",
        "order": 1
      },
      {
        "text": "zeigt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nach rechts",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Profiltiefe",
    "pron": "di pro-fíl-ti-fe",
    "es": "la profundidad del dibujo (neumático)",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Profiltiefen",
    "exampleSentenceDe": "Sommerreifen brauchen mindestens 1,6 mm Profiltiefe.",
    "exampleSentenceEs": "Los neumáticos de verano requieren mínimo 1,6 mm de dibujo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sommerreifen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mindestens 1,6 mm Profiltiefe",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Radfahrer",
    "pron": "dea rát-fa-ra",
    "es": "el ciclista",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Radfahrer",
    "en": "a cute 3D isometric avatar of a cyclist wearing a helmet riding a bicycle",
    "exampleSentenceDe": "Im Stadtverkehr muss man auf Radfahrer achten.",
    "exampleSentenceEs": "En tráfico urbano hay que cuidar a los ciclistas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Stadtverkehr",
        "role": "complement",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "auf Radfahrer",
        "role": "complement",
        "order": 4
      },
      {
        "text": "achten",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der Rechtsabbiegepfeil",
    "pron": "dea réjts-ap-bi-gue-pfail",
    "es": "la flecha verde de giro a la derecha",
    "type": "Sustantivo (Masc)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Rechtsabbiegepfeile",
    "en": "a cute 3D isometric UI icon of a black sign plate with a bright green right-turn arrow next to a red traffic light",
    "exampleSentenceDe": "Am grünen Rechtsabbiegepfeil hält man zuerst am Halt.",
    "exampleSentenceEs": "En la flecha de giro a la derecha se para primero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am grünen Rechtsabbiegepfeil",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hält",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "zuerst am Halt",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Rettungsgasse",
    "pron": "di ré-tungs-ga-se",
    "es": "el pasillo de emergencia",
    "type": "Sustantivo (Fem)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Rettungsgassen",
    "en": "a cute 3D isometric UI icon of two highway car lanes parted wide for a central emergency lane",
    "exampleSentenceDe": "Bei Stau auf der Autobahn ist eine Rettungsgasse Pflicht.",
    "exampleSentenceEs": "Con atasco en autopista es obligatorio abrir pasillo de emergencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei Stau auf der Autobahn",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Rettungsgasse",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Pflicht",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Richtung",
    "pron": "di ríj-tung",
    "es": "la dirección / sentido",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Richtungen",
    "exampleSentenceDe": "Wir fahren in Richtung Hannover auf der A2.",
    "exampleSentenceEs": "Circulamos en dirección a Hannover por la A2.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Richtung Hannover auf der A2",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Sachschaden / Totalschaden",
    "pron": "dea záj-sha-den",
    "es": "el daño material / siniestro total",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Sachschäden",
    "exampleSentenceDe": "Glücklicherweise gab es beim Unfall nur Sachschaden.",
    "exampleSentenceEs": "Por suerte en el accidente solo hubo daños materiales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Glücklicherweise",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gab",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es",
        "role": "subject",
        "order": 3
      },
      {
        "text": "beim Unfall nur Sachschaden",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Schock",
    "pron": "dea shok",
    "es": "el choque emocional / shock",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "regimen": "Singular / Pl: die Schocks",
    "plural": "die Schocks",
    "exampleSentenceDe": "Nach dem Zusammenstoß stand der Fahrer unter Schock.",
    "exampleSentenceEs": "Tras la colisión el conductor estaba en estado de shock.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Zusammenstoß",
        "role": "complement",
        "order": 1
      },
      {
        "text": "stand",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Fahrer",
        "role": "subject",
        "order": 3
      },
      {
        "text": "unter Schock",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Sicht",
    "pron": "di zijt",
    "es": "la visibilidad / vista",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Bei schlechter Sicht fahren Sie bitte langsamer.",
    "exampleSentenceEs": "Con mala visibilidad conduzca más despacio, por favor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei schlechter Sicht",
        "role": "complement",
        "order": 1
      },
      {
        "text": "fahren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "bitte langsamer",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Standort",
    "pron": "dea shtánt-ort",
    "es": "la ubicación / emplazamiento",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Standorte",
    "exampleSentenceDe": "Ich schicke dir meinen Standort über das Handy.",
    "exampleSentenceEs": "Te envío mi ubicación por el móvil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schicke",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dir meinen Standort über das Handy",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Stop-Schild",
    "pron": "das shtóp-shilt",
    "es": "la señal de Stop",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehrsregeln",
    "level": "A2–B1",
    "plural": "die Stop-Schilder",
    "en": "a cute 3D isometric UI icon of a red octagonal traffic Stop sign on a metal pole",
    "exampleSentenceDe": "Am Stop-Schild müssen die Räder drei Sekunden stehen.",
    "exampleSentenceEs": "En el Stop las ruedas deben detenerse tres segundos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Stop-Schild",
        "role": "complement",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Räder",
        "role": "subject",
        "order": 3
      },
      {
        "text": "drei Sekunden",
        "role": "complement",
        "order": 4
      },
      {
        "text": "stehen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Störung der Lenkung",
    "pron": "di shtö́-rung dea lén-kung",
    "es": "el fallo en la dirección",
    "type": "Frase nominal (Fem)",
    "category": "Dashboard",
    "level": "B1",
    "regimen": "Alerta roja de tablero",
    "en": "a cute 3D isometric UI icon of a glowing red dashboard steering wheel warning symbol with exclamation mark",
    "exampleSentenceDe": "Bei Störung der Lenkung sofort anhalten!",
    "exampleSentenceEs": "¡Con fallo en la dirección detenerse de inmediato!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei Störung der Lenkung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sofort",
        "role": "complement",
        "order": 2
      },
      {
        "text": "anhalten",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "die Strafe",
    "pron": "di shtrá-fe",
    "es": "la multa / sanción / castigo",
    "type": "Sustantivo (Fem)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Strafen",
    "exampleSentenceDe": "Zu schnelles Fahren kostet eine hohe Strafe.",
    "exampleSentenceEs": "Conducir demasiado rápido cuesta una multa alta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zu schnelles Fahren",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kostet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine hohe Strafe",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "strafbar",
    "pron": "shtráf-bar",
    "es": "punible / delictivo",
    "type": "Adjetivo",
    "category": "Verkehrsregeln",
    "level": "B1",
    "regimen": "Predicativo/Atributivo",
    "exampleSentenceDe": "Fahren ohne Führerschein ist in Deutschland strafbar.",
    "exampleSentenceEs": "Conducir sin licencia es punible en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Fahren ohne Führerschein",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Deutschland strafbar",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Straßenrand",
    "pron": "dea shtrá-sen-rant",
    "es": "el arcén / borde de la carretera",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Straßenränder",
    "en": "a cute 3D isometric UI icon of an asphalt road shoulder with a grassy roadside curb",
    "exampleSentenceDe": "Bei einer Panne parken Sie rechts am Straßenrand.",
    "exampleSentenceEs": "Con una avería estacione a la derecha en el arcén.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei einer Panne",
        "role": "complement",
        "order": 1
      },
      {
        "text": "parken",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "rechts am Straßenrand",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Stundenkilometer",
    "pron": "dea shtún-den-ki-lo-me-ta",
    "es": "el kilómetro por hora (km/h)",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Stundenkilometer",
    "exampleSentenceDe": "In der Stadt sind fünfzig Stundenkilometer erlaubt.",
    "exampleSentenceEs": "En la ciudad se permiten cincuenta kilómetros por hora.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Stadt",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "fünfzig Stundenkilometer",
        "role": "subject",
        "order": 3
      },
      {
        "text": "erlaubt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Tankstelle",
    "pron": "di tánk-shte-le",
    "es": "la gasolinera / estación de servicio",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "A2–B1",
    "plural": "die Tankstellen",
    "en": "a cute 3D isometric UI icon of a small clean petrol gas station with fuel pumps and canopy",
    "exampleSentenceDe": "An der nächsten Tankstelle füllen wir Benzin nach.",
    "exampleSentenceEs": "En la próxima gasolinera echamos gasolina.",
    "exampleSentenceDeBlocks": [
      {
        "text": "An der nächsten Tankstelle",
        "role": "complement",
        "order": 1
      },
      {
        "text": "füllen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Benzin",
        "role": "complement",
        "order": 4
      },
      {
        "text": "nach",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der Tempomat",
    "pron": "dea tem-po-mát",
    "es": "el control de crucero",
    "type": "Sustantivo (Masc)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Tempomaten",
    "en": "a cute 3D isometric UI icon of a glowing green dashboard cruise control dial icon",
    "exampleSentenceDe": "Auf der Autobahn schalte ich den Tempomat ein.",
    "exampleSentenceEs": "En la autopista activo el control de crucero.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der Autobahn",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schalte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Tempomat",
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
    "de": "der Tunnel",
    "pron": "dea tú-nel",
    "es": "el túnel",
    "type": "Sustantivo (Masc)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Tunnel",
    "en": "a cute 3D isometric UI icon of an arched concrete road tunnel entrance",
    "exampleSentenceDe": "Im Tunnel ist das Überholen streng verboten.",
    "exampleSentenceEs": "En el túnel adelantar está estrictamente prohibido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Tunnel",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Überholen",
        "role": "subject",
        "order": 3
      },
      {
        "text": "streng verboten",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Überholmanöver",
    "pron": "das ü-ba-jól-ma-nö-va",
    "es": "la maniobra de adelantamiento",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Überholmanöver",
    "exampleSentenceDe": "Brechen Sie bei Gegenverkehr das Überholmanöver ab!",
    "exampleSentenceEs": "¡Aborte el adelantamiento si viene tráfico de frente!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Brechen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bei Gegenverkehr das Überholmanöver",
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
    "de": "das Überholverbot",
    "pron": "das ü-ba-jól-fea-bot",
    "es": "la prohibición de adelantar",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Überholverbote",
    "en": "a cute 3D isometric UI icon of a circular white road sign with red border showing a red and a black car side by side",
    "exampleSentenceDe": "Auf dieser Brücke gilt ein Überholverbot für Lkw.",
    "exampleSentenceEs": "En este puente rige prohibición de adelantar para camiones.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dieser Brücke",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gilt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Überholverbot für Lkw",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "umweltfreundlich",
    "pron": "úm-velt-froint-lij",
    "es": "ecológico / respetuoso con el medio",
    "type": "Adjetivo",
    "category": "Verkehr",
    "level": "B1",
    "regimen": "Comp: umweltfreundlicher",
    "exampleSentenceDe": "Ein Elektroauto fährt besonders umweltfreundlich.",
    "exampleSentenceEs": "Un coche eléctrico circula de forma especialmente ecológica.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ein Elektroauto",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fährt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "besonders umweltfreundlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "unsicher",
    "pron": "ún-zi-ja",
    "es": "inseguro / incierto",
    "type": "Adjetivo",
    "category": "Verkehr",
    "level": "A2–B1",
    "regimen": "Comp: unsicherer",
    "exampleSentenceDe": "Bei Glatteis ist das Fahren sehr unsicher.",
    "exampleSentenceEs": "Con hielo en la calzada conducir es muy inseguro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei Glatteis",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Fahren",
        "role": "subject",
        "order": 3
      },
      {
        "text": "sehr unsicher",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Verbot",
    "pron": "das fea-bót",
    "es": "la prohibición",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Verbote",
    "exampleSentenceDe": "Beachten Sie das Verbot der Einfahrt!",
    "exampleSentenceEs": "¡Respete la señal de dirección prohibida!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Beachten",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "das Verbot der Einfahrt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Verkehrshindernis",
    "pron": "das fea-kérs-jin-da-nis",
    "es": "el obstáculo en la vía",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Verkehrshindernisse",
    "en": "a cute 3D isometric UI icon of a fallen tree branch blocking an asphalt road lane",
    "exampleSentenceDe": "Ein Baum auf der Straße ist ein Verkehrshindernis.",
    "exampleSentenceEs": "Un árbol en la calzada es un obstáculo vial.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ein Baum auf der Straße",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Verkehrshindernis",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Verkehrsregeln",
    "pron": "di fea-kérs-re-gueln",
    "es": "las normas de tráfico",
    "type": "Sustantivo (Plural)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "regimen": "Sg: die Verkehrsregel",
    "plural": "die Verkehrsregeln",
    "exampleSentenceDe": "Alle Fahrer müssen die Verkehrsregeln kennen.",
    "exampleSentenceEs": "Todos los conductores deben conocer las normas de tráfico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle Fahrer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "müssen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Verkehrsregeln",
        "role": "complement",
        "order": 3
      },
      {
        "text": "kennen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Verletzung",
    "pron": "di fea-lé-tsung",
    "es": "la lesión / herida",
    "type": "Sustantivo (Fem)",
    "category": "Verkehr",
    "level": "B1",
    "plural": "die Verletzungen",
    "exampleSentenceDe": "Der Arzt untersucht die leichte Verletzung am Bein.",
    "exampleSentenceEs": "El médico examina la lesión leve en la pierna.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Arzt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "untersucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die leichte Verletzung am Bein",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Vorglühanlage",
    "pron": "di fór-glü-an-la-gue",
    "es": "el sistema de precalentamiento (diésel)",
    "type": "Sustantivo (Fem)",
    "category": "Dashboard",
    "level": "B1",
    "plural": "die Vorglühanlagen",
    "en": "a cute 3D isometric UI icon of a glowing amber diesel glow-plug coil dashboard indicator",
    "exampleSentenceDe": "Bei Kälte wartet man auf die gelbe Vorglühanlage.",
    "exampleSentenceEs": "Con frío se espera a que se apague el testigo de precalentamiento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei Kälte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wartet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "auf die gelbe Vorglühanlage",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "Vorfahrt achten",
    "pron": "fór-fart aj-ten",
    "es": "ceder el paso",
    "type": "Frase verbal",
    "category": "Verkehrsregeln",
    "level": "A2–B1",
    "regimen": "+ Akk / Norma vial",
    "exampleSentenceDe": "An dieser Kreuzung müssen Sie Vorfahrt achten!",
    "exampleSentenceEs": "¡En este cruce tiene que ceder el paso!",
    "exampleSentenceDeBlocks": [
      {
        "text": "An dieser Kreuzung",
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
        "text": "Vorfahrt",
        "role": "complement",
        "order": 4
      },
      {
        "text": "achten",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "das Warnzeichen",
    "pron": "das várn-tsai-jen",
    "es": "la señal de advertencia / peligro",
    "type": "Sustantivo (Neutro)",
    "category": "Verkehrsregeln",
    "level": "B1",
    "plural": "die Warnzeichen",
    "en": "a cute 3D isometric UI icon of a red-bordered triangular danger warning traffic sign",
    "exampleSentenceDe": "Ein rotes Dreieck ist ein Warnzeichen.",
    "exampleSentenceEs": "Un triángulo rojo es una señal de advertencia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ein rotes Dreieck",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein Warnzeichen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Wartung",
    "pron": "di vár-tung",
    "es": "el mantenimiento / revisión",
    "type": "Sustantivo (Fem)",
    "category": "Fahrschule",
    "level": "B1",
    "plural": "die Wartungen",
    "exampleSentenceDe": "Einmal pro Jahr braucht das Auto eine Wartung.",
    "exampleSentenceEs": "Una vez al año el coche necesita mantenimiento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Einmal pro Jahr",
        "role": "complement",
        "order": 1
      },
      {
        "text": "braucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Auto",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Wartung",
        "role": "complement",
        "order": 4
      }
    ]
  }
]
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
    },
  {
    "de": "der Anruf",
    "pron": "dea án-ruf",
    "es": "la llamada telefónica",
    "type": "Sustantivo (Masc)",
    "category": "Telefon",
    "level": "A1–B1",
    "plural": "die Anrufe",
    "exampleSentenceDe": "Ich warte dann heute Nachmittag auf deinen Anruf.",
    "exampleSentenceEs": "Entonces espero tu llamada esta tarde.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "warte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dann heute Nachmittag auf deinen Anruf",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Anrufbeantworter",
    "pron": "dea án-ruf-be-ant-vor-ta",
    "es": "el contestador automático",
    "type": "Sustantivo (Masc)",
    "category": "Telefon",
    "level": "A1–B1",
    "plural": "die Anrufbeantworter",
    "en": "a cute 3D isometric UI icon of a desk telephone answering machine with blinking light",
    "exampleSentenceDe": "Sind Nachrichten auf dem Anrufbeantworter?",
    "exampleSentenceEs": "¿Hay mensajes en el contestador automático?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sind",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Nachrichten",
        "role": "subject",
        "order": 2
      },
      {
        "text": "auf dem Anrufbeantworter",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Ansage",
    "pron": "di án-za-gue",
    "es": "el mensaje grabado / anuncio",
    "type": "Sustantivo (Fem)",
    "category": "Telefon",
    "level": "B1",
    "plural": "die Ansagen",
    "exampleSentenceDe": "Hören Sie bitte die Ansage am Telefon genau an!",
    "exampleSentenceEs": "¡Escuche con atención el mensaje grabado del teléfono!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hören",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte die Ansage am Telefon genau",
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
    "de": "die ec-Karte",
    "pron": "di e-tsé-kar-te",
    "es": "la tarjeta de débito (Girocard)",
    "type": "Sustantivo (Fem)",
    "category": "Bank",
    "level": "B1",
    "plural": "die ec-Karten",
    "en": "a cute 3D isometric UI icon of a blue bank debit card with a metallic gold EMV chip",
    "exampleSentenceDe": "Kann ich hier an der Kasse mit ec-Karte zahlen?",
    "exampleSentenceEs": "¿Puedo pagar aquí en caja con tarjeta de débito?",
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
        "text": "hier an der Kasse mit ec-Karte",
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
    "de": "faxen",
    "pron": "fák-sen",
    "es": "enviar por fax",
    "type": "Verbo regular",
    "category": "Post",
    "level": "B1",
    "regimen": "+ Akk / faxt, faxte, hat gefaxt",
    "en": "person feeding a paper document into an office fax machine",
    "exampleSentenceDe": "Bitte faxen Sie uns das Dokument bis Freitag.",
    "exampleSentenceEs": "Por favor, envíenos el documento por fax hasta el viernes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "faxen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "uns das Dokument bis Freitag",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Mahnung",
    "pron": "di má-nung",
    "es": "el aviso de cobro / requerimiento",
    "type": "Sustantivo (Fem)",
    "category": "Bank",
    "level": "B1",
    "plural": "die Mahnungen",
    "exampleSentenceDe": "Wenn man spät zahlt, schickt die Firma eine Mahnung.",
    "exampleSentenceEs": "Si se paga tarde, la empresa envía un recordatorio de pago.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wenn man spät zahlt,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schickt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Firma",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Mahnung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Summe",
    "pron": "di zú-me",
    "es": "la suma / importe total",
    "type": "Sustantivo (Fem)",
    "category": "Bank",
    "level": "B1",
    "plural": "die Summen",
    "exampleSentenceDe": "Bitte überweisen Sie die gesamte Summe bis Montag.",
    "exampleSentenceEs": "Por favor, transfiera el importe total hasta el lunes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "überweisen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die gesamte Summe bis Montag",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Taschengeld",
    "pron": "das tá-shen-guelt",
    "es": "la paga (de los hijos)",
    "type": "Sustantivo (Neutro)",
    "category": "Geld",
    "level": "B1",
    "regimen": "Singular",
    "en": "a cute 3D isometric UI icon of shiny euro coins next to a folded euro banknote",
    "exampleSentenceDe": "Mit zwölf Jahren bekommt er zwanzig Euro Taschengeld.",
    "exampleSentenceEs": "Con doce años recibe veinte euros de paga.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mit zwölf Jahren",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bekommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "er",
        "role": "subject",
        "order": 3
      },
      {
        "text": "zwanzig Euro Taschengeld",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Bankleitzahl",
    "pron": "di bánk-lait-tsal",
    "es": "el código bancario (BLZ)",
    "type": "Sustantivo (Fem)",
    "category": "Bank",
    "level": "B1",
    "plural": "die Bankleitzahlen",
    "exampleSentenceDe": "Für das Formular brauche ich Kontonummer und Bankleitzahl.",
    "exampleSentenceEs": "Para el formulario necesito número de cuenta y código bancario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für das Formular",
        "role": "complement",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Kontonummer und Bankleitzahl",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Beitrag",
    "pron": "dea bái-trak",
    "es": "la cuota / contribución / artículo",
    "type": "Sustantivo (Masc)",
    "category": "Bank",
    "level": "B1",
    "plural": "die Beiträge",
    "exampleSentenceDe": "Ich zahle den Beitrag für den Verein monatlich.",
    "exampleSentenceEs": "Pago la cuota del club mensualmente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "zahle",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Beitrag für den Verein monatlich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Betrag",
    "pron": "dea be-trák",
    "es": "el importe / cantidad",
    "type": "Sustantivo (Masc)",
    "category": "Bank",
    "level": "B1",
    "plural": "die Beträge",
    "exampleSentenceDe": "Bitte überweisen Sie den offenen Betrag bis Freitag.",
    "exampleSentenceEs": "Por favor, transfiera el importe pendiente hasta el viernes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "überweisen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den offenen Betrag bis Freitag",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Briefträger / die Briefträgerin",
    "pron": "dea bríf-tre-ga",
    "es": "el cartero / la cartera",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Post",
    "level": "A2–B1",
    "plural": "die Briefträger / -innen",
    "en": "cute 3D avatar of a cheerful mail carrier in yellow postal uniform holding letters",
    "exampleSentenceDe": "War die Briefträgerin heute schon an unserem Haus?",
    "exampleSentenceEs": "¿Ya pasó hoy la cartera por nuestra casa?",
    "exampleSentenceDeBlocks": [
      {
        "text": "War",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "die Briefträgerin",
        "role": "subject",
        "order": 2
      },
      {
        "text": "heute schon an unserem Haus",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Briefumschlag",
    "pron": "dea bríf-um-shlak",
    "es": "el sobre (postal)",
    "type": "Sustantivo (Masc)",
    "category": "Post",
    "level": "A2–B1",
    "plural": "die Briefumschläge (A: Kuvert)",
    "en": "clean white paper postal envelope with folded corner flap and postage stamp",
    "exampleSentenceDe": "Ich kaufe eine Packung weiße Briefumschläge.",
    "exampleSentenceEs": "Compro un paquete de sobres blancos.",
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
        "text": "eine Packung weiße Briefumschläge",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Einschreiben",
    "pron": "das áin-shrai-ben",
    "es": "el envío certificado",
    "type": "Sustantivo (Neutro)",
    "category": "Post",
    "level": "B1",
    "plural": "die Einschreiben",
    "exampleSentenceDe": "Wichtige Verträge schicke ich immer per Einschreiben.",
    "exampleSentenceEs": "Los contratos importantes los envío siempre por correo certificado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wichtige Verträge",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schicke",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "immer per Einschreiben",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Festnetz",
    "pron": "das fést-nets",
    "es": "la telefonía fija / red fija",
    "type": "Sustantivo (Neutro)",
    "category": "Telefon",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Anrufe ins deutsche Festnetz sind in meinem Tarif frei.",
    "exampleSentenceEs": "Las llamadas a teléfonos fijos alemanes son gratis en mi tarifa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Anrufe ins deutsche Festnetz",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in meinem Tarif frei",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "finanzieren",
    "pron": "fi-nan-tsí-ren",
    "es": "financiar",
    "type": "Verbo (-ieren)",
    "category": "Bank",
    "level": "B1",
    "regimen": "+ Akk / finanziert, hat finanziert",
    "exampleSentenceDe": "Wie wollen Sie den Kauf der Wohnung finanzieren?",
    "exampleSentenceEs": "¿Cómo quiere financiar la compra del piso?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie",
        "role": "complement",
        "order": 1
      },
      {
        "text": "wollen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den Kauf der Wohnung",
        "role": "complement",
        "order": 4
      },
      {
        "text": "finanzieren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "hinterlassen",
    "pron": "jín-ta-la-sen",
    "es": "dejar (un recado)",
    "type": "Verbo inseparable irr.",
    "category": "Telefon",
    "level": "B1",
    "regimen": "+ Akk / hinterlässt, hinterließ, hat hinterlassen",
    "exampleSentenceDe": "Möchten Sie eine Nachricht auf dem Anrufbeantworter hinterlassen?",
    "exampleSentenceEs": "¿Desea dejar un mensaje en el contestador automático?",
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
        "text": "eine Nachricht auf dem Anrufbeantworter",
        "role": "complement",
        "order": 3
      },
      {
        "text": "hinterlassen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Zeug / Spielzeug",
    "pron": "das tsoik",
    "es": "el trasto / cosas / juguete",
    "type": "Sustantivo (Neutro)",
    "category": "Kommunikation",
    "level": "B1",
    "regimen": "Singular (-zeug)",
    "exampleSentenceDe": "Ich habe dein ganzes Zeug in dein Zimmer getan.",
    "exampleSentenceEs": "He puesto todas tus cosas en tu habitación.",
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
        "text": "dein ganzes Zeug in dein Zimmer",
        "role": "complement",
        "order": 3
      },
      {
        "text": "getan",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Zinsen",
    "pron": "di tsín-zen",
    "es": "los intereses (bancarios)",
    "type": "Sustantivo (Plural)",
    "category": "Bank",
    "level": "B1",
    "regimen": "(nur Plural)",
    "exampleSentenceDe": "Wie viele Zinsen bekomme ich in diesem Jahr für mein Sparkonto?",
    "exampleSentenceEs": "¿Cuántos intereses recibo este año por mi cuenta de ahorro?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wie viele Zinsen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bekomme",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in diesem Jahr für mein Sparkonto",
        "role": "complement",
        "order": 4
      }
    ]
  }
]
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
    },
  {
    "de": "die Brust",
    "pron": "di brust",
    "es": "el pecho / tórax",
    "type": "Sustantivo (Fem)",
    "category": "Körperteile",
    "level": "A1–A2",
    "plural": "die Brüste",
    "en": "a cute 3D isometric medical mannequin upper torso highlighting the chest ribcage area",
    "exampleSentenceDe": "Beim Husten habe ich Schmerzen in der Brust.",
    "exampleSentenceEs": "Al toser tengo dolor en el pecho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Beim Husten",
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
        "text": "Schmerzen in der Brust",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Ellbogen",
    "pron": "dea él-bo-guen",
    "es": "el codo",
    "type": "Sustantivo (Masc)",
    "category": "Körperteile",
    "level": "A1–A2",
    "plural": "die Ellbogen",
    "en": "a cute 3D isometric stylized bent human arm highlighting the elbow joint",
    "exampleSentenceDe": "Mein linker Ellbogen tut nach dem Sport weh.",
    "exampleSentenceEs": "Me duele el codo izquierdo después del deporte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein linker Ellbogen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "tut",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nach dem Sport",
        "role": "complement",
        "order": 3
      },
      {
        "text": "weh",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Knie",
    "pron": "das kni",
    "es": "la rodilla",
    "type": "Sustantivo (Neutro)",
    "category": "Körperteile",
    "level": "A1–A2",
    "plural": "die Knie",
    "en": "a cute 3D isometric stylized human leg highlighting the knee joint",
    "exampleSentenceDe": "Ich bin gestürzt und mein Knie blutet stark.",
    "exampleSentenceEs": "Me caí y mi rodilla sangra mucho.",
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
        "text": "gestürzt",
        "role": "verb_p2",
        "order": 3
      },
      {
        "text": "und mein Knie blutet stark",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Krankenpfleger / die Krankenschwester",
    "pron": "dea krán-ken-pfle-ga / di shvés-ta",
    "es": "el enfermero / la enfermera",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Beim Arzt",
    "level": "A2",
    "plural": "die Krankenpfleger / die Krankenschwestern",
    "en": "a cute 3D isometric avatar of a friendly nurse in medical scrubs holding a thermometer",
    "exampleSentenceDe": "Die Krankenschwester misst morgens das Fieber.",
    "exampleSentenceEs": "La enfermera toma la fiebre por la mañana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Krankenschwester",
        "role": "subject",
        "order": 1
      },
      {
        "text": "misst",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "morgens das Fieber",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Magen",
    "pron": "dea má-guen",
    "es": "el estómago",
    "type": "Sustantivo (Masc)",
    "category": "Körperteile",
    "level": "B1",
    "plural": "die Mägen",
    "en": "a cute 3D isometric clean anatomical illustration of a human stomach organ",
    "exampleSentenceDe": "Nach dem scharfen Essen habe ich Magenschmerzen.",
    "exampleSentenceEs": "Después de la comida picante tengo dolor de estómago.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem scharfen Essen",
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
        "text": "Magenschmerzen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "schmerzen",
    "pron": "shmér-tsen",
    "es": "doler",
    "type": "Verbo regular",
    "category": "Krankheit",
    "level": "A1–A2",
    "regimen": "schmerzt, schmerzte, hat geschmerzt",
    "exampleSentenceDe": "Mein rechter Arm schmerzt seit gestern Abend.",
    "exampleSentenceEs": "Me duele el brazo derecho desde anoche.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein rechter Arm",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schmerzt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "seit gestern Abend",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Schulter",
    "pron": "di shúl-ta",
    "es": "el hombro",
    "type": "Sustantivo (Fem)",
    "category": "Körperteile",
    "level": "A1–A2",
    "plural": "die Schultern",
    "en": "a cute 3D isometric stylized human upper torso highlighting the shoulder joint",
    "exampleSentenceDe": "Durch die schwere Arbeit tut meine Schulter weh.",
    "exampleSentenceEs": "Por el trabajo pesado me duele el hombro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Durch die schwere Arbeit",
        "role": "complement",
        "order": 1
      },
      {
        "text": "tut",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "meine Schulter",
        "role": "subject",
        "order": 3
      },
      {
        "text": "weh",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Sprechstunde",
    "pron": "di shpréj-shtun-de",
    "es": "el horario de consulta médica",
    "type": "Sustantivo (Fem)",
    "category": "Beim Arzt",
    "level": "A1–A2",
    "plural": "die Sprechstunden",
    "exampleSentenceDe": "Wann hat Frau Dr. Klein morgen Sprechstunde?",
    "exampleSentenceEs": "¿Cuándo tiene consulta mañana la Dra. Klein?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wann",
        "role": "complement",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Frau Dr. Klein",
        "role": "subject",
        "order": 3
      },
      {
        "text": "morgen Sprechstunde",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Stirn",
    "pron": "di shtirn",
    "es": "la frente",
    "type": "Sustantivo (Fem)",
    "category": "Körperteile",
    "level": "A1–A2",
    "plural": "die Stirnen",
    "en": "a cute 3D isometric stylized human head highlighting the forehead",
    "exampleSentenceDe": "Deine Stirn ist sehr heiß, du hast Fieber.",
    "exampleSentenceEs": "Tu frente está muy caliente, tienes fiebre.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Deine Stirn",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sehr heiß, du hast Fieber",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Sucht",
    "pron": "di zujt",
    "es": "la adicción / dependencia",
    "type": "Sustantivo (Fem)",
    "category": "Gesundheit",
    "level": "B1",
    "plural": "die Süchte",
    "exampleSentenceDe": "Rauchen kann schnell zu einer Sucht werden.",
    "exampleSentenceEs": "Fumar puede convertirse rápido en una adicción.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Rauchen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schnell zu einer Sucht",
        "role": "complement",
        "order": 3
      },
      {
        "text": "werden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "süchtig",
    "pron": "zǘj-tij",
    "es": "adicto",
    "type": "Adjetivo",
    "category": "Gesundheit",
    "level": "B1",
    "regimen": "nach + Dativ",
    "exampleSentenceDe": "Viele Jugendliche sind süchtig nach dem Handy.",
    "exampleSentenceEs": "Muchos jóvenes son adictos al teléfono móvil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Jugendliche",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "süchtig nach dem Handy",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Suchtmittel",
    "pron": "das zújt-mi-tel",
    "es": "la sustancia adictiva",
    "type": "Sustantivo (Neutro)",
    "category": "Gesundheit",
    "level": "B1",
    "plural": "die Suchtmittel",
    "exampleSentenceDe": "Alkohol und Nikotin sind gefährliche Suchtmittel.",
    "exampleSentenceEs": "El alcohol y la nicotina son sustancias adictivas peligrosas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alkohol und Nikotin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gefährliche Suchtmittel",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Taschentuch",
    "pron": "das tá-shen-tuj",
    "es": "el pañuelo",
    "type": "Sustantivo (Neutro)",
    "category": "Gesundheit",
    "level": "B1",
    "plural": "die Taschentücher",
    "en": "a cute 3D isometric UI icon of a pastel box of soft white paper tissues",
    "exampleSentenceDe": "Bei Schnupfen brauche ich viele Taschentücher.",
    "exampleSentenceEs": "Con resfriado necesito muchos pañuelos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei Schnupfen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "viele Taschentücher",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Waschzeug",
    "pron": "das vásh-tsoik",
    "es": "los artículos de aseo",
    "type": "Sustantivo (Neutro)",
    "category": "Gesundheit",
    "level": "A1",
    "regimen": "Singular",
    "en": "a cute 3D isometric UI icon of a toiletry pouch with toothbrush, toothpaste, and soap bar",
    "exampleSentenceDe": "Für das Krankenhaus packe ich mein Waschzeug ein.",
    "exampleSentenceEs": "Para el hospital guardo mis artículos de aseo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für das Krankenhaus",
        "role": "complement",
        "order": 1
      },
      {
        "text": "packe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "mein Waschzeug",
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
    "de": "der Zeh / die Zehen",
    "pron": "dea tse / di tsé-en",
    "es": "el dedo del pie / los dedos",
    "type": "Sustantivo (Masc)",
    "category": "Körperteile",
    "level": "A1–A2",
    "plural": "die Zehen",
    "en": "a cute 3D isometric stylized human foot highlighting the big toe",
    "exampleSentenceDe": "Ich habe mir den großen Zeh gestoßen.",
    "exampleSentenceEs": "Me he golpeado el dedo gordo del pie.",
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
        "text": "mir den großen Zeh",
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
    "de": "behandeln",
    "pron": "be-ján-deln",
    "es": "tratar (médicamente)",
    "type": "Verbo inseparable",
    "category": "Beim Arzt",
    "level": "B1",
    "regimen": "+ Akk / behandelt, behandelte, hat behandelt",
    "exampleSentenceDe": "Welcher Arzt hat Sie im Krankenhaus behandelt?",
    "exampleSentenceEs": "¿Qué médico le ha tratado en el hospital?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welcher Arzt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie im Krankenhaus",
        "role": "complement",
        "order": 3
      },
      {
        "text": "behandelt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "behindert",
    "pron": "be-jín-dert",
    "es": "discapacitado",
    "type": "Adjetivo",
    "category": "Gesundheit",
    "level": "B1",
    "regimen": "Predicativo/Atributivo",
    "exampleSentenceDe": "Für behinderte Menschen gibt es spezielle Parkplätze.",
    "exampleSentenceEs": "Para personas discapacitadas hay plazas de aparcamiento especiales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für behinderte Menschen",
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
        "text": "spezielle Parkplätze",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "beißen",
    "pron": "bái-sen",
    "es": "morder / picar",
    "type": "Verbo irregular",
    "category": "Gesundheit",
    "level": "B1",
    "regimen": "+ Akk / beißt, biss, hat gebissen",
    "en": "cartoon brown dog playfully opening jaws to bite a rubber bone toy",
    "exampleSentenceDe": "Keine Angst, unser kleiner Hund beißt nicht!",
    "exampleSentenceEs": "No tenga miedo, ¡nuestro perro pequeño no muerde!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Keine Angst,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "unser kleiner Hund",
        "role": "subject",
        "order": 2
      },
      {
        "text": "beißt",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "nicht",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "blind",
    "pron": "blint",
    "es": "ciego / invidente",
    "type": "Adjetivo",
    "category": "Gesundheit",
    "level": "B1",
    "regimen": "Predicativo/Atributivo",
    "exampleSentenceDe": "Mein Nachbar ist seit seiner Geburt blind.",
    "exampleSentenceEs": "Mi vecino es ciego desde su nacimiento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Nachbar",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "seit seiner Geburt blind",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Droge",
    "pron": "di dró-gue",
    "es": "la droga / estupefaciente",
    "type": "Sustantivo (Fem)",
    "category": "Gesundheit",
    "level": "B1",
    "plural": "die Drogen",
    "exampleSentenceDe": "Drogen sind gefährlich und in Deutschland verboten.",
    "exampleSentenceEs": "Las drogas son peligrosas y están prohibidas en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Drogen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gefährlich und in Deutschland verboten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Gift",
    "pron": "das gift",
    "es": "el veneno / sustancia tóxica",
    "type": "Sustantivo (Neutro)",
    "category": "Gesundheit",
    "level": "B1",
    "plural": "die Gifte",
    "en": "sealed amber chemical hazard bottle with yellow warning triangle emblem",
    "exampleSentenceDe": "Vorsicht, dieses Putzmittel enthält starkes Gift!",
    "exampleSentenceEs": "¡Cuidado, este producto de limpieza contiene veneno fuerte!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Vorsicht,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "dieses Putzmittel",
        "role": "subject",
        "order": 2
      },
      {
        "text": "enthält",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "starkes Gift",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Grippe",
    "pron": "di grí-pe",
    "es": "la gripe",
    "type": "Sustantivo (Fem)",
    "category": "Krankheit",
    "level": "A2–B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Ich habe Grippe mit Fieber und kann nicht arbeiten.",
    "exampleSentenceEs": "Tengo gripe con fiebre y no puedo trabajar.",
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
        "text": "Grippe mit Fieber",
        "role": "complement",
        "order": 3
      },
      {
        "text": "und",
        "role": "complement",
        "order": 4
      },
      {
        "text": "kann",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "nicht",
        "role": "complement",
        "order": 6
      },
      {
        "text": "arbeiten",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "impfen",
    "pron": "ím-pfen",
    "es": "vacunar",
    "type": "Verbo regular",
    "category": "Krankheit",
    "level": "B1",
    "regimen": "+ Akk / impft, impfte, hat geimpft",
    "en": "doctor hand holding a small medical syringe administering a vaccine on an arm",
    "exampleSentenceDe": "Sie sollten sich im Herbst gegen Grippe impfen lassen.",
    "exampleSentenceEs": "Debería vacunarse contra la gripe en otoño.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sollten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sich im Herbst gegen Grippe",
        "role": "complement",
        "order": 3
      },
      {
        "text": "impfen lassen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Klinik",
    "pron": "di klí-nik",
    "es": "la clínica",
    "type": "Sustantivo (Fem)",
    "category": "Beim Arzt",
    "level": "A2",
    "plural": "die Kliniken",
    "en": "clean white modern medical clinic building with a red plus emblem",
    "exampleSentenceDe": "Ich muss heute in die Klinik, um meinen Onkel zu besuchen.",
    "exampleSentenceEs": "Hoy tengo que ir a la clínica para visitar a mi tío.",
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
        "text": "heute in die Klinik, um meinen Onkel",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zu besuchen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Körper",
    "pron": "dea kő́r-pa",
    "es": "el cuerpo",
    "type": "Sustantivo (Masc)",
    "category": "Körperteile",
    "level": "A2–B1",
    "plural": "die Körper",
    "en": "stylized friendly human mannequin figure showing full body form",
    "exampleSentenceDe": "Der Arzt sagt, ich muss etwas für meinen Körper tun.",
    "exampleSentenceEs": "El médico dice que debo hacer algo por mi cuerpo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Arzt",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sagt,",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "etwas für meinen Körper",
        "role": "complement",
        "order": 5
      },
      {
        "text": "tun",
        "role": "verb_p2",
        "order": 6
      }
    ]
  },
  {
    "de": "sterben",
    "pron": "shtér-ben",
    "es": "morir",
    "type": "Verbo irregular",
    "category": "Krankheit",
    "level": "B1",
    "regimen": "stirbt, starb, ist gestorben",
    "exampleSentenceDe": "Mein Kollege kommt nicht, sein Vater ist gestern plötzlich gestorben.",
    "exampleSentenceEs": "Mi compañero no viene, su padre murió ayer de repente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Kollege",
        "role": "subject",
        "order": 1
      },
      {
        "text": "kommt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nicht,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "sein Vater",
        "role": "subject",
        "order": 4
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "gestern plötzlich",
        "role": "complement",
        "order": 6
      },
      {
        "text": "gestorben",
        "role": "verb_p2",
        "order": 7
      }
    ]
  },
  {
    "de": "tot",
    "pron": "tot",
    "es": "muerto",
    "type": "Adjetivo",
    "category": "Krankheit",
    "level": "B1",
    "regimen": "Predicativo/Atributivo",
    "exampleSentenceDe": "Meine Großeltern väterlicherseits sind leider schon lange tot.",
    "exampleSentenceEs": "Mis abuelos paternos están lamentablemente muertos desde hace mucho.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Großeltern väterlicherseits",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider schon lange tot",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Tote",
    "pron": "dea tó-te",
    "es": "el muerto / víctima fatal",
    "type": "Sustantivo (Masc)",
    "category": "Krankheit",
    "level": "B1",
    "regimen": "Declinación adjetival (die Tote)",
    "exampleSentenceDe": "Bei dem schweren Autounfall auf der Autobahn gab es zwei Tote.",
    "exampleSentenceEs": "En el grave accidente de coche en la autopista hubo dos muertos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bei dem schweren Autounfall auf der Autobahn",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gab",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "es",
        "role": "subject",
        "order": 3
      },
      {
        "text": "zwei Tote",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Zahncreme / Zahnpasta",
    "pron": "di tsán-krem / tsán-pas-ta",
    "es": "la pasta de dientes",
    "type": "Sustantivo (Fem)",
    "category": "Medizin",
    "level": "A1",
    "regimen": "Singular",
    "en": "a cute 3D isometric UI icon of a squeezable white and blue toothpaste tube",
    "exampleSentenceDe": "Ich kaufe in der Drogerie eine neue Zahnpasta.",
    "exampleSentenceEs": "Compro una nueva pasta de dientes en la droguería.",
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
        "text": "in der Drogerie eine neue Zahnpasta",
        "role": "complement",
        "order": 3
      }
    ]
  }
]
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
    },
  {
    "de": "der/die Angestellte",
    "pron": "dea/di án-gue-shtel-te",
    "es": "el empleado / la empleada",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A1–B1",
    "regimen": "Declina como adjetivo",
    "plural": "die Angestellten",
    "en": "a cute 3D isometric avatar of a smiling office employee sitting at a computer desk",
    "exampleSentenceDe": "Als Angestellter arbeite ich im Büro.",
    "exampleSentenceEs": "Como empleado trabajo en la oficina.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Als Angestellter",
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
        "text": "im Büro",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Assistent / die Assistentin",
    "pron": "dea a-sis-tént",
    "es": "el asistente / la asistente",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A1",
    "plural": "die Assistenten / die Assistentinnen",
    "en": "a cute 3D isometric avatar of a helpful office assistant holding a tablet and folder",
    "exampleSentenceDe": "Ich bin Assistentin in einer Design-Agentur.",
    "exampleSentenceEs": "Soy asistente en una agencia de diseño.",
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
        "text": "Assistentin in einer Design-Agentur",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Autor / die Autorin",
    "pron": "dea áu-tor",
    "es": "el autor / la autora",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A2",
    "plural": "die Autoren / die Autorinnen",
    "en": "a cute 3D isometric avatar of a writer typing at a desk beside a stack of books",
    "exampleSentenceDe": "Die Autorin schreibt gerade ein neues Buch.",
    "exampleSentenceEs": "La autora está escribiendo ahora un libro nuevo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Autorin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schreibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gerade ein neues Buch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Erzieher / die Erzieherin",
    "pron": "dea ea-tsí-a",
    "es": "el educador infantil / la educadora",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A1–A2",
    "plural": "die Erzieher / die Erzieherinnen",
    "en": "a cute 3D isometric avatar of a friendly preschool educator holding colorful wooden blocks",
    "exampleSentenceDe": "Meine Schwester arbeitet als Erzieherin in einer Kita.",
    "exampleSentenceEs": "Mi hermana trabaja como educadora en una guardería.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Schwester",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "als Erzieherin in einer Kita",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Florist / die Floristin",
    "pron": "dea flo-ríst",
    "es": "el florista / la florista",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A1–A2",
    "plural": "die Floristen / die Floristinnen",
    "en": "a cute 3D isometric avatar of a florist arranging a colorful bouquet of flowers",
    "exampleSentenceDe": "Die Floristin bindet einen schönen Blumenstrauß.",
    "exampleSentenceEs": "La florista prepara un bonito ramo de flores.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Floristin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bindet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "einen schönen Blumenstrauß",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Handwerker / die Handwerkerin",
    "pron": "dea jánt-ver-ka",
    "es": "el operario de oficio / artesano",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A2–B1",
    "plural": "die Handwerker / die Handwerkerinnen",
    "en": "a cute 3D isometric avatar of a skilled craftsperson in work overalls holding a wrench",
    "exampleSentenceDe": "In Deutschland sucht man viele gute Handwerker.",
    "exampleSentenceEs": "En Alemania se buscan muchos buenos operarios de oficio.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Deutschland",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "viele gute Handwerker",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Hausmann / die Hausfrau",
    "pron": "dea jáus-man / di jáus-frau",
    "es": "el amo de casa / ama de casa",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A1–A2",
    "plural": "die Hausmänner / die Hausfrauen",
    "en": "a cute 3D isometric avatar of a cheerful homemaker wearing a kitchen apron at home",
    "exampleSentenceDe": "Nach der Geburt blieb er ein Jahr als Hausmann zu Hause.",
    "exampleSentenceEs": "Tras el nacimiento se quedó un año en casa como amo de casa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach der Geburt",
        "role": "complement",
        "order": 1
      },
      {
        "text": "blieb",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "er",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ein Jahr als Hausmann zu Hause",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Journalist / die Journalistin",
    "pron": "dea yur-na-líst",
    "es": "el periodista / la periodista",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A2",
    "plural": "die Journalisten / die Journalistinnen",
    "en": "a cute 3D isometric avatar of a news journalist holding a microphone and notepad",
    "exampleSentenceDe": "Der Journalist schreibt Artikel für eine Zeitung.",
    "exampleSentenceEs": "El periodista escribe artículos para un periódico.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Journalist",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schreibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Artikel für eine Zeitung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kaufmann / die Kauffrau",
    "pron": "dea káuf-man / di káuf-frau",
    "es": "el comerciante / administrativo comercial",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A1–A2",
    "plural": "die Kaufleute / die Kauffrauen",
    "en": "a cute 3D isometric avatar of a commercial business clerk with a calculator and ledger",
    "exampleSentenceDe": "Er macht eine Ausbildung zum Kaufmann im Einzelhandel.",
    "exampleSentenceEs": "Él hace una formación de comercio minorista.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "macht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Ausbildung zum Kaufmann im Einzelhandel",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Maler",
    "pron": "dea má-la",
    "es": "el pintor (de obra o arte)",
    "type": "Sustantivo (Masc)",
    "category": "Berufe",
    "level": "B1",
    "regimen": "Fem: die Malerin",
    "plural": "die Maler",
    "en": "a cute 3D isometric avatar of a house painter holding a paint roller and paint bucket",
    "exampleSentenceDe": "Der Maler streicht morgen unser Wohnzimmer.",
    "exampleSentenceEs": "El pintor pinta mañana nuestra sala de estar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Maler",
        "role": "subject",
        "order": 1
      },
      {
        "text": "streicht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "morgen unser Wohnzimmer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Manager / die Managerin",
    "pron": "dea mé-ne-ya",
    "es": "el gerente / director",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Manager / die Managerinnen",
    "en": "a cute 3D isometric avatar of a corporate manager in a suit standing beside a presentation chart",
    "exampleSentenceDe": "Sie arbeitet als Managerin in einer großen Firma.",
    "exampleSentenceEs": "Ella trabaja como gerente en una gran empresa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "als Managerin in einer großen Firma",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Mechatroniker",
    "pron": "dea me-ja-tró-ni-ka",
    "es": "el técnico mecatrónico",
    "type": "Sustantivo (Masc)",
    "category": "Berufe",
    "level": "A1–A2",
    "regimen": "Fem: die Mechatronikerin",
    "plural": "die Mechatroniker",
    "en": "a cute 3D isometric avatar of a mechatronics technician inspecting an electric motor with a diagnostic tablet",
    "exampleSentenceDe": "Als Mechatroniker repariere ich moderne Autos.",
    "exampleSentenceEs": "Como técnico mecatrónico reparo coches modernos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Als Mechatroniker",
        "role": "complement",
        "order": 1
      },
      {
        "text": "repariere",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "moderne Autos",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Model",
    "pron": "das mó-del",
    "es": "el/la modelo",
    "type": "Sustantivo (Neutro)",
    "category": "Berufe",
    "level": "A2",
    "plural": "die Models / Modelle",
    "en": "a cute 3D isometric avatar of a stylish fashion model posing on a runway",
    "exampleSentenceDe": "Das junge Model arbeitet für eine Modefirma.",
    "exampleSentenceEs": "La joven modelo trabaja para una empresa de moda.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Das junge Model",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "für eine Modefirma",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Moderator / die Moderatorin",
    "pron": "dea mo-de-rá-tor",
    "es": "el moderador / presentador",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Moderatoren / die Moderatorinnen",
    "en": "a cute 3D isometric avatar of a smiling TV presenter holding cue cards in a broadcast studio",
    "exampleSentenceDe": "Die Moderatorin begrüßt alle Gäste der Sendung.",
    "exampleSentenceEs": "La presentadora saluda a todos los invitados del programa.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Moderatorin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "begrüßt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle Gäste der Sendung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Musiker / die Musikerin",
    "pron": "dea mú-zi-ka",
    "es": "el músico / la música",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A2",
    "plural": "die Musiker / die Musikerinnen",
    "en": "a cute 3D isometric avatar of a musician playing an acoustic guitar",
    "exampleSentenceDe": "Alle Musiker üben täglich zwei Stunden.",
    "exampleSentenceEs": "Todos los músicos ensayan dos horas diarias.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle Musiker",
        "role": "subject",
        "order": 1
      },
      {
        "text": "üben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "täglich zwei Stunden",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Sänger / die Sängerin",
    "pron": "dea zén-gua",
    "es": "el cantante / la cantante",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A2",
    "plural": "die Sänger / die Sängerinnen",
    "en": "a cute 3D isometric avatar of a singer singing passionately into a stand microphone",
    "exampleSentenceDe": "Die Sängerin gibt am Samstag ein Konzert.",
    "exampleSentenceEs": "La cantante da un concierto el sábado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Sängerin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "am Samstag ein Konzert",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Sekretär / die Sekretärin",
    "pron": "dea ze-kre-tér",
    "es": "el secretario / la secretaria",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "A1",
    "plural": "die Sekretäre / die Sekretärinnen",
    "en": "a cute 3D isometric avatar of an office secretary sitting by a calendar and desk phone",
    "exampleSentenceDe": "Die Sekretärin vereinbart alle Termine für den Chef.",
    "exampleSentenceEs": "La secretaria concierta todas las citas para el jefe.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Sekretärin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "vereinbart",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "alle Termine für den Chef",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Abteilung",
    "pron": "di áp-tai-lung",
    "es": "el departamento / sección",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Abteilungen",
    "exampleSentenceDe": "Ich arbeite in der technischen Abteilung.",
    "exampleSentenceEs": "Trabajo en el departamento técnico.",
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
        "text": "in der technischen Abteilung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Agentur",
    "pron": "di a-guen-túr",
    "es": "la agencia",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "A1–B1",
    "regimen": "Agentur für Arbeit",
    "plural": "die Agenturen",
    "en": "a cute 3D isometric UI icon of a sleek modern glass-front agency office building",
    "exampleSentenceDe": "Die Agentur SANA ist eine Design-Agentur in Münster.",
    "exampleSentenceEs": "La agencia SANA es una agencia de diseño en Münster.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Agentur SANA",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine Design-Agentur in Münster",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Arbeitgeber",
    "pron": "dea ár-baits-gue-ba",
    "es": "el empleador / empresa",
    "type": "Sustantivo (Masc)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Arbeitgeber",
    "exampleSentenceDe": "Der Arbeitgeber braucht Ihre Steuer-ID.",
    "exampleSentenceEs": "El empleador necesita su número de identificación fiscal.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Arbeitgeber",
        "role": "subject",
        "order": 1
      },
      {
        "text": "braucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Ihre Steuer-ID",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Arbeitnehmer",
    "pron": "dea ár-baits-ne-ma",
    "es": "el trabajador / empleado",
    "type": "Sustantivo (Masc)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Arbeitnehmer",
    "exampleSentenceDe": "Arbeitnehmer haben in Deutschland gesetzlichen Urlaub.",
    "exampleSentenceEs": "Los trabajadores tienen vacaciones legales en Alemania.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Arbeitnehmer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "haben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in Deutschland gesetzlichen Urlaub",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Arbeitslosigkeit",
    "pron": "di ár-baits-lo-zij-kait",
    "es": "el desempleo / paro",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Die Arbeitslosigkeit ist in dieser Stadt niedrig.",
    "exampleSentenceEs": "El desempleo es bajo en esta ciudad.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Arbeitslosigkeit",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in dieser Stadt niedrig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Arbeitsstelle",
    "pron": "di ár-baits-shte-le",
    "es": "el puesto de trabajo",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Arbeitsstellen",
    "exampleSentenceDe": "Nach dem Kurs suche ich sofort eine Arbeitsstelle.",
    "exampleSentenceEs": "Después del curso busco enseguida un puesto de trabajo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Kurs",
        "role": "complement",
        "order": 1
      },
      {
        "text": "suche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "sofort eine Arbeitsstelle",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Azubi / Auszubildende",
    "pron": "dea a-tsú-bi",
    "es": "el aprendiz (FP Dual)",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Azubis / die Auszubildenden",
    "en": "a cute 3D isometric avatar of a young vocational trainee holding a technical notebook",
    "exampleSentenceDe": "Im ersten Jahr lernt der Azubi die Grundlagen.",
    "exampleSentenceEs": "En el primer año el aprendiz aprende los fundamentos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im ersten Jahr",
        "role": "complement",
        "order": 1
      },
      {
        "text": "lernt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Azubi",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Grundlagen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Berufserfahrung",
    "pron": "di be-rúfs-ea-fa-rung",
    "es": "la experiencia laboral",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "A1–A2",
    "plural": "die Berufserfahrungen",
    "exampleSentenceDe": "Ich habe schon zehn Jahre Berufserfahrung.",
    "exampleSentenceEs": "Ya tengo diez años de experiencia laboral.",
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
        "text": "schon zehn Jahre Berufserfahrung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "jobben",
    "pron": "yó-ben",
    "es": "trabajar temporalmente / hacer chapuzas",
    "type": "Verbo regular",
    "category": "Arbeitswelt",
    "level": "B1",
    "regimen": "jobbt, jobbte, hat gejobbt",
    "en": "young student working a part-time cafe job serving a coffee tray",
    "exampleSentenceDe": "In den Ferien jobbt mein Bruder in einem Café.",
    "exampleSentenceEs": "En vacaciones mi hermano trabaja temporalmente en un café.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In den Ferien",
        "role": "complement",
        "order": 1
      },
      {
        "text": "jobbt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mein Bruder",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in einem Café",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Lehrling",
    "pron": "dea lér-ling",
    "es": "el aprendiz (tradicional / A, CH)",
    "type": "Sustantivo (Masc)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Lehrlinge",
    "en": "a cute 3D isometric avatar of a young craft apprentice assisting beside a workbench",
    "exampleSentenceDe": "Der Lehrling hilft heute dem Meister.",
    "exampleSentenceEs": "El aprendiz ayuda hoy al maestro.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Lehrling",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hilft",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute dem Meister",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Leiter / die Leiterin",
    "pron": "dea lái-ta",
    "es": "el director / jefe de área",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Leiter / die Leiterinnen",
    "en": "a cute 3D isometric avatar of a team project manager pointing to a project plan board",
    "exampleSentenceDe": "Unser Projektleiter erklärt heute den Plan.",
    "exampleSentenceEs": "Nuestro director de proyecto explica hoy el plan.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unser Projektleiter",
        "role": "subject",
        "order": 1
      },
      {
        "text": "erklärt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute den Plan",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Leitung",
    "pron": "di lái-tung",
    "es": "la dirección / gerencia",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Leitungen",
    "exampleSentenceDe": "Die Leitung der Firma entscheidet morgen.",
    "exampleSentenceEs": "La dirección de la empresa decide mañana.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Leitung der Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "entscheidet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "morgen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Mitarbeiter / die Mitarbeiterin",
    "pron": "dea mít-ar-bai-ta",
    "es": "el colaborador / empleado",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Arbeitswelt",
    "level": "A1",
    "plural": "die Mitarbeiter / die Mitarbeiterinnen",
    "en": "a cute 3D isometric avatar of two smiling company coworkers standing side by side",
    "exampleSentenceDe": "In der Firma arbeiten siebzig Mitarbeiterinnen und Mitarbeiter.",
    "exampleSentenceEs": "En la empresa trabajan setenta empleadas y empleados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Firma",
        "role": "complement",
        "order": 1
      },
      {
        "text": "arbeiten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "siebzig Mitarbeiterinnen und Mitarbeiter",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "die Tätigkeit",
    "pron": "di té-tij-kait",
    "es": "la actividad / tarea laboral",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Tätigkeiten",
    "exampleSentenceDe": "Beschreiben Sie Ihre beruflichen Tätigkeiten!",
    "exampleSentenceEs": "¡Describa sus actividades profesionales!",
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
        "text": "Ihre beruflichen Tätigkeiten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Team",
    "pron": "das tim",
    "es": "el equipo (de trabajo)",
    "type": "Sustantivo (Neutro)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Teams",
    "en": "a cute 3D isometric UI icon of three diverse colleagues collaborating around a table",
    "exampleSentenceDe": "Wir arbeiten jeden Tag gut im Team zusammen.",
    "exampleSentenceEs": "Trabajamos bien juntos en equipo todos los días.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeiten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "jeden Tag gut im Team",
        "role": "complement",
        "order": 3
      },
      {
        "text": "zusammen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Abitur",
    "pron": "das a-bi-túr",
    "es": "el bachillerato (acceso universitario)",
    "type": "Sustantivo (Neutro)",
    "category": "Schule",
    "level": "B1",
    "regimen": "Plural raro",
    "plural": "die Abiture",
    "exampleSentenceDe": "Nach dem Abitur möchte sie Informatik studieren.",
    "exampleSentenceEs": "Después del bachillerato quiere estudiar informática.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Abitur",
        "role": "complement",
        "order": 1
      },
      {
        "text": "möchte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Informatik",
        "role": "complement",
        "order": 4
      },
      {
        "text": "studieren",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Abbildung",
    "pron": "di áp-bil-dung",
    "es": "la ilustración / figura",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Abbildungen",
    "en": "a cute 3D isometric UI icon of an open textbook page displaying a clean geometric diagram figure",
    "exampleSentenceDe": "Sehen Sie sich die Abbildung eins im Buch an!",
    "exampleSentenceEs": "¡Mire la ilustración uno del libro!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sehen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "sich die Abbildung eins im Buch",
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
    "de": "der Abschluss",
    "pron": "dea áp-shlus",
    "es": "el título / titulación / cierre",
    "type": "Sustantivo (Masc)",
    "category": "Schule",
    "level": "B1",
    "plural": "die Abschlüsse",
    "exampleSentenceDe": "Mit einem guten Abschluss findet man leichter Arbeit.",
    "exampleSentenceEs": "Con una buena titulación se encuentra trabajo más fácil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mit einem guten Abschluss",
        "role": "complement",
        "order": 1
      },
      {
        "text": "findet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "leichter Arbeit",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Akademie",
    "pron": "di a-ka-de-mí",
    "es": "la academia",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Akademien",
    "en": "a cute 3D isometric UI icon of a modern technical training academy campus building",
    "exampleSentenceDe": "Der Kurs findet in einer technischen Akademie statt.",
    "exampleSentenceEs": "El curso tiene lugar en una academia técnica.",
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
        "text": "in einer technischen Akademie",
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
    "de": "der Antwortbogen",
    "pron": "dea ánt-vort-bo-guen",
    "es": "la hoja de respuestas (examen)",
    "type": "Sustantivo (Masc)",
    "category": "Prüfung",
    "level": "A1–B1",
    "plural": "die Antwortbogen / die Antwortbögen",
    "en": "a cute 3D isometric UI icon of a multiple-choice exam bubble sheet with a sharpened pencil",
    "exampleSentenceDe": "Bitte schreiben Sie die Lösungen auf den Antwortbogen.",
    "exampleSentenceEs": "Por favor, escriba las soluciones en la hoja de respuestas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schreiben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Lösungen auf den Antwortbogen",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Aufgabe",
    "pron": "di áuf-ga-be",
    "es": "la tarea / ejercicio",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Aufgaben",
    "exampleSentenceDe": "Lesen Sie zuerst die Aufgabe drei sorgfältig.",
    "exampleSentenceEs": "Lea primero con atención el ejercicio tres.",
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
        "text": "zuerst die Aufgabe drei sorgfältig",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Aussage",
    "pron": "di áus-za-gue",
    "es": "el enunciado / afirmación",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Aussagen",
    "exampleSentenceDe": "Welche Aussage zum Text ist richtig, welche falsch?",
    "exampleSentenceEs": "¿Qué afirmación sobre el texto es correcta y cuál falsa?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Welche Aussage zum Text",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "richtig, welche falsch",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Berufsschule",
    "pron": "di be-rúfs-shu-le",
    "es": "la escuela de formación profesional",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Berufsschulen",
    "en": "a cute 3D isometric UI icon of a neat vocational school building with a small gear emblem",
    "exampleSentenceDe": "Zweimal pro Woche geht der Azubi in die Berufsschule.",
    "exampleSentenceEs": "Dos veces por semana va el aprendiz a la escuela de FP.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zweimal pro Woche",
        "role": "complement",
        "order": 1
      },
      {
        "text": "geht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "der Azubi",
        "role": "subject",
        "order": 3
      },
      {
        "text": "in die Berufsschule",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "Biologie",
    "pron": "bi-o-lo-guí",
    "es": "biología",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1–B1",
    "regimen": "Sin artículo: Bio",
    "exampleSentenceDe": "Am Dienstag haben wir um neun Uhr Biologie.",
    "exampleSentenceEs": "El martes tenemos biología a las nueve.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Dienstag",
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
        "text": "um neun Uhr Biologie",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "Chemie",
    "pron": "je-mí / she-mí",
    "es": "química",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1–B1",
    "regimen": "Sin artículo",
    "exampleSentenceDe": "In Chemie machen wir heute ein Experiment.",
    "exampleSentenceEs": "En química hacemos hoy un experimento.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Chemie",
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
        "text": "heute ein Experiment",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Einführung",
    "pron": "di áin-fü-rung",
    "es": "la introducción (curso/libro)",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Einführungen",
    "exampleSentenceDe": "Die Einführung in die Software dauert zwei Stunden.",
    "exampleSentenceEs": "La introducción al software dura dos horas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Einführung in die Software",
        "role": "subject",
        "order": 1
      },
      {
        "text": "dauert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zwei Stunden",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Einleitung",
    "pron": "di áin-lai-tung",
    "es": "la introducción (texto/discurso)",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Einleitungen",
    "exampleSentenceDe": "Eine gute Präsentation beginnt mit einer kurzen Einleitung.",
    "exampleSentenceEs": "Una buena presentación empieza con una breve introducción.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Eine gute Präsentation",
        "role": "subject",
        "order": 1
      },
      {
        "text": "beginnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "mit einer kurzen Einleitung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Folie",
    "pron": "di fó-lie",
    "es": "la diapositiva / lámina",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Folien",
    "en": "a cute 3D isometric UI icon of a clean white presentation slide showing a colorful bar chart",
    "exampleSentenceDe": "Auf der nächsten Folie sehen Sie die Ergebnisse.",
    "exampleSentenceEs": "En la siguiente diapositiva ven los resultados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf der nächsten Folie",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Ergebnisse",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Füller",
    "pron": "dea fǘ-la",
    "es": "la pluma estilográfica",
    "type": "Sustantivo (Masc)",
    "category": "Schulsachen",
    "level": "A1",
    "plural": "die Füller",
    "en": "a cute 3D isometric UI icon of a classic navy blue fountain pen with a silver nib",
    "exampleSentenceDe": "Das ist kein Bleistift, das ist ein Füller.",
    "exampleSentenceEs": "Eso no es un lápiz, eso es una pluma.",
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
        "text": "kein Bleistift, das ist ein Füller",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Geografie",
    "pron": "gue-o-gra-fí",
    "es": "geografía",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1–B1",
    "regimen": "Sin artículo",
    "exampleSentenceDe": "In Geografie lernen wir über die Kontinente.",
    "exampleSentenceEs": "En geografía aprendemos sobre los continentes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Geografie",
        "role": "complement",
        "order": 1
      },
      {
        "text": "lernen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "über die Kontinente",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Gesamtschule",
    "pron": "di gue-zámt-shu-le",
    "es": "el instituto integrado",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Gesamtschulen",
    "en": "a cute 3D isometric UI icon of a modern multi-wing comprehensive school building",
    "exampleSentenceDe": "Meine Kinder gehen in eine Gesamtschule.",
    "exampleSentenceEs": "Mis hijos van a un instituto integrado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Meine Kinder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in eine Gesamtschule",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Geschichte",
    "pron": "gue-shíj-te",
    "es": "historia",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1–B1",
    "regimen": "Sin artículo como asignatura",
    "exampleSentenceDe": "Mein Lieblingsfach in der Schule ist Geschichte.",
    "exampleSentenceEs": "Mi asignatura favorita en el colegio es historia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Lieblingsfach in der Schule",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Geschichte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Grundschule",
    "pron": "di grúnt-shu-le",
    "es": "la escuela primaria (6–10 años)",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Grundschulen",
    "en": "a cute 3D isometric UI icon of a cheerful colorful elementary school building",
    "exampleSentenceDe": "In Deutschland dauert die Grundschule meistens vier Jahre.",
    "exampleSentenceEs": "En Alemania la escuela primaria dura normalmente cuatro años.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Deutschland",
        "role": "complement",
        "order": 1
      },
      {
        "text": "dauert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Grundschule",
        "role": "subject",
        "order": 3
      },
      {
        "text": "meistens vier Jahre",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Gymnasium",
    "pron": "das güm-ná-zium",
    "es": "el instituto de bachillerato",
    "type": "Sustantivo (Neutro)",
    "category": "Bildung",
    "level": "A1–B1",
    "plural": "die Gymnasien",
    "en": "a cute 3D isometric UI icon of a classic red-brick academic high school building",
    "exampleSentenceDe": "Mario geht in das Elsa-Brändström-Gymnasium.",
    "exampleSentenceEs": "Mario va al instituto Elsa Brändström.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mario",
        "role": "subject",
        "order": 1
      },
      {
        "text": "geht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in das Elsa-Brändström-Gymnasium",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Hauptschule",
    "pron": "di jáupt-shu-le",
    "es": "la escuela secundaria básica",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Hauptschulen",
    "en": "a cute 3D isometric UI icon of a neat two-story secondary school building",
    "exampleSentenceDe": "Nach der Grundschule besuchen manche Schüler die Hauptschule.",
    "exampleSentenceEs": "Tras primaria algunos alumnos asisten a la Hauptschule.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach der Grundschule",
        "role": "complement",
        "order": 1
      },
      {
        "text": "besuchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "manche Schüler",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Hauptschule",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Hilfsmittel",
    "pron": "das jílfs-mi-tel",
    "es": "el material de apoyo / recurso",
    "type": "Sustantivo (Neutro)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Hilfsmittel",
    "exampleSentenceDe": "In der Prüfung sind keine Hilfsmittel erlaubt.",
    "exampleSentenceEs": "En el examen no se permiten materiales de apoyo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Prüfung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "keine Hilfsmittel",
        "role": "subject",
        "order": 3
      },
      {
        "text": "erlaubt",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die (Fach-)Hochschule",
    "pron": "di (fáj-)jój-shu-le",
    "es": "la escuela superior / universidad técnica",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Hochschulen",
    "en": "a cute 3D isometric UI icon of a university of applied sciences campus hall building",
    "exampleSentenceDe": "Er studiert Elektrotechnik an der Fachhochschule.",
    "exampleSentenceEs": "Él estudia electrotecnia en la universidad técnica.",
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
        "text": "Elektrotechnik an der Fachhochschule",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kindergarten",
    "pron": "dea kín-da-gar-ten",
    "es": "el jardín de infancia (3–6 años)",
    "type": "Sustantivo (Masc)",
    "category": "Bildung",
    "level": "A2–B1",
    "plural": "die Kindergärten",
    "en": "a cute 3D isometric UI icon of a bright kindergarten house with a small outdoor swing",
    "exampleSentenceDe": "Morgens bringe ich meine Tochter in den Kindergarten.",
    "exampleSentenceEs": "Por la mañana llevo a mi hija al jardín de infancia.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Morgens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "bringe",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "meine Tochter in den Kindergarten",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Kindertagesstätte (Kita)",
    "pron": "di kí-ta",
    "es": "la guardería infantil",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Kitas",
    "en": "a cute 3D isometric UI icon of a pastel child daycare center building with toy blocks outside",
    "exampleSentenceDe": "Wir suchen einen Platz in einer Kita in unserer Nähe.",
    "exampleSentenceEs": "Buscamos una plaza en una guardería cerca de casa.",
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
        "text": "einen Platz in einer Kita in unserer Nähe",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kommentar",
    "pron": "dea ko-men-tár",
    "es": "el comentario",
    "type": "Sustantivo (Masc)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Kommentare",
    "exampleSentenceDe": "Schreiben Sie einen kurzen Kommentar zu dem Thema!",
    "exampleSentenceEs": "¡Escriba un breve comentario sobre el tema!",
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
        "text": "einen kurzen Kommentar zu dem Thema",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Krippe",
    "pron": "di krí-pe",
    "es": "la guardería (0–3 años)",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Krippen",
    "en": "a cute 3D isometric UI icon of a cozy nursery daycare room with a wooden baby crib",
    "exampleSentenceDe": "Ab einem Jahr besuchen viele Kinder eine Krippe.",
    "exampleSentenceEs": "Desde el año de edad muchos niños van a la guardería infantil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ab einem Jahr",
        "role": "complement",
        "order": 1
      },
      {
        "text": "besuchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele Kinder",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Krippe",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Kuli",
    "pron": "dea kú-li",
    "es": "el bolígrafo (coloquial)",
    "type": "Sustantivo (Masc)",
    "category": "Schulsachen",
    "level": "A1",
    "plural": "die Kulis",
    "en": "a cute 3D isometric UI icon of a sleek blue click ballpoint pen",
    "exampleSentenceDe": "Hast du vielleicht einen Kuli für mich?",
    "exampleSentenceEs": "¿Tienes por casualidad un boli para mí?",
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
        "text": "vielleicht einen Kuli für mich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Kunst",
    "pron": "kunst",
    "es": "arte / educación artística",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1",
    "regimen": "Sin artículo como asignatura",
    "exampleSentenceDe": "Am Freitag haben wir zwei Stunden Kunst.",
    "exampleSentenceEs": "El viernes tenemos dos horas de arte.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Freitag",
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
        "text": "zwei Stunden Kunst",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "Mathe(matik)",
    "pron": "má-te / ma-te-ma-tík",
    "es": "matemáticas",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1–B1",
    "regimen": "Sin artículo",
    "exampleSentenceDe": "Mathe finde ich manchmal ein bisschen schwer.",
    "exampleSentenceEs": "Las matemáticas a veces me parecen un poco difíciles.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mathe",
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
        "text": "manchmal ein bisschen schwer",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Modul",
    "pron": "das mo-dúl",
    "es": "el módulo (del curso o examen)",
    "type": "Sustantivo (Neutro)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Module",
    "exampleSentenceDe": "Sie hat schon drei Module der Prüfung bestanden.",
    "exampleSentenceEs": "Ella ya ha aprobado tres módulos del examen.",
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
        "text": "schon drei Module der Prüfung",
        "role": "complement",
        "order": 3
      },
      {
        "text": "bestanden",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "Philosophie",
    "pron": "fi-lo-zo-fí",
    "es": "filosofía",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "B1",
    "regimen": "Sin artículo",
    "exampleSentenceDe": "In der Oberstufe kann man Philosophie wählen.",
    "exampleSentenceEs": "En los últimos cursos se puede elegir filosofía.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In der Oberstufe",
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
        "text": "Philosophie",
        "role": "complement",
        "order": 4
      },
      {
        "text": "wählen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "Physik",
    "pron": "fü-zík",
    "es": "física",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1–B1",
    "regimen": "Sin artículo",
    "exampleSentenceDe": "Wer Elektronik lernt, braucht gute Kenntnisse in Physik.",
    "exampleSentenceEs": "Quien estudia electrónica necesita buenos conocimientos de física.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wer Elektronik lernt,",
        "role": "subject",
        "order": 1
      },
      {
        "text": "braucht",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gute Kenntnisse in Physik",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Präsentation",
    "pron": "di pre-zen-ta-tsión",
    "es": "la presentación (exposición)",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Präsentationen",
    "exampleSentenceDe": "Im Teil Sprechen halten Sie eine kurze Präsentation.",
    "exampleSentenceEs": "En la parte oral hace usted una breve presentación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Teil Sprechen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "halten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine kurze Präsentation",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Punkt",
    "pron": "dea punkt",
    "es": "el punto (puntuación/tema)",
    "type": "Sustantivo (Masc)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Punkte",
    "exampleSentenceDe": "Wir sprechen zuerst über den ersten Punkt.",
    "exampleSentenceEs": "Hablamos primero sobre el primer punto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wir",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sprechen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zuerst über den ersten Punkt",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Realschule",
    "pron": "di re-ál-shu-le",
    "es": "la escuela secundaria intermedia",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Realschulen",
    "en": "a cute 3D isometric UI icon of a tidy intermediate secondary school building",
    "exampleSentenceDe": "Nach der Realschule machen viele eine Ausbildung.",
    "exampleSentenceEs": "Tras la Realschule muchos hacen una formación profesional.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach der Realschule",
        "role": "complement",
        "order": 1
      },
      {
        "text": "machen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eine Ausbildung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "Religion",
    "pron": "re-li-guión",
    "es": "religión (asignatura)",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1",
    "regimen": "Sin artículo como asignatura",
    "exampleSentenceDe": "Am Mittwochmorgen haben wir Religion.",
    "exampleSentenceEs": "El miércoles por la mañana tenemos religión.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Mittwochmorgen",
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
        "text": "Religion",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Rückmeldung",
    "pron": "di rǘk-mel-dung",
    "es": "la retroalimentación / confirmación",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Rückmeldungen",
    "exampleSentenceDe": "Ich warte noch auf eine Rückmeldung vom Chef.",
    "exampleSentenceEs": "Todavía espero una respuesta de confirmación del jefe.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "warte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch auf eine Rückmeldung vom Chef",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Schere",
    "pron": "di shé-re",
    "es": "las tijeras",
    "type": "Sustantivo (Fem)",
    "category": "Schulsachen",
    "level": "A1",
    "plural": "die Scheren",
    "en": "a cute 3D isometric UI icon of silver craft scissors with blue handles",
    "exampleSentenceDe": "Zum Basteln brauche ich Papier und eine Schere.",
    "exampleSentenceEs": "Para manualidades necesito papel y unas tijeras.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zum Basteln",
        "role": "complement",
        "order": 1
      },
      {
        "text": "brauche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Papier und eine Schere",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Schulfach",
    "pron": "das shúl-faj",
    "es": "la asignatura escolar",
    "type": "Sustantivo (Neutro)",
    "category": "Schule",
    "level": "A1",
    "plural": "die Schulfächer",
    "exampleSentenceDe": "Was war früher dein liebstes Schulfach?",
    "exampleSentenceEs": "¿Cuál era antes tu asignatura favorita?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Was",
        "role": "complement",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "früher dein liebstes Schulfach",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "die Schultasche",
    "pron": "di shúl-ta-she",
    "es": "la mochila escolar",
    "type": "Sustantivo (Fem)",
    "category": "Schulsachen",
    "level": "A1–A2",
    "plural": "die Schultaschen",
    "en": "a cute 3D isometric UI icon of a neat navy school satchel backpack",
    "exampleSentenceDe": "Die Hefte sind schon in der Schultasche.",
    "exampleSentenceEs": "Los cuadernos ya están en la mochila escolar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Hefte",
        "role": "subject",
        "order": 1
      },
      {
        "text": "sind",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "schon in der Schultasche",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Sonderschule",
    "pron": "di zón-da-shu-le",
    "es": "el centro de educación especial",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Sonderschulen",
    "en": "a cute 3D isometric UI icon of an accessible community special education school building with entrance ramp",
    "exampleSentenceDe": "Sonderschulen fördern Kinder mit besonderem Bedarf.",
    "exampleSentenceEs": "Los centros especiales apoyan a niños con necesidades específicas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sonderschulen",
        "role": "subject",
        "order": 1
      },
      {
        "text": "fördern",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Kinder mit besonderem Bedarf",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "Sozialkunde",
    "pron": "zo-tsiál-kun-de",
    "es": "ciencias sociales / cívica",
    "type": "Sustantivo (Fem)",
    "category": "Schulfächer",
    "level": "A1",
    "regimen": "Sin artículo",
    "exampleSentenceDe": "In Sozialkunde sprechen wir über Politik.",
    "exampleSentenceEs": "En ciencias sociales hablamos sobre política.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Sozialkunde",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sprechen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "über Politik",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Struktur",
    "pron": "di shtruk-túr",
    "es": "la estructura",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Strukturen",
    "exampleSentenceDe": "Der Satz hat eine klare Struktur.",
    "exampleSentenceEs": "La oración tiene una estructura clara.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Satz",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine klare Struktur",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Stufe",
    "pron": "di shtú-fe",
    "es": "el nivel / peldaño",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Stufen",
    "exampleSentenceDe": "Der Deutschkurs beginnt auf der Stufe B1.",
    "exampleSentenceEs": "El curso de alemán empieza en el nivel B1.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Deutschkurs",
        "role": "subject",
        "order": 1
      },
      {
        "text": "beginnt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "auf der Stufe B1",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Symbol",
    "pron": "das züm-ból",
    "es": "el símbolo",
    "type": "Sustantivo (Neutro)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Symbole",
    "exampleSentenceDe": "Dieses Symbol bedeutet: Fotografieren verboten!",
    "exampleSentenceEs": "Este símbolo significa: ¡Prohibido hacer fotos!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Dieses Symbol",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bedeutet:",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Fotografieren verboten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Tabelle",
    "pron": "di ta-bé-le",
    "es": "la tabla / cuadro",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Tabellen",
    "en": "a cute 3D isometric UI icon of a clean spreadsheet grid table with colored header cells",
    "exampleSentenceDe": "Ergänzen Sie die fehlenden Wörter in der Tabelle!",
    "exampleSentenceEs": "¡Complete las palabras que faltan en la tabla!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ergänzen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "die fehlenden Wörter in der Tabelle",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Tafel",
    "pron": "di tá-fel",
    "es": "la pizarra / tablero",
    "type": "Sustantivo (Fem)",
    "category": "Schule",
    "level": "B1",
    "plural": "die Tafeln",
    "en": "a cute 3D isometric UI icon of a green classroom chalkboard with wooden chalk tray",
    "exampleSentenceDe": "Der Lehrer schreibt die neuen Verben an die Tafel.",
    "exampleSentenceEs": "El profesor escribe los nuevos verbos en la pizarra.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Lehrer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schreibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die neuen Verben an die Tafel",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Textaufbau",
    "pron": "dea tékst-auf-bau",
    "es": "la estructura del texto",
    "type": "Sustantivo (Masc)",
    "category": "Prüfung",
    "level": "B1",
    "regimen": "Singular",
    "exampleSentenceDe": "Achten Sie beim Brief auf den richtigen Textaufbau.",
    "exampleSentenceEs": "Fíjese en la estructura correcta del texto en la carta.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Achten",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "beim Brief auf den richtigen Textaufbau",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Volkshochschule (VHS)",
    "pron": "di fólks-joj-shu-le",
    "es": "la universidad popular (cursos adultos)",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Volkshochschulen",
    "en": "a cute 3D isometric UI icon of a bright evening adult education community center building",
    "exampleSentenceDe": "Abends besuche ich einen Kurs an der Volkshochschule.",
    "exampleSentenceEs": "Por la tarde asisto a un curso en la universidad popular.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Abends",
        "role": "complement",
        "order": 1
      },
      {
        "text": "besuche",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "einen Kurs an der Volkshochschule",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Wörterbuch",
    "pron": "das vö́r-ta-buj",
    "es": "el diccionario",
    "type": "Sustantivo (Neutro)",
    "category": "Schulsachen",
    "level": "A2",
    "plural": "die Wörterbücher",
    "en": "a cute 3D isometric UI icon of a thick hardcover yellow dictionary book",
    "exampleSentenceDe": "Im Unterricht darf ich manchmal das Wörterbuch benutzen.",
    "exampleSentenceEs": "En clase a veces puedo utilizar el diccionario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Unterricht",
        "role": "complement",
        "order": 1
      },
      {
        "text": "darf",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "manchmal das Wörterbuch",
        "role": "complement",
        "order": 4
      },
      {
        "text": "benutzen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "zu|ordnen",
    "pron": "tsú-ord-nen",
    "es": "relacionar / emparejar / asignar",
    "type": "Verbo separable",
    "category": "Prüfung",
    "level": "B1",
    "regimen": "+ Dat + Akk / ordnet zu, hat zugeordnet",
    "exampleSentenceDe": "Ordnen Sie bitte die Aussagen den richtigen Texten zu.",
    "exampleSentenceEs": "Relacione por favor los enunciados con los textos correctos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ordnen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte die Aussagen den richtigen Texten",
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
    "de": "die Mittelschule",
    "pron": "di mí-tel-shu-le",
    "es": "la escuela secundaria media",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Mittelschulen",
    "en": "neat German secondary school building with pitched red roof and courtyard",
    "exampleSentenceDe": "In Bayern besuchen viele Schüler die Mittelschule.",
    "exampleSentenceEs": "En Baviera muchos alumnos asisten a la Mittelschule.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In Bayern",
        "role": "complement",
        "order": 1
      },
      {
        "text": "besuchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "viele Schüler",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Mittelschule",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "mangelhaft",
    "pron": "mán-guel-jaft",
    "es": "deficiente (nota 5 en Alemania)",
    "type": "Adjetivo",
    "category": "Bildung",
    "level": "B1",
    "regimen": "Nota escolar",
    "exampleSentenceDe": "Die Note Fünf bedeutet im Zeugnis mangelhaft.",
    "exampleSentenceEs": "La nota cinco significa deficiente en el boletín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Note Fünf",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bedeutet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Zeugnis mangelhaft",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "ungenügend",
    "pron": "ún-gue-nü-guent",
    "es": "insuficiente (nota 6 en Alemania)",
    "type": "Adjetivo",
    "category": "Bildung",
    "level": "B1",
    "regimen": "Nota escolar",
    "exampleSentenceDe": "Mit der Note Sechs ist die Prüfung leider ungenügend.",
    "exampleSentenceEs": "Con la nota seis el examen es lamentablemente insuficiente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mit der Note Sechs",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Prüfung",
        "role": "subject",
        "order": 3
      },
      {
        "text": "leider ungenügend",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Abschnitt",
    "pron": "dea áp-shnit",
    "es": "el apartado / párrafo / tramo",
    "type": "Sustantivo (Masc)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Abschnitte",
    "exampleSentenceDe": "Lesen Sie bitte zuerst den zweiten Abschnitt genau.",
    "exampleSentenceEs": "Lea primero con atención el segundo párrafo, por favor.",
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
        "text": "bitte zuerst den zweiten Abschnitt genau",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Auftrag",
    "pron": "dea áuf-trak",
    "es": "el encargo / orden de trabajo",
    "type": "Sustantivo (Masc)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Aufträge",
    "exampleSentenceDe": "Unsere Firma hat im Sommer viele neue Aufträge.",
    "exampleSentenceEs": "Nuestra empresa tiene en verano muchos encargos nuevos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Unsere Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "im Sommer viele neue Aufträge",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Aushilfe",
    "pron": "di áus-jil-fe",
    "es": "el ayudante / empleo temporal",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Aushilfen",
    "en": "cute 3D avatar of a friendly part-time shop helper wearing a green apron",
    "exampleSentenceDe": "Wir suchen eine freundliche Aushilfe für samstags.",
    "exampleSentenceEs": "Buscamos un ayudante amable para los sábados.",
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
        "text": "eine freundliche Aushilfe für samstags",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Beamte / die Beamtin",
    "pron": "dea be-ám-te",
    "es": "el funcionario / la funcionaria",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "regimen": "Declinación adjetival",
    "en": "cute 3D avatar of a formal civil servant official sitting behind a city hall desk",
    "exampleSentenceDe": "Meine Frau arbeitet als Beamtin im Rathaus.",
    "exampleSentenceEs": "Mi esposa trabaja como funcionaria en el ayuntamiento.",
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
        "text": "als Beamtin im Rathaus",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Betrieb",
    "pron": "dea be-tríp",
    "es": "la empresa / planta / funcionamiento",
    "type": "Sustantivo (Masc)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Betriebe",
    "en": "neat small craft workshop enterprise building with blue garage door",
    "exampleSentenceDe": "In diesem Handwerksbetrieb arbeiten zwölf Leute.",
    "exampleSentenceEs": "En esta empresa artesanal trabajan doce personas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In diesem Handwerksbetrieb",
        "role": "complement",
        "order": 1
      },
      {
        "text": "arbeiten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "zwölf Leute",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "der Betriebsrat",
    "pron": "dea be-tríps-rat",
    "es": "el comité de empresa",
    "type": "Sustantivo (Masc)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Betriebsräte",
    "exampleSentenceDe": "Der Betriebsrat vertritt die Interessen der Mitarbeiter.",
    "exampleSentenceEs": "El comité de empresa representa los intereses de los empleados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Betriebsrat",
        "role": "subject",
        "order": 1
      },
      {
        "text": "vertritt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die Interessen der Mitarbeiter",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Diplom",
    "pron": "das di-plóm",
    "es": "el diploma / título universitario",
    "type": "Sustantivo (Neutro)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Diplome",
    "en": "rolled parchment university diploma certificate tied with a red silk ribbon",
    "exampleSentenceDe": "Nach dem Studium erhielt sie ihr Diplom als Ingenieurin.",
    "exampleSentenceEs": "Tras los estudios recibió su diploma como ingeniera.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nach dem Studium",
        "role": "complement",
        "order": 1
      },
      {
        "text": "erhielt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ihr Diplom als Ingenieurin",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Direktor / die Direktorin",
    "pron": "dea di-rék-tor",
    "es": "el director / la directora",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Direktoren / -innen",
    "en": "cute 3D avatar of a welcoming school principal wearing glasses and a blazer",
    "exampleSentenceDe": "Der Direktor der Schule begrüßt die neuen Eltern.",
    "exampleSentenceEs": "El director del colegio saluda a los nuevos padres.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Der Direktor der Schule",
        "role": "subject",
        "order": 1
      },
      {
        "text": "begrüßt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "die neuen Eltern",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "entlassen",
    "pron": "ent-lá-sen",
    "es": "despedir / dar de alta (hospital)",
    "type": "Verbo inseparable irr.",
    "category": "Arbeitswelt",
    "level": "B1",
    "regimen": "+ Akk / entlässt, entließ, hat entlassen",
    "exampleSentenceDe": "Die Firma musste leider zwanzig Mitarbeiter entlassen.",
    "exampleSentenceEs": "Lamentablemente la empresa tuvo que despedir a veinte empleados.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Firma",
        "role": "subject",
        "order": 1
      },
      {
        "text": "musste",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "leider zwanzig Mitarbeiter",
        "role": "complement",
        "order": 3
      },
      {
        "text": "entlassen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Experte",
    "pron": "dea eks-pér-te",
    "es": "el experto / especialista",
    "type": "Sustantivo (Masc)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Experten (Fem: -in)",
    "en": "cute 3D avatar of a knowledgeable technical specialist holding a clipboard",
    "exampleSentenceDe": "Für Solaranlagen ist er ein echter Experte.",
    "exampleSentenceEs": "Para instalaciones solares él es un auténtico experto.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für Solaranlagen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "er",
        "role": "subject",
        "order": 3
      },
      {
        "text": "ein echter Experte",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Fabrik",
    "pron": "di fa-brík",
    "es": "la fábrica",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "A2–B1",
    "plural": "die Fabriken",
    "en": "modern industrial automobile factory building with clean glass facade and loading bays",
    "exampleSentenceDe": "Mein Bruder arbeitet in einer großen Autofabrik.",
    "exampleSentenceEs": "Mi hermano trabaja en una gran fábrica de automóviles.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein Bruder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "in einer großen Autofabrik",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Fachmann / die Fachfrau",
    "pron": "dea fáj-man",
    "es": "el especialista / técnico experto",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Fachleute",
    "en": "cute 3D avatar of a skilled technical specialist inspecting a home appliance with a multimeter",
    "exampleSentenceDe": "Lassen Sie das Gerät am besten vom Fachmann prüfen.",
    "exampleSentenceEs": "Haga revisar el aparato preferiblemente por un especialista.",
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
        "text": "das Gerät am besten vom Fachmann",
        "role": "complement",
        "order": 3
      },
      {
        "text": "prüfen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "die Forschung",
    "pron": "di fór-shung",
    "es": "la investigación (científica)",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Forschungen",
    "exampleSentenceDe": "Sie arbeitet an der Universität in der Forschung.",
    "exampleSentenceEs": "Ella trabaja en la universidad en investigación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "arbeitet",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "an der Universität in der Forschung",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Fortbildung",
    "pron": "di fórt-bil-dung",
    "es": "la formación continua / perfeccionamiento",
    "type": "Sustantivo (Fem)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Fortbildungen",
    "exampleSentenceDe": "Nächsten Monat mache ich eine berufliche Fortbildung.",
    "exampleSentenceEs": "El mes que viene hago un curso de perfeccionamiento profesional.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Nächsten Monat",
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
        "text": "eine berufliche Fortbildung",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Gewerkschaft",
    "pron": "di gue-vérk-shaft",
    "es": "el sindicato",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Gewerkschaften",
    "exampleSentenceDe": "Die Gewerkschaft verhandelt über höhere Löhne.",
    "exampleSentenceEs": "El sindicato negocia sobre salarios más altos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Gewerkschaft",
        "role": "subject",
        "order": 1
      },
      {
        "text": "verhandelt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über höhere Löhne",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Grafik",
    "pron": "di grá-fik",
    "es": "el gráfico / diagrama",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Grafiken",
    "en": "colorful three-dimensional bar chart and pie graph sheet on a clean clipboard without text",
    "exampleSentenceDe": "Beschreiben Sie bitte die Informationen in der Grafik!",
    "exampleSentenceEs": "¡Describa por favor la información del gráfico!",
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
        "text": "bitte die Informationen in der Grafik",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Inhalt",
    "pron": "dea ín-jalt",
    "es": "el contenido",
    "type": "Sustantivo (Masc)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Inhalte",
    "exampleSentenceDe": "Erklären Sie den Inhalt und die Struktur Ihrer Präsentation.",
    "exampleSentenceEs": "Explique el contenido y la estructura de su presentación.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Erklären",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "den Inhalt und die Struktur Ihrer Präsentation",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Kursleiter / die Kursleiterin",
    "pron": "dea kúrs-lai-ta",
    "es": "el profesor / la profesora (de curso)",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Schule",
    "level": "A1",
    "plural": "die Kursleiter / -innen",
    "en": "friendly course instructor standing beside a classroom whiteboard holding a marker",
    "exampleSentenceDe": "Die Kursleiterin erklärt uns heute die Grammatikregeln.",
    "exampleSentenceEs": "La profesora del curso nos explica hoy las reglas gramaticales.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die Kursleiterin",
        "role": "subject",
        "order": 1
      },
      {
        "text": "erklärt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns heute die Grammatikregeln",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Lohn",
    "pron": "dea lon",
    "es": "el sueldo / salario (obrero)",
    "type": "Sustantivo (Masc)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Löhne",
    "exampleSentenceDe": "Sie bekommen Ihren Lohn immer am Ende des Monats.",
    "exampleSentenceEs": "Usted recibe su sueldo siempre a final de mes.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bekommen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Ihren Lohn immer am Ende des Monats",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "markieren",
    "pron": "mar-kí-ren",
    "es": "marcar / subrayar",
    "type": "Verbo (-ieren)",
    "category": "Prüfung",
    "level": "A1–B1",
    "regimen": "+ Akk / markiert, markierte, hat markiert",
    "exampleSentenceDe": "Markieren Sie im Text alle wichtigen Informationen!",
    "exampleSentenceEs": "¡Marque en el texto toda la información importante!",
    "exampleSentenceDeBlocks": [
      {
        "text": "Markieren",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "im Text alle wichtigen Informationen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Messe",
    "pron": "di mé-se",
    "es": "la feria (exposición)",
    "type": "Sustantivo (Fem)",
    "category": "Arbeitswelt",
    "level": "B1",
    "plural": "die Messen",
    "exampleSentenceDe": "Kommst du nächste Woche mit zur großen Automobilmesse?",
    "exampleSentenceEs": "¿Vienes la semana que viene a la gran feria del automóvil?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Kommst",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "nächste Woche",
        "role": "complement",
        "order": 3
      },
      {
        "text": "mit",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "zur großen Automobilmesse",
        "role": "complement",
        "order": 5
      }
    ]
  },
  {
    "de": "ordnen",
    "pron": "ór-dnen",
    "es": "ordenar / organizar",
    "type": "Verbo regular",
    "category": "Prüfung",
    "level": "B1",
    "regimen": "+ Akk / ordnet, ordnete, hat geordnet",
    "exampleSentenceDe": "Letztes Wochenende habe ich meine Dokumente geordnet.",
    "exampleSentenceEs": "El fin de semana pasado ordené mis documentos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Letztes Wochenende",
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
        "text": "meine Dokumente",
        "role": "complement",
        "order": 4
      },
      {
        "text": "geordnet",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der Profi",
    "pron": "dea pró-fi",
    "es": "el profesional",
    "type": "Sustantivo (Masc)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Profis",
    "en": "skilled technician in clean uniform holding a toolbox and tablet",
    "exampleSentenceDe": "Er repariert den Computer schnell, er ist doch ein Profi.",
    "exampleSentenceEs": "Él repara el ordenador rápido, es todo un profesional.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Er",
        "role": "subject",
        "order": 1
      },
      {
        "text": "repariert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "den Computer schnell,",
        "role": "complement",
        "order": 3
      },
      {
        "text": "er",
        "role": "subject",
        "order": 4
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "doch ein Profi",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "das Programm",
    "pron": "das pro-grám",
    "es": "el programa (TV/software)",
    "type": "Sustantivo (Neutro)",
    "category": "Prüfung",
    "level": "A1–B1",
    "plural": "die Programme",
    "exampleSentenceDe": "Mit welchen Programmen arbeitest du am Computer am liebsten?",
    "exampleSentenceEs": "¿Con qué programas trabajas preferiblemente en el ordenador?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mit welchen Programmen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "arbeitest",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "du",
        "role": "subject",
        "order": 3
      },
      {
        "text": "am Computer am liebsten",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Raum",
    "pron": "dea raum",
    "es": "la sala / habitación",
    "type": "Sustantivo (Masc)",
    "category": "Schule",
    "level": "A1",
    "plural": "die Räume",
    "en": "bright modern classroom and office room with wooden door, table, and chairs",
    "exampleSentenceDe": "Für die Anmeldung gehen Sie bitte in Raum neunzehn.",
    "exampleSentenceEs": "Para la inscripción vaya por favor a la sala diecinueve.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für die Anmeldung",
        "role": "complement",
        "order": 1
      },
      {
        "text": "gehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "bitte in Raum neunzehn",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Schriftsteller / die Schriftstellerin",
    "pron": "dea shríft-shte-la",
    "es": "el escritor / la escritora",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Schriftsteller / -innen",
    "en": "a cute 3D isometric avatar of a creative writer sitting at a desk with a notebook and pen",
    "exampleSentenceDe": "Kennst du diese Schriftstellerin? Ich liebe ihre Bücher.",
    "exampleSentenceEs": "¿Conoces a esta escritora? Me encantan sus libros.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Kennst",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "du",
        "role": "subject",
        "order": 2
      },
      {
        "text": "diese Schriftstellerin?",
        "role": "complement",
        "order": 3
      },
      {
        "text": "Ich",
        "role": "subject",
        "order": 4
      },
      {
        "text": "liebe",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "ihre Bücher",
        "role": "complement",
        "order": 6
      }
    ]
  },
  {
    "de": "die Stellungnahme",
    "pron": "di shté-lung-na-me",
    "es": "la toma de postura / opinión",
    "type": "Sustantivo (Fem)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Stellungnahmen",
    "exampleSentenceDe": "Schreiben Sie eine kurze Stellungnahme zu diesem Text.",
    "exampleSentenceEs": "Escriba una breve toma de postura sobre este texto.",
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
        "text": "eine kurze Stellungnahme zu diesem Text",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Steward / die Stewardess",
    "pron": "dea shtíu-art / di shtíu-a-des",
    "es": "el auxiliar de vuelo / la azafata",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Stewards / die Stewardessen",
    "en": "a cute 3D isometric avatar of a friendly flight attendant in navy uniform holding a serving tray",
    "exampleSentenceDe": "Die freundliche Stewardess bringt uns das Mittagessen.",
    "exampleSentenceEs": "La amable azafata nos trae el almuerzo.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Die freundliche Stewardess",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bringt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "uns das Mittagessen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Stift",
    "pron": "dea shtift",
    "es": "el rotulador / lápiz / bolígrafo",
    "type": "Sustantivo (Masc)",
    "category": "Schulsachen",
    "level": "A1",
    "plural": "die Stifte",
    "en": "a cute 3D isometric UI icon of a bright blue ballpoint pen and wooden pencil",
    "exampleSentenceDe": "Kannst du mir bitte für die Prüfung einen blauen Stift geben?",
    "exampleSentenceEs": "¿Me puedes dar un bolígrafo azul para el examen, por favor?",
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
        "text": "mir bitte für die Prüfung einen blauen Stift",
        "role": "complement",
        "order": 3
      },
      {
        "text": "geben",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "das Stipendium",
    "pron": "das shti-pén-dium",
    "es": "la beca (estudios)",
    "type": "Sustantivo (Neutro)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Stipendien",
    "exampleSentenceDe": "Für sein Masterstudium im Ausland hat er ein Stipendium bekommen.",
    "exampleSentenceEs": "Para su máster en el extranjero ha recibido una beca.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für sein Masterstudium im Ausland",
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
        "text": "ein Stipendium",
        "role": "complement",
        "order": 4
      },
      {
        "text": "bekommen",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "studieren",
    "pron": "shtu-dí-ren",
    "es": "estudiar (en universidad)",
    "type": "Verbo (-ieren)",
    "category": "Bildung",
    "level": "A1",
    "regimen": "+ Akk / studiert, studierte, hat studiert",
    "exampleSentenceDe": "Mein ältester Sohn will nach dem Abitur Medizin in Mainz studieren.",
    "exampleSentenceEs": "Mi hijo mayor quiere estudiar medicina en Maguncia tras el bachillerato.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein ältester Sohn",
        "role": "subject",
        "order": 1
      },
      {
        "text": "will",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "nach dem Abitur Medizin in Mainz",
        "role": "complement",
        "order": 3
      },
      {
        "text": "studieren",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Studierende",
    "pron": "dea shtu-dí-ren-de",
    "es": "el estudiante (neutro/universitario)",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Bildung",
    "level": "B1",
    "regimen": "Declinación adjetival",
    "en": "a cute 3D isometric avatar of a university student wearing a backpack and holding textbooks",
    "exampleSentenceDe": "Zehn motivierte Studierende besuchen dieses freiwillige Seminar.",
    "exampleSentenceEs": "Diez estudiantes motivados asisten a este seminario voluntario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Zehn motivierte Studierende",
        "role": "subject",
        "order": 1
      },
      {
        "text": "besuchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "dieses freiwillige Seminar",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Studium",
    "pron": "das shtú-dium",
    "es": "la carrera universitaria / estudios",
    "type": "Sustantivo (Neutro)",
    "category": "Bildung",
    "level": "B1",
    "plural": "die Studien",
    "exampleSentenceDe": "Sie brauchen für diese anspruchsvolle Stelle ein abgeschlossenes Studium.",
    "exampleSentenceEs": "Usted necesita una carrera universitaria finalizada para este puesto exigente.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "brauchen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "für diese anspruchsvolle Stelle ein abgeschlossenes Studium",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Thema",
    "pron": "das té-ma",
    "es": "el tema",
    "type": "Sustantivo (Neutro)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Themen",
    "exampleSentenceDe": "Wir haben im Integrationskurs viel über das Thema Umwelt gesprochen.",
    "exampleSentenceEs": "Hemos hablado mucho sobre el tema del medio ambiente en el curso.",
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
        "text": "im Integrationskurs viel über das Thema Umwelt",
        "role": "complement",
        "order": 3
      },
      {
        "text": "gesprochen",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "üben",
    "pron": "ǘ-ben",
    "es": "practicar / ensayar",
    "type": "Verbo regular",
    "category": "Schule",
    "level": "A1–B1",
    "regimen": "+ Akk / übt, übte, hat geübt",
    "exampleSentenceDe": "Ich lerne gerade Gitarre spielen und übe jeden Tag zwei Stunden.",
    "exampleSentenceEs": "Estoy aprendiendo a tocar la guitarra y practico dos horas al día.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "lerne",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "gerade Gitarre",
        "role": "complement",
        "order": 3
      },
      {
        "text": "spielen",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "und",
        "role": "complement",
        "order": 5
      },
      {
        "text": "übe",
        "role": "verb_p1",
        "order": 6
      },
      {
        "text": "jeden Tag zwei Stunden",
        "role": "complement",
        "order": 7
      }
    ]
  },
  {
    "de": "die Übung",
    "pron": "di ǘ-bung",
    "es": "el ejercicio / práctica",
    "type": "Sustantivo (Fem)",
    "category": "Schule",
    "level": "B1",
    "plural": "die Übungen",
    "exampleSentenceDe": "Diese Grammatikübung am Computer war für mich sehr schwer.",
    "exampleSentenceEs": "Este ejercicio de gramática en el ordenador me resultó muy difícil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Diese Grammatikübung am Computer",
        "role": "subject",
        "order": 1
      },
      {
        "text": "war",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "für mich sehr schwer",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Unternehmer / die Unternehmerin",
    "pron": "dea un-ta-né-ma",
    "es": "el empresario / la empresaria",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Berufe",
    "level": "B1",
    "plural": "die Unternehmer / -innen",
    "en": "a cute 3D isometric avatar of a confident business entrepreneur in a blazer holding a tablet",
    "exampleSentenceDe": "Sie ist eine sehr erfolgreiche Unternehmerin in der Solarbranche.",
    "exampleSentenceEs": "Ella es una empresaria muy exitosa en el sector solar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine sehr erfolgreiche Unternehmerin in der Solarbranche",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "unterrichten",
    "pron": "un-ta-ríj-ten",
    "es": "dar clase / enseñar",
    "type": "Verbo inseparable",
    "category": "Schule",
    "level": "B1",
    "regimen": "+ Akk / unterrichtet, unterrichtete, hat unterrichtet",
    "exampleSentenceDe": "Meine Frau arbeitet als Lehrerin und unterrichtet Spanisch.",
    "exampleSentenceEs": "Mi esposa trabaja como profesora y enseña español.",
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
        "text": "als Lehrerin und",
        "role": "complement",
        "order": 3
      },
      {
        "text": "unterrichtet",
        "role": "verb_p1",
        "order": 4
      },
      {
        "text": "Spanisch",
        "role": "complement",
        "order": 5
      }
    ]
  },
  {
    "de": "das Zertifikat",
    "pron": "das tsea-ti-fi-kát",
    "es": "el certificado (oficial)",
    "type": "Sustantivo (Neutro)",
    "category": "Prüfung",
    "level": "B1",
    "plural": "die Zertifikate",
    "en": "a cute 3D isometric UI icon of an official rolled diploma certificate tied with a ribbon and gold seal",
    "exampleSentenceDe": "Wenn ich die Prüfung schaffe, bekomme ich ein B1-Zertifikat.",
    "exampleSentenceEs": "Si apruebo el examen, obtengo un certificado B1.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wenn",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 2
      },
      {
        "text": "die Prüfung",
        "role": "complement",
        "order": 3
      },
      {
        "text": "schaffe,",
        "role": "verb_p2",
        "order": 4
      },
      {
        "text": "bekomme",
        "role": "verb_p1",
        "order": 5
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 6
      },
      {
        "text": "ein B1-Zertifikat",
        "role": "complement",
        "order": 7
      }
    ]
  }
]
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
  },
  {
    "de": "der Blog",
    "pron": "dea blok",
    "es": "el blog",
    "type": "Sustantivo (Masc)",
    "category": "Internet",
    "level": "B1",
    "plural": "die Blogs",
    "exampleSentenceDe": "Sie schreibt einen Blog über das Leben in Berlin.",
    "exampleSentenceEs": "Ella escribe un blog sobre la vida en Berlín.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sie",
        "role": "subject",
        "order": 1
      },
      {
        "text": "schreibt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "einen Blog über das Leben in Berlin",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "bloggen",
    "pron": "bló-guen",
    "es": "bloguear",
    "type": "Verbo regular",
    "category": "Internet",
    "level": "B1",
    "regimen": "bloggt, bloggte, hat gebloggt",
    "exampleSentenceDe": "Viele junge Leute bloggen über Reisen und Kochen.",
    "exampleSentenceEs": "Muchos jóvenes bloguean sobre viajes y cocina.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele junge Leute",
        "role": "subject",
        "order": 1
      },
      {
        "text": "bloggen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "über Reisen und Kochen",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der CD-Player",
    "pron": "dea tse-dé-pléi-a",
    "es": "el reproductor de CD",
    "type": "Sustantivo (Masc)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die CD-Player",
    "en": "a cute 3D isometric UI icon of a compact silver portable CD player with disc slot",
    "exampleSentenceDe": "Im alten Auto ist noch ein CD-Player eingebaut.",
    "exampleSentenceEs": "En el coche antiguo aún hay un reproductor de CD instalado.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im alten Auto",
        "role": "complement",
        "order": 1
      },
      {
        "text": "ist",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "noch ein CD-Player",
        "role": "subject",
        "order": 3
      },
      {
        "text": "eingebaut",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der Chat(room)",
    "pron": "dea chet(-rum)",
    "es": "el chat / sala de chat",
    "type": "Sustantivo (Masc)",
    "category": "Internet",
    "level": "B1",
    "plural": "die Chats",
    "exampleSentenceDe": "Im Chat tauschen wir Hausaufgaben aus.",
    "exampleSentenceEs": "En el chat intercambiamos las tareas.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Chat",
        "role": "complement",
        "order": 1
      },
      {
        "text": "tauschen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Hausaufgaben",
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
    "de": "chatten",
    "pron": "ché-ten",
    "es": "chatear",
    "type": "Verbo regular",
    "category": "Internet",
    "level": "B1",
    "regimen": "mit + Dat / chattet, chattete, hat gechattet",
    "exampleSentenceDe": "Abends chatte ich oft mit meiner Familie in Spanien.",
    "exampleSentenceEs": "Por la noche chateo a menudo con mi familia en España.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Abends",
        "role": "complement",
        "order": 1
      },
      {
        "text": "chatte",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "oft mit meiner Familie in Spanien",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "checken",
    "pron": "ché-ken",
    "es": "comprobar / revisar",
    "type": "Verbo regular",
    "category": "Software",
    "level": "B1",
    "regimen": "+ Akk / checkt, checkte, hat gecheckt",
    "exampleSentenceDe": "Morgens checke ich zuerst meine E-Mails.",
    "exampleSentenceEs": "Por la mañana reviso primero mis correos electrónicos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Morgens",
        "role": "complement",
        "order": 1
      },
      {
        "text": "checke",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "zuerst meine E-Mails",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Chip",
    "pron": "dea chip",
    "es": "el chip / microchip",
    "type": "Sustantivo (Masc)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die Chips",
    "en": "a cute 3D isometric UI icon of a black silicon electronic microchip with gold contact pins",
    "exampleSentenceDe": "In jeder neuen Bankkarte sitzt ein kleiner Chip.",
    "exampleSentenceEs": "En cada tarjeta bancaria nueva hay un pequeño chip.",
    "exampleSentenceDeBlocks": [
      {
        "text": "In jeder neuen Bankkarte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "sitzt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein kleiner Chip",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "die DVD",
    "pron": "di de-fau-dé",
    "es": "el DVD",
    "type": "Sustantivo (Fem)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die DVDs",
    "en": "a cute 3D isometric UI icon of an iridescent optical DVD movie disc",
    "exampleSentenceDe": "Wir haben diesen alten Film noch auf DVD.",
    "exampleSentenceEs": "Aún tenemos esta película antigua en DVD.",
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
        "text": "diesen alten Film noch auf DVD",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das E-Book",
    "pron": "das í-buk",
    "es": "el libro electrónico (archivo)",
    "type": "Sustantivo (Neutro)",
    "category": "Software",
    "level": "B1",
    "plural": "die E-Books",
    "exampleSentenceDe": "Für den Urlaub lade ich drei E-Books herunter.",
    "exampleSentenceEs": "Para las vacaciones descargo tres libros electrónicos.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für den Urlaub",
        "role": "complement",
        "order": 1
      },
      {
        "text": "lade",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "drei E-Books",
        "role": "complement",
        "order": 4
      },
      {
        "text": "herunter",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "der E-Reader",
    "pron": "dea í-ri-da",
    "es": "el lector de libros electrónicos",
    "type": "Sustantivo (Masc)",
    "category": "Hardware",
    "level": "A1",
    "plural": "die E-Reader",
    "en": "a cute 3D isometric UI icon of a slim matte-black e-ink digital book reader tablet",
    "exampleSentenceDe": "Hast du meinen neuen E-Reader gesehen?",
    "exampleSentenceEs": "¿Has visto mi nuevo lector de libros electrónicos?",
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
        "text": "meinen neuen E-Reader",
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
    "de": "googeln",
    "pron": "gú-gueln",
    "es": "buscar en Google",
    "type": "Verbo regular",
    "category": "Internet",
    "level": "B1",
    "regimen": "+ Akk / googelt, googelte, hat gegoogelt",
    "exampleSentenceDe": "Wenn ich ein Wort nicht kenne, muss ich es googeln.",
    "exampleSentenceEs": "Cuando no conozco una palabra, tengo que buscarla en Google.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wenn ich ein Wort nicht kenne,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "muss",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ich",
        "role": "subject",
        "order": 3
      },
      {
        "text": "es",
        "role": "complement",
        "order": 4
      },
      {
        "text": "googeln",
        "role": "verb_p2",
        "order": 5
      }
    ]
  },
  {
    "de": "die Homepage",
    "pron": "di jóum-peich",
    "es": "la página web / sitio oficial",
    "type": "Sustantivo (Fem)",
    "category": "Internet",
    "level": "B1",
    "plural": "die Homepages",
    "exampleSentenceDe": "Alle Öffnungszeiten stehen auf unserer Homepage.",
    "exampleSentenceEs": "Todos los horarios figuran en nuestra página web.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Alle Öffnungszeiten",
        "role": "subject",
        "order": 1
      },
      {
        "text": "stehen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "auf unserer Homepage",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "live",
    "pron": "laif",
    "es": "en directo / en vivo",
    "type": "Adverbio / Adjetivo",
    "category": "Internet",
    "level": "B1",
    "regimen": "Invariable",
    "exampleSentenceDe": "Wir sehen das Konzert heute Abend live im Internet.",
    "exampleSentenceEs": "Vemos el concierto esta noche en directo por internet.",
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
        "text": "das Konzert heute Abend live im Internet",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mailbox",
    "pron": "di méil-boks",
    "es": "el buzón de correo / de voz",
    "type": "Sustantivo (Fem)",
    "category": "Internet",
    "level": "B1",
    "plural": "die Mailboxen",
    "exampleSentenceDe": "Hinterlassen Sie bitte eine Nachricht auf der Mailbox.",
    "exampleSentenceEs": "Por favor, deje un mensaje en el buzón de voz.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Hinterlassen",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "bitte eine Nachricht auf der Mailbox",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "mailen",
    "pron": "méi-len",
    "es": "enviar por correo electrónico",
    "type": "Verbo regular",
    "category": "Internet",
    "level": "B1",
    "regimen": "+ Dat / mailt, mailte, hat gemailt",
    "exampleSentenceDe": "Ich maile Ihnen das Formular noch heute Nachmittag.",
    "exampleSentenceEs": "Le envío por correo el formulario esta misma tarde.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ich",
        "role": "subject",
        "order": 1
      },
      {
        "text": "maile",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Ihnen das Formular noch heute Nachmittag",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die Mobilbox",
    "pron": "di mo-bíl-boks",
    "es": "el buzón de voz móvil",
    "type": "Sustantivo (Fem)",
    "category": "Internet",
    "level": "B1",
    "plural": "die Mobilboxen",
    "exampleSentenceDe": "Sein Handy ist aus, die Mobilbox geht ran.",
    "exampleSentenceEs": "Su móvil está apagado, salta el buzón de voz.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Sein Handy ist aus,",
        "role": "complement",
        "order": 1
      },
      {
        "text": "die Mobilbox",
        "role": "subject",
        "order": 2
      },
      {
        "text": "geht",
        "role": "verb_p1",
        "order": 3
      },
      {
        "text": "ran",
        "role": "verb_p2",
        "order": 4
      }
    ]
  },
  {
    "de": "der MP3-Player",
    "pron": "dea em-pe-drái-plei-a",
    "es": "el reproductor MP3",
    "type": "Sustantivo (Masc)",
    "category": "Hardware",
    "level": "A1",
    "plural": "die MP3-Player",
    "en": "a cute 3D isometric UI icon of a sleek blue pocket MP3 music player with wired earphones",
    "exampleSentenceDe": "Für die Zugfahrt nehme ich den MP3-Player mit.",
    "exampleSentenceEs": "Para el viaje en tren me llevo el reproductor MP3.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Für die Zugfahrt",
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
        "text": "den MP3-Player",
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
    "de": "der PC",
    "pron": "dea pe-tsé",
    "es": "el ordenador personal (PC)",
    "type": "Sustantivo (Masc)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die PCs",
    "en": "a cute 3D isometric UI icon of a silver desktop PC tower with monitor and keyboard",
    "exampleSentenceDe": "Im Büro arbeite ich täglich acht Stunden am PC.",
    "exampleSentenceEs": "En la oficina trabajo ocho horas diarias en el PC.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Büro",
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
        "text": "täglich acht Stunden am PC",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "die Plattform",
    "pron": "di plát-form",
    "es": "la plataforma (digital)",
    "type": "Sustantivo (Fem)",
    "category": "Software",
    "level": "B1",
    "plural": "die Plattformen",
    "exampleSentenceDe": "Auf dieser Lernplattform üben wir Vokabeln.",
    "exampleSentenceEs": "En esta plataforma de aprendizaje practicamos vocabulario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Auf dieser Lernplattform",
        "role": "complement",
        "order": 1
      },
      {
        "text": "üben",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Vokabeln",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "das Smartphone",
    "pron": "das smárt-foun",
    "es": "el teléfono inteligente",
    "type": "Sustantivo (Neutro)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die Smartphones",
    "en": "a cute 3D isometric UI icon of a sleek modern touchscreen smartphone",
    "exampleSentenceDe": "Fast jeder nutzt heute eine App auf dem Smartphone.",
    "exampleSentenceEs": "Casi todo el mundo usa hoy una app en el smartphone.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Fast jeder",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nutzt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "heute eine App auf dem Smartphone",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "die/das SMS",
    "pron": "di/das es-em-és",
    "es": "el mensaje de texto (SMS)",
    "type": "Sustantivo (Fem/Neutro)",
    "category": "Internet",
    "level": "B1",
    "plural": "die SMS",
    "exampleSentenceDe": "Schick mir einfach eine kurze SMS, wenn du ankommst.",
    "exampleSentenceEs": "Mándame simplemente un SMS corto cuando llegues.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Schick",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "mir einfach eine kurze SMS, wenn du",
        "role": "complement",
        "order": 2
      },
      {
        "text": "ankommst",
        "role": "verb_p2",
        "order": 3
      }
    ]
  },
  {
    "de": "die Software",
    "pron": "di sóft-ver",
    "es": "el software / programa",
    "type": "Sustantivo (Fem)",
    "category": "Software",
    "level": "B1",
    "plural": "die Softwares",
    "exampleSentenceDe": "Heute installieren wir die neue Software auf dem Laptop.",
    "exampleSentenceEs": "Hoy instalamos el nuevo software en el portátil.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Heute",
        "role": "complement",
        "order": 1
      },
      {
        "text": "installieren",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die neue Software auf dem Laptop",
        "role": "complement",
        "order": 4
      }
    ]
  },
  {
    "de": "der Terminal",
    "pron": "dea tér-mi-nal",
    "es": "el terminal / quiosco digital",
    "type": "Sustantivo (Masc)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die Terminals",
    "en": "a cute 3D isometric UI icon of a standing self-service train ticket kiosk terminal",
    "exampleSentenceDe": "Am Terminal im Bahnhof druckt man die Fahrkarte aus.",
    "exampleSentenceEs": "En el terminal de la estación se imprime el billete.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Terminal im Bahnhof",
        "role": "complement",
        "order": 1
      },
      {
        "text": "druckt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "man",
        "role": "subject",
        "order": 3
      },
      {
        "text": "die Fahrkarte",
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
    "de": "das TV",
    "pron": "das te-fáu",
    "es": "la televisión (TV)",
    "type": "Sustantivo (Neutro)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die TVs",
    "en": "a cute 3D isometric UI icon of a sleek modern flat-screen television",
    "exampleSentenceDe": "Am Abend schalten wir manchmal das TV ein.",
    "exampleSentenceEs": "Por la noche encendemos a veces la televisión.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Am Abend",
        "role": "complement",
        "order": 1
      },
      {
        "text": "schalten",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "manchmal das TV",
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
    "de": "twittern",
    "pron": "tví-tern",
    "es": "tuitear / publicar en X",
    "type": "Verbo regular",
    "category": "Internet",
    "level": "B1",
    "regimen": "twittert, twitterte, hat getwittert",
    "exampleSentenceDe": "Viele Journalisten twittern aktuelle Nachrichten.",
    "exampleSentenceEs": "Muchos periodistas tuitean noticias de actualidad.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele Journalisten",
        "role": "subject",
        "order": 1
      },
      {
        "text": "twittern",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "aktuelle Nachrichten",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "der Spot",
    "pron": "dea shpot",
    "es": "el anuncio / cuña publicitaria",
    "type": "Sustantivo (Masc)",
    "category": "Medien",
    "level": "B1",
    "plural": "die Spots",
    "exampleSentenceDe": "Im Fernsehen läuft ein neuer Werbespot.",
    "exampleSentenceEs": "En la televisión emiten un nuevo anuncio publicitario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Fernsehen",
        "role": "complement",
        "order": 1
      },
      {
        "text": "läuft",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "ein neuer Werbespot",
        "role": "subject",
        "order": 3
      }
    ]
  },
  {
    "de": "der User / die Userin",
    "pron": "dea yú-za",
    "es": "el usuario / la usuaria",
    "type": "Sustantivo (Masc/Fem)",
    "category": "Internet",
    "level": "B1",
    "plural": "die User / -innen",
    "en": "cute 3D avatar of a young person smiling while using a smartphone learning app",
    "exampleSentenceDe": "Viele User nutzen diese Lern-App täglich.",
    "exampleSentenceEs": "Muchos usuarios utilizan esta aplicación de aprendizaje a diario.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Viele User",
        "role": "subject",
        "order": 1
      },
      {
        "text": "nutzen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "diese Lern-App täglich",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "an|klicken",
    "pron": "án-kli-ken",
    "es": "hacer clic en",
    "type": "Verbo separable",
    "category": "Software",
    "level": "B1",
    "regimen": "+ Akk / klickt an, klickte an, hat angeklickt",
    "en": "index finger pressing a glowing green button on a white computer mouse",
    "exampleSentenceDe": "Bitte klicken Sie den grünen Button zum Starten an.",
    "exampleSentenceEs": "Por favor, haga clic en el botón verde para empezar.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Bitte",
        "role": "complement",
        "order": 1
      },
      {
        "text": "klicken",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 3
      },
      {
        "text": "den grünen Button zum Starten",
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
    "de": "die Fernbedienung",
    "pron": "di férn-be-di-nung",
    "es": "el mando a distancia / control remoto",
    "type": "Sustantivo (Fem)",
    "category": "Hardware",
    "level": "A2–B1",
    "plural": "die Fernbedienungen",
    "en": "sleek black television remote control with colorful silicone buttons",
    "exampleSentenceDe": "Wo liegt denn schon wieder die Fernbedienung?",
    "exampleSentenceEs": "¿Dónde está otra vez el mando a distancia?",
    "exampleSentenceDeBlocks": [
      {
        "text": "Wo",
        "role": "complement",
        "order": 1
      },
      {
        "text": "liegt",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "denn schon wieder",
        "role": "complement",
        "order": 3
      },
      {
        "text": "die Fernbedienung",
        "role": "subject",
        "order": 4
      }
    ]
  },
  {
    "de": "die Festplatte",
    "pron": "di fést-pla-te",
    "es": "el disco duro",
    "type": "Sustantivo (Fem)",
    "category": "Hardware",
    "level": "B1",
    "plural": "die Festplatten",
    "en": "metallic silver internal computer hard drive showing spinning magnetic platter",
    "exampleSentenceDe": "Mein neuer Laptop hat eine sehr schnelle Festplatte.",
    "exampleSentenceEs": "Mi nuevo portátil tiene un disco duro muy rápido.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Mein neuer Laptop",
        "role": "subject",
        "order": 1
      },
      {
        "text": "hat",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "eine sehr schnelle Festplatte",
        "role": "complement",
        "order": 3
      }
    ]
  },
  {
    "de": "das Forum",
    "pron": "das fó-rum",
    "es": "el foro (de internet)",
    "type": "Sustantivo (Neutro)",
    "category": "Internet",
    "level": "B1",
    "plural": "die Foren",
    "exampleSentenceDe": "Im Forum tauschen wir Tipps zum Deutschlernen aus.",
    "exampleSentenceEs": "En el foro intercambiamos consejos para aprender alemán.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Im Forum",
        "role": "complement",
        "order": 1
      },
      {
        "text": "tauschen",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "wir",
        "role": "subject",
        "order": 3
      },
      {
        "text": "Tipps zum Deutschlernen",
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
    "de": "das Gerät",
    "pron": "das gue-rét",
    "es": "el aparato / dispositivo",
    "type": "Sustantivo (Neutro)",
    "category": "Hardware",
    "level": "A2–B1",
    "plural": "die Geräte",
    "en": "modern compact electronic digital device with power switch and glowing LED indicator",
    "exampleSentenceDe": "Schalten Sie das Gerät nach der Arbeit bitte aus.",
    "exampleSentenceEs": "Apague el dispositivo después del trabajo, por favor.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Schalten",
        "role": "verb_p1",
        "order": 1
      },
      {
        "text": "Sie",
        "role": "subject",
        "order": 2
      },
      {
        "text": "das Gerät nach der Arbeit bitte",
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
    "de": "der Klick",
    "pron": "dea klik",
    "es": "el clic",
    "type": "Sustantivo (Masc)",
    "category": "Software",
    "level": "B1",
    "plural": "die Klicks",
    "exampleSentenceDe": "Ein Doppelklick mit der linken Maustaste markiert das Wort.",
    "exampleSentenceEs": "Un doble clic con el botón izquierdo del ratón selecciona la palabra.",
    "exampleSentenceDeBlocks": [
      {
        "text": "Ein Doppelklick mit der linken Maustaste",
        "role": "subject",
        "order": 1
      },
      {
        "text": "markiert",
        "role": "verb_p1",
        "order": 2
      },
      {
        "text": "das Wort",
        "role": "complement",
        "order": 3
      }
    ]
  }
]
},
{
  id: 18,
  title: "Kapitel 18: Elektrotechnik & Solar",
  icon: <Zap size={20} />,
  emoji: "⚡",
  words: [
    {
      de: "der Strom",
      pron: "dea shtrom",
      es: "la electricidad / corriente",
      type: "Sustantivo (Masc)",
      category: "Elektrizität",
      plural: "die Ströme",
      exampleSentenceDe: "Der Strom fließt durch das Kabel.",
      exampleSentenceEs: "La corriente fluye a través del cable.",
      exampleSentenceDeBlocks: [
        { text: "Der Strom", role: "subject", order: 1 },
        { text: "fließt", role: "verb_p1", order: 2 },
        { text: "durch das", role: "complement", order: 3 },
        { text: "Kabel.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a glowing yellow lightning bolt"
    },
    {
      de: "die Spannung",
      pron: "di shpá-nung",
      es: "el voltaje / tensión",
      type: "Sustantivo (Fem)",
      category: "Elektrizität",
      plural: "die Spannungen",
      exampleSentenceDe: "Die Spannung beträgt genau 230 Volt.",
      exampleSentenceEs: "El voltaje es exactamente de 230 voltios.",
      exampleSentenceDeBlocks: [
        { text: "Die Spannung", role: "subject", order: 1 },
        { text: "beträgt", role: "verb_p1", order: 2 },
        { text: "genau", role: "complement", order: 3 },
        { text: "230 Volt.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of an electrical voltmeter dial"
    },
    {
      de: "der Stromkreis",
      pron: "dea shtróm-krais",
      es: "el circuito eléctrico",
      type: "Sustantivo (Masc)",
      category: "Elektrizität",
      plural: "die Stromkreise",
      exampleSentenceDe: "Der Stromkreis ist jetzt sicher unterbrochen.",
      exampleSentenceEs: "El circuito eléctrico está ahora interrumpido de forma segura.",
      exampleSentenceDeBlocks: ["Der Stromkreis", "ist", "jetzt", "sicher", "unterbrochen."],
      en: "a cute 3D isometric UI icon of a closed electrical circuit with a glowing lightbulb"
    },
    {
      de: "das Kabel",
      pron: "das ká-bel",
      es: "el cable",
      type: "Sustantivo (Neutro)",
      category: "Komponenten",
      plural: "die Kabel",
      exampleSentenceDe: "Wir verlegen das Kabel zum Verteiler.",
      exampleSentenceEs: "Tendemos el cable hacia el distribuidor.",
      exampleSentenceDeBlocks: [
        { text: "Wir verlegen", role: "verb_p1", order: 1 },
        { text: "das Kabel", role: "subject", order: 2 },
        { text: "direkt zum", role: "complement", order: 3 },
        { text: "Verteilerkasten.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a thick industrial electrical copper cable spool"
    },
    {
      de: "der Stecker",
      pron: "dea shté-ka",
      es: "el enchufe (macho)",
      type: "Sustantivo (Masc)",
      category: "Komponenten",
      plural: "die Stecker",
      exampleSentenceDe: "Ziehen Sie bitte zuerst den Stecker.",
      exampleSentenceEs: "Por favor, desconecte primero el enchufe.",
      exampleSentenceDeBlocks: [
        { text: "Ziehen Sie", role: "verb_p1", order: 1 },
        { text: "bitte zuerst", role: "complement", order: 2 },
        { text: "den Stecker", role: "subject", order: 3 },
        { text: "vorsichtig ab.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a standard European electrical plug"
    },
    {
      de: "die Steckdose",
      pron: "di shték-do-ze",
      es: "la toma de corriente",
      type: "Sustantivo (Fem)",
      category: "Komponenten",
      plural: "die Steckdosen",
      exampleSentenceDe: "Die neue Steckdose ist fest montiert.",
      exampleSentenceEs: "La nueva toma de corriente está firmemente montada.",
      exampleSentenceDeBlocks: [
        { text: "Die neue Steckdose", role: "subject", order: 1 },
        { text: "ist an der Wand", role: "complement", order: 2 },
        { text: "fachgerecht", role: "complement", order: 3 },
        { text: "montiert.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of an electrical wall socket"
    },
    {
      de: "der Schalter",
      pron: "dea shál-ta",
      es: "el interruptor",
      type: "Sustantivo (Masc)",
      category: "Komponenten",
      plural: "die Schalter",
      exampleSentenceDe: "Drücken Sie den Schalter für Licht.",
      exampleSentenceEs: "Presione el interruptor para la luz.",
      exampleSentenceDeBlocks: [
        { text: "Drücken Sie", role: "verb_p1", order: 1 },
        { text: "den Schalter,", role: "subject", order: 2 },
        { text: "um das Licht", role: "complement", order: 3 },
        { text: "einzuschalten.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a modern wall light switch"
    },
    {
      de: "die Sicherung",
      pron: "di zí-je-rung",
      es: "el fusible / el taco",
      type: "Sustantivo (Fem)",
      category: "Komponenten",
      plural: "die Sicherungen",
      exampleSentenceDe: "Die Sicherung hat sofort automatisch ausgelöst.",
      exampleSentenceEs: "El fusible se disparó inmediatamente de forma automática.",
      exampleSentenceDeBlocks: [
        { text: "Die Sicherung", role: "subject", order: 1 },
        { text: "hat im Kasten", role: "complement", order: 2 },
        { text: "wegen Überlastung", role: "complement", order: 3 },
        { text: "ausgelöst.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of an electrical fuse breaker box"
    },
    {
      de: "der Transformator",
      pron: "dea trans-for-má-tor",
      es: "el transformador",
      type: "Sustantivo (Masc)",
      category: "Komponenten",
      plural: "die Transformatoren",
      exampleSentenceDe: "Der Transformator wandelt die Spannung um.",
      exampleSentenceEs: "El transformador convierte el voltaje.",
      exampleSentenceDeBlocks: [
        { text: "Der Transformator", role: "subject", order: 1 },
        { text: "wandelt", role: "verb_p1", order: 2 },
        { text: "die hohe Spannung", role: "complement", order: 3 },
        { text: "sicher um.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of an industrial electrical power transformer"
    },
    {
      de: "die Batterie",
      pron: "di ba-te-rí",
      es: "la batería",
      type: "Sustantivo (Fem)",
      category: "Energie",
      plural: "die Batterien",
      exampleSentenceDe: "Die Batterie liefert Gleichstrom für Notfälle.",
      exampleSentenceEs: "La batería suministra corriente continua para emergencias.",
      exampleSentenceDeBlocks: [
        { text: "Die Batterie", role: "subject", order: 1 },
        { text: "liefert", role: "verb_p1", order: 2 },
        { text: "Gleichstrom", role: "complement", order: 3 },
        { text: "für die Anlage.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a standard AA battery"
    },
    {
      de: "der Akku",
      pron: "dea á-ku",
      es: "la batería recargable",
      type: "Sustantivo (Masc)",
      category: "Energie",
      plural: "die Akkus",
      exampleSentenceDe: "Der Akku des Bohrers lädt schnell.",
      exampleSentenceEs: "La batería del taladro se carga rápido.",
      exampleSentenceDeBlocks: [
        { text: "Der Akku", role: "subject", order: 1 },
        { text: "des Bohrers", role: "complement", order: 2 },
        { text: "lädt an der Station", role: "verb_p1", order: 3 },
        { text: "sehr schnell.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a lithium ion rechargeable battery pack"
    },
    {
      de: "der Zähler",
      pron: "dea tsé-la",
      es: "el medidor eléctrico",
      type: "Sustantivo (Masc)",
      category: "Komponenten",
      plural: "die Zähler",
      exampleSentenceDe: "Der Elektriker liest den Zähler ab.",
      exampleSentenceEs: "El electricista lee el contador.",
      exampleSentenceDeBlocks: [
        { text: "Der Elektriker", role: "subject", order: 1 },
        { text: "liest den Zähler", role: "verb_p1", order: 2 },
        { text: "im Keller", role: "complement", order: 3 },
        { text: "sorgfältig ab.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a smart electrical power meter"
    },
    {
      de: "die Gleichspannung",
      pron: "di gláij-shpa-nung",
      es: "tensión continua (DC)",
      type: "Sustantivo (Fem)",
      category: "Elektrizität",
      plural: "die Gleichspannungen",
      exampleSentenceDe: "Solarmodule erzeugen immer saubere Gleichspannung.",
      exampleSentenceEs: "Los módulos solares generan siempre tensión continua limpia.",
      exampleSentenceDeBlocks: [
        { text: "Die Solarmodule", role: "subject", order: 1 },
        { text: "erzeugen", role: "verb_p1", order: 2 },
        { text: "immer saubere", role: "complement", order: 3 },
        { text: "Gleichspannung.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon showing the Direct Current DC symbol"
    },
    {
      de: "die Wechselspannung",
      pron: "di vék-sel-shpa-nung",
      es: "tensión alterna (AC)",
      type: "Sustantivo (Fem)",
      category: "Elektrizität",
      plural: "die Wechselspannungen",
      exampleSentenceDe: "Haushaltsgeräte brauchen 230 Volt Wechselspannung.",
      exampleSentenceEs: "Los electrodomésticos necesitan 230 voltios de tensión alterna.",
      exampleSentenceDeBlocks: [
        { text: "Normale Geräte", role: "subject", order: 1 },
        { text: "brauchen", role: "verb_p1", order: 2 },
        { text: "230 Volt", role: "complement", order: 3 },
        { text: "Wechselspannung.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon showing the Alternating Current AC sine wave symbol"
    },
    {
      de: "die Leistung",
      pron: "di láis-tung",
      es: "la potencia (W/kW)",
      type: "Sustantivo (Fem)",
      category: "Elektrizität",
      plural: "die Leistungen",
      exampleSentenceDe: "Die maximale Leistung beträgt zehn Kilowatt.",
      exampleSentenceEs: "La potencia máxima es de diez kilovatios.",
      exampleSentenceDeBlocks: [
        { text: "Die maximale Leistung", role: "subject", order: 1 },
        { text: "beträgt", role: "verb_p1", order: 2 },
        { text: "bei Sonnenschein", role: "complement", order: 3 },
        { text: "zehn Kilowatt.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a glowing energy core"
    },
    {
      de: "die Solaranlage",
      pron: "di zo-lár-an-la-gue",
      es: "el sistema solar / fotovoltaico",
      type: "Sustantivo (Fem)",
      category: "Solartechnik",
      plural: "die Solaranlagen",
      exampleSentenceDe: "Die Solaranlage produziert grünen Strom täglich.",
      exampleSentenceEs: "La instalación solar produce electricidad ecológica a diario.",
      exampleSentenceDeBlocks: [
        { text: "Die Solaranlage", role: "subject", order: 1 },
        { text: "produziert auf dem Dach", role: "verb_p1", order: 2 },
        { text: "täglich sauberen", role: "complement", order: 3 },
        { text: "grünen Strom.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a house roof with shiny solar panels"
    },
    {
      de: "das Solarmodul",
      pron: "das zo-lár-mo-dul",
      es: "el módulo solar",
      type: "Sustantivo (Neutro)",
      category: "Solartechnik",
      plural: "die Solarmodule",
      exampleSentenceDe: "Wir befestigen jedes Solarmodul mit Klemmen.",
      exampleSentenceEs: "Fijamos cada módulo solar con abrazaderas.",
      exampleSentenceDeBlocks: [
        { text: "Wir befestigen", role: "verb_p1", order: 1 },
        { text: "jedes Solarmodul", role: "subject", order: 2 },
        { text: "auf der Schiene", role: "complement", order: 3 },
        { text: "mit Klemmen.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a single large blue solar panel"
    },
    {
      de: "die Solarzelle",
      pron: "di zo-lár-tse-le",
      es: "la célula solar",
      type: "Sustantivo (Fem)",
      category: "Solartechnik",
      plural: "die Solarzellen",
      exampleSentenceDe: "Eine Solarzelle wandelt Licht in Strom.",
      exampleSentenceEs: "Una célula solar convierte luz en electricidad.",
      exampleSentenceDeBlocks: [
        { text: "Die Solarzelle", role: "subject", order: 1 },
        { text: "wandelt", role: "verb_p1", order: 2 },
        { text: "das Sonnenlicht", role: "complement", order: 3 },
        { text: "in Strom um.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a micro photovoltaic solar cell grid"
    },
    {
      de: "der Wechselrichter",
      pron: "dea vék-sel-rij-ta",
      es: "el inversor (AC/DC)",
      type: "Sustantivo (Masc)",
      category: "Solartechnik",
      plural: "die Wechselrichter",
      exampleSentenceDe: "Der Wechselrichter wandelt Gleichstrom in Wechselstrom.",
      exampleSentenceEs: "El inversor convierte corriente continua en alterna.",
      exampleSentenceDeBlocks: [
        { text: "Der Wechselrichter", role: "subject", order: 1 },
        { text: "wandelt Gleichstrom", role: "verb_p1", order: 2 },
        { text: "sehr effizient", role: "complement", order: 3 },
        { text: "in Wechselstrom.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a modern solar power inverter box"
    },
    {
      de: "der Speicher",
      pron: "dea shpái-ja",
      es: "el acumulador / banco de baterías",
      type: "Sustantivo (Masc)",
      category: "Solartechnik",
      plural: "die Speicher",
      exampleSentenceDe: "Der Speicher speichert Energie für nachts.",
      exampleSentenceEs: "La batería de almacenamiento guarda energía para la noche.",
      exampleSentenceDeBlocks: [
        { text: "Der Batteriespeicher", role: "subject", order: 1 },
        { text: "speichert Solarstrom", role: "verb_p1", order: 2 },
        { text: "zuverlässig", role: "complement", order: 3 },
        { text: "für die Nacht.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a home solar battery storage system"
    },
    {
      de: "das Netz",
      pron: "das nets",
      es: "la red eléctrica",
      type: "Sustantivo (Neutro)",
      category: "Infrastruktur",
      plural: "die Netze",
      exampleSentenceDe: "Die Anlage speist Strom ins Netz.",
      exampleSentenceEs: "La instalación inyecta electricidad a la red.",
      exampleSentenceDeBlocks: [
        { text: "Die Anlage", role: "subject", order: 1 },
        { text: "speist überschüssigen Strom", role: "verb_p1", order: 2 },
        { text: "automatisch", role: "complement", order: 3 },
        { text: "ins Netz ein.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of electrical power transmission towers"
    },
    {
      de: "der Ertrag",
      pron: "dea ea-trák",
      es: "el rendimiento / producción",
      type: "Sustantivo (Masc)",
      category: "Solartechnik",
      plural: "die Erträge",
      exampleSentenceDe: "Im Sommer ist der Ertrag hoch.",
      exampleSentenceEs: "En verano la producción energética es alta.",
      exampleSentenceDeBlocks: [
        { text: "Im Sommer", role: "complement", order: 1 },
        { text: "ist der Ertrag", role: "verb_p1", order: 2 },
        { text: "unserer Anlage", role: "subject", order: 3 },
        { text: "besonders hoch.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a rising chart with a sun symbol"
    },
    {
      de: "die Dachmontage",
      pron: "di daj-mon-tá-je",
      es: "el montaje en techo",
      type: "Sustantivo (Fem)",
      category: "Installation",
      plural: "die Dachmontagen",
      exampleSentenceDe: "Wir planen die Dachmontage für morgen.",
      exampleSentenceEs: "Planificamos el montaje en tejado para mañana.",
      exampleSentenceDeBlocks: [
        { text: "Wir planen", role: "verb_p1", order: 1 },
        { text: "die Dachmontage", role: "subject", order: 2 },
        { text: "mit dem Team", role: "complement", order: 3 },
        { text: "für morgen.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of construction brackets on a rooftop"
    },
    {
      de: "das Werkzeug",
      pron: "das véak-tsoik",
      es: "la herramienta",
      type: "Sustantivo (Neutro)",
      category: "Werkzeuge",
      plural: "die Werkzeuge",
      exampleSentenceDe: "Bringe bitte das Werkzeug nach oben.",
      exampleSentenceEs: "Lleva por favor las herramientas arriba.",
      exampleSentenceDeBlocks: [
        { text: "Bringe bitte", role: "verb_p1", order: 1 },
        { text: "das Werkzeug", role: "subject", order: 2 },
        { text: "in der Kiste", role: "complement", order: 3 },
        { text: "nach oben.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a red toolbox"
    },
    {
      de: "der Schraubenzieher",
      pron: "dea shrjáu-ben-tsi-a",
      es: "el destornillador",
      type: "Sustantivo (Masc)",
      category: "Werkzeuge",
      plural: "die Schraubenzieher",
      exampleSentenceDe: "Ich ziehe Schrauben mit dem Schraubenzieher.",
      exampleSentenceEs: "Aprieto tornillos con el destornillador.",
      exampleSentenceDeBlocks: [
        { text: "Ich ziehe", role: "verb_p1", order: 1 },
        { text: "die Klemme", role: "subject", order: 2 },
        { text: "mit dem Schraubenzieher", role: "complement", order: 3 },
        { text: "fest an.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a yellow and black screwdriver"
    },
    {
      de: "die Zange",
      pron: "di tsáng-e",
      es: "el alicate / pinza",
      type: "Sustantivo (Fem)",
      category: "Werkzeuge",
      plural: "die Zangen",
      exampleSentenceDe: "Mit der Zange schneide ich Kabel.",
      exampleSentenceEs: "Con el alicate corto cables.",
      exampleSentenceDeBlocks: [
        { text: "Mit der Zange", role: "complement", order: 1 },
        { text: "schneidet der Monteur", role: "verb_p1", order: 2 },
        { text: "das dicke Kabel", role: "subject", order: 3 },
        { text: "schnell ab.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a pair of metal pliers with rubber grips"
    },
    {
      de: "der Bohrer",
      pron: "dea bó-ra",
      es: "el taladro",
      type: "Sustantivo (Masc)",
      category: "Werkzeuge",
      plural: "die Bohrer",
      exampleSentenceDe: "Der Bohrer bohrt Löcher in Beton.",
      exampleSentenceEs: "El taladro perfora agujeros en hormigón.",
      exampleSentenceDeBlocks: [
        { text: "Der Bohrer", role: "subject", order: 1 },
        { text: "bohrt präzise Löcher", role: "verb_p1", order: 2 },
        { text: "in die Wand", role: "complement", order: 3 },
        { text: "aus Beton.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a power drill"
    },
    {
      de: "das Multimeter",
      pron: "das mul-ti-mé-ta",
      es: "el multímetro",
      type: "Sustantivo (Neutro)",
      category: "Werkzeuge",
      plural: "die Multimeter",
      exampleSentenceDe: "Mit dem Multimeter prüfen wir Durchgang.",
      exampleSentenceEs: "Con el multímetro comprobamos la continuidad.",
      exampleSentenceDeBlocks: [
        { text: "Mit dem Multimeter", role: "complement", order: 1 },
        { text: "prüfen wir", role: "verb_p1", order: 2 },
        { text: "die Spannung", role: "subject", order: 3 },
        { text: "ganz genau.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a digital multimeter with probes"
    },
    {
      de: "die Leiter",
      pron: "di lái-ta",
      es: "la escalera",
      type: "Sustantivo (Fem)",
      category: "Werkzeuge",
      plural: "die Leitern",
      exampleSentenceDe: "Halte die Leiter bitte gut fest.",
      exampleSentenceEs: "Sujeta la escalera firmemente, por favor.",
      exampleSentenceDeBlocks: [
        { text: "Halte die Leiter", role: "verb_p1", order: 1 },
        { text: "auf dem Boden", role: "complement", order: 2 },
        { text: "für die Sicherheit", role: "complement", order: 3 },
        { text: "gut fest.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a tall aluminum stepladder"
    },
    {
      de: "die Erdung",
      pron: "di ér-dung",
      es: "la toma de tierra",
      type: "Sustantivo (Fem)",
      category: "Sicherheit",
      plural: "die Erdungen",
      exampleSentenceDe: "Eine feste Erdung schützt vor Unfällen.",
      exampleSentenceEs: "Una toma de tierra sólida protege contra accidentes.",
      exampleSentenceDeBlocks: [
        { text: "Eine gute Erdung", role: "subject", order: 1 },
        { text: "schützt das Haus", role: "verb_p1", order: 2 },
        { text: "und die Monteure", role: "complement", order: 3 },
        { text: "vor Unfällen.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a copper grounding rod symbol"
    },
    {
      de: "der Kurzschluss",
      pron: "dea kúrts-shlus",
      es: "el cortocircuito",
      type: "Sustantivo (Masc)",
      category: "Sicherheit",
      plural: "die Kurzschlüsse",
      exampleSentenceDe: "Ein Kurzschluss kann die Bauteile beschädigen.",
      exampleSentenceEs: "Un cortocircuito puede dañar los componentes.",
      exampleSentenceDeBlocks: [
        { text: "Ein Kurzschluss", role: "subject", order: 1 },
        { text: "kann die Bauteile", role: "verb_p1", order: 2 },
        { text: "in Sekunden", role: "complement", order: 3 },
        { text: "schwer beschädigen.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of electric sparks and a broken wire"
    },
    {
      de: "der Helm",
      pron: "dea jelm",
      es: "el casco de seguridad",
      type: "Sustantivo (Masc)",
      category: "Sicherheit",
      plural: "die Helme",
      exampleSentenceDe: "Auf der Baustelle tragen wir Helme.",
      exampleSentenceEs: "En la obra llevamos cascos.",
      exampleSentenceDeBlocks: [
        { text: "Auf der Baustelle", role: "complement", order: 1 },
        { text: "tragen alle Arbeiter", role: "verb_p1", order: 2 },
        { text: "immer einen gelben", role: "subject", order: 3 },
        { text: "Schutzhelm.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a yellow hard hat"
    },
    {
      de: "die Handschuhe",
      pron: "di jánt-shu-e",
      es: "los guantes de trabajo",
      type: "Sustantivo (Plural)",
      category: "Sicherheit",
      plural: "-",
      exampleSentenceDe: "Isolierte Handschuhe schützen vor Stromschlägen.",
      exampleSentenceEs: "Los guantes aislantes protegen de descargas eléctricas.",
      exampleSentenceDeBlocks: [
        { text: "Isolierte Handschuhe", role: "subject", order: 1 },
        { text: "schützen die Hände", role: "verb_p1", order: 2 },
        { text: "zuverlässig", role: "complement", order: 3 },
        { text: "vor Strom.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of heavy duty protective work gloves"
    },
    {
      de: "die Gefahr",
      pron: "di gue-fár",
      es: "el peligro / riesgo",
      type: "Sustantivo (Fem)",
      category: "Sicherheit",
      plural: "die Gefahren",
      exampleSentenceDe: "Bei Hochspannung herrscht immer Lebensgefahr.",
      exampleSentenceEs: "Con alta tensión hay siempre peligro de muerte.",
      exampleSentenceDeBlocks: [
        { text: "Bei Hochspannung", role: "complement", order: 1 },
        { text: "besteht für jeden", role: "verb_p1", order: 2 },
        { text: "eine sehr große", role: "subject", order: 3 },
        { text: "Lebensgefahr.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a yellow high voltage warning sign"
    },
    {
      de: "gefährlich",
      pron: "gue-féa-lij",
      es: "peligroso",
      type: "Adjetivo",
      category: "Sicherheit",
      exampleSentenceDe: "Offene Stromkabel sind extrem gefährlich.",
      exampleSentenceEs: "Los cables eléctricos al descubierto son sumamente peligrosos.",
      exampleSentenceDeBlocks: [
        { text: "Offene Elektrokabel", role: "subject", order: 1 },
        { text: "sind bei Berührung", role: "verb_p1", order: 2 },
        { text: "für Laien", role: "complement", order: 3 },
        { text: "extrem gefährlich.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a skull and crossbones hazard symbol"
    },
    {
      de: "der Elektriker",
      pron: "dea e-lék-tri-ka",
      es: "el electricista",
      type: "Sustantivo (Masc)",
      category: "Beruf",
      plural: "die Elektriker",
      exampleSentenceDe: "Der Elektriker schließt den Speicher an.",
      exampleSentenceEs: "El electricista conecta el acumulador.",
      exampleSentenceDeBlocks: [
        { text: "Der Elektriker", role: "subject", order: 1 },
        { text: "schließt den Speicher", role: "verb_p1", order: 2 },
        { text: "im Keller", role: "complement", order: 3 },
        { text: "fachgerecht an.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a worker holding cables"
    },
    {
      de: "der Techniker",
      pron: "dea téj-ni-ka",
      es: "el técnico",
      type: "Sustantivo (Masc)",
      category: "Beruf",
      plural: "die Techniker",
      exampleSentenceDe: "Der Techniker prüft die Solaranlage genau.",
      exampleSentenceEs: "El técnico revisa la instalación solar con precisión.",
      exampleSentenceDeBlocks: [
        { text: "Der Techniker", role: "subject", order: 1 },
        { text: "prüft die Anlage", role: "verb_p1", order: 2 },
        { text: "vor der Abnahme", role: "complement", order: 3 },
        { text: "ganz genau.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a worker with blueprints and tools"
    },
    {
      de: "messen",
      pron: "mé-sen",
      es: "medir",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      exampleSentenceDe: "Wir messen den Strom mit Prüfspitzen.",
      exampleSentenceEs: "Medimos la corriente con puntas de prueba.",
      exampleSentenceDeBlocks: [
        { text: "Wir messen", role: "verb_p1", order: 1 },
        { text: "die Spannung", role: "subject", order: 2 },
        { text: "am Messpunkt", role: "complement", order: 3 },
        { text: "mit Prüfspitzen.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a measuring tape extended"
    },
    {
      de: "anschließen",
      pron: "án-shli-sen",
      es: "conectar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "Separable (an-) / + Akkusativ",
      exampleSentenceDe: "Wir schließen den Wechselrichter an das Netz.",
      exampleSentenceEs: "Conectamos el inversor a la red.",
      exampleSentenceDeBlocks: [
        { text: "Wir schließen", role: "verb_p1", order: 1 },
        { text: "den Wechselrichter", role: "subject", order: 2 },
        { text: "an das Netz", role: "complement", order: 3 },
        { text: "sicher an.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of two electrical wires being connected together"
    },
    {
      de: "installieren",
      pron: "ins-ta-lí-ren",
      es: "instalar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      exampleSentenceDe: "Monteure installieren Solarmodule auf dem Dach.",
      exampleSentenceEs: "Los montadores instalan módulos solares en el tejado.",
      exampleSentenceDeBlocks: [
        { text: "Die Monteure", role: "subject", order: 1 },
        { text: "installieren Module", role: "verb_p1", order: 2 },
        { text: "auf dem Schrägdach", role: "complement", order: 3 },
        { text: "sehr zügig.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a wrench tightening a bolt on a machine"
    },
    {
      de: "prüfen",
      pron: "prü-fen",
      es: "comprobar / revisar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      exampleSentenceDe: "Vor Inbetriebnahme prüfen wir alle Kabel.",
      exampleSentenceEs: "Antes de la puesta en marcha comprobamos todos los cables.",
      exampleSentenceDeBlocks: [
        { text: "Vor Inbetriebnahme", role: "complement", order: 1 },
        { text: "prüfen wir", role: "verb_p1", order: 2 },
        { text: "alle Kabel", role: "subject", order: 3 },
        { text: "sehr gründlich.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a green checkmark over a technical clipboard"
    },
    {
      de: "warten",
      pron: "vár-ten",
      es: "mantener (mantenimiento)",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      exampleSentenceDe: "Der Techniker wartet die Anlage jährlich.",
      exampleSentenceEs: "El técnico realiza el mantenimiento de la instalación anualmente.",
      exampleSentenceDeBlocks: [
        { text: "Der Techniker", role: "subject", order: 1 },
        { text: "wartet die Anlage", role: "verb_p1", order: 2 },
        { text: "beim Kunden", role: "complement", order: 3 },
        { text: "einmal jährlich.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of an oil can and a gear"
    },
    {
      de: "einschalten",
      pron: "áin-shal-ten",
      es: "encender (equipo)",
      type: "Verbo",
      category: "Aktionen",
      regimen: "Separable (ein-) / + Akkusativ",
      exampleSentenceDe: "Schalten Sie den Schalter jetzt ein.",
      exampleSentenceEs: "Encienda el interruptor ahora.",
      exampleSentenceDeBlocks: [
        { text: "Schalten Sie", role: "verb_p1", order: 1 },
        { text: "den Hauptschalter", role: "subject", order: 2 },
        { text: "nach der Montage", role: "complement", order: 3 },
        { text: "vorsichtig ein.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a green glowing ON button"
    },
    {
      de: "ausschalten",
      pron: "áus-shal-ten",
      es: "apagar (equipo)",
      type: "Verbo",
      category: "Aktionen",
      regimen: "Separable (aus-) / + Akkusativ",
      exampleSentenceDe: "Schalten Sie den Strom vor Reparaturen aus.",
      exampleSentenceEs: "Desconecte la corriente antes de las reparaciones.",
      exampleSentenceDeBlocks: [
        { text: "Schalten Sie", role: "verb_p1", order: 1 },
        { text: "den Strom", role: "subject", order: 2 },
        { text: "vor jeder Reparatur", role: "complement", order: 3 },
        { text: "immer aus.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a red OFF button"
    },
    {
      de: "löten",
      pron: "lö-ten",
      es: "soldar (electrónica)",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      exampleSentenceDe: "Der Techniker lötet Drähte auf Platinen.",
      exampleSentenceEs: "El técnico suelda cables en placas de circuitos.",
      exampleSentenceDeBlocks: [
        { text: "Der Techniker", role: "subject", order: 1 },
        { text: "lötet feine Drähte", role: "verb_p1", order: 2 },
        { text: "auf die Platine", role: "complement", order: 3 },
        { text: "sauber fest.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a soldering iron melting silver wire"
    },
    {
      de: "isolieren",
      pron: "i-zo-lí-ren",
      es: "aislar (cableado)",
      type: "Verbo",
      category: "Aktionen",
      regimen: "+ Akkusativ",
      exampleSentenceDe: "Wir isolieren offene Kontakte mit Isolierband.",
      exampleSentenceEs: "Aislamos contactos al descubierto con cinta aislante.",
      exampleSentenceDeBlocks: [
        { text: "Wir isolieren", role: "verb_p1", order: 1 },
        { text: "die Kontakte", role: "subject", order: 2 },
        { text: "mit Isolierband", role: "complement", order: 3 },
        { text: "vollständig.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of a roll of black electrical insulation tape"
    },
    {
      de: "abisolieren",
      pron: "áp-i-zo-li-ren",
      es: "pelar un cable",
      type: "Verbo",
      category: "Aktionen",
      regimen: "Separable (ab-) / + Akkusativ",
      exampleSentenceDe: "Mit der Zange isolieren wir Kabel ab.",
      exampleSentenceEs: "Con la pinza pelamos los cables.",
      exampleSentenceDeBlocks: [
        { text: "Mit der Zange", role: "complement", order: 1 },
        { text: "isoliert man", role: "verb_p1", order: 2 },
        { text: "das Kupferkabel", role: "subject", order: 3 },
        { text: "schnell ab.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of wire strippers removing plastic from a copper wire"
    },
    {
      de: "austauschen",
      pron: "áus-tau-shen",
      es: "reemplazar / cambiar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "Separable (aus-) / + Akkusativ",
      exampleSentenceDe: "Wir tauschen die defekte Sicherung aus.",
      exampleSentenceEs: "Cambiamos el fusible defectuoso.",
      exampleSentenceDeBlocks: [
        { text: "Wir tauschen", role: "verb_p1", order: 1 },
        { text: "die Sicherung", role: "subject", order: 2 },
        { text: "im Kasten", role: "complement", order: 3 },
        { text: "sofort aus.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of two mechanical parts swapping places with arrows"
    },
    {
      de: "einspeisen",
      pron: "áin-shpai-zen",
      es: "inyectar (a la red)",
      type: "Verbo",
      category: "Aktionen",
      regimen: "Separable (ein-) / + Akkusativ",
      exampleSentenceDe: "Die Anlage speist Solarstrom ins Netz ein.",
      exampleSentenceEs: "La instalación inyecta electricidad solar a la red.",
      exampleSentenceDeBlocks: [
        { text: "Die Anlage", role: "subject", order: 1 },
        { text: "speist Solarstrom", role: "verb_p1", order: 2 },
        { text: "in das Netz", role: "complement", order: 3 },
        { text: "verlässlich ein.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of electricity flowing from a house into a power grid tower"
    },
    {
      de: "funktionieren",
      pron: "funk-tsio-ní-ren",
      es: "funcionar",
      type: "Verbo",
      category: "Aktionen",
      regimen: "Intransitivo",
      exampleSentenceDe: "Alle Module funktionieren einwandfrei und sicher.",
      exampleSentenceEs: "Todos los módulos funcionan de forma impecable y segura.",
      exampleSentenceDeBlocks: [
        { text: "Alle Module", role: "subject", order: 1 },
        { text: "funktionieren heute", role: "verb_p1", order: 2 },
        { text: "ohne Störung", role: "complement", order: 3 },
        { text: "einwandfrei.", role: "verb_p2", order: 4 }
      ],
      en: "a cute 3D isometric UI icon of two interlocking gears turning smoothly"
    },
    {
      "de": "der Alarm",
      "pron": "dea a-lárm",
      "es": "la alarma",
      "type": "Sustantivo (Masc)",
      "category": "Sicherheit",
      "level": "B1",
      "plural": "die Alarme",
      "en": "a cute 3D isometric UI icon of a glowing red industrial electrical warning alarm siren beacon",
      "exampleSentenceDe": "Bei einem Kurzschluss geht der Alarm los.",
      "exampleSentenceEs": "Con un cortocircuito salta la alarma.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Bei einem Kurzschluss",
          "role": "complement",
          "order": 1
        },
        {
          "text": "geht",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "der Alarm",
          "role": "subject",
          "order": 3
        },
        {
          "text": "los",
          "role": "verb_p2",
          "order": 4
        }
      ]
    },
    {
      "de": "die Anlage",
      "pron": "di án-la-gue",
      "es": "la instalación / planta (ej. solar)",
      "type": "Sustantivo (Fem)",
      "category": "Energie",
      "level": "B1",
      "plural": "die Anlagen",
      "en": "a cute 3D isometric UI icon of a ground-mounted photovoltaic solar panel array with inverter unit",
      "exampleSentenceDe": "Wir montieren heute eine neue Solaranlage.",
      "exampleSentenceEs": "Hoy montamos una nueva instalación solar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wir",
          "role": "subject",
          "order": 1
        },
        {
          "text": "montieren",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "heute eine neue Solaranlage",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "der Anschluss",
      "pron": "dea án-shlus",
      "es": "la conexión / toma / enlace",
      "type": "Sustantivo (Masc)",
      "category": "Energie",
      "level": "B1",
      "plural": "die Anschlüsse",
      "en": "a cute 3D isometric UI icon of an indoor main electrical power connection junction box with copper terminals",
      "exampleSentenceDe": "Für das Haus brauchen wir einen neuen Stromanschluss.",
      "exampleSentenceEs": "Para la casa necesitamos una nueva conexión eléctrica.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Für das Haus",
          "role": "complement",
          "order": 1
        },
        {
          "text": "brauchen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wir",
          "role": "subject",
          "order": 3
        },
        {
          "text": "einen neuen Stromanschluss",
          "role": "complement",
          "order": 4
        }
      ]
    },
    {
      "de": "der Apparat",
      "pron": "dea a-pa-rát",
      "es": "el aparato / equipo",
      "type": "Sustantivo (Masc)",
      "category": "Werkzeug",
      "level": "B1",
      "plural": "die Apparate",
      "en": "a cute 3D isometric UI icon of a precision electronic voltage measuring apparatus with dial",
      "exampleSentenceDe": "Dieser Apparat misst die Spannung genau.",
      "exampleSentenceEs": "Este aparato mide la tensión con precisión.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Dieser Apparat",
          "role": "subject",
          "order": 1
        },
        {
          "text": "misst",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Spannung genau",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "der Stoff",
      "pron": "dea shtof",
      "es": "el material / sustancia / tela",
      "type": "Sustantivo (Masc)",
      "category": "Material",
      "level": "B1",
      "plural": "die Stoffe",
      "exampleSentenceDe": "Kupfer ist ein sehr guter Stoff für Kabel.",
      "exampleSentenceEs": "El cobre es un material muy bueno para cables.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Kupfer",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ein sehr guter Stoff für Kabel",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "die Störung",
      "pron": "di shtö́-rung",
      "es": "la avería / perturbación / fallo",
      "type": "Sustantivo (Fem)",
      "category": "Technik",
      "level": "B1",
      "plural": "die Störungen",
      "exampleSentenceDe": "Es gibt eine Störung am Wechselrichter im Keller.",
      "exampleSentenceEs": "Hay una avería en el inversor del sótano.",
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
          "text": "eine Störung am Wechselrichter im Keller",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "übertragen",
      "pron": "ü-ba-trá-guen",
      "es": "transmitir / transferir (datos/energía)",
      "type": "Verbo inseparable irr.",
      "category": "Aktionen",
      "level": "B1",
      "regimen": "+ Akk / überträgt, übertrug, hat übertragen",
      "exampleSentenceDe": "Die Kabel übertragen den Strom direkt ins Netz.",
      "exampleSentenceEs": "Los cables transmiten la corriente directo a la red.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Kabel",
          "role": "subject",
          "order": 1
        },
        {
          "text": "übertragen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Strom direkt ins Netz",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "auf|laden",
      "pron": "áuf-la-den",
      "es": "cargar / recargar (batería)",
      "type": "Verbo separable irr.",
      "category": "Energie",
      "level": "B1",
      "regimen": "+ Akk / lädt auf, lud auf, hat aufgeladen",
      "en": "hands plugging a black power charger cable into a yellow digital multimeter battery pack indoors",
      "exampleSentenceDe": "Ich muss den Akku vom Messgerät noch aufladen.",
      "exampleSentenceEs": "Todavía tengo que recargar la batería del medidor.",
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
          "text": "den Akku vom Messgerät noch",
          "role": "complement",
          "order": 3
        },
        {
          "text": "aufladen",
          "role": "verb_p2",
          "order": 4
        }
      ]
    },
    {
      "de": "die Bedienungsanleitung",
      "pron": "di be-dí-nungs-an-lai-tung",
      "es": "el manual de instrucciones",
      "type": "Sustantivo (Fem)",
      "category": "Technik",
      "level": "B1",
      "plural": "die Bedienungsanleitungen",
      "en": "open printed technical instruction manual booklet with wiring diagrams on an indoor workbench",
      "exampleSentenceDe": "Lesen Sie vor der Installation die Bedienungsanleitung!",
      "exampleSentenceEs": "¡Lea el manual de instrucciones antes de la instalación!",
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
          "text": "vor der Installation die Bedienungsanleitung",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "elektrisch",
      "pron": "e-lék-trish",
      "es": "eléctrico",
      "type": "Adjetivo",
      "category": "Energie",
      "level": "A2–B1",
      "regimen": "Atributivo/Predicativo",
      "exampleSentenceDe": "Wir prüfen zuerst alle elektrischen Leitungen im Keller.",
      "exampleSentenceEs": "Revisamos primero todas las líneas eléctricas en el sótano.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wir",
          "role": "subject",
          "order": 1
        },
        {
          "text": "prüfen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "zuerst alle elektrischen Leitungen im Keller",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "die Energie",
      "pron": "di e-ner-guí",
      "es": "la energía",
      "type": "Sustantivo (Fem)",
      "category": "Energie",
      "level": "B1",
      "plural": "die Energien",
      "exampleSentenceDe": "Solaranlagen produzieren saubere Energie aus Sonnenlicht.",
      "exampleSentenceEs": "Las instalaciones solares producen energía limpia de la luz solar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Solaranlagen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "produzieren",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "saubere Energie aus Sonnenlicht",
          "role": "complement",
          "order": 3
        }
      ]
    },
    {
      "de": "die Gebrauchsanweisung",
      "pron": "di gue-bráuj-an-vai-zung",
      "es": "las instrucciones de uso",
      "type": "Sustantivo (Fem)",
      "category": "Technik",
      "level": "B1",
      "plural": "die Gebrauchsanweisungen",
      "en": "clean folded paper user instruction leaflet next to a white indoor inverter box",
      "exampleSentenceDe": "In der Gebrauchsanweisung stehen alle technischen Daten.",
      "exampleSentenceEs": "En las instrucciones de uso figuran todos los datos técnicos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "In der Gebrauchsanweisung",
          "role": "complement",
          "order": 1
        },
        {
          "text": "stehen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "alle technischen Daten",
          "role": "subject",
          "order": 3
        }
      ]
    },
    {
      "de": "schätzen",
      "pron": "shé-tsen",
      "es": "estimar / tasar / calcular (valor)",
      "type": "Verbo regular",
      "category": "Messen",
      "level": "B1",
      "regimen": "+ Akk / schätzt, schätzte, hat geschätzt",
      "exampleSentenceDe": "Wie hoch schätzen Sie die Leistung der neuen Solaranlage?",
      "exampleSentenceEs": "¿A cuánto estima usted la potencia de la nueva instalación solar?",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wie hoch",
          "role": "complement",
          "order": 1
        },
        {
          "text": "schätzen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "Sie",
          "role": "subject",
          "order": 3
        },
        {
          "text": "die Leistung der neuen Solaranlage",
          "role": "complement",
          "order": 4
        }
      ]
    },
    {
      "de": "die Technik",
      "pron": "di téj-nik",
      "es": "la tecnología / técnica",
      "type": "Sustantivo (Fem)",
      "category": "Energie",
      "level": "B1",
      "plural": "die Techniken",
      "exampleSentenceDe": "Die moderne Solartechnik hat sich in den letzten Jahren verbessert.",
      "exampleSentenceEs": "La moderna tecnología solar ha mejorado en los últimos años.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die moderne Solartechnik",
          "role": "subject",
          "order": 1
        },
        {
          "text": "hat",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "sich in den letzten Jahren",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verbessert",
          "role": "verb_p2",
          "order": 4
        }
      ]
    }
  ]
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
},
{
  "id": 20,
  "title": "Kapitel 20: Werkzeuge & Material (Elektro & PV)",
  "icon": <Wrench size={20} />,
  "emoji": "🧰",
  "words": [
    {
      "de": "die Isolierhandschuhe VDE (bis 1000 V)",
      "pron": "di i-zo-lía-jant-shu-e",
      "es": "guantes aislantes hasta 1000 V",
      "type": "Sustantivo (Plural)",
      "category": "PSA",
      "plural": "die Isolierhandschuhe",
      "regimen": "VDE bis 1000 V",
      "exampleSentenceDe": "Ich trage die Isolierhandschuhe beim Einsetzen der NH-Sicherung.",
      "exampleSentenceEs": "Llevo los guantes aislantes al insertar el fusible NH.",
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
          "text": "die Isolierhandschuhe",
          "role": "complement",
          "order": 3
        },
        {
          "text": "beim Einsetzen der NH-Sicherung",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric orange rubber VDE dielectric insulated gloves"
    },
    {
      "de": "die Isoliermatte (Isoliertermatte)",
      "pron": "di i-zo-lía-má-te",
      "es": "alfombra aislante dieléctrica",
      "type": "Sustantivo (Fem)",
      "category": "PSA",
      "plural": "die Isoliermatten",
      "regimen": "VDE 0680-1",
      "exampleSentenceDe": "Die Isoliermatte liegt vor dem Zählerschrank auf dem Boden.",
      "exampleSentenceEs": "La alfombra aislante está en el suelo frente al armario del contador.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Isoliermatte",
          "role": "subject",
          "order": 1
        },
        {
          "text": "liegt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vor dem Zählerschrank",
          "role": "complement",
          "order": 3
        },
        {
          "text": "auf dem Boden",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric rolled grey dielectric rubber safety mat with yellow line"
    },
    {
      "de": "die Griffstulpe (NH)",
      "pron": "di gríf-shtul-pe",
      "es": "manopla de extracción de fusibles NH",
      "type": "Sustantivo (Fem)",
      "category": "PSA",
      "plural": "die Griffstulpen",
      "regimen": "DIN VDE 0636",
      "exampleSentenceDe": "Mit der Griffstulpe ziehe ich die NH-Sicherung sicher heraus.",
      "exampleSentenceEs": "Con la manopla de extracción saco el fusible NH con seguridad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit der Griffstulpe",
          "role": "complement",
          "order": 1
        },
        {
          "text": "ziehe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich die NH-Sicherung sicher",
          "role": "subject",
          "order": 3
        },
        {
          "text": "heraus",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric red leather NH fuse puller glove handle with mechanical shield"
    },
    {
      "de": "das Visier",
      "pron": "das vi-zía",
      "es": "pantalla facial de protección",
      "type": "Sustantivo (Neutro)",
      "category": "PSA",
      "plural": "die Visiere",
      "regimen": "Lichtbogenschutz",
      "exampleSentenceDe": "Das Visier schützt mein Gesicht vor einem Lichtbogen.",
      "exampleSentenceEs": "La pantalla facial protege mi rostro contra un arco eléctrico.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Visier",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "mein Gesicht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vor einem Lichtbogen",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric transparent arc-flash polycarbonate safety face shield visor"
    },
    {
      "de": "der Helm",
      "pron": "dea jelm",
      "es": "casco de seguridad rígido",
      "type": "Sustantivo (Masc)",
      "category": "PSA",
      "plural": "die Helme",
      "regimen": "DIN EN 397",
      "exampleSentenceDe": "Auf der Baustelle trage ich immer den weißen Helm.",
      "exampleSentenceEs": "En la obra siempre llevo el casco blanco.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf der Baustelle",
          "role": "complement",
          "order": 1
        },
        {
          "text": "trage",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "immer den weißen Helm",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white industrial construction hard hat safety helmet"
    },
    {
      "de": "der Schutzhandschuh",
      "pron": "dea shúts-jant-shu",
      "es": "guante de protección mecánica",
      "type": "Sustantivo (Masc)",
      "category": "PSA",
      "plural": "die Schutzhandschuhe",
      "regimen": "EN 388 (Schnittschutz)",
      "exampleSentenceDe": "Die Schutzhandschuhe schützen vor scharfen Blechkanten.",
      "exampleSentenceEs": "Los guantes de protección protegen contra bordes de chapa afilados.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Schutzhandschuhe",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vor scharfen Blechkanten",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric blue and black coated mechanic assembly work gloves"
    },
    {
      "de": "die Schutzbrille",
      "pron": "di shúts-brí-le",
      "es": "gafas de protección envolventes",
      "type": "Sustantivo (Fem)",
      "category": "PSA",
      "plural": "die Schutzbrillen",
      "regimen": "DIN EN 166",
      "exampleSentenceDe": "Beim Bohren setze ich die Schutzbrille auf.",
      "exampleSentenceEs": "Al taladrar me pongo las gafas de protección.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Beim Bohren",
          "role": "complement",
          "order": 1
        },
        {
          "text": "setze",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich die Schutzbrille",
          "role": "subject",
          "order": 3
        },
        {
          "text": "auf",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric clear safety goggles with elastic strap"
    },
    {
      "de": "die Sicherheitsschuhe",
      "pron": "di zí-jea-jaits-shú-e",
      "es": "zapatos de seguridad S3",
      "type": "Sustantivo (Plural)",
      "category": "PSA",
      "plural": "die Sicherheitsschuhe",
      "regimen": "Klasse S3 (Stahlkappe)",
      "exampleSentenceDe": "Meine Sicherheitsschuhe haben eine Stahlkappe und durchtrittsichere Sohlen.",
      "exampleSentenceEs": "Mis zapatos de seguridad tienen puntera de acero y suela antiperforación.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Meine Sicherheitsschuhe",
          "role": "subject",
          "order": 1
        },
        {
          "text": "haben",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "eine Stahlkappe",
          "role": "complement",
          "order": 3
        },
        {
          "text": "und durchtrittsichere Sohlen",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric sturdy black work safety boots with reinforced toe"
    },
    {
      "de": "der Gehörschutz",
      "pron": "dea gue-jör-shuts",
      "es": "protección auditiva / orejeras",
      "type": "Sustantivo (Masc)",
      "category": "PSA",
      "plural": "-",
      "regimen": "DIN EN 352",
      "exampleSentenceDe": "Beim Meißeln brauche ich einen Gehörschutz.",
      "exampleSentenceEs": "Al picar con el cincel necesito protección auditiva.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Beim Meißeln",
          "role": "complement",
          "order": 1
        },
        {
          "text": "brauche",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "einen Gehörschutz",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric blue acoustic earmuffs hearing protection"
    },
    {
      "de": "der Spannungsprüfer / Duspol",
      "pron": "dea shpá-nungs-prü-fa / dús-pol",
      "es": "comprobador de tensión bipolar (Duspol)",
      "type": "Sustantivo (Masc)",
      "category": "Messgeräte",
      "plural": "die Spannungsprüfer",
      "regimen": "5 Sicherheitsregeln",
      "exampleSentenceDe": "Ich stelle die Spannungsfreiheit mit dem Duspol fest.",
      "exampleSentenceEs": "Compruebo la ausencia de tensión con el Duspol.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "stelle",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Spannungsfreiheit mit dem Duspol",
          "role": "complement",
          "order": 3
        },
        {
          "text": "fest",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric two-pole voltage tester Duspol with probe pins and LED display"
    },
    {
      "de": "das Fluke-Messgerät",
      "pron": "das flúk-més-gue-ret",
      "es": "equipo de medición multifunción Fluke",
      "type": "Sustantivo (Neutro)",
      "category": "Messgeräte",
      "plural": "die Fluke-Messgeräte",
      "regimen": "DIN VDE 0100-600",
      "exampleSentenceDe": "Wir messen die Schleifenimpedanz mit dem Fluke-Messgerät.",
      "exampleSentenceEs": "Medimos la impedancia de bucle con el equipo de medición Fluke.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wir",
          "role": "subject",
          "order": 1
        },
        {
          "text": "messen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Schleifenimpedanz",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem Fluke-Messgerät",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric yellow Fluke multifunction installation tester device"
    },
    {
      "de": "der Wallbox-Messadapter",
      "pron": "dea vól-boks-més-a-dáp-ta",
      "es": "adaptador de medición para Wallbox Tipo 2",
      "type": "Sustantivo (Masc)",
      "category": "Messgeräte",
      "plural": "die Wallbox-Messadapter",
      "regimen": "Typ 2 Mennekes",
      "exampleSentenceDe": "Der Wallbox-Messadapter simuliert ein Elektroauto beim Test.",
      "exampleSentenceEs": "El adaptador de medición simula un coche eléctrico durante la prueba.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Wallbox-Messadapter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "simuliert",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ein Elektroauto",
          "role": "complement",
          "order": 3
        },
        {
          "text": "beim Test",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric EV charging test adapter with Type 2 Mennekes plug"
    },
    {
      "de": "der RJ45-Kabeltester",
      "pron": "dea er-yót-fünf-unt-fía-tsij-ká-bel-tes-ta",
      "es": "probador de cables de red RJ45",
      "type": "Sustantivo (Masc)",
      "category": "Messgeräte",
      "plural": "die Kabeltester",
      "regimen": "LAN / Modbus RS485",
      "exampleSentenceDe": "Der RJ45-Kabeltester prüft alle acht Adern auf Durchgang.",
      "exampleSentenceEs": "El probador de cables RJ45 comprueba la continuidad de los ocho hilos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der RJ45-Kabeltester",
          "role": "subject",
          "order": 1
        },
        {
          "text": "prüft",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "alle acht Adern",
          "role": "complement",
          "order": 3
        },
        {
          "text": "auf Durchgang",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric handheld network LAN cable continuity tester with green LED lights"
    },
    {
      "de": "das Leitungsortungsgerät",
      "pron": "das lái-tungs-ór-tungs-gue-ret",
      "es": "detector digital de tuberías y cables",
      "type": "Sustantivo (Neutro)",
      "category": "Messgeräte",
      "plural": "die Leitungsortungsgeräte",
      "regimen": "Wandscanner",
      "exampleSentenceDe": "Vor dem Bohren scanne ich die Wand mit dem Leitungsortungsgerät.",
      "exampleSentenceEs": "Antes de taladrar escaneo la pared con el detector de cables.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Vor dem Bohren",
          "role": "complement",
          "order": 1
        },
        {
          "text": "scanne",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "die Wand mit dem Leitungsortungsgerät",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric digital wall scanner stud detector with screen"
    },
    {
      "de": "der Netztester LTE",
      "pron": "dea néts-tes-ta el-te-é",
      "es": "comprobador de señal móvil 4G/LTE",
      "type": "Sustantivo (Masc)",
      "category": "Messgeräte",
      "plural": "die Netztester",
      "regimen": "Mobilfunk-Signal",
      "exampleSentenceDe": "Mit dem Netztester LTE prüfen wir den Empfang für den Wechselrichter.",
      "exampleSentenceEs": "Con el comprobador LTE verificamos la cobertura para el inversor.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Netztester LTE",
          "role": "complement",
          "order": 1
        },
        {
          "text": "prüfen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wir",
          "role": "subject",
          "order": 3
        },
        {
          "text": "den Empfang für den Wechselrichter",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric handheld cellular signal strength tester with external antenna"
    },
    {
      "de": "der CTS-Messwandler",
      "pron": "dea tse-te-és-més-vánt-la",
      "es": "transformador de corriente toroidal (CT)",
      "type": "Sustantivo (Masc)",
      "category": "Messgeräte",
      "plural": "die CTS-Messwandler",
      "regimen": "Smart Meter / Enwitec",
      "exampleSentenceDe": "Der CTS-Messwandler misst den Stromfluss der drei Phasen berührungslos.",
      "exampleSentenceEs": "El transformador CT mide el flujo de corriente de las tres fases sin contacto.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der CTS-Messwandler",
          "role": "subject",
          "order": 1
        },
        {
          "text": "misst",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Stromfluss der drei Phasen",
          "role": "complement",
          "order": 3
        },
        {
          "text": "berührungslos",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric split-core current transformer clamp CT for smart meter"
    },
    {
      "de": "der Messadapter-Wechselrichter",
      "pron": "dea més-a-dáp-ta-vék-sel-rij-ta",
      "es": "adaptador de prueba para inversor solar",
      "type": "Sustantivo (Masc)",
      "category": "Messgeräte",
      "plural": "die Messadapter",
      "regimen": "PV-Inverter Test",
      "exampleSentenceDe": "Wir schließen den Messadapter an den Wechselrichter an.",
      "exampleSentenceEs": "Conectamos el adaptador de prueba al inversor.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wir",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schließen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Messadapter an den Wechselrichter",
          "role": "complement",
          "order": 3
        },
        {
          "text": "an",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric solar inverter test adapter plug connector with lead wires"
    },
    {
      "de": "der Akkuschrauber",
      "pron": "dea á-ku-shráu-ba",
      "es": "atornillador a batería",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Akkuschrauber",
      "regimen": "Drehmoment einstellbar",
      "exampleSentenceDe": "Mit dem Akkuschrauber befestige ich die Kabelkanäle.",
      "exampleSentenceEs": "Con el atornillador a batería fijo las canaletas de cables.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Akkuschrauber",
          "role": "complement",
          "order": 1
        },
        {
          "text": "befestige",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "die Kabelkanäle",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric cordless battery drill screwdriver with battery pack"
    },
    {
      "de": "das Bit-Set",
      "pron": "das bít-set",
      "es": "juego de puntas de atornillar",
      "type": "Sustantivo (Neutro)",
      "category": "Handwerkzeuge",
      "plural": "die Bit-Sets",
      "regimen": "Torx / Pozidriv / Schlitz",
      "exampleSentenceDe": "Das Bit-Set enthält Torx- und Kreuzschlitz-Bits.",
      "exampleSentenceEs": "El juego de puntas contiene puntas Torx y Pozidriv.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Bit-Set",
          "role": "subject",
          "order": 1
        },
        {
          "text": "enthält",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "Torx- und Kreuzschlitz-Bits",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric compact screwdriver bit case set with magnetic holder"
    },
    {
      "de": "das Bit",
      "pron": "das bit",
      "es": "punta de atornillar 1/4\"",
      "type": "Sustantivo (Neutro)",
      "category": "Handwerkzeuge",
      "plural": "die Bits",
      "regimen": "1/4 Zoll Sechskant",
      "exampleSentenceDe": "Ich setze das Torx-Bit in den Bithalter ein.",
      "exampleSentenceEs": "Inserto la punta Torx en el portapuntas.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "setze",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "das Torx-Bit in den Bithalter",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric steel Torx screwdriver bit with hexagonal base"
    },
    {
      "de": "die Bitverlängerung",
      "pron": "di bít-fea-léng-e-rung",
      "es": "prolongador imantado para puntas",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Bitverlängerungen",
      "regimen": "Magnethalter",
      "exampleSentenceDe": "Für tiefe Schrauben nutze ich die Bitverlängerung.",
      "exampleSentenceEs": "Para tornillos profundos uso el prolongador de puntas.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Für tiefe Schrauben",
          "role": "complement",
          "order": 1
        },
        {
          "text": "nutze",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "die Bitverlängerung",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric magnetic bit extension bar rod"
    },
    {
      "de": "der Akku-Bohrhammer",
      "pron": "dea á-ku-bóa-ja-ma",
      "es": "martillo perforador a batería (SDS-Plus)",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Akku-Bohrhämmer",
      "regimen": "SDS-Plus Aufnahme",
      "exampleSentenceDe": "Der Akku-Bohrhammer bohrt mühelos Löcher in Beton.",
      "exampleSentenceEs": "El martillo perforador a batería taladra sin esfuerzo agujeros en hormigón.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Akku-Bohrhammer",
          "role": "subject",
          "order": 1
        },
        {
          "text": "bohrt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "mühelos Löcher",
          "role": "complement",
          "order": 3
        },
        {
          "text": "in Beton",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric heavy duty cordless rotary hammer drill with SDS-plus chuck"
    },
    {
      "de": "das Akku-Ladegerät",
      "pron": "das á-ku-lá-de-gue-ret",
      "es": "cargador rápido de batería",
      "type": "Sustantivo (Neutro)",
      "category": "Handwerkzeuge",
      "plural": "die Akku-Ladegeräte",
      "regimen": "Schnellladegerät",
      "exampleSentenceDe": "Ich stecke den leeren Akku in das Akku-Ladegerät.",
      "exampleSentenceEs": "Enchufo la batería vacía en el cargador.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "stecke",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den leeren Akku",
          "role": "complement",
          "order": 3
        },
        {
          "text": "in das Akku-Ladegerät",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric fast desktop battery charging dock station with LED light"
    },
    {
      "de": "der Bohrer",
      "pron": "dea bóa-ra",
      "es": "broca para mampostería/metal",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Bohrer",
      "regimen": "Steinbohrer / Metallbohrer",
      "exampleSentenceDe": "Ich nehme einen Sechser-Bohrer für den Dübel.",
      "exampleSentenceEs": "Tomo una broca del seis para el taco.",
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
          "text": "einen Sechser-Bohrer",
          "role": "complement",
          "order": 3
        },
        {
          "text": "für den Dübel",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric spiral masonry drill bit with carbide tip"
    },
    {
      "de": "der Stufenbohrer",
      "pron": "dea shtú-fen-bóa-ra",
      "es": "broca cónica escalonada",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Stufenbohrer",
      "regimen": "M12 bis M40",
      "exampleSentenceDe": "Mit dem Stufenbohrer bohre ich saubere Löcher für Kabelverschraubungen.",
      "exampleSentenceEs": "Con la broca escalonada taladro agujeros limpios para prensaestopas.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Stufenbohrer",
          "role": "complement",
          "order": 1
        },
        {
          "text": "bohre",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "saubere Löcher für Kabelverschraubungen",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric stepped conical spiral cone drill bit tool"
    },
    {
      "de": "der Winkelschleifer",
      "pron": "dea vín-kel-shlái-fa",
      "es": "amoladora angular (radial)",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Winkelschleifer",
      "regimen": "Trennscheibe 125 mm",
      "exampleSentenceDe": "Der Winkelschleifer schneidet die Metallschiene schnell ab.",
      "exampleSentenceEs": "La amoladora angular corta la pletina de metal rápidamente.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Winkelschleifer",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schneidet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Metallschiene schnell",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric cordless handheld angle grinder with disc guard"
    },
    {
      "de": "der Schraubendreher",
      "pron": "dea shráu-ben-dre-a",
      "es": "destornillador aislado VDE",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Schraubendreher",
      "regimen": "VDE 1000 V",
      "exampleSentenceDe": "Der Elektriker nutzt einen isolierten Schraubendreher.",
      "exampleSentenceEs": "El electricista utiliza un destornillador aislado.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Elektriker",
          "role": "subject",
          "order": 1
        },
        {
          "text": "nutzt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "einen isolierten Schraubendreher",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric yellow and red insulated VDE electrical screwdriver"
    },
    {
      "de": "der Schraubendreher SL-PZ2",
      "pron": "dea shráu-ben-dre-a es-el-pe-tset-tsvai",
      "es": "destornillador PlusMinus SL/PZ2 para automáticos",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Schraubendreher SL-PZ2",
      "regimen": "Kombiprofil PlusMinus",
      "exampleSentenceDe": "Der SL-PZ2 Schraubendreher passt perfekt auf Sicherungsautomaten.",
      "exampleSentenceEs": "El destornillador SL-PZ2 encaja perfectamente en los interruptores automáticos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der SL-PZ2 Schraubendreher",
          "role": "subject",
          "order": 1
        },
        {
          "text": "passt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "perfekt auf Sicherungsautomaten",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric PlusMinus SL PZ2 terminal block screwdriver"
    },
    {
      "de": "der Sechskant-Schraubendreher",
      "pron": "dea zéjs-kant-shráu-ben-dre-a",
      "es": "destornillador hexagonal (tipo Allen)",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Sechskant-Schraubendreher",
      "regimen": "Inbus / Hex",
      "exampleSentenceDe": "Mit dem Sechskant-Schraubendreher ziehe ich die HLAK-Klemmen an.",
      "exampleSentenceEs": "Con el destornillador hexagonal aprieto los bornes del HLAK.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Sechskant-Schraubendreher",
          "role": "complement",
          "order": 1
        },
        {
          "text": "ziehe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich die HLAK-Klemmen",
          "role": "subject",
          "order": 3
        },
        {
          "text": "an",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric hex Allen ball-end insulated screwdriver"
    },
    {
      "de": "die automatische Abisolierzange",
      "pron": "di au-to-má-ti-she áp-i-zo-lía-tsang-e",
      "es": "pelacables automático de pistola",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die automatischen Abisolierzangen",
      "regimen": "0,5 - 10 mm²",
      "exampleSentenceDe": "Die automatische Abisolierzange entfernt die Aderisolierung sekundenschnell.",
      "exampleSentenceEs": "El pelacables automático retira el aislamiento del conductor en segundos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die automatische Abisolierzange",
          "role": "subject",
          "order": 1
        },
        {
          "text": "entfernt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Aderisolierung",
          "role": "complement",
          "order": 3
        },
        {
          "text": "sekundenschnell",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric pistol-grip automatic wire cable stripper pliers"
    },
    {
      "de": "die Abisolierzange",
      "pron": "di áp-i-zo-lía-tsang-e",
      "es": "alicate pelacables manual regulable",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Abisolierzangen",
      "regimen": "VDE mit Stellschraube",
      "exampleSentenceDe": "Ich stelle die Schraube der Abisolierzange auf den Aderquerschnitt ein.",
      "exampleSentenceEs": "Ajusto el tornillo del alicate pelacables a la sección del conductor.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "stelle",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Schraube der Abisolierzange auf den Aderquerschnitt",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric VDE manual wire stripper pliers with adjusting screw"
    },
    {
      "de": "der Kabelentmantler",
      "pron": "dea ká-bel-ent-mánt-la",
      "es": "desenvainador cilíndrico de cables",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Kabelentmantler",
      "regimen": "z.B. Jokari / Cimco",
      "exampleSentenceDe": "Mit dem Kabelentmantler entferne ich den Außenmantel des NYM-Kabels.",
      "exampleSentenceEs": "Con el desenvainador retiro la cubierta exterior del cable NYM.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Kabelentmantler",
          "role": "complement",
          "order": 1
        },
        {
          "text": "entferne",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "den Außenmantel des NYM-Kabels",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric cylindrical pocket cable dismantling tool"
    },
    {
      "de": "das Jokari-Kabelmesser",
      "pron": "das yo-ká-ri-ká-bel-me-sa",
      "es": "cuchillo pelacables Jokari con uña guía",
      "type": "Sustantivo (Neutro)",
      "category": "Handwerkzeuge",
      "plural": "die Jokari-Kabelmesser",
      "regimen": "Schleppklinge",
      "exampleSentenceDe": "Das Jokari-Kabelmesser schneidet den Kabelmantel längs auf.",
      "exampleSentenceEs": "El cuchillo Jokari rasga la cubierta del cable longitudinalmente.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Jokari-Kabelmesser",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schneidet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Kabelmantel längs",
          "role": "complement",
          "order": 3
        },
        {
          "text": "auf",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric red Jokari cable stripping knife with hooked guide bracket"
    },
    {
      "de": "die Plombenzange",
      "pron": "di plóm-ben-tsang-e",
      "es": "alicate para prensar precintos de contador",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Plombenzangen",
      "regimen": "Zählerplombierung",
      "exampleSentenceDe": "Nach der Montage verplombe ich den Zähler mit der Plombenzange.",
      "exampleSentenceEs": "Tras el montaje precinto el contador con el alicate de precintos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Nach der Montage",
          "role": "complement",
          "order": 1
        },
        {
          "text": "verplombe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "den Zähler mit der Plombenzange",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric sealing pliers for lead security seals"
    },
    {
      "de": "die Kabelschere mit Doppelschneide",
      "pron": "di ká-bel-she-re mit dóp-pel-shnái-de",
      "es": "tijera cortacables de doble filo",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Kabelscheren",
      "regimen": "Quetschfreier Schnitt",
      "exampleSentenceDe": "Die Kabelschere mit Doppelschneide trennt dicke Kupferleiter ohne Quetschen.",
      "exampleSentenceEs": "La tijera cortacables de doble filo corta conductores gruesos sin aplastar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Kabelschere mit Doppelschneide",
          "role": "subject",
          "order": 1
        },
        {
          "text": "trennt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "dicke Kupferleiter",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ohne Quetschen",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric heavy duty double-edge cable shears cutters"
    },
    {
      "de": "der Seitenschneider",
      "pron": "dea zái-ten-shnái-da",
      "es": "alicate de corte diagonal VDE",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Seitenschneider",
      "regimen": "VDE 1000 V",
      "exampleSentenceDe": "Ich schneide die Kabelbinder bündig mit dem Seitenschneider ab.",
      "exampleSentenceEs": "Corto las bridas al ras con el alicate de corte diagonal.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schneide",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Kabelbinder bündig mit dem Seitenschneider",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric red-yellow insulated diagonal cutting pliers"
    },
    {
      "de": "die Crimpzange (6-kant)",
      "pron": "di krímp-tsang-e zéjs-kant",
      "es": "crimpadora hexagonal autoajustable",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Crimpzangen",
      "regimen": "Aderendhülsen 0,08-16 mm²",
      "exampleSentenceDe": "Die 6-kant Crimpzange presst die Aderendhülse perfekt rund.",
      "exampleSentenceEs": "La crimpadora hexagonal prensa la puntera perfectamente redonda.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die 6-kant Crimpzange",
          "role": "subject",
          "order": 1
        },
        {
          "text": "presst",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Aderendhülse",
          "role": "complement",
          "order": 3
        },
        {
          "text": "perfekt rund",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric self-adjusting hexagonal wire ferrule crimping tool"
    },
    {
      "de": "die Presszange (4-kant)",
      "pron": "di prés-tsang-e fía-kant",
      "es": "pinza de engaste cuadrado",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Presszangen",
      "regimen": "Quadratische Pressung",
      "exampleSentenceDe": "Mit der 4-kant Presszange presse ich die Aderendhülsen für Reihenklemmen.",
      "exampleSentenceEs": "Con la pinza de engaste cuadrado prenso las punteras para bornas de carril.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit der 4-kant Presszange",
          "role": "complement",
          "order": 1
        },
        {
          "text": "presse",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "die Aderendhülsen für Reihenklemmen",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric square profile ferrule crimper pliers"
    },
    {
      "de": "die Klauke-Presszange",
      "pron": "di kláu-ke-prés-tsang-e",
      "es": "tenaza de prensar Klauke para terminales tubulares",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Klauke-Presszangen",
      "regimen": "Rohrkabelschuhe 10-70 mm²",
      "exampleSentenceDe": "Für den 16 mm² Erdungskabelschuh verwende ich die Klauke-Presszange.",
      "exampleSentenceEs": "Para el terminal de tierra de 16 mm² utilizo la tenaza Klauke.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Für den 16 mm² Erdungskabelschuh",
          "role": "complement",
          "order": 1
        },
        {
          "text": "verwende",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "die Klauke-Presszange",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric heavy mechanical Klauke tubular lug crimper with long handles"
    },
    {
      "de": "der Inbusschlüssel",
      "pron": "dea ín-bus-shlú-sel",
      "es": "llave Allen (hexagonal en L)",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Inbusschlüssel",
      "regimen": "Sechskant metrisch",
      "exampleSentenceDe": "Ich ziehe die Gehäuseschrauben mit dem Inbusschlüssel fest.",
      "exampleSentenceEs": "Aprieto los tornillos de la carcasa con la llave Allen.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ziehe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Gehäuseschrauben mit dem Inbusschlüssel",
          "role": "complement",
          "order": 3
        },
        {
          "text": "fest",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric L-shaped hex key Allen wrench set"
    },
    {
      "de": "der Ratschen-Ringmaulschlüssel",
      "pron": "dea rát-shen-ríng-maul-shlú-sel",
      "es": "llave combinada plana con carraca",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Ratschen-Ringmaulschlüssel",
      "regimen": "Feinverzahnt",
      "exampleSentenceDe": "Der Ratschen-Ringmaulschlüssel beschleunigt die Montage im Zählerschrank.",
      "exampleSentenceEs": "La llave combinada con carraca acelera el montaje en el armario del contador.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Ratschen-Ringmaulschlüssel",
          "role": "subject",
          "order": 1
        },
        {
          "text": "beschleunigt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Montage",
          "role": "complement",
          "order": 3
        },
        {
          "text": "im Zählerschrank",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric chrome combination ratcheting spanner wrench"
    },
    {
      "de": "der Hammer",
      "pron": "dea já-ma",
      "es": "martillo de cerrajero con mango de madera",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Hämmer",
      "regimen": "DIN 1041 (300 g)",
      "exampleSentenceDe": "Ich schlage die Nagelschellen mit dem Hammer ein.",
      "exampleSentenceEs": "Clavo las grapas de clavo con el martillo.",
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
          "text": "die Nagelschellen mit dem Hammer",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric steel machinist hammer with wooden handle"
    },
    {
      "de": "der Gummihammer",
      "pron": "dea gú-mi-ja-ma",
      "es": "martillo / maza de goma",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Gummihämmer",
      "regimen": "Schonhammer",
      "exampleSentenceDe": "Mit dem Gummihammer drücke ich den Kabelkanaldeckel schonend fest.",
      "exampleSentenceEs": "Con el martillo de goma encajo la tapa de la canaleta sin dañarla.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Gummihammer",
          "role": "complement",
          "order": 1
        },
        {
          "text": "drücke",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich den Kabelkanaldeckel schonend",
          "role": "subject",
          "order": 3
        },
        {
          "text": "fest",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric black rubber mallet hammer tool"
    },
    {
      "de": "die Rundzange",
      "pron": "di rúnt-tsang-e",
      "es": "alicate de puntas redondas aisladas",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Rundzangen",
      "regimen": "VDE 1000 V",
      "exampleSentenceDe": "Mit der Rundzange biege ich Ösen an starre Kupferdrähte.",
      "exampleSentenceEs": "Con el alicate de punta redonda doblo ojales en cables de cobre rígidos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit der Rundzange",
          "role": "complement",
          "order": 1
        },
        {
          "text": "biege",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "Ösen an starre Kupferdrähte",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric round nose electrical wire bending pliers"
    },
    {
      "de": "der Elektroseitenschneider",
      "pron": "dea e-lék-tro-zái-ten-shnái-da",
      "es": "alicate de corte lateral de precisión para electricista",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Elektroseitenschneider",
      "regimen": "Präzisions-VDE",
      "exampleSentenceDe": "Der Elektroseitenschneider kappt dünne Datenleitungen sauber.",
      "exampleSentenceEs": "El cortacables de precisión corta cables finos de datos limpiamente.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Elektroseitenschneider",
          "role": "subject",
          "order": 1
        },
        {
          "text": "kappt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "dünne Datenleitungen",
          "role": "complement",
          "order": 3
        },
        {
          "text": "sauber",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric precision electronic flush wire cutter pliers"
    },
    {
      "de": "die Wasserwaage",
      "pron": "di vás-sa-va-gue",
      "es": "nivel de burbuja de aluminio",
      "type": "Sustantivo (Fem)",
      "category": "Messwerkzeuge",
      "plural": "die Wasserwaagen",
      "regimen": "Horizontale / Vertikale Libelle",
      "exampleSentenceDe": "Ich richte den Verteilerkasten mit der Wasserwaage waagerecht aus.",
      "exampleSentenceEs": "Nivelo el cuadro de distribución horizontalmente con el nivel de burbuja.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "richte",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Verteilerkasten mit der Wasserwaage waagerecht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "aus",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric yellow aluminum bubble spirit level"
    },
    {
      "de": "der Zollstock",
      "pron": "dea tsól-shtok",
      "es": "metro plegable de madera (2 m)",
      "type": "Sustantivo (Masc)",
      "category": "Messwerkzeuge",
      "plural": "die Zollstöcke",
      "regimen": "Gliedermaßstab",
      "exampleSentenceDe": "Ich messe die Höhe der Steckdose mit dem Zollstock.",
      "exampleSentenceEs": "Mido la altura de la toma de corriente con el metro plegable.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "messe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Höhe der Steckdose",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem Zollstock",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric wooden folding carpenter ruler measuring stick"
    },
    {
      "de": "der Anschlagwinkel",
      "pron": "dea án-shlak-vín-kel",
      "es": "escuadra de taller de 90° con talón",
      "type": "Sustantivo (Masc)",
      "category": "Messwerkzeuge",
      "plural": "die Anschlagwinkel",
      "regimen": "90-Grad-Winkel",
      "exampleSentenceDe": "Mit dem Anschlagwinkel zeichne ich den Schnitt am Kabelkanal an.",
      "exampleSentenceEs": "Con la escuadra marco el corte en la canaleta.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Anschlagwinkel",
          "role": "complement",
          "order": 1
        },
        {
          "text": "zeichne",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich den Schnitt am Kabelkanal",
          "role": "subject",
          "order": 3
        },
        {
          "text": "an",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric 90 degree steel try square with stop ledge"
    },
    {
      "de": "das Sicherheitsmesser",
      "pron": "das zí-jea-jaits-me-sa",
      "es": "cúter de seguridad autoretráctil",
      "type": "Sustantivo (Neutro)",
      "category": "Handwerkzeuge",
      "plural": "die Sicherheitsmesser",
      "regimen": "Automatischer Klingenrückzug",
      "exampleSentenceDe": "Das Sicherheitsmesser zieht die Klinge nach dem Schnitt sofort ein.",
      "exampleSentenceEs": "El cuchillo de seguridad repliega la cuchilla de inmediato tras el corte.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Sicherheitsmesser",
          "role": "subject",
          "order": 1
        },
        {
          "text": "zieht",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Klinge nach dem Schnitt sofort",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric auto-retractable utility safety cutter knife"
    },
    {
      "de": "die Puksäge",
      "pron": "di púk-ze-gue",
      "es": "sierra de mano pequeña para metal (tipo PUK)",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Puksägen",
      "regimen": "Kleinsägebogen",
      "exampleSentenceDe": "Ich säge die Hutschiene mit der Puksäge ab.",
      "exampleSentenceEs": "Sierro el carril DIN con la sierra de mano PUK.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "säge",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Hutschiene mit der Puksäge",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric compact metal hacksaw PUK saw with red handle"
    },
    {
      "de": "die Metallsäge",
      "pron": "di me-tál-ze-gue",
      "es": "arco de sierra para metal de 300 mm",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die Metallsägen",
      "regimen": "HSS-Sägeblatt",
      "exampleSentenceDe": "Mit der Metallsäge kürze ich das Schutzrohr M40.",
      "exampleSentenceEs": "Con la sierra para metal acorto el tubo protector M40.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit der Metallsäge",
          "role": "complement",
          "order": 1
        },
        {
          "text": "kürze",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "das Schutzrohr M40",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric large metal hacksaw frame with tension screw"
    },
    {
      "de": "das Sicherheits-Cuttermesser",
      "pron": "das zí-jea-jaits-kát-ta-me-sa",
      "es": "cúter metálico con bloqueo de hoja",
      "type": "Sustantivo (Neutro)",
      "category": "Handwerkzeuge",
      "plural": "die Cuttermesser",
      "regimen": "Abbrechklinge 18 mm",
      "exampleSentenceDe": "Ich öffne den Karton vorsichtig mit dem Sicherheits-Cuttermesser.",
      "exampleSentenceEs": "Abro la caja de cartón con cuidado con el cúter de seguridad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "öffne",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Karton vorsichtig",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem Sicherheits-Cuttermesser",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric sturdy metal box utility snap-off blade knife"
    },
    {
      "de": "der Zimmermannsstift",
      "pron": "dea tsím-ma-mans-shtift",
      "es": "lápiz de carpintero de grafito plano",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Zimmermannsstifte",
      "regimen": "Ovale Flachmine",
      "exampleSentenceDe": "Ich markiere die Bohrlöcher auf der Wand mit dem roten Zimmermannsstift.",
      "exampleSentenceEs": "Marco los puntos de taladrado en la pared con el lápiz de carpintero rojo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "markiere",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Bohrlöcher auf der Wand",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem roten Zimmermannsstift",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric red flat wooden carpenter pencil"
    },
    {
      "de": "die H07V-K-Leitung (1×10 mm²)",
      "pron": "di ja-núl-zí-ben-fau-ká-lái-tung",
      "es": "conductor unipolar flexible de cobre marrón 10 mm²",
      "type": "Sustantivo (Fem)",
      "category": "Kabel & Leitungen",
      "plural": "die H07V-K-Leitungen",
      "regimen": "Klasse 5 Feindraht",
      "exampleSentenceDe": "Wir verdrahten den Zählerschrank mit der braunen H07V-K-Leitung 10 mm².",
      "exampleSentenceEs": "Cableamos el armario del contador con el cable flexible H07V-K de 10 mm².",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wir",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verdrahten",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Zählerschrank",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit der braunen H07V-K-Leitung 10 mm²",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric spool of flexible brown single-core copper wire H07V-K 10mm"
    },
    {
      "de": "das H07RN-F-Kabel (5G4 / 5G6 mm²)",
      "pron": "das ja-núl-zí-ben-er-en-ef-ká-bel",
      "es": "manguera de goma de alta resistencia 5 hilos",
      "type": "Sustantivo (Neutro)",
      "category": "Kabel & Leitungen",
      "plural": "die H07RN-F-Kabel",
      "regimen": "Gummischlauchleitung",
      "exampleSentenceDe": "Das H07RN-F-Kabel verbindet die Wallbox im Außenbereich flexibel.",
      "exampleSentenceEs": "El cable de goma H07RN-F conecta la Wallbox en exteriores de forma flexible.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das H07RN-F-Kabel",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verbindet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Wallbox im Außenbereich",
          "role": "complement",
          "order": 3
        },
        {
          "text": "flexibel",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric thick black heavy duty rubber flexible cable 5-wire"
    },
    {
      "de": "das NYY-J-Kabel (5×2,5 / 5×4 mm²)",
      "pron": "das en-ípsilon-ípsilon-yot-ká-bel",
      "es": "cable de energía enterrado negro de PVC",
      "type": "Sustantivo (Neutro)",
      "category": "Kabel & Leitungen",
      "plural": "die NYY-J-Kabel",
      "regimen": "Erdkabel 0,6/1 kV",
      "exampleSentenceDe": "Das schwarze NYY-J-Kabel ist für die Verlegung im Erdreich zugelassen.",
      "exampleSentenceEs": "El cable negro NYY-J está homologado para su instalación enterrada.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das schwarze NYY-J-Kabel",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "für die Verlegung im Erdreich",
          "role": "complement",
          "order": 3
        },
        {
          "text": "zugelassen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric thick black underground direct burial power cable NYY-J"
    },
    {
      "de": "die NYY-J-Leitung (1×10 / 1×16 mm²)",
      "pron": "di en-ípsilon-ípsilon-yot-lái-tung",
      "es": "conductor unipolar de tierra negro rígido",
      "type": "Sustantivo (Fem)",
      "category": "Kabel & Leitungen",
      "plural": "die NYY-J-Leitungen",
      "regimen": "Hauptpotenzialausgleich",
      "exampleSentenceDe": "Die NYY-J-Leitung 1×16 mm² führt von der Poti-Schiene zum Tiefenerder.",
      "exampleSentenceEs": "El cable NYY-J 1×16 mm² va desde la barra equipotencial hasta la pica de tierra.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die NYY-J-Leitung 1×16 mm²",
          "role": "subject",
          "order": 1
        },
        {
          "text": "führt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "von der Poti-Schiene",
          "role": "complement",
          "order": 3
        },
        {
          "text": "zum Tiefenerder",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric roll of heavy black single-core grounding cable"
    },
    {
      "de": "das NYM-J-Kabel (3×2,5 mm²)",
      "pron": "das en-ípsilon-em-yot-ká-bel",
      "es": "manguera eléctrica gris monofásica estándar",
      "type": "Sustantivo (Neutro)",
      "category": "Kabel & Leitungen",
      "plural": "die NYM-J-Kabel",
      "regimen": "Mantelleitung starr",
      "exampleSentenceDe": "Das graue NYM-J-Kabel 3×2,5 mm² versorgt die Steckdosen.",
      "exampleSentenceEs": "El cable gris NYM-J 3×2,5 mm² alimenta las tomas de corriente.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das graue NYM-J-Kabel 3×2,5 mm²",
          "role": "subject",
          "order": 1
        },
        {
          "text": "versorgt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Steckdosen",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric grey residential sheath installation cable 3-wire NYM-J"
    },
    {
      "de": "das NYM-J-Kabel (5×10 mm²)",
      "pron": "das en-ípsilon-em-yot-ká-bel fúnf mal tsen",
      "es": "cable trifásico gris de 10 mm² para subcuadros",
      "type": "Sustantivo (Neutro)",
      "category": "Kabel & Leitungen",
      "plural": "die NYM-J-Kabel",
      "regimen": "Drehstrom 5-adrig",
      "exampleSentenceDe": "Das NYM-J 5×10 mm² verbindet den Zähler mit der Unterverteilung.",
      "exampleSentenceEs": "El cable NYM-J 5×10 mm² une el contador con el cuadro secundario.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das NYM-J 5×10 mm²",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verbindet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Zähler",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit der Unterverteilung",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric thick grey 5-wire NYM-J power cable coil"
    },
    {
      "de": "das NYM-J-Kabel (5×16 mm²)",
      "pron": "das en-ípsilon-em-yot-ká-bel fúnf mal zéj-tsen",
      "es": "cable de acometida trifásica gris de 16 mm²",
      "type": "Sustantivo (Neutro)",
      "category": "Kabel & Leitungen",
      "plural": "die NYM-J-Kabel",
      "regimen": "Hauptzuleitung",
      "exampleSentenceDe": "Die Hauptzuleitung zum Zählerschrank besteht aus einem NYM-J 5×16 mm².",
      "exampleSentenceEs": "La acometida principal al armario del contador consiste en un NYM-J 5×16 mm².",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Hauptzuleitung zum Zählerschrank",
          "role": "subject",
          "order": 1
        },
        {
          "text": "besteht",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "aus einem NYM-J 5×16 mm²",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric heavy duty 5x16mm grey installation cable roll"
    },
    {
      "de": "das LiYCY-Kabel",
      "pron": "das el-i-ípsilon-tse-ípsilon-ká-bel",
      "es": "cable apantallado de comunicación (Modbus/RS485)",
      "type": "Sustantivo (Neutro)",
      "category": "Kabel & Leitungen",
      "plural": "die LiYCY-Kabel",
      "regimen": "EMV-Schirmung",
      "exampleSentenceDe": "Das LiYCY-Kabel überträgt die Modbus-Daten zum Smart Meter störungsfrei.",
      "exampleSentenceEs": "El cable LiYCY transmite los datos Modbus al Smart Meter sin interferencias.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das LiYCY-Kabel",
          "role": "subject",
          "order": 1
        },
        {
          "text": "überträgt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Modbus-Daten zum Smart Meter",
          "role": "complement",
          "order": 3
        },
        {
          "text": "störungsfrei",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric shielded grey data control cable with braided metal wire mesh"
    },
    {
      "de": "das LAN-Kabel",
      "pron": "das lán-ká-bel",
      "es": "cable de red Ethernet (Cat 7)",
      "type": "Sustantivo (Neutro)",
      "category": "Netzwerk",
      "plural": "die LAN-Kabel",
      "regimen": "Verlegekabel Cat.7",
      "exampleSentenceDe": "Ich verlege das LAN-Kabel vom Wechselrichter zum Router.",
      "exampleSentenceEs": "Tiendo el cable LAN desde el inversor hasta el router.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verlege",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "das LAN-Kabel",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vom Wechselrichter zum Router",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric twisted pair Ethernet network LAN cable spool"
    },
    {
      "de": "das Patchkabel",
      "pron": "das pétsh-ká-bel",
      "es": "latiguillo de red flexible con conectores RJ45",
      "type": "Sustantivo (Neutro)",
      "category": "Netzwerk",
      "plural": "die Patchkabel",
      "regimen": "RJ45 Stecker",
      "exampleSentenceDe": "Ich stecke das blaue Patchkabel in den Switch.",
      "exampleSentenceEs": "Conecto el latiguillo de red azul en el switch.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "stecke",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "das blaue Patchkabel",
          "role": "complement",
          "order": 3
        },
        {
          "text": "in den Switch",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric short flexible blue Ethernet patch cord cable with RJ45 plugs"
    },
    {
      "de": "die NYY-J-Leitung (1×16 mm²)",
      "pron": "di en-ípsilon-ípsilon-yot-lái-tung",
      "es": "línea principal de puesta a tierra (1×16 mm²)",
      "type": "Sustantivo (Fem)",
      "category": "Kabel & Leitungen",
      "plural": "die NYY-J-Leitungen",
      "regimen": "Blitzschutz & Erdung",
      "exampleSentenceDe": "Die NYY-J-Leitung 1×16 mm² schützt die PV-Anlage vor Überspannung.",
      "exampleSentenceEs": "El cable NYY-J 1×16 mm² protege la instalación fotovoltaica contra sobretensiones.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die NYY-J-Leitung 1×16 mm²",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die PV-Anlage",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vor Überspannung",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric heavy black copper ground line single wire cable"
    },
    {
      "de": "die Aderendhülse (1×10 mm²)",
      "pron": "di á-da-ent-júl-ze",
      "es": "puntera hueca aislada de 10 mm² (roja)",
      "type": "Sustantivo (Fem)",
      "category": "Verbindungstechnik",
      "plural": "die Aderendhülsen",
      "regimen": "DIN 46228-4 (Rot)",
      "exampleSentenceDe": "Vor dem Festschrauben crimpe ich eine rote Aderendhülse auf das 10 mm² Kabel.",
      "exampleSentenceEs": "Antes de atornillar crimpo una puntera roja en el cable de 10 mm².",
      "exampleSentenceDeBlocks": [
        {
          "text": "Vor dem Festschrauben",
          "role": "complement",
          "order": 1
        },
        {
          "text": "crimpe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "eine rote Aderendhülse auf das 10 mm² Kabel",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric insulated red copper wire ferrule sleeve 10mm"
    },
    {
      "de": "die Aderendhülse (1×16 mm²)",
      "pron": "di á-da-ent-júl-ze",
      "es": "puntera hueca aislada de 16 mm² (azul)",
      "type": "Sustantivo (Fem)",
      "category": "Verbindungstechnik",
      "plural": "die Aderendhülsen",
      "regimen": "DIN 46228-4 (Blau)",
      "exampleSentenceDe": "Der 16 mm² Leiter benötigt eine blaue Aderendhülse.",
      "exampleSentenceEs": "El conductor de 16 mm² requiere una puntera azul.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der 16 mm² Leiter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "benötigt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "eine blaue Aderendhülse",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric blue insulated copper cord end terminal ferrule 16mm"
    },
    {
      "de": "die Doppel-Aderendhülse (10 mm²)",
      "pron": "di dóp-pel-á-da-ent-júl-ze",
      "es": "puntera doble (Twin) para dos cables de 10 mm²",
      "type": "Sustantivo (Fem)",
      "category": "Verbindungstechnik",
      "plural": "die Doppel-Aderendhülsen",
      "regimen": "Twin-Hülse",
      "exampleSentenceDe": "Mit der Doppel-Aderendhülse klemme ich zwei 10 mm² Leiter in einen Anschluss.",
      "exampleSentenceEs": "Con la puntera doble conecto dos conductores de 10 mm² en un solo borne.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit der Doppel-Aderendhülse",
          "role": "complement",
          "order": 1
        },
        {
          "text": "klemme",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "zwei 10 mm² Leiter in einen Anschluss",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric twin double wire ferrule with flared red plastic collar"
    },
    {
      "de": "der Rohrkabelschuh",
      "pron": "dea róa-ká-bel-shu",
      "es": "terminal tubular de cobre con ojal de tornillo",
      "type": "Sustantivo (Masc)",
      "category": "Verbindungstechnik",
      "plural": "die Rohrkabelschuhe",
      "regimen": "M8 / M10 Ringöse",
      "exampleSentenceDe": "Ich schraube den Rohrkabelschuh auf den Massebolzen des Wechselrichters.",
      "exampleSentenceEs": "Atornillo el terminal de anillo en el perno de masa del inversor.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schraube",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Rohrkabelschuh",
          "role": "complement",
          "order": 3
        },
        {
          "text": "auf den Massebolzen des Wechselrichters",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric tinned copper heavy duty ring lug terminal connector"
    },
    {
      "de": "die Hauptleitungsabzweigklemme (HLAK)",
      "pron": "di jáupt-lái-tungs-áp-tsvaik-klé-me",
      "es": "bloque de bornes de derivación principal (HLAK)",
      "type": "Sustantivo (Fem)",
      "category": "Verteilertechnik",
      "plural": "die Hauptleitungsabzweigklemmen",
      "regimen": "DIN VDE 0603-2",
      "exampleSentenceDe": "Auf der HLAK verteilen wir die Phasen L1, L2 und L3 sicher.",
      "exampleSentenceEs": "En el HLAK distribuimos las fases L1, L2 y L3 con seguridad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf der HLAK",
          "role": "complement",
          "order": 1
        },
        {
          "text": "verteilen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wir die Phasen L1, L2 und L3",
          "role": "subject",
          "order": 3
        },
        {
          "text": "sicher",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric multi-pole main branch terminal block block HLAK DIN rail"
    },
    {
      "de": "die Sammelschienenklemme",
      "pron": "di zám-mel-shí-nen-klé-me",
      "es": "borne de conexión para pletina de cobre colectora",
      "type": "Sustantivo (Fem)",
      "category": "Verteilertechnik",
      "plural": "die Sammelschienenklemmen",
      "regimen": "40 mm Sammelschiene",
      "exampleSentenceDe": "Die Sammelschienenklemme klemmt den Leiter direkt auf die Kupferschiene.",
      "exampleSentenceEs": "El borne para barra colectora sujeta el conductor directamente a la pletina de cobre.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Sammelschienenklemme",
          "role": "subject",
          "order": 1
        },
        {
          "text": "klemmt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Leiter direkt",
          "role": "complement",
          "order": 3
        },
        {
          "text": "auf die Kupferschiene",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric copper busbar screw terminal clamp connector"
    },
    {
      "de": "die WAGO-Klemme",
      "pron": "di vá-go-klé-me",
      "es": "conector rápido de palancas basculantes WAGO",
      "type": "Sustantivo (Fem)",
      "category": "Verbindungstechnik",
      "plural": "die WAGO-Klemmen",
      "regimen": "Serie 221 (Compact)",
      "exampleSentenceDe": "Mit der WAGO-Klemme verbinde ich starre und flexible Leiter werkzeuglos.",
      "exampleSentenceEs": "Con el conector WAGO uno conductores rígidos y flexibles sin herramientas.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit der WAGO-Klemme",
          "role": "complement",
          "order": 1
        },
        {
          "text": "verbinde",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "starre und flexible Leiter werkzeuglos",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric clear transparent WAGO terminal connector with orange levers"
    },
    {
      "de": "der Stoßverbinder",
      "pron": "dea shtós-fea-bín-da",
      "es": "conector tubular de empalme termorretráctil",
      "type": "Sustantivo (Masc)",
      "category": "Verbindungstechnik",
      "plural": "die Stoßverbinder",
      "regimen": "Schrumpfisolierung",
      "exampleSentenceDe": "Ich crimpe den Stoßverbinder und erwärme ihn zum Abdichten.",
      "exampleSentenceEs": "Crimpo el conector de empalme y lo caliento para sellarlo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "crimpe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Stoßverbinder",
          "role": "complement",
          "order": 3
        },
        {
          "text": "und erwärme ihn zum Abdichten",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric blue heat-shrink crimp butt splice wire connector"
    },
    {
      "de": "die PE-Schiene",
      "pron": "di pe-é-shí-ne",
      "es": "barra colectora de tierra de latón (PE)",
      "type": "Sustantivo (Fem)",
      "category": "Verteilertechnik",
      "plural": "die PE-Schienen",
      "regimen": "Schutzleiter grün/gelb",
      "exampleSentenceDe": "Alle Schutzleiter werden an der grünen PE-Schiene angeschlossen.",
      "exampleSentenceEs": "Todos los conductores de tierra se conectan a la barra verde PE.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Alle Schutzleiter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "werden",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "an der grünen PE-Schiene",
          "role": "complement",
          "order": 3
        },
        {
          "text": "angeschlossen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric brass grounding busbar terminal strip on green insulated base"
    },
    {
      "de": "die Neutralleiterschiene",
      "pron": "di noi-trál-lái-ta-shí-ne",
      "es": "barra colectora de neutro (N)",
      "type": "Sustantivo (Fem)",
      "category": "Verteilertechnik",
      "plural": "die Neutralleiterschienen",
      "regimen": "Blau / N-Leiter",
      "exampleSentenceDe": "Die blauen Neutralleiter führen zur Neutralleiterschiene.",
      "exampleSentenceEs": "Los conductores neutros azules van hacia la barra de neutro.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die blauen Neutralleiter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "führen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "zur Neutralleiterschiene",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric blue neutral distribution busbar rail terminal"
    },
    {
      "de": "die Hutschiene (7,5 mm)",
      "pron": "di jút-shí-ne",
      "es": "carril DIN simétrico normalizado de 35×7,5 mm",
      "type": "Sustantivo (Fem)",
      "category": "Verteilertechnik",
      "plural": "die Hutschienen",
      "regimen": "DIN EN 60715 (TH35)",
      "exampleSentenceDe": "Die Sicherungsautomaten rasten auf der Hutschiene ein.",
      "exampleSentenceEs": "Los interruptores automáticos encajan en el carril DIN.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Sicherungsautomaten",
          "role": "subject",
          "order": 1
        },
        {
          "text": "rasten",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "auf der Hutschiene",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric galvanized slotted metal DIN rail strip track"
    },
    {
      "de": "der Unterverteiler (UVT)",
      "pron": "dea ún-ta-fea-tái-la",
      "es": "cuadro de distribución secundario / subcuadro",
      "type": "Sustantivo (Masc)",
      "category": "Verteilertechnik",
      "plural": "die Unterverteiler",
      "regimen": "Aufputzverteiler IP40/65",
      "exampleSentenceDe": "Die Sicherungen für die Wallbox montieren wir im Unterverteiler.",
      "exampleSentenceEs": "Montamos los automáticos para la Wallbox en el subcuadro.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Sicherungen für die Wallbox",
          "role": "complement",
          "order": 1
        },
        {
          "text": "montieren",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wir",
          "role": "subject",
          "order": 3
        },
        {
          "text": "im Unterverteiler",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white wall surface-mount distribution electrical breaker box"
    },
    {
      "de": "der EHZ-Zähler",
      "pron": "dea e-já-tset-tsé-la",
      "es": "contador electrónico digital bidireccional (eHZ)",
      "type": "Sustantivo (Masc)",
      "category": "Verteilertechnik",
      "plural": "die EHZ-Zähler",
      "regimen": "Zweirichtungszähler",
      "exampleSentenceDe": "Der EHZ-Zähler misst die Einspeisung der Solaranlage und den Netzbezug.",
      "exampleSentenceEs": "El contador eHZ mide la inyección solar y el consumo de la red.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der EHZ-Zähler",
          "role": "subject",
          "order": 1
        },
        {
          "text": "misst",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Einspeisung der Solaranlage",
          "role": "complement",
          "order": 3
        },
        {
          "text": "und den Netzbezug",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric modern electronic digital smart electric meter eHZ plug-in module"
    },
    {
      "de": "der EHZ-Adapter",
      "pron": "dea e-já-tset-a-dáp-ta",
      "es": "placa adaptadora para contadores eHZ",
      "type": "Sustantivo (Masc)",
      "category": "Verteilertechnik",
      "plural": "die EHZ-Adapter",
      "regimen": "Befestigungs- und Kontaktiereinrichtung (BKE-I)",
      "exampleSentenceDe": "Mit dem EHZ-Adapter bauen wir den neuen Zähler auf die alte Zählertafel.",
      "exampleSentenceEs": "Con el adaptador eHZ montamos el contador nuevo en el panel de cruceta antiguo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem EHZ-Adapter",
          "role": "complement",
          "order": 1
        },
        {
          "text": "bauen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wir den neuen Zähler",
          "role": "subject",
          "order": 3
        },
        {
          "text": "auf die alte Zählertafel",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric plastic adapter mounting base plate for eHZ smart meter"
    },
    {
      "de": "der Einspeiseadapter",
      "pron": "dea áin-shpai-ze-a-dáp-ta",
      "es": "adaptador de alimentación para embarrado",
      "type": "Sustantivo (Masc)",
      "category": "Verteilertechnik",
      "plural": "die Einspeiseadapter",
      "regimen": "Sammelschienenabgriff",
      "exampleSentenceDe": "Der Einspeiseadapter verbindet die PV-Leitung mit dem Sammelschienensystem.",
      "exampleSentenceEs": "El adaptador de alimentación conecta la línea solar al sistema de barras.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Einspeiseadapter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verbindet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die PV-Leitung",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem Sammelschienensystem",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric busbar feed-in tap adapter module with contact clips"
    },
    {
      "de": "die Abdeckstreifen",
      "pron": "di áp-dek-shtrái-fen",
      "es": "tiras plásticas cubreranuras para cuadro",
      "type": "Sustantivo (Plural)",
      "category": "Verteilertechnik",
      "plural": "die Abdeckstreifen",
      "regimen": "Berührungsschutz IP30",
      "exampleSentenceDe": "Die Abdeckstreifen verschließen die freien Modulplätze im Verteiler.",
      "exampleSentenceEs": "Las tiras cubreranuras tapan los huecos libres en el cuadro.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Abdeckstreifen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verschließen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die freien Modulplätze",
          "role": "complement",
          "order": 3
        },
        {
          "text": "im Verteiler",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white plastic modular blanking filler strips for electrical panel"
    },
    {
      "de": "die Abdeckstreifen-Sperrbar",
      "pron": "di áp-dek-shtrái-fen-shpéa-bar",
      "es": "tapa con pestañas mecánicas de bloqueo",
      "type": "Sustantivo (Fem)",
      "category": "Verteilertechnik",
      "plural": "die Abdeckstreifen-Sperrbaren",
      "regimen": "Rastverschluss",
      "exampleSentenceDe": "Die Abdeckstreifen-Sperrbar verhindert das ungewollte Eindrücken der Tapa.",
      "exampleSentenceEs": "La tapa de bloqueo impide que la cubierta se desplace o hunda.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Abdeckstreifen-Sperrbar",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verhindert",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "das ungewollte Eindrücken",
          "role": "complement",
          "order": 3
        },
        {
          "text": "der Tapa",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric snap-lock panel cover bar strip with security clip teeth"
    },
    {
      "de": "der RJ45-Stecker",
      "pron": "dea er-yót-fünf-unt-fía-tsij-shté-ka",
      "es": "conector de red RJ45 apantallado",
      "type": "Sustantivo (Masc)",
      "category": "Netzwerk",
      "plural": "die RJ45-Stecker",
      "regimen": "Cat.6A feldkonfektionierbar",
      "exampleSentenceDe": "Ich crimpe den feldkonfektionierbaren RJ45-Stecker auf das Datenkabel.",
      "exampleSentenceEs": "Crimpo el conector RJ45 de montaje en campo en el cable de datos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "crimpe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den feldkonfektionierbaren RJ45-Stecker",
          "role": "complement",
          "order": 3
        },
        {
          "text": "auf das Datenkabel",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric shielded metallic male RJ45 network Ethernet plug connector"
    },
    {
      "de": "der Modularkupplungsverbinder (RJ45)",
      "pron": "dea mo-du-lár-kúp-lungs-fea-bín-da",
      "es": "acoplador modular hembra-hembra RJ45",
      "type": "Sustantivo (Masc)",
      "category": "Netzwerk",
      "plural": "die Modularkupplungsverbinder",
      "regimen": "Keystone / RJ45 Buchse",
      "exampleSentenceDe": "Der Modularkupplungsverbinder verlängert zwei LAN-Kabel miteinander.",
      "exampleSentenceEs": "El acoplador modular prolonga dos cables LAN entre sí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Modularkupplungsverbinder",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verlängert",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "zwei LAN-Kabel",
          "role": "complement",
          "order": 3
        },
        {
          "text": "miteinander",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric female-to-female RJ45 modular coupler keystone inline adapter"
    },
    {
      "de": "die Aufputz-Steckdose",
      "pron": "di áuf-puts-shték-do-ze",
      "es": "toma de corriente Schuko estanca de superficie",
      "type": "Sustantivo (Fem)",
      "category": "Installation",
      "plural": "die Aufputz-Steckdosen",
      "regimen": "IP44 Feuchtraum",
      "exampleSentenceDe": "Ich installiere die Aufputz-Steckdose im Keller neben dem Wechselrichter.",
      "exampleSentenceEs": "Instalo la toma de superficie en el sótano junto al inversor.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "installiere",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Aufputz-Steckdose im Keller",
          "role": "complement",
          "order": 3
        },
        {
          "text": "neben dem Wechselrichter",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric surface mounted grey outdoor Schuko wall power socket with flip cover"
    },
    {
      "de": "die NH-Sicherung",
      "pron": "di en-há-zí-je-rung",
      "es": "fusible de cuchilla de alta capacidad NH (NH00)",
      "type": "Sustantivo (Fem)",
      "category": "Schutzeinrichtungen",
      "plural": "die NH-Sicherungen",
      "regimen": "gG / gL Charakteristik",
      "exampleSentenceDe": "Die NH-Sicherung im Hausanschlusskasten schützt vor Kurzschluss.",
      "exampleSentenceEs": "El fusible NH en la caja general de acometida protege contra cortocircuitos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die NH-Sicherung im Hausanschlusskasten",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vor Kurzschluss",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric ceramic blade NH fuse cartridge with shiny knife contacts"
    },
    {
      "de": "die Schmelzsicherung",
      "pron": "di shmélts-zí-je-rung",
      "es": "fusible cerámico de rosca (Diazed/Neozed)",
      "type": "Sustantivo (Fem)",
      "category": "Schutzeinrichtungen",
      "plural": "die Schmelzsicherungen",
      "regimen": "D02 / 35A",
      "exampleSentenceDe": "Die 35A Schmelzsicherung sichert die Zuleitung des Wechselrichters ab.",
      "exampleSentenceEs": "El fusible cerámico de 35 A protege la acometida del inversor.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die 35A Schmelzsicherung",
          "role": "subject",
          "order": 1
        },
        {
          "text": "sichert",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Zuleitung des Wechselrichters",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric ceramic bottle cartridge fuse Neozed with contact tip"
    },
    {
      "de": "der FI/LS-Schalter 1-phasig (RCBO)",
      "pron": "dea ef-í-el-és-shál-ta",
      "es": "interruptor combinado diferencial y magnetotérmico 1P",
      "type": "Sustantivo (Masc)",
      "category": "Schutzeinrichtungen",
      "plural": "die FI/LS-Schalter",
      "regimen": "B16 / 30mA Typ A",
      "exampleSentenceDe": "Der 1-phasige FI/LS-Schalter schützt die Steckdose vor Überlast und Fehlerstrom.",
      "exampleSentenceEs": "El interruptor magnetotérmico-diferencial protege la base contra sobrecargas y fugas.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der 1-phasige FI/LS-Schalter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Steckdose",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vor Überlast und Fehlerstrom",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric compact single phase RCBO combined circuit breaker switch"
    },
    {
      "de": "der RCD / FI-Schalter (300 mA)",
      "pron": "dea er-tse-dé / ef-í-shál-ta",
      "es": "interruptor diferencial de protección contra incendios (300 mA)",
      "type": "Sustantivo (Masc)",
      "category": "Schutzeinrichtungen",
      "plural": "die FI-Schalter",
      "regimen": "Brandschutz Typ A / 300 mA",
      "exampleSentenceDe": "Der 300 mA FI-Schalter schützt die PV-Anlage vor Isolationsbränden.",
      "exampleSentenceEs": "El diferencial de 300 mA protege la instalación fotovoltaica contra incendios por aislamiento.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der 300 mA FI-Schalter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die PV-Anlage",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vor Isolationsbränden",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric 4-pole residual current circuit breaker RCD switch with test button"
    },
    {
      "de": "der LS-Schalter / LSS C16A 3P",
      "pron": "dea el-és-shál-ta tse-zéj-tsen-á",
      "es": "interruptor automático magnetotérmico tripolar C16A",
      "type": "Sustantivo (Masc)",
      "category": "Schutzeinrichtungen",
      "plural": "die LS-Schalter",
      "regimen": "Charakteristik C / 3-polig",
      "exampleSentenceDe": "Der 3-polige LS-Schalter C16 schützt die dreiphasige Zuleitung.",
      "exampleSentenceEs": "El interruptor automático tripolar C16 protege la línea trifásica.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der 3-polige LS-Schalter C16",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die dreiphasige Zuleitung",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric triple-pole 3-phase miniature circuit breaker MCB C16A"
    },
    {
      "de": "der FI/LS-Schalter (RCBO) 3-phasig",
      "pron": "dea ef-í-el-és-shál-ta drái-fá-zij",
      "es": "interruptor diferencial-magnetotérmico trifásico 4 polos",
      "type": "Sustantivo (Masc)",
      "category": "Schutzeinrichtungen",
      "plural": "die FI/LS-Schalter 3-phasig",
      "regimen": "Typ A / 30mA 4-polig",
      "exampleSentenceDe": "Die Wallbox wird durch einen 3-phasigen RCBO abgesichert.",
      "exampleSentenceEs": "La Wallbox queda protegida mediante un RCBO trifásico.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Wallbox",
          "role": "subject",
          "order": 1
        },
        {
          "text": "wird",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "durch einen 3-phasigen RCBO",
          "role": "complement",
          "order": 3
        },
        {
          "text": "abgesichert",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric 4-pole three-phase RCBO combination electrical breaker"
    },
    {
      "de": "der selektive Hauptleitungsschutzschalter (SLS)",
      "pron": "dea ze-lek-tí-ve jáupt-lái-tungs-shúts-shál-ta",
      "es": "interruptor selectivo de acometida (SLS de embarrado)",
      "type": "Sustantivo (Masc)",
      "category": "Schutzeinrichtungen",
      "plural": "die SLS-Schalter",
      "regimen": "SLS 35A/50A für Sammelschiene",
      "exampleSentenceDe": "Der SLS-Schalter sitzt im unteren Anschlussraum vor dem Zähler.",
      "exampleSentenceEs": "El interruptor SLS va en la zona inferior previa al contador.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der SLS-Schalter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "sitzt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "im unteren Anschlussraum",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vor dem Zähler",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric 3-pole selective main circuit breaker SLS mounted on busbar"
    },
    {
      "de": "der Kabelkanal",
      "pron": "dea ká-bel-ka-nál",
      "es": "canaleta plástica ranurada/ciega de PVC",
      "type": "Sustantivo (Masc)",
      "category": "Montage & Befestigung",
      "plural": "die Kabelkanäle",
      "regimen": "60x40 mm / 30x30 mm",
      "exampleSentenceDe": "Ich verlege die Leitungen ordentlich im weißen Kabelkanal.",
      "exampleSentenceEs": "Tiendo los cables ordenadamente dentro de la canaleta blanca.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verlege",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Leitungen ordentlich",
          "role": "complement",
          "order": 3
        },
        {
          "text": "im weißen Kabelkanal",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white plastic rectangular electrical cable trunking duct profile"
    },
    {
      "de": "das Endstück",
      "pron": "das ént-shtúk",
      "es": "tapa terminal embellecedora para canaleta",
      "type": "Sustantivo (Neutro)",
      "category": "Montage & Befestigung",
      "plural": "die Endstücke",
      "regimen": "Kanal-Formteil",
      "exampleSentenceDe": "Das Endstück schließt den Kabelkanal sauber an der Wand ab.",
      "exampleSentenceEs": "La pieza terminal remata la canaleta de cables limpiamente en la pared.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Endstück",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schließt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Kabelkanal sauber an der Wand",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white plastic end cap piece for cable trunking"
    },
    {
      "de": "das PVC-Rohr M40",
      "pron": "das pe-fau-tse-róa em-fía-tsij",
      "es": "tubo rígido de plástico gris M40 (40 mm)",
      "type": "Sustantivo (Neutro)",
      "category": "Montage & Befestigung",
      "plural": "die PVC-Rohre",
      "regimen": "Stangenrohr EN 61386",
      "exampleSentenceDe": "Das starre PVC-Rohr M40 schützt die Hauptleitung mechanisch.",
      "exampleSentenceEs": "El tubo rígido de PVC M40 protege la línea principal mecánicamente.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das starre PVC-Rohr M40",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Hauptleitung",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mechanisch",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric rigid grey plastic electrical conduit pipe M40"
    },
    {
      "de": "das Flexrohr",
      "pron": "das fléks-róa",
      "es": "tubo corrugado flexible de plástico negro",
      "type": "Sustantivo (Neutro)",
      "category": "Montage & Befestigung",
      "plural": "die Flexrohre",
      "regimen": "Wellrohr EN 61386",
      "exampleSentenceDe": "Das schwarze Flexrohr schützt das Kabel bei der Durchführung durch die Decke.",
      "exampleSentenceEs": "El tubo corrugado negro protege el cable al cruzar el techo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das schwarze Flexrohr",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "das Kabel bei der Durchführung",
          "role": "complement",
          "order": 3
        },
        {
          "text": "durch die Decke",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric flexible black corrugated electrical conduit hose pipe"
    },
    {
      "de": "die Quick-Schelle",
      "pron": "di kvík-shé-le",
      "es": "abrazadera plástica rápida a presión en C",
      "type": "Sustantivo (Fem)",
      "category": "Montage & Befestigung",
      "plural": "die Quick-Schellen",
      "regimen": "Klemmschelle M40",
      "exampleSentenceDe": "Ich drücke das PVC-Rohr mit einem Klick in die Quick-Schelle.",
      "exampleSentenceEs": "Encajo el tubo de PVC en la abrazadera rápida con un simple clic.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "drücke",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "das PVC-Rohr mit einem Klick",
          "role": "complement",
          "order": 3
        },
        {
          "text": "in die Quick-Schelle",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric grey plastic C-shaped push-in conduit pipe clamp bracket"
    },
    {
      "de": "der Kabelbinder",
      "pron": "dea ká-bel-bín-da",
      "es": "brida de amarre de nylon negro con cremallera",
      "type": "Sustantivo (Masc)",
      "category": "Montage & Befestigung",
      "plural": "die Kabelbinder",
      "regimen": "UV-beständig",
      "exampleSentenceDe": "Ich bündele die Leitungen mit einem schwarzen Kabelbinder.",
      "exampleSentenceEs": "Agrupo los cables con una brida negra.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "bündele",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Leitungen",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit einem schwarzen Kabelbinder",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric pack of black plastic zip cable ties"
    },
    {
      "de": "der Fertigspachtel",
      "pron": "dea fér-tij-shpáj-tel",
      "es": "masilla de relleno lista para usar en tubo",
      "type": "Sustantivo (Masc)",
      "category": "Montage & Befestigung",
      "plural": "die Fertigspachtel",
      "regimen": "Reparaturspachtel",
      "exampleSentenceDe": "Ich verschließe die Bohrlöcher sauber mit dem Fertigspachtel.",
      "exampleSentenceEs": "Tapo los agujeros de perforación limpiamente con la masilla lista para usar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "verschließe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Bohrlöcher sauber",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem Fertigspachtel",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white paste wall filler tube with scraper nozzle"
    },
    {
      "de": "der Flachmeißel",
      "pron": "dea fláj-mái-sel",
      "es": "cincel plano de acero con protección de impacto",
      "type": "Sustantivo (Masc)",
      "category": "Handwerkzeuge",
      "plural": "die Flachmeißel",
      "regimen": "Handschutzgriff",
      "exampleSentenceDe": "Mit dem Flachmeißel stemme ich den Schlitz für das Rohr frei.",
      "exampleSentenceEs": "Con el cincel plano pico la roza para el tubo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Flachmeißel",
          "role": "complement",
          "order": 1
        },
        {
          "text": "stemme",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich den Schlitz für das Rohr",
          "role": "subject",
          "order": 3
        },
        {
          "text": "frei",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric heavy steel flat cold chisel with rubber hand guard"
    },
    {
      "de": "die Kartuschenpistole",
      "pron": "di kar-tú-shen-pis-tó-le",
      "es": "pistola aplicadora para cartuchos de silicona",
      "type": "Sustantivo (Fem)",
      "category": "Montage & Befestigung",
      "plural": "die Kartuschenpistolen",
      "regimen": "Silikonspritze manual",
      "exampleSentenceDe": "Ich spanne die Dichtmasse in die Kartuschenpistole ein.",
      "exampleSentenceEs": "Coloco la masilla de sellado en la pistola para cartuchos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "spanne",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Dichtmasse in die Kartuschenpistole",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric red skeleton caulking sealant cartridge gun"
    },
    {
      "de": "das Dichtflex (Sellador)",
      "pron": "das díjt-fleks",
      "es": "masilla selladora elástica estanca Dichtflex",
      "type": "Sustantivo (Neutro)",
      "category": "Montage & Befestigung",
      "plural": "-",
      "regimen": "Polymer-Dichtstoff",
      "exampleSentenceDe": "Das Dichtflex dichtet den Wanddurchbruch gegen Feuchtigkeit ab.",
      "exampleSentenceEs": "El sellador Dichtflex impermeabiliza el pasamuros contra la humedad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Dichtflex",
          "role": "subject",
          "order": 1
        },
        {
          "text": "dichtet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Wanddurchbruch gegen Feuchtigkeit",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric waterproof sealant mastic cartridge tube Dichtflex"
    },
    {
      "de": "der Plombendraht",
      "pron": "dea plóm-ben-drat",
      "es": "alambre galvanizado trenzado para precintos",
      "type": "Sustantivo (Masc)",
      "category": "Montage & Befestigung",
      "plural": "-",
      "regimen": "2-adrig verzinkt",
      "exampleSentenceDe": "Ich ziehe den Plombendraht durch die Schraubenösen des Zählers.",
      "exampleSentenceEs": "Paso el alambre de precinto por las anillas del contador.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ziehe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Plombendraht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "durch die Schraubenösen des Zählers",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric roll of fine galvanized twisted steel security seal wire"
    },
    {
      "de": "die Wanddurchführung",
      "pron": "di vánt-dúrj-fú-rung",
      "es": "pasamuros estanco con juntas de estanqueidad",
      "type": "Sustantivo (Fem)",
      "category": "Montage & Befestigung",
      "plural": "die Wanddurchführungen",
      "regimen": "Gas- und wasserdicht",
      "exampleSentenceDe": "Die Wanddurchführung dichtet das Erdkabel im Keller absolut wasserdicht ab.",
      "exampleSentenceEs": "El pasamuros sella el cable enterrado en el sótano garantizando total estanqueidad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Wanddurchführung",
          "role": "subject",
          "order": 1
        },
        {
          "text": "dichtet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "das Erdkabel im Keller absolut wasserdicht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric wall cable penetration feed-through flange conduit sleeve"
    },
    {
      "de": "das Isolierband",
      "pron": "das i-zo-lía-bant",
      "es": "cinta aislante de PVC en colores normativos",
      "type": "Sustantivo (Neutro)",
      "category": "Installation",
      "plural": "die Isolierbänder",
      "regimen": "VDE-geprüft",
      "exampleSentenceDe": "Ich markiere die Phase mit schwarzem Isolierband.",
      "exampleSentenceEs": "Marco la fase con cinta aislante negra.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "markiere",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Phase",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit schwarzem Isolierband",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric colored rolls of electrical PVC insulating tape"
    },
    {
      "de": "der Schrumpfschlauch",
      "pron": "dea shrúmpf-shlauch",
      "es": "tubo termorretráctil aislante",
      "type": "Sustantivo (Masc)",
      "category": "Installation",
      "plural": "die Schrumpfschläuche",
      "regimen": "Schrumpfrate 3:1",
      "exampleSentenceDe": "Der Schrumpfschlauch schützt die Kabelverbindung vor Feuchtigkeit.",
      "exampleSentenceEs": "El tubo termorretráctil protege la conexión de cables contra la humedad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Schrumpfschlauch",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schützt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Kabelverbindung",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vor Feuchtigkeit",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric black heat-shrink tubing sleeve tubing"
    },
    {
      "de": "die Potentialausgleichsschiene (Poti-Schiene)",
      "pron": "di po-ten-tsi-ál-áus-gláijs-shí-ne",
      "es": "barra de compensación equipotencial de tierra",
      "type": "Sustantivo (Fem)",
      "category": "Installation",
      "plural": "die Potentialausgleichsschienen",
      "regimen": "DIN VDE 0100-410 / 540",
      "exampleSentenceDe": "Alle Erdungsleitungen laufen auf der Potentialausgleichsschiene zusammen.",
      "exampleSentenceEs": "Todas las líneas de tierra convergen en la barra equipotencial.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Alle Erdungsleitungen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "laufen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "auf der Potentialausgleichsschiene",
          "role": "complement",
          "order": 3
        },
        {
          "text": "zusammen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric main earthing terminal equipotential busbar box with transparent cover"
    },
    {
      "de": "der Tiefenerder",
      "pron": "dea tí-fen-éa-da",
      "es": "electrodo de profundidad / pica de tierra",
      "type": "Sustantivo (Masc)",
      "category": "Installation",
      "plural": "die Tiefenerder",
      "regimen": "Staberder verzinkt",
      "exampleSentenceDe": "Wir schlagen den Tiefenerder tief in das Erdreich ein.",
      "exampleSentenceEs": "Clavamos la pica de tierra a gran profundidad en el terreno.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wir",
          "role": "subject",
          "order": 1
        },
        {
          "text": "schlagen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Tiefenerder tief in das Erdreich",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric galvanized steel grounding earth rod spike"
    },
    {
      "de": "der Korrosionsschutz (Denso-Binde)",
      "pron": "dea ko-ro-zi-óns-shuts",
      "es": "cinta de protección anticorrosiva impregnada",
      "type": "Sustantivo (Masc)",
      "category": "Installation",
      "plural": "-",
      "regimen": "Petrolatum-Band",
      "exampleSentenceDe": "Ich wickele den Korrosionsschutz um die Erdschelle im Boden.",
      "exampleSentenceEs": "Envuelvo la protección anticorrosiva alrededor de la abrazadera de tierra en el suelo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "wickele",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Korrosionsschutz",
          "role": "complement",
          "order": 3
        },
        {
          "text": "um die Erdschelle im Boden",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric anti-corrosion petrolatum tape roll for buried pipe grounding"
    },
    {
      "de": "das Sicherheitsband für Erdverlegung",
      "pron": "das zí-jea-jaits-bant",
      "es": "cinta plástica roja de señalización de peligro eléctrico",
      "type": "Sustantivo (Neutro)",
      "category": "Sicherheit",
      "plural": "die Sicherheitsbänder",
      "regimen": "Warnband \"Achtung Starkstromkabel\"",
      "exampleSentenceDe": "Das rote Sicherheitsband warnt vor dem Erdkabel beim Graben.",
      "exampleSentenceEs": "La cinta roja de seguridad avisa de la presencia del cable enterrado al cavar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das rote Sicherheitsband",
          "role": "subject",
          "order": 1
        },
        {
          "text": "warnt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vor dem Erdkabel",
          "role": "complement",
          "order": 3
        },
        {
          "text": "beim Graben",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric red and white underground warning hazard tape ribbon"
    },
    {
      "de": "die Brandschutzplatte",
      "pron": "di bránt-shuts-plá-te",
      "es": "panel ignífugo de protección contra incendios",
      "type": "Sustantivo (Fem)",
      "category": "Sicherheit",
      "plural": "die Brandschutzplatten",
      "regimen": "Baustoffklasse A1",
      "exampleSentenceDe": "Wir montieren die Brandschutzplatte hinter dem Wechselrichter an der Holzwand.",
      "exampleSentenceEs": "Montamos el panel ignífugo detrás del inversor en la pared de madera.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wir",
          "role": "subject",
          "order": 1
        },
        {
          "text": "montieren",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Brandschutzplatte hinter dem Wechselrichter",
          "role": "complement",
          "order": 3
        },
        {
          "text": "an der Holzwand",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric fireproof silicate drywall insulation board sheet"
    },
    {
      "de": "das Panzertape",
      "pron": "das pán-tsa-teip",
      "es": "cinta adhesiva americana reforzada con tejido",
      "type": "Sustantivo (Neutro)",
      "category": "Montage & Befestigung",
      "plural": "-",
      "regimen": "Gewebeband hochfest",
      "exampleSentenceDe": "Das Panzertape sichert Schläuche und Kabel vorübergehend ab.",
      "exampleSentenceEs": "La cinta americana asegura tubos y cables temporalmente.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Panzertape",
          "role": "subject",
          "order": 1
        },
        {
          "text": "sichert",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "Schläuche und Kabel vorübergehend",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric silver duct tape heavy duty adhesive tape roll"
    },
    {
      "de": "das Beschriftungsgerät",
      "pron": "das be-shrif-tungs-gue-ret",
      "es": "rotuladora electrónica portátil para cuadros",
      "type": "Sustantivo (Neutro)",
      "category": "Organisation",
      "plural": "die Beschriftungsgeräte",
      "regimen": "Thermotransfer-Druck",
      "exampleSentenceDe": "Mit dem Beschriftungsgerät drucke ich Etiketten für alle Sicherungen.",
      "exampleSentenceEs": "Con la rotuladora imprimo etiquetas para todos los automáticos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Beschriftungsgerät",
          "role": "complement",
          "order": 1
        },
        {
          "text": "drucke",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "Etiketten für alle Sicherungen",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric handheld electronic label maker printer with display and keys"
    },
    {
      "de": "der weiße Stift",
      "pron": "dea vái-se shtift",
      "es": "marcador permanente blanco para cables",
      "type": "Sustantivo (Masc)",
      "category": "Organisation",
      "plural": "die weißen Stifte",
      "regimen": "Lackmarker permanent",
      "exampleSentenceDe": "Ich markiere die schwarzen Kabel mit dem weißen Stift.",
      "exampleSentenceEs": "Marco los cables negros con el rotulador blanco.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "markiere",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die schwarzen Kabel",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem weißen Stift",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white paint permanent marker pen"
    },
    {
      "de": "der Erste-Hilfe-Koffer",
      "pron": "dea éas-te-jíl-fe-kó-fa",
      "es": "botiquín de primeros auxilios estanco para obra",
      "type": "Sustantivo (Masc)",
      "category": "Sicherheit",
      "plural": "die Erste-Hilfe-Koffer",
      "regimen": "DIN 13157 (Betriebsverbandkasten)",
      "exampleSentenceDe": "Der orangefarbene Erste-Hilfe-Koffer befindet sich im Montagefahrzeug.",
      "exampleSentenceEs": "El botiquín de primeros auxilios naranja está en el furgón de montaje.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der orangefarbene Erste-Hilfe-Koffer",
          "role": "subject",
          "order": 1
        },
        {
          "text": "befindet sich",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "im Montagefahrzeug",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric bright orange hard plastic first aid emergency medical kit box"
    },
    {
      "de": "die LED-Lampe Würth",
      "pron": "di el-e-dé-lám-pe vürt",
      "es": "lámpara LED de inspección recargable imantada",
      "type": "Sustantivo (Fem)",
      "category": "Handwerkzeuge",
      "plural": "die LED-Lampen",
      "regimen": "Magnetfuß & Haken",
      "exampleSentenceDe": "Die magnetische LED-Lampe beleuchtet den dunklen Zählerschrank.",
      "exampleSentenceEs": "La lámpara LED imantada ilumina el armario del contador oscuro.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die magnetische LED-Lampe",
          "role": "subject",
          "order": 1
        },
        {
          "text": "beleuchtet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den dunklen Zählerschrank",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "cute 3D isometric rechargeable handheld LED magnetic work inspection light torch"
    },
    {
      "de": "die Holzleiter",
      "pron": "di hólts-lái-ta",
      "es": "escalera de tijera de madera (aislante eléctrico)",
      "type": "Sustantivo (Fem)",
      "category": "PSA & Steighilfen",
      "plural": "die Holzleitern",
      "regimen": "Elektrisch nicht leitend (VDE)",
      "exampleSentenceDe": "Elektriker nutzen die Holzleiter, weil Holz keinen Strom leitet.",
      "exampleSentenceEs": "Los electricistas usan la escalera de madera porque la madera no conduce electricidad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Elektriker",
          "role": "subject",
          "order": 1
        },
        {
          "text": "nutzen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Holzleiter, weil Holz keinen Strom",
          "role": "complement",
          "order": 3
        },
        {
          "text": "leitet",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric classic foldable wooden step ladder electrical insulated"
    },
    {
      "de": "die Trittleiter",
      "pron": "di trít-lái-ta",
      "es": "escalera corta tipo taburete de 2 a 3 peldaños",
      "type": "Sustantivo (Fem)",
      "category": "PSA & Steighilfen",
      "plural": "die Trittleitern",
      "regimen": "Klapptritt Aluminium",
      "exampleSentenceDe": "Auf der Trittleiter erreiche ich die oberen Reihen des Verteilerkastens.",
      "exampleSentenceEs": "En la escalera corta alcanzo las filas superiores del cuadro de distribución.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf der Trittleiter",
          "role": "complement",
          "order": 1
        },
        {
          "text": "erreiche",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "die oberen Reihen des Verteilerkastens",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric small aluminum 3-step folding stool ladder with wide platform"
    },
    {
      "de": "der Spanngurt",
      "pron": "dea shpán-gurt",
      "es": "cincha de amarre con tensor de carraca",
      "type": "Sustantivo (Masc)",
      "category": "Sicherheit",
      "plural": "die Spanngurte",
      "regimen": "Ladungssicherung DIN EN 12195-2",
      "exampleSentenceDe": "Ich sichere die Leitern im Transporter mit dem Spanngurt.",
      "exampleSentenceEs": "Aseguro las escaleras en la furgoneta con la cincha de amarre.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "sichere",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Leitern im Transporter",
          "role": "complement",
          "order": 3
        },
        {
          "text": "mit dem Spanngurt",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric green ratchet tie-down cargo strap with metallic tension buckle"
    },
    {
      "de": "der Katiblitz",
      "pron": "dea ká-ti-blits",
      "es": "guía pasacables de fibra de vidrio en carrete",
      "type": "Sustantivo (Masc)",
      "category": "Kabel & Leitungen",
      "plural": "die Katiblitze",
      "regimen": "Glasfaserband Polykat",
      "exampleSentenceDe": "Mit dem Katiblitz ziehe ich das LAN-Kabel durch das lange Leerrohr.",
      "exampleSentenceEs": "Con el Katiblitz tiro del cable LAN a través del tubo corrugado largo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Mit dem Katiblitz",
          "role": "complement",
          "order": 1
        },
        {
          "text": "ziehe",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ich",
          "role": "subject",
          "order": 3
        },
        {
          "text": "das LAN-Kabel durch das lange Leerrohr",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric red circular cable pulling fiberglass snake reel dispenser device"
    },
    {
      "de": "das Kehrblech",
      "pron": "das kée-blej",
      "es": "recogedor metálico de mano con mango corto",
      "type": "Sustantivo (Neutro)",
      "category": "Sauberkeit",
      "plural": "die Kehrbleche",
      "regimen": "Handkehrset",
      "exampleSentenceDe": "Ich fege den Bohrstaub mit dem Handfeger auf das Kehrblech.",
      "exampleSentenceEs": "Barro el polvo de perforar con la escobilla hacia el recogedor.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "fege",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Bohrstaub mit dem Handfeger",
          "role": "complement",
          "order": 3
        },
        {
          "text": "auf das Kehrblech",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric metallic dustpan sheet shovel with wooden handle"
    },
    {
      "de": "der Handfeger",
      "pron": "dea jánt-fe-ga",
      "es": "escobilla de mano de cerdas densas",
      "type": "Sustantivo (Masc)",
      "category": "Sauberkeit",
      "plural": "die Handfeger",
      "regimen": "Handbesen",
      "exampleSentenceDe": "Der Handfeger säubert den Zählerschrank nach der Montage.",
      "exampleSentenceEs": "La escobilla limpia el armario del contador tras el montaje.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Handfeger",
          "role": "subject",
          "order": 1
        },
        {
          "text": "säubert",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Zählerschrank",
          "role": "complement",
          "order": 3
        },
        {
          "text": "nach der Montage",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric wooden handheld dust brush broom with horsehair bristles"
    },
    {
      "de": "der Staubsauger",
      "pron": "dea shtáup-zau-ga",
      "es": "aspirador industrial con toma para herramientas",
      "type": "Sustantivo (Masc)",
      "category": "Sauberkeit",
      "plural": "die Staubsauger",
      "regimen": "Klasse M (Bohrstaubabsaugung)",
      "exampleSentenceDe": "Der Staubsauger saugt den feinen Betonstaub direkt beim Bohren ab.",
      "exampleSentenceEs": "El aspirador absorbe el polvo fino de hormigón directamente al taladrar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Staubsauger",
          "role": "subject",
          "order": 1
        },
        {
          "text": "saugt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den feinen Betonstaub direkt beim Bohren",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric industrial canister vacuum cleaner machine with flexible hose"
    },
    {
      "de": "der Staubsaugerbeutel",
      "pron": "dea shtáup-zau-ga-boi-tel",
      "es": "bolsa de filtro multicapa para aspirador",
      "type": "Sustantivo (Masc)",
      "category": "Sauberkeit",
      "plural": "die Staubsaugerbeutel",
      "regimen": "Vliesfilterbeutel",
      "exampleSentenceDe": "Ich setze einen neuen Staubsaugerbeutel in den Sauger ein.",
      "exampleSentenceEs": "Coloco una nueva bolsa de aspiradora en el aspirador.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "setze",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "einen neuen Staubsaugerbeutel in den Sauger",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ein",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "cute 3D isometric white fleece vacuum cleaner dust bag with blue plastic collar"
    },
    {
      "de": "der Besen",
      "pron": "dea bé-zen",
      "es": "escoba ancha de taller con mango largo",
      "type": "Sustantivo (Masc)",
      "category": "Sauberkeit",
      "plural": "die Besen",
      "regimen": "Saalbesen / Straßenbesen",
      "exampleSentenceDe": "Zum Feierabend fegen wir den Kellerboden sauber mit dem Besen.",
      "exampleSentenceEs": "Al terminar la jornada barremos el suelo del sótano limpiamente con la escoba.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Zum Feierabend",
          "role": "complement",
          "order": 1
        },
        {
          "text": "fegen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wir den Kellerboden sauber",
          "role": "subject",
          "order": 3
        },
        {
          "text": "mit dem Besen",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric wooden floor sweeping broom with long handle"
    },
    {
      "de": "der Eimer",
      "pron": "dea ái-ma",
      "es": "cubo de plástico reforzado de 10-12 L (Würth)",
      "type": "Sustantivo (Masc)",
      "category": "Sauberkeit",
      "plural": "die Eimer",
      "regimen": "Baueimer mit Metallbügel",
      "exampleSentenceDe": "Ich sammle Kabelreste und Abfall im roten Eimer.",
      "exampleSentenceEs": "Recojo los restos de cable y residuos en el cubo rojo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Ich",
          "role": "subject",
          "order": 1
        },
        {
          "text": "sammle",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "Kabelreste und Abfall",
          "role": "complement",
          "order": 3
        },
        {
          "text": "im roten Eimer",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "cute 3D isometric heavy-duty red plastic construction bucket pail with metal handle"
    }
  ]
},
{
  "id": 21,
  "title": "Kapitel 21: Verkehrszeichen & Vorschriften (StVO)",
  "icon": <ShieldAlert size={20} />,
  "emoji": "🛑",
  "categoryFilter": [
    "Todas",
    "Warte- & Haltegebote",
    "Fahrtrichtungen",
    "Sonderwege & Spuren",
    "Verkehrsverbote",
    "Geschwindigkeit & Überholen",
    "Halte- & Parkverbote",
    "Fahrbahnmarkierungen"
  ],
  "words": [
    {
      "de": "Andreaskreuz (das Zeichen 201)",
      "pron": "an-dre-as-kroits (das tsái-jen tsvei-hún-dert-áins)",
      "es": "Cruz de San Andrés (prioridad del tren)",
      "type": "Sustantivo (Neutro)",
      "category": "Warte- & Haltegebote",
      "regimen": "StVO § 19 (Bahnübergang)",
      "plural": "die Andreaskreuze",
      "exampleSentenceDe": "Das Andreaskreuz steht direkt vor dem Bahnübergang.",
      "exampleSentenceEs": "La cruz de San Andrés está justo delante del paso a nivel.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Andreaskreuz",
          "role": "subject",
          "order": 1
        },
        {
          "text": "steht direkt",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vor dem Bahnübergang",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 201-50 Andreaskreuz: a white St. Andrew cross with red tips (RAL 3020 and RAL 9016), mounted on a metallic signpost, 3D isometric studio render, pure white background (#FFFFFF), zero text, exact legal German design"
    },
    {
      "de": "Vorfahrt gewähren (das Zeichen 205)",
      "pron": "fóa-fart gue-vé-ren (das tsái-jen tsvei-hún-dert-fünf)",
      "es": "Ceda el paso (conceder la prioridad)",
      "type": "Sustantivo (Neutro)",
      "category": "Warte- & Haltegebote",
      "regimen": "StVO § 8 (Vorfahrt)",
      "plural": "die Vorfahrtsschilder",
      "exampleSentenceDe": "An dieser Kreuzung müssen wir Vorfahrt gewähren.",
      "exampleSentenceEs": "En este cruce debemos ceder el paso.",
      "exampleSentenceDeBlocks": [
        {
          "text": "An dieser Kreuzung",
          "role": "complement",
          "order": 1
        },
        {
          "text": "müssen wir",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "Vorfahrt gewähren",
          "role": "verb_p2",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 205: inverted equilateral triangle with thick red border (RAL 3020) and blank white center, 3D on white background"
    },
    {
      "de": "Halt. Vorfahrt gewähren (das Zeichen 206)",
      "pron": "halt fóa-fart gue-vé-ren (das tsái-jen tsvei-hún-dert-zeks)",
      "es": "Stop (detención obligatoria y ceda el paso)",
      "type": "Sustantivo (Neutro)",
      "category": "Warte- & Haltegebote",
      "regimen": "StVO § 41 (Haltgebot)",
      "plural": "die Stoppschilder",
      "exampleSentenceDe": "Am Stoppschild muss man an der Haltlinie komplett anhalten.",
      "exampleSentenceEs": "En la señal de stop hay que detenerse por completo en la línea.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Am Stoppschild",
          "role": "complement",
          "order": 1
        },
        {
          "text": "muss man",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "an der Haltlinie",
          "role": "complement",
          "order": 3
        },
        {
          "text": "komplett anhalten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 206: regular octagonal red (RAL 3020) sign with white border line and bold white text 'STOP' in German DIN 1451 font, 3D on white background"
    },
    {
      "de": "Dem Gegenverkehr Vorrang gewähren (das Zeichen 208)",
      "pron": "dem gue-guen-fea-kér fóa-rang gue-vé-ren (das tsái-jen tsvei-hún-dert-ajt)",
      "es": "Ceda el paso al sentido contrario en paso estrecho",
      "type": "Sustantivo (Neutro)",
      "category": "Warte- & Haltegebote",
      "regimen": "StVO § 41",
      "plural": "die Vorrangzeichen",
      "exampleSentenceDe": "Bei diesem Schild hat der Gegenverkehr Vorrang.",
      "exampleSentenceEs": "Con esta señal el tráfico en sentido contrario tiene preferencia.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Bei diesem Schild",
          "role": "complement",
          "order": 1
        },
        {
          "text": "hat der Gegenverkehr",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "immer",
          "role": "complement",
          "order": 3
        },
        {
          "text": "Vorrang",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 208: circular white disc with thick red border (RAL 3020) containing right arrow red pointing up and left arrow black pointing down, 3D on white background"
    },
    {
      "de": "Vorgeschriebene Fahrtrichtung rechts (das Zeichen 209-10)",
      "pron": "foa-gue-shrí-be-ne fáat-rij-tung rejts (das tsái-jen...)",
      "es": "Giro obligatorio a la derecha tras la señal",
      "type": "Sustantivo (Neutro)",
      "category": "Fahrtrichtungen",
      "regimen": "StVO § 41",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Nach der Kreuzung müssen Sie rechts abbiegen.",
      "exampleSentenceEs": "Después del cruce debe girar a la derecha.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Nach der Kreuzung",
          "role": "complement",
          "order": 1
        },
        {
          "text": "müssen Sie",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "nach rechts",
          "role": "complement",
          "order": 3
        },
        {
          "text": "abbiegen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 209-10: circular blue disc (RAL 5005) with white arrow pointing right, 3D on white background"
    },
    {
      "de": "Vorgeschriebene Fahrtrichtung hier rechts (das Zeichen 209-20)",
      "pron": "foa-gue-shrí-be-ne fáat-rij-tung jía rejts (das tsái-jen...)",
      "es": "Giro obligatorio aquí a la derecha (delante de la señal)",
      "type": "Sustantivo (Neutro)",
      "category": "Fahrtrichtungen",
      "regimen": "StVO § 41",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Biegen Sie unmittelbar vor dem Schild rechts ab.",
      "exampleSentenceEs": "Gire a la derecha inmediatamente delante de la señal.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Biegen Sie",
          "role": "verb_p1",
          "order": 1
        },
        {
          "text": "unmittelbar vor dem Schild",
          "role": "complement",
          "order": 2
        },
        {
          "text": "nach rechts",
          "role": "complement",
          "order": 3
        },
        {
          "text": "ab",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 209-20: circular blue disc with diagonal downward-right white arrow, 3D on white background"
    },
    {
      "de": "Vorgeschriebene Fahrtrichtung geradeaus oder rechts (das Zeichen 214)",
      "pron": "foa-gue-shrí-be-ne fáat-rij-tung gue-rá-de-aus ó-da rejts (das tsái-jen...)",
      "es": "Sentido obligatorio: recto o a la derecha",
      "type": "Sustantivo (Neutro)",
      "category": "Fahrtrichtungen",
      "regimen": "StVO § 41",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Sie dürfen geradeaus fahren oder nach rechts abbiegen.",
      "exampleSentenceEs": "Puede seguir recto o girar a la derecha.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Sie dürfen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "geradeaus fahren",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "oder nach rechts",
          "role": "complement",
          "order": 3
        },
        {
          "text": "abbiegen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 214: circular blue disc with branched white arrow pointing straight and right, 3D on white background"
    },
    {
      "de": "Kreisverkehr (das Zeichen 215)",
      "pron": "kráis-fea-kér (das tsái-jen...)",
      "es": "Glorieta obligatoria (sentido giratorio)",
      "type": "Sustantivo (Neutro)",
      "category": "Fahrtrichtungen",
      "regimen": "StVO § 8 Abs. 1a",
      "plural": "die Kreisverkehre",
      "exampleSentenceDe": "Im Kreisverkehr haben die Fahrzeuge im Kreis die Vorfahrt.",
      "exampleSentenceEs": "En la glorieta los vehículos dentro tienen preferencia.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Im Kreisverkehr",
          "role": "complement",
          "order": 1
        },
        {
          "text": "haben die Fahrzeuge",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "im Kreis",
          "role": "complement",
          "order": 3
        },
        {
          "text": "die Vorfahrt",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 215: circular blue disc with three curved white arrows forming counter-clockwise circle, 3D on white background"
    },
    {
      "de": "Einbahnstraße (das Zeichen 220)",
      "pron": "áin-ban-shtrá-se (das tsái-jen...)",
      "es": "Calle de sentido único",
      "type": "Sustantivo (Neutro)",
      "category": "Fahrtrichtungen",
      "regimen": "StVO § 41",
      "plural": "die Einbahnstraßen",
      "exampleSentenceDe": "In der Einbahnstraße darf man nicht wenden.",
      "exampleSentenceEs": "En la calle de sentido único no se puede dar la vuelta.",
      "exampleSentenceDeBlocks": [
        {
          "text": "In der Einbahnstraße",
          "role": "complement",
          "order": 1
        },
        {
          "text": "darf man",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "unter keinen Umständen",
          "role": "complement",
          "order": 3
        },
        {
          "text": "wenden",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 220: rectangular blue horizontal sign with wide white arrow containing black text 'Einbahnstraße', 3D on white background"
    },
    {
      "de": "Vorgeschriebene Vorbeifahrt rechts vorbei (das Zeichen 222)",
      "pron": "foa-gue-shrí-be-ne foa-bái-faat rejts foa-bái (das tsái-jen...)",
      "es": "Paso reglamentario obligatorio por la derecha",
      "type": "Sustantivo (Neutro)",
      "category": "Fahrtrichtungen",
      "regimen": "StVO § 41",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Fahren Sie rechts an der Verkehrsinsel vorbei.",
      "exampleSentenceEs": "Pase por la derecha de la isleta de tráfico.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Fahren Sie",
          "role": "verb_p1",
          "order": 1
        },
        {
          "text": "rechts an der Verkehrsinsel",
          "role": "complement",
          "order": 2
        },
        {
          "text": "vorsichtig",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vorbei",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 222: circular blue disc with diagonal white arrow pointing down-right, 3D on white background"
    },
    {
      "de": "Seitenstreifen befahren (das Zeichen 223.1)",
      "pron": "zái-ten-shtrái-fen be-fá-ren (das tsái-jen...)",
      "es": "Autorización para circular por el arcén",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Autobahnfreigabe",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Auf der Autobahn darf man den Seitenstreifen befahren.",
      "exampleSentenceEs": "En la autopista se permite circular por el arcén.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf der Autobahn",
          "role": "complement",
          "order": 1
        },
        {
          "text": "darf man",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "den Seitenstreifen",
          "role": "complement",
          "order": 3
        },
        {
          "text": "befahren",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 223.1: rectangular blue lane sign showing three white arrows with the right shoulder open for traffic, 3D on white background"
    },
    {
      "de": "Seitenstreifen nicht mehr befahren (das Zeichen 223.2)",
      "pron": "zái-ten-shtrái-fen nijt mea be-fá-ren (das tsái-jen...)",
      "es": "Fin de autorización de circular por el arcén",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Ende Freigabe",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Die Freigabe des Seitenstreifens endet hier.",
      "exampleSentenceEs": "La habilitación del arcén termina aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Freigabe des Seitenstreifens",
          "role": "subject",
          "order": 1
        },
        {
          "text": "endet hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "ab diesem Schild",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 223.2: blue lane sign showing right shoulder lane crossed out by a red diagonal stripe, 3D on white background"
    },
    {
      "de": "Seitenstreifen räumen (das Zeichen 223.3)",
      "pron": "zái-ten-shtrái-fen rói-men (das tsái-jen...)",
      "es": "Despejar y abandonar el arcén de inmediato",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Räumungsgebot",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Räumen Sie den Seitenstreifen sofort nach links.",
      "exampleSentenceEs": "Despeje el arcén de inmediato hacia la izquierda.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Räumen Sie",
          "role": "verb_p1",
          "order": 1
        },
        {
          "text": "den Seitenstreifen",
          "role": "complement",
          "order": 2
        },
        {
          "text": "sofort",
          "role": "complement",
          "order": 3
        },
        {
          "text": "nach links",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 223.3: blue lane sign showing right shoulder arrow merging sharply back into main traffic, 3D on white background"
    },
    {
      "de": "Haltestelle (das Zeichen 224)",
      "pron": "jál-te-shté-le (das tsái-jen...)",
      "es": "Parada oficial de autobuses o tranvías",
      "type": "Sustantivo (Fem)",
      "category": "Sonderwege & Spuren",
      "regimen": "15m Parkverbot",
      "plural": "die Haltestellen",
      "exampleSentenceDe": "15 Meter vor und hinter der Haltestelle darf man nicht parken.",
      "exampleSentenceEs": "15 metros antes y después de la parada no se puede aparcar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "15 Meter vor und hinter der Haltestelle",
          "role": "complement",
          "order": 1
        },
        {
          "text": "darf man",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "niemals",
          "role": "complement",
          "order": 3
        },
        {
          "text": "parken",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 224: circular yellow disc with wide green outer border ring containing a green uppercase letter 'H', 3D on white background"
    },
    {
      "de": "Taxenstand (das Zeichen 229)",
      "pron": "ták-sen-shtant (das tsái-jen...)",
      "es": "Parada reservada exclusivamente para taxis",
      "type": "Sustantivo (Masc)",
      "category": "Sonderwege & Spuren",
      "regimen": "StVO § 41",
      "plural": "die Taxenstände",
      "exampleSentenceDe": "Hier dürfen nur zugelassene Taxis warten.",
      "exampleSentenceEs": "Aquí solo pueden esperar taxis autorizados.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Hier dürfen",
          "role": "complement",
          "order": 1
        },
        {
          "text": "nur zugelassene Taxis",
          "role": "subject",
          "order": 2
        },
        {
          "text": "offiziell",
          "role": "complement",
          "order": 3
        },
        {
          "text": "warten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 229: rectangular blue sign showing white taxi car silhouette with 'TAXI' sign on roof, 3D on white background"
    },
    {
      "de": "Radweg (das Zeichen 237)",
      "pron": "rát-vek (das tsái-jen...)",
      "es": "Vía ciclista obligatoria (carril bici exclusivo)",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Radwegebenutzungspflicht",
      "plural": "die Radwege",
      "exampleSentenceDe": "Radfahrer müssen diesen Radweg benutzen.",
      "exampleSentenceEs": "Los ciclistas deben usar este carril bici.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Radfahrer",
          "role": "subject",
          "order": 1
        },
        {
          "text": "müssen diesen Radweg",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "immer",
          "role": "complement",
          "order": 3
        },
        {
          "text": "benutzen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 237: circular blue disc with white bicycle silhouette pictogram, 3D on white background"
    },
    {
      "de": "Reitweg (das Zeichen 238)",
      "pron": "ráit-vek (das tsái-jen...)",
      "es": "Vía exclusiva para jinetes",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "StVO § 41",
      "plural": "die Reitwege",
      "exampleSentenceDe": "Dieser Weg ist Reitern vorbehalten.",
      "exampleSentenceEs": "Este camino está reservado para jinetes.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Dieser Weg",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist Reitern",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vollständig",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vorbehalten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 238: circular blue disc with white horse and rider silhouette, 3D on white background"
    },
    {
      "de": "Gehweg (das Zeichen 239)",
      "pron": "gué-vek (das tsái-jen...)",
      "es": "Acera / Vía exclusiva peatonal",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Fußgängerbereich",
      "plural": "die Gehwege",
      "exampleSentenceDe": "Fahrzeuge dürfen auf dem Gehweg nicht fahren.",
      "exampleSentenceEs": "Los vehículos no pueden circular por la acera.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Fahrzeuge dürfen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "auf dem Gehweg",
          "role": "complement",
          "order": 2
        },
        {
          "text": "grundsätzlich nicht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "fahren",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 239: circular blue disc with white parent and child pedestrian silhouette, 3D on white background"
    },
    {
      "de": "Gemeinsamer Geh- und Radweg (das Zeichen 240)",
      "pron": "gue-máin-za-ma gué- unt rát-vek (das tsái-jen...)",
      "es": "Vía compartida para peatones y ciclistas",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Rücksichtnahme",
      "plural": "die gemeinsamen Geh- und Radwege",
      "exampleSentenceDe": "Radfahrer müssen auf Fußgänger Rücksicht nehmen.",
      "exampleSentenceEs": "Los ciclistas deben tener consideración con los peatones.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Radfahrer",
          "role": "subject",
          "order": 1
        },
        {
          "text": "müssen auf Fußgänger",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "stets",
          "role": "complement",
          "order": 3
        },
        {
          "text": "Rücksicht nehmen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 240: circular blue disc with white pedestrians above horizontal white line and bicycle below, 3D on white background"
    },
    {
      "de": "Getrennter Rad- und Gehweg (das Zeichen 241)",
      "pron": "gue-trén-ta rát- unt gué-vek (das tsái-jen...)",
      "es": "Vía segregada para ciclistas y peatones",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Getrennte Spuren",
      "plural": "die getrennten Rad- und Gehwege",
      "exampleSentenceDe": "Eine Linie trennt den Radweg vom Fußweg.",
      "exampleSentenceEs": "Una línea separa el carril bici de la acera.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Eine weiße Linie",
          "role": "subject",
          "order": 1
        },
        {
          "text": "trennt den Radweg",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "klar",
          "role": "complement",
          "order": 3
        },
        {
          "text": "vom Fußweg",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 241: circular blue disc vertically divided by white line: bicycle left, pedestrians right, 3D on white background"
    },
    {
      "de": "Beginn einer Fußgängerzone (das Zeichen 242.1)",
      "pron": "be-gín ái-nea fús-guen-ga-tsó-ne (das tsái-jen...)",
      "es": "Inicio de zona peatonal",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Schrittgeschwindigkeit",
      "plural": "die Fußgängerzonen",
      "exampleSentenceDe": "In der Fußgängerzone haben Fußgänger Vorrang.",
      "exampleSentenceEs": "En la zona peatonal los peatones tienen preferencia.",
      "exampleSentenceDeBlocks": [
        {
          "text": "In der Fußgängerzone",
          "role": "complement",
          "order": 1
        },
        {
          "text": "haben Fußgänger",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "immer",
          "role": "complement",
          "order": 3
        },
        {
          "text": "Vorrang",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 242.1: square white sign with black border showing blue pedestrian circle and black text 'ZONE', 3D on white background"
    },
    {
      "de": "Ende einer Fußgängerzone (das Zeichen 242.2)",
      "pron": "én-de ái-nea fús-guen-ga-tsó-ne (das tsái-jen...)",
      "es": "Fin de zona peatonal",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Ende Zone",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Hier endet die Fußgängerzone.",
      "exampleSentenceEs": "Aquí termina la zona peatonal.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Hier",
          "role": "complement",
          "order": 1
        },
        {
          "text": "endet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Fußgängerzone",
          "role": "subject",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 242.2: square white pedestrian zone sign crossed diagonally by five parallel grey stripes, 3D on white background"
    },
    {
      "de": "Beginn einer Fahrradstraße (das Zeichen 244.1)",
      "pron": "be-gín ái-nea fáar-rat-shtrá-se (das tsái-jen...)",
      "es": "Inicio de calle ciclista (máx. 30 km/h)",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Max. 30 km/h",
      "plural": "die Fahrradstraßen",
      "exampleSentenceDe": "In der Fahrradstraße gilt maximal Tempo 30.",
      "exampleSentenceEs": "En la calle ciclista rige como máximo 30 km/h.",
      "exampleSentenceDeBlocks": [
        {
          "text": "In der Fahrradstraße",
          "role": "complement",
          "order": 1
        },
        {
          "text": "gilt maximal",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "Tempo 30",
          "role": "subject",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 244.1: square white sign with blue bicycle circle and black text 'Fahrradstraße' and 'ZONE', 3D on white background"
    },
    {
      "de": "Ende einer Fahrradstraße (das Zeichen 244.2)",
      "pron": "én-de ái-nea fáar-rat-shtrá-se (das tsái-jen...)",
      "es": "Fin de calle ciclista",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Ende Fahrradstraße",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Die Fahrradstraße ist hier zu Ende.",
      "exampleSentenceEs": "La calle ciclista termina aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Fahrradstraße",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "zu Ende",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 244.2: square white bicycle zone sign crossed diagonally by five grey stripes, 3D on white background"
    },
    {
      "de": "Bussonderfahrstreifen (das Zeichen 245)",
      "pron": "búsc-zón-da-fáar-shtrái-fen (das tsái-jen...)",
      "es": "Carril exclusivo para autobuses de línea",
      "type": "Sustantivo (Neutro)",
      "category": "Sonderwege & Spuren",
      "regimen": "Nur Linienbusse",
      "plural": "die Bussonderfahrstreifen",
      "exampleSentenceDe": "Pkw dürfen den Bussonderfahrstreifen nicht befahren.",
      "exampleSentenceEs": "Los turismos no pueden circular por el carril bus.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Pkw",
          "role": "subject",
          "order": 1
        },
        {
          "text": "dürfen die Busspur",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "auf keinen Fall",
          "role": "complement",
          "order": 3
        },
        {
          "text": "befahren",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 245: circular blue disc with white side bus pictogram, 3D on white background"
    },
    {
      "de": "Verbot für Fahrzeuge aller Art (das Zeichen 250)",
      "pron": "fea-bót füa fáar-tsoi-gue á-la art (das tsái-jen...)",
      "es": "Prohibición de circulación para todo vehículo",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Vollsperrung",
      "plural": "die Durchfahrtsverbote",
      "exampleSentenceDe": "Die Straße ist für alle Fahrzeuge gesperrt.",
      "exampleSentenceEs": "La calle está cerrada para todos los vehículos.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Straße",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist für alle Fahrzeuge",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vollständig",
          "role": "complement",
          "order": 3
        },
        {
          "text": "gesperrt",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 250: circular white disc with thick bright red outer ring (RAL 3020) and empty white center, 3D on white background"
    },
    {
      "de": "Verbot für Kraftwagen (das Zeichen 251)",
      "pron": "fea-bót füa kráft-vá-guen (das tsái-jen...)",
      "es": "Prohibición para automóviles y vehículos de motor",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Pkw-Verbot",
      "plural": "die Verkehrsverbote",
      "exampleSentenceDe": "Autos dürfen hier nicht weiterfahren.",
      "exampleSentenceEs": "Los coches no pueden continuar por aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Autos dürfen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "hier nicht",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "weiterfahren",
          "role": "verb_p2",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 251: circular white disc with red border containing black frontal car pictogram, 3D on white background"
    },
    {
      "de": "Verbot für Kraftfahrzeuge über 3,5 t (das Zeichen 253)",
      "pron": "fea-bót füa kráft-fáar-tsoi-gue ú-ba drái kó-ma fünf tón-nen (das tsái-jen...)",
      "es": "Prohibición para camiones de más de 3,5 t",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Lkw-Verbot",
      "plural": "die Lkw-Verbote",
      "exampleSentenceDe": "Schwere Lkw dürfen hier nicht durchfahren.",
      "exampleSentenceEs": "Los camiones pesados no pueden pasar por aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Schwere Lkw",
          "role": "subject",
          "order": 1
        },
        {
          "text": "dürfen hier nicht",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "durchfahren",
          "role": "verb_p2",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 253: circular white disc with red border containing black side-view truck pictogram, 3D on white background"
    },
    {
      "de": "Verbot für Radverkehr (das Zeichen 254)",
      "pron": "fea-bót füa rát-fea-kér (das tsái-jen...)",
      "es": "Prohibición de paso para bicicletas",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Radfahrverbot",
      "plural": "die Radfahrverbote",
      "exampleSentenceDe": "Fahrradfahren ist auf dieser Straße verboten.",
      "exampleSentenceEs": "Montar en bicicleta está prohibido en esta calle.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Fahrradfahren",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist auf dieser Straße",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "strengstens",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verboten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 254: circular white disc with red border containing black bicycle pictogram, 3D on white background"
    },
    {
      "de": "Verbot für Krafträder (das Zeichen 255)",
      "pron": "fea-bót füa kráft-ré-da (das tsái-jen...)",
      "es": "Prohibición de paso para motocicletas",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Motorradverbot",
      "plural": "die Motorradverbote",
      "exampleSentenceDe": "Motorräder dürfen diese Straße nicht befahren.",
      "exampleSentenceEs": "Las motocicletas no pueden circular por esta calle.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Motorräder dürfen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "diese Straße",
          "role": "complement",
          "order": 2
        },
        {
          "text": "nicht",
          "role": "verb_p1",
          "order": 3
        },
        {
          "text": "befahren",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 255: circular white disc with red border containing black motorcycle with rider silhouette, 3D on white background"
    },
    {
      "de": "Verbot für Fußgänger (das Zeichen 259)",
      "pron": "fea-bót füa fús-guen-ga (das tsái-jen...)",
      "es": "Prohibición de paso para peatones",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Fußgängerverbot",
      "plural": "die Verkehrsverbote",
      "exampleSentenceDe": "Fußgänger dürfen die Kraftfahrstraße nicht betreten.",
      "exampleSentenceEs": "Los peatones no pueden entrar en la vía para automóviles.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Fußgänger dürfen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "die Schnellstraße",
          "role": "complement",
          "order": 2
        },
        {
          "text": "nicht",
          "role": "verb_p1",
          "order": 3
        },
        {
          "text": "betreten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 259: circular white disc with red border containing black walking pedestrian pictogram, 3D on white background"
    },
    {
      "de": "Verbot für Kraftfahrzeuge (das Zeichen 260)",
      "pron": "fea-bót füa kráft-fáar-tsoi-gue (das tsái-jen...)",
      "es": "Prohibición conjunta para coches y motos",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Kfz-Verbot",
      "plural": "die Kfz-Verbote",
      "exampleSentenceDe": "Kraftfahrzeuge sind auf diesem Weg verboten.",
      "exampleSentenceEs": "Los vehículos de motor están prohibidos en este camino.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Kraftfahrzeuge",
          "role": "subject",
          "order": 1
        },
        {
          "text": "sind auf diesem Weg",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "vollständig",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verboten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 260: circular white disc with red border containing black car above black motorcycle, 3D on white background"
    },
    {
      "de": "Verbot für Gefahrgut-Kfz (das Zeichen 261)",
      "pron": "fea-bót füa gue-féa-li-jen gú-tan (das tsái-jen...)",
      "es": "Prohibición para mercancías peligrosas (ADR)",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Gefahrgut",
      "plural": "die Gefahrgutverbote",
      "exampleSentenceDe": "Lkw mit Gefahrgut dürfen den Tunnel nicht passieren.",
      "exampleSentenceEs": "Camiones con mercancías peligrosas no pueden pasar el túnel.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Lkw mit Gefahrgut",
          "role": "subject",
          "order": 1
        },
        {
          "text": "dürfen den Tunnel",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "nicht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "passieren",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 261: circular white disc with red border showing black truck with orange ADR cargo box, 3D on white background"
    },
    {
      "de": "Tatsächliche Masse (das Zeichen 262)",
      "pron": "tat-zéj-li-je má-se (das tsái-jen...)",
      "es": "Límite de peso real máximo en toneladas",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Gewichtslimit",
      "plural": "die Gewichtsbeschränkungen",
      "exampleSentenceDe": "Die Brücke ist auf 5,5 Tonnen tatsächliche Masse begrenzt.",
      "exampleSentenceEs": "El puente está limitado a 5,5 toneladas de peso real.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Brücke",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist auf 5,5 Tonnen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "tatsächliche Masse",
          "role": "complement",
          "order": 3
        },
        {
          "text": "begrenzt",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 262: circular white disc with red border containing black text '5,5 t', 3D on white background"
    },
    {
      "de": "Tatsächliche Achslast (das Zeichen 263)",
      "pron": "tat-zéj-li-je ájs-last (das tsái-jen...)",
      "es": "Límite de carga real por eje",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Achslast",
      "plural": "die Achslastbeschränkungen",
      "exampleSentenceDe": "Fahrzeuge über 8 Tonnen Achslast sind hier verboten.",
      "exampleSentenceEs": "Vehículos con más de 8 toneladas por eje están prohibidos aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Fahrzeuge über 8 Tonnen Achslast",
          "role": "subject",
          "order": 1
        },
        {
          "text": "sind hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "streng",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verboten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 263: circular white disc with red border showing vehicle axle wheels with '8 t', 3D on white background"
    },
    {
      "de": "Tatsächliche Breite (das Zeichen 264)",
      "pron": "tat-zéj-li-je brái-te (das tsái-jen...)",
      "es": "Límite de anchura máxima permitida (con espejos)",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Breitenlimit",
      "plural": "die Breitenbeschränkungen",
      "exampleSentenceDe": "Auf dieser Spur gilt eine maximale Breite von 2 Metern.",
      "exampleSentenceEs": "En este carril rige una anchura máxima de 2 metros.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf dieser Spur",
          "role": "complement",
          "order": 1
        },
        {
          "text": "gilt eine maximale Breite",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "von genau",
          "role": "complement",
          "order": 3
        },
        {
          "text": "2 Metern",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 264: circular white disc with red border showing '2 m' with two horizontal inward arrowheads, 3D on white background"
    },
    {
      "de": "Tatsächliche Höhe (das Zeichen 265)",
      "pron": "tat-zéj-li-je jö-e (das tsái-jen...)",
      "es": "Límite de altura máxima permitida",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Höhenlimit",
      "plural": "die Höhenbeschränkungen",
      "exampleSentenceDe": "Die Durchfahrtshöhe beträgt genau 3,8 Meter.",
      "exampleSentenceEs": "La altura de gálibo es de exactamente 3,8 metros.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Durchfahrtshöhe",
          "role": "subject",
          "order": 1
        },
        {
          "text": "beträgt an dieser Brücke",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "genau",
          "role": "complement",
          "order": 3
        },
        {
          "text": "3,8 Meter",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 265: circular white disc with red border showing '3,8 m' with two vertical inward arrowheads, 3D on white background"
    },
    {
      "de": "Tatsächliche Länge (das Zeichen 266)",
      "pron": "tat-zéj-li-je léng-e (das tsái-jen...)",
      "es": "Límite de longitud máxima permitida",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Längenlimit",
      "plural": "die Längenbeschränkungen",
      "exampleSentenceDe": "Lange Fahrzeuge über 10 Meter dürfen nicht einfahren.",
      "exampleSentenceEs": "Vehículos largos de más de 10 metros no pueden entrar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Lange Fahrzeuge über 10 Meter",
          "role": "subject",
          "order": 1
        },
        {
          "text": "dürfen hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "nicht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "einfahren",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 266: circular white disc with red border showing truck with '10 m' and length arrows, 3D on white background"
    },
    {
      "de": "Verbot der Einfahrt (das Zeichen 267)",
      "pron": "fea-bót dea áin-fáat (das tsái-jen...)",
      "es": "Entrada prohibida (dirección contraria)",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "StVO § 41",
      "plural": "die Einfahrtsverbote",
      "exampleSentenceDe": "Hier darf man nicht hineinfahren, falsche Richtung!",
      "exampleSentenceEs": "Aquí no se puede entrar, ¡dirección equivocada!",
      "exampleSentenceDeBlocks": [
        {
          "text": "Hier darf man",
          "role": "verb_p1",
          "order": 1
        },
        {
          "text": "auf keinen Fall",
          "role": "complement",
          "order": 2
        },
        {
          "text": "hineinfahren,",
          "role": "verb_p2",
          "order": 3
        },
        {
          "text": "falsche Richtung!",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 267: circular solid red disc (RAL 3020) with wide horizontal white rectangular bar across center, 3D on white background"
    },
    {
      "de": "Schneeketten vorgeschrieben (das Zeichen 268)",
      "pron": "shné-ke-ten foa-gue-shrí-ben (das tsái-jen...)",
      "es": "Uso obligatorio de cadenas para nieve",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Kettenpflicht",
      "plural": "die Schneeketten",
      "exampleSentenceDe": "Auf dieser Passstraße herrscht Schneekettenpflicht.",
      "exampleSentenceEs": "En este puerto de montaña rige obligación de cadenas.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf dieser Passstraße",
          "role": "complement",
          "order": 1
        },
        {
          "text": "herrscht ab hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "strikte",
          "role": "complement",
          "order": 3
        },
        {
          "text": "Schneekettenpflicht",
          "role": "subject",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 268: circular blue disc (RAL 5005) with white tyre silhouette wrapped in snow chains, 3D on white background"
    },
    {
      "de": "Verbot für wassergefährdende Ladung (das Zeichen 269)",
      "pron": "fea-bót füa vás-sa-gue-féa-den-de lá-dung (das tsái-jen...)",
      "es": "Prohibición para cargas contaminantes del agua",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Wasserschutz",
      "plural": "die Verkehrsverbote",
      "exampleSentenceDe": "Im Wasserschutzgebiet sind Schadstofftransporte verboten.",
      "exampleSentenceEs": "En la zona de protección hídrica están prohibidos transportes contaminantes.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Im Wasserschutzgebiet",
          "role": "complement",
          "order": 1
        },
        {
          "text": "sind Schadstofftransporte",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "streng",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verboten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 269: circular white disc with red border showing orange truck over blue water waves, 3D on white background"
    },
    {
      "de": "Beginn einer Umweltzone (das Zeichen 270.1)",
      "pron": "be-gín ái-nea úm-velt-tsó-ne (das tsái-jen...)",
      "es": "Inicio de zona de bajas emisiones",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Umweltplakette",
      "plural": "die Umweltzonen",
      "exampleSentenceDe": "Die Einfahrt ist nur mit grüner Umweltplakette erlaubt.",
      "exampleSentenceEs": "La entrada está permitida únicamente con distintivo ecológico verde.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Einfahrt",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist in die Umweltzone",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "nur mit grüner Plakette",
          "role": "complement",
          "order": 3
        },
        {
          "text": "erlaubt",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 270.1: square white sign with red circle containing text 'Umwelt' and 'ZONE' below, 3D on white background"
    },
    {
      "de": "Ende einer Umweltzone (das Zeichen 270.2)",
      "pron": "én-de ái-nea úm-velt-tsó-ne (das tsái-jen...)",
      "es": "Fin de zona de bajas emisiones",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Ende Umweltzone",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Hier endet die Umweltzone der Stadt.",
      "exampleSentenceEs": "Aquí termina la zona de bajas emisiones de la ciudad.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Hier",
          "role": "complement",
          "order": 1
        },
        {
          "text": "endet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die Umweltzone",
          "role": "subject",
          "order": 3
        },
        {
          "text": "der Stadt",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 270.2: square white environmental zone sign crossed diagonally by five grey stripes, 3D on white background"
    },
    {
      "de": "Verbot des Wendens (das Zeichen 272)",
      "pron": "fea-bót des vén-dens (das tsái-jen...)",
      "es": "Prohibido cambiar el sentido (giro en U prohibido)",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Wendeverbot",
      "plural": "die Wendeverbote",
      "exampleSentenceDe": "Auf dieser Kreuzung darf man nicht wenden.",
      "exampleSentenceEs": "En este cruce no se puede dar la vuelta.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf dieser Kreuzung",
          "role": "complement",
          "order": 1
        },
        {
          "text": "darf man",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "unter keinen Umständen",
          "role": "complement",
          "order": 3
        },
        {
          "text": "wenden",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 272: circular white disc with red border showing black U-turn arrow crossed by red diagonal stripe, 3D on white background"
    },
    {
      "de": "Mindestabstand für Lkw (das Zeichen 273)",
      "pron": "mín-dest-áp-shtant füa él-ka-vé (das tsái-jen...)",
      "es": "Distancia mínima obligatoria entre camiones (>3,5 t)",
      "type": "Sustantivo (Neutro)",
      "category": "Verkehrsverbote",
      "regimen": "Sicherheitsabstand",
      "plural": "die Abstandsschilder",
      "exampleSentenceDe": "Lkw müssen mindestens 50 Meter Abstand halten.",
      "exampleSentenceEs": "Los camiones deben guardar al menos 50 metros de distancia.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Lkw",
          "role": "subject",
          "order": 1
        },
        {
          "text": "müssen auf der Autobahn",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "mindestens 50 Meter Abstand",
          "role": "complement",
          "order": 3
        },
        {
          "text": "halten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 273: circular white disc with red border showing two black trucks in line with '50 m' text between them, 3D on white background"
    },
    {
      "de": "Zulässige Höchstgeschwindigkeit 50 km/h (das Zeichen 274)",
      "pron": "tsú-lé-si-gue jöjts-gue-shvín-dij-kait (das tsái-jen...)",
      "es": "Límite de velocidad máxima (50 km/h)",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "StVO § 3",
      "plural": "die Höchstgeschwindigkeiten",
      "exampleSentenceDe": "Die Höchstgeschwindigkeit beträgt hier 50 km/h.",
      "exampleSentenceEs": "La velocidad máxima es aquí de 50 km/h.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Höchstgeschwindigkeit",
          "role": "subject",
          "order": 1
        },
        {
          "text": "beträgt hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "genau",
          "role": "complement",
          "order": 3
        },
        {
          "text": "50 km/h",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 274-50: circular white disc with red border containing bold black number '50' in German DIN 1451 font, 3D on white background"
    },
    {
      "de": "Beginn einer Tempo 30-Zone (das Zeichen 274.1)",
      "pron": "be-gín ái-nea tém-po drái-sij tsó-ne (das tsái-jen...)",
      "es": "Inicio de zona 30 km/h",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Tempo 30",
      "plural": "die Tempo 30-Zonen",
      "exampleSentenceDe": "In der 30er-Zone fahren wir besonders vorsichtig.",
      "exampleSentenceEs": "En la zona 30 conducimos con especial cuidado.",
      "exampleSentenceDeBlocks": [
        {
          "text": "In der 30er-Zone",
          "role": "complement",
          "order": 1
        },
        {
          "text": "fahren wir",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "stets",
          "role": "complement",
          "order": 3
        },
        {
          "text": "besonders vorsichtig",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 274.1: square white sign with black border showing red '30' sign and black word 'ZONE' below, 3D on white background"
    },
    {
      "de": "Ende einer Tempo 30-Zone (das Zeichen 274.2)",
      "pron": "én-de ái-nea tém-po drái-sij tsó-ne (das tsái-jen...)",
      "es": "Fin de zona 30 km/h",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Aufhebung Zone 30",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Die Tempo 30-Zone endet an diesem Schild.",
      "exampleSentenceEs": "La zona de 30 km/h termina en esta señal.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Tempo 30-Zone",
          "role": "subject",
          "order": 1
        },
        {
          "text": "endet",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "an diesem Schild",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 274.2: square white sign with grey zone 30 crossed diagonally by five parallel black stripes, 3D on white background"
    },
    {
      "de": "Vorgeschriebene Mindestgeschwindigkeit (das Zeichen 275)",
      "pron": "foa-gue-shrí-be-ne mín-dest-gue-shvín-dij-kait (das tsái-jen...)",
      "es": "Velocidad mínima obligatoria (ej. 30 km/h)",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Mindesttempo",
      "plural": "die Mindestgeschwindigkeiten",
      "exampleSentenceDe": "Sie dürfen nicht langsamer als 30 km/h fahren.",
      "exampleSentenceEs": "No puede conducir a menos de 30 km/h.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Sie dürfen hier",
          "role": "subject",
          "order": 1
        },
        {
          "text": "nicht langsamer",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "als 30 km/h",
          "role": "complement",
          "order": 3
        },
        {
          "text": "fahren",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 275: circular blue disc (RAL 5005) with bold white number '30' in DIN 1451 font, 3D on white background"
    },
    {
      "de": "Ende der vorgeschriebenen Mindestgeschwindigkeit (das Zeichen 279)",
      "pron": "én-de dea mín-dest-gue-shvín-dij-kait (das tsái-jen...)",
      "es": "Fin de la velocidad mínima obligatoria",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Ende Mindesttempo",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Das Mindesttempo ist ab hier aufgehoben.",
      "exampleSentenceEs": "La velocidad mínima queda anulada a partir de aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Mindesttempo",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist ab hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wieder",
          "role": "complement",
          "order": 3
        },
        {
          "text": "aufgehoben",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 279: circular blue disc with white number '30' crossed diagonally by three red stripes, 3D on white background"
    },
    {
      "de": "Überholverbot für Kraftfahrzeuge aller Art (das Zeichen 276)",
      "pron": "ú-ba-jól-fea-bót füa kráft-fáar-tsoi-gue (das tsái-jen...)",
      "es": "Prohibición de adelantar vehículos de más de 2 ruedas",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "StVO § 41",
      "plural": "die Überholverbote",
      "exampleSentenceDe": "Überholen ist auf dieser Strecke streng verboten.",
      "exampleSentenceEs": "Adelantar está estrictamente prohibido en este tramo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Überholen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist auf dieser Strecke",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "streng",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verboten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 276: circular white disc with red border showing black car on right and overtaking red car on left, 3D on white background"
    },
    {
      "de": "Überholverbot für Lkw über 3,5 t (das Zeichen 277)",
      "pron": "ú-ba-jól-fea-bót füa él-ka-vé (das tsái-jen...)",
      "es": "Prohibición de adelantar para camiones pesados",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Lkw-Überholverbot",
      "plural": "die Lkw-Überholverbote",
      "exampleSentenceDe": "Lkw über 3,5 Tonnen dürfen hier nicht überholen.",
      "exampleSentenceEs": "Camiones de más de 3,5 toneladas no pueden adelantar aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Lkw über 3,5 Tonnen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "dürfen hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "nicht",
          "role": "complement",
          "order": 3
        },
        {
          "text": "überholen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 277: circular white disc with red border showing black car on right and red overtaking truck on left, 3D on white background"
    },
    {
      "de": "Verbot des Überholens von einspurigen Fahrzeugen (das Zeichen 277.1)",
      "pron": "fea-bót des ú-ba-jó-lens fon áin-shpu-ri-guen fáar-tsoi-guen (das tsái-jen...)",
      "es": "Prohibido adelantar a bicis y motos",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Zweiradschutz",
      "plural": "die Überholverbote",
      "exampleSentenceDe": "Autos dürfen an dieser Stelle keine Fahrräder überholen.",
      "exampleSentenceEs": "Los coches no pueden adelantar bicicletas en este punto.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Autos dürfen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "an dieser Stelle",
          "role": "complement",
          "order": 2
        },
        {
          "text": "keine Fahrräder",
          "role": "verb_p1",
          "order": 3
        },
        {
          "text": "überholen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 277.1: circular white disc with red border showing red car on left overtaking black bicycle and motorcycle, 3D on white background"
    },
    {
      "de": "Ende des Überholverbotes (das Zeichen 280)",
      "pron": "én-de des ú-ba-jól-fea-bó-tes (das tsái-jen...)",
      "es": "Fin de prohibición de adelantamiento general",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Freies Überholen",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Das Überholverbot ist ab hier aufgehoben.",
      "exampleSentenceEs": "La prohibición de adelantar queda anulada desde aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Überholverbot",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist ab diesem Schild",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "wieder",
          "role": "complement",
          "order": 3
        },
        {
          "text": "aufgehoben",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 280: circular white disc with thin black rim showing two grey cars crossed by five diagonal black stripes, 3D on white background"
    },
    {
      "de": "Ende des Überholverbotes für Lkw (das Zeichen 281)",
      "pron": "én-de des ú-ba-jól-fea-bó-tes füa él-ka-vé (das tsái-jen...)",
      "es": "Fin de prohibición de adelantar para camiones",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Ende Lkw-Verbot",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Lkw dürfen ab diesem Schild wieder überholen.",
      "exampleSentenceEs": "Los camiones pueden adelantar de nuevo a partir de esta señal.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Lkw dürfen",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ab diesem Schild",
          "role": "complement",
          "order": 2
        },
        {
          "text": "wieder",
          "role": "verb_p1",
          "order": 3
        },
        {
          "text": "überholen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 281: circular white disc with thin black rim showing grey car and grey truck crossed by five black stripes, 3D on white background"
    },
    {
      "de": "Ende des Überholverbotes von einspurigen Fahrzeugen (das Zeichen 281.1)",
      "pron": "én-de des ú-ba-jól-fea-bó-tes fon áin-shpu-rij (das tsái-jen...)",
      "es": "Fin de prohibición de adelantar bicis y motos",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Ende Zweiradschutz",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Radfahrer dürfen nun wieder vorsichtig überholt werden.",
      "exampleSentenceEs": "Los ciclistas pueden ser adelantados de nuevo con cuidado.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Radfahrer dürfen nun",
          "role": "subject",
          "order": 1
        },
        {
          "text": "wieder vorsichtig",
          "role": "complement",
          "order": 2
        },
        {
          "text": "überholt werden",
          "role": "verb_p1",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 281.1: circular white disc with thin black rim showing grey car and grey bicycle crossed by five black stripes, 3D on white background"
    },
    {
      "de": "Ende sämtlicher Streckenverbote (das Zeichen 282)",
      "pron": "én-de zémt-li-jea shtré-ken-fea-bó-te (das tsái-jen...)",
      "es": "Fin de todas las restricciones de velocidad y adelantamiento",
      "type": "Sustantivo (Neutro)",
      "category": "Geschwindigkeit & Überholen",
      "regimen": "Freie Fahrt",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Alle vorherigen Tempolimits und Überholverbote enden hier.",
      "exampleSentenceEs": "Todos los límites de velocidad y prohibiciones de adelantar terminan aquí.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Alle Tempolimits",
          "role": "subject",
          "order": 1
        },
        {
          "text": "und Überholverbote",
          "role": "complement",
          "order": 2
        },
        {
          "text": "enden",
          "role": "verb_p1",
          "order": 3
        },
        {
          "text": "hier",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 282: circular white disc with thin black rim crossed diagonally by five parallel solid black stripes, 3D on white background"
    },
    {
      "de": "Absolutes Haltverbot (das Zeichen 283)",
      "pron": "ap-zo-lú-tes jált-fea-bót (das tsái-jen...)",
      "es": "Prohibición absoluta de parada y estacionamiento",
      "type": "Sustantivo (Neutro)",
      "category": "Halte- & Parkverbote",
      "regimen": "Kein Halten",
      "plural": "die absoluten Haltverbote",
      "exampleSentenceDe": "Im absoluten Haltverbot darf man keine Sekunde stehen.",
      "exampleSentenceEs": "En la parada prohibida absoluta no se puede parar ni un segundo.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Im absoluten Haltverbot",
          "role": "complement",
          "order": 1
        },
        {
          "text": "darf man",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "keine Sekunde",
          "role": "complement",
          "order": 3
        },
        {
          "text": "stehen",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 283: circular blue sign with thick red border (RAL 3020) and a red cross (X) with two intersecting diagonal bars, 3D on white background"
    },
    {
      "de": "Eingeschränktes Haltverbot (das Zeichen 286)",
      "pron": "áin-gue-shrénk-tes jált-fea-bót (das tsái-jen...)",
      "es": "Estacionamiento prohibido (máx. 3 min de parada)",
      "type": "Sustantivo (Neutro)",
      "category": "Halte- & Parkverbote",
      "regimen": "Max. 3 Min.",
      "plural": "die eingeschränkten Haltverbote",
      "exampleSentenceDe": "Man darf maximal drei Minuten zum Be- und Entladen halten.",
      "exampleSentenceEs": "Se puede parar como máximo tres minutos para cargar y descargar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Man darf",
          "role": "subject",
          "order": 1
        },
        {
          "text": "maximal drei Minuten",
          "role": "complement",
          "order": 2
        },
        {
          "text": "zum Be- und Entladen",
          "role": "complement",
          "order": 3
        },
        {
          "text": "halten",
          "role": "verb_p1",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 286: circular blue sign with thick red border (RAL 3020) and a single red diagonal stripe from top-left to bottom-right, 3D on white background"
    },
    {
      "de": "Beginn eines eingeschränkten Haltverbotes für eine Zone (das Zeichen 290.1)",
      "pron": "be-gín ái-nes áin-gue-shrénk-ten jált-fea-bó-tes füa ái-ne tsó-ne (das tsái-jen...)",
      "es": "Inicio de zona de estacionamiento restringido",
      "type": "Sustantivo (Neutro)",
      "category": "Halte- & Parkverbote",
      "regimen": "Parkverbotszone",
      "plural": "die Parkverbotszonen",
      "exampleSentenceDe": "In der gesamten Zone darf man nur mit Parkschein parken.",
      "exampleSentenceEs": "En toda la zona solo se puede aparcar con tique de estacionamiento.",
      "exampleSentenceDeBlocks": [
        {
          "text": "In der gesamten Zone",
          "role": "complement",
          "order": 1
        },
        {
          "text": "darf man",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "nur mit Parkschein",
          "role": "complement",
          "order": 3
        },
        {
          "text": "parken",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 290.1: square white sign with black border showing circular blue sign with red diagonal slash and bold black word 'ZONE' below, 3D on white background"
    },
    {
      "de": "Ende eines eingeschränkten Haltverbotes für eine Zone (das Zeichen 290.2)",
      "pron": "én-de ái-nes áin-gue-shrénk-ten jált-fea-bó-tes füa ái-ne tsó-ne (das tsái-jen...)",
      "es": "Fin de zona de estacionamiento restringido",
      "type": "Sustantivo (Neutro)",
      "category": "Halte- & Parkverbote",
      "regimen": "Ende Parkverbotszone",
      "plural": "die Verkehrszeichen",
      "exampleSentenceDe": "Die Parkverbotszone endet an dieser Stelle.",
      "exampleSentenceEs": "La zona de estacionamiento restringido termina en este punto.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Parkverbotszone",
          "role": "subject",
          "order": 1
        },
        {
          "text": "endet hier",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "an dieser Stelle",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "Official German traffic sign StVO Zeichen 290.2: square white sign with grey parking prohibition zone crossed diagonally by five parallel black stripes, 3D on white background"
    },
    {
      "de": "Fußgängerüberweg (das Zeichen 293)",
      "pron": "fús-guen-ga-ú-ba-vek (das tsái-jen tsvei-hún-dert-drái-unt-noin-tsij)",
      "es": "Paso de peatones reglamentario (Zebrastreifen)",
      "type": "Sustantivo (Neutro)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Vorrang Fußgänger",
      "plural": "die Fußgängerüberwege",
      "exampleSentenceDe": "Am Zebrastreifen haben Fußgänger immer Vorrang.",
      "exampleSentenceEs": "En el paso de peatones los peatones tienen siempre preferencia.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Am Zebrastreifen",
          "role": "complement",
          "order": 1
        },
        {
          "text": "haben Fußgänger",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "stets",
          "role": "complement",
          "order": 3
        },
        {
          "text": "Vorrang",
          "role": "complement",
          "order": 4
        }
      ],
      "en": "Official German road marking StVO Zeichen 293: 3D perspective of dark asphalt road surface with crisp parallel white zebra crossing stripes (Zebrastreifen), studio lighting on pure white background"
    },
    {
      "de": "Haltlinie (das Zeichen 294)",
      "pron": "jált-lí-ni-e (das tsái-jen tsvei-hún-dert-fía-unt-noin-tsij)",
      "es": "Línea continua de detención obligatoria",
      "type": "Sustantivo (Fem)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Anhaltepflicht",
      "plural": "die Haltlinien",
      "exampleSentenceDe": "Halten Sie Ihr Fahrzeug direkt vor der Haltlinie an.",
      "exampleSentenceEs": "Detenga su vehículo justo delante de la línea de detención.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Halten Sie",
          "role": "verb_p1",
          "order": 1
        },
        {
          "text": "Ihr Fahrzeug",
          "role": "subject",
          "order": 2
        },
        {
          "text": "direkt vor der Haltlinie",
          "role": "complement",
          "order": 3
        },
        {
          "text": "an",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German road marking StVO Zeichen 294: 3D perspective of dark asphalt road with thick solid white transverse stop line (Haltlinie) painted across the lane, white background"
    },
    {
      "de": "Fahrstreifenbegrenzung (das Zeichen 295)",
      "pron": "fáar-shtrái-fen-be-grén-tsung (das tsái-jen tsvei-hún-dert-fúnf-unt-noin-tsij)",
      "es": "Línea continua longitudinal (prohibido cruzarla)",
      "type": "Sustantivo (Fem)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Überfahrverbot",
      "plural": "die Fahrstreifenbegrenzungen",
      "exampleSentenceDe": "Die durchgezogene Linie darf nicht überfahren werden.",
      "exampleSentenceEs": "La línea continua no se puede cruzar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die durchgezogene Linie",
          "role": "subject",
          "order": 1
        },
        {
          "text": "darf unter keinen Umständen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "überfahren werden",
          "role": "verb_p2",
          "order": 3
        }
      ],
      "en": "Official German road marking StVO Zeichen 295: 3D perspective of asphalt roadway with solid continuous straight white line separating traffic lanes, pure white background"
    },
    {
      "de": "Einseitige Fahrstreifenbegrenzung (das Zeichen 296)",
      "pron": "áin-zái-ti-gue fáar-shtrái-fen-be-grén-tsung (das tsái-jen...)",
      "es": "Línea mixta: continua con discontinua adyacente",
      "type": "Sustantivo (Fem)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Einseitiges Überholen",
      "plural": "die einseitigen Fahrstreifenbegrenzungen",
      "exampleSentenceDe": "Wer neben der gestrichelten Linie fährt, darf überholen.",
      "exampleSentenceEs": "Quien circula junto a la línea discontinua puede adelantar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Wer neben der gestrichelten Linie fährt,",
          "role": "subject",
          "order": 1
        },
        {
          "text": "darf das Fahrzeug",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "überholen",
          "role": "verb_p2",
          "order": 3
        }
      ],
      "en": "Official German road marking StVO Zeichen 296: 3D perspective of asphalt road showing double parallel lines: one solid continuous white line and one dashed broken white line side by side, white background"
    },
    {
      "de": "Pfeilmarkierungen (das Zeichen 297)",
      "pron": "pfáil-mar-kí-run-guen (das tsái-jen tsvei-hún-dert-zí-ben-unt-noin-tsij)",
      "es": "Flechas de preselección de carril y giro en la calzada",
      "type": "Sustantivo (Plural)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Spurwahlgebot",
      "plural": "die Pfeilmarkierungen",
      "exampleSentenceDe": "Die Pfeile auf der Fahrbahn zeigen die vorgeschriebene Spur.",
      "exampleSentenceEs": "Las flechas en la calzada indican el carril obligatorio.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Die Pfeile auf der Fahrbahn",
          "role": "subject",
          "order": 1
        },
        {
          "text": "zeigen",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "die vorgeschriebene Spur",
          "role": "complement",
          "order": 3
        }
      ],
      "en": "Official German road marking StVO Zeichen 297: 3D perspective of asphalt lane with painted white directional arrows: straight and right curving, clean white background"
    },
    {
      "de": "Vorankündigungspfeil (das Zeichen 297.1)",
      "pron": "fóa-an-kún-di-gungs-pfail (das tsái-jen...)",
      "es": "Flecha curva de preaviso de fin de carril",
      "type": "Sustantivo (Masc)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Räumungsgebot",
      "plural": "die Vorankündigungspfeile",
      "exampleSentenceDe": "Der Vorankündigungspfeil kündigt das Ende des Fahrstreifens an.",
      "exampleSentenceEs": "La flecha de preaviso anuncia el fin del carril.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Der Vorankündigungspfeil",
          "role": "subject",
          "order": 1
        },
        {
          "text": "kündigt das Ende",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "des Fahrstreifens",
          "role": "complement",
          "order": 3
        },
        {
          "text": "an",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German road marking StVO Zeichen 297.1: 3D perspective of asphalt road with painted curved white lane reduction arrow warning to merge right, clean white background"
    },
    {
      "de": "Sperrfläche (das Zeichen 298)",
      "pron": "shpéa-flé-je (das tsái-jen tsvei-hún-dert-ajt-unt-noin-tsij)",
      "es": "Zona excluida al tráfico con cebreado diagonal",
      "type": "Sustantivo (Fem)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Befahrungsverbot",
      "plural": "die Sperrflächen",
      "exampleSentenceDe": "Das Befahren der Sperrfläche ist streng verboten.",
      "exampleSentenceEs": "Circular sobre la zona de exclusión está estrictamente prohibido.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Das Befahren der Sperrfläche",
          "role": "subject",
          "order": 1
        },
        {
          "text": "ist im Straßenverkehr",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "strengstens",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verboten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German road marking StVO Zeichen 298: 3D perspective of dark asphalt road with diagonal white chevron hatch markings (Sperrfläche) bounded by solid white border line, white background"
    },
    {
      "de": "Grenzmarkierung für Halt- oder Parkverbote (das Zeichen 299)",
      "pron": "grénts-mar-kí-rung füa jált- ó-da párk-fea-bó-te (das tsái-jen...)",
      "es": "Línea en zigzag delimitadora de prohibición de estacionar",
      "type": "Sustantivo (Fem)",
      "category": "Fahrbahnmarkierungen",
      "regimen": "Parkverbot",
      "plural": "die Grenzmarkierungen",
      "exampleSentenceDe": "Auf der Zickzack-Linie ist das Parken verboten.",
      "exampleSentenceEs": "En la línea en zigzag está prohibido aparcar.",
      "exampleSentenceDeBlocks": [
        {
          "text": "Auf der Zickzack-Linie",
          "role": "complement",
          "order": 1
        },
        {
          "text": "ist das Parken",
          "role": "verb_p1",
          "order": 2
        },
        {
          "text": "grundsätzlich",
          "role": "complement",
          "order": 3
        },
        {
          "text": "verboten",
          "role": "verb_p2",
          "order": 4
        }
      ],
      "en": "Official German road marking StVO Zeichen 299: 3D perspective of asphalt street pavement with painted white zigzag road marking (Zickzacklinie) along the curb, clean white background"
    }
  ]
}
];
