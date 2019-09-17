const gameSchema = {
  Game: {
    id: 'Game',
    type: 'object',
    properties: {
      game_id: {
        type: 'integer',
        example: 1,
      },
      igdb_key: {
        type: 'integer',
        example: 1992,
        description: 'Id that figures in the IGDB database',
      },
      game_name: {
        type: 'string',
        example: 'The Witcher 3: Wild Hunt',
      },
      current_price: {
        type: 'integer',
        example: 47.99,
      },
      original_type: {
        type: 'integer',
        example: 47.99,
      },
      cover_url: {
        type: 'string',
        example: '//images.igdb.com/igdb/image/upload/t_thumb/qqgmrd5u11srbn1gudvr.jpg',
      },
      psn_store_url: {
        type: 'string',
        example: 'https://store.playstation.com/es-co/product/UP0082-CUSA01799_00-DXMANKINDIVIDED0',
      },
    },
  },
};

const gamePaths = {
  '/game/all': {
    get: {
      tags: ['game'],
      summary: 'gets all games',
      responses: {
        200: {
          schema: {
            items: {
              $ref: '#/models/Game',
            },
          },
        },
      },
    },
  },

  '/game/{gameId}': {
    get: {
      tags: ['game'],
      summary: 'get game by id',
      parameters: [
        {
          name: 'gameId',
          in: 'path',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          schema: {
            $ref: '#/models/Game',
          },
        },
      },
    },
    patch: {
      tags: ['game'],
      summary: 'updates a game by id',
      parameters: [
        {
          name: 'gameId',
          in: 'path',
          required: true,
          type: 'integer',
        },
        {
          name: 'current_price',
          in: 'formData',
          type: 'integer',
        },
        {
          name: 'psn_store_url',
          in: 'formData',
          type: 'string',
        },
        {
          name: 'cover_url',
          in: 'formData',
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'updated game',
          schema: {
            $ref: '#/models/Game',
          },
        },
      },
    },
    delete: {
      tags: ['game'],
      summary: 'deletes a game by id',
      parameters: [
        {
          name: 'gameId',
          in: 'path',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          schema: {
            $ref: '#/models/Message',
          },
        },
      },
    },
  },

  '/game': {
    post: {
      tags: ['game'],
      summary: 'inserts a game in the db',
      parameters: [
        {
          name: 'game_name',
          in: 'formData',
          type: 'string',
          required: true,
        },
        {
          name: 'igdb_key',
          in: 'formData',
          type: 'integer',
          required: true,
        },
        {
          name: 'original_price',
          in: 'formData',
          type: 'integer',
          required: true,
        },
        {
          name: 'current_price',
          in: 'formData',
          type: 'integer',
          required: true,
        },
        {
          name: 'psn_store_url',
          in: 'formData',
          type: 'string',
          required: true,
        },
        {
          name: 'cover_url',
          in: 'formData',
          type: 'string',
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'created game',
          schema: {
            $ref: '#/models/Game',
          },
        },
      },
    },
  },

  '/game/search?query={gameName}': {
    get: {
      tags: ['game'],
      summary: 'Performs a search of games',
      parameters: [
        {
          name: 'query',
          in: 'query',
          type: 'string',
          required: true,
        },
      ],
      responses: {
        200: {
          schema: {
            items: {
              $ref: '#/models/Game',
            },
          },
        },
      },
    },
  },

  '/game/{gameId}/followedBy/{userId}': {
    get: {
      tags: ['game'],
      summary: 'Gets all games that are being followed by certain an user',
      responses: {
        200: {
          schema: {
            items: {
              $ref: '#/models/Game',
            },
          },
        },
      },
    },
  },

  '/game/{gameId}/purchaseBy/{userId}': {
    patch: {
      tags: ['game'],
      summary: 'Changes the "has_been_purchased" flaw to true',
      responses: {
        200: {
          schema: {
            description: 'purchased game',
            $ref: '#/models/Game',
          },
        },
      },
    },
  },
};

module.exports = { gameSchema, gamePaths };
