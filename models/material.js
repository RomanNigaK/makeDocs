const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Materials extends CommonModelMethods {
  constructor() {
    super("materials");
  }

  _update(body, currentRowData, cb) {
    console.log(body);
    db.all(
      `UPDATE materials SET name = '${
        body.name || currentRowData.name
      }', qualityDocs='${
        body.qualityDocs || currentRowData.qualityDocs
      }', workStages='${
        body.workStages || currentRowData.workStages
      }'  WHERE id = ${body.id}`,
      cb
    );
  }
}

module.exports.Materials = Materials;
