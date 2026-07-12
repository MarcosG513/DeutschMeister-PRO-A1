// scripts/qa_roleplay_bench.js
// Suite de auditoría para runRoleplaySimulator
// Arquitectura: throttling 7s · SSE streaming · Claude Sonnet 5 como juez

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

const ENDPOINT_URL = "https://runroleplaysimulator-44keyii6gq-uc.a.run.app";

// ─── 15 Casos de Prueba ──────────────────────────────────────────────────────
const testCases = [
  // ── RESTAURANTE ─────────────────────────────────────────────
  {
    label: "Restaurant — Turno 1 (Blurting, apertura)",
    escenario: "restaurant",
    historialConversacion: [
      { role: "user", parts: [{ text: "Hola, quiero practicar el escenario del restaurante." }] }
    ]
  },
  {
    label: "Restaurant — Turno 2 (Alumno responde blurting y pide carta)",
    escenario: "restaurant",
    historialConversacion: [
      { role: "user", parts: [{ text: "Hola, quiero practicar el escenario del restaurante." }] },
      { role: "model", parts: [{ text: "Willkommen! Bitte, drei Wörter: Essen, Trinken, Tisch?" }] },
      { role: "user", parts: [{ text: "Wasser, Brot, Suppe!" }] }
    ]
  },
  {
    label: "Restaurant — Turno 3 (Alumno pide la comida)",
    escenario: "restaurant",
    historialConversacion: [
      { role: "model", parts: [{ text: "Super! Was möchten Sie essen?" }] },
      { role: "user", parts: [{ text: "Ich möchte ein Schnitzel, bitte." }] }
    ]
  },
  {
    label: "Restaurant — Turno 4 (Alumno pide la cuenta)",
    escenario: "restaurant",
    historialConversacion: [
      { role: "model", parts: [{ text: "Sehr gut! Möchten Sie etwas trinken?" }] },
      { role: "user", parts: [{ text: "Zahlen bitte!" }] }
    ]
  },

  // ── HOTEL ────────────────────────────────────────────────────
  {
    label: "Hotel — Turno 1 (Check-in, primera interacción)",
    escenario: "hotel",
    historialConversacion: [
      { role: "user", parts: [{ text: "Guten Tag, ich habe eine Reservierung." }] }
    ]
  },
  {
    label: "Hotel — Turno 2 (Alumno pregunta por habitación con baño)",
    escenario: "hotel",
    historialConversacion: [
      { role: "model", parts: [{ text: "Willkommen! Wie ist Ihr Name, bitte?" }] },
      { role: "user", parts: [{ text: "Mein Name ist Garcia. Haben Sie ein Zimmer mit Bad?" }] }
    ]
  },
  {
    label: "Hotel — Turno 3 (Alumno reporta habitación ruidosa)",
    escenario: "hotel",
    historialConversacion: [
      { role: "model", parts: [{ text: "Ja, Zimmer 12. Ist alles gut?" }] },
      { role: "user", parts: [{ text: "Nein! Das Zimmer ist sehr laut. Ich kann nicht schlafen." }] }
    ]
  },

  // ── DOCTOR ───────────────────────────────────────────────────
  {
    label: "Doctor — Turno 1 (Alumno describe síntomas iniciales)",
    escenario: "doctor",
    historialConversacion: [
      { role: "user", parts: [{ text: "Guten Morgen. Ich bin krank." }] }
    ]
  },
  {
    label: "Doctor — Turno 2 (Alumno describe dolor de cabeza y fiebre)",
    escenario: "doctor",
    historialConversacion: [
      { role: "model", parts: [{ text: "Oh nein! Was tut Ihnen weh?" }] },
      { role: "user", parts: [{ text: "Mein Kopf tut weh und ich habe Fieber." }] }
    ]
  },
  {
    label: "Doctor — Turno 3 (Alumno con error gramatical pide medicamento)",
    escenario: "doctor",
    historialConversacion: [
      { role: "model", parts: [{ text: "Wie lange sind Sie schon krank?" }] },
      { role: "user", parts: [{ text: "Ich krank bin seit drei Tage. Ich brauche Medizin." }] }
    ]
  },

  // ── FIESTA (PARTY) ───────────────────────────────────────────
  {
    label: "Party — Turno 1 (Alumno saluda y se presenta)",
    escenario: "party",
    historialConversacion: [
      { role: "user", parts: [{ text: "Hallo! Ich heiße Marco. Wie heißt du?" }] }
    ]
  },
  {
    label: "Party — Turno 2 (Alumno pregunta de dónde es alguien)",
    escenario: "party",
    historialConversacion: [
      { role: "model", parts: [{ text: "Hallo Marco! Ich heiße Anna. Woher kommst du?" }] },
      { role: "user", parts: [{ text: "Ich komme aus Mexiko! Und du, wo wohnst du?" }] }
    ]
  },

  // ── ESTACIÓN (STATION) ───────────────────────────────────────
  {
    label: "Station — Turno 1 (Alumno pregunta horario del tren a Berlín)",
    escenario: "station",
    historialConversacion: [
      { role: "user", parts: [{ text: "Entschuldigung, wann fährt der Zug nach Berlin?" }] }
    ]
  },
  {
    label: "Station — Turno 2 (Alumno pregunta precio del billete sencillo)",
    escenario: "station",
    historialConversacion: [
      { role: "model", parts: [{ text: "Der Zug fährt um 14 Uhr. Einfach oder hin und zurück?" }] },
      { role: "user", parts: [{ text: "Einfach, bitte. Was kostet das?" }] }
    ]
  },

  // ── TIENDA (SHOPPING) ────────────────────────────────────────
  {
    label: "Shopping — Turno 1 (Alumno busca chaqueta en talla M)",
    escenario: "shopping",
    historialConversacion: [
      { role: "user", parts: [{ text: "Guten Tag. Ich suche eine Jacke. Haben Sie Größe M?" }] }
    ]
  }
];

