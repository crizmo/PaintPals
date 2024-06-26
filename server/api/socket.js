const { Server } = require('socket.io');

const ioHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Replace with your front-end URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            console.log(`User joined room: ${roomName}`);
        });

        socket.on('drawing', (data) => {
            console.log(`Received drawing event in room ${data.roomName}`);
            socket.to(data.roomName).emit('drawing', data);
        });

        socket.on('canvasImage', (data) => {
            console.log(`Received canvasImage event in room ${data.roomName}`);
            io.to(data.roomName).emit('canvasImage', data);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

module.exports = ioHandler;