const userTableMigrationQuery = `
  CREATE TABLE IF NOT EXISTS \`user\` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email CHAR(255) NOT NULL UNIQUE,
    password CHAR(150) NOT NULL,
    budget DECIMAL(8, 2) NOT NULL DEFAULT 0
  );
`;

module.exports = userTableMigrationQuery;
