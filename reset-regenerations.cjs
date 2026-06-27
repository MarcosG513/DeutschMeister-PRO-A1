const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();
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
