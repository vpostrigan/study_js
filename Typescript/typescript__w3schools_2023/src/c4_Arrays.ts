
const names: string[] = []
names.push("Dylan") // no error
// names.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.



// Type Inference
const numbers = [1, 2, 3]
numbers.push(4); // no error
// comment line below out to see the successful assignment
numbers.push("2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
let head: number = numbers[0]; // no error

