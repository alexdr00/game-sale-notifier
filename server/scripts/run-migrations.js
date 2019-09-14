const sql = require('../services/sql');
const logger = require('../services/logger');
const constants = require('../consts');
const { dropAllTables } = require('./drop-tables');

const user = require('../migrations/base/user');
const game = require('../migrations/base/game');
const followedGame = require('../migrations/base/followed-game');

async function runMigrations() {
  // Order matters (due to foreign key constraints). add migrations in the order they were imported.
  try {
    logger.info('Running migrations...');

    await sql.runQuery(user);
    logger.info('user table created');

    await sql.runQuery(game);
    logger.info('game table created');

    await sql.runQuery(followedGame);
    logger.info('followed-game table created');

    logger.info('Migrations executed successfully');
  } catch (error) {
    logger.error(constants.error.runMigrations, { error });
    logger.warn('Performing rollback due to migrations fail...');
    dropAllTables();
    process.exit(1);
  }
}

module.exports = runMigrations;
