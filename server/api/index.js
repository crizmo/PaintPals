const http = require('http');
const { Server } = require('socket.io');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // A basic response for any HTTP requests, useful for health checks
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Socket.IO server is running');
});

// Initialize Socket.IO with the HTTP server and configure CORS
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust the origin as per your frontend's URL
        methods: ["GET", "POST"]
    }
});

// Socket.IO server event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomName) => {
        console.log(`A user joined room: ${roomName}`);
        socket.join(roomName);
    });

    socket.on('drawing', (data) => {
        console.log(`Broadcasting drawing action in room: ${data.roomName}`);
        socket.to(data.roomName).emit('drawing', data);
    });

    socket.on('canvasImage', (data) => {
        console.log(`Broadcasting canvas image in room: ${data.roomName}`);
        io.to(data.roomName).emit('canvasImage', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Listen on a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

// Export the Socket.IO server for potential further use
module.exports = io;