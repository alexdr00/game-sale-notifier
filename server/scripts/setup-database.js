const mysql = require('mysql');

const logger = require('../services/logger');
const runAllSeeds = require('./run-seeds');
const runMigrations = require('./run-migrations');
const db = require('../migrations/base/database');

function createDatabase() {
  // This temporal db connection is just used to create the specified database in case
  // it doesn't exist
  const temporalDbConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  return new Promise((resolve) => {
    temporalDbConnection.query(db, (error, result) => {
      if (error) {
        logger.error('Error creating the database', { error });
        process.exit(1);
      }

      logger.info('db created sucessfully');
      resolve(result);
    });
  });
}

async function setupDatabase() {
  logger.info('*** Setting up database ***');
  await createDatabase();
  await runMigrations();
  await runAllSeeds();
  logger.info('*** Database set up successfully ***');
  process.exit(0);
}

setupDatabase();
