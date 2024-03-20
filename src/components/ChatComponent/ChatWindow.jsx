import React, { useState } from "react";

const ChatWindow = ({ selectedFollower, onClose }) => {
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        // Implement sending message logic here
        console.log("Message sent:", message);
        setMessage(""); // Clear the message input after sending
    };
    const ChatWindowStyle = {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '300px', // Adjust width as needed
        height: '100%', // Take full height of the parent
        backgroundColor: '#fff',
        borderLeft: '1px solid #e3e3e3',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    };
    console.log("hello1->>" + selectedFollower)
    return (
        <div className="chat-window" style={{ ...ChatWindowStyle, backgroundColor: '#f8f9fa' }}>
            <div className="chat-header">
                <span>{selectedFollower.firstName} {selectedFollower.lastName}</span>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
            <div className="chat-messages">
                {/* Display chat messages here */}
                {/* Example: <div>{selectedFollower.firstName}: Hi there!</div> */}
            </div>
            <div className="chat-input d-flex">
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
