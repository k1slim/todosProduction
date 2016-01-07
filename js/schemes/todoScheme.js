const mongoose = require('mongoose'),
    todo = mongoose.Schema({
        id: {
            type: String,
            unique: true,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false,
            required: true
        },
        tab: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model('Todo', todo);