var workers = [];
function isWorkerValid(worker) {
    return worker.isValid;
}
// можно писать вместо isWorkerValid. На вход тип Worker, вернет boolean
var isWorkerValid2 = function (worker) {
    return worker.isValid;
};
for (var i_1 = 0; i_1 < 10; i_1++) {
    var worker = {
        firstName: 'First Name ' + i_1,
        lastName: 'Last Name ' + i_1,
        job: 'Job ' + i_1,
        isValid: true
    };
    if (isWorkerValid(worker)) {
        workers.push(worker);
    }
}
console.log(workers);
//
var text0;
var text1 = 'Hello World1';
var text = 'Hello World!'; // переменная text с типом string
var i = 0; // переменная text с типом string
var b = false;
var empty = null;
var obj = {
    a: 1,
    b: 'label',
    c: false
};
// создадим функцию
var checkObject = function (obj) {
    return obj.a;
};
checkObject(obj);
var obj2 = {
    a: 1,
    b: 'label',
    c: false
};
// checkObject работает с obj2, даже если в obj2 нет interface MyObject
checkObject(obj2);
var workers2 = [];
