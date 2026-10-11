const fs = require('fs');
const path = require('path');

// =========================================================================
// 32 TÉRMINOS TÉCNICOS Y SEÑALES DEL StVO (ANLAGE 2)
// =========================================================================
const signs32 = [
  // 1. Vorgeschriebene Fahrtrichtungen (Azules) [1-12]
  {
    de: "das Zeichen 209-10 (Vorgeschriebene Fahrtrichtung rechts)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung rejts",
    es: "Dirección obligatoria a la derecha",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41 Abs. 1",
    exampleSentenceDe: "An dieser Kreuzung müssen wir rechts abbiegen.",
    exampleSentenceEs: "En este cruce tenemos que girar a la derecha.",
    exampleSentenceDeBlocks: [
      { text: "An dieser Kreuzung", role: "complement", order: 1 },
      { text: "müssen wir", role: "verb_p1", order: 2 },
      { text: "nach rechts", role: "complement", order: 3 },
      { text: "abbiegen", role: "verb_p2", order: 4 }
    ],
    en: "An ultra-crisp, perfectly accurate 3D isometric representation of official German traffic sign StVO Zeichen 209-10: a circular deep signal blue (RAL 5005) disc with a clean white directional arrow pointing right, thin white border, on a metallic pole, isolated on pure white background (#FFFFFF), exact legal German design, zero extra text"
  },
  {
    de: "das Zeichen 209-20 (Vorgeschriebene Fahrtrichtung links)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung links",
    es: "Dirección obligatoria a la izquierda",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41 Abs. 1",
    exampleSentenceDe: "Das blaue Schild schreibt vor, dass wir links abbiegen.",
    exampleSentenceEs: "La señal azul prescribe que giremos a la izquierda.",
    exampleSentenceDeBlocks: [
      { text: "Das blaue Schild", role: "subject", order: 1 },
      { text: "schreibt vor,", role: "verb_p1", order: 2 },
      { text: "dass wir", role: "complement", order: 3 },
      { text: "links abbiegen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 209-20: circular blue disc with white directional arrow pointing left, white border, realistic 3D isometric signpost, pure white background (#FFFFFF), zero text"
  },
  {
    de: "das Zeichen 209-30 (Vorgeschriebene Fahrtrichtung geradeaus)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung gue-rá-de-aus",
    es: "Dirección obligatoria de frente (seguir recto)",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41 Abs. 1",
    exampleSentenceDe: "Hier darf man nicht abbiegen, sondern nur geradeaus fahren.",
    exampleSentenceEs: "Aquí no se puede girar, sino únicamente seguir recto.",
    exampleSentenceDeBlocks: [
      { text: "Hier", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "nur geradeaus", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 209-30: circular blue disc with vertical white arrow pointing straight up, white rim, 3D isometric render on clean white background (#FFFFFF)"
  },
  {
    de: "das Zeichen 209-31 (Vorgeschriebene Fahrtrichtung geradeaus oder rechts)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung gue-rá-de-aus o-da rejts",
    es: "Direcciones permitidas: recto o a la derecha",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41 Abs. 1",
    exampleSentenceDe: "Sie dürfen hier geradeaus fahren oder nach rechts abbiegen.",
    exampleSentenceEs: "Usted puede seguir aquí recto o girar a la derecha.",
    exampleSentenceDeBlocks: [
      { text: "Sie dürfen", role: "subject", order: 1 },
      { text: "geradeaus fahren", role: "verb_p1", order: 2 },
      { text: "oder nach rechts", role: "complement", order: 3 },
      { text: "abbiegen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 209-31: circular blue disc with bifurcated white arrow pointing straight and right, white border, 3D isolated on white background"
  },
  {
    de: "das Zeichen 209-32 (Vorgeschriebene Fahrtrichtung geradeaus oder links)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung gue-rá-de-aus o-da links",
    es: "Direcciones permitidas: recto o a la izquierda",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41 Abs. 1",
    exampleSentenceDe: "Folgen Sie der Spur geradeaus oder biegen Sie links ab.",
    exampleSentenceEs: "Siga el carril de frente o gire a la izquierda.",
    exampleSentenceDeBlocks: [
      { text: "Folgen Sie", role: "verb_p1", order: 1 },
      { text: "der Spur", role: "complement", order: 2 },
      { text: "geradeaus oder", role: "complement", order: 3 },
      { text: "links ab", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 209-32: circular blue disc with white branched arrow pointing straight and left, 3D clean isolated on pure white background"
  },
  {
    de: "das Zeichen 209-33 (Vorgeschriebene Fahrtrichtung rechts oder links)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung rejts o-da links",
    es: "Direcciones permitidas: derecha o izquierda (prohibido recto)",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41 Abs. 1",
    exampleSentenceDe: "Geradeaus ist gesperrt, Sie müssen rechts oder links fahren.",
    exampleSentenceEs: "De frente está cerrado; debe ir a la derecha o a la izquierda.",
    exampleSentenceDeBlocks: [
      { text: "Geradeaus ist gesperrt,", role: "complement", order: 1 },
      { text: "Sie müssen", role: "subject", order: 2 },
      { text: "rechts oder links", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 209-33: circular blue disc with two white curved arrows pointing left and right, white rim, 3D on white background"
  },
  {
    de: "das Zeichen 211 (Vorgeschriebene Fahrtrichtung hier rechts)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung jía rejts",
    es: "Giro obligatorio aquí a la derecha (antes de la señal)",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41",
    exampleSentenceDe: "Biegen Sie unmittelbar vor dem Schild rechts ab.",
    exampleSentenceEs: "Gire inmediatamente delante de la señal a la derecha.",
    exampleSentenceDeBlocks: [
      { text: "Biegen Sie", role: "verb_p1", order: 1 },
      { text: "unmittelbar vor dem Schild", role: "complement", order: 2 },
      { text: "nach rechts", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 211-10: circular blue sign with 45-degree diagonal white arrow pointing down-right, white border, 3D on white background"
  },
  {
    de: "das Zeichen 214 (Vorgeschriebene Fahrtrichtung hier geradeaus oder rechts)",
    pron: "das tsái-jen foa-gue-shrí-be-ne fáat-rij-tung jía gue-rá-de-aus o-da rejts",
    es: "Giro obligatorio aquí de frente o derecha",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41",
    exampleSentenceDe: "Hier können Sie geradeaus weiterfahren oder rechts einbiegen.",
    exampleSentenceEs: "Aquí puede continuar recto o doblar a la derecha.",
    exampleSentenceDeBlocks: [
      { text: "Hier können Sie", role: "subject", order: 1 },
      { text: "geradeaus fahren", role: "verb_p1", order: 2 },
      { text: "oder rechts", role: "complement", order: 3 },
      { text: "einbiegen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 214-10: circular blue sign with white arrow pointing forward and 45-degree right, 3D on white background"
  },
  {
    de: "das Zeichen 215 (Kreisverkehr)",
    pron: "das tsái-jen kráis-fea-ke-a",
    es: "Glorieta obligatoria (Sentido giratorio obligatorio)",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Kreisverkehre",
    regimen: "StVO § 8 Abs. 1a (Vorfahrt)",
    exampleSentenceDe: "Im Kreisverkehr haben die Fahrzeuge im Kreis die Vorfahrt.",
    exampleSentenceEs: "En la glorieta los vehículos dentro del anillo tienen preferencia.",
    exampleSentenceDeBlocks: [
      { text: "Im Kreisverkehr", role: "complement", order: 1 },
      { text: "haben die Fahrzeuge", role: "verb_p1", order: 2 },
      { text: "im Kreis", role: "complement", order: 3 },
      { text: "die Vorfahrt", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 215: circular blue disc with three curved white arrows forming a counter-clockwise circle, white border, 3D isolated on pure white background (#FFFFFF)"
  },
  {
    de: "das Zeichen 220 (Einbahnstraße)",
    pron: "das tsái-jen áin-ban-shtrá-se",
    es: "Calle de sentido único",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Einbahnstraßen",
    regimen: "StVO § 41",
    exampleSentenceDe: "In einer Einbahnstraße darf man nicht wenden oder rückwärtsfahren.",
    exampleSentenceEs: "En una calle de sentido único no se permite dar la vuelta ni retroceder.",
    exampleSentenceDeBlocks: [
      { text: "In einer Einbahnstraße", role: "complement", order: 1 },
      { text: "darf man", role: "verb_p1", order: 2 },
      { text: "nicht wenden", role: "verb_p2", order: 3 },
      { text: "oder zurückfahren", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 220: rectangular horizontal blue sign with a large bold white arrow pointing right containing the black uppercase German text 'Einbahnstraße', 3D on white background"
  },
  {
    de: "das Zeichen 222 (Vorgeschriebene Vorbeifahrt rechts vorbei)",
    pron: "das tsái-jen foa-gue-shrí-be-ne foa-bái-faat rejts foa-bái",
    es: "Paso obligatorio por la derecha del obstáculo o refugio",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41",
    exampleSentenceDe: "Fahren Sie rechts an der Verkehrsinsel vorbei.",
    exampleSentenceEs: "Pase por la derecha de la isleta de tráfico.",
    exampleSentenceDeBlocks: [
      { text: "Fahren Sie", role: "verb_p1", order: 1 },
      { text: "rechts an der Insel", role: "complement", order: 2 },
      { text: "vorsichtig", role: "complement", order: 3 },
      { text: "vorbei", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 222-10: circular blue disc with diagonal bold white arrow pointing downwards to the bottom-right, white border, 3D on white background"
  },
  {
    de: "das Zeichen 222-20 (Vorgeschriebene Vorbeifahrt links vorbei)",
    pron: "das tsái-jen foa-gue-shrí-be-ne foa-bái-faat links foa-bái",
    es: "Paso obligatorio por la izquierda del obstáculo",
    type: "Sustantivo (Neutro)",
    category: "Fahrtrichtungen (Azules)",
    plural: "die Verkehrszeichen",
    regimen: "StVO § 41",
    exampleSentenceDe: "Wegen der Baustelle müssen wir links vorbeifahren.",
    exampleSentenceEs: "Debido a las obras debemos pasar por la izquierda.",
    exampleSentenceDeBlocks: [
      { text: "Wegen der Baustelle", role: "complement", order: 1 },
      { text: "müssen wir", role: "verb_p1", order: 2 },
      { text: "links", role: "complement", order: 3 },
      { text: "vorbeifahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 222-20: circular blue disc with diagonal white arrow pointing downwards to the bottom-left, white border, 3D on white background"
  },

  // 2. Sonderwege & Spuren [13-20]
  {
    de: "das Zeichen 237 (Radweg)",
    pron: "das tsái-jen rát-vek",
    es: "Carril bici obligatorio (prohibido para coches y peatones)",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die Radwege",
    regimen: "Benutzungspflicht für Radfahrer",
    exampleSentenceDe: "Radfahrer müssen den ausgeschilderten Radweg benutzen.",
    exampleSentenceEs: "Los ciclistas deben utilizar el carril bici señalizado.",
    exampleSentenceDeBlocks: [
      { text: "Radfahrer", role: "subject", order: 1 },
      { text: "müssen den Radweg", role: "verb_p1", order: 2 },
      { text: "unbedingt", role: "complement", order: 3 },
      { text: "benutzen", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 237: circular blue disc with a detailed white bicycle pictogram in profile facing left, white border, 3D on white background"
  },
  {
    de: "das Zeichen 238 (Reitweg)",
    pron: "das tsái-jen ráit-vek",
    es: "Camino obligatorio para jinetes",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die Reitwege",
    regimen: "StVO § 41",
    exampleSentenceDe: "Dieser Waldweg ist ein ausgewiesener Reitweg für Pferde.",
    exampleSentenceEs: "Este camino de bosque es una vía exclusiva para caballos.",
    exampleSentenceDeBlocks: [
      { text: "Dieser Weg", role: "subject", order: 1 },
      { text: "ist ein Reitweg", role: "verb_p1", order: 2 },
      { text: "nur für", role: "complement", order: 3 },
      { text: "Reiter", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 238: circular blue disc with white horse and rider rider pictogram facing left, white border, 3D on white background"
  },
  {
    de: "das Zeichen 239 (Gehweg)",
    pron: "das tsái-jen gué-vek",
    es: "Acera / Vía exclusiva para peatones",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die Gehwege",
    regimen: "StVO § 41 (Fußgänger)",
    exampleSentenceDe: "Fahrzeuge dürfen auf dem reinen Gehweg nicht fahren.",
    exampleSentenceEs: "Los vehículos no pueden circular por la acera de peatones.",
    exampleSentenceDeBlocks: [
      { text: "Fahrzeuge dürfen", role: "subject", order: 1 },
      { text: "auf dem Gehweg", role: "complement", order: 2 },
      { text: "niemals", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 239: circular blue disc with white silhouette pictogram of a parent and child walking facing left, white border, 3D on white background"
  },
  {
    de: "das Zeichen 240 (Gemeinsamer Geh- und Radweg)",
    pron: "das tsái-jen gue-máin-za-ma gué- unt rát-vek",
    es: "Vía compartida para peatones y ciclistas",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die gemeinsamen Geh- und Radwege",
    regimen: "Rücksichtnahmegebot",
    exampleSentenceDe: "Auf dem gemeinsamen Weg müssen Radfahrer auf Fußgänger achten.",
    exampleSentenceEs: "En la vía compartida los ciclistas deben cuidar a los peatones.",
    exampleSentenceDeBlocks: [
      { text: "Auf dem gemeinsamen Weg", role: "complement", order: 1 },
      { text: "müssen Radfahrer", role: "verb_p1", order: 2 },
      { text: "auf Fußgänger", role: "complement", order: 3 },
      { text: "achten", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 240: circular blue disc with white pedestrian pictogram above a horizontal white line and white bicycle pictogram below, 3D on white background"
  },
  {
    de: "das Zeichen 241 (Getrennter Rad- und Gehweg)",
    pron: "das tsái-jen gue-trén-ta rát- unt gué-vek",
    es: "Vía separada para ciclistas y peatones",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die getrennten Rad- und Gehwege",
    regimen: "Getrennte Spuren",
    exampleSentenceDe: "Der Radweg und der Gehweg sind durch eine Linie getrennt.",
    exampleSentenceEs: "El carril bici y la acera están separados por una línea.",
    exampleSentenceDeBlocks: [
      { text: "Der Radweg", role: "subject", order: 1 },
      { text: "ist vom Gehweg", role: "complement", order: 2 },
      { text: "durch eine Linie", role: "complement", order: 3 },
      { text: "getrennt", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 241-30: circular blue disc divided vertically by a white line with bicycle pictogram on left and pedestrians on right, 3D on white background"
  },
  {
    de: "das Zeichen 242.1 (Beginn einer Fußgängerzone)",
    pron: "das tsái-jen be-gín ái-nea fús-guen-ga-tsó-ne",
    es: "Inicio de zona peatonal",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die Fußgängerzonen",
    regimen: "Schrittgeschwindigkeit falls frei",
    exampleSentenceDe: "In der Fußgängerzone haben Fußgänger absoluten Vorrang.",
    exampleSentenceEs: "En la zona peatonal los peatones tienen preferencia absoluta.",
    exampleSentenceDeBlocks: [
      { text: "In der Fußgängerzone", role: "complement", order: 1 },
      { text: "haben Fußgänger", role: "verb_p1", order: 2 },
      { text: "immer", role: "complement", order: 3 },
      { text: "Vorrang", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 242.1: square white sign with black border containing a circular blue sign of pedestrians above the black bold text 'ZONE', 3D on white background"
  },
  {
    de: "das Zeichen 244.1 (Beginn einer Fahrradstraße)",
    pron: "das tsái-jen be-gín ái-nea fáar-rat-shtrá-se",
    es: "Inicio de calle ciclista (Máx. 30 km/h, prioridad bici)",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die Fahrradstraßen",
    regimen: "Max. 30 km/h / Vorrang Fahrrad",
    exampleSentenceDe: "In der Fahrradstraße beträgt das Tempolimit höchstens 30 km/h.",
    exampleSentenceEs: "En la calle ciclista el límite de velocidad es de máximo 30 km/h.",
    exampleSentenceDeBlocks: [
      { text: "In der Fahrradstraße", role: "complement", order: 1 },
      { text: "beträgt das Tempolimit", role: "verb_p1", order: 2 },
      { text: "maximal", role: "complement", order: 3 },
      { text: "30 km/h", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 244.1: square white sign with circular blue bicycle sign above the black text 'Fahrradstraße' and 'ZONE', 3D on white background"
  },
  {
    de: "das Zeichen 245 (Bussonderfahrstreifen)",
    pron: "das tsái-jen búsc-zón-da-fáar-shtrái-fen",
    es: "Carril bus exclusivo",
    type: "Sustantivo (Neutro)",
    category: "Sonderwege & Spuren",
    plural: "die Bussonderfahrstreifen",
    regimen: "Freigabe nur mit Zusatzzeichen",
    exampleSentenceDe: "Normale Pkw dürfen den Bussonderfahrstreifen nicht befahren.",
    exampleSentenceEs: "Los turismos normales no pueden circular por el carril bus.",
    exampleSentenceDeBlocks: [
      { text: "Normale Pkw", role: "subject", order: 1 },
      { text: "dürfen die Busspur", role: "verb_p1", order: 2 },
      { text: "nicht", role: "complement", order: 3 },
      { text: "befahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 245: circular blue disc with white side-view bus pictogram, white border, 3D on white background"
  },

  // 3. Geschwindigkeit & Ausrüstung [21-23, 26, 27, 29, 30]
  {
    de: "das Zeichen 275 (Vorgeschriebene Mindestgeschwindigkeit 30 km/h)",
    pron: "das tsái-jen foa-gue-shrí-be-ne mín-dest-gue-shvín-dij-kait drái-sij",
    es: "Velocidad mínima obligatoria (ej. 30 km/h)",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit",
    plural: "die Mindestgeschwindigkeiten",
    regimen: "Mindesttempo",
    exampleSentenceDe: "Man darf hier nicht langsamer als 30 km/h fahren.",
    exampleSentenceEs: "Aquí no se puede conducir a menos de 30 km/h.",
    exampleSentenceDeBlocks: [
      { text: "Man darf hier", role: "subject", order: 1 },
      { text: "nicht langsamer", role: "verb_p1", order: 2 },
      { text: "als 30 km/h", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 275: circular blue disc with bold white number '30' in official German DIN 1451 traffic font, white border, 3D on white background"
  },
  {
    de: "das Zeichen 279 (Ende der vorgeschriebenen Mindestgeschwindigkeit)",
    pron: "das tsái-jen én-de dea foa-gue-shrí-be-nen mín-dest-gue-shvín-dij-kait",
    es: "Fin de la velocidad mínima obligatoria",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit",
    plural: "die Verkehrszeichen",
    regimen: "Aufhebung Mindesttempo",
    exampleSentenceDe: "Das Gebot der Mindestgeschwindigkeit ist jetzt aufgehoben.",
    exampleSentenceEs: "La obligación de velocidad mínima queda anulada ahora.",
    exampleSentenceDeBlocks: [
      { text: "Das Mindesttempo", role: "subject", order: 1 },
      { text: "ist ab diesem Schild", role: "verb_p1", order: 2 },
      { text: "wieder", role: "complement", order: 3 },
      { text: "aufgehoben", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 279: circular blue disc with white number '30' crossed out diagonally by three parallel red stripes, 3D on white background"
  },
  {
    de: "das Zeichen 268 (Schneeketten vorgeschrieben)",
    pron: "das tsái-jen shné-ke-ten foa-gue-shrí-ben",
    es: "Cadenas para nieve obligatorias",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit",
    plural: "die Schneeketten",
    regimen: "Max. 50 km/h mit Ketten",
    exampleSentenceDe: "Auf dieser Bergstraße müssen Schneeketten montiert sein.",
    exampleSentenceEs: "En esta carretera de montaña se deben montar cadenas para nieve.",
    exampleSentenceDeBlocks: [
      { text: "Auf dieser Straße", role: "complement", order: 1 },
      { text: "müssen Schneeketten", role: "verb_p1", order: 2 },
      { text: "montiert", role: "complement", order: 3 },
      { text: "sein", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 268: circular blue disc with white tyre wrapped in snow chains pictogram, white rim, 3D on white background"
  },

  // 4. Verbote (Rojas) [24, 25, 28] + Geschwindigkeitsverbote [26, 27, 29, 30]
  {
    de: "das Zeichen 250 (Verbot für Fahrzeuge aller Art)",
    pron: "das tsái-jen fea-bót füa fáar-tsoi-gue á-la art",
    es: "Prohibido el paso a toda clase de vehículos en ambos sentidos",
    type: "Sustantivo (Neutro)",
    category: "Verbote (Rojas)",
    plural: "die Durchfahrtsverbote",
    regimen: "StVO § 41 (Vollsperrung)",
    exampleSentenceDe: "Dieses Schild verbietet die Durchfahrt für alle Fahrzeuge.",
    exampleSentenceEs: "Esta señal prohíbe el paso a todos los vehículos.",
    exampleSentenceDeBlocks: [
      { text: "Dieses Schild", role: "subject", order: 1 },
      { text: "verbietet die Durchfahrt", role: "verb_p1", order: 2 },
      { text: "für alle", role: "complement", order: 3 },
      { text: "Fahrzeuge", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 250: circular white disc with thick bright traffic red (RAL 3020) outer border ring, completely blank white center, 3D on white background"
  },
  {
    de: "das Zeichen 267 (Verbot der Einfahrt)",
    pron: "das tsái-jen fea-bót dea áin-fáat",
    es: "Dirección prohibida / Prohibida la entrada",
    type: "Sustantivo (Neutro)",
    category: "Verbote (Rojas)",
    plural: "die Einfahrtsverbote",
    regimen: "StVO § 41 (Einbahnstraße Gegenverkehr)",
    exampleSentenceDe: "Fahren Sie hier nicht rein, das ist die falsche Richtung!",
    exampleSentenceEs: "¡No entre aquí, es la dirección equivocada!",
    exampleSentenceDeBlocks: [
      { text: "Fahren Sie nicht rein,", role: "verb_p1", order: 1 },
      { text: "denn hier ist", role: "verb_p2", order: 2 },
      { text: "die Einfahrt", role: "subject", order: 3 },
      { text: "verboten", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 267: circular solid red (RAL 3020) disc with a wide horizontal white rectangle bar in center, 3D on white background"
  },
  {
    de: "das Zeichen 274-50 (Zulässige Höchstgeschwindigkeit 50 km/h)",
    pron: "das tsái-jen tsú-lé-si-gue jöjts-gue-shvín-dij-kait fúnf-tsij",
    es: "Límite de velocidad máxima permitida (50 km/h)",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit",
    plural: "die Höchstgeschwindigkeiten",
    regimen: "Höchstgeschwindigkeit StVO § 3",
    exampleSentenceDe: "Innerorts gilt grundsätzlich eine Höchstgeschwindigkeit von 50 km/h.",
    exampleSentenceEs: "En zona urbana rige por principio una velocidad máxima de 50 km/h.",
    exampleSentenceDeBlocks: [
      { text: "Innerorts gilt", role: "complement", order: 1 },
      { text: "eine Höchstgeschwindigkeit", role: "subject", order: 2 },
      { text: "von genau", role: "complement", order: 3 },
      { text: "50 km/h", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 274: circular white disc with thick red outer ring border containing bold black number '50' in German DIN 1451 font, 3D on white background"
  },
  {
    de: "das Zeichen 274.1 (Beginn einer Tempo 30-Zone)",
    pron: "das tsái-jen be-gín ái-nea tém-po drái-sij tsó-ne",
    es: "Inicio de zona de velocidad máxima 30 km/h",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit",
    plural: "die Tempo 30-Zonen",
    regimen: "Rechts-vor-Links gilt meistens",
    exampleSentenceDe: "In der 30er-Zone gilt meistens die Vorfahrtsregel Rechts-vor-Links.",
    exampleSentenceEs: "En la zona 30 rige mayoritariamente la regla de prioridad derecha antes que izquierda.",
    exampleSentenceDeBlocks: [
      { text: "In der 30er-Zone", role: "complement", order: 1 },
      { text: "gilt meistens die Regel", role: "verb_p1", order: 2 },
      { text: "Rechts vor", role: "subject", order: 3 },
      { text: "Links", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 274.1: square white sign with black border containing a circular red-and-white '30' sign and black bold word 'ZONE' below, 3D on white background"
  },
  {
    de: "das Zeichen 276 (Überholverbot für Kraftfahrzeuge aller Art)",
    pron: "das tsái-jen ú-ba-jól-fea-bót füa kráft-fáar-tsoi-gue",
    es: "Prohibición de adelantar para vehículos de motor",
    type: "Sustantivo (Neutro)",
    category: "Verbote (Rojas)",
    plural: "die Überholverbote",
    regimen: "StVO § 41",
    exampleSentenceDe: "Auf dieser Landstraße herrscht ein striktes Überholverbot.",
    exampleSentenceEs: "En esta carretera rige una estricta prohibición de adelantar.",
    exampleSentenceDeBlocks: [
      { text: "Auf dieser Straße", role: "complement", order: 1 },
      { text: "gilt ein striktes", role: "verb_p1", order: 2 },
      { text: "Überholverbot", role: "subject", order: 3 },
      { text: "für alle Pkw", role: "complement", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 276: circular white disc with red border showing two cars side by side: right car black, left overtaking car red, 3D on white background"
  },
  {
    de: "das Zeichen 278-50 (Ende der zulässigen Höchstgeschwindigkeit 50 km/h)",
    pron: "das tsái-jen én-de dea tsú-lé-si-guen jöjts-gue-shvín-dij-kait",
    es: "Fin del límite de velocidad máxima (50 km/h)",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit",
    plural: "die Verkehrszeichen",
    regimen: "Aufhebung der Geschwindigkeitsbeschränkung",
    exampleSentenceDe: "Ab diesem Schild dürfen wir wieder schneller fahren.",
    exampleSentenceEs: "A partir de esta señal podemos circular de nuevo más rápido.",
    exampleSentenceDeBlocks: [
      { text: "Ab diesem Schild", role: "complement", order: 1 },
      { text: "dürfen wir wieder", role: "verb_p1", order: 2 },
      { text: "schneller", role: "complement", order: 3 },
      { text: "fahren", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 278: circular white disc with thin black border and light grey number '50' crossed by five diagonal black stripes, 3D on white background"
  },
  {
    de: "das Zeichen 282 (Ende sämtlicher Streckenverbote)",
    pron: "das tsái-jen én-de zémt-li-jea shtré-ken-fea-bó-te",
    es: "Fin de todas las restricciones de velocidad y adelantamiento",
    type: "Sustantivo (Neutro)",
    category: "Geschwindigkeit",
    plural: "die Verkehrszeichen",
    regimen: "Freie Fahrt (Richtgeschwindigkeit 130)",
    exampleSentenceDe: "Das Schild hebt alle vorherigen Tempolimits und Überholverbote auf.",
    exampleSentenceEs: "La señal anula todos los límites de velocidad y prohibiciones de adelantar previos.",
    exampleSentenceDeBlocks: [
      { text: "Das Schild hebt", role: "subject", order: 1 },
      { text: "alle Tempolimits", role: "complement", order: 2 },
      { text: "und Überholverbote", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 282: circular white disc with thin black rim crossed diagonally by five parallel solid black stripes, 3D on white background"
  },

  // 5. Halte- & Parkverbote [31, 32]
  {
    de: "das Zeichen 283 (Absolutes Haltverbot)",
    pron: "das tsái-jen ap-zo-lú-tes jált-fea-bót",
    es: "Prohibido parar y estacionar (Parada prohibida total)",
    type: "Sustantivo (Neutro)",
    category: "Halte- & Parkverbote",
    plural: "die absoluten Haltverbote",
    regimen: "Kein Halten, auch nicht kurz",
    exampleSentenceDe: "Im absoluten Haltverbot darf man nicht einmal eine Sekunde halten.",
    exampleSentenceEs: "En la parada prohibida absoluta no se puede parar ni un segundo.",
    exampleSentenceDeBlocks: [
      { text: "Hier darf man", role: "subject", order: 1 },
      { text: "nicht einmal kurz", role: "complement", order: 2 },
      { text: "halten oder", role: "verb_p1", order: 3 },
      { text: "parken", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 283: circular sign with blue background, thick red outer ring border and a red cross (X) consisting of two intersecting diagonal red bars, 3D on white background"
  },
  {
    de: "das Zeichen 286 (Eingeschränktes Haltverbot)",
    pron: "das tsái-jen áin-gue-shrénk-tes jált-fea-bót",
    es: "Estacionamiento prohibido (Permitida parada menor a 3 min para carga/descarga)",
    type: "Sustantivo (Neutro)",
    category: "Halte- & Parkverbote",
    plural: "die eingeschränkten Haltverbote",
    regimen: "Max. 3 Min. Halten erlaubt",
    exampleSentenceDe: "Man darf maximal drei Minuten zum Ein- oder Aussteigen halten.",
    exampleSentenceEs: "Se puede parar como máximo tres minutos para subir o bajar pasajeros.",
    exampleSentenceDeBlocks: [
      { text: "Man darf hier", role: "subject", order: 1 },
      { text: "nur kurz halten,", role: "verb_p1", order: 2 },
      { text: "aber nicht", role: "complement", order: 3 },
      { text: "parken", role: "verb_p2", order: 4 }
    ],
    en: "Official German traffic sign StVO Zeichen 286: circular sign with blue background, thick red outer ring border and a single diagonal red bar from top-left to bottom-right, 3D on white background"
  }
];

// Helper para ID seguro en Base64 URL-safe
const getSafeId = (str) => {
  return Buffer.from(encodeURIComponent(str)).toString('base64').replace(/[\/+=]/g, '_');
};

console.log(`\n=============================================================`);
console.log(`INICIANDO INYECCIÓN OFICIAL DE KAPITEL 21 (StVO) — 32 SEÑALES`);
console.log(`=============================================================`);

if (signs32.length !== 32) {
  console.error(`❌ ERROR CRÍTICO: Se esperaban 32 señales y se detectaron ${signs32.length}`);
  process.exit(1);
}

// -------------------------------------------------------------
// FASE 1: INYECCIÓN EN src/data/chapters.jsx
// -------------------------------------------------------------
console.log(`\n[FASE 1] Inyectando en src/data/chapters.jsx...`);
const chaptersPath = path.join(__dirname, '..', 'src', 'data', 'chapters.jsx');
let chaptersContent = fs.readFileSync(chaptersPath, 'utf8');

// 1.1 Asegurar import de ShieldAlert en lucide-react
if (!chaptersContent.includes('ShieldAlert')) {
  chaptersContent = chaptersContent.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];/,
    (match, p1) => `import { ${p1.trim()}, ShieldAlert } from 'lucide-react';`
  );
  console.log(`  ✓ Icono ShieldAlert añadido a imports de lucide-react`);
}

// 1.2 Formatear el objeto del Capítulo 21 en código JSX
const kapitel21Obj = {
  id: 21,
  title: "Kapitel 21: Verkehrszeichen & Vorschriften (StVO)",
  icon: "__SHIELD_ALERT_ICON__",
  emoji: "🛑",
  categoryFilter: [
    "Todas",
    "Fahrtrichtungen (Azules)",
    "Sonderwege & Spuren",
    "Geschwindigkeit",
    "Verbote (Rojas)",
    "Halte- & Parkverbote"
  ],
  words: signs32
};

let kapitel21Str = JSON.stringify(kapitel21Obj, null, 2);
kapitel21Str = kapitel21Str.replace('"__SHIELD_ALERT_ICON__"', '<ShieldAlert size={20} />');

// 1.3 Comprobar si ya existe Kapitel 21 para evitar duplicados
if (chaptersContent.includes('id: 21,') || chaptersContent.includes('title: "Kapitel 21:')) {
  console.log(`  ⚠️ Kapitel 21 ya detectado en chapters.jsx. Reemplazando capítulo existente...`);
  chaptersContent = chaptersContent.replace(/\{\s*"?id"?:\s*21,[\s\S]*?\n\s*\}\s*,\s*\n\s*\];/g, '];');
}

// Inyectar antes del cierre de rawChapters: `];\n\nexport const chapters`
const rawChaptersEndRegex = /\n\];\s*\n+(export const chapters =)/;
if (!rawChaptersEndRegex.test(chaptersContent)) {
  console.error(`❌ ERROR: No se encontró el cierre de rawChapters en chapters.jsx`);
  process.exit(1);
}

const replacementChunk = `,\n${kapitel21Str}\n];\n\n$1`;
chaptersContent = chaptersContent.replace(rawChaptersEndRegex, replacementChunk);
fs.writeFileSync(chaptersPath, chaptersContent, 'utf8');
console.log(`  ✓ Kapitel 21 inyectado exitosamente en src/data/chapters.jsx`);

// -------------------------------------------------------------
// FASE 2: SINCRONIZACIÓN EN vocabulario_completo.json
// -------------------------------------------------------------
console.log(`\n[FASE 2] Sincronizando vocabulario_completo.json...`);
const vocabPath = path.join(__dirname, '..', 'vocabulario_completo.json');
let vocabList = [];
if (fs.existsSync(vocabPath)) {
  vocabList = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
}

let addedCount = 0;
let updatedCount = 0;

signs32.forEach(s => {
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
### StVO Anlage 2 — Catálogo Oficial de Señales Obligatorias & Prohibiciones (A1 / Fahrschule)

> **Total de Entradas Normativas:** 32 señales y prescripciones reglamentarias del StVO con denominación legal exacta, fonética alemana adaptada al español, traducción técnica de tráfico, artículo reglamentario / régimen y oraciones de conducción real en Alemania.

| # | Deutsch mit Artikel | Lautschrift (Pronunciación) | Spanisch (Traducción de Tráfico) | Wortart | Kategorie | Spezifikation / Norm | Beispielsatz Deutsch | Beispielsatz Spanisch |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

signs32.forEach((s, idx) => {
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
console.log(`  ✓ Archivo Markdown generado con 32 filas en: docs/kapitel_21_verkehrszeichen_tabelle.md`);

// -------------------------------------------------------------
// FASE 4: SINCRONIZACIÓN DE TOTALES EN Profile.jsx Y App.jsx
// -------------------------------------------------------------
console.log(`\n[FASE 4] Actualizando métricas de conteo a 1352 palabras...`);
const profilePath = path.join(__dirname, '..', 'src', 'components', 'Profile.jsx');
if (fs.existsSync(profilePath)) {
  let profileContent = fs.readFileSync(profilePath, 'utf8');
  profileContent = profileContent.replace(/totalCardsCount\s*=\s*\d+/g, 'totalCardsCount = 1352');
  fs.writeFileSync(profilePath, profileContent, 'utf8');
  console.log(`  ✓ Profile.jsx actualizado (default totalCardsCount = 1352)`);
}

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  
  // Actualizar fallback numérico de 1320 a 1352
  appContent = appContent.replace(/\|\|\s*1320/g, '|| 1352');
  
  // Soporte para activeChapter.categoryFilter en memo de categories si aún no está
  if (!appContent.includes('activeChapter.categoryFilter')) {
    appContent = appContent.replace(
      /const categories = useMemo\(\(\) => \{\s*if \(!activeChapter\?\.words\) return \['Todas'\];/,
      `const categories = useMemo(() => {\n    if (!activeChapter?.words) return ['Todas'];\n    if (activeChapter.categoryFilter && Array.isArray(activeChapter.categoryFilter)) {\n      return activeChapter.categoryFilter;\n    }`
    );
    console.log(`  ✓ App.jsx actualizado con soporte prioritario para activeChapter.categoryFilter`);
  }
  
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log(`  ✓ App.jsx actualizado con totalCardsCount dinámico (1352)`);
}

console.log(`\n🎉 PROCESO DE INYECCIÓN Y SINCRONIZACIÓN COMPLETADO CON ÉXITO.`);
