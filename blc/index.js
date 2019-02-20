#!/usr/bin/env node

var fs = require('fs');
var alphabet = require('./alphabet.json')

if (process.argv.length <= 2) {
    console.log("Please use file");
    process.exit(-1);
}
 
var filePath = process.argv[2];
var newPath = filePath.substr(0,filePath.lastIndexOf('.')) + ".bl" + filePath.substr(filePath.lastIndexOf('.'));

fs.readFile(filePath, (err, data) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error(filePath + ' does not exist');
      return;
    } else {
      throw err;
    }
  }
  fs.open(newPath, 'w+', (err, fd) => {
    if (err) throw err;
	fs.write(fd, compile(data.toString()), (err) => {
		if (err) throw err;
		console.log('Compilation complited');
	});
  });
});

function compile(str){
	var compiled = '';
	str = str.toLowerCase();
	var chars = str.split('');
	for(var i=0; i < chars.length; i++){
		compiled += alphabet[chars[i]];
		if(i != chars.length - 1){
			compiled += '+';
		}
	}
	return compiled;
}