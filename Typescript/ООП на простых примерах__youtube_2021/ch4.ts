//

// tsc -t es5 .\ch4.ts
// node .\ch4.js

// Полиморфизм

// Два вида: параметрический (истинный) и ad-hoc (мнимый)

// //

// ad-hoc (мнимый) (перегрузка методов)
/*
class Calculator {
    add(a: number, b: number): number {
        return a + b
    }

    add(a: string, b: string): string {
        return a + b
    }
}
add(5,5)
add("5", "5")
*/

// //

// параметрический

class Person {
    protected _firstName
    private _lastName
    private _age

    constructor(firstName, lastName, age) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
    }

    public greeting() {
        console.log(`Person. My name is${this._firstName}`)
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
    private inn
    private number
    private snils

    constructor(firstName, lastName, age, inn, number, snils) {
        super(firstName, lastName, age);
        this.inn = inn;
        this.number = number;
        this.snils = snils;
    }

    public greeting() {
        console.log(`Employee. My name is${this._firstName}`)
    }
}

class Developer extends Employee {
    private level

    constructor(firstName, lastName, age, inn, number, snils, level) {
        super(firstName, lastName, age, inn, number, snils);
        this.level = level;
    }

    public greeting() {
        console.log(`Developer. My name is${this._firstName}`)
    }
}

const person1: Person = new Person("Test0", "Test2", 15)
const employee1: Employee = new Employee("Test1", "Test2", 15, 1, 2, 3)
const developer1: Developer = new Developer("Test2", "Test2", 15, 1, 2, 3, 4)

console.log(person1.greeting()) // Person. My name isTest0
console.log(employee1.greeting()) // Employee. My name isTest1
console.log(developer1.greeting()) // Developer. My name isTest2

// //

// Все были указаны как Person, но отработали по классам. Данное поведение называется полиморфизмом
// Person. My name isTest0
// Employee. My name isTest1
// Developer. My name isTest2
const personList: Person[] = [person1, employee1, developer1]
function massGreeting(persons: Person[]) {
    for (let i = 0; i < persons.length; i++) {
        const person = persons[i]
        person.greeting()
    }
}
massGreeting(personList)
