const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    HSNcode: String,
    price: Number,
    gst: Number,
    isActive: Boolean,
    stock: Number,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;