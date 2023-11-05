//

// Dependency injection

class User {
    username: string
    age: number
}

interface UserRepo {
    getUsers: () => User[]
    // delete, create ...
}

class UserMongoDBRepo implements UserRepo {
    getUsers(): User[] {
        console.log("MongoDB. getUsers")
        return [{age: 15, username: 'User from MongoDB'}];
    }
}

class UserService {
    userRepo: UserRepo // агрегация

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo;
    }

    filterUserByAge(age: number) {
        const users = this.userRepo.getUsers()
        // filter logic...
        console.log(users)
    }
}

const userService = new UserService(new UserMongoDBRepo())
userService.filterUserByAge(15)
// MongoDB. getUsers
// [ { age: 15, username: 'User from MongoDB' } ]

//const userService2 = new UserService(new UserMySqlDBRepo())
//userService2.filterUserByAge(15)

// сам сервис неизменный
