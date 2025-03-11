const fs = require('fs');
const data = fs.readFileSync('input4.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n');

log(data.length)