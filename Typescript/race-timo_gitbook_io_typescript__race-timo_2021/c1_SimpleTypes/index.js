// [Простые типы]
// [Объявление переменной с определенным типом]
var a = 10;
// const a2: number = "it's a string"; //Error: Type '"it's a string"' is not assignable to type 'number'.(2322)
var b = "it's a string";
var c = true;
// [Массивы]
var a20 = [1, 2, 3];
var a21 = [1, 2, 3];
var a22 = a20; // Array<number> == number[]
var a30 = 10;
// console.log(a3.length); //Error: Property 'length' does not exist on type 'number'.(2339)
var b30 = [10];
var b31 = [];
console.log(b30.length); // 1
console.log(b31.length); // 0
