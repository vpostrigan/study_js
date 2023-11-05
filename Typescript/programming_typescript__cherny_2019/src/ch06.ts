// Продвинутые типы

// [Связи между типами]

// Подтипы и супертипы
// Массив является подтипом объекта (Везде, где нужен объект, можно использовать массив.)
// Кортеж является подтипом массива (Везде, где нужен массив, можно использовать кортеж.)
// Все является подтипом any (Везде, где нужен any, можно использовать объект.)
// never является подтипом всего (Везде можно использовать never)
// Класс Bird, расширяющий класс Animal, — это подтип класса Animal (Везде, где нужен Animal, можно использовать Bird.)

// Вариантность

// Вариантность формы и массива

// Существующий пользователь, переданный с сервера.
type ExistingUser = {
    id: number
    name: string
}
// Новый пользователь, еще не сохраненный на сервере.
type NewUser = {
    name: string
}
function deleteUser(user: {id?: number, name: string}) {
    delete user.id
}

let existingUser: ExistingUser = {
    id: 123456,
    name: 'Ima User'
}
deleteUser(existingUser)

// противоположный случай (можно ли присвоить объект там, где ожидается его подтип?)
type LegacyUser = {
    id?: number | string
    name: string
}
let legacyUser: LegacyUser = {
    id: '793331',
    name: 'Xin Yang'
}
// Ошибка TS2345: aргумент типа 'LegacyUser' несовместим с параметром типа '{id?: number |undefined, name: string}'.
// Тип 'string' несовместим с типом 'number | undefined'.
deleteUser(legacyUser)


// Вариантность функции

// Crow <: Bird <: Animal
class Animal {
}
class Bird extends Animal {
    chirp() {}
}
class Crow extends Bird {
    caw() {}
}

function chirp(bird: Bird): Bird {
    bird.chirp()
    return bird
}

chirp(new Animal) // Ошибка TS2345: аргумент типа 'Animal' несовместим с параметром типа 'Bird'.
chirp(new Bird)
chirp(new Crow)

// новая функция. На этот раз ее параметр будет функцией:
function clone(f: (b: Bird) => Bird): void {
    let parent = new Bird
    let babyBird = f(parent)
    babyBird.chirp()
}
// безопасные функции для передачи
function birdToBird(b: Bird): Bird {
    return new Bird
}
clone(birdToBird) // OK

function birdToCrow(d: Bird): Crow {
    return new Crow
}
clone(birdToCrow) // OK

//
function birdToAnimal(d: Bird): Animal {
    return new Animal
}
clone(birdToAnimal) // Ошибка TS2345: аргумент типа '(d: Bird) => Animal' несовместим с параметром типа
                    // '(b: Bird) => Bird'.Тип 'Animal' несовместим с типом 'Bird'.

// а что насчет типов параметров?
function animalToBird(a: Animal): Bird {
    // ...
}
clone(animalToBird) // OK

function crowToBird(c: Crow): Bird {
    // ...
}
clone(crowToBird) // Ошибка TS2345: аргумент типа '(c: Crow) => Bird' несовместим с параметром типа ' (b: Bird) => Bird'.


// [Совместимость]

// [Расширение типов]
// Когда объявляете переменную как измененяемую (с let или var), ее тип расширяется от типа значения ее литерала до базового типа
let a600 = 'x'           // string
let b600 = 3           // number
var c600 = true        // boolean
const d600 = {x: 3} // {x: number}
enum E600 {X, Y, Z}
let e600 = E600.X

// Это не касается неизменяемых деклараций:
const a601 = 'x'           // 'x'
const b601 = 3              // 3
const c601 = true         // true
enum E601 {X, Y, Z}
const e601 = E601.X     // E.X

// Можно использовать явную аннотацию типа, чтобы не допустить его расширения
let a602: 'x' = 'x'             // 'x'
let b602: 3 = 3                 // 3
var c602: true = true           // true
const d602: {x: 3} = {x: 3}     // {x: 3}

// Это не касается неизменяемых деклараций:
const a603 = 'x'           // 'x'
const b603 = 3              // 3
const c603 = true         // true
enum E603 {X, Y, Z}
const e = E603.X        // E.X

// Можно использовать явную аннотацию типа, чтобы не допустить его расширения:
let a604: 'x' = 'x'          // 'x'
let b604: 3 = 3              // 3
var c604: true = true        // true
const d604: {x: 3} = {x: 3}  // {x: 3}

