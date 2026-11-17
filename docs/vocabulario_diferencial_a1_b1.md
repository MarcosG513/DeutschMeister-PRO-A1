# **Inventario Diferencial de Vocabulario Alemán A1–B1 para DeutschMeister PRO**

Una auditoría cruzada entre el inventario comprobable de tu aplicación y las fuentes léxicas disponibles en tu espacio de trabajo permite extraer 632 términos y bloques comunicativos verificados de nivel A1 a B1 que no figuran en los listados visibles de DeutschMeister PRO, organizados directamente para tus Flashcards y Tablas Maestras a lo largo de los 18 capítulos temáticos y Kapitel 22: Redemittel & Alltagskommunikation1. Al contrastar este resultado con la meta de 2.000 a 3.000 palabras solicitada, el análisis arroja que el corpus oficial completo del Goethe-Zertifikat B1 comprende aproximadamente 2.400 unidades léxicas —mientras que Start Deutsch 1 (A1) abarca cerca de 650 entradas—5, pero los fragmentos recuperados de las listas oficiales Goethe A1/A2/B1 y del Deutsch-Test für Zuwanderer (DTZ) solo contienen grupos temáticos y secciones alfabéticas parciales en lugar de los glosarios íntegros de la A a la Z6, sumado a un archivo del cuaderno que no pudo leerse11.  
En cuanto al estado interno de la aplicación, los registros de desarrollo documentan 1.089 términos base en 18 capítulos —con reportes posteriores de 1.147 palabras tras inyectar 100 términos sobre una base previa de 1.047, y hasta 1.195 palabras en el banco global del quiz—, además de 86 plantillas conversacionales en redemittelBegegnungen.js2. Sin embargo, el código fuente completo solo es visible para los 706 registros de vocabulario\_completo.json.txt (2026-07-01)3, additions\_only.txt12, Codigo.txt1, las entradas nombradas de la inyección de 100 palabras y Kapitel 222. Quedan ocultos o truncados en los archivos recuperados los lotes de expansión V1 y V2 (50 palabras cada uno en capítulos intermedios)13, la fracción no desglosada del lote de 100 palabras2, 41 de los 50 términos de Kapitel 1714 y casi la totalidad de Kapitel 18, donde solo 8 palabras son visibles frente a 50–92 reportadas2.  
Para evitar invenciones fuera de las fuentes y prevenir colisiones, cada una de las 632 entradas siguientes proviene estrictamente de los documentos oficiales y manuales técnicos recuperados7, excluyendo todo término confirmado en los archivos visibles de la app. En los vocablos procedentes de listas alemanas monolingües, el lema, artículo, plural, régimen y oración oficial cuando existe se toman de la fuente citada, mientras que la fonética adaptada al español, las traducciones y los ejemplos complementarios se han estandarizado al esquema de DeutschMeister PRO. En los capítulos afectados por expansiones V1/V2 no desglosadas o volcados truncados (especialmente capítulos 4, 8, 11, 12, 15, 16, 17 y 18), se incluye una advertencia operativa para ejecutar deduplicación automática mediante getSafeId contra tu src/data/chapters.jsx local antes de compilar1.

## **Auditoría de Cobertura y Brechas del Corpus**

La estructura pedagógica vigente tras el reordenamiento de reordenar\_capitulos.js organiza el léxico en 18 capítulos progresivos más el módulo situacional Kapitel 222. El diagnóstico por capítulo revela que la app cubre con solidez el vocabulario nuclear de supervivencia A1, pero concentra sus mayores déficits hacia B1 en tres áreas: léxico técnico y reglamentario de automoción ya documentado en tus guías de conducción pero ausente de las tablas de la app19, verbos con dativo obligatorio y léxico abstracto/argumentativo para pruebas escritas y orales7, y vocabulario escolar, de oficios y de instrucciones de examen B16.

| \# | Capítulo Destino (Orden Actual) | ID Pre-Reorden | Términos Documentados en App | Visibilidad del Inventario en Fuentes | Nuevas Entradas Verificadas | Enfoque Principal de la Expansión |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Kapitel 1: Alphabet & Zahlen | 0 | 692 | Completa3 | 10 | Abreviaturas oficiales B1 y multiplicadores7 |
| 2 | Kapitel 2: Zeit & Datum | 1 | 662 | Completa3 | 10 | Adverbios de frecuencia temporal, festivos y duración6 |
| 3 | Kapitel 3: Personen & Kontakte | 2 | 822 | Parcial (JSON base \+ 9 nombradas; V1 oculta)2 | 49 | Países, idiomas, familia extendida, derecho y sociedad6 |
| 4 | Kapitel 4: Basisverben & Adjektive | 14 | 1312 | Parcial (54 en base \+ V1/V2 y 9/18 ocultas)2 | 98 | Verbos con Dativo, reflexivos B1, sustantivos abstractos y adjetivos7 |
| 5 | Kapitel 5: Adverbien & Fragewörter | 15 | 332 | Casi completa (base \+ 4 nombradas)2 | 20 | Partículas modales, conectores discursivos y adverbios de lugar6 |
| 6 | Kapitel 6: Grammatik: Konnektoren | 13 | 502 | Parcial (36 base \+ 7/14 nombradas)2 | 3 | Preposición ab, conjunción B1 als ob y metalenguaje10 |
| 7 | Kapitel 7: Wohnen | 3 | 792 | Parcial (44 en JSON \+ V1/V2 y 3/9 ocultas)2 | 22 | Hogar, electrodomésticos, limpieza, pisos compartidos (WG) y gestión7 |
| 8 | Kapitel 8: Essen & Trinken | 5 | 862 | Parcial (56 visibles; \~30 de V1 ocultas)2 | 26 | Alimentos cotidianos, envases, gastronomía y oficios de cocina7 |
| 9 | Kapitel 9: Kleidung | 10 | 322 | Casi completa (29 de 32 visibles)2 | 8 | Prendas faltantes, complementos y accesorios de lluvia7 |
| 10 | Kapitel 10: Einkaufen | 6 | 332 | Parcial (23 en JSON \+ 6/8 nombradas)2 | 17 | Comercios especializados, efectivo, entregas y suscripciones7 |
| 11 | Kapitel 11: Freizeit | 4 | 612 | Parcial (29 en JSON \+ \~28 de V2 ocultas)2 | 48 | Deportes, música, animales domésticos, ocio digital y espectáculos6 |
| 12 | Kapitel 12: Reisen & Verkehr | 7 | 612 | Parcial (20 en JSON \+ \~26 de V2 y 8/15 ocultas)2 | 34 | Movilidad ferroviaria/aérea, turismo, naturaleza y clima severo7 |
| 13 | Kapitel 13: Fahrschuldeutsch: Auto | 12 | 702 | Completa3 | 124 | Anatomía vehicular, luces, maniobras, normas y testigos del tablero7 |
| 14 | Kapitel 14: Post & Bank | 8 | 452 | Completa (42 base \+ 3 nombradas)2 | 8 | Banca cotidiana, requerimientos de pago, telefonía y mensajería7 |
| 15 | Kapitel 15: Gesundheit | 9 | 682 | Parcial (40 en JSON \+ \~22 de V1 ocultas)2 | 16 | Anatomía complementaria, consulta médica, farmacia y adicciones7 |
| 16 | Kapitel 16: Schule & Beruf | 11 | 812 | Parcial (53 visibles \+ \~18 previas y 3/10 ocultas)2 | 92 | Profesiones A1–A2, sistema escolar alemán, asignaturas y lenguaje de examen6 |
| 17 | Kapitel 17: Digitale Welt & IT | 17 | 502 | Truncada (9 de 50 visibles)14 | 29 | Anglicismos digitales y soporte TI B1 (requiere cruce local)7 |
| 18 | Kapitel 18: Elektrotechnik & Solar | 16 | 50–922 | Truncada (8 visibles)15 | 12 | Energía, instalaciones, averías y herramientas (requiere cruce local)7 |
| 19 | Kapitel 22: Redemittel & Alltag | 22 | 862 | Completa en redemittelBegegnungen.js2 | 6 | Fórmulas situacionales de tuteo, citas, transporte y trabajo29 |
| Total | Inventario Consolidado App \+ Delta | 0–17, 22 | 1.089–1.195 \+ 862 | Mixta (ver limitaciones documentales)2 | 632 | Cobertura verificada sin duplicar términos confirmados1 |

El contraste entre los distintos módulos demuestra también un problema de aislamiento estructural: decenas de palabras esenciales aparecen únicamente incrustadas dentro de oraciones largas en Kapitel 22 o en diapositivas estáticas de goetheModules (g\_horen y g\_lesen), sin contar con ficha individual ni entrar al banco de evaluación de vocabulario\_completo.json1. Términos como ab\|fahren, der Anruf, der Anzug, drucken o das Hotel existen solo como fragmentos de diálogos situacionales en redemittelBegegnungen.js, lo cual impide entrenarlos en el reto de artículos (der/die/das) o en las rondas de vocabulario de los quizzes2. Promoverlos a tarjetas atómicas en sus capítulos correspondientes resuelve ese vacío sin duplicar registros en las Tablas Maestras2.

## **Arquitectura de Integración para Flashcards y Tablas Maestras**

Para incorporar estas 632 filas en src/data/chapters.jsx y mantener sincronizado vocabulario\_completo.json, cada columna de las tablas maestras presentadas en este informe corresponde de manera directa a las propiedades exigidas por los componentes React y por los scripts de respaldo de DeutschMeister PRO1. El identificador único de cada palabra y de su caché multimedia se calcula mediante la función getSafeId, que codifica el término alemán en Base64 seguro para URL (btoa(encodeURIComponent(str)).replace(/\[/+=\]/g, '\_')), vinculando en un solo paso el audio de la voz Charon, las imágenes y el almacenamiento local1.

| Columna en Reporte | Propiedad JS (chapters.jsx) | Propiedad JSON (vocabulario\_completo) | Función Operativa en Flashcards y Tablas Maestras |
| :---- | :---- | :---- | :---- |
| Alemán | de | word y semilla de id (getSafeId) | Término principal con barra \| para verbos separables (ab\|lehnen), activando el componente PincerSwitch2. |
| Fonética | pron | — | Transcripción fonética adaptada a la ortografía española para lectura guiada antes de reproducir Charon TTS1. |
| Español | es | — | Reverso de la Flashcard 3D y base para traducción inversa y generación de distractores homogéneos1. |
| Tipo / Gramática | type | — | Activa el código de color por género (der azul, die rojo, das verde, plural/invariable amarillo) y filtra distractores por tipo2. |
| Régimen / Plural | regimen y plural | — | Despliega casos obligatorios (+ Dativ, \+ Akkusativ), formas verbales de pasado y plurales en las Tablas Maestras2. |
| Ejemplo en Alemán | exampleSentenceDe | exampleSentenceDe | Oración contextual para lectura en voz alta, Cloze Test y DraggableSentenceBuilder2. |
| Ejemplo en Español | exampleSentenceEs | exampleSentenceEs | Traducción visible en el reverso de la Flashcard y en las pestañas interactivas del Leselabor2. |
| Categoría App / Nivel | category (y etiqueta CEFR) | — | Genera las píldoras de filtrado rápido en cada capítulo de la Tabla Maestra e identifica el salto A1–A2–B12. |

Durante la inyección técnica mediante scripts basados en @babel/parser (siguiendo el patrón de merge\_chapters.js), debes verificar los títulos actualizados tras la ejecución de reordenar\_capitulos.js4. Algunos capítulos conservaron su id numérico antiguo en código a pesar de cambiar su posición visual en el menú —por ejemplo, Kapitel 4: Basisverben & Adjektive corresponde al id: 14, Kapitel 6: Grammatik: Konnektoren al id: 13 y Kapitel 18: Elektrotechnik & Solar al id: 16—4. Una vez insertados los bloques y regenerados los hashes Base64 de vocabulario\_completo.json para preservar la compatibilidad con scripts/init\_db.js2, conviene poblar la propiedad en (prompt visual en inglés) exclusivamente en sustantivos concretos o verbos de acción dinámica para optimizar la caché gráfica en dispositivos móviles1.

## **Catálogo Maestro de Palabras Nuevas por Capítulo**

A continuación se despliegan las 632 entradas nuevas distribuidas por capítulo. Todos los términos se listan con sus ocho campos normalizados para conversión directa a objetos JavaScript y JSON.

### **Kapitel 1: Alphabet & Zahlen (ID interno 0\)**

Este capítulo añade 10 entradas enfocadas en abreviaturas de lectura habitual en documentos administrativos y exámenes oficiales B1, además de modificadores numéricos y temporales ausentes de la base original7.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| bzw. (beziehungsweise) | be-tsí-ungs-vai-ze | o bien / respectivamente | Abreviatura / Conector | Invariable | Der Kurs findet montags bzw. mittwochs statt. | El curso tiene lugar los lunes o bien los miércoles. | Abkürzungen / B17 |
| ca. (circa) | tsír-ka | aproximadamente / aprox. | Abreviatura / Adverbio | Invariable | Die Fahrt dauert ca. zwanzig Minuten. | El viaje dura aproximadamente veinte minutos. | Abkürzungen / B17 |
| d. h. (das heißt) | das jaist | es decir / o sea | Abreviatura / Frase | Invariable | Morgen ist Feiertag, d. h. die Geschäfte sind zu. | Mañana es festivo, es decir, las tiendas están cerradas. | Abkürzungen / B17 |
| doppelt | dó-pelt | doble / por duplicado | Adjetivo / Adverbio | Prefijo: Doppel- | Bitte füllen Sie das Formular doppelt aus. | Por favor, rellene el formulario por duplicado. | Zahlen / A2–B110 |
| etc. (et cetera) | et tsé-te-ra | etcétera | Abreviatura | Invariable | Wir brauchen Papier, Stifte, Ordner etc. | Necesitamos papel, bolígrafos, carpetas, etc. | Abkürzungen / B17 |
| halb | jalp | medio / a medias | Adjetivo / Adverbio | Invariable con medidas sin declinar | Ich habe nur eine halbe Stunde Zeit. | Solo tengo media hora de tiempo. | Zahlen / A1–B17 |
| das Jahrhundert | das yár-jun-dert | el siglo | Sustantivo (Neutro) | Pl: die Jahrhunderte | Im zwanzigsten Jahrhundert gab es viele Erfindungen. | En el siglo XX hubo muchos inventos. | Zahlen / A2–B124 |
| usw. (und so weiter) | unt zo vái-ta | y así sucesivamente / etc. | Abreviatura | Invariable | Im Supermarkt gibt es Obst, Gemüse, Käse usw. | En el supermercado hay fruta, verdura, queso, etc. | Abkürzungen / B17 |
| vgl. (vergleiche) | fea-glái-je | véase / compárese | Abreviatura / Imperativo | Uso en textos y exámenes | Vgl. hierzu die Tabelle auf Seite drei. | Véase al respecto la tabla de la página tres. | Abkürzungen / B17 |
| z. B. (zum Beispiel) | tsum bái-shpil | por ejemplo | Abreviatura | Invariable | Ich mag Sport, z. B. Schwimmen und Radfahren. | Me gusta el deporte, por ejemplo, nadar y montar en bici. | Abkürzungen / B17 |

### **Kapitel 2: Zeit & Datum (ID interno 1\)**

Se añaden 10 términos temporales que cubren adverbios relativos de nivel A2–B1, días festivos y sustantivos clave de agenda y duración6.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| anfangs | án-fangs | al principio / inicialmente | Adverbio | Temporal | Anfangs war die deutsche Grammatik schwer für mich. | Al principio la gramática alemana era difícil para mí. | Zeitangaben / B17 |
| halbtags | jálp-taks | a media jornada / medio tiempo | Adverbio | Laboral | Meine Frau arbeitet zurzeit halbtags. | Mi esposa trabaja actualmente a media jornada. | Alltag / B17 |
| häufig | jói-fij | frecuente / a menudo | Adjetivo / Adverbio | Comp: häufiger | Dieser Zug hat leider häufig Verspätung. | Lamentablemente este tren tiene retraso con frecuencia. | Zeitangaben / B17 |
| der Kalender | dea ka-lén-da | el calendario / agenda | Sustantivo (Masc) | Pl: die Kalender | Ich trage den Termin sofort in meinen Kalender ein. | Anoto la cita inmediatamente en mi calendario. | Zeitangaben / A218 |
| lang(e) | lán-gue | mucho tiempo / largo | Adverbio | Temporal | Wie lange dauert der Deutschkurs noch? | ¿Cuánto tiempo dura todavía el curso de alemán? | Zeitangaben / A1–B110 |
| längst | lengst | desde hace mucho / ya hace tiempo | Adverbio | Temporal | Der Bus ist längst abgefahren. | El autobús salió ya hace mucho tiempo. | Zeitangaben / B110 |
| das Mal | das mal | la vez / ocasión | Sustantivo (Neutro) | Pl: die Male | Das ist das erste Mal, dass ich in Berlin bin. | Es la primera vez que estoy en Berlín. | Zeitangaben / A2–B110 |
| Ostern | ós-tern | Pascua / Semana Santa | Sustantivo (Plural/Neutro) | Sin artículo en uso general | An Ostern besuchen wir unsere Großeltern. | En Semana Santa visitamos a nuestros abuelos. | Feiertage / A16 |
| die Stunde | di shtún-de | la hora (duración) / clase | Sustantivo (Fem) | Pl: die Stunden | Der Unterricht dauert heute zwei Stunden. | La clase dura hoy dos horas. | Zeitangaben / A1–B17 |
| der Tagesablauf | dea tá-gues-ap-lauf | la rutina diaria / agenda del día | Sustantivo (Masc) | Pl: die Tagesabläufe | Beschreiben Sie bitte Ihren normalen Tagesablauf\! | Por favor, describa su rutina diaria normal. | Alltag / B17 |

### **Kapitel 3: Personen & Kontakte (ID interno 2\)**

Este bloque incorpora 49 entradas nuevas: 22 sustantivos y adjetivos de relaciones familiares, justicia, administración y vida social, junto con los 17 países y 10 idiomas del currículo A1 ausentes como fichas independientes en vocabulario\_completo.json.txt6. Si tu instalación local conserva las palabras no listadas del lote V1 (capítulo 2 previo al reordenamiento)13, valida por ID al fusionar.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| das Altenheim / Altersheim | das ál-ten-jaim | la residencia de ancianos | Sustantivo (Neutro) | Pl: die Altenheime | Meine Großmutter lebt sehr zufrieden im Altersheim. | Mi abuela vive muy contenta en la residencia de ancianos. | Gesellschaft / B110 |
| das Amt | das amt | la oficina pública / cargo | Sustantivo (Neutro) | Pl: die Ämter | Ich habe morgen einen Termin auf dem Amt. | Mañana tengo una cita en la oficina pública. | Behörden / A2–B110 |
| der Angehörige | dea án-gue-jö-ri-gue | el familiar / pariente | Sustantivo (Masc/Fem) | Declina como adjetivo; Pl: die Angehörigen | Nur nahe Angehörige dürfen den Patienten besuchen. | Solo los familiares cercanos pueden visitar al paciente. | Familie / B110 |
| der Anwalt | dea án-valt | el abogado | Sustantivo (Masc) | Pl: die Anwälte (Fem: die Anwältin) | Bei diesem Problem brauchen Sie einen guten Anwalt. | Con este problema necesita un buen abogado. | Gesellschaft / B110 |
| die Arbeitserlaubnis | di ár-baits-ea-laup-nis | el permiso de trabajo | Sustantivo (Fem) | Generalmente singular | Mit diesem Visum erhalten Sie eine Arbeitserlaubnis. | Con este visado obtiene un permiso de trabajo. | Behörden / A2–B110 |
| der Babysitter / die Babysitterin | dea béi-bi-si-ta | el niñero / la niñera | Sustantivo (Masc/Fem) | Pl: die Babysitter / \-innen | Am Freitagabend kommt ein Babysitter zu uns. | El viernes por la noche viene un canguro a nuestra casa. | Familie / A2–B17 |
| die Demokratie | di de-mo-kra-tí | la democracia | Sustantivo (Fem) | Pl: die Demokratien | Deutschland ist eine parlamentarische Demokratie. | Alemania es una democracia parlamentaria. | Gesellschaft / B110 |
| demokratisch | de-mo-krá-tish | democrático | Adjetivo | Atributivo/Predicativo | Die Wahl war frei und demokratisch. | La elección fue libre y democrática. | Gesellschaft / B110 |
| der/die Deutsche | dea/di dói-che | el alemán / la alemana | Sustantivo (Masc/Fem) | Declinación adjetival; Pl: die Deutschen | Viele Deutsche trinken morgens gern Kaffee. | A muchos alemanes les gusta tomar café por la mañana. | Personen / A16 |
| die Ehe | di é-e | el matrimonio | Sustantivo (Fem) | Pl: die Ehen | Sie führen eine sehr glückliche Ehe. | Llevan un matrimonio muy feliz. | Familie / B110 |
| der Einbrecher | dea áin-bre-ja | el ladrón (allanamiento) | Sustantivo (Masc) | Pl: die Einbrecher | Die Polizei hat den Einbrecher gestern gefasst. | La policía detuvo ayer al ladrón. | Gesellschaft / B110 |
| der Einbruch | dea áin-bruj | el robo con allanamiento | Sustantivo (Masc) | Pl: die Einbrüche | Nach dem Einbruch riefen wir sofort die Polizei. | Tras el robo llamamos de inmediato a la policía. | Gesellschaft / B110 |
| die Enkelin | di én-ke-lin | la nieta | Sustantivo (Fem) | Pl: die Enkelinnen | Meine Enkelin geht jetzt in die Grundschule. | Mi nieta va ahora a la escuela primaria. | Familie / A29 |
| die Erziehung | di ea-tsí-ung | la educación / crianza | Sustantivo (Fem) | Singular | Die Erziehung der Kinder ist eine große Aufgabe. | La crianza de los hijos es una gran tarea. | Familie / A16 |
| die Großmutter / der Großvater | di grós-mu-ta / dea grós-fa-ta | la abuela / el abuelo | Sustantivo (Fem/Masc) | Pl: die Großmütter / die Großväter | Mein Großvater wohnt schon lange in Hamburg. | Mi abuelo vive desde hace mucho en Hamburgo. | Familie / A29 |
| der Killer / die Killerin | dea kí-la | el asesino / la asesina (ficción/prensa) | Sustantivo (Masc/Fem) | Pl: die Killer / \-innen | Im Krimi sucht der Kommissar den Killer. | En la novela policiaca el comisario busca al asesino. | Personen / B17 |
| die Mama | di má-ma | la mamá | Sustantivo (Fem) | Pl: die Mamas | Mama, wann essen wir heute zu Mittag? | Mamá, ¿cuándo almorzamos hoy? | Familie / A1–B110 |
| man | man | se / uno (impersonal) | Pronombre indefinido | Siempre 3.ª persona singular | In Deutschland spricht man Deutsch. | En Alemania se habla alemán. | Personen / A1–B110 |
| der Onkel | dea ón-kel | el tío | Sustantivo (Masc) | Pl: die Onkel | Mein Onkel arbeitet als Ingenieur in Köln. | Mi tío trabaja como ingeniero en Colonia. | Familie / A29 |
| die Tante | di tán-te | la tía | Sustantivo (Fem) | Pl: die Tanten | Am Sonntag besuchen wir meine Tante. | El domingo visitamos a mi tía. | Familie / B17 |
| die Tat | di tat | el hecho / acto / delito | Sustantivo (Fem) | Pl: die Taten | Die Polizei untersucht die Tat noch genau. | La policía aún investiga el hecho con detalle. | Gesellschaft / B17 |
| der Täter / die Täterin | dea té-ta / di té-te-rin | el autor / culpable (del hecho) | Sustantivo (Masc/Fem) | Pl: die Täter / \-innen | Es gibt noch keine Spur von dem Täter. | Todavía no hay rastro del culpable. | Gesellschaft / B17 |
| Brasilien | bra-zí-lien | Brasil | Sustantivo (Neutro) | Sin artículo: aus/in Brasilien | Carlos kommt aus Brasilien. | Carlos viene de Brasil. | Länder / A125 |
| China | jí-na / shí-na | China | Sustantivo (Neutro) | Sin artículo: aus/in China | Viele Produkte kommen heute aus China. | Muchos productos vienen hoy de China. | Länder / A125 |
| Deutschland | dóitsh-lant | Alemania | Sustantivo (Neutro) | Sin artículo: in/nach Deutschland | Seit einem Jahr lebe ich in Deutschland. | Desde hace un año vivo en Alemania. | Länder / A16 |
| England | éng-lant | Inglaterra | Sustantivo (Neutro) | Sin artículo: in/aus England | Ben kommt aus England und spricht Englisch. | Ben viene de Inglaterra y habla inglés. | Länder / A125 |
| Frankreich | fránk-raij | Francia | Sustantivo (Neutro) | Sin artículo: in/nach Frankreich | Paris ist die Hauptstadt von Frankreich. | París es la capital de Francia. | Länder / A125 |
| Griechenland | grí-jen-lant | Grecia | Sustantivo (Neutro) | Sin artículo: in/aus Griechenland | Im Sommer fliegen wir nach Griechenland. | En verano volamos a Grecia. | Länder / A125 |
| Italien | i-tá-lien | Italia | Sustantivo (Neutro) | Sin artículo: in/aus Italien | Nicoletta kommt aus Italien. | Nicoletta viene de Italia. | Länder / A125 |
| Japan | yá-pan | Japón | Sustantivo (Neutro) | Sin artículo: in/aus Japan | Tokio liegt in Japan. | Tokio está en Japón. | Länder / A125 |
| Kanada | ká-na-da | Canadá | Sustantivo (Neutro) | Sin artículo: in/aus Kanada | Mein Freund arbeitet jetzt in Kanada. | Mi amigo trabaja ahora en Canadá. | Länder / A125 |
| Österreich | ö́s-te-raij | Austria | Sustantivo (Neutro) | Sin artículo: in/aus Österreich | Salzburg liegt in Österreich. | Salzburgo está en Austria. | Länder / A125 |
| Polen | pó-len | Polonia | Sustantivo (Neutro) | Sin artículo: in/aus Polen | Meine Nachbarin kommt aus Polen. | Mi vecina viene de Polonia. | Länder / A125 |
| Russland | rús-lant | Rusia | Sustantivo (Neutro) | Sin artículo: in/aus Russland | Moskau ist die Hauptstadt von Russland. | Moscú es la capital de Rusia. | Länder / A125 |
| die Schweiz | di shvaits | Suiza | Sustantivo (Fem) | Con artículo: in der / aus der / in die Schweiz | In der Schweiz spricht man vier Sprachen. | En Suiza se hablan cuatro idiomas. | Länder / A125 |
| Spanien | shpá-nien | España | Sustantivo (Neutro) | Sin artículo: in/aus Spanien | Madrid liegt in Spanien. | Madrid está en España. | Länder / A125 |
| die Türkei | di tür-kái | Turquía | Sustantivo (Fem) | Con artículo: aus der / in die Türkei | Meine Kollegen fliegen in die Türkei. | Mis compañeros vuelan a Turquía. | Länder / A125 |
| Ungarn | ún-garn | Hungría | Sustantivo (Neutro) | Sin artículo: in/aus Ungarn | Claudine wohnt seit drei Jahren in Ungarn. | Claudine vive desde hace tres años en Hungría. | Länder / A125 |
| die USA | di u-es-á | los Estados Unidos (EE. UU.) | Sustantivo (Plural) | Con artículo plural: aus den / in den USA | Er studiert ein Jahr in den USA. | Él estudia un año en los EE. UU. | Länder / A125 |
| Deutsch | doitsh | alemán (idioma) | Sustantivo (Neutro) | auf Deutsch / Deutsch sprechen | Wie heißt dieses Wort auf Deutsch? | ¿Cómo se dice esta palabra en alemán? | Sprachen / A125 |
| Englisch | éng-lish | inglés (idioma) | Sustantivo (Neutro) | Englisch sprechen | Im Büro sprechen wir oft Englisch. | En la oficina hablamos a menudo inglés. | Sprachen / A125 |
| Französisch | fran-tsö́-zish | francés (idioma) | Sustantivo (Neutro) | Französisch lernen | In der Schule lerne ich Englisch und Französisch. | En el colegio aprendo inglés y francés. | Sprachen / A125 |
| Griechisch | grí-jish | griego (idioma) | Sustantivo (Neutro) | Griechisch sprechen | Meine Tante spricht Griechisch. | Mi tía habla griego. | Sprachen / A125 |
| Italienisch | i-ta-lié-nish | italiano (idioma) | Sustantivo (Neutro) | Italienisch verstehen | Ich verstehe ein bisschen Italienisch. | Entiendo un poco de italiano. | Sprachen / A125 |
| Polnisch | pól-nish | polaco (idioma) | Sustantivo (Neutro) | Polnisch sprechen | Dagmara spricht Polnisch und Deutsch. | Dagmara habla polaco y alemán. | Sprachen / A125 |
| Russisch | rú-sish | ruso (idioma) | Sustantivo (Neutro) | Russisch lernen | Meine Kollegin lernt Russisch. | Mi compañera aprende ruso. | Sprachen / A125 |
| Spanisch | shpá-nish | español (idioma) | Sustantivo (Neutro) | Spanisch als Muttersprache | Meine Muttersprache ist Spanisch. | Mi lengua materna es el español. | Sprachen / A125 |
| Türkisch | tǘr-kish | turco (idioma) | Sustantivo (Neutro) | Türkisch sprechen | Ünal spricht Türkisch und Polnisch. | Ünal habla turco y polaco. | Sprachen / A126 |
| Ungarisch | ún-ga-rish | húngaro (idioma) | Sustantivo (Neutro) | Ungarisch sprechen | Ágotá kommt aus Ungarn und spricht Ungarisch. | Ágotá es de Hungría y habla húngaro. | Sprachen / A125 |

