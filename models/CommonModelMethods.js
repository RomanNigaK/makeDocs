const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class CommonModelMethods {
  _tableName;
  constructor(tableName) {
    this._tableName = tableName;
  }
  _findById(id, column, cb) {
    db.get(`SELECT * FROM ${this._tableName} WHERE ${column} = ${id}`, cb);
  }
  findByDateCreated(data, cb) {
    db.get(`SELECT * FROM  ${this._tableName} WHERE dataCreated = ${data}`, cb);
  }
  _deleteById(id, cb) {
    db.get(`DELETE  FROM  ${this._tableName} WHERE id = ${id}`, cb);
  }
  _all(cb) {
    db.all(`SELECT * FROM ${this._tableName}`, cb);
  }

  new(body) {
    return new Promise((resolve, reject) => {
      this._new(body, (err) => {
        if (err) reject({ error: err.message });

        this.findByDateCreated(body.dataCreated, (err, row) => {
          if (err) reject({ error: err.message });

          resolve({ data: row });
        });
      });
    });
  }

  _new(body, cb) {
    const columns = Object.keys(body);

    const values = Object.values(body);

    const pattern = values.map((e) => "?").join(",");

    const sql = `INSERT INTO ${this._tableName} (${[
      ...columns,
    ]}) VALUES (${pattern})`;

    db.run(sql, [...values], cb);
  }

  findById(id, column = "id") {
    console.log("column", column);
    return new Promise((resolve, reject) => {
      this._findById(id, column, (err, row) => {
        if (err) reject({ error: err.message });
        resolve({ data: row ?? "not found" });
      });
    });
  }
  deleteById(id, column = "id") {
    return new Promise((resolve, reject) => {
      this._findById(id, column, (err, row) => {
        if (err) reject({ error: err.massage });

        if (!row) resolve({ data: "not found" });

        this._deleteById(id, (err, row) => {
          if (err) reject({ error: err.massage });
        });

        resolve({ data: "deleted" });
      });
    });
  }
  all() {
    return new Promise((resolve, reject) => {
      this._all((err, row) => {
        if (err) reject({ error: err.massage });

        if (!row) resolve({ data: "not found" });

        resolve({ data: row });
      });
    });
  }

  update(body, currentRowData) {
    return new Promise((resolve, reject) => {
      this._update(body, currentRowData, (err) => {
        console.log(err);
        if (err) reject({ error: err.message });
        resolve({ data: "updated" });
      });
    });
  }
}
module.exports.CommonModelMethods = CommonModelMethods;
