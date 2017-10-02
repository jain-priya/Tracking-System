const express = require("express");
const socket = require("socket.io");
var app = express();

app.use(express.static("public"));


var server = app.listen(process.env.port || 3000, function () {
    console.log("Server Start....");
})
app.get('/', (request, response) => {
    response.sendfile(__dirname + "/public/index.html");
})
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
