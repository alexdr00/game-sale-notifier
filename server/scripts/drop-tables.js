const sql = require('../services/sql');
const logger = require('../services/logger');
const constants = require('../consts');

const tables = ['game', 'user', 'followed_game'];

async function dropAllTables() {
  // Warning: use this function with caution
  const dropTableQueries = tables.map((table) => {
    return sql.runQuery(`DROP TABLE IF EXISTS ${table}`);
  });

  try {
    await Promise.all(dropTableQueries);
    logger.info('All tables were dropped successfully.');
  } catch (error) {
    logger.error(constants.error.dropAllTables, { error });
  }
}

module.exports = dropAllTables;
