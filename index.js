#! /usr/bin/env node

/* this isn't obvious with its name but this file handles commands
 * tutorial: 
 * https://blog.logrocket.com/creating-a-cli-tool-with-node-js/
 */
const config = require('./config');
const infowrite = require('./infowriter_parse');

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const exportstamp = require('./exports');

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



program.name("hot")
.description("H.O.T sorts Infowriter timestamps"+
" into youtube descriptions")
.version("0.1")

program.command('export')
  .description('exports all timestamps in your timestamp file')
  .action(exportstamp.exportAllTimestamps)


/*
 * draws the H.O.T logo with console logs
 */
function DrawHOTLogo() {
	// underscore for some reason, makes it not create problems!
	
	console.log(`\x1b[36m`, "┌──────────────────────┐",`\x1b[0m`);
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


program.parse()
