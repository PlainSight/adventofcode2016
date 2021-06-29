var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var initState = {
    microchips: {},
    generators: {}
}

function hashState (state) {
    var hash = Object.entries(state.microchips).map(m => m[0]+m[1].join(','));
    return hash + Object.entries(state.generators).map(m => m[0]+m[1].join(','));
}

for (var i = 0; i < input.length; i++) {
    var inst = input[i];

    var generators = [];
    var genMatches = inst.match(/([a-z]+) generator/g);
    if (genMatches) {
        generators = genMatches.map(m => /([a-z]+) generator/.exec(m)[1]);
    }

    initState.generators[i] = generators;

    var microchips = [];
    var micMatches = inst.match(/([a-z]+)-compatible microchip/g);
    if (micMatches) {
        microchips = micMatches.map(m => /([a-z]+)-compatible microchip/.exec(m)[1]);
    }

    initState.microchips[i] = microchips;
}

var seenStates = {};

doMove(initState);

function doMove(state) {
    state = JSON.parse(JSON.stringify(state))
    console.log(state);
    console.log();

    var hash = hashState(state);
    if (seenStates[hash]) {
        return;
    }
    seenStates[hash] = true;

}