const mongoose = require('mongoose'),
    tab = mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true
        },
        value: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model('Tab', tab);