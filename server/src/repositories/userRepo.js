const sql = require('../services/sql');

class UserRepo {
  findByEmail(email) {
    return sql.runQuery(`
      SELECT 
        user_id as "userId",
        password,     
        email
      FROM user
      WHERE email = ?;  
    `,
    [email]);
  }

  findById(userId) {
    return sql.runQuery(`
      SELECT 
        user_id as "userId",
        email
      FROM user
      WHERE user_id = ?;  
    `,
    [userId]);
  }

  create(user) {
    const { email, password } = user;

    return sql.runQuery(`
      INSERT INTO user (email, password) 
      VALUES (?, ?)
    `,
    [email, password]);
  }
}

module.exports = new UserRepo();
