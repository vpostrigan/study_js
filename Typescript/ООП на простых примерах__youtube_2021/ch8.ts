//

// Singleton

class Database {
    private static instance: Database

    url: string

    constructor(url: string) {
        if (Database.instance)
            return Database.instance
        this.url = '' + Math.random()
        Database.instance = this
    }
}

const db1 = new Database('')
const db2 = new Database('')
console.log(db1.url)
console.log(db2.url)
// вывод всегда будет одинаковый
// 0.6941772060097662
// 0.6941772060097662