// Когда повторно присваиваете нерасширенный тип с помощью let или var, TypeScript расширяет его за вас.
const a605 = 'x'   // 'x'
let b605 = a605  // string
// Чтобы это предотвратить, добавьте явную аннотацию типа в оригинальную декларацию:
const c605: 'x' = 'x'   // 'x'
let d605 = c605    // 'x'

// Переменные, инициализированные как null или undefined, расширяются до any:
let a606 = null    // any
a606 = 3           // any
a606 = 'b'         // any

// Но, когда переменная, инициализированная как null или undefined,
// покидает область, в которой была объявлена, TypeScript присваивает ей определенный тип:
function x607() {
    let a = null   // any
    a = 3          // any
    a = 'b'        // any
    return a
}
x607()             // string

// [Тип const] (Используйте as const, когда хотите, чтобы TypeScript вывел максимально узкий тип.)
let a608= {x: 3} // {x: number}
let b608: {x: 3} // {x: 3}
let c608= {x: 3} as const // {readonly x: 3}

// const исключает расширение типа и рекурсивно отмечает его члены как readonly даже в глубоко вложенных структурах данных:
let d608 = [1, {x: 2}] // (number | {x: number})[]
let e608 = [1, {x: 2}] as const // readonly [1, {readonly x: 2}]


// [Проверка лишних свойств]
type Options = {
    baseURL: string
    cacheSize?: number
    tier?: 'prod' | 'dev'
}
class API {
    constructor(private options: Options) {}
}

new API({
    baseURL: 'https://api.mysite.com',
    tier: 'prod'
})

new API({
    baseURL: 'https://api.mysite.com',
    tierr: 'prod' // Ошибка TS2345: аргумент типа '{tierr: string}' несовместим с параметром типа 'Options'.
                  // Объектный литерал может определять только известные свойства,
                  // но 'tierr' не существует в типе 'Options'. Вы хотели написать 'tier'?
})

new API({
    baseURL: 'https://api.mysite.com',
    badTier: 'prod'
} as Options)     // Делаем утверждение, что неверный объект опций имеет тип Options. (ошибок нет)

// TypeScript больше не воспринимает его как новый и, произведя проверку лишних свойств,
// делает заключение, что ошибок нет.
let badOptions = {
    baseURL: 'https://api.mysite.com',
    badTier: 'prod'
}
new API(badOptions)

// Когда явно типизируем options как Options, объект, присваиваемый нами options, является новым,
// поэтому TypeScript выполняет проверку лишних свойств и находит баг.
    let options: Options = {
    baseURL: 'https://api.mysite.com',
    badTier: 'prod' // Ошибка TS2322: тип '{baseURL: string; badTier: string}' несовместим с типом 'Options'.
}
new API(options)


// [Уточнение]

// Мы используем объединение строчных литералов для описания
// возможных значений, которые может иметь единица измерения CSS
type Unit = 'cm' | 'px' | '%'
// Перечисление единиц измерения
let units: Unit[] = ['cm', 'px', '%']

function parseUnit(value: string): Unit | null {
    for (let i = 0; i < units.length; i++) {
        if (value.endsWith(units[i])) {
            return units[i]
        }
    }
    return null
}

type Width = {
    unit: Unit,
    value: number
}

function parseWidth(width: number | string | null | undefined): Width | null {
    if (width == null) {
        // true и для null, и для undefined
        return null
    }
    // с этого момента тип width — это number | string (он больше не может быть null или undefined).
    // Мы говорим, что тип был уточнен из number | string | null | undefined в number | string.

    // Если width — number, предустановить пикселы.
    if (typeof width == 'number') {
        // теперь TypeScript знает, что width — это number
        return {unit: 'px', value: width}
    }
    let unit = parseUnit(width)
    if (unit) { // В JavaScript есть семь обозначений понятия «неверно»: null, undefined, NaN, 0, -0, '' '' и false. Все остальные относятся к понятию «верно».
        return {unit, value: parseFloat(width)}
    }
    return null
}

// [Типы размеченного объединения]
// пример
type UserTextEvent = {value: string}
type UserMouseEvent = {value: [number, number]}

type UserEvent = UserTextEvent | UserMouseEvent

function handle(event: UserEvent) {
    if (typeof event.value === 'string') {
        event.value // string
        return
    }
    event.value     // [number, number]
}

