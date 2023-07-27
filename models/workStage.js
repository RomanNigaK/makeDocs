const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class WorkStages extends CommonModelMethods {
  constructor() {
    super("workStages");
  }

  _update(body, currentRowData, cb) {
    db.all(
      `UPDATE workStages SET name = '${
        body.name || currentRowData.name
      }', standards=${body.standards || currentRowData.standards}  WHERE id = ${
        body.id
      }`,
      cb
    );
  }
}

module.exports.WorkStages = WorkStages;
