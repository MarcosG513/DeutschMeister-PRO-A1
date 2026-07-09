import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAICacheManager } from "@google/generative-ai/server";
import { fal } from "@fal-ai/client";

// Inicializa Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Define los secretos que se tomarán de Secret Manager (FASE 1)
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const falKey = defineSecret("FAL_KEY");
const geminiFreeKey = defineSecret("GEMINI_FREE_KEY");

/**
 * Función auxiliar para obtener los prompts desde Firestore (FASE 2)
 */
async function getSystemPrompt(promptId, defaultPrompt) {
  try {
    const docRef = db.collection("config").doc("system_prompts");
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data[promptId]) {
        return data[promptId];
      }
    }
  } catch (error) {
    console.error("Error obteniendo system prompt desde Firestore, usando fallback:", error);
  }
  return defaultPrompt;
}

// =========================================================================
// 1. SIMULADOR DE ROL A1 (RoleplaySimulator)
// Modelo: Gemini 2.5 Flash
// =========================================================================
export const runRoleplaySimulator = onRequest(
  { secrets: [geminiFreeKey, geminiApiKey], cors: true },
  async (req, res) => {
    if (req.method !== "POST" && req.method !== "OPTIONS") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    let data;
    try {
      data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (data && data.data) data = data.data;
    } catch (e) {
      res.status(400).send("Invalid JSON body");
      return;
    }

    const { historialConversacion, escenario } = data || {};

    if (!historialConversacion || !escenario) {
      res.status(400).send("Faltan parámetros requeridos: historialConversacion o escenario");
      return;
    }

    const defaultSystemInstruction = `
      Eres un compañero de juego de rol en alemán. Actúa siempre dentro de tu personaje.
      Escenario actual: "${escenario}".

      REGLAS ESTRICTAS DE COMPORTAMIENTO:
      1. Inmersión y Nivel A1 ESTRICTO: Habla SOLO en alemán nivel A1. Usa oraciones cortas de MÁXIMO 8 palabras.
      2. Ping-pong interactivo: Haz SOLO UNA pregunta corta a la vez para mantener el diálogo dinámico como un ping-pong.
      3. PROHIBICIÓN ABSOLUTA: Nunca uses formato Markdown, negritas ni asteriscos (**) en tus respuestas. 
      4. El Salvavidas (Ayuda a demanda): Si el usuario escribe que no entiende (ej. "No entiendo", "¿Qué significa eso?", "Ich verstehe nicht"), explica brevemente en español la última frase, dale una pista de cómo responder, y formúlale de nuevo la pregunta en alemán.
    `;

    const systemInstruction = await getSystemPrompt("roleplay_simulator", defaultSystemInstruction);

    const generarRespuesta = async (apiKeyStr) => {
      const genAI = new GoogleGenerativeAI(apiKeyStr);
      const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
        systemInstruction: systemInstruction.replace("${escenario}", escenario)
      });

      let validHistory = historialConversacion.slice(0, -1);
      if (validHistory.length > 0 && validHistory[0].role !== "user") {
        validHistory.shift();
      }

      const chat = model.startChat({
        history: validHistory,
      });

      const ultimoMensaje = historialConversacion[historialConversacion.length - 1].parts[0].text;
      const resultStream = await chat.sendMessageStream(ultimoMensaje);

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of resultStream.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          const cleanedChunk = chunkText.replace(/\*\*/g, '');
          res.write(`data: ${JSON.stringify({ text: cleanedChunk })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    };

    try {
      await generarRespuesta(geminiFreeKey.value());
    } catch (error) {
      console.error("Error al intentar responder con la llave gratuita en Roleplay:", error);
      const isQuotaError =
        error.status === 429 ||
        (error.message && (error.message.includes("429") || error.message.toLowerCase().includes("quota")));

      if (isQuotaError && geminiApiKey.value()) {
        console.warn("Cuota gratuita agotada en Roleplay. Activando fallback a llave de pago...");
        try {
          await generarRespuesta(geminiApiKey.value());
        } catch (fallbackError) {
          console.error("Error crítico en la llave de pago de fallback (Roleplay):", fallbackError);
          if (!res.headersSent) {
            res.status(500).send("Error en los servidores de IA de respaldo.");
          } else {
            res.end();
          }
        }
      } else {
        if (!res.headersSent) {
          res.status(500).send("Error comunicando con el Simulador de Rol.");
        } else {
          res.end();
        }
      }
    }
  }
);

// =========================================================================
// 2. EVALUADOR DE CORREOS (EmailSimulator)
// =========================================================================
export const evaluateEmail = onCall(
  { secrets: [falKey], maxInstances: 6 },
  async (request) => {
    const { textoCorreo, consignaExamen } = request.data;

    if (!textoCorreo || !consignaExamen) {
      throw new HttpsError("invalid-argument", "Faltan parámetros requeridos");
    }

    try {
      fal.config({ credentials: falKey.value() });

      const promptDefinido = `
      Consigna del examen: "${consignaExamen}"
      Texto escrito por el estudiante: "${textoCorreo}"

      Actúa como un profesor de alemán nativo, pero experto en enseñar a hispanohablantes. Tu objetivo es que el estudiante APRENDA de sus errores, no solo corregirlos.
      
      REGLAS DE ORO PEDAGÓGICAS:
      1. DIRÍGETE AL ESTUDIANTE DE "TÚ", con un tono empático pero muy exigente.
      2. DEBES detectar errores de interferencia del español (como traducir literalmente "estoy escribiendo" a "ich bin schreiben"). Explica por qué eso no funciona en alemán.
      3. RESALTA SIEMPRE las palabras exactas del estudiante en **negrita** cuando hables de sus errores.
      4. Si el estudiante se equivoca de registro (usa "Ihnen/Sie" con un amigo, o "dir/du" con una autoridad), corrígelo implacablemente.

      Estructura tu respuesta ESTRICTAMENTE en Markdown usando estas 4 secciones:

      ### 📊 Evaluación General
      Da un puntaje del 1 al 100%. Usa una lista con emojis (✅, ⚠️, ❌) para evaluar punto por punto si cumplió la consigna, la longitud y el saludo/despedida correcto.

      ### 🔬 Análisis Quirúrgico de tus Errores
      NO des un párrafo aburrido. Genera una TABLA en Markdown con 3 columnas:
      | **Lo que escribiste** | **Corrección** | **Explicación de la Regla** |
      Analiza cada error (gramática, vocabulario, registro o posición del verbo). Cita las palabras del estudiante en **negrita**.

      ### 💡 Ejemplos Útiles para ti
      Basado en lo que el estudiante intentó decir, dale 2 ejemplos cortos en alemán y español de cómo se usa correctamente esa estructura en un contexto similar.

      ### ✨ Modelo Ideal (Musterlösung)
      Escribe un correo perfecto de nivel A1 que responda a la consigna, dirigido exactamente a la persona correcta, con la traducción al español debajo.
      `;

      // Se utiliza DeepSeek V4-Flash vía OpenRouter para máxima costo-efectividad pedagógica
      const result = await fal.subscribe("openrouter/router", {
        input: {
          model: "deepseek/deepseek-v4-flash",
          prompt: promptDefinido,
          system_prompt: "Eres un examinador estricto pero empático, metodológico y preciso de alemán nativo.",
          temperature: 0.2,
          top_p: 0.9
        }
      });

      return { output: result.data.output };
    } catch (error) {
      console.error("Error en evaluateEmail:", error);
      throw new HttpsError("internal", "Error al procesar la evaluación de correo", error.message);
    }
  }
);

// =========================================================================
// 3. GENERADOR DE CUENTOS (generateStory) - AO Circuit Breaker (Free -> Paid)
// =========================================================================
export const generateStory = onRequest(
  { secrets: [geminiFreeKey, geminiApiKey], cors: true },
  async (req, res) => {
    // Manejo manual de CORS por seguridad en SSE
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.status(204).send("");
      return;
    }
    
    res.set("Access-Control-Allow-Origin", "*");

    try {
      // Compatibilidad con fetch nativo o httpsCallable del frontend
      const bodyData = req.body.data || req.body;
      const { palabrasVocabulario } = bodyData;

      if (!palabrasVocabulario || !Array.isArray(palabrasVocabulario)) {
        res.status(400).json({ error: "Faltan parámetros requeridos: palabrasVocabulario" });
        return;
      }

      const listaPalabras = palabrasVocabulario.join(", ");
      
      const promptSistema = "Eres un creador de cuentos infantiles y profesor de alemán nivel A1. Tu objetivo es escribir historias coherentes, inmersivas y gramaticalmente perfectas integrando vocabulario específico.";
      
      const promptDefinido = `Genera un micro-cuento interactivo en alemán nivel A1 que integre obligatoriamente estas palabras: [${listaPalabras}].
      En el campo "cuento_aleman", debes envolver obligatoriamente cada una de estas palabras clave de vocabulario [${listaPalabras}] con doble asterisco "**" (ej. **palabra**) cada vez que las uses en el texto para que resalten.
      La salida debe coincidir EXACTAMENTE con este esquema JSON, sin texto adicional:
      {
        "titulo": "Título en alemán",
        "cuento_aleman": "El microcuento en alemán...",
        "traduccion_espanol": "Traducción fluida al español",
        "palabras_clave_usadas": [ { "palabra": "Palabra", "contexto": "Oración donde se usó" } ],
        "pregunta_comprension": {
           "pregunta": "Pregunta corta",
           "opciones": ["Opción A", "Opción B", "Opción C"],
           "respuesta_correcta": "La opción correcta exacta"
        }
      }`;

      const generationConfig = { responseMimeType: "application/json", temperature: 0.7 };

      // AO: Orquestador del Pre-fetch (Circuit Breaker)
      const initStream = async (apiKeySecret) => {
        const genAI = new GoogleGenerativeAI(apiKeySecret.value());
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash", systemInstruction: promptSistema, generationConfig });
        const streamResult = await model.generateContentStream(promptDefinido);
        const iterator = streamResult.stream[Symbol.asyncIterator]();
        const firstChunk = await iterator.next(); // <- PRE-FETCH CRÍTICO
        return { iterator, firstChunk };
      };

      let activeIterator, firstChunk;

      try {
        // Intento 1: Capa Gratuita (Límite 15 RPM)
        console.log("AO: Iniciando Intento 1 con GEMINI_FREE_KEY...");
        const result = await initStream(geminiFreeKey);
        activeIterator = result.iterator;
        firstChunk = result.firstChunk;
      } catch (err1) {
        console.warn("AO: Falló la Capa Gratuita. Iniciando Fallback a Facturación...", err1.message);
        // Intento 2: Capa de Facturación (Sin límite)
        const result = await initStream(geminiApiKey);
        activeIterator = result.iterator;
        firstChunk = result.firstChunk;
      }

      // Conexión exitosa y verificada. Abrimos la cascada SSE al frontend.
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no" // Invalida el caché intermedio
      });

      // Transmitimos el pre-fetch limpiando saltos de línea
      if (!firstChunk.done && firstChunk.value) {
        const safeText = firstChunk.value.text().replace(/\n/g, " ");
        res.write(`data: ${safeText}\n\n`);
      }

      // Transmitimos el resto del flujo en cascada
      for await (const chunk of activeIterator) {
        const safeText = chunk.text().replace(/\n/g, " ");
        res.write(`data: ${safeText}\n\n`);
      }

      res.write("data: [DONE]\n\n");
      res.end();

    } catch (globalError) {
      console.error("AO: Error crítico en la orquestación final:", globalError);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error al generar el cuento." });
      } else {
        res.end(); // Cerrar el stream si ya había empezado
      }
    }
  }
);

// =========================================================================
// 4. CHAT CON EL TUTOR IA (sendTutorChatMessage)
// FASE 3: Preparación de Canal de Streaming (SSE)
// Modelo: Gemini 3.1 Flash-Lite
// =========================================================================
export const sendTutorChatMessage = onRequest(
  { secrets: [geminiFreeKey, geminiApiKey], cors: true },
  async (req, res) => {
    if (req.method !== "POST" && req.method !== "OPTIONS") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    // Si es OPTIONS, se resuelve rápido para CORS. 
    // Aunque `cors: true` en v2 suele manejarlo automáticamente.

    let data;
    try {
      data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      // En funciones invocables a veces viene bajo `data`
      if (data && data.data) data = data.data;
    } catch (e) {
      res.status(400).send("Invalid JSON body");
      return;
    }

    const historialConversacion = data?.historialConversacion;

    if (!historialConversacion || !Array.isArray(historialConversacion)) {
      res.status(400).send("Faltan parámetros requeridos: historialConversacion");
      return;
    }

    const defaultSystemInstruction = `Eres 'DeutschMeister Tutor', un profesor de alemán nativo, altamente empático y experto en pedagogía para estudiantes de nivel A1. 

   Tu objetivo no es solo traducir, sino ENSEÑAR, guiar al estudiante y asegurar la retención del conocimiento.

   REGLAS ESTRICTAS DE COMPORTAMIENTO:
   1. Idioma y Ejemplos: Explica siempre en español claro y conversacional. Cada vez que uses una palabra o frase en alemán, ponla en **negrita** e incluye SIEMPRE su traducción al español inmediatamente después.
   2. Metodología Socrática y Correcciones: Si el estudiante comete un error, NUNCA le des la respuesta correcta de golpe. Usa el "Método Sándwich": felicítalo por el intento, señala el error amablemente, explícale la regla con una analogía simple de la vida real, y pídele que lo intente de nuevo.
   3. Formato Visual Avanzado: No entregues muros de texto. Usa listas con viñetas y emojis para separar ideas. OBLIGATORIO: Cuando expliques gramática (ej. der/die/das, conjugaciones, acusativo), utiliza tablas en formato Markdown para que el estudiante visualice los patrones fácilmente.
   4. Simplicidad Extrema: Tienes prohibido usar jerga lingüística compleja (no uses términos como "cláusula subordinada" o "pluscuamperfecto"). Usa conceptos visuales como "la regla de la posición 2" o "el verbo es el rey". Limita tu vocabulario en alemán estrictamente a conceptos del nivel A1.
   5. Cierre Interactivo (Hook): Termina CADA mensaje con una (y solo una) pregunta corta y sencilla en alemán (apropiada para el nivel A1) relacionada con lo que acaban de hablar, para invitar al alumno a practicar y responder.`;

    const systemInstruction = await getSystemPrompt("tutor_chat_system", defaultSystemInstruction);

    // Función auxiliar interna que gestiona la conexión con el modelo
    const generarRespuesta = async (apiKeyStr) => {
      const genAI = new GoogleGenerativeAI(apiKeyStr);
      const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
        systemInstruction: systemInstruction
      });

      let validHistory = historialConversacion.slice(0, -1);
      if (validHistory.length > 0 && validHistory[0].role !== "user") {
        validHistory.shift();
      }

      const chat = model.startChat({
        history: validHistory,
      });

      const ultimoMensaje = historialConversacion[historialConversacion.length - 1].parts[0].text;
      const resultStream = await chat.sendMessageStream(ultimoMensaje);

      // Set headers for SSE (Server-Sent Events)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of resultStream.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    };

    // Cascada de Circuit Breaker
    try {
      await generarRespuesta(geminiFreeKey.value());
    } catch (error) {
      console.error("Error al intentar responder con la llave gratuita:", error);
      const isQuotaError =
        error.status === 429 ||
        (error.message && (error.message.includes("429") || error.message.toLowerCase().includes("quota")));

      if (isQuotaError) {
        console.warn("Límite de cuota alcanzado en llave gratuita. Activando fallback a llave de pago...");
        try {
          await generarRespuesta(geminiApiKey.value());
        } catch (fallbackError) {
          console.error("Error crítico en la llave de pago de fallback:", fallbackError);
          if (!res.headersSent) {
            res.status(500).json({ error: "Error interno en el servidor de fallback", details: fallbackError.message });
          } else {
            res.write(`data: ${JSON.stringify({ error: "Stream fallback error: " + fallbackError.message })}\n\n`);
            res.end();
          }
        }
      } else {
        if (!res.headersSent) {
          res.status(500).json({ error: "Error interno del servidor", details: error.message });
        } else {
          res.write(`data: ${JSON.stringify({ error: "Stream error: " + error.message })}\n\n`);
          res.end();
        }
      }
    }
  }
);

// Función auxiliar para traducir conceptos a descripciones visuales usando Gemini
// Optimizada con Gemini 3.1 Flash-Lite y patrón Circuit Breaker (Gratis -> Pago)
async function getVisualDescriptionForConcept(conceptoEspanol, freeKeyVal, paidKeyVal, category = "") {
  const contextText = category 
    ? `Contexto temático de la palabra (área o tema de vocabulario): "${category}". Úsalo para que el objeto tenga sentido y sea adecuado para este contexto específico (ej. si la categoría menciona "Auto" y el concepto es "luces" o "luz", describe luces/faros de auto, no lámparas domésticas; si menciona "Auto" y el concepto es "limpiaparabrisas", describe la escobilla o parabrisas del auto).` 
    : '';

  const promptDirectorArte = `
    Actúa como Director de Arte de utilería 3D para flashcards educativas. 
    El usuario necesita representar visualmente el concepto en español: "${conceptoEspanol}".
    ${contextText}
    
    Tu tarea es proporcionar ÚNICAMENTE una descripción física en inglés del objeto o elemento central que representará esta palabra.
    
    REGLAS ESTRICTAS:
    1. TANGIBILIDAD: Describe un objeto físico real o una escena en miniatura. 
    2. ANTI-PAREIDOLIA (CRÍTICO): Si el concepto es abstracto (verbos, adjetivos, preposiciones, adverbios), descríbelo usando utilería INANIMADA y simbólica. Está absolutamente prohibido incluir rostros, ojos, caras felices, humanos o animales, a menos que la palabra represente explícitamente a una persona o ser vivo (ej. "madre", "perro").
    3. CERO TEXTO: Prohibido incluir letreros, pantallas con texto, libros abiertos con letras, o cualquier tipo de tipografía.
    4. PRECISIÓN: Ve directo a la forma física (ej. para "Enero" -> "A classic desk calendar with snowflakes", para "escribir" -> "A stylized feather quill pen resting on a clean notebook").
    
    Devuelve solo la descripción en inglés en una sola línea. Sin introducciones, sin confirmaciones y sin comillas.
  `;

  const invocarModelo = async (apiKeyValue) => {
    const genAI = new GoogleGenerativeAI(apiKeyValue);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    const result = await model.generateContent(promptDirectorArte);
    return result.response.text().trim().replace(/['"]/g, '');
  };

  try {
    // Intento 1: Usar la Llave Gratuita (Costo $0)
    return await invocarModelo(freeKeyVal);
  } catch (error) {
    const isQuotaError = error.status === 429 || (error.message && (error.message.includes("429") || error.message.includes("quota")));

    if (isQuotaError && paidKeyVal) {
      console.warn("⚠️ Cuota gratuita agotada al generar visual prompt. Saltando a llave de pago...");
      try {
        // Intento 2: Usar la Llave de Pago (Costo ultrabajo por ser Flash-Lite)
        return await invocarModelo(paidKeyVal);
      } catch (fallbackError) {
        console.error("❌ Error en fallback de visual prompt:", fallbackError);
        return conceptoEspanol;
      }
    }

    console.error("❌ Error desconocido al generar descripcion visual con Gemini:", error);
    return conceptoEspanol;
  }
}

// =========================================================================
// 5. GENERADOR DE IMÁGENES DE TARJETAS (generateCardImage)
// Modelo: fal-ai/flux-2
// =========================================================================

const diccionarioLetras = {
  "A, a": { shape: "uppercase letter A", obj: "shiny red apple" }, // Apfel
  "B, b": { shape: "uppercase letter B", obj: "yellow banana" }, // Banane
  "C, c": { shape: "uppercase letter C", obj: "cute chameleon" }, // Chamäleon
  "D, d": { shape: "uppercase letter D", obj: "aluminum soda can" }, // Dose
  "E, e": { shape: "uppercase letter E", obj: "cute little elephant" }, // Elefant
  "F, f": { shape: "uppercase letter F", obj: "cute green frog" }, // Frosch
  "G, g": { shape: "uppercase letter G", obj: "tall cute giraffe" }, // Giraffe
  "H, h": { shape: "uppercase letter H", obj: "small cute 3D house" }, // Haus
  "I, i": { shape: "uppercase letter I", obj: "cute little hedgehog" }, // Igel
  "J, j": { shape: "uppercase letter J", obj: "folded colorful jacket" }, // Jacke
  "K, k": { shape: "uppercase letter K", obj: "cute little cat" }, // Katze (reemplaza Kitten)
  "L, l": { shape: "uppercase letter L", obj: "cute little lion" }, // Löwe
  "M, m": { shape: "uppercase letter M", obj: "cute small mouse" }, // Maus
  "N, n": { shape: "uppercase letter N", obj: "cute 3D human nose" }, // Nase
  "O, o": { shape: "uppercase letter O", obj: "bright orange fruit" }, // Orange
  "P, p": { shape: "uppercase letter P", obj: "cute little penguin" }, // Pinguin
  "Q, q": { shape: "uppercase letter Q", obj: "cute pink jellyfish" }, // Qualle (reemplaza Queen/Krone)
  "R, r": { shape: "uppercase letter R", obj: "beautiful red rose" }, // Rose
  "S, s": { shape: "uppercase letter S", obj: "bright yellow sun" }, // Sonne
  "T, t": { shape: "uppercase letter T", obj: "ceramic coffee mug" }, // Tasse (reemplaza Tree/Baum)
  "U, u": { shape: "uppercase letter U", obj: "analog wall clock" }, // Uhr (reemplaza Umbrella/Regenschirm)
  "V, v": { shape: "uppercase letter V", obj: "cute little flying bird" }, // Vogel (reemplaza Violin/Geige)
  "W, w": { shape: "uppercase letter W", obj: "fluffy white cloud" }, // Wolke (reemplaza Whale/Wal)
  "X, x": { shape: "uppercase letter X", obj: "colorful toy xylophone" }, // Xylophon
  "Y, y": { shape: "uppercase letter Y", obj: "small luxury toy yacht" }, // Yacht (reemplaza Yoyo/Jojo)
  "Z, z": { shape: "uppercase letter Z", obj: "cute little zebra" }, // Zebra

  // Umlauts y caracteres especiales
  "Ä, ä": { shape: "uppercase letter A with two small dots (umlaut) floating above it", obj: "two shiny red apples" }, // Äpfel
  "Ö, ö": { shape: "uppercase letter O with two small dots (umlaut) floating above it", obj: "small glass bottle of olive oil" }, // Öl
  "Ü, ü": { shape: "uppercase letter U with two small dots (umlaut) floating above it", obj: "small open gift box with a surprise inside" }, // Überraschung
  "ß": { shape: "German sharp S (Eszett) character", obj: "small piece of a paved street" } // Straße (contiene la ß)
};

const diccionarioNumeros = {
  "null": { num: "number 0", obj: "small empty yellow basket" },
  "eins": { num: "number 1", obj: "exactly one small bright yellow star" },
  "zwei": { num: "number 2", obj: "exactly two small bright yellow stars" },
  "drei": { num: "number 3", obj: "exactly three small bright yellow stars" },
  "vier": { num: "number 4", obj: "exactly four small bright yellow stars" },
  "fünf": { num: "number 5", obj: "exactly five small bright yellow stars" },
  "sechs": { num: "number 6", obj: "group of small bright yellow stars" },
  "sieben": { num: "number 7", obj: "group of small bright yellow stars" },
  "acht": { num: "number 8", obj: "group of small bright yellow stars" },
  "neun": { num: "number 9", obj: "group of small bright yellow stars" },
  "zehn": { num: "number 10", obj: "group of small bright yellow stars" },
  "elf": { num: "number 11", obj: "group of small bright yellow stars" },
  "zwölf": { num: "number 12", obj: "group of small bright yellow stars" },
  "dreizehn": { num: "number 13", obj: "group of small bright yellow stars" },
  "vierzehn": { num: "number 14", obj: "group of small bright yellow stars" },
  "fünfzehn": { num: "number 15", obj: "group of small bright yellow stars" },
  "sechzehn": { num: "number 16", obj: "group of small bright yellow stars" },
  "siebzehn": { num: "number 17", obj: "group of small bright yellow stars" },
  "achtzehn": { num: "number 18", obj: "group of small bright yellow stars" },
  "neunzehn": { num: "number 19", obj: "group of small bright yellow stars" },
  "zwanzig": { num: "number 20", obj: "group of small bright yellow stars" },
  "einundzwanzig": { num: "number 21", obj: "group of small bright yellow stars" },
  "dreißig": { num: "number 30", obj: "group of small bright yellow stars" },
  "vierzig": { num: "number 40", obj: "group of small bright yellow stars" },
  "fünfzig": { num: "number 50", obj: "group of small bright yellow stars" },
  "sechzig": { num: "number 60", obj: "group of small bright yellow stars" },
  "siebzig": { num: "number 70", obj: "group of small bright yellow stars" },
  "achtzig": { num: "number 80", obj: "group of small bright yellow stars" },
  "neunzig": { num: "number 90", obj: "group of small bright yellow stars" },
  "hundert": { num: "number 100", obj: "group of small bright yellow stars" },
  "tausend": { num: "number 1000", obj: "group of small bright yellow stars" },

  // Ordinales (Se renderizan como números con una medalla)
  "der erste": { num: "number 1", obj: "shiny gold medal" },
  "der zweite": { num: "number 2", obj: "shiny silver medal" },
  "der dritte": { num: "number 3", obj: "shiny bronze medal" },
  "der vierte": { num: "number 4", obj: "blue ribbon" },
  "der fünfte": { num: "number 5", obj: "small blue ribbon" },
  "der sechste": { num: "number 6", obj: "small blue ribbon" },
  "der siebte": { num: "number 7", obj: "small blue ribbon" },
  "der achte": { num: "number 8", obj: "small blue ribbon" },
  "der neunte": { num: "number 9", obj: "small blue ribbon" },
  "der zehnte": { num: "number 10", obj: "small blue ribbon" },
  "der elfte": { num: "number 11", obj: "small blue ribbon" },
  "der zwölfte": { num: "number 12", obj: "small blue ribbon" },
  "der zwanzigste": { num: "number 20", obj: "small blue ribbon" },
  "der einundzwanzigste": { num: "number 21", obj: "small blue ribbon" }
};

// Nuevo Diccionario de Preguntas
const diccionarioPreguntas = {
  "warum?": "a small cute 3D thought bubble",
  "wo?": "a small cute 3D map location pin",
  "wann?": "a small cute 3D hourglass",
  "wer?": "a small cute 3D user profile avatar",
  "was?": "a small cute 3D mystery gift box",
  "wie?": "two small interlocking puzzle pieces",
  "woher?": "a small cute 3D arrow pointing away from a map pin",
  "wohin?": "a small cute 3D arrow pointing directly at a target bulls-eye",
  "welcher?": "two small cute 3D checkboxes, one with a vibrant checkmark"
};

// Diccionario de Horas (Uhrzeit) para mapear manecillas de reloj exactas
const diccionarioUhrzeit = {
  "ein uhr": "a minimalist clean round 3D analog wall clock showing exactly 1:00, with the short hour hand pointing directly at the number 1, and the long minute hand pointing directly at the number 12",
  "halb zwei": "a minimalist clean round 3D analog wall clock showing exactly 1:30, with the short hour hand pointing halfway between 1 and 2, and the long minute hand pointing directly at the number 6",
  "viertel vor drei": "a minimalist clean round 3D analog wall clock showing exactly 2:45, with the short hour hand pointing close to the number 3, and the long minute hand pointing directly at the number 9",
  "kurz vor 4": "a minimalist clean round 3D analog wall clock showing exactly 3:55 (five minutes to 4), with the short hour hand pointing almost directly at 4, and the long minute hand pointing at 11",
  "gleich 4": "a minimalist clean round 3D analog wall clock showing exactly 3:58 (almost 4 o'clock), with the short hour hand pointing almost exactly at 4, and the long minute hand pointing very close to 12",
  "genau 4 uhr": "a minimalist clean round 3D analog wall clock showing exactly 4:00, with the short hour hand pointing directly at the number 4, and the long minute hand pointing directly at the number 12",
  "fünf nach 4": "a minimalist clean round 3D analog wall clock showing exactly 4:05 (five minutes past 4), with the short hour hand pointing slightly past 4, and the long minute hand pointing directly at the number 1",
  "um 3 uhr": "a minimalist clean round 3D analog wall clock showing exactly 3:00, with the short hour hand pointing directly at the number 3, and the long minute hand pointing directly at the number 12",
  "von 2 bis 3 uhr": "a minimalist clean round 3D analog wall clock with a brightly colored highlighted pie-slice segment between the hours 2 and 3, representing the time slot from 2:00 to 3:00",
  "ab 3 uhr": "a minimalist clean round 3D analog wall clock with a brightly colored highlighted pie-slice segment starting at 3:00 and extending clockwise, representing starting from 3:00 onwards"
};

// Diccionario de Conceptos Especiales (Palabras abstractas complejas)
const diccionarioConceptosEspeciales = {
  "der vorname": "a minimalist 3D isometric employee ID card badge with a lanyard, featuring a cartoon silhouette profile picture of a person and the first line of details highlighted in vibrant blue, resting on a clean white surface",
  "der nachname": "a minimalist 3D isometric family tree chart showing stylized connected icons of family members, representing family lineage and family name (surname), resting on a clean white surface",
  "das abblendlicht": "a 3D isometric car headlight emitting a focused bright yellow beam of light pointing downwards onto a road surface, representing low beam headlights",
  "das fernlicht": "a 3D isometric car headlight emitting intense, bright blue beams of light extending straight forward, representing high beam headlights",
  "das tagfahrlicht": "a 3D isometric car headlight with modern LED signature strip daytime running lights glowing softly in white",
  "die nebelschlussleuchte": "a 3D isometric rear car bumper showing a single glowing bright red fog light casting a strong red beam through a soft grey mist",
  "die bremsleuchte": "a 3D isometric rear car tail light assembly with the round brake lights glowing in intense red",
  "die warnblinkanlage": "a 3D isometric car dashboard hazard warning light button, featuring a red triangle icon glowing and flashing",
  "einsteigen / aussteigen": "a 3D isometric representation of a clean car with an open driver door, showing a path to enter or exit",
  "aufschließen": "a 3D isometric car door handle keyhole with a key being inserted or turned inside the lock",
  "der blinker / blinken": "a 3D isometric front corner of a car showing a bright orange amber indicator light blinking with radiating light rays",
  "die gangschaltung": "a 3D isometric gear shifter stick for a car transmission, showing a sphere knob with gear pattern markings on top",
  "der schalthebel": "a 3D isometric manual gear shift lever stick with a round knob showing gear numbers",
  "die bremse / bremsen": "a 3D isometric car brake pedal being pressed down slightly",
  "das bremspedal": "a 3D isometric car footwell showing a clean metal brake pedal being pressed down",
  "das gaspedal": "a 3D isometric car footwell showing an accelerator pedal being pressed down",
  "gas geben": "a 3D isometric car accelerator pedal being pressed down to speed up",
  "die kupplung": "a 3D isometric car clutch pedal being pressed down in the footwell",
  "die handbremse": "a 3D isometric car handbrake lever pulled up on the center console",
  "der scheibenwischer": "a 3D isometric car windshield with a wiper blade wiping away rain droplets, showing a clear swept arc",
  "der lichtschalter": "a 3D isometric dial switch on a car dashboard showing icons for headlights and fog lights",
  "der motor": "a 3D isometric modern clean car engine block with metal pipes and valve covers",
  "motor starten": "a 3D isometric car ignition switch with a key turning to start the engine, or an illuminated engine start-stop button glowing red"
};

/**
 * 🏭 FÁBRICA DE PROMPTS (El Enrutador Lógico)
 * Estructura un JSON aislando colores naturales del indicador de género
 */
function construirPromptDinamico(conceptoIngles, tipoGramatical, palabraAleman = "") {
  // 1. Detección Inteligente de Color (Evita la epidemia gris leyendo el prefijo)
  let hexAsignado = "hex #9E9E9E";
  const palabraLimpia = (palabraAleman || "").trim().toLowerCase();
  const tipoLimpio = (tipoGramatical || "").toLowerCase().trim();

  // Detección infalible de preguntas
  const esPregunta = tipoLimpio.includes("pregunta") || tipoLimpio.includes("w-frage") || tipoLimpio.includes("interrogativ") || palabraLimpia.includes("?");

  const diasYMeses = ["montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag", "sonntag", "januar", "februar", "märz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"];

  // MODIFICACIÓN AQUÍ:
  if (palabraLimpia.startsWith("der ") || diasYMeses.includes(palabraLimpia)) { hexAsignado = "hex #4285F4"; }
  else if (palabraLimpia.startsWith("die ")) { hexAsignado = "hex #EA4335"; }
  else if (palabraLimpia.startsWith("das ")) { hexAsignado = "hex #34A853"; }
  else if (tipoLimpio === "verbo" || tipoLimpio === "acción") { hexAsignado = "hex #FBBC05"; }
  else if (tipoLimpio === "preposición" || tipoLimpio === "preposicion") { hexAsignado = "hex #FF9800"; }
  else if (esPregunta) { hexAsignado = "hex #9C27B0"; }

  // 2. Base JSON Estructurada
  let promptObj = {
    "scene": "A pure seamless solid white background in hex #FFFFFF",
    "subjects": [],
    "style": "3D isometric, minimalist, simple, educational language-app aesthetic, made of smooth matte soft clay",
    "lighting": "Bright, even studio lighting"
  };

  // 3. Enrutamiento Lógico de Sujetos
  if (esPregunta) {
    const objPregunta = diccionarioPreguntas[palabraLimpia] || "small cute 3D exclamation mark symbol";
    promptObj.subjects = [
      { "type": "large chunky 3D question mark symbol", "color": "strictly Material Purple hex #9C27B0", "position": "left" },
      { "type": objPregunta, "color": "vibrant natural clay colors", "position": "sitting right next to the question mark" }
    ];
  }
  else if (tipoLimpio === 'letra' || tipoLimpio === 'alfabeto') {
    const fallbackShape = `uppercase letter ${palabraAleman.charAt(0).toUpperCase()}`;
    const datosLetra = diccionarioLetras[palabraAleman] || { shape: fallbackShape, obj: "small colorful bouncy ball" };
    
    promptObj = {
      "scene": "A pure seamless solid white background hex #FFFFFF",
      "subjects": [
        { "type": `large chunky 3D block shaped like the ${datosLetra.shape}`, "color": "strictly Material Grey hex #9E9E9E", "position": "left" },
        { "type": datosLetra.obj, "color": "vibrant natural clay colors", "position": "sitting right next to the letter block" }
      ],
      "style_rules": "Strictly purely visual: absolutely NO TEXT, NO LETTERS, NO WORDS. Minimalist, simple, made of smooth matte soft clay."
    };
  }
  else if (tipoLimpio === 'numero' || tipoLimpio === 'número' || diccionarioNumeros[palabraLimpia]) {
    const datosNum = diccionarioNumeros[palabraLimpia] || { num: "number " + palabraLimpia, obj: "group of small bright yellow stars" };
    promptObj.subjects = [
      { "type": `large chunky 3D block shaped like the ${datosNum.num}`, "color": "strictly Material Grey hex #9E9E9E", "position": "left" },
      { "type": datosNum.obj, "color": "vibrant Material Yellow", "position": "sitting right next to the number block" }
    ];
  }
  else if (diccionarioUhrzeit[palabraLimpia]) {
    promptObj.subjects = [
      {
        "type": diccionarioUhrzeit[palabraLimpia],
        "description": "Clean, educational, clear visualization of time. Made of smooth matte soft clay. Purely visual, zero text.",
        "position": "centered"
      }
    ];
  }
  else if (diccionarioConceptosEspeciales[palabraLimpia]) {
    promptObj.subjects = [
      {
        "type": diccionarioConceptosEspeciales[palabraLimpia],
        "description": "Clean, educational, minimalist language app illustration. Made of smooth matte soft clay. Purely visual, zero text.",
        "position": "centered"
      },
      {
        "type": "small geometric floating sphere",
        "description": "Made of glossy clay, perfectly round, acting as a grammatical gender indicator. Zero text.",
        "position": "floating near the top right corner of the main object",
        "color_match": "exact",
        "color": hexAsignado
      }
    ];
  }
  else {
    // MODIFICACIÓN AQUÍ: Filtro ampliado
    const isSinGenero = tipoLimpio === 'adverbio' || tipoLimpio === 'adjetivo' || tipoLimpio.includes('expresión') || tipoLimpio.includes('expresion') || tipoLimpio.includes('frase') || tipoLimpio.includes('regla') || palabraLimpia.includes('+');

    if (isSinGenero) {
      // Renderiza SOLO el concepto visual, sin esfera gramatical
      promptObj.subjects = [
        {
          "type": `3D UI icon of ${conceptoIngles}`,
          "description": "Rendered in its natural, realistic, and vibrant colors. Made of smooth matte soft clay. Purely visual, zero text.",
          "position": "centered"
        }
      ];
    } else {
      // Sustantivos, verbos y preposiciones SÍ llevan la esfera indicadora
      promptObj.subjects = [
        {
          "type": `3D UI icon of ${conceptoIngles}`,
          "description": "Rendered in its natural, realistic, and vibrant colors. Made of smooth matte soft clay. Purely visual, zero text.",
          "position": "centered"
        },
        {
          "type": "small geometric floating sphere",
          "description": "Made of glossy clay, perfectly round, acting as a grammatical gender indicator. Zero text.",
          "position": "floating near the top right corner of the main object",
          "color_match": "exact",
          "color": hexAsignado
        }
      ];
    }
  }

  return JSON.stringify(promptObj);
}

export const generateCardImage = onCall(
  { secrets: [falKey, geminiApiKey, geminiFreeKey] },
  async (request) => {
    const { wordObj, conceptoIngles } = request.data;

    if (!wordObj || !wordObj.es || !wordObj.de) {
      throw new HttpsError("invalid-argument", "Faltan parámetros requeridos en wordObj");
    }

    // Usar el tipo gramatical si viene en wordObj, o intentar deducirlo
    const tipoGramatical = wordObj.type || wordObj.tipo_gramatical || 'sustantivo';

    try {
      fal.config({ credentials: falKey.value() });

      // Si no tenemos un concepto en inglés predefinido, usamos Gemini para traducirlo rápido
      let concepto = conceptoIngles;
      if (!concepto) {
        const category = (request.data.category || "") + (wordObj.category ? ` - ${wordObj.category}` : "");
        concepto = await getVisualDescriptionForConcept(wordObj.es, geminiFreeKey.value(), geminiApiKey.value(), category);
      }

      // Ensamblar el prompt usando la Fábrica
      const promptDinamicoGenerado = construirPromptDinamico(concepto, tipoGramatical, wordObj.de);
      console.log(`🎨 Renderizando: ${wordObj.de} (${tipoGramatical})`);
      console.log(`📝 Prompt ensamblado: "${promptDinamicoGenerado}"`);

      // 3. Llamamos a Flux a través de Fal.ai (optimizando API endpoint, formato y dimensiones)
      const result = await fal.subscribe("fal-ai/flux-2/klein/9b/base", {
        input: {
          prompt: promptDinamicoGenerado,
          image_size: { width: 512, height: 512 },
          num_inference_steps: 20,
          guidance_scale: 3.5,
          output_format: "jpeg"
        }
      });

      const dataUri = result.data.images?.[0]?.url || result.data?.url || (result.images && result.images[0]?.url);
      if (!dataUri) throw new Error("No image data returned from FAL API");

      // PARTE 1: Guardado Global en Caché
      const safeWordId = wordObj.de.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
      try {
        await db.collection("global_flashcards").doc(safeWordId).set({
          imageUrl: dataUri,
          model: "fal-ai/flux-2/klein/9b/base",
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn("No se pudo guardar en el caché global:", err);
      }

      return { imageUrl: dataUri };
    } catch (error) {
      console.error("Error en generateCardImage:", error);
      throw new HttpsError("internal", "Error al generar imagen de la tarjeta", error.message);
    }
  }
);

// =========================================================================
// 6. GENERADOR DE COMPRENSIÓN LECTORA (generateReadingTest)
// =========================================================================
export const generateReadingTest = onCall(
  { secrets: [geminiFreeKey, geminiApiKey] },
  async (request) => {
    const { tema } = request.data;

    if (!tema) {
      throw new HttpsError("invalid-argument", "Falta el parámetro requerido: tema");
    }

    const defaultSystemInstruction = `
      Eres un profesor de alemán de nivel A1. El usuario te dará un tema de su interés.
      Tu tarea es generar:
      1. Un título en alemán para la lectura.
      2. Un texto de lectura corto y sencillo en alemán nivel A1 sobre el tema (máximo 80-100 palabras, usando frases muy sencillas, tiempo presente y vocabulario básico).
      3. Un cuestionario de exactamente 3 preguntas de opción múltiple en alemán para medir la comprensión lectora del texto.
      
      Debes devolver ÚNICAMENTE un JSON con esta estructura exacta:
      {
        "titulo_aleman": "...",
        "texto_aleman": "...",
        "preguntas": [
          {
            "pregunta_aleman": "...",
            "opciones_aleman": ["Opción A", "Opción B", "Opción C"],
            "respuesta_correcta": "La opción exacta (debe coincidir exactamente con una de las opciones del array opciones_aleman)",
            "explicacion_espanol": "La 'explicacion_espanol' debe ser una retroalimentación socrática y didáctica que sirva de refuerzo. Debe explicar claramente por qué la respuesta correcta es la adecuada basándose en el texto, de modo que el alumno aprenda tanto si acierta como si falla."
          }
        ]
      }

      REGLAS CRÍTICAS:
      - Usa diacríticos/umlauts estándar del alemán (ä, ö, ü, ß) en lugar de dígrafos (como "fuer" en lugar de "für", o "schoen" en lugar de "schön").
      - NO coloques espacios antes de los signos de puntuación (ej. escribe "Familie." y no "Familie .", "Personen:" y no "Personen :", "Vater," y no "Vater ,"). El texto debe tener una puntuación limpia y profesional.
      - Responde únicamente con el formato JSON válido.
      - El texto y las preguntas deben estar estrictamente redactados en alemán nivel A1.
      - La explicación de las respuestas correctas debe estar en español.
    `;

    const systemInstruction = await getSystemPrompt("reading_comprehension_system", defaultSystemInstruction);

    const invocarModelo = async (apiKeyStr) => {
      const genAI = new GoogleGenerativeAI(apiKeyStr);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash", // modelo de alta confiabilidad en este entorno
        generationConfig: { responseMimeType: "application/json" },
        systemInstruction: systemInstruction
      });

      const prompt = `Genera la prueba de comprensión lectora para el tema: "${tema}".`;
      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text().trim());
    };

    try {
      return await invocarModelo(geminiFreeKey.value());
    } catch (error) {
      console.warn("Error en la llave gratuita de Reading Comprehension:", error);
      const isQuotaError = error.status === 429 || (error.message && (error.message.includes("429") || error.message.includes("quota")));

      if (isQuotaError && geminiApiKey.value()) {
        try {
          return await invocarModelo(geminiApiKey.value());
        } catch (fallbackError) {
          console.error("Error crítico en llave de pago (Reading Comprehension):", fallbackError);
          throw new HttpsError("internal", "Error en los servidores de IA de respaldo.");
        }
      }
      throw new HttpsError("internal", "Error generando el examen de comprensión lectora: " + error.message);
    }
  }
);

