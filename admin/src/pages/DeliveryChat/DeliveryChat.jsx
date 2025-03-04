import React, { useState, useEffect } from 'react';
import './DeliveryChat.css';

const DeliveryChat = ({ userRole }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Simulate real-time messaging using localStorage
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('deliveryChatMessages')) || [];
    setMessages(storedMessages);
  }, []);

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: userRole, // 'admin' or 'delivery'
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('deliveryChatMessages', JSON.stringify(updatedMessages)); // Save messages to localStorage
    setNewMessage(''); // Clear the input field
  };

  return (
    <div className="delivery-chat">
      <h2>Delivery Chat</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === userRole ? 'self' : 'other'}`}>
            <strong>{msg.sender}:</strong> {msg.text} <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DeliveryChat;