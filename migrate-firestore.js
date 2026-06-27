import fs from 'fs';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrate() {
  const sourceAppId = "deutschmeister-pro";
  const targetAppId = process.env.VITE_FIREBASE_APP_ID;

  if (!targetAppId) {
    console.error("VITE_FIREBASE_APP_ID no está definido en .env");
    process.exit(1);
  }

  console.log(`Copiando desde ${sourceAppId} a ${targetAppId}...`);

  const sourceRef = db.collection('artifacts').doc(sourceAppId).collection('public').doc('data').collection('flashcardImages');
  const targetRef = db.collection('artifacts').doc(targetAppId).collection('public').doc('data').collection('flashcardImages');

  // Seleccionamos solo el ID para evitar el límite de 10MB de gRPC en la respuesta
  const snapshot = await sourceRef.select('word').get();
  
  if (snapshot.empty) {
    console.log("No hay documentos para copiar.");
    process.exit(0);
  }

  let count = 0;
  for (const docInfo of snapshot.docs) {
    const fullDoc = await sourceRef.doc(docInfo.id).get();
    await targetRef.doc(docInfo.id).set(fullDoc.data());
    count++;
    if (count % 50 === 0) console.log(`Copiados ${count} documentos...`);
  }

  console.log(`Copiados ${count} documentos exitosamente.`);
  process.exit(0);
}

migrate();
