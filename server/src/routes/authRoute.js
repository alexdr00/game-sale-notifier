const { Router } = require('express');
const authController = require('../controllers/authController');
const requireAuth = require('../middleware/auth');

class AuthRouter {
  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post('/login', authController.login);
    this.router.post('/register', authController.register);
    this.router.post('/other', requireAuth, (req, res) => res.json({ protected: req.user }));
  }
}

module.exports = new AuthRouter();
