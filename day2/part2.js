var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var pad = [[ null, null, '1' ],
[ null, '2', '3', '4' ],
[ '5', '6', '7', '8', '9' ],
[ null, 'A', 'B', 'C' ],
[ null, null, 'D' ]]

var x = 2;
var y = 2;

var code = '';

for(var i = 0; i < input.length; i++) {
	for (var j = 0; j < input[i].length; j++) {
        var savex = x;
        var savey = y;
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
		if (Math.abs(x - 2) + Math.abs(y - 2) > 2) {
            x = savex;
            y = savey;
        }
	}

	code += pad[y][x];
}

console.log(code);