const { addProductDb, getProductsList } = require("../databaseFunction/productQuery");

function addProduct(req, res) {
    const productname = req.body.name;
    const HSNcode = req.body.HSNcode;
    const price = req.body.price;
    const gst = req.body.gst;

    addProductDb(productname, HSNcode, price, gst, req.session._id).then(product => {
        res.status(200).json(product);
    }).catch(err => res.status(500).send(err));
}

function getProducts(req, res) {
    getProductsList().then(function (products) {
        res.status(200).json(products);
    }).catch(function (err) {
        res.status(500).send("ERROR");
    })
}

module.exports = {
    addProduct,
    getProducts
}