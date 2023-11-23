
// Type: any
// any is a type that disables type checking

let u = true;
u = "string"; // Error: Type 'string' is not assignable to type 'boolean'.
Math.round(u); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number'.

let v: any = true;
v = "string"; // no error as it can be "any" type
Math.round(v); // no error as it can be "any" type



// Type: unknown
// unknown is a similar, but safer alternative to any.

let w: unknown = 1;
w = "string"; // no error
w = {
  runANonExistentMethod: () => {
    console.log("I think therefore I am");
  }
} as { runANonExistentMethod: () => void }

// How can we avoid the error for the code commented out below when we don't know the type?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if (typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod();
}
// Although we have to cast multiple times we can do a check in the if to secure our type and have a safer casting


// unknown is best used when you don't know the type of data being typed.
// To add a type later, you'll need to cast it.



// Type: never
let x: never = true; // Error: Type 'boolean' is not assignable to type 'never'.
// never is rarely used, especially by itself, its primary use is in advanced generics.



// Type: undefined & null
let y: undefined = undefined;
let z: null = null;
// These types don't have much use unless strictNullChecks is enabled in the tsconfig.json file.



//