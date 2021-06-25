var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split(', ');

var x = 0;
var y = 0;

var direction = 0; // N, E, S, W

for (var i = 0; i < input.length; i++) {
	var inst = input[i];

	var dir = inst.substring(0, 1);
	var count = parseInt(inst.substring(1));

	direction = dir == 'R' ? (direction + 1) % 4 : (direction + 3) % 4;

	switch (direction) {
		case 0:
			y -= count;
			break;
		case 1:
			x += count;
			break;
		case 2:
			y += count;
			break;
		case 3:
			x -= count;
			break;
	}
}

console.log(Math.abs(x) + Math.abs(y));