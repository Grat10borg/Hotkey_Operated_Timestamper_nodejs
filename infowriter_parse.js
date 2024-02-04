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

	// split up each line in raw times
	// and into a line and into an array
	textline = raw_timestamps.split("\n"); 

	// run through each line and test for data
	let isStream = true;
	let isTimestamp = false;
	let lastDate = "";

	// holds general data about timestamps
	let streamObj = {
		startdate: "",
		enddate: "",
		timestamps: [],
	}
	let recordObj = {
		startdate: "",
		enddate: "",
		timestamps: [],
	}
	// arrays which are cleared when 
	// end of stream/recording is detected.
	let streamArr = [];
	let recordArr = [];
	let streamSet = new Set(); 
	let recordSet = new Set();
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
	  if(textline[index].match(/EVENT:START\sRECORDING/)) {
		isStream = false;
			
		let res = textline[index].split("@");
		res = res[1].replace("\r", "").substring(1).replace(" ", "_"); 
		// remove space between @> <20/293

		// save starting date
		recordObj.startdate = res;
	  }
	  if(textline[index].match(/EVENT:START\sSTREAM/)){ 
		isStream = true;

		let res = textline[index].split("@");
		res = res[1].replace("\r", "").substring(1).replace(" ", "_"); 
		// remove space between @> <20/293

		// save starting date
		streamObj.startdate = res;
	  }
	  
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
		  if(streamSet.has(textline) != true) {
		   streamArr.push(sortTimestamp(textline[index], config, 
					isTimestamp, sceneName));
		   streamSet.add(sortTimestamp(textline[index], config, 
			isTimestamp, sceneName)); // add specific timestamp to set
		  }
		}
	  }
	  else {
		// else it's a recording
		// if it's digit:digit,digit:digit,digit
		let digitTest = textline[index].split(" ");
		if(digitTest[0].match(/\d:\d\d:\d\d/)) {
			// sorts timestamps between scenes & timestamps
			if(recordSet.has(textline)) {
	      	 recordArr.push(sortTimestamp(textline[index], config, 
					isTimestamp, sceneName));
			 recordSet.add(sortTimestamp(textline, config, 
			  isTimestamp, sceneName));
			}	
		}
	  }
	
	  // if we detect it's end of recording/stream do this
	  if(textline[index].match(/EVENT:STOP\sSTREAM/)) {
			/*saves ending date of the stream*/
			let res = textline[index].split("@");
			res = res[1].replace("\r", 
			"").substring(1).replace(" ", "_").split(" "); 
			// remove space between @> <20/293

			// save ending date
			streamObj.enddate = res[0];
			if(streamArr.length >= 3) {
			  // shorten or don't shorten timestamps
			  if(config.turn_off_timestamp_shortener) 
			    streamArr.unshift(config.starting_dot+" 0:00:00 "
				  +config.starting_screen_name)
			  else
			    streamArr.unshift(config.starting_dot+" 0:00 "
				  +config.starting_screen_name)
			
			 // NOTE: arrays of objects put a refercence
			 //to / not a value
			 // of the object, so we need to create a 
		         // basic throw away obj to use in the push
			 let obj = {};
			 /**
			 * put array of stream timestamps into
			 * object with start date & end date
			 */
			  streamObj.timestamps = streamArr;
			  
			  // put all values from streamobj into new obj
		          Object.assign(obj, streamObj);
			  
			  // save
			  timestamps.streams.push(obj);
			  streamArr = []; // clear
			  streamSet.clear();
	}
	else if(textline[index].match(/EVENT:STOP\sRECORDING/)) {
			/*Saving ending date of the recording*/
			let res = textline[index].split("@");
			res = res[1].replace("\r", 
			"").substring(1).replace(" ", "_").split(" "); 
			// remove space between @> <20/293

			// save ending date
			recordObj.enddate = res[0];

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

			 let obj = {};
			 /**
			 * put array of stream timestamps into
			 * object with start date & end date
			 */
			 Object.assign(obj, recordObj);

			  recordObj.timestamps = recordArr;
			  timestamps.recordings.push(obj);
			  recordArr = [];
			  recordSet.clear();
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
  	// input: 0:07:28 Stream Time Marker OR 0:07:28
  	// outputs: 7:28 (a perfect format timestamp)
  	let res = timestamp.split(" "); // *8:07:28*, Stream, Time, Marker
  	let DigitA = res[0].split(":"); // *8*, *07*, *28*
  	if (DigitA[0] == "0") {
    	// 8:07:28
    	if (DigitA[1].match(/0\d/i)) {
      	// 20:00
      	if (DigitA[1].match(/00/i)) {
        	DigitA[1] = DigitA[1].replace("00", "0");
        	return DigitA[1] + ":" + DigitA[2]; // 20:00
      	}
      	DigitA[1] = DigitA[1].replace("0", "");
      	return DigitA[1] + ":" + DigitA[2]; // 20:00
    } 
	else 
	{
      	return DigitA[1] + ":" + DigitA[2];
    }
  	} 
	else { return res[0];}
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
