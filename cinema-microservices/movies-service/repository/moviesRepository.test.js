const test = require("blue-tape");
const repository = require("./moviesRepository");

function runTests() {
  test("Repository GetAllMovies", async (t) => {
    const movies = await repository.getAllMovies();
    t.assert(movies && movies.length > 0, "All Movies Returned");
  });

  test("Repository GetMovieById", async (t) => {
    const id = "5ed0713c380e6d955fcf4406";
    const movie = await repository.getMovieById(id);
    t.assert(movie, "Movie by Id Returned");
  });

  test("Repository GetMoviePremiers", async (t) => {
    const movies = await repository.getMoviePremiers();
    t.assert(movies && movies.length > 0, "Movie Premiers Returned");
  });

  test("Repository Disconnect", async (t) => {
    const disconected = await repository.disconnect();
    t.assert(disconected, "Disconnect Ok");
  });
}

module.exports = { runTests };
