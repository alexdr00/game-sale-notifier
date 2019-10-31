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

  async markAsPurchased(followId) {
    const result = await sql.runQuery(`
        UPDATE followed_game
        SET has_been_purchased = ?
        WHERE followed_game_id = ?
      `,
    [followId]);

    return result;
  }

  async getGamesFollowedByUser(userId) {
    const result = await sql.runQuery(`
      SELECT
        game_name AS name,
        current_price AS price,
        cover_url AS "coverUrl",
        psn_store_url AS "psnStoreUrl"     
      FROM
        game
        INNER JOIN followed_game ON followed_game.game_id = game.game_id
      WHERE
        followed_game.user_id = ?
    `,
    [userId]);

    return result;
  }

  async getFollowed(userId, gameId) {
    const result = await sql.runQuery(`
      SELECT followed_game_id
      FROM followed_game
      WHERE
        followed_game.user_id = ?
        AND followed_game.game_id = ?
    `,
    [userId, gameId]);

    return result[0];
  }

  async getPriceHistory(gameId) {
    const result = await sql.runQuery(`
      SELECT
        history.price AS price,
        history.timestamp AS date,
        game.game_name AS name
      FROM
        price_history AS history
        INNER JOIN game ON history.game_id = game.game_id
      WHERE
        game.game_id = ?
      ORDER BY
        date DESC
    `,
    [gameId]);

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
