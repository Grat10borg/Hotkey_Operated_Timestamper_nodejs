const fs = require('fs');

/*custom modules*/
const config = require('./config');
const infowrite = require('./infowriter_parse');

/**
* start getting timestamps from the user specified path
*/
let rawTimestamps = fs.readFileSync(
config.config.timestamp_path, 'utf8');
let timestampInfo = infowrite.returnStampInfo(rawTimestamps);

// draw hot logo
DrawHOTLogo(); // on pause
	
// draw table with timestamps data
console.table([{
  "streams": timestampInfo.streamCount,
  "recordings": timestampInfo.recordCount,
  "timestamps": timestampInfo.hotkeyPresses}]);

console.log(`\x1b[36m`, "..."); // spacer

exportAllTimestamps();

function exportAllTimestamps() {
	let timestamps = infowrite.parseTimestamps(rawTimestamps, config.config);	
	
	//console.log(timestamps.streams);
	for(index = 0; index < timestamps.streams.length; index++) {
		let currentStream = timestamps.streams[index];	
		//console.log(currentStream);
	
		console.log(currentStream.timestamps);
		let streamtxt = currentStream.timestamps.join("\r");	
		
		console.log(streamtxt);

		let path = config.config.export_to+
			"steam_"+
			currentStream.startdate+
			"_to_"
			+currentStream.enddate;

		console.log(path);

		fs.appendFile(
			path,
			streamtxt, function(err){
			if(err) console(err);
			console.log("saved");
		});
	}
}


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

