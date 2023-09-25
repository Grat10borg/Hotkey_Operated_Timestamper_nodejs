const http = require('http');
const fs = require('fs');

/*custom modules*/
const config = require('./config');
const infowrite = require('./infowriter_parse');

/*basic server things!*/
const hostname = '127.0.0.1';
const port = 3000;

/**
* start getting timestamps from the user specified path
*/
let rawTimestamps = fs.readFileSync(
config.config.timestamp_path, 'utf8');
let timestampInfo = infowrite.returnStampInfo(rawTimestamps);


/*start server*/
const server = http.createServer((req, res) => {
  res.statusCode = 200; // 200 == success
  res.setHeader('Content-Type', 'text/html');


 /**
 * send raw timestamps to timestamp parsing module
 */
  let parsedTimestamps = infowrite.parseTimestamps(rawTimestamps); 
  console.log(parsedTimestamps);

 /**
 * build the page the timestamps are displayed on
 */
  //res.write(parsedTimestamps);

  //res.write("Infowriter: " + infowrite.parseTimestamps("Timestampy!"));
  //res.end('<p>activate <strong>gamer mode</strong>... have a nice day :3</p>');
  //console.log(infowrite.parseTimestamps());
});

server.listen(port, hostname, () => {
  console.log(`H.O.T is now running on [ http://${hostname}:${port}/ ]`);
  console.log("found: "+ timestampInfo.streamCount + " steams");
});

