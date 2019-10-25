const gameRepository = require('../repositories/gameRepo');
const igdb = require('../services/igdb');
const baseController = require('./baseController');
const constants = require('../../consts');
const validate = require('../validations');
const psnCrawler = require('../services/psnCrawler');

class GameController {
  async search(req, res) {
    const { query } = req.body;
    try {
      validate.fieldExists(query, 'query');

      const gamesFound = await igdb.searchGame(query);

      baseController.handleSuccess(res, gamesFound, null);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.unableToSearchGame,
      });
    }
  }

  async follow(req, res) {
    const { igdbKey, name, cover } = req.body;

    try {
      validate.fieldExists(igdbKey, 'igdbKey');
      validate.fieldExists(name, 'name');
      validate.fieldExists(cover, 'cover');

      const gameFound = await gameRepository.findByIgdbKey(igdbKey);
      let gameId;

      if (gameFound[0]) {
        gameId = gameFound[0].gameId;
      } else {
        const { price, psnUrl } = await psnCrawler.getGameDetails(name);

        const game = {
          igdbKey, name, price, cover, psnUrl,
        };
        const insertedGame = await gameRepository.create(game);
        gameId = insertedGame.insertId;
      }

      await gameRepository.follow(req.user.userId, gameId);

      const message = constants.success.followGame;
      baseController.handleSuccess(res, null, message);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.unableToFollowGame,
      });
    }
  }
}

module.exports = new GameController();
