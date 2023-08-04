const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const CommonModelMethods = require("./CommonModelMethods").CommonModelMethods;

class Companies extends CommonModelMethods {
  constructor() {
    super("companies");
  }

  _update(body, currentRowData, cb) {
    console.log(body);
    db.all(
      `UPDATE companies SET fullName = '${
        body.fullName || currentRowData.fullName
      }', 
      shortName='${body.shortName || currentRowData.shortName}', 
      address='${body.address || currentRowData.address}',
      inn='${body.inn || currentRowData.inn}',
      ogrn='${body.ogrn || currentRowData.ogrn}',
      sroName='${body.sroName || currentRowData.sroName}',
      sroAddress='${body.sroAddress || currentRowData.sroAddress}',
      sroInn='${body.sroInn || currentRowData.sroInn}',
      sroOgrn='${body.sroOgrn || currentRowData.sroOgrn}',
      role='${body.role || currentRowData.role}'
     WHERE id = ${body.id}`,
      cb
    );
  }
}

module.exports.Companies = Companies;
