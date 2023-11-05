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
