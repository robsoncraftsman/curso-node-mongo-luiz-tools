module.exports = (app, repository) => {
  app.get("/cities", (req, res, next) => {
    repository
      .getAllCities()
      .then((cities) => res.json(cities))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/cities/:city/movies", (req, res, next) => {
    repository
      .getMoviesByCityId(req.params.city)
      .then((movies) => res.json(movies))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/cities/:city/movies/:movie", (req, res, next) => {
    repository
      .getMovieSessionsByCityId(req.params.movie, req.params.city)
      .then((sessions) => res.json(sessions))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/cities/:city/cinemas", (req, res, next) => {
    repository
      .getCinemasByCityId(req.params.city)
      .then((cinemas) => res.json(cinemas))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/cinemas/:cinema/movies", (req, res, next) => {
    repository
      .getMoviesByCinemaId(req.params.cinema)
      .then((movies) => res.json(movies))
      .catch((err) => res.status(400).json(err));
  });

  app.get("/cinemas/:cinema/movies/:movie", (req, res, next) => {
    repository
      .getMovieSessionsByCinemaId(req.params.movie, req.params.cinema)
      .then((sessions) => res.json(sessions))
      .catch((err) => res.status(400).json(err));
  });
};
