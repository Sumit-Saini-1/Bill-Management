const express = require('express');
const billRouter = express();
const { isLogin } = require("../auth")
const { generateInvoiceNumber, historyOfBills, getBillPdf, newBill } = require('../controllers/billController');

billRouter.get("/invoiceNo", isLogin, generateInvoiceNumber);
billRouter.get("/allBills", isLogin, historyOfBills);
billRouter.get("/bill", isLogin, getBillPdf);

billRouter.post("/newBill", isLogin, newBill);


module.exports = {
    billRouter
}