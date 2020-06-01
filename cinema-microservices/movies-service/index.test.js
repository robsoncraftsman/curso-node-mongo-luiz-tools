require("dotenv-safe").config();

require("./config/mongodb.test").runTests();

require("./repository/moviesRepository.test").runTests();

require("./server/server.test").runTests();

require("./api/movies.test").runTests();

/*
#Comandos para inicializar o database

use movies-service

db.movies.insert([
  {
    titulo: "Os Vingadores: Guerra Infinita",
    sinopse: "Os heróis mais poderosos da Marvel enfrentando o Thanos",
    duracao: 120,
    dataLancamento: new Date(),
    imagem: "http://www.luiztools.com.br/vingadores-gi.jpg",
    categorias: ["Aventura", "Ação"],
  },
  {
    titulo: "Os Vingadores: Era de Ultron",
    sinopse: "Os heróis mais poderosos da Marvel enfrentando o Ultron",
    duracao: 110,
    dataLancamento: new Date(),
    imagem: "http://www.luiztools.com.br/vingadores-eu.jpg",
    categorias: ["Aventura", "Ação"],
  },
  {
    titulo: "Os Vingadores",
    sinopse: "Os heróis mais poderosos da Marvel enfrentando o Loki",
    duracao: 100,
    dataLancamento: new Date(),
    imagem: "http://www.luiztools.com.br/vingadores.jpg",
    categorias: ["Aventura", "Ação"],
  },
]);
*/
