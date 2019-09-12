const sql = require('../sql');

const db = require('../migrations/base/database');
const user = require('../migrations/base/user');
const game = require('../migrations/base/game');
const followedGame = require('../migrations/base/followed-game');

async function runMigrations() {
  // Order matters (due to foreign key constraints). add migrations in the order they were imported.
  await sql.runQuery(db);
  await sql.runQuery(user);
  await sql.runQuery(game);
  await sql.runQuery(followedGame);
}

module.exports = runMigrations;
