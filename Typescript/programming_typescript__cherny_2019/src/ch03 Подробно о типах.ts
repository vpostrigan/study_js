// [any] выступает в роли крестного отца всех типов.
// any представляет собой набор всех возможных значений, и вы можете делать с ним все что
// угодно: прибавлять к нему, умножать на него...
let b0: any = ['danger']   // any
let c0 = b0 + 1             // any  // нет сообщения об ошибке
// Чтобы активировать функцию защиты от неявных any, нужно добавить флаг noImplicitAny в tsconfig.json.
// noImplicitAny становится активна при включении режима strict в tsconfig.json


// [unknown]   представляет любое значение, но чтобы использовать это значение,
//           TypeScript потребует уточнить его тип
// Какие же операции поддерживает unknown?
// Вы можете сравнивать значения unknown (==, ===, ||, && и ?), отрицать их (!) и уточнять (как и любой
// другой тип через JavaScript-операторы typeof и instanceof). Применяется же он следующим образом:
let a1: unknown = 30         // unknown
let b1 = a1 === 123  // boolean
let c1 = a1 + 10             // Ошибка TS2571: объект имеет тип 'unknown'.
if (typeof a1 === 'number') {
    let d = a1 + 10  // number, так ошибки нет
}
// общее представление об использовании unknown.
// 1. TypeScript никогда не выводит unknown — этот тип нужно явно аннотировать (a1).
// 2. Можно сравнивать значения со значениями типа unknown (b1).
// 3. Нельзя производить действия на основе предположения, что значение
// unknown имеет конкретный тип (c1). Сначала нужно показать TypeScript наличие этого типа (d)


// [boolean] Такие типы можно сравнивать (==, ===, ||, && и ?) и отрицать (!). Используются они так:
let a3 = true   // boolean
var b3 = false  // boolean
const c3 = true    // true    (TypeScript вывел тип c3 как true вместо boolean)
let d3: boolean = true   // boolean
let e3: true = true      // true    (создал литералы типов) [ЛИТЕРАЛ ТИПА - Тип, представляющий только одно значение и ничто другое.]
let f3: true = false     // Ошибка TS2322: тип 'false' не может быть присвоен типу 'true'.

// сообщить TypeScript, что некий элемент имеет тип boolean, можно сделать следующее:
// 1. Позволить TypeScript вывести тип boolean для значения (a3 и b3).
// 2. Позволить TypeScript вывести конкретное значение boolean (c).
// 3. Явно сообщить TypeScript, что значение является boolean (d). [практически никогда]
// 4. Явно сообщить TypeScript, что значение имеет конкретное значение boolean (e и f). [очень редко]


// [number] представляет набор чисел: целочисленные, с плавающей запятой, положительные, отрицательные, Infinity (бесконечность), NaN и т.д.
// Для чисел доступно достаточно много действий: сложение (+), вычитание (-), деление по модулю (%) и сравнение (<). Примеры:
let a4 = 1234             // number
var b4 = Infinity * 0.10  // number
const c4 = 5678             // 5678
let d4 = a4 < b4          // boolean
let e4: number = 100              // number
let f4: 26.218 = 26.218           // 26.218
let g4: 26.218 = 10               // Ошибка TS2322: тип '10' не может быть присвоен типу '26.218'.

let oneMillion = 1_000_000 // Эквивалент 1000000
let twoMillion: 2_000_000 = 2_000_000

// Для типизации с помощь number можно сделать следующее:
// 1. Позволить TypeScript вывести тип значения как number (a4 и b4).
// 2. Использовать const, чтобы TypeScript вывел тип переменной как конкретное число (number) (c4).
// 3. Явно сообщить TypeScript, что значение имеет тип number (e4). [практически никогда]
// 4. Явно сообщить, что значение имеет конкретный тип number (f4 и g4). [иногда]


// [bigint] number может представлять целые числа только до 2^53
// поддерживает такие действия, как сложение (+), вычитание (-), умножение (*), деление (/) и сравнение (<). Примеры:
let a5 = 1234n       // bigint
const b5 = 5678n     // 5678n
var c5 = a5 + b5     // bigint
let d5 = a5 < 1235 // boolean
let e5 = 88.5n            // Ошибка TS1353: литерал bigint должен быть целым числом.
let f5: bigint = 100n       // bigint
let g5: 100n = 100n         // 100n
let h5: bigint = 100     // Ошибка TS2322: тип '100' не может быть присвоен типу 'bigint'.

// Позволить TypeScript вывести тип значения (лучший вариант)


