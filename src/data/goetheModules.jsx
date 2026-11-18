/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Edit as Edit3, BookOpen, Headphones, Mic } from 'lucide-react';
const GrammarAccordion = lazy(() => import('../components/GrammarAccordion'));
const EmailSimulator = lazy(() => import('../components/EmailSimulator'));
import PresentationVocabCard from '../components/PresentationVocabCard';
const GoetheHorenExam = lazy(() => import('../components/GoetheHorenExam'));
const GoetheLesenExam = lazy(() => import('../components/GoetheLesenExam'));
const GoetheWritingForm = lazy(() => import('../components/GoetheWritingForm'));
const GoetheSprechenExam = lazy(() => import('../components/GoetheSprechenExam'));

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
    title: "Simulacro Oficial Hören (Start Deutsch 1)",
    subtitle: "Teil 1 (Diálogos cotidianos), Teil 2 (Megafonía) y Teil 3 (Mensajes) con voz Charon",
    content: props => (
      <GoetheHorenExam {...props} />
    )
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
    title: "La Regla del Tren y Palabras Clave",
    subtitle: "Lee textos complejos de derecha a izquierda y detecta antónimos",
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
  }, {
    title: "Simulacro Oficial Lesen (Start Deutsch 1)",
    subtitle: "Teil 1 (E-Mails), Teil 2 (Webseiten/Anuncios) y Teil 3 (Schilder) con retroalimentación inmediata",
    content: props => (
      <GoetheLesenExam {...props} />
    )
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
                <li><strong>Para proponer:</strong> Ich habe eine Idee... (Tengo una idea...)</li>
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
    title: "Teil 1: Formulario de Inscripción Oficial (Anmeldeformular)",
    subtitle: "Completa los 5 campos requeridos a partir del texto de la situación",
    content: props => (
      <GoetheWritingForm {...props} />
    )
  }, {
    title: "Teil 2: Redacción de Correo Electrónico (E-Mail)",
    subtitle: "Simulador oficial con evaluación pedagógica y modelo auditivo (voz Charon)",
    content: <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 rounded-r-lg">
              <p className="font-bold text-emerald-800">💡 Estrategia Oficial Goethe A1: 3 oraciones exactas (25-45 palabras)</p>
              <p className="text-sm text-emerald-700 mt-1">El examen evalúa el cumplimiento de los 3 puntos (Leitpunkte). Escribe una oración por punto con verbo conjugado en Posición 2, saludo y despedida apropiados.</p>
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
  }, {
    title: "Simulacro Interactivo Sprechen (Start Deutsch 1)",
    subtitle: "Teil 1 (Sich vorstellen), Teil 2 (Themenkarten W-Fragen) y Teil 3 (Bitten & Reagieren) con respuestas modelo en voz Charon",
    content: props => (
      <GoetheSprechenExam {...props} />
    )
  }]
}];
