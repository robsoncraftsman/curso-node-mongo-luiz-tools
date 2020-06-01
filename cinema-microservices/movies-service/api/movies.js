module.exports = (app, moviesRepository) => {
  app.get("/movies", (req, res, next) => {
    moviesRepository
      .getAllMovies()
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => next(err));
  });

  app.get("/movies/premieres", (req, res, next) => {
    moviesRepository
      .getMoviePremiers()
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => next(err));
  });

  app.get("/movies/:id", (req, res, next) => {
    const id = req.params.id;
    moviesRepository
      .getMovieById(id)
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => next(err));
  });
};
