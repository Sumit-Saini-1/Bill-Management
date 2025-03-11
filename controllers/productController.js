const { addProductDb, getProductsList, updatedProductDb } = require("../databaseFunction/productQuery");

function addProduct(req, res) {
    const productname = req.body.name;
    const HSNcode = req.body.HSNcode;
    const price = req.body.price;
    const gst = req.body.gst;
    const isActive = req.body.isActive;
    const stock = req.body.stock;

    addProductDb(productname, HSNcode, price, gst, req.session._id, isActive, stock).then(product => {
        res.status(200).json(product);
    }).catch(err => res.status(500).send(err));
}

function getProducts(req, res) {
    getProductsList(req.session._id).then(function (products) {
        res.status(200).json(products);
    }).catch(function (err) {
        res.status(500).send("ERROR");
    })
}

function updateProduct(req, res) {
    const { id } = req.params;
    const { name, HSNcode, price, gst, isActive, stock } = req.body;
    updatedProductDb(id, name, HSNcode, price, gst, isActive, stock).then(data=>{
        res.status(200).json(data);
    }).catch(function (err) {
        res.status(500).send("ERROR");
    })
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct
}