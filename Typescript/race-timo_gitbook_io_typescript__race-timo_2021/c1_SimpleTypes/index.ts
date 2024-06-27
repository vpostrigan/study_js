// [Простые типы]


// [Объявление переменной с определенным типом]
const a: number = 10
// const a2: number = "it's a string"; //Error: Type '"it's a string"' is not assignable to type 'number'.(2322)
const b: string = "it's a string";
const c: boolean = true;

// [Массивы]
const a20: number[] = [1, 2, 3]
const a21: Array<number> = [1, 2, 3]
const a22: Array<number> = a20 // Array<number> == number[]

let a30: number = 10;
// console.log(a3.length); //Error: Property 'length' does not exist on type 'number'.(2339)
const b30: number[] = [10];
const b31: number[] = [];
console.log(b30.length); // 1
console.log(b31.length); // 0


// [Кортеж (Tuple)]
// переменная, которой можно присвоить массив только с одним элементом и тип этого элемента должен быть числом
const a40: [number] = [1];
// const a41: [number] = []; //Error: Property '0' is missing in type '[]' but required in type '[number]'.(2741)
// const b42: [number] = ["123"]; //Error: Type 'string' is not assignable to type 'number'.(2322)
// const c43: [number] = [1, 2];
/* Error:
Type '[number, number]' is not assignable to type '[number]'.
    Types of property 'length' are incompatible.
        Type '2' is not assignable to type '1'.(2322)
*/

const a41: [number, number] = [1, 2];
const b42: [string, boolean] = ["123", true];
const c43: [number[]] = [[1, 2, 3]];
const e44: [[string], [number, number], boolean[]] = [["1"], [100, 100], [true, true, false, true]];


// null и undefined
//const a51: number = null;
//const b52: number = undefined;
//const c53: number[] = null;
//const d54: [string, string] = null;
//const e55: [string, string] = [null, null];


// [Автоматический вывод типов]
// В TypeScript любой литерал имеет тип. Например

// 10 // имеет тип number
// "abav" // string
// [1, 2, 3] // number[] а не кортеж [number, number, number]
const a60 = 10; // a: number
const b61 = a60; // b: number
const c62 = a60 + b61; // c: number
const d63 = c62 - 2 * a60 === 0; // d: boolean

let a70: [number, number];
const b70 = [1, 2];
// нужно явно указать кортеж
// a70 = b70; // Error: Type 'number[]' is missing the following properties from type '[number, number]': 0, 1(2739)
// так будет работать
const b71: [number, number] = [1, 2];
a70 = b71;

