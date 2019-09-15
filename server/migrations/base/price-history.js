const priceHistoryTableMigrationQuery = `
  CREATE TABLE IF NOT EXISTS price_history (
    price_history_id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(8, 2) NOT NULL,
    game_id INT NOT NULL,
    \`timestamp\` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES game(game_id)
  );
`;

module.exports = priceHistoryTableMigrationQuery;
