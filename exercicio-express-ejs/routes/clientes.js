var express = require("express");
var router = express.Router();
var messages = require("../messages");
var clienteModel = require("../models/clienteModel");

router.get("/", function (req, res, next) {
  clienteModel.findClientes(function (err, clientes) {
    if (err) return console.log(err);
    res.render("clientes/lista_clientes", { messages, clientes });
  });
});

router.get("/new", function (req, res, next) {
  res.render("clientes/cadastro_clientes", { messages, cliente: {} });
});

router.get("/edit/:id", function (req, res, next) {
  clienteModel.findCliente(req.params.id, function (err, cliente) {
    if (err) return console.log(err);
    res.render("clientes/cadastro_clientes", { messages, cliente });
  });
});

router.post("/save", function (req, res, next) {
  const id = req.body.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;

  if (id != "") {
    clienteModel.updateCliente(id, { nome, idade, uf }, function (err, result) {
      if (err) return console.log(err);
      res.redirect("/clientes");
    });
  } else {
    clienteModel.insertCliente({ nome, idade, uf }, function (err, result) {
      if (err) return console.log(err);
      res.redirect("/clientes");
    });
  }
});

router.get("/delete/:id", function (req, res, next) {
  clienteModel.deleteCliente(req.params.id, function (err, result) {
    if (err) return console.log(err);
    res.redirect("/clientes");
  });
});

module.exports = router;
