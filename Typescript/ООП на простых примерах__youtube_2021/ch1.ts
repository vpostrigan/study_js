//

// Отличие процедурного подхода от объектно-ориентированного

// процедурный подход
const width = 5
const height = 10

function calcRectArea(width, height) {
    return width * height
}

calcRectArea(10, 5)


// объектно-ориентированный подход
// КЛАСС -> ОБЪЕКТ (свойства, методы, события)

// создать класс
class Rectangle {
    width
    height

    constructor(w, h) {
        this.width = w;
        this.height = h;
    }

    calcArea() {
        return this.width * this.height
    }
}
// создать объект
const rect = new Rectangle(5 ,10)
rect.calcArea()
const rect2 = new Rectangle(51 ,101)
const rect3 = new Rectangle(52 ,102)
