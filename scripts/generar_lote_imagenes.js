// scripts/generar_lote_imagenes.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { fal } from '@fal-ai/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Configuración de rutas para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno (FAL_KEY)
dotenv.config({ path: path.join(__dirname, '../.env') });
if (!process.env.FAL_KEY && process.env.VITE_FAL_KEY) {
  process.env.FAL_KEY = process.env.VITE_FAL_KEY;
}

// ---------------------------------------------------------
// 1. CONFIGURACIÓN DE FIREBASE ADMIN
// ---------------------------------------------------------
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Faltan credenciales. Crea 'serviceAccountKey.json' en /scripts");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Inicializar Firebase Admin (Sin Storage, usaremos Base64 en Firestore como la app)
const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

// ---------------------------------------------------------
// 2. DICCIONARIOS Y FÁBRICA DE PROMPTS (ARTE CORREGIDO)
// ---------------------------------------------------------
const diccionarioLetras = { "a": "Letter A", "b": "Letter B" };
const diccionarioNumeros = { "1": "Number one", "2": "Number two" };
const diccionarioPreguntas = { "wer": "silhouette of a person", "wie": "question mark", "was": "mystery box", "wo": "map pin", "wann": "clock", "warum": "question mark with a lightbulb" };

// TODO: Extraer esta función a un módulo compartido (ej. shared/promptFactory.js)
function construirPromptDinamico(palabraObj) {
  let colorAsignado = "hex #9E9E9E"; // Gris por defecto
  let type = (palabraObj.type || "").toLowerCase().trim();
  let de = (palabraObj.de || "").toLowerCase().trim();
  
  const diasYMeses = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag", 
                      "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  
  const isSinGenero = type.includes("adverbio") || type.includes("adjetivo") || type.includes("pronombre") || type.includes("expresión") || type.includes("conjunción");
  const esPregunta = type.includes("pregunta") || type.includes("w-frage");
  
  // 🔥 Detección de conceptos abstractos para activar el filtro Anti-Caritas
  const esAbstracto = type.includes("verbo") || type.includes("acción") || type.includes("preposición") || isSinGenero;

  // Asignación estricta de color HEX por género/tipo
  if (type.includes("verbo") || type.includes("acción")) colorAsignado = "hex #FBBC05"; // Amarillo
  else if (diasYMeses.some(d => de.includes(d.toLowerCase()))) colorAsignado = "hex #4285F4"; // Azul forzado
  else if (de.startsWith("der ")) colorAsignado = "hex #4285F4"; // Azul
  else if (de.startsWith("die ")) colorAsignado = "hex #EA4335"; // Rojo
  else if (de.startsWith("das ")) colorAsignado = "hex #34A853"; // Verde
  else if (type.includes("preposición") || type.includes("preposicion")) colorAsignado = "hex #FF9800"; // Naranja
  else if (esPregunta) colorAsignado = "hex #9C27B0"; // Morado

  let englishConcept = palabraObj.en || palabraObj.concepto_ingles || palabraObj.es;
  
  let promptObj = {};

  // 🛡️ REGLAS DE ESTILO BASE
  let styleRules = "Strictly purely visual: absolutely NO TEXT, NO LETTERS, NO WORDS. Minimalist, simple.";
  
  // 🛡️ REGLA CRÍTICA PARA ABSTRACTOS: Cero antropomorfismo
  if (esAbstracto) {
    styleRules += " CRITICAL: Must be an INANIMATE object or symbolic prop. Absolutely NO FACES, NO EYES, NO MOUTHS, NO ANIMALS, NO CHARACTERS, NO ANTHROPOMORPHISM.";
  }

  if (esPregunta) {
    let preguntaConcept = diccionarioPreguntas[de] || "question mark";
    promptObj = {
      subject: `A 3D isometric large ${preguntaConcept} symbol made of smooth matte soft clay, colored strictly in ${colorAsignado}.`,
      setting: "A pure seamless solid white background hex #FFFFFF.",
      style_rules: styleRules
    };
  } else if (de.length === 1 && diccionarioLetras[de]) {
    promptObj = {
      subject: `A 3D isometric large ${diccionarioLetras[de]} made of smooth matte soft clay, colored strictly in ${colorAsignado}.`,
      setting: "A pure seamless solid white background hex #FFFFFF.",
      style_rules: styleRules
    };
  } else {
    
    // 🧱 Cambio de semántica en el Sujeto dependiendo de si es abstracto o sustantivo
    let subjectText = `A 3D isometric UI icon of "${englishConcept}", rendered in its natural, realistic, and vibrant colors. Made of smooth matte soft clay.`;
    
    if (esAbstracto) {
       subjectText = `A 3D isometric faceless inanimate object or symbolic prop representing the concept of "${englishConcept}". Made of smooth matte soft clay.`;
    }

    promptObj = {
      subject: subjectText,
      setting: "A pure seamless solid white background hex #FFFFFF.",
      style_rules: styleRules
    };
    
    if (!isSinGenero) {
       promptObj.gender_indicator = `A magical glowing sphere floating gently next to the main subject. The dominant primary color of the sphere is strictly ${colorAsignado}.`;
    }
  }
  
  return JSON.stringify(promptObj);
}

