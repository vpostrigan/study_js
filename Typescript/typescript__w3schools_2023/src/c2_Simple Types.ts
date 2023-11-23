
// Explicit Type
let firstName1: string = "Dylan"

// Implicit Type  (TypeScript will "guess" the type, based on the assigned value)
let firstName2 = "Dylan"


// [Error In Type Assignment]
let firstName: string = "Dylan"; // type string
firstName = 33; // attempts to re-assign the value to a different type


// [Unable to Infer]
// TypeScript may not always properly infer what the type of a variable may be

const json = JSON.parse("55");
// Most expect json to be an object, but it can be a string or a number like this example
console.log(typeof json);