// К чему приведет усложнение? Добавим уточнения к типам событий (для target не работает):
type UserTextEvent2 = {value: string, target: HTMLInputElement}
type UserMouseEvent2 = {value: [number, number], target: HTMLElement}

type UserEvent2 = UserTextEvent2 | UserMouseEvent2

function handle2(event: UserEvent2) {
    if (typeof event.value === 'string') {
        event.value // string
        event.target // HTMLInputElement | HTMLElement (!!!)
        // ...
        return
    }
    event.value // [number, number]
    event.target // HTMLInputElement | HTMLElement (!!!)
}

// Исправить можно с помощью типов литералов и определения тега для каждого случая типа объединения.
type UserTextEvent3 = {type: 'TextEvent', value: string, target: HTMLInputElement}
type UserMouseEvent3 = {type: 'MouseEvent', value: [number, number], target: HTMLElement}

type UserEvent3 = UserTextEvent3 | UserMouseEvent3

function handle3(event: UserEvent3) {
    if (event.type === 'TextEvent') {
        event.value // string
        event.target // HTMLInputElement
        // ...
        return
    }
    event.value // [number, number]
    event.target // HTMLElement
}


// [Тотальность]
// Тотальность, или проверка полноты охвата, позволяет модулю проверки убедиться,
// что вы проработали все случаи.
// пример, TypeScript делает проверку тотальности
type Weekday = 'Mon' | 'Tue'| 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'
function getNextDay(w: Weekday): Day {
    switch (w) {
        case 'Mon': return 'Tue'
    }
    // должно быть
    // return 'Sat'
    // или
    // либо изменить возвращаемый тип getNextDay в Day | Undefined
    // или
    // добавить case для каждого Day ошибка исчезнет
}

// еще пример
function isBig(n: number) {
    if (n >= 100) {
        return true
    }
}

// еще пример
let nextDay = {
    Mon: 'Tue'
}
nextDay.Mon // 'Tue'
nextDay.Tue


// [Продвинутые типы объектов]

// [Операторы типов объектов]
// операторы объединения ( | ) и пересечения (&)
// [Оператор подключения (key in)]
// пример, комплексный вложенный тип для моделирования ответа API GraphQL, получаемого из API выбранной социальной сети:
type APIResponse = {
    user: {
        userId: string
        friendList: {
            count: number
            friends: {
                firstName: string
                lastName: string
            }[]
        }
    }
}
// Можно получить ответ от API, а затем отобразить его:
function getAPIResponse(): Promise<APIResponse> {
    // ...
    return null
}
function renderFriendList(friendList: unknown) {
    // ...
}
let response = await getAPIResponse()
renderFriendList(response.user.friendList)

// сейчас friendList - unknown
// можно вынести в отдельный класс
type FriendList = {
    count: number
    friends: {
        firstName: string
        lastName: string
    }[]
}

type APIResponse2 = {
    user: {
        userId: string
        friendList: FriendList
    }
}
function renderFriendList2(friendList: FriendList) {
    // ...
}

// без выноса в отдельный класс
type FriendList3 = APIResponse['user']['friendList']
function renderFriendList3(friendList: FriendList3) {
// ...
}


// чтобы получить тип отдельного друга:
type Friend = FriendList3['friends'][number]


// [Оператор keyof]
type ResponseKeys = keyof APIResponse // 'user'
type UserKeys = keyof APIResponse['user'] // 'userId' | 'friendList'
type FriendListKeys = keyof APIResponse['user']['friendList'] // 'count' | 'friends'

// Объединяя операторы подключения и keyof, можно реализовать типобезопасную функцию получения,
// которая ищет значение в заданном ключе объекта:
function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
    return o[k]
}
// keyof O
// Например, если o имеет тип {a: number, b: string, c: boolean},
// тогда keyof o — это тип 'a' | 'b' |'c', а K (расширяющий keyof o) может быть типом 'a', 'b', 'a' | 'c'
// или любым другим подтипом keyof o.

// если K — это 'a'. тогда при компиляции мы знаем, что get возвращает number.
// Если же K — это 'b' | 'c', тогда мы знаем, что get возвращает string | boolean.

// Что хорошо в этих операторах типов, так это то,
// насколько точно и безопасно они позволяют описать формы типов:
type ActivityLog = {
    lastEvent: Date
    events: {
        id: string
        timestamp: Date
        type: 'Read' | 'Write'
    }[]
}
let activityLog: ActivityLog = ;// ...
let lastEvent = get(activityLog, 'lastEvent') // Дата (Date)

