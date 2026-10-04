import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Endpoint de tu Tutor IA en producción
const ENDPOINT_URL = "https://sendtutorchatmessage-44keyii6gq-uc.a.run.app";

const testCases = [
  "¡Hola! ¿Cómo se dice 'buenos días' en alemán?",
  "No entiendo la diferencia entre 'mir' y 'mich'.",
  "¿Me das un ejemplo de verbo separable?",
  "¿Por qué el verbo va al final con 'weil'?"
];

// Helper de Throttling para proteger el Free Tier y probar Round-Robin
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function measureLatency(input, index) {
  // El payload exacto que espera tu Cloud Function
  const payload = {
    historialConversacion: [{ role: "user", parts: [{ text: input }] }]
  };
  
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
      
      // Capturamos el Time-To-First-Token en el primer chunk recibido
      if (value && !firstTokenTime) {
        firstTokenTime = Date.now() - startTime; 
      }
      
      if (value) {
        fullText += decoder.decode(value, { stream: true });
      }
      
      if (done) break;
    }

    const totalTime = Date.now() - startTime;
    return { 
        index, 
        input, 
        success: true, 
        firstTokenTime, 
        totalTime, 
        textLength: fullText.length, 
        textPreview: fullText.substring(0, 60).replace(/\n/g, " ") + "..." 
    };
  } catch (err) {
    return { index, input, success: false, error: err.message, totalTime: Date.now() - startTime };
  }
}

async function main() {
  console.log("⚡ Iniciando Auditoría de Latencia y Round-Robin (Tutor IA)...");
  console.log("Enviando 4 peticiones con 5s de throttling para alternar Llave 1 y Llave 2.\n");
  
  for (let i = 0; i < testCases.length; i++) {
    if (i > 0) {
        console.log(`⏳ Esperando 5 segundos (Throttling para forzar Round-Robin)...`);
        await sleep(5000);
    }
    const res = await measureLatency(testCases[i], i + 1);
    
    if (res.success) {
        console.log(`✅ Caso #${res.index}: "${res.input}"`);
        console.log(`   ⏱️  Time-To-First-Token (TTFT): ${res.firstTokenTime} ms`);
        console.log(`   ⏳  Latencia Total (Fin de texto): ${res.totalTime} ms`);
        console.log(`   📝  Longitud: ${res.textLength} caracteres | Preview: ${res.textPreview}\n`);
    } else {
        console.log(`❌ Caso #${res.index}: Falló - ${res.error} (${res.totalTime}ms)\n`);
    }
  }
  console.log("🎉 Auditoría finalizada. Revisa los tiempos del TTFT.");
}

main().catch(console.error);
