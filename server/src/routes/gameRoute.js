const { Router } = require('express');
const gameController = require('../controllers/gameController');
const requireAuth = require('../middleware/auth');

class AuthRouter {
  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post('/search', requireAuth, gameController.search);
    this.router.get('/followed', requireAuth, gameController.getGamesFollowedByUser);
    this.router.post('/follow', requireAuth, gameController.follow);
    this.router.delete('/unfollow', requireAuth, gameController.unfollow);
    this.router.patch('/update-price', requireAuth, gameController.updatePrice);
    this.router.patch('/mark-purchased', requireAuth, gameController.markAsPurchased);
    this.router.post('/price-history', requireAuth, gameController.getPriceHistory);
  }
}

module.exports = new AuthRouter();
