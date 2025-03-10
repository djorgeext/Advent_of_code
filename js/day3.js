const fs = require('fs');
const data = fs.readFileSync('input3.txt', 'utf8');
const log = console.log;

const regexSentence = /mul\(\d{1,3},\d{1,3}\)/g;
const regexNumber = /\d{1,3}/g;
const found = [...data.matchAll(regexSentence)];

const mulSum = (found) => {
    let accumulator = 0;
    let numbers = [];
    for (let i = 0; i < found.length; i++) {
        numbers = found[i][0].match(regexNumber).map(num => parseInt(num, 10));
        accumulator += numbers[0] * numbers[1];
    };
    return accumulator;
}

log('Parte 1',mulSum(found));

// Parte 2
const regex1stOccurrence = /^(.*?)do\(\)/g;
const found1st =[...data.match(regex1stOccurrence)[0].matchAll(regexSentence)];
const accumulator1st = mulSum(found1st);
const regexFrom2ndOccurrence = /do\(\)(.*?)(?=don't\(\))/gs;
const subData = [...data.matchAll(regexFrom2ndOccurrence)];

let accumulator2nd = 0;
let found2nd = [];
for (let i = 0; i < subData.length; i++) {
    found2nd = [...subData[i][1].matchAll(regexSentence)];
    accumulator2nd += mulSum(found2nd);
}

log('Parte 2', accumulator1st + accumulator2nd);
