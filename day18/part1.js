var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var rows = [];
rows.push(input);

var width = input.length;
var wm = width-1;

var safe = 0;

safe += input.split('').filter(a => a == '.').length;

for (var i = 1; i < 40; i++) {
    var newRow = '';
    for(var j = 0; j < width; j++) {
        var trap = false;
        //Its left and center tiles are traps, but its right tile is not.
        if (j > 0 && rows[i-1][j-1] == '^' && rows[i-1][j] == '^' && (j == wm || rows[i-1][j+1] == '.')) {
            trap = true;
        }
        
        //Its center and right tiles are traps, but its left tile is not.
        if (j < wm && rows[i-1][j] == '^' && rows[i-1][j+1] == '^' && (j == 0 || rows[i-1][j-1] == '.')) {
            trap = true;
        }

        //Only its left tile is a trap.
        if (j > 0 && rows[i-1][j-1] == '^' && rows[i-1][j] == '.' && (j == wm || rows[i-1][j+1] == '.')) {
            trap = true;
        }

        //Only its right tile is a trap.
        if (j < wm && rows[i-1][j] == '.' && rows[i-1][j+1] == '^' && (j == 0 || rows[i-1][j-1] == '.')) {
            trap = true;
        }
        newRow += trap ? '^' : '.';
    }

    rows.push(newRow);

    safe += newRow.split('').filter(a => a == '.').length;
}

console.log(safe);

