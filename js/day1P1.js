const fs = require('fs');
const log = console.log;
const data = fs.readFileSync('/home/david/Documents/Advent_of_code/ac1.txt', 'utf8');

const lines = data.trim().split('\n');
const dataArray = lines.map(line => {
    // Separa la línea usando espacios o tabuladores
    const parts = line.trim().split(/\s+/);
    // Convierte cada parte a entero
    return parts.map(numStr => parseInt(numStr, 10));
});

const left = dataArray.map(row => row[0]);
const right = dataArray.map(row => row[1]);
left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

const distance = left.reduce((acc, val, i) => {
    return acc + Math.abs(val - right[i]);
}
, 0);

const score = left.reduce((acc, val, i) => {
    const count = right.filter(val => val === left[i]).length;
    return acc + count * val;
}
, 0);

log('Part 1:', distance);
log('Part 2:', score);