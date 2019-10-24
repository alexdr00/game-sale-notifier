const { Router } = require('express');
const authController = require('../controllers/authController');

class AuthRouter {
  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post('/login', authController.login);
    this.router.post('/register', authController.register);
  }
}

module.exports = new AuthRouter();
