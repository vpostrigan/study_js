// 1) functions
function sum(a: number, b: number): number {
    return a + b;
}

console.log('sum: ' + sum(1, 2)); // 3
//console.log('sum: ' + sum(1, '2')); // error


// 'Error' - предустановленное значение, необязательный параметр
function log(message: string, type: string = 'Error'): void {
    console.log(`${type}: ${message}`);
}

log('Got error'); // будет сообщение 'Error: Got error'
log('Log info', 'Info'); // будет сообщение 'Info: Log info'


// 2) Arrow functions
const fullName = (firstName: string, lastName: string): string => `${firstName} ${lastName}`;
console.log(fullName('Max', 'Grom')); // Max Grom

function greatSum(a: number, ...rest: number[]): number {
    if (!rest.length) {
        return a; // ...rest - массив пустой
    }
    return rest.reduce((ac: number, item) => ac + item, a);
}

console.log(greatSum(10)); // 10
console.log(greatSum(10, 11)); // 21
console.log(greatSum(10, 11, 12)); // 33


// 3) Overload - перегрузка функций
function overloadedSum(a: string, ...rest: string[]): string;
function overloadedSum(a: number, ...rest: number[]): string;

function overloadedSum(a: any, ...rest: Array<any>): any {
    if (!rest.length) {
        return a;
    }
    return rest.reduce((ac, item) => ac + item, a);
}

console.log(overloadedSum(1)); // 1
console.log(overloadedSum(1, 5, 55, 23, 44)); // 128
console.log(overloadedSum('5', '5', '33', '55', '11')); // 55335511


// 4) Callback as param
function sumWithCallback(callback: (ac: number, item: number) => number, // объявление типа ') => number'
                         a: number,
                         ...rest: number[]): number {
    if (!rest) {
        return a;
    }
    return rest.reduce(callback);
}

console.log(sumWithCallback((ac, item) => ac + item, 1, 5, 55, 23, 44)); // 127
