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

      const result = await userRepository.findByEmail(email);
      const user = result[0];

      validate.userExistence(user);
      validate.passwordsMatch(password, user.password);

      const payload = {
        email: user.email,
        userId: user.userId,
      };
      baseController.handleSuccess(res, payload);
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
      const users = await userRepository.findByEmail(email);
      const user = users[0];

      validate.fieldExists(email, 'email');
      validate.fieldExists(password, 'password');

      validate.userUniqueness(user);
      validate.emailCorrectness(email);
      validate.passwordStrength(password);

      const passwordEncrypted = passwordSecurity.encrypt(password);

      const result = await userRepository.create({
        email,
        password: passwordEncrypted,
      });

      const message = constants.success.register;
      const payload = { email, userId: result.insertId };
      baseController.handleSuccess(res, payload, message, 201);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.userRegister,
      });
    }
  }
}

module.exports = new AuthController();
