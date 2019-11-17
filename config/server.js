const express=require("express");
const consign=require("consign");
const bodyParser=require("body-parser");
const Functions = require('../functions/functions');

const app=express();

app.set("view engine","ejs");
app.set("views","./app/views");

app.use(express.static("./app/public/"));
app.use(bodyParser.urlencoded({extended:true}));
app.Functions=Functions();


consign()
.then("./app/routes")
.then("./app/models")
.then("./app/controllers")
.then("./banco/db.js")
.then("./app/models")
.into(app);


module.exports=app;