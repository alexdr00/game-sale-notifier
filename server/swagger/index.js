const auth = require('./auth');
const { userPaths, userSchema } = require('./user');

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
      name: 'auth',
    },
    {
      name: 'user',
    },
    {
      name: 'game',
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
  },
  models: {
    ...userSchema,
  },
};
