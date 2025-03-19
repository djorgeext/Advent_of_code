const fs = require('fs');
const data = fs.readFileSync('input4.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n');
const forwardMatch = "XMAS";
const backwardMatch = "SAMX";
const lenMatch = forwardMatch.length;

const findMatches = lines => {
    let countForward = 0;
    let countBackward = 0;
    let subStringRow = '';
    let subStringCol = '';
    let subStringDiagonal = '';
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            // search in row direction
            subStringRow = lines[i].slice(j, j + lenMatch);
            if (subStringRow === forwardMatch) {
                countForward++;
            }
            if (subStringRow === backwardMatch) {
                countBackward++;
            }
            // search in column direction an right diagonal
            if (i < lines.length - lenMatch + 1) {
                subStringCol = lines[i][j] + lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j];
                if (subStringCol === forwardMatch) {
                    countForward++;
                }
                if (subStringCol === backwardMatch) {
                    countBackward++;
                }
                if (j < lines[i].length - lenMatch + 1) {
                    subStringDiagonal = lines[i][j] + lines[i + 1][j + 1] + lines[i + 2][j + 2] + lines[i + 3][j + 3];
                    if (subStringDiagonal === forwardMatch) {
                        countForward++;
                    }
                    if (subStringDiagonal === backwardMatch) {
                        countBackward++;
                    }
                }

            }
            // search in left diagonal
            if (i >= lenMatch - 1 && j < lines[i].length - lenMatch + 1) {
                subStringDiagonal = lines[i][j] + lines[i - 1][j + 1] + lines[i - 2][j + 2] + lines[i - 3][j + 3];
                if (subStringDiagonal === forwardMatch) {
                    countForward++;
                }
                if (subStringDiagonal === backwardMatch) {
                    countBackward++;
                }
            }
        }
    }
    return countBackward + countForward;
}

log(findMatches(lines));