const { Server } = require('socket.io');
const { createServer } = require('http');

const handler = (req, res) => {
  res.writeHead(200);
  res.end('Socket server is running');
};

const server = createServer(handler);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
  });

  socket.on('drawing', (data) => {
    socket.to(data.roomName).emit('drawing', data);
  });

  socket.on('canvasImage', (data) => {
    io.to(data.roomName).emit('canvasImage', data);
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = (req, res) => {
  server.emit('request', req, res);
};
