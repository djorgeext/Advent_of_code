const fs = require('fs');
const data = fs.readFileSync('input4.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n');
const forwardMatch = "XMAS";
const backwardMatch = "SAMX";

const findInRow = row => {
    let countForward = 0;
    let countBackward = 0;
    let i = 0;
    while (i < row.length + 4) {
        let subRow = row.slice(i, i + 4)
        let subCol 
        if (subRow === forwardMatch) {
            countForward++;
        } else if (subRow === backwardMatch) {
            countBackward++;
        }
        i++;
    }
}


// log(lines[0].slice(0, 0 + 4) === 'SAMM')