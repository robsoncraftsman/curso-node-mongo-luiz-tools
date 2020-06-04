require("dotenv-safe").config();
const http = require("http");
const express = require("express");
const httpProxy = require("express-http-proxy");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

const moviesServiceProxy = httpProxy("http://localhost:3010");
const cinemaCatalogServiceProxy = httpProxy("http://localhost:3020");

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided" });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token" });

    req.userId = decoded.id;
    next();
  });
}

app.post("/login", (req, res, next) => {
  const userId = req.body.user;
  const pwd = req.body.pwd;
  if (userId === "JOAO" && pwd === "123") {
    var token = jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: 300, // expires in 5min
    });

    res.status(200).send({ auth: true, token: token });
  } else {
    res.status(401).send("Invalid login");
  }
});

app.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

app.get("/movies(?:$|/*)", verifyJWT, (req, res, next) => {
  moviesServiceProxy(req, res, next);
});

app.get("/cities(?:$|/*)", verifyJWT, (req, res, next) => {
  cinemaCatalogServiceProxy(req, res, next);
});

app.get("/cinemas(?:$|/*)", verifyJWT, (req, res, next) => {
  cinemaCatalogServiceProxy(req, res, next);
});

const server = http.createServer(app);
server.listen(3000);
