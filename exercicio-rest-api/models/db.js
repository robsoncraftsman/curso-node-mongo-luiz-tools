const {MongoClient} = require('mongodb');
const objectId = require("mongodb").ObjectId;

function conectar(callback) {
    const mongoClient = new MongoClient(process.env.MONGO_CONNECTION,  { useUnifiedTopology: true });
    mongoClient.connect()
        .then(conn => conn.db("curso-nodejs-mongodb-luiz-tools"))
        .then(db => global.conn = db)
        .then(callback())
        .catch(err => console.log(err));
}

module.exports = { conectar }