// [string] Тип string является набором всех строк и доступных для них операций
// вроде конкатенации (+), среза (.slice) и т. д. Вот несколько примеров: Типы от а до я 41
let a6 = 'hello'            // string
var b6 = 'billy'            // string
const c6 = '!'                // '!'
let d6 = a6 + ' ' + b6 + c6 // string
let e6: string = 'zoom'            // string let f: 'john' = 'john' // 'john'
let g6: 'john' = 'zoe'            // Ошибка TS2322: тип "zoe" не может быть присвоен типу "john".

// Позволить TypeScript вывести тип значения (лучший вариант)


// [symbol] появился с одной из последних ревизий JavaScript (ES2015).
// На практике символы встречаются нечасто.
let a7 = Symbol('a') // symbol
let b7: symbol = Symbol('b') // symbol
var c7 = a7 === b7            // boolean
let d7 = a7 + 'x'              // Ошибка TS2469: оператор '+' не может быть применен к типу 'symbol'.

// Задача Symbol('a') в JavaScript заключается в создании нового symbol с заданным именем.
// Этот symbol уникален и не будет равен (при сравнении посредством == или ===)
// никакому другому symbol (даже если создать второй одноименный symbol).
const e7 = Symbol('e')                // typeof e (Когда вы объявляете новый symbol и присваиваете его переменной const (не var или let), TypeScript выводит ее тип как unique symbol)
const f7: unique symbol = Symbol('f') // typeof f
let g7: unique symbol = Symbol('f')   // Ошибка TS1332: переменная, имеющая тип 'unique symbol', должна быть 'const'.
let h7 = e7 === e7   // boolean
let i7 = e7 === f7 // Ошибка TS2367: это условие всегда будет возвращать 'false', поскольку типы 'unique symbol' и 'unique symbol' не имеют сходства.


// [object] определяет форму объекта.
// несколько способов использования типов для описания объектов:
// 1) объявление значения в качестве object:
let a8: object = {
    b8: 'x'
}
a8.b8 // Ошибка TS2339: свойство 'b' не существует в типе 'object'.

const a81: {b81: number} = {
    b81: 12
}
a81.b81 // По-прежнему {b: number} (а не литерал 12)
// так как объект, объявленный с const, не подскажет TypeScript вывести более узкий тип.
// Дело в том, что JavaScript-объекты изменяемы
// и TypeScript знает, что их поля можно обновить после создания.

// 2) синтаксис объектного литерала.
// если не использовать явные аннотации и позволим TypeScript делать свою работу?
let a82= {
    b82: 'x'
}                        // {b: string}
a82.b82                  // string

let b82= {
    c82: {
        d82: 'f'
    }
} // {c82: {d82: string}}

// Синтаксис объектного литерала сообщает: «Здесь находится элемент такой формы»
let c82: {
    firstName: string
    lastName: string
} =
    {
        firstName: 'john',
        lastName: 'barrowman'
    }
// либо классом
class Person {
    constructor(public firstName: string, public lastName: string) {
        // public является сокращением this.firstName = firstName
    }
}
c82 = new Person('matt', 'smith')    // OK // TypeScript позволяет присвоить Person литералу c82.

// что произойдет, если добавить дополнительные свойства или упустить необходимые:
let a83: {b83: number}
a83 = {}  // Ошибка TS2741: свойство 'b' отсутствует в типе '{}', но необходимо в типе '{b: number}'.

a83 = {
    b83: 1,
    c83: 2
    // Ошибка TS2322: тип '{b: number; c: number}' не может быть присвоен типу '{b: number}'.
    // Объектный литерал может определять только известные свойства, а 'c' не существует в типе '{b: number}'.
}


let a84: {
    b: number
    c?: string // a84 может иметь свойство c, являющееся string. Если с задано, то оно может быть undefined.
    [key: number]: boolean // a84 может иметь любое количество численных свойств, являющихся boolean.
}

a84 = {b: 1}
a84 = {b: 1, c: undefined}
a84 = {b: 1, c: 'd'}
a84 = {b: 1, 10: true}
a84 = {b: 1, 10: true, 20: false}
a84 = {10: true} // Ошибка TS2741: свойство 'b' упущено в типе'{10: true}'.
a84 = {b: 1, 33: 'red'} // Ошибка TS2741: тип 'string' не может быть присвоен типу 'boolean'.


// При объявлении типа object можно использовать как модификатор
// опциональности (?), так и модификатор readonly, который не позволит
// изменять поле после присвоения ему первого значения (своего рода const для свойств объекта):
let user: {
    readonly firstName: string
} = {
    firstName: 'abby'
}

user.firstName // string
user.firstName = 'abbey with an e' // Ошибка TS2540: невозможно присвоить к 'firstName', т.к. это свойство только для чтения.


