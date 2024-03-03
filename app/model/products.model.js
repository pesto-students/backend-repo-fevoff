const mongoose = require('mongoose');

const products = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Product Name"],
    },
    productSlug: {
        type: String,
        required: [true, "Please Provide Product Slug"],
    },
    brand: {
        type: String,
        required: [true, "Please Provide Product Brand"],
    },
    category: {
        type: String,
        required: [true, "Please Provide Product Category"],
    },
    seller: {
        type: String,
        default: 0,
    },
    productSmallDescription: {
        type: String,
        required: [true, "Please Provide Product Small Description"],
    },
    productDescription: {
        type: String,
        required: [true, "Please Provide Product Description"],
    },
    showHide: {
        type: Boolean,
        default: true,
    },
    status: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });

module.exports = mongoose.model("product", products);