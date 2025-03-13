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
 * Updates product details in the database with only received valid values.
 * @param {string} id - The product ID.
 * @param {Object} data - The updated product details.
 * @param {string} [data.name] - The product name.
 * @param {string} [data.HSNcode] - The HSN code.
 * @param {number} [data.price] - The price.
 * @param {number} [data.gst] - The GST percentage.
 * @param {boolean} [data.isActive] - Active status.
 * @param {number} [data.stock] - Available stock.
 * @returns {Promise<Object>} - The updated product document.
 */
async function updatedProductDb(id, data) {
  try {
    // Remove undefined values from the update object
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields provided for update.");
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedProduct) {
      throw new Error("Product not found.");
    }

    return updatedProduct;
  } catch (err) {
    throw new Error(`Failed to update product: ${err.message}`);
  }
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