const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    country_code: Number,
    contact: Number,
    profile_image: String,
    status: Number,
    user_verify: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);