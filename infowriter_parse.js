

/*a simple function that skims the timestamps-
 * txt to get all general data about it*/
// Needs: A raw Infowriter timestamp string
exports.returnStampInfo = function(timestamps) {
	let textline = timestamps.split("\n");
	let data = {
		streamCount: 0,
		recordCount: 0,
		sceneCount: 0,
		hotkeyPresses: 0,
		lines: 0,
	}

	for(let index = 0; index < textline.length; index++) {
		data.lines++;
		if(textline[index].match(/EVENT:START\sSTREAM/)) 
		 	data.streamCount++;
		else if(textline[index].match(/EVENT:START\sRECORDING/))
			data.recordCount++;	
		else if(textline[index].match(/EVENT:SCENE\sCHANGED/))
			data.sceneCount++;
		else if (textline[index].match(/HOTKEY/))
			data.hotkeyPresses++;

	}
	return data;
}

/*
 * parses a Infowriter txt and spits out 
 * a youtube friendly timestamp list
 */
exports.parseTimestamps = function (raw_timestamps) {
	//console.log("infowriter");	
	let timestamps = {
		streams: [],
		recordings: [],
		streamstxt: [],
		reccordingstxt: [],
	}
	
	// split up each line in raw times
	// and into a line and into an array
	textline = raw_timestamps.split("\n"); 

	// run through each line and test for data
	let isStream = true;

	// arrays which are cleared when 
	// end of stream/recording is detected.
	let streamArr = [];
	let recordArr = [];

	/*
	 * This for runs through the raw timestamps file 
	 * and filters out data which cannot be used
	 * 
	 * it puts in data in timestamps.streams & timestamps.recordings
	 *
	 */
	for(index = 0; index < textline.length; index++) {
	
          // if it isn't a stream	
	  if(textline[index].match(/EVENT:START\sRECORDING/))
		isStream = false;
	  if(textline[index].match(/EVENT:START\sSTREAM/)) 
		isStream = true;
	  
	  // skip line IF
		// if it's only a enter
	  if(textline[index] == "\r")
		continue;
		// if it does not contain a timestamp
	  if(textline[index].match("0:00:00")) 
		continue;
		// if the timestamp is not useful
	  if(textline[index].match(/not\s(recording)/) ||
	     textline[index].match(/not\s(streaming)/))
		continue;


          // if isStream is true
	  if(isStream) {
		// push all lines which are streams 
		streamArr.push(textline[index]);
	  }
	  else {
		// else it's a recording
		recordArr.push(textline[index]);
	  }
	
	  // if we detect it's end of recording/stream do this
	  if(textline[index].match(/EVENT:STOP/)) {
		if(isStream) {
			if(streamArr.length >= 3) {
			  // save 
			  timestamps.streams.push(streamArr);
			  streamArr = []; // clear
			}
			else streamArr = [];
		}
		else {
			if(recordArr.length >= 3) {
			  // push array of singular recording
			  // into holding array
			  timestamps.recordings.push(recordArr);
			  recordArr = [];
			  // clear recording array for next run
			}
			// clear incase there is 
			// no acceptable timestamps.
			else recordArr = [];
		}
	  }

	}

	// don't sort timestamps if there are none
	if(timestamps.streams.length > 0) {

	}
	if(timestamps.recordings.length > 0) {

	}

	/*
	 * trims timestamp into its smallest size
	 */
	function trimTimestamp(timestamp) {
	
	}

	//let streams = timestamps.match(/EVENT:START*EVENT:STOP/);

	console.log(timestamps);

	return "blep"; 
}; 