function getSafeId(word) {
  return word.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
}

// ---------------------------------------------------------
// 3. CONTROL DE FLUJO Y EJECUCIÓN
// ---------------------------------------------------------
async function procesarLote() {
  console.log("🚀 Iniciando pre-generación masiva con FLUX.2 Klein...");

  const vocabPath = path.join(__dirname, 'vocabulario.json');
  if (!fs.existsSync(vocabPath)) {
    console.error("❌ Archivo vocabulario.json no encontrado en /scripts.");
    process.exit(1);
  }
  
  const vocabulario = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
  console.log(`📚 Se han cargado ${vocabulario.length} palabras para procesar.`);

  for (const wordObj of vocabulario) {
    const safeId = getSafeId(wordObj.de);
    const globalDocRef = db.collection('global_flashcards').doc(safeId);
    const globalDocSnap = await globalDocRef.get();
    
    if (globalDocSnap.exists) {
      console.log(`⏭️ Saltando [${wordObj.de}] - Ya existe en global_flashcards (asumida como FLUX.2 Klein)`);
      continue;
    }

    console.log(`⏳ Generando [${wordObj.de}]...`);
    
    try {
      const prompt = construirPromptDinamico(wordObj);

      // Llamada estricta a Fal.ai (Flux.2 Klein)
      const result = await fal.subscribe("fal-ai/flux-2/klein/9b/base", {
        input: {
          prompt: prompt,
          image_size: { width: 512, height: 512 },
          num_inference_steps: 20,
          guidance_scale: 3.5,
          output_format: "jpeg"
        },
        logs: false
      });

      const falImageUrl = result.data?.images?.[0]?.url;
      if (!falImageUrl) throw new Error("Fal.ai no devolvió una URL válida.");

      // Descargar buffer desde Fal.ai
      const response = await fetch(falImageUrl);
      if (!response.ok) throw new Error(`Error descargando imagen: ${response.statusText}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Convertir a Data URI (Base64) como lo usa la app originalmente
      const base64DataUri = "data:image/jpeg;base64," + buffer.toString('base64');

      // Guardar el masivo string Base64 en global_flashcards
      await globalDocRef.set({
        imageUrl: base64DataUri,
        model: "fal-ai/flux-2/klein/9b/base",
        updatedAt: new Date().toISOString()
      }, { merge: true });

      console.log(`✅ Éxito [${wordObj.de}]: Reemplazada en global_flashcards y actualizada a FLUX.2 Klein.`);

      // -- DELAY PROTECTOR DE SOCKETS / RATE LIMIT --
      await new Promise(r => setTimeout(r, 1000));

    } catch (error) {
      console.error(`❌ Error procesando [${wordObj.de}]:`, error.message || error);
      // Si el error es sobre la infraestructura (ej. el bucket no existe), detenemos todo para no gastar saldo de IA en vano.
      if (error.message && (error.message.includes('bucket') || error.message.includes('404'))) {
        console.error("🛑 FATAL ERROR: Problema con Firebase Storage detectado. Deteniendo el script para proteger tu saldo de Fal.ai.");
        process.exit(1);
      }
    }
  }
  
  console.log("🎉 Proceso masivo finalizado exitosamente.");
}

procesarLote();
