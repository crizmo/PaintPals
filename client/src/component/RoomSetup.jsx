// RoomSetup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomSetup = ({
  name,
  setName,
  roomName,
  setRoomName,
  password,
  setPassword,
}) => {

  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/room/${roomName}/${name}`);
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