// Каждый тип, за исключением null и undefined, может быть присвоен типу
// пустого объекта ({}), что усложняет его использование. Старайтесь избегать типов пустых объектов:
let danger: {}
danger = {}
danger = {x: 1}
danger = []
danger = 2

// Например, следующий код проходит проверку типов:
let a85: {} = {
    toString(){
        return 3
    }}
// Но, если вы измените аннотацию типа на Object, то TypeScript укажет ошибку:
let b85: Object = {
    toString(){
        return 3
    }}
// «Тип 'number' не может быть присвоен типу 'string'»


// СИГНАТУРЫ ИНДЕКСОВ
// Синтаксис [key: T]: U называется сигнатурой индекса.
// Читать так: «Для этого объекта все ключи типа T должны иметь значения типа U».
// Сигнатуры индекса позволяют безопасно добавлять дополнительные ключи объекту, помимо объявленных ранее.
// Но тип (T) ключа сигнатуры индекса должен быть совместим либо со string, либо с number.
// В качестве имени ключа сигнатуры индекса можно использовать любое слово — не только key:
let airplaneSeatingAssignments: {
    [seatNumber: string]: string
} = {
    '34D': 'Boris Cherny',
    '34E': 'Bill Gates'
}

// В общей сложности выходит четыре способа объявления объектов в TypeScript:
// 1. Объявление объектного литерала (вроде {a: string}), называемого также формой.
// Используйте ее, когда знаете, какие поля будет иметь объект, или когда все его значения будут иметь один тип.
// 2. Объявление пустого объектного литерала ({}). [Старайтесь его избегать.]
// 3. Тип object. Используйте его, когда вам просто нужен объект и неважно, какие у него поля.
// 4. Тип Object. [Старайтесь его избегать.]

// Является ли значение допустимым объектом
// Value            {}          object         Object
// {}               Да            Да             Да
// ['a']            Да            Да             Да
// function () {}   Да            Да             Да
// new String('a')  Да            Да             Да
// new String('a')  Да            Да             Да
// 'a'              Да            Нет            Да
// 1                Да            Нет            Да
// Symbol('a')      Да            Нет            Да
// null             Нет           Нет            Нет
// undefined        Нет           Нет            Нет



// [псевдонимы, объединения и пересечения типов]
// (некоторые программисты предпочитают использовать описательные имена типов вместо описательных имен переменных)
// Подобно (let, const и var) для объявления переменной, выступающей псевдонимом значения
// можно объявлять псевдоним типа, указывающий на тип
type Age = number
type Person2 = {
    name: string
    age: Age
}
// TypeScript не делает вывод псевдонимов, поэтому их нужно объявлять явно
let age: Age = 55
let driver: Person2 = {
    name: 'James May',
    age: age
}
// Поскольку Age является псевдонимом number, значит, он совместим с number и можно переписать код так:
let age2 = 55
let driver2: Person2 = {
    name: 'James May',
    age: age
}

// объявить тип дважды нельзя:
type Color = 'red'
type Color = 'blue' // Ошибка TS2300: повтор идентификатора 'Color'.

// Каждый блок и каждая функция имеют свой диапазон, и внутренние объявления псевдонимов типов перекрывают внешние
type Color2 = 'red'
let x = Math.random() < .5
if (x) {
    type Color2 = 'blue' // Здесь перекрывается Color, объявленный выше.
    let b: Color2 = 'blue'
} else {
    let c: Color2 = 'red'
}

// Типы объединения и пересечения
// специальные операторы типов для описания объединений и пересечений: | для объединения и & для пересечения
type Cat = {name: string, purrs: boolean}
type Dog = {name: string, barks: boolean, wags: boolean}
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog

let a100: CatOrDogOrBoth = {
    name: 'Bonkers',
    purrs: true
}
// Dog
a100 = {
    name: 'Domino',
    barks: true,
    wags: true
}
// И то и другое
a100 = {
    name: 'Donkers',
    barks: true,
    purrs: true,
    wags: true
}

let b100: CatAndDog = {
    name: 'Domino',
    barks: true,
    purrs: true,
    wags: true
}

// Объединения, как правило, встречаются чаще
// пример
function trueOrNull(isTrue: boolean) { // "true" | null
    if (isTrue) {
        return 'true'
    }
    return null
}
// тип возвращаемого ей значения? Это может быть string или null.
// То есть можно выразить возвращаемый тип так:
type Returns = string | null

// А как насчет следующего примера?
function aOrB(a: string, b: number) {
    return a || b
}
// Если a окажется верно, то возвращаемый тип будет string, в противном
// случае он будет number. Иначе говоря, он string | number.



