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
export const runRoleplaySimulator = onCall(
  { secrets: [geminiFreeKey, geminiApiKey] },
  async (request) => {
    const { historialConversacion, escenario } = request.data;

    if (!historialConversacion || !escenario) {
      throw new HttpsError("invalid-argument", "Faltan parámetros requeridos: historialConversacion o escenario");
    }

    const defaultSystemInstruction = `
      Eres un hablante nativo de alemán participando en un juego de rol de nivel A1. 
      Escenario actual: "${escenario}".

      REGLAS ESTRICTAS DE COMPORTAMIENTO:
      1. Inmersión y Nivel: Mantén siempre tu personaje. Habla SOLO en alemán de nivel A1 (frases muy cortas, vocabulario cotidiano, tiempo presente).
      2. Respuestas Ágiles: Mantén tus intervenciones muy cortas (1 a 2 frases máximo).
      3. Ayuda Visual: Pon las palabras clave de tu respuesta en **negrita** para ayudar al alumno a identificarlas.
      4. Correcciones (Tutor-Tipp): Si el alumno comete un error gramatical grave, responde primero en personaje en alemán. Luego, al final de tu mensaje, añade una pequeña nota en español: *(💡 Tutor-Tipp: felicítalo por el intento y corrige el error amablemente)*. Si no hay errores, no uses el tip.
      5. El Cierre (Hook): Termina SIEMPRE tu diálogo con una pregunta corta y natural en alemán para que el alumno te responda y la escena fluya.
      6. El Salvavidas (Ayuda a demanda): Si el usuario escribe que no entiende (ej. "No entiendo", "¿Qué significa eso?", "Ich verstehe nicht"), sal momentáneamente del personaje, explícare en español la última frase que le dijiste, dale una pista de cómo podría responder, y vuelve a formularle la pregunta en alemán para que lo intente de nuevo.
    `;

    const systemInstruction = await getSystemPrompt("roleplay_simulator", defaultSystemInstruction);

    // Función interna para llamar al modelo
    const invocarRol = async (apiKeyStr) => {
      const genAI = new GoogleGenerativeAI(apiKeyStr);
      // Usamos 3.1 Flash-Lite: Alta velocidad y bajísimo costo para chats de rol
      const model = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
        systemInstruction: systemInstruction.replace("${escenario}", escenario)
      });

      const chat = model.startChat({
        history: historialConversacion.slice(0, -1),
      });

      const ultimoMensaje = historialConversacion[historialConversacion.length - 1].parts[0].text;
      const result = await chat.sendMessage(ultimoMensaje);

      return { text: result.response.text() };
    };

    // EL ENRUTADOR EN CASCADA (CIRCUIT BREAKER)
    try {
      // Intento 1: API Gratuita (Costo $0)
      return await invocarRol(geminiFreeKey.value());
    } catch (error) {
      const isQuotaError = error.status === 429 || (error.message && (error.message.includes("429") || error.message.includes("quota")));

      if (isQuotaError && geminiApiKey.value()) {
        console.warn("⚠️ Cuota gratuita agotada en Roleplay. Activando Failover a llave de pago...");
        try {
          // Intento 2: Llave de Facturación
          return await invocarRol(geminiApiKey.value());
        } catch (fallbackError) {
          console.error("❌ Error crítico en llave de pago (Roleplay):", fallbackError);
          throw new HttpsError("internal", "Error en los servidores de IA de respaldo.");
        }
      }
      console.error("❌ Error general en runRoleplaySimulator:", error);
      throw new HttpsError("internal", "Error comunicando con el Simulador de Rol.");
    }
  }
);

