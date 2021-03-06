const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepo');
const baseController = require('./baseController');
const constants = require('../../consts');
const validate = require('../validations');
const passwordSecurity = require('../services/passwordSecurity.js');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      validate.fieldExists(email, 'email');
      validate.fieldExists(password, 'password');

      const user = await userRepository.findByEmail(email);

      validate.userExistence(user);
      validate.passwordsMatch(password, user.password);

      const payload = { userId: user.userId };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.header('Authorization', token).json({ token });
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.userLogin,
      });
    }
  }

  async register(req, res) {
    const { email, password } = req.body;
    try {
      validate.fieldExists(email, 'email');
      validate.fieldExists(password, 'password');

      const user = await userRepository.findByEmail(email);
      validate.emailCorrectness(email);
      validate.userUniqueness(user);
      validate.passwordStrength(password);

      const passwordEncrypted = passwordSecurity.encrypt(password);

      const result = await userRepository.create({
        email,
        password: passwordEncrypted,
      });

      const message = constants.success.register;
      const payload = { userId: result.insertId };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.header('Authorization', token).json({ token, message });
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.userRegister,
      });
    }
  }
}

module.exports = new AuthController();
