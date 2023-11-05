//
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
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.info = function (message) {
        console.log(message);
    };
    ConsoleLogger.prototype.warning = function (message) {
        console.warn(message);
    };
    ConsoleLogger.prototype.critical = function (message) {
        console.error(message);
    };
    return ConsoleLogger;
}());
var DateConsoleLogger = /** @class */ (function (_super) {
    __extends(DateConsoleLogger, _super);
    function DateConsoleLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateConsoleLogger.prototype.getDateMessage = function (message) {
        return new Date().toLocaleString() + ": " + message;
    };
    DateConsoleLogger.prototype.info = function (message) {
        _super.prototype.info.call(this, this.getDateMessage(message));
    };
    DateConsoleLogger.prototype.warning = function (message) {
        _super.prototype.warning.call(this, this.getDateMessage(message));
    };
    DateConsoleLogger.prototype.critical = function (message) {
        _super.prototype.critical.call(this, this.getDateMessage(message));
    };
    return DateConsoleLogger;
}(ConsoleLogger));
var Job = /** @class */ (function () {
    // композиция, logger
    function Job(logger) {
        this.logger = logger;
    }
    Job.prototype.run = function () {
        try {
            this.logger.info("Started");
            // work..
            throw new Error('error_message in runtime');
            this.logger.info("Finished");
        }
        catch (e) {
            // @ts-ignore
            this.logger.critical(e.message);
        }
    };
    return Job;
}());
var job = new Job(new ConsoleLogger());
job.run();
// Started
// error_message in runtime
var job2 = new Job(new DateConsoleLogger());
job2.run();
// 3/9/2023, 11:34:58 PM: Started
// 3/9/2023, 11:34:58 PM: error_message in runtime
// //
// with level
var BaseLogger = /** @class */ (function () {
    function BaseLogger() {
        this.level = 1;
    }
    BaseLogger.prototype.info = function (message) {
        if (this.level <= 1)
            this.log(message, this.level);
    };
    BaseLogger.prototype.warning = function (message) {
        if (this.level <= 2)
            this.log(message, this.level);
    };
    BaseLogger.prototype.critical = function (message) {
        if (this.level <= 3)
            this.log(message, this.level);
    };
    return BaseLogger;
}());
var ConsoleLogger2 = /** @class */ (function (_super) {
    __extends(ConsoleLogger2, _super);
    function ConsoleLogger2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level = 3;
        return _this;
    }
    ConsoleLogger2.prototype.log = function (message, level) {
        switch (level) {
            case 1:
                console.log(message);
                break;
            case 2:
                console.warn(message);
                break;
            case 3:
                console.error(message);
                break;
        }
    };
    return ConsoleLogger2;
}(BaseLogger));
var DateConsoleLogger2 = /** @class */ (function (_super) {
    __extends(DateConsoleLogger2, _super);
    function DateConsoleLogger2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateConsoleLogger2.prototype.getDateMessage = function (message) {
        return new Date().toLocaleString() + ": " + message;
    };
    DateConsoleLogger2.prototype.log = function (message, level) {
        _super.prototype.log.call(this, this.getDateMessage(message), level);
    };
    return DateConsoleLogger2;
}(ConsoleLogger2));
var job3 = new Job(new ConsoleLogger2());
job3.run();
// error_message in runtime
var job4 = new Job(new DateConsoleLogger2());
job4.run();
// 3/9/2023, 11:34:58 PM: error_message in runtime
