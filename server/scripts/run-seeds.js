const logger = require('../src/services/logger');
const sql = require('../src/services/sql');

const games = require('../seeds/games');
const users = require('../seeds/user');
const followedGames = require('../seeds/followed-game');
const priceHistory = require('../seeds/price-history');

const dropTable = require('./drop-tables');

async function runSeedsFor(table, data) {
  try {
    await sql.insertInto(table, data);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return;
    }
    logger.error(`Failed running seeds for table: ${table}`, { error });
    logger.warn('Performing rollback due to seed failure...');
    dropTable(table);
    process.exit(1);
  }
}

async function runAllSeeds() {
  // This function is meant to be executed after db cleanup (dropping all tables)
  await runSeedsFor('game', games);
  await runSeedsFor('userRepo.js', users);
  await runSeedsFor('followed_game', followedGames);
  await runSeedsFor('price_history', priceHistory);
  logger.info('All seeds inserted successfully.');
}

module.exports = runAllSeeds;
