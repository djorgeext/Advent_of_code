const fs = require('fs');

function readLines(filename, mapLine = x => x, separator = '\n') {
    return fs.readFileSync(filename, 'utf-8').trimEnd().split(separator).map(mapLine);
}

function readCharArrays(filename, mapChar = x => x) {
    let lines = readLines(filename, x => [...x].map(mapChar));
    lines.height = lines.length;
    lines.width = lines[0].length;
    return lines;
}

function readSingletonMaps(filename, mapValue = x => x, regex = /^(\S+)\s+(.*)/) {
    return readLines(filename, x => x.match(regex))
        .map(([, x, y]) => ({[x]: mapValue(y)}));
}

function toNumber(val) {
    return Number(val);
}

function split(regex, mapValue = x => x) {
    return line => line.split(regex).map(mapValue);
}

function shiftUntil(arr, condition = x => !x, mapValue = x => x) {
    let result = [];
    for (let elem; !condition(elem = arr.shift());) {
        result.push(mapValue(elem));
    }
    return result;
}

function forEach(arr, val, callback) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] === val && callback(i);
    }
}

function forEach2D(arr, val, callback) {
    for (let i = 0; i < arr.length; i++) {
        for (let line = arr[i], j = 0; j < line.length; j++) {
            line[j] === val && callback(j, i);
        }
    }
}

function forEach3D(arr, val, callback) {
    for (let i = 0; i < arr.length; i++) {
        for (let line = arr[i], j = 0; j < line.length; j++) {
            for (let row = line[j], k = 0; k < row.length; k++) {
                row[k] === val && callback(k, j, i);
            }
        }
    }
}

function sum(arr) {
    return arr.reduce((x, y) => x + y, 0);
}

function prod(arr) {
    return arr.reduce((x, y) => x * y, 1);
}

function sort(arr, reverse = false) {
    return arr.sort((x, y) => reverse ? y - x : x - y);
}

function median(arr) {
    if (arr.length) {
        let sorted = sort(arr, true);
        let middle = Math.floor(arr.length / 2);
        return arr.length % 2 ? sorted[middle] : (sorted[middle] + sorted[middle - 1]) / 2;
    }
}

function min(arr) {
    return arr.reduce((a,b) => a < b ? a : b);
}

function max(arr) {
    return arr.reduce((a,b) => a > b ? a : b);
}

function map(arr, entryFunc = x => x) {
    return arr.reduce((map, x) => {
        const [key, val] = entryFunc(x);
        map[key] = val;
        return map;
    }, {});
}

function key(items) {
    return [...(arguments.length === 1 && typeof items === "object" ? items : arguments)].join(':');
}

function unkey(key, mapping = x => x) {
    return key.split(':').map(mapping);
}

function cache(func, keyMapping = x => key(x)) {
    const cache = new Map();
    return Object.assign(function() {
        const key = keyMapping.apply(this, arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, arguments);
        cache.set(key, result);
        return result;
    }, {cache});
}

class ObjectSet extends Set {
    values = new Map();

    add(elem) {
        let k = key(elem);
        this.values.set(k, elem);
        return super.add(k);
    }

    delete(elem) {
        let k = key(elem);
        this.values.delete(k);
        return super.delete(k);
    }

    has(elem) {
        return super.has(key(elem));
    }

    forEach(callbackfn, thisArg) {
        const values = this.values;
        super.forEach((k, v, s) => callbackfn.call(thisArg, values.get(k), values.get(k), s));
    }

    [Symbol.iterator]() {
        const iter = super[Symbol.iterator]();
        const values = this.values;
        return {
            next() {
                const result = iter.next();
                if (!result.done) {
                    result.value = values.get(result.value);
                }
                return result;
            },
        };
    }
}

function set(...items) {
    const result = new ObjectSet();
    items.forEach(x => result.add(x));
    return result;
}

function spanYX(y, x, dy = 1, dx = 1) {
    return [...Array(2 * dy + 1).keys()].flatMap(j =>
        [...Array(2 * dx + 1).keys()].map(i => [y + j - dy, x + i - dx])
    );
}

function unique(arr) {
    const result = set(...arr);
    result.delete(undefined);
    return [...result];
}

function intersect(arr1, arr2) {
    const result = [];
    for (let x of arr1) {
        if (arr2.includes(x)) {
            result.push(x);
        }
    }
    return result;
}

function ggT2(x, y) {
    return y === 0 ? Math.abs(x) : ggT2(y, x % y);
}

function ggT(x, y, ...more) {
    if (typeof x === 'object') {
        return ggT(...x);
    }
    return more.length ? ggT(ggT2(x, y), ...more) : ggT2(x, y);
}

function kgV(items) {
    let args = [...(typeof items === "object" ? items : arguments)];
    return prod(args) / ggT(args);
}

function range(len) {
    return [...Array(len).keys()];
}

function mod(a, b) {
    return ((a % b) + b) % b;
}

function binarySearch(lowerBound, upperBound, conditionCallback) {
    while (lowerBound < upperBound) {
        let mid = Math.floor((lowerBound + upperBound) / 2);
        if (conditionCallback(mid)) {
            upperBound = mid;
        } else {
            lowerBound = mid + 1;
        }
    }
    return lowerBound;
}

module.exports = {
    readLines,
    readCharArrays,
    readSingletonMaps,
    map,
    split,
    toNumber,
    shiftUntil,
    forEach,
    forEach2D,
    forEach3D,
    key,
    unkey,
    cache,
    set,
    min,
    max,
    sort,
    sum,
    prod,
    median,
    spanYX,
    unique,
    intersect,
    kgV,
    ggT,
    range,
    mod,
    binarySearch,
    log: console.log
};