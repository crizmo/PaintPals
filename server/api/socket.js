const { Server } = require('socket.io');

const ioHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Replace with your front-end URL or '*' for any
            methods: ["GET", "POST"]
        }
    });

    const rooms = {}; // Store the current canvas state for each room
    const savedDrawings = {}; // Store the last saved drawing for each room

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

            // Send the last saved drawing to the newly joined user
            if (savedDrawings[roomName]) {
                const savedDrawing = savedDrawings[roomName];
                socket.emit('loadDrawing', savedDrawing);
            }
        });

        socket.on('drawing', (data) => {
            const { roomName, ...drawingData } = data;
            socket.to(roomName).emit('drawing', drawingData);

            // Update the current drawing state for the room
            if (!rooms[roomName]) {
                rooms[roomName] = [];
            }
            rooms[roomName].push(drawingData);
        });

        socket.on('saveDrawing', (roomName) => {
            // Save the current drawing state to savedDrawings
            if (rooms[roomName]) {
                if (!savedDrawings[roomName]) {
                    savedDrawings[roomName] = [];
                }
                savedDrawings[roomName].push(...rooms[roomName]);
                io.to(roomName).emit('drawingSaved', savedDrawings[roomName]);
            }
        });

        socket.on('loadDrawing', (roomName) => {
            // Send the last saved drawing to the user
            if (savedDrawings[roomName]) {
                const savedDrawing = savedDrawings[roomName];
                socket.emit('loadDrawing', savedDrawing);
            } else {
                socket.emit('noSavedDrawing');
            }
        });

        socket.on('clearDrawing', (roomName) => {
            // Clear the current drawing state
            if (rooms[roomName]) {
                rooms[roomName] = [];
                io.to(roomName).emit('clearDrawing');
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

module.exports = ioHandler;
