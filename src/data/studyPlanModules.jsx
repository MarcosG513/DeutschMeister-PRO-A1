/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
const GrammarAccordion = lazy(() => import('../components/GrammarAccordion'));
const InteractiveQA = lazy(() => import('../components/InteractiveQA'));
const DraggableSentenceBuilder = lazy(() => import('../components/DraggableSentenceBuilder'));
const AccusativeShield = lazy(() => import('../components/AccusativeShield'));
const AccusativeCards = lazy(() => import('../components/AccusativeCards'));
const SyntaxFlow = lazy(() => import('../components/SyntaxFlow'));
const LocativeEquationCards = lazy(() => import('../components/LocativeEquationCards'));
const MechanicalTimeline = lazy(() => import('../components/MechanicalTimeline'));
const PincerSwitch = lazy(() => import('../components/PincerSwitch'));
const LiveEvaluator = lazy(() => import('../components/LiveEvaluator'));
const LocativeMapSimulator = lazy(() => import('../components/LocativeMapSimulator'));
const VoiceExaminer = lazy(() => import('../components/VoiceExaminer'));
const ClockSVG = lazy(() => import('../components/ClockSVG'));

export const studyPlanModules = [
  // =========================================================================
  // BLOQUE I: CIMIENTOS, MORFOLOGÍA Y OBJETO DIRECTO (sp_1 a sp_3)
  // =========================================================================
  {
    id: 'sp_1',
    title: 'Capítulo 1: La Célula Sintáctica, V2 y Cambio Vocálico',
    presentationUrl: 'https://drive.google.com/file/d/1D1x2fDb33331RzgNbJupn8jg-MpjiAzA/view?usp=drive_web',
    theme: 'blueprint',
    slides: [
      {
        title: "La Regla de Oro de la Posición 2 (Verb Second - V2)",
        subtitle: "El verbo conjugado es el rey inamovible de la oración afirmativa",
        content: `El alemán funciona como una arquitectura matemática de bloques. La regla absoluta e inquebrantable de la sintaxis alemana es que el verbo conjugado **SIEMPRE ocupa la Posición 2** en oraciones enunciativas y en preguntas abiertas (*W-Fragen*).\n\n* **Posición 1 (Elemento de Enfoque):** \`Ich\` / \`Heute\` / \`In Berlin\`\n* **Posición 2 (VERBO CONJUGADO):** \`wohne\` / \`wohne\` / \`wohne\`\n* **Posición 3 (Sujeto invertido o Resto):** \`in Madrid\` / \`ich in Madrid\` / \`ich seit einem Jahr\`\n\n⚠️ **Inversión Sintáctica Obligatoria:**\nSi mueves un elemento de tiempo o lugar a la Posición 1 para darle énfasis, el sujeto salta inmediatamente a la Posición 3 para salvaguardar la Posición 2 del verbo:\n* *"Heute **wohne** ich in Berlin."*\n\n🚫 **Trampa Hispanohablante Fatal:** En español es común decir *"Hoy yo vivo en Berlín"*. Traducir esto palabra por palabra al alemán como \`*Heute ich wohne in Berlin\` viola la regla V2 y supone la pérdida inmediata de puntos en la redacción y expresión oral del Goethe-Zertifikat A1. La única estructura legal es: **Heute wohne ich in Berlin**.`
      },
      {
        title: "El Motor de Conjugación Regular y la -e- Epentética",
        subtitle: "Extracción de la raíz, desinencias estándar y la solución fonética de apoyo",
        content: `Para conjugar cualquier verbo regular en presente (*Präsens*), se retira la desinencia del infinitivo **-en** y se inyecta la matriz estándar:\n\n* **ich:** -e (*ich lerne*)\n* **du:** -st (*du lernst*)\n* **er / sie / es:** -t (*er lernt*)\n* **wir:** -en (*wir lernen*)\n* **ihr:** -t (*ihr lernt*)\n* **sie / Sie:** -en (*sie lernen*)\n\n⚡ **La Regla de la -e- Epentética (Apoyo Fonético Obligatorio):**\nCuando la raíz del verbo termina en consonante dental (**-t**, **-d**) o grupo nasal (**-m**, **-n** tras consonante) como en *arbeit-en*, *find-en*, *bad-en* o *öffn-en*, es fisiológicamente imposible articular las consonantes juntas (*\`*du arbeitst\` / \`*er findt\`*). Por ley fonética, se inserta una **-e- de apoyo** en la 2ª y 3ª persona del singular y 2ª del plural:\n\n* *du arbeit-**e**-st* | *er find-**e**-t* | *ihr arbeit-**e**-t*\n* *du öffn-**e**-st* | *sie öffn-**e**-t* | *ihr öffn-**e**-t*`
      },
      {
        title: "Cambios Vocálicos Fuertes en Singular (e ➔ i/ie, a ➔ ä)",
        subtitle: "Mutación radical exclusiva en 2ª y 3ª persona del singular (du / er / sie / es)",
        content: `Los verbos fuertes en alemán experimentan una mutación en la vocal de su raíz. Esta transformación ocurre **ÚNICAMENTE en el singular con du y er/sie/es**. En el plural, la raíz regresa a su forma original:\n\n1. **Mutación e ➔ i (Corta):**\n   * *sprechen (hablar):* du **sprichst** | er **spricht** *(wir sprechen, ihr sprecht)*\n   * *helfen (ayudar):* du **hilfst** | er **hilft** *(wir helfen, ihr helft)*\n   * *essen (comer):* du **isst** | er **isst**\n\n2. **Mutación e ➔ ie (Larga):**\n   * *sehen (ver):* du **siehst** | er **sieht** *(wir sehen, ihr seht)*\n   * *lesen (leer):* du **liest** | er **liest** *(wir lesen, ihr lest)*\n\n3. **Mutación a ➔ ä (Umlaut):**\n   * *fahren (viajar/conducir):* du **fährst** | er **fährt** *(wir fahren, ihr fahrt)*\n   * *schlafen (dormir):* du **schläfst** | er **schläft**\n\n💡 **Alerta Goethe A1:** Recuerda que *ihr* (vosotros) **NUNCA muta**: *ihr fahrt* (con 'a' normal), *ihr sprecht* (con 'e' normal).`
      },
      {
        title: "Verbos Auxiliares Irregulares Absolutos: sein y haben",
        subtitle: "Los dos pilares maestros para la identidad, posesión y tiempos compuestos",
        content: `Los verbos **sein** (ser/estar) y **haben** (tener/haber) rompen cualquier patrón regular. Deben memorizarse como fórmulas sintácticas automáticas:\n\n**1. sein (Ser / Estar):**\n* ich **bin** | du **bist** | er/sie/es **ist**\n* wir **sind** | ihr **seid** *(ojo con la ortografía: con d, no t)* | sie/Sie **sind**\n\n**2. haben (Tener / Haber):**\n* ich **habe** | du **hast** *(¡pierde la -b- radical!)* | er/sie/es **hat** *(¡pierde la -b- radical!)*\n* wir **haben** | ihr **habt** | sie/Sie **haben**\n\n🎯 **Fórmulas de Oro para Sprechen Teil 1 (Presentación):**\n* *"Ich **bin** Juan."* (Nombre)\n* *"Ich **bin** 28 Jahre alt."* (Edad - ¡se usa 'sein', no 'haben'!)\n* *"Ich **habe** zwei Brüder."* (Familia)\n* *"Ich **habe** keine Kinder."* (Familia)`
      },
      {
        title: "Reto Interactivo: Inversión Sintáctica V2",
        subtitle: "Ordena los bloques asegurando la Posición 2 del verbo",
        content: props => (
          <DraggableSentenceBuilder 
            mode="inversion"
            pool={[
              { id: 1, words: ["Heute", "wohne", "ich", "in Madrid"], correctOrder: ["Heute", "wohne", "ich", "in Madrid"] },
              { id: 2, words: ["Am Morgen", "trinken", "wir", "einen Kaffee"], correctOrder: ["Am Morgen", "trinken", "wir", "einen Kaffee"] },
              { id: 3, words: ["Jetzt", "spreche", "ich", "Deutsch"], correctOrder: ["Jetzt", "spreche", "ich", "Deutsch"] }
            ]}
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_2',
    title: 'Capítulo 2: El Universo del Sustantivo (Géneros, Plurales y Posesivos)',
    presentationUrl: 'https://drive.google.com/file/d/1ydPXeoc5VGUyyP2C-_eBo7e0RB-CTTGS/view?usp=drive_web',
    theme: 'blueprint',
    slides: [
      {
        title: "Tríada Cromática y Anclaje Visual de Género",
        subtitle: "Por qué todo sustantivo debe aprenderse soldado a su color y artículo",
        content: `En alemán no existen reglas intuitivas para el género basadas en el sexo o en la terminación en -o / -a como en español. Cada sustantivo posee un género gramatical inherente que determina toda la declinación de la frase:\n\n* 🔵 **Masculino (der / ein):** Color Azul (Equipo Sol)\n* 🔴 **Femenino (die / eine):** Color Rojo (Equipo Luna)\n* 🟢 **Neutro (das / ein):** Color Verde (Equipo Estrella)\n\n🚫 **El Choque Hispanohablante:**\nNo intentes traducir el género desde tu lengua materna:\n* El sol en español es masculino, pero en alemán es femenino: **die Sonne**.\n* La luna en español es femenina, pero en alemán es masculino: **der Mond**.\n* La niña y la señorita son seres femeninos biológicos, pero son gramaticalmente neutros por su sufijo diminutivo: **das Mädchen**, **das Fräulein**.\n\n💡 **Regla de Estudio:** Nunca memorices una palabra aislada como \`Tisch\`. Memorízala como una sola unidad fonética: **der Tisch**.`
      },
      {
        title: "Sufijos Morfológicos Infalibles de Género",
        subtitle: "Marcadores morfológicos que garantizan el género sin margen de duda",
        content: `Cuando no conozcas una palabra, busca su sufijo final. Estos patrones son 100% confiables en el examen Goethe A1:\n\n🔴 **100% Femeninos (die):**\n* **-ung:** *die Wohnung* (vivienda), *die Rechnung* (factura), *die Einladung* (invitación).\n* **-heit / -keit:** *die Gesundheit* (salud), *die Möglichkeit* (posibilidad), *die Pünktlichkeit* (puntualidad).\n* **-schaft:** *die Landschaft* (paisaje), *die Mannschaft* (equipo).\n* **-tät:** *die Universität* (universidad), *die Qualität* (calidad).\n* **-in (profesiones femeninas):** *die Ärztin* (médica), *die Lehrerin* (profesora).\n\n🟢 **100% Neutros (das):**\n* **-chen / -lein (diminutivos):** *das Brötchen* (panecillo), *das Mädchen* (niña).\n* **Sustantivación de verbos en infinitivo:** *das Essen* (la comida), *das Trinken* (la bebida), *das Leben* (la vida).\n\n🔵 **100% Masculinos (der):**\n* **Días de la semana, meses y estaciones:** *der Montag, der Januar, der Sommer, der Herbst*.\n* **Puntos cardinales y fenómenos meteorológicos:** *der Norden, der Regen, der Schnee*.\n* **Sufijos:** *-ismus* (*der Tourismus*), *-ling* (*der Lehrling*).`
      },
      {
        title: "La Matriz de Clones de 'ein' (Pronombres Posesivos)",
        subtitle: "Los posesivos imitan con precisión matemática la flexión del artículo indeterminado",
        content: `Los determinantes posesivos (**mein, dein, sein, ihr, unser, euer, Ihr**) NO cambian en función de la persona que habla, sino en función del **género y número del objeto poseído**, funcionando como clones idénticos de **ein / eine**:\n\n* Si el objeto es **Masculino o Neutro (Nominativo)** ➔ Forma base idéntica a *ein*:\n  * *mein Vater (Masc)* | *mein Kind (Neutro)*\n  * *dein Bruder (Masc)* | *dein Auto (Neutro)*\n  * *sein Chef (Masc)* | *sein Zimmer (Neutro)*\n\n* Si el objeto es **Femenino o Plural** ➔ Añaden la terminación **-e** idéntica a *eine*:\n  * *mein-**e** Mutter (Fem)* | *mein-**e** Eltern (Plural)*\n  * *dein-**e** Schwester (Fem)* | *dein-**e** Taschen (Plural)*\n\n📊 **Matriz de Poseedores (Nominativo Base):**\n* **ich (mi):** mein / meine\n* **du (tu):** dein / deine\n* **er / es (su de él/neutro):** sein / seine\n* **sie (su de ella):** ihr / ihre\n* **wir (nuestro):** unser / unsere\n* **ihr (vuestro):** euer / **eure** *(⚠️ pierde la -e- intermedia: nunca euere)*\n* **sie / Sie (su de ellos / de Usted formal):** ihr / ihre | **Ihr / Ihre** *(formal en mayúscula)*`
      },
      {
        title: "Morfología Temprana del Plural y Precios en Goethe A1",
        subtitle: "Las 5 desinencias del plural alemán y la lectura comercial de números",
        content: `En alemán, todo sustantivo en plural adopta el artículo definido **die**. Los 5 patrones morfológicos de plural en nivel A1 son:\n\n1. **-e (frecuente con masculinos):** *der Hund ➔ die Hunde* | *der Tisch ➔ die Tische*.\n2. **-er con Umlaut (frecuente con neutros):** *das Buch ➔ die Bücher* | *das Kind ➔ die Kinder*.\n3. **-n / -en (frecuente con femeninos):** *die Frau ➔ die Frauen* | *die Straße ➔ die Straßen*.\n4. **-s (extranjerismos y siglas):** *das Auto ➔ die Autos* | *das Foto ➔ die Fotos*.\n5. **Sin desinencia (a veces con Umlaut):** *das Fenster ➔ die Fenster* | *der Apfel ➔ die Äpfel*.\n\n💶 **Trampa Acústica de Precios (Goethe Hören Teil 1):**\nEn alemán, la unidad monetaria (*Euro* o *Cent*) interrumpe físicamente la lectura entre enteros y decimales:\n* **4,99 €** se lee estrictamente: **vier Euro neunundneunzig** *(jamás \`*vier Komma neunundneunzig\`)*.\n* **0,80 €** se lee: **achtzig Cent**.\n* Recuerda que los números del 21 al 99 se pronuncian con las unidades primero: *24 = vierundzwanzig*.`
      },
      {
        title: "Reto Interactivo: Escudo de Posesivos y Género",
        subtitle: "Asigna el artículo y posesivo correcto a los miembros de la familia",
        content: props => (
          <AccusativeShield 
            mode="possessives"
            words={[
              { id: 1, word: "Vater", type: "Masc", gender: "der", correct: "mein", alt: "meine", translation: "padre (mein Vater)" },
              { id: 2, word: "Mutter", type: "Fem", gender: "die", correct: "meine", alt: "mein", translation: "madre (meine Mutter)" },
              { id: 3, word: "Kind", type: "Neutro", gender: "das", correct: "dein", alt: "deine", translation: "hijo/a (dein Kind)" },
              { id: 4, word: "Eltern", type: "Plural", gender: "die", correct: "seine", alt: "sein", translation: "padres (seine Eltern)" }
            ]}
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_3',
    title: 'Capítulo 3: La Crisis del Masculino en Acusativo y Verbos Gatillo',
    presentationUrl: 'https://drive.google.com/file/d/1QusIBIw3hhDxZvtnB3eocWlPWW43dlIp/view?usp=drive_web',
    theme: 'blueprint',
    slides: [
      {
        title: "El Filtro Masculino: La Regla de la N-Mutation",
        subtitle: "Por qué Femenino, Neutro y Plural son 100% inmunes al Acusativo",
        content: props => (
          <div className="space-y-4">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              El caso Acusativo (<em>Akkusativ</em>) identifica al <strong>Objeto Directo</strong> de la oración: la entidad física o concepto que recibe directamente el impacto de la acción verbal (¿Qué compras? ¿A quién buscas?).
            </p>
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-xs md:text-sm font-medium">
              ⚡ <strong>LEY DE INMUNIDAD:</strong> El Acusativo <strong>SOLO ALTERA LOS ARTÍCULOS MASCULINOS</strong>, transmutando el sonido al morfema <strong>-en</strong>. Femenino, Neutro y Plural son 100% inmunes y conservan exactamente su forma de Nominativo.
            </div>
            <AccusativeCards {...props}/>
          </div>
        )
      },
      {
        title: "Pronombres Personales de Objeto Directo",
        subtitle: "Sustituyendo personas u objetos en Acusativo",
        content: `Cuando el Objeto Directo es un pronombre personal ("¿Me llamas?", "Lo compro", "Te busco"), el pronombre se transforma en su forma acusativa:\n\n* **ich (yo) ➔ mich** (*Er hört mich* - Él me escucha)\n* **du (tú) ➔ dich** (*Ich liebe dich* - Te amo)\n* **er (él) ➔ ihn** *(⚠️ Mutación fonética -en)* (*Ich kenne ihn* - Lo conozco a él)\n* **es (neutro) ➔ es** (*Ich kaufe es* - Lo compro [el libro / das Buch])\n* **sie (ella) ➔ sie** (*Ich frage sie* - Le pregunto a ella)\n* **wir (nosotros) ➔ uns** (*Der Arzt untersucht uns* - El médico nos examina)\n* **ihr (vosotros) ➔ euch** (*Ich lade euch ein* - Os invito)\n* **sie / Sie (ellos / Usted formal) ➔ sie / Sie** (*Ich verstehe Sie* - Lo entiendo a Usted)\n\n🚫 **Trampa Hispanohablante:** En español decimos *"Busco a mi hermano"* o *"Espero a María"*, usando la preposición 'a' de persona. En alemán **NO EXISTE LA PREPOSICIÓN 'A'** para objetos directos personales. El caso Acusativo absorbe la función completamente: **Ich suche meinen Bruder** (NUNCA \`*Ich suche an meinen Bruder\`).`
      },
      {
        title: "Verbos Gatillo de Acusativo y la Estructura 'Es gibt'",
        subtitle: "Activadores sintácticos automáticos y el pronombre interrogativo Wen",
        content: `El caso Acusativo se activa en nivel A1 con tres familias de disparadores obligatorios:\n\n1. **Verbos Transitivos Cotidianos:**\n   * *haben* (tener): *Ich habe **einen** Hund (Masc).*\n   * *brauchen* (necesitar): *Ich brauche **einen** Kugelschreiber (Masc).*\n   * *suchen / finden* (buscar/encontrar): *Ich suche **den** Bahnhof (Masc).*\n   * *kaufen / bestellen* (comprar/pedir): *Er kauft **einen** Apfel (Masc).*\n   * *essen / trinken* (comer/beber): *Ich trinke **einen** Kaffee (Masc).*\n\n2. **La Estructura Existencial 'Es gibt' (Hay):**\n   * Siempre exige Acusativo: *Hier gibt es **einen** Supermarkt (Masc).* / *Es gibt **ein** Problem (Neutro).*\n\n3. **Preposiciones Puras de Acusativo (FUDGO básico):**\n   * **für (para):** *Das Geschenk ist für **meinen** Vater (Masc).*\n   * **ohne (sin):** *Ich trinke Tee ohne **einen** Zucker (Masc).*\n   * **gegen (hacia / contra):** *Wir treffen uns gegen **den** Abend.*\n\n🔍 **El Interrogativo Wen (¿A quién?):**\nEl interrogativo *Wer* (quién) muta a Acusativo cuando preguntas por el objeto directo: *"**Wen** suchst du?" ➔ "Ich suche **meinen** Arzt."*`
      },
      {
        title: "Reto Interactivo: Mutación de Pronombres y Artículos",
        subtitle: "Aplica el escudo de Acusativo en oraciones de compras y contactos",
        content: props => (
          <AccusativeShield 
            mode="pronouns"
            words={[
              { id: 1, word: "den Mann", type: "Masc", gender: "der", correct: "ihn", alt: "er", translation: "hombre (den Mann / ihn)" },
              { id: 2, word: "einen Kaffee", type: "Masc", gender: "der", correct: "einen", alt: "ein", translation: "café (einen Kaffee)" },
              { id: 3, word: "die Frau", type: "Fem", gender: "die", correct: "sie", alt: "ihr", translation: "mujer (die Frau / sie)" },
              { id: 4, word: "das Brot", type: "Neutro", gender: "das", correct: "ein", alt: "einen", translation: "pan (das Brot / es)" }
            ]}
            {...props} 
          />
        )
      }
    ]
  },

  // =========================================================================
  // BLOQUE II: ARQUITECTURA VERBAL, MODALES Y CRONOMETRÍA (sp_4 a sp_6)
  // =========================================================================
  {
    id: 'sp_4',
    title: 'Capítulo 4: Verbos Separables e Inseparables (Satzklammer)',
    presentationUrl: 'https://drive.google.com/file/d/1s4MSGKeK7xVZF2qGN4JSXu5dl43VkhOC/view?usp=drive_web',
    theme: 'notebook',
    slides: [
      {
        title: "El Efecto Pinza Verbal (Satzklammer)",
        subtitle: "El divorcio sintáctico de los verbos separables en presente",
        content: props => (
          <div className="space-y-3">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              Los verbos separables (<em>Trennbare Verben</em>) están compuestos por un prefijo de dirección o preposición adherido a una raíz verbal base (<em>auf|stehen, ein|kaufen, an|rufen, mit|bringen, fern|sehen</em>). En oraciones enunciativas o interrogativas en presente, sufren una separación física obligatoria que genera la famosa pinza sintáctica alemana:
            </p>
            <SyntaxFlow 
              steps={[
                { badge: "1", name: "📌 Sujeto / Enfoque", description: "Posición 1" },
                { badge: "2", name: "🔥 Verbo Base Conjugado", description: "Ocupa la Posición 2 obligatoria" },
                { badge: "3", name: "💬 Complementos", description: "Información de tiempo, modo, lugar" },
                { badge: "4", name: "🔒 Prefijo Separable", description: "Cierre de la pinza al final absoluto" }
              ]}
              {...props} 
            />
            <div className="space-y-1 text-xs sm:text-sm text-slate-700 pt-1">
              <p>• <strong>aufstehen:</strong> Ich <strong>stehe</strong> jeden Morgen um 6 Uhr <strong>auf</strong>.</p>
              <p>• <strong>einkaufen:</strong> Er <strong>kauft</strong> heute im Supermarkt <strong>ein</strong>.</p>
              <p>• <strong>anrufen:</strong> <strong>Rufst</strong> du mich heute Abend <strong>an</strong>?</p>
            </div>
          </div>
        )
      },
      {
        title: "El Escudo Inseparable: Prefijos be-ge-er-ver-zer-ent",
        subtitle: "Prefijos que NUNCA se separan ni viajan al final de la oración",
        content: `Para no cometer el error de romper verbos que no deben separarse, memoriza la regla mnemotécnica de los **6 prefijos inseparables de A1 (be-ge-er-ver-zer-ent)**. Estos prefijos están soldados químicamente a la raíz verbal y **permanecen siempre juntos en Posición 2**:\n\n🛡️ **Los 6 Inseparables Clave:**\n1. **be-:** *bezahlen* (pagar) ➔ *Ich **bezahle** die Rechnung.* (NUNCA \`*Ich zahle die Rechnung be\`).\n2. **ver-:** *verstehen* (entender) ➔ *Ich **verstehe** das Wort nicht.*\n3. **er-:** *erklären* (explicar) ➔ *Der Lehrer **erklärt** die Grammatik.*\n4. **ge-:** *gehören* (pertenecer) ➔ *Das Buch **gehört** mir.*\n5. **zer-:** *zerstören* (destruir) ➔ *Er **zerstört** das Glas.*\n6. **ent-:** *entschuldigen* (disculpar) ➔ *Ich **entschuldige** mich.*\n\n💡 **Truco Acústico Goethe:** En los verbos separables (*einkaufen*), el acento tónico cae en el prefijo (**EIN**-kaufen). En los inseparables (*bezahlen*), el acento cae en la raíz verbal (be-**ZAH**-len).`
      },
      {
        title: "Interruptor Mecánico: Separable vs. Inseparable",
        subtitle: "Juega con la pinza sintáctica y ejercita la colocación del prefijo",
        content: props => (
          <PincerSwitch mode="separable_vs_inseparable" {...props}/>
        )
      }
    ]
  },
  {
    id: 'sp_5',
    title: 'Capítulo 5: Verbos Modales y el Doble Sándwich Sintáctico',
    presentationUrl: 'https://drive.google.com/file/d/12ef-35y8c5SaFbw4v1xIZX74-5E8mX6c/view?usp=drive_web',
    theme: 'notebook',
    slides: [
      {
        title: "Los 5 Modales de A1 + möchten",
        subtitle: "Expresando habilidad, obligación, permiso, prohibición, deseo y consejo",
        content: () => (
          <div className="space-y-3 my-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-950">können</span>
                <span className="text-[10px] bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded block">Habilidad / Saber</span>
                <p className="text-[11px] text-slate-600 font-mono">Ich kann Deutsch sprechen</p>
              </div>
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                <span className="font-bold text-rose-950">müssen</span>
                <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded block">Obligación ineludible</span>
                <p className="text-[11px] text-slate-600 font-mono">Ich muss arbeiten</p>
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-950">dürfen</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded block">Permiso / Prohibición</span>
                <p className="text-[11px] text-slate-600 font-mono">Hier darf man nicht rauchen</p>
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <span className="font-bold text-emerald-950">wollen</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded block">Intención / Plan</span>
                <p className="text-[11px] text-slate-600 font-mono">Ich will reisen</p>
              </div>
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
                <span className="font-bold text-purple-950">sollen</span>
                <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded block">Consejo médico</span>
                <p className="text-[11px] text-slate-600 font-mono">Du sollst im Bett bleiben</p>
              </div>
              <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
                <span className="font-bold text-indigo-950">möchten</span>
                <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded block">Deseo cortés</span>
                <p className="text-[11px] text-slate-600 font-mono">Ich möchte einen Kaffee</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "La Anomalía Fonética del Singular (Cero Terminación)",
        subtitle: "Las personas ich y er/sie/es son 100% IDÉNTICAS en verbos modales",
        content: `La regla más importante al conjugar verbos modales es que en singular pierden el Umlaut y **la 1ª persona (ich) y la 3ª persona (er/sie/es) son EXACTAMENTE IGUALES y carecen de terminación**:\n\n* **können:** ich **kann** | du kannst | er/sie/es **kann** *(¡sin -t!)*\n* **müssen:** ich **muss** | du musst | er/sie/es **muss** *(¡sin -t!)*\n* **dürfen:** ich **darf** | du darfst | er/sie/es **darf** *(¡sin -t!)*\n* **wollen:** ich **will** | du willst | er/sie/es **will** *(¡sin -t!)*\n* **sollen:** ich **soll** | du sollst | er/sie/es **soll** *(¡sin -t!)*\n* **möchten:** ich **möchte** | du möchtest | er/sie/es **möchte**\n\n🚫 **Error Típico:** Nunca digas \`*er kannt\` o \`*er musst\`. En singular no llevan la terminación estándar -t.`
      },
      {
        title: "El Doble Sándwich: Desactivación de Verbos Separables",
        subtitle: "Cuando un verbo modal entra en juego, el verbo separable NO se rompe",
        content: `Estructura Sintáctica del Sándwich Modal:\n\`[Sujeto Pos 1] + [MODAL CONJUGADO Pos 2] + [Complementos Pos 3] + [VERBO PRINCIPAL EN INFINITIVO AL FINAL]\`\n\n🔒 **Regla de Desactivación de Verbos Separables:**\nSi el verbo principal es separable (*aufstehen, einkaufen, anrufen*), el verbo modal **DESACTIVA la pinza separable**. El verbo viaja completo en infinitivo al final de la oración, sin partirse jamás:\n\n* **Normal:** *Ich **stehe** um 6 Uhr **auf**.*\n* **Con Modal:** *Ich **muss** morgen um 6 Uhr **aufstehen**.*\n  *(NUNCA \`*Ich muss um 6 Uhr auf stehen\` ni \`*Ich muss aufstehen um 6 Uhr\`)*.\n\n* **Normal:** *Er **kauft** im Supermarkt **ein**.*\n* **Con Modal:** *Er **will** heute im Supermarkt **einkaufen**.*`
      },
      {
        title: "Tablero de Control: El Sándwich Modal",
        subtitle: "Configura la actitud de la oración y congela el verbo principal al final",
        content: props => (
          <PincerSwitch isModal={true} {...props}/>
        )
      }
    ]
  },
  {
    id: 'sp_6',
    title: 'Capítulo 6: El Reloj Dual (Formal vs. Informal) y Preposiciones Temporales',
    presentationUrl: 'https://drive.google.com/file/d/19pXqHghxkD35YlPmPZqhgPh7yC8Uo33n/view?usp=sharing',
    theme: 'notebook',
    slides: [
      {
        title: "El Reloj Formal (24 Horas): Precisión Oficial Goethe Hören",
        subtitle: "El sistema estándar de estaciones, aeropuertos, citas médicas y noticias",
        content: `En el examen Goethe A1 (especialmente en *Hören Teil 1 y Teil 2*), los anuncios por megafonía y secretarias telefónicas utilizan el reloj oficial de 24 horas. Se lee en estricto orden secuencial:\n\n\`[Hora 0-24] + Uhr + [Minutos 0-59]\`\n\n* **14:30 ➔** *vierzehn Uhr dreißig*\n* **08:15 ➔** *acht Uhr fünfzehn*\n* **18:45 ➔** *achtzehn Uhr fünfundvierzig*\n* **20:00 ➔** *zwanzig Uhr*\n\n💡 **Regla de Oído:** En cuanto escuches la palabra **Uhr** en medio de dos cifras, estás ante la hora formal oficial. ¡Anótala exactamente como suena en el formulario de examen!`
      },
      {
        title: "El Reloj Informal Cotidiano: halb y viertel",
        subtitle: "El sistema de 12 horas para la vida diaria y la gran trampa de las medias horas",
        content: `En la conversación diaria, el alemán utiliza referencias visuales basadas en cuartos (**Viertel**) y medias horas (**halb**):\n\n🚨 **LA GRAN TRAMPA DE 'HALB':**\nEn español decimos "las dos y media". En alemán, **halb indica media hora ANTES de la siguiente hora**:\n* **14:30 = halb drei** *(¡falta media hora para las 3! NUNCA halb zwei)*.\n* **08:30 = halb neun** *(media hora para las 9)*.\n* **11:30 = halb zwölf** *(media hora para las 12)*.\n\n⏱️ **Cuartos de Hora:**\n* **Viertel nach (cuarto después de):** 14:15 ➔ *Viertel nach zwei*.\n* **Viertel vor (cuarto antes de):** 14:45 ➔ *Viertel vor drei*.\n\nMinutos cotidianos:\n* 14:05 ➔ *fünf nach zwei* | 14:55 ➔ *fünf vor drei*.`
      },
      {
        title: "Tríada Preposicional Temporal: um, am, im",
        subtitle: "La regla mnemotécnica para no dudar jamás con el tiempo",
        content: `Memoriza este esquema para usar las preposiciones temporales exactas en Schreiben Teil 2 y Sprechen:\n\n1. **um (Horas exactas y momentos puntuales):**\n   * **um** 8 Uhr | **um** wie viel Uhr? | **um** Mitternacht\n\n2. **am (Días de la semana, fechas y partes del día):**\n   * **am** Montag | **am** Wochenende | **am** Morgen | **am** 15. Mai\n   * *(⚠️ Excepción biológica obligatoria: **in der Nacht** - por la noche)*\n\n3. **im (Meses, estaciones del año y años con 'im Jahr'):**\n   * **im** Juli | **im** Sommer | **im** Winter | **im** Jahr 2026\n\n📝 **Fórmula de Oro para el Examen Goethe:**\n*"Ich komme **am** Samstag **um** 15 Uhr."*`
      },
      {
        title: "Simulador Interactivo: El Reloj Alemán",
        subtitle: "Compara lectura formal 24h y reloj coloquial paso a paso",
        content: () => (
          <div className="space-y-4 my-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex flex-col items-center">
                <ClockSVG time="08:15" />
                <span className="text-xs font-bold text-slate-800 mt-1">Viertel nach acht</span>
                <span className="text-[11px] text-slate-500">Formal: acht Uhr fünfzehn</span>
              </div>
              <div className="flex flex-col items-center">
                <ClockSVG time="14:30" />
                <span className="text-xs font-bold text-slate-800 mt-1">halb drei</span>
                <span className="text-[11px] text-slate-500">Formal: vierzehn Uhr dreißig</span>
              </div>
              <div className="flex flex-col items-center">
                <ClockSVG time="14:45" />
                <span className="text-xs font-bold text-slate-800 mt-1">Viertel vor drei</span>
                <span className="text-[11px] text-slate-500">Formal: vierzehn Uhr fünfundvierzig</span>
              </div>
            </div>
            <InteractiveQA
              question="Wie spät ist es jetzt? (14:30)"
              answer="Es ist halb drei nachmittags. Der Termin beginnt um vierzehn Uhr dreißig."
              note="Recuerda: 'halb drei' = media hora ANTES de las 3:00 (2:30 / 14:30)."
            />
          </div>
        )
      }
    ]
  },

  // =========================================================================
  // BLOQUE III: OBJETO INDIRECTO, GEOMETRÍA ESPACIAL Y PASADO (sp_7 a sp_9)
  // =========================================================================
  {
    id: 'sp_7',
    title: 'Capítulo 7: El Objeto Indirecto: Dativo, Código M-R-M-N y Verbos Intrínsecos',
    presentationUrl: 'https://drive.google.com/file/d/1n_dLlwAlx9mJMoytcMC4wV3TjNCb59-r/view?usp=drive_web',
    theme: 'medical',
    slides: [
      {
        title: "El Código Mnemotécnico M-R-M-N (MaRiMaNa)",
        subtitle: "La mutación universal de todos los artículos en caso Dativo",
        content: () => (
          <div className="space-y-3 my-2">
            <p className="text-slate-700 text-xs sm:text-sm">
              El caso Dativo (<em>Dativ</em>) marca el <strong>Objeto Indirecto o Receptor</strong> (¿A quién le das algo? ¿A quién ayudas?). A diferencia del Acusativo, el Dativo <strong>ALTERA A TODOS LOS GÉNEROS Y AL PLURAL</strong> bajo el código mnemotécnico <strong>M-R-M-N</strong>:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-1.5 py-0.5 rounded block">🔵 Masc (M)</span>
                <strong className="text-blue-900 block text-sm">dem</strong>
                <span className="text-[11px] text-slate-500">einem / meinem</span>
              </div>
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-rose-200 text-rose-900 font-bold px-1.5 py-0.5 rounded block">🔴 Fem (R)</span>
                <strong className="text-rose-900 block text-sm">der</strong>
                <span className="text-[11px] text-slate-500">einer / meiner</span>
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded block">🟢 Neutro (M)</span>
                <strong className="text-emerald-900 block text-sm">dem</strong>
                <span className="text-[11px] text-slate-500">einem / meinem</span>
              </div>
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl font-mono text-center space-y-1">
                <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded block">🟣 Plural (N)</span>
                <strong className="text-purple-900 block text-sm">den + -n</strong>
                <span className="text-[11px] text-slate-500">meinen Kinder<strong>n</strong></span>
              </div>
            </div>
            <p className="text-xs text-slate-600 pt-1">⚠️ <strong>La -n del Plural:</strong> En Dativo Plural, los sustantivos reciben obligatoriamente una <strong>-n</strong> final (salvo que ya terminen en -n o en -s): *den Kindern, den Freunden*.</p>
          </div>
        )
      },
      {
        title: "Pronombres Personales de Receptor (Dativo)",
        subtitle: "Expresando a quién le das, muestras o dices algo",
        content: () => (
          <div className="space-y-3 my-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-center">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">ich ➔ <strong className="text-indigo-600">mir</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">du ➔ <strong className="text-indigo-600">dir</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">er/es ➔ <strong className="text-indigo-600">ihm</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">sie ➔ <strong className="text-indigo-600">ihr</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">wir ➔ <strong className="text-indigo-600">uns</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">ihr ➔ <strong className="text-indigo-600">euch</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">sie ➔ <strong className="text-indigo-600">ihnen</strong></div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">Sie ➔ <strong className="text-indigo-600">Ihnen</strong></div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
              🚫 <strong>Diferencia vs Español:</strong> En español decimos "le ayudo" tanto a un hombre como a una mujer. En alemán existe distinción estricta de género: <strong>Ich helfe ihm</strong> (a él) vs. <strong>Ich helfe ihr</strong> (a ella).
            </div>
          </div>
        )
      },
      {
        title: "Verbos Intrínsecos de Dativo y Preposiciones Puras",
        subtitle: "Verbos que no toman Acusativo y satélites de caso invariable",
        content: `En alemán existen verbos de uso constante que **rigen Dativo por naturaleza propia**, sin importar que en español sean transitivos:\n\n* **helfen (ayudar):** *Ich helfe **dem** Mann.* / *Kannst du **mir** helfen?*\n* **danken (agradecer):** *Ich danke **Ihnen** sehr.*\n* **gefallen (gustar):** *Das T-Shirt gefällt **mir** gut.*\n* **gehören (pertenecer):** *Das Auto gehört **meinem** Vater.*\n* **schmecken (saber/gustar comida):** *Die Pizza schmeckt **den** Kindern gut.*\n* **passen (quedar bien/convenir):** *Der Termin passt **mir**.*\n\n🛡️ **Preposiciones Puras de Dativo (aus, bei, mit, nach, seit, von, zu):**\n* **mit:** *Ich fahre mit **dem** Bus.*\n* **zu:** *Ich gehe **zum (zu dem)** Arzt.* / *Ich gehe **zur (zu der)** Bank.*\n* **bei:** *Er wohnt **bei seinen** Eltern.*\n* **von:** *Ich komme **vom (von dem)** Bahnhof.*\n\n🔍 **Interrogativo Wem? (¿A quién?):** *"**Wem** gehört das Buch?" ➔ "**Dem** Lehrer."*`
      },
      {
        title: "Evaluador Interactivo: Matriz Dativo M-R-M-N",
        subtitle: "Completa el artículo Dativo correcto (dem / der / den) y escucha la pronunciación",
        content: props => (
          <LiveEvaluator
            exercises={[
              { text: "Ich helfe ___ Techniker im Keller.", answer: "dem", translation: "Ayudo al técnico (der Techniker -> Masc Dativo = dem)" },
              { text: "Wir fahren mit ___ U-Bahn zur Arbeit.", answer: "der", translation: "Vamos en metro (die U-Bahn -> Fem Dativo = der)" },
              { text: "Das Kabel gehört zu ___ Werkzeugkoffer.", answer: "dem", translation: "El cable pertenece al maletín (Masc Dativo = dem)" },
              { text: "Die Pizza schmeckt ___ Kindern sehr gut.", answer: "den", translation: "La pizza les gusta a los niños (Plural Dativo = den + -n)" }
            ]}
            {...props}
          />
        )
      }
    ]
  },
  {
    id: 'sp_8',
    title: 'Capítulo 8: El Mapa Espacial: Wechselpräpositionen (Wo vs. Wohin)',
    presentationUrl: 'https://drive.google.com/file/d/1wS542v_rcsuYj1cpEsTzahsmKDBQQxjV/view?usp=drive_web',
    theme: 'medical',
    slides: [
      {
        title: "La Ecuación del Espacio: ¿Wo? vs. ¿Wohin?",
        subtitle: "El dilema existencial de las 9 preposiciones de doble vía",
        content: props => (
          <div className="space-y-3">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              Existen 9 preposiciones espaciales cuyo caso sintáctico cambia según la dinámica de la acción (<strong>an, auf, hinter, in, neben, über, unter, vor, zwischen</strong>):
            </p>
            <LocativeEquationCards {...props}/>
            <div className="space-y-1 text-xs sm:text-sm text-slate-700">
              <p>• <strong>¿Wo? (Reposo / Estático) ➔ DATIVO:</strong> Das Buch liegt <em>auf dem</em> Tisch (dem = Dativo Masc).</p>
              <p>• <strong>¿Wohin? (Destino / Movimiento) ➔ ACUSATIVO:</strong> Ich lege das Buch <em>auf den</em> Tisch (den = Acusativo Masc).</p>
            </div>
          </div>
        )
      },
      {
        title: "Parejas Verbales: Reposo vs. Acción de Colocar",
        subtitle: "Verbos que fijan el caso Dativo o Acusativo en la oración",
        content: `En alemán, los verbos de posición se organizan en parejas estrictas que determinan el caso sintáctico:\n\n| Verbo Estático ( Dativo - ¿Wo? ) | Verbo de Acción ( Acusativo - ¿Wohin? ) |\n| :--- | :--- |\n| **stehen** (estar vertical/de pie) | **stellen** (colocar en vertical) |\n| *Die Flasche steht auf dem Tisch.* | *Ich stelle die Flasche auf den Tisch.* |\n| **liegen** (estar horizontal/acostado) | **legen** (acostar/tumbar algo) |\n| *Das Buch liegt auf dem Bett.* | *Ich lege das Buch auf das Bett.* |\n| **sitzen** (estar sentado) | **setzen (sich)** (sentarse) |\n| *Das Kind sitzt auf dem Stuhl.* | *Die Mutter setzt das Kind auf den Stuhl.* |\n| **hängen** (estar colgado) | **hängen** (colgar algo) |\n| *Das Bild hängt an der Wand.* | *Ich hänge das Bild an die Wand.* |`
      },
      {
        title: "Contracciones Nativas Indispensables de A1",
        subtitle: "Fusionando preposición y artículo para hablar con fluidez natural",
        content: `En la conversación cotidiana y en las cartas del Goethe A1, es obligatorio utilizar contracciones preposicionales:\n\n* **in + dem ➔ im** (Dativo Masc/Neutro): *Ich bin **im** Supermarkt.*\n* **in + das ➔ ins** (Acusativo Neutro): *Ich gehe **ins** Kino.*\n* **an + dem ➔ am** (Dativo Masc/Neutro): *Er wartet **am** Gleis 4.*\n* **an + das ➔ ans** (Acusativo Neutro): *Wir fahren **ans** Meer.*\n* **zu + dem ➔ zum** (Dativo Masc/Neutro): *Ich fahre **zum** Flughafen.*\n* **zu + der ➔ zur** (Dativo Femenino): *Ich gehe **zur** Apotheke.*\n\n🚫 **Trampa Hispanohablante:** Usar la preposición "en" del español para ambas situaciones ("Estoy en el cine" / "Voy en el cine"). En alemán: **Ich bin im Kino** (Dativo) vs. **Ich gehe ins Kino** (Acusativo).`
      },
      {
        title: "Simulador 3D: Mapa Locativo Interactivo",
        subtitle: "Arrastra objetos y comprueba el cambio automático entre Dativo y Acusativo",
        content: props => (
          <LocativeMapSimulator mode="spatial_3d" {...props}/>
        )
      }
    ]
  },
  {
    id: 'sp_9',
    title: 'Capítulo 9: Das Perfekt (haben vs. sein) y Präteritum de Supervivencia',
    presentationUrl: 'https://drive.google.com/file/d/1rWmyyVBBceZm2lzbaNY8Luuvv5X6vgfU/view?usp=drive_web',
    theme: 'medical',
    slides: [
      {
        title: "Estructura de Dos Pilares (Das Perfekt)",
        subtitle: "El pasado hablado en alemán mediante auxiliar y participio final",
        content: props => (
          <div className="space-y-3">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed">
              El tiempo pasado universal en la lengua hablada (<em>Das Perfekt</em>) se construye como una estructura de dos pilares interconectados:
            </p>
            <SyntaxFlow 
              steps={[
                { badge: "1", name: "📌 Sujeto", description: "El ejecutor de la acción" },
                { badge: "2", name: "⚡ Auxiliar Conjugado (haben / sein)", description: "Verbo auxiliar en Posición 2" },
                { badge: "3", name: "💬 Complementos", description: "Tiempo, objetos directos, lugares" },
                { badge: "4", name: "🔒 Participio II (Partizip II)", description: "Acción congelada al final absoluto" }
              ]}
              {...props} 
            />
            <div className="space-y-1 text-xs sm:text-sm text-slate-700 pt-1">
              <p>• <strong>Presente:</strong> Ich kaufe eine Fahrkarte.</p>
              <p>• <strong>Perfekt:</strong> Ich <strong>habe</strong> eine Fahrkarte <strong>gekauft</strong>.</p>
            </div>
          </div>
        )
      },
      {
        title: "Matriz Física de Selección: ¿Haben o Sein?",
        subtitle: "El criterio físico para elegir el auxiliar correcto",
        content: `La elección del verbo auxiliar responde a leyes físicas claras:\n\n1. **Usa SEIN (La Flecha de Movimiento y Cambio de Estado):**\nExige *sein* en dos escenarios físicos:\n* **Desplazamiento físico de A ➔ B:** *gehen* (ist gegangen), *fahren* (ist gefahren), *fliegen* (ist geflogen), *kommen* (ist gekommen), *reisen* (ist gereist).\n  * *Ich **bin** nach Berlin **geflogen**.*\n* **Cambio de estado físico o biológico:** *aufstehen* (ist aufgestanden), *einschlafen* (ist eingeschlafen), *sterben* (ist gestorben).\n* **Excepciones fijas con sein:** *sein* (ist gewesen), *bleiben* (ist geblieben).\n\n2. **Usa HABEN (El Ancla Estática - 85% de los verbos):**\nPara todos los verbos transitivos con Acusativo y acciones estáticas: *lernen* (hat gelernt), *essen* (hat gegessen), *trinken* (hat getrunken), *kaufen* (hat gekauft), *schlafen* (hat geschlafen).\n  * *Wir **haben** gestern Deutsch **gelernt**.*`
      },
      {
        title: "El Präteritum de Supervivencia: war y hatte",
        subtitle: "Uso de war y hatte para hablar con fluidez natural en nivel A1",
        content: `Aun cuando el pasado hablado general es el *Perfekt*, los hablantes nativos en nivel A1 **NUNCA dicen** \`*Ich bin krank gewesen\` o \`*Ich habe Zeit gehabt\`. En su lugar, se utilizan exclusivamente las formas directas de **Präteritum**:\n\n1. **war (era / estaba - de sein):**\n   * ich **war** | du **warst** | er/sie/es **war** | wir **waren** | ihr **wart** | sie/Sie **waren**\n   * *"Gestern **war** ich krank."* (Ayer estaba enfermo).\n   * *"Wir **waren** im Urlaub."* (Estuvimos de vacaciones).\n\n2. **hatte (tenía / había - de haben):**\n   * ich **hatte** | du **hattest** | er/sie/es **hatte** | wir **hatten** | ihr **hattet** | sie/Sie **hatten**\n   * *"Ich **hatte** keine Zeit."* (No tenía tiempo).\n   * *"Er **hatte** einen Unfall."* (Tuvo un accidente).\n\n💡 **Tip Examen Goethe A1 (Schreiben Teil 2):** En notas breves y excusas para faltar al trabajo o a clase, usar *war* y *hatte* demuestra dominio nativo y ahorra espacio sintáctico: *"Ich konnte nicht kommen, denn ich war beim Arzt."*`
      },
      {
        title: "Línea de Tiempo Cinemática: Presente a Pasado",
        subtitle: "Desliza el control para transformar oraciones de presente a Perfekt / Präteritum",
        content: props => (
          <MechanicalTimeline mode="perfekt_and_praeteritum" {...props}/>
        )
      }
    ]
  },

  // =========================================================================
  // BLOQUE IV: COHESIÓN TEXTUAL, MODIFICADORES Y DOMINIO GOETHE (sp_10 a sp_12)
  // =========================================================================
  {
    id: 'sp_10',
    title: 'Capítulo 10: Negación Sistémica (nicht vs. kein) y Conectores (Posición 0 y 1)',
    presentationUrl: 'https://drive.google.com/file/d/1ja2uZyZv5RMsli1g6RVJAleFgRD4YVnG/view?usp=drive_web',
    theme: 'blueprint',
    slides: [
      {
        title: "La Frontera de la Negación: kein vs. nicht",
        subtitle: "Aprende qué negar y dónde colocar la palabra de negación",
        content: `En español usamos "NO" para todo. En alemán existe una frontera gramatical estricta:\n\n1. **kein / keine (El Asesino de 'ein'):**\nNiega **exclusivamente sustantivos** que llevan artículo indeterminado (*ein/eine*) o van sin artículo (*Nullartikel*):\n* *Ich habe ein Auto.* ➔ *Ich habe **kein** Auto.*\n* *Ich trinke Kaffee.* ➔ *Ich trinke **keinen** Kaffee (Masc Akk).*\n* *Ich habe Zeit.* ➔ *Ich habe **keine** Zeit (Fem).*\n* *Ich habe Kinder.* ➔ *Ich habe **keine** Kinder (Plural).*\n\n2. **nicht (Negador Universal):**\nNiega verbos, adjetivos, nombres propios, lugares o sustantivos con artículo determinado (*der/die/das*) o posesivo:\n* **Verbos (nicht va al final absoluto):** *Ich komme heute **nicht**.*\n* **Adjetivos (nicht va inmediatamente antes):** *Das Auto ist **nicht** neu.*\n* **Lugares / Nombres:** *Ich wohne **nicht** in Berlin.*\n* **Posesivos / Definidos:** *Das ist **nicht** mein Pass.*`
      },
      {
        title: "Zona Libre: Conectores Fantasma Posición 0 (ADUSO)",
        subtitle: "Conecta oraciones sin alterar la regla V2 y domina la puntuación obligatoria",
        content: () => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Los conectores coordinantes de <strong>Posición 0 (ADUSO)</strong> unen dos oraciones independientes sin alterar el orden sintáctico:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-xs text-center">
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Aber</strong>
                <span className="text-[10px] text-slate-500 font-sans">Pero</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Denn</strong>
                <span className="text-[10px] text-slate-500 font-sans">Porque</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Und</strong>
                <span className="text-[10px] text-slate-500 font-sans">Y</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                <strong className="text-indigo-900 block font-bold text-sm">Sondern</strong>
                <span className="text-[10px] text-slate-500 font-sans">Sino</span>
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg col-span-2 sm:col-span-1">
                <strong className="text-indigo-900 block font-bold text-sm">Oder</strong>
                <span className="text-[10px] text-slate-500 font-sans">O</span>
              </div>
            </div>
            <div className="p-2.5 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs text-center border border-slate-800 shadow-inner">
              <code>[Conector Pos 0] + [Sujeto Pos 1] + [VERBO CONJUGADO Pos 2] + [Complementos]</code>
            </div>
            <div className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl text-xs space-y-1">
              <span className="font-bold text-rose-950 block">⚠️ Regla de Oro de Puntuación (Penalización Directa Goethe-Schreiben):</span>
              <p className="text-rose-900 leading-relaxed">
                Los conectores <strong>aber</strong>, <strong>denn</strong> y <strong>sondern</strong> exigen <strong>OBLIGATORIAMENTE UNA COMA ANTES</strong> de su escritura:<br />
                • <em>Ich möchte kommen<strong>, aber</strong> ich habe keine Zeit.</em><br />
                • <em>Ich lerne Deutsch<strong>, denn</strong> ich wohne in Deutschland.</em>
              </p>
            </div>
          </div>
        )
      },
      {
        title: "Conectores Adverbiales de Posición 1 (dann, deshalb)",
        subtitle: "Conectores que ocupan espacio sintáctico y fuerzan la inversión verbal",
        content: () => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              A diferencia de ADUSO, conectores como <strong>dann</strong> (luego/después) y <strong>deshalb</strong> (por eso/por lo tanto) son adverbios. Ocupan físicamente la <strong>Posición 1</strong> de la segunda oración y <strong>FUERZAN INVERSIÓN VERBAL</strong>:
            </p>
            <div className="p-2.5 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs text-center border border-slate-800 shadow-inner">
              <code>[Conector Pos 1] + [VERBO CONJUGADO Pos 2] + [Sujeto Pos 3] + [Complementos]</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5 text-xs">
                <span className="font-bold text-amber-950 block text-sm">dann (luego / después)</span>
                <p className="text-amber-900/80">Secuencia temporal de acciones consecuentes:</p>
                <div className="p-2 bg-white rounded border border-amber-200 font-mono text-slate-800">
                  Ich esse, <strong className="text-amber-800">dann</strong> <strong className="text-indigo-700">gehe</strong> ich schlafen.
                </div>
              </div>
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5 text-xs">
                <span className="font-bold text-amber-950 block text-sm">deshalb (por eso / causa-efecto)</span>
                <p className="text-amber-900/80">Causa ➔ Consecuencia directa:</p>
                <div className="p-2 bg-white rounded border border-amber-200 font-mono text-slate-800">
                  Ich bin krank, <strong className="text-amber-800">deshalb</strong> <strong className="text-indigo-700">bleibe</strong> ich zu Hause.
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Reto Interactivo: Constructor de Oraciones Compuestas",
        subtitle: "Ensambla bloques con conectores de Posición 0 y Posición 1",
        content: props => (
          <DraggableSentenceBuilder 
            mode="advanced_connectors"
            pool={[
              { id: 1, words: ["Ich lerne Deutsch", "und", "ich", "verstehe", "alles"], correctOrder: ["Ich lerne Deutsch", "und", "ich", "verstehe", "alles"] },
              { id: 2, words: ["Er ist müde", "deshalb", "geht", "er", "ins Bett"], correctOrder: ["Er ist müde", "deshalb", "geht", "er", "ins Bett"] },
              { id: 3, words: ["Ich komme gerne", "aber", "ich", "habe", "keine Zeit"], correctOrder: ["Ich komme gerne", "aber", "ich", "habe", "keine Zeit"] }
            ]}
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_11',
    title: 'Capítulo 11: Declinación de Adjetivos en A1 (Débil y Mixta)',
    presentationUrl: 'https://drive.google.com/file/d/1uXg-DLwnQLSTdsSFbT8yPmHpTBWM2miu/view?usp=drive_web1',
    theme: 'blueprint',
    slides: [
      {
        title: "Declinación Débil (Tras der / die / das)",
        subtitle: "Principio de Redundancia: Cuando el artículo ya muestra el género con claridad",
        content: () => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Cuando el sustantivo va precedido por un artículo determinado (<strong>der, die, das</strong>), este ya revela claramente el género y caso. Por tanto, el adjetivo se divide únicamente en dos terminaciones:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-indigo-950 text-sm">1. El Club de la -e</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800">Singular Base</span>
                </div>
                <p className="text-indigo-900/80 text-[11px]">Nominativo Singular de todos los géneros y Acusativo Femenino/Neutro:</p>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="p-1.5 bg-white rounded border border-indigo-100 flex justify-between">
                    <span>🔵 Masc Nom:</span>
                    <strong className="text-indigo-700">der gut-e Mann</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-indigo-100 flex justify-between">
                    <span>🔴 Fem Nom/Akk:</span>
                    <strong className="text-indigo-700">die schön-e Frau</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-indigo-100 flex justify-between">
                    <span>🟢 Neut Nom/Akk:</span>
                    <strong className="text-indigo-700">das klein-e Kind</strong>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-rose-950 text-sm">2. El Club de la -en</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">Akk Masc + Plural</span>
                </div>
                <p className="text-rose-900/80 text-[11px]">Acusativo Masculino, Dativo y TODOS los Plurales:</p>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="p-1.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span>🔵 Masc Akk:</span>
                    <strong className="text-rose-700">den gut-en Mann</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span>🟣 Plural (Todos):</span>
                    <strong className="text-rose-700">die alt-en Bücher</strong>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-rose-100 flex justify-between">
                    <span>📍 Dativo:</span>
                    <strong className="text-rose-700">mit dem alt-en Mann</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950">
              💡 <strong>Regla de Oro:</strong> Si el artículo cambia de forma (ej. <em>der ➔ den / dem</em>) o es plural, ¡el adjetivo siempre termina en <strong>-en</strong>!
            </div>
          </div>
        )
      },
      {
        title: "Declinación Mixta (Tras ein / kein / mein...)",
        subtitle: "La Bandera de Rescate (Signalendung): Cuando el adjetivo debe revelar el género",
        content: () => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Las palabras <strong>ein</strong> (masculino) y <strong>ein</strong> (neutro) son idénticas en Nominativo. Al no revelar el género, el adjetivo está obligado a <strong>rescatar la terminación de der/die/das</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 font-sans block mb-1">🔵 Masculino (Rescata -er de 'der')</span>
                <div className="p-2 bg-white rounded border border-blue-100 text-slate-800 flex justify-between">
                  <span>ein gut<strong className="text-blue-700 underline decoration-2">-er</strong> Mann</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Nom)</span>
                </div>
                <div className="p-2 bg-white rounded border border-blue-100 text-slate-800 flex justify-between">
                  <span>einen alt<strong className="text-rose-600 underline decoration-2">-en</strong> Käse</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Akk)</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                <span className="font-bold text-emerald-900 font-sans block mb-1">🟢 Neutro (Rescata -es de 'das')</span>
                <div className="p-2 bg-white rounded border border-emerald-100 text-slate-800 flex justify-between">
                  <span>ein kalt<strong className="text-emerald-700 underline decoration-2">-es</strong> Bier</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Nom/Akk)</span>
                </div>
                <div className="p-2 bg-white rounded border border-emerald-100 text-slate-800 flex justify-between">
                  <span>mein neu<strong className="text-emerald-700 underline decoration-2">-es</strong> Auto</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Posesivo)</span>
                </div>
              </div>
              <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1">
                <span className="font-bold text-rose-900 font-sans block mb-1">🔴 Femenino (Rescata -e de 'die')</span>
                <div className="p-2 bg-white rounded border border-rose-100 text-slate-800 flex justify-between">
                  <span>eine schön<strong className="text-rose-700 underline decoration-2">-e</strong> Frau</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Nom/Akk)</span>
                </div>
              </div>
              <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl space-y-1">
                <span className="font-bold text-purple-900 font-sans block mb-1">🟣 Plural (Siempre -en)</span>
                <div className="p-2 bg-white rounded border border-purple-100 text-slate-800 flex justify-between">
                  <span>meine alt<strong className="text-purple-700 underline decoration-2">-en</strong> Bücher</span>
                  <span className="text-[10px] text-slate-400 font-sans">(Plural)</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Atajos de Examen Goethe A1 y La Trampa Predicativa",
        subtitle: "Cuándo el adjetivo NO se declina y la regla de aceleración de respuesta",
        content: () => (
          <div className="space-y-3.5 my-2">
            <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-950 text-sm">🚨 TRAMPA #1 DEL GOETHE: Adjetivo Predicativo (SIN DECLINACIÓN)</span>
                <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded-full">Atención</span>
              </div>
              <p className="text-rose-900 leading-relaxed">
                Si el adjetivo va <strong>DETRÁS del verbo</strong> (especialmente con <em>sein, werden, bleiben</em>) y NO acompaña directamente a un sustantivo, <strong>¡NO SE DECLINA NUNCA!</strong>
              </p>
              <div className="space-y-1 font-mono pt-1">
                <div className="p-2 bg-white rounded border border-rose-200 flex justify-between text-slate-800">
                  <span>• Das Auto ist <strong className="text-rose-600">neu</strong>.</span>
                  <span className="text-slate-400 font-sans text-[11px]">(Detrás del verbo ➔ SIN terminación)</span>
                </div>
                <div className="p-2 bg-white rounded border border-rose-200 flex justify-between text-slate-800">
                  <span>• Das <strong className="text-indigo-700">neue</strong> Auto ist teuer.</span>
                  <span className="text-slate-400 font-sans text-[11px]">(Delante del sustantivo ➔ Se declina)</span>
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-xs">⚡ Algoritmo de Respuesta Rápida:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                <div className="p-2 bg-white rounded border border-slate-200 text-center">
                  <span className="text-slate-500 font-sans block text-[10px]">¿Es Plural?</span>
                  <strong className="text-indigo-700 text-xs">Terminación -EN</strong>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 text-center">
                  <span className="text-slate-500 font-sans block text-[10px]">¿Acusativo Masc (den/einen)?</span>
                  <strong className="text-indigo-700 text-xs">Terminación -EN</strong>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 text-center">
                  <span className="text-slate-500 font-sans block text-[10px]">¿Dativo (dem/der/den)?</span>
                  <strong className="text-indigo-700 text-xs">Terminación -EN</strong>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Evaluador en Vivo: Declinación de Adjetivos",
        subtitle: "Completa la terminación correcta del adjetivo y recibe feedback instantáneo",
        content: props => (
          <LiveEvaluator 
            mode="adjective_declension"
            {...props} 
          />
        )
      }
    ]
  },
  {
    id: 'sp_12',
    title: 'Capítulo 12: Fórmulas de Cortesía (Konjunktiv II), Redemittel y Burocracia Oficial',
    presentationUrl: 'https://drive.google.com/file/d/1hvauciZnzhQPR7Jcvlhktq7VRdc_Xvrq/view?usp=drive_web',
    theme: 'blueprint',
    slides: [
      {
        title: "El Sándwich de Cortesía Oficial (Konjunktiv II en A1)",
        subtitle: "Cómo formular peticiones elegantes sin sonar autoritario ante examinadores",
        content: `En la prueba oral (*Sprechen Teil 3*) y escrita (*Schreiben Teil 2*), usar imperativos directos (*"Gib mir das!"*) resulta rudo. Los examinadores del Goethe premian las estructuras de **Konjunktiv II**:\n\n1. **Könnten Sie bitte... + [Akkusativ] + ...geben / wiederholen?**\n   * *"**Könnten Sie** das bitte **wiederholen**?"* (¿Podría por favor repetir eso? - Frase salvavidas en el examen oral).\n   * *"**Könnten Sie mir** bitte einen Stift **geben**?"*\n\n2. **Würden Sie bitte... + [Infinitivo]?**\n   * *"**Würden Sie** bitte das Fenster **schließen**?"* (¿Sería tan amable de cerrar la ventana?).\n\n3. **Ich hätte gern... + [Akkusativ]:**\n   * *"Ich **hätte gern** ein Glas Wasser."* (Desearía / Me gustaría tener... - en restaurantes y hoteles).\n   * *"Ich **hätte gern** einen Termin am Dienstag."*\n\n4. **Ich möchte... + [Infinitivo]:**\n   * *"Ich **möchte** mich für den Kurs **anmelden**."* (Quisiera inscribirme en el curso).`
      },
      {
        title: "Kit Maestro de Redacción de Correos (Schreiben Teil 2)",
        subtitle: "Estructura oficial para redactar los 3 Leitpunkte cubriendo de 25 a 45 palabras",
        content: () => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              En la prueba escrita (<em>Schreiben Teil 2</em>), debes redactar un mensaje cubriendo los 3 puntos solicitados. Sigue esta plantilla oficial:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs border-b pb-1 border-slate-200">1. Encabezado y Saludo</span>
                <p className="text-slate-600"><strong>Informal:</strong></p>
                <p className="font-mono text-indigo-700">Liebe Maria, / Lieber Markus,</p>
                <p className="text-slate-600 pt-1"><strong>Formal:</strong></p>
                <p className="font-mono text-indigo-700">Sehr geehrte Frau Müller, / Sehr geehrter Herr Schneider,</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs border-b pb-1 border-slate-200">2. Cuerpo del Texto</span>
                <p className="text-slate-600 leading-relaxed">
                  Responde los 3 puntos con oraciones simples y conectores (<em>denn, aber, deshalb</em>):
                </p>
                <p className="font-mono text-slate-800 bg-white p-1.5 rounded border border-slate-200 text-[11px]">
                  Ich kann am Samstag nicht kommen, <strong>denn</strong> ich bin krank.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-bold text-slate-900 block text-xs border-b pb-1 border-slate-200">3. Despedida Oficial</span>
                <p className="text-slate-600"><strong>Informal:</strong></p>
                <p className="font-mono text-indigo-700">Viele Grüße / Liebe Grüße</p>
                <p className="text-slate-600 pt-1"><strong>Formal:</strong></p>
                <p className="font-mono text-indigo-700">Mit freundlichen Grüßen</p>
              </div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
              <span className="font-bold block">🚨 Trampa Fatal en el Saludo:</span>
              <p className="leading-relaxed">
                Tras la coma del saludo (ej: <em>Liebe Maria,</em>), la primera palabra del cuerpo <strong>DEBE EMPEZAR EN MINÚSCULA</strong>:<br />
                • Correcto: <em>Liebe Maria,<br /><strong>i</strong>ch danke dir für die Einladung.</em><br />
                • Y las despedidas alemanas <strong>NUNCA llevan coma al final</strong>.
              </p>
            </div>
          </div>
        )
      },
      {
        title: "Redemittel de Burocracia Alemana y Servicios Oficiales",
        subtitle: "Frases indispensables para el Bürgeramt, citas médicas y la estación",
        content: `Frases fijas para las pruebas de situación cotidiana en el Goethe A1:\n\n🏢 **En el Bürgeramt (Oficina de Empadronamiento / Registro):**\n* *"Ich möchte meinen Wohnsitz **anmelden**."* (Quiero registrar mi residencia).\n* *"Hier sind mein **Reisepass** und die **Wohnungsgeberbestätigung**."*\n* *"Wo muss ich **unterschreiben**?"* (¿Dónde debo firmar?).\n\n🏥 **En la Consulta Médica (Beim Arzt):**\n* *"Ich habe starke **Kopfschmerzen** und **Fieber**."* (Tengo dolor de cabeza y fiebre).\n* *"Ich brauche eine **Krankmeldung** für meinen Arbeitgeber."* (Baja médica para el trabajo).\n* *"Wie oft muss ich die Tabletten **nehmen**?"*\n\n🚆 **En la Estación de Trenes (Am Bahnhof):**\n* *"Fährt dieser Zug direkt nach Frankfurt?"* (¿Va este tren directo a Fráncfort?).\n* *"Von welchem **Gleis** fährt der Zug ab?"* (¿De qué andén sale el tren?).\n* *"Hat der Zug **Verspätung**?"* (¿Tiene retraso el tren?).`
      },
      {
        title: "Simulador de Voz: Peticiones y Redemittel Oficiales",
        subtitle: "Escucha y practica las fórmulas de cortesía y preguntas clave del Goethe A1",
        content: props => (
          <VoiceExaminer 
            autoStart={false} 
            isInteractive={true} 
            mode="courtesy_formulas" 
            question="Formula la petición cortés oficial para el Goethe A1:"
            expectedKeywords={["könnten", "können", "würden", "hätte", "bitte", "wiederholen", "termin", "pass", "wasser"]}
            note="Tip Examen Goethe A1: En la parte 3 de Sprechen, usa 'Könnten Sie bitte...?' para obtener la máxima puntuación."
            scenarios={[
              {
                context: "🗣️ En el Examen Oral (Frase Salvavidas)",
                instruction: "Pide al examinador que repita:",
                german: "Könnten Sie das bitte wiederholen?",
                translation: "(¿Podría por favor repetir eso?)",
                tip: "Fórmula cortés con Konjunktiv II."
              },
              {
                context: "🏨 En el Hotel / Restaurante",
                instruction: "Pide una habitación cortésmente:",
                german: "Ich hätte gern ein Einzelzimmer.",
                translation: "(Desearía una habitación individual.)",
                tip: "Uso de 'hätte gern' con Acusativo neutro."
              },
              {
                context: "📋 En la Oficina Pública",
                instruction: "Pide ayuda con el formulario:",
                german: "Können Sie mir bitte helfen?",
                translation: "(¿Puede usted ayudarme por favor?)",
                tip: "Petición con 'helfen' + Dativo 'mir'."
              }
            ]}
            {...props}
          />
        )
      }
    ]
  },

  // =========================================================================
  // BLOQUE V: SINTAXIS SUBORDINADA, COHESIÓN B1 Y FUNDAMENTOS B2 (sp_13 a sp_16)
  // =========================================================================
  {
    id: 'sp_13',
    title: 'Capítulo 13 (B1): Oraciones Subordinadas (Nebensätze: weil, dass, obwohl, wenn/als)',
    theme: 'blueprint',
    slides: [
      {
        title: "El Motor Nebensatz: El Verbo Conjugado al Final Absoluto",
        subtitle: "Cómo cambia la gravedad de la oración tras conjunciones subordinantes",
        content: () => (
          <div className="space-y-3.5 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              En nivel B1 dejas de encadenar solo frases cortas. Las conjunciones subordinantes (<strong>weil</strong>, <strong>dass</strong>, <strong>obwohl</strong>, <strong>damit</strong>, <strong>wenn</strong>, <strong>als</strong>, <strong>ob</strong>) exigen <strong>COMA obligatoria</strong> y expulsan al verbo conjugado hasta el <strong>último lugar antes del punto</strong>:
            </p>
            <SyntaxFlow
              steps={[
                { badge: "1", name: "Oración Principal (Hauptsatz)", description: "Orden normal V2: Ich lerne Deutsch" },
                { badge: ",", name: "Coma Obligatoria + Conector", description: ", weil / dass / obwohl / wenn" },
                { badge: "2", name: "Sujeto + Complementos", description: "ich in Deutschland arbeiten (sin verbo aún)" },
                { badge: "🔒", name: "Verbo Conjugado AL FINAL", description: "... möchte. (Verbo-p2 al cierre absoluto)" }
              ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
                <strong className="text-indigo-950 block">weil / da (Causa - Porque / Ya que)</strong>
                <p className="font-mono text-indigo-800">Ich bleibe hier, <strong>weil</strong> ich viel Arbeit <strong>habe</strong>.</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <strong className="text-emerald-950 block">obwohl (Concesión - Aunque)</strong>
                <p className="font-mono text-emerald-800">Wir arbeiten weiter, <strong>obwohl</strong> es kalt <strong>ist</strong>.</p>
              </div>
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-1">
                <strong className="text-sky-950 block">dass (Declarativa - Que)</strong>
                <p className="font-mono text-sky-800">Ich hoffe, <strong>dass</strong> der Kunde zufrieden <strong>ist</strong>.</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <strong className="text-amber-950 block">ob (Pregunta Indirecta - Si...)</strong>
                <p className="font-mono text-amber-900">Ich weiß nicht, <strong>ob</strong> die Wallbox schon <strong>läuft</strong>.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Choque de Verbos: ¡Verbo, Coma, Verbo!",
        subtitle: "Qué ocurre cuando abres la oración con la subordinada en Posición 1",
        content: () => (
          <div className="space-y-3 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Toda la cláusula subordinada ocupa la <strong>Posición 1</strong> si va delante. Por ley V2, justo después de la coma debe ir inmediatamente el verbo conjugado de la principal:
            </p>
            <div className="p-3.5 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs sm:text-sm text-center border border-slate-800">
              <code>[Weil / Wenn ... VERBO_1] , [VERBO_2] + [Sujeto] + [Complementos]</code>
            </div>
            <GrammarAccordion title="⏳ El Duelo Temporal B1: wenn vs. als">
              <div className="space-y-2 text-xs sm:text-sm">
                <p><strong>1. wenn (Presente, Futuro o Pasado repetido &gt;1 vez):</strong></p>
                <p className="font-mono text-indigo-700 bg-indigo-50 p-2 rounded">• Immer <strong>wenn</strong> ich nach Berlin fahre, besuche ich meinen Bruder.</p>
                <p><strong>2. als (Evento ÚNICO en el pasado o etapa vital irrepetible):</strong></p>
                <p className="font-mono text-rose-700 bg-rose-50 p-2 rounded">• <strong>Als</strong> ich nach Deutschland kam, sprach ich kaum Deutsch.</p>
              </div>
            </GrammarAccordion>
            <InteractiveQA
              question="Warum lernst du jeden Tag Technisches Deutsch?"
              answer="Weil ich im Technikraum sicher mit Kunden und Kollegen sprechen möchte."
              note="Nota el verbo modal 'möchte' desplazado al final absoluto de la respuesta con 'weil'."
            />
          </div>
        )
      },
      {
        title: "Reto B1: Constructor de Cláusulas Subordinadas",
        subtitle: "Ordena los bloques manteniendo el verbo conjugado al cierre de la subordinada",
        content: props => (
          <DraggableSentenceBuilder
            mode="b1_subordinate"
            pool={[
              { id: 1, words: ["Ich prüfe das Kabel,", "weil", "die Spannung", "wichtig", "ist"], correctOrder: ["Ich prüfe das Kabel,", "weil", "die Spannung", "wichtig", "ist"] },
              { id: 2, words: ["Er kommt pünktlich,", "obwohl", "der Zug", "Verspätung", "hat"], correctOrder: ["Er kommt pünktlich,", "obwohl", "der Zug", "Verspätung", "hat"] },
              { id: 3, words: ["Wenn ich Zeit habe,", "lese", "ich", "ein Buch"], correctOrder: ["Wenn ich Zeit habe,", "lese", "ich", "ein Buch"] }
            ]}
            {...props}
          />
        )
      }
    ]
  },
  {
    id: 'sp_14',
    title: 'Capítulo 14 (B1): Cohesión Lógica (deshalb, trotzdem, zwar ... aber, um ... zu / damit)',
    theme: 'blueprint',
    slides: [
      {
        title: "El Mapa de Cohesión: Posición 0 vs. Posición 1 vs. Nebensatz",
        subtitle: "Domina los tres motores sintácticos del nivel Goethe B1 y DTZ",
        content: () => (
          <div className="space-y-3 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              En B1 no basta saber qué significa un conector: debes controlar <strong>dónde coloca el verbo</strong>. Compara los pares clave:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-2.5">Relación Lógica</th>
                    <th className="p-2.5">Pos. 1 (Inversión Verbo-Sujeto)</th>
                    <th className="p-2.5">Subordinada (Verbo al Final)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Consecuencia / Causa</td>
                    <td className="p-2.5 font-mono text-amber-800">Es regnet, <strong>deshalb bleibe</strong> ich hier.</td>
                    <td className="p-2.5 font-mono text-indigo-800">Ich bleibe hier, <strong>weil</strong> es <strong>regnet</strong>.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Concesión (Sin embargo / Aunque)</td>
                    <td className="p-2.5 font-mono text-amber-800">Es ist spät, <strong>trotzdem arbeite</strong> ich.</td>
                    <td className="p-2.5 font-mono text-indigo-800">Ich arbeite, <strong>obwohl</strong> es spät <strong>ist</strong>.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Finalidad (Para qué)</td>
                    <td className="p-2.5 font-mono text-emerald-800">Mismo sujeto: ... <strong>um</strong> Deutsch <strong>zu</strong> lernen.</td>
                    <td className="p-2.5 font-mono text-purple-800">Distinto sujeto: ... <strong>damit</strong> er mich <strong>versteht</strong>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950">
              🎯 <strong>Conector Doble Estelar B1 (zwar ... aber):</strong> *"Das Gerät ist <strong>zwar</strong> teuer, <strong>aber</strong> es spart viel Strom."* (Concede una ventaja/desventaja antes de contrastarla — puntaje seguro en <em>Schreiben B1</em>).
            </div>
          </div>
        )
      },
      {
        title: "Infinitivo con 'zu' y Finalidad (um ... zu vs. damit)",
        subtitle: "Cuándo omitir el sujeto y construir elegancia B1",
        content: `Regla de oro para expresar propósito en alemán B1:\n\n1. **um ... + zu + [Infinitivo]** (Mismo sujeto en ambas partes):\n   * *Ich fahre in den Technikraum, **um** den Wechselrichter **zu** prüfen.* (Yo voy ... para revisar).\n   * Con verbos separables, **zu** se inserta dentro de la pinza: *aufmachen* ➔ *auf**zu**machen*, *anmelden* ➔ *an**zu**melden*.\n\n2. **damit + [Sujeto] + ... + [Verbo Conjugado al final]** (Sujetos distintos):\n   * *Ich erkläre den Plan genau, **damit** der Kunde alles **versteht**.*\n\n3. **Otros pares de conectores dobles B1:**\n   * **sowohl ... als auch** (tanto ... como): *Wir prüfen **sowohl** die Batterie **als auch** das Smart Meter.*\n   * **entweder ... oder** (o bien ... o): *Wir machen das **entweder** heute **oder** morgen.*`
      },
      {
        title: "Evaluador B1: Conectores Lógicos y Finalidad",
        subtitle: "Completa el conector exacto (deshalb, trotzdem, obwohl, um, damit) y escucha",
        content: props => (
          <LiveEvaluator
            exercises={[
              { text: "Es ist dunkel, ___ schalten wir die Lampe ein.", answer: "deshalb", translation: "Está oscuro, por eso encendemos la lámpara (Posición 1 + inversión)." },
              { text: "Ich bin sehr müde, ___ gehe ich ins Training.", answer: "trotzdem", translation: "Estoy muy cansado, sin embargo voy a entrenar (Posición 1)." },
              { text: "Wir prüfen die Sicherung, ___ alles sicher funktioniert.", answer: "damit", translation: "Comprobamos el fusible para que todo funcione seguro (sujetos distintos)." },
              { text: "Er lernt jeden Abend, ___ die B1-Prüfung zu bestehen.", answer: "um", translation: "Él estudia cada tarde para aprobar el examen B1 (um ... zu + infinitivo)." }
            ]}
            {...props}
          />
        )
      },
      {
        title: "Reto de Cohesión B1: Posición 1 con Inversión",
        subtitle: "Ensambla la consecuencia y la concesión respetando la regla V2",
        content: props => (
          <DraggableSentenceBuilder
            mode="b1_cohesion"
            pool={[
              { id: 1, words: ["Der Akku ist leer,", "deshalb", "laden", "wir", "ihn"], correctOrder: ["Der Akku ist leer,", "deshalb", "laden", "wir", "ihn"] },
              { id: 2, words: ["Es regnet stark,", "trotzdem", "fahren", "wir", "los"], correctOrder: ["Es regnet stark,", "trotzdem", "fahren", "wir", "los"] }
            ]}
            {...props}
          />
        )
      }
    ]
  },
  {
    id: 'sp_15',
    title: 'Capítulo 15 (B1): Dominio Temporal (Perfekt Avanzado, Präteritum y Plusquamperfekt)',
    theme: 'medical',
    slides: [
      {
        title: "Los Tres Escudos del Partizip II en Nivel B1",
        subtitle: "Regulares con -t, irregulares con -en y cuándo NUNCA añadir 'ge-'",
        content: () => (
          <div className="space-y-3 my-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                <span className="font-bold text-emerald-950 block">1. Separables: prefijo + GE + raíz</span>
                <p className="text-slate-600">El prefijo tónico abre paso al infijo <em>-ge-</em>:</p>
                <p className="font-mono text-emerald-800">ab|holen ➔ ab<strong>ge</strong>holt</p>
                <p className="font-mono text-emerald-800">an|schließen ➔ an<strong>ge</strong>schlossen</p>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5">
                <span className="font-bold text-rose-950 block">2. Inseparables: SIN GE-</span>
                <p className="text-slate-600">Prefijos <em>be-, ge-, er-, ver-, zer-, ent-, emp-, miss-</em>:</p>
                <p className="font-mono text-rose-800">verstehen ➔ <strong>verstanden</strong></p>
                <p className="font-mono text-rose-800">besprechen ➔ <strong>besprochen</strong></p>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1.5">
                <span className="font-bold text-indigo-950 block">3. Terminados en -ieren: SIN GE-</span>
                <p className="text-slate-600">Todo verbo técnico/latino en <em>-ieren</em> termina en <em>-iert</em>:</p>
                <p className="font-mono text-indigo-800">installieren ➔ <strong>installiert</strong></p>
                <p className="font-mono text-indigo-800">reparieren ➔ <strong>repariert</strong></p>
              </div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
              ⚡ <strong>Plusquamperfekt B1 (Pasado del Pasado con nachdem):</strong><br />
              <em>"<strong>Nachdem</strong> ich den Zählerschrank geprüft <strong>hatte</strong>, schaltete ich den Wechselrichter ein."</em> (Auxiliar en Präteritum <code>hatte/war</code> + Partizip II).
            </div>
          </div>
        )
      },
      {
        title: "Präteritum B1: Modales, Relato Técnico y Prensa",
        subtitle: "Formas clave del pasado escrito y narrativo",
        content: `En B1 necesitas entender noticias, correos formales y manuales en **Präteritum** sin traducir al *Perfekt*:\n\n* **Modales en Präteritum (SIN diéresis):**\n  * *können* ➔ **konnte** | *müssen* ➔ **musste** | *dürfen* ➔ **durfte** | *wollen* ➔ **wollte** | *sollen* ➔ **sollte**\n  * Ejemplo: *"Gestern **musste** ich den Termin verschieben."*\n\n* **Verbos Fuertes de Alta Frecuencia en B1:**\n  * *gehen* ➔ **ging** | *kommen* ➔ **kam** | *sehen* ➔ **sah** | *finden* ➔ **fand** | *geben* ➔ **gab** | *werden* ➔ **wurde**\n  * Ejemplo: *"Es **gab** ein Problem mit der Spannung, aber der Elektriker **fand** den Fehler sofort."*`
      },
      {
        title: "Línea Temporal B1 y Pinza de Participios",
        subtitle: "Alterna presente y Perfekt y verifica prefijos separables e inseparables",
        content: props => (
          <div className="space-y-4">
            <MechanicalTimeline
              present={{ subject: "Der Monteur", verb: "installiert", complement: "die Wallbox im Keller" }}
              past={{ auxiliary: "hat", participle: "installiert" }}
              {...props}
            />
            <PincerSwitch {...props} />
          </div>
        )
      }
    ]
  },
  {
    id: 'sp_16',
    title: 'Capítulo 16 (B1–B2): Relativsätze, Passiv Vorgang, Konjunktiv II y Redemittel de Debate',
    theme: 'blueprint',
    slides: [
      {
        title: "Oraciones de Relativo (Relativsätze) y Caso del Pronombre",
        subtitle: "El género viene del sustantivo anterior; el caso depende del verbo de la subordinada",
        content: () => (
          <div className="space-y-3 my-2">
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              Las <strong>Relativsätze</strong> describen un sustantivo sin repetirlo, van entre comas y mandan el verbo al final:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 font-sans block">Nominativo (Sujeto)</span>
                <p className="text-slate-800">Der Techniker, <strong>der</strong> heute hier <strong>arbeitet</strong>, ...</p>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                <span className="font-bold text-rose-900 font-sans block">Acusativo (Objeto directo)</span>
                <p className="text-slate-800">Das Werkzeug, <strong>das</strong> ich <strong>brauche</strong>, ...</p>
                <p className="text-slate-800">Der Bericht, <strong>den</strong> ich <strong>schreibe</strong>, ...</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-900 font-sans block">Dativo (+ Prep. / helfen)</span>
                <p className="text-slate-800">Die Kollegin, <strong>der</strong> ich <strong>helfe</strong>, ...</p>
                <p className="text-slate-800">Die Kunden, <strong>denen</strong> wir <strong>antworten</strong>, ...</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Fundamentos B1–B2: Passiv (werden + Partizip II) y Konjunktiv II",
        subtitle: "Procesos técnicos impersonales e hipótesis irreales",
        content: `Dos llaves maestras que separan el B1 sólido del nivel B2:\n\n1. **Vorgangspassiv (Pasiva de Proceso Técnico): \`werden + Partizip II\`**\n   * Presente: *"Der Speicher **wird** im Keller **montiert**."* (El acumulador es montado en el sótano).\n   * Präteritum: *"Die Wallbox **wurde** gestern **geprüft**."* (La Wallbox fue verificada ayer).\n   * Modal Pasivo: *"Die fünf Sicherheitsregeln **müssen** immer **beachtet werden**."*\n\n2. **Konjunktiv II Irreal (Condiciones e Hipótesis):**\n   * *wenn + hätte / wäre / könnte / würde + Infinitivo:*\n   * *"**Wenn** ich mehr Zeit **hätte**, **würde** ich einen B2-Kurs **besuchen**."*`
      },
      {
        title: "Debate Oral B1 / DTZ: Opinión, Ventajas y Contras",
        subtitle: "Bloques evaluados en Goethe Sprechen Teil 2 y examen DTZ",
        content: props => (
          <div className="space-y-4">
            <GrammarAccordion title="💬 Redemittel de Opinión y Argumentación B1">
              <ul className="space-y-1.5 text-xs sm:text-sm list-disc pl-4 text-slate-700">
                <li><strong>Dar opinión:</strong> <em>Meiner Meinung nach ist das sehr sinnvoll. / Ich bin der Ansicht, dass...</em></li>
                <li><strong>Ventajas y desventajas:</strong> <em>Ein großer Vorteil ist... / Auf der anderen Seite muss man bedenken, dass...</em></li>
                <li><strong>Acuerdo y objeción educada:</strong> <em>Da stimme ich Ihnen völlig zu. / Das sehe ich etwas anders, denn...</em></li>
              </ul>
            </GrammarAccordion>
            <VoiceExaminer
              examBadge="Examinador Oficial Goethe B1 / DTZ"
              question="Formula una opinión argumentada de nivel B1 usando conectores:"
              expectedKeywords={["meiner meinung", "weil", "obwohl", "deshalb", "vorteil", "wird", "hätte"]}
              note="Tip B1/DTZ: Combina 'Meiner Meinung nach...' + una subordinada con 'weil' o 'dass' para asegurar la nota máxima."
              scenarios={[
                {
                  context: "💼 Debate Laboral B1",
                  instruction: "Expresa tu opinión sobre la formación técnica:",
                  german: "Meiner Meinung nach ist Weiterbildung wichtig, weil sich die Technik schnell ändert.",
                  translation: "(En mi opinión, la formación continua es importante porque la técnica cambia rápido.)",
                  tip: "Opinión + subordinada causal 'weil' con verbo al final."
                },
                {
                  context: "⚡ Pasiva Técnica (Enpal / Werkstatt)",
                  instruction: "Describe el proceso en pasado:",
                  german: "Der Zählerschrank wurde gestern im Technikraum geprüft.",
                  translation: "(El armario de contadores fue revisado ayer en la sala técnica.)",
                  tip: "Passiv Präteritum: 'wurde ... geprüft'."
                },
                {
                  context: "🤝 Consenso / Propuesta Oral B1",
                  instruction: "Propón una solución con Konjunktiv II:",
                  german: "Wir könnten den Termin auf Freitag verschieben, wenn das für Sie passt.",
                  translation: "(Podríamos aplazar la cita al viernes, si eso le viene bien.)",
                  tip: "Konjunktiv II ('könnten') + condicional ('wenn ... passt')."
                }
              ]}
              {...props}
            />
          </div>
        )
      }
    ]
  }
];
