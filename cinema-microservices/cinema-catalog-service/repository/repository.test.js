const test = require("blue-tape");
const mongodb = require("../config/mongodb");
const repository = require("./repository");

function runTests() {
  let cityId;
  let cinemaId;

  test("Repository getAllCities", async (t) => {
    const cities = await repository.getAllCities();
    console.log(JSON.stringify(cities, null, 2));

    if (cities && cities.length > 0) cityId = cities[1]._id;
    t.assert(cities && cities.length > 0, "All Cities Returned");
  });

  test("Repository getCinemasByCityId", async (t) => {
    const cinemas = await repository.getCinemasByCityId(cityId);
    console.log(cinemas);

    if (cinemas && cinemas.length > 0) cinemaId = cinemas[0]._id;
    t.assert(cinemas && cinemas.length > 0, "All Cinemas Returned By City Id");
  });

  test("Repository getMoviesByCinemaId", async (t) => {
    const movies = await repository.getMoviesByCinemaId(cinemaId);
    console.log(movies);

    t.assert(movies && movies.length > 0, "Movies By Cinema Id Returned");
  });

  test("Repository getMoviesByCityId", async (t) => {
    const movies = await repository.getMoviesByCityId(cityId);
    console.log(movies);

    if (movies && movies.length > 0) movieId = movies[1].idFilme;
    t.assert(movies && movies.length > 0, "Movies By City Id Returned");
  });

  test("Repository getMovieSessionsByCityId", async (t) => {
    const sessions = await repository.getMovieSessionsByCityId(movieId, cityId);
    console.log(sessions);

    t.assert(
      sessions && sessions.length > 0,
      "Movie Sessions By City Id Returned"
    );
  });

  test("Repository getMovieSessionsByCinemaId", async (t) => {
    const sessions = await repository.getMovieSessionsByCinemaId(
      movieId,
      cinemaId
    );
    console.log(sessions);

    t.assert(
      sessions && sessions.length > 0,
      "Movie Sessions By Cinema Id Returned"
    );
  });

  test("Repository Disconnect", async (t) => {
    const disconected = await repository.disconnect();
    t.assert(disconected, "Disconnect Ok");
  });
}

module.exports = { runTests };
