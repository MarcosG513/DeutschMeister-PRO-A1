import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../src/data/chapters.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Reemplazos quirúrgicos de Mojibake
let cleanContent = content
  .replace(/➡´©Å/g, '➡️')
  .replace(/✈´©Å/g, '✈️')
  .replace(/✉´©Å/g, '✉️')
  .replace(/✍´©Å/g, '✍️')
  .replace(/\u00ad?ƒÆí/g, '💡')
  .replace(/´©Å/g, '️'); // Fallback para cualquier otro selector de variante corrupto

if (content !== cleanContent) {
  fs.writeFileSync(filePath, cleanContent, 'utf8');
  console.log("✅ Limpieza de emojis completada con éxito. Mojibake erradicado.");
} else {
  console.log("⚠️ No se encontraron caracteres corruptos.");
}
