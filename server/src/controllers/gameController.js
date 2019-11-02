const gameRepository = require('../repositories/gameRepo');
const priceHistoryRepository = require('../repositories/priceHistoryRepo');
const followedGameRepository = require('../repositories/followedGameRepo');
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

  async getGamesFollowedByUser(req, res) {
    const { userId } = req.user;

    try {
      const gamesFollowed = await followedGameRepository.getGamesFollowedByUser(userId);
      baseController.handleSuccess(res, gamesFollowed, null);
    } catch (error) {
      baseController.handleFailure({
        error,
        details: constants.error.unableToGetGamesFollowed,
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

      if (gameFound) {
        gameId = gameFound.gameId;
      } else {
        const { price, psnUrl } = await psnCrawler.getGameDetails(name);

        const game = {
          igdbKey, name, price, cover, psnUrl,
        };
        const insertedGame = await gameRepository.create(game);
        gameId = insertedGame.insertId;
      }

      const { userId } = req.user;
      await validate.isNotBeingFollowedAlready(userId, gameId);
      await followedGameRepository.follow(userId, gameId);

      const message = constants.success.followGame;
      baseController.handleSuccess(res, null, message, 204);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.unableToFollowGame,
      });
    }
  }

  async unfollow(req, res) {
    const { followId } = req.body;

    try {
      validate.fieldExists(followId, 'followId');

      await followedGameRepository.unFollow(followId);
      const message = constants.success.unfollowGame;
      baseController.handleSuccess(res, null, message, 204);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.unableToUnfollowGame,
      });
    }
  }

  async getPriceHistory(req, res) {
    const { gameId } = req.body;

    try {
      validate.fieldExists(gameId, 'gameId');

      const pricesHistory = await priceHistoryRepository.getPriceHistory(gameId);

      baseController.handleSuccess(res, pricesHistory, null);
    } catch (error) {
      baseController.handleFailure({
        error,
        details: constants.error.unableToGetPriceHistory,
      });
    }
  }

  async updatePrice(req, res) {
    const { gameId, price } = req.body;

    try {
      validate.fieldExists(gameId, 'gameId');
      validate.fieldExists(price, 'price');

      await gameRepository.updatePrice(gameId, price);
      await priceHistoryRepository.addPriceHistory(gameId, price);

      const message = constants.success.priceUpdated;
      baseController.handleSuccess(res, null, message, 204);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.unableToUpdatePrice,
      });
    }
  }

  async markAsPurchased(req, res) {
    const { followId } = req.body;

    try {
      validate.fieldExists(followId, 'followId');

      await followedGameRepository.markAsPurchased(followId);
      const message = constants.success.markedAsPurchased;

      baseController.handleSuccess(res, null, message, 204);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.unableToMarkAsPurchased,
      });
    }
  }
}

module.exports = new GameController();
