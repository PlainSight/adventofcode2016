var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var pointer = 0;

var decompressed = '';

while (pointer < input.length) {
    switch(input[pointer]) {
        case '(':
            // read until ')'
            var marker = '';
            pointer++;
            while(input[pointer] != ')') {
                marker += input[pointer];
                pointer++;
            }
            var vals = /(\d+)x(\d+)/.exec(marker);
            var chars = parseInt(vals[1]);
            var reps = parseInt(vals[2]);
            var repeatedSection = input.substring(pointer+1, pointer+chars+1);

            for(var i = 0; i < reps; i++) {
                decompressed += repeatedSection;
            }

            pointer += chars+1;
            break;
        default:
            decompressed += input[pointer];
            pointer++;
    }
}

console.log(decompressed.length);