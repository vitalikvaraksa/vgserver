const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: String,
    userName: String,
    email: String,
    password: String,
    country: String,
    mobile: String,
    referralId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);