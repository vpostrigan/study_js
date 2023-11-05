// [1] auto detected types
let number = 42;
let string = '42';
let boolean = true;
//number = '123'; // будет ошибка

// [2] direct types
// 2.1 boolean
let isActive: boolean;
isActive = true;
// isActive = 1; // error

// isActive = 11 && true && 55; // error
isActive = 11 && true && false; // value

const isTest = false;
// isTest = true; // error

// 2.2 string
let s0 = 's';
let who: string = "youtube";
let whatToDo: string = 'please';
let template: string = `Hello ${who + '1'}, ${whatToDo}`;

// 2.3 number
let n0 = 10;
let testNumber: number = 555;
testNumber = true && 77; // valid
// testNumber = false && 77; // not valid

// 2.4 null, undefined. Ни разу не пользовался
let testNull: null = null;
let testUndefined: undefined = undefined;

// 2.5 array
// const strings: Array<string> = ['Hello', 'world'];
// или
const strings: string[] = ['Hello', 'world'];
strings.join(' ');

const numbers: Array<number> = [33, 12, 42, 78];
numbers.filter(number => number >= 42); // [42, 78]
numbers.filter((number) => number >= 42); // подсветило 'number: number'
//numbers.filter((number: string) => number >= 42); // будет ошибка

// 2.6 кортеж
const user: [string, number] = ['Max', 30]; // [name, age]
user[0].toLocaleUpperCase(); // 'MAX'
user[1]++; // 31

// вместо user[0], user[1] можно
let [name1, age1] = user;
name1.toLocaleUpperCase(); // 'MAX'
age1++; // 32

// 2.7 enum
enum lifeParts {
    sleeping, // первый элемент 0
    eating = 'EATING', // второй элемент переопределили: 1 на EATING
    coding = 'CODING',
    // coding2, // будет ошибка, так как начали писать строки вместо цифр
    doNothing = 6, // обновили индекс
    working// подсветка поставит 7
}
// можно создать объект
const stage: {type: lifeParts} = {
    type: lifeParts.sleeping
};

// 2.8 any (лучше не использовать)
let anyType: any = 432;
anyType = 'dsf';
anyType = {foo: 213}; // можно присваивать разные типы

// 2.9 литералы объектов
// не обязательный тип (nullable) - ?:
class User {
    constructor(user : {
        name: string,
        age: number,
        hobby: {
            title: string,
            startedAt: number,
            finishedAt?: number // необязательный тип
        }[] // массив объектов
    }) {
    }
}

new User({
    name: 'Max',
    age: 30,
    hobby: [{title: 'record', startedAt: 0, finishedAt: undefined}]
});