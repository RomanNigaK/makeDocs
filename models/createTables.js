const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class CreateTable {
  static _serialize(sql) {
    db.serialize(() => {
      sql.forEach((element) => {
        db.run(element);
      });
    });
  }

  static startApp() {
    const sql = [
      `CREATE TABLE IF NOT EXISTS projects
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        dataCreated   INTEGER(20)
       );
    `,
      `CREATE TABLE IF NOT EXISTS designs
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        designCode    TEXT,
        dataCreated   INTEGER(20)
       );
    `,
      `CREATE TABLE IF NOT EXISTS standards
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        code          TEXT,
        dataCreated   INTEGER(20)
      );
`,
      `CREATE TABLE IF NOT EXISTS workAreas
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        axis          TEXT,
        highLevel     TEXT,
        dataCreated   INTEGER(20)
      );
      `,
      `CREATE TABLE IF NOT EXISTS workStages
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        standards     INTEGER,
        dataCreated   INTEGER(20)
      );
      `,
      `CREATE TABLE IF NOT EXISTS materials
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        qualityDocs   INTEGER,
        workStages    INTEGER,
        dataCreated   INTEGER(20)
      );
      `,
      `CREATE TABLE IF NOT EXISTS acts
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        number        TEXT,
        date          INTEGER,
        workAreas     INTEGER,
        workStages    INTEGER,
        spType        TEXT,
        dataCreated   INTEGER(20)
    );
    `,
      `CREATE TABLE IF NOT EXISTS qualityDocs
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        beginDate     INTEGER,
        endDate       INTEGER,
        pageCount     INTEGER,
        File          TEXT,
        dataCreated   INTEGER(20)
    );
    `,
      `CREATE TABLE IF NOT EXISTS drawings
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        number        TEXT,
        date          INTEGER,
        workAreas     INTEGER,
        workStages    INTEGER,
        acts          INTEGER,
        pageCount     INTEGER,
        File          TEXT,
        dataCreated   INTEGER(20)
    );
    `,
      `CREATE TABLE IF NOT EXISTS labs
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        number        TEXT,
        date          INTEGER,
        workAreas     INTEGER,
        workStages    INTEGER,
        acts          INTEGER,
        File          TEXT,
        dataCreated   INTEGER(20)
    );
    `,
      `CREATE TABLE IF NOT EXISTS members
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        position      TEXT,
        fio           TEXT,
        orderDoc      TEXT,
        sroNumber     TEXT,
        role          TEXT,
        company       INTEGER,
        dataCreated   INTEGER(20) 
    );
    `,
      ,
      `CREATE TABLE IF NOT EXISTS companies
        (id           INTEGER      PRIMARY KEY AUTOINCREMENT,
        fullName      TEXT,
        shortName     TEXT,
        address       TEXT,
        inn           INTEGER,
        ogrn          INTEGER,
        sroName       TEXT,
        sroAddress    TEXT,
        sroInn        INTEGER,
        sroOgrn       INTEGER,
        role          TEXT,  
        dataCreated   INTEGER(20)
    );
    `,
    ];
    this._serialize(sql);
  }
}

module.exports.CreateTable = CreateTable;