// ─── Función de petición con lectura de SSE stream ───────────────────────────
async function sendRequest(testCase, index) {
  const payload = {
    data: {
      historialConversacion: testCase.historialConversacion,
      escenario: testCase.escenario
    }
  };

  const startTime = Date.now();
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
    let fullText = "";
    let isFallback = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataContent = line.substring(6).trim();
          if (dataContent === "[DONE]") continue;
          try {
            const parsed = JSON.parse(dataContent);
            if (parsed.text) fullText += parsed.text;
            if (parsed.error && parsed.error.includes("fallback")) isFallback = true;
          } catch (e) {
            fullText += dataContent;
          }
        }
      }
    }

    const latency = Date.now() - startTime;
    const provider = (isFallback || latency > 6000) ? "DeepSeek V3.2 (Fallback)" : "Gemini 3.5 Flash";

    return {
      index, label: testCase.label, escenario: testCase.escenario,
      success: true, text: fullText.trim(), latency, provider
    };
  } catch (err) {
    const latency = Date.now() - startTime;
    return {
      index, label: testCase.label, escenario: testCase.escenario,
      success: false, error: err.message, latency, provider: "Fallo"
    };
  }
}

// ─── Juez: Claude Sonnet 5 via Fal.ai ────────────────────────────────────────
async function runJudge(testCase, responseText) {
  const promptJuez = `
    Actúa como Evaluador de Simuladores de Conversación en Alemán A1.
    
    Escenario del rol: "${testCase.escenario}"
    Input del alumno: "${testCase.historialConversacion[testCase.historialConversacion.length - 1].parts[0].text}"
    Respuesta del Simulador: "${responseText}"
    
    Evalúa con un puntaje del 1 al 10 usando ESTRICTAMENTE estos 3 criterios:
    
    1. NIVEL A1 ESTRICTO: ¿Cada oración tiene máximo 8 palabras? ¿El vocabulario es básico y cotidiano de nivel A1? Penaliza con fuerza si hay oraciones largas o vocabulario complejo.
    2. INTERACCIÓN REALISTA: ¿El personaje mantiene su rol del escenario? ¿Formula SOLO UNA (1) pregunta o acción corta por turno? Penaliza severamente si hay monólogos o múltiples preguntas.
    3. FORMATO LIMPIO: ¿La respuesta está completamente libre de Markdown, negritas (**), asteriscos (*) o cualquier formato de texto enriquecido? Penaliza con 0 puntos en este criterio si hay algún asterisco.
    
    Responde ÚNICAMENTE con un JSON exacto, sin código markdown ni texto adicional:
    {
      "score": 8,
      "feedback": "Explicación breve de por qué se otorgó esa calificación evaluando los 3 criterios"
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
  console.log(`🎭 Iniciando auditoría del Roleplay Simulator. ${testCases.length} casos con throttling de ${DELAY_MS / 1000}s...`);
  console.log(`⏱️  Tiempo estimado: ~${Math.ceil((testCases.length * DELAY_MS) / 60000)} minutos\n`);

  const results = [];
  for (let idx = 0; idx < testCases.length; idx++) {
    if (idx > 0) {
      process.stdout.write(`⏳ [${idx}/${testCases.length}] Esperando ${DELAY_MS / 1000}s (throttling Rate Limit)...\r`);
      await sleep(DELAY_MS);
    }
    const result = await sendRequest(testCases[idx], idx + 1);
    results.push(result);
    const status = result.success ? '✅' : '❌';
    console.log(`${status} Caso #${result.index} [${result.escenario}] [${result.provider}] — ${result.latency}ms`);
  }

  console.log("\n⚖️  Peticiones completadas. Evaluando con Claude Sonnet 5...\n");

  const evaluated = [];
  for (const res of results) {
    if (res.success && res.text) {
      console.log(`⚖️  Evaluando Caso #${res.index} — ${res.label}...`);
      const evaluation = await runJudge(testCases[res.index - 1], res.text);
      evaluated.push({ ...res, score: evaluation.score, feedback: evaluation.feedback });
    } else {
      evaluated.push({ ...res, score: 0, feedback: res.error || "Sin respuesta para evaluar." });
    }
  }

  // ─── Generar reporte Markdown ─────────────────────────────────────────────
  const geminiCases = evaluated.filter(r => r.provider.includes("Gemini"));
  const deepseekCases = evaluated.filter(r => r.provider.includes("DeepSeek"));
  const failedCases = evaluated.filter(r => !r.success);
  const validScores = evaluated.filter(r => typeof r.score === 'number').map(r => r.score);
  const avgScore = validScores.length > 0
    ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2)
    : "N/A";

  let markdown = `# Informe de Auditoría — Roleplay Simulator 🎭\n\n`;
  markdown += `Evaluación de calidad del simulador de conversación en alemán A1 bajo los criterios: Nivel A1 Estricto, Interacción Realista y Formato Limpio.\n\n`;
  markdown += `## Resumen de Resultados\n\n`;
  markdown += `* **Total Casos:** ${evaluated.length}\n`;
  markdown += `* **Procesados por Gemini 3.5 Flash:** ${geminiCases.length}\n`;
  markdown += `* **Derivados a DeepSeek V3.2 (Fallback):** ${deepseekCases.length}\n`;
  markdown += `* **Fallidos:** ${failedCases.length}\n`;
  markdown += `* **Nota Media Global:** **${avgScore}/10**\n\n`;
  markdown += `## Tabla de Resultados\n\n`;
  markdown += `| # | Escenario | Contexto | Proveedor | Latencia | Score | Feedback |\n`;
  markdown += `|---|---|---|---|---|---|---|\n`;

  evaluated.forEach(r => {
    const shortLabel = r.label.length > 45 ? r.label.substring(0, 42) + "..." : r.label;
    markdown += `| ${r.index} | ${r.escenario} | ${shortLabel} | ${r.provider} | ${r.latency} ms | **${r.score}** | ${r.feedback} |\n`;
  });

  markdown += `\n## Respuestas Completas del Simulador\n\n`;
  evaluated.forEach(r => {
    markdown += `### Caso #${r.index} — ${r.label}\n`;
    markdown += `**Escenario:** ${r.escenario} | **Proveedor:** ${r.provider} | **Score:** ${r.score}/10\n\n`;
    markdown += `> ${r.text || r.error || "Sin respuesta"}\n\n`;
    markdown += `**Feedback del Juez:** ${r.feedback}\n\n---\n\n`;
  });

  const reportPath = path.join(__dirname, '../informe_roleplay_qa_claude5.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`\n🎉 Informe generado con éxito en: ${reportPath}`);
  console.log(`📊 Nota media final: ${avgScore}/10`);
}

main().catch(err => console.error("Error crítico en la suite:", err));
