# Maximo Macchi Rethink Interview Question #3 - URL Shortener

## How to Run

### Server

1. Navigate to the `server` directory
2. Run the following commands:

```
npm install
npm build-db
npm start
```

### Client

1. In a second terminal window, navigate to the `client` directory
2. Run the following commands:

```
npm install
npm start
```

## Packages / Tools Used

- [Express.js](http://expressjs.com/)
  - Node framework used for building web applications. Used to handle HTTP requests
- [SQLite](https://sqlite.org/index.html)
  - SQL library used to create SQL servers which are stored in a file. Removes need to host a SQL server on its own
  - Used so main focus could be on implementation of backend REST API and front end client
- [sqlite3](https://www.npmjs.com/package/sqlite3)
  - NPM module used to interact with SQLite files stored in filesystem
- [Create React App](https://create-react-app.dev/)
  - NPX script used to create React application without needing to setup front-end services
  - Used so time didn't have to be spent building a front-end workflow
- [W3 Box Shadow](https://www.w3schools.com/CSSref/css3_pr_box-shadow.asp)
  - Referenced when styling part of front-end form for URLs

## Assumption Made

- Users who create short URLs will continuously use them. Short URLs won't go unused and take space in database

## Limitations

- No input validation. User could enter any text (this would be implemented with more time to work on solution)
- As number of URLs added to database increases, auto incrementing IDs wouldn't scale well
- SQLite doesn't allow concurrent write queries. This could cause bottleneck issue if large amount of write queries are requested simultaneously
- No security implemented to prevent SQL injection
- Solution would need to be deployed to a cloud service with its own domain to return truly globally unique URLS (currently, URLs have hostname of `localhost` which isn't truly globally unique)
