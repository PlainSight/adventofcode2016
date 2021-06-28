var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var bots = {};

var instructions = {};

for(var i = 0; i < input.length; i++) {
    if (input[i].startsWith('bot')) {
        var extract = /bot (\d+) gives low to (output|bot) (\d+) and high to (output|bot) (\d+)/.exec(input[i]);
        var id = parseInt(extract[1]);
        var lowTarget = extract[2];
        var lowBot = parseInt(extract[3]);
        var highTarget = extract[4];
        var highBot = parseInt(extract[5]);
        instructions[id] = { low: lowBot, high: highBot, lowTarget: lowTarget, highTarget: highTarget };
    } else {
        var extract = /value (\d+) goes to bot (\d+)/.exec(input[i]);
        var val = parseInt(extract[1]);
        var bot = parseInt(extract[2]);
        if(!bots[bot]) {
            bots[bot] = [];
        }
        bots[bot].push(val);
    }
}

var iters = 0;

outer: while(true) {
    var newBots = {};

    iters++;

    //console.log('iter', iters);

    Object.entries(bots).forEach(e => {
        if (e[1].length == 2) {
            // lookup the instruction
            var low = Math.min(...e[1]);
            var high = Math.max(...e[1]);
            var giveLow = instructions[e[0]].low;
            var lowTarget = instructions[e[0]].lowTarget;
            var giveHigh = instructions[e[0]].high;
            var highTarget = instructions[e[0]].highTarget;

            if (low == 17 && high == 61) {
                console.log(e[0]);
            }

            if (lowTarget == 'bot') {
                if (!newBots[giveLow]) {
                    newBots[giveLow] = [ low ];
                } else {
                    newBots[giveLow].push(low);
                }
            }

            if (highTarget == 'bot') {
                if (!newBots[giveHigh]) {
                    newBots[giveHigh] = [ high ];
                } else {
                    newBots[giveHigh].push(high);
                }
            }
        } else {
            // else just persist
            if (!newBots[e[0]]) {
                newBots[e[0]] = e[1];
            } else {
                newBots[e[0]].push(e[1][0]);
            }
        }
    });

    bots = newBots;
}