const userModel = require("./models/userModel");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    userModel
      .findUserById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        userModel
          .findUser(username)
          .then((user) => {
            // usuário inexistente
            if (!user) {
              return done(null, false);
            }

            // comparando as senhas
            bcrypt.compare(password, user.password, (err, isValid) => {
              if (err) {
                return done(err);
              }
              if (!isValid) {
                return done(null, false);
              }
              return done(null, user);
            });
          })
          .catch((err) => done(err, null));
      }
    )
  );
};
