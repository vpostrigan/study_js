
// Numeric Enums - Default

enum CardinalDirections {
  North,
  East,
  South,
  West
}
let currentDirection = CardinalDirections.North
// logs 0
console.log(currentDirection);
// throws error as 'North' is not a valid enum
currentDirection = 'North'; // Error: "North" is not assignable to type 'CardinalDirections'.



// Numeric Enums - Initialized
enum CardinalDirections2 {
  North = 1, // You can set the value of the first numeric enum and have it auto increment from that:
  East,
  South,
  West
}
// logs 1
console.log(CardinalDirections2.North);
// logs 4
console.log(CardinalDirections2.West);



// Numeric Enums - Fully Initialized
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
// logs 404
console.log(StatusCodes.NotFound);
// logs 200
console.log(StatusCodes.Success);



// String Enums
enum CardinalDirections3 {
  North = 'North',
  East = "East",
  South = "South",
  West = "West"
};
// logs "North"
console.log(CardinalDirections.North);
// logs "West"
console.log(CardinalDirections.West);
