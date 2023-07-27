const express = require("express");
const config = require("config");
const path = require("path");
const fs = require("fs");
const PORT = config.get("port") || 5000;
const http = require("http");
const app = express();

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

app.use("/api/project", require("./routes/project.router"));
app.use("/api/design", require("./routes/design.router"));
app.use("/api/standard", require("./routes/standard.router"));
app.use("/api/workArea", require("./routes/workArea.router"));
app.use("/api/workStage", require("./routes/workStage.router"));
app.use("/api/material", require("./routes/material.router"));
app.use("/api/act", require("./routes/act.router"));

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
