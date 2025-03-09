const fs = require('fs');
const data = fs.readFileSync('input3.txt', 'utf8');
const log = console.log;

const regexSentence = /mul\(\d{1,3},\d{1,3}\)/g;
const regexNumber = /\d{1,3}/g;
const found = [...data.matchAll(regexSentence)];

let accumulator = 0;
let numbers = [];
for (let i = 0; i < found.length; i++) {
    numbers = found[i][0].match(regexNumber).map(num => parseInt(num, 10));
    accumulator += numbers[0] * numbers[1];
}

log(accumulator);