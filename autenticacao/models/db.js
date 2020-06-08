const { MongoClient } = require("mongodb");

let mongoClient = null;
let connection = null;
let db = null;

async function connect() {
  mongoClient = new MongoClient(process.env.MONGO_CONNECTION, {
    useUnifiedTopology: true,
  });
  await mongoClient.connect().then((conn) => {
    connection = conn;
    db = conn.db(process.env.DATABASE_NAME);
  });
  return true;
}

function getMongoClient() {
  if (!mongoClient) throw new Error("Mongo client is not initialized");
  return mongoClient;
}

function getDatabase() {
  if (!db) throw new Error("DB is not initialized");
  return db;
}

async function disconnect() {
  if (!connection) return true;
  await connection.close();
  connection = null;
  db = null;
  return true;
}

module.exports = { connect, getMongoClient, getDatabase, disconnect };
