// scripts/bootstrap_access_control.mjs
// Inicializa access_control/{uid}, authorized_emails/{emailLower} y Custom Claims
// para el propietario y los usuarios existentes con proveedor google.com en Firebase Auth.

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

let admin;
try {
  admin = require('firebase-admin');
} catch (_) {
  admin = require(path.join(ROOT, 'functions', 'node_modules', 'firebase-admin'));
}

const DEFAULT_SUPER_ADMINS = [
  'mgmogollon13@gmail.com',
  'matelu.store2@gmail.com',
  'juliethg113@gmail.com',
  'mgmogollon@hotmail.com'
];

const isDryRun = process.argv.includes('--dry-run');

function resolveServiceAccount() {
  const candidates = [
    path.join(__dirname, 'serviceAccountKey.json'),
    path.join(ROOT, 'serviceAccountKey.json')
  ];
  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  }
  return null;
}

async function main() {
  const sa = resolveServiceAccount();
  if (sa) {
    admin.initializeApp({
      credential: admin.credential.cert(sa),
      projectId: sa.project_id || 'deutschmeister-pro'
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'deutschmeister-pro'
    });
  }

  const db = admin.firestore();
  const superAdminSet = new Set([
    ...DEFAULT_SUPER_ADMINS,
    ...(process.env.SUPER_ADMIN_EMAILS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  ]);

  const googleUsers = [];
  let pageToken;
  do {
    const res = await admin.auth().listUsers(1000, pageToken);
    for (const userRecord of res.users) {
      const email = (userRecord.email || '').trim().toLowerCase();
      const providers = (userRecord.providerData || []).map((p) => p.providerId);
      const isGoogle = providers.includes('google.com');
      const isBootstrapTarget = isGoogle || (email && superAdminSet.has(email));
      if (isBootstrapTarget && email && !email.includes('/')) {
        googleUsers.push({
          uid: userRecord.uid,
          email,
          displayName: userRecord.displayName || '',
          photoURL: userRecord.photoURL || '',
          customClaims: userRecord.customClaims || {},
          providers
        });
      }
    }
    pageToken = res.pageToken;
  } while (pageToken);

  console.log(`\n🔐 Bootstrap Zero-Trust (${isDryRun ? 'DRY RUN' : 'APPLY'})`);
  console.log(`   - Usuarios Google / Super-Admin detectados: ${googleUsers.length}`);

  const nowTs = admin.firestore.FieldValue.serverTimestamp();
  for (const u of googleUsers) {
    console.log(`   ✅ Admin bootstrap: ${u.email} (uid=${u.uid}, providers=${u.providers.join(',')})`);
    if (isDryRun) continue;

    await db.collection('access_control').doc(u.uid).set(
      {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoURL: u.photoURL,
        status: 'approved',
        role: 'admin',
        approvedBy: 'bootstrap_script',
        requestedAt: nowTs,
        updatedAt: nowTs
      },
      { merge: true }
    );

    await db.collection('authorized_emails').doc(u.email).set(
      {
        email: u.email,
        role: 'admin',
        status: 'approved',
        addedBy: 'bootstrap_script',
        createdAt: nowTs,
        updatedAt: nowTs
      },
      { merge: true }
    );

    await admin.auth().setCustomUserClaims(u.uid, {
      ...u.customClaims,
      approved: true,
      admin: true
    });
  }

  for (const adminEmail of superAdminSet) {
    if (!adminEmail || adminEmail.includes('/')) continue;
    if (!isDryRun) {
      await db.collection('authorized_emails').doc(adminEmail).set(
        {
          email: adminEmail,
          role: 'admin',
          status: 'approved',
          addedBy: 'bootstrap_script',
          updatedAt: nowTs
        },
        { merge: true }
      );
    }
  }

  console.log('\n🎉 Bootstrap completado.');
}

main().catch((err) => {
  console.error('❌ Error en bootstrap_access_control:', err?.message || err);
  process.exit(1);
});
