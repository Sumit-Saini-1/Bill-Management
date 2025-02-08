const express = require('express');
const billRouter = express();
const { isLogin } = require("../auth")
const { getNewInvoiceNumber, historyOfBills, getBillPdf, newBill } = require('../controllers/billController');

billRouter.get("/invoiceNo", isLogin, getNewInvoiceNumber);
billRouter.get("/allBills", isLogin, historyOfBills);
billRouter.get("/bill", isLogin, getBillPdf);

billRouter.post("/newBill", isLogin, newBill);


module.exports = {
    billRouter
}