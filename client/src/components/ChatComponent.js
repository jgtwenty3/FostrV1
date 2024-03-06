import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5555');  
const ChatComponent = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', {
            senderId,
            receiverId,
            content: newMessage,
        });

        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>{`${message.sender}: ${message.content}`}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
