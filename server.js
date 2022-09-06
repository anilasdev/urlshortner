require("dotenv").config();
const express = require("express"),
  app = express(),
  server = require("http").Server(app),
  router = express.Router(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  fs = require("fs"),
  path = require("path"),
  port = process.env.PORT || 8000;

app.use(
  cors({
    origin: true,
  })
);

fs.readdirSync("./app/routes").forEach((file) => {
  router.use(
    `/${path.parse(file).name}`,
    require(`./app/routes/${file}`)(express.Router())
  );
});

app.use(router);

server.listen(port, () => {
  console.log(
    `Server active at http://localhost:${port} on ID: ${process.pid}`
  );
});