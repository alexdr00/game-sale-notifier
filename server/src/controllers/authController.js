const userRepository = require('../repositories/userRepo');
const baseController = require('./BaseController');
const constants = require('../../consts');

class AuthController {
  async login(req, res) {
    const { email } = req.body;
    try {
      const result = await userRepository.findByEmail(email);
      const user = result[0];

      if (!user) {
        const error = {
          message: constants.error.userNotFound.body,
          statusCode: 404,
        };
        throw error;
      }

      baseController.handleSuccess(res, user);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.userLogin,
      });
    }
  }
}

module.exports = new AuthController();
