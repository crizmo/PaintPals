import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import TopBar from '../component/TopBar';
import ToolBar from '../component/ToolBar';
import SideBar from '../component/SideBar';
import Board from '../component/Board';
import '../App.css';

import {
  Brush,
  Delete,
  Save,
  CloudDownload,
  CachedOutlined as Clear,
  GradientOutlined as Eraser,
  FormatColorFill as Fill,
  Colorize,
  TextFields,
  ZoomIn,
  Undo // Add Undo icon from MUI
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

  return (
    <div className="App">
      <TopBar
        saveDrawing={() => saveDrawing(socket, roomName)}
        loadDrawing={() => loadDrawing(socket, roomName)}
        clearSavedDrawing={() => clearSavedDrawing(socket, roomName)}
        clearCanvas={() => clearCanvas(socket, roomName)}
        downloadDrawing={downloadDrawing}
        users={users}
      />
      <ToolBar
        tools={tools}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        setTool={setTool}
      />
      <div className="main-content">
        <SideBar 
          users={users}
          tools={tools}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          brushColor={brushColor}
          setBrushColor={setBrushColor}
          setTool={setTool}

          undoDrawing={undoDrawing}
        />
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
  { name: 'Fill', icon: <Fill sx={{ fontSize: 20 }} />, action: 'fill' },
  { name: 'Color Picker', icon: <Colorize sx={{ fontSize: 20 }} />, action: 'color-picker' },
  { name: 'Text', icon: <TextFields sx={{ fontSize: 20 }} />, action: 'text' },
  { name: 'Zoom', icon: <ZoomIn sx={{ fontSize: 20 }} />, action: 'zoom' },
  { name: 'Undo', icon: <Undo sx={{ fontSize: 20 }} />, action: 'undo' }, // Add Undo tool
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
