import 'dotenv/config';
import { fal } from "@fal-ai/client";

fal.config({
    credentials: process.env.FAL_KEY || process.env.VITE_FAL_KEY
});
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas para guardar en la carpeta public de React
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIR_IMAGENES = path.join(__dirname, '../public/images');

// Asegurarnos de que el directorio de salida exista
if (!fs.existsSync(DIR_IMAGENES)){
    fs.mkdirSync(DIR_IMAGENES, { recursive: true });
}

// Conexión a tu base de datos SQLite
const db = new sqlite3.Database('./vocabulario_aleman.db', (err) => {
    if (err) console.error('❌ Error conectando a SQLite:', err.message);
});

/**
 * Función para descargar la imagen generada y guardarla localmente en formato WebP
 */
async function descargarImagen(url, nombreArchivo) {
    // Normalizamos el nombre: minúsculas, espacios y caracteres especiales a guiones bajos
    const nombreLimpio = nombreArchivo.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
    const rutaCompleta = path.join(DIR_IMAGENES, `${nombreLimpio}.jpeg`);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    await fs.promises.writeFile(rutaCompleta, Buffer.from(buffer));

    return rutaCompleta;
}

/**
 * 🏭 FÁBRICA DE PROMPTS (El Enrutador Lógico)
 * Asigna colores y descripciones físicas según la categoría gramatical
 */
function construirPromptDinamico(conceptoIngles, tipoGramatical) {
    let colorAsignado = "";
    const tipo = tipoGramatical.toLowerCase().trim();

    // Mapeo estricto de colores Material Design
    switch (tipo) {
        // Sustantivos
        case 'der': colorAsignado = "Material Blue hex #4285F4"; break;
        case 'die': colorAsignado = "Material Red hex #EA4335"; break;
        case 'das': colorAsignado = "Material Green hex #34A853"; break;
        
        // Verbos
        case 'verbo':
        case 'acción': 
            colorAsignado = "Material Yellow hex #FBBC05"; 
            break;
            
        // Conceptos abstractos
        case 'w-frage':
        case 'pregunta':
            colorAsignado = "Material Purple hex #9C27B0";
            break;
        case 'preposición':
        case 'preposicion':
            colorAsignado = "Material Orange hex #FF9800";
            break;
        case 'adverbio':
            colorAsignado = "Material Teal hex #009688";
            break;
            
        // Fallback
        default:
            colorAsignado = "Material Grey hex #9E9E9E";
            break;
    }

    // Lógica especial para representaciones espaciales abstractas (ej. debajo, encima)
    if (tipo === 'preposición' || tipo === 'preposicion') {
        return `A pure seamless solid white background hex #FFFFFF. A 3D isometric cute UI icon showing a ${conceptoIngles}. Made of smooth matte soft clay. The dominant primary color of the clay shapes is strictly ${colorAsignado}. Minimalist, simple, zero text.`;
    }

    // Lógica especial para las letras del alfabeto
    if (tipo === 'letra' || tipo === 'alfabeto') {
        return `A pure seamless solid white background hex #FFFFFF. A 3D isometric cute UI icon showing a large chunky 3D block shaped like the uppercase letter ${conceptoIngles}. Both made of smooth matte soft clay. The letter block is strictly Material Grey hex #9E9E9E, and the object next to it has vibrant natural clay colors. Minimalist, simple, zero text.`;
    }

    // Lógica estándar para objetos físicos y conceptos generales
    return `A pure seamless solid white background hex #FFFFFF. A 3D isometric cute little round ${conceptoIngles} made of smooth matte soft clay. The dominant primary color of the object is strictly ${colorAsignado}. Sitting perfectly still. Minimalist, simple, zero text.`;
}

/**
 * Motor central de generación interactuando con FLUX.2
 */
async function generarImagenFLUX(palabraAleman, conceptoIngles, tipoGramatical) {
    const promptFinal = construirPromptDinamico(conceptoIngles, tipoGramatical);
    
    console.log(`\n🎨 Renderizando: ${palabraAleman} (${tipoGramatical})`);
    console.log(`📝 Prompt ensamblado: "${promptFinal}"`);
    
    try {
        const result = await fal.subscribe("fal-ai/flux-2", { 
            input: {
                prompt: promptFinal,
                image_size: "square", // Equivalente a 512x512 (0.25 MP para reducir el costo al 75%)
                num_inference_steps: 28, // (O usa 4 si decidimos correr el modelo schnell)
                guidance_scale: 3.0,
                output_format: "jpeg"
            }
        });

        const imageUrl = result.data.images[0].url;
        const rutaLocal = await descargarImagen(imageUrl, palabraAleman);
        console.log(`💾 Guardado exitosamente en: ${rutaLocal}`);
        
        return rutaLocal;

    } catch (error) {
        console.error(`❌ Error generando ${palabraAleman}:`, error);
        if (error.body && error.body.detail) console.error(JSON.stringify(error.body.detail, null, 2));
        return null;
    }
}

/**
 * Función principal: Filtra por Kapitel, procesa la cola y maneja Rate Limits
 */
async function procesarLoteDeImagenes(numeroKapitel) {
    console.log(`\n=========================================`);
    console.log(`🚀 INICIANDO PROCESAMIENTO: KAPITEL ${numeroKapitel}`);
    console.log(`=========================================\n`);

    const query = `
        SELECT id, palabra_aleman, concepto_ingles, tipo_gramatical 
        FROM vocabulario 
        WHERE estado_imagen = 'pendiente' AND kapitel = ?
    `;

    db.all(query, [numeroKapitel], async (err, filas) => {
        if (err) {
            console.error("Error ejecutando la consulta en SQLite:", err);
            return;
        }

        if (filas.length === 0) {
            console.log(`✅ No hay palabras pendientes de procesar para el Kapitel ${numeroKapitel}.`);
            db.close();
            return;
        }

        console.log(`Se encontraron ${filas.length} flashcards en cola de renderizado.\n`);

        for (const fila of filas) {
            const ruta = await generarImagenFLUX(fila.palabra_aleman, fila.concepto_ingles, fila.tipo_gramatical);
            
            if (ruta) {
                const nombreLimpio = fila.palabra_aleman.replace(/[\s\/?!\\,.]+/g, '_').toLowerCase();
                const rutaRelativa = `/images/${nombreLimpio}.jpeg`;
                
                db.run(`UPDATE vocabulario SET estado_imagen = 'completado', ruta_imagen = ? WHERE id = ?`, 
                    [rutaRelativa, fila.id], 
                    (updateErr) => {
                        if (updateErr) console.error(`Error actualizando base de datos para ${fila.palabra_aleman}:`, updateErr);
                        else console.log(`🔄 Base de datos sincronizada para: ${fila.palabra_aleman}`);
                    }
                );
            }
            
            // Pausa de 2.5 segundos para evitar bloqueos por Rate Limit de la API
            await new Promise(resolve => setTimeout(resolve, 2500));
        }
        
        console.log(`\n🎉 Motor de renderizado finalizado para el Kapitel ${numeroKapitel}.`);
        db.close();
    });
}

// ==========================================
// ⚙️ PUNTO DE EJECUCIÓN DEL SCRIPT
// ==========================================
// Cambia este número para procesar distintos bloques (ej. 0, 1, 2, 3...)
const KAPITEL_ACTUAL = 0; 
procesarLoteDeImagenes(KAPITEL_ACTUAL);
