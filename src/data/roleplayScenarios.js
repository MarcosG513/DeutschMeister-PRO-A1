export const ROLEPLAY_AXES = [
  { id: 'all', label: 'Todos los escenarios', emoji: '🎭' },
  { id: 'survival', label: 'Trámites y Supervivencia', emoji: '🏛️' },
  { id: 'work', label: 'Alemán Técnico y Laboral', emoji: '⚡' },
  { id: 'general', label: 'Vida Cotidiana', emoji: '☕' },
];

export const roleplayScenariosCatalog = [
  // =========================================================================
  // EJE A: SUPERVIVENCIA Y TRÁMITES EN ALEMANIA (A1–A2)
  // =========================================================================
  {
    id: 'anmeldung_buergeramt',
    axis: 'survival',
    level: 'A1',
    icon: '🏛️',
    badge: 'Eje A • Trámite Clave',
    title: 'Anmeldung im Bürgeramt',
    desc: 'Empadrónate, entrega tu certificado del casero y pide la Meldebestätigung.',
    aiPersona: 'Sachbearbeiterin en el Bürgeramt de Berlín',
    openingLine: 'Guten Tag! Nächste Nummer bitte. Haben Sie einen Termin für Ihre Anmeldung?',
    blurtHint: 'Termin, Reisepass, Wohnungsgeberbestätigung, Meldebestätigung',
    missions: [
      { id: 'm1', titleEs: 'Confirmar cita y saludar con Sie' },
      { id: 'm2', titleEs: 'Entregar Reisepass y Wohnungsgeberbestätigung' },
      { id: 'm3', titleEs: 'Recoger Meldebestätigung y preguntar por Steuer-ID' },
    ],
    starterSuggestions: [
      { de: 'Guten Tag! Ich habe um zehn Uhr einen Termin für die Anmeldung.', es: '¡Buenos días! Tengo cita a las 10 para el empadronamiento.', grammarTag: 'Akk' },
      { de: 'Hier sind mein Reisepass und die Wohnungsgeberbestätigung.', es: 'Aquí están mi pasaporte y el certificado del propietario.', grammarTag: 'Sie' },
      { de: 'Vielen Dank für die Meldebestätigung! Kommt meine Steuer-ID per Post?', es: '¡Muchas gracias por el certificado! ¿Llega mi ID fiscal por correo?', grammarTag: 'V2' },
    ],
    targetVocabulary: [
      { termDe: 'die Anmeldung', translationEs: 'el empadronamiento', exampleDe: 'Ich brauche einen Termin für die Anmeldung.' },
      { termDe: 'die Wohnungsgeberbestätigung', translationEs: 'certificado del propietario', exampleDe: 'Der Vermieter unterschreibt die Wohnungsgeberbestätigung.' },
      { termDe: 'die Meldebestätigung', translationEs: 'certificado de residencia', exampleDe: 'Hier ist meine neue Meldebestätigung.' },
    ],
    prompt:
      'Eres una funcionaria amable pero formal en el Bürgeramt en Berlín. El usuario viene a hacer la Anmeldung (nivel A1-A2). Empieza diciendo exactamente: "Guten Tag! Nächste Nummer bitte. Haben Sie einen Termin für Ihre Anmeldung?". Pide el Reisepass y la Wohnungsgeberbestätigung, confirma el domicilio y entrega la Meldebestätigung. Responde SOLO en alemán corto y claro.',
  },
  {
    id: 'wohnungssuche_besichtigung',
    axis: 'survival',
    level: 'A2',
    icon: '🏠',
    badge: 'Eje A • Vivienda A1–A2',
    title: 'Wohnungsbesichtigung & Mietvertrag',
    desc: 'Pregunta por Warmmiete, Kaution, calefacción y certificado para empadronarte.',
    aiPersona: 'Propietario/Arrendador (Vermieter) en Hamburgo',
    openingLine: 'Herzlich willkommen zur Besichtigung! Welche Fragen haben Sie zur Wohnung?',
    blurtHint: 'Warmmiete, Kaution, Nebenkosten, einziehen, Wohnungsgeberbestätigung',
    missions: [
      { id: 'm1', titleEs: 'Preguntar precio total con gastos (Warmmiete / Nebenkosten)' },
      { id: 'm2', titleEs: 'Consultar importe de fianza (Kaution) y fecha de entrada' },
      { id: 'm3', titleEs: 'Confirmar firma de Wohnungsgeberbestätigung para Anmeldung' },
    ],
    starterSuggestions: [
      { de: 'Guten Tag! Wie hoch sind die Warmmiete und die Nebenkosten?', es: '¡Buenos días! ¿Cuánto son el alquiler con gastos y los suministros?', grammarTag: 'W-Frage' },
      { de: 'Wie viel Kaution muss ich zahlen und ab wann kann ich einziehen?', es: '¿Cuánta fianza debo pagar y desde cuándo puedo mudarme?', grammarTag: 'Modal' },
      { de: 'Bekomme ich nach dem Mietvertrag die Wohnungsgeberbestätigung?', es: '¿Recibiré tras el contrato el certificado del casero?', grammarTag: 'V2' },
    ],
    targetVocabulary: [
      { termDe: 'die Warmmiete', translationEs: 'alquiler con gastos incluidos', exampleDe: 'Die Warmmiete beträgt neunhundert Euro.' },
      { termDe: 'die Kaution', translationEs: 'la fianza de alquiler', exampleDe: 'Die Kaution ist zwei Monatsmieten.' },
      { termDe: 'der Mietvertrag', translationEs: 'el contrato de alquiler', exampleDe: 'Wir unterschreiben morgen den Mietvertrag.' },
    ],
    prompt:
      'Eres un propietario (Vermieter) en Hamburgo enseñando un piso luminoso de 2 habitaciones. Empieza diciendo exactamente: "Herzlich willkommen zur Besichtigung! Welche Fragen haben Sie zur Wohnung?". Da datos concretos A1-A2 (Warmmiete 920 Euro, Kaution 1800 Euro, Einzug ab 1. Mai, Wohnungsgeberbestätigung incluida). Responde SOLO en alemán corto.',
  },
  {
    id: 'doctor',
    axis: 'survival',
    level: 'A1',
    icon: '🩺',
    badge: 'Eje A • Salud A1',
    title: 'Beim Hausarzt & Krankschreibung',
    desc: 'Explica síntomas desde ayer, entrega tu Versichertenkarte y pide la baja.',
    aiPersona: 'Médico de cabecera (Hausarzt) en Alemania',
    openingLine: 'Guten Tag! Haben Sie Ihre Versichertenkarte dabei und was fehlt Ihnen?',
    blurtHint: 'Versichertenkarte, Kopf, Schmerzen, Fieber, Krankschreibung',
    missions: [
      { id: 'm1', titleEs: 'Describir al menos 1 síntoma (Fieber / Schmerzen)' },
      { id: 'm2', titleEs: 'Indicar desde cuándo (seit gestern + Dativ)' },
      { id: 'm3', titleEs: 'Pedir receta o baja médica (Rezept / Krankschreibung)' },
    ],
    starterSuggestions: [
      { de: 'Guten Tag! Ich habe seit gestern Fieber und Kopfschmerzen.', es: '¡Buenos días! Tengo fiebre y dolor de cabeza desde ayer.', grammarTag: 'Dativ' },
      { de: 'Hier ist meine Versichertenkarte. Brauche ich ein Rezept?', es: 'Aquí está mi tarjeta sanitaria. ¿Necesito una receta?', grammarTag: 'Sie' },
      { de: 'Können Sie mir bitte eine Krankschreibung für die Arbeit geben?', es: '¿Puede darme por favor una baja médica para el trabajo?', grammarTag: 'Modal' },
    ],
    targetVocabulary: [
      { termDe: 'die Versichertenkarte', translationEs: 'tarjeta del seguro médico', exampleDe: 'Bitte zeigen Sie Ihre Versichertenkarte.' },
      { termDe: 'die Krankschreibung', translationEs: 'la baja médica laboral', exampleDe: 'Ich brauche eine Krankschreibung für zwei Tage.' },
      { termDe: 'seit gestern', translationEs: 'desde ayer', exampleDe: 'Ich habe seit gestern Halsschmerzen.' },
    ],
    prompt:
      'Eres un médico de cabecera en Alemania. El usuario es tu paciente nivel A1. Empieza diciendo: "Guten Tag! Haben Sie Ihre Versichertenkarte dabei und was fehlt Ihnen?". Pregunta síntomas, tiempo y ofrece Rezept o Krankschreibung. Responde SOLO en alemán corto nivel A1.',
  },
  {
    id: 'station',
    axis: 'survival',
    level: 'A1',
    icon: '🚆',
    badge: 'Eje A • Transporte DB',
    title: 'Estación de Tren (Deutsche Bahn)',
    desc: 'Compra un billete, pregunta por transbordo (umsteigen) y confirma el andén.',
    aiPersona: 'Agente en el Reisezentrum de Deutsche Bahn',
    openingLine: 'Guten Tag! Wohin möchten Sie heute fahren?',
    blurtHint: 'Zug, Fahrkarte, Gleis, umsteigen, hin und zurück',
    missions: [
      { id: 'm1', titleEs: 'Indicar destino con nach + ciudad' },
      { id: 'm2', titleEs: 'Preguntar hora de salida o si hay transbordo' },
      { id: 'm3', titleEs: 'Confirmar de qué andén (Gleis) sale el tren' },
    ],
    starterSuggestions: [
      { de: 'Guten Tag, ich möchte eine Fahrkarte nach Frankfurt.', es: 'Buenos días, quiero un billete a Fráncfort.', grammarTag: 'Akk' },
      { de: 'Wann fährt der nächste Zug ab und muss ich umsteigen?', es: '¿Cuándo sale el próximo tren y tengo que cambiar de tren?', grammarTag: 'Trennb.' },
      { de: 'Von welchem Gleis fährt der Regionalexpress ab?', es: '¿De qué andén sale el tren regional?', grammarTag: 'Dativ' },
    ],
    targetVocabulary: [
      { termDe: 'das Gleis', translationEs: 'el andén / vía de tren', exampleDe: 'Der Zug steht auf Gleis sieben.' },
      { termDe: 'umsteigen', translationEs: 'hacer transbordo', exampleDe: 'Sie müssen in Hannover umsteigen.' },
    ],
    prompt:
      'Eres un vendedor de billetes en la estación de tren de Berlín. El usuario es un viajero nivel A1. Empieza diciendo exactamente: "Guten Tag! Wohin möchten Sie heute fahren?". Usa oraciones cortas A1 con horarios y números de andén (Gleis). Responde SOLO en alemán.',
  },
  {
    id: 'hotel',
    axis: 'survival',
    level: 'A1',
    icon: '🏨',
    badge: 'Eje A • Alojamiento',
    title: 'Recepción de Hotel',
    desc: 'Haz el check-in tras un desplazamiento laboral y pregunta horarios y Wi-Fi.',
    aiPersona: 'Recepcionista de hotel de negocios en Múnich',
    openingLine: 'Herzlich willkommen! Haben Sie eine Reservierung auf Ihren Namen?',
    blurtHint: 'Zimmer, Schlüsselkarte, Frühstück, WLAN, Rechnung',
    missions: [
      { id: 'm1', titleEs: 'Confirmar reserva con nombre o empresa' },
      { id: 'm2', titleEs: 'Preguntar hora del desayuno o clave Wi-Fi' },
      { id: 'm3', titleEs: 'Pedir factura para la empresa o llave y agradecer' },
    ],
    starterSuggestions: [
      { de: 'Guten Abend! Ich habe ein Einzelzimmer für zwei Nächte reserviert.', es: '¡Buenas noches! Tengo reservada una habitación individual para dos noches.', grammarTag: 'Perfekt' },
      { de: 'Wann gibt es Frühstück und wie ist das WLAN-Passwort?', es: '¿Cuándo es el desayuno y cuál es la contraseña del Wi-Fi?', grammarTag: 'W-Frage' },
      { de: 'Kann ich beim Check-out eine Rechnung für die Firma bekommen?', es: '¿Puedo recibir al salir una factura para la empresa?', grammarTag: 'Modal' },
    ],
    targetVocabulary: [
      { termDe: 'die Rechnung', translationEs: 'la factura', exampleDe: 'Ich brauche eine Rechnung auf meine Firma.' },
      { termDe: 'das Einzelzimmer', translationEs: 'la habitación individual', exampleDe: 'Ich habe ein ruhiges Einzelzimmer reserviert.' },
    ],
    prompt:
      'Eres el recepcionista de un hotel en Múnich. El usuario tiene una reserva laboral. Empieza diciendo: "Herzlich willkommen! Haben Sie eine Reservierung auf Ihren Namen?". Responde SOLO en alemán nivel A1.',
  },
  {
    id: 'police_roadside',
    axis: 'survival',
    level: 'A1',
    icon: '🚔',
    badge: 'Cap. 13 & 21 • StVO',
    title: 'Polizeikontrolle & Pannenhilfe',
    desc: 'Control policial en carretera o avería del vehículo de servicio.',
    aiPersona: 'Agente de policía de tráfico (Verkehrspolizei)',
    openingLine: 'Guten Tag! Allgemeine Verkehrskontrolle. Führerschein und Fahrzeugschein, bitte.',
    blurtHint: 'Führerschein, Fahrzeugschein, Warndreieck, Warnweste, Verbandkasten',
    missions: [
      { id: 'm1', titleEs: 'Entregar carnet y permiso (Führerschein / Fahrzeugschein)' },
      { id: 'm2', titleEs: 'Confirmar chaleco, botiquín y triángulo en el maletero' },
      { id: 'm3', titleEs: 'Explicar destino o avería cortésmente' },
    ],
    starterSuggestions: [
      { de: 'Guten Tag! Hier sind mein Führerschein und der Fahrzeugschein.', es: '¡Buenos días! Aquí están mi carnet y el permiso del coche.', grammarTag: 'Sie' },
      { de: 'Die Warnweste, der Verbandkasten und das Warndreieck sind im Kofferraum.', es: 'El chaleco, el botiquín y el triángulo están en el maletero.', grammarTag: 'Dativ' },
      { de: 'Ich bin beruflich unterwegs und fahre zu einem Kunden.', es: 'Estoy viajando por trabajo y voy a ver a un cliente.', grammarTag: 'V2' },
    ],
    targetVocabulary: [
      { termDe: 'der Fahrzeugschein', translationEs: 'permiso de circulación del vehículo', exampleDe: 'Der Fahrzeugschein liegt im Handschuhfach.' },
      { termDe: 'die Warnweste', translationEs: 'chaleco reflectante', exampleDe: 'Bei einer Panne trage ich immer die Warnweste.' },
    ],
    prompt:
      'Eres un agente de policía amable en un control de tráfico en Alemania. Empieza diciendo: "Guten Tag! Allgemeine Verkehrskontrolle. Führerschein und Fahrzeugschein, bitte.". Pide documentos y equipo obligatorio (Warnweste, Warndreieck). Responde SOLO en alemán A1.',
  },

  // =========================================================================
  // EJE B: ALEMÁN TÉCNICO Y LABORAL (ENPAL INDOOR / LAGER / VDE / SCHICHT)
  // =========================================================================
  {
    id: 'arbeitssicherheit_vde',
    axis: 'work',
    level: 'A1-A2',
    icon: '🦺',
    badge: 'Eje B • VDE & PSA Indoor',
    title: 'Arbeitssicherheit & 5 VDE-Regeln',
    desc: 'Checklist de seguridad en cuarto técnico antes de abrir el Zählerschrank.',
    aiPersona: 'Maestro electricista / Bauleiter en cuarto técnico (Keller)',
    openingLine: 'Guten Morgen im Technikraum! Trägst du deine PSA komplett und wie sichern wir jetzt den Zählerschrank ab?',
    blurtHint: 'PSA, Schutzbrille, Sicherheitsschuhe, freischalten, Duspol',
    missions: [
      { id: 'm1', titleEs: 'Confirmar tu EPI interior (Schutzbrille, Sicherheitsschuhe, Handschuhe)' },
      { id: 'm2', titleEs: 'Enunciar regla 1 y 2 (freischalten / gegen Wiedereinschalten sichern)' },
      { id: 'm3', titleEs: 'Confirmar medición a cero voltios con el Duspol bipolar' },
    ],
    starterSuggestions: [
      { de: 'Ja, ich trage meine Sicherheitsschuhe, die Schutzbrille und isolierte Handschuhe.', es: 'Sí, llevo zapatos de seguridad, gafas de protección y guantes aislantes.', grammarTag: 'PSA' },
      { de: 'Zuerst schalten wir den Hauptschalter frei und sichern ihn gegen Wiedereinschalten.', es: 'Primero desconectamos el interruptor principal y lo bloqueamos contra reconexión.', grammarTag: 'VDE' },
      { de: 'Ich messe alle Phasen mit dem zweipoligen Duspol: null Volt, spannungsfrei.', es: 'Mido todas las fases con el Duspol bipolar: cero voltios, sin tensión.', grammarTag: 'mit+Dat' },
    ],
    targetVocabulary: [
      { termDe: 'die Spannungsfreiheit', translationEs: 'la ausencia de tensión eléctrica', exampleDe: 'Wir stellen immer zuerst die Spannungsfreiheit fest.' },
      { termDe: 'gegen Wiedereinschalten sichern', translationEs: 'asegurar contra reconexión', exampleDe: 'Nach dem Freischalten müssen wir den Schalter gegen Wiedereinschalten sichern.' },
      { termDe: 'die Schutzbrille', translationEs: 'las gafas protectoras', exampleDe: 'Am Zählerschrank ist die Schutzbrille Pflicht.' },
    ],
    prompt:
      'Eres el jefe técnico (Meister / Bauleiter) revisando las 5 normas de seguridad eléctrica VDE dentro de un sótano/cuarto técnico antes de abrir el Zählerschrank. NUNCA menciones tejados ni Dachmontage; todo es trabajo eléctrico interior en Technikraum/Keller. Empieza diciendo exactamente: "Guten Morgen im Technikraum! Trägst du deine PSA komplett und wie sichern wir jetzt den Zählerschrank ab?". Responde SOLO en alemán técnico A1-A2.',
  },
  {
    id: 'lager_werkstatt',
    axis: 'work',
    level: 'A1-A2',
    icon: '🧰',
    badge: 'Eje B • Lager / Werkstatt',
    title: 'Lager & Werkzeugausgabe',
    desc: 'Recoge material eléctrico faltante, pide herramienta calibrada y firma el vale.',
    aiPersona: 'Encargado de almacén (Lagerleiter) en el depósito de taller',
    openingLine: 'Hallo! Bereit für die Tour? Welche Werkzeuge oder Bauteile fehlen dir noch auf dem Materialschein?',
    blurtHint: 'Werkzeugkoffer, Drehmomentschlüssel, Kabelbinder, Sicherungsautomat, Materialschein',
    missions: [
      { id: 'm1', titleEs: 'Pedir herramientas o consumibles concretos (Kabelbinder / Sicherungsautomat)' },
      { id: 'm2', titleEs: 'Confirmar calibre/amperaje o estado del Duspol/Drehmomentschlüssel' },
      { id: 'm3', titleEs: 'Solicitar o firmar el Materialschein antes de salir' },
    ],
    starterSuggestions: [
      { de: 'Guten Morgen! Mir fehlen noch zehn Kabelbinder und zwei Sicherungsautomaten 16 Ampere.', es: '¡Buenos días! Todavía me faltan diez bridas y dos magnetotérmicos de 16 amperios.', grammarTag: 'Dativ' },
      { de: 'Kann ich bitte auch einen neuen Drehmomentschlüssel für die Klemmen bekommen?', es: '¿Puedo recibir también una llave dinamométrica nueva para los bornes?', grammarTag: 'Modal' },
      { de: 'Super, ich unterschreibe kurz den Materialschein und lade alles ins Auto.', es: 'Estupendo, firmo brevemente el vale de material y cargo todo en el coche.', grammarTag: 'V2' },
    ],
    targetVocabulary: [
      { termDe: 'der Sicherungsautomat', translationEs: 'interruptor magnetotérmico', exampleDe: 'Ich brauche einen Sicherungsautomat sechzehn Ampere.' },
      { termDe: 'der Drehmomentschlüssel', translationEs: 'llave dinamométrica', exampleDe: 'Die Klemmen im Speicher ziehen wir mit dem Drehmomentschlüssel an.' },
      { termDe: 'der Materialschein', translationEs: 'vale de salida de material', exampleDe: 'Ohne Materialschein darf man keine Teile mitnehmen.' },
    ],
    prompt:
      'Eres el jefe de almacén (Lagerleiter) en el taller central de instalaciones eléctricas interiores. El usuario es un montador nivel A1-A2 cargando su furgoneta (Servicewagen). Empieza diciendo: "Hallo! Bereit für die Tour? Welche Werkzeuge oder Bauteile fehlen dir noch auf dem Materialschein?". Responde SOLO en alemán corto A1-A2.',
  },
  {
    id: 'schichtbericht_technik',
    axis: 'work',
    level: 'A2',
    icon: '📋',
    badge: 'Eje B • Schichtübergabe',
    title: 'Schichtbericht & Kundenübergabe',
    desc: 'Reporta el fin de obra interior (Wechselrichter, Speicher, Smart Meter, Wallbox) y cierre.',
    aiPersona: 'Coordinador de operaciones (Disponent / Projektleiter) al cierre de turno',
    openingLine: 'Hallo! Es ist kurz vor Feierabend. Wie ist die Installation im Technikraum gelaufen? Sind Wechselrichter, Speicher und Smart Meter online?',
    blurtHint: 'Wechselrichter, Batteriespeicher, Smart Meter, Wallbox, Abnahmeprotokoll, Prüfprotokoll',
    missions: [
      { id: 'm1', titleEs: 'Informar montaje completo de Wechselrichter, Speicher y Smart Meter' },
      { id: 'm2', titleEs: 'Confirmar prueba de funcionamiento y fotos o medición PE' },
      { id: 'm3', titleEs: 'Confirmar firma del Abnahmeprotokoll y envío del Schichtbericht' },
    ],
    starterSuggestions: [
      { de: 'Hallo! Wechselrichter, Batteriespeicher und Smart Meter hängen sauber im Keller und sind online.', es: '¡Hola! Inversor, batería y Smart Meter están instalados ordenados en el sótano y online.', grammarTag: 'V2' },
      { de: 'Wir haben den Schutzleiter geprüft und die Wallbox in der Garage erfolgreich getestet.', es: 'Hemos comprobado la toma de tierra y probado con éxito la Wallbox en el garaje.', grammarTag: 'Perfekt' },
      { de: 'Der Kunde hat das Abnahmeprotokoll unterschrieben. Ich schicke jetzt den Schichtbericht.', es: 'El cliente ha firmado el acta de entrega. Envío ahora el parte de turno.', grammarTag: 'Cierre' },
    ],
    targetVocabulary: [
      { termDe: 'der Wechselrichter', translationEs: 'el inversor de potencia', exampleDe: 'Der Wechselrichter im Technikraum läuft ohne Fehler.' },
      { termDe: 'das Abnahmeprotokoll', translationEs: 'acta de conformidad / entrega', exampleDe: 'Das Abnahmeprotokoll ist vollständig unterschrieben.' },
      { termDe: 'der Schichtbericht', translationEs: 'informe / parte de turno', exampleDe: 'Jeden Abend sende ich den kurzen Schichtbericht ans Büro.' },
    ],
    prompt:
      'Eres el coordinador de proyecto (Projektleiter) recibiendo el parte de fin de turno de un técnico electricista de instalaciones interiores (Wechselrichter, Batteriespeicher, Smart Meter en el Zählerschrank, Wallbox en garaje — NUNCA tejado). Empieza diciendo exactamente: "Hallo! Es ist kurz vor Feierabend. Wie ist die Installation im Technikraum gelaufen? Sind Wechselrichter, Speicher und Smart Meter online?". Pregunta por el acta de entrega y posibles faltas de material. Responde SOLO en alemán corto A1-A2.',
  },
  {
    id: 'solar_construction',
    axis: 'work',
    level: 'A1',
    icon: '⚡',
    badge: 'Cap. 18 & 20 • Enpal Indoor',
    title: 'Technikraum: Wechselrichter & Speicher',
    desc: 'Montaje eléctrico interior en sótano (Zählerschrank, Stromkreis, Wechselrichter).',
    aiPersona: 'Bauleiter en sala técnica (Keller / Technikraum)',
    openingLine: 'Guten Morgen! Hast du deinen Helm und die Schutzbrille dabei? Ist der Stromkreis im Zählerschrank sicher freigeschaltet?',
    blurtHint: 'Keller, Technikraum, Zählerschrank, Stromkreis, Wechselrichter, Duspol',
    missions: [
      { id: 'm1', titleEs: 'Confirmar EPP (Schutzbrille, Sicherheitsschuhe, Handschuhe)' },
      { id: 'm2', titleEs: 'Confirmar circuito sin tensión (freischalten / Duspol)' },
      { id: 'm3', titleEs: 'Reportar avance de montaje del Wechselrichter / Speicher' },
    ],
    starterSuggestions: [
      { de: 'Ja, ich trage die Schutzbrille, Sicherheitsschuhe und isolierte Handschuhe.', es: 'Sí, llevo gafas protectoras, zapatos de seguridad y guantes aislantes.', grammarTag: 'Akk' },
      { de: 'Der Stromkreis ist freigeschaltet und mit dem Duspol geprüft.', es: 'El circuito está desconectado y verificado con el Duspol.', grammarTag: 'VDE' },
      { de: 'Wir montieren jetzt den Wechselrichter und den Speicher im Technikraum.', es: 'Ahora montamos el inversor y la batería en el cuarto técnico.', grammarTag: 'V2' },
    ],
    targetVocabulary: [
      { termDe: 'der Zählerschrank', translationEs: 'armario de contadores', exampleDe: 'Das Smart Meter sitzt direkt im Zählerschrank.' },
      { termDe: 'der Batteriespeicher', translationEs: 'batería de almacenamiento', exampleDe: 'Der Batteriespeicher steht trocken im Keller.' },
    ],
    prompt:
      'Eres el jefe de obra (Bauleiter) en una instalación eléctrica interior Enpal en Alemania (exclusivamente interiores: Keller/Technikraum/Zählerschrank, nunca en tejado). El usuario es técnico nivel A1. Empieza saludando y revisando la seguridad eléctrica: "Guten Morgen! Hast du deinen Helm und die Schutzbrille dabei? Ist der Stromkreis im Zählerschrank sicher freigeschaltet?" Usa oraciones cortas A1. Responde SOLO en alemán.',
  },
  {
    id: 'it_helpdesk',
    axis: 'work',
    level: 'A1',
    icon: '💻',
    badge: 'Cap. 17 • IT & Büro',
    title: 'IT-Helpdesk im Büro',
    desc: 'Soporte técnico de oficina o tablet de obra (Passwort, WLAN, App, Drucker).',
    aiPersona: 'Técnico de soporte IT-Helpdesk',
    openingLine: 'Hallo, IT-Helpdesk! Was funktioniert nicht? Das WLAN, die App oder dein Passwort?',
    blurtHint: 'Passwort, WLAN, Tablet, Bildschirm, Drucker',
    missions: [
      { id: 'm1', titleEs: 'Explicar el problema técnico (WLAN / App / Passwort)' },
      { id: 'm2', titleEs: 'Seguir una instrucción del técnico' },
      { id: 'm3', titleEs: 'Confirmar que funciona y agradecer' },
    ],
    starterSuggestions: [
      { de: 'Hallo! Mein Tablet hat keine Verbindung zum WLAN.', es: '¡Hola! Mi tablet no tiene conexión al Wi-Fi.', grammarTag: 'Akk' },
      { de: 'Ich habe mein Passwort vergessen und kann mich nicht anmelden.', es: 'He olvidado mi contraseña y no puedo iniciar sesión.', grammarTag: 'Perfekt' },
      { de: 'Jetzt funktioniert das System wieder. Vielen Dank!', es: 'Ahora el sistema vuelve a funcionar. ¡Muchas gracias!', grammarTag: 'V2' },
    ],
    targetVocabulary: [
      { termDe: 'die Verbindung', translationEs: 'la conexión (red)', exampleDe: 'Wir haben hier keine Verbindung zum Server.' },
      { termDe: 'das Passwort', translationEs: 'la contraseña', exampleDe: 'Ich muss mein Passwort zurücksetzen.' },
    ],
    prompt:
      'Eres un técnico de soporte (IT-Helpdesk) en Alemania. El usuario es un empleado de nivel A1 con un fallo técnico. Empieza diciendo exactamente: "Hallo, IT-Helpdesk! Was funktioniert nicht? Das WLAN, die App oder dein Passwort?". Responde SOLO en alemán corto A1.',
  },

  // =========================================================================
  // VIDA COTIDIANA (CLÁSICOS MEJORADOS)
  // =========================================================================
  {
    id: 'restaurant',
    axis: 'general',
    level: 'A1',
    icon: '🍽️',
    badge: 'Vida Diaria • A1',
    title: 'En el Restaurante',
    desc: 'Pide comida, bebida y solicita la cuenta por separado o junta.',
    aiPersona: 'Camarero (Kellner) en Múnich',
    openingLine: 'Guten Tag! Herzlich willkommen! Was möchten Sie gerne trinken?',
    blurtHint: 'Essen, Trinken, Speisekarte, Kellner, zahlen',
    missions: [
      { id: 'm1', titleEs: 'Saludar y pedir bebida' },
      { id: 'm2', titleEs: 'Pedir un plato usando ich möchte / hätte gern' },
      { id: 'm3', titleEs: 'Pedir la cuenta (zahlen) con tarjeta o efectivo' },
    ],
    starterSuggestions: [
      { de: 'Guten Tag! Ich möchte einen Kaffee und ein stilles Wasser, bitte.', es: '¡Buenos días! Quiero un café y un agua sin gas, por favor.', grammarTag: 'Akk' },
      { de: 'Haben Sie auch eine Speisekarte auf Deutsch?', es: '¿Tienen también carta en alemán?', grammarTag: 'Sie' },
      { de: 'Entschuldigung, ich möchte bitte mit Karte zahlen.', es: 'Disculpe, quisiera pagar con tarjeta, por favor.', grammarTag: 'V2' },
    ],
    targetVocabulary: [
      { termDe: 'die Speisekarte', translationEs: 'la carta / menú del restaurante', exampleDe: 'Können Sie mir bitte die Speisekarte bringen?' },
      { termDe: 'mit Karte zahlen', translationEs: 'pagar con tarjeta', exampleDe: 'Kann man hier mit Karte zahlen?' },
    ],
    prompt:
      'Eres un camarero amable en un restaurante en Múnich. Empieza diciendo: "Guten Tag! Herzlich willkommen! Was möchten Sie gerne trinken?". Usa oraciones cortas A1. Responde SOLO en alemán.',
  },
  {
    id: 'shopping',
    axis: 'general',
    level: 'A1',
    icon: '👕',
    badge: 'Vida Diaria • A1',
    title: 'Tienda de Ropa',
    desc: 'Busca una chaqueta de trabajo o calle, pregunta talla y precio.',
    aiPersona: 'Vendedor en una tienda en Viena',
    openingLine: 'Guten Tag! Kann ich Ihnen helfen? Suchen Sie etwas Bestimmtes?',
    blurtHint: 'Jacke, Größe, Farbe, anprobieren, kosten',
    missions: [
      { id: 'm1', titleEs: 'Pedir prenda con talla o color' },
      { id: 'm2', titleEs: 'Preguntar cuánto cuesta (Wie viel kostet…?)' },
      { id: 'm3', titleEs: 'Decidir compra o talla alternativa y despedirse' },
    ],
    starterSuggestions: [
      { de: 'Ich suche eine blaue Arbeitsjacke in Größe M.', es: 'Busco una chaqueta de trabajo azul en talla M.', grammarTag: 'Akk' },
      { de: 'Kann ich die Jacke bitte anprobieren? Wo ist die Umkleide?', es: '¿Puedo probarme la chaqueta? ¿Dónde está el probador?', grammarTag: 'Modal' },
      { de: 'Wie viel kostet diese Jacke? Ich nehme sie!', es: '¿Cuánto cuesta esta chaqueta? ¡Me la llevo!', grammarTag: 'W-Frage' },
    ],
    targetVocabulary: [
      { termDe: 'die Größe', translationEs: 'la talla / tamaño', exampleDe: 'Haben Sie diese Jacke in Größe L?' },
      { termDe: 'anprobieren', translationEs: 'probarse ropa', exampleDe: 'Darf ich die Schuhe kurz anprobieren?' },
    ],
    prompt:
      'Eres un vendedor en una tienda de ropa en Viena. El usuario busca una chaqueta. Empieza diciendo: "Guten Tag! Kann ich Ihnen helfen? Suchen Sie etwas Bestimmtes?". Responde SOLO en alemán corto A1.',
  },
  {
    id: 'party',
    axis: 'general',
    level: 'A1',
    icon: '👋',
    badge: 'Social • A1 (du)',
    title: 'Fiesta de Intercambio',
    desc: 'Preséntate usando du, habla de tu profesión y pregunta aficiones.',
    aiPersona: 'Compañero de intercambio (Max) en Múnich',
    openingLine: 'Hallo! Ich bin Max. Wie heißt du und woher kommst du?',
    blurtHint: 'Hallo, Name, kommen, wohnen, arbeiten',
    missions: [
      { id: 'm1', titleEs: 'Presentarte con nombre y país de origen' },
      { id: 'm2', titleEs: 'Hablar de dónde vives ahora o tu trabajo' },
      { id: 'm3', titleEs: 'Hacer una pregunta natural usando du' },
    ],
    starterSuggestions: [
      { de: 'Hallo Max! Ich heiße Marcos und komme aus Spanien.', es: '¡Hola Max! Me llamo Marcos y vengo de España.', grammarTag: 'du' },
      { de: 'Ich wohne jetzt in Deutschland und arbeite als Techniker.', es: 'Ahora vivo en Alemania y trabajo como técnico.', grammarTag: 'V2' },
      { de: 'Was machst du beruflich und was sind deine Hobbys?', es: '¿A qué te dedicas y cuáles son tus aficiones?', grammarTag: 'du' },
    ],
    targetVocabulary: [
      { termDe: 'arbeiten als', translationEs: 'trabajar como (sin artículo)', exampleDe: 'Ich arbeite als Elektriker in Deutschland.' },
      { termDe: 'die Freizeit', translationEs: 'el tiempo libre', exampleDe: 'In meiner Freizeit lerne ich Deutsch.' },
    ],
    prompt:
      'Eres Max, un amigo alemán amable en un evento de intercambio lingüístico en Múnich. Empieza diciendo: "Hallo! Ich bin Max. Wie heißt du und woher kommst du?". Tutea con "du". Responde SOLO en alemán corto A1.',
  },
];