//Перегрузим get, чтобы она принимала до трех ключей:
type Get2 = {
    <O extends object, K1 extends keyof O>(o: O, k1: K1): O[K1]
    <O extends object, K1 extends keyof O, K2 extends keyof O[K1]>(o: O, k1: K1, k2: K2): O[K1][K2]
    <O extends object, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2]>(o: O, k1: K1, k2: K2, k3: K3): O[K1][K2][K3]
}
let get2: Get2 = (object: any, ...keys: string[]) => {
    let result = object
    keys.forEach(k => result = result[k])
    return result
}
get2(activityLog, 'events', 0, 'type') // 'Чтение' | 'Запись'
get2(activityLog, 'bad') // Ошибка TS2345: аргумент типа '"bad"' несовместим с параметром типа '"lastEvent" | "events"'.


// [Тип Record]
type Weekday610 = 'Mon' | 'Tue'| 'Wed' | 'Thu' | 'Fri'
type Day610 = Weekday | 'Sat' | 'Sun'

// Ошибка TS2739: в типе '{Mon: "Tue"}' упущены следующие свойства из типа 'Record<Weekday, Day>': Tue, Wed, Thu, Fri.
let nextDay610: Record<Weekday, Day> = {
    Mon: 'Tue'
}

// [Отображенные типы]
// второй способ объявить более безопасный тип nextDay

// Ошибка TS2739: в типе '{Mon: "Tue"}' упущены следующие свойства типа
// type '{Mon: Weekday; Tue: Weekday; Wed: Weekday; Thu: Weekday; Fri: Weekday}': Tue, Wed, Thu, Fri.
let nextDay620: {[K in Weekday]: Day} = {
    Mon: 'Tue'
}

// И в объекте должно быть не более одного отображенного типа (как и сигнатур индекса):
type MyMappedType = {
    [Key in UnionType]: ValueType
}

// На деле TypeScript использует отображенные типы для реализации встроенного типа Record:
type Record<K extends keyof any, T> = {
    [P in K]: T
}

// применение:
type Account = {
    id: number
    isEmployee: boolean
    notes: string[]
}
// Сделать все поля опциональными
type OptionalAccount = {
    [K in keyof Account]?: Account[K]
}
// Сделать все поля допускающими null
type NullableAccount = {
    [K in keyof Account]: Account[K] | null
}
// Сделать все поля read-only
type ReadonlyAccount = {
    readonly [K in keyof Account]: Account[K]
}
// Снова сделать все поля записываемыми (эквивалент Account)
type Account2 = {
    -readonly [K in keyof ReadonlyAccount]: Account[K]
}
// Снова сделать все поля обязательными (эквивалент Account)
// удаляем оператор опциональности (?) с помощью оператора минус (-).
type Account3 = {
    [K in keyof OptionalAccount]-?: Account[K]
}

// Минус (-) имеет встречный оператор плюс (+), который вам, вероятно,
// никогда не придется использовать непосредственно,
// поскольку внутри отображенного типа readonly является эквивалентом +readonly,
// ? является эквивалентом +?. То есть + присутствует просто для полноты.

// Встроенные отображенные типы
// Встроенные типы настолько полезны, что TypeScript содержит множество их вариантов:
// Record<Keys, Values>    Объект с ключами типа Keys и значениями типа Values.
// Partial<Object>         Помечает каждое поле в Object как опциональное.
// Required<Object>        Помечает каждое поле в Object как обязательное.
// Readonly<Object>        Помечает каждое поле в Object только для чтения.
// Pick<Object, Keys>      Возвращает подтип Object только с заданными Keys.


// [Паттерн объект-компаньон]
// дает возможность объединять объекты и классы, имеющие одинаковое имя
type Currency630 = {
    unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
    value: number
}
let Currency630 = {
    DEFAULT: 'USD',
    from(value: number, unit = Currency630.DEFAULT): Currency630 {
        return {unit, value}
    }
}
// в TypeScript типы и значения имеют раздельные пространства имен
// в одной области могут присутствовать тип и значение с одним именем (в данном примере Currency630)


//import {Currency} from './Currency'
//let amountDue: Currency = { // Использование Currency как типа.
//    unit: 'JPY',
//    value: 83733.10
//}
//let otherAmountDue = Currency.from(330, 'EUR') // Использование Currency как значения.

