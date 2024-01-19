
import React, { useState } from "react";
import { io } from "socket.io-client";
import "./App.css"; // Import the CSS file

const socket = io("http://localhost:5000");

function App() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", { message });
        setMessage("");
    };

    socket.on("chat", (payload) => {
        setChat([...chat, payload]);
    });

    return (
        <div className="App">
            <header className="App-header">
                <h1>Chatting App</h1>
                <form onSubmit={sendChat}>
                    <input
                        type="text"
                        name="chat"
                        placeholder="Send text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
                <div className="Chat-container">
                    {chat.map((msg, index) => (
                        <p
                            key={index}
                            className={msg.isMyMessage ? "Chat-my-message" : "Chat-message"}
                        >
                            {msg.message}
                        </p>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