### **Kapitel 4: Basisverben & Adjektive (ID interno 14\)**

Este capítulo concentra 98 nuevas entradas: 46 verbos esenciales (incluyendo verbos con régimen obligatorio de Dativo de tu guía Dative\_Engineering.pdf y verbos separables/reflexivos de DTZ), 21 sustantivos abstractos de estado o comunicación vinculados directamente a sus verbos y adjetivos base, y 31 adjetivos calificativos7. Dado que en los registros del proyecto constan lotes previos no desglosados en este capítulo —expansiones V1/V2 y 9 términos no enumerados del bloque de 18 palabras sobre verbos con dativo, reflexivos y actitudes—2, valida posibles coincidencias (especialmente en danken, gehören, glauben, gratulieren, verzeihen, zuhören, sich ärgern o sich entschuldigen) mediante getSafeId al cargar tu script local.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ab\|hängen | áp-jen-guen | depender | Verbo separable | von \+ Dativ / hängt ab, hing ab, hat abgehangen | Das hängt ganz vom Wetter ab. | Eso depende totalmente del tiempo. | Basisverben / B110 |
| ab\|lehnen | áp-le-nen | rechazar / denegar | Verbo separable | \+ Akkusativ / lehnt ab, lehnte ab, hat abgelehnt | Es tut mir leid, Ihr Antrag ist abgelehnt. | Lo siento, su solicitud ha sido denegada. | Basisverben / B110 |
| ab\|machen | áp-ma-jen | acordar / quedar en | Verbo separable | \+ Akkusativ / macht ab, machte ab, hat abgemacht | Wir hatten doch abgemacht, dass du kommst. | Habíamos acordado que vendrías. | Basisverben / B110 |
| ab\|nehmen | áp-ne-men | adelgazar / disminuir / quitar | Verbo separable | \+ Akkusativ / nimmt ab, nahm ab, hat abgenommen | Morgen können wir den Verband abnehmen. | Mañana podemos quitar el vendaje. | Basisverben / B110 |
| ab\|stimmen | áp-shti-men | votar / coordinar | Verbo separable | über \+ Akk / stimmt ab, hat abgestimmt | Wir müssen über den Termin abstimmen. | Tenemos que votar sobre la cita. | Basisverben / B110 |
| achten | áj-ten | prestar atención / respetar | Verbo regular | auf \+ Akkusativ / achtet, achtete, hat geachtet | Bitte achten Sie auf Ihre Gesundheit. | Por favor, cuide de su salud. | Basisverben / B110 |
| akzeptieren | ak-tsep-tí-ren | aceptar | Verbo (-ieren) | \+ Akkusativ / akzeptiert, akzeptierte, hat akzeptiert | Ich kann diese Bedingungen nicht akzeptieren. | No puedo aceptar estas condiciones. | Basisverben / B110 |
| sich amüsieren | zij a-mü-zí-ren | divertirse | Verbo reflexivo | über \+ Akk / amüsiert sich, hat sich amüsiert | Habt ihr euch auf der Party gut amüsiert? | ¿Os divertisteis bien en la fiesta? | Basisverben / A2–B110 |
| analysieren | a-na-lü-zí-ren | analizar | Verbo (-ieren) | \+ Akkusativ / analysiert, analysierte, hat analysiert | Wir müssen die Daten genau analysieren. | Tenemos que analizar los datos con exactitud. | Basisverben / B110 |
| an\|bieten | án-bi-ten | ofrecer | Verbo separable | \+ Dativ \+ Akkusativ / bietet an, bot an, hat angeboten | Was bieten Sie mir an? Ich biete Ihnen einen Saft an. | ¿Qué me ofrece? Le ofrezco un zumo. | Basisverben / A2–B110 |
| ändern | én-dern | cambiar / modificar | Verbo regular | \+ Akkusativ / ändert, änderte, hat geändert | Wir müssen leider den Termin ändern. | Lamentablemente tenemos que cambiar la cita. | Basisverben / A2–B110 |
| an\|erkennen | án-ea-ke-nen | reconocer / convalidar | Verbo separable | \+ Akkusativ / erkennt an, erkannte an, hat anerkannt | Wird mein Berufsabschluss in Deutschland anerkannt? | ¿Se convalida mi título profesional en Alemania? | Basisverben / B110 |
| an\|geben | án-gue-ben | indicar / declarar | Verbo separable | \+ Akkusativ / gibt an, gab an, hat angegeben | Bitte geben Sie Ihren Namen und die Adresse an. | Por favor, indique su nombre y la dirección. | Basisverben / B110 |
| an\|sehen | án-ze-en | mirar / contemplar | Verbo separable | \+ Akkusativ / sieht an, sah an, hat angesehen | Sieh dir bitte dieses Foto genau an\! | ¡Mira esta foto detenidamente, por favor\! | Basisverben / A2–B110 |
| an\|sprechen | án-shpre-jen | dirigirse a / abordar | Verbo separable | \+ Akkusativ / spricht an, sprach an, hat angesprochen | Ich möchte dieses Thema im Meeting ansprechen. | Quisiera abordar este tema en la reunión. | Basisverben / B110 |
| an\|stellen | án-shte-len | contratar / encender / hacer cola (sich) | Verbo separable | \+ Akkusativ / stellt an, stellte an, hat angestellt | Die Firma stellt im Sommer zehn neue Arbeiter an. | La empresa contrata en verano a diez trabajadores nuevos. | Basisverben / B110 |
| sich an\|strengen | zij án-shtren-guen | esforzarse | Verbo reflexivo sep. | strengt sich an, strengte sich an, hat sich angestrengt | Du musst dich bei der Prüfung sehr anstrengen. | Tienes que esforzarte mucho en el examen. | Basisverben / B110 |
| an\|wenden | án-ven-den | aplicar / emplear | Verbo separable | \+ Akkusativ / wendet an, wandte an, hat angewandt | Wie wendet man diese Regel richtig an? | ¿Cómo se aplica correctamente esta regla? | Basisverben / B110 |
| an\|zeigen | án-tsai-guen | denunciar / indicar | Verbo separable | \+ Akkusativ / zeigt an, zeigte an, hat angezeigt | Er hat den Diebstahl sofort bei der Polizei angezeigt. | Él denunció el robo inmediatamente ante la policía. | Basisverben / B110 |
| ärgern / sich ärgern | ér-guern | molestar / enojarse | Verbo regular/refl. | über \+ Akk / ärgert, ärgerte, hat geärgert | Ich ärgere mich über den langen Stau. | Me enojo por el largo atasco. | Basisverben / A2–B110 |
| bitten | bí-ten | pedir / rogar | Verbo irregular | um \+ Akkusativ / bittet, bat, hat gebeten | Ich bitte den Chef um Hilfe. | Le pido ayuda al jefe. | Basisverben / A1–B120 |
| danken | dán-ken | agradecer | Verbo regular | \+ Dativ \+ für \+ Akk / dankt, dankte, hat gedankt | Ich danke Ihnen für das Geschenk. | Le agradezco por el regalo. | Basisverben / A1–B120 |
| drehen | dré-en | girar / rodar | Verbo regular | \+ Akkusativ / dreht, drehte, hat gedreht | Drehen Sie den Schlüssel bitte nach rechts\! | ¡Gire la llave hacia la derecha, por favor\! | Basisverben / B110 |
| ein\|fallen | áin-fa-len | ocurrírsele a alguien | Verbo separable | \+ Dativ / fällt ein, fiel ein, ist eingefallen | Mir fällt sein Name leider nicht mehr ein. | Lamentablemente ya no se me ocurre su nombre. | Basisverben / B110 |
| entschuldigen / sich entschuldigen | ent-shúl-di-guen | disculpar / disculparse | Verbo inseparable | \+ Akk / für \+ Akk / entschuldigt, hat entschuldigt | Ich entschuldige mich für die Verspätung. | Me disculpo por el retraso. | Basisverben / A1–B120 |
| erlauben | ea-láu-ben | permitir | Verbo inseparable | \+ Dativ \+ Akk / erlaubt, erlaubte, hat erlaubt | Ich erlaube das Rauchen hier nicht. | No permito fumar aquí. | Basisverben / A1–B120 |
| gehören | gue-jö́-ren | pertenecer | Verbo inseparable | \+ Dativ / gehört, gehörte, hat gehört | Wem gehört das System? Das gehört dem Techniker. | ¿A quién pertenece el sistema? Pertenece al técnico. | Basisverben / A1–B120 |
| glauben | gláu-ben | creer | Verbo regular | \+ Dativ (persona) / glaubt, glaubte, hat geglaubt | Ich glaube dir jedes Wort. | Te creo cada palabra. | Basisverben / A1–B123 |
| gratulieren | gra-tu-lí-ren | felicitar | Verbo (-ieren) | \+ Dativ \+ zu \+ Dat / gratuliert, hat gratuliert | Ich gratuliere meiner Tochter herzlich\! | ¡Felicito cordialmente a mi hija\! | Basisverben / A1–B120 |
| handeln | ján-deln | actuar / tratar / comerciar | Verbo regular | von \+ Dat / mit \+ Dat / handelt, hat gehandelt | Der Film handelt von einer großen Reise. | La película trata sobre un gran viaje. | Basisverben / B17 |
| hängen | jén-guen | colgar / estar colgado | Verbo mixto | \+ Akk (poner) / \+ Dat (estar) / hing / hängte | Das Bild hängt schon lange an der Wand. | El cuadro cuelga desde hace mucho en la pared. | Basisverben / A2–B17 |
| hassen | já-sen | odiar | Verbo regular | \+ Akkusativ / hasst, hasste, hat gehasst | Ich hasse es, im Regen zu warten. | Odio esperar bajo la lluvia. | Basisverben / A2–B17 |
| laufen | láu-fen | correr / caminar / funcionar | Verbo irregular | läuft, lief, ist gelaufen | Wir laufen jeden Morgen im Park. | Corremos todas las mañanas en el parque. | Basisverben / A1–B110 |
| leiden | lái-den | sufrir / padecer | Verbo irregular | an / unter \+ Dativ / leidet, litt, hat gelitten | Er leidet oft unter starken Kopfschmerzen. | Él sufre a menudo de fuertes dolores de cabeza. | Basisverben / B17 |
| leisten | láis-ten | lograr / permitirse | Verbo regular | sich (Dat) \+ Akk / leistet, leistete, hat geleistet | Dieses teure Auto kann ich mir nicht leisten. | No me puedo permitir este coche caro. | Basisverben / B17 |
| leiten | lái-ten | dirigir / liderar | Verbo regular | \+ Akkusativ / leitet, leitete, hat geleitet | Frau Weber leitet die neue Abteilung. | La Sra. Weber dirige el nuevo departamento. | Basisverben / B17 |
| lieben | lí-ben | amar / querer mucho | Verbo regular | \+ Akkusativ / liebt, liebte, hat geliebt | Ich liebe meine Familie über alles. | Amo a mi familia por encima de todo. | Basisverben / A1–B17 |
| lügen | lǘ-guen | mentir | Verbo irregular | lügt, log, hat gelogen | Man darf vor Gericht nicht lügen. | No está permitido mentir ante el tribunal. | Basisverben / B110 |
| stimmen | shtí-men | ser cierto / estar bien / votar | Verbo regular | Intransitivo / stimmt, stimmte, hat gestimmt | Die Rechnung stimmt auf den Cent genau. | La cuenta cuadra exactamente al céntimo. | Basisverben / A2–B17 |
| stoppen | shtó-pen | detener / parar | Verbo regular | \+ Akkusativ / stoppt, stoppte, hat gestoppt | Die Polizei musste das Fahrzeug stoppen. | La policía tuvo que detener el vehículo. | Basisverben / A2–B17 |
| stören | shtö́-ren | molestar / perturbar | Verbo regular | \+ Akkusativ / stört, störte, hat gestört | Entschuldigung, störe ich Sie gerade? | Disculpe, ¿le molesto en este momento? | Basisverben / A2–B17 |
| stoßen | shtó-sen | empujar / golpear | Verbo irregular | auf / gegen \+ Akk / stößt, stieß, hat gestoßen | Ich habe mir den Kopf an der Tür gestoßen. | Me he golpeado la cabeza contra la puerta. | Basisverben / B17 |
| stürzen | shtǘr-tsen | caer / desplomarse | Verbo regular | stürzt, stürzte, ist gestürzt | Der Radfahrer ist auf der nassen Straße gestürzt. | El ciclista se cayó en la calle mojada. | Basisverben / B17 |
| suchen | zú-jen | buscar | Verbo regular | \+ Akkusativ / sucht, suchte, hat gesucht | Ich suche schon seit einer Stunde meinen Schlüssel. | Llevo una hora buscando mi llave. | Basisverben / A1–B17 |
| verzeihen | fea-tsái-en | perdonar | Verbo inseparable | \+ Dativ / verzeiht, verzieh, hat verziehen | Bitte verzeihen Sie mir diesen Fehler\! | ¡Por favor, perdóneme este error\! | Basisverben / A1–B123 |
| zu\|hören | tsú-jö-ren | escuchar atentamente | Verbo separable | \+ Dativ / hört zu, hörte zu, hat zugehört | Hör mir bitte genau zu\! | ¡Escúchame con atención, por favor\! | Basisverben / A1–B123 |
| die Absicht | di áp-zijt | la intención / propósito | Sustantivo (Fem) | Pl: die Absichten | Das habe ich nicht mit Absicht gemacht. | No lo he hecho a propósito. | Abstrakte / B110 |
| die Ahnung | di á-nung | la idea / noción | Sustantivo (Fem) | Pl: die Ahnungen | Tut mir leid, ich habe keine Ahnung. | Lo siento, no tengo ni idea. | Abstrakte / A2–B110 |
| die Aktion | di ak-tsión | la acción / campaña | Sustantivo (Fem) | Pl: die Aktionen | Die Umweltaktion findet am Samstag statt. | La campaña ambiental tiene lugar el sábado. | Abstrakte / B110 |
| die Aktivität | di ak-ti-vi-tét | la actividad | Sustantivo (Fem) | Pl: die Aktivitäten | Welche Aktivitäten planen wir am Wochenende? | ¿Qué actividades planeamos el fin de semana? | Abstrakte / A2–B110 |
| die Änderung | di én-de-rung | el cambio / modificación | Sustantivo (Fem) | Pl: die Änderungen | Gab es noch eine Änderung im Fahrplan? | ¿Hubo algún cambio más en el horario? | Abstrakte / A2–B110 |
| die Angabe | di án-ga-be | el dato / indicación | Sustantivo (Fem) | Pl: die Angaben | Bitte überprüfen Sie Ihre persönlichen Angaben. | Por favor, compruebe sus datos personales. | Abstrakte / B110 |
| die Angst | di angst | el miedo / temor | Sustantivo (Fem) | Pl: die Ängste | Vor der Prüfung hat sie ein bisschen Angst. | Tiene un poco de miedo antes del examen. | Gefühle / A1–B16 |
| der Anspruch | dea án-shpruj | el derecho / exigencia | Sustantivo (Masc) | Pl: die Ansprüche | Sie haben Anspruch auf zwanzig Tage Urlaub. | Tiene derecho a veinte días de vacaciones. | Abstrakte / B110 |
| die Antwort | di ánt-vort | la respuesta | Sustantivo (Fem) | Pl: die Antworten | Weißt du schon die Antwort auf diese Frage? | ¿Sabes ya la respuesta a esta pregunta? | Kommunikation / A1–B16 |
| der Ärger | dea ér-gua | el enfado / problema / lío | Sustantivo (Masc) | Singular | Wegen der Verspätung gab es großen Ärger. | Hubo un gran enfado por el retraso. | Gefühle / B110 |
| die Art | di art | la manera / tipo / especie | Sustantivo (Fem) | Pl: die Arten | Diese Art von Musik gefällt mir sehr. | Este tipo de música me gusta mucho. | Abstrakte / B110 |
| die Eile | di ái-le | la prisa | Sustantivo (Fem) | Singular | In der Eile habe ich mein Handy vergessen. | Con las prisas he olvidado mi móvil. | Gefühle / B110 |
| der Eindruck | dea áin-druk | la impresión | Sustantivo (Masc) | Pl: die Eindrücke | Der neue Kollege macht einen sehr guten Eindruck. | El nuevo compañero da una muy buena impresión. | Abstrakte / B110 |
| der Einfall | dea áin-fal | la ocurrencia / idea brillante | Sustantivo (Masc) | Pl: die Einfälle | Das ist wirklich ein guter Einfall\! | ¡Esa es de verdad una buena idea\! | Abstrakte / B110 |
| der Einfluss | dea áin-flus | la influencia | Sustantivo (Masc) | Pl: die Einflüsse / auf \+ Akk | Das Wetter hat großen Einfluss auf meine Laune. | El clima tiene gran influencia en mi ánimo. | Abstrakte / B110 |
| die Liebe | di lí-be | el amor | Sustantivo (Fem) | Singular | Die Liebe zur Natur ist in Deutschland stark. | El amor por la naturaleza es fuerte en Alemania. | Gefühle / A2–B17 |
| die Lüge | di lǘ-gue | la mentira | Sustantivo (Fem) | Pl: die Lügen | Das war doch nur eine kleine Lüge. | Eso fue solo una pequeña mentira. | Kommunikation / B110 |
| die Lust | di lust | las ganas / el deseo | Sustantivo (Fem) | haben \+ Lust auf \+ Akk | Hast du heute Abend Lust auf Kino? | ¿Tienes ganas de ir al cine esta noche? | Gefühle / A2–B110 |
| die Stimme | di shtí-me | la voz / el voto | Sustantivo (Fem) | Pl: die Stimmen | Er hat eine sehr ruhige und klare Stimme. | Tiene una voz muy tranquila y clara. | Kommunikation / B17 |
| die Stimmung | di shtí-mung | el ambiente / estado de ánimo | Sustantivo (Fem) | Pl: die Stimmungen | Die Stimmung auf dem Fest war fantastisch. | El ambiente en la fiesta fue fantástico. | Gefühle / B17 |
| das Talent | das ta-lént | el talento | Sustantivo (Neutro) | Pl: die Talente | Sie hat ein großes Talent für Sprachen. | Ella tiene un gran talento para los idiomas. | Abstrakte / B17 |
| abhängig | áp-jen-guij | dependiente | Adjetivo | von \+ Dativ | Der Preis ist von der Größe abhängig. | El precio depende del tamaño. | Adjektive / B110 |
| absolut | ap-zo-lút | absoluto / totalmente | Adjetivo / Adverbio | Invariable como adverbio | Das ist absolut richtig\! | ¡Eso es absolutamente correcto\! | Adjektive / B110 |
| ähnlich | én-lij | similar / parecido | Adjetivo | \+ Dativ | Mein Bruder sieht mir sehr ähnlich. | Mi hermano se parece mucho a mí. | Adjektive / A2–B110 |
| aktiv | ak-tíf | activo | Adjetivo | Comp: aktiver | Meine Großeltern sind noch sehr aktiv. | Mis abuelos son todavía muy activos. | Adjektive / A2–B110 |
| aktuell | ak-tu-él | actual / vigente | Adjetivo | Comp: aktueller | Ich brauche eine aktuelle Meldebescheinigung. | Necesito un certificado de empadronamiento actual. | Adjektive / A2–B110 |
| allgemein | ál-gue-main | general / común | Adjetivo | im Allgemeinen | Das ist ein allgemeines Problem. | Ese es un problema general. | Adjektive / B110 |
| angenehm | án-gue-nem | agradable | Adjetivo | Comp: angenehmer | Die Temperatur im Büro ist heute sehr angenehm. | La temperatura en la oficina es hoy muy agradable. | Adjektive / A2–B110 |
| ängstlich | énkst-lij | miedoso / temeroso | Adjetivo | Comp: ängstlicher | Unser kleiner Hund ist manchmal sehr ängstlich. | Nuestro perro pequeño a veces es muy miedoso. | Adjektive / B110 |
| anstrengend | án-shtren-guent | agotador / fatigoso | Adjetivo | Comp: anstrengender | Die Arbeit auf der Baustelle war heute anstrengend. | El trabajo en la obra fue hoy agotador. | Adjektive / A2–B110 |
| anwesend | án-ve-zent | presente / asistente | Adjetivo | Antónimo: abwesend | Sind heute alle Kursteilnehmer anwesend? | ¿Están hoy presentes todos los alumnos del curso? | Adjektive / B110 |
| ärgerlich | ér-gua-lij | molesto / fastidioso | Adjetivo | über \+ Akk | Dieser Fehler ist wirklich sehr ärgerlich. | Este error es realmente muy molesto. | Adjektive / B110 |
| arm | arm | pobre | Adjetivo | Comp: ärmer, am ärmsten | In vielen Regionen sind die Menschen leider arm. | En muchas regiones la gente es lamentablemente pobre. | Adjektive / A2–B110 |
| besser | bé-sa | mejor | Adjetivo (Comp. de gut) | Sup: am besten | Hoffentlich geht es dir bald besser. | Espero que pronto te encuentres mejor. | Adjektive / A16 |
| beste | bés-te | el mejor / la mejor | Adjetivo (Sup. de gut) | der/die/das beste | Das ist das beste Buch in diesem Kurs. | Este es el mejor libro de este curso. | Adjektive / A16 |
| cool | kul | genial / guay | Adjetivo | Uso coloquial | Deine neue Jacke sieht echt cool aus\! | ¡Tu nueva chaqueta se ve muy genial\! | Adjektive / B17 |
| echt | ejt | auténtico / verdadero | Adjetivo / Adverbio | Uso también coloquial | Das ist echtes Leder und kein Plastik. | Esto es cuero auténtico y no plástico. | Adjektive / A2–B110 |
| egal | e-gál | igual / indiferente | Adjetivo | mir ist das egal (+ Dat) | Es ist mir egal, ob wir heute oder morgen fahren. | Me da igual si viajamos hoy o mañana. | Adjektive / A2–B110 |
| eilig | ái-lij | urgente / apresurado | Adjetivo / Adverbio | es eilig haben | Ich kann nicht bleiben, ich habe es sehr eilig. | No me puedo quedar, tengo mucha prisa. | Adjektive / B110 |
| eindeutig | áin-doi-tij | inequívoco / claro | Adjetivo | Comp: eindeutiger | Das Ergebnis der Prüfung ist eindeutig. | El resultado del examen es inequívoco. | Adjektive / B110 |
| fit | fit | en forma / sano | Adjetivo | sich fit halten | Durch regelmäßigen Sport bleibe ich fit. | Haciendo deporte con regularidad me mantengo en forma. | Adjektive / B17 |
| global | glo-bál | global | Adjetivo | Comp: globaler | Der Klimawandel ist ein globales Problem. | El cambio climático es un problema global. | Adjektive / B17 |
| hart | jart | duro | Adjetivo | Comp: härter, am härtesten | Nach zwei Tagen wird das Brot leider hart. | Después de dos días el pan lamentablemente se pone duro. | Adjektive / A2–B17 |
| lang | lang | largo | Adjetivo | Comp: länger, am längsten | Der Weg zur Arbeit ist sehr lang. | El camino al trabajo es muy largo. | Adjektive / A1–B110 |
| langweilig | láng-vai-lij | aburrido | Adjetivo | Comp: langweiliger | Am Anfang ist das Buch ein bisschen langweilig. | Al principio el libro es un poco aburrido. | Adjektive / A2–B110 |
| lieb | lip | querido / amable | Adjetivo | Comp: lieber | Mein Hund ist sehr lieb und ruhig. | Mi perro es muy cariñoso y tranquilo. | Adjektive / A1–B17 |
| lustig | lús-tij | gracioso / divertido | Adjetivo | Comp: lustiger | Der Film gestern Abend war richtig lustig. | La película de anoche estuvo muy divertida. | Adjektive / A2–B110 |
| o.k. / okay | o-kéi | bien / de acuerdo | Adjetivo / Partícula | Predicativo / Invariable | Wir sagen alle Du, ist das okay für dich? | Todos nos tuteamos, ¿te parece bien? | Adjektive / A1–B17 |
| stolz | shtolts | orgulloso | Adjetivo | auf \+ Akkusativ | Wir sind sehr stolz auf unsere Tochter. | Estamos muy orgullosos de nuestra hija. | Adjektive / B17 |
| stumm | shtum | mudo / en silencio | Adjetivo | stumm schalten (silenciar) | Bitte schalten Sie Ihr Handy im Unterricht stumm. | Por favor, ponga su móvil en silencio en clase. | Adjektive / B17 |
| super | zú-pa | súper / estupendo | Adjetivo / Adverbio | Invariable en uso coloquial | Das ist eine super Idee\! | ¡Esa es una idea estupenda\! | Adjektive / A1–B17 |
| sympathisch | züm-pá-tish | simpático / agradable | Adjetivo | Comp: sympathischer | Unsere neue Chefin ist sehr sympathisch. | Nuestra nueva jefa es muy simpática. | Adjektive / A2–B17 |

