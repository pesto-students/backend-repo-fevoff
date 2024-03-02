const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
    },
    countryCode: {
        type: Number,
        required: [true, "Please enter country code"],
    },
    contact: {
        type: Number,
        required: [true, "Please enter Contact Number"],
    },
    profileImage: {
        type: String,
        required: [true, "Please enter Password"],
    },
    password: String,
    userVerify: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);