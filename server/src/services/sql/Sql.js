const mysql = require('mysql');

class Sql {
  constructor() {
    this.connection = this.establishConnection();
  }

  establishConnection() {
    return mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  closeConnection() {
    return new Promise((resolve, reject) => {
      this.connection.end((error) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }

  async insertInto(table, objects) {
    const entries = objects.map((object) => {
      const keys = Object.keys(object).join(', ');
      let values = Object.values(object);
      values = values.map((value) => {
        if (typeof value === 'string') {
          return `'${value}'`;
        }

        return value;
      });
      values = values.join(', ');
      return { keys, values };
    });

    const queries = entries.map(({ keys, values }) => `INSERT INTO ${table} (${keys}) VALUES (${values});`);
    const executedQueries = queries.map((query) => this.runQuery(query));

    await Promise.all(executedQueries);
  }

  runQuery(query) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  }
}

module.exports = new Sql();
