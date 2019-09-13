require('dotenv').config();
const express = require('express');
const logger = require('./services/logger');

const server = express();

const port = process.env.SERVER_PORT;
server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
