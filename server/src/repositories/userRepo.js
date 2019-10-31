const sql = require('../services/sql');

class UserRepo {
  async findByEmail(email) {
    const result = await sql.runQuery(`
      SELECT 
        user_id as "userId",
        password,     
        email
      FROM user
      WHERE email = ?;  
    `,
    [email]);

    return result[0];
  }

  async findById(userId) {
    const result = await sql.runQuery(`
      SELECT 
        user_id as "userId",
        email,
        budget
      FROM user
      WHERE user_id = ?;  
    `,
    [userId]);

    return result[0];
  }

  async updateBudget(userId, budget) {
    const result = await sql.runQuery(`
      UPDATE user
      SET budget = ?
      WHERE user_id = ?;
    `,
    [budget, userId]);

    return result;
  }

  async create(user) {
    const { email, password } = user;

    const result = await sql.runQuery(`
      INSERT INTO user (email, password) 
      VALUES (?, ?)
    `,
    [email, password]);

    return result;
  }
}

module.exports = new UserRepo();
