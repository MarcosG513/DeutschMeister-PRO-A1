/**
 * scripts/inject_kapitel_20_tools.cjs
 *
 * Inyección Oficial de Kapitel 20: Werkzeuge & Material (Elektro & PV)
 * 125 términos técnicos de Enpal Academy con esquema estricto de 11 propiedades:
 * de, pron, es, type, category, plural, regimen, exampleSentenceDe, exampleSentenceEs,
 * exampleSentenceDeBlocks, en.
 */

const fs = require('fs');
const path = require('path');

// Helper para calcular ID Base64 URL-safe idéntico a getSafeId de helpers.js
function getSafeId(str) {
  return Buffer.from(encodeURIComponent(str)).toString('base64').replace(/[\/+=]/g, '_');
}

// 125 TÉRMINOS TÉCNICOS OFICIALES (ENPAL AC / ACM)
const tools125 = [
  // 1. Equipos de Protección Individual (PSA / Arbeitsschutz) [Ítems 1-9]
  {
    de: "die Isolierhandschuhe VDE (bis 1000 V)",
    pron: "di i-zo-lía-jant-shu-e",
    es: "guantes aislantes hasta 1000 V",
    type: "Sustantivo (Plural)",
    category: "PSA",
    plural: "die Isolierhandschuhe",
    regimen: "VDE bis 1000 V",
    exampleSentenceDe: "Ich trage die Isolierhandschuhe beim Einsetzen der NH-Sicherung.",
    exampleSentenceEs: "Llevo los guantes aislantes al insertar el fusible NH.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "trage", role: "verb_p1", order: 2 },
      { text: "die Isolierhandschuhe", role: "complement", order: 3 },
      { text: "beim Einsetzen der NH-Sicherung", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric orange rubber VDE dielectric insulated gloves"
  },
  {
    de: "die Isoliermatte (Isoliertermatte)",
    pron: "di i-zo-lía-má-te",
    es: "alfombra aislante dieléctrica",
    type: "Sustantivo (Fem)",
    category: "PSA",
    plural: "die Isoliermatten",
    regimen: "VDE 0680-1",
    exampleSentenceDe: "Die Isoliermatte liegt vor dem Zählerschrank auf dem Boden.",
    exampleSentenceEs: "La alfombra aislante está en el suelo frente al armario del contador.",
    exampleSentenceDeBlocks: [
      { text: "Die Isoliermatte", role: "subject", order: 1 },
      { text: "liegt", role: "verb_p1", order: 2 },
      { text: "vor dem Zählerschrank", role: "complement", order: 3 },
      { text: "auf dem Boden", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric rolled grey dielectric rubber safety mat with yellow line"
  },
  {
    de: "die Griffstulpe (NH)",
    pron: "di gríf-shtul-pe",
    es: "manopla de extracción de fusibles NH",
    type: "Sustantivo (Fem)",
    category: "PSA",
    plural: "die Griffstulpen",
    regimen: "DIN VDE 0636",
    exampleSentenceDe: "Mit der Griffstulpe ziehe ich die NH-Sicherung sicher heraus.",
    exampleSentenceEs: "Con la manopla de extracción saco el fusible NH con seguridad.",
    exampleSentenceDeBlocks: [
      { text: "Mit der Griffstulpe", role: "complement", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "ich die NH-Sicherung sicher", role: "subject", order: 3 },
      { text: "heraus", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric red leather NH fuse puller glove handle with mechanical shield"
  },
  {
    de: "das Visier",
    pron: "das vi-zía",
    es: "pantalla facial de protección",
    type: "Sustantivo (Neutro)",
    category: "PSA",
    plural: "die Visiere",
    regimen: "Lichtbogenschutz",
    exampleSentenceDe: "Das Visier schützt mein Gesicht vor einem Lichtbogen.",
    exampleSentenceEs: "La pantalla facial protege mi rostro contra un arco eléctrico.",
    exampleSentenceDeBlocks: [
      { text: "Das Visier", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "mein Gesicht", role: "complement", order: 3 },
      { text: "vor einem Lichtbogen", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric transparent arc-flash polycarbonate safety face shield visor"
  },
  {
    de: "der Helm",
    pron: "dea jelm",
    es: "casco de seguridad rígido",
    type: "Sustantivo (Masc)",
    category: "PSA",
    plural: "die Helme",
    regimen: "DIN EN 397",
    exampleSentenceDe: "Auf der Baustelle trage ich immer den weißen Helm.",
    exampleSentenceEs: "En la obra siempre llevo el casco blanco.",
    exampleSentenceDeBlocks: [
      { text: "Auf der Baustelle", role: "complement", order: 1 },
      { text: "trage", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "immer den weißen Helm", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric white industrial construction hard hat safety helmet"
  },
  {
    de: "der Schutzhandschuh",
    pron: "dea shúts-jant-shu",
    es: "guante de protección mecánica",
    type: "Sustantivo (Masc)",
    category: "PSA",
    plural: "die Schutzhandschuhe",
    regimen: "EN 388 (Schnittschutz)",
    exampleSentenceDe: "Die Schutzhandschuhe schützen vor scharfen Blechkanten.",
    exampleSentenceEs: "Los guantes de protección protegen contra bordes de chapa afilados.",
    exampleSentenceDeBlocks: [
      { text: "Die Schutzhandschuhe", role: "subject", order: 1 },
      { text: "schützen", role: "verb_p1", order: 2 },
      { text: "vor scharfen Blechkanten", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric blue and black coated mechanic assembly work gloves"
  },
  {
    de: "die Schutzbrille",
    pron: "di shúts-brí-le",
    es: "gafas de protección envolventes",
    type: "Sustantivo (Fem)",
    category: "PSA",
    plural: "die Schutzbrillen",
    regimen: "DIN EN 166",
    exampleSentenceDe: "Beim Bohren setze ich die Schutzbrille auf.",
    exampleSentenceEs: "Al taladrar me pongo las gafas de protección.",
    exampleSentenceDeBlocks: [
      { text: "Beim Bohren", role: "complement", order: 1 },
      { text: "setze", role: "verb_p1", order: 2 },
      { text: "ich die Schutzbrille", role: "subject", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric clear safety goggles with elastic strap"
  },
  {
    de: "die Sicherheitsschuhe",
    pron: "di zí-jea-jaits-shú-e",
    es: "zapatos de seguridad S3",
    type: "Sustantivo (Plural)",
    category: "PSA",
    plural: "die Sicherheitsschuhe",
    regimen: "Klasse S3 (Stahlkappe)",
    exampleSentenceDe: "Meine Sicherheitsschuhe haben eine Stahlkappe und durchtrittsichere Sohlen.",
    exampleSentenceEs: "Mis zapatos de seguridad tienen puntera de acero y suela antiperforación.",
    exampleSentenceDeBlocks: [
      { text: "Meine Sicherheitsschuhe", role: "subject", order: 1 },
      { text: "haben", role: "verb_p1", order: 2 },
      { text: "eine Stahlkappe", role: "complement", order: 3 },
      { text: "und durchtrittsichere Sohlen", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric sturdy black work safety boots with reinforced toe"
  },
  {
    de: "der Gehörschutz",
    pron: "dea gue-jör-shuts",
    es: "protección auditiva / orejeras",
    type: "Sustantivo (Masc)",
    category: "PSA",
    plural: "-",
    regimen: "DIN EN 352",
    exampleSentenceDe: "Beim Meißeln brauche ich einen Gehörschutz.",
    exampleSentenceEs: "Al picar con el cincel necesito protección auditiva.",
    exampleSentenceDeBlocks: [
      { text: "Beim Meißeln", role: "complement", order: 1 },
      { text: "brauche", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "einen Gehörschutz", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric blue acoustic earmuffs hearing protection"
  },

  // 2. Medición y Verificación (Mess- & Prüfgeräte) [Ítems 10-17]
  {
    de: "der Spannungsprüfer / Duspol",
    pron: "dea shpá-nungs-prü-fa / dús-pol",
    es: "comprobador de tensión bipolar (Duspol)",
    type: "Sustantivo (Masc)",
    category: "Messgeräte",
    plural: "die Spannungsprüfer",
    regimen: "5 Sicherheitsregeln",
    exampleSentenceDe: "Ich stelle die Spannungsfreiheit mit dem Duspol fest.",
    exampleSentenceEs: "Compruebo la ausencia de tensión con el Duspol.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "stelle", role: "verb_p1", order: 2 },
      { text: "die Spannungsfreiheit mit dem Duspol", role: "complement", order: 3 },
      { text: "fest", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric two-pole voltage tester Duspol with probe pins and LED display"
  },
  {
    de: "das Fluke-Messgerät",
    pron: "das flúk-més-gue-ret",
    es: "equipo de medición multifunción Fluke",
    type: "Sustantivo (Neutro)",
    category: "Messgeräte",
    plural: "die Fluke-Messgeräte",
    regimen: "DIN VDE 0100-600",
    exampleSentenceDe: "Wir messen die Schleifenimpedanz mit dem Fluke-Messgerät.",
    exampleSentenceEs: "Medimos la impedancia de bucle con el equipo de medición Fluke.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "messen", role: "verb_p1", order: 2 },
      { text: "die Schleifenimpedanz", role: "complement", order: 3 },
      { text: "mit dem Fluke-Messgerät", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric yellow Fluke multifunction installation tester device"
  },
  {
    de: "der Wallbox-Messadapter",
    pron: "dea vól-boks-més-a-dáp-ta",
    es: "adaptador de medición para Wallbox Tipo 2",
    type: "Sustantivo (Masc)",
    category: "Messgeräte",
    plural: "die Wallbox-Messadapter",
    regimen: "Typ 2 Mennekes",
    exampleSentenceDe: "Der Wallbox-Messadapter simuliert ein Elektroauto beim Test.",
    exampleSentenceEs: "El adaptador de medición simula un coche eléctrico durante la prueba.",
    exampleSentenceDeBlocks: [
      { text: "Der Wallbox-Messadapter", role: "subject", order: 1 },
      { text: "simuliert", role: "verb_p1", order: 2 },
      { text: "ein Elektroauto", role: "complement", order: 3 },
      { text: "beim Test", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric EV charging test adapter with Type 2 Mennekes plug"
  },
  {
    de: "der RJ45-Kabeltester",
    pron: "dea er-yót-fünf-unt-fía-tsij-ká-bel-tes-ta",
    es: "probador de cables de red RJ45",
    type: "Sustantivo (Masc)",
    category: "Messgeräte",
    plural: "die Kabeltester",
    regimen: "LAN / Modbus RS485",
    exampleSentenceDe: "Der RJ45-Kabeltester prüft alle acht Adern auf Durchgang.",
    exampleSentenceEs: "El probador de cables RJ45 comprueba la continuidad de los ocho hilos.",
    exampleSentenceDeBlocks: [
      { text: "Der RJ45-Kabeltester", role: "subject", order: 1 },
      { text: "prüft", role: "verb_p1", order: 2 },
      { text: "alle acht Adern", role: "complement", order: 3 },
      { text: "auf Durchgang", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric handheld network LAN cable continuity tester with green LED lights"
  },
  {
    de: "das Leitungsortungsgerät",
    pron: "das lái-tungs-ór-tungs-gue-ret",
    es: "detector digital de tuberías y cables",
    type: "Sustantivo (Neutro)",
    category: "Messgeräte",
    plural: "die Leitungsortungsgeräte",
    regimen: "Wandscanner",
    exampleSentenceDe: "Vor dem Bohren scanne ich die Wand mit dem Leitungsortungsgerät.",
    exampleSentenceEs: "Antes de taladrar escaneo la pared con el detector de cables.",
    exampleSentenceDeBlocks: [
      { text: "Vor dem Bohren", role: "complement", order: 1 },
      { text: "scanne", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "die Wand mit dem Leitungsortungsgerät", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric digital wall scanner stud detector with screen"
  },
  {
    de: "der Netztester LTE",
    pron: "dea néts-tes-ta el-te-é",
    es: "comprobador de señal móvil 4G/LTE",
    type: "Sustantivo (Masc)",
    category: "Messgeräte",
    plural: "die Netztester",
    regimen: "Mobilfunk-Signal",
    exampleSentenceDe: "Mit dem Netztester LTE prüfen wir den Empfang für den Wechselrichter.",
    exampleSentenceEs: "Con el comprobador LTE verificamos la cobertura para el inversor.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Netztester LTE", role: "complement", order: 1 },
      { text: "prüfen", role: "verb_p1", order: 2 },
      { text: "wir", role: "subject", order: 3 },
      { text: "den Empfang für den Wechselrichter", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric handheld cellular signal strength tester with external antenna"
  },
  {
    de: "der CTS-Messwandler",
    pron: "dea tse-te-és-més-vánt-la",
    es: "transformador de corriente toroidal (CT)",
    type: "Sustantivo (Masc)",
    category: "Messgeräte",
    plural: "die CTS-Messwandler",
    regimen: "Smart Meter / Enwitec",
    exampleSentenceDe: "Der CTS-Messwandler misst den Stromfluss der drei Phasen berührungslos.",
    exampleSentenceEs: "El transformador CT mide el flujo de corriente de las tres fases sin contacto.",
    exampleSentenceDeBlocks: [
      { text: "Der CTS-Messwandler", role: "subject", order: 1 },
      { text: "misst", role: "verb_p1", order: 2 },
      { text: "den Stromfluss der drei Phasen", role: "complement", order: 3 },
      { text: "berührungslos", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric split-core current transformer clamp CT for smart meter"
  },
  {
    de: "der Messadapter-Wechselrichter",
    pron: "dea més-a-dáp-ta-vék-sel-rij-ta",
    es: "adaptador de prueba para inversor solar",
    type: "Sustantivo (Masc)",
    category: "Messgeräte",
    plural: "die Messadapter",
    regimen: "PV-Inverter Test",
    exampleSentenceDe: "Wir schließen den Messadapter an den Wechselrichter an.",
    exampleSentenceEs: "Conectamos el adaptador de prueba al inversor.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "schließen", role: "verb_p1", order: 2 },
      { text: "den Messadapter an den Wechselrichter", role: "complement", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric solar inverter test adapter plug connector with lead wires"
  },

  // 3. Herramientas a Batería y Perforación (Elektrowerkzeuge) [Ítems 18-26]
  {
    de: "der Akkuschrauber",
    pron: "dea á-ku-shráu-ba",
    es: "atornillador a batería",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Akkuschrauber",
    regimen: "Drehmoment einstellbar",
    exampleSentenceDe: "Mit dem Akkuschrauber befestige ich die Kabelkanäle.",
    exampleSentenceEs: "Con el atornillador a batería fijo las canaletas de cables.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Akkuschrauber", role: "complement", order: 1 },
      { text: "befestige", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "die Kabelkanäle", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric cordless battery drill screwdriver with battery pack"
  },
  {
    de: "das Bit-Set",
    pron: "das bít-set",
    es: "juego de puntas de atornillar",
    type: "Sustantivo (Neutro)",
    category: "Handwerkzeuge",
    plural: "die Bit-Sets",
    regimen: "Torx / Pozidriv / Schlitz",
    exampleSentenceDe: "Das Bit-Set enthält Torx- und Kreuzschlitz-Bits.",
    exampleSentenceEs: "El juego de puntas contiene puntas Torx y Pozidriv.",
    exampleSentenceDeBlocks: [
      { text: "Das Bit-Set", role: "subject", order: 1 },
      { text: "enthält", role: "verb_p1", order: 2 },
      { text: "Torx- und Kreuzschlitz-Bits", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric compact screwdriver bit case set with magnetic holder"
  },
  {
    de: "das Bit",
    pron: "das bit",
    es: "punta de atornillar 1/4\"",
    type: "Sustantivo (Neutro)",
    category: "Handwerkzeuge",
    plural: "die Bits",
    regimen: "1/4 Zoll Sechskant",
    exampleSentenceDe: "Ich setze das Torx-Bit in den Bithalter ein.",
    exampleSentenceEs: "Inserto la punta Torx en el portapuntas.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "setze", role: "verb_p1", order: 2 },
      { text: "das Torx-Bit in den Bithalter", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric steel Torx screwdriver bit with hexagonal base"
  },
  {
    de: "die Bitverlängerung",
    pron: "di bít-fea-léng-e-rung",
    es: "prolongador imantado para puntas",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Bitverlängerungen",
    regimen: "Magnethalter",
    exampleSentenceDe: "Für tiefe Schrauben nutze ich die Bitverlängerung.",
    exampleSentenceEs: "Para tornillos profundos uso el prolongador de puntas.",
    exampleSentenceDeBlocks: [
      { text: "Für tiefe Schrauben", role: "complement", order: 1 },
      { text: "nutze", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "die Bitverlängerung", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric magnetic bit extension bar rod"
  },
  {
    de: "der Akku-Bohrhammer",
    pron: "dea á-ku-bóa-ja-ma",
    es: "martillo perforador a batería (SDS-Plus)",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Akku-Bohrhämmer",
    regimen: "SDS-Plus Aufnahme",
    exampleSentenceDe: "Der Akku-Bohrhammer bohrt mühelos Löcher in Beton.",
    exampleSentenceEs: "El martillo perforador a batería taladra sin esfuerzo agujeros en hormigón.",
    exampleSentenceDeBlocks: [
      { text: "Der Akku-Bohrhammer", role: "subject", order: 1 },
      { text: "bohrt", role: "verb_p1", order: 2 },
      { text: "mühelos Löcher", role: "complement", order: 3 },
      { text: "in Beton", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric heavy duty cordless rotary hammer drill with SDS-plus chuck"
  },
  {
    de: "das Akku-Ladegerät",
    pron: "das á-ku-lá-de-gue-ret",
    es: "cargador rápido de batería",
    type: "Sustantivo (Neutro)",
    category: "Handwerkzeuge",
    plural: "die Akku-Ladegeräte",
    regimen: "Schnellladegerät",
    exampleSentenceDe: "Ich stecke den leeren Akku in das Akku-Ladegerät.",
    exampleSentenceEs: "Enchufo la batería vacía en el cargador.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "stecke", role: "verb_p1", order: 2 },
      { text: "den leeren Akku", role: "complement", order: 3 },
      { text: "in das Akku-Ladegerät", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric fast desktop battery charging dock station with LED light"
  },
  {
    de: "der Bohrer",
    pron: "dea bóa-ra",
    es: "broca para mampostería/metal",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Bohrer",
    regimen: "Steinbohrer / Metallbohrer",
    exampleSentenceDe: "Ich nehme einen Sechser-Bohrer für den Dübel.",
    exampleSentenceEs: "Tomo una broca del seis para el taco.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "nehme", role: "verb_p1", order: 2 },
      { text: "einen Sechser-Bohrer", role: "complement", order: 3 },
      { text: "für den Dübel", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric spiral masonry drill bit with carbide tip"
  },
  {
    de: "der Stufenbohrer",
    pron: "dea shtú-fen-bóa-ra",
    es: "broca cónica escalonada",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Stufenbohrer",
    regimen: "M12 bis M40",
    exampleSentenceDe: "Mit dem Stufenbohrer bohre ich saubere Löcher für Kabelverschraubungen.",
    exampleSentenceEs: "Con la broca escalonada taladro agujeros limpios para prensaestopas.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Stufenbohrer", role: "complement", order: 1 },
      { text: "bohre", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "saubere Löcher für Kabelverschraubungen", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric stepped conical spiral cone drill bit tool"
  },
  {
    de: "der Winkelschleifer",
    pron: "dea vín-kel-shlái-fa",
    es: "amoladora angular (radial)",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Winkelschleifer",
    regimen: "Trennscheibe 125 mm",
    exampleSentenceDe: "Der Winkelschleifer schneidet die Metallschiene schnell ab.",
    exampleSentenceEs: "La amoladora angular corta la pletina de metal rápidamente.",
    exampleSentenceDeBlocks: [
      { text: "Der Winkelschleifer", role: "subject", order: 1 },
      { text: "schneidet", role: "verb_p1", order: 2 },
      { text: "die Metallschiene schnell", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric cordless handheld angle grinder with disc guard"
  },

  // 4. Destornilladores, Alicates, Corte y Prensado [Ítems 27-45]
  {
    de: "der Schraubendreher",
    pron: "dea shráu-ben-dre-a",
    es: "destornillador aislado VDE",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Schraubendreher",
    regimen: "VDE 1000 V",
    exampleSentenceDe: "Der Elektriker nutzt einen isolierten Schraubendreher.",
    exampleSentenceEs: "El electricista utiliza un destornillador aislado.",
    exampleSentenceDeBlocks: [
      { text: "Der Elektriker", role: "subject", order: 1 },
      { text: "nutzt", role: "verb_p1", order: 2 },
      { text: "einen isolierten Schraubendreher", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric yellow and red insulated VDE electrical screwdriver"
  },
  {
    de: "der Schraubendreher SL-PZ2",
    pron: "dea shráu-ben-dre-a es-el-pe-tset-tsvai",
    es: "destornillador PlusMinus SL/PZ2 para automáticos",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Schraubendreher SL-PZ2",
    regimen: "Kombiprofil PlusMinus",
    exampleSentenceDe: "Der SL-PZ2 Schraubendreher passt perfekt auf Sicherungsautomaten.",
    exampleSentenceEs: "El destornillador SL-PZ2 encaja perfectamente en los interruptores automáticos.",
    exampleSentenceDeBlocks: [
      { text: "Der SL-PZ2 Schraubendreher", role: "subject", order: 1 },
      { text: "passt", role: "verb_p1", order: 2 },
      { text: "perfekt auf Sicherungsautomaten", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric PlusMinus SL PZ2 terminal block screwdriver"
  },
  {
    de: "der Sechskant-Schraubendreher",
    pron: "dea zéjs-kant-shráu-ben-dre-a",
    es: "destornillador hexagonal (tipo Allen)",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Sechskant-Schraubendreher",
    regimen: "Inbus / Hex",
    exampleSentenceDe: "Mit dem Sechskant-Schraubendreher ziehe ich die HLAK-Klemmen an.",
    exampleSentenceEs: "Con el destornillador hexagonal aprieto los bornes del HLAK.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Sechskant-Schraubendreher", role: "complement", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "ich die HLAK-Klemmen", role: "subject", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric hex Allen ball-end insulated screwdriver"
  },
  {
    de: "die automatische Abisolierzange",
    pron: "di au-to-má-ti-she áp-i-zo-lía-tsang-e",
    es: "pelacables automático de pistola",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die automatischen Abisolierzangen",
    regimen: "0,5 - 10 mm²",
    exampleSentenceDe: "Die automatische Abisolierzange entfernt die Aderisolierung sekundenschnell.",
    exampleSentenceEs: "El pelacables automático retira el aislamiento del conductor en segundos.",
    exampleSentenceDeBlocks: [
      { text: "Die automatische Abisolierzange", role: "subject", order: 1 },
      { text: "entfernt", role: "verb_p1", order: 2 },
      { text: "die Aderisolierung", role: "complement", order: 3 },
      { text: "sekundenschnell", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric pistol-grip automatic wire cable stripper pliers"
  },
  {
    de: "die Abisolierzange",
    pron: "di áp-i-zo-lía-tsang-e",
    es: "alicate pelacables manual regulable",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Abisolierzangen",
    regimen: "VDE mit Stellschraube",
    exampleSentenceDe: "Ich stelle die Schraube der Abisolierzange auf den Aderquerschnitt ein.",
    exampleSentenceEs: "Ajusto el tornillo del alicate pelacables a la sección del conductor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "stelle", role: "verb_p1", order: 2 },
      { text: "die Schraube der Abisolierzange auf den Aderquerschnitt", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric VDE manual wire stripper pliers with adjusting screw"
  },
  {
    de: "der Kabelentmantler",
    pron: "dea ká-bel-ent-mánt-la",
    es: "desenvainador cilíndrico de cables",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Kabelentmantler",
    regimen: "z.B. Jokari / Cimco",
    exampleSentenceDe: "Mit dem Kabelentmantler entferne ich den Außenmantel des NYM-Kabels.",
    exampleSentenceEs: "Con el desenvainador retiro la cubierta exterior del cable NYM.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Kabelentmantler", role: "complement", order: 1 },
      { text: "entferne", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "den Außenmantel des NYM-Kabels", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric cylindrical pocket cable dismantling tool"
  },
  {
    de: "das Jokari-Kabelmesser",
    pron: "das yo-ká-ri-ká-bel-me-sa",
    es: "cuchillo pelacables Jokari con uña guía",
    type: "Sustantivo (Neutro)",
    category: "Handwerkzeuge",
    plural: "die Jokari-Kabelmesser",
    regimen: "Schleppklinge",
    exampleSentenceDe: "Das Jokari-Kabelmesser schneidet den Kabelmantel längs auf.",
    exampleSentenceEs: "El cuchillo Jokari rasga la cubierta del cable longitudinalmente.",
    exampleSentenceDeBlocks: [
      { text: "Das Jokari-Kabelmesser", role: "subject", order: 1 },
      { text: "schneidet", role: "verb_p1", order: 2 },
      { text: "den Kabelmantel längs", role: "complement", order: 3 },
      { text: "auf", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric red Jokari cable stripping knife with hooked guide bracket"
  },
  {
    de: "die Plombenzange",
    pron: "di plóm-ben-tsang-e",
    es: "alicate para prensar precintos de contador",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Plombenzangen",
    regimen: "Zählerplombierung",
    exampleSentenceDe: "Nach der Montage verplombe ich den Zähler mit der Plombenzange.",
    exampleSentenceEs: "Tras el montaje precinto el contador con el alicate de precintos.",
    exampleSentenceDeBlocks: [
      { text: "Nach der Montage", role: "complement", order: 1 },
      { text: "verplombe", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "den Zähler mit der Plombenzange", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric sealing pliers for lead security seals"
  },
  {
    de: "die Kabelschere mit Doppelschneide",
    pron: "di ká-bel-she-re mit dóp-pel-shnái-de",
    es: "tijera cortacables de doble filo",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Kabelscheren",
    regimen: "Quetschfreier Schnitt",
    exampleSentenceDe: "Die Kabelschere mit Doppelschneide trennt dicke Kupferleiter ohne Quetschen.",
    exampleSentenceEs: "La tijera cortacables de doble filo corta conductores gruesos sin aplastar.",
    exampleSentenceDeBlocks: [
      { text: "Die Kabelschere mit Doppelschneide", role: "subject", order: 1 },
      { text: "trennt", role: "verb_p1", order: 2 },
      { text: "dicke Kupferleiter", role: "complement", order: 3 },
      { text: "ohne Quetschen", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric heavy duty double-edge cable shears cutters"
  },
  {
    de: "der Seitenschneider",
    pron: "dea zái-ten-shnái-da",
    es: "alicate de corte diagonal VDE",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Seitenschneider",
    regimen: "VDE 1000 V",
    exampleSentenceDe: "Ich schneide die Kabelbinder bündig mit dem Seitenschneider ab.",
    exampleSentenceEs: "Corto las bridas al ras con el alicate de corte diagonal.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schneide", role: "verb_p1", order: 2 },
      { text: "die Kabelbinder bündig mit dem Seitenschneider", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric red-yellow insulated diagonal cutting pliers"
  },
  {
    de: "die Crimpzange (6-kant)",
    pron: "di krímp-tsang-e zéjs-kant",
    es: "crimpadora hexagonal autoajustable",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Crimpzangen",
    regimen: "Aderendhülsen 0,08-16 mm²",
    exampleSentenceDe: "Die 6-kant Crimpzange presst die Aderendhülse perfekt rund.",
    exampleSentenceEs: "La crimpadora hexagonal prensa la puntera perfectamente redonda.",
    exampleSentenceDeBlocks: [
      { text: "Die 6-kant Crimpzange", role: "subject", order: 1 },
      { text: "presst", role: "verb_p1", order: 2 },
      { text: "die Aderendhülse", role: "complement", order: 3 },
      { text: "perfekt rund", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric self-adjusting hexagonal wire ferrule crimping tool"
  },
  {
    de: "die Presszange (4-kant)",
    pron: "di prés-tsang-e fía-kant",
    es: "pinza de engaste cuadrado",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Presszangen",
    regimen: "Quadratische Pressung",
    exampleSentenceDe: "Mit der 4-kant Presszange presse ich die Aderendhülsen für Reihenklemmen.",
    exampleSentenceEs: "Con la pinza de engaste cuadrado prenso las punteras para bornas de carril.",
    exampleSentenceDeBlocks: [
      { text: "Mit der 4-kant Presszange", role: "complement", order: 1 },
      { text: "presse", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "die Aderendhülsen für Reihenklemmen", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric square profile ferrule crimper pliers"
  },
  {
    de: "die Klauke-Presszange",
    pron: "di kláu-ke-prés-tsang-e",
    es: "tenaza de prensar Klauke para terminales tubulares",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Klauke-Presszangen",
    regimen: "Rohrkabelschuhe 10-70 mm²",
    exampleSentenceDe: "Für den 16 mm² Erdungskabelschuh verwende ich die Klauke-Presszange.",
    exampleSentenceEs: "Para el terminal de tierra de 16 mm² utilizo la tenaza Klauke.",
    exampleSentenceDeBlocks: [
      { text: "Für den 16 mm² Erdungskabelschuh", role: "complement", order: 1 },
      { text: "verwende", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "die Klauke-Presszange", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric heavy mechanical Klauke tubular lug crimper with long handles"
  },
  {
    de: "der Inbusschlüssel",
    pron: "dea ín-bus-shlú-sel",
    es: "llave Allen (hexagonal en L)",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Inbusschlüssel",
    regimen: "Sechskant metrisch",
    exampleSentenceDe: "Ich ziehe die Gehäuseschrauben mit dem Inbusschlüssel fest.",
    exampleSentenceEs: "Aprieto los tornillos de la carcasa con la llave Allen.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "die Gehäuseschrauben mit dem Inbusschlüssel", role: "complement", order: 3 },
      { text: "fest", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric L-shaped hex key Allen wrench set"
  },
  {
    de: "der Ratschen-Ringmaulschlüssel",
    pron: "dea rát-shen-ríng-maul-shlú-sel",
    es: "llave combinada plana con carraca",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Ratschen-Ringmaulschlüssel",
    regimen: "Feinverzahnt",
    exampleSentenceDe: "Der Ratschen-Ringmaulschlüssel beschleunigt die Montage im Zählerschrank.",
    exampleSentenceEs: "La llave combinada con carraca acelera el montaje en el armario del contador.",
    exampleSentenceDeBlocks: [
      { text: "Der Ratschen-Ringmaulschlüssel", role: "subject", order: 1 },
      { text: "beschleunigt", role: "verb_p1", order: 2 },
      { text: "die Montage", role: "complement", order: 3 },
      { text: "im Zählerschrank", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric chrome combination ratcheting spanner wrench"
  },
  {
    de: "der Hammer",
    pron: "dea já-ma",
    es: "martillo de cerrajero con mango de madera",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Hämmer",
    regimen: "DIN 1041 (300 g)",
    exampleSentenceDe: "Ich schlage die Nagelschellen mit dem Hammer ein.",
    exampleSentenceEs: "Clavo las grapas de clavo con el martillo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schlage", role: "verb_p1", order: 2 },
      { text: "die Nagelschellen mit dem Hammer", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric steel machinist hammer with wooden handle"
  },
  {
    de: "der Gummihammer",
    pron: "dea gú-mi-ja-ma",
    es: "martillo / maza de goma",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Gummihämmer",
    regimen: "Schonhammer",
    exampleSentenceDe: "Mit dem Gummihammer drücke ich den Kabelkanaldeckel schonend fest.",
    exampleSentenceEs: "Con el martillo de goma encajo la tapa de la canaleta sin dañarla.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Gummihammer", role: "complement", order: 1 },
      { text: "drücke", role: "verb_p1", order: 2 },
      { text: "ich den Kabelkanaldeckel schonend", role: "subject", order: 3 },
      { text: "fest", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric black rubber mallet hammer tool"
  },
  {
    de: "die Rundzange",
    pron: "di rúnt-tsang-e",
    es: "alicate de puntas redondas aisladas",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Rundzangen",
    regimen: "VDE 1000 V",
    exampleSentenceDe: "Mit der Rundzange biege ich Ösen an starre Kupferdrähte.",
    exampleSentenceEs: "Con el alicate de punta redonda doblo ojales en cables de cobre rígidos.",
    exampleSentenceDeBlocks: [
      { text: "Mit der Rundzange", role: "complement", order: 1 },
      { text: "biege", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "Ösen an starre Kupferdrähte", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric round nose electrical wire bending pliers"
  },
  {
    de: "der Elektroseitenschneider",
    pron: "dea e-lék-tro-zái-ten-shnái-da",
    es: "alicate de corte lateral de precisión para electricista",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Elektroseitenschneider",
    regimen: "Präzisions-VDE",
    exampleSentenceDe: "Der Elektroseitenschneider kappt dünne Datenleitungen sauber.",
    exampleSentenceEs: "El cortacables de precisión corta cables finos de datos limpiamente.",
    exampleSentenceDeBlocks: [
      { text: "Der Elektroseitenschneider", role: "subject", order: 1 },
      { text: "kappt", role: "verb_p1", order: 2 },
      { text: "dünne Datenleitungen", role: "complement", order: 3 },
      { text: "sauber", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric precision electronic flush wire cutter pliers"
  },

  // 5. Instrumentos de Medición Manual, Trazado y Sierras [Ítems 46-53]
  {
    de: "die Wasserwaage",
    pron: "di vás-sa-va-gue",
    es: "nivel de burbuja de aluminio",
    type: "Sustantivo (Fem)",
    category: "Messwerkzeuge",
    plural: "die Wasserwaagen",
    regimen: "Horizontale / Vertikale Libelle",
    exampleSentenceDe: "Ich richte den Verteilerkasten mit der Wasserwaage waagerecht aus.",
    exampleSentenceEs: "Nivelo el cuadro de distribución horizontalmente con el nivel de burbuja.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "richte", role: "verb_p1", order: 2 },
      { text: "den Verteilerkasten mit der Wasserwaage waagerecht", role: "complement", order: 3 },
      { text: "aus", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric yellow aluminum bubble spirit level"
  },
  {
    de: "der Zollstock",
    pron: "dea tsól-shtok",
    es: "metro plegable de madera (2 m)",
    type: "Sustantivo (Masc)",
    category: "Messwerkzeuge",
    plural: "die Zollstöcke",
    regimen: "Gliedermaßstab",
    exampleSentenceDe: "Ich messe die Höhe der Steckdose mit dem Zollstock.",
    exampleSentenceEs: "Mido la altura de la toma de corriente con el metro plegable.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "messe", role: "verb_p1", order: 2 },
      { text: "die Höhe der Steckdose", role: "complement", order: 3 },
      { text: "mit dem Zollstock", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric wooden folding carpenter ruler measuring stick"
  },
  {
    de: "der Anschlagwinkel",
    pron: "dea án-shlak-vín-kel",
    es: "escuadra de taller de 90° con talón",
    type: "Sustantivo (Masc)",
    category: "Messwerkzeuge",
    plural: "die Anschlagwinkel",
    regimen: "90-Grad-Winkel",
    exampleSentenceDe: "Mit dem Anschlagwinkel zeichne ich den Schnitt am Kabelkanal an.",
    exampleSentenceEs: "Con la escuadra marco el corte en la canaleta.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Anschlagwinkel", role: "complement", order: 1 },
      { text: "zeichne", role: "verb_p1", order: 2 },
      { text: "ich den Schnitt am Kabelkanal", role: "subject", order: 3 },
      { text: "an", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric 90 degree steel try square with stop ledge"
  },
  {
    de: "das Sicherheitsmesser",
    pron: "das zí-jea-jaits-me-sa",
    es: "cúter de seguridad autoretráctil",
    type: "Sustantivo (Neutro)",
    category: "Handwerkzeuge",
    plural: "die Sicherheitsmesser",
    regimen: "Automatischer Klingenrückzug",
    exampleSentenceDe: "Das Sicherheitsmesser zieht die Klinge nach dem Schnitt sofort ein.",
    exampleSentenceEs: "El cuchillo de seguridad repliega la cuchilla de inmediato tras el corte.",
    exampleSentenceDeBlocks: [
      { text: "Das Sicherheitsmesser", role: "subject", order: 1 },
      { text: "zieht", role: "verb_p1", order: 2 },
      { text: "die Klinge nach dem Schnitt sofort", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric auto-retractable utility safety cutter knife"
  },
  {
    de: "die Puksäge",
    pron: "di púk-ze-gue",
    es: "sierra de mano pequeña para metal (tipo PUK)",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Puksägen",
    regimen: "Kleinsägebogen",
    exampleSentenceDe: "Ich säge die Hutschiene mit der Puksäge ab.",
    exampleSentenceEs: "Sierro el carril DIN con la sierra de mano PUK.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "säge", role: "verb_p1", order: 2 },
      { text: "die Hutschiene mit der Puksäge", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric compact metal hacksaw PUK saw with red handle"
  },
  {
    de: "die Metallsäge",
    pron: "di me-tál-ze-gue",
    es: "arco de sierra para metal de 300 mm",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die Metallsägen",
    regimen: "HSS-Sägeblatt",
    exampleSentenceDe: "Mit der Metallsäge kürze ich das Schutzrohr M40.",
    exampleSentenceEs: "Con la sierra para metal acorto el tubo protector M40.",
    exampleSentenceDeBlocks: [
      { text: "Mit der Metallsäge", role: "complement", order: 1 },
      { text: "kürze", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "das Schutzrohr M40", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric large metal hacksaw frame with tension screw"
  },
  {
    de: "das Sicherheits-Cuttermesser",
    pron: "das zí-jea-jaits-kát-ta-me-sa",
    es: "cúter metálico con bloqueo de hoja",
    type: "Sustantivo (Neutro)",
    category: "Handwerkzeuge",
    plural: "die Cuttermesser",
    regimen: "Abbrechklinge 18 mm",
    exampleSentenceDe: "Ich öffne den Karton vorsichtig mit dem Sicherheits-Cuttermesser.",
    exampleSentenceEs: "Abro la caja de cartón con cuidado con el cúter de seguridad.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "öffne", role: "verb_p1", order: 2 },
      { text: "den Karton vorsichtig", role: "complement", order: 3 },
      { text: "mit dem Sicherheits-Cuttermesser", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric sturdy metal box utility snap-off blade knife"
  },
  {
    de: "der Zimmermannsstift",
    pron: "dea tsím-ma-mans-shtift",
    es: "lápiz de carpintero de grafito plano",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Zimmermannsstifte",
    regimen: "Ovale Flachmine",
    exampleSentenceDe: "Ich markiere die Bohrlöcher auf der Wand mit dem roten Zimmermannsstift.",
    exampleSentenceEs: "Marco los puntos de taladrado en la pared con el lápiz de carpintero rojo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "markiere", role: "verb_p1", order: 2 },
      { text: "die Bohrlöcher auf der Wand", role: "complement", order: 3 },
      { text: "mit dem roten Zimmermannsstift", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric red flat wooden carpenter pencil"
  },

  // 6. Tipos de Cables y Conductores Eléctricos (Kabel & Leitungen) [Ítems 54-64]
  {
    de: "die H07V-K-Leitung (1×10 mm²)",
    pron: "di ja-núl-zí-ben-fau-ká-lái-tung",
    es: "conductor unipolar flexible de cobre marrón 10 mm²",
    type: "Sustantivo (Fem)",
    category: "Kabel & Leitungen",
    plural: "die H07V-K-Leitungen",
    regimen: "Klasse 5 Feindraht",
    exampleSentenceDe: "Wir verdrahten den Zählerschrank mit der braunen H07V-K-Leitung 10 mm².",
    exampleSentenceEs: "Cableamos el armario del contador con el cable flexible H07V-K de 10 mm².",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "verdrahten", role: "verb_p1", order: 2 },
      { text: "den Zählerschrank", role: "complement", order: 3 },
      { text: "mit der braunen H07V-K-Leitung 10 mm²", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric spool of flexible brown single-core copper wire H07V-K 10mm"
  },
  {
    de: "das H07RN-F-Kabel (5G4 / 5G6 mm²)",
    pron: "das ja-núl-zí-ben-er-en-ef-ká-bel",
    es: "manguera de goma de alta resistencia 5 hilos",
    type: "Sustantivo (Neutro)",
    category: "Kabel & Leitungen",
    plural: "die H07RN-F-Kabel",
    regimen: "Gummischlauchleitung",
    exampleSentenceDe: "Das H07RN-F-Kabel verbindet die Wallbox im Außenbereich flexibel.",
    exampleSentenceEs: "El cable de goma H07RN-F conecta la Wallbox en exteriores de forma flexible.",
    exampleSentenceDeBlocks: [
      { text: "Das H07RN-F-Kabel", role: "subject", order: 1 },
      { text: "verbindet", role: "verb_p1", order: 2 },
      { text: "die Wallbox im Außenbereich", role: "complement", order: 3 },
      { text: "flexibel", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric thick black heavy duty rubber flexible cable 5-wire"
  },
  {
    de: "das NYY-J-Kabel (5×2,5 / 5×4 mm²)",
    pron: "das en-ípsilon-ípsilon-yot-ká-bel",
    es: "cable de energía enterrado negro de PVC",
    type: "Sustantivo (Neutro)",
    category: "Kabel & Leitungen",
    plural: "die NYY-J-Kabel",
    regimen: "Erdkabel 0,6/1 kV",
    exampleSentenceDe: "Das schwarze NYY-J-Kabel ist für die Verlegung im Erdreich zugelassen.",
    exampleSentenceEs: "El cable negro NYY-J está homologado para su instalación enterrada.",
    exampleSentenceDeBlocks: [
      { text: "Das schwarze NYY-J-Kabel", role: "subject", order: 1 },
      { text: "ist", role: "verb_p1", order: 2 },
      { text: "für die Verlegung im Erdreich", role: "complement", order: 3 },
      { text: "zugelassen", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric thick black underground direct burial power cable NYY-J"
  },
  {
    de: "die NYY-J-Leitung (1×10 / 1×16 mm²)",
    pron: "di en-ípsilon-ípsilon-yot-lái-tung",
    es: "conductor unipolar de tierra negro rígido",
    type: "Sustantivo (Fem)",
    category: "Kabel & Leitungen",
    plural: "die NYY-J-Leitungen",
    regimen: "Hauptpotenzialausgleich",
    exampleSentenceDe: "Die NYY-J-Leitung 1×16 mm² führt von der Poti-Schiene zum Tiefenerder.",
    exampleSentenceEs: "El cable NYY-J 1×16 mm² va desde la barra equipotencial hasta la pica de tierra.",
    exampleSentenceDeBlocks: [
      { text: "Die NYY-J-Leitung 1×16 mm²", role: "subject", order: 1 },
      { text: "führt", role: "verb_p1", order: 2 },
      { text: "von der Poti-Schiene", role: "complement", order: 3 },
      { text: "zum Tiefenerder", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric roll of heavy black single-core grounding cable"
  },
  {
    de: "das NYM-J-Kabel (3×2,5 mm²)",
    pron: "das en-ípsilon-em-yot-ká-bel",
    es: "manguera eléctrica gris monofásica estándar",
    type: "Sustantivo (Neutro)",
    category: "Kabel & Leitungen",
    plural: "die NYM-J-Kabel",
    regimen: "Mantelleitung starr",
    exampleSentenceDe: "Das graue NYM-J-Kabel 3×2,5 mm² versorgt die Steckdosen.",
    exampleSentenceEs: "El cable gris NYM-J 3×2,5 mm² alimenta las tomas de corriente.",
    exampleSentenceDeBlocks: [
      { text: "Das graue NYM-J-Kabel 3×2,5 mm²", role: "subject", order: 1 },
      { text: "versorgt", role: "verb_p1", order: 2 },
      { text: "die Steckdosen", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric grey residential sheath installation cable 3-wire NYM-J"
  },
  {
    de: "das NYM-J-Kabel (5×10 mm²)",
    pron: "das en-ípsilon-em-yot-ká-bel fúnf mal tsen",
    es: "cable trifásico gris de 10 mm² para subcuadros",
    type: "Sustantivo (Neutro)",
    category: "Kabel & Leitungen",
    plural: "die NYM-J-Kabel",
    regimen: "Drehstrom 5-adrig",
    exampleSentenceDe: "Das NYM-J 5×10 mm² verbindet den Zähler mit der Unterverteilung.",
    exampleSentenceEs: "El cable NYM-J 5×10 mm² une el contador con el cuadro secundario.",
    exampleSentenceDeBlocks: [
      { text: "Das NYM-J 5×10 mm²", role: "subject", order: 1 },
      { text: "verbindet", role: "verb_p1", order: 2 },
      { text: "den Zähler", role: "complement", order: 3 },
      { text: "mit der Unterverteilung", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric thick grey 5-wire NYM-J power cable coil"
  },
  {
    de: "das NYM-J-Kabel (5×16 mm²)",
    pron: "das en-ípsilon-em-yot-ká-bel fúnf mal zéj-tsen",
    es: "cable de acometida trifásica gris de 16 mm²",
    type: "Sustantivo (Neutro)",
    category: "Kabel & Leitungen",
    plural: "die NYM-J-Kabel",
    regimen: "Hauptzuleitung",
    exampleSentenceDe: "Die Hauptzuleitung zum Zählerschrank besteht aus einem NYM-J 5×16 mm².",
    exampleSentenceEs: "La acometida principal al armario del contador consiste en un NYM-J 5×16 mm².",
    exampleSentenceDeBlocks: [
      { text: "Die Hauptzuleitung zum Zählerschrank", role: "subject", order: 1 },
      { text: "besteht", role: "verb_p1", order: 2 },
      { text: "aus einem NYM-J 5×16 mm²", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric heavy duty 5x16mm grey installation cable roll"
  },
  {
    de: "das LiYCY-Kabel",
    pron: "das el-i-ípsilon-tse-ípsilon-ká-bel",
    es: "cable apantallado de comunicación (Modbus/RS485)",
    type: "Sustantivo (Neutro)",
    category: "Kabel & Leitungen",
    plural: "die LiYCY-Kabel",
    regimen: "EMV-Schirmung",
    exampleSentenceDe: "Das LiYCY-Kabel überträgt die Modbus-Daten zum Smart Meter störungsfrei.",
    exampleSentenceEs: "El cable LiYCY transmite los datos Modbus al Smart Meter sin interferencias.",
    exampleSentenceDeBlocks: [
      { text: "Das LiYCY-Kabel", role: "subject", order: 1 },
      { text: "überträgt", role: "verb_p1", order: 2 },
      { text: "die Modbus-Daten zum Smart Meter", role: "complement", order: 3 },
      { text: "störungsfrei", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric shielded grey data control cable with braided metal wire mesh"
  },
  {
    de: "das LAN-Kabel",
    pron: "das lán-ká-bel",
    es: "cable de red Ethernet (Cat 7)",
    type: "Sustantivo (Neutro)",
    category: "Netzwerk",
    plural: "die LAN-Kabel",
    regimen: "Verlegekabel Cat.7",
    exampleSentenceDe: "Ich verlege das LAN-Kabel vom Wechselrichter zum Router.",
    exampleSentenceEs: "Tiendo el cable LAN desde el inversor hasta el router.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "verlege", role: "verb_p1", order: 2 },
      { text: "das LAN-Kabel", role: "complement", order: 3 },
      { text: "vom Wechselrichter zum Router", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric twisted pair Ethernet network LAN cable spool"
  },
  {
    de: "das Patchkabel",
    pron: "das pétsh-ká-bel",
    es: "latiguillo de red flexible con conectores RJ45",
    type: "Sustantivo (Neutro)",
    category: "Netzwerk",
    plural: "die Patchkabel",
    regimen: "RJ45 Stecker",
    exampleSentenceDe: "Ich stecke das blaue Patchkabel in den Switch.",
    exampleSentenceEs: "Conecto el latiguillo de red azul en el switch.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "stecke", role: "verb_p1", order: 2 },
      { text: "das blaue Patchkabel", role: "complement", order: 3 },
      { text: "in den Switch", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric short flexible blue Ethernet patch cord cable with RJ45 plugs"
  },
  {
    de: "die NYY-J-Leitung (1×16 mm²)",
    pron: "di en-ípsilon-ípsilon-yot-lái-tung",
    es: "línea principal de puesta a tierra (1×16 mm²)",
    type: "Sustantivo (Fem)",
    category: "Kabel & Leitungen",
    plural: "die NYY-J-Leitungen",
    regimen: "Blitzschutz & Erdung",
    exampleSentenceDe: "Die NYY-J-Leitung 1×16 mm² schützt die PV-Anlage vor Überspannung.",
    exampleSentenceEs: "El cable NYY-J 1×16 mm² protege la instalación fotovoltaica contra sobretensiones.",
    exampleSentenceDeBlocks: [
      { text: "Die NYY-J-Leitung 1×16 mm²", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "die PV-Anlage", role: "complement", order: 3 },
      { text: "vor Überspannung", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric heavy black copper ground line single wire cable"
  },

  // 7. Terminales, Bornas, Conexiones y Cuadros [Ítems 65-84]
  {
    de: "die Aderendhülse (1×10 mm²)",
    pron: "di á-da-ent-júl-ze",
    es: "puntera hueca aislada de 10 mm² (roja)",
    type: "Sustantivo (Fem)",
    category: "Verbindungstechnik",
    plural: "die Aderendhülsen",
    regimen: "DIN 46228-4 (Rot)",
    exampleSentenceDe: "Vor dem Festschrauben crimpe ich eine rote Aderendhülse auf das 10 mm² Kabel.",
    exampleSentenceEs: "Antes de atornillar crimpo una puntera roja en el cable de 10 mm².",
    exampleSentenceDeBlocks: [
      { text: "Vor dem Festschrauben", role: "complement", order: 1 },
      { text: "crimpe", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "eine rote Aderendhülse auf das 10 mm² Kabel", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric insulated red copper wire ferrule sleeve 10mm"
  },
  {
    de: "die Aderendhülse (1×16 mm²)",
    pron: "di á-da-ent-júl-ze",
    es: "puntera hueca aislada de 16 mm² (azul)",
    type: "Sustantivo (Fem)",
    category: "Verbindungstechnik",
    plural: "die Aderendhülsen",
    regimen: "DIN 46228-4 (Blau)",
    exampleSentenceDe: "Der 16 mm² Leiter benötigt eine blaue Aderendhülse.",
    exampleSentenceEs: "El conductor de 16 mm² requiere una puntera azul.",
    exampleSentenceDeBlocks: [
      { text: "Der 16 mm² Leiter", role: "subject", order: 1 },
      { text: "benötigt", role: "verb_p1", order: 2 },
      { text: "eine blaue Aderendhülse", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric blue insulated copper cord end terminal ferrule 16mm"
  },
  {
    de: "die Doppel-Aderendhülse (10 mm²)",
    pron: "di dóp-pel-á-da-ent-júl-ze",
    es: "puntera doble (Twin) para dos cables de 10 mm²",
    type: "Sustantivo (Fem)",
    category: "Verbindungstechnik",
    plural: "die Doppel-Aderendhülsen",
    regimen: "Twin-Hülse",
    exampleSentenceDe: "Mit der Doppel-Aderendhülse klemme ich zwei 10 mm² Leiter in einen Anschluss.",
    exampleSentenceEs: "Con la puntera doble conecto dos conductores de 10 mm² en un solo borne.",
    exampleSentenceDeBlocks: [
      { text: "Mit der Doppel-Aderendhülse", role: "complement", order: 1 },
      { text: "klemme", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "zwei 10 mm² Leiter in einen Anschluss", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric twin double wire ferrule with flared red plastic collar"
  },
  {
    de: "der Rohrkabelschuh",
    pron: "dea róa-ká-bel-shu",
    es: "terminal tubular de cobre con ojal de tornillo",
    type: "Sustantivo (Masc)",
    category: "Verbindungstechnik",
    plural: "die Rohrkabelschuhe",
    regimen: "M8 / M10 Ringöse",
    exampleSentenceDe: "Ich schraube den Rohrkabelschuh auf den Massebolzen des Wechselrichters.",
    exampleSentenceEs: "Atornillo el terminal de anillo en el perno de masa del inversor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "schraube", role: "verb_p1", order: 2 },
      { text: "den Rohrkabelschuh", role: "complement", order: 3 },
      { text: "auf den Massebolzen des Wechselrichters", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric tinned copper heavy duty ring lug terminal connector"
  },
  {
    de: "die Hauptleitungsabzweigklemme (HLAK)",
    pron: "di jáupt-lái-tungs-áp-tsvaik-klé-me",
    es: "bloque de bornes de derivación principal (HLAK)",
    type: "Sustantivo (Fem)",
    category: "Verteilertechnik",
    plural: "die Hauptleitungsabzweigklemmen",
    regimen: "DIN VDE 0603-2",
    exampleSentenceDe: "Auf der HLAK verteilen wir die Phasen L1, L2 und L3 sicher.",
    exampleSentenceEs: "En el HLAK distribuimos las fases L1, L2 y L3 con seguridad.",
    exampleSentenceDeBlocks: [
      { text: "Auf der HLAK", role: "complement", order: 1 },
      { text: "verteilen", role: "verb_p1", order: 2 },
      { text: "wir die Phasen L1, L2 und L3", role: "subject", order: 3 },
      { text: "sicher", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric multi-pole main branch terminal block block HLAK DIN rail"
  },
  {
    de: "die Sammelschienenklemme",
    pron: "di zám-mel-shí-nen-klé-me",
    es: "borne de conexión para pletina de cobre colectora",
    type: "Sustantivo (Fem)",
    category: "Verteilertechnik",
    plural: "die Sammelschienenklemmen",
    regimen: "40 mm Sammelschiene",
    exampleSentenceDe: "Die Sammelschienenklemme klemmt den Leiter direkt auf die Kupferschiene.",
    exampleSentenceEs: "El borne para barra colectora sujeta el conductor directamente a la pletina de cobre.",
    exampleSentenceDeBlocks: [
      { text: "Die Sammelschienenklemme", role: "subject", order: 1 },
      { text: "klemmt", role: "verb_p1", order: 2 },
      { text: "den Leiter direkt", role: "complement", order: 3 },
      { text: "auf die Kupferschiene", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric copper busbar screw terminal clamp connector"
  },
  {
    de: "die WAGO-Klemme",
    pron: "di vá-go-klé-me",
    es: "conector rápido de palancas basculantes WAGO",
    type: "Sustantivo (Fem)",
    category: "Verbindungstechnik",
    plural: "die WAGO-Klemmen",
    regimen: "Serie 221 (Compact)",
    exampleSentenceDe: "Mit der WAGO-Klemme verbinde ich starre und flexible Leiter werkzeuglos.",
    exampleSentenceEs: "Con el conector WAGO uno conductores rígidos y flexibles sin herramientas.",
    exampleSentenceDeBlocks: [
      { text: "Mit der WAGO-Klemme", role: "complement", order: 1 },
      { text: "verbinde", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "starre und flexible Leiter werkzeuglos", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric clear transparent WAGO terminal connector with orange levers"
  },
  {
    de: "der Stoßverbinder",
    pron: "dea shtós-fea-bín-da",
    es: "conector tubular de empalme termorretráctil",
    type: "Sustantivo (Masc)",
    category: "Verbindungstechnik",
    plural: "die Stoßverbinder",
    regimen: "Schrumpfisolierung",
    exampleSentenceDe: "Ich crimpe den Stoßverbinder und erwärme ihn zum Abdichten.",
    exampleSentenceEs: "Crimpo el conector de empalme y lo caliento para sellarlo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "crimpe", role: "verb_p1", order: 2 },
      { text: "den Stoßverbinder", role: "complement", order: 3 },
      { text: "und erwärme ihn zum Abdichten", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric blue heat-shrink crimp butt splice wire connector"
  },
  {
    de: "die PE-Schiene",
    pron: "di pe-é-shí-ne",
    es: "barra colectora de tierra de latón (PE)",
    type: "Sustantivo (Fem)",
    category: "Verteilertechnik",
    plural: "die PE-Schienen",
    regimen: "Schutzleiter grün/gelb",
    exampleSentenceDe: "Alle Schutzleiter werden an der grünen PE-Schiene angeschlossen.",
    exampleSentenceEs: "Todos los conductores de tierra se conectan a la barra verde PE.",
    exampleSentenceDeBlocks: [
      { text: "Alle Schutzleiter", role: "subject", order: 1 },
      { text: "werden", role: "verb_p1", order: 2 },
      { text: "an der grünen PE-Schiene", role: "complement", order: 3 },
      { text: "angeschlossen", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric brass grounding busbar terminal strip on green insulated base"
  },
  {
    de: "die Neutralleiterschiene",
    pron: "di noi-trál-lái-ta-shí-ne",
    es: "barra colectora de neutro (N)",
    type: "Sustantivo (Fem)",
    category: "Verteilertechnik",
    plural: "die Neutralleiterschienen",
    regimen: "Blau / N-Leiter",
    exampleSentenceDe: "Die blauen Neutralleiter führen zur Neutralleiterschiene.",
    exampleSentenceEs: "Los conductores neutros azules van hacia la barra de neutro.",
    exampleSentenceDeBlocks: [
      { text: "Die blauen Neutralleiter", role: "subject", order: 1 },
      { text: "führen", role: "verb_p1", order: 2 },
      { text: "zur Neutralleiterschiene", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric blue neutral distribution busbar rail terminal"
  },
  {
    de: "die Hutschiene (7,5 mm)",
    pron: "di jút-shí-ne",
    es: "carril DIN simétrico normalizado de 35×7,5 mm",
    type: "Sustantivo (Fem)",
    category: "Verteilertechnik",
    plural: "die Hutschienen",
    regimen: "DIN EN 60715 (TH35)",
    exampleSentenceDe: "Die Sicherungsautomaten rasten auf der Hutschiene ein.",
    exampleSentenceEs: "Los interruptores automáticos encajan en el carril DIN.",
    exampleSentenceDeBlocks: [
      { text: "Die Sicherungsautomaten", role: "subject", order: 1 },
      { text: "rasten", role: "verb_p1", order: 2 },
      { text: "auf der Hutschiene", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric galvanized slotted metal DIN rail strip track"
  },
  {
    de: "der Unterverteiler (UVT)",
    pron: "dea ún-ta-fea-tái-la",
    es: "cuadro de distribución secundario / subcuadro",
    type: "Sustantivo (Masc)",
    category: "Verteilertechnik",
    plural: "die Unterverteiler",
    regimen: "Aufputzverteiler IP40/65",
    exampleSentenceDe: "Die Sicherungen für die Wallbox montieren wir im Unterverteiler.",
    exampleSentenceEs: "Montamos los automáticos para la Wallbox en el subcuadro.",
    exampleSentenceDeBlocks: [
      { text: "Die Sicherungen für die Wallbox", role: "complement", order: 1 },
      { text: "montieren", role: "verb_p1", order: 2 },
      { text: "wir", role: "subject", order: 3 },
      { text: "im Unterverteiler", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric white wall surface-mount distribution electrical breaker box"
  },
  {
    de: "der EHZ-Zähler",
    pron: "dea e-já-tset-tsé-la",
    es: "contador electrónico digital bidireccional (eHZ)",
    type: "Sustantivo (Masc)",
    category: "Verteilertechnik",
    plural: "die EHZ-Zähler",
    regimen: "Zweirichtungszähler",
    exampleSentenceDe: "Der EHZ-Zähler misst die Einspeisung der Solaranlage und den Netzbezug.",
    exampleSentenceEs: "El contador eHZ mide la inyección solar y el consumo de la red.",
    exampleSentenceDeBlocks: [
      { text: "Der EHZ-Zähler", role: "subject", order: 1 },
      { text: "misst", role: "verb_p1", order: 2 },
      { text: "die Einspeisung der Solaranlage", role: "complement", order: 3 },
      { text: "und den Netzbezug", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric modern electronic digital smart electric meter eHZ plug-in module"
  },
  {
    de: "der EHZ-Adapter",
    pron: "dea e-já-tset-a-dáp-ta",
    es: "placa adaptadora para contadores eHZ",
    type: "Sustantivo (Masc)",
    category: "Verteilertechnik",
    plural: "die EHZ-Adapter",
    regimen: "Befestigungs- und Kontaktiereinrichtung (BKE-I)",
    exampleSentenceDe: "Mit dem EHZ-Adapter bauen wir den neuen Zähler auf die alte Zählertafel.",
    exampleSentenceEs: "Con el adaptador eHZ montamos el contador nuevo en el panel de cruceta antiguo.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem EHZ-Adapter", role: "complement", order: 1 },
      { text: "bauen", role: "verb_p1", order: 2 },
      { text: "wir den neuen Zähler", role: "subject", order: 3 },
      { text: "auf die alte Zählertafel", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric plastic adapter mounting base plate for eHZ smart meter"
  },
  {
    de: "der Einspeiseadapter",
    pron: "dea áin-shpai-ze-a-dáp-ta",
    es: "adaptador de alimentación para embarrado",
    type: "Sustantivo (Masc)",
    category: "Verteilertechnik",
    plural: "die Einspeiseadapter",
    regimen: "Sammelschienenabgriff",
    exampleSentenceDe: "Der Einspeiseadapter verbindet die PV-Leitung mit dem Sammelschienensystem.",
    exampleSentenceEs: "El adaptador de alimentación conecta la línea solar al sistema de barras.",
    exampleSentenceDeBlocks: [
      { text: "Der Einspeiseadapter", role: "subject", order: 1 },
      { text: "verbindet", role: "verb_p1", order: 2 },
      { text: "die PV-Leitung", role: "complement", order: 3 },
      { text: "mit dem Sammelschienensystem", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric busbar feed-in tap adapter module with contact clips"
  },
  {
    de: "die Abdeckstreifen",
    pron: "di áp-dek-shtrái-fen",
    es: "tiras plásticas cubreranuras para cuadro",
    type: "Sustantivo (Plural)",
    category: "Verteilertechnik",
    plural: "die Abdeckstreifen",
    regimen: "Berührungsschutz IP30",
    exampleSentenceDe: "Die Abdeckstreifen verschließen die freien Modulplätze im Verteiler.",
    exampleSentenceEs: "Las tiras cubreranuras tapan los huecos libres en el cuadro.",
    exampleSentenceDeBlocks: [
      { text: "Die Abdeckstreifen", role: "subject", order: 1 },
      { text: "verschließen", role: "verb_p1", order: 2 },
      { text: "die freien Modulplätze", role: "complement", order: 3 },
      { text: "im Verteiler", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric white plastic modular blanking filler strips for electrical panel"
  },
  {
    de: "die Abdeckstreifen-Sperrbar",
    pron: "di áp-dek-shtrái-fen-shpéa-bar",
    es: "tapa con pestañas mecánicas de bloqueo",
    type: "Sustantivo (Fem)",
    category: "Verteilertechnik",
    plural: "die Abdeckstreifen-Sperrbaren",
    regimen: "Rastverschluss",
    exampleSentenceDe: "Die Abdeckstreifen-Sperrbar verhindert das ungewollte Eindrücken der Tapa.",
    exampleSentenceEs: "La tapa de bloqueo impide que la cubierta se desplace o hunda.",
    exampleSentenceDeBlocks: [
      { text: "Die Abdeckstreifen-Sperrbar", role: "subject", order: 1 },
      { text: "verhindert", role: "verb_p1", order: 2 },
      { text: "das ungewollte Eindrücken", role: "complement", order: 3 },
      { text: "der Tapa", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric snap-lock panel cover bar strip with security clip teeth"
  },
  {
    de: "der RJ45-Stecker",
    pron: "dea er-yót-fünf-unt-fía-tsij-shté-ka",
    es: "conector de red RJ45 apantallado",
    type: "Sustantivo (Masc)",
    category: "Netzwerk",
    plural: "die RJ45-Stecker",
    regimen: "Cat.6A feldkonfektionierbar",
    exampleSentenceDe: "Ich crimpe den feldkonfektionierbaren RJ45-Stecker auf das Datenkabel.",
    exampleSentenceEs: "Crimpo el conector RJ45 de montaje en campo en el cable de datos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "crimpe", role: "verb_p1", order: 2 },
      { text: "den feldkonfektionierbaren RJ45-Stecker", role: "complement", order: 3 },
      { text: "auf das Datenkabel", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric shielded metallic male RJ45 network Ethernet plug connector"
  },
  {
    de: "der Modularkupplungsverbinder (RJ45)",
    pron: "dea mo-du-lár-kúp-lungs-fea-bín-da",
    es: "acoplador modular hembra-hembra RJ45",
    type: "Sustantivo (Masc)",
    category: "Netzwerk",
    plural: "die Modularkupplungsverbinder",
    regimen: "Keystone / RJ45 Buchse",
    exampleSentenceDe: "Der Modularkupplungsverbinder verlängert zwei LAN-Kabel miteinander.",
    exampleSentenceEs: "El acoplador modular prolonga dos cables LAN entre sí.",
    exampleSentenceDeBlocks: [
      { text: "Der Modularkupplungsverbinder", role: "subject", order: 1 },
      { text: "verlängert", role: "verb_p1", order: 2 },
      { text: "zwei LAN-Kabel", role: "complement", order: 3 },
      { text: "miteinander", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric female-to-female RJ45 modular coupler keystone inline adapter"
  },
  {
    de: "die Aufputz-Steckdose",
    pron: "di áuf-puts-shték-do-ze",
    es: "toma de corriente Schuko estanca de superficie",
    type: "Sustantivo (Fem)",
    category: "Installation",
    plural: "die Aufputz-Steckdosen",
    regimen: "IP44 Feuchtraum",
    exampleSentenceDe: "Ich installiere die Aufputz-Steckdose im Keller neben dem Wechselrichter.",
    exampleSentenceEs: "Instalo la toma de superficie en el sótano junto al inversor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "installiere", role: "verb_p1", order: 2 },
      { text: "die Aufputz-Steckdose im Keller", role: "complement", order: 3 },
      { text: "neben dem Wechselrichter", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric surface mounted grey outdoor Schuko wall power socket with flip cover"
  },

  // 8. Dispositivos de Protección Eléctrica (Schutzschalter & Sicherungen) [Ítems 85-91]
  {
    de: "die NH-Sicherung",
    pron: "di en-há-zí-je-rung",
    es: "fusible de cuchilla de alta capacidad NH (NH00)",
    type: "Sustantivo (Fem)",
    category: "Schutzeinrichtungen",
    plural: "die NH-Sicherungen",
    regimen: "gG / gL Charakteristik",
    exampleSentenceDe: "Die NH-Sicherung im Hausanschlusskasten schützt vor Kurzschluss.",
    exampleSentenceEs: "El fusible NH en la caja general de acometida protege contra cortocircuitos.",
    exampleSentenceDeBlocks: [
      { text: "Die NH-Sicherung im Hausanschlusskasten", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "vor Kurzschluss", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric ceramic blade NH fuse cartridge with shiny knife contacts"
  },
  {
    de: "die Schmelzsicherung",
    pron: "di shmélts-zí-je-rung",
    es: "fusible cerámico de rosca (Diazed/Neozed)",
    type: "Sustantivo (Fem)",
    category: "Schutzeinrichtungen",
    plural: "die Schmelzsicherungen",
    regimen: "D02 / 35A",
    exampleSentenceDe: "Die 35A Schmelzsicherung sichert die Zuleitung des Wechselrichters ab.",
    exampleSentenceEs: "El fusible cerámico de 35 A protege la acometida del inversor.",
    exampleSentenceDeBlocks: [
      { text: "Die 35A Schmelzsicherung", role: "subject", order: 1 },
      { text: "sichert", role: "verb_p1", order: 2 },
      { text: "die Zuleitung des Wechselrichters", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric ceramic bottle cartridge fuse Neozed with contact tip"
  },
  {
    de: "der FI/LS-Schalter 1-phasig (RCBO)",
    pron: "dea ef-í-el-és-shál-ta",
    es: "interruptor combinado diferencial y magnetotérmico 1P",
    type: "Sustantivo (Masc)",
    category: "Schutzeinrichtungen",
    plural: "die FI/LS-Schalter",
    regimen: "B16 / 30mA Typ A",
    exampleSentenceDe: "Der 1-phasige FI/LS-Schalter schützt die Steckdose vor Überlast und Fehlerstrom.",
    exampleSentenceEs: "El interruptor magnetotérmico-diferencial protege la base contra sobrecargas y fugas.",
    exampleSentenceDeBlocks: [
      { text: "Der 1-phasige FI/LS-Schalter", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "die Steckdose", role: "complement", order: 3 },
      { text: "vor Überlast und Fehlerstrom", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric compact single phase RCBO combined circuit breaker switch"
  },
  {
    de: "der RCD / FI-Schalter (300 mA)",
    pron: "dea er-tse-dé / ef-í-shál-ta",
    es: "interruptor diferencial de protección contra incendios (300 mA)",
    type: "Sustantivo (Masc)",
    category: "Schutzeinrichtungen",
    plural: "die FI-Schalter",
    regimen: "Brandschutz Typ A / 300 mA",
    exampleSentenceDe: "Der 300 mA FI-Schalter schützt die PV-Anlage vor Isolationsbränden.",
    exampleSentenceEs: "El diferencial de 300 mA protege la instalación fotovoltaica contra incendios por aislamiento.",
    exampleSentenceDeBlocks: [
      { text: "Der 300 mA FI-Schalter", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "die PV-Anlage", role: "complement", order: 3 },
      { text: "vor Isolationsbränden", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric 4-pole residual current circuit breaker RCD switch with test button"
  },
  {
    de: "der LS-Schalter / LSS C16A 3P",
    pron: "dea el-és-shál-ta tse-zéj-tsen-á",
    es: "interruptor automático magnetotérmico tripolar C16A",
    type: "Sustantivo (Masc)",
    category: "Schutzeinrichtungen",
    plural: "die LS-Schalter",
    regimen: "Charakteristik C / 3-polig",
    exampleSentenceDe: "Der 3-polige LS-Schalter C16 schützt die dreiphasige Zuleitung.",
    exampleSentenceEs: "El interruptor automático tripolar C16 protege la línea trifásica.",
    exampleSentenceDeBlocks: [
      { text: "Der 3-polige LS-Schalter C16", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "die dreiphasige Zuleitung", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric triple-pole 3-phase miniature circuit breaker MCB C16A"
  },
  {
    de: "der FI/LS-Schalter (RCBO) 3-phasig",
    pron: "dea ef-í-el-és-shál-ta drái-fá-zij",
    es: "interruptor diferencial-magnetotérmico trifásico 4 polos",
    type: "Sustantivo (Masc)",
    category: "Schutzeinrichtungen",
    plural: "die FI/LS-Schalter 3-phasig",
    regimen: "Typ A / 30mA 4-polig",
    exampleSentenceDe: "Die Wallbox wird durch einen 3-phasigen RCBO abgesichert.",
    exampleSentenceEs: "La Wallbox queda protegida mediante un RCBO trifásico.",
    exampleSentenceDeBlocks: [
      { text: "Die Wallbox", role: "subject", order: 1 },
      { text: "wird", role: "verb_p1", order: 2 },
      { text: "durch einen 3-phasigen RCBO", role: "complement", order: 3 },
      { text: "abgesichert", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric 4-pole three-phase RCBO combination electrical breaker"
  },
  {
    de: "der selektive Hauptleitungsschutzschalter (SLS)",
    pron: "dea ze-lek-tí-ve jáupt-lái-tungs-shúts-shál-ta",
    es: "interruptor selectivo de acometida (SLS de embarrado)",
    type: "Sustantivo (Masc)",
    category: "Schutzeinrichtungen",
    plural: "die SLS-Schalter",
    regimen: "SLS 35A/50A für Sammelschiene",
    exampleSentenceDe: "Der SLS-Schalter sitzt im unteren Anschlussraum vor dem Zähler.",
    exampleSentenceEs: "El interruptor SLS va en la zona inferior previa al contador.",
    exampleSentenceDeBlocks: [
      { text: "Der SLS-Schalter", role: "subject", order: 1 },
      { text: "sitzt", role: "verb_p1", order: 2 },
      { text: "im unteren Anschlussraum", role: "complement", order: 3 },
      { text: "vor dem Zähler", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric 3-pole selective main circuit breaker SLS mounted on busbar"
  },

  // 9. Canalizaciones, Tubos y Fijaciones [Ítems 92-103]
  {
    de: "der Kabelkanal",
    pron: "dea ká-bel-ka-nál",
    es: "canaleta plástica ranurada/ciega de PVC",
    type: "Sustantivo (Masc)",
    category: "Montage & Befestigung",
    plural: "die Kabelkanäle",
    regimen: "60x40 mm / 30x30 mm",
    exampleSentenceDe: "Ich verlege die Leitungen ordentlich im weißen Kabelkanal.",
    exampleSentenceEs: "Tiendo los cables ordenadamente dentro de la canaleta blanca.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "verlege", role: "verb_p1", order: 2 },
      { text: "die Leitungen ordentlich", role: "complement", order: 3 },
      { text: "im weißen Kabelkanal", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric white plastic rectangular electrical cable trunking duct profile"
  },
  {
    de: "das Endstück",
    pron: "das ént-shtúk",
    es: "tapa terminal embellecedora para canaleta",
    type: "Sustantivo (Neutro)",
    category: "Montage & Befestigung",
    plural: "die Endstücke",
    regimen: "Kanal-Formteil",
    exampleSentenceDe: "Das Endstück schließt den Kabelkanal sauber an der Wand ab.",
    exampleSentenceEs: "La pieza terminal remata la canaleta de cables limpiamente en la pared.",
    exampleSentenceDeBlocks: [
      { text: "Das Endstück", role: "subject", order: 1 },
      { text: "schließt", role: "verb_p1", order: 2 },
      { text: "den Kabelkanal sauber an der Wand", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric white plastic end cap piece for cable trunking"
  },
  {
    de: "das PVC-Rohr M40",
    pron: "das pe-fau-tse-róa em-fía-tsij",
    es: "tubo rígido de plástico gris M40 (40 mm)",
    type: "Sustantivo (Neutro)",
    category: "Montage & Befestigung",
    plural: "die PVC-Rohre",
    regimen: "Stangenrohr EN 61386",
    exampleSentenceDe: "Das starre PVC-Rohr M40 schützt die Hauptleitung mechanisch.",
    exampleSentenceEs: "El tubo rígido de PVC M40 protege la línea principal mecánicamente.",
    exampleSentenceDeBlocks: [
      { text: "Das starre PVC-Rohr M40", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "die Hauptleitung", role: "complement", order: 3 },
      { text: "mechanisch", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric rigid grey plastic electrical conduit pipe M40"
  },
  {
    de: "das Flexrohr",
    pron: "das fléks-róa",
    es: "tubo corrugado flexible de plástico negro",
    type: "Sustantivo (Neutro)",
    category: "Montage & Befestigung",
    plural: "die Flexrohre",
    regimen: "Wellrohr EN 61386",
    exampleSentenceDe: "Das schwarze Flexrohr schützt das Kabel bei der Durchführung durch die Decke.",
    exampleSentenceEs: "El tubo corrugado negro protege el cable al cruzar el techo.",
    exampleSentenceDeBlocks: [
      { text: "Das schwarze Flexrohr", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "das Kabel bei der Durchführung", role: "complement", order: 3 },
      { text: "durch die Decke", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric flexible black corrugated electrical conduit hose pipe"
  },
  {
    de: "die Quick-Schelle",
    pron: "di kvík-shé-le",
    es: "abrazadera plástica rápida a presión en C",
    type: "Sustantivo (Fem)",
    category: "Montage & Befestigung",
    plural: "die Quick-Schellen",
    regimen: "Klemmschelle M40",
    exampleSentenceDe: "Ich drücke das PVC-Rohr mit einem Klick in die Quick-Schelle.",
    exampleSentenceEs: "Encajo el tubo de PVC en la abrazadera rápida con un simple clic.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "drücke", role: "verb_p1", order: 2 },
      { text: "das PVC-Rohr mit einem Klick", role: "complement", order: 3 },
      { text: "in die Quick-Schelle", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric grey plastic C-shaped push-in conduit pipe clamp bracket"
  },
  {
    de: "der Kabelbinder",
    pron: "dea ká-bel-bín-da",
    es: "brida de amarre de nylon negro con cremallera",
    type: "Sustantivo (Masc)",
    category: "Montage & Befestigung",
    plural: "die Kabelbinder",
    regimen: "UV-beständig",
    exampleSentenceDe: "Ich bündele die Leitungen mit einem schwarzen Kabelbinder.",
    exampleSentenceEs: "Agrupo los cables con una brida negra.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "bündele", role: "verb_p1", order: 2 },
      { text: "die Leitungen", role: "complement", order: 3 },
      { text: "mit einem schwarzen Kabelbinder", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric pack of black plastic zip cable ties"
  },
  {
    de: "der Fertigspachtel",
    pron: "dea fér-tij-shpáj-tel",
    es: "masilla de relleno lista para usar en tubo",
    type: "Sustantivo (Masc)",
    category: "Montage & Befestigung",
    plural: "die Fertigspachtel",
    regimen: "Reparaturspachtel",
    exampleSentenceDe: "Ich verschließe die Bohrlöcher sauber mit dem Fertigspachtel.",
    exampleSentenceEs: "Tapo los agujeros de perforación limpiamente con la masilla lista para usar.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "verschließe", role: "verb_p1", order: 2 },
      { text: "die Bohrlöcher sauber", role: "complement", order: 3 },
      { text: "mit dem Fertigspachtel", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric white paste wall filler tube with scraper nozzle"
  },
  {
    de: "der Flachmeißel",
    pron: "dea fláj-mái-sel",
    es: "cincel plano de acero con protección de impacto",
    type: "Sustantivo (Masc)",
    category: "Handwerkzeuge",
    plural: "die Flachmeißel",
    regimen: "Handschutzgriff",
    exampleSentenceDe: "Mit dem Flachmeißel stemme ich den Schlitz für das Rohr frei.",
    exampleSentenceEs: "Con el cincel plano pico la roza para el tubo.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Flachmeißel", role: "complement", order: 1 },
      { text: "stemme", role: "verb_p1", order: 2 },
      { text: "ich den Schlitz für das Rohr", role: "subject", order: 3 },
      { text: "frei", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric heavy steel flat cold chisel with rubber hand guard"
  },
  {
    de: "die Kartuschenpistole",
    pron: "di kar-tú-shen-pis-tó-le",
    es: "pistola aplicadora para cartuchos de silicona",
    type: "Sustantivo (Fem)",
    category: "Montage & Befestigung",
    plural: "die Kartuschenpistolen",
    regimen: "Silikonspritze manual",
    exampleSentenceDe: "Ich spanne die Dichtmasse in die Kartuschenpistole ein.",
    exampleSentenceEs: "Coloco la masilla de sellado en la pistola para cartuchos.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "spanne", role: "verb_p1", order: 2 },
      { text: "die Dichtmasse in die Kartuschenpistole", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric red skeleton caulking sealant cartridge gun"
  },
  {
    de: "das Dichtflex (Sellador)",
    pron: "das díjt-fleks",
    es: "masilla selladora elástica estanca Dichtflex",
    type: "Sustantivo (Neutro)",
    category: "Montage & Befestigung",
    plural: "-",
    regimen: "Polymer-Dichtstoff",
    exampleSentenceDe: "Das Dichtflex dichtet den Wanddurchbruch gegen Feuchtigkeit ab.",
    exampleSentenceEs: "El sellador Dichtflex impermeabiliza el pasamuros contra la humedad.",
    exampleSentenceDeBlocks: [
      { text: "Das Dichtflex", role: "subject", order: 1 },
      { text: "dichtet", role: "verb_p1", order: 2 },
      { text: "den Wanddurchbruch gegen Feuchtigkeit", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric waterproof sealant mastic cartridge tube Dichtflex"
  },
  {
    de: "der Plombendraht",
    pron: "dea plóm-ben-drat",
    es: "alambre galvanizado trenzado para precintos",
    type: "Sustantivo (Masc)",
    category: "Montage & Befestigung",
    plural: "-",
    regimen: "2-adrig verzinkt",
    exampleSentenceDe: "Ich ziehe den Plombendraht durch die Schraubenösen des Zählers.",
    exampleSentenceEs: "Paso el alambre de precinto por las anillas del contador.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "den Plombendraht", role: "complement", order: 3 },
      { text: "durch die Schraubenösen des Zählers", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric roll of fine galvanized twisted steel security seal wire"
  },
  {
    de: "die Wanddurchführung",
    pron: "di vánt-dúrj-fú-rung",
    es: "pasamuros estanco con juntas de estanqueidad",
    type: "Sustantivo (Fem)",
    category: "Montage & Befestigung",
    plural: "die Wanddurchführungen",
    regimen: "Gas- und wasserdicht",
    exampleSentenceDe: "Die Wanddurchführung dichtet das Erdkabel im Keller absolut wasserdicht ab.",
    exampleSentenceEs: "El pasamuros sella el cable enterrado en el sótano garantizando total estanqueidad.",
    exampleSentenceDeBlocks: [
      { text: "Die Wanddurchführung", role: "subject", order: 1 },
      { text: "dichtet", role: "verb_p1", order: 2 },
      { text: "das Erdkabel im Keller absolut wasserdicht", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric wall cable penetration feed-through flange conduit sleeve"
  },

  // 10. Aislamiento, Puesta a Tierra y Protección Solar [Ítems 104-111]
  {
    de: "das Isolierband",
    pron: "das i-zo-lía-bant",
    es: "cinta aislante de PVC en colores normativos",
    type: "Sustantivo (Neutro)",
    category: "Installation",
    plural: "die Isolierbänder",
    regimen: "VDE-geprüft",
    exampleSentenceDe: "Ich markiere die Phase mit schwarzem Isolierband.",
    exampleSentenceEs: "Marco la fase con cinta aislante negra.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "markiere", role: "verb_p1", order: 2 },
      { text: "die Phase", role: "complement", order: 3 },
      { text: "mit schwarzem Isolierband", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric colored rolls of electrical PVC insulating tape"
  },
  {
    de: "der Schrumpfschlauch",
    pron: "dea shrúmpf-shlauch",
    es: "tubo termorretráctil aislante",
    type: "Sustantivo (Masc)",
    category: "Installation",
    plural: "die Schrumpfschläuche",
    regimen: "Schrumpfrate 3:1",
    exampleSentenceDe: "Der Schrumpfschlauch schützt die Kabelverbindung vor Feuchtigkeit.",
    exampleSentenceEs: "El tubo termorretráctil protege la conexión de cables contra la humedad.",
    exampleSentenceDeBlocks: [
      { text: "Der Schrumpfschlauch", role: "subject", order: 1 },
      { text: "schützt", role: "verb_p1", order: 2 },
      { text: "die Kabelverbindung", role: "complement", order: 3 },
      { text: "vor Feuchtigkeit", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric black heat-shrink tubing sleeve tubing"
  },
  {
    de: "die Potentialausgleichsschiene (Poti-Schiene)",
    pron: "di po-ten-tsi-ál-áus-gláijs-shí-ne",
    es: "barra de compensación equipotencial de tierra",
    type: "Sustantivo (Fem)",
    category: "Installation",
    plural: "die Potentialausgleichsschienen",
    regimen: "DIN VDE 0100-410 / 540",
    exampleSentenceDe: "Alle Erdungsleitungen laufen auf der Potentialausgleichsschiene zusammen.",
    exampleSentenceEs: "Todas las líneas de tierra convergen en la barra equipotencial.",
    exampleSentenceDeBlocks: [
      { text: "Alle Erdungsleitungen", role: "subject", order: 1 },
      { text: "laufen", role: "verb_p1", order: 2 },
      { text: "auf der Potentialausgleichsschiene", role: "complement", order: 3 },
      { text: "zusammen", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric main earthing terminal equipotential busbar box with transparent cover"
  },
  {
    de: "der Tiefenerder",
    pron: "dea tí-fen-éa-da",
    es: "electrodo de profundidad / pica de tierra",
    type: "Sustantivo (Masc)",
    category: "Installation",
    plural: "die Tiefenerder",
    regimen: "Staberder verzinkt",
    exampleSentenceDe: "Wir schlagen den Tiefenerder tief in das Erdreich ein.",
    exampleSentenceEs: "Clavamos la pica de tierra a gran profundidad en el terreno.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "schlagen", role: "verb_p1", order: 2 },
      { text: "den Tiefenerder tief in das Erdreich", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric galvanized steel grounding earth rod spike"
  },
  {
    de: "der Korrosionsschutz (Denso-Binde)",
    pron: "dea ko-ro-zi-óns-shuts",
    es: "cinta de protección anticorrosiva impregnada",
    type: "Sustantivo (Masc)",
    category: "Installation",
    plural: "-",
    regimen: "Petrolatum-Band",
    exampleSentenceDe: "Ich wickele den Korrosionsschutz um die Erdschelle im Boden.",
    exampleSentenceEs: "Envuelvo la protección anticorrosiva alrededor de la abrazadera de tierra en el suelo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "wickele", role: "verb_p1", order: 2 },
      { text: "den Korrosionsschutz", role: "complement", order: 3 },
      { text: "um die Erdschelle im Boden", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric anti-corrosion petrolatum tape roll for buried pipe grounding"
  },
  {
    de: "das Sicherheitsband für Erdverlegung",
    pron: "das zí-jea-jaits-bant",
    es: "cinta plástica roja de señalización de peligro eléctrico",
    type: "Sustantivo (Neutro)",
    category: "Sicherheit",
    plural: "die Sicherheitsbänder",
    regimen: 'Warnband "Achtung Starkstromkabel"',
    exampleSentenceDe: "Das rote Sicherheitsband warnt vor dem Erdkabel beim Graben.",
    exampleSentenceEs: "La cinta roja de seguridad avisa de la presencia del cable enterrado al cavar.",
    exampleSentenceDeBlocks: [
      { text: "Das rote Sicherheitsband", role: "subject", order: 1 },
      { text: "warnt", role: "verb_p1", order: 2 },
      { text: "vor dem Erdkabel", role: "complement", order: 3 },
      { text: "beim Graben", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric red and white underground warning hazard tape ribbon"
  },
  {
    de: "die Brandschutzplatte",
    pron: "di bránt-shuts-plá-te",
    es: "panel ignífugo de protección contra incendios",
    type: "Sustantivo (Fem)",
    category: "Sicherheit",
    plural: "die Brandschutzplatten",
    regimen: "Baustoffklasse A1",
    exampleSentenceDe: "Wir montieren die Brandschutzplatte hinter dem Wechselrichter an der Holzwand.",
    exampleSentenceEs: "Montamos el panel ignífugo detrás del inversor en la pared de madera.",
    exampleSentenceDeBlocks: [
      { text: "Wir", role: "subject", order: 1 },
      { text: "montieren", role: "verb_p1", order: 2 },
      { text: "die Brandschutzplatte hinter dem Wechselrichter", role: "complement", order: 3 },
      { text: "an der Holzwand", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric fireproof silicate drywall insulation board sheet"
  },
  {
    de: "das Panzertape",
    pron: "das pán-tsa-teip",
    es: "cinta adhesiva americana reforzada con tejido",
    type: "Sustantivo (Neutro)",
    category: "Montage & Befestigung",
    plural: "-",
    regimen: "Gewebeband hochfest",
    exampleSentenceDe: "Das Panzertape sichert Schläuche und Kabel vorübergehend ab.",
    exampleSentenceEs: "La cinta americana asegura tubos y cables temporalmente.",
    exampleSentenceDeBlocks: [
      { text: "Das Panzertape", role: "subject", order: 1 },
      { text: "sichert", role: "verb_p1", order: 2 },
      { text: "Schläuche und Kabel vorübergehend", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric silver duct tape heavy duty adhesive tape roll"
  },

  // 11. Rotulación, Marcado e Iluminación [Ítems 112-118]
  {
    de: "das Beschriftungsgerät",
    pron: "das be-shrif-tungs-gue-ret",
    es: "rotuladora electrónica portátil para cuadros",
    type: "Sustantivo (Neutro)",
    category: "Organisation",
    plural: "die Beschriftungsgeräte",
    regimen: "Thermotransfer-Druck",
    exampleSentenceDe: "Mit dem Beschriftungsgerät drucke ich Etiketten für alle Sicherungen.",
    exampleSentenceEs: "Con la rotuladora imprimo etiquetas para todos los automáticos.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Beschriftungsgerät", role: "complement", order: 1 },
      { text: "drucke", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "Etiketten für alle Sicherungen", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric handheld electronic label maker printer with display and keys"
  },
  {
    de: "der weiße Stift",
    pron: "dea vái-se shtift",
    es: "marcador permanente blanco para cables",
    type: "Sustantivo (Masc)",
    category: "Organisation",
    plural: "die weißen Stifte",
    regimen: "Lackmarker permanent",
    exampleSentenceDe: "Ich markiere die schwarzen Kabel mit dem weißen Stift.",
    exampleSentenceEs: "Marco los cables negros con el rotulador blanco.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "markiere", role: "verb_p1", order: 2 },
      { text: "die schwarzen Kabel", role: "complement", order: 3 },
      { text: "mit dem weißen Stift", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric white paint permanent marker pen"
  },
  {
    de: "der Erste-Hilfe-Koffer",
    pron: "dea éas-te-jíl-fe-kó-fa",
    es: "botiquín de primeros auxilios estanco para obra",
    type: "Sustantivo (Masc)",
    category: "Sicherheit",
    plural: "die Erste-Hilfe-Koffer",
    regimen: "DIN 13157 (Betriebsverbandkasten)",
    exampleSentenceDe: "Der orangefarbene Erste-Hilfe-Koffer befindet sich im Montagefahrzeug.",
    exampleSentenceEs: "El botiquín de primeros auxilios naranja está en el furgón de montaje.",
    exampleSentenceDeBlocks: [
      { text: "Der orangefarbene Erste-Hilfe-Koffer", role: "subject", order: 1 },
      { text: "befindet sich", role: "verb_p1", order: 2 },
      { text: "im Montagefahrzeug", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric bright orange hard plastic first aid emergency medical kit box"
  },
  {
    de: "die LED-Lampe Würth",
    pron: "di el-e-dé-lám-pe vürt",
    es: "lámpara LED de inspección recargable imantada",
    type: "Sustantivo (Fem)",
    category: "Handwerkzeuge",
    plural: "die LED-Lampen",
    regimen: "Magnetfuß & Haken",
    exampleSentenceDe: "Die magnetische LED-Lampe beleuchtet den dunklen Zählerschrank.",
    exampleSentenceEs: "La lámpara LED imantada ilumina el armario del contador oscuro.",
    exampleSentenceDeBlocks: [
      { text: "Die magnetische LED-Lampe", role: "subject", order: 1 },
      { text: "beleuchtet", role: "verb_p1", order: 2 },
      { text: "den dunklen Zählerschrank", role: "complement", order: 3 }
    ],
    en: "cute 3D isometric rechargeable handheld LED magnetic work inspection light torch"
  },
  {
    de: "die Holzleiter",
    pron: "di hólts-lái-ta",
    es: "escalera de tijera de madera (aislante eléctrico)",
    type: "Sustantivo (Fem)",
    category: "PSA & Steighilfen",
    plural: "die Holzleitern",
    regimen: "Elektrisch nicht leitend (VDE)",
    exampleSentenceDe: "Elektriker nutzen die Holzleiter, weil Holz keinen Strom leitet.",
    exampleSentenceEs: "Los electricistas usan la escalera de madera porque la madera no conduce electricidad.",
    exampleSentenceDeBlocks: [
      { text: "Elektriker", role: "subject", order: 1 },
      { text: "nutzen", role: "verb_p1", order: 2 },
      { text: "die Holzleiter", role: "complement", order: 3 },
      { text: "weil Holz keinen Strom leitet", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric classic foldable wooden step ladder electrical insulated"
  },
  {
    de: "die Trittleiter",
    pron: "di trít-lái-ta",
    es: "escalera corta tipo taburete de 2 a 3 peldaños",
    type: "Sustantivo (Fem)",
    category: "PSA & Steighilfen",
    plural: "die Trittleitern",
    regimen: "Klapptritt Aluminium",
    exampleSentenceDe: "Auf der Trittleiter erreiche ich die oberen Reihen des Verteilerkastens.",
    exampleSentenceEs: "En la escalera corta alcanzo las filas superiores del cuadro de distribución.",
    exampleSentenceDeBlocks: [
      { text: "Auf der Trittleiter", role: "complement", order: 1 },
      { text: "erreiche", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "die oberen Reihen des Verteilerkastens", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric small aluminum 3-step folding stool ladder with wide platform"
  },
  {
    de: "der Spanngurt",
    pron: "dea shpán-gurt",
    es: "cincha de amarre con tensor de carraca",
    type: "Sustantivo (Masc)",
    category: "Sicherheit",
    plural: "die Spanngurte",
    regimen: "Ladungssicherung DIN EN 12195-2",
    exampleSentenceDe: "Ich sichere die Leitern im Transporter mit dem Spanngurt.",
    exampleSentenceEs: "Aseguro las escaleras en la furgoneta con la cincha de amarre.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sichere", role: "verb_p1", order: 2 },
      { text: "die Leitern im Transporter", role: "complement", order: 3 },
      { text: "mit dem Spanngurt", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric green ratchet tie-down cargo strap with metallic tension buckle"
  },

  // 12. Guiado, Tracción, Limpieza y Orden en Vivienda [Ítems 119-125]
  {
    de: "der Katiblitz",
    pron: "dea ká-ti-blits",
    es: "guía pasacables de fibra de vidrio en carrete",
    type: "Sustantivo (Masc)",
    category: "Kabel & Leitungen",
    plural: "die Katiblitze",
    regimen: "Glasfaserband Polykat",
    exampleSentenceDe: "Mit dem Katiblitz ziehe ich das LAN-Kabel durch das lange Leerrohr.",
    exampleSentenceEs: "Con el Katiblitz tiro del cable LAN a través del tubo corrugado largo.",
    exampleSentenceDeBlocks: [
      { text: "Mit dem Katiblitz", role: "complement", order: 1 },
      { text: "ziehe", role: "verb_p1", order: 2 },
      { text: "ich", role: "subject", order: 3 },
      { text: "das LAN-Kabel durch das lange Leerrohr", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric red circular cable pulling fiberglass snake reel dispenser device"
  },
  {
    de: "das Kehrblech",
    pron: "das kée-blej",
    es: "recogedor metálico de mano con mango corto",
    type: "Sustantivo (Neutro)",
    category: "Sauberkeit",
    plural: "die Kehrbleche",
    regimen: "Handkehrset",
    exampleSentenceDe: "Ich fege den Bohrstaub mit dem Handfeger auf das Kehrblech.",
    exampleSentenceEs: "Barro el polvo de perforar con la escobilla hacia el recogedor.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "fege", role: "verb_p1", order: 2 },
      { text: "den Bohrstaub mit dem Handfeger", role: "complement", order: 3 },
      { text: "auf das Kehrblech", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric metallic dustpan sheet shovel with wooden handle"
  },
  {
    de: "der Handfeger",
    pron: "dea jánt-fe-ga",
    es: "escobilla de mano de cerdas densas",
    type: "Sustantivo (Masc)",
    category: "Sauberkeit",
    plural: "die Handfeger",
    regimen: "Handbesen",
    exampleSentenceDe: "Der Handfeger säubert den Zählerschrank nach der Montage.",
    exampleSentenceEs: "La escobilla limpia el armario del contador tras el montaje.",
    exampleSentenceDeBlocks: [
      { text: "Der Handfeger", role: "subject", order: 1 },
      { text: "säubert", role: "verb_p1", order: 2 },
      { text: "den Zählerschrank", role: "complement", order: 3 },
      { text: "nach der Montage", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric wooden handheld dust brush broom with horsehair bristles"
  },
  {
    de: "der Staubsauger",
    pron: "dea shtáup-zau-ga",
    es: "aspirador industrial con toma para herramientas",
    type: "Sustantivo (Masc)",
    category: "Sauberkeit",
    plural: "die Staubsauger",
    regimen: "Klasse M (Bohrstaubabsaugung)",
    exampleSentenceDe: "Der Staubsauger saugt den feinen Betonstaub direkt beim Bohren ab.",
    exampleSentenceEs: "El aspirador absorbe el polvo fino de hormigón directamente al taladrar.",
    exampleSentenceDeBlocks: [
      { text: "Der Staubsauger", role: "subject", order: 1 },
      { text: "saugt", role: "verb_p1", order: 2 },
      { text: "den feinen Betonstaub direkt beim Bohren", role: "complement", order: 3 },
      { text: "ab", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric industrial canister vacuum cleaner machine with flexible hose"
  },
  {
    de: "der Staubsaugerbeutel",
    pron: "dea shtáup-zau-ga-boi-tel",
    es: "bolsa de filtro multicapa para aspirador",
    type: "Sustantivo (Masc)",
    category: "Sauberkeit",
    plural: "die Staubsaugerbeutel",
    regimen: "Vliesfilterbeutel",
    exampleSentenceDe: "Ich setze einen neuen Staubsaugerbeutel in den Sauger ein.",
    exampleSentenceEs: "Coloco una nueva bolsa de aspiradora en el aspirador.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "setze", role: "verb_p1", order: 2 },
      { text: "einen neuen Staubsaugerbeutel in den Sauger", role: "complement", order: 3 },
      { text: "ein", role: "verb_p2", order: 4 }
    ],
    en: "cute 3D isometric white fleece vacuum cleaner dust bag with blue plastic collar"
  },
  {
    de: "der Besen",
    pron: "dea bé-zen",
    es: "escoba ancha de taller con mango largo",
    type: "Sustantivo (Masc)",
    category: "Sauberkeit",
    plural: "die Besen",
    regimen: "Saalbesen / Straßenbesen",
    exampleSentenceDe: "Zum Feierabend fegen wir den Kellerboden sauber mit dem Besen.",
    exampleSentenceEs: "Al terminar la jornada barremos el suelo del sótano limpiamente con la escoba.",
    exampleSentenceDeBlocks: [
      { text: "Zum Feierabend", role: "complement", order: 1 },
      { text: "fegen", role: "verb_p1", order: 2 },
      { text: "wir den Kellerboden sauber", role: "subject", order: 3 },
      { text: "mit dem Besen", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric wooden floor sweeping broom with long handle"
  },
  {
    de: "der Eimer",
    pron: "dea ái-ma",
    es: "cubo de plástico reforzado de 10-12 L (Würth)",
    type: "Sustantivo (Masc)",
    category: "Sauberkeit",
    plural: "die Eimer",
    regimen: "Baueimer mit Metallbügel",
    exampleSentenceDe: "Ich sammle Kabelreste und Abfall im roten Eimer.",
    exampleSentenceEs: "Recojo los restos de cable y residuos en el cubo rojo.",
    exampleSentenceDeBlocks: [
      { text: "Ich", role: "subject", order: 1 },
      { text: "sammle", role: "verb_p1", order: 2 },
      { text: "Kabelreste und Abfall", role: "complement", order: 3 },
      { text: "im roten Eimer", role: "complement", order: 4 }
    ],
    en: "cute 3D isometric heavy-duty red plastic construction bucket pail with metal handle"
  }
];

console.log(`\n==================================================`);
console.log(`🛠️ INICIANDO PROCESO DE INYECCIÓN KAPITEL 20`);
console.log(`==================================================`);
console.log(`Total de términos preparados: ${tools125.length} términos.`);

if (tools125.length !== 125) {
  console.error(`❌ ERROR: Se esperaban 125 términos exactos pero hay ${tools125.length}.`);
  process.exit(1);
}

// -------------------------------------------------------------
// FASE 1: INYECCIÓN EN src/data/chapters.jsx
// -------------------------------------------------------------
console.log(`\n[FASE 1] Inyectando en src/data/chapters.jsx...`);
const chaptersPath = path.join(__dirname, '..', 'src', 'data', 'chapters.jsx');
let chaptersContent = fs.readFileSync(chaptersPath, 'utf8');

// 1.1 Asegurar import de Wrench en lucide-react
if (!chaptersContent.includes('Wrench')) {
  chaptersContent = chaptersContent.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];/,
    (match, p1) => `import { ${p1.trim()}, Wrench } from 'lucide-react';`
  );
  console.log(`  ✓ Icono Wrench añadido a imports de lucide-react`);
}

// 1.2 Formatear el objeto del Capítulo 20 en código JSX
const kapitel20Obj = {
  id: 20,
  title: "Kapitel 20: Werkzeuge & Material (Elektro & PV)",
  icon: "__WRENCH_ICON__",
  emoji: "🧰",
  words: tools125
};

let kapitel20Str = JSON.stringify(kapitel20Obj, null, 2);
kapitel20Str = kapitel20Str.replace('"__WRENCH_ICON__"', '<Wrench size={20} />');

// 1.3 Comprobar si ya existe Kapitel 20 para evitar duplicados
if (chaptersContent.includes('id: 20,') || chaptersContent.includes('title: "Kapitel 20:')) {
  console.log(`  ⚠️ Kapitel 20 ya detectado en chapters.jsx. Reemplazando capítulo existente...`);
  chaptersContent = chaptersContent.replace(/\{\s*id:\s*20,[\s\S]*?\n\s*\}\s*,\s*\n\s*\];/g, '];');
}

// Inyectar antes del cierre de rawChapters: `];\n\nexport const chapters`
const rawChaptersEndRegex = /\n\];\s*\n+(export const chapters =)/;
if (!rawChaptersEndRegex.test(chaptersContent)) {
  console.error(`❌ ERROR: No se encontró el cierre de rawChapters en chapters.jsx`);
  process.exit(1);
}

const replacementChunk = `,\n${kapitel20Str}\n];\n\n$1`;
chaptersContent = chaptersContent.replace(rawChaptersEndRegex, replacementChunk);
fs.writeFileSync(chaptersPath, chaptersContent, 'utf8');
console.log(`  ✓ Kapitel 20 inyectado exitosamente en src/data/chapters.jsx`);

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

tools125.forEach(t => {
  const safeId = getSafeId(t.de);
  const vocabItem = {
    id: safeId,
    word: t.de,
    exampleSentenceDe: t.exampleSentenceDe,
    exampleSentenceEs: t.exampleSentenceEs,
    exampleSentenceDeBlocks: t.exampleSentenceDeBlocks
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
// FASE 3: GENERACIÓN DE TABLA MAESTRA docs/kapitel_20_werkzeuge_tabelle.md
// -------------------------------------------------------------
console.log(`\n[FASE 3] Generando docs/kapitel_20_werkzeuge_tabelle.md...`);
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

let mdContent = `# 🧰 Kapitel 20: Werkzeuge & Material (Elektro & PV)
### Enpal Academy — Glosario Técnico de Obra & Instalación Fotovoltaica (A1+)

> **Total de Entradas Técnicas:** 125 términos normativos con especificación técnica, fonética en español, categorización de obra y oraciones en contexto de montaje (Zählerschrank, Wechselrichter, Wallbox, PV-Anlage).

| # | Deutsch mit Artikel | Lautschrift (Pronunciación) | Spanisch (Traducción de Obra) | Wortart | Kategorie | Spezifikation / Norm | Beispielsatz Deutsch | Beispielsatz Spanisch |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

tools125.forEach((t, idx) => {
  const num = idx + 1;
  const de = t.de.replace(/\|/g, '\\|');
  const pron = t.pron.replace(/\|/g, '\\|');
  const es = t.es.replace(/\|/g, '\\|');
  const type = t.type.replace(/\|/g, '\\|');
  const cat = t.category.replace(/\|/g, '\\|');
  const reg = (t.regimen || '-').replace(/\|/g, '\\|');
  const deEx = t.exampleSentenceDe.replace(/\|/g, '\\|');
  const esEx = t.exampleSentenceEs.replace(/\|/g, '\\|');

  mdContent += `| ${num} | **${de}** | *${pron}* | ${es} | \`${type}\` | ${cat} | ${reg} | ${deEx} | ${esEx} |\n`;
});

const docPath = path.join(docsDir, 'kapitel_20_werkzeuge_tabelle.md');
fs.writeFileSync(docPath, mdContent, 'utf8');
console.log(`  ✓ Archivo Markdown generado con 125 filas en: docs/kapitel_20_werkzeuge_tabelle.md`);

// -------------------------------------------------------------
// FASE 4: SINCRONIZACIÓN DE TOTALES EN Profile.jsx Y App.jsx
// -------------------------------------------------------------
console.log(`\n[FASE 4] Actualizando métricas de conteo a 1320 palabras...`);
const profilePath = path.join(__dirname, '..', 'src', 'components', 'Profile.jsx');
if (fs.existsSync(profilePath)) {
  let profileContent = fs.readFileSync(profilePath, 'utf8');
  profileContent = profileContent.replace(/totalCardsCount\s*=\s*1195/g, 'totalCardsCount = 1320');
  fs.writeFileSync(profilePath, profileContent, 'utf8');
  console.log(`  ✓ Profile.jsx actualizado (default totalCardsCount = 1320)`);
}

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  if (appContent.includes('<Profile') && !appContent.includes('totalCardsCount=')) {
    appContent = appContent.replace(
      /(<Profile[\s\S]*?unlockedCardsCount=\{Object\.keys\(unlockedCards \|\| \{\}\)\.length\})/g,
      `$1\n        totalCardsCount={chapters.flatMap(c => c.words || []).length || 1320}`
    );
    fs.writeFileSync(appPath, appContent, 'utf8');
    console.log(`  ✓ App.jsx actualizado con totalCardsCount dinámico`);
  }
}

console.log(`\n🎉 PROCESO DE INYECCIÓN Y SINCRONIZACIÓN COMPLETADO CON ÉXITO.`);
