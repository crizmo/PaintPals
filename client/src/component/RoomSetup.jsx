// RoomSetup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomSetup = () => {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    // Validate inputs (e.g., check if name and roomName are not empty)

    // Navigate to the room with roomName as part of the URL
    navigate(`/room/${roomName}?name=${name}`);
  };

  return (
    <div>
      <h2>Join or Create a Room</h2>
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      <input type="password" placeholder="Room Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default RoomSetup;
