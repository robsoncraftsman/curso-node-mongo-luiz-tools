const test = require("tape");
const server = require("./server");

function apiMock(app, repo) {}

function runTests() {
  test("Server Start", async (t) => {
    return server.start(apiMock, null).then(t.assert(server, "Server started"));
  });

  test("Server Stop", async (t) => {
    return server.stop().then((stoped) => t.assert(stoped, "Server stopped"));
  });
}

module.exports = { runTests };
