const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const key = env.split('VITE_GEMINI_API_KEY=')[1].split('\n')[0].trim();

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(r => r.json())
  .then(d => {
    const models = d.models || [];
    console.log("All Models:");
    console.log(models.map(m => m.name));
  })
  .catch(console.error);
