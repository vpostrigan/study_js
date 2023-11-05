// 1)
// Keyword TYPE
type TypedProduct = {
    id: string,
    id2: string | number, // тип может быть составной
    sku: string,
    name: string,
    price: number,
    description: any,
};

type NumberString = number | string;

type Product = {
    id: NumberString, // тип использует другой тип для определения себя
    sku: string,
    name: string,
    price: number,
    description: any
}

let product: Product; // объявить переменную
// наполнить его данными
product = {
    id: 55,
    // id: "55", // можно передать строку
    sku: 'Subscription',
    name: 'Subscription on channel',
    price: 0,
    description: '...'
}


// 2)
// как определить number | string
// typeof

//product.id.charAt(0); не работает
if (typeof product.id === 'number') {
    product.id = product.id + ''; // сделает product.id - string type
}
product.id.charAt(0); // работает
product.id = 123; // можно присвоит число


// 3)
// привести Product к TypedProduct
// <TYPE>var
const typedProduct: TypedProduct = <TypedProduct>product;
//const typedProduct: TypedProduct = product; будет ошибка

// description: any, можно привести его к string,
// будет работать и без, но тогда не будет подсветки для string методов
let descriptionLength = (<string>typedProduct.description).length;

// 3.1) синоним
// var as TYPE
const typedProduct2: TypedProduct = product as TypedProduct;

descriptionLength = (typedProduct.description as string).length;


// 4) INTERSECTION of types
type AdditionalAttributes = {
    weight: number,
    color: string
}
type AdvancedProduct = TypedProduct & AdditionalAttributes;

const advancedProduct: AdvancedProduct = {
    id: '88',
    id2: 0,
    sku: 'marker',
    name: 'Marker',
    price: 33,
    description: 'Some description',
    weight: 12,
    color: 'red'
};

// или
// Can be reused part of the type
const subscriptionPoster: AdvancedProduct = {
    ...typedProduct, // ... - деструктуризация
    weight: 1,
    color: 'blue'
};


// 5)
// Partial - частичное соответствие
// все поля AdvancedProduct станут опциональными
let partData: Partial<AdvancedProduct> = {
    color: 'red',
    weight: 4,
    // not_exist: '',  // Partial won't allow to create 'not_exist'
}
