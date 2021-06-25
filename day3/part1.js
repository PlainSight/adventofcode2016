var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var good = 0;

for(var i = 0; i < input.length; i++) {
	var parts = input[i].split(/\s+/).filter(a => !!a).map(a => parseInt(a)).sort((a, b) => a-b);

	if (parts[0] + parts[1] > parts[2]) {
		good++;
	}
}

console.log(good);