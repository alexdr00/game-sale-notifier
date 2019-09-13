const sql = require('../services/sql');
const logger = require('../services/logger');
const constants = require('../consts');

const db = require('../migrations/base/database');
const user = require('../migrations/base/user');
const game = require('../migrations/base/game');
const followedGame = require('../migrations/base/followed-game');

async function runMigrations() {
  // Order matters (due to foreign key constraints). add migrations in the order they were imported.
  try {
    logger.info('Running migrations');

    await sql.runQuery(db);
    logger.info('Created db');

    await sql.runQuery(user);
    logger.info('Users table created');

    await sql.runQuery(game);
    logger.info('Games table created');

    await sql.runQuery(followedGame);
    logger.info('Followed games table created');

    logger.info('Migrations executed successfully')
  } catch (error) {
    logger.error(constants.error.runMigrations, { error });
  }
}

module.exports = runMigrations;
