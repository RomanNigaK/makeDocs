const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Drawings extends CommonModelMethods {
  constructor() {
    super("drawings");
  }

  _update(body, currentRowData, cb) {
    console.log(body);
    db.all(
      `UPDATE drawings SET name = '${body.name || currentRowData.name}', 
      number = '${body.number || currentRowData.number}',
      date = ${body.date || currentRowData.date},
      workAreas =${body.workAreas || currentRowData.workAreas},
      workStages = ${body.workStages || currentRowData.workStages},
      acts=${body.acts || currentRowData.acts},
      pageCount=${body.pageCount || currentRowData.pageCount},
      File='${body.file || currentRowData.file}'  WHERE id = ${body.id}`,
      cb
    );
  }
}

module.exports.Drawings = Drawings;
