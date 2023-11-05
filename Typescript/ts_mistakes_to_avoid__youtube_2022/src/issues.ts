// https://www.youtube.com/@CoderOne
// https://www.youtube.com/watch?v=ZCllX1p763U   Typescript Mistakes Every Junior Developer should Avoid | clean-code

// (01) Use 'unknown' instead of 'any'
// a)
let userAny: any; // Simply means turn of the Typescript "type-checks"
let userUnknown: unknown; // The right one to use

// b)
async function fetchUser() {
    const response = await fetch("https://dummyjson.com/users/1");

    // Body.json(): Promise<any>
    // Непонятно что будет в ответе, опасно вызывать .json()
    const badUser = await response.json();

    // //

    const goodUser: unknown = await response.json();
    // (goodUser.token; can't access)
    // теперь нужно определить тип, так как unknown
    if (isAdminUser(goodUser)) {
        // const goodUser: IAdminUser
        goodUser.token; // can access type
    }

}

function isAdminUser(object: unknown): object is IAdminUser {
    if (object !== null && typeof object === "object") {
        return "token" in object;
    }
    return false;
}

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

interface IAdminUser extends IUser {
    token: string;
    addNewUser: () => void;
}


// (02) Not using the 'is' Operator

type Species = "cat" | "dog"

interface Pet {
    species: Species;
}

class Cat implements Pet {
    public species: Species = "cat";

    public meow() {
        console.log("Meow");
    }

    public jump() {
        console.log("Jumping");
    }

    public walk() {
        console.log("Walking");
    }
}

function petIsCat(pet: Pet): pet is Cat {
    return pet.species === "cat";
}

function petIsCatBoolean(pet: Pet): boolean {
    return pet.species === "cat";
}

const p: Pet = new Cat()
// Bad
// p.meow(); // 'meow' doesn't exist
if (petIsCatBoolean(p)) {
    // p.meow(); // 'meow' doesn't exist
    (p as Cat).meow();
}
// Good
if (petIsCat(p)) {
    p.meow(); // compiler knows for sure that the variable is of type Cat
}


// (03) Not using the 'Satisfies' operator
//Custom interface for rendering images
interface ICustomImage {
    data: string;
    width: number;
    height: number;
}

//Sample of a Custom Image
const myCustomImage: ICustomImage = {
    data: "base64",
    width: 200,
    height: 150,
};
//Image type for the user
type UserImage = string | ICustomImage;

//User interface
interface IUser2 {
    id: number;
    firstName: string;
    lastName: string;
    image: UserImage;
}

// Bad example
const badUser: IUser2 = {
    id: 1,
    firstName: "Alex",
    lastName: "Brooks",
    image: "image-url",
};
//badUser.image. // doesn't show string methods

// Good example
const goodUser = {
    id: 1,
    firstName: "Alex",
    lastName: "Brooks",
    image: "image-url",
} satisfies IUser2;

goodUser.image.charAt(0) // shows string methods

const goodUser2 = {
    id: 1,
    firstName: "Alex",
    lastName: "Brooks",
    image: myCustomImage,
} satisfies IUser2;

goodUser2.image.height // shows methods


// (04) Using Enums
enum BadState {
    InProgress,
    Success,
    Fail
}

BadState.InProgress;

const badCheckState = (state: BadState) => {
    //
};
badCheckState(100); // 100 doesn't exist

// Good
type GoodState = "InProgress" | "Success" | "Fail";

enum GoodState2 {
    InProgress = "InProgress",
    Success = "Success",
    Fail = "Fail",
}

const goodCheckState = (state: GoodState) => {
    //
};
//goodCheckState("123"); // won't compile

export {};


// (05) Ignoring utility types
interface IProduct {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    rating: number;
}

interface IUpdateProduct {
    title?: string;
    description?: string;
    thumbnail?: string;
    price?: number;
    rating?: number;
}

function updateProduct(productId: IProduct["id"],
                       updateProduct: Partial<Omit<IProduct, "id">>) {
    // аналог IUpdateProduct { thumbnail?: string; ...
    updateProduct.description

    // id не будет
    // updateProduct.id
}

// Record
type Properties = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number]

const color: Record<Properties, RGB | string> = {
    red: [255, 0, 0],
    green: "green",
    blue: "blue",
}
