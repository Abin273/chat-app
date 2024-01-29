import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const socket = io("http://localhost:5000", {
	withCredentials: true,
	autoConnect: false,
});

function App() {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		// Establish the connection when the component mounts
		socket.connect();

		// Clean up the connection when the component unmounts
		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		const handleReceivedMessage = (data) => {
			console.log("message", data);
			setMessages((prevMessages) => [...prevMessages, data]);
		};

		// Add the event listener
		socket.on("message", handleReceivedMessage);

		// Clean up the event listener when the component unmounts
		return () => {
			socket.off("message", handleReceivedMessage);
		};
	}, []); // Empty dependency array ensures that this effect runs only once on mount

	// Send a message to the server
	const sendMessage = () => {
		socket.emit("message", { sender: "You", text: currentMessage });
		setCurrentMessage("");
	};

	return (
		<div className="flex h-screen">
			<div className="w-full bg-gray-200 px-24 ">
				<h1 className="text-3xl font-bold mb-4">Socket.IO Chat App</h1>
				<div className="h-96 overflow-y-auto border rounded p-4 bg-white">
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
				<div className="mt-4 flex">
					<input
						type="text"
						className="flex-1 rounded-l p-2"
						placeholder="Type your message..."
						value={currentMessage}
						onChange={(e) => setCurrentMessage(e.target.value)}
					/>
					<button
						className="bg-blue-500 text-white p-2 rounded-r"
						onClick={sendMessage}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
