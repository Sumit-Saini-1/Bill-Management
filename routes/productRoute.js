const express = require('express');
const productRouter = express();
const { isLogin } = require("../auth");
const { getProducts, updateProduct, addProduct } = require('../controllers/productController');

productRouter.get("/products", isLogin, getProducts);
productRouter.post("/addProduct", isLogin, addProduct);
productRouter.put('/products/:id', isLogin,updateProduct);

module.exports = {
    productRouter
}