
// Флаги безопасности компилятора TSC

// Таблица Е.1. Флаги безопасности TSC
// Флаг                          Опция
// -------------------------------------------------------------
// alwaysStrict                  Генерирует 'use strict'
// noEmitOnError                 Не генерирует JavaScript, если код содержит ошибки
// noFallthroughCasesInSwitch    Убеждается, что каждый случай switch возвращает значение или проваливается
// noImplicitAny                 Выдает ошибку, когда тип переменной выведен как any.
// noImplicitReturns             Убеждается, что каждый путь каждой функции делает возврат явно
//                               (см. раздел «Тотальность», с. 165)
// noImplicitThis                Выдает ошибку при использовании this в функции
//                               без явного аннотирования типа this (см. подраздел «Типизация this», с. 351)
// noUnusedLocals                Предупреждает о неиспользованных локальных переменных
// noUnusedParameters            Предупреждает о неиспользуемых параметрах функции.
//                               Для игнорирования этой функции добавьте к параметрам префикс _
// strictBindCallApply           Убеждается в безопасности bind, call, и apply
//                               (см. подраздел «Методы call, apply и bind», с. 72)
// strictFunctionTypes           Убеждается, что функции контрвариантны в их параметрах
//                               и типах this (см. подраздел «Вариантность функций», с. 151)
// strictNullChecks              Проверяет тип на null (см. подраздел «null, undefined, void и never», с. 57)
// strictPropertyInitialization  Убеждается, что свойства класса либо допускают null, либо инициализированы (см. главу 5)
