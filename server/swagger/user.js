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
      parameters: [
        {
          name: 'region_iso',
          in: 'formData',
          type: 'string',
        },
        {
          name: 'currency_type',
          in: 'formData',
          type: 'string',
        },
        {
          name: 'loading_animation_type',
          in: 'formData',
          type: 'integer',
        },
        {
          name: 'budget',
          in: 'formData',
          type: 'integer',
        },
        {
          name: 'language',
          in: 'formData',
          type: 'string',
        },
      ],
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

  '/user/{userId}/follow/{gameId}': {
    post: {
      tags: ['user'],
      summary: 'starts following a game with an user',
      responses: {
        200: {
          schema: {
            $ref: '#/models/Message',
          },
        },
      },
    },

    delete: {
      tags: ['user'],
      summary: 'stops following a game with an user',
      responses: {
        200: {
          schema: {
            $ref: '#/models/Message',
          },
        },
      },
    },
  },
};

module.exports = { userPaths, userSchema };
