const mongoose = require('mongoose'),
    crypto = require('crypto'),
    users = mongoose.Schema({
        id: {
            type: String,
            unique: true,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        }
    });

users.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

users.methods.makeSalt = function () {
    return crypto.randomBytes(128).toString('base64');
};

users.methods.comparePassword = function (pass) {
    return this.password === this.encryptPassword(pass);
};

users.virtual('pass').set(function (password) {
    this.salt = this.makeSalt();
    this.password = this.encryptPassword(password);
});

module.exports = mongoose.model('Users', users);
