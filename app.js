const express = require("express");
const config = require("config");
const path = require("path");
const fs = require("fs");
const PORT = config.get("port") || 5000;
const http = require("http");
const app = express();
const BodyParser = require("body-parser");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(config.dbName);

var headerServer = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", " true");
  res.header(
    "Access-Control-Allow-Headers",
    " Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type"
  );
  next();
};
app.use(headerServer);

const httpServer = http.createServer(app);

app.use(express.json({ extended: true }));
app.use(BodyParser.urlencoded({ extended: false }));

app.use(require("./middleware/uploadFile").single("file"));

app.use(function (req, res, next) {
  const body =
    Object.entries(req.body).length > 0
      ? req.body
      : Object.entries(req.query).length > 0
      ? req.query
      : null;

  if (!body) return next();

  const options = Object.keys(body);

  if (req.method === "POST") {
    const values = Object.values(body);

    const isValues = values.every((e) => !!e);

    if (!isValues) {
      const notDataFields = options.filter((i) => !!!body[i]);
      return res.status(400).send({
        error: `required fields: ${notDataFields.join(",")}`,
      });
    }

    if (body.file && body.file === "undefined") {
      return res.status(400).send({
        error: `file not selected`,
      });
    }
  }

  const arrIntegers = [
    "id",
    "standards",
    "qualityDocs",
    "workStages",
    "workAreas",
    "date",
    "inn",
    "ogrn",
    "sroInn",
    "sroOgrn",
    "pageCount",
    "beginDate",
    "endDate",
    "acts",
    "company",
  ];

  let arrErrorProperty = [];
  options.forEach((e) => {
    if (arrIntegers.includes(e)) {
      if (!Number.isInteger(Number(body[e])))
        arrErrorProperty.push(`${e.toLocaleUpperCase()}`);
    }
  });

  if (arrErrorProperty.length > 0)
    return res.status(400).send({
      error: `Error valid ${arrErrorProperty.join(
        ","
      )} the ${arrErrorProperty.join(",")} must be an integer type!`,
    });

  next();
});

app.use("/api/project", require("./routes/project.router"));
app.use("/api/design", require("./routes/design.router"));
app.use("/api/standard", require("./routes/standard.router"));
app.use("/api/workArea", require("./routes/workArea.router"));
app.use("/api/workStage", require("./routes/workStage.router"));
app.use("/api/material", require("./routes/material.router"));
app.use("/api/act", require("./routes/act.router"));
app.use("/api/qualitydoc", require("./routes/qualityDoc.router"));
app.use("/api/drawing", require("./routes/drawing.router"));
app.use("/api/lab", require("./routes/lab.router"));
app.use("/api/member", require("./routes/member.router"));
app.use("/api/company", require("./routes/company.router"));

const CreateTable = require("./models/createTables").CreateTable;

CreateTable.startApp();

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

async function start() {
  if (process.env.NODE_ENV === "production") {
    httpServer.listen(PORT, () => console.log(`Server start ${PORT}`));
  } else {
    httpServer.listen(PORT, () => console.log(`Server start ${PORT}`));
  }
}
start();
app.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});

exports.module = db;
