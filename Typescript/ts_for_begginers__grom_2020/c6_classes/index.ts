//

// To compile use:
// $ tsc -t es5 index.ts

class User {
}

// создать объект
const max = new User();
console.log(max); // User {}

// //

class User2 {
    name: string = 'Max';
}

const max2 = new User2();
console.log(max2); // User2 {name: 'Max'}

// //

class User3 {
    name: string; // по умолчанию поля public
    surname: string;

    constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }
}

const max3 = new User3('Max3', 'Grom3');
console.log(max3); // User3 {name: 'Max3', surname: 'Grom3'}

// //

console.log(max3.name + " " + max3.surname); // Max3 Grom3  есть доступ так как поля public
max3.name = '1230'; // можно, так как поле public

class User4 {
    readonly name: string; // по умолчанию поля public
    readonly surname: string;

    constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }

    setName(name: string) {
        // this.name = name; // будет ошибка, так как readonly
    }
}

const max4 = new User4('Max4', 'Grom4');
console.log(max4.name + " " + max4.surname); // Max4 Grom4
//max4.name = '1230'; // будет ошибка, так как поле readonly

// //

class User5 {
    private name: string;
    private surname: string;

    constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }

    setName(name: string) {
        this.name = name;
    }

    fullName(): string {
        return this.name + " " + this.surname;
    }
}

const max5 = new User5('Max5', 'Grom5');
// console.log(max5.name + " " + max5.surname); // эти поля больше не видны
console.log(max5.fullName()); // Max5 Grom5

// //

class User6 {
    //private name: string; // эти поля можно больше не писать
    //private surname: string;

    constructor(private name: string, private surname: string) {
        //this.name = name; // можно больше не писать
        //this.surname = surname;
    }

    fullName(): string {
        return this.name + " " + this.surname;
    }
}

const max6 = new User6('Max6', 'Grom6');
console.log(max6.fullName()); // Max6 Grom6

// //

class User7 {
    get fullName(): string {
        return this.name + " " + this.surname;
    }

    set fullName(fullName: string) {
        const [name, surname] = fullName.split(' ');
        this.name = name;
        this.surname = surname;
    }

    constructor(private name: string, private surname: string) {
        //this.name = name; // можно больше не писать
        //this.surname = surname;
    }

}

const max7 = new User7('Max7', 'Grom7');
console.log(max7.fullName); // Max7 Grom7 // больше не fullName()
max7.fullName = "Max7 Hrom7";
console.log(max7.fullName); // Max7 Hrom7

// //

// protected поле будет доступно в наследниках и там может быть переопределено

class User8 {
    get fullName(): string {
        return this.name + " " + this.surname;
    }

    constructor(private name: string, private surname: string, protected _isAdmin = false) {
    }

    isAdmin(): boolean {
        return this._isAdmin;
    }
}

class Admin extends User8 {
    protected _isAdmin: boolean = true;
}

const max8 = new User8('Max8', 'Grom8');
if (max8.isAdmin()) {
    console.log('Hello Admin ' + max8.fullName)
} else {
    console.log('Hello User ' + max8.fullName) // Hello User Max8 Grom8
}
const max82 = new Admin('Max82', 'Grom82');
if (max82.isAdmin()) {
    console.log('Hello Admin ' + max82.fullName) // Hello Admin Max82 Grom82
} else {
    console.log('Hello User ' + max82.fullName)
}

// //

// error и константы не поля объекта

const UserAgeRestriction = 18; // global константа

class User9 {
    static ageRestriction = 18; // local константа

    get fullName(): string {
        return this.name + " " + this.surname;
    }

    constructor(private name: string, private surname: string,
                private age: number,
                protected _isAdmin = false) {
        if (this.age < User9.ageRestriction) {
            throw new Error('Age must be more than ' + UserAgeRestriction + 'years');
        }
    }

    isAdmin(): boolean {
        return this._isAdmin;
    }
}

try {
    const max9 = new User9('Max9', 'Grom9', 15);
    console.log(max7.fullName); // этот код не был выполнен
} catch (e) {
    // @ts-ignore
    console.log('ERROR:' + e.message); // ERROR:Age must be more than 18years
}

