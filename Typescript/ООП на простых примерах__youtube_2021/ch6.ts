//

// Интерфейсы и абстрактные классы

interface Client11 {
    connect(url: string): void
    read(): string
    write(data: string): void
}

abstract class Client12 {
    connect(url: string): void {
        //
    }
    abstract read(): string
    abstract write(data: string): void
}


// //

interface Reader {
    read(url)
}
interface Writer {
    write(data)
}

class FileClient implements Reader, Writer {
    read(url) {
        //
    }
    write(data) {
        //
    }
}

class HttpClient implements Reader, Writer {
    read(url) {
        //
    }
    write(data) {
        //
    }
}

class FileReader0 implements Reader {
    read(url) {
    }
}

// //

class User {
    username: string
    age: number
}

class Car {

}

interface Repository {
    create: () => void
    get: () => void
    delete: () => void
    update: () => void
}

class UserRepo implements Repository {
    create(): void {
    }

    get(): void {
    }

    delete(): void {
    }

    update(): void {
    }
}

interface Repository2<T> {
    create: (obj: T) => void
    get: () => void
    delete: (obj: T) => void
    update: (obj: T) => void
}

class UserRepo2 implements Repository2<User> {
    create(obj: User): void {
    }

    get(): void {
    }

    delete(obj: User): void {
    }

    update(obj: User): void {
    }
}

class CarRepo2 implements Repository2<Car> {
    create(obj: Car): void {
    }

    get(): void {
    }

    delete(obj: Car): void {
    }

    update(obj: Car): void {
    }
}
