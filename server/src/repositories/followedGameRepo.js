const sql = require('../services/sql');


class FollowedGameRepo {
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
}


module.exports = new FollowedGameRepo();