### **Kapitel 5: Adverbien & Fragewörter (ID interno 15\)**

Aporta 20 adverbios de transición, conectores adverbiales de posición 1, partículas modales y determinantes indefinidos esenciales para estructurar argumentos de nivel A2–B16.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ach | aj | ah / ay | Interjección / Partícula | Invariable | Ach, das habe ich ganz vergessen\! | ¡Ah, eso se me olvidó por completo\! | Partikeln / A2–B110 |
| aha | a-já | ajá / ya entiendo | Interjección | Invariable | Aha, wohnt Sabrina auch in Bern? | Ajá, ¿Sabrina también vive en Berna? | Partikeln / A2–B110 |
| all- | al- | todo / todos | Determinante / Pronombre | alles, alle, aller... | Alle Schüler mögen ihre Lehrerin sehr. | A todos los alumnos les agrada mucho su profesora. | Adverbien / A1–B110 |
| allein | a-láin | solo / únicamente | Adverbio | Sin flexión | Ich wohne allein in einer kleinen Wohnung. | Vivo solo en un apartamento pequeño. | Adverbien / A2–B110 |
| allerdings | á-la-dings | sin embargo / por cierto | Adverbio / Conector | Posición 1 o campo medio | Der Job ist gut, allerdings ist die Arbeit schwer. | El empleo es bueno, sin embargo el trabajo es duro. | Adverbien / B110 |
| aller- | á-la- | del todo / el más (superlativo) | Prefijo / Determinante | zu allererst, allerbeste | Das ist mein allerbester Freund. | Ese es mi mejor amigo de todos. | Adverbien / B110 |
| also | ál-zo | así que / pues / por lo tanto | Adverbio / Conector | Posición 0 o 1 | Es regnet stark, also bleiben wir zu Hause. | Llueve fuerte, así que nos quedamos en casa. | Adverbien / A2–B110 |
| ander- | án-da- | otro / diferente | Determinante / Pronombre | der/die/das andere | Gefällt dir die Jacke? Nein, die andere ist schöner. | ¿Te gusta la chaqueta? No, la otra es más bonita. | Adverbien / A1–B110 |
| andererseits | án-de-ra-zaits | por otro lado / por otra parte | Adverbio / Conector | Posición 1 (+ Inversión V2) | Einerseits will ich fahren, andererseits bin ich müde. | Por un lado quiero ir, por otro lado estoy cansado. | Adverbien / B110 |
| anders | án-das | diferente / de otro modo | Adverbio | als | In Deutschland feiert man Weihnachten etwas anders. | En Alemania se celebra la Navidad algo diferente. | Adverbien / A2–B110 |
| beide | bái-de | ambos / los dos | Pronombre / Determinante | Plural siempre | Meine Schwester und ich, wir beide arbeiten hier. | Mi hermana y yo, ambas trabajamos aquí. | Adverbien / A16 |
| dorthin | dórt-jin | hacia allá / allí | Adverbio de dirección | Responde a Wohin? | Der Zug fährt nach Hamburg, ich muss auch dorthin. | El tren va a Hamburgo, yo también tengo que ir allá. | Adverbien / A2–B110 |
| drüben | drǘ-ben | allá enfrente / al otro lado | Adverbio de lugar | Responde a Wo? | Die Post ist gleich da drüben auf der anderen Seite. | El correo está ahí enfrente, al otro lado. | Adverbien / B110 |
| eben | é-ben | precisamente / hace un momento / pues | Adverbio / Partícula | Temporal / Modal | Er hat mich eben erst angerufen. | Él me acaba de llamar hace un momento. | Partikeln / A2–B110 |
| ebenfalls | é-ben-fals | igualmente / asimismo | Adverbio | Posición 1 o campo medio | Schönes Wochenende\! — Danke, ebenfalls\! | ¡Buen fin de semana\! — ¡Gracias, igualmente\! | Adverbien / A2–B110 |
| ebenso | é-ben-zo | igualmente / del mismo modo | Adverbio | ebenso ... wie | Dieses Projekt ist ebenso wichtig wie das erste. | Este proyecto es tan importante como el primero. | Adverbien / B110 |
| einerseits | ái-ne-ra-zaits | por un lado | Adverbio / Conector | Posición 1 (+ Inversión V2) | Einerseits ist die Miete hoch, aber die Lage ist super. | Por un lado el alquiler es alto, pero la ubicación es genial. | Adverbien / B110 |
| halt | jalt | pues / simplemente | Partícula modal | Uso coloquial | Das ist halt in Deutschland so geregelt. | Simplemente está regulado así en Alemania. | Partikeln / B17 |
| leider | lái-da | lamentablemente / por desgracia | Adverbio | Posición 1 o campo medio | Leider habe ich am Montag keine Zeit. | Lamentablemente no tengo tiempo el lunes. | Adverbien / A1–B17 |
| manch- | manj- | alguno / algunos | Determinante indefinido | manche, manchmal | Manche Wörter sind am Anfang schwer auszusprechen. | Algunas palabras son difíciles de pronunciar al inicio. | Adverbien / A1–B110 |

### **Kapitel 6: Grammatik: Konnektoren (ID interno 13\)**

Con las conjunciones subordinantes principales ya inyectadas en la app (weil, dass, um...zu, trotz, wegen, außer, gegenüber, dentro de un lote de 14 elementos parcialmente nombrados)2, el fragmento DTZ aporta 3 piezas gramaticales faltantes en este módulo10.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ab | ap | a partir de / desde | Preposición | \+ Dativo (en Kap. 2 aparece solo como ab 3 Uhr) | Ab nächster Woche arbeite ich in einer neuen Firma. | A partir de la próxima semana trabajo en una nueva empresa. | Präpositionen / A1–B110 |
| als ob | als op | como si (hipotético) | Conector Subordinante | Verbo al final (+ Konjunktiv II) | Er tut so, als ob er alles verstehen würde. | Él actúa como si entendiera todo. | Nebensätze / B110 |
| der Artikel | dea ar-tí-kel | el artículo (gramatical o comercial) | Sustantivo (Masc) | Pl: die Artikel | Lernen Sie jedes Nomen immer mit dem Artikel\! | ¡Aprenda cada sustantivo siempre con el artículo\! | Grammatik / A1–B110 |

### **Kapitel 7: Wohnen (ID interno 3\)**

Suma 22 vocablos sobre equipamiento doméstico, limpieza, pisos compartidos y estructura de edificios procedentes de las listas Goethe A1/B1, DTZ y A2\_Modellsatz6. Debido a que los lotes V1 y V2 añadieron palabras no detalladas a id: 3 (Wohnen) —entre ellas la oración de ejemplo "Die Milch ist im Kühlschrank." citada en walkthrough.md—13, valida por ID local si der Kühlschrank ya figura en tu archivo src/data/chapters.jsx.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| der Abfall | dea áp-fal | la basura / residuo | Sustantivo (Masc) | Pl: die Abfälle | Bitte bringen Sie den Abfall nach unten in die Tonne. | Por favor, baje la basura al contenedor de abajo. | Haushalt / A2–B110 |
| ab\|waschen | áp-va-shen | fregar / lavar (platos) | Verbo separable | \+ Akk / wäscht ab, wusch ab, hat abgewaschen | Nach dem Abendessen müssen wir die Teller abwaschen. | Después de cenar tenemos que fregar los platos. | Haushalt / A2–B110 |
| das Apartment | das a-párt-ment | el apartamento / estudio | Sustantivo (Neutro) | Pl: die Apartments | Für drei Monate miete ich ein kleines Apartment. | Durante tres meses alquilo un apartamento pequeño. | Wohnen / A2–B110 |
| auf sein | auf zain | estar abierto / levantado | Frase verbal | Separable irregular | Das Fenster im Schlafzimmer ist noch auf. | La ventana del dormitorio sigue abierta. | Haushalt / A16 |
| auf\|räumen | áuf-roi-men | ordenar / recoger | Verbo separable | \+ Akk / räumt auf, räumte auf, hat aufgeräumt | Am Samstag räume ich zuerst mein Zimmer auf. | El sábado ordeno primero mi habitación. | Haushalt / A16 |
| die Decke | di dé-ke | el techo (interior) / manta | Sustantivo (Fem) | Pl: die Decken | Im Winter brauche ich abends eine warme Decke. | En invierno necesito por las noches una manta abrigada. | Möbel / A2–B110 |
| die Ecke | di é-ke | la esquina / el rincón | Sustantivo (Fem) | Pl: die Ecken | Der Schrank steht dort in der Ecke. | El armario está allí en la esquina. | Wohnung / A2–B110 |
| der Eingang | dea áin-gang | la entrada (puerta/acceso) | Sustantivo (Masc) | Pl: die Eingänge | Der Eingang zum Haus befindet sich links. | La entrada a la casa se encuentra a la izquierda. | Gebäude / A2–B110 |
| die Gardine | di gar-dí-ne | la cortina | Sustantivo (Fem) | Pl: die Gardinen | Wir hängen heute neue weiße Gardinen auf. | Hoy colgamos cortinas blancas nuevas. | Möbel / A2–B135 |
| der Kühlschrank | dea kǘl-shrank | el refrigerador / nevera | Sustantivo (Masc) | Pl: die Kühlschränke (verificar cruce V2) | Die Milch und der Käse sind im Kühlschrank. | La leche y el queso están en el refrigerador. | Haushalt / A113 |
| die Lampe | di lám-pe | la lámpara | Sustantivo (Fem) | Pl: die Lampen | Über dem Esstisch hängt eine helle Lampe. | Encima de la mesa del comedor cuelga una lámpara luminosa. | Möbel / A1–B110 |
| der Makler | dea mák-la | el agente inmobiliario | Sustantivo (Masc) | Pl: die Makler (Fem: die Maklerin) | Der Makler zeigt uns morgen eine Wohnung. | El agente inmobiliario nos muestra mañana un piso. | Mieten / B110 |
| das OG (Obergeschoss) | das o-gué | la planta superior / piso alto | Sustantivo (Neutro) | Pl: die Obergeschosse | Unsere Wohnung liegt im zweiten OG. | Nuestro piso está en la segunda planta superior. | Gebäude / B17 |
| das Putzmittel | das púts-mi-tel | el producto de limpieza | Sustantivo (Neutro) | Pl: die Putzmittel | Im Supermarkt kaufe ich heute neues Putzmittel. | Hoy compro en el supermercado producto de limpieza nuevo. | Haushalt / A218 |
| die Stiege (A) | di shtí-gue | la escalera (variante austriaca) | Sustantivo (Fem) | Pl: die Stiegen (D: die Treppe) | Nehmen Sie die Stiege in den ersten Stock. | Tome la escalera hasta el primer piso. | Gebäude / B17 |
| das Stockwerk | das shtók-verk | el piso / planta (del edificio) | Sustantivo (Neutro) | Pl: die Stockwerke | Das Büro befindet sich im dritten Stockwerk. | La oficina se encuentra en la tercera planta. | Gebäude / B17 |
| das UG (Untergeschoss) | das u-gué | el sótano / planta baja inferior | Sustantivo (Neutro) | Pl: die Untergeschosse | Die Waschküche ist unten im UG. | El cuarto de lavadoras está abajo en el subsuelo. | Gebäude / B17 |
| die Waschmaschine | di vásh-ma-shi-ne | la lavadora | Sustantivo (Fem) | Pl: die Waschmaschinen | Meine alte Waschmaschine funktioniert nicht mehr. | Mi vieja lavadora ya no funciona. | Haushalt / A127 |
| das Waschmittel | das vásh-mi-tel | el detergente (para ropa) | Sustantivo (Neutro) | Pl: die Waschmittel | Wir haben kein Waschmittel mehr für die Wäsche. | Ya no tenemos detergente para la colada. | Haushalt / A218 |
| das WC | das ve-tsé | el servicio / baño (WC) | Sustantivo (Neutro) | Pl: die WCs | Entschuldigung, wo ist hier bitte das WC? | Disculpe, ¿dónde está aquí el baño, por favor? | Gebäude / A1–B17 |
| der Wecker | dea vé-ka | el despertador | Sustantivo (Masc) | Pl: die Wecker | Für die Reise brauche ich meinen kleinen Wecker. | Para el viaje necesito mi despertador pequeño. | Haushalt / A127 |
| die WG (Wohngemeinschaft) | di ve-gué | el piso compartido | Sustantivo (Fem) | Pl: die WGs | Viele Studenten wohnen gern in einer WG. | Muchos estudiantes viven con gusto en un piso compartido. | Mieten / B17 |

### **Kapitel 8: Essen & Trinken (ID interno 5\)**

Incluye 26 vocablos gastronómicos y de alimentación ausentes de los 56 términos visibles en vocabulario\_completo.json.txt y additions\_only.txt3. Dado que el inventario completo reporta 86 términos para este capítulo tras la carga de V1 (\~30 palabras no desglosadas en las fuentes disponibles)2, pasa este listado por el filtro getSafeId antes de inyectar.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| der Alkohol | dea ál-ko-jol | el alcohol | Sustantivo (Masc) | Singular (Generalmente sin Pl) | Wenn man Auto fährt, darf man keinen Alkohol trinken. | Cuando se conduce no está permitido beber alcohol. | Getränke / B110 |
| der Apfelsaft | dea áp-fel-zaft | el zumo de manzana | Sustantivo (Masc) | Pl: die Apfelsäfte | Was trinken Sie? Ich trinke einen Apfelsaft. | ¿Qué bebe usted? Bebo un zumo de manzana. | Getränke / A120 |
| die Aprikose | di a-pri-kó-ze | el albaricoque | Sustantivo (Fem) | Pl: die Aprikosen | Im Sommer schmecken frische Aprikosen sehr süß. | En verano los albaricoques frescos saben muy dulces. | Lebensmittel / A2–B110 |
| die/das Cola | di/das kó-la | la cola (refresco) | Sustantivo (Fem/Neutro) | Pl: die Colas | Was nehmen Sie? Ich nehme eine Cola. | ¿Qué toma usted? Tomo una cola. | Getränke / A1–B17 |
| die Dose | di dó-ze | la lata / bote | Sustantivo (Fem) | Pl: die Dosen | Auf dem Tisch steht eine Dose Tomaten. | En la mesa hay una lata de tomates. | Lebensmittel / B110 |
| das Ei | das ai | el huevo | Sustantivo (Neutro) | Pl: die Eier | Zum Frühstück koche ich zwei Eier. | Para el desayuno cuezo dos huevos. | Lebensmittel / A120 |
| das Glas | das glas | el vaso / tarro de cristal | Sustantivo (Neutro) | Pl: die Gläser | Walter kauft ein Glas Marmelade. | Walter compra un tarro de mermelada. | Geschirr / A127 |
| das Hackfleisch | das ják-flaish | la carne picada | Sustantivo (Neutro) | Singular (A: Faschierte) | Für die Soße brauche ich 500 Gramm Hackfleisch. | Para la salsa necesito 500 gramos de carne picada. | Lebensmittel / B17 |
| das Hähnchen / Hühnchen | das jén-jen / jǘn-jen | el pollo (carne/asado) | Sustantivo (Neutro) | Pl: die Hähnchen | Ich bestelle ein halbes Hähnchen mit Salat. | Pido medio pollo con ensalada. | Lebensmittel / B17 |
| die Halbpension | di jálp-pen-zión | la media pensión | Sustantivo (Fem) | Singular | Wir buchen das Hotel mit Halbpension. | Reservamos el hotel con media pensión. | Gastronomie / B17 |
| haltbar | jált-bar | duradero / no perecedero | Adjetivo | Predicativo/Atributivo | Wie lange ist diese Milch haltbar? | ¿Hasta cuándo se conserva esta leche? | Lebensmittel / B17 |
| der Hamburger | dea jám-bur-ga | la hamburguesa | Sustantivo (Masc) | Pl: die Hamburger | Die Person isst einen Hamburger. | La persona come una hamburguesa. | Lebensmittel / A1–B17 |
| der Joghurt | dea yó-gurt | el yogur | Sustantivo (Masc) | Pl: die Joghurts | Zum Frühstück esse ich gern Joghurt mit Obst. | Para desayunar como con gusto yogur con fruta. | Lebensmittel / A127 |
| der Kellner / die Kellnerin | dea kél-na / di kél-ne-rin | el camarero / la camarera | Sustantivo (Masc/Fem) | Pl: die Kellner / \-innen | Der Kellner bringt sofort die Speisekarte. | El camarero trae enseguida la carta. | Restaurant / A29 |
| der/das Ketchup | dea/das ké-chup | el kétchup | Sustantivo (Masc/Neutro) | Pl: die Ketchups | Möchtest du Pommes mit Ketchup essen? | ¿Quieres comer patatas fritas con kétchup? | Lebensmittel / B17 |
| der Koch / die Köchin | dea koj / di kö́-jin | el cocinero / la cocinera | Sustantivo (Masc/Fem) | Pl: die Köche / die Köchinnen | Unser Koch arbeitet sehr schnell und sauber. | Nuestro cocinero trabaja muy rápido y limpio. | Restaurant / A29 |
| mager | má-gua | magro / bajo en grasa | Adjetivo | Comp: magerer | Ich kaufe heute mageres Fleisch zum Kochen. | Hoy compro carne magra para cocinar. | Lebensmittel / B110 |
| die Mahlzeit | di mál-tsait | la comida (ingesta del día) | Sustantivo (Fem) | Pl: die Mahlzeiten | Das Mittagessen ist für mich die wichtigste Mahlzeit. | El almuerzo es para mí la comida más importante. | Essen / B110 |
| die Packung | di pá-kung | el paquete / envase | Sustantivo (Fem) | Pl: die Packungen | Ich brauche noch eine Packung Milch. | Todavía necesito un cartón de leche. | Lebensmittel / A127 |
| das/der Sandwich | das/dea sénd-vich | el sándwich | Sustantivo (Neutro/Masc) | Gen: \-(e)s; Pl: die Sandwiche / Sandwiches | In der Mittagspause esse ich ein Sandwich. | En la pausa del mediodía como un sándwich. | Lebensmittel / B17 |
| die Schokolade | di sho-ko-lá-de | el chocolate | Sustantivo (Fem) | Pl: die Schokoladen | Kinder essen fast immer gern Schokolade. | Los niños casi siempre comen chocolate con gusto. | Lebensmittel / A125 |
| der Schokoladenkuchen | dea sho-ko-lá-den-ku-jen | el pastel de chocolate | Sustantivo (Masc) | Pl: die Schokoladenkuchen | Am Sonntag backe ich einen Schokoladenkuchen. | El domingo horneo un pastel de chocolate. | Lebensmittel / A127 |
| das Schwarzbrot | das shvárts-brot | el pan negro / integral | Sustantivo (Neutro) | Pl: die Schwarzbrote | Zum Käse schmeckt deutsches Schwarzbrot sehr gut. | Con el queso el pan negro alemán sabe muy bien. | Lebensmittel / A127 |
| der Snack | dea snek | el tentempié / bocadillo rápido | Sustantivo (Masc) | Pl: die Snacks | Im Zug gibt es leider nur kleine Snacks. | En el tren lamentablemente solo hay pequeños tentempiés. | Gastronomie / B17 |
| das Steak | das shteik | el filete (de carne) | Sustantivo (Neutro) | Pl: die Steaks | Möchten Sie Ihr Steak gut durchgebraten? | ¿Quiere su filete bien hecho? | Lebensmittel / B17 |
| stinken | shtín-ken | oler mal / apestar | Verbo irregular | nach \+ Dat / stinkt, stank, hat gestunken | Der alte Käse im Kühlschrank stinkt furchtbar. | El queso viejo en el frigorífico huele fatal. | Lebensmittel / B17 |

