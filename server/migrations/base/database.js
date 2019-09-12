const createDatabaseQuery = `
  CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};
`;

module.exports = createDatabaseQuery;
