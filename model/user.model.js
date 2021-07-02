const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema = mongoose.Schema({
    name: {
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
    },
    accessToken: {
        type: String
    }
});


module.exports = mongoose.model('User', userSchema);