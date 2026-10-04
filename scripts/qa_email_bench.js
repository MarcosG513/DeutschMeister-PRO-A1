import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL confirmada de tu entorno de producción
const ENDPOINT_URL = "https://evaluateemail-44keyii6gq-uc.a.run.app";

const testCases = [
  {
    label: "Formal - Profesor (Registro Incorrecto)",
    consigna: "Escribe un correo a tu profesor Herr Müller. Dile que estás enfermo y no puedes ir a clase. Escribe aprox. 30 palabras.",
    texto: "Hallo Herr Müller, ich bin krank. Ich komme nicht zur Schule. Viele Grüße, Juan"
  },
  {
    label: "Informal - Amigo (Error Preposición)",
    consigna: "Escribe a tu amiga Anna. Invítala a tu fiesta el sábado. Escribe aprox. 30 palabras.",
    texto: "Liebe Anna, ich mache eine Party. Kommst du zu Samstag? Liebe Grüße, Maria"
  },
  {
    label: "Formal - Hotel (Extensión Corta)",
    consigna: "Escribe al Hotel Zentral. Reserva una habitación doble para zwei Nächte. Escribe aprox. 30 palabras.",
    texto: "Sehr geehrte Damen und Herren, ich brauche ein Zimmer. Danke."
  }
];

// Helper de Throttling para proteger el Free Tier
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendRequest(testCase, index, isRetry = false) {
  const payload = { data: { textoCorreo: testCase.texto, consignaExamen: testCase.consigna } };
  const startTime = Date.now();
  
  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Connection": "close"
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    const latency = Date.now() - startTime;
    
    const responseText = result.result?.text || result.result || result.data || JSON.stringify(result);
    
    return { index, label: testCase.label, consigna: testCase.consigna, texto: testCase.texto, success: true, text: responseText, latency };
  } catch (err) {
    if (!isRetry) {
      console.log(`⚠️ Reintentando Caso #${index} por reconexión de socket...`);
      await sleep(1000);
      return sendRequest(testCase, index, true);
    }
    const latency = Date.now() - startTime;
    return { index, label: testCase.label, consigna: testCase.consigna, texto: testCase.texto, success: false, error: err.message, latency };
  }
}

async function main() {
  console.log("📨 Iniciando auditoría a COSTO $0 (Modo Runner con Throttling)...");
  const results = [];
  
  for (let i = 0; i < testCases.length; i++) {
    if (i > 0) {
        console.log("⏳ Esperando 5 segundos para refrescar el Round-Robin y evitar activar el fallback a Fal.ai...");
        await sleep(5000);
    }
    const res = await sendRequest(testCases[i], i + 1);
    results.push(res);
    console.log(`[${res.success ? '✅' : '❌'}] Caso #${res.index} — Latencia: ${res.latency}ms`);
  }
  
  console.log("\n📝 Guardando respuestas en bruto...");
  
  let md = `# Datos en Bruto - Auditoría Email Evaluator (Costo Estricto $0)\n\n`;
  
  results.forEach(r => {
    md += `### Caso #${r.index}: ${r.label}\n`;
    md += `- **Latencia:** ${r.latency}ms\n`;
    md += `- **Consigna:** "${r.consigna}"\n`;
    md += `- **Texto Alumno:** "${r.texto}"\n`;
    md += `- **Respuesta del Servidor:**\n\n> ${typeof r.text === 'object' ? JSON.stringify(r.text, null, 2) : r.text}\n\n`;
    md += `---\n\n`;
  });
  
  const rawPath = path.join(__dirname, '../informe_email_raw.md');
  fs.writeFileSync(rawPath, md, 'utf8');
  console.log(`\n🎉 Archivo de datos generado en: ${rawPath}`);
}

main().catch(console.error);
