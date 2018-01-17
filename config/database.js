const crypto = require('crypto');

const crypt = crypto.randomBytes(256).toString('hex');

module.exports = {
    uri : "mongodb://localhost:27017" + this.db,
    secret: crypt,
    db: "mean-angular-2"
}