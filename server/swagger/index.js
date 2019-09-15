module.exports = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Seans-TypeScript-NodeJS-CRUD-REST-API-Boilerplate',
    description: 'A minimal and easy to follow example of what you need to create a CRUD style API in NodeJs using TypeScript',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Local Dev, or from Heroku',
    },
    {
      url: '/api/',
      description: 'With docker-compose and nginx proxy',
    },
  ],
  tags: [
    {
      name: 'Cats',
      description: 'API for cats in the system',
    },
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
};
