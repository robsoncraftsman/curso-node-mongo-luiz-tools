const test = require("blue-tape");
const mongodb = require("./mongodb");

function runTests() {
  test("MongoDB connection", async (t) => {
    return mongodb
      .connect()
      .then((db) => t.assert(db, "Connected successfully"));
  });

  test("MongoDB disconnection", async (t) => {
    return mongodb
      .disconnect()
      .then((disconnected) =>
        t.assert(disconnected, "Disconected successfully")
      );
  });
}

module.exports = { runTests };
