const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

/* GET users listing. */
router.get("/signup", function (req, res, next) {
  if (req.query.fail)
    res.render("signup", { message: "Falha no cadastro do usuário!" });
  else res.render("signup", { message: null });
});

/* POST users */
router.post("/signup", function (req, res, next) {
  userModel
    .createUser(req.body.username, req.body.password, req.body.email)
    .then(() => {
      const text = `Obrigado por se cadastrar ${req.body.username}, sua senha é ${req.body.password}`;
      console.log(text);
      /*
      require("../mail")(
        req.body.email,
        "Cadastro realizado com sucesso!",
        text
      );
      */
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users/signup?fail=true");
    });
});

/* POST forgot */
router.post("/forgot", function (req, res, next) {
  userModel
    .resetPassword(req.body.email)
    .then(({ result, newPassword }) => {
      console.log(result);
      const text = `Olá,sua nova senha é ${newPassword}. Sua senha antiga, não funciona mais!`;
      console.log(text);
      /*
      require("../mail")(req.body.email, "Sua senha foi alterada!", text);
      */
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login?reset=true");
    });
});

/** GET forgot */
router.get("/forgot", function (req, res, next) {
  res.render("forgot", {});
});

module.exports = router;
