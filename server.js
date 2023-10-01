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
  console.log(req);
  if(req.url === 'website/style.css') {
  	fs.readFile("website/style.css", function(err, css){
	  	// write head is two functions res.status code & content type
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(css);
		res.end();
 	 });

  }
  else {
  	fs.readFile("website/index.html", function(err, html){
	  	// write head is two functions res.status code & content type
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(html);
		res.end();
 	 });
 	 }


 /**
 * send raw timestamps to timestamp parsing module
 */
  //let parsedTimestamps = infowrite.parseTimestamps(rawTimestamps, config.config); 
  //console.log(parsedTimestamps);

 /**
 * build the page the timestamps are displayed on
 */
  //res.write(parsedTimestamps);

  //res.write("Infowriter: " + infowrite.parseTimestamps("Timestampy!"));
  //res.end('<p>activate <strong>gamer mode</strong>... have a nice day :3</p>');
  //console.log(infowrite.parseTimestamps());
});


server.listen(port, hostname, () => {
   // draw hot logo
   DrawHOTLogo(); // on pause
	
   // draw table with timestamps data
   console.table([{
	   "streams": timestampInfo.streamCount,
	   "recordings": timestampInfo.recordCount,
	   "timestamps": timestampInfo.hotkeyPresses}]);
   console.log(`\x1b[36m`, "..."); // spacer

   // write that H.O.T is running on the server
   console.log(`\x1b[36m`, `H.O.T is now running on [`,
	   `\x1b[0m`,`http://${hostname}:${port}/`,`\x1b[36m`,`]`);
});

/*
 * draws the H.O.T logo with console logs
 */
function DrawHOTLogo() {
	// underscore for some reason, makes it not create problems!
	
	console.log(`\x1b[36m`, "┌──────────────────────┐", `\x1b[0m`);
	console.log(`\x1b[35m`, "├──────────────────────┤",`\x1b[0m`);
	console.log(`\x1b[37m`, "├──────────────────────┤",`\x1b[0m`);
	console.log(`\x1b[35m`, "├──────────────────────┤",`\x1b[0m`);
	console.log(`\x1b[36m`, "└──────────────────────┘",`\x1b[0m`);

	//console.log(`\x1b[36`, "_█▒▒░▒░░░░░▒░▒▒█");
	//console.log(`\x1b[36`, "_▒█▓▓▓▓▓▓▓▓▓▓▓█▒");
	//console.log(`\x1b[36`, "_▒▓░░░░░░░░░░░▓▒");
	//console.log(`\x1b[36`, "_▒▓░░░░░░░░░░░▓▒");
	//console.log(`\x1b[36`, "_▒▓░█░░░░░░░█░▓▒");
	//console.log(`\x1b[36`, "_▒▓░░█░░░░░█░░▓▒");
	//console.log(`\x1b[36`, "_▒▓░░█▓▓▓▓▓█░░▓▒");
	//console.log(`\x1b[36`, "_▒▓░▓█▓▓█▓▓█▓░▓▒");
	//console.log(`\x1b[36`, "_▒▓░░░░░░░░░░░▓▒");
	//console.log(`\x1b[36`, "_▒▓░░░░█░█░░░░▓▒");
	//console.log(`\x1b[36`, "_▒▓░░░░░█░░░░░▓▒");
	//console.log(`\x1b[36`, "_▒▓░░░░░░░░░░░▓▒");
	//console.log(`\x1b[36`, "_▒▓▓░░░░░░░░░▓▓▒");
	//console.log(`\x1b[36`, "_▒█▓▓▓▓▓▓▓▓▓▓▓█▒");
	//console.log(`\x1b[36`, "_▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒");
	//console.log(`\x1b[36`, "_▒▒██▒█▒█▒█▒██▒▒");
	//console.log(`\x1b[36`, "_█▒▒▒▒▒▒▒▒▒▒▒▒▒█");

}

