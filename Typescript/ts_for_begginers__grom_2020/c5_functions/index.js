// 1) functions
function sum(a, b) {
    return a + b;
}
console.log('sum: ' + sum(1, 2)); // 3
//console.log('sum: ' + sum(1, '2')); // error
// 'Error' - предустановленное значение, необязательный параметр
function log(message, type) {
    if (type === void 0) { type = 'Error'; }
    console.log("".concat(type, ": ").concat(message));
}
log('Got error'); // будет сообщение 'Error: Got error'
log('Log info', 'Info'); // будет сообщение 'Info: Log info'
// 2) Arrow functions
var fullName = function (firstName, lastName) { return "".concat(firstName, " ").concat(lastName); };
console.log(fullName('Max', 'Grom')); // Max Grom
function greatSum(a) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (!rest.length) {
        return a; // ...rest - массив пустой
    }
    return rest.reduce(function (ac, item) { return ac + item; }, a);
}
console.log(greatSum(10)); // 10
console.log(greatSum(10, 11)); // 21
console.log(greatSum(10, 11, 12)); // 33
function overloadedSum(a) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (!rest.length) {
        return a;
    }
    return rest.reduce(function (ac, item) { return ac + item; }, a);
}
console.log(overloadedSum(1)); // 1
console.log(overloadedSum(1, 5, 55, 23, 44)); // 128
console.log(overloadedSum('5', '5', '33', '55', '11')); // 55335511
// 4) Callback as param
function sumWithCallback(callback, // объявление типа ') => number'
a) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    if (!rest) {
        return a;
    }
    return rest.reduce(callback);
}
console.log(sumWithCallback(function (ac, item) { return ac + item; }, 1, 5, 55, 23, 44));
