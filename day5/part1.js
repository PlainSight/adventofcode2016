var fs = require('fs');
var md5 = require('md5');

var input = fs.readFileSync('./input.txt', 'utf8')

console.log(input);

var index = 0;
var password = '';

outer: while(true) {
	var hash = md5(input+index);
	if(hash.substring(0, 5) == '00000') {
		password += hash.substring(5, 6);
		if (password.length == 8) {
			break outer;
		}
	}
	index++;
}

console.log(password);

