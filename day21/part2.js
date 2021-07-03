var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
var scramble = 'fbgdceah'.split('');

// var input = [
//     'swap position 4 with position 0',
//     'swap letter d with letter b',
//     'reverse positions 0 through 4',
//     'rotate left 1',
//     'move position 1 to position 4',
//     'move position 3 to position 0',
//     'rotate based on position of letter b',
//     'rotate based on position of letter d'
// ];
// var scramble = 'decab'.split('');

outer: for(var i = input.length-1; i >= 0; i--) {
    var ii = input[i];

    console.log(i, scramble.join(''));

    if (ii.startsWith('swap position')) {
        var cap = /swap position (\d) with position (\d)/.exec(ii);
        var p1 = parseInt(cap[1]);
        var p2 = parseInt(cap[2]);
        var tmp = scramble[p1];
        scramble[p1] = scramble[p2];
        scramble[p2] = tmp;
        continue outer;
    }
    if (ii.startsWith('swap letter')) {
        var cap = /swap letter (.) with letter (.)/.exec(ii);
        var c1 = (cap[1]);
        var c2 = (cap[2]);
        for(var c = 0; c < scramble.length; c++) {
            if (scramble[c] == c1) {
                scramble[c] = c2;
            } else {
                if (scramble[c] == c2) {
                    scramble[c] = c1;
                }
            }
        }

        continue outer;
    }
    if (/rotate (left|right)/.test(ii)) {
        var cap = /rotate (left|right) (\d)/.exec(ii);
        var c1 = cap[1];
        var c2 = parseInt(cap[2]);
        if (c1 == 'right') {
            for(var j = 0; j < c2; j++) {
                var tmp = scramble.shift();
                scramble.push(tmp);
            }
        } else {
            for(var j = 0; j < c2; j++) {
                var tmp = scramble.pop();
                scramble.unshift(tmp);
            }
        }
        continue outer;
    }
    if (ii.startsWith('rotate based')) {
        // this is hard, one way function but limited space
        var cap = /rotate based on position of letter (.)/.exec(ii);
        var c1 = cap[1];

        var outputPos = scramble.indexOf(c1);

        // this is the output pos of the original.

        // calculate all possible input positions, check which one results in the correct output

        var leftRotate = 0;

        for (var j = 0; j < scramble.length; j++) {
            var pos = j*2;
            var rots = j;
            if (j >= 4) {
                pos++;
                rots++;
            }
            pos++;
            rots++;
            if((pos % scramble.length) == outputPos) {
                // j is original position
                // rotate left the difference
                leftRotate = rots;
            }
        }

        for(var j = 0; j < leftRotate; j++) {
            var tmp = scramble.shift();
            scramble.push(tmp);
        }

        continue outer;
    }
    if (ii.startsWith('reverse positions')) {
        var cap = /reverse positions (\d) through (\d)/.exec(ii);
        var c1 = parseInt(cap[1]);
        var c2 = parseInt(cap[2]);

        var stack = [];
        for (var j = c1; j <= c2; j++) {
            stack.push(scramble[j]);
        }
        for (var j = c1; j <= c2; j++) {
            scramble[j] = stack.pop();
        }

        continue outer;
    }
    if (ii.startsWith('move position')) {
        var cap = /move position (\d) to position (\d)/.exec(ii);
        var c2 = parseInt(cap[1]);
        var c1 = parseInt(cap[2]);

        var movedChar = scramble[c1];
        var otherChars = scramble.filter((c, j) => j != c1);

        var newScramble = [];

        for(var j = 0; j < scramble.length; j++) {
            switch (j) {
                case c2:
                    newScramble.push(movedChar);
                    break;
                default:
                    newScramble.push(otherChars.shift());
                    break;
            }
        }
        scramble = newScramble;

        continue outer;
    }
}

console.log(i, scramble.join(''));