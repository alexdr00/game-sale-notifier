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

  async updatePrice(gameId, updatedPrice) {
    const result = await sql.runQuery(`
      UPDATE game
      SET current_price = ?
      WHERE game_id = ? 
    `,
    [updatedPrice, gameId]);

    return result;
  }
}

module.exports = new GameRepo();
