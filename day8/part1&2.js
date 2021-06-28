var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

// 50 x 6
// rotate row right and column down

var pixels = [];
for (var i = 0; i < 6; i++) {
    pixels.push([]);
    for(var x = 0; x < 50; x++) {
        pixels[i].push(false);
    }
}

for(var i = 0; i < input.length; i++) {
    if (input[i].startsWith('rect')) {
        var vals = /(\d+)x(\d+)/.exec(input[i]);
        var wide = parseInt(vals[1]);
        var tall = parseInt(vals[2]);
        for(var x = 0; x < wide; x++) {
            for(var y = 0; y < tall; y++) {
                pixels[y][x] = true;
            }
        }
    }
    if (input[i].startsWith('rotate row')) {
        var vals = /=(\d+) by (\d+)/.exec(input[i]);
        var row = parseInt(vals[1]);
        var by = parseInt(vals[2]);
        var saved = [];
        for (var x = 0; x < 50; x++) {
            saved.push(pixels[row][x]); 
        }
        for(var x = 0; x < 50; x++) {
            pixels[row][x] = saved[(x+50-by)%50];
        }
    }
    if (input[i].startsWith('rotate column')) {
        var vals = /=(\d+) by (\d+)/.exec(input[i]);
        var col = parseInt(vals[1]);
        var by = parseInt(vals[2]);
        var saved = [];
        for (var y = 0; y < 6; y++) {
            saved.push(pixels[y][col]); 
        }
        for(var y = 0; y < 6; y++) {
            pixels[y][col] = saved[(y+6-by)%6];
        }
    }
}

var lit = 0;

for(var y = 0; y < pixels.length; y++) {
    console.log(pixels[y].map(p => p ? '#' : ' ').join(''));
    lit += pixels[y].filter(p => p).length;
}

console.log(lit);

// ZFHFSFOGPO