// [Массивы]
let a101 = [1, 2, 3] // number[]
var b101 = ['a', 'b'] // string[]
let c101: string[] = ['a']    // string[]
let d101 = [1, 'a']    // (string | number)[]
const e101 = [2, 'b']  // (string | number)[]

let f101 = ['red']
f101.push('blue')
f101.push(true)      // Ошибка TS2345: аргумент типа 'true' не может быть присвоен параметру типа 'string'.

let g101 = [] // any[]
g101.push(1)         // number[]
g101.push('red')     // (string | number)[]

let h101: number[] = [] // number[]
h101.push(1)            // number[]
h101.push('red')     // Ошибка TS2345: аргумент типа '"red"' не может быть присвоен параметру типа 'number'.

// если разные типы в массиве, нужно проверять элемент перед использованием
let d102 = [1, 'a'] // Как и с объектами, создание массива с const не побудит TypeScript делать более узкий вывод типа.
d102.map(_ => { // сделать отображение этого массива
    // typeof определяет тип
    if (typeof _ === 'number') { // если число умножить на 3
        return _ * 3
    }
    return _.toUpperCase() // если строка, сделать toUpperCase
})


// Когда вы инициализируете пустой массив, TypeScript не знает, какой тип будут иметь его элементы, и присваивает ему тип any.
// По мере добавления в массив новых значений TypeScript постепенно определяет его тип в соответствии с ними.
// Как только массив выйдет за определенный диапазон (например, если вы объявили его в функции, а затем вернули),
// тогда TypeScript присвоит ему последний тип, который не может быть расширен далее:
function buildArray() {
    let a = [] // any[]
    a.push(1) // number[]
    a.push('x') // (string | number)[]
    return a
}
let myArray = buildArray() // (string | number)[]
myArray.push(true) // Ошибка 2345: аргумент типа 'true' не может быть присвоен параметру типа 'string | number'.


// [кортежи] Кортежи являются подтипами array
let a103: [number] = [1]
// Кортеж [имя, фамилия, год рождения]
let b103: [string, string, number] = ['malcolm', 'gladwell', 1963]
b103 = ['queen', 'elizabeth', 'ii', 1926] // Ошибка TS2322: тип 'string' не может быть присвоен типу 'number'.

// Массив железнодорожных тарифов, который может меняться в зависимости от направления
let trainFares: [number, number?][] = [
    [3.75],
    [8.25, 7.70],
    [10.50]
]
// Эквивалент:
let moreTrainFares: ([number] | [number, number])[] = [
    [3.75],
    [8.25, 7.70],
    [10.50]
]

// Список строк с как минимум одним элементом
let friends: [string, ...string[]] = ['Sara', 'Tali', 'Chloe', 'Claire']
// Разнородный список
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c']
// Кортежные типы не только гарантируют типобезопасность для разнородных списков, но и захватывают длину типизируемого ими списка.
// Эти особенности позволяют картежам превосходить обычные массивы по уровню безопасности типов. Используйте кортежи чаще.


// Массивы и кортежи только для чтения
// Обычные массивы являются изменяемыми (можно добавлять в них (.push),
// удалять из них или вставлять в них (.splice) и обновлять их на месте)

// неизменяющие методы вроде .concat и .slice, вместо изменяющих — .push или .splice:
let as: readonly number[] = [1, 2, 3] // readonly number[]
let bs: readonly number[] = as.concat(4) // readonly number[]
let three = bs[2] // number
as[4] = 5 // Ошибка TS2542: сигнатура индекса в типе 'readonly number[]' допускает только чтение.
as.push(6) // Ошибка TS2339: свойство 'push' не существует в типе 'readonly number[]'.

// Как и в случае с Array, в TypeScript есть пара более длинных форм для объявления массивов и кортежей только для чтения:
// можно записать по разному
type A = readonly string[]          // readonly string[]
type B = ReadonlyArray<string>      // readonly string[]
type C = Readonly<string[]>         // readonly string[]
type D = readonly [number, string]  // readonly [number, string]
type E = Readonly<[number, string]> // readonly [number, string]


// [null, undefined, void и never]
// В JavaScript есть два значения для выражения отсутствия: null и undefined.
// TypeScript поддерживает их оба и имеет для них типы: null и undefined
// undefined означает, что нечто еще не было определено, а null показывает отсутствие значения

// void — это возвращаемый тип функции, которая не возвращает ничего явно (например, console.log),
// never — это тип функции, которая никогда ничего не возвращает (выбрасывает исключение или выполняется бесконечно):

