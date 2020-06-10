const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const mail = require("../mail");

/* GET users listing. */
router.get("/signup", function (req, res, next) {
  if (req.query.fail)
    res.render("signup", { message: "Falha no cadastro do usuário!" });
  else res.render("signup", { message: null });
});

/* POST users */
router.post("/signup", async function (req, res, next) {
  try {
    await userModel.createUser(
      req.body.username,
      req.body.password,
      req.body.email,
      req.body.profile
    );

    const text = `Obrigado por se cadastrar ${req.body.username}, sua senha é ${req.body.password}`;
    await mail.send(req.body.email, "Cadastro realizado com sucesso!", text);

    res.redirect("/");
  } catch (err) {
    const error = new Error(err);
    error.status = 500;
    return next(error);
  }
});

/* POST forgot */
router.post("/forgot", async function (req, res, next) {
  try {
    const { newPassword } = await userModel.resetPassword(req.body.email);

    const text = `Olá,sua nova senha é ${newPassword}. Sua senha antiga, não funciona mais!`;
    await mail.send(req.body.email, "Sua senha foi alterada!", text);

    res.redirect("/");
  } catch (err) {
    const error = new Error(err);
    error.status = 500;
    return next(error);
  }
});

/** GET forgot */
router.get("/forgot", function (req, res, next) {
  res.render("forgot", {});
});

module.exports = router;
