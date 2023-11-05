// To compile use:
// $ tsc -t es5 index.ts
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
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
// создать объект
var max = new User();
console.log(max); // User {}
// //
var User2 = /** @class */ (function () {
    function User2() {
        this.name = 'Max';
    }
    return User2;
}());
var max2 = new User2();
console.log(max2); // User2 {name: 'Max'}
// //
var User3 = /** @class */ (function () {
    function User3(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    return User3;
}());
var max3 = new User3('Max3', 'Grom3');
console.log(max3); // User3 {name: 'Max3', surname: 'Grom3'}
// //
console.log(max3.name + " " + max3.surname); // Max3 Grom3  есть доступ так как поля public
max3.name = '1230'; // можно, так как поле public
var User4 = /** @class */ (function () {
    function User4(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    User4.prototype.setName = function (name) {
        // this.name = name; // будет ошибка, так как readonly
    };
    return User4;
}());
var max4 = new User4('Max4', 'Grom4');
console.log(max4.name + " " + max4.surname); // Max4 Grom4
//max4.name = '1230'; // будет ошибка, так как поле readonly
// //
var User5 = /** @class */ (function () {
    function User5(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    User5.prototype.setName = function (name) {
        this.name = name;
    };
    User5.prototype.fullName = function () {
        return this.name + " " + this.surname;
    };
    return User5;
}());
var max5 = new User5('Max5', 'Grom5');
// console.log(max5.name + " " + max5.surname); // эти поля больше не видны
console.log(max5.fullName()); // Max5 Grom5
// //
var User6 = /** @class */ (function () {
    //private name: string; // эти поля можно больше не писать
    //private surname: string;
    function User6(name, surname) {
        this.name = name;
        this.surname = surname;
        //this.name = name; // можно больше не писать
        //this.surname = surname;
    }
    User6.prototype.fullName = function () {
        return this.name + " " + this.surname;
    };
    return User6;
}());
var max6 = new User6('Max6', 'Grom6');
console.log(max6.fullName()); // Max6 Grom6
// //
var User7 = /** @class */ (function () {
    function User7(name, surname) {
        this.name = name;
        this.surname = surname;
        //this.name = name; // можно больше не писать
        //this.surname = surname;
    }
    Object.defineProperty(User7.prototype, "fullName", {
        get: function () {
            return this.name + " " + this.surname;
        },
        set: function (fullName) {
            var _a = fullName.split(' '), name = _a[0], surname = _a[1];
            this.name = name;
            this.surname = surname;
        },
        enumerable: false,
        configurable: true
    });
    return User7;
}());
var max7 = new User7('Max7', 'Grom7');
console.log(max7.fullName); // Max7 Grom7 // больше не fullName()
max7.fullName = "Max7 Hrom7";
console.log(max7.fullName); // Max7 Hrom7
// //
// protected поле будет доступно в наследниках и там может быть переопределено
var User8 = /** @class */ (function () {
    function User8(name, surname, _isAdmin) {
        if (_isAdmin === void 0) { _isAdmin = false; }
        this.name = name;
        this.surname = surname;
        this._isAdmin = _isAdmin;
    }
    Object.defineProperty(User8.prototype, "fullName", {
        get: function () {
            return this.name + " " + this.surname;
        },
        enumerable: false,
        configurable: true
    });
    User8.prototype.isAdmin = function () {
        return this._isAdmin;
    };
    return User8;
}());
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isAdmin = true;
        return _this;
    }
    return Admin;
}(User8));
var max8 = new User8('Max8', 'Grom8');
if (max8.isAdmin()) {
    console.log('Hello Admin ' + max8.fullName);
}
else {
    console.log('Hello User ' + max8.fullName); // Hello User Max8 Grom8
}
var max82 = new Admin('Max82', 'Grom82');
if (max82.isAdmin()) {
    console.log('Hello Admin ' + max82.fullName); // Hello Admin Max82 Grom82
}
else {
    console.log('Hello User ' + max82.fullName);
}
// //
var UserAgeRestriction = 18;
var User9 = /** @class */ (function () {
    function User9(name, surname, age, _isAdmin) {
        if (_isAdmin === void 0) { _isAdmin = false; }
        this.name = name;
        this.surname = surname;
        this.age = age;
        this._isAdmin = _isAdmin;
        if (this.age < UserAgeRestriction) {
            throw new Error('Age must be more than ' + UserAgeRestriction + 'years');
        }
    }
    Object.defineProperty(User9.prototype, "fullName", {
        get: function () {
            return this.name + " " + this.surname;
        },
        enumerable: false,
        configurable: true
    });
    User9.prototype.isAdmin = function () {
        return this._isAdmin;
    };
    return User9;
}());
try {
    var max9 = new User9('Max9', 'Grom9', 15);
    console.log(max7.fullName); // этот код не был выполнен
}
catch (e) {
    console.log('ERROR:' + e.message); // ERROR:Age must be more than 18years
}
