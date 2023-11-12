// Обработка ошибок

// паттерны представления и обработки ошибок в TypeScript:
// - Возврат null.
// - Выбрасывание исключений.
// - Возврат исключений.
// - Тип Option.

// [1] Возврат null (Допустимые данные будут представлены как Date, а недопустимые — как null.)
function ask(): string {
    return prompt('When is your birthday?')
}

function parse(birthday: string) {
    let date = new Date(birthday)
    if (!isValid(date)) {
        return null
    }
    return date
}

// Проверка допустимости указанной даты
function isValid(date: Date) {
    return Object.prototype.toString.call(date) === '[object Date]'
        && !Number.isNaN(date.getTime())
}

let date = parse(ask())
if (date) {
    console.info('Date is', date.toISOString())
} else {
    console.error('Error parsing date for some reason')
}


// [2] Выбрасывание исключений
function parse2(birthday: string): Date {
    let date = new Date(birthday)
    if (!isValid(date)) {
        throw new RangeError('Enter a date in the form YYYY/MM/DD')
    }
    return date
}

try {
    let date = parse2(ask())
    console.info('Date is', date.toISOString())
} catch (e) {
    console.error(e.message)
}

// или
try {
    let date = parse2(ask())
    console.info('Date is', date.toISOString())
} catch (e) {
    if (e instanceof RangeError) {
        console.error(e.message)
    } else {
        throw e
    }
}

// Можно выделить подкласс более конкретных ошибок, чтобы,
// когда другой инженер изменит parse или ask для выбрасывания других RangeError, отличить наши ошибки от его ошибок:
// ...
// Кастомизированные типы ошибок
class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}

/**
 * @throws {InvalidDateFormatError} Пользователь некорректно ввел дату рождения.
 * @throws {DateIsInTheFutureError} Пользователь ввел дату рождения из будущего.
 */
function parse3(birthday: string): Date {
    let date = new Date(birthday)
    if (!isValid(date)) {
        throw new InvalidDateFormatError('Enter a date in the form YYYY/MM/DD')
    }
    if (date.getTime() > Date.now()) {
        throw new DateIsInTheFutureError('Are you a timelord?')
    }
    return date
}

try {
    let date = parse3(ask())
    console.info('Date is', date.toISOString())
} catch (e) {
    if (e instanceof InvalidDateFormatError) {
        console.error(e.message)
    } else if (e instanceof DateIsInTheFutureError) {
        console.info(e.message)
    } else {
        throw e
    }
}


// [3] Возврат исключений (в TypeScript нет throws как в Java)
function parse4(birthday: string): Date | InvalidDateFormatError | DateIsInTheFutureError {
    let date = new Date(birthday)
    if (!isValid(date)) {
        return new InvalidDateFormatError('Enter a date in the form YYYY/MM/DD')
    }
    if (date.getTime() > Date.now()) {
        return new DateIsInTheFutureError('Are you a timelord?')
    }
    return date
}

let result4 = parse4(ask()) // Либо дата, либо ошибка.
if (result4 instanceof InvalidDateFormatError) {
    console.error(result4.message)
} else if (result4 instanceof DateIsInTheFutureError) {
    console.info(result4.message)
} else {
    console.info('Date is', result4.toISOString())
}

// чтобы избежать обработки каждой отдельной ошибки
let result41 = parse4(ask()) // Либо дата, либо ошибка.
if (result41 instanceof Error) {
    console.error(result41.message)
} else {
    console.info('Date is', result41.toISOString())
}


// [4] Тип Option
// можно сделать через массив
function parse5(birthday: string): Date[] {
    let date = new Date(birthday)
    if (!isValid(date)) {
        return []
    }
    return [date]
}
let date5 = parse5(ask())
date5
    .map(_ => _.toISOString())
    .forEach(_ => console.info('Date is', _))


// если ask2 вернет массив?
function ask2() {
    let result = prompt('When is your birthday?')
    if (result === null) {
        return []
    }
    return [result]
}
// ...
flatten(ask2()
    .map(parse5))
    .map(date => date.toISOString())
    .forEach(date => console.info('Date is', date))
// Уплощает массив массивов в массив.
function flatten<T>(array: T[][]): T[] {
    return Array.prototype.concat.apply([], array)
}

// все перепуталось, добавить особый тип данных
ask2()
    .flatMap(parse5)
    .flatMap(date => new Some(date.toISOString()))
    .flatMap(date => new Some('Date is ' + date))
    .getOrElse('Error parsing date for some reason')

// тип Option:
// 1) Option — это интерфейс, реализованный двумя классами: Some<T> и None.
// Some<T> — это Option, содержащий значение типа T,
// а None — это Option без значения, представляющий сбой.
// 2) Option — это и тип, и функция одновременно.
// В качестве типа — это интерфейс, который просто выступает в роли супертипа для Some и None.
// В качестве функции — это способ создать новое значение типа Option.
interface Option<T> {
    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Option<U>): Option<U>
    getOrElse(value: T): T
}
class Some<T> implements Option<T> {
    constructor(private value: T) {}

    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Some<U>): Some<U>
    flatMap<U>(f: (value: T) => Option<U>): Option<U> {
        return f(this.value)
    }

    getOrElse(): T {
        return this.value
    }
}
class None implements Option<never> {
    flatMap(): None {
        return this
    }

    getOrElse<U>(value: U): U {
        return value
    }
}

// Равенство с массивами
// Option<T> — это [T] | []
// Some<T> — это [T]
// None — это []

// функцию Option для создания новых Option
function Option2<T>(value: null | undefined): None
function Option2<T>(value: T): Some<T>
function Option2<T>(value: T): Option<T> {
    if (value == null) {
        return new None
    }
    return new Some(value)
}

// Использование:
let result5 = Option2(6)             // Some<number>
    .flatMap(n => Option2(n * 3)) // Some<number>
    .flatMap(n => new None)             // None
    .getOrElse(7)                            // 7
// Вернемся к примеру с днем рождения:
ask()                                                   // Option2<string>
    .flatMap(parse)                                     // Option2<Date>
    .flatMap(date => new Some(date.toISOString()))      // Option2<string>
    .flatMap(date => new Some('Date is ' + date)) // Option2<string>
    .getOrElse('Error parsing date for some reason')    // string

