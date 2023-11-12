// Классы и интерфейсы

// [Классы и наследование]

// Представляет игру в шахматы
class Game {
    private pieces = Game.makePieces()

    private static makePieces() {
        return [
            // Благодаря строгой типизации Rank и File ввод другой буквы (например, 'J')
            // или выходящего за диапазон числа (например, 12) спровоцирует ошибку при компиляции

            // Короли
            new King('White', 'E', 1),
            new King('Black', 'E', 8),
            // Ферзи
            new Queen('White', 'D', 1),
            new Queen('Black', 'D', 8),
            // Слоны
            new Bishop('White', 'C', 1),
            new Bishop('White', 'F', 1),
            new Bishop('Black', 'C', 8),
            new Bishop('Black', 'F', 8),
        ]
    }
}

// Добавим цвет и позицию для класса Piece:
// Имея относительно немного цветов, горизонталей и вертикалей, мы можем вручную
// пронумеровать их возможные значения в виде литералов типов.
type Color1 = 'Black' | 'White'
type File1 = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank1 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// Набор координат шахматной фигуры
class Position {
    constructor(private file: File1, private rank: Rank1) {
    }

    distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        }
    }

}

// Шахматная фигура
abstract class Piece {
    protected position: Position

    constructor(private readonly color: Color1,
                file: File1,
                rank: Rank1) {
        this.position = new Position(file, rank)
    }

    // public - default
    moveTo(position: Position) {
        this.position = position
    }

    abstract canMoveTo(position: Position): boolean

}

//Есть шесть типов шахматных фигур:
// ...
class King extends Piece {
    canMoveTo(position: Position): boolean {
        let distance = this.position.distanceFrom(position)
        return distance.rank < 2 && distance.file < 2
    }
}

class Queen extends Piece {
}

class Bishop extends Piece {
}

class Knight extends Piece {
}

class Rook extends Piece {
}

class Pawn extends Piece {
}

// TypeScript поддерживает три модификатора доступа для свойств и методов класса.
//     public - Доступен отовсюду. Это уровень доступа по умолчанию.
//     protected - Доступен из экземпляров определенного класса и его подклассов.
//     private - Доступен только из экземпляров определенного класса.


// [Использование this в качестве возвращаемого типа]
let set = new Set
set.add(1).add(2).add(3)
set.has(2) // верно
set.has(4) // неверно

class Set2 {
    has(value: number): boolean {
        // ...
    }

    add(value: number): Set2 {
        // ...
    }
}

class MutableSet extends Set2 {
    delete(value: number): boolean {
        // ...
    }

    add(value: number): MutableSet { // переопределили Set2
        // ...
    }
}

// this в качестве аннотации возвращаемого типа

class Set3 {
    has(value: number): boolean {
        // ...
    }

    add(value: number): this {
        // ...
    }
}

class MutableSet3 extends Set3 {
    delete(value: number): boolean {
        // ...
    }

    // add будет автоматически иметь 'add(value: number): MutableSet3'
}

// //

// [Интерфейсы]
// Псевдонимы типов и интерфейсы — это в целом два синтаксиса для одной задачи

// - псевдоним типа
type Sushi11 = {
    calories: number
    salty: boolean
    tasty: boolean
}
// Его легко переписать в виде интерфейса:
interface Sushi12 {
    calories: number
    salty: boolean
    tasty: boolean
}
// Псевдоним типа Sushi11 можно заменить на интерфейс Sushi12.

// - комбинировать типы
type Food = {
    calories: number
    tasty: boolean
}
type Sushi = Food & {
    salty: boolean
}
type Cake = Food & {
    sweet: boolean
}
// Почти идентично вы можете проделать то же самое с интерфейсами:
interface Food21 {
    calories: number
    tasty: boolean
}
interface Sushi22 extends Food21 {
    salty: boolean
}
interface Cake23 extends Food21 {
    sweet: boolean
}
// Интерфейсы не обязательно должны расширять другие интерфейсы.
// На деле интерфейс может расширить любую форму: объект type, class или другой interface.

