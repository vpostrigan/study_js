// TypeScript Classes

// [Members: Types]
class Person {
  // @ts-ignore
  name: string;
}

const person = new Person();
person.name = "Jane";


// [Members: Visibility]
// There are three main visibility modifiers in TypeScript:
// public - (default) allows access to the class member from anywhere
// private - only allows access to the class member from within the class
// protected - allows access to the class member from itself and any classes that inherit it,
//             which is covered in the inheritance section below

class Person_c12_2 {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const person_c12_2 = new Person_c12_2("Jane");
//console.log(person_c12_2.name); // person.name isn't accessible from outside the class since it's private
console.log(person_c12_2.getName());


// [Parameter Properties]
class Person_c12_3 {
  // name is a private member variable
  public constructor(private name: string) {
  }

  public getName(): string {
    return this.name;
  }
}

const person_c12_3 = new Person_c12_3("Jane");
console.log(person_c12_3.getName());


// [Readonly]
class Person_c12_4 {
  private readonly name: string;

  public constructor(name: string) {
    // name cannot be changed after this initial definition, which has to be either at it's declaration or in the constructor.
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const person_c12_4 = new Person_c12_4("Jane");
console.log(person_c12_4.getName());


// [Inheritance: Implements]
interface Shape {
  getArea: () => number;
}

class Rectangle implements Shape {
  // @ts-ignore
  public constructor(protected readonly width: number, protected readonly height: number) {
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public toString(): string {
    return `Rectangle[width=${this.width}, height=${this.height}]`;
  }
}


// [Inheritance: Extends]
class Square extends Rectangle {
  public constructor(width: number) {
    super(width, width);
  }

  // getArea gets inherited from Rectangle
}


// Override
class Square2 extends Rectangle {
  public constructor(width: number) {
    super(width, width);
  }

  // this toString replaces the toString from Rectangle
  public override toString(): string {
    return `Square[width=${this.width}]`;
  }
}


// [Abstract Classes]
