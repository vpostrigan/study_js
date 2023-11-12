// Взаимодействие с JavaScript

// [Декларации типов]
// Декларация типа — это файл с расширением .d.ts

// Рассмотрим часть TypeScript кода (.ts) и эквивалентную ей декларацию типа (d.ts).


// [Внешние декларации переменных]
declare let process: {
  env: {
    NODE_ENV: 'development' | 'production'
  }
}
process =
  { env: {
      NODE_ENV: 'production'
    }
  }

// [Внешние декларации типов]
// Внешние декларации типов следуют тем же правилам, что и внешние декларации переменных:
// они должны существовать в файле .ts или .d.ts с режимом скриптов
// и быть доступными глобально для других файлов проекта без явного импорта.

// пример, глобальный тип общего назначения ToArray<T>, который поднимает T до массива,
// если он еще не является таковым.
// Мы можем определить этот тип в любом файле проекта с режимом скриптов.
// В данном примере определим его в файле верхнего уровня types.ts:
type ToArray<T> = T extends unknown[] ? T : T[]

// Теперь можно использовать этот тип из любого файла проекта без его явного импорта.
function toArray<T>(a: T): ToArray<T> {
  // ...
}


// использование сторонних деклараций типов для моделирования типов данных, которые применяются по всему приложению.
type UserID = string & {readonly brand: unique symbol}

// [Внешние декларации модулей]
// Внешняя декларация модулей — это регулярная декларация модулей, окруженная особым синтаксисом declare module:
declare module 'module-name' {
  export type MyType = number
  export type MyDefaultType = {a: string}
  export let myExport: MyType
  let myDefaultExport: MyDefaultType
  export default myDefaultExport
}

// Имя модуля (в текущем примере 'module-name') точно соответствует пути import.
// Когда вы импортируете этот путь, ваша внешняя декларация модуля сообщит TypeScript, что именно доступно:
import ModuleName from 'module-name'
ModuleName.a // строка

// Если у вас есть вложенный модуль, то обязательно включите весь путь import в его декларацию:
declare module '@most/core' {
  // Декларация типа
}


// «Я импортирую этот модуль, а типизирую его позже, пока предположи, что это any»
declare module 'unsafe-module-name'
// Теперь потребление такого модуля будет менее безопасным:
import {x} from 'unsafe-module-name'
x // any



// Декларации модулей поддерживают подстановочные импорты, и можно задать тип любому пути import,
// который соответствует заданному паттерну.
// Для этого используйте подстановочный знак (*):
// Файлы типа JSON, импортированные с помощью Webpack загрузчика json.
declare module 'json!*' {
  let value: object
  export default value
}
// Файлы типа CSS, импортированные с помощью Webpack загрузчика стиля.
declare module '*.css' {
  let css: CSSRuleList
  export default css
}
// Теперь можно загружать JSON и CSS файлы:
import a from 'json!myFile'
a // объект
import b from './widget.css'
b // CSSRuleList



// [Поэтапная миграция из JavaScript в TypeScript]
// - Шаг 1: добавление TSC
// позвольте TSC компилировать JavaScript-файлы вместе с файлами TypeScript в настройках tsconfig.json:
// {
//   "compilerOptions": {
//   "allowJs": true
// }

// - Шаг 2a: активация проверки типов для JavaScript (по желанию)
// {
//   "compilerOptions": {
//   "allowJs": true,
//   "checkJs": true
// }
// Теперь, когда бы TypeScript ни компилировал файл JavaScript,
// он будет стараться вывести типы и произвести их проверку так же, как он делает это для кода TypeScript.

// для проверки по файлу
// добавив директиву // @ts-check (обычный комментарий в верхней части файла).

// или не проверять для файлов
// добавьте директиву // @ts-nocheck именно для этих файлов.


// Когда TypeScript выполняет код JavaScript, он использует более мягкий алгоритм вывода, чем в случае с кодом TypeScript
class A {
  x = 0 // number | string | string[], вывод на основе использования.
  method() {
    this.x = 'foo'
  }
  otherMethod() {
    this.x = ['array', 'of', 'strings']
  }
}

// - Шаг 2б: добавление аннотаций JSDoc (по желанию)
// JSDoc ==  @param, @returns и т. д.

/**
 * @param word {string} Строка ввода для конвертации.
 * @returns {string} Строка в PascalCase
 */
export function toPascalCase(word) {
  return word.replace(
    /\w+/g,
    ([a, ...b]) => a.toUpperCase() + b.join('').toLowerCase()
  )
}
// Без этой аннотации JSDoc TypeScript вывел бы тип toPascaleCase как (word:any) => string.
// Теперь же при компиляции он будет знать, что тип toPascaleCase — это (word:string) => string.
// А вы при этом получите полезное документирование.


// - Шаг 3: переименование файлов в .ts
// Файл за файлом обновляйте разрешения файлов с .js (или .coffee, es6 и т. д.) в .ts.

// Если у вас включена опция checkJs, включите noImplicitAny в tsconfig.json,
// чтобы обнаружить все any и типизировать их.


