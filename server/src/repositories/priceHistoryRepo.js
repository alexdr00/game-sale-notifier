const sql = require('../services/sql');

class PriceHistoryRepo {
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

  async addPriceHistory(gameId, price) {
    const result = await sql.runQuery(`
      INSERT INTO price_history (game_id, price) 
      VALUES (?, ?)
    `,
    [gameId, price]);

    return result;
  }
}

module.exports = new PriceHistoryRepo();
