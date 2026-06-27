const fs = require('fs');
const text = fs.readFileSync('./src/App.jsx', 'utf8');
const regex = /type:\s*['"](.*?)['"]/g;
const matches = [];
let match;
while ((match = regex.exec(text)) !== null) {
  matches.push(match[1]);
}
console.log([...new Set(matches)]);
