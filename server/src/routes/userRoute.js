const { Router } = require('express');
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/auth');

class AuthRouter {
  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.get('/:userId', requireAuth, userController.findById);
    this.router.patch('/update-budget', requireAuth, userController.updateBudget);
  }
}

module.exports = new AuthRouter();
