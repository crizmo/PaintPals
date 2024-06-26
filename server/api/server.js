// api/server.js
const app = require('../app'); // Adjust the path as per your project structure
const server = require('http').createServer(app);

module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server is running');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};

server.listen(5000, () => {
    console.log('Server running on port 5000');
    }
    );