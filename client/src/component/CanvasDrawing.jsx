// CanvasDrawing.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Board from './Board';

const CanvasDrawing = () => {
  const { roomName } = useParams();
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    console.log("CanvasDrawing ", brushSize);
  }, [brushSize]);

  return (
    <div className="App">
      <h1>Room: {roomName}</h1>
      <div>
        <Board roomName={roomName} brushColor={brushColor} brushSize={brushSize} />
        <div className='tools'>
          <div>
            <span>Color: </span>
            <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
          </div>
          <div>
            <span>Size: </span>
            <input
              type="range"
              min="1"
              max="100"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
            />
            <span>{brushSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasDrawing;
