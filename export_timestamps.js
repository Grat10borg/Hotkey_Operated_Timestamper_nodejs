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

// control if there is folders in current dir
if(!fs.existsSync(config.config.export_to)){
	// create exporting folder if its not there
	fs.mkdir(config.config.export_to); // untested..
}
if(!fs.existsSync(config.config.export_to+"timestamps"))
	fs.mkdir(config.config.export_to+"timestamps");

// make sure theres folders for languages in config file..
for(index = 0; index < config.config.descs.length; index++) {
	let path = config.config.export_to+
		config.config.descs[index].print_out_code;
	if(!fs.existsSync(path)){
		fs.mkdir(path);	
	}
}



exports.exportAllTimestamps = function() {
	let timestamps = infowrite.parseTimestamps(rawTimestamps, config.config);	
    // for looping and exporting all timestamps
	// into folders named after lang code..
	for(index = 0; index < timestamps.streams.length; index++) {

		// setup
		let currentStream = timestamps.streams[index];	
		let streamtxt = currentStream.timestamps.join("\r");	
	
		let start_date;
		let end_date;

		/* export newest timestamps to root folder*/
		if((index+1) == timestamps.streams.length){
			// loop through differing languages
			for(i=0; i < config.config.descs.length; i++){
			let desc_language = config.config.descs[i];

			let path = 
			config.config.export_to+
			"["+desc_language.print_out_code+"] "
			+"Newest timestamps";

			let beforeDesc = fs.readFileSync(
			desc_language.before_path, 'utf8');

			let afterDesc = fs.readFileSync(
			desc_language.after_path, 'utf8');

			// add beforeDesc & afterDesc 
			// for this speficic languages
			streamtxt = beforeDesc+"\n"+streamtxt+
				    "\n"+afterDesc
			
			// print out [tag]'ed timestamp files
			fs.writeFile(path,
			streamtxt, function(err){
			if(err) console.error(err);});
			}
		}


		// if we want to have extended dates on the exported file names.
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

				
			let path = 
			config.config.export_to+
			desc_language.print_out_code+"/"+
			"["+desc_language.print_out_code+"]_"+
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
			fs.writeFile(path,
			streamtxt, function(err){
			if(err) console.error(err);});
			}
		}
		else {

		let path = config.config.export_to+"timestamps/"+
			"[Timestamp]_"+
			start_date+
			"_to_"
			+end_date;

		fs.writeFile(
			path,
			streamtxt, function(err){
			if(err) console.log(err);
		});
		}	
	}
	console.log("...");
	console.log("all timestamps exported, thanks for using H.O.T");
}

exports.exportTimestampsOnly = function() {
	let timestamps = infowrite.parseTimestamps(rawTimestamps, 
		config.config);	

	for(index = 0; index < timestamps.streams.length; index++) {
			
	// setup
	let currentStream = timestamps.streams[index];	
	let streamtxt = currentStream.timestamps.join("\r");	
			
	let start_date;
	let end_date;

	// if we want to have extended dates on the exported file names.
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

		let path = config.config.export_to+"timestamps/"+
			"[Timestamp]_"+
			start_date+
			"_to_"
			+end_date;

		fs.writeFile(
			path,
			streamtxt, function(err){
			if(err) console.log(err);
		});
	}
	console.log("only timestamps exported, thanks for using H.O.T");
}

