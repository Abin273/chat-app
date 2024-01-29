import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"; 
import cors from "cors";

import http from "http";
import { Server as SocketIo } from "socket.io";

// import connectDB from "./config/db.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// connectDB();
// app.set('view engine', 'ejs')
app.use(morgan("dev"));
app.use(
	cors({
		origin: "http://localhost:3000", // origin(s) i want to allow
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true, // Enable cookies and credentials for cross-origin requests
	})
);


io.on("connection", (socket) => {
	// console.log(socket);
	console.log(`A user is connected. Socket ID: ${socket.id}`);

	// Listen for messages from the client
	socket.on("message", (data) => {
		console.log("Message from client:", data);

		// Broadcast the message to all connected clients
		io.emit("message", data);
	});

	// Handle disconnection
	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
