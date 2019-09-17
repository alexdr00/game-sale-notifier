const userSchema = {
  User: {
    id: 'User',
    type: 'object',
    properties: {
      user_id: {
        type: 'integer',
        example: 1,
      },
      email: {
        type: 'string',
        example: 'example@example.com',
      },
      password: {
        type: 'string',
        example: '12345-please-never-user-this-password-lol',
      },
      region_iso: {
        type: 'string',
        example: 'es-co',
      },
      currency_type: {
        type: 'string',
        example: 'cop',
      },
      loading_animation_type: {
        type: 'integer',
        example: 1,
        description: 'There are many loading animations in the app; This field stores the one the user '
          + 'prefers. It\'s an enum',
      },
      budget: {
        type: 'integer',
        example: 20000,
        description: 'Amount of money the user is willing to spend on videogames',
      },
      language: {
        type: 'string',
        example: 'es',
      },
    },
  },
};

const userPaths = {
  '/user/{userId}': {
    get: {
      tags: ['user'],
      summary: 'get user by id',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          schema: {
            $ref: '#/models/User',
          },
        },
      },
    },
  },

  '/user/{userId}/preferences': {
    patch: {
      summary: 'update user preferences',
      tags: ['user'],
      responses: {
        200: {
          description: 'updated user',
          schema: {
            $ref: '#/models/User',
          },
        },
      },
    },
  },

  '/user/all': {
    get: {
      tags: ['user'],
      summary: 'get all users',
      responses: {
        200: {
          schema: {
            items: {
              $ref: '#/models/User',
            },
          },
        },
      },
    },
  },
};

module.exports = { userPaths, userSchema };
