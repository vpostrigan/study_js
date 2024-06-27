// TypeScript Basic Generics

// [Functions]
function createPair<S, T>(v1: S, v2: T): [S, T] {
  return [v1, v2];
}

console.log(createPair<string, number>('hello', 42)); // ['hello', 42]


// [Classes]
class NamedValue<T> {
  private _value: T | undefined;

  constructor(private name: string) {
  }

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

let value = new NamedValue<number>('myNumber');
value.setValue(10);
console.log(value.toString()); // myNumber: 10


// [Type Aliases]
type Wrapped<T> = { value: T };
// or interface Wrapped<T> {
const wrappedValue: Wrapped<number> = {value: 10};


// [Default Value]
class NamedValue2<T = string> {
  private _value: T | undefined;

  constructor(private name: string) {}

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

let value2 = new NamedValue2('myNumber');
value2.setValue('myValue');
console.log(value2.toString()); // myNumber: myValue


// [Extends]
