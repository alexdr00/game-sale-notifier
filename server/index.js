require('dotenv').config();
const server = require('./src/server');
const logger = require('./src/services/logger');

const { app } = server;


const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, (error) => {
  if (error) {
    logger.error('Couldn\'t start server', { error });
    process.exit(1);
  }

  logger.info(`Server is listening on port ${PORT}`);
});
