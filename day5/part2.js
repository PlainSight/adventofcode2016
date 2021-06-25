var fs = require('fs');
var md5 = require('md5');

var input = fs.readFileSync('./input.txt', 'utf8')

console.log(input);

var index = 0;
var password = ['_', '_', '_', '_', '_', '_', '_', '_'];

outer: while(true) {
	var hash = md5(input+index);
	if(hash.substring(0, 5) == '00000') {
		var pos = hash.substring(5, 6);
		var val = hash.substring(6, 7);

        if (/[0-7]/.test(pos)) {
            var parsedPos = parseInt(pos);
            if (password[parsedPos] == '_') {
                password[parsedPos] = val;
                console.log(password.join(''));
                if (password.filter(a => a != '_').length == 8) {
                    break outer;
                }
            }
        }
	}
	index++;
}