const jwt = require('jsonwebtoken');
const constants = require('../../consts');
const logger = require('../services/logger');

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json(constants.error.unauthorized);
  }

  try {
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenVerified;
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json(constants.error.invalidToken);
  }
};

module.exports = requireAuth;
