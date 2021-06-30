var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

function moreData(a) {
    var b = '';
    for(var i = (a.length-1); i >= 0; i--) {
        b += (a[i] == '0' ? '1' : '0');
    }

    return a + '0' + b;
}

function checksum(data) {
    if (data.length % 2 == 1) {
        return data;
    }
    var sum = '';
    for (var i = 0; i < data.length; i += 2) {
        if (data[i] == data[i+1]) {
            sum += '1';
        } else {
            sum += '0';
        }
    }
    return checksum(sum);
}

var data = input;

while(data.length < 272) {
    data = moreData(data);
}

data = data.substring(0, 272);

console.log(checksum(data));