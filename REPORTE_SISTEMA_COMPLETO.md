# 🔍 REPORTE TÉCNICO, FORENSE Y PEDAGÓGICO INTEGRAL
## DeutschMeister PRO A1 — Estado del Sistema, Arquitectura y Currículo
**Fecha de Auditoría:** 07 de Octubre de 2026  
**Auditor:** Chief Technology Officer (CTO) & Lead Software & Pedagogical Auditor  
**Proyecto:** `DeutschMeister Pro Final` (Capacitor Android + React 19 Vite + Firebase Cloud Functions Node 20)  
**Versión de Vocabulario:** 19 Capítulos Oficiales — 1,195 Términos Lexicales  

---

## 📑 ÍNDICE GENERAL
1. [🤖 Arquitectura de Inteligencia Artificial & Model Engine](#1--arquitectura-de-inteligencia-artificial--model-engine)
2. [📚 Inventario y Arquitectura de Tablas Maestras (Vocabulario)](#2--inventario-y-arquitectura-de-tablas-maestras-vocabulario)
3. [🎓 Plan de Estudio & Clases Magistrales de Gramática (`studyPlanModules`)](#3--plan-de-estudio--clases-magistrales-de-gramática-studyplanmodules)
4. [🏛️ Módulos Oficiales de Preparación Goethe A1 (`goetheModules`)](#4-️-módulos-oficiales-de-preparación-goethe-a1-goethemodules)
5. [👤 Sección de Perfil, Gamificación y Persistencia](#5--sección-de-perfil-gamificación-y-persistencia)
6. [⚠️ Diagnóstico Forense de Oportunidades y Cuellos de Botella](#6-️-diagnóstico-forense-de-oportunidades-y-cuellos-de-botella)

---

## 1. 🤖 ARQUITECTURA DE INTELIGENCIA ARTIFICIAL & MODEL ENGINE

DeutschMeister PRO A1 implementa una infraestructura híbrida FinOps con un **Pool Resiliente de 3 Llaves (Circuit Breaker & Failover Bidireccional)** y contingencia de emergencia hacia modelos Claude y DeepSeek a través de Fal.ai Enterprise.

```
                     ┌──────────────────────────────────────────────┐
                     │          Petición Frontend / Cliente         │
                     └──────────────────────┬───────────────────────┘
                                            │
                                            ▼
                     ┌──────────────────────────────────────────────┐
                     │   Firebase Cloud Functions v2 (Node 20 ESM)  │
                     └──────────────────────┬───────────────────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    ▼                                               ▼
     ┌─────────────────────────────┐                 ┌─────────────────────────────┐
     │  Gemini Resilient Pool      │                 │  Direct Cloud Run SSE       │
     │  1. PAID: gemini-3.8-flash  │                 │  - sendTutorChatMessage     │
     │  2. FREE_1: gemini-3.5-lite │                 │  - runRoleplaySimulator     │
     │  3. FREE_2: gemini-3.5-lite │                 │  - generateStory            │
     └──────────────┬──────────────┘                 └──────────────┬──────────────┘
                    │ (Fallo / 429 / 402)                           │ (Agotamiento)
                    ▼                                               ▼
     ┌─────────────────────────────┐                 ┌─────────────────────────────┐
     │  Fal.ai Enterprise Fallback │                 │  Fal.ai Enterprise Stream   │
     │  - anthropic/claude-haiku   │                 │  - deepseek/deepseek-chat   │
     └─────────────────────────────┘                 └─────────────────────────────┘
```

### 1.1 Tutor IA Socrático (`sendTutorChatMessage`)
- **Punto de Entrada:** `onRequest` (Cloud Run HTTP/2 con streaming Server-Sent Events - SSE).  
  *Endpoint:* `https://sendtutorchatmessage-44keyii6gq-uc.a.run.app`.
- **Modelos Configurados:**
  - *Primario (Paid Tier):* `gemini-3.8-flash` con `thinking_level: "MINIMAL"`.
  - *Secundario (Free Tier 1 y 2):* `gemini-3.5-flash-lite`.
  - *Contingencia Extrema:* `deepseek/deepseek-chat` vía Fal.ai OpenRouter Enterprise.
- **Manejo de Contexto e Historial:**  
  Recibe el array `historialConversacion` con formato estándar Gemini (`role: "user" | "model"`, `parts: [{ text }]`). Separa `history = historial.slice(0, -1)` y `lastMessage = historial[last].parts[0].text`. Al culminar la respuesta, el frontend almacena el hilo en Firestore en `artifacts/deutschmeister-pro/users/${uid}/chat/history`.
- **Protección de Cuota y Control de Acceso:**  
  Verifica el token de autorización Firebase Auth (`Bearer ${idToken}`). Si el usuario no tiene claims de `stripeRole === "premium"` o `pro === true`, aplica un límite estricto de **10 mensajes diarios** registrado en Firestore (`usage/today`).
- **System Prompt Oficial Completo (Inmutable):**
```markdown
=== 1. IDENTIDAD Y ROL ===
Eres 'DeutschMeister Tutor', un profesor de alemán nativo, carismático y experto en pedagogía para adultos hispanohablantes (Nivel A1 - Goethe-Zertifikat). 
Tu esencia es conversacional, cálida y paciente. Tu objetivo no es ser un diccionario ni un solucionador de tareas, sino un guía experto que utiliza el método socrático para ayudar al estudiante a deducir la lógica del idioma por sí mismo.

=== 2. DIRECTRICES PEDAGÓGICAS (GRAMÁTICA Y ESTILO DE EXPLICACIÓN) ===
- Fin de los Tabúes Gramaticales: Trata al estudiante como a un adulto inteligente. Tienes total libertad para usar terminología técnica (sustantivo, verbo, adjetivo, nominativo, acusativo, dativo, género), pero SIEMPRE debes explicarla de manera ultra-sencilla y digerible.
- Analogías Funcionales: Usa trucos mnemotécnicos o metáforas breves de la vida real solo si ayudan a aclarar la regla rápidamente (ej. "el verbo conjugado es el rey y siempre exige el trono de la posición 2"), pero nunca para ocultar el nombre técnico real.
- Scaffolding (Andamiaje Socrático): Nunca le des al alumno la respuesta final de golpe a lo que te está preguntando, pero TAMPOCO lo dejes a la deriva adivinando. Si no sabe algo, explícale la regla usando un *ejemplo paralelo corto* diferente a su duda, para que entienda el mecanismo.

=== 3. MANEJO DE IDIOMAS Y TRADUCCIONES ===
- Artículos Obligatorios: ¡Regla de Oro! Todo sustantivo en alemán que menciones debe presentarse SIEMPRE con su artículo definido y su marca de plural si aplica. Ejemplo: **der Tisch (-e)**. Jamás enseñes sustantivos "desnudos".
- Traducción Inmediata Obligatoria: Toda palabra o frase en alemán debe ir en **negrita** seguida OBLIGATORIAMENTE de su traducción en español entre paréntesis de forma contigua: **haben** (tener). No dejes términos en alemán sin su equivalente adyacente.

=== 4. ESTRUCTURA ESTRICTA (2 PÁRRAFOS) Y REGLAS DE CIERRE ===
- Detección Emocional en Cero Disparos: Si el alumno expresa frustración, desánimo o pánico de examen, valida cálidamente su emoción con empatía (usando 1 o 2 emojis) al iniciar el primer párrafo antes de la explicación. Si su estado es normal, inicia validando su interés de forma inspiradora.
- Regla Inflexible de 2 Párrafos: Tu respuesta debe tener EXACTAMENTE 2 párrafos cortos (entre 6 y 8 oraciones en total). PROHIBIDO generar un tercer párrafo o listas largas desglosadas.
  * Párrafo 1: Validación empática + explicación conceptual o analogía con ejemplo paralelo.
  * Párrafo 2: El Reto Socrático Práctico.
- Prohibición de Preguntas de Permiso o Retóricas: JAMÁS termines preguntando "¿Quieres que veamos un ejemplo?", "¿Te gustaría intentarlo?" o "¿Tiene sentido?". Lanza DIRECTAMENTE el micro-ejercicio para que el estudiante aplique la regla ahora mismo. Cierra SIEMPRE con exactamente UNA sola pregunta o reto activo.
```

---

### 1.2 Simulador de Rol A1 (`runRoleplaySimulator`)
- **Punto de Entrada:** `onRequest` SSE (`https://runroleplaysimulator-44keyii6gq-uc.a.run.app`).
- **Modelo:** `gemini-3.8-flash` (temperatura 0.7) con conmutación a `deepseek-chat`.
- **Fase Pedagógica Previa:** Incluye una pantalla interactiva previa de *Blurting* (Brain Dump) donde el estudiante escribe palabras clave antes de entrar en la conversación.
- **Gamificación:** Bonificación inmediata de `+10 Monedas` por cada turno completado (`awardCoins(10)`).
- **Escenarios Disponibles:**
  1. `restaurant` (🍽️ En el Restaurante): Pedir comida y bebida a un camarero en Múnich.
  2. `station` (🚆 Estación de Tren): Comprar un billete a Fráncfort en la estación de Berlín.
  3. `shopping` (👕 Tienda de Ropa): Comprar una chaqueta en Viena.
  4. `hotel` (🏨 Recepción de Hotel): Check-in y solicitud de llaves en Berlín.
  5. `doctor` (🩺 En el Médico): Expresar síntomas y dolor al médico.
  6. `party` (👋 Fiesta de Intercambio): Presentación informal con un estudiante en Múnich.
- **Directrices de Corrección Implícita:**
  - Máximo estricto de 8 palabras por oración y 2 oraciones por mensaje.
  - Cero monólogos, exactamente una acción o pregunta por turno.
  - Corrección implícita: Si el estudiante dice *"Ich krank bin"*, el modelo responde *"Oh, Sie sind krank? Was fehlt Ihnen?"*, sin salir de su rol.
  - Prohibición absoluta de Markdown (texto plano directo).

---

### 1.3 Evaluador Oficial de Correos Goethe (`evaluateEmail`)
- **Punto de Entrada:** `onCall` (Firebase Functions v2, `maxInstances: 6`).
- **Modelo:** `gemini-3.8-flash` (temperatura 0.3) con fallback a `anthropic/claude-haiku-4.5`.
- **Módulo Examinado:** Goethe-Zertifikat A1 *Start Deutsch 1: Schreiben Teil 2* (Redacción de emails de aprox. 30 palabras).
- **Rúbrica Interna de 4 Dimensiones:**
  1. *Evaluación de los 3 Leitpunkte (Puntos de Contenido):* Cumplido ✅, Parcialmente cumplido ⚠️, o No cumplido ❌. Principio socrático: no penaliza si hubo intento comunicativo comprensible.
  2. *Registro y Formalidad (du vs. Sie):* Verificación del encabezado (*Anrede*) y despedida (*Grußformel*). Regla ortográfica estricta: en alemán las despedidas **no llevan coma**.
  3. *Gramática y Ortografía A1:* Posición del verbo conjugado (V2 o posición final en subordinadas), mayúsculas obligatorias en sustantivos (*Großschreibung*), régimen de casos.
  4. *Conteo de Palabras y Extensión Oficial:* Rango oficial 25–45 palabras (ideal ~30 palabras).
- **Correo Modelo Generado (*Muster-E-Mail*):** Devuelve obligatoriamente un bloque de cita `> [Correo modelo de 25-35 palabras]`, el cual es analizado sintácticamente en el frontend para activar el botón de reproducción de audio nativo con un solo toque.

---

### 1.4 Generador de Cuentos Dinámicos (`generateStory`)
- **Punto de Entrada:** `onRequest` SSE (`https://generatestory-44keyii6gq-uc.a.run.app`, timeout 120s).
- **Modelo:** `gemini-3.8-flash` (modo JSON estructurado, temperatura 0.7).
- **Selección de Vocabulario:** El frontend toma las primeras **8 palabras válidas** (longitud > 2) activas en el capítulo o filtro de categoría visible.
- **Esquema de Salida JSON Obligatorio:**
  ```json
  {
    "titulo": "String",
    "cuento_aleman": "String con palabras clave entre **doble asterisco**",
    "traduccion_espanol": "String",
    "palabras_clave_usadas": [
      { "palabra": "Forma original", "contexto": "Oración completa" }
    ],
    "pregunta_comprension": {
      "pregunta": "Pregunta A1",
      "opciones": ["A", "B", "C"],
      "respuesta_correcta": "Opción exacta"
    }
  }
  ```
- **Sincronización Karaoke (Word Timings):** El frontend (`App.jsx`) calcula el progreso de lectura con un algoritmo ponderado por cantidad de caracteres de cada token y sincroniza la pista de audio con el resaltado en vivo de las palabras.

---

### 1.5 Generador de Comprensión Lectora (`generateReadingTest`)
- **Punto de Entrada:** `onCall` con `SchemaType` tipado estricto.
- **Modelo:** `gemini-3.8-flash`, fallback a `anthropic/claude-haiku-4.5`.
- **Rigor Curricular Goethe A1 (Lesen):**
  - Longitud obligatoria: 100 a 130 palabras en 2 o 3 párrafos usando conectores A1 (`und`, `oder`, `aber`, `denn`, `deshalb`).
  - Prohibición de extracción literal (*Juego de los Espejos*): obliga al estudiante a deducir respuestas mediante sinónimos o antónimos simples (ej. *"nicht teuer"* $\rightarrow$ *"billig"*).
  - Distractores letales: Las 2 opciones incorrectas deben contener términos que sí aparecen en el texto pero pertenecen a otro contexto o sujeto.
  - Incluye retroalimentación concluyente en español explicando el porqué de la opción correcta.

---

### 1.6 Media Engine de Flashcards (`regenerateCardMedia` & `generateCardImage`)
- **Arquitectura de Generación Visual:**
  - *Imágenes Estáticas:* `gemini-3.1-flash-image` (Nano Banana 2) y `fal-ai/flux-2/klein/9b/base` (en `generateCardImage`).
  - *Videos Animados en Bucle:* `gemini-omni-1.1-flash` (360p, 1:1 square aspect ratio, delivery inline).
- **Pipeline de Optimización:**
  - Compresión de imágenes con `sharp`: resolución exacta 512x512 píxeles (`fit: inside, withoutEnlargement: true`), compresión JPEG con `mozjpeg: true`, calidad 80. Peso resultante: **35 a 50 KB**.
  - Extracción recursiva `findVideoInObject`: navega la estructura de respuesta de Google buscando variantes base64 o URIs de descarga directa (`fileData`, `inlineData`, `file_uri`).
- **Diccionario Cinético (`KINETIC_ACTIONS`):**  
  Mapeo precalibrado en inglés para evitar pareidolias, deformaciones y movimientos erráticos:
  - `gehen`: *"walking in place with steady rhythmic steps (treadmill style), swinging arms smoothly, remaining perfectly centered"*.
  - `schlafen`: *"sleeping comfortably curled up on a small clay pillow, gentle rhythmic breathing motion"*.
  - `trinken`: *"holding a small colorful clay mug with both hands and taking cheerful sips in a repeating loop"*.
  - Acciones dinámicas para verbos no listados resueltas a gerundio continuo con encuadre centrado.
- **Política de Privilegios y Entornos:**
  ```javascript
  const isNative = Capacitor.isNativePlatform();
  const isDev = Boolean(import.meta.env.DEV || window.location.hostname === "localhost");
  const canGenerateMedia = isDev || isNative;
  ```
  *Regla de Oro de Seguridad:* En la versión web pública (`deutschmeister-pro.web.app`), la creación y regeneración multimedia está **100% bloqueada** para evitar fugas de cuota. La web opera en modo *Lectura de Caché* consumiendo los archivos persistidos en Firestore (`global_flashcards`) y Cloud Storage (`deutschmeister-audio-vault`).

---

### 1.7 Text-to-Speech (TTS)
- **Motor Primario en la Nube (`synthesizeGermanSpeech`):**
  - `gemini-3.8-flash-tts` vía Google AI Studio Direct API (`responseModalities: ["AUDIO"]`).
  - Voces pedagógicas: `Charon` (masculina, estándar para explicaciones) y `Kore` (femenina).
  - Fallback en la nube: Fal.ai `google/gemini-3.8-flash-tts`.
- **Jerarquía de Caché de Audio:**
  1. *Nivel 1 (0 ms, Offline):* IndexedDB local vía `localforage` (`german_tts_cache`).
  2. *Nivel 2 (Nube):* Firestore `global_audio_pronunciations` (verifica URL no corrupta).
  3. *Nivel 3 (Almacenamiento permanente):* Cloud Storage `deutschmeister-audio-vault/pronunciations/{type}/{id}.wav`.
  4. *Nivel 4 (Dispositivo / Fallback de Emergencia):* `@capacitor-community/text-to-speech` en Android nativo y `Web Speech API` (`window.speechSynthesis`, voz `de-DE`, velocidad 0.85x) en navegadores web.

---

## 2. 📚 INVENTARIO Y ARQUITECTURA DE TABLAS MAESTRAS (VOCABULARIO)

### 2.1 Conteo Global Consolidado
- **Total de Capítulos:** **19 Capítulos**
- **Total de Términos Lexicales:** **1,195 Términos**
- **Nivel del Marco Común:** A1 completo con extensiones de alta frecuencia A2.1.

### 2.2 Tabla Resumen de los 19 Capítulos Oficiales
| ID | Emoji | Título del Capítulo | Cantidad | Subcategorías Identificadas |
|:---:|:---:|---|:---:|---|
| **1** | 🔤 | Kapitel 1: Alphabet & Zahlen | **69** | Alphabet, Zahlen, Ordnungszahlen |
| **2** | ⏰ | Kapitel 2: Zeit & Datum | **66** | Tage, Monate, Jahreszeiten, Tageszeiten, Uhrzeit, Alltag |
| **3** | 👤 | Kapitel 3: Personen & Kontakte | **82** | Identität, Personen, Kontaktdaten, Lebenslauf, Familie, Soziales, Dokumente, Gesellschaft, Gefühle, Behörden |
| **4** | ✨ | Kapitel 4: Basisverben & Adjektive | **131** | Basisverben, Gegensätze, Adjektive, Modalverben, Positionsverben, Alltag, Haushalt, Bewegung, Aktivitäten, Gefühle, Aktionen, Eigenschaften, Kommunikation |
| **5** | ❓ | Kapitel 5: Adverbien & Fragewörter | **33** | Zeitadverbien, Häufigkeit, Ortsadverbien, Gradadverbien, W-Fragen |
| **6** | 🔗 | Kapitel 6: Grammatik: Konnektoren | **50** | Konnektoren, Präpositionen, Wechselpräpositionen, Nebensätze, Partikeln |
| **7** | 🏠 | Kapitel 7: Wohnen | **79** | Gebäude, Mieten, Räume, Aktivitäten, Möbel, Adjektive, Wohnen, Haushalt, Küche |
| **8** | 🍽️ | Kapitel 8: Essen & Trinken | **86** | Mahlzeiten, Gefühle, Lebensmittel, Getränke, Geschirr, Aktionen, Im Restaurant, Kochen, Geschmack, Essen & Trinken, Haushalt |
| **9** | 👕 | Kapitel 9: Kleidung | **32** | Allgemein, Kleidungsstücke, Eigenschaften, Farben, Aktionen, Accessoires |
| **10** | 🛒 | Kapitel 10: Einkaufen | **33** | Orte, Status, Preis, Aktionen, Menge, Bezahlen, Personen, Einkaufen, Supermarkt |
| **11** | ⚛ | Kapitel 11: Freizeit | **61** | Allgemein, Aktivitäten, Gegenstände, Ausgehen, Orte, Adjektive & Gefühle, Soziales, Tiere |
| **12** | ✈️ | Kapitel 12: Reisen & Verkehr | **61** | Reise, Allgemein, Status, Zeit, Tickets, Aktionen, Orientierung, Verkehr, Wetter, Natur |
| **13** | 🚗 | Kapitel 13: Fahrschuldeutsch: Auto | **70** | Teile, Aktionen, Allgemein, Lichter, Verkehr, Flüssigkeiten, Fahrzeuge, Anzeigen |
| **14** | 📮 | Kapitel 14: Post & Bank | **45** | Post, Kommunikation, Bank, Dokumente |
| **15** | 🏥 | Kapitel 15: Gesundheit | **68** | Körper, Krankheit, Kommunikation, Aktionen, Medizin, Körperpflege, Gesundheit |
| **16** | 💼 | Kapitel 16: Schule & Beruf | **81** | Bildung, Personen, Aktionen, Beruf, Büro |
| **17** | 💻 | Kapitel 17: Digitale Welt & IT | **50** | Hardware, Sicherheit, Software, Internet, Eigenschaften, Aktionen |
| **18** | ⚡ | Kapitel 18: Elektrotechnik & Solar | **50** | Elektrizität, Komponenten, Energie, Sicherheit, Solartechnik, Infrastruktur, Installation, Werkzeuge, Beruf, Aktionen |
| **19** | 🧭 | Kapitel 19: Pronomen & Deklinationen | **48** | Personalpronomen (Akk), Personalpronomen (Dat), Possessivartikel, Reflexivpronomen, Demonstrativpronomen, Indefinitpronomen, Fragepronomen |

### 2.3 Esquema de Datos por Tarjeta (`word`)
El análisis del AST revela la siguiente distribución de atributos en los 1,195 términos:
- `de`: **1,195** (100%) — Término en alemán.
- `pron`: **1,195** (100%) — Transcripción fonética en español.
- `es`: **1,195** (100%) — Significado en español.
- `type`: **1,195** (100%) — Tipo morfosintáctico.
- `category`: **1,195** (100%) — Categoría temática para píldoras de filtrado.
- `regimen`: **576** (48.2%) — Régimen verbal, caso exigido (+ Akk, + Dat) o preposicional.
- `plural`: **700** (58.6%) — Terminación de plural (o `"-"` si no aplica).
- `exampleSentenceDe`: **1,145** (95.8%) — Oración contextual en alemán.
- `exampleSentenceEs`: **1,145** (95.8%) — Traducción de la oración de ejemplo.
- `en`: **400** (33.5%) — Prompt en inglés optimizado para generación visual.
- `exampleSentenceDeBlocks`: **0** (0%) — *Hallazgo:* No existen bloques segmentados estáticamente en el código. El componente `DraggableSentenceBuilder` ensambla los bloques en tiempo de ejecución o utiliza oraciones parametrizadas.

---

## 3. 🎓 PLAN DE ESTUDIO & CLASES MAGISTRALES DE GRAMÁTICA (`studyPlanModules`)

El plan curricular consta de **12 Módulos Magistrales** (`sp_1` a `sp_12`), totalizando **45 diapositivas pedagógicas interactivas** con simuladores mecánicos incrustados:

### Inventario de Módulos:
1. **`sp_1` — Capítulo 1: La Célula Sintáctica y Conjugación Regular (4 slides)**
   - *Slide 1:* La Regla de Oro de la Posición 2 (Verb Second - V2).
   - *Slide 2:* El Motor de Conjugación Regular y Cambios Vocálicos ($e \rightarrow i/ie, a \rightarrow ä$).
   - *Slide 3:* Verbos Auxiliares Irregulares Absolutos: *sein* y *haben*.
   - *Slide 4 (Interactivo):* Reto Interactivo: Inversión Sintáctica V2 (sujeto pospuesto ante adverbio temporal inicial).
2. **`sp_2` — Capítulo 2: El Universo del Sustantivo: Géneros, Plurales y Posesivos (4 slides)**
   - *Slide 1:* Tríada Cromática y Pistas Morfológicas de Género (Azul/Der, Rojo/Die, Verde/Das).
   - *Slide 2:* Morfología Temprana del Plural y Precios en A1.
   - *Slide 3:* La Matriz de Clones de *ein* (Pronombres Posesivos: mein, dein, sein, ihr).
   - *Slide 4 (Interactivo):* Reto Interactivo: Escudo de Posesivos y Género.
3. **`sp_3` — Capítulo 3: Negación Integral y la Arquitectura del Tiempo (4 slides)**
   - *Slide 1:* La Frontera de la Negación: *kein* (sustantivos indeterminados) vs. *nicht* (verbos, adjetivos, sustantivos determinados).
   - *Slide 2:* El Cronómetro Alemán: Hora Formal (digital 24h) vs. Informal (*vor*, *nach*, *halb*).
   - *Slide 3:* Tríada Preposicional Temporal: *um* (hora exacta), *am* (días/momentos), *im* (meses/estaciones).
   - *Slide 4 (Interactivo):* Simulador Interactivo: El Reloj Alemán (`ClockSVG.jsx`).
4. **`sp_4` — Capítulo 4: El Objeto Directo: Acusativo y Pronombres (4 slides)**
   - *Slide 1:* El Filtro Masculino: La Regla de la N-Mutation ($der \rightarrow den, ein \rightarrow einen$).
   - *Slide 2:* Pronombres Personales de Objeto Directo (*mich, dich, ihn, sie, es, uns, euch, sie/Sie*).
   - *Slide 3:* Verbos Transitivos y Preposiciones Puras de Acusativo (*durch, für, gegen, ohne, um* - DOGFU).
   - *Slide 4 (Interactivo):* Reto Interactivo: `AccusativeShield.jsx` y `AccusativeCards.jsx`.
5. **`sp_5` — Capítulo 5: El Objeto Indirecto: Dativo y el Código M-R-M-N (4 slides)**
   - *Slide 1:* El Código Mnemotécnico M-R-M-N (*MaRiMaNa*: dem, der, dem, den + n).
   - *Slide 2:* Pronombres de Receptor (*mir, dir, ihm, ihr, ihm, uns, euch, ihnen/Ihnen*).
   - *Slide 3:* Preposiciones Fijas de Dativo (*aus, bei, mit, nach, seit, von, zu*) y Contracciones de Dirección (*zum, zur, beim, vom*).
   - *Slide 4 (Interactivo):* Selector Interactivo: Matriz M-R-M-N.
6. **`sp_6` — Capítulo 6: El Mapa Espacial: Wechselpräpositionen (4 slides)**
   - *Slide 1:* La Ecuación del Espacio: ¿Wo? (Posición estática $\rightarrow$ Dativo) vs. ¿Wohin? (Desplazamiento $\rightarrow$ Acusativo).
   - *Slide 2:* Parejas Verbales: Estado vs. Acción de Colocar (*liegen/legen*, *stehen/stellen*, *sitzen/setzen*, *hängen*).
   - *Slide 3:* Contracciones Nativas Indispensables de A1 (*ins, ans, im, am*).
   - *Slide 4 (Interactivo):* Simulador 3D: Mapa Locativo Interactivo (`LocativeMapSimulator.jsx` y `LocativeEquationCards.jsx`).
7. **`sp_7` — Capítulo 7: Verbos Separables e Inseparables: La Pinza (3 slides)**
   - *Slide 1:* El Efecto Pinza Verbal (*Satzklammer*): Raíz conjugada en Posición 2, prefijo separable catapultado al final absoluto.
   - *Slide 2:* El Escudo Inseparable: Prefijos que JAMÁS se Rompen (*be-, ge-, er-, ver-, zer-, ent-, emp-, miss-*).
   - *Slide 3 (Interactivo):* Interruptor Mecánico: Separable vs. Inseparable (`PincerSwitch.jsx`).
8. **`sp_8` — Capítulo 8: Verbos Modales y el Sándwich Estructurado (3 slides)**
   - *Slide 1:* Los 5 Modales de A1 (*können, müssen, wollen, dürfen, sollen*) + fórmula de deseo *möchten*.
   - *Slide 2:* La Anomalía Fonética del Singular (pérdida de Umlaut y 1ª/3ª persona idénticas sin terminación).
   - *Slide 3 (Interactivo):* Tablero de Control: El Sándwich Modal (Modal en Posición 2, Infinitivo en última posición).
9. **`sp_9` — Capítulo 9: El Modo Imperativo y Kit de Comunicación Oficial (4 slides)**
   - *Slide 1:* La Tríada Sintáctica del Imperativo (*du*, *ihr*, *Sie*).
   - *Slide 2:* Excepciones Críticas y Mutaciones Vocálicas ($e \rightarrow i$, caída de terminación *-st*).
   - *Slide 3:* Kit de Redacción y Fórmulas de Cortesía para el Examen Goethe.
   - *Slide 4 (Interactivo):* Simulador de Voz: Comandos e Instrucciones Oficiales (`VoiceExaminer.jsx`).
10. **`sp_10` — Capítulo 10: Das Perfekt y los Tiempos Pasados Clave (4 slides)**
    - *Slide 1:* Estructura de Dos Pilares: Auxiliar en Posición 2 + *Partizip II* al final.
    - *Slide 2:* Matriz de Selección: ¿Haben o Sein? (*sein* para movimiento direccional o cambio de estado; *haben* para el resto).
    - *Slide 3:* El Pasado de Auxiliares: *Präteritum* de *sein* (*war*) y *haben* (*hatte*).
    - *Slide 4 (Interactivo):* Línea de Tiempo Cinemática: Presente a Pasado (`MechanicalTimeline.jsx`).
11. **`sp_11` — Capítulo 11: Coordinación de Textos: Conectores Posición 0 y 1 (4 slides)**
    - *Slide 1:* Zona Libre: Conectores Fantasma Posición 0 (*ADUSO: aber, denn, und, sondern, oder* - no alteran la posición del verbo).
    - *Slide 2:* Conectores Adverbiales de Posición 1 (*dann, deshalb* - exigen inversión inmediata del verbo en Posición 2).
    - *Slide 3:* Kit de Redacción A1 para el Examen Goethe (*Schreiben*).
    - *Slide 4 (Interactivo):* Reto Interactivo: Constructor de Oraciones Compuestas (`SyntaxFlow.jsx`).
12. **`sp_12` — Capítulo 12: Declinación de Adjetivos en A1: Débil y Mixta (4 slides)**
    - *Slide 1:* Declinación Débil (tras artículo determinado: *der, die, das*).
    - *Slide 2:* Declinación Mixta (tras *ein, kein* y posesivos: *mein, dein...*).
    - *Slide 3:* Atajos de Examen Goethe A1 y La Trampa Predicativa (adjetivos tras *sein* nunca se declinan).
    - *Slide 4 (Interactivo):* Evaluador en Vivo: Declinación de Adjetivos (`LiveEvaluator.jsx`).

---

## 4. 🏛️ MÓDULOS OFICIALES DE PREPARACIÓN GOETHE A1 (`goetheModules`)

El sistema cuenta con **4 Módulos de Especialización** alineados con los 4 componentes del examen oficial *Goethe-Zertifikat A1: Start Deutsch 1*:

### 4.1 Hören (Comprensión Auditiva — `g_horen`, 5 slides)
- **Estructura y Estrategia:**
  - *Teil 1:* Conversaciones cotidianas cortas (se escuchan 2 veces).
  - *Teil 2:* Anuncios por megafonía en estaciones y aeropuertos (se escuchan 1 sola vez).
  - *Teil 3:* Mensajes telefónicos automáticos y buzones de voz (se escuchan 2 veces).
- **Componentes Didácticos Incrustados:**
  - *Kit de Vocabulario Auditivo:* Glosario de términos de estaciones, vías (*Gleis*), retrasos (*Verspätung*) y números de vuelo.
  - *Clase Magistral de Fonética:* Diferenciación auditiva de pares mínimos ($ie$ vs. $ei$, $ch$ blando vs. duro).
  - *Simuladores Interactivos:* `AcousticRadar.jsx` en dos modalidades:
    1. Anuncios de estaciones ferroviarias.
    2. Compras, ofertas y precios en supermercados.

### 4.2 Lesen (Comprensión Lectora — `g_lesen`, 6 slides)
- **Estructura:**
  - *Teil 1:* Notas personales y correos electrónicos informales.
  - *Teil 2:* Búsqueda de información en sitios web y tablones de anuncios.
  - *Teil 3:* Carteles públicos, normas y letreros de tiendas (*Drücken / Ziehen, Notausgang*).
- **Herramientas Pedagógicas:**
  - *Kit de Lupa:* Identificación visual rápida de palabras clave antes de leer el cuerpo del texto.
  - *El Juego de los Espejos:* Entrenamiento para detectar sinónimos y antónimos como distractores de examen.
  - *La Regla del Tren:* Técnica de barrido visual de conectores y núcleos nominales.

### 4.3 Schreiben (Expresión Escrita — `g_schreiben`, 6 slides)
- **Estructura Oficial:**
  - *Teil 1 (Formularios):* Completar los 5 campos en blanco de un formulario oficial a partir de un texto breve.
  - *Teil 2 (Redacción):* Redactar un email de aprox. 30 palabras cubriendo los 3 *Leitpunkte*.
- **Módulos de Práctica Interactiva:**
  - *El Arte del Formulario:* Simulador de formulario oficial interactivo (`OfficialFormExam.jsx` y `FormularBuilder.jsx`) con validación inmediata de campos de fecha de nacimiento, código postal (*PLZ*), firma y número de personas.
  - *Caja de Herramientas (*Redemittel*):* Plantillas memorizables para saludos y despedidas formales e informales.
  - *Simulador de Redacción:* Vinculado directamente con el `EmailSimulator.jsx` para feedback con IA.

### 4.4 Sprechen (Expresión Oral — `g_sprechen`, 2 slides)
- **Estructura Oficial:**
  - *Teil 1:* Presentación personal (Nombre, Edad, País, Residencia, Idiomas, Profesión, Hobby) y deletreo (*Buchstabieren*) de apellido o número telefónico.
  - *Teil 2:* Formular y responder preguntas sobre temas cotidianos con tarjetas de palabras clave (*Thema + Wort*).
  - *Teil 3:* Formular peticiones educadas o imperativos a partir de tarjetas con imágenes de objetos cotidianos.
- **Simulador Interactivo:**
  - `VoiceExaminer.jsx` con reconocimiento de voz activo vía Web Speech API / Capacitor Speech Recognition para evaluar pronunciación y velocidad.

---

## 5. 👤 SECCIÓN DE PERFIL, GAMIFICACIÓN Y PERSISTENCIA

### 5.1 Métricas del Estudiante y Economía de Monedas
- **Sistema de Monedas (*DeutschCoins*):**
  - Recompensa al escuchar audios de vocabulario: `+1 moneda` (`awardCoins(1)`).
  - Recompensa por turno de rol completado: `+10 monedas` (`awardCoins(10)`).
  - Despacho de eventos reactivos `window.dispatchEvent(new Event('coinsUpdated'))` para mantener sincronizada la interfaz.
  - Pistas en el *Quiz Dinámico* (eliminación 50/50): costo de `10 monedas` (`spendCoins(10)`).
  - Pistas en el *Draggable Sentence Builder*: costo de `10 monedas` para auto-posicionar el sujeto.
- **Control de Racha (*Streak*):**
  - Doble persistencia en `localStorage` (`dm_quiz_streak`) y `localforage` (`dm_user_streak`).
  - Registro de récord personal en `dm_quiz_best_streak`.

### 5.2 Arquitectura de Persistencia Multicapa
```
┌────────────────────────────────────────────────────────────────────────┐
│                              CAPAS DE DATOS                             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. LOCALSTORAGE:                                                       │
│    - 'deutschmeister_unlocked' (objeto clave-valor de tarjetas vistas) │
│    - 'dm_user_avatar' (avatar elegido: 🦊, 🦉, 🐼, etc.)               │
│    - 'dm_voice_speed' (velocidad de voz: 0.7x, 0.85x, 1.0x)            │
│    - 'dm_quiz_streak' / 'dm_quiz_best_streak'                          │
│                                                                        │
│ 2. INDEXEDDB (localforage):                                            │
│    - 'dm_user_coins' (saldo de monedas)                                │
│    - 'dm_user_streak' (racha sincronizada)                             │
│    - 'img_${safeId}' (URLs o base64 de imágenes de flashcards)         │
│    - 'german_tts_cache' (Blobs de audio WAV/MP3 precargados offline)   │
│                                                                        │
│ 3. CLOUD FIRESTORE:                                                    │
│    - artifacts/deutschmeister-pro/users/${uid}/unlockedCards           │
│    - artifacts/deutschmeister-pro/users/${uid}/chat/history            │
│    - artifacts/deutschmeister-pro/users/${uid}/usage/today             │
│    - global_flashcards/${safeId} (catálogo global compartido)          │
│    - global_audio_pronunciations/${audioId} (audios compartidos)       │
│                                                                        │
│ 4. CLOUD STORAGE:                                                      │
│    - deutschmeister-audio-vault/flashcards/images/                     │
│    - deutschmeister-audio-vault/flashcards/videos/                     │
│    - deutschmeister-audio-vault/pronunciations/{vocab|sentence}/       │
└────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Manejo Offline y Autenticación
- **Inicio de Sesión Silencioso:** `App.jsx` ejecuta `signInAnonymously(auth)` automáticamente al montar la aplicación si no hay un usuario autenticado. El usuario puede utilizar la app en modo offline o sin registro.
- **Sincronización en la Nube:** Desde `Profile.jsx`, el usuario puede vincular su cuenta anónima con correo y contraseña (`linkWithCredential`) para persistir su progreso al cambiar de dispositivo.

### 5.4 Monetización y Acceso
- **Paywall & Banners:** Los componentes `PaywallOverlay.jsx`, `BannerAd.jsx` y el servicio `AdService.js` están actualmente **neutralizados / configurados en modo Premium Total** (`return null` / `return true`), brindando acceso irrestricto a los 19 capítulos y todas las herramientas interactivas.

---

## 6. ⚠️ DIAGNÓSTICO FORENSE DE OPORTUNIDADES Y CUELLOS DE BOTELLA

Tras la inspección minuciosa de cada línea de código, se han detectado los siguientes hallazgos técnicos que deben priorizarse en la siguiente fase de desarrollo:

### 🔴 6.1 Dependencias Backend Innecesarias en el Frontend (`package.json`)
- **`firebase-admin` (^14.1.0):** Está instalado en las dependencias del frontend (`package.json` de la raíz). Es una librería exclusiva de Node.js que no debe estar en el cliente web/móvil. Aunque Vite la excluye del empaquetado del navegador, añade peso al árbol de dependencias local.
- **`sqlite3` (^6.0.1):** Dependencia con binarios C++ compilados nativamente presente en el frontend. Es completamente inoperante en el navegador y puede causar advertencias en despliegues CI/CD.
- **`@fal-ai/serverless-client` (^0.15.0) y `@fal-ai/client` (^1.10.1):** Duplicados en las dependencias del cliente mientras que todas las invocaciones a Fal.ai se ejecutan actualmente de forma segura desde las Cloud Functions de backend.
- **`jimp` (^0.16.13):** Presente en `devDependencies` del frontend sin uso en la compilación web.

### 🟡 6.2 Desincronización en Conteo de Tarjetas en `src/App.jsx`
- En `src/App.jsx` (línea 940), el componente de perfil se renderiza con:
  ```jsx
  <Profile
    ...
    totalCardsCount={1089}
  />
  ```
  *Impacto:* Dado que el vocabulario oficial ahora cuenta con **1,195 términos** tras la inyección de los capítulos 18 y 19, el indicador de porcentaje de progreso en la pantalla de perfil está calculándose sobre una base antigua de 1,089 palabras.  
  *Recomendación:* Pasar dinámicamente `totalCardsCount={chapters.reduce((acc, c) => acc + c.words.length, 0)}`.

### 🟡 6.3 URLs Fijas de Cloud Run en el Código de Frontend
- En `src/App.jsx` y `src/components/RoleplaySimulator.jsx`, las llamadas de streaming apuntan a URLs hardcodeadas con el hash de servicio de Cloud Run:
  - `https://sendtutorchatmessage-44keyii6gq-uc.a.run.app`
  - `https://runroleplaysimulator-44keyii6gq-uc.a.run.app`
  - `https://generatestory-44keyii6gq-uc.a.run.app`
  *Riesgo:* Si se cambia la región de despliegue de las Cloud Functions o se recrea el proyecto Firebase, estas URLs quedarán obsoletas. Se recomienda parametrizarlas a través de `import.meta.env.VITE_CLOUD_RUN_BASE_URL`.

### 🟡 6.4 Ausencia de Bloques Estáticos en `exampleSentenceDeBlocks`
- El 100% de los términos (1,195) tiene `exampleSentenceDeBlocks: undefined`.
- Aunque 1,145 palabras cuentan con `exampleSentenceDe` completa y funcional, el minijuego de reconstrucción de oraciones en el reverso de la tarjeta depende de segmentar la oración en tiempo real o queda limitado. Generar un script de pre-segmentación aumentaría la reactividad y la consistencia didáctica de los bloques.

### 🟢 6.5 Buenas Prácticas y Puntos Fuertes Identificados
- **Zero-Latency Audio Cache:** El sistema de caché multinivel de audio (IndexedDB $\rightarrow$ Cloud Firestore $\rightarrow$ Storage $\rightarrow$ Web Speech) permite que palabras ya reproducidas suenen instantáneamente en menos de 10 ms sin consumir ancho de banda ni cuotas de IA.
- **Seguridad en Media Engine:** El candado de entorno (`isDev || isNative`) protege eficazmente el presupuesto de Google Cloud y Fal.ai al prohibir la generación pesada en la web abierta.
- **Resiliencia Multi-Key:** La arquitectura del pool de Gemini con conmutación por Circuit Breaker garantiza una disponibilidad de casi el 100% frente a saturaciones de cuota (429) o tarjetas de crédito vencidas.

---
**Fin del Reporte Técnico de Auditoría.**  
*Aprobado por el Chief Technology Officer (CTO) para DeutschMeister PRO A1.*