// Используйте этот паттерн, когда тип и объект семантически связаны,
// а объект предоставляет служебные методы, которые оперируют с типом.



// [Продвинутые функциональные типы]

// [Улучшение вывода типов для кортежей]
// TypeScript выводит кортеж как можно более общим исходя из предоставленных ему данных
// независимо от длины кортежа и позиционирования типов:
let a640 = [1, true] // (number | boolean)[]

function tuple<T extends unknown[]>( // T, являющийся подтипом unknown[] (это значит, что T является массивом любого типа).
        ...ts: T): T {
    return ts
}
let a641 = tuple(1, true) // [number, boolean]

// [Пользовательские защиты типов]
function isString(a: unknown): boolean {
    return typeof a === 'string'
}
isString('a') // вычисляется как true
isString([7]) // вычисляется как false

function parseInput(input: string | number) {
    let formattedInput: string
    if (isString(input)) {
        formattedInput = input.toUpperCase() // Ошибка TS2339: свойство 'toUpperCase' не существует в типе 'number'.
    }
}

// typeof работает для обычного уточнения типа но не работает здесь

// Особенность уточнения типов в том, что оно работает только для типа переменной, находящейся в текущей области.
// В реализации isString мы уточнили тип вводного параметра до string, использовав typeof,
// но уточнение не перешло в другие области и утратилось, поэтому TypeScript узнал только, что isString вернула boolean.

// Чтобы это сделать, мы используем так называемые пользовательские защиты типов:
function isString2(a: unknown): a is string {
    return typeof a === 'string'
}
// Защиты типов — это встроенная особенность TypeScript, позволяющая уточнять типы с typeof и instanceof.

//type LegacyDialog = // ...
//type Dialog = // ...
//function isLegacyDialog(dialog: LegacyDialog | Dialog): dialog is LegacyDialog {
//    // ...
//}



// [Условные типы]
// «Объявляю тип T, зависящий от типа U и V. Если U <: V, то присваиваю T типу A, в противном случае — присваиваю T типу B»
type IsString650<T> = T extends string ? true : false
type A650 = IsString650<string> // true
type B650 = IsString650<number> // false

// [Условное распределение]
type ToArray<T> = T[]
type A651 = ToArray<number> // number[]
type B651 = ToArray<number | string> // (number | string)[]

// Таблица 6.1. Распределение условных типов
// string extends T ? A : B                  === string extends T ? A : B
// (string | number) extends T ? A : B       === (string extends T ? A : B) |
//                                               (number extends T ? A : B)
// (string | number | boolean) extends T ? A : B === (string extends T ? A : B) |
//                                                   (number extends T ? A : B) |
//                                                   (boolean extends T ? A : B)

// добавим условный тип:
type ToArray2<T> = T extends unknown ? T[] : T[]
type A652 = ToArray2<number> // number[]
type B652 = ToArray2<number | string> // number[] | string[]

// Когда используете условный тип, TypeScript распределяет типы объединения по ветвям условного выражения.
// Как будто условный тип отображен (то есть распределен) на каждый элемент объединения.

// Например, TypeScript имеет оператор & для вычисления общих черт двух типов и
// оператор | для объединения двух типов.

// Создадим выражение Without<T, U>, вычисляющее, какие типы есть в T, но отсутствуют в U.
type Without<T, U> = T extends U ? never : T
type A653 = Without<
    boolean | number | string,
    boolean
> // number | string

// - как TypeScript вычисляет этот тип.
// Распределим условие по объединению:
// type A653 = Without<boolean, boolean>
//           | Without<number, boolean>
//           | Without<string, boolean>

// Сделаем подстановку в определение Without и применим T и U:
// type A653 = (boolean extends boolean ? never : boolean)
//           | (number extends boolean ? never : number)
//           | (string extends boolean ? never : string)

// Вычислим условия:
// type A653 = never
//           | number
//           | string

// Упростим:
// type A653 = number | string


// [Ключевое слово infer]
// Объявим условный тип ElemetType, получающий тип элементов массива:
type ElementType<T> = T extends unknown[] ? T[number] : T
type A654 = ElementType<number[]> // number

// А теперь перепишем его, используя infer:
type ElementType2<T> = T extends (infer U)[] ? U : T
type B654 = ElementType2<number[]> // number

