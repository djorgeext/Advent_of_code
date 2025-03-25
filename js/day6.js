const fs = require('fs');
const data = fs.readFileSync('input6.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n').map(line => line.split(''));

const getPosition = lines => {
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === '^') {
                return [i, j];
            }
        }
    }
}


let [y, x] = getPosition(lines);
lines[y][x] = "X";
let direction = "up";


while (y !== lines.length - 1 && x !== lines[0].length - 1) {
    if (direction === "up") {
        if (lines[y - 1][x] !== "#") {
            y--;
            if (lines[y][x] !== "X") {
                lines[y][x] = "X";
            }
        } else {
            direction = "right";
        }
    }

    if (direction === "right") {
        if (lines[y][x + 1] !== "#") {
            x++;
            if (lines[y][x] !== "X") {
                lines[y][x] = "X";
            }
        } else {
            direction = "down";
        }
    }

    if (direction === "down") {
        if (lines[y + 1][x] !== "#") {
            y++;
            if (lines[y][x] !== "X") {
                lines[y][x] = "X";
            }
        } else {
            direction = "left";
        }
    }

    if (direction === "left") {
        if (lines[y][x - 1] !== "#") {
            x--;
            if (lines[y][x] !== "X") {
                lines[y][x] = "X";
            }
        } else {
            direction = "up";
        }
    }
}

const countMarks = lines => {
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === "X") {
                count++
            }
        }
    }

    return count;
}

log(countMarks(lines));