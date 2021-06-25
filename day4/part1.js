var fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

var sum = 0;

for (var i = 0; i < input.length; i++) {
	
	var regex = /([a-z\-]+)(\d+)\[([a-z]+)\]/;
	var result = regex.exec(input[i]);
	var freq = {};
	var name = result[1];

	name.split('').filter(a => a != '-').forEach(n => !!freq[n] ? freq[n]++ : freq[n] = 1);

	var sectorId = parseInt(result[2]);
	var checksum = result[3];

	var checkSumCheck = Object.entries(freq)
		.sort((a, b) => a[1] == b[1] ? a[0].charCodeAt(0) - b[0].charCodeAt(0) : b[1] - a[1])
		.map(a => a[0])
		.join('')
		.substring(0, 5);

	if (checksum == checkSumCheck) {
		sum += sectorId;
	}
}

console.log(sum);
