// src/data/immersiveStoriesCatalog.js
// Catálogo Inmersivo "Leselabor & Tagesgeschichten PRO" (Estilo Readle)
// Personalizado para DeutschMeister PRO A1 (v2.0)

export const STORY_CATEGORIES = [
  {
    id: "enpal",
    label: "Enpal (Interior)",
    badge: "⚡ Enpal (Interior)",
    description: "Trabajo eléctrico interior: Keller, Zählerschrank, Wechselrichter, Speicher, Wallbox y normas VDE.",
    suggestedTopics: [
      "Fehlersuche am Wechselrichter im Keller",
      "Überspannungsschutz (SPD) im Zählerschrank installieren",
      "Smart Meter und Wallbox per App einrichten",
      "Messprotokoll mit dem Multimeter erstellen"
    ]
  },
  {
    id: "behoerden",
    label: "Trámites & Behörden",
    badge: "🏛️ Trámites & Behörden",
    description: "Citas oficiales en Alemania: Bürgeramt, Ausländerbehörde, Führerschein, banco y seguro médico.",
    suggestedTopics: [
      "Steuerklasse beim Finanzamt prüfen lassen",
      "Stromvertrag und Internet für die neue Wohnung anmelden",
      "Einen Brief von der Krankenkasse verstehen",
      "Beim TÜV das Firmenfahrzeug prüfen lassen"
    ]
  },
  {
    id: "familie",
    label: "Familia & Hogar",
    badge: "👨‍👩‍👧‍👦 Familia & Hogar",
    description: "Reagrupación familiar (Familiennachzug), piso para 5 personas, colegio, Kita y llegada a Alemania.",
    suggestedTopics: [
      "Einkaufen für fünf Personen im Supermarkt",
      "Elternabend in der Grundschule vorbereiten",
      "Einen Kinderarzt-Termin telefonisch vereinbaren",
      "Sonntagsausflug mit der Familie in den Park"
    ]
  }
];

/**
 * Constructor compacto de entradas de conjugación verbal para el modal estilo Readle.
 */
function buildVerb(infinitive, translationEs, auxiliary, praesensArr, praeteritumArr, perfekt, partizip) {
  const [pIch, pDu, pEr, pWir, pIhr, pSie] = praesensArr;
  const [prIch, prDu, prEr, prWir, prIhr, prSie] = praeteritumArr;
  return {
    infinitive,
    translationEs,
    auxiliary,
    praesens: { ich: pIch, du: pDu, er_sie_es: pEr, wir: pWir, ihr: pIhr, sie_Sie: pSie },
    praeteritum: { ich: prIch, du: prDu, er_sie_es: prEr, wir: prWir, ihr: prIhr, sie_Sie: prSie },
    perfekt,
    partizip
  };
}

/**
 * Verbos base compartidos de alta frecuencia en alemán A1/A2.
 */
export const SHARED_VERBS = {
  sein: buildVerb("sein", "ser / estar", "sein",
    ["bin", "bist", "ist", "sind", "seid", "sind"],
    ["war", "warst", "war", "waren", "wart", "waren"],
    "ist gewesen", "seiend"
  ),
  haben: buildVerb("haben", "tener / haber", "haben",
    ["habe", "hast", "hat", "haben", "habt", "haben"],
    ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"],
    "hat gehabt", "habend"
  ),
  werden: buildVerb("werden", "llegar a ser / hacerse", "sein",
    ["werde", "wirst", "wird", "werden", "werdet", "werden"],
    ["wurde", "wurdest", "wurde", "wurden", "wurdet", "wurden"],
    "ist geworden", "werdend"
  ),
  arbeiten: buildVerb("arbeiten", "trabajar", "haben",
    ["arbeite", "arbeitest", "arbeitet", "arbeiten", "arbeitet", "arbeiten"],
    ["arbeitete", "arbeitetest", "arbeitete", "arbeiteten", "arbeitetet", "arbeiteten"],
    "hat gearbeitet", "arbeitend"
  ),
  pruefen: buildVerb("prüfen", "comprobar / revisar", "haben",
    ["prüfe", "prüfst", "prüft", "prüfen", "prüft", "prüfen"],
    ["prüfte", "prüftest", "prüfte", "prüften", "prüftet", "prüften"],
    "hat geprüft", "prüfend"
  ),
  anschliessen: buildVerb("anschließen", "conectar / empalmar", "haben",
    ["schließe an", "schließt an", "schließt an", "schließen an", "schließt an", "schließen an"],
    ["schloss an", "schlossest an", "schloss an", "schlossen an", "schlosst an", "schlossen an"],
    "hat angeschlossen", "anschließend"
  ),
  stehen: buildVerb("stehen", "estar de pie / encontrarse", "haben",
    ["stehe", "stehst", "steht", "stehen", "steht", "stehen"],
    ["stand", "standest", "stand", "standen", "standet", "standen"],
    "hat gestanden", "stehend"
  ),
  haengen: buildVerb("hängen", "colgar / estar colgado", "haben",
    ["hänge", "hängst", "hängt", "hängen", "hängt", "hängen"],
    ["hing", "hingst", "hing", "hingen", "hingt", "hingen"],
    "hat gehangen", "hängend"
  ),
  verlegen: buildVerb("verlegen", "tender (cables) / trasladar", "haben",
    ["verlege", "verlegst", "verlegt", "verlegen", "verlegt", "verlegen"],
    ["verlegte", "verlegtest", "verlegte", "verlegten", "verlegtet", "verlegten"],
    "hat verlegt", "verlegend"
  ),
  leuchten: buildVerb("leuchten", "iluminar / encenderse (luz)", "haben",
    ["leuchte", "leuchtest", "leuchtet", "leuchten", "leuchtet", "leuchten"],
    ["leuchtete", "leuchtetest", "leuchtete", "leuchteten", "leuchtetet", "leuchteten"],
    "hat geleuchtet", "leuchtend"
  ),
  befolgen: buildVerb("befolgen", "seguir / cumplir (normas)", "haben",
    ["befolge", "befolgst", "befolgt", "befolgen", "befolgt", "befolgen"],
    ["befolgte", "befolgtest", "befolgte", "befolgten", "befolgtet", "befolgten"],
    "hat befolgt", "befolgend"
  ),
  freischalten: buildVerb("freischalten", "desconectar (dejar sin tensión)", "haben",
    ["schalte frei", "schaltest frei", "schaltet frei", "schalten frei", "schaltet frei", "schalten frei"],
    ["schaltete frei", "schaltetest frei", "schaltete frei", "schalteten frei", "schaltetet frei", "schalteten frei"],
    "hat freigeschaltet", "freischaltend"
  ),
  sichern: buildVerb("sichern", "asegurar / bloquear", "haben",
    ["sichere", "sicherst", "sichert", "sichern", "sichert", "sichern"],
    ["sicherte", "sichertest", "sicherte", "sicherten", "sichertet", "sicherten"],
    "hat gesichert", "sichernd"
  ),
  feststellen: buildVerb("feststellen", "constatar / verificar", "haben",
    ["stelle fest", "stellst fest", "stellt fest", "stellen fest", "stellt fest", "stellen fest"],
    ["stellte fest", "stelltest fest", "stellte fest", "stellten fest", "stelltet fest", "stellten fest"],
    "hat festgestellt", "feststellend"
  ),
  beginnen: buildVerb("beginnen", "empezar / comenzar", "haben",
    ["beginne", "beginnst", "beginnt", "beginnen", "beginnt", "beginnen"],
    ["begann", "begannst", "begann", "begannen", "begannt", "begannen"],
    "hat begonnen", "beginnend"
  ),
  verbinden: buildVerb("verbinden", "conectar / enlazar", "haben",
    ["verbinde", "verbindest", "verbindet", "verbinden", "verbindet", "verbinden"],
    ["verband", "verbandest", "verband", "verbanden", "verbandet", "verbanden"],
    "hat verbunden", "verbindend"
  ),
  zeigen: buildVerb("zeigen", "mostrar / enseñar", "haben",
    ["zeige", "zeigst", "zeigt", "zeigen", "zeigt", "zeigen"],
    ["zeigte", "zeigtest", "zeigte", "zeigten", "zeigtet", "zeigten"],
    "hat gezeigt", "zeigend"
  ),
  sehen: buildVerb("sehen", "ver", "haben",
    ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
    ["sah", "sahst", "sah", "sahen", "saht", "sahen"],
    "hat gesehen", "sehend"
  ),
  sammeln: buildVerb("sammeln", "recoger / acumular / reunir", "haben",
    ["sammle", "sammelst", "sammelt", "sammeln", "sammelt", "sammeln"],
    ["sammelte", "sammeltest", "sammelte", "sammelten", "sammeltet", "sammelten"],
    "hat gesammelt", "sammelnd"
  ),
  erklaeren: buildVerb("erklären", "explicar", "haben",
    ["erkläre", "erklärst", "erklärt", "erklären", "erklärt", "erklären"],
    ["erklärte", "erklärtest", "erklärte", "erklärten", "erklärtet", "erklärten"],
    "hat erklärt", "erklärend"
  ),
  geben: buildVerb("geben", "dar", "haben",
    ["gebe", "gibst", "gibt", "geben", "gebt", "geben"],
    ["gab", "gabst", "gab", "gaben", "gabt", "gaben"],
    "hat gegeben", "gebend"
  ),
  unterschreiben: buildVerb("unterschreiben", "firmar", "haben",
    ["unterschreibe", "unterschreibst", "unterschreibt", "unterschreiben", "unterschreibt", "unterschreiben"],
    ["unterschrieb", "unterschriebst", "unterschrieb", "unterschrieben", "unterschriebt", "unterschrieben"],
    "hat unterschrieben", "unterschreibend"
  ),
  ankommen: buildVerb("ankommen", "llegar", "sein",
    ["komme an", "kommst an", "kommt an", "kommen an", "kommt an", "kommen an"],
    ["kam an", "kamst an", "kam an", "kamen an", "kamt an", "kamen an"],
    "ist angekommen", "ankommend"
  ),
  trinken: buildVerb("trinken", "beber / tomar", "haben",
    ["trinke", "trinkst", "trinkt", "trinken", "trinkt", "trinken"],
    ["trank", "trankst", "trank", "tranken", "trankt", "tranken"],
    "hat getrunken", "trinkend"
  ),
  lesen: buildVerb("lesen", "leer", "haben",
    ["lese", "liest", "liest", "lesen", "lest", "lesen"],
    ["las", "lasest", "las", "lasen", "last", "lasen"],
    "hat gelesen", "lesend"
  ),
  anziehen: buildVerb("anziehen", "ponerse (ropa/calzado)", "haben",
    ["ziehe an", "ziehst an", "zieht an", "ziehen an", "zieht an", "ziehen an"],
    ["zog an", "zogst an", "zog an", "zogen an", "zogt an", "zogen an"],
    "hat angezogen", "anziehend"
  ),
  kontrollieren: buildVerb("kontrollieren", "controlar / revisar", "haben",
    ["kontrolliere", "kontrollierst", "kontrolliert", "kontrollieren", "kontrolliert", "kontrollieren"],
    ["kontrollierte", "kontrolliertest", "kontrollierte", "kontrollierten", "kontrolliertet", "kontrollierten"],
    "hat kontrolliert", "kontrollierend"
  ),
  laden: buildVerb("laden", "cargar", "haben",
    ["lade", "lädst", "lädt", "laden", "ladet", "laden"],
    ["lud", "ludst", "lud", "luden", "ludet", "luden"],
    "hat geladen", "ladend"
  ),
  fahren: buildVerb("fahren", "conducir / ir (en vehículo)", "sein",
    ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
    ["fuhr", "fuhrst", "fuhr", "fuhren", "fuhrt", "fuhren"],
    "ist gefahren", "fahrend"
  ),
  warten: buildVerb("warten", "esperar", "haben",
    ["warte", "wartest", "wartet", "warten", "wartet", "warten"],
    ["wartete", "wartetest", "wartete", "warteten", "wartetet", "warteten"],
    "hat gewartet", "wartend"
  ),
  erscheinen: buildVerb("erscheinen", "aparecer", "sein",
    ["erscheine", "erscheinst", "erscheint", "erscheinen", "erscheint", "erscheinen"],
    ["erschien", "erschienst", "erschien", "erschienen", "erschient", "erschienen"],
    "ist erschienen", "erscheinend"
  ),
  bitten: buildVerb("bitten", "pedir / rogar", "haben",
    ["bitte", "bittest", "bittet", "bitten", "bittet", "bitten"],
    ["bat", "batst", "bat", "baten", "batet", "baten"],
    "hat gebeten", "bittend"
  ),
  legen: buildVerb("legen", "poner / colocar (horizontal)", "haben",
    ["lege", "legst", "legt", "legen", "legt", "legen"],
    ["legte", "legtest", "legte", "legten", "legtet", "legten"],
    "hat gelegt", "legend"
  ),
  ausfuellen: buildVerb("ausfüllen", "rellenar (formulario)", "haben",
    ["fülle aus", "füllst aus", "füllt aus", "füllen aus", "füllt aus", "füllen aus"],
    ["füllte aus", "fülltest aus", "füllte aus", "füllten aus", "fülltet aus", "füllten aus"],
    "hat ausgefüllt", "ausfüllend"
  ),
  ausdrucken: buildVerb("ausdrucken", "imprimir", "haben",
    ["drucke aus", "druckst aus", "druckt aus", "drucken aus", "druckt aus", "drucken aus"],
    ["druckte aus", "drucktest aus", "druckte aus", "druckten aus", "drucktet aus", "druckten aus"],
    "hat ausgedruckt", "ausdruckend"
  ),
  bekommen: buildVerb("bekommen", "recibir / obtener", "haben",
    ["bekomme", "bekommst", "bekommt", "bekommen", "bekommt", "bekommen"],
    ["bekam", "bekamst", "bekam", "bekamen", "bekamt", "bekamen"],
    "hat bekommen", "bekommend"
  ),
  gehen: buildVerb("gehen", "ir (a pie)", "sein",
    ["gehe", "gehst", "geht", "gehen", "geht", "gehen"],
    ["ging", "gingst", "ging", "gingen", "gingt", "gingen"],
    "ist gegangen", "gehend"
  ),
  abgeben: buildVerb("abgeben", "entregar", "haben",
    ["gebe ab", "gibst ab", "gibt ab", "geben ab", "gebt ab", "geben ab"],
    ["gab ab", "gabst ab", "gab ab", "gaben ab", "gabt ab", "gaben ab"],
    "hat abgegeben", "abgebend"
  ),
  bezahlen: buildVerb("bezahlen", "pagar", "haben",
    ["bezahle", "bezahlst", "bezahlt", "bezahlen", "bezahlt", "bezahlen"],
    ["bezahlte", "bezahltest", "bezahlte", "bezahlten", "bezahltet", "bezahlten"],
    "hat bezahlt", "bezahlend"
  ),
  abholen: buildVerb("abholen", "recoger / ir a buscar", "haben",
    ["hole ab", "holst ab", "holt ab", "holen ab", "holt ab", "holen ab"],
    ["holte ab", "holtest ab", "holte ab", "holten ab", "holtet ab", "holten ab"],
    "hat abgeholt", "abholend"
  ),
  stellen: buildVerb("stellen", "colocar / presentar (solicitud)", "haben",
    ["stelle", "stellst", "stellt", "stellen", "stellt", "stellen"],
    ["stellte", "stelltest", "stellte", "stellten", "stelltet", "stellten"],
    "hat gestellt", "stellend"
  ),
  brauchen: buildVerb("brauchen", "necesitar", "haben",
    ["brauche", "brauchst", "braucht", "brauchen", "braucht", "brauchen"],
    ["brauchte", "brauchtest", "brauchte", "brauchten", "brauchtet", "brauchten"],
    "hat gebraucht", "brauchend"
  ),
  wiederholen: buildVerb("wiederholen", "repasar / repetir", "haben",
    ["wiederhole", "wiederholst", "wiederholt", "wiederholen", "wiederholt", "wiederholen"],
    ["wiederholte", "wiederholtest", "wiederholte", "wiederholten", "wiederholtet", "wiederholten"],
    "hat wiederholt", "wiederholend"
  ),
  achten: buildVerb("achten", "prestar atención / respetar", "haben",
    ["achte", "achtest", "achtet", "achten", "achtet", "achten"],
    ["achtete", "achtetest", "achtete", "achteten", "achtetet", "achteten"],
    "hat geachtet", "achtend"
  ),
  halten: buildVerb("halten", "sostener / detener", "haben",
    ["halte", "hältst", "hält", "halten", "haltet", "halten"],
    ["hielt", "hieltst", "hielt", "hielten", "hieltet", "hielten"],
    "hat gehalten", "haltend"
  ),
  eroeffnen: buildVerb("eröffnen", "abrir (cuenta) / inaugurar", "haben",
    ["eröffne", "eröffnest", "eröffnet", "eröffnen", "eröffnet", "eröffnen"],
    ["eröffnete", "eröffnetest", "eröffnete", "eröffneten", "eröffnetet", "eröffneten"],
    "hat eröffnet", "eröffnend"
  ),
  schicken: buildVerb("schicken", "enviar / mandar", "haben",
    ["schicke", "schickst", "schickt", "schicken", "schickt", "schicken"],
    ["schickte", "schicktest", "schickte", "schickten", "schicktet", "schickten"],
    "hat geschickt", "schickend"
  ),
  waehlen: buildVerb("wählen", "elegir / marcar", "haben",
    ["wähle", "wählst", "wählt", "wählen", "wählt", "wählen"],
    ["wählte", "wähltest", "wählte", "wählten", "wähltet", "wählten"],
    "hat gewählt", "wählend"
  ),
  buchen: buildVerb("buchen", "reservar", "haben",
    ["buche", "buchst", "bucht", "buchen", "bucht", "buchen"],
    ["buchte", "buchtest", "buchte", "buchten", "buchtet", "buchten"],
    "hat gebucht", "buchend"
  ),
  untersuchen: buildVerb("untersuchen", "examinar / revisar (médico)", "haben",
    ["untersuche", "untersuchst", "untersucht", "untersuchen", "untersucht", "untersuchen"],
    ["untersuchte", "untersuchtest", "untersuchte", "untersuchten", "untersuchtet", "untersuchten"],
    "hat untersucht", "untersuchend"
  ),
  leben: buildVerb("leben", "vivir", "haben",
    ["lebe", "lebst", "lebt", "leben", "lebt", "leben"],
    ["lebte", "lebtest", "lebte", "lebten", "lebtet", "lebten"],
    "hat gelebt", "lebend"
  ),
  beantragen: buildVerb("beantragen", "solicitar (trámite)", "haben",
    ["beantrage", "beantragst", "beantragt", "beantragen", "beantragt", "beantragen"],
    ["beantragte", "beantragtest", "beantragte", "beantragten", "beantragtet", "beantragten"],
    "hat beantragt", "beantragend"
  ),
  uebersetzen: buildVerb("übersetzen", "traducir", "haben",
    ["übersetze", "übersetzt", "übersetzt", "übersetzen", "übersetzt", "übersetzen"],
    ["übersetzte", "übersetztest", "übersetzte", "übersetzten", "übersetztet", "übersetzten"],
    "hat übersetzt", "übersetzend"
  ),
  hoffen: buildVerb("hoffen", "esperar (tener esperanza)", "haben",
    ["hoffe", "hoffst", "hofft", "hoffen", "hofft", "hoffen"],
    ["hoffte", "hofftest", "hoffte", "hofften", "hofftet", "hofften"],
    "hat gehofft", "hoffend"
  ),
  suchen: buildVerb("suchen", "buscar", "haben",
    ["suche", "suchst", "sucht", "suchen", "sucht", "suchen"],
    ["suchte", "suchtest", "suchte", "suchten", "suchtet", "suchten"],
    "hat gesucht", "suchend"
  ),
  ueberweisen: buildVerb("überweisen", "transferir (dinero)", "haben",
    ["überweise", "überweist", "überweist", "überweisen", "überweist", "überweisen"],
    ["überwies", "überwiesest", "überwies", "überwiesen", "überwiest", "überwiesen"],
    "hat überwiesen", "überweisend"
  ),
  mieten: buildVerb("mieten", "alquilar", "haben",
    ["miete", "mietest", "mietet", "mieten", "mietet", "mieten"],
    ["mietete", "mietetest", "mietete", "mieteten", "mietetet", "mieteten"],
    "hat gemietet", "mietend"
  ),
  reservieren: buildVerb("reservieren", "reservar", "haben",
    ["reserviere", "reservierst", "reserviert", "reservieren", "reserviert", "reservieren"],
    ["reservierte", "reserviertest", "reservierte", "reservierten", "reserviertet", "reservierten"],
    "hat reserviert", "reservierend"
  ),
  organisieren: buildVerb("organisieren", "organizar", "haben",
    ["organisiere", "organisierst", "organisiert", "organisieren", "organisiert", "organisieren"],
    ["organisierte", "organisiertest", "organisierte", "organisierten", "organisiertet", "organisierten"],
    "hat organisiert", "organisierend"
  ),
  unterstuetzen: buildVerb("unterstützen", "apoyar / sostener", "haben",
    ["unterstütze", "unterstützt", "unterstützt", "unterstützen", "unterstützt", "unterstützen"],
    ["unterstützte", "unterstütztest", "unterstützte", "unterstützten", "unterstütztet", "unterstützten"],
    "hat unterstützt", "unterstützend"
  ),
  landen: buildVerb("landen", "aterrizar", "sein",
    ["lande", "landest", "landet", "landen", "landet", "landen"],
    ["landete", "landetest", "landete", "landeten", "landetet", "landeten"],
    "ist gelandet", "landend"
  ),
  kaufen: buildVerb("kaufen", "comprar", "haben",
    ["kaufe", "kaufst", "kauft", "kaufen", "kauft", "kaufen"],
    ["kaufte", "kauftest", "kaufte", "kauften", "kauftet", "kauften"],
    "hat gekauft", "kaufend"
  ),
  umarmen: buildVerb("umarmen", "abrazar", "haben",
    ["umarme", "umarmst", "umarmt", "umarmen", "umarmt", "umarmen"],
    ["umarmte", "umarmtest", "umarmte", "umarmten", "umarmtet", "umarmten"],
    "hat umarmt", "umarmend"
  ),
  freuen: buildVerb("sich freuen", "alegrarse", "haben",
    ["freue mich", "freust dich", "freut sich", "freuen uns", "freut euch", "freuen sich"],
    ["freute mich", "freutest dich", "freute sich", "freuten uns", "freutet euch", "freuten sich"],
    "hat sich gefreut", "freuend"
  ),
  kochen: buildVerb("kochen", "cocinar", "haben",
    ["koche", "kochst", "kocht", "kochen", "kocht", "kochen"],
    ["kochte", "kochtest", "kochte", "kochten", "kochtet", "kochten"],
    "hat gekocht", "kochend"
  ),
  feiern: buildVerb("feiern", "celebrar", "haben",
    ["feiere", "feierst", "feiert", "feiern", "feiert", "feiern"],
    ["feierte", "feiertest", "feierte", "feierten", "feiertet", "feierten"],
    "hat gefeiert", "feiernd"
  ),
  mitnehmen: buildVerb("mitnehmen", "llevar consigo", "haben",
    ["nehme mit", "nimmst mit", "nimmt mit", "nehmen mit", "nehmt mit", "nehmen mit"],
    ["nahm mit", "nahmst mit", "nahm mit", "nahmen mit", "nahmt mit", "nahmen mit"],
    "hat mitgenommen", "mitnehmend"
  )
};

