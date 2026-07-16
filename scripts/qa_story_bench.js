// scripts/qa_story_bench.js
// Suite de auditoría para generateStory (Cuentos IA)
// Arquitectura: throttling 7s · Endpoint POST · Claude Sonnet 5 como juez

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
const ENDPOINT_URL = "https://generatestory-44keyii6gq-uc.a.run.app"; 

// ─── 5 Casos de Prueba (Lotes de Vocabulario A1) ───────────────────────────
const testCases = [
  { palabras: ["der Apfel", "essen", "lecker"], label: "Comida" },
  { palabras: ["der Bahnhof", "der Zug", "die Fahrkarte"], label: "Estación de tren" },
  { palabras: ["die Familie", "die Mutter", "spielen"], label: "Familia" },
  { palabras: ["kalt", "der Winter", "der Schnee"], label: "El Clima" },
  { palabras: ["der Hund", "laufen", "der Park"], label: "Mascotas" }
];

// ─── Función de petición ──────────────────────────────────────────────────
async function sendRequest(testCase, index) {
  const payload = { data: { palabrasVocabulario: testCase.palabras } };
  const startTime = Date.now();
  
  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const textRes = await response.text();
    // Limpieza de formato SSE si la función devuelve stream 'data: {...}'
    let cleanText = textRes.replace(/^data:\s*/gm, '').trim();
    let jsonOutput;
    
    try {
      jsonOutput = JSON.parse(cleanText);
    } catch(e) {
      // Extracción robusta en caso de múltiples eventos
      const matches = cleanText.match(/\{[\s\S]*\}/);
      if (matches) jsonOutput = JSON.parse(matches);
      else throw new Error("No se pudo parsear el JSON.");
    }
    
    const latency = Date.now() - startTime;
    // Heurística de fallback: Gemini Flash suele responder rápido. Si tarda más, es DeepSeek.
    const provider = latency > 6500 ? "DeepSeek V3.2 (Fallback)" : "Gemini 3.5 Flash";
    
    return { index, label: testCase.label, palabras: testCase.palabras, success: true, data: jsonOutput, latency, provider };
  } catch (err) {
    const latency = Date.now() - startTime;
    return { index, label: testCase.label, palabras: testCase.palabras, success: false, error: err.message, latency, provider: "Fallo" };
  }
}

// ─── Juez: Claude Sonnet 5 via Fal.ai ───────────────────────────────────────
async function runJudge(testCase, outputData) {
  const promptJuez = `
Actúa como Evaluador Pedagógico de Alemán A1.
Palabras clave solicitadas: ${testCase.palabras.join(", ")}
JSON Generado por la IA:
${JSON.stringify(outputData, null, 2)}

Evalúa la calidad del cuento bajo estos 3 criterios (Puntaje de 0 a 10):
1. NIVEL A1 ESTRICTO: ¿El cuento utiliza oraciones cortas, gramática básica y vocabulario cotidiano comprensible para un principiante?
2. INTEGRACIÓN DE VOCABULARIO: ¿Las palabras solicitadas están integradas de forma natural y correcta?
3. CALIDAD DE TRADUCCIÓN: ¿La traducción al español es precisa y ayuda al entendimiento?

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
  console.log(`🚀 Iniciando Auditoría de Generación de Cuentos (${testCases.length} casos)...\n`);
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
  
  let markdown = `# Informe de Auditoría — Generador de Cuentos IA 📖\n\n`;
  markdown += `**Nota Media Global:** **${avgScore}/10**\n\n`;
  markdown += `## Resultados Detallados\n\n`;
  
  evaluated.forEach(r => {
    markdown += `### Caso #${r.index}: ${r.label}\n`;
    markdown += `* **Palabras Clave:** ${r.palabras.join(", ")}\n`;
    markdown += `* **Proveedor:** ${r.provider} (${r.latency}ms)\n`;
    markdown += `* **Score Claude 5:** **${r.score}/10**\n`;
    markdown += `* **Feedback:** ${r.feedback}\n\n`;
    if (r.success) {
      markdown += `**JSON Generado:**\n\`\`\`json\n${JSON.stringify(r.data, null, 2)}\n\`\`\`\n\n`;
    }
    markdown += `---\n\n`;
  });

  const reportPath = path.join(__dirname, '../informe_story_qa_claude5.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`\n🎉 Informe generado con éxito en: ${reportPath}`);
  console.log(`📊 Nota media final: ${avgScore}/10`);
}

main().catch(err => console.error("Error crítico:", err));
