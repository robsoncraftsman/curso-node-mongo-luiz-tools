const bcrypt = require("bcryptjs");
const utils = require("../utils");
const db = require("./db");
const objectId = require("mongodb").ObjectId;

const TAMANHO_PAGINA = 5;

async function findUser(username) {
  return db
    .getDatabase()
    .collection("users")
    .findOne({ username: username })
    .then((user) => user);
}

async function findUserById(id) {
  return db
    .getDatabase()
    .collection("users")
    .findOne({ _id: objectId(id) })
    .then((user) => user);
}

async function createUser(username, password, email, profile) {
  const cryptoPassword = bcrypt.hashSync(password, 10);
  return db
    .getDatabase()
    .collection("users")
    .insertOne({ username, password: cryptoPassword, email, profile })
    .then((result) => result);
}

async function resetPassword(email) {
  const newPassword = utils.generatePassword();
  const cryptoPassword = bcrypt.hashSync(newPassword, 10);
  return db
    .getDatabase()
    .collection("users")
    .updateOne({ email: email }, { $set: { password: cryptoPassword } })
    .then((result) => {
      return { result, newPassword };
    });
}

async function countAll() {
  return db.getDatabase().collection("users").countDocuments();
}

async function findAllUsers(pagina) {
  const totalSkip = (pagina - 1) * TAMANHO_PAGINA;
  return db
    .getDatabase()
    .collection("users")
    .find()
    .skip(totalSkip)
    .limit(TAMANHO_PAGINA)
    .toArray();
}

module.exports = {
  findUser,
  findUserById,
  createUser,
  resetPassword,
  countAll,
  findAllUsers,
  TAMANHO_PAGINA,
};
