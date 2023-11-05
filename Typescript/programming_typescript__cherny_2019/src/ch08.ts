// Асинхронное программирование, конкурентность и параллельная обработка

// [Цикл событий]
import {readFile} from "fs";

setTimeout(() => console.info('A'), 1)
setTimeout(() => console.info('B'), 2)
console.info('C')
// значения появятся в порядке C, A, B


// [Работа с обратными вызовами]
// Для самостоятельного запуска следующего примера установите декларации типов для NodeJS:
// npm install @types/node --save-dev

// NodeJS-программу, производящую считывание и запись в журнал доступа Apache:
import * as fs from 'fs'
// Считывание данных из журнала доступа сервера Apache.
fs.readFile(
    '/var/log/apache2/access_log',
    {encoding: 'utf8'},
    (error, data) => {
        if (error) {
            console.error('error reading!', error)
            return
        }
        console.info('success reading!', data)
    }
)

// Параллельное записывание данных в тот же журнал доступа.
fs.appendFile(
    '/var/log/apache2/access_log',
    'New access log entry',
    error => {
        if (error) {
            console.error('error writing!', error)
        }
    })

// функция асинхронная, если ее последний аргумент — это функция,
// получающая два аргумента — Error | null и T | null, именно в таком порядке.


// Мало того что типы не помогают постичь синхронность функций,
// обратные вызовы тоже сложно упорядочиваемы и могут выстраиваться в так называемые пирамиды обратных вызовов:
async1((err1, res1) => {
    if (res1) {
        async2(res1, (err2, res2) => {
            if (res2) {
                async3(res2, (err3, res3) => {
                    // ...
                })
            }
        })
    }
})


// [Промисы как здоровая альтернатива]
// пример использования промисов для добавления данных в файл и последующего считывания результата:
function appendAndReadPromise(path: string, data: string): Promise<string> {
    return appendPromise(path, data)
        .then(() => readPromise(path))
        .catch(error => console.error(error))
}

// аналог на обратных вызовах
function appendAndRead(path: string, data: string,
                       cb: (error: Error | null, result: string | null) => void) {
    appendFile(path, data, error => {
        if (error) {
            return cb(error, null)
        }
        readFile(path, (error, result) => {
            if (error) {
                return cb(error, null)
            }
            cb(null, result)
        })
    })
}

// Создадим API Promise.
type Executor<T> = (
    resolve: (result: T) => void,
    reject: (error: unknown) => void
) => void

class Promise<T> {
    constructor(f: Executor<T>) {}
    then<U>(g: (result: T) => Promise<U>): Promise<U> {
        // ...
    }
    catch<U>(g: (error: unknown) => Promise<U>): Promise<U> {
        // ...
    }
}

