const fs = require('fs');
const data = fs.readFileSync('input5.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n');

// page order list is a list from lines[0] to lines[1175]
// each page order list is in the format: 'number | number', and must be converted to an array of two numbers [number, number] 
const pageOrderList = lines.slice(0, 1176).map(page => page.split('|').map(Number));

// sequence of pages updates from lines[1176] to end
const pageUpdates = lines.slice(1177).map(page => page.split(',').map(Number));
const checkUpdate = (subPageUpdate, j, k) => pageOrderList.some(arr => arr[0] === subPageUpdate[j] && arr[1] === subPageUpdate[k]);
const fixUpdate = subPageUpdate => {
    let temp = 0;
    for (let i = subPageUpdate.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (checkUpdate(subPageUpdate, i, j) === false) {
                temp = subPageUpdate[i];
                subPageUpdate[i] = subPageUpdate[j];
                subPageUpdate[j] = temp;
            }
        }
    }
    return subPageUpdate[Math.floor(subPageUpdate.length / 2)];
}

const sumMedianRightUpdates = pageUpdates => {
    let wrongUpdateFixedMedianSum = 0;
    let rightUpdateMedianSum = 0;
    let safeUpdate = true;

    outerLoop:
    for (let i = 0; i < pageUpdates.length; i++) {
        for (let j = 0; j < pageUpdates[i].length - 1; j++) {
            for (let k = j + 1; k < pageUpdates[i].length; k++) {
                safeUpdate = checkUpdate(pageUpdates[i], j, k);
                if (safeUpdate === false) {
                    wrongUpdateFixedMedianSum += fixUpdate(pageUpdates[i]);
                    continue outerLoop;
                }
            }
        }
        if (safeUpdate === true) {
            rightUpdateMedianSum += pageUpdates[i][Math.floor(pageUpdates[i].length / 2)];
        }
    }

    return [rightUpdateMedianSum, wrongUpdateFixedMedianSum];
}


log(sumMedianRightUpdates(pageUpdates));
//