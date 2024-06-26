
const { Server } = require('socket.io');
const io = new Server({
    cors: "http://localhost:5173/"
})
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

io.listen(5000);