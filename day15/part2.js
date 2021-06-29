var fs = require('fs');
const { off } = require('process');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var disks = [];

for (var i = 0; i < input.length; i++) {
    //Disc #1 has 13 positions; at time=0, it is at position 1.
    var res = /Disc #(\d) has (\d+) positions; at time=0, it is at position (\d+)\./.exec(input[i]);

    var offset = parseInt(res[1]);
    var mod = parseInt(res[2]);
    var initpos = parseInt(res[3]);

    disks.push({ offset: offset, mod: mod, init: initpos });
}

disks.push({ offset: 7, mod: 11, init: 0 });

for (var start = 0; ; start++) {
    var good = true;

    for (var d = 0; d < disks.length; d++) {
        if(((start + disks[d].offset + disks[d].init) % disks[d].mod) != 0) {
            good = false;
        }
    }

    if (good){
        console.log(start);
        return;
    }
}
