//
// Singleton
var Database = /** @class */ (function () {
    function Database(url) {
        if (Database.instance)
            return Database.instance;
        this.url = '' + Math.random();
        Database.instance = this;
    }
    return Database;
}());
var db1 = new Database('');
var db2 = new Database('');
console.log(db1.url);
console.log(db2.url);
