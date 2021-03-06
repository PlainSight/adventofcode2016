var fs = require('fs');

var numberOfElves = parseInt(fs.readFileSync('./input.txt', 'utf8'));

var firstElf = { number: 1, next: null, last: null };
var lastElf = firstElf;

var acrossElf = null;

for(var i = 2; i <= numberOfElves; i++) {
    var newElf = { number: i, next: null, last: lastElf };
    lastElf.next = newElf;
    lastElf = newElf;

    if (i == Math.ceil((1+numberOfElves) / 2)) {
        acrossElf = lastElf;
    }
}

lastElf.next = firstElf;
firstElf.last = lastElf;

var population = numberOfElves;

while(acrossElf.next != acrossElf) {
    acrossElf.last.next = acrossElf.next;
    acrossElf.next.last = acrossElf.last;

    if (population % 2 == 1) {
        acrossElf = acrossElf.next;
    }
    acrossElf = acrossElf.next;
    population--;
}

console.log('done', acrossElf);
