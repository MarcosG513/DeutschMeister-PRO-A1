import sqlite3 from 'sqlite3';

// Conexión a tu base de datos SQLite
const db = new sqlite3.Database('./vocabulario_aleman.db', (err) => {
    if (err) console.error('❌ Error conectando a SQLite:', err.message);
});

/**
 * 🛟 DICCIONARIO DE RESCATE (Conceptos Abstractos)
 * Mapea palabras que la IA no puede dibujar por sí sola a objetos físicos en inglés.
 */
const diccionarioEspecial = {
    "Mittwoch": "desk calendar page showing Wednesday",
    "Montag": "desk calendar page showing Monday",
    "heute": "3D desk calendar page",
    "warum?": "large 3D question mark symbol",
    "wo?": "large 3D map location pin",
    "wann?": "3D clock or hourglass",
    "wer?": "3D blank profile avatar",
    "was?": "3D mystery box",
    "auf": "sphere resting directly on top of a cube",
    "unter": "sphere hiding directly underneath a cube",
    "springen": "jumping frog" // Puedes ir agregando verbos aquí según lo necesites
};

const diccionarioLetras = {
    "A, a": "A, with a shiny red apple sitting right next to it",
    "B, b": "B, with a yellow banana sitting right next to it",
    "C, c": "C, with a cute little chameleon sitting right next to it",
    "D, d": "D, with a cute little dog sitting right next to it",
    "E, e": "E, with a cute little elephant sitting right next to it",
    "F, f": "F, with a cute green frog sitting right next to it",
    "G, g": "G, with a tall cute giraffe sitting right next to it",
    "H, h": "H, with a small cute 3D house sitting right next to it",
    "I, i": "I, with a small snowy igloo sitting right next to it",
    "J, j": "J, with a folded colorful jacket sitting right next to it",
    "K, k": "K, with a cute little kitten sitting right next to it",
    "L, l": "L, with a cute little lion sitting right next to it",
    "M, m": "M, with a cute small mouse sitting right next to it",
    "N, n": "N, with a cute bird nest holding eggs sitting right next to it",
    "O, o": "O, with a bright orange fruit sitting right next to it",
    "P, p": "P, with a cute little penguin sitting right next to it",
    "Q, q": "Q, with a shiny golden queen crown sitting right next to it",
    "R, r": "R, with a beautiful red rose sitting right next to it",
    "S, s": "S, with a bright yellow sun sitting right next to it",
    "T, t": "T, with a small green tree sitting right next to it",
    "U, u": "U, with a colorful open umbrella sitting right next to it",
    "V, v": "V, with a small wooden violin sitting right next to it",
    "W, w": "W, with a cute little blue whale sitting right next to it",
    "X, x": "X, with a colorful toy xylophone sitting right next to it",
    "Y, y": "Y, with a yellow toy yo-yo sitting right next to it",
    "Z, z": "Z, with a cute little zebra sitting right next to it",
    "Ä, ä": "Ä, with two shiny red apples sitting right next to it",
    "Ö, ö": "Ö, with a small glass bottle of olive oil sitting right next to it",
    "Ü, ü": "Ü, with a cute small UFO toy sitting right next to it",
    "ß": "ß, with a small blank street sign sitting right next to it"
};

/**
 * 🧠 MOTOR HEURÍSTICO
 * Deduce la gramática a partir de la estructura del string en alemán.
 */
function clasificarYTraducir(palabra) {
    const p = palabra.trim();
    
    // 1. REGLA DE SUSTANTIVOS (der, die, das)
    if (p.startsWith('der ')) return { tipo: 'der', concepto: p.replace('der ', '') };
    if (p.startsWith('die ')) return { tipo: 'die', concepto: p.replace('die ', '') };
    if (p.startsWith('das ')) return { tipo: 'das', concepto: p.replace('das ', '') };
    
    // 2. REGLA DE PREGUNTAS (W-Fragen)
    if (p.includes('?')) return { tipo: 'w-frage', concepto: 'large 3D question mark symbol' };
    
    // 3. REGLA DE VERBOS (Empiezan en minúscula y terminan en 'en' o 'rn')
    const primeraLetra = p.charAt(0);
    if (primeraLetra === primeraLetra.toLowerCase() && (p.endsWith('en') || p.endsWith('rn'))) {
        return { tipo: 'verbo', concepto: p }; // Se pasa el verbo en alemán, FLUX intentará interpretarlo
    }
    
    // 4. REGLA DE LETRAS
    if (diccionarioLetras[palabra]) {
        return { tipo: 'letra', concepto: diccionarioLetras[palabra] };
    }
    
    // 5. FALLBACK: Adverbios, números, preposiciones
    return { tipo: 'adverbio', concepto: p }; 
}

// Ejecución del parcheo masivo
db.serialize(() => {
    console.log("🛠️ Iniciando parcheo heurístico en la base de datos...");
    
    db.all("SELECT id, palabra_aleman FROM vocabulario", [], (err, filas) => {
        if (err) {
            console.error("Error leyendo la base de datos:", err);
            return;
        }
        
        let actualizados = 0;
        let errores = 0;

        filas.forEach(fila => {
            const palabra = fila.palabra_aleman;
            
            // Pasamos la palabra por el motor heurístico
            let { tipo, concepto } = clasificarYTraducir(palabra);
            
            // Si la palabra está en nuestro diccionario de rescate, sobrescribimos el concepto
            if (diccionarioEspecial[palabra]) {
                concepto = diccionarioEspecial[palabra];
            }
            
            // Inyectamos los datos faltantes en la base de datos
            db.run(`UPDATE vocabulario SET tipo_gramatical = ?, concepto_ingles = ? WHERE id = ?`, 
                [tipo, concepto, fila.id], 
                (updateErr) => {
                    if (updateErr) errores++;
                }
            );
            actualizados++;
        });
        
        // Damos tiempo a las transacciones de SQLite para terminar
        setTimeout(() => {
            console.log(`\n✅ Parche aplicado exitosamente a ${actualizados} registros.`);
            if (errores > 0) console.log(`⚠️ Hubo ${errores} errores en el proceso.`);
            db.close();
        }, 1500);
    });
});
