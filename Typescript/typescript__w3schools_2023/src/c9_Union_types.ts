
// TypeScript Union Types

// (when a value can be more than a single type (like string or number))

// Union | (OR) (Using the | we are saying our parameter is a string or number)
function printStatusCode(code: string | number) {
  console.log(`My status code is ${code}.`)
}
printStatusCode(404);
printStatusCode('404');


// [Union Type Errors]
function printStatusCode2(code: string | number) {
  console.log(`My status code is ${code.toUpperCase()}.`)
  // error: Property 'toUpperCase' does not exist ontype 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'
}

