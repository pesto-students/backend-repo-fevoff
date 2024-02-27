const mongoose = require('mongoose');

const brands = mongoose.Schema({
    name: String,
    brand_slug: String,
    show_hide: Number,
    brand_image: String,
    status: Number,
}, { timestamps: true });

module.exports = mongoose.model("brands", brands);