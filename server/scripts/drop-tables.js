const sql = require('../services/sql');
const logger = require('../services/logger');

// This functions should only be used to execute a rollback in case the migrations or seeds fail.
// Or to cleanup database before running seeds.
async function dropTable(table) {
  const dropTableQuery = `DROP TABLE IF EXISTS ${table}`;
  try {
    await sql.runQuery(dropTableQuery);
  } catch (error) {
    logger.error(`Error dropping table: ${table}`, { error });
    process.exit(1);
  }
}

async function dropAllTables() {
  logger.info('Cleaning up database dropping all tables...');
  await dropTable('followed_game');
  await dropTable('game');
  await dropTable('user');
  logger.info('All tables were dropped sucessfully.');
}

module.exports = { dropAllTables, dropTable };
