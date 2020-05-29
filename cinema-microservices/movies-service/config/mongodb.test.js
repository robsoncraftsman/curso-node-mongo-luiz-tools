const test = require("tape");
const mongodb = require("./mongodb");

function runTests() {
  test("MongoDB connection", (t) => {
    (async () => {
      const db = await mongodb.connect();
      t.assert(db, "Connected successfully");
      t.end();
    })();
  });

  test("MongoDB disconnection", (t) => {
    (async () => {
      t.assert(await mongodb.disconnect(), "Disconected successfully");
      t.end();
    })();
  });
}

module.exports = { runTests };
