const fs = require('fs');

/*custom modules*/
const config = require('./config');
const infowrite = require('./infowriter_parse');
//const exp = require('constants');

/**
* start getting timestamps from the user specified path
*/
let rawTimestamps = fs.readFileSync(
config.config.timestamp_path, 'utf8');
//exportAllTimestamps();

exports.exportAllTimestamps = exportAllTimestamps();

function exportAllTimestamps() {
	console.log("Timestamps exported, thanks for using H.O.T");
	let timestamps = infowrite.parseTimestamps(rawTimestamps, config.config);	
		
        //console.log(timestamps);
	for(index = 0; index < timestamps.streams.length; index++) {

		// setup
		let currentStream = timestamps.streams[index];	
		let streamtxt = currentStream.timestamps.join("\r");	
	
		let start_date;
		let end_date;
		if(config.config.turn_off_timestamp_extended_date == true) 
		{
			let res = currentStream.startdate.split("_");	
			start_date = res[0];
			res = currentStream.enddate.split("_");
			end_date = res[0];
		}
		else {
			start_date = currentStream.startdate;
			end_date = currentStream.enddate;
		}

		// printing timestamps
		if(config.config.turn_off_timestamp_only == true)
		// if we're making desciptions and not only timestamps
		{
			// loop through differing languages
			for(i=0; i < config.config.descs.length; i++){
			let desc_language = config.config.descs[i];

			let path = config.config.export_to+
			desc_language.print_out_code+
			start_date+
			"_to_"
			+end_date;

			let beforeDesc = fs.readFileSync(
			desc_language.before_path, 'utf8');

			let afterDesc = fs.readFileSync(
			desc_language.after_path, 'utf8');

			// add beforeDesc & afterDesc 
			// for this speficic languages
			streamtxt = beforeDesc+"\n"+streamtxt+
				    "\n"+afterDesc
			
			// print out [tag]'ed timestamp files
			fs.appendFile(path,
			streamtxt, function(err){
			if(err) console(err);});
			}
		}
		else {

		let path = config.config.export_to+
			"[Timestamp]_"+
			start_date+
			"_to_"
			+end_date;

		fs.appendFile(
			path,
			streamtxt, function(err){
			if(err) console(err);
		});
		}	
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

