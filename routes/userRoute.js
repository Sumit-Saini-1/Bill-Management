const express = require('express');
const userRouter = express();
const { isLogin } = require("../auth")
const { serveHomePage, serveLoginPage, serveHistoryPage, serveStockPage, loginUser, verifyUserToken, serverBillGeneratePage } = require("../controllers/userControllers");

userRouter.use((req, res, next) => {
    res.locals.user = req.session.username || null; // If logged in, store user in locals
    next();
});


userRouter.get("/login", serveLoginPage);
userRouter.get("/", serveHomePage);
userRouter.get("/bill", isLogin, serverBillGeneratePage)
userRouter.get("/stock", isLogin, serveStockPage);
userRouter.get("/billHistory", isLogin, serveHistoryPage);

userRouter.get("/verifyToken", verifyUserToken)

userRouter.post("/login", loginUser);
userRouter.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = {
    userRouter
}