// scripts/qa_tutor_bench_v5.js
// Suite de auditoría para sendTutorChatMessage (Modo Socrático V5.0)
// Arquitectura: throttling 7s · SSE streaming · Claude Sonnet 5 como juez

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { fal } from '@fal-ai/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const FAL_KEY = process.env.VITE_FAL_KEY || process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("❌ FAL_KEY no encontrada en el archivo .env");
  process.exit(1);
}
fal.config({ credentials: FAL_KEY });

// Endpoint extraído del historial de despliegues
const ENDPOINT_URL = "https://sendtutorchatmessage-44keyii6gq-uc.a.run.app";

// ─── 10 Casos de Prueba "Trampa" ─────────────────────────────────────────────
const testCases = [
  { label: "Jerga Explícita", input: "¿Cómo se usa el caso acusativo en alemán?" },
  { label: "Dilema de Pronombres", input: "Explícame la diferencia entre 'du' y 'sie'." },
  { label: "Dilema de Negación", input: "¿Cuándo se usa 'kein' y cuándo 'nicht'?" },
  { label: "Conjugación Directa", input: "¿Cómo conjugo el verbo 'haben' en presente?" },
  { label: "Sintaxis Compleja", input: "No entiendo por qué el verbo va al final con la palabra 'weil'." },
  { label: "Petición de Traducción", input: "¿Cómo se dice 'tengo frío' en alemán?" },
  { label: "Preposiciones Locativas", input: "¿Cuál es la diferencia entre 'in', 'an' y 'auf'?" },
  { label: "Excepción Léxica", input: "¿Qué significa 'Guten Appetit' y cuándo lo digo?" },
  { label: "Formación de Plurales", input: "¿Cómo se forma el plural de los sustantivos en alemán?" },
  { label: "Posesivos Complejos", input: "Explícame los posesivos como 'mein' y 'dein' para 'perro' y 'gato'." }
];

// ─── Función de petición con lectura de SSE stream ───────────────────────────
async function sendRequest(testCase, index) {
  const payload = {
    historialConversacion: [
      { role: "user", parts: [{ text: testCase.input }] }
    ]
  };

  const startTime = Date.now();
  let fullText = "";
  let isFallback = false;

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      
      const parts = buffer.split("\n\n");
      buffer = parts.pop();
      
      for (const part of parts) {
        const lines = part.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataContent = line.substring(6).trim();
            if (dataContent === "[DONE]") continue;
            try {
              const parsed = JSON.parse(dataContent);
              if (parsed.text) fullText += parsed.text;
              if (parsed.error && parsed.error.includes("fallback")) isFallback = true;
            } catch (e) {
              // ignore
            }
          }
        }
      }
    }
    if (buffer) {
      const lines = buffer.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataContent = line.substring(6).trim();
          if (dataContent !== "[DONE]") {
            try {
              const parsed = JSON.parse(dataContent);
              if (parsed.text) fullText += parsed.text;
            } catch (e) {}
          }
        }
      }
    }

    const latency = Date.now() - startTime;
    const provider = (isFallback || latency > 6000) ? "DeepSeek V3.2 (Fallback)" : "Gemini 3.5 Flash";
    
    return { index, label: testCase.label, input: testCase.input, success: true, text: fullText.trim(), latency, provider };
  } catch (err) {
    const latency = Date.now() - startTime;
    return { index, label: testCase.label, input: testCase.input, success: false, error: err.message, latency, provider: "Fallo" };
  }
}

// ─── Juez: Claude Sonnet 5 via Fal.ai ────────────────────────────────────────
async function runJudge(testCase, responseText) {
  const promptJuez = `
Actúa como Evaluador Pedagógico Estricto de un Tutor de Alemán A1.
Input del alumno: "${testCase.input}"
Respuesta del Tutor: "${responseText}"

Evalúa con un puntaje del 1 al 10 usando ESTRICTAMENTE estos 3 criterios del Modo Socrático V5.0:

1. RESTRICCIÓN DIRECTA Y ANALOGÍAS: ¿El tutor usa una analogía del mundo real para explicar el concepto? ¿Felicita o valida el intento? Penaliza GRAVEMENTE (resta 5 puntos) si el tutor da la respuesta final/traducción exacta sin que el alumno haya razonado.
2. PREGUNTA ÚNICA: ¿Formula EXACTAMENTE UNA (1) pregunta corta o reto al final de su mensaje y se detiene ahí? Penaliza si hace múltiples preguntas o si no hace ninguna.
3. CERO JERGA: ¿Evita por completo palabras como 'dativo', 'acusativo', 'cláusula subordinada', 'nominativo', 'masculino', 'femenino'? Sustitutos lúdicos están bien. Penaliza si la jerga está presente.

Responde ÚNICAMENTE con un JSON exacto, sin código markdown ni texto adicional:
{
  "score": 8,
  "feedback": "Explicación breve de por qué se otorgó esa calificación."
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

// ─── Helper de pausa para throttling ─────────────────────────────────────────
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const DELAY_MS = 7000;
  console.log(`🧠 Iniciando auditoría del Tutor IA (Modo Socrático V5.0). ${testCases.length} casos con throttling...`);
  
  const results = [];
  for (let idx = 0; idx < testCases.length; idx++) {
    if (idx > 0) {
      process.stdout.write(`⏳ Esperando ${DELAY_MS / 1000}s (Rate Limit)...\r`);
      await sleep(DELAY_MS);
    }
    const result = await sendRequest(testCases[idx], idx + 1);
    results.push(result);
    const status = result.success ? '✅' : '❌';
    console.log(`${status} Caso #${result.index} [${result.label}] [${result.provider}] — ${result.latency}ms`);
  }

  console.log("\n⚖️ Evaluando con Claude Sonnet 5...\n");
  const evaluated = [];
  
  for (const res of results) {
    if (res.success && res.text) {
      const evaluation = await runJudge(testCases[res.index - 1], res.text);
      evaluated.push({ ...res, score: evaluation.score, feedback: evaluation.feedback });
    } else {
      evaluated.push({ ...res, score: 0, feedback: res.error || "Sin respuesta." });
    }
  }

  // ─── Generar reporte Markdown ─────────────────────────────────────────────
  const validScores = evaluated.filter(r => typeof r.score === 'number').map(r => r.score);
  const avgScore = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2) : "N/A";
  
  let markdown = `# Informe de Auditoría — Tutor IA Socrático V5.0 🧠\n\n`;
  markdown += `**Nota Media Global:** **${avgScore}/10**\n\n`;
  markdown += `## Tabla de Resultados\n\n| # | Caso | Proveedor | Latencia | Score | Feedback |\n|---|---|---|---|---|---|\n`;
  
  evaluated.forEach(r => {
    markdown += `| ${r.index} | ${r.label} | ${r.provider} | ${r.latency} ms | **${r.score}** | ${r.feedback} |\n`;
  });

  markdown += `\n## Respuestas Completas\n\n`;
  evaluated.forEach(r => {
    markdown += `### Caso #${r.index} — ${r.label}\n**Input:** "${r.input}" | **Score:** ${r.score}/10\n\n> ${r.text || r.error}\n\n**Feedback:** ${r.feedback}\n\n---\n\n`;
  });

  const reportPath = path.join(__dirname, '../informe_tutor_qa_v5.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`\n🎉 Informe generado: ${reportPath}\n📊 Nota media: ${avgScore}/10`);
}

main().catch(err => console.error("Error crítico:", err));
