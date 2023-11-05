//

// $ tsc -t es5 index.ts
// $ node .\index.js

interface Logger {
    /**
     * For information logging
     * @param message
     */
    info(message: string): void;

    /**
     * For warning logging
     * @param message
     */
    warning(message: string): void;

    /**
     * For error logging
     * @param message
     */
    critical(message: string): void;
}

class ConsoleLogger implements Logger {
    info(message: string): void {
        console.log(message);
    }

    warning(message: string): void {
        console.warn(message);
    }

    critical(message: string): void {
        console.error(message);
    }
}

class DateConsoleLogger extends ConsoleLogger {
    private getDateMessage(message: string): string {
        return new Date().toLocaleString() + ": " + message;
    }

    info(message: string): void {
        super.info(this.getDateMessage(message));
    }

    warning(message: string): void {
        super.warning(this.getDateMessage(message));
    }

    critical(message: string): void {
        super.critical(this.getDateMessage(message));
    }
}

class Job {

    // композиция, logger
    constructor(private logger: Logger) {
    }

    public run() {
        try {
            this.logger.info("Started");

            // work..
            throw new Error('error_message in runtime');

            this.logger.info("Finished");
        } catch (e) {
            // @ts-ignore
            this.logger.critical(e.message);
        }
    }
}

const job = new Job(new ConsoleLogger());
job.run();
// Started
// error_message in runtime

const job2 = new Job(new DateConsoleLogger());
job2.run();
// 3/9/2023, 11:34:58 PM: Started
// 3/9/2023, 11:34:58 PM: error_message in runtime

// //

// with level

abstract class BaseLogger implements Logger {
    protected level = 1;

    info(message: string): void {
        if (this.level <= 1)
            this.log(message, this.level);
    }

    warning(message: string): void {
        if (this.level <= 2)
            this.log(message, this.level);
    }

    critical(message: string): void {
        if (this.level <= 3)
            this.log(message, this.level);
    }

    protected abstract log(message: string, level: number): void;
}

class ConsoleLogger2 extends BaseLogger {
    protected level = 3;

    protected log(message: string, level: number): void {
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
    }

}

class DateConsoleLogger2 extends ConsoleLogger2 {
    private getDateMessage(message: string): string {
        return new Date().toLocaleString() + ": " + message;
    }

    protected log(message: string, level: number): void {
        super.log(this.getDateMessage(message), level);
    }
}

const job3 = new Job(new ConsoleLogger2());
job3.run();
// error_message in runtime

const job4 = new Job(new DateConsoleLogger2());
job4.run();
// 3/9/2023, 11:34:58 PM: error_message in runtime
