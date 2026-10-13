/**
 * scripts/update_kapitel18_sentences.cjs
 *
 * Enriquecimiento y sincronización de las 50 palabras de
 * Kapitel 18: Elektrotechnik & Solar (id: 18) en DeutschMeister PRO A1.
 *
 * Inyecta:
 * - exampleSentenceDe
 * - exampleSentenceEs
 * - exampleSentenceDeBlocks (4 bloques sintácticos con role y order)
 *
 * Sincroniza:
 * 1. src/data/chapters.jsx
 * 2. vocabulario_completo.json
 * 3. docs/kapitel_18_elektrotechnik_solar_tabelle.md
 */

const fs = require('fs');
const path = require('path');

// Helper para calcular ID Base64 URL-safe idéntico a helpers.js
function getSafeId(str) {
  return Buffer.from(encodeURIComponent(str)).toString('base64').replace(/[\/+=]/g, '_');
}

// 50 TÉRMINOS CON SUS ORACIONES Y BLOQUES SINTÁCTICOS
const kapitel18Mappings = [
  {
    de: "der Strom",
    exampleSentenceDe: "Der Strom fließt durch das Kabel.",
    exampleSentenceEs: "La corriente fluye a través del cable.",
    exampleSentenceDeBlocks: [
      { text: "Der Strom", role: "subject", order: 1 },
      { text: "fließt", role: "verb_p1", order: 2 },
      { text: "durch das", role: "complement", order: 3 },
      { text: "Kabel.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Spannung",
    exampleSentenceDe: "Die Spannung beträgt genau 230 Volt.",
    exampleSentenceEs: "El voltaje es exactamente de 230 voltios.",
    exampleSentenceDeBlocks: [
      { text: "Die Spannung", role: "subject", order: 1 },
      { text: "beträgt", role: "verb_p1", order: 2 },
      { text: "genau", role: "complement", order: 3 },
      { text: "230 Volt.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Stromkreis",
    exampleSentenceDe: "Der Stromkreis ist jetzt sicher unterbrochen.",
    exampleSentenceEs: "El circuito eléctrico está ahora interrumpido de forma segura.",
    exampleSentenceDeBlocks: [
      { text: "Der Stromkreis", role: "subject", order: 1 },
      { text: "ist jetzt", role: "verb_p1", order: 2 },
      { text: "vollständig und sicher", role: "complement", order: 3 },
      { text: "unterbrochen.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "das Kabel",
    exampleSentenceDe: "Wir verlegen das Kabel zum Verteiler.",
    exampleSentenceEs: "Tendemos el cable hacia el distribuidor.",
    exampleSentenceDeBlocks: [
      { text: "Wir verlegen", role: "verb_p1", order: 1 },
      { text: "das Kabel", role: "subject", order: 2 },
      { text: "direkt zum", role: "complement", order: 3 },
      { text: "Verteilerkasten.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Stecker",
    exampleSentenceDe: "Ziehen Sie bitte zuerst den Stecker.",
    exampleSentenceEs: "Por favor, desconecte primero el enchufe.",
    exampleSentenceDeBlocks: [
      { text: "Ziehen Sie", role: "verb_p1", order: 1 },
      { text: "bitte zuerst", role: "complement", order: 2 },
      { text: "den Stecker", role: "subject", order: 3 },
      { text: "vorsichtig ab.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Steckdose",
    exampleSentenceDe: "Die neue Steckdose ist fest montiert.",
    exampleSentenceEs: "La nueva toma de corriente está firmemente montada.",
    exampleSentenceDeBlocks: [
      { text: "Die neue Steckdose", role: "subject", order: 1 },
      { text: "ist an der Wand", role: "complement", order: 2 },
      { text: "fachgerecht", role: "complement", order: 3 },
      { text: "montiert.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Schalter",
    exampleSentenceDe: "Drücken Sie den Schalter für Licht.",
    exampleSentenceEs: "Presione el interruptor para la luz.",
    exampleSentenceDeBlocks: [
      { text: "Drücken Sie", role: "verb_p1", order: 1 },
      { text: "den Schalter,", role: "subject", order: 2 },
      { text: "um das Licht", role: "complement", order: 3 },
      { text: "einzuschalten.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Sicherung",
    exampleSentenceDe: "Die Sicherung hat sofort automatisch ausgelöst.",
    exampleSentenceEs: "El fusible se disparó inmediatamente de forma automática.",
    exampleSentenceDeBlocks: [
      { text: "Die Sicherung", role: "subject", order: 1 },
      { text: "hat im Kasten", role: "complement", order: 2 },
      { text: "wegen Überlastung", role: "complement", order: 3 },
      { text: "ausgelöst.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Transformator",
    exampleSentenceDe: "Der Transformator wandelt die Spannung um.",
    exampleSentenceEs: "El transformador convierte el voltaje.",
    exampleSentenceDeBlocks: [
      { text: "Der Transformator", role: "subject", order: 1 },
      { text: "wandelt", role: "verb_p1", order: 2 },
      { text: "die hohe Spannung", role: "complement", order: 3 },
      { text: "sicher um.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Batterie",
    exampleSentenceDe: "Die Batterie liefert Gleichstrom für Notfälle.",
    exampleSentenceEs: "La batería suministra corriente continua para emergencias.",
    exampleSentenceDeBlocks: [
      { text: "Die Batterie", role: "subject", order: 1 },
      { text: "liefert", role: "verb_p1", order: 2 },
      { text: "Gleichstrom", role: "complement", order: 3 },
      { text: "für die Anlage.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Akku",
    exampleSentenceDe: "Der Akku des Bohrers lädt schnell.",
    exampleSentenceEs: "La batería del taladro se carga rápido.",
    exampleSentenceDeBlocks: [
      { text: "Der Akku", role: "subject", order: 1 },
      { text: "des Bohrers", role: "complement", order: 2 },
      { text: "lädt an der Station", role: "verb_p1", order: 3 },
      { text: "sehr schnell.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Zähler",
    exampleSentenceDe: "Der Elektriker liest den Zähler ab.",
    exampleSentenceEs: "El electricista lee el contador.",
    exampleSentenceDeBlocks: [
      { text: "Der Elektriker", role: "subject", order: 1 },
      { text: "liest den Zähler", role: "verb_p1", order: 2 },
      { text: "im Keller", role: "complement", order: 3 },
      { text: "sorgfältig ab.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Gleichspannung",
    exampleSentenceDe: "Solarmodule erzeugen immer saubere Gleichspannung.",
    exampleSentenceEs: "Los módulos solares generan siempre tensión continua limpia.",
    exampleSentenceDeBlocks: [
      { text: "Die Solarmodule", role: "subject", order: 1 },
      { text: "erzeugen", role: "verb_p1", order: 2 },
      { text: "immer saubere", role: "complement", order: 3 },
      { text: "Gleichspannung.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Wechselspannung",
    exampleSentenceDe: "Haushaltsgeräte brauchen 230 Volt Wechselspannung.",
    exampleSentenceEs: "Los electrodomésticos necesitan 230 voltios de tensión alterna.",
    exampleSentenceDeBlocks: [
      { text: "Normale Geräte", role: "subject", order: 1 },
      { text: "brauchen", role: "verb_p1", order: 2 },
      { text: "230 Volt", role: "complement", order: 3 },
      { text: "Wechselspannung.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Leistung",
    exampleSentenceDe: "Die maximale Leistung beträgt zehn Kilowatt.",
    exampleSentenceEs: "La potencia máxima es de diez kilovatios.",
    exampleSentenceDeBlocks: [
      { text: "Die maximale Leistung", role: "subject", order: 1 },
      { text: "beträgt", role: "verb_p1", order: 2 },
      { text: "bei Sonnenschein", role: "complement", order: 3 },
      { text: "zehn Kilowatt.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Solaranlage",
    exampleSentenceDe: "Die Solaranlage produziert grünen Strom täglich.",
    exampleSentenceEs: "La instalación solar produce electricidad ecológica a diario.",
    exampleSentenceDeBlocks: [
      { text: "Die Solaranlage", role: "subject", order: 1 },
      { text: "produziert auf dem Dach", role: "verb_p1", order: 2 },
      { text: "täglich sauberen", role: "complement", order: 3 },
      { text: "grünen Strom.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "das Solarmodul",
    exampleSentenceDe: "Wir befestigen jedes Solarmodul mit Klemmen.",
    exampleSentenceEs: "Fijamos cada módulo solar con abrazaderas.",
    exampleSentenceDeBlocks: [
      { text: "Wir befestigen", role: "verb_p1", order: 1 },
      { text: "jedes Solarmodul", role: "subject", order: 2 },
      { text: "auf der Schiene", role: "complement", order: 3 },
      { text: "mit Klemmen.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Solarzelle",
    exampleSentenceDe: "Eine Solarzelle wandelt Licht in Strom.",
    exampleSentenceEs: "Una célula solar convierte luz en electricidad.",
    exampleSentenceDeBlocks: [
      { text: "Die Solarzelle", role: "subject", order: 1 },
      { text: "wandelt", role: "verb_p1", order: 2 },
      { text: "das Sonnenlicht", role: "complement", order: 3 },
      { text: "in Strom um.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Wechselrichter",
    exampleSentenceDe: "Der Wechselrichter wandelt Gleichstrom in Wechselstrom.",
    exampleSentenceEs: "El inversor convierte corriente continua en alterna.",
    exampleSentenceDeBlocks: [
      { text: "Der Wechselrichter", role: "subject", order: 1 },
      { text: "wandelt Gleichstrom", role: "verb_p1", order: 2 },
      { text: "sehr effizient", role: "complement", order: 3 },
      { text: "in Wechselstrom.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Speicher",
    exampleSentenceDe: "Der Speicher speichert Energie für nachts.",
    exampleSentenceEs: "La batería de almacenamiento guarda energía para la noche.",
    exampleSentenceDeBlocks: [
      { text: "Der Batteriespeicher", role: "subject", order: 1 },
      { text: "speichert Solarstrom", role: "verb_p1", order: 2 },
      { text: "zuverlässig", role: "complement", order: 3 },
      { text: "für die Nacht.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "das Netz",
    exampleSentenceDe: "Die Anlage speist Strom ins Netz.",
    exampleSentenceEs: "La instalación inyecta electricidad a la red.",
    exampleSentenceDeBlocks: [
      { text: "Die Anlage", role: "subject", order: 1 },
      { text: "speist überschüssigen Strom", role: "verb_p1", order: 2 },
      { text: "automatisch", role: "complement", order: 3 },
      { text: "ins Netz ein.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Ertrag",
    exampleSentenceDe: "Im Sommer ist der Ertrag hoch.",
    exampleSentenceEs: "En verano la producción energética es alta.",
    exampleSentenceDeBlocks: [
      { text: "Im Sommer", role: "complement", order: 1 },
      { text: "ist der Ertrag", role: "verb_p1", order: 2 },
      { text: "unserer Anlage", role: "subject", order: 3 },
      { text: "besonders hoch.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Dachmontage",
    exampleSentenceDe: "Wir planen die Dachmontage für morgen.",
    exampleSentenceEs: "Planificamos el montaje en tejado para mañana.",
    exampleSentenceDeBlocks: [
      { text: "Wir planen", role: "verb_p1", order: 1 },
      { text: "die Dachmontage", role: "subject", order: 2 },
      { text: "mit dem Team", role: "complement", order: 3 },
      { text: "für morgen.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "das Werkzeug",
    exampleSentenceDe: "Bringe bitte das Werkzeug nach oben.",
    exampleSentenceEs: "Lleva por favor las herramientas arriba.",
    exampleSentenceDeBlocks: [
      { text: "Bringe bitte", role: "verb_p1", order: 1 },
      { text: "das Werkzeug", role: "subject", order: 2 },
      { text: "in der Kiste", role: "complement", order: 3 },
      { text: "nach oben.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Schraubenzieher",
    exampleSentenceDe: "Ich ziehe Schrauben mit dem Schraubenzieher.",
    exampleSentenceEs: "Aprieto tornillos con el destornillador.",
    exampleSentenceDeBlocks: [
      { text: "Ich ziehe", role: "verb_p1", order: 1 },
      { text: "die Klemme", role: "subject", order: 2 },
      { text: "mit dem Schraubenzieher", role: "complement", order: 3 },
      { text: "fest an.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Zange",
    exampleSentenceDe: "Mit der Zange schneide ich Kabel.",
    exampleSentenceEs: "Con el alicate corto cables.",
    exampleSentenceDeBlocks: [
      { text: "Mit der Zange", role: "complement", order: 1 },
      { text: "schneidet der Monteur", role: "verb_p1", order: 2 },
      { text: "das dicke Kabel", role: "subject", order: 3 },
      { text: "schnell ab.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Bohrer",
    exampleSentenceDe: "Der Bohrer bohrt Löcher in Beton.",
    exampleSentenceEs: "El taladro perfora agujeros en hormigón.",
    exampleSentenceDeBlocks: [
      { text: "Der Bohrer", role: "subject", order: 1 },
      { text: "bohrt präzise Löcher", role: "verb_p1", order: 2 },
      { text: "in die Wand", role: "complement", order: 3 },
      { text: "aus Beton.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "das Multimeter",
    exampleSentenceDe: "Mit dem Multimeter prüfen wir Durchgang.",
    exampleSentenceEs: "Con el multímetro comprobamos la continuidad.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Multimeter", role: "complement", order: 1 },
      { text: "prüfen wir", role: "verb_p1", order: 2 },
      { text: "die Spannung", role: "subject", order: 3 },
      { text: "ganz genau.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Leiter",
    exampleSentenceDe: "Halte die Leiter bitte gut fest.",
    exampleSentenceEs: "Sujeta la escalera firmemente, por favor.",
    exampleSentenceDeBlocks: [
      { text: "Halte die Leiter", role: "verb_p1", order: 1 },
      { text: "auf dem Boden", role: "complement", order: 2 },
      { text: "für die Sicherheit", role: "complement", order: 3 },
      { text: "gut fest.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Erdung",
    exampleSentenceDe: "Eine feste Erdung schützt vor Unfällen.",
    exampleSentenceEs: "Una toma de tierra sólida protege contra accidentes.",
    exampleSentenceDeBlocks: [
      { text: "Eine gute Erdung", role: "subject", order: 1 },
      { text: "schützt das Haus", role: "verb_p1", order: 2 },
      { text: "und die Monteure", role: "complement", order: 3 },
      { text: "vor Unfällen.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Kurzschluss",
    exampleSentenceDe: "Ein Kurzschluss kann die Bauteile beschädigen.",
    exampleSentenceEs: "Un cortocircuito puede dañar los componentes.",
    exampleSentenceDeBlocks: [
      { text: "Ein Kurzschluss", role: "subject", order: 1 },
      { text: "kann die Bauteile", role: "verb_p1", order: 2 },
      { text: "in Sekunden", role: "complement", order: 3 },
      { text: "schwer beschädigen.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Helm",
    exampleSentenceDe: "Auf der Baustelle tragen wir Helme.",
    exampleSentenceEs: "En la obra llevamos cascos.",
    exampleSentenceDeBlocks: [
      { text: "Auf der Baustelle", role: "complement", order: 1 },
      { text: "tragen alle Arbeiter", role: "verb_p1", order: 2 },
      { text: "immer einen gelben", role: "subject", order: 3 },
      { text: "Schutzhelm.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Handschuhe",
    exampleSentenceDe: "Isolierte Handschuhe schützen vor Stromschlägen.",
    exampleSentenceEs: "Los guantes aislantes protegen de descargas eléctricas.",
    exampleSentenceDeBlocks: [
      { text: "Isolierte Handschuhe", role: "subject", order: 1 },
      { text: "schützen die Hände", role: "verb_p1", order: 2 },
      { text: "zuverlässig", role: "complement", order: 3 },
      { text: "vor Strom.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "die Gefahr",
    exampleSentenceDe: "Bei Hochspannung herrscht immer Lebensgefahr.",
    exampleSentenceEs: "Con alta tensión hay siempre peligro de muerte.",
    exampleSentenceDeBlocks: [
      { text: "Bei Hochspannung", role: "complement", order: 1 },
      { text: "besteht für jeden", role: "verb_p1", order: 2 },
      { text: "eine sehr große", role: "subject", order: 3 },
      { text: "Lebensgefahr.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "gefährlich",
    exampleSentenceDe: "Offene Stromkabel sind extrem gefährlich.",
    exampleSentenceEs: "Los cables eléctricos al descubierto son sumamente peligrosos.",
    exampleSentenceDeBlocks: [
      { text: "Offene Elektrokabel", role: "subject", order: 1 },
      { text: "sind bei Berührung", role: "verb_p1", order: 2 },
      { text: "für Laien", role: "complement", order: 3 },
      { text: "extrem gefährlich.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Elektriker",
    exampleSentenceDe: "Der Elektriker schließt den Speicher an.",
    exampleSentenceEs: "El electricista conecta el acumulador.",
    exampleSentenceDeBlocks: [
      { text: "Der Elektriker", role: "subject", order: 1 },
      { text: "schließt den Speicher", role: "verb_p1", order: 2 },
      { text: "im Keller", role: "complement", order: 3 },
      { text: "fachgerecht an.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "der Techniker",
    exampleSentenceDe: "Der Techniker prüft die Solaranlage genau.",
    exampleSentenceEs: "El técnico revisa la instalación solar con precisión.",
    exampleSentenceDeBlocks: [
      { text: "Der Techniker", role: "subject", order: 1 },
      { text: "prüft die Anlage", role: "verb_p1", order: 2 },
      { text: "vor der Abnahme", role: "complement", order: 3 },
      { text: "ganz genau.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "messen",
    exampleSentenceDe: "Wir messen den Strom mit Prüfspitzen.",
    exampleSentenceEs: "Medimos la corriente con puntas de prueba.",
    exampleSentenceDeBlocks: [
      { text: "Wir messen", role: "verb_p1", order: 1 },
      { text: "die Spannung", role: "subject", order: 2 },
      { text: "am Messpunkt", role: "complement", order: 3 },
      { text: "mit Prüfspitzen.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "anschließen",
    exampleSentenceDe: "Wir schließen den Wechselrichter an das Netz.",
    exampleSentenceEs: "Conectamos el inversor a la red.",
    exampleSentenceDeBlocks: [
      { text: "Wir schließen", role: "verb_p1", order: 1 },
      { text: "den Wechselrichter", role: "subject", order: 2 },
      { text: "an das Netz", role: "complement", order: 3 },
      { text: "sicher an.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "installieren",
    exampleSentenceDe: "Monteure installieren Solarmodule auf dem Dach.",
    exampleSentenceEs: "Los montadores instalan módulos solares en el tejado.",
    exampleSentenceDeBlocks: [
      { text: "Die Monteure", role: "subject", order: 1 },
      { text: "installieren Module", role: "verb_p1", order: 2 },
      { text: "auf dem Schrägdach", role: "complement", order: 3 },
      { text: "sehr zügig.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "prüfen",
    exampleSentenceDe: "Vor Inbetriebnahme prüfen wir alle Kabel.",
    exampleSentenceEs: "Antes de la puesta en marcha comprobamos todos los cables.",
    exampleSentenceDeBlocks: [
      { text: "Vor Inbetriebnahme", role: "complement", order: 1 },
      { text: "prüfen wir", role: "verb_p1", order: 2 },
      { text: "alle Kabel", role: "subject", order: 3 },
      { text: "sehr gründlich.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "warten",
    exampleSentenceDe: "Der Techniker wartet die Anlage jährlich.",
    exampleSentenceEs: "El técnico realiza el mantenimiento de la instalación anualmente.",
    exampleSentenceDeBlocks: [
      { text: "Der Techniker", role: "subject", order: 1 },
      { text: "wartet die Anlage", role: "verb_p1", order: 2 },
      { text: "beim Kunden", role: "complement", order: 3 },
      { text: "einmal jährlich.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "einschalten",
    exampleSentenceDe: "Schalten Sie den Schalter jetzt ein.",
    exampleSentenceEs: "Encienda el interruptor ahora.",
    exampleSentenceDeBlocks: [
      { text: "Schalten Sie", role: "verb_p1", order: 1 },
      { text: "den Hauptschalter", role: "subject", order: 2 },
      { text: "nach der Montage", role: "complement", order: 3 },
      { text: "vorsichtig ein.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "ausschalten",
    exampleSentenceDe: "Schalten Sie den Strom vor Reparaturen aus.",
    exampleSentenceEs: "Desconecte la corriente antes de las reparaciones.",
    exampleSentenceDeBlocks: [
      { text: "Schalten Sie", role: "verb_p1", order: 1 },
      { text: "den Strom", role: "subject", order: 2 },
      { text: "vor jeder Reparatur", role: "complement", order: 3 },
      { text: "immer aus.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "löten",
    exampleSentenceDe: "Der Techniker lötet Drähte auf Platinen.",
    exampleSentenceEs: "El técnico suelda cables en placas de circuitos.",
    exampleSentenceDeBlocks: [
      { text: "Der Techniker", role: "subject", order: 1 },
      { text: "lötet feine Drähte", role: "verb_p1", order: 2 },
      { text: "auf die Platine", role: "complement", order: 3 },
      { text: "sauber fest.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "isolieren",
    exampleSentenceDe: "Wir isolieren offene Kontakte mit Isolierband.",
    exampleSentenceEs: "Aislamos contactos al descubierto con cinta aislante.",
    exampleSentenceDeBlocks: [
      { text: "Wir isolieren", role: "verb_p1", order: 1 },
      { text: "die Kontakte", role: "subject", order: 2 },
      { text: "mit Isolierband", role: "complement", order: 3 },
      { text: "vollständig.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "abisolieren",
    exampleSentenceDe: "Mit der Zange isolieren wir Kabel ab.",
    exampleSentenceEs: "Con la pinza pelamos los cables.",
    exampleSentenceDeBlocks: [
      { text: "Mit der Zange", role: "complement", order: 1 },
      { text: "isoliert man", role: "verb_p1", order: 2 },
      { text: "das Kupferkabel", role: "subject", order: 3 },
      { text: "schnell ab.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "austauschen",
    exampleSentenceDe: "Wir tauschen die defekte Sicherung aus.",
    exampleSentenceEs: "Cambiamos el fusible defectuoso.",
    exampleSentenceDeBlocks: [
      { text: "Wir tauschen", role: "verb_p1", order: 1 },
      { text: "die Sicherung", role: "subject", order: 2 },
      { text: "im Kasten", role: "complement", order: 3 },
      { text: "sofort aus.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "einspeisen",
    exampleSentenceDe: "Die Anlage speist Solarstrom ins Netz ein.",
    exampleSentenceEs: "La instalación inyecta electricidad solar a la red.",
    exampleSentenceDeBlocks: [
      { text: "Die Anlage", role: "subject", order: 1 },
      { text: "speist Solarstrom", role: "verb_p1", order: 2 },
      { text: "in das Netz", role: "complement", order: 3 },
      { text: "verlässlich ein.", role: "verb_p2", order: 4 }
    ]
  },
  {
    de: "funktionieren",
    exampleSentenceDe: "Alle Module funktionieren einwandfrei und sicher.",
    exampleSentenceEs: "Todos los módulos funcionan de forma impecable y segura.",
    exampleSentenceDeBlocks: [
      { text: "Alle Module", role: "subject", order: 1 },
      { text: "funktionieren heute", role: "verb_p1", order: 2 },
      { text: "ohne Störung", role: "complement", order: 3 },
      { text: "einwandfrei.", role: "verb_p2", order: 4 }
    ]
  }
];

// Mapeo rápido por término 'de'
const mappingMap = new Map();
kapitel18Mappings.forEach(m => mappingMap.set(m.de, m));

// -------------------------------------------------------------
// FASE 1: ACTUALIZACIÓN DE src/data/chapters.jsx
// -------------------------------------------------------------
console.log('[FASE 1] Actualizando Kapitel 18 en src/data/chapters.jsx...');
const chaptersPath = path.join(__dirname, '..', 'src', 'data', 'chapters.jsx');
let chaptersContent = fs.readFileSync(chaptersPath, 'utf8');

const ch18TitleMarker = 'title: "Kapitel 18: Elektrotechnik & Solar"';
const ch18StartIdx = chaptersContent.indexOf(ch18TitleMarker);
if (ch18StartIdx === -1) {
  console.error('❌ ERROR: No se encontró el inicio de Kapitel 18');
  process.exit(1);
}

const ch19TitleMarker = 'title: "Kapitel 19: Pronomen & Deklinationen"';
const ch19StartIdx = chaptersContent.indexOf(ch19TitleMarker);
if (ch19StartIdx === -1) {
  console.error('❌ ERROR: No se encontró el inicio de Kapitel 19');
  process.exit(1);
}

// Extraer el trozo de capítulo 18
const ch18Chunk = chaptersContent.substring(ch18StartIdx, ch19StartIdx);
const wordsStartRel = ch18Chunk.indexOf('words: [');
const wordsEndRel = ch18Chunk.lastIndexOf(']');
if (wordsStartRel === -1 || wordsEndRel === -1) {
  console.error('❌ ERROR: No se pudo delimitar el array words de Kapitel 18');
  process.exit(1);
}

const wordsCode = ch18Chunk.substring(wordsStartRel, wordsEndRel + 1).replace(/^words:\s*/, '');
const existingWords = eval(wordsCode);

console.log(`  ✓ Se leyeron ${existingWords.length} palabras existentes en Kapitel 18.`);

let enrichedCount = 0;
// Actualizar o reordenar según corresponda
// Para mantener consistencia con la tabla y el temario, organizamos las palabras según el orden de kapitel18Mappings
const updatedWords = [];

kapitel18Mappings.forEach((mapItem, idx) => {
  const existing = existingWords.find(w => w.de === mapItem.de);
  if (!existing) {
    console.error(`❌ ERROR: No se encontró la palabra "${mapItem.de}" en chapters.jsx`);
    process.exit(1);
  }
  const enriched = {
    ...existing,
    exampleSentenceDe: mapItem.exampleSentenceDe,
    exampleSentenceEs: mapItem.exampleSentenceEs,
    exampleSentenceDeBlocks: mapItem.exampleSentenceDeBlocks
  };
  updatedWords.push(enriched);
  enrichedCount++;
});

console.log(`  ✓ ${enrichedCount} palabras enriquecidas con oraciones y bloques sintácticos.`);

// Formatear array de palabras limpiamente
function formatWordsArray(words) {
  const lines = ['words: ['];
  words.forEach((w, idx) => {
    lines.push('    {');
    lines.push(`      de: ${JSON.stringify(w.de)},`);
    lines.push(`      pron: ${JSON.stringify(w.pron)},`);
    lines.push(`      es: ${JSON.stringify(w.es)},`);
    lines.push(`      type: ${JSON.stringify(w.type)},`);
    lines.push(`      category: ${JSON.stringify(w.category)},`);
    if (w.plural !== undefined) {
      lines.push(`      plural: ${JSON.stringify(w.plural)},`);
    }
    if (w.regimen !== undefined) {
      lines.push(`      regimen: ${JSON.stringify(w.regimen)},`);
    }
    lines.push(`      exampleSentenceDe: ${JSON.stringify(w.exampleSentenceDe)},`);
    lines.push(`      exampleSentenceEs: ${JSON.stringify(w.exampleSentenceEs)},`);
    lines.push('      exampleSentenceDeBlocks: [');
    w.exampleSentenceDeBlocks.forEach((b, bIdx) => {
      const comma = bIdx < w.exampleSentenceDeBlocks.length - 1 ? ',' : '';
      lines.push(`        { text: ${JSON.stringify(b.text)}, role: ${JSON.stringify(b.role)}, order: ${b.order} }${comma}`);
    });
    lines.push('      ],');
    lines.push(`      en: ${JSON.stringify(w.en)}`);
    const wordComma = idx < words.length - 1 ? '    },' : '    }';
    lines.push(wordComma);
  });
  lines.push('  ]');
  return lines.join('\n');
}

const formattedWordsString = formatWordsArray(updatedWords);

const newCh18Chunk = ch18Chunk.substring(0, wordsStartRel) + formattedWordsString + ch18Chunk.substring(wordsEndRel + 1);
chaptersContent = chaptersContent.substring(0, ch18StartIdx) + newCh18Chunk + chaptersContent.substring(ch19StartIdx);

fs.writeFileSync(chaptersPath, chaptersContent, 'utf8');
console.log('  ✓ src/data/chapters.jsx actualizado y guardado.');

// -------------------------------------------------------------
// FASE 2: SINCRONIZACIÓN EN vocabulario_completo.json
// -------------------------------------------------------------
console.log('\n[FASE 2] Sincronizando vocabulario_completo.json...');
const vocabPath = path.join(__dirname, '..', 'vocabulario_completo.json');
let vocabList = [];
if (fs.existsSync(vocabPath)) {
  vocabList = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
}

let vocabAdded = 0;
let vocabUpdated = 0;

updatedWords.forEach(w => {
  const safeId = getSafeId(w.de);
  const vocabItem = {
    id: safeId,
    word: w.de,
    exampleSentenceDe: w.exampleSentenceDe,
    exampleSentenceEs: w.exampleSentenceEs,
    exampleSentenceDeBlocks: w.exampleSentenceDeBlocks
  };

  const existingIdx = vocabList.findIndex(v => v.id === safeId || v.word === w.de);
  if (existingIdx !== -1) {
    vocabList[existingIdx] = vocabItem;
    vocabUpdated++;
  } else {
    vocabList.push(vocabItem);
    vocabAdded++;
  }
});

fs.writeFileSync(vocabPath, JSON.stringify(vocabList, null, 2), 'utf8');
console.log(`  ✓ vocabulario_completo.json sincronizado: ${vocabAdded} añadidos, ${vocabUpdated} actualizados.`);
console.log(`  ✓ Total entradas en vocabulario_completo.json: ${vocabList.length}`);

// -------------------------------------------------------------
// FASE 3: GENERACIÓN DE TABLA docs/kapitel_18_elektrotechnik_solar_tabelle.md
// -------------------------------------------------------------
console.log('\n[FASE 3] Generando docs/kapitel_18_elektrotechnik_solar_tabelle.md...');
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

let mdContent = `# ⚡ Kapitel 18: Elektrotechnik & Solar
### Glosario Técnico de Instalaciones Eléctricas y Energía Solar Fotovoltaica (A1/A2)

> **Total de Entradas Técnicas:** 50 términos normativos y prácticos con fonética adaptada al español, categorización técnica, especificación gramatical y oraciones contextualizadas en montaje, conexionado y mantenimiento de sistemas fotovoltaicos y cuadros eléctricos.

| # | Deutsch mit Artikel | Lautschrift (Pronunciación) | Spanisch | Wortart | Kategorie | Spezifikation / Rektion | Beispielsatz Deutsch | Beispielsatz Spanisch |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

updatedWords.forEach((w, idx) => {
  const num = idx + 1;
  const de = w.de.replace(/\|/g, '\\|');
  const pron = w.pron.replace(/\|/g, '\\|');
  const es = w.es.replace(/\|/g, '\\|');
  const type = w.type.replace(/\|/g, '\\|');
  const cat = w.category.replace(/\|/g, '\\|');
  const spec = (w.regimen || (w.plural && w.plural !== '-' ? `Pl: ${w.plural}` : '-')).replace(/\|/g, '\\|');
  const deEx = w.exampleSentenceDe.replace(/\|/g, '\\|');
  const esEx = w.exampleSentenceEs.replace(/\|/g, '\\|');

  mdContent += `| ${num} | **${de}** | *${pron}* | ${es} | \`${type}\` | ${cat} | ${spec} | ${deEx} | ${esEx} |\n`;
});

const docPath = path.join(docsDir, 'kapitel_18_elektrotechnik_solar_tabelle.md');
fs.writeFileSync(docPath, mdContent, 'utf8');
console.log('  ✓ Tabla generada exitosamente en docs/kapitel_18_elektrotechnik_solar_tabelle.md');

console.log('\n🚀 Actualización de Kapitel 18 finalizada con éxito.');
