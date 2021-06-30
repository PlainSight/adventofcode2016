var fs = require('fs');
var md5 = require('md5');

var passcode = fs.readFileSync('./input.txt', 'utf8')

var longestPath = '';

function tryPath(x, y, prior) {
    if (x == 3 && y == 3) {
        if (prior.length > longestPath.length) {
            longestPath = prior;
        }
        return;
    }

    var hash = md5(passcode+prior);
    var up = /[b-f]/.test(hash[0]) && y > 0;
    var down = /[b-f]/.test(hash[1]) && y < 3;
    var left = /[b-f]/.test(hash[2]) && x > 0;
    var right = /[b-f]/.test(hash[3]) && x < 3;

    //console.log(x, y, prior, up, down, left, right);

    if (up) {
        tryPath(x, y-1, prior+'U');
    }
    if (down) {
        tryPath(x, y+1, prior+'D');
    }
    if (left) {
        tryPath(x-1, y, prior+'L');
    }
    if (right) {
        tryPath(x+1, y, prior+'R');
    }
}

tryPath(0, 0, '');

console.log(longestPath.length);