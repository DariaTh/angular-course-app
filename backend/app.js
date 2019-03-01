const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://daria:Sn5ZKxCN6sl5RcvL@cluster0-fzmem.mongodb.net/node-angular?retryWrites=true")
.then(() => {
    console.log("Connect!");
})
.catch(() => {
    console.log("Connect failed...");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
        );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
    next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
