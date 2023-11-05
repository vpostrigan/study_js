"use strict";
// [1] var - Хойстинг (всплытие объявления) в typescript
foo = 123;
console.log(foo);
var foo;
// компилятор сначала смотрит все 'var'
// тоже самое и с функциями (сначала можно вызвать а потом объявить)
bar();
function bar() {
    console.log('I am bar function');
}
// [2] let - объявили вверху и использовали внизу (only)
var test = 100;
console.log(test);
// let видна только в блоке из фигурных скобок
{
    var test_1 = 'dddd';
    console.log(test_1); // будет 'dddd'
}
console.log(test); // будет 100
// [3] проблема асинхронного цикла
var array = [1, 2, 3];
for (var i = 0; i < array.length; i++) {
    setTimeout(function () {
        // i == undefined во всех случаях, так как вызвало 'array[3]' == undefined
        console.log(array[i]);
    }, 1000);
}
var _loop_1 = function (i_1) {
    setTimeout(function () {
        // будет работать так как i будет создаваться для каждой итерации
        console.log(array[i_1]);
    }, 1000);
};
for (var i_1 = 0; i_1 < array.length; i_1++) {
    _loop_1(i_1);
}
// другое решение использовать forEach
array.forEach(function (value) {
    setTimeout(function () {
        console.log('ForEach ' + value);
    }, 1000);
});
// [4] const
// сначала писать const, если нужно менять значение поменять на let
var VALUE = 500;
// VALUE = 100; - будет ошибка компиляции
// объекты
var OBJECT = {
    foo: 123,
    bar: 'test'
};
OBJECT.foo = 321;
OBJECT.bar = 'qwerty';
console.log(OBJECT);
// OBJECT = {}; - будет ошибка компиляции
// массивы
var names = ['John', 'Max'];
names.push('Ivan'); // можно добавить элемент
console.log(names);
