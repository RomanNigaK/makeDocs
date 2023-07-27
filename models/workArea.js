const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class WorkAreas extends CommonModelMethods {
  constructor() {
    super("workAreas");
  }

  _update(body, currentRowData, cb) {
    console.log(body);
    db.all(
      `UPDATE workAreas SET name = '${
        body.name || currentRowData.name
      }', axis='${body.axis || currentRowData.axis}', highLevel='${
        body.highLevel || currentRowData.highLevel
      }'  WHERE id = ${body.id}`,
      cb
    );
  }
}

module.exports.WorkAreas = WorkAreas;