// - отличие типов от интерфейсов
// 1) псевдонимы типов более обобщены: их правая часть может быть любого типа,
// включая выражение типа (тип и, возможно, операции вроде & или |)
// А правая часть интерфейса должна быть формой.
// Следующие псевдонимы типов никак не переписать в виде интерфейсов:
type A51 = number
type B51 = A51 | string

// 2) при расширении интерфейса TypeScript будет проверять,
// совместим ли этот интерфейс с произведенным вами расширением:
interface A52 {
    good(x: number): string
    bad(x: number): string
}
interface B52 extends A52 {
    good(x: string | number): string
    bad(x: string): string
    // Ошибка TS2430: Interface 'B52' некорректно расширяет interface 'A52'.
    // Тип 'number' несовместим с типом 'string'.
}
// псевдонимы типов (& пересечения вместо extends) будут работать

// 3) несколько интерфейсов с одинаковым именем в одной области подвергаются автоматическому слиянию.
// А несколько одноименных псевдонимов типов в одной области будут вызывать ошибку при компиляции.
// Эта особенность называется слиянием деклараций.

// [Слияние деклараций]
// (это способ автоматического комбинирования нескольких деклараций, имеющих одинаковое имя)
interface User51 { // User51 имеет одно поле, name
    name: string
}
interface User51 { // Теперь User51 имеет два поля, name и age
    age: number
}
let a51: User51 = {
    name: 'Ashley',
    age: 30
}

// не работает с псевдонимами типов:
type User52 = { // Ошибка TS2300: повторяющийся идентификатор 'User'.
    name: string
}
type User52 = { // Ошибка TS2300: повторяющийся идентификатор 'User'.
    age: number
}

// - два интерфейса не должны конфликтовать
interface User53 {
    age: string
}
interface User53 {
    age: number // Ошибка TS2717: последующие декларации свойств должны иметь тот же тип.
} // Свойство 'age' должно иметь тип 'string', но здесь имеет тип 'number'.

// - generic должны совпадать (должны быть идентичными)
interface User54<Age extends number> { // Ошибка TS2428: все декларации 'User' должны иметь идентичные параметры типа.
    age: Age
}
interface User54<Age extends string> {
    age: Age
}

// [Реализации]
interface Animal {
    eat(food: string): void
    sleep(hours: number): void
}

class Cat51 implements Animal {
    eat(food: string) {
        console.log('Ate some', food, '. Mmm!')
    }
    sleep(hours: number) {
        console.log('Sleep for', hours, 'hours')
    }
}

// можно несколько интерфейсов
interface Animal52 {
    readonly name: string
    eat(food: string): void
    sleep(hours: number): void
}
interface Feline52 {
    meow(): void
}
class Cat52 implements Animal52, Feline52 {
    name = 'Whiskers'

    eat(food: string) {
        console.info('Ate some', food, '. Mmm!')
    }
    sleep(hours: number) {
        console.info('Slept for', hours, 'hours')
    }
    meow() {
        console.info('Meow')
    }
}


// [Классы структурно типизированы]
// Как и любые другие типы, TypeScript сравнивает классы по их структуре, а не по имени.
// (TypeScript типизирован структурно. Java - номинально)
class Zebra {
    trot() {
// ...
    }
}
class Poodle {
    trot() {
// ...
    }
}
function ambleAround(animal: Zebra) {
    animal.trot()
}
let zebra = new Zebra
let poodle = new Poodle
ambleAround(zebra) // OK
ambleAround(poodle) // OK


// [Классы объявляют и значения, и типы]
// Большая часть того, что вы можете выразить в TypeScript, оказывается либо значением, либо типом:

// значения
let a501 = 99
function b501() {}

// типы
type a502 = number
interface b502 {
    (): void
}

// Типы и значения в TypeScript относятся к разным областям имен.
// if (a + 1 > 3) //... // TypeScript выводит из контекста, что вы подразумеваете значение a
// let x: a = 3         // TypeScript выводит из контекста, что вы подразумеваете тип a

