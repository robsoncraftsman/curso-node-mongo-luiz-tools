var passport = require("passport");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Login", message: null });
});

/* GET login page */
router.get("/login", function (req, res) {
  if (req.query.fail)
    res.render("login", { message: "Usuário e/ou senha incorretos!" });
  else res.render("login", { message: null });
});

/* POST validate login page */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login?fail=true",
  })
);

router.post("/logoff", function (req, res, next) {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
