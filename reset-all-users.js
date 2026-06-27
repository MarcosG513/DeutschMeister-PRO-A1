import fs from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

if (process.env.FIREBASE_CONFIG === undefined && !global.firebaseApp) {
  try {
    global.firebaseApp = initializeApp({
      credential: cert(serviceAccount)
    });
  } catch(e) {}
}

const db = getFirestore();
const appId = "deutschmeister-pro";

async function resetAllUsers() {
  console.log("Obteniendo todos los usuarios...");
  const usersSnapshot = await db.collection("artifacts").doc(appId).collection("users").get();
  
  console.log(`Encontrados ${usersSnapshot.size} usuarios.`);
  
  let count = 0;
  for (const userDoc of usersSnapshot.docs) {
    const unlockedCardsRef = userDoc.ref.collection("unlockedCards");
    const cardsSnapshot = await unlockedCardsRef.get();
    
    for (const cardDoc of cardsSnapshot.docs) {
      const data = cardDoc.data();
      if (data.regenerated) {
        await cardDoc.ref.update({ regenerated: false });
        count++;
      }
    }
  }
  
  console.log(`Listo. Se resetearon ${count} flashcards en las colecciones privadas de los usuarios.`);
  process.exit(0);
}

resetAllUsers().catch(console.error);