// Почему мы объявили U встроенным вместо объявления его впереди вместе с T?
// Что бы произошло, если бы мы это сделали?
type ElementUgly<T, U> = T extends U[] ? U : T
type C654 = ElementUgly<number[]> // Ошибка TS2314: обобщенный тип 'ElementUgly' требует 2 аргумента типа.

// пример посложнее
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
// Получаем тип Array.slice
type F654 = typeof Array['prototype']['slice']
type A655 = SecondArg<F654> // number | undefined
// Итак, второй аргумент [].slice является number | undefined, и мы узнаем об этом в процессе компиляции

// [Встроенные условные типы]
// 1) Exclude<T, U>
// Подобно уже знакомому типу Without, он вычисляет, какие типы есть в T, но отсутствуют в U:
type A656 = number | string
type B656 = string
type C656 = Exclude<A656, B656> // number
// 2) Extract<T, U>
// Вычисляет типы в T, которые можно присвоить U:
type A657 = number | string
type B657 = string
type C657 = Extract<A657, B657> // string
// 3) NonNullable<T>
// Вычисляет версию T, исключающую null и undefined:
type A658 = {a?: number | null}
type B658 = NonNullable<A658['a']> // number
// 4) ReturnType<F>
// Вычисляет возвращаемый тип функции (вопреки ожиданиям, это не сработает для обобщенных типов и перегруженных функций):
type F659 = (a: number) => string
type R659 = ReturnType<F659> // string
// 5) InstanceType<C>
// Вычисляет тип экземпляра конструктора класса:
type A6590 = {new(): B6590}
type B6590 = {b: number}
type I6590 = InstanceType<A6590> // {b: number}



// [Запасные решения]

// [Утверждения типов]
// В TypeScript есть два вида синтаксиса для утверждения типов:
function formatInput(input: string) {
    // ...
}
function getUserInput(): string | number {
    // ...
}
let input = getUserInput()
// Утверждение, что input это string
formatInput(input as string) // Утверждаем (as), что input является string, а не string | number, как якобы предполагают типы
// Его эквивалент (лучше делать 'as')
formatInput(<string>input)


// Если два типа не родственны, утвердите any (any совместим с чем угодно):
function addToList(list: string[], item: string) {
    // ...
}
addToList('this is really,' as any, 'really unsafe')

// [Ненулевые утверждения]
type Dialog = {
    id?: string
}
function closeDialog(dialog: Dialog) {
    if (!dialog.id) { // [1] Если диалог уже удален (у него нет id), сразу делаем возврат.
        return
    }
    setTimeout(() => // [2] Удаляем диалог из DOM по завершении цикла события
        removeFromDOM(
            dialog,
            document.getElementById(dialog.id)
            // Ошибка TS2345: аргумент типа 'string | undefined' несовместим с параметром типа 'string'.

            // Поскольку мы находимся внутри стрелочной функции, то теперь мы в новой области.
            // TypeScript не знает, был ли изменен dialog между [1] и [2], поэтому он не принимает произведенное нами в [1] уточнение.
        )
    )
}
function removeFromDOM(dialog: Dialog, element: Element) {
    // Схожий случай.
    // Хоть мы и знаем, что диалог точно есть в DOM и у него точно есть родительский узел DOM,
    // все, что знает TypeScript, — это то, что тип element.parentNode является Node | null.
    element.parentNode.removeChild(element) // Ошибка TS2531: объект, вероятно, 'null'.
    delete dialog.id
}

// Если вы не уверены, является что-либо null или нет,
// исправить это можно добавлением проверок if (_===null) повсюду.

// Для случаев, когда вы точно знаете, что элемент не является null | undefined,
// в TypeScript есть специальный синтаксис (операторов ненулевого утверждения (!)):
function closeDialog2(dialog: Dialog) {
    if (!dialog.id) {
        return
    }
    setTimeout(() =>
        removeFromDOM2(
            dialog,
            document.getElementById(dialog.id!)!
        )
    )
}
function removeFromDOM2(dialog: Dialog, element: Element) {
    element.parentNode!.removeChild(element)
    delete dialog.id
}


// другой способ сделать рефакторинг
type VisibleDialog3 = {id: string}
type DestroyedDialog3 = {}
type Dialog3 = VisibleDialog3 | DestroyedDialog3

