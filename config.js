// specifies the tag & gathering point for english timestamps
let english = {
	// !cannot contain any filepath illigal symbols!
	print_out_code: "eng", 
	before_path: "./description/beforeTimestamps.txt",
	after_path: "./description/afterTimestamps.txt",
};

let danish = {
	print_out_code: "dk",
	before_path: "./description/dkBTimestamps.txt",
	after_path: "./description/dkATimestamps.txt"
};

exports.config = {
	timestamp_path: "Timestamps.txt",
	
	// an array holding objects of differing languages.
	descs: [
		english,
		danish
	       ],
	export_to: "./exports/",

	// purely for personization
	hotkey_dot: "•",
	scene_dot: "•-•",
	starting_dot: "•--▸",
	starting_screen_name: "intro",

	// makess H.O.T also print the hours in timestamp.txt names
	turn_off_timestamp_extended_date: true,
	// stops H.O.T from making desciptions, outputs only timestamps
	turn_off_timestamp_only: true,
	// makes 0:00 into 0:00:00 
	turn_off_timestamp_shortener: false,
};
