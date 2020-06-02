const test = require("blue-tape");
const repository = require("./repository");

function runTests() {
  test("Repository AddMovie", async (t) => {
    const result = await repository.addMovie({
      titulo: "Vingadores",
      sinopse: "Heróis mais poderosos da Terra",
      duracao: 120,
      dataLancamento: new Date(),
      imagem:
        "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
      categorias: ["Aventura"],
    });
    t.assert(result.insertedCount > 0, "Movie added");
  });

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
