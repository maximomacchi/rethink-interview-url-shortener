const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const PORT = 3001;

const app = express();
app.use(cors()); // Prevent CORS errors when running this locally
app.use(express.json());
const db = new sqlite3.Database('db.db');

app.get('/', (req, res) => {
  res.send('Maximo Macchi Rethink Interview - URL Shortener');
});

// Redirects user to URL associated with given alias
app.get('/:alias', (req, res) => {
  db.get(
    // Fetch URL associated with alias (if any)
    `SELECT url FROM URL WHERE alias = '${req.params.alias}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      }
      // If URL is fetched, redirect user. Otherwise, send back message saying
      // URL couldn't be found
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

// Inserts URL into database and returns shortened URL for user to use in future
// Only parameter required is a url
app.post('/url', (req, res) => {
  db.get(
    // Check if short URL already exists for given URL
    `SELECT alias FROM URL WHERE url = '${req.query.url}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        // If short URL already exists, send back message with shortened URL
        if (result && result.alias) {
          res.json({
            msg: `Short URL already exists for ${req.query.url}`,
            originalUrl: req.query.url,
            shortUrl: `http://${req.hostname}:${PORT}/${result.alias}`,
          });
          // Otherwise, create new shortened URL
        } else {
          db.get(
            `INSERT INTO URL (url) VALUES ('${req.query.url}')`,
            (err, row) => {
              if (err) {
                res.send(err);
              } else {
                db.get(
                  // Fetch shortened URL just created and send back in message
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
