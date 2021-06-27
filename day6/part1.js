var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var mostCommonInPos = [];

for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input[i].length; j++) {
        if (!mostCommonInPos[j]) {
            mostCommonInPos.push({});
        }

        var letter = input[i][j];

        if(mostCommonInPos[j][letter]) { 
            mostCommonInPos[j][letter]++ 
        } else { 
            mostCommonInPos[j][letter] = 1; 
        };
    }
}

var result = '';

for (var j = 0; j < mostCommonInPos.length; j++) {
    result += Object.entries(mostCommonInPos[j]).sort((a, b) => b[1] - a[1])[0][0];
}

console.log(result);