### **Kapitel 9: Kleidung (ID interno 10\)**

Suma 8 entradas de vestuario y accesorios cotidianos (der Anzug y das Kleid figuraban solo dentro de diálogos largos en Kapitel 22, pero carecían de tarjeta individual en este capítulo)2.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| der Anzug | dea án-tsuk | el traje (chaqueta y pantalón) | Sustantivo (Masc) | Pl: die Anzüge (también en K22) | Für das Vorstellungsgespräch trage ich einen Anzug. | Para la entrevista de trabajo llevo un traje. | Kleidung / A2–B110 |
| der Bikini | dea bi-kí-ni | el bikini | Sustantivo (Masc) | Pl: die Bikinis | Im Urlaub packe ich meinen Bikini ein. | En vacaciones guardo mi bikini en la maleta. | Kleidung / B17 |
| das Kleid | das klait | el vestido | Sustantivo (Neutro) | Pl: die Kleider (también en K22) | Das blaue Kleid steht ihr ausgezeichnet. | El vestido azul le sienta de maravilla. | Kleidung / A1–A224 |
| der Pyjama | dea pü-yá-ma | el pijama | Sustantivo (Masc) | Pl: die Pyjamas | Für meine Reise brauche ich noch einen Pyjama. | Para mi viaje necesito además un pijama. | Kleidung / A127 |
| der Schirm | dea shirm | el paraguas | Sustantivo (Masc) | Pl: die Schirme | Es regnet heute, nimm bitte einen Schirm mit\! | Hoy llueve, ¡llévate un paraguas por favor\! | Accessoires / A127 |
| die Socken | di zó-ken | los calcetines | Sustantivo (Plural) | Sg: die Socke | Ich packe fünf Paar Socken in die Tasche. | Meto cinco pares de calcetines en el bolso. | Kleidung / A127 |
| die Tasche | di tá-she | el bolso / bolsillo | Sustantivo (Fem) | Pl: die Taschen | Der Schlüssel ist sicher in meiner Tasche. | La llave está guardada en mi bolso. | Accessoires / A1–B17 |
| das T-Shirt | das tí-shört | la camiseta | Sustantivo (Neutro) | Pl: die T-Shirts | Im Sommer trage ich am liebsten ein T-Shirt. | En verano llevo preferiblemente una camiseta. | Kleidung / B17 |

### **Kapitel 10: Einkaufen (ID interno 6\)**

Reúne 17 vocablos sobre comercios locales, servicios comerciales, efectivo, entregas a domicilio y suscripciones7.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| das Abo / Abonnement | das á-bo / a-bo-ne-mó | la suscripción / abono | Sustantivo (Neutro) | Pl: die Abos / Abonnements | Ich habe ein monatliches Abo für die Bahn. | Tengo un abono mensual para el tren. | Konsum / B17 |
| abonnieren | a-bo-ní-ren | suscribirse | Verbo (-ieren) | \+ Akkusativ / abonniert, hat abonniert | Möchten Sie unseren Newsletter abonnieren? | ¿Desea suscribirse a nuestro boletín? | Konsum / B110 |
| an\|schaffen | án-sha-fen | adquirir / comprar | Verbo separable | \+ Akk / schafft an, hat angeschafft | Wir müssen eine neue Waschmaschine anschaffen. | Tenemos que adquirir una lavadora nueva. | Konsum / B110 |
| der Blumenladen | dea blú-men-la-den | la floristería | Sustantivo (Masc) | Pl: die Blumenläden | Im Erdgeschoss gibt es einen schönen Blumenladen. | En la planta baja hay una bonita floristería. | Geschäfte / A218 |
| die Drogerie | di dro-gue-rí | la droguería / perfumería | Sustantivo (Fem) | Pl: die Drogerien | Zahnpasta und Seife kaufe ich in der Drogerie. | Compro pasta de dientes y jabón en la droguería. | Geschäfte / B110 |
| der Fotoservice | dea fó-to-sör-vis | el servicio de fotografía | Sustantivo (Masc) | Pl: die Fotoservices | Beim Fotoservice kann ich Passbilder machen lassen. | En el servicio de fotos puedo hacerme fotos de pasaporte. | Geschäfte / A218 |
| der Geldschein | dea guélt-shain | el billete (dinero) | Sustantivo (Masc) | Pl: die Geldscheine | An diesem Automaten kann man mit Geldscheinen zahlen. | En esta máquina se puede pagar con billetes. | Geld / A127 |
| die Glückwunschkarte | di glǘk-vunsh-kar-te | la tarjeta de felicitación | Sustantivo (Fem) | Pl: die Glückwunschkarten | Ich kaufe eine Glückwunschkarte zur Hochzeit. | Compro una tarjeta de felicitación para la boda. | Geschäfte / A218 |
| der Handel | dea ján-del | el comercio | Sustantivo (Masc) | Singular | Der Online-Handel wächst jedes Jahr stark. | El comercio en línea crece con fuerza cada año. | Konsum / B17 |
| der Händler / die Händlerin | dea jénd-la / di jénd-le-rin | el comerciante / vendedor | Sustantivo (Masc/Fem) | Pl: die Händler / \-innen | Auf dem Markt kaufe ich Gemüse beim Händler. | En el mercado compro verdura al comerciante. | Geschäfte / B17 |
| liefern | lí-fern | entregar / repartir | Verbo regular | \+ Akkusativ / liefert, lieferte, hat geliefert | Die Firma liefert die Möbel nächste Woche. | La empresa entrega los muebles la próxima semana. | Konsum / B17 |
| die Lieferung | di lí-fe-rung | la entrega / envío | Sustantivo (Fem) | Pl: die Lieferungen | Die Lieferung kommt heute zwischen zehn und zwölf Uhr. | El envío llega hoy entre las diez y las doce. | Konsum / B17 |
| die Münze | di mǘn-tse | la moneda | Sustantivo (Fem) | Pl: die Münzen | Haben Sie eine Zwei-Euro-Münze für den Wagen? | ¿Tiene una moneda de dos euros para el carro? | Geld / A127 |
| der Schlüsseldienst | dea shlǘ-sel-dinst | el servicio de cerrajería | Sustantivo (Masc) | Pl: die Schlüsseldienste | Der Schlüsseldienst öffnet die Tür schnell. | El cerrajero abre la puerta rápido. | Geschäfte / A218 |
| die Schuhwerkstatt | di shú-verk-shtat | el zapatero (reparación) | Sustantivo (Fem) | Pl: die Schuhwerkstätten | Ich bringe meine alten Schuhe zur Schuhwerkstatt. | Llevo mis zapatos viejos al taller de reparación. | Geschäfte / A218 |
| der Tabak | dea tá-bak | el tabaco / estanco | Sustantivo (Masc) | Singular | Zeitungen und Tabak verkauft man am Kiosk. | Los periódicos y el tabaco se venden en el quiosco. | Geschäfte / A218 |
| der Trend | dea trent | la tendencia / moda | Sustantivo (Masc) | Pl: die Trends | Nachhaltige Mode ist heute ein großer Trend. | La moda sostenible es hoy una gran tendencia. | Konsum / B17 |

### **Kapitel 11: Freizeit (ID interno 4\)**

Aporta 48 términos de deportes, música, animales domésticos y cultura extraídos de las listas oficiales A1/B1 y de KB\_ocr.pdf6. Dado que la expansión V2 incorporó \~28 palabras no detalladas a este capítulo (id: 4), incluyendo vocabulario sobre animales (Tiere)2, cruza por getSafeId especialmente las entradas der Hund, die Katze, das Haustier y das Tier antes de fusionar.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| die Band | di bent | la banda de música | Sustantivo (Fem) | Pl: die Bands | Die Schülerband spielt heute Abend um neun Uhr. | La banda escolar toca esta noche a las nueve. | Kultur / A1–B16 |
| die Bar | di bar | el bar | Sustantivo (Fem) | Pl: die Bars | Nach der Arbeit gehen wir oft in eine Bar. | Después del trabajo vamos a menudo a un bar. | Freizeit / B17 |
| der Basketball | dea bás-ket-bal | el baloncesto | Sustantivo (Masc) | Pl: die Basketbälle | Meine Hobbys sind Basketball und Musik. | Mis aficiones son el baloncesto y la música. | Sport / A16 |
| basteln | bás-teln | hacer manualidades | Verbo regular | bastelt, bastelte, hat gebastelt | Basteln ist mein liebstes Hobby am Wochenende. | Hacer manualidades es mi pasatiempo favorito el fin de semana. | Hobbys / A16 |
| das Camp | das kemp | el campamento | Sustantivo (Neutro) | Pl: die Camps | Im Sommer fahren die Kinder in ein Sportcamp. | En verano los niños van a un campamento deportivo. | Freizeit / B17 |
| campen | kém-pen | acampar | Verbo regular | campt, campte, hat gecampt | Wir campen lieber in den Bergen als am Meer. | Preferimos acampar en las montañas que en el mar. | Freizeit / B17 |
| die Castingshow | di kás-ting-shou | el concurso de talentos (TV) | Sustantivo (Fem) | Pl: die Castingshows | Viele junge Leute sehen am Abend Castingshows. | Muchos jóvenes ven programas de talentos por la noche. | Medien / B17 |
| der Club | dea klup | el club / discoteca | Sustantivo (Masc) | Pl: die Clubs | Am Samstag treffen wir uns im neuen Club. | El sábado nos encontramos en el club nuevo. | Freizeit / B17 |
| der/das Comic | dea/das kó-mik | el cómic / historieta | Sustantivo (Masc/Neutro) | Pl: die Comics | Mein Sohn liest vor dem Schlafen immer Comics. | Mi hijo siempre lee cómics antes de dormir. | Medien / B17 |
| der Fan | dea fen | el fan / seguidor | Sustantivo (Masc) | Pl: die Fans | Ich bin ein großer Fan von dieser Mannschaft. | Soy un gran seguidor de este equipo. | Freizeit / B17 |
| das Festival | das fés-ti-val | el festival | Sustantivo (Neutro) | Pl: die Festivals | Im Juli besuchen wir ein großes Musikfestival. | En julio visitamos un gran festival de música. | Kultur / B17 |
| filmen | fíl-men | filmar / grabar en vídeo | Verbo regular | \+ Akkusativ / filmt, filmte, hat gefilmt | Eva kann auf der Party super filmen. | Eva sabe grabar estupendamente en la fiesta. | Medien / A121 |
| die Fitness | di fít-nes | la forma física / fitness | Sustantivo (Fem) | Singular | Für meine Fitness gehe ich zweimal pro Woche joggen. | Para mi forma física salgo a correr dos veces por semana. | Sport / B17 |
| das Foto | das fó-to | la fotografía / foto | Sustantivo (Neutro) | Pl: die Fotos | Auf dem Foto bin ich mit meiner Schwester. | En la foto estoy con mi hermana. | Medien / A16 |
| fotografieren | fo-to-gra-fí-ren | fotografiar / hacer fotos | Verbo (-ieren) | fotografiert, hat fotografiert | Charlotte fotografiert gern in der Natur. | A Charlotte le gusta fotografiar en la naturaleza. | Hobbys / A121 |
| das Fußballspiel | das fús-bal-shpil | el partido de fútbol | Sustantivo (Neutro) | Pl: die Fußballspiele | Am Samstag schauen wir das Fußballspiel im Stadion. | El sábado vemos el partido de fútbol en el estadio. | Sport / A121 |
| die Gitarre | di gui-tá-re | la guitarra | Sustantivo (Fem) | Pl: die Gitarren | Ich spiele Gitarre und ein bisschen Klavier. | Toco la guitarra y un poco el piano. | Kultur / A121 |
| das Hallenbad | das já-len-bat | la piscina cubierta | Sustantivo (Neutro) | Pl: die Hallenbäder | Im Winter schwimmen wir oft im Hallenbad. | En invierno nadamos a menudo en la piscina cubierta. | Sport / B17 |
| das Haustier | das jáus-tir | la mascota | Sustantivo (Neutro) | Pl: die Haustiere | Haben Sie ein Haustier zu Hause? | ¿Tiene usted una mascota en casa? | Tiere / A121 |
| der Hit | dea jit | el éxito musical | Sustantivo (Masc) | Pl: die Hits | Im Radio läuft gerade ein bekannter Hit. | En la radio suena ahora un éxito conocido. | Kultur / B17 |
| der Hund | dea junt | el perro | Sustantivo (Masc) | Pl: die Hunde | Frau Kruse hat drei Hunde. | La Sra. Kruse tiene tres perros. | Tiere / A121 |
| der Jazz | dea yes | el jazz | Sustantivo (Masc) | Singular | Mein Vater hört abends sehr gern Jazz. | A mi padre le gusta mucho escuchar jazz por la noche. | Kultur / B17 |
| joggen | yó-guen | trotar / correr | Verbo regular | joggt, joggte, ist/hat gejoggt | Jeden Morgen jogge ich dreißig Minuten im Park. | Cada mañana salgo a trotar treinta minutos al parque. | Sport / B17 |
| die Katze | di ká-tse | el gato | Sustantivo (Fem) | Pl: die Katzen | Meine Katze schläft gern auf dem Sofa. | Mi gato duerme con gusto en el sofá. | Tiere / A121 |
| das Konzert | das kon-tsért | el concierto | Sustantivo (Neutro) | Pl: die Konzerte | Nächsten Freitag gehen wir auf ein Rockkonzert. | El próximo viernes vamos a un concierto de rock. | Kultur / A125 |
| der Krimi | dea krí-mi | la novela o película policiaca | Sustantivo (Masc) | Pl: die Krimis | Am Sonntagabend lese ich einen spannenden Krimi. | El domingo por la noche leo una novela policiaca emocionante. | Medien / A120 |
| das Lied | das lit | la canción | Sustantivo (Neutro) | Pl: die Lieder | Welches deutsche Lied kennst du schon? | ¿Qué canción alemana conoces ya? | Kultur / A2–B17 |
| malen | má-len | pintar | Verbo regular | \+ Akkusativ / malt, malte, hat gemalt | Mein Hobby ist es, Landschaften zu malen. | Mi pasatiempo es pintar paisajes. | Hobbys / A1–B110 |
| die Mannschaft | di mán-shaft | el equipo (deportivo) | Sustantivo (Fem) | Pl: die Mannschaften | Unsere Mannschaft hat heute 2:1 gewonnen. | Nuestro equipo ha ganado hoy 2 a 1\. | Sport / A1–A236 |
| das Mountainbike | das máun-ten-baik | la bicicleta de montaña | Sustantivo (Neutro) | Pl: die Mountainbikes | Am Wochenende fahre ich mit dem Mountainbike durch den Wald. | El fin de semana voy con la bici de montaña por el bosque. | Sport / B17 |
| die Oper | di ó-pa | la ópera | Sustantivo (Fem) | Pl: die Opern | In Wien gibt es eine sehr berühmte Oper. | En Viena hay una ópera muy famosa. | Kultur / A125 |
| der Park | dea park | el parque | Sustantivo (Masc) | Pl: die Parks (también en K22) | Gehen wir heute Nachmittag zusammen in den Park? | ¿Vamos juntos al parque esta tarde? | Freizeit / A120 |
| die Party | di pár-ti | la fiesta | Sustantivo (Fem) | Pl: die Partys | Vielen Dank für die Einladung zu deiner Party\! | ¡Muchas gracias por la invitación a tu fiesta\! | Freizeit / A121 |
| das Poster | das pós-ta | el póster / cartel | Sustantivo (Neutro) | Pl: die Poster | An der Wand hängt ein großes Poster von Berlin. | En la pared cuelga un gran póster de Berlín. | Freizeit / B17 |
| das Puzzle | das pú-tsel | el rompecabezas / puzle | Sustantivo (Neutro) | Pl: die Puzzles | Die Kinder machen zusammen ein großes Puzzle. | Los niños hacen juntos un puzle grande. | Freizeit / B17 |
| das Saxophon | das sak-zo-fón | el saxofón | Sustantivo (Neutro) | Pl: die Saxophone | Er lernt Saxophon in der Musikschule. | Él aprende saxofón en la escuela de música. | Kultur / A126 |
| die Show | di shou | el espectáculo / programa | Sustantivo (Fem) | Pl: die Shows | Die neue Show im Fernsehen beginnt um zwanzig Uhr. | El nuevo espectáculo en la tele empieza a las ocho. | Medien / B17 |
| Ski fahren | shi fá-ren | esquiar | Frase verbal | fährt Ski, fuhr Ski, ist Ski gefahren | Im Winter fahren wir gern in den Alpen Ski. | En invierno nos gusta esquiar en los Alpes. | Sport / A121 |
| der Song | dea song | la canción (moderna) | Sustantivo (Masc) | Pl: die Songs | Dieser Song ist in Deutschland sehr beliebt. | Esta canción es muy popular en Alemania. | Kultur / B17 |
| surfen | sö́r-fen | surfear / navegar (en internet) | Verbo regular | surft, surfte, ist/hat gesurft | Eva kann surfen und tauchen. | Eva sabe hacer surf y bucear. | Sport / A1–B17 |
| der Swimmingpool | dea sví-ming-pul | la piscina (privada/hotel) | Sustantivo (Masc) | Pl: die Swimmingpools | Das Hotel hat leider keinen Swimmingpool. | Lamentablemente el hotel no tiene piscina. | Freizeit / B17 |
| die Szene | di tsé-ne | la escena | Sustantivo (Fem) | Pl: die Szenen | Diese Szene im Film war wirklich spannend. | Esta escena en la película fue realmente emocionante. | Kultur / B17 |
| der Tanz | dea tants | el baile / danza | Sustantivo (Masc) | Pl: die Tänze | Dieser traditionelle Tanz gefällt mir gut. | Este baile tradicional me gusta mucho. | Kultur / B17 |
| tauchen | táu-jen | bucear | Verbo regular | taucht, tauchte, ist/hat getaucht | Im Urlaub möchte ich im Meer tauchen. | En vacaciones quiero bucear en el mar. | Sport / A121 |
| das Tier | das tir | el animal | Sustantivo (Neutro) | Pl: die Tiere | Welche Tiere leben hier im Wald? | ¿Qué animales viven aquí en el bosque? | Tiere / A121 |
| das Training | das tréi-ning | el entrenamiento | Sustantivo (Neutro) | Pl: die Trainings | Wann hat er Training? Am Mittwoch um sechzehn Uhr. | ¿Cuándo tiene entrenamiento? El miércoles a las cuatro. | Sport / A134 |
| das Video | das ví-deo | el vídeo | Sustantivo (Neutro) | Pl: die Videos | Ich bearbeite die Videos am Computer. | Edito los vídeos en el ordenador. | Medien / A121 |
| das Videospiel | das ví-deo-shpil | el videojuego | Sustantivo (Neutro) | Pl: die Videospiele | Viele Jugendliche spielen gern Videospiele. | A muchos jóvenes les gusta jugar videojuegos. | Medien / A125 |

### **Kapitel 12: Reisen & Verkehr (ID interno 7\)**

Reúne 34 vocablos de transporte ferroviario, aéreo y urbano, viajes, naturaleza y meteorología severa (ab\|fahren, an\|kommen y das Hotel solo existían dentro de frases largas de Kapitel 22\)2. Dado que este capítulo recibió \~26 palabras de la expansión V2 (incluyendo meteorología, Wetter) y 8 palabras no desglosadas del lote de \+152, valida por getSafeId términos climáticos como hageln, der Sturm o das Unwetter frente a tu archivo local.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ab\|fahren | áp-fa-ren | salir / partir (transporte) | Verbo separable irr. | fährt ab, fuhr ab, ist abgefahren (también en K22) | Entschuldigung, wann fährt die Linie 2 ab? | Disculpe, ¿cuándo sale la línea 2? | Verkehr / A1–B110 |
| die Abfahrtszeit | di áp-farts-tsait | la hora de salida | Sustantivo (Fem) | Pl: die Abfahrtszeiten | Die Abfahrtszeit steht oben auf dem Fahrplan. | La hora de salida figura arriba en el horario. | Verkehr / A134 |
| an\|kommen | án-ko-men | llegar | Verbo separable irr. | kommt an, kam an, ist angekommen (también en K22) | Wann kommt ihr endlich in Berlin an? | ¿Cuándo llegáis por fin a Berlín? | Reisen / A1–B16 |
| die Ankunft | di án-kunft | la llegada | Sustantivo (Fem) | Pl: die Ankünfte | Die Ankunft des Zuges ist um 14:20 Uhr. | La llegada del tren es a las 14:20 h. | Verkehr / A2–B110 |
| der Baum | dea baum | el árbol | Sustantivo (Masc) | Pl: die Bäume | Im Frühling sind die Bäume schon wieder grün. | En primavera los árboles ya están verdes de nuevo. | Natur / A16 |
| die City | di sí-ti | el centro urbano / centro | Sustantivo (Fem) | Pl: die Citys | Am Samstag gehen wir in der City einkaufen. | El sábado vamos de compras al centro. | Stadt / B17 |
| das E-Bike | das í-baik | la bicicleta eléctrica | Sustantivo (Neutro) | Pl: die E-Bikes | Immer mehr Pendler fahren mit dem E-Bike zur Arbeit. | Cada vez más trabajadores van en bici eléctrica al trabajo. | Verkehr / B17 |
| das Fahrrad | das fár-rat | la bicicleta | Sustantivo (Neutro) | Pl: die Fahrräder | Thomas hat ein Auto, aber er hat kein Fahrrad. | Thomas tiene un coche, pero no tiene bicicleta. | Verkehr / A127 |
| die Gegend | di gué-guent | la zona / región / alrededores | Sustantivo (Fem) | Pl: die Gegenden | Das ist eine sehr ruhige und grüne Gegend. | Esta es una zona muy tranquila y verde. | Reisen / A16 |
| der Hafen | dea já-fen | el puerto | Sustantivo (Masc) | Pl: die Häfen | Im Hamburger Hafen liegen viele große Schiffe. | En el puerto de Hamburgo hay muchos barcos grandes. | Reisen / B17 |
| hageln | já-gueln | granizar | Verbo impersonal | es hagelt, hagelte, hat gehagelt | Achtung, heute Nachmittag kann es stark hageln\! | ¡Atención, esta tarde puede granizar fuerte\! | Wetter / B17 |
| das Hotel | das jo-tél | el hotel | Sustantivo (Neutro) | Pl: die Hotels (también en K22) | Unser Hotel liegt fünf Minuten vom Bahnhof entfernt. | Nuestro hotel está a cinco minutos de la estación. | Reisen / A1–A224 |
| der ICE | dea i-tsé-e | el tren de alta velocidad ICE | Sustantivo (Masc) | InterCityExpress | Mit dem ICE fährt man schnell nach München. | Con el ICE se viaja rápido a Múnich. | Verkehr / B17 |
| die Insel | di ín-zel | la isla | Sustantivo (Fem) | Pl: die Inseln | Die Insel Rügen ist im Sommer sehr voll. | La isla de Rügen está muy llena en verano. | Natur / A121 |
| der Koffer | dea kó-fa | la maleta | Sustantivo (Masc) | Pl: die Koffer | Hast du deinen Koffer für den Flug schon gepackt? | ¿Ya has hecho tu maleta para el vuelo? | Reisen / A1–A224 |
| landen | lán-den | aterrizar | Verbo regular | landet, landete, ist gelandet | Das Flugzeug landet pünktlich um zehn Uhr. | El avión aterriza puntual a las diez. | Reisen / B110 |
| die Landkarte | di lánt-kar-te | el mapa / plano | Sustantivo (Fem) | Pl: die Landkarten | Auf dieser Landkarte sieht man alle großen Städte. | En este mapa se ven todas las ciudades grandes. | Orientierung / A121 |
| die Landung | di lán-dung | el aterrizaje | Sustantivo (Fem) | Pl: die Landungen | Nach der Landung holen wir unsere Koffer ab. | Tras el aterrizaje recogemos nuestras maletas. | Reisen / B110 |
| die Landwirtschaft | di lánt-virt-shaft | la agricultura | Sustantivo (Fem) | Singular | In dieser Region spielt die Landwirtschaft eine Rolle. | En esta región la agricultura juega un papel importante. | Natur / B110 |
| die Linie | di lí-nie | la línea (metro/autobús) | Sustantivo (Fem) | Pl: die Linien | Sie müssen hier die Linie vier nehmen. | Tiene que tomar aquí la línea cuatro. | Verkehr / A134 |
| die Luft | di luft | el aire | Sustantivo (Fem) | Singular | Nach der Arbeit brauche ich frische Luft. | Después del trabajo necesito aire fresco. | Natur / A2–B110 |
| der Reiseführer | dea rái-ze-fü-ra | la guía turística (libro/persona) | Sustantivo (Masc) | Pl: die Reiseführer | Vor dem Urlaub kaufe ich einen Reiseführer. | Antes de las vacaciones compro una guía turística. | Reisen / A218 |
| der Schulweg | dea shúl-vek | el camino al colegio | Sustantivo (Masc) | Pl: die Schulwege | Der Schulweg dauert zu Fuß zehn Minuten. | El camino a la escuela dura diez minutos a pie. | Orientierung / A121 |
| das Souvenir | das zu-ve-nír | el recuerdo / suvenir | Sustantivo (Neutro) | Pl: die Souvenirs | Aus Berlin bringen wir kleine Souvenirs mit. | De Berlín traemos pequeños recuerdos. | Reisen / A218 |
| der Strand | dea shtrant | la playa | Sustantivo (Masc) | Pl: die Strände | Im Urlaub liegen wir am liebsten am Strand. | En vacaciones nos gusta tumbarnos en la playa. | Reisen / A2–B17 |
| die Straßenbahn | di shtrá-sen-ban | el tranvía | Sustantivo (Fem) | Pl: die Straßenbahnen | Ich fahre jeden Tag mit der Straßenbahn ins Büro. | Voy todos los días en tranvía a la oficina. | Verkehr / A1–B17 |
| die Strecke | di shtré-ke | el trayecto / recorrido | Sustantivo (Fem) | Pl: die Strecken | Diese Strecke ist wegen Bauarbeiten gesperrt. | Este trayecto está cortado por obras. | Verkehr / B17 |
| der Sturm | dea shturm | la tormenta / temporal | Sustantivo (Masc) | Pl: die Stürme | Wegen des Sturms fallen heute viele Züge aus. | Por la tormenta hoy se cancelan muchos trenes. | Wetter / B17 |
| das Tal | das tal | el valle | Sustantivo (Neutro) | Pl: die Täler | Das kleine Dorf liegt tief unten im Tal. | El pueblito está situado abajo en el valle. | Natur / B17 |
| das Taxi | das ták-si | el taxi | Sustantivo (Neutro) | Pl: die Taxis | Wir nehmen ein Taxi direkt zum Bahnhof. | Tomamos un taxi directo a la estación. | Verkehr / A1–B17 |
| die Tour | di tur | la excursión / recorrido | Sustantivo (Fem) | Pl: die Touren | Am Sonntag machen wir eine Fahrradtour am Fluss. | El domingo hacemos una ruta en bici junto al río. | Reisen / B17 |
| die Umwelt | di úm-velt | el medio ambiente | Sustantivo (Fem) | Singular | Bahnfahren ist besser für unsere Umwelt. | Viajar en tren es mejor para nuestro medio ambiente. | Natur / A16 |
| das Unwetter | das ún-ve-ta | el temporal / tormenta severa | Sustantivo (Neutro) | Pl: die Unwetter | Bei starkem Unwetter bleiben Sie besser zu Hause. | Con temporal fuerte mejor quédese en casa. | Wetter / B119 |
| das Verkehrsmittel | das fea-kérs-mi-tel | el medio de transporte | Sustantivo (Neutro) | Pl: die Verkehrsmittel (Öffentliche V.) | Welche öffentlichen Verkehrsmittel nutzen Sie? | ¿Qué medios de transporte público utiliza usted? | Verkehr / A2–B119 |

