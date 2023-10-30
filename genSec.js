const crypto = require('crypto');

// Generate a random secret with a specified length (e.g., 32 bytes)
const generateJWTSecret = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate a 256-bit (32-byte) secret
const secret = generateJWTSecret(64);

console.log('Generated JWT Secret:', secret);