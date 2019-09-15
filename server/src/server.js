const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerConfig = require('../swagger');

class Server {
  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    this.useMiddleware();
    this.mountRoutes();
  }

  useMiddleware() {
    // TODO.
  }

  mountRoutes() {
    const router = express.Router();
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
    router.use('/health', (req, res) => res.send({ message: 'ok' }));

    this.app.use('/', router);
  }
}

module.exports = new Server();
