require("dotenv-safe").config();
const movies = require("./api/movies");
const server = require("./server/server");
const repository = require("./repository/repository");

console.log("Starting movies-service...");
server.start(movies, repository).then(() => {
  console.log("Movies-service started");
});
