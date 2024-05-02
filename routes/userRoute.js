const express = require('express');
const userRouter = express();
const { isLogin } = require("../auth")
const { serveHomePage, serveLoginPage, serveHistoryPage, serveStockPage, loginUser } = require("../controllers/userControllers");

userRouter.get("/login", serveLoginPage);
userRouter.get("/", isLogin, serveHomePage);
userRouter.get("/stock", isLogin, serveStockPage);
userRouter.get("/billHistory", isLogin, serveHistoryPage);

userRouter.post("/login", loginUser);
userRouter.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = {
    userRouter
}