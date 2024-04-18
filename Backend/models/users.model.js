const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    avatarUrl: String,
    location: String,
    blog: String,
    bio: String,
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
