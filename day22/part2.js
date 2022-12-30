var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
// Filesystem              Size  Used  Avail  Use%
// /dev/grid/node-x0-y0     92T   72T    20T   78%

var cap = /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/;

var nodes = [];

for(var i = 0; i < input.length; i++) {
    if (cap.test(input[i])) {
        var vals = cap.exec(input[i]);
        var x = parseInt(vals[1]);
        var y = parseInt(vals[2]);
        var used = parseInt(vals[4]);
        var avail = parseInt(vals[5]);
        nodes.push({ x: x, y: y, used: used, avail: avail });
    }
}

for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes.length; j++) {
        if (i != j && nodes[i].used > 0 && nodes[i].used <= nodes[j].avail) {
            nodes[i].usable = true;
            nodes[j].usable = true;
        }
    }
}

var targetLocation = { x: Math.max(...nodes.map(n => n.x)), y: 0 };
var blocks = nodes.filter(n => !n.usable).reduce((a, c) => {
    a[c.x+','+c.y] = true;
    return a;
}, {});
var emptyLocation = nodes.sort((a, b) => b.avail - a.avail).map(n => { return { x: n.x, y: n.y }})[0];

var minX = 0;
var minY = 0;
var maxX = Math.max(...nodes.map(n => n.x));
var maxY = Math.max(...nodes.map(n => n.y));

console.log(targetLocation, blocks, emptyLocation);

var seenStates = {};

var startState = {
    dx: targetLocation.x,
    dy: targetLocation.y,
    ex: emptyLocation.x,
    ey: emptyLocation.y
};

function key(state) {
    return state.dx+','+state.dy+','+state.ex+','+state.ey;
}

function findMoves(state) {
    // we can swap the emptyLocation with any position (in bounds) that is not a block
    // if this is the datalocation the datalocation is swapped with the empty location

    var moves = [];

    [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ].forEach(d => {
        var ex = state.ex + d[0];
        var ey = state.ey + d[1];
        if (ex >= minX && ex <= maxX && ey >= minY && ey <= maxY) {
            if (!blocks[ex+','+ey]) {
                if (state.dx == ex && state.dy == ey) {
                    moves.push({
                        dx: state.ex,
                        dy: state.ey,
                        ex: ex,
                        ey: ey
                    });
                } else {
                    moves.push({
                        dx: state.dx,
                        dy: state.dy,
                        ex: ex,
                        ey: ey
                    });
                }
            }
        }
    });

    return moves.filter(m => {
        if (!seenStates[key(m)]) {
            seenStates[key(m)] = true;
            return true;
        }
        return false;
    });
}

var states = [startState];

seenStates[key(startState)] = true;

var step = 0;

while (true) {
    if (states.filter(s => s.dx == minX && s.dy == minY).length > 0) {
        break;
    }

    step++;
    var newStates = [];

    states.forEach(s => {
        newStates.push(...findMoves(s));
    });

    //console.log(step, newStates);

    states = newStates;
}

console.log(step);