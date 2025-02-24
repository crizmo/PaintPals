import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import TopBar from '../component/TopBar';
import ToolBar from '../component/ToolBar';
import Board from '../component/Board';
import '../App.css';

import {
  Brush,
  GradientOutlined as Eraser,
  Undo,
  LinearScaleOutlined as Line,
  RectangleOutlined as Rectangle,
  CircleOutlined as Circle,
} from '@mui/icons-material';

const CanvasDrawing = () => {
  const { roomName, userName } = useParams();
  console.log('roomName:', roomName, 'userName:', userName);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('brush');
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
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
  }, [roomName, userName]);

  useEffect(() => {
    if (socket) {
      socket.on('drawing', ({ x0, y0, x1, y1, color, size, tool }) => {
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = size;

          if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
          }

          if (tool === 'brush' || tool === 'eraser') {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();
          } else if (tool === 'line') {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();
          } else if (tool === 'rectangle') {
            const width = x1 - x0;
            const height = y1 - y0;
            ctx.strokeRect(x0, y0, width, height);
          } else if (tool === 'circle') {
            const radius = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
            ctx.beginPath();
            ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
          }
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
          ctx.lineWidth = size;

          if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
          }

          if (tool === 'brush' || tool === 'eraser') {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();
          } else if (tool === 'line') {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();
          } else if (tool === 'rectangle') {
            const width = x1 - x0;
            const height = y1 - y0;
            ctx.strokeRect(x0, y0, width, height);
          } else if (tool === 'circle') {
            const radius = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
            ctx.beginPath();
            ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
          }
        });
      });

      socket.on('clearDrawing', () => {
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });

      socket.on('clearSavedDrawing', () => {
        console.log('Clearing saved drawing');

        // Clear the saved drawing state
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });

      socket.on('undoDrawing', (data) => {
        console.log('Undo drawing:', data);
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        data.forEach(({ x0, y0, x1, y1, color, size, tool }) => {
          console.log('Drawing color:', color);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = size;

          if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
          } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
          }

          if (tool === 'brush' || tool === 'eraser') {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();
          } else if (tool === 'line') {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            ctx.closePath();
          } else if (tool === 'rectangle') {
            const width = x1 - x0;
            const height = y1 - y0;
            ctx.strokeRect(x0, y0, width, height);
          } else if (tool === 'circle') {
            const radius = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
            ctx.beginPath();
            ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
          }
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('drawing');
        socket.off('drawingSaved');
        socket.off('loadDrawing');
        socket.off('clearDrawing');
        socket.off('clearSavedDrawing');
        socket.off('undoDrawing');
      }
    };
  }, [socket, roomName]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (tool === 'brush' || tool === 'eraser') {
        setBrushSize((prevSize) => {
          const newSize = prevSize + (e.deltaY > 0 ? -1 : 1);
          return Math.max(1, Math.min(newSize, 100));
        });
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [tool]);

  const undoDrawing = () => {
    if (socket) {
      socket.emit('undoDrawing', roomName);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('imageImported', ({ imageUrl }) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.onload = () => {
          const canvas = document.querySelector('.canvas');
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.onerror = (e) => {
          alert('Failed to load image. Please check the URL and try again.');
          console.error(e);
        };
      });
    }

    return () => {
      if (socket) {
        socket.off('imageImported');
      }
    };
  }, [socket]);

  const importImage = () => {
    const imageUrl = prompt('Please enter the image URL:');
    if (imageUrl) {
      if (socket) {
        socket.emit('importImage', { roomName, imageUrl });
      }
    }
  };


  return (
    <div className="App">
      <TopBar
        saveDrawing={() => saveDrawing(socket, roomName)}
        loadDrawing={() => loadDrawing(socket, roomName)}
        clearSavedDrawing={() => clearSavedDrawing(socket, roomName)}
        clearCanvas={() => clearCanvas(socket, roomName)}
        downloadDrawing={downloadDrawing}
        users={users}
        importImage={importImage}
      />
      <ToolBar
        tools={tools}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        setTool={setTool}
        undoDrawing={undoDrawing}

        userName={userName}
      />
      <div className="main-content">
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

const tools = [
  { name: 'Brush', icon: <Brush sx={{ fontSize: 20 }} />, action: 'brush' },
  { name: 'Eraser', icon: <Eraser sx={{ fontSize: 20 }} />, action: 'eraser' },
  { name: 'Undo', icon: <Undo sx={{ fontSize: 20 }} />, action: 'undo' },
  { name: 'Line', icon: <Line sx={{ fontSize: 20 }} />, action: 'line' },
  { name: 'Rectangle', icon: <Rectangle sx={{ fontSize: 20 }} />, action: 'rectangle' },
  { name: 'Circle', icon: <Circle sx={{ fontSize: 20 }} />, action: 'circle' },
];

const saveDrawing = (socket, roomName) => {
  if (socket) {
    socket.emit('saveDrawing', roomName);
  }
};

const loadDrawing = (socket, roomName) => {
  if (socket) {
    socket.emit('loadDrawing', roomName);
  }
};

const clearSavedDrawing = (socket, roomName) => {
  if (socket) {
    socket.emit('clearSavedDrawing', roomName);
  }
};

const clearCanvas = (socket, roomName) => {
  const canvas = document.querySelector('.canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Emit clear drawing event to server
  if (socket) {
    socket.emit('clearDrawing', roomName);
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
