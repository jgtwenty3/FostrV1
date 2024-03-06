import React, { useState, useEffect } from "react";
import './App.css';


function Inbox() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch chats for the current user
    fetch("/chats")
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((error) => console.log("Error fetching chats:", error));
  }, []);

  useEffect(() => {
    // Fetch messages for the selected chat
    if (selectedChatId) {
      fetch(`/chat/${selectedChatId}/messages`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((error) => console.log("Error fetching messages:", error));
    }
  }, [selectedChatId]);

  const handleChatSelection = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`/chat/${selectedChatId}/send_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      });

      if (response.ok) {
        // Refresh messages after sending a new message
        fetch(`/chat/${selectedChatId}/messages`)
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((error) => console.log("Error fetching messages:", error));

        // Clear the new message input
        setNewMessage("");
      } else {
        console.error("Message sending failed");
      }
    } catch (error) {
      console.error("Error during message sending:", error);
    }
  };

  return (
    <div className="inbox">
      <h2>Inbox</h2>
      {/* <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelection(chat.id)}
            className={selectedChatId === chat.id ? "selected-chat" : ""}
          >
            {chat.otherUser} Messages
          </div>
        ))}
      </div> */}
      <div className="chat-messages">
        {selectedChatId && (
          <>
            <h3>Chat with {chats.find((chat) => chat.id === selectedChatId)?.otherUser}</h3>
            <div className="message-list">
              {messages.map((message) => (
                <div key={message.id}>
                  <strong>{message.sender}</strong>: {message.content}
                </div>
              ))}
            </div>
            <div className="new-message">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Inbox;
