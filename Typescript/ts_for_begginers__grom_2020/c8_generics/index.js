//
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// [1] Generic in function
function getId(id) {
    return id;
}
getId('String ID');
//getId<number>('123'); // Ошибка должна быть строка
getId(123);
// [2] Generic in class
var Customer = /** @class */ (function () {
    function Customer(id, info) {
        this.id = id;
        this.info = info;
    }
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getInfo = function () {
        return this.info;
    };
    return Customer;
}());
var customer = new Customer(44, 'name: Maks');
customer.getId().toFixed(); // toFixed - метод для работы с числами
customer.getInfo().trim(); // trim - метод для работы со строками
var Collection = /** @class */ (function () {
    function Collection(items) {
        this.items = items;
    }
    Collection.prototype.find = function (id) {
        var first = this.items.filter(function (model) { return model.id === id; });
        return first.length ? first[0] : null;
    };
    return Collection;
}());
var collection = new Collection([{ id: 42 }]);
console.log(collection.find(42)); // { id: 42 }
console.log(collection.find(12)); // null
// [4] Generic with new
function factory(type) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new (type.bind.apply(type, __spreadArray([void 0], args, false)))(); // дополняем параметрами перед тем как создавать
}
var set = factory(Collection, [{ id: 42 }]);
console.log(set.find(42));
