//

// [1] Generic in function
function getId<T>(id: T): T {
    return id;
}

getId<string>('String ID');
//getId<number>('123'); // Ошибка должна быть строка
getId<number>(123);


// [2] Generic in class
class Customer<T, B> {
    constructor(private id: T, private info: B) {
    }

    getId(): T {
        return this.id;
    }

    getInfo(): B {
        return this.info;
    }
}

const customer = new Customer<number, string>(44, 'name: Maks');
customer.getId().toFixed(); // toFixed - метод для работы с числами
customer.getInfo().trim(); // trim - метод для работы со строками


// [3] Generic with SuperClass
interface IModeal {
    id: number;
}

class Collection<T extends IModeal> {
    constructor(private items: T[]) {
    }

    find(id: number): T | null { // результат T или null
        const first = this.items.filter(model => model.id === id);
        return first.length ? first[0] : null;
    }
}

const collection = new Collection([{id: 42}]);
console.log(collection.find(42)); // { id: 42 }
console.log(collection.find(12)); // null


// [4] Generic with new
function factory<T>(type: { new(...args: any[]): T }, ...args: any[]): T {
    return new type(...args); // дополняем параметрами перед тем как создавать
}

const set = factory<Collection<IModeal>>(Collection, [{id: 42}]);
console.log(set.find(42)); // { id: 42 }
console.log(set.find(12)); // null
