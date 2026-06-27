import fs from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const appId = "deutschmeister-pro";

async function resetRegenerations() {
  console.log("Reseteando regeneraciones en public_content...");
  const pubContent = await db.collection("public_content").doc("data").collection("flashcardImages").get();
  for (const doc of pubContent.docs) {
    if (doc.data().regenerated) {
      await doc.ref.update({ regenerated: false });
    }
  }

  console.log("Reseteando regeneraciones en artifacts...");
  const pubArtifacts = await db.collection("artifacts").doc(appId).collection("public").doc("data").collection("flashcardImages").get();
  for (const doc of pubArtifacts.docs) {
    if (doc.data().regenerated) {
      await doc.ref.update({ regenerated: false });
    }
  }
  
  console.log("Listo.");
  process.exit(0);
}

resetRegenerations().catch(console.error);
