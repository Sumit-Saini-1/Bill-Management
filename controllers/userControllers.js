const { findUserByUserName, getProductsList, addBillToDatabase,countBills,getAllBill } = require("../databaseFunction/userQuery");

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
function getProducts(req, res) {
    getProductsList().then(function (products) {
        res.status(200).json(products);
    }).catch(function (err) {
        res.status(500).send("ERROR");
    })
}

function historyOfBills(req,res) {
    getAllBill().then(function(bills){
        res.status(200).json(bills);
    }).catch(err=>{
        res.status(500).send("error");
    })
    
}

function newBill(req, res) {
    const body = req.body;
    addBillToDatabase({ invoiceNo: body.invoiceNo, billdetails: body.billdetails, billItems: body.billItems, grandTotal: body.grandTotal, date: body.date }).then(function (bill) {
        res.status(200).json(bill);
    }).catch(function (err) {
        res.status(500).send("ERROR");
    });
}

async function generateInvoiceNumber(req,res) {
    let count = await countBills();
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const result = `${year}/${month}/INV/${String(count + 1).padStart(3, '0')}`;
    res.status(200).json({invoiceNo:result});
}

module.exports = {
    serveHomePage,
    serveLoginPage,
    serveHistoryPage,
    serveStockPage,
    loginUser,
    getUserDetail,
    getProducts,
    newBill,
    generateInvoiceNumber,
    historyOfBills
}