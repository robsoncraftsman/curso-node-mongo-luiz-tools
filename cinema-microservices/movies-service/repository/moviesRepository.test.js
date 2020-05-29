const test = require("tape");
const repository = require("./moviesRepository");

function runTests() {
  test("Repository GetAllMovies", (t) => {
    (async () => {
      const movies = await repository.getAllMovies();
      t.assert(movies && movies.length > 0, "All Movies Returned");
      t.end();
    })();
  });

  test("Repository GetMovieById", (t) => {
    (async () => {
      const id = "5ed0713c380e6d955fcf4406";
      const movie = await repository.getMovieById(id);
      t.assert(movie, "Movie by Id Returned");
      t.end();
    })();
  });

  test("Repository GetMoviePremiers", (t) => {
    (async () => {
      const movies = await repository.getMoviePremiers();
      t.assert(movies && movies.length > 0, "Movie Premiers Returned");
      t.end();
    })();
  });

  test("Repository Disconnect", (t) => {
    (async () => {
      t.assert(await repository.disconnect(), "Disconnect Ok");
      t.end();
    })();
  });
}

module.exports = { runTests };
