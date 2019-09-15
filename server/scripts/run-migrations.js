const sql = require('../src/services/sql');
const logger = require('../src/services/logger');
const constants = require('../consts');

const user = require('../migrations/base/user');
const game = require('../migrations/base/game');
const followedGame = require('../migrations/base/followed-game');
const priceHistory = require('../migrations/base/price-history');

async function runMigrations() {
  // Order matters (due to foreign key constraints). add migrations in the order they were imported.
  try {
    logger.info('Running migrations...');

    await sql.runQuery(user);
    logger.info('user table created');

    await sql.runQuery(game);
    logger.info('game table created');

    await sql.runQuery(followedGame);
    logger.info('followed_game table created');

    await sql.runQuery(priceHistory);
    logger.info('price_history table created');

    logger.info('Migrations executed successfully');
  } catch (error) {
    logger.error(constants.error.runMigrations, { error });
    process.exit(1);
  }
}

module.exports = runMigrations;
