const logger = require('../services/logger');
const sql = require('../services/sql');

const games = require('../seeds/games');
const users = require('../seeds/user');
const followedGames = require('../seeds/followed-game');

const { dropTable } = require('./drop-tables');

async function runSeedsFor(table, data) {
  try {
    await sql.insertInto(table, data);
  } catch (error) {
    logger.error(`Failed running seeds for table: ${table}`, { error });
    logger.warn('Performing rollback due to seed failure...');
    dropTable(table);
    process.exit(1);
  }
}

async function runAllSeeds() {
  // This function is meant to be executed after db cleanup (dropping all tables)
  await runSeedsFor('game', games);
  await runSeedsFor('user', users);
  await runSeedsFor('followed_game', followedGames);
  logger.info('All seeds inserted successfully.');
}

module.exports = runAllSeeds;