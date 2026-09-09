const fs = require('node:fs');

console.log(1);

fs.readFile('data.txt', 'utf8', () => {
    console.log(2);
});

console.log(3);