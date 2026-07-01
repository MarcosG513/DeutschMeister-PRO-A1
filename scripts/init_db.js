import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../vocabulario_aleman.db');
const JSON_PATH = path.join(__dirname, '../vocabulario_completo.json');

// Crear y/o conectar a la base de datos
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Error abriendo SQLite:', err.message);
        process.exit(1);
    }
    console.log('✅ Conectado a vocabulario_aleman.db');
});

// Inicializar base de datos
db.serialize(() => {
    // 1. Crear tabla vocabulario
    db.run(`
        CREATE TABLE IF NOT EXISTS vocabulario (
            id TEXT PRIMARY KEY,
            palabra_aleman TEXT,
            concepto_ingles TEXT,
            tipo_gramatical TEXT,
            prompt_imagen TEXT,
            ruta_imagen TEXT,
            estado_imagen TEXT DEFAULT 'pendiente',
            kapitel INTEGER DEFAULT 0
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creando tabla:', err.message);
            process.exit(1);
        }
        console.log('✅ Tabla vocabulario asegurada.');
    });

    // 2. Leer JSON e insertar datos
    fs.readFile(JSON_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error leyendo vocabulario_completo.json:', err.message);
            process.exit(1);
        }

        const vocabularioArray = JSON.parse(data);
        console.log(`📦 Encontrados ${vocabularioArray.length} registros en el JSON.`);

        const stmt = db.prepare(`
            INSERT OR IGNORE INTO vocabulario (
                id, palabra_aleman, concepto_ingles, tipo_gramatical, 
                prompt_imagen, ruta_imagen, estado_imagen, kapitel
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        let insertados = 0;
        
        db.run('BEGIN TRANSACTION');
        vocabularioArray.forEach((item) => {
            // Manejamos las propiedades de tu JSON (id, word) u otras si existieran
            const id = item.id || `gen_${Math.random().toString(36).substr(2, 9)}`;
            const palabra_aleman = item.word || item.palabra_aleman || "";
            const concepto_ingles = item.concepto_ingles || "";
            const tipo_gramatical = item.tipo_gramatical || "";
            const prompt_imagen = item.prompt_imagen || null;
            const ruta_imagen = item.ruta_imagen || null;
            const estado_imagen = item.estado_imagen || "pendiente";
            const kapitel = item.kapitel !== undefined ? item.kapitel : 0;

            stmt.run([
                id, palabra_aleman, concepto_ingles, tipo_gramatical, 
                prompt_imagen, ruta_imagen, estado_imagen, kapitel
            ]);
            insertados++;
        });

        stmt.finalize();
        db.run('COMMIT', (err) => {
            if (err) {
                console.error("❌ Error haciendo commit:", err);
            } else {
                console.log(`🎉 Inserción masiva completada. ${insertados} registros procesados.`);
            }
            db.close();
        });
    });
});
