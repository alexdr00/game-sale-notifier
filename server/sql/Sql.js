const mysql = require("mysql");

class Sql {
  constructor() {
    this._connection = this._establishConnection();
  }

  _establishConnection() {
    this.connection = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  }

  closeConnection() {
    return new Promise((resolve, reject) => {
      this.connection.end((error) => {
        if (error) {
          reject(error);
        }

        resolve();
      })
    });
  }

  runQuery(query) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        console.log(query, result);
        resolve(result)
      });
    });
  }
}

module.exports = new Sql();
