const crypto = require('crypto');

class PasswordSecurity {
  constructor() {
    // Never ever touch this value.
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
    return passwordHashed + salt;
  }

  encrypt(password) {
    const salt = this.generateSalt();
    return this.generateHash(password, salt);
  }

  match(submittedPassword, storedPassword) {
    const hashIndex = storedPassword.length - this.saltLength;

    const storedPasswordHash = storedPassword.substring(0, hashIndex);
    const storedPasswordSalt = storedPassword.substring(hashIndex, storedPassword.length);

    const submittedPasswordEncrypted = this.generateHash(submittedPassword, storedPasswordSalt);
    const submittedPasswordHash = submittedPasswordEncrypted.substring(0, hashIndex);

    return submittedPasswordHash === storedPasswordHash;
  }
}

module.exports = new PasswordSecurity();
