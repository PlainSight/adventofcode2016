var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var pad = [['1', '2', '3'],
['4', '5', '6'],
['7', '8', '9']];

var x = 1;
var y = 1;

var code = '';

for(var i = 0; i < input.length; i++) {
	for (var j = 0; j < input[i].length; j++) {
		switch (input[i][j]) {
			case 'L':
				x--;
				break;
			case 'R':
				x++;
				break;
			case 'U':
				y--;
				break;
			case 'D':
				y++;
				break;
		}
		x = Math.min(Math.max(0, x), 2);
		y = Math.min(Math.max(0, y), 2);
	}

	code += pad[y][x];
}

console.log(code);