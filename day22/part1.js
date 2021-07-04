var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
// Filesystem              Size  Used  Avail  Use%
// /dev/grid/node-x0-y0     92T   72T    20T   78%

var cap = /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/;

var nodes = [];

for(var i = 0; i < input.length; i++) {
    if (cap.test(input[i])) {
        var vals = cap.exec(input[i]);
        var used = parseInt(vals[4]);
        var avail = parseInt(vals[5]);
        nodes.push({ used: used, avail: avail });
    }
}

var pairs = 0;

for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes.length; j++) {
        if (i != j && nodes[i].used > 0 && nodes[i].used <= nodes[j].avail) {
            pairs++;
        }
    }
}

console.log(pairs);