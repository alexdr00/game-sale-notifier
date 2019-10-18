const sql = require('../services/sql');

const schema = process.env.MYSQL_DATABASE;

class UserRepo {
  findByEmail(email) {
    return sql.runQuery(`
      SELECT 
        user_id as "userId",
        email
      FROM ${schema}.user
      WHERE email = ?;  
    `,
    [email]);
  }

  findById(userId) {
    return sql.runQuery(`
      SELECT 
        user_id as "userId",
        email
      FROM ${schema}.user
      WHERE user_id = ?;  
    `,
    [userId]);
  }
}

module.exports = new UserRepo();
