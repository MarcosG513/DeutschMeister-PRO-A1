const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../vocabulario_aleman.db');
const db = new sqlite3.Database(dbPath);

db.all('SELECT * FROM vocabulario WHERE palabra_aleman LIKE "%Strom%" OR palabra_aleman LIKE "%Laptop%"', (err, rows) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Found ${rows.length} rows matching Strom or Laptop in DB:`);
  console.log(rows);
  db.close();
});
