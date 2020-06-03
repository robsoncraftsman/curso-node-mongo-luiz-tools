require("dotenv-safe").config();
const cinemaCatalog = require("./api/cinema-catalog");
const server = require("./server/server");
const repository = require("./repository/repository");

console.log("Starting cinema-catalog-service...");
server.start(cinemaCatalog, repository).then(() => {
  console.log("Cinema-catalog-service started");
});
