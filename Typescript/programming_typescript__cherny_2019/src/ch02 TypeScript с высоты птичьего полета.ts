// > tsc .\ch01_exercises.ts
// > node .\ch01_exercises.js

let a: number = 1                // a является number
let b: string = 'hello'          // b является string
let c: boolean[] = [true, false] // c является массивом booleans

// TypeScript вывел за вас типы
let a2 = 1
let b2 = 'hello'
let c2 = [true, false]

// //

//alert(3 + [1]); // TS2365: Operator '+' cannot be applied to types '3' and 'number[]'.
console.log((3).toString() + [1].toString()); // // вычисляется как "31".

// //

// New project

// Создание каталога
//$ mkdir chapter-2
//$ cd chapter-2

// Инициализация нового проекта NPM (следуйте инструкциям)
//$ npm init

// Установка TSC, TSLint и деклараций типов для NodeJS
//$ npm install --save-dev typescript tslint @types/node

// TypeScript-проект должен содержать в корневой директории файл tsconfig.json.
// tsconfig.json файл можно создать с помощью
// ./node_modules/.bin/tsc --init

// устанавливать опции через
// ./node_modules/.bin/tsc --help

//{
//    "compilerOptions": {
//        "lib": ["es2015"], // Наличие каких API в вашей среде разработки должен предполагать TSC
//        "module": "commonjs", // В какую модульную систему должен производить компиляцию TSC (CommonJS, SystemJS, ES2015 и пр.)?
//        "outDir": "dist",  // В какой каталог TSC должен помещать сгенерированный JavaScript-код?
//        "sourceMap": true,
//        "strict": true,    // Как производить максимально строгую проверку кода и соблюдать правильную типизацию?
//        "target": "es2015" // В какую версию JavaScript нужно компилировать код (ES3, ES5, ES2015, ES2016 и пр.)?
//    },
//    "include": [  // В каких каталогах TSC должен искать файлы TypeScript?
//        "src"
//    ]
//}


// файл tslint.json, содержащий конфигурацию TSLint,
// определяющую необходимую вам стилистику кода (табуляции, пробелы и пр.).
// Следующая команда сгенерирует файл tslint.json со стандартной конфигурацией TSLint:
// $ ./node_modules/.bin/tslint --init


// когда настроили tsconfig.json и tslint.json, создайте каталог src,
// содержащий ваш первый файл TypeScript: index.ts

// Структура каталога проекта должна выглядеть так:
// chapter-2/
// ├──node_modules/
// ├──src/
// │ └──index.ts
// ├──package.json
// ├──tsconfig.json
// └──tslint.json

// Введите в src/index.ts
console.log('Hello TypeScript!')

// Скомпилируйте код с помощью TSC
// $ ./node_modules/.bin/tsc
// Запустите код с помощью NodeJS
// $ node ./dist/index.js

// Установите ts-node (https://www.npmjs.com/package/ts-node)
// и используйте его для компиляции и запуска программы посредством всего одной команды.

// Используйте инструмент автоматической генерации typescript-node-starter
// (https://github.com/Microsoft/TypeScript-Node-Starter) для быстрого создания структуры каталога.

