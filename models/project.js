const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Project extends CommonModelMethods {
  constructor() {
    super("projects");
  }

  _update(body, currentRowData, cb) {
    db.all(
      `UPDATE projects SET name = '${
        body.name || currentRowData.name
      }'  WHERE id = ${body.id}`,
      cb
    );
  }
}

module.exports.Project = Project;
