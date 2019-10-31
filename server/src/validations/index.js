const constants = require('../../consts');
const passwordSecurity = require('../services/passwordSecurity');

const emailRegexValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegexValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const gameRepository = require('../repositories/gameRepo');


class Validate {
  userExistence(user) {
    if (!user) {
      const error = {
        message: constants.error.incorrectCredentials.body,
        statusCode: 401,
      };
      throw error;
    }
  }

  userUniqueness(user) {
    if (user) {
      const error = {
        message: constants.error.userAlreadyExists.body,
        statusCode: 403,
      };
      throw error;
    }
  }

  emailCorrectness(email) {
    const isEmailValid = emailRegexValidator.test(email);
    if (!isEmailValid) {
      const error = {
        message: constants.error.invalidEmail.body,
        statusCode: 400,
      };
      throw error;
    }
  }

  passwordsMatch(submittedPassword, storedPassword) {
    const doesPasswordMatch = passwordSecurity.match(submittedPassword, storedPassword);
    if (!doesPasswordMatch) {
      const error = {
        message: constants.error.incorrectCredentials.body,
        statusCode: 401,
      };
      throw error;
    }
  }

  fieldExists(field, fieldName) {
    if (typeof field === 'undefined' || field === null) {
      const error = {
        message: `${constants.error.fieldRequired.body}${fieldName}`,
        statusCode: 400,
      };
      throw error;
    }
  }

  passwordStrength(password) {
    const isPasswordValid = passwordRegexValidator.test(password);
    if (!isPasswordValid) {
      const error = {
        message: constants.error.invalidPassword.body,
        statusCode: 400,
      };
      throw error;
    }
  }

  budgetIsNumber(budget) {
    if (Number.isNaN(Number(budget))) {
      const error = {
        message: constants.error.invalidPassword.body,
        statusCode: 400,
      };
      throw error;
    }
  }

  async isNotBeingFollowedAlready(userId, gameId) {
    const gameFollowed = await gameRepository.getFollowed(userId, gameId);

    if (gameFollowed) {
      const error = {
        message: constants.error.gameAlreadyBeingFollowed.body,
        statusCode: 400,
      };
      throw error;
    }
  }
}


module.exports = new Validate();