function a104(x: number) { // (a) Функция, возвращающая число или null
    if (x < 10) {
        return x
    }
    return null
}
function b104() { // (b) Функция, возвращающая undefined
    return undefined
}
function c104() { // (c) Функция, возвращающая void
    let a = 2 + 2
    let b = a * a
}
function d104() { // (d) Функция, возвращающая never
    throw TypeError('I always error')
}
function e104() { // (e) Другая функция, возвращающая never
    while (true)
    { doSomething()
    }
}


// [enum]
// Есть два типа enum: отображающий строки в строки и отображающий строки в числа:
enum Language { // TypeScript будет автоматически выводить число в качестве значения для каждого члена перечисления
    English,
    Spanish,
    Italian
}
// явным вывод из предыдущего примера:
enum Language2 {
    English = 0,
    Spanish = 1,
    Italian = 2
}

// извлечь значение из enum
let myFirstLanguage = Language.Italian // Language
let mySecondLanguage = Language['English'] // Language


// Можно разделить перечисление на несколько деклараций, и TypeScript автоматически произведет их слияние
enum Language3 {
    English = 0,
    Spanish = 1
}
enum Language3 {
    Italian = 2
}

// не обязательно самстоятельно определять значения:
enum Language4 {
    English = 100,
    Spanish = 200 + 300,
    Italian // TypeScript выводит 501 (число, следующее за 500)
}


// строчные значения для нумерации или даже смешивать строчные и числовые значения:
enum Color4 {
    Red = '#c10000',
    Blue = '#007ac1',
    Pink = 0xc10050, // Шестнадцатеричный литерал
    White = 255 // Десятичный литерал
}
let red = Color4.Red // Color4
let pink = Color4.Pink // Color4

let a105 = Color4.Red // Color
let b105 = Color4.Green // Ошибка TS2339: свойство 'Green' не существует в типе 'typeof Color'.
let c105 = Color4[0] // string
let d105 = Color4[6] // string (!!!)

const enum Language5 { // const исправит 'Color4[6] // string (!!!)'
    English,
    Spanish,
    Italian
}

let a106= Language5.English // Language // Обращение к верному ключу перечисления
let b106 = Language5.Tagalog // Ошибка TS2339: свойство 'Tagalog' не существует в типе 'typeof Language'.
let c106= Language5[0] // Ошибка TS2476: обратиться к константному члену перечисления можно только с помощью строчного литерала.
let d106= Language5[6] // Ошибка TS2476: обратиться к константному члену перечисления можно только с помощью строчного литерала.

// const enum не позволяет производить обратный просмотр и поэтому во многом ведет себя как обычный JavaScript-объект.
// Он также по умолчанию не генерирует никакой JavaScript-код, а вместо этого подставляет значение члена перечисления везде, где он используется
// (например, TypeScript заменит Language.Spanish на его значение 1 везде, где он встречается).
//Чтобы активировать для const enums генерацию кода при выполнении, смените TSC-настройку preserveConstEnums на true в tsconfig.json:
//{
//   "compilerOptions": {
//        "preserveConstEnums": true
//    }
//}


// Рассмотрите использование const enums:
const enum Flippable {
    Burger,
    Chair,
    Cup,
    Skateboard,
    Table
}
function flip(f: Flippable) {
    return 'flipped it'
}
flip(Flippable.Chair) // 'flipped it'
flip(Flippable.Cup) // 'flipped it'
flip(12) // 'flipped it' (!!!) // все числа также совместимы с перечислениями.
// Такое поведение является неудачным последствием правил совместимости в TypeScript

// нужно использовать только перечисления со строчными значениями:
const enum Flippable2 {
    Burger = 'Burger',
    Chair = 'Chair',
    Cup = 'Cup',
    Skateboard = 'Skateboard',
    Table = 'Table'
}
function flip2(f: Flippable2) {
    return 'flipped it'
}
flip2(Flippable2.Chair) // 'flipped it'
flip2(Flippable2.Cup) // 'flipped it'
flip2(12) // Ошибка TS2345: аргумент типа '12' не может быть присвоен параметру типа 'Flippable'.
flip2('Hat') // Ошибка TS2345: аргумент типа '"Hat"' не может быть присвоен параметру типа 'Flippable'.
flip2('Table')



// Итоги
// const позволит выводить более конкретные типы, let и var — более общие.

// Типы и их более конкретные подтипы
// Тип         Подтип
// boolean     Boolean literal
// bigint      BigInt literal
// number      Number literal
// string      String literal
// symbol      unique symbol
// object      Object literal
// Array       Tuple
// enum        const enum