// - Шаг 4: активация строгости
// По окончании вы можете отключить TSC-флаги, отвечающие за взаимодействие с JavaScript,
// подтверждая, что весь ваш код написан в строго типизированном TypeScript:
// {
//   "compilerOptions": {
//   "allowJs": false,
//   "checkJs": false
// }



// [Поиск типов для JavaScript]
// 1. Ищет потомка файла .d.ts с тем же именем, что и у файла .js.
// Найденный потомок используется в качестве декларации типов для этого файла .js.

// my-app/
// ├──src/
// │ ├──index.ts
// │ └──legacy/
// │  ├──old-file.js
// │  └──old-file.d.ts

// импортируется old-file (старый файл) из index.ts:
// index.ts
// import './legacy/old-file'

// (TypeScript использует src/legacy/old-file.d.ts в качестве источника деклараций типов для ./legacy/old-file)

// 2. В противном случае, если allowJs и checkJs установлены как true,
// будет сделан вывод типов файла .js (на основе представленных в нем аннотаций JSDoc)
// или весь модуль будет обозначен как any.



// При импортировании стороннего модуля JavaScript
// 1. Ищет для модуля локальную декларацию типа и, если таковая существует, использует ее.

// пример
// my-app/
// ├──node_modules/
// │ └──foo/
// ├──src/
// │ ├──index.ts
// │ └──types.d.ts

// А так выглядит type.d.ts:
// types.d.ts
declare module 'foo' {
  let bar: {}
  export default bar
}

// Если затем вы импортируете foo, то в качестве источника типов для
// него TypeScript использует внешнюю декларацию модуля в types.d.ts:
// index.ts
// import bar from 'foo'

// 2. В противном случае он будет искать декларацию в файле package.json, принадлежащем модулю.
// Если в нем определено поле types или typings, то он использует файл .d.ts,
// на который это поле указывает, и возьмет декларации типов из него.

// 3. Или он будет поочередно просматривать каталоги в поиске каталога node modules/@types,
// где содержатся декларации типов для модуля.

// Пример, React:
// npm install react --save
// npm install @types/react --save-dev
// my-app/
// ├──node_modules/
// │ ├──@types/
// │ │ └──react/
// │ └──react/
// ├──src/
// │ └──index.ts
// При импорте React TypeScript найдет каталог @types/react и использует
// его в качестве источника деклараций типов для него:
// index.ts
// import * as React from 'react'

// 4. В противном случае он перейдет к шагам 1–3 алгоритма локального поиска типов.


// [Использование стороннего кода JavaScript]
// 1. JavaScript с декларациями типов
// (Установленный код уже содержит декларации типов.)
// npm install rxjs
// npm install ava
// npm install @angular/cli

// 2. JavaScript, имеющий декларации типов на DefinitelyTyped
// (Код не содержит декларации типов, но их можно взять из DefinitelyTyped.)
// (в централизованном и поддерживаемом сообществом репозитории)

// npm install lodash –save              # Установить Lodash
// npm install @types/lodash --save-dev  # Установить декларации типов для Lodash

// 3. Код не содержит декларации типов, и их нет на DefiniteTyped.
// (JavaScript, не имеющий деклараций типов на DefinitelyTyped)
// a) Поместите в белый список нетипизированный импорт, добавив над ним директиву // @ts-ignore.
// TypeScript позволит использовать этот нетипизированный модуль, но сам модуль, включая все его содержимое, будет типизирован как any:

// @ts-ignore
// import Unsafe from 'untyped-module'
// Unsafe // any

// b) Поместите в белый список все применения этого модуля,
// создав пустой файл деклараций типов и заглушив модуль

// types.d.ts
// declare module 'nearby-ferret-alerter'

// Это сообщит TypeScript, что существует модуль, который вы можете импортировать
// (import alert from 'nearby-ferret-alerter'), но ничего не сообщит о содержащихся в нем типах.

// с) Создайте внешнюю декларацию модуля.

// types.d.ts
declare module 'nearby-ferret-alerter' {
  export default function alert(loudness: 'soft' | 'loud'): Promise<void>
  export function getFerretCount(): Promise<number>
}
// Теперь, когда вы произведете import alert from 'nearby-ferretalerter',
// TypeScript будет точно знать тип alert, который теперь не any, а (loudness: 'quiet' | 'loud') => Promise<void>

// d) Создайте декларацию типов и отправьте ее на NPM.


// [Итоги]
// Таблица 11.1.Способы использования JavaScript из TypeScript
// Подход                                              Флаги                 tsconfig.json
// Импорт нетипизированного JavaScript                {"allowJs": true}       Слабая
// Импорт и проверка JavaScript                       {"allowJs": true,       Средняя
//                                                     "checkJs": true}
// Импорт и проверка JavaScript с аннотациями JSDoc   {"allowJs": true,       Отличная
//                                                     "checkJs": true,
//                                                     "strict": true}
// Импорт JavaScript с декларациями типов             {"allowJs": false,      Отличная
//                                                     "strict": true}
// Импорт TypeScript                                  {"allowJs": false,      Отличная
//                                                     "strict": true}

