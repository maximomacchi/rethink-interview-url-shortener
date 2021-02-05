const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('db.db');

// Initialize table for database. This only needs to be done the first time
// launching the app
db.run(
  'CREATE TABLE "URL" ( `alias` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ' +
    'UNIQUE, `url` TEXT NOT NULL )'
);
