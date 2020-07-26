const mongoose = require('mongoose');

const User = new mongoose.Schema({
    login: String,
    password: String,
    liked: String
}, {
    versionKey: false
});

module.exports = mongoose.model('users', User);
