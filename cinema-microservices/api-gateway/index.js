const http = require("http");
const express = require("express");
const httpProxy = require("express-http-proxy");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

const moviesServiceProxy = httpProxy("http://localhost:3010");
const cinemaCatalogServiceProxy = httpProxy("http://localhost:3020");

app.get("/movies(?:$|/*)", (req, res, next) => {
  moviesServiceProxy(req, res, next);
});

app.get("/cities(?:$|/*)", (req, res, next) => {
  cinemaCatalogServiceProxy(req, res, next);
});

app.get("/cinemas(?:$|/*)", (req, res, next) => {
  cinemaCatalogServiceProxy(req, res, next);
});

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);
