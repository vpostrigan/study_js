//

// [var keyword]
// Difference between let and var keyword
// var statement is used to declare a variable in JavaScript.
// A variable declared with the var keyword is defined throughout the program.

// Example
var greeter = "hey hi";
var times = 5;
if (times > 3) {
    var greeter = "Say Hello JavaTpoint";
}
console.log(greeter) // Say Hello JavaTpoint


// [let keyword]
// let statement is used to declare a local variable in TypeScript.
// The let keyword can enhance our code readability and decreases the chance of programming error.
// A variable declared with the let keyword is limited to the block-scoped only.

// Example
let times2 = 5;
if (times2 > 3) {
    let hello2 = "Say Hello JavaTpoint";
    console.log(hello2) // Say Hello JavaTpoint
}
// console.log(hello2) // Compile error: greeter is not defined



// COMPARE
// 1) - [var] The var keyword was introduced with JavaScript.
//    - [let] The let keyword was added in ES6 (ES 2015) version of JavaScript.

// 2) - [var] It has global scope.
//    - [let] It is limited to block scope.

// 3) - [var] It can be declared globally and can be accessed globally.
//    - [let] It can be declared globally but cannot be accessed globally.

// 4) - [var] Variable declared with var keyword can be re-declared and updated in the same scope.
function varGreeter(){
    var a = 10;
    var a = 20; //a is replaced
    console.log(a);
}
varGreeter();
//    - [let] Variable declared with let keyword can be updated but not re-declared.
// Example:
function varGreeter2(){
    let a = 10;
    // let a = 20; // TS2451: Cannot redeclare block-scoped variable 'a'.
    console.log(a);
}
varGreeter2();

// 5) - [var] It is hoisted.
{
    console.log(c); // undefined.
    //Due to hoisting
    var c = 2;
}
//    - [let] It is not hoisted.
{
    // console.log(b); // ReferenceError:
    //b is not defined
    let b = 3;
}
