const fs = require('fs');
try {
  const env = fs.readFileSync('.env', 'utf8');
  const projectLine = env.split('\n').find(l => l.startsWith('VITE_FIREBASE_PROJECT_ID='));
  if (projectLine) {
    const projectId = projectLine.split('=')[1].trim().replace(/['"]/g, '');
    fs.writeFileSync('.firebaserc', JSON.stringify({ projects: { default: projectId } }, null, 2));
    console.log('Created .firebaserc for project:', projectId);
  } else {
    console.error('VITE_FIREBASE_PROJECT_ID not found in .env');
  }
} catch(e) {
  console.error('Error:', e.message);
}
