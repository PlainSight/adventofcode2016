var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var count = 0;

for (var i = 0; i < input.length; i++) {
    var mode = 'norm'; // hyper

    var hasInNorm = false;
    var hasInHyper = false;

    for(var j = 0; j < input[i].length - 3; j++) {
        switch (input[i][j]) {
            case '[':
                mode = 'hyper';
                break;
            case ']':
                mode = 'norm';
                break;
            default:
                if (input[i][j] == input[i][j+3] && input[i][j+1] == input[i][j+2]) {
                    if (mode == 'hyper') {
                        hasInHyper = true;
                    } else {
                        hasInNorm = true;
                    }
                }
        }
    }

    if (hasInNorm && !hasInHyper) {
        count++;
    }
}

console.log(count);