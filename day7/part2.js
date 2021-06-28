var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var count = 0;

for (var i = 0; i < input.length; i++) {
    var mode = 'norm'; // hyper

    var abas = [];
    var babs = [];

    for(var j = 0; j < input[i].length - 2; j++) {
        switch (input[i][j]) {
            case '[':
                mode = 'hyper';
                break;
            case ']':
                mode = 'norm';
                break;
            default:
                if (input[i][j] == input[i][j+2] && input[i][j+1] != ']' && input[i][j+1] != '[' && input[i][j+1] != input[i][j]) {
                    if (mode == 'hyper') {
                        babs.push(input[i][j] + input[i][j+1] + input[i][j+2]);
                    } else {
                        abas.push(input[i][j] + input[i][j+1] + input[i][j+2]);
                    }
                }
        }
    }

    var res = abas.filter(a => babs.includes((a[1] + a[0] + a[1])));

    if (res.length > 0) {
        count++;
    }
}

console.log(count);