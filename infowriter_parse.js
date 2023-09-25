

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
exports.parseTimestamps = function (timestamps) {
	//console.log("infowriter");	
	let streams = timestamps.match(/EVENT:START*EVENT:STOP/);

	console.log(streams);

	return streams;
}; 
