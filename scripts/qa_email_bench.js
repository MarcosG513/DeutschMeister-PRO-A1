// scripts/qa_email_bench.js
// Suite de auditoría para evaluateEmail (Goethe Zertifikat Schreiben A1)
// Arquitectura: throttling 7s · onCall JSON · Claude Sonnet 5 como juez

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { fal } from '@fal-ai/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const FAL_KEY = process.env.VITE_FAL_KEY;
if (!FAL_KEY) {
  console.error("❌ FAL_KEY no encontrada en el archivo .env");
  process.exit(1);
}
fal.config({ credentials: FAL_KEY });

// URL de Producción confirmada
const ENDPOINT_URL = "https://evaluateemail-44keyii6gq-uc.a.run.app"; 

// ─── Casos de Prueba (Trampas Gramaticales A1) ───────────────────────────
const testCases = [
  { 
    consignaExamen: "Escribe un correo a tu profesor (Herr Müller) para decirle que estás enfermo y no puedes ir a clase hoy.",
    textoCorreo: "Hallo Herr Müller, ich bin krank. Ich kann nicht zur Schule gehen, weil ich habe Fieber. Viele Grüße.",
    label: "Error posición verbo (weil) y saludo informal",
    trampas: "El saludo debe ser formal (Sehr geehrter...). El verbo 'habe' debe ir al final por usar 'weil'."
  },
  { 
    consignaExamen: "Responde a la invitación de fiesta de tu amigo Thomas. Acepta la invitación y pregunta qué puedes llevar.",
    textoCorreo: "Lieber Thomas, danke für die Einladung! Ich komme gern an deine Party. Was kann ich mitbringen?",
    label: "Error de preposición (an vs zu)",
    trampas: "Debería ser 'zu deiner Party', no 'an deine Party'."
  },
  { 
    consignaExamen: "Escribe al hotel 'Zentral' para reservar una habitación doble por dos noches.",
    textoCorreo: "Sehr geehrte Damen und Herren, ich möchte ein Doppelzimmer für zwei Nächte buchen. Mit freundlichen Grüßen.",
    label: "Correo Perfecto A1",
    trampas: "Ninguna. El correo es gramaticalmente perfecto y adecuado para el nivel A1."
  }
];

// ─── Función de petición HTTPS Callable ─────────────────────────────────────
async function sendRequest(testCase, index) {
  const payload = { 
    data: { 
      textoCorreo: testCase.textoCorreo, 
      consignaExamen: testCase.consignaExamen 
    } 
  };
  const startTime = Date.now();
  
  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const jsonRes = await response.json();
    const responseData = jsonRes.result || jsonRes.data; 
    const latency = Date.now() - startTime;
    
    return { index, label: testCase.label, testCase, success: true, data: responseData, latency, provider: "DeepSeek V3.2" };
  } catch (err) {
    const latency = Date.now() - startTime;
    return { index, label: testCase.label, testCase, success: false, error: err.message, latency, provider: "Fallo" };
  }
}

// ─── Juez: Claude Sonnet 5 via Fal.ai ───────────────────────────────────────
async function runJudge(testCase, outputData) {
  // Asegurar que pasamos string del outputData (que es el markdown de respuesta de evaluateEmail)
  const outputStr = typeof outputData === 'object' ? JSON.stringify(outputData, null, 2) : outputData;
  const promptJuez = `
Actúa como Auditor Jefe de Evaluación Lingüística (Alemán A1).
Consigna del examen: "${testCase.consignaExamen}"
Correo del estudiante: "${testCase.textoCorreo}"
Errores reales (Trampas ocultas): ${testCase.trampas}

Evaluación generada por nuestra IA (DeepSeek V3.2):
${outputStr}

Evalúa la precisión de nuestra IA bajo estos 3 criterios (Puntaje de 0 a 10):
1. PRECISIÓN DE DETECCIÓN: ¿La IA detectó correctamente los errores ocultos (si los hay) o reconoció que es perfecto?
2. TONO PEDAGÓGICO: ¿La IA explica los errores de forma amigable, constructiva y adecuada para un estudiante principiante (A1)?
3. ESTRUCTURA MARKDOWN: ¿La evaluación está bien estructurada y es fácil de leer?

Responde ÚNICAMENTE con un JSON exacto, sin código markdown ni texto adicional:
{
  "score": 9,
  "feedback": "Explicación breve evaluando los 3 criterios."
}
`;

  try {
    const result = await fal.subscribe("openrouter/router/enterprise", {
      input: {
        model: "anthropic/claude-sonnet-5",
        prompt: promptJuez,
        temperature: 0.1
      }
    });
    const output = result.data.output || "";
    const cleanJson = output.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    return { score: "N/A", feedback: "Fallo en la evaluación del Juez: " + err.message };
  }
}

// ─── Motor de Auditoría ─────────────────────────────────────────────────────
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const DELAY_MS = 7000; 

async function main() {
  console.log(`🚀 Iniciando Auditoría de Evaluador de Correos (${testCases.length} casos)...\n`);
  const results = [];
  
  for (let idx = 0; idx < testCases.length; idx++) {
    if (idx > 0) {
      console.log(`⏳ Esperando ${DELAY_MS / 1000}s (Throttling API)...`);
      await sleep(DELAY_MS);
    }
    console.log(`✉️ Procesando Caso #${idx + 1} [${testCases[idx].label}]...`);
    const result = await sendRequest(testCases[idx], idx + 1);
    results.push(result);
    const status = result.success ? '✅' : '❌';
    console.log(`${status} Resultado recibido en ${result.latency}ms`);
  }
  
  console.log("\n⚖️ Evaluando precisión con Claude Sonnet 5...\n");
  const evaluated = [];
  
  for (const res of results) {
    if (res.success && res.data) {
      console.log(`⚖️ Evaluando Caso #${res.index}...`);
      // Si la respuesta de evaluateEmail es { output: "..." }, la extraemos
      const dataStr = res.data.output || res.data;
      const evaluation = await runJudge(res.testCase, dataStr);
      evaluated.push({ ...res, score: evaluation.score, feedback: evaluation.feedback, evaluatedData: dataStr });
    } else {
      evaluated.push({ ...res, score: 0, feedback: res.error || "Sin evaluación generada.", evaluatedData: "" });
    }
  }

  // Generar Reporte Markdown
  const validScores = evaluated.filter(r => typeof r.score === 'number').map(r => r.score);
  const avgScore = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2) : "N/A";
  
  let markdown = `# Informe de Auditoría — Evaluador de Correos IA ✉️\n\n`;
  markdown += `**Nota Media Global:** **${avgScore}/10**\n\n`;
  markdown += `## Resultados Detallados\n\n`;
  
  evaluated.forEach(r => {
    markdown += `### Caso #${r.index}: ${r.label}\n`;
    markdown += `* **Latencia:** ${r.latency}ms\n`;
    markdown += `* **Score Claude 5:** **${r.score}/10**\n`;
    markdown += `* **Feedback del Juez:** ${r.feedback}\n\n`;
    if (r.success) {
      markdown += `**Evaluación Generada por DeepSeek:**\n\n${r.evaluatedData}\n\n`;
    }
    markdown += `---\n\n`;
  });

  const reportPath = path.join(__dirname, '../informe_email_qa_claude5.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`\n🎉 Informe generado con éxito en: ${reportPath}`);
  console.log(`📊 Nota media final: ${avgScore}/10`);
}

main().catch(err => console.error("Error crítico:", err));
