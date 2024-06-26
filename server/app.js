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
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;

app.listen(5000, () => {
    console.log('Server running on port 5000');
    });