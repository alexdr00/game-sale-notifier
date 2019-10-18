const crypto = require('crypto');

class PasswordEncryption {
  constructor() {
    this.saltLength = 16;
  }

  generateSalt() {
    return crypto
      .randomBytes(Math.ceil(this.saltLength / 2))
      .toString('hex')
      .slice(0, this.saltLength);
  }

  generateHash(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const passwordHashed = hash.digest('hex');
    return { salt, passwordHashed };
  }

  saltHashPassword(password) {
    const salt = this.generateSalt();
    return this.generateHash(password, salt);
  }
}

module.exports = new PasswordEncryption();
