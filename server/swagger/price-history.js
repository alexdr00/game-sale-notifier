const priceHistorySchema = {
  PriceHistory: {
    id: 'PriceHistory',
    type: 'object',
    properties: {
      history_id: {
        type: 'integer',
        example: 1,
      },
      timestamp: {
        type: 'date',
        example: 'YYYY-MM-DD HH:MM:SS',
      },
      price: {
        type: 'integer',
        example: 15000,
      },
    },
  },
};

const priceHistoryPaths = {
  '/priceHistory/{gameId}': {
    get: {
      tags: ['price-history'],
      summary: 'gets the price history by game id',
      parameters: [
        {
          name: 'gameId',
          in: 'path',
          type: 'integer',
          required: true,
        },
      ],
      responses: {
        200: {
          schema: {
            items: {
              $ref: '#/models/PriceHistory',
            },
          },
        },
      },
    },
  },
};

module.exports = { priceHistorySchema, priceHistoryPaths };
