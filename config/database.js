const crypto = require('crypto');

const crypt = crypto.randomBytes(256).toString('hex');

module.exports = {
    uri : "mongodb://127.0.0.1:27017/mean-angular-2",
    secret: crypt,
    db: "mean-angular-2"
}