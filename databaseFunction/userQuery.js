const UserModel = require("../models/User");
const ProductModel = require("../models/Products");
const BillModel = require("../models/Bill");

function findUserByUserName(username) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({ primaryEmail: username }).then(function (user) {
            if (user) {
                resolve(user);
                return;
            }
            resolve(false);
            return;
        }).catch(function (err) {
            console.log(err);
            reject(err);
            return;
        });
    });
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

function addBillToDatabase(data) {
    const invoiceNo = data.invoiceNo;
    const billdetails = data.billdetails;
    const billItems = data.billItems;
    const grandTotal = data.grandTotal;
    const date = data.date;
    return new Promise((resolve, reject) => {
        BillModel.create({ invoiceNo, billdetails, billItems, grandTotal, date }).then(function (bill) {
            resolve(bill);
        }).catch(function (err) {
            reject(err);
        })
    })
}

function countBills() {
    return new Promise((resolve, reject) => {
        BillModel.countDocuments().then(function (count) {
            resolve(count);
        }).catch(function (err) {
            reject(err);
        });
    });
}

function getAllBill() {
    return new Promise((resolve, reject) => {
        BillModel.find({}).then(function (bills) {
            if (bills) {
                resolve(bills);
                return;
            }
            resolve(false);
            return;
        }).catch(function (err) {
            console.log(err);
            reject(err);
            return;
        });
    })
}
/*
* @params invoiceNo
* @return Object
*/
function getBill(invoiceNo) {
    return new Promise((resolve, reject) => {
        BillModel.findOne({ invoiceNo: invoiceNo }).then(bill => { resolve(bill) }).catch(err => {
            reject(err);
        })
    })
}
module.exports = {
    findUserByUserName,
    getProductsList,
    addBillToDatabase,
    countBills,
    getAllBill,
    getBill
}