//
// Dependency injection
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var UserMongoDBRepo = /** @class */ (function () {
    function UserMongoDBRepo() {
    }
    UserMongoDBRepo.prototype.getUsers = function () {
        console.log("MongoDB. getUsers");
        return [{ age: 15, username: 'User from MongoDB' }];
    };
    return UserMongoDBRepo;
}());
var UserService = /** @class */ (function () {
    function UserService(userRepo) {
        this.userRepo = userRepo;
    }
    UserService.prototype.filterUserByAge = function (age) {
        var users = this.userRepo.getUsers();
        // filter logic...
        console.log(users);
    };
    return UserService;
}());
var userService = new UserService(new UserMongoDBRepo());
userService.filterUserByAge(15);