function pickVerbs(...keys) {
  const result = {};
  for (const k of keys) {
    if (SHARED_VERBS[k]) result[k] = SHARED_VERBS[k];
  }
  return result;
}

/**
 * Diccionario de respaldo para palabras funcionales y vocabulario general del alemán A1/A2.
 */
const BASE_FUNCTIONAL_GLOSSARY = {
  der: { lemma: "der", translationEs: "el (masc. nom. / fem. dat.)", pos: "Art.", level: "A1", isVerb: false },
  die: { lemma: "die", translationEs: "la / los / las", pos: "Art.", level: "A1", isVerb: false },
  das: { lemma: "das", translationEs: "el / lo (neutro)", pos: "Art.", level: "A1", isVerb: false },
  den: { lemma: "den", translationEs: "el (masc. acusativo) / los (dat.)", pos: "Art.", level: "A1", isVerb: false },
  dem: { lemma: "dem", translationEs: "al / el (dativo masc./neut.)", pos: "Art.", level: "A1", isVerb: false },
  des: { lemma: "des", translationEs: "del (genitivo masc./neut.)", pos: "Art.", level: "A2", isVerb: false },
  ein: { lemma: "ein", translationEs: "un / una", pos: "Art.", level: "A1", isVerb: false },
  eine: { lemma: "ein", translationEs: "una", pos: "Art.", level: "A1", isVerb: false },
  einen: { lemma: "ein", translationEs: "un (acusativo masc.)", pos: "Art.", level: "A1", isVerb: false },
  einem: { lemma: "ein", translationEs: "un (dativo masc./neut.)", pos: "Art.", level: "A1", isVerb: false },
  einer: { lemma: "ein", translationEs: "una (dativo/genitivo fem.)", pos: "Art.", level: "A1", isVerb: false },
  mein: { lemma: "mein", translationEs: "mi", pos: "Pron.", level: "A1", isVerb: false },
  meine: { lemma: "mein", translationEs: "mi / mis", pos: "Pron.", level: "A1", isVerb: false },
  meinen: { lemma: "mein", translationEs: "mi (acus. masc.) / mis (dat.)", pos: "Pron.", level: "A1", isVerb: false },
  meinem: { lemma: "mein", translationEs: "mi (dativo masc./neut.)", pos: "Pron.", level: "A1", isVerb: false },
  meiner: { lemma: "mein", translationEs: "mi (dativo fem.)", pos: "Pron.", level: "A1", isVerb: false },
  seinem: { lemma: "sein", translationEs: "su (de él, dativo)", pos: "Pron.", level: "A1", isVerb: false },
  seinen: { lemma: "sein", translationEs: "su (de él, acus. masc.)", pos: "Pron.", level: "A1", isVerb: false },
  unser: { lemma: "unser", translationEs: "nuestro", pos: "Pron.", level: "A1", isVerb: false },
  unsere: { lemma: "unser", translationEs: "nuestra / nuestros", pos: "Pron.", level: "A1", isVerb: false },
  unseren: { lemma: "unser", translationEs: "nuestro (acus. masc.)", pos: "Pron.", level: "A1", isVerb: false },
  ich: { lemma: "ich", translationEs: "yo", pos: "Pron.", level: "A1", isVerb: false },
  du: { lemma: "du", translationEs: "tú", pos: "Pron.", level: "A1", isVerb: false },
  er: { lemma: "er", translationEs: "él", pos: "Pron.", level: "A1", isVerb: false },
  sie: { lemma: "sie", translationEs: "ella / ellos / ellas", pos: "Pron.", level: "A1", isVerb: false },
  es: { lemma: "es", translationEs: "ello / lo", pos: "Pron.", level: "A1", isVerb: false },
  wir: { lemma: "wir", translationEs: "nosotros / nosotras", pos: "Pron.", level: "A1", isVerb: false },
  ihr: { lemma: "ihr", translationEs: "vosotros / su (de ella)", pos: "Pron.", level: "A1", isVerb: false },
  ihren: { lemma: "ihr", translationEs: "su (de ella/ellos, acus.)", pos: "Pron.", level: "A1", isVerb: false },
  mich: { lemma: "ich", translationEs: "me (acusativo)", pos: "Pron.", level: "A1", isVerb: false },
  mir: { lemma: "ich", translationEs: "me / a mí (dativo)", pos: "Pron.", level: "A1", isVerb: false },
  uns: { lemma: "wir", translationEs: "nos (acus./dat.)", pos: "Pron.", level: "A1", isVerb: false },
  sich: { lemma: "sich", translationEs: "se (reflexivo)", pos: "Pron.", level: "A1", isVerb: false },
  und: { lemma: "und", translationEs: "y", pos: "Konj.", level: "A1", isVerb: false },
  oder: { lemma: "oder", translationEs: "o", pos: "Konj.", level: "A1", isVerb: false },
  aber: { lemma: "aber", translationEs: "pero", pos: "Konj.", level: "A1", isVerb: false },
  denn: { lemma: "denn", translationEs: "porque / pues", pos: "Konj.", level: "A1", isVerb: false },
  weil: { lemma: "weil", translationEs: "porque (subordinada)", pos: "Konj.", level: "A2", isVerb: false },
  dass: { lemma: "dass", translationEs: "que", pos: "Konj.", level: "A2", isVerb: false },
  als: { lemma: "als", translationEs: "como / cuando (pasado)", pos: "Konj./Präp.", level: "A1", isVerb: false },
  bevor: { lemma: "bevor", translationEs: "antes de que", pos: "Konj.", level: "A2", isVerb: false },
  bis: { lemma: "bis", translationEs: "hasta (que)", pos: "Konj./Präp.", level: "A1", isVerb: false },
  wie: { lemma: "wie", translationEs: "cómo / como", pos: "Adv.", level: "A1", isVerb: false },
  im: { lemma: "in + dem", translationEs: "en el / dentro del", pos: "Präp.+Art.", level: "A1", isVerb: false },
  in: { lemma: "in", translationEs: "en / dentro de", pos: "Präp.", level: "A1", isVerb: false },
  am: { lemma: "an + dem", translationEs: "en el / junto al / el (día)", pos: "Präp.+Art.", level: "A1", isVerb: false },
  an: { lemma: "an", translationEs: "en / junto a (vertical)", pos: "Präp.", level: "A1", isVerb: false },
  auf: { lemma: "auf", translationEs: "sobre / en (encima)", pos: "Präp.", level: "A1", isVerb: false },
  aus: { lemma: "aus", translationEs: "de / desde (procedencia)", pos: "Präp.", level: "A1", isVerb: false },
  bei: { lemma: "bei", translationEs: "en / junto a / en casa de", pos: "Präp.", level: "A1", isVerb: false },
  beim: { lemma: "bei + dem", translationEs: "en el / al (hacer algo)", pos: "Präp.+Art.", level: "A1", isVerb: false },
  fuer: { lemma: "für", translationEs: "para / por", pos: "Präp.", level: "A1", isVerb: false },
  für: { lemma: "für", translationEs: "para / por", pos: "Präp.", level: "A1", isVerb: false },
  gegen: { lemma: "gegen", translationEs: "contra", pos: "Präp.", level: "A1", isVerb: false },
  mit: { lemma: "mit", translationEs: "con", pos: "Präp.", level: "A1", isVerb: false },
  nach: { lemma: "nach", translationEs: "después de / hacia", pos: "Präp.", level: "A1", isVerb: false },
  neben: { lemma: "neben", translationEs: "al lado de / junto a", pos: "Präp.", level: "A1", isVerb: false },
  ohne: { lemma: "ohne", translationEs: "sin", pos: "Präp.", level: "A1", isVerb: false },
  seit: { lemma: "seit", translationEs: "desde hace", pos: "Präp.", level: "A1", isVerb: false },
  über: { lemma: "über", translationEs: "sobre / acerca de", pos: "Präp.", level: "A1", isVerb: false },
  um: { lemma: "um", translationEs: "a las (hora) / por", pos: "Präp.", level: "A1", isVerb: false },
  von: { lemma: "von", translationEs: "de / por parte de", pos: "Präp.", level: "A1", isVerb: false },
  vor: { lemma: "vor", translationEs: "antes de / delante de", pos: "Präp.", level: "A1", isVerb: false },
  zu: { lemma: "zu", translationEs: "a / hacia / demasiado", pos: "Präp.", level: "A1", isVerb: false },
  zum: { lemma: "zu + dem", translationEs: "al (masc./neut.)", pos: "Präp.+Art.", level: "A1", isVerb: false },
  zur: { lemma: "zu + der", translationEs: "a la (fem.)", pos: "Präp.+Art.", level: "A1", isVerb: false },
  durch: { lemma: "durch", translationEs: "a través de / por", pos: "Präp.", level: "A1", isVerb: false },
  sowie: { lemma: "sowie", translationEs: "así como / y también", pos: "Konj.", level: "A2", isVerb: false },
  heute: { lemma: "heute", translationEs: "hoy", pos: "Adv.", level: "A1", isVerb: false },
  morgens: { lemma: "morgens", translationEs: "por la mañana", pos: "Adv.", level: "A1", isVerb: false },
  abends: { lemma: "abends", translationEs: "por la noche / tarde", pos: "Adv.", level: "A1", isVerb: false },
  jetzt: { lemma: "jetzt", translationEs: "ahora", pos: "Adv.", level: "A1", isVerb: false },
  zuerst: { lemma: "zuerst", translationEs: "primero / en primer lugar", pos: "Adv.", level: "A1", isVerb: false },
  danach: { lemma: "danach", translationEs: "después / luego", pos: "Adv.", level: "A1", isVerb: false },
  dann: { lemma: "dann", translationEs: "luego / entonces", pos: "Adv.", level: "A1", isVerb: false },
  schon: { lemma: "schon", translationEs: "ya", pos: "Adv.", level: "A1", isVerb: false },
  immer: { lemma: "immer", translationEs: "siempre", pos: "Adv.", level: "A1", isVerb: false },
  sofort: { lemma: "sofort", translationEs: "inmediatamente", pos: "Adv.", level: "A1", isVerb: false },
  bald: { lemma: "bald", translationEs: "pronto", pos: "Adv.", level: "A1", isVerb: false },
  sehr: { lemma: "sehr", translationEs: "muy", pos: "Adv.", level: "A1", isVerb: false },
  viel: { lemma: "viel", translationEs: "mucho", pos: "Adv./Pron.", level: "A1", isVerb: false },
  alle: { lemma: "alle", translationEs: "todos / todas", pos: "Pron.", level: "A1", isVerb: false },
  alles: { lemma: "alles", translationEs: "todo", pos: "Pron.", level: "A1", isVerb: false },
  schritt: { lemma: "der Schritt", translationEs: "el paso", pos: "Nomen", level: "A1", isVerb: false },
  schluss: { lemma: "der Schluss", translationEs: "el final", pos: "Nomen", level: "A1", isVerb: false },
  erstens: { lemma: "erstens", translationEs: "en primer lugar", pos: "Adv.", level: "A2", isVerb: false },
  zweitens: { lemma: "zweitens", translationEs: "en segundo lugar", pos: "Adv.", level: "A2", isVerb: false },
  drittens: { lemma: "drittens", translationEs: "en tercer lugar", pos: "Adv.", level: "A2", isVerb: false },
  dort: { lemma: "dort", translationEs: "allí", pos: "Adv.", level: "A1", isVerb: false },
  hier: { lemma: "hier", translationEs: "aquí", pos: "Adv.", level: "A1", isVerb: false },
  leider: { lemma: "leider", translationEs: "lamentablemente", pos: "Adv.", level: "A1", isVerb: false },
  nicht: { lemma: "nicht", translationEs: "no", pos: "Adv.", level: "A1", isVerb: false },
  mehr: { lemma: "mehr", translationEs: "más", pos: "Adv.", level: "A1", isVerb: false },
  noch: { lemma: "noch", translationEs: "todavía / aún / además", pos: "Adv.", level: "A1", isVerb: false },
  später: { lemma: "später", translationEs: "más tarde / luego", pos: "Adv.", level: "A1", isVerb: false },
  zusammen: { lemma: "zusammen", translationEs: "juntos", pos: "Adv.", level: "A1", isVerb: false },
  gemeinsam: { lemma: "gemeinsam", translationEs: "juntos / en común", pos: "Adv.", level: "A2", isVerb: false },
  endlich: { lemma: "endlich", translationEs: "por fin / finalmente", pos: "Adv.", level: "A1", isVerb: false },
  außerdem: { lemma: "außerdem", translationEs: "además", pos: "Adv.", level: "A1", isVerb: false },
  deshalb: { lemma: "deshalb", translationEs: "por eso", pos: "Konj./Adv.", level: "A2", isVerb: false },
  gleichzeitig: { lemma: "gleichzeitig", translationEs: "al mismo tiempo", pos: "Adv.", level: "A2", isVerb: false },
  dabei: { lemma: "dabei", translationEs: "en ello / presente", pos: "Adv.", level: "A2", isVerb: false },
  dafür: { lemma: "dafür", translationEs: "para ello", pos: "Adv.", level: "A2", isVerb: false },
  zwei: { lemma: "zwei", translationEs: "dos", pos: "Zahlwort", level: "A1", isVerb: false },
  drei: { lemma: "drei", translationEs: "tres", pos: "Zahlwort", level: "A1", isVerb: false },
  vier: { lemma: "vier", translationEs: "cuatro", pos: "Zahlwort", level: "A1", isVerb: false },
  fünf: { lemma: "fünf", translationEs: "cinco", pos: "Zahlwort", level: "A1", isVerb: false },
  sechs: { lemma: "sechs", translationEs: "seis", pos: "Zahlwort", level: "A1", isVerb: false },
  sieben: { lemma: "sieben", translationEs: "siete", pos: "Zahlwort", level: "A1", isVerb: false },
  acht: { lemma: "acht", translationEs: "ocho", pos: "Zahlwort", level: "A1", isVerb: false },
  neun: { lemma: "neun", translationEs: "nueve", pos: "Zahlwort", level: "A1", isVerb: false },
  zehn: { lemma: "zehn", translationEs: "diez", pos: "Zahlwort", level: "A1", isVerb: false },
  ist: { lemma: "sein", translationEs: "es / está", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "sein" },
  sind: { lemma: "sein", translationEs: "son / están", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "sein" },
  wird: { lemma: "werden", translationEs: "se vuelve / será (pasiva)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "werden" },
  habe: { lemma: "haben", translationEs: "tengo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "haben" },
  hat: { lemma: "haben", translationEs: "tiene", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "haben" },
  haben: { lemma: "haben", translationEs: "tener / tienen", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "haben" }
};

export const immersiveStoriesCatalog = [
  // =========================================================================
  // CATEGORÍA 1: ENPAL & ELEKTROTECHNIK (INNENBEREICH - OHNE DACHMONTAGE)
  // =========================================================================
  {
    id: "enpal_keller_01",
    titleDe: "Im Keller: Wechselrichter und Speicher anschließen",
    titleEs: "En el sótano: Conectar inversor y batería de almacenamiento",
    level: "A1",
    levelLabel: "A1/A2",
    category: "enpal",
    emoji: "⚡",
    readTime: "3 min",
    sentences: [
      {
        de: "Heute arbeite ich als Elektriker bei einem Kunden im Keller.",
        es: "Hoy trabajo como electricista en casa de un cliente en el sótano."
      },
      {
        de: "Im Technikraum hängt schon der neue Wechselrichter an der Wand.",
        es: "En el cuarto técnico ya está colgado el nuevo inversor en la pared."
      },
      {
        de: "Neben dem Wechselrichter steht der schwere Speicher für den Strom.",
        es: "Junto al inversor está la pesada batería de almacenamiento para la electricidad."
      },
      {
        de: "Zuerst verlege ich die Kabel sauber durch den Kabelkanal.",
        es: "Primero tiendo los cables ordenadamente por la canaleta."
      },
      {
        de: "Danach schließe ich die DC-Leitungen und die AC-Leitung Schritt für Schritt an.",
        es: "Después conecto las líneas de corriente continua (DC) y la línea alterna (AC) paso a paso."
      },
      {
        de: "Vor dem Einschalten prüfe ich alle Werte sorgfältig mit meinem Multimeter.",
        es: "Antes de encender compruebo todos los valores cuidadosamente con mi multímetro."
      },
      {
        de: "Zum Schluss leuchtet das grüne Licht und die Anlage arbeitet leise und sicher.",
        es: "Al final se enciende la luz verde y la instalación trabaja silenciosa y segura."
      }
    ],
    wordGlossary: {
      arbeite: { lemma: "arbeiten", translationEs: "trabajo (de trabajar)", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "arbeiten" },
      elektriker: { lemma: "der Elektriker", translationEs: "el electricista", pos: "Nomen", level: "A1", isVerb: false },
      kunden: { lemma: "der Kunde", translationEs: "el cliente (dat./acus.)", pos: "Nomen", level: "A1", isVerb: false },
      keller: { lemma: "der Keller", translationEs: "el sótano", pos: "Nomen", level: "A1", isVerb: false },
      technikraum: { lemma: "der Technikraum", translationEs: "el cuarto técnico", pos: "Nomen", level: "A2", isVerb: false },
      hängt: { lemma: "hängen", translationEs: "cuelga / está colgado", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "haengen" },
      neue: { lemma: "neu", translationEs: "nuevo / nueva", pos: "Adj.", level: "A1", isVerb: false },
      wechselrichter: { lemma: "der Wechselrichter", translationEs: "el inversor (DC a AC)", pos: "Nomen", level: "A2", isVerb: false },
      wand: { lemma: "die Wand", translationEs: "la pared", pos: "Nomen", level: "A1", isVerb: false },
      steht: { lemma: "stehen", translationEs: "está de pie / colocado", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "stehen" },
      schwere: { lemma: "schwer", translationEs: "pesado / pesada", pos: "Adj.", level: "A1", isVerb: false },
      speicher: { lemma: "der Speicher", translationEs: "la batería de almacenamiento", pos: "Nomen", level: "A2", isVerb: false },
      strom: { lemma: "der Strom", translationEs: "la corriente eléctrica / electricidad", pos: "Nomen", level: "A1", isVerb: false },
      verlege: { lemma: "verlegen", translationEs: "tiendo / instalo (cables)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "verlegen" },
      kabel: { lemma: "das Kabel", translationEs: "el cable", pos: "Nomen", level: "A1", isVerb: false },
      sauber: { lemma: "sauber", translationEs: "limpiamente / ordenadamente", pos: "Adv.", level: "A1", isVerb: false },
      kabelkanal: { lemma: "der Kabelkanal", translationEs: "la canaleta para cables", pos: "Nomen", level: "A2", isVerb: false },
      schließe: { lemma: "anschließen", translationEs: "conecto (verbo separable an)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "anschliessen" },
      "dc-leitungen": { lemma: "die DC-Leitung", translationEs: "las líneas de corriente continua", pos: "Nomen", level: "A2", isVerb: false },
      "ac-leitung": { lemma: "die AC-Leitung", translationEs: "la línea de corriente alterna", pos: "Nomen", level: "A2", isVerb: false },
      an: { lemma: "anschließen (an)", translationEs: "prefijo de anschließen / en", pos: "Präp./Präfix", level: "A1", isVerb: false },
      einschalten: { lemma: "das Einschalten", translationEs: "el encendido / conexión", pos: "Nomen", level: "A2", isVerb: false },
      prüfe: { lemma: "prüfen", translationEs: "compruebo / mido", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "pruefen" },
      werte: { lemma: "der Wert", translationEs: "los valores (medición)", pos: "Nomen", level: "A2", isVerb: false },
      sorgfältig: { lemma: "sorgfältig", translationEs: "cuidadosamente", pos: "Adv.", level: "A2", isVerb: false },
      multimeter: { lemma: "das Multimeter", translationEs: "el multímetro", pos: "Nomen", level: "A2", isVerb: false },
      leuchtet: { lemma: "leuchten", translationEs: "se ilumina / brilla", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "leuchten" },
      grüne: { lemma: "grün", translationEs: "verde", pos: "Adj.", level: "A1", isVerb: false },
      licht: { lemma: "das Licht", translationEs: "la luz / testigo LED", pos: "Nomen", level: "A1", isVerb: false },
      anlage: { lemma: "die Anlage", translationEs: "la instalación / equipo", pos: "Nomen", level: "A2", isVerb: false },
      arbeitet: { lemma: "arbeiten", translationEs: "trabaja / funciona", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "arbeiten" },
      leise: { lemma: "leise", translationEs: "silenciosamente / bajo", pos: "Adj.", level: "A1", isVerb: false },
      sicher: { lemma: "sicher", translationEs: "seguro / con seguridad", pos: "Adj.", level: "A1", isVerb: false }
    },
    verbConjugations: pickVerbs("arbeiten", "haengen", "stehen", "verlegen", "anschliessen", "pruefen", "leuchten"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Wo hängt der neue Wechselrichter?",
        options: [
          "Im Technikraum an der Wand.",
          "Draußen im Lieferwagen.",
          "Im Kinderzimmer über dem Bett."
        ],
        correctIndex: 0,
        explanationEs: "El texto dice claramente: 'Im Technikraum hängt schon der neue Wechselrichter an der Wand' (En el cuarto técnico ya cuelga en la pared)."
      },
      {
        type: "comprehension",
        prompt: "Womit prüft der Elektriker die Werte vor dem Einschalten?",
        options: [
          "Mit seinem Reisepass.",
          "Mit seinem Multimeter.",
          "Mit der Hausordnung."
        ],
        correctIndex: 1,
        explanationEs: "Para verificar tensión y valores antes de encender utiliza el multímetro: 'prüfe ich alle Werte sorgfältig mit meinem Multimeter'."
      },
      {
        type: "cloze",
        prompt: "Danach ___ ich die DC-Leitungen und die AC-Leitung Schritt für Schritt an.",
        options: ["schließe", "schließt", "schließen"],
        correctIndex: 0,
        explanationEs: "Con el pronombre 'ich' la conjugación en presente de 'anschließen' termina en '-e' ('schließe ... an') y el prefijo 'an' va al final de la oración."
      },
      {
        type: "cloze",
        prompt: "Neben ___ Wechselrichter steht der schwere Speicher für den Strom.",
        options: ["der", "den", "dem"],
        correctIndex: 2,
        explanationEs: "La preposición espacial 'neben' responde aquí a 'Wo?' (ubicación estática con 'stehen'), por lo que exige Dativ masculino: 'der Wechselrichter' → 'neben dem Wechselrichter'."
      }
    ],
    keyWords: [
      { de: "der Keller", es: "el sótano", pos: "Nomen", level: "A1", exampleDe: "Der Technikraum liegt im Keller.", exampleEs: "El cuarto técnico está en el sótano." },
      { de: "der Technikraum", es: "el cuarto técnico", pos: "Nomen", level: "A2", exampleDe: "Im Technikraum steht der Speicher.", exampleEs: "En el cuarto técnico está la batería." },
      { de: "der Wechselrichter", es: "el inversor", pos: "Nomen", level: "A2", exampleDe: "Der Wechselrichter wandelt DC in AC um.", exampleEs: "El inversor convierte DC en AC." },
      { de: "der Speicher", es: "la batería de almacenamiento", pos: "Nomen", level: "A2", exampleDe: "Der Speicher sammelt den Strom.", exampleEs: "La batería almacena la electricidad." },
      { de: "der Kabelkanal", es: "la canaleta para cables", pos: "Nomen", level: "A2", exampleDe: "Das Kabel liegt im Kabelkanal.", exampleEs: "El cable va dentro de la canaleta." },
      { de: "anschließen", es: "conectar / empalmar", pos: "Verb", level: "A2", exampleDe: "Ich schließe die Leitung an.", exampleEs: "Yo conecto la línea." },
      { de: "das Multimeter", es: "el multímetro", pos: "Nomen", level: "A2", exampleDe: "Ich messe die Spannung mit dem Multimeter.", exampleEs: "Mido la tensión con el multímetro." },
      { de: "sorgfältig prüfen", es: "comprobar cuidadosamente", pos: "Verb + Adv.", level: "A2", exampleDe: "Wir prüfen alle Kontakte sorgfältig.", exampleEs: "Comprobamos todos los contactos con cuidado." }
    ],
    grammarCards: [
      {
        title: "Trennbare Verben: anschließen (Verbos separables)",
        exampleDe: "Danach schließe ich die DC-Leitungen und die AC-Leitung an.",
        highlightedPart: "schließe ... an",
        exampleEs: "Después conecto las líneas DC y la línea AC.",
        descriptionEs: "En alemán, el prefijo 'an-' se separa del verbo 'schließen' en presente y viaja hasta el último lugar de la oración principal.",
        table: {
          headers: ["Pronombre", "Verbo conjugado", "Complemento", "Prefijo final"],
          rows: [
            ["ich", "schließe", "das Kabel", "an"],
            ["du", "schließt", "den Speicher", "an"],
            ["wir", "schließen", "die Anlage", "an"]
          ]
        },
        extraExamples: [
          { de: "Morgen schließe ich die Wallbox an.", es: "Mañana conecto la Wallbox." },
          { de: "Er schließt zuerst das Multimeter an.", es: "Él conecta primero el multímetro." }
        ]
      },
      {
        title: "Wechselpräpositionen mit Dativ: Wo?",
        exampleDe: "Im Technikraum hängt der Wechselrichter an der Wand.",
        highlightedPart: "Im Technikraum / an der Wand",
        exampleEs: "En el cuarto técnico el inversor cuelga en la pared.",
        descriptionEs: "Con verbos de posición estática como 'hängen' o 'stehen' (¿dónde está?), las preposiciones 'in', 'an' y 'neben' rigen Dativo (der/das -> dem, die -> der).",
        table: {
          headers: ["Artículo Base", "En Dativo (Wo?)", "Ejemplo Técnico"],
          rows: [
            ["der Keller", "im (in dem) Keller", "Wir arbeiten im Keller."],
            ["die Wand", "an der Wand", "Es hängt an der Wand."],
            ["der Wechselrichter", "neben dem Wechselrichter", "Der Speicher steht neben dem Wechselrichter."]
          ]
        },
        extraExamples: [
          { de: "Das Werkzeug liegt auf dem Tisch.", es: "La herramienta está sobre la mesa." }
        ]
      }
    ]
  },

  {
    id: "enpal_vde_02",
    titleDe: "Am Zählerschrank: Die 5 Sicherheitsregeln (VDE)",
    titleEs: "En el armario de contadores: Las 5 reglas de seguridad (VDE)",
    level: "A2",
    levelLabel: "A2",
    category: "enpal",
    emoji: "🧰",
    readTime: "4 min",
    sentences: [
      {
        de: "Bevor wir am Zählerschrank arbeiten, befolgen wir immer die fünf Sicherheitsregeln.",
        es: "Antes de trabajar en el armario de contadores, seguimos siempre las cinco reglas de seguridad."
      },
      {
        de: "Erstens schalten wir den Stromkreis am Hauptschalter komplett frei.",
        es: "En primer lugar desconectamos por completo el circuito eléctrico en el interruptor principal."
      },
      {
        de: "Zweitens sichern wir den Schalter gegen Wiedereinschalten mit einem Schloss.",
        es: "En segundo lugar aseguramos el interruptor contra una reconexión accidental con un candado."
      },
      {
        de: "Drittens stellen wir die Spannungsfreiheit mit einem zweipoligen Spannungsprüfer fest.",
        es: "En tercer lugar comprobamos la ausencia de tensión con un comprobador de tensión bipolar."
      },
      {
        de: "Danach prüfen wir die Sicherung und den FI-Schutzschalter im Verteilerfeld.",
        es: "Después revisamos el fusible y el interruptor diferencial (FI) en el cuadro de distribución."
      },
      {
        de: "Sicherheit steht im Technikraum immer an erster Stelle für das ganze Team.",
        es: "La seguridad ocupa siempre el primer lugar en el cuarto técnico para todo el equipo."
      },
      {
        de: "Erst nach dem letzten Check beginnen wir mit der Montage im Schrank.",
        es: "Solo después de la última comprobación empezamos con el montaje dentro del armario."
      }
    ],
    wordGlossary: {
      zählerschrank: { lemma: "der Zählerschrank", translationEs: "el armario de contadores", pos: "Nomen", level: "A2", isVerb: false },
      arbeiten: { lemma: "arbeiten", translationEs: "trabajar", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "arbeiten" },
      befolgen: { lemma: "befolgen", translationEs: "cumplimos / seguimos", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "befolgen" },
      sicherheitsregeln: { lemma: "die Sicherheitsregel", translationEs: "las reglas de seguridad", pos: "Nomen", level: "A2", isVerb: false },
      schalten: { lemma: "freischalten", translationEs: "desconectamos (con 'frei')", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "freischalten" },
      stromkreis: { lemma: "der Stromkreis", translationEs: "el circuito eléctrico", pos: "Nomen", level: "A2", isVerb: false },
      hauptschalter: { lemma: "der Hauptschalter", translationEs: "el interruptor principal", pos: "Nomen", level: "A2", isVerb: false },
      komplett: { lemma: "komplett", translationEs: "completamente", pos: "Adv.", level: "A2", isVerb: false },
      frei: { lemma: "freischalten (frei)", translationEs: "libre de tensión (prefijo)", pos: "Präfix/Adj.", level: "A2", isVerb: false },
      sichern: { lemma: "sichern", translationEs: "aseguramos / bloqueamos", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "sichern" },
      schalter: { lemma: "der Schalter", translationEs: "el interruptor", pos: "Nomen", level: "A2", isVerb: false },
      wiedereinschalten: { lemma: "das Wiedereinschalten", translationEs: "la reconexión accidental", pos: "Nomen", level: "B1", isVerb: false },
      schloss: { lemma: "das Schloss", translationEs: "el candado / cerradura", pos: "Nomen", level: "A2", isVerb: false },
      stellen: { lemma: "feststellen", translationEs: "constatamos (con 'fest')", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "feststellen" },
      spannungsfreiheit: { lemma: "die Spannungsfreiheit", translationEs: "la ausencia de tensión", pos: "Nomen", level: "B1", isVerb: false },
      zweipoligen: { lemma: "zweipolig", translationEs: "bipolar (de dos polos)", pos: "Adj.", level: "B1", isVerb: false },
      spannungsprüfer: { lemma: "der Spannungsprüfer", translationEs: "el comprobador de tensión", pos: "Nomen", level: "A2", isVerb: false },
      fest: { lemma: "feststellen (fest)", translationEs: "prefijo de feststellen", pos: "Präfix", level: "A2", isVerb: false },
      prüfen: { lemma: "prüfen", translationEs: "revisamos / probamos", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "pruefen" },
      sicherung: { lemma: "die Sicherung", translationEs: "el fusible / magnetotérmico", pos: "Nomen", level: "A2", isVerb: false },
      "fi-schutzschalter": { lemma: "der FI-Schutzschalter", translationEs: "el interruptor diferencial (FI)", pos: "Nomen", level: "B1", isVerb: false },
      verteilerfeld: { lemma: "das Verteilerfeld", translationEs: "el campo de distribución", pos: "Nomen", level: "B1", isVerb: false },
      sicherheit: { lemma: "die Sicherheit", translationEs: "la seguridad", pos: "Nomen", level: "A2", isVerb: false },
      stelle: { lemma: "die Stelle", translationEs: "el lugar / puesto", pos: "Nomen", level: "A2", isVerb: false },
      team: { lemma: "das Team", translationEs: "el equipo", pos: "Nomen", level: "A1", isVerb: false },
      letzten: { lemma: "letzt-", translationEs: "último / última", pos: "Adj.", level: "A1", isVerb: false },
      check: { lemma: "der Check", translationEs: "la revisión / chequeo", pos: "Nomen", level: "A2", isVerb: false },
      beginnen: { lemma: "beginnen", translationEs: "empezamos", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "beginnen" },
      montage: { lemma: "die Montage", translationEs: "el montaje (en armario)", pos: "Nomen", level: "A2", isVerb: false },
      schrank: { lemma: "der Schrank", translationEs: "el armario (eléctrico)", pos: "Nomen", level: "A1", isVerb: false }
    },
    verbConjugations: pickVerbs("arbeiten", "befolgen", "freischalten", "sichern", "feststellen", "pruefen", "beginnen", "stehen"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Wie sichert man den Schalter gegen Wiedereinschalten?",
        options: [
          "Mit einem Schloss.",
          "Mit einem Kaffee.",
          "Mit einem Blumenstrauß."
        ],
        correctIndex: 0,
        explanationEs: "La segunda regla de seguridad dice: 'Zweitens sichern wir den Schalter gegen Wiedereinschalten mit einem Schloss' (con un candado)."
      },
      {
        type: "comprehension",
        prompt: "Was steht im Technikraum für das Team immer an erster Stelle?",
        options: [
          "Das Mittagessen.",
          "Die Sicherheit.",
          "Die Schnelligkeit."
        ],
        correctIndex: 1,
        explanationEs: "El texto enfatiza: 'Sicherheit steht im Technikraum immer an erster Stelle für das ganze Team'."
      },
      {
        type: "cloze",
        prompt: "Erstens schalten wir ___ Stromkreis am Hauptschalter komplett frei.",
        options: ["der", "den", "dem"],
        correctIndex: 1,
        explanationEs: "El verbo 'freischalten' rige complemento directo en Acusativo: 'der Stromkreis' cambia a 'den Stromkreis'."
      },
      {
        type: "cloze",
        prompt: "Drittens ___ wir die Spannungsfreiheit mit einem zweipoligen Spannungsprüfer fest.",
        options: ["stellen", "stellt", "stelle"],
        correctIndex: 0,
        explanationEs: "Con el pronombre 'wir' el verbo 'feststellen' lleva terminación '-en' ('stellen ... fest')."
      }
    ],
    keyWords: [
      { de: "der Zählerschrank", es: "el armario de contadores", pos: "Nomen", level: "A2", exampleDe: "Der neue Zähler sitzt im Zählerschrank.", exampleEs: "El nuevo contador está en el armario de contadores." },
      { de: "freischalten", es: "desconectar / aislar eléctricamente", pos: "Verb", level: "A2", exampleDe: "Bitte schalten Sie den Stromkreis frei.", exampleEs: "Por favor desconecte el circuito." },
      { de: "gegen Wiedereinschalten sichern", es: "asegurar contra reconexión", pos: "Ausdruck", level: "B1", exampleDe: "Ein Schloss sichert gegen Wiedereinschalten.", exampleEs: "Un candado protege contra la reconexión." },
      { de: "die Spannungsfreiheit feststellen", es: "comprobar ausencia de tensión", pos: "Ausdruck", level: "B1", exampleDe: "Erst Spannungsfreiheit feststellen, dann arbeiten.", exampleEs: "Primero comprobar ausencia de tensión, luego trabajar." },
      { de: "der Spannungsprüfer", es: "el comprobador de tensión", pos: "Nomen", level: "A2", exampleDe: "Mein zweipoliger Spannungsprüfer ist geeicht.", exampleEs: "Mi comprobador de tensión bipolar está calibrado." },
      { de: "die Sicherung", es: "el fusible / automático", pos: "Nomen", level: "A2", exampleDe: "Die Sicherung ist ausgeschaltet.", exampleEs: "El automático está desconectado." },
      { de: "der FI-Schutzschalter", es: "el interruptor diferencial", pos: "Nomen", level: "B1", exampleDe: "Der FI-Schutzschalter schützt Personen.", exampleEs: "El interruptor diferencial protege a las personas." },
      { de: "die Montage im Schrank", es: "el montaje dentro del armario", pos: "Nomen", level: "A2", exampleDe: "Die Montage im Schrank dauert zwei Stunden.", exampleEs: "El montaje en el armario dura dos horas." }
    ],
    grammarCards: [
      {
        title: "Nebensatz mit 'bevor' (Subordinada temporal)",
        exampleDe: "Bevor wir am Zählerschrank arbeiten, befolgen wir immer die fünf Sicherheitsregeln.",
        highlightedPart: "arbeiten, befolgen",
        exampleEs: "Antes de trabajar en el armario de contadores, seguimos siempre las cinco reglas de seguridad.",
        descriptionEs: "La conjunción 'bevor' envía el verbo conjugado ('arbeiten') al final de la oración subordinada. Después de la coma, la oración principal empieza inmediatamente con el verbo conjugado ('befolgen').",
        table: {
          headers: ["Nexo", "Sujeto + Complemento", "Verbo al final", "Verbo principal (V2)"],
          rows: [
            ["Bevor", "wir am Schrank", "arbeiten,", "befolgen wir die Regeln."],
            ["Bevor", "du die Kabel", "anfasst,", "prüfst du die Spannung."]
          ]
        },
        extraExamples: [
          { de: "Bevor ich messe, prüfe ich das Gerät.", es: "Antes de medir, compruebo el aparato." }
        ]
      },
      {
        title: "Inversion (Position 1 + Verb) con adverbios de orden",
        exampleDe: "Erstens schalten wir den Stromkreis am Hauptschalter frei.",
        highlightedPart: "Erstens schalten wir",
        exampleEs: "En primer lugar desconectamos el circuito en el interruptor principal.",
        descriptionEs: "Al iniciar con 'Erstens', 'Zweitens', 'Drittens' o 'Danach', el verbo conjugado permanece siempre en posición 2 y el sujeto ('wir') pasa detrás del verbo.",
        table: {
          headers: ["Posición 1", "Posición 2 (Verbo)", "Sujeto", "Resto de frase"],
          rows: [
            ["Erstens", "schalten", "wir", "den Stromkreis frei."],
            ["Zweitens", "sichern", "wir", "den Schalter."],
            ["Drittens", "stellen", "wir", "Spannungsfreiheit fest."]
          ]
        },
        extraExamples: [
          { de: "Danach prüfen wir jede einzelne Sicherung.", es: "Después revisamos cada fusible." }
        ]
      }
    ]
  },

  {
    id: "enpal_smart_03",
    titleDe: "Wallbox, Smart Meter und die Enpal-App erklären",
    titleEs: "Explicar la Wallbox, el Smart Meter y la App de Enpal",
    level: "A2",
    levelLabel: "A2",
    category: "enpal",
    emoji: "🔋",
    readTime: "4 min",
    sentences: [
      {
        de: "Nach der Installation im Zählerschrank verbinde ich das neue Smart Meter mit dem Netzwerk.",
        es: "Después de la instalación en el armario de contadores, conecto el nuevo contador inteligente a la red."
      },
      {
        de: "In der Garage prüfe ich noch die Wallbox für das Elektroauto des Kunden.",
        es: "En el garaje compruebo además el cargador Wallbox para el coche eléctrico del cliente."
      },
      {
        de: "Eine stabile WLAN-Verbindung ist sehr wichtig für die Steuerung der Anlage.",
        es: "Una conexión Wi-Fi estable es muy importante para el control de la instalación."
      },
      {
        de: "Dann zeige ich dem Kunden die Enpal-App direkt auf seinem Smartphone.",
        es: "Luego muestro al cliente la aplicación Enpal directamente en su teléfono inteligente."
      },
      {
        de: "Er sieht sofort auf dem Bildschirm, wie viel Energie der Speicher heute sammelt.",
        es: "Él ve inmediatamente en la pantalla cuánta energía acumula hoy la batería."
      },
      {
        de: "Bei Fragen erkläre ich ruhig die Lademodi und gebe praktische Tipps für den Alltag.",
        es: "Ante cualquier duda explico con calma los modos de carga y doy consejos prácticos para el día a día."
      },
      {
        de: "Der Kunde bedankt sich freundlich und unterschreibt das digitale Abnahmeprotokoll.",
        es: "El cliente da las gracias amablemente y firma el acta digital de entrega."
      }
    ],
    wordGlossary: {
      installation: { lemma: "die Installation", translationEs: "la instalación", pos: "Nomen", level: "A2", isVerb: false },
      zählerschrank: { lemma: "der Zählerschrank", translationEs: "el armario de contadores", pos: "Nomen", level: "A2", isVerb: false },
      verbinde: { lemma: "verbinden", translationEs: "conecto / enlazo", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "verbinden" },
      smart: { lemma: "das Smart Meter", translationEs: "el contador inteligente", pos: "Nomen", level: "A2", isVerb: false },
      meter: { lemma: "das Smart Meter", translationEs: "contador inteligente", pos: "Nomen", level: "A2", isVerb: false },
      netzwerk: { lemma: "das Netzwerk", translationEs: "la red (de datos)", pos: "Nomen", level: "A2", isVerb: false },
      garage: { lemma: "die Garage", translationEs: "el garaje", pos: "Nomen", level: "A1", isVerb: false },
      prüfe: { lemma: "prüfen", translationEs: "compruebo / pruebo", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "pruefen" },
      wallbox: { lemma: "die Wallbox", translationEs: "el punto de carga (Wallbox)", pos: "Nomen", level: "A2", isVerb: false },
      elektroauto: { lemma: "das Elektroauto", translationEs: "el coche eléctrico", pos: "Nomen", level: "A2", isVerb: false },
      kunden: { lemma: "der Kunde", translationEs: "del cliente (genitivo)", pos: "Nomen", level: "A2", isVerb: false },
      stabile: { lemma: "stabil", translationEs: "estable", pos: "Adj.", level: "A2", isVerb: false },
      "wlan-verbindung": { lemma: "die WLAN-Verbindung", translationEs: "la conexión Wi-Fi", pos: "Nomen", level: "A2", isVerb: false },
      wichtig: { lemma: "wichtig", translationEs: "importante", pos: "Adj.", level: "A1", isVerb: false },
      steuerung: { lemma: "die Steuerung", translationEs: "el control / gestión", pos: "Nomen", level: "B1", isVerb: false },
      anlage: { lemma: "die Anlage", translationEs: "la instalación", pos: "Nomen", level: "A2", isVerb: false },
      zeige: { lemma: "zeigen", translationEs: "muestro / enseño", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "zeigen" },
      "enpal-app": { lemma: "die Enpal-App", translationEs: "la aplicación de Enpal", pos: "Nomen", level: "A1", isVerb: false },
      direkt: { lemma: "direkt", translationEs: "directamente", pos: "Adv.", level: "A1", isVerb: false },
      smartphone: { lemma: "das Smartphone", translationEs: "el teléfono inteligente", pos: "Nomen", level: "A1", isVerb: false },
      sieht: { lemma: "sehen", translationEs: "ve (él/ella)", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "sehen" },
      bildschirm: { lemma: "der Bildschirm", translationEs: "la pantalla", pos: "Nomen", level: "A1", isVerb: false },
      energie: { lemma: "die Energie", translationEs: "la energía", pos: "Nomen", level: "A2", isVerb: false },
      speicher: { lemma: "der Speicher", translationEs: "la batería", pos: "Nomen", level: "A2", isVerb: false },
      sammelt: { lemma: "sammeln", translationEs: "acumula / recoge", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "sammeln" },
      fragen: { lemma: "die Frage", translationEs: "las preguntas / dudas", pos: "Nomen", level: "A1", isVerb: false },
      erkläre: { lemma: "erklären", translationEs: "explico", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "erklaeren" },
      ruhig: { lemma: "ruhig", translationEs: "con calma / tranquilo", pos: "Adv.", level: "A1", isVerb: false },
      lademodi: { lemma: "der Lademodus", translationEs: "los modos de carga", pos: "Nomen", level: "B1", isVerb: false },
      gebe: { lemma: "geben", translationEs: "doy", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "geben" },
      praktische: { lemma: "praktisch", translationEs: "prácticos", pos: "Adj.", level: "A1", isVerb: false },
      tipps: { lemma: "der Tipp", translationEs: "los consejos", pos: "Nomen", level: "A1", isVerb: false },
      alltag: { lemma: "der Alltag", translationEs: "la vida diaria", pos: "Nomen", level: "A2", isVerb: false },
      kunde: { lemma: "der Kunde", translationEs: "el cliente", pos: "Nomen", level: "A1", isVerb: false },
      bedankt: { lemma: "sich bedanken", translationEs: "da las gracias", pos: "Verb", level: "A2", isVerb: false },
      freundlich: { lemma: "freundlich", translationEs: "amablemente", pos: "Adv.", level: "A1", isVerb: false },
      unterschreibt: { lemma: "unterschreiben", translationEs: "firma", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "unterschreiben" },
      digitale: { lemma: "digital", translationEs: "digital", pos: "Adj.", level: "A2", isVerb: false },
      abnahmeprotokoll: { lemma: "das Abnahmeprotokoll", translationEs: "el acta de entrega", pos: "Nomen", level: "B1", isVerb: false }
    },
    verbConjugations: pickVerbs("verbinden", "pruefen", "zeigen", "sehen", "sammeln", "erklaeren", "geben", "unterschreiben"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Was prüft der Elektriker in der Garage?",
        options: [
          "Die Wallbox für das Elektroauto.",
          "Die Hausordnung des Vermieters.",
          "Einen neuen Kühlschrank."
        ],
        correctIndex: 0,
        explanationEs: "El texto dice: 'In der Garage prüfe ich noch die Wallbox für das Elektroauto des Kunden'."
      },
      {
        type: "comprehension",
        prompt: "Was unterschreibt der Kunde am Ende?",
        options: [
          "Den Antrag auf Kindergeld.",
          "Das digitale Abnahmeprotokoll.",
          "Seinen alten Führerschein."
        ],
        correctIndex: 1,
        explanationEs: "La última oración indica que el cliente firma el acta digital de entrega ('das digitale Abnahmeprotokoll')."
      },
      {
        type: "cloze",
        prompt: "Er ___ sofort auf dem Bildschirm, wie viel Energie der Speicher sammelt.",
        options: ["seht", "sehen", "sieht"],
        correctIndex: 2,
        explanationEs: "El verbo fuerte 'sehen' cambia la vocal e → ie en 2.ª y 3.ª persona del singular: 'er sieht'."
      },
      {
        type: "cloze",
        prompt: "Dann zeige ich ___ Kunden die Enpal-App direkt auf seinem Smartphone.",
        options: ["dem", "der", "den"],
        correctIndex: 0,
        explanationEs: "'zeigen' lleva persona en Dativo (¿a quién muestro?): 'der Kunde' (declinación N) pasa en Dativo singular a 'dem Kunden'."
      }
    ],
    keyWords: [
      { de: "das Smart Meter", es: "el contador inteligente", pos: "Nomen", level: "A2", exampleDe: "Das Smart Meter misst den Stromverbrauch.", exampleEs: "El Smart Meter mide el consumo de electricidad." },
      { de: "die Wallbox", es: "el cargador de coche eléctrico", pos: "Nomen", level: "A2", exampleDe: "Die Wallbox hängt in der Garage.", exampleEs: "La Wallbox está colgada en el garaje." },
      { de: "die WLAN-Verbindung", es: "la conexión Wi-Fi", pos: "Nomen", level: "A2", exampleDe: "Die WLAN-Verbindung im Keller ist stabil.", exampleEs: "La conexión Wi-Fi en el sótano es estable." },
      { de: "verbinden mit", es: "conectar con", pos: "Verb", level: "A2", exampleDe: "Ich verbinde die Wallbox mit dem Netzwerk.", exampleEs: "Conecto la Wallbox a la red." },
      { de: "die Enpal-App", es: "la aplicación de Enpal", pos: "Nomen", level: "A1", exampleDe: "Die Enpal-App zeigt die Batterieladung.", exampleEs: "La Enpal-App muestra la carga de la batería." },
      { de: "erklären", es: "explicar", pos: "Verb", level: "A1", exampleDe: "Ich erkläre dem Kunden die Funktionen.", exampleEs: "Explico al cliente las funciones." },
      { de: "unterschreiben", es: "firmar", pos: "Verb", level: "A2", exampleDe: "Bitte unterschreiben Sie hier.", exampleEs: "Por favor firme aquí." },
      { de: "das Abnahmeprotokoll", es: "el acta de aceptación / entrega", pos: "Nomen", level: "B1", exampleDe: "Das Abnahmeprotokoll ist digital fertig.", exampleEs: "El acta de entrega ya está lista digitalmente." }
    ],
    grammarCards: [
      {
        title: "Verben mit Dativ und Akkusativ (zeigen, erklären, geben)",
        exampleDe: "Dann zeige ich dem Kunden die Enpal-App.",
        highlightedPart: "dem Kunden (Dat.) / die Enpal-App (Akk.)",
        exampleEs: "Luego muestro al cliente la App de Enpal.",
        descriptionEs: "Con verbos de transferencia o explicación, la persona que recibe la información va en Dativo y el objeto que se muestra va en Acusativo.",
        table: {
          headers: ["Verbo", "Persona (Dativ - Wem?)", "Objeto (Akkusativ - Was?)"],
          rows: [
            ["zeigen", "dem Kunden", "die neue Enpal-App"],
            ["erklären", "der Kundin", "die Lademodi"],
            ["geben", "ihm", "praktische Tipps"]
          ]
        },
        extraExamples: [
          { de: "Ich erkläre meinem Kollegen den Plan.", es: "Le explico el plano a mi compañero." }
        ]
      },
      {
        title: "Indirekte Frage mit 'wie viel' (Subordinada)",
        exampleDe: "Er sieht sofort, wie viel Energie der Speicher heute sammelt.",
        highlightedPart: "wie viel Energie ... sammelt",
        exampleEs: "Él ve en seguida cuánta energía acumula hoy la batería.",
        descriptionEs: "Cuando una pregunta se integra dentro de otra oración ('wie viel...'), actúa como subordinada y el verbo conjugado ('sammelt') se coloca al final.",
        table: {
          headers: ["Principal", "Partícula interrogativa", "Sujeto + Tiempo", "Verbo al final"],
          rows: [
            ["Er sieht,", "wie viel Energie", "der Speicher heute", "sammelt."],
            ["Ich prüfe,", "ob das WLAN", "im Keller", "funktioniert."]
          ]
        },
        extraExamples: [
          { de: "Sehen Sie hier, wie schnell das Auto lädt.", es: "Vea aquí qué rápido carga el coche." }
        ]
      }
    ]
  },

  {
    id: "enpal_lager_04",
    titleDe: "Morgens im Lager: Werkzeug und Lieferwagen prüfen",
    titleEs: "Por la mañana en el almacén: Revisar herramientas y furgoneta",
    level: "A1",
    levelLabel: "A1",
    category: "enpal",
    emoji: "🚐",
    readTime: "3 min",
    sentences: [
      {
        de: "Um sieben Uhr morgens komme ich pünktlich im Lager an und trinke einen Kaffee.",
        es: "A las siete de la mañana llego puntual al almacén y tomo un café."
      },
      {
        de: "Zuerst lese ich die Materialliste für unsere heutigen Baustellen im Wohngebiet.",
        es: "Primero leo la lista de materiales para nuestras obras de hoy en la zona residencial."
      },
      {
        de: "Ich ziehe meine Sicherheitsschuhe an und kontrolliere meinen schweren Werkzeugkoffer.",
        es: "Me pongo mis zapatos de seguridad y controlo mi pesada caja de herramientas."
      },
      {
        de: "Sind der Spannungsprüfer, der Drehmomentschlüssel und alle Kabel vollständig im Koffer?",
        es: "¿Están el comprobador de tensión, la llave dinamométrica y todos los cables completos en la caja?"
      },
      {
        de: "Danach laden mein Kollege und ich den Speicher sowie den Wechselrichter in den Lieferwagen.",
        es: "Después mi compañero y yo cargamos la batería y el inversor en la furgoneta de reparto."
      },
      {
        de: "Alles sitzt sicher und fest im Regal des Transporters.",
        es: "Todo queda sujeto de forma segura y firme en la estantería de la furgoneta."
      },
      {
        de: "Um halb acht starten wir den Motor und fahren gemeinsam zum ersten Termin.",
        es: "A las siete y media arrancamos el motor y conducimos juntos hacia la primera cita."
      }
    ],
    wordGlossary: {
      uhr: { lemma: "die Uhr", translationEs: "hora (en punto)", pos: "Nomen", level: "A1", isVerb: false },
      komme: { lemma: "ankommen", translationEs: "llego (con 'an')", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "ankommen" },
      pünktlich: { lemma: "pünktlich", translationEs: "puntual / puntualmente", pos: "Adj./Adv.", level: "A1", isVerb: false },
      lager: { lemma: "das Lager", translationEs: "el almacén / bodega", pos: "Nomen", level: "A1", isVerb: false },
      trinke: { lemma: "trinken", translationEs: "bebo / tomo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "trinken" },
      kaffee: { lemma: "der Kaffee", translationEs: "el café", pos: "Nomen", level: "A1", isVerb: false },
      lese: { lemma: "lesen", translationEs: "leo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "lesen" },
      materialliste: { lemma: "die Materialliste", translationEs: "la lista de materiales", pos: "Nomen", level: "A2", isVerb: false },
      heutigen: { lemma: "heutig", translationEs: "de hoy (plural)", pos: "Adj.", level: "A2", isVerb: false },
      baustellen: { lemma: "die Baustelle", translationEs: "las obras", pos: "Nomen", level: "A2", isVerb: false },
      wohngebiet: { lemma: "das Wohngebiet", translationEs: "la zona residencial", pos: "Nomen", level: "A2", isVerb: false },
      ziehe: { lemma: "anziehen", translationEs: "me pongo (con 'an')", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "anziehen" },
      sicherheitsschuhe: { lemma: "die Sicherheitsschuhe", translationEs: "los zapatos de seguridad", pos: "Nomen", level: "A2", isVerb: false },
      kontrolliere: { lemma: "kontrollieren", translationEs: "controlo / reviso", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "kontrollieren" },
      werkzeugkoffer: { lemma: "der Werkzeugkoffer", translationEs: "el maletín de herramientas", pos: "Nomen", level: "A2", isVerb: false },
      spannungsprüfer: { lemma: "der Spannungsprüfer", translationEs: "el comprobador de tensión", pos: "Nomen", level: "A2", isVerb: false },
      drehmomentschlüssel: { lemma: "der Drehmomentschlüssel", translationEs: "la llave dinamométrica", pos: "Nomen", level: "B1", isVerb: false },
      kabel: { lemma: "das Kabel", translationEs: "los cables", pos: "Nomen", level: "A1", isVerb: false },
      vollständig: { lemma: "vollständig", translationEs: "completo / completo en totalidad", pos: "Adj.", level: "A2", isVerb: false },
      koffer: { lemma: "der Koffer", translationEs: "la caja / maletín", pos: "Nomen", level: "A1", isVerb: false },
      laden: { lemma: "laden", translationEs: "cargamos", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "laden" },
      kollege: { lemma: "der Kollege", translationEs: "el compañero (colega)", pos: "Nomen", level: "A1", isVerb: false },
      speicher: { lemma: "der Speicher", translationEs: "la batería", pos: "Nomen", level: "A2", isVerb: false },
      wechselrichter: { lemma: "der Wechselrichter", translationEs: "el inversor", pos: "Nomen", level: "A2", isVerb: false },
      lieferwagen: { lemma: "der Lieferwagen", translationEs: "la furgoneta de reparto", pos: "Nomen", level: "A2", isVerb: false },
      sitzt: { lemma: "sitzen", translationEs: "encaja / está sujeto", pos: "Verb", level: "A1", isVerb: false },
      fest: { lemma: "fest", translationEs: "firme / bien sujeto", pos: "Adv.", level: "A1", isVerb: false },
      regal: { lemma: "das Regal", translationEs: "la estantería", pos: "Nomen", level: "A1", isVerb: false },
      transporters: { lemma: "der Transporter", translationEs: "de la furgoneta (gen.)", pos: "Nomen", level: "A2", isVerb: false },
      halb: { lemma: "halb acht", translationEs: "siete y media (mitad hacia las 8)", pos: "Adj.", level: "A1", isVerb: false },
      starten: { lemma: "starten", translationEs: "arrancamos", pos: "Verb", level: "A1", isVerb: false },
      motor: { lemma: "der Motor", translationEs: "el motor", pos: "Nomen", level: "A1", isVerb: false },
      fahren: { lemma: "fahren", translationEs: "conducimos / vamos", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "fahren" },
      ersten: { lemma: "erst-", translationEs: "primero / primera", pos: "Adj.", level: "A1", isVerb: false },
      termin: { lemma: "der Termin", translationEs: "la cita", pos: "Nomen", level: "A1", isVerb: false }
    },
    verbConjugations: pickVerbs("ankommen", "trinken", "lesen", "anziehen", "kontrollieren", "laden", "fahren"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Wann fährt das Team aus dem Lager los?",
        options: [
          "Um sieben Uhr.",
          "Um halb acht (07:30 Uhr).",
          "Um neun Uhr abends."
        ],
        correctIndex: 1,
        explanationEs: "El texto dice: 'Um halb acht starten wir den Motor und fahren gemeinsam zum ersten Termin'. En alemán, 'halb acht' significa 7:30."
      },
      {
        type: "comprehension",
        prompt: "Was laden die Kollegen in den Lieferwagen?",
        options: [
          "Den Speicher und den Wechselrichter.",
          "Einen Esstisch und vier Stühle.",
          "Blumen und Brezeln."
        ],
        correctIndex: 0,
        explanationEs: "Según la lectura, cargan la batería y el inversor ('den Speicher sowie den Wechselrichter') en la furgoneta."
      },
      {
        type: "cloze",
        prompt: "Ich ___ meine Sicherheitsschuhe an und kontrolliere meinen Werkzeugkoffer.",
        options: ["ziehe", "ziehst", "ziehen"],
        correctIndex: 0,
        explanationEs: "Con 'ich', el verbo separable 'anziehen' se conjuga 'ziehe ... an'."
      },
      {
        type: "cloze",
        prompt: "Danach laden wir den Speicher in ___ Lieferwagen.",
        options: ["der", "dem", "den"],
        correctIndex: 2,
        explanationEs: "'in + Lieferwagen' indica aquí dirección / movimiento (¿hacia dónde cargamos?: Wohin?), por lo que rige Acusativo masculino: 'in den Lieferwagen'."
      }
    ],
    keyWords: [
      { de: "das Lager", es: "el almacén", pos: "Nomen", level: "A1", exampleDe: "Das Material steht im Lager bereit.", exampleEs: "El material está listo en el almacén." },
      { de: "der Lieferwagen", es: "la furgoneta de reparto", pos: "Nomen", level: "A2", exampleDe: "Der Lieferwagen fährt zur Baustelle.", exampleEs: "La furgoneta va hacia la obra." },
      { de: "der Werkzeugkoffer", es: "la caja de herramientas", pos: "Nomen", level: "A2", exampleDe: "Mein Werkzeugkoffer ist komplett gepackt.", exampleEs: "Mi maletín de herramientas está completo." },
      { de: "der Drehmomentschlüssel", es: "la llave dinamométrica", pos: "Nomen", level: "B1", exampleDe: "Ich ziehe die Klemmen mit dem Drehmomentschlüssel fest.", exampleEs: "Aprieto los bornes con la llave dinamométrica." },
      { de: "die Sicherheitsschuhe", es: "zapatos de seguridad", pos: "Nomen", level: "A2", exampleDe: "Auf der Baustelle trägt man Sicherheitsschuhe.", exampleEs: "En la obra se llevan zapatos de seguridad." },
      { de: "die Materialliste", es: "la lista de materiales", pos: "Nomen", level: "A2", exampleDe: "Auf der Materialliste stehen alle Kabel.", exampleEs: "En la lista de materiales aparecen todos los cables." },
      { de: "pünktlich ankommen", es: "llegar puntual", pos: "Verb", level: "A1", exampleDe: "Ich komme pünktlich um sieben Uhr an.", exampleEs: "Llego puntual a las siete." },
      { de: "halb acht", es: "las siete y media (07:30)", pos: "Zeitangabe", level: "A1", exampleDe: "Wir starten um halb acht.", exampleEs: "Arrancamos a las siete y media." }
    ],
    grammarCards: [
      {
        title: "Uhrzeit im Deutschen: 'halb acht' = 07:30",
        exampleDe: "Um halb acht starten wir den Motor.",
        highlightedPart: "Um halb acht",
        exampleEs: "A las siete y media arrancamos el motor.",
        descriptionEs: "En alemán, 'halb' mira hacia la hora siguiente: 'halb acht' es literalmente 'media hora antes de las ocho' = 07:30. Con las horas exactas siempre usamos la preposición 'um'.",
        table: {
          headers: ["Expresión en alemán", "Hora digital", "Significado"],
          rows: [
            ["um sieben Uhr", "07:00", "a las siete en punto"],
            ["um halb acht", "07:30", "a las siete y media"],
            ["um acht Uhr", "08:00", "a las ocho en punto"]
          ]
        },
        extraExamples: [
          { de: "Unser Termin beim Kunden ist um halb neun.", es: "Nuestra cita con el cliente es a las ocho y media." }
        ]
      },
      {
        title: "Wohin? (in den Lieferwagen) vs. Wo? (im Lager)",
        exampleDe: "Im Lager laden wir den Speicher in den Lieferwagen.",
        highlightedPart: "Im Lager (Dat.) / in den Lieferwagen (Akk.)",
        exampleEs: "En el almacén cargamos la batería dentro de la furgoneta.",
        descriptionEs: "Fíjate en el contraste: 'im Lager' responde a ¿Dónde? (Dativo: in dem), mientras que 'in den Lieferwagen' responde a ¿Hacia dónde cargamos? (Acusativo: dirección/movimiento).",
        table: {
          headers: ["Pregunta", "Caso", "Ejemplo"],
          rows: [
            ["Wo? (Lugar fijo)", "Dativ", "Ich bin im (in dem) Lager."],
            ["Wohin? (Movimiento/Destino)", "Akkusativ", "Wir laden den Speicher in den Lieferwagen."]
          ]
        },
        extraExamples: [
          { de: "Das Werkzeug liegt im Koffer. Ich lege es in den Koffer.", es: "La herramienta está en la caja. La meto en la caja." }
        ]
      }
    ]
  },

  // =========================================================================
  // CATEGORÍA 2: BEHÖRDEN & ALLTAG IN DEUTSCHLAND
  // =========================================================================
  {
    id: "amt_anmeldung_05",
    titleDe: "Mein Termin im Bürgeramt: Die erste Anmeldung",
    titleEs: "Mi cita en el Bürgeramt: El primer empadronamiento",
    level: "A1",
    levelLabel: "A1",
    category: "behoerden",
    emoji: "🏛️",
    readTime: "3 min",
    sentences: [
      {
        de: "Heute habe ich um neun Uhr einen wichtigen Termin im Bürgeramt.",
        es: "Hoy tengo a las nueve una cita importante en la oficina de registro ciudadano."
      },
      {
        de: "Ich warte kurz im Flur, bis meine Nummer auf dem großen Monitor erscheint.",
        es: "Espero un momento en el pasillo hasta que mi número aparece en el monitor grande."
      },
      {
        de: "Die Mitarbeiterin begrüßt mich freundlich und bittet um meinen Reisepass.",
        es: "La empleada me saluda amablemente y pide mi pasaporte."
      },
      {
        de: "Außerdem lege ich den Mietvertrag und die Wohnungsgeberbestätigung auf den Tisch.",
        es: "Además pongo el contrato de alquiler y la confirmación del arrendador sobre la mesa."
      },
      {
        de: "Zusammen prüfen wir alle Daten, denn ich musste vorher ein langes Formular ausfüllen.",
        es: "Juntos revisamos todos los datos, porque antes tuve que rellenar un formulario largo."
      },
      {
        de: "Nach zehn Minuten druckt sie meine offizielle Meldebescheinigung mit Stempel aus.",
        es: "Después de diez minutos ella imprime mi certificado de empadronamiento oficial con sello."
      },
      {
        de: "Meine Steuer-ID bekomme ich bald automatisch per Post an meine neue Adresse.",
        es: "Mi número de identificación fiscal (Steuer-ID) lo recibiré pronto automáticamente por correo en mi nueva dirección."
      }
    ],
    wordGlossary: {
      wichtigen: { lemma: "wichtig", translationEs: "importante (acus. masc.)", pos: "Adj.", level: "A1", isVerb: false },
      termin: { lemma: "der Termin", translationEs: "la cita", pos: "Nomen", level: "A1", isVerb: false },
      bürgeramt: { lemma: "das Bürgeramt", translationEs: "la oficina ciudadana / empadronamiento", pos: "Nomen", level: "A1", isVerb: false },
      warte: { lemma: "warten", translationEs: "espero", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "warten" },
      kurz: { lemma: "kurz", translationEs: "un momento / brevemente", pos: "Adv.", level: "A1", isVerb: false },
      flur: { lemma: "der Flur", translationEs: "el pasillo", pos: "Nomen", level: "A1", isVerb: false },
      nummer: { lemma: "die Nummer", translationEs: "el número (turno)", pos: "Nomen", level: "A1", isVerb: false },
      großen: { lemma: "groß", translationEs: "grande", pos: "Adj.", level: "A1", isVerb: false },
      monitor: { lemma: "der Monitor", translationEs: "el monitor / pantalla", pos: "Nomen", level: "A1", isVerb: false },
      erscheint: { lemma: "erscheinen", translationEs: "aparece", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "erscheinen" },
      mitarbeiterin: { lemma: "die Mitarbeiterin", translationEs: "la empleada / funcionaria", pos: "Nomen", level: "A1", isVerb: false },
      begrüßt: { lemma: "begrüßen", translationEs: "saluda", pos: "Verb", level: "A1", isVerb: false },
      freundlich: { lemma: "freundlich", translationEs: "amablemente", pos: "Adv.", level: "A1", isVerb: false },
      bittet: { lemma: "bitten", translationEs: "pide / solicita", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "bitten" },
      reisepass: { lemma: "der Reisepass", translationEs: "el pasaporte", pos: "Nomen", level: "A1", isVerb: false },
      lege: { lemma: "legen", translationEs: "pongo / coloco", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "legen" },
      mietvertrag: { lemma: "der Mietvertrag", translationEs: "el contrato de alquiler", pos: "Nomen", level: "A2", isVerb: false },
      wohnungsgeberbestätigung: { lemma: "die Wohnungsgeberbestätigung", translationEs: "la confirmación del arrendador", pos: "Nomen", level: "A2", isVerb: false },
      tisch: { lemma: "der Tisch", translationEs: "la mesa", pos: "Nomen", level: "A1", isVerb: false },
      prüfen: { lemma: "prüfen", translationEs: "revisamos / comprobamos", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "pruefen" },
      daten: { lemma: "die Daten", translationEs: "los datos", pos: "Nomen", level: "A1", isVerb: false },
      musste: { lemma: "müssen", translationEs: "tuve que (Präteritum)", pos: "Modalverb", level: "A1", isVerb: false },
      vorher: { lemma: "vorher", translationEs: "antes / previamente", pos: "Adv.", level: "A1", isVerb: false },
      langes: { lemma: "lang", translationEs: "largo", pos: "Adj.", level: "A1", isVerb: false },
      formular: { lemma: "das Formular", translationEs: "el formulario", pos: "Nomen", level: "A1", isVerb: false },
      ausfüllen: { lemma: "ausfüllen", translationEs: "rellenar", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "ausfuellen" },
      minuten: { lemma: "die Minute", translationEs: "los minutos", pos: "Nomen", level: "A1", isVerb: false },
      druckt: { lemma: "ausdrucken", translationEs: "imprime (con 'aus')", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "ausdrucken" },
      offizielle: { lemma: "offiziell", translationEs: "oficial", pos: "Adj.", level: "A2", isVerb: false },
      meldebescheinigung: { lemma: "die Meldebescheinigung", translationEs: "el certificado de empadronamiento", pos: "Nomen", level: "A2", isVerb: false },
      stempel: { lemma: "der Stempel", translationEs: "el sello", pos: "Nomen", level: "A2", isVerb: false },
      aus: { lemma: "ausdrucken (aus)", translationEs: "prefijo de ausdrucken", pos: "Präfix", level: "A1", isVerb: false },
      "steuer-id": { lemma: "die Steuer-ID", translationEs: "el número fiscal (Steuer-ID)", pos: "Nomen", level: "A2", isVerb: false },
      bekomme: { lemma: "bekommen", translationEs: "recibo / obtengo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "bekommen" },
      automatisch: { lemma: "automatisch", translationEs: "automáticamente", pos: "Adv.", level: "A2", isVerb: false },
      per: { lemma: "per", translationEs: "por (medio de)", pos: "Präp.", level: "A1", isVerb: false },
      post: { lemma: "die Post", translationEs: "el correo postal", pos: "Nomen", level: "A1", isVerb: false },
      adresse: { lemma: "die Adresse", translationEs: "la dirección", pos: "Nomen", level: "A1", isVerb: false }
    },
    verbConjugations: pickVerbs("warten", "erscheinen", "bitten", "legen", "pruefen", "ausfuellen", "ausdrucken", "bekommen"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Welches Dokument bekommt man direkt nach zehn Minuten im Bürgeramt?",
        options: [
          "Die offizielle Meldebescheinigung.",
          "Den neuen Firmenwagen.",
          "Das Zeugnis der Schule."
        ],
        correctIndex: 0,
        explanationEs: "La empleada imprime en diez minutos la 'Meldebescheinigung mit Stempel'. La Steuer-ID llega después por correo."
      },
      {
        type: "comprehension",
        prompt: "Wie kommt die Steuer-ID zum Kunden?",
        options: [
          "Im Technikraum.",
          "Per Post an die neue Adresse.",
          "Per Anruf vom Hausarzt."
        ],
        correctIndex: 1,
        explanationEs: "El texto explica: 'Meine Steuer-ID bekomme ich bald automatisch per Post an meine neue Adresse'."
      },
      {
        type: "cloze",
        prompt: "Die Mitarbeiterin begrüßt mich freundlich und bittet ___ meinen Reisepass.",
        options: ["für", "mit", "um"],
        correctIndex: 2,
        explanationEs: "El verbo 'bitten' va siempre con la preposición fija 'um + Akkusativ': 'Sie bittet um meinen Reisepass'."
      },
      {
        type: "cloze",
        prompt: "Außerdem lege ich den Mietvertrag ___ den Tisch.",
        options: ["auf", "aus", "bei"],
        correctIndex: 0,
        explanationEs: "Poner un documento encima de una mesa (horizontal) lleva 'legen auf + Akkusativ': 'auf den Tisch'."
      }
    ],
    keyWords: [
      { de: "das Bürgeramt", es: "oficina de registro ciudadano", pos: "Nomen", level: "A1", exampleDe: "Ich habe einen Termin im Bürgeramt.", exampleEs: "Tengo cita en el Bürgeramt." },
      { de: "die Meldebescheinigung", es: "certificado de empadronamiento", pos: "Nomen", level: "A2", exampleDe: "Ohne Meldebescheinigung bekomme ich kein Konto.", exampleEs: "Sin empadronamiento no abro cuenta." },
      { de: "der Reisepass", es: "el pasaporte", pos: "Nomen", level: "A1", exampleDe: "Bitte zeigen Sie Ihren Reisepass.", exampleEs: "Por favor muestre su pasaporte." },
      { de: "das Formular ausfüllen", es: "rellenar el formulario", pos: "Verb + Nomen", level: "A1", exampleDe: "Wir müssen das Formular sauber ausfüllen.", exampleEs: "Tenemos que rellenar el formulario limpio." },
      { de: "die Steuer-ID", es: "el número de identificación fiscal", pos: "Nomen", level: "A2", exampleDe: "Der Arbeitgeber braucht meine Steuer-ID.", exampleEs: "El empleador necesita mi Steuer-ID." },
      { de: "die Wohnungsgeberbestätigung", es: "confirmación de vivienda del casero", pos: "Nomen", level: "A2", exampleDe: "Der Vermieter unterschreibt die Wohnungsgeberbestätigung.", exampleEs: "El casero firma la confirmación de domicilio." },
      { de: "ausdrucken", es: "imprimir", pos: "Verb", level: "A1", exampleDe: "Die Beamtin druckt das Dokument aus.", exampleEs: "La funcionaria imprime el documento." },
      { de: "per Post bekommen", es: "recibir por correo postal", pos: "Ausdruck", level: "A1", exampleDe: "Der Brief kommt per Post.", exampleEs: "La carta llega por correo postal." }
    ],
    grammarCards: [
      {
        title: "Hauptsatz mit 'denn' (Oración coordinada causal)",
        exampleDe: "Zusammen prüfen wir alle Daten, denn ich musste vorher ein Formular ausfüllen.",
        highlightedPart: "denn ich musste ... ausfüllen",
        exampleEs: "Juntos revisamos todos los datos, porque antes tuve que rellenar un formulario.",
        descriptionEs: "A diferencia de 'weil', el conector 'denn' ocupa la posición 0 y NO cambia el orden de las palabras: sujeto (ich) + verbo conjugado (musste) + infinitivo al final.",
        table: {
          headers: ["Posición 0", "Sujeto (Pos 1)", "Verbo (Pos 2)", "Resto / Infinitivo"],
          rows: [
            ["denn", "ich", "musste", "das Formular ausfüllen."],
            ["denn", "der Termin", "ist", "sehr wichtig."]
          ]
        },
        extraExamples: [
          { de: "Ich nehme den Pass mit, denn ich habe einen Termin.", es: "Llevo el pasaporte porque tengo cita." }
        ]
      },
      {
        title: "Verbo con preposición fija: 'bitten um + Akkusativ'",
        exampleDe: "Die Mitarbeiterin bittet um meinen Reisepass.",
        highlightedPart: "bittet um meinen Reisepass",
        exampleEs: "La empleada pide mi pasaporte.",
        descriptionEs: "En alemán 'pedir algo' es 'bitten um + Akkusativ' (el masculino cambia de mein a meinen).",
        table: {
          headers: ["Sujeto", "Verbo", "Preposición", "Objeto en Acusativo"],
          rows: [
            ["Die Beamtin", "bittet", "um", "meinen Reisepass."],
            ["Ich", "bitte", "um", "eine Meldebescheinigung."]
          ]
        },
        extraExamples: [
          { de: "Ich bitte um einen neuen Termin.", es: "Pido una nueva cita." }
        ]
      }
    ]
  },

  {
    id: "amt_auslaender_06",
    titleDe: "Bei der Ausländerbehörde: Aufenthaltstitel und Vertrag",
    titleEs: "En la Ausländerbehörde: Permiso de residencia y contrato",
    level: "A2",
    levelLabel: "A2",
    category: "behoerden",
    emoji: "🪪",
    readTime: "4 min",
    sentences: [
      {
        de: "Drei Monate vor Ablauf meines Visums gehe ich pünktlich zur Ausländerbehörde.",
        es: "Tres meses antes del vencimiento de mi visado voy puntual a la oficina de extranjería."
      },
      {
        de: "Diese Behörde ist für die Verlängerung meines Aufenthaltes in der Stadt zuständig.",
        es: "Esta autoridad es competente para la prórroga de mi estancia en la ciudad."
      },
      {
        de: "In meiner Mappe habe ich meinen aktuellen Arbeitsvertrag als Elektriker und drei Lohnabrechnungen.",
        es: "En mi carpeta llevo mi contrato de trabajo actual como electricista y tres nóminas."
      },
      {
        de: "Der Sachbearbeiter kontrolliert jede Frist genau und scannt alle Unterlagen ein.",
        es: "El funcionario controla exactamente cada plazo y escanea toda la documentación."
      },
      {
        de: "Ich gebe dort meine Fingerabdrücke ab und bezahle die Gebühr am Automaten.",
        es: "Entrego allí mis huellas dactilares y pago la tasa en la máquina automática."
      },
      {
        de: "Bald darf ich meinen neuen elektronischen Aufenthaltstitel persönlich im Büro abholen.",
        es: "Pronto podré recoger en persona mi nuevo permiso de residencia electrónico en la oficina."
      },
      {
        de: "Mit der neuen Karte arbeite ich völlig entspannt und ohne Sorgen weiter.",
        es: "Con la nueva tarjeta sigo trabajando totalmente tranquilo y sin preocupaciones."
      }
    ],
    wordGlossary: {
      monate: { lemma: "der Monat", translationEs: "los meses", pos: "Nomen", level: "A1", isVerb: false },
      ablauf: { lemma: "der Ablauf", translationEs: "el vencimiento / expiración", pos: "Nomen", level: "B1", isVerb: false },
      visums: { lemma: "das Visum", translationEs: "del visado (genitivo)", pos: "Nomen", level: "A2", isVerb: false },
      gehe: { lemma: "gehen", translationEs: "voy", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "gehen" },
      ausländerbehörde: { lemma: "die Ausländerbehörde", translationEs: "la oficina de extranjería", pos: "Nomen", level: "A2", isVerb: false },
      behörde: { lemma: "die Behörde", translationEs: "la autoridad / organismo público", pos: "Nomen", level: "A2", isVerb: false },
      verlängerung: { lemma: "die Verlängerung", translationEs: "la prórroga / renovación", pos: "Nomen", level: "A2", isVerb: false },
      aufenthaltes: { lemma: "der Aufenthalt", translationEs: "de la estancia (genitivo)", pos: "Nomen", level: "A2", isVerb: false },
      stadt: { lemma: "die Stadt", translationEs: "la ciudad", pos: "Nomen", level: "A1", isVerb: false },
      zuständig: { lemma: "zuständig", translationEs: "competente / encargado", pos: "Adj.", level: "A2", isVerb: false },
      mappe: { lemma: "die Mappe", translationEs: "la carpeta / portafolios", pos: "Nomen", level: "A2", isVerb: false },
      aktuellen: { lemma: "aktuell", translationEs: "actual", pos: "Adj.", level: "A2", isVerb: false },
      arbeitsvertrag: { lemma: "der Arbeitsvertrag", translationEs: "el contrato de trabajo", pos: "Nomen", level: "A2", isVerb: false },
      lohnabrechnungen: { lemma: "die Lohnabrechnung", translationEs: "las nóminas de sueldo", pos: "Nomen", level: "B1", isVerb: false },
      sachbearbeiter: { lemma: "der Sachbearbeiter", translationEs: "el funcionario / gestor del caso", pos: "Nomen", level: "B1", isVerb: false },
      kontrolliert: { lemma: "kontrollieren", translationEs: "controla / revisa", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "kontrollieren" },
      frist: { lemma: "die Frist", translationEs: "el plazo / fecha límite", pos: "Nomen", level: "A2", isVerb: false },
      genau: { lemma: "genau", translationEs: "exactamente", pos: "Adv.", level: "A1", isVerb: false },
      scannt: { lemma: "einscannen", translationEs: "escanea (con 'ein')", pos: "Verb", level: "A2", isVerb: false },
      unterlagen: { lemma: "die Unterlagen", translationEs: "la documentación / documentos", pos: "Nomen", level: "A2", isVerb: false },
      gebe: { lemma: "abgeben", translationEs: "entrego (con 'ab')", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "abgeben" },
      fingerabdrücke: { lemma: "der Fingerabdruck", translationEs: "las huellas dactilares", pos: "Nomen", level: "A2", isVerb: false },
      bezahle: { lemma: "bezahlen", translationEs: "pago", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "bezahlen" },
      gebühr: { lemma: "die Gebühr", translationEs: "la tasa administrativa", pos: "Nomen", level: "A2", isVerb: false },
      automaten: { lemma: "der Automat", translationEs: "la máquina automática", pos: "Nomen", level: "A1", isVerb: false },
      darf: { lemma: "dürfen", translationEs: "puedo (tengo permiso)", pos: "Modalverb", level: "A1", isVerb: false },
      elektronischen: { lemma: "elektronisch", translationEs: "electrónico", pos: "Adj.", level: "A2", isVerb: false },
      aufenthaltstitel: { lemma: "der Aufenthaltstitel", translationEs: "el permiso / título de residencia", pos: "Nomen", level: "A2", isVerb: false },
      persönlich: { lemma: "persönlich", translationEs: "en persona", pos: "Adv.", level: "A2", isVerb: false },
      büro: { lemma: "das Büro", translationEs: "la oficina", pos: "Nomen", level: "A1", isVerb: false },
      abholen: { lemma: "abholen", translationEs: "recoger", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "abholen" },
      karte: { lemma: "die Karte", translationEs: "la tarjeta", pos: "Nomen", level: "A1", isVerb: false },
      entspannt: { lemma: "entspannt", translationEs: "relajado / tranquilo", pos: "Adj.", level: "A2", isVerb: false },
      sorgen: { lemma: "die Sorge", translationEs: "las preocupaciones", pos: "Nomen", level: "A2", isVerb: false }
    },
    verbConjugations: pickVerbs("gehen", "kontrollieren", "abgeben", "bezahlen", "abholen", "arbeiten"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Welche Papiere bringt der Elektriker in seiner Mappe mit?",
        options: [
          "Den Arbeitsvertrag und drei Lohnabrechnungen.",
          "Die Schulbücher und den Stundenplan.",
          "Einen Werkzeugkoffer mit Schrauben."
        ],
        correctIndex: 0,
        explanationEs: "El texto especifica: 'In meiner Mappe habe ich meinen aktuellen Arbeitsvertrag als Elektriker und drei Lohnabrechnungen'."
      },
      {
        type: "comprehension",
        prompt: "Wo bezahlt er die Gebühr für die neue Karte?",
        options: [
          "Auf dem Bahnsteig.",
          "Am Automaten.",
          "Im Keller beim Kunden."
        ],
        correctIndex: 1,
        explanationEs: "La frase dice: 'und bezahle die Gebühr am Automaten' (en el cajero/máquina automática de la oficina)."
      },
      {
        type: "cloze",
        prompt: "Diese Behörde ist ___ die Verlängerung meines Aufenthaltes zuständig.",
        options: ["mit", "nach", "für"],
        correctIndex: 2,
        explanationEs: "El adjetivo 'zuständig' (competente / responsable) se construye siempre con la preposición 'für + Akkusativ': 'zuständig für...'."
      },
      {
        type: "cloze",
        prompt: "Bald darf ich meinen neuen elektronischen Aufenthaltstitel im Büro ___.",
        options: ["abholen", "abgeholt", "hole ab"],
        correctIndex: 0,
        explanationEs: "Con el verbo modal 'darf' en posición 2, el verbo principal va al final de la frase en infinitivo sin separar: 'abholen'."
      }
    ],
    keyWords: [
      { de: "der Aufenthaltstitel", es: "permiso / tarjeta de residencia", pos: "Nomen", level: "A2", exampleDe: "Mein Aufenthaltstitel gilt für vier Jahre.", exampleEs: "Mi permiso de residencia vale por cuatro años." },
      { de: "die Behörde", es: "autoridad / organismo público", pos: "Nomen", level: "A2", exampleDe: "Die Behörde prüft den Antrag schnell.", exampleEs: "La autoridad revisa rápido la solicitud." },
      { de: "die Frist", es: "el plazo límite", pos: "Nomen", level: "A2", exampleDe: "Wir müssen jede Frist einhalten.", exampleEs: "Debemos cumplir cada plazo." },
      { de: "zuständig für (+ Akk.)", es: "competente / encargado de", pos: "Adj.", level: "A2", exampleDe: "Welche Abteilung ist hierfür zuständig?", exampleEs: "¿Qué departamento es competente para esto?" },
      { de: "der Arbeitsvertrag", es: "el contrato de trabajo", pos: "Nomen", level: "A2", exampleDe: "Mein Arbeitsvertrag ist unbefristet.", exampleEs: "Mi contrato de trabajo es indefinido." },
      { de: "die Unterlagen", es: "los documentos / expediente", pos: "Nomen", level: "A2", exampleDe: "Alle Unterlagen liegen komplett vor.", exampleEs: "Toda la documentación está completa." },
      { de: "die Gebühr bezahlen", es: "pagar la tasa", pos: "Verb + Nomen", level: "A2", exampleDe: "Man bezahlt die Gebühr mit EC-Karte.", exampleEs: "Se paga la tasa con tarjeta." },
      { de: "persönlich abholen", es: "recoger en persona", pos: "Verb + Adv.", level: "A2", exampleDe: "Ich hole den Pass persönlich ab.", exampleEs: "Recojo el pasaporte en persona." }
    ],
    grammarCards: [
      {
        title: "Adjektiv mit Präposition: 'zuständig für + Akkusativ'",
        exampleDe: "Diese Behörde ist für die Verlängerung meines Aufenthaltes zuständig.",
        highlightedPart: "für die Verlängerung ... zuständig",
        exampleEs: "Esta autoridad es competente para la prórroga de mi estancia.",
        descriptionEs: "'zuständig sein für' expresa competencia administrativa y siempre exige caso Acusativo después de 'für'.",
        table: {
          headers: ["Behörde", "Preposición", "Objeto (Akkusativ)", "Adjektiv"],
          rows: [
            ["Die Ausländerbehörde", "für", "den Aufenthaltstitel", "zuständig"],
            ["Das Bürgeramt", "für", "die Anmeldung", "zuständig"],
            ["Die Familienkasse", "für", "das Kindergeld", "zuständig"]
          ]
        },
        extraExamples: [
          { de: "Welcher Sachbearbeiter ist für meinen Antrag zuständig?", es: "¿Qué funcionario es competente para mi solicitud?" }
        ]
      },
      {
        title: "Modalverb + Trennbares Verb am Satzende",
        exampleDe: "Bald darf ich meinen neuen Aufenthaltstitel persönlich abholen.",
        highlightedPart: "darf ... abholen",
        exampleEs: "Pronto podré recoger mi nuevo permiso de residencia en persona.",
        descriptionEs: "Cuando hay un verbo modal ('darf', 'kann', 'muss'), el verbo separable ('abholen') NO se separa: va completo al final en forma de infinitivo.",
        table: {
          headers: ["Posición 1", "Modalverb", "Objeto", "Infinitiv am Ende"],
          rows: [
            ["Ich", "darf", "die Karte", "abholen."],
            ["Wir", "müssen", "das Formular", "ausfüllen."],
            ["Er", "kann", "alle Daten", "einscannen."]
          ]
        },
        extraExamples: [
          { de: "Ich möchte meinen Vertrag hier abgeben.", es: "Quisiera entregar mi contrato aquí." }
        ]
      }
    ]
  },

  {
    id: "amt_fuehrerschein_07",
    titleDe: "Führerschein umschreiben und Firmenwagen fahren",
    titleEs: "Canjear el permiso de conducir y conducir vehículo de empresa",
    level: "A2",
    levelLabel: "A2",
    category: "behoerden",
    emoji: "🚗",
    readTime: "4 min",
    sentences: [
      {
        de: "Für meine tägliche Arbeit im Außendienst fahre ich einen modernen Firmenwagen.",
        es: "Para mi trabajo diario en servicio externo conduzco un moderno vehículo de empresa."
      },
      {
        de: "Mein alter Führerschein aus dem Heimatland ist in Deutschland nur sechs Monate lang gültig.",
        es: "Mi antiguo permiso de conducir de mi país de origen solo es válido durante seis meses en Alemania."
      },
      {
        de: "Deshalb stelle ich rechtzeitig beim Bürgeramt einen Antrag auf Umschreibung des Führerscheins.",
        es: "Por eso presento a tiempo en la oficina ciudadana una solicitud para canjear el permiso de conducir."
      },
      {
        de: "Ich brauche dafür ein biometrisches Passfoto, einen Sehtest und eine beglaubigte Übersetzung.",
        es: "Necesito para ello una foto biométrica de pasaporte, una prueba visual y una traducción jurada."
      },
      {
        de: "Gleichzeitig wiederhole ich abends alle wichtigen deutschen Verkehrsregeln und Schilder.",
        es: "Al mismo tiempo repaso por las tardes todas las normas de tráfico y señales alemanas importantes."
      },
      {
        de: "Vor allem auf der Autobahn und bei Baustellen achte ich genau auf das Tempolimit.",
        es: "Sobre todo en la autopista y en zonas de obras presto mucha atención al límite de velocidad."
      },
      {
        de: "Sechs Wochen später halte ich endlich den deutschen EU-Führerschein in der Hand.",
        es: "Seis semanas después tengo por fin en la mano el permiso de conducir alemán de la UE."
      }
    ],
    wordGlossary: {
      tägliche: { lemma: "täglich", translationEs: "diaria / de cada día", pos: "Adj.", level: "A1", isVerb: false },
      außendienst: { lemma: "der Außendienst", translationEs: "servicio externo / visitas a clientes", pos: "Nomen", level: "B1", isVerb: false },
      fahre: { lemma: "fahren", translationEs: "conduzco", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "fahren" },
      modernen: { lemma: "modern", translationEs: "moderno", pos: "Adj.", level: "A1", isVerb: false },
      firmenwagen: { lemma: "der Firmenwagen", translationEs: "el coche / vehículo de empresa", pos: "Nomen", level: "A2", isVerb: false },
      alter: { lemma: "alt", translationEs: "antiguo / viejo", pos: "Adj.", level: "A1", isVerb: false },
      führerschein: { lemma: "der Führerschein", translationEs: "el permiso / carné de conducir", pos: "Nomen", level: "A2", isVerb: false },
      heimatland: { lemma: "das Heimatland", translationEs: "el país de origen", pos: "Nomen", level: "A2", isVerb: false },
      gültig: { lemma: "gültig", translationEs: "válido / vigente", pos: "Adj.", level: "A2", isVerb: false },
      stelle: { lemma: "stellen", translationEs: "presento (una solicitud)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "stellen" },
      rechtzeitig: { lemma: "rechtzeitig", translationEs: "a tiempo / con antelación", pos: "Adv.", level: "A2", isVerb: false },
      bürgeramt: { lemma: "das Bürgeramt", translationEs: "oficina ciudadana / registro", pos: "Nomen", level: "A1", isVerb: false },
      antrag: { lemma: "der Antrag", translationEs: "la solicitud / instancia", pos: "Nomen", level: "A2", isVerb: false },
      umschreibung: { lemma: "die Umschreibung", translationEs: "el canje / homologación", pos: "Nomen", level: "B1", isVerb: false },
      brauche: { lemma: "brauchen", translationEs: "necesito", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "brauchen" },
      passfoto: { lemma: "das Passfoto", translationEs: "la foto de pasaporte / carné", pos: "Nomen", level: "A2", isVerb: false },
      sehtest: { lemma: "der Sehtest", translationEs: "el test de visión", pos: "Nomen", level: "A2", isVerb: false },
      beglaubigte: { lemma: "beglaubigt", translationEs: "compulsada / jurada", pos: "Adj.", level: "B1", isVerb: false },
      übersetzung: { lemma: "die Übersetzung", translationEs: "la traducción", pos: "Nomen", level: "A2", isVerb: false },
      wiederhole: { lemma: "wiederholen", translationEs: "repaso", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "wiederholen" },
      verkehrsregeln: { lemma: "die Verkehrsregel", translationEs: "las normas de tráfico", pos: "Nomen", level: "A2", isVerb: false },
      schilder: { lemma: "das Schild", translationEs: "las señales (de tráfico)", pos: "Nomen", level: "A2", isVerb: false },
      autobahn: { lemma: "die Autobahn", translationEs: "la autopista", pos: "Nomen", level: "A1", isVerb: false },
      baustellen: { lemma: "die Baustelle", translationEs: "las obras (en carretera)", pos: "Nomen", level: "A2", isVerb: false },
      achte: { lemma: "achten", translationEs: "presto atención", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "achten" },
      tempolimit: { lemma: "das Tempolimit", translationEs: "el límite de velocidad", pos: "Nomen", level: "A2", isVerb: false },
      wochen: { lemma: "die Woche", translationEs: "semanas", pos: "Nomen", level: "A1", isVerb: false },
      halte: { lemma: "halten", translationEs: "tengo / sostengo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "halten" },
      "eu-führerschein": { lemma: "der EU-Führerschein", translationEs: "el carné de conducir de la UE", pos: "Nomen", level: "A2", isVerb: false },
      hand: { lemma: "die Hand", translationEs: "la mano", pos: "Nomen", level: "A1", isVerb: false }
    },
    verbConjugations: pickVerbs("fahren", "stellen", "brauchen", "wiederholen", "achten", "halten"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Wie lange ist der alte Führerschein aus dem Heimatland in Deutschland gültig?",
        options: [
          "Nur sechs Monate lang.",
          "Zwei Jahre lang.",
          "Fünf Jahre lang."
        ],
        correctIndex: 0,
        explanationEs: "El texto aclara que el permiso extranjero es válido solo seis meses ('nur sechs Monate lang gültig')."
      },
      {
        type: "comprehension",
        prompt: "Worauf achtet der Fahrer auf der Autobahn besonders genau?",
        options: [
          "Auf den Einkaufswagen.",
          "Auf das Tempolimit.",
          "Auf das Kindergeld."
        ],
        correctIndex: 1,
        explanationEs: "Dice: 'Vor allem auf der Autobahn und bei Baustellen achte ich genau auf das Tempolimit'."
      },
      {
        type: "cloze",
        prompt: "Deshalb ___ ich rechtzeitig beim Bürgeramt einen Antrag auf Umschreibung.",
        options: ["stelle", "stellst", "stellt"],
        correctIndex: 0,
        explanationEs: "En alemán se dice 'einen Antrag stellen' (presentar una solicitud). Con 'ich', la forma es 'stelle'."
      },
      {
        type: "cloze",
        prompt: "Vor allem auf der Autobahn achte ich genau ___ das Tempolimit.",
        options: ["über", "mit", "auf"],
        correctIndex: 2,
        explanationEs: "El verbo 'achten' rige la preposición fija 'auf + Akkusativ': 'auf das Tempolimit achten'."
      }
    ],
    keyWords: [
      { de: "der Führerschein", es: "permiso / carné de conducir", pos: "Nomen", level: "A2", exampleDe: "Ich zeige meinen Führerschein bei der Kontrolle.", exampleEs: "Muestro mi permiso en el control." },
      { de: "umschreiben", es: "canjear / homologar (documento)", pos: "Verb", level: "A2", exampleDe: "Man muss den Führerschein umschreiben lassen.", exampleEs: "Hay que hacer el canje del permiso." },
      { de: "der Firmenwagen", es: "vehículo de empresa", pos: "Nomen", level: "A2", exampleDe: "Der Firmenwagen parkt vor dem Lager.", exampleEs: "El coche de empresa aparca ante el almacén." },
      { de: "einen Antrag stellen", es: "presentar una solicitud", pos: "Ausdruck", level: "A2", exampleDe: "Ich stelle heute den Antrag beim Bürgeramt.", exampleEs: "Presento hoy la solicitud en el registro." },
      { de: "gültig sein", es: "ser válido / estar vigente", pos: "Adj. + Verb", level: "A2", exampleDe: "Der Pass ist zehn Jahre gültig.", exampleEs: "El pasaporte es válido diez años." },
      { de: "die Verkehrsregeln", es: "las normas de tráfico", pos: "Nomen", level: "A2", exampleDe: "Alle müssen die Verkehrsregeln beachten.", exampleEs: "Todos deben respetar las normas de tráfico." },
      { de: "der Sehtest", es: "la prueba de vista", pos: "Nomen", level: "A2", exampleDe: "Beim Optiker mache ich den Sehtest.", exampleEs: "En la óptica hago el examen visual." },
      { de: "achten auf (+ Akk.)", es: "prestar atención a / respetar", pos: "Verb", level: "A2", exampleDe: "Bitte achten Sie auf das Schild!", exampleEs: "¡Por favor preste atención a la señal!" }
    ],
    grammarCards: [
      {
        title: "Feste Nomen-Verb-Verbindungen (einen Antrag stellen)",
        exampleDe: "Deshalb stelle ich beim Bürgeramt einen Antrag auf Umschreibung.",
        highlightedPart: "stelle ... einen Antrag",
        exampleEs: "Por eso presento en la oficina ciudadana una solicitud de canje.",
        descriptionEs: "En el alemán burocrático no 'das' ni 'haces' una solicitud: siempre la 'colocas' con el verbo 'stellen' (einen Antrag stellen auf + Akk.).",
        table: {
          headers: ["Sujeto", "Verbo", "Sustantivo fijo", "Preposición"],
          rows: [
            ["Ich", "stelle", "einen Antrag", "auf Umschreibung."],
            ["Wir", "stellen", "einen Antrag", "auf Kindergeld."]
          ]
        },
        extraExamples: [
          { de: "Wann stellst du deinen Antrag beim Amt?", es: "¿Cuándo presentas tu solicitud en la oficina?" }
        ]
      },
      {
        title: "Konnektor 'deshalb' (Consecuencia con inversión)",
        exampleDe: "Deshalb stelle ich rechtzeitig beim Bürgeramt einen Antrag.",
        highlightedPart: "Deshalb stelle ich",
        exampleEs: "Por eso presento a tiempo una solicitud en la oficina ciudadana.",
        descriptionEs: "'deshalb' (por eso) ocupa la Posición 1. El verbo conjugado debe ir en Posición 2 inmediatamente antes del sujeto ('ich').",
        table: {
          headers: ["Posición 1", "Verbo (Pos 2)", "Sujeto", "Resto"],
          rows: [
            ["Deshalb", "stelle", "ich", "einen Antrag."],
            ["Deshalb", "lerne", "ich", "alle Verkehrsregeln."]
          ]
        },
        extraExamples: [
          { de: "Es regnet stark, deshalb fahre ich langsamer.", es: "Llueve fuerte, por eso conduzco más lento." }
        ]
      }
    ]
  },

  {
    id: "amt_bank_krankenkasse_08",
    titleDe: "Girokonto, Gehalt und die Versichertenkarte",
    titleEs: "Cuenta corriente, salario y la tarjeta del seguro médico",
    level: "A1",
    levelLabel: "A1/A2",
    category: "behoerden",
    emoji: "🏥",
    readTime: "3 min",
    sentences: [
      {
        de: "Gleich am ersten Tag in Deutschland eröffne ich ein eigenes Girokonto bei einer Bank.",
        es: "Justo el primer día en Alemania abro una cuenta corriente propia en un banco."
      },
      {
        de: "Meine neue IBAN schicke ich per E-Mail an die Personalabteilung für mein monatliches Gehalt.",
        es: "Envío mi nuevo número IBAN por correo electrónico al departamento de personal para mi salario mensual."
      },
      {
        de: "Außerdem wähle ich eine gesetzliche Krankenkasse für mich und später für meine Familie.",
        es: "Además elijo una caja de seguro médico pública para mí y más adelante para mi familia."
      },
      {
        de: "Zwei Wochen danach liegt meine grüne elektronische Versichertenkarte im Briefkasten.",
        es: "Dos semanas después está mi tarjeta sanitaria electrónica verde en el buzón."
      },
      {
        de: "Als ich im Winter Fieber bekomme, buche ich online einen Termin beim Hausarzt.",
        es: "Cuando me da fiebre en invierno, reservo en línea una cita con el médico de cabecera."
      },
      {
        de: "An der Rezeption zeige ich die Karte vor und der Arzt untersucht mich gründlich.",
        es: "En la recepción muestro la tarjeta y el médico me examina detenidamente."
      },
      {
        de: "Meine Krankschreibung geht heute digital direkt an die Krankenkasse und an meinen Arbeitgeber.",
        es: "Mi baja médica va hoy de forma digital directamente al seguro médico y a mi empleador."
      }
    ],
    wordGlossary: {
      tag: { lemma: "der Tag", translationEs: "el día", pos: "Nomen", level: "A1", isVerb: false },
      eröffne: { lemma: "eröffnen", translationEs: "abro (cuenta)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "eroeffnen" },
      eigenes: { lemma: "eigen", translationEs: "propio / propia", pos: "Adj.", level: "A2", isVerb: false },
      girokonto: { lemma: "das Girokonto", translationEs: "la cuenta corriente", pos: "Nomen", level: "A1", isVerb: false },
      bank: { lemma: "die Bank", translationEs: "el banco", pos: "Nomen", level: "A1", isVerb: false },
      iban: { lemma: "die IBAN", translationEs: "el número de cuenta IBAN", pos: "Nomen", level: "A2", isVerb: false },
      schicke: { lemma: "schicken", translationEs: "envío", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "schicken" },
      "e-mail": { lemma: "die E-Mail", translationEs: "el correo electrónico", pos: "Nomen", level: "A1", isVerb: false },
      personalabteilung: { lemma: "die Personalabteilung", translationEs: "el departamento de personal / RRHH", pos: "Nomen", level: "B1", isVerb: false },
      monatliches: { lemma: "monatlich", translationEs: "mensual", pos: "Adj.", level: "A2", isVerb: false },
      gehalt: { lemma: "das Gehalt", translationEs: "el salario / sueldo", pos: "Nomen", level: "A2", isVerb: false },
      wähle: { lemma: "wählen", translationEs: "elijo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "waehlen" },
      gesetzliche: { lemma: "gesetzlich", translationEs: "pública / obligatoria por ley", pos: "Adj.", level: "A2", isVerb: false },
      krankenkasse: { lemma: "die Krankenkasse", translationEs: "el seguro médico / caja de salud", pos: "Nomen", level: "A1", isVerb: false },
      familie: { lemma: "die Familie", translationEs: "la familia", pos: "Nomen", level: "A1", isVerb: false },
      liegt: { lemma: "liegen", translationEs: "está / yace (carta)", pos: "Verb", level: "A1", isVerb: false },
      versichertenkarte: { lemma: "die Versichertenkarte", translationEs: "la tarjeta sanitaria del asegurado", pos: "Nomen", level: "A2", isVerb: false },
      briefkasten: { lemma: "der Briefkasten", translationEs: "el buzón", pos: "Nomen", level: "A1", isVerb: false },
      winter: { lemma: "der Winter", translationEs: "el invierno", pos: "Nomen", level: "A1", isVerb: false },
      fieber: { lemma: "das Fieber", translationEs: "la fiebre", pos: "Nomen", level: "A1", isVerb: false },
      bekomme: { lemma: "bekommen", translationEs: "me da / tengo (fiebre)", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "bekommen" },
      buche: { lemma: "buchen", translationEs: "reservo / agendo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "buchen" },
      online: { lemma: "online", translationEs: "en línea / por internet", pos: "Adv.", level: "A1", isVerb: false },
      termin: { lemma: "der Termin", translationEs: "la cita médica", pos: "Nomen", level: "A1", isVerb: false },
      hausarzt: { lemma: "der Hausarzt", translationEs: "el médico de cabecera", pos: "Nomen", level: "A1", isVerb: false },
      rezeption: { lemma: "die Rezeption", translationEs: "la recepción", pos: "Nomen", level: "A1", isVerb: false },
      zeige: { lemma: "vorzeigen", translationEs: "muestro / presento (con 'vor')", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "zeigen" },
      arzt: { lemma: "der Arzt", translationEs: "el médico", pos: "Nomen", level: "A1", isVerb: false },
      untersucht: { lemma: "untersuchen", translationEs: "examina / ausculta", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "untersuchen" },
      gründlich: { lemma: "gründlich", translationEs: "detenidamente / a fondo", pos: "Adv.", level: "A2", isVerb: false },
      krankschreibung: { lemma: "die Krankschreibung", translationEs: "la baja médica / justificante", pos: "Nomen", level: "A2", isVerb: false },
      geht: { lemma: "gehen", translationEs: "va / se envía", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "gehen" },
      digital: { lemma: "digital", translationEs: "de forma digital", pos: "Adv.", level: "A2", isVerb: false },
      arbeitgeber: { lemma: "der Arbeitgeber", translationEs: "el empleador / empresa", pos: "Nomen", level: "A2", isVerb: false }
    },
    verbConjugations: pickVerbs("eroeffnen", "schicken", "waehlen", "bekommen", "buchen", "zeigen", "untersuchen", "gehen"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Wofür schickt der Elektriker seine neue IBAN an die Personalabteilung?",
        options: [
          "Für sein monatliches Gehalt.",
          "Für die Wohnung im Keller.",
          "Für ein Visum in der Botschaft."
        ],
        correctIndex: 0,
        explanationEs: "El texto explica: 'Meine neue IBAN schicke ich per E-Mail an die Personalabteilung für mein monatliches Gehalt'."
      },
      {
        type: "comprehension",
        prompt: "Wie kommt die Krankschreibung heute zum Arbeitgeber?",
        options: [
          "Im Werkzeugkoffer.",
          "Digital direkt über die Krankenkasse.",
          "Per Expresszug am Bahnsteig."
        ],
        correctIndex: 1,
        explanationEs: "En Alemania la baja (eAU) es digital: 'Meine Krankschreibung geht heute digital direkt an die Krankenkasse und an meinen Arbeitgeber'."
      },
      {
        type: "cloze",
        prompt: "Als ich im Winter Fieber bekomme, buche ich einen Termin ___ Hausarzt.",
        options: ["beim", "auf dem", "nach dem"],
        correctIndex: 0,
        explanationEs: "Para personas o profesiones (médico, peluquero) se usa siempre la preposición 'bei + Dativ': 'bei dem Hausarzt' = 'beim Hausarzt'."
      },
      {
        type: "cloze",
        prompt: "Zwei Wochen danach ___ meine elektronische Versichertenkarte im Briefkasten.",
        options: ["sitzt", "liegt", "hängt"],
        correctIndex: 1,
        explanationEs: "Las cartas y tarjetas planas dentro de un buzón están tumbadas, por eso en alemán se usa el verbo 'liegen' ('liegt')."
      }
    ],
    keyWords: [
      { de: "das Girokonto", es: "la cuenta corriente", pos: "Nomen", level: "A1", exampleDe: "Für Deutschland brauche ich ein Girokonto.", exampleEs: "Para Alemania necesito una cuenta corriente." },
      { de: "das Gehalt", es: "el sueldo / salario", pos: "Nomen", level: "A2", exampleDe: "Das Gehalt kommt am Monatsende.", exampleEs: "El sueldo llega a fin de mes." },
      { de: "die Krankenkasse", es: "el seguro de salud", pos: "Nomen", level: "A1", exampleDe: "Meine Krankenkasse bezahlt den Arztbesuch.", exampleEs: "Mi seguro paga la visita al médico." },
      { de: "die Versichertenkarte", es: "la tarjeta sanitaria", pos: "Nomen", level: "A2", exampleDe: "Vergessen Sie Ihre Versichertenkarte nicht!", exampleEs: "¡No olvide su tarjeta sanitaria!" },
      { de: "der Termin beim Hausarzt", es: "la cita con el médico de cabecera", pos: "Ausdruck", level: "A1", exampleDe: "Ich habe um zehn Uhr einen Termin beim Hausarzt.", exampleEs: "Tengo cita a las diez con el médico." },
      { de: "die Krankschreibung", es: "la baja médica", pos: "Nomen", level: "A2", exampleDe: "Der Arzt schickt die Krankschreibung digital.", exampleEs: "El médico envía la baja de forma digital." },
      { de: "die IBAN", es: "código bancario IBAN", pos: "Nomen", level: "A2", exampleDe: "Hier ist meine neue IBAN.", exampleEs: "Aquí está mi nuevo IBAN." },
      { de: "der Arbeitgeber", es: "el empleador", pos: "Nomen", level: "A2", exampleDe: "Enpal ist mein neuer Arbeitgeber.", exampleEs: "Enpal es mi nuevo empleador." }
    ],
    grammarCards: [
      {
        title: "Präposition 'bei' mit Personen (beim Hausarzt, bei Enpal)",
        exampleDe: "Ich buche online einen Termin beim Hausarzt.",
        highlightedPart: "beim (bei dem) Hausarzt",
        exampleEs: "Reservo en línea una cita con el médico de cabecera.",
        descriptionEs: "Con profesiones, personas o empresas se usa la preposición 'bei' seguida de Dativo ('bei + dem = beim').",
        table: {
          headers: ["Preposición + Artículo", "Sustantivo", "Traducción"],
          rows: [
            ["beim (bei dem)", "Hausarzt", "en la consulta del médico de cabecera"],
            ["beim (bei dem)", "Kunden", "en casa del cliente"],
            ["bei der", "Bank", "en el banco"]
          ]
        },
        extraExamples: [
          { de: "Ich war gestern schon beim Arzt.", es: "Ayer ya estuve en el médico." }
        ]
      },
      {
        title: "Possessivartikel im Nominativ und Akkusativ (mein / meine)",
        exampleDe: "Meine Krankschreibung geht direkt an meinen Arbeitgeber.",
        highlightedPart: "Meine (fem.) / meinen (mask. Akk.)",
        exampleEs: "Mi baja médica va directamente a mi empleador.",
        descriptionEs: "'die Krankschreibung' es femenino ('meine'), mientras que 'der Arbeitgeber' tras 'an' (dirección = Acusativo) cambia a 'meinen Arbeitgeber'.",
        table: {
          headers: ["Género", "Nominativo", "Acusativo"],
          rows: [
            ["Masculino (der Arbeitgeber)", "mein Arbeitgeber", "meinen Arbeitgeber"],
            ["Femenino (die Karte)", "meine Karte", "meine Karte"],
            ["Neutro (das Gehalt)", "mein Gehalt", "mein Gehalt"]
          ]
        },
        extraExamples: [
          { de: "Meine Familie und meinen Arbeitsvertrag zeige ich im Büro.", es: "Muestro mi familia y mi contrato en la oficina." }
        ]
      }
    ]
  },

  // =========================================================================
  // CATEGORÍA 3: FAMILIENNACHZUG & FAMILIENLEBEN
  // =========================================================================
  {
    id: "familie_visum_09",
    titleDe: "Der Antrag auf Familiennachzug für meine Familie",
    titleEs: "La solicitud de reagrupación familiar para mi familia",
    level: "A2",
    levelLabel: "A2",
    category: "familie",
    emoji: "✈️",
    readTime: "4 min",
    sentences: [
      {
        de: "Seit sechs Monaten lebe und arbeite ich fest angestellt in Deutschland.",
        es: "Desde hace seis meses vivo y trabajo con contrato fijo en Alemania."
      },
      {
        de: "Jetzt möchte ich den Familiennachzug für meine Ehefrau und unsere drei Kinder beantragen.",
        es: "Ahora quiero solicitar la reagrupación familiar para mi esposa y nuestros tres hijos."
      },
      {
        de: "Unsere zwei Söhne gehen schon in die Schule und unsere kleine Tochter ist vier Jahre alt.",
        es: "Nuestros dos hijos varones ya van a la escuela y nuestra hija pequeña tiene cuatro años."
      },
      {
        de: "Wir sammeln gemeinsam alle wichtigen Papiere wie die Heiratsurkunde und die Geburtsurkunden.",
        es: "Reunimos juntos todos los papeles importantes como el certificado de matrimonio y las actas de nacimiento."
      },
      {
        de: "Ein vereidigter Übersetzer übersetzt jedes Dokument professionell ins Deutsche.",
        es: "Un traductor jurado traduce cada documento profesionalmente al alemán."
      },
      {
        de: "Nächsten Dienstag hat meine Frau den offiziellen Termin in der deutschen Botschaft.",
        es: "El próximo martes mi esposa tiene la cita oficial en la embajada alemana."
      },
      {
        de: "Wir hoffen sehr, dass das Visum bald genehmigt wird und wir bald zusammen sind.",
        es: "Esperamos mucho que el visado se apruebe pronto y estemos pronto juntos."
      }
    ],
    wordGlossary: {
      monaten: { lemma: "der Monat", translationEs: "meses (dat. plural)", pos: "Nomen", level: "A1", isVerb: false },
      lebe: { lemma: "leben", translationEs: "vivo", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "leben" },
      angestellt: { lemma: "fest angestellt", translationEs: "contratado fijo", pos: "Adj.", level: "A2", isVerb: false },
      möchte: { lemma: "mögen (möchte)", translationEs: "quiero / desearía", pos: "Modalverb", level: "A1", isVerb: false },
      familiennachzug: { lemma: "der Familiennachzug", translationEs: "la reagrupación familiar", pos: "Nomen", level: "A2", isVerb: false },
      ehefrau: { lemma: "die Ehefrau", translationEs: "la esposa / cónyuge", pos: "Nomen", level: "A1", isVerb: false },
      kinder: { lemma: "das Kind", translationEs: "los hijos / niños", pos: "Nomen", level: "A1", isVerb: false },
      beantragen: { lemma: "beantragen", translationEs: "solicitar (formalmente)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "beantragen" },
      söhne: { lemma: "der Sohn", translationEs: "los hijos varones", pos: "Nomen", level: "A1", isVerb: false },
      gehen: { lemma: "gehen", translationEs: "van", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "gehen" },
      schule: { lemma: "die Schule", translationEs: "la escuela / colegio", pos: "Nomen", level: "A1", isVerb: false },
      kleine: { lemma: "klein", translationEs: "pequeña", pos: "Adj.", level: "A1", isVerb: false },
      tochter: { lemma: "die Tochter", translationEs: "la hija", pos: "Nomen", level: "A1", isVerb: false },
      jahre: { lemma: "das Jahr", translationEs: "años", pos: "Nomen", level: "A1", isVerb: false },
      alt: { lemma: "alt", translationEs: "de edad (años)", pos: "Adj.", level: "A1", isVerb: false },
      sammeln: { lemma: "sammeln", translationEs: "reunimos / recopilamos", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "sammeln" },
      papiere: { lemma: "die Papiere", translationEs: "los papeles / documentos", pos: "Nomen", level: "A1", isVerb: false },
      heiratsurkunde: { lemma: "die Heiratsurkunde", translationEs: "el certificado de matrimonio", pos: "Nomen", level: "A2", isVerb: false },
      geburtsurkunden: { lemma: "die Geburtsurkunde", translationEs: "las actas de nacimiento", pos: "Nomen", level: "A2", isVerb: false },
      vereidigter: { lemma: "vereidigt", translationEs: "jurado (traductor oficial)", pos: "Adj.", level: "B1", isVerb: false },
      übersetzer: { lemma: "der Übersetzer", translationEs: "el traductor", pos: "Nomen", level: "A2", isVerb: false },
      übersetzt: { lemma: "übersetzen", translationEs: "traduce", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "uebersetzen" },
      jedes: { lemma: "jeder / jedes", translationEs: "cada", pos: "Pron.", level: "A1", isVerb: false },
      dokument: { lemma: "das Dokument", translationEs: "el documento", pos: "Nomen", level: "A2", isVerb: false },
      professionell: { lemma: "professionell", translationEs: "profesionalmente", pos: "Adv.", level: "A2", isVerb: false },
      ins: { lemma: "in + das", translationEs: "al (alemán)", pos: "Präp.+Art.", level: "A1", isVerb: false },
      deutsche: { lemma: "das Deutsch", translationEs: "el idioma alemán", pos: "Nomen", level: "A1", isVerb: false },
      nächsten: { lemma: "nächst-", translationEs: "próximo", pos: "Adj.", level: "A1", isVerb: false },
      dienstag: { lemma: "der Dienstag", translationEs: "el martes", pos: "Nomen", level: "A1", isVerb: false },
      frau: { lemma: "die Frau", translationEs: "la esposa / mujer", pos: "Nomen", level: "A1", isVerb: false },
      offiziellen: { lemma: "offiziell", translationEs: "oficial", pos: "Adj.", level: "A2", isVerb: false },
      botschaft: { lemma: "die Botschaft", translationEs: "la embajada", pos: "Nomen", level: "A2", isVerb: false },
      hoffen: { lemma: "hoffen", translationEs: "esperamos (con ilusión)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "hoffen" },
      visum: { lemma: "das Visum", translationEs: "el visado", pos: "Nomen", level: "A2", isVerb: false },
      genehmigt: { lemma: "genehmigen", translationEs: "aprobado", pos: "Partizip/Verb", level: "B1", isVerb: false }
    },
    verbConjugations: pickVerbs("leben", "beantragen", "gehen", "sammeln", "uebersetzen", "hoffen"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Wie viele Kinder hat die Familie?",
        options: [
          "Drei Kinder: zwei Söhne und eine Tochter.",
          "Zwei Kinder: zwei Töchter.",
          "Ein Kind im Kindergarten."
        ],
        correctIndex: 0,
        explanationEs: "El texto dice: 'unsere drei Kinder' y luego detalla: 'Unsere zwei Söhne ... und unsere kleine Tochter'."
      },
      {
        type: "comprehension",
        prompt: "Wo hat die Ehefrau am Dienstag den Termin?",
        options: [
          "Bei der Bank.",
          "In der deutschen Botschaft.",
          "Im Lager."
        ],
        correctIndex: 1,
        explanationEs: "Para tramitar el visado de reagrupación en el país de origen, la cita es 'in der deutschen Botschaft'."
      },
      {
        type: "cloze",
        prompt: "Wir hoffen sehr, ___ das Visum bald genehmigt wird.",
        options: ["weil", "ob", "dass"],
        correctIndex: 2,
        explanationEs: "Después de verbos de esperanza o pensamiento ('wir hoffen') introducimos la oración con 'dass' (que) + verbo al final ('wird')."
      },
      {
        type: "cloze",
        prompt: "Seit sechs ___ lebe und arbeite ich fest angestellt in Deutschland.",
        options: ["Monat", "Monaten", "Monate"],
        correctIndex: 1,
        explanationEs: "La preposición temporal 'seit' rige siempre Dativo. En plural Dativo, 'Monate' recibe una '-n' final: 'seit sechs Monaten'."
      }
    ],
    keyWords: [
      { de: "der Familiennachzug", es: "reagrupación familiar", pos: "Nomen", level: "A2", exampleDe: "Der Familiennachzug bringt meine Familie nach Deutschland.", exampleEs: "La reagrupación trae a mi familia a Alemania." },
      { de: "die Ehefrau", es: "la esposa", pos: "Nomen", level: "A1", exampleDe: "Meine Ehefrau bereitet alle Dokumente vor.", exampleEs: "Mi esposa prepara todos los documentos." },
      { de: "zwei Söhne und eine Tochter", es: "dos hijos y una hija", pos: "Nomen", level: "A1", exampleDe: "Wir haben zwei Söhne und eine Tochter.", exampleEs: "Tenemos dos hijos y una hija." },
      { de: "die Papiere", es: "los papeles / documentos", pos: "Nomen", level: "A1", exampleDe: "Sind alle Papiere vollständig?", exampleEs: "¿Están todos los papeles completos?" },
      { de: "beantragen", es: "solicitar", pos: "Verb", level: "A2", exampleDe: "Wir beantragen das nationale Visum.", exampleEs: "Solicitamos el visado nacional." },
      { de: "die Botschaft", es: "la embajada", pos: "Nomen", level: "A2", exampleDe: "Der Termin findet in der Botschaft statt.", exampleEs: "La cita tiene lugar en la embajada." },
      { de: "die Geburtsurkunde", es: "el acta de nacimiento", pos: "Nomen", level: "A2", exampleDe: "Jedes Kind braucht seine Geburtsurkunde.", exampleEs: "Cada niño necesita su partida de nacimiento." },
      { de: "genehmigen", es: "aprobar / autorizar", pos: "Verb", level: "B1", exampleDe: "Das Visum wird bald genehmigt.", exampleEs: "El visado será aprobado pronto." }
    ],
    grammarCards: [
      {
        title: "Nebensatz mit 'dass' + Zustand/Passiv am Ende",
        exampleDe: "Wir hoffen sehr, dass das Visum bald genehmigt wird.",
        highlightedPart: "dass ... genehmigt wird",
        exampleEs: "Esperamos mucho que el visado sea aprobado pronto.",
        descriptionEs: "'dass' introduce una subordinada completiva y envía el verbo auxiliar conjugado ('wird') completamente al final.",
        table: {
          headers: ["Principal", "Nexo", "Sujeto + Adverbio", "Participio + Auxiliar"],
          rows: [
            ["Wir hoffen,", "dass", "das Visum bald", "genehmigt wird."],
            ["Ich weiß,", "dass", "meine Frau die Papiere", "hat."]
          ]
        },
        extraExamples: [
          { de: "Ich bin froh, dass meine Kinder bald hier sind.", es: "Me alegro de que mis hijos estén pronto aquí." }
        ]
      },
      {
        title: "'Seit' + Dativ (Zeitdauer hasta el presente)",
        exampleDe: "Seit sechs Monaten lebe und arbeite ich in Deutschland.",
        highlightedPart: "Seit sechs Monaten",
        exampleEs: "Desde hace seis meses vivo y trabajo en Alemania.",
        descriptionEs: "En alemán, una acción que empezó en el pasado y sigue ahora se expresa en Presente con 'seit' + Dativo (plural lleva '-n': Monaten, Wochen, Jahren).",
        table: {
          headers: ["Preposición", "Número", "Sustantivo en Dativo Plural"],
          rows: [
            ["Seit", "sechs", "Monaten"],
            ["Seit", "drei", "Wochen"],
            ["Seit", "zwei", "Jahren"]
          ]
        },
        extraExamples: [
          { de: "Seit zwei Wochen warte ich auf den Brief.", es: "Desde hace dos semanas espero la carta." }
        ]
      }
    ]
  },

  {
    id: "familie_wohnung_10",
    titleDe: "Eine größere Wohnung für fünf Personen mieten",
    titleEs: "Alquilar un piso más grande para cinco personas",
    level: "A1",
    levelLabel: "A1/A2",
    category: "familie",
    emoji: "🏡",
    readTime: "4 min",
    sentences: [
      {
        de: "Mein kleines Zimmer reicht für fünf Personen leider nicht mehr aus.",
        es: "Mi pequeña habitación lamentablemente ya no alcanza para cinco personas."
      },
      {
        de: "Deshalb suche ich intensiv eine helle Vierzimmerwohnung mit zwei eigenen Kinderzimmern.",
        es: "Por eso busco intensamente un luminoso piso de cuatro habitaciones con dos cuartos infantiles propios."
      },
      {
        de: "In der Anzeige steht genau, wie hoch die monatliche Kaltmiete und die gesamte Warmmiete sind.",
        es: "En el anuncio pone exactamente cuánto son el alquiler base mensual y el alquiler total con gastos incluidos."
      },
      {
        de: "Vor dem Einzug überweise ich die gesetzliche Kaution von drei Monatsmieten auf das Mietkonto.",
        es: "Antes de mudarme transfiero la fianza legal de tres meses de alquiler a la cuenta de fianza."
      },
      {
        de: "Bei der Schlüsselübergabe erklärt mir der Vermieter freundlich die wichtige Hausordnung im Gebäude.",
        es: "En la entrega de llaves el casero me explica amablemente las normas importantes de la casa en el edificio."
      },
      {
        de: "Ab zweiundzwanzig Uhr gilt abends und am Sonntag immer die allgemeine Ruhezeit für alle Nachbarn.",
        es: "A partir de las diez de la noche y los domingos rige siempre el horario general de descanso para todos los vecinos."
      },
      {
        de: "Im Hof stehen vier bunte Tonnen, weil die korrekte Mülltrennung hier in Deutschland sehr streng ist.",
        es: "En el patio hay cuatro contenedores de colores, porque la correcta separación de basuras aquí en Alemania es muy estricta."
      }
    ],
    wordGlossary: {
      zimmer: { lemma: "das Zimmer", translationEs: "la habitación", pos: "Nomen", level: "A1", isVerb: false },
      reicht: { lemma: "ausreichen", translationEs: "alcanza / basta (con 'aus')", pos: "Verb", level: "A2", isVerb: false },
      personen: { lemma: "die Person", translationEs: "personas", pos: "Nomen", level: "A1", isVerb: false },
      suche: { lemma: "suchen", translationEs: "busco", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "suchen" },
      intensiv: { lemma: "intensiv", translationEs: "intensamente", pos: "Adv.", level: "A2", isVerb: false },
      helle: { lemma: "hell", translationEs: "luminoso / claro", pos: "Adj.", level: "A1", isVerb: false },
      vierzimmerwohnung: { lemma: "die Vierzimmerwohnung", translationEs: "el piso de cuatro habitaciones", pos: "Nomen", level: "A2", isVerb: false },
      kinderzimmern: { lemma: "das Kinderzimmer", translationEs: "habitaciones infantiles (dat.)", pos: "Nomen", level: "A1", isVerb: false },
      anzeige: { lemma: "die Anzeige", translationEs: "el anuncio (inmobiliario)", pos: "Nomen", level: "A1", isVerb: false },
      hoch: { lemma: "hoch", translationEs: "alto (precio/importe)", pos: "Adj.", level: "A1", isVerb: false },
      kaltmiete: { lemma: "die Kaltmiete", translationEs: "el alquiler frío (sin gastos)", pos: "Nomen", level: "A2", isVerb: false },
      gesamte: { lemma: "gesamt", translationEs: "total / completo", pos: "Adj.", level: "A2", isVerb: false },
      warmmiete: { lemma: "die Warmmiete", translationEs: "el alquiler con gastos (calefacción/agua)", pos: "Nomen", level: "A2", isVerb: false },
      einzug: { lemma: "der Einzug", translationEs: "la mudanza / entrada al piso", pos: "Nomen", level: "A2", isVerb: false },
      überweise: { lemma: "überweisen", translationEs: "transfiero (dinero)", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "ueberweisen" },
      kaution: { lemma: "die Kaution", translationEs: "la fianza / depósito", pos: "Nomen", level: "A2", isVerb: false },
      monatsmieten: { lemma: "die Monatsmiete", translationEs: "mensualidades de alquiler", pos: "Nomen", level: "A2", isVerb: false },
      mietkonto: { lemma: "das Mietkonto", translationEs: "la cuenta de fianza/alquiler", pos: "Nomen", level: "B1", isVerb: false },
      schlüsselübergabe: { lemma: "die Schlüsselübergabe", translationEs: "la entrega de llaves", pos: "Nomen", level: "A2", isVerb: false },
      erklärt: { lemma: "erklären", translationEs: "explica", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "erklaeren" },
      vermieter: { lemma: "der Vermieter", translationEs: "el casero / propietario", pos: "Nomen", level: "A1", isVerb: false },
      hausordnung: { lemma: "die Hausordnung", translationEs: "el reglamento de la casa", pos: "Nomen", level: "A2", isVerb: false },
      gebäude: { lemma: "das Gebäude", translationEs: "el edificio", pos: "Nomen", level: "A2", isVerb: false },
      gilt: { lemma: "gelten", translationEs: "rige / es válido", pos: "Verb", level: "A2", isVerb: false },
      sonntag: { lemma: "der Sonntag", translationEs: "el domingo", pos: "Nomen", level: "A1", isVerb: false },
      allgemeine: { lemma: "allgemein", translationEs: "general", pos: "Adj.", level: "A2", isVerb: false },
      ruhezeit: { lemma: "die Ruhezeit", translationEs: "el horario de descanso / silencio", pos: "Nomen", level: "A2", isVerb: false },
      nachbarn: { lemma: "der Nachbar", translationEs: "los vecinos", pos: "Nomen", level: "A1", isVerb: false },
      hof: { lemma: "der Hof", translationEs: "el patio", pos: "Nomen", level: "A2", isVerb: false },
      bunte: { lemma: "bunt", translationEs: "de colores", pos: "Adj.", level: "A2", isVerb: false },
      tonnen: { lemma: "die Tonne", translationEs: "los contenedores (de basura)", pos: "Nomen", level: "A2", isVerb: false },
      korrekte: { lemma: "korrekt", translationEs: "correcta", pos: "Adj.", level: "A2", isVerb: false },
      mülltrennung: { lemma: "die Mülltrennung", translationEs: "la separación de basuras", pos: "Nomen", level: "A2", isVerb: false },
      streng: { lemma: "streng", translationEs: "estricta / rigurosa", pos: "Adj.", level: "A2", isVerb: false }
    },
    verbConjugations: pickVerbs("suchen", "ueberweisen", "erklaeren", "mieten", "stehen"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Wie hoch ist die Kaution für die Wohnung?",
        options: [
          "Drei Monatsmieten.",
          "Zehn Monatsmieten.",
          "Eine Wochenmiete."
        ],
        correctIndex: 0,
        explanationEs: "El texto dice: 'überweise ich die gesetzliche Kaution von drei Monatsmieten auf das Mietkonto'."
      },
      {
        type: "comprehension",
        prompt: "Wann gilt laut Hausordnung die Ruhezeit?",
        options: [
          "Morgens um sieben Uhr.",
          "Ab 22 Uhr abends und am Sonntag.",
          "Nur im Winter."
        ],
        correctIndex: 1,
        explanationEs: "Según la lectura: 'Ab zweiundzwanzig Uhr gilt abends und am Sonntag immer die allgemeine Ruhezeit für alle Nachbarn'."
      },
      {
        type: "cloze",
        prompt: "Im Hof stehen vier bunte Tonnen, ___ die korrekte Mülltrennung hier sehr streng ist.",
        options: ["denn", "weil", "aber"],
        correctIndex: 1,
        explanationEs: "Fíjate en la posición del verbo 'ist': está al final de la frase ('streng ist'). Por tanto, debe ir la conjunción subordinante 'weil'."
      },
      {
        type: "cloze",
        prompt: "Ich suche eine Vierzimmerwohnung mit zwei eigenen ___.",
        options: ["Kinderzimmern", "Kinderzimmers", "Kinderzimmer"],
        correctIndex: 0,
        explanationEs: "La preposición 'mit' rige Dativo. El sustantivo plural 'die Kinderzimmer' añade '-n' en Dativo plural: 'mit zwei eigenen Kinderzimmern'."
      }
    ],
    keyWords: [
      { de: "das Kinderzimmer", es: "el dormitorio infantil", pos: "Nomen", level: "A1", exampleDe: "Die Kinder freuen sich auf ihr Kinderzimmer.", exampleEs: "Los niños se alegran por su cuarto infantil." },
      { de: "die Kaltmiete", es: "alquiler neto (sin calefacción/agua)", pos: "Nomen", level: "A2", exampleDe: "Die Kaltmiete beträgt 950 Euro.", exampleEs: "El alquiler base asciende a 950 euros." },
      { de: "die Warmmiete", es: "alquiler total con gastos incluidos", pos: "Nomen", level: "A2", exampleDe: "In der Warmmiete ist die Heizung enthalten.", exampleEs: "En el alquiler total está incluida la calefacción." },
      { de: "die Kaution", es: "la fianza", pos: "Nomen", level: "A2", exampleDe: "Die Kaution bekommt man beim Auszug zurück.", exampleEs: "La fianza se devuelve al mudarse fuera." },
      { de: "die Hausordnung", es: "el reglamento de convivencia", pos: "Nomen", level: "A2", exampleDe: "Die Hausordnung hängt im Flur.", exampleEs: "Las normas de la casa están colgadas en el portal." },
      { de: "die Ruhezeit", es: "el horario de silencio", pos: "Nomen", level: "A2", exampleDe: "In der Ruhezeit spielt man nicht laut Musik.", exampleEs: "En horario de descanso no se pone música alta." },
      { de: "die Mülltrennung", es: "separación / reciclaje de basura", pos: "Nomen", level: "A2", exampleDe: "Papier kommt bei der Mülltrennung in die blaue Tonne.", exampleEs: "El papel va al contenedor azul al separar basuras." },
      { de: "mieten", es: "alquilar (tomar en alquiler)", pos: "Verb", level: "A1", exampleDe: "Wir möchten ab Mai diese Wohnung mieten.", exampleEs: "Queremos alquilar este piso desde mayo." }
    ],
    grammarCards: [
      {
        title: "Kausalsatz mit 'weil' (Verbo conjugado al final)",
        exampleDe: "Im Hof stehen vier Tonnen, weil die Mülltrennung sehr streng ist.",
        highlightedPart: "weil ... streng ist",
        exampleEs: "En el patio hay cuatro contenedores, porque la separación de basuras es muy estricta.",
        descriptionEs: "'weil' explica la razón igual que 'denn', pero manda el verbo conjugado ('ist') a la última posición de la oración.",
        table: {
          headers: ["Principal", "Nexo", "Sujeto + Adj.", "Verbo al final"],
          rows: [
            ["Wir brauchen 4 Zimmer,", "weil", "wir fünf Personen", "sind."],
            ["Ich überweise Geld,", "weil", "der Vermieter Kaution", "möchte."]
          ]
        },
        extraExamples: [
          { de: "Wir sind leise, weil ab 22 Uhr Ruhezeit ist.", es: "Estamos en silencio porque desde las 22h es horario de descanso." }
        ]
      },
      {
        title: "Komparativ: 'groß -> größer' (más grande)",
        exampleDe: "Wir möchten eine größere Wohnung mieten.",
        highlightedPart: "eine größere Wohnung",
        exampleEs: "Queremos alquilar un piso más grande.",
        descriptionEs: "Los adjetivos cortos de una sílaba como 'groß', 'alt' o 'lang' añaden Umlaut (ä, ö, ü) + '-er' en el comparativo antes de la terminación del caso.",
        table: {
          headers: ["Positiv", "Komparativ", "Ejemplo con Sustantivo"],
          rows: [
            ["groß", "größer", "eine größere Wohnung"],
            ["lang", "länger", "eine längere Frist"],
            ["hell", "heller", "ein helleres Zimmer"]
          ]
        },
        extraExamples: [
          { de: "Diese Wohnung ist viel größer als mein altes Zimmer.", es: "Este piso es mucho más grande que mi antigua habitación." }
        ]
      }
    ]
  },

  {
    id: "familie_schule_kita_11",
    titleDe: "Anmeldung in der Schule, Kita und Kindergeld",
    titleEs: "Inscripción en la escuela, guardería (Kita) y Kindergeld",
    level: "A2",
    levelLabel: "A2",
    category: "familie",
    emoji: "🎒",
    readTime: "4 min",
    sentences: [
      {
        de: "Kaum liegt die Meldebescheinigung für die Kinder vor, plane ich den Alltag in der neuen Stadt.",
        es: "En cuanto está disponible el certificado de empadronamiento para los niños, planifico el día a día en la nueva ciudad."
      },
      {
        de: "Für unsere vierjährige Tochter reservieren wir einen schönen Platz im Kindergarten ganz in der Nähe.",
        es: "Para nuestra hija de cuatro años reservamos una bonita plaza en la guardería infantil muy cerca."
      },
      {
        de: "Für unsere beiden Söhne organisieren wir ein Kennenlerngespräch direkt in der Grundschule und Gesamtschule.",
        es: "Para nuestros dos hijos varones organizamos una entrevista de presentación directamente en la escuela primaria y secundaria."
      },
      {
        de: "Die freundliche Lehrerin zeigt den Jungs sofort ihren Klassenraum und den neuen Stundenplan.",
        es: "La amable profesora muestra en seguida a los chicos su aula y el nuevo horario escolar."
      },
      {
        de: "Am Wochenende fülle ich außerdem am Laptop den digitalen Antrag auf Kindergeld aus.",
        es: "El fin de semana relleno además en el portátil la solicitud digital del subsidio por hijos (Kindergeld)."
      },
      {
        de: "Ich schicke den Antrag zusammen mit den Steuer-IDs direkt an die zuständige Familienkasse.",
        es: "Envío la solicitud junto con los números Steuer-ID directamente a la caja familiar competente."
      },
      {
        de: "Jeden Monat unterstützt dieses Geld unsere fünf Köpfe beim Essen und bei den Schulsachen.",
        es: "Cada mes este dinero apoya a nuestra familia de cinco en la comida y en el material escolar."
      }
    ],
    wordGlossary: {
      kaum: { lemma: "kaum", translationEs: "apenas / en cuanto", pos: "Konj./Adv.", level: "B1", isVerb: false },
      liegt: { lemma: "vorliegen", translationEs: "está disponible / presente (con 'vor')", pos: "Verb", level: "A2", isVerb: false },
      meldebescheinigung: { lemma: "die Meldebescheinigung", translationEs: "el empadronamiento", pos: "Nomen", level: "A2", isVerb: false },
      plane: { lemma: "planen", translationEs: "planifico", pos: "Verb", level: "A1", isVerb: false },
      alltag: { lemma: "der Alltag", translationEs: "el día a día / rutina", pos: "Nomen", level: "A2", isVerb: false },
      vierjährige: { lemma: "vierjährig", translationEs: "de cuatro años de edad", pos: "Adj.", level: "A2", isVerb: false },
      tochter: { lemma: "die Tochter", translationEs: "la hija", pos: "Nomen", level: "A1", isVerb: false },
      reservieren: { lemma: "reservieren", translationEs: "reservamos", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "reservieren" },
      platz: { lemma: "der Platz", translationEs: "la plaza / lugar", pos: "Nomen", level: "A1", isVerb: false },
      kindergarten: { lemma: "der Kindergarten", translationEs: "el jardín de infancia / guardería (Kita)", pos: "Nomen", level: "A1", isVerb: false },
      nähe: { lemma: "die Nähe", translationEs: "cercanía ('in der Nähe' = cerca)", pos: "Nomen", level: "A1", isVerb: false },
      beiden: { lemma: "beide", translationEs: "ambos / los dos", pos: "Pron.", level: "A1", isVerb: false },
      söhne: { lemma: "der Sohn", translationEs: "hijos varones", pos: "Nomen", level: "A1", isVerb: false },
      organisieren: { lemma: "organisieren", translationEs: "organizamos", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "organisieren" },
      kennenlerngespräch: { lemma: "das Kennenlerngespräch", translationEs: "la entrevista de presentación", pos: "Nomen", level: "B1", isVerb: false },
      grundschule: { lemma: "die Grundschule", translationEs: "la escuela primaria", pos: "Nomen", level: "A2", isVerb: false },
      gesamtschule: { lemma: "die Gesamtschule", translationEs: "la escuela secundaria integrada", pos: "Nomen", level: "A2", isVerb: false },
      lehrerin: { lemma: "die Lehrerin", translationEs: "la profesora / maestra", pos: "Nomen", level: "A1", isVerb: false },
      zeigt: { lemma: "zeigen", translationEs: "muestra", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "zeigen" },
      jungs: { lemma: "die Jungs", translationEs: "los chicos (coloquial)", pos: "Nomen", level: "A2", isVerb: false },
      klassenraum: { lemma: "der Klassenraum", translationEs: "el aula / salón de clases", pos: "Nomen", level: "A1", isVerb: false },
      stundenplan: { lemma: "der Stundenplan", translationEs: "el horario de clases", pos: "Nomen", level: "A2", isVerb: false },
      wochenende: { lemma: "das Wochenende", translationEs: "el fin de semana", pos: "Nomen", level: "A1", isVerb: false },
      fülle: { lemma: "ausfüllen", translationEs: "relleno (con 'aus')", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "ausfuellen" },
      laptop: { lemma: "der Laptop", translationEs: "el ordenador portátil", pos: "Nomen", level: "A1", isVerb: false },
      antrag: { lemma: "der Antrag", translationEs: "la solicitud", pos: "Nomen", level: "A2", isVerb: false },
      kindergeld: { lemma: "das Kindergeld", translationEs: "la prestación económica por hijo", pos: "Nomen", level: "A2", isVerb: false },
      schicke: { lemma: "schicken", translationEs: "envío", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "schicken" },
      "steuer-ids": { lemma: "die Steuer-ID", translationEs: "los números fiscales Steuer-ID", pos: "Nomen", level: "A2", isVerb: false },
      familienkasse: { lemma: "die Familienkasse", translationEs: "la Caja Familiar (entidad de ayudas)", pos: "Nomen", level: "A2", isVerb: false },
      monat: { lemma: "der Monat", translationEs: "mes", pos: "Nomen", level: "A1", isVerb: false },
      unterstützt: { lemma: "unterstützen", translationEs: "apoya / ayuda", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "unterstuetzen" },
      köpfe: { lemma: "der Kopf", translationEs: "miembros / personas ('5 Köpfe')", pos: "Nomen", level: "A1", isVerb: false },
      essen: { lemma: "das Essen", translationEs: "la comida / alimentación", pos: "Nomen", level: "A1", isVerb: false },
      schulsachen: { lemma: "die Schulsachen", translationEs: "el material escolar", pos: "Nomen", level: "A2", isVerb: false }
    },
    verbConjugations: pickVerbs("reservieren", "organisieren", "zeigen", "ausfuellen", "schicken", "unterstuetzen"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Was zeigt die Lehrerin den beiden Söhnen sofort?",
        options: [
          "Den Klassenraum und den neuen Stundenplan.",
          "Die Telefonnummer der Bank.",
          "Das Hausordnung-Dokument."
        ],
        correctIndex: 0,
        explanationEs: "El texto dice: 'Die freundliche Lehrerin zeigt den Jungs sofort ihren Klassenraum und den neuen Stundenplan'."
      },
      {
        type: "comprehension",
        prompt: "Wohin schickt der Vater den Antrag auf Kindergeld?",
        options: [
          "An die zuständige Familienkasse.",
          "An das Bürgeramt am Flughafen.",
          "An die Fahrschule."
        ],
        correctIndex: 0,
        explanationEs: "La entidad que gestiona el Kindergeld es la 'Familienkasse': 'direkt an die zuständige Familienkasse'."
      },
      {
        type: "cloze",
        prompt: "Am Wochenende fülle ich am Laptop den digitalen Antrag ___ Kindergeld aus.",
        options: ["auf", "mit", "bei"],
        correctIndex: 0,
        explanationEs: "La expresión burocrática fija es siempre 'Antrag auf + Akkusativ': 'der Antrag auf Kindergeld'."
      },
      {
        type: "cloze",
        prompt: "Die Lehrerin zeigt ___ Jungs sofort den neuen Stundenplan.",
        options: ["die", "der", "den"],
        correctIndex: 2,
        explanationEs: "El destinatario de 'zeigen' (¿a quién muestra?) va en Dativo plural: 'die Jungs' → 'den Jungs'."
      }
    ],
    keyWords: [
      { de: "der Kindergarten (Kita)", es: "guardería / jardín infantil", pos: "Nomen", level: "A1", exampleDe: "Unsere Tochter geht gern in den Kindergarten.", exampleEs: "Nuestra hija va contenta a la guardería." },
      { de: "die Schule / Grundschule", es: "la escuela / primaria", pos: "Nomen", level: "A1", exampleDe: "Die Schule fängt um acht Uhr an.", exampleEs: "La escuela empieza a las ocho." },
      { de: "der Stundenplan", es: "el horario escolar", pos: "Nomen", level: "A2", exampleDe: "Montags haben sie Deutsch auf dem Stundenplan.", exampleEs: "Los lunes tienen alemán en el horario." },
      { de: "der Antrag auf Kindergeld", es: "solicitud de ayuda por hijo", pos: "Ausdruck", level: "A2", exampleDe: "Für jedes Kind gibt es Kindergeld.", exampleEs: "Para cada hijo hay prestación Kindergeld." },
      { de: "die Familienkasse", es: "Caja Familiar (organismo)", pos: "Nomen", level: "A2", exampleDe: "Die Familienkasse überweist das Kindergeld monatlich.", exampleEs: "La Caja Familiar transfiere el Kindergeld cada mes." },
      { de: "in der Nähe", es: "cerca / en las cercanías", pos: "Ausdruck", level: "A1", exampleDe: "Die Kita liegt direkt in der Nähe.", exampleEs: "La guardería está justo cerca." },
      { de: "unterstützen", es: "apoyar / ayudar", pos: "Verb", level: "A2", exampleDe: "Das Geld unterstützt die Familie im Alltag.", exampleEs: "El dinero apoya a la familia en el día a día." },
      { de: "die Schulsachen", es: "útiles / material escolar", pos: "Nomen", level: "A2", exampleDe: "Wir kaufen Hefte und Stifte für die Schulsachen.", exampleEs: "Compramos cuadernos y lápices para el material escolar." }
    ],
    grammarCards: [
      {
        title: "Untrennbare Verben: 'unterstützen' & Verben auf '-ieren'",
        exampleDe: "Dieses Geld unterstützt unsere fünf Köpfe beim Essen.",
        highlightedPart: "unterstützt / reservieren / organisieren",
        exampleEs: "Este dinero apoya a nuestra familia de cinco en la comida.",
        descriptionEs: "Los verbos terminados en '-ieren' (reservieren, organisieren) y los verbos con prefijos no separables (be-, er-, ver-, unter- con sentido abstracto) NO añaden 'ge-' en el participio ni se separan.",
        table: {
          headers: ["Infinitivo", "Presente (wir / es)", "Perfekt (sin 'ge-')"],
          rows: [
            ["reservieren", "wir reservieren", "wir haben reserviert"],
            ["organisieren", "wir organisieren", "wir haben organisiert"],
            ["unterstützen", "es unterstützt", "es hat unterstützt"]
          ]
        },
        extraExamples: [
          { de: "Wir haben schon einen Kita-Platz reserviert.", es: "Ya hemos reservado una plaza de guardería." }
        ]
      },
      {
        title: "Temporale Präposition 'am' vs. Zeitausdruck 'jeden Monat'",
        exampleDe: "Am Wochenende fülle ich den Antrag aus. Jeden Monat kommt das Geld.",
        highlightedPart: "Am Wochenende / Jeden Monat",
        exampleEs: "El fin de semana relleno la solicitud. Cada mes llega el dinero.",
        descriptionEs: "Los días y el fin de semana llevan 'am' (an dem). En cambio, 'jeden Monat' (cada mes) va directamente en Acusativo sin preposición.",
        table: {
          headers: ["Expresión temporal", "Tipo", "Ejemplo"],
          rows: [
            ["am Wochenende", "con 'am' (an dem)", "Am Wochenende haben wir frei."],
            ["jeden Monat", "Acusativo sin prep.", "Jeden Monat zahlt die Familienkasse."]
          ]
        },
        extraExamples: [
          { de: "Jeden Montag gehen die Söhne früh zur Schule.", es: "Cada lunes los hijos van temprano a la escuela." }
        ]
      }
    ]
  },

  {
    id: "familie_ankunft_12",
    titleDe: "Endlich zusammen! Abholung am Flughafen",
    titleEs: "¡Por fin juntos! Recogida en el aeropuerto",
    level: "A1",
    levelLabel: "A1",
    category: "familie",
    emoji: "🎉",
    readTime: "3 min",
    sentences: [
      {
        de: "Heute ist der schönste Tag des Jahres, denn meine ganze Familie landet endlich in Deutschland.",
        es: "Hoy es el día más bonito del año, porque toda mi familia aterriza por fin en Alemania."
      },
      {
        de: "Ich fahre früh zum Flughafen und nehme für alle Fälle meinen großen Regenschirm mit.",
        es: "Voy temprano al aeropuerto y llevo por si acaso mi paraguas grande."
      },
      {
        de: "Vor der Ankunftshalle warte ich nervös und kaufe frische Brezeln sowie Blumen.",
        es: "Delante de la sala de llegadas espero nervioso y compro pretzels frescos y flores."
      },
      {
        de: "Plötzlich öffnet sich die Tür und meine Frau und meine drei Kinder laufen mir entgegen.",
        es: "De repente se abre la puerta y mi esposa y mis tres hijos corren hacia mí."
      },
      {
        de: "Wir umarmen uns lange und alle freuen sich riesig über das lang ersehnte Wiedersehen.",
        es: "Nos abrazamos largamente y todos se alegran muchísimo por el tan esperado reencuentro."
      },
      {
        de: "Mit den fünf Koffern gehen wir später zusammen zum Bahnsteig und nehmen den Expresszug nach Hause.",
        es: "Con las cinco maletas vamos luego juntos al andén y tomamos el tren expreso a casa."
      },
      {
        de: "Am Abend kochen wir unser Lieblingsessen und feiern diesen neuen Anfang gemeinsam bis spät.",
        es: "Por la noche cocinamos nuestra comida favorita y celebramos este nuevo comienzo juntos hasta tarde."
      }
    ],
    wordGlossary: {
      schönste: { lemma: "schön (Superlativ)", translationEs: "el más bonito", pos: "Adj.", level: "A1", isVerb: false },
      jahres: { lemma: "das Jahr", translationEs: "del año (genitivo)", pos: "Nomen", level: "A1", isVerb: false },
      ganze: { lemma: "ganz", translationEs: "toda / entera", pos: "Adj.", level: "A1", isVerb: false },
      landet: { lemma: "landen", translationEs: "aterriza", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "landen" },
      früh: { lemma: "früh", translationEs: "temprano", pos: "Adv.", level: "A1", isVerb: false },
      flughafen: { lemma: "der Flughafen", translationEs: "el aeropuerto", pos: "Nomen", level: "A1", isVerb: false },
      nehme: { lemma: "mitnehmen", translationEs: "llevo (con 'mit')", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "mitnehmen" },
      fälle: { lemma: "der Fall", translationEs: "casos ('für alle Fälle' = por si acaso)", pos: "Nomen", level: "A2", isVerb: false },
      regenschirm: { lemma: "der Regenschirm", translationEs: "el paraguas", pos: "Nomen", level: "A1", isVerb: false },
      ankunftshalle: { lemma: "die Ankunftshalle", translationEs: "la sala de llegadas", pos: "Nomen", level: "A2", isVerb: false },
      kaufe: { lemma: "kaufen", translationEs: "compro", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "kaufen" },
      brezeln: { lemma: "die Brezel", translationEs: "los pretzels", pos: "Nomen", level: "A1", isVerb: false },
      blumen: { lemma: "die Blume", translationEs: "las flores", pos: "Nomen", level: "A1", isVerb: false },
      plötzlich: { lemma: "plötzlich", translationEs: "de repente", pos: "Adv.", level: "A1", isVerb: false },
      öffnet: { lemma: "öffnen", translationEs: "se abre", pos: "Verb", level: "A1", isVerb: false },
      tür: { lemma: "die Tür", translationEs: "la puerta", pos: "Nomen", level: "A1", isVerb: false },
      laufen: { lemma: "laufen", translationEs: "corren", pos: "Verb", level: "A1", isVerb: false },
      entgegen: { lemma: "entgegen", translationEs: "hacia / al encuentro de", pos: "Adv.", level: "A2", isVerb: false },
      umarmen: { lemma: "umarmen", translationEs: "abrazamos", pos: "Verb", level: "A2", isVerb: true, conjugationKey: "umarmen" },
      freuen: { lemma: "sich freuen", translationEs: "se alegran (con 'sich')", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "freuen" },
      riesig: { lemma: "riesig", translationEs: "enormemente / muchísimo", pos: "Adv.", level: "A2", isVerb: false },
      wiedersehen: { lemma: "das Wiedersehen", translationEs: "el reencuentro", pos: "Nomen", level: "A1", isVerb: false },
      koffern: { lemma: "der Koffer", translationEs: "maletas (dat. plural)", pos: "Nomen", level: "A1", isVerb: false },
      bahnsteig: { lemma: "der Bahnsteig", translationEs: "el andén", pos: "Nomen", level: "A1", isVerb: false },
      nehmen: { lemma: "nehmen", translationEs: "tomamos / cogemos", pos: "Verb", level: "A1", isVerb: false },
      expresszug: { lemma: "der Expresszug", translationEs: "el tren expreso", pos: "Nomen", level: "A2", isVerb: false },
      hause: { lemma: "zu Hause / nach Hause", translationEs: "a casa", pos: "Nomen", level: "A1", isVerb: false },
      kochen: { lemma: "kochen", translationEs: "cocinamos", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "kochen" },
      lieblingsessen: { lemma: "das Lieblingsessen", translationEs: "la comida favorita", pos: "Nomen", level: "A1", isVerb: false },
      feiern: { lemma: "feiern", translationEs: "celebramos", pos: "Verb", level: "A1", isVerb: true, conjugationKey: "feiern" },
      anfang: { lemma: "der Anfang", translationEs: "el comienzo", pos: "Nomen", level: "A1", isVerb: false }
    },
    verbConjugations: pickVerbs("landen", "mitnehmen", "kaufen", "umarmen", "freuen", "kochen", "feiern", "abholen"),
    examQuestions: [
      {
        type: "comprehension",
        prompt: "Was kauft der Vater vor der Ankunftshalle?",
        options: [
          "Frische Brezeln und Blumen.",
          "Einen neuen Werkzeugkoffer.",
          "Ein Monatsticket für den Bus."
        ],
        correctIndex: 0,
        explanationEs: "El texto cuenta: 'Vor der Ankunftshalle warte ich nervös und kaufe frische Brezeln sowie Blumen'."
      },
      {
        type: "comprehension",
        prompt: "Wie fährt die Familie vom Flughafen nach Hause?",
        options: [
          "Mit dem Expresszug vom Bahnsteig.",
          "Mit fünf Fahrrädern.",
          "Mit dem Lieferwagen von Enpal."
        ],
        correctIndex: 0,
        explanationEs: "La lectura dice: 'gehen wir später zusammen zum Bahnsteig und nehmen den Expresszug nach Hause'."
      },
      {
        type: "cloze",
        prompt: "Alle ___ sich riesig über das lang ersehnte Wiedersehen.",
        options: ["freue", "freust", "freuen"],
        correctIndex: 2,
        explanationEs: "'alle' es plural (como 'sie' ellos/ellas), por tanto el verbo reflexivo 'sich freuen' lleva terminación '-en': 'alle freuen sich'."
      },
      {
        type: "cloze",
        prompt: "Ich fahre früh ___ Flughafen und warte vor der Tür.",
        options: ["zum", "ins", "auf"],
        correctIndex: 0,
        explanationEs: "Para ir hacia un edificio, estación o aeropuerto masculino ('der Flughafen') usamos 'zu + dem = zum Flughafen'."
      }
    ],
    keyWords: [
      { de: "jemanden abholen", es: "ir a recoger a alguien", pos: "Verb", level: "A1", exampleDe: "Ich hole meine Frau vom Flughafen ab.", exampleEs: "Recojo a mi esposa del aeropuerto." },
      { de: "der Flughafen", es: "el aeropuerto", pos: "Nomen", level: "A1", exampleDe: "Das Flugzeug landet pünktlich am Flughafen.", exampleEs: "El avión aterriza puntual en el aeropuerto." },
      { de: "der Bahnsteig", es: "el andén (del tren)", pos: "Nomen", level: "A1", exampleDe: "Der Zug fährt auf Bahnsteig vier ab.", exampleEs: "El tren sale del andén cuatro." },
      { de: "sich freuen über (+ Akk.)", es: "alegrarse por (algo presente)", pos: "Verb", level: "A1", exampleDe: "Wir freuen uns sehr über das Wiedersehen.", exampleEs: "Nos alegramos mucho por el reencuentro." },
      { de: "feiern", es: "celebrar / festejar", pos: "Verb", level: "A1", exampleDe: "Heute Abend feiern wir als Familie zusammen.", exampleEs: "Esta noche celebramos juntos en familia." },
      { de: "die Ankunftshalle", es: "sala de llegadas", pos: "Nomen", level: "A2", exampleDe: "Wir treffen uns in der Ankunftshalle.", exampleEs: "Nos encontramos en la sala de llegadas." },
      { de: "der Koffer", es: "la maleta", pos: "Nomen", level: "A1", exampleDe: "Alle fünf Koffer stehen im Zug.", exampleEs: "Las cinco maletas están en el tren." },
      { de: "nach Hause", es: "a casa (con dirección)", pos: "Ausdruck", level: "A1", exampleDe: "Endlich fahren wir alle zusammen nach Hause.", exampleEs: "Por fin vamos todos juntos a casa." }
    ],
    grammarCards: [
      {
        title: "Reflexive Verben: 'sich freuen über' vs. 'sich freuen auf'",
        exampleDe: "Alle freuen sich riesig über das lang ersehnte Wiedersehen.",
        highlightedPart: "freuen sich ... über das Wiedersehen",
        exampleEs: "Todos se alegran muchísimo por el tan esperado reencuentro.",
        descriptionEs: "'sich freuen über' se usa cuando la alegría ocurre ahora o por algo ya sucedido (el reencuentro presente). 'sich freuen auf' es esperar con ilusión algo futuro.",
        table: {
          headers: ["Pronombre", "Verbo + Reflexivo", "Preposición + Contexto"],
          rows: [
            ["ich", "freue mich", "über das Geschenk (presente/pasado)"],
            ["wir", "freuen uns", "auf den Urlaub (futuro)"],
            ["alle", "freuen sich", "über das Wiedersehen (ahora)"]
          ]
        },
        extraExamples: [
          { de: "Wir freuen uns schon sehr auf den Sommer!", es: "¡Ya tenemos muchas ganas de que llegue el verano!" }
        ]
      },
      {
        title: "Richtungsangabe: 'zum Flughafen' vs. 'nach Hause'",
        exampleDe: "Ich fahre früh zum Flughafen ... Wir fahren nach Hause.",
        highlightedPart: "zum Flughafen / nach Hause",
        exampleEs: "Conduzco temprano al aeropuerto ... Vamos a casa.",
        descriptionEs: "Con lugares masculinos o neutros con artículo definido usamos 'zu + dem = zum'. Con la palabra fija 'casa' en movimiento es siempre 'nach Hause' (y quieto en casa: 'zu Hause').",
        table: {
          headers: ["Destino", "Estructura", "Ejemplo"],
          rows: [
            ["der Flughafen", "zum (zu dem) Flughafen", "Ich fahre zum Flughafen."],
            ["der Bahnsteig", "zum (zu dem) Bahnsteig", "Wir gehen zum Bahnsteig."],
            ["casa (en camino)", "nach Hause", "Wir nehmen den Zug nach Hause."]
          ]
        },
        extraExamples: [
          { de: "Endlich sind alle Kinder zu Hause!", es: "¡Por fin están todos los niños en casa!" }
        ]
      }
    ]
  }
];

// Índice global combinado de palabras de las 12 historias para cobertura total del lector
const GLOBAL_STORY_WORD_INDEX = (() => {
  const index = {};
  for (const story of immersiveStoriesCatalog) {
    if (story?.wordGlossary) {
      for (const [k, v] of Object.entries(story.wordGlossary)) {
        const cleanK = String(k).toLowerCase();
        if (!index[cleanK]) index[cleanK] = v;
      }
    }
  }
  return index;
})();

export function normalizeWordToken(rawWord) {
  if (!rawWord || typeof rawWord !== "string") return "";
  return rawWord
    .trim()
    .replace(/^[.,!?:;()[\]{}'"“”«»„\-–—+/\\]+/, "")
    .replace(/[.,!?:;()[\]{}'"“”«»„\-–—+/\\]+$/, "")
    .toLowerCase();
}

/**
 * Resuelve cualquier palabra pulsada en el lector Readle:
 * busca primero en `story.wordGlossary`, luego en `GLOBAL_STORY_WORD_INDEX`
 * y finalmente en `BASE_FUNCTIONAL_GLOSSARY`.
 */
export function lookupWordInStory(rawToken, story) {
  const cleanWord = normalizeWordToken(rawToken);
  const surface = (rawToken || "").trim();
  if (!cleanWord) return null;

  const storyEntry =
    story?.wordGlossary?.[cleanWord] ||
    story?.wordGlossaryEntries?.find((e) => String(e.wordKey || "").toLowerCase() === cleanWord);

  const entry = storyEntry || GLOBAL_STORY_WORD_INDEX[cleanWord] || BASE_FUNCTIONAL_GLOSSARY[cleanWord] || null;

  if (entry) {
    const conjKey = entry.conjugationKey || null;
    const conjugation = conjKey
      ? story?.verbConjugations?.[conjKey] || SHARED_VERBS[conjKey] || null
      : null;

    return {
      surface,
      cleanWord,
      lemma: entry.lemma || surface,
      translationEs: entry.translationEs || "Ver traducción de oración (文A)",
      pos: entry.pos || "Wort",
      level: entry.level || story?.level || "A1",
      isVerb: Boolean(entry.isVerb || conjugation),
      conjugationKey: conjKey,
      conjugation
    };
  }

  // Fallback limpio si la palabra es compuesta o generada dinámicamente por la IA
  const isCapitalized = /^[A-ZÄÖÜ]/.test(surface.replace(/^["'«„(]+/, ""));
  return {
    surface,
    cleanWord,
    lemma: surface.replace(/[.,!?:;]+$/, ""),
    translationEs: "Consulta la traducción interlineal (文A)",
    pos: isCapitalized ? "Nomen" : "Wort",
    level: story?.level || "A1",
    isVerb: false,
    conjugationKey: null,
    conjugation: null
  };
}
