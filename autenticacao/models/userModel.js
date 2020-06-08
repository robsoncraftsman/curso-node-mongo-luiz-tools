const bcrypt = require("bcryptjs");
const utils = require("../utils");
const db = require("./db");
const objectId = require("mongodb").ObjectId;

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

async function createUser(username, password, email, callback) {
  const cryptoPassword = bcrypt.hashSync(password, 10);
  return db
    .getDatabase()
    .collection("users")
    .insertOne({ username, password: cryptoPassword, email })
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

module.exports = { findUser, findUserById, createUser, resetPassword };
