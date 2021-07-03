var fs = require('fs');

var numberOfElves = parseInt(fs.readFileSync('./input.txt', 'utf8'));

var firstElf = { number: 1, presents: 1, next: null };
var lastElf = firstElf;

for(var i = 2; i <= numberOfElves; i++) {
    var newElf = { number: i, presents: 1, next: null };
    lastElf.next = newElf;
    lastElf = newElf;
}

lastElf.next = firstElf;

var currentElf = firstElf;

while(true) {
    currentElf.presents += currentElf.next.presents;
    currentElf.next = currentElf.next.next;

    if (currentElf.presents == numberOfElves) {
        console.log('done', currentElf.number);
        return;
    }

    currentElf = currentElf.next;
}
