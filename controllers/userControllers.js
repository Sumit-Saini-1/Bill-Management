const { findUserByUserName } = require("../databaseFunction/userQuery");

function serveLoginPage(req, res) {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
    }
}
function serveHomePage(req, res) {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
    }
}
function serveHistoryPage(req, res) {
    try {
        res.render("history");
    } catch (error) {
        console.log(error);
    }
}
function serveStockPage(req, res) {
    try {
        res.render("stocks");
    } catch (error) {
        console.log(error);
    }
}

async function loginUser(req, res) {
    try {
        const user = await findUserByUserName(req.body.username);
        if (user) {
            if (user.password == req.body.password) {
                req.session.isLoggedIn = true;
                req.session.username = user.primaryEmail;
                req.session.name = user.name;
                req.session._id = user._id;
                res.redirect("/");
                return;
            }
            else {
                res.status(401).send("invalid credential");
                return;
            }
        }
        res.status(404).send("user not found");
    } catch (error) {
        res.status(500).send("error");
    }
}
async function getUserDetail(req, res) {
    try {
        const user = await findUserByUserName(req.body.username);
        delete (user.password)
        console.log(user);
    } catch (error) {
        res.status(500).send("error");
    }
}

module.exports = {
    serveHomePage,
    serveLoginPage,
    serveHistoryPage,
    serveStockPage,
    loginUser,
    getUserDetail,
}