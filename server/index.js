const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());
const db = new sqlite3.Database('db.db');

app.get('/', (req, res) => {
  res.send('Maximo Macchi Rethink Interview - URL Shortener');
});

app.get('/:alias', (req, res) => {
  db.get(
    `SELECT url FROM URL WHERE alias = '${req.params.alias}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result && result.url) {
        res.redirect(result.url);
      } else {
        res.json({
          msg: 'No full URL associated with that short URL',
        });
      }
    }
  );
});

app.post('/url', (req, res) => {
  db.get(
    `SELECT alias FROM URL WHERE url = '${req.query.url}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result && result.alias) {
          res.json({
            msg: `Short URL already exists for ${req.query.url}`,
            originalUrl: req.query.url,
            shortUrl: `http://${req.hostname}:${PORT}/${result.alias}`,
          });
        } else {
          db.get(
            `INSERT INTO URL (url) VALUES ('${req.query.url}')`,
            (err, row) => {
              if (err) {
                res.send(err);
              } else {
                db.get(
                  `SELECT alias FROM URL WHERE url = '${req.query.url}'`,
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    } else {
                      res.json({
                        msg: `Short URL created for ${req.query.url}`,
                        shortUrl: `http://${req.hostname}:${PORT}/${result.alias}`,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
