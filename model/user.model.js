const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', userSchema);