### **Kapitel 13: Fahrschuldeutsch: Auto (ID interno 12\)**

Tu documento técnico Tabla Maestra \- El Vehículo y la Conducción contiene 124 términos sobre partes del vehículo, luces reglamentarias, maniobras de examen práctico, normativa vial y alertas de tablero que aún no se han cargado en chapters.jsx, complementados con términos de tráfico B1 y DTZ7. Dado que las 70 palabras actuales de este capítulo son visibles al 100 % en additions\_only.txt12, este bloque está libre de colisiones.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| das ABS | das a-be-és | sistema antibloqueo (ABS) | Sustantivo (Neutro) | Sigla técnica | Jedes moderne Auto hat heute ABS. | Todo coche moderno tiene hoy sistema ABS. | Teile des Autos / B119 |
| die Antenne | di an-té-ne | la antena | Sustantivo (Fem) | Pl: die Antennen | Die Antenne befindet sich hinten auf dem Dach. | La antena se encuentra atrás sobre el techo. | Teile des Autos / A219 |
| das Armaturenbrett | das ar-ma-tú-ren-bret | el tablero / salpicadero | Sustantivo (Neutro) | Pl: die Armaturenbretter | Auf dem Armaturenbrett leuchtet eine Warnlampe. | En el tablero se enciende una luz de advertencia. | Teile des Autos / B119 |
| die Autotür | di áu-to-tür | la puerta del coche | Sustantivo (Fem) | Pl: die Autotüren | Bitte schließen Sie die Autotür vor der Fahrt\! | ¡Por favor, cierre la puerta del coche antes de salir\! | Teile des Autos / A1–A219 |
| die Bremsanlage | di bréms-an-la-gue | el sistema de frenos | Sustantivo (Fem) | Pl: die Bremsanlagen | Die Werkstatt prüft heute die ganze Bremsanlage. | El taller revisa hoy todo el sistema de frenos. | Teile des Autos / B119 |
| das Dach | das daj | el techo (del vehículo) | Sustantivo (Neutro) | Pl: die Dächer | Wir montieren eine Box auf das Dach. | Montamos un cofre sobre el techo. | Teile des Autos / A219 |
| das Gebläse | das gue-blé-ze | el ventilador / soplador | Sustantivo (Neutro) | Pl: die Gebläse | Im Winter macht das Gebläse die Scheibe frei. | En invierno el ventilador despeja el cristal. | Teile des Autos / B119 |
| der Geländewagen | dea gue-lén-de-va-guen | el todoterreno / camioneta SUV | Sustantivo (Masc) | Pl: die Geländewagen | Auf Waldwegen fährt ein Geländewagen besser. | Por caminos forestales un todoterreno circula mejor. | Teile des Autos / A228 |
| die Heckscheibe | di jék-shai-be | la luneta trasera | Sustantivo (Fem) | Pl: die Heckscheiben | Im Winter ist die Heckscheibe oft gefroren. | En invierno la luneta trasera suele estar helada. | Teile des Autos / B119 |
| das Hinterrad | das jín-ta-rat | la rueda trasera | Sustantivo (Neutro) | Pl: die Hinterräder | Das rechte Hinterrad verliert etwas Luft. | La rueda trasera derecha pierde algo de aire. | Teile des Autos / B119 |
| das Kfz (Kraftfahrzeug) | das ka-ef-tsét | el vehículo motorizado | Sustantivo (Neutro) | Pl: die Kfz | Die Kfz-Versicherung ist in Deutschland Pflicht. | El seguro del vehículo es obligatorio en Alemania. | Teile des Autos / B17 |
| der Kofferraum | dea kó-fa-raum | el maletero / baúl | Sustantivo (Masc) | Pl: die Kofferräume | Die Koffer legen wir in den Kofferraum. | Ponemos las maletas en el maletero. | Teile des Autos / A2–B119 |
| die Kopfstütze | di kóp-shtü-tse | el reposacabezas | Sustantivo (Fem) | Pl: die Kopfstützen | Stellen Sie die Kopfstütze auf Ihre Größe ein\! | ¡Ajuste el reposacabezas a su estatura\! | Teile des Autos / B119 |
| der Kotflügel | dea kót-flü-guel | el guardabarros / aleta | Sustantivo (Masc) | Pl: die Kotflügel | Nach dem Parkunfall hat der Kotflügel einen Kratzer. | Tras el golpe al aparcar el guardabarros tiene un arañazo. | Teile des Autos / B119 |
| der Kühlergrill | dea kǘ-la-gril | la parrilla del radiador | Sustantivo (Masc) | Pl: die Kühlergrills | Vorne am Auto sitzt der Kühlergrill. | Delante del coche está situada la parrilla del radiador. | Teile des Autos / B119 |
| das Kühlmittel | das kǘl-mi-tel | el líquido refrigerante | Sustantivo (Neutro) | Pl: die Kühlmittel | Vor einer langen Fahrt prüfe ich das Kühlmittel. | Antes de un viaje largo reviso el refrigerante. | Teile des Autos / B119 |
| der Laster | dea lás-ta | el camión (coloquial) | Sustantivo (Masc) | Pl: die Laster | Auf der rechten Spur fahren viele Laster. | Por el carril derecho circulan muchos camiones. | Teile des Autos / B110 |
| das Moped | das mó-pet | el ciclomotor | Sustantivo (Neutro) | Pl: die Mopeds | Jugendliche dürfen ab 15 Jahren ein Moped fahren. | Los jóvenes pueden conducir ciclomotor desde los 15 años. | Teile des Autos / B119 |
| das Motorrad | das mo-tór-rat | la motocicleta | Sustantivo (Neutro) | Pl: die Motorräder (también en K22) | Zum Fahren eines Motorrads braucht man einen Helm. | Para conducir una moto se necesita casco. | Teile des Autos / A2–B119 |
| das Pedal | das pe-dál | el pedal | Sustantivo (Neutro) | Pl: die Pedale | Ein Schaltwagen hat unten drei Pedale. | Un coche manual tiene abajo tres pedales. | Teile des Autos / A2–B119 |
| die Radkappe | di rát-ka-pe | el tapacubos | Sustantivo (Fem) | Pl: die Radkappen | Eine Radkappe schützt die Stahlfelge. | Un tapacubos protege la llanta de acero. | Teile des Autos / B119 |
| das Rücklicht | das rǘk-lijt | la luz trasera | Sustantivo (Neutro) | Pl: die Rücklichter | Das linke Rücklicht funktioniert heute nicht. | La luz trasera izquierda no funciona hoy. | Teile des Autos / B119 |
| der Rückstrahler | dea rǘk-shtra-la | el reflector / catadióptrico | Sustantivo (Masc) | Pl: die Rückstrahler | Hinten am Fahrzeug müssen zwei Rückstrahler sein. | Atrás en el vehículo debe haber dos reflectores. | Teile des Autos / B119 |
| die Scheibenwaschflüssigkeit | di shái-ben-vash-flü-sij-kait | el líquido limpiaparabrisas | Sustantivo (Fem) | Singular | Im Winter braucht die Scheibenwaschflüssigkeit Frostschutz. | En invierno el limpiaparabrisas necesita anticongelante. | Teile des Autos / B119 |
| der Scheinwerfer | dea sháin-ver-fa | el faro delantero | Sustantivo (Masc) | Pl: die Scheinwerfer | Im Tunnel muss man die Scheinwerfer einschalten. | En el túnel hay que encender los faros delanteros. | Teile des Autos / B119 |
| das Seitenfenster | das záiten-fens-ta | la ventanilla lateral | Sustantivo (Neutro) | Pl: die Seitenfenster | Öffnen Sie bitte das Seitenfenster an der Mautstelle. | Por favor, abra la ventanilla lateral en el peaje. | Teile des Autos / A2–B119 |
| der Seitenspiegel | dea záiten-shpi-guel | el espejo retrovisor lateral | Sustantivo (Masc) | Pl: die Seitenspiegel | Vor dem Abbiegen schaue ich in den Seitenspiegel. | Antes de girar miro por el espejo lateral. | Teile des Autos / B119 |
| der Sitz | dea zits | el asiento | Sustantivo (Masc) | Pl: die Sitze | Stellen Sie Ihren Sitz vor der Fahrt richtig ein\! | ¡Ajuste bien su asiento antes de conducir\! | Teile des Autos / A2–B119 |
| die Sonnenblende | di zó-nen-blen-de | el parasol / visera | Sustantivo (Fem) | Pl: die Sonnenblenden | Bei tiefer Sonne klappe ich die Sonnenblende herunter. | Con sol bajo abato el parasol. | Teile des Autos / B119 |
| der Tankdeckel | dea tánk-de-kel | la tapa del depósito | Sustantivo (Masc) | Pl: die Tankdeckel | Vergessen Sie nach dem Tanken den Tankdeckel nicht\! | ¡No olvide la tapa del tanque después de repostar\! | Teile des Autos / B119 |
| der Transporter | dea trans-pór-ta | la furgoneta | Sustantivo (Masc) | Pl: die Transporter | Für den Umzug mieten wir einen großen Transporter. | Para la mudanza alquilamos una furgoneta grande. | Teile des Autos / B119 |
| das Türschloss | das tǘr-shlos | la cerradura de la puerta | Sustantivo (Neutro) | Pl: die Türschlösser | Bei Frost kann das Türschloss manchmal einfrieren. | Con heladas la cerradura puede congelarse a veces. | Teile des Autos / B119 |
| das Vorderrad | das fór-da-rat | la rueda delantera | Sustantivo (Neutro) | Pl: die Vorderräder | Die Vorderräder tragen das Gewicht des Motors. | Las ruedas delanteras soportan el peso del motor. | Teile des Autos / B119 |
| das Zündschloss | das tsǘnt-shlos | el bombín de encendido | Sustantivo (Neutro) | Pl: die Zündschlösser | Stecken Sie den Schlüssel in das Zündschloss. | Introduzca la llave en el interruptor de encendido. | Teile des Autos / B119 |
| der Nebelscheinwerfer | dea né-bel-shain-ver-fa | el faro antiniebla delantero | Sustantivo (Masc) | Pl: die Nebelscheinwerfer | Bei dichtem Nebel schalte ich die Nebelscheinwerfer ein. | Con niebla densa enciendo los antinieblas delanteros. | Autolichter / B119 |
| das Rückfahrlicht | das rǘk-far-lijt | la luz de marcha atrás | Sustantivo (Neutro) | Pl: die Rückfahrlichter | Beim Einlegen des Rückwärtsgangs geht das Rückfahrlicht an. | Al meter marcha atrás se enciende la luz de reversa. | Autolichter / B119 |
| das Standlicht | das shtánt-lijt | la luz de posición | Sustantivo (Neutro) | Pl: die Standlichter | Im Dunkeln darf man außerorts nicht nur mit Standlicht fahren. | A oscuras fuera de poblado no se puede ir solo con luz de posición. | Autolichter / B119 |
| ab\|stellen | áp-shte-len | estacionar / apagar (motor) | Verbo separable | \+ Akk / stellt ab, stellte ab, hat abgestellt | Bitte stellen Sie den Motor im Stau ab. | Por favor, apague el motor en el atasco. | Aktionen / B119 |
| an\|fahren | án-fa-ren | arrancar / ponerse en marcha | Verbo separable irr. | fährt an, fuhr an, ist angefahren | Am Berg muss man vorsichtig anfahren. | En cuesta hay que arrancar con cuidado. | Aktionen / B119 |
| aus\|rutschen | áus-ru-chen | resbalar / derrapar | Verbo separable | rutscht aus, rutschte aus, ist ausgerutscht | Auf dem Eis kann das Auto schnell ausrutschen. | Sobre el hielo el coche puede derrapar rápido. | Aktionen / B119 |
| aus\|weichen | áus-vai-jen | esquivar / ceder el paso | Verbo separable irr. | \+ Dativ / weicht aus, wich aus, ist ausgewichen | Der Fahrer musste einem Hindernis ausweichen. | El conductor tuvo que esquivar un obstáculo. | Aktionen / B119 |
| beschädigen | be-shé-di-guen | dañar / averiar | Verbo inseparable | \+ Akk / beschädigt, hat beschädigt | Der Hagel hat mehrere Autos schwer beschädigt. | El granizo ha dañado gravemente varios coches. | Aktionen / B119 |
| einen Gang ein\|legen | ái-nen gang áin-le-guen | meter una marcha / cambio | Frase verbal | \+ Akk / legt ein, legte ein, hat eingelegt | Vor dem Losfahren legen Sie den ersten Gang ein. | Antes de arrancar meta la primera marcha. | Aktionen / B119 |
| ein\|parken | áin-par-ken | aparcar / estacionar (en hueco) | Verbo separable | parkt ein, parkte ein, hat eingeparkt | In der Fahrprüfung müssen Sie rückwärts einparken. | En el examen práctico tiene que aparcar marcha atrás. | Aktionen / B119 |
| los\|fahren | lós-fa-ren | partir / arrancar | Verbo separable irr. | fährt los, fuhr los, ist losgefahren | Wann fahren wir morgen früh los? | ¿A qué hora salimos mañana temprano? | Aktionen / A2–B119 |
| parkieren (CH) | par-kí-ren | aparcar (variante suiza) | Verbo (-ieren) | parkiert, parkierte, hat parkiert | In Zürich darf man hier eine Stunde parkieren. | En Zúrich se permite aparcar aquí una hora. | Aktionen / B17 |
| pendeln | pén-deln | desplazarse a diario al trabajo | Verbo regular | zwischen \+ Dat / pendelt, hat gependelt | Viele Menschen pendeln jeden Tag nach Frankfurt. | Muchas personas viajan a diario a trabajar a Fráncfort. | Aktionen / B119 |
| Rücksicht nehmen | rǘk-zijt ne-men | tener consideración / respeto | Frase verbal | auf \+ Akk / nimmt, nahm, hat genommen | Auf der Straße muss man Rücksicht auf Radfahrer nehmen. | En la calle hay que tener consideración con los ciclistas. | Aktionen / B119 |
| sperren | shpé-ren | cortar / bloquear (una vía) | Verbo regular | \+ Akk / sperrt, sperrte, hat gesperrt | Die Polizei musste die Autobahn nach dem Unfall sperren. | La policía tuvo que cortar la autopista tras el accidente. | Aktionen / B119 |
| statt\|finden | shtát-fin-den | tener lugar / celebrarse | Verbo separable irr. | findet statt, fand statt, hat stattgefunden | Die Fahrprüfung findet am Donnerstag statt. | El examen de conducción tiene lugar el jueves. | Aktionen / A2–B119 |
| stehen bleiben | shté-en blai-ben | detenerse / quedarse parado | Frase verbal irr. | bleibt stehen, blieb stehen, ist stehen geblieben | Bei roter Ampel müssen alle Autos stehen bleiben. | Con semáforo en rojo todos los coches deben detenerse. | Aktionen / A2–B119 |
| tanken | tán-ken | repostar / echar gasolina | Verbo regular | \+ Akk / tankt, tankte, hat getankt | Ich muss heute noch Super-Benzin tanken. | Hoy todavía tengo que repostar gasolina súper. | Aktionen / A2–B17 |
| um\|kehren | úm-ke-ren | dar la vuelta / cambiar sentido | Verbo separable | kehrt um, kehrte um, ist umgekehrt | Hier ist eine Sackgasse, wir müssen umkehren. | Aquí es calle sin salida, debemos dar la vuelta. | Aktionen / B119 |
| verkehren | fea-ké-ren | circular (transporte regular) | Verbo inseparable | verkehrt, verkehrte, hat verkehrt | Die Züge verkehren heute nur jede Stunde. | Los trenes circulan hoy solo cada hora. | Aktionen / B119 |
| verunglücken | fea-ún-glü-ken | sufrir un accidente | Verbo inseparable | verunglückt, verunglückte, ist verunglückt | Auf der glatten Straße ist ein Lkw verunglückt. | En la carretera resbaladiza se accidentó un camión. | Aktionen / B119 |
| verursachen | fea-úr-za-jen | causar / provocar | Verbo inseparable | \+ Akk / verursacht, hat verursacht | Zu hohe Geschwindigkeit verursacht oft schwere Unfälle. | La velocidad excesiva suele causar accidentes graves. | Aktionen / B119 |
| warten | vár-ten | esperar | Verbo regular | auf \+ Akk / wartet, wartete, hat gewartet | Ich warte an der Kreuzung auf grünes Licht. | Espero la luz verde en el cruce. | Aktionen / A1–B119 |
| das Abgas / die Abgase | das áp-gas / di áp-ga-ze | el gas de escape / emisiones | Sustantivo (Neutro) | Pl: die Abgase | Alte Dieselmotoren produzieren viele Abgase. | Los motores diésel antiguos producen muchas emisiones. | Verkehr / B110 |
| die Airbag-Störung | di ér-bek-shtö-rung | el fallo del airbag | Sustantivo (Fem) | Pl: die Airbag-Störungen | Bei einer Airbag-Störung leuchtet ein rotes Symbol. | Con un fallo del airbag se enciende un símbolo rojo. | Dashboard / B119 |
| der Batterieladezustand | dea ba-te-rí-la-de-tsu-shtant | el estado de carga de la batería | Sustantivo (Masc) | Singular | Die Kontrollleuchte zeigt den Batterieladezustand an. | El testigo indica el estado de carga de la batería. | Dashboard / B119 |
| beleuchtet | be-lóij-tet | iluminado | Participio / Adjetivo | Antónimo: unbeleuchtet | Im Winter sind die Straßen oft schlecht beleuchtet. | En invierno las calles suelen estar mal iluminadas. | Verkehr / B119 |
| die Beschädigung | di be-shé-di-gung | el daño / desperfecto | Sustantivo (Fem) | Pl: die Beschädigungen | Wir melden die Beschädigung der Versicherung. | Comunicamos el daño al seguro. | Verkehr / B119 |
| die Bremsbeläge | di bréms-be-le-gue | las pastillas de freno | Sustantivo (Plural) | Sg: der Bremsbelag | Die Bremsbeläge müssen bald gewechselt werden. | Las pastillas de freno deben cambiarse pronto. | Dashboard / B119 |
| die durchgezogene Linie | di dúrj-gue-tso-gue-ne lí-nie | la línea continua | Frase nominal (Fem) | Pl: die durchgezogenen Linien | Eine durchgezogene Linie darf man nicht überfahren. | No está permitido cruzar una línea continua. | Verkehrsregeln / B119 |
| das Dreieck | das drái-ek | el triángulo (de emergencia/señal) | Sustantivo (Neutro) | Pl: die Dreiecke | Bei einer Panne stellen Sie das Warndreieck auf. | En una avería coloque el triángulo de emergencia. | Verkehrsregeln / A2–B119 |
| die Einfahrt | di áin-fart | la entrada (vehicular) / acceso | Sustantivo (Fem) | Pl: die Einfahrten | Bitte halten Sie die Einfahrt für die Feuerwehr frei\! | ¡Por favor, deje libre la entrada para los bomberos\! | Verkehrsregeln / B110 |
| die ESP-Leuchte | di e-es-pé-lóij-te | el testigo del control de estabilidad | Sustantivo (Fem) | Pl: die ESP-Leuchten | Bei Glätte blinkt die gelbe ESP-Leuchte. | Con suelo resbaladizo parpadea el testigo amarillo del ESP. | Dashboard / B119 |
| die Fahrbahn / Gegenfahrbahn | di fár-ban | la calzada / carril contrario | Sustantivo (Fem) | Pl: die Fahrbahnen | Überholen Sie nie ohne freie Sicht auf die Gegenfahrbahn\! | ¡Nunca adelante sin visibilidad libre de la vía contraria\! | Verkehrsregeln / B119 |
| die Fahrgemeinschaft | di fár-gue-main-shaft | el viaje en coche compartido | Sustantivo (Fem) | Pl: die Fahrgemeinschaften | Drei Kollegen bilden eine Fahrgemeinschaft zur Arbeit. | Tres compañeros forman un grupo de coche compartido al trabajo. | Verkehr / B119 |
| die Fahrstunde | di fár-shtun-de | la clase práctica de conducir | Sustantivo (Fem) | Pl: die Fahrstunden | Heute habe ich meine zehnte Fahrstunde. | Hoy tengo mi décima clase de conducción. | Fahrschule / A2–B119 |
| der Fahrzeugschein | dea fár-tsoik-shain | el permiso de circulación | Sustantivo (Masc) | Pl: die Fahrzeugscheine | Bei einer Kontrolle brauchen Sie Führerschein und Fahrzeugschein. | En un control necesita el carné y el permiso de circulación. | Fahrschule / B119 |
| die Front-/Heckscheibenheizung | di frónt-shai-ben-jai-tsung | la calefacción de lunas | Sustantivo (Fem) | Pl: \-heizungen | Die Heckscheibenheizung trocknet das Glas schnell. | La luneta térmica trasera seca rápido el cristal. | Dashboard / B119 |
| die Gänge | di guén-gue | las marchas / velocidades | Sustantivo (Plural) | Sg: der Gang | Dieses Fahrzeug hat sechs Vorwärtsgänge. | Este vehículo tiene seis marchas hacia adelante. | Teile des Autos / B119 |
| die Gefahrenbremsung | di gue-fá-ren-brem-sung | el frenado de emergencia | Sustantivo (Fem) | Pl: die Gefahrenbremsungen | In der Prüfung zeigen Sie eine Gefahrenbremsung. | En el examen demuestra un frenado de emergencia. | Fahrschule / B119 |
| gefährlich | gue-fér-lij | peligroso | Adjetivo | Comp: gefährlicher | Überholen in der Kurve ist extrem gefährlich. | Adelantar en la curva es extremadamente peligroso. | Verkehr / A2–B119 |
| die Gefährdung | di gue-fér-dung | el peligro / puesta en riesgo | Sustantivo (Fem) | Pl: die Gefährdungen | Fahren ohne Licht bedeutet eine Gefährdung für alle. | Conducir sin luces supone un peligro para todos. | Verkehrsregeln / B119 |
| der Gebrauchtwagen | dea gue-bráujt-va-guen | el coche de segunda mano | Sustantivo (Masc) | Pl: die Gebrauchtwagen | Wir haben einen günstigen Gebrauchtwagen gekauft. | Hemos comprado un coche usado económico. | Verkehr / B119 |
| die gestrichelte Linie | di gue-shtrí-jel-te lí-nie | la línea discontinua | Frase nominal (Fem) | Pl: die gestrichelten Linien | Bei einer gestrichelten Linie darf man überholen. | Con línea discontinua está permitido adelantar. | Verkehrsregeln / B119 |
| die Getriebestörung | di gue-trí-be-shtö-rung | el fallo de la transmisión | Sustantivo (Fem) | Pl: die Getriebestörungen | Bei einer Getriebestörung schaltet der Wagen nicht mehr. | Con un fallo en la transmisión el coche ya no cambia de marcha. | Dashboard / B119 |
| der Hauptlichtschalter | dea jáupt-lijt-shal-ta | el interruptor principal de luces | Sustantivo (Masc) | Pl: die Hauptlichtschalter | Der Hauptlichtschalter sitzt links neben dem Lenkrad. | El mando principal de luces está a la izquierda del volante. | Dashboard / B119 |
| der Helm | dea jelm | el casco | Sustantivo (Masc) | Pl: die Helme | Auch auf dem Fahrrad schützt ein Helm den Kopf. | Incluso en bicicleta un casco protege la cabeza. | Verkehr / A2–B119 |
| der Kraftstoffstand | dea kráft-shtof-shtant | el nivel de combustible | Sustantivo (Masc) | Pl: die Kraftstoffstände | Die Anzeige im Tacho zeigt den Kraftstoffstand. | El indicador del cuadro muestra el nivel de combustible. | Dashboard / B119 |
| die Kurve | di kúr-ve | la curva | Sustantivo (Fem) | Pl: die Kurven | Vor einer scharfen Kurve muss man bremsen. | Antes de una curva cerrada hay que frenar. | Verkehr / B119 |
| ländlich | lént-lij | rural / de campo | Adjetivo | Antónimo: städtisch | In ländlichen Gebieten fährt der Bus seltener. | En zonas rurales el autobús pasa con menos frecuencia. | Verkehr / B119 |
| die Landstraße | di lánt-shtra-se | la carretera secundaria / interurbana | Sustantivo (Fem) | Pl: die Landstraßen | Auf der Landstraße gilt Tempo hundert in Deutschland. | En carretera interurbana rige el límite de 100 en Alemania. | Verkehr / B119 |
| die Leitplanke | di láit-plan-ke | la barrera quitamiedos / guardarraíl | Sustantivo (Fem) | Pl: die Leitplanken | Rechts neben der Autobahn schützt eine Leitplanke. | A la derecha de la autopista protege una barandilla. | Verkehr / B119 |
| der Mietwagen | dea mít-va-guen | el coche de alquiler | Sustantivo (Masc) | Pl: die Mietwagen | Am Flughafen übernehmen wir unseren Mietwagen. | En el aeropuerto recogemos nuestro coche de alquiler. | Verkehr / B119 |
| der Motorradfahrer | dea mo-tór-rat-fa-ra | el motociclista | Sustantivo (Masc) | Pl: die Motorradfahrer | Achten Sie beim Abbiegen besonders auf Motorradfahrer. | Al girar preste especial atención a los motociclistas. | Verkehr / B119 |
| die Motorstörung | di mó-tor-shtö-rung | la avería de motor (OBD) | Sustantivo (Fem) | Pl: die Motorstörungen | Die gelbe Motorstörung warnt vor einem Defekt. | El testigo amarillo de fallo de motor advierte una avería. | Dashboard / B119 |
| der Nahverkehr | dea ná-fea-ker | el transporte local / cercanías | Sustantivo (Masc) | Singular | Mit dem Deutschlandticket nutzt man den Nahverkehr. | Con el Deutschlandticket se usa el transporte local. | Verkehr / B119 |
| nass | nas | mojado / húmedo | Adjetivo | Comp: nasser | Bei nasser Fahrbahn ist der Bremsweg länger. | Con la calzada mojada la distancia de frenado es mayor. | Verkehr / A2–B119 |
| der Pendler | dea pénd-la | el viajero diario por trabajo | Sustantivo (Masc) | Pl: die Pendler | Morgens stehen viele Pendler im Berufsverkehr. | Por la mañana muchos trabajadores quedan en el tráfico. | Verkehr / B119 |
| der Pfeil | dea pfail | la flecha (señal) | Sustantivo (Masc) | Pl: die Pfeile | Der weiße Pfeil auf der Straße zeigt nach rechts. | La flecha blanca en el suelo indica hacia la derecha. | Verkehrsregeln / B119 |
| die Profiltiefe | di pro-fíl-ti-fe | la profundidad del dibujo (neumático) | Sustantivo (Fem) | Pl: die Profiltiefen | Sommerreifen brauchen mindestens 1,6 mm Profiltiefe. | Los neumáticos de verano requieren mínimo 1,6 mm de dibujo. | Verkehr / B119 |
| der Radfahrer | dea rát-fa-ra | el ciclista | Sustantivo (Masc) | Pl: die Radfahrer | Im Stadtverkehr muss man auf Radfahrer achten. | En tráfico urbano hay que cuidar a los ciclistas. | Verkehr / A2–B119 |
| der Radweg | dea rát-vek | el carril bici / ciclovía | Sustantivo (Masc) | Pl: die Radwege | Radfahrer müssen den markierten Radweg benutzen. | Los ciclistas deben usar el carril bici marcado. | Verkehr / B119 |
| der Rechtsabbiegepfeil | dea réjts-ap-bi-gue-pfail | la flecha verde de giro a la derecha | Sustantivo (Masc) | Pl: die Rechtsabbiegepfeile | Am grünen Rechtsabbiegepfeil hält man zuerst am Halt. | En la flecha de giro a la derecha se para primero. | Verkehrsregeln / B119 |
| die Rettungsgasse | di ré-tungs-ga-se | el pasillo de emergencia | Sustantivo (Fem) | Pl: die Rettungsgassen | Bei Stau auf der Autobahn ist eine Rettungsgasse Pflicht. | Con atasco en autopista es obligatorio abrir pasillo de emergencia. | Verkehrsregeln / B119 |
| die Richtung | di ríj-tung | la dirección / sentido | Sustantivo (Fem) | Pl: die Richtungen | Wir fahren in Richtung Hannover auf der A2. | Circulamos en dirección a Hannover por la A2. | Verkehr / A2–B119 |
| der Sachschaden / Totalschaden | dea záj-sha-den | el daño material / siniestro total | Sustantivo (Masc) | Pl: die Sachschäden | Glücklicherweise gab es beim Unfall nur Sachschaden. | Por suerte en el accidente solo hubo daños materiales. | Verkehr / B119 |
| der Schock | dea shok | el choque emocional / shock | Sustantivo (Masc) | Singular / Pl: die Schocks | Nach dem Zusammenstoß stand der Fahrer unter Schock. | Tras la colisión el conductor estaba en estado de shock. | Verkehr / B119 |
| die Sicht | di zijt | la visibilidad / vista | Sustantivo (Fem) | Singular | Bei schlechter Sicht fahren Sie bitte langsamer. | Con mala visibilidad conduzca más despacio, por favor. | Verkehr / B119 |
| der Standort | dea shtánt-ort | la ubicación / emplazamiento | Sustantivo (Masc) | Pl: die Standorte | Ich schicke dir meinen Standort über das Handy. | Te envío mi ubicación por el móvil. | Verkehr / B119 |
| das Stop-Schild | das shtóp-shilt | la señal de Stop | Sustantivo (Neutro) | Pl: die Stop-Schilder | Am Stop-Schild müssen die Räder drei Sekunden stehen. | En el Stop las ruedas deben detenerse tres segundos. | Verkehrsregeln / A2–B119 |
| die Störung der Lenkung | di shtö́-rung dea lén-kung | el fallo en la dirección | Frase nominal (Fem) | Alerta roja de tablero | Bei Störung der Lenkung sofort anhalten\! | ¡Con fallo en la dirección detenerse de inmediato\! | Dashboard / B119 |
| die Strafe | di shtrá-fe | la multa / sanción / castigo | Sustantivo (Fem) | Pl: die Strafen | Zu schnelles Fahren kostet eine hohe Strafe. | Conducir demasiado rápido cuesta una multa alta. | Verkehrsregeln / B17 |
| strafbar | shtráf-bar | punible / delictivo | Adjetivo | Predicativo/Atributivo | Fahren ohne Führerschein ist in Deutschland strafbar. | Conducir sin licencia es punible en Alemania. | Verkehrsregeln / B17 |
| der Straßenrand | dea shtrá-sen-rant | el arcén / borde de la carretera | Sustantivo (Masc) | Pl: die Straßenränder | Bei einer Panne parken Sie rechts am Straßenrand. | Con una avería estacione a la derecha en el arcén. | Verkehr / B119 |
| der Stundenkilometer | dea shtún-den-ki-lo-me-ta | el kilómetro por hora (km/h) | Sustantivo (Masc) | Pl: die Stundenkilometer | In der Stadt sind fünfzig Stundenkilometer erlaubt. | En la ciudad se permiten cincuenta kilómetros por hora. | Verkehr / A2–B119 |
| die Tankstelle | di tánk-shte-le | la gasolinera / estación de servicio | Sustantivo (Fem) | Pl: die Tankstellen | An der nächsten Tankstelle füllen wir Benzin nach. | En la próxima gasolinera echamos gasolina. | Verkehr / A2–B17 |
| der Tempomat | dea tem-po-mát | el control de crucero | Sustantivo (Masc) | Pl: die Tempomaten | Auf der Autobahn schalte ich den Tempomat ein. | En la autopista activo el control de crucero. | Dashboard / B119 |
| der Tunnel | dea tú-nel | el túnel | Sustantivo (Masc) | Pl: die Tunnel | Im Tunnel ist das Überholen streng verboten. | En el túnel adelantar está estrictamente prohibido. | Verkehr / B119 |
| das Überholmanöver | das ü-ba-jól-ma-nö-va | la maniobra de adelantamiento | Sustantivo (Neutro) | Pl: die Überholmanöver | Brechen Sie bei Gegenverkehr das Überholmanöver ab\! | ¡Aborte el adelantamiento si viene tráfico de frente\! | Verkehr / B119 |
| das Überholverbot | das ü-ba-jól-fea-bot | la prohibición de adelantar | Sustantivo (Neutro) | Pl: die Überholverbote | Auf dieser Brücke gilt ein Überholverbot für Lkw. | En este puente rige prohibición de adelantar para camiones. | Verkehrsregeln / B119 |
| umweltfreundlich | úm-velt-froint-lij | ecológico / respetuoso con el medio | Adjetivo | Comp: umweltfreundlicher | Ein Elektroauto fährt besonders umweltfreundlich. | Un coche eléctrico circula de forma especialmente ecológica. | Verkehr / B119 |
| unsicher | ún-zi-ja | inseguro / incierto | Adjetivo | Comp: unsicherer | Bei Glatteis ist das Fahren sehr unsicher. | Con hielo en la calzada conducir es muy inseguro. | Verkehr / A2–B119 |
| das Verbot | das fea-bót | la prohibición | Sustantivo (Neutro) | Pl: die Verbote | Beachten Sie das Verbot der Einfahrt\! | ¡Respete la señal de dirección prohibida\! | Verkehrsregeln / B119 |
| das Verkehrshindernis | das fea-kérs-jin-da-nis | el obstáculo en la vía | Sustantivo (Neutro) | Pl: die Verkehrshindernisse | Ein Baum auf der Straße ist ein Verkehrshindernis. | Un árbol en la calzada es un obstáculo vial. | Verkehr / B119 |
| die Verkehrsregeln | di fea-kérs-re-gueln | las normas de tráfico | Sustantivo (Plural) | Sg: die Verkehrsregel | Alle Fahrer müssen die Verkehrsregeln kennen. | Todos los conductores deben conocer las normas de tráfico. | Verkehrsregeln / B119 |
| die Verletzung | di fea-lé-tsung | la lesión / herida | Sustantivo (Fem) | Pl: die Verletzungen | Der Arzt untersucht die leichte Verletzung am Bein. | El médico examina la lesión leve en la pierna. | Verkehr / B119 |
| die Vorglühanlage | di fór-glü-an-la-gue | el sistema de precalentamiento (diésel) | Sustantivo (Fem) | Pl: die Vorglühanlagen | Bei Kälte wartet man auf die gelbe Vorglühanlage. | Con frío se espera a que se apague el testigo de precalentamiento. | Dashboard / B119 |
| Vorfahrt achten | fór-fart aj-ten | ceder el paso | Frase verbal | \+ Akk / Norma vial | An dieser Kreuzung müssen Sie Vorfahrt achten\! | ¡En este cruce tiene que ceder el paso\! | Verkehrsregeln / A2–B119 |
| das Warnzeichen | das várn-tsai-jen | la señal de advertencia / peligro | Sustantivo (Neutro) | Pl: die Warnzeichen | Ein rotes Dreieck ist ein Warnzeichen. | Un triángulo rojo es una señal de advertencia. | Verkehrsregeln / B119 |
| die Wartung | di vár-tung | el mantenimiento / revisión | Sustantivo (Fem) | Pl: die Wartungen | Einmal pro Jahr braucht das Auto eine Wartung. | Una vez al año el coche necesita mantenimiento. | Fahrschule / B119 |

