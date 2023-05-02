const crypto = require('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = generateRandomString;
