// Функции

// Объявление и вызов функций
// Обычно параметры функции аннотируются явно
// Возвращаемый тип подлежит выводу
function add(a: number, b: number) {
    return a + b;
}

// в JavaScript и TypeScript предлагается как минимум пять способов объявления функции:
// Именованная функция
function greet(name: string) {
    return 'hello ' + name
}
// Функциональное выражение
let greet2 = function (name: string) {
    return 'hello ' + name;
}
// Выражение стрелочной функции
let greet3 = (name: string) => {
    return 'hello ' + name
}
// Сокращенное выражение стрелочной функции
let greet4 = (name: string) =>
    'hello ' + name;
// Конструктор функции (не рекомендуется использовать)
let greet5 = new Function('name', 'return "hello " + name')


// Параметр — это часть данных, необходимых функции для запуска, объявленная как часть декларации этой функции.
// Также может называться формальным параметром.
// Аргумент — это часть данных, предаваемая функции при ее вызове.
// Также может называться актуальным параметром.

// При вызове функции в TypeScript не нужно предоставлять дополнительную информацию о типе — достаточно передать ей некий аргумент,
// и TypeScript проверит совместимости этого аргумента с типами параметров функции:
add(1, 2)        // вычисляется как 3
greet('Crystal') // выводится как 'hello Crystal'
// Если вы забыли аргумент или передали аргумент неверного типа, TypeScript поспешит на это указать:
add(1)              // Ошибка TS2554: ожидается 2 аргумента, но получен 1.
add(1, 'a')      // Ошибка TS2345: аргумент типа '"a"' не может быть присвоен параметру типа 'number'.



// [Предустановленные и опциональные параметры]
function log1(message: string, userId?: string) {
    let time = new Date().toLocaleTimeString()
    console.log(time, message, userId || 'Not signed in')
}
log1('Page loaded')                     // Логирует "12:38:31 PM // Page loaded Not signed in"
log1('User signed in', 'da763be') // Логирует "12:38:31 PM // User signed in da763be"

// TypeScript позволяет снабдить опциональные параметры значениями по умолчанию
// (параметр по умолчанию можно не ставить в конец списка в отличие от опционального)
function log2(message: string, userId = 'Not signed in') {
    let time = new Date().toISOString()
    console.log(time, message, userId)
}
log2('User clicked on a button', 'da763be')
log2('User signed out')

// (когда мы присваиваем userId значение по умолчанию, то удаляем его опциональную аннотацию ?. Больше нет необходимости его типизировать)
// вы также можете добавлять явные аннотации типов для параметров по умолчанию тем же способом, что и для обычных параметров:
type Context = {
    appId?: string
    userId?: string
}
function log3(message: string, context: Context = {}) {
    let time = new Date().toISOString()
    console.log(time, message, context.userId)
}

// [Оставшиеся параметры]
// Если функция получает список аргументов, можно передать этот список в виде массива:
function sum(numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
}
sum([1, 2, 3]) // result 6


function sumVariadic(): number {
// Поскольку arguments является не настоящим массивом, а всего лишь его подобием, то сначала необходимо преобразовать его в массив и лишь затем вызвать для него встроенный метод .reduce:
    return Array
        .from(arguments)
        .reduce((total, n) => total + n, 0) // total и n - вывелись как any
}
sumVariadic(1, 2, 3) // вычисляется как 6


function sumVariadicSafe(...numbers: number[]): number { // разница с sum добавили ...
    return numbers.reduce((total, n) => total + n, 0)
}
sumVariadicSafe(1, 2, 3) // вычисляется как 6.


// Функция может иметь не более одного оставшегося параметра, и этот параметр должен быть последним в списке.
interface Console {
    log(message?: any, ...optionalParams: any[]): void
}



