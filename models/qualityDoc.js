const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class QualityDocs extends CommonModelMethods {
  constructor() {
    super("qualityDocs");
  }

  _update(body, currentRowData, cb) {
    console.log(body);
    db.all(
      `UPDATE qualityDocs SET name = '${body.name || currentRowData.name}', 
      beginDate='${body.beginDate || currentRowData.beginDate}',
      endDate='${body.endDate || currentRowData.endDate}',
      pageCount='${body.pageCount || currentRowData.pageCount}'  WHERE id = ${
        body.id
      }`,
      cb
    );
  }
}

module.exports.QualityDocs = QualityDocs;
