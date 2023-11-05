//

// Наследование
class Person {
    private _firstName
    private _lastName
    private _age

    constructor(firstName, lastName, age) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
    }

    public get fullName() {
        return `fullname ${this._firstName} ${this._lastName}`
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
        if (this._age < 0)
            this._age = 0
    }
}

class Employee extends Person {

}

const employee1 = new Employee("Test", "Test2", 15)
console.log(employee1)

// //

class Employee2 extends Person {
    private inn
    private number
    private snils

    constructor(firstName, lastName, age, inn, number, snils) {
        super(firstName, lastName, age);
        this.inn = inn;
        this.number = number;
        this.snils = snils;
    }
}

const employee2 = new Employee2("Test", "Test2", 15, 1, 2, 3)
console.log(employee2)

// //

class Developer extends Employee2 {
    private level

    constructor(firstName, lastName, age, inn, number, snils, level) {
        super(firstName, lastName, age, inn, number, snils);
        this.level = level;
    }
}

const d = new Developer("Test", "Test2", 15, 1, 2, 3, 4)
// вызвали метод из parent класса
console.log(d.fullName)
