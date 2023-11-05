const workers = [];

function isWorkerValid(worker) {
    return worker.isValid;
}

// можно писать вместо isWorkerValid. На вход тип Worker, вернет boolean
const isWorkerValid2 = (worker : WorkerI) : boolean => {
    return worker.isValid;
};

for (let i = 0; i < 10; i++) {
    const worker = {
        firstName: 'First Name ' + i,
        lastName: 'Last Name ' + i,
        job: 'Job ' + i,
        isValid: true
    };

    if (isWorkerValid(worker) || isWorkerValid2(worker)) {
        workers.push(worker)
    }
}

console.log(workers);

//

let text0: string;
let text1 = 'Hello World1';
const text: string = 'Hello World!';  // переменная text с типом string
const i: number = 0;  // переменная text с типом string
const b: boolean = false;
const empty: void = null;

// тип для объекта
interface MyObject {
    a: number;
    b: string;
    c?: boolean; // ? не обязательное поле
}

const obj: MyObject = {
    a: 1,
    b: 'label',
    c: false
};

// создадим функцию
const checkObject = (obj: MyObject) => {
    return obj.a;
};

checkObject(obj);

const obj2 = {
    a: 1,
    b: 'label',
    c: false
};

// checkObject работает с obj2, даже если в obj2 нет interface MyObject
checkObject(obj2);

//

// теперь можно переписать worker interface

interface WorkerI {
    firstName: string;
    lastName: string;
    job: string;
    isValid: boolean;
}

const workers2 : WorkerI[] = [];