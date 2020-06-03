const mongodb = require("../config/mongodb");
const ObjectId = require("mongodb").ObjectId;

async function getAllCities() {
  const db = await mongodb.connect();
  return await db
    .collection("cinemaCatalog")
    .find({}, { projection: { cidade: 1, uf: 1, pais: 1 } })
    .toArray();
}

async function getCinemasByCityId(cityId) {
  const db = await mongodb.connect();
  const objCityId = ObjectId(cityId);
  const cities = await db
    .collection("cinemaCatalog")
    .find({ _id: objCityId }, { projection: { cinemas: 1 } })
    .toArray();

  if (cities.length > 0) {
    return cities[0].cinemas;
  } else {
    return null;
  }
}

async function getMoviesByCinemaId(cinemaId) {
  const db = await mongodb.connect();
  const objCinemaId = ObjectId(cinemaId);
  return await db
    .collection("cinemaCatalog")
    .aggregate([
      { $match: { "cinemas._id": objCinemaId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      {
        $group: {
          _id: {
            filme: "$cinemas.salas.sessoes.filme",
            idFilme: "$cinemas.salas.sessoes.idFilme",
          },
        },
      },
    ])
    .toArray();
}

async function getMoviesByCityId(cityId) {
  const db = await mongodb.connect();
  const objCityId = ObjectId(cityId);
  const sessions = await db
    .collection("cinemaCatalog")
    .aggregate([
      { $match: { _id: objCityId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      {
        $group: {
          _id: {
            filme: "$cinemas.salas.sessoes.filme",
            idFilme: "$cinemas.salas.sessoes.idFilme",
          },
        },
      },
    ])
    .toArray();

  return sessions.map((item) => {
    return { idFilme: item._id.idFilme, filme: item._id.filme };
  });
}

async function getMovieSessionsByCityId(movieId, cityId) {
  const db = await mongodb.connect();
  const objMovieId = ObjectId(movieId);
  const objCityId = ObjectId(cityId);
  const sessions = await db
    .collection("cinemaCatalog")
    .aggregate([
      { $match: { _id: objCityId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
      {
        $group: {
          _id: {
            filme: "$cinemas.salas.sessoes.filme",
            idFilme: "$cinemas.salas.sessoes.idFilme",
            idCinema: "$cinemas._id",
            sala: "$cinemas.salas.nome",
            sessao: "$cinemas.salas.sessoes",
          },
        },
      },
    ])
    .toArray();

  return sessions.map((item) => {
    return {
      idFilme: item._id.idFilme,
      filme: item._id.filme,
      idCinema: item._id.idCinema,
      sala: item._id.sala,
      sessao: item._id.sessao,
    };
  });
}

async function getMovieSessionsByCinemaId(movieId, cinemaId, callback) {
  const db = await mongodb.connect();
  const objCinemaId = ObjectId(cinemaId);
  const objMovieId = ObjectId(movieId);
  const sessions = await db
    .collection("cinemaCatalog")
    .aggregate([
      { $match: { "cinemas._id": objCinemaId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
      {
        $group: {
          _id: {
            filme: "$cinemas.salas.sessoes.filme",
            idFilme: "$cinemas.salas.sessoes.idFilme",
            sala: "$cinemas.salas.nome",
            sessao: "$cinemas.salas.sessoes",
          },
        },
      },
    ])
    .toArray();

  return sessions.map((item) => {
    return {
      idFilme: item._id.idFilme,
      filme: item._id.filme,
      sala: item._id.sala,
      sessao: item._id.sessao,
    };
  });
}

async function disconnect() {
  return await mongodb.disconnect();
}

module.exports = {
  getAllCities,
  getCinemasByCityId,
  getMoviesByCinemaId,
  getMoviesByCityId,
  getMovieSessionsByCityId,
  getMovieSessionsByCinemaId,
  disconnect,
};
