const test = require("tape");
const server = require("./server");

function apiMock(app, repo) {}

function runTests() {
  test("Server Start", async (t) => {
    return server
      .start(apiMock, null)
      .then((app) => t.assert(app, "Server started"));
  });

  test("Server Stop", async (t) => {
    return server.stop().then((stoped) => t.assert(stoped, "Server stopped"));
  });
}

module.exports = { runTests };
