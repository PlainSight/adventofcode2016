var fs = require('fs');
var md5 = require('md5');

var salt = fs.readFileSync('./input.txt', 'utf8');

var keysFound = 0;

outer: for(var i = 0; ; i++) {
    var hash = md5(salt+i);
    if(/(.)\1\1/.test(hash)) {
        var char = /(.)\1\1/.exec(hash)[1];
        var regex = new RegExp(char+char+char+char+char);
        for(var j = 1; j <= 1000; j++) {
            var innerhash = md5(salt+(i+j));
            if (regex.test(innerhash)) {

                keysFound++;
                console.log(keysFound, i, hash, i+j, innerhash, char);
                if (keysFound == 64) {
                    return;
                }
                continue outer;
            }
        }
    }
}