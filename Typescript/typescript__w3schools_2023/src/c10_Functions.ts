// TypeScript Functions

// the `: number` here specifies that this function returns a number
function getTime(): number {
  return new Date().getTime();
}


// [Void Return Type]
function printHello(): void {
  console.log('Hello!');
}


// [Parameters]
function multiply(a: number, b: number) {
  return a * b
}


// [Optional Parameters]
function add(a: number, b: number, c?: number) {
  return a + b + (c || 0);
}


// [Default Parameters]
function pow(value: number, exponent: number = 10) {
  return value ** exponent
}


// [Named Parameters]
function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
  return dividend / divisor;
}


// [Rest Parameters]
function add2(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}


// [Type Alias]
type Negate = (value: number) => number;
// parameter `value` automatically gets assigned the type `number` from the type `Negate`
const negateFunction: Negate = (value) => value * -1;
