var express = require("express");
var router = express.Router();
var clienteModel = require("../models/clienteModel.js");

router.get("/", function (req, res, next) {
  clienteModel.findClientes((err, clientes) => {
    if (err) {
      res.status(500);
      res.json(err);
    }
    res.json(clientes);
  });
});

router.get("/:id", function (req, res, next) {
  clienteModel.findCliente(req.params.id, (err, cliente) => {
    if (err) {
      res.status(500);
      res.json(err);
    }
    res.json(cliente);
  });
});

router.post("/", function (req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;

  clienteModel.insertCliente({ nome, idade, uf }, function (err, result) {
    if (err) {
      res.status(500);
      res.json(err);
    }
    res.status(201);
    res.json(result);
  });
});

router.put("/:id", function (req, res, next) {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;

  clienteModel.updateCliente(id, { nome, idade, uf }, function (err, result) {
    if (err) {
      res.status(500);
      res.json(err);
    }
    res.json(result);
  });
});

router.patch("/:id", function (req, res, next) {
    const id = req.params.id;
    const cliente = {};
    const nome = req.body.nome;
    if (nome) cliente.nome = nome;
    const idade = req.body.idade;
    if (idade) cliente.idade = parseInt(idade);
    const uf = req.body.uf;
    if (uf) cliente.uf = uf;
  
    clienteModel.updateDadosCliente(id, cliente, function (err, result) {
      if (err) {
        res.status(500);
        res.json(err);
      }
      res.json(result);
    });
  });

router.delete("/:id", function (req, res, next) {
  clienteModel.deleteCliente(req.params.id, function (err, result) {
    if (err) {
      res.status(500);
      res.json(err);
    }
    res.json(result);
  });
});

module.exports = router;
