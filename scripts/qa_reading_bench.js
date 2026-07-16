// scripts/qa_reading_bench.js
// Suite de auditoría para generateReadingTest
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

// ⚠️ REEMPLAZA ESTO CON LA URL DE TU CLOUD FUNCTION generateReadingTest
const ENDPOINT_URL = "https://generatereadingtest-44keyii6gq-uc.a.run.app"; 

// ─── 5 Casos de Prueba (Nivel A1) ──────────────────────────────────────────
const testCases = [
  { tema: "Mi rutina diaria por la mañana", label: "Rutina Diaria" },
  { tema: "Haciendo las compras en el supermercado", label: "Supermercado" },
  { tema: "Mi familia y mis mascotas", label: "Familia" },
  { tema: "Viajando en tren desde Múnich a Berlín", label: "Estación de tren" },
  { tema: "El clima en Alemania durante el invierno", label: "El Clima" }
];

// ─── Función de petición HTTPS Callable ─────────────────────────────────────
async function sendRequest(testCase, index) {
  // Payload estándar para funciones onCall de Firebase
  const payload = { data: { tema: testCase.tema } };
  const startTime = Date.now();
  
  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const jsonRes = await response.json();
    const responseData = jsonRes.result || jsonRes.data; // Desenvolver onCall
    
    const latency = Date.now() - startTime;
    // Heurística de fallback: Gemini Flash suele responder < 5s. Si tarda más, es probable que actuara DeepSeek.
    const provider = latency > 6500 ? "DeepSeek V3.2 (Fallback)" : "Gemini 3.5 Flash";
    
    return { index, label: testCase.label, tema: testCase.tema, success: true, data: responseData, latency, provider };
  } catch (err) {
    const latency = Date.now() - startTime;
    return { index, label: testCase.label, tema: testCase.tema, success: false, error: err.message, latency, provider: "Fallo" };
  }
}

// ─── Juez: Claude Sonnet 5 via Fal.ai ───────────────────────────────────────
async function runJudge(testCase, outputData) {
  const promptJuez = `
Actúa como Evaluador Pedagógico de Alemán A1.
Tema solicitado por el usuario: "${testCase.tema}"
JSON Generado por la IA:
${JSON.stringify(outputData, null, 2)}

Evalúa la calidad del texto y las preguntas bajo estos 3 criterios (Puntaje de 0 a 10):
1. NIVEL A1 ESTRICTO: ¿El texto principal utiliza oraciones cortas, gramática básica y vocabulario cotidiano?
2. COHERENCIA DE PREGUNTAS: ¿Hay exactamente 3 preguntas y la respuesta correcta indicada es lógicamente correcta basada en el texto?
3. CALIDAD SOCRÁTICA: ¿La "explicacion_espanol" es didáctica, clara y ayuda al estudiante a entender el porqué de la respuesta?

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
const DELAY_MS = 7000; // Throttling de 7 segundos

async function main() {
  console.log(`🚀 Iniciando Auditoría de Comprensión Lectora (${testCases.length} casos)...\n`);
  const results = [];
  
  for (let idx = 0; idx < testCases.length; idx++) {
    if (idx > 0) {
      console.log(`⏳ Esperando ${DELAY_MS / 1000}s (Throttling API)...`);
      await sleep(DELAY_MS);
    }
    const result = await sendRequest(testCases[idx], idx + 1);
    results.push(result);
    const status = result.success ? '✅' : '❌';
    console.log(`${status} Caso #${result.index} [${result.label}] [${result.provider}] — ${result.latency}ms`);
  }
  
  console.log("\n⚖️ Evaluando calidad pedagógica con Claude Sonnet 5...\n");
  const evaluated = [];
  
  for (const res of results) {
    if (res.success && res.data) {
      console.log(`⚖️ Evaluando Caso #${res.index} — ${res.label}...`);
      const evaluation = await runJudge(testCases[res.index - 1], res.data);
      evaluated.push({ ...res, score: evaluation.score, feedback: evaluation.feedback });
    } else {
      evaluated.push({ ...res, score: 0, feedback: res.error || "Sin JSON válido." });
    }
  }

  // Generar Reporte Markdown
  const validScores = evaluated.filter(r => typeof r.score === 'number').map(r => r.score);
  const avgScore = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2) : "N/A";
  
  let markdown = `# Informe de Auditoría — Comprensión Lectora 📖\n\n`;
  markdown += `**Nota Media Global:** **${avgScore}/10**\n\n`;
  markdown += `## Resultados Detallados\n\n`;
  
  evaluated.forEach(r => {
    markdown += `### Caso #${r.index}: ${r.label}\n`;
    markdown += `* **Tema:** ${r.tema}\n`;
    markdown += `* **Proveedor:** ${r.provider} (${r.latency}ms)\n`;
    markdown += `* **Score Claude 5:** **${r.score}/10**\n`;
    markdown += `* **Feedback:** ${r.feedback}\n\n`;
    if (r.success) {
      markdown += `**JSON Generado:**\n\`\`\`json\n${JSON.stringify(r.data, null, 2)}\n\`\`\`\n\n`;
    }
    markdown += `---\n\n`;
  });

  const reportPath = path.join(__dirname, '../informe_reading_qa_claude5.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`\n🎉 Informe generado con éxito en: ${reportPath}`);
  console.log(`📊 Nota media final: ${avgScore}/10`);
}

main().catch(err => console.error("Error crítico:", err));
