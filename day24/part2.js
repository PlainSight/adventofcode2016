var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

// find all paths from one number to another, find best order to do them.

var numberPositions = {};

for (var y = 0; y < input.length; y++) {
    for (var x = 0; x < input[y].length; x++) {
        if (/\d/.test(input[y][x])) {
            numberPositions[/(\d)/.exec(input[y][x])[1]] = { x: x, y: y };
        }
    }
}

var distFrom = {};

for (var n in numberPositions) {
    var start = numberPositions[n];

    var stack = [{x:start.x,y:start.y,dist:0}];
    var visited = {};
    visited[start.x+','+start.y] = true;

    function visit(x, y, dist) {
        if(y < 0 || x < 0 || y >= input.length || x >= input[y].length || input[y][x] == '#') {
            return;
        }
        if (!visited[x+','+y]) {
            stack.push({x:x, y:y, dist: dist+1});
            visited[x+','+y] = true;
        }
    }

    while(stack.length) {
        stack.sort((a, b) => b.dist-a.dist);
        var top = stack.pop();

        var dests = Object.entries(numberPositions).filter(np => np[1].x == top.x && np[1].y == top.y);
        if (dests.length) {
            if (!distFrom[n]) {
                distFrom[n] = {};
            }
            distFrom[n][dests[0][0]] = top.dist;
        }

        visit(top.x+1, top.y, top.dist);
        visit(top.x-1, top.y, top.dist);
        visit(top.x, top.y+1, top.dist);
        visit(top.x, top.y-1, top.dist);
    }
}

console.log(distFrom);

var shortestPath = Infinity;

function travel(visited, from, traveled) {
    if (visited.length == Object.keys(distFrom).length) {
        traveled += distFrom[from]['0'];
        if (traveled < shortestPath) {
            shortestPath = traveled;
        }
        return;
    }
    for (var k in distFrom[from]) {
        if (!visited.includes(k)) { 
            var d = distFrom[from][k];
            var vs = JSON.parse(JSON.stringify(visited));
            vs.push(k);
            travel(vs, k, traveled+d);
        }
    }
}

travel(['0'], '0', 0);

console.log(shortestPath);