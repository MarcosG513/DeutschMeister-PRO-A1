import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fal } from "@fal-ai/client";

// Inicializa Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Define los secretos que se tomarán de Secret Manager (FASE 1)
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const falKey = defineSecret("FAL_KEY");

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
  { secrets: [geminiApiKey] },
  async (request) => {
    const { historialConversacion, escenario } = request.data;
    
    if (!historialConversacion || !escenario) {
      throw new HttpsError("invalid-argument", "Faltan parámetros requeridos: historialConversacion o escenario");
    }

    const defaultSystemInstruction = `
      Eres un hablante nativo de alemán en un escenario de juego de rol de nivel A1: "${escenario}".
      REGLAS ESTRICTAS:
      1. Usa SOLO alemán de nivel A1 (frases cortas, máximo 500 palabras cotidianas, tiempo presente).
      2. Mantén tus respuestas cortas (1 a 3 frases máximo).
      3. Si el usuario comete un error muy grave, corrígelo brevemente entre paréntesis al final en español.
    `;

    const systemInstruction = await getSystemPrompt("roleplay_simulator", defaultSystemInstruction);

    try {
      const googleAI = new GoogleGenerativeAI(geminiApiKey.value());
      const model = googleAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemInstruction.replace("${escenario}", escenario)
      });

      const chat = model.startChat({
        history: historialConversacion.slice(0, -1),
      });

      const ultimoMensaje = historialConversacion[historialConversacion.length - 1].parts[0].text;
      const result = await chat.sendMessage(ultimoMensaje);

      return { text: result.response.text() };
    } catch (error) {
      console.error("Error en runRoleplaySimulator:", error);
      throw new HttpsError("internal", "Error al procesar la solicitud de IA", error.message);
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

    const defaultPrompt = `
      Consigna: "${consignaExamen}"
      Texto del estudiante: "${textoCorreo}"

      Actúa como examinador del Goethe-Institut para A1. Evalúa:
      1. Cumplimiento de la tarea.
      2. Coherencia (A1).
      3. Gramática (declinaciones, posición del verbo).
      
      Formato Markdown en español:
      ### 🎯 Evaluación General (Puntaje estimado 0-10)
      ### 📈 Puntos Fuertes
      ### 🛠️ Correcciones Detalladas
      ### 💡 Sugerencia de Vocabulario
    `;

    const defaultSystemPrompt = "Eres un examinador estricto, metodológico y preciso de alemán nativo.";
    
    const promptDefinido = await getSystemPrompt("evaluate_email_prompt", defaultPrompt);
    const systemPromptDefinido = await getSystemPrompt("evaluate_email_system", defaultSystemPrompt);

    try {
      fal.config({ credentials: falKey.value() });
      
      const result = await fal.subscribe("fal-ai/any-llm", {
        input: {
          model: "google/gemini-2.5-flash",
          prompt: promptDefinido.replace("${consignaExamen}", consignaExamen).replace("${textoCorreo}", textoCorreo),
          system_prompt: systemPromptDefinido
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
// 3. GENERADOR DE CUENTOS (generateStory)
// Modelo: Qwen 2.5 7B (vía fal.ai)
// =========================================================================
export const generateStory = onCall(
  { secrets: [falKey] },
  async (request) => {
    const { palabrasVocabulario } = request.data;

    if (!palabrasVocabulario || !Array.isArray(palabrasVocabulario)) {
      throw new HttpsError("invalid-argument", "Se requiere un arreglo de palabrasVocabulario");
    }

    const defaultPrompt = `
      Genera un micro-cuento interactivo en alemán nivel A1 que integre estas palabras: [${palabrasVocabulario.join(", ")}].
      DEBES responder ÚNICAMENTE con un objeto JSON válido, sin texto adicional. Esquema:
      {
        "titulo": "Título",
        "cuento_aleman": "Cuento en alemán",
        "traduccion_espanol": "Traducción",
        "palabras_clave_usadas": [{"palabra": "palabra", "contexto": "oración"}]
      }
    `;

    const defaultSystemPrompt = "Eres un generador de JSON estricto.";
    
    const promptDefinido = await getSystemPrompt("generate_story_prompt", defaultPrompt);
    const systemPromptDefinido = await getSystemPrompt("generate_story_system", defaultSystemPrompt);

    try {
      fal.config({ credentials: falKey.value() });

      const result = await fal.subscribe("fal-ai/any-llm", {
        input: {
          model: "google/gemini-2.5-flash",
          prompt: promptDefinido.replace("${palabrasVocabulario}", palabrasVocabulario.join(", ")),
          system_prompt: systemPromptDefinido
        }
      });

      let outputText = result.data.output.trim();
      if (outputText.startsWith("\`\`\`json")) outputText = outputText.substring(7, outputText.length - 3).trim();
      else if (outputText.startsWith("\`\`\`")) outputText = outputText.substring(3, outputText.length - 3).trim();

      return { json: JSON.parse(outputText) };
    } catch (error) {
      console.error("Error en generateStory:", error);
      throw new HttpsError("internal", "Error al generar cuento", error.message);
    }
  }
);

// =========================================================================
// 4. CHAT CON EL TUTOR IA (sendTutorChatMessage)
// FASE 3: Preparación de Canal de Streaming (SSE)
// Modelo: Gemini 2.5 Flash
// =========================================================================
export const sendTutorChatMessage = onRequest(
  { secrets: [geminiApiKey], cors: true }, 
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
    } catch(e) {
      res.status(400).send("Invalid JSON body");
      return;
    }

    const historialConversacion = data?.historialConversacion;

    if (!historialConversacion || !Array.isArray(historialConversacion)) {
      res.status(400).send("Faltan parámetros requeridos: historialConversacion");
      return;
    }

    const defaultSystemInstruction = `
      Eres 'DeutschMeister Tutor', un profesor de alemán para principiantes.
      REGLAS:
      1. Habla en español, escribe ejemplos claros en alemán con traducción.
      2. No abrumes con términos complejos.
      3. Usa listas y emojis.
      4. Termina siempre con una palabra de aliento o pregunta en alemán A1.
    `;

    const systemInstruction = await getSystemPrompt("tutor_chat_system", defaultSystemInstruction);

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey.value());
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        systemInstruction: systemInstruction
      });

      let validHistory = historialConversacion.slice(0, -1);
      // Gemini requiere que el historial comience con 'user'. Si el primer mensaje es del 'model' (ej. bienvenida), lo quitamos o insertamos uno dummy
      if (validHistory.length > 0 && validHistory[0].role !== "user") {
        validHistory.shift();
      }

      const chat = model.startChat({
        history: validHistory,
      });

      const ultimoMensaje = historialConversacion[historialConversacion.length - 1].parts[0].text;
      
      // Streaming implementation
      const resultStream = await chat.sendMessageStream(ultimoMensaje);

      // Set headers for SSE (Server-Sent Events)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of resultStream.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          // SSE format: data: <content>\n\n
          res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
        }
      }
      
      res.write('data: [DONE]\n\n');
      res.end();
      
    } catch (error) {
      console.error("Error en sendTutorChatMessage stream:", error);
      // No usar status si ya empezó a streamear, pero por si acaso.
      if (!res.headersSent) {
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
      } else {
        res.write(`data: ${JSON.stringify({ error: "Stream error: " + error.message })}\n\n`);
        res.end();
      }
    }
  }
);

// Función auxiliar para traducir conceptos a descripciones visuales usando Gemini
async function getVisualDescriptionForConcept(conceptoEspanol, geminiKeyVal) {
    try {
        const genAI = new GoogleGenerativeAI(geminiKeyVal);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
        
        const prompt = `You are a prompt engineer for an image generation model. 
The user wants to generate a completely textless, visual representation for the Spanish concept "${conceptoEspanol}".
Provide ONLY a concise visual description in English of what the image should show. 
DO NOT use the word itself. 
For example, if the concept is "mañana" (tomorrow), you might output: "A calendar page with an arrow pointing to the next day". 
If it is "ayer" (yesterday), you might output: "An hourglass with sand at the bottom". 
If it is an animal like "perro", output: "A cute dog".
Provide ONLY the visual description in English. Absolutely no intro, no quotes, no text.`;
        
        const result = await model.generateContent(prompt);
        return result.response.text().trim().replace(/['"]/g, ''); 
    } catch (error) {
        console.error("Error al generar descripcion visual con Gemini:", error);
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
  { secrets: [falKey, geminiApiKey] },
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
         concepto = await getVisualDescriptionForConcept(wordObj.es, geminiApiKey.value());
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
