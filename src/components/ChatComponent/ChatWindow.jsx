import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";

const ChatWindow = ({ selectedFollower, onClose }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [showSentAt, setShowSentAt] = useState(null);
    const userId = parseInt(localStorage.getItem("userId"), 10);
    console.log("UserId: ", userId);

    useEffect(() => {
        // Fetch initial messages from the backend when the component mounts
        fetchInitialMessages();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const fetchInitialMessages = async () => {
        const token = localStorage.getItem("jwtToken");
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post(`${API_URL}/chat/getChats?toUserId=${selectedFollower.id}`, {}, options);
            console.log('Request URL:', response.config.url); 
            console.log(response.data);
            const alignedMessages = response.data.map(item => ({
                chatText: item.chatText,
                fromUserId: item.fromUserId,
                sentAt: new Date(item.sentAt).toLocaleString(), // Format sentAt time
                align: item.fromUserId === userId ? 'right' : 'left',
            }));
            setMessages(alignedMessages);
        } catch (error) {
            throw error;
        }
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        console.log("Message sent:", message);
        sendNewMsg(message);
        setMessages([...messages, { chatText: message, fromUserId: userId, align: 'right', sentAt: new Date().toLocaleString() }]);
        setMessage("");
    };

    const handleChatTextClick = (sentAt) => {
        setShowSentAt(showSentAt === sentAt ? null : sentAt); // Toggle show/hide sentAt
    };

    const sendNewMsg = async (newChat) => {
        const token = localStorage.getItem("jwtToken");
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post(`${API_URL}/chat/addChat?toUserId=${selectedFollower.id}&chatText=${newChat}`, {}, options);
            console.log('Request URL:', response.config.url); 
            console.log(response.data);
        } catch (error) {
            throw error;
        }
    };
    
    const ChatWindowStyle = {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#fff',
        borderLeft: '1px solid #e3e3e3',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflowY: 'auto'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const inputContainerStyle = {
        display: 'flex',
        // // alignItems: 'right',
        // position: 'fixed',
        // bottom: 0,
        // width: '72vh',
        // //  left: 0, 
        //  right: 0, 
         backgroundColor: '#fff',
        //   padding: '10px',
        //   borderTop: '1px'
        position: 'fixed',
        width: '33%',
        //   height: '200px',
        right: '0%',
        bottom: '0%',
        marginLeft: '-300px', /*half the width*/
          
    };

    return (
        <div className="chat-window" style={{ ...ChatWindowStyle, backgroundColor: '#f8f9fa' }}>
            <div className="chat-header" style={headerStyle}>
                <h3>{selectedFollower.firstName} {selectedFollower.lastName}</h3>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
            <hr></hr>
            <div className="chat-messages">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <div className="p-3 mb-2 bg-info text-white"
                                style={{
                                    textAlign: msg.align,
                                    borderRadius: '10px',
                                    marginLeft: msg.align === 'left' ? '10px' : 'auto',
                                    marginRight: msg.align === 'right' ? '10px' : 'auto',
                                    maxWidth: '70%', // Limit maximum width of chat message
                                }}
                                onClick={() => handleChatTextClick(msg.sentAt)}>
                                {msg.chatText}
                            </div>
                            {showSentAt === msg.sentAt && (
                                <div className="sent-at" style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
                                    {msg.sentAt}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div style={{ minHeight: '50px' }}></div>
                )}
            </div><br></br><br></br>
            <hr></hr>
            <div className="chat-input" style={inputContainerStyle}>
                <input
                    type="text"
                    className="form control flex-grow-1 mr-2"
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