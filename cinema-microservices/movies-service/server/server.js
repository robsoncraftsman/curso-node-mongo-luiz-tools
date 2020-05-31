const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
let server = null;

async function start(api, repository) {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(morgan("dev"));
    app.use(helmet());
    app.use((err, req, res, next) => {
      reject(err);
    });

    api(app, repository);
    server = app.listen(parseInt(process.env.SERVER_PORT), () =>
      resolve(server)
    );
  });
}

async function stop() {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close();
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

module.exports = { start, stop };
