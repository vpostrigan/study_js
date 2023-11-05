// Пространства имен и модули

// [Краткая история модулей JavaScript]
// В самом начале (1995 год) JavaScript не поддерживал никакую систему модулей.
// делали:
window.emailListModule = { renderList() {}
// ...
}
window.emailComposerModule = { renderComposer() {}
// ...
}
window.appModule = {
    renderApp() {
        window.emailListModule.renderList()
        window.emailComposerModule.renderComposer()
    }
}

// NodeJS осуществила это с помощью стандарта модулей CommonJS, что выглядело так:
// emailBaseModule.js
var emailList = require('emailListModule')
var emailComposer = require('emailComposerModule')
module.exports.renderBase = function() {
    // ...
}

// Шестое издание языка ECMAScript — ES2015 представило новый стандарт для импорта и экспорта,
// который имел чистый синтаксис и был статически анализируем. Выглядит это так:
// emailBaseModule.js
import emailList from 'emailListModule'
import emailComposer from 'emailComposerModule'
export function renderBase() {
// ...
}


// [import, export]
// a.ts
export function foo() {}
export function bar() {}
// b.ts
import {foo, bar} from './a'
foo()
export let result = bar()

// Стандарт модулей ES2015 поддерживает экспорт по умолчанию:
// c.ts
export default function meow(loudness: number) {}
// d.ts
import meow from './c' // Обратите внимание на отсутствие {фигурных скобок}.
meow(11)


// Он также поддерживает импортирование из модуля с помощью подстановочного импорта (*):
// e.ts
import * as a from './a' a.foo()
a.bar()
// А также повторный экспорт некоторых (или всех) экспортов из модуля:
// f.ts
export * from './a'
export {result} from './b'
export meow from './c'


// g.ts
export let X = 3
export type X = {y: string}
// h.ts
import {X} from './g'
let a = X + 1 // X относится к значению X
let b: X = {y: 'z'} // X относится к типу X


// [Динамический импорт]
// 1. Передайте строчный литерал непосредственно в import, не присваивая ему перед этим переменную.
// 2. Передайте в import выражение и самостоятельно аннотируйте сигнатуру модуля:
import {locale} from './locales/locale-us'
async function main() {
    let userLocale = await getUserLocale()
    let path = ./locales/locale-${userLocale}
    let localeUS: typeof locale = await import(path)
}

// TypeScript поддерживает динамический импорт только в режиме модуля esnext.
// Чтобы использовать динамический импорт, установите {"module": "esnext"}
// в пункте compilerOptions файла tsconfig.json


// [Использование кода CommonJS и AMD]
// При потреблении JavaScript-модуля, использующего стандарт CommonJS или AMD,
// вы можете просто импортировать из него имена, так же как и для модулей ES2015:
import {something} from './a/legacy/commonjs/module'

// По умолчанию предустановленный экспорт в CommonJS не взаимодействует с предустановленным импортом ES2015.
// Чтобы использовать этот экспорт, потребуется применить подстановочный импорт:
import * as fs from 'fs'
fs.readFile('some/file.txt')

// Чтобы взаимодействие было более гладким, установите {"esModuleInterop":true} в compilerOptions вашего tsconfig.json.
// Теперь можете обойтись без подстановки:
import fs from 'fs'
fs.readFile('some/file.txt')


// [Режим модулей против режима скриптов]



// [Пространства имен]

// пример
// Get.ts (модуль для создания запросов HTTP GET)
namespace Network {
    export function get<T>(url: string): Promise<T> {
        // ...
    }
}
// App.ts (потребитель, который использует этот модуль для создания запросов)
namespace App {
    Network.get<GitRepo>('https://api.github.com/repos/Microsoft/typescript')
}


// Пространства имен могут экспортировать другие пространства имен
namespace Network {
    export namespace HTTP {
        export function get <T>(url: string): Promise<T> {
            // ...
        }
    }
    export namespace TCP {
        listenOn(port: number): Connection {
            //...
        }
        // ...
    }
    export namespace UDP {
        // ...
    }
    export namespace IP {
        // ...
    }
}


// Подобно интерфейсам, пространства имен могут быть дополнены, что делает удобным их разделение между файлами.
// HTTP.ts
namespace Network {
    export namespace HTTP {
        export function get<T>(url: string): Promise<T> {
            // ...
        }
    }
}
// UDP.ts
namespace Network {
    export namespace UDP {
        export function send(url: string, packets: Buffer): Promise<void> {
            // ...
        }
    }
}
// MyApp.ts
Network.HTTP.get<Dog[]>('http://url.com/dogs')
Network.UDP.send('http://url.com/cats', new Buffer(123))


// [Коллизии]
// Коллизии между экспортами с одинаковыми именами не допускаются:
// HTTP.ts
namespace Network {
    export function request<T>(url: string): T {
        // ...
    }
}

// HTTP2.ts
namespace Network {
    // Ошибка TS2393: повторяющаяся реализация функции.
    export function request<T>(url: string): T {
        // ...
    }
}

// Исключением из этого правила являются внешние перегруженные декларации функций, используемые для уточнения типов функций:
// HTTP.ts
namespace Network {
    export function request<T>(url: string): T
}

// HTTP2.ts
namespace Network {
    export function request<T>(url: string, priority: number): T
}
// HTTPS.ts
namespace Network {
    export function request<T>(url: string, algo: 'SHA1' | 'SHA256'): T
}


// [Скомпилированный вывод]
// пространства имен не учитывают установки module в tsconfig.json (В отличие от импорта и экспорта)
// пространства имен всегда компилируются в глобальные переменные.

// пример
// Flowers.ts
namespace Flowers10 {
    export function give(count: number) {
        return count + ' flowers'
    }
}
// После прохождения TSC скомпилированный вывод выглядит так:
let Flowers10
(function (Flowers10) {
function give(count) {
    return count + ' flowers'
}
    Flowers10.give = give
})(Flowers10 || (Flowers10 = {})) // Если пространство имен Flowers уже определено глобально, то TypeScript расширяет его (Flowers).
                                           // В противном случае он создает и расширяет только что созданное пространство имен (Flowers = {})

// ЛУЧШЕ ИСПОЛЬЗОВАТЬ МОДУЛИ, А НЕ ПРОСТРАНСТВА ИМЕН
// Предпочитайте регулярные модули (вида import и export)

// [Слияние деклараций]
// ранее три типа слияния, которые TypeScript делает за нас.
// Слияние значений и типов, из-за которого одно и то же имя может относиться либо к значению, либо к типу в зависимости от использования
// Слияние нескольких пространств имен в одно.
// Слияние нескольких интерфейсов в один.

