const { default: mongoose } = require("mongoose");
const BillModel = require("../models/Bill");

/**
 * 
 * @param {mongoose.Schema.Types.ObjectId | string} data.billedBy - The id of the person who issued the bill.
 * @returns {Promise<number>} - The count of bills issued by the specified person.
 */
function countBills(billedBy) {
    return new Promise((resolve, reject) => {
        BillModel.countDocuments({billedBy}).then(function (count) {
            resolve(count);
        }).catch(function (err) {
            reject(err);
        });
    });
}

/**
 * Adds a bill to the database.
 * 
 * @param {Object} data - The bill data.
 * @param {string} data.invoiceNo - The invoice number.
 * @param {Array} data.billdetails - The details of the bill.
 * @param {Array} data.billItems - The list of items in the bill.
 * @param {number} data.grandTotal - The total amount for the bill.
 * @param {Date} data.date - The date of the bill.
 * @param {mongoose.Schema.Types.ObjectId | string} data.billedBy - The id of the person who issued the bill.
 * @returns {Promise<Object>} - A promise that resolves with the created bill or rejects with an error.
 */
function addBillToDatabase(data) {
    const { invoiceNo, billdetails, billItems, grandTotal, date, billedBy } = data;
    return new Promise((resolve, reject) => {
        BillModel.create({ invoiceNo, billdetails, billItems, grandTotal, date, billedBy }).then(function (bill) {
            resolve(bill);
        }).catch(function (err) {
            reject(err);
        })
    })
}

/**
*   @param invoiceNo -invoice no of bill which you want to fetch
*   @return -object of bill data
*/
function getBill(invoiceNo) {
    return new Promise((resolve, reject) => {
        BillModel.findOne({ invoiceNo: invoiceNo }).then(bill => { resolve(bill) }).catch(err => {
            reject(err);
        })
    })
}

/**
 * @description This function retrieves a list of bills billed by a specific entity.
 * @param {string} billedBy - The entity that billed the bills.
 * @returns {Promise<Array>} A promise that resolves to an array of bills or an empty array if none found.
 */
function getAllBill(billedBy) {
    return new Promise((resolve, reject) => {
        BillModel.find({billedBy}).then(function (bills) {
            if (bills) {
                resolve(bills);
                return;
            }
            resolve([]);
            return;
        }).catch(function (err) {
            console.log(err);
            reject(err);
            return;
        });
    })
}

module.exports = {
    countBills,
    addBillToDatabase,
    getBill,
    getAllBill
}