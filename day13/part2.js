var fs = require('fs');

var input = parseInt(fs.readFileSync('./input.txt', 'utf8'));

var visited = {'1,1': true};

function avoid(x, y) {
    if (visited[x+','+y]) {
        return true;
    }
    if (x < 0 || y < 0) {
        return true;
    }
    var t = (x*x) + (3*x) + (2*x*y) + y + (y*y);
    t += input;
    var ones = t.toString(2).split('').filter(a => a == '1').length;

    return (ones % 2) == 1;
}

var queue = [{ x: 1, y: 1, dist: 0 }];

function explore (x, y, dist) { // param is start loc
    if (!avoid(x+1, y)) {
        visited[(x+1)+','+y] = true;
        queue.push({ x: x+1, y: y, dist: dist+1 });
    }
    if (!avoid(x-1, y)) {
        visited[(x-1)+','+y] = true;
        queue.push({ x: x-1, y: y, dist: dist+1 });
    }
    if (!avoid(x, y+1)) {
        visited[x+','+(y+1)] = true;
        queue.push({ x: x, y: y+1, dist: dist+1 });
    }
    if (!avoid(x, y-1)) {
        visited[x+','+(y-1)] = true;
        queue.push({ x: x, y: y-1, dist: dist+1 });
    }
}

var visits = 0;

while(true) {
    // pop form queue

    queue.sort((a, b) => a.dist - b.dist);
    var top = queue.shift();

    if (top.dist == 51) {
        console.log(visits);
        return;
    }

    visits++;

    explore(top.x, top.y, top.dist);
}
