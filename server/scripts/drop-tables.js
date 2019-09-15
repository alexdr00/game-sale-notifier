const sql = require('../services/sql');
const logger = require('../services/logger');

// This function should only be used to execute a rollback in case the migrations or seeds fail.
async function dropTable(table) {
  const dropTableQuery = `DROP TABLE IF EXISTS ${table}`;
  try {
    await sql.runQuery(dropTableQuery);
  } catch (error) {
    logger.error(`Error dropping table: ${table}`, { error });
    process.exit(1);
  }
}

module.exports = dropTable;
