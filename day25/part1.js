var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

top: for (var aa = 0; true; aa++) {
    console.log('trying ', aa);

    var pc = 0;

    vals = { a: aa, b: 0, c: 0, d: 0 };

    var lastClock = null;
    var successful = 0;

    while (pc < input.length) {
        var inst = input[pc];

        var instruction = /([a-z]+)/.exec(inst)[1];
        var args = inst.split(' ');
        args.shift();

        switch (instruction) {
            case 'cpy':
                if (/\d+/.test(args[1])) {
                    pc++;
                    break;
                }
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

                var j = 0;
                if (/[a-d]/.test(args[1])) {
                    j = vals[args[1]];
                } else {
                    j = parseInt(args[1]);
                }

                if (val !== 0) {
                    pc += j;
                } else {
                    pc++;
                }
                break;
            case 'tgl':
                var val = 0;
                if (/[a-d]/.test(args[0])) {
                    val = vals[args[0]];
                } else {
                    val = parseInt(args[0]);
                }

                var temppc = pc + val;
                if (temppc < 0 || temppc >= input.length) {
                    pc++;
                    break;
                }
                var replacingInst = input[temppc];
                var newInst = '';
                var parts = replacingInst.split(' ');
                if (parts.length == 2) {
                    if (parts[0] == 'inc') {
                        newInst = 'dec ' + parts[1];
                    } else {
                        newInst = 'inc ' + parts[1];
                    }
                } else {
                    if (parts[0] == 'jnz') {
                        newInst = 'cpy ' + parts[1] + ' ' + parts[2];
                    } else {
                        newInst = 'jnz ' + parts[1] + ' ' + parts[2];
                    }
                }
                input[temppc] = newInst;
                pc++;
                break;
            case 'out':
                var val = 0;
                if (/[a-d]/.test(args[0])) {
                    val = vals[args[0]];
                } else {
                    val = parseInt(args[0]);
                }
                if (lastClock == null) {
                    lastClock = val;
                } else {
                    if (lastClock == 0 && val != 1) {
                        if (successful > 2) {
                            console.log('bad', lastClock, val, successful);
                        }
                        continue top;
                    }
                    if (lastClock == 1 && val != 0) {
                        if (successful > 2) {
                            console.log('bad', lastClock, val, successful);
                        }
                        continue top;
                    }
                    lastClock = val;
                }
                pc++;
                successful++;
        }
    }
}