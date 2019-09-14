const userTableMigrationQuery = `
  CREATE TABLE IF NOT EXISTS \`user\` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email CHAR(255) NOT NULL UNIQUE,
    password CHAR(100) NOT NULL,
    region_iso CHAR(5) NOT NULL DEFAULT 'es-co',
    loading_animation_type TINYINT NOT NULL DEFAULT 1,
    budget DECIMAL(8, 2) NOT NULL DEFAULT 0,
    language CHAR(6) NOT NULL DEFAULT 'es'
  );
`;

module.exports = userTableMigrationQuery;
