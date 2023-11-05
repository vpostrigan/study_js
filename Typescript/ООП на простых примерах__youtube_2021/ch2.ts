//

// Инкапсуляция и сокрытие. Модификаторы доступа.

// сокрытие данных в капсуле, в процедурном такого нет

// сокрытие, есть публичные свойства - имя/фамилия и методы, а есть скрытые - работа органов

class Rectangle {
    private _width // private из вне обратится не получится, в js ts - нижнее подчеркивание, свойство приватное
    private _height

    constructor(w, h) {
        this._width = w
        this._height = h
    }

    calcArea() {
        return this._width * this._height
    }

    // get / set для доступа
    /* public - by default*/ get width() {
        return this._width;
    }

    /* public - by default*/ set width(value) {
        if (value <= 0) {
            this._width = 1
        } else {
            this._width = value
        }
    }

}

const rect = new Rectangle(5, 10)
rect.width = -2 // будет вызван 'set width(value)'
console.log(rect)


// //

class User {
    private _username
    private _password
    private _id

    constructor(username, password) {
        this._username = username
        this._password = password
        // this._id = generateRandomId()
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get id() {
        return this._id;
    }
}
const user = new User('Test', 'password')
// user.id = 100


// //

class Database0 {
    private url
    private port
    private username
    private password

    constructor(url, port, username, password) {
        this.url = url;
        this.port = port;
        this.username = username;
        this.password = password;
    }
}

// Но если создать getter, все имена будут начинатся с '_'

class Database {
    private _url
    private _port
    private _username
    private _password
    private _tables

    constructor(url, port, username, password) {
        this._url = url;
        this._port = port;
        this._username = username;
        this._password = password;
        this._tables = []
    }

    public createNewTable(table) {
        this._tables.push(table)
    }

    get url() {
        return this._url;
    }

    get port() {
        return this._port;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }
}
const db = new Database(1, 2, 3,4)
//db.tables = []
db.createNewTable({name: 'roles'})
db.createNewTable({name: 'users'})
