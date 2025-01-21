const http = require('http');
const musicRouter = require('./routes/musicRoutes');
const PORT = 3000;

const server = http.createServer((req, res) => {
  musicRouter(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
