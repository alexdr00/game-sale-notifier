module.exports = {
  '/login': {
    post: {
      tags: ['auth'],
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
      tags: ['auth'],
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
      tags: ['auth'],
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
