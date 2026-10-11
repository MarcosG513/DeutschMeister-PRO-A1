const fs = require('fs');
const path = require('path');

// =========================================================================
// 69 NORMAS REGLAMENTARIAS Y MARCAS VIALES DE LA StVO (ANLAGE 2)
// SINTAXIS REFORMADA: "Nombre Legal (das Zeichen Código)"
// =========================================================================
const signs69 = [
  // 1. Órdenes de espera y de detención (Warte- & Haltegebote) [1-4]
  {
    de: "Andreaskreuz (das Zeichen 201)",
    pron: "an-dre-as-kroits (das tsái-jen tsvei-hún-dert-áins)",
    es: "Cruz de San Andrés (prioridad del tren)",
    type: "Sustantivo (Neutro)",
    category: "Warte- & Haltegebote",
    regimen: "StVO § 19 (Bahnübergang)",
    plural: "die Andreaskreuze",
    exampleSentenceDe: "Das Andreaskreuz steht direkt vor dem Bahnübergang.",
    exampleSentenceEs: "La cruz de San Andrés está justo delante del paso a nivel.",
    exampleSentenceDeBlocks: [
      { text: "Das Andreaskreuz", role: "subject", order: 1 },
      { text: "steht direkt", role: "verb_p1", order: 2 },
      { text: "vor dem Bahnübergang", role: "complement", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 201-50 Andreaskreuz: a white St. Andrew cross with red tips (RAL 3020 and RAL 9016), mounted on a metallic signpost, 3D isometric studio render, pure white background (#FFFFFF), zero text, exact legal German design"
  },
  {
    de: "Vorfahrt gewähren (das Zeichen 205)",
    pron: "fóa-fart gue-vé-ren (das tsái-jen tsvei-hún-dert-fünf)",
    es: "Ceda el paso (conceder la prioridad)",
    type: "Sustantivo (Neutro)",
    category: "Warte- & Haltegebote",
    regimen: "StVO § 8 (Vorfahrt)",
    plural: "die Vorfahrtsschilder",
    exampleSentenceDe: "An dieser Kreuzung müssen wir Vorfahrt gewähren.",
    exampleSentenceEs: "En este cruce debemos ceder el paso.",
    exampleSentenceDeBlocks: [
      { text: "An dieser Kreuzung", role: "complement", order: 1 },
      { text: "müssen wir", role: "verb_p1", order: 2 },
      { text: "Vorfahrt gewähren", role: "verb_p2", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 205: inverted equilateral triangle with thick red border (RAL 3020) and blank white center, 3D on white background"
  },
  {
    de: "Halt. Vorfahrt gewähren (das Zeichen 206)",
    pron: "halt fóa-fart gue-vé-ren (das tsái-jen tsvei-hún-dert-zeks)",
    es: "Stop (detención obligatoria y ceda el paso)",
    type: "Sustantivo (Neutro)",
    category: "Warte- & Haltegebote",
    regimen: "StVO § 41 (Haltgebot)",
    plural: "die Stoppschilder",
    exampleSentenceDe: "Am Stoppschild muss man an der Haltlinie komplett anhalten.",
    exampleSentenceEs: "En la señal de stop hay que detenerse por completo en la línea.",
    exampleSentenceDeBlocks: [
      { text: "Am Stoppschild", role: "complement", order: 1 },
      { text: "muss man", role: "verb_p1", order: 2 },
      { text: "an der Haltlinie", role: "complement", order: 3 },
      { text: "komplett anhalten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 206: regular octagonal red (RAL 3020) sign with white border line and bold white text 'STOP' in German DIN 1451 font, 3D on white background"
  },
  {
    de: "Dem Gegenverkehr Vorrang gewähren (das Zeichen 208)",
    pron: "dem gue-guen-fea-kér fóa-rang gue-vé-ren (das tsái-jen tsvei-hún-dert-ajt)",
    es: "Ceda el paso al sentido contrario en paso estrecho",
    type: "Sustantivo (Neutro)",
    category: "Warte- & Haltegebote",
    regimen: "StVO § 41",
    plural: "die Vorrangzeichen",
    exampleSentenceDe: "Bei diesem Schild hat der Gegenverkehr Vorrang.",
    exampleSentenceEs: "Con esta señal el tráfico en sentido contrario tiene preferencia.",
    exampleSentenceDeBlocks: [
      { text: "Bei diesem Schild", role: "complement", order: 1 },
      { text: "hat der Gegenverkehr", role: "verb_p1", order: 2 },
      { text: "immer", role: "complement", order: 3 },
      { text: "Vorrang", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 208: circular white disc with thick red border (RAL 3020) containing right arrow red pointing up and left arrow black pointing down, 3D on white background"
  },

  // 2. Direcciones prescritas / obligatorias (Fahrtrichtungen) [5-9]
  {
    de: "Vorgeschriebene Fahrtrichtung rechts (das Zeichen 209-10)",
    pron: "foa-gue-shrí-be-ne fáat-rij-tung rejts (das tsái-jen...)",
    es: "Giro obligatorio a la derecha tras la señal",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen",
    regimen: "StVO § 41",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Nach der Kreuzung müssen Sie rechts abbiegen.",
    exampleSentenceEs: "Después del cruce debe girar a la derecha.",
    exampleSentenceDeBlocks: [
      { text: "Nach der Kreuzung", role: "complement", order: 1 },
      { text: "müssen Sie", role: "verb_p1", order: 2 },
      { text: "nach rechts", role: "complement", order: 3 },
      { text: "abbiegen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 209-10: circular blue disc (RAL 5005) with white arrow pointing right, 3D on white background"
  },
  {
    de: "Vorgeschriebene Fahrtrichtung hier rechts (das Zeichen 209-20)",
    pron: "foa-gue-shrí-be-ne fáat-rij-tung jía rejts (das tsái-jen...)",
    es: "Giro obligatorio aquí a la derecha (delante de la señal)",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen",
    regimen: "StVO § 41",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Biegen Sie unmittelbar vor dem Schild rechts ab.",
    exampleSentenceEs: "Gire a la derecha inmediatamente delante de la señal.",
    exampleSentenceDeBlocks: [
      { text: "Biegen Sie", role: "verb_p1", order: 1 },
      { text: "unmittelbar vor dem Schild", role: "complement", order: 2 },
      { text: "nach rechts", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 209-20: circular blue disc with diagonal downward-right white arrow, 3D on white background"
  },
  {
    de: "Vorgeschriebene Fahrtrichtung geradeaus oder rechts (das Zeichen 214)",
    pron: "foa-gue-shrí-be-ne fáat-rij-tung gue-rá-de-aus ó-da rejts (das tsái-jen...)",
    es: "Sentido obligatorio: recto o a la derecha",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen",
    regimen: "StVO § 41",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Sie dürfen geradeaus fahren oder nach rechts abbiegen.",
    exampleSentenceEs: "Puede seguir recto o girar a la derecha.",
    exampleSentenceDeBlocks: [
      { text: "Sie dürfen", role: "subject", order: 1 },
      { text: "geradeaus fahren", role: "verb_p1", order: 2 },
      { text: "oder nach rechts", role: "complement", order: 3 },
      { text: "abbiegen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 214: circular blue disc with branched white arrow pointing straight and right, 3D on white background"
  },
  {
    de: "Kreisverkehr (das Zeichen 215)",
    pron: "kráis-fea-kér (das tsái-jen...)",
    es: "Glorieta obligatoria (sentido giratorio)",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen",
    regimen: "StVO § 8 Abs. 1a",
    plural: "die Kreisverkehre",
    exampleSentenceDe: "Im Kreisverkehr haben die Fahrzeuge im Kreis die Vorfahrt.",
    exampleSentenceEs: "En la glorieta los vehículos dentro tienen preferencia.",
    exampleSentenceDeBlocks: [
      { text: "Im Kreisverkehr", role: "complement", order: 1 },
      { text: "haben die Fahrzeuge", role: "verb_p1", order: 2 },
      { text: "im Kreis", role: "complement", order: 3 },
      { text: "die Vorfahrt", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 215: circular blue disc with three curved white arrows forming counter-clockwise circle, 3D on white background"
  },
  {
    de: "Einbahnstraße (das Zeichen 220)",
    pron: "áin-ban-shtrá-se (das tsái-jen...)",
    es: "Calle de sentido único",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen",
    regimen: "StVO § 41",
    plural: "die Einbahnstraßen",
    exampleSentenceDe: "In der Einbahnstraße darf man nicht wenden.",
    exampleSentenceEs: "En la calle de sentido único no se puede dar la vuelta.",
    exampleSentenceDeBlocks: [
      { text: "In der Einbahnstraße", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "unter keinen Umständen", role: "complement", order: 3 },
      { text: "wenden", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 220: rectangular blue horizontal sign with wide white arrow containing black text 'Einbahnstraße', 3D on white background"
  },

  // 3. Sentido de paso obligatorio (Fahrtrichtungen) [10]
  {
    de: "Vorgeschriebene Vorbeifahrt rechts vorbei (das Zeichen 222)",
    pron: "foa-gue-shrí-be-ne foa-bái-faat rejts foa-bái (das tsái-jen...)",
    es: "Paso reglamentario obligatorio por la derecha",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen",
    regimen: "StVO § 41",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Fahren Sie rechts an der Verkehrsinsel vorbei.",
    exampleSentenceEs: "Pase por la derecha de la isleta de tráfico.",
    exampleSentenceDeBlocks: [
      { text: "Fahren Sie", role: "verb_p1", order: 1 },
      { text: "rechts an der Verkehrsinsel", role: "complement", order: 2 },
      { text: "vorsichtig", role: "complement", order: 3 },
      { text: "vorbei", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 222: circular blue disc with diagonal white arrow pointing down-right, 3D on white background"
  },

  // 4. Uso del arcén, paradas de bus y taxi (Sonderwege & Spuren) [11-15]
  {
    de: "Seitenstreifen befahren (das Zeichen 223.1)",
    pron: "zái-ten-shtrái-fen be-fá-ren (das tsái-jen...)",
    es: "Autorización para circular por el arcén",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Autobahnfreigabe",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Auf der Autobahn darf man den Seitenstreifen befahren.",
    exampleSentenceEs: "En la autopista se permite circular por el arcén.",
    exampleSentenceDeBlocks: [
      { text: "Auf der Autobahn", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "den Seitenstreifen", role: "complement", order: 3 },
      { text: "befahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 223.1: rectangular blue lane sign showing three white arrows with the right shoulder open for traffic, 3D on white background"
  },
  {
    de: "Seitenstreifen nicht mehr befahren (das Zeichen 223.2)",
    pron: "zái-ten-shtrái-fen nijt mea be-fá-ren (das tsái-jen...)",
    es: "Fin de autorización de circular por el arcén",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Ende Freigabe",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Die Freigabe des Seitenstreifens endet hier.",
    exampleSentenceEs: "La habilitación del arcén termina aquí.",
    exampleSentenceDeBlocks: [
      { text: "Die Freigabe des Seitenstreifens", role: "subject", order: 1 },
      { text: "endet hier", role: "verb_p1", order: 2 },
      { text: "ab diesem Schild", role: "complement", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 223.2: blue lane sign showing right shoulder lane crossed out by a red diagonal stripe, 3D on white background"
  },
  {
    de: "Seitenstreifen räumen (das Zeichen 223.3)",
    pron: "zái-ten-shtrái-fen rói-men (das tsái-jen...)",
    es: "Despejar y abandonar el arcén de inmediato",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Räumungsgebot",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Räumen Sie den Seitenstreifen sofort nach links.",
    exampleSentenceEs: "Despeje el arcén de inmediato hacia la izquierda.",
    exampleSentenceDeBlocks: [
      { text: "Räumen Sie", role: "verb_p1", order: 1 },
      { text: "den Seitenstreifen", role: "complement", order: 2 },
      { text: "sofort", role: "complement", order: 3 },
      { text: "nach links", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 223.3: blue lane sign showing right shoulder arrow merging sharply back into main traffic, 3D on white background"
  },
  {
    de: "Haltestelle (das Zeichen 224)",
    pron: "jál-te-shté-le (das tsái-jen...)",
    es: "Parada oficial de autobuses o tranvías",
    type: "Sustantivo (Fem)",
    category: "Sonderwege & Spuren",
    regimen: "15m Parkverbot",
    plural: "die Haltestellen",
    exampleSentenceDe: "15 Meter vor und hinter der Haltestelle darf man nicht parken.",
    exampleSentenceEs: "15 metros antes y después de la parada no se puede aparcar.",
    exampleSentenceDeBlocks: [
      { text: "15 Meter vor und hinter der Haltestelle", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "niemals", role: "complement", order: 3 },
      { text: "parken", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 224: circular yellow disc with wide green outer border ring containing a green uppercase letter 'H', 3D on white background"
  },
  {
    de: "Taxenstand (das Zeichen 229)",
    pron: "ták-sen-shtant (das tsái-jen...)",
    es: "Parada reservada exclusivamente para taxis",
    type: "Sustantivo (Masc)",
    category: "Sonderwege & Spuren",
    regimen: "StVO § 41",
    plural: "die Taxenstände",
    exampleSentenceDe: "Hier dürfen nur zugelassene Taxis warten.",
    exampleSentenceEs: "Aquí solo pueden esperar taxis autorizados.",
    exampleSentenceDeBlocks: [
      { text: "Hier dürfen", role: "complement", order: 1 },
      { text: "nur zugelassene Taxis", role: "subject", order: 2 },
      { text: "offiziell", role: "complement", order: 3 },
      { text: "warten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 229: rectangular blue sign showing white taxi car silhouette with 'TAXI' sign on roof, 3D on white background"
  },

  // 5. Vías y rutas especiales (Sonderwege & Spuren) [16-25]
  {
    de: "Radweg (das Zeichen 237)",
    pron: "rát-vek (das tsái-jen...)",
    es: "Vía ciclista obligatoria (carril bici exclusivo)",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Radwegebenutzungspflicht",
    plural: "die Radwege",
    exampleSentenceDe: "Radfahrer müssen diesen Radweg benutzen.",
    exampleSentenceEs: "Los ciclistas deben usar este carril bici.",
    exampleSentenceDeBlocks: [
      { text: "Radfahrer", role: "subject", order: 1 },
      { text: "müssen diesen Radweg", role: "verb_p1", order: 2 },
      { text: "immer", role: "complement", order: 3 },
      { text: "benutzen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 237: circular blue disc with white bicycle silhouette pictogram, 3D on white background"
  },
  {
    de: "Reitweg (das Zeichen 238)",
    pron: "ráit-vek (das tsái-jen...)",
    es: "Vía exclusiva para jinetes",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "StVO § 41",
    plural: "die Reitwege",
    exampleSentenceDe: "Dieser Weg ist Reitern vorbehalten.",
    exampleSentenceEs: "Este camino está reservado para jinetes.",
    exampleSentenceDeBlocks: [
      { text: "Dieser Weg", role: "subject", order: 1 },
      { text: "ist Reitern", role: "verb_p1", order: 2 },
      { text: "vollständig", role: "complement", order: 3 },
      { text: "vorbehalten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 238: circular blue disc with white horse and rider silhouette, 3D on white background"
  },
  {
    de: "Gehweg (das Zeichen 239)",
    pron: "gué-vek (das tsái-jen...)",
    es: "Acera / Vía exclusiva peatonal",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Fußgängerbereich",
    plural: "die Gehwege",
    exampleSentenceDe: "Fahrzeuge dürfen auf dem Gehweg nicht fahren.",
    exampleSentenceEs: "Los vehículos no pueden circular por la acera.",
    exampleSentenceDeBlocks: [
      { text: "Fahrzeuge dürfen", role: "subject", order: 1 },
      { text: "auf dem Gehweg", role: "complement", order: 2 },
      { text: "grundsätzlich nicht", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 239: circular blue disc with white parent and child pedestrian silhouette, 3D on white background"
  },
  {
    de: "Gemeinsamer Geh- und Radweg (das Zeichen 240)",
    pron: "gue-máin-za-ma gué- unt rát-vek (das tsái-jen...)",
    es: "Vía compartida para peatones y ciclistas",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Rücksichtnahme",
    plural: "die gemeinsamen Geh- und Radwege",
    exampleSentenceDe: "Radfahrer müssen auf Fußgänger Rücksicht nehmen.",
    exampleSentenceEs: "Los ciclistas deben tener consideración con los peatones.",
    exampleSentenceDeBlocks: [
      { text: "Radfahrer", role: "subject", order: 1 },
      { text: "müssen auf Fußgänger", role: "verb_p1", order: 2 },
      { text: "stets", role: "complement", order: 3 },
      { text: "Rücksicht nehmen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 240: circular blue disc with white pedestrians above horizontal white line and bicycle below, 3D on white background"
  },
  {
    de: "Getrennter Rad- und Gehweg (das Zeichen 241)",
    pron: "gue-trén-ta rát- unt gué-vek (das tsái-jen...)",
    es: "Vía segregada para ciclistas y peatones",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Getrennte Spuren",
    plural: "die getrennten Rad- und Gehwege",
    exampleSentenceDe: "Eine Linie trennt den Radweg vom Fußweg.",
    exampleSentenceEs: "Una línea separa el carril bici de la acera.",
    exampleSentenceDeBlocks: [
      { text: "Eine weiße Linie", role: "subject", order: 1 },
      { text: "trennt den Radweg", role: "verb_p1", order: 2 },
      { text: "klar", role: "complement", order: 3 },
      { text: "vom Fußweg", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 241: circular blue disc vertically divided by white line: bicycle left, pedestrians right, 3D on white background"
  },
  {
    de: "Beginn einer Fußgängerzone (das Zeichen 242.1)",
    pron: "be-gín ái-nea fús-guen-ga-tsó-ne (das tsái-jen...)",
    es: "Inicio de zona peatonal",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Schrittgeschwindigkeit",
    plural: "die Fußgängerzonen",
    exampleSentenceDe: "In der Fußgängerzone haben Fußgänger Vorrang.",
    exampleSentenceEs: "En la zona peatonal los peatones tienen preferencia.",
    exampleSentenceDeBlocks: [
      { text: "In der Fußgängerzone", role: "complement", order: 1 },
      { text: "haben Fußgänger", role: "verb_p1", order: 2 },
      { text: "immer", role: "complement", order: 3 },
      { text: "Vorrang", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 242.1: square white sign with black border showing blue pedestrian circle and black text 'ZONE', 3D on white background"
  },
  {
    de: "Ende einer Fußgängerzone (das Zeichen 242.2)",
    pron: "én-de ái-nea fús-guen-ga-tsó-ne (das tsái-jen...)",
    es: "Fin de zona peatonal",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Ende Zone",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Hier endet die Fußgängerzone.",
    exampleSentenceEs: "Aquí termina la zona peatonal.",
    exampleSentenceDeBlocks: [
      { text: "Hier", role: "complement", order: 1 },
      { text: "endet", role: "verb_p1", order: 2 },
      { text: "die Fußgängerzone", role: "subject", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 242.2: square white pedestrian zone sign crossed diagonally by five parallel grey stripes, 3D on white background"
  },
  {
    de: "Beginn einer Fahrradstraße (das Zeichen 244.1)",
    pron: "be-gín ái-nea fáar-rat-shtrá-se (das tsái-jen...)",
    es: "Inicio de calle ciclista (máx. 30 km/h)",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Max. 30 km/h",
    plural: "die Fahrradstraßen",
    exampleSentenceDe: "In der Fahrradstraße gilt maximal Tempo 30.",
    exampleSentenceEs: "En la calle ciclista rige como máximo 30 km/h.",
    exampleSentenceDeBlocks: [
      { text: "In der Fahrradstraße", role: "complement", order: 1 },
      { text: "gilt maximal", role: "verb_p1", order: 2 },
      { text: "Tempo 30", role: "subject", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 244.1: square white sign with blue bicycle circle and black text 'Fahrradstraße' and 'ZONE', 3D on white background"
  },
  {
    de: "Ende einer Fahrradstraße (das Zeichen 244.2)",
    pron: "én-de ái-nea fáar-rat-shtrá-se (das tsái-jen...)",
    es: "Fin de calle ciclista",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Ende Fahrradstraße",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Die Fahrradstraße ist hier zu Ende.",
    exampleSentenceEs: "La calle ciclista termina aquí.",
    exampleSentenceDeBlocks: [
      { text: "Die Fahrradstraße", role: "subject", order: 1 },
      { text: "ist hier", role: "verb_p1", order: 2 },
      { text: "zu Ende", role: "complement", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 244.2: square white bicycle zone sign crossed diagonally by five grey stripes, 3D on white background"
  },
  {
    de: "Bussonderfahrstreifen (das Zeichen 245)",
    pron: "búsc-zón-da-fáar-shtrái-fen (das tsái-jen...)",
    es: "Carril exclusivo para autobuses de línea",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    regimen: "Nur Linienbusse",
    plural: "die Bussonderfahrstreifen",
    exampleSentenceDe: "Pkw dürfen den Bussonderfahrstreifen nicht befahren.",
    exampleSentenceEs: "Los turismos no pueden circular por el carril bus.",
    exampleSentenceDeBlocks: [
      { text: "Pkw", role: "subject", order: 1 },
      { text: "dürfen die Busspur", role: "verb_p1", order: 2 },
      { text: "auf keinen Fall", role: "complement", order: 3 },
      { text: "befahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 245: circular blue disc with white side bus pictogram, 3D on white background"
  },

  // 6. Restricciones y prohibiciones de paso (Verkehrsverbote) [26-45]
  {
    de: "Verbot für Fahrzeuge aller Art (das Zeichen 250)",
    pron: "fea-bót füa fáar-tsoi-gue á-la art (das tsái-jen...)",
    es: "Prohibición de circulación para todo vehículo",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Vollsperrung",
    plural: "die Durchfahrtsverbote",
    exampleSentenceDe: "Die Straße ist für alle Fahrzeuge gesperrt.",
    exampleSentenceEs: "La calle está cerrada para todos los vehículos.",
    exampleSentenceDeBlocks: [
      { text: "Die Straße", role: "subject", order: 1 },
      { text: "ist für alle Fahrzeuge", role: "verb_p1", order: 2 },
      { text: "vollständig", role: "complement", order: 3 },
      { text: "gesperrt", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 250: circular white disc with thick bright red outer ring (RAL 3020) and empty white center, 3D on white background"
  },
  {
    de: "Verbot für Kraftwagen (das Zeichen 251)",
    pron: "fea-bót füa kráft-vá-guen (das tsái-jen...)",
    es: "Prohibición para automóviles y vehículos de motor",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Pkw-Verbot",
    plural: "die Verkehrsverbote",
    exampleSentenceDe: "Autos dürfen hier nicht weiterfahren.",
    exampleSentenceEs: "Los coches no pueden continuar por aquí.",
    exampleSentenceDeBlocks: [
      { text: "Autos dürfen", role: "subject", order: 1 },
      { text: "hier nicht", role: "verb_p1", order: 2 },
      { text: "weiterfahren", role: "verb_p2", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 251: circular white disc with red border containing black frontal car pictogram, 3D on white background"
  },
  {
    de: "Verbot für Kraftfahrzeuge über 3,5 t (das Zeichen 253)",
    pron: "fea-bót füa kráft-fáar-tsoi-gue ú-ba drái kó-ma fünf tón-nen (das tsái-jen...)",
    es: "Prohibición para camiones de más de 3,5 t",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Lkw-Verbot",
    plural: "die Lkw-Verbote",
    exampleSentenceDe: "Schwere Lkw dürfen hier nicht durchfahren.",
    exampleSentenceEs: "Los camiones pesados no pueden pasar por aquí.",
    exampleSentenceDeBlocks: [
      { text: "Schwere Lkw", role: "subject", order: 1 },
      { text: "dürfen hier nicht", role: "verb_p1", order: 2 },
      { text: "durchfahren", role: "verb_p2", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 253: circular white disc with red border containing black side-view truck pictogram, 3D on white background"
  },
  {
    de: "Verbot für Radverkehr (das Zeichen 254)",
    pron: "fea-bót füa rát-fea-kér (das tsái-jen...)",
    es: "Prohibición de paso para bicicletas",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Radfahrverbot",
    plural: "die Radfahrverbote",
    exampleSentenceDe: "Fahrradfahren ist auf dieser Straße verboten.",
    exampleSentenceEs: "Montar en bicicleta está prohibido en esta calle.",
    exampleSentenceDeBlocks: [
      { text: "Fahrradfahren", role: "subject", order: 1 },
      { text: "ist auf dieser Straße", role: "verb_p1", order: 2 },
      { text: "strengstens", role: "complement", order: 3 },
      { text: "verboten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 254: circular white disc with red border containing black bicycle pictogram, 3D on white background"
  },
  {
    de: "Verbot für Krafträder (das Zeichen 255)",
    pron: "fea-bót füa kráft-ré-da (das tsái-jen...)",
    es: "Prohibición de paso para motocicletas",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Motorradverbot",
    plural: "die Motorradverbote",
    exampleSentenceDe: "Motorräder dürfen diese Straße nicht befahren.",
    exampleSentenceEs: "Las motocicletas no pueden circular por esta calle.",
    exampleSentenceDeBlocks: [
      { text: "Motorräder dürfen", role: "subject", order: 1 },
      { text: "diese Straße", role: "complement", order: 2 },
      { text: "nicht", role: "verb_p1", order: 3 },
      { text: "befahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 255: circular white disc with red border containing black motorcycle with rider silhouette, 3D on white background"
  },
  {
    de: "Verbot für Fußgänger (das Zeichen 259)",
    pron: "fea-bót füa fús-guen-ga (das tsái-jen...)",
    es: "Prohibición de paso para peatones",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Fußgängerverbot",
    plural: "die Verkehrsverbote",
    exampleSentenceDe: "Fußgänger dürfen die Kraftfahrstraße nicht betreten.",
    exampleSentenceEs: "Los peatones no pueden entrar en la vía para automóviles.",
    exampleSentenceDeBlocks: [
      { text: "Fußgänger dürfen", role: "subject", order: 1 },
      { text: "die Schnellstraße", role: "complement", order: 2 },
      { text: "nicht", role: "verb_p1", order: 3 },
      { text: "betreten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 259: circular white disc with red border containing black walking pedestrian pictogram, 3D on white background"
  },
  {
    de: "Verbot für Kraftfahrzeuge (das Zeichen 260)",
    pron: "fea-bót füa kráft-fáar-tsoi-gue (das tsái-jen...)",
    es: "Prohibición conjunta para coches y motos",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Kfz-Verbot",
    plural: "die Kfz-Verbote",
    exampleSentenceDe: "Kraftfahrzeuge sind auf diesem Weg verboten.",
    exampleSentenceEs: "Los vehículos de motor están prohibidos en este camino.",
    exampleSentenceDeBlocks: [
      { text: "Kraftfahrzeuge", role: "subject", order: 1 },
      { text: "sind auf diesem Weg", role: "verb_p1", order: 2 },
      { text: "vollständig", role: "complement", order: 3 },
      { text: "verboten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 260: circular white disc with red border containing black car above black motorcycle, 3D on white background"
  },
  {
    de: "Verbot für Gefahrgut-Kfz (das Zeichen 261)",
    pron: "fea-bót füa gue-féa-li-jen gú-tan (das tsái-jen...)",
    es: "Prohibición para mercancías peligrosas (ADR)",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Gefahrgut",
    plural: "die Gefahrgutverbote",
    exampleSentenceDe: "Lkw mit Gefahrgut dürfen den Tunnel nicht passieren.",
    exampleSentenceEs: "Camiones con mercancías peligrosas no pueden pasar el túnel.",
    exampleSentenceDeBlocks: [
      { text: "Lkw mit Gefahrgut", role: "subject", order: 1 },
      { text: "dürfen den Tunnel", role: "verb_p1", order: 2 },
      { text: "nicht", role: "complement", order: 3 },
      { text: "passieren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 261: circular white disc with red border showing black truck with orange ADR cargo box, 3D on white background"
  },
  {
    de: "Tatsächliche Masse (das Zeichen 262)",
    pron: "tat-zéj-li-je má-se (das tsái-jen...)",
    es: "Límite de peso real máximo en toneladas",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Gewichtslimit",
    plural: "die Gewichtsbeschränkungen",
    exampleSentenceDe: "Die Brücke ist auf 5,5 Tonnen tatsächliche Masse begrenzt.",
    exampleSentenceEs: "El puente está limitado a 5,5 toneladas de peso real.",
    exampleSentenceDeBlocks: [
      { text: "Die Brücke", role: "subject", order: 1 },
      { text: "ist auf 5,5 Tonnen", role: "verb_p1", order: 2 },
      { text: "tatsächliche Masse", role: "complement", order: 3 },
      { text: "begrenzt", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 262: circular white disc with red border containing black text '5,5 t', 3D on white background"
  },
  {
    de: "Tatsächliche Achslast (das Zeichen 263)",
    pron: "tat-zéj-li-je ájs-last (das tsái-jen...)",
    es: "Límite de carga real por eje",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Achslast",
    plural: "die Achslastbeschränkungen",
    exampleSentenceDe: "Fahrzeuge über 8 Tonnen Achslast sind hier verboten.",
    exampleSentenceEs: "Vehículos con más de 8 toneladas por eje están prohibidos aquí.",
    exampleSentenceDeBlocks: [
      { text: "Fahrzeuge über 8 Tonnen Achslast", role: "subject", order: 1 },
      { text: "sind hier", role: "verb_p1", order: 2 },
      { text: "streng", role: "complement", order: 3 },
      { text: "verboten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 263: circular white disc with red border showing vehicle axle wheels with '8 t', 3D on white background"
  },
  {
    de: "Tatsächliche Breite (das Zeichen 264)",
    pron: "tat-zéj-li-je brái-te (das tsái-jen...)",
    es: "Límite de anchura máxima permitida (con espejos)",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Breitenlimit",
    plural: "die Breitenbeschränkungen",
    exampleSentenceDe: "Auf dieser Spur gilt eine maximale Breite von 2 Metern.",
    exampleSentenceEs: "En este carril rige una anchura máxima de 2 metros.",
    exampleSentenceDeBlocks: [
      { text: "Auf dieser Spur", role: "complement", order: 1 },
      { text: "gilt eine maximale Breite", role: "verb_p1", order: 2 },
      { text: "von genau", role: "complement", order: 3 },
      { text: "2 Metern", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 264: circular white disc with red border showing '2 m' with two horizontal inward arrowheads, 3D on white background"
  },
  {
    de: "Tatsächliche Höhe (das Zeichen 265)",
    pron: "tat-zéj-li-je jö-e (das tsái-jen...)",
    es: "Límite de altura máxima permitida",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Höhenlimit",
    plural: "die Höhenbeschränkungen",
    exampleSentenceDe: "Die Durchfahrtshöhe beträgt genau 3,8 Meter.",
    exampleSentenceEs: "La altura de gálibo es de exactamente 3,8 metros.",
    exampleSentenceDeBlocks: [
      { text: "Die Durchfahrtshöhe", role: "subject", order: 1 },
      { text: "beträgt an dieser Brücke", role: "verb_p1", order: 2 },
      { text: "genau", role: "complement", order: 3 },
      { text: "3,8 Meter", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 265: circular white disc with red border showing '3,8 m' with two vertical inward arrowheads, 3D on white background"
  },
  {
    de: "Tatsächliche Länge (das Zeichen 266)",
    pron: "tat-zéj-li-je léng-e (das tsái-jen...)",
    es: "Límite de longitud máxima permitida",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Längenlimit",
    plural: "die Längenbeschränkungen",
    exampleSentenceDe: "Lange Fahrzeuge über 10 Meter dürfen nicht einfahren.",
    exampleSentenceEs: "Vehículos largos de más de 10 metros no pueden entrar.",
    exampleSentenceDeBlocks: [
      { text: "Lange Fahrzeuge über 10 Meter", role: "subject", order: 1 },
      { text: "dürfen hier", role: "verb_p1", order: 2 },
      { text: "nicht", role: "complement", order: 3 },
      { text: "einfahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 266: circular white disc with red border showing truck with '10 m' and length arrows, 3D on white background"
  },
  {
    de: "Verbot der Einfahrt (das Zeichen 267)",
    pron: "fea-bót dea áin-fáat (das tsái-jen...)",
    es: "Entrada prohibida (dirección contraria)",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "StVO § 41",
    plural: "die Einfahrtsverbote",
    exampleSentenceDe: "Hier darf man nicht hineinfahren, falsche Richtung!",
    exampleSentenceEs: "Aquí no se puede entrar, ¡dirección equivocada!",
    exampleSentenceDeBlocks: [
      { text: "Hier darf man", role: "verb_p1", order: 1 },
      { text: "auf keinen Fall", role: "complement", order: 2 },
      { text: "hineinfahren,", role: "verb_p2", order: 3 },
      { text: "falsche Richtung!", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 267: circular solid red disc (RAL 3020) with wide horizontal white rectangular bar across center, 3D on white background"
  },
  {
    de: "Schneeketten vorgeschrieben (das Zeichen 268)",
    pron: "shné-ke-ten foa-gue-shrí-ben (das tsái-jen...)",
    es: "Uso obligatorio de cadenas para nieve",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Kettenpflicht",
    plural: "die Schneeketten",
    exampleSentenceDe: "Auf dieser Passstraße herrscht Schneekettenpflicht.",
    exampleSentenceEs: "En este puerto de montaña rige obligación de cadenas.",
    exampleSentenceDeBlocks: [
      { text: "Auf dieser Passstraße", role: "complement", order: 1 },
      { text: "herrscht ab hier", role: "verb_p1", order: 2 },
      { text: "strikte", role: "complement", order: 3 },
      { text: "Schneekettenpflicht", role: "subject", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 268: circular blue disc (RAL 5005) with white tyre silhouette wrapped in snow chains, 3D on white background"
  },
  {
    de: "Verbot für wassergefährdende Ladung (das Zeichen 269)",
    pron: "fea-bót füa vás-sa-gue-féa-den-de lá-dung (das tsái-jen...)",
    es: "Prohibición para cargas contaminantes del agua",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Wasserschutz",
    plural: "die Verkehrsverbote",
    exampleSentenceDe: "Im Wasserschutzgebiet sind Schadstofftransporte verboten.",
    exampleSentenceEs: "En la zona de protección hídrica están prohibidos transportes contaminantes.",
    exampleSentenceDeBlocks: [
      { text: "Im Wasserschutzgebiet", role: "complement", order: 1 },
      { text: "sind Schadstofftransporte", role: "verb_p1", order: 2 },
      { text: "streng", role: "complement", order: 3 },
      { text: "verboten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 269: circular white disc with red border showing orange truck over blue water waves, 3D on white background"
  },
  {
    de: "Beginn einer Umweltzone (das Zeichen 270.1)",
    pron: "be-gín ái-nea úm-velt-tsó-ne (das tsái-jen...)",
    es: "Inicio de zona de bajas emisiones",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Umweltplakette",
    plural: "die Umweltzonen",
    exampleSentenceDe: "Die Einfahrt ist nur mit grüner Umweltplakette erlaubt.",
    exampleSentenceEs: "La entrada está permitida únicamente con distintivo ecológico verde.",
    exampleSentenceDeBlocks: [
      { text: "Die Einfahrt", role: "subject", order: 1 },
      { text: "ist in die Umweltzone", role: "verb_p1", order: 2 },
      { text: "nur mit grüner Plakette", role: "complement", order: 3 },
      { text: "erlaubt", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 270.1: square white sign with red circle containing text 'Umwelt' and 'ZONE' below, 3D on white background"
  },
  {
    de: "Ende einer Umweltzone (das Zeichen 270.2)",
    pron: "én-de ái-nea úm-velt-tsó-ne (das tsái-jen...)",
    es: "Fin de zona de bajas emisiones",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Ende Umweltzone",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Hier endet die Umweltzone der Stadt.",
    exampleSentenceEs: "Aquí termina la zona de bajas emisiones de la ciudad.",
    exampleSentenceDeBlocks: [
      { text: "Hier", role: "complement", order: 1 },
      { text: "endet", role: "verb_p1", order: 2 },
      { text: "die Umweltzone", role: "subject", order: 3 },
      { text: "der Stadt", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 270.2: square white environmental zone sign crossed diagonally by five grey stripes, 3D on white background"
  },
  {
    de: "Verbot des Wendens (das Zeichen 272)",
    pron: "fea-bót des vén-dens (das tsái-jen...)",
    es: "Prohibido cambiar el sentido (giro en U prohibido)",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Wendeverbot",
    plural: "die Wendeverbote",
    exampleSentenceDe: "Auf dieser Kreuzung darf man nicht wenden.",
    exampleSentenceEs: "En este cruce no se puede dar la vuelta.",
    exampleSentenceDeBlocks: [
      { text: "Auf dieser Kreuzung", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "unter keinen Umständen", role: "complement", order: 3 },
      { text: "wenden", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 272: circular white disc with red border showing black U-turn arrow crossed by red diagonal stripe, 3D on white background"
  },
  {
    de: "Mindestabstand für Lkw (das Zeichen 273)",
    pron: "mín-dest-áp-shtant füa él-ka-vé (das tsái-jen...)",
    es: "Distancia mínima obligatoria entre camiones (>3,5 t)",
    type: "Sustantivo (Neutro)",
    category: "Verkehrsverbote",
    regimen: "Sicherheitsabstand",
    plural: "die Abstandsschilder",
    exampleSentenceDe: "Lkw müssen mindestens 50 Meter Abstand halten.",
    exampleSentenceEs: "Los camiones deben guardar al menos 50 metros de distancia.",
    exampleSentenceDeBlocks: [
      { text: "Lkw", role: "subject", order: 1 },
      { text: "müssen auf der Autobahn", role: "verb_p1", order: 2 },
      { text: "mindestens 50 Meter Abstand", role: "complement", order: 3 },
      { text: "halten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 273: circular white disc with red border showing two black trucks in line with '50 m' text between them, 3D on white background"
  },

  // 7. Velocidad y adelantamiento (Geschwindigkeit & Überholen) [46-57]
  {
    de: "Zulässige Höchstgeschwindigkeit 50 km/h (das Zeichen 274)",
    pron: "tsú-lé-si-gue jöjts-gue-shvín-dij-kait (das tsái-jen...)",
    es: "Límite de velocidad máxima (50 km/h)",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "StVO § 3",
    plural: "die Höchstgeschwindigkeiten",
    exampleSentenceDe: "Die Höchstgeschwindigkeit beträgt hier 50 km/h.",
    exampleSentenceEs: "La velocidad máxima es aquí de 50 km/h.",
    exampleSentenceDeBlocks: [
      { text: "Die Höchstgeschwindigkeit", role: "subject", order: 1 },
      { text: "beträgt hier", role: "verb_p1", order: 2 },
      { text: "genau", role: "complement", order: 3 },
      { text: "50 km/h", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 274-50: circular white disc with red border containing bold black number '50' in German DIN 1451 font, 3D on white background"
  },
  {
    de: "Beginn einer Tempo 30-Zone (das Zeichen 274.1)",
    pron: "be-gín ái-nea tém-po drái-sij tsó-ne (das tsái-jen...)",
    es: "Inicio de zona 30 km/h",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Tempo 30",
    plural: "die Tempo 30-Zonen",
    exampleSentenceDe: "In der 30er-Zone fahren wir besonders vorsichtig.",
    exampleSentenceEs: "En la zona 30 conducimos con especial cuidado.",
    exampleSentenceDeBlocks: [
      { text: "In der 30er-Zone", role: "complement", order: 1 },
      { text: "fahren wir", role: "verb_p1", order: 2 },
      { text: "stets", role: "complement", order: 3 },
      { text: "besonders vorsichtig", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 274.1: square white sign with black border showing red '30' sign and black word 'ZONE' below, 3D on white background"
  },
  {
    de: "Ende einer Tempo 30-Zone (das Zeichen 274.2)",
    pron: "én-de ái-nea tém-po drái-sij tsó-ne (das tsái-jen...)",
    es: "Fin de zona 30 km/h",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Aufhebung Zone 30",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Die Tempo 30-Zone endet an diesem Schild.",
    exampleSentenceEs: "La zona de 30 km/h termina en esta señal.",
    exampleSentenceDeBlocks: [
      { text: "Die Tempo 30-Zone", role: "subject", order: 1 },
      { text: "endet", role: "verb_p1", order: 2 },
      { text: "an diesem Schild", role: "complement", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 274.2: square white sign with grey zone 30 crossed diagonally by five parallel black stripes, 3D on white background"
  },
  {
    de: "Vorgeschriebene Mindestgeschwindigkeit (das Zeichen 275)",
    pron: "foa-gue-shrí-be-ne mín-dest-gue-shvín-dij-kait (das tsái-jen...)",
    es: "Velocidad mínima obligatoria (ej. 30 km/h)",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Mindesttempo",
    plural: "die Mindestgeschwindigkeiten",
    exampleSentenceDe: "Sie dürfen nicht langsamer als 30 km/h fahren.",
    exampleSentenceEs: "No puede conducir a menos de 30 km/h.",
    exampleSentenceDeBlocks: [
      { text: "Sie dürfen hier", role: "subject", order: 1 },
      { text: "nicht langsamer", role: "verb_p1", order: 2 },
      { text: "als 30 km/h", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 275: circular blue disc (RAL 5005) with bold white number '30' in DIN 1451 font, 3D on white background"
  },
  {
    de: "Ende der vorgeschriebenen Mindestgeschwindigkeit (das Zeichen 279)",
    pron: "én-de dea mín-dest-gue-shvín-dij-kait (das tsái-jen...)",
    es: "Fin de la velocidad mínima obligatoria",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Ende Mindesttempo",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Das Mindesttempo ist ab hier aufgehoben.",
    exampleSentenceEs: "La velocidad mínima queda anulada a partir de aquí.",
    exampleSentenceDeBlocks: [
      { text: "Das Mindesttempo", role: "subject", order: 1 },
      { text: "ist ab hier", role: "verb_p1", order: 2 },
      { text: "wieder", role: "complement", order: 3 },
      { text: "aufgehoben", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 279: circular blue disc with white number '30' crossed diagonally by three red stripes, 3D on white background"
  },
  {
    de: "Überholverbot für Kraftfahrzeuge aller Art (das Zeichen 276)",
    pron: "ú-ba-jól-fea-bót füa kráft-fáar-tsoi-gue (das tsái-jen...)",
    es: "Prohibición de adelantar vehículos de más de 2 ruedas",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "StVO § 41",
    plural: "die Überholverbote",
    exampleSentenceDe: "Überholen ist auf dieser Strecke streng verboten.",
    exampleSentenceEs: "Adelantar está estrictamente prohibido en este tramo.",
    exampleSentenceDeBlocks: [
      { text: "Überholen", role: "subject", order: 1 },
      { text: "ist auf dieser Strecke", role: "verb_p1", order: 2 },
      { text: "streng", role: "complement", order: 3 },
      { text: "verboten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 276: circular white disc with red border showing black car on right and overtaking red car on left, 3D on white background"
  },
  {
    de: "Überholverbot für Lkw über 3,5 t (das Zeichen 277)",
    pron: "ú-ba-jól-fea-bót füa él-ka-vé (das tsái-jen...)",
    es: "Prohibición de adelantar para camiones pesados",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Lkw-Überholverbot",
    plural: "die Lkw-Überholverbote",
    exampleSentenceDe: "Lkw über 3,5 Tonnen dürfen hier nicht überholen.",
    exampleSentenceEs: "Camiones de más de 3,5 toneladas no pueden adelantar aquí.",
    exampleSentenceDeBlocks: [
      { text: "Lkw über 3,5 Tonnen", role: "subject", order: 1 },
      { text: "dürfen hier", role: "verb_p1", order: 2 },
      { text: "nicht", role: "complement", order: 3 },
      { text: "überholen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 277: circular white disc with red border showing black car on right and red overtaking truck on left, 3D on white background"
  },
  {
    de: "Verbot des Überholens von einspurigen Fahrzeugen (das Zeichen 277.1)",
    pron: "fea-bót des ú-ba-jó-lens fon áin-shpu-ri-guen fáar-tsoi-guen (das tsái-jen...)",
    es: "Prohibido adelantar a bicis y motos",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Zweiradschutz",
    plural: "die Überholverbote",
    exampleSentenceDe: "Autos dürfen an dieser Stelle keine Fahrräder überholen.",
    exampleSentenceEs: "Los coches no pueden adelantar bicicletas en este punto.",
    exampleSentenceDeBlocks: [
      { text: "Autos dürfen", role: "subject", order: 1 },
      { text: "an dieser Stelle", role: "complement", order: 2 },
      { text: "keine Fahrräder", role: "verb_p1", order: 3 },
      { text: "überholen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 277.1: circular white disc with red border showing red car on left overtaking black bicycle and motorcycle, 3D on white background"
  },
  {
    de: "Ende des Überholverbotes (das Zeichen 280)",
    pron: "én-de des ú-ba-jól-fea-bó-tes (das tsái-jen...)",
    es: "Fin de prohibición de adelantamiento general",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Freies Überholen",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Das Überholverbot ist ab hier aufgehoben.",
    exampleSentenceEs: "La prohibición de adelantar queda anulada desde aquí.",
    exampleSentenceDeBlocks: [
      { text: "Das Überholverbot", role: "subject", order: 1 },
      { text: "ist ab diesem Schild", role: "verb_p1", order: 2 },
      { text: "wieder", role: "complement", order: 3 },
      { text: "aufgehoben", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 280: circular white disc with thin black rim showing two grey cars crossed by five diagonal black stripes, 3D on white background"
  },
  {
    de: "Ende des Überholverbotes für Lkw (das Zeichen 281)",
    pron: "én-de des ú-ba-jól-fea-bó-tes füa él-ka-vé (das tsái-jen...)",
    es: "Fin de prohibición de adelantar para camiones",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Ende Lkw-Verbot",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Lkw dürfen ab diesem Schild wieder überholen.",
    exampleSentenceEs: "Los camiones pueden adelantar de nuevo a partir de esta señal.",
    exampleSentenceDeBlocks: [
      { text: "Lkw dürfen", role: "subject", order: 1 },
      { text: "ab diesem Schild", role: "complement", order: 2 },
      { text: "wieder", role: "verb_p1", order: 3 },
      { text: "überholen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 281: circular white disc with thin black rim showing grey car and grey truck crossed by five black stripes, 3D on white background"
  },
  {
    de: "Ende des Überholverbotes von einspurigen Fahrzeugen (das Zeichen 281.1)",
    pron: "én-de des ú-ba-jól-fea-bó-tes fon áin-shpu-rij (das tsái-jen...)",
    es: "Fin de prohibición de adelantar bicis y motos",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Ende Zweiradschutz",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Radfahrer dürfen nun wieder vorsichtig überholt werden.",
    exampleSentenceEs: "Los ciclistas pueden ser adelantados de nuevo con cuidado.",
    exampleSentenceDeBlocks: [
      { text: "Radfahrer dürfen nun", role: "subject", order: 1 },
      { text: "wieder vorsichtig", role: "complement", order: 2 },
      { text: "überholt werden", role: "verb_p1", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 281.1: circular white disc with thin black rim showing grey car and grey bicycle crossed by five black stripes, 3D on white background"
  },
  {
    de: "Ende sämtlicher Streckenverbote (das Zeichen 282)",
    pron: "én-de zémt-li-jea shtré-ken-fea-bó-te (das tsái-jen...)",
    es: "Fin de todas las restricciones de velocidad y adelantamiento",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit & Überholen",
    regimen: "Freie Fahrt",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Alle vorherigen Tempolimits und Überholverbote enden hier.",
    exampleSentenceEs: "Todos los límites de velocidad y prohibiciones de adelantar terminan aquí.",
    exampleSentenceDeBlocks: [
      { text: "Alle Tempolimits", role: "subject", order: 1 },
      { text: "und Überholverbote", role: "complement", order: 2 },
      { text: "enden", role: "verb_p1", order: 3 },
      { text: "hier", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 282: circular white disc with thin black rim crossed diagonally by five parallel solid black stripes, 3D on white background"
  },

  // 8. Prohibiciones de parada y estacionamiento (Halte- & Parkverbote) [58-61]
  {
    de: "Absolutes Haltverbot (das Zeichen 283)",
    pron: "ap-zo-lú-tes jált-fea-bót (das tsái-jen...)",
    es: "Prohibición absoluta de parada y estacionamiento",
    type: "Sustantivo (Neutro)",
    category: "Halte- & Parkverbote",
    regimen: "Kein Halten",
    plural: "die absoluten Haltverbote",
    exampleSentenceDe: "Im absoluten Haltverbot darf man keine Sekunde stehen.",
    exampleSentenceEs: "En la parada prohibida absoluta no se puede parar ni un segundo.",
    exampleSentenceDeBlocks: [
      { text: "Im absoluten Haltverbot", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "keine Sekunde", role: "complement", order: 3 },
      { text: "stehen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 283: circular blue sign with thick red border (RAL 3020) and a red cross (X) with two intersecting diagonal bars, 3D on white background"
  },
  {
    de: "Eingeschränktes Haltverbot (das Zeichen 286)",
    pron: "áin-gue-shrénk-tes jált-fea-bót (das tsái-jen...)",
    es: "Estacionamiento prohibido (máx. 3 min de parada)",
    type: "Sustantivo (Neutro)",
    category: "Halte- & Parkverbote",
    regimen: "Max. 3 Min.",
    plural: "die eingeschränkten Haltverbote",
    exampleSentenceDe: "Man darf maximal drei Minuten zum Be- und Entladen halten.",
    exampleSentenceEs: "Se puede parar como máximo tres minutos para cargar y descargar.",
    exampleSentenceDeBlocks: [
      { text: "Man darf", role: "subject", order: 1 },
      { text: "maximal drei Minuten", role: "complement", order: 2 },
      { text: "zum Be- und Entladen", role: "complement", order: 3 },
      { text: "halten", role: "verb_p1", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 286: circular blue sign with thick red border (RAL 3020) and a single red diagonal stripe from top-left to bottom-right, 3D on white background"
  },
  {
    de: "Beginn eines eingeschränkten Haltverbotes für eine Zone (das Zeichen 290.1)",
    pron: "be-gín ái-nes áin-gue-shrénk-ten jált-fea-bó-tes füa ái-ne tsó-ne (das tsái-jen...)",
    es: "Inicio de zona de estacionamiento restringido",
    type: "Sustantivo (Neutro)",
    category: "Halte- & Parkverbote",
    regimen: "Parkverbotszone",
    plural: "die Parkverbotszonen",
    exampleSentenceDe: "In der gesamten Zone darf man nur mit Parkschein parken.",
    exampleSentenceEs: "En toda la zona solo se puede aparcar con tique de estacionamiento.",
    exampleSentenceDeBlocks: [
      { text: "In der gesamten Zone", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "nur mit Parkschein", role: "complement", order: 3 },
      { text: "parken", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 290.1: square white sign with black border showing circular blue sign with red diagonal slash and bold black word 'ZONE' below, 3D on white background"
  },
  {
    de: "Ende eines eingeschränkten Haltverbotes für eine Zone (das Zeichen 290.2)",
    pron: "én-de ái-nes áin-gue-shrénk-ten jált-fea-bó-tes füa ái-ne tsó-ne (das tsái-jen...)",
    es: "Fin de zona de estacionamiento restringido",
    type: "Sustantivo (Neutro)",
    category: "Halte- & Parkverbote",
    regimen: "Ende Parkverbotszone",
    plural: "die Verkehrszeichen",
    exampleSentenceDe: "Die Parkverbotszone endet an dieser Stelle.",
    exampleSentenceEs: "La zona de estacionamiento restringido termina en este punto.",
    exampleSentenceDeBlocks: [
      { text: "Die Parkverbotszone", role: "subject", order: 1 },
      { text: "endet hier", role: "verb_p1", order: 2 },
      { text: "an dieser Stelle", role: "complement", order: 3 }
    ],
    en: "Official German traffic sign StVO Zeichen 290.2: square white sign with grey parking prohibition zone crossed diagonally by five parallel black stripes, 3D on white background"
  },

  // 9. Marcas viales en la calzada (Fahrbahnmarkierungen) [62-69]
  {
    de: "Fußgängerüberweg (das Zeichen 293)",
    pron: "fús-guen-ga-ú-ba-vek (das tsái-jen tsvei-hún-dert-drái-unt-noin-tsij)",
    es: "Paso de peatones reglamentario (Zebrastreifen)",
    type: "Sustantivo (Neutro)",
    category: "Fahrbahnmarkierungen",
    regimen: "Vorrang Fußgänger",
    plural: "die Fußgängerüberwege",
    exampleSentenceDe: "Am Zebrastreifen haben Fußgänger immer Vorrang.",
    exampleSentenceEs: "En el paso de peatones los peatones tienen siempre preferencia.",
    exampleSentenceDeBlocks: [
      { text: "Am Zebrastreifen", role: "complement", order: 1 },
      { text: "haben Fußgänger", role: "verb_p1", order: 2 },
      { text: "stets", role: "complement", order: 3 },
      { text: "Vorrang", role: "complement", order: 4 }
    ],
    en: "Official German road marking StVO Zeichen 293: 3D perspective of dark asphalt road surface with crisp parallel white zebra crossing stripes (Zebrastreifen), studio lighting on pure white background"
  },
  {
    de: "Haltlinie (das Zeichen 294)",
    pron: "jált-lí-ni-e (das tsái-jen tsvei-hún-dert-fía-unt-noin-tsij)",
    es: "Línea continua de detención obligatoria",
    type: "Sustantivo (Fem)",
    category: "Fahrbahnmarkierungen",
    regimen: "Anhaltepflicht",
    plural: "die Haltlinien",
    exampleSentenceDe: "Halten Sie Ihr Fahrzeug direkt vor der Haltlinie an.",
    exampleSentenceEs: "Detenga su vehículo justo delante de la línea de detención.",
    exampleSentenceDeBlocks: [
      { text: "Halten Sie", role: "verb_p1", order: 1 },
      { text: "Ihr Fahrzeug", role: "subject", order: 2 },
      { text: "direkt vor der Haltlinie", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    en: "Official German road marking StVO Zeichen 294: 3D perspective of dark asphalt road with thick solid white transverse stop line (Haltlinie) painted across the lane, white background"
  },
  {
    de: "Fahrstreifenbegrenzung (das Zeichen 295)",
    pron: "fáar-shtrái-fen-be-grén-tsung (das tsái-jen tsvei-hún-dert-fúnf-unt-noin-tsij)",
    es: "Línea continua longitudinal (prohibido cruzarla)",
    type: "Sustantivo (Fem)",
    category: "Fahrbahnmarkierungen",
    regimen: "Überfahrverbot",
    plural: "die Fahrstreifenbegrenzungen",
    exampleSentenceDe: "Die durchgezogene Linie darf nicht überfahren werden.",
    exampleSentenceEs: "La línea continua no se puede cruzar.",
    exampleSentenceDeBlocks: [
      { text: "Die durchgezogene Linie", role: "subject", order: 1 },
      { text: "darf unter keinen Umständen", role: "verb_p1", order: 2 },
      { text: "überfahren werden", role: "verb_p2", order: 3 }
    ],
    en: "Official German road marking StVO Zeichen 295: 3D perspective of asphalt roadway with solid continuous straight white line separating traffic lanes, pure white background"
  },
  {
    de: "Einseitige Fahrstreifenbegrenzung (das Zeichen 296)",
    pron: "áin-zái-ti-gue fáar-shtrái-fen-be-grén-tsung (das tsái-jen...)",
    es: "Línea mixta: continua con discontinua adyacente",
    type: "Sustantivo (Fem)",
    category: "Fahrbahnmarkierungen",
    regimen: "Einseitiges Überholen",
    plural: "die einseitigen Fahrstreifenbegrenzungen",
    exampleSentenceDe: "Wer neben der gestrichelten Linie fährt, darf überholen.",
    exampleSentenceEs: "Quien circula junto a la línea discontinua puede adelantar.",
    exampleSentenceDeBlocks: [
      { text: "Wer neben der gestrichelten Linie fährt,", role: "subject", order: 1 },
      { text: "darf das Fahrzeug", role: "verb_p1", order: 2 },
      { text: "überholen", role: "verb_p2", order: 3 }
    ],
    en: "Official German road marking StVO Zeichen 296: 3D perspective of asphalt road showing double parallel lines: one solid continuous white line and one dashed broken white line side by side, white background"
  },
  {
    de: "Pfeilmarkierungen (das Zeichen 297)",
    pron: "pfáil-mar-kí-run-guen (das tsái-jen tsvei-hún-dert-zí-ben-unt-noin-tsij)",
    es: "Flechas de preselección de carril y giro en la calzada",
    type: "Sustantivo (Plural)",
    category: "Fahrbahnmarkierungen",
    regimen: "Spurwahlgebot",
    plural: "die Pfeilmarkierungen",
    exampleSentenceDe: "Die Pfeile auf der Fahrbahn zeigen die vorgeschriebene Spur.",
    exampleSentenceEs: "Las flechas en la calzada indican el carril obligatorio.",
    exampleSentenceDeBlocks: [
      { text: "Die Pfeile auf der Fahrbahn", role: "subject", order: 1 },
      { text: "zeigen", role: "verb_p1", order: 2 },
      { text: "die vorgeschriebene Spur", role: "complement", order: 3 }
    ],
    en: "Official German road marking StVO Zeichen 297: 3D perspective of asphalt lane with painted white directional arrows: straight and right curving, clean white background"
  },
  {
    de: "Vorankündigungspfeil (das Zeichen 297.1)",
    pron: "fóa-an-kún-di-gungs-pfail (das tsái-jen...)",
    es: "Flecha curva de preaviso de fin de carril",
    type: "Sustantivo (Masc)",
    category: "Fahrbahnmarkierungen",
    regimen: "Räumungsgebot",
    plural: "die Vorankündigungspfeile",
    exampleSentenceDe: "Der Vorankündigungspfeil kündigt das Ende des Fahrstreifens an.",
    exampleSentenceEs: "La flecha de preaviso anuncia el fin del carril.",
    exampleSentenceDeBlocks: [
      { text: "Der Vorankündigungspfeil", role: "subject", order: 1 },
      { text: "kündigt das Ende", role: "verb_p1", order: 2 },
      { text: "des Fahrstreifens", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    en: "Official German road marking StVO Zeichen 297.1: 3D perspective of asphalt road with painted curved white lane reduction arrow warning to merge right, clean white background"
  },
  {
    de: "Sperrfläche (das Zeichen 298)",
    pron: "shpéa-flé-je (das tsái-jen tsvei-hún-dert-ajt-unt-noin-tsij)",
    es: "Zona excluida al tráfico con cebreado diagonal",
    type: "Sustantivo (Fem)",
    category: "Fahrbahnmarkierungen",
    regimen: "Befahrungsverbot",
    plural: "die Sperrflächen",
    exampleSentenceDe: "Das Befahren der Sperrfläche ist streng verboten.",
    exampleSentenceEs: "Circular sobre la zona de exclusión está estrictamente prohibido.",
    exampleSentenceDeBlocks: [
      { text: "Das Befahren der Sperrfläche", role: "subject", order: 1 },
      { text: "ist im Straßenverkehr", role: "verb_p1", order: 2 },
      { text: "strengstens", role: "complement", order: 3 },
      { text: "verboten", role: "verb_p2", order: 4 }
    ],
    en: "Official German road marking StVO Zeichen 298: 3D perspective of dark asphalt road with diagonal white chevron hatch markings (Sperrfläche) bounded by solid white border line, white background"
  },
  {
    de: "Grenzmarkierung für Halt- oder Parkverbote (das Zeichen 299)",
    pron: "grénts-mar-kí-rung füa jált- ó-da párk-fea-bó-te (das tsái-jen...)",
    es: "Línea en zigzag delimitadora de prohibición de estacionar",
    type: "Sustantivo (Fem)",
    category: "Fahrbahnmarkierungen",
    regimen: "Parkverbot",
    plural: "die Grenzmarkierungen",
    exampleSentenceDe: "Auf der Zickzack-Linie ist das Parken verboten.",
    exampleSentenceEs: "En la línea en zigzag está prohibido aparcar.",
    exampleSentenceDeBlocks: [
      { text: "Auf der Zickzack-Linie", role: "complement", order: 1 },
      { text: "ist das Parken", role: "verb_p1", order: 2 },
      { text: "grundsätzlich", role: "complement", order: 3 },
      { text: "verboten", role: "verb_p2", order: 4 }
    ],
    en: "Official German road marking StVO Zeichen 299: 3D perspective of asphalt street pavement with painted white zigzag road marking (Zickzacklinie) along the curb, clean white background"
  }
];

// Helper para ID seguro en Base64 URL-safe
const getSafeId = (str) => {
  return Buffer.from(encodeURIComponent(str)).toString('base64').replace(/[\/+=]/g, '_');
};

console.log(`\n=============================================================`);
console.log(`ACTUALIZACIÓN COMPLETA DE KAPITEL 21 (StVO) — 69 ENTRADAS`);
console.log(`=============================================================`);

if (signs69.length !== 69) {
  console.error(`❌ ERROR CRÍTICO: Se esperaban 69 señales y se detectaron ${signs69.length}`);
  process.exit(1);
}

// -------------------------------------------------------------
// FASE 1: INYECCIÓN Y ACTUALIZACIÓN EN src/data/chapters.jsx
// -------------------------------------------------------------
console.log(`\n[FASE 1] Inyectando catálogo completo de 69 normas en src/data/chapters.jsx...`);
const chaptersPath = path.join(__dirname, '..', 'src', 'data', 'chapters.jsx');
let chaptersContent = fs.readFileSync(chaptersPath, 'utf8');

// 1.1 Asegurar import de ShieldAlert en lucide-react
if (!chaptersContent.includes('ShieldAlert')) {
  chaptersContent = chaptersContent.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];/,
    (match, p1) => `import { ${p1.trim()}, ShieldAlert } from 'lucide-react';`
  );
  console.log(`  ✓ Icono ShieldAlert asegurado en imports`);
}

// 1.2 Formatear el objeto de Capítulo 21
const kapitel21Obj = {
  id: 21,
  title: "Kapitel 21: Verkehrszeichen & Vorschriften (StVO)",
  icon: "__SHIELD_ALERT_ICON__",
  emoji: "🛑",
  categoryFilter: [
    "Todas",
    "Warte- & Haltegebote",
    "Fahrtrichtungen",
    "Sonderwege & Spuren",
    "Verkehrsverbote",
    "Geschwindigkeit & Überholen",
    "Halte- & Parkverbote",
    "Fahrbahnmarkierungen"
  ],
  words: signs69
};

let kapitel21Str = JSON.stringify(kapitel21Obj, null, 2);
kapitel21Str = kapitel21Str.replace('"__SHIELD_ALERT_ICON__"', '<ShieldAlert size={20} />');

// 1.3 Reemplazar cualquier contenido entre el final de Kapitel 20 y el cierre de rawChapters
const k20Marker = '"cute 3D isometric heavy-duty red plastic construction bucket pail with metal handle"';
const k20MarkerIdx = chaptersContent.indexOf(k20Marker);
if (k20MarkerIdx === -1) {
  console.error(`❌ ERROR: No se encontró el final de Kapitel 20 en chapters.jsx`);
  process.exit(1);
}

// Encontrar el cierre de objeto de la última palabra y el cierre del objeto de Kapitel 20
const k20CloseBraceIdx = chaptersContent.indexOf('\n  ]\n}', k20MarkerIdx);
if (k20CloseBraceIdx === -1) {
  console.error(`❌ ERROR: No se encontró el cierre de Kapitel 20 en chapters.jsx`);
  process.exit(1);
}
const k20EndPos = k20CloseBraceIdx + '\n  ]\n}'.length;

const exportMarker = '];\n\nexport const chapters =';
const exportMarkerIdx = chaptersContent.indexOf(exportMarker);
if (exportMarkerIdx === -1) {
  console.error(`❌ ERROR: No se encontró el cierre de rawChapters en chapters.jsx`);
  process.exit(1);
}

// Reemplazar todo entre el final de Kapitel 20 y el cierre de rawChapters
chaptersContent = chaptersContent.substring(0, k20EndPos) + ',\n' + kapitel21Str + '\n' + chaptersContent.substring(exportMarkerIdx);
fs.writeFileSync(chaptersPath, chaptersContent, 'utf8');
console.log(`  ✓ Kapitel 21 inyectado limpiamente (69 normas exactas) en src/data/chapters.jsx`);

// -------------------------------------------------------------
// FASE 2: SINCRONIZACIÓN EN vocabulario_completo.json
// -------------------------------------------------------------
console.log(`\n[FASE 2] Sincronizando vocabulario_completo.json...`);
const vocabPath = path.join(__dirname, '..', 'vocabulario_completo.json');
let vocabList = [];
if (fs.existsSync(vocabPath)) {
  vocabList = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
}

// Remover identificadores de la versión anterior que empezaban por "das Zeichen"
const oldPrefixes = [
  "das Zeichen 209", "das Zeichen 211", "das Zeichen 214", "das Zeichen 215",
  "das Zeichen 220", "das Zeichen 222", "das Zeichen 237", "das Zeichen 238",
  "das Zeichen 239", "das Zeichen 240", "das Zeichen 241", "das Zeichen 242",
  "das Zeichen 244", "das Zeichen 245", "das Zeichen 275", "das Zeichen 279",
  "das Zeichen 268", "das Zeichen 250", "das Zeichen 267", "das Zeichen 274",
  "das Zeichen 276", "das Zeichen 278", "das Zeichen 282", "das Zeichen 283",
  "das Zeichen 286"
];

const initialCount = vocabList.length;
vocabList = vocabList.filter(item => {
  return !oldPrefixes.some(prefix => item.word.startsWith(prefix));
});
const purgedCount = initialCount - vocabList.length;
if (purgedCount > 0) {
  console.log(`  ✓ Depuradas ${purgedCount} entradas anteriores de formato obsoleto.`);
}

let addedCount = 0;
let updatedCount = 0;

signs69.forEach(s => {
  const safeId = getSafeId(s.de);
  const vocabItem = {
    id: safeId,
    word: s.de,
    exampleSentenceDe: s.exampleSentenceDe,
    exampleSentenceEs: s.exampleSentenceEs,
    exampleSentenceDeBlocks: s.exampleSentenceDeBlocks
  };

  const existingIdx = vocabList.findIndex(v => v.id === safeId);
  if (existingIdx !== -1) {
    vocabList[existingIdx] = vocabItem;
    updatedCount++;
  } else {
    vocabList.push(vocabItem);
    addedCount++;
  }
});

fs.writeFileSync(vocabPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`  ✓ vocabulario_completo.json sincronizado: ${addedCount} añadidos, ${updatedCount} actualizados.`);
console.log(`  ✓ Total entradas en vocabulario_completo.json: ${vocabList.length}`);

// -------------------------------------------------------------
// FASE 3: GENERACIÓN DE TABLA MAESTRA docs/kapitel_21_verkehrszeichen_tabelle.md
// -------------------------------------------------------------
console.log(`\n[FASE 3] Generando docs/kapitel_21_verkehrszeichen_tabelle.md...`);
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

let mdContent = `# 🛑 Kapitel 21: Verkehrszeichen & Vorschriften (StVO)
### StVO Anlage 2 — Catálogo Oficial de Señales Reglamentarias & Marcas Viales (A1 / Fahrschule)

> **Total de Entradas Normativas:** 69 normas reglamentarias y marcas viales extraídas de la StVO (Anlage 2) con nomenclatura reformada \`Nombre Legal (das Zeichen Código)\`, fonética alemana adaptada al español, traducción técnica de tráfico, artículo reglamentario / régimen y oraciones de conducción real en Alemania.

| # | Deutsch mit Artikel | Lautschrift (Pronunciación) | Spanisch (Traducción de Tráfico) | Wortart | Kategorie | Spezifikation / Norm | Beispielsatz Deutsch | Beispielsatz Spanisch |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

signs69.forEach((s, idx) => {
  const num = idx + 1;
  const de = s.de.replace(/\|/g, '\\|');
  const pron = s.pron.replace(/\|/g, '\\|');
  const es = s.es.replace(/\|/g, '\\|');
  const type = s.type.replace(/\|/g, '\\|');
  const cat = s.category.replace(/\|/g, '\\|');
  const reg = (s.regimen || '-').replace(/\|/g, '\\|');
  const deEx = s.exampleSentenceDe.replace(/\|/g, '\\|');
  const esEx = s.exampleSentenceEs.replace(/\|/g, '\\|');

  mdContent += `| ${num} | **${de}** | *${pron}* | ${es} | \`${type}\` | ${cat} | ${reg} | ${deEx} | ${esEx} |\n`;
});

const docPath = path.join(docsDir, 'kapitel_21_verkehrszeichen_tabelle.md');
fs.writeFileSync(docPath, mdContent, 'utf8');
console.log(`  ✓ Archivo Markdown generado con 69 filas en: docs/kapitel_21_verkehrszeichen_tabelle.md`);

// -------------------------------------------------------------
// FASE 4: SINCRONIZACIÓN DE TOTALES EN Profile.jsx Y App.jsx
// Total = 1,195 (Caps 1-19) + 125 (Cap 20) + 69 (Cap 21) = 1,389
// -------------------------------------------------------------
console.log(`\n[FASE 4] Actualizando métricas de conteo a 1389 palabras...`);
const profilePath = path.join(__dirname, '..', 'src', 'components', 'Profile.jsx');
if (fs.existsSync(profilePath)) {
  let profileContent = fs.readFileSync(profilePath, 'utf8');
  profileContent = profileContent.replace(/totalCardsCount\s*=\s*\d+/g, 'totalCardsCount = 1389');
  fs.writeFileSync(profilePath, profileContent, 'utf8');
  console.log(`  ✓ Profile.jsx actualizado (default totalCardsCount = 1389)`);
}

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  appContent = appContent.replace(/\|\|\s*\d+/g, (match) => {
    // Solo si es un fallback de tarjetas de 13xx
    if (/13\d\d/.test(match)) return '|| 1389';
    return match;
  });
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log(`  ✓ App.jsx actualizado con totalCardsCount dinámico (1389)`);
}

console.log(`\n🎉 ACTUALIZACIÓN COMPLETA DE KAPITEL 21 EJECUTADA CON ÉXITO.`);
