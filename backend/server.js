const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        allowedHeaders: ["Authentication"],
        credentials: true,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("New user connected ,id is: ", socket.id);
    console.log("Socket is active and connected.");

    socket.on("chat", (payload) => {
        console.log("Received chat message: ", payload);
        io.emit("chat", payload);
    });
});

io.on("disconnect", (socket) => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getActiveUsers", activeUsers);
});


app.get('/', (req, res) => {
    res.send("Hello, world!");
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