### **Kapitel 14: Post & Bank (ID interno 8\)**

Añade 8 términos críticos de telefonía formal, tarjetas bancarias alemanas y requerimientos de cobro6. Las 45 entradas previas de este capítulo son visibles al completo entre additions\_only.txt y las 3 palabras nombradas de la expansión de 100 términos (zurückrufen, erreichen, ausdrucken)2.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| der Anruf | dea án-ruf | la llamada telefónica | Sustantivo (Masc) | Pl: die Anrufe (también en K22) | Ich warte dann heute Nachmittag auf deinen Anruf. | Entonces espero tu llamada esta tarde. | Telefon / A1–B16 |
| der Anrufbeantworter | dea án-ruf-be-ant-vor-ta | el contestador automático | Sustantivo (Masc) | Pl: die Anrufbeantworter | Sind Nachrichten auf dem Anrufbeantworter? | ¿Hay mensajes en el contestador automático? | Telefon / A1–B16 |
| die Ansage | di án-za-gue | el mensaje grabado / anuncio | Sustantivo (Fem) | Pl: die Ansagen | Hören Sie bitte die Ansage am Telefon genau an\! | ¡Escuche con atención el mensaje grabado del teléfono\! | Telefon / B110 |
| die ec-Karte | di e-tsé-kar-te | la tarjeta de débito (Girocard) | Sustantivo (Fem) | Pl: die ec-Karten | Kann ich hier an der Kasse mit ec-Karte zahlen? | ¿Puedo pagar aquí en caja con tarjeta de débito? | Bank / B110 |
| faxen | fák-sen | enviar por fax | Verbo regular | \+ Akk / faxt, faxte, hat gefaxt | Bitte faxen Sie uns das Dokument bis Freitag. | Por favor, envíenos el documento por fax hasta el viernes. | Post / B17 |
| die Mahnung | di má-nung | el aviso de cobro / requerimiento | Sustantivo (Fem) | Pl: die Mahnungen | Wenn man spät zahlt, schickt die Firma eine Mahnung. | Si se paga tarde, la empresa envía un recordatorio de pago. | Bank / B110 |
| die Summe | di zú-me | la suma / importe total | Sustantivo (Fem) | Pl: die Summen | Bitte überweisen Sie die gesamte Summe bis Montag. | Por favor, transfiera el importe total hasta el lunes. | Bank / B17 |
| das Taschengeld | das tá-shen-guelt | la paga (de los hijos) | Sustantivo (Neutro) | Singular | Mit zwölf Jahren bekommt er zwanzig Euro Taschengeld. | Con doce años recibe veinte euros de paga. | Geld / B17 |

### **Kapitel 15: Gesundheit (ID interno 9\)**

Aporta 16 vocablos sobre anatomía, consulta médica, medicación y prevención de adicciones7. Dado que el capítulo contó con \~22 entradas de la expansión V1 (capítulo 9 previo al reordenamiento) no visibles en additions\_only.txt12, comprueba duplicados con getSafeId antes de fusionar.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| die Brust | di brust | el pecho / tórax | Sustantivo (Fem) | Pl: die Brüste | Beim Husten habe ich Schmerzen in der Brust. | Al toser tengo dolor en el pecho. | Körperteile / A1–A229 |
| der Ellbogen | dea él-bo-guen | el codo | Sustantivo (Masc) | Pl: die Ellbogen | Mein linker Ellbogen tut nach dem Sport weh. | Me duele el codo izquierdo después del deporte. | Körperteile / A1–A229 |
| das Knie | das kni | la rodilla | Sustantivo (Neutro) | Pl: die Knie (kní-e) | Ich bin gestürzt und mein Knie blutet stark. | Me caí y mi rodilla sangra mucho. | Körperteile / A1–A229 |
| der Krankenpfleger / die Krankenschwester | dea krán-ken-pfle-ga / di shvés-ta | el enfermero / la enfermera | Sustantivo (Masc/Fem) | Pl: die Krankenpfleger / \-schwestern | Die Krankenschwester misst morgens das Fieber. | La enfermera toma la fiebre por la mañana. | Beim Arzt / A29 |
| der Magen | dea má-guen | el estómago | Sustantivo (Masc) | Pl: die Mägen | Nach dem scharfen Essen habe ich Magenschmerzen. | Después de la comida picante tengo dolor de estómago. | Körperteile / B110 |
| schmerzen | shmér-tsen | doler | Verbo regular | schmerzt, schmerzte, hat geschmerzt | Mein rechter Arm schmerzt seit gestern Abend. | Me duele el brazo derecho desde anoche. | Krankheit / A1–A229 |
| die Schulter | di shúl-ta | el hombro | Sustantivo (Fem) | Pl: die Schultern | Durch die schwere Arbeit tut meine Schulter weh. | Por el trabajo pesado me duele el hombro. | Körperteile / A1–A229 |
| die Sprechstunde | di shpréj-shtun-de | el horario de consulta médica | Sustantivo (Fem) | Pl: die Sprechstunden | Wann hat Frau Dr. Klein morgen Sprechstunde? | ¿Cuándo tiene consulta mañana la Dra. Klein? | Beim Arzt / A1–A229 |
| die Stirn | di shtirn | la frente | Sustantivo (Fem) | Pl: die Stirnen | Deine Stirn ist sehr heiß, du hast Fieber. | Tu frente está muy caliente, tienes fiebre. | Körperteile / A1–A229 |
| die Sucht | di zujt | la adicción / dependencia | Sustantivo (Fem) | Pl: die Süchte | Rauchen kann schnell zu einer Sucht werden. | Fumar puede convertirse rápido en una adicción. | Gesundheit / B17 |
| süchtig | zǘj-tij | adicto | Adjetivo | nach \+ Dativ | Viele Jugendliche sind süchtig nach dem Handy. | Muchos jóvenes son adictos al teléfono móvil. | Gesundheit / B17 |
| das Suchtmittel | das zújt-mi-tel | la sustancia adictiva | Sustantivo (Neutro) | Pl: die Suchtmittel | Alkohol und Nikotin sind gefährliche Suchtmittel. | El alcohol y la nicotina son sustancias adictivas peligrosas. | Gesundheit / B17 |
| die Tablette | di ta-blé-te | la pastilla / comprimido | Sustantivo (Fem) | Pl: die Tabletten | Nehmen Sie morgens eine Tablette mit Wasser ein. | Tome por la mañana una pastilla con agua. | Medizin / B17 |
| das Taschentuch | das tá-shen-tuj | el pañuelo | Sustantivo (Neutro) | Pl: die Taschentücher | Bei Schnupfen brauche ich viele Taschentücher. | Con resfriado necesito muchos pañuelos. | Gesundheit / B17 |
| das Waschzeug | das vásh-tsoik | los artículos de aseo | Sustantivo (Neutro) | Singular | Für das Krankenhaus packe ich mein Waschzeug ein. | Para el hospital guardo mis artículos de aseo. | Gesundheit / A127 |
| der Zeh / die Zehen | dea tse / di tsé-en | el dedo del pie / los dedos | Sustantivo (Masc) | Pl: die Zehen | Ich habe mir den großen Zeh gestoßen. | Me he golpeado el dedo gordo del pie. | Körperteile / A1–A229 |

### **Kapitel 16: Schule & Beruf (ID interno 11\)**

