const auth = require('./auth');
const { userPaths, userSchema } = require('./user');
const { gameSchema, gamePaths } = require('./game');
const messageSchema = require('./message');
const { priceHistorySchema, priceHistoryPaths } = require('./price-history');

module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'GSN (Game Sale Notifier) API',
    description: 'This is the API for the GSN application',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  basePath: '/v1',
  tags: [
    {
      name: 'authRoute.js',
    },
    {
      name: 'userRepo.js',
    },
    {
      name: 'game',
    },
    {
      name: 'price-history',
    },
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  paths: {
    ...auth,
    ...userPaths,
    ...gamePaths,
    ...priceHistoryPaths,
  },
  models: {
    ...userSchema,
    ...gameSchema,
    ...messageSchema,
    ...priceHistorySchema,
  },
};
