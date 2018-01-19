const express = require("express");
const route = express.Router();
const path = require("path");
const crud = require("../db/crud");
const User = require("../user");

route.post("/signUp", (request, response) => {
    console.log("inside signup");
    console.log(request.body);
    var userid = request.body.userid;
    var pwd = request.body.pwd;
    var fname = request.body.fname;
    var lname = request.body.lname;
    var date = request.body.date;
    var gender = request.body.gender;
    var userObject = new User(userid, pwd, fname, lname, date, gender);
    crud.signUp(userObject, response);
});


route.post("/signIn", (request, response) => {
    console.log("inside signin");
    console.log(request.body);
    var loguserid = request.body.userid;
    var logpwd = request.body.pwd;
    var userObject = new User(loguserid, logpwd);
    crud.signIn(userObject, request, response);
});


route.get('/', (request, response) => {
    console.log(__dirname);
    var normalPath = path.normalize(__dirname + "/..");
    console.log(normalPath);
    var fullPath = path.join(normalPath, "/public/pages/index.html");
    response.sendFile(fullPath);
});

module.exports = route;
