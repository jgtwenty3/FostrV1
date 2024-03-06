// MessageForm.js

import React, { useState } from "react";

const MessageForm = ({ animalId, ownerUsername, onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function with the message and other necessary details
    onSubmit({
      animalId,
      ownerUsername,
      content: message,
    });
    setMessage("");
  };

  return (
    <div className="message-form-container">
      <form className="message-form" onSubmit={handleSubmit}>
        <textarea
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows="3"
          required
        />
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
