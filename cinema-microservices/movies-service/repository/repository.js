const mongodb = require("../config/mongodb");
const objectId = require("mongodb").ObjectId;

async function addMovie(movie) {
  const db = await mongodb.connect();
  return await db.collection("movies").insertOne(movie);
}

async function getAllMovies() {
  const db = await mongodb.connect();
  return await db.collection("movies").find().toArray();
}

async function getMovieById(id) {
  const db = await mongodb.connect();
  return await db.collection("movies").findOne({ _id: objectId(id) });
}

async function getMoviePremiers() {
  var monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  monthAgo.setHours(0, 0, 0);
  monthAgo.setMilliseconds(0);

  const db = await mongodb.connect();
  return await db
    .collection("movies")
    .find({ dataLancamento: { $gte: monthAgo } })
    .toArray();
}

async function disconnect() {
  return await mongodb.disconnect();
}

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  getMoviePremiers,
  disconnect,
};
