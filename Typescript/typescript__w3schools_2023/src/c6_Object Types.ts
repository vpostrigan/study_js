const car: { type: string, model: string, year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009
}



// Type Inference
const car2 = {
  type: "Toyota"
}
car2.type = "Ford"; // no error
car2.type = 2; // Error: Type 'number' is not assignable to type 'string'.



// Optional Properties

// Example without an optional property
const car3: { type: string, mileage: number } = {
  // Error: Property 'mileage' is missing in type '{ type: string; }' but required in type '{ type: string; mileage: number; }'.
  type: "Toyota",
}
car3.mileage = 2000;

// Example with an optional property
const car4: { type: string, mileage?: number } = { // no error
  type: "Toyota"
};
car4.mileage = 2000;

// Index Signatures
const nameAgeMap: { [index: string]: number} = {}
nameAgeMap.Mark = 25; // no error
nameAgeMap.Mark = "Fifty"; // Error: Type 'string' is not assignable to type 'number'.

