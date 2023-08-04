const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Members extends CommonModelMethods {
  constructor() {
    super("members");
  }

  _update(body, currentRowData, cb) {
    console.log(body);
    db.all(
      `UPDATE members SET position = '${
        body.position || currentRowData.position
      }', fio='${body.fio || currentRowData.fio}', 
      orderDoc='${body.orderDoc || currentRowData.orderDoc}',
      sroNumber='${body.sroNumber || currentRowData.sroNumber}',
      role='${body.role || currentRowData.role}',
      company='${body.company || currentRowData.company}'  WHERE id = ${
        body.id
      }`,
      cb
    );
  }
}

module.exports.Members = Members;
