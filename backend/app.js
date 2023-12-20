import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import Chat from "./models/chat.js";
dotenv.config();

const app = express();
connectDB();

app.set('view engine', 'ejs')

app.get("/", async (req, res) => {
	console.log("hi");
	res.status(200).json({ message: "success" });
});

const PORT = process.env.PORT || 8000;
const expressServer = app.listen(PORT, () => {
	console.log(`server is runnig on port ${PORT}`);
});



const io = new Server(expressServer);
io.on('connection',(socket)=>{
    socket.emit("chat-message","connected to socker io 'chat-message'");

    // socket.on or io.on means get data
    io.on('event', data => { 
        console.log("hello world");
    });

    io.on('disconnect',()=>{
        console.log("disconnected socket io");
    })
})
