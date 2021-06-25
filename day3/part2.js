var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var good = 0;

for(var i = 0; i < input.length; i += 3) {
	var parts0 = input[i].split(/\s+/).filter(a => !!a).map(a => parseInt(a));
	var parts1 = input[i+1].split(/\s+/).filter(a => !!a).map(a => parseInt(a));
	var parts2 = input[i+2].split(/\s+/).filter(a => !!a).map(a => parseInt(a));

    var np0 = [ parts0[0], parts1[0], parts2[0] ].sort((a, b) => a-b);
    var np1 = [ parts0[1], parts1[1], parts2[1] ].sort((a, b) => a-b);
    var np2 = [ parts0[2], parts1[2], parts2[2] ].sort((a, b) => a-b);

	if (np0[0] + np0[1] > np0[2]) {
		good++;
	}
    if (np1[0] + np1[1] > np1[2]) {
		good++;
	}
    if (np2[0] + np2[1] > np2[2]) {
		good++;
	}
}

console.log(good);