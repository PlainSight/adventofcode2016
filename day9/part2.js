var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');


function decom(start, end) {
    var decompressed = 0;

    var pointer = start;

    while (pointer < end) {
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
                var repeatedSection = decom(pointer+1, pointer+chars+1);
    
                for(var i = 0; i < reps; i++) {
                    decompressed += repeatedSection;
                }
    
                pointer += chars+1;
                break;
            default:
                decompressed += 1;
                pointer++;
        }
    }

    return decompressed;
}

var final = decom(0, input.length);

console.log(final);