// Классы и перечисления являются особенными.
// Они генерируют как тип в пространстве типов, так и значение в пространстве значений:
class C501{}
let c501: C501 // C501 относится к типу экземпляра класса C501
    = new C501() // C501 относится к С501-значению
enum E501 {F501, G501}
let e501: E501 // E501 относится к типу перечисления E501
    = E501.F501 // E501 относится к E501-значению


// (TypeScript структурно типизирован, и связь для классов больше похожа на «выглядит как» (looks-like)
// — любой объект, реализующий ту же форму, что и класс, будет совместим с типом этого класса)
// Создадим простейшую базу данных:
type State = {
    [key: string]: string
}
class StringDatabase {
    state: State = {}
    get(key: string): string | null {
        return key in this.state ? this.state[key] : null
    }
    set(key: string, value: string): void {
        this.state[key] = value
    }
    static from(state: State) {
        let db = new StringDatabase()
        for (let key in state) {
            db.set(key, state[key])
        }
        return db
    }
}
interface StringDatabase {
    state: State
    get(key: string): string | null
    set(key: string, value: string): void
}

interface StringDatabaseConstructor {
    new(): StringDatabase // называется сигнатурой конструктора, позволяющей на языке TypeScript сказать, что данный тип может быть инстанцирован с оператором new
    from(state: State): StringDatabase
}
// Вместе два интерфейса моделируют обе стороны класса — конструктор и экземпляр класса.


// конструктор с аргументами
class StringDatabase2 {
    constructor(public state: State = {}) {}
}
interface StringDatabaseConstructor2 {
    new(state?: State): StringDatabase
    from(state: State): StringDatabase
}


// [Полиморфизм]
class MyMap<K, V> { // Здесь K и V доступны для каждого метода и свойства экземпляра в MyMap.
    constructor(initialKey: K, initialValue: V) {
        //
    }
    get(k: K): V {
        //
    }
    set(key: K, value: V): void {
        // ...
    }
    merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
        // Методы экземпляра имеют доступ к обобщенным типам уровня класса
        // и также могут объявлять свои собственные обобщенные типы поверх них (K1 и V1)

        // ...
    }
    static of<K, V>(k: K, v: V): MyMap<K, V> {
        // Статические методы не имеют доступа к обобщенным типам их класса
        // поэтому он объявляет свои собственные обобщенные типы K и V.

        // ...
    }
}
// Также можно привязывать обобщенные типы к интерфейсам:
interface MyMap<K, V> {
    get(key: K): V
    set(key: K, value: V): void
}
// И явно привязать конкретные типы к обобщенным типам как к функциям
let a503 = new MyMap<string, number>('k', 1) // MyMap<string, number>
// или позволить TypeScript вывести их за вас:
let b503 = new MyMap('k', true) // MyMap<string, boolean>
a503.get('k')
b503.set('k', false)


// [Примеси]
// Примесь — это паттерн, позволяющий примешивать поведения и свойства в класс

class User {
// ...
}
User.debug() // вычисляется как 'User({"id": 3, "name": "Emma Gluzman"})'

type ClassConstructor<T> = new(...args: any[]) => T

// Объявляем примесь withEZDebug с одним параметром типа C
function withEZDebug0<C extends ClassConstructor>(Class: C) {
    return class extends Class {
        constructor(...args: any[]) {
            super(...args)
        }
    }
}

function withEZDebug<C extends ClassConstructor<{
    getDebugValue(): object
}>>(Class: C) {
    return class extends Class {
        debug() {
            let Name = Class.constructor.name
            let value = this.getDebugValue()
            return Name + '(' + JSON.stringify(value) + ')'
        }
    }
}

// использование
class HardToDebugUser {
    constructor(
        private id: number,
        private firstName: string,
        private lastName: string
    ) {}
    getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + ' ' + this.lastName
        }
    }
}
let User501 = withEZDebug(HardToDebugUser)
let user501 = new User501(3, 'Emma', 'Gluzman')
user501.debug() // вычислется как 'User({"id": 3, "name": "Emma Gluzman"})'


