const userRepository = require('../repositories/userRepo');
const baseController = require('./baseController');
const constants = require('../../consts');
const validate = require('../validations');

class UserController {
  async findById(req, res) {
    try {
      const { userId } = req.params;
      const user = await userRepository.findById(userId);
      let statusCode;
      if (!user) {
        statusCode = 204;
      }

      baseController.handleSuccess(res, user, null, statusCode);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.retrieveUser,
      });
    }
  }

  async updateBudget(req, res) {
    try {
      const { budget } = req.body;
      const { userId } = req.user;

      validate.fieldExists(budget, 'budget');
      validate.budgetIsNumber(budget);

      await userRepository.updateBudget(userId, budget);
      const message = constants.success.updateBudget;
      baseController.handleSuccess(res, null, message, 204);
    } catch (error) {
      baseController.handleFailure(res, {
        error,
        details: constants.error.unableToUpdateBudget,
      });
    }
  }
}

module.exports = new UserController();
