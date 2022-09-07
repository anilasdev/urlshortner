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

app.use(
  bodyParser.urlencoded({
    limit: "1mb",
    extended: true,
    type: "application/x-www-form-urlencoded",
  })
);

app.use(
  bodyParser.json({
    limit: "1mb",
    type: "application/*",
  })
);
app.get("/status", (req, res) => {
  res.send("Ok");
});

fs.readdirSync("./app/routes").forEach((file) => {
  router.use(`/`, require(`./app/routes/${file}`)(express.Router()));
});

app.use(router);

server.listen(port, () => {
  console.log(
    `Server active at http://localhost:${port} on ID: ${process.pid}`
  );
});
