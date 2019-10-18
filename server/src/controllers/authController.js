const userRepository = require('../repositories/userRepo');
const baseController = require('./baseController');
const constants = require('../../consts');
const validations = require('../validations');

class AuthController {
  async login(req, res) {
    const { email } = req.body;
    try {
      const result = await userRepository.findByEmail(email);
      const user = result[0];

      validations.validateUserExistence(user);

      baseController.handleSuccess(res, user);
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
      const result = await userRepository.findByEmail(email);
      const user = result[0];

      validations.validateUserUniqueness(user);
      validations.validateEmail(email);
      validations.validatePassword(password);

      baseController.handleSuccess(res, { nice: 'nice' }, 201);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.userRegister,
      });
    }
  }
}

module.exports = new AuthController();
