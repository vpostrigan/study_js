// https://www.youtube.com/watch?v=b598TqLzBb4    TypeScript за 2 минуты

// 1) установка Typescript
// $ sudo npm i -g typescript

// 2) main.ts
const hello: string = 'Hello World!'
console.log(hello)

// 3) $ tsc main.ts

// 4) Start
// $ node main

// 5) tsc --init
// создаст tsconfig.json      для настроек


// типы
const myNumber: number = 42
const myString: string = 'Hello'
const myBoolean: boolean = false

// функция
function sum(a: number, b: number): number {
    return a + b
}

// массив
const numbers: number[] = [1, 2, 3]
const strings: string[] = ['a', 'b', 'c']

// специальный тип any (игнорирует проверку типизации)
let a: any = '1'
a = () => 1 // можно положить любой тип


// для использования двух типов (union type)
function addOne(num: number | string): number {
    return 1 + Number(num)
}

// что бы так каждый раз не писать
type NumberOrString = number | string

function addOne2(num: NumberOrString): number {
    return 1 + Number(num)
}


// типизация объекта
const person: {
    name: string
    age: number
    hobbies: string[]
} = {
    name: 'V',
    age: 29,
    hobbies: ['youtube', 'sports'],
}

// можно вынести в interface
interface User {
    name: string
    age: number
    hobbies: string[]
}

const person2: User = {
    name: 'V',
    age: 29,
    hobbies: ['youtube', 'sports'],
}


// специальный тип unknown, если мы не знаем что это за тип, но узнаем позже
let a2: unknown = 42
let b2 = a2 === 42 ? 'hello' : 'world'


// если функция никогда не заканчивается, используем never
function infinite(): never {
    while (true) {
        console.log(1 + 1)
    }
}


// классы
class User2 {
    public name: string
    protected weight: number
    private age: number

    constructor(name: string) {
        this.name = name
    }
}


// Generic
function half<T>(array: T[]): T[] {
    return array.slice(0, array.length / 2)
}

// Generic с ограничениями
function half2<T extends number | string>(array: T[]): T[] {
    return array.slice(0, array.length / 2)
}
