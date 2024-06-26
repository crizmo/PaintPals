// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RoomSetup from './component/RoomSetup';
import CanvasDrawing from './component/CanvasDrawing';

const App = () => {

  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RoomSetup name={name} setName={setName} roomName={roomName} setRoomName={setRoomName} password={password} setPassword={setPassword} />} />
          <Route path="/room/:roomName" element={<CanvasDrawing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
