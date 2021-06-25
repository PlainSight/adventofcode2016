var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split(', ');

var x = 0;
var y = 0;

var direction = 0; // N, E, S, W

var visited = { '0,0': true };

function checkOrInsert(x, y) {
	if (visited[x+','+y]) {
		return true;
	} else {
		visited[x+','+y] = true;
		return false;
	}
}

outer: for (var i = 0; i < input.length; i++) {
	var inst = input[i];

	var dir = inst.substring(0, 1);
	var count = parseInt(inst.substring(1));

	direction = dir == 'R' ? (direction + 1) % 4 : (direction + 3) % 4;

	switch (direction) {
		case 0:
			for(var j = 0; j < count; j++) {
				y -= 1;
				if(checkOrInsert(x, y)) {
					break outer;
				}
			}
			break;
		case 1:
			for(var j = 0; j < count; j++) {
				x += 1;
				if(checkOrInsert(x, y)) {
					break outer;
				}
			}
			break;
		case 2:
			for(var j = 0; j < count; j++) {
				y += 1;
				if(checkOrInsert(x, y)) {
					break outer;
				}
			}
			break;
		case 3:
			for(var j = 0; j < count; j++) {
				x -= 1;
				if(checkOrInsert(x, y)) {
					break outer;
				}
			}
			break;
	}
}

console.log(Math.abs(x) + Math.abs(y));