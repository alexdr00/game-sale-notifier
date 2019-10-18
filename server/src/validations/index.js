const constants = require('../../consts');

const emailRegexValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegexValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

class Validations {
  validateUserExistence(user) {
    if (!user) {
      const error = {
        message: constants.error.userNotFound.body,
        statusCode: 404,
      };
      throw error;
    }
  }

  validateUserUniqueness(user) {
    if (user) {
      const error = {
        message: constants.error.userAlreadyExists.body,
        statusCode: 403,
      };
      throw error;
    }
  }

  validateEmail(email) {
    const isEmailValid = emailRegexValidator.test(email);
    if (!isEmailValid) {
      const error = {
        message: constants.error.invalidEmail.body,
        statusCode: 400,
      };
      throw error;
    }
  }

  validatePassword(password) {
    const isPasswordValid = passwordRegexValidator.test(password);
    if (!isPasswordValid) {
      const error = {
        message: constants.error.invalidPassword.body,
        statusCode: 400,
      };
      throw error;
    }
  }
}


module.exports = new Validations();
