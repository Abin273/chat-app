import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const socket = io("http://localhost:4000"); // Update with your server URL

function App() {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const socket = io("http://localhost:4000");

		socket.on("connect", () => {
			console.log("WebSocket connected");
		});

		socket.on("message", (data) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		// Clean up the socket connection on component unmount
		return () => {
			socket.disconnect();
		};
	}, []);

	const sendMessage = () => {
		// Send a message to the server
		socket.emit("message", { sender: "You", text: message });
		setMessage("");
	};

	return (
		<div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-8">
			<h1 className="text-2xl font-bold mb-4">Socket.IO Chat App</h1>
			<div className="border-t border-b border-gray-200 p-4 mb-4">
				<ul>
					{messages.map((msg, index) => (
						<li
							key={index}
							className={`mb-2 ${
								msg.sender === "You"
									? "text-blue-500"
									: "text-green-500"
							}`}
						>
							<strong>{msg.sender}:</strong> {msg.text}
						</li>
					))}
				</ul>
			</div>
			<div className="flex items-center">
				<input
					type="text"
					className="flex-1 rounded-l p-2"
					placeholder="Type your message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					className="bg-blue-500 text-white p-2 rounded-r"
					onClick={sendMessage}
				>
					Send
				</button>
			</div>
		</div>
	);
}

export default App;
