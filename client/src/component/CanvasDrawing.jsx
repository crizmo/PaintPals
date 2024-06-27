import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Brush, Delete, Save, CloudDownload } from '@mui/icons-material';
import io from 'socket.io-client';
import '../App.css';
import Board from './Board';

const CanvasDrawing = () => {
  const { roomName, userName } = useParams();
  console.log('roomName:', roomName, 'userName:', userName);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('brush');
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  const clearCanvas = () => {
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Emit clear drawing event to server
    if (socket) {
      socket.emit('clearDrawing', roomName);
    }
  };

  const tools = [
    { name: 'Brush', icon: <Brush />, action: () => setTool('brush') },
    { name: 'Eraser', icon: <Delete />, action: () => setTool('eraser') },
  ];

  const saveDrawing = () => {
    if (socket) {
      socket.emit('saveDrawing', roomName);
    }
  };

  const loadDrawing = () => {
    if (socket) {
      socket.emit('loadDrawing', roomName);
    }
  };

  const downloadDrawing = () => {
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    // Save the current canvas state before setting the background
    const savedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Clear canvas and set background to white
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Restore saved image data (drawing) with transparent background
    ctx.putImageData(savedImage, 0, 0);

    // Create a link element to download the image
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');

    // Trigger the download
    link.click();
  };

  useEffect(() => {
    const newSocket = io('https://co-draw.onrender.com');
    setSocket(newSocket);

    let mainname = userName;
    if (!/^[a-zA-Z0-9]*$/.test(mainname)) {
      mainname = 'Anonymous';
    } else {
      mainname = mainname.substring(0, 10);
    }
    newSocket.emit('joinRoom', roomName, mainname);
    newSocket.emit('requestCanvasState', roomName);

    newSocket.on('usersUpdate', (users) => {
      setUsers(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomName]);

  useEffect(() => {
    if (socket) {
      socket.on('drawing', ({ x0, y0, x1, y1, color, size, tool }) => {
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
          }
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          ctx.closePath();
        }
      });

      socket.on('drawingSaved', (data) => {
        console.log('Drawing saved:', data);
      });

      socket.on('loadDrawing', (data) => {
        console.log('Loading drawing:', data);
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        data.forEach(({ x0, y0, x1, y1, color, size, tool }) => {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
          }
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          ctx.closePath();
        });
      });

      socket.on('clearDrawing', () => {
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }

    return () => {
      if (socket) {
        socket.off('drawing');
        socket.off('drawingSaved');
        socket.off('loadDrawing');
        socket.off('clearDrawing');
      }
    };
  }, [socket, roomName]);

  return (
    <div className="App">
      <div className="toolbar">
        <div className="tool-group">
          <span>Color:</span>
          <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
        </div>
        <div className="tool-group">
          <span>Size:</span>
          <input
            type="range"
            min="1"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
          <span>{brushSize}</span>
        </div>
        <div className="tool-group">
          {tools.map((toolItem, index) => (
            <button key={index} onClick={toolItem.action}>
              {toolItem.icon}
              {/* {toolItem.name} */}
            </button>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <h2>Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          
          }}>
            <div>
              <button onClick={saveDrawing}>
                <Save />
                <Typography>Save Drawing</Typography>
              </button>
            </div>
            <div>
              <button onClick={loadDrawing}>
                <CloudDownload />
                <Typography>Load Drawing</Typography>
              </button>
            </div>
            <div>
              <button onClick={clearCanvas}>
                <Delete />
                <Typography>Clear Canvas</Typography>
              </button>
            </div>
            <div>
              <button onClick={downloadDrawing}>
                <CloudDownload />
                <Typography>Download Drawing</Typography>
              </button>
            </div>
          </Box>
        </div>
        <div className="canvas-container">
          <Board
            roomName={roomName}
            brushColor={brushColor}
            brushSize={brushSize}
            tool={tool}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasDrawing;