function readFilePromise(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        readFile(path, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

// Использование then:
// let a: ()          => Promise<string, TypeError> = // ...
// let b: (s: string) => Promise<number, never> = // ...
// let c: ()          => Promise<boolean, RangeError> = // ...

// a()
//         .then(b)
//         .catch(e => c()) // b не будет ошибкой, так что это случай ошибки a
//         .then(result => console.info('Done', result))
//         .catch(e => console.error('Error', e))

// a() -> b() -> 'Done'
// a() -> b() -> c() -> 'Done' | 'Error'
// a() -> c() -> 'Done' | 'Error'


// [async и await]
// Рассматривайте await как синтаксический сахар для .then на уровне языка.
// Когда вы ожидаете (await) Promise, то должны делать это в блоке async.
// И вместо .catch вы можете обернуть await в регулярный блок try... catch.
// пример:
function getUser1() {
    getUserID(18)
        .then(user => getLocation(user))
        .then(location => console.info('got location', location))
        .catch(error => console.error(error))
        .finally(() => console.info('done getting location'))
}

// преобразовать этот код в async и await
async function getUser2() {
    try {
        let user = await getUserID(18)
        let location = await getLocation(user)
        console.info('got location', user)
    } catch(error) {
        console.error(error)
    } finally {
        console.info('done getting location')
    }
}



// [Async-потоки]

// Отправители событий
// отправители событий предоставляют API,
// поддерживающие отправку событий в канал
// и прослушивание событий в этом канале:
interface Emitter {
    // Отправка события
    emit(channel: string, value: unknown): void
    // Сделать что-либо после отправки события
    on(channel: string, f: (value: unknown) => void): void
}

// Например, клиент NodeRedis (https://github.com/NodeRedis/node-redis) —
// это NodeJS API, используемый для популярного хранилища данных Redis:
// npm install redis

import Redis from 'redis'
// Создание нового экземпляра клиента Redis
let client = redis.createClient()
// Прослушивание новых событий, отправленных клиентом
client.on('ready', () => console.info('Client is ready'))
client.on('error', e => console.error('An error occurred!', e))
client.on('reconnecting', params => console.info('Reconnecting...', params))

// как понять какой тип прийдет в 'on'
// свое решение
type RedisClient = {
    on(event: 'ready', f: () => void): void
    on(event: 'error', f: (e: Error) => void): void
    on(event: 'reconnecting', f: (params: {attempt: number, delay: number}) => void): void
}
// или с помощью отображенного типа
type Events2 = { // Определяем единый тип объекта, перечисляющего каждое событие,
                 // которое может отправить клиент Redis наряду с аргументами для этого события.
    ready: void
    error: Error
    reconnecting: {attempt: number, delay: number}
}
type RedisClient2 = {
    // Отображаем тип Events, сообщая TypeScript, что on может быть вызван с любыми событиями, которые мы определили
    on<E extends keyof Events2>(event: E,
                                f: (arg: Events2[E]) => void): void
    emit<E extends keyof Events2>(event: E,
                                  arg: Events2[E]): void
}


// [Типобезопасная многопоточность]

// В браузере: с помощью веб-работников (передача сообщений)

// Сначала выделим веб-работник из потока:
// MainThread.ts
let worker = new Worker('WorkerScript.js')
// метод .onmessage в главном потоке для прослушивания входящих сообщений.
worker.onmessage = e => {
    console.log(e.data) // Выводит в консоль 'Подтверждаю получение: "some data"'
}
// Затем передадим этому работнику сообщение:
worker.postMessage('some data')

// Со стороны веб-работника вы прослушиваете входящие события посредством глобально доступного API onmessage:
// WorkerScript.ts
onmessage = e => {
    console.log(e.data) // Выводит в консоль 'некие данные'
    postMessage("Ack: ${e.data}")
}


// типизация
// MainThread.ts
type Message = string
type ThreadID = number
type UserID = number
type Participants = UserID[]
type Commands = {
    sendMessageToThread: [ThreadID, Message]
    createThread: [Participants]
    addUserToThread: [ThreadID, UserID]
    removeUserFromThread: [ThreadID, UserID]
}
type Events = {
    receivedMessage: [ThreadID, UserID, Message]
    createdThread: [ThreadID, Participants]
    addedUserToThread: [ThreadID, UserID]
    removedUserFromThread: [ThreadID, UserID]
}

// WorkerScript.ts
// объединение всех возможных команд и аргументов для них, которые главный поток может отправить потоку работника.
type Command =
    | {type: 'sendMessageToThread', data: [ThreadID, Message]}
    | {type: 'createThread', data: [Participants]}
    | {type: 'addUserToThread', data: [ThreadID, UserID]}
    | {type: 'removeUserFromThread', data: [ThreadID, UserID]}

onmessage = e =>
    processCommandFromMainThread(e.data)

function processCommandFromMainThread(command: Command) {
    switch (command.type) {
        case 'sendMessageToThread':
            let [threadID, message] = command.data
            console.log(message)
        // ...
    }
}

// типобезопасная обертка для API EventEmitter
import EventEmitter from 'events'

class SafeEmitter<Events extends Record<PropertyKey, unknown[]>> {
    private emitter = new EventEmitter

    emit<K extends keyof Events>(channel: K,
                                 ...data: Events[K]) {
        return this.emitter.emit(channel, ...data)
    }

    on<K extends keyof Events>(channel: K,
                               listener: (...data: Events[K]) => void) {
        return this.emitter.on(channel, listener)
    }
}



// Прослушивание событий, поступающих из главного потока.
let commandEmitter = new SafeEmitter <Commands>()
// Отправка событий обратно в главный поток.
let eventEmitter = new SafeEmitter <Events>()

// Обертывание команд, поступающих от главного потока,
// с помощью типобозопасного отправителя событий.
onmessage = command =>
    commandEmitter.emit(command.data.type, ...command.data.data)
// Прослушивание событий, созданных работником, и отправка их обратно главному потоку.
eventEmitter.on('receivedMessage', data =>
    postMessage({type: 'receivedMessage', data})
)
eventEmitter.on('createdThread', data =>
    postMessage({type: 'createdThread', data})
)
// и т.д.
// Ответ на команду из главного потока sendMessageToThread
commandEmitter.on('sendMessageToThread', (threadID, message) =>
    console.log("OK, I will send a message to threadID ${threadID}")
)
// Отправка события обратно главному потоку.
eventEmitter.emit('createdThread', 123, [456, 789])


// Типобезопасные протоколы
type Matrix = number[][]
type MatrixProtocol = {
    determinant: {
        in: [Matrix]
        out: number
    }
    'dot-product': {
        in: [Matrix, Matrix]
        out: Matrix
    }
    invert: {
        in: [Matrix]
        out: Matrix
    }
}

// цель — обернуть небезопасную операцию (отправку и получение нетипизированных сообщений работником)
// в безопасную через предоставление потребителю правильно определенного типизированного API

// общий тип Protocol, неспецифичный для MatrixProtocol
type Protocol = {
    [command: string]: {
        in: unknown[]
        out: unknown
    }
}

function createProtocol<P extends Protocol>(script: string) {
    return <K extends keyof P>(command: K) =>
        (...args: P[K]['in']) =>
            new Promise<P[K]['out']>((resolve, reject) => {
                let worker = new
                worker(script)
                worker.onerror = reject
                worker.onmessage = event => resolve(event.data.data)
                worker.postMessage({command, args})
            })
}

let runWithMatrixProtocol = createProtocol<MatrixProtocol>(
    'MatrixWorkerScript.js'
)
let parallelDeterminant = runWithMatrixProtocol('determinant')
parallelDeterminant([[1, 2], [3, 4]])
    .then(determinant =>
        console.log(determinant) // -2
    )

// в реальной жизни предпочтете использовать существующий инструмент вроде
// Swagger, gRPC, Thrift или GraphQL


// В NodeJS: с помощью дочерних процессов
// npm install @types/node --save-dev

// MainThread.ts
import {fork} from 'child_process'
let child = fork('./ChildThread.js')
child.on('message', data =>
    console.info('Child process sent a message', data)
)
child.send({type: 'syn', data: [3]})

// В дочернем потоке мы прослушиваем сообщения, поступающие из главного потока,
// при помощи API process.on, а отправляем их посредством process.send:
// ChildThread.ts
process.on('message', data =>
    console.info('Parent process sent a message', data)
)
process.send({type: 'ack', data: [3]})

