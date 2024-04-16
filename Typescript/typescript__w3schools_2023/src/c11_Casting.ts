// TypeScript Casting

// Casting is the process of overriding a type.

// [Casting with as]
let x_c11_1: unknown = 'hello';
console.log((x_c11_1 as string).length);


// Casting doesn't actually change the type of the data within the variable
let x_c11_2: unknown = 4;
console.log((x_c11_2 as string).length); // prints undefined since numbers don't have a length


// [Casting with <>]
// Using <> works the same as casting with as.
let x_c11_3: unknown = 'hello';
console.log((<string>x_c11_3).length);


// [Force casting]
// To override type errors that TypeScript may throw when casting, first cast to unknown,
// then to the target type.
let x_c11_4 = 'hello';
// console.log(((x_c11_4 as unknown) as number).length); // x is not actually a number so this will return undefined