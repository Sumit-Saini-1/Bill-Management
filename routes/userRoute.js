const express = require('express');
const userRouter = express();
const { isLogin } = require("../auth")
const { serveHomePage, serveLoginPage, serveHistoryPage, serveStockPage, loginUser, getProducts, newBill, generateInvoiceNumber, historyOfBills, getBillPdf } = require("../controllers/userControllers");

userRouter.get("/login", serveLoginPage);
userRouter.get("/", isLogin, serveHomePage);
userRouter.get("/billHistory", isLogin, serveHistoryPage);
userRouter.get("/stock", isLogin, serveStockPage);
userRouter.get("/products", isLogin, getProducts);
userRouter.get("/invoiceNo", isLogin, generateInvoiceNumber);
userRouter.get("/allBills", isLogin, historyOfBills);
userRouter.get("/bill", isLogin, getBillPdf);

userRouter.post("/login", loginUser);
userRouter.post("/newBill", isLogin, newBill);
userRouter.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = {
    userRouter
}