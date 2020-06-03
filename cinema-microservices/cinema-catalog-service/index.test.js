require("dotenv-safe").config();

require("./config/mongodb.test").runTests();

require("./repository/repository.test").runTests();

require("./server/server.test").runTests();

require("./api/cinema-catalog.test").runTests();

/*
#Comandos para inicializar o database

use cinema-catalog-service

db.cinemaCatalog.insert([
  { cidade: "Gravataí", uf: "RS", cinemas: [] },
  {
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [
      {
        _id: ObjectId(),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: ISODate("2018-06-01T09:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                ],
              },
              {
                data: ISODate("2018-06-01T11:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                ],
              },
              {
                data: ISODate("2018-06-01T13:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                  { numero: 2, disponivel: true },
                ],
              },
            ],
          },
          {
            nome: 2,
            sessoes: [
              {
                data: ISODate("2018-06-01T09:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Vingadores: Era de Ultron",
                valor: 25.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                ],
              },
              {
                data: ISODate("2018-06-01T11:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Vingadores: Era de Ultron",
                valor: 25.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                ],
              },
              {
                data: ISODate("2018-06-01T13:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                  { numero: 2, disponivel: true },
                ],
              },
            ],
          },
        ],
      },
      {
        _id: ObjectId(),
        nome: "GNC Lindóia",
        salas: [
          {
            nome: 100,
            sessoes: [
              {
                data: ISODate("2018-06-01T09:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Os Vingadores",
                valor: 25.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                ],
              },
              {
                data: ISODate("2018-06-01T11:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Os Vingadores",
                valor: 25.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: true },
                ],
              },
              {
                data: ISODate("2018-06-01T13:00:00Z"),
                idFilme: ObjectId("5ed0713c380e6d955fcf4406"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.0,
                assentos: [
                  { numero: 1, disponivel: true },
                  { numero: 2, disponivel: false },
                  { numero: 2, disponivel: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
*/
