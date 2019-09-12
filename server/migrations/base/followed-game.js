const followedGameTableMigrationQuery = `
  CREATE TABLE IF NOT EXISTS followed_game (
    followed_game_id INT AUTO_INCREMENT PRIMARY KEY,
    has_been_purchased BOOLEAN NOT NULL DEFAULT FALSE,
    game_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (game_id) REFERENCES game(game_id)
  );
`;

module.exports = followedGameTableMigrationQuery;
