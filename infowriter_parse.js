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
exports.parseTimestamps = function (raw_timestamps, config) {
	//console.log("infowriter");	
	let timestamps = {
		streams: [],
		recordings: [],
	}
	let streams = {
		start: "bleppy",
		timestamps: [],
		end: "steppy",
	}
	timestamps.streams.push(streams);
	// split up each line in raw times
	// and into a line and into an array
	textline = raw_timestamps.split("\n"); 

	// run through each line and test for data
	let isStream = true;
	let isTimestamp = false;
	// arrays which are cleared when 
	// end of stream/recording is detected.
	//let streamObj = {
	//	startdate: "",
	//	enddate: "",
	//	timestamps: [],
	//}
	let streamArr = [];
	let recordArr = [];
	let sceneName = ""; // holds most recent scene name

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
	  
			// test if next timestamp is a EVENT:SCENE or HOTKEY
	  if(textline[index].match(/EVENT:SCENE/)){
			// save that next timestamp is a scene
		isTimestamp = false;	
		  // ..SCENE CHANGED >TO< Playing @..
		let res = textline[index].split("TO");
		  // Playing >@<
		let res2 = res[1].split("@");
		
		// remove spaces from name
		sceneName = res2[0].trim();
	  }
	  if(textline[index].match(/HOTKEY/))
		isTimestamp = true;

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
		// if it's digit:digit,digit:digit,digit
		let digitTest = textline[index].split(" ");
		if(digitTest[0].match(/\d:\d\d:\d\d/)) {
		  streamArr.push(sortTimestamp(textline[index], config, 
			  							isTimestamp, sceneName));
		}
	  }
	  else {
		// else it's a recording
		// if it's digit:digit,digit:digit,digit
		let digitTest = textline[index].split(" ");
		if(digitTest[0].match(/\d:\d\d:\d\d/)) {
			// sorts timestamps between scenes & timestamps
	      recordArr.push(sortTimestamp(textline[index], config, 
			  							isTimestamp, sceneName));
		}
	  }
	
	  // if we detect it's end of recording/stream do this
	  if(textline[index].match(/EVENT:STOP/)) {
		if(isStream) {
			if(streamArr.length >= 3) {
			  // shorten or don't shorten timestamps
			  if(config.turn_off_timestamp_shortener) 
			    streamArr.unshift(config.starting_dot+" 0:00:00 "
				  +config.starting_screen_name)
			  else
			    streamArr.unshift(config.starting_dot+" 0:00 "
				  +config.starting_screen_name)

			
			
			  // save 
				// note: make streamArr be an object with 
				// start date and end date too
			  timestamps.streams.push(streamArr);
			  streamArr = []; // clear
			}
			else streamArr = [];
		}
		else {
			if(recordArr.length >= 3) {
			  // push array of singular recording
			  // into holding array
			  // shorten or don't shorten timestamps
			  if(config.turn_off_timestamp_shortener) 
			    recordArr.unshift(config.starting_dot+" 0:00:00 "
				  +config.starting_screen_name)
			  else
			    recordArr.unshift(config.starting_dot+" 0:00 "
				  +config.starting_screen_name)

			  // save 
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

	/*
	 * trims timestamps into their shortest version.
	 * 0:00:00 == 0:00
	 */
	function trimTimestamp(timestamp) {
		return timestamp;
	}

	function sortTimestamp(textline, config, isTimestamp, sceneName) {
		// push all lines which are streams after fixing them a bit
		let digitTest = textline.split(" ");
			// once we know it's digits we're left 
			// with 0:04:39 like strings only
			if(config.turn_off_timestamp_shortener) {
				// makes timestamps be 0:00:00 instead of 0:00
			  if(isTimestamp) 
				streamArr.push(config.hotkey_dot+" "+ 
					digittest[0] +" timestamp"); 
			  // make easy timestamp namer at some point
			  else {
				streamArr.push(config.scene_dot+" "+ digittest[0]+
					" "+sceneName);
			  }
			}
			else {
			  if(isTimestamp) 
				return config.hotkey_dot+" "+ 
					trimTimestamp(digitTest[0])+" timestamp"; 
			  // make easy timestamp namer at some point
			  else {
			   return config.scene_dot+" "+ 
					trimTimestamp(digitTest[0])+
					" "+sceneName;
			  }
		} 
	}

	return timestamps; 
}; 
