const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Design extends CommonModelMethods {
  constructor() {
    super("designs");
  }

  _update(body, currentRowData, cb) {
    db.all(
      `UPDATE designs SET name = '${
        body.name || currentRowData.name
      }', designCode='${
        body.designCode || currentRowData.designCode
      }'  WHERE id = ${body.id}`,
      cb
    );
  }
}

module.exports.Design = Design;
