const sql = require('../services/sql');

class GameRepo {
  async create(game) {
    const {
      igdbKey, name, price, cover, psnUrl,
    } = game;

    const result = await sql.runQuery(`
      INSERT INTO game (igdb_key, game_name, current_price, original_price, cover_url, psn_store_url) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [igdbKey, name, price, price, cover, psnUrl]);

    return result;
  }

  async findByIgdbKey(igdbKey) {
    const result = await sql.runQuery(`
      SELECT
        game_id as gameId,
        game_name as name
      FROM
        game
      WHERE 
        igdb_key = ?
    `,
    [igdbKey]);

    return result[0];
  }

  async follow(userId, gameId) {
    const result = await sql.runQuery(`
      INSERT INTO followed_game (game_id, user_id) 
      VALUES (?, ?)
    `,
    [gameId, userId]);

    return result;
  }

  async unFollow(followId) {
    const result = await sql.runQuery(`
      DELETE FROM followed_game
      WHERE followed_game_id = ?
    `,
    [followId]);

    return result;
  }

  async updatePrice(gameId, updatedPrice) {
    const result = await sql.runQuery(`
      UPDATE game
      SET current_price = ?
      WHERE game_id = ? 
    `,
    [updatedPrice, gameId]);

    return result;
  }

  async addPriceHistory(gameId, price) {
    const result = await sql.runQuery(`
      INSERT INTO price_history (game_id, price) 
      VALUES (?, ?)
    `,
    [gameId, price]);

    return result;
  }
}

module.exports = new GameRepo();
