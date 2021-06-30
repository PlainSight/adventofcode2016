var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lastRow = input;

var width = input.length;
var wm = width-1;

var safe = 0;

safe += lastRow.split('').filter(a => a == '.').length;

for (var i = 1; i < 400000; i++) {
    var newRow = '';
    for(var j = 0; j < width; j++) {
        var trap = false;
        //Its left and center tiles are traps, but its right tile is not.
        if (j > 0 && lastRow[j-1] == '^' && lastRow[j] == '^' && (j == wm || lastRow[j+1] == '.')) {
            trap = true;
        }
        
        //Its center and right tiles are traps, but its left tile is not.
        if (j < wm && lastRow[j] == '^' && lastRow[j+1] == '^' && (j == 0 || lastRow[j-1] == '.')) {
            trap = true;
        }

        //Only its left tile is a trap.
        if (j > 0 && lastRow[j-1] == '^' && lastRow[j] == '.' && (j == wm || lastRow[j+1] == '.')) {
            trap = true;
        }

        //Only its right tile is a trap.
        if (j < wm && lastRow[j] == '.' && lastRow[j+1] == '^' && (j == 0 || lastRow[j-1] == '.')) {
            trap = true;
        }
        newRow += trap ? '^' : '.';
        safe += trap ? 0 : 1;
    }

    lastRow = newRow;
}

console.log(safe);

