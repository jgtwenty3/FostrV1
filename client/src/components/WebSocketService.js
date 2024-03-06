// WebSocketService.js

import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5555'); 

const useWebSocket = (onMessage) => {
  useEffect(() => {
    socket.on('message', onMessage);

    return () => {
      socket.disconnect();
    };
  }, [onMessage]);

  return socket;
};

export default useWebSocket;
