var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");

/* GET home page. */
router.get("/:pagina?", global.authenticationMiddleware(), async function (
  req,
  res,
  next
) {
  const paginaAtual = parseInt(req.params.pagina || "1");
  const usersCount = await userModel.countAll();
  const totalPaginas = Math.ceil(usersCount / userModel.TAMANHO_PAGINA);
  const users = await userModel.findAllUsers(paginaAtual);

  res.render("index", {
    title: req.user.username,
    users,
    usersCount,
    paginaAtual,
    totalPaginas,
    profile: req.user.profile,
  });
});

module.exports = router;
