import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { fal } from '@fal-ai/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../.env') });

const FAL_KEY = process.env.VITE_FAL_KEY;
if (!FAL_KEY) {
  console.error("❌ FAL_KEY no encontrada en el archivo .env");
  process.exit(1);
}

fal.config({ credentials: FAL_KEY });

const ENDPOINT_URL = "https://sendtutorchatmessage-44keyii6gq-uc.a.run.app";

// 25 Preguntas de prueba de nivel A1
const testQueries = [
  "¿Cómo se usa el caso acusativo en alemán?",
  "Explícame la diferencia entre 'du' y 'sie'.",
  "¿Cuándo se usa 'kein' y cuándo 'nicht'?",
  "¿Cómo conjugo el verbo 'haben' en presente?",
  "No entiendo por qué el verbo va al final con preposiciones o conjunciones.",
  "¿Cómo pregunto la hora de forma educada?",
  "¿Cuáles son los colores básicos en alemán?",
  "Explícame los días de la semana y qué preposición llevan.",
  "¿Cómo se dice 'tengo frío' en alemán?",
  "¿Cuál es la diferencia entre 'in', 'an' y 'auf'?",
  "¿Cómo se conjugan los verbos con cambio de vocal como 'sprechen'?",
  "¿Qué significa 'Guten Appetit' y cuándo lo digo?",
  "¿Cómo se forma el plural de los sustantivos en alemán?",
  "Dime cómo presentarme a mí mismo en un correo formal.",
  "¿Cómo se estructuran las preguntas de sí o no (Ja/Nein Fragen)?",
  "¿Por qué se dice 'mir ist kalt' en lugar de 'ich bin kalt'?",
  "¿Qué preposición se usa para hablar de meses o estaciones del año?",
  "¿Cómo pido la comida en un restaurante?",
  "Explícame el orden de las palabras con verbos modales.",
  "¿Cómo se usan los números del 20 al 100?",
  "¿Qué significa 'Mahlzeit'?",
  "¿Cuándo uso 'mir' y cuándo 'mich'?",
  "Explícame los posesivos como 'mein' y 'dein' para masculino y femenino.",
  "¿Cómo pregunto dónde queda la estación de tren?",
  "¿Qué son los verbos separables y cómo los pongo en la oración?"
];

async function sendRequest(query, index) {
  const payload = {
    data: {
      historialConversacion: [
        {
          role: "user",
          parts: [{ text: query }]
        }
      ]
    }
  };

  const startTime = Date.now();
  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
            if (parsed.text) {
              fullText += parsed.text;
            }
            if (parsed.error && parsed.error.includes("fallback")) {
              isFallback = true;
            }
          } catch (e) {
            // Manejar texto plano si no es JSON
            fullText += dataContent;
          }
        }
      }
    }

    const latency = Date.now() - startTime;
    // Si la latencia es alta o detectamos trazas, clasificamos el motor
    const provider = (isFallback || latency > 4500) ? "DeepSeek (Fallback)" : "Gemini (Free)";

    return {
      index,
      query,
      success: true,
      text: fullText.trim(),
      latency,
      provider
    };
  } catch (err) {
    const latency = Date.now() - startTime;
    return {
      index,
      query,
      success: false,
      error: err.message,
      latency,
      provider: "Fallo"
    };
  }
}

async function runJudge(query, responseText) {
  const promptJuez = `
    Actúa como un Evaluador Pedagógico Senior de Alemán. 
    Evalúa la respuesta dada por el Tutor de IA a la siguiente consulta del estudiante.
    
    Consulta del estudiante: "${query}"
    Respuesta del Tutor: "${responseText}"
    
    Determina un puntaje del 1 al 10 basado estrictamente en:
    1. MÉTODO SOCRÁTICO: ¿Utiliza preguntas guía y motiva al alumno a razonar en lugar de darle toda la respuesta de inmediato?
    2. SIMPLICIDAD A1: ¿Evita jerga técnica compleja (como 'dativo de atribución', 'cláusulas subordinadas') y usa explicaciones sencillas y lúdicas?
    
    Responde ÚNICAMENTE con un JSON que tenga esta estructura exacta, sin código markdown ni texto adicional:
    {
      "score": 8,
      "feedback": "Explicación breve de por qué se otorgó esa calificación"
    }
  `;

  try {
    const result = await fal.subscribe("openrouter/router/enterprise", {
      input: {
        model: "deepseek/deepseek-v3.2",
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

async function main() {
  console.log(`🚀 Iniciando suite de pruebas. Enviando ${testQueries.length} peticiones simultáneas...`);
  
  const promises = testQueries.map((query, idx) => sendRequest(query, idx + 1));
  const results = await Promise.all(promises);
  
  console.log("📊 Peticiones completadas. Evaluando calidad pedagógica con LLM-as-a-Judge...");
  
  const evaluatedResults = [];
  for (const res of results) {
    if (res.success && res.text) {
      console.log(`⚖️ Evaluando Caso #${res.index} (${res.provider})...`);
      const evaluation = await runJudge(res.query, res.text);
      evaluatedResults.push({
        ...res,
        score: evaluation.score,
        feedback: evaluation.feedback
      });
    } else {
      evaluatedResults.push({
        ...res,
        score: 0,
        feedback: res.error || "No se obtuvo respuesta para evaluar."
      });
    }
  }

  // Generar informe markdown
  let markdown = `# Informe de Evaluación de Calidad y Estrés - Tutor IA 🏆\n\n`;
  markdown += `Este informe recopila los resultados de latencia, estabilidad y calidad de respuesta pedagógica del Tutor IA ante una ráfaga masiva de peticiones simultáneas.\n\n`;
  markdown += `## Resumen de Resultados\n\n`;
  
  const geminiCount = evaluatedResults.filter(r => r.provider.includes("Gemini")).length;
  const deepseekCount = evaluatedResults.filter(r => r.provider.includes("DeepSeek")).length;
  const failedCount = evaluatedResults.filter(r => !r.success).length;

  markdown += `* **Total Peticiones:** ${evaluatedResults.length}\n`;
  markdown += `* **Procesadas por Gemini (Free):** ${geminiCount}\n`;
  markdown += `* **Derivadas a DeepSeek (Fallback):** ${deepseekCount}\n`;
  markdown += `* **Fallidas:** ${failedCount}\n\n`;
  
  markdown += `## Tabla Comparativa\n\n`;
  markdown += `| # | Consulta | Proveedor | Latencia (ms) | Puntaje Juez | Feedback |\n`;
  markdown += `|---|---|---|---|---|---|\n`;

  evaluatedResults.forEach(r => {
    const shortQuery = r.query.length > 50 ? r.query.substring(0, 47) + "..." : r.query;
    markdown += `| ${r.index} | ${shortQuery} | ${r.provider} | ${r.latency} ms | **${r.score}** | ${r.feedback} |\n`;
  });

  const reportPath = path.join(__dirname, '../informe_tutor_qa.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`🎉 Informe generado con éxito en: ${reportPath}`);
}

main().catch(err => console.error("Error crítico en la suite de pruebas:", err));
