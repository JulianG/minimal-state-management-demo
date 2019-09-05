/*
Normally we could simply run json-server --watch ./src/server/db.json --port 3001
But that writes to the db.json file.

The following ensures an in-memory only DB.
*/
const db = require('./db.json');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})