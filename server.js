//Adding required packages
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");

//Intialize Express
const app = express();
//Creating Server
const server = http.createServer(app);
//Initializing Socketio object
const io = socketio(server);

//Static files
app.use(express.static("static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

//Listening for a user's connection
io.sockets.on("connection", socket => {
    //Emiting the drawing data
    socket.on("mouse", data => {
        socket.broadcast.emit("mouse", data);
    });

    socket.on("clear", () => {
        socket.broadcast.emit("clear");
    });
});

//port for listening
const PORT = process.env.PORT || 3000;

//Listening to port
server.listen(PORT, () => {
    console.log(`The Server is running in http://localhost:${PORT}`);
});
