const gameTableMigrationQuery = `
  CREATE TABLE IF NOT EXISTS game (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    igdb_key INT NOT NULL UNIQUE,
    game_name CHAR(100) NOT NULL UNIQUE,
    current_price DECIMAL(8, 2) NOT NULL,
    original_price DECIMAL(8, 2) NOT NULL,
    cover_url CHAR(100) NOT NULL,
    psn_store_url CHAR(200) NOT NULL
  );
`;

module.exports = gameTableMigrationQuery;
