require("dotenv").config();
const express = require('express');
const app=express();
const session = require("express-session");

const db = require("./Models/db");
const {userRouter} =require("./routes/userRoute")

app.set('view engine', 'ejs');
const sessionMiddleware = session({
    secret: "devBill",
    resave: false,
    saveUninitialized: true
});
app.use(sessionMiddleware);
app.use(express.static("styles"));
app.use(express.static("scripts"));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use('/', userRouter);


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