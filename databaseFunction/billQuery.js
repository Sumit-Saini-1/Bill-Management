const BillModel = require("../models/Bill");

function countBills() {
    return new Promise((resolve, reject) => {
        BillModel.countDocuments().then(function (count) {
            resolve(count);
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
 * @description this is function to get list of bills 
 * @returns arry of bills object
 */
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

module.exports = {
    countBills,
    addBillToDatabase,
    getBill,
    getAllBill
}