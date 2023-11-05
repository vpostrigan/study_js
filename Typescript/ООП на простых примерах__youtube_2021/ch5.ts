//

// [Агрегация и композиция]

// Взаимодействие между классами

// Композиция
// Класс Авто (содержит объект класса Двигатель, объект класса Колесо, они не могут существовать без Класс Авто)

class Car {
    engine: Engine
    wheels: Wheel[]

    constructor() {
        // композиция
        this.engine = new Engine()
        this.wheels = []
        this.wheels.push(new Wheel())
        this.wheels.push(new Wheel())
        this.wheels.push(new Wheel())
        this.wheels.push(new Wheel())
    }

    // делегирование
    drive() {
        this.engine.drive()
        for (let i = 0; i < this.wheels.length; i++) {
            this.wheels[i].drive()
        }
    }
}

class Engine {
    drive() {
        console.log("Engine is working")
    }
}

class Wheel {
    drive() {
        console.log("Wheel is working")
    }
}

const car = new Car()
car.drive()
// Engine is working
// Wheel is working
// Wheel is working
// Wheel is working
// Wheel is working

// //

class Freshener {

}

class Car2 {
    engine: Engine
    wheels: Wheel[]
    freshener: Freshener

    constructor(freshener) {
        // Агрегация
        this.freshener = freshener // freshener живет своей жизнью независимо от класса car
        // композиция
        this.engine = new Engine()
        this.wheels = []
        this.wheels.push(new Wheel())
        this.wheels.push(new Wheel())
        this.wheels.push(new Wheel())
        this.wheels.push(new Wheel())
    }

    // делегирование
    drive() {
        this.engine.drive()
        for (let i = 0; i < this.wheels.length; i++) {
            this.wheels[i].drive()
        }
    }
}

class Flat {
    freshener: Freshener

    constructor(freshener) {
        this.freshener = freshener // содержит тот же freshener что и car
    }
}
