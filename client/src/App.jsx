// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RoomSetup from './component/RoomSetup';
import CanvasDrawing from './component/CanvasDrawing';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RoomSetup />} />
          <Route path="/room/:roomName" element={<CanvasDrawing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
