
// Правила написания файлов деклараций для сторонних модулей JavaScript
// Таблица Г.1. Декларации TypeScript и их эквиваленты, имеющие только типы
//   .ts                                      .d.ts
// -------------------------------------------------------------------
// var a = 1                                  declare var a: number
// let a = 1                                  declare let a: number
// const a = 1                                declare const a: 1
// function a(b) { return b.toFixed()}        declare function a(b: number): string
// class A { b() { return 3 } }               declare class A { b(): number }
// namespace A {}                             declare namespace A {}
// type A = number                            type A = number
// interface A { b?: string }                 interface A { b?: string }



// [Типы экспорта]

// Глобальные объекты

// Каждая из этих деклараций будет доступна глобально для каждого файла проекта без явного импорта:

// Глобальная переменная
declare let someGlobal: GlobalType
// Глобальный класс
declare class GlobalClass {}
// Глобальная функция
declare function globalFunction(): string
// Глобальное перечисление
enum GlobalEnum {A, B, C}
// Глобальное пространство имен
namespace GlobalNamespace {}
// Глобальный псевдоним типа
type GlobalType = number
// Глобальный интерфейс
interface GlobalInterface {}



// Экспорт ES2015

// Экспорт по умолчанию
declare let defaultExport: SomeType
export default defaultExport

// Проименованный экспорт
export class SomeExport {
  a: SomeOtherType
}

// Экспорт класса
export class ExportedClass {}

// Экспорт функции
export function exportedFunction(): string

// Экспорт перечисления
enum ExportedEnum {A, B, C}

// Экспорт пространства имен
export namespace SomeNamespace {
  let someNamespacedExport: number
}

// Экспорт типа
export type SomeType = {
  a: number
}

// Экспорт интерфейса
export interface SomeOtherType {
  b: string
}



// Экспорт CommonJS
// CommonJS де-факто был стандартом модулей до появления ES2015
// и на момент написания книги все еще является стандартом для NodeJS

// Например, чтобы типизировать несколько экспортов, а не экспорт по умолчанию, мы экспортируем одно namespace:
declare namespace MyNamedExports {
  export let someExport: SomeType
  export type SomeType = number

  export class OtherExport {
    otherType: string
  }
}
export = MyNamedExports


// для модуля CommonJS, который имеет и экспорт по умолчанию,
// и именованный экспорт? Для него мы используем слияние деклараций:
declare namespace MyExports {
  export let someExport: SomeType
  export type SomeType = number
}
declare function MyExports(a: number): string
export = MyExports



// Экспорт UMD

// Экспорт по умолчанию
declare let defaultExport: SomeType
export default defaultExport

// Именованный экспорт
export class SomeExport {
  a: SomeType
}

// Экспорт типа
export type SomeType =
  {
    a: number
  }
export as namespace MyModule

//
let a = new MyModule.SomeExport



// [Расширение модуля]

// - Глобальные объекты
// пример, добавим в jQuery новый метод marquee.

// установка самого jquery:
// npm install jquery --save
// npm install @types/jquery --save-dev

// создадим в проекте новый файл, jquery-extensions.d.ts
interface JQuery {
  marquee(speed: number): JQuery<HTMLElement>
}

// Теперь в любом файле, применяющем jQuery, мы можем использовать marquee
import $ from 'jquery'
$(myElement).marquee(3)


// - Модули

// пример типизируем новый экспорт для React.

// Начнем с установки React и его деклараций типов:
// npm install react --save
// npm install @types/react --save-dev

// Затем воспользуемся слиянием модулей и просто объявим модуль с таким же именем, что и у нашего модуля React:
import {ReactNode} from 'react'
declare module 'react' {
  export function inspect(element: ReactNode): void
}

// добавить встроенный редуктор (reducer) для компонентов React
export = React
export as namespace React
declare namespace React {
  interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {
  }

  class Component<P, S> {
    constructor(props: Readonly<P>)
    // ...
  }
  // ...
}
// Расширим Component методом reducer. Для этого в файле react-extensions.d.ts в корне проекта укажем следующее:
import 'react' // переключая тем самым наш файл расширения в режим скриптов для потребления модуля React.
declare module 'react' {
  interface Component<P, S> { // Расширяем интерфейс Component
    reducer(action: object, state: S): S
  }
}


// можем объявить компоненты React со встроенными методами reducer типобезопасным способом:
import * as React from 'react'

type Props = {
  // ...
}
type State = {
  count: number
  item: string
}
type Action =
  | { type: 'SET_ITEM', value: string }
  | { type: 'INCREMENT_COUNT' }
  | { type: 'DECREMENT_COUNT' }

class ShoppingBasket extends React.Component<Props, State> {
  reducer(action: Action, state: State): State {
    switch (action.type) {
      case 'SET_ITEM':
        return {...state, item: action.value}
      case 'INCREMENT_COUNT':
        return {...state, count: state.count + 1}
      case 'DECREMENT_COUNT':
        return {...state, count: state.count - 1}
    }
  }
}

