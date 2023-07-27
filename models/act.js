const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Act extends CommonModelMethods {
  constructor() {
    super("acts");
  }

  _update(body, currentRowData, cb) {
    console.log(body);
    db.all(
      `UPDATE acts SET name = '${body.name || currentRowData.name}', 
      number='${body.number || currentRowData.number}', date='${
        body.date || currentRowData.date
      }', workAreas='${
        body.workAreas || currentRowData.workAreas
      }', workStages='${
        body.workStages || currentRowData.workStages
      }', spType='${body.spType || currentRowData.spType}'  WHERE id = ${
        body.id
      }`,
      cb
    );
  }
}

module.exports.Act = Act;
