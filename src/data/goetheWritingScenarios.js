/**
 * goetheWritingScenarios.js — Escenarios puros (ESM) de Schreiben Teil 1
 * Mantiene íntegros los 4 formularios oficiales Goethe A1 + 2 escenarios Puente A2 / DTZ.
 */

export const FORM_SCENARIOS = [
  {
    id: 'schwimmkurs_becker',
    cefrLevel: 'A1',
    tabTitle: '1. Schwimmkurs',
    badge: 'Szenario 1',
    title: '🏊‍♂️ Anmeldung zum Schwimmkurs',
    subTitle: 'Familie Becker (TSV München)',
    situation:
      'Ihre Nachbarin, Frau Lubna Becker, möchte ihren 6-jährigen Sohn Felix für einen Kinderschwimmkurs beim TSV München anmelden. Das Kind ist am 14.05.2018 geboren. Die Familie Becker wohnt in der Goethestraße 12 in 80331 München. Frau Becker bezahlt die Kursgebühr von 55 Euro bar bei der Anmeldung.',
    formTitle: 'ANMELDEFORMULAR - TSV MÜNCHEN KINDERSCHWIMMEN',
    prefilled: [
      { label: 'Vorname des Kindes:', value: 'Felix' },
      { label: 'Alter des Kindes:', value: '6 Jahre' },
      { label: 'Wohnort:', value: 'München' },
    ],
    fields: [
      {
        id: 's1_f1',
        number: 1,
        label: 'Familienname des Kindes:',
        placeholder: 'z.B. Becker',
        acceptedAnswers: ['becker', 'familie becker'],
        canonicalAnswer: 'Becker',
        explanation: 'Frau Lubna Becker meldet ihr Kind an. Der gesuchte Familienname (Apellido) ist Becker.',
      },
      {
        id: 's1_f2',
        number: 2,
        label: 'Geburtsdatum des Kindes:',
        placeholder: 'z.B. 14.05.2018',
        acceptedAnswers: [
          '14.05.2018',
          '14. mai 2018',
          '14.05.18',
          '14.5.2018',
          '14/05/2018',
          '14-05-2018',
          '14 mai 2018',
          '14.mai 2018',
        ],
        canonicalAnswer: '14.05.2018 (oder: 14. Mai 2018)',
        explanation: 'Das Kind ist am 14.05.2018 geboren. En Alemania el formato estándar es DD.MM.AAAA.',
      },
      {
        id: 's1_f3',
        number: 3,
        label: 'Straße und Hausnummer:',
        placeholder: 'z.B. Goethestraße 12',
        acceptedAnswers: [
          'goethestraße 12',
          'goethestr. 12',
          'goethestrasse 12',
          'goethestr 12',
          'goethestraße12',
          'goethestr.12',
          'goethe str. 12',
          'goethe strasse 12',
        ],
        canonicalAnswer: 'Goethestraße 12',
        explanation: 'Die Adresse ist Goethestraße 12. Debe incluir el nombre de la calle y el número de casa.',
      },
      {
        id: 's1_f4',
        number: 4,
        label: 'Postleitzahl (PLZ):',
        placeholder: 'z.B. 80331',
        acceptedAnswers: ['80331', 'plz 80331'],
        canonicalAnswer: '80331',
        explanation: 'La PLZ (Postleitzahl o código postal) de la dirección en Múnich es exactamente 80331.',
      },
      {
        id: 's1_f5',
        number: 5,
        label: 'Zahlungsweise (Bar / Überweisung):',
        placeholder: 'z.B. Bar',
        acceptedAnswers: ['bar', 'barzahlung', 'in bar', 'bar vor ort'],
        canonicalAnswer: 'Bar (oder: Barzahlung)',
        explanation: 'El texto especifica que Frau Becker paga "bar bei der Anmeldung" (en efectivo).',
      },
    ],
  },
  {
    id: 'sprachschule_goethe',
    cefrLevel: 'A1',
    tabTitle: '2. Sprachschule',
    badge: 'Szenario 2',
    title: '🇩🇪 Sprachschule Anmeldung',
    subTitle: 'Goethe-Institut München',
    situation:
      'Carlos Gómez (24 Jahre alt), ein Student aus Kolumbien, wohnt zurzeit in München. Er möchte sich am Goethe-Institut für einen Intensivkurs Deutsch A1 anmelden. Er bevorzugt Unterricht am Vormittag (9:00 bis 12:30 Uhr). Die Kursgebühr von 380 Euro bezahlt er mit Kreditkarte.',
    formTitle: 'KURS-ANMELDUNG - GOETHE-INSTITUT MÜNCHEN',
    prefilled: [
      { label: 'Familienname:', value: 'Gómez' },
      { label: 'Alter:', value: '24 Jahre' },
      { label: 'Kursort:', value: 'München' },
    ],
    fields: [
      {
        id: 's2_f1',
        number: 1,
        label: 'Vorname:',
        placeholder: 'z.B. Carlos',
        acceptedAnswers: ['carlos', 'carlos gomez', 'carlos gómez'],
        canonicalAnswer: 'Carlos',
        explanation: 'Der Vorname (nombre de pila) del estudiante es Carlos.',
      },
      {
        id: 's2_f2',
        number: 2,
        label: 'Herkunftsland / Staatsangehörigkeit:',
        placeholder: 'z.B. Kolumbien',
        acceptedAnswers: ['kolumbien', 'kolumbianisch', 'colombia', 'colombiano'],
        canonicalAnswer: 'Kolumbien (oder: kolumbianisch)',
        explanation: 'Carlos kommt aus Kolumbien (Herkunftsland: Kolumbien).',
      },
      {
        id: 's2_f3',
        number: 3,
        label: 'Gewünschter Kurs:',
        placeholder: 'z.B. Intensivkurs A1',
        acceptedAnswers: ['intensivkurs a1', 'a1', 'deutsch a1', 'intensivkurs', 'deutsch-intensivkurs a1', 'deutschkurs a1'],
        canonicalAnswer: 'Intensivkurs A1 (oder: Deutsch A1)',
        explanation: 'Möchte einen Intensivkurs Deutsch A1 belegen.',
      },
      {
        id: 's2_f4',
        number: 4,
        label: 'Kurszeit:',
        placeholder: 'z.B. Vormittag',
        acceptedAnswers: ['vormittag', 'morgens', 'vormittags', 'am vormittag', 'am morgen'],
        canonicalAnswer: 'Vormittag (oder: morgens / vormittags)',
        explanation: 'Bevorzugt Unterricht am Vormittag (horario matutino de 9:00 a 12:30 Uhr).',
      },
      {
        id: 's2_f5',
        number: 5,
        label: 'Zahlungsmethode:',
        placeholder: 'z.B. Kreditkarte',
        acceptedAnswers: ['kreditkarte', 'karte', 'mit karte', 'mit kreditkarte'],
        canonicalAnswer: 'Kreditkarte (oder: Karte / mit Karte)',
        explanation: 'Der Text besagt: Er zahlt die Gebühr mit Kreditkarte.',
      },
    ],
  },
  {
    id: 'hotel_alpenblick',
    cefrLevel: 'A1',
    tabTitle: '3. Hotel Alpenblick',
    badge: 'Szenario 3',
    title: '🏔️ Hotelreservierung',
    subTitle: 'Hotel Alpenblick, Garmisch',
    situation:
      'Herr Thomas Weber aus Hamburg plant ein erholsames Wochenende in Bayern. Er bucht für sich allein ein Einzelzimmer im Hotel Alpenblick in Garmisch für 2 Nächte (vom 12. bis 14. November). Er möchte das Frühstücksbüfett im Hotel nutzen (Frühstück inklusive).',
    formTitle: 'ZIMMERRESERVIERUNG - HOTEL ALPENBLICK GARMISCH',
    prefilled: [
      { label: 'Vorname:', value: 'Thomas' },
      { label: 'Heimatort:', value: 'Hamburg' },
      { label: 'Anreisetag:', value: '12. November' },
    ],
    fields: [
      {
        id: 's3_f1',
        number: 1,
        label: 'Nachname:',
        placeholder: 'z.B. Weber',
        acceptedAnswers: ['weber', 'herr weber', 'thomas weber'],
        canonicalAnswer: 'Weber',
        explanation: 'Der Gast heißt Thomas Weber. Nachname = Weber.',
      },
      {
        id: 's3_f2',
        number: 2,
        label: 'Anzahl der Personen:',
        placeholder: 'z.B. 1 Person',
        acceptedAnswers: ['1', 'eine person', '1 person', 'eine', 'eins', '1 pers.'],
        canonicalAnswer: '1 (oder: 1 Person / Eine Person)',
        explanation: 'Er reist für sich allein: genau 1 Person.',
      },
      {
        id: 's3_f3',
        number: 3,
        label: 'Zimmerart:',
        placeholder: 'z.B. Einzelzimmer',
        acceptedAnswers: ['einzelzimmer', 'einzel-zimmer', 'ez', '1 einzelzimmer'],
        canonicalAnswer: 'Einzelzimmer',
        explanation: 'Er bucht für sich allein ein Einzelzimmer (habitación individual).',
      },
      {
        id: 's3_f4',
        number: 4,
        label: 'Aufenthaltsdauer (Nächte):',
        placeholder: 'z.B. 2 Nächte',
        acceptedAnswers: ['2', '2 nächte', '2 naechte', 'zwei', 'zwei nächte', 'zwei naechte'],
        canonicalAnswer: '2 (oder: 2 Nächte / zwei)',
        explanation: 'Vom 12. bis 14. November sind es 2 Nächte.',
      },
      {
        id: 's3_f5',
        number: 5,
        label: 'Frühstück erwünscht (Ja/Nein):',
        placeholder: 'z.B. Ja',
        acceptedAnswers: ['ja', 'inklusive', 'mit frühstück', 'mit fruehstueck', 'ja, inklusive', 'ja inklusive'],
        canonicalAnswer: 'Ja (oder: inklusive / mit Frühstück)',
        explanation: 'Frühstück erwünscht? Ja, da er das Frühstücksbüfett bucht.',
      },
    ],
  },
  {
    id: 'stadtbibliothek_muenchen',
    cefrLevel: 'A1',
    tabTitle: '4. Stadtbibliothek',
    badge: 'Szenario 4',
    title: '📚 Stadtbibliothek München',
    subTitle: 'Bibliotheksausweis',
    situation:
      'Frau Elena Rossi (28 Jahre) kommt aus Italien und arbeitet in München als Architektin. Sie wohnt in der Leopoldstraße 45. Da sie an der Universität zusätzlich noch studiert, beantragt sie ihren Bibliotheksausweis mit Studierenden-Ermäßigung.',
    formTitle: 'ANTRAG AUF BIBLIOTHEKSAUSWEIS - STADTBIBLIOTHEK MÜNCHEN',
    prefilled: [
      { label: 'Familienname:', value: 'Rossi' },
      { label: 'Geburtsland:', value: 'Italien' },
      { label: 'Alter:', value: '28 Jahre' },
    ],
    fields: [
      {
        id: 's4_f1',
        number: 1,
        label: 'Vorname:',
        placeholder: 'z.B. Elena',
        acceptedAnswers: ['elena'],
        canonicalAnswer: 'Elena',
        explanation: 'Die Antragstellerin heißt Elena Rossi. Vorname = Elena.',
      },
      {
        id: 's4_f2',
        number: 2,
        label: 'Wohnort:',
        placeholder: 'z.B. München',
        acceptedAnswers: ['münchen', 'muenchen', 'munich'],
        canonicalAnswer: 'München',
        explanation: 'Sie wohnt und arbeitet in München.',
      },
      {
        id: 's4_f3',
        number: 3,
        label: 'Straße und Hausnummer:',
        placeholder: 'z.B. Leopoldstraße 45',
        acceptedAnswers: [
          'leopoldstraße 45',
          'leopoldstr. 45',
          'leopoldstrasse 45',
          'leopoldstr 45',
          'leopoldstraße45',
          'leopoldstr.45',
          'leopold str. 45',
        ],
        canonicalAnswer: 'Leopoldstraße 45 (oder: Leopoldstr. 45)',
        explanation: 'Ihre Wohnadresse ist die Leopoldstraße 45.',
      },
      {
        id: 's4_f4',
        number: 4,
        label: 'Beruf:',
        placeholder: 'z.B. Architektin',
        acceptedAnswers: ['architektin', 'studentin', 'architektin / studentin', 'architektin und studentin'],
        canonicalAnswer: 'Architektin (oder: Studentin)',
        explanation: 'Sie arbeitet als Architektin und studiert an der Universität.',
      },
      {
        id: 's4_f5',
        number: 5,
        label: 'Ermäßigung (Ja/Nein):',
        placeholder: 'z.B. Ja',
        acceptedAnswers: ['ja', 'ja, bitte', 'mit ermäßigung', 'mit ermaessigung', 'ja bitte'],
        canonicalAnswer: 'Ja',
        explanation: 'Ermäßigung (descuento)? Ja, beantragt Ermäßigung für Studierende.',
      },
    ],
  },
  {
    id: 'buergeramt_anmeldung',
    cefrLevel: 'A2',
    tabTitle: '5. Bürgeramt (DTZ)',
    badge: 'Puente A2/DTZ · Trámite',
    title: '🏛️ Wohnsitz-Anmeldung (Bürgeramt)',
    subTitle: 'DTZ Formular-Training',
    situation:
      'Herr Mateo Silva ist am 1. Oktober nach Leipzig umgezogen und wohnt jetzt in der Waldstraße 18 (Postleitzahl 04105). Da er verheiratet ist, meldet er auch seine Ehefrau an. Er bringt die unterschriebene Wohnungsgeberbestätigung direkt zum Termin mit.',
    formTitle: 'ANMELDEBESTÄTIGUNG - BÜRGERAMT LEIPZIG (DTZ)',
    prefilled: [
      { label: 'Vorname / Nachname:', value: 'Mateo Silva' },
      { label: 'Stadt:', value: 'Leipzig' },
      { label: 'Wohnungsgeberbestätigung:', value: 'Vorhanden (Ja)' },
    ],
    fields: [
      {
        id: 's5_f1',
        number: 1,
        label: 'Neue Adresse (Straße + Nr.):',
        placeholder: 'z.B. Waldstraße 18',
        acceptedAnswers: ['waldstraße 18', 'waldstr. 18', 'waldstrasse 18', 'waldstr 18'],
        canonicalAnswer: 'Waldstraße 18',
        explanation: 'Su nueva dirección es Waldstraße 18.',
      },
      {
        id: 's5_f2',
        number: 2,
        label: 'Postleitzahl (PLZ):',
        placeholder: 'z.B. 04105',
        acceptedAnswers: ['04105'],
        canonicalAnswer: '04105',
        explanation: 'El código postal completo en Alemania tiene 5 dígitos: 04105.',
      },
      {
        id: 's5_f3',
        number: 3,
        label: 'Einzugsdatum:',
        placeholder: 'z.B. 01.10. / 1. Oktober',
        acceptedAnswers: ['1. oktober', '01.10.', '1.10.', '1 oktober', '01. oktober'],
        canonicalAnswer: '1. Oktober (oder: 01.10.)',
        explanation: 'Fecha de entrada a la vivienda: 1. Oktober (am 1. Oktober umgezogen).',
      },
      {
        id: 's5_f4',
        number: 4,
        label: 'Familienstand:',
        placeholder: 'z.B. verheiratet',
        acceptedAnswers: ['verheiratet'],
        canonicalAnswer: 'verheiratet',
        explanation: 'En formularios DTZ: verheiratet = casado/a.',
      },
      {
        id: 's5_f5',
        number: 5,
        label: 'Mitziehende Personen:',
        placeholder: 'z.B. Ehefrau / 1 Person',
        acceptedAnswers: ['ehefrau', 'frau', '1', '1 person', 'seine ehefrau'],
        canonicalAnswer: 'Ehefrau (oder: 1 Person)',
        explanation: 'Se empadrona también a su esposa («seine Ehefrau»).',
      },
    ],
  },
  {
    id: 'hausarzt_krankmeldung',
    cefrLevel: 'A2',
    tabTitle: '6. Hausarzt / Krankmeldung',
    badge: 'Puente A2/DTZ · Salud/Trabajo',
    title: '🩺 Patientenaufnahme & Krankmeldung',
    subTitle: 'Praxis Dr. Hoffmann (A2)',
    situation:
      'Frau Sofia Navarro arbeitet als Elektrikerin im Innendienst (Schaltkasten-Prüfung) und hat seit gestern Fieber und starke Halsschmerzen. Sie ist bei der AOK gesetzlich versichert und bittet am Empfang um eine Arbeitsunfähigkeitsbescheinigung (AU) bis Freitag.',
    formTitle: 'PATIENTENBOGEN & AU-ANTRAG - PRAXIS DR. HOFFMANN',
    prefilled: [
      { label: 'Patientin:', value: 'Sofia Navarro' },
      { label: 'Krankenkasse:', value: 'AOK (gesetzlich)' },
      { label: 'Beruf:', value: 'Elektrikerin' },
    ],
    fields: [
      {
        id: 's6_f1',
        number: 1,
        label: 'Beschwerden / Symptome:',
        placeholder: 'z.B. Fieber und Halsschmerzen',
        acceptedAnswers: ['fieber', 'halsschmerzen', 'fieber und halsschmerzen', 'fieber, halsschmerzen'],
        canonicalAnswer: 'Fieber und Halsschmerzen',
        explanation: 'Los síntomas declarados son Fieber und Halsschmerzen.',
      },
      {
        id: 's6_f2',
        number: 2,
        label: 'Seit wann krank?',
        placeholder: 'z.B. seit gestern',
        acceptedAnswers: ['gestern', 'seit gestern'],
        canonicalAnswer: 'seit gestern',
        explanation: '«Seit gestern» indica desde cuándo tiene síntomas.',
      },
      {
        id: 's6_f3',
        number: 3,
        label: 'Versicherungsart:',
        placeholder: 'z.B. AOK / gesetzlich',
        acceptedAnswers: ['gesetzlich', 'aok', 'aok gesetzlich', 'gesetzlich versichert'],
        canonicalAnswer: 'gesetzlich (AOK)',
        explanation: 'En Alemania se distingue entre gesetzlich (pública) y privat.',
      },
      {
        id: 's6_f4',
        number: 4,
        label: 'Gewünschtes Dokument (Krankmeldung):',
        placeholder: 'z.B. AU / Arbeitsunfähigkeitsbescheinigung',
        acceptedAnswers: [
          'au',
          'krankmeldung',
          'arbeitsunfähigkeitsbescheinigung',
          'arbeitsunfaehigkeitsbescheinigung',
          'krankschreibung',
        ],
        canonicalAnswer: 'AU / Arbeitsunfähigkeitsbescheinigung',
        explanation: 'La baja laboral médica oficial se denomina AU (o Krankmeldung).',
      },
      {
        id: 's6_f5',
        number: 5,
        label: 'Krankgeschrieben bis (Wochentag):',
        placeholder: 'z.B. Freitag',
        acceptedAnswers: ['freitag', 'bis freitag'],
        canonicalAnswer: 'Freitag (oder: bis Freitag)',
        explanation: 'Solicita la baja médica hasta el viernes («bis Freitag»).',
      },
    ],
  },
];

export const normalizeAnswer = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/stra(ss|ß)e/g, 'strasse')
    .replace(/str(\.|\b)/g, 'strasse')
    .replace(/[.,;:_#\-–—/()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const isAnswerCorrect = (field, userInput) => {
  if (!userInput || typeof userInput !== 'string') return false;
  const raw = userInput.trim().toLowerCase();
  if (field.acceptedAnswers.some((ans) => ans.toLowerCase().trim() === raw)) {
    return true;
  }
  const normUser = normalizeAnswer(userInput);
  return field.acceptedAnswers.some((ans) => normalizeAnswer(ans) === normUser);
};
