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
// Наследование
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
    }
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
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Employee;
}(Person));
var employee1 = new Employee("Test", "Test2", 15);
console.log(employee1);
// //
var Employee2 = /** @class */ (function (_super) {
    __extends(Employee2, _super);
    function Employee2(firstName, lastName, age, inn, number, snils) {
        var _this = _super.call(this, firstName, lastName, age) || this;
        _this.inn = inn;
        _this.number = number;
        _this.snils = snils;
        return _this;
    }
    return Employee2;
}(Person));
//const employee2 = new Employee2("Test", "Test2", 15)
//console.log(employee2)
