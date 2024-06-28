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
    const users = {}; // Store users in each room

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinRoom', (roomName, userName) => {
            socket.join(roomName);
            socket.username = userName;

            // Add user to the room
            if (!users[roomName]) {
                users[roomName] = [];
            }
            users[roomName].push(userName);
            console.log(users[roomName]);

            // Notify all users in the room about the updated user list
            io.to(roomName).emit('usersUpdate', users[roomName]);

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
                console.log("saving drawing in room: ", roomName);
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

        // to clear saved drawing
        socket.on('clearSavedDrawing', (roomName) => {
            // Clear the saved drawing state
            if (savedDrawings[roomName]) {
                savedDrawings[roomName] = [];
                delete savedDrawings[roomName];
                io.to(roomName).emit('clearSavedDrawing');
            }
        });

        socket.on('clearDrawing', (roomName) => {
            // Clear the current drawing state
            if (rooms[roomName]) {
                rooms[roomName] = [];
                io.to(roomName).emit('clearDrawing');
            }
            console.log("clearing drawing in room: ", roomName);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');

            // Remove user from all rooms and update user lists
            Object.keys(users).forEach(roomName => {
                if (users[roomName].includes(socket.username)) {
                    users[roomName] = users[roomName].filter(user => user !== socket.username);
                    io.to(roomName).emit('usersUpdate', users[roomName]);
                }
            });
        });
    });
};

module.exports = ioHandler;
