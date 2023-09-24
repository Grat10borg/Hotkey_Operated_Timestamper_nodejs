const http = require('http');
var infowrite = require('./infowriter_parse');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write("Infowriter: " + infowrite.parseTimestamps("Timestampy!"));
  res.end('<p>activate <strong>gamer mode</strong>... have a nice day :3</p>');
  //console.log(infowrite.parseTimestamps());
});

server.listen(port, hostname, () => {
  console.log(`H.O.T is now running on [ http://${hostname}:${port}/ ]`);
});

