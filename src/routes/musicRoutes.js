const url = require('url');
const musicController = require('../controllers/musicController');

const musicRouter = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.pathname.split('/')[2];

  if (req.method === 'GET' && parsedUrl.pathname === '/musics') {
    musicController.getAllMusics(req, res);
  } else if (req.method === 'GET' && id) {
    musicController.getMusic(req, res, id);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/musics') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => musicController.createMusic(req, res, body));
  } else if (req.method === 'PUT' && id) {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => musicController.updateMusic(req, res, id, body));
  } else if (req.method === 'DELETE' && id) {
    musicController.deleteMusic(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
}

module.exports = musicRouter;
