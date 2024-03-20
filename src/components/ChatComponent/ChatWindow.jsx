import React, { useState } from "react";

const ChatWindow = ({ selectedFollower, onClose }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        // Implement sending message logic here
        console.log("Message sent:", message);
        setMessages([...messages, message]); // Add the new message to the list
        setMessage(""); // Clear the message input after sending
    };
    
    const ChatWindowStyle = {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%', // Adjust width as needed
        height: '100vh', // Take full viewport height
        backgroundColor: '#fff',
        borderLeft: '1px solid #e3e3e3',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const inputContainerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div className="chat-window" style={{ ...ChatWindowStyle, backgroundColor: '#f8f9fa' }}>
            <div className="chat-header" style={headerStyle}>
                <span>{selectedFollower.firstName} {selectedFollower.lastName}</span>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
            <div className="chat-messages">
                {/* Display messages if available, otherwise render empty space */}
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))
                ) : (
                    <div style={{ minHeight: '50px' }}></div> // Empty space
                )}
            </div>
            <div className="chat-input" style={inputContainerStyle}>
                {/* Input box for sending messages */}
                <input
                    type="text"
                    className="form-control flex-grow-1 mr-2"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleMessageChange}
                />
                <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
