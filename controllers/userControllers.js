const { findUserByUserName } = require("../databaseFunction/userQuery");
const { createToken, verifyToken } = require("../utils/jwt");

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

function verifyUserToken(req,res){
    const token = req.headers?.authorization;
    if (!token) {
        return res.status(401).json({ err: "Not logged in" });
    }
    verifyToken(token).then(result => {
        if (result) {
            res.status(200).json({ msg: "user is logged in and token is valid" });
            return;
        } else {
            // If token verification fails, send a 401 Unauthorized error
            return res.status(401).json({ err: "Not logged in" });
        }
    }).catch(err => {
        console.error("Token verification failed:", err);
        return res.status(401).json({ err: "Not logged in" });
    });
}

async function loginUser(req, res) {
    try {
        const user = await findUserByUserName(req.body?.username.toLocaleLowerCase());
        const redirectFromServer = req.body?.redirect
        if (user) {
            if (user.password == req.body.password) {
                req.session.isLoggedIn = true;
                req.session.username = user.primaryEmail;
                req.session.name = user.name;
                req.session._id = user._id;
                if(redirectFromServer){
                    res.redirect("/");
                    return;
                }
                const token = createToken(user._id, user.username, user.name);
                res.status(200).json({ "id": user._id, "username": user.primaryEmail, "token": token });
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
        const user = await findUserByUserName(req.body.username.toLocaleLowerCase());
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
    verifyUserToken,
}