Reúne 92 entradas nuevas: 25 profesiones oficiales de las listas A1/A2, 16 sustantivos y verbos del entorno laboral, y 51 vocablos del sistema escolar alemán, asignaturas y terminología oficial de los exámenes B1 (Anweisungssprache)6.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| der/die Angestellte | dea/di án-gue-shtel-te | el empleado / la empleada | Sustantivo (Masc/Fem) | Declina como adjetivo; Pl: die Angestellten | Als Angestellter arbeite ich im Büro. | Como empleado trabajo en la oficina. | Berufe / A1–B16 |
| der Architekt / die Architektin | dea ar-ji-tékt | el arquitecto / la arquitecta | Sustantivo (Masc/Fem) | Pl: die Architekten / \-innen | Mein Onkel arbeitet als Architekt in Berlin. | Mi tío trabaja como arquitecto en Berlín. | Berufe / A16 |
| der Assistent / die Assistentin | dea a-sis-tént | el asistente / la asistente | Sustantivo (Masc/Fem) | Pl: die Assistenten / \-innen | Ich bin Assistentin in einer Design-Agentur. | Soy asistente en una agencia de diseño. | Berufe / A133 |
| der Autor / die Autorin | dea áu-tor | el autor / la autora | Sustantivo (Masc/Fem) | Pl: die Autoren / \-innen | Die Autorin schreibt gerade ein neues Buch. | La autora está escribiendo ahora un libro nuevo. | Berufe / A29 |
| der Bäcker / die Bäckerin | dea bé-ka | el panadero / la panadera | Sustantivo (Masc/Fem) | Pl: die Bäcker / \-innen | Der Bäcker steht jeden Tag um vier Uhr auf. | El panadero se levanta todos los días a las cuatro. | Berufe / A29 |
| der Erzieher / die Erzieherin | dea ea-tsí-a | el educador infantil / la educadora | Sustantivo (Masc/Fem) | Pl: die Erzieher / \-innen | Meine Schwester arbeitet als Erzieherin in einer Kita. | Mi hermana trabaja como educadora en una guardería. | Berufe / A1–A236 |
| der Florist / die Floristin | dea flo-ríst | el florista / la florista | Sustantivo (Masc/Fem) | Pl: die Floristen / \-innen | Die Floristin bindet einen schönen Blumenstrauß. | La florista prepara un bonito ramo de flores. | Berufe / A1–A236 |
| der Friseur / die Friseurin | dea fri-zö́r | el peluquero / la peluquera | Sustantivo (Masc/Fem) | Pl: die Friseure / \-innen | Um zehn Uhr habe ich einen Termin beim Friseur. | A las diez tengo cita en la peluquería. | Berufe / A29 |
| der Handwerker / die Handwerkerin | dea jánt-ver-ka | el operario de oficio / artesano | Sustantivo (Masc/Fem) | Pl: die Handwerker / \-innen | In Deutschland sucht man viele gute Handwerker. | En Alemania se buscan muchos buenos operarios de oficio. | Berufe / A2–B17 |
| der Hausmann / die Hausfrau | dea jáus-man / di jáus-frau | el amo de casa / ama de casa | Sustantivo (Masc/Fem) | Pl: die Hausmänner / die Hausfrauen | Nach der Geburt blieb er ein Jahr als Hausmann zu Hause. | Tras el nacimiento se quedó un año en casa como amo de casa. | Berufe / A1–A26 |
| der Ingenieur / die Ingenieurin | dea in-ye-niö́r | el ingeniero / la ingeniera | Sustantivo (Masc/Fem) | Pl: die Ingenieure / \-innen | Meine Freundin ist Ingenieurin für Solartechnik. | Mi amiga es ingeniera de tecnología solar. | Berufe / A16 |
| der Journalist / die Journalistin | dea yur-na-líst | el periodista / la periodista | Sustantivo (Masc/Fem) | Pl: die Journalisten / \-innen | Der Journalist schreibt Artikel für eine Zeitung. | El periodista escribe artículos para un periódico. | Berufe / A29 |
| der Kaufmann / die Kauffrau | dea káuf-man / di káuf-frau | el comerciante / administrativo comercial | Sustantivo (Masc/Fem) | Pl: die Kaufleute / die Kauffrauen | Er macht eine Ausbildung zum Kaufmann im Einzelhandel. | Él hace una formación de comercio minorista. | Berufe / A1–A26 |
| der Künstler / die Künstlerin | dea kǘnst-la | el artista / la artista | Sustantivo (Masc/Fem) | Pl: die Künstler / \-innen | Viele junge Künstler leben in Berlin. | Muchos jóvenes artistas viven en Berlín. | Berufe / A1–A26 |
| der Maler | dea má-la | el pintor (de obra o arte) | Sustantivo (Masc) | Pl: die Maler (Fem: die Malerin) | Der Maler streicht morgen unser Wohnzimmer. | El pintor pinta mañana nuestra sala de estar. | Berufe / B110 |
| der Manager / die Managerin | dea mé-ne-ya | el gerente / director | Sustantivo (Masc/Fem) | Pl: die Manager / \-innen | Sie arbeitet als Managerin in einer großen Firma. | Ella trabaja como gerente en una gran empresa. | Berufe / B17 |
| der Mechatroniker | dea me-ja-tró-ni-ka | el técnico mecatrónico | Sustantivo (Masc) | Pl: die Mechatroniker (Fem: \-in) | Als Mechatroniker repariere ich moderne Autos. | Como técnico mecatrónico reparo coches modernos. | Berufe / A1–A236 |
| das Model | das mó-del | el/la modelo | Sustantivo (Neutro) | Pl: die Models / Modelle | Das junge Model arbeitet für eine Modefirma. | La joven modelo trabaja para una empresa de moda. | Berufe / A29 |
| der Moderator / die Moderatorin | dea mo-de-rá-tor | el moderador / presentador | Sustantivo (Masc/Fem) | Pl: die Moderatoren / \-innen | Die Moderatorin begrüßt alle Gäste der Sendung. | La presentadora saluda a todos los invitados del programa. | Berufe / B17 |
| der Musiker / die Musikerin | dea mú-zi-ka | el músico / la música | Sustantivo (Masc/Fem) | Pl: die Musiker / \-innen | Alle Musiker üben täglich zwei Stunden. | Todos los músicos ensayan dos horas diarias. | Berufe / A29 |
| der Polizist / die Polizistin | dea po-li-tsíst | el policía / la mujer policía | Sustantivo (Masc/Fem) | Pl: die Polizisten / \-innen | Mein Vater ist Polizist in Duisburg. | Mi padre es policía en Duisburgo. | Berufe / A29 |
| der Sänger / die Sängerin | dea zén-gua | el cantante / la cantante | Sustantivo (Masc/Fem) | Pl: die Sänger / \-innen | Die Sängerin gibt am Samstag ein Konzert. | La cantante da un concierto el sábado. | Berufe / A29 |
| der Schauspieler / die Schauspielerin | dea sháu-shpi-la | el actor / la actriz | Sustantivo (Masc/Fem) | Pl: die Schauspieler / \-innen | Der Schauspieler arbeitet am Theater in München. | El actor trabaja en el teatro en Múnich. | Berufe / A1–A26 |
| der Sekretär / die Sekretärin | dea ze-kre-tér | el secretario / la secretaria | Sustantivo (Masc/Fem) | Pl: die Sekretäre / \-innen | Die Sekretärin vereinbart alle Termine für den Chef. | La secretaria concierta todas las citas para el jefe. | Berufe / A16 |
| der Techniker / die Technikerin | dea téj-ni-ka | el técnico / la técnica | Sustantivo (Masc/Fem) | Pl: die Techniker / \-innen | Jennifer ist die Technikerin in der Medien-AG. | Jennifer es la técnica en el club de medios. | Berufe / A1–A26 |
| die Abteilung | di áp-tai-lung | el departamento / sección | Sustantivo (Fem) | Pl: die Abteilungen | Ich arbeite in der technischen Abteilung. | Trabajo en el departamento técnico. | Arbeitswelt / B110 |
| die Agentur | di a-guen-túr | la agencia | Sustantivo (Fem) | Pl: die Agenturen (Agentur für Arbeit) | Die Agentur SANA ist eine Design-Agentur in Münster. | La agencia SANA es una agencia de diseño en Münster. | Arbeitswelt / A1–B110 |
| der Arbeitgeber | dea ár-baits-gue-ba | el empleador / empresa | Sustantivo (Masc) | Pl: die Arbeitgeber | Der Arbeitgeber braucht Ihre Steuer-ID. | El empleador necesita su número de identificación fiscal. | Arbeitswelt / B110 |
| der Arbeitnehmer | dea ár-baits-ne-ma | el trabajador / empleado | Sustantivo (Masc) | Pl: die Arbeitnehmer | Arbeitnehmer haben in Deutschland gesetzlichen Urlaub. | Los trabajadores tienen vacaciones legales en Alemania. | Arbeitswelt / B110 |
| die Arbeitslosigkeit | di ár-baits-lo-zij-kait | el desempleo / paro | Sustantivo (Fem) | Singular | Die Arbeitslosigkeit ist in dieser Stadt niedrig. | El desempleo es bajo en esta ciudad. | Arbeitswelt / B110 |
| die Arbeitsstelle | di ár-baits-shte-le | el puesto de trabajo | Sustantivo (Fem) | Pl: die Arbeitsstellen | Nach dem Kurs suche ich sofort eine Arbeitsstelle. | Después del curso busco enseguida un puesto de trabajo. | Arbeitswelt / B110 |
| der Azubi / Auszubildende | dea a-tsú-bi | el aprendiz (FP Dual) | Sustantivo (Masc/Fem) | Pl: die Azubis / die Auszubildenden | Im ersten Jahr lernt der Azubi die Grundlagen. | En el primer año el aprendiz aprende los fundamentos. | Arbeitswelt / B17 |
| die Berufserfahrung | di be-rúfs-ea-fa-rung | la experiencia laboral | Sustantivo (Fem) | Pl: die Berufserfahrungen (también en frase de K22) | Ich habe schon zehn Jahre Berufserfahrung. | Ya tengo diez años de experiencia laboral. | Arbeitswelt / A1–A229 |
| jobben | yó-ben | trabajar temporalmente / hacer chapuzas | Verbo regular | jobbt, jobbte, hat gejobbt | In den Ferien jobbt mein Bruder in einem Café. | En vacaciones mi hermano trabaja temporalmente en un café. | Arbeitswelt / B17 |
| der Lehrling | dea lér-ling | el aprendiz (tradicional / A, CH) | Sustantivo (Masc) | Pl: die Lehrlinge | Der Lehrling hilft heute dem Meister. | El aprendiz ayuda hoy al maestro. | Arbeitswelt / B17 |
| die Leistung | di láis-tung | el rendimiento / prestación | Sustantivo (Fem) | Pl: die Leistungen | Ihre Leistung im letzten Projekt war sehr gut. | Su rendimiento en el último proyecto fue muy bueno. | Arbeitswelt / B17 |
| der Leiter / die Leiterin | dea lái-ta | el director / jefe de área | Sustantivo (Masc/Fem) | Pl: die Leiter / \-innen | Unser Projektleiter erklärt heute den Plan. | Nuestro director de proyecto explica hoy el plan. | Arbeitswelt / B17 |
| die Leitung | di lái-tung | la dirección / gerencia | Sustantivo (Fem) | Pl: die Leitungen | Die Leitung der Firma entscheidet morgen. | La dirección de la empresa decide mañana. | Arbeitswelt / B17 |
| der Mitarbeiter / die Mitarbeiterin | dea mít-ar-bai-ta | el colaborador / empleado | Sustantivo (Masc/Fem) | Pl: die Mitarbeiter / \-innen | In der Firma arbeiten siebzig Mitarbeiterinnen und Mitarbeiter. | En la empresa trabajan setenta empleadas y empleados. | Arbeitswelt / A133 |
| die Tätigkeit | di té-tij-kait | la actividad / tarea laboral | Sustantivo (Fem) | Pl: die Tätigkeiten | Beschreiben Sie Ihre beruflichen Tätigkeiten\! | ¡Describa sus actividades profesionales\! | Arbeitswelt / B17 |
| das Team | das tim | el equipo (de trabajo) | Sustantivo (Neutro) | Pl: die Teams | Wir arbeiten jeden Tag gut im Team zusammen. | Trabajamos bien juntos en equipo todos los días. | Arbeitswelt / B17 |
| das Abitur | das a-bi-túr | el bachillerato (acceso universitario) | Sustantivo (Neutro) | Pl: die Abiture (raro) | Nach dem Abitur möchte sie Informatik studieren. | Después del bachillerato quiere estudiar informática. | Schule / B110 |
| die Abbildung | di áp-bil-dung | la ilustración / figura | Sustantivo (Fem) | Pl: die Abbildungen | Sehen Sie sich die Abbildung eins im Buch an\! | ¡Mire la ilustración uno del libro\! | Prüfung / B110 |
| der Abschluss | dea áp-shlus | el título / titulación / cierre | Sustantivo (Masc) | Pl: die Abschlüsse | Mit einem guten Abschluss findet man leichter Arbeit. | Con una buena titulación se encuentra trabajo más fácil. | Schule / B110 |
| die Akademie | di a-ka-de-mí | la academia | Sustantivo (Fem) | Pl: die Akademien | Der Kurs findet in einer technischen Akademie statt. | El curso tiene lugar en una academia técnica. | Bildung / B17 |
| der Antwortbogen | dea ánt-vort-bo-guen | la hoja de respuestas (examen) | Sustantivo (Masc) | Pl: die Antwortbogen / \-bögen | Bitte schreiben Sie die Lösungen auf den Antwortbogen. | Por favor, escriba las soluciones en la hoja de respuestas. | Prüfung / A1–B16 |
| die Aufgabe | di áuf-ga-be | la tarea / ejercicio | Sustantivo (Fem) | Pl: die Aufgaben | Lesen Sie zuerst die Aufgabe drei sorgfältig. | Lea primero con atención el ejercicio tres. | Prüfung / B17 |
| die Aussage | di áus-za-gue | el enunciado / afirmación | Sustantivo (Fem) | Pl: die Aussagen | Welche Aussage zum Text ist richtig, welche falsch? | ¿Qué afirmación sobre el texto es correcta y cuál falsa? | Prüfung / B17 |
| die Berufsschule | di be-rúfs-shu-le | la escuela de formación profesional | Sustantivo (Fem) | Pl: die Berufsschulen | Zweimal pro Woche geht der Azubi in die Berufsschule. | Dos veces por semana va el aprendiz a la escuela de FP. | Bildung / B17 |
| Biologie | bi-o-lo-guí | biología | Sustantivo (Fem) | Sin artículo: Bio | Am Dienstag haben wir um neun Uhr Biologie. | El martes tenemos biología a las nueve. | Schulfächer / A1–B17 |
| Chemie | je-mí / she-mí | química | Sustantivo (Fem) | Sin artículo | In Chemie machen wir heute ein Experiment. | En química hacemos hoy un experimento. | Schulfächer / A1–B16 |
| die Einführung | di áin-fü-rung | la introducción (curso/libro) | Sustantivo (Fem) | Pl: die Einführungen | Die Einführung in die Software dauert zwei Stunden. | La introducción al software dura dos horas. | Prüfung / B110 |
| die Einleitung | di áin-lai-tung | la introducción (texto/discurso) | Sustantivo (Fem) | Pl: die Einleitungen | Eine gute Präsentation beginnt mit einer kurzen Einleitung. | Una buena presentación empieza con una breve introducción. | Prüfung / B17 |
| die Folie | di fó-lie | la diapositiva / lámina | Sustantivo (Fem) | Pl: die Folien | Auf der nächsten Folie sehen Sie die Ergebnisse. | En la siguiente diapositiva ven los resultados. | Prüfung / B17 |
| der Füller | dea fǘ-la | la pluma estilográfica | Sustantivo (Masc) | Pl: die Füller | Das ist kein Bleistift, das ist ein Füller. | Eso no es un lápiz, eso es una pluma. | Schulsachen / A127 |
| Geografie | gue-o-gra-fí | geografía | Sustantivo (Fem) | Sin artículo | In Geografie lernen wir über die Kontinente. | En geografía aprendemos sobre los continentes. | Schulfächer / A1–B16 |
| die Gesamtschule | di gue-zámt-shu-le | el instituto integrado | Sustantivo (Fem) | Pl: die Gesamtschulen | Meine Kinder gehen in eine Gesamtschule. | Mis hijos van a un instituto integrado. | Bildung / B17 |
| Geschichte | gue-shíj-te | historia | Sustantivo (Fem) | Sin artículo como asignatura | Mein Lieblingsfach in der Schule ist Geschichte. | Mi asignatura favorita en el colegio es historia. | Schulfächer / A1–B16 |
| die Grundschule | di grúnt-shu-le | la escuela primaria (6–10 años) | Sustantivo (Fem) | Pl: die Grundschulen | In Deutschland dauert die Grundschule meistens vier Jahre. | En Alemania la escuela primaria dura normalmente cuatro años. | Bildung / B17 |
| das Gymnasium | das güm-ná-zium | el instituto de bachillerato | Sustantivo (Neutro) | Pl: die Gymnasien | Mario geht in das Elsa-Brändström-Gymnasium. | Mario va al instituto Elsa Brändström. | Bildung / A1–B17 |
| die Hauptschule | di jáupt-shu-le | la escuela secundaria básica | Sustantivo (Fem) | Pl: die Hauptschulen | Nach der Grundschule besuchen manche Schüler die Hauptschule. | Tras primaria algunos alumnos asisten a la Hauptschule. | Bildung / B17 |
| das Heft | das jeft | el cuaderno | Sustantivo (Neutro) | Pl: die Hefte | Schreiben Sie den Text bitte sauber ins Heft\! | ¡Escriba el texto limpiamente en el cuaderno, por favor\! | Schulsachen / A121 |
| das Hilfsmittel | das jílfs-mi-tel | el material de apoyo / recurso | Sustantivo (Neutro) | Pl: die Hilfsmittel | In der Prüfung sind keine Hilfsmittel erlaubt. | En el examen no se permiten materiales de apoyo. | Prüfung / B17 |
| die (Fach-)Hochschule | di (fáj-)jój-shu-le | la escuela superior / universidad técnica | Sustantivo (Fem) | Pl: die Hochschulen | Er studiert Elektrotechnik an der Fachhochschule. | Él estudia electrotecnia en la universidad técnica. | Bildung / B17 |
| der Kindergarten | dea kín-da-gar-ten | el jardín de infancia (3–6 años) | Sustantivo (Masc) | Pl: die Kindergärten | Morgens bringe ich meine Tochter in den Kindergarten. | Por la mañana llevo a mi hija al jardín de infancia. | Bildung / A2–B17 |
| die Kindertagesstätte (Kita) | di kí-ta | la guardería infantil | Sustantivo (Fem) | Pl: die Kitas | Wir suchen einen Platz in einer Kita in unserer Nähe. | Buscamos una plaza en una guardería cerca de casa. | Bildung / B17 |
| der Kommentar | dea ko-men-tár | el comentario | Sustantivo (Masc) | Pl: die Kommentare | Schreiben Sie einen kurzen Kommentar zu dem Thema\! | ¡Escriba un breve comentario sobre el tema\! | Prüfung / B17 |
| die Krippe | di krí-pe | la guardería (0–3 años) | Sustantivo (Fem) | Pl: die Krippen | Ab einem Jahr besuchen viele Kinder eine Krippe. | Desde el año de edad muchos niños van a la guardería infantil. | Bildung / B17 |
| der Kuli | dea kú-li | el bolígrafo (coloquial) | Sustantivo (Masc) | Pl: die Kulis | Hast du vielleicht einen Kuli für mich? | ¿Tienes por casualidad un boli para mí? | Schulsachen / A121 |
| Kunst | kunst | arte / educación artística | Sustantivo (Fem) | Sin artículo como asignatura | Am Freitag haben wir zwei Stunden Kunst. | El viernes tenemos dos horas de arte. | Schulfächer / A16 |
| Mathe(matik) | má-te / ma-te-ma-tík | matemáticas | Sustantivo (Fem) | Sin artículo | Mathe finde ich manchmal ein bisschen schwer. | Las matemáticas a veces me parecen un poco difíciles. | Schulfächer / A1–B17 |
| das Modul | das mo-dúl | el módulo (del curso o examen) | Sustantivo (Neutro) | Pl: die Module | Sie hat schon drei Module der Prüfung bestanden. | Ella ya ha aprobado tres módulos del examen. | Prüfung / B17 |
| Philosophie | fi-lo-zo-fí | filosofía | Sustantivo (Fem) | Sin artículo | In der Oberstufe kann man Philosophie wählen. | En los últimos cursos se puede elegir filosofía. | Schulfächer / B17 |
| Physik | fü-zík | física | Sustantivo (Fem) | Sin artículo | Wer Elektronik lernt, braucht gute Kenntnisse in Physik. | Quien estudia electrónica necesita buenos conocimientos de física. | Schulfächer / A1–B16 |
| die Präsentation | di pre-zen-ta-tsión | la presentación (exposición) | Sustantivo (Fem) | Pl: die Präsentationen | Im Teil Sprechen halten Sie eine kurze Präsentation. | En la parte oral hace usted una breve presentación. | Prüfung / B17 |
| der Punkt | dea punkt | el punto (puntuación/tema) | Sustantivo (Masc) | Pl: die Punkte | Wir sprechen zuerst über den ersten Punkt. | Hablamos primero sobre el primer punto. | Prüfung / B17 |
| die Realschule | di re-ál-shu-le | la escuela secundaria intermedia | Sustantivo (Fem) | Pl: die Realschulen | Nach der Realschule machen viele eine Ausbildung. | Tras la Realschule muchos hacen una formación profesional. | Bildung / B17 |
| Religion | re-li-guión | religión (asignatura) | Sustantivo (Fem) | Sin artículo como asignatura | Am Mittwochmorgen haben wir Religion. | El miércoles por la mañana tenemos religión. | Schulfächer / A121 |
| die Rückmeldung | di rǘk-mel-dung | la retroalimentación / confirmación | Sustantivo (Fem) | Pl: die Rückmeldungen | Ich warte noch auf eine Rückmeldung vom Chef. | Todavía espero una respuesta de confirmación del jefe. | Prüfung / B17 |
| die Schere | di shé-re | las tijeras | Sustantivo (Fem) | Pl: die Scheren | Zum Basteln brauche ich Papier und eine Schere. | Para manualidades necesito papel y unas tijeras. | Schulsachen / A127 |
| das Schulfach | das shúl-faj | la asignatura escolar | Sustantivo (Neutro) | Pl: die Schulfächer | Was war früher dein liebstes Schulfach? | ¿Cuál era antes tu asignatura favorita? | Schule / A121 |
| die Schultasche | di shúl-ta-she | la mochila escolar | Sustantivo (Fem) | Pl: die Schultaschen | Die Hefte sind schon in der Schultasche. | Los cuadernos ya están en la mochila escolar. | Schulsachen / A1–A218 |
| die Sonderschule | di zón-da-shu-le | el centro de educación especial | Sustantivo (Fem) | Pl: die Sonderschulen | Sonderschulen fördern Kinder mit besonderem Bedarf. | Los centros especiales apoyan a niños con necesidades específicas. | Bildung / B17 |
| Sozialkunde | zo-tsiál-kun-de | ciencias sociales / cívica | Sustantivo (Fem) | Sin artículo | In Sozialkunde sprechen wir über Politik. | En ciencias sociales hablamos sobre política. | Schulfächer / A16 |
| die Struktur | di shtruk-túr | la estructura | Sustantivo (Fem) | Pl: die Strukturen | Der Satz hat eine klare Struktur. | La oración tiene una estructura clara. | Prüfung / B17 |
| die Stufe | di shtú-fe | el nivel / peldaño | Sustantivo (Fem) | Pl: die Stufen | Der Deutschkurs beginnt auf der Stufe B1. | El curso de alemán empieza en el nivel B1. | Prüfung / B17 |
| das Symbol | das züm-ból | el símbolo | Sustantivo (Neutro) | Pl: die Symbole | Dieses Symbol bedeutet: Fotografieren verboten\! | Este símbolo significa: ¡Prohibido hacer fotos\! | Prüfung / B17 |
| die Tabelle | di ta-bé-le | la tabla / cuadro | Sustantivo (Fem) | Pl: die Tabellen | Ergänzen Sie die fehlenden Wörter in der Tabelle\! | ¡Complete las palabras que faltan en la tabla\! | Prüfung / B17 |
| die Tafel | di tá-fel | la pizarra / tablero | Sustantivo (Fem) | Pl: die Tafeln | Der Lehrer schreibt die neuen Verben an die Tafel. | El profesor escribe los nuevos verbos en la pizarra. | Schule / B17 |
| der Textaufbau | dea tékst-auf-bau | la estructura del texto | Sustantivo (Masc) | Singular | Achten Sie beim Brief auf den richtigen Textaufbau. | Fíjese en la estructura correcta del texto en la carta. | Prüfung / B17 |
| die Volkshochschule (VHS) | di fólks-joj-shu-le | la universidad popular (cursos adultos) | Sustantivo (Fem) | Pl: die Volkshochschulen | Abends besuche ich einen Kurs an der Volkshochschule. | Por la tarde asisto a un curso en la universidad popular. | Bildung / B17 |
| das Wörterbuch | das vö́r-ta-buj | el diccionario | Sustantivo (Neutro) | Pl: die Wörterbücher | Im Unterricht darf ich manchmal das Wörterbuch benutzen. | En clase a veces puedo utilizar el diccionario. | Schulsachen / A29 |

### **Kapitel 17: Digitale Welt & IT (ID interno 17\)**

