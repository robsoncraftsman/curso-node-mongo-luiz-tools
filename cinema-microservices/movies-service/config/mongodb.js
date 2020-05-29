const MongoClient = require("mongodb").MongoClient;
let connection = null;
let db = null;

async function connect() {
  if (!connection) {
    const mongoClient = new MongoClient(process.env.MONGO_CONNECTION, {
      useUnifiedTopology: true,
    });

    connection = await mongoClient.connect();
    db = connection.db(process.env.DATABASE);
  }

  return db;
}

async function disconnect() {
  if (!connection) return true;
  await connection.close();
  connection = null;
  db = null;
  return true;
}

module.exports = { connect, disconnect };
