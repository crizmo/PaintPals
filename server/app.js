// const express = require('express');
// const http = require('http');
// const ioHandler = require('./api/socket');

// const app = express();
// const server = http.createServer(app);

// // Socket.IO setup
// ioHandler(server);

// //make a default endpoint
// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// app.js
const express = require("express"); 
const app = express(); 
app.get("/", (req, res) => { res.send("Express on Vercel"); });
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

module.exports = app;