const express = require("express");
const socket = require("socket.io");
var app = express();
const bodyParser = require('body-parser');
var session = require('express-session')
app.use(express.static("public"));
const routes = require("./routes/router");
const crud = require("./db/crud");
const position = require("./position");

var empUsers = [];
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log("Server Start....");
})


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', routes);


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

var io = socket(server);

io.sockets.on('connection', function (socket) {
    console.log("Connection on");
    console.log("connection:", socket.request.connection._peername);

    socket.emit("message", {
        message: 'welcome to the Track Me' + socket.id
    });

    socket.on('latlong', function (empLoc) {

        empUsers.push(empLoc);
        console.log("sending data");
        console.log("empUsers", +empUsers);
        empUsers.forEach(function (x) {

            console.log(x.lat + " long " + x.long + " name " + x.userid + " date " + x.date);

        })

        io.sockets.emit("emp_Users", empUsers);
    });

    socket.on("Inside db", function (empLoc) {
        console.log("Inside db empLoc", +empLoc.lat + " long " + empLoc.long + " name " + empLoc.userid + " date " + empLoc.date);
        var positionObj = new position(empLoc.userid, empLoc.lat, empLoc.long, empLoc.date);

        crud.insert(positionObj);
    })

});
