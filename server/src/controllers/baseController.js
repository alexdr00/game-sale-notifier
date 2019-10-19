const logger = require('../services/logger');

class BaseController {
  handleSuccess(res, payload, message, statusCode = 200) {
    let response = {};
    if (payload) {
      response = { data: payload };
    }
    if (typeof message !== 'undefined' && message !== null) {
      response = { ...response, message };
    }
    res.status(statusCode).json(response);
  }

  handleFailure(res, failure) {
    const code = failure.details.name;
    let error = failure.error.message;

    if (failure.error.stack) {
      logger.error(failure.error.stack);
    } else {
      logger.error(failure.error.message);
    }

    if (failure.error.sql) {
      error = failure.details.body;
      logger.debug(`Query Debug: \n ${failure.error.sql}`);
    }

    const statusCode = failure.error.statusCode ? failure.error.statusCode : 500;
    res.status(statusCode).json({
      error,
      code,
    });
  }
}

module.exports = new BaseController();
