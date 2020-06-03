const test = require("blue-tape");
const supertest = require("supertest");
const cinemaCatalog = require("./cinema-catalog");
const server = require("../server/server");
const repository = require("../repository/repository");

function runTests() {
  let app;
  let cityId;
  let cinemaId;

  test("API start server", async (t) => {
    return server.start(cinemaCatalog, repository).then((_app) => {
      t.assert(_app, "App started");
      app = _app;
    });
  });

  test("GET /cities", async (t) => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .get("/cities")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          resolve(res);
        });
    }).then((res) => {
      t.assert(res.body && res.body.length > 0, "All Cities returned");
      if (res.body && res.body.length > 0) cityId = res.body[1]._id;
    });
  });

  test("GET /cities/:city/movies", async (t) => {
    return new Promise((resolve, reject) => {
      console.log(cityId);
      supertest(app)
        .get("/cities/" + cityId + "/movies")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          resolve(res);
        });
    }).then((res) => {
      if (res.body && res.body.length > 0) movieId = res.body[0].idFilme;
      t.assert(res.body && res.body.length > 0, "Movies By City Id returned");
    });
  });

  test("GET /cities/:city/movies/:movie", async (t) => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .get("/cities/" + cityId + "/movies/" + movieId)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          resolve(res);
        });
    }).then((res) => {
      if (res.body && res.body.length > 0) cinemaId = res.body[0].idCinema;
      t.assert(
        res.body && res.body.length > 0,
        "Movie Sessions by City Id returned"
      );
    });
  });

  test("GET /cities/:city/cinemas", async (t) => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .get("/cities/" + cityId + "/cinemas")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          resolve(res);
        });
    }).then((res) => {
      t.assert(res.body && res.body.length > 0, "Cinemas By City Id returned");
    });
  });

  test("GET /cinemas/:cinema/movies", async (t) => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .get("/cinemas/" + cinemaId + "/movies")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          resolve(res);
        });
    }).then((res) => {
      t.assert(res.body && res.body.length > 0, "Movies By Cinema Id returned");
    });
  });

  test("GET /cinemas/:cinema/movies/:movie", async (t) => {
    return new Promise((resolve, reject) => {
      supertest(app)
        .get("/cinemas/" + cinemaId + "/movies/" + movieId)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          resolve(res);
        });
    }).then((res) => {
      t.assert(
        res.body && res.body.length > 0,
        "Movie Sessions By Cinema Id returned"
      );
    });
  });

  test("API stop server", async (t) => {
    await repository.disconnect();
    return server.stop().then((stopped) => {
      t.assert(stopped, "App stopped");
    });
  });
}

module.exports = { runTests };
