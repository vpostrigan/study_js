"use strict";
// [1] auto detected types
var number = 42;
var string = '42';
var boolean = true;
//number = '123'; // будет ошибка
// [2] direct types
// 2.1 boolean
var isActive;
isActive = true;
// isActive = 1; // error
// isActive = 11 && true && 55; // error
isActive = 11 && true && false; // value
var isTest = false;
// isTest = true; // error
// 2.2 string
var s0 = 's';
var who = "youtube";
var whatToDo = 'please';
var template = "Hello ".concat(who + '1', ", ").concat(whatToDo);
// 2.3 number
var n0 = 10;
var testNumber = 555;
testNumber = true && 77; // valid
// testNumber = false && 77; // not valid
// 2.4 null, undefined. Ни разу не пользовался
var testNull = null;
var testUndefined = undefined;
// 2.5 array
// const strings: Array<string>
