/** @format */

import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Components/Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState();
  const [room, setRoom] = useState();
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <div className="join-container">
          <h3 className="join-title">Join Chat</h3>
          <input
            type="text"
            placeholder="Enter name.."
            className="join-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            className="join-input"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="join-button" onClick={joinRoom}>
            Join a Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default App;