// [Декораторы]
// Декоратор класса @serializable оборачивает класс APIPayload и опционально возвращает новый класс на замену.
@serializable
class APIPayload {
    getValue(): Payload {
        // ...
    }
}
// Без декораторов
let APIPayload = serializable(class APIPayload {
    getValue(): Payload {
        // ...
    }
})

// Таблица 5.1. Ожидаемые сигнатуры типов для различных видов функций декораторов
// Что декорируем    |  Ожидаемая сигнатура типа
// Класс             | (Constructor: {new(...any[]) => any}) => any
// Метод             | (classPrototype: {}, methodName: string, descriptor: PropertyDescriptor) => any
// Статический метод | (Constructor: {new(...any[]) => any}, methodName: string, descriptor: PropertyDescriptor) => any
// Параметр метода   | (classPrototype: {}, paramName: string, index: number) => void
// Параметр статического
// метода              (Constructor: {new(...any[]) => any}, paramName: string, index: number) => void
// Свойство          | (classPrototype: {}, propertyName: string) => any
// Свойство статического
// метода              (Constructor: {new(...any[]) => any}, propertyName: string) => any
// Свойство геттера/ |
// сеттера             (classPrototype: {}, propertyName: string, descriptor: PropertyDescriptor) => any
// Статическое свойство
// геттера/сеттера   | (Constructor: {new(...any[]) => any},propertyName: string, descriptor:PropertyDescriptor) => any

function serializable<
    T extends ClassConstructor<{
        getValue(): Payload
    }>
>(Constructor: T) {
    return class extends Constructor {
        serialize() {
            return this.getValue().toString()
        }
    }
}

let payload = new APIPayload
let serialized = payload.serialize() // Ошибка TS2339: свойство 'serialize' не существует в типе 'APIPayload'.
// TypeScript предполагает, что декоратор не изменяет форму того, что декорирует (не добавляются и не удаляются методы и свойства)

// регулярных функций вместо декораторов
let DecoratedAPIPayload = serializable(APIPayload)
let payload = new DecoratedAPIPayload
payload.serialize() // string



// [Имитация финальных классов]
// в объектно-ориентированных языках, final — это ключевое слово,
// которое в некоторых из них сообщает, что класс не может быть расширен, а метод — переопределен.

// Для имитации final классов в TypeScript можно использовать приватные конструкторы:
class MessageQueue {
    private constructor(private messages: string[]) {}
}
// Когда constructor помечен как private, вы не можете использовать в классе new или расширять его:
class BadQueue extends MessageQueue {}
//
new MessageQueue([])


// [Паттерны проектирования]

// [Паттерн фабрика]
// Паттерн фабрика — это способ создать объект, на базе которого можно формировать объекты схожего типа.
// (потребители не должны знать, какой конкретный класс они получат назад,
// но должны видеть, что класс соответствует интерфейсу).
type Shoe = { // можно interface
    purpose: string
}
class BalletFlat implements Shoe {
    purpose = 'dancing'
}
class Boot implements Shoe {
    purpose = 'woodcutting'
}
class Sneaker implements Shoe {
    purpose = 'walking'
}

// паттерн объект-компаньон для определения типа Shoe и значения Shoe с одинаковым именем
let Shoe = {
    create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe { // безопасная передача 'balletFlat' | 'boot' | 'sneaker'
        switch (type) { // Переключение на type позволяет TypeScript проследить, что каждый тип Shoe обработан
            case 'balletFlat': return new BalletFlat
            case 'boot': return new Boot
            case 'sneaker': return new Sneaker
        }
    }
}

Shoe.create('boot') // Shoe

// [Паттерн строитель]
class RequestBuilder {
    private data: object | null = null
    private method: 'get' | 'post' | null = null
    private url: string | null = null

    setData(data: object): this {
        this.data = data
        return this
    }

    setMethod(method: 'get' | 'post'): this {
        this.method = method
        return this
    }

    setURL(url: string): this {
        this.url = url
        return this
    }

    send() {
        // ...
    }
}
new RequestBuilder()
    .setURL('/users')
    .setMethod('get')
    .setData({firstName: 'Anna'})
    .send()
