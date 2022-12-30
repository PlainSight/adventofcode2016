var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var bigState = {
    microchips: {},
    generators: {}
}

for (var i = 0; i < input.length; i++) {
    var inst = input[i];

    var generators = [];
    var genMatches = inst.match(/([a-z]+) generator/g);
    if (genMatches) {
        generators = genMatches.map(m => /([a-z]+) generator/.exec(m)[1]);
    }

    bigState.generators[i] = generators;

    var microchips = [];
    var micMatches = inst.match(/([a-z]+)-compatible microchip/g);
    if (micMatches) {
        microchips = micMatches.map(m => /([a-z]+)-compatible microchip/.exec(m)[1]);
    }

    bigState.microchips[i] = microchips;
}

var typeIndicies = Object.values(bigState.microchips).flat().sort().reduce((a, c, i) => {
    a[c] = i;
    return a;
}, {});

var smallState = {
    gens: [],
    chips: [],
    e: 0
}

Object.values(bigState.generators).forEach((g, f) => {
    g.forEach(gg => {
        smallState.gens[typeIndicies[gg]] = f;
    })
})
Object.values(bigState.microchips).forEach((c, f) => {
    c.forEach(cc => {
        smallState.chips[typeIndicies[cc]] = f;
    })
});


function key(state) {
    return state.e + ':' + state.gens.join(',') + ':' + state.chips.join(',');
}

var seenStates = {};

smallState.chips.push(0, 0);
smallState.gens.push(0, 0);

var distinctTypes = Object.values(typeIndicies).length + 2;

console.log(smallState);

var states = [
    smallState
];

var steps = 0;

function safeForChip(state, chipIndex, floor) {
    if (state.gens[chipIndex] == floor || state.gens.filter(g => g == floor).length == 0) {
        return true;
    }
    return false;
}

function generateValidMoves(state) {
    var potentialStates = [];

    [-1,1].forEach(dy => {
        var e = state.e + dy;
        if (e >= 0 && e <= 3) {
            // pick up between 1-2 elements to move from state.e to e

            // 1-2 gens
            for(var g = 0; g < distinctTypes; g++) {
                for(var gg = g; gg < distinctTypes; gg++) {
                    if (state.gens[g] == state.e && state.gens[gg] == state.e) {
                        var gens = state.gens.map(g => g);
                        gens[g] = e;
                        gens[gg] = e;
                        var chips = state.chips.map(c => c);
                        potentialStates.push({
                            e: e,
                            gens: gens,
                            chips: chips
                        });
                    }
                }
            }
            
            // 1-2 chips

            for(var c = 0; c < distinctTypes; c++) {
                for(var cc = c; cc < distinctTypes; cc++) {
                    if (state.chips[c] == state.e && state.chips[cc] == state.e) {
                        var chips = state.chips.map(c => c);
                        chips[c] = e;
                        chips[cc] = e;
                        var gens = state.gens.map(g => g);
                        potentialStates.push({
                            e: e,
                            gens: gens,
                            chips: chips
                        });
                    }
                }
            }

            // 1 generator, 1 chip

            for(var c = 0; c < distinctTypes; c++) {
                for(var g = 0; g < distinctTypes; g++) {
                    if (state.chips[c] == state.e && state.gens[g] == state.e) {
                        var chips = state.chips.map(c => c);
                        chips[c] = e;
                        var gens = state.gens.map(g => g);
                        gens[g] = e;
                        potentialStates.push({
                            e: e,
                            gens: gens,
                            chips: chips
                        });
                    }
                }
            }
        }
    })

    potentialStates = potentialStates.filter(s => {
        var safe = true;
        s.chips.forEach((c, ci) => {
            if(!safeForChip(s, ci, c)) {
                safe = false;
            }
        });

        return safe;
    });

    return potentialStates.filter(s => {
        if (!seenStates[key(s)]) {
            seenStates[key(s)] = true;
            return true;
        }
        return false;
    });
}

while(true) {
    console.log(states.length);
    var winningState = states.filter(s => s.gens.filter(g => g == 3).length == distinctTypes && s.chips.filter(c => c == 3).length == distinctTypes)[0];

    if (winningState) {
        console.log(winningState);
        break;
    }

    var newStates = [];

    states.forEach(s => {
        newStates.push(...generateValidMoves(s));
    });

    states = newStates;

    steps++;
}

console.log(steps);