// =========================================================================
// 2. EVALUADOR DE CORREOS (EmailSimulator)
// Modelo: Mistral NeMo 12B (vía fal.ai)
// =========================================================================
export const evaluateEmail = onCall(
  { secrets: [falKey] },
  async (request) => {
    const { textoCorreo, consignaExamen } = request.data;

    if (!textoCorreo || !consignaExamen) {
      throw new HttpsError("invalid-argument", "Faltan parámetros requeridos");
    }

    const promptDefinido = `
        Consigna del examen: "${consignaExamen}"
        Texto del estudiante: "${textoCorreo}"

        Actúa como un examinador oficial del Goethe-Institut (Nivel A1) y a la vez un tutor altamente empático. Evalúa el correo del estudiante.
        
        REGLAS ESTRICTAS DE EVALUACIÓN:
        1. Método Sándwich: Inicia destacando lo que el estudiante hizo bien, luego señala los errores amablemente, y termina con una frase motivadora.
        2. Estructura: Evalúa 1) Cumplimiento de la tarea, 2) Coherencia, y 3) Corrección gramatical. Usa listas, viñetas y emojis.
        3. Tablas Visuales: Para los errores gramaticales o de vocabulario, crea OBLIGATORIAMENTE una tabla en formato Markdown con tres columnas: [❌ Tu texto] | [✅ Corrección] | [💡 Regla simple].
        4. Simplicidad Extrema: Explica las reglas en español muy claro y conversacional. No uses jerga lingüística compleja.
      `;

    try {
      fal.config({ credentials: falKey.value() });

      const result = await fal.subscribe("fal-ai/any-llm", {
        input: {
          model: "mistralai/Mistral-Nemo-Instruct-2407",
          prompt: promptDefinido,
          system_prompt: "Eres un examinador de alemán experto pero muy empático y didáctico."
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

    // Función auxiliar interna que gestiona la conexión con el modelo y el context caching
    const generarRespuesta = async (apiKeyStr) => {
      const cacheManager = new GoogleAICacheManager(apiKeyStr);

      // Base de datos estática para padding A1 (Garantiza cumplir con el mínimo de 4096 tokens requerido)
      const a1ReferenceDatabase = `
        DEUTSCHMEISTER REFERENCE DATABASE FOR LEVEL A1
        (Used to pad context cache to meet the minimum token requirement of 4096 tokens)
        
        NUMBERS (Zahlen):
        null - 0, eins - 1, zwei - 2, drei - 3, vier - 4, fünf - 5, sechs - 6, sieben - 7, acht - 8, neun - 9, zehn - 10,
        elf - 11, zwölf - 12, dreizehn - 13, vierzehn - 14, fünfzehn - 15, sechzehn - 16, siebzehn - 17, achtzehn - 18,
        neunzehn - 19, zwanzig - 20, einundzwanzig - 21, zweiundzwanzig - 22, dreißig - 30, vierzig - 40, fünfzig - 50,
        sechzig - 60, siebzig - 70, achtzig - 80, neunzig - 90, hundert - 100, tausend - 1000.
        
        DAYS OF THE WEEK (Wochentage):
        Montag - lunes, Dienstag - martes, Mittwoch - miércoles, Donnerstag - jueves, Freitag - viernes, Samstag - sábado, Sonntag - domingo.
        
        MONTHS (Monate):
        Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember.
        
        GRAMMAR PRONOUNS (Personalpronomen):
        ich - yo, du - tú, er - él, sie - ella, es - ello, wir - nosotros, ihr - vosotros, sie - ellos/ellas, Sie - usted.
        
        POSSESSIVE PRONOUNS (Possessivpronomen):
        mein - mi, dein - tu, sein - su (de él), ihr - su (de ella), unser - nuestro, euer - vuestro, ihr - su (de ellos), Ihr - su (de usted).
        
        COMMON VERBS (Verben):
        sein (bin, bist, ist, sind, seid, sind) - ser/estar
        haben (habe, hast, hat, haben, habt, haben) - tener
        kommen (komme, kommst, kommt, kommen, kommt, kommen) - venir
        wohnen (wohne, wohnst, wohnt, wohnen, wohnt, wohnen) - vivir/residir
        heißen (heiße, heißt, heißt, heißen, heißt, heißen) - llamarse
        sprechen (spreche, sprichst, spricht, sprechen, sprecht, sprechen) - hablar
        arbeiten (arbeite, arbeitest, arbeitet, arbeiten, arbeitet, arbeiten) - trabajar
        machen (mache, machst, macht, machen, macht, machen) - hacer
        gehen (gehe, gehst, geht, gehen, geht, gehen) - ir
        kauf (kaufe, kaufst, kauft, kaufen, kauft, kaufen) - comprar
        trinken (trinke, trinkst, trinkt, trinken, trinkt, trinken) - beber
        essen (esse, isst, isst, essen, esst, essen) - comer
        schreiben (schreibe, schreibst, schreibt, schreiben, schreibt, schreiben) - escribir
        lesen (lese, liest, liest, lesen, lest, lesen) - leer
        sehen (sehe, siehst, sieht, sehen, seht, sehen) - ver
        hören (höre, hörst, hört, hören, hört, hören) - escuchar/oír
        lernen (lerne, lernst, lernt, lernen, lernt, lernen) - aprender
        verstehen (verstehe, verstehst, versteht, verstehen, versteht, verstehen) - entender
        fragen (frage, fragst, fragt, fragen, fragt, fragen) - preguntar
        antworten (antworte, antwortest, antwortet, antworten, antwortet, antworten) - responder.
        
        PREPOSITIONS (Präpositionen):
        in - en / dentro de, an - junto a / en, auf - sobre / encima de, unter - debajo de, über - sobre / encima de (sin tocar),
        vor - delante de, hinter - detrás de, neben - al lado de, zwischen - entre.
        mit - con, nach - hacia / después de, aus - de (procedencia/interior), zu - hacia / a, von - de, bei - en casa de / junto a, seit - desde.
        
        USEFUL SENTENCES:
        Wie geht es dir? - ¿Cómo estás?
        Mir geht es gut, danke. - Estoy bien, gracias.
        Wie heißt du? - ¿Cómo te llamas?
        Ich heißt Marcos. - Me llamo Marcos.
        Woher kommst du? - ¿De dónde vienes?
        Ich komme aus Kolumbien. - Vengo de Colombia.
        Wo wohnst du? - ¿Dónde vives?
        Ich wohne in Barranquilla. - Vivo en Barranquilla.
        Was bist du von Beruf? - ¿A qué te dedicas?
        Ich bin Elektroniker von Beruf. - Soy técnico electrónico de profesión.
        Entschuldigung, ich verstehe nicht. - Disculpe, no entiendo.
        Können Sie das bitte wiederholen? - ¿Puede repetir eso, por favor?
        Sprechen Sie Spanisch? - ¿Habla español?
        Ich spreche ein bisschen Deutsch. - Hablo un poco de alemán.
        Vielen Dank für deine Hilfe. - Muchas gracias por tu ayuda.
        Guten Morgen - Buenos días (mañana)
        Guten Tag - Buenos días / buenas tardes
        Guten Abend - Buenas noches (saludo)
        Gute Nacht - Buenas noches (despedida)
        Auf Wiedersehen - Adiós / Hasta la vista.
      `;

      // Repetimos para superar holgadamente los 4096 tokens exigidos por Gemini 3.1
      const cachedContent = systemInstruction + "\n\n" + a1ReferenceDatabase.repeat(12);

      const cache = await cacheManager.create({
        model: "models/gemini-3.1-flash-lite",
        displayName: "tutor_chat_instruction_cache",
        contents: [
          {
            role: "user",
            parts: [{ text: cachedContent }]
          }
        ],
        ttlSeconds: 3600
      });

      const genAI = new GoogleGenerativeAI(apiKeyStr);
      const model = genAI.getGenerativeModelFromCachedContent(cache);

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
async function getVisualDescriptionForConcept(conceptoEspanol, freeKeyVal, paidKeyVal) {
  const prompt = `You are a prompt engineer for an image generation model. 
The user wants to generate a completely textless, visual representation for the Spanish concept "${conceptoEspanol}".
Provide ONLY a concise visual description in English of what the image should show. 
DO NOT use the word itself. 
For example, if the concept is "mañana" (tomorrow), you might output: "A calendar page with an arrow pointing to the next day". 
If it is "ayer" (yesterday), you might output: "An hourglass with sand at the bottom". 
If it is an animal like "perro", output: "A cute dog".
Provide ONLY the visual description in English. Absolutely no intro, no quotes, no text.`;

  const invocarModelo = async (apiKeyValue) => {
    const genAI = new GoogleGenerativeAI(apiKeyValue);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(prompt);
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
  const promptObj = {
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
    promptObj.subjects = [
      { "type": `large chunky 3D block shaped like the ${datosLetra.shape}`, "color": "strictly Material Grey hex #9E9E9E", "position": "left" },
      { "type": datosLetra.obj, "color": "vibrant natural clay colors", "position": "sitting right next to the letter block" }
    ];
  }
  else if (tipoLimpio === 'numero' || tipoLimpio === 'número' || diccionarioNumeros[palabraLimpia]) {
    const datosNum = diccionarioNumeros[palabraLimpia] || { num: "number " + palabraLimpia, obj: "group of small bright yellow stars" };
    promptObj.subjects = [
      { "type": `large chunky 3D block shaped like the ${datosNum.num}`, "color": "strictly Material Grey hex #9E9E9E", "position": "left" },
      { "type": datosNum.obj, "color": "vibrant Material Yellow", "position": "sitting right next to the number block" }
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
        concepto = await getVisualDescriptionForConcept(wordObj.es, geminiFreeKey.value(), geminiApiKey.value());
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
