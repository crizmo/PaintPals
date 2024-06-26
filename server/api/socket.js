const { Server } = require('socket.io');

const ioHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Replace with your front-end URL
            methods: ["GET", "POST"]
        }
    });

    const rooms = {}; // Store the canvas state for each room

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            console.log(`User joined room: ${roomName}`);
            
            // Send the current canvas state to the newly joined user
            if (rooms[roomName]) {
                const canvasState = rooms[roomName];
                canvasState.forEach(drawingData => {
                    socket.emit('drawing', drawingData);
                });
            }
        });

        socket.on('drawing', (data) => {
            const { roomName, ...drawingData } = data;
            socket.to(roomName).emit('drawing', drawingData);

            // Save the drawing data for the room
            if (!rooms[roomName]) {
                rooms[roomName] = [];
            }
            rooms[roomName].push(drawingData);
        });

        socket.on('canvasImage', (data) => {
            io.to(data.roomName).emit('canvasImage', data);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

module.exports = ioHandler;
