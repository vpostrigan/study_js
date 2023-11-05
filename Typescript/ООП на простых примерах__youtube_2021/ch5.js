//
// [Агрегация и композиция]
// Взаимодействие между классами
// Композиция
// Класс Авто (содержит объект класса Двигатель, объект класса Колесо, они не могут существовать без Класс Авто)
var Car = /** @class */ (function () {
    function Car() {
        // композиция
        this.engine = new Engine();
        this.wheels = [];
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
        this.wheels.push(new Wheel());
    }
    // делегирование
    Car.prototype.drive = function () {
        this.engine.drive();
        for (var i = 0; i < this.wheels.length; i++) {
            this.wheels[i].drive();
        }
    };
    return Car;
}());
var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.prototype.drive = function () {
        console.log("Engine is working");
    };
    return Engine;
}());
var Wheel = /** @class */ (function () {
    function Wheel() {
    }
    Wheel.prototype.drive = function () {
        console.log("Wheel is working");
    };
    return Wheel;
}());
var car = new Car();
car.drive();
