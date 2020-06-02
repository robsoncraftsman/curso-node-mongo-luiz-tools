const test = require("blue-tape");
const supertest = require("supertest");
const movies = require("./movies");
const server = require("../server/server");
const repository = require("../repository/repository");

function runTests() {
  test("POST /movies", async (t) => {
    return server
      .start(movies, repository)
      .then(async (app) => {
        const res = await new Promise((resolve, reject) => {
          supertest(app)
            .post("/movies")
            .send({
              titulo: "Vingadores",
              sinopse: "Heróis mais poderosos da Terra",
              duracao: 120,
              dataLancamento: new Date(),
              imagem:
                "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
              categorias: ["Aventura"],
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              resolve(res);
            });
        });
        t.assert(res && res.body.insertedCount > 0, "Movie Added");
        console.log(res.body);
      })
      .finally(async () => {
        await repository.disconnect();
        await server.stop();
      });
  });

  test("GET /movies", async (t) => {
    return server
      .start(movies, repository)
      .then(async (app) => {
        const res = await new Promise((resolve, reject) => {
          supertest(app)
            .get("/movies")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              resolve(res);
            });
        });
        t.assert(res.body && res.body.length > 0, "All Movies returned");
      })
      .finally(async () => {
        await repository.disconnect();
        await server.stop();
      });
  });

  test("GET /movies/:id", async (t) => {
    return server
      .start(movies, repository)
      .then(async (app) => {
        const id = "5ed0713c380e6d955fcf4406";
        const res = await new Promise((resolve, reject) => {
          supertest(app)
            .get("/movies/" + id)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              resolve(res);
            });
        });

        t.assert(res.body && res.body._id === id, "Movies By Id returned");
      })
      .finally(async () => {
        await repository.disconnect();
        await server.stop();
      });
  });

  test("GET /movies/premieres", async (t) => {
    return server
      .start(movies, repository)
      .then(async (app) => {
        const res = await new Promise((resolve, reject) => {
          supertest(app)
            .get("/movies/premieres")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              resolve(res);
            });
        });
        t.assert(res.body && res.body.length > 0, "Premiere Movies returned");
      })
      .finally(async () => {
        await repository.disconnect();
        await server.stop();
      });
  });
}

module.exports = { runTests };
