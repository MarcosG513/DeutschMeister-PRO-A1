// src/data/drivingAcademyCurriculum.js

export const drivingAcademyClasses = [
  // ===========================================================================
  // NIVEL A1: SUSTANTIVOS, ARTÍCULOS, VERBOS FRECUENTES, MODALES Y PRONOMBRES
  // ===========================================================================
  {
    id: "a1_sustantivos_articulos",
    level: "A1",
    title: "Clase A1.1: Sustantivos Más Usados, Artículos y el Cambio a 'den'",
    subtitle: "der, die, das, ein/kein/mein y los 15 sustantivos clave del día a día",
    badgeColor: "emerald",
    steps: [
      {
        stepType: "coach",
        title: "Los 3 Artículos y la Regla del Acusativo Masculino",
        promptEs: "En alemán conversacional, memoriza cada sustantivo con su artículo: der Termin (la cita, masculino), die Zeit (el tiempo, femenino) y das Auto (el coche, neutro). Cuando tienes, buscas o necesitas algo, solo el masculino cambia de der a den, de ein a einen y de kein a keinen.",
        targetDe: "Ich habe heute leider keine Zeit, aber ich habe einen Termin.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "El Tiempo y el Trabajo (Femeninos con die)",
        blockPromptEs: "¿Cómo dices: el tiempo y el trabajo?",
        blockTargetDe: "die Zeit und die Arbeit",
        promptEs: "¿Cómo dices: Hoy tengo mucho trabajo y no tengo tiempo?",
        targetDe: "Heute habe ich viel Arbeit und ich habe keine Zeit.",
        tipEs: "Como die Zeit es femenino, la negación lleva e al final: keine Zeit.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "La Cita y la Llave (Masculinos en Acusativo: einen / den)",
        blockPromptEs: "¿Cómo dices: una cita y la llave?",
        blockTargetDe: "der Termin und der Schlüssel",
        promptEs: "¿Cómo dices: Tengo una cita ahora y busco la llave?",
        targetDe: "Ich habe jetzt einen Termin und ich suche den Schlüssel.",
        tipEs: "Con haben y suchen, der Termin pasa a einen Termin y der Schlüssel pasa a den Schlüssel.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "El Problema y el Dinero (Neutros con das)",
        blockPromptEs: "¿Cómo dices: el problema y el dinero?",
        blockTargetDe: "das Problem und das Geld",
        promptEs: "¿Cómo dices: Eso no es ningún problema, tengo el dinero aquí?",
        targetDe: "Das ist kein Problem, ich habe das Geld hier.",
        tipEs: "Los sustantivos neutros con das usan kein sin e final: kein Problem.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "La Pregunta y la Respuesta (Terminaciones en -e y -ung)",
        blockPromptEs: "¿Cómo dices: una pregunta y una factura?",
        blockTargetDe: "eine Frage und eine Rechnung",
        promptEs: "¿Cómo dices: Tengo una pregunta sobre la factura?",
        targetDe: "Ich habe eine Frage zu der Rechnung.",
        tipEs: "Todas las palabras terminadas en ung como die Rechnung o die Wohnung son siempre femeninas.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "El Coche, el Teléfono y el Ordenador",
        blockPromptEs: "¿Cómo dices: el coche y el ordenador?",
        blockTargetDe: "das Auto und der Computer",
        promptEs: "¿Cómo dices: Necesito el coche hoy y también necesito mi ordenador?",
        targetDe: "Ich brauche heute das Auto und ich brauche auch meinen Computer.",
        tipEs: "Der Computer es masculino, por eso en acusativo decimos meinen Computer.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "El Café, el Agua y el Pan en la Pausa",
        blockPromptEs: "¿Cómo dices: un café y un agua?",
        blockTargetDe: "einen Kaffee und ein Wasser",
        promptEs: "¿Cómo dices: Tomo un café y compro un pan?",
        targetDe: "Ich nehme einen Kaffee und ich kaufe ein Brot.",
        tipEs: "Der Kaffee es masculino (einen Kaffee), mientras que das Wasser y das Brot son neutros (ein Wasser, ein Brot).",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Negar con 'kein' vs. 'nicht'",
        blockPromptEs: "¿Cómo dices: no tengo coche?",
        blockTargetDe: "ich habe kein Auto",
        promptEs: "¿Cómo dices: Hoy no tengo coche, por eso no vengo en coche?",
        targetDe: "Ich habe heute kein Auto, deshalb komme ich nicht mit dem Auto.",
        tipEs: "Usa kein antes de un sustantivo sin artículo (kein Auto) y usa nicht para negar la acción.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 1: Antes de Salir de Casa",
        promptEs: "Tu esposa te pregunta si tienes la llave del coche y los documentos. Dile que tienes los documentos, pero que todavía buscas la llave.",
        questionDe: "Hast du schon den Autoschlüssel und die Unterlagen?",
        targetDe: "Ich habe die Unterlagen, aber ich suche noch den Autoschlüssel.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 2: En la Recepción del Cliente",
        promptEs: "El cliente te pregunta si tienes tiempo para una pregunta rápida. Dile que sí, que por supuesto tienes tiempo.",
        questionDe: "Entschuldigung, haben Sie kurz Zeit für eine Frage?",
        targetDe: "Ja natürlich, ich habe Zeit. Was ist Ihre Frage?",
        pauseSec: 6
      }
    ]
  },
  {
    id: "a1_verbos_mas_usados",
    level: "A1",
    title: "Clase A1.2: Los 12 Verbos Más Usados en una Conversación Real",
    subtitle: "sein, haben, machen, gehen, kommen, geben (es gibt), nehmen, sprechen, wissen y kennen",
    badgeColor: "emerald",
    steps: [
      {
        stepType: "coach",
        title: "El Núcleo Verbal de la Conversación Diaria",
        promptEs: "Con doce verbos puedes sostener casi cualquier conversación: sein, haben, machen, gehen, kommen, geben, nehmen, sprechen, brauchen, helfen, wissen y kennen. Presta especial atención al cambio de vocal cuando hablas de tú o de él: du sprichst (hablas), du nimmst (tomas), du fährst (conduces) y du hilfst (ayudas).",
        targetDe: "Ich spreche schon gut Deutsch und du sprichst auch sehr klar.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Verbos 'sein' y 'haben' en el trabajo",
        blockPromptEs: "¿Cómo dices: estoy listo y tengo todo?",
        blockTargetDe: "ich bin bereit und ich habe alles",
        promptEs: "¿Cómo dices: Estamos ya aquí y tenemos todas las herramientas?",
        targetDe: "Wir sind schon hier und wir haben alle Werkzeuge.",
        tipEs: "Con wir (nosotros), el verbo sein es 'wir sind' y el verbo haben es 'wir haben'.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Verbos 'machen', 'gehen' y 'kommen'",
        blockPromptEs: "¿Cómo dices: ¿qué haces y cuándo vienes?",
        blockTargetDe: "was machst du und wann kommst du?",
        promptEs: "¿Cómo dices: ¿Qué haces hoy y a qué hora vienes a casa?",
        targetDe: "Was machst du heute und wann kommst du nach Hause?",
        tipEs: "En preguntas con Was o Wann, el verbo conjugado va siempre en segunda posición.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "La fórmula 'es gibt' (Hay) en conversación",
        blockPromptEs: "¿Cómo dices: hoy hay?",
        blockTargetDe: "heute gibt es",
        promptEs: "¿Cómo dices: En la autopista hay hoy un atasco grande?",
        targetDe: "Auf der Autobahn gibt es heute einen großen Stau.",
        tipEs: "'Es gibt' significa 'hay' y siempre pide acusativo: einen großen Stau.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Verbos con cambio a 'i': 'sprechen', 'nehmen' y 'geben'",
        blockPromptEs: "¿Cómo dices: tú hablas y tú tomas?",
        blockTargetDe: "du sprichst und du nimmst",
        promptEs: "¿Cómo dices: ¿Hablas alemán y tomas también un café?",
        targetDe: "Sprichst du Deutsch und nimmst du auch einen Kaffee?",
        tipEs: "Al preguntar directamente de tú, el verbo abre en posición uno con cambio vocálico: Sprichst du, Nimmst du.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Verbos con cambio a 'ä': 'fahren' y 'schlafen'",
        blockPromptEs: "¿Cómo dices: yo conduzco y tú conduces?",
        blockTargetDe: "ich fahre und du fährst",
        promptEs: "¿Cómo dices: Yo conduzco hoy despacio, pero tú conduces muy rápido?",
        targetDe: "Ich fahre heute langsam, aber du fährst sehr schnell.",
        tipEs: "Fahren cambia la a por ä en du y er: du fährst, er fährt.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Diferencia entre 'wissen' (saber dato) y 'kennen' (conocer)",
        blockPromptEs: "¿Cómo dices: no lo sé, pero conozco?",
        blockTargetDe: "ich weiß es nicht, aber ich kenne",
        promptEs: "¿Cómo dices: No sé dónde está la calle, pero conozco al cliente?",
        targetDe: "Ich weiß nicht, wo die Straße ist, aber ich kenne den Kunden.",
        tipEs: "Usa 'ich weiß' para información o frases con dónde/cuándo, y usa 'ich kenne' para personas o lugares.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Verbos 'brauchen' (necesitar) y 'helfen' (ayudar + Dativo)",
        blockPromptEs: "¿Cómo dices: necesito ayuda, ¿me ayudas?",
        blockTargetDe: "ich brauche Hilfe, hilfst du mir?",
        promptEs: "¿Cómo dices: Necesito tu ayuda ahora, ¿me ayudas un momento?",
        targetDe: "Ich brauche jetzt deine Hilfe, hilfst du mir kurz?",
        tipEs: "El verbo helfen exige siempre dativo: 'hilfst du mir' (a mí) y 'ich helfe dir' (a ti).",
        pauseSec: 6
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 1: Coordinación con el Compañero",
        promptEs: "Tu colega te pregunta quién conduce hoy la furgoneta hacia la obra. Dile que hoy conduces tú porque conoces bien el camino.",
        questionDe: "Wer fährt heute den Transporter zur Baustelle?",
        targetDe: "Heute fahre ich, weil ich den Weg sehr gut kenne.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 2: Pidiendo Ayuda en Obra",
        promptEs: "Tu compañero te pregunta qué necesitas ahora mismo. Dile que necesitas la escalera y pregúntale si puede ayudarte.",
        questionDe: "Sag mal, was brauchst du gerade?",
        targetDe: "Ich brauche die Leiter. Kannst du mir bitte kurz helfen?",
        pauseSec: 7
      }
    ]
  },
  {
    id: "a1_verbos_modales_conversacion",
    level: "A1",
    title: "Clase A1.3: Los 6 Verbos Modales y el Sándwich con Separables",
    subtitle: "können, müssen, wollen, möchten, dürfen, sollen + verbos separables al final",
    badgeColor: "emerald",
    steps: [
      {
        stepType: "coach",
        title: "La Pinza Modal y la Regla del Verbo Separable Unido",
        promptEs: "Con los seis verbos modales colocas el modal conjugado en posición dos y envías la acción principal al final en infinitivo. Y recuerda la regla del sándwich verbal: cuando combinas un verbo modal con un verbo separable como aufstehen, anrufen o einschalten, el verbo separable ya no se rompe, sino que va completo y unido al final.",
        targetDe: "Ich muss morgen um sechs Uhr aufstehen und den Kunden anrufen.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Habilidad y petición con 'können' (poder)",
        blockPromptEs: "¿Cómo dices: yo puedo y tú puedes?",
        blockTargetDe: "ich kann und du kannst",
        promptEs: "¿Cómo dices: ¿Puedes pasarme la llave inglesa, por favor?",
        targetDe: "Kannst du mir bitte den Schraubenschlüssel geben?",
        tipEs: "Kannst abre la pregunta en posición uno y el infinitivo geben cierra la pinza al final.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Obligación diaria con 'müssen' (tener que)",
        blockPromptEs: "¿Cómo dices: tengo que trabajar y tenemos que irnos?",
        blockTargetDe: "ich muss arbeiten und wir müssen fahren",
        promptEs: "¿Cómo dices: Primero tenemos que desconectar la electricidad?",
        targetDe: "Zuerst müssen wir den Strom abschalten.",
        tipEs: "Como hay modal ('müssen'), el verbo separable 'abschalten' va completo y unido al final.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Deseo cortés ('möchten') vs. Voluntad firme ('wollen')",
        blockPromptEs: "¿Cómo dices: me gustaría pedir y queremos empezar?",
        blockTargetDe: "ich möchte bestellen und wir wollen anfangen",
        promptEs: "¿Cómo dices: Me gustaría tomar un café y luego queremos empezar?",
        targetDe: "Ich möchte einen Kaffee trinken und dann wollen wir anfangen.",
        tipEs: "Usa 'ich möchte' para sonar educado y 'wir wollen' para expresar determinación del equipo.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Permiso y prohibición con 'dürfen' (tener permiso)",
        blockPromptEs: "¿Cómo dices: yo puedo aparcar / aquí no se permite?",
        blockTargetDe: "ich darf parken und man darf hier nicht",
        promptEs: "¿Cómo preguntas al cliente: ¿Podemos aparcar la furgoneta aquí delante de la casa?",
        targetDe: "Dürfen wir den Transporter hier vor dem Haus parken?",
        tipEs: "Para pedir permiso a un cliente o autoridad en Alemania, usa siempre 'Dürfen wir...?' o 'Darf ich...?'.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Encargo e instrucciones con 'sollen' (deber según otro)",
        blockPromptEs: "¿Cómo dices: ¿qué debo hacer?",
        blockTargetDe: "was soll ich machen?",
        promptEs: "¿Cómo dices: El jefe dice que debemos recoger el material en el almacén?",
        targetDe: "Der Chef sagt, wir sollen das Material im Lager abholen.",
        tipEs: "Sollen se usa cuando transmites una instrucción del jefe, del médico o de un cliente.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Diferencia vital: 'nicht müssen' vs. 'nicht dürfen'",
        blockPromptEs: "¿Cómo dices: no tengo que trabajar?",
        blockTargetDe: "ich muss nicht arbeiten",
        promptEs: "¿Cómo dices: Hoy no tienes que trabajar, pero aquí no está permitido fumar?",
        targetDe: "Du musst heute nicht arbeiten, aber hier darf man nicht rauchen.",
        tipEs: "'Nicht müssen' significa que no es necesario; 'nicht dürfen' significa que está prohibido.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Sándwich Verbal: Modal + Verbo Separable ('mitnehmen / zurückrufen')",
        blockPromptEs: "¿Cómo dices: tengo que devolver la llamada?",
        blockTargetDe: "ich muss zurückrufen",
        promptEs: "¿Cómo dices: Tengo que devolverle la llamada al cliente y llevar el cable conmigo?",
        targetDe: "Ich muss den Kunden zurückrufen und das Kabel mitnehmen.",
        tipEs: "Ambos verbos separables (zurückrufen y mitnehmen) van unidos al final gracias a 'ich muss'.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 1: Permiso en Casa del Cliente",
        promptEs: "El cliente te dice dónde está el sótano. Pregúntale con educación si podéis encender la luz y dejar las herramientas allí.",
        questionDe: "Hier links geht es direkt runter in den Keller.",
        targetDe: "Vielen Dank! Dürfen wir das Licht einschalten und das Werkzeug dort lassen?",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 2: Instrucción del Jefe de Equipo",
        promptEs: "Tu compañero te pregunta qué debemos hacer ahora según el jefe. Dile que debemos comprobar el inversor y limpiar el lugar de trabajo.",
        questionDe: "Was hat der Teamleiter gesagt? Was sollen wir jetzt machen?",
        targetDe: "Wir sollen jetzt den Wechselrichter prüfen und die Baustelle aufräumen.",
        pauseSec: 7
      }
    ]
  },
  {
    id: "a1_pronombres_interaccion",
    level: "A1",
    title: "Clase A1.4: Pronombres Personales en Conversación (mich/mir, dich/dir, Sie/Ihnen)",
    subtitle: "Cómo decir 'dime', 'te ayudo', 'te llamo' y 'le explico a usted' sin confundirte",
    badgeColor: "emerald",
    steps: [
      {
        stepType: "coach",
        title: "El Secreto de mich/dich (Acusativo) vs. mir/dir/Ihnen (Dativo)",
        promptEs: "En las conversaciones reales usamos pronombres todo el tiempo. Para acciones directas como llamar, ver o entender a alguien, usa mich (a mí) y dich (a ti): 'Ich rufe dich an', 'Verstehst du mich?'. Pero cuando das algo, dices algo, ayudas o muestras algo a alguien, usa el receptor en Dativo: mir (a mí), dir (a ti) e Ihnen (a usted): 'Sag mir', 'Ich helfe dir', 'Ich zeige Ihnen das'.",
        targetDe: "Kannst du mich gut hören? Ja, ich höre dich und ich helfe dir sofort.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Llamar y entender ('mich' y 'dich' en Acusativo)",
        blockPromptEs: "¿Cómo dices: ¿me entiendes? / te llamo?",
        blockTargetDe: "verstehst du mich? / ich rufe dich an",
        promptEs: "¿Cómo dices: ¿Me entiendes bien o te llamo más tarde?",
        targetDe: "Verstehst du mich gut oder soll ich dich später anrufen?",
        tipEs: "Verstehen y anrufen van con objeto directo en acusativo: mich y dich.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Decir, mostrar y explicar ('mir', 'dir' e 'Ihnen' en Dativo)",
        blockPromptEs: "¿Cómo dices: dime / te muestro / le explico a usted?",
        blockTargetDe: "sag mir / ich zeige dir / ich erkläre Ihnen",
        promptEs: "¿Cómo dices al cliente: Ahora le muestro a usted la aplicación y le explico todo?",
        targetDe: "Jetzt zeige ich Ihnen die App und erkläre Ihnen alles.",
        tipEs: "Con usted formal (Sie), el receptor en dativo es siempre 'Ihnen'.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Dar y traer cosas ('gib mir' / 'ich bringe dir')",
        blockPromptEs: "¿Cómo dices: dame por favor / yo te traigo?",
        blockTargetDe: "gib mir bitte / ich bringe dir",
        promptEs: "¿Cómo dices a tu compañero: Dame por favor el medidor y yo te traigo el cable?",
        targetDe: "Gib mir bitte das Messgerät und ich bringe dir das Kabel.",
        tipEs: "La persona que recibe lleva dativo (mir, dir) y el objeto entregado lleva acusativo.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Sensaciones y bienestar con Dativo ('Wie geht es dir / Ihnen?')",
        blockPromptEs: "¿Cómo dices: ¿cómo está usted? / estoy muy bien?",
        blockTargetDe: "wie geht es Ihnen? / es geht mir sehr gut",
        promptEs: "¿Cómo dices: Muchas gracias, estoy muy bien, ¿y cómo está usted?",
        targetDe: "Vielen Dank, es geht mir sehr gut, und wie geht es Ihnen?",
        tipEs: "En alemán nunca se dice 'Ich bin gut' para la salud; se dice 'Es geht mir gut'.",
        pauseSec: 6
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong: Mala Señal en el Teléfono",
        promptEs: "Tu jefe te llama en carretera y te pregunta si puedes escucharle bien. Dile que no le escuchas bien y que le devuelves la llamada en cinco minutos.",
        questionDe: "Hallo Marcos, kannst du mich am Telefon gut hören?",
        targetDe: "Nein, ich höre dich leider schlecht. Ich rufe dich in fünf Minuten zurück.",
        pauseSec: 7
      }
    ]
  },
  {
    id: "a1_v2_baustelle",
    level: "A1",
    title: "Clase A1.5: El Motor V2, Verbos Separables y Trabajo en Alemania",
    subtitle: "Posición 2 del verbo, prefijos viajeros (anfangen, aufstehen) y trato profesional",
    badgeColor: "emerald",
    steps: [
      {
        stepType: "coach",
        title: "Regla V2 y Prefijos Separables",
        promptEs: "En alemán el verbo conjugado siempre ocupa la posición dos. Y si el verbo tiene un prefijo separable como 'anfangen' (empezar), 'anrufen' (llamar por teléfono) o 'einschalten' (encender), ese prefijo viaja hasta el final de la frase.",
        targetDe: "Wir fangen morgen pünktlich um sieben Uhr an.",
        pauseSec: 3
      },
      {
        stepType: "drill",
        title: "Llamada telefónica con verbo separable",
        blockPromptEs: "¿Cómo dices: te llamo por teléfono?",
        blockTargetDe: "ich rufe dich an",
        promptEs: "¿Cómo dices: Te llamo más tarde por teléfono?",
        targetDe: "Ich rufe dich später an.",
        tipEs: "Del verbo 'anrufen': 'rufe' se queda en posición dos y 'an' cierra la frase.",
        pauseSec: 5
      },
      {
        stepType: "drill",
        title: "Combinar un verbo modal con uno separable",
        blockPromptEs: "¿Cómo dices: tengo que levantarme?",
        blockTargetDe: "ich muss aufstehen",
        promptEs: "¿Cómo dices: Mañana tengo que levantarme muy temprano?",
        targetDe: "Morgen muss ich sehr früh aufstehen.",
        tipEs: "Cuando hay un verbo modal como 'muss', el verbo separable 'aufstehen' ya no se separa y va completo al final.",
        pauseSec: 6
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong con el Cliente en Puerta",
        promptEs: "El cliente te pregunta a qué hora empezáis con el montaje. Dile que empezamos ahora mismo.",
        questionDe: "Guten Morgen! Wann fangen Sie mit der Montage an?",
        targetDe: "Guten Morgen! Wir fangen jetzt sofort mit der Arbeit an.",
        pauseSec: 6
      }
    ]
  },

  // ===========================================================================
  // NIVEL A2: PREOCUPACIONES, PREPOSICIONES, DATIVO M-R-M-N Y PASADO PERFEKT
  // ===========================================================================
  {
    id: "a2_preocupaciones_imprevistos",
    level: "A2",
    title: "Clase A2.1: Expresar Preocupaciones, Problemas, Atascos e Imprevistos",
    subtitle: "Sorgen machen, im Stau stehen, Verspätung, averías y cómo dar tranquilidad",
    badgeColor: "cyan",
    steps: [
      {
        stepType: "coach",
        title: "Vocabulario Real para Preocupaciones y Contratiempos",
        promptEs: "En la vida diaria y laboral surgen imprevistos. Aprende estas cinco estructuras clave: 'Ich mache mir Sorgen um...' (me preocupo por...), 'Ich habe Angst, dass...' (temo que...), 'Leider stehe ich im Stau' (estoy en un atasco), 'Es gibt ein Problem mit...' (hay un problema con...) y la frase para tranquilizar: 'Mach dir keine Sorgen!' o 'Keine Sorge, das kriegen wir hin!' (¡No te preocupes, lo solucionaremos!).",
        targetDe: "Mach dir keine Sorgen, wir finden sofort eine gute Lösung!",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Expresar preocupación por algo ('Ich mache mir Sorgen um...')",
        blockPromptEs: "¿Cómo dices: estoy preocupado / me preocupo por?",
        blockTargetDe: "ich mache mir Sorgen um",
        promptEs: "¿Cómo dices: Me preocupa el mal tiempo de hoy?",
        targetDe: "Ich mache mir Sorgen um das schlechte Wetter heute.",
        tipEs: "La preposición 'um' pide siempre acusativo: um das schlechte Wetter.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Tranquilizar a un compañero o familiar",
        blockPromptEs: "¿Cómo dices: ¡no te preocupes! / ¡todo saldrá bien!?",
        blockTargetDe: "mach dir keine Sorgen! / alles wird gut!",
        promptEs: "¿Cómo dices: ¡No te preocupes, hoy terminamos todo a tiempo!",
        targetDe: "Mach dir keine Sorgen, wir werden heute pünktlich fertig!",
        tipEs: "Con amigos o compañeros usa 'Mach dir keine Sorgen'; con clientes usa simplemente 'Keine Sorge!'.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Atasco en la autopista y retraso ('im Stau stehen / Verspätung haben')",
        blockPromptEs: "¿Cómo dices: estoy en un atasco y tengo retraso?",
        blockTargetDe: "ich stehe im Stau und habe Verspätung",
        promptEs: "¿Cómo dices: Lamentablemente estamos en un atasco y tenemos veinte minutos de retraso?",
        targetDe: "Leider stehen wir im Stau und haben zwanzig Minuten Verspätung.",
        tipEs: "Recuerda que en alemán estás 'de pie' en el atasco: wir stehen im Stau.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Comunicar que algo está roto o no funciona ('kaputt / funktioniert nicht')",
        blockPromptEs: "¿Cómo dices: está averiado y no funciona?",
        blockTargetDe: "es ist kaputt und es funktioniert nicht",
        promptEs: "¿Cómo dices: El enchufe está roto y el aparato no funciona?",
        targetDe: "Die Steckdose ist kaputt und das Gerät funktioniert nicht.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Decir que falta una pieza o herramienta ('fehlen')",
        blockPromptEs: "¿Cómo dices: me falta / nos falta?",
        blockTargetDe: "mir fehlt / uns fehlt",
        promptEs: "¿Cómo dices: Hay un problema en el almacén, nos falta todavía un cable?",
        targetDe: "Es gibt ein Problem im Lager, uns fehlt noch ein Kabel.",
        tipEs: "La cosa que falta es el sujeto ('ein Kabel') y la persona a quien le falta va en dativo ('uns fehlt').",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Expresar temor o duda de llegar a tiempo ('Ich fürchte, dass...')",
        blockPromptEs: "¿Cómo dices: temo que no podamos subir al tejado?",
        blockTargetDe: "ich fürchte, dass wir nicht aufs Dach können",
        promptEs: "¿Cómo dices: Temo que hoy no podamos subir al tejado porque llueve demasiado?",
        targetDe: "Ich fürchte, dass wir heute nicht aufs Dach können, weil es zu stark regnet.",
        tipEs: "Tanto 'dass' como 'weil' envían el verbo conjugado al final de su cláusula.",
        pauseSec: 8
      },
      {
        stepType: "drill",
        title: "Pedir disculpas y ofrecer solución inmediata",
        blockPromptEs: "¿Cómo dices: lo siento mucho / nos encargamos?",
        blockTargetDe: "es tut mir leid / wir kümmern uns",
        promptEs: "¿Cómo dices: Lo siento mucho por la espera, nos encargamos de eso ahora mismo?",
        targetDe: "Es tut mir sehr leid wegen der Wartezeit, wir kümmern uns sofort darum.",
        tipEs: "'Sich kümmern um' significa encargarse de algo; 'darum' significa 'de ello'.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 1: Llamada desde la Autopista A2",
        promptEs: "El coordinador te pregunta por dónde vais porque el cliente está esperando. Dile que estáis en un atasco en la autopista, pero que llegáis en quince minutos.",
        questionDe: "Wo seid ihr gerade? Der Kunde wartet schon auf euch!",
        targetDe: "Wir stehen leider auf der Autobahn im Stau, aber wir sind in fünfzehn Minuten da.",
        pauseSec: 8
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 2: Tranquilizar al Propietario de la Casa",
        promptEs: "El propietario te pregunta preocupado si el corte de luz durará todo el día. Tranquilízalo diciendo que no se preocupe, que solo durará media hora.",
        questionDe: "Ich mache mir etwas Sorgen: Bleibt der Strom heute den ganzen Tag weg?",
        targetDe: "Keine Sorge! Der Strom bleibt nur eine halbe Stunde weg.",
        pauseSec: 7
      }
    ]
  },
  {
    id: "a2_preposiciones_dativo_wechsel",
    level: "A2",
    title: "Clase A2.2: Preposiciones de Tiempo, Dativo (M-R-M-N) y Ubicación (Wo / Wohin)",
    subtitle: "um/am/im, mit/zu/bei/seit/nach y la diferencia entre 'im Keller' e 'in den Keller'",
    badgeColor: "cyan",
    steps: [
      {
        stepType: "coach",
        title: "El Código M-R-M-N del Dativo y el Secreto de Wo? vs. Wohin?",
        promptEs: "Las preposiciones mit (con), zu (hacia), bei (en), von (de), aus (desde dentro) y seit (desde hace) exigen siempre el traje Dativo con las letras M-R-M-N: dem para masculino y neutro, der para femenino y den para plural. Además, en lugares como el sótano o el tejado, si respondes a ¿Dónde está? (Wo?) usas Dativo estático (im Keller, auf dem Dach), pero si hay movimiento ¿Adónde vas? (Wohin?) usas Acusativo (in den Keller, auf das Dach).",
        targetDe: "Ich arbeite im Keller und mein Kollege steigt jetzt auf das Dach.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Reloj, Día y Mes ('um', 'am', 'im')",
        blockPromptEs: "¿Cómo dices: el lunes a las siete en agosto?",
        blockTargetDe: "am Montag um sieben Uhr im August",
        promptEs: "¿Cómo dices: Empiezo el lunes a las siete de la mañana en punto?",
        targetDe: "Ich fange am Montag pünktlich um sieben Uhr morgens an.",
        tipEs: "Días con am (am Montag), horas con um (um sieben Uhr) y meses con im (im August).",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Preposiciones fijas de Dativo: 'mit', 'bei' y 'seit'",
        blockPromptEs: "¿Cómo dices: con mi colega en la empresa?",
        blockTargetDe: "mit meinem Kollegen bei der Firma",
        promptEs: "¿Cómo dices: Trabajo desde hace dos meses con mi colega en Enpal?",
        targetDe: "Ich arbeite seit zwei Monaten mit meinem Kollegen bei Enpal.",
        tipEs: "Seit, mit y bei van siempre con Dativo.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Desplazamiento cotidiano: 'zur Arbeit', 'zum Kunden', 'nach Hause', 'zu Hause'",
        blockPromptEs: "¿Cómo dices: al trabajo, al cliente y a casa?",
        blockTargetDe: "zur Arbeit, zum Kunden und nach Hause",
        promptEs: "¿Cómo dices: Por la mañana conduzco al cliente y por la tarde vuelvo a casa?",
        targetDe: "Morgens fahre ich zum Kunden und abends fahre ich nach Hause.",
        tipEs: "Zum es la contracción de zu dem (masculino/neutro) y zur es la contracción de zu der (femenino).",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Contraste Wo? (Posición Fija) vs. Wohin? (Movimiento) en el Sótano",
        blockPromptEs: "¿Cómo dices: en el sótano vs. hacia el sótano?",
        blockTargetDe: "im Keller und in den Keller",
        promptEs: "¿Cómo dices: Llevamos el armario al sótano porque el contador está en el sótano?",
        targetDe: "Wir bringen den Schrank in den Keller, weil der Zähler im Keller ist.",
        tipEs: "Llevar algo hacia adentro es movimiento (in den Keller); estar allí es posición fija (im Keller).",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Contraste en la Pared ('an der Wand' vs. 'an die Wand')",
        blockPromptEs: "¿Cómo dices: en la pared vs. a la pared?",
        blockTargetDe: "an der Wand und an die Wand",
        promptEs: "¿Cómo dices: Montamos el inversor en la pared y ahora cuelga firme en la pared?",
        targetDe: "Wir montieren den Wechselrichter an die Wand und jetzt hängt er fest an der Wand.",
        tipEs: "Al montarlo hay dirección (an die Wand, acusativo); cuando ya cuelga hay reposo (an der Wand, dativo).",
        pauseSec: 8
      },
      {
        stepType: "drill",
        title: "Preposiciones de Acusativo: 'für' (para) y 'ohne' (sin)",
        blockPromptEs: "¿Cómo dices: para el inversor y sin este cable?",
        blockTargetDe: "für den Wechselrichter und ohne dieses Kabel",
        promptEs: "¿Cómo dices: Esta pieza es para el inversor, sin este cable no podemos continuar?",
        targetDe: "Dieses Teil ist für den Wechselrichter, ohne dieses Kabel können wir nicht weitermachen.",
        tipEs: "Für y ohne piden siempre Acusativo: für den Wechselrichter, ohne dieses Kabel.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong: ¿Dónde dejamos las cajas?",
        promptEs: "El repartidor te pregunta dónde debe poner las cajas con los módulos. Dile que las ponga delante del garaje, al lado de la furgoneta.",
        questionDe: "Guten Tag! Wohin soll ich die Kartons mit den Modulen stellen?",
        targetDe: "Stellen Sie die Kartons bitte vor die Garage, direkt neben den Transporter.",
        pauseSec: 7
      }
    ]
  },
  {
    id: "a2_perfekt_conversacional",
    level: "A2",
    title: "Clase A2.3: El Pasado Hablado (Perfekt + war / hatte) para Contar tu Día",
    subtitle: "Matriz haben vs. sein (flecha de movimiento), verbos en -ieren y verbos separables",
    badgeColor: "cyan",
    steps: [
      {
        stepType: "coach",
        title: "Cómo Hablar en Pasado Como un Nativo Alemán",
        promptEs: "Para contar lo que hiciste hoy o ayer, usa tres reglas de oro: primera, para 'estuve' y 'tuve' usa siempre las formas cortas 'ich war' e 'ich hatte'. Segunda, si el verbo indica ir o desplazarse de un punto A a un punto B como fahren, gehen o kommen, usa el auxiliar 'sein' ('wir sind gefahren'). Tercera, para todas las demás acciones usa 'haben' en posición dos y el participio al final ('wir haben montiert').",
        targetDe: "Heute Morgen sind wir früh losgefahren und haben schon alles vorbereitet.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Formas directas 'war' (estuve/estaba) y 'hatte' (tuve/tenía)",
        blockPromptEs: "¿Cómo dices: ayer estuve y tuve?",
        blockTargetDe: "gestern war ich und hatte ich",
        promptEs: "¿Cómo dices: Ayer estuve en la oficina y tuve una reunión importante?",
        targetDe: "Gestern war ich im Büro und ich hatte eine wichtige Besprechung.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Desplazamiento con 'sein' ('gefahren', 'gekommen', 'gegangen')",
        blockPromptEs: "¿Cómo dices: hemos conducido y hemos llegado?",
        blockTargetDe: "wir sind gefahren und wir sind angekommen",
        promptEs: "¿Cómo dices: Hemos conducido dos horas y hemos llegado a las ocho?",
        targetDe: "Wir sind zwei Stunden gefahren und um acht Uhr angekommen.",
        tipEs: "Fahren y ankommen implican movimiento físico, por eso usan 'wir sind' en lugar de 'wir haben'.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Verbos terminados en '-ieren' (Sin 'ge-' al principio)",
        blockPromptEs: "¿Cómo dices: he instalado, probado y controlado?",
        blockTargetDe: "ich habe installiert, probiert und kontrolliert",
        promptEs: "¿Cómo dices: Ya hemos instalado el sistema y hemos controlado todos los valores?",
        targetDe: "Wir haben die Anlage schon installiert und alle Werte kontrolliert.",
        tipEs: "Los verbos terminados en -ieren como installieren, funktionieren o fotografieren nunca llevan ge-.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Participio de Verbos Separables ('ge-' en el medio: angeschlossen, aufgeräumt)",
        blockPromptEs: "¿Cómo dices: he conectado y he recogido?",
        blockTargetDe: "ich habe angeschlossen und aufgeräumt",
        promptEs: "¿Cómo dices: He conectado la batería y después hemos recogido el sótano?",
        targetDe: "Ich habe die Batterie angeschlossen und danach haben wir den Keller aufgeräumt.",
        tipEs: "En los separables, la sílaba ge se mete entre el prefijo y la raíz: an-ge-schlossen, auf-ge-räumt.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Acciones cotidianas: hablar, hacer, comer y comprar",
        blockPromptEs: "¿Cómo dices: he hablado y he hecho?",
        blockTargetDe: "ich habe gesprochen und ich habe gemacht",
        promptEs: "¿Cómo dices: Ya he hablado con el cliente y he hecho las fotos del contador?",
        targetDe: "Ich habe schon mit dem Kunden gesprochen und die Fotos vom Zähler gemacht.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong: Reporte de Cierre con el Jefe de Equipo",
        promptEs: "Tu jefe te pregunta si ya habéis terminado y si el cliente ha firmado el protocolo. Dile que sí, que habéis probado todo y que el cliente ya ha firmado.",
        questionDe: "Seid ihr auf der Baustelle fertig und hat der Kunde schon unterschrieben?",
        targetDe: "Ja, wir haben alles geprüft und der Kunde hat das Protokoll schon unterschrieben.",
        pauseSec: 8
      }
    ]
  },

  // ===========================================================================
  // NIVEL B1: CONECTORES ADUSO, SUBORDINADAS, INVERSIÓN Y CORTESÍA AVANZADA
  // ===========================================================================
  {
    id: "b1_conectores_subordinadas",
    level: "B1",
    title: "Clase B1.1: Conectores ADUSO, Subordinadas (weil / dass / wenn / obwohl) y 'deshalb'",
    subtitle: "Cómo encadenar ideas complejas y dominar la posición del verbo sin titubear",
    badgeColor: "purple",
    steps: [
      {
        stepType: "coach",
        title: "Las 3 Familias de Conectores que Separan el Nivel A1 del B1",
        promptEs: "En alemán hay tres tipos de conectores: primero, el grupo ADUSO (aber, denn, und, sondern, oder), que ocupa la posición cero y no cambia el orden de la frase. Segundo, los subordinantes como weil (porque), dass (que), wenn (si / cuando) y obwohl (aunque), que lanzan el verbo conjugado hasta el final absoluto. Y tercero, los conectores de inversión como deshalb (por eso), trotzdem (sin embargo) y außerdem (además), donde el verbo va inmediatamente detrás de ellos.",
        targetDe: "Es regnet stark, deshalb warten wir kurz, weil das Dach zu nass ist.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Contraste con 'aber' y 'sondern' (Grupo ADUSO Posición 0)",
        blockPromptEs: "¿Cómo dices: no mañana, sino hoy?",
        blockTargetDe: "nicht morgen, sondern heute",
        promptEs: "¿Cómo dices: No venimos mañana, sino que instalamos los módulos hoy mismo?",
        targetDe: "Wir kommen nicht morgen, sondern wir montieren die Module schon heute.",
        tipEs: "Usa 'sondern' (sino que) cuando corriges una negación previa con nicht o kein.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Dar razones con 'weil' (Verbo al final) vs. 'denn' (Verbo en posición 2)",
        blockPromptEs: "¿Cómo dices: porque hoy tengo mucho trabajo?",
        blockTargetDe: "weil ich heute viel Arbeit habe",
        promptEs: "¿Cómo dices: Llego un poco más tarde porque hoy hay mucho tráfico?",
        targetDe: "Ich komme etwas später, weil es heute viel Verkehr gibt.",
        tipEs: "Después de 'weil', el verbo 'gibt' viaja al final de la oración.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Expresar consecuencia con 'deshalb' (Por eso + Verbo inmediato)",
        blockPromptEs: "¿Cómo dices: por eso tenemos que?",
        blockTargetDe: "deshalb müssen wir",
        promptEs: "¿Cómo dices: El cable es demasiado corto, por eso necesitamos otro cable?",
        targetDe: "Das Kabel ist zu kurz, deshalb brauchen wir ein anderes Kabel.",
        tipEs: "Deshalb ocupa la posición uno de la nueva frase, obligando al verbo 'brauchen' a ir justo después.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Condición y tiempo con 'wenn' (Cuando / Si condicional)",
        blockPromptEs: "¿Cómo dices: cuando hayamos terminado?",
        blockTargetDe: "wenn wir fertig sind",
        promptEs: "¿Cómo dices: Te aviso enseguida cuando estemos en casa del cliente?",
        targetDe: "Ich gebe dir sofort Bescheid, wenn wir beim Kunden sind.",
        tipEs: "Con 'wenn', el verbo 'sind' cierra la oración al final.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Superar obstáculos con 'obwohl' (Aunque) y 'trotzdem' (Sin embargo)",
        blockPromptEs: "¿Cómo dices: aunque es difícil / sin embargo lo logramos?",
        blockTargetDe: "obwohl es schwierig ist / trotzdem schaffen wir es",
        promptEs: "¿Cómo dices: Aunque la instalación era compleja, hemos terminado todo a tiempo?",
        targetDe: "Obwohl die Montage kompliziert war, sind wir pünktlich fertig geworden.",
        tipEs: "Si empiezas la oración con 'Obwohl...', tras la coma empiezas directamente con el verbo de la frase principal ('sind wir').",
        pauseSec: 8
      },
      {
        stepType: "drill",
        title: "Informar hechos con 'dass' (Que...)",
        blockPromptEs: "¿Cómo dices: es importante que?",
        blockTargetDe: "es ist wichtig, dass",
        promptEs: "¿Cómo dices: Es muy importante que desconectemos primero el interruptor principal?",
        targetDe: "Es ist sehr wichtig, dass wir zuerst den Hauptschalter ausschalten.",
        tipEs: "En una subordinada con 'dass', los verbos separables como 'ausschalten' van unidos y conjugados al final.",
        pauseSec: 8
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong: Explicando una Decisión Técnica",
        promptEs: "El ingeniero te pregunta por qué necesitáis un andamio más alto para este tejado. Explícale usando 'weil' que el tejado es muy inclinado y la seguridad es lo primero.",
        questionDe: "Warum braucht ihr für dieses Haus eigentlich ein höheres Gerüst?",
        targetDe: "Wir brauchen ein höheres Gerüst, weil das Dach sehr steil ist und die Sicherheit vorgeht.",
        pauseSec: 8
      }
    ]
  },
  {
    id: "b1_cortesia_preguntas_indirectas",
    level: "B1",
    title: "Clase B1.2: Cortesía Avanzada (Konjunktiv II) y Preguntas Indirectas ('ob / wie')",
    subtitle: "Könnten Sie..., Würden Sie..., Ich wollte fragen, ob...",
    badgeColor: "purple",
    steps: [
      {
        stepType: "coach",
        title: "Cómo hablar con máxima educación a clientes, jefes y oficinas",
        promptEs: "Cuando hablas con un cliente, un médico o en una oficina pública en Alemania, empezar con 'Ich wollte fragen, ob...' (quería preguntar si...) o 'Könnten Sie mir bitte sagen, wo...' (¿podría decirme dónde...?) abre todas las puertas.",
        targetDe: "Könnten Sie mir bitte Bescheid sagen, wenn Sie fertig sind?",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Pregunta indirecta con 'ob' (si condicional)",
        blockPromptEs: "¿Cómo dices: quería preguntar si?",
        blockTargetDe: "ich wollte fragen, ob",
        promptEs: "¿Cómo dices: Quería preguntar si el viernes todavía tiene una cita libre?",
        targetDe: "Ich wollte fragen, ob Sie am Freitag noch einen Termin frei haben.",
        tipEs: "Con 'ob' (si condicional), el verbo conjugado 'haben' viaja al final.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Petición cordial con 'Könnten Sie...?'",
        blockPromptEs: "¿Cómo dices: podría decirme por favor?",
        blockTargetDe: "könnten Sie mir bitte sagen",
        promptEs: "¿Cómo preguntas: ¿Podría decirme por favor dónde está el cuadro eléctrico?",
        targetDe: "Könnten Sie mir bitte sagen, wo der Sicherungskasten ist?",
        tipEs: "'Könnten Sie...' es mucho más educado que 'Können Sie...'.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Pedir un favor con 'würden gern'",
        blockPromptEs: "¿Cómo dices: me gustaría pedirle un favor?",
        blockTargetDe: "ich würde Sie gern um einen Gefallen bitten",
        promptEs: "¿Cómo dices: Me gustaría pedirle un pequeño favor?",
        targetDe: "Ich würde Sie gern um einen kleinen Gefallen bitten.",
        tipEs: "El Konjunktiv II con 'würde' suena natural y extremadamente respetuoso.",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong en Atención al Cliente",
        promptEs: "El empleado de la oficina te pregunta en qué puede ayudarte. Dile amablemente que querías preguntar si el responsable está hoy en la oficina.",
        questionDe: "Guten Tag, wie kann ich Ihnen heute weiterhelfen?",
        targetDe: "Guten Tag! Ich wollte fragen, ob der Zuständige heute im Haus ist.",
        pauseSec: 7
      }
    ]
  },

  // ===========================================================================
  // CAPÍTULO ESPECIAL: REDEMITTEL (FRASES COMUNES Y PLANTILLAS CONVERSACIONALES)
  // ===========================================================================
  {
    id: "redemittel_supervivencia_diaria",
    level: "REDEMITTEL",
    title: "Redemittel 1: Las 15 Frases Comunes y Muletillas que Usan los Alemanes a Diario",
    subtitle: "Bescheid sagen, Alles klar, Genau, Das stimmt, Auf jeden Fall, Meiner Meinung nach...",
    badgeColor: "amber",
    steps: [
      {
        stepType: "coach",
        title: "El Arsenal de Frases Hechas (Redemittel) para Sonar Natural",
        promptEs: "En la conversación real nadie construye cada frase palabra por palabra desde cero. Los hablantes nativos usan bloques prefabricados llamados Redemittel. En esta clase vas a automatizar las quince fórmulas más usadas en Alemania para reaccionar, avisar, pedir que repitan, confirmar acuerdos y salir de cualquier apuro conversacional.",
        targetDe: "Alles klar, ich kümmere mich darum und gebe dir gleich Bescheid!",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Avisar y mantener informado ('Bescheid sagen / Bescheid geben')",
        blockPromptEs: "¿Cómo dices: avísame / yo te aviso?",
        blockTargetDe: "sag mir Bescheid / ich gebe dir Bescheid",
        promptEs: "¿Cómo dices: Por favor avísame en cuanto tengas una respuesta?",
        targetDe: "Gib mir bitte Bescheid, sobald du eine Antwort hast!",
        tipEs: "'Bescheid geben' o 'Bescheid sagen' es la expresión número uno en el trabajo en Alemania.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Encargarse de una tarea ('Ich kümmere mich darum')",
        blockPromptEs: "¿Cómo dices: yo me encargo de eso?",
        blockTargetDe: "ich kümmere mich darum",
        promptEs: "¿Cómo dices: ¡Todo claro, no hay problema, yo me encargo de eso ahora mismo!",
        targetDe: "Alles klar, kein Problem, ich kümmere mich sofort darum!",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Confirmar y dar la razón ('Genau!', 'Das stimmt!', 'Auf jeden Fall!')",
        blockPromptEs: "¿Cómo dices: ¡exacto, eso es cierto, sin duda!?",
        blockTargetDe: "genau, das stimmt, auf jeden Fall!",
        promptEs: "¿Cómo dices: ¡Exacto, tienes toda la razón, eso lo hacemos sin duda así!",
        targetDe: "Genau, du hast völlig recht, das machen wir auf jeden Fall so!",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Pedir que repitan o hablen más despacio ('Wie bitte? / Könnten Sie...')",
        blockPromptEs: "¿Cómo dices: ¿cómo dice? ¿puede repetirlo?",
        blockTargetDe: "wie bitte? können Sie das wiederholen?",
        promptEs: "¿Cómo dices: Perdón, no lo he entendido bien, ¿podría repetirlo más despacio?",
        targetDe: "Entschuldigung, ich habe das akustisch nicht verstanden, könnten Sie das bitte langsamer wiederholen?",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Introducir el motivo de una llamada o conversación ('Es geht um...')",
        blockPromptEs: "¿Cómo dices: se trata de...?",
        blockTargetDe: "es geht um...",
        promptEs: "¿Cómo dices: Buenos días, llamo porque se trata de la cita de mañana?",
        targetDe: "Guten Tag, ich rufe an, weil es um den Termin für morgen geht.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Preguntar cómo se dice o qué significa algo",
        blockPromptEs: "¿Cómo dices: ¿cómo se llama esto en alemán?",
        blockTargetDe: "wie heißt das auf Deutsch?",
        promptEs: "¿Cómo dices: ¿Cómo se llama esta herramienta en alemán y qué significa esta palabra?",
        targetDe: "Wie heißt dieses Werkzeug auf Deutsch und was bedeutet dieses Wort?",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Cuadrar horarios y citas ('Passt es Ihnen...?' / 'Da kann ich leider nicht')",
        blockPromptEs: "¿Cómo dices: ¿le viene bien mañana?",
        blockTargetDe: "passt es Ihnen morgen?",
        promptEs: "¿Cómo dices: ¿Le viene bien mañana a las nueve o prefiere el jueves?",
        targetDe: "Passt es Ihnen morgen um neun Uhr oder ist Donnerstag besser?",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Dar tu opinión con estructura B1 ('Meiner Meinung nach... / Ich finde, dass...')",
        blockPromptEs: "¿Cómo dices: en mi opinión es mejor?",
        blockTargetDe: "meiner Meinung nach ist es besser",
        promptEs: "¿Cómo dices: En mi opinión, deberíamos instalar primero los rieles en el tejado?",
        targetDe: "Meiner Meinung nach sollten wir zuerst die Schienen auf dem Dach montieren.",
        pauseSec: 7
      },
      {
        stepType: "drill",
        title: "Agradecer y despedirse con naturalidad ('Ich danke Ihnen / Schönen Feierabend!')",
        blockPromptEs: "¿Cómo dices: ¡buen final de jornada y buen fin de semana!",
        blockTargetDe: "schönen Feierabend und schönes Wochenende!",
        promptEs: "¿Cómo dices al terminar el trabajo: Muchas gracias por su ayuda y que tenga una buena tarde?",
        targetDe: "Vielen Dank für Ihre Hilfe und ich wünsche Ihnen noch einen schönen Abend!",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 1: Resolviendo un Imprevisto por Teléfono",
        promptEs: "Tu compañero te pregunta quién llama al cliente para avisarle del cambio de hora. Dile que tú te encargas de eso y le avisas en cinco minutos.",
        questionDe: "Wer ruft den Kunden an, um wegen der Uhrzeit Bescheid zu sagen?",
        targetDe: "Keine Sorge, ich kümmere mich darum und gebe dir in fünf Minuten Bescheid!",
        pauseSec: 7
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong 2: Despedida con los Compañeros al Terminar el Turno",
        promptEs: "Tu colega te dice que todo ha quedado listo por hoy y te desea buen final de jornada. Respóndele: ¡Igualmente, muchas gracias, nos vemos mañana por la mañana!",
        questionDe: "So, wir haben für heute alles geschafft! Schönen Feierabend dir!",
        targetDe: "Danke dir, gleichfalls! Bis morgen früh!",
        pauseSec: 6
      }
    ]
  },
  {
    id: "redemittel_telefono_citas_compras",
    level: "REDEMITTEL",
    title: "Redemittel 2: Frases Hechas para Teléfono, Citas, Tiendas y Consultas",
    subtitle: "Fórmulas listas para usar al llamar, cambiar un turno o resolver trámites",
    badgeColor: "amber",
    steps: [
      {
        stepType: "coach",
        title: "Plantillas que Funcionan como Llaves Maestras",
        promptEs: "En llamadas telefónicas, citas médicas o tiendas no necesitas inventar la gramática desde cero. Basta con usar plantillas listas: 'Es geht um...' (Se trata de...), 'Passt es Ihnen am...?' (¿Le viene bien el...?) o 'Ich hätte gern...' (Quisiera...).",
        targetDe: "Guten Tag, mein Name ist Marcos Mogollón. Es geht um meinen Termin.",
        pauseSec: 4
      },
      {
        stepType: "drill",
        title: "Explicar el motivo de tu llamada con 'Es geht um...'",
        blockPromptEs: "¿Cómo dices: se trata de la instalación?",
        blockTargetDe: "es geht um die Anlage",
        promptEs: "¿Cómo dices al teléfono: Hola, se trata de la instalación solar de mañana?",
        targetDe: "Guten Tag, es geht um die Solaranlage für morgen.",
        tipEs: "'Es geht um + Acusativo' sirve para introducir el tema de cualquier llamada o reunión al instante.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Proponer o confirmar una hora ('Passt es dir / Ihnen?')",
        blockPromptEs: "¿Cómo preguntas: le viene bien a las diez?",
        blockTargetDe: "passt es Ihnen um zehn Uhr?",
        promptEs: "¿Cómo preguntas con educación: ¿Le viene bien mañana a las diez?",
        targetDe: "Passt es Ihnen morgen um zehn Uhr?",
        tipEs: "El verbo 'passen' con Dativo ('Passt es dir?' o 'Passt es Ihnen?') es la forma estándar de cuadrar horarios.",
        pauseSec: 6
      },
      {
        stepType: "drill",
        title: "Expresar opinión personal ('Meiner Meinung nach...')",
        blockPromptEs: "¿Cómo dices: en mi opinión esta solución?",
        blockTargetDe: "meiner Meinung nach diese Lösung",
        promptEs: "¿Cómo dices: En mi opinión, esta solución es mucho mejor?",
        targetDe: "Meiner Meinung nach ist diese Lösung viel besser.",
        tipEs: "Como 'Meiner Meinung nach' ocupa la primera posición, el verbo 'ist' va justo después.",
        pauseSec: 6
      },
      {
        stepType: "pingpong",
        title: "Ping-Pong de Agendamiento Telefónico",
        promptEs: "En la recepción te preguntan si puedes venir el jueves por la tarde. Dile que el jueves no puedes, pero que el viernes por la mañana te viene muy bien.",
        questionDe: "Haben Sie am Donnerstag am Nachmittag Zeit für den Termin?",
        targetDe: "Am Donnerstag geht es leider nicht, aber am Freitagvormittag passt es mir sehr gut.",
        pauseSec: 8
      }
    ]
  }
];
