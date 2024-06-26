const express = require('express');
const http = require('http');
const ioHandler = require('./api/socket');

const app = express();
const server = http.createServer(app);

// Socket.IO setup
ioHandler(server);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
