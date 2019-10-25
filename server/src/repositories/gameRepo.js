const sql = require('../services/sql');

class GameRepo {
  create(game) {
    const {
      igdbKey, name, price, cover, psnUrl,
    } = game;

    return sql.runQuery(`
      INSERT INTO game (igdb_key, game_name, current_price, original_price, cover_url, psn_store_url) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [igdbKey, name, price, price, cover, psnUrl]);
  }

  findByIgdbKey(igdbKey) {
    return sql.runQuery(`
      SELECT
        game_id as gameId,
        game_name as name
      FROM
        game
      WHERE 
        igdb_key = ?
    `,
    [igdbKey]);
  }

  follow(userId, gameId) {
    return sql.runQuery(`
      INSERT INTO followed_game (game_id, user_id) 
      VALUES (?, ?)
    `,
    [gameId, userId]);
  }
}

module.exports = new GameRepo();
