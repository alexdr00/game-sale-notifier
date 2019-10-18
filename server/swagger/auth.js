module.exports = {
  '/login': {
    post: {
      tags: ['authRoute.js'],
      summary: 'user login',
      parameters: [
        {
          name: 'email',
          in: 'formData',
          required: true,
          type: 'string',
        },
        {
          name: 'password',
          in: 'formData',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'ok',
        },
        401: {
          description: 'invalid credentials',
        },
      },
    },
  },

  '/signup': {
    post: {
      tags: ['authRoute.js'],
      summary: 'register user',
      parameters: [
        {
          name: 'email',
          in: 'formData',
          required: true,
          type: 'string',
        },
        {
          name: 'password',
          in: 'formData',
          required: true,
          type: 'string',
        },
        {
          name: 'passwordConfirm',
          in: 'formData',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        201: {
          description: 'ok',
        },
        400: {
          description: 'bad request',
        },
      },
    },
  },

  '/logout': {
    post: {
      tags: ['authRoute.js'],
      summary: 'logout user',
      parameters: [
        {
          name: 'jwt',
          in: 'formData',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'ok',
        },
        400: {
          description: 'bad request',
        },
      },
    },
  },
};
