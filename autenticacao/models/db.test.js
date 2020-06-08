const test = require("blue-tape");
const db = require("./db");

function runTests() {
  test("DB connection", async (t) => {
    return db
      .connect()
      .then((connected) => t.assert(connected, "Connected successfully"));
  });

  test("DB getMongoClient", async (t) => {
    const mongoClient = db.getMongoClient();
    t.assert(mongoClient, "MongoClient initialized");
  });

  test("DB getDb", async (t) => {
    const database = db.getDatabase();
    t.assert(database, "Database initialized");
  });

  test("DB disconnection", async (t) => {
    return db
      .disconnect()
      .then((disconnected) =>
        t.assert(disconnected, "Disconected successfully")
      );
  });
}

module.exports = { runTests };
