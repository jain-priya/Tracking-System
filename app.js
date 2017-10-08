const express = require("express");
const socket = require("socket.io");
var app = express();
const bodyParser = require('body-parser');
var session = require('express-session')
app.use(express.static("public"));
const routes = require("./routes/router");
var server = app.listen(3000, function () {
    console.log("Server Start....");
})


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', routes);


/*app.set('trust proxy', 1) // trust first proxy*/
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 6000
    }
}))


var io = socket(server);

io.sockets.on('connection', function (socket) {
    console.log("Connection on");
    console.log("connection:", socket.request.connection._peername);
    socket.emit('message', {
        message: 'Tracing...'
    });
    socket.on('latlong', function (data) {
        console.log("sending data");
        console.log("message", +data.lat + " long " + data.long + " name " + data.name + " date " + data.date);
        io.sockets.emit('message', data);
    })
});
