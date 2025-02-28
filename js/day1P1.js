const {log, readLines, sum, toNumber, sort, split} = require("../common.js");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

let lines = readLines('ac1.txt', split(/\s+/g, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let first = sort(lines.map(([x]) => x));
let second = sort(lines.map(([, y]) => y));

let distances = first.map((x, i) => Math.abs(second[i] - x));

log('solution #1: ', sum(distances));