const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Info: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);