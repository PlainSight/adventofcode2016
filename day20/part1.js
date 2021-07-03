var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(l => {
    var mm = l.split('-');
    return {
        min: parseInt(mm[0]),
        max: parseInt(mm[1]),
    }
});

//var input = [ {min:5, max:8}, {min:0, max:2}, {min:4, max:7} ];

var ranges = [];

function insertRange(ii) {
    for (var r = 0; r < ranges.length; r++) {
        var rr = ranges[r];

        if ((ii.min <= rr.max && ii.max >= rr.min) || (ii.max + 1) == rr.min || (rr.max + 1) == ii.min) {
            // combine ranges
            // check the new range against the existing other ranges and repeat

            var newRange = {
                min: Math.min(ii.min, rr.min),
                max: Math.max(ii.max, rr.max)
            };

            ranges.splice(r, 1);

            insertRange(newRange);
            return;
        }
    }

    ranges.push(ii);

}

for (var i = 0; i < input.length; i++) {
    var ii = input[i];

    insertRange(ii);
}

var sortedRanges = ranges.sort((a, b) => a.min - b.min);

console.log(sortedRanges[0].max+1);