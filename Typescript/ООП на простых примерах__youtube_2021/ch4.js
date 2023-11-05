//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
    }
    Person.prototype.greeting = function () {
        console.log("Person. My name is".concat(this._firstName));
    };
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return "fullname ".concat(this._firstName, " ").concat(this._lastName);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (value) {
            this._age = value;
            if (this._age < 0)
                this._age = 0;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(firstName, lastName, age, inn, number, snils) {
        var _this = _super.call(this, firstName, lastName, age) || this;
        _this.inn = inn;
        _this.number = number;
        _this.snils = snils;
        return _this;
    }
    Employee.prototype.greeting = function () {
        console.log("Employee. My name is".concat(this._firstName));
    };
    return Employee;
}(Person));
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer(firstName, lastName, age, inn, number, snils, level) {
        var _this = _super.call(this, firstName, lastName, age, inn, number, snils) || this;
        _this.level = level;
        return _this;
    }
    Developer.prototype.greeting = function () {
        console.log("Developer. My name is".concat(this._firstName));
    };
    return Developer;
}(Employee));
var person1 = new Person("Test0", "Test2", 15);
var employee1 = new Employee("Test1", "Test2", 15, 1, 2, 3);
var developer1 = new Developer("Test2", "Test2", 15, 1, 2, 3, 4);
console.log(person1.greeting()); // Person. My name isTest
console.log(employee1.greeting()); // Employee. My name isTest
console.log(developer1.greeting()); // Developer. My name isTest
