var crypto = require('crypto'),
    winston = require('winston');

function Crypto(settings) {
    this.algorithm = settings.algorithm || undefined;
    this.key = settings.key || undefined;

    this.enabled = (this.algorithm && this.key);

    if (!this.enabled)
    {
        winston.warn("Encryption settings have not been set up. Messages " +
                 "will be broadcast in plain-text. Consider setting up " +
                 "encryption in your IRCCD configuration.");
    }
}

Crypto.prototype = {};

Crypto.prototype.encrypt = function crypto_encrypt (message)
{
    if (this.enabled)
    {
        var cypher = crypto.createCypher(this.algorithm, this.key);
        return cypher.update(message, 'utf8', 'hex');
    }
    
    return message;
}

Crypto.prototype.decrypt = function crypto_decrypt (message)
{
    if (this.enabled)
    {
        var cypher = crypto.createDecipher(this.algorithm, this.key);
        return cypher.update(message, 'hex', 'utf8');
    }

    return message;
}

module.exports = Crypto;
