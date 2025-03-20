
const fs = require('fs');
const data = fs.readFileSync('input4.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n');


/* // Part 1
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
            // search in column direction an diagonal upToDown
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
            // search in diagonal downToUp
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

log(findMatches(lines)); */

// Part 2
const forwardMatch = "MAS";
const backwardMatch = "SAM";
const lenMatch = forwardMatch.length;

const xMatches = lines => {
    let count = 0;
    let subStringUpToDownDiagonal = '';
    let subStringDownToUpDiagonal = '';

    for (let i = 0; i < lines.length - lenMatch + 1; i++) {
        for (let j = 0; j < lines[i].length - lenMatch + 1; j++) {
            subStringUpToDownDiagonal = lines[i][j] + lines[i + 1][j + 1] + lines[i + 2][j + 2];
            if (subStringUpToDownDiagonal === forwardMatch || subStringUpToDownDiagonal === backwardMatch) {
                subStringDownToUpDiagonal = lines[i + 2][j] + lines[i + 1][j + 1] + lines[i][j + 2];
                if (subStringDownToUpDiagonal === forwardMatch || subStringDownToUpDiagonal === backwardMatch) {
                    count++;
                }
            }
        }
    }
    return count;
}

log(xMatches(lines));