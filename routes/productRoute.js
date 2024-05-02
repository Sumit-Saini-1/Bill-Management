const express = require('express');
const productRouter = express();
const { isLogin } = require("../auth");
const { getProducts } = require('../controllers/productController');

productRouter.get("/products", isLogin, getProducts);


module.exports = {
    productRouter
}