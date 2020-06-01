const test = require("blue-tape");
const supertest = require("supertest");
const movies = require("./movies");
const server = require("../server/server");
const moviesRepository = require("../repository/moviesRepository");

function runTests() {
  test("GET /movies", async (t) => {
    return server
      .start(movies, moviesRepository)
      .then(async (app) => {
        return new Promise((resolve, reject) => {
          supertest(app)
            .get("/movies")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              resolve(res);
            });
        }).then((res) => {
          t.assert(res.body && res.body.length > 0, "All Movies returned");
        });
      })
      .then(async () => {
        await moviesRepository.disconnect().then(server.stop());
      });
  });

  test("GET /movies/:id", async (t) => {
    return server
      .start(movies, moviesRepository)
      .then(async (app) => {
        return new Promise((resolve, reject) => {
          const id = "5ed0713c380e6d955fcf4406";
          supertest(app)
            .get("/movies/" + id)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              resolve(res);
            });
        }).then((res) => {
          t.assert(res.body, "Movies By Id returned");
        });
      })
      .then(async () => {
        await moviesRepository.disconnect().then(server.stop());
      });
  });

  test("GET /movies/premieres", async (t) => {
    return server
      .start(movies, moviesRepository)
      .then(async (app) => {
        return new Promise((resolve, reject) => {
          supertest(app)
            .get("/movies/premieres")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              resolve(res);
            });
        }).then((res) => {
          t.assert(res.body && res.body.length > 0, "Premiere Movies returned");
        });
      })
      .then(async () => {
        await moviesRepository.disconnect().then(server.stop());
      });
  });
}

module.exports = { runTests };
