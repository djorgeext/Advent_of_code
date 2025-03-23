const fs = require('fs');
const data = fs.readFileSync('input5.txt', 'utf8');
const log = console.log;
const lines = data.trim().split('\n');

// page order list is a list from lines[0] to lines[1175]
// each page order list is in the format: 'number | number', and must be converted to an array of two numbers [number, number] 
const pageOrderList = lines.slice(0, 1176).map(page => page.split('|').map(Number));

// sequence of pages updates from lines[1176] to end
const pageUpdates = lines.slice(1177).map(page => page.split(',').map(Number));

let rightUpdateMedian = 0;

for (let i = 0; i < pageUpdates.length; i++) {
    
}


//log(pageOrderList);