function closeDialog3(dialog: Dialog3) {
    if (!('id' in dialog)) {
        return
    }
    setTimeout(() =>

        // После проверки, что свойство id в dialog определено (подразумевается, что это VisibleDialog),
        // даже внутри стрелочной функции TypeScript будет знать, что ссылка на dialog не изменилась,
        // то есть dialog внутри стрелочной функции — это тот же dialog, что и вне функции.

        removeFromDOM3(
            dialog,
            document.getElementById(dialog.id)!
        )
    )
}
function removeFromDOM3(dialog: VisibleDialog3, element: Element) {
    element.parentNode!.removeChild(element)
    delete dialog.id
}


// [Утверждения явного присваивания]
let userId: string
userId.toUpperCase() // Ошибка TS2454: переменная 'userId' используется до получения значения.

// другой вариант (TypeScript не способен статически это обнаружить, поэтому он по-прежнему выдает ту же ошибку.)
let userId2: string
fetchUser2()
userId2.toUpperCase() // Ошибка TS2454: переменная 'userId' используется до получения значения.
function fetchUser2() {
    userId2 = globalCache.get('userId')
}

// решение. Использовать утверждение явного присваивания,
// чтобы указать TypeScript время присваивания userId (обратите внимание на знак восклицания):
let userId3!: string
fetchUser3()
userId3.toUpperCase() // OK
function fetchUser3() {
    userId3 = globalCache.get('userId')
}



// [Имитация номинальных типов]
// пример
type CompanyID = string
type OrderID = string
type UserID = string
type ID = CompanyID | OrderID | UserID

function queryForUser(id: UserID) {
    // ...
}

// UserID — это всего лишь псевдоним для string, этот подход мало помогает предотвратить баги.
// Инженер может по случайности передать неверный тип ID, а система типов не поймет, что происходит.
let id: CompanyID = 'b4843361'
queryForUser(id) // OK (!!!) // передали неправильный тип ID

// решение номинальные типы (непрозрачными типы). В Typescript они эмулируются через функции маркировки типов

// Начните с создания синтетической маркировки для каждого номинального типа:
// ( бессмысленное пересечение string и {readonly brand: unique symbol} )
// в качестве маркировки unique symbol, потому что это один
// из двух поистине номинальных видов типов в TypeScript (второй — это enum)
type CompanyID2 = string & {readonly brand: unique symbol}
type OrderID2 = string & {readonly brand: unique symbol}
type UserID2 = string & {readonly brand: unique symbol}
type ID2 = CompanyID2 | OrderID2 | UserID2

function CompanyID(id: string) {
    return id as CompanyID
}
function OrderID(id: string) {
    return id as OrderID
}
function UserID(id: string) {
    return id as UserID
}

function queryForUser2(id: UserID) {
    // ...
}
let companyId23 = CompanyID('8a6076cf')
let orderId23 = OrderID('9994acc1')
let userId23 = UserID('d21b1dbf')
queryForUser2(userId23) // OK
queryForUser2(companyId23) // Ошибка TS2345: аргумент типа 'CompanyID' несовместим с параметром типа 'UserID'.

// При выполнении каждый ID — это просто string, а маркировка — это всего лишь конструкция среды компиляции.



// [Безопасное расширение прототипа]
// В качестве примера добавим метод zip в прототип Array.
// Потребуются два шага для безопасного расширения этого прототипа.
// Сначала в файле .ts (например, zip.ts) расширим тип прототипа Array.
// Затем добавим к прототипу новый метод zip:
interface Array<T> { // Вначале сообщаем TypeScript, что добавляем zip в Array.
    zip<U>(list: U[]): [T, U][]
}
// Реализуем .zip
Array.prototype.zip = function<T, U>(
    this: T[], // используем тип this, поэтому TypeScript правильно выводит тип T массива, в котором мы вызываем .zip
    list: U[]
): [T, U][] {
    return this.map((v, k) =>
        tuple(v, list[k]) //
    )
}

// Обновить tsconfig.json, чтобы явно исключить zip.ts из проекта, и побудим потребителей явно импортировать его:
// {
//     *exclude*: [
//          "./zip.ts"
//     ]
// }

// Теперь мы можем безопасно использовать zip по своему усмотрению:
// import './zip'
// [1, 2, 3]
//    .map(n => n * 2) // number[]
//    .zip(['a', 'b', 'c']) // [number, string][]
// При запуске этот код сначала производит отображение, а затем сжатие массива:
// [
//     [2, 'a'],
//     [4, 'b'],
//     [6, 'c']
// ]

