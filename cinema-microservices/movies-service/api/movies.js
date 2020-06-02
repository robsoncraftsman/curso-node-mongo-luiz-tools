const schemas = require("./schemas");

module.exports = (app, repository) => {
  app.post("/movies", (req, res, next) => {
    const validatedMovie = schemas.movieSchema.validate(req.body);
    if (validatedMovie.error) return res.status(400).json(validatedMovie.error);

    repository
      .addMovie(validatedMovie)
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/movies", (req, res, next) => {
    repository
      .getAllMovies()
      .then((movies) => res.json(movies))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/movies/premieres", (req, res, next) => {
    repository
      .getMoviePremiers()
      .then((movies) => res.json(movies))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/movies/:id", (req, res, next) => {
    const id = req.params.id;
    repository
      .getMovieById(id)
      .then((movie) => res.json(movie))
      .catch((err) => res.status(400).json(err));
  });
};
