const mongoose = require('mongoose');

const ProductScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 100
    },
    image: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", ProductScheme);

module.exports = Product;