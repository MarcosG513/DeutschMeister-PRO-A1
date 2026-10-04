import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Storage } from "@google-cloud/storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saPath = path.resolve(__dirname, "../serviceAccountKey.json");
let storage;
if (fs.existsSync(saPath)) {
  const sa = JSON.parse(fs.readFileSync(saPath, "utf-8"));
  storage = new Storage({ credentials: sa, projectId: sa.project_id });
} else {
  storage = new Storage();
}

const corsConfiguration = [
  {
    origin: [
      "https://deutschmeister-pro.web.app",
      "https://deutschmeister-pro.firebaseapp.com",
      "http://localhost:5173",
      "http://localhost:3000",
      "capacitor://localhost",
      "https://localhost",
      "*"
    ],
    method: ["GET", "HEAD", "OPTIONS"],
    responseHeader: ["Content-Type", "Access-Control-Allow-Origin", "Range"],
    maxAgeSeconds: 3600
  }
];

async function configureBucketCors(bucketName) {
  try {
    const bucket = storage.bucket(bucketName);
    const [exists] = await bucket.exists();
    if (!exists) {
      console.warn(`⚠️ Bucket gs://${bucketName} no existe actualmente en el proyecto. Se omite.`);
      return;
    }
    await bucket.setCorsConfiguration(corsConfiguration);
    console.log(`✅ CORS aplicado exitosamente en gs://${bucketName}`);
  } catch (err) {
    console.error(`❌ Error aplicando CORS en gs://${bucketName}:`, err.message);
  }
}

async function run() {
  await configureBucketCors("deutschmeister-audio-vault");
  await configureBucketCors("deutschmeister-pro.firebasestorage.app");
}

run();
