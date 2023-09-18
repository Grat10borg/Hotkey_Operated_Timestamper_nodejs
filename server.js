const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<p>activate <strong>gamer mode</strong>... have a nice day :3</p>');
});

server.listen(port, hostname, () => {
  console.log(`H.O.T is now running on [ http://${hostname}:${port}/ ]`);
});

