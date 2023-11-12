// Создание и запуск TypeScript

// [Создание проекта в TypeScript]

// Схема проекта
// Предлагаю хранить исходный код в каталоге верхнего уровня src/ и компилировать его в dist/

// пример:
// my-app/
// ├──dist/
// │ ├──index.d.ts
// │ ├──index.js
// │ └──services/
// │ ├──foo.d.ts
// │ ├──foo.js
// │ ├──bar.d.ts
// │ └──bar.js
// ├──src/
// │ ├──index.ts
// │ └──services/
// │ ├──foo.ts
// │ └──bar.ts


// Артефакты
// Таблица 12.1. Артефакты, которые может сгенерировать за вас TSC
// Тип                Расширение файла    Флаг tsconfig.json               По умолчанию
// ------------------------------------------------------------------------------------
// Файлы JavaScript   .js                 {"emitDeclarationOnly": false}   Да
// Карты кода         .js.map             {"sourceMap": true}              Нет
// Декларации типов   .d.ts               {"declaration": true}            Нет
// Карты деклараций   .d.ts.map           {"declarationMap": true}         Нет


// Регулировка компиляции для целевой среды
// для старых javascript:
// - Транспиляция (автоматическая конвертация) приложений из последней версии JavaScript в более старую
// - Использование полифилов (предоставление реализации) для новейших возможностей, отсутствующих в среде выполнения JavaScript


// target
// Чтобы установить цель транспиляции, откройте tsconfig.json и установите поле target как:
// - es3 для ECMAScript 3;
// - es5 для ECMAScript 5 (хорошее решение, если вы не уверены);
// - es6 или es2015 для ECMAScript 2015;
// - es2016 для ECMAScript 2016;
// - es2017 для ECMAScript 2017;
// - es2018 для ECMAScript 2018;
// - esnext для любой последней ревизии ECMAScript.
// Например, для компиляции в ES5:
// {
//   "compilerOptions": {
//     "target": "es5"
//   }
// }


// Библиотеки


// Активация карт кода


// Проектные ссылки (ускорение компиляции)
// 1. Разделите проект на несколько проектов. Проект — это просто каталог, содержащий tsconfig.json и код TypeScript.
// 2. В каждом каталоге проекта создайте tsconfig.json, содержащий по меньшей мере следующее:
// {
//   "compilerOptions": {
//     "composite": true,      // сообщающий TSC, что этот каталог является подпроектом более крупного проекта;
//     "declaration": true,    // Это создает границу, за которой TSC не будет перепроверять или перекомпилировать код: если вы
                               // обновите строку кода в подпроекте A, TSC не будет проверять другой подпроект B.
                               // Все, что ему нужно проверить на предмет ошибок типов, — декларации типов B.
//     "declarationMap": true,
//     "rootDir": "."          // rootDir явно определяет, что этот подпроект должен быть скомпилирован относительно корневого проекта (.)
//   },
//   "include": [
//     "./**/*.ts"
//   ],
//   "references": [           // references — массив подпроектов, от которых зависит текущий подпроект.
//     {
//     "path": "../myReferencedProject",
//     "prepend": true
//     }
//   ],
// }

// 3. Создайте корневой tsconfig.json, ссылающийся на любые подпроекты,
// на которые еще не ссылается ни один другой подпроект:
// {
//   "files": [],
//   "references": [
//     {"path": "./myProject"},
//     {"path": "./mySecondProject"}
//   ]
// }

// 4. Теперь при компиляции проекта в TSC используйте флаг build, чтобы он учел проектные ссылки:
// tsc --build # Или краткий вариант tsc -b


// Мониторинг ошибок


// ИСПОЛЬЗОВАНИЕ РАСШИРЕНИЯ ДЛЯ УМЕНЬШЕНИЯ РУТИННОГО КОДА В TSCONFIG.JSON
// чтобы все ваши подпроекты разделяли одни и те же настройки компиляции,
// создайте базовый tsconfig.json в корневом каталоге, который смогут расширить файлы tsconfig.json подпроектов

// А затем используйте опцию extends в этих файлах tsconfig.json подпроектов, чтобы добавить расширение:
// {
//   "extends": "../tsconfig.base",
//   "include": [
//   "./**/*.ts"
// ],
//   "references": [
//   {
//     "path": "../myReferencedProject",
//     "prepend": true
//   }
// ],
// }



// [Запуск TypeScript на сервере]


// [Запуск TypeScript в браузере]


// [Публикация TypeScript-кода на NPM]
// tsconfig.json
// {
//   "compilerOptions": {
//     "declaration": true,
//     "module": "umd",
//     "sourceMaps": true,
//     "target": "es5"
//   }
// }

// # .npmignore       // для исключения публикации исходного кода на NPM
// *.ts # Игнорировать файлы .ts
// !*.d.ts # Допустить .d.ts

// # .gitignore       // исключите сгенерированные артефакты из репозитория Git, чтобы избежать его засорения
// *.d.ts # Игнорировать файлы .d.ts
// *.js # Игнорировать .js

// или
// # .npmignore
// src/ # Игнорировать #исходные файлы
// # .gitignore
// dist/ # Игнорировать сгенерированные файлы


// В завершение добавьте поле "types" в файл package.json проекта
// а также добавьте скрипт для сборки пакета перед его отправкой
// {
//   "name": "my-awesome-typescript-project",
//   "version": "1.0.0",
//   "main": "dist/index.js",
//   "types": "dist/index.d.ts",
//   "scripts": {
//     "prepublishOnly": "tsc -d"
//   }
// }



// [Директивы с тремя слешами]

// - Директива types
// Если у вас есть инструкция import, чей экспорт используется только в позиции типа в модуле
// (то есть вы просто импортировали из этого модуля тип),
// TypeScript не будет генерировать для этого import код JavaScript — рассматривайте его как существующий только на уровне типов.
// Эта функция называется пропуском импорта.

// Исключением из этого правила являются импорты, используемые для побочных эффектов
// Например:

// global.ts
// type MyGlobal = number

// app.ts
// import './global'

// Если ни один из этих вариантов не подходит и вы хотите продолжить импортировать целые модули,
// но избежать JavaScript-вызова import или require для этого импорта,
// используйте директиву types.

// Для директивы types это выглядит так:
// 1. Объявление зависимости во внешней декларации типа:
/// <reference types="./global" />
// 2. Объявление зависимости в @types/jasmine/index.d.ts:
/// <reference types="jasmine" />

// - Директива amd-module
// При компиляции TypeScript-кода в формат модулей AMD (что указано в tsconfig.json как {"module": "amd"})
// TypeScript по умолчанию генерирует анонимные модули AMD.
// Директиву в данном случае можно использовать, чтобы задать модулям имена.
// К примеру, у вас есть следующий код:

/// <amd-module name="LogService" />
export let LogService = {
  log() {
    // ...
  }
}
// При его компиляции в формат модулей AMD, TSC генерирует следующий код JavaScript:
define(['require', 'exports'],
  function(require, exports) {
    exports.esModule = true
    exports.LogService = {
      log() {
        // ...
      }
    }
  }
)

