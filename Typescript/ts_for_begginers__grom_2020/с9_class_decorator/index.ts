//

function ClassDecorator<T extends { new(...args: any[]): {} }>(Constructor: T) {
    console.log(Constructor); // [Function: Foo] { barStatic: 'barStatic' }
    return Constructor;
}

@ClassDecorator
class Foo {
    static barStatic = 'barStatic';
    bar = 'BAR';
}

const foo = new Foo();
console.log(foo); // Foo { bar: 'BAR' }

// //

function ClassDecorator2<T extends { new(...args: any[]): {} }>(Constructor: T) {
    console.log(Constructor); // [Function: Foo2] { barStatic: 'barStatic' }
    return class extends Constructor {
        static barStatic0 = 'barStatic0';
        bar0 = 'BAR0';
    };
}

@ClassDecorator2
class Foo2 {
    static barStatic = 'barStatic';
    bar = 'BAR';
}

const foo2 = new Foo2();
console.log(foo2); // class_1 { bar: 'BAR', bar0: 'BAR0' }
console.log(Foo2); // [Function: class_1] { barStatic0: 'barStatic0' }

// //

const Foo3 = ClassDecorator2(class {
    static barStatic3 = 'barStatic3';
    bar3 = 'BAR3';
})

const foo3 = new Foo3();
console.log(foo3); // class_1 { bar: 'BAR', bar0: 'BAR0' }
console.log(Foo3); // [Function: class_1] { barStatic0: 'barStatic0' }
console.log(Foo3.barStatic3); // barStatic3
console.log(Foo3.barStatic0); // barStatic0
console.log(foo3.bar3); // BAR3
console.log(foo3.bar0); // BAR0


// //

const foo30 = new Foo2() as any; // как вариант через 'as any'
console.log(foo30.bar3); // undefined
console.log(foo30.bar0); // BAR0

// //

// другой вариант

// сделали замыкание, фабрика декораторов

function ClassDecorator4(props: { barStatic: string, bar: string }) {
    return function <T extends { new(...args: any[]): {} }>(Constructor: T) {
        console.log(Constructor); // [Function: Foo4] { barStatic: 'barStatic' }
        return class extends Constructor {
            static barStatic0= props.barStatic;
            bar0 = props.bar;
        };
    }
}

@ClassDecorator4({
    barStatic: 'BAR STATIC',
    bar: 'bar'
})
class Foo4 {
    static barStatic = 'barStatic';
    bar = 'BAR';
}

const foo4 = new Foo4() as any; // как вариант через 'as any'
console.log(foo4.bar); // BAR
console.log(foo4.bar0); // bar
console.log(foo4.barStatic); // undefined
console.log(foo4.barStatic0); // undefined
