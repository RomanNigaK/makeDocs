const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Standards extends CommonModelMethods {
  constructor() {
    super("standards");
  }

  _update(body, currentRowData, cb) {
    db.all(
      `UPDATE standards SET name = '${
        body.name || currentRowData.name
      }', code='${body.code || currentRowData.code}'  WHERE id = ${body.id}`,
      cb
    );
  }
}

module.exports.Standards = Standards;
