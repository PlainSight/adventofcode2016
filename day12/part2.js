var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var pc = 0;

vals = { a: 0, b: 0, c: 1, d: 0 };

while (pc < input.length) {
    var inst = input[pc];

    var instruction = /([a-z]+)/.exec(inst)[1];
    var args = inst.split(' ');
    args.shift();

    switch (instruction) {
        case 'cpy':
            if (/[a-d]/.test(args[0])) {
                vals[args[1]] = vals[args[0]];
            } else {
                vals[args[1]] = parseInt(args[0]);
            }
            pc++;
            break;
        case 'inc':
            vals[args[0]]++;
            pc++;
            break;
        case 'dec':
            vals[args[0]]--;
            pc++;
            break;
        case 'jnz':
            var val = 0;
            if (/[a-d]/.test(args[0])) {
                val = vals[args[0]];
            } else {
                val = parseInt(args[0]);
            }

            if (val !== 0) {
                pc += parseInt(args[1]);
            } else {
                pc++;
            }
            break;
    }
}

console.log(vals);
