const ProductModel = require("../models/Products");

/**
 * @param {string} name product name
 * @param {string} HSNcode product HSNcode
 * @param {number} price product price
 * @param {number} gst gst on this product
 * @param {string} sellerId user is of seller
 * @param {boolean} isActive product ready for sell or not
 * @param {number} stock available quantity of product in store
 * @returns a promise => product in form of object as stored in database
 */
function addProductDb(name, HSNcode, price, gst, sellerId, isActive = true, stock = 0) {
  return new Promise((resolve, reject) => {
    ProductModel.create(
      {
        name,
        HSNcode,
        price,
        gst,
        seller: sellerId,
        isActive,
        stock
      }
    ).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

/**
 * this is for update product details in db
 * @param {string} id 
 * @param {string} name 
 * @param {string} HSNcode 
 * @param {number} price 
 * @param {number} gst 
 * @param {boolean} isActive 
 * @param {number} stock
 * @returns 
 */
function updatedProductDb(id, name, HSNcode, price, gst, isActive, stock) {
  return new Promise((resolve, reject) => {
    ProductModel.updateOne({ _id: id }, { name, HSNcode, price, gst, isActive, stock }).then(updatedProduct => {
      resolve(updatedProduct);
    }).catch((err) => {
      reject(err)
    });
  })
}

/**
 * this is function to retrieve products from database of a sprcific seller
 * @param {string} seller 
 * @returns 
 */
function getProductsList(seller) {
  return new Promise((resolve, reject) => {
    ProductModel.find({ seller }).then(function (products) {
      resolve(products);
    }).catch(function (err) {
      reject(err);
    });
  });
}

module.exports = {
  addProductDb,
  getProductsList,
  updatedProductDb
}