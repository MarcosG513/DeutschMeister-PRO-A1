import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// REEMPLAZA CON LA URL DE TU CLOUD FUNCTION
const ENDPOINT_URL = "https://sendtutorchatmessage-44keyii6gq-uc.a.run.app"; 

// Las 28 preguntas históricas (25 base + 3 Triage)
const testCases = [
  "¿Cómo se usa el caso acusativo en alemán?",
  "Explícame la diferencia entre 'du' y 'sie'.",
  "¿Cuándo se usa 'kein' y cuándo 'nicht'?",
  "¿Cómo conjugo el verbo 'haben' en presente?",
  "No entiendo por qué el verbo va al final con la palabra 'weil'.",
  "¿Cómo pregunto la hora de forma educada?",
  "¿Cuáles son los colores básicos en alemán?",
  "Explícame los días de la semana y qué preposiciones usar.",
  "¿Cómo se dice 'tengo frío' en alemán?",
  "¿Cuál es la diferencia entre 'in', 'an' y 'auf'?",
  "¿Cómo se conjugan los verbos con cambio de vocal?",
  "¿Qué significa 'Guten Appetit' y cuándo lo digo?",
  "¿Cómo se forma el plural de los sustantivos en alemán?",
  "Dime cómo presentarme a mí mismo en un correo formal.",
  "¿Cómo se estructuran las preguntas de sí o no (Ja/Nein-Fragen)?",
  "¿Por qué se dice 'mir ist kalt' en lugar de 'ich bin kalt'?",
  "¿Qué preposición se usa para hablar de meses o estaciones?",
  "¿Cómo pido la comida en un restaurante?",
  "Explícame el orden de las palabras con verbos modales.",
  "¿Cómo se usan los números del 20 al 100?",
  "¿Qué significa 'Mahlzeit'?",
  "¿Cuándo uso 'mir' y cuándo 'mich'?",
  "Explícame los posesivos como 'mein' y 'dein' para 'perro' y 'gato'.",
  "¿Cómo pregunto dónde queda la estación de tren?",
  "¿Qué son los verbos separables y cómo los pongo en una frase?",
  // Casos de Triage Emocional
  "¡No entiendo nada de esto, la gramática alemana es imposible y me rindo!", // Frustración
  "Tengo mi examen A1 mañana y estoy bloqueado, no me acuerdo de nada.", // Pánico
  "¿Para usar la llave de confianza se dice Wie bis du?" // Typo Ortográfico
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendRequest(input, index, isRetry = false) {
  const payload = { historialConversacion: [{ role: "user", parts: [{ text: input }] }] };
  const startTime = Date.now();
  let firstTokenTime = null;
  let fullText = "";

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
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (value && !firstTokenTime) firstTokenTime = Date.now() - startTime; 
      if (value) fullText += decoder.decode(value, { stream: true });
      if (done) break;
    }
    const totalTime = Date.now() - startTime;
    return { index, input, success: true, firstTokenTime, totalTime, text: fullText };
  } catch (err) {
    if (!isRetry) {
      await sleep(1000);
      return sendRequest(input, index, true);
    }
    return { index, input, success: false, error: err.message, totalTime: Date.now() - startTime };
  }
}

async function main() {
  console.log(`⚡ Iniciando Auditoría con Llama 3.1 8B Instruct...`);
  const results = [];
  let markdown = `# Auditoría Llama 3.1 8B Instruct - Tutor IA\n\n`;
  markdown += `| # | Consulta | TTFT (ms) | Latencia Total (ms) | Estado |\n|---|---|---|---|---|\n`;

  for (let i = 0; i < testCases.length; i++) {
    if (i > 0) await sleep(5000); // Throttling
    const res = await sendRequest(testCases[i], i + 1);
    results.push(res);
    const status = res.success ? '✅' : '❌';
    markdown += `| ${res.index} | ${res.input} | ${res.firstTokenTime || 'N/A'} | ${res.totalTime} | ${status} |\n`;
    console.log(`${status} Caso #${res.index}: TTFT ${res.firstTokenTime}ms | Total ${res.totalTime}ms`);
  }

  markdown += `\n## Respuestas Detalladas\n\n`;
  results.forEach(r => {
    markdown += `### Caso #${r.index}\n**Input:** ${r.input}\n**Latencia:** TTFT ${r.firstTokenTime}ms / Total ${r.totalTime}ms\n\n> ${r.text || r.error}\n\n---\n\n`;
  });

  const reportPath = path.join(__dirname, '../auditoria_llama_8b.md');
  fs.writeFileSync(reportPath, markdown, 'utf8');
  console.log(`\n🎉 Informe guardado en: ${reportPath}`);
}

main().catch(console.error);