// [Методы call, apply и bind]
add(10, 20)                          // вычисляется как 30
// apply привязывает значение к this внутри функции (в этом примере мы привязываем к this null) и вторым аргументом объединяет параметры функции.
add.apply(null, [10, 20])      // вычисляется как 30
// call делает то же самое что и apply, но применяет все аргументы по порядку вместо объединения.
add.call(null, 10, 20)        // вычисляется как 30
// метод bind схож с ними в том, что привязывает к функции аргумент this и список аргументов.
// Разница в том, что вместо вызова старой функции bind возвращает новую, которую затем вы можете вызвать с ()
add.bind(null, 10, 20)() // вычисляется как 30

// Для безопасного использования .call, .apply и .bind, активируйте опцию strictBindCallApply в tsconfig.json (автоматически активируется при включении режима strict).



// [Типизация this]
// this определяется для каждой функции, а не только для тех, которые существуют в качестве методов в классах.
// Значения this отличаются в зависимости от того, как вы вызываете функцию
// (По этой причине многие команды разработчиков запрещают this везде, кроме методов классов. Чтобы сделать то же самое в вашей базе кода, добавьте в правила TSLint no-invalid-this.)

// Причина нестабильности this связана со способом ее присваивания.
// this при вызове метода принимает значение слева от точки. Например:
let x10 = {
    a() {
        return this
    }
}
x10.a() // this является объектом x в теле a()

// Но если в какой-то момент вы переназначите a, прежде чем вызвать ее, результат изменится:
let a10 = x10.a
a10() // теперь this является undefined в теле a()


// пример,
function fancyDate() {
    return `${this.getDate()}/${this.getMonth}/${this.getFullYear()}`
}
fancyDate.call(new Date) // выводится как "4/14/2005"

// Если забудете привязать Date к this, то получите исключение при выполнении:
fancyDate() // Неперехваченная ошибка типа: this.getDate не является функцией

