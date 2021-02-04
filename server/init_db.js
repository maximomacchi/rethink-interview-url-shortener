const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('db.db');

db.run(
  'CREATE TABLE "URL" ( `alias` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ' +
    'UNIQUE, `url` TEXT NOT NULL )'
);
