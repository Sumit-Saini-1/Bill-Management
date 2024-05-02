const ProductModel = require("../models/Products");

/**
 * @param {string} name product name
 * @param {string} HSNcode product HSNcode
 * @param {number} price product price
 * @param {number} gst gst on this product
 * @param {string} sellerId user is of seller
 * @returns a promise => product in form of object as stored in database
 */
function addProductDb(name, HSNcode, price, gst, sellerId) {
    return new Promise((resolve, reject) => {
        ProductModel.create(
            {
                name,
                HSNcode,
                price,
                gst,
                seller: sellerId,
            }
        ).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

function getProductsList() {
    return new Promise((resolve, reject) => {
        ProductModel.find({}).then(function (products) {
            resolve(products);
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports = {
    addProductDb,
    getProductsList
}