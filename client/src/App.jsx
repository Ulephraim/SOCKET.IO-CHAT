/** @format */

import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState();
  const [room, setRoom] = useState();

  const joinRoom = () => {
    if (username != '' && room != '') {
      socket.emit('join_room', room);
    }
  };

  return (
    <>
      Hello Socket.IO
      <h3>Join Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join a Room</button>
    </>
  );
}

export default App;