Advertencia técnica de integridad: debido a que el archivo kapitel17\_raw.js recuperado en las fuentes muestra únicamente 9 de las 50 palabras actuales del capítulo (der Laptop, der Bildschirm, die Tastatur, die Maus, automatisch, manuell, sicher, vernetzt, gesperrt, más el cierre de oración de kabellos)14, es obligatorio ejecutar la validación automática de duplicados (getSafeId) sobre tu src/data/chapters.jsx local antes de insertar estos 29 términos digitales extraídos de Goethe B1 y los manuales de apoyo7.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| der Blog | dea blok | el blog | Sustantivo (Masc) | Pl: die Blogs | Sie schreibt einen Blog über das Leben in Berlin. | Ella escribe un blog sobre la vida en Berlín. | Internet / B17 |
| bloggen | bló-guen | bloguear | Verbo regular | bloggt, bloggte, hat gebloggt | Viele junge Leute bloggen über Reisen und Kochen. | Muchos jóvenes bloguean sobre viajes y cocina. | Internet / B17 |
| der CD-Player | dea tse-dé-pléi-a | el reproductor de CD | Sustantivo (Masc) | Pl: die CD-Player | Im alten Auto ist noch ein CD-Player eingebaut. | En el coche antiguo aún hay un reproductor de CD instalado. | Hardware / B17 |
| der Chat(room) | dea chet(-rum) | el chat / sala de chat | Sustantivo (Masc) | Pl: die Chats | Im Chat tauschen wir Hausaufgaben aus. | En el chat intercambiamos las tareas. | Internet / B17 |
| chatten | ché-ten | chatear | Verbo regular | mit \+ Dat / chattet, chattete, hat gechattet | Abends chatte ich oft mit meiner Familie in España. | Por la noche chateo a menudo con mi familia en España. | Internet / B17 |
| checken | ché-ken | comprobar / revisar | Verbo regular | \+ Akk / checkt, checkte, hat gecheckt | Morgens checke ich zuerst meine E-Mails. | Por la mañana reviso primero mis correos electrónicos. | Software / B17 |
| der Chip | dea chip | el chip / microchip | Sustantivo (Masc) | Pl: die Chips | In jeder neuen Bankkarte sitzt ein kleiner Chip. | En cada tarjeta bancaria nueva hay un pequeño chip. | Hardware / B17 |
| drucken | drú-ken | imprimir | Verbo regular | \+ Akk / druckt, druckte, hat gedruckt (en K22) | Ich kann heute nicht drucken, der Drucker ist kaputt. | Hoy no puedo imprimir, la impresora está estropeada. | Hardware / A2–B110 |
| die DVD | di de-fau-dé | el DVD | Sustantivo (Fem) | Pl: die DVDs | Wir haben diesen alten Film noch auf DVD. | Aún tenemos esta película antigua en DVD. | Hardware / B17 |
| das E-Book | das í-buk | el libro electrónico (archivo) | Sustantivo (Neutro) | Pl: die E-Books | Für den Urlaub lade ich drei E-Books herunter. | Para las vacaciones descargo tres libros electrónicos. | Software / B17 |
| der E-Reader | dea í-ri-da | el lector de libros electrónicos | Sustantivo (Masc) | Pl: die E-Reader | Hast du meinen neuen E-Reader gesehen? | ¿Has visto mi nuevo lector de libros electrónicos? | Hardware / A130 |
| googeln | gú-gueln | buscar en Google | Verbo regular | \+ Akk / googelt, googelte, hat gegoogelt | Wenn ich ein Wort nicht kenne, muss ich es googeln. | Cuando no conozco una palabra, tengo que buscarla en Google. | Internet / B17 |
| die Homepage | di jóum-peich | la página web / sitio oficial | Sustantivo (Fem) | Pl: die Homepages | Alle Öffnungszeiten stehen auf unserer Homepage. | Todos los horarios figuran en nuestra página web. | Internet / B17 |
| der Link | dea link | el enlace / vínculo web | Sustantivo (Masc) | Pl: die Links | Klicken Sie bitte auf den blauen Link in der E-Mail. | Haga clic por favor en el enlace azul del correo. | Internet / B17 |
| live | laif | en directo / en vivo | Adverbio / Adjetivo | Invariable | Wir sehen das Konzert heute Abend live im Internet. | Vemos el concierto esta noche en directo por internet. | Internet / B17 |
| die Mailbox | di méil-boks | el buzón de correo / de voz | Sustantivo (Fem) | Pl: die Mailboxen | Hinterlassen Sie bitte eine Nachricht auf der Mailbox. | Por favor, deje un mensaje en el buzón de voz. | Internet / B17 |
| mailen | méi-len | enviar por correo electrónico | Verbo regular | \+ Dat / mailt, mailte, hat gemailt | Ich maile Ihnen das Formular noch heute Nachmittag. | Le envío por correo el formulario esta misma tarde. | Internet / B17 |
| die Mobilbox | di mo-bíl-boks | el buzón de voz móvil | Sustantivo (Fem) | Pl: die Mobilboxen | Sein Handy ist aus, die Mobilbox geht ran. | Su móvil está apagado, salta el buzón de voz. | Internet / B17 |
| der MP3-Player | dea em-pe-drái-plei-a | el reproductor MP3 | Sustantivo (Masc) | Pl: die MP3-Player | Für die Zugfahrt nehme ich den MP3-Player mit. | Para el viaje en tren me llevo el reproductor MP3. | Hardware / A127 |
| online | ón-lain | en línea / conectado | Adjetivo / Adverbio | Antónimo: offline | Das Ticket kaufe ich heute bequem online. | Compro hoy el billete cómodamente en línea. | Internet / B17 |
| der PC | dea pe-tsé | el ordenador personal (PC) | Sustantivo (Masc) | Pl: die PCs | Im Büro arbeite ich täglich acht Stunden am PC. | En la oficina trabajo ocho horas diarias en el PC. | Hardware / B17 |
| die Plattform | di plát-form | la plataforma (digital) | Sustantivo (Fem) | Pl: die Plattformen | Auf dieser Lernplattform üben wir Vokabeln. | En esta plataforma de aprendizaje practicamos vocabulario. | Software / B17 |
| das Smartphone | das smárt-foun | el teléfono inteligente | Sustantivo (Neutro) | Pl: die Smartphones | Fast jeder nutzt heute eine App auf dem Smartphone. | Casi todo el mundo usa hoy una app en el smartphone. | Hardware / B17 |
| die/das SMS | di/das es-em-és | el mensaje de texto (SMS) | Sustantivo (Fem/Neutro) | Pl: die SMS | Schick mir einfach eine kurze SMS, wenn du ankommst. | Mándame simplemente un SMS corto cuando llegues. | Internet / B17 |
| die Software | di sóft-ver | el software / programa | Sustantivo (Fem) | Pl: die Softwares | Heute installieren wir die neue Software auf dem Laptop. | Hoy instalamos el nuevo software en el portátil. | Software / B17 |
| die Taste | di tás-te | la tecla / pulsador | Sustantivo (Fem) | Pl: die Tasten | Drücken Sie zum Speichern die grüne Taste\! | ¡Pulse la tecla verde para guardar\! | Hardware / B17 |
| der Terminal | dea tér-mi-nal | el terminal / quiosco digital | Sustantivo (Masc) | Pl: die Terminals | Am Terminal im Bahnhof druckt man die Fahrkarte aus. | En el terminal de la estación se imprime el billete. | Hardware / B17 |
| das TV | das te-fáu | la televisión (TV) | Sustantivo (Neutro) | Pl: die TVs | Am Abend schalten wir manchmal das TV ein. | Por la noche encendemos a veces la televisión. | Hardware / B17 |
| twittern | tví-tern | tuitear / publicar en X | Verbo regular | twittert, twitterte, hat getwittert | Viele Journalisten twittern aktuelle Nachrichten. | Muchos periodistas tuitean noticias de actualidad. | Internet / B17 |

### **Kapitel 18: Elektrotechnik & Solar (ID interno 16\)**

Advertencia técnica de integridad: debido a que las líneas centrales de los scripts de inyección de Elektrotechnik & Solar están truncadas en las fuentes disponibles (solo resultan visibles 8 términos: der Strom, die Spannung, der Silberdraht, isolieren, abisolieren, austauschen, einspeisen, funktionieren) y los reportes oscilan entre 50 y 92 entradas para este módulo2, valida estas 12 entradas técnicas de Goethe B1 y DTZ frente a tu archivo local antes de consolidarlas7.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| der Akku | dea á-ku | la batería recargable / acumulador | Sustantivo (Masc) | Pl: die Akkus | Der Akku von meiner Bohrmaschine ist leer. | La batería de mi taladro está descargada. | Energie / B17 |
| der Alarm | dea a-lárm | la alarma | Sustantivo (Masc) | Pl: die Alarme | Bei einem Kurzschluss geht der Alarm los. | Con un cortocircuito salta la alarma. | Sicherheit / B110 |
| die Anlage | di án-la-gue | la instalación / planta (ej. solar) | Sustantivo (Fem) | Pl: die Anlagen | Wir montieren heute eine neue Solaranlage. | Hoy montamos una nueva instalación solar. | Energie / B110 |
| an\|schließen | án-shli-sen | conectar / empalmar / enchufar | Verbo separable irr. | \+ Akk / schließt an, schloss an, hat angeschlossen | Der Elektriker schließt den Wechselrichter an. | El electricista conecta el inversor. | Aktionen / B110 |
| der Anschluss | dea án-shlus | la conexión / toma / enlace | Sustantivo (Masc) | Pl: die Anschlüsse | Für das Haus brauchen wir einen neuen Stromanschluss. | Para la casa necesitamos una nueva conexión eléctrica. | Energie / B110 |
| der Apparat | dea a-pa-rát | el aparato / equipo | Sustantivo (Masc) | Pl: die Apparate | Dieser Apparat misst die Spannung genau. | Este aparato mide la tensión con precisión. | Werkzeug / B110 |
| der Hammer | dea já-ma | el martillo | Sustantivo (Masc) | Pl: die Hämmer | Gib mir bitte den Hammer aus der Werkzeugkiste\! | ¡Pásame el martillo de la caja de herramientas, por favor\! | Werkzeug / B17 |
| die Leiter | di lái-ta | la escalera portátil | Sustantivo (Fem) | Pl: die Leitern (Ojo: der Leiter \= conductor/director) | Für die Arbeit auf dem Dach braucht man eine sichere Leiter. | Para trabajar en el tejado se necesita una escalera segura. | Werkzeug / B17 |
| der Stoff | dea shtof | el material / sustancia / tela | Sustantivo (Masc) | Pl: die Stoffe | Kupfer ist ein sehr guter Stoff für Kabel. | El cobre es un material muy bueno para cables. | Material / B17 |
| die Störung | di shtö́-rung | la avería / perturbación / fallo | Sustantivo (Fem) | Pl: die Störungen | Es gibt eine Störung am Wechselrichter im Keller. | Hay una avería en el inversor del sótano. | Technik / B17 |
| das System | das züs-tém | el sistema | Sustantivo (Neutro) | Pl: die Systeme | Das neue Speichersystem funktioniert automatisch. | El nuevo sistema de almacenamiento funciona automáticamente. | Technik / B17 |
| übertragen | ü-ba-trá-guen | transmitir / transferir (datos/energía) | Verbo inseparable irr. | \+ Akk / überträgt, übertrug, hat übertragen | Die Kabel übertragen den Strom direkt ins Netz. | Los cables transmiten la corriente directo a la red. | Aktionen / B17 |

### **Kapitel 22: Redemittel & Alltagskommunikation (ID interno 22\)**

A partir de las fichas comunicativas de Cornelsen y del curso Einfach los\! alojados en tu Drive, se extraen 6 bloques situacionales que todavía no figuran en las 86 entradas de redemittelBegegnungen.js, listos para integrarse con su propiedad audioDe limpia para lectura por la voz Charon2.

| Alemán | Fonética | Español | Tipo / Gramática | Régimen / Plural | Ejemplo en Alemán | Ejemplo en Español | Categoría App / Nivel |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Wir sagen alle Du, ist das o.k. für dich? / Reden wir uns mit Du an? | via zá-guen á-le du, ist das o-kéi füa dij | Todos nos tuteamos, ¿te parece bien? / ¿Nos tuteamos? | Protocolo Social | Invitación al tuteo laboral | Sagen wir Du? Ich bin Marcos. — Sehr gerne\! | ¿Nos tuteamos? Soy Marcos. — ¡Con mucho gusto\! | 1\. Person & Hobbys (Kap. 1\) / A132 |
| Passt es am Montag um 9:15 Uhr? / Nein, das passt nicht. / Ja, das passt. | past es am món-tak um noin ua fǘnf-tsen | ¿Le/te va bien el lunes a las 9:15? / No, no viene bien. / Sí, viene bien. | Concertar Citas | passen \+ Dativ (es passt mir) | Hast du am Dienstag Zeit? — Ja, das geht und passt gut. | ¿Tienes tiempo el martes? — Sí, va bien y me conviene. | 6\. Telefon, Termine & E-Mail (Kap. 5\) / A134 |
| Um wie viel Uhr fährt die Bahn? — Die Bahn fährt um Viertel nach neun. | um vi fil ua fert di ban | ¿A qué hora sale el tren? — Sale a las nueve y cuarto. | En la Estación | fahren \+ um \+ Uhrzeit | Entschuldigung, wann fährt die Linie 2 ab? — Um 9:18 Uhr. | Disculpe, ¿cuándo sale la línea 2? — A las 9:18 h. | 7\. Wetter, Kleidung & Bahn (Kap. 6\) / A134 |
| Donnerstags gehe ich oft weg, zu Freunden oder um 20:00 Uhr ins Kino. | dónas-taks gué-e ij oft vek | Los jueves salgo a menudo, a casa de amigos o a las 20:00 al cine. | Rutina y Ocio | Adverbio \-s (hábito) \+ weg\|gehen | Ich stehe immer früh auf und gehe donnerstags weg. | Me levanto siempre temprano y salgo los jueves. | 5\. Tagesablauf & IT (Kap. 5\) / A129 |
| Haben Sie eine Krankmeldung? | já-ben zi ái-ne kránk-mel-dung | ¿Tiene usted un parte de baja médica? | Salud Laboral | \+ Akkusativ | Ich habe seit gestern Fieber und brauche eine Krankmeldung. | Tengo fiebre desde ayer y necesito una baja médica. | 9\. Wünsche, Arzt & Kurs (Kap. 8\) / A1–A229 |
| Ich arbeite lieber zu Hause. / Ich habe Berufserfahrung. | ij ár-bai-te lí-ba tsu jáu-ze | Prefiero trabajar en casa. / Tengo experiencia laboral. | Perfil Profesional | Comparativo gern \-\> lieber | In meinem Lebenslauf steht meine ganze Berufserfahrung. | En mi currículum figura toda mi experiencia laboral. | 2\. Büro & Freizeit (Kap. 2\) / A1–A229 |

## **Hoja de Ruta Técnica para Alcanzar el Corpus Completo A1–B1**

Sumar estas 632 entradas verificadas al inventario reportado en tus capítulos temáticos (1.089 a 1.195 términos según las distintas etapas de inyección, sin contar los 86 bloques de Kapitel 22\) sitúa el banco global de la app alrededor de 1.720 a 1.827 términos antes de descontar eventuales coincidencias en los lotes V1, V2, K17 y K182. Para cerrar la brecha restante hasta cubrir íntegramente las aproximadamente 2.400 unidades léxicas del nivel B1 oficial (y acercarte al rango objetivo de 2.500 a 3.000 términos con tu vocabulario técnico solar y automotriz), conviene ejecutar tres pasos operativos en tu entorno local7:

> 1. **Procesamiento íntegro de los PDF oficiales Goethe A2, Goethe B1 y DTZ**: Descarga o extrae desde tu entorno local el texto completo de Goethe-Zertifikat\_A2\_Wortliste.pdf, Goethe-Zertifikat\_B1\_Wortliste.pdf y dtz\_wortliste.pdf —o utiliza el analizador abierto wejn/goethe-b1-wortliste que convierte la lista oficial B1 a CSV— para recuperar los bloques alfabéticos faltantes (B, C, F, G, I, J, K, N–R, U–Z) que no constan completos en los fragmentos disponibles7.  
> 2. **Consolidación de tus manuales internos de Drive**: Completa el volcado de las tablas restantes de Vocabulario 3.0.pdf (que agrupa hasta 150 verbos esenciales además de sus bloques de sustantivos, adjetivos y conectores)20, los tomos complementarios de la serie Vocabulario\_Alemán fuera del rango H–K24 y las secciones A2–B1 de Wortschatz\_A2-C1.pdf, filtrando y excluyendo los ejercicios marcados con el icono de nuez correspondientes al nivel B235.  
> 3. **Deduplicación determinista por AST y Base64 antes de compilar**: Ejecuta un script Node basado en @babel/parser (siguiendo la estructura de merge\_chapters.js)22 que recorra tu src/data/chapters.jsx completo, normalice artículos (der, die, das) y barras separables (\|), compare raíces y genere los identificadores URL-safe getSafeId contra vocabulario\_completo.json1. De ese modo depurarás de forma automática cualquier colisión oculta con los lotes V1/V2, Kapitel 17 y Kapitel 18, manteniendo sincronizados los scripts SQLite (scripts/init\_db.js) y el bundle de producción2.

#### **Obras citadas**

> 1. Codigo.txt, [https\://drive.google.com/open?id=1O5OtAkc7lQwYGvXnzFh4CVQwVBvOxU0E](https://drive.google.com/open?id=1O5OtAkc7lQwYGvXnzFh4CVQwVBvOxU0E)  
> 2. Google Antigravity IDE and Agent Skills Master Guide, uploaded:Google Antigravity IDE and Agent Skills Master Guide  
> 3. vocabulario\_completo.json.txt, [https\://drive.google.com/open?id=1e-kn9BjkO2tHKTTfjKIyhYBzv4Lgpajr](https://drive.google.com/open?id=1e-kn9BjkO2tHKTTfjKIyhYBzv4Lgpajr)  
> 4. reordenar\_capitulos.js, [https\://drive.google.com/open?id=1dqN2LhIs83gK8S1kv3hUqYzMesHdgcY3](https://drive.google.com/open?id=1dqN2LhIs83gK8S1kv3hUqYzMesHdgcY3)  
> 5. GOETHE-ZERTIFIKAT A1 START DEUTSCH 1, [https\://www\.goethe.de/pro/relaunch/prf/de/A1\_SD1\_Wortliste\_02.pdf](https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf)  
> 6. Goethe-Zertifikat A1: Fit in Deutsch 1 \- WORTLISTE, [https\://www\.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat\_A1\_Fit1\_Wortliste.pdf](https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A1_Fit1_Wortliste.pdf)  
> 7. goethe-zertifikat b1 \- deutschprüfung für jugendliche und erwachsene, [https\://www\.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat\_B1\_Wortliste.pdf](https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_B1_Wortliste.pdf)  
> 8. goethe-zertifikat b1 \- deutschprüfung für jugendliche und erwachsene, [https\://www\.goethe.de/pro/relaunch/prf/es/Goethe-Zertifikat\_B1\_Wortliste.pdf](https://www.goethe.de/pro/relaunch/prf/es/Goethe-Zertifikat_B1_Wortliste.pdf)  
> 9. GOETHE-ZERTIFIKAT A2, [https\://www\.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat\_A2\_Wortliste.pdf](https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf)  
> 10. 9.2 ALPHABETISCHE WORTLISTE \- Goethe-Institut, [https\://www\.goethe.de/resources/files/pdf209/dtz\_wortliste.pdf](https://www.goethe.de/resources/files/pdf209/dtz_wortliste.pdf)  
> 11.   
> 12. additions\_only.txt, [https\://drive.google.com/open?id=14oYzJ04Nsej048rVhunnf9F\_5kKkQBO8](https://drive.google.com/open?id=14oYzJ04Nsej048rVhunnf9F_5kKkQBO8)  
> 13. k16\_content\_line\_8607.txt, [https\://drive.google.com/open?id=1noSFDN8HNYyn6vUmkZEk1ewwpKW4pfjV](https://drive.google.com/open?id=1noSFDN8HNYyn6vUmkZEk1ewwpKW4pfjV)  
> 14. kapitel17\_raw.js, [https\://drive.google.com/open?id=1u44M4IR0PSZAoKd\_ZU7zADYqpz1XAzhD](https://drive.google.com/open?id=1u44M4IR0PSZAoKd_ZU7zADYqpz1XAzhD)  
> 15. k16\_content\_line\_9692.txt, [https\://drive.google.com/open?id=171Fc9KI4QetKoHMbza8qp\_BJqd5UdGuz](https://drive.google.com/open?id=171Fc9KI4QetKoHMbza8qp_BJqd5UdGuz)  
> 16. inject\_kapitel16\_restored.js, [https\://drive.google.com/open?id=19Tuhv8dTktBiGrR5np1FhFwIsidxzflL](https://drive.google.com/open?id=19Tuhv8dTktBiGrR5np1FhFwIsidxzflL)  
> 17. [https\://drive.google.com/open?id=191davZ7g5ka4znSenkU4v5FtfuNoxISR](https://drive.google.com/open?id=191davZ7g5ka4znSenkU4v5FtfuNoxISR)  
> 18. GZ A2 Modellsatz 4.9 \- Goethe-Institut, [https\://www\.goethe.de/pro/relaunch/prf/materialien/A2/A2\_Modellsatz\_Erwachsene.pdf](https://www.goethe.de/pro/relaunch/prf/materialien/A2/A2_Modellsatz_Erwachsene.pdf)  
> 19. Tabla Maestra \- El Vehículo y la Conducción.docx, [https\://drive.google.com/open?id=1A9DwDrQmBPBQPsyk5fr4mPDa5vlveEib](https://drive.google.com/open?id=1A9DwDrQmBPBQPsyk5fr4mPDa5vlveEib)  
> 20. Vocabulario 3.0.pdf, [https\://drive.google.com/open?id=1ef1EjlGoalpg-0njnqfgoYIQBGzebn5g](https://drive.google.com/open?id=1ef1EjlGoalpg-0njnqfgoYIQBGzebn5g)  
> 21. KB\_ocr.pdf, [https\://drive.google.com/open?id=1p\_B48dqmhrfwPr6xfOwzosbYXFQUhV2t](https://drive.google.com/open?id=1p_B48dqmhrfwPr6xfOwzosbYXFQUhV2t)  
> 22. merge\_chapters.js, [https\://drive.google.com/open?id=1I55wgGoxNIwvUne1T9WW77Tw211jOwfB](https://drive.google.com/open?id=1I55wgGoxNIwvUne1T9WW77Tw211jOwfB)  
> 23. Dative\_Engineering.pdf, [https\://drive.google.com/open?id=1fWRyKqw5lNNNlh15y2dX6afmwWdIFjP3](https://drive.google.com/open?id=1fWRyKqw5lNNNlh15y2dX6afmwWdIFjP3)  
> 24. 5\. Vocabulario\_Alemán\_H\_K.pdf, [https\://drive.google.com/open?id=1ZvMoGtOt1IJFbIEiPgO\_LL7yOkElfMrz](https://drive.google.com/open?id=1ZvMoGtOt1IJFbIEiPgO_LL7yOkElfMrz)  
> 25. Lösungen\_zu\_KB.pdf, [https\://drive.google.com/open?id=1DqXs6Xt2IvHfzam46WcdEmzcDSIfnmxA](https://drive.google.com/open?id=1DqXs6Xt2IvHfzam46WcdEmzcDSIfnmxA)  
> 26. Intensivtrainer\_ocr.pdf, [https\://drive.google.com/open?id=1zx9qXl39JxtiI0Ez4415vC\_C6\_gvEjw5](https://drive.google.com/open?id=1zx9qXl39JxtiI0Ez4415vC_C6_gvEjw5)  
> 27. Kapitel 3,4,5,6 EFE.pdf, [https\://drive.google.com/open?id=1IZzLiH2gB1z8ooVzm375\_kvPQhFWK79i](https://drive.google.com/open?id=1IZzLiH2gB1z8ooVzm375_kvPQhFWK79i)  
> 28. Deutschunterricht \- Kinder (3).docx, [https\://drive.google.com/open?id=1ClXl0UaVtKClNG0MqSdExR0DdwBmXZQn](https://drive.google.com/open?id=1ClXl0UaVtKClNG0MqSdExR0DdwBmXZQn)  
> 29. Einfach los\! Deutsch für Asylbewerber \- Zum telc Shop, [https\://shop.telc.net/media/catalog/product/file/4001HAA1502Abib.pdf](https://shop.telc.net/media/catalog/product/file/4001HAA1502Abib.pdf)  
> 30. S.218\_3b).pdf, [https\://drive.google.com/open?id=15a5EYbqFOK9AiaKmEmUtn4k8kcM9odtD](https://drive.google.com/open?id=15a5EYbqFOK9AiaKmEmUtn4k8kcM9odtD)  
> 31. Redemittel\_Über Tagesabläufe sprechen.pdf, [https\://drive.google.com/open?id=1b4azZCsntYLXhVy5ViCWCLhhUtN7yC-j](https://drive.google.com/open?id=1b4azZCsntYLXhVy5ViCWCLhhUtN7yC-j)  
> 32. Redemittel\_Das Du anbieten und annehmen.pdf, [https\://drive.google.com/open?id=1alcC7TAOnFMNyYSYnaMQFgg\_deN82F2P](https://drive.google.com/open?id=1alcC7TAOnFMNyYSYnaMQFgg_deN82F2P)  
> 33. Redemittel\_Über eine Firma sprechen.pdf, [https\://drive.google.com/open?id=1skfAosX\_YBC-BHL36VSRYdwrJqkwmDjK](https://drive.google.com/open?id=1skfAosX_YBC-BHL36VSRYdwrJqkwmDjK)  
> 34. Redemittel\_Über die Zeit sprechen.pdf, [https\://drive.google.com/open?id=1YTVbmgdqYX4x2-3w2GI6G9D5QzEXrgAw](https://drive.google.com/open?id=1YTVbmgdqYX4x2-3w2GI6G9D5QzEXrgAw)  
> 35. Wоrtschatz\_A2 \- C1.pdf, [https\://drive.google.com/open?id=1Bs2ZW6h1keCiPhGHXOdPTTkNs6nTG4gk](https://drive.google.com/open?id=1Bs2ZW6h1keCiPhGHXOdPTTkNs6nTG4gk)  
> 36. 9783061220891\_PageplayerInhalte.pdf, [https\://drive.google.com/open?id=1iA9JfsCi2t\_MsDuyZ\_oS-FVn41MzX-cs](https://drive.google.com/open?id=1iA9JfsCi2t_MsDuyZ_oS-FVn41MzX-cs)  
> 37. 20160830\_4003-HAA-1601A\_HF\_Lehrerhandbuch A1 Inhalt.indd, [https\://shop.telc.net/media/catalog/product/file/4/0/4003haa1601abib.pdf](https://shop.telc.net/media/catalog/product/file/4/0/4003haa1601abib.pdf)  
> 38. Goethe-Zertifikat B1 Wortliste to CSV \| HTML \- GitHub, [https\://github.com/wejn/goethe-b1-wortliste](https://github.com/wejn/goethe-b1-wortliste)  
> 39. Vocabulario 3.0.docx, [https\://drive.google.com/open?id=1Yf5NHC7\_2zhskukjoCiKk1K7x0c\_tvwU](https://drive.google.com/open?id=1Yf5NHC7_2zhskukjoCiKk1K7x0c_tvwU)