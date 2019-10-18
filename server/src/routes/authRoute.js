const { Router } = require('express');
const authController = require('../controllers/authController');

class AuthRouter {
  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post('/register', authController.login);
  }
}

module.exports = new AuthRouter();