// решение
function fancyDate2(this: Date) {
    return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`
}
// Вот что происходит теперь при вызове fancyDate:
fancyDate2.call(new Date) // выводится как "6/13/2008"
fancyDate2() // Ошибка TS2684: контекст 'this' типа 'void' не может быть присвоен this метода, имеющему тип 'Date'.

// (Чтобы типы this всегда оказывались явно аннотированными в функциях, активируйте настройку noImolicitThis в tsconfig.json.
// Если вы уже включили режим strict, эта функция также будет активна.
// Заметьте, что noImplicitThis не действует в аннотациях this для классов или функций в объектах.)



// [Функции-генераторы]
function* createFibonacciGenerator() { // Значок * перед именем функции делает функцию генератором.
    let a = 0
    let b = 1
    while (true) { // Этот генератор может генерировать значения бесконечно.
        // Генераторы используют ключевое слово yield для выдачи значений.
        // Когда пользователь запросит у генератора следующее значение (например, вызвав next), yield отправит результат обратно пользователю
        // и приостановит выполнение до момента запроса следующего значения.
        // В этом случае цикл while(true) не приводит программу к бесконечному выполнению и сбою.
        yield a;
        // Для вычисления следующего числа Фибоначчи перепишем a на b и b на a + b в один шаг.
        [a, b] = [b, a + b]
    }
}
let fibonacciGenerator = createFibonacciGenerator()  // IterableIterator<number>
fibonacciGenerator.next() // вычисляется как {значение: 0, выполнено: false}
fibonacciGenerator.next() // вычисляется как {значение: 1, выполнено: false}
fibonacciGenerator.next() // вычисляется как {значение: 1, выполнено: false}
fibonacciGenerator.next() // вычисляется как {значение: 2, выполнено: false}
fibonacciGenerator.next() // вычисляется как {значение: 3, выполнено: false}
fibonacciGenerator.next() // вычисляется как {значение: 5, выполнено: false}
// TypeScript способен вывести тип итератора исходя из типа значения, которое мы запросили.

// Также можно явно аннотировать генератор, обернув запрашиваемый им в IterableIterator тип:
function* createNumbers(): IterableIterator<number> {
    let n = 0
    while (1) {
        yield n++
    }
}
let numbers = createNumbers()
numbers.next() // вычисляется как {значение: 0, выполнено: false}
numbers.next() // вычисляется как {значение: 1, выполнено: false}
numbers.next() // вычисляется как {значение: 2, выполнено: false}



// [Итераторы]
// ИТЕРИРУЕМЫЙ Любой объект, содержащий свойство Symbol.iterable, чье значение является функцией, возвращающей итератор.
// ИТЕРАТОР Любой объект, который определяет метод next, возвращающий объект со свойствами value и done.

// Когда вы создаете генератор, вы получаете назад значение, являющееся итерируемым итератором,
// поскольку оно определяет и свойство Symbol.iterator, и метод next.

// Можно вручную определить итератор или итерируемый объект, создав объект или класс, который реализует Symbol.iterator или next соответственно.
let numbers10 = {
    *[Symbol.iterator]() {
        for (let n = 1; n <= 10; n++) {
            yield n;
        }
    }
}
// numbers10 является итерируемым объектом и вызов генератора numbers[Symbol.iterator]() возвращает итерируемый итератор.

// Вы можете не только самостоятельно определять итераторы,
// но и использовать встроенные в JavaScript итераторы для обычных типов коллекций — Array, Map, Set, String и т. д. (Object и Number не являются итераторами):

// Производить итерирование по итератору с помощью for-of
var numbers11 = new Array();
for (let a of numbers11) {
// 1, 2, 3 и т.д.
}
// Распространить итератор
let allNumbers = [...numbers11] // number[]
// Деструктурировать итератор
let [one, two, ...rest] = numbers11 // [number, number, number[]]

// (Если вы компилируете TypeScript-код в версию JavaScript старше чем ES2015,
// то можете активировать пользовательские итераторы флагом downLevelIteration в tsconfig.json.)



// [Сигнатуры вызовов]
// «уровень типов» и «уровень значений»
// 'number' и 'number | null' - уровень типов ; все остальное уровень значений
function area(radius: number): number | null { // 'number' и 'number | null' - уровень типов
    if (radius < 0) {
        return null
    }
    return Math.PI * (radius ** 2)
}
let r: number = 3 // 'number' - уровень типов
let a20 = area(r)
if (a20 !== null) {
    console.info('result:', a20)
}
// Выражения уровня типов являются аннотациями типов с оператором типа объединения |.
// Все остальные выражения относятся к уровню значений.

// area - ее тип: Function


// Рассмотрим несколько функций из этой главы и извлечем их типы в виде
// отдельных сигнатур вызовов, которые привяжем к псевдонимам типов:

// функция greet(name: string)
type Greet = (name: string) => string
// функция log(message: string, userId?: string)
type Log = (message: string, userId?: string) => void
// функция sumVariadicSafe(...numbers: number[]): number
type SumVariadicSafe = (...numbers: number[]) => number


// Теперь конкретизируем связи между сигнатурами вызовов и их реализациями.
let log: Log = ( // Объявляем выражение функции log и явно присваиваем ему тип Log
        message, // Не нужно аннотировать параметры дважды: message уже аннотирован как string в определении Log
        userId = 'Not signed in' // Добавляем значение по умолчанию для userId, поскольку тип userId мы изъяли из сигнатуры Log
    ) => { // Не нужно повторно аннотировать возвращаемый тип — мы уже объявили его как void в Log.
    let time = new Date().toISOString()
    console.log(time, message, userId)
}
// (не пришлось явно аннотировать типы параметров функции)
// (Эта особенность системы вывода типов в TypeScript называется контекстной типизацией.)



// [Контекстная типизация]
// Callback, Обратный вызов — это функция, которая передана другой функции в виде аргумента.

// функция times, вызывающую n раз свой обратный вызов f, передавая каждый раз в f текущий индекс:
function times(
    f: (index: number) => void,
    n: number
) {
    for (let i = 0; i < n; i++) {
        f(i)
    }
}
// не нужно явно аннотировать функцию, передаваемую times, если она объявлена встроенной
times(n=> console.log(n), 4)

// если бы мы не объявили f встроенной, TypeScript не смог бы вывести ее тип:
function f(n) { // Ошибка TS7006: параметр 'n' неявно имеет тип 'any'.
    console.log(n)
}
times(f, 4)


// [Типы перегруженных функций]
// Сокращенная сигнатура вызова
type Log2 = (message: string, userId?: string) => void
// Полная сигнатура вызова
type Log3 = {
    (message: string, userId?: string): void
}
// Оба варианта во всех случаях будут взаимными эквивалентами, разница останется только в синтаксисе.

// Для простых случаев вроде нашей функции Log стоит предпочесть сокращение,
// но для более сложных функций есть несколько существенных причин использовать полную сигнатуру.

// Первая из них — это перегрузка типа функции.
// ПЕРЕГРУЖЕННАЯ ФУНКЦИЯ - Функция с несколькими сигнатурами вызовов.
// JavaScript — динамический язык, в нем есть несколько способов вызвать функцию. в нем можно использовать типы которых нет в функции

// TypeScript моделирует эту динамику — декларации перегруженных функций
// и зависимость типа вывода функции от типа ввода — при помощи своей статической системы типов.

// Например, спроектируем API для бронирования отпуска — назовем его Reserve.
type Reservation = {}
type Reserve = {
    // Объявляем две перегруженные сигнатуры функций
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
}
// Теперь подытожим реализацию Reserve:
let reserve: Reserve = (from, to, destination): Reservation => {
    //...
    return {}
}

// Сигнатура реализации является результатом комбинирования двух сигнатур перегрузки (Signature1 | Signature2 рассчитаны вручную).
let reserve2: Reserve = (from: Date, toOrDestination: Date | String, destination?: string): Reservation => {
    //...
    return {}
}
// Обратите внимание, что комбинированная сигнатура невидима для функций, вызывающих reserve2.
// С позиции потребителя сигнатура Reserve следующая:
// type Reserve = {
// (from: Date, to: Date, destination: string): Reservation
// (from: Date, destination: string): Reservation
// }

// Примечательно, что она не содержит созданную нами сигнатуру:
// // Неверно!
// type Reserve = {
// (from: Date, to: Date, destination: string): Reservation
// (from: Date, destination: string): Reservation
// (from: Date, toOrDestination: Date | string, destination?: string): Reservation
// }

// Поскольку reserve может быть вызвана одним из двух способов, то при
// ее реализации вы можете доказать TypeScript, что проверили то, как она была вызвана
let reserve3: Reserve = (
    from: Date,
    toOrDestination: Date | string,
    destination?: string
) => {
    if (toOrDestination instanceof Date && destination !== undefined) {
        // Book a one-way trip
    } else if (typeof toOrDestination === 'string') {
        // Book a round trip
    }
    return {}
}

// СОХРАНЕНИЕ СПЕЦИФИЧНОСТИ СИГНАТУР ПЕРЕГРУЗОК
// вы можете обобщать, объявляя сигнатуру реализации, лишь бы перегрузки были совместимы с ней.
// Например, этот код работает:
let reserve4: Reserve = (
    from: any,
    toOrDestination: any,
    destination?: any
) => {
// ...
    return {}
}
// При использовании перегрузок сохраняйте сигнатуру реализации максимально специфичной,
// чтобы облегчить реализацию функции. В нашем примере это значит вместо any предпочесть Date и Date | string.

// Почему? Если вы типизируете параметр как any и захотите безопасно использовать его
// и получить преимущества автозавершения, вам придется доказать TypeScript, что это Date:
function getMonth(date: any): number | undefined {
    if (date instanceof Date) {
        return date.getMonth()
    }
}

// Изначальная типизация параметра как Date избавит вас от лишней работы в реализации:
function getMonth2(date: Date): number {
    return date.getMonth()
}


// Перегрузки, естественно, встречаются в API DOM браузера.
// пример типизации createElement
type CreateElement = {
    (tag: 'a'): HTMLAnchorElement // Перегружаем тип параметра, сопоставляя его с типами строчных литералов.
    (tag: 'canvas'): HTMLCanvasElement
    (tag: 'table'): HTMLTableElement
    // пользователь передал стандартное имя тега или новейшее экспериментальное имя,
    // которое еще не было внедрено в число встроенных деклараций типов TypeScript

    // TypeScript обрабатывает перегрузки в порядке их объявления,
    // поэтому когда вы вызываете createElement со строкой, у которой не определена конкретная перегрузка
    // (например, createElement ('foo')), TypeScript использует HTMLElement.
    (tag: string): HTMLElement
}
let createElement: CreateElement = (tag: string): HTMLElement => {
    //
}


// Поскольку функции в JavaScript являются просто вызываемыми объектами, добавьте им свойства,
// чтобы делать, например, следующее:
function warnUser(warning) {
    if (warning.wasCalled) {
        return
    }
    warnUser.wasCalled = true
    alert(warning)
}
warnUser.wasCalled = false

// используем TypeScript для типизации полной сигнатуры warnUser:
type WarnUser = {
    (warning: string): void
    wasCalled: boolean
}



// [Полиморфизм]

function filter(array, f) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        if (f(item)) {
            result.push(item)
        }
    }
    return result
}

filter([1, 2, 3, 4], _ => _ < 3) // [1, 2]

// извлечение этой функции
type Filter = {
    (array: unknown, f: unknown) : unknown[]
}
// заполнение типов
type Filter2 = {
    (array: number[], f: (item: number) => boolean): number[]
}
// Попробуем использовать перегрузку для ее расширения
type Filter3 = {
    (array: number[], f: (item: number) => boolean): number[]
    (array: string[], f: (item: string) => boolean): string[]
    (array: object[], f: (item: object) => boolean): object[]
}
// пример использования
let names = [
    {firstName: 'beth'},
    {firstName: 'caitlyn'},
    {firstName: 'xin'}
]
let result = filter(
    names,
    (_ : string) => _.firstName.startsWith('b')
) // Ошибка TS2339: свойство 'firstName' не существует в типе 'object'.
result[0].firstName   // Ошибка TS2339: свойство 'firstName' не существует в типе 'object'.

// filter, когда мы перепишем его с параметром обобщенного типа T:
type Filter4 = {
    <T>(array: T[], f: (item: T) => boolean): T[]
}
let filter4: Filter4 = (array, f) => {
    let result = []
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        if (f(item)) {
            result.push(item)
        }
    }
    return result
}
// (a) T привязан к number
filter4([1, 2, 3], _ => _ > 2)

// (b) T привязан к строке
filter4(['a', 'b'], _ => _ !== 'b')

// (c) T привязан к {firstName: string}
filter(names, (_: { firstName: string; }) => _.firstName.startsWith('b'))


// [Когда привязывать конкретные типы к обобщенным]
// объявили <T> как часть сигнатуры вызова (перед открывающимися скобками),
// и TypeScript привяжет конкретный тип к T, когда мы вызовем функцию типа Filter.
type Filter41 = {
    <T>(array: T[], f: (item: T) => boolean): T[]
}
// в этом случае нужно будет привязать тип явно
type Filter42<T> = {
    (array: T[], f: (item: T) => boolean): T[]
}
// let filter42: Filter42<number> = (array, f) => {
// или пример
type StringFilter = Filter42<string>
// type OtherFilter = Filter42   TS2314: Generic type 'Filter42' requires 1 type argument(s).

// [Где можно объявлять обобщенные типы]
// 1)
type Filter51 = {
    <T>(array: T[], f: (item: T) => boolean): T[]
}
//let filter51: Filter51 =
// 2)
type Filter52<T> = {
    (array: T[], f: (item: T) => boolean): T[]
}
//let filter52: Filter52<number> =
// 3)
type Filter53 = <T>(array: T[], f: (item: T) => boolean) => T[]
//let filter53: Filter53 = // ...
// 4)
type Filter54<T> = (array: T[], f: (item: T) => boolean) => T[]
//let filter54: Filter54<string> = // ...
// 5) Именованная сигнатура вызова функции с диапазоном T, ограниченным сигнатурой.
// TypeScript привяжет конкретный тип к T при вызове filter,
// и каждый вызов filter получит свою собственную привязку для T.
//function Filter55<T>(array: T[], f: (item: T) => boolean): T[] {}


// второго примера напишем функцию map
function map(array: unknown[], f: (item: unknown) => unknown): unknown[] {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result[i] = f(array[i])
    }
    return result
}

function map2<T, U>(array: T[], f: (item: T) => U): U[] {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result[i] = f(array[i])
    }
    return result
}

// [Вывод обобщенных типов]
map2(
    ['a', 'b', 'c'],    // Массив T
    _ => _ === 'a'  // Функция, возвращающая U
)
// можно аннотировать явно по принципу «все или ничего»: либо каждый обобщенный тип, либо ни один из них
map2<string, boolean>(
    ['a', 'b', 'c'],
    _ => _ === 'a'
)

// TypeScript проверит, что каждый выведенный обобщенный тип совместим
// с соответствующим ему явно привязанным обобщенным типом
// boolean совместим с boolean | string
map2<string, boolean | string>(
    ['a', 'b', 'c'],
    _ => _ === 'a'
)
map2<string, number>(
    ['a', 'b', 'c'],
    _ => _ === 'a'   // Ошибка TS2322: тип 'boolean' несовместим с типом 'number'.
)

// Поскольку TypeScript выводит конкретные типы для обобщенных на
// основе аргументов, передаваемых в обобщенную функцию
let promise = new Promise(resolve =>
    resolve(45)
)
promise.then(result => // Выведен как {}
    result * 4
)
// Чтобы это исправить, нужно явно аннотировать параметр обобщенного типа промисов:
let promise2 = new Promise<number>(resolve =>
    resolve(45)
)
promise2.then(result => // number
    result * 4
)

// [Псевдонимы обобщенных типов]
type MyEvent<T> = {
    target: T, // <button />, <div />
    type: string
}
type ButtonEvent = MyEvent<HTMLButtonElement>

// Применяя обобщенный тип вроде MyEvent, вы должны явно привязать его
// параметры при использовании, поскольку он не будет выведен:
let myEvent: MyEvent<HTMLButtonElement | null> = {
    target: document.querySelector('#myButton'),
    type: 'click'
}

// Можно использовать MyEvent для построения другого типа, например TimedEvent.
// Когда обобщенный тип T в TimedEvent будет привязан, TypeScript привяжет его и к MyEvent:
type TimedEvent<T> = {
    event: MyEvent<T>
    from: Date
    to: Date
}

// Также можете использовать псевдоним обобщенного типа в сигнатуре функции.
function triggerEvent<T>(event: MyEvent<T>): void {
// ...
}
triggerEvent({ // T является Element | null
    target: document.querySelector('#myButton'), // T должен иметь тот же тип, что и document.querySelector('#myButton')
    type: 'mouseover'
})


// [Ограниченный полиморфизм]
// В некоторых случаях вы хотите сказать: «Тип U должен быть как минимум T».
// Мы зовем это установкой верхней границы U.

// реализацию двоичного дерева с тремя типами узлов:
// 1. Обычные TreeNodes.
// 2. LeafNodes, являющиеся TreeNodes, не имеющими дочерних узлов.
// 3. InnerNodes, являющиеся TreeNodes, имеющими дочерние узлы.
// Начнем с объявления типов для узлов:
type TreeNode = {
    value: string
}
// Тип LeafNode имеет те же свойства, что и TreeNode, плюс свойство isLeaf, которое всегда true.
type LeafNode = TreeNode & {
    isLeaf: true
}
// InnerNode также имеет все свойства TreeNode плюс свойство children, указывающее на один или два дочерних узла.
type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode]
}

let a30: TreeNode = {value: 'a'}
let b30: LeafNode = {value: 'b', isLeaf: true}
let c30: InnerNode = {value: 'c', children: [b30]}

let a301 = mapNode(a30, _ => _.toUpperCase()) // TreeNode
let b301 = mapNode(b30, _ => _.toUpperCase()) // LeafNode
let c301 = mapNode(c30, _ => _.toUpperCase()) // InnerNode

// T — это либо TreeNode, либо подтип TreeNode.
function mapNode<T extends TreeNode>(node: T, // node должен быть либо TreeNode, либо подтипом TreeNode
                                     f: (value: string) => string): T {
    return {
        ...node,
        value: f(node.value)
    }
}


// Ограниченный полиморфизм с несколькими ограничениями
type HasSides = {numberOfSides: number}
type SidesHaveLength = {sideLength: number}

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
    console.log(s.numberOfSides * s.sideLength)
    return s
}

type Square = HasSides & SidesHaveLength
let square: Square = {numberOfSides: 4, sideLength: 3}
logPerimeter(square) // Square, logs "12"


// Использование ограниченного полиморфизма для моделирования арности
function call<T extends unknown[], R>(
    f: (...args: T) => R, // Первый параметр call — это переменная функция f, аргументы которой получают тип как у args.
    ...args: T
): R { // call возвращает значение типа R (R привязан к тому типу, который возвращает f)
    return f(...args)
}

function fill2(length: number, value: string): string[] {
    return Array.from({length}, () => value)
}
let a_call = call(fill2, 10, 'a') // вычисляется как массив 10и 'a'
let b_call = call(fill2, 10)                 // Ошибка TS2554: ожидается 3 аргумента, но получено 2.
let c_call = call(fill2, 10, 'a', 'z') // Ошибка TS2554: ожидается 3 аргумента, но получено 4.


// Предустановки обобщенных типов
type MyEvent1<T> = {
    target: T,
    type: string
}
// Чтобы создать новое событие, явно привяжем обобщенный тип к MyEvent,
// представляя тип HTML-элемента, на который было направлено событие:
let buttonEvent: MyEvent1<HTMLButtonElement> = {
    target: myButton,
    type: string
}
// Если тип элемента, к которому будет привязан MyEvent, заранее не известен,
// можно добавить предустановку для обобщенного типа MyEvent:
type MyEvent2<T = HTMLElement> = {
    target: T,
    type: string
}
// Или добавить ограничение для T, чтобы убедиться, что T является HTML элементом:
type MyEvent3<T extends HTMLElement = HTMLElement> = {
    target: T,
    type: string
}
let myEvent1: MyEvent3 = {
    target: myElement,
    type: string
}

// Обратите внимание, что, подобно опциональным параметрам в функции,
// обобщенные типы с предустановками должны идти после обобщенных типов без предустановок:
// Хорошо
type MyEvent20<
    Type extends string,
    Target extends HTMLElement = HTMLElement
> = {
    target: Target
    type: Type
}
// Плохо
type MyEvent30<
    Target extends HTMLElement = HTMLElement,
    Type extends string // Ошибка TS2706: необходимые параметры типов не могут следовать за опциональными.
> = {
    target: Target
    type: Type
}


// [Разработка на основе типов]
// Начните написание программы в TypeScript с определения сигнатур типов функций
function map0<T, U>(array: T[], f: (item: T) => U): U[] {
// ...
    return []
}
// Даже если вы раньше не видели эту функцию, с первого взгляда понятно, что она делает:
// получает массив T и функцию, производящую отображение из T в U, и возвращает массив U.

