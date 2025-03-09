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

const safeEvalArr = arr => {
    let sortRight = [];
    let sortLeft = [];
    let diff = [];
    let isSafe = false;
    sortRight = JSON.stringify([...arr].sort((a, b) => a - b));
    sortLeft = JSON.stringify([...arr].sort((a, b) => b - a));

    if ( JSON.stringify(arr) === sortRight || JSON.stringify(arr) === sortLeft) {
        diff = arr.slice(1).map((num, j) => Math.abs(num - arr[j]));
        isSafe = diff.every(num => num >= 1 && num <= 3);
        return isSafe;
    };
}

const reevalArr = arr => {
    let elem = [];
    for (let i = 0; i < arr.length; i++) {
        elem = [...arr];
        elem.splice(i, 1);
        if (safeEvalArr(elem)) {
            return true;
        }
    }
}


function safeEval (dataArray) {
    let safeList = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
        if (safeEvalArr(dataArray[i])) {
            safeList++;
        } else if (reevalArr(dataArray[i])) {
            safeList++;
        } else {
            continue;
        };
        
    }
    return safeList;
}

log(safeEval(dataArray));