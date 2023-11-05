//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
function ClassDecorator(Constructor) {
    console.log(Constructor); // [Function: Foo] { barStatic: 'barStatic' }
    return Constructor;
}
var Foo = /** @class */ (function () {
    function Foo() {
        this.bar = 'BAR';
    }
    Foo.barStatic = 'barStatic';
    Foo = __decorate([
        ClassDecorator
    ], Foo);
    return Foo;
}());
var foo = new Foo();
console.log(foo); // Foo { bar: 'BAR' }
// //
function ClassDecorator2(Constructor) {
    var _a;
    console.log(Constructor); // [Function: Foo2] { barStatic: 'barStatic' }
    return _a = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.bar0 = 'BAR0';
                return _this;
            }
            return class_1;
        }(Constructor)),
        _a.barStatic0 = 'barStatic0',
        _a;
}
var Foo2 = /** @class */ (function () {
    function Foo2() {
        this.bar = 'BAR';
    }
    Foo2.barStatic = 'barStatic';
    Foo2 = __decorate([
        ClassDecorator2
    ], Foo2);
    return Foo2;
}());
var foo2 = new Foo2();
console.log(foo2); // class_1 { bar: 'BAR', bar0: 'BAR0' }
console.log(Foo2); // [Function: class_1] { barStatic0: 'barStatic0' }
// //
var Foo3 = ClassDecorator2((_a = /** @class */ (function () {
        function class_2() {
            this.bar3 = 'BAR3';
        }
        return class_2;
    }()),
    _a.barStatic3 = 'barStatic3',
    _a));
var foo3 = new Foo3();
console.log(foo3); // class_1 { bar: 'BAR', bar0: 'BAR0' }
console.log(Foo3); // [Function: class_1] { barStatic0: 'barStatic0' }
console.log(Foo3.barStatic3); // barStatic3
console.log(Foo3.barStatic0); // barStatic0
console.log(foo3.bar3); // BAR3
console.log(foo3.bar0); // BAR0
// //
var foo30 = new Foo2(); // как вариант через 'as any'
console.log(foo30.bar3); // undefined
console.log(foo30.bar0); // BAR0
// //
// другой вариант
function ClassDecorator4(props) {
    return function (Constructor) {
        var _a;
        console.log(Constructor); // [Function: Foo4] { barStatic: 'barStatic' }
        return _a = /** @class */ (function (_super) {
                __extends(class_3, _super);
                function class_3() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.bar0 = props.bar;
                    return _this;
                }
                return class_3;
            }(Constructor)),
            _a.barStatic0 = props.barStatic,
            _a;
    };
}
var Foo4 = /** @class */ (function () {
    function Foo4() {
        this.bar = 'BAR';
    }
    Foo4.barStatic = 'barStatic';
    Foo4 = __decorate([
        ClassDecorator4({
            barStatic: 'BAR STATIC',
            bar: 'bar'
        })
    ], Foo4);
    return Foo4;
}());
var foo4 = new Foo4(); // как вариант через 'as any'
console.log(foo4.bar); // undefined
console.log(foo4.bar0); // bar
console.log(foo4.barStatic); // undefined
console.log(foo4.barStatic0); // bar
