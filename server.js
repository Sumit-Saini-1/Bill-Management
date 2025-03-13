require("dotenv").config();
const express = require('express');
const app = express();
const session = require("express-session");
const cors = require("cors");

const db = require("./models/db");
const { userRouter } = require("./routes/userRoute");
const { productRouter } = require("./routes/productRoute");
const { billRouter } = require("./routes/billRoutes");

app.set('view engine', 'ejs');
const sessionMiddleware = session({
    secret: "devBill",
    resave: false,
    saveUninitialized: true
});
app.use(cors({
    origin: ['*'],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}));
app.use(sessionMiddleware);
app.use(express.static("styles"));
app.use(express.static("scripts"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/', userRouter);
app.use('/product', productRouter);
app.use('/bill', billRouter);

app.get("*", function (req, res) {
    res.redirect("/");
});

db.init().then(function () {
    console.log("db connected");
    app.listen(4000, function () {
        console.log("listening on 4000");
    });
}).catch(function (err) {
    console.log(err);
});