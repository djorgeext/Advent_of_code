const fs = require('fs');
const data = fs.readFileSync('/home/david/Documents/Advent_of_code/ac2.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n');
const dataArray = lines.map(line => {
    // Separa la línea usando espacios o tabuladores
    const parts = line.trim().split(/\s+/);
    // Convierte cada parte a entero
    return parts.map(numStr => parseInt(numStr, 10));
});


function safeEval (dataArray) {
    let safeList = 0;
    let sortRight = [];
    let sortLeft = [];
    let diff = [];
    let isSafe = false;
    for (let i = 0; i < dataArray.length; i++) {

        sortRight = JSON.stringify(dataArray[i].slice().sort((a, b) => a - b));
        sortLeft = JSON.stringify(dataArray[i].slice().sort((a, b) => b - a));

        if ( JSON.stringify(dataArray[i]) === sortRight || JSON.stringify(dataArray[i]) === sortLeft) {
            diff = dataArray[i].slice(1).map((num, j) => Math.abs(num - dataArray[i][j]));
            isSafe = diff.every(num => num >= 1 && num <= 3);
            if (isSafe) {
                safeList++;
            };
        };
    }
    return safeList;
}

log(safeEval(dataArray));