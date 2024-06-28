// App.jsx

import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import HashRouter
import './App.css';
import RoomSetup from './pages/RoomSetup';
import CanvasDrawing from './pages/CanvasDrawing';

const App = () => {

  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RoomSetup name={name} setName={setName} roomName={roomName} setRoomName={setRoomName} password={password} setPassword={setPassword} />} />
          <Route path="/room/:roomName/:userName" element={<CanvasDrawing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
