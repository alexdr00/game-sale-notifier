const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerConfig = require('../swagger');
const authRouter = require('./routes/authRoute.js');

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
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  mountRoutes() {
    const router = express.Router();
    router.use('/auth', authRouter.router);
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
    router.use('/health', (req, res) => res.send({ message: 'ok' }));

    this.app.use('/v1', router);
  }
}

module.